"use client"

import { useEffect, useRef } from "react"

export function TableauEmbed({ id, html }: { id: string; html: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // dangerouslySetInnerHTML does not execute <script> tags.
    // We inject the HTML, then extract and re-execute any scripts manually.
    container.innerHTML = html

    const scripts = Array.from(container.querySelectorAll("script"))
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script")
      if (oldScript.src) {
        newScript.src = oldScript.src
        newScript.async = true
      } else {
        newScript.textContent = oldScript.textContent
      }
      oldScript.parentNode?.replaceChild(newScript, oldScript)
    })
  // html and id are static constants — safe to list as deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, html])

  // The content is hardcoded Tableau embed code from Tableau Public — not user input.
  return <div ref={containerRef} id={id} />
}
