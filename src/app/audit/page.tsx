"use client"

import { useEffect, useState } from "react"
import { getAuditEntries, clearAuditEntries } from "@/lib/audit"
import type { AuditEntry } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n) + "…" : str
}

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

const decisionBadge: Record<string, string> = {
  "Approved":
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 border border-green-200",
  "Modified & Approved":
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200",
  "Rejected":
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 border border-red-200",
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
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Audit Trail</h1>
          <p className="text-slate-500 text-sm">
            Complete decision log — all approvals, modifications, and rejections
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

      {entries.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-500 text-sm">
            No decisions recorded yet. Review the insight feed to approve, modify, or reject
            recommendations.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-slate-700 font-semibold text-xs whitespace-nowrap">
                  Timestamp
                </TableHead>
                <TableHead className="text-slate-700 font-semibold text-xs whitespace-nowrap">
                  Signal Type
                </TableHead>
                <TableHead className="text-slate-700 font-semibold text-xs whitespace-nowrap">
                  Action Reference ID
                </TableHead>
                <TableHead className="text-slate-700 font-semibold text-xs whitespace-nowrap">
                  Original Recommendation
                </TableHead>
                <TableHead className="text-slate-700 font-semibold text-xs whitespace-nowrap">
                  Final Recommendation
                </TableHead>
                <TableHead className="text-slate-700 font-semibold text-xs whitespace-nowrap">
                  Decision
                </TableHead>
                <TableHead className="text-slate-700 font-semibold text-xs whitespace-nowrap">
                  Simulated Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-slate-50">
                  <TableCell className="text-xs text-slate-600 whitespace-nowrap">
                    {formatTimestamp(entry.timestamp)}
                  </TableCell>
                  <TableCell className="text-xs text-slate-800 font-medium max-w-[160px]">
                    {entry.signal_type}
                  </TableCell>
                  <TableCell className="text-xs text-slate-400 font-mono whitespace-nowrap">
                    {entry.action_reference_id}
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 max-w-[160px]">
                    {truncate(entry.original_recommendation, 60)}
                  </TableCell>
                  <TableCell
                    className={`text-xs max-w-[160px] ${
                      entry.decision === "Modified & Approved"
                        ? "text-blue-700 font-medium"
                        : "text-slate-600"
                    }`}
                  >
                    {truncate(entry.final_recommendation, 60)}
                  </TableCell>
                  <TableCell>
                    <span className={decisionBadge[entry.decision] ?? decisionBadge["Approved"]}>
                      {entry.decision}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 max-w-[160px]">
                    {truncate(entry.simulated_action, 60)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  )
}
