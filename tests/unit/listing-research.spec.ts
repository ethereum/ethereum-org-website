import path from "path"
import { pathToFileURL } from "url"

import { expect, test } from "@playwright/test"

type Mod = typeof import("../../.github/scripts/listing-research.mjs")
let blockers: Mod["blockers"],
  check: Mod["check"],
  dataLine: Mod["dataLine"],
  followupComment: Mod["followupComment"],
  isListingIssue: Mod["isListingIssue"],
  isListingReply: Mod["isListingReply"],
  latest: Mod["latest"],
  MAX_FOLLOWUPS: Mod["MAX_FOLLOWUPS"],
  researchComment: Mod["researchComment"],
  esc: Mod["esc"],
  LISTING: Mod["LISTING"],
  publicUrl: Mod["publicUrl"],
  quoteFound: Mod["quoteFound"],
  registrableDomain: Mod["registrableDomain"],
  section: Mod["section"],
  toText: Mod["toText"]

test.beforeAll(async () => {
  ;({
    blockers,
    check,
    dataLine,
    followupComment,
    isListingIssue,
    isListingReply,
    latest,
    MAX_FOLLOWUPS,
    researchComment,
    esc,
    LISTING,
    publicUrl,
    quoteFound,
    registrableDomain,
    section,
    toText,
  } = await import(
    pathToFileURL(
      path.resolve(__dirname, "../../.github/scripts/listing-research.mjs")
    ).href
  ))
})

test("publicUrl rejects private, credentialed and literal-IPv6 hosts", () => {
  expect(publicUrl("tatum.io/pricing")).toBe("https://tatum.io/pricing")
  for (const u of [
    "http://127.0.0.1/",
    "http://10.1.2.3/",
    "http://172.20.0.1/",
    "http://192.168.1.1/",
    "http://169.254.169.254/latest",
    "http://100.64.0.1/",
    "http://100.127.255.255/",
    "http://0x7f000001/",
    "http://[::1]/",
    "https://user:pass@example.com/",
    "http://localhost:3000/",
    "http://metadata.google.internal/",
    "http://localhost./",
    "http://metadata.google.internal./",
    "file:///etc/passwd",
  ])
    expect(publicUrl(u), u).toBeNull()
  expect(publicUrl("http://100.128.0.1/")).not.toBeNull()
})

test("toText decodes numeric and named entities", () => {
  expect(
    toText(
      "<p>We&#8217;re &ldquo;audited&rdquo;&nbsp;&mdash; &#x27;ok&#x27; &lt;3 &amp; more&hellip;</p>"
    )
  ).toBe(`We're "audited" — 'ok' <3 & more…`)
})

test("quoteFound needs long pieces in page order", () => {
  const page = toText(
    "Our smart contracts are not yet audited. We plan an audit by Trail of Bits in 2027."
  )
  expect(quoteFound("Our smart contracts are not yet audited", page)).toBe(true)
  expect(
    quoteFound("Our smart contracts … an audit by Trail of Bits", page)
  ).toBe(true)
  expect(quoteFound("contracts are … audited", page)).toBe(false)
  expect(quoteFound("audited by Trail", page)).toBe(false)
  expect(
    quoteFound("an audit by Trail of Bits … Our smart contracts", page)
  ).toBe(false)
})

test("esc renders untrusted text inert", () => {
  const out = esc(
    "[click](https://evil.example) <img src=x onerror=alert(1)> #123 owner/repo#4 @everyone `x` www.evil.com"
  )
  expect(out).not.toMatch(/\]\(|<img|https:\/\/|www\.|`x`|@everyone|#123|#4/)
  expect(out).toContain("&lt;img")
})

test("LISTING matches listing pages and data files only", () => {
  for (const f of [
    "public/content/developers/docs/nodes-and-clients/nodes-as-a-service/index.md",
    "public/content/developers/docs/smart-contracts/security/index.md",
    "public/content/developers/docs/data-and-analytics/block-explorers/index.md",
    "public/content/staking/saas/index.md",
    "public/content/community/get-involved/index.md",
    "public/content/security/index.md",
    "src/data/wallets/wallet-data.ts",
    "src/data/networks/networks.ts",
    "src/data/staking-products.json",
  ])
    expect(LISTING.test(f), f).toBe(true)
  for (const f of [
    "public/content/roadmap/security/index.md",
    "public/content/translations/es/developers/docs/frameworks/index.md",
    "src/data/developer-docs-links.yaml",
    "src/intl/en/page-bug-bounty.json",
    "public/content/developers/docs/frameworks/index.md.bak",
  ])
    expect(LISTING.test(f), f).toBe(false)
})

test("registrableDomain keeps the site, not the subdomain", () => {
  expect(registrableDomain("docs.tatum.io")).toBe("tatum.io")
  expect(registrableDomain("www.example.co.uk")).toBe("example.co.uk")
  expect(registrableDomain("tatum.io")).toBe("tatum.io")
})

test("check re-verifies pass and fail quotes alike", async () => {
  const quote = (criterion: string, status: string, q: string) => ({
    criterion,
    status,
    quote: q,
    url: "example.com",
    source: "author",
  })
  const r = await check(
    {
      pr: "1",
      criteria: JSON.stringify([
        quote("Audited", "fail", "Our smart contracts are not yet audited"),
        quote("Live", "fail", "Launched in March 2020 on mainnet"),
        quote("Docs", "pass", "Full documentation for every endpoint"),
      ]),
    },
    async () => ({
      status: 200,
      url: "https://example.com/",
      text: "Our smart contracts are not yet audited by any firm.",
      links: [],
    })
  )
  expect(r.criteria.map((c) => c.status)).toEqual([
    "fail",
    "unknown",
    "unknown",
  ])
})

test("section marks product-only passes as claimed and nice criteria as preferred", () => {
  const c = (criterion: string, source: string, weight = "must") => ({
    criterion,
    status: "pass",
    weight,
    quote: "a quote long enough to count",
    url: source === "repo" ? "public/content/x.md" : "https://example.com/",
    source,
  })
  const out = section({
    product: "X",
    policy: { page: "adding-developer-tools", why: "" },
    criteria: [
      c("Documented", "independent"),
      c("Widely used", "author"),
      c("Open source", "independent", "nice"),
    ],
    facts: [],
    existing: [],
    askAuthor: [],
  })
  expect(out).toContain("| ✅ | Documented |")
  expect(out).toContain("| ☑️ | Widely used |")
  expect(out).toContain("| ✅ | Open source _(preferred)_ |")
})

const outsider = (over: Record<string, unknown> = {}) => ({
  state: "open",
  title: "Suggest a developer tool: Foo",
  body: "",
  labels: [],
  author_association: "NONE",
  user: { login: "alice", type: "User" },
  ...over,
})

test("isListingIssue takes outside listing requests, with or without the form", () => {
  expect(isListingIssue(outsider())).toBe(true)
  expect(
    isListingIssue(
      outsider({ title: "Whatever", labels: [{ name: "wallet 👛" }] })
    )
  ).toBe(true)
  expect(
    isListingIssue(
      outsider({
        title: "Add Foo to the oracles page",
        body: "See https://foo.xyz",
      })
    )
  ).toBe(true)
  expect(isListingIssue(outsider({ title: "Add a dark mode toggle" }))).toBe(
    false
  )
  expect(isListingIssue(outsider({ title: "Suggest a glossary term" }))).toBe(
    false
  )
  expect(
    isListingIssue(
      outsider({ title: "Event listing", body: "https://conf.xyz" })
    )
  ).toBe(false)
  expect(isListingIssue(outsider({ author_association: "MEMBER" }))).toBe(false)
  expect(isListingIssue(outsider(), ["alice"])).toBe(false)
  expect(isListingIssue(outsider({ pull_request: {} }))).toBe(false)
  expect(isListingIssue(outsider({ state: "closed" }))).toBe(false)
})

const rec = (statuses: Record<string, string>, extra = {}) => ({
  product: "Foo",
  policy: { page: "adding-developer-tools", why: "" },
  criteria: Object.entries(statuses).map(([criterion, status]) => ({
    criterion,
    status,
    weight: "must",
    quote: status === "unknown" ? "" : "a quote long enough to count",
    url: "https://foo.xyz/",
    source: "independent",
  })),
  facts: [],
  existing: [],
  askAuthor: [],
  ...extra,
})
const bot = (body: string, i = 0) => ({
  id: i,
  created_at: `2026-11-2${i}T00:00:00Z`,
  user: { login: "ethorg-agent[bot]" },
  body,
})

test("latest reads review and listing data lines, counting only follow-ups", () => {
  const r1 = rec({ Documented: "unknown" })
  const r2 = { ...rec({ Documented: "pass" }), kind: "followup" }
  const cs = [
    bot(
      `## review\n<!-- ethorg-review: ${JSON.stringify({ listing: r1 })} -->`,
      1
    ),
    {
      ...bot(dataLine({ ...r2, kind: "research" }), 2),
      user: { login: "mallory" },
    },
    bot(`thanks\n\n${dataLine(r2)}`, 3),
  ]
  const l = latest(cs)
  expect(l.record.criteria[0].status).toBe("pass")
  expect(l.followups).toBe(1)
  expect(latest([]).record).toBeNull()
})

test("isListingReply answers only the author, after a check, under the cap", () => {
  const item = { state: "open", user: { login: "alice" } }
  const checked = [bot(dataLine(rec({ A: "unknown" })))]
  const by = (login: string) => ({ user: { login, type: "User" } })
  expect(isListingReply(item, by("alice"), checked)).toBe(true)
  expect(isListingReply(item, by("bob"), checked)).toBe(false)
  expect(isListingReply(item, by("alice"), [])).toBe(false)
  const capped = Array.from({ length: MAX_FOLLOWUPS }, (_, i) =>
    bot(dataLine({ ...rec({ A: "unknown" }), kind: "followup" }), i)
  )
  expect(isListingReply(item, by("alice"), [...checked, ...capped])).toBe(false)
})

test("only failing must criteria block", () => {
  const r = rec({ Audited: "fail", Docs: "unknown" })
  r.criteria.push({
    ...r.criteria[0],
    criterion: "Open source",
    weight: "nice",
  })
  expect(blockers(r)).toEqual(["Audited"])
  expect(blockers(null)).toEqual([])
})

test("research comment tags the author and asks issues to wait for a go-ahead", () => {
  const issue = researchComment(rec({ Audited: "fail" }), {
    author: "alice",
    isPr: false,
  })
  expect(issue.startsWith("@alice ")).toBe(true)
  expect(issue).toContain("**Blocking:**")
  expect(issue).toContain("go-ahead before opening a pull request")
  const pr = researchComment(rec({ Audited: "pass" }), {
    author: "alice",
    isPr: true,
  })
  expect(pr).not.toContain("**Blocking:**")
  expect(pr).not.toContain("go-ahead")
  expect(researchComment(rec({}), { author: "a b", isPr: true })).toMatch(
    /^Hi /
  )
})

test("follow-up shows only what changed and hands off at the cap", () => {
  const prev = rec({ Audited: "fail", Docs: "unknown", Used: "unknown" })
  const next = rec({ Audited: "pass", Docs: "unknown", Used: "unknown" })
  const out = followupComment(next, prev, { author: "alice", followups: 0 })
  expect(out).toContain("- ✅ Audited")
  expect(out).toContain("**Still open:** Docs · Used")
  expect(out).toContain("**The blocking points are resolved.**")
  expect(out).not.toContain("a maintainer will take it from here")
  const same = followupComment(prev, prev, {
    author: "alice",
    followups: MAX_FOLLOWUPS - 1,
  })
  expect(same).toContain("didn't change any criterion")
  expect(same).toContain("**Still blocking:**")
  expect(same).toContain("a maintainer will take it from here")
})

test("check keeps an existing listing only when its text is in the file", async () => {
  const r = await check(
    {
      issue: "7",
      existing: JSON.stringify([
        { path: "public/content/a.md", text: "Foo   is a node provider" },
        { path: "public/content/a.md", text: "Bar is something else" },
        { path: "../etc/passwd", text: "root:x:0:0:root" },
      ]),
    },
    async () => ({ status: 0, text: null, error: "offline" }),
    async (path: string) =>
      path === "public/content/a.md"
        ? "- [Foo](x) foo is a node provider"
        : null
  )
  expect(r.issue).toBe(7)
  expect(r.pr).toBeUndefined()
  expect(r.existing.map((e) => e.text)).toEqual(["Foo   is a node provider"])
})

test("a blocker stays until its criterion passes", () => {
  const prev = rec({ Audited: "fail" })
  expect(blockers(rec({ Audited: "unknown" }), prev)).toEqual(["Audited"])
  expect(blockers(rec({ Audited: "pass" }), prev)).toEqual([])
  expect(
    blockers(rec({ Audited: "unknown" }), { ...rec({}), blocking: ["Audited"] })
  ).toEqual(["Audited"])
  const out = followupComment(rec({ Audited: "unknown" }), prev, {
    author: "alice",
    followups: 0,
  })
  expect(out).toContain("**Still blocking:**")
  expect(out).not.toContain("resolved")
})

test("latest counts an edited review from its last edit", () => {
  const review = {
    ...bot(
      `<!-- ethorg-review: ${JSON.stringify({ listing: rec({ A: "pass" }) })} -->`,
      1
    ),
    updated_at: "2026-11-29T00:00:00Z",
  }
  const followup = bot(
    dataLine({ ...rec({ A: "unknown" }), kind: "followup" }),
    2
  )
  expect(latest([review, followup]).record.criteria[0].status).toBe("pass")
})

test("isListingIssue skips quiz and glossary suggestions whatever the title", () => {
  expect(
    isListingIssue(
      outsider({
        title: "Add/Update/Delete quiz question",
        body: "Source: https://foo.xyz",
      })
    )
  ).toBe(false)
  expect(
    isListingIssue(
      outsider({ title: "Whatever", labels: [{ name: "quiz 📚" }] })
    )
  ).toBe(false)
})
