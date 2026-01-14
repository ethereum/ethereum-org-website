---
description: Review translation imports for quality issues (runs after sanitizer)
allowed-tools: Bash, Read, Glob, Grep, Task, AskUserQuestion
argument-hint: [--pr=NUMBER (auto)] [--scope=pr|full (pr)] [--language=CODE] [--model=opus|sonnet|haiku (opus)]
---

# Translation Review Command

Review translation imports, identifying issues that require human/AI judgment beyond what the deterministic sanitizer can fix.

## Context
- Current branch: !`git branch --show-current`
- Arguments: $ARGUMENTS

## Modes of Operation

### Mode 1: PR Review (Default)
Reviews files changed in a specific PR.
```
/review-translations                    # Auto-detect PR, review all languages
/review-translations --pr=16979         # Review specific PR's changed files
/review-translations --scope=full       # Review ALL files for languages in PR
```

### Mode 2: Filtered PR Review
Reviews only specific language(s) from a PR.
```
/review-translations --language=hi              # Filter auto-detected PR to Hindi only
/review-translations --pr=16979 --language=hi   # Review only Hindi files from PR #16979
/review-translations --pr=16979 --language=hi,bn --scope=full  # All Hindi+Bengali files
```

### Mode 3: Standalone Language Review
Reviews all files for a language when no PR context is available.
```
/review-translations --language=es      # On dev branch: review all Spanish files
```

## Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--pr=NUMBER` | Specific PR to review | auto-detect from `i18n*` branch |
| `--scope=pr\|full` | `pr` = only PR changed files, `full` = all files for languages | `pr` |
| `--language=CODES` | Filter to specific language(s), comma-separated | all languages in PR |
| `--model=MODEL` | Model for analysis: `opus` (deep), `sonnet` (balanced), `haiku` (fast) | `opus` |
| `--sample=N` | Limit to N files per language (0=all) | 0 |

## Phase 0: Determine Mode and Scope

### Parse Flags

Extract from $ARGUMENTS:
- `PR_NUMBER`: from `--pr=NUMBER` or auto-detect
- `LANGUAGE_FILTER`: from `--language=CODES` (comma-separated) or empty
- `SCOPE`: from `--scope=pr|full` (default: `pr`)

### Determine Mode

1. **Attempt PR Detection**
   - If `--pr=NUMBER` provided → use that PR
   - Otherwise, check if branch starts with `i18n`:
     ```bash
     BRANCH=$(git branch --show-current)
     if [[ "$BRANCH" == i18n* ]]; then
       PR_NUMBER=$(gh pr view --json number -q .number 2>/dev/null)
     fi
     ```

2. **Route to Mode**
   - If `PR_NUMBER` found → continue to **PR Mode Setup**
   - If no `PR_NUMBER`:
     - If `--language` provided → continue to **Standalone Mode Setup**
     - Otherwise → error: "No PR detected. Use --pr=NUMBER or --language=CODE"

### PR Mode Setup (Mode 1 & 2)

3. **Determine Languages**
   - If `--language=CODES` provided: Use those as filter (Mode 2)
   - Otherwise: Extract all languages from PR (Mode 1)

   To extract languages from PR:
   ```bash
   gh api repos/{owner}/{repo}/pulls/{PR}/files --paginate -q '.[].filename' | \
     grep -E "(translations/[a-z]{2}(-[A-Z]{2})?/|intl/[a-z]{2}(-[A-Z]{2})?/)" | \
     sed 's|.*translations/||;s|.*intl/||' | cut -d'/' -f1 | sort -u
   ```

4. **Determine File Scope**
   - If `--scope=full`: Review ALL files for the determined languages
   - If `--scope=pr` (default): Review ONLY files changed in the PR

   For `--scope=pr`, get the specific file list:
   ```bash
   gh api repos/{owner}/{repo}/pulls/{PR}/files --paginate -q '.[].filename' | \
     grep -E "(translations/|intl/)" | \
     grep -E "/(${LANGUAGES_REGEX})/"  # If language filter applied
   ```

5. **Report**:
   - Mode 1: "Reviewing {N} files in PR #{NUMBER} ({LANGUAGES})"
   - Mode 2: "Reviewing {N} {LANGUAGE} files in PR #{NUMBER}"

### Standalone Mode Setup (Mode 3)

3. **Set Languages** from `--language=CODES`

4. **Set Scope** to `full` (review all files for those languages on `dev` branch)

5. **Report**: "Reviewing all {LANGUAGE} files on dev branch"

## Phase 1: Deploy Review Agents

For EACH detected language, spawn a dedicated Task agent in parallel.

Use a SINGLE message with MULTIPLE Task tool calls to achieve parallelism:

```
Task(subagent_type="general-purpose", description="Review LANG translations", prompt="...")
Task(subagent_type="general-purpose", description="Review LANG2 translations", prompt="...")
...
```

### Agent Prompt Template

For each language agent, provide this prompt:

```
Review translation quality for {LANGUAGE_CODE} files.

## Scope
{SCOPE_INSTRUCTION}

## Files to Review
{LIST_OF_FILES_FOR_THIS_LANGUAGE}

## Review Methodology

**IMPORTANT: Reading Files from the PR Branch**
Do NOT checkout the PR branch directly - this will cause detached HEAD issues. Instead:
1. Create a worktree for the PR branch:
   ```bash
   PR_BRANCH=$(gh pr view {PR_NUMBER} --json headRefName -q .headRefName)
   git worktree add .worktrees/pr-{PR_NUMBER} $PR_BRANCH
   ```
2. Read translation files from the worktree path: `.worktrees/pr-{PR_NUMBER}/public/content/translations/...`
3. Read English source files from the worktree: `.worktrees/pr-{PR_NUMBER}/public/content/...`

This keeps your current branch clean while allowing full access to PR content.

**For PR scope (`--scope=pr`):**
- Use `gh api repos/{owner}/{repo}/pulls/{PR}/files` to get the actual diff
- Focus on NEW or CHANGED content in the PR (not pre-existing content)
- Issues in unchanged lines are out of scope for this review
- Read both translation AND English source files from the worktree at `.worktrees/pr-{PR_NUMBER}/`

**For full scope (`--scope=full` or `--language`):**
- Review the entire current content of each file
- Compare against English source files from the worktree:
  - Markdown: `.worktrees/pr-{PR_NUMBER}/public/content/` (English originals)
  - JSON: `.worktrees/pr-{PR_NUMBER}/src/intl/en/` (English namespace files)

## Review Checklist

### 1. Brand Names (CRITICAL - Must Fix)
These MUST remain in English - flag ANY translation:
- Programming languages: Solidity, Vyper, Rust, JavaScript, TypeScript, Python
- Companies/Products: Alchemy, Infura, MetaMask, Consensys, Chainlink, OpenZeppelin
- Protocols: Uniswap, Aave, Compound, MakerDAO
- Core terms: Ethereum, Bitcoin, Web3

For each file, search for these terms and verify they appear exactly as listed.

### 2. Technical Terms (HIGH - Should Review)
These should use accepted local term OR remain English:
- Rollups, Layer 2/L2, Mainnet, Testnet, Sidechain, Beacon Chain
- Gas, Wei, Gwei, ETH (NEVER translate units)
- Staking, Slashing, Attestation, Validator
- Smart Contract, DApp, DeFi, NFT

### 3. Tone/Register Consistency (MEDIUM)
Check if formal/informal address is consistent throughout:
- German: du vs. Sie
- French: tu vs. vous
- Japanese: casual vs. polite forms
- Spanish: tú vs. usted
- Other languages: appropriate formal/informal consistency

### 4. Structural Issues
Review any sanitizer warnings for this language:
- Ambiguous href mismatches (multiple broken links in same paragraph)
- Block count differences from English
- Header structure anomalies

### 5. Semantic Accuracy
Spot-check translations for meaning preservation:
- Does the translation convey the same meaning as English?
- Any significant drift or mistranslation?

## Output Format

Return a structured report:

\`\`\`
## {LANGUAGE_CODE} Review Results

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

## Phase 2: Collect Results

Wait for all language agents to complete.

Aggregate results into a combined report:

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

## Phase 3: Present Results and Prompt User

Use AskUserQuestion to present options:

**Question:** "Review complete. Found X critical issues, Y warnings across N languages."

**Options:**
1. **Post scores to PR** - Post quality scores as a comment on the PR
2. **Apply fixes** - Review and apply suggested brand name fixes with confirmation
3. **Export report** - Save to `translation-review-{PR_NUMBER}.md`
4. **Done** - End review session

### If "Post scores to PR" selected:

Generate a comment with all language scores and post it:

```bash
gh pr comment {PR_NUMBER} --body "$(cat <<'EOF'
## 🌐 Translation Quality Review

| Language | Files | Quality Score | Issues |
|----------|-------|---------------|--------|
| {LANG} | {N} | {SCORE}/10 | {CRITICAL} critical, {WARNINGS} warnings |
...

<details>
<summary>📊 Detailed Scores: {LANGUAGE_CODE}</summary>

| Category | Score |
|----------|-------|
| Brand Name Preservation | X/10 |
| Technical Accuracy | X/10 |
| Semantic Fidelity | X/10 |
| Terminology Consistency | X/10 |
| Tone/Register | X/10 |

**Overall: X.X/10**

{SUMMARY}

</details>

(Repeat details block for each language)

---
*Reviewed by Claude Code*
EOF
)"
```

### If "Apply fixes" selected:

**Worktree Isolation Check:**
Before applying any fixes, verify we're on the correct branch:

```bash
CURRENT_BRANCH=$(git branch --show-current)
PR_BRANCH=$(gh pr view $PR_NUMBER --json headRefName -q .headRefName)
```

If `$CURRENT_BRANCH != $PR_BRANCH`:
1. Inform user: "Current branch '{CURRENT}' differs from PR branch '{PR_BRANCH}'"
2. Offer to create a worktree:
   ```bash
   git worktree add .worktrees/pr-$PR_NUMBER $PR_BRANCH
   ```
3. Apply fixes in the worktree, not the current directory
4. Report: "Fixes applied in worktree at .worktrees/pr-$PR_NUMBER"

**Apply Fixes:**
For each critical issue (brand name translations):
1. Show the file, line, current value, and expected value
2. Ask: "Fix this? (Yes/No/Skip all remaining)"
3. If yes, use Edit tool to replace the translated term with the English original
4. Track all changes made

After fixes applied, offer to commit changes with message:
`fix(i18n): correct brand name translations in {LANGUAGES}`

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

- This command runs AFTER the sanitizer (`post_import_sanitize.ts`) has processed files
- Sanitizer handles deterministic fixes; this handles judgment calls
- Large PRs (5+ languages) may take several minutes with Opus
- Use `--model=sonnet` or `--model=haiku` for faster reviews
