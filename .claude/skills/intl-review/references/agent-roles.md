# Multi-Agent Review Roles

`/review-translations` deploys multiple specialized agents in parallel per language: **structural**, **terminology**, **semantic**. Each focuses on a subset of the checklist to keep individual agent context manageable and review faster.

Load this reference when planning a review, splitting work, or debugging "agent X missed Y" reports.

## The three roles

| Role | Focus | Most-relevant scoring categories | Loads |
|---|---|---|---|
| **Structural** | MDX syntax, hrefs, markdown structure, code-block integrity | Technical Accuracy | `references/known-patterns.md` (critical build-breaking + navigation-breaking sections), `references/language-rules.md` (code/URL policy) |
| **Terminology** | Brand names, glossary compliance, ticker symbols, technical terms | Brand Name Preservation, Terminology Consistency | `references/ethglossary-usage.md`, `references/known-patterns.md` (high-quality section), `references/language-rules.md` |
| **Semantic** | Translation accuracy, tone/register, untranslated content, meaning preservation | Semantic Fidelity, Tone/Register | `references/known-patterns.md` (critical semantic + medium tone), `references/language-rules.md` |

## Structural agent

**Owns:**

- MDX syntax (raw `<` before tokens, unclosed backticks, orphaned closing tags, JSX attribute quoting)
- Internal hrefs (translated paths, missing parens, image path corruption)
- Markdown structure (block count vs English, header hierarchy, code-fence integrity)
- Code-block content (functional code in English; comments may be translated)
- Heading anchor IDs (`{#id}` — must be ASCII, no junk appended)

**Doesn't own:**

- Brand name evaluation (Terminology)
- Sentence-level meaning (Semantic)
- Tone consistency (Semantic)

**Output:** critical issues that would break build or navigation, plus structural-integrity warnings.

## Terminology agent

**Owns:**

- Brand names (Solidity, Hardhat, MetaMask, etc.) per ETHGlossary `script_rule`
- Glossary compliance — every ETHGlossary term in the source verified against the locale
- Ticker symbols (ETH, BTC, BLS) and acronyms (DAO, NFT, DeFi, API)
- Technical units (Wei, Gwei, ETH) — never translate
- People's names per `script_rule: transliterate`
- Cross-script contamination (Devanagari in Turkish, etc.)

**Doesn't own:**

- MDX/markdown structure (Structural)
- Sentence meaning beyond term-level (Semantic)

**Output:** critical issues where the locale deviates from ETHGlossary; high-severity for brand mistakes; medium for Crowdin TM leaks.

**Mandatory:** uses ETHGlossary `/filter` per file. Reviews without glossary lookups are invalid.

## Semantic agent

**Owns:**

- Semantic accuracy (no proof-of-stake/work swaps, no "mainnet" → "market", no validator/miner conflation)
- Untranslated content (English paragraphs left mid-document)
- Tone/register consistency (du/Sie, tu/vous, casual/polite)
- Cross-script contamination (when it indicates context bleed, not just character mismatch)
- Phrasing quality / fluency (judgment-level)

**Doesn't own:**

- Term-by-term evaluation (Terminology)
- Markdown/JSX syntax (Structural)

**Output:** critical semantic inversions; warnings for tone shifts; informational notes on phrasing.

## When to use one agent vs three

| Situation | Recommended approach |
|---|---|
| PR has < 25 files | Single combined agent (one role) — overhead of 3 agents isn't worth it |
| PR has 25-50 files | 3 agents, parallel |
| PR has 50+ files | 3 agents per language, parallel; split files into chunks of ~25 per agent |
| Single-language standalone review | 3 agents per `/review-translations` Phase 3 default |
| Single-language quick spot-check | Single combined agent with a targeted file list |
| Language with no native-script complications (Latin-script langs) | Skip the role split; Structural + Terminology in one pass is enough |

## Agent prompts (what each role gets)

`/review-translations` Phase 3 builds the prompt per role. Common to all:

- Worktree path
- File list for this agent's chunk
- Known-patterns digest (from `references/known-patterns.md`)
- Glossary terms for the language (from `/filter` per file)
- Prior findings from `.claude/translation-review/per-language/{lang}.md`
- Review methodology (per-mode: incremental since last review SHA, or full PR diff)

Role-specific section in the prompt: the checklist relevant to that role only. Reduces context bloat and keeps each agent's focus tight.

## Combining outputs

After the agents return, Phase 4 of `/review-translations`:

1. Aggregates critical issues by language and category
2. Computes per-category quality scores (5-category rubric in `references/scoring-rubric.md`)
3. Produces the combined report block per language
4. Displays the full report to the user

Phase 5 then auto-fixes the critical issues (unless `--no-fix`).

## What if an agent reports outside its scope?

The role boundaries aren't strict. If the Structural agent notices a brand-name issue while inspecting MDX, it can report it — the aggregation phase deduplicates by file+line+issue.

The boundaries exist for **focus during analysis**, not for **scope of output**. A finding from any agent is valid; the role just informs what the agent prioritized.

## When to skip the role split

- Small reviews (< 25 files): overhead exceeds benefit
- Latin-script languages: structural + terminology in one pass; semantic concerns are simpler
- Spot-checks: targeted file list with combined agent
- Debugging a specific reported issue: single-purpose agent with the issue + the affected file(s)

## See also

- `references/scoring-rubric.md` for how each role's findings map to score categories
- `references/critical-vs-warning.md` for severity classification each role applies
- `references/known-patterns.md` for the pattern catalog each role draws from
- `.claude/commands/review-translations.md` for the slash command's full Phase 3 prompt-building logic
