export default function ROIPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">ROI Model</h1>
        <p className="text-slate-500 text-sm">
          Win-back campaign ROI for the At-Risk segment — three recovery scenarios, sensitivity
          analysis, and Indian retail network extrapolation.
        </p>
      </div>

      {/* Baseline */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">At-Risk Segment Baseline</h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Metric</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Value (£)</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Value (₹)</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  metric: "At-Risk customers",
                  gbp: "661",
                  inr: "—",
                  source: "Observed — RFM segmentation",
                },
                {
                  metric: "At-Risk segment historical revenue",
                  gbp: "£88,223",
                  inr: "₹94.4 lakh",
                  source: "Observed — dataset",
                },
                {
                  metric: "Average revenue per At-Risk customer",
                  gbp: "£133",
                  inr: "₹14,231",
                  source: "Calculated (£88,223 ÷ 661)",
                },
                {
                  metric: "Forward revenue at risk (proxy)",
                  gbp: "£88,223",
                  inr: "₹94.4 lakh",
                  source: "Modelled — assumes historical run rate if unrecovered",
                },
              ].map((row) => (
                <tr key={row.metric} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{row.metric}</td>
                  <td className="px-4 py-3 text-slate-700 font-mono text-xs">{row.gbp}</td>
                  <td className="px-4 py-3 text-slate-700 font-mono text-xs">{row.inr}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          £1 = ₹107. Revenue figures reflect historical spend across the dataset period (Dec
          2010–Dec 2011), not guaranteed forward revenue.
        </p>
      </section>

      {/* Campaign Cost */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Campaign Cost Assumptions</h2>
        <p className="text-xs text-slate-500 mb-3">Indian market benchmarks (deployment context)</p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Cost Item</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Assumption</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  item: "Email platform cost per send",
                  assumption: "₹2–₹5 per email",
                  basis: "Mailmodo, Netcore, SendGrid India pricing (1,000+ volume)",
                },
                {
                  item: "Creative and copywriting",
                  assumption: "₹15,000–₹30,000 (one-time)",
                  basis: "3-email drip sequence, mid-market agency rate India",
                },
                {
                  item: "Analytics and reporting",
                  assumption: "₹10,000 (one-time)",
                  basis: "2 analyst days at ₹5,000/day",
                },
                {
                  item: "Total campaign cost (661 sends × ₹5 + fixed)",
                  assumption: "₹58,305",
                  basis: "Modelled estimate — ~£545 GBP equivalent",
                },
              ].map((row) => (
                <tr key={row.item} className="hover:bg-slate-50 align-top">
                  <td className="px-4 py-3 font-medium text-slate-800">{row.item}</td>
                  <td className="px-4 py-3 text-slate-700 font-mono text-xs">{row.assumption}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Three Scenarios */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Three Win-Back Scenarios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {[
            {
              label: "Conservative",
              rate: "10%",
              customers: 66,
              gbp: "£8,822",
              inr: "₹9.4 lakh",
              netInr: "₹8,85,649",
              roi: "+1,519%",
              color: "border-blue-200 bg-blue-50",
              badge: "bg-blue-100 text-blue-700",
            },
            {
              label: "Base",
              rate: "15%",
              customers: 99,
              gbp: "£13,233",
              inr: "₹14.2 lakh",
              netInr: "₹13,57,626",
              roi: "+2,328%",
              color: "border-green-200 bg-green-50",
              badge: "bg-green-100 text-green-700",
            },
            {
              label: "Optimistic",
              rate: "20%",
              customers: 132,
              gbp: "£17,645",
              inr: "₹18.9 lakh",
              netInr: "₹18,29,510",
              roi: "+3,138%",
              color: "border-amber-200 bg-amber-50",
              badge: "bg-amber-100 text-amber-700",
            },
          ].map((s) => (
            <div key={s.label} className={`rounded-lg border p-5 ${s.color}`}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${s.badge}`}
                >
                  {s.label}
                </span>
                <span className="text-sm font-semibold text-slate-700">{s.rate} recovery</span>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Customers recovered</span>
                  <span className="font-medium text-slate-900">{s.customers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Revenue recovered</span>
                  <span className="font-medium text-slate-900">{s.gbp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Revenue (₹)</span>
                  <span className="font-medium text-slate-900">{s.inr}</span>
                </div>
                <div className="border-t border-slate-200 pt-1.5 mt-1.5 flex justify-between">
                  <span className="text-slate-600">Net revenue (after ₹58K cost)</span>
                  <span className="font-medium text-slate-900">{s.netInr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700">Campaign ROI</span>
                  <span className="font-bold text-green-700 text-base">{s.roi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          <strong>ROI formula:</strong> (Revenue Recovered − Campaign Cost) / Campaign Cost × 100.
          Recovery rate = % of At-Risk customers placing at least one qualifying order within 90
          days. Benchmarks sourced from Klaviyo and Salesforce Marketing Cloud consumer retail
          research (2022–2024).
        </p>
      </section>

      {/* Sensitivity Table */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Sensitivity Analysis</h2>
        <p className="text-xs text-slate-500 mb-3">
          Net revenue recovered (₹) across varying recovery rates and campaign costs
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Recovery Rate</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700">
                  Campaign ₹40K
                </th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700 bg-green-50">
                  Campaign ₹58K (Base)
                </th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700">
                  Campaign ₹1L
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { rate: "10%", c40: "₹9,03,954", c58: "₹8,85,649", c100: "₹8,43,954" },
                { rate: "15%", c40: "₹13,75,931", c58: "₹13,57,626", c100: "₹13,15,931" },
                { rate: "20%", c40: "₹18,47,815", c58: "₹18,29,510", c100: "₹17,87,815" },
                { rate: "25%", c40: "₹23,15,557", c58: "₹22,97,252", c100: "₹22,55,557" },
              ].map((row) => (
                <tr key={row.rate} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{row.rate}</td>
                  <td className="px-4 py-3 text-slate-700 font-mono text-xs text-right">
                    {row.c40}
                  </td>
                  <td className="px-4 py-3 text-slate-900 font-mono text-xs text-right font-semibold bg-green-50">
                    {row.c58}
                  </td>
                  <td className="px-4 py-3 text-slate-700 font-mono text-xs text-right">
                    {row.c100}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Break-even recovery rate at ₹58K campaign cost ≈ 0.7% (5 of 661 customers). The
          campaign is cash-positive above this threshold.
        </p>
      </section>

      {/* Network Extrapolation */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">
          Network Extrapolation — Indian Retail
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Applying the same methodology at scale across two Indian retail reference networks. All
          figures are modelled estimates — explicitly labelled.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* DMart */}
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
              <h3 className="text-sm font-semibold text-slate-900">
                DMart — ~350 stores
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Avenue Supermarts Ltd (2024, publicly reported store count)
              </p>
            </div>
            <div className="px-5 py-4 space-y-2 text-sm">
              {[
                { label: "Enrolled customers (350 × 5,000)", value: "17.5 lakh", note: "modelled" },
                { label: "At-Risk customers (15%)", value: "2,62,500", note: "modelled" },
                { label: "Revenue at risk (₹8,000/customer)", value: "₹210 Crore", note: "modelled" },
                { label: "Recovered at Base 15%", value: "39,375 customers", note: "modelled" },
                { label: "Revenue recovered", value: "₹31.5 Crore", note: "" },
                { label: "Campaign cost (₹5/email)", value: "₹13.1 lakh", note: "" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-baseline gap-2">
                  <span className="text-slate-600 text-xs">{row.label}</span>
                  <span className="font-medium text-slate-900 text-xs whitespace-nowrap">
                    {row.value}
                    {row.note && (
                      <span className="text-slate-400 font-normal ml-1">({row.note})</span>
                    )}
                  </span>
                </div>
              ))}
              <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline">
                <span className="font-semibold text-slate-700 text-xs">Net ROI</span>
                <span className="font-bold text-green-700">~₹31.4 Crore</span>
              </div>
            </div>
          </div>

          {/* Reliance Retail */}
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
              <h3 className="text-sm font-semibold text-slate-900">
                Reliance Retail — ~18,000 stores
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Smart Bazaar, Trends, Jio Points, Reliance Digital (2024)
              </p>
            </div>
            <div className="px-5 py-4 space-y-2 text-sm">
              {[
                { label: "Enrolled customers (18,000 × 2,000)", value: "3.6 Crore", note: "modelled" },
                { label: "At-Risk customers (15%)", value: "54 lakh", note: "modelled" },
                { label: "Revenue at risk (₹6,500/customer)", value: "₹3,510 Crore", note: "modelled" },
                { label: "Recovered at Base 15%", value: "8,10,000 customers", note: "modelled" },
                { label: "Revenue recovered", value: "₹526.5 Crore", note: "" },
                { label: "Campaign cost (₹5/email)", value: "₹2.7 Crore", note: "" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-baseline gap-2">
                  <span className="text-slate-600 text-xs">{row.label}</span>
                  <span className="font-medium text-slate-900 text-xs whitespace-nowrap">
                    {row.value}
                    {row.note && (
                      <span className="text-slate-400 font-normal ml-1">({row.note})</span>
                    )}
                  </span>
                </div>
              ))}
              <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline">
                <span className="font-semibold text-slate-700 text-xs">Net ROI</span>
                <span className="font-bold text-green-700">~₹523.8 Crore</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          DMart does not operate a traditional loyalty programme as of 2024 — this extrapolation
          assumes a DMart-equivalent retailer with loyalty enrolment. Store counts from publicly
          reported 2024 annual reports. Customer-per-store and revenue-per-customer figures are
          modelled estimates (confidence: low). See Sources for full disclosure.
        </p>
      </section>

      {/* DPDP compliance note */}
      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">India Compliance Note — DPDP Act 2023</h3>
        <p className="text-sm text-blue-900 leading-relaxed">
          The Digital Personal Data Protection Act 2023 governs how Indian businesses collect, store,
          and use customer data for marketing purposes. A win-back campaign of this type would require
          explicit consent from At-Risk customers before sending email communications, and a
          clear opt-out mechanism. The agentic workflow architecture in this project includes a
          human approval gate — a natural integration point for a compliance check before any
          campaign is dispatched.
        </p>
      </section>
    </main>
  )
}
