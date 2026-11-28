# it Translation Review Findings

## PR #19993 (intl/pending-dev, runs 46112784113 / 46112790344 / 46118259298) -- 2026-11-28 -- Score 8.9/10
Scope: 16 tutorials, changed lines; sweeps over all 16 plus a prose read of uniswap-v2 and reverse-engineering. 1 critical fixed: an LLM glossary note leaked into a code comment (`stealth-addr:390`, restored to `// https://vite.dev/config/`). Open: none notable.

## PR #19983 (intl/pending-dev, run 46014807045) -- 2026-11-27 -- Score 9.2/10
Scope: 15 markdown files, changed lines; 7 diffs read in full (ethash, data-structures x3, frameworks, run-a-node, transactions).

**Fixed in this branch (2 critical, #112):** statelessness `organizzazione autonoma decentralizzata (DAO)` -> `DAO` and `layer 1 (L1)` -> `verifica L1` (English bare `L1`).

**Open:** `(PBS)` appended to `separazione proponente-costruttore` (3 sites); decimal separators mixed in run-a-node (`1.8TB+` with period vs `-1,0042 ETH` in transactions); `in genere calcola altri 15-90GB` (imperative; `prevedi`).

**Notes:** tu register consistent. Sweeps clean for U+3002, U+2060, foreign scripts, SPDX.

## PR #19979 (intl/pending-dev, run 45975411591) -- 2026-11-27 -- Score 9.0/10
Scope: 76 markdown pages (mostly 1-24 changed lines; metadata descriptions, L2BEAT to ETHBEAT, l1/l2 casing) + 20 JSON namespaces incl. 283-line dev-tools descriptions. Read the full changed-line diff of every md page and all non-tools JSON.

**Fixed in this branch (11 sites):**

- `erc-7540` `tesorerie tokenizzate` back to `titoli di stato tokenizzati` ("tokenized treasuries", pattern #87)
- `glossary.json` `wrapped-token-definition` `(weth)` back to `(WETH)` (#95)
- `page-learn` `additional-reading-bridges` `Bridge:` to `Ponti:` (glossary, #19474)
- `page-get-eth` `p2p-trusted-desc` `Concordate` to `Concorda` (person mix inside one imperative chain)
- `page-trillion-dollar-security` `paragraph-2` `dei L2` to `degli L2`
- dev-tools descriptions: 11 added long forms where English is bare collapsed (`finanza decentralizzata (DeFi)` x7, `valore totale bloccato (TVL)` x2, `circuiti a conoscenza zero (ZK)`, `Interfacce binarie dell'applicazione (ABI)`); the Gemini fix pass left these in it

**Open (warnings):**

- `a-developers-guide-to-ethereum-part-one` `tagli` for "denominations" (currency, ether units); `nella pool` (mempool) gender vs `nel pool` elsewhere
- `developers/docs/bridges` reading list reverted to English titles with it-abbreviated dates (matches English; dev had translated titles)
- `page-what-is-ether.json` lost its final newline (cosmetic)

## PR #19962 (intl/pending-dev) -- 2026-11-26 -- Score 9.1/10
Scope: `component-diagrams.json`, 257 changed keys (Merkle proof, optimistic rollup, base fee, Gasper finality, ZK-rollup diagrams), changed lines only.

Fixed: 19 values `(l1)`/`(l2)` uppercased. Open: `rollup a conoscenza zero (ZK-rollup)` expands an acronym the source leaves bare.

## PR #19902 (intl/pending-dev) -- 2026-11-25 -- Score 8.6/10
Scope: 7-8 re-translated pages (pos, portal-network, optimistic-rollups, zk-rollups, verifying, erc-721-vyper, SQL tutorial, glamsterdam), full PR review, sonnet agents.

Fixed: Ethereum Foundation to Fondazione Ethereum (SQL x4), tag Querying to Interrogazione, tip as mance to commissioni prioritarie. Open: equivocazione means misunderstanding, programma for schedule, stray (at stake), Letture di approfondimento heading.

## PR #19815 (intl/pending-dev) -- 2026-11-24 -- Score 8.2/10
Scope: 12 re-translated dev-docs/roadmap pages with interactive diagrams + new `component-diagrams.json` namespace (933 keys), reviewed against English at PR head 86deeb25cd.

Fixed: gas/verkle inline code, commissioni prioritarie, The Merge, costruttori for builder. Open: `sottocolli` garble in networking-layer (replace with sottoprotocolli), `In ogni altro punto`, revertito anglicism.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.7/10

**Fixed (critical):** `Cifratura Completamente Omoforma` -> `Omomorfa` (`roadmap/privacy` L96). "Omoforma" is not an Italian word; the term derives from *omomorfismo*. Not a glossary entry (FHE is absent from ETHGlossary), so this is an accuracy defect the glossary layer cannot catch — it appeared on a boldfaced defined term.

**Not fixed (warning):** L78 of the FOCIL transcript mirrors an English double negative through Italian's mandatory expletive-`non` after `a meno che`; literally correct but ambiguous to a native reader. Needs a native call, not a mechanical fix.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- #47 gatekeeper -> `intermediario`, which this file already uses for "middleman"; `page-values-faq-3-p1` keeps `guardiano`.
- `page-values-internet-list-privacy` breaks person/number: impersonal plural `essere esclusi ... visti` then singular `tua`/`bloccarti` in the same sentence.
- Stacked `per … per` in `app-fileverse-description` and `app-kohaku-description` reads as a parse error.

**Notes:**

- `coni Taruchi` for "mint" reads as coin-minting in isolation but matches all seven existing `coniare`-for-mint renderings in this file, so it was not flagged.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.7/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `layer 2 (L2)` -> `(l2)` in 3 `page-what-is-ethereum.json` keys (glossary mandates lowercase). `gatekeeper` -> `controllore`, un-collapsing it from `intermediario` (#47) -- its own sibling label already used `moderatore`.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.8/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `hardware-hero-description` -> `Detieni a lungo termine?` is object-less *detenere*.

**Notes:**

- Highest score in the fleet. Every glossary term matches, `Per cosa paghi` is exact, `shield/unshield` correctly left in English, and the feminine value fragments agree with `Commissione` in every combination `wallet-data.ts` actually produces.
- `Portafoglio di Ethereum` matches the file's pre-existing `portafogli di Ethereum` -- not an inconsistency.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.6/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Security-critical: `celle frigorifere` (refrigerated cold rooms) for "cold storage" in a key-custody sentence -- same class as #18925's Omoforma, and ETHGlossary has no `cold storage` entry for it. `contratti intelligenti` for smart contract at 3 sites. Historic stacked `per...per` and person/number breaks both recur.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 9.5/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:** none needed -- zero criticals.


**Open (native call needed):**

- `programma del gas del testimone` -- "schedule" mis-resolved as timetable; it is a gas cost table.
- `viene eseguito senza permesso` reads "run without authorisation" rather than "needs no permission".
- `lego del denaro` breaks it-tree precedent (`mattoncini Lego`); this same line previously read `mattoncini Lego del denaro`.

## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 8.6/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/it/page-apps.json`. 10 critical, 7 warnings. Brand 10/10 | Technical 9/10 | Semantic 9/10 | Consistency 7/10 | Tone 8/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: it not affected, the clef transcript was already English. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: **regression introduced by this PR**; fixed.
- Bare-acronym over-expansion in `page-apps.json`: collapsed to the ETHGlossary short form.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (it-specific):**

- `privacy` -> `riservatezza` reverted to the glossary loanword; sibling keys in the same file already said `privacy`

**Notes:**

- Acronym expansion accounted for 9 of 10 criticals; es, fr and pt-br did the same thing on the same keys while de did not, confirming it as pipeline-level rather than locale-level.



## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 9.4/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).

**Open (warnings):**

- learn-quizzes `fornitura` for coin supply (6 keys) -> `offerta`.
- open-access bank `account` should be `conto`; `non devono` modality shift (must not vs need not).

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 8.8/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Fixed in this branch:**

- `security/index.md` dropped closing backtick on `withdraw()`.
- `page-wallets-subtitle` `chain` -> `catene`; `enterprise-privacy` `scambi` -> `swap`; `enterprise-l2s` `bridge` -> `ponte` (glossary).

**Open (warnings):**

- Reviewer flagged lowercase-l1/l2 glossary deviations: NOT applied (upstream glossary casing bug, #53).

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 9.0/10

Scope: 26 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-{accelerator,events,mentorship}` restored from dev (#81)

**Open (native call needed):**

- None at critical level.
- 9 warnings in the PR review (see the PR #19556 review body).

**Summary:** Glossary filter outputs are saved in /tmp/claude-1000/-home-wackerow-dev-EF-ethereum-org-website/c16f81d0-e87a-403c-bec0-2dc1cfd4fcf3/scratchpad/gl-it/

## PR #19568 (intl/pending-dev) -- 2026-10-22 -- Score 9.4/10
Scope: 6 repaired developer tutorials (hello-world, mint/view/write NFT series, sending-transactions, using-websockets), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Duplicated `json` response block in how-to-write-and-deploy-an-nft removed (known-patterns #93)
- Code-fence drift restored from English: `sh` tags, `npm install dotenv` (known-patterns #92)
- `log creatati` typo changed to `log creati` (websockets:160)

**Notes:**

- Glossary returns `(weth)` lowercase (#95); left as is in it.

## PR #19803 (intl/pending-dev) -- 2026-11-16 -- Score 9.8/10
Scope: 2 repaired developer tutorials (develop-and-test-dapps-with-a-multi-client-local-eth-testnet, how-to-use-echidna-to-test-smart-contracts), changed lines only. creating-a-wagmi-ui-for-your-contract was quarantined at the gate in all 24 locales (known-patterns #97). Scores are for the PR's initial state.

**Fixed in this branch:**

- None needed

**Open / notes:**

- ABI/EVM spelled out (#80). Uses `causano un revert`, avoiding the de/fr undo/cancel problem

## PR #19901 (intl/pending-dev) -- 2026-11-25 -- Score 8.8/10
Scope: gas page, translation-program page, page-developers-index.json (3 files), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Gas page inline code spans restored to English (known-patterns #101 recurrence)

**Open / notes:**

- `commitment` used in the glossary's cryptographic sense for "no obligation" (translation-program:23); ambiguous word order at :7.
- `page-developers-index.json` lost its final newline vs dev (matches en; cosmetic)
