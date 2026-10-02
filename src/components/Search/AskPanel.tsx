"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { BaseLink } from "@/components/ui/Link"

import {
  isAllowedAnswerLink,
  scrubQuery,
  type Source,
  withCitationLinks,
} from "@/lib/utils/ask"
import { type AskAllowance, takeAskAllowance } from "@/lib/utils/askRateLimit"
import { cn } from "@/lib/utils/cn"
import { isExplorerLookup } from "@/lib/utils/explorerQuery"
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
  /** Bumped to ask the same question again, which a throttled ask needs. */
  attempt: number
  /** The ask never reached the model, so the question is still unanswered. */
  onThrottled: (retryAfter: number) => void
  onHoverTarget: (index: number | null) => void
}

const AskPanel = ({
  query,
  onDismiss,
  onTargets,
  activeTarget,
  onHoverTarget,
  attempt,
  onThrottled,
}: AskPanelProps) => {
  const t = useTranslations("common")
  const locale = useLocale()
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState<Source[]>([])
  const [referral, setReferral] = useState<ReferralNote | null>(null)
  const [followup, setFollowup] = useState<Followup | null>(null)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const [done, setDone] = useState(false)
  const [rated, setRated] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  /** The allowance already taken for a question, and its verdict. */
  const spent = useRef<{ query: string; allowance: AskAllowance } | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    setAnswer("")
    setSources([])
    setReferral(null)
    setFollowup(null)
    setError("")
    setNotice("")
    setDone(false)
    setRated(false)

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
      // A bare address or name has nothing to ground an answer in, and the explorer rows
      // beneath already answer it. Said plainly rather than spending an ask to fail, and
      // not in the error style -- nothing went wrong.
      if (isExplorerLookup(query)) {
        setNotice(t("docsearch-ask-explorer"))
        report("explorer")
        setDone(true)
        return
      }

      // Checked here rather than at the button, so one place renders the message and the
      // allowance is only spent on an ask that actually happens.
      //
      // Once per question, not once per effect run: StrictMode runs an effect twice on
      // mount, so the first ask was spending two and the limit arrived one ask early.
      const key = `${attempt}:${query}`
      if (spent.current?.query !== key) {
        spent.current = { query: key, allowance: takeAskAllowance() }
      }
      const { allowance } = spent.current
      if (!allowance.allowed) {
        setError(t("docsearch-ask-busy", { seconds: allowance.retryAfter }))
        report("throttled")
        setDone(true)
        onThrottled(allowance.retryAfter)
        return
      }
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
  }, [query, locale, t, attempt, onThrottled])

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
  /**
   * The question and what the answer was grounded in, not the prose. Bad answers have
   * almost always been bad grounding, so the cited paths are the diagnostic field -- and
   * they aggregate, where a generated answer never repeats.
   */
  const rate = (helpful: boolean) => {
    setRated(true)
    const safe = scrubQuery(query)
    if (!safe) return
    trackCustomEvent({
      eventCategory: "search",
      eventAction: `ask feedback ${helpful ? "up" : "down"}`,
      eventName: safe,
    })
    if (helpful) return
    trackCustomEvent({
      eventCategory: "search",
      eventAction: "ask feedback down sources",
      eventName: sources.map((source) => source.url).join(" ") || "none",
    })
  }

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

      {!answer && !error && !notice && (
        <p className="DocSearch-Ask-status" role="status">
          {t("docsearch-ask-thinking")}
        </p>
      )}

      {answer && (
        <div className="DocSearch-Ask-answer">
          <Markdown
            remarkPlugins={[remarkGfm]}
            // No raw HTML by default, so model output never reaches the DOM as markup.
            // An allowlist rather than a blocklist, so a shape nobody considered cannot
            // appear: an answer is prose, short lists and the occasional code span.
            // Images are the pointed omission -- rendering one fetches whatever URL the
            // prose names, and the request alone is the payload.
            allowedElements={[
              "p",
              "a",
              "strong",
              "em",
              "del",
              "code",
              "pre",
              "ul",
              "ol",
              "li",
              "br",
            ]}
            // Anything else keeps its text and loses its markup, so a table the model
            // was told to render degrades to its words instead of vanishing.
            unwrapDisallowed
            components={{
              a: ({ href, children }) => {
                if (isCitation(href, children, sources))
                  // Superscript, so a citation reads as a mark on the sentence rather
                  // than a word in it. Adjacent ones are separated in CSS.
                  return (
                    <sup className="DocSearch-Ask-cite">
                      <BaseLink href={href ?? "#"} hideArrow>
                        {children}
                      </BaseLink>
                    </sup>
                  )
                // Anywhere else keeps its words and loses its destination.
                if (!isAllowedAnswerLink(href, referral?.url))
                  return <>{children}</>
                return (
                  <BaseLink href={href ?? "#"} hideArrow>
                    {children}
                  </BaseLink>
                )
              },
            }}
          >
            {withCitationLinks(answer, sources)}
          </Markdown>
        </div>
      )}

      {error && <p className="DocSearch-Ask-error">{error}</p>}

      {notice && <p className="DocSearch-Ask-notice">{notice}</p>}

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

      {done && (
        <footer className="DocSearch-Ask-footer">
          {sources.length > 0 && (
            <div className="DocSearch-Ask-sources">
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
            </div>
          )}

          {answer && (
            <div className="DocSearch-Ask-feedback">
              {rated ? (
                <span role="status">{t("docsearch-ask-feedback-thanks")}</span>
              ) : (
                <>
                  <span>{t("docsearch-ask-feedback-prompt")}</span>
                  <span className="DocSearch-Ask-feedback-buttons">
                    <button
                      type="button"
                      title={t("docsearch-ask-feedback-yes")}
                      aria-label={t("docsearch-ask-feedback-yes")}
                      onClick={() => rate(true)}
                    >
                      <ThumbsUp />
                    </button>
                    <button
                      type="button"
                      title={t("docsearch-ask-feedback-no")}
                      aria-label={t("docsearch-ask-feedback-no")}
                      onClick={() => rate(false)}
                    >
                      <ThumbsDown />
                    </button>
                  </span>
                </>
              )}
            </div>
          )}

          <p className="DocSearch-Ask-disclaimer">
            {t("docsearch-ask-disclaimer")}
          </p>
        </footer>
      )}
    </section>
  )
}

export default AskPanel
