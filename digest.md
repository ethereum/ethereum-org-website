**Intake decisions — 2026-09-11**
4 decisions · 2 batches · 66 open PRs / 103 open issues

**🧭 Decide today**
**1. SEO crawlability batch — day 9, two green PRs still unmerged** · code · impact high, effort small
[#19017](https://github.com/ethereum/ethereum-org-website/pull/19017) and [#19043](https://github.com/ethereum/ethereum-org-website/pull/19043) are green, blocked only on review; #19029 went stale (verdict superseded), #19044 re-conflicted, #19001 is failing. Top decision on 09-07 — nothing merged since.
→ **Merge #19017 + #19043 today; assign or close the other three (0.8)**

**2. Recovery crashes — 4 prod errors untriaged, last week's triage never happened** · code · impact high, effort medium
[#19263](https://github.com/ethereum/ethereum-org-website/issues/19263) (new) + #19238/#19233/#19221: unassigned, no reply, idle 5–7d; guard drafts #19198/#19208 open. The 09-07 "triage these 3" produced zero triage; a fourth arrived.
→ **Name one owner to triage all four and land/close the guard drafts (0.75)**

**✅ Verify, then merge**
**3. [#19210](https://github.com/ethereum/ethereum-org-website/pull/19210) — Sentry noise filter, now approved** · tooling
Two team approvals + green CI; sits at BLOCKED, so only the branch-protection gate remains (pair #19223 already merged).
→ **Clear the merge gate and merge (0.85)**

**4. [#19259](https://github.com/ethereum/ethereum-org-website/pull/19259) + [#19261](https://github.com/ethereum/ethereum-org-website/pull/19261) — two green production fixes** · code
#19259 fixes /developers/tools thumbnails 400ing at the image optimizer; #19261 fixes a 404 avatar + two dead links on bug-bounty leaderboard. Both green, unreviewed, tight.
→ **Review the pair and merge (0.8)**

**🧩 Review batches**
- **Node-provider listings** — [#19132](https://github.com/ethereum/ethereum-org-website/pull/19132), #19157, #19035, #18872: one-file adds, product review — apply the bar once (#19132 needs a rebase).
- **Bounty-hunter adds** — [#19179](https://github.com/ethereum/ethereum-org-website/pull/19179) + #19178/#19180/#19181/#19183: identical 0xMushow JSON entries — approve as a set.

**⏳ Waiting on others**
- [#19252](https://github.com/ethereum/ethereum-org-website/pull/19252) — pettinarip: fix orphaned /personas/ routes from wackerow's review, 1d
- [#19234](https://github.com/ethereum/ethereum-org-website/pull/19234) — aljobson: file the wallet issue form, then link the PR, 1d
- [#19097](https://github.com/ethereum/ethereum-org-website/pull/19097) — pankajjagtapp: address changes on the ether.fi listing

**🔁 Carried over**
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — **day 14, still nothing**: 4 red checks, changes requested, 0 replies. Close and keep #18052 open.
- [#18891](https://github.com/ethereum/ethereum-org-website/issues/18891) — **day 13, still nothing**: team intl bug, unassigned. Assign wackerow or close the trio (+#18896/#19031).
- [#17263](https://github.com/ethereum/ethereum-org-website/pull/17263) — **day 11, still nothing**: 165d-idle blocked draft. Close.
- [#19217](https://github.com/ethereum/ethereum-org-website/pull/19217) — day 3: green DeFi-quiz PR (#17280), no reviewer — content-verify or hand to the quiz owner.

**📊 Queue** — 66 open PRs (11 conflicting, 8 failing) · 103 open issues (71 external, no team reply) · 3 invalid/empty issues to close (#19247, #19019, #19014) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
