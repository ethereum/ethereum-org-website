---
name: Spike code-review skill
description: Throwaway spike - can the built-in /code-review skill review a PR inside gh-aw
on:
  pull_request:
    types: [opened, synchronize]
if: github.event.pull_request.head.ref == 'spike/code-review'
permissions:
  contents: read
  pull-requests: read
  issues: read
  actions: read
engine:
  id: claude
  model: claude-opus-5-5
max-ai-credits: 200
network: defaults
strict: true
timeout-minutes: 20
tools:
  github:
    toolsets: [default]
  bash: ["git:*", "ls", "cat", "grep", "head", "wc"]
safe-outputs:
  github-app:
    client-id: ${{ vars.ETHORG_AGENT_CLIENT_ID }}
    private-key: ${{ secrets.ETHORG_AGENT_PRIVATE_KEY }}
  add-comment:
    max: 1
  noop:
    report-as-issue: false
  report-failure-as-issue: false
pre-agent-steps:
  - name: Fetch the PR base as a local ref
    env:
      BASE_SHA: ${{ github.event.pull_request.base.sha }}
    run: |
      set -euo pipefail
      git fetch --no-tags "https://github.com/${GITHUB_REPOSITORY}.git" "$BASE_SHA"
      git branch -f pr-base "$BASE_SHA"
      git log --oneline pr-base..HEAD
---

This is a capability spike, not a normal review. The working tree is the PR (merged into its base); the PR's base commit is the local branch `pr-base`.

1. List the skills available to you. Report whether a skill named `code-review` exists.
2. If it exists, invoke it to review the changes between `pr-base` and the working tree's HEAD at **medium** effort (for example pass `pr-base` as the fixed point, or the PR number). Never run, build or install anything.
3. Post ONE comment with these sections:
   - **Skill available:** yes/no, and the exact skill name/description you saw
   - **Invocation:** the exact argument you passed, and whether it worked first try
   - **Findings:** what the skill reported, verbatim if short (file:line, severity, summary)
   - **Friction:** anything that failed or needed a workaround (missing tools, subagents unavailable, ReportFindings not available, git errors), quoting error text

If the skill is not available, say so, then review the diff yourself and report findings in the same format so the run is still comparable.
