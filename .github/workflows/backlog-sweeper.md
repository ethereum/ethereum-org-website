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
    # `default` minus `issues`: the queue and every candidate's comment thread are
    # resolved in pre-agent-steps now, and leaving `issues` in is what let the
    # agent re-derive the queue over MCP.
    toolsets: [context, repos, pull_requests, actions]
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
    report-as-issue: false
  report-failure-as-issue: false
pre-agent-steps:
  - name: Collect deterministic evidence
    env:
      GH_TOKEN: ${{ github.token }}
      REPO: ${{ github.repository }}
      OUT_DIR: /tmp/gh-aw/agent
    run: |
      set -euo pipefail
      mkdir -p /tmp/gh-aw/agent
      bash .github/scripts/intake-evidence.sh
  - name: Select the sweep queue and pre-fetch its diffs
    env:
      GH_TOKEN: ${{ github.token }}
      REPO: ${{ github.repository }}
      OUT_DIR: /tmp/gh-aw/agent
    run: |
      set -euo pipefail
      bash .github/scripts/select-sweep-queue.sh
imports:
  - shared/pr-review-core.md
---

You are sweeping the open pull request backlog of ${{ github.repository }}.

## Input — already selected, never re-derive it

`/tmp/gh-aw/agent/sweep-queue.json` **is** your queue: up to 5 PRs, oldest first, already filtered for drafts, bot authors, PRs carrying a first-pass review that their commits have not superseded, and PRs where a maintainer spoke in the last 14 days. The selection is deterministic and final — do not second-guess it, and do not read `open-prs.json` to look for other work.

Each entry is a full evidence record: `title`, `author`, `isTeam`, `labels`, `size`, `paths`, `ci.failing`, `reviewDecision`, `reviews`, `aiReview`, `lastHumanComment`, `ageDays`, `idleDays`. Each PR's diff is pre-fetched and capped at `/tmp/gh-aw/agent/pr-<number>.patch`.

Where the core instructions below refer to `pr-meta.json` and `pr-diff.patch`, read that PR's entry in `sweep-queue.json` and its `pr-<number>.patch` instead. Everything those records answer — who authored it, what it touches, which checks fail, whether a verdict already exists — is resolved. Reach for the GitHub tools only for what the records genuinely do not cover, such as base-branch history when you are testing a supersession claim.

If the queue is empty, call `noop` with a one-line reason and stop.

## For each selected PR

1. Read its record and its pre-fetched patch, then produce a first-pass review comment following the core instructions below (lane classification, verdict-first format, labels).
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
