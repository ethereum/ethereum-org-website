# Incremental Translation Test Spec

Test fixtures for validating the incremental translation pipeline. Version A is the "before" English content; version B has mutations applied. Both are translated via Gemini to produce locale files.

## Fixture files

- `public/content/test-spec-fixture-a/index.md` -- English markdown (before)
- `public/content/test-spec-fixture-b/index.md` -- English markdown (after mutations)
- `src/intl/en/page-test-spec-fixture-a.json` -- English JSON (before)
- `src/intl/en/page-test-spec-fixture-b.json` -- English JSON (after mutations)

After Gemini translation:
- Locale A files: translation of the A fixtures (pipeline input)
- Locale B files: translation of the B fixtures (ground truth for prose)

## Markdown mutations (A -> B)

| # | Section | Change | Classification |
|---|---------|--------|----------------|
| 1 | Frontmatter | `image` path -> hero-licensing-v2.png | inert |
| 2 | Frontmatter | `description` reworded | translatable |
| 3 | #understanding-open-source-licensing | Remove `<Divider />` | structural |
| 4 | #what-is-open-source | OSI link href appended `/annotated` | inert |
| 5 | #what-is-open-source | Inline code `LICENSE` -> `LICENSE.md` | inert |
| 6 | #what-is-open-source | `<a>` href appended `?lang=en` | inert |
| 7 | #what-is-open-source | Image path -> license-comparison-v2.png | inert |
| 8 | #the-four-freedoms | Prose sentence reworded | translatable |
| 9 | #the-four-freedoms | InfoBanner `title` attr "Important distinction" -> "Key concept" | translatable |
| 10 | #copyleft-licenses | Solidity code comment changed | translatable |
| 11 | #copyleft-licenses | Solidity code body changed (require message) | inert |
| 12 | #copyleft-licenses | ExpandableCard `eventCategory` appended `-guide` | inert |
| 13 | #copyleft-licenses | `<a>` href inside ExpandableCard appended `#AllCompatibility` | inert |
| 14 | #permissive-licenses | Python code comment changed | translatable |
| 15 | #permissive-licenses | Link text + URL: [GitHub](github.com) -> [GitHub Repositories](github.com/new) | translatable |
| 16 | #permissive-licenses | Multi-link: [Sepolia](sepolia.dev) -> [Holesky](holesky.dev) (1 of 4 links, text + href) | translatable |
| 17 | #contributing-to-projects | Heading ID rename -> `#how-to-contribute` | rename |
| 18 | #how-to-contribute | DocLink href appended `/getting-started/` | inert |
| 19 | #code-review | AlertEmoji `text` attr `:mag:` -> `:eyes:` | inert |
| 20 | #community-collaboration | DocLink `className="featured"` attribute added | structural |
| 21 | #license-scanning | New JSON code fence added | structural |
| 22 | #sbom-generation | YouTube `id` attr changed | inert |
| 23 | (new section) | `#dual-licensing` section added | added (translatable) |
| 24 | top-level | `#compliance-and-auditing` and `#community-collaboration` sections swapped | reordered |
| 25 | #how-to-contribute | ButtonLink href -> `/quick-start/` | inert |
| 26 | #code-review | Emoji `text` attr in heading `:bulb:` -> `:star:` | inert |
| 27 | #compliance-and-auditing | Card `href` attr -> `/license-audit/` | inert |
| 28 | #code-review | QuizWidget `quizKey` attr changed | inert |

## JSON mutations (A -> B)

| # | Key | Change | Classification |
|---|-----|--------|----------------|
| 1 | page-description | Prose reworded | translatable |
| 2 | stat-label-contributors | "Active contributors" -> "Active contributors worldwide" | translatable |
| 3 | banner-text | `<a>` href `/contributing/` -> `/contributing/getting-started/` | inert |
| 4 | footer-note | First `<a>` href appended `?sortBy=name` | inert |
| 5 | welcome-user | ICU variable `{username}` -> `{displayName}` | inert |
| 6 | project-count | ICU variable `{count}` -> `{total}` | inert |
| 7 | nested.link-text | "View all resources" -> "Browse all resources" | translatable |
| 8 | multi-link | Third `<a>` href `spdx.org/` -> `spdx.org/licenses/` | inert |
| 9 | new-key | Brand new key added | added (translatable) |
| 10 | empty-results | Key removed | removed |

## Classification summary

### Markdown
- **Inert**: 15 (mutations 1, 4, 5, 6, 7, 11, 12, 13, 18, 19, 22, 25, 26, 27, 28)
- **Translatable**: 7 (mutations 2, 8, 9, 10, 14, 15, 16)
- **Structural**: 3 (mutations 3, 20, 21)
- **Rename**: 1 (mutation 17)
- **Added**: 1 (mutation 23)
- **Reordered**: 1 (mutation 24)

### JSON
- **Inert**: 5 (mutations 3, 4, 5, 6, 8)
- **Translatable**: 3 (mutations 1, 2, 7)
- **Added**: 1 (mutation 9)
- **Removed**: 1 (mutation 10)

## Test assertion rules

1. **Inert changes**: Pipeline propagates deterministically. No Gemini call. Old value replaced with new value in all locale files.
2. **Translatable changes**: Pipeline sends the affected section to Gemini for retranslation. Splices the result back.
3. **Structural changes**: Pipeline propagates structure changes (component add/remove) without Gemini.
4. **Renames**: Pipeline updates heading `{#id}` in locale files. No Gemini.
5. **Added sections**: Pipeline sends new section to Gemini for fresh translation.
6. **Reordered sections**: Pipeline reorders sections in locale files to match English. No Gemini.
7. **Removed keys (JSON)**: Pipeline deletes the key from all locale JSON files.
8. **Unchanged sections**: Must be byte-for-byte identical after pipeline runs. "Do no harm."

## Components covered

- `<Divider />` (self-closing, inert)
- `<InfoBanner>` (block, translatable + inert attrs)
- `<ExpandableCard>` (block, translatable + inert attrs, inner content with `<a>` tags)
- `<DocLink>` (block, inert href, translatable children)
- `<Alert>` / `<AlertEmoji>` / `<AlertContent>` / `<AlertDescription>` (nested block)
- `<YouTube />` (self-closing, inert id)
- `<ButtonLink>` (block, inert href, translatable children)
- `<Emoji />` (self-closing, mixed attrs, used inside heading)
- `<QuizWidget />` (self-closing, inert quizKey)
- `<CardGrid>` / `<Card />` (nested, translatable title/description, inert href)
- `<GlossaryDefinition />` (self-closing, inert term)

## Inline patterns covered

- Markdown links `[text](url)`
- Markdown images `![alt](path)`
- Inline code `` `code` ``
- HTML `<a href="...">text</a>` with target attr
- HTML `<em>`, `<strong>` inline
- HTML `<sup>` footnote
- HTML `<div>` wrapping inside components
- Multi-link sentences (4 links in one paragraph, SOV testing)
- Bold `**text**` and italic `_text_`

## Code fence patterns covered

- Solidity (with translatable `//` comments + inert code body)
- Python (with translatable `#` comments + inert code body)
- Bash (with translatable `#` comments + inert code body)
- JSON (pure inert, no comments)
- Markdown `md` fence (translatable prose content)
