# French (fr) Translation Review Findings

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.0/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored
- `frappez Taruchi` -> `frappez le NFT Taruchi` (critical: `frapper` + a bare proper noun parses as "you **hit** Taruchi"; every other `frapper` in that file has an explicit NFT/token object)

**Open (native call needed):**

- #46 `ciphernodes` -> `nœuds de chiffrement`.
- #47 gatekeeper -> `intermédiaire` vs `gardien` in `page-values-faq-3-p1`.
- "human verification" -> `vérification humaine` reads as verification *performed by* a human.

**Notes:**

- **Do not "fix" « sel » for salt.** It is the established French cryptography term (fr.wikipedia *Sel (cryptographie)*, "salage"), and the scare quotes mirror English, marking it as a term of art.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 9.0/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `slot` -> `créneau` restored to the glossary form in both `single-slot-finality` keys. Bare `L1`/`L2` -> `couche 1 (l1)`/`couche 2 (l2)` in 2 nav strings. `formelnellement` typo fixed.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 8.8/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:**

- `fee-row-label` `Ce que vous payez` -> `Ce pour quoi vous payez` (critical: dropped the "for", so the header stated an amount rather than what the fee covers -- the one sense that row exists to convey).

**Open (native call needed):**

- `fee-value-set-by-provider`/`-undisclosed`/`-variable` are masculine singular but compose against plural `frais` (`Frais d'achat : fixé par le fournisseur`). Suggest `fixés`/`non divulgués`/`variables`. Left as a native call -- French UI tables often leave value fragments invariable.
- `fee-qualifier-free-under-fox-discounts` -> `gratuit sous {usd}`; `sous` + a bare amount is not idiomatic for a monetary threshold.
- `fee-label-shield-unshield` -> `masquage/démasquage` conveys hiding (so NOT the protect/unprotect error) but drops the protocol terms the wallet's own UI shows.
- `hardware-hero-description` -> object-less `conserver`.

**Notes:**

- `{label} : {value}` correctly uses French colon spacing.
