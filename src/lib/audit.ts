import type { AuditEntry } from "@/types"

const AUDIT_KEY = "rfm_audit_trail"

export function getAuditEntries(): AuditEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(AUDIT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveAuditEntry(entry: AuditEntry): void {
  if (typeof window === "undefined") return
  const entries = getAuditEntries()
  entries.unshift(entry) // newest first
  localStorage.setItem(AUDIT_KEY, JSON.stringify(entries))
}

export function clearAuditEntries(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(AUDIT_KEY)
}
