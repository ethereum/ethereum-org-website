---
name: PR Backlog Sweeper
description: Daily sweep of the open PR backlog — first-pass reviews for PRs never reviewed, or one PR on a `/review` comment
on:
  schedule: daily around 06:00 on weekdays
  workflow_dispatch:
    inputs:
      pr:
        description: "Review only this PR number, like a /review comment (empty = normal backlog sweep)"
        required: false
        type: string
  slash_command:
    name: review
    events: [pull_request_comment]
if: github.event.action != 'edited'
concurrency:
  group: "gh-aw-${{ github.workflow }}"
  queue: max
permissions:
  contents: read
  issues: read
  pull-requests: read
  actions: read
checkout:
  fetch-depth: 0
engine:
  id: claude
  model: claude-opus-5-5
max-ai-credits: 1000
network: defaults
strict: true
timeout-minutes: 45
tools:
  github:
    toolsets: [default, actions]
  bash: ["git diff:*", "git show:*", "git log:*", "git merge-base:*", "git rev-parse:*", "git ls-files:*", "ls", "cat", "grep", "head", "wc"]
safe-outputs:
  github-app:
    client-id: ${{ vars.ETHORG_AGENT_CLIENT_ID }}
    private-key: ${{ secrets.ETHORG_AGENT_PRIVATE_KEY }}
  add-labels:
    target: "*"
    max: 15
    allowed:
      - "needs review 👀"
      - "needs dev approval 🧑‍💻"
      - "needs design approval 🧑‍🎨"
      - "needs product review 🕵️"
      - "needs technical content review 🧑‍🏫"
      - "content 🖋️"
      - "translation 🌍"
      - "documentation 📖"
      - "dependencies 📦"
      - "tooling 🔧"
      - "config ⚙️"
  remove-labels:
    target: "*"
    max: 5
    allowed:
      - "content 🖋️"
      - "translation 🌍"
      - "documentation 📖"
      - "dependencies 📦"
      - "tooling 🔧"
      - "config ⚙️"
  noop:
    report-as-issue: false
  report-failure-as-issue: false
  threat-detection:
    engine:
      id: claude
      model: claude-sonnet-5-5
pre-agent-steps:
  - name: Select PRs and pre-fetch their diffs
    env:
      GH_TOKEN: ${{ github.token }}
      REPO: ${{ github.repository }}
      PR_NUMBER: ${{ github.event.issue.number || inputs.pr }}
    run: bash .github/scripts/backlog-sweeper-queue.sh
  # gh-aw checks out the PR head on comment events; the review diffs from the base branch.
  - name: Return to the base branch on single-PR runs
    if: github.event_name == 'issue_comment' || inputs.pr != ''
    env:
      PR_NUMBER: ${{ github.event.issue.number || inputs.pr }}
    run: |
      meta=/tmp/gh-aw/agent/pr-$PR_NUMBER/pr-meta.json
      [ -f "$meta" ] || exit 0
      git fetch -q --no-tags origin "$(jq -r .baseRefName "$meta")"
      git checkout -q -f --detach FETCH_HEAD
imports:
  - shared/pr-review-core.md
  - shared/submit-review.md
---

You are sweeping the open pull request backlog of ${{ github.repository }}.

## Selection

The PRs to review are already chosen: `/tmp/gh-aw/agent/candidates.json` lists their numbers. Review exactly those and no others. If the list is empty, call `noop` with "no eligible PRs" and stop. A run started by a `/review` comment, or dispatched with a `pr` input, lists only that PR; review it in full even if it was reviewed before. Otherwise every listed PR gets a review — never `noop` a listed PR, or it is re-selected on every run.

## For each selected PR

Review it following the core instructions below and call `submit_review` once for it, with its own `pr` and `sha`. For PR `<n>`, the pre-fetched metadata is `/tmp/gh-aw/agent/pr-<n>/pr-meta.json`, and its head is the local branch `pr-<n>-head` — use them in place of the paths and the `pr-head` branch named in the core instructions.

## Termination

Every run MUST end with at least one safe-output call.
