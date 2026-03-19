# Arabic (ar) Gemini Re-translation Queue

> **PR:** #17105
> **Date:** 2026-03-18
> **For use with:** gemini.google.com (interactive, not CLI)
> **Worktree:** .worktrees/pr-17105

## Prompt Template

Paste this at the start of your Gemini session, then feed files one at a time:

```
I need you to fix Arabic translations for ethereum.org. I'll give you the English source and the broken Arabic translation for each file. Fix ONLY the specific issues I note -- keep all existing correct Arabic intact.

Translation rules:
- Transliterate brand/product names into Arabic script (Ethereum = إيثريوم, Solidity = سوليديتي, GitHub = غيت هاب, MetaMask = ميتاماسك, Hardhat = هارد هات)
- KEEP in Latin: ticker symbols (ETH, ERC-20, EIP-1559), URLs, domain names, code identifiers, frontmatter tags that are brand names
- Use Western Arabic numerals (1, 2, 3) -- NOT Eastern Arabic
- Wrap bare numeric dates in RTL with: <span dir="ltr">YYYY-MM-DD</span>
- Glossary terms (MUST use these exact translations):
  - proof-of-stake = إثبات الحصة
  - proof-of-work = إثبات العمل
  - validator = مُدقِّق (NOT عميل الإجماع, NOT المحقق)
  - staking = التحصيص (NOT تجميد العملات, NOT المراهنة, NOT التخزين)
  - state = حالة (NEVER الدولة/الجنسية/الحكومية -- those mean nation-state)
  - block = بلوك (NOT حاجز)
  - gas = الغاز
  - node = عقدة
  - smart contract = عقد ذكي
  - oracle = خدمة أوراكل (NOT العراف/المقدسة)
  - stablecoin = عملة مستقرة (NOT العملة التابعة)
  - mainnet = الشبكة الرئيسية
  - beacon chain = سلسلة المنارة
  - rollup = الرول أب
  - MEV = أقصى قيمة قابلة للاستخراج (NOT vehicles/SUVs)
- Formal Modern Standard Arabic register
- Preserve all markdown syntax, HTML tags, code blocks, and frontmatter structure exactly
- Do NOT translate content inside code fences (``` blocks)
- Code comments (// and /* */) inside code fences MAY be translated

For each file I share, output ONLY the corrected Arabic markdown. No explanations needed.
```

## Priority 0: CATASTROPHIC STRUCTURE DAMAGE

### 0. public/content/translations/ar/developers/tutorials/uniswap-v2-annotated-code/index.md
**Issue:** The `_mintFee` section (~line 557+) has catastrophic code fence drift -- code and prose are mixed on same lines, backticks misplaced, table syntax leaked into code blocks. The entire section from `_mintFee` onward needs to be restructured from the English source with Arabic prose replacing English prose. Compare carefully against English source starting at line 394.
**English source:** public/content/developers/tutorials/uniswap-v2-annotated-code/index.md

## Priority 1: COMPLETELY BROKEN (wrong language / renders garbage)

### 1. src/intl/ar/page-roadmap.json
**Issue:** ~60% of content is in IGBO (Nigerian language), not Arabic
**Action:** Compare against English src/intl/en/page-roadmap.json, re-translate all Igbo strings to Arabic
**English source:** src/intl/en/page-roadmap.json

### 2. src/intl/ar/page-what-is-ethereum.json
**Issue:** Many values have Latin-script romanized Arabic appended (e.g., "shabakat ealamiat min almuhaqiqin...") that renders as visible garbage to users
**Action:** Remove all romanized transliterations, keep only the Arabic script text
**English source:** src/intl/en/page-what-is-ethereum.json

### 3. src/intl/ar/page-developers-docs.json
**Issue:** Contains Farsi text instead of Arabic in some values
**Action:** Replace Farsi strings with proper Arabic translations
**English source:** src/intl/en/page-developers-docs.json

### 4. src/intl/ar/glossary-tooltip.json
**Issue:** Multiple wrong terms:
- "validator-term" = "عميل الإجماع" (consensus client) -> should be "مُدقِّق"
- "block-term" = "حاجز" (barrier) -> should be "بلوك"
- "staking-pool-term" = "تجمع عمادا" (nonsense) -> should be "تجمع التحصيص"
- "poap-term" = "مكتب حماية المستهلك" (Consumer Protection Office) -> should be "بروتوكول إثبات الحضور (POAP)"
- "erc-1155-term" = "جسر نقل اختباري" (experimental transfer bridge) -> should be "ERC-1155"
- "stablecoin-term" = "العملة التابعة" -> should be "عملة مستقرة"
- Multiple definitions left in English (execution-layer, mainnet, block-header, block-time, block-reward, casper-ffg)
**English source:** src/intl/en/glossary-tooltip.json

### 5. src/intl/ar/glossary.json
**Issue:** "block-term" = "حاجز" (barrier) -> should be "بلوك"; multiple definitions in English
**English source:** src/intl/en/glossary.json

### 6. src/intl/ar/page-resources.json
**Issue:** Extensive garbled text, wrong descriptions (MEV-boost = stablecoins text), missing brand names, garbled transliterations (باريوم, ليثيرون, الغويرية for Ethereum)
**English source:** src/intl/en/page-resources.json

### 7. src/intl/ar/page-trillion-dollar-security.json
**Issue:** Multiple garbled Ethereum transliterations (باريوم, ليثيرون, بالغويرية), truncated strings
**English source:** src/intl/en/page-trillion-dollar-security.json

## Priority 2: SEMANTIC INVERSIONS (meaning is opposite/wrong)

### 8. public/content/translations/ar/what-are-apps/index.md
**Issue:** Line ~18 says "إيثريوم مركزية" (Ethereum is CENTRALIZED) -- must be "لا مركزية" (decentralized)
**English source:** public/content/what-are-apps/index.md

### 9. public/content/translations/ar/developers/docs/mev/index.md
**Issue:** MEV interpreted as "multi-purpose electric vehicles/SUVs" in multiple places. The abbreviation MEV = أقصى قيمة قابلة للاستخراج (Maximal Extractable Value)
**English source:** public/content/developers/docs/mev/index.md

### 10. public/content/translations/ar/developers/docs/oracles/index.md
**Issue:** "oracle" translated 5+ ways including "العراف" (fortune teller), "المقدسة" (sacred), "الأدرياتيكي" (Adriatic). Also garbled word repetition ("بلوكتشينبلوكتشينبلوكتشين..."). Needs full re-translation.
**English source:** public/content/developers/docs/oracles/index.md

### 11. public/content/translations/ar/community/research/index.md
**Issue:** "liquid staking" translated as "الرهن العقاري السائل" (liquid MORTGAGE). Also "state" as "الولاية" (political state) in several places.
**English source:** public/content/community/research/index.md

### 12. public/content/translations/ar/developers/docs/web2-vs-web3/index.md
**Issue:** "ether" translated as "الإيثار" (altruism) instead of "الإيثر"
**English source:** public/content/developers/docs/web2-vs-web3/index.md

## Priority 3: "STATE" POLYSEMY (computational state mistranslated as political state)

All of these use "الدولة" (nation-state), "الحكومية" (governmental), or "الجنسية" (nationality) where "الحالة" (condition/state) is correct:

### 13. public/content/translations/ar/developers/docs/scaling/state-channels/index.md
**Issue:** Title "قنوات الدولة" and throughout -- should be "قنوات الحالة"

### 14. public/content/translations/ar/roadmap/statelessness/index.md
**Issue:** Title "انعدام الجنسية" (statelessness as nationality) -- should be "انعدام الحالة"

### 15. public/content/translations/ar/developers/docs/scaling/optimistic-rollups/index.md
**Issue:** "بيانات الدولة", "التزامات الدولة", "جذور الدولة" throughout

### 16. public/content/translations/ar/developers/docs/scaling/plasma/index.md
**Issue:** Same "الدولة" pattern

## Priority 4: WRONG FRONTMATTER TITLES

### 17. public/content/translations/ar/developers/docs/consensus-mechanisms/pos/gasper/index.md
**Issue:** title = "اسم لنظام" ("name for a system") -- should be "غاسبر" or transliteration
**English title:** "Gasper"

### 18. public/content/translations/ar/developers/docs/consensus-mechanisms/pos/weak-subjectivity/index.md
**Issue:** title = "اداة ضعيفه" ("weak tool") -- should be "الذاتية الضعيفة"
**English title:** "Weak subjectivity"

### 19. public/content/translations/ar/developers/docs/consensus-mechanisms/pos/block-proposal/index.md
**Issue:** title = "كتلة العرض" ("display block") -- should be "اقتراح الكتلة"
**English title:** "Block proposal"

### 20. public/content/translations/ar/developers/docs/programming-languages/elixir/index.md
**Issue:** title = "إيثريوم لمطوري ماليزيا" ("Malaysian developers") -- should be "إيثريوم لمطوري إكسير"
**English title:** "Ethereum for Elixir developers"

### 21. public/content/translations/ar/developers/docs/networking-layer/index.md
**Issue:** title = "طبقة" (just "layer") -- should be "طبقة الشبكة"
**English title:** "Networking layer"

## Priority 5: LARGE UNTRANSLATED ENGLISH BLOCKS

These files have substantial English paragraphs mixed into Arabic. Feed the English source and ask Gemini to translate the English passages while preserving the existing Arabic:

```
public/content/translations/ar/developers/docs/consensus-mechanisms/pos/index.md
public/content/translations/ar/developers/docs/blocks/index.md
public/content/translations/ar/developers/docs/apis/json-rpc/index.md
public/content/translations/ar/developers/docs/networks/index.md
public/content/translations/ar/developers/docs/nodes-and-clients/index.md
public/content/translations/ar/developers/docs/scaling/index.md
public/content/translations/ar/developers/tutorials/nft-minter/index.md
public/content/translations/ar/developers/tutorials/secure-development-workflow/index.md
public/content/translations/ar/developers/tutorials/using-websockets/index.md
public/content/translations/ar/developers/tutorials/how-to-implement-an-erc721-market/index.md
public/content/translations/ar/developers/tutorials/merkle-proofs-for-offline-data-integrity/index.md
public/content/translations/ar/developers/tutorials/how-to-write-and-deploy-an-nft/index.md
public/content/translations/ar/community/get-involved/index.md
public/content/translations/ar/community/events/organizing/index.md
public/content/translations/ar/contributing/adding-staking-products/index.md
```

## Progress Tracker

| # | File | Status |
|---|------|--------|
| 1 | page-roadmap.json | TODO |
| 2 | page-what-is-ethereum.json | TODO |
| 3 | page-developers-docs.json | TODO |
| 4 | glossary-tooltip.json | TODO |
| 5 | glossary.json | TODO |
| 6 | page-resources.json | TODO |
| 7 | page-trillion-dollar-security.json | TODO |
| 8 | what-are-apps/index.md | TODO |
| 9 | mev/index.md | TODO |
| 10 | oracles/index.md | TODO |
| 11 | community/research/index.md | TODO |
| 12 | web2-vs-web3/index.md | TODO |
| 13-16 | state-channels, statelessness, optimistic-rollups, plasma | TODO |
| 17-21 | Wrong titles (5 files) | TODO |
| P5 | 15 files with untranslated English | TODO |
