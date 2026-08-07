**Intake decisions — 2026-08-07**
2 decisions · 1 batch · 76 open PRs / 84 open issues

**🧭 Decide today**
**1. [#18995](https://github.com/ethereum/ethereum-org-website/issues/18995) — SEO audit now has its first ready fix** · code · impact high, effort medium
konopkja's SEO audit grew to 9 issues (2 new today) and external PR [#19001](https://github.com/ethereum/ethereum-org-website/pull/19001) — shipped with tests — now implements #18995, though its required checks are red. Two bugs are live in prod: raw i18n keys served as JSON-LD (#18979) and a FAQPage asserting 4 answers absent from the page (#18980, Google-penalty risk).
→ **Green + review #19001, and fast-track #18979/#18980 instead of holding for a full SEO sprint** (0.8)

**2. [#18991](https://github.com/ethereum/ethereum-org-website/pull/18991) — Roadmap upgrade-status stack (6 PRs)** · code · impact medium, effort medium
New external stack fixing roadmap pages that go stale ~2 weeks after each edit. PR1 is data-only, green, mergeable-pending-review; PR2 [#18993](https://github.com/ethereum/ethereum-org-website/pull/18993) carries an open design question (layout-rendered vs MDX-embedded) the author already worked through in-thread.
→ **Review PR1 now and confirm #18993's layout approach to unblock the stack** (0.75)

**🧩 Review batches**
- **Storybook reorg** — [#18969](https://github.com/ethereum/ethereum-org-website/pull/18969), [#18970](https://github.com/ethereum/ethereum-org-website/pull/18970), [#18971](https://github.com/ethereum/ethereum-org-website/pull/18971): phases 0–2 of the approved #18967 taxonomy. Phase 0 is dead-code deletion (green); 1–2 have failing checks. Land 0, bounce 1–2 back for green before the CLEAN later phases.

**🔁 Carried over**
- [#18966](https://github.com/ethereum/ethereum-org-website/pull/18966) — **day 3, still nothing**: team 1-file fix for the `/layer-2` "$0.00" prod stat, green, blocked only on a missing review. Not a decision — assign a reviewer or self-merge today.
- [#18700](https://github.com/ethereum/ethereum-org-website/pull/18700) & [#18821](https://github.com/ethereum/ethereum-org-website/pull/18821) — **day 4, still nothing**: two recovery-incident fixes, both green and blocked only on review. Same missing-reviewer block as #18966 — batch all three to one reviewer.
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — **day 4, still nothing**: walletless-dapps tutorial, 4 failing Netlify checks, no reply in 9d. The ask (missing lang/published frontmatter) is trivial — comment it or close; silence is the worst option.
- [#18876](https://github.com/ethereum/ethereum-org-website/pull/18876) — day 4: DeFi quiz waiting on the author to justify deleting existing questions (wackerow, 15d unanswered). Nudge or close.

**🗑️ Suggested closures**
- [#17263](https://github.com/ethereum/ethereum-org-website/pull/17263) — stale draft: Use Cases Explorer, 130d idle, conflicting (0.7)

**🔄 Since the last digest**
- Team quiz series merged — the day-3 "needs a 2nd required review" structural block cleared.
- New arrivals: ~12 recovery locale-fix draft PRs (#19003–#19012) and the nloureiro roadmap stack.

**📊 Queue** — 76 open PRs (18 conflicting, 7 failing checks) · 84 open issues (55 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
