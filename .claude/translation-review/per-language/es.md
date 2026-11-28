# Spanish (es) Translation Review Findings

## PR #19993 (intl/pending-dev, runs 46112784113 / 46112790344 / 46118259298) -- 2026-11-28 -- Score 8.7/10
Scope: `page-courses.json` (4,668 keys, first translation) + 17 tutorials (changed lines); scripted placeholder/tag/ICU/digit/negation checks over all keys, about 90 keys and 6 tutorial diffs read.

**Fixed in this branch (14 critical):** LLM glossary-note annotations leaked into code comments: `stealth-addr:385`, `token-integration-checklist:36`, `erc20-with-safety-rails` 108/180/200, `all-you-can-cache` 371/550/555/607/837 (restored from English/dev). Added `(CI)` expansion on bare English `CI` (`clear-signing` 266, 273) and `(LLM)` after a spelled-out phrase (`ai-trading-agent:45`). Courses: `(PoW)`, `(PoS)` (`proof-of-stake-exam-deposit-explain`, `page-courses-xp-level-finney-fact`) and `(L2)` (`tokens-send-intro-p2`) removed where English spells the term out.

**Open:** `gas-fees-intro-p1` drops the English "or tip" second `<strong>` (ETHGlossary maps tip to `tarifa de prioridad`, so the clause collapses; tag count 4 vs 6). `cadena de bloques` (105) vs `blockchain` (172) mixed across courses. Register is consistent `tu`. Decimals keep `.` throughout courses (consistent, LatAm style).

## PR #19983 (intl/pending-dev, run 46014807045) -- 2026-11-27 -- Score 8.9/10
Scope: 15 markdown files, changed lines; 8 diffs read in full, sweeps over all 15.

**Fixed in this branch (7 critical, #112):** patricia-merkle-trie `interfaz de programacion de aplicaciones (API) JSON-RPC` -> `API JSON-RPC`, `codificacion de prefijo de longitud recursiva (RLP)` -> `codificacion RLP`, `Go Ethereum (Geth)` -> `Geth` (English bare in all three); ethrex `capa 1 (L1)` / `capa 2 (L2)` expansions -> `L1` / `(L2)`; statelessness `zkEVM para la verificacion de la capa 1 (L1)` -> `verificacion L1` and `organizacion autonoma descentralizada (DAO)` -> `DAO`; supply `finanzas descentralizadas (DeFi)` -> `DeFi`.

**Open:** `(PBS)` appended to `separacion proponente-constructor` (3 sites); `Red principal` for Mainnet in the clients table is the dev convention; `tarifa`/`comision` for fee not unified in transactions.

**Notes:** run-a-node keeps the informal `tu` register of dev while nodes-and-clients uses `usted` (per-file, unchanged). Sweeps clean for U+3002, U+2060, foreign scripts, SPDX.

## PR #19979 (intl/pending-dev, run 45975411591) -- 2026-11-27 -- Score 8.6/10
Scope: 71 markdown pages + 20 JSON namespaces, incremental updates of outdated content, changed lines only (full diff read; sweeps for U+3002/U+2060/foreign script clean; verify-structure shows only pre-existing errors).

**Fixed in this branch:**

- `bridges` description: `aplicaciones descentralizadas (dapp)` -> `dapps` (English bare, meta slot, #80/#112)
- `page-developers-tools-descriptions`: `interfaces binarias de aplicación (ABI)` -> `ABI` (loop-decoder), `capa 2 (L2)` expansion removed + `rollup` -> `rollups` (l2beat)
- `glossary.json` `shielded-pool-term` English `Shielded pool` -> `Fondo blindado` (matches `glossary-tooltip.json`)
- `zero-knowledge-proofs` description: `reclamo` -> `afirmacion` for claim (known-patterns #75)
- `community/research` link text `centrada en los rollup` -> `rollups` (plural regressed)

**Open (native call needed):**

- tu/usted split in meta descriptions (Aprende vs Aprenda/Descubra, same section) and body (decentralized-identity, defi, governance usted; about, desci, nft tu)
- `El EIP` vs `La EIP` mixed (pectra EIP-2935 `El`; tree 36 `el` / 81 `la`)
- `escrow` term kept English in `glossary.json` while `page-get-eth` uses `deposito en garantia`; `tesorerias` for tokenized treasuries (erc-7540); `Recorrido` vs `Guia paso a paso` for the same ERC-20 tutorial link text (erc-20 vs tokens/index)
- English decimal/thousand separators in gasper (`44.4 millones`, `1,700 dolares`) vs `12 000` house style
- `page-what-is-ether.json` lost its final newline (cosmetic); pre-existing 14 `(DeFi)` expansions in dev-tools descriptions (untouched lines)

## PR #19962 (intl/pending-dev) -- 2026-11-26 -- Score 9.0/10
Scope: `component-diagrams.json`, 257 changed keys (Merkle proof, optimistic rollup, base fee, Gasper finality, ZK-rollup diagrams), changed lines only.

Fixed: 33 values with bare lowercase `la l1`/`la l2` uppercased.

## PR #19902 (intl/pending-dev) -- 2026-11-25 -- Score 8.8/10
Scope: 7-8 re-translated pages (pos, portal-network, optimistic-rollups, zk-rollups, verifying, erc-721-vyper, SQL tutorial, glamsterdam), full PR review, sonnet agents.

Fixed: slot (glamsterdam x2), Red principal casing (zk-rollups x5). Open: parent as principal (SQL), English number separators 15.7/2,048, acronym over-expansion, tu/usted split in erc-721.

## PR #19815 (intl/pending-dev) -- 2026-11-24 -- Score 8.4/10
Scope: 12 re-translated dev-docs/roadmap pages with interactive diagrams + new `component-diagrams.json` namespace (933 keys), reviewed against English at PR head 86deeb25cd.

Fixed: gas/verkle inline code, slot, desplegado for deploy (6 JSON keys). Open: tu/usted split in JSON, relay retransmisor vs rele, compounding composicion.

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

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 7.9/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Plus the locale-only extra file in this PR. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**
- `Robust Incentives Group` restored to English at 5 sites -- the name had been semantically translated with no English retained, making the EF team unsearchable.
- `rollup`/`dapp` plurals restored at 9 sites (tree favours `rollups` 243:36, `dapps` 29:9).

- `shipped`/`Shipping` -> `envío` (shipment) at 4 sites -> `implementó`/`Lanzamiento`.
- `cadena principal` -> `Red principal` for Mainnet in `testing/index.md` L207 (same file uses the correct form 4x).

**Open (native call needed):**

- `arnés de prueba` for "test harness" (horse-harness sense).
- `lean` -> `ligero` collides with es's established term for a *light* client.
- `page-open-source.json` is usted throughout while the `page-values` card that links to it is tú.

## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 8.8/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/es/page-apps.json`. 2 critical, 8 warnings. Brand 10/10 | Technical 8/10 | Semantic 9/10 | Consistency 8/10 | Tone 9/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: es affected on the `<path>`/`<password>` placeholders only; restored. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: pre-existing, not introduced here; fixed anyway.
- Bare-acronym over-expansion in `page-apps.json`: collapsed to the ETHGlossary short form.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (es-specific):**

- `<path>` / `<password>` shell placeholders restored inside the clef transcript

**Notes:**

- The `cadena principal` vs `Red principal` collision reverted, because English line 207 literally says "the main Ethereum chain" while the rest of the file says "Mainnet". The durable fix is on the English source, not the translation.
- Full tu -> usted harmonization of `accounts/index.md`, reversing the PR #19115 register regression.



## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 8.0/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).

**Open (warnings):**

- Acronym over-expansion (#80) regressed correct pre-PR text: API, DAO, DeSci, ENS, L2 `(l2)`, dapp, L1 across open-access, privacy, contributing, zk-rollups, glamsterdam, quantum-resistance.
- "both" dropped (#82); `reclamo` for no-logs claim; `en absoluto` misuse; tú/ustedes mix in privacy-fixes video L24/26.

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 8.8/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Fixed in this branch:**

- `small-business` `compare-privacy` `direcciones ocultas` -> `direcciones sigilosas` (glossary).

**Open (warnings):**

- `Desarrollado por Ethereum` for Powered by; `Tesorerías` for treasuries; public-sector use-cases on tú vs usted elsewhere.

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 8.8/10

Scope: 26 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-{accelerator,events,mentorship}` restored from dev (#81)

**Open (native call needed):**

- developers/docs/smart-contracts/security/index.md:102: ETHGlossary deviation. The `layer-2-l2` entry (high confidence, no script_rule) is `capa 2 (l2)`, with a note to keep it lowercase in body text. This PR changed the old `(l2)` to `(L2)`. The rule is " (`[capa 2 (L2)](/layer-2/)` -> `[capa 2 (l2)](/layer-2/)`)
- 8 warnings in the PR review (see the PR #19556 review body).

**Summary:** The translation is accurate and complies with the glossary across a large rewrite of prediction-markets and the plasma tutorial. The fixes needed are three English tag labels in founders and one L2 casing deviation. The rest are tú/usted and terminology consistency issues for a native reviewer.

## PR #19568 (intl/pending-dev) -- 2026-10-22 -- Score 9.2/10
Scope: 6 repaired developer tutorials (hello-world, mint/view/write NFT series, sending-transactions, using-websockets), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Duplicated `json` response block in how-to-write-and-deploy-an-nft removed (known-patterns #93)
- Code-fence drift restored from English: `sh` tags, `npm install dotenv` (known-patterns #92)

**Notes:**

- Warnings: `plugin` vs `complemento` differs between files; tú/usted differs between tutorials (pre-existing).

## PR #19803 (intl/pending-dev) -- 2026-11-16 -- Score 9.8/10
Scope: 2 repaired developer tutorials (develop-and-test-dapps-with-a-multi-client-local-eth-testnet, how-to-use-echidna-to-test-smart-contracts), changed lines only. creating-a-wagmi-ui-for-your-contract was quarantined at the gate in all 24 locales (known-patterns #97). Scores are for the PR's initial state.

**Fixed in this branch:**

- None needed

**Open / notes:**

- ABI/EVM spelled out where English leaves them bare (#80, prose -> warning)

## PR #19901 (intl/pending-dev) -- 2026-11-25 -- Score 9.0/10
Scope: gas page, translation-program page, page-developers-index.json (3 files), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Gas page inline code spans restored to English (known-patterns #101 recurrence)

**Open / notes:**

- `tip` -> `incentivo` instead of the glossary term (avoids tautology); API spelled out in full twice.
- `page-developers-index.json` lost its final newline vs dev (matches en; cosmetic)
