"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { BaseLink } from "@/components/ui/Link"

import { scrubQuery, type Source, withCitationLinks } from "@/lib/utils/ask"
import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

/** Where the model was told to send the reader instead of answering from excerpts. */
interface ReferralNote {
  name: string
  url: string
}

/** A page that answers better than prose can -- a comparison tool, usually. */
interface Followup {
  url: string
  label: string
}

/** A citation is a link whose whole text is `[n]` for a source it points at. */
const isCitation = (
  href: string | undefined,
  children: React.ReactNode,
  sources: Source[]
) => {
  const text = String(children)
  return sources.some(
    (source) => source.url === href && `[${source.n}]` === text
  )
}

/** Somewhere the answer can send the reader, in the order the panel renders them. */
export interface AskTarget {
  url: string
}

interface AskPanelProps {
  query: string
  onDismiss: () => void
  /** Reported upward so the input's arrow keys can walk them before the results. */
  onTargets: (targets: AskTarget[]) => void
  /** Index into the reported targets, or null while the highlight is elsewhere. */
  activeTarget: number | null
  onHoverTarget: (index: number | null) => void
}

const AskPanel = ({
  query,
  onDismiss,
  onTargets,
  activeTarget,
  onHoverTarget,
}: AskPanelProps) => {
  const t = useTranslations("common")
  const locale = useLocale()
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState<Source[]>([])
  const [referral, setReferral] = useState<ReferralNote | null>(null)
  const [followup, setFollowup] = useState<Followup | null>(null)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    setAnswer("")
    setSources([])
    setReferral(null)
    setFollowup(null)
    setError("")
    setDone(false)

    /**
     * One event per question, once the outcome is known. Abandoning mid-stream records
     * nothing, which is the trade for not firing twice per ask.
     *
     * A refusal is read off the citations rather than the prose: the model was told to
     * cite everything, so an answer grounded in nothing cited nothing, and that holds in
     * every language the question might be asked in.
     */
    let reported = false
    const report = (outcome: string) => {
      if (reported) return
      reported = true
      const safe = scrubQuery(query)
      if (!safe) return
      trackCustomEvent({
        eventCategory: "search",
        eventAction: `ask ${outcome}`,
        eventName: safe,
      })
    }

    const run = async () => {
      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ q: query, locale }),
          signal: controller.signal,
        })
        if (!response.ok || !response.body) {
          const seconds =
            response.status === 429
              ? await response
                  .json()
                  .then((body) => body?.retryAfter)
                  .catch(() => undefined)
              : undefined
          setError(
            response.status === 429
              ? t("docsearch-ask-busy", { seconds: seconds ?? 20 })
              : t("docsearch-ask-error")
          )
          report(response.status === 429 ? "rate limited" : "failed")
          setDone(true)
          return
        }
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ""
        for (;;) {
          const { done: finished, value } = await reader.read()
          if (finished) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          buffer = lines.pop() ?? ""
          for (const line of lines) {
            if (!line.trim()) continue
            const payload = JSON.parse(line)
            if (payload.type === "token") setAnswer((a) => a + payload.value)
            if (payload.type === "sources") {
              setSources(payload.sources)
              setReferral(payload.referral ?? null)
              setFollowup(payload.followup ?? null)
              report(payload.sources.length ? "answered" : "refused")
            }
            if (payload.type === "error") {
              setError(payload.value)
              report("failed")
            }
          }
        }
      } catch (caught) {
        if ((caught as Error).name !== "AbortError") {
          setError(t("docsearch-ask-error"))
          report("failed")
        }
      } finally {
        setDone(true)
      }
    }
    run()
    return () => controller.abort()
  }, [query, locale, t])

  // A new question scrolls its answer into view: the reader may have been part-way down
  // the results when they asked, and the answer arrives above them.
  useEffect(() => {
    scroller.current
      ?.closest<HTMLElement>(".DocSearch-Dropdown")
      ?.scrollTo({ top: 0 })
  }, [query])

  const targets = useMemo(
    () => [
      ...(followup ? [{ url: followup.url }] : []),
      ...(referral ? [{ url: referral.url }] : []),
      ...sources.map((source) => ({ url: source.url })),
    ],
    [followup, referral, sources]
  )
  const offset = (followup ? 1 : 0) + (referral ? 1 : 0)

  /**
   * Marks a navigable target and lets the mouse claim it, which is how the library's own
   * rows behave. Focus stays in the input -- `aria-selected` would need listbox
   * semantics, and the library's listbox already owns that relationship with the input.
   */
  const targetProps = (index: number, className?: string) => ({
    "aria-current": index === activeTarget,
    // Merged, not assigned: a `className` written after the spread silently replaced
    // this one, which left the tool link highlighted invisibly.
    className: cn(
      className,
      index === activeTarget && "DocSearch-Ask-target--active"
    ),
    onMouseMove: () => onHoverTarget(index),
    onMouseLeave: () => onHoverTarget(null),
  })

  useEffect(() => {
    if (!done) return
    onTargets(targets)
  }, [done, targets, onTargets])

  useEffect(() => {
    if (activeTarget === null) return
    scroller.current
      ?.querySelector(".DocSearch-Ask-target--active")
      ?.scrollIntoView({ block: "nearest" })
  }, [activeTarget])

  // Follow the stream, but only while the reader is already at the bottom.
  useEffect(() => {
    const element =
      scroller.current?.closest<HTMLElement>(".DocSearch-Dropdown") ??
      scroller.current
    if (!element) return
    const slack =
      element.scrollHeight - element.clientHeight - element.scrollTop
    if (slack < 80) element.scrollTop = element.scrollHeight
  }, [answer])

  return (
    <section className="DocSearch-Ask" ref={scroller}>
      <header className="DocSearch-Ask-header">
        <span>
          {t("docsearch-ask-answer")}
          {/* Not a citation, so no brackets -- see the design-system skill. */}
          <sup className="DocSearch-Ask-beta">{t("docsearch-ask-beta")}</sup>
        </span>
        <button type="button" onClick={onDismiss}>
          {t("docsearch-ask-dismiss")}
        </button>
      </header>

      {/* The answer outlives the query that produced it -- the reader keeps typing and the
          results below keep updating -- so it has to say which question it answered. */}
      <p className="DocSearch-Ask-question">{query}</p>

      {!answer && !error && (
        <p className="DocSearch-Ask-status" role="status">
          {t("docsearch-ask-thinking")}
        </p>
      )}

      {answer && (
        <div className="DocSearch-Ask-answer">
          <Markdown
            remarkPlugins={[remarkGfm]}
            // No raw HTML by default, so model output never reaches the DOM as markup.
            // Links are the one element worth overriding, to route them like any other.
            components={{
              a: ({ href, children }) =>
                isCitation(href, children, sources) ? (
                  // Superscript, so a citation reads as a mark on the sentence rather
                  // than a word in it. Adjacent ones are separated in CSS.
                  <sup className="DocSearch-Ask-cite">
                    <BaseLink href={href ?? "#"} hideArrow>
                      {children}
                    </BaseLink>
                  </sup>
                ) : (
                  <BaseLink href={href ?? "#"} hideArrow>
                    {children}
                  </BaseLink>
                ),
            }}
          >
            {withCitationLinks(answer, sources)}
          </Markdown>
        </div>
      )}

      {error && <p className="DocSearch-Ask-error">{error}</p>}

      {done && followup && (
        <p {...targetProps(0, "DocSearch-Ask-followup")}>
          <BaseLink href={followup.url}>{followup.label}</BaseLink>
        </p>
      )}

      {done && referral && (
        <p {...targetProps(followup ? 1 : 0, "DocSearch-Ask-referral")}>
          <BaseLink href={referral.url}>{referral.name}</BaseLink>
        </p>
      )}

      {done && sources.length > 0 && (
        <footer className="DocSearch-Ask-sources">
          <span>{t("docsearch-ask-sources")}</span>
          <ol>
            {sources.map((source, index) => (
              <li key={source.n} {...targetProps(offset + index)}>
                <BaseLink href={source.url} hideArrow>
                  {source.title}
                </BaseLink>
              </li>
            ))}
          </ol>
        </footer>
      )}

      {done && (
        <p className="DocSearch-Ask-disclaimer">
          {t("docsearch-ask-disclaimer")}
        </p>
      )}
    </section>
  )
}

export default AskPanel
