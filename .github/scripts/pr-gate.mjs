#!/usr/bin/env node
// Bot approve-and-merge lanes. pr-gate.yml approves, bot-merge.yml merges, and the Maintenance Desk mirrors prType.
//   approve <pr>   approve the head commit as ethorg-agent when a lane matches and is on; otherwise withdraw that approval
//   sweep          merge PRs whose approval is BOT_MERGE_DELAY_HOURS old and still passes (needs MERGE_TOKEN unless DRY_RUN)
// Env: REPO, GH_TOKEN, BOT_MERGE_LANES (comma list), BOT_MERGE_AUTHORS ({"team": [...], "ef": [...]}).
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

// Lane A: each sync job may only change its own data.
export const SYNCS = [
  {
    author: "ethorg-agent-code",
    head: /^automated-update-\d+$/,
    files: /^src\/data\/chains\.ts$/,
  },
  {
    author: "ethorg-agent-code",
    head: /^automated\/sync-upgrades$/,
    files: /^src\/data\/upgrades\//,
  },
  {
    author: "ethorg-agent-code",
    head: /^i18n\/external-descriptions-\d+$/,
    files: /^src\/intl\/en\/page-(app|developers-tools)-descriptions\.json$/,
  },
  {
    author: "allcontributors",
    head: /^all-contributors\//,
    files: /^(README\.md|\.all-contributorsrc)$/,
  },
]
// Lane C: PR type → author tiers.
export const TEAM_TYPES = {
  "code-small": ["team", "ef"],
  "content-fix": ["team", "ef"],
  data: ["team"],
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

// x: { title, base, head, author, tier, files, additions, deletions, aiLanes? }
export function prType(x) {
  if (/^deploy v/i.test(x.title) || ["master", "staging"].includes(x.base))
    return "release"
  if (
    x.author === "ethorg-agent-code" &&
    !SYNCS.some((s) => s.author === x.author && s.head.test(x.head))
  )
    return "recovery"
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

  const tiers = TEAM_TYPES[type]
  if (!tiers) return res(null, `${type} PRs are never bot-merged`)
  if (!tiers.includes(tier))
    return res(
      null,
      tier === "other"
        ? "author is not on the trusted list"
        : `${type} is for ${tiers.join(" and ")} only`
    )
  const denied = pr.files.find((f) => DENY.test(f))
  if (denied) return res(null, `touches ${denied}`)
  const r = ctx.review
  if (!r) return res(null, "no AI review")
  if (r.sha !== pr.sha)
    return res(null, "AI review is not of the newest commit")
  if (!["R0", "R1"].includes(r.risk)) return res(null, `AI risk ${r.risk}`)
  if (r.counts?.blocking || r.counts?.should_fix)
    return res(null, "AI review has blocking or should-fix findings")
  if ((r.base ?? "needed") !== "needed")
    return res(null, `base branch is ${r.base}`)
  if (r.unreviewed?.length) return res(null, "AI review skipped files")
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

// ---------- GitHub I/O ----------
const BOT = "ethorg-agent[bot]"
const MARK = "<!-- pr-gate -->"
const DELAY = Number(process.env.BOT_MERGE_DELAY_HOURS || 24)

const gh = (args, env = {}) =>
  execFileSync("gh", args, {
    encoding: "utf8",
    maxBuffer: 64 << 20,
    env: { ...process.env, ...env },
  })
const api = (p) => JSON.parse(gh(["api", p]))
const list = (p) => JSON.parse(gh(["api", "--paginate", "--slurp", p])).flat()
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

function approve(repo, n) {
  const { pr, result } = context(repo, n)
  const on =
    result.lane === "sync" || result.lane === "team"
      ? lanesOn().has(result.lane)
      : false
  const mine = list(`repos/${repo}/pulls/${n}/reviews?per_page=100`).filter(
    (r) =>
      r.user.login === BOT && r.state === "APPROVED" && r.body?.startsWith(MARK)
  )
  log(
    `#${n} ${result.type}: ${result.lane ? `lane ${result.lane}${on ? "" : " (off)"}` : result.reason}`
  )
  for (const r of mine.filter((r) => !on || r.commit_id !== pr.sha)) {
    gh([
      "api",
      "-X",
      "PUT",
      `repos/${repo}/pulls/${n}/reviews/${r.id}/dismissals`,
      "-f",
      "event=DISMISS",
      "-f",
      `message=${on ? "A newer commit needs its own approval." : `No longer qualifies for an automatic merge: ${result.reason || "lane is off"}.`}`,
    ])
  }
  if (on && !mine.some((r) => r.commit_id === pr.sha)) {
    gh([
      "api",
      "-X",
      "POST",
      `repos/${repo}/pulls/${n}/reviews`,
      "-f",
      `commit_id=${pr.sha}`,
      "-f",
      "event=APPROVE",
      "-f",
      `body=${MARK}\nApproved for an automatic merge after a ${DELAY}-hour waiting period. Request changes to stop it.`,
    ])
    log(`#${n} approved ${pr.sha.slice(0, 7)}`)
  }
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
  const dry = process.env.DRY_RUN !== "false"
  const on = lanesOn()
  const n = p.number
  const reviews = list(`repos/${repo}/pulls/${n}/reviews?per_page=100`)
  const approvedAt = reviews
    .filter(
      (r) =>
        r.user.login === BOT &&
        r.state === "APPROVED" &&
        r.commit_id === p.head.sha
    )
    .map((r) => Date.parse(r.submitted_at))
    .sort()[0]
  if (!approvedAt) return
  const { pr, result } = context(repo, n)
  if (pr.sha !== p.head.sha) return
  if (!result.lane) return log(`#${n} skip: ${result.reason}`)
  if (!on.has(result.lane)) return log(`#${n} skip: lane ${result.lane} is off`)
  const left = DELAY - (Date.now() - approvedAt) / 36e5
  if (left > 0) return log(`#${n} merges in ${Math.ceil(left)}h`)
  if (changesRequested(reviews)) return log(`#${n} skip: changes requested`)
  if (pr.mergeable !== true)
    return log(`#${n} skip: not mergeable (${pr.mergeable})`)
  try {
    gh(["pr", "checks", String(n), "--required", "-R", repo])
  } catch {
    return log(`#${n} skip: required checks are not green`)
  }
  if (dry) return log(`#${n} would merge ${pr.sha.slice(0, 7)} (dry run)`)
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
