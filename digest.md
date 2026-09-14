**Intake decisions — 2026-09-14**
2 decisions · 2 batches · 72 open PRs / 106 open issues

**🧭 Decide today**
**1. Green review-only PRs pile up — no merge owner** · code · impact high, effort small
[#19017](https://github.com/ethereum/ethereum-org-website/pull/19017) + [#19043](https://github.com/ethereum/ethereum-org-website/pull/19043) (SEO, day 9) and [#19259](https://github.com/ethereum/ethereum-org-website/pull/19259) + [#19261](https://github.com/ethereum/ethereum-org-website/pull/19261) (production fixes, day 2): all four green, standalone, not superseded, blocked only on the review gate — none has a reviewer. The SEO pair has been merge-recommended 9 mornings running; the block is organizational, not technical.
→ **Assign a merge owner for small green PRs — or say why the SEO two are held (0.8)**

**2. Recovery crashes untriaged for a 3rd morning** · code · impact high, effort medium
[#19263](https://github.com/ethereum/ethereum-org-website/issues/19263) (prefetchHints), #19238 (max update depth), #19233 (indexedDB /start), #19221 (parentNode wallet modal): four Sentry-linked crashes, unassigned, no reply; guard drafts #19198/#19208 also sit unmerged. The "triage these" ask produced nothing twice.
→ **Name one owner for the recovery-agent stream; land or close #19198/#19208 (0.75)**

**🧩 Review batches**
- **Node-provider listings** — [#19132](https://github.com/ethereum/ethereum-org-website/pull/19132), #19157, #19035, #18872: one-file adds, product review, day 6 — apply the bar once (#19132 needs a rebase).
- **Bounty-hunter adds** — [#19178](https://github.com/ethereum/ethereum-org-website/pull/19178)–#19183: identical 0xMushow JSON entries — approve as a set.

**⏳ Waiting on others**
- [#19252](https://github.com/ethereum/ethereum-org-website/pull/19252) — pettinarip: resolve orphaned /personas/ routes from review; unblocks stacked #19266
- [#19234](https://github.com/ethereum/ethereum-org-website/pull/19234) — aljobson: file the wallet issue form, then link the PR, 3d
- [#19097](https://github.com/ethereum/ethereum-org-website/pull/19097) — pankajjagtapp: address changes on ether.fi listing, 13d

**🔁 Carried over**
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — **day 15, still nothing**: 4 red checks, changes requested, 0 replies — close, keep #18052 open.
- [#18891](https://github.com/ethereum/ethereum-org-website/issues/18891) — **day 14, still nothing**: team intl bug, unassigned 21d — nobody owns intl-pipeline bugs; assign wackerow or close the trio (+#18896/#19031).
- [#17263](https://github.com/ethereum/ethereum-org-website/pull/17263) — **day 12, still nothing**: 168d-idle blocked draft — close.
- [#19217](https://github.com/ethereum/ethereum-org-website/pull/19217) — day 4: green DeFi-quiz PR (#17280), still no reviewer.

**🗑️ Suggested closures**
- [#19271](https://github.com/ethereum/ethereum-org-website/issues/19271) (spam pix), [#19247](https://github.com/ethereum/ethereum-org-website/issues/19247) (emoji/"Btc"), [#19019](https://github.com/ethereum/ethereum-org-website/issues/19019) (placeholder) — empty/invalid, no repro (0.9)

**📊 Queue** — 72 open PRs (18 conflicting, 9 failing) · 106 open issues (74 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
