---
description: Review translation imports for quality issues (full pipeline)
allowed-tools: Bash(git *), Bash(pnpm *), Bash(npx tsx *), Bash(gh *), Bash(cp *), Bash(pwd), Bash(ls *), Bash(test *), Read, Glob, Grep, Task, Edit, Write, AskUserQuestion
argument-hint: [--pr=NUMBER] [--language=CODE] [--model=opus|sonnet|haiku (opus)] [--full] [--no-fix] [--build-local] [--netlify-check]
---

# Translation Review Command

Full pipeline for reviewing translation imports: worktree setup, AI review, auto-fix, build verification, and scoring.

## Context

- Current branch: !`git branch --show-current`
- Arguments: $ARGUMENTS

## Modes of Operation

```
/review-translations                    # Mode 1 (default): open PR for intl/pending-dev, all languages
/review-translations --language=hi      # Mode 1, filtered to Hindi only
/review-translations --pr=18040         # Mode 2: specific PR (e.g. intl/pending-feat-foo)
/review-translations --language=es      # Mode 3: standalone, no PR — all Spanish files on dev
```

## Flags

| Flag               | Description                                                            | Default                           |
| ------------------ | ---------------------------------------------------------------------- | --------------------------------- |
| `--pr=NUMBER`      | Specific PR to review                                                  | open PR for `intl/pending-dev`    |
| `--language=CODES` | Filter to specific language(s), comma-separated                        | all languages in PR               |
| `--model=MODEL`    | Model for analysis: `opus` (deep), `sonnet` (balanced), `haiku` (fast) | `opus`                            |
| `--full`           | Re-review the entire PR diff, ignoring any prior review SHA            | absent (incremental)              |
| `--no-fix`         | Skip auto-fixing critical issues; only present findings                | absent (fixes applied by default) |
| `--build-local`    | Run a local scoped build to verify no MDX compilation errors           | absent (skipped by default)       |
| `--netlify-check`  | Check Netlify deploy preview for build failures                        | absent (skipped by default)       |

## Phase 0: Determine Mode and Scope

### Parse Flags

Parse the flags in the table above from $ARGUMENTS: `PR_NUMBER`, `LANGUAGE_FILTER` (comma-separated), and booleans `FULL_REVIEW`, `NO_FIX`, `BUILD_LOCAL`, `NETLIFY_CHECK`.

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

## Phase 1: Worktree Setup

This phase prepares an isolated worktree with all dependencies and merges latest `dev`. The sanitizer already ran upstream in the intl-pipeline (before the `intl/pending-*` branch was created), so the review works on already-sanitized content.

**Sandbox permissions:** Bash command patterns are pre-approved in the `allowed-tools` frontmatter above — no user approval prompts needed. However, `gh` CLI commands **always** require `dangerouslyDisableSandbox: true` due to a TLS certificate verification bug in the Claude Code sandbox (the sandbox's TLS proxy breaks `gh`'s HTTPS connections to `api.github.com`). Git commands work fine in sandbox (SSH protocol). If `pnpm install` or `pnpm build` fail with network/filesystem sandbox errors, retry those specific commands with `dangerouslyDisableSandbox: true`.

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

**ETHGlossary** is the authoritative source for Ethereum term translations — deviations are critical issues, not warnings (used in Phase 3 review, Phase 5 auto-fix, Phase 8 logging). Full usage guidance: `.claude/skills/intl-review/references/ethglossary-usage.md`.

Resolve the base URL (env var wins; default in `src/scripts/intl-pipeline/config.ts`), then fetch `llms.txt` as the canonical endpoint reference (if examples below disagree, llms.txt wins):

```bash
GLOSSARY_API_URL="${GLOSSARY_API_URL:-$(grep -oE 'https://[^"]+/api/v[0-9]+' "$WORKTREE_PATH/src/scripts/intl-pipeline/config.ts" | head -1)}"
GLOSSARY_HOST="${GLOSSARY_API_URL%/api/*}"
curl -sf "$GLOSSARY_HOST/llms.txt" -o "$TMPDIR/ethglossary-llms.txt"
```

**Preferred — per-file filter** (returns only the terms appearing in the English source; avoids pulling hundreds of irrelevant terms into agent context):

```bash
ENGLISH_SOURCE=$(cat "$WORKTREE_PATH/public/content/{path}.md")
curl -sf -X POST "$GLOSSARY_API_URL/filter" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg content "$ENGLISH_SOURCE" --arg lang "{LANGUAGE_CODE}" '{content: $content, language: $lang}')"
```

**Fallback — full language** when per-file filtering is impractical or the endpoint is unreachable:

```bash
curl -sf "$GLOSSARY_API_URL/translations/{LANGUAGE_CODE}"
```

### Per-Language Prior Findings

Check if `.claude/translation-review/per-language/{LANGUAGE_CODE}.md` exists. If so, read it and inject relevant prior findings into the agent prompt.

## Phase 3: Deploy Review Agents

For EACH detected language, deploy **multiple specialized sub-agents in parallel**.

Use a SINGLE message with MULTIPLE Task tool calls to achieve parallelism. For each language, deploy these agents:

### Sub-Agent Architecture

Each language gets up to 3 specialized agents — **structural** (MDX syntax, hrefs, markdown structure, code blocks), **terminology** (brand names, glossary compliance, tickers), **semantic** (accuracy, tone/register, untranslated content). Role definitions and the split/skip decision table: `.claude/skills/intl-review/references/agent-roles.md`. Split the file list into chunks of ~25 files per agent to stay within context limits; for small languages (< 25 files), combine the roles into a single agent.

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

Before reviewing, read these files from the worktree — they define your checklist:

1. {WORKTREE_PATH}/.claude/skills/intl-review/references/agent-roles.md — your role's section ({AGENT_ROLE}) defines what you own and what you leave to the other roles.
2. {WORKTREE_PATH}/.claude/skills/intl-review/references/known-patterns.md — the pattern catalog (build-breaking MDX, navigation-breaking hrefs, semantic inversions, tag and code-block policy).
3. {WORKTREE_PATH}/.claude/skills/intl-review/references/critical-vs-warning.md — severity classification for every finding.
4. If {LANGUAGE_CODE} is a non-Latin-script language: {WORKTREE_PATH}/.claude/skills/intl-review/references/language-rules.md — your language group's rules.

Apply your role's checklist to every file in your chunk. Findings outside your role are still worth reporting (aggregation dedupes), but your role's checklist is the priority.

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

Rate ONLY translation quality (not import artifacts like duplications, stray characters, or encoding issues). Use the 5-category rubric and report block defined in {WORKTREE_PATH}/.claude/skills/intl-review/references/scoring-rubric.md (Brand Name Preservation, Technical Accuracy, Semantic Fidelity, Terminology Consistency, Tone/Register — each X/10 with notes, plus the overall average and a 1-2 sentence summary).
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
| -------- | ----- | -------- | -------- | ------------- |
| ar       | 52    | 3        | 7        | 8.5/10        |
| de       | 64    | 1        | 4        | 9.0/10        |

...

## Quality Scores by Language

{Per language: the scoring report block from `references/scoring-rubric.md` — 5-category table, overall average, 1-2 sentence summary}

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

Stage the review fixes:

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
3. **Prepare commit message** — Generate commit message for all staged review fixes
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

| Language | Files | Quality Score | Issues                                   |
| -------- | ----- | ------------- | ---------------------------------------- |
| {LANG}   | {N}   | {SCORE}/10    | {CRITICAL} critical, {WARNINGS} warnings |

...

<details>
<summary>Detailed Scores: {LANGUAGE_CODE} ({OVERALL_SCORE}/10)</summary>

{The scoring report block from `references/scoring-rubric.md` for this language}

</details>

(Repeat details block for each language)

<details>
<summary>Issues Found & Fixed ({N} total)</summary>

| File | Issue | Details |
| ---- | ----- | ------- |
| ...  | ...   | ...     |

</details>

---

_Reviewed by Claude Code_
```

### If "Prepare commit message" selected:

Generate commit message based on all staged changes:

```
fix(i18n): review {LANGUAGE_CODE} translations

Review fixes: {REVIEW_SUMMARY}

Co-Authored-By: Claude <noreply@anthropic.com>
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

**If any issues were found and fixed (critical or warning), run the `compound-engineering:workflows:compound` skill (compound-engineering plugin, if installed) to document the findings.** This captures what was learned during this review for future reference.

If the review found zero issues requiring fixes, skip this step.

### Worktree Cleanup

Ask the user whether to keep or remove the worktree:

**Question:** "Keep the worktree at {WORKTREE_PATH}?"

**Options:**

1. **Keep** — Leave worktree in place for further work
2. **Remove** — Clean up with `git worktree remove {WORKTREE_PATH}`

## Notes

- The review agents in Phase 3 handle judgment calls the sanitizer (which already ran upstream) cannot: semantic accuracy, tone/register, glossary compliance, context-dependent quality. Policy details (tags, code comments, brand names) live in the reference files the agents read — never reason about brand names from memory; the glossary lookup decides.
- Large PRs (5+ languages) may take several minutes with Opus; use `--model=sonnet` or `--model=haiku` for faster reviews.
- Knowledge base at `.claude/translation-review/` accumulates findings across reviews (committed to repo).
