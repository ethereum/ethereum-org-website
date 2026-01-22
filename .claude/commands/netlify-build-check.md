---
description: Check PR build status, analyze failures, and propose fixes
allowed-tools: Bash, Read, Glob, Grep, Task, AskUserQuestion, WebFetch
argument-hint: [--pr=NUMBER (auto)]
---

# Netlify Build Check Command

Check CI/CD build status for a PR, analyze any failures, and propose fixes.

## Context
- Current branch: !`git branch --show-current`
- Arguments: $ARGUMENTS

## Phase 1: Identify PR and Repo

### Get Repo Info
```bash
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
# Returns: owner/repo (e.g., ethereum/ethereum-org-website)
```

### Parse Arguments
Extract `PR_NUMBER` from `--pr=NUMBER` or auto-detect:

```bash
if [[ -z "$PR_NUMBER" ]]; then
  PR_NUMBER=$(gh pr view --json number -q .number 2>/dev/null)
fi
```

If no PR found, error: "No PR detected. Use --pr=NUMBER or run from a PR branch."

Report: "Checking build status for PR #{PR_NUMBER}"

## Phase 2: Check Netlify Build Status

Get the Netlify deploy preview check for the PR:

```bash
gh pr checks $PR_NUMBER --json name,state,link -q '.[] | select(.name | test("netlify"; "i"))'
```

The Netlify check is typically named `netlify/ethereumorg/deploy-preview`.

### Determine Status

Parse the Netlify check result:
- **Passed** → Report "Netlify build passed" and exit
- **Pending** → Report that build is still running, ask if user wants to wait or proceed
- **Failure** → Continue to Phase 3

Report status:
```
Netlify Build Status: FAILURE
Check: netlify/ethereumorg/deploy-preview
Details: https://app.netlify.com/...
```

## Phase 3: Fetch Netlify Build Logs

### Option A: Check Details URL (Primary)

Use the `link` from the Netlify check to fetch logs:

```bash
DETAILS_URL=$(gh pr checks $PR_NUMBER --json name,state,link -q '.[] | select(.name | test("netlify"; "i")) | .link')
```

Then use WebFetch with the details URL to extract error information from the Netlify deploy logs.

### Option B: Netlify Bot Comment (Fallback)

Netlify posts deploy status as PR comments. Fetch them:

```bash
gh pr view $PR_NUMBER --json comments -q '.comments[].body' | \
  grep -i -A 100 "netlify"
```

The Netlify bot comment typically includes:
- Deploy preview URL
- Build status summary
- Link to full deploy logs

If the comment contains a deploy log URL (e.g., `https://app.netlify.com/sites/.../deploys/...`), use WebFetch to retrieve the build output.

## Phase 4: Analyze Errors

Parse the build logs to identify error types.

### Common Error Patterns

**TypeScript Errors:**
```
error TS\d+: .+
Type '.+' is not assignable to type '.+'
Property '.+' does not exist on type '.+'
Cannot find name '.+'
```

**ESLint Errors:**
```
\d+:\d+\s+error\s+.+eslint
```

**Next.js Build Errors:**
```
Error: .+ in .+
Failed to compile
Build optimization failed
Module not found: Can't resolve
```

**Import/Export Errors:**
```
Cannot find module '.+'
Module not found
Export '.+' was not found in '.+'
```

**Translation/i18n Errors (common in translation PRs):**
```
SyntaxError: .+ in JSON
Unexpected token
Missing required key
Invalid message format
```

**MDX/Markdown Errors:**
```
Error compiling MDX
Could not parse expression
Unexpected end of file
```

For each error found, extract:
- File path
- Line number (if available)
- Error message
- Error type/category

## Phase 5: Propose Fixes

For each identified error, read the relevant file from the PR branch and propose a fix.

### Reading Files from PR Branch

Use a worktree to access PR files without switching branches:

```bash
PR_BRANCH=$(gh pr view $PR_NUMBER --json headRefName -q .headRefName)
WORKTREE_PATH=.worktrees/pr-$PR_NUMBER

# Create worktree if it doesn't exist
if [[ ! -d "$WORKTREE_PATH" ]]; then
  git worktree add "$WORKTREE_PATH" "$PR_BRANCH"
fi
```

Then read files from `$WORKTREE_PATH/{file_path}`.

### Fix Proposal Format

Present fixes in this format:

```markdown
## Build Error Analysis

**PR:** #{PR_NUMBER}
**Failed Check:** {CHECK_NAME}
**Errors Found:** {COUNT}

---

### Error 1: {ERROR_TYPE}

**File:** `{FILE_PATH}:{LINE_NUMBER}`
**Message:** {ERROR_MESSAGE}

**Current code:**
```{lang}
{CURRENT_CODE_SNIPPET}
```

**Proposed fix:**
```{lang}
{FIXED_CODE_SNIPPET}
```

**Explanation:** {WHY_THIS_FIXES_IT}

---

(Repeat for each error)
```

### Error Categories & Fix Strategies

**TypeScript type errors:**
- Read the file and surrounding context
- Check type definitions in the codebase (`src/lib/types.ts`, etc.)
- Propose type corrections or proper type assertions

**Missing imports:**
- Search codebase for the export using Grep
- Propose correct import path

**Invalid JSON (common in translations):**
- Read the JSON file
- Identify syntax errors (trailing commas, missing quotes, unescaped characters)
- Propose corrected JSON

**Module not found:**
- Check if file exists at expected path
- Suggest correct path or check if dependency needs installing

**MDX compilation errors:**
- Check for malformed JSX, unclosed tags, or invalid expressions
- Propose syntax corrections

## Phase 6: Present Results

After analyzing errors, use AskUserQuestion to present options:

**Question:** "Found {N} build errors with proposed fixes. What would you like to do?"

**Options:**
1. **Show all fixes** - Display detailed fix proposals for review
2. **Focus on first error** - Work through errors one at a time with full context
3. **Export report** - Save analysis to `build-errors-{PR_NUMBER}.md`
4. **Done** - End session (apply fixes manually or ask Claude separately)

## Notes

- This command analyzes and proposes fixes but does NOT auto-apply them
- For translation PRs, run this before `/review-translations` if build is failing
- Some build errors may require additional context beyond the logs
- Netlify deploy previews include build logs in PR comments - check there first
- If worktree already exists, reuse it; clean up with `git worktree remove` when done