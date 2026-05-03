import { NextRequest, NextResponse } from "next/server"
import type { AuditRequest, AuditResponse } from "@/types"

// The client stores audit entries in localStorage.
// This endpoint acknowledges receipt — it does not persist server-side.
// Retained as a demonstration of the server-side audit leg in the agentic loop.
export async function POST(req: NextRequest) {
  const body: AuditRequest = await req.json()

  if (!body.entry) {
    return NextResponse.json({ error: "Missing audit entry" }, { status: 400 })
  }

  // In production: write body.entry to a database here.
  const response: AuditResponse = { success: true }
  return NextResponse.json(response)
}
