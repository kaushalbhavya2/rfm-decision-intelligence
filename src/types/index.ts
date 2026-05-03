export type Severity = "high" | "medium" | "low"

export interface InsightCard {
  signal_id: string
  signal_type: string
  segment: string
  affected_customers: number
  revenue_at_risk: number
  metric: string
  delta: string
  severity: Severity
  finding: string
  recommended_action: string
  expected_impact: string
  cost_of_inaction: string
  action_reference_id: string
}

export type Decision = "Approved" | "Modified & Approved" | "Rejected"

export interface AuditEntry {
  id: string
  timestamp: string
  signal_type: string
  action_reference_id: string
  original_recommendation: string
  final_recommendation: string
  decision: Decision
  simulated_action: string
}

export interface ApproveRequest {
  signal_id: string
  decision: Decision
  original_recommendation: string
  final_recommendation: string
}

export interface ApproveResponse {
  success: boolean
  action_reference_id: string
}

export interface ActionRequest {
  signal_id: string
  final_recommendation: string
  segment: string
  affected_customers: number
}

export interface ActionResponse {
  simulated_email_draft: string
}

export interface AuditRequest {
  entry: AuditEntry
}

export interface AuditResponse {
  success: boolean
}
