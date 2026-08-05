**Intake decisions — 2026-08-05**
2 decisions · 1 batch · 52 open PRs / 74 open issues

**🧭 Decide today**
**1. [#18966](https://github.com/ethereum/ethereum-org-website/pull/18966) — /layer-2 avg tx cost shows $0.00** · code · impact high, effort small
`formatPriceUSD`'s fixed 2 decimals round sub-cent L1 median fees to zero on a top page; team fix swaps to `formatSmallUSD`. 1 file, CI green, but BLOCKED with no review yet.
→ **Approve the 1-file fix and merge — the block is a missing review, not a defect** (0.86)

**2. [#18896](https://github.com/ethereum/ethereum-org-website/pull/18896) — intl pipeline drops added frontmatter keys** · tooling · impact high, effort medium
Closes still-open bug [#18891](https://github.com/ethereum/ethereum-org-website/issues/18891): added inert keys are silently dropped and manifests stamped current, hiding the gap from future runs. PR is green but now CONFLICTING and idle 8d.
→ **Confirm #18891 isn't already covered by the merged pipeline fixes; if not, ask @alerodriargui to rebase, then domain-review** (0.6)

**🧩 Review batches**
- **Storybook reorg (stacked — land in order)** — [#18969](https://github.com/ethereum/ethereum-org-website/pull/18969), [#18970](https://github.com/ethereum/ethereum-org-website/pull/18970), [#18971](https://github.com/ethereum/ethereum-org-website/pull/18971): phases 0→1→2 of [#18967](https://github.com/ethereum/ethereum-org-website/issues/18967) — delete 8 dead components, retitle 117 stories to a path-mirrored taxonomy, then a test that fails new mis-titled stories. All team, CI green. Review the taxonomy once; merge #18969 first (BLOCKED on review), then #18970 & #18971 (CLEAN).

**⏳ Waiting on others**
- [#18944](https://github.com/ethereum/ethereum-org-website/pull/18944), [#18947](https://github.com/ethereum/ethereum-org-website/pull/18947) — team: two content adds tagged "needs product review", still no reply

**🔁 Carried over**
- Quiz series [#18923](https://github.com/ethereum/ethereum-org-website/pull/18923) +9 — day 2: ~10 team quizzes, each approved and green, all still BLOCKED. Same ask: find the branch-protection rule holding them and land the batch.
- [#18700](https://github.com/ethereum/ethereum-org-website/pull/18700) & [#18821](https://github.com/ethereum/ethereum-org-website/pull/18821) — day 2: two recovery-incident fixes, green, blocked only on a maintainer review.
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — day 2: walletless tutorial, 4 checks failing, external contributor idle 8d with no reply to unblock them.
- [#18876](https://github.com/ethereum/ethereum-org-website/pull/18876) — day 2: DeFi quiz awaiting the contributor's response to wackerow's review.

**🔄 Since the last digest**
- Closed: intl-pipeline corruption PRs (#18941/#18952) — last run's top decision is resolved.
- Resolved: Scout Game dead entry (#18049) and the unreproducible Spanish bug report (#18422).
- Arrived: Storybook reorg stack and the /layer-2 rounding fix (both above).

**📊 Queue** — 52 open PRs (19 conflicting, 4 failing checks) · 74 open issues (46 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
