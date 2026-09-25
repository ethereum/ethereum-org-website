**Intake decisions — 2026-09-25**
2 decisions · 0 batches · 79 open PRs / 112 open issues

**✅ Verify, then merge**
**1. [#19318](https://github.com/ethereum/ethereum-org-website/pull/19318) — guard null `src` in the Image wrapper** · code · impact high, effort small
Release-build blocker: one null `logoImage` aborts the static export ([#19317](https://github.com/ethereum/ethereum-org-website/issues/19317)). Green, 0 reviews, held only by the review gate — sibling [#19294](https://github.com/ethereum/ethereum-org-website/pull/19294) cleared that same gate today.
→ **Verify the guard doesn't mask genuinely-missing images, then approve + merge** (0.85)

**2. [#19292](https://github.com/ethereum/ethereum-org-website/pull/19292) — restore the 141 missing developer tools** · code · impact high, effort small
Tools page has served 299 of 440 since 13 Sep ([#19284](https://github.com/ethereum/ethereum-org-website/issues/19284)). Team fix, green; wackerow commented but never approved, so it sits on the gate.
→ **Confirm the fetch returns all 440, then approve + merge** (0.8)

**⏳ Waiting on others**
- [#19234](https://github.com/ethereum/ethereum-org-website/pull/19234) — aljobson: file the wallet issue form, 14d
- [#19332](https://github.com/ethereum/ethereum-org-website/pull/19332) — konopkja: failing E2E + branch behind, filed today

**🔁 Carried over**
- Listing PRs (**+3 today**: [#19334](https://github.com/ethereum/ethereum-org-website/pull/19334)/[#19333](https://github.com/ethereum/ethereum-org-website/pull/19333)/[#19327](https://github.com/ethereum/ethereum-org-website/pull/19327)) — **day 11, no product owner**: the stale bot warns them but can't close until [#18696](https://github.com/ethereum/ethereum-org-website/pull/18696) merges — merge it as the valve.
- Recovery crashes ([#19311](https://github.com/ethereum/ethereum-org-website/issues/19311)/[#19306](https://github.com/ethereum/ethereum-org-website/issues/19306) +4) — **day 4, no owner**: homepage + /get-eth `RangeError` stack-overflows read as one recursion regression; assign one person.
- SEO fixes [#19017](https://github.com/ethereum/ethereum-org-website/pull/19017)/[#19261](https://github.com/ethereum/ethereum-org-website/pull/19261)/[#19043](https://github.com/ethereum/ethereum-org-website/pull/19043) — **day 16**: green, no merger; same one-review path #19294 just used. Also close the frontmatter trio #18896/#18891/#19031 — #19295 landed the fix.

**🗑️ Suggested closures**
- [#19271](https://github.com/ethereum/ethereum-org-website/issues/19271)/[#19247](https://github.com/ethereum/ethereum-org-website/issues/19247) — spam + empty bug report (0.9)
- [#19014](https://github.com/ethereum/ethereum-org-website/issues/19014)/[#19019](https://github.com/ethereum/ethereum-org-website/issues/19019) — empty request + placeholder, `invalid` (0.85)
- [#17263](https://github.com/ethereum/ethereum-org-website/pull/17263) — abandoned draft, conflicting, idle 179d (0.8)

**🔄 Since the last digest**
- [#19294](https://github.com/ethereum/ethereum-org-website/pull/19294) merged — Node 21 runtime blocker (undeployable after 5 Oct) resolved. New arrivals #19317/#19318 (null-src crash) and #19332/#19331 (Learn-nav relink) are covered above.

**📊 Queue** — 79 open PRs (22 conflicting, 8 failing checks) · 112 open issues (79 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
