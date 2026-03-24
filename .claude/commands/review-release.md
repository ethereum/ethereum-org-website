---
name: review-release
description: Review a release PR by checking the staging deploy for key changes
argument-hint: "[PR number]"
---

# Review Release

Review a release/deploy PR by fetching its description, identifying the most important changes, and verifying them on the staging deploy using the browser.

## Workflow

### Step 1: Fetch PR Details

Use `gh pr view $ARGUMENTS --repo ethereum/ethereum-org-website --json title,body,labels` to get the PR description and identify the list of changes.

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

Flag any issues found. If everything looks good, confirm the deploy is ready to ship.

### Step 5: Submit Review

After presenting results, ask the user if they want to submit a review on the PR. Offer two options:

1. **Approve** — if all checks passed
2. **Request changes** — if issues were found

Ask the user which action to take (or skip). If they choose to submit, post the summary table as the review body using:

```bash
gh pr review <PR_NUMBER> --repo ethereum/ethereum-org-website --approve --body "..."
# or
gh pr review <PR_NUMBER> --repo ethereum/ethereum-org-website --request-changes --body "..."
```

Do NOT submit a review without explicit user confirmation.

## Tips

- If a page returns 404, try finding the correct URL by navigating from a parent page
- For SEO changes, extract page body text and grep for JSON-LD or specific metadata
- For text/amount changes, use `grep` on the page body text to confirm exact values
- Close the browser session when done
