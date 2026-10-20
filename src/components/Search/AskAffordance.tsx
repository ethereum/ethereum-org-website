"use client"

import { useEffect, useEffectEvent, useRef, useState } from "react"
import { Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils/cn"

import AskPanel, { type AskTarget } from "./AskPanel"

/**
 * The Ask button and answer panel, portalled into markup the search library owns. State
 * lives here, not in `SearchModal`: re-rendering the modal's owner clears the input.
 */
const AskAffordance = () => {
  const t = useTranslations("common")
  const [host, setHost] = useState<HTMLElement | null>(null)
  const [dropdown, setDropdown] = useState<HTMLElement | null>(null)
  const [query, setQuery] = useState("")
  const [asked, setAsked] = useState("")
  /** Bumped per ask, so the same question can be asked again after a throttle. */
  const [attempt, setAttempt] = useState(0)
  /** A throttled ask never reached the model, so the same text may be asked again. */
  const [retryable, setRetryable] = useState(false)
  const [targets, setTargets] = useState<AskTarget[]>([])
  /** Index into `targets` while the highlight is in the answer, else null. */
  const [activeSource, setActiveSource] = useState<number | null>(null)
  /** Whether the library holds a highlighted row; if so, Enter is the library's. */
  const [resultHighlighted, setResultHighlighted] = useState(false)
  const throttleTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    // The modal renders in the same commit, so one frame is enough to find it.
    const frame = requestAnimationFrame(() => {
      const form = document.querySelector<HTMLElement>(".DocSearch-Form")
      const list = document.querySelector<HTMLElement>(".DocSearch-Dropdown")
      if (list) {
        // Prepended so DOM, tab and visual order agree.
        const panelSlot = document.createElement("div")
        panelSlot.className = "DocSearch-Ask-panel-slot"
        list.prepend(panelSlot)
        setDropdown(panelSlot)
      }
      if (!form) return
      // Last in the form, so the clear button appearing never shifts it.
      const slot = document.createElement("span")
      slot.className = "flex shrink-0 items-center"
      form.append(slot)
      setHost(slot)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => () => dropdown?.remove(), [dropdown])

  useEffect(() => () => host?.remove(), [host])

  useEffect(() => () => clearTimeout(throttleTimer.current), [])

  const ask = (value: string) => {
    clearTimeout(throttleTimer.current)
    setTargets([])
    setActiveSource(null)
    setRetryable(false)
    setAttempt((count) => count + 1)
    setAsked(value)
  }

  const handleThrottled = (retryAfter: number) => {
    clearTimeout(throttleTimer.current)
    throttleTimer.current = setTimeout(
      () => setRetryable(true),
      retryAfter * 1000
    )
  }

  const handleTargets = (next: AskTarget[]) => {
    setTargets(next)
    setActiveSource(null)
  }

  const clear = () => {
    clearTimeout(throttleTimer.current)
    setRetryable(false)
    setQuery("")
    setTargets([])
    setActiveSource(null)
    setAsked("")
  }

  const disabled = !query || (query === asked && !retryable)
  const armed = !disabled && activeSource === null && !resultHighlighted

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

  // The library exposes neither the input's value nor a change event.
  const onInput = useEffectEvent((input: HTMLInputElement) => {
    const value = input.value.trim()
    // Emptying the box starts over; editing keeps the answer while results update.
    if (!value) return clear()
    setQuery(value)
    setActiveSource(null)
  })

  /**
   * Enter asks and the arrows walk the answer's targets before the results. Captured so
   * it runs before the library; any key not claimed falls through to it.
   */
  const onKeyDown = useEffectEvent(
    (input: HTMLInputElement, keyEvent: KeyboardEvent) => {
      const value = input.value.trim()
      const activeItem = input.getAttribute("aria-activedescendant")?.trim()
      const scrollToAnswer = () =>
        input
          .closest(".DocSearch-Modal")
          ?.querySelector(".DocSearch-Dropdown")
          ?.scrollTo({ top: 0 })
      const claim = () => {
        keyEvent.preventDefault()
        keyEvent.stopPropagation()
      }

      if (keyEvent.key === "Enter") {
        if (activeSource !== null) {
          const target = targets[activeSource]
          if (!target) return
          claim()
          window.location.assign(target.url)
          return
        }
        const repeat = value === asked && !retryable
        if (activeItem || !value || repeat) return
        claim()
        ask(value)
        return
      }

      if (keyEvent.key !== "ArrowDown" && keyEvent.key !== "ArrowUp") return
      const count = targets.length
      if (!count) return

      if (keyEvent.key === "ArrowDown") {
        if (activeSource === null && !activeItem) {
          claim()
          scrollToAnswer()
          return setActiveSource(0)
        }
        if (activeSource !== null && activeSource < count - 1) {
          claim()
          return setActiveSource(activeSource + 1)
        }
        // Past the last target: unclaimed, so the library moves to its first row.
        if (activeSource !== null) setActiveSource(null)
        return
      }

      if (activeSource !== null) {
        claim()
        if (activeSource === 0) scrollToAnswer()
        return setActiveSource(activeSource > 0 ? activeSource - 1 : null)
      }
      // Up off the library's first row: left unclaimed so the library releases the row.
      if (activeItem?.endsWith("-item-0")) setActiveSource(count - 1)
    }
  )

  // The clear button is a form reset, which dispatches no `input` event.
  const onReset = useEffectEvent(() => clear())

  useEffect(() => {
    const input =
      host?.parentElement?.querySelector<HTMLInputElement>(".DocSearch-Input")
    if (!input) return
    const handleInput = () => onInput(input)
    const handleKeyDown = (keyEvent: KeyboardEvent) =>
      onKeyDown(input, keyEvent)
    const handleReset = () => onReset()
    handleInput()
    input.form?.addEventListener("reset", handleReset)
    input.addEventListener("input", handleInput)
    input.addEventListener("keydown", handleKeyDown, true)
    return () => {
      input.form?.removeEventListener("reset", handleReset)
      input.removeEventListener("input", handleInput)
      input.removeEventListener("keydown", handleKeyDown, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Effect Events are not deps; this plugin predates them
  }, [host])

  return (
    <>
      {host &&
        createPortal(
          <button
            type="button"
            className={cn(
              "ms-2 flex shrink-0 items-center gap-1 rounded-full border border-solid border-primary px-2 py-1 text-xs text-primary enabled:hover:bg-primary-low-contrast disabled:border-disabled disabled:text-disabled",
              // Enter reaches the button only while nothing else holds the highlight.
              armed &&
                "outline outline-2 outline-offset-2 outline-primary-hover"
            )}
            title={t("docsearch-ask-ai")}
            onClick={() => ask(query)}
            disabled={disabled}
          >
            <Sparkles className="size-3.5" />
            <span>{t("docsearch-ask-ai")}</span>
          </button>,
          host
        )}
      {asked &&
        dropdown &&
        createPortal(
          <AskPanel
            key={`${attempt}:${asked}`}
            query={asked}
            onDismiss={() => setAsked("")}
            onThrottled={handleThrottled}
            onTargets={handleTargets}
            activeTarget={activeSource}
            onHoverTarget={setActiveSource}
          />,
          dropdown
        )}
    </>
  )
}

export default AskAffordance
