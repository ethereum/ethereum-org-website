---
name: PR Reviewer (team)
description: Lane-aware, verdict-first first-pass review of same-repo pull requests
on:
  pull_request:
    types: [opened, ready_for_review]
    draft: false
  skip-bots:
    - allcontributors[bot]
    - github-actions[bot]
    - dependabot[bot]
if: github.event.pull_request.head.repo.full_name == github.repository
permissions:
  contents: read
  issues: read
  pull-requests: read
  actions: read
engine:
  id: claude
network: defaults
strict: true
timeout-minutes: 10
tools:
  github:
    toolsets: [default, actions]
safe-outputs:
  add-comment:
    max: 1
    hide-older-comments: true
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
  noop:
  report-failure-as-issue: false
pre-agent-steps:
  - name: Pre-fetch PR diff and metadata
    env:
      GH_TOKEN: ${{ github.token }}
      PR_NUMBER: ${{ github.event.pull_request.number }}
      REPO: ${{ github.repository }}
    run: |
      set -euo pipefail
      mkdir -p /tmp/gh-aw/agent
      { gh pr diff "$PR_NUMBER" --repo "$REPO" || true; } | head -n 3000 > /tmp/gh-aw/agent/pr-diff.patch
      gh pr view "$PR_NUMBER" --repo "$REPO" \
        --json number,title,body,author,isDraft,baseRefName,headRefName,additions,deletions,changedFiles,files,labels \
        > /tmp/gh-aw/agent/pr-meta.json
imports:
  - shared/pr-review-core.md
---

Review pull request #${{ github.event.pull_request.number }} in ${{ github.repository }} following the core instructions below.

This run handles same-repo (team) pull requests. Team authors know the codebase — skip the pleasantries you would give a first-time contributor, keep the verdict and findings tight, and hold code to full convention depth.
