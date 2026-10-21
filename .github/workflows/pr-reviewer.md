---
name: PR Reviewer (team)
description: Lane-aware, findings-only first-pass review of pull requests, including forks
on:
  pull_request_target:
    types: [opened, ready_for_review]
  roles: all
  skip-bots:
    - allcontributors[bot]
    - github-actions[bot]
    - dependabot[bot]
if: >-
  !github.event.pull_request.draft &&
  (github.event.pull_request.head.repo.full_name != github.repository || (
    github.event.pull_request.head.ref != 'staging' &&
    github.event.pull_request.head.ref != 'dev' &&
    !startsWith(github.event.pull_request.head.ref, 'intl/') &&
    !startsWith(github.event.pull_request.head.ref, 'automated')))
permissions:
  contents: read
  issues: read
  pull-requests: read
  actions: read
# PR code is only fetched as the `pr-head` ref, never checked out or run.
checkout:
  repository: ${{ github.repository }}
  ref: ${{ github.event.pull_request.base.sha }}
  fetch-depth: 0
engine:
  id: claude
  model: claude-opus-5-5
max-ai-credits: 300
max-daily-ai-credits: 3000
network: defaults
strict: true
timeout-minutes: 20
tools:
  github:
    toolsets: [default, actions]
  bash: ["git diff:*", "git show:*", "git log:*", "git merge-base:*", "git rev-parse:*", "git ls-files:*", "ls", "cat", "grep", "head", "wc"]
safe-outputs:
  github-app:
    client-id: ${{ vars.ETHORG_AGENT_CLIENT_ID }}
    private-key: ${{ secrets.ETHORG_AGENT_PRIVATE_KEY }}
  add-labels:
    max: 3
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
    max: 2
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
  - name: Fetch PR head and metadata
    env:
      GH_TOKEN: ${{ github.token }}
      PR_NUMBER: ${{ github.event.pull_request.number }}
      REPO: ${{ github.repository }}
    run: |
      set -euo pipefail
      mkdir -p /tmp/gh-aw/agent
      gh pr view "$PR_NUMBER" --repo "$REPO" \
        --json number,title,body,author,isDraft,baseRefName,headRefName,headRefOid,mergeStateStatus,additions,deletions,changedFiles,labels \
        > /tmp/gh-aw/agent/pr-meta.json
      git fetch --no-tags origin "pull/$PR_NUMBER/head:pr-head"
imports:
  - shared/pr-review-core.md
  - shared/submit-review.md
---

Review pull request #${{ github.event.pull_request.number }} in ${{ github.repository }} following the core instructions below.
