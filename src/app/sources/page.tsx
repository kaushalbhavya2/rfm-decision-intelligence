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
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">UCI Online Retail Dataset</td>
                <td className="px-4 py-3 text-slate-600">
                  UK gift/novelty wholesaler transactions, Dec 2010–Dec 2011
                </td>
                <td className="px-4 py-3">
                  <a
                    href="https://archive.ics.uci.edu/ml/datasets/online+retail"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline text-xs"
                  >
                    UCI ML Repository
                  </a>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">
                  Bhavya Kaushal — Tableau Public
                </td>
                <td className="px-4 py-3 text-slate-600">
                  RFM segmentation dashboards built on the cleaned dataset
                </td>
                <td className="px-4 py-3">
                  <a
                    href="https://public.tableau.com/app/profile/bhavya.kaushal8300/viz/RFMcustomersegmentation_17777123503690/Dashboard1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline text-xs break-all"
                  >
                    Tableau Public
                  </a>
                </td>
              </tr>
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
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Rationale</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Risk if Wrong</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  n: 1,
                  assumption: "UCI dataset used as a B2C proxy",
                  rationale: "Methodology demonstration — no real customer data available",
                  risk: "Segment distributions may differ for true B2C retailers",
                },
                {
                  n: 2,
                  assumption: "RFM scores assigned by quintile binning",
                  rationale: "Standard RFM methodology; no external validation",
                  risk: "Score thresholds may not reflect true behavioural breaks",
                },
                {
                  n: 3,
                  assumption: "CLV proxy = (revenue / lifespan_days) × 365 × frequency",
                  rationale: "Approximates annualised revenue per customer",
                  risk: "Single-transaction customers produce inflated values; corrected via P99 winsorisation",
                },
                {
                  n: 4,
                  assumption: "CLV regression features: R, F, M scores only",
                  rationale: "Parsimony — avoids overfitting on a small feature set",
                  risk: "Low R² (0.1426) — model explains limited CLV variance",
                },
                {
                  n: 5,
                  assumption: "Signal thresholds are data-driven where possible",
                  rationale:
                    "P95 CLV threshold computed at runtime; r_score threshold adjusted to dataset minimum",
                  risk: "Thresholds require recalibration on new data",
                },
                {
                  n: 6,
                  assumption: "Audit trail stored in browser localStorage",
                  rationale: "No database required for prototype; Vercel free tier",
                  risk: "Data lost on browser clear; not suitable for production",
                },
                {
                  n: 7,
                  assumption: "AI recommendations generated by Claude Sonnet at build time",
                  rationale: "Pre-baked insights load instantly; no runtime API cost",
                  risk: "Recommendations are static — not dynamically updated",
                },
              ].map((row) => (
                <tr key={row.n} className="hover:bg-slate-50 align-top">
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">{row.n}</td>
                  <td className="px-4 py-3 text-slate-800 font-medium">{row.assumption}</td>
                  <td className="px-4 py-3 text-slate-600">{row.rationale}</td>
                  <td className="px-4 py-3 text-slate-600">{row.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Limitations */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Limitations</h2>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">—</span>
            Dataset covers B2B resellers, not B2C consumers — segment dynamics differ
          </li>
          <li className="flex gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">—</span>
            13-month window limits cohort analysis depth
          </li>
          <li className="flex gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">—</span>
            CLV regression R² = 0.1426 — RFM scores alone are weak CLV predictors; additional
            features (geography, product category, purchase timing) would improve accuracy
          </li>
          <li className="flex gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">—</span>
            Signals are computed on a static snapshot — a production system would recompute on live
            transaction feeds
          </li>
        </ul>
      </section>
    </main>
  )
}
