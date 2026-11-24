// Listing research helpers for third-party listing requests, on PRs (pr-reviewer-listing.md) and issues (listing-research.md).
//   match <pr>                  exit 0 if <pr> is an outside contributor's listing PR (needs GH_TOKEN, REPO)
//   match-issue <n>             exit 0 if issue <n> is an outside contributor's listing request
//   match-reply <n> <comment>   exit 0 if <comment> is the author answering an earlier listing check on <n>, under the follow-up cap
//   prefetch <n> <dir>          save the issue or PR, its thread, the pages it links and domain-age evidence as plain text for the agent
//   check < item.json           re-check a submit item's listing fields and quotes; print the verified listing JSON
//   section < listing.json      print the "Listing check" section of the review comment
//   latest <n>                  print the newest listing check on an issue or PR, or null
//   signal <pr> < {record,prev} apply or clear the blocker signals on a PR; print the record with its blockers
//   submit <n> < item.json      verify a submit_listing item, post the research or follow-up comment and apply its signals
// Every fetched page is attacker-controlled: it is only ever saved or searched as text, never executed.
import { execFileSync } from "node:child_process"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { pathToFileURL } from "node:url"

const REPO = process.env.REPO || "ethereum/ethereum-org-website"
const TEAM = ["OWNER", "MEMBER", "COLLABORATOR"]
const BOT = "ethorg-agent[bot]"
const LISTING_LABELS = ["product 🧰", "wallet 👛", "resource 📚"]
const AWAITING = "awaiting changes"
const PRODUCT_REVIEW = "needs product review 🕵️"
export const MAX_FOLLOWUPS = 3
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
const ghList = (path) =>
  execFileSync("gh", ["api", "--paginate", path, "--jq", ".[]"], {
    encoding: "utf8",
    maxBuffer: 1 << 26,
  })
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l))
const ghWrite = (method, path, payload) =>
  execFileSync("gh", ["api", "-X", method, path, "--input", "-"], {
    input: JSON.stringify(payload ?? {}),
    encoding: "utf8",
  })
const addedLines = (diff) =>
  diff
    .split("\n")
    .filter((l) => l.startsWith("+") && !l.startsWith("+++"))
    .map((l) => l.slice(1))
    .join("\n")

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

const isOutsider = (x, owners) =>
  x.user?.type !== "Bot" &&
  !TEAM.includes(x.author_association) &&
  !owners.includes(String(x.user?.login).toLowerCase())

export function isListingIssue(i, owners = []) {
  if (i.pull_request || i.state !== "open" || !isOutsider(i, owners))
    return false
  const labels = (i.labels || []).map((l) =>
    typeof l === "string" ? l : l.name
  )
  // Events have their own template and no listing policy.
  if (labels.includes("event 📅") || /^event listing/i.test(i.title))
    return false
  if (labels.some((l) => LISTING_LABELS.includes(l))) return true
  if (labels.includes("quiz 📚") || /glossary|quiz/i.test(i.title)) return false
  if (/^suggest\b/i.test(i.title)) return true
  return TITLE.test(i.title) && externalUrls(i.body || "").length > 0
}

const RECORD = /<!-- ethorg-(listing|review): (.*?) -->/

// The bot's listing checks on an item, oldest first: a review's `listing` block or a standalone `ethorg-listing` line.
export function records(comments) {
  return comments.flatMap((c) => {
    const m = c.user?.login === BOT && String(c.body || "").match(RECORD)
    if (!m) return []
    try {
      const j = JSON.parse(m[2])
      const record = m[1] === "review" ? j.listing : j
      if (!record) return []
      const kind = m[1] === "review" ? "review" : record.kind || "research"
      const at = kind === "review" ? c.updated_at || c.created_at : c.created_at
      return [{ id: c.id, at, kind, record }]
    } catch {
      return []
    }
  })
}

export function latest(comments) {
  const r = records(comments).sort((a, b) =>
    String(a.at).localeCompare(String(b.at))
  )
  return {
    record: r.at(-1)?.record ?? null,
    at: r.at(-1)?.at ?? null,
    followups: r.filter((x) => x.kind === "followup").length,
  }
}

export function isListingReply(item, comment, comments) {
  if (
    item.state !== "open" ||
    comment.user?.type === "Bot" ||
    comment.user?.login !== item.user?.login
  )
    return false
  const l = latest(comments)
  return l.record != null && l.followups < MAX_FOLLOWUPS
}

const itemComments = (n) =>
  ghList(`repos/${REPO}/issues/${n}/comments?per_page=100`)

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

export const externalUrls = (text) =>
  [
    ...new Set(
      (text.match(/https?:\/\/[^\s<>()"'`\]]+/g) || [])
        .map((u) => publicUrl(u.replace(/[.,;:!?]+$/, "")))
        .filter(Boolean)
        .map(norm)
    ),
  ].filter(
    (u) =>
      !/^https:\/\/(github\.com\/ethereum\/ethereum-org-website|ethereum\.org)\b/.test(
        u
      )
  )

// Other issues and PRs that mention the same site: possible duplicates or earlier requests.
export function related(domains, self) {
  const seen = new Map()
  for (const d of domains.slice(0, 3)) {
    try {
      // Search tokenises "www.foo.com/x" without "foo.com", so the bare name is searched too when it is distinctive enough.
      const name = d.split(".")[0]
      const q = encodeURIComponent(
        `repo:${REPO} ${name.length >= 5 ? `("${d}" OR ${name})` : `"${d}"`}`
      )
      for (const i of ghJson(`search/issues?q=${q}&per_page=30`).items || []) {
        if (i.number === self || seen.has(i.number)) continue
        if (!`${i.title} ${i.body || ""}`.toLowerCase().includes(d)) continue
        seen.set(i.number, {
          number: i.number,
          kind: i.pull_request ? "pr" : "issue",
          state: i.pull_request?.merged_at ? "merged" : i.state,
          title: String(i.title).slice(0, 120),
        })
      }
    } catch {
      // Search is best-effort; a failed lookup just shows fewer related requests.
    }
  }
  return [...seen.values()].slice(0, 10)
}

const thread = (cs) =>
  cs.slice(-20).map((c) => ({
    author: c.user?.login,
    at: c.created_at,
    body: String(c.body || "")
      .replace(/<!-- ethorg-[\s\S]*?-->/g, "")
      .slice(0, 4000),
  }))

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
            research: (({ record, at }) => record && { at, record })(
              latest(itemComments(n))
            ),
          },
        ]
      } catch {
        return []
      }
    })
}

async function prefetch(n, dir) {
  mkdirSync(`${dir}/pages`, { recursive: true })
  const i = ghJson(`repos/${REPO}/issues/${n}`)
  const cs = itemComments(n)
  const prior = latest(cs)
  const common = {
    number: i.number,
    title: i.title,
    body: i.body || "",
    author: i.user.login,
    authorAssociation: i.author_association,
    createdAt: i.created_at,
    thread: thread(cs),
    prior: prior.record && { at: prior.at, record: prior.record },
  }
  const replies = cs
    .filter((c) => c.user?.login === i.user.login)
    .reverse()
    .map((c) => c.body || "")
  let text = [...replies, i.body || ""].join("\n")
  if (i.pull_request) {
    const p = ghJson(`repos/${REPO}/pulls/${n}`)
    const diff = gh(`repos/${REPO}/pulls/${n}`, "application/vnd.github.diff")
    text += `\n${addedLines(diff)}`
    const pr = {
      ...common,
      headSha: p.head.sha,
      baseSha: p.base.sha,
      files: ghJson(`repos/${REPO}/pulls/${n}/files?per_page=100`).map(
        (f) => f.filename
      ),
      issues: linkedIssues(p.body || "", p.number),
    }
    writeFileSync(`${dir}/pr.json`, JSON.stringify(pr, null, 2))
    writeFileSync(`${dir}/diff.patch`, diff)
  } else {
    const issue = { ...common, labels: i.labels.map((l) => l.name) }
    writeFileSync(`${dir}/issue.json`, JSON.stringify(issue, null, 2))
  }

  const urls = externalUrls(text).slice(0, MAX_LINKED)

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
  const linked = await pool(urls, 4, (u) => save(u, "request"))

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
    JSON.stringify(
      { pages, domains, related: related([...sites], i.number) },
      null,
      2
    )
  )
  console.log(
    `prefetched ${pages.filter((x) => x.file).length}/${pages.length} pages (${sameSite.length} same-site), ${domains.length} domains, prior check: ${prior.record ? prior.at : "none"}`
  )
}

const STATUS = ["pass", "fail", "unknown"]
const SOURCES = ["author", "independent", "repo"]
const num = (v) => Number(String(v ?? "").replace(/\D/g, "")) || undefined
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

const repoFile = (path) =>
  fetch(`https://raw.githubusercontent.com/${REPO}/dev/${path}`, {
    signal: AbortSignal.timeout(15000),
  })
    .then((r) => (r.ok ? r.text() : null))
    .catch(() => null)
const squash = (s) => String(s).toLowerCase().replace(/\s+/g, " ").trim()

export async function check(item, fetchPage = fetchText, readFile = repoFile) {
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
  for (const c of arr(item.criteria, 32)) {
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

  // Kept only when the quoted text really is in that file on dev.
  const existing = []
  for (const e of arr(item.existing, 5)) {
    const x = { path: str(e.path, 200), text: str(e.text, 200) }
    if (!/^[\w./[\]-]+$/.test(x.path) || x.path.includes("..")) continue
    if (squash(x.text).length < 8) continue
    const file = await readFile(x.path)
    if (file != null && squash(file).includes(squash(x.text))) existing.push(x)
  }

  return {
    v: 2,
    pr: num(item.pr),
    issue: num(item.issue),
    sha: str(item.sha, 40).replace(/[^0-9a-f]/gi, ""),
    product: str(item.product, 120),
    policy: {
      page: str(item.policy_page, 80).replace(/[^a-z0-9/-]/g, ""),
      why: str(item.policy_why, 300),
    },
    target: str(item.target_path, 200).replace(/[^\w./[\]-]/g, ""),
    criteria,
    facts,
    existing,
    askAuthor: arr(item.ask_author, 3).map((s) => str(s, 300)),
    injection: str(item.injection, 300),
    verification: { checked, downgraded, dropped },
  }
}

export function section(r) {
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
  return [
    `### 🧾 Listing check${r.product ? ` — ${esc(r.product)}` : ""}`,
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
    r.related?.length
      ? `**Other requests mentioning this site:** ${r.related.map((x) => `#${Number(x.number)} (${x.kind === "pr" ? "PR, " : ""}${esc(x.state)})`).join(", ")}`
      : "",
    r.facts.length || age.length
      ? `<details><summary>Facts found (${age.length + r.facts.length})</summary>\n\n${[...age.map((a) => `- ${a}`), ...r.facts.map((f) => `- ${esc(f.fact)}${f.quote ? ` — ${quote(f)}` : ""} (${src(f)})`)].join("\n")}\n\n</details>`
      : "",
  ]
    .filter(Boolean)
    .join("\n\n")
}

const blockingOf = (r) => r?.blocking ?? blockers(r)

// A blocker stays until its criterion passes, so an unreachable source never reads as resolved.
export function blockers(r, prev) {
  const now = (r?.criteria || [])
    .filter((c) => c.weight === "must" && c.status === "fail")
    .map((c) => c.criterion)
  if (!prev) return now
  const status = new Map(
    (r?.criteria || []).map((c) => [squash(c.criterion), c.status])
  )
  const kept = blockingOf(prev).filter(
    (b) =>
      !now.some((x) => squash(x) === squash(b)) &&
      status.get(squash(b)) !== "pass"
  )
  return [...now, ...kept]
}

const mention = (login) =>
  /^[A-Za-z0-9-]{1,39}$/.test(String(login)) ? `@${login}` : "Hi"

const blockingList = (b) => b.map((x) => `- ${esc(x)}`).join("\n")

// A first check: the full section, addressed to the author.
export function researchComment(r, { author, isPr }) {
  const b = blockingOf(r)
  return [
    `${mention(author)} thanks for the suggestion. Here's what we could check against the listing policy so far.`,
    section(r),
    b.length
      ? `**Blocking:** these contradict a required criterion and need to change before a maintainer can decide:\n${blockingList(b)}`
      : "",
    `**What happens next:** a maintainer makes the listing decision. Reply here with answers or sources for the open points and this check will be updated.${isPr ? "" : " Please wait for a maintainer's go-ahead before opening a pull request."}`,
  ]
    .filter(Boolean)
    .join("\n\n")
}

// A reply to the author: only what changed since the previous check, the full check folded away.
export function followupComment(r, prev, { author, followups }) {
  const icon = { pass: "✅", fail: "❌", unknown: "❔" }
  const before = new Map(
    (prev?.criteria || []).map((c) => [squash(c.criterion), c.status])
  )
  const changed = r.criteria.filter(
    (c) =>
      c.status !== "unknown" && before.get(squash(c.criterion)) !== c.status
  )
  const open = r.criteria.filter((c) => c.status === "unknown")
  const asked = new Set((prev?.askAuthor || []).map(squash))
  const questions = r.askAuthor.filter((q) => !asked.has(squash(q)))
  const was = blockingOf(prev)
  const now = blockers(r, prev)
  const last = followups + 1 >= MAX_FOLLOWUPS
  return [
    `${mention(author)} thanks for the reply.${changed.length ? " Here's what changed:" : " It didn't change any criterion yet."}`,
    changed
      .map(
        (c) =>
          `- ${icon[c.status]} ${esc(c.criterion)}${c.quote ? ` — “${esc(c.quote)}”` : ""}${c.url ? ` (${esc(c.source === "repo" ? c.url : new URL(c.url).hostname)})` : ""}`
      )
      .join("\n"),
    open.length
      ? `**Still open:** ${open.map((c) => esc(c.criterion)).join(" · ")}`
      : "",
    questions.length
      ? `**Questions:**\n${questions.map((q) => `- ${esc(q)}`).join("\n")}`
      : "",
    now.length
      ? `**Still blocking:**\n${blockingList(now)}`
      : was.length
        ? "**The blocking points are resolved.**"
        : "",
    last
      ? "That's as far as this automated check goes; a maintainer will take it from here."
      : "",
    `<details><summary>Full listing check</summary>\n\n${section(r)}\n\n</details>`,
  ]
    .filter(Boolean)
    .join("\n\n")
}

export const dataLine = (r) =>
  `<!-- ethorg-listing: ${JSON.stringify(r).replace(/</g, "\\u003c").replace(/>/g, "\\u003e")} -->`

const tryWrite = (...a) => {
  try {
    ghWrite(...a)
  } catch (e) {
    console.log(
      `::warning::${a[0]} ${a[1]}: ${String(e.message).slice(0, 200)}`
    )
  }
}

// Blockers are must-criteria verified as failing. Signals change only when the blockers do, so a maintainer's dismissal or label removal sticks.
function signal(n, isPr, record, prev) {
  const was = blockingOf(prev)
  const b = blockers(record, prev)
  record.blocking = b
  const added = b.some((x) => !was.some((w) => squash(w) === squash(x)))
  const cleared = !b.length && was.length > 0
  const labels = `repos/${REPO}/issues/${n}/labels`
  const unlabel = (l) =>
    tryWrite("DELETE", `${labels}/${encodeURIComponent(l)}`)
  if (added) {
    tryWrite("POST", labels, { labels: [AWAITING] })
    if (!isPr) unlabel(PRODUCT_REVIEW)
  } else if (cleared) {
    unlabel(AWAITING)
    if (!isPr) tryWrite("POST", labels, { labels: [PRODUCT_REVIEW] })
  } else if (!prev && !isPr)
    tryWrite("POST", labels, { labels: [PRODUCT_REVIEW] })
  if (!isPr || !(added || cleared)) return record
  const mine = ghList(`repos/${REPO}/pulls/${n}/reviews?per_page=100`).filter(
    (v) => v.user?.login === BOT && v.state === "CHANGES_REQUESTED"
  )
  if (added && !mine.length)
    tryWrite("POST", `repos/${REPO}/pulls/${n}/reviews`, {
      event: "REQUEST_CHANGES",
      body: `The listing check found required criteria this product doesn't meet:\n${blockingList(b)}\n\nThe evidence is in the listing check comment.`,
    })
  if (cleared)
    for (const v of mine)
      tryWrite("PUT", `repos/${REPO}/pulls/${n}/reviews/${v.id}/dismissals`, {
        message: "The listing check's blocking points are resolved.",
        event: "DISMISS",
      })
  return record
}

async function submit(n, item) {
  const i = ghJson(`repos/${REPO}/issues/${n}`)
  if (i.state !== "open")
    return console.log(`#${n} closed before the check finished`)
  const isPr = !!i.pull_request
  const cs = itemComments(n)
  const prior = latest(cs)
  const replied =
    prior.record &&
    cs.some((c) => c.user?.login === i.user.login && c.created_at > prior.at)
  if (replied && prior.followups >= MAX_FOLLOWUPS)
    return console.log(`#${n} reached ${MAX_FOLLOWUPS} follow-ups`)
  const r = await check({ ...item, pr: isPr ? n : "", issue: isPr ? "" : n })
  r.domains = productSites(item)
  r.siteAge = await pool(r.domains, 3, domainAge)
  r.related = related(r.domains, n)
  r.kind = replied ? "followup" : "research"
  r.blocking = blockers(r, prior.record)
  const ctx = { author: i.user.login, isPr, followups: prior.followups }
  let text =
    r.kind === "followup"
      ? followupComment(r, prior.record, ctx)
      : researchComment(r, ctx)
  // GitHub rejects comments over 65,536 characters.
  if (text.length + dataLine(r).length > 65000)
    text = text.replace(
      section(r),
      "_The full check is too long to show; the data is kept below._"
    )
  ghWrite("POST", `repos/${REPO}/issues/${n}/comments`, {
    body: `${text}\n\n${dataLine(r)}`,
  })
  console.log(`Posted listing ${r.kind} on #${n}`)
  signal(n, isPr, { ...r }, prior.record)
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2)
  const stdin = () => JSON.parse(readFileSync(0, "utf8"))
  if (cmd === "match") await match(args[0])
  else if (cmd === "match-issue")
    process.exit(
      isListingIssue(ghJson(`repos/${REPO}/issues/${args[0]}`), codeowners())
        ? 0
        : 1
    )
  else if (cmd === "match-reply")
    process.exit(
      isListingReply(
        ghJson(`repos/${REPO}/issues/${args[0]}`),
        ghJson(`repos/${REPO}/issues/comments/${args[1]}`),
        itemComments(args[0])
      )
        ? 0
        : 1
    )
  else if (cmd === "prefetch") await prefetch(args[0], args[1])
  else if (cmd === "latest")
    process.stdout.write(JSON.stringify(latest(itemComments(args[0])).record))
  else if (cmd === "signal") {
    const { record, prev } = stdin()
    process.stdout.write(JSON.stringify(signal(args[0], true, record, prev)))
  } else if (cmd === "submit") await submit(num(args[0]), stdin())
  else if (cmd === "check") {
    const item = JSON.parse(readFileSync(0, "utf8"))
    const r = await check(item)
    r.domains = productSites(item)
    r.siteAge = await pool(r.domains, 3, domainAge)
    r.related = related(r.domains, num(item.pr))
    process.stdout.write(JSON.stringify(r))
  } else if (cmd === "section")
    process.stdout.write(section(JSON.parse(readFileSync(0, "utf8"))))
  else throw new Error(`unknown command: ${cmd}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  // Exit 1 means "not a listing" for `match`; any crash exits 2 so callers can tell them apart.
  main().catch((e) => {
    console.error(e)
    process.exit(2)
  })
