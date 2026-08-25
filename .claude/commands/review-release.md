---
description: Review a release/deploy PR by checking key changes on its deploy preview with a browser
allowed-tools: Bash, Read, Glob, Grep, Agent, Skill
argument-hints: [<pr-number>] [--post-comment]
---

# Review Release

Review a release/deploy PR by fetching its description, identifying the most important changes, and verifying them on the PR's deploy preview using the browser.

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

### Step 3: Pick the Base URL

Verify changes against the PR's **deploy preview**, not `staging.ethereum.org`:

```bash
gh pr view <PR_NUMBER> --repo ethereum/ethereum-org-website --json statusCheckRollup \
  -q '[.statusCheckRollup[] | select(.context=="netlify/ethereumorg/deploy-preview") | .targetUrl] | first'
```

The preview is built from the PR's head commit and is guaranteed current. `staging.ethereum.org` is a separate Netlify branch deploy that finishes ~20–35 minutes **after** the PR is created, so right after CI goes green it usually still serves the *previous* release.

Because of that lag, **never conclude that "the staging deploy is stale"** — that has produced repeated false alarms. If content is missing on staging but present on the deploy preview, the branch deploy simply hasn't finished; at most add an informational note ("staging branch deploy still building — expected lag"). Only fall back to `staging.ethereum.org` as the check target if no deploy preview exists.

### Step 4: Browser Checks

Use `playwright-cli` (the `@playwright/cli` terminal client) via Bash to check each key page on the base URL from Step 3.

Workflow: `playwright-cli open` → `playwright-cli goto <url>` → `playwright-cli snapshot` (returns element refs like `e15`) → `playwright-cli click e15` / `playwright-cli fill e22 "text"`. Fall back to the `/agent-browser` skill only if `playwright-cli` is unavailable in the environment.

#### URL and fetch conventions

- Canonical English URLs have **no `/en/` prefix** — `/en/<path>` returns a 301 redirect to `/<path>`. Always use the un-prefixed form.
- When fetching page source with curl, always follow redirects and record the outcome: `curl -sL -w "%{http_code} %{url_effective}" <url>`. A grep against a non-followed response is grepping an empty redirect body.
- Zero grep matches means your fetch method is suspect **before** it means the content is missing. Re-check the final URL and status, then re-check the same URL on the deploy preview, before reporting content as absent.

1. **Open each page** — verify it loads without errors (no 404s, no blank pages)
2. **Take screenshots** — `playwright-cli screenshot` (files are saved under `.playwright-cli/`)
3. **Snapshot interactive elements** — verify navigation, buttons, and links are present
4. **Verify specific changes** — e.g., check JSON-LD in page source, confirm updated text/amounts, validate new layouts
5. **Check homepage** — always do a quick sanity check that the homepage loads

For each page, note:
- Whether it loads successfully
- Any visual issues or broken elements
- Whether the specific change from the PR is confirmed

### Step 5: Report Results

Present a summary table with:

| Page | Status | Notes |
|------|--------|-------|
| Page name | Pass/Fail | What was checked and confirmed |

Flag any issues found. If everything looks good, note that the deploy looks ready to ship.

### Step 6: Optionally Post as PR Comment

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
