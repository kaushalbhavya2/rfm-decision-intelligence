"""
orchestrator.py
===============
Runs the full RFM Decision Intelligence pipeline in sequence:
  data_agent.run() -> signal_agent.run() -> insight_agent.run()
"""

from __future__ import annotations

import os
import sys

# ---------------------------------------------------------------------------
# Configuration (easy to change)
# ---------------------------------------------------------------------------

EXCEL_PATH = os.environ.get(
    "RFM_DATA_PATH",
    "/Users/bhavyakaushal/Desktop/PROJECTS/OnlineRetail_Cleaned.xlsx",
)
OUTPUT_PATH = "src/data/insights.json"


# ---------------------------------------------------------------------------
# Pipeline
# ---------------------------------------------------------------------------

def main() -> None:
    """Run the full pipeline: data -> signals -> insights."""

    # Ensure the agents directory is importable regardless of cwd
    agents_dir = os.path.dirname(os.path.abspath(__file__))
    if agents_dir not in sys.path:
        sys.path.insert(0, agents_dir)

    from data_agent import run as data_run
    from signal_agent import run as signal_run
    from insight_agent import run as insight_run

    print("[orchestrator] Starting RFM Decision Intelligence pipeline...")

    try:
        # Step 1: Data Agent
        print("[orchestrator] Step 1/3 — Data Agent")
        data_payload = data_run(excel_path=EXCEL_PATH)

        # Step 2: Signal Agent
        print("[orchestrator] Step 2/3 — Signal Agent")
        signals = signal_run(data_payload)

        # Step 3: Insight Agent
        print("[orchestrator] Step 3/3 — Insight Agent")
        # Ensure output directory exists
        output_dir = os.path.dirname(os.path.abspath(OUTPUT_PATH))
        os.makedirs(output_dir, exist_ok=True)

        insight_run(signals=[dict(s) for s in signals], output_path=OUTPUT_PATH)

    except Exception as err:
        print(f"[orchestrator] FAILED: {err}")
        sys.exit(1)

    print(
        f"[orchestrator] Pipeline complete — insights.json ready at {OUTPUT_PATH}"
    )
    sys.exit(0)


if __name__ == "__main__":
    main()
