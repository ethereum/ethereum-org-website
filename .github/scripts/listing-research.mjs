// Listing research for third-party listing PRs (see .github/workflows/listing-research.md).
//   match <pr>              exit 0 if <pr> is an outside contributor's listing request (needs GH_TOKEN, REPO)
//   prefetch <pr> <dir>     save the PR, the pages it links and domain-age evidence as plain text for the agent
//   submit <item.json>      validate one agent result, re-check its quotes, print the comment body
// Every fetched page is attacker-controlled: it is only ever saved or searched as text, never executed.
import { execFileSync } from "node:child_process"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"

const REPO = process.env.REPO || "ethereum/ethereum-org-website"
const TEAM = ["OWNER", "MEMBER", "COLLABORATOR"]
const TITLE = /\b(add|adding|added|list|listing|include)\b/i
export const LISTING =
  /^public\/content\/(?!translations\/)(.*\/)?(nodes-as-a-service|data-and-analytics|backend|block-explorers|frameworks|grants|get-involved|security|staking-products|wallets|bridges|dapps|tools|ides|programming-languages|storage|oracles|jobs|community|resources|desci)(\/.*)?\/index\.md$|^src\/data\/(wallets|exchanges|apps|dapps|developer|community|layer-2|networks|externalTutorials|staking|grants|jobs)/
const MAX_PAGES = 10

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
    const x = new URL(/^https?:\/\//i.test(u) ? u : `https://${u}`)
    if (!/^https?:$/.test(x.protocol) || x.username || x.password) return null
    const h = x.hostname
    if (
      /^(localhost|.*\.local|.*\.internal|metadata\..*)$/i.test(h) ||
      h.startsWith("[")
    )
      return null
    if (
      /^\d+\.\d+\.\d+\.\d+$/.test(h) &&
      /^(10\.|127\.|0\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(
        h
      )
    )
      return null
    return x.href
  } catch {
    return null
  }
}

export const toText = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;|&#34;|[“”]/g, '"')
    .replace(/&#39;|&apos;|[‘’]/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\s+/g, " ")
    .trim()

async function fetchText(url, max = 3_000_000) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(20000),
      redirect: "follow",
      headers: { "user-agent": "ethereum-org-listing-research" },
    })
    if (!res.ok) return { status: res.status, text: null }
    return {
      status: res.status,
      text: toText((await res.text()).slice(0, max)),
    }
  } catch (e) {
    return {
      status: 0,
      text: null,
      error: String(e.message || e).slice(0, 120),
    }
  }
}

async function match(pr) {
  const p = ghJson(`repos/${REPO}/pulls/${pr}`)
  if (
    p.draft ||
    p.user.type === "Bot" ||
    TEAM.includes(p.author_association) ||
    !TITLE.test(p.title)
  )
    process.exit(1)
  const files = ghJson(`repos/${REPO}/pulls/${pr}/files?per_page=100`).map(
    (f) => f.filename
  )
  process.exit(files.some((f) => LISTING.test(f)) ? 0 : 1)
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
      },
      null,
      2
    )
  )
  writeFileSync(`${dir}/diff.patch`, diff)

  const urls = [
    ...new Set(
      `${p.body || ""}\n${added}`.match(/https?:\/\/[^\s<>()"'`\]]+/g) || []
    ),
  ]
    .map((u) => publicUrl(u.replace(/[.,;:!?]+$/, "")))
    .filter(Boolean)
    .filter(
      (u) =>
        !/^https:\/\/(github\.com\/ethereum\/ethereum-org-website|ethereum\.org)\b/.test(
          u
        )
    )
    .slice(0, MAX_PAGES)
  const pages = []
  for (const [i, url] of urls.entries()) {
    const { status, text, error } = await fetchText(url)
    const file = `pages/${String(i + 1).padStart(2, "0")}.txt`
    if (text) writeFileSync(`${dir}/${file}`, text.slice(0, 40000))
    pages.push({ url, status, file: text ? file : null, error })
  }

  const domains = [
    ...new Set(urls.map((u) => new URL(u).hostname.replace(/^www\./, ""))),
  ].filter(
    (d) =>
      !/(^|\.)(github\.com|githubusercontent\.com|x\.com|twitter\.com|t\.me|discord\.(gg|com)|medium\.com|youtube\.com|linkedin\.com)$/.test(
        d
      )
  )
  const evidence = []
  for (const d of domains) {
    const rdap = await fetch(`https://rdap.org/domain/${d}`, {
      signal: AbortSignal.timeout(15000),
    })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
    const wb = await fetch(
      `https://web.archive.org/cdx/search/cdx?url=${d}&limit=1&output=json`,
      { signal: AbortSignal.timeout(20000) }
    )
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
    evidence.push({
      domain: d,
      registered:
        rdap?.events?.find((e) => e.eventAction === "registration")
          ?.eventDate || null,
      firstArchived: wb?.[1]?.[1]
        ? `${wb[1][1].slice(0, 4)}-${wb[1][1].slice(4, 6)}-${wb[1][1].slice(6, 8)}`
        : null,
    })
  }
  writeFileSync(
    `${dir}/evidence.json`,
    JSON.stringify({ pages, domains: evidence }, null, 2)
  )
  console.log(
    `prefetched ${pages.filter((x) => x.file).length}/${pages.length} pages, ${evidence.length} domains`
  )
}

const STATUS = ["pass", "fail", "unknown"]
const LEANS = ["list", "don't list", "need more info"]
const str = (v, n = 500) =>
  String(v ?? "")
    .slice(0, n)
    .replace(/<!--/g, "&lt;!--")
    .replace(/-->/g, "--&gt;")
const arr = (v, n = 15) => {
  if (typeof v === "string")
    try {
      v = JSON.parse(v)
    } catch {
      v = []
    }
  return (Array.isArray(v) ? v : []).slice(0, n)
}
const say = (s) =>
  String(s).replace(/@/g, "@​").replace(/\|/g, "\\|").replace(/\n+/g, " ")

export async function check(item, fetchPage = fetchText) {
  const cache = new Map()
  const page = (u) => {
    if (!cache.has(u))
      cache.set(
        u,
        fetchPage(u).then((r) => r.text?.toLowerCase() ?? null)
      )
    return cache.get(u)
  }
  let checked = 0,
    downgraded = 0
  const criteria = []
  for (const c of arr(item.criteria, 20)) {
    const x = {
      criterion: str(c.criterion, 200),
      status: STATUS.includes(c.status) ? c.status : "unknown",
      quote: str(c.quote, 300),
      source: ["author", "independent", "repo"].includes(c.source)
        ? c.source
        : "author",
    }
    const url = x.source === "repo" ? null : publicUrl(String(c.url || ""))
    x.url = x.source === "repo" ? str(c.url, 200) : url || ""
    if (x.status === "pass") {
      if (!x.quote) {
        x.status = "unknown"
        x.note = "no quote"
        downgraded++
      } else if (x.source !== "repo" && !url) {
        x.status = "unknown"
        x.note = "no public source"
        downgraded++
      } else if (url && checked < 25) {
        checked++
        const text = await page(url)
        const parts = toText(x.quote)
          .toLowerCase()
          .replace(/^["']|["']$/g, "")
          .split(/…|\.\.\./)
          .map((s) => s.trim())
          .filter(Boolean)
        if (text == null) {
          x.verified = false
          x.note = "source blocks automated checks"
        } else if (parts.every((s) => text.includes(s))) x.verified = true
        else {
          x.status = "unknown"
          x.note = "quote not found at source"
          downgraded++
        }
      }
    }
    criteria.push(x)
  }
  return {
    v: 1,
    pr: Number(String(item.pr).replace(/\D/g, "")),
    sha: str(item.sha, 40),
    product: str(item.product, 120),
    lean: LEANS.includes(item.lean) ? item.lean : "need more info",
    policy: {
      page: str(item.policy_page, 80).replace(/[^a-z0-9/-]/g, ""),
      why: str(item.policy_why, 300),
    },
    bottomLine: str(item.bottom_line, 1200),
    criteria,
    existing: arr(item.existing).map((e) => ({
      path: str(e.path, 200),
      text: str(e.text, 200),
    })),
    compared: str(item.compared, 1000),
    redFlags: arr(item.red_flags).map((s) => str(s, 300)),
    askAuthor: arr(item.ask_author, 6).map((s) => str(s, 300)),
    injection: str(item.injection, 300),
    verification: { checked, downgraded },
  }
}

// Visible: the checklist and what we need from the author. Hidden data line: the internal lean and judgement.
export function render(r, run) {
  const icon = { pass: "✅", fail: "❌", unknown: "❔" }
  const src = (c) =>
    !c.url
      ? ""
      : c.source === "repo"
        ? `\`${say(c.url)}\``
        : `\`${new URL(c.url).hostname}\``
  const rows = r.criteria.map(
    (c) =>
      `| ${icon[c.status]} | ${say(c.criterion)} | ${c.quote ? `“${say(c.quote)}”` : ""}${c.note ? ` _(${c.note})_` : c.verified === false ? " _(not auto-verified)_" : ""} | ${src(c)} ${c.source} |`
  )
  const policy = r.policy.page
    ? `[\`${r.policy.page}\`](https://ethereum.org/contributing/${r.policy.page}/)`
    : "no matching listing policy"
  return [
    `## 🧾 Listing check${r.product ? ` — ${say(r.product)}` : ""}`,
    `Checked against ${policy}. ✅ confirmed with a quoted source, ❌ contradicted, ❔ not shown yet. A maintainer makes the listing decision.`,
    rows.length
      ? `| | Criterion | Evidence | Source |\n|---|---|---|---|\n${rows.join("\n")}`
      : "",
    r.existing.length
      ? `**Already on ethereum.org:** ${r.existing.map((e) => `\`${say(e.path)}\``).join(", ")}`
      : "",
    r.askAuthor.length
      ? `**To move this forward, please add:**\n${r.askAuthor.map((a) => `- ${say(a)}`).join("\n")}`
      : "",
    `<!-- ethorg-listing: ${JSON.stringify({ ...r, run }).replace(/@/g, "@​")} -->`,
  ]
    .filter(Boolean)
    .join("\n\n")
}

const [cmd, ...args] = process.argv.slice(2)
if (cmd === "match") await match(args[0])
else if (cmd === "prefetch") await prefetch(args[0], args[1])
else if (cmd === "submit")
  process.stdout.write(
    render(
      await check(JSON.parse(readFileSync(args[0], "utf8"))),
      process.env.RUN_URL || ""
    )
  )
