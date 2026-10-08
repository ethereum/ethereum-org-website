// Grounded answers over the search index, streamed. No auth and no server-side rate
// limit: the provider's cap on the key is the backstop, and an environment without a
// key answers 503. The per-browser limit in the UI is a courtesy, not a defence.

import { type AskErrorCode, SITE_ORIGIN } from "@/lib/utils/ask"
import { SORT_BY, TEXT_MATCH_TYPE } from "@/lib/utils/searchParams"

import { ASK_FOLLOWUPS } from "@/data/ask-followups"

import { DEFAULT_LOCALE } from "@/lib/constants"

import {
  BANNED_RE,
  buildMessages,
  Citations,
  citedSources,
  groupExcerpts,
  keywordQuery,
  matchReferral,
  type RetrievedRecord,
  sitePath,
  withLeads,
} from "./grounding"

/** Records pulled for grounding, before grouping collapses them to one per page. */
const RETRIEVE = 60
const MAX_PAGES = 8
const MAX_TOKENS = 1200
const TIMEOUT_MS = 45_000

const LVLS = [0, 1, 2, 3, 4, 5, 6].map((n) => `hierarchy.lvl${n}`)

const typesenseOrigin = () => {
  const host = process.env.NEXT_PUBLIC_TYPESENSE_HOST
  if (!host) return ""
  const protocol = process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL ?? "https"
  const port = process.env.NEXT_PUBLIC_TYPESENSE_PORT
  const suffix = !port || port === "443" || port === "80" ? "" : `:${port}`
  return `${protocol}://${host}${suffix}`
}

const collectionFor = (locale: string) =>
  `${process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION_PREFIX || "ethereumorg"}-${locale}`

const search = async (
  params: Record<string, unknown>
): Promise<Record<string, string>[]> => {
  const origin = typesenseOrigin()
  // The public key is scoped to the search action, so the fallback grants nothing new.
  const key =
    process.env.TYPESENSE_SEARCH_KEY ||
    process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_KEY
  if (!origin || !key) return []

  const response = await fetch(`${origin}/multi_search`, {
    method: "POST",
    headers: { "X-TYPESENSE-API-KEY": key, "content-type": "application/json" },
    body: JSON.stringify({
      searches: [
        {
          include_fields: [
            ...LVLS,
            "content",
            "url",
            "type",
            "description",
          ].join(","),
          // Heading-only records match titles hard and ground nothing. Drop once the
          // crawl uses `only_content_level`.
          filter_by: "type:=content",
          // Grounding wants the whole section, not the highlighted fragment.
          highlight_fields: "none",
          ...params,
        },
      ],
    }),
  })
  if (!response.ok) return []
  const json = await response.json()
  const result = json?.results?.[0]
  // A grouped search answers with `grouped_hits` and leaves `hits` empty.
  const hits =
    result?.hits ??
    (result?.grouped_hits ?? []).flatMap(
      (group: { hits: { document: Record<string, string> }[] }) => group.hits
    )
  return (hits ?? []).map(
    ({ document }: { document: Record<string, string> }) => document
  )
}

const asRecord = (document: Record<string, string>): RetrievedRecord => ({
  url: sitePath(document.url),
  content: document.content || "",
  headings: LVLS.map((lvl) => document[lvl]).filter(Boolean),
  description: document.description,
})

/**
 * Two passes: the question as asked, and its content words alone. Neither subsumes the
 * other ("how do I get eth?" needs the keywords, "what is a DAO?" the question), and
 * keyword hits lead because they name the topic.
 */
const retrieve = async (
  query: string,
  locale: string
): Promise<RetrievedRecord[]> => {
  const base = {
    collection: collectionFor(locale),
    query_by: [...LVLS, "content"].join(","),
    per_page: RETRIEVE,
    sort_by: SORT_BY,
    text_match_type: TEXT_MATCH_TYPE,
    // Every token has to match by default, which starved long questions of results.
    drop_tokens_mode: "both_sides:3",
  }
  const keywords = keywordQuery(query)
  const [asked, named] = await Promise.all([
    search({ ...base, q: query, drop_tokens_threshold: 30 }),
    keywords && keywords !== query.toLowerCase()
      ? search({ ...base, q: keywords, drop_tokens_threshold: 10 })
      : Promise.resolve([]),
  ])
  return [...named, ...asked].map(asRecord)
}

/** Each page's opening paragraph; `item_priority` is highest at the top of the page. */
const leadParagraphs = async (
  paths: string[],
  locale: string
): Promise<Map<string, string>> => {
  if (!paths.length) return new Map()
  const documents = await search({
    collection: collectionFor(locale),
    q: "*",
    filter_by: `type:=content && url_without_anchor:=[${paths
      .map((path) => `${SITE_ORIGIN}${path}`)
      .join(",")}]`,
    group_by: "url_without_anchor",
    group_limit: 1,
    per_page: Math.min(paths.length, 50),
    sort_by: "item_priority:desc",
  })
  return new Map(
    documents
      .filter((document) => document.content)
      .map((document) => [
        sitePath(document.url).split("#")[0],
        document.content,
      ])
  )
}

const encoder = new TextEncoder()
const event = (payload: unknown) =>
  encoder.encode(`${JSON.stringify(payload)}\n`)

export async function POST(request: Request) {
  const { q, locale = DEFAULT_LOCALE } = await request
    .json()
    .catch(() => ({ q: "" }))
  if (typeof q !== "string" || !q.trim()) {
    return Response.json({ error: "Missing query" }, { status: 400 })
  }
  if (!process.env.INFERENCE_API_KEY || !process.env.INFERENCE_URL) {
    return Response.json({ error: "Not configured" }, { status: 503 })
  }
  // Enforced here too: the button not rendering elsewhere does not close the endpoint.
  if (locale !== DEFAULT_LOCALE) {
    return Response.json({ error: "Unsupported locale" }, { status: 400 })
  }

  const question = q.slice(0, 500)
  const records = await retrieve(question, locale)
  const grouped = groupExcerpts(records, { maxPages: MAX_PAGES })
  if (!grouped.length) {
    return Response.json(
      { error: "Nothing to ground an answer in", code: "no-match" },
      { status: 422 }
    )
  }
  const excerpts = withLeads(
    grouped,
    await leadParagraphs(
      grouped.map((excerpt) => excerpt.url.split("#")[0]),
      locale
    )
  )

  const referral = matchReferral(question)
  const citations = new Citations(excerpts.length)

  const upstream = await fetch(
    `${process.env.INFERENCE_URL.replace(/\/+$/, "")}/chat/completions`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${process.env.INFERENCE_API_KEY}`,
        "content-type": "application/json",
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        model: process.env.INFERENCE_CHAT_MODEL,
        messages: buildMessages(question, excerpts, referral),
        temperature: 0.2,
        max_tokens: MAX_TOKENS,
        stream: true,
        // Qwen3 otherwise spends `max_tokens` reasoning and returns an empty answer.
        chat_template_kwargs: { enable_thinking: false },
      }),
    }
  ).catch(() => null)

  // Passed through so the client can say how long to wait.
  if (upstream?.status === 429) {
    const retryAfter = upstream.headers.get("retry-after") ?? "20"
    return Response.json(
      { error: "Rate limited", retryAfter: Number(retryAfter) || 20 },
      { status: 429, headers: { "retry-after": retryAfter } }
    )
  }
  if (!upstream?.ok || !upstream.body) {
    return Response.json({ error: "Upstream unavailable" }, { status: 502 })
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader()
      const decoder = new TextDecoder()
      let sse = ""
      let answer = ""

      const finish = (code?: AskErrorCode) => {
        const tail = citations.flush()
        if (tail) controller.enqueue(event({ type: "token", value: tail }))
        if (code) controller.enqueue(event({ type: "error", code }))
        else {
          // Follow-up only from the page the answer leaned on most: its first citation.
          const cited = citedSources(excerpts, citations.used)
          const lead = cited[0]?.url.split("#")[0]
          controller.enqueue(
            event({
              type: "sources",
              sources: cited,
              referral: referral && { name: referral.name, url: referral.url },
              followup: lead && lead in ASK_FOLLOWUPS ? lead : undefined,
            })
          )
        }
        controller.close()
      }

      try {
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          sse += decoder.decode(value, { stream: true })
          const lines = sse.split("\n")
          sse = lines.pop() ?? ""
          for (const line of lines) {
            if (!line.startsWith("data:")) continue
            const data = line.slice(5).trim()
            if (!data || data === "[DONE]") continue
            let delta = ""
            try {
              delta = JSON.parse(data)?.choices?.[0]?.delta?.content || ""
            } catch {
              continue
            }
            if (!delta) continue
            answer += delta
            if (BANNED_RE.test(answer)) {
              await reader.cancel()
              return finish("address")
            }
            controller.enqueue(
              event({ type: "token", value: citations.feed(delta) })
            )
          }
        }
        if (!answer.trim()) return finish("empty")
        finish()
      } catch {
        finish("truncated")
      }
    },
  })

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-store",
    },
  })
}
