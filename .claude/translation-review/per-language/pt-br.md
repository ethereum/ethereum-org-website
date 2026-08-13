# Brazilian Portuguese (pt-br) Translation Review Findings

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- #47 gatekeeper -> `intermediário` vs `guardião` in `page-values-faq-3-p1`. The `bloquear` -> `congelar` change in that same string is a **correct** fix for "freeze" and should be kept.
- "sealed auctions" -> `leilões selados` is a calque; pt-br convention is `leilões de lance fechado`.

**Notes:**

- The curly quotes on the new lines correctly mirror the English source; the file's straight-quote line 59 is the pre-existing outlier, so the new text needs no change.
- `cunha Taruchi` matches the site-wide `cunhar`/`cunhagem` rendering of NFT minting (7 other keys).

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.8/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- No per-locale glossary fixes needed. Open: `layer 2 (L2)` casing in 2 `page-what-is-ethereum.json` keys; `atualização London` vs the `Berlim` exonym used two lines earlier.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).
