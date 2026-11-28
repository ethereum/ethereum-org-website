# Russian (ru) Translation Review Findings

## PR #19983 (intl/pending-dev, run 46014807045) -- 2026-11-27 -- Score 8.5/10
Scope: 15 markdown files (statelessness/privacy/merge/verkle, nodes-and-clients x3, frameworks, glossary, supply, transactions, data-structures x3, ethash), changed lines only; no JSON. Sweeps clean. 10 diffs read.

**Fixed in this branch (~20 critical):** #113 tool/brand names back to Latin on changed lines: `nodes-and-clients/index.md` `МетаМаск`:95, `Эригон` x3:157, `Лодстар` x3:209; `run-a-node` table + note `Бесу/Эригон/Незермайнд/Рет` -> `Besu/Erigon/Nethermind/Reth` (98-105); `frameworks:109` `ОпенЗеппелин SDK` -> `OpenZeppelin SDK`; `statelessness:29` `Портал Нетворк` -> `Portal Network`. #112 long forms where English is bare: `nodes-and-clients:161` `уровня 1 (L1)`/`уровень 2 (L2)` -> `L1`/`L2`; `frameworks:59,64,133` `децентрализованных приложений (dapp)` -> `dapp` (dev had bare `dapp` at 64 and 133: regression); `nodes-as-a-service:62,323,378` `невзаимозаменяемых токенов (NFT)` -> `NFT`; `statelessness:29` `(DAO)`, `:81` `уровне 1 (L1)`.

**Open (warnings):** `(EOA)` x3 and `(DA)` added to English long forms (`transactions:15,25,26,224`); `уровня 2 (L2)` kept where English says "layer 2"; glossary-capitalized mid-sentence `Газ`, `Протокола`, `Роллапов`, `Аккаунт`, `Блокчейне` (`merge`, `supply`, `run-a-node`; `Протокол` pre-existing on dev); period decimals (`1.8 ТБ`); `Обрезанная` -> `Очищенная` for pruned in the client table; `Предложение ETH` for supply; `чаевые` for fee tips is glossary-sanctioned (kept); unchanged lines still carry `Эригон`/`Бесу`/`Незермайнд`/`Лайтхаус`/`Теку`/`Нимбус` (client-diversity, archive-nodes, run-a-node body).

## PR #19979 (intl/pending-dev, run 45975411591) -- 2026-11-27 -- Score 9.1/10
Scope: 90 ru files (71 markdown, 19 JSON; incremental updates), changed lines only. Sampled ~20 markdown diffs (contributing, adding-layer-2s, anatomy, erc-7540, dencun, roadmap/security, zkevm, oracles, rust, 3 tutorials, bridges, community/research, staking, EIPs/governance) and ~250 JSON keys (glossary, glossary-tooltip, page-get-eth, page-learn, page-roadmap, page-layer-2-*, page-resources, quizzes). Sweeps clean: no U+3002/U+2060/foreign script, all JSON valid, no untranslated sentences.

**Fixed in this branch:**

- `glossary-tooltip.json` `shielded-pool-term` `Экранированный пул` -> `Защищенный пул` (matches `glossary.json`)

**Open (warnings):**

- `page-layer-2-networks-wallets-count`: `{count} кошельков` has no plural forms (rendered via `t.raw`, English is also plain); wrong for 1, 2-4, 21.
- L1/L2 `уровня 2 (L2)` first-mention expansions persist in markdown (case-only change from `(l2)`); mixed with bare `L2` in the same files (#112).
- `Правительство Эфириума` for "Ethereum governance" link text (`governance/index.md:185`, pre-existing; glossary `управление`).
- `Слизер` / `Эхидна` are glossary-sanctioned transliterations of Slither / Echidna (ETHGlossary note says Latin is also common); kept.
- Period decimal in `0.01 $`; `Эфириум` vs `Ethereum` mix and `Мейннет` vs `основная сеть` unchanged from dev.

## PR #19973 (intl/pending-dev) -- 2026-11-26 -- Score 9.0/10
Scope: component-diagrams (5 new diagrams) and dev-tools descriptions (277 keys). 0 critical. Open: `уровне 1 (L1)` / `уровне 2 (L2)` first-mention expansions in 18 diagram values (#112); client names (Besu, Lighthouse, Teku, Reth, ...) transliterated per ETHGlossary (correct, #113); `Разработчики` x179 for builders vs glossary `сборщик` (glossary side is the outlier).

## PR #19902 (intl/pending-dev) -- 2026-11-25 -- Score 8.8/10
Scope: 7-8 re-translated pages (pos, portal-network, optimistic-rollups, zk-rollups, verifying, erc-721-vyper, SQL tutorial, glamsterdam), full PR review, sonnet agents.

Fixed: Ethereum to Efirium (79 sites, optimistic-rollups regression), equivocation to ekvivokatsiya, blob to blob x3. Open: uninflected Glamsterdam x~10, Predposylki vs Predvaritelnye trebovaniya, DevP2P casing.

## PR #19815 (intl/pending-dev) -- 2026-11-24 -- Score 9.0/10
Scope: 12 re-translated dev-docs/roadmap pages with interactive diagrams + new `component-diagrams.json` namespace (933 keys), reviewed against English at PR head 86deeb25cd.

Fixed: ekvivokaciya, sleshing. Open: seed rendered as seed-phrase and derive as vyvesti in key-derivation diagram, head four ways, decimal comma.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 8.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values` + full `scaling/plasma/index.md` retranslation.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored
- `Таручи` -> `Taruchi` (23 of 24 locales keep the game-creature name Latin)

**Open (native call needed):**

- **plasma:** `collation headers` -> `заголовки сопоставления` (comparison/matching); should be `заголовки коллаций`. Mitigated by the retained English gloss.
- **plasma:** Mainnet split inside one file — 22 `основн* сет*` vs 6 `Мейннет`, the latter clustered in the sharding sections (L150/156/158). Both glossary-sanctioned; declension-sensitive, so left for a native call.
- **plasma:** spurious `(DA)` inserted twice where English has no abbreviation; `смарт-контракт Плазмы` vs `контракт Плазмы`; `его создатель` vs `производителей блоков`; 2 stray `ё` in an otherwise ё-less corpus (205 `ее` vs 1 `её` across `translations/ru/developers`); source-term glosses applied to 4 of ~12 quoted terms.
- #46 `шифроузлов`. `page-apps-gallery-screenshot-alt` needs the genitive: `Скриншот {index} приложения {appName}`, not `для {appName}`.
- #47 gatekeeper -> `посредник`; "shut down" and "freeze" both collapse to `заблокировать`.

**Notes:**

- **`чеканите` for mint is glossary-MANDATED** — the entry note says slang `минтить` is common but `чеканить` is preferred for official docs. Do not "fix" it.
- `виртуальной машиной Ethereum` is the glossary head form (`Виртуальная машина Ethereum (EVM)`), not a deviation; `Виртуальная машина Эфириума` is only an alias.
- The plasma retranslation is a genuine upgrade: the old version used non-glossary forms throughout (`офф-чейн`, `ролл-апы`, `обязательства по состоянию`, `вайтпейпер`) and was missing three heading anchors and one link.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 9.6/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- Highest score of the fleet. Only fix: restored the dropped `[Ethereum](/)` root link in `bridges/index.md`. Its agent correctly cleared several apparent defects as glossary-compliant (Мейннет vs основная сеть; создающего vs сборщик; Юнисвоп; Фейсбук) -- see #30/#20.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.7/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `hardware-hero-description` -> two issues: the `while you hold` clause is dropped entirely, and `Инвестируете на долгий срок?` reframes holding as investing (#58).

**Notes:**

- Cleanest fee-value fragments in the fleet -- `варьируется`/`не разглашается`/`устанавливается провайдером` compose as VERBS and sidestep the gender-agreement problem every other inflected locale has (#54). Recommend this as the pattern.
- Plural branches verified correct: `Поддерживает` + one `1 сеть` (acc) / few `2 сети` (gen sg) / many `5 сетей` (gen pl).
- `уровень 2 (l2)` matches the pre-existing key in the same file; the lowercase is the #53 glossary artifact.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 8.5/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

seed phrase as `seed-фразы` vs glossary `сид-фразы`. `производство` (manufacturing) for production/deployed at 4 dvt sites incl. a heading. Decimal points instead of commas in 5 JSON figures while markdown was correct. "state" polysemy CLEAR (состояние everywhere, zero государство).

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 8.8/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**

- Non-word `побеждами с ними` -> `побеждали в них` (visible gibberish).
- `head of the blockchain` -> `начало` (beginning) -> `вершины`. The pre-PR translation was correct.

**Open (native call needed):**

- `Сложные валидаторы` (complex) for "sophisticated validators"; pre-PR had `Опытные`.
- `график газа` -- "schedule" as timetable; it is a cost table.
- `альтернативы популярному ПО с открытым исходным кодом` reverses the sense by attachment.
- `commons` and `the public domain` both collapse to `общественное достояние` in one file.
- `Я попробовал` hard-codes a male speaker.

## PR #19142 (intl/pending-devcon-banner) -- 2026-08-21 -- Score 9.8/10
Scope: new `component-devcon-banner.json` (6 keys). Fleet avg 9.9.

**Open (upstream -- authoritative-ish form exists, deliberately not applied):**

- `Devcon` kept Latin. Policy 6.2 defaults the Cyrillic group to `always_latin` for brands, with `transliterate` overrides only for consumer-tier brands that have a universally established Cyrillic form. `blog.ethereum.org/ru` does ship `Девкон` (~25-30 occurrences, title "Встречайте Девкон 7!"), which is the kind of evidence that would qualify for the override -- but that blog is this same pipeline against this same glossary gap, so it is not independent. Not applied for a second reason: the string is `на Devcon 8`, which needs prepositional case (`на Девконе 8`) or, per 7.3's preference, apposition (`на конференции Девкон 8`). Guessing Russian morphology on a marketing banner is not worth it. Needs native input; filed in `ethglossary-normalization-queue.md` section 9.

**Open (upstream, do not fix in locale):**

- `Получите скидку 10%` deviates from ETHGlossary `claim` = `востребование`. `claim` has `script_rule: null`, so per the severity matrix this is High, not critical, and not auto-fixable. `востребуйте скидку` would be markedly worse Russian. See known-patterns #75.


## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 8.4/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/ru/page-apps.json`. 5 critical, 10 warnings. Brand 9/10 | Technical 8/10 | Semantic 8/10 | Consistency 8/10 | Tone 9/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: ru affected on the `<path>`/`<password>` placeholders only; restored. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: already repaired by this PR.
- Bare-acronym over-expansion in `page-apps.json`: collapsed to the ETHGlossary short form.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (ru-specific):**

- `-dao-description`: `управлять` (instrumental) and `создавать` (accusative) shared one accusative object -> `создавать ... (DAO) и управлять ими`
- `белым хакерам` (dat. pl.) -> `белым хакером` (instr. sg.), required by `лицу ... называемому`
- `Мейннет Эфириума` -> glossary `основная сеть Ethereum`, which was in place pre-PR

**Notes:**

- `Ethereum Virtual Machine` is now capitalized mid-sentence in `languages`/`testing` but lowercase in `accounts`: a glossary-lemma-capitalization trap worth a standing rule rather than a per-run edit.



## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 8.4/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).

**Open (warnings):**

- Not fixed (unchanged lines): `Бинанс Академи` (glossary Binance, Latin).
- `Хром` left undeclined (4 keys); F-Droid `бесплатного` (#83); `Предложение по улучшению Ethereum (EIP)-7805` expansion; Hegotá Cyrillic `Хегота` in page-upgrades-index only.

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 9.0/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Open (warnings):**

- `page-organizations-enterprise.json` missing: placeholder-count gate bug (#85).
- Prividium transliterated `привидиум`; `производственного уровня` for production-grade; glamsterdam `devnets` regressed to English.

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 8.6/10

Scope: 26 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-{accelerator,events,mentorship}` restored from dev (#81)

**Open (native call needed):**

- None at critical level.
- 20 warnings in the PR review (see the PR #19556 review body).

**Summary:** ETHGlossary filter outputs are saved in `/tmp/claude-1000/-home-wackerow-dev-EF-ethereum-org-website/c16f81d0-e87a-403c-bec0-2dc1cfd4fcf3/scratchpad/gl-ru/`.

## PR #19568 (intl/pending-dev) -- 2026-10-22 -- Score 9.8/10
Scope: 6 repaired developer tutorials (hello-world, mint/view/write NFT series, sending-transactions, using-websockets), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Duplicated `json` response block in how-to-write-and-deploy-an-nft removed (known-patterns #93)
- Code-fence drift restored from English: `sh` tags, `npm install dotenv` (known-patterns #92)

**Notes:**

- Warning: period decimal separator.

## PR #19803 (intl/pending-dev) -- 2026-11-16 -- Score 9.8/10
Scope: 2 repaired developer tutorials (develop-and-test-dapps-with-a-multi-client-local-eth-testnet, how-to-use-echidna-to-test-smart-contracts), changed lines only. creating-a-wagmi-ui-for-your-contract was quarantined at the gate in all 24 locales (known-patterns #97). Scores are for the PR's initial state.

**Fixed in this branch:**

- echidna:344 `counter` "may cause an overflow" -> `может переполниться` (can overflow)

## PR #19901 (intl/pending-dev) -- 2026-11-25 -- Score 9.2/10
Scope: gas page, translation-program page, page-developers-index.json (3 files), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Gas page inline code spans restored to English (known-patterns #101 recurrence)

**Open / notes:**

- The agent filed #101 as a warning; it is critical (see PR #19901). `Тейлор будет зачислено` grammar.
- `page-developers-index.json` lost its final newline vs dev (matches en; cosmetic)

## PR #19993 (intl/pending-dev) -- 2026-11-28 -- Score 8.6/10
Scope: 16 developer tutorials (incremental updates), changed lines only; no page-courses.json for this locale.

**Fixed in this branch:**

- run-node-raspberry-pi:19 `Плата расширения (HAT) NVMe` -> `NVMe HAT` (English leaves HAT bare; added expansion, known-patterns #112)

**Open / notes:**

- `tags: ["уровень 2 (L2)"]` keeps the glossary `(L2)` that English lacks (case-only change in this PR); warning.
- Pre-existing, untouched lines still carry transliterated names (`Юнисвоп`, `ОпенЗеппелин` in unchanged paragraphs); out of scope.
