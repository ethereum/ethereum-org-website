# French (fr) Translation Review Findings

## PR #19983 (intl/pending-dev, run 46014807045) -- 2026-11-27 -- Score 9.0/10
Scope: 15 markdown files, changed lines; 7 diffs read in full (ethash, data-structures x3, frameworks, run-a-node, transactions) plus statelessness and privacy.

**Fixed in this branch (7 critical, #112):** patricia-merkle-trie `interface de programmation d'application (API) JSON-RPC` -> `API JSON-RPC`; run-a-node `Processeur (CPU)` -> `CPU` (2 bullets); ethrex `couche 1 (L1)` / `couche 2 (L2)` -> `L1` / `(L2)`; statelessness `couche 1 (L1)` -> `verification L1` and `organisation autonome decentralisee (DAO)` -> `DAO`; privacy `organisations autonomes decentralisees (DAO)` -> `DAO`.

**Open:** storage slot rendered `creneau` (ETHGlossary `slot` = `creneau` is the consensus-slot sense; `emplacement de stockage` reads better, dev already used `creneau de stockage` x2); `(PBS)` appended to `separation proposant-constructeur` (3 sites); patricia-merkle-trie last link text `Understanding the Ethereum trie` left in English (dev identical).

**Notes:** sweeps clean for U+3002, U+2060, foreign scripts, SPDX.

## PR #19979 (intl/pending-dev, run 45975411591) -- 2026-11-27 -- Score 9.2/10
Scope: 72 markdown pages + 20 JSON namespaces (incremental updates, dev-tools descriptions); 7 markdown diffs read in full, about 150 JSON keys sampled; scripted sweeps clean for U+3002/U+2060/foreign script; verify-structure: no new errors (`data-and-analytics` heading-count is on dev; 19 img-alt-untranslated warnings).

**Fixed in this branch (about 31 sites):**

- Long form added where English is bare `L1`/`L2` (known-patterns #112; the JSON fix pass did not cover markdown): `couche 1 (L1)`/`couche 2 (L2)` -> `L1`/`L2`/`la L1` in zkevm (8 lines), bridges, developers/docs/bridges (2), roadmap/security:104, zero-knowledge-proofs:103, social-networks:62, fusaka (4), dencun (4 sites), community/research (3), plus JSON `page-resources` gas-ethgastracker/gas-l2fees, `page-organizations-enterprise-privacy-compliance-description`, `tool-ethskills-description`. Where English says "layer 2"/"layer 1" the glossary form `couche 2 (L2)` was kept.
- `dapp` spelled out where English is bare: bridges:47, `tool-ethskills-description` (also `DeFi`), glossary `transaction-fee-definition` (matches the tooltip file).
- Glossary EOA: roadmap/security:78 `comptes détenus par des externes` -> `comptes détenus en externe`.

**Open (native call needed):**

- `shielded-pool-term`: `Réserve protégée` in glossary-tooltip vs `Pool masqué` in glossary (same term, two renderings).
- community/research:173 `ponts de garde` for custodial bridges (carried from #19034).
- contributing/index.md:28 `technologies sanctuaires` is a literal calque of "sanctuary technologies".
- single-slot-finality title and `page-roadmap-single-slot-finality-title` `Finalité à slot unique` vs glossary `créneau` (pre-existing on dev).
- gasper: `réduction` used for slashing alongside `sanctionné` (pre-existing mix).

**Notes:** tu/vous consistent (vous), guillemets and French colon spacing intact, components (`GasperFinalityDiagram`, `VaultDepositDiagram`, ...) restored, tool and brand names stay Latin (RedStone Oracles, Band Protocol, UMA Oracle restored from translated forms).

## PR #19962 (intl/pending-dev) -- 2026-11-26 -- Score 9.0/10
Scope: `component-diagrams.json`, 257 changed keys (Merkle proof, optimistic rollup, base fee, Gasper finality, ZK-rollup diagrams), changed lines only.

Fixed: 35 values with `(l1)`/`(l2)` and bare `la l1` uppercased.

## PR #19902 (intl/pending-dev) -- 2026-11-25 -- Score 9.5/10
Scope: 7-8 re-translated pages (pos, portal-network, optimistic-rollups, zk-rollups, verifying, erc-721-vyper, SQL tutorial, glamsterdam), full PR review, sonnet agents.

Fixed: EOA comptes detenus en externe (optimistic-rollups L189). Open: gossip rendered potins, parenthetical English glosses in portal-network, sanctionne/reduction slashing mix.

## PR #19815 (intl/pending-dev) -- 2026-11-24 -- Score 9.0/10
Scope: 12 re-translated dev-docs/roadmap pages with interactive diagrams + new `component-diagrams.json` namespace (933 keys), reviewed against English at PR head 86deeb25cd.

Fixed: gas inline code, choix de fourche, frais de priorite, creneaux. Open: `creneau de stockage` for storage slot (native call), Engine API vs API Engine.

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

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 8.2/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

EOA custody inversion at withdrawals:177 (`compte détenu par un tiers` = held by a third party). Same defect is ALREADY LIVE on dev in developers/docs/accounts/index.md -- needs a follow-up. `phrase de récupération`->`phrase secrète` (glossary). tu/vous perfectly consistent (347 vous, 0 informal).

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 9.2/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Plus the locale-only extra file in this PR. Fleet avg 8.67, median 8.80.
**Fixed in this branch:** none needed -- zero criticals.


**Open (native call needed):**

- `harnais de test` for "test harness" (strap sense) -- the fr agent missed this; found by a central sweep. `environnement de test` fits.
- French guillemets `« »` replaced with ASCII quotes at 3 sites in `research/index.md`.
- `réseau de potins` (tabloid gossip) for "gossip network"; house form is `réseau de diffusion`.
- `ponts de garde` for "custodial bridges" reads "on-duty bridges".
- `proposeur`/`proposant` split introduced within one file.

## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 8.0/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/fr/page-apps.json`. 9 critical, 9 warnings. Brand 10/10 | Technical 6/10 | Semantic 8/10 | Consistency 7/10 | Tone 9/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: fr affected on the full block; restored byte-exact from the English source. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: already repaired by this PR.
- Bare-acronym over-expansion in `page-apps.json`: collapsed to the ETHGlossary short form.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (fr-specific):**

- `réseau principal` -> `Réseau principal` at the 4 sites whose English is bare "Mainnet"; the one "Ethereum Mainnet" site correctly stays lowercase per its own glossary entry
- `de [fork la chaîne de blocs]` -> `forker`; bare `fork` filled a verb slot with a noun

**Notes:**

- Structurally spotless: anchors, fences, backticks, guillemets, JSON parity and tu/vous all exact, and the run lands the long-outstanding EOA custody fix.



## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 9.0/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).
- open-access `pièces stables (stablecoins)` -> `stablecoins` (glossary term).

**Open (warnings):**

- Frame transactions split `Transactions Frame` (hegota) vs `Transactions de trame` (privacy) -- needs a native pick, no glossary entry.
- `Navigateur Mullvad` should stay `Mullvad Browser`; `Institut Ludlow` vs `Ludlow Institute`.

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 9.4/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Open (warnings):**

- l2/L2 casing mix; `Trésoreries` for treasuries; credentials `identifiants` vs `attestations`; `DLT privé` gender.

## PR #19480 (intl/pending-dev, wagmi backtick retranslation) -- 2026-10-14

- Fixed: translated metavariables inside inline code restored to English (known-patterns #88).

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 8.4/10

Scope: 25 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-{accelerator,events,mentorship}` restored from dev (#81)
- security:448 non-word (`grâce aux arbitreurs qui` -> `grâce aux arbitragistes qui`)

**Open (native call needed):**

- developers/tutorials/scam-token-tricks/index.md:80: ETHGlossary deviation (EOA, high confidence): `compte détenu en externe`. The dev version was compliant at 4 sites and this run regressed it. The script_rule is not set, so this goes to a human. (`mais un [compte externe]` -> `mais un [compte détenu en externe]`)
- developers/tutorials/scam-token-tricks/index.md:316: Same EOA glossary deviation, 2 occurrences on this line.
- developers/tutorials/scam-token-tricks/index.md:382: Same EOA glossary deviation. (`qu'aux comptes externes.` -> `qu'aux comptes détenus en externe.`)
- developers/tutorials/scam-token-tricks/index.md:416: Same EOA glossary deviation. (`provient d'un compte externe,` -> `provient d'un compte détenu en externe,`)
- developers/tutorials/scam-token-tricks/index.md:425: Same EOA glossary deviation. The English here is "that owner is externally owned". (`ce propriétaire est un compte externe` -> `ce propriétaire est un compte détenu en externe`)
- 15 warnings in the PR review (see the PR #19556 review body).

**Summary:** The French text reads fluently and is structurally clean. Most problems come from a full retranslation that undid correct dev wording (the EOA glossary form, `arbitragistes`, `d'entiers`) and from bare acronyms expanded into the glossary's long form. The only items that can be fixed automatically are the three English tag values in `page-founders.json` and the `arbitreurs` restore.

## PR #19568 (intl/pending-dev) -- 2026-10-22 -- Score 9.4/10
Scope: 6 repaired developer tutorials (hello-world, mint/view/write NFT series, sending-transactions, using-websockets), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Duplicated `json` response block in how-to-write-and-deploy-an-nft removed (known-patterns #93)
- Code-fence drift restored from English: `sh` tags, `npm install dotenv` (known-patterns #92)

**Notes:**

- Clean otherwise.

## PR #19803 (intl/pending-dev) -- 2026-11-16 -- Score 9.2/10
Scope: 2 repaired developer tutorials (develop-and-test-dapps-with-a-multi-client-local-eth-testnet, how-to-use-echidna-to-test-smart-contracts), changed lines only. creating-a-wagmi-ui-for-your-contract was quarantined at the gate in all 24 locales (known-patterns #97). Scores are for the PR's initial state.

**Fixed in this branch:**

- multi-client title and description: retranslation spelled out `dapp` as `application décentralisée (dapp)` in both meta slots although the English did not change (#80, #91) -> restored dev's `une dapp`
- multi-client:93 `dépendances paires` (paired) -> `dépendances pairs (peer dependencies)`

**Open / notes:**

- echidna:340 glossary `annuler` for revert reads as overflows being "cancelled" (L415/L422 unchanged, same issue) -- native call (#96)
- ABI/EVM spelled out (#80)

## PR #19901 (intl/pending-dev) -- 2026-11-25 -- Score 8.6/10
Scope: gas page, translation-program page, page-developers-index.json (3 files), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Gas page inline code spans restored to English (known-patterns #101 recurrence)
- Glossary: `frais maximums` -> `frais maximum` (gas L87, L89).

**Open / notes:**

- `suite a un bloc plein` reverses "preceding" (gas:73, dev had `avant`); `telugu` -> `telougou`; `supplement` for tip.
- `page-developers-index.json` lost its final newline vs dev (matches en; cosmetic)
