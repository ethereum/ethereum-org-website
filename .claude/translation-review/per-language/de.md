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

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 8.2/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Zero ETHGlossary deviations -- the cleanest terminology in the fleet. Verbless sentence at solo:198; `Bindung`->`Kaution` for bond in JSON; majority-client misparse at saas:71. du/Sie split persists (saas is du, six files are Sie) but is pre-existing, not a regression.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 9.4/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**

- `Verfügbarkeits-/Finalitäts-Dilemma` -> `Endgültigkeits-Dilemma`. A regression: the pre-PR line on `origin/dev` already had the glossary form. Swept all 24 -- de was the ONLY locale to regress off its glossary `finality` term on this line.
- `soundness` -> `Zuverlässigkeit` (reliability) at 3 sites -> `Stichhaltigkeit`, matching de's own canonical ZKP article (3 prior uses).

**Open (native call needed):**

- `Kein Open Source.` should be `Nicht Open Source.` (predicate-noun negation).

## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 8.6/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/de/page-apps.json`, `roadmap/pectra/index.md`. 1 critical, 11 warnings. Brand 10/10 | Technical 9/10 | Semantic 8/10 | Consistency 8/10 | Tone 8/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: de not affected, the clef transcript was already English. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: pre-existing, not introduced here; fixed anyway.
- Bare-acronym over-expansion in `page-apps.json`: not affected, zero keys expanded; de and ja were the only two clean locales.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (de-specific):**

- whitehat parenthetical: the extra `)` sat after the link rather than after `bezeichnet`

**Notes:**

- `accounts/index.md` is correctly absent: quarantined with a matching `class: gate` entry in `.manifests/quarantine.json` after the jsx-tags check caught `<Pfad>` / `<Passwort>` twice. Quarantine behaved as designed.
- `.manifests/.../de/roadmap/pectra/index.md/translation.json` was not refreshed alongside its `source.json`; its `englishManifestHash` matches neither the old nor the new source rootHash. Predates this PR.


## PR #19351 (intl/pending-dev) -- 2026-09-29 -- Score 8.8/10

Scope: `developers/docs/accounts/index.md` (first successful retranslation after the #19326 quarantine), `consensus-mechanisms/pos/rewards-and-penalties/index.md`, `tutorials/send-token-ethersjs/index.md`. 0 critical, 3 warnings (all fixed on request). Brand 10/10 | Technical 9/10 | Semantic 8/10 | Consistency 8/10 | Tone 9/10.

**Fixed in this branch:**

- Trailing newline stripped at EOF on `accounts` and `send-token-ethersjs`; restored.
- `rewards-and-penalties:55` "carrots" calqued as `die „Karotten“` -> `das „Zuckerbrot“` (the pre-PR line had it, and `attack-and-defense` uses it).
- `accounts:31` `ETH/Token-Überweisungen` (bank-transfer register) -> `ETH-/Token-Transfers`, glossary `transfer` = `Transfer`, matching the pre-PR line.
- `rewards-and-penalties:29` "(as `sqrt(N)`)" -> `(als ...)` read as "in the role of"; now `(proportional zu ...)`, 2 sites.

**Notes:**

- Code-fence protection (#19348) worked: the clef transcript kept `<path>`/`<password>` byte-exact, so the jsx-tags gate passed and the quarantine entry cleared. `Virtuelle Ethereum-Maschine` now matches ETHGlossary (pre-PR used the English name).


## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 9.0/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).

**Open (warnings):**

- hegota `Fork-Wahl` vs tree `Fork-Choice` (83:1).
- privacy-online `No-Logs-Anspruch` (entitlement) should be `-Versprechen`; `Suchanfragen` for DNS lookups; `Weitere Wissenswerte` grammar.
