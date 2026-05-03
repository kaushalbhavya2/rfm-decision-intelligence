"use client"

import { useState } from "react"
import type { InsightCard, Decision, AuditEntry } from "@/types"
import { saveAuditEntry } from "@/lib/audit"
import { ApprovalDrawer } from "@/components/ApprovalDrawer"
import { Button } from "@/components/ui/button"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value)

const severityBadgeClass: Record<string, string> = {
  high: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-700 border border-red-200",
  medium:
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200",
  low: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200",
}

const segmentLabel: Record<string, string> = {
  at_risk: "At-Risk Segment",
  high_value: "High Value Segment",
  promising: "Promising Segment",
  lost: "Lost Customers",
  loyal: "Loyal Segment",
  low_value: "Low Value Segment",
}

interface InsightCardProps {
  insight: InsightCard
}

export function InsightCardWrapper({ insight }: InsightCardProps) {
  return <InsightCardInner insight={insight} />
}

function InsightCardInner({ insight }: InsightCardProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerDecision, setDrawerDecision] = useState<Decision>("Approved")
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [decided, setDecided] = useState(false)

  function openDrawer(decision: Decision) {
    setDrawerDecision(decision)
    setDrawerOpen(true)
  }

  async function handleReject() {
    const auditEntry: AuditEntry = {
      id: `${insight.signal_id}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      signal_type: insight.signal_type,
      action_reference_id: insight.action_reference_id,
      original_recommendation: insight.recommended_action,
      final_recommendation: insight.recommended_action,
      decision: "Rejected",
      simulated_action: "No action taken — recommendation rejected",
    }

    await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entry: auditEntry }),
    })

    saveAuditEntry(auditEntry)
    setStatusMessage("Rejected")
    setDecided(true)
  }

  function handleSuccess(message: string) {
    setStatusMessage(message)
    setDecided(true)
  }

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-5">
          {/* Top row: severity badge + segment */}
          <div className="flex items-center justify-between mb-3">
            <span className={severityBadgeClass[insight.severity]}>
              {insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)} Severity
            </span>
            <span className="text-sm text-slate-500">
              {segmentLabel[insight.segment] ?? insight.segment}
            </span>
          </div>

          {/* Signal type title */}
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{insight.signal_type}</h3>

          {/* Finding — line-clamp-3 */}
          <p className="text-sm text-slate-700 line-clamp-3 mb-4">{insight.finding}</p>

          {/* Stat pills */}
          <div className="flex gap-3 mb-3">
            <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
              <div className="text-sm font-semibold text-slate-900">
                {formatCurrency(insight.revenue_at_risk)}
              </div>
              <div className="text-xs text-slate-500">Revenue at Risk</div>
            </div>
            <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
              <div className="text-sm font-semibold text-slate-900">
                {insight.affected_customers.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500">Customers Affected</div>
            </div>
          </div>

          {/* Metric + delta */}
          <div className="text-xs text-slate-400 mb-1">
            <span className="font-medium text-slate-500">{insight.metric}:</span> {insight.delta}
          </div>

          {/* Action reference ID */}
          <div className="text-xs text-slate-400 font-mono mb-3">
            {insight.action_reference_id}
          </div>

          {/* SIG-004 model caveat */}
          {insight.signal_id === "SIG-004" && (
            <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2 mb-4">
              Directional signal only — CLV model R²=0.14. Revenue figure reflects predicted CLV, not confirmed revenue. Route to senior analyst before action.
            </div>
          )}

          {/* Status message */}
          {statusMessage && (
            <div
              className={`text-sm font-medium mb-3 ${
                statusMessage === "Rejected" ? "text-red-600" : "text-green-600"
              }`}
            >
              {statusMessage}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={decided}
              onClick={() => openDrawer("Approved")}
              className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-40"
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={decided}
              onClick={() => openDrawer("Modified & Approved")}
              className="disabled:opacity-40"
            >
              Modify
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={decided}
              onClick={handleReject}
              className="text-red-600 border-red-200 hover:bg-red-50 disabled:opacity-40"
            >
              Reject
            </Button>
          </div>
        </div>
      </div>

      <ApprovalDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        insight={insight}
        decision={drawerDecision}
        onSuccess={handleSuccess}
      />
    </>
  )
}
