**Intake decisions — 2026-08-14**
2 decisions · 1 batch · 83 open PRs / 89 open issues

**🧭 Decide today**
**1. [#19062](https://github.com/ethereum/ethereum-org-website/pull/19062) — find-wallet: rename "Privacy", add tracking grades** · product · impact med, effort med
konopkja's proposal ([#19060](https://github.com/ethereum/ethereum-org-website/issues/19060)), shipped green by byt61: renames the filter to "Private transactions" and adds a "No usage tracking" filter with hand-graded metadata for all 48 wallets. Same surface as the open Walletbeat-taxonomy proposal [#19042](https://github.com/ethereum/ethereum-org-website/issues/19042).
→ **Accept the rename + graded filter, or fold both into one pass on #19042** (0.6)

**✅ Verify, then merge**
**2. [#19063](https://github.com/ethereum/ethereum-org-website/pull/19063) — analytics: fire external-link events synchronously** · code
Confirmed prod undercount: wallet click-throughs logged 349 events vs 14,629 button taps because requestIdleCallback is throttled after a target=_blank click. Green, 2 files.
→ **Confirm the shared helper doesn't double-fire, then merge** (0.82)

**🧩 Review batch**
- **SEO audit fixes (konopkja)** — [#19044](https://github.com/ethereum/ethereum-org-website/pull/19044), [#19029](https://github.com/ethereum/ethereum-org-website/pull/19029), [#19043](https://github.com/ethereum/ethereum-org-website/pull/19043), [#19017](https://github.com/ethereum/ethereum-org-website/pull/19017), [#19058](https://github.com/ethereum/ethereum-org-website/pull/19058): five green, e2e-tested review-only fixes; #19044 (uncrawlable tutorials) and #19029 (no sitemap lastmod) are live bugs. One pass clears all five. [#19022](https://github.com/ethereum/ethereum-org-website/pull/19022) now needs one change from wackerow.

**⏳ Waiting on others**
- [#19022](https://github.com/ethereum/ethereum-org-website/pull/19022) — pillowtalk-Qy: address wackerow's one inline request (today)
- [#19069](https://github.com/ethereum/ethereum-org-website/pull/19069) — byt61: rework GitPOAP removal — edits hit translated files, dangling t() calls
- [#18896](https://github.com/ethereum/ethereum-org-website/pull/18896) — contributor: rebase the CONFLICTING intl frontmatter fix (day 8)

**🔁 Carried over**
- [#18966](https://github.com/ethereum/ethereum-org-website/pull/18966) — **day 8, still nothing**: /layer-2 "$0.00" fix, green, ownerless. Assign a reviewer or self-merge — tiny fixes have no queue owner.
- [#19016](https://github.com/ethereum/ethereum-org-website/pull/19016) — **day 5**: green i18n sweep retires the recovery-agent 500 class; still unowned.
- [#18967](https://github.com/ethereum/ethereum-org-website/issues/18967) — **day 7**: 7-PR Storybook stack won't land piecemeal — make the taxonomy call once or close it.
- [#18891](https://github.com/ethereum/ethereum-org-website/issues/18891) — **day 8**: intl frontmatter gap; triage with #19031/#18896 as one, not three.

**🗑️ Suggested closures**
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — day 9: walletless tutorial, 4 red checks, zero replies ever (0.82)
- [#18876](https://github.com/ethereum/ethereum-org-website/pull/18876) — day 9: DeFi quiz swap, deletion never justified (0.72)

**📊 Queue** — 83 open PRs (1 conflicting, 4 failing) · 89 issues (58 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
