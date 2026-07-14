---
name: PR Backlog Sweeper
description: Daily sweep of the open PR backlog — first-pass reviews for unreviewed PRs and evidence-based close recommendations
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
network: defaults
strict: true
timeout-minutes: 15
tools:
  github:
    toolsets: [default, actions]
safe-outputs:
  add-comment:
    max: 5
  add-labels:
    max: 15
    allowed:
      - "recommend close"
      - "Status: Stale"
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
  report-failure-as-issue: false
pre-agent-steps:
  - name: Pre-fetch open PR queue
    env:
      GH_TOKEN: ${{ github.token }}
      REPO: ${{ github.repository }}
    run: |
      set -euo pipefail
      mkdir -p /tmp/gh-aw/agent
      gh pr list --repo "$REPO" --state open \
        --json number,title,createdAt,updatedAt,isDraft,labels,author,reviewDecision,headRefName \
        --limit 200 > /tmp/gh-aw/agent/open-prs.json
imports:
  - shared/pr-review-core.md
---

You are sweeping the open pull request backlog of ${{ github.repository }}.

## Selection

Read `/tmp/gh-aw/agent/open-prs.json`. Skip drafts and PRs authored by bots. From the rest, take the **5 oldest by createdAt** that do not already carry a comment from this workflow or the PR Reviewer workflows (check each candidate's comments for the marker `First-pass review`; skip PRs that already have one unless they were updated after it was posted). Also skip any PR where a maintainer (MEMBER/COLLABORATOR/OWNER) commented within the last 14 days — a human sweep is already in progress there, and a bot follow-up on its heels reads as nagging.

## For each selected PR

1. Fetch its diff and metadata via the GitHub tools, then produce a first-pass review comment following the core instructions below (lane classification, verdict-first format, labels).
2. Additionally evaluate staleness. Check exemptions FIRST — if the PR has any of the labels `pinned 📌`, `Status: Blocked 🛑`, `awaiting changes`, or `awaiting PR`, do not evaluate it for closing at all. Otherwise apply these categories in order and stop at the first match:
   - **Superseded**: at least one of the same files was meaningfully changed on the base branch by a merged PR after this PR was created, covering the same fix. → apply `recommend close`
   - **Author unresponsive**: changes were formally requested or blocking feedback given ≥30 days ago with no commit or reply from the author since. → apply `recommend close`
   - **Obsolete**: the files it touches were deleted or fundamentally rewritten on the base branch. → apply `recommend close`
   - **Spam or empty**: no meaningful change, promotional content, or generated noise. → apply `recommend close`
   - Otherwise: if it is >30 days old with no activity in 30 days, apply `Status: Stale`; if it simply lacks review, apply the appropriate routing label.

   Team-authored PRs (author association MEMBER/COLLABORATOR/OWNER) may only receive `recommend close` when they are drafts; for non-draft team PRs, warn via the review comment instead.
3. When you apply `recommend close`, the comment MUST state the category and the concrete evidence (e.g. "superseded by #1234, merged 2026-05-02, same file `src/data/wallets/wallet-data.ts`"). A human makes the final call from the digest — you never close anything.

## Budget and termination

Do not exceed 5 reviewed PRs per run. Every run MUST end with at least one safe-output call; if the backlog is empty or fully covered, call `noop` with a one-line reason.
