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
  const [form, setForm] = useState<HTMLElement | null>(null)
  const [dropdown, setDropdown] = useState<HTMLElement | null>(null)
  const [query, setQuery] = useState("")
  const [asked, setAsked] = useState("")

  useEffect(() => {
    // The modal renders in the same commit, so one frame is enough to find it.
    const frame = requestAnimationFrame(() => {
      setForm(document.querySelector<HTMLElement>(".DocSearch-Form"))
      setDropdown(document.querySelector<HTMLElement>(".DocSearch-Dropdown"))
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  // The library owns the input and exposes neither its value nor a change event.
  useEffect(() => {
    const input = form?.querySelector<HTMLInputElement>(".DocSearch-Input")
    if (!input) return
    const read = () => {
      const value = input.value.trim()
      setQuery(value)
      // Editing the question returns to results: an answer to the previous one sitting
      // over results the reader is changing is the wrong thing to be looking at.
      setAsked((current) => (current && current !== value ? "" : current))
    }
    read()
    input.addEventListener("input", read)
    return () => input.removeEventListener("input", read)
  }, [form])

  return (
    <>
      {form &&
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
          form
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
