---
description: Review a release/deploy PR by checking key changes on staging with a browser
allowed-tools: Bash, Read, Glob, Grep, Agent, Skill
argument-hints: [<pr-number>] [--post-comment]
---

# Review Release

Review a release/deploy PR by fetching its description, identifying the most important changes, and verifying them on the staging deploy using the browser.

This command NEVER approves or requests changes on the PR. By default it only prints the summary in the terminal. Pass `--post-comment` to additionally post the summary as a comment on the PR (informational, not a review).

## Arguments

`$ARGUMENTS` may contain:
- A PR number to review. If omitted, auto-detect the latest deploy PR:
  ```bash
  gh pr list -B master -H staging -s open -S "Deploy" --json number -q ".[0].number" -L 1
  ```
- `--post-comment` flag. If present, after producing the summary, post it as a PR comment via `gh pr comment`. Without this flag, the summary is only printed to the terminal.

## Workflow

### Step 1: Fetch PR Details

If `$ARGUMENTS` is empty or blank, auto-detect the PR number using the command above. Then use `gh pr view <PR_NUMBER> --repo ethereum/ethereum-org-website --json title,body,labels` to get the PR description and identify the list of changes.

### Step 2: Identify Key Changes

From the PR description, identify the most impactful changes to verify. Prioritize:
- New or redesigned pages
- SEO/structured data changes
- UI/layout updates
- Bug fixes with visual impact
- Feature additions

Summarize the changes for the user before proceeding.

### Step 3: Browser Checks

Use the `/agent-browser` skill to check each key page on the staging deploy at:
`https://staging.ethereum.org/`

1. **Open each page** — verify it loads without errors (no 404s, no blank pages)
2. **Take screenshots** — save to `/tmp/screenshots/` for reference
3. **Snapshot interactive elements** — verify navigation, buttons, and links are present
4. **Verify specific changes** — e.g., check JSON-LD in page source, confirm updated text/amounts, validate new layouts
5. **Check homepage** — always do a quick sanity check that the homepage loads

For each page, note:
- Whether it loads successfully
- Any visual issues or broken elements
- Whether the specific change from the PR is confirmed

### Step 4: Report Results

Present a summary table with:

| Page | Status | Notes |
|------|--------|-------|
| Page name | Pass/Fail | What was checked and confirmed |

Flag any issues found. If everything looks good, note that the deploy looks ready to ship.

### Step 5: Optionally Post as PR Comment

If `--post-comment` was passed in `$ARGUMENTS`, post the summary table as a PR comment:

```bash
gh pr comment <PR_NUMBER> --repo ethereum/ethereum-org-website --body "$(cat <<'EOF'
## /review-release summary

<summary table here>

_Informational only — this is not a PR review. Approval and merge remain manual._
EOF
)"
```

If `--post-comment` is NOT present, do nothing further — the terminal output is the only artifact.

This command must NEVER call `gh pr review --approve` or `gh pr review --request-changes`. Approval and merge stay with humans.

## Tips

- If a page returns 404, try finding the correct URL by navigating from a parent page
- For SEO changes, extract page body text and grep for JSON-LD or specific metadata
- For text/amount changes, use `grep` on the page body text to confirm exact values
- Close the browser session when done
