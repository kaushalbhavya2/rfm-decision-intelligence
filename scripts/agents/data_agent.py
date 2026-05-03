"""
data_agent.py
=============
Loads the OnlineRetail_Cleaned.xlsx workbook, validates all 7 sheets, builds a
merged master_df (customer_summary + rfm_table + customer_extras), winsorizes
clv_proxy at P99, trains a LinearRegression CLV model, and returns a DataPayload.
"""

from __future__ import annotations

import os
from typing import TypedDict

import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# ---------------------------------------------------------------------------
# Default path — override with RFM_DATA_PATH environment variable
# ---------------------------------------------------------------------------
_DEFAULT_PATH = "/Users/bhavyakaushal/Desktop/PROJECTS/OnlineRetail_Cleaned.xlsx"

# ---------------------------------------------------------------------------
# Required schema per sheet (all lowercase snake_case)
# ---------------------------------------------------------------------------
REQUIRED_SCHEMA: dict[str, list[str]] = {
    "transactions_clean": [
        "invoiceno", "stockcode", "description", "quantity",
        "invoice_date_parsed", "invoice_month", "invoice_year",
        "invoice_week", "customerid", "country", "unitprice", "revenue",
    ],
    "customer_summary": [
        "customerid", "total_revenue", "total_transactions", "total_quantity",
        "average_order_value", "first_purchase_date", "last_purchase_date",
    ],
    "rfm_table": [
        "customerid", "recency", "frequency", "monetary",
        "r_score", "f_score", "m_score", "rfm_segment",
    ],
    "monthly_summary": [
        "invoice_month", "total_revenue", "total_orders", "unique_customers",
    ],
    "segment_summary": [
        "rfm_segment", "total_customers", "total_revenue", "avg_revenue_per_customer",
    ],
    "cohort_table": [
        "cohort_month", "invoice_month", "period_number",
        "customers", "revenue",
    ],
    "customer_extras": [
        "customerid", "repeat_purchaser", "customer_lifespan_days", "clv_proxy",
    ],
}

EXPECTED_CUSTOMER_COUNT = 4338


class DataPayload(TypedDict):
    master_df: pd.DataFrame
    transactions_df: pd.DataFrame
    monthly_summary: list[dict]
    segment_summary: list[dict]
    clv_r_squared: float
    clv_features: list[str]
    clv_target: str


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _load_excel(path: str) -> dict[str, pd.DataFrame]:
    """Read all sheets from the workbook and normalise column names."""
    if not os.path.exists(path):
        raise FileNotFoundError(
            f"[data_agent] Excel file not found at: {path}\n"
            "Set the RFM_DATA_PATH environment variable or place the file at the default path."
        )
    raw: dict[str, pd.DataFrame] = pd.read_excel(path, sheet_name=None, engine="openpyxl")
    # Normalise sheet and column names to lowercase snake_case
    sheets: dict[str, pd.DataFrame] = {}
    for sheet_name, df in raw.items():
        key = sheet_name.strip().lower().replace(" ", "_")
        df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]
        sheets[key] = df
    return sheets


def _validate_schema(sheets: dict[str, pd.DataFrame]) -> None:
    """Assert all required sheets and columns are present."""
    for sheet_name, required_cols in REQUIRED_SCHEMA.items():
        if sheet_name not in sheets:
            raise ValueError(f"[data_agent] Required sheet missing: '{sheet_name}'")
        actual_cols = set(sheets[sheet_name].columns)
        missing = [c for c in required_cols if c not in actual_cols]
        if missing:
            raise ValueError(
                f"[data_agent] Sheet '{sheet_name}' is missing columns: {missing}"
            )


def _build_master_df(sheets: dict[str, pd.DataFrame]) -> pd.DataFrame:
    """Inner-join customer_summary + rfm_table + customer_extras on customerid."""
    cust = sheets["customer_summary"]
    rfm = sheets["rfm_table"]
    extras = sheets["customer_extras"]

    master = (
        cust.merge(rfm, on="customerid", how="inner")
            .merge(extras, on="customerid", how="inner")
    )
    assert len(master) == EXPECTED_CUSTOMER_COUNT, (
        f"[data_agent] Expected {EXPECTED_CUSTOMER_COUNT} customers after merge, "
        f"got {len(master)}"
    )
    return master.reset_index(drop=True)


def _winsorize_clv(master_df: pd.DataFrame) -> tuple[pd.DataFrame, float]:
    """Cap clv_proxy at the 99th percentile in-place and return (df, p99_value)."""
    p99 = master_df["clv_proxy"].quantile(0.99)
    master_df = master_df.copy()
    master_df["clv_proxy"] = master_df["clv_proxy"].clip(upper=p99)
    return master_df, p99


def _train_clv_model(
    master_df: pd.DataFrame,
    features: list[str],
    target: str,
) -> tuple[pd.DataFrame, float]:
    """
    Fit LinearRegression on winsorized clv_proxy.
    Appends predicted_clv to master_df and returns (master_df, r2).
    """
    X = master_df[features].values
    y = master_df[target].values

    model = LinearRegression()
    model.fit(X, y)

    y_pred = model.predict(X)
    r2 = float(r2_score(y, y_pred))

    master_df = master_df.copy()
    master_df["predicted_clv"] = y_pred
    return master_df, r2


# ---------------------------------------------------------------------------
# Public entrypoint
# ---------------------------------------------------------------------------

def run(excel_path: str | None = None) -> DataPayload:
    """
    Execute the full data pipeline and return a DataPayload.

    Parameters
    ----------
    excel_path : str, optional
        Path to OnlineRetail_Cleaned.xlsx.  Falls back to the RFM_DATA_PATH
        environment variable, then to the hardcoded default path.
    """
    path = excel_path or os.environ.get("RFM_DATA_PATH", _DEFAULT_PATH)

    # 1. Load
    sheets = _load_excel(path)
    print(f"[data_agent] Excel loaded — {len(sheets)} sheets found")

    # 2. Validate schema
    _validate_schema(sheets)
    print("[data_agent] Schema validated — all required columns present")

    # 3. Build master_df
    master_df = _build_master_df(sheets)
    print(f"[data_agent] Master DataFrame built — {len(master_df)} customers")

    # 4. Winsorize clv_proxy at P99
    master_df, p99 = _winsorize_clv(master_df)
    print(f"[data_agent] CLV winsorized at P99 = £{p99:,.0f}")

    # 5. Train CLV regression
    clv_features = ["r_score", "f_score", "m_score"]
    clv_target = "clv_proxy"
    master_df, r2 = _train_clv_model(master_df, clv_features, clv_target)
    print(f"[data_agent] CLV regression completed — R² = {r2:.4f}")

    # 6. Prepare monthly_summary (sorted ascending by invoice_month string)
    monthly = sheets["monthly_summary"].copy()
    monthly = monthly.sort_values("invoice_month", ascending=True)
    monthly_summary_list = monthly.to_dict(orient="records")

    # 7. Prepare segment_summary
    segment_summary_list = sheets["segment_summary"].to_dict(orient="records")

    return DataPayload(
        master_df=master_df,
        transactions_df=sheets["transactions_clean"],
        monthly_summary=monthly_summary_list,
        segment_summary=segment_summary_list,
        clv_r_squared=r2,
        clv_features=clv_features,
        clv_target=clv_target,
    )


if __name__ == "__main__":
    payload = run()
    print("master_df shape:", payload["master_df"].shape)
    print("R²:", payload["clv_r_squared"])
