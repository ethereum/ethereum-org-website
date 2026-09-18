"use client"

import { useEffect, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { BaseLink } from "@/components/ui/Link"

import type { Source } from "@/lib/utils/ask"

/** Where the model was told to send the reader instead of answering from excerpts. */
interface ReferralNote {
  name: string
  url: string
}

/**
 * Citations arrive as bare `[1]` in the prose and the source list only lands when the
 * answer finishes, so they are linked by rewriting the markdown once the URLs are known.
 * Streaming shows them as plain text, which is the honest intermediate state.
 */
const withCitationLinks = (text: string, sources: Source[]) =>
  sources.length
    ? text.replace(/\[(\d{1,2})\]/g, (match, n) => {
        const source = sources.find((s) => s.n === Number(n))
        return source ? `[${n}](${source.url})` : match
      })
    : text

/** A citation is a link whose whole text is the number of a source it points at. */
const isCitation = (
  href: string | undefined,
  children: React.ReactNode,
  sources: Source[]
) =>
  sources.some(
    (source) => source.url === href && String(source.n) === String(children)
  )

interface AskPanelProps {
  query: string
  onDismiss: () => void
}

const AskPanel = ({ query, onDismiss }: AskPanelProps) => {
  const t = useTranslations("common")
  const locale = useLocale()
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState<Source[]>([])
  const [referral, setReferral] = useState<ReferralNote | null>(null)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    setAnswer("")
    setSources([])
    setReferral(null)
    setError("")
    setDone(false)

    const run = async () => {
      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ q: query, locale }),
          signal: controller.signal,
        })
        if (!response.ok || !response.body) {
          setError(t("docsearch-ask-error"))
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
            }
            if (payload.type === "error") setError(payload.value)
          }
        }
      } catch (caught) {
        if ((caught as Error).name !== "AbortError")
          setError(t("docsearch-ask-error"))
      } finally {
        setDone(true)
      }
    }
    run()
    return () => controller.abort()
  }, [query, locale, t])

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
        <span>{t("docsearch-ask-answer")}</span>
        <button type="button" onClick={onDismiss}>
          {t("docsearch-ask-back")}
        </button>
      </header>

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

      {done && referral && (
        <p className="DocSearch-Ask-referral">
          <BaseLink href={referral.url}>{referral.name}</BaseLink>
        </p>
      )}

      {done && sources.length > 0 && (
        <footer className="DocSearch-Ask-sources">
          <span>{t("docsearch-ask-sources")}</span>
          <ol>
            {sources.map((source) => (
              <li key={source.n}>
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
