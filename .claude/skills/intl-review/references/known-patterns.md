# Known Translation Patterns

Condensed pattern catalog for review-time triage. The living version at `.claude/translation-review/known-patterns.md` is authoritative — agents writing review findings update it after each language pass. This reference is the at-a-glance digest for spotting issues during a review.

## Severity rubric (quick)

- **Critical**: build-breaking (MDX errors), navigation-breaking (translated hrefs/anchors), or semantically wrong (proof-of-stake ↔ proof-of-work, mainnet → "market"). Auto-fixed by `/review-translations` unless `--no-fix`.
- **High**: visible to readers but doesn't break the build (brand-name mistranslations the sanitizer missed, untranslated paragraphs, glossary deviations on visible terms).
- **Medium**: cosmetic or quality (tone inconsistency, awkward phrasing, light cross-script contamination).
- **Low**: nitpicks (spacing inside paragraphs, minor punctuation).

Full severity rubric: `references/critical-vs-warning.md`.

## Critical: build-breaking (MDX)

These break `pnpm build` for the affected locale.

- **Raw `<` before numbers / words** — `<5GB` should be `&lt;5GB`. `<Stockage[4]` should be `&lt;Stockage[4]` (translator dropped backslash escape).
- **Unclosed backticks in inline code** — compare against English source position-by-position.
- **Misplaced backticks exposing JSX fragments** — `` `<> ...` </>`) `` — backtick closes early, `</>` exposed to MDX parser.
- **Orphaned closing HTML tags** — `</a>` / `</em>` / `</li>` without matching opener.
- **Missing closing backtick after `<component>.<method>()` patterns** — chain notation that Gemini truncates.
- **Asymmetric backticks** — `` `text`` `` (single-open, double-close) or `` ``text` `` (reverse). Exposes raw content as inline code or breaks the inline-code span entirely.
- **Inner double quotes in JSX attribute** — `title="What is "X"?"` terminates the attribute early. Need `&quot;` or single quotes.
- **Backslash before closing tag** — `<strong>text\</strong>` — translator inserted backslash, MDX rejects.
- **JSX attribute with closing-guillemet mangled to ASCII `>`** — `title="...mais maintenant >` (French/Russian/Ukrainian guillemet swap). Documented in `intl-pipeline-bugs-from-pr-18041-review.md`.

## Critical: navigation-breaking

- **Internal hrefs translated** — `/governance` → `/gobernanza` (or any locale equivalent). Both markdown `[text](/path)` and JSX `href="/path"`. Anchor links must use ASCII/English IDs.
- **Backtick-wrapped markdown links** — `` `[text](/path)` `` renders as inline code, not a link.
- **Missing parentheses in link syntax** — `[text]https://url` or `[text]/path/` — parens stripped.
- **Image path corruption** — `./image.png` → `/.image.png` (ENOENT, breaks build).
- **Heading anchor junk** — `{#network-impact}네트워크-충격` — translated anchor ID appended.

## Critical: semantic

These render successfully but say the wrong thing.

- **Proof-of-stake ↔ proof-of-work swap** — frequent failure mode on consensus pages.
- **"Mainnet" → "market" / "main network"** — confusion about the proper noun.
- **"Client" mistranslated as "customer"** — software client vs business client.
- **Validator / miner swapped or conflated**.
- **"Gas" → "Sprit"/"gasoline"** in some European languages — semantic translation of a domain term.
- **"Wei"/"Gwei"/"ETH" translated** — units of value MUST remain in English/canonical form.

## High: visible quality issues

- **Brand-name mistranslations** the sanitizer missed — Solidity → Polish phonetic, MetaMask → "Meta Mask". Cross-reference ETHGlossary; deviations are critical (`script_rule` deviation), not high.
- **Glossary deviations** — any term where translation differs from the ETHGlossary entry for that language is a **critical** issue (the auto-fix path corrects them).
- **Untranslated chunks** — substantial paragraphs left in English mid-document.
- **Ticker/acronym typos** — `EHT` → should be `ETH`, `BSL` → `BLS`, `ECDAS` → `ECDSA`.
- **Cross-script contamination** — Devanagari in Turkish, CJK in Arabic. Indicates Crowdin TM leak (old imports) or Gemini context bleed (new).

## High: frontmatter tag policy violations

Tutorial frontmatter `tags:` arrays contain a mix:

- **Brand-name tags** (`"solidity"`, `"hardhat"`, `"alchemy"`, `"JavaScript"`, `"ERC-721"`) — MUST stay English. Flag if translated.
- **Concept/category tags** (`"smart contracts"`, `"testing"`, `"security"`, `"deploying"`, `"frontend"`) — MUST be translated. Flag if reverted to English.

Most common mistake: reviewer reverts a concept tag thinking it should be Latin. Don't.

## High: code-block policy violations

- **Functional code translated** — identifiers (`require`, `pragma`, function names), strings, config keys, console output — must stay English. Flag and revert.
- **Code comments untranslated** — comments (`//`, `/* */`, `#`) inside code fences **may** be translated. Not a violation if they are. Don't flag.

## Medium: tone, register, formality

- **Inconsistent formality** — German `du` vs `Sie` mixed in same doc, French `tu` vs `vous`, Japanese casual vs polite, Spanish `tu` vs `usted`.
- **Inconsistent terminology within a doc** — same English term translated differently in adjacent paragraphs.

## Crowdin-era artifacts (legacy; still surface occasionally)

- **`''text''` double apostrophes** — Crowdin escaping artifact.
- **Numbered placeholders** — `<0>text</0>` from Crowdin string-replace artifacts that didn't get restored.
- **Lorem ipsum placeholder** — left in a real translation value.
- **Translated `@username` GitHub handles** — `@axic` → `@kwaaxic`. Broken attribution.
- **Backslash before closing HTML tag** — Crowdin escaping artifact (now caught by sanitizer in most cases).

## How to use this catalog

1. Load `.claude/translation-review/known-patterns.md` for the long-form authoritative version (updated over time).
2. Use this digest during review to triage at a glance.
3. When a NEW pattern surfaces, add it to the living doc — not this reference. Update this reference only on structural shifts (new severity categories, new policy domains).

## See also

- `references/critical-vs-warning.md` for the severity rubric
- `references/language-rules.md` for per-language-group rules (Indic, Cyrillic, RTL, CJK phonetic, CJK semantic)
- `references/ethglossary-usage.md` for glossary lookups during review
- `docs/solutions/integration-issues/sanitizer-test-research.md` for the running list of patterns the sanitizer covers vs doesn't
