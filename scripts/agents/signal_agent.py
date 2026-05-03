"""
signal_agent.py
===============
Receives a DataPayload from data_agent and detects exactly 4 business signals.
Returns a list of 4 SignalPayload dicts.

Signals
-------
SIG-001  At-Risk Segment Revenue Decline        (severity: medium)
SIG-002  High Value Churn Risk                  (severity: high)
SIG-003  Promising Segment Graduation Opportunity (severity: medium)
SIG-004  Lost Customers with High Predicted CLV  (severity: high)
"""

from __future__ import annotations

from typing import TypedDict

import pandas as pd

# ---------------------------------------------------------------------------
# Type definitions
# ---------------------------------------------------------------------------

class SignalPayload(TypedDict):
    signal_id: str
    signal_type: str
    segment: str
    affected_customers: int
    revenue_at_risk: float
    metric: str
    delta: str
    severity: str


# ---------------------------------------------------------------------------
# Edge-case sentinel values
# ---------------------------------------------------------------------------

_ZERO_RESULT = {
    "affected_customers": 0,
    "revenue_at_risk": 0.0,
    "severity": "low",
    "delta": "0 customers detected — threshold may need adjustment",
}


# ---------------------------------------------------------------------------
# Individual signal detectors
# ---------------------------------------------------------------------------

def _signal_1_at_risk_revenue_trend(
    master_df: pd.DataFrame,
    transactions_df: pd.DataFrame,
) -> SignalPayload:
    """
    SIG-001 — At-Risk Segment Revenue Decline
    Peak-to-latest monthly revenue change for at_risk customers.
    """
    at_risk_ids = master_df.loc[master_df["rfm_segment"] == "at_risk", "customerid"]
    txn_at_risk = transactions_df[transactions_df["customerid"].isin(at_risk_ids)]

    monthly_rev = (
        txn_at_risk.groupby("invoice_month")["revenue"]
        .sum()
        .reset_index()
        .sort_values("invoice_month", ascending=True)  # lexicographic — works for YYYY-MM
    )

    if len(monthly_rev) == 0:
        return SignalPayload(
            signal_id="SIG-001",
            signal_type="At-Risk Segment Revenue Decline",
            segment="at_risk",
            metric="Peak-to-Latest Monthly Revenue",
            **_ZERO_RESULT,
        )

    peak_revenue = monthly_rev["revenue"].max()
    latest_revenue = monthly_rev["revenue"].iloc[-1]

    pct_change = ((latest_revenue - peak_revenue) / peak_revenue) * 100 if peak_revenue != 0 else 0.0

    at_risk_rows = master_df[master_df["rfm_segment"] == "at_risk"]
    revenue_at_risk = float(at_risk_rows["total_revenue"].sum())
    affected_customers = len(at_risk_rows)

    delta_str = f"{pct_change:+.1f}% from peak month to latest month"

    print("[signal_agent] Signal 1 detected: At-Risk Segment Revenue Decline (severity: medium)")

    return SignalPayload(
        signal_id="SIG-001",
        signal_type="At-Risk Segment Revenue Decline",
        segment="at_risk",
        affected_customers=affected_customers,
        revenue_at_risk=revenue_at_risk,
        metric="Peak-to-Latest Monthly Revenue",
        delta=delta_str,
        severity="medium",
    )


def _signal_2_high_value_churn_risk(master_df: pd.DataFrame) -> SignalPayload:
    """
    SIG-002 — High Value Churn Risk
    High-value customers at lowest recency quartile (r_score == 3).
    """
    at_threshold = master_df[
        (master_df["rfm_segment"] == "high_value") &
        (master_df["r_score"] == 3)
    ]

    n = len(at_threshold)

    if n == 0:
        print("[signal_agent] Signal 2 detected: High Value Churn Risk — 0 customers (severity: low)")
        return SignalPayload(
            signal_id="SIG-002",
            signal_type="High Value Churn Risk",
            segment="high_value",
            metric="Recency Score Deterioration",
            **_ZERO_RESULT,
        )

    revenue_at_risk = float(at_threshold["total_revenue"].sum())
    delta_str = f"{n} customers at lowest recency quartile (r_score=3)"

    print(f"[signal_agent] Signal 2 detected: High Value Churn Risk — {n} customers (severity: high)")

    return SignalPayload(
        signal_id="SIG-002",
        signal_type="High Value Churn Risk",
        segment="high_value",
        affected_customers=n,
        revenue_at_risk=revenue_at_risk,
        metric="Recency Score Deterioration",
        delta=delta_str,
        severity="high",
    )


def _signal_3_promising_graduation(master_df: pd.DataFrame) -> SignalPayload:
    """
    SIG-003 — Promising Segment Graduation Opportunity
    Promising customers near high-value threshold (f_score >= 3 AND m_score >= 3).
    """
    all_promising = master_df[master_df["rfm_segment"] == "promising"]
    total_promising = len(all_promising)

    grad_candidates = all_promising[
        (all_promising["f_score"] >= 3) & (all_promising["m_score"] >= 3)
    ]
    graduation_count = len(grad_candidates)

    if total_promising == 0 or graduation_count == 0:
        print("[signal_agent] Signal 3 detected: Promising Graduation Opportunity — 0 customers (severity: low)")
        return SignalPayload(
            signal_id="SIG-003",
            signal_type="Promising Segment Graduation Opportunity",
            segment="promising",
            metric="Graduation Proximity Rate (f_score≥3 & m_score≥3)",
            **_ZERO_RESULT,
        )

    graduation_rate = graduation_count / total_promising
    revenue_opportunity = float(grad_candidates["total_revenue"].sum())
    delta_str = (
        f"{graduation_rate:.1%} graduation proximity rate "
        f"({graduation_count} of {total_promising} customers)"
    )

    print(f"[signal_agent] Signal 3 detected: Promising Graduation Opportunity — {graduation_count} customers (severity: medium)")

    return SignalPayload(
        signal_id="SIG-003",
        signal_type="Promising Segment Graduation Opportunity",
        segment="promising",
        affected_customers=graduation_count,
        revenue_at_risk=revenue_opportunity,
        metric="Graduation Proximity Rate (f_score≥3 & m_score≥3)",
        delta=delta_str,
        severity="medium",
    )


def _signal_4_lost_clv_anomaly(master_df: pd.DataFrame) -> SignalPayload:
    """
    SIG-004 — Lost Customers with High Predicted CLV
    Lost customers whose predicted_clv exceeds the overall P95.
    """
    p95 = master_df["predicted_clv"].quantile(0.95)

    anomaly = master_df[
        (master_df["rfm_segment"] == "lost") &
        (master_df["predicted_clv"] > p95)
    ]
    n = len(anomaly)

    if n == 0:
        print("[signal_agent] Signal 4 detected: Lost Customer CLV Anomaly — 0 customers (severity: low)")
        return SignalPayload(
            signal_id="SIG-004",
            signal_type="Lost Customers with High Predicted CLV",
            segment="lost",
            metric="Predicted CLV vs Segment Expectation",
            **_ZERO_RESULT,
        )

    revenue_at_risk = float(anomaly["predicted_clv"].sum())
    delta_str = f"{n} lost customers above overall P95 predicted CLV (£{p95:,.0f})"

    print(f"[signal_agent] Signal 4 detected: Lost Customer CLV Anomaly — {n} customers (severity: high)")

    return SignalPayload(
        signal_id="SIG-004",
        signal_type="Lost Customers with High Predicted CLV",
        segment="lost",
        affected_customers=n,
        revenue_at_risk=revenue_at_risk,
        metric="Predicted CLV vs Segment Expectation",
        delta=delta_str,
        severity="high",
    )


# ---------------------------------------------------------------------------
# Public entrypoint
# ---------------------------------------------------------------------------

def run(payload: dict) -> list[SignalPayload]:
    """
    Detect all 4 signals from a DataPayload produced by data_agent.run().

    Parameters
    ----------
    payload : DataPayload
        Dict containing master_df, transactions_df, and related metadata.

    Returns
    -------
    list[SignalPayload]
        Exactly 4 signal dicts, always in order SIG-001 through SIG-004.
    """
    master_df: pd.DataFrame = payload["master_df"]
    transactions_df: pd.DataFrame = payload["transactions_df"]

    signals = [
        _signal_1_at_risk_revenue_trend(master_df, transactions_df),
        _signal_2_high_value_churn_risk(master_df),
        _signal_3_promising_graduation(master_df),
        _signal_4_lost_clv_anomaly(master_df),
    ]

    assert len(signals) == 4, "signal_agent must always return exactly 4 signals"
    return signals


if __name__ == "__main__":
    import sys
    sys.path.insert(0, __file__.rsplit("/agents/", 1)[0] + "/agents")
    from data_agent import run as data_run

    data_payload = data_run()
    sigs = run(data_payload)
    for s in sigs:
        print(
            f"  {s['signal_id']}: {s['signal_type']} — "
            f"{s['affected_customers']} customers, "
            f"£{s['revenue_at_risk']:,.0f} at risk, "
            f"severity={s['severity']}"
        )
