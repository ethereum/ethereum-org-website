"use client"

import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { BaseLink } from "@/components/ui/Link"

import {
  type AskAllowance,
  type AskErrorCode,
  isAllowedAnswerLink,
  scrubQuery,
  type Source,
  takeAskAllowance,
  withCitationLinks,
} from "@/lib/utils/ask"
import { cn } from "@/lib/utils/cn"
import { isExplorerLookup } from "@/lib/utils/explorerQuery"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { ASK_FOLLOWUPS, type AskFollowupPath } from "@/data/ask-followups"

/** Where the model was told to send the reader instead of answering from excerpts. */
interface ReferralNote {
  name: string
  url: string
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

// The container's unlayered link reset beats plain utilities, hence `!`.
const LINK = "text-primary! hover:underline!"

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
  /** The ask never reached the model, so the question is still unanswered. */
  onThrottled: (retryAfter: number) => void
  onHoverTarget: (index: number | null) => void
}

/** One question's answer. Remounted per ask, so its state starts fresh. */
const AskPanel = ({
  query,
  onDismiss,
  onTargets,
  activeTarget,
  onHoverTarget,
  onThrottled,
}: AskPanelProps) => {
  const t = useTranslations("common")
  const locale = useLocale()
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState<Source[]>([])
  const [referral, setReferral] = useState<ReferralNote | null>(null)
  const [followup, setFollowup] = useState<AskFollowupPath | null>(null)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const [done, setDone] = useState(false)
  const [rated, setRated] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)
  // StrictMode runs the effect twice per mount; spend one allowance, not two.
  const allowance = useRef<AskAllowance | null>(null)

  const throttled = useEffectEvent((retryAfter: number) =>
    onThrottled(retryAfter)
  )

  useEffect(() => {
    const controller = new AbortController()

    // One event per question, once the outcome is known.
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
      // A bare address or name: the explorer rows beneath already answer it.
      if (isExplorerLookup(query)) {
        setNotice(t("docsearch-ask-explorer"))
        report("explorer")
        setDone(true)
        return
      }

      allowance.current ??= takeAskAllowance()
      if (!allowance.current.allowed) {
        setError(
          t("docsearch-ask-busy", { seconds: allowance.current.retryAfter })
        )
        report("throttled locally")
        setDone(true)
        throttled(allowance.current.retryAfter)
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
          // Nothing retrieved, usually a question asked in another language.
          if (response.status === 422) {
            setNotice(t("docsearch-ask-english-only"))
            report("no match")
            setDone(true)
            return
          }
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
          report(response.status === 429 ? "rate limited upstream" : "failed")
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
              // A refusal cites nothing, in any language.
              report(payload.sources.length ? "answered" : "refused")
            }
            if (payload.type === "error") {
              setError(t(`docsearch-ask-error-${payload.code as AskErrorCode}`))
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
        // An aborted run (StrictMode's first, or a dismiss) must not end the live one.
        if (!controller.signal.aborted) setDone(true)
      }
    }
    run()
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Effect Events are not deps; this plugin predates them
  }, [query, locale, t])

  // The answer arrives above the results, which the reader may have scrolled down.
  useEffect(() => {
    scroller.current
      ?.closest<HTMLElement>(".DocSearch-Dropdown")
      ?.scrollTo({ top: 0 })
  }, [])

  const targets = useMemo(
    () => [
      ...(followup ? [{ url: followup }] : []),
      ...(referral ? [{ url: referral.url }] : []),
      ...sources.map((source) => ({ url: source.url })),
    ],
    [followup, referral, sources]
  )
  const offset = (followup ? 1 : 0) + (referral ? 1 : 0)

  // Records the question and the cited paths, not the prose: bad answers have almost
  // always been bad grounding.
  const rate = (helpful: boolean) => {
    setRated(true)
    const safe = scrubQuery(query)
    if (!safe) return
    trackCustomEvent({
      eventCategory: "search",
      eventAction: `ask feedback ${helpful ? "up" : "down"}`,
      eventName: safe,
    })
    trackCustomEvent({
      eventCategory: "search",
      eventAction: `ask feedback ${helpful ? "up" : "down"} sources`,
      eventName: sources.map((source) => source.url).join(" ") || "none",
    })
  }

  // Highlight and hover for a navigable target. Focus stays in the input, as it does
  // for the library's own rows.
  const targetProps = (index: number, className?: string) => ({
    "aria-current": index === activeTarget,
    className: cn(
      className,
      index === activeTarget &&
        "rounded-xs bg-primary-low-contrast outline outline-4 outline-primary-low-contrast"
    ),
    onMouseMove: () => onHoverTarget(index),
    onMouseLeave: () => onHoverTarget(null),
  })

  const reportTargets = useEffectEvent((next: AskTarget[]) => onTargets(next))

  useEffect(() => {
    if (done) reportTargets(targets)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Effect Events are not deps; this plugin predates them
  }, [done, targets])

  useEffect(() => {
    if (activeTarget === null) return
    scroller.current
      ?.querySelector("[aria-current='true']")
      ?.scrollIntoView({ block: "nearest" })
  }, [activeTarget])

  return (
    <section
      className="DocSearch-Ask flex cursor-auto flex-col gap-4 py-4"
      ref={scroller}
    >
      <header className="flex items-center justify-between text-xs text-body-medium uppercase">
        <span>
          {t("docsearch-ask-answer")}
          {/* Not a citation, so no brackets. */}
          <sup className="ms-1 lowercase">{t("docsearch-ask-beta")}</sup>
        </span>
        <button
          type="button"
          className="text-primary normal-case hover:underline"
          onClick={onDismiss}
        >
          {t("docsearch-ask-dismiss")}
        </button>
      </header>

      {/* Names the question, since the results below keep changing as the reader types. */}
      <p className="line-clamp-2 text-md font-bold text-body">{query}</p>

      {!answer && !error && !notice && (
        <p className="text-sm text-body-medium" role="status">
          {t("docsearch-ask-thinking")}
        </p>
      )}

      {answer && (
        <div className="DocSearch-Ask-answer flex flex-col gap-3 text-md text-body">
          <Markdown
            remarkPlugins={[remarkGfm]}
            // An allowlist, so model output can only be prose. No images: rendering one
            // fetches whatever URL the prose names.
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
            unwrapDisallowed
            components={{
              a: ({ href, children }) => {
                if (isCitation(href, children, sources))
                  return (
                    <sup className="text-xs">
                      <BaseLink
                        href={href ?? "#"}
                        hideArrow
                        className="text-primary! hover:underline!"
                      >
                        {children}
                      </BaseLink>
                    </sup>
                  )
                // Any other link keeps its words and loses its destination.
                if (!isAllowedAnswerLink(href, referral?.url))
                  return <>{children}</>
                return (
                  <BaseLink
                    href={href ?? "#"}
                    hideArrow
                    className="text-primary! underline!"
                  >
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

      {error && <p className="text-sm text-error">{error}</p>}

      {notice && <p className="text-sm text-body-medium">{notice}</p>}

      {done && followup && (
        <p {...targetProps(0)}>
          <BaseLink href={followup} className={LINK}>
            {t(ASK_FOLLOWUPS[followup])}
          </BaseLink>
        </p>
      )}

      {done && referral && (
        <p {...targetProps(followup ? 1 : 0)}>
          <BaseLink href={referral.url} className={LINK}>
            {referral.name}
          </BaseLink>
        </p>
      )}

      {done && answer && (
        <div className="flex items-center gap-2 text-sm text-body-medium">
          {rated ? (
            <span role="status">{t("docsearch-ask-feedback-thanks")}</span>
          ) : (
            <>
              <span>{t("docsearch-ask-feedback-prompt")}</span>
              <span className="flex items-center">
                <button
                  type="button"
                  className="rounded-xs p-1 text-body-medium hover:text-primary-hover"
                  title={t("docsearch-ask-feedback-yes")}
                  aria-label={t("docsearch-ask-feedback-yes")}
                  onClick={() => rate(true)}
                >
                  <ThumbsUp className="size-4" />
                </button>
                <button
                  type="button"
                  className="rounded-xs p-1 text-body-medium hover:text-primary-hover"
                  title={t("docsearch-ask-feedback-no")}
                  aria-label={t("docsearch-ask-feedback-no")}
                  onClick={() => rate(false)}
                >
                  <ThumbsDown className="size-4" />
                </button>
              </span>
            </>
          )}
        </div>
      )}

      {done && (
        <footer className="flex flex-col gap-2 border-t border-solid border-disabled pt-3">
          {sources.length > 0 && (
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-xs text-body-medium uppercase">
                {t("docsearch-ask-sources")}
              </span>
              <ol className="m-0 flex list-inside list-decimal flex-col gap-1">
                {sources.map((source, index) => (
                  <li key={source.n} {...targetProps(offset + index)}>
                    <BaseLink href={source.url} hideArrow className={LINK}>
                      {source.title}
                    </BaseLink>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <p className="text-xs text-body-medium">
            {t("docsearch-ask-disclaimer")}
          </p>
        </footer>
      )}
    </section>
  )
}

export default AskPanel
