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
