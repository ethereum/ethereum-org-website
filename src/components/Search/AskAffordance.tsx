"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { createPortal } from "react-dom"

import AskPanel from "./AskPanel"

/**
 * The Ask button and the answer panel, mounted into markup the search library owns.
 *
 * Neither the form nor the results area takes a prop for this, so both are reached by
 * portal once the modal has rendered. A third vendor patch was the alternative; this keeps
 * the change on our side.
 *
 * Self-contained on purpose. The library rebuilds its autocomplete -- and with it the
 * input's contents -- whenever a prop it memoizes on changes identity, so holding this
 * state in `SearchModal` cleared the input on the first keystroke. Nothing here re-renders
 * the component that owns the modal.
 */
const AskAffordance = () => {
  const t = useTranslations("common")
  const [host, setHost] = useState<HTMLElement | null>(null)
  const [dropdown, setDropdown] = useState<HTMLElement | null>(null)
  const [query, setQuery] = useState("")
  const [asked, setAsked] = useState("")

  useEffect(() => {
    // The modal renders in the same commit, so one frame is enough to find it.
    const frame = requestAnimationFrame(() => {
      const form = document.querySelector<HTMLElement>(".DocSearch-Form")
      setDropdown(document.querySelector<HTMLElement>(".DocSearch-Dropdown"))
      if (!form) return
      // Portalling appends, which would put the button after the clear button and tab to
      // it last. Its own host element goes in at the right place instead. The form's
      // children are fixed -- the clear button is hidden, never unmounted -- so nothing
      // the library does moves this.
      const slot = document.createElement("span")
      slot.className = "DocSearch-Ask-slot"
      form.insertBefore(slot, form.querySelector(".DocSearch-Reset"))
      setHost(slot)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => () => host?.remove(), [host])

  // The library owns the input and exposes neither its value nor a change event.
  useEffect(() => {
    const input =
      host?.parentElement?.querySelector<HTMLInputElement>(".DocSearch-Input")
    if (!input) return
    const read = () => {
      const value = input.value.trim()
      setQuery(value)
      // Editing the question returns to results: an answer to the previous one sitting
      // over results the reader is changing is the wrong thing to be looking at.
      setAsked((current) => (current && current !== value ? "" : current))
    }
    // Cmd/Ctrl+Enter asks instead of opening the first result in a new tab, which is
    // what the library does with it. Captured on the input so it never reaches the
    // library's own handler at the React root.
    // PR #19279 reworks keyboard shortcuts site-wide; this will want folding into it.
    const intercept = (thisEvent: KeyboardEvent) => {
      if (thisEvent.key !== "Enter") return
      if (!thisEvent.metaKey && !thisEvent.ctrlKey) return
      const value = input.value.trim()
      if (!value) return
      thisEvent.preventDefault()
      thisEvent.stopPropagation()
      setAsked(value)
    }

    read()
    input.addEventListener("input", read)
    input.addEventListener("keydown", intercept, true)
    return () => {
      input.removeEventListener("input", read)
      input.removeEventListener("keydown", intercept, true)
    }
  }, [host])

  return (
    <>
      {host &&
        createPortal(
          <button
            type="button"
            className="DocSearch-Ask-trigger"
            title={t("docsearch-ask-ai")}
            onClick={() => setAsked(query)}
            disabled={!query || !!asked}
          >
            <Sparkles />
            <span>{t("docsearch-ask-ai")}</span>
          </button>,
          host
        )}
      {asked &&
        dropdown &&
        createPortal(
          <AskPanel query={asked} onDismiss={() => setAsked("")} />,
          dropdown
        )}
    </>
  )
}

export default AskAffordance
