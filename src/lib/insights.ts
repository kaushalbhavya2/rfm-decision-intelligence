import insightsData from "@/data/insights.json"
import type { InsightCard } from "@/types"

export function getInsights(): InsightCard[] {
  return insightsData as InsightCard[]
}
