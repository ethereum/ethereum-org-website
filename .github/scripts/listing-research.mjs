// Listing research for third-party listing PRs (see .github/workflows/listing-research.md).
//   match <pr>              exit 0 if <pr> is an outside contributor's listing request (needs GH_TOKEN, REPO)
//   prefetch <pr> <dir>     save the PR, the pages it links and domain-age evidence as plain text for the agent
//   submit <item.json>      validate one agent result, re-check its quotes, print the comment body
// Every fetched page is attacker-controlled: it is only ever saved or searched as text, never executed.
import { execFileSync } from "node:child_process"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { pathToFileURL } from "node:url"

const REPO = process.env.REPO || "ethereum/ethereum-org-website"
const TEAM = ["OWNER", "MEMBER", "COLLABORATOR"]
const TITLE = /\b(add|adding|added|list|listing|include)\b/i
export const LISTING = new RegExp(
  `^(?:public/content/(?:${[
    "developers/docs/nodes-and-clients/nodes-as-a-service",
    "developers/docs/apis/(?:backend|javascript)",
    "developers/docs/data-and-analytics(?:/block-explorers)?",
    "developers/docs/(?:frameworks|ides|development-networks|oracles|storage|bridges)",
    "developers/docs/programming-languages(?:/[a-z-]+)?",
    "developers/docs/smart-contracts/security",
    "staking/(?:pools|saas|solo|dvt)",
    "community/(?:grants|online|get-involved)",
    "security",
    "bridges",
    "desci",
  ].join("|")})/index\\.md|src/data/(?:${[
    "wallets/wallet-data\\.ts",
    "exchangesByCountry\\.ts",
    "networks/networks\\.ts",
    "staking-products\\.json",
    "externalTutorials\\.json",
    "community-meetups\\.json",
    "community/reddit-communities\\.ts",
  ].join("|")})|app/\\[locale\\]/resources/utils\\.tsx)$`
)
const MAX_LINKED = 10
const MAX_PAGES = 15
const SOCIAL =
  /(^|\.)(github\.com|githubusercontent\.com|x\.com|twitter\.com|t\.me|discord\.(gg|com)|medium\.com|youtube\.com|linkedin\.com)$/
const EVIDENCE_PATH =
  /\/(audits?|security|pricing|plans|status|docs?|about|team|company|terms|legal|faq)(\/|$|[.-])/i

const gh = (path, accept) =>
  execFileSync(
    "gh",
    ["api", ...(accept ? ["-H", `accept: ${accept}`] : []), path],
    { encoding: "utf8", maxBuffer: 1 << 26 }
  )
const ghJson = (path) => JSON.parse(gh(path))

// ponytail: hostname check only, no DNS resolution; add resolve-then-check if this ever runs on a runner with an internal network.
export function publicUrl(u) {
  try {
    const x = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(u) ? u : `https://${u}`)
    if (!/^https?:$/.test(x.protocol) || x.username || x.password) return null
    const h = x.hostname.replace(/\.+$/, "")
    if (
      !h.includes(".") ||
      h.startsWith("[") ||
      /(^|\.)(localhost|local|internal)$|^metadata\./i.test(h)
    )
      return null
    if (
      /^\d+\.\d+\.\d+\.\d+$/.test(h) &&
      /^(10\.|127\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.|22[4-9]\.|2[3-5]\d\.)/.test(
        h
      )
    )
      return null
    return x.href
  } catch {
    return null
  }
}

// ponytail: last two labels, three under common two-level suffixes; use the Public Suffix List if lookups miss.
export const registrableDomain = (host) => {
  const h = host.toLowerCase().replace(/\.$/, "")
  return h
    .split(".")
    .slice(/\.(co|com|net|org|gov|edu|ac|ne|or)\.[a-z]{2}$/.test(h) ? -3 : -2)
    .join(".")
}

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "'",
  lsquo: "'",
  ldquo: '"',
  rdquo: '"',
  mdash: "—",
  ndash: "–",
  hellip: "…",
}
const codePoint = (n) => {
  try {
    return String.fromCodePoint(n)
  } catch {
    return " "
  }
}

export const toText = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
      e[0] !== "#"
        ? (ENTITIES[e.toLowerCase()] ?? m)
        : codePoint(
            e[1] === "x" || e[1] === "X"
              ? parseInt(e.slice(2), 16)
              : Number(e.slice(1))
          )
    )
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\s+/g, " ")
    .trim()

async function readCapped(res, max) {
  if (!res.body) return ""
  const reader = res.body.getReader()
  const chunks = []
  let n = 0
  while (n < max) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    n += value.length
  }
  await reader.cancel().catch(() => {})
  return new TextDecoder().decode(Buffer.concat(chunks).subarray(0, max))
}

async function fetchText(start, max = 3_000_000) {
  let url = publicUrl(start)
  if (!url) return { status: 0, text: null, error: "not a public URL" }
  const signal = AbortSignal.timeout(20000)
  try {
    for (let hop = 0; hop <= 5; hop++) {
      const res = await fetch(url, {
        signal,
        redirect: "manual",
        headers: { "user-agent": "ethereum-org-listing-research" },
      })
      const location = res.headers.get("location")
      if (res.status >= 300 && res.status < 400 && location) {
        await res.body?.cancel().catch(() => {})
        url = publicUrl(new URL(location, url).href)
        if (!url)
          return {
            status: res.status,
            text: null,
            error: "redirect to a non-public URL",
          }
        continue
      }
      if (!res.ok) {
        await res.body?.cancel().catch(() => {})
        return { status: res.status, url, text: null }
      }
      const raw = await readCapped(res, max)
      const links = [...raw.matchAll(/href\s*=\s*["']([^"'#\s]+)/gi)]
        .map((m) => URL.parse(m[1], url)?.href)
        .filter(Boolean)
      return { status: res.status, url, text: toText(raw), links }
    }
    return { status: 0, text: null, error: "too many redirects" }
  } catch (e) {
    return {
      status: 0,
      text: null,
      error: String(e.message || e).slice(0, 120),
    }
  }
}

async function pool(items, n, fn) {
  const out = []
  let next = 0
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (next < items.length) {
        const i = next++
        out[i] = await fn(items[i], i)
      }
    })
  )
  return out
}

function codeowners() {
  try {
    return [
      ...readFileSync(".github/CODEOWNERS", "utf8").matchAll(
        /@([\w-]+)(?![\w/-])/g
      ),
    ].map((m) => m[1].toLowerCase())
  } catch {
    return []
  }
}

async function match(pr) {
  const p = ghJson(`repos/${REPO}/pulls/${pr}`)
  if (
    p.draft ||
    p.user.type === "Bot" ||
    TEAM.includes(p.author_association) ||
    codeowners().includes(p.user.login.toLowerCase()) ||
    !TITLE.test(p.title)
  )
    process.exit(1)
  const files = ghJson(`repos/${REPO}/pulls/${pr}/files?per_page=100`).map(
    (f) => f.filename
  )
  process.exit(files.some((f) => LISTING.test(f)) ? 0 : 1)
}

const norm = (u) => u.replace(/#.*$/, "")

async function domainAge(d) {
  const json = (url, ms) =>
    fetch(url, { signal: AbortSignal.timeout(ms) })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
  const [rdap, wb] = await Promise.all([
    json(`https://rdap.org/domain/${d}`, 15000),
    json(
      `https://web.archive.org/cdx/search/cdx?url=${d}&limit=1&output=json`,
      20000
    ),
  ])
  const ts = wb?.[1]?.[1]
  return {
    domain: d,
    registered:
      rdap?.events
        ?.find((e) => e.eventAction === "registration")
        ?.eventDate?.slice(0, 10) || null,
    firstArchived: ts
      ? `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}`
      : null,
  }
}

// The product's own sites, taken from the author-sourced URLs the agent cited.
export const productSites = (item) =>
  [
    ...new Set(
      [...arr(item.criteria, 20), ...arr(item.facts, 15)]
        .filter((c) => c.source === "author")
        .map((c) => publicUrl(String(c.url || "")))
        .filter(Boolean)
        .map((u) => registrableDomain(new URL(u).hostname))
        .filter((d) => !SOCIAL.test(d))
    ),
  ].slice(0, 3)

// The agent's GitHub tools hide outside contributors' issues (gh-aw integrity filter), so referenced issues are saved here as text.
function linkedIssues(body, self) {
  const nums = [
    ...body.matchAll(
      /(?:^|[\s(])#(\d+)\b|github\.com\/ethereum\/ethereum-org-website\/issues\/(\d+)/g
    ),
  ].map((m) => Number(m[1] || m[2]))
  return [...new Set(nums)]
    .filter((n) => n !== self)
    .slice(0, 3)
    .flatMap((n) => {
      try {
        const i = ghJson(`repos/${REPO}/issues/${n}`)
        if (i.pull_request) return []
        return [
          {
            number: i.number,
            title: i.title,
            body: (i.body || "").slice(0, 6000),
            author: i.user?.login,
            labels: i.labels.map((l) => l.name),
            state: i.state,
            createdAt: i.created_at,
          },
        ]
      } catch {
        return []
      }
    })
}

async function prefetch(pr, dir) {
  mkdirSync(`${dir}/pages`, { recursive: true })
  const p = ghJson(`repos/${REPO}/pulls/${pr}`)
  const diff = gh(`repos/${REPO}/pulls/${pr}`, "application/vnd.github.diff")
  const added = diff
    .split("\n")
    .filter((l) => l.startsWith("+") && !l.startsWith("+++"))
    .join("\n")
  writeFileSync(
    `${dir}/pr.json`,
    JSON.stringify(
      {
        number: p.number,
        title: p.title,
        body: p.body || "",
        author: p.user.login,
        authorAssociation: p.author_association,
        createdAt: p.created_at,
        headSha: p.head.sha,
        baseSha: p.base.sha,
        files: ghJson(`repos/${REPO}/pulls/${pr}/files?per_page=100`).map(
          (f) => f.filename
        ),
        issues: linkedIssues(p.body || "", p.number),
      },
      null,
      2
    )
  )
  writeFileSync(`${dir}/diff.patch`, diff)

  const urls = [
    ...new Set(
      (`${p.body || ""}\n${added}`.match(/https?:\/\/[^\s<>()"'`\]]+/g) || [])
        .map((u) => publicUrl(u.replace(/[.,;:!?]+$/, "")))
        .filter(Boolean)
        .map(norm)
    ),
  ]
    .filter(
      (u) =>
        !/^https:\/\/(github\.com\/ethereum\/ethereum-org-website|ethereum\.org)\b/.test(
          u
        )
    )
    .slice(0, MAX_LINKED)

  const pages = []
  const seen = new Set(urls)
  const save = async (url, from) => {
    const { status, text, error, links, url: final } = await fetchText(url)
    const file = `pages/${String(pages.length + 1).padStart(2, "0")}.txt`
    const page = { url, status, file: text ? file : null, from, error }
    if (final && final !== url) page.finalUrl = final
    pages.push(page)
    if (text) writeFileSync(`${dir}/${file}`, text.slice(0, 40000))
    return links || []
  }
  const linked = await pool(urls, 4, (u) => save(u, "pr"))

  const sites = new Set(
    urls
      .map((u) => registrableDomain(new URL(u).hostname))
      .filter((d) => !SOCIAL.test(d))
  )
  const sameSite = []
  for (const href of linked.flat()) {
    if (urls.length + sameSite.length >= MAX_PAGES) break
    const u = publicUrl(href)
    if (!u) continue
    const x = new URL(norm(u))
    if (
      seen.has(x.href) ||
      !sites.has(registrableDomain(x.hostname)) ||
      !EVIDENCE_PATH.test(`/${x.hostname.split(".")[0]}${x.pathname}`)
    )
      continue
    seen.add(x.href)
    sameSite.push(x.href)
  }
  await pool(sameSite, 4, (u) => save(u, "same-site"))

  const domains = await pool([...sites], 4, domainAge)
  writeFileSync(
    `${dir}/evidence.json`,
    JSON.stringify({ pages, domains }, null, 2)
  )
  console.log(
    `prefetched ${pages.filter((x) => x.file).length}/${pages.length} pages (${sameSite.length} same-site), ${domains.length} domains`
  )
}

const STATUS = ["pass", "fail", "unknown"]
const SOURCES = ["author", "independent", "repo"]
const str = (v, n = 500) => String(v ?? "").slice(0, n)
const arr = (v, n = 15) => {
  if (typeof v === "string")
    try {
      v = JSON.parse(v)
    } catch {
      v = []
    }
  return (Array.isArray(v) ? v : []).filter((x) => x != null).slice(0, n)
}

// The quote must be ≥20 chars; "…" may join pieces of ≥12 chars that appear in order.
export function quoteFound(quote, pageText) {
  const parts = toText(String(quote))
    .toLowerCase()
    .replace(/^["']+|["']+$/g, "")
    .split(/…|\.\.\./)
    .map((s) => s.trim())
    .filter(Boolean)
  if (
    !parts.length ||
    parts.join(" ").length < 20 ||
    parts.some((s) => s.length < 12)
  )
    return false
  const text = pageText.toLowerCase()
  let at = 0
  for (const s of parts) {
    const i = text.indexOf(s, at)
    if (i < 0) return false
    at = i + s.length
  }
  return true
}

// Markdown/HTML-inert text: no links, images, tags, mentions, cross-references or code spans.
export const esc = (s) =>
  String(s ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[\\`*_[\]()<>&#|!~]/g, (c) =>
      c === "&"
        ? "&amp;"
        : c === "<"
          ? "&lt;"
          : c === ">"
            ? "&gt;"
            : c === "#"
              ? "\\#\u200b"
              : `\\${c}`
    )
    .replace(/@/g, "@\u200b")
    .replace(/:\/\//g, ":\u200b//")
    .replace(/www\./gi, (m) => `${m.slice(0, 3)}\u200b.`)

export async function check(item, fetchPage = fetchText) {
  const cache = new Map()
  let checked = 0
  const page = (u) => {
    if (!cache.has(u)) {
      if (checked >= 25) return Promise.resolve(null)
      checked++
      cache.set(
        u,
        fetchPage(u).then((r) => r.text ?? null)
      )
    }
    return cache.get(u)
  }
  // "ok" | a reason it couldn't be confirmed
  const verify = async (x, raw) => {
    if (x.source === "repo") return "ok"
    if (!x.quote) return "no quote"
    const url = publicUrl(String(raw.url || ""))
    if (!url) return "no public source"
    const text = await page(url)
    if (text == null) return "couldn't verify"
    return quoteFound(x.quote, text) ? "ok" : "quote not found at source"
  }
  const base = (c) => {
    const source = SOURCES.includes(c.source) ? c.source : "author"
    const url = source === "repo" ? null : publicUrl(String(c.url || ""))
    return {
      quote: str(c.quote, 300),
      source,
      url:
        source === "repo"
          ? str(c.url, 200).replace(/[^\w./[\]-]/g, "")
          : url || "",
    }
  }

  let downgraded = 0
  const criteria = []
  for (const c of arr(item.criteria, 20)) {
    const x = {
      criterion: str(c.criterion, 200),
      status: STATUS.includes(c.status) ? c.status : "unknown",
      weight: c.weight === "nice" ? "nice" : "must",
      ...base(c),
    }
    if (x.status !== "unknown") {
      const v = await verify(x, c)
      if (v !== "ok") {
        x.status = "unknown"
        x.note = v
        downgraded++
      }
    }
    criteria.push(x)
  }

  let dropped = 0
  const facts = []
  for (const f of arr(item.facts, 15)) {
    const x = { fact: str(f.fact, 300), ...base(f) }
    if (facts.length < 5 && x.fact && (await verify(x, f)) === "ok")
      facts.push(x)
    else dropped++
  }

  return {
    v: 2,
    pr: Number(String(item.pr).replace(/\D/g, "")),
    sha: str(item.sha, 40).replace(/[^0-9a-f]/gi, ""),
    product: str(item.product, 120),
    policy: {
      page: str(item.policy_page, 80).replace(/[^a-z0-9/-]/g, ""),
      why: str(item.policy_why, 300),
    },
    criteria,
    facts,
    existing: arr(item.existing).map((e) => ({
      path: str(e.path, 200),
      text: str(e.text, 200),
    })),
    askAuthor: arr(item.ask_author, 3).map((s) => str(s, 300)),
    injection: str(item.injection, 300),
    verification: { checked, downgraded, dropped },
  }
}

export function render(r, run) {
  const icon = { pass: "✅", fail: "❌", unknown: "❔" }
  const src = (c) =>
    `${c.url ? esc(c.source === "repo" ? c.url : new URL(c.url).hostname) + " " : ""}${c.source}`
  const quote = (c) => (c.quote ? `“${esc(c.quote)}”` : "")
  const mark = (c) =>
    c.status === "pass" && c.source === "author" ? "☑️" : icon[c.status]
  const name = (c) =>
    esc(c.criterion) + (c.weight === "nice" ? " _(preferred)_" : "")
  const rows = r.criteria
    .filter((c) => c.status !== "unknown")
    .map((c) => `| ${mark(c)} | ${name(c)} | ${quote(c)} | ${src(c)} |`)
  const open = r.criteria
    .filter((c) => c.status === "unknown")
    .map((c) => name(c) + (c.note ? ` _(${esc(c.note)})_` : ""))
  const age = (r.siteAge || [])
    .filter((s) => s.registered || s.firstArchived)
    .map(
      (s) =>
        `${esc(s.domain)}: ${[s.registered && `registered ${s.registered} (RDAP)`, s.firstArchived && `first archived ${s.firstArchived} (Wayback Machine)`].filter(Boolean).join(", ")}`
    )
  const policy = r.policy.page
    ? `[\`${r.policy.page}\`](https://ethereum.org/contributing/${r.policy.page}/)`
    : "no matching listing policy"
  const data = JSON.stringify({ ...r, run }).replace(
    /[<>@]/g,
    (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`
  )
  return [
    `## 🧾 Listing check${r.product ? ` — ${esc(r.product)}` : ""}`,
    `Checked against ${policy}. ✅ confirmed by an independent source or this repo, ☑️ stated only on the product's own site, ❌ contradicted. A maintainer makes the listing decision.`,
    rows.length
      ? `| | Criterion | Evidence | Source |\n|---|---|---|---|\n${rows.join("\n")}`
      : "",
    open.length ? `**❔ Not shown yet:** ${open.join(" · ")}` : "",
    r.askAuthor.length
      ? `**Questions for the author:**\n${r.askAuthor.map((a) => `- ${esc(a)}`).join("\n")}`
      : "",
    r.existing.length
      ? `**Already on ethereum.org:** ${r.existing.map((e) => esc(e.path)).join(", ")}`
      : "",
    r.facts.length || age.length
      ? `<details><summary>Facts found (${age.length + r.facts.length})</summary>\n\n${[...age.map((a) => `- ${a}`), ...r.facts.map((f) => `- ${esc(f.fact)}${f.quote ? ` — ${quote(f)}` : ""} (${src(f)})`)].join("\n")}\n\n</details>`
      : "",
    `<!-- ethorg-listing: ${data} -->`,
  ]
    .filter(Boolean)
    .join("\n\n")
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2)
  if (cmd === "match") await match(args[0])
  else if (cmd === "prefetch") await prefetch(args[0], args[1])
  else if (cmd === "submit") {
    const item = JSON.parse(readFileSync(args[0], "utf8"))
    const r = await check(item)
    r.siteAge = await pool(productSites(item), 3, domainAge)
    process.stdout.write(render(r, process.env.RUN_URL || ""))
  } else throw new Error(`unknown command: ${cmd}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  // Exit 1 means "not a listing" for `match`; any crash exits 2 so callers can tell them apart.
  main().catch((e) => {
    console.error(e)
    process.exit(2)
  })
