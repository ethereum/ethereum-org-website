**Intake decisions — 2026-09-07**
5 decisions · 1 batch · 81 PRs / 99 issues open

**🧭 Decide today**
**1. SEO crawlability batch — 3 mergeable now, #19044 re-conflicting** · code · impact high
[#19017](https://github.com/ethereum/ethereum-org-website/pull/19017) (+#19029, #19043) are green, blocked only on review — top decision 3d ago, none merged. [#19044](https://github.com/ethereum/ethereum-org-website/pull/19044) re-conflicted a second time; #19001 still failing.
→ **Merge the 3 green now; a maintainer rebases #19044 to end the rebase race (0.8)**

**2. Recovery guards stacking up — 4 green fixes unreviewed, 3 fresh crashes untriaged** · code · impact high
Prod-crash guards [#19209](https://github.com/ethereum/ethereum-org-website/pull/19209) (+#19202, #19192, #19198) are green, review-blocked; new crashes [#19238](https://github.com/ethereum/ethereum-org-website/issues/19238) (+#19233, #19221) landed untriaged.
→ **Merge the ready guards in one pass, triage the 3 new crashes (0.75)**

**✅ Verify, then merge**
**3. [#19223](https://github.com/ethereum/ethereum-org-website/pull/19223) — Sentry span-quota fix (observability dark since Aug 31)** · tooling
Zero spans accepted since Aug 31 — no traces/Web Vitals until this lands; drops ~84% infra spans. Green, unreviewed. Pair with [#19210](https://github.com/ethereum/ethereum-org-website/pull/19210).
→ **Review both Sentry PRs, then merge (0.8)**

**4. Quiz content — [#19225](https://github.com/ethereum/ethereum-org-website/pull/19225) hub reorder + [#19217](https://github.com/ethereum/ethereum-org-website/pull/19217) 5 DeFi questions** · content
Both green, review-blocked; #19225 a verified data-only reorder (impl #19224), #19217 impl good-first-issue #17280.
→ **Content-verify both, merge together (0.75)**

**5. [#19227](https://github.com/ethereum/ethereum-org-website/pull/19227) — Devcon India campaign copy + localized ticket link** · content · time-sensitive
Team, green, review-blocked; leads with the ETHORG10 code, points CTA to localized devcon.org. Value decays as the window passes.
→ **Review copy, merge before the window closes (0.75)**

**🧩 Review batches**
- **Node-provider listings** — [#19132](https://github.com/ethereum/ethereum-org-website/pull/19132) (+#19157, #19035, #18872): one-file adds awaiting product review — apply the bar once (#19132 BEHIND, needs rebase).

**⏳ Waiting on others**
- [#19097](https://github.com/ethereum/ethereum-org-website/pull/19097) — pankajjagtapp: address CHANGES_REQUESTED on the ether.fi listing, 1d
- [#19184](https://github.com/ethereum/ethereum-org-website/pull/19184) — nloureiro: fix Dencun EIP count + testnet stage, 5d

**🔁 Carried over**
- [#19218](https://github.com/ethereum/ethereum-org-website/pull/19218) — day 2: wackerow-APPROVED and green; just needs a maintainer to press merge.
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — **day 13, still nothing**: zero replies, 4 red checks. Close and leave #18052 open, or adopt.
- [#18891](https://github.com/ethereum/ethereum-org-website/issues/18891) — **day 12, still nothing**: propagation thread (+#19031/#18896). Assign wackerow or close the trio.
- [#17263](https://github.com/ethereum/ethereum-org-website/pull/17263) — **day 10, still nothing**: 161d idle Stale+Blocked draft — close.

**📊 Queue** — 81 open PRs (13 conflicting, 9 failing) · 99 open issues (67 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
