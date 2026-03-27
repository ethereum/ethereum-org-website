# Ethereum Translation Glossary -- Schema Design

## Overview

This schema defines a **concept-oriented, multilingual terminology database** for Ethereum ecosystem translations. It draws from industry standards (TBX/ISO 30042, Unicode CLDR) while being optimized for modern JSON-based workflows.

## Design Principles

### 1. Concept-Oriented (not String-Oriented)
Each entry represents a **concept** (e.g., "the act and state of staking"), not a word string. All language translations, morphological forms, and aliases live under one stable ID. This follows the TBX model and avoids the "string-as-key" trap.

### 2. Stable IDs
Entry IDs are kebab-case slugs (`stake`, `proof-of-stake`, `gas-fee`) that are **immutable once assigned**. Even if the canonical English term changes, the ID remains stable. This prevents broken references in translation pipelines.

### 3. Explicit Script Strategy
Every term has a `script_rule` indicating how non-Latin-script languages should handle it:
- `keep_latin` -- Always use Latin script (ETH, ERC-20, Solidity)
- `translate` -- Fully translate to native language/script (blockchain, wallet)
- `transliterate` -- Phonetic rendering in native script (gas -> gasu)
- `hybrid` -- Latin acronym + native expanded form (EVM / Ethereum Virtual Machine)
- `context_dependent` -- Varies by display context (DeFi: Latin in tags, native in prose)

Individual languages can override with `script_override`.

### 4. Morphological Families
Terms with shared roots are linked via `term_family`. This ensures that when a translator chooses a root translation for "stake", all derived forms (staking, staker, staked, unstaking) use consistent derivation from that root.

### 5. Context-Aware Display Forms
The `contexts` object captures how a term should appear in five display contexts:
- **prose** -- Inline in flowing text. May be fully localized.
- **heading** -- Standalone title/header. May use hybrid form.
- **tag** -- Metadata label/filter chip. Often kept short, may use Latin.
- **ui** -- Buttons, menus, tooltips. Space-constrained.
- **code** -- Technical/code references. Usually Latin/ASCII.

This follows the CLDR "stand-alone vs format" pattern.

### 6. CLDR-Compatible Plurals
Plural forms use Unicode CLDR categories (`zero`, `one`, `two`, `few`, `many`, `other`) instead of simple singular/plural. This is essential for:
- Arabic (has dual form)
- Slavic languages (complex plural rules with "few" and "many")
- Languages where zero takes a special form

### 7. Grammatical Metadata
The `grammar` object captures properties that affect sentence integration:
- **gender** -- For Romance/Slavic agreement (French: "la DeFi" because "finance" is feminine)
- **animacy** -- For Polish/Russian (validator is "animate" even as software)
- **formality** -- For Japanese keigo / Korean honorifics
- **part_of_speech** -- Determines what morphological forms are relevant

### 8. Provenance Tracking
Every translation records:
- **source** -- How it was produced (community vote, LLM generation, expert review, imported from existing glossary)
- **confidence** -- Quality assessment (high/medium/low)
- **reviewed_by** -- Who validated it
- **updated** -- When it was last touched

This lets consumers decide how much to trust a translation and prioritize review efforts.

## Schema Structure

```
glossary.json
  +-- version, generated, languages (metadata)
  +-- entries (keyed by stable slug ID)
       +-- Entry
            +-- id, term, category, tier, note
            +-- aliases, related, term_family
            +-- script_rule
            +-- en (English source)
            |    +-- term, glossary_ref, translation_context
            |    +-- forms (morphological)
            |    +-- usage_note
            +-- translations (keyed by BCP-47 code)
                 +-- TranslationEntry
                      +-- term, transliteration
                      +-- script_override
                      +-- forms (translated morphological forms)
                      +-- contexts (prose/heading/tag/ui/code)
                      +-- grammar (gender/number/pos/formality)
                      +-- plurals (CLDR categories)
                      +-- source, confidence, reviewed_by, notes, updated
```

## What This Enables

### Internal Use (Translation Pipeline)
- LLM translation prompts can include the full context: "Translate 'staking' for inline prose in Arabic, using the same root as 'stake' which is 'rahn', feminine gender..."
- Automated review scripts can validate consistency within term families
- The glossary tooltip system can pull context-appropriate forms

### External API
- `GET /api/glossary?term=stake&lang=ar` returns the full Arabic entry
- `GET /api/glossary?term=stake&lang=ar&context=tag` returns just "Stake" (Latin)
- `GET /api/glossary?term=stake&lang=ar&form=plural` returns the plural form
- `GET /api/glossary?category=consensus&lang=ja` returns all consensus terms in Japanese

### Downloadable Formats
- **JSON** -- Direct serialization of this schema
- **CSV** -- Flattened: one row per term-language pair, columns for each form/context
- **TBX** -- Industry standard XML; maps cleanly from this structure

## Language Coverage

Target: 24 languages from ethereum.org's i18n config:

| Group | Languages | Key Challenges |
|-------|-----------|----------------|
| Latin-script European | fr, de, es, it, pl, cs, tr | Gender, cases (Slavic), formal/informal |
| Cyrillic | ru, uk | Gender, animacy, complex plurals |
| CJK | ja, ko, zh, zh-tw | Transliteration vs translation, no plurals (zh), honorifics (ja/ko) |
| Indic | hi, bn, mr, ta, te | Script transliteration, postpositions, compound words |
| RTL | ar, ur | Full RTL, Arabic broken plurals, Urdu native numerals in prose |
| Southeast Asian | vi, id | Classifier systems (vi), Latin-script (id) |
| African | sw | Latin-script, Bantu noun classes |

## Resolved Design Decisions

1. **Granularity of compounds**: Both. "Proof of stake" gets its own top-level entry AND is listed as a compound under "stake". Linked via `related`. Maximum flexibility for API consumers.

2. **Definitions**: Reference + context model. The translation glossary does NOT carry full definitions. Instead:
   - `glossary_ref` links to the /glossary page entry (in `src/intl/en/glossary.json`) where a user-facing definition exists
   - `translation_context` provides English-only disambiguation for translators (e.g., "financial deposit, not wooden stake")
   - Translators are assumed to read English since all source terms originate in English
   - The /glossary page remains the single source of truth for definitions; it can grow by pulling from this term list

3. **Term lifecycle**: Simple `note` field, no formal status system. Legacy terms get a human-readable note like "Legacy Ethereum term. Preferred: consensus layer." Terms like "mining" that are still active in broader crypto but not current Ethereum get notes like "Applies to proof-of-work systems; do not confuse with validator in PoS context."

4. **Community contributions**: Import existing ethglossary.xyz translations as `source: "community"` seed data. Gemini serves as primary translator with full context. Community feedback (via a rebuilt ethglossary.xyz with SIWE auth) enters as signal -- agreement, disagreement, alternative suggestions -- but no single community member can override. Feedback accumulates and feeds back into the translation review cycle.
