---
description: Prepare a release - version bump, branch sync, release notes cleanup, and deploy PR
allowed-tools: Bash, Read, Write, AskUserQuestion
argument-hints: --dry-run|--major|--minor|--patch
---

# Prepare Release Command

Automates the ethereum.org deployment workflow using `src/scripts/prepare-release.sh` for deterministic operations and Claude for intelligent tasks (version suggestion, release note cleanup).

## Arguments

Details for $ARGUMENTS

- `--dry-run` - Show what would happen without making any changes to remote
- `--major` - Major release (breaking/stack changes)
- `--minor` - Minor release (new features, content, translations)
- `--patch` - Patch release (bug fixes, typos, small updates)
- _(no flag)_ - Analyze changes and suggest version type

**Dry-run mode**: If `--dry-run` is in `$ARGUMENTS`, pass it as the first argument to ALL script commands. This shows what would happen without pushing to remote or creating PRs.

## Execution Flow

### Step 1: Pre-flight Checks

First, check if `--dry-run` is in `$ARGUMENTS`. If so, set `DRY_RUN_FLAG="--dry-run"`, otherwise set it to empty string.

Run the script to verify environment and sync branches:

```bash
./src/scripts/prepare-release.sh $DRY_RUN_FLAG preflight
```

This handles: `gh` authenticated, create worktree if not on `dev`, clean working tree, back-merge `master` → `staging` → `dev`, pull latest.

**Note**: The script can run from any branch. If not on `dev`, it creates a worktree at `/tmp/claude/worktrees/ethereum-org-dev` and performs all operations there.

If this fails, stop and report the error.

### Step 2: Determine Version Type

**If flag provided** (`--major`, `--minor`, `--patch`):
Extract from `$ARGUMENTS` and proceed to Step 3.

**If no flag provided**:
1. Fetch draft release: `./src/scripts/prepare-release.sh fetch-draft`
2. Analyze the changes:
   - **Major**: Stack/framework changes, significant breaking updates (rare)
   - **Minor**: New features, new content pages, significant translations, new components
   - **Patch**: Bug fixes, typo corrections, small content updates, dependency bumps
3. Provide a ONE-LINE suggestion with reasoning
4. Use `AskUserQuestion` to confirm: "Proceed with **X** release?" with options: Yes / Change to major / Change to minor / Change to patch
5. Proceed only after confirmation

### Step 3: Version Bump

```bash
VERSION=$(./src/scripts/prepare-release.sh $DRY_RUN_FLAG version <type>)
```

### Step 4: Merge to Staging

```bash
./src/scripts/prepare-release.sh $DRY_RUN_FLAG merge-staging
```

### Step 5: Fetch Draft Release

```bash
DRAFT_JSON=$(./src/scripts/prepare-release.sh fetch-draft)
```

Parse the JSON to extract `tagName` (DRAFT_TAG) and `body`. If no draft exists, error out.

### Step 6: Clean Release Notes

The draft release body needs cleanup. Apply these filters:

**Remove from CHANGES sections** (lines matching these patterns):
- Author is `allcontributors` or `allcontributors[bot]` (these are just additions to our all-contributors list, not pertinent to actual changes)
- PR title contains "Release candidate v" (release management)
- PR title contains "Deploy v" (release management)
- PR title starts with "Staging -> dev" or "Staging -> Dev" (back-merge)
- PR title starts with "Master -> staging" or "Master -> Staging" (back-merge)
- PR title starts with "Back merge" (back-merge)
- PR title is just a version number like "v10.20.0" or "v11.0.0" (version bump commits)
- PR title starts with "Update translation contributors from Crowdin" (automated Crowdin)
- PR title starts with "Update translation progress from Crowdin" (automated Crowdin)

Note: Keep entries from other bots like `dependabot`, `claude[bot]`, `github-actions` - their PRs ARE meaningful changes (dependency updates, code changes, etc). We just don't thank them as human contributors.

**Remove from CONTRIBUTORS section** (the "Thank you @..." line):
These accounts should be filtered from the contributors list:
- `dependabot`
- `dependabot[bot]`
- `allcontributors`
- `allcontributors[bot]`
- `claude`
- `claude[bot]`
- `github-actions`
- `github-actions[bot]`
- `actions-user`

**Keep the structure intact**:
- Keep section headers (⚡️ Changes, 🌐 Translations, 🐛 Bug Fix, etc.)
- Keep the `***` separators
- Keep the 🦄 Contributors section (just filter the bot names from it)
- Remove empty sections if all entries were filtered out

Write cleaned body to temp file:
```bash
# Write the cleaned release notes to a temp file
cat << 'EOF' > /tmp/claude/release-notes.md
<cleaned_body>
EOF
```

### Step 7: Publish Release

```bash
RELEASE_URL=$(./src/scripts/prepare-release.sh $DRY_RUN_FLAG publish "$VERSION" "$DRAFT_TAG" /tmp/claude/release-notes.md)
```

### Step 8: Create Deploy PR

```bash
PR_URL=$(./src/scripts/prepare-release.sh $DRY_RUN_FLAG create-pr "$VERSION" /tmp/claude/release-notes.md)
```

### Step 9: Cleanup Worktree

If a worktree was created, clean it up:

```bash
./src/scripts/prepare-release.sh cleanup
```

### Step 10: Report Success

Output summary:
```
✅ Release prepared successfully!

Version: vX.X.X
Release: <release_url>
Deploy PR: <pr_url>

Next step: Review the preview build, then merge the PR when ready.
```

## Error Handling

- If any git operation fails, stop and report the error
- If `gh` commands fail, check authentication and permissions
- If no draft release exists, error with clear message
- If merge conflicts occur during back-merge, stop and instruct user to resolve manually

## Notes

- This command does NOT merge the deploy PR - that remains a manual step after QA
- The release can be edited after publishing if corrections are needed
- Always verify the cleaned release notes look correct before the PR is merged
