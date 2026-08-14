# German (de) Translation Review Findings

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.2/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- `app-kohaku-description` renders "builders" as `Ersteller`, which collides with this file's own `Entwickler` (2x) and with the site's `Ersteller` = "Creator" (`page-apps-info-creator`).
- `app-zkpassport-description` "human verification" -> `Verifizierung der Menschlichkeit`; `Menschlichkeit` is humaneness. Sibling `app-proof-of-humanity-description` correctly uses `menschliche Identität`.
- #45 `kostenlosesten`; same string has `mit dem Web3` where German convention is `mit Web3`.

**Notes:**

- The two reworded `page-values` strings improve the file's Sie register (`die man nicht überprüfen kann` -> `die Sie nicht überprüfen können`).
- The `du` forms in the new game/consumer blurbs match the file's established split (games/consumer = du, DeFi/enterprise = Sie) — not an intra-file inconsistency.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.3/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `Yellowpaper` -> `Yellow Paper` (2 quiz keys; the markdown had it right). Lone informal `Du` in an all-`Sie` `payments/index.md` normalised. Open: du/Sie split across `learn-quizzes.json` categories (5 of ~20 use Sie) -- a deliberate convention call, not a mechanical fix.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.4/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `swap` glossary deviation (ETHGlossary de: `Tausch`) with an in-file split: new keys use the loanword as a noun (`Swap-Gebühr`), `finance-hero-description` translates the verb (`Token tauschen`). Left alone -- pre-existing `page-find-wallet-swaps` is already `Swaps`, so the new labels match the file. If fixed, that key must change too.
- `Swap-/Brücken-Gebühr` mixes a loanword and a translated term inside one compound.
- `nfts-hero-description` -> `auf ganz Ethereum` is awkward for "across Ethereum".

**Notes:**

- Only locale of the Latin bloc with clean acronym casing (`L2s`) -- because its ETHGlossary entry is `Layer 2 (L2)` (#53).
- `persona-legend` -> `durchsuchen` reads as "search through" next to `search-wallets`; matches the file's pre-existing "Browse all wallets" rendering, so no isolated change.
