import { NextRequest, NextResponse } from "next/server"
import type { ApproveRequest, ApproveResponse } from "@/types"

export async function POST(req: NextRequest) {
  const body: ApproveRequest = await req.json()
  const { signal_id, decision, original_recommendation, final_recommendation } = body

  if (!signal_id || !decision || !original_recommendation || !final_recommendation) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // The action_reference_id is passed back to the client for audit trail linkage.
  // In a production system this would write to a database.
  const action_reference_id = `ACT-${signal_id}-${Date.now()}`

  const response: ApproveResponse = {
    success: true,
    action_reference_id,
  }

  return NextResponse.json(response)
}
