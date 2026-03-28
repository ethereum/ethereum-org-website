# Selective Glossary Injection for Translation Prompts

Status: Design spec (for glossary-extraction workstream)
Created: 2026-03-28

---

## Problem

Dumping the entire translation glossary into every Gemini translation prompt
is counterproductive. Research from Smartling, Intento, Alpha CRC, and WMT
2024 all converge: full glossary injection distracts the LLM, increases token
costs, and actually decreases translation quality.

## Goal

Build a helper that takes a source file and the full glossary, then outputs
only the glossary terms that appear in that specific file. This filtered set
is what gets injected into the Gemini translation prompt.

## Proposed interface

```typescript
/**
 * Given source content and a full glossary, return only the terms
 * that appear in the source text.
 *
 * @param sourceContent - The English source file content (string)
 * @param glossary - Full glossary Map<englishTerm, translatedTerm>
 * @returns Filtered glossary containing only terms found in sourceContent
 */
function filterGlossaryForSource(
  sourceContent: string,
  glossary: Map<string, string>
): Map<string, string>
```

## Matching considerations

- **Case-insensitive matching** -- "Smart Contract" should match "smart contract"
  in the source
- **Word boundary awareness** -- "gas" should match the word "gas" but not
  "gasoline" or "Madagascar" (use word boundary regex: `\bterm\b`)
- **Multi-word terms** -- "execution layer", "beacon chain" need phrase matching,
  not individual word matching
- **Morphological variants** -- "validator" should match "validators", "validating"
  etc. This is harder; consider stemming or just matching the base form and
  accepting some false negatives
- **Compound terms** -- "proof-of-stake" should match "proof of stake" and
  "proof-of-stake" (normalize hyphens)

## Architecture recommendations (from research)

### Layered approach (industry consensus)

| Layer | What goes here | Mechanism |
|-------|---------------|-----------|
| **Prompt rules** | Behavioral: "never translate tickers, opcodes, network names" | In prompt-builder.ts (already exists) |
| **Glossary (selective)** | Term pairs relevant to the specific file | This helper, injected into prompt |
| **Post-processing** | Terminology compliance check | Sanitizer (already exists) |

### Anti-patterns to avoid

- **Full glossary dump** -- Proven to decrease quality (Intento, Alpha CRC)
- **No glossary at all** -- Misses community-voted standard translations
- **Glossary without examples** -- Term pairs with short example sentences
  showing usage in context are significantly more effective than bare term pairs

### Enhancement: example sentences

If feasible, include a short example sentence for high-priority terms:

```
- "smart contract" -> "contrato inteligente"
  Example: "Deploy a smart contract" -> "Implementar un contrato inteligente"
```

This helps the LLM understand context and apply the term correctly, especially
for terms with multiple valid translations.

## Integration point

The filtered glossary feeds into `prompt-builder.ts` in the gemini-v3 branch:

```typescript
// Current: formatGlossary(glossaryTerms) -- takes full Map
// Future: formatGlossary(filterGlossaryForSource(sourceContent, glossaryTerms))
```

The `buildTranslationPrompt()` function already accepts `glossaryTerms: Map<string, string>`.
The filtering should happen before this function is called, in `gemini-translate.ts`.

## Current state

The prompt builder (`prompt-builder.ts`) already formats glossary terms and
injects them into the prompt. What is missing is the filtering step -- currently
the full glossary for the language is sent with every file.

The glossary is loaded from Supabase during initialization (`gemini-initialize.ts`)
as a `Map<string, string>` per language.

## References

- Smartling: RAG-based glossary injection for LLM translations
- Intento: "Providing the full glossary with every request is expensive and
  DECREASES quality"
- WMT 2024: Trie Tree algorithm for efficient term extraction from glossary
- Alpha CRC: Tiered terminology lists (high-priority always, secondary when relevant)
