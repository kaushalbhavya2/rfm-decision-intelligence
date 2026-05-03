"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const STORAGE_KEY = "rfm_banner_dismissed"

export function PrototypeBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      if (!dismissed) setVisible(true)
    }
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-start gap-3">
      <div className="flex-1 text-xs text-amber-800 leading-relaxed">
        <strong className="font-semibold">Prototype disclosure:</strong> This is a portfolio
        demonstration built on the{" "}
        <a
          href="https://archive.ics.uci.edu/ml/datasets/online+retail"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-amber-900"
        >
          UCI Online Retail dataset
        </a>{" "}
        (UK wholesale B2B, 2010–2011) used as a B2C proxy. All revenue figures, ROI projections,
        and network extrapolations are modelled estimates — not live business data. Audit trail
        is stored in browser localStorage and will not persist across sessions.
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss banner"
        className="flex-shrink-0 text-amber-600 hover:text-amber-800 mt-0.5"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
