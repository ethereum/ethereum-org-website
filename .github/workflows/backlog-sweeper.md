---
name: PR Backlog Sweeper
description: Daily sweep of the open PR backlog — first-pass reviews for unreviewed and updated PRs
on:
  schedule: daily around 06:00 on weekdays
  workflow_dispatch:
permissions:
  contents: read
  issues: read
  pull-requests: read
  actions: read
engine:
  id: claude
  model: claude-opus-5-5
max-ai-credits: 800
network: defaults
strict: true
timeout-minutes: 20
tools:
  github:
    toolsets: [default, actions]
safe-outputs:
  github-app:
    client-id: ${{ vars.ETHORG_AGENT_CLIENT_ID }}
    private-key: ${{ secrets.ETHORG_AGENT_PRIVATE_KEY }}
  add-comment:
    max: 5
    hide-older-comments:
      match: [pr-reviewer]
  add-labels:
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
    run: bash .github/scripts/backlog-sweeper-queue.sh
imports:
  - shared/pr-review-core.md
---

You are sweeping the open pull request backlog of ${{ github.repository }}.

## Selection

The PRs to review are already chosen: `/tmp/gh-aw/agent/candidates.json` lists their numbers. Review exactly those and no others. If the list is empty, call `noop` with "no eligible PRs" and stop. Otherwise every listed PR gets a review comment — never `noop` a listed PR, or it is re-selected on every run.

## For each selected PR

Produce a first-pass review comment following the core instructions below (lane classification, verdict-first format, labels). For PR `<n>`, the pre-fetched files are `/tmp/gh-aw/agent/pr-<n>/pr-meta.json` and `/tmp/gh-aw/agent/pr-<n>/pr-diff.patch` — use them in place of the paths named in Step 1.

## Termination

Every run MUST end with at least one safe-output call.
