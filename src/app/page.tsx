import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { Database, Radar, Brain, CheckCircle, Zap, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { value: "4,338", label: "Customers Analysed" },
  { value: "70.09%", label: "Revenue from High Value Segment" },
  { value: "28×", label: "Revenue Gap: High Value vs Lost" },
]

const pipelineSteps = [
  {
    icon: Database,
    label: "Data",
    description: "392K transactions, 4,338 customers",
  },
  {
    icon: Radar,
    label: "Signal Detection",
    description: "4 signals detected automatically",
  },
  {
    icon: Brain,
    label: "AI Synthesis",
    description: "Claude Sonnet generates insight cards",
  },
  {
    icon: CheckCircle,
    label: "Human Approval",
    description: "Approve, modify, or reject",
  },
  {
    icon: Zap,
    label: "Action",
    description: "CRM email draft generated",
  },
  {
    icon: ClipboardList,
    label: "Audit",
    description: "Full decision trail logged",
  },
]

const findings = [
  {
    n: "01",
    text: "661 customers in the At-Risk segment represent £88,223 (₹94.4 lakh) in historical revenue — recoverable with a targeted 3-email win-back campaign at an estimated cost of ₹58,000 and a net ROI exceeding 2,300% at a 15% recovery rate.",
    href: "/roi",
    cta: "View ROI Model →",
  },
  {
    n: "02",
    text: "High Value customers average £6,800 (₹7.27 lakh) in lifetime revenue — six times the dataset mean — and a subset of 23 show early recency decline signals that, if unaddressed within 60 days, will reclassify them to a lower segment and erode disproportionate revenue.",
    href: "/insights",
    cta: "View Insights →",
  },
  {
    n: "03",
    text: "The top 10 SKUs show Days of Supply ranging from 11.5 to 489 days — two are flagged as reorder risks — demonstrating how the same dataset that drives customer segmentation can simultaneously power operational inventory decisions.",
    href: "/forecast",
    cta: "View Demand Forecast →",
  },
]

export default function HomePage() {
  return (
    <main>
      {/* Page header */}
      <div className="bg-white border-b border-slate-200 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            RFM Decision Intelligence
          </h1>
          <p className="text-slate-600">
            From segmentation to action — a human-supervised decision intelligence workflow
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Hero narrative */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-slate-700 leading-relaxed text-sm">
            Most retail analytics projects stop at the insight. A segmentation model runs, a
            dashboard updates, a slide gets presented — and then the analyst waits to see whether
            anyone acts on it. The gap between finding and action is where revenue leaks — not
            because the analysis was wrong, but because the path from model output to operational
            decision is too long. This project begins with RFM segmentation across 4,338 customers,
            extends to a CLV regression model and a demand forecast, and ends with an agentic
            workflow that synthesises the analysis into a human-readable recommendation, routes it
            to an approver, captures the decision in an audit trail, and drafts the first email —
            all before the analyst touches the keyboard. The methodology is demonstrated on a proxy
            dataset (UCI Online Retail, 2010–2011); the architecture is designed for a live Indian
            retail deployment.
          </p>
        </div>

        {/* Three core findings */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Three Core Findings</h2>
          <div className="space-y-3">
            {findings.map((f) => (
              <div
                key={f.n}
                className="bg-white rounded-lg border border-slate-200 p-5 flex gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                  {f.n}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 leading-relaxed mb-2">{f.text}</p>
                  <Link
                    href={f.href}
                    className="text-xs font-medium text-slate-600 hover:text-slate-900 underline underline-offset-2"
                  >
                    {f.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-white">
              <CardContent className="pt-6 pb-6 text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* The so-what */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-2">The So-What</h2>
          <p className="text-slate-700 leading-relaxed text-sm">
            Segmentation and forecasting are not novel. What is novel — and what most retail
            analytics implementations lack — is the automation layer that turns analytical output
            into operational action without a latency penalty. The agentic workflow in this project
            does not replace human judgement. It removes the friction that prevents human judgement
            from being applied quickly. An analyst who previously spent two days producing a
            win-back recommendation that sat in a slide deck for three more days now receives a
            pre-drafted recommendation, makes a one-click decision, and sees a CRM campaign drafted
            within minutes. The same analysis. Half the latency. The revenue case for that speed
            improvement — measured against the average time lapsed customers spend inactive before
            they are lost permanently — is the real ROI story.
          </p>
        </div>

        {/* Accenture India paragraph */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-2">
            Relevance to Accenture India
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm">
            This project demonstrates three things directly relevant to Accenture India&apos;s
            Analytics &amp; Intelligence and Customer, Sales &amp; Service practices. First,
            end-to-end ownership of the analytics stack — from data preprocessing and RFM modelling
            through to CLV regression, demand forecasting, and ROI quantification — with every
            assumption documented and every figure labelled by source. Second, systems thinking:
            the agentic workflow is a deliberately architected response to the decision latency
            problem that characterises most retail analytics deployments in India — where insight
            generation is not the bottleneck, but the path from insight to operational action is.
            Third, India market awareness: the ROI model is benchmarked to Indian email campaign
            costs, the network extrapolation uses DMart and Reliance Retail as reference points,
            the compliance layer references the DPDP Act 2023, and the strategic recommendations
            are contextualised against Indian retail formats including BigBasket, Flipkart, and
            JioMart.
          </p>
        </div>

        {/* FoodWorks context */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-2">Origin — FoodWorks</h2>
          <p className="text-slate-700 leading-relaxed text-sm">
            In 2024, at FoodWorks, I applied manual segmentation and inventory analysis to drive a
            14% category sales lift and a 35% reduction in stock wastage at the store level. The
            gap I kept running into was not analytical — the data existed. The gap was that by the
            time an insight was ready, the decision window had already closed. This project is my
            answer to that gap.
          </p>
        </div>

        {/* Pipeline flow */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-6">How It Works</h2>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-0">
              {pipelineSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.label}
                    className="flex flex-col lg:flex-row items-start lg:items-center flex-1 min-w-0"
                  >
                    <div className="flex flex-col items-center text-center w-full px-2 py-1">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2 flex-shrink-0">
                        <Icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className="text-xs font-semibold text-slate-800 mb-1 leading-tight">
                        {step.label}
                      </div>
                      <div className="text-xs text-slate-500 leading-snug max-w-[100px]">
                        {step.description}
                      </div>
                    </div>
                    {index < pipelineSteps.length - 1 && (
                      <div className="hidden lg:block text-slate-300 text-xl font-light flex-shrink-0 mx-1">
                        →
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/insights"
            className={cn(buttonVariants({ variant: "default" }), "bg-slate-900 hover:bg-slate-800 text-white")}
          >
            View Insights →
          </Link>
          <Link
            href="/roi"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            ROI Model →
          </Link>
          <Link
            href="/forecast"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Demand Forecast →
          </Link>
          <Link
            href="/methodology"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Methodology →
          </Link>
        </div>

        {/* Closing line */}
        <p className="text-sm text-slate-500 italic border-t border-slate-200 pt-6">
          The gap between analytical insight and operational action is where most of the value is
          left on the table. This project is the infrastructure for closing it.
        </p>
      </div>
    </main>
  )
}
