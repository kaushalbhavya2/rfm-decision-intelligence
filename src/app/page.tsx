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
        {/* Context paragraph */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-slate-700 leading-relaxed text-sm">
            In 2024, at FoodWorks, I applied manual segmentation and inventory analysis to drive a
            14% category sales lift and a 35% reduction in stock wastage at the store level. The gap
            I kept running into was not analytical — the data existed. The gap was that by the time
            an insight was ready, the decision window had already closed. This project is my answer
            to that gap. It takes the same segmentation methodology, applies it at scale across
            4,338 customers, and wraps it in an automated intelligence workflow that surfaces the
            right recommendation to the right person at the right moment — without requiring them to
            be an analyst.
          </p>
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
                    {/* Step card */}
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
                    {/* Arrow between steps */}
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
            href="/methodology"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Read Methodology →
          </Link>
        </div>
      </div>
    </main>
  )
}
