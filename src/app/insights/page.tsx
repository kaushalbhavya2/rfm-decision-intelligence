import { getInsights } from "@/lib/insights"
import { InsightCardWrapper } from "@/components/InsightCard"

export default function InsightsPage() {
  const insights = getInsights()
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Live Insight Feed</h1>
      <p className="text-slate-500 mb-8">4 signals detected across 4,338 customers</p>
      <div className="space-y-6">
        {insights.map((insight) => (
          <InsightCardWrapper key={insight.signal_id} insight={insight} />
        ))}
      </div>
    </main>
  )
}
