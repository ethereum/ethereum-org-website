# Known Translation Patterns & Issues

> This is a living document. Updated after each language review.
> Last updated: 2026-08-20 (PR #19034 full pipeline, 24 langs: **bracket-placeholder blanks are a coverage gap `verify-structure` cannot see** (11 locales), character-level generation corruption in 3 locales, the semantic-translation-of-an-org-name split, `soundness`/`test harness` as glossary gaps, the ar `validator` glossary entry breaking NFC, and the rule that a dominant-but-wrong tree form must be fixed globally or not at all; fleet avg 8.67)
> Previous: 2026-08-14 (PR #19076 find-wallet JSON, 24 langs: **ETHGlossary's own term data is the defect source** for lowercased acronym parentheticals and non-Western numerals, runtime-composed fragment keys forcing per-locale agreement guesses, the check-the-tree-before-fixing-a-term-of-art hygiene rule, and three glossary coverage gaps; fleet avg 9.35)
> Previous: 2026-07-29 (PR #18938 full pipeline, 24 langs: Indic loaded-polyseme bloc failure, sanitizer frontmatter-guard newline bug corrupting `uploadDate`, `/videos` frontmatter bypassing ETHGlossary, split-sentence `-strong` keys, partial-update manifest drift; fleet avg 8.9 -- lowest in months)
> Previous: 2026-07-22 (PR #18868 full pipeline, 22 langs: YAML colon-in-description build-breaker, raw-`<`-in-prose MDX break, and the `ExpandableCard title= "` attribute-extraction gap; fleet avg 9.7)
> Previous: 2026-06-30 (PR #18629 full-tree: empty `{#}` h5 build-breaker, code-fence corruption cluster, the source-language decision rule, and the "deterministic sweeps beat agent triage" methodology note)
> Previous: 2026-06-09 (PR #18375: MDX duplicated-closer / dropped-`>` breakers, duplicate ghost-heading artifact, ETHGlossary authority hierarchy)

## Issue Categories

### 1. Brand Name Handling -- Script-Aware Policy (CRITICAL)

Brand name rules differ by the target language's script system:

**Latin-script languages (de, es, fr, it, cs, pl, pt-br, sw, vi, id):**
Brand names MUST stay in English/Latin script. Translating them is an error.
- "Solidity" -> "katillik" (Turkish: rigidity/firmness) is WRONG
- "DeFi" -> "MeFi" (Turkish: letter dropped) is WRONG

**Non-Latin-script languages (hi, mr, bn, ta, te, ar, ur, ru, uk, ja, ko, zh, zh-tw):**
Brand names SHOULD be **transliterated** into the target script. This is standard
localization practice -- phonetic rendering, not semantic translation.
- "Solidity" -> "सॉलिडिटी" (Hindi Devanagari) is CORRECT
- "Hardhat" -> "हार्डहैट" (Hindi Devanagari) is CORRECT
- "Solidity" -> "ソリディティ" (Japanese Katakana) is CORRECT
- "Google" -> "গুগল" (Bengali) is CORRECT

| Script Type | Languages | Strategy |
|-------------|-----------|----------|
| Indic | hi, mr, bn, ta, te | Transliterate (phonetic) |
| RTL | ar, ur | Transliterate (mandatory for reading flow) |
| Cyrillic | ru, uk | Transliterate |
| East Asian | ja (Katakana), ko, zh, zh-tw | Transliterate/phonetic characters |
| Latin | de, es, fr, it, cs, pl, pt-br, sw, vi, id | Keep English |

**Exceptions that ALWAYS stay in Latin script regardless of target script:**
- Frontmatter `tags` arrays (machine-readable, used for filtering)
- Ticker symbols: ETH, BTC, ERC, EIP, BLS
- Token standards: ERC-20, EIP-1559, JSON-RPC
- URL paths (hrefs), domain names, email addresses
- Code identifiers inside code fences (`msg.sender`, variable names, etc.)
- Domain names: `ethereum.org`, `etherscan.io`, etc. (see Section 12)

**Numerals:** Use Western Arabic numerals (1, 2, 3) in all non-Latin scripts.
Devanagari numerals (e.g., Hindi: ०, १, २) are NOT used in modern tech writing
and would make the site look archaic. This is confirmed by Hindi tech media
standards (NDTV, Hindi Wikipedia, etc.).

**Rationale (confirmed by Gemini, 2026-03-16):** Mainstream Hindi tech media
(NDTV India, Aaj Tak, Hindi Wikipedia) strongly prefer uniform Devanagari script
for articles. Frequent script-switching (Latin mixed into Devanagari prose)
breaks the reader's visual flow. Hindi Wikipedia strictly transliterates foreign
words into Devanagari. This approach applies to all non-Latin-script languages.

**Author names:** The `author` frontmatter field renders to readers. For
non-Latin scripts, transliterated author names are correct (e.g.,
"Ori Pomerantz" -> "ओरी पोमरैंत्ज़" in Hindi).

**Proper noun categories for non-Latin scripts:**

| Category | Latin-Script Langs | Non-Latin-Script Langs | Notes |
|----------|-------------------|------------------------|-------|
| Human names (authors) | Keep as-is | Transliterate | Capture the sound; use locally accepted spelling for famous figures |
| Brand names (companies) | Keep as-is | Transliterate | Phonetic rendering into target script |
| Software/project names | Keep as-is | Transliterate | Keep code/CLI commands in English; transliterate the name in prose |
| UI buttons/labels | Translate | Translate | Semantic translation, not transliteration |

**Semantic translation vs transliteration:**
- "Rust" -> "जंग" (Hindi: corrosion) is WRONG -- semantic translation
- "Rust" -> "रस्ट" (Hindi: phonetic) is CORRECT -- proper transliteration
The sanitizer should detect semantic translations (wrong meaning) but NOT
flag phonetic transliterations.

**Transliteration authority:** ETHGlossary (https://ethglossary.visual-20-hoists.workers.dev) is the canonical source for term translations, including per-language transliterated forms for non-Latin scripts. The pipeline queries ETHGlossary directly; reviewers verify against the per-term `script_rule` returned by the API. The previous local bank at `.claude/translation-review/transliterations/` has been removed as of ETHGlossary v0.3.0.

**Authority hierarchy — terms ETHGlossary covers vs. items it doesn't (READ THIS before flagging a transliteration/calque/keep-Latin "error"):**

1. **For any term ETHGlossary covers, its per-term `script_rule` is the ONLY authority** for the transliterate / calque / keep-latin / always-latin decision. Query the API (`/filter` per file, or `/translations/{lang}/{termId}`); never assume.
2. **For items ETHGlossary does NOT cover** (author names, brand-new product names not yet in the glossary, etc.), apply the script-aware fallback above: **transliterate** into non-Latin target scripts, **keep as-is** for Latin scripts.
3. **Never infer a "default" `script_rule` for an unlisted term.** An absent glossary entry means "fall back to the script-aware policy," **NOT** "keep Latin." Example caught in PR #18375 review: a `te` author name "Mario Havel" rendered as "మారియో హావెల్" is **CORRECT** per the fallback — a reviewer flagging it as "should stay Latin" by assuming an `always_latin` default was a **false positive**. When ETHGlossary and a reviewer's instinct disagree, ETHGlossary (or, for unlisted items, this documented fallback) wins — there is one source of truth.

### 2. Cross-Script Contamination (CRITICAL)

Crowdin translation memory leaks content from other language translations.

**Known examples:**
- "Vitalik Buterin" rendered in Devanagari (Hindi script) inside Turkish translation files
- Files affected: `learn-quizzes.json`, `page-upgrades-index.json`

**Pattern:** Crowdin TM pulls from wrong-locale segments. Check for characters outside the expected Unicode range for the target locale.

### 3. MDX Syntax Errors (CRITICAL — breaks builds)

Predictable categories that appear in nearly every import:

| Pattern | Example | Fix |
|---------|---------|-----|
| Raw `<` before numbers | `<5GB` in MDX context | Escape to `&lt;5GB` |
| Missing closing backtick | `` `<contract>.<function>() `` | Add closing backtick |
| Misplaced backtick exposing JSX | ``(`<> ...` </>`)`` | Fix backtick placement |
| Orphaned HTML closing tags | `</a>` from sentence restructuring | Remove orphaned tag |
| Duplicated inner closer over a wrapper | `<ExpandableCard>…<ButtonLink>x</ButtonLink></ButtonLink>` (2nd should close the wrapper) | Restore the wrapper's real closing tag from the English source (`</ExpandableCard>`, `</Callout>`, …) |
| Dropped `>` in angle-bracket link whose URL has parens | `[t](<https://en.wikipedia.org/wiki/Electra_(star))` | Restore the `>` before the final `)`: `…_(star)>)` |

**Pattern:** The first two are most common. The last two were the entire cause of the failing build in **PR #18375** (77 files, all 24 langs). **Detect deterministically** by compiling each changed file through `@mdx-js/mdx` (the parser `next-mdx-remote` uses) — strip frontmatter and `{#id}` heading anchors first (else every file false-positives on the custom heading-id syntax), and confirm the English sources compile clean as a control before trusting the run.

### 3b. Duplicate "Ghost" Headings (CRITICAL — structural-migration artifact)

When a base-branch change shifts page block structure — e.g. the h1 → `frontmatter.title` migration that removed leading `#` headings — the pipeline's incremental block-matching can mis-align and emit a section **twice**: an anchor-less "ghost" copy (often an older or differently-worded translation, sometimes a different formality register) immediately followed by the correct `{#anchor}` copy. The reader sees the section rendered twice in a row.

**Signature:** a translated `h2`–`h4` heading **without** `{#id}` immediately followed (after blank lines and/or one duplicate paragraph) by a **same-level** heading **with** `{#id}`. English requires `{#id}` on every heading, so any anchor-less translated heading is the tell.

**Fix:** delete the ghost block (the anchor-less heading + its duplicate paragraph) up to the anchored twin; keep the anchored version that matches the English source. Observed in **PR #18375** at **254 occurrences across 69 files** (24 langs × `community/grants`, `contributing/adding-videos`, `roadmap/glamsterdam`).

**Detection:** scan changed translated files for `^#{2,4} ` lines lacking `{#` (outside code fences); classify each as ghost-twin (next same-level heading is anchored → safe to delete) vs. lone-missing-anchor (needs the anchor *added* from English) before fixing. **The durable fix belongs in the sanitizer** (collapse adjacent duplicate headings during sanitization) so future structural changes self-heal rather than shipping duplicates.

### 4. Semantic Inversions (CRITICAL)

Technical antonym pairs get swapped during translation.

**Known examples:**
- "proof-of-stake" ↔ "proof-of-work" swapped in Turkish `roadmap/merge/index.md`
- Beacon Chain described as "proof-of-work blockchain" instead of "proof-of-stake"

**High-risk antonym pairs:**
- proof-of-work / proof-of-stake
- validator / miner
- staking / mining
- mainnet / testnet
- Layer 1 / Layer 2

### 5. Translated Hrefs (HIGH)

Internal URL paths get translated when they must stay in English.

**Known pattern:** `/governance` → `/gobernanza` (Spanish), similar in other languages.

**Rule:** ALL internal hrefs (starting with `/`) must remain exactly as in English source. The sanitizer has `fixTranslatedHrefs()` but edge cases exist when block alignment breaks down.

### 6. Wrong Technical Term Selection (HIGH)

Common dictionary translations used instead of accepted Ethereum terminology.

**Known examples:**
- "Clients" → "Müşterileri" (Turkish: Customers) — should be "İstemcileri" (computing clients)
- "Mainnet" → "Markette" (Turkish: in the market) — should be "Ana Ağ"
- "underlying blockchain" → "yatak blockchain" (Turkish: bed blockchain) — should be "altta yatan blokzincir"

**Pattern:** Always reference the community glossary. The correct term is often non-obvious (both translations are valid Turkish, but only one is accepted in the Ethereum context).

### 7. Ticker/Acronym Typos (MEDIUM)

Character transpositions in protocol acronyms.

**Known examples:**
- ETH → EHT (3 occurrences in Turkish)
- BLS → BSL (2 occurrences in Turkish)

**Pattern:** Levenshtein distance 1 from canonical form. Common with 3-letter acronyms.

### 8. Domain Typos (MEDIUM)

**Known examples:**
- "ethereum.org" → "ethererum.org" (3 files in Turkish)
- "World Wide Web" → "World Wibe Web"

### 9. Untranslated Content Chunks (HIGH)

Entire paragraphs or sections left in English within translated files.

**Pattern:** Observed in Vietnamese review — some pages only partially translated. Requires re-submission to Gemini for completion.

**Detection:** Language detection at paragraph level (franc-min library).

### 10. Frontmatter Tag Translation — Brand Names Only (MEDIUM)

Frontmatter `tags` arrays contain a mix of brand names and concept/category terms. Only **brand-name tags** must remain in English; concept tags are intentionally translated by Crowdin.

**Brand-name tag example (MUST fix):** `tags: ["solidity", ...]` → `tags: ["katillik", ...]` in Turkish tutorials. "Solidity" is a programming language name and must never be translated.

**Concept tag example (CORRECT — do NOT flag):** `tags: ["smart contracts", ...]` → `tags: ["smart kontrakt účty", ...]` in Czech, or `tags: ["testing", ...]` → `tags: ["testování", ...]`. These are generic descriptive terms that Crowdin translates intentionally.

**Rule:** Only flag translated tags that are proper nouns or brand names (programming languages, company/product names, protocol names). Generic concept/category tags (e.g., "smart contracts", "testing", "security", "deploying", "storage", "transactions", "frontend", "nodes") are expected to be in the target language.

### 11. Code Block Translation Policy (HIGH)

Code fences contain a mix of functional code and comments. Only **functional code** must stay in English; **comments** may be translated.

**Must stay English (CRITICAL):** Identifiers, variable/function names, string literals, config keys/values, console output, error messages, struct field names, TOML/JSON/YAML keys.

**May be translated (CORRECT — do NOT flag):** Code comments (`//`, `/* */`, `#`). These exist purely for reader comprehension and don't affect execution. Translated comments improve accessibility for non-English speakers.

**Example (CORRECT):** `// Veřejná proměnná typu unsigned int` inside a Solidity code block in Czech — this is a comment explaining the code and benefits from translation.

**Example (MUST fix):** `bytes("záznam již zapsán")` — this is a string literal inside Solidity that affects runtime behavior.

### 12. Transliterated Domain Names (CRITICAL -- security risk)

Domain names (e.g., `ethereum.org`) must ALWAYS stay in Latin script, even in
non-Latin-script languages. Transliterating a domain name (e.g.,
`एथेरियम.org`) creates a string that is NOT a valid URL and could be exploited
as a scam vector (IDN homograph attack surface).

**Known examples (found in Hindi Crowdin import):**
- `एथेरियम.org` in `contributing/adding-staking-products/index.md` (3 occurrences)
- `एथेरियम.org` in `src/intl/hi/page-index.json` (1 occurrence)

**Rule:** The sanitizer and transliteration scripts must protect domain patterns
(`word.org`, `word.io`, `word.com`, etc.) before applying any transliteration.
If a human translator has transliterated a domain name, it must be reverted.

**Pattern:** `[a-zA-Z0-9][\w.-]*\.(org|com|io|net|dev|xyz|eth|fm|tv|co)`

### 13. Brand Name Garbled Transliterations (HIGH)

Crowdin TM produces consistent garbled transliterations of brand names that are
neither the correct Latin form nor a valid transliteration.

**Known garbles (discovered in Arabic PR #17105):**
- "GitHub" -> "يجتبه" (82 occurrences across 15 files)
- "Solidity" -> "الصلابة" (literal "hardness", 3 files in Waffle tutorials)

**Fix:** `fixKnownBrandGarbles()` in sanitizer maps the garbled form to the canonical Latin brand name. Both current entries (`يجتبه → GitHub`, `الصلابة → Solidity`) target brands ETHGlossary classifies as `keep_latin` or `always_latin`, so Latin is correct in all locales. If future garbles target brands with `script_rule: transliterate`, this function should grow ETHGlossary integration to fetch the per-locale form.

**Pattern:** Map of known garble -> correct form. Language-specific (يجتبه is Arabic-only).

### 14. Crowdin Boilerplate Injection (MEDIUM)

Crowdin thank-you messages injected mid-paragraph during translation.

**Known string:** "نشكرك على مشاركتك في برنامج الترجمة ethereum.org" (Arabic)
and "Thank you for your participation in the ethereum.org Translation Program" (English)

**Fix:** `stripCrowdinBoilerplate()` strips when embedded mid-sentence (after ". ").
Preserves standalone occurrences (legitimate in translation-program pages).

### 15. Duplicated Tag Values (MEDIUM)

Crowdin concatenates a tag value with itself: "ERC-721ERC-721".

**Fix:** `fixDuplicatedTagValues()` detects quoted strings where first half === second half.
Found in 5 files (3 MD frontmatter + 2 JSON glossary files).

### 16. Stripped Abbreviations in Parentheses (MEDIUM)

Crowdin strips Latin abbreviations from parentheses in frontmatter, leaving "()".

**Known examples:** "(RWA)" -> "()", "(PoA)" -> "()"

**Fix:** `restoreStrippedAbbreviations()` compares against English frontmatter and
restores ASCII abbreviations. Only operates in frontmatter section.

### 17. Igbo/Wrong-Language Contamination (CRITICAL)

Entire JSON files contain text in the wrong language. Arabic page-roadmap.json
was ~60% Igbo (Nigerian language). Not caught by cross-script detection because
Igbo uses Latin script (same as English).

**Detection:** Would need franc-min language detection extended beyond English detection.
Currently document-only (not automatable without false positive risk).

### 18. "State" Polysemy -- Computational vs Political (HIGH)

The word "state" consistently translated as political/governmental terms instead of
computational state across multiple non-Latin languages.

**Arabic examples:**
- "state channels" -> "قنوات الدولة" (nation-state channels) instead of "قنوات الحالة"
- "statelessness" -> "انعدام الجنسية" (statelessness/nationality) instead of "انعدام الحالة"
- Also seen in de, tr, sw, ru, uk, zh, zh-tw, te (8+ languages)

**Not automatable** -- requires semantic context. Glossary has "state" -> "حالة" for Arabic.

### 19. MEV Mistranslation as Vehicles (HIGH)

"MEV" (Maximal Extractable Value) interpreted as "multi-purpose electric vehicles"
in Arabic mev/index.md. Sentences read "electric SUV extraction rates surged."

**Not automatable** -- semantic error requiring human/AI review.

### 20. Compound/Multi-Form Glossary Entries -> False-Positive "Critical" Flags (REVIEW HYGIENE)

ETHGlossary frequently has multiple entries for one base term that differ by surrounding words. Checking only the bare entry produces false-positive critical flags. Before flagging a glossary deviation, check whether the English source uses a compound form and whether a matching compound glossary entry exists.

**Confirmed in PR #18344 (latest/ builder blog) -- 3 of 5 agent-flagged "criticals" were false positives:**
- pt-br: "Ethereum mainnet" -> "Rede Principal do Ethereum" flagged against bare `mainnet => Mainnet`, but glossary also has `Ethereum Mainnet => Rede Principal do Ethereum`. Correct.
- mr: same; glossary has `Ethereum Mainnet => इथरियम मेननेट` (note its इथरियम spelling intentionally differs from standalone `Ethereum => इथेरियम`).
- cs: "zero-knowledge proof" -> "důkaz s nulovou znalostí" flagged against bare `zero-knowledge => s nulovým vědomím`, but glossary has `zero-knowledge proof => důkaz s nulovou znalostí`. Translator correctly used the bare form for "zero-knowledge tooling/language" and the proof form for "zero-knowledge proof" (the vi agent caught this split; the cs agent missed it).

**Rule:** when a flagged term has adjacent qualifier words in English (X Mainnet, X proof, X layer), grep the glossary JSON for the multi-word entry before treating it as critical. The `/filter` output already includes both forms.

## Per-Language Notes

### All 24 languages -- page-stablecoins.json, Reviewed PR #18353 (stablecoins-2026-redesign)
- Single 124-key UI-strings JSON per language (one new redesigned page). Fleet avg ~9.7/10, **0 critical issues across all 24 languages**.
- Only objective fix: tr `page-stablecoins-algorithmic` heading typo `Algormitik` -> `Algoritmik` (body already correct). Hand-fixed.
- Notable warning: ta `page-stablecoins-types-intro` rendered "trade-offs" as "exchanges/transfers" (பரிமாற்றங்கள்) -- see new polysemy note below.
- es and ja scored clean 10.0; cs/ja had 0 warnings. vi's historical untranslated-chunk failure mode was ABSENT (big improvement on prior 7.2/10).
- Confirmed clean across the fleet: all 6 internal hrefs byte-identical, all tickers (ETH/USDS/USDC/GHO/GLO/USDGLO/DAI/USDT/TUSD/PYUSD/COMP) Latin, no semantic inversions in the overcollateralization / fiat-redemption / algorithmic-supply / Bitcoin-pizza passages, smart contract correct (智能合约/智能合約, not 智慧), no cross-script contamination, 124/124 key coverage everywhere.

### 21. "Trade-offs" Polysemy -- Exchange/Transfer vs Compromise (MEDIUM)
"trade-offs" (compromises/downsides) mistranslated as the financial/transfer sense of "trade" (exchange/swap). Seen in ta `page-stablecoins-types-intro` (PR #18353): "their benefits, and trade-offs" -> "...exchanges" (பரிமாற்றங்கள்), which also collides with swap=பரிமாற்றம். High-risk in languages where "trade" maps to a swap/exchange term. Not automatable -- requires the pros/cons sense. Check any "trade-off(s)" occurrence in pro/con or comparison contexts.

### All 24 languages -- page-get-eth.json (get-eth redesign), Reviewed PR #18767
- ~20 changed keys per language (hero / exchanges / safety strings), 24 langs, incremental scope. Fleet avg **~9.9/10**, **0 critical issues**, 8 cosmetic warnings, no fixes needed.
- Deterministic sweeps clean: JSON valid x24, key sets byte-match EN, both internal hrefs identical everywhere, no placeholder leaks (pattern 22 grep), no ticker/domain typos.
- Recurring nuance (NOT an error, do not auto-fix): "Get ETH" and "Receive ETH" merge into one verb in ru/uk/hi/tr (Получить / Отримати / प्राप्त करें / alın); mr and ar/ur differentiate. Native-speaker call.
- ur: "decentralized" carries Arabic kaf U+0643 instead of Urdu keheh U+06A9 -- traced to ETHGlossary's own entry (لامركزی), so per the authority policy it is NOT a translation error; logged as an ETHGlossary normalization candidate (like the lowercase `(l1)`/`(l2)` note).
- ta: the prior swap/exchange homograph concern (pattern 21 family) is now well-handled -- swap=பரிமாற்றம் vs exchange-platform=பரிமாற்றகம் (distinct derived form).
- Historically weak languages all clean: tr shows none of its client/mainnet/EHT modes; vi fully translated (no English chunks); ar shows none of its historical failure modes and keeps the get/receive distinction.

### Czech (cs) & Traditional Chinese (zh-tw) -- latest/ blog, Reviewed PR #18344
- cs 8.8/10: 1 real critical fixed -- "gas" rendered as literal "plyn" (4x in building-on-ethereum-in-2026); ETHGlossary note mandates the loanword "gas" (same file already used "gasu"). zero-knowledge flag was a false positive (see pattern 20).
- zh-tw 9.5/10: 1 real critical fixed -- "smart contract" as 智慧合約 -> 智能合約 (glossary: 智慧 is the smartphone sense, 智能 is the crypto term).
- 22 other languages clean (0 real critical); fleet avg ~9.6/10. No MDX/href/semantic-inversion/cross-script issues across 72 files.
- Several non-Latin glossary entries store lowercase `(l1)`/`(l2)`; translators render lowercase L1/L2 faithfully -- glossary-correct, not an error (candidate for ETHGlossary normalization).

### All 24 languages -- page-layer-2-networks.json chart labels, Reviewed PR #18765 (intl/pending-fix-rtl-l2-networks)
- 6 chart-legend/table-header labels per language (NFT / DeFi / Social / Token Transfers / Unlabeled / Actions). Fleet avg ~9.7/10, **0 critical issues**; single-agent review (scope-calibrated).
- Pattern worth remembering -- **acronym expansion in space-constrained labels**: 6 langs (ar, bn, cs, de, sw, vi) rendered bare "DeFi" as the glossary's FULL form "decentralized finance (DeFi)" while 18 kept the bare acronym matching English. Both glossary-legal; full form is heavy for a chart legend. Warning-level only, no change required -- but a candidate MT-prompt refinement: match the source's acronym-vs-expansion choice for UI labels.
- ta: token=வில்லை is ETHGlossary-mandated (native disc/medallion term, note sanctions casual டோக்கன்) and used consistently in-file -- do NOT flag as a mistranslation.
- "Actions" -> Azioni/Akcje/Ações/Acciones collides with the "shares/stocks" finance sense in it/pl/pt-br/es but is the standard UI-column translation -- not an issue.

### Turkish (tr) -- Reviewed PR #17182
- Quality score: 7.7/10
- 34 critical issues, 56 warnings across 301 files
- Community glossary: proof-of-stake = "hisse ispatı", mainnet = "ana ağ", client = "istemci", stablecoin = "sabit para"
- JSON Batch B agent hit context overflow with Opus — fell back to Sonnet
- See: `docs/solutions/translation-review/crowdin-import-review-turkish-pr-17182.md`

### Hindi (hi) -- Reviewed PR #17101
- Quality score: 6.6/10 (pre-fix), improved after fixes
- 20 critical issues fixed, 25+ warnings across 297 files
- PoW/PoS semantic inversion in roadmap/merge (known failure mode -- confirmed)
- 11 translated URL paths (Devanagari hrefs) across 6 files
- Translated code (APPLY/ERROR) in whitepaper code fences
- Glossary aligned: "zero-knowledge" -> "ज़ीरो-नॉलेज", "cryptocurrency" -> "क्रिप्टोकरेंसी"
- "client" mistranslated as "ग्राहक" (customer) instead of "क्लाइंट" (computing)
- Tone/register: perfectly consistent formal (आप) throughout
- Zero cross-script contamination
- Body-text brand transliterations (Solidity -> सॉलिडिटी etc.) are CORRECT per Hindi conventions
- "Rust" -> "जंग" (corrosion) was a semantic translation error, not transliteration

### Vietnamese (vi) -- Reviewed PR #17176
- Quality score: 7.2/10
- 37 critical issues, 124 warnings across 277 files
- Same MDX error patterns as Turkish (misplaced backticks, orphaned HTML tags)
- Significant untranslated content chunks requiring Gemini re-pass
- See: `docs/solutions/translation-review/crowdin-import-review-vietnamese-pr-17176.md` (on PR branch)

### Arabic (ar) -- Reviewed PR #17105
- Quality score: 5.2/10 (pre-fix)
- ~85 critical issues, ~60 warnings across 299 files (excluding gaming)
- 4 showstoppers: Igbo contamination in page-roadmap.json, "Ethereum is centralized" semantic inversion, romanized Arabic visible in page-what-is-ethereum.json, Farsi text in page-developers-docs.json
- Systematic "GitHub" garbled as "يجتبه" across 15 files (82 occurrences) -- fixed by sanitizer
- Systematic "state" polysemy: "الدولة" (nation-state) instead of "الحالة" (computational)
- "Solidity" literally translated as "الصلابة" (hardness) in 3 Waffle tutorial tags
- MEV interpreted as "multi-purpose electric vehicles/SUVs" in mev/index.md
- Oracle rendered 5+ ways including "fortune teller" and "sacred systems"
- 20+ files with untranslated English paragraphs
- 5+ different Ethereum transliterations with no consistency
- 5 different staking terms used across files
- Crowdin boilerplate injected mid-content in transactions/index.md
- ERC-721 tag duplicated as "ERC-721ERC-721" in 5 files
- POAP translated as "Consumer Protection Office" in glossary-tooltip.json
- "validator" as "consensus client", "block" as "barrier" in glossary files
- "liquid staking" as "liquid mortgage" in community/research
- Tone/register: formal MSA consistently maintained where translated

### 22. Leaked HTML Placeholder Tokens in JSON Restore (CRITICAL -- pipeline artifact)

The intl-pipeline extracts attributed HTML tags (`<a href>`, `<img>`) from JSON string values into content-addressed wrappers `<HTML-PLACEHOLDER-HTMLTAG-{hash}>text</...>` before translation, then restores them. A restore bug let a placeholder token ship verbatim into shipped files (reader-visible junk).

**Signature:** literal `HTML-PLACEHOLDER-HTMLTAG-<6hex>` (or `-CODE-`/`-LINK-`/`-IMAGE-`/`-COMPONENT-`) text inside a translated JSON value.

**Root cause (PR #18418):** the translated value contained a placeholder hash MORE times than the English source had the tag (LLM/TM reused a linked phrase); the old restore rebuilt only the first occurrence per source entry, and the surplus leaked silently (the single entry restored fine, so no failure was logged). The hash is content-addressed from the English tag, so the SAME hash leaks across every affected locale -- a fleet-wide tell.

**Detection (deterministic):** `grep -rl "HTML-PLACEHOLDER" src/intl/` -- EN source is always clean, so any hit is a translation-side leak. **Run this grep on every JSON import as a backstop, regardless of agent findings.**

**Fix:** restore by global token replacement (a hash always maps to one original tag) + residual-placeholder guard (`json-batcher.ts`), and a hard throw on any placeholder reaching merged output (`gemini.ts`). Full writeup: `docs/solutions/logic-errors/intl-pipeline-html-placeholder-leak.md`.

### All 22 languages -- glossary-tooltip + 20 page JSONs, Reviewed PR #18418 (intl/pending-dev)
- 22 langs x 21 UI-string JSONs (it: 20; `page-history.json` failed upstream, excluded). Fleet avg **~9.7/10**.
- **Only critical fleet-wide: pattern 22** -- 7 langs leaked one placeholder in `glossary-tooltip.json` (`ar` wei-definition `#wei`; `cs/ja/ko/pl/uk/zh` ommer-definition `#pow`). All hand-fixed to the correct anchor; pipeline fixed to prevent recurrence.
- Scores: fr/it/vi 10.0; de/es/hi/id/pl/ru/ur 9.8; tr 9.7; ar/bn/ja/ko/sw/ta/uk/zh 9.6; cs 9.5; mr/te 9.4.
- Confirmed clean across the fleet: no semantic inversions (PoW/PoS, validator/miner, mainnet/testnet), no translated internal hrefs, no transliterated domains, no cross-script contamination, ICU placeholders + rich-text tags intact, brand/script policy correct per group. zh `智能合约` correct (not `智慧`). Historically weak ar/vi/tr clean of prior failure modes.

### All 24 languages -- page-privacy.json, Reviewed PR #18739 (intl/pending-privacy-page)
- Single 71-key UI-string JSON (privacy landing page) x 24 langs. Fleet avg **~9.5/10** (range: te 8.3, ur/it 9.3, up to es/id/ko/pt-br 9.8).
- Structure clean fleet-wide (deterministic script): full key parity, all 6 named rich-text tags (`<dragnet>`, `<ftcReport>`, `<harvest>`, `<manipulate>`, `<nccStudy>`, `<reported>`) + `{value}` placeholder preserved, stats intact (376, 135, years). Two balanced `<strong>` redistributions (ar/ko) safe for RTL/SOV word order. Urdu correctly wraps metric `{value}` in U+2066/U+2069 bidi isolates (RTL-correct, not an artifact).
- **1 critical (te): pattern 26** -- Uber "does not use" denial inverted by the `-మని` reported-directive suffix. Hand-fixed.
- Minor fixes applied: de/cs/it/sw grammar+spelling typos; ar detached-lam spacing (2 strings); ru decimal `2.8`->`2,8`; zh/zh-tw/hi/bn "price gouging" softening (pattern 27).
- Ethereum correctly transliterated per ETHGlossary in every non-Latin script (イーサリアム, 以太坊, 이더리움, Эфириум, إيثيريوم, इथेरियम, எத்திரியம், ఎథీరియం). Glossary density low for this page (~10 matched terms; mostly privacy/metadata/permissionless/zero-knowledge/cryptography).

### 23. Empty `{#}` Heading Anchors on h5 (CRITICAL — build-breaker)

MT injects empty `{#}` tokens (often duplicated: `{#} {#} {#}`) onto h5 (`#####`) headings that have NO anchor in English (only h1-h4 require `{#id}`). `escapeHeadingIds` only escapes `{#word}` (needs a word char), so empty `{#}` reaches the MDX parser as a `{#}` expression -> "Could not parse expression with acorn" -> build fails. **Detect deterministically** by compiling each changed file through `@mdx-js/mdx` (strip frontmatter + escape `{#id}` first). **Fix:** strip the empty `{#}` tokens (English h5 has no anchor). Seen in PR #18629 `developers/docs/networks/index.md`, all 23 langs, 9 tokens/file.

### 24. Code-Fence Corruption Cluster + the Source-Language Rule (CRITICAL)

**The rule (decision tree for any code-fence content):** look at the *source language* of the line.
- English prose -> translate. This **includes** English strings inside code: `console.log("Hello world")` -> `console.log("Hola mundo")` is CORRECT, and an untyped (no language) code block is treated like prose and translated (e.g. an LLM-prompt example).
- A programming-language token (keyword/identifier) -> stays English. Translating Solidity `contract`/`constructor`/`function`, or corrupting a JS identifier like `getContractFactory`, breaks the code.
- **CAVEAT — reproduced program OUTPUT** shown in a walkthrough (terminal sessions, prediction logs, printed results) stays in whatever the code actually emits. If the code's `print("Current price:")` was left English, the shown output `Current price: 1843.16` must also be English (so the reader can match their terminal). If the `print` string was translated, the output should match the translation. Output must be consistent with its own code.

PR #18629 hit every variant fleet-wide: `short-abi` Solidity keywords (incl. ko SOV word-order: keyword placed *after* or *between* identifier+parens, e.g. `faucet 함수()`, `CalldataInterpreter 컨트랙트 {`); `getContractFactory` -> `get<word>Factory` in both non-Latin (`getКонтрактFactory`) and Latin (`getMkatabaFactory`, `getContratFactory`); verbatim terminal output translated in hello-world / sending-transactions / manticore / ai-trading-agent. **Fix deterministically** with English-anchored line/fence replacement (preserved identifiers, numbers, tx hashes anchor the match across langs).

### 25. Methodology — Deterministic Sweeps Beat Agent Triage for Systematic Code Issues

In PR #18629, deterministic sweeps (MDX compile + anchored grep against English) caught **~2x** the code/output criticals that 24 per-language Sonnet agents found. Agents reported es/id/ko as "0 critical" while all three had `getContractFactory` corrupted; short-abi keyword translation was missed by most agents. **Lesson:** for systematic, file-repeated issues (same English source mistranslated the same way across langs), do NOT rely on per-language agent triage for coverage — run a deterministic detection+fix sweep keyed on stable English anchors, then use agents for the judgment calls (semantics, glossary, tone). Reserve agent findings for what can't be grepped.

### 26. Reported-Speech Negation Inversion in SOV/Agglutinative Langs (CRITICAL — semantic)

A denial in indirect speech ("X says it does **not** do Y") can silently flip to an affirmative directive when the negation rides a verb suffix that collides with a reported-command marker. **Telugu (PR #18739):** "Uber says it does not use this to set fares" became `...దీనిని ఉపయోగించమని Uber చెబుతోంది` -- `-మని` is the standard reported-directive suffix ("says TO use"), so the default parse is the OPPOSITE of the source; only a strained `ఉపయోగించము+అని` (we-do-not-use) reading recovers the negative. On a page making a factual claim about a named company this is a meaning inversion, not a nit. **Fix:** unambiguous negative -- verbal-noun + లేదని (`ఉపయోగించడం లేదని` = "is not using") or 3rd-person negative `ఉపయోగించదని`. **Detection:** agent-only (not greppable) -- flag any "<entity> says ... not ..." denial and confirm the target keeps an explicit negation. Watch other SOV/agglutinative langs (Tamil, Telugu, Korean, Japanese) where negation is a suffix.

### 27. Pejorative / Term-of-Art Flattening -- "price gouging", "surge" (LOW/MEDIUM — nuance)

English words carrying a pejorative or technical shade lose it when MT picks the neutral core sense. Recurring on the privacy page: "algorithmic price **gouging**" -> plain "price increase" (bn, hi) or "price **fraud**" (zh `价格欺诈`, zh-tw `價格欺詐`) -- drops the exploitative-overcharging sense; `"surge" price` (Uber, a quoted term-of-art) collapses into the same word used for "dynamic pricing" (it, pl, pt-br, zh) -- loses the demand-spike nuance and the scare-quote framing. Not build/meaning-breaking; whether to fix depends on how load-bearing the nuance is. **Easy patches:** zh/zh-tw gouging = `哄抬` (哄抬价格/物价, the standard term); insert an "unfair/exploitative" qualifier (hi `अनुचित`, bn `অন্যায্য`) before "increase". **Detection:** agent-only -- give reviewers the loaded source terms explicitly so they verify the shade survived.

### All 24 languages -- community-stories.json (26 keys) + 3 common.json keys, Reviewed PR #18772 (stories-intl)
- New namespace of first-person community testimonials; fleet avg ~9.6/10, 7 criticals across 6 languages, all hand-fixed in-branch.
- **zh-tw 智慧合約 REGRESSION**: the exact PR #18344 error recurred in all 4 "smart contract" occurrences (3 keys) of the new import -- the pipeline does not consult prior review fixes; check this term on EVERY zh-tw import.
- **RTL untranslated Latin date fragments** (new tell): "March 2020" shipped bidi-isolated but untranslated in ar AND ur (story-dorgo-eth) while all Latin-script langs translated it. Deterministic detection: grep English month names in RTL/Indic/CJK locale files.
- **Passive-voice agency reversal** (pattern 4 variant): sw rendered "all banks denied my loan apps" as "benki zote zilikataliwa" (banks WERE denied). Passive constructions can invert who-did-what without touching an antonym pair.
- **Double-negation inversion** (pattern 4 variant): hi rendered "a lack of trust" as "अविश्वास की कमी" (lack of DIStrust). Negating an already-negative noun flips polarity.
- **tr stablecoin**: ETHGlossary has NO tr entry (old KB note "sabit para" is stale); locale convention is the fused loanword "sabitcoin" (~130 occurrences) -- the import's spaced hybrid "sabit coin" was collapsed to match.
- Scores: it/de 9.9, vi 9.9, cs/es/fr/pt-br/ru/uk/zh 9.8, id 9.7, ar/ja/ko/mr/te(9.4) 9.4-9.6, ta 9.5, pl 9.6, tr 9.2, sw 9.1, ur 9.1, bn 9.4, hi 8.2, zh-tw 8.3.
- Clean fleet-wide: key parity 26/26 everywhere, ICU-safe, \n\n paragraph structure exact in all 4 multi-paragraph stories, no placeholder leaks, no cross-script contamination, amounts intact, no untranslated chunks (vi's historical failure mode absent).

### 28. Unquoted `description` with an internal `: ` -> YAML build-breaker (CRITICAL — build-breaker)

MT rewrites an English em-dash/parenthetical in the `description` frontmatter as a colon, producing an unquoted YAML scalar with an internal `: ` (colon+space). `next-mdx-remote`'s frontmatter parser (the eemeli `yaml` package, NOT js-yaml) reads the second colon as a nested mapping -> `YAMLParseError: Nested mappings are not allowed in compact mappings` / `BLOCK_AS_IMPLICIT_KEY`, and the page prerender fails.

**Seen in PR #18868:** English `applications—no passwords` (em-dash) became `applicaciones Ethereum: sin contraseñas` in es/fr/it `developers/docs/ethereum-stack/authentication`. **Fix:** wrap the value in double quotes (`description: "…: …"`) — do NOT drop the colon. **Detect deterministically:** scan changed-file frontmatter for any top-level `key: value` where the plain (unquoted, non-`[`/`{`/`|`/`>`) value contains `: ` or ends with `:`. Both eemeli-yaml and js-yaml reject it, so gray-matter validation catches it too.

Companion break in the same PR (pattern 3 family): a translator added a raw `<` in prose inside full-width parens (`より小さい（<）` in ja `evm/opcodes`) where English had none (`uint256 less-than`). MDX parses `<）` as a JSX tag open -> `Unexpected character before name`. Fix = escape to `&lt;`. Caught by the `next-mdx-remote/serialize` compile sweep, not the frontmatter scan.

### 29. `ExpandableCard title= "..."` (space after `=`) defeats pipeline attribute extraction (HIGH — fleet-wide untranslated UI string)

A user-facing `<ExpandableCard title= "...">` title shipped **untranslated in all 24 locales** on `roadmap/single-slot-finality` (`"Why can't we have SSF today?"`). Root cause is in the **English source**: `title= "..."` has a space between `=` and the opening quote, which the pipeline's attribute-value extractor doesn't match, so the string is never sent for translation (the card *body* translates fine; only the `title` attribute leaks English). The `eventName`/`eventCategory` attributes are intentionally skipped (analytics), but `title` is reader-visible.

**Detection (deterministic, cross-locale):** grep the English verbatim title across `public/content/translations/*/<page>` — a string present unchanged in ~all locales is an extraction gap, not per-language laziness. **Durable fix:** normalize `attr= "` -> `attr="` in the English source AND/OR make the pipeline's JSX-attribute extractor tolerate whitespace around `=`, then re-pass. This is the JSX-attribute analogue of the untranslated-chunk failure mode.

### All 22 languages -- full pipeline import, Reviewed PR #18868 (intl/pending-dev)
- 22 langs x ~64 changed files each (1,063 markdown + 480 UI-string JSON = 1,543 total). Fleet avg **~9.7/10**. Deterministic layer (MDX compile, JSON parse, HTML-PLACEHOLDER, hrefs, domains, tickers, cross-script) **clean fleet-wide** except the 4 build-breakers below.
- **Build-breakers (4, hand-fixed + committed `a0ca2f940e`, Netlify deploy preview green):** patterns 28 (es/fr/it authentication YAML colon) + 3-family (ja opcodes raw `<`).
- **2 criticals, both `ur` untranslated chunks** (`gaming/index.md` two sections; `yellow-paper-evm` ~half the prose) — left for a pipeline re-pass, NOT hand-translated. ur scored 8.4 (lowest); all other langs 9.2-9.9.
- **Systematic content-sync gaps (not per-lang defects):** pattern 29 ExpandableCard title (all 24); `ethrex` execution-client row dropped in `es` (English recently added it, others kept the paragraph but dropped the row); dropped headings/anchors (zh `erc-4626` `## Introduction`, id `pectra/maxeb` FAQ heading, id `gaming` H2 anchor). All trace to recent English-side moves or pipeline coverage — re-pass territory.
- **Recurring nuance (warning-level):** "trade-off" polysemy rendered with the glossary's *swap/exchange* term (ur تبادلہ, ta பரிமாற்றம், mr) instead of the compromise sense; loanword-vs-calque term choices (it `contratti intelligenti` vs preferred loanword `smart contract`; tr `sabit coin` vs fused `sabitcoin`); ar MEV glossed "miner extractable value" on PoS pages (pbs correct). No semantic inversions, no reported-speech negation flips, no cross-script contamination, brand/script policy correct per group.
- **Methodology confirmed (pattern 25):** deterministic sweeps caught 100% of build-breakers before any agent ran; the 22 agents added the judgment layer (untranslated chunks, polysemy, glossary nuance) that grep can't. Calibrated 1-agent-per-language (not 3) was sufficient given the clean deterministic pass.

## Agent Architecture Notes

- JSON files with 40+ entries can exceed Opus context window — plan for Sonnet fallback or 3-way split
- 5-agent parallel review architecture validated in Turkish review: Core Pages, Dev Docs, Tutorials, JSON Batch A, JSON Batch B
- Recommended sub-agent split for Phase 2+: MDX Syntax, Brand Names, Href Validation, Semantic Review, Build Verification

### 30. Compound glossary entries lose to their bare counterpart on a new page (CRITICAL — recurring)

ETHGlossary carries distinct entries for a bare term and its compound (`zero-knowledge` vs `zero-knowledge proof`; `proposer` vs `block proposer`; `anonymity` vs `anonymity set`). When the pipeline translates a **brand-new** page, it frequently resolves the bare entry and appends a literal/transliterated head noun, producing e.g. bn `জিরো-নলেজ প্রুফ` instead of `শূন্য-জ্ঞান প্রমাণ`, or uk `пропонент блоку` instead of `пропонувач блоку`. Pattern 20 covers the inverse false positive; this is the true-positive direction.

**Tell that it is real, not a variant:** the same PR's *sibling* file usually renders the compound correctly (a video transcript alongside the roadmap page). Cross-file disagreement inside one PR is the signal.

**Detect deterministically:** for a page whose English contains a compound term, extract the locale's rendering of the shortest unambiguous anchor — the markdown link text is ideal (`- [Zero-knowledge proofs](/zero-knowledge-proofs/)` -> one line per locale) — and diff against the glossary's compound entry. Prefix/substring matching on inflected languages produces both false 0s and inflated counts; compare the whole link text instead.

**Fix scope discipline:** only the noun-phrase occurrences change. Adjectival uses (`truly zero-knowledge`, `zero-knowledge passport verification`, `zero-knowledge voting`, `zkVM`) legitimately keep the bare entry.

### 31. Partial speaker-label transliteration in video transcripts is a convention question, not a defect (WARNING)

Long transcripts show `**Speaker Name:**` bylines left in Latin while the body text of the same turn is fully translated. Counts from PR #18925 `eip-7805-focil-explained` (85 labels): ja 45 Latin, ko 46, bn 11, ru 10, mr 4, uk 4, hi 3.

**The failure unit is the `####` section, all-or-nothing, and it repeats across languages.** Every affected section has 100% of its labels untranslated; unaffected sections have 0%. The *same* sections fail in unrelated locales — section@136 in ru/bn/uk/ja/ko, section@168 in hi/ru/ja/ko, section@206 in mr/ja/ko. Since per-language runs are independent, identical section-level failures mean the pipeline splits the document into section-sized units and the name-transliteration step skips some units outright. Deterministic, reproducible, upstream — not model randomness.

Verify with: for each locale, bucket `^\*\*.+:\*\*` label lines by preceding `^#### ` heading and compare the Latin-label count to the section total. A section that is 4/4 or 0/4 (never 2/4) confirms the mechanism.

**Do not hand-fix.** `zh` (57/57) and `zh-tw` (44/44) keep *every* label in Latin, i.e. all-Latin is an accepted locale convention, so there is no single correct target — hand-fixing means imposing arbitrary transliterations across scripts. Fix upstream in the name-substitution pass, or leave. Agents disagree on severity for exactly this reason (ru's agent called it critical; uk/mr/hi's called it a warning).

### All 24 languages -- privacy roadmap import, Reviewed PR #18925 (intl/pending-privacy-roadmap)
- 24 langs x 6 files each (3 new markdown: `roadmap/privacy`, 2 video transcripts; 3 UI-string JSON) = 144 content files + 216 manifests. Fleet avg **~9.5/10**.
- **Deterministic layer clean fleet-wide except `ur`:** `roadmap/privacy/index.md` truncated at 41% (2 of 6 sections, 57/136 lines), ending mid-sentence on a leaked `<HTML-PLACEHOLDER-LINK-d08112` (MDX build-breaker) plus `EIP-۸۱۴۱` Eastern-Arabic numerals in an identifier. **Repaired by a scoped pipeline re-run** (`target_path` + `target_languages=ur` + `mode=full`), NOT hand-translated — the sanctioned repair for missing content.
- **10 criticals hand-fixed** (`39e2229215`), all pattern-30 compound-entry misses plus pl `receipts` (retail sense `paragony` for the Ethereum sense `pokwitowanie`) and it `Omoforma` (not an Italian word; `Omomorfa`).
- **JSON key deletions were all legitimate prunes** — verify with a true key-set difference (`comm -23 old new | comm -12 - en`), never by grepping `^-` diff lines: modified keys emit a `-`/`+` pair and a naive grep reported 61 phantom regressions.
- **English line 58 is a fleet-wide weak spot:** the FOCIL/`block proposer` sentence drew criticals in ja/tr/uk/zh-tw and warnings in pt-br/sw/mr — 7 of 24 locales fumbled the same sentence. Two distinct causes, do not conflate them: `block proposer`/`block builder` ARE in ETHGlossary (so those misses are pattern-30 compound-resolution failures, and adding glossary entries will not help), whereas `inclusion list`, `attester`/`attesting node`, `FOCIL`/`fork-choice`, and `censorship resistance` are **absent from ETHGlossary** — which is why each locale improvised, sometimes 2-3 renderings within one file (de Inclusion List vs Inklusionsliste; vi two forms ~15x each; mr three forms; attester varying across hi/mr/ru/id/ja). Those four are real glossary gaps worth filing.
- **Suspect bare entry:** `builder => Ersteller` (de) coexists with `block builder => Block-Builder`. Bare "builder" in Ethereum prose still means block builder, so the bare entry produced a glossary-compliant but contextually wrong "Der Ersteller beobachtet" for "The builder observes".
- **Methodology:** deterministic sweeps (structure, anchors, hrefs, fences, numerals, placeholder leaks, JSON key sets) ran *before* the agents and found the only build-breaker; the 24 one-per-language Sonnet agents then supplied the judgment layer. Telling agents which checks were already done kept their reports focused and cut re-reported noise to near zero.

### 32. Incremental merge corrupts files whose English blocks were DELETED or REPLACED (CRITICAL — pipeline bug)

When an English edit removes or swaps whole blocks (not just words inside a block), `runIncremental` mis-maps the surviving translated blocks and produces four distinct failures in one run. Observed on PR #18935 (translation-program winddown), where two of four markdown files were structurally edited and two had in-place sentence edits — only the structurally edited pair broke:

| Symptom | Scope observed |
|---|---|
| Whole section silently deleted from the locale file | `contributing/index.md` lost `## How to work on ethereum.org` (18 lines) in 19/24 locales; the intended new bullet also never landed in 20/24 |
| New block's URLs spliced into unrelated old blocks by position | All 24 locales: both `discord.gg/ethereum-org` hrefs on the program page overwritten with the new GitHub-issue URL, anchor text still reading "Discord"; de step 3 got `/acknowledgements/` + `/contributors/` (the two links from the new gratitude paragraph) in place of `/how-to-translate/` + `/translators-guide/` |
| Heading anchor updated while its body keeps the OLD copy | All 24: `{#help-us-translate}` → `{#program-status}` with the 5-step Crowdin signup list and `<ButtonLink>` still underneath — i.e. the page announced a status section but rendered recruitment |
| Blank line before the next `###`, and trailing newline at EOF, eaten | All 24, but only in the incrementally-merged files |

**Detect deterministically, before reading any prose:** diff the *sets* of links and `{#anchors}` between each locale file and its English source (`grep -oE '\]\((/[^)]*|https?://[^)]*)\)|href="[^"]*"'`, sort, `diff`). Set equality catches splicing, deletion, and stale anchors in one pass. Run it from a worktree on the English base branch — running it from a stale `dev` checkout compares against the pre-change English and every locale looks "wrong" identically, which is the tell that the baseline is bad, not the translations. Also check for content files with `additions == 0 && deletions > 0` in the PR file list; that combination means blocks were dropped with nothing written back.

**Repair is a scoped `mode=full` re-run, never a hand-patch.** `main.ts:843` short-circuits on `config.mode === "full"` before the manifest is read, and `runFullTranslation` (`main.ts:415`) passes only the English `file.content` + glossary to `translateFile` — the locale file is never read, so the merge path is bypassed entirely and deleted sections are regenerated. Cost for 2 pages x 24 locales was $1.75 / 4 min.

**A plain re-run does NOT fix it.** The failed run still stamps manifests as current (`generatedAt` bumped, tree keyed on the new anchor), so `auto` mode sees no English change and skips the file forever. `mode=full` or a manifest reset is mandatory.

**Do not delete the pending branch to recover.** When the target branch exists the pipeline merges base into it and appends (`main.ts:671-703`); deleting it discards the locales/files that came out clean and forces them through an unnecessary retranslation.

### 33. Tense-neutral languages drop an English present→past reframing (WARNING, sometimes CRITICAL)

An English edit that only changes tense (`is` → `was`, `aims` → `aimed`) is invisible to languages that mark tense with optional particles or not at all. On PR #18935 the two reframed sentences came back present/tense-neutral in **ta, zh, zh-tw, id, vi** — 5 of 24 — while morphological languages (de, ru, hi, bn, sw, tr, ja, ko...) got it right automatically. Only zh-tw's line was byte-identical to the previous version; the other four were genuinely re-translated and the model simply chose an unmarked form.

Severity depends on the neighbouring copy: here the page opened "The Translation Program **is** a collaborative effort" two paragraphs above "the program is winding down", i.e. the exact contradiction the PR existed to remove, so ta's reviewer called it critical while zh/id/vi's called it a warning. Judge by contradiction, not by grammar.

Fixes applied (minimal marker, everything else byte-identical): zh/zh-tw `是`→`曾是`, `旨在`→`曾旨在`; vi `là`→`từng là`, added `đã`; id added `dulunya`; ta `முயற்சியாகும்`/`மாற்றுகிறது`→`முயற்சியாக இருந்தது`/`மாற்றியது`, `கொண்டுள்ளது`→`கொண்டிருந்தது`.

**Not every such line can be marked.** Indonesian `bertujuan` has no clean past marker — `telah bertujuan` is ungrammatical with a stative purpose verb, `pernah bertujuan` implies the goal was abandoned, and a second `dulunya` in the same section reads as repetition. That line was left unmarked deliberately: line 7's marker sets the past frame for the page. Prefer leaving one sentence unmarked over forcing a construction a native speaker would not write.

### All 24 languages -- Crowdin winddown copy, Reviewed PR #18935 (intl/pending-content-translation-program-winddown-ctas)
- 24 langs x 6 files (4 markdown + `common.json` + `page-collectibles.json`). Fleet avg **~9.2/10**; range ta 8.1 / sw 8.2 / vi 8.4 → fr 9.8 / hi 9.8 / bn 9.7.
- **The first (incremental) run was unshippable** — see pattern 32. The second run (`mode=full`, 2 files) fixed it: link+anchor set parity with English restored in all 96 markdown files, Crowdin `ButtonLink` gone 24/24, both Discord links restored 24/24.
- **Hand-fixed in this branch:** 10 tense lines (pattern 33), plus whitespace-only repairs of the pipeline artifacts — 48 missing blank lines before `###`, 24 missing EOF newlines. Whitespace repair by hand is safe here because the English side had not moved, so manifest mapping stays valid.
- **Left for upstream, not hand-patched:** ar/ur `contributing/index.md` shed most `<span dir="ltr">` wrappers (ar 20→7, ur 26→16) — bidi still resolves but the file is now inconsistent with the rest of the RTL corpus; hi/bn gained invisible isolates around `ethereum.org` (hi 4→8 LRI/PDI, bn 0→14 WORD JOINER), zero-width but they break plain-text grep.
- **Full-file retranslation churns lines the English change never touched.** ta regressed `முக்கிய பகுதி` → `திறவுகோல் பகுதி` ("keyhole part") and lost two sentence-final periods; es appended an unrequested gloss and re-translated "Onchain Achievement Token"; fr moved the *opposite* way on the same term. Budget review attention for collateral drift, not just the intended diff.
- **`page-collectibles.json` is where program-name splits hide.** es casing, it casing, pl `Program tłumaczeń` vs `Program Tłumaczeń`, cs `utlumuje` vs `chýlí ke konci`, ru `перевода`/`переводов`, uk `перекладу`/`перекладів`, te `కార్యక్రమం`/`ప్రోగ్రామ్`, mr `अनुवाद`/`भाषांतर`, sw two names + three winddown verbs. The JSON was translated in a separate task from the markdown, so the two drift apart; check them against each other explicitly.
- **ja softened the message:** `縮小` ("scaling down", implies continued operation) on the program and contributing pages, vs the correct `段階的に終了` it used in get-involved and page-collectibles. Left unfixed — worth a native call.

### 34. Hand-fixes to translated content are erased by the next `mode=full` run on that file (PROCESS)

Nine aspect-marker fixes hand-applied to `contributing/translation-program/index.md` in PR #18935 were wiped when PR #18937 re-ran `mode=full` on the same file one day later — `runFullTranslation` regenerates from English and never reads the locale file, so any human edit in it is discarded silently. Seven of the nine had to be redone; the other two (ta) happened to regenerate correctly.

**Sequence hand-fixes after the last pipeline run that touches the file, never before.** If another run is likely, log the fix in `.claude/translation-review/per-language/` and re-apply afterwards rather than assuming it stuck. Re-request replacement lines against the *current* text — the regeneration rewords surrounding clauses, so yesterday's full-line replacement would silently revert unrelated wording (zh's file-wide term had flipped `翻译计划` -> `翻译项目`, 14 occurrences, so the old replacement line would have reintroduced the minority form).

**Verify markers by reading, not grepping for a specific verb.** A marker grep reported ta line 7 as reverted when the regeneration had simply restructured the sentence and used a different past form (`அமைந்தது` instead of `ஆக இருந்தது`). Regeneration also *fixed* all three ta regressions logged the day before, so re-checking beats assuming the previous findings still hold.

### 35. `auto` mode is unsafe for ANY English edit on a page with structural markup, not just block deletions (CRITICAL)

Pattern 32 framed the incremental bug as triggered by deleted/replaced blocks. PR #18937 disproved the narrow framing: `translators-guide/index.md` had a **single 1:1 sentence replacement** — the shape that had come through cleanly on `get-involved` and `web3` — and the incremental run **deleted the `## Using Crowdin {#using-crowdin}` heading outright in 17 of 24 locales** while correctly translating the replacement paragraph below it, plus ate the blank line before the following heading. Re-running the same file with `mode=full` produced 24/24 clean output for $1.79.

Cost of the failed shortcut was $0.38 and one review cycle; the full run that fixed it cost $1.79. **Default to `mode=full` for any English edit to these content pages** and treat `auto` as reserved for runs where nothing structural (headings, list items, links, JSX) is touched. If you do use `auto`, the anchor-set diff against English is the check that catches it — links alone passed 24/24 on the run that dropped the heading, because the heading carried no link.

### 36. Hand-patching translated content through a text channel silently alters Unicode composition (PROCESS)

Fixing a *content* defect introduced an *encoding* defect that no content review would catch. A Bengali replacement line pasted from a subagent's report arrived with two precomposed য় (U+09DF) decomposed into য + ় (U+09AF U+09BC), taking `bn/contributing/translation-program/index.md` from a uniform 36/0 precomposed to 34/2 mixed. The reviewer had predicted exactly this ("in case your paste path does any normalization, which would silently alter it"), which is the only reason it was checked.

**Any hand patch of non-Latin content needs a codepoint-level diff, not a visual one.** Count the at-risk characters in the file before and after, and compare against the file's own dominant convention rather than against NFC — several locale files are deliberately non-NFC (bn/index.md is 36 precomposed / 0 decomposed; bn/translators-guide is the mirror image at 191 decomposed / 9 precomposed, which is why normalization drift there needs its own pass rather than a line fix).

Characters that bit or nearly bit in one session: U+09DF Bengali YYA, U+0931 Devanagari RRA (mr), U+200C ZWNJ inside Telugu inflected forms, U+2066/U+2069 bidi isolates (ur). Ask the reviewer which normalization form to emit and verify the count after applying.

**Corollary: ask for full lines, never do the substring swap yourself.** A Korean fix looked like a one-word noun swap (`잠재고객` -> `독자`) but the two nouns end in a consonant and a vowel respectively, so the particles had to change too (`독자을` would have been ungrammatical) -- and on one of the three lines the correct word was neither, but `사람들`. A Tamil heading fix needed two words changed, not one, to keep an adjectival/nominalized pair parallel. Subagents also caught their own errors mid-handoff twice (a wrong `Crowdin` occurrence extracted for a Tamil heading; two line numbers cited from diff-hunk offsets rather than file lines).
### 37. Loaded English polysemes resolve to the WRONG sense in Indic locales, as a bloc (CRITICAL)

Where an English word is an auto-antonym or carries a loaded secondary sense, MT into the five Indic-script locales (`bn`, `hi`, `mr`, `ta`, `te`) resolves to the everyday/administrative/religious reading rather than the legal-technical one. **The split follows the script family, not translator quality** — in PR #18938 all 19 non-Indic locales rendered the same words correctly.

Confirmed on the brand-new `/privacy/ethereum` page (`page-privacy-ethereum.json`):

| English | Wrong sense produced | Locales |
|---|---|---|
| **sanctioned** wallets (sanctions-listed) | *approved / permitted* — inverts a blocklist into an allowlist | bn `অনুমোদিত`, hi `स्वीकृत`, mr `मंजूर`, ta `அனுமதிக்கப்பட்ட`, te `మంజూరు చేయబడిన` |
| **communal** pool (shared) | *sectarian / religious* — te literally "religious"; `सांप्रदायिक` is politically loaded in India | bn, hi, mr, ta, te |
| proof of **innocence** (not guilty) | *naivety* (ta `அப்பாவித்தனம்`, te `అమాయకత్వం`), *integrity* (ko `무결성`), *candour* (id `Kepolosan`) | ta, te + ko, id |

Why it happens: in Hindi/Marathi/Bengali/Tamil/Telugu the dominant borrowed sense of "sanction" is administrative approval (`मंजूर बजट` = "sanctioned budget"), and "communal" is the religious-community sense first.

**Detection is deterministic, and agent triage is NOT sufficient** — per-language agents caught only 3 of the 8 individual misses in #18938; `ta` and `te` were found only by sweeping the string across all 24 locales. For any English source containing a loaded polyseme, extract each locale's rendering of that one term and diff the Indic group against the intended sense.

**Durable fix:** pin these senses per-locale in ETHGlossary, and keep a loaded-polyseme watchlist for the pre-ship sweep. Starter list: sanction, communal, innocence, state, actor, semantics, receipt, stake(s), audit, exposure, bundle, front-run, niche, unstructured.

### 37b. "actor" -> stage/film performer (CRITICAL — same family, wider blast radius)

English "actor" meaning *party/agent* becomes a theatrical performer in `mr` (`अभिनेते`), `ta` (`நடிகர்`), `te` (`నటులు`) and `ur` (`اداکار`). Reads as "bad film-actor", "state-employed actors", "malicious performers". The tell that it is real and not a variant: the same PR's `page-values.json` renders "bad actors" correctly with a non-theatrical word (`वाईट प्रवृत्तीचे लोक`, `చెడ్డ వ్యక్తులు`), so it is cross-file disagreement inside one import. Fix with the entity/party word (`घटक`, `தரப்புகள்`, `వ్యక్తులు/సంస్థలు`, `عناصر`).

### 38. Frontmatter guard requires a trailing newline -> sanitizer corrupts YAML in frontmatter-only files (CRITICAL — build/data)

`fixBareRtlDates`, `fixBareRtlMath` and `fixBareRtlValues` each split frontmatter off with `/^(---\n[\s\S]*?\n---\n)/`, which **requires a newline after the closing `---`**. `/videos/*` stubs are frontmatter-only and the pipeline emits them **without** a trailing newline, so the match returns null, `frontmatter` becomes `""`, the entire file is treated as body, and `RTL_SKIP_PATTERN` does not protect YAML. Result in PR #18938: `uploadDate: <span dir="ltr">2025-12-09</span>` in all 4 ar/ur video files.

Reader impact is silent, not a build break: `gray-matter` parses the value as a **string** rather than a Date, so `formatDate()` fails `isValidDate` and returns `""` — the video page renders a **blank** upload date — and `app/[locale]/videos/[slug]/page-jsonld.tsx` emits `<span dir="ltr">2024-11-14</span>T00:00:00+00:00` as the schema.org `VideoObject.uploadDate`, injecting raw HTML into structured data. `VideoGalleryFilter` also sorts on the string, and `<` (0x3C) sorts after digits.

Note `uploadDate` was **already** on the sanitizer's `syncProtectedFrontmatterFields` protected list and the LLM is explicitly forbidden from doing this (`prompt-builder.ts`) — the sanitizer did it to itself, *after* the correct value had been copied from English. Guards downstream of a protection step must be verified independently.

**Fixed in #18938:** all four guards now accept `\n---(?:\n|$)`, the pipeline emits a trailing newline, and `tests/unit/intl-pipeline/sanitizer/standalone-fixes.spec.ts` covers the frontmatter-only case for both `fixBareRtlDates` and `fixBareRtlValues` (both new tests fail without the patch). Patching the guard does **not** clean already-corrupted files — `RTL_SKIP_PATTERN` protects existing `<span dir="ltr">` for idempotency, so shipped corruption needs a separate unwrap.

### 39. `/videos/*` frontmatter is translated on a path that never consults ETHGlossary (HIGH — fleet-wide)

In PR #18938 the two new video stubs disagreed with their *own locale's* JSON on the PR's core terms, while the JSON files were glossary-clean — the signature of a separate, unbound translation path rather than per-language error. Six locales (`bn`, `hi`, `ru`, `te`, `uk`, `ur`) rendered `privacy` differently in the stub than in their `page-privacy-ethereum.json`; every non-Latin locale with a translated `Ethereum Foundation` entry used a phonetic transliteration instead (ar `إيثريوم فاونديشن` vs `مؤسسة إيثيريوم`, ko `이더리움 파운데이션` vs `이더리움 재단`, ru `Этериум Фаундейшн` vs `Фонд Ethereum`, ja `イーサリアム・ファウンデーション` vs `イーサリアム財団`); `ta`/`te` left `Ethereum` in Latin against a 163-occurrence mandate; `hi`/`mr`/`ta`/`te` transliterated `account abstraction` and `decentralized identity` instead of using the compound entries.

**Detection:** for each locale, diff the stub's rendering of a core term against the same locale's JSON for the same term. Cross-file disagreement inside one PR is the tell (same logic as #30). Latin-script locales keeping the `author` byline in Latin is the **established convention** and is not a defect.

### 40. Splitting one sentence across two intl keys forces English word order on every locale (HIGH — English-source defect)

A `<strong>{t("x-strong")}</strong>{" "}{t("x")}` render pattern makes the second key a grammatical **fragment** that only parses in English order, joined by a space hard-coded in the component. Translators cannot see or change the join, so locales whose syntax differs have no legal rendering. On `/values` in PR #18938: German requires a comma before the relative clause and could not add one; Turkish repeated the head noun to stay grammatical, shipping "**Güvenlik** güvenlik ..." (= "Security security you cannot inspect"). A continuation key that begins with punctuation (`". It's the result of ..."`) is worse — the sentence boundary lives in the wrong file.

Reviewers: treat any `-strong`/`-continued`/`-part2` key pair as a defect in the **English source**, not a translation error, and expect the same bullet to break in several unrelated locales at once. Fix = one key per sentence with inline tags rendered via `t.rich` + `Strong`/`Emphasis` from `@/components/IntlStringElements`. Rule recorded in the `design-system` skill (`references/i18n-rtl.md`).

### 41. Partial JSON updates ship translated content without refreshing `translation.json` (MEDIUM — manifest drift)

When a JSON namespace is updated **incrementally** (a subset of keys), the pipeline writes the new `source.json` rootHash but leaves `translation.json` untouched, so the manifest records the translation as behind English even though the content just shipped. Full-file updates refresh both.

PR #18938: `page-community.json` (28 of 55 keys) and `learn-quizzes.json` (49 of 744) shipped translated content with `translatedAt` still reading 2026-06-16 / 2026-05-07 and `englishManifestHash` pointing at the **old** rootHash, e.g. `de/page-community` `source.rootHash=f2518dbf3879` vs `trans.englishManifestHash=2ea5fe9c1b8f`. The two fully-new files (`page-values`, `page-privacy-ethereum`) matched correctly.

**Consequence is record-keeping only — do NOT over-escalate this.** Verified in the #18938 review: the incremental gate is `hasEnglishChanged(englishContent, source.json)` (`manifest-adapter.ts:141`), which reads **`source.json` alone**. `translation.json` is never read for any decision and `englishManifestHash` is **write-only** across the whole pipeline. So a stale `translation.json` does **not** trigger re-translation and does **not** put review fixes at risk. What it does break is observability: `translatedAt` and `englishManifestHash` misreport when a locale was last translated, so the manifests can't be trusted to answer "is this locale current?".

**`stamp_only` will not fix it.** That flag writes only the *source* manifest, and it sits behind the same `hasEnglishChanged` gate — for a file whose `source.json` is already current it is a complete no-op. Fixing this needs a pipeline change that writes `translation.json` on the incremental path, not a workflow run.

**Check with a hash comparison, not timestamps alone:** `source.json.rootHash == translation.json.englishManifestHash` per file per locale.

### All 24 languages -- /values + /privacy/ethereum + privacy quiz + community, Reviewed PR #18938 (intl/pending-dev)
- 24 langs x 8 files (es: 9) = 193 content files. Changed surface: `page-values.json` 39/39 (new page), `page-privacy-ethereum.json` 116/116 (new page), `page-community.json` 28/55, `learn-quizzes.json` 49/744 (new privacy quiz), plus 4 markdown (2 new frontmatter-only video stubs, `roadmap/security`, `nodes-as-a-service`). Fleet avg **8.9** — well below the 9.5-9.7 of recent runs.
- Scores: fr/pt-br 9.6, cs 9.5, zh 9.4, it 9.3, id/ja/pl/ru/zh-tw 9.2, ar/de/tr/vi 9.1, ko 8.8, es 8.7, sw/uk 8.6, bn/hi 8.4, mr 8.0, te/ur 7.9, ta 7.4. **The bottom six are five Indic locales plus `ur`** — see #37.
- **Deterministic layer clean**: MDX compile 97/97 (English controls clean, no build-breakers), full JSON key parity, rich-text tag + ICU sets byte-match, zero `HTML-PLACEHOLDER` leaks, hrefs byte-identical, zero ticker/domain typos, no `<span dir=` in JSON values.
- **`roadmap/security` was broken in all 24 locales** and repaired by a scoped `mode=full` re-run (not hand-edits): English had been rewritten to 8 sections, every locale still carried the superseded 5, and this PR patched only the "Current progress" block onto them — 23 locales also lost `{#current-progress}`, and `ur` received 19 lines of **verbatim untranslated English** while losing its translated section. The re-run also restored `summaryPoints` and replaced the invalid `variant="outline-color"` ButtonLinks. It additionally fixed the zh-tw negation-scope error and left ja `devnet` bare (hand-fixed to `デブネット`).
- **English-source defects, inherited by every locale:** `page-values` Open Source / Security card **descriptions swapped** (flagged independently by 14 agents; fixed by exchanging the values in all 25 files, which needs no re-translation since both strings already existed everywhere); the split-sentence `-strong` keys of #40; `Quicknode` -> `QuickNode` casing, which several locales had already corrected on their own.
- **Hand-fix sequencing (per #34) was deliberate here:** the `mode=full` re-run of `roadmap/security` was triggered *first*, and every hand-fix — including ja `devnet` -> `デブネット` in that same regenerated file — was applied afterwards. ~90 term fixes across non-Latin locales now live in `page-privacy-ethereum.json`, `page-values.json`, `page-community.json`, `learn-quizzes.json` and the two `/videos` stubs; a future `mode=full` on any of those paths will erase them. They are derived from ETHGlossary entries and agent-stated expected values but are **not native-speaker reviewed** — the `ta`/`te` inflected forms most of all.
- **METHODOLOGY — a sweep that silently matches nothing is worse than no sweep.** The first href/heading/ticker/domain pass in this review was a **no-op**: written in zsh, `for L in $LANGS` does not word-split, so every iteration skipped and all four checks reported clean. That masked a 23-locale anchor deletion until an agent contradicted the result. Always print a per-item count and assert a non-zero file count before trusting a sweep; and treat an agent that contradicts a deterministic "clean" as a signal to re-run the sweep, not as a false positive.

### 42. A pure block INSERTION on the English side deletes the heading above it (CRITICAL — pipeline bug, narrower sibling of #32)

#32 was diagnosed on blocks that were **deleted or replaced** in English. PR #18942 shows the same corruption from an English edit that only **added** blocks: `developers/docs/accounts/index.md` gained one sentence to an existing paragraph plus one new paragraph, and 10 of 24 locales (ar, fr, ko, pl, pt-br, sw, tr, vi, zh, zh-tw) silently lost `## Contract accounts {#contract-accounts}` — the h2 four blocks *above* the edit. The surviving locales got the same content correctly, so this is a mapping race, not a prompt problem. Do not assume "additive English change = safe incremental run"; #35's rule (auto mode is unsafe for ANY English edit on a page with structural markup) covers insertions too.

Blast radius is smaller than #32's: the section body survives, so nothing is lost — it merges into the preceding section and drops out of the TOC. Check inbound anchor links before escalating (`grep -rn 'accounts/#contract-accounts' public/content src app`); here there were none, so the damage was TOC + section structure only.

**Detect:** per locale, diff the `{#anchor}` ID **set** and the h1-h4 **count** against the English source. Heading count 11 vs 12 with an otherwise-identical ID set localizes the drop immediately. This is cheaper and more reliable than agent triage (#25).

**Repair by hand is correct here, unlike #32.** The corruption is one missing line, precisely located, and the surviving prose is good — a `mode=full` re-run would retranslate 137 lines x 24 locales and invite the collateral drift #33 warns about. **Extract the heading from the pre-PR blob with `git show <base>:<path>`, never retype it** (#36: hand-typing through a text channel silently alters Unicode composition). Insert heading + blank line before the paragraph that follows it in English.

### 43. An inserted block eats the blank line before the next heading (LOW — fleet-wide whitespace)

Same run, all 24 locales: the new paragraph was written flush against `## ... {#validators-keys}`. CommonMark still parses an ATX heading that interrupts a paragraph, so this is not a build-breaker, but it diverges from English and from every other heading in the file. Safe to hand-repair (whitespace only, no manifest implication). Same signature as the "blank line before the next `###` eaten" row in #32's table — that row is not specific to deletions.

**Detect:** `awk 'NR>1 && /^#{1,4} / && prev !~ /^$/ {print NR": "$0} {prev=$0}' <file>`.

### 44. Multi-word product names come back half-transliterated in non-Latin locales (HIGH — brand)

PR #18942, `app-session-description`: "Arbitrum One" shipped as `أربيتروم ⁦One⁩` (ar), `আরবিট্রাম One` (bn), `आर्बिट्रम One` (hi), `アービトラム One` (ja), `아비트럼 One` (ko), `आर्बिट्रम् One` (mr), `ஆர்பிட்ரம் One` (ta), and fully transliterated `آربٹرم ون` (ur) — 8 of 24, and **no convention supports the hybrid**. The first token gets transliterated because the bare brand has locale precedent; the second stays Latin because it does not.

**The fix reference is the locale's own corpus, not your judgment.** All 8 render the same product as Latin `Arbitrum One` in `page-layer-2.json`, so aligning to that is a consistency fix rather than a policy call. For ar/ur, keep the `⁦...⁩` (U+2066/U+2069) isolate that file uses around Latin runs.

**Detect:** for each Latin brand token in the English string, if an early token is absent from the translation while a later token of the same name is present, it is a hybrid.

### 45. English coinages with two live senses split the fleet (HIGH — English-source defect)

`app-publicnode-description` says "Fastest, **free-est**, and privacy first RPC endpoints". 20 locales read it as free-of-charge (`مجانية`, `nejbezplatnější`, `kostenlosesten`, `gratuitos`, `darmowe`, `бесплатные`, `bure`, `ücretsiz`, `miễn phí`, `最免费`, ...); 4 read it as liberty — ja `最も自由`, ko `가장 자유로우며`, uk `найвільніші`, zh-tw `最自由`. The majority reading is the correct one (PublicNode's pitch is zero-cost public RPC).

**Do not hand-fix the 4 locales.** "free-est" is a superlative of a non-gradable adjective, so several target languages have no clean rendering at all (cs `nejbezplatnější`, de `kostenlosesten` and pl `najbardziej darmowe` are all grammatically odd in the same way English is). Inventing superlatives in 4 languages is worse than fixing the source. Durable fix = disambiguate the English, and the whole fleet follows on the next run.

### 46. Lowercase product-component nouns get calqued fleet-wide (MEDIUM — English-source casing)

`app-the-interfold-description` says "a distributed network of **ciphernodes**". Ciphernodes is Enclave/Interfold's named component, but the English lowercases it mid-sentence, so ~15 of 24 locales reasonably treated it as a common noun: cs `šifrovacích uzlů`, es `nodos de cifrado`, fr `nœuds de chiffrement`, pl `węzłów szyfrujących`, ru `шифроузлов`, sw `nodi za usimbaji`, tr `şifreleme düğümleri`, uk `шифровузлів`, vi `các nút mật mã`, zh `密码节点`, zh-tw `密碼節點` (which reads as "password node" in Taiwan usage), plus transliterations in bn/hi/ja/mr/te/ur.

**Reviewer policy: this is a warning, not a critical, and it must not be fixed in one locale.** Agents will disagree on severity for exactly this reason (pl called it critical, 14 others called it defensible) — the split is a signal that the English is ambiguous, not that one locale erred. Fix by capitalizing `Ciphernodes` English-side if it is meant as a product term; a per-locale sweep otherwise just trades one inconsistency for another.

### 47. "gatekeeper" collapses onto the locale's word for "middleman" (MEDIUM — same-file term collision)

`page-values.json` uses **two** distinct English gatekeeping words in sibling strings: "middleman" (`page-values-card-censorship-resistance-description`) and "gatekeeper" (`page-values-internet-list-privacy`, `page-values-faq-3-p1`). Six locales mapped the new "gatekeeper" onto the word already carrying "middleman" while leaving the FAQ's gatekeeper distinct — es `intermediario` vs `guardián`, fr `intermédiaire` vs `gardien`, it `intermediario` vs `guardiano`, pt-br `intermediário` vs `guardião`, ru `посредник`, bn dropped it. So one English term now has two renderings and two English terms share one. uk got it right (`контролер`, matching its own FAQ string).

Not a glossary term, so either word is defensible in isolation — the defect is intra-file. Check `page-values` gatekeeper/middleman pairs explicitly on any run that touches that namespace.

### 48. A negative-valence English abstraction loses its valence across the Indic + id bloc (MEDIUM — semantic softening)

`page-values-internet-list-open-code`: "turns transparency into **exposure**". English "exposure" here is the harm (laid bare to surveillance); the translations reach for a neutral or positive near-synonym of "transparency", making the warning tautological. bn `উন্মুক্ততা` (openness), hi `जोखिम` (risk), id `pengungkapan` (disclosure), mr `उघडपणा` (frankness), ta `ஆபத்து` (danger) — 5 of 24, all in the Indic + Malay-Indonesian group, same failure shape as #37 but on an abstraction rather than a polyseme. Two of them (hi, ta) *replaced* a previously-correct rendering, so this is regression-prone on re-translation.

Reviewers: on any virtue-becomes-harm construction ("transparency into exposure", "openness into surveillance"), check the second noun is not a synonym of the first in the target language.

### All 24 languages -- accounts CREATE2 + 4 page JSONs + ru/vi plasma, Reviewed PR #18942 (intl/pending-dev)
- 24 langs x 5 artifacts (`developers/docs/accounts/index.md` + `page-app-descriptions` / `page-apps` / `page-developers-tools-descriptions` / `page-values`), plus a full retranslation of `developers/docs/scaling/plasma/index.md` for ru and vi. 122 content files, 644 changed JSON strings. Fleet avg **9.1**.
- Scores: ar/te 9.6, bn/it/ko/pt-br 9.4, ja 9.3, cs/de/hi/id/uk/zh 9.2, pl 9.1, es/fr/sw/tr/zh-tw 9.0, ta 8.9, ur 8.8, mr/ru/vi 8.4.
- **Deterministic layer found both structural defects; no agent surfaced either.** #42 (10 locales lost `{#contract-accounts}`) and #43 (24 locales lost a blank line) came from an anchor-set/heading-count sweep run before the fleet launched, and telling the agents these were already handled kept 24 reports from re-reporting the same two lines. JSON layer was clean on the first scoped pass: ICU placeholders, `<strong>` tags, key parity, empty values, cross-script leakage all byte-correct across 644 strings.
- **Two false positives worth remembering.** (1) A `[ऀ-ॿ]` "Devanagari leak" check fires on every Bengali string, because Bengali shares the danda `।` U+0964 with the Devanagari block — exclude U+0964/U+0965. (2) Checking brand presence with `en.includes(b) && !tr.includes(b)` flags "Ethereum" in every non-Latin locale (legitimately transliterated) and in Czech (legitimately declined to `Ethereu`); scope brand sweeps to distinctive product names and to PR-changed keys only, or you get 1500 hits and no signal.
- **Fixes applied (47 across 34 files):** #42 heading restored in 10 locales from the pre-PR blob; #43 blank line in 24; #44 `Arbitrum One` in 8; ur `app-tornado-cash-description` `لین دین` -> `ٹرانزیکشنز` (ETHGlossary reserves the transliteration for signed transactions and names `لین دین` as the term to avoid); ur Arabic kaf U+0643 -> Urdu keheh U+06A9 in the 4 PR-introduced strings that inherited the file's misspelling of `لامرکزی`; ru `Таручи` -> `Taruchi` (23 of 24 keep the game-creature name Latin); fr `frappez Taruchi` -> `frappez le NFT Taruchi`, since `frapper` + a bare proper noun parses as "you **hit** Taruchi" and every other `frapper` in that file has an explicit NFT/token object.
- **Left unfixed on purpose:** #45 free-est (English-side), #46 ciphernodes (English-side), #47 gatekeeper (intra-file style), #48 exposure (needs native calls in 5 locales), ru plasma `Мейннет`/`основная сеть` split (6 vs 22 in one file, both glossary-sanctioned, declension-sensitive) and 2 stray `ё` in an otherwise ё-less corpus, vi plasma `kế hoạch cam kết` / `tiêu đề đối chiếu` / `yêu cầu nhận định` concept-level term errors. All are native-speaker calls, not mechanical corrections.
- **The plasma retranslations are a net upgrade with consistency debt.** ru replaced non-glossary forms throughout (`офф-чейн`, `ролл-апы`, `обязательства по состоянию`, `вайтпейпер`) and restored 3 missing heading anchors + 1 link; vi has zero glossary deviations across 60 matched terms. Both then split load-bearing vocabulary inside the one fresh file — ru: Mainnet, contract/smart-contract, block producer; vi: funds (3 forms), malicious (2), data unavailability (2), cryptographic proof (2), rollup (3). Full-file retranslation trades old wrong terms for new inconsistent ones; budget review attention accordingly (#33's collateral-drift warning applies to terminology, not just tense).
- **#41 recurred:** `accounts/index.md` shipped translated content in all 24 locales with `source.json` bumped to 2026-07-30 and `translation.json` still reading 2026-06-18. Record-keeping only, per #41 — the incremental gate never reads `translation.json`.
- **`kontrat` vs `sözleşme` in tr is not a defect.** The restored heading reads `Kontrat hesapları` while the body says `Sözleşme adresi`; ETHGlossary has both `contract account => kontrat hesabı` (compound) and `contract => Sözleşme` (bare), so the mix is exactly what the glossary prescribes. Do not auto-normalize it — see #30 for the inverse failure.

### 49. A JSX component added to an English page is NEVER propagated to any locale (CRITICAL — pipeline coverage gap)

When a component with no translatable text is appended to an English page, the pipeline does not carry it into any locale. PR #19015: `<QuizWidget quizKey="..." />` (and the `<Divider />` above it, where present) was added to 8 English pages by the quiz-expansion effort and was missing from **all 24 locales on all 8 pages — 192 files**. The quiz *strings* were fully translated in every locale (`learn-quizzes.json`, full key parity for all 8 quizzes), so the only thing missing was the one-line component invocation: every non-English reader silently lost the end-of-page quiz.

The pipeline **can** carry the component — 217 already-translated files elsewhere in the tree contain `<QuizWidget>` — so this is an incremental-propagation gap on newly added components, not a policy.

**Detect deterministically:** per file, diff the count of each `<Component` between English and each locale. A component present in English and absent in 24/24 locales is a coverage gap, never per-language error (the same logic as #29's extraction gap).

**Repair by hand is correct and safe:** the block requires zero translation. Copy the trailing component block verbatim from the English source and append it, preserving the blank-line separation. Verify the referenced `quizKey` has full string coverage in every locale *first* — if the strings are missing, the widget renders broken.

### 50. The angle-bracket autolink corruption of #3 also appears as a MOVED `>`, not only a dropped one (CRITICAL)

Pattern 3's last row covers a *dropped* `>` in `[t](<url_(qual)>)`. PR #19015 produced the sibling form: the `>` was **moved to before the file extension**, giving `[src](<https://…PayPal-(1)>).pdf>)` — a broken href plus a literal `).pdf>)` rendered as visible junk. **All 24 locales, both table rows of `energy-consumption/index.md`, 48 dead links**, and PR-introduced (zero occurrences pre-PR).

**The regex matters.** A naive `\]\(<[^)]*?>\)` finds nothing, because the URL itself contains `)`. Grep for the tell instead: `>\)\.[a-z]+>\)` (or simply `>)\.pdf`). Fix is `s/>\)\.pdf>\)/.pdf>)/`. Add this to the standard deterministic sweep — the MDX compiler does **not** flag it, so it ships silently.

### 51. One English commit can propagate its STRUCTURAL edits and silently drop its PROSE edits (CRITICAL)

#32/#35 frame incremental-merge damage as deleted headings and spliced links. PR #19015 shows a quieter variant: of the 6 changes in English commit `0e42e1a2ee`, **4 landed in all 24 locales and 2 did not** — and the 2 that failed were both single-clause prose edits inside otherwise-updated paragraphs:

| English change | Propagated? |
|---|---|
| section retitle, note rewrite, whole EIP-8080→8061 section body, resources link | 24/24 ✅ |
| `H2 2026` → `Q4 2026` in the alert | 0/24 ❌ |
| `democratize liquidity` → `speed up how quickly stakers can move their stake` | 0/24 ❌ |

The same run also deleted a whole FAQ section (#32) in 24/24. So a run can be simultaneously right about the hard parts and wrong about the easy ones — **"the big restructure came through" is not evidence the small edits did.**

**Detect deterministically:** enumerate the English commit's changed lines (`git show <sha> -- <path> | grep -E '^[+-][^+-]'`) and assert each one's counterpart changed in every locale. Anchor on a distinctive token from the new English (a date, an EIP number, a renamed noun) — set-based anchor/link diffs pass cleanly here because neither stale clause carried a link or an anchor.

**Repair choice hinges on the line count, not the pattern.** Two stale prose lines × 24 is cheaper and lower-risk to hand-patch from per-locale agent output than a `mode=full` re-run, which would also discard hand-repairs already made to the same file (#34) and invite collateral drift (#33). Reserve `mode=full` for when whole sections are missing or the count runs past a handful of lines per locale.

### 52. Balanced `<strong>` count mismatches in SOV/RTL locales are CORRECT — do not flag (REVIEW HYGIENE)

English bolds a contiguous verb+object (`<strong>Distribute public funds</strong> and benefits…`). In SOV and verb-final languages the verb moves to the end, so the bolded phrase legitimately splits into two discontiguous runs and the locale ships **two** balanced `<strong>` pairs where English has one. PR #19015: 26 such mismatches across bn/hi/ja/ko/ta/tr/ur/zh/zh-tw in `page-what-is-ethereum.json`, every one correct.

**The discriminator is direction, not count:** `translated > english` and balanced = legitimate redistribution; `translated < english` = a genuinely dropped emphasis (one real case in #19015: bn lost the `<strong>` around `DeFi`). Confirm the key renders through `t.rich` — next-intl accepts repeated tags, so the split is safe. Same family as the ar/ko redistributions noted under PR #18739.

### All 24 languages -- glamsterdam + core docs + what-is-ethereum, Reviewed PR #19015 (intl/pending-dev)
- 24 langs x 11-12 files (8-9 markdown + `common.json` / `learn-quizzes.json` / `page-what-is-ethereum.json`) = 200 markdown + 72 JSON. Pages: `bridges`, `developers/docs/{blocks,evm,transactions}`, `energy-consumption`, `payments`, `roadmap/glamsterdam`, `what-are-apps`, plus `zero-knowledge-proofs` in 8 locales. Fleet avg (pre-fix) **8.4**.
- Scores: ru 9.6, zh 9.4, bn 9.1, fr/zh-tw 9.0, hi 8.9, pl/pt-br 8.8, id/it/ko 8.7, tr 8.6, mr 8.5, ja/te/uk/vi 8.4, de 8.3, es 7.7, ur 7.5, cs/ta 7.4, ar 7.2, sw 6.2.
- **The Netlify build was RED on arrival.** Cause: `<p>` collapsed to `<p></p>` in `zero-knowledge-proofs/index.md` in 8 locales (bn hi ko mr ta te tr ur), orphaning the following `</p>` -> `Unexpected closing tag </p>, expected closing tag for <AlertDescription>`. Fixed; 200/200 compile clean and a scoped `NEXT_PUBLIC_BUILD_LOCALES` build passes.
- **Deterministic sweeps found every structural defect; no agent surfaced any of them first** (#25 again). Five fleet-wide finds: the build-breaker (8 locales), #50 `.pdf` autolink corruption (24 locales, 48 links), #32 deleted FAQ section `{#will-my-smart-contracts-change}` (24 locales), #49 missing `<QuizWidget>` (192 files), and 13 ghost duplicate blocks (7 locales). Agents then supplied the judgment layer *and* the per-locale replacement prose the sweeps could not write.
- **Resuming a finished per-language agent to request one exact line is the cheapest way to hand-patch a fleet-wide prose defect.** 18 agents were resumed from transcript for the #51 lines; each returned a full grammatical line in seconds with its locale context still loaded, avoiding both a `mode=full` re-run and reviewer-authored prose in 24 languages (#36).
- **Confirmed clean fleet-wide:** JSON validity 72/72, full key parity, ICU placeholders, rich-text tag sets (modulo #52), zero `HTML-PLACEHOLDER` leaks, no untranslated English prose chunks (vi's historical failure mode absent), no ticker/domain typos, no transliterated domains. One real cross-script contamination: a Bengali word `বিপুল` inside Tamil prose in `ta/zero-knowledge-proofs`.
- **Recurring per-locale glossary regressions, all fixed against ETHGlossary + the locale's own corpus:** cs `gas`->`plyn` (42 sites across 5 files, while cs `common.json` had it right); sw `client`->`mteja` (customer) instead of `kiteja` (31 sites, worst score of the fleet); the `actor`->film-performer polyseme (#37b) recurring in bn/hi/mr/ur; fr `créneau`->`slot` reversion and bare `L1`/`L2` nav strings; pl `receipt`->`paragon` (till receipt); es untranslated `banks` and `Merge`; it/es `gatekeeper` collapsing onto `intermediario` (#47 recurred); mr `miners`->`खनिज` (mineral); te/ar/mr `zero-knowledge proof` nav labels disagreeing with their own page titles.
- **The stray `# <Title> {#anchor}` h1 in translated `roadmap/glamsterdam` (24/24) is PRE-EXISTING**, inherited from the h1 -> `frontmatter.title` migration (`d9f62fb787`); English has no h1 and the locales still carry one. It is corpus-wide, not this PR's regression — left alone, still owed a dedicated sweep.

### 53. ETHGlossary's OWN term data carries lowercased acronym parentheticals and non-Western numerals (CRITICAL — glossary data, fleet-wide)

The authority is the defect source. `GET /api/v1/translations/{lang}/L2` returns, verbatim:

| correct `(L2)` | lowercased `(l2)` |
|---|---|
| ar `طبقة 2 (L2)`, de `Layer 2 (L2)`, ja `レイヤー2 (L2)`, pl `warstwa 2 (L2)`, zh-tw `第二層 (L2)` | the other **19 of 24** — es `capa 2 (l2)`, fr `couche 2 (l2)`, ru `уровень 2 (l2)`, cs `vrstva 2 (l2)`, zh `二层网络 (l2)`, ko `레이어 2(l2)`, id, it, hi, sw, ta, te, tr, uk, vi, pt-br, bn, mr, ur |

Three locales additionally carry non-Western numerals in the term form itself: bn `লেয়ার ২ (l2)`, mr `स्तर २ (l2)`, ur `لیئر ۲ (l2)`. The English canonical is `layer 2 (L2)` with `avoid: ["Layer 2", "layer-2", "Layer-2"]` and preferred aliases `layer 2` / `L2`, so the lowercase exists only on the translation side. The same lowercasing hits `(l1)` at 1–12 sites per language file.

**Blast radius:** 1,609 occurrences in `src/intl/`, 4,665 in `public/content/translations/`.

**Why this matters more than the count.** The pipeline is faithfully reproducing its authority, so **every one of these is a false positive under the ETHGlossary-as-authority policy** and must NOT be hand-fixed — a local fix is reverted by the next run on that file (#34). The proof that the authority (not the content) is broken: **bn and mr resolved the identical glossary-vs-house-policy numeral conflict in OPPOSITE directions** in this very PR — bn used Western `লেয়ার 2` (house rule, contradicts glossary), mr used `स्तर २` (glossary, contradicts house rule). Neither translator erred. Two authorities disagree and the pipeline has no tiebreak.

**Fix order:** normalize the ETHGlossary entries (uppercase the acronym parenthetical; Western numerals in term forms per the house numeral rule), then re-run, then sweep the residue. Do not open per-locale fix PRs first.

**Reviewer rule:** a lowercase `(l2)`/`(l1)` or a non-Western numeral inside a glossary term form is an **upstream data item, not a locale finding**. Query `/translations/{lang}/{alias}` before filing it. Note `/translations/{lang}/layer-2-l2` returns `Term not found` — resolve via the `L2` alias.

### 54. Runtime-composed fragment keys force a per-locale agreement guess, and are safe only by accident (HIGH — English-source/data design)

The find-wallet fee cluster ships fragments assembled at render time: `page-find-wallet-fee-item` = `{label}: {value}`, plus `from {value}`, `{value}/month`, `{value}/card`, `Get {wallet}`. Every inflected locale must pick a case/gender/class for a value it cannot see, and all 24 picked differently:

- **ru is the only one that solved it** — `варьируется` / `не разглашается` / `устанавливается провайдером` are finite VERBS, so no agreement is exposed. Recommend this shape to other locales.
- **cs/es/it/pt-br/ar/sw agree with their own "fee" noun** and are correct *only because* `wallet-data.ts` never pairs a `type: "device"` label (masc./class-7) with a `text` value — device entries always carry a `usd` amount. Add one `{type: "device", text: "undisclosed"}` row and six locales break agreement simultaneously.
- **fr already mismatches** — masculine singular fragments against plural `frais`.
- **tr glued a FIXED vowel-harmony suffix to the placeholder**: `{value}'den başlayan`. Newly introduced in this PR and the only `{placeholder}'suffix` in all of `src/intl/tr`. The single live value (%0,5) actually requires `-ten`; other values need `-dan`. No suffix can be right for a variable number.
- **pl/uk put accusative after a slash** (`{value}/kartę`, `{value}/картку`) where unit-price convention is nominative.

**Durable fix is on the English/data side, not in 24 locales:** emit `≥ {value}` instead of `from {value}`, and prefer whole translatable sentences over `{label}: {value}` concatenation. Same family as #40 (split-sentence keys forcing English word order).

**Reviewer rule:** for any fragment key, read `src/data/wallets/wallet-data.ts` (or the equivalent data source) and enumerate the label/value pairings that actually occur before judging agreement. "It agrees with the noun I assumed" is not a check.

### 55. Check the locale tree's established rendering BEFORE "fixing" a term of art (REVIEW HYGIENE)

An agent filed ta `fee-label-shield-unshield` = `பாதுகாக்கும்/பாதுகாப்பை நீக்கும் கட்டணம்` as critical, reasoning that "shield/unshield" is Railgun privacy-pool terminology and the protect-root reading is wrong. The recommended fix was a transliteration, `ஷீல்ட்/அன்ஷீல்ட்`.

That fix would have been wrong. `ஷீல்ட்` has **zero** occurrences in the ta tree, while `பாதுகாக்கப்பட்ட` has **29** — including ta's own translation of `next-great-wallet-private/index.md`, which is the Railgun privacy article and renders EN "shielded pools"/"shielded balance" with exactly that root. The translator followed house convention; coining a transliteration against 29 established occurrences would have been the defect.

The **inverse** check validated the sibling finding: pt-br's `proteção/desproteção` genuinely contradicts its own tree, which renders the same Railgun concepts as `pools blindados` / `saldo blindado` / `depósito de blindagem`. So `Taxa de blindagem/desblindagem` was applied as an evidence-backed fix, not a guess.

**Rule:** before changing a term of art, grep the locale's `src/intl/` AND `public/content/translations/` for the concept — ideally in the English article that discusses it, so you compare like with like. Precedent count decides. Downgrade to a warning + a glossary request when the locale is internally consistent and only the *page* has a collision.

### 56. "rewards" lands on the gift/prize word wherever ETHGlossary has no entry (MEDIUM — glossary gap)

`fee-qualifier-of-rewards` = "{value} of rewards" (a staking-commission cut) drifted to the gift/prize sense in id `hadiah`, sw `zawadi`, hi `इनाम`, bn `রিওয়ার্ড`, te `రివార్డ్` — while each tree's dominant staking-rewards term is different (hi/bn `पुरस्कार`/`পুরস্কার`, te `ప్రతిఫలాలు`, id `imbalan`). No ETHGlossary entry exists for `rewards`, so none of these is a policy violation. Given how often staking rewards appear site-wide, this warrants an entry.

### 57. "shield / unshield" has no glossary entry and split the fleet six ways (HIGH — glossary gap)

One string, six strategies: id kept it Latin (best — matches the wallet's own UI); it kept it Latin; ur transliterated (`شیلڈ/ان شیلڈ`, preserves the term of art); ja/ko transliterated (`シールド/アンシールド`, `쉴드/언쉴드`); es reached the correct term of art (`blindaje/desblindaje`); and ar `الحماية`, sw `kukinga`, vi `che giấu`, fr `masquage`, ta `பாதுகாக்கும்`, zh/zh-tw `屏蔽` all reached for protect/conceal/block verbs. `che giấu` carries a cover-up valence; `屏蔽` reads "block/censor" in mainland usage and "physical/EM shielding" in Taiwan — both bad on a fee row.

A six-way split on a single term is the signal that **the English is opaque without protocol context**, not that ten translators failed. Pin `shielded` / `shielding` / `unshield` in ETHGlossary and this resolves fleet-wide in one edit instead of ten hand-fixes (and see #55 — several of the "wrong" renderings are each locale's established form).

### 58. "holding" gets reframed as "investing" in the persona/marketing register (MEDIUM — editorial)

EN `Holding for the long run?` came back as pl `Inwestujesz długoterminowo?`, ru `Инвестируете на долгий срок?`, ko `장기 투자를 계획하고 계신가요?` — three locales, same clause, same drift into investment framing that ethereum.org copy deliberately avoids. ru additionally dropped the trailing `while you hold` clause. cs/uk/tr/ja/zh/zh-tw all kept holding/storing correctly.

**Detect:** grep new persona/marketing keys for each locale's invest-root (`inwest`, `инвест`, `투자`, `inversión`, `investi`) and check it against an English source that never says "invest".

### 59. Hard-coded punctuation in a component defeats correct locale punctuation in the string (LOW — code-side i18n)

`src/components/FilterableCatalog/index.tsx:306` renders `{labels.resultsLabel}:{" "}` — an ASCII colon appended in JSX. zh/zh-tw/ja render `找到的钱包: 42` where the convention is full-width `：`, and fr wants `&nbsp;:`. Both CJK translators used `：` correctly in `page-find-wallet-fee-item`, where the punctuation is inside the string and therefore theirs to control. Fold the separator into the translatable string, or make it locale-aware.

**Reviewer rule:** when a locale's punctuation looks wrong on the rendered page but right in the JSON, grep the component for the glue.

### All 24 languages -- find-wallet UI strings, Reviewed PR #19076 (intl/find-wallet-translations)
- Feature-branch PR, not `intl/pending-dev`. 24 locales x 1 file (`page-wallets-find-wallet.json`) = 24 files, plus 24 manifests. 47 added keys (5 persona hero title/description pairs + a 24-key `page-find-wallet-fee-*` disclosure cluster + `crops-*` badges), 1 changed (`persona-legend`: filter -> browse), 5 removed. Fleet avg **9.35** -- second-highest recorded, behind #18868's 9.7.
- Scores: it 9.8, cs/id/ru 9.7, ar/pl/uk/zh-tw 9.6, hi/ur 9.5, de/ja/mr/sw/te 9.4, tr/zh 9.3, bn/es/ko/vi 9.2, fr 8.8, pt-br 8.7, ta 8.1.
- **19 of 24 locales had zero criticals.** 10 fixes applied across 6 locales: vi `Tải`->`Nhận` (get-wallet read "Download Ledger Nano X" for a physical device), fr `fee-row-label` (dropped the "for", so the header stated an amount), es `fee-row-label` (`Por qué` = interrogative "why"), tr `sabit coin`->`sabitcoin` x2 (**third recurrence**, after #18772 and #19015), ta `நிலையான நாணய-`->`ஸ்டேபிள்காயின்` x2 (glossary, 155-vs-7 corpus margin), pt-br shield/unshield -> `blindagem/desblindagem` and swap x2 -> `troca`.
- **Structural layer was clean on arrival and needed no repair** — the first review in this series where that held. A real `@formatjs/icu-messageformat-parser` pass over all 24 locales: exact key parity (0 missing, 0 extra), every ICU argument set matching English, all messages parsing, zero unbalanced braces. ar/ur bidi isolates balanced (42/42, 47/47) with no legacy U+202A–U+202E controls. No cross-script contamination, no `HTML-PLACEHOLDER` leaks, no untranslated strings, no dangling code references from the 5 removed keys.
- **cs/pl/ru/uk correctly EXPANDED the ICU plural beyond what English required** — English ships `one`/`other` in `meta-description-fallback`; cs added `few`, and pl/ru/uk added `few`+`many`, i.e. full CLDR categories. Agents then verified each branch's wording AND case against the governing verb: uk's `one` branch is correctly ACCUSATIVE (`Підтримує 1 мережу`), the branch most commonly botched. **A plural-category count mismatch against English is expected and correct for Slavic locales — do not flag it** (same family as #52).
- **The headline finding was upstream, and the deterministic layer found it, not the agents** (#25 again). My sweep flagged lowercase `(l2)` in 16 locales; querying ETHGlossary showed the glossary itself ships it in 19 of 24 (#53). Three agents independently reached the same "glossary-legal, do not fix" conclusion from their own `/filter` responses. **1,609 + 4,665 occurrences were correctly left untouched.**
- **Three glossary coverage gaps surfaced in one 47-key cluster**: shield/unshield (#57, six-way split), rewards (#56, five locales to gift/prize), and no entry for `stablecoin` in tr (which is why the #18772/#19015 `sabit coin` regression keeps returning — nothing upstream pins it). Adding these three entries would have prevented 6 of this PR's 8 criticals.
- **`crops-*` was understood as a data-field prefix in all 24 locales** — no locale translated "crops" agriculturally. The `persona-legend` filter->browse change propagated correctly in 23 of 24 (ja used `探す`, "search for"), and in every case matched the verb that locale already used for the pre-existing "Browse all wallets".
- **zh vs zh-tw are genuinely regionally differentiated, not a character conversion** — ~30 lexical divergences in the 47 new keys (網路/网络, 取得/获取, 匯入/导入, 自訂/自定义, 金鑰/密钥, 方案/套餐, 浮動/可变, 封鎖你的存取/阻止你的访问), plus zh-tw restructuring 4 of 5 persona titles rather than translating word-for-word. Character-set sweep: 417/418 unique CJK chars, all divergences pure S↔T counterparts, zero leakage either way. zh-tw's recurring `智慧合約` regression (#18344, #18772) did NOT recur.
- **Review scale note:** 5 language-bloc agents (Latin-Romance/Germanic, Slavic+Turkic, Indic, East Asian, RTL+SEA/African) at ~5 locales each, not 3 role-agents per locale. For a single-file 47-key JSON payload this was the right calibration — 24x3 agents on ~9KB packets would have been waste. Deterministic sweeps (ICU parse, arg parity, isolate pairing, protected-token, numeral-system, identical-to-English) ran FIRST and were injected into every agent prompt as "already verified, do not re-report", which kept the reports free of placeholder noise.
- **One agent finding was downgraded on verification** (#55): ta shield/unshield, where the proposed transliteration fix would have contradicted 29 established occurrences in the ta tree. Worth restating as method — the agent's reasoning was sound and its conclusion still wrong, because it never checked the tree.

### 60. Positional anchor assignment desyncs when English gains an unanchored heading (CRITICAL — silent navigation break)

The pipeline asks the model to carry `{#anchor}` ids through translation (`prompt-builder.ts`: "Preserve heading anchor IDs exactly as in English"). Given a file where some headings have anchors and some do not, the model zips the *sequence* of anchors onto the *sequence* of headings and skips the gaps — so every anchor lands on the wrong heading and the tail loses its anchors entirely.

**Root cause is structural, not stochastic:** `extractSections()` in `incremental-translate.ts` indexes sections by `{#id}` and drops unanchored headings outright (`if (customId)`). Only h1–h4 require ids, so any `#####` heading is invisible to the section model.

**Signature:** heading count and level sequence match English exactly, but the anchor sequence is offset by *n*, where *n* is the number of unanchored headings before the first anchored one. Fires identically in all 24 locales, because it is a deterministic reasoning error on a fixed input shape — not per-locale noise.

**Why every existing sweep missed it:** the multiset of anchor values is unchanged, so href-parity passes; the anchors are non-empty, so the `{#}` check (pattern 23) passes; the file compiles, so MDX validation passes. Only heading↔anchor *correspondence* reveals it.

**Detect:** compare `(level, anchor)` pairs positionally against the English source. `verify-structure.ts` check `heading-anchor`.

**Fix:** reassign each translated heading the anchor of the English heading at the same index; strip anchors where English has none. Deterministic and language-independent — never ask a model to redo it.

**Observed:** PR #19115, all 24 locales × `developers/docs/nodes-and-clients/run-a-node/index.md`, 33 of 44 headings wrong per locale, breaking 4 in-page links and the sidebar TOC in every language. The redesign added exactly three unanchored `#####` headings, and the offset was exactly three.

### 61. Translatable JSX attributes revert to English when the surrounding block is retranslated (CRITICAL)

`<Card title="...">` came back in English in all 24 locales while the `description` on the same tag was translated correctly. `origin/dev` had the titles translated, so the retranslation *lost* shipped work.

**Signature:** within one JSX tag, one translatable attribute is translated and a sibling is not. A partially-translated `<Grid>` is the tell — in this case `Self-sovereignty` was translated in every locale while the two cards beside it were not, which proves the attribute is reachable and the miss is stochastic.

**Cause:** attributes are not extracted as discrete translation units. `prompt-builder.ts` tells the model "TRANSLATE the values of: title, description" and "Preserve all JSX/HTML components and their attributes exactly" in the same rule block, then nothing verifies coverage.

**Detect:** for each translatable attribute, compare the translated value against the English value positionally; flag matches. `verify-structure.ts` checks `attr-untranslated:*`. Note this check can legitimately fire (`Maintenance` is a French word), so it is warn-level, not error-level.

**Recovery without a new MT run:** if the English attribute value is unchanged from the previous release, `git show origin/dev:<path>` already holds the correct translation — restore it verbatim. In PR #19115 this recovered 120 of 192 strings; another 23 came from the same page's own translated `h2`. Always exhaust these before generating anything.

### 62. Whole heading-block translation miss (CRITICAL)

`ja/staking/pools` and `ja/staking/saas` shipped with **all 14 section headings** byte-identical to English while their body prose was fully translated. Locale-specific: the other 23 locales were clean at 0/14. `dev` had the saas headings in Japanese, so it was a regression; pools was already broken on `dev` and had never been caught.

**Detect:** count headings identical to English per file. A handful can be legitimate (`Hardware`); a majority means the block was never translated. `verify-structure.ts` check `headings-untranslated`.

### 63. Model wraps links and inline JSX in backticks (CRITICAL — kills every link on the page)

`hi/staking/saas/index.md` shipped 18 spans of the form `` `[text](/path)` `` and `` `<em style={{...}}>text</em>` ``. Inside a code span the markdown never becomes a link and the JSX renders as literal source, so every link on the page was dead. hi-only; the English control has zero backticked links.

**Detect:** grep translated markdown for `` `\[[^\]]*\]\([^)]*\)` `` and `` `<[a-zA-Z][^`]*>` ``, with the English source as control.

**Fix:** strip the wrapping backticks. Deterministic.

### 64. Bidi isolates wrapping pure-RTL text in frontmatter (HIGH — RTL rendering)

`ar` and `ur` `staking/dvt/index.md` wrapped whole Arabic/Urdu frontmatter values (`title`, `description`, all `summaryPoints`) in U+2066 LEFT-TO-RIGHT ISOLATE. The prompt correctly instructs the model to use U+2066/U+2069 for *Latin* fragments inside frontmatter (a `<span dir="ltr">` would break the YAML), and the model over-applied it to the entire value. An LRI forces LTR base direction over RTL text, so sentence-final punctuation renders on the wrong visual edge.

**Detect:** find U+2066…U+2069 pairs whose contents contain no Latin letters or digits.

**Fix:** strip the isolate pair, keep the text. Deterministic. Do **not** remove isolates that genuinely wrap Latin/numeric runs — those are correct.

### 65. Methodology: the pipeline validates translation quality but not structural fidelity

Patterns 60–64, plus 3 (duplicated wrapper closer), 22 (placeholder leak) and 23 (empty `{#}`), are all the same failure: **a mechanically-derivable invariant was delegated to the LLM and never checked afterward.** `output-validation.ts` checks refusals, truncation, frontmatter translation and code-fence placeholders — it does not check heading/anchor correspondence, JSX tag balance, component-name preservation, attribute coverage, internal-href parity, or whether the file compiles.

That is why "every run causes regressions no matter how small": each generation rolls the dice on hundreds of structural details per file, and a green run only means the dice landed well. Prompt tuning is whack-a-mole; the invariants have to be *asserted*.

`src/scripts/intl-pipeline/verify-structure.ts` is that assertion. Run against the pre-fix state of PR #19115 it reproduced every shipped defect class from the English source alone, in under a second, with no model involved. Two design rules keep it usable:

- **Split severity.** Structural invariants that can never legitimately differ (anchors, tag multisets, hrefs, code fences, placeholder residue, JSON key/ICU parity) are `error` and fail the gate. Coverage heuristics that *can* legitimately match English are `warn`. A gate that false-fails gets switched off — which is how a pipeline runs a year without one.
- **Run it before the commit step, not in review.** Everything it catches is cheaper to prevent than to triage across 24 locales.

### All 24 languages -- staking redesign (6 MD + 1 JSON each), Reviewed PR #19115 (intl/pending-staking-redesign)
- Feature-branch PR against `staking-redesign` (base PR #19030), 168 content files + 312 manifests. Fleet avg **7.8** -- the lowest recorded in this series, and the gap is almost entirely structural rather than linguistic.
- Scores: pl 8.8, tr 8.6, pt-br/ru 8.5, de/fr/vi 8.2, te 8.1, cs/uk/zh/zh-tw 8.0, ar 7.9, bn/id 7.8, ja 7.7, it/mr/ur 7.6, es 7.3, ko/ta 7.2, hi 7.0, **sw 5.6**.
- **The prose was good and the scaffolding failed.** Every locale had digit-exact numerals (32/2048/16 ETH, 115,200/day, 6.4-min epochs, the 400k-800k sweep table); slashing vs inactivity leak, custodial vs non-custodial, rebasing vs exchange-rate LSTs, and partial-withdrawal vs full-exit were kept distinct in all 24. What broke was patterns 60-64: 72 MDX build-breakers (pattern 3 recurrence), the fleet-wide anchor rotation, 192 reverted Card titles, 28 untranslated ja headings, 48 untranslated image alts, 18 backticked hi links, and ar/ur frontmatter isolates.
- **Image `alt` text is untranslated in all 24 locales** on both files that have one. The pipeline does not extract markdown image alt text at all -- this is a coverage gap, not a generation miss, and it is presumably tree-wide beyond this PR.
- **Recovery without new MT spend:** 143 of 192 Card titles came back from `origin/dev` (120) and from the same page's own translated `h2` (23); 6 ja headings from `dev`. Only 49 titles, 48 alts and 22 ja headings needed to be written. Establish this order -- prior release, then in-file equivalent, then glossary -- before spending on generation.
- **Genuine per-locale criticals worth remembering:** sw rendered software `client` as `mteja` (animate = customer) at ~85 sites while ETHGlossary itself mandates `mteja wa mwafaka` for *consensus client*, so 27 of the hits were correct and a blind sweep would have broken them. te propagated a `స్టాకింగ్` ("stacking") misspelling out of a faulty ETHGlossary compound row into a page title and nav label. ta collapsed "custodial"/"has custody of" into `பாதுகாப்பு` ("safekeeping"), turning the centralized-exchange **risk** column into a safety claim. zh-tw called Rocket Pool a `礦池` (mining pool) -- a PoW/PoS inversion. Four locales misparsed "majority client" as "many clients", inverting a client-diversity risk bullet.
- **JWT-token polysemy is a new glossary gap:** ta/zh/zh-tw all rendered the `jwtsecret` auth token with the crypto-`token` glossary entry (`வில்லை`/`代币`/`代幣`). ETHGlossary has no auth-token sense, so the correct forms (`டோக்கன்`/`令牌`/`權杖`) had to be supplied per locale. Same shape for `slot` in zh, which had no entry and got absorbed into `epoch` (`时段`).
- **Recurring glossary-side defects (fix upstream, not per-file):** lowercase Latin parentheticals `(dvt)`/`(geth)`/`(lst)`/`(l2)` in hi/id/bn/tr/ur/mr (pattern 53 again); capitalized common nouns leaking mid-sentence in id (`Likuiditas`, `Epok`), ru (`Адрес`) and vi (`Địa chỉ`, `Giao thức`); the te `స్టాకింగ్` typo; ur `لامركزی` carrying Arabic kaf U+0643 instead of keheh U+06A9. Missing entries that caused real errors: `cold storage` (it invented "celle frigorifere" = refrigerated rooms), `externally owned account (EOA)`, `delegated staking`, `auth token`, `slot` (zh).
- **Pre-existing defects surfaced but out of scope:** `mr/smart-contracts/index.md` carries 3 leaked `<HTML-PLACEHOLDER-COMPONENT-00000N />` tokens **on `dev`** -- reader-visible junk live on the site, and a new signature (sequential ids, not content hashes) versus pattern 22. `fr/developers/docs/accounts/index.md` has the same EOA custody inversion (`compte détenu par un tiers`) that this PR introduced in `withdrawals`.
- **Review scale:** 24 review agents (one per locale, 7 files each) then 24 fix agents. Deterministic sweeps ran first and were injected as "already verified, do not re-report" -- but note that the anchor rotation was found by the *agents*, not the sweeps, because no sweep existed for it. Every fleet-wide finding was then re-verified deterministically before being acted on; two agent claims (a stale MDX read, and "anchor stripping looks unintended") were false and would have wasted a fix cycle if taken at face value.

### 66. Unquoted YAML scalar containing ": " becomes a mapping (CRITICAL — build-breaker that compiles clean)

Recurrence of the YAML colon defect first logged in PR #18868, in a new field. English wrote `Delegation spans a spectrum, from services where...` with a comma; ru and uk both translated the comma as a colon:

```yaml
summaryPoints:
  - Делегування охоплює широкий спектр: від сервісів, де ви зберігаєте...
```

YAML reads `key: value` inside an unquoted scalar as a **mapping**, so `summaryPoints[2]` becomes an object instead of a string. Next.js then fails prerendering with `Objects are not valid as a React child (found: object with keys {Делегування охоплює широкий спектр})`.

**Why compiling is not enough.** The MDX parses fine and `@mdx-js/mdx` reports zero failures — the defect is in the frontmatter, and it only surfaces when React renders the value. Any check that stops at "does it compile" will pass this file. PR #19115's first fix round did exactly that and the Netlify build failed on `/uk/staking/saas` afterwards.

**Detect:** parse frontmatter with the same parser the site uses (`gray-matter`) and compare the *shape* of every field against English — string vs array vs object, and element-wise for arrays. `verify-structure.ts` check `frontmatter-shape`, error severity.

**Fix:** quote the scalar (`- "text: more text"`). Preserves the translator's punctuation; changing the colon to a comma also works but overrides a legitimate stylistic choice. Neither value here contained a `"`, so plain double-quoting was safe.

**Prompt-side prevention:** the format rules already warn against `<span dir="ltr">` inside frontmatter because the inner quote breaks YAML. The same rule should say that any frontmatter value containing `: ` must be quoted. Languages that punctuate with a colon where English uses a comma will keep hitting this otherwise.

### 67. Bracket fill-in blanks are user-facing prose, and 9 of 24 locales left them in English (HIGH -- coverage gap)

`page-open-source.json` has six `page-open-source-ai-prompt-*-text` keys: copy-paste prompt templates whose lead-in tells the reader to fill in the blanks. The blanks are written as `[app]`, `[my device]`, `[my system]`, `[this]`, `[this error]`, `[App]`.

Fully English: **bn cs hi ja mr sw ta te vi**. Localized: the other 15.

**Watch the false positive.** A first pass counted 11 locales by flagging any bracket token byte-identical to English. **de** `[App]` and **it** `[app]` are the correct native words in German and Italian, and both locales had localized every other blank. Byte-identity with English is not evidence of an untranslated string whenever the English word is also the target-language word -- check the locale's other blanks before counting it.

**Why nothing caught it.** These are not ICU placeholders. `verify-structure.ts`'s `json-placeholder` check tracks `{name}` and `<tag>`; `[...]` is free text, so both the pipeline and the gate treat it as translatable prose that happens not to have been translated. And because a `[...]` token *looks* like a placeholder, the model plausibly protected it on purpose.

**Detect:** compare the multiset of `\[[^\]]+\]` tokens in each locale value against English. Equality across a whole file is the signal -- a locale that translated the surrounding sentence but kept every bracket token verbatim did not make 6 independent decisions. Add as a `bracket-placeholder-parity` **warn** check (warn, not error: `[app]` is a legitimate rendering in some locales).

**Resolved in PR #19034.** All 9 locales were translated, taking each locale's own vocabulary from its tree rather than inventing it: the site's `Apps` nav word for `[app]`, and the "my device" form each locale had *already written* in its own `policy-text` string in the same file. Frequency counting alone would have picked the wrong word for "error" in 4 of 6 locales -- `ভুল`/`चूक`/`తప్పు`/`kosa` outrank the technical term in raw counts but mean "mistake", and substring matching inflates them; the computing sense (`ত্রুটি`/`त्रुटि`/`त्रुटी`/`hitilafu`/`பிழை`/`ఎర్రర్`) is the right pick. Two edits needed grammar beyond substitution: **hi** required the verb to change (`मिला` -> `मिली`, because `त्रुटि` is feminine), and **cs** required absorbing the noun that sat *outside* the bracket (`k aplikaci [app]` -> `k [aplikaci]`) so the case marking landed inside the slot.

**Prevention:** stop overloading square brackets. Either use real ICU placeholders so the invariant is machine-checkable, or write the blanks as underscored prose so nothing looks protected.

### 68. Character-level generation corruption reappears, and it is invisible to every structural check (CRITICAL)

Three locales shipped junk at the character level in the same PR:

| Locale | Key/line | Shipped | Effect |
|---|---|---|---|
| bn | `page-open-source-local-ai-description-2` | `কোথাও কিছু পাঠানো হয়বিধা নেই` | junk syllable `বিধা` destroys the negation of "Nothing sent anywhere" |
| ru | `page-open-source-movement-description` | `побеждами с ними` | non-word; visible gibberish |
| zh | `community/research/index.md` L54 | `这里的研分为两条主线` | `研` alone is not a word ("Research here divides...") |

All three parse, compile, keep every tag balanced, and pass all 20 `verify-structure` invariants. bn's is the third recurrence of that locale's junk-syllable family (see #19015).

**There is no cheap deterministic detector for this.** Attempts that do NOT work: intra-word script-mixing (fires on `<strong>` glued to text -- 100% false positives on this PR), and length-ratio-vs-English truncation (CJK is naturally ~40% of English character length, so every zh/zh-tw string looks truncated). Both were run on this PR and discarded. Per-language spell/dictionary checking is the only real answer; until then this class is found by reading, which is an argument for keeping a native-language agent per locale rather than trusting the gate.

### 69. Semantically translating an org's proper name deletes it (HIGH -- brand, fleet split)

`Robust Incentives Group` (an EF team with its own site, rig.ethereum.org) appears at 5 sites in `community/research/index.md`. The fleet split four ways:

- Kept English bare: **de it pl**
- Translated **with** an English gloss in parens: **cs fr id ko pt-br ru tr uk vi zh zh-tw** -- acceptable, the name stays searchable
- Transliterated: **bn ja mr te ur** -- policy-correct for non-Latin scripts (#1)
- **Semantically translated with no English retained: ar es hi sw ta** -- defect. `Grupo de incentivos robustos` / `मजबूत प्रोत्साहन समूह` / `Kikundi cha Motisha Imara` cannot be searched for, and a reader cannot connect the label to the org.

The rule that resolves all four: **an org's proper name must remain recoverable.** Keep it, transliterate it, or gloss it -- never replace it with a description of what the words mean. ur additionally shows the failure mode of transliterating badly (`روبسٹ انسیٹوز گروپ` drops the ن of *-cen-*), which is why a gloss is the safest default.

### 70. Check whether a wrong form is DOMINANT before fixing its PR-introduced instances (REVIEW HYGIENE -- the inverse of #55)

The ur agent correctly identified 7 PR-added instances of `لامركزی` carrying Arabic kaf U+0643 where Urdu orthography wants keheh U+06A9, and proposed fixing them, citing PR #18942's precedent.

Verified codepoint counts across the ur tree: **646 kaf vs 186 keheh.** The defective form is dominant 3.5:1 -- a long-standing systematic defect, not a convention. Patching 8 sites moves it to 638/194: it fixes nothing a reader experiences and it *increases* intra-tree inconsistency, which then makes the next reviewer's precedent check ambiguous.

**Rule.** #55 says check the tree before "fixing" a term. This is its inverse: when the tree says the wrong form is the majority, the fix is global or it is nothing. Normalize the upstream ETHGlossary entry, then run one tree-wide sweep, in its own commit. Do not spend a PR's fix budget moving a ratio by 1%.

### 71. ETHGlossary term data can be non-NFC, and one entry denormalizes every file that uses it (MEDIUM -- glossary data)

`ar/community/research/index.md` was NFC-normalized on `origin/dev` and is **not** after this PR. Length delta is 0, so nothing was added or lost -- it is a canonical-ordering change: `مُدَقِّق` ("validator") carries SHADDA U+0651 *before* KASRA U+0650, where canonical order (ccc 32 before 33) puts kasra first.

Source: ETHGlossary's own ar `validator` entry, 1 of 165 ar translations, and the only non-NFC one. It occurs 8x in this PR's ar file. It renders identically, so no reviewer sees it; it breaks byte-level search, diffing and dedup.

**Detect:** `text == unicodedata.normalize("NFC", text)` per file, plus the same assertion on glossary responses. A **warn**-level `nfc` check, with one caveat that stops it false-failing: bn legitimately uses precomposed U+09DF (BENGALI LETTER YYA), which is in the Unicode composition-exclusion table, so NFC *decomposes* it. bn files are therefore permanently "non-NFC" and that is correct. Compare against the pre-PR file, not against an absolute NFC ideal.

### 72. English-source defects that split the fleet on one page (ENGLISH SOURCE)

Fix these in `public/content/community/research/index.md` and `src/intl/en/page-open-source.json` rather than in 24 locales:

| English | Problem | Fleet damage |
|---|---|---|
| "designing **against** standards that already exist" (L269) | jargon for "designing *to*"; the bare preposition reads adversarially | hard inversion in **hi** and **te**, ambiguous in **ja**. Reword: "designing to standards that already exist" |
| "report progress **against** it" (L17) | same | inverted in hi and te |
| "**accounting** rigorously for the security of the proof systems" (L229) | reads as bookkeeping | wrong sense in **hi ar pt-br ja**. Reword: "rigorously assessing" |
| "witness gas **schedule**" (L94) | a gas *cost table*, not a timetable | timetable sense in **it ru es id** |
| "**soundness**" (L229/241/363) | no ETHGlossary entry | "reliability"/"validity" in **de id pl ta vi** |
| "test **harness**" (L349/L358) | no glossary entry; the physical sense dominates in most languages | **tr** hardware, **ta** saddle, **es**/**fr** horse-harness, **sw** apparatus |
| "Publishing code **is speech**" | terse US First-Amendment idiom | 14 locales rendered the *right* ("is freedom of speech") rather than the *act*. Majority behaviour -- reword the English, do not fix 14 locales |
| "have no **recourse**" | redress sense | "no way out" in **ru id pl uk** |
| "safeguard against **capture**" | corporate/regulatory capture | flattened to "monopoly" in **ko ja mr it** |
| "Four **families**" | taxonomic sense | household sense in **bn mr ur** |
| "The most polished first install of the three" | modifier stacking | word-order garble in **es pt-br tr** |

Glossary entries to file: `soundness`, `test harness`, `custodial`/`custody`, `recourse`, `capture` (the takeover sense), `locally`, `derivatives`.

### 73. Methodology -- central sweeps and per-locale agents catch disjoint defect sets

This review ran 24 locale agents (one each, 5-6 files) *after* a deterministic `verify-structure` pass that came back **0 errors / 6 warnings** on all 123 files. That result was injected into every agent prompt as "already verified, do not re-report", which moved the entire fleet's effort onto terminology and semantics. No agent wasted a cycle on MDX, anchors, hrefs, tags or key parity.

The 13 central sweeps run alongside the agents earned their keep in both directions:

- **Sweeps found what agents missed.** fr shipped `harnais de test` and its own agent did not flag it; a cross-locale sweep of one sentence surfaced it immediately. The bracket-blank gap (#67) and the org-name split (#69) are only visible as fleet counts.
- **Sweeps proved isolated criticals really were isolated.** The cs untranslated string, the ar compiler-scope error, the de finality regression and the sw won/lost inversion were each swept across all 24 locales and each was the only instance. That converts "one agent's claim" into a bounded, safely auto-fixable finding.
- **Sweeps overruled an agent.** #70 (ur kaf) -- the finding was right and the proposed fix was wrong.
- **Two sweeps were themselves invalid** and were discarded rather than reported: intra-word script mixing and length-ratio truncation (see #68). Design the sweep against a known-true instance first; if it does not fire cleanly on that, it is not ready to run on 24 locales.

Fleet avg **8.67**, median 8.80, range it 9.5 to ta 7.6. Zero criticals in **it fr ja mr uk zh-tw**. The prose quality was high across the board; nearly every critical was a single wrong word with a tree-backed correct form already available, which is why 47 of them were mechanically fixable in one verified pass.

### 74. `Devcon` is missing from ETHGlossary, and the tree's Latin-everywhere habit was the defect -- not the one locale that transliterated (HIGH -- glossary gap, resolved in PR #19142)

`Devcon` is not in ETHGlossary (532 ko terms scanned via `/filter`; only `claim` matched) and is not in `PROTECTED_BRAND_NAMES` in `intl-sanitizer.ts`. Term role is `brand-or-project`, whose policy default is `transliterate` per group rules -- it is not a developer tool, so the "Latin allowed for technical brands in UI tags" carve-out does not apply. On arrival the fleet split 12-1: twelve non-Latin locales kept Latin, ko alone shipped `데브콘`.

**The review error this pattern exists to prevent:** the reviewer flagged ko as the outlier and "fixed" it to Latin, reasoning from (a) `src/intl/*/common.json` carrying `"devcon": "Devcon"` in 24/24 locales and (b) the CJK-phonetic UI-tag rule. Both inputs were real; the conclusion was backwards. `common.json` unanimity is 24 copies of one untested habit, not authority. And an annual conference name is ordinary prose, not a dev tool. Reverted; ko became the reference and eight locales were brought in line with it.

**Resolved forms (PR #19142):**

| Locale | Form | Evidence class |
|---|---|---|
| hi, mr | `डेवकॉन` | devcon.org's own hi/mr sites -- independent of this pipeline |
| ko | `데브콘` | pre-existing tree precedent (`데브콘` x10 in ko content) |
| ja | Latin `Devcon` | independent JP crypto press (fisco, neweconomy, hedge.guide, pocketcampus, Yahoo) -- all Latin, zero katakana |
| ar | `ديفكون` | LOW confidence, tie unbroken -- see #76 |
| bn, ta, te, ur | `ডেভকন`, `டெவ்கான்`, `డెవ్కాన్`, `ڈیوکان` | derived (Gemini 3.1 Pro), no independent precedent found |
| ru, uk | Latin | 6.2 Cyrillic default; ru additionally blocked on case/apposition, uk has no candidate form |
| zh, zh-tw | Latin | 6.5 `keep_latin` default -- do NOT auto-generate phonetic Hanzi |
| `logo-alt` (all 24) | Latin | the formal title lockup and image alt text stay Latin in every locale, per devcon.org |

**Rules:**

1. A unanimous form in `src/intl/*/common.json` is evidence of consistency, not correctness. Never cite it to overrule the ETHGlossary fallback.
2. Reserve "Latin allowed in UI tags" for developer tooling. Event, org and program names are prose.
3. Separate the title lockup and asset `alt` text from running text. They take Latin even where the name transliterates.

### 75. ETHGlossary `claim` is scoped to on-chain claiming and reads bureaucratic in marketing copy (INFORMATIONAL -- glossary scope)

The `claim` entry defines itself as "the act of collecting tokens from an airdrop, reward, or vesting contract" and its per-language terms carry that legal-instrument weight: ru `востребование`, pl `roszczenie`, cs `nárok`, uk `затребування`, fr `réclamation`, ur `دعویٰ`, ja `請求`, ko `청구`. On "Claim your 10% discount" -- marketing, not a vesting contract -- 22 of 24 locales followed the glossary and 2 did not (ru `Получите`, pl `Odbierz`, both the more natural discount verb).

`claim` has `script_rule: null` / `term_role: null`, so per the severity matrix a deviation is **High, not critical, and not auto-fixable** -- "no, flag for review". Do not auto-fix these toward the glossary: `востребуйте скидку` and a `roszczenie`-based Polish imperative are worse copy than what shipped. The fix belongs upstream (a `contexts.ui`/marketing sense on the entry, or a separate `redeem` entry), not in the locale files.

**Reviewer rule:** when a glossary hit is a generic English verb rather than an Ethereum term, check the entry's own `definition` before calling a deviation. An out-of-domain glossary hit is a glossary-scope finding, not a locale defect.

### 76. `blog.ethereum.org` is not independent evidence -- it is this pipeline's own output (METHODOLOGY)

While resolving #74 the reviewer cited `blog.ethereum.org/{ar,ja,ko,hi,ru}` as authoritative for the `Devcon` transliteration. It is not. The EF blog is translated by **this same LLM pipeline against this same ETHGlossary**, so on any term the glossary is missing it inherits the identical gap. Citing it to settle a glossary gap is circular: it reports what the pipeline already guessed, in a more confident-looking venue.

This cost real accuracy. The `ar` choice between `ديفكون` (ف) and `ديڤكون` (ڤ) -- both legal under 6.3 -- was called for ف on the blog's usage, when in truth the tie was never broken. The `hi` case is the tell: the blog ships `देवकॉन` (dental द) while devcon.org ships `डेवकॉन` (retroflex ड). Two EF-adjacent sources, two different answers, because only one of them involved a human deciding.

**Evidence hierarchy for a term the glossary does not cover:**

1. **The brand owner's own localized site** (devcon.org/hi, devcon.org/mr) -- a human made that call.
2. **Independent target-language press and community usage** -- what the ja resolution actually rests on.
3. **Pre-existing tree precedent** in this repo, if a human wrote it.
4. **A fresh LLM-derived transliteration**, labeled as derived, pending native review.
5. **Never:** other output of this same pipeline (blog.ethereum.org, sibling locale files from the same run) dressed up as corroboration.

Also from the same episode: an LLM's "established form, confidence High" claim is checkable and is sometimes false. Gemini 3.1 Pro asserted that Japanese crypto press "consistently use デブコン, e.g. CoinPost"; every outlet found writes Latin 「Devcon」. Its supporting reasoning was internally broken too -- it cited デベロッパー as evidence for ブ, but that word uses ベ. **Verify "established" claims with one search before shipping the form.** Its bn "established" claim failed the same check; the form was kept on phonetic merit and relabeled derived.
