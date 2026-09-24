**Intake decisions — 2026-09-24**
2 decisions · 1 batch · 76 open PRs / 111 open issues

**🧭 Decide today**
**1. [#19295](https://github.com/ethereum/ethereum-org-website/pull/19295) landed — close the intl frontmatter trio** · tooling · impact medium, effort small
Yesterday's blocker is resolved: the team's frontmatter/manifest-v2 fix is no longer open, obsoleting external PR [#18896](https://github.com/ethereum/ethereum-org-website/pull/18896) and issues [#18891](https://github.com/ethereum/ethereum-org-website/issues/18891)/[#19031](https://github.com/ethereum/ethereum-org-website/issues/19031).
→ **Confirm it merged (vs reverted); if merged, close #18896/#18891/#19031 as obsolete** (0.6)

**✅ Verify, then merge**
**2. [#19326](https://github.com/ethereum/ethereum-org-website/pull/19326) — daily intl pipeline PR** · translation
Green on the correct base, blocked only on review — but the run log notes **11 translation tasks failed the structural gate** (dropped, not merged; e.g. `de` accounts jsx-structure).
→ **Confirm those 11 files are OK to defer, then merge** (0.8)

**🧩 Review batches**
- **Green team PRs blocked only on a required review** — [#19318](https://github.com/ethereum/ethereum-org-website/pull/19318) (null-`src` guard, **release-build blocker**), [#19292](https://github.com/ethereum/ethereum-org-website/pull/19292) (restores 141 missing dev tools), [#19294](https://github.com/ethereum/ethereum-org-website/pull/19294) (Node 21 runtime, **undeployable after 5 Oct — 11 days**). Sibling [#19319](https://github.com/ethereum/ethereum-org-website/pull/19319) cleared this same path yesterday; one approving review each clears the rest.

**🔁 Carried over**
- Recovery crashes ([#19311](https://github.com/ethereum/ethereum-org-website/issues/19311), [#19306](https://github.com/ethereum/ethereum-org-website/issues/19306) + 4) — **day 3, no owner**: homepage + /get-eth `RangeError` stack-overflows read as one recursion regression; assign one person.
- Product review (~13 listing PRs) — **day 10, nothing**: nominating an owner hasn't worked; merge stale-bot [#18696](https://github.com/ethereum/ethereum-org-website/pull/18696) as the auto-close valve instead.
- SEO PRs [#19017](https://github.com/ethereum/ethereum-org-website/pull/19017)/[#19261](https://github.com/ethereum/ethereum-org-website/pull/19261) — **day 15**: green, no assigned merger; [#19259](https://github.com/ethereum/ethereum-org-website/pull/19259) now conflicting, dropped out.
- [#19234](https://github.com/ethereum/ethereum-org-website/pull/19234) — aljobson: file the wallet issue form, 13d.

**🗑️ Suggested closures**
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — walletless tutorial: failing checks + changes-requested, idle 30d; close or adopt (0.8)
- [#19271](https://github.com/ethereum/ethereum-org-website/issues/19271)/[#19247](https://github.com/ethereum/ethereum-org-website/issues/19247) — spam + empty bug report, no repro (0.9)
- [#19014](https://github.com/ethereum/ethereum-org-website/issues/19014)/[#19019](https://github.com/ethereum/ethereum-org-website/issues/19019) — invalid/placeholder, days 10/9; #18696 would auto-handle (0.85)

**📊 Queue** — 76 open PRs (8 conflicting, 7 failing checks) · 111 open issues (78 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
