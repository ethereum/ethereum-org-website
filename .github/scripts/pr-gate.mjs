#!/usr/bin/env node
// Bot-merge lanes: `approve <pr>` (pr-gate.yml) approves qualifying PRs as ethorg-agent; `sweep` (bot-merge.yml) merges what is due.
// Env: REPO, GH_TOKEN, BOT_MERGE_LANES, BOT_MERGE_AUTHORS ({team, ef}), BOT_MERGE_DELAY_HOURS; sweep also APPROVE_TOKEN, MERGE_TOKEN, DRY_RUN.
import { execFileSync } from "node:child_process"
import { appendFileSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

export const LISTING =
  /^public\/content\/(?!translations\/)(.*\/)?(nodes-as-a-service|data-and-analytics|backend|block-explorers|frameworks|grants|get-involved|security|staking-products|wallets|bridges|dapps|tools)\/index\.md$|^src\/data\/(wallets|exchanges|apps|dapps|developer|community|layer-2|networks|externalTutorials)|^public\/images\/(wallets|exchanges|dapps|apps|developers|layer-2)/
export const BOUNTY_FILES = [
  "src/data/consensus-bounty-hunters.json",
  "src/data/execution-bounty-hunters.json",
]
const AUTOMATION = new Set([
  "ethorg-agent",
  "ethorg-agent-code",
  "dependabot",
  "github-actions",
  "renovate",
  "crowdin-bot",
])
const ASSET = /^public\/(?!content\/).*\.(png|jpe?g|gif|svg|webp|avif|ico)$/i
export const PREVIEW_CHECK = "netlify/ethereumorg/deploy-preview"

// Lane A: each sync job may only change its own data.
export const SYNCS = [
  {
    author: "github-actions",
    head: /^automated-update-\d+$/,
    files: /^src\/data\/chains\.ts$/,
  },
  {
    author: "github-actions",
    head: /^automated\/sync-upgrades$/,
    files: /^src\/data\/upgrades\//,
  },
  {
    author: "github-actions",
    head: /^i18n\/external-descriptions-\d+$/,
    files: /^src\/intl\/en\/page-(app|developers-tools)-descriptions\.json$/,
  },
  {
    author: "allcontributors",
    head: /^all-contributors\//,
    files: /^(README\.md|\.all-contributorsrc)$/,
  },
]
// Lane C: PR type → who may send it, and which file lanes every changed file must fall in.
export const TEAM_TYPES = {
  "code-small": { tiers: ["team", "ef"], lanes: ["code"] },
  "content-fix": { tiers: ["team", "ef"], lanes: ["content", "translation"] },
  data: { tiers: ["team"], lanes: ["data"] },
}
// Never bot-merged in lane C whatever the type: root files, dot-folders and non-content public files (redirects, headers).
const DENY = /^[^/]+$|^\.|^public\/(?!content\/|images\/)/

export function laneOfPath(f) {
  if (/^public\/content\/translations\/|^src\/intl\/(?!en\/)/.test(f))
    return "translation"
  if (/^public\/content\/|^src\/intl\/en\//.test(f)) return "content"
  if (/^src\/data\//.test(f)) return "data"
  if (/(^|\/)(package\.json|pnpm-lock\.yaml)$/.test(f)) return "deps"
  if (/^docs\/|README|CONTRIBUTING|\.md$/.test(f)) return "docs"
  if (/^\.github\/|^src\/scripts\/|^\.|config\.(ts|js|mjs)$/.test(f))
    return "tooling"
  return "code"
}

export function tierOf(login, isBot, authors) {
  if (isBot || AUTOMATION.has(login)) return "bot"
  if (authors.team?.includes(login)) return "team"
  if (authors.ef?.includes(login)) return "ef"
  return "other"
}

const isListingReq = (x) =>
  x.tier !== "team" &&
  /\b(add|list)\b/i.test(x.title) &&
  x.files.length > 0 &&
  x.files.filter((f) => LISTING.test(f)).length * 2 >= x.files.length

// Same buckets as the Maintenance Desk. x: { title, base, author, tier, files, additions, deletions, aiLanes? }
export function prType(x) {
  if (/^deploy v/i.test(x.title) || ["master", "staging"].includes(x.base))
    return "release"
  if (x.author === "ethorg-agent-code") return "recovery"
  if (/dependabot|renovate/.test(x.author)) return "deps"
  if (x.tier === "bot") return "botsync"
  if (/\bintl[ -]import\b|translation import/i.test(x.title)) return "intl"
  if (x.files.length && x.files.every((f) => BOUNTY_FILES.includes(f)))
    return "bounty"
  if (x.aiLanes?.includes("listing") || isListingReq(x)) return "listing"
  // Images ride along with whatever else the PR changes.
  const L = new Set(x.files.filter((f) => !ASSET.test(f)).map(laneOfPath))
  if (L.size > 1) L.delete("deps")
  const size = x.additions + x.deletions
  if (!L.size) return "tooling"
  if (L.has("code")) return size <= 60 ? "code-small" : "code-feature"
  if (L.has("data")) return "data"
  if ([...L].every((l) => l === "content" || l === "translation"))
    return size <= 30 ? "content-fix" : "content-edit"
  return "tooling"
}

// pr: { author, isBot, title, base, head, sameRepo, sha, draft, state, files, additions, deletions }
// ctx: { authors: {team, ef}, bountyOwners: [lowercase logins], review: ethorg-review marker or null }
export function evaluate(pr, ctx) {
  const tier = tierOf(pr.author, pr.isBot, ctx.authors)
  const type = prType({ ...pr, tier, aiLanes: ctx.review?.lanes })
  const res = (lane, reason = "") => ({ lane, type, tier, reason })
  if (pr.state !== "open" || pr.draft) return res(null, "not an open, ready PR")
  if (pr.base !== "dev") return res(null, "base is not dev")
  if (!pr.files.length) return res(null, "no changed files")

  if (type === "botsync") {
    const job = SYNCS.find(
      (s) => s.author === pr.author && s.head.test(pr.head)
    )
    if (!job || !pr.sameRepo) return res(null, "not one of our sync jobs")
    const stray = pr.files.find((f) => !job.files.test(f))
    return stray ? res(null, `sync changes ${stray}`) : res("sync")
  }
  if (type === "bounty") {
    return ctx.bountyOwners.includes(pr.author.toLowerCase())
      ? res("bounty")
      : res(null, "author is not a bounty code owner")
  }

  const rule = TEAM_TYPES[type]
  if (!rule) return res(null, `${type} PRs are never bot-merged`)
  if (!rule.tiers.includes(tier))
    return res(
      null,
      tier === "other"
        ? "author is not on the trusted list"
        : `${type} is for ${rule.tiers.join(" and ")} only`
    )
  const denied = pr.files.find((f) => DENY.test(f))
  if (denied) return res(null, `touches ${denied}`)
  const stray = pr.files.find(
    (f) => !ASSET.test(f) && !rule.lanes.includes(laneOfPath(f))
  )
  if (stray) return res(null, `${stray} is outside a ${type} change`)
  const r = ctx.review
  if (!r) return res(null, "no AI review")
  if (r.sha !== pr.sha)
    return res(null, "AI review is not of the newest commit")
  if (!["R0", "R1"].includes(r.risk)) return res(null, `AI risk ${r.risk}`)
  if (r.counts?.blocking !== 0 || r.counts?.should_fix !== 0)
    return res(null, "AI review has blocking or should-fix findings")
  if (r.base !== "needed") return res(null, `base branch is ${r.base}`)
  if (!Array.isArray(r.unreviewed) || r.unreviewed.length)
    return res(null, "AI review skipped files")
  return res("team")
}

export function parseReview(bodies) {
  for (const body of [...bodies].reverse()) {
    const m = body?.match(/<!-- ethorg-review: (.*) -->/)
    if (!m) continue
    try {
      return JSON.parse(m[1])
    } catch {
      return null
    }
  }
  return null
}

export function bountyOwners(codeowners) {
  const line = codeowners
    .split("\n")
    .find((l) => l.startsWith("/src/data/*-bounty-hunters.json "))
  return (line?.split(/\s+/).slice(1) ?? [])
    .filter((o) => o.startsWith("@"))
    .map((o) => o.slice(1).toLowerCase())
}

// A reviewer's latest decisive review counts; comments don't change it.
export function changesRequested(reviews) {
  const last = new Map()
  for (const r of reviews)
    if (r.state !== "COMMENTED" && r.state !== "PENDING")
      last.set(r.user.login, r.state)
  return [...last.values()].includes("CHANGES_REQUESTED")
}

// Every check must have finished without failing, and the deploy preview (a full build) must have passed.
export function checksProblem(checks) {
  const bad = checks.find((c) =>
    ["fail", "pending", "cancel"].includes(c.bucket)
  )
  if (bad) return `${bad.name} is ${bad.bucket}`
  if (!checks.some((c) => c.name === PREVIEW_CHECK && c.bucket === "pass"))
    return "deploy preview has not passed"
  return ""
}

export function delayHours(raw) {
  const d = Number(raw || 24)
  return Number.isFinite(d) && d >= 0 ? d : 24
}

// ---------- GitHub I/O ----------
const BOT = "ethorg-agent[bot]"
const MARK = "<!-- pr-gate -->"
const DELAY = delayHours(process.env.BOT_MERGE_DELAY_HOURS)

const gh = (args, env = {}) =>
  execFileSync("gh", args, {
    encoding: "utf8",
    maxBuffer: 64 << 20,
    env: { ...process.env, ...env },
  })
const api = (p) => JSON.parse(gh(["api", p]))
const list = (p) => JSON.parse(gh(["api", "--paginate", "--slurp", p])).flat()
const write = (args) =>
  gh(["api", ...args], {
    GH_TOKEN: process.env.APPROVE_TOKEN || process.env.GH_TOKEN,
  })
const log = (line) => {
  console.log(line)
  if (process.env.GITHUB_STEP_SUMMARY)
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `- ${line}\n`)
}

function context(repo, n) {
  const p = api(`repos/${repo}/pulls/${n}`)
  const pr = {
    number: n,
    author: p.user.login.replace(/\[bot\]$/, ""),
    isBot: p.user.type === "Bot",
    title: p.title,
    base: p.base.ref,
    head: p.head.ref,
    sameRepo: p.head.repo?.full_name === repo,
    sha: p.head.sha,
    draft: p.draft,
    state: p.state,
    mergeable: p.mergeable,
    additions: p.additions,
    deletions: p.deletions,
    files: list(`repos/${repo}/pulls/${n}/files?per_page=100`).flatMap((f) =>
      [f.filename, f.previous_filename].filter(Boolean)
    ),
  }
  const comments = list(
    `repos/${repo}/issues/${n}/comments?per_page=100`
  ).filter((c) => c.user.login === BOT)
  let authors = { team: [], ef: [] }
  try {
    authors = JSON.parse(process.env.BOT_MERGE_AUTHORS || "{}")
  } catch {
    console.log(
      "::warning::BOT_MERGE_AUTHORS is not valid JSON; no trusted authors"
    )
  }
  const here = path.dirname(fileURLToPath(import.meta.url))
  const ctx = {
    authors,
    bountyOwners: bountyOwners(
      readFileSync(path.join(here, "../CODEOWNERS"), "utf8")
    ),
    review: parseReview(comments.map((c) => c.body)),
  }
  return { pr, ctx, result: evaluate(pr, ctx) }
}

const lanesOn = () =>
  new Set(
    (process.env.BOT_MERGE_LANES || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  )
// bounty-entry.yml approves bounty PRs; these lanes are approved here.
const GATED = new Set(["sync", "team"])
const isGateApproval = (r) =>
  r.user.login === BOT && r.state === "APPROVED" && r.body?.startsWith(MARK)

function postApproval(repo, n, sha) {
  write([
    "-X",
    "POST",
    `repos/${repo}/pulls/${n}/reviews`,
    "-f",
    `commit_id=${sha}`,
    "-f",
    "event=APPROVE",
    "-f",
    `body=${MARK}\nApproved for an automatic merge after a ${DELAY}-hour waiting period. Request changes to stop it.`,
  ])
  log(`#${n} approved ${sha.slice(0, 7)}`)
}

function approve(repo, n) {
  const { pr, result } = context(repo, n)
  const on = !!result.lane && lanesOn().has(result.lane)
  const gated = on && GATED.has(result.lane)
  const mine = list(`repos/${repo}/pulls/${n}/reviews?per_page=100`).filter(
    isGateApproval
  )
  log(
    `#${n} ${result.type}: ${result.lane ? `lane ${result.lane}${on ? "" : " (off)"}` : result.reason}`
  )
  for (const r of mine.filter((r) => !gated || r.commit_id !== pr.sha)) {
    write([
      "-X",
      "PUT",
      `repos/${repo}/pulls/${n}/reviews/${r.id}/dismissals`,
      "-f",
      "event=DISMISS",
      "-f",
      `message=${gated ? "A newer commit needs its own approval." : `No longer qualifies for an automatic merge: ${result.reason || "lane is off"}.`}`,
    ])
  }
  if (gated && !mine.some((r) => r.commit_id === pr.sha))
    postApproval(repo, n, pr.sha)
}

function sweep(repo) {
  let failed = false
  for (const p of list(
    `repos/${repo}/pulls?state=open&base=dev&per_page=100`
  )) {
    if (p.draft) continue
    try {
      sweepOne(repo, p)
    } catch (e) {
      failed = true
      log(
        `#${p.number} error: ${
          String(e.stderr || e.message)
            .trim()
            .split("\n")[0]
        }`
      )
    }
  }
  if (failed) process.exitCode = 1
}

function sweepOne(repo, p) {
  const n = p.number
  const reviews = list(`repos/${repo}/pulls/${n}/reviews?per_page=100`)
  const onHead = reviews.filter(
    (r) =>
      r.user.login === BOT &&
      r.state === "APPROVED" &&
      r.commit_id === p.head.sha
  )
  // Sync PRs opened with GITHUB_TOKEN never trigger pr-gate.yml, so the sweep approves them.
  const syncPr = p.user.login === "github-actions[bot]"
  if (!onHead.length && !syncPr) return
  const { pr, result } = context(repo, n)
  if (pr.sha !== p.head.sha) return
  if (!result.lane) return log(`#${n} skip: ${result.reason}`)
  if (!lanesOn().has(result.lane))
    return log(`#${n} skip: lane ${result.lane} is off`)
  const approvals = GATED.has(result.lane)
    ? onHead.filter(isGateApproval)
    : onHead
  if (!approvals.length) {
    if (result.lane === "sync") postApproval(repo, n, pr.sha)
    return
  }
  const approvedAt = Math.min(
    ...approvals.map((r) => Date.parse(r.submitted_at))
  )
  const left = DELAY - (Date.now() - approvedAt) / 36e5
  if (left > 0) return log(`#${n} merges in ${Math.ceil(left)}h`)
  if (changesRequested(reviews)) return log(`#${n} skip: changes requested`)
  if (pr.mergeable !== true)
    return log(`#${n} skip: not mergeable (${pr.mergeable})`)
  let out
  try {
    out = gh(["pr", "checks", String(n), "-R", repo, "--json", "name,bucket"])
  } catch (e) {
    // gh exits non-zero while checks fail or run, but still prints them.
    out = e.stdout
  }
  const problem = checksProblem(JSON.parse(out || "[]"))
  if (problem) return log(`#${n} skip: ${problem}`)
  if (process.env.DRY_RUN !== "false")
    return log(`#${n} would merge ${pr.sha.slice(0, 7)} (dry run)`)
  gh(
    [
      "pr",
      "merge",
      String(n),
      "--merge",
      "--match-head-commit",
      pr.sha,
      "-R",
      repo,
    ],
    { GH_TOKEN: process.env.MERGE_TOKEN }
  )
  log(`#${n} merged ${pr.sha.slice(0, 7)} (lane ${result.lane})`)
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const [cmd, n] = process.argv.slice(2)
  const repo = process.env.REPO
  if (cmd === "approve" && /^\d+$/.test(n ?? "")) approve(repo, Number(n))
  else if (cmd === "sweep") sweep(repo)
  else {
    console.error("usage: pr-gate.mjs approve <pr> | sweep")
    process.exit(2)
  }
}
