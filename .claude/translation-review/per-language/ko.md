# Korean (ko) Translation Review Findings

## PR #19946 (intl/pending-dev) -- 2026-11-26 -- Score 9.2/10
Scope: new `component-account.json` (42 keys) and 19 new `page-start.json` keys.

Fixed: none needed. Open: `page-start-steps-wallet-title` `지갑 만들기` ('create') for 'Get a wallet'; the step links to choosing a wallet, `지갑 받기`/`지갑 선택하기` fits better.

## PR #19902 (intl/pending-dev) -- 2026-11-25 -- Score 8.5/10
Scope: 7-8 re-translated pages (pos, portal-network, optimistic-rollups, zk-rollups, verifying, erc-721-vyper, SQL tutorial, glamsterdam), full PR review, sonnet agents.

Fixed: truncated non-word 컨트랙 x2 files, opcode 옵코드 to 연산 코드. Open: enter as 입력 (should be 진입), 컴파일 vs 컴파일링, 발신자 vs 송신자, doubled EVM acronym.

## PR #19815 (intl/pending-dev) -- 2026-11-24 -- Score 8.6/10
Scope: 12 re-translated dev-docs/roadmap pages with interactive diagrams + new `component-diagrams.json` namespace (933 keys), reviewed against English at PR head 86deeb25cd.

Fixed: placeholder rebinding in 6 sites across 4 JSON keys, truncated `commitment`, The Merge as meojji. Open: Engine API Latin/Hangul split, History network wording.

> **PR:** #18418 (intl/pending-dev)
> **Date:** 2026-06-16
> **Quality Score:** 9.6/10
> **Files reviewed:** 21 UI-string JSONs

## Issues Found

| Severity | File | Key | Issue | Fix |
|----------|------|-----|-------|-----|
| Critical (fixed) | glossary-tooltip.json | ommer-definition | Leaked sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-7ff424>` (pattern 22) | Restored to `<a href="/glossary/#pow">` |

## Notes

- CJK-phonetic (Hangul transliteration of brands is correct).
- No semantic inversions, no translated hrefs, no cross-script contamination, no transliterated domains. ICU placeholders and rich-text tags intact.
- The placeholder leak was a pipeline artifact (count mismatch in HTML restore), fixed in `json-batcher.ts`/`gemini.ts`; see `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.4/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored
- #44 `Arbitrum One` de-hybridised in `app-session-description`

**Open (native call needed):**

- #45 "free-est" -> `가장 자유로우며` (liberty sense).
- `page-values-internet-list-censorship` "Access no one can block" -> `접근성`, which means *accessibility* (a11y) in Korean tech writing; the pre-PR `접근 권한` was tighter.

**Notes:**

- The collateral `갖습니다` -> `가집니다` reword on the 42-character-address sentence is **neutral** — both are standard 합니다체 forms of 가지다.
- `page-values-cost-inevitable` fixed a real prior error: old `이 모든 것이 불가피한 것은 아닙니다` was a partial negation ("not *all* of this is inevitable"); new `이 중 어느 것도` correctly renders "none of this".

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 8.7/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `exposure` -> `노출` in `bridges/index.md` (was `투자`/invest, which the next sentence contradicts); ko `learn-quizzes.json` already used 노출 for the identical English. Open: L2/wallet brand names Latin-vs-Hangul split in `page-what-is-ethereum.json`.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.2/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `hardware-hero-description` -> `장기 투자` adds investment framing absent from "Holding for the long run?", and contradicts its own sibling `장기 보관`. See #58.
- `finance-hero-title` -> `탈중앙화 금융(DeFi) 및 금융용 지갑` reads "decentralized finance (DeFi) and finance wallets"; glossary-legal but ja/zh/zh-tw keep the bare acronym in titles.
- `crops-secure` -> `보안` is a noun and byte-identical to `page-find-wallet-security`, losing the EN Security/Secure split; `안전` carries the adjective sense.

**Notes:**

- Strongest `fee-row-label` in its bloc (`수수료 부과 항목`). `쉴드/언쉴드` correctly transliterates the privacy-pool term.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.2/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Truncated word `스마트 컨트랙` (not a word). saas:71 rendered majority-client as `다수의` (many clients), inverting the risk. `Mainnet` left Latin against glossary. JSON risk bullet flattened "Your ETH is at stake" into "your ETH gets staked", removing the risk framing. Launchpad rendered 3 ways.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 8.8/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**

- `계약` -> `컨트랙트` for smart contracts, against a glossary note that explicitly forbids `계약`.
- `오픈소스` -> `오픈 소스` at 41 sites, aligning the page with `common.json`/`page-values.json` and tree precedent (194:16 spaced). Before the fix the /values CTA and the page title it links to disagreed.

**Open (native call needed):**

- `capture` -> `독점` (market monopoly); corporate capture is `장악`/`사유화`.
- `Survey of blockchain oracles` -> `설문조사` (questionnaire); the pre-PR line had the correct `조사`.
- `Zero Knowledge podcast` proper name translated.

## PR #19142 (intl/pending-devcon-banner) -- 2026-08-21 -- Score 10.0/10
Scope: new `component-devcon-banner.json` (6 keys). Fleet avg 9.9.

**No change needed. ko was the reference implementation.**

ko was the only locale of 24 that transliterated the event name (`데브콘`). The reviewer first flagged it as the outlier and changed it to Latin, then reverted: transliteration is correct per policy, and the fleet's Latin-everywhere habit was the actual defect. Eight other locales were brought in line with ko in this PR. See known-patterns #74.

`logo-alt` was changed to Latin `Devcon VIII 인도` -- that key is the formal title lockup plus image alt text, which stays Latin in every locale (24/24 after this PR).


## PR #19228 (intl/pending-devcon-banner-copy) -- 2026-09-04 -- Score 9.6/10
Scope: 1 key (`discount-headline`) replacing `headline` + `subtitle` in `component-devcon-banner.json`. Fleet 24/24 clean on the code check.

**Fixed in this branch:**

- Trailing full stop removed. ko was the only locale of 24 to add sentence-final punctuation the English source does not have (`...청구하세요.` -> `...청구하세요`); the English copy is deliberately stop-free because the string renders as a banner headline, not a sentence. Every other locale, including the two that also render it mid-paragraph-length, matched the source.

**Verified clean:**

- `ETHORG10` byte-identical. The suffixed form `ETHORG10을` is correct Korean -- object particle, not a mutation of the code (known-patterns #78).
- `일반 입장권` for `General Admission` is one of four fleet treatments; not a ko defect, pending the glossary entry (known-patterns #77, normalization-queue section 10).
- `데브콘` preserved in `title` and Latin `Devcon VIII 인도` preserved in `logo-alt` -- incremental mode left both untouched, so the #19142 hand-corrections survived the English source moving.

## PR #19326 (intl/pending-dev) -- 2026-09-28 -- Score 8.0/10

Scope: `developers/docs/accounts/index.md`, `smart-contracts/languages/index.md`, `smart-contracts/testing/index.md`, `src/intl/ko/page-apps.json`. 3 critical, 12 warnings. Brand 8/10 | Technical 7/10 | Semantic 8/10 | Consistency 7/10 | Tone 10/10. Fleet average 8.1 across 24 locales.

**Fleet-wide patterns (see known-patterns #79/#80):**

- Translated Geth/`clef` console output: ko affected on the full block; restored byte-exact from the English source. 17 of 24 locales hit.
- Whitehat parenthetical at `testing/index.md:245`: not affected.
- Bare-acronym over-expansion in `page-apps.json`: collapsed to the ETHGlossary short form; **DeFi** left expanded, ko has no bare short form in the `ui`/`tag` context.
- Trailing newline stripped at EOF by this run's writer; restored. Cosmetic only, no gate was checking it.

**Fixed in this branch (ko-specific):**

- truncated non-word `스마트 컨트랙` -> `스마트 컨트랙트`, matched with a negative lookahead so the line the PR already fixed stayed untouched
- `파운데이션` -> `Foundation`, the foundation.app marketplace name; 21/24 locales keep it Latin

**Notes:**

- Bare-acronym over-expansion hit 18 `page-apps` keys. The `DeFi` ones stay expanded: ko is the only locale whose `ui` context for that term is itself the full phrase.



## PR #19357 (intl/pending-dev, full sweep) -- 2026-09-30 -- Score 8.9/10

Scope: full sweep, ~191-198 files. Sampled for idiom: largest prose diffs; glossary triage over scripted candidates restricted to changed lines.

**Fixed in this branch:**

- `page-find-wallet-private-transactions-desc` restored from the pre-rename `page-find-wallet-privacy-desc` value (shipped in English fleet-wide, known-patterns #81).

**Open (warnings):**

- privacy-online L162 "outside wealthy countries" rendered as outskirts; L57 `강력 옵션` missing adnominal.
- Brand script mixed within privacy-online (`크롬`/`페이스북` Hangul, Google/Safari/Brave Latin) -- native convention call.

## PR #19474 (intl/pending-dev, /organizations namespaces) -- 2026-10-14 -- Score 9.0/10

Scope: full PR diff, ~27 files (8 new page-organizations*.json, common.json, small MD href/EIP updates). Label/meta acronym trim applied fleet-wide (known-patterns #86).

**Fixed in this branch:**

- `enterprise-privacy` truncated `프라이빗 체에서` -> `프라이빗 체인에서`.

**Open (warnings):**

- `보장` (guarantee) for promise blurs the page's promise-vs-guarantee contrast; Visa/Revolut script split; 그랜트/보조금.

## PR #19556 (intl/pending-dev, run 39679413921) -- 2026-10-21 -- Score 8.6/10

Scope: 25 files (smart-contracts/security + app-plasma retranslations, prediction-markets, scam-token-tricks, new `page-wallet-descriptions` / `component-catalog-item`, founders/stories JSON).

**Fixed in this branch:**

- `page-founders-tag-{accelerator,events,mentorship}` restored from dev (#81)

**Open (native call needed):**

- None at critical level.
- 14 warnings in the PR review (see the PR #19556 review body).

**Summary:** The Korean prose is fluent and complies with ETHGlossary. The main defects come from the pipeline: acronym expansion in descriptions and three untranslated founders tags that hit the whole fleet. There are a few term-level semantic slips (agnostic, mandate) and some cross-file wording inconsistencies.

## PR #19568 (intl/pending-dev) -- 2026-10-22 -- Score 9.0/10
Scope: 6 repaired developer tutorials (hello-world, mint/view/write NFT series, sending-transactions, using-websockets), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Duplicated `json` response block in how-to-write-and-deploy-an-nft removed (known-patterns #93)
- Code-fence drift restored from English: `sh` tags, `npm install dotenv` (known-patterns #92)
- `비엠`/`알케미` brand tags restored to `viem`/`alchemy` (sending)
- 2 captions in the mint tutorial that had reverted to English restored from dev

**Notes:**

- `<strong>`/`<em>` instead of `**`/`*` is deliberate. Out of scope: transliterated author `엘란 할펀` in sending.

## PR #19803 (intl/pending-dev) -- 2026-11-16 -- Score 9.4/10
Scope: 2 repaired developer tutorials (develop-and-test-dapps-with-a-multi-client-local-eth-testnet, how-to-use-echidna-to-test-smart-contracts), changed lines only. creating-a-wagmi-ui-for-your-contract was quarantined at the gate in all 24 locales (known-patterns #97). Scores are for the PR's initial state.

**Fixed in this branch:**

- multi-client:244 closing sentence reversed ("we want to hear answers to questions") -> `...의견을 듣고 싶으며, 궁금한 점이 있으면 답변해 드리겠습니다.`

**Open / notes:**

- echidna: glossary noun `되돌리기` verbalized (`되돌리기됩니다`) at 4 sites; natural `되돌려집니다` -- native call (#96)
- Particle allomorphs after inline code (`config.yaml`를 -> 을, etc.) at ~11 sites -- fluency
- echidna author `트레일오브비츠` vs Latin in 3 of 5 ko tutorials -- informational

## PR #19901 (intl/pending-dev) -- 2026-11-25 -- Score 9.0/10
Scope: gas page, translation-program page, page-developers-index.json (3 files), changed lines only. Scores are for the PR's initial state.

**Fixed in this branch:**

- Gas page inline code spans restored to English (known-patterns #101 recurrence)
- After the span restore line 34 reads `base fee`(기본 수수료)와 `priority fee`(우선순위 수수료, 팁).

**Open / notes:**

- `단어` for "term" (translation-program:23); gas:69/:75 fluency regressions vs dev.
- `page-developers-index.json` lost its final newline vs dev (matches en; cosmetic)
