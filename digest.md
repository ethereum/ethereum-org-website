**Intake decisions — 2026-08-13**
2 decisions · 1 batch · 79 open PRs / 91 open issues

**🧭 Decide today**
**1. [#19050](https://github.com/ethereum/ethereum-org-website/pull/19050) — Add a standalone /open-source page** · content · impact med, effort med
New App Router page mirroring /privacy (16 files), linked from /values; content + product-review + translation tags. Verdict stale, no human input yet.
→ **Decide if we want the page, then assign content+product review — not a blind merge** (0.55)

**2. [#19046](https://github.com/ethereum/ethereum-org-website/pull/19046) — Remove dead showLastUpdatedInHero config** · code · impact med, effort small
Looked like a dup of #19026 yesterday, but #19026 merged and byt61 grep-showed no other PR removes `showLastUpdatedInHero`. Green, 3 files.
→ **Check if merged #19026 already fixed #19025; if not merge this, else close** (0.6)

**✅ Verify, then merge**
**3. [#19040](https://github.com/ethereum/ethereum-org-website/pull/19040) — Correct slashing penalty figure** · content
Team one-file PoS docs fix, green. Electra raised MIN_SLASHING_PENALTY_QUOTIENT 32→4096, so the old "~1%" figure is wrong.
→ **Verify the corrected bound, then merge** (0.82)

**🧩 Review batches**
- **SEO audit fixes (konopkja)** — [#19022](https://github.com/ethereum/ethereum-org-website/pull/19022), [#19029](https://github.com/ethereum/ethereum-org-website/pull/19029), [#19017](https://github.com/ethereum/ethereum-org-website/pull/19017), [#19044](https://github.com/ethereum/ethereum-org-website/pull/19044), [#19043](https://github.com/ethereum/ethereum-org-website/pull/19043): five green e2e-tested review-only fixes. #19022 (raw i18n keys as JSON-LD) and #19029 (no lastmod, ~17.5k URLs) are live prod bugs. One pass clears all five; #19001 still red.

**⏳ Waiting on others**
- [#19052](https://github.com/ethereum/ethereum-org-website/pull/19052) — byt61: apply wackerow's JS notes (changes requested today)
- [#18896](https://github.com/ethereum/ethereum-org-website/pull/18896) — contributor: rebase the CONFLICTING intl frontmatter fix (day 7)

**🔁 Carried over**
- [#18966](https://github.com/ethereum/ethereum-org-website/pull/18966) — **day 7, still nothing**: /layer-2 "$0.00" fix, 1 file, green, no reviews. Not wrong, ownerless — assign wackerow or self-merge.
- [#19016](https://github.com/ethereum/ethereum-org-website/pull/19016) — **day 4**: green i18n sweep retires the recovery-agent 500 class in one review; unowned.
- [#18967](https://github.com/ethereum/ethereum-org-website/issues/18967) — **day 6, still nothing**: 7-PR Storybook stack won't land piecemeal. Make the taxonomy call once or close it.
- [#18891](https://github.com/ethereum/ethereum-org-website/issues/18891) — **day 7**: intl frontmatter gap; triage with #19031/#18896 as one, not three.

**🗑️ Suggested closures**
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — day 8, 4 red checks, zero replies ever (0.82)
- [#18876](https://github.com/ethereum/ethereum-org-website/pull/18876) — day 8, no reason given for deleting existing DeFi questions (0.72)

**🔄 Since the last digest** — #19026 merged (yesterday's Decide #1); #19020 closed.
**📊 Queue** — 79 open PRs (11 conflicting, 4 failing) · 91 issues (60 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
