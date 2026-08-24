# Arabic (ar) Translation Review Findings

> **PR:** #17105
> **Date:** 2026-03-17
> **Quality Score:** 5.2/10 (pre-fix)
> **Files reviewed:** 299 (excluding gaming)

## Glossary Terms (107 from EthGlossary API)

Key terms to verify in future reviews:
- proof-of-stake = إثبات الحصة
- proof-of-work = إثبات العمل
- consensus = إجماع
- smart contract = عقد ذكي
- validator = مُدقِّق (NOT عميل الإجماع, NOT المحقق)
- staking = التحصيص (NOT تجميد العملات, NOT المراهنة, NOT التخزين, NOT التوقيع المساحي)
- mainnet = الشبكة الرئيسية
- gas = الغاز
- node = عقدة
- state = حالة (NOT الدولة, NOT الجنسية, NOT الحكومية)
- block = بلوك (NOT حاجز)
- stablecoin = عملة مستقرة (NOT العملة التابعة)
- beacon chain = سلسلة المنارة
- rollup = الرول أب
- oracle = خدمة أوراكل

## Issues Fixed by Sanitizer

| Fix | Count | Details |
|-----|-------|---------|
| Brand garbles (GitHub) | 82 | "يجتبه" -> "غيت هاب" across 15 dev docs files |
| Brand garbles (Solidity) | 3 | "الصلابة" -> "سوليديتي" in Waffle tutorial tags |
| Duplicated tag values | 6 | "ERC-721ERC-721" -> "ERC-721" in 5 files |
| Crowdin boilerplate | 1 | Stripped from transactions/index.md |
| Stripped abbreviations | 2 | Restored (RWA) and (PoA) in frontmatter |
| Angle bracket escaping | 2 | Raw `<` before numbers |
| Inline block components | 18 | ai-agents, staking/solo |
| Heading anchor fixes | 3 | Junk text, non-ASCII IDs |
| LLM artifact tokens | 1 | `<bos>` stripped from how-to-translate |
| Link bracket fixes | 7 | Missing `[` in markdown links |
| Backtick fixes | 1 | Asymmetric pair |
| Bold/italic markers | 4 | Crowdin escaping |
| Tilde escaping | 3 | Prevent strikethrough |
| HTML tag collapsing | 5 | Match English structure |
| Blank line restoration | 2 | From English source |

## Issues Requiring Manual Review

### Critical (build-breaking or meaning-changing)
- **Igbo contamination:** page-roadmap.json ~60% in Igbo language
- **Semantic inversion:** what-are-apps/index.md says "Ethereum is centralized"
- **Romanized Arabic:** page-what-is-ethereum.json has Latin romanizations visible to users
- **Farsi text:** page-developers-docs.json has Farsi instead of Arabic
- **Broken MDX tags:** `<0>`/`</0>` in ai-agents, restaking
- **Broken ButtonLink:** payments/index.md

### High (semantic errors)
- **"State" polysemy:** "الدولة" (nation-state) in state-channels, statelessness, scaling -- should be "الحالة"
- **MEV as "SUVs":** mev/index.md interprets MEV as electric vehicles
- **Oracle as "fortune teller"/"sacred systems":** oracles/index.md severely corrupted
- **Validator as "consensus client":** glossary-tooltip.json
- **Block as "barrier":** both glossary files
- **POAP as "Consumer Protection Office":** glossary-tooltip.json
- **Liquid staking as "liquid mortgage":** community/research/index.md
- **Elixir page titled "Malaysian developers":** elixir/index.md
- **Meaningless titles:** gasper ("name for a system"), weak-subjectivity ("weak tool")

### Medium (untranslated content)
- 20+ files with substantial English paragraphs left untranslated
- Partial translations in: nft-minter, secure-development-workflow, using-websockets, pos/index.md, blocks/index.md, json-rpc/index.md
- Corrupted text in storage/index.md (romanized Arabic in Latin script)
- Multiple English sentences mixed into Arabic in community/get-involved

### Low (consistency)
- 6+ different Ethereum transliterations (needs standardization)
- 5 different staking terms (needs glossary alignment)
- Inconsistent oracle terminology
- "GitHub" garble now fixed but "Discord" and others need transliteration script

## Arabic-Specific Notes

- Arabic is RTL; formal Modern Standard Arabic (MSA) register maintained throughout
- Transliteration of proper nouns is standard practice: "Ethereum" -> "إيثيريوم"
- Glossary has "إيثريوم" (without extra ي) -- community may prefer either form
- Cross-script contamination detected: CJK characters (以, 太, 坊, 年, 月, 日) in translators-guide
- Arabic question mark (؟) used inconsistently vs Latin (?)

---

## PR #18418 (intl/pending-dev) -- 2026-06-16 -- Score 9.6/10

- 21 UI-string JSONs reviewed. 1 critical fixed: `glossary-tooltip.json` `wei-definition` leaked a sanitizer placeholder `<HTML-PLACEHOLDER-HTMLTAG-063f8a>` -> restored to `<a href="/glossary/#wei">` (pattern 22; pipeline fixed to prevent recurrence).
- Prior ar failure modes (Igbo/Farsi contamination, GitHub garble, "state"=nation-state, transliterated domains, semantic inversions) did NOT recur. MSA register consistent. Note: current ETHGlossary table now gives staking=التخزين and validator=مُدَقِّق -- translations follow the API (authoritative) over this file's older entries.

## PR #18772 (community-stories.json, 2026-07-10) -- 9.6/10
- CRIT fixed: story-dorgo-eth bidi-isolated untranslated "March 2020" -> مارس 2020. Same artifact existed in ur -- grep English month names in RTL files on every import.
- Ethereum/Bitcoin transliteration consistency was PERFECT across 26 entries (major improvement over PR #17105's 5-variant drift).
- Open judgment call: MoneyGram/Western Union kept Latin vs PayPal transliterated باي بال (both non-glossary; fleet-wide inconsistency, not fixed).

## PR #18937 (intl/pending-content-translation-program-remove-recruitment-pages) -- 2026-07-29 -- Score 8/10 pre-fix
- The `mode=full` regeneration of `translators-guide/index.md` **stripped the English Crowdin UI labels** from five instruction lines (`'إخفاء' (Hide)` -> `'إخفاء'`). Crowdin's interface is English-only, so the reader could no longer match the instruction to the button. Restored, wrapped in `<span dir="ltr">` per this file's own pattern rather than bare as dev had them.
- The terms-without-established-translations line invented `(PoW)`/`(PoS)` abbreviations not in the source and dropped the English glosses, leaving `التخزين` ("storage", a weak rendering of *staking*) with nothing to disambiguate it. Restored to full English glosses.
- Not patched: tashkeel dropped from ~6 passive verbs while others kept theirs (internally inconsistent but not wrong), and موضع -> وضع for "placement" (vaguer, not incorrect).
- Wins from the same run: `الأسماء الصحيحة` -> `أسماء الأعلام` (correct term for proper nouns), `نص الكتابة` -> `نظام الكتابة`, and three new LTR spans on the date-format examples.

## PR #18942 (intl/pending-dev) -- 2026-08-05 -- Score 9.6/10
Scope: accounts `CREATE2` + `page-app-descriptions`/`page-apps`/`page-developers-tools-descriptions`/`page-values`.

**Fixed in this branch:**

- #42 `{#contract-accounts}` heading restored from the pre-PR blob
- #43 blank line before `{#validators-keys}` restored
- #44 `Arbitrum One` de-hybridised in `app-session-description`

**Open (native call needed):**

- `app-session-description` was the only brand issue and it is fixed; nothing else substantive.

**Notes:**

- `salt` is LTR-wrapped consistently with the 11 existing `<span dir="ltr">` spans in the same file.
- `بسك` for game-sense mint is the established ar crypto verb (5 prior uses), not the coin-minting failure mode.

## PR #19015 (intl/pending-dev) -- 2026-08-10 -- Score 7.2/10 (pre-fix)

- Scope: 11-12 files (8-9 markdown + common / learn-quizzes / page-what-is-ethereum JSON). Fleet avg 8.4.
- `common.json` zero-knowledge-proofs root `براهين` -> `إثباتات` (ETHGlossary uses إثبات; learn-quizzes already had it right 9x). Brand transliterations still owed in `learn-quizzes.json`/`page-what-is-ethereum.json` (Optimism/Arbitrum/Aave/MakerDAO/ZK-STARK, `فاليديم`->`فاليديوم`) -- left for a native pass.
- Fleet-wide items fixed in this branch for every locale: the `<p></p>` MDX build-breaker (8 locales), the `.pdf` autolink corruption (#50), the deleted `{#will-my-smart-contracts-change}` FAQ section (#32), the missing `<QuizWidget>` component (#49), and the two stale glamsterdam prose clauses (#51 -- `Q4 2026` and the stakers/liquidity sentence).

## PR #19076 (intl/find-wallet-translations) -- 2026-08-14 -- Score 9.6/10

Scope: `page-wallets-find-wallet.json` only -- 47 added keys (persona hero copy + a new `page-find-wallet-fee-*` disclosure cluster), 1 changed (`persona-legend` filter -> browse), 5 removed. Fleet avg 9.35.

**Fixed in this branch:** none -- no critical issues.

**Open (native call needed):**

- `hardware-hero-title` "long-term storage" -> `التخزين`, which ETHGlossary mandates for **staking** and this file uses for staking in 4 keys -- the hero now reads "wallets for long-term staking". Suggest `محافظ لحفظ الأصول على المدى الطويل`. Not a glossary deviation; the collision is induced by the glossary's own staking choice.
- `fee-qualifier-free-under-fox-discounts` -> `مجانية أقل من {usd}` is telegraphic ("free less-than $1,000"); prefer `مجانية لما يقل عن {usd}`.
- `see-all-wallets` is byte-identical to the pre-existing `-showing-all-wallets`. The CTA is right; the fix belongs on the status key (`يتم عرض جميع المحافظ`).

**Notes:**

- Isolates verified: 42 U+2066 / 42 U+2069, zero unbalanced, no legacy embedding controls. Applied inconsistently though -- Latin literals are isolated, every fee-cluster placeholder is bare. Bidi ordering resolved by hand for `{value}/بطاقة`, `{value}/شهر` and the nested-paren L2 string: all correct under RTL base direction, so consistency item only.
- Zero glossary deviations across all 14 matched terms.

## PR #19115 -- staking redesign (6 MD + 1 JSON), 2026-08-19

**Score: 7.9/10** (fleet avg 7.8 -- lowest recorded in this series; the gap is structural, not linguistic)

Solvency slip `ملاءمة`->`ملاءة` in a saas risk bullet; `fork` as `الشوكات` (cutlery) vs glossary `تفرع`; English dates bidi-isolated in page-staking.json (recurrence of #18772); frontmatter LRI wrapping pure Arabic in dvt. Historic modes CLEAR: no `الدولة` for computational state, no GitHub garble, no MEV-as-vehicles, single consistent `إيثيريوم`.

Fleet-wide defects also present in this locale (see known-patterns #60-64): heading-anchor rotation in `run-a-node`, reverted `<Card title>` attributes, untranslated image alt text, and the `</ExpandableCard>` -> `</ButtonLink>` MDX breaker. All repaired in this PR.

## PR #19034 (intl/pending-dev) -- 2026-08-20 -- Score 8.8/10
Scope: new `page-open-source.json` (228 keys) + retranslated `community/research/index.md`, plus 3 single-key JSON changes. Fleet avg 8.67, median 8.80.
**Fixed in this branch:**
- `Robust Incentives Group` restored to English at 5 sites -- the name had been semantically translated with no English retained, making the EF team unsearchable.

- `page-open-source-copyleft-description-2` distributed "the Solidity compiler" across all four names, making Prysm/Nethermind/Grandine read as compilers. Swept all 24 locales -- ar was the only one that got this wrong.

**Open (native call needed):**

- `hexary` -> `السداسية` ("six-fold") against 30+ tree uses of `سداسية عشرية`.
- ETHGlossary's ar `validator` entry `مُدَقِّق` has SHADDA U+0651 before KASRA U+0650 -- non-canonical order. It appears 8x here and flipped this file from NFC to non-NFC. Upstream glossary fix, not a per-file one.
