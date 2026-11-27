# German (de) Translation Review Findings

## PR #19979 (intl/pending-dev, run 45975411591) -- 2026-11-27 -- Score 9.0/10
Scope: 91 changed files (71 markdown, 20 JSON incl. `page-developers-tools-descriptions.json` +~200 `tool-*` keys), changed lines only; all markdown diffs read, ~60 JSON keys sampled. Brand 10 | Technical 9 | Semantic 9 | Consistency 8.5 | Tone 8.5.

**Fixed in this branch (4 critical):**

- `roadmap/security/index.md:78` EOA `extern verwalteten Konten` -> `externen Konten` (ETHGlossary `Externes Konto (EOA)`; the pre-PR line matched)
- `developers/tutorials/secure-development-workflow/index.md:39` `Python-Programmierschnittstelle (API)` -> `Python-API` (added expansion of a bare English API, #80/#112)
- `page-developers-tools-descriptions.json` `tool-l2beat-description` `Layer 2-Netzwerken` -> `Layer-2-Netzwerken` (compound hyphenation)
- `page-get-eth.json` `page-get-eth-p2p-trusted-desc` `Einigt euch ..., teile deine` (plural/singular imperative mix) -> `Einige dich mit der Person auf einen Preis, teile deine`

**Open (native call needed):**

- Meta `description` register: `dao`, `real-world-assets` (du) vs Sie bodies; `bridges`/`defi`/`desci`/`decentralized-identity` (Sie) fine. Pipeline wrote each description in a register picked independently of the body.
- `tool-mev-boost-description` / `tool-mev-boost-relay-flashbots-description` add `(PBS)` where English has none; `tool-tenderly-cli-description` `Continuous-Integration-Job`; `contributing/index.md:44` `Layer 2 (L2)` (pre-existing form, English is bare `layer 2`).
- `logging-events-smart-contracts:27` link text `Deinen ersten Smart Contract bereitstellen` (capital Deinen, not the Sie/du of the file's own link title).
- `roadmap/scaling` new zkEVM paragraph `Beweiser` (glossary) vs `Prover` 10 lines above in the same file; `Tests auf Testnets` vs `Testnetz` elsewhere; `Schatzkammer-Operationen` (Fireblocks, corporate treasury sense; glossary form but DAO-sense).
- Code comments in `smart-contracts/anatomy` flip from `Sie` to impersonal `man`/imperative `beachte` in one comment (`// beachte, dass ...`) inside a Sie document.

**Notes:**

- Tools descriptions: `Ersteller` for builders is glossary-conformant (ETHGlossary `builder`); keep despite the `Creator` collision from #18942.
- Sweeps clean: U+3002, U+2060, ZWSP/BOM, foreign scripts, untranslated English sentences in changed lines.

## PR #19962 (intl/pending-dev) -- 2026-11-26 -- Score 9.4/10
Scope: `component-diagrams.json`, 257 changed keys (Merkle proof, optimistic rollup, base fee, Gasper finality, ZK-rollup diagrams), changed lines only.

Fixed: none needed. Open: `Zustands-Wurzel` (optimistic) vs `Zustandswurzel` (zk) in the same file; the closed form is correct and dominant on dev.

## PR #19902 (intl/pending-dev) -- 2026-11-25 -- Score 9.2/10
Scope: 7-8 re-translated pages (pos, portal-network, optimistic-rollups, zk-rollups, verifying, erc-721-vyper, SQL tutorial, glamsterdam), full PR review, sonnet agents.

0 critical. Open: ABI/API/MEV over-expansion (#80), Offchain/offchain casing, Basis-Gasgebuehr vs Grundgebuehr, geburnt, tag Daten und Analytik vs Analysen.

## PR #19815 (intl/pending-dev) -- 2026-11-24 -- Score 7.8/10
Scope: 12 re-translated dev-docs/roadmap pages with interactive diagrams + new `component-diagrams.json` namespace (933 keys), reviewed against English at PR head 86deeb25cd.

Fixed: gas inline code, Attestierung, Prioritaetsgebuehr. Open: du/Sie split across the diagram namespace (needs one policy), head Spitze/Kopf/Head, Aufnahme vs Einbindung, hyphenation of compounds.

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

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 9.2/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Fixed in this branch:**

- `tokenization` `assets-treasuries-title` `Schatzkammern` -> `Staatsanleihen` (glossary `treasury` entry is the DAO sense; here it means government bonds).

**Open (warnings):**

- `Ethereum für Unternehmen` used for both enterprise and small-business pages; `Privatkredite` for private credit; Onchain capitalization; Kontrahenten-/Gegenparteirisiko split.

## PR #19480 (intl/pending-dev, wagmi backtick retranslation) -- 2026-10-14 -- Score 9.4/10

- Fixed: security line 292 unbalanced backtick around withdraw() (regression; same class as the English backtick fix fe75a81caa).
- Warning: wagmi line 299 dropped subject `sie` (ungrammatical).

## PR #19486 (intl/pending-dev, networks quarantine release) -- 2026-10-15 -- Score 9.4/10

- Fixed: `Layer 2-Testnetze` -> `Layer-2-Testnetze` (2x, compound hyphenation).
- Open: colloquial `herumspielen` replaced `ausprobieren`; L174 `anstatt geschützt oder sicher` awkward.

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 8.2/10

Scope: 26 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-mentorship` restored from dev
- security:292 unbalanced backtick (`withdraw() in `Victim` -> `withdraw()` in `Victim`)
- app-plasma:121 fabricated links (`[macOS](https://learn.microsoft.com/en-us/windows/` -> `macOS, Linux oder`)

**Open (native call needed):**

- developers/tutorials/scam-token-tricks/index.md:80: Moves away from ETHGlossary for EOA. The glossary prose form is `externes Konto` and the line before this PR matched it. (`[extern besessenes Konto]` -> `[externes Konto]`)
- developers/tutorials/scam-token-tricks/index.md:316: Same EOA glossary deviation (`[extern besessenen Konto]` -> `[externen Konto]`)
- developers/tutorials/scam-token-tricks/index.md:382: Same EOA glossary deviation (`extern besessene Konten` -> `externe Konten`)
- developers/tutorials/scam-token-tricks/index.md:416: Same EOA glossary deviation (`extern besessenen Konto` -> `externen Konto`)
- developers/tutorials/scam-token-tricks/index.md:425: Same EOA glossary deviation (`dieser Besitzer extern besessen ist` -> `dieser Besitzer ein externes Konto ist`)
- developers/docs/apis/backend/index.md:77: Deviates from ETHGlossary `full node` (= `Full Node`, plural `Full Nodes`, high confidence). English: "Full Nodes and Block Explorers". The line before this PR matched the glossary. (`Vollständige Knoten` -> `Full Nodes`)
- 18 warnings in the PR review (see the PR #19556 review body).

**Summary:** ETHGlossary `/filter` outputs for all 15 English sources and the changed JSON strings are saved in /tmp/claude-1000/-home-wackerow-dev-EF-ethereum-org-website/c16f81d0-e87a-403c-bec0-2dc1cfd4fcf3/scratchpad/gl_de/

## PR #19568 (intl/pending-dev) -- 2026-10-22 -- Score 8.8/10
Scope: 6 repaired developer tutorials (hello-world, mint/view/write NFT series, sending-transactions, using-websockets), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Duplicated `json` response block in how-to-write-and-deploy-an-nft removed (known-patterns #93)
- Code-fence drift restored from English: `sh` tags, `npm install dotenv` (known-patterns #92)
- `[Ethereum](/) -Blockchain` stray space removed (mint:18)

**Notes:**

- Warnings: du-imperatives in new code comments inside Sie documents; viem/Viem casing differs between files.

## PR #19803 (intl/pending-dev) -- 2026-11-16 -- Score 9.6/10
Scope: 2 repaired developer tutorials (develop-and-test-dapps-with-a-multi-client-local-eth-testnet, how-to-use-echidna-to-test-smart-contracts), changed lines only. creating-a-wagmi-ui-for-your-contract was quarantined at the gate in all 24 locales (known-patterns #97). Scores are for the PR's initial state.

**Fixed in this branch:**

- None needed

**Open / notes:**

- echidna: glossary `rückgängig machen` for revert reads as overflows/contracts being "undone" (L340, L422; L415 unchanged); the glossary note allows `Revert` -- native call (known-patterns #96)
- ABI/EVM spelled out where English leaves them bare (#80, prose -> warning)

## PR #19901 (intl/pending-dev) -- 2026-11-25 -- Score 9.0/10
Scope: gas page, translation-program page, page-developers-index.json (3 files), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Gas page inline code spans restored to English (known-patterns #101 recurrence)

**Open / notes:**

- `tip` rendered with the glossary term would repeat the priority fee; left as is.
- `page-developers-index.json` lost its final newline vs dev (matches en; cosmetic)
