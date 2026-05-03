import { TableauEmbed } from "@/components/TableauEmbed"

const tableau1Html = `<div class='tableauPlaceholder' id='viz1777712575952' style='position: relative'><noscript><a href='#'><img alt='Dashboard 1 ' src='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard1/1_rss.png' style='border: none' /></a></noscript><object class='tableauViz' style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /><param name='embed_code_version' value='3' /><param name='site_root' value='' /><param name='name' value='RFMcustomersegmentation_17777123503690/Dashboard1' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard1/1.png' /><param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /></object></div><script type='text/javascript'>var divElement = document.getElementById('viz1777712575952');var vizElement = divElement.getElementsByTagName('object')[0];if(divElement.offsetWidth > 800){vizElement.style.minWidth='600px';vizElement.style.maxWidth='1400px';vizElement.style.width='100%';vizElement.style.minHeight='527px';vizElement.style.maxHeight='1127px';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else if(divElement.offsetWidth > 500){vizElement.style.minWidth='600px';vizElement.style.maxWidth='1400px';vizElement.style.width='100%';vizElement.style.minHeight='527px';vizElement.style.maxHeight='1127px';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else{vizElement.style.width='100%';vizElement.style.height='1027px';}var scriptElement=document.createElement('script');scriptElement.src='https://public.tableau.com/javascripts/api/viz_v1.js';vizElement.parentNode.insertBefore(scriptElement,vizElement);</script>`

const tableau2Html = `<div class='tableauPlaceholder' id='viz1777790744842' style='position: relative'><noscript><a href='#'><img alt=' ' src='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard2/1_rss.png' style='border: none' /></a></noscript><object class='tableauViz' style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /><param name='embed_code_version' value='3' /><param name='site_root' value='' /><param name='name' value='RFMcustomersegmentation_17777123503690/Dashboard2' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard2/1.png' /><param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /></object></div><script type='text/javascript'>var divElement=document.getElementById('viz1777790744842');var vizElement=divElement.getElementsByTagName('object')[0];if(divElement.offsetWidth > 800){vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else if(divElement.offsetWidth > 500){vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else{vizElement.style.width='100%';vizElement.style.height='1427px';}var scriptElement=document.createElement('script');scriptElement.src='https://public.tableau.com/javascripts/api/viz_v1.js';vizElement.parentNode.insertBefore(scriptElement,vizElement);</script>`

export default function MethodologyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Methodology</h1>
        <p className="text-slate-500 text-sm">
          How the RFM segmentation, signal detection, and CLV regression pipeline works.
        </p>
      </div>

      {/* Dataset Disclosure */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-sm font-semibold text-amber-800 mb-2">Dataset Disclosure — B2B Context</h2>
        <p className="text-sm text-amber-900 leading-relaxed mb-3">
          The UCI Online Retail dataset records wholesale B2B transactions from a UK gift and
          novelty distributor (December 2010–December 2011). Customer entities are primarily retail
          businesses purchasing inventory for resale — not individual end consumers. Quantities per
          line item frequently exceed 100 units; a meaningful number of accounts show lifetime
          revenue exceeding £20,000 — consistent with wholesale account values, not individual
          retail spending.
        </p>
        <p className="text-sm text-amber-900 leading-relaxed mb-3">
          All RFM segmentation, CLV modelling, and win-back recommendations are demonstrated on
          this dataset to illustrate analytical methodology. The strategic recommendations are
          framed as if applied to a B2C retail environment — the intended deployment context. In a
          production engagement, the identical techniques would apply to direct consumer transaction
          data (loyalty programme records, app purchase histories, or CRM exports) from platforms
          such as Flipkart, Nykaa, or Reliance Retail.
        </p>
        <p className="text-sm text-amber-800 font-medium">
          Win-back response rates of 10–20% assumed in ROI modelling are consumer retail
          benchmarks. B2B wholesale win-back rates are typically lower (5–12%) but higher in
          revenue impact per recovered account.
        </p>
      </div>

      {/* RFM Scoring Methodology */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">RFM Scoring Methodology</h2>
        <p className="text-sm text-slate-700 mb-4 leading-relaxed">
          Each customer receives three scores — <strong>Recency (R)</strong>,{" "}
          <strong>Frequency (F)</strong>, and <strong>Monetary (M)</strong> — on a 1–5 scale using
          quintile-based binning. Score 5 indicates the strongest behaviour in that dimension;
          score 1 the weakest. Segments are then assigned based on score combinations.
        </p>

        {/* Segment table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Segment</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Criteria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { segment: "High Value", criteria: "R≥4, F≥4, M≥4" },
                { segment: "Loyal", criteria: "R≥3, F≥3, M≥3 (not High Value)" },
                { segment: "Promising", criteria: "R≥3, F≥2, M≥2" },
                { segment: "At-Risk", criteria: "R≤2, F≥3, M≥3" },
                { segment: "Lost", criteria: "R=1, F=1 or R≤2, F≤2" },
                { segment: "Low Value", criteria: "All others" },
              ].map((row) => (
                <tr key={row.segment} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{row.segment}</td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">{row.criteria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Data Preprocessing */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Data Preprocessing Pipeline</h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Step</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Action</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Volume</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  step: "1",
                  action: "Raw dataset",
                  volume: "541,909 rows",
                  rationale: "UCI Online Retail, Dec 2010–Dec 2011",
                },
                {
                  step: "2",
                  action: "Cancelled order removal",
                  volume: "~9,685 rows removed",
                  rationale:
                    "InvoiceNo prefixed 'C' and Quantity < 0. Not netted against originating orders — slight overstatement of M values for high-return customers.",
                },
                {
                  step: "3",
                  action: "Null CustomerID removal",
                  volume: "~135,080 rows removed",
                  rationale:
                    "Anonymous guest purchases cannot be attributed. Represent a material revenue share — all aggregate revenue claims in this project are attributed customers only.",
                },
                {
                  step: "4",
                  action: "Duplicate row removal",
                  volume: "~5,268 rows removed",
                  rationale:
                    "Exact duplicates across all 8 columns; near-duplicates resolved by retaining most complete Description.",
                },
                {
                  step: "5",
                  action: "UnitPrice anomaly removal",
                  volume: "~1,456 rows removed",
                  rationale:
                    "UnitPrice ≤ 0. Rows with UnitPrice = 0 excluded from monetary calculations but retained for frequency counts.",
                },
                {
                  step: "6",
                  action: "Final dataset",
                  volume: "392,692 rows, 4,338 customers",
                  rationale: "Non-product service codes (POST, DOT) excluded from SKU analysis.",
                },
              ].map((row) => (
                <tr key={row.step} className="hover:bg-slate-50 align-top">
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">{row.step}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.action}</td>
                  <td className="px-4 py-3 text-slate-700 font-mono text-xs whitespace-nowrap">{row.volume}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Quantity outliers (e.g. Quantity &gt; 5,000) were retained — consistent with wholesale
          bulk ordering and critical for accurately representing the highest-value accounts.
        </p>
      </section>

      {/* CLV Regression */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">CLV Regression</h2>
        <div className="space-y-3 text-sm text-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Features
              </div>
              <p>R_score, F_score, M_score (quintile-scored 1–5)</p>
            </div>
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Target
              </div>
              <p>clv_proxy (winsorized at P99 = £1,057,680)</p>
            </div>
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                Model
              </div>
              <p>Linear Regression (scikit-learn)</p>
            </div>
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                In-sample R²
              </div>
              <p>0.1426 (14.3% of CLV variance explained)</p>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed bg-slate-50 rounded-lg border border-slate-200 p-4">
            <strong className="text-slate-700">Note:</strong> clv_proxy is computed as
            (total_revenue / customer_lifespan_days) × 365 × frequency. Single-transaction
            customers (lifespan=1 day) produce artificially inflated values; winsorization corrects
            this before training.
          </p>
        </div>
      </section>

      {/* Tableau Dashboards */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Tableau Dashboards</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Dashboard 1 — RFM Segmentation Overview
            </h3>
            <div className="rounded-lg border border-slate-200 overflow-hidden bg-white p-2">
              <TableauEmbed id="tableau-dash-1" html={tableau1Html} />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Dashboard 2 — Segment Deep Dive
            </h3>
            <div className="rounded-lg border border-slate-200 overflow-hidden bg-white p-2">
              <TableauEmbed id="tableau-dash-2" html={tableau2Html} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
