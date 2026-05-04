import Link from "next/link"
import { Database, Radar, Brain, CheckCircle, Zap, ClipboardList } from "lucide-react"
import { getInsights } from "@/lib/insights"
import { InsightCardWrapper } from "@/components/InsightCard"
import { TableauEmbed } from "@/components/TableauEmbed"

// ─── Static data ────────────────────────────────────────────────────────────

const segmentData = [
  {
    name: "High Value",
    customers: 929,
    pctCustomers: 21.4,
    revenue: 6229304,
    pctRevenue: 70.1,
    avg: 6705,
    barColor: "bg-green-500",
    badge: "bg-green-100 text-green-700",
  },
  {
    name: "At-Risk",
    customers: 661,
    pctCustomers: 15.2,
    revenue: 823912,
    pctRevenue: 9.3,
    avg: 1246,
    barColor: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    name: "Loyal",
    customers: 527,
    pctCustomers: 12.1,
    revenue: 622284,
    pctRevenue: 7.0,
    avg: 1181,
    barColor: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    name: "Lost",
    customers: 1074,
    pctCustomers: 24.8,
    revenue: 523803,
    pctRevenue: 5.9,
    avg: 488,
    barColor: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600",
  },
  {
    name: "Low Value",
    customers: 677,
    pctCustomers: 15.6,
    revenue: 354215,
    pctRevenue: 4.0,
    avg: 523,
    barColor: "bg-slate-300",
    badge: "bg-slate-100 text-slate-500",
  },
  {
    name: "Promising",
    customers: 470,
    pctCustomers: 10.8,
    revenue: 333690,
    pctRevenue: 3.8,
    avg: 710,
    barColor: "bg-indigo-400",
    badge: "bg-indigo-100 text-indigo-700",
  },
]

const skuData = [
  { sku: "23084", description: "Rabbit Night Light", avgWk: 3007, forecast4w: 12028, stock: 4937, dos: 11.5, risk: "REORDER" as const },
  { sku: "79321", description: "Chilli Lights", avgWk: 450, forecast4w: 1801, stock: 757, dos: 11.8, risk: "REORDER" as const },
  { sku: "84879", description: "Assorted Colour Bird Ornament", avgWk: 966, forecast4w: 3865, stock: 2661, dos: 19.3, risk: "MONITOR" as const },
  { sku: "85123A", description: "White Hanging Heart T-Light Holder", avgWk: 884, forecast4w: 3537, stock: 2775, dos: 22.0, risk: "MONITOR" as const },
  { sku: "85099B", description: "Jumbo Bag Red Retrospot", avgWk: 912, forecast4w: 3647, stock: 3478, dos: 26.7, risk: "MONITOR" as const },
  { sku: "22423", description: "Regency Cakestand 3 Tier", avgWk: 242, forecast4w: 969, stock: 934, dos: 27.0, risk: "MONITOR" as const },
  { sku: "23843", description: "Paper Craft, Little Birdie", avgWk: 80995, forecast4w: 323980, stock: 323980, dos: 28.0, risk: "OK" as const },
  { sku: "47566", description: "Party Bunting", avgWk: 186, forecast4w: 745, stock: 1153, dos: 43.3, risk: "OK" as const },
  { sku: "23166", description: "Medium Ceramic Top Storage Jar", avgWk: 180, forecast4w: 720, stock: 9740, dos: 378.8, risk: "OK" as const },
  { sku: "22502", description: "Picnic Basket Wicker Small", avgWk: 2, forecast4w: 10, stock: 175, dos: 489.2, risk: "OK" as const },
]

const pipelineSteps = [
  { icon: Database, label: "Data", description: "392K transactions" },
  { icon: Radar, label: "Signal Detection", description: "4 signals detected" },
  { icon: Brain, label: "AI Synthesis", description: "Claude Sonnet" },
  { icon: CheckCircle, label: "Human Approval", description: "Approve / Modify / Reject" },
  { icon: Zap, label: "Action", description: "CRM email draft" },
  { icon: ClipboardList, label: "Audit", description: "Full decision trail" },
]

const tableau1Html = `<div class='tableauPlaceholder' id='viz1777712575952' style='position: relative'><noscript><a href='#'><img alt='Dashboard 1 ' src='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard1/1_rss.png' style='border: none' /></a></noscript><object class='tableauViz' style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /><param name='embed_code_version' value='3' /><param name='site_root' value='' /><param name='name' value='RFMcustomersegmentation_17777123503690/Dashboard1' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard1/1.png' /><param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /></object></div><script type='text/javascript'>var divElement = document.getElementById('viz1777712575952');var vizElement = divElement.getElementsByTagName('object')[0];if(divElement.offsetWidth > 800){vizElement.style.minWidth='600px';vizElement.style.maxWidth='1400px';vizElement.style.width='100%';vizElement.style.minHeight='527px';vizElement.style.maxHeight='1127px';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else if(divElement.offsetWidth > 500){vizElement.style.minWidth='600px';vizElement.style.maxWidth='1400px';vizElement.style.width='100%';vizElement.style.minHeight='527px';vizElement.style.maxHeight='1127px';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else{vizElement.style.width='100%';vizElement.style.height='1027px';}var scriptElement=document.createElement('script');scriptElement.src='https://public.tableau.com/javascripts/api/viz_v1.js';vizElement.parentNode.insertBefore(scriptElement,vizElement);</script>`

const tableau2Html = `<div class='tableauPlaceholder' id='viz1777790744842' style='position: relative'><noscript><a href='#'><img alt=' ' src='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard2/1_rss.png' style='border: none' /></a></noscript><object class='tableauViz' style='display:none;'><param name='embed_code_version' value='3' /><param name='site_root' value='' /><param name='name' value='RFMcustomersegmentation_17777123503690/Dashboard2' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https://public.tableau.com/static/images/RF/RFMcustomersegmentation_17777123503690/Dashboard2/1.png' /><param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /></object></div><script type='text/javascript'>var divElement=document.getElementById('viz1777790744842');var vizElement=divElement.getElementsByTagName('object')[0];if(divElement.offsetWidth > 800){vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else if(divElement.offsetWidth > 500){vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';}else{vizElement.style.width='100%';vizElement.style.height='1427px';}var scriptElement=document.createElement('script');scriptElement.src='https://public.tableau.com/javascripts/api/viz_v1.js';vizElement.parentNode.insertBefore(scriptElement,vizElement);</script>`

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const insights = getInsights()

  return (
    <main className="bg-slate-50">

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-500">
              Retail Analytics · Decision Intelligence · Bhavya Kaushal
            </p>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 mt-3 max-w-3xl leading-tight">
            £8.8M in Revenue.<br />661 Customers Walking Out the Door.
          </h1>
          <p className="text-xl font-medium text-slate-500 mt-5 max-w-2xl leading-snug">
            The insight existed. The decision did not.
          </p>
          <p className="text-base leading-relaxed text-slate-600 mt-6 max-w-2xl">
            Most retail analytics projects stop at the insight — the dashboard updates, the slide
            gets presented, and then the analyst waits to see whether anyone acts. The gap between
            finding and action is where revenue leaks. This project runs RFM segmentation across
            4,338 customers, extends to a CLV regression and demand forecast, and ends with an
            agentic workflow that synthesises the analysis into a structured recommendation, captures
            the decision in an audit trail, and drafts the first email — before the analyst touches
            the keyboard.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              "4,338 Customers",
              "392K Transactions",
              "£8.9M Revenue",
              "4 AI-Generated Signals",
              "Claude Sonnet",
              "Vercel · Next.js 14",
            ].map((b) => (
              <span
                key={b}
                className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200"
              >
                {b}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Dataset values: GBP &nbsp;·&nbsp; India deployment context: ₹ at ×107 conversion
          </p>
        </div>
      </section>

      {/* ── 1b. EXECUTIVE SUMMARY ───────────────────────────────────────── */}
      <section className="bg-indigo-950 py-12 border-b border-indigo-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-indigo-900/50 border border-indigo-800 rounded-xl p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-3">
                Problem
              </p>
              <p className="text-white font-semibold text-base leading-snug mb-2">
                The insight existed. The decision didn&apos;t.
              </p>
              <p className="text-indigo-200 text-sm leading-relaxed">
                661 At-Risk customers. £88K in historical revenue. Identified by the model.
                Unsegmented in the CRM. No action taken. The standard analytics stack stops at
                the dashboard.
              </p>
            </div>
            <div className="bg-indigo-900/50 border border-indigo-800 rounded-xl p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-3">
                Solution
              </p>
              <p className="text-white font-semibold text-base leading-snug mb-2">
                Analysis → AI synthesis → human decision → audited action.
              </p>
              <p className="text-indigo-200 text-sm leading-relaxed">
                An agentic workflow that detects signals, synthesises structured recommendations
                via Claude Sonnet, captures the approval decision, and drafts the first CRM email
                — with a full audit trail at every step.
              </p>
            </div>
            <div className="bg-indigo-900/50 border border-indigo-800 rounded-xl p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-indigo-400 mb-3">
                Enterprise Relevance
              </p>
              <p className="text-white font-semibold text-base leading-snug mb-2">
                Built for Indian retail at scale.
              </p>
              <p className="text-indigo-200 text-sm leading-relaxed">
                DMart, Reliance Retail, Nykaa, Flipkart — any loyalty programme with transaction
                data can run this pipeline. The architecture is production-extensible. The
                methodology is validated on real transaction data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. KEY METRICS ───────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-14 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-8">
            Performance Snapshot
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Customers Analysed", value: "4,338", sub: "392,692 attributed transactions" },
              { label: "Total Revenue (Dataset)", value: "£8.89M", sub: "₹95.1 Crore · Dec 2010–Dec 2011" },
              { label: "Revenue Concentration", value: "70.1%", sub: "from 21.4% of customers (High Value)" },
              { label: "Revenue Gap", value: "13.7×", sub: "High Value avg vs Lost avg (£6,705 vs £488)" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-xl" />
                <p className="text-xs font-semibold tracking-wide uppercase text-slate-400 mb-3 pl-1">
                  {s.label}
                </p>
                <p className="text-4xl font-bold text-slate-900 tabular-nums leading-none pl-1">
                  {s.value}
                </p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed pl-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. THE ANALYSIS ──────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-1">
            The Analytical Work
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
            What the Data Revealed
          </h2>
          <p className="text-slate-500 text-sm mb-10 max-w-2xl">
            RFM segmentation across 4,338 customers using quintile-based scoring (1–5 scale) on
            Recency, Frequency, and Monetary dimensions. Segments assigned by score combinations.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Segment Table (spans 2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500">
                        Segment
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500">
                        Customers
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500">
                        Revenue
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500 w-44">
                        Revenue Share
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500">
                        Avg / Customer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {segmentData.map((seg) => (
                      <tr
                        key={seg.name}
                        className="border-t border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${seg.badge}`}
                          >
                            {seg.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-700 text-xs">
                          {seg.customers.toLocaleString()}
                          <span className="text-slate-400 ml-1">({seg.pctCustomers}%)</span>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums font-semibold text-slate-900 text-xs">
                          £{(seg.revenue / 1000).toFixed(0)}K
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-100 rounded-full h-2">
                              <div
                                className={`${seg.barColor} h-2 rounded-full bar-animate`}
                                style={
                                  { "--bar-width": `${seg.pctRevenue}%` } as React.CSSProperties
                                }
                              />
                            </div>
                            <span className="text-xs text-slate-500 tabular-nums w-9 text-right">
                              {seg.pctRevenue}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-slate-700 text-xs">
                          £{seg.avg.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Key finding callout beneath table */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-2">
                  Pareto Concentration
                </p>
                <p className="text-sm text-indigo-900 leading-relaxed">
                  <strong>21.4% of customers generate 70.1% of all revenue.</strong> The High
                  Value segment averages £6,705 per customer — 13.7× the Lost segment average of
                  £488. Protecting and growing this segment is the highest-leverage analytical
                  priority in the dataset.
                </p>
              </div>
            </div>

            {/* Right column: cohort callout + monthly peak */}
            <div className="space-y-5">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-3">
                  Cohort Retention
                </p>
                <p className="text-4xl font-bold text-indigo-600 tabular-nums leading-none">
                  37%
                </p>
                <p className="text-sm text-indigo-800 mt-2 leading-relaxed">
                  of month-1 customers return in month 2.
                </p>
                <p className="text-xs text-indigo-600 mt-3 leading-relaxed">
                  885 customers acquired in December 2010. Only 324 transacted again in January
                  2011. Retention stabilises at 35–40% through months 3–10, then spikes to 50% in
                  November 2011 (Christmas restocking).
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-xl" />
                <p className="text-xs font-semibold tracking-wide uppercase text-slate-400 mb-2 pl-1">
                  Peak Revenue Month
                </p>
                <p className="text-3xl font-bold text-slate-900 tabular-nums pl-1">£1.16M</p>
                <p className="text-xs text-slate-500 mt-1 pl-1">
                  November 2011 · 2,657 orders · 1,664 customers
                </p>
                <p className="text-xs text-slate-400 mt-3 pl-1 leading-relaxed">
                  Strong Q4 seasonality. September–November revenue 2.1× the Jan–Aug monthly
                  average.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <p className="text-xs font-semibold tracking-wide uppercase text-slate-400 mb-2">
                  Dataset Note
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  UCI Online Retail — UK wholesale gift distributor (B2B). Used here as a
                  methodology proxy for B2C retail. All strategic recommendations calibrated to
                  consumer norms.{" "}
                  <Link href="/methodology" className="text-indigo-600 underline hover:text-indigo-800">
                    Full disclosure →
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Tableau Dashboards */}
          <div className="mt-12 space-y-8">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">
                Tableau Dashboard 1 — RFM Segmentation Overview
              </p>
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                <TableauEmbed id="tableau-home-1" html={tableau1Html} />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3">
                Tableau Dashboard 2 — Segment Deep Dive
              </p>
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                <TableauEmbed id="tableau-home-2" html={tableau2Html} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PROBLEM BRIDGE ────────────────────────────────────────────── */}
      <section className="bg-slate-100 py-14 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border-l-4 border-indigo-600 rounded-r-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
            <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-4">
              The Strategic Gap
            </p>
            <p className="text-lg leading-relaxed text-slate-700 font-medium">
              The analysis above is not the bottleneck. Every retail business with a loyalty
              programme has this data. The bottleneck is the path from model output to operational
              decision — the two to five days between an analyst completing a segmentation run and
              a campaign being drafted. In that window, lapsed customers move further away, At-Risk
              accounts churn, and reorder windows close. The prototype below is built to close that
              gap without removing the human from the decision.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. LIVE SYSTEM ───────────────────────────────────────────────── */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-green-400">
              Working Prototype
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-white mt-5 tracking-tight">
            Decision Intelligence Workflow
          </h2>
          <p className="text-slate-400 text-base mt-3 max-w-2xl leading-relaxed">
            Four signals detected automatically from 4,338 customer records. Claude Sonnet
            synthesised each into a structured recommendation with finding, expected impact, and
            cost of inaction. Approve, modify, or reject each below — your decision is logged to
            the{" "}
            <Link href="/audit" className="text-slate-300 underline hover:text-white">
              audit trail
            </Link>
            .
          </p>

          {/* Insight cards — 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
            {insights.map((insight) => (
              <InsightCardWrapper key={insight.signal_id} insight={insight} />
            ))}
          </div>

          <p className="text-xs text-slate-600 mt-6">
            Approving or modifying opens a review drawer with the full finding, expected impact,
            and cost of inaction. The confirmed decision generates a CRM email draft and logs a
            unique action reference ID.{" "}
            <Link href="/insights" className="text-slate-500 underline hover:text-slate-300">
              Full insight feed →
            </Link>
          </p>
        </div>
      </section>

      {/* ── 6. ROI MODEL ─────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-1">
            Business Case
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
            ROI Model — At-Risk Win-Back Campaign
          </h2>
          <p className="text-slate-500 text-sm mb-10 max-w-2xl">
            661 At-Risk customers represent £88,223 (₹94.4 lakh) in historical revenue. A 3-email
            win-back campaign, benchmarked to Indian email marketing costs, delivers the following
            outcomes across three recovery scenarios.
          </p>

          {/* Three scenario cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Conservative */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 hover:-translate-y-1 transition-transform duration-200 shadow-sm hover:shadow-lg">
              <p className="text-xs font-bold tracking-widest uppercase text-blue-500 mb-1">
                Conservative
              </p>
              <p className="text-sm text-blue-700 mb-3">10% recovery · 66 customers</p>
              <p className="text-3xl font-bold text-blue-700 tabular-nums">₹8.9L</p>
              <p className="text-xs text-blue-600 mt-1">net revenue recovered</p>
              <div className="border-t border-blue-200 mt-5 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Revenue recovered</span>
                  <span className="font-semibold text-blue-700 tabular-nums">£8,822</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Campaign ROI</span>
                  <span className="font-bold text-blue-700 tabular-nums">+1,519%</span>
                </div>
              </div>
            </div>

            {/* Base — highlighted */}
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 ring-2 ring-green-400 ring-offset-2 hover:-translate-y-1 transition-transform duration-200 shadow-sm hover:shadow-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold tracking-widest uppercase text-green-600">
                  Base
                </p>
                <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">
                  Most Likely
                </span>
              </div>
              <p className="text-sm text-green-700 mb-3">15% recovery · 99 customers</p>
              <p className="text-3xl font-bold text-green-700 tabular-nums">₹13.6L</p>
              <p className="text-xs text-green-600 mt-1">net revenue recovered</p>
              <div className="border-t border-green-200 mt-5 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Revenue recovered</span>
                  <span className="font-semibold text-green-700 tabular-nums">£13,233</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Campaign ROI</span>
                  <span className="font-bold text-green-700 tabular-nums">+2,328%</span>
                </div>
              </div>
            </div>

            {/* Optimistic */}
            <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-6 hover:-translate-y-1 transition-transform duration-200 shadow-sm hover:shadow-lg">
              <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-1">
                Optimistic
              </p>
              <p className="text-sm text-amber-700 mb-3">20% recovery · 132 customers</p>
              <p className="text-3xl font-bold text-amber-700 tabular-nums">₹18.3L</p>
              <p className="text-xs text-amber-600 mt-1">net revenue recovered</p>
              <div className="border-t border-amber-200 mt-5 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Revenue recovered</span>
                  <span className="font-semibold text-amber-700 tabular-nums">£17,645</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Campaign ROI</span>
                  <span className="font-bold text-amber-700 tabular-nums">+3,138%</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 mb-10">
            Campaign cost: ₹58,305 (₹5/email × 661 + ₹55K fixed creative &amp; analytics).
            Break-even recovery rate: <strong className="text-slate-600">0.7%</strong> — the
            campaign is cash-positive if just 5 of 661 customers return. Recovery rates benchmarked
            to consumer retail email (Klaviyo, Salesforce Marketing Cloud, 2022–2024).{" "}
            <Link href="/roi" className="text-indigo-600 underline hover:text-indigo-800">
              Full ROI model with sensitivity table →
            </Link>
          </p>

          {/* India network extrapolation */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-1">
              Scale — Indian Retail Network Extrapolation
            </p>
            <p className="text-xs text-slate-400 italic mb-5">
              Illustrative scale potential, not projected outcome
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-bold text-slate-900 mb-0.5">
                  D-Mart{" "}
                  <span className="font-normal text-slate-500 text-xs">~350 stores (2024)</span>
                </p>
                <p className="text-2xl font-bold text-slate-900 tabular-nums mt-2">
                  ~₹31.4 Crore
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Net ROI · Base scenario · 2,62,500 At-Risk customers (modelled)
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 mb-0.5">
                  Reliance Retail{" "}
                  <span className="font-normal text-slate-500 text-xs">
                    ~18,000 stores (2024)
                  </span>
                </p>
                <p className="text-2xl font-bold text-slate-900 tabular-nums mt-2">
                  ~₹523.8 Crore
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Net ROI · Base scenario · 54 lakh At-Risk customers (modelled)
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-5 leading-relaxed">
              All extrapolation figures are modelled estimates (customers-per-store and
              revenue-per-customer are not publicly disclosed). Confidence: Low. Intended to
              illustrate methodology scale, not claim revenue. DPDP Act 2023 compliance required
              before any email campaign in India.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. DEMAND FORECAST ───────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-1">
            Operational Intelligence
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
            Demand Forecast — Top 10 SKUs
          </h2>
          <p className="text-slate-500 text-sm mb-8 max-w-2xl">
            The same dataset that drives customer segmentation simultaneously powers inventory
            decisions. 4-week simple moving average forecast against a modelled stock position —
            two SKUs flagged as reorder risks.
          </p>

          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500">
                    SKU
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500">
                    Description
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500 whitespace-nowrap">
                    Avg Wk Demand
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500 whitespace-nowrap">
                    4W Forecast
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500 whitespace-nowrap">
                    Days of Supply
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {skuData.map((row) => (
                  <tr
                    key={row.sku}
                    className={`border-t border-slate-100 transition-colors duration-150 ${
                      row.risk === "REORDER"
                        ? "bg-red-50"
                        : row.risk === "MONITOR"
                        ? "hover:bg-amber-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="px-4 py-3 relative">
                      {row.risk === "REORDER" && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400" />
                      )}
                      <span className="font-mono text-xs text-slate-500 pl-1">{row.sku}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800 text-xs">
                      {row.description}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-700 text-xs">
                      {row.avgWk.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-700 text-xs">
                      {row.forecast4w.toLocaleString()}
                    </td>
                    <td
                      className={`px-4 py-3 text-right tabular-nums text-xs font-semibold ${
                        row.risk === "REORDER"
                          ? "text-red-700"
                          : row.risk === "MONITOR"
                          ? "text-amber-700"
                          : "text-slate-700"
                      }`}
                    >
                      {row.dos.toFixed(1)}
                    </td>
                    <td className="px-4 py-3">
                      {row.risk === "REORDER" ? (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                          ⚠ Reorder
                        </span>
                      ) : row.risk === "MONITOR" ? (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                          Monitor
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                          ✓ Adequate
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Stock modelled at 4× full-period average weekly demand. Risk threshold: &lt;14 days
            (wholesale 2-week lead time). For Indian quick commerce dark stores (Blinkit, Zepto),
            equivalent threshold is ≤3 days.{" "}
            <Link href="/forecast" className="text-indigo-600 underline hover:text-indigo-800">
              Full forecast with limitations →
            </Link>
          </p>
        </div>
      </section>

      {/* ── 8. PIPELINE ──────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-1">
            Architecture
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-10">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={step.label}
                  className="flex flex-col md:flex-row items-start md:items-center flex-1 min-w-0"
                >
                  <div className="flex flex-col items-center text-center w-full px-3 py-2">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center mb-3 hover:bg-indigo-100 hover:border-indigo-400 transition-colors duration-150">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-xs font-semibold text-slate-800 mb-1 leading-tight">
                      {step.label}
                    </div>
                    <div className="text-xs text-slate-500 leading-snug max-w-[90px]">
                      {step.description}
                    </div>
                  </div>
                  {index < pipelineSteps.length - 1 && (
                    <div className="hidden md:block text-slate-300 text-xl font-light flex-shrink-0 mx-1">
                      →
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500">
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
              <p className="font-semibold text-slate-700 mb-1">Build-time pipeline</p>
              <p>Python · pandas · scikit-learn · Anthropic SDK · insights.json committed to repo</p>
            </div>
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
              <p className="font-semibold text-slate-700 mb-1">Runtime (Vercel)</p>
              <p>Next.js 14 App Router · shadcn/ui · Tailwind · no database · localStorage audit trail</p>
            </div>
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
              <p className="font-semibold text-slate-700 mb-1">Production extension</p>
              <p>n8n workflow · Slack approval · Gmail draft · append-only DB · hash-chained audit</p>
            </div>
          </div>

          {/* Production architecture flow */}
          <div className="mt-8 bg-slate-50 rounded-xl border border-slate-200 p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-5">
              Production Architecture — Indian Retail Deployment
            </p>
            <div className="overflow-x-auto">
              <div className="flex items-stretch gap-1 min-w-max">
                {[
                  { label: "POS / CRM / WMS", sub: "Transaction feeds", color: "bg-slate-100 border-slate-300 text-slate-700" },
                  { label: "ETL / Streaming", sub: "Kafka · Spark", color: "bg-slate-100 border-slate-300 text-slate-700" },
                  { label: "Segmentation Engine", sub: "RFM · CLV · Forecast", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
                  { label: "Signal Detection", sub: "Threshold rules", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
                  { label: "LLM Synthesis", sub: "Claude / GPT", color: "bg-purple-50 border-purple-200 text-purple-700" },
                  { label: "Human Approval", sub: "Approve / Modify / Reject", color: "bg-green-50 border-green-200 text-green-700" },
                  { label: "CRM / WMS Action", sub: "Email · PO · Offer", color: "bg-amber-50 border-amber-200 text-amber-700" },
                  { label: "Audit Log", sub: "Append-only · hash-chained", color: "bg-red-50 border-red-200 text-red-700" },
                ].map((node, i, arr) => (
                  <div key={node.label} className="flex items-center gap-1">
                    <div className={`rounded-lg border px-3 py-2.5 text-center min-w-[96px] ${node.color}`}>
                      <p className="text-xs font-semibold leading-snug">{node.label}</p>
                      <p className="text-xs opacity-60 mt-0.5 leading-snug">{node.sub}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="text-slate-300 text-base flex-shrink-0 font-light">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              This prototype implements the <strong className="text-slate-600">Segmentation Engine → Signal Detection → LLM Synthesis → Human Approval → Audit Log</strong> chain. POS/CRM integration, ETL streaming, and live CRM write-back are the production extension layer.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8b. ACCENTURE RELEVANCE ──────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-1">
            Strategic Fit
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
            Why This Matters for Accenture Clients
          </h2>
          <p className="text-slate-500 text-sm mb-10 max-w-2xl">
            India&apos;s organised retail sector is data-rich and decision-poor. The gap this
            prototype addresses is endemic across Accenture&apos;s FMCG, retail, and CPG client base.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className="text-2xl mb-3">🏪</p>
              <p className="font-semibold text-slate-900 mb-2">Indian Retail Clients</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                DMart, Reliance Retail, Spencer&apos;s, Big Basket, Nykaa — all operate loyalty
                programmes with transaction-level data. None have a closed-loop signal → decision
                → action → audit workflow. This prototype is the architectural blueprint for that
                missing layer.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className="text-2xl mb-3">🤖</p>
              <p className="font-semibold text-slate-900 mb-2">Agentic AI Practice</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                The workflow here — LLM synthesis, structured output, human-in-the-loop approval,
                audited action — is the exact pattern Accenture&apos;s AI &amp; Data practice is
                productising across enterprises. This is a working reference implementation built
                from first principles.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <p className="text-2xl mb-3">📋</p>
              <p className="font-semibold text-slate-900 mb-2">DPDP Act 2023 Readiness</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                India&apos;s data protection law requires consent records and audit trails for
                personalised marketing. The audit log here — with action reference IDs, decision
                timestamps, and recommendation lineage — maps directly to those compliance
                requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FOOTER / METHODOLOGY ──────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-8">
            Methodology &amp; Data Provenance
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
              <p>
                <strong className="text-slate-200">Dataset:</strong> UCI Online Retail — UK
                wholesale B2B gift distributor, Dec 2010–Dec 2011. Used as a methodology proxy for
                B2C retail. 541,909 raw transactions reduced to 392,692 after cancellation, null
                CustomerID, and duplicate removal.
              </p>
              <p>
                <strong className="text-slate-200">RFM:</strong> Quintile binning (1–5). Segments
                by score combination. Signal thresholds data-driven: r_score==3 for High Value churn
                risk; P95 predicted CLV for Lost anomaly.
              </p>
              <p>
                <strong className="text-slate-200">CLV model:</strong> Linear regression on R, F, M
                scores. R²=0.1426 (disclosed). CLV proxy winsorised at P99 = £1,057,680 to correct
                single-transaction annualisation distortion.
              </p>
              <p>
                <strong className="text-slate-200">Audit trail:</strong> Browser localStorage —
                prototype only. Production would use an append-only database with hash chaining.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-3">
                  Explore Supporting Pages
                </p>
                <div className="space-y-2">
                  {[
                    { href: "/methodology", label: "Full Methodology + Tableau Dashboards" },
                    { href: "/roi", label: "Complete ROI Model + Sensitivity Analysis" },
                    { href: "/forecast", label: "Full Demand Forecast + Limitations" },
                    { href: "/audit", label: "Decision Audit Trail" },
                    { href: "/sources", label: "17-Row Assumptions Register" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors duration-150 group"
                    >
                      <span className="text-slate-600 group-hover:text-indigo-400 transition-colors">
                        →
                      </span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-800 pt-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Prepared by Bhavya Kaushal · MBA Marketing, RMIT Melbourne · May 2026
                </p>
                <p className="text-xs text-slate-700 mt-1">
                  AI synthesis: Claude Sonnet 4.6 · Built with Next.js 14 · Deployed on Vercel
                </p>
              </div>
            </div>
          </div>

          {/* Closing line */}
          <div className="border-t border-slate-800 mt-12 pt-8">
            <p className="text-sm text-slate-500 italic max-w-2xl">
              &ldquo;The gap between analytical insight and operational action is where most of the
              value is left on the table. This project is the infrastructure for closing it.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
