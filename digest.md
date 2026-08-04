**Intake decisions — 2026-08-04**
3 decisions · 1 batch · 65 open PRs / 75 open issues

**🧭 Decide today**
**1. [#18923](https://github.com/ethereum/ethereum-org-website/pull/18923) +8 — merge the 9-PR quiz series** · content · impact high, effort small
Nine team-authored quiz PRs (#18902–#18923) are all approved by pettinarip and CI-green, yet every one sits at mergeState BLOCKED with reviewDecision null.
→ **Find what branch protection still wants (2nd required review / CODEOWNER?) and merge the batch** (0.72)

**2. [#18941](https://github.com/ethereum/ethereum-org-website/pull/18941) — make intl propagation structurally safe** · tooling · impact high, effort small
Incremental mode is actively corrupting up to 24 locale files (#18940). Team fix #18941 is green but BLOCKED; non-team [#18952](https://github.com/ethereum/ethereum-org-website/pull/18952) is CLEAN but ai-flagged needs-work and overlaps it.
→ **Pick the team fix #18941, the fail-closed #18952, or both — then review/approve** (0.80)

**3. [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — walletless-dapps tutorial (#18052)** · technical-content · impact medium, effort small
External contributor's PR has 4 failing checks incl. the Netlify deploy-preview and zero replies in 7 idle days.
→ **Confirm the tutorial scope, then tell them to fix frontmatter + the failing build** (0.82)

**🧩 Review batches**
- **Recovery-incident fixes** — [#18821](https://github.com/ethereum/ethereum-org-website/pull/18821), [#18700](https://github.com/ethereum/ethereum-org-website/pull/18700): small green fixes for live 400/500 errors (#18796, #17967), both BLOCKED not CLEAN. Sibling fixes #18822 (lint failing) and #18733 (conflicting) still need contributor work — skip those. Review the two ready ones in one pass.

**⏳ Waiting on others**
- [#18876](https://github.com/ethereum/ethereum-org-website/pull/18876) — contributor: address wackerow's review on the DeFi quiz, 11d ago
- [#18944](https://github.com/ethereum/ethereum-org-website/pull/18944), [#18947](https://github.com/ethereum/ethereum-org-website/pull/18947) — team: two content adds tagged "needs product review", no reply yet

**🗑️ Suggested closures**
- [#18049](https://github.com/ethereum/ethereum-org-website/issues/18049) — dead-link fix, not a closure: scoutgame.xyz no longer resolves, 29d untouched — just remove the /apps entry (0.85)
- [#18422](https://github.com/ethereum/ethereum-org-website/issues/18422) — needs-info: vague report, no usable repro, 18d idle (0.55)

**📊 Queue** — 65 open PRs (17 conflicting, 4 failing checks) · 75 open issues (47 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
