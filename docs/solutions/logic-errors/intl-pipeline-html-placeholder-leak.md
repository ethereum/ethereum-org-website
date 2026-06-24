---
title: "Intl-Pipeline: HTML Placeholder Leak in Restored JSON (PR #18418)"
date: 2026-06-16
category: logic-errors
tags:
  - intl-pipeline
  - translations
  - i18n
  - json-batcher
  - gemini
  - placeholder
  - html-restore
severity: high
component: intl-pipeline
problem_type: silent-data-corruption
---

## Symptom

Seven locales (`ar`, `cs`, `ja`, `ko`, `pl`, `uk`, `zh`) shipped a raw pipeline placeholder token into `src/intl/{locale}/glossary-tooltip.json`, visible to readers as literal junk:

```
…это была сеть <HTML-PLACEHOLDER-HTMLTAG-7ff424>доказу виконання роботи</HTML-PLACEHOLDER-HTMLTAG-7ff424>.
```

Six were in `ommer-definition` (the `<a href="/glossary/#pow">` link, hash `7ff424`); `ar` was in `wei-definition` (the `<a href="/glossary/#wei">` link, hash `063f8a`). The English source was clean — the leak is translation-side. The same hash appearing across unrelated languages is the tell: the hash is content-addressed from the **English tag**, so an identical tag yields an identical placeholder in every locale.

## How the pipeline uses placeholders

`src/scripts/intl-pipeline/lib/llm/json-batcher.ts` extracts attributed HTML tags (e.g. `<a href="…">text</a>`) out of JSON string values before translation, replacing each with a content-addressed wrapper:

```
<HTML-PLACEHOLDER-HTMLTAG-{hash}>text</HTML-PLACEHOLDER-HTMLTAG-{hash}>
```

Gemini translates only the inner text and is explicitly told it **may reorder wrapper pairs** to match target word order. After translation, `restoreHtmlInString` rebuilds the original tag around the translated text.

## Root cause

A **count mismatch** between the English source and the translated output, combined with a per-occurrence restore:

1. The English `ommer-definition` value contains the `/glossary/#pow` tag **once**, so extraction recorded **one** entry for hash `7ff424`.
2. The translated value (via translation-memory / Gemini) contained the `7ff424` placeholder **twice** — the linked phrase "proof-of-work" was reused a second time in the target prose. (Confirmed: the shipped zh value had `/glossary/#pow` restored correctly at the start *and* a leaked placeholder later.)
3. The old `restoreHtmlInString` looped **once per source entry** and rebuilt only the **first** match via `indexOf`/`slice`. The surplus occurrence was never touched.
4. Because that single entry *did* restore successfully, **no failure was recorded** — so the surviving placeholder sailed past the `console.warn` gate in `gemini.ts` and was committed.

Two design flaws made it silent:

- `restoreHtmlInString` early-returned `if (!entries) return text` and otherwise restored exactly `entries.length` occurrences — surplus or unknown-hash placeholders leaked with no signal.
- The call site in `gemini.ts` only `console.warn`ed on `failures`; it shipped the content regardless.

## Fix

`src/scripts/intl-pipeline/lib/llm/json-batcher.ts` — restore by **global token replacement** instead of per-occurrence slicing. A given hash always maps to one original tag, so replacing *all* occurrences of `<HTML-PLACEHOLDER-HTMLTAG-{hash}>` / `</…>` with the real open/close tag is order-, count-, and duplicate-safe. After known replacements, a residual scan strips any survivor (keeping inner text) and records a `failures` entry so it can never silently ship.

`src/scripts/intl-pipeline/lib/llm/gemini.ts` — after `mergeJsonBatches`, a hard guard throws if any `HTML-PLACEHOLDER` token remains in the merged output. The per-value strip already prevents this, so the throw is a belt-and-suspenders backstop that converts any future regression into a loud, file-level failure (recorded by the caller, not committed).

## Tests

`tests/unit/intl-pipeline/json-batcher-html-restore.spec.ts`:

- duplicated wrapper (1 source entry → 2 output occurrences) → both restored, zero residual;
- single wrapper round-trip (control);
- unknown-hash orphan placeholder → stripped **and** reported as a failure.

The first and third reproduce the bug (red on the old code) and pass on the fix.

## Lessons

- Content-addressed placeholders must be restored by **value, globally**, not by **occurrence count**, because LLM output is not guaranteed to preserve the source's tag multiplicity or order.
- A restore step that can leave artifacts must **fail loudly**: silent `console.warn` + ship is how a reader-visible token reached production. Prefer "strip + report" at the unit and "throw on residual" at the boundary.
- The manual hand-fix for the already-imported files is safe (the English side did not move, so the manifest mapping stays valid) — see the `intl-pipeline` skill's "don't hand-propagate" rule for when hand-fixing is and isn't appropriate.
