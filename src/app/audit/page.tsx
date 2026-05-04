"use client"

import { useEffect, useState } from "react"
import { getAuditEntries, clearAuditEntries } from "@/lib/audit"
import type { AuditEntry } from "@/types"
import { Button } from "@/components/ui/button"

function formatTimestamp(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso
  }
}

const decisionConfig: Record<string, { badge: string; label: string }> = {
  "Approved": {
    badge: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-700 border border-green-200",
    label: "✓ Approved",
  },
  "Modified & Approved": {
    badge: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200",
    label: "✎ Modified & Approved",
  },
  "Rejected": {
    badge: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-700 border border-red-200",
    label: "✕ Rejected",
  },
}

export default function AuditPage() {
  const [entries, setEntries] = useState<AuditEntry[]>([])

  useEffect(() => {
    setEntries(getAuditEntries())
  }, [])

  function handleClear() {
    clearAuditEntries()
    setEntries([])
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Audit Trail</h1>
          <p className="text-slate-500 text-sm">
            Complete decision log — all approvals, modifications, and rejections
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Prototype: stored in browser localStorage. Production would use an append-only
            database with hash chaining and immutable timestamps.
          </p>
        </div>
        {entries.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="text-slate-600 flex-shrink-0"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Empty state */}
      {entries.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-14 text-center">
          <p className="text-4xl mb-4">🗂</p>
          <p className="text-slate-800 font-semibold text-base mb-2">No decisions recorded yet.</p>
          <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
            Make a decision on any insight card on the{" "}
            <a href="/" className="text-indigo-600 underline hover:text-indigo-800">
              home page
            </a>{" "}
            — approve, modify, or reject a recommendation and it will appear here with a full audit
            entry.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...entries].reverse().map((entry, i) => {
            const config = decisionConfig[entry.decision] ?? decisionConfig["Approved"]
            const isModified = entry.decision === "Modified & Approved"
            const isRejected = entry.decision === "Rejected"

            return (
              <div
                key={entry.id}
                className={`bg-white rounded-xl border p-6 shadow-sm ${
                  isRejected
                    ? "border-red-200"
                    : isModified
                    ? "border-blue-200"
                    : "border-slate-200"
                }`}
              >
                {/* Row 1: Signal type + decision + timestamp */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={config.badge}>{config.label}</span>
                      <span className="text-xs text-slate-400 font-mono bg-slate-50 border border-slate-100 rounded px-2 py-0.5">
                        {entry.action_reference_id}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 mt-2">
                      {entry.signal_type}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {formatTimestamp(entry.timestamp)}
                    </p>
                  </div>
                  <div className="text-xs text-slate-300 font-mono flex-shrink-0">
                    #{entries.length - i}
                  </div>
                </div>

                {/* Row 2: Recommendation(s) */}
                <div
                  className={`grid gap-4 mb-4 ${
                    isModified ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  <div className="bg-slate-50 rounded-lg border border-slate-100 p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      AI Recommendation
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {entry.original_recommendation}
                    </p>
                  </div>
                  {isModified && (
                    <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">
                        Modified by Analyst
                      </p>
                      <p className="text-xs text-blue-800 leading-relaxed">
                        {entry.final_recommendation}
                      </p>
                    </div>
                  )}
                </div>

                {/* Row 3: Simulated action */}
                {!isRejected && (
                  <div className="flex items-start gap-2 bg-green-50 rounded-lg border border-green-100 px-4 py-3">
                    <span className="text-green-500 text-xs mt-0.5 flex-shrink-0">⚡</span>
                    <div>
                      <p className="text-xs font-semibold text-green-600 mb-0.5">Simulated Action</p>
                      <p className="text-xs text-green-800 leading-relaxed">
                        {entry.simulated_action}
                      </p>
                    </div>
                  </div>
                )}
                {isRejected && (
                  <div className="flex items-center gap-2 bg-red-50 rounded-lg border border-red-100 px-4 py-3">
                    <span className="text-red-400 text-xs">✕</span>
                    <p className="text-xs text-red-600">No action taken — recommendation rejected.</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
