# Known Translation Patterns & Issues

> This is a living document. Updated after each language review.
> Last updated: 2026-07-29 (PR #18938 full pipeline, 24 langs: Indic loaded-polyseme bloc failure, sanitizer frontmatter-guard newline bug corrupting `uploadDate`, `/videos` frontmatter bypassing ETHGlossary, split-sentence `-strong` keys, partial-update manifest drift; fleet avg 8.9 -- lowest in months)
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

### 32. Loaded English polysemes resolve to the WRONG sense in Indic locales, as a bloc (CRITICAL)

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

### 32b. "actor" -> stage/film performer (CRITICAL — same family, wider blast radius)

English "actor" meaning *party/agent* becomes a theatrical performer in `mr` (`अभिनेते`), `ta` (`நடிகர்`), `te` (`నటులు`) and `ur` (`اداکار`). Reads as "bad film-actor", "state-employed actors", "malicious performers". The tell that it is real and not a variant: the same PR's `page-values.json` renders "bad actors" correctly with a non-theatrical word (`वाईट प्रवृत्तीचे लोक`, `చెడ్డ వ్యక్తులు`), so it is cross-file disagreement inside one import. Fix with the entity/party word (`घटक`, `தரப்புகள்`, `వ్యక్తులు/సంస్థలు`, `عناصر`).

### 33. Frontmatter guard requires a trailing newline -> sanitizer corrupts YAML in frontmatter-only files (CRITICAL — build/data)

`fixBareRtlDates`, `fixBareRtlMath` and `fixBareRtlValues` each split frontmatter off with `/^(---\n[\s\S]*?\n---\n)/`, which **requires a newline after the closing `---`**. `/videos/*` stubs are frontmatter-only and the pipeline emits them **without** a trailing newline, so the match returns null, `frontmatter` becomes `""`, the entire file is treated as body, and `RTL_SKIP_PATTERN` does not protect YAML. Result in PR #18938: `uploadDate: <span dir="ltr">2025-12-09</span>` in all 4 ar/ur video files.

Reader impact is silent, not a build break: `gray-matter` parses the value as a **string** rather than a Date, so `formatDate()` fails `isValidDate` and returns `""` — the video page renders a **blank** upload date — and `app/[locale]/videos/[slug]/page-jsonld.tsx` emits `<span dir="ltr">2024-11-14</span>T00:00:00+00:00` as the schema.org `VideoObject.uploadDate`, injecting raw HTML into structured data. `VideoGalleryFilter` also sorts on the string, and `<` (0x3C) sorts after digits.

Note `uploadDate` was **already** on the sanitizer's `syncProtectedFrontmatterFields` protected list and the LLM is explicitly forbidden from doing this (`prompt-builder.ts`) — the sanitizer did it to itself, *after* the correct value had been copied from English. Guards downstream of a protection step must be verified independently.

**Fixed in #18938:** all four guards now accept `\n---(?:\n|$)`, the pipeline emits a trailing newline, and `tests/unit/intl-pipeline/sanitizer/standalone-fixes.spec.ts` covers the frontmatter-only case for both `fixBareRtlDates` and `fixBareRtlValues` (both new tests fail without the patch). Patching the guard does **not** clean already-corrupted files — `RTL_SKIP_PATTERN` protects existing `<span dir="ltr">` for idempotency, so shipped corruption needs a separate unwrap.

### 34. `/videos/*` frontmatter is translated on a path that never consults ETHGlossary (HIGH — fleet-wide)

In PR #18938 the two new video stubs disagreed with their *own locale's* JSON on the PR's core terms, while the JSON files were glossary-clean — the signature of a separate, unbound translation path rather than per-language error. Six locales (`bn`, `hi`, `ru`, `te`, `uk`, `ur`) rendered `privacy` differently in the stub than in their `page-privacy-ethereum.json`; every non-Latin locale with a translated `Ethereum Foundation` entry used a phonetic transliteration instead (ar `إيثريوم فاونديشن` vs `مؤسسة إيثيريوم`, ko `이더리움 파운데이션` vs `이더리움 재단`, ru `Этериум Фаундейшн` vs `Фонд Ethereum`, ja `イーサリアム・ファウンデーション` vs `イーサリアム財団`); `ta`/`te` left `Ethereum` in Latin against a 163-occurrence mandate; `hi`/`mr`/`ta`/`te` transliterated `account abstraction` and `decentralized identity` instead of using the compound entries.

**Detection:** for each locale, diff the stub's rendering of a core term against the same locale's JSON for the same term. Cross-file disagreement inside one PR is the tell (same logic as #30). Latin-script locales keeping the `author` byline in Latin is the **established convention** and is not a defect.

### 35. Splitting one sentence across two intl keys forces English word order on every locale (HIGH — English-source defect)

A `<strong>{t("x-strong")}</strong>{" "}{t("x")}` render pattern makes the second key a grammatical **fragment** that only parses in English order, joined by a space hard-coded in the component. Translators cannot see or change the join, so locales whose syntax differs have no legal rendering. On `/values` in PR #18938: German requires a comma before the relative clause and could not add one; Turkish repeated the head noun to stay grammatical, shipping "**Güvenlik** güvenlik ..." (= "Security security you cannot inspect"). A continuation key that begins with punctuation (`". It's the result of ..."`) is worse — the sentence boundary lives in the wrong file.

Reviewers: treat any `-strong`/`-continued`/`-part2` key pair as a defect in the **English source**, not a translation error, and expect the same bullet to break in several unrelated locales at once. Fix = one key per sentence with inline tags rendered via `t.rich` + `Strong`/`Emphasis` from `@/components/IntlStringElements`. Rule recorded in the `design-system` skill (`references/i18n-rtl.md`).

### 36. Partial JSON updates ship translated content without refreshing `translation.json` (MEDIUM — manifest drift)

When a JSON namespace is updated **incrementally** (a subset of keys), the pipeline writes the new `source.json` rootHash but leaves `translation.json` untouched, so the manifest records the translation as behind English even though the content just shipped. Full-file updates refresh both.

PR #18938: `page-community.json` (28 of 55 keys) and `learn-quizzes.json` (49 of 744) shipped translated content with `translatedAt` still reading 2026-06-16 / 2026-05-07 and `englishManifestHash` pointing at the **old** rootHash, e.g. `de/page-community` `source.rootHash=f2518dbf3879` vs `trans.englishManifestHash=2ea5fe9c1b8f`. The two fully-new files (`page-values`, `page-privacy-ethereum`) matched correctly.

**Consequence is record-keeping only — do NOT over-escalate this.** Verified in the #18938 review: the incremental gate is `hasEnglishChanged(englishContent, source.json)` (`manifest-adapter.ts:141`), which reads **`source.json` alone**. `translation.json` is never read for any decision and `englishManifestHash` is **write-only** across the whole pipeline. So a stale `translation.json` does **not** trigger re-translation and does **not** put review fixes at risk. What it does break is observability: `translatedAt` and `englishManifestHash` misreport when a locale was last translated, so the manifests can't be trusted to answer "is this locale current?".

**`stamp_only` will not fix it.** That flag writes only the *source* manifest, and it sits behind the same `hasEnglishChanged` gate — for a file whose `source.json` is already current it is a complete no-op. Fixing this needs a pipeline change that writes `translation.json` on the incremental path, not a workflow run.

**Check with a hash comparison, not timestamps alone:** `source.json.rootHash == translation.json.englishManifestHash` per file per locale.

### All 24 languages -- /values + /privacy/ethereum + privacy quiz + community, Reviewed PR #18938 (intl/pending-dev)
- 24 langs x 8 files (es: 9) = 193 content files. Changed surface: `page-values.json` 39/39 (new page), `page-privacy-ethereum.json` 116/116 (new page), `page-community.json` 28/55, `learn-quizzes.json` 49/744 (new privacy quiz), plus 4 markdown (2 new frontmatter-only video stubs, `roadmap/security`, `nodes-as-a-service`). Fleet avg **8.9** — well below the 9.5-9.7 of recent runs.
- Scores: fr/pt-br 9.6, cs 9.5, zh 9.4, it 9.3, id/ja/pl/ru/zh-tw 9.2, ar/de/tr/vi 9.1, ko 8.8, es 8.7, sw/uk 8.6, bn/hi 8.4, mr 8.0, te/ur 7.9, ta 7.4. **The bottom six are five Indic locales plus `ur`** — see #32.
- **Deterministic layer clean**: MDX compile 97/97 (English controls clean, no build-breakers), full JSON key parity, rich-text tag + ICU sets byte-match, zero `HTML-PLACEHOLDER` leaks, hrefs byte-identical, zero ticker/domain typos, no `<span dir=` in JSON values.
- **`roadmap/security` was broken in all 24 locales** and repaired by a scoped `mode=full` re-run (not hand-edits): English had been rewritten to 8 sections, every locale still carried the superseded 5, and this PR patched only the "Current progress" block onto them — 23 locales also lost `{#current-progress}`, and `ur` received 19 lines of **verbatim untranslated English** while losing its translated section. The re-run also restored `summaryPoints` and replaced the invalid `variant="outline-color"` ButtonLinks. It additionally fixed the zh-tw negation-scope error and left ja `devnet` bare (hand-fixed to `デブネット`).
- **English-source defects, inherited by every locale:** `page-values` Open Source / Security card **descriptions swapped** (flagged independently by 14 agents; fixed by exchanging the values in all 25 files, which needs no re-translation since both strings already existed everywhere); the split-sentence `-strong` keys of #35; `Quicknode` -> `QuickNode` casing, which several locales had already corrected on their own.
- **METHODOLOGY — a sweep that silently matches nothing is worse than no sweep.** The first href/heading/ticker/domain pass in this review was a **no-op**: written in zsh, `for L in $LANGS` does not word-split, so every iteration skipped and all four checks reported clean. That masked a 23-locale anchor deletion until an agent contradicted the result. Always print a per-item count and assert a non-zero file count before trusting a sweep; and treat an agent that contradicts a deterministic "clean" as a signal to re-run the sweep, not as a false positive.
