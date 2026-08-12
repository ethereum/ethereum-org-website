**Intake decisions — 2026-08-12**
3 decisions · 2 batches · 82 open PRs / 90 open issues

**🧭 Decide today**
**1. [#19026](https://github.com/ethereum/ethereum-org-website/pull/19026) — Drop duplicate "last updated" in upgrade hero** · code
A rival fix for the same bug landed overnight — [#19046](https://github.com/ethereum/ethereum-org-website/pull/19046) (byt61), which its own review flags a duplicate. Both green; konopkja filed the issue and #19026 first.
→ **Merge #19026, close #19046 as duplicate** (0.75)

**✅ Verify, then merge**
**2. [#19040](https://github.com/ethereum/ethereum-org-website/pull/19040) — Correct slashing penalty figure** · content
Team, one-file PoS docs fix, green, review-only. Electra raised MIN_SLASHING_PENALTY_QUOTIENT 32→4096; the old "~1%" figure is now wrong, PR swaps it for a bound.
→ **Verify the <0.1% bound reads right, then merge** (0.82)

**3. [#19048](https://github.com/ethereum/ethereum-org-website/pull/19048) — UTC seed for CategoryAppsGrid shuffle** · code
Self-reported [#19047](https://github.com/ethereum/ethereum-org-website/issues/19047): the daily shuffle seeded off local time, so order flipped around UTC midnight. Two files, green.
→ **Verify server/client order matches, then merge** (0.75)

**🧩 Review batches**
- **SEO audit fixes (konopkja)** — [#19022](https://github.com/ethereum/ethereum-org-website/pull/19022), [#19017](https://github.com/ethereum/ethereum-org-website/pull/19017), [#19029](https://github.com/ethereum/ethereum-org-website/pull/19029), [#19044](https://github.com/ethereum/ethereum-org-website/pull/19044), [#19043](https://github.com/ethereum/ethereum-org-website/pull/19043): five green, e2e-tested, review-only fixes on the JSON-LD/sitemap/SSR generators. #19022 (raw i18n keys shipped as JSON-LD) and #19029 (no lastmod on ~17.5k URLs) are live prod bugs. One pass; #19001 still red.
- **Merge-ready quizzes** — [#19041](https://github.com/ethereum/ethereum-org-website/pull/19041) (proof-of-stake, new) + [#19027](https://github.com/ethereum/ethereum-org-website/pull/19027) (eth-vs-bitcoin): both team, CLEAN. Verify keys.

**⏳ Waiting on others**
- [#18896](https://github.com/ethereum/ethereum-org-website/pull/18896) — contributor: rebase the CONFLICTING intl frontmatter fix (day 6; sibling #19031 widening it)
- [#18876](https://github.com/ethereum/ethereum-org-website/pull/18876) — contributor: still owes a reason for deleting vs adding DeFi quiz questions

**🔁 Carried over**
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — **day 7, nothing**: walletless tutorial, 4 red checks, zero replies ever. Post the fixes or close.
- [#18966](https://github.com/ethereum/ethereum-org-website/pull/18966) — **day 6, nothing**: /layer-2 "$0.00" fix, 1 file, green, unowned. Self-merge or name a reviewer.
- [#19016](https://github.com/ethereum/ethereum-org-website/pull/19016) — **day 3**: green i18n sweep retires the recovery-agent bug class in one review; unowned.

**🗑️ Suggested closures**
- [#19019](https://github.com/ethereum/ethereum-org-website/issues/19019) — invalid: placeholder "[Content] <short summary>" title (0.85)
- [#19020](https://github.com/ethereum/ethereum-org-website/pull/19020) — recommend-close label: low-value README edit (0.7)

**🔄 Since last digest** — nothing merged; +8 PRs/+3 issues.
**📊 Queue** — 82 open PRs (17 conflicting, 4 failing) · 90 issues (59 external, no reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
