# Pipeline Gotchas (Long Tail)

Patterns that aren't in the SKILL.md's inline gotchas section but come up when you dig in. Load this when something feels off and the obvious places didn't surface the answer.

## Output token budget

Gemini's output token limit is ~65K. Per-section calls keep this manageable. Bulk calls (rare in current pipeline; JSON batching exists) can hit it.

- Markdown is translated section-by-section in Phase 4 — output budget is per-section, not per-file
- JSON files use chunked translation via `src/scripts/intl-pipeline/lib/llm/json-batcher.ts` — chunks are size-limited (64KB by default), preferring more smaller calls over fewer larger ones
- If a section's output is truncated, the manifest does NOT stamp (Phase 6 only stamps on success). Next run retries.

## `intl-content-tree` is a separate npm package

Change detection, diffing, and tree parsing live in the `intl-content-tree` npm package (MPL-2.0). It's an independent artifact, with its own test suite (~182 tests). The pipeline consumes its API.

If a `ChangeSet` or `DiffResult` looks wrong, the bug may be in the package, not the pipeline. Check:

- The mutation appears in the package's own test fixtures
- The output of `parseMarkdown`/`parseJson` on the affected content
- Whether your change is a known limitation (e.g., image alt text is currently NOT classified as translatable — known gap)

## HTML entity handling in JSX attribute pass

JSX attribute values with embedded characters that need escaping (`&` → `&amp;`, `<` inside quoted strings) require care. The Phase 4b prompt explicitly tells the model to escape; the regex-based replacement in `pipeline.ts` does NOT entity-escape (it preserves what the LLM returned).

Known past failures: Gemini leaving raw `"` inside `title="..."` attributes, breaking MDX. The sanitizer covers this (`fixInnerQuotesInJsxAttributes`, `fixEscapedQuotesInJsxAttributes`). When adding new attribute patterns, write a test that includes embedded special characters first.

## Locale file naming mirrors English

- `public/content/translations/{lang}/path/to/file.md` mirrors `public/content/path/to/file.md`
- `src/intl/{lang}/page-foo.json` mirrors `src/intl/en/page-foo.json`

Don't deviate. Renaming a content file means renaming six files per locale (file + 2 manifests, times English source). The pipeline doesn't track renames cleanly across languages; if you need to rename, consider running `stamp_only` after.

## 24 vs 25 language confusion

`i18n.config.json` has **25 entries** (en + 24 translations). When iterating "all locales" the pipeline iterates the **24 non-en** entries. Source code that says `LANGUAGES.length` may mean 24 or 25 depending on context — check the array contents.

## Custom heading IDs (`{#id}`)

Markdown headings h1-h4 use custom IDs in `{#lower-kebab-case}` syntax, enforced by markdownlint via pre-commit hook. The pipeline preserves these across translation:

- Inert: heading IDs never translate
- Rename detection: if an English heading ID changes, the pipeline detects via DiffResult `renamed`, applies via Phase 3 (`find {#old-id}` → `replace with {#new-id}`)

If a translation has a translated ID (e.g., `{#网络影响}`), that's a Crowdin-era artifact or sanitizer false-positive. Flag as critical.

## Concurrency env var

`GEMINI_CONCURRENCY` defaults to 16, configurable per workflow run via the `concurrency` input. Higher values are faster but risk rate limits; lower values are slower but reliable.

## Manifest version field

Each manifest has a `version` field. As of v1, version is `"1"`. Schema migrations would bump this and need a parallel pipeline migration path. If you change manifest shape, bump the version AND handle older manifests gracefully (or do a clean re-stamp).

## Whitespace after structural removals

Phase 3's component removal normalizes surrounding whitespace (avoid double blank lines). If a translation has unexpected blank-line patterns, it may be:

- Removal logic missing a normalization case
- Hand-edited content with literal blank lines preserved
- A specific edge case in the markdown parser around blank-line handling

## Frontmatter scope vs body scope

Frontmatter is a distinct YAML scope. Inert frontmatter fields (`image`, `lang`, `template`, `published`) update with key-preserving find/replace. Translatable frontmatter (`description`, `title`, `alt`, `summaryPoints`, `tags`) go through Phase 4. The body of the file is a separate scope; the pipeline doesn't accidentally cross-pollinate.

`tags` arrays have a mixed policy (brand tags English, concept tags translated) — see `intl-review/SKILL.md` for the rule. For tag-related sanitizer bugs, the fix is in the sanitizer; the pipeline itself just runs the section through Phase 4.

## Sanitizer scoping: TARGET_LANGUAGES env var or programmatic file list

There is no `TARGET_FILES` env var — the sanitizer only reads `TARGET_LANGUAGES` (comma-separated language codes, e.g. `TARGET_LANGUAGES=ja`) from the environment. Per-file scoping exists only programmatically: call the exported `runSanitizer(filesWithContent)` with the specific file(s). Don't run the sanitizer unscoped — see SKILL.md gotcha for why.

## Glossary ID vs term confusion

ETHGlossary entries have `id` (slug, e.g., `"vitalik-buterin"`) and `term` (display form, e.g., `"Vitalik Buterin"`). Per-term lookups use the ID; the API also matches aliases intelligently. When searching, prefer the slug ID; for display, use the term.

