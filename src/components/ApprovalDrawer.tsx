"use client"

import { useState } from "react"
import type { InsightCard, Decision, AuditEntry } from "@/types"
import { saveAuditEntry } from "@/lib/audit"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value)

const severityBadgeClass: Record<string, string> = {
  high: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 border border-red-200",
  medium:
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200",
  low: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200",
}

interface ApprovalDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  insight: InsightCard
  decision: Decision
  onSuccess: (message: string) => void
}

export function ApprovalDrawer({
  open,
  onOpenChange,
  insight,
  decision,
  onSuccess,
}: ApprovalDrawerProps) {
  const [recommendation, setRecommendation] = useState(insight.recommended_action)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const isEditable = decision === "Modified & Approved"

  async function handleConfirm() {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      // 1. POST /api/approve
      const approveRes = await fetch("/api/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signal_id: insight.signal_id,
          decision,
          original_recommendation: insight.recommended_action,
          final_recommendation: recommendation,
        }),
      })
      const approveData = await approveRes.json()
      const actionReferenceId = approveData.action_reference_id ?? insight.action_reference_id

      // 2. POST /api/action
      const actionRes = await fetch("/api/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signal_id: insight.signal_id,
          final_recommendation: recommendation,
          segment: insight.segment,
          affected_customers: insight.affected_customers,
        }),
      })
      const actionData = await actionRes.json()
      const simulatedAction =
        actionData.simulated_email_draft ?? "Email draft generated and sent to CRM team."

      // 3. Build audit entry — use server-generated action_reference_id for unique traceability
      const auditEntry: AuditEntry = {
        id: `${insight.signal_id}-${Date.now()}`,
        timestamp: new Date().toISOString(),
        signal_type: insight.signal_type,
        action_reference_id: actionReferenceId,
        original_recommendation: insight.recommended_action,
        final_recommendation: recommendation,
        decision,
        simulated_action: simulatedAction,
      }

      // 4. POST /api/audit
      await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry: auditEntry }),
      })

      // 5. Save to localStorage
      saveAuditEntry(auditEntry)

      // 6. Close drawer and show success
      onOpenChange(false)
      onSuccess("Decision recorded ✓")
    } catch (err) {
      console.error("Approval flow error:", err)
      setSubmitError("Submission failed — please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="flex flex-col overflow-y-auto max-w-lg w-full">
        <DrawerHeader className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className={severityBadgeClass[insight.severity]}>
              {insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)} Severity
            </span>
          </div>
          <DrawerTitle className="text-slate-900 text-base font-semibold leading-snug">
            {insight.signal_type}
          </DrawerTitle>
          <DrawerDescription className="text-xs text-slate-400 font-mono mt-1">
            {insight.action_reference_id}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {/* Full finding */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Finding
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{insight.finding}</p>
          </div>

          {/* Recommendation */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Recommended Action
            </div>
            <Textarea
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              disabled={!isEditable}
              rows={5}
              className={`text-sm resize-none ${!isEditable ? "bg-slate-50 text-slate-600" : ""}`}
            />
            {isEditable && (
              <p className="text-xs text-slate-400 mt-1">
                Edit the recommendation before confirming.
              </p>
            )}
          </div>

          {/* Expected impact */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Expected Impact
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{insight.expected_impact}</p>
          </div>

          {/* Cost of inaction */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Cost of Inaction
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{insight.cost_of_inaction}</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-base font-bold text-slate-900">
                {formatCurrency(insight.revenue_at_risk)}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Revenue at Risk</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="text-base font-bold text-slate-900">
                {insight.affected_customers.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Customers Affected</div>
            </div>
          </div>
        </div>

        <DrawerFooter className="border-t border-slate-200 pt-4">
          {submitError && (
            <p className="text-xs text-red-600 mb-1">{submitError}</p>
          )}
          <Button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white w-full"
          >
            {isSubmitting ? "Processing..." : "Confirm Approval"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
