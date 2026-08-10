**Intake decisions — 2026-08-10**
2 decisions · 1 batch · 70 open PRs / 85 open issues

**🧭 Decide today**
**1. [#18995](https://github.com/ethereum/ethereum-org-website/issues/18995) — SEO cluster: two fixes now green** · code · impact high, effort small
[#19022](https://github.com/ethereum/ethereum-org-website/pull/19022) (fixes the live prod bug where raw i18n keys ship as JSON-LD on /wallets/ and /quizzes/) and [#19017](https://github.com/ethereum/ethereum-org-website/pull/19017) (drops the unsupported VideoObject transcript) are both green, test-covered, blocked only on review. [#19001](https://github.com/ethereum/ethereum-org-website/pull/19001) is still red.
→ **Fast-track the two green fixes rather than holding for a full SEO sprint; bounce #19001 for green** (0.82)

**2. [#19016](https://github.com/ethereum/ethereum-org-website/pull/19016) — One sweep retires the recovery i18n bug class** · code · impact high, effort small
pettinarip's AST-verified sweep sets request locale across all [locale] pages plus an eslint rule — replacing the 11 per-route recovery PRs and closing their gaps. Green, blocked only on the required review; straggler [#18999](https://github.com/ethereum/ethereum-org-website/pull/18999) is superseded by it.
→ **Review + merge the sweep, then close #18999 as consolidated** (0.78)

**🧩 Review batches**
- **Storybook reorg (#18967)** — [#18969](https://github.com/ethereum/ethereum-org-website/pull/18969) (phase 0, dead-code, green +1 approval), [#18970](https://github.com/ethereum/ethereum-org-website/pull/18970)/[#18971](https://github.com/ethereum/ethereum-org-website/pull/18971) (red). Phases 4–6 are now CLEAN but sit behind these. Land phase 0, green the red middle, later phases fall through.

**🔁 Carried over**
- [#18966](https://github.com/ethereum/ethereum-org-website/pull/18966) — **day 4, still nothing**: /layer-2 "$0.00" prod-stat fix, 1 file, green. Not a decision — the block is that no one owns the review. Assign an owner or self-merge; a fifth restatement won't move it.
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — **day 5, still nothing**: walletless-dapps tutorial, 4 red checks, zero replies ever. The trivial ask (lang/published frontmatter) was never posted to the author. Post it or close.
- [#18876](https://github.com/ethereum/ethereum-org-website/pull/18876) — **day 5**: DeFi quiz swap, author owes a reason for deleting existing questions. If still silent, close.
- [#18896](https://github.com/ethereum/ethereum-org-website/pull/18896) — **day 4**: intl frontmatter-propagation fix for #18891, still CONFLICTING. If merged pipeline work covers #18891, close; else ask for the rebase.

**🗑️ Suggested closures**
- [#19020](https://github.com/ethereum/ethereum-org-website/pull/19020) — low-value README edit, labelled recommend-close (0.7)
- [#17263](https://github.com/ethereum/ethereum-org-website/pull/17263) — stale draft, 133d idle, conflicting (0.7)

**🔄 Since the last digest**
- Resolved: recovery fixes #18700 & #18821, nav-tracking #19002, per-route recovery PRs (folded into #19016).
- New: SEO fixes #19022/#19017, i18n sweep #19016, wackerow's pipeline PR #19015 (red).

**📊 Queue** — 70 open PRs (16 conflicting, 7 failing checks) · 85 open issues (56 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
