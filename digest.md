**Intake decisions — 2026-08-11**
4 decisions · 1 batch · 74 open PRs / 87 open issues

**🧭 Decide today**
**1. [#18993](https://github.com/ethereum/ethereum-org-website/pull/18993) — Upgrade-status block on roadmap pages** · code · impact med
Went CLEAN overnight; blocked on one call — nloureiro assessed layout-rendered works across all 24 translated pages vs embedding in MDX. PR1 [#18991](https://github.com/ethereum/ethereum-org-website/pull/18991) (data layer) is green underneath; answering unblocks the stack.
→ **Confirm layout-rendered over MDX, then review #18991 + #18993 together** (0.72)

**✅ Verify, then merge**
**2. [#19027](https://github.com/ethereum/ethereum-org-website/pull/19027) — ethereum-vs-bitcoin quiz** · content
Team-authored and the only CLEAN PR in the queue — merge button is green.
→ **Verify the quiz answers read correctly, then merge** (0.85)

**3. [#19029](https://github.com/ethereum/ethereum-org-website/pull/19029) — Accurate sitemap lastmod dates** · code · impact high
Green, review-only; fixes #18982 — sitemap ships zero lastmod across ~17.5k URLs.
→ **Verify lastmod resolves per-URL on the preview, then merge** (0.8)

**4. [#19026](https://github.com/ethereum/ethereum-org-website/pull/19026) — Drop duplicate "last updated" in upgrade hero** · code
Green, review-only; fixes #19025 — date + stray rule render twice in the hero on all upgrade pages.
→ **Verify on an upgrade-page preview, then merge** (0.78)

**🧩 Review batches**
- **SEO JSON-LD** — [#19022](https://github.com/ethereum/ethereum-org-website/pull/19022) (raw i18n keys served as JSON-LD on /wallets/ + /quizzes/, high) and [#19017](https://github.com/ethereum/ethereum-org-website/pull/19017) (VideoObject transcript) are green + e2e-tested and share the generator; [#19001](https://github.com/ethereum/ethereum-org-website/pull/19001) still red. Review the two green together.

**⏳ Waiting on others**
- [#18876](https://github.com/ethereum/ethereum-org-website/pull/18876) — contributor: still owes a reason for deleting rather than adding DeFi quiz questions

**🔁 Carried over**
- [#19016](https://github.com/ethereum/ethereum-org-website/pull/19016) — day 2: i18n locale sweep is one review from retiring the recovery bug class; green, high-impact — assign a reviewer.
- [#18966](https://github.com/ethereum/ethereum-org-website/pull/18966) — **day 5, still nothing**: /layer-2 "$0.00" fix, 1 file, green, unowned. An unassigned review, not a decision — self-merge or name an owner.
- [#18918](https://github.com/ethereum/ethereum-org-website/pull/18918) — **day 6, still nothing**: walletless tutorial, 4 red checks, zero replies ever. The trivial frontmatter ask never reached the author — post it or close.
- [#18896](https://github.com/ethereum/ethereum-org-website/pull/18896) — day 5: intl frontmatter fix for #18891, still CONFLICTING; new sibling bug #19031 says the gap is widening — ask for the rebase.

**🗑️ Suggested closures**
- [#19019](https://github.com/ethereum/ethereum-org-website/issues/19019) — placeholder "[Content] <short summary>" issue, already labelled invalid (0.85)
- [#17263](https://github.com/ethereum/ethereum-org-website/pull/17263) — day 3: stale draft, 134d idle, conflicting (0.7)

**📊 Queue** — 74 open PRs (16 conflicting, 4 failing) · 87 open issues (57 external, no team reply) · [full queue](https://github.com/ethereum/ethereum-org-website/pulls)
