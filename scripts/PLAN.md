# Ethereum Translation Glossary -- Project Plan

## Goal

Build a comprehensive, multilingual translation glossary for Ethereum terminology that serves as:
1. Internal tool for LLM-assisted and human translation workflows
2. Public API for the ecosystem
3. Downloadable reference (JSON/CSV/TBX)
4. Foundation for a rebuilt ethglossary.xyz with SIWE auth and community feedback

---

## Phase 1: Term Extraction [DONE]

- [x] Crawl `public/content/**/*.md` for Ethereum-specific terms
- [x] Parse `src/intl/en/*.json` for terms in UI strings
- [x] Merge with existing 203 glossary.json terms
- [x] Deduplicate, categorize into 15 categories
- [x] Identify 22 morphological term families
- [x] Clean up noise (168 excluded, 83 merged)
- [x] **Result: 415 confirmed terms + 19 for manual review**

## Phase 2: Gemini Consultation [DONE]

- [x] Round 1: Identify 45 missing terms
- [x] Round 2: 30 context-dependent translation challenges
- [x] Round 3: Script decision rules (Latin vs transliterate vs translate)
- [x] Round 4: 20 morphological variant families with linguistic notes
- [x] Incorporate feedback into enhanced term list
- [x] **Result: 453 terms with enriched metadata**

## Phase 3: Schema Design [DONE]

- [x] Research TBX/CLDR standards via Gemini
- [x] Design JSON Schema v1 (concept-oriented, CLDR plurals, context forms)
- [x] Write 5 pilot examples (stake, gas, DeFi, rollup, validator) in 3 languages
- [x] Resolve open questions with Doc:
  - [x] Compounds: both top-level entry AND nested under root
  - [x] Definitions: reference /glossary page + English-only `translation_context`
  - [x] Lifecycle: simple `note` field, no formal status system
  - [x] Community: import ethglossary.xyz as seed, Gemini as primary, community as signal

## Phase 4: Schema Validation [IN PROGRESS]

- [x] Get Gemini review/critique of the schema
- [x] Apply Gemini feedback: per-language aliases, remove top-level term redundancy, deprecated boolean, date-time consistency
- [x] Tabled: Slavic case declensions (CLDR categories map to cases; one=nom.sg, few=nom.pl, many=gen.pl)
- [x] Pilot batch: 12 terms x 6 languages (ja, ar, fr, pl, cs, hi) -- 3 Gemini batches
- [x] Identified schema friction: morphology labels too English-centric, contexts inconsistent, Slavic plurals
- [x] Negotiated with Gemini: POS-based morphology, term+example contexts, CLDR plurals confirmed
- [x] Updated schema to match agreed structure
- [x] Final validation: 5 terms x 6 languages, 30/30 entries conform to schema
- [x] Schema confirmed locked -- ready for full translation generation
- [x] Full 24-language stress test: 10 terms x 24 langs = 240 entries, 100% conformance after normalization
- [x] Identified 2 auto-fixable Gemini drift patterns: code context as string, missing aliases
- [ ] Note for full run: enforce "onchain"/"offchain" (no hyphen) in prompts
- [ ] Note for full run: normalization script needed post-generation for the 2 known drift patterns

## Phase 5: Community Glossary Import

- [ ] Fetch existing ethglossary.xyz data (107 terms, ~4,800 translations, 56 languages)
- [ ] Map community terms to our schema IDs
- [ ] Import as `source: "community"` with vote counts informing confidence
- [ ] Flag conflicts between community and LLM translations for review

## Phase 6: Full Translation Generation

- [ ] Batch Gemini translations for all 453 terms x 24 languages
- [ ] Apply per-language rules (script decisions, morphological forms, context forms)
- [ ] Grammar metadata (gender, animacy, formality) for applicable languages
- [ ] CLDR plural forms for languages that need them (ar, pl, ru, cs, etc.)
- [ ] Cross-reference with community glossary where overlaps exist
- [ ] Quality review pass

## Phase 7: Integration & Delivery

- [ ] Store glossary data in repo (likely `src/data/glossary/` or `public/data/glossary/`)
- [ ] API endpoint: extend `app/api/glossary/` to serve translation glossary
  - Support queries: `?term=X&lang=Y&context=Z&form=W`
- [ ] Downloadable formats: JSON, CSV, TBX export generation
- [ ] Wire into internal translation pipeline (LLM translation scripts, review processes)
- [ ] Expand `/glossary` page with new terms from the 453 list
- [ ] Documentation for external consumers

## Phase 7.5: Proper Names & Publication Titles

- [ ] Grep repo for capitalized proper nouns appearing 3+ times
- [ ] Filter against existing term list and known-noise
- [ ] Categorize with Gemini: always Latin, transliterate, or translate
- [ ] Cover: protocol names, client implementations, L2/chain names, tools
- [ ] Add relevant names to glossary with correct script_rule and part_of_speech: proper_noun
- [ ] Document publication title rules (external titles stay English; free-text descriptions translate)
- [ ] Drop KEVM and SSTORE from glossary (too niche / pure opcode)

## Phase 8: Definition Glossary Expansion (Future)

- [ ] Audit current /glossary page (203 terms) against the 453-term translation list
- [ ] Identify terms that should be added to /glossary (prioritize by content occurrence)
- [ ] Redesign /glossary page: multi-definition support, better search/indexing
- [ ] Support correct alphabetical ordering in non-English languages
- [ ] Consider concept-oriented model for definitions (like translation glossary)
- [ ] Update components: GlossaryDefinition, GlossaryTooltip, JSON namespaces

## Phase 9: Community Platform (Future)

- [ ] Design rebuilt ethglossary.xyz
  - SIWE authentication (not Discord)
  - Display full glossary with all languages
  - Feedback actions: agree, disagree, suggest alternative
  - Context-specific feedback (different form for prose vs heading vs tag)
  - Sybil resistance considerations
- [ ] Feedback loop: community signals feed back into glossary review cycle
- [ ] Gemini re-evaluation based on accumulated community feedback

---

## Key Files

| File | Description |
|------|-------------|
| `scripts/extract-glossary-terms.py` | Initial term extraction script |
| `scripts/cleanup-glossary-terms.py` | Noise filtering and dedup |
| `scripts/incorporate-gemini-feedback.py` | Merges Gemini suggestions |
| `scripts/glossary-terms-cleaned.json` | 415 cleaned terms (pre-Gemini) |
| `scripts/glossary-terms-enhanced.json` | 453 terms with Gemini enrichment |
| `scripts/glossary-terms-cleaned.md` | Human-readable term list by category |
| `scripts/glossary-schema.json` | JSON Schema v1 |
| `scripts/glossary-schema-examples.json` | 5 pilot term examples |
| `scripts/glossary-schema-design.md` | Schema design rationale + resolved decisions |
| `scripts/gemini-feedback-round[1-4].md` | Raw Gemini consultation notes |

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-26 | Use concept-oriented schema (not string-as-key) | TBX standard; stable IDs prevent breakage |
| 2026-03-26 | Include both top-level and nested compounds | Maximum API flexibility |
| 2026-03-27 | Reference /glossary definitions, don't duplicate | Single source of truth; translation glossary adds `translation_context` only |
| 2026-03-27 | Simple `note` field for lifecycle, no formal status | "Mining" is still active in broader crypto; blanket "deprecated" too rigid |
| 2026-03-27 | Import community as seed, Gemini as primary | Community signal valuable but low-vote data not reliable enough to override |
| 2026-03-27 | English-only translator context | Translators already read English; localized definitions out of scope |
| 2026-03-27 | Per-language aliases in TranslationEntry | JP/CN may have multiple valid translations (katakana vs kanji, etc.) |
| 2026-03-27 | Remove top-level Entry.term, use en.term | Avoids desync; en.term is the source of truth |
| 2026-03-27 | Add deprecated boolean + note | Machine-filterable flag; note provides human context |
| 2026-03-27 | Slavic cases deferred to notes | Full case declension tables would explode data; handle via inflection notes |
| 2026-03-27 | Split per-language JSONs for delivery | Master file stays whole; build generates glossary-{lang}.json for API/frontend |
| 2026-03-27 | Definition/translation glossary overlap tabled | Doc notes both sides could benefit from the other's terms; discuss later |
| 2026-03-27 | POS-based morphology (not English-centric) | Gemini negotiation: noun.singular, verb.infinitive/participle, adjective, agent, negation, compounds |
| 2026-03-27 | Context forms = term + optional example | Gemini can reliably distinguish all 5 contexts (prose/heading/tag/ui/code) |
| 2026-03-27 | CLDR plurals map to Slavic cases | one=nom.sg, few=nom.pl, many=gen.pl, other=fallback; works for both next-intl and Slavic |
| 2026-03-27 | Pilot languages: ja, ar, fr, pl, cs, hi | Covers CJK, RTL, Romance, 2x Slavic, Indic script |
| 2026-03-28 | Proper names stay in glossary | Mark as proper_noun, use script_rule for DNT/transliterate/translate guidance |
| 2026-03-28 | City-named upgrades use localized city name | Shanghai -> localized in each language, with note it's the upgrade not the city |
| 2026-03-28 | Publication titles: keep English for external links | Only translate free-text descriptions; keep original title for English-language destinations |
| 2026-03-27 | Collapse definition/translation Venn | All 453 terms are candidates for both; glossary_ref=null means "not yet" not "never" |
| 2026-03-27 | Content occurrence threshold for priority | Terms with 5+ occurrences prioritized; low-occurrence terms (vesting, cliff) go to reference tier |
| 2026-03-27 | Multi-definition dictionary design | Future task: redesign /glossary page to support multiple definitions per term (like standard dictionaries) |
| 2026-03-27 | onchain/offchain no-hyphen rule | Firm for English; other languages get a note "analogous to online/offline"; aliases include hyphenated forms |
