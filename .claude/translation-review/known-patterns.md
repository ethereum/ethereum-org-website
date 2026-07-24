# Known Translation Patterns & Issues

> This is a living document. Updated after each language review.
> Last updated: 2026-07-22 (PR #18868 full pipeline, 22 langs: YAML colon-in-description build-breaker, raw-`<`-in-prose MDX break, and the `ExpandableCard title= "` attribute-extraction gap; fleet avg 9.7)
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
