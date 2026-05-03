import { NextRequest, NextResponse } from "next/server"
import type { ActionRequest, ActionResponse } from "@/types"

const SEGMENT_LABELS: Record<string, string> = {
  at_risk: "At-Risk",
  high_value: "High Value",
  promising: "Promising",
  lost: "Lost",
  loyal: "Loyal",
  low_value: "Low Value",
}

export async function POST(req: NextRequest) {
  const body: ActionRequest = await req.json()
  const { signal_id, final_recommendation, segment, affected_customers } = body

  if (!signal_id || !final_recommendation) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const segmentLabel = SEGMENT_LABELS[segment] ?? segment
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const simulated_email_draft = `To: crm-team@company.com
From: decision-intelligence@company.com
Date: ${date}
Subject: [ACTION REQUIRED] RFM Signal ${signal_id} — ${segmentLabel} Segment Intervention

Hi team,

The RFM Decision Intelligence system has flagged a signal requiring immediate action.

SIGNAL: ${signal_id}
SEGMENT: ${segmentLabel}
AFFECTED CUSTOMERS: ${affected_customers.toLocaleString()}
STATUS: Approved for action

APPROVED RECOMMENDATION:
${final_recommendation}

Please action the above recommendation within the timeframe specified. Log all customer interactions in the CRM under campaign reference ${signal_id}.

This action was approved via the RFM Decision Intelligence workflow on ${date}.

Regards,
RFM Decision Intelligence System`

  const response: ActionResponse = { simulated_email_draft }
  return NextResponse.json(response)
}
