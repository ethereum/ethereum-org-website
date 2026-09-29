"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { createPortal } from "react-dom"

import type { Source } from "@/lib/utils/ask"
import { cn } from "@/lib/utils/cn"

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
  const [sources, setSources] = useState<Source[]>([])
  /** Index into `sources` while the highlight is in the answer, else null. */
  const [activeSource, setActiveSource] = useState<number | null>(null)
  /**
   * Whether the library is holding a highlighted row. Watched rather than read on
   * keypress because the button's ring depends on it -- and a mouse hover sets it too,
   * which is right: if hovering a result arms Enter for that result, the button is no
   * longer what Enter does.
   */
  const [resultHighlighted, setResultHighlighted] = useState(false)

  useEffect(() => {
    // The modal renders in the same commit, so one frame is enough to find it.
    const frame = requestAnimationFrame(() => {
      const form = document.querySelector<HTMLElement>(".DocSearch-Form")
      setDropdown(document.querySelector<HTMLElement>(".DocSearch-Dropdown"))
      if (!form) return
      // Last in the form, after the clear button. Ahead of it reads better and tabs
      // better, but the clear button only appears once there is something to clear, and
      // anything before it jumps sideways when it does. Cmd/Ctrl+Enter is the way in
      // that does not depend on reaching the button.
      const slot = document.createElement("span")
      slot.className = "DocSearch-Ask-slot"
      form.append(slot)
      setHost(slot)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => () => host?.remove(), [host])

  // The library owns the input and exposes neither its value nor a change event.
  const handleSources = useCallback((next: Source[]) => {
    setSources(next)
    setActiveSource(null)
  }, [])

  const disabled = !query || query === asked
  const armed = !disabled && activeSource === null && !resultHighlighted

  const askedRef = useRef("")
  const sourcesRef = useRef<Source[]>([])
  const activeSourceRef = useRef<number | null>(null)
  askedRef.current = asked
  sourcesRef.current = sources
  activeSourceRef.current = activeSource

  useEffect(() => {
    const input =
      host?.parentElement?.querySelector<HTMLInputElement>(".DocSearch-Input")
    if (!input) return
    const read = () =>
      setResultHighlighted(Boolean(input.getAttribute("aria-activedescendant")))
    read()
    const observer = new MutationObserver(read)
    observer.observe(input, { attributeFilter: ["aria-activedescendant"] })
    return () => observer.disconnect()
  }, [host])

  useEffect(() => {
    const input =
      host?.parentElement?.querySelector<HTMLInputElement>(".DocSearch-Input")
    if (!input) return
    // The answer stays put while the query changes: the results underneath it keep
    // updating on every keystroke, which is the point of showing both, and the panel
    // names the question it answered so the pair cannot be misread.
    const read = () => {
      setQuery(input.value.trim())
      // Typing drops the highlight, as it does for the library's own rows -- otherwise
      // Enter follows a source chosen for the previous query.
      setActiveSource(null)
    }
    /**
     * Enter asks, and the arrow keys walk the answer's sources before reaching the
     * results. Captured on the input so it runs before the library's own handler, and
     * everything we do not claim falls through to it untouched.
     *
     * No result is highlighted to begin with -- `defaultActiveItemId` is null on this
     * locale -- so Enter is free until the reader arrows into the list, and the library
     * takes it back the moment they do. Stepping past the last source simply stops
     * claiming the key: the library's own index is still null, so its next ArrowDown
     * lands on the first result with nothing double-advancing.
     */
    const activeItem = () =>
      input.getAttribute("aria-activedescendant")?.trim() || ""

    const intercept = (thisEvent: KeyboardEvent) => {
      const value = input.value.trim()

      if (thisEvent.key === "Enter") {
        const source = activeSourceRef.current
        if (source !== null) {
          const target = sourcesRef.current[source]
          if (!target) return
          thisEvent.preventDefault()
          thisEvent.stopPropagation()
          window.location.assign(target.url)
          return
        }
        // A highlighted result belongs to the library.
        if (activeItem() || !value || value === askedRef.current) return
        thisEvent.preventDefault()
        thisEvent.stopPropagation()
        setSources([])
        setActiveSource(null)
        setAsked(value)
        return
      }

      if (thisEvent.key !== "ArrowDown" && thisEvent.key !== "ArrowUp") return
      const count = sourcesRef.current.length
      if (!count) return
      const current = activeSourceRef.current
      const claim = (next: number | null) => {
        thisEvent.preventDefault()
        thisEvent.stopPropagation()
        setActiveSource(next)
      }

      if (thisEvent.key === "ArrowDown") {
        if (current === null && !activeItem()) return claim(0)
        if (current !== null && current < count - 1) return claim(current + 1)
        if (current !== null) setActiveSource(null)
        return
      }

      // Up out of the first source releases to the input, and the library owns
      // everything below. Re-entering the sources from the first result meant reading
      // the library's index out of `aria-activedescendant`, which is state we do not
      // own and got the cycle wrong.
      if (current !== null) return claim(current > 0 ? current - 1 : null)
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
            className={cn(
              "DocSearch-Ask-trigger",
              // Enter reaches the button only while nothing else holds the highlight.
              armed && "DocSearch-Ask-trigger--armed"
            )}
            title={t("docsearch-ask-ai")}
            onClick={() => setAsked(query)}
            disabled={disabled}
          >
            <Sparkles />
            <span>{t("docsearch-ask-ai")}</span>
          </button>,
          host
        )}
      {asked &&
        dropdown &&
        createPortal(
          <AskPanel
            query={asked}
            onDismiss={() => setAsked("")}
            onSources={handleSources}
            activeSource={activeSource}
          />,
          dropdown
        )}
    </>
  )
}

export default AskAffordance
