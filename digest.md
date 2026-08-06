**Intake decisions — 2026-08-06**
1 decision · 1 batch · 55 open PRs / 82 open issues

**🧭 Decide today**
**1. [#18979](https://github.com/ethereum/ethereum-org-website/issues/18979) — new SEO audit: 2 live JSON-LD bugs among 7 issues** · code · impact high, effort medium
konopkja filed a coordinated SEO audit today (#18977–#18983, all "dev required"). Two ship broken structured data in prod now: #18979 emits raw i18n keys as JSON-LD (`Article.headline = "page-wallets-title"`), and [#18980](https://github.com/ethereum/ethereum-org-website/issues/18980) asserts 4 FAQ answers absent from `/what-is-ethereum/` — both risk Google rich-result penalties. The rest: crawler-invisible content, zero sitemap `<lastmod>`, a JSON-LD CI guard, and a glossary-per-URL RFC.
→ **Fast-track #18979 and #18980 now; triage the other five into an SEO sprint** (0.8)

**🧩 Review batches**
- **Storybook reorg (phases 0–6)** — [#18969](https://github.com/ethereum/ethereum-org-website/pull/18969) … [#18989](https://github.com/ethereum/ethereum-org-website/pull/18989): the stack grew from 3 to 7 PRs and got new commits (AI verdicts now superseded, CI re-running). Land order 0→6, but it isn't green end-to-end — phase 3 [#18985](https://github.com/ethereum/ethereum-org-website/pull/18985) has E2E failing and phases 1–2 are mid-recheck. Ask the author to green the stack first; phases 4–6 are CLEAN but stacked on top.

**⏳ Waiting on others**
- Product-review backlog — [#18976](https://github.com/ethereum/ethereum-org-website/pull/18976), [#18944](https://github.com/ethereum/ethereum-org-website/pull/18944), [#18947](https://github.com/ethereum/ethereum-org-website/pull/18947), [#18872](https://github.com/ethereum/ethereum-org-website/pull/18872): four "needs product review" adds, oldest 13d, no team reply.

**🔁 Carried over**
- Quiz series [#18923](https://github.com/ethereum/ethereum-org-website/pull/18923) +9 — **day 3, still nothing**: ~10 team quizzes, each approved + green, all BLOCKED with reviewDecision null. A reviewer can't clear this — the block is a 2nd required review / CODEOWNER rule. Needs a repo admin to add the approval or adjust protection.
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — **day 3, still nothing**: external walletless tutorial, 4 netlify checks failing, nobody has said a word in 9d. Change the ask — a maintainer comments what's broken (frontmatter + preview build) or closes; don't leave the contributor silent.
- Recovery fixes [#18700](https://github.com/ethereum/ethereum-org-website/pull/18700) & [#18821](https://github.com/ethereum/ethereum-org-website/pull/18821) — **day 3**: two recovery-incident fixes, green, blocked only on a missing review for 15d.
- [#18966](https://github.com/ethereum/ethereum-org-website/pull/18966) — day 2: /layer-2 avg tx cost still shows $0.00 in prod; one approval merges the 1-file fix.

**🔄 Since the last digest**
- Resolved: bounty-hunters update #18975 landed; a new entry #18976 arrived (above).
- Arrived: the 7-issue SEO audit (#18977–#18983) and Storybook phases 3–6 (#18985–#18989).
- Not moved: both of yesterday's "Decide today" cards (#18966, #18896) are still open.

**📊 Queue** — 55 open PRs (14 conflicting, 5 failing checks) · 82 open issues (53 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
