import path from "path"
import { pathToFileURL } from "url"

import { expect, test } from "@playwright/test"

type Mod = typeof import("../../.github/scripts/pr-gate.mjs")
let evaluate: Mod["evaluate"],
  prType: Mod["prType"],
  parseReview: Mod["parseReview"],
  bountyOwners: Mod["bountyOwners"],
  changesRequested: Mod["changesRequested"],
  checksProblem: Mod["checksProblem"],
  delayHours: Mod["delayHours"]

test.beforeAll(async () => {
  ;({
    evaluate,
    prType,
    parseReview,
    bountyOwners,
    changesRequested,
    checksProblem,
    delayHours,
  } = await import(
    pathToFileURL(path.resolve(__dirname, "../../.github/scripts/pr-gate.mjs"))
      .href
  ))
})

const SHA = "a".repeat(40)
const pr = (o: Record<string, unknown> = {}) => ({
  author: "konopkja",
  isBot: false,
  title: "Fix a link",
  base: "dev",
  head: "fix-link",
  sameRepo: true,
  sha: SHA,
  draft: false,
  state: "open",
  files: ["public/content/staking/index.md"],
  additions: 1,
  deletions: 1,
  ...o,
})
const review = (o: Record<string, unknown> = {}) => ({
  sha: SHA,
  risk: "R0",
  lanes: ["content"],
  base: "needed",
  counts: { blocking: 0, should_fix: 0, nit: 2 },
  unreviewed: [],
  ...o,
})
const ctx = (o: Record<string, unknown> = {}) => ({
  authors: { team: ["konopkja", "pettinarip"], ef: ["minimalsm"] },
  bountyOwners: ["0xmushow"],
  review: review(),
  ...o,
})

test("prType matches the Maintenance Desk buckets", () => {
  const t = (o: Record<string, unknown>) =>
    prType({ ...pr(), tier: "team", ...o } as Parameters<typeof prType>[0])
  expect(t({})).toBe("content-fix")
  expect(t({ additions: 40 })).toBe("content-edit")
  expect(
    t({ files: ["src/components/Foo.tsx"], additions: 60, deletions: 0 })
  ).toBe("code-small")
  expect(
    t({ files: ["src/components/Foo.tsx"], additions: 61, deletions: 0 })
  ).toBe("code-feature")
  expect(t({ files: ["src/data/chains.ts"], additions: 900 })).toBe("data")
  expect(t({ files: ["src/data/execution-bounty-hunters.json"] })).toBe(
    "bounty"
  )
  expect(t({ files: [".github/workflows/ci.yml"] })).toBe("tooling")
  expect(t({ files: ["public/images/a.png"] })).toBe("tooling")
  expect(t({ base: "staging" })).toBe("release")
  expect(t({ author: "ethorg-agent-code", head: "recovery/fix-1" })).toBe(
    "recovery"
  )
  expect(
    t({
      author: "github-actions",
      head: "automated-update-20261120",
      tier: "bot",
    })
  ).toBe("botsync")
  expect(t({ aiLanes: ["listing"] })).toBe("listing")
})

test("lane C: small, clean PRs from trusted authors", () => {
  expect(evaluate(pr(), ctx()).lane).toBe("team")
  expect(evaluate(pr({ author: "minimalsm" }), ctx()).lane).toBe("team")
  expect(evaluate(pr({ author: "KonopkJA" }), ctx()).lane).toBe("team")
  const code = {
    files: ["src/components/Foo.tsx"],
    additions: 50,
    deletions: 10,
  }
  expect(evaluate(pr(code), ctx()).lane).toBe("team")
  const data = { files: ["src/data/networks/networks.ts"], additions: 2000 }
  expect(evaluate(pr(data), ctx()).lane).toBe("team")
})

test("lane C refuses everything else", () => {
  const no = (p: Record<string, unknown>, c: Record<string, unknown> = {}) => {
    const r = evaluate(pr(p), ctx(c))
    expect(r.lane, r.reason).toBeNull()
    return r.reason
  }
  expect(no({ author: "stranger" })).toContain("trusted list")
  expect(no({ author: "minimalsm", files: ["src/data/chains.ts"] })).toBe(
    "data is for team only"
  )
  expect(no({ additions: 40 })).toContain("content-edit")
  expect(no({ files: ["src/components/Foo.tsx"], additions: 61 })).toContain(
    "code-feature"
  )
  expect(no({ files: ["public/_redirects"] })).toContain("public/_redirects")
  expect(no({ files: ["redirects.config.js"] })).toBeTruthy()
  expect(
    no({ files: ["netlify/edge-functions/matomo-ai-tracker/index.ts"] })
  ).toContain("netlify/edge-functions")
  expect(no({}, { review: null })).toBe("no AI review")
  expect(no({}, { review: review({ sha: "b".repeat(40) }) })).toContain(
    "newest commit"
  )
  expect(no({}, { review: review({ risk: "R2" }) })).toContain("R2")
  expect(
    no(
      {},
      { review: review({ counts: { blocking: 0, should_fix: 1, nit: 0 } }) }
    )
  ).toContain("should-fix")
  expect(no({}, { review: review({ base: "already-done" }) })).toContain(
    "already-done"
  )
  expect(no({}, { review: review({ unreviewed: ["a.md"] }) })).toContain(
    "skipped"
  )
  expect(
    no({ files: ["src/data/chains.ts", "src/scripts/intl-pipeline/main.ts"] })
  ).toContain("src/scripts/intl-pipeline/main.ts")
  expect(
    no({
      author: "minimalsm",
      files: ["src/data/chains.ts", "src/components/Foo.tsx"],
      additions: 5,
    })
  ).toContain("src/data/chains.ts")
  expect(
    no({
      files: ["src/components/Foo.tsx", "src/intl/en/common.json"],
      additions: 5,
    })
  ).toContain("src/intl/en/common.json")
  expect(no({}, { review: review({ counts: undefined }) })).toContain(
    "should-fix"
  )
  expect(no({}, { review: review({ base: undefined }) })).toContain("base")
  expect(no({}, { review: review({ unreviewed: undefined }) })).toContain(
    "skipped"
  )
  expect(no({ draft: true })).toContain("ready")
  expect(no({ base: "staging" })).toContain("dev")
})

test("lane A: only our sync jobs, only their own files", () => {
  const sync = (o: Record<string, unknown>) =>
    evaluate(
      pr({ author: "github-actions", isBot: true, ...o }),
      ctx({ review: null })
    )
  expect(
    sync({
      head: "automated-update-20261120162000",
      files: ["src/data/chains.ts"],
    }).lane
  ).toBe("sync")
  expect(
    sync({
      head: "automated/sync-upgrades",
      files: ["src/data/upgrades/generated.ts"],
    }).lane
  ).toBe("sync")
  expect(
    sync({
      head: "i18n/external-descriptions-20261116021835",
      files: ["src/intl/en/page-app-descriptions.json"],
    }).lane
  ).toBe("sync")
  expect(
    sync({
      head: "automated-update-20261120162000",
      files: ["src/data/chains.ts", "package.json"],
    }).lane
  ).toBeNull()
  expect(
    sync({
      head: "automated-update-20261120162000",
      files: ["src/data/chains.ts"],
      sameRepo: false,
    }).lane
  ).toBeNull()
  expect(
    sync({ head: "fix/something", files: ["src/data/chains.ts"] }).lane
  ).toBeNull()
  expect(
    evaluate(
      pr({
        author: "ethorg-agent-code",
        isBot: true,
        head: "automated-update-20261120162000",
        files: ["src/data/chains.ts"],
      }),
      ctx({ review: null })
    ).type
  ).toBe("recovery")
  const ac = (files: string[]) =>
    evaluate(
      pr({
        author: "allcontributors",
        isBot: true,
        head: "all-contributors/add-x",
        files,
      }),
      ctx({ review: null })
    ).lane
  expect(ac(["README.md", ".all-contributorsrc"])).toBe("sync")
  expect(ac(["README.md", "src/data/chains.ts"])).toBeNull()
  expect(
    evaluate(
      pr({ author: "dependabot", isBot: true, files: ["package.json"] }),
      ctx()
    ).lane
  ).toBeNull()
})

test("lane B: bounty files from a bounty code owner", () => {
  const files = ["src/data/execution-bounty-hunters.json"]
  expect(
    evaluate(pr({ author: "0xMushow", files }), ctx({ review: null })).lane
  ).toBe("bounty")
  expect(
    evaluate(pr({ author: "konopkja", files }), ctx({ review: null })).lane
  ).toBeNull()
})

test("helpers", () => {
  const marker = (j: object) =>
    `## 🔎 First-pass review\n\n<!-- ethorg-review: ${JSON.stringify(j)} -->`
  expect(
    parseReview(["no marker", marker({ risk: "R0" }), marker({ risk: "R1" })])
      ?.risk
  ).toBe("R1")
  expect(parseReview(["<!-- ethorg-review: {broken -->"])).toBeNull()
  expect(
    bountyOwners("* @a\n/src/data/*-bounty-hunters.json @Fred @0xMushow\n")
  ).toEqual(["fred", "0xmushow"])
  expect(
    bountyOwners("/src/data/*-bounty-hunters.json\t@Fred  @0xMushow\n")
  ).toEqual(["fred", "0xmushow"])
  expect(() => bountyOwners("* @a\n")).toThrow("No owners")
  const r = (login: string, state: string) => ({ user: { login }, state })
  expect(
    changesRequested([r("a", "CHANGES_REQUESTED"), r("a", "COMMENTED")])
  ).toBe(true)
  expect(
    changesRequested([r("a", "CHANGES_REQUESTED"), r("a", "APPROVED")])
  ).toBe(false)
  expect(
    changesRequested([r("a", "CHANGES_REQUESTED"), r("a", "DISMISSED")])
  ).toBe(false)
  const c = (name: string, bucket: string) => ({ name, bucket })
  const preview = c("netlify/ethereumorg/deploy-preview", "pass")
  expect(
    checksProblem([preview, c("Lint", "pass"), c("E2E", "skipping")])
  ).toBe("")
  expect(checksProblem([preview, c("Lint", "fail")])).toBe("Lint is fail")
  expect(checksProblem([preview, c("Unit tests", "pending")])).toContain(
    "pending"
  )
  expect(checksProblem([c("Lint", "pass")])).toContain("deploy preview")
  expect(delayHours(undefined)).toBe(24)
  expect(delayHours("6")).toBe(6)
  expect(delayHours("24h")).toBe(24)
  expect(delayHours("-1")).toBe(24)
})
