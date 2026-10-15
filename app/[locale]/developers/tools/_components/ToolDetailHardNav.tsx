"use client"

import type { MouseEvent, ReactNode } from "react"

const TOOL_DETAIL_PATH = /\/developers\/tools\/(?!categories\/)[^/]+\/?$/

// ponytail: the `(.)[tool]` modal intercepts every soft nav from a tool page to
// another tool, so those links load a full page. Delete with the client-side modal.
const ToolDetailHardNav = ({ children }: { children: ReactNode }) => {
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return
    const anchor = (e.target as Element).closest("a")
    if (
      !anchor ||
      anchor.target === "_blank" ||
      anchor.origin !== window.location.origin ||
      !TOOL_DETAIL_PATH.test(anchor.pathname)
    )
      return
    e.preventDefault()
    window.location.assign(anchor.href)
  }

  return (
    <div className="contents" onClickCapture={onClickCapture}>
      {children}
    </div>
  )
}

export default ToolDetailHardNav
