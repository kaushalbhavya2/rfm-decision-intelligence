# RFM Decision Intelligence

`[Next.js 14]` `[TypeScript]` `[Python 3]` `[Claude Sonnet]` `[Vercel]`

---

## Overview

In 2024, at FoodWorks, I applied manual segmentation and inventory analysis to drive a 14% category sales lift and a 35% reduction in stock wastage at the store level. The gap I kept running into was not analytical — the data existed. The gap was that by the time an insight was ready, the decision window had already closed. This project is my answer to that gap. It takes the same segmentation methodology, applies it at scale across 4,338 customers, and wraps it in an automated intelligence workflow that surfaces the right recommendation to the right person at the right moment — without requiring them to be an analyst.

---

## Live Demo

```
Live demo: https://rfm-decision-intelligence-qq4osu5c7-kaushalbhavya2s-projects.vercel.app
Tableau dashboards: https://public.tableau.com/app/profile/bhavya.kaushal8300/viz/RFMcustomersegmentation_17777123503690/Dashboard1
```

---

## Architecture

The system operates across two distinct layers: a build-time Python pipeline that ingests data and generates AI-powered insights, and a runtime Next.js application that presents those insights for human review and decision.

### Build-Time Pipeline (Python)

```
Excel File (7 sheets)
    │
    ▼
data_agent.py ──── CLV regression (scikit-learn, R²=0.1426)
    │                  Winsorized clv_proxy at P99 = £1,057,680
    ▼
signal_agent.py ── 4 signals detected:
    │                  SIG-001: At-Risk Revenue Decline (medium)
    │                  SIG-002: High Value Churn Risk (high)
    │                  SIG-003: Promising Graduation Opportunity (medium)
    │                  SIG-004: Lost Customer CLV Anomaly (high)
    ▼
insight_agent.py ─ Claude Sonnet API (4 calls, cached system prompt)
    │                  Generates: finding, recommended_action,
    │                  expected_impact, cost_of_inaction, action_reference_id
    ▼
src/data/insights.json  ◄── committed to repo
```

### Runtime (Next.js on Vercel)

```
insights.json (static import)
    │
    ▼
/insights ──── InsightCard × 4
                    │
              [Approve] [Modify] [Reject]
                    │
              ApprovalDrawer
                    │
           ┌────────┼────────┐
           ▼        ▼        ▼
     /api/approve /api/action /api/audit
                    │
              Email draft generated
                    │
              localStorage (AuditEntry)
                    │
              /audit ──── Full decision log
```

---

## How to Run the Python Pipeline Locally

```bash
# 1. Clone the repo
git clone https://github.com/kaushalbhavya2/rfm-decision-intelligence.git
cd rfm-decision-intelligence

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Set your Anthropic API key
export ANTHROPIC_API_KEY="sk-ant-..."

# 4. Set your data path (optional — defaults to the path below)
export RFM_DATA_PATH="/path/to/OnlineRetail_Cleaned.xlsx"

# 5. Run the pipeline
python3 scripts/agents/orchestrator.py
```

**Expected output:**

```
[orchestrator] Starting RFM Decision Intelligence pipeline...
[orchestrator] Step 1/3 — Data Agent
[data_agent] Excel loaded — 7 sheets found
[data_agent] Schema validated — all required columns present
[data_agent] Master DataFrame built — 4338 customers
[data_agent] CLV winsorized at P99 = £1,057,680
[data_agent] CLV regression completed — R² = 0.1426
[orchestrator] Step 2/3 — Signal Agent
[signal_agent] Signal 1 detected: At-Risk Segment Revenue Decline (severity: medium)
[signal_agent] Signal 2 detected: High Value Churn Risk — 84 customers (severity: high)
[signal_agent] Signal 3 detected: Promising Graduation Opportunity — 183 customers (severity: medium)
[signal_agent] Signal 4 detected: Lost Customer CLV Anomaly — 80 customers (severity: high)
[orchestrator] Step 3/3 — Insight Agent
[insight_agent] Calling Claude for SIG-001...
[insight_agent] Insight generated for SIG-001
...
[orchestrator] Pipeline complete — insights.json ready at src/data/insights.json
```

The pipeline output (`src/data/insights.json`) is committed to the repo — **you do not need to re-run the pipeline to deploy**.

---

## How to Run the Next.js App Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## How to Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

No environment variables are required in the Vercel dashboard. The Anthropic API key is only used by the Python pipeline at build time — it is not needed at runtime.

---

## Environment Variables

```bash
# .env.example
# Used by the Python pipeline ONLY — not required for Next.js or Vercel deployment
ANTHROPIC_API_KEY=your_key_here

# Optional: override the default Excel file path
RFM_DATA_PATH=/path/to/OnlineRetail_Cleaned.xlsx
```

---

## Project Structure

```
rfm-decision-intelligence/
├── scripts/
│   └── agents/
│       ├── data_agent.py        # Reads Excel, runs CLV regression
│       ├── signal_agent.py      # Detects 4 signals
│       ├── insight_agent.py     # Calls Claude API, writes insights.json
│       └── orchestrator.py      # Runs full pipeline
├── src/
│   ├── data/
│   │   └── insights.json        # Generated by pipeline, committed
│   ├── types/index.ts           # Shared TypeScript types
│   ├── lib/
│   │   ├── insights.ts          # JSON loader utility
│   │   └── audit.ts             # localStorage helpers
│   ├── components/
│   │   ├── NavBar.tsx
│   │   ├── InsightCard.tsx
│   │   ├── ApprovalDrawer.tsx
│   │   └── TableauEmbed.tsx
│   └── app/
│       ├── page.tsx             # / — Hero
│       ├── insights/page.tsx    # /insights — Insight feed
│       ├── methodology/page.tsx # /methodology — RFM methodology + Tableau
│       ├── audit/page.tsx       # /audit — Decision audit trail
│       ├── sources/page.tsx     # /sources — Data sources & assumptions
│       └── api/
│           ├── approve/route.ts
│           ├── action/route.ts
│           └── audit/route.ts
├── requirements.txt
├── .env.example
└── README.md
```

---

## Agent Breakdown

| Agent | File | Role |
|---|---|---|
| Data Agent | `data_agent.py` | Reads 7-sheet Excel, merges customer data, runs CLV regression (LinearRegression, R²=0.1426), winsorizes clv_proxy at P99 |
| Signal Agent | `signal_agent.py` | Detects 4 signals: at-risk revenue decline, high-value churn risk, promising graduation rate, lost customer CLV anomaly |
| Insight Agent | `insight_agent.py` | Calls Claude Sonnet once per signal with cached system prompt; validates all 5 JSON keys; retries once on failure; writes insights.json atomically |
| Orchestrator | `orchestrator.py` | Runs the pipeline in sequence with milestone logging; exits code 1 on any failure |

---

## Data Sources & Assumptions

**Dataset:** UCI Online Retail — a UK-based gift/novelty wholesaler, December 2010 to December 2011. 541,909 raw transactions reduced to 392,692 after removing cancellations, null CustomerIDs, and duplicates. 4,338 unique customers.

**Proxy disclaimer:** The UCI dataset is a B2B reseller dataset used here as a methodological proxy. All strategic recommendations are calibrated for a B2C retail environment.

**Key assumptions:**

- RFM scores assigned by quintile binning (1–5 scale)
- CLV proxy = (total_revenue / customer_lifespan_days) × 365 × frequency — winsorized at P99 to correct single-transaction annualisation distortion
- Signal thresholds are data-driven: r_score threshold adjusted from spec (≤2 returned 0 results) to r_score=3; CLV anomaly threshold uses runtime-computed P95 rather than a hardcoded value
- Audit trail stored in browser localStorage — suitable for prototype, not production

---

## Tableau Embed Codes

Both dashboards are embed-ready. Copy and paste the code blocks below directly into any HTML page.

**Dashboard 1:**

```html
<div class='tableauPlaceholder' id='viz1777712575952' style='position: relative'><noscript><a href='#'><img alt='Dashboard 1 ' src='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard1/1_rss.png' style='border: none' /></a></noscript><object class='tableauViz' style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /><param name='embed_code_version' value='3' /><param name='site_root' value='' /><param name='name' value='RFMcustomersegmentation_17777123503690/Dashboard1' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard1/1.png' /><param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /></object></div><script type='text/javascript'>var divElement = document.getElementById('viz1777712575952');var vizElement = divElement.getElementsByTagName('object')[0];if(divElement.offsetWidth > 800){vizElement.style.minWidth='600px';vizElement.style.maxWidth='1400px';vizElement.style.width='100%';vizElement.style.minHeight='527px';vizElement.style.maxHeight='1127px';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else if(divElement.offsetWidth > 500){vizElement.style.minWidth='600px';vizElement.style.maxWidth='1400px';vizElement.style.width='100%';vizElement.style.minHeight='527px';vizElement.style.maxHeight='1127px';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else{vizElement.style.width='100%';vizElement.style.height='1027px';}var scriptElement=document.createElement('script');scriptElement.src='https://public.tableau.com/javascripts/api/viz_v1.js';vizElement.parentNode.insertBefore(scriptElement,vizElement);</script>
```

**Dashboard 2:**

```html
<div class='tableauPlaceholder' id='viz1777790744842' style='position: relative'><noscript><a href='#'><img alt=' ' src='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard2/1_rss.png' style='border: none' /></a></noscript><object class='tableauViz' style='display:none;'><param name='embed_code_version' value='3' /><param name='site_root' value='' /><param name='name' value='RFMcustomersegmentation_17777123503690/Dashboard2' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard2/1.png' /><param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /></object></div><script type='text/javascript'>var divElement=document.getElementById('viz1777790744842');var vizElement=divElement.getElementsByTagName('object')[0];if(divElement.offsetWidth > 800){vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else if(divElement.offsetWidth > 500){vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else{vizElement.style.width='100%';vizElement.style.height='1427px';}var scriptElement=document.createElement('script');scriptElement.src='https://public.tableau.com/javascripts/api/viz_v1.js';vizElement.parentNode.insertBefore(scriptElement,vizElement);</script>
```
