export default function SourcesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Sources & Assumptions Register</h1>
        <p className="text-slate-500 text-sm">
          Full transparency on data provenance, modelling decisions, and known limitations.
        </p>
      </div>

      {/* Data Sources */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Data Sources</h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Source</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Description</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  source: "UCI Online Retail Dataset",
                  description: "UK gift/novelty wholesaler transactions, Dec 2010–Dec 2011. B2B proxy dataset.",
                  href: "https://archive.ics.uci.edu/ml/datasets/online+retail",
                  label: "UCI ML Repository",
                },
                {
                  source: "Bhavya Kaushal — Tableau Public",
                  description: "RFM segmentation dashboards built on the cleaned dataset",
                  href: "https://public.tableau.com/app/profile/bhavya.kaushal8300/viz/RFMcustomersegmentation_17777123503690/Dashboard1",
                  label: "Tableau Public",
                },
                {
                  source: "Klaviyo Win-Back Benchmark Report",
                  description: "Consumer retail email win-back campaign response rates (2022–2024). Used for 10–20% recovery rate assumptions.",
                  href: "https://www.klaviyo.com/blog/win-back-campaigns",
                  label: "Klaviyo Blog",
                },
                {
                  source: "Salesforce Marketing Cloud Research",
                  description: "Email campaign performance benchmarks used to cross-validate recovery rate assumptions.",
                  href: "https://www.salesforce.com/resources/research-reports/state-of-marketing/",
                  label: "Salesforce Research",
                },
              ].map((row) => (
                <tr key={row.source} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{row.source}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.description}</td>
                  <td className="px-4 py-3">
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-xs"
                    >
                      {row.label}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Assumptions Register */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Assumptions Register</h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700 w-8">#</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Assumption</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Value / Basis</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Confidence</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Risk if Wrong</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  n: 1,
                  assumption: "UCI dataset used as a B2C proxy",
                  value: "B2B dataset, B2C recommendations",
                  confidence: "High (disclosed)",
                  risk: "Segment dynamics and win-back rates differ for true B2C retailers",
                },
                {
                  n: 2,
                  assumption: "RFM scores by quintile binning (1–5)",
                  value: "Standard methodology",
                  confidence: "High",
                  risk: "Thresholds may not reflect true behavioural breaks",
                },
                {
                  n: 3,
                  assumption: "CLV proxy formula",
                  value: "(revenue / lifespan_days) × 365 × frequency",
                  confidence: "Medium",
                  risk: "Single-transaction customers inflated; corrected via P99 winsorisation",
                },
                {
                  n: 4,
                  assumption: "CLV regression features: R, F, M only",
                  value: "R² = 0.1426",
                  confidence: "High (disclosed)",
                  risk: "Low explanatory power — geography, category, timing would improve accuracy",
                },
                {
                  n: 5,
                  assumption: "Signal thresholds data-driven",
                  value: "P95 CLV; r_score==3",
                  confidence: "High",
                  risk: "Require recalibration on new datasets",
                },
                {
                  n: 6,
                  assumption: "Win-back recovery rate — Conservative",
                  value: "10% (consumer retail benchmark)",
                  confidence: "Medium",
                  risk: "B2B win-back is typically 5–12%",
                },
                {
                  n: 7,
                  assumption: "Win-back recovery rate — Base",
                  value: "15% (consumer retail benchmark)",
                  confidence: "Medium",
                  risk: "Optimistic for wholesale context",
                },
                {
                  n: 8,
                  assumption: "Win-back recovery rate — Optimistic",
                  value: "20% (consumer retail upper quartile)",
                  confidence: "Low",
                  risk: "Upper bound; requires strong personalisation and offer",
                },
                {
                  n: 9,
                  assumption: "Email campaign cost (India)",
                  value: "₹58,305 total (₹5/send + ₹55K fixed)",
                  confidence: "Medium",
                  risk: "Agency rates vary; premium creative would increase cost",
                },
                {
                  n: 10,
                  assumption: "INR/GBP conversion",
                  value: "₹107 per £1",
                  confidence: "Medium (rate as of project date)",
                  risk: "Exchange rate fluctuates; figures are indicative only",
                },
                {
                  n: 11,
                  assumption: "DMart store count",
                  value: "~350 stores (2024 annual report)",
                  confidence: "High",
                  risk: "Publicly reported figure; may change",
                },
                {
                  n: 12,
                  assumption: "Customers per DMart store (loyalty enrolled)",
                  value: "5,000 (modelled estimate)",
                  confidence: "Low",
                  risk: "DMart does not publish per-store enrolment — significant uncertainty",
                },
                {
                  n: 13,
                  assumption: "Average At-Risk revenue per customer (India)",
                  value: "₹8,000/year (DMart), ₹6,500/year (Reliance)",
                  confidence: "Low",
                  risk: "Calibrated to FMCG basket data — not validated against actual retailer data",
                },
                {
                  n: 14,
                  assumption: "Demand forecast — modelled stock",
                  value: "4× average weekly demand (full-period baseline)",
                  confidence: "Low",
                  risk: "If actual stock is lower, more SKUs would be flagged as at risk",
                },
                {
                  n: 15,
                  assumption: "Reorder risk threshold",
                  value: "< 14 days (wholesale 2-week lead time)",
                  confidence: "Medium",
                  risk: "Lead times vary by supplier — should be calibrated in production",
                },
                {
                  n: 16,
                  assumption: "Audit trail stored in browser localStorage",
                  value: "No database — prototype only",
                  confidence: "High (disclosed)",
                  risk: "Data lost on browser clear; not suitable for production",
                },
                {
                  n: 17,
                  assumption: "AI recommendations generated at build time",
                  value: "Claude Sonnet, 4 calls, cached system prompt",
                  confidence: "High",
                  risk: "Static recommendations — not dynamically updated with new data",
                },
              ].map((row) => (
                <tr key={row.n} className="hover:bg-slate-50 align-top">
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">{row.n}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.assumption}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.value}</td>
                  <td className="px-4 py-3 text-xs">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        row.confidence.startsWith("High")
                          ? "bg-green-100 text-green-700"
                          : row.confidence.startsWith("Medium")
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.confidence}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Limitations */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Known Limitations</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {[
            "Dataset covers B2B resellers, not B2C consumers — segment dynamics and win-back rates differ",
            "13-month window limits cohort analysis depth and seasonal decomposition",
            "CLV regression R² = 0.1426 — RFM scores alone explain limited CLV variance; geography, product category, and purchase timing would improve accuracy",
            "Signals computed on a static snapshot — a production system would recompute on live transaction feeds",
            "Demand forecast uses a 4-week SMA which ignores trend and seasonality — a Q4 seasonal spike would cause under-forecasting in October/November",
            "Network extrapolation (DMart, Reliance Retail) relies on modelled estimates for customers-per-store and revenue-per-customer — figures are indicative and not validated against actual retailer data",
            "DPDP Act 2023 compliance requirements for email marketing are noted but not implemented in this prototype",
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-slate-400 mt-0.5 flex-shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
