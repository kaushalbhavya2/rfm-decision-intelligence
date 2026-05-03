const skuData = [
  {
    sku: "23084",
    description: "Rabbit Night Light",
    avgWeeklyDemand: 3007,
    forecast4w: 12028,
    modelledStock: 4937,
    daysOfSupply: 11.5,
    risk: "REORDER RISK" as const,
  },
  {
    sku: "79321",
    description: "Chilli Lights",
    avgWeeklyDemand: 450,
    forecast4w: 1801,
    modelledStock: 757,
    daysOfSupply: 11.8,
    risk: "REORDER RISK" as const,
  },
  {
    sku: "84879",
    description: "Assorted Colour Bird Ornament",
    avgWeeklyDemand: 966,
    forecast4w: 3865,
    modelledStock: 2661,
    daysOfSupply: 19.3,
    risk: "Monitor" as const,
  },
  {
    sku: "85123A",
    description: "White Hanging Heart T-Light Holder",
    avgWeeklyDemand: 884,
    forecast4w: 3537,
    modelledStock: 2775,
    daysOfSupply: 22.0,
    risk: "Monitor" as const,
  },
  {
    sku: "85099B",
    description: "Jumbo Bag Red Retrospot",
    avgWeeklyDemand: 912,
    forecast4w: 3647,
    modelledStock: 3478,
    daysOfSupply: 26.7,
    risk: "Monitor" as const,
  },
  {
    sku: "22423",
    description: "Regency Cakestand 3 Tier",
    avgWeeklyDemand: 242,
    forecast4w: 969,
    modelledStock: 934,
    daysOfSupply: 27.0,
    risk: "Monitor" as const,
  },
  {
    sku: "23843",
    description: "Paper Craft, Little Birdie",
    avgWeeklyDemand: 80995,
    forecast4w: 323980,
    modelledStock: 323980,
    daysOfSupply: 28.0,
    risk: "Adequate" as const,
  },
  {
    sku: "47566",
    description: "Party Bunting",
    avgWeeklyDemand: 186,
    forecast4w: 745,
    modelledStock: 1153,
    daysOfSupply: 43.3,
    risk: "Adequate" as const,
  },
  {
    sku: "23166",
    description: "Medium Ceramic Top Storage Jar",
    avgWeeklyDemand: 180,
    forecast4w: 720,
    modelledStock: 9740,
    daysOfSupply: 378.8,
    risk: "Adequate" as const,
  },
  {
    sku: "22502",
    description: "Picnic Basket Wicker Small",
    avgWeeklyDemand: 2,
    forecast4w: 10,
    modelledStock: 175,
    daysOfSupply: 489.2,
    risk: "Adequate" as const,
  },
]

const riskStyle: Record<string, string> = {
  "REORDER RISK":
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-700 border border-red-200 whitespace-nowrap",
  Monitor:
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200",
  Adequate:
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 border border-green-200",
}

const riskLabel: Record<string, string> = {
  "REORDER RISK": "⚠ Reorder Risk",
  Monitor: "Monitor",
  Adequate: "✓ Adequate",
}

export default function ForecastPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Demand Forecast</h1>
        <p className="text-slate-500 text-sm">
          Top 10 SKUs by historical revenue — 4-week forward demand forecast with inventory risk
          flags.
        </p>
      </div>

      {/* Method summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Forecasting Method",
            value: "4-Week SMA",
            note: "Simple moving average of last 4 weeks",
          },
          {
            label: "Stock Model",
            value: "4× Avg Weekly Demand",
            note: "Full-period baseline (illustrative)",
          },
          {
            label: "Risk Threshold",
            value: "< 14 Days",
            note: "Standard wholesale reorder lead time",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-lg border border-slate-200 px-4 py-4"
          >
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              {card.label}
            </div>
            <div className="text-base font-bold text-slate-900 mb-0.5">{card.value}</div>
            <div className="text-xs text-slate-500">{card.note}</div>
          </div>
        ))}
      </div>

      {/* SKU Table */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">
          Top 10 SKUs — Inventory Risk Table
        </h2>
        <p className="text-xs text-slate-500 mb-3">Sorted by Days of Supply ascending (highest risk first)</p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">
                  SKU
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Description</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">
                  Avg Wk Demand
                </th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">
                  4W Forecast
                </th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">
                  Modelled Stock
                </th>
                <th className="text-right px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">
                  Days of Supply
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {skuData.map((row) => (
                <tr
                  key={row.sku}
                  className={`hover:bg-slate-50 ${row.risk === "REORDER RISK" ? "bg-red-50" : ""}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.sku}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{row.description}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-slate-700">
                    {row.avgWeeklyDemand.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-slate-700">
                    {row.forecast4w.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-slate-700">
                    {row.modelledStock.toLocaleString()}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-mono text-xs font-semibold ${
                      row.risk === "REORDER RISK"
                        ? "text-red-700"
                        : row.risk === "Monitor"
                        ? "text-amber-700"
                        : "text-slate-700"
                    }`}
                  >
                    {row.daysOfSupply.toFixed(1)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={riskStyle[row.risk]}>{riskLabel[row.risk]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500 space-y-1">
          <p>
            <strong className="text-slate-600">Stock model:</strong> Modelled at 4× full-period average weekly demand (illustrative assumption — not observed inventory data). In a live deployment, this module would consume real-time inventory data from an ERP or WMS system (SAP, Oracle, Vinculum, or Increff for Indian retailers).
          </p>
          <p>
            <strong className="text-slate-600">Threshold:</strong> &lt;14 days = Reorder Risk (wholesale 2-week lead time). For Indian quick commerce dark stores (Blinkit, Zepto, Swiggy Instamart), this threshold would be ≤3 days.
          </p>
          <p>
            <strong className="text-slate-600">Forecasting method:</strong> 4-week simple moving average (anchor date: 09 Dec 2011). A production model would use Holt-Winters exponential smoothing or Prophet to capture trend and seasonality.
          </p>
        </div>
      </section>

      {/* Indian context */}
      <section className="rounded-lg border border-blue-200 bg-blue-50 p-5">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Indian Retail Context</h3>
        <div className="space-y-2 text-sm text-blue-900 leading-relaxed">
          <p>
            <strong>Quick Commerce (Blinkit, Zepto, Swiggy Instamart):</strong> Dark stores operate
            on 3–7 days of stock holding. A DoS threshold of ≤3 days would trigger immediate
            replenishment in this context. Stockout at a dark store results in direct revenue loss
            and order cancellation.
          </p>
          <p>
            <strong>Kirana Supply Chain:</strong> India&apos;s informal distributor network is
            historically prone to stockouts driven by demand forecasting failures at the stockist
            level. FMCG majors (HUL, Nestlé India, Britannia) have invested in demand sensing tools
            to address this — the logic demonstrated here is a simplified analogue of those systems.
          </p>
          <p>
            <strong>WMS Integration:</strong> Retailers using Increff or Vinculum for warehouse
            management already hold the SKU-level demand and stock data required to run this module
            in production. The forecasting logic would sit upstream of the replenishment planning
            layer, feeding reorder signals into the WMS.
          </p>
        </div>
      </section>

      {/* Limitations */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Limitations</h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Assumption</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Detail</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">
                  Impact if Wrong
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  assumption: "Stock = 4× average weekly demand",
                  detail: "Illustrative only — not observed inventory",
                  impact: "If actual stock is lower, more SKUs would be at risk",
                },
                {
                  assumption: "4-week SMA for forecasting",
                  detail: "Ignores trend and seasonality",
                  impact:
                    "Q4 seasonal spike causes under-forecasting if run in November",
                },
                {
                  assumption: "No lead time variability",
                  detail: "Assumes constant 14-day lead time",
                  impact: "Variable lead times require safety stock buffer modelling",
                },
                {
                  assumption: "Top 10 by revenue, not margin",
                  detail: "Revenue ≠ profit contribution",
                  impact:
                    "High-volume, low-margin SKUs may appear in the top 10",
                },
              ].map((row) => (
                <tr key={row.assumption} className="hover:bg-slate-50 align-top">
                  <td className="px-4 py-3 font-medium text-slate-800">{row.assumption}</td>
                  <td className="px-4 py-3 text-slate-600">{row.detail}</td>
                  <td className="px-4 py-3 text-slate-600">{row.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
