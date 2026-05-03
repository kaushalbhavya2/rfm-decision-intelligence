"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/insights", label: "Insights" },
  { href: "/methodology", label: "Methodology" },
  { href: "/audit", label: "Audit Trail" },
  { href: "/sources", label: "Sources" },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <span className="font-semibold text-slate-900 text-sm tracking-tight">
          RFM Decision Intelligence
        </span>
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-slate-900 text-sm font-medium"
                  : "text-slate-600 text-sm hover:text-slate-900 transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
