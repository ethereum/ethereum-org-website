---
description: Review translation imports for quality issues (full pipeline)
allowed-tools: Bash(git *), Bash(pnpm *), Bash(npx tsx *), Bash(gh *), Bash(cp *), Bash(pwd), Bash(ls *), Bash(test *), Read, Glob, Grep, Task, Edit, Write, AskUserQuestion
argument-hint: [--pr=NUMBER] [--language=CODE] [--model=opus|sonnet|haiku (opus)] [--full] [--no-fix] [--build-local] [--netlify-check]
---

# Translation Review Command

Full pipeline for reviewing translation imports: worktree setup, sanitizer, AI review, auto-fix, build verification, and scoring.

## Context
- Current branch: !`git branch --show-current`
- Arguments: $ARGUMENTS

## Modes of Operation

### Mode 1: Pending Translations (Default)
Reviews the open PR for the canonical pending-translations branch (`intl/pending-dev`).
```
/review-translations                    # Open PR for intl/pending-dev, all languages
/review-translations --language=hi      # Same, filtered to Hindi only
```

### Mode 2: Specific PR
Reviews a specific PR (e.g., a feature-branch translation PR like `intl/pending-feat-foo`).
```
/review-translations --pr=18040                 # Specific PR
/review-translations --pr=18040 --language=hi   # Specific PR, Hindi only
```

### Mode 3: Standalone Language Review
Reviews all files for a language when no PR context is available.
```
/review-translations --language=es      # On dev branch: review all Spanish files
```

## Scope behavior

By default, the command reviews **only files changed since the last LLM review** of this PR (incremental). The prior-review SHA is read from the most recent submitted PR Review on the PR (`commit_id` field, see Phase 0). If no prior review exists, the full PR diff is reviewed. Pass `--full` to override and re-review the entire PR diff even when a prior review exists.

## Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--pr=NUMBER` | Specific PR to review | open PR for `intl/pending-dev` |
| `--language=CODES` | Filter to specific language(s), comma-separated | all languages in PR |
| `--model=MODEL` | Model for analysis: `opus` (deep), `sonnet` (balanced), `haiku` (fast) | `opus` |
| `--full` | Re-review the entire PR diff, ignoring any prior review SHA | absent (incremental) |
| `--no-fix` | Skip auto-fixing critical issues; only present findings | absent (fixes applied by default) |
| `--build-local` | Run a local scoped build to verify no MDX compilation errors | absent (skipped by default) |
| `--netlify-check` | Check Netlify deploy preview for build failures | absent (skipped by default) |

## Phase 0: Determine Mode and Scope

### Parse Flags

Extract from $ARGUMENTS:
- `PR_NUMBER`: from `--pr=NUMBER` or auto-detect (see below)
- `LANGUAGE_FILTER`: from `--language=CODES` (comma-separated) or empty
- `FULL_REVIEW`: `true` if `--full` is present, `false` otherwise
- `NO_FIX`: `true` if `--no-fix` is present, `false` otherwise
- `BUILD_LOCAL`: `true` if `--build-local` is present, `false` otherwise
- `NETLIFY_CHECK`: `true` if `--netlify-check` is present, `false` otherwise

### Determine Mode

1. **Attempt PR Detection**
   - If `--pr=NUMBER` provided → use that PR
   - Otherwise, look up the open PR for the canonical pending-translations branch:
     ```bash
     PR_NUMBER=$(gh pr list --head intl/pending-dev --state open --json number -q '.[0].number' 2>/dev/null)
     ```

2. **Route to Mode**
   - If `PR_NUMBER` found → continue to **PR Mode Setup**
   - If no `PR_NUMBER`:
     - If `--language` provided → continue to **Standalone Mode Setup**
     - Otherwise → error: "No open PR found for intl/pending-dev. Use --pr=NUMBER or --language=CODE."

### PR Mode Setup (Mode 1 & 2)

3. **Determine Languages**
   - If `--language=CODES` provided: Use those as filter
   - Otherwise: Extract all languages from PR

   To extract languages from PR:
   ```bash
   gh api repos/{owner}/{repo}/pulls/{PR}/files --paginate -q '.[].filename' | \
     grep -E "(translations/[a-z]{2}(-[A-Z]{2})?/|intl/[a-z]{2}(-[A-Z]{2})?/)" | \
     sed 's|.*translations/||;s|.*intl/||' | cut -d'/' -f1 | sort -u
   ```

4. **Determine Scope: Incremental vs. Full PR Diff**

   The default behavior is **incremental** — review only files changed since the last LLM review of this PR. The prior-review SHA comes from the PR's submitted reviews. If `FULL_REVIEW` is true (i.e., `--full` was passed), skip the prior-review lookup entirely and use the full PR diff.

   ```bash
   # Fetch all submitted reviews for this PR, sorted oldest -> newest
   # Skip this fetch entirely when FULL_REVIEW is true.
   REVIEWS_JSON=$(gh api "repos/{owner}/{repo}/pulls/${PR_NUMBER}/reviews" --paginate)
   ```

   **Identify the prior intl-pipeline review** (most recent first). If `FULL_REVIEW` is true, skip this step and proceed directly to the full-PR-diff branch below; report `"Override (--full): reviewing full PR diff ({N} files)."` This command may be invoked locally, in which case the review may have been posted under the user's GitHub identity rather than Claude's — so do **not** filter by `user.login`. Instead, scan review bodies and pick the most recent one whose body looks like a translation-quality review (heuristics: contains the heading `Translation Quality Review`, mentions multiple language codes, contains a scoring table, mentions glossary/ETHGlossary, or is signed by Claude). Bodies like "LGTM", "approved", or unrelated technical reviews must NOT match.

   - If a matching review is found:
     - Set `LAST_REVIEWED_SHA = <commit_id>` from that review object (GitHub-attached, authoritative).
     - Compute the file list as the diff from `LAST_REVIEWED_SHA` to PR HEAD:
       ```bash
       PR_HEAD_SHA=$(gh pr view ${PR_NUMBER} --json headRefOid -q .headRefOid)
       gh api "repos/{owner}/{repo}/compare/${LAST_REVIEWED_SHA}...${PR_HEAD_SHA}" \
         --jq '.files[].filename' | \
         grep -E "(translations/|intl/)" | \
         grep -E "/(${LANGUAGES_REGEX})/"   # If language filter applied
       ```
     - If the compare API errors (e.g., `LAST_REVIEWED_SHA` is unreachable from current HEAD due to a force-push or rebase): log a warning and fall back to the full PR diff below.
     - Report: "Incremental review since prior review at `${LAST_REVIEWED_SHA:0:10}` -- {N} files changed."

   - If no matching prior review is found: review the full PR diff.
     ```bash
     gh api repos/{owner}/{repo}/pulls/{PR}/files --paginate -q '.[].filename' | \
       grep -E "(translations/|intl/)" | \
       grep -E "/(${LANGUAGES_REGEX})/"   # If language filter applied
     ```
     Report: "No prior LLM review found -- reviewing full PR diff ({N} files)."

### Standalone Mode Setup (Mode 3)

3. **Set Languages** from `--language=CODES`

4. **Scope:** Review all files for those languages on the `dev` branch.

5. **Report**: "Reviewing all {LANGUAGE} files on dev branch"

## Phase 1: Worktree Setup and Sanitizer

This phase prepares an isolated worktree with all dependencies, merges latest `dev`, and runs the sanitizer.

**Sandbox permissions:** Bash command patterns are pre-approved in the `allowed-tools` frontmatter above — no user approval prompts needed. However, `gh` CLI commands **always** require `dangerouslyDisableSandbox: true` due to a TLS certificate verification bug in the Claude Code sandbox (the sandbox's TLS proxy breaks `gh`'s HTTPS connections to `api.github.com`). Git commands work fine in sandbox (SSH protocol). If `pnpm install` or `pnpm build` fail with network/filesystem sandbox errors, retry those specific commands with `dangerouslyDisableSandbox: true`. The full permissions inventory is in `docs/solutions/integration-issues/crowdin-file-path-mapping-and-review-workflow.md` § "Automation Permissions Required".

### 1a. Create Worktree

**CRITICAL: The worktree MUST be on the named PR branch, NEVER on a detached HEAD.**

All commands in this block require `dangerouslyDisableSandbox: true`.

```bash
PR_BRANCH=$(gh pr view {PR_NUMBER} --json headRefName -q .headRefName)
WORKTREE_PATH=".worktrees/pr-{PR_NUMBER}"
```

If the worktree already exists, verify it is on the correct branch:
```bash
if [ -d "$WORKTREE_PATH" ]; then
  echo "Worktree already exists at $WORKTREE_PATH"
  CURRENT_BRANCH=$(git -C "$WORKTREE_PATH" branch --show-current)
  if [ "$CURRENT_BRANCH" != "$PR_BRANCH" ]; then
    echo "ERROR: Worktree is on '$CURRENT_BRANCH', expected '$PR_BRANCH'. Removing and recreating."
    git worktree remove "$WORKTREE_PATH" --force
  fi
fi
```

If the worktree does not exist (or was just removed), create it fresh:
```bash
if [ ! -d "$WORKTREE_PATH" ]; then
  # Step 1: Fetch the PR branch
  git fetch origin "$PR_BRANCH"

  # Step 2: Delete any stale local branch with that name (from a prior run)
  git branch -D "$PR_BRANCH" 2>/dev/null || true

  # Step 3: Create the worktree on a NEW local branch tracking the remote
  git worktree add -b "$PR_BRANCH" "$WORKTREE_PATH" "origin/$PR_BRANCH"
fi
```

**Verification gate — do NOT proceed if this fails:**
```bash
CURRENT_BRANCH=$(git -C "$WORKTREE_PATH" branch --show-current)
if [ -z "$CURRENT_BRANCH" ] || [ "$CURRENT_BRANCH" != "$PR_BRANCH" ]; then
  echo "FATAL: Worktree is on '${CURRENT_BRANCH:-DETACHED HEAD}', expected '$PR_BRANCH'. Aborting."
  exit 1
fi
echo "Worktree verified on branch: $CURRENT_BRANCH"
```

### 1b. Merge Latest Dev

**Do this FIRST, before installing dependencies or copying any files, so the working tree is clean.**

```bash
cd "$WORKTREE_PATH"

# Merge latest dev to ensure branch is up-to-date
git fetch origin dev
git merge origin/dev --no-edit
```

### 1c. Environment Setup

```bash
cd "$WORKTREE_PATH"

# Set up environment variables
cp .env.example .env.local

# Install dependencies
pnpm install
```

## Phase 2: Load Knowledge Base and Glossary

Before deploying agents, load accumulated knowledge from prior reviews:

### Known Patterns
Read `.claude/translation-review/known-patterns.md` — this contains all issue patterns discovered in prior reviews (brand name mistranslations, cross-script contamination, MDX errors, semantic inversions, etc.). Summarize the key findings to inject into agent prompts.

### Translation Glossary (AUTHORITATIVE SOURCE)

**ETHGlossary** is the authoritative source for Ethereum term translations. Deviations are critical issues, not warnings.

Resolve the base URL from the pipeline config (env var wins; default lives in `src/scripts/intl-pipeline/config.ts` under `GLOSSARY_API_URL`):

```bash
GLOSSARY_API_URL="${GLOSSARY_API_URL:-$(grep -oE 'https://[^"]+/api/v[0-9]+' "$WORKTREE_PATH/src/scripts/intl-pipeline/config.ts" | head -1)}"
GLOSSARY_HOST="${GLOSSARY_API_URL%/api/*}"
```

Fetch `llms.txt` first as the canonical reference for endpoints and languages; if examples below disagree, llms.txt wins:

```bash
curl -sf "$GLOSSARY_HOST/llms.txt" \
  -o "$TMPDIR/ethglossary-llms.txt" \
  && cp "$TMPDIR/ethglossary-llms.txt" "$HOME/.claude/translation-review/ethglossary-llms.txt"
```

**Preferred — per-file filter** (`POST /filter`): returns only the glossary terms that appear in the English source, with translations sorted by occurrence. Avoids pulling hundreds of irrelevant terms into agent context.

```bash
ENGLISH_SOURCE=$(cat "$WORKTREE_PATH/public/content/{path}.md")
curl -sf -X POST "$GLOSSARY_API_URL/filter" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg text "$ENGLISH_SOURCE" --arg lang "{LANGUAGE_CODE}" '{text: $text, language: $lang}')"
```

**Fallback — full language** when filtering per file is impractical or the endpoint is unreachable:

```bash
curl -sf "$GLOSSARY_API_URL/translations/{LANGUAGE_CODE}"
```

Used in Phase 3 (review — deviations are CRITICAL), Phase 5 (auto-fix corrects to ETHGlossary translation), Phase 8 (new deviations logged).

### Per-Language Prior Findings
Check if `.claude/translation-review/per-language/{LANGUAGE_CODE}.md` exists. If so, read it and inject relevant prior findings into the agent prompt.

## Phase 3: Deploy Review Agents

For EACH detected language, deploy **multiple specialized sub-agents in parallel**.

Use a SINGLE message with MULTIPLE Task tool calls to achieve parallelism. For each language, deploy these agents:

### Sub-Agent Architecture

Each language gets up to 3 specialized agents. Split the file list into chunks of ~25 files per agent to stay within context limits.

#### Agent 1: Structural & Syntax Review
Focus: MDX syntax, hrefs, markdown structure, code block integrity.

#### Agent 2: Terminology & Brand Review
Focus: Brand names, glossary compliance, ticker symbols, technical terms.

#### Agent 3: Semantic & Quality Review
Focus: Translation accuracy, tone/register, untranslated content, meaning preservation.

For small languages (< 25 files), combine Agents 1-3 into a single agent.

### Agent Prompt Template

For each language agent, provide this prompt:

```
Review translation quality for {LANGUAGE_CODE} files.
Agent role: {AGENT_ROLE: structural|terminology|semantic}

## Scope
{SCOPE_INSTRUCTION}

## Files to Review
{LIST_OF_FILES_FOR_THIS_AGENT_CHUNK}

## File Locations

The worktree is already set up at: {WORKTREE_PATH}

- **Translated files:** {WORKTREE_PATH}/public/content/translations/{LANGUAGE_CODE}/
- **English sources:** {WORKTREE_PATH}/public/content/
- **JSON translations:** {WORKTREE_PATH}/src/intl/{LANGUAGE_CODE}/
- **English JSON:** {WORKTREE_PATH}/src/intl/en/

Read files directly from these paths. Do NOT create worktrees or checkout branches.

## Known Patterns from Prior Reviews

{INJECT_KNOWN_PATTERNS_SUMMARY}

## Glossary Terms for {LANGUAGE_CODE}

The community has voted on these translations for key Ethereum terms. Use these as the authority for terminology correctness:

{INJECT_GLOSSARY_TERMS_TABLE: | English Term | Accepted Translation | Votes |}

## Prior Findings for {LANGUAGE_CODE}

{INJECT_PER_LANGUAGE_FINDINGS_OR "No prior reviews for this language."}

## Review Methodology

**For PR-mode reviews (Modes 1 & 2):**
- Focus on NEW or CHANGED content within the scope determined in Phase 0 (incremental since last review, or full PR diff)
- Issues in unchanged lines are out of scope for this review
- Read both translation AND English source files from the worktree

**For standalone language review (Mode 3):**
- Review the entire current content of each file
- Compare against English source files from the worktree

## MANDATORY: Use ETHGlossary for the target language

Use the ETHGlossary terms fetched in Phase 2 as the authority for technical term translations. Report deviations as **critical** issues (not warnings), with the current (wrong) translation and the expected (ETHGlossary) translation so Phase 5 can auto-fix them.

**If you skip ETHGlossary, the entire review is invalid.**

## On finding zero issues

**Reporting zero critical issues is a fully acceptable outcome.** Do not invent issues to "show your work." If you genuinely cannot find a critical problem after a thorough check, report `0 critical, N warnings` (or `0/0`) and that is a valid result. Fabricated criticals cost more reviewer time than missed minor issues.

## Review Checklist

**If agent role is "structural":**

### 1. MDX Syntax (CRITICAL - breaks builds)
Known patterns that cause build failures:
- Raw `<` before numbers (e.g., `<5GB` must be `&lt;5GB`)
- Unclosed backticks in inline code (compare against English source)
- Misplaced backticks exposing JSX fragments as raw code
- Orphaned HTML closing tags (`</a>` without matching opener)
- Missing closing backtick after `<component>.<method>()` patterns

### 2. Internal Hrefs (CRITICAL)
ALL internal links (starting with `/`) must match the English source exactly.
- `/governance` must NOT become `/gobernanza` (or equivalent in any language)
- Check both markdown links `[text](/path)` and JSX `href="/path"` attributes
- Anchor links (`#section-id`) must use ASCII/English IDs, not translated IDs

### 3. Structural Integrity
- Block count matches English (paragraphs separated by blank lines)
- Header hierarchy matches English (same number and level of headings)
- Code blocks: **functional code** (identifiers, strings, config keys, variable names, console/error output) must stay in English. **Code comments** (`//`, `/* */`, `#`) may be translated — these aid reader comprehension and don't affect execution.

**If agent role is "terminology":**

### 1. Brand Names (CRITICAL - Must Fix)
These MUST remain in English - flag ANY translation:
- Programming languages: Solidity, Vyper, Rust, JavaScript, TypeScript, Python
- Companies/Products: Alchemy, Infura, MetaMask, Consensys, Chainlink, OpenZeppelin, Gnosis, Flashbots, Etherscan, Hardhat, Foundry, Remix
- Protocols: Uniswap, Aave, Compound, MakerDAO, Lido, Rocket Pool, ENS
- Core terms: Ethereum, Bitcoin, Web3, DeFi, NFT, DApp, DAO

**IMPORTANT — Tutorial frontmatter `tags` arrays:**
Tutorial frontmatter tags contain a mix of brand names and concept/category terms. (Tags only appear in tutorial markdown files.)
- **Brand-name tags** (e.g., `"solidity"`, `"hardhat"`, `"alchemy"`, `"JavaScript"`, `"ERC-721"`) MUST stay in English. The sanitizer auto-fixes these; flag only if it missed one.
- **Concept/category tags** (e.g., `"smart contracts"`, `"testing"`, `"security"`, `"deploying"`, `"storage"`, `"transactions"`, `"frontend"`, `"nodes"`) are **intentionally translated** by Crowdin into the target language and MUST NOT be reverted to English. Translated concept tags like `"smart kontrakt účty"`, `"testování"`, `"bezpečnost"`, `"transakce"` are correct.
- **Rule of thumb:** If the English tag is a proper noun or product name, it must stay English. If it's a generic descriptive term, the translated form is correct.

### 2. Glossary Compliance (CRITICAL - Must Fix)
The EthGlossary is the **authoritative source** for Ethereum term translations. Deviations are not warnings — they are critical issues that must be corrected.

Cross-check translations of ALL key Ethereum terms against the glossary provided above.
**Any term where the translation deviates from the community glossary entry is a critical issue.** Report it with the current (wrong) translation and the expected (glossary) translation so Phase 5 can auto-fix it.

Pay special attention to high-risk terms:
- proof-of-stake / proof-of-work (semantic inversions are a known failure mode)
- mainnet / testnet (often mistranslated as "market" or "main network")
- client (must be computing term, not "customer")
- validator / miner (must not be swapped)
- gas, block, node, fork, shard, beacon chain, staking, smart contract
- Wei, Gwei, ETH (NEVER translate units)

**Do not flag glossary deviations as warnings. They are critical.**

### 3. Ticker Symbols & Acronyms
- ETH, BTC, BLS, ERC, EIP must never be translated or transposed
- Check for common transpositions: EHT, BSL, ECDAS

**If agent role is "semantic":**

### 1. Semantic Accuracy (HIGH)
Spot-check translations for meaning preservation:
- Does the translation convey the same meaning as English?
- Are there any semantic inversions (antonyms swapped)?
- High-risk areas: consensus mechanism descriptions, security warnings, financial terminology

### 2. Untranslated Content (HIGH)
Flag any substantial paragraphs that appear to still be in English.
This is a known issue — some pages were only partially translated.

Flag any deviation from glossary-approved terms as "Glossary mismatch" warnings.

### 3. Tone/Register Consistency (MEDIUM)
Check if formal/informal address is consistent throughout:
- German: du vs. Sie
- French: tu vs. vous
- Japanese: casual vs. polite forms
- Spanish: tu vs. usted
- Other languages: appropriate formal/informal consistency

### 4. Cross-Script Contamination
Flag any characters from unexpected scripts (e.g., Devanagari in Latin-script languages,
CJK in Arabic files). This indicates Crowdin translation memory leaks.

## Output Format

Return a structured report:

\`\`\`
## {LANGUAGE_CODE} Review Results ({AGENT_ROLE})

### Critical Issues (Must Fix)
| File | Line | Issue | Current | Expected |
|------|------|-------|---------|----------|
| path/to/file.md | 45 | Brand translated | [local] | Solidity |

### Warnings (Should Review)
| File | Line | Issue | Details |
|------|------|-------|---------|

### Files Reviewed
- Total: N
- With issues: M
- Clean: N-M

### Translation Quality Score

Rate ONLY translation quality (not import artifacts like duplications, stray characters, or encoding issues):

| Category | Score | Notes |
|----------|-------|-------|
| **Brand Name Preservation** | X/10 | Were brand names kept in English? |
| **Technical Accuracy** | X/10 | Were units (ETH, Gwei) and technical terms handled correctly? |
| **Semantic Fidelity** | X/10 | Does meaning match English source? |
| **Terminology Consistency** | X/10 | Is vocabulary consistent across files? |
| **Tone/Register** | X/10 | Is formal/informal address consistent? |

**Overall: X.X/10** (average of above scores)

Scoring guide:
- 10/10: Perfect, no issues
- 9/10: Excellent, minor issues only
- 8/10: Good, a few notable issues
- 7/10: Acceptable, several issues need attention
- 6/10 or below: Needs significant review

### Summary
Brief assessment of overall translation quality for this language.
\`\`\`
```

### Model Selection

Parse `--model=MODEL` from $ARGUMENTS (default: `opus`):
- `opus`: Deep analysis, thorough review of all checklist items
- `sonnet`: Balanced speed/depth, good for routine reviews
- `haiku`: Fast scan, focuses on brand names and critical issues only

Pass the model parameter to Task agents: `model: "{MODEL}"`

**Context overflow fallback:** If an agent hits "Prompt is too long" with Opus, relaunch with Sonnet and instruct to use Grep instead of reading entire files.

## Phase 4: Collect Results and Display Scoring Summary

Wait for all review agents to complete.

**MANDATORY: Always produce and display the scoring summary to the user, even if zero issues are found.** The scoring summary is a key deliverable of this command — it provides transparency for the PR review process and is intended to be posted to the PR.

Aggregate results into a combined report and **display it in full to the user**:

```markdown
# Translation Review Report

**PR:** #{PR_NUMBER}
**Languages:** {LANG_LIST} ({COUNT} total)
**Files reviewed:** {TOTAL_FILES}
**Date:** {TODAY}

## Summary by Language

| Language | Files | Critical | Warnings | Quality Score |
|----------|-------|----------|----------|---------------|
| ar       | 52    | 3        | 7        | 8.5/10        |
| de       | 64    | 1        | 4        | 9.0/10        |
...

## Quality Scores by Language

### {LANGUAGE_CODE} - {OVERALL_SCORE}/10

| Category | Score | Notes |
|----------|-------|-------|
| Brand Name Preservation | X/10 | ... |
| Technical Accuracy | X/10 | ... |
| Semantic Fidelity | X/10 | ... |
| Terminology Consistency | X/10 | ... |
| Tone/Register | X/10 | ... |

{SUMMARY}

(Repeat for each language)

## Critical Issues (Must Fix)

### {LANGUAGE_CODE}
{CRITICAL_ISSUES_TABLE}

## Warnings (Should Review)

### {LANGUAGE_CODE}
{WARNINGS_TABLE}
```

## Phase 5: Auto-Fix Critical Issues

**If `--no-fix` is present, skip this phase entirely.** Jump to Phase 6 (build verification) or Phase 7 (present results).

**Otherwise, automatically apply fixes for all critical issues** found in Phase 4. Do not prompt for confirmation on individual critical fixes — apply them all, then report what was changed.

All edits happen in the worktree at `{WORKTREE_PATH}`.

### Fix Categories (in order)

1. **MDX syntax errors** — escaped angle brackets, backtick fixes, orphaned tag removal
2. **Brand name translations** — revert translated brand names to English
3. **Translated code blocks** — restore functional code (identifiers, strings, config keys, console output) to English. Leave translated code comments (`//`, `/* */`, `#`) as-is.
4. **Translated hrefs** — restore internal links to match English source
5. **Ticker/acronym typos** — fix EHT→ETH, BSL→BLS, etc.
6. **Glossary deviations** — correct translations of key Ethereum terms to match the top-voted community glossary entry for that language. Use the glossary data fetched in Phase 2. For each deviation flagged by review agents, replace the incorrect translation with the glossary-approved translation. Be context-aware: match the surrounding sentence structure when substituting terms.

### After Fixes

Stage the review fixes (keep separate from sanitizer stage):
```bash
cd "$WORKTREE_PATH"
git add -A public/content/translations/ src/intl/
```

Report to user: "Applied {N} critical fixes across {M} files. Changes staged."

List each fix applied with file, line, and what changed.

## Phase 6: Build Verification (opt-in)

**Skip this phase entirely unless `--build-local` or `--netlify-check` flags are present.**

### 6a. Local Build (`--build-local`)

If `--build-local` is present, run a scoped build to verify no MDX compilation errors remain:

```bash
cd "$WORKTREE_PATH" && NEXT_PUBLIC_BUILD_LOCALES=en,{LANGUAGE_CODE} pnpm build
```

**Note:** This command requires `dangerouslyDisableSandbox: true` as the build writes to `.next/` inside the worktree.

- If the build **passes**: Report "Build passed for {LANGUAGE_CODE}"
- If the build **fails**:
  - Parse error messages for MDX compilation errors
  - Apply additional fixes based on known patterns:
    - "Unexpected character before name" → raw `<` needs `&lt;` escaping
    - "Expected closing tag" → unclosed backtick or orphaned tag
    - "Unexpected closing slash" → misplaced backtick exposing JSX
  - Re-run the build after fixes
  - If it still fails, report the remaining errors to the user

### 6b. Netlify Deploy Preview (`--netlify-check`)

If `--netlify-check` is present, run `/netlify-build-check` to check the Netlify deploy preview for build failures and identify MDX syntax errors from the deploy logs.

## Phase 7: Present Results and Prompt User

**Display the full scoring summary from Phase 4 again**, including any changes from Phase 5 fixes. This is the primary output of the review command.

Use AskUserQuestion to present options:

**Question:** "Review complete. Found X critical issues (auto-fixed), Y warnings across N languages."

**Options:**
1. **Submit review to PR** — Submit quality scores as a proper PR Review (not an issue comment)
2. **Review warnings** — Show detailed warning list for manual review
3. **Prepare commit message** — Generate commit message for all staged changes (sanitizer + review fixes)
4. **Done** — End review session

### If "Submit review to PR" selected:

**This MUST be submitted as a proper PR Review, not an issue comment.** The next invocation of `/review-translations` reads each PR Review's GitHub-attached `commit_id` to determine the incremental scope. An issue comment (`gh pr comment`) does not carry a `commit_id` and would break the incremental flow.

Write the review body to a temp file (to avoid heredoc backtick issues), then submit it via `gh pr review`, which auto-attaches the current PR HEAD SHA as `commit_id`:

```bash
gh pr review ${PR_NUMBER} --comment --body-file "$TMPDIR/pr-review-${PR_NUMBER}.md"
```

Use `--approve` instead of `--comment` only when the review turned up **zero critical issues** (whether because none were found, or because all were auto-fixed in this same run). Otherwise use `--comment`. Never use `--request-changes`.

Review body format:
```markdown
## Translation Quality Review

**PR:** #{PR_NUMBER}
**Branch HEAD:** `{PR_HEAD_SHA_FIRST_10}` (capture inline: `gh pr view ${PR_NUMBER} --json headRefOid -q .headRefOid`)
**Languages:** {LANG_LIST}
**Files reviewed:** {TOTAL_FILES}
**Date:** {TODAY}
**Fixes:** {FIXES_LINE}

Where `{FIXES_LINE}` is one of:
- `Critical fixes applied: {N}` -- when running locally with auto-fix enabled and fixes were committed to this branch
- `No fixes applied (review-only)` -- when running in GitHub Actions without `--fix`, or when `--no-fix` was passed locally
- `No critical issues found` -- when there were no critical issues to fix in the first place

| Language | Files | Quality Score | Issues |
|----------|-------|---------------|--------|
| {LANG} | {N} | {SCORE}/10 | {CRITICAL} critical, {WARNINGS} warnings |
...

<details>
<summary>Detailed Scores: {LANGUAGE_CODE} ({OVERALL_SCORE}/10)</summary>

| Category | Score | Notes |
|----------|-------|-------|
| Brand Name Preservation | X/10 | ... |
| Technical Accuracy | X/10 | ... |
| Semantic Fidelity | X/10 | ... |
| Terminology Consistency | X/10 | ... |
| Tone/Register | X/10 | ... |

**Overall: X.X/10**

{SUMMARY}

</details>

(Repeat details block for each language)

<details>
<summary>Issues Found & Fixed ({N} total)</summary>

| File | Issue | Details |
|------|-------|---------|
| ... | ... | ... |

</details>

---
*Reviewed by Claude Code*
```

### If "Prepare commit message" selected:

Generate commit message based on all staged changes:
```
fix(i18n): sanitize and review {LANGUAGE_CODE} translations

Sanitizer fixes: {SANITIZER_SUMMARY}
Review fixes: {REVIEW_SUMMARY}

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

**Note: Do NOT commit automatically.** Output the message for the user to commit manually (GPG signing requires user interaction).

## Phase 8: Update Knowledge Base and Cleanup

### Update Knowledge Base

1. **Per-language findings**: Write/update `.claude/translation-review/per-language/{LANGUAGE_CODE}.md` with:
   - Quality score and date
   - Issues found and fixed
   - New glossary deviations discovered
   - Language-specific patterns

2. **Known patterns**: If new issue patterns were discovered (not already in `known-patterns.md`), append them to `.claude/translation-review/known-patterns.md`.

### Compound Learnings

**If any issues were found and fixed (critical or warning), run `/workflows:compound` to document the findings.** This captures what was learned during this review for future reference.

If the review found zero issues requiring fixes, skip this step.

### Worktree Cleanup

Ask the user whether to keep or remove the worktree:

**Question:** "Keep the worktree at {WORKTREE_PATH}?"

**Options:**
1. **Keep** — Leave worktree in place for further work
2. **Remove** — Clean up with `git worktree remove {WORKTREE_PATH}`

## Protected Brand Names Reference

These terms MUST NEVER be translated in any language:

**Programming Languages:**
Solidity, Vyper, Rust, JavaScript, TypeScript, Python, Go, Java, C++

**Companies & Products:**
Alchemy, Infura, MetaMask, Consensys, Chainlink, OpenZeppelin, Gnosis, Flashbots

**Protocols & Projects:**
Ethereum, Bitcoin, Uniswap, Aave, Compound, MakerDAO, Lido, Rocket Pool

**Technical Units (NEVER translate):**
ETH, Wei, Gwei, Gas

## Notes

- The sanitizer runs in Phase 1 and handles deterministic fixes. The review agents in Phase 3 handle judgment calls the sanitizer cannot: semantic accuracy, tone/register, glossary compliance, and context-dependent quality issues.
- **Frontmatter tags policy:** Only BRAND-NAME tags must remain in English (the sanitizer fixes these). Concept/category tags (e.g., "smart contracts", "testing", "deploying") are intentionally translated by Crowdin and should NOT be flagged or reverted.
- **Code comments policy:** Code comments (`//`, `/* */`, `#`) inside code fences MAY be translated. Only functional code (identifiers, strings, config keys, console output) must stay in English.
- Large PRs (5+ languages) may take several minutes with Opus
- Use `--model=sonnet` or `--model=haiku` for faster reviews
- Build verification is opt-in: `--build-local` for local scoped builds, `--netlify-check` for Netlify deploy preview checks
- If an agent exceeds context limits with Opus, fall back to Sonnet with Grep-based file inspection
- **ETHGlossary** is the authoritative source for term translations across review (Phase 3), auto-fix (Phase 5), and knowledge base (Phase 8). See Phase 2 for usage; `llms.txt` is the canonical endpoint reference.
- Knowledge base at `.claude/translation-review/` accumulates findings across reviews (committed to repo)
- `gh` CLI commands require `dangerouslyDisableSandbox: true` due to TLS certificate verification issues in sandbox mode
