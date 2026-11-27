# Ukrainian (uk) Translation Review Findings

## PR #19979 (intl/pending-dev, run 45975411591) -- 2026-11-27 -- Score 9.0/10
Scope: 90 files (71 markdown, 19 JSON), incremental updates; all 71 markdown diffs and all 19 JSON diffs read in full against English. Scripted sweeps clean (no U+3002/U+2060, no foreign-script, no Russian-only letters).

**Fixed in this branch:**

- `page-roadmap` `page-roadmap-danksharding-description`: Latin `Danksharding` -> `Данкшардинг` (regression vs dev; every other uk page uses the Cyrillic form)
- `oracles` L390/L400: link text `Чейнлінк`/`Теллор` restored to `Chainlink`/`Tellor` (regression vs dev)
- `a-developers-guide-to-ethereum-part-one` L131: `$5.99` -> `$5,99` (English decimal point, known decimal-separator pattern)
- `interact-with-other-contracts-from-solidity`: U+2019 apostrophes -> ASCII `'` (2 sites)

**Open (warnings):**

- `developers/docs/bridges` L126-L141: reference-list article titles reverted from Ukrainian to English (copied from en); previously translated on dev.
- `contributing/index.md`: list separators mix `–` and `-` (mirrors en, which mixes them too).
- `videos/surveillance-silence`: `обмежити ... обмежити` repeated in the social-credit sentence.
- `Лодстар`/`Лодстар (Lodestar)` and `Рет` (Reth) client names transliterated per ETHGlossary (#113); `Counter`/`лічильник` mixed in the interact tutorial.
- `src/intl/uk/page-use-cases.json`, `page-what-is-ether.json`: trailing-newline flips vs dev (cosmetic, matches en).

**Notes:** `L1`/`L2` casing normalized to uppercase and bare forms (`ETHBEAT`, `L2`) match English; no placeholder leaks, anchors intact, `<GasperFinalityDiagram />` and other new diagram components present.

## PR #19973 (intl/pending-dev) -- 2026-11-26 -- Score 9.0/10
Scope: component-diagrams (5 new diagrams) and dev-tools descriptions (277 keys). 0 critical. Open: `рівні 1 (L1)` / `рівні 2 (L2)` first-mention expansions in 19 diagram values (#112); `Доводжувач` for prover is the glossary form (ru uses `Прувер`); client names transliterated per ETHGlossary (#113).

## PR #19946 (intl/pending-dev) -- 2026-11-26 -- Score 9.2/10
Scope: new `component-account.json` (42 keys) and 19 new `page-start.json` keys.

Fixed: `account-sign-in-wallet` `з Етеріум` -> `з Етеріумом` (glossary citation form left uninflected; `Етеріумі`/`Етеріуму` inflect elsewhere, known-patterns #96). Open: none.

## PR #19902 (intl/pending-dev) -- 2026-11-25 -- Score 8.8/10
Scope: 7-8 re-translated pages (pos, portal-network, optimistic-rollups, zk-rollups, verifying, erc-721-vyper, SQL tutorial, glamsterdam), full PR review, sonnet agents.

Fixed: claim as zatrebuvannya to tverdzhennia (optimistic-rollups), razgornutym typo. Open: Eteriuma vs Eteriumu genitive drift (12 sites in pos), commitment zobov'iazannia vs fiksatsiia, doubled (PBS).

## PR #19815 (intl/pending-dev) -- 2026-11-24 -- Score 9.2/10
Scope: 12 re-translated dev-docs/roadmap pages with interactive diagrams + new `component-diagrams.json` namespace (933 keys), reviewed against English at PR head 86deeb25cd.

Fixed: Etheriumi in attestations description, vyboru forka, eqivokaciya/sleshing, prioritetna komisiya, BLS-pidpys. Open: seed rendered as sid-fraza, `vyprominyuye` for emits.

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.6/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- Cyrillic (brand transliteration or Latin both fine).
- No semantic inversions, no translated hrefs, no cross-script contamination, no transliterated domains. ICU placeholders and rich-text tags intact.
- The placeholder leak was a pipeline artifact (count mismatch in HTML restore), fixed in `json-batcher.ts`/`gemini.ts`; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

## PR #18925 (privacy roadmap + 2 video transcripts) -- 2026-07-27 -- 9.4/10

**Fixed (critical):** `пропонентів блоків` -> `пропонувачів блоків` (`roadmap/privacy` L58). `пропонент` appears nowhere else in the uk tree; 26 files use `пропонувач`, 21 use `пропонувальник`.

**Not fixed (warning):** 4 Latin speaker labels (known-patterns #31); stray U+2066/U+2069 bidi isolates around "Ethereum" in `ethereum-privacy-stack-andy-guzman` L17 with no counterpart in English — invisible when rendered, but a pipeline artifact worth stripping upstream.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.2/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #43 blank line before `{#validators-keys}` restored

**Open (native call needed):**

- #46 `шифровузлів` — a coinage appearing nowhere else in the uk tree.
- #45 `найвільніші`.
- `page-values-card-open-source-description` was rewritten active -> passive with an instrumental agent, which reads heavier than the string it replaced and clashes with its own active sibling `page-values-internet-list-open-code`.

**Notes:**

- uk is the only locale that got #47 right, rendering gatekeeper as `контролер` consistently with its own `page-values-faq-3-p1`.
- Terminology was verified against corpus frequency rather than intuition: `ончейн` (120 vs 21), `будівельник` (~75), `рівня 2 (l2)` lowercase (66 vs 11), `карбувати` for mint (14), `доведення з нульовим розголошенням` (124+).

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.4/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- Heading fix: `## Стійкість мережі {#network-resilience}` -> `## Опірність мережі`, which had collapsed onto the identical rendering of `{#network-sustainability}` and produced duplicate-looking TOC entries. Its agent correctly cleared the PBS compound-vs-bare split as glossary-prescribed (#30).
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.6/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `fee-label-shield-unshield` -> `Комісія за shield/unshield` is the only untranslated fragment in its bloc. Nothing is misstated and the Cyrillic-group rule tolerates Latin for technical terms, but it is opaque to a Ukrainian reader (#57).
- `fee-qualifier-per-card` -> `{value}/картку` (accusative) after a slash; convention is nominative or `за картку`.
- `fee-qualifier-stablecoins-lower-l2` -> `на рівнях 2 (l2)` is a literal plural of "L2s"; singular reads better.

**Notes:**

- Best plural morphology of the four Slavic locales -- correct ACCUSATIVE in the `one` branch (`1 мережу`, `1 мову`), the branch most commonly botched. `Підтримує` + one/few/many all verified.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 8.0/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

JSON inversion: "correct head of the chain" rendered as the chain's `початку` (beginning) -- the opposite end; solo:22 had the correct `вершини`. `виробництво` (manufacturing) for production at 4 dvt sites. "state" polysemy CLEAR (стан, zero держава). Compounding rendered 3 ways across cross-linking pages.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 9.4/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:** none needed -- zero criticals.


**Open (native call needed):**

- `незалежність` (independence) for "sovereignty"; the uk tree uses `суверенітет`/`самосуверенність` at 50+ sites.
- `у нагоді стають` should be `у пригоді` (only occurrence of the error in the uk tree).
- `не маєте жодного впливу` loses the redress sense of "no recourse".
- Highest-scoring locale with zero criticals, alongside it/de.

## PR #19142 (intl/pending-devcon-banner) -- 2026-08-21 -- Score 9.9/10
Scope: new `component-devcon-banner.json` (6 keys). Fleet avg 9.9.

**Open (upstream):**

- `Devcon` kept Latin. No EF Ukrainian localization exists for the reference post (404), and policy 6.2 explicitly forbids deriving Ukrainian transliterations from Russian ("Vitalik is Віталік, not Виталик"). So unlike ru there is not even a weak candidate form. Needs native input; filed in `ethglossary-normalization-queue.md` section 9.
- `Затребуйте` follows the ETHGlossary `claim` entry (`затребування`); reads bureaucratic on a discount banner, same class as ru/pl. See known-patterns #75.

## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 8.4/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/uk/page-apps.json`. 3 critical, 13 warnings. Brand 9/10 | Technical 9/10 | Semantic 8/10 | Consistency 7/10 | Tone 9/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: uk not affected, the clef transcript was already English. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: **regression introduced by this PR**; fixed.
- Bare-acronym over-expansion in `page-apps.json`: collapsed to the ETHGlossary short form.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (uk-specific):**

- `-dao-description`: `керувати` (instrumental) shared one accusative object with `створювати` -> `керувати DAO та створювати їх`; the indeclinable bare `DAO` dissolves the clash outright
- `облікові записи` -> glossary `акаунти`, accusative plural as `матиме` requires

**Notes:**

- The run fixed real prior defects: the invented "smallest fraction of ETH" claim, the MolochDAO possessive, and `Спадкування`.



## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 8.6/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).

**Open (warnings):**

- Not fixed (unchanged lines): `Майкрософт Сек'юріті`, `крипто-твіттері`.
- contributing:92 `злито з` (drained from) regression; open-access `призупинити дію користувача`; `будівник` vs `будівельник`; Hegotá Cyrillic `Гегота` outlier.

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 8.4/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Fixed in this branch:**

- `смартконтракт` -> `смарт-контракт` x2 (glossary).
- English thousands separators read as decimals: `$5,600` -> `$5 600`, `208,000` -> `208 000`.

**Open (warnings):**

- `page-organizations-enterprise.json` missing: placeholder-count gate bug (#85).
- Етеріум undeclined x4 in small-business; settle -> `остаточну фіксацію` misapplied; Prividium misspelled.

## PR #19480 (intl/pending-dev, wagmi backtick retranslation) -- 2026-10-14 -- Score 8.8/10

- Warning: enterprise JSON "production" as manufacturing (`у виробництві`, `виробничого рівня`); `Фінальність остаточної фіксації` tautology; з'єднання/підключення drift in wagmi.

## PR #19486 (intl/pending-dev, networks quarantine release) -- 2026-10-15 -- Score 9.4/10

- Fixed: typo `публіча` -> `публічна` (L200).
- Open: `[Етеріум](/)-мережі` awkward link compound (dev `Мережі [Етеріуму](/)`).

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 8.4/10

Scope: 26 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-{accelerator,events,mentorship}` restored from dev (#81)
- app-plasma:45 Ethereum transliterate (`на додаток до підпису Ethereum.` -> `на додаток до підпису Етеріуму.`)
- app-plasma:337 Ethereum transliterate (`перевіряє підписи Ethereum і відновлює адресу Ethe` -> `перевіряє підписи Етеріуму і відновлює адресу Етер`)
- app-plasma:374 Ethereum transliterate (`160-бітної адреси Ethereum.` -> `160-бітної адреси Етеріуму.`)
- app-plasma:617 Ethereum transliterate (`формату підписання Ethereum у` -> `формату підписання Етеріуму у`)
- app-plasma:617 Ethereum transliterate (`стандартний для Ethereum keccak256` -> `стандартний для Етеріуму keccak256`)
- app-plasma:701 Ethereum transliterate (`стандартну функцію Ethereum` -> `стандартну функцію Етеріуму`)
- app-plasma:950 Ethereum transliterate (`Смарт-контракти Ethereum {#stage-3}` -> `Смарт-контракти Етеріуму {#stage-3}`)
- security:570 Manticore accusative (`Як використовувати Мантікора для` -> `Як використовувати Мантікору для`)

**Open (native call needed):**

- None at critical level.
- 11 warnings in the PR review (see the PR #19556 review body).

**Summary:** The prose is fluent and accurate, especially in the rewritten prediction-markets page and the new wallet descriptions. The criticals are all cases where this run broke wording that was already right on dev: Latin `Ethereum` in app-plasma, the Manticore case ending, and the three English founders tags.

## PR #19568 (intl/pending-dev) -- 2026-10-22 -- Score 9.6/10
Scope: 6 repaired developer tutorials (hello-world, mint/view/write NFT series, sending-transactions, using-websockets), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Duplicated `json` response block in how-to-write-and-deploy-an-nft removed (known-patterns #93)
- Code-fence drift restored from English: `sh` tags, `npm install dotenv` (known-patterns #92)

**Notes:**

- No Russian contamination. Warnings: decimal separator; MetaMask UI labels given only in Ukrainian.

## PR #19803 (intl/pending-dev) -- 2026-11-16 -- Score 9.6/10
Scope: 2 repaired developer tutorials (develop-and-test-dapps-with-a-multi-client-local-eth-testnet, how-to-use-echidna-to-test-smart-contracts), changed lines only. creating-a-wagmi-ui-for-your-contract was quarantined at the gate in all 24 locales (known-patterns #97). Scores are for the PR's initial state.

**Fixed in this branch:**

- echidna:54 `Фазер` (singular) with plural verb -> `Фазери`
- echidna:282 ABI glossary insertion split "ABI signature" -> `підпис двійкового інтерфейсу програми (ABI)`

**Open / notes:**

- multi-client: account as both `обліковими записами` (code comment) and `акаунти` (prose) -- informational

## PR #19901 (intl/pending-dev) -- 2026-11-25 -- Score 8.8/10
Scope: gas page, translation-program page, page-developers-index.json (3 files), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Gas page inline code spans restored to English (known-patterns #101 recurrence)

**Open / notes:**

- `tip` -> `надбавка`/`заохочення`; `повинна бути принаймні не меншою` says "at least" twice (gas:89); `акаунт` vs `рахунок` in one paragraph.
- `page-developers-index.json` lost its final newline vs dev (matches en; cosmetic)
