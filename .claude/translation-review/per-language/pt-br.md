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

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 8.7/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:**

- `fee-label-shield-unshield` `Taxa de proteção/desproteção` -> `Taxa de blindagem/desblindagem` (critical: literal physical-protection reading of Railgun privacy-pool terminology, and `desproteção` implied the user was *removing* protection). Evidence: the pt-br tree already renders `shielded pools`/`shielded balance`/`shielding deposit` as `pools blindados`/`saldo blindado`/`depósito de blindagem` in `next-great-wallet-private/index.md` -- same protocol family, so this is the established form, not a coinage.
- `fee-label-swap` -> `Taxa de troca` and `-swap-bridge` -> `Taxa de troca/ponte` (critical: ETHGlossary pt-br is `troca`, AND the file's own chip is `Trocas`/`Trocar tokens` with `finance-hero-description` saying `troca de tokens` -- a user saw a chip labelled "Trocas" and a fee row labelled "Taxa de swap" for the same thing).

**Open (native call needed):**

- `persona-legend` -> `Navegar por carteiras por tipo de usuário` stacks `por ... por`; the verb correctly reflects *browse*, only the preposition needs work.
- `fee-qualifier-stablecoins-lower-l2` -> bare lowercase `em l2s` matches neither EN `L2s` nor the glossary's `camada 2 (l2)` (#53).

**Notes:**

- `fee-row-tooltip` still says `trocas (swaps)` -- a deliberate hybrid gloss, left in place.
