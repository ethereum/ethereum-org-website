# Gemini Schema Negotiation - Final Consensus

## Issue 1: Morphological Forms
**Resolved**: POS-based structure instead of English-centric labels.

```json
"morphology": {
  "noun": { "singular": "walidator" },
  "verb": { "infinitive": "walidowac", "participle": "walidujacy" },
  "adjective": "walidatorski",
  "agent": "walidator",
  "negation": null,
  "compounds": { "validator-client": "klient walidatora" }
}
```

- Replaces the old `forms` object (base/verb/gerund/past/agent/plural/adjective/negation/compounds)
- `noun.singular` is the lemma/dictionary form
- Fields set to `null` when no logical equivalent exists (no forced neologisms)
- Plurals handled separately via CLDR object

## Issue 2: Slavic Plurals
**Resolved**: CLDR categories as top-level object. Gemini maps Slavic cases to CLDR:
- `one` = Nominative Singular (1)
- `few` = Nominative Plural (2-4)
- `many` = Genitive Plural (5+)
- `other` = fallback/partitive

No nested case x number matrix. CLDR categories work for both `next-intl` and Slavic accuracy.

## Issue 3: Context Forms
**Resolved**: Term form + optional example sentence, for all 5 contexts.

```json
"contexts": {
  "prose": { "term": "walidatora", "example": "Nagroda dla walidatora..." },
  "heading": { "term": "Walidator" },
  "tag": { "term": "Walidator" },
  "ui": { "term": "Walidator" },
  "code": { "term": "validator" }
}
```

- `prose`: inflected form + full sentence example
- `heading`: standalone, nominative, often capitalized
- `tag`: short identifier-style label (metadata)
- `ui`: action-oriented (buttons, menus)
- `code`: Latin/ASCII technical reference

Gemini confirmed it can reliably distinguish all 5 contexts.
