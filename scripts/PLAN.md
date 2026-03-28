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

- [x] 4 rounds of Gemini feedback (missing terms, context challenges, script rules, morphological variants)
- [x] **Result: 455 terms with enriched metadata**

## Phase 3: Schema Design [DONE]

- [x] JSON Schema v1 designed (concept-oriented, CLDR plurals, POS-based morphology, 5 context forms)
- [x] Resolved open questions: compounds (both), definitions (reference + context), lifecycle (note field), community (import as seed)
- [x] Preferred alias status added (preferred/accepted/deprecated for English style guide use)

## Phase 4: Schema Validation [DONE]

- [x] Gemini review + negotiation on morphology, contexts, plurals
- [x] Pilot: 12 terms x 6 languages, then 10 terms x 24 languages = 240 entries, 100% conformance
- [x] 2 auto-fixable Gemini drift patterns identified (code context as string, missing aliases)

## Phase 5: Community Glossary Import [DEFERRED]

- [ ] Fetch ethglossary.xyz data (107 terms, ~4,800 translations)
- [ ] Import as `source: "community"` -- deferred until quality sweep prep
- Not blocking; Gemini output is primary, community data is validation layer

## Phase 6: Translation Generation [IN PROGRESS]

- [x] Tier 1: 93 terms x 24 languages = 2,232 entries -- DONE
- [x] Tier 1 quality review: 0 critical, 3 moderate (Arabic fixes applied)
- [ ] Tier 2/3 + Phase 7.5 terms: 426 remaining terms x 24 languages -- IN PROGRESS (paused at ~21/1032 for rate limits)

## Phase 7: Integration & Delivery

- [x] TypeScript lookup module (`glossary-lookup.ts`) -- filters glossary to source file terms
- [x] Lean prompt format agreed with Relay: english + translation + note + example (when 2+ occurrences)
- [x] JSON file support in lookup (extracts string values, skips keys)
- [ ] Wire into Relay's pipeline (Relay ports to `lib/ai/` when ready)
- [ ] Store final glossary in repo (`src/data/glossary/` or `public/data/glossary/`)
- [ ] API endpoint: extend `app/api/glossary/`
- [ ] Downloadable formats: JSON, CSV, TBX
- [ ] Documentation for external consumers

## Phase 7.5: Proper Names & Publication Titles [DONE]

- [x] 75 missing terms identified from content page scan
- [x] 64 new terms added with correct script_rule (keep_latin/transliterate/translate)
- [x] All execution + consensus clients covered
- [x] Translation rules document created and reconciled with pipeline prompt
- [x] **Total terms: 519**
- [ ] Drop KEVM and SSTORE (too niche / pure opcode)
- [ ] Polish "stawka"/"mostek" flags -- deferred to community review

## Phase 8: Definition Glossary Expansion (Future)

- [ ] Audit /glossary page (203 terms) against 519-term translation list
- [ ] Identify terms to add to /glossary (prioritize by content occurrence)
- [ ] Redesign /glossary page: multi-definition support, better search/indexing, correct non-English ordering
- [ ] Update components: GlossaryDefinition, GlossaryTooltip, JSON namespaces

## Phase 9: Community Platform (Future)

- [ ] Design rebuilt ethglossary.xyz with SIWE auth
- [ ] Feedback actions: agree, disagree, suggest alternative
- [ ] Sybil resistance considerations
- [ ] Community signals feed back into glossary review cycle

---

## Key Files

| File | Description |
|------|-------------|
| `scripts/glossary-terms-enhanced.json` | 519 terms with metadata (canonical source) |
| `scripts/glossary-schema.json` | JSON Schema v1 |
| `scripts/glossary-schema-design.md` | Schema rationale + resolved decisions |
| `scripts/glossary-lookup.ts` | TypeScript lookup module for pipeline integration |
| `scripts/glossary-lookup.py` | Python prototype (validation/testing) |
| `scripts/generate-translations.py` | Batch translation generation via Gemini CLI |
| `scripts/translations/glossary-{lang}.json` | Per-language translation files (24 languages) |
| `scripts/translation-rules.md` | Never-translate rules + conditional guidance |
| `scripts/proper-names-categorized.md` | ~60 proper names with A/B/C categories |
| `scripts/missing-terms-from-titles.md` | 75 missing terms from content scan |
| `scripts/tier1-quality-review.md` | Tier 1 quality review report |
| `scripts/PLAN.md` | This file |
| `docs/selective-glossary-injection.md` | Spec for filtered glossary in translation prompts |
| `docs/translation-rules-reconciliation.md` | Our rules vs pipeline prompt comparison |
| `docs/agent-crosswalk.md` | Inter-agent communication log (NOT committed) |

## Active Agents

| Name | Worktree | Focus |
|------|----------|-------|
| Atlas | `.worktrees/glossary-extraction` | Glossary terms, schema, translations, lookup module |
| Relay | `.worktrees/gemini-v3` | Translation pipeline, prompt builder, automation |
| Sentinel | (as needed) | Translation review, PR quality checks |

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 03-26 | Concept-oriented schema (not string-as-key) | TBX standard; stable IDs prevent breakage |
| 03-26 | Both top-level and nested compounds | Maximum API flexibility |
| 03-27 | Reference /glossary definitions, don't duplicate | Single source of truth for definitions |
| 03-27 | Simple `note` field, no formal status | "Mining" still active in broader crypto |
| 03-27 | Import community as seed, Gemini as primary | Low-vote community data not reliable enough to override |
| 03-27 | English-only translator context | Translators already read English |
| 03-27 | POS-based morphology | Universal labels vs English-centric (gerund/past) |
| 03-27 | CLDR plurals map to Slavic cases | Works for both next-intl and Slavic accuracy |
| 03-28 | Proper names stay in glossary with script_rule | DNT/transliterate/translate per term |
| 03-28 | City-named upgrades use localized city name | Shanghai -> localized, with note it's the upgrade |
| 03-28 | Preferred alias status on English entries | Useful for content generation + translation |
| 03-28 | Selective glossary injection | Full dump decreases quality; filter to source file terms |
| 03-28 | Lean prompt format (english + translation + note + example) | Aliases/morphology serve matching step, not translation |
| 03-28 | Collapse definition/translation Venn | All 519 terms candidates for both; glossary_ref=null means "not yet" |
| 03-28 | Names policy: internal only | Agent names never appear in public GitHub comments |
