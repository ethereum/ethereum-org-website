/**
 * Grounded answers over the search index, streamed.
 *
 * Retrieval reuses the collection search already queries -- no second index and no
 * embedding step, which is also the honest baseline: keyword retrieval is what dense
 * retrieval has to beat before it earns its own infrastructure.
 *
 * Preview-only for now. There is no auth and no rate limit, so the inference key belongs
 * in the deploy-preview context alone; on a public URL this route is a model proxy to
 * anyone who finds it.
 */

import {
  BANNED_RE,
  buildMessages,
  Citations,
  citedSources,
  groupExcerpts,
  matchReferral,
  type RetrievedRecord,
} from "@/lib/utils/ask"

/** Records pulled for grounding, before grouping collapses them to one per page. */
const RETRIEVE = 60
const MAX_PAGES = 8
/** Reasoning is disabled, but a truncated answer is still worse than a slow one. */
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

const retrieve = async (
  query: string,
  locale: string
): Promise<RetrievedRecord[]> => {
  const origin = typesenseOrigin()
  const key =
    process.env.TYPESENSE_SEARCH_KEY ||
    process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_KEY
  if (!origin || !key) return []

  const prefix =
    process.env.NEXT_PUBLIC_TYPESENSE_COLLECTION_PREFIX || "ethereumorg"
  const response = await fetch(`${origin}/multi_search`, {
    method: "POST",
    headers: { "X-TYPESENSE-API-KEY": key, "content-type": "application/json" },
    body: JSON.stringify({
      searches: [
        {
          collection: `${prefix}-${locale}`,
          q: query,
          query_by: [...LVLS, "content"].join(","),
          include_fields: [...LVLS, "content", "url", "type"].join(","),
          per_page: RETRIEVE,
          sort_by: "_text_match(buckets: 100):desc,pagerank:desc",
          // A question is long and every token has to match, so retrieval was starving:
          // "how do I stake my eth" returned one page and 289 characters to ground an
          // answer in. Dropping from both ends reaches the words that carry the question.
          // Grouping happens in code rather than through `group_by`, which counts groups
          // while this threshold counts raw hits -- set together they cancel out.
          drop_tokens_threshold: 30,
          drop_tokens_mode: "both_sides:3",
          // Grounding wants the whole section, not the matched fragment a row displays.
          highlight_fields: "none",
        },
      ],
    }),
  })
  if (!response.ok) return []

  const json = await response.json()
  const hits = json?.results?.[0]?.hits ?? []
  return hits.map(({ document }: { document: Record<string, string> }) => ({
    url: document.url,
    content: document.content || "",
    headings: LVLS.map((lvl) => document[lvl]).filter(Boolean),
  }))
}

const encoder = new TextEncoder()
const event = (payload: unknown) =>
  encoder.encode(`${JSON.stringify(payload)}\n`)

export async function POST(request: Request) {
  const { q, locale = "en" } = await request.json().catch(() => ({ q: "" }))
  if (typeof q !== "string" || !q.trim()) {
    return Response.json({ error: "Missing query" }, { status: 400 })
  }
  if (!process.env.INFERENCE_API_KEY || !process.env.INFERENCE_URL) {
    return Response.json({ error: "Not configured" }, { status: 503 })
  }
  if (typeof locale !== "string" || !/^[a-z]{2}(-[a-z]{2})?$/.test(locale)) {
    return Response.json({ error: "Bad locale" }, { status: 400 })
  }

  const question = q.slice(0, 500)
  const records = await retrieve(question, locale)
  const excerpts = groupExcerpts(records, { maxPages: MAX_PAGES })
  if (!excerpts.length) {
    return Response.json(
      { error: "Nothing to ground an answer in" },
      { status: 502 }
    )
  }

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
        // Qwen3 thinks by default and an unbudgeted reasoning pass spends `max_tokens`
        // before emitting a single character, so the answer comes back empty with no error.
        chat_template_kwargs: { enable_thinking: false },
      }),
    }
  ).catch(() => null)

  // A rate limit is the one upstream failure worth telling apart: waiting fixes it, and
  // the key is shared by everyone on the deploy, so it is the failure to expect. Passed
  // through with its own status and `Retry-After` rather than folded into a generic 502.
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

      const finish = (error?: string) => {
        const tail = citations.flush()
        if (tail) controller.enqueue(event({ type: "token", value: tail }))
        if (error) controller.enqueue(event({ type: "error", value: error }))
        else {
          controller.enqueue(
            event({
              type: "sources",
              sources: citedSources(excerpts, citations.used),
              referral: referral && { name: referral.name, url: referral.url },
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
              return finish("The generated answer was withheld.")
            }
            controller.enqueue(
              event({ type: "token", value: citations.feed(delta) })
            )
          }
        }
        // Empty with no error is the reasoning-budget failure; say so rather than
        // showing a blank panel.
        if (!answer.trim()) return finish("No answer was returned.")
        finish()
      } catch {
        finish("The answer was cut short.")
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
