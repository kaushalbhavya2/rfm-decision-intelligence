"""
insight_agent.py
================
Takes 4 SignalPayload dicts from signal_agent and calls the Anthropic Claude API
once per signal to generate InsightCards. Writes all 4 InsightCards as a JSON
array to output_path atomically (write to temp, then os.replace).
"""

from __future__ import annotations

import json
import os
import tempfile
import time
from typing import Any

import anthropic


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

MODEL = "claude-sonnet-4-6"
MAX_TOKENS = 600
SYSTEM_PROMPT = (
    "You are a senior retail analytics consultant. "
    "Return JSON only. No preamble. No markdown."
)
REQUIRED_CLAUDE_KEYS = {
    "finding",
    "recommended_action",
    "expected_impact",
    "cost_of_inaction",
    "action_reference_id",
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _strip_code_fences(text: str) -> str:
    """Remove ```json / ``` markdown fences if present."""
    text = text.strip()
    if text.startswith("```"):
        lines = text.splitlines()
        # Always drop the opening fence line (e.g. ```json or ```)
        inner = lines[1:]
        # Drop the closing fence line if present
        if inner and inner[-1].strip() == "```":
            inner = inner[:-1]
        text = "\n".join(inner).strip()
    return text


def _call_claude(
    client: anthropic.Anthropic,
    signal: dict[str, Any],
) -> dict[str, Any]:
    """
    Call Claude once for a single signal.
    Uses cache_control on the system prompt to save cost across the 4 calls.
    The ephemeral cache is populated on the first call and reused automatically
    for subsequent calls with the same system prompt within the cache TTL.
    Returns the parsed JSON dict from Claude.
    """
    user_prompt = (
        f"Given this retail customer signal: {json.dumps(signal)}. "
        "Generate an insight card with these exact keys: "
        "finding, recommended_action, expected_impact, cost_of_inaction, "
        "action_reference_id. Return valid JSON only."
    )

    response = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        system=[
            {
                "type": "text",
                "text": SYSTEM_PROMPT,
                "cache_control": {"type": "ephemeral"},
            }
        ],
        messages=[{"role": "user", "content": user_prompt}],
    )

    raw_text = response.content[0].text
    cleaned = _strip_code_fences(raw_text)
    parsed = json.loads(cleaned)

    missing = REQUIRED_CLAUDE_KEYS - set(parsed.keys())
    if missing:
        raise ValueError(
            f"Claude response missing required keys: {missing}. "
            f"Got: {list(parsed.keys())}"
        )

    return parsed


def _call_claude_with_retry(
    client: anthropic.Anthropic,
    signal: dict[str, Any],
) -> dict[str, Any]:
    """Call Claude with one retry on failure."""
    signal_id = signal.get("signal_id", "UNKNOWN")
    try:
        return _call_claude(client, signal)
    except Exception as first_err:
        print(f"[insight_agent] Retrying {signal_id} after error: {first_err}")
        time.sleep(2)
        try:
            return _call_claude(client, signal)
        except Exception as second_err:
            raise RuntimeError(
                f"[insight_agent] Failed to generate insight for {signal_id} "
                f"after retry: {second_err}"
            ) from second_err


# ---------------------------------------------------------------------------
# Public entrypoint
# ---------------------------------------------------------------------------

def run(signals: list[dict], output_path: str) -> None:
    """
    Generate InsightCards for each signal by calling Claude once per signal.
    Writes all 4 InsightCards as a JSON array to output_path atomically.

    Parameters
    ----------
    signals : list[dict]
        Exactly 4 SignalPayload dicts from signal_agent.run().
    output_path : str
        Absolute or relative path where insights.json should be written.
    """
    client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from env

    insight_cards = []

    for i, signal in enumerate(signals):
        signal_id = signal.get("signal_id", f"SIG-{i+1:03d}")
        print(f"[insight_agent] Calling Claude for {signal_id}...")

        claude_response = _call_claude_with_retry(
            client,
            signal,
        )

        # Merge signal fields + Claude response into a single InsightCard
        card = {
            "signal_id": signal.get("signal_id"),
            "signal_type": signal.get("signal_type"),
            "segment": signal.get("segment"),
            "affected_customers": signal.get("affected_customers"),
            "revenue_at_risk": signal.get("revenue_at_risk"),
            "metric": signal.get("metric"),
            "delta": signal.get("delta"),
            "severity": signal.get("severity"),
            # Claude-generated fields
            "finding": claude_response.get("finding"),
            "recommended_action": claude_response.get("recommended_action"),
            "expected_impact": claude_response.get("expected_impact"),
            "cost_of_inaction": claude_response.get("cost_of_inaction"),
            "action_reference_id": claude_response.get("action_reference_id"),
        }
        insight_cards.append(card)
        print(f"[insight_agent] Insight generated for {signal_id}")

    # Atomic write: write to a temp file, then os.replace
    output_dir = os.path.dirname(os.path.abspath(output_path))
    os.makedirs(output_dir, exist_ok=True)

    with tempfile.NamedTemporaryFile(
        mode="w",
        dir=output_dir,
        suffix=".tmp",
        delete=False,
        encoding="utf-8",
    ) as tmp_f:
        json.dump(insight_cards, tmp_f, indent=2, ensure_ascii=False)
        tmp_path = tmp_f.name

    os.replace(tmp_path, output_path)
    print(f"[insight_agent] insights.json written to {output_path}")
