# Spanish (es) Translation Review Findings

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.0/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- #46 `ciphernodes` -> `nodos de cifrado`. The Spanish expansion `Entornos de Ejecución Cifrados (E3s)` is correct house style.
- #47 gatekeeper -> `intermediario`, colliding with "middleman" in `page-values-card-censorship-resistance-description` while `page-values-faq-3-p1` keeps `guardián`.
- "lets you be shut down" -> `permite que te silencien` narrows shut-down to speech suppression.

**Notes:**

- `acuñar` for game-sense mint matches the file's NFT-mint convention (`app-basepaint-description`).
- `la "sal"` for the CREATE2 salt is valid Spanish cryptography usage; the es EVM opcodes doc keeps the parameter as `salt`, so a `(salt)` gloss would help discoverability but the term is not wrong.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 7.7/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- Untranslated English `banks` -> `bancos`, and `Merge` -> `Fusión` (ETHGlossary: The Merge => La Fusión) in `common.json`. `gatekeeper` -> `guardián`, un-collapsing it from `intermediario` (middleman) per #47. Open: tú/usted split across the file set; decimal period-vs-comma mixing on the same statistic in 3 files.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.2/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:**

- `fee-row-label` `Por qué pagas` -> `Por lo que pagas` (critical-adjacent: `por qué` is the interrogative "why", so the fee header read "Why do you pay"). All four sibling Romance locales produced the "for what" form.

**Open (native call needed):**

- `nfts-hero-description` -> `Ve, colecciona y gestiona` -- `Ve` is ambiguous between *ver* and the imperative of *ir*; prefer `Visualiza`.
- `hardware-hero-description` -> `¿Mantienes a largo plazo?` is object-less *mantener*.
- `monedas estables` vs the site-dominant `stablecoins` (144 vs 51 in `page-stablecoins.json`); not a glossary term, both permissible.

**Notes:**

- Full glossary compliance on all load-bearing terms; `blindaje/desblindaje` is the correct privacy-pool reading of shield/unshield and the model the pt-br fix was based on.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.3/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Negation inversion at dvt:84 (postverbal `ningún` without preverbal `no` reversed a fault-tolerance claim). dvt conflated staking pool/pooled staking. Register REGRESSED: this run flipped pools and solo from usted to tú while siblings stayed usted, so the section now switches register between linked pages.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.
