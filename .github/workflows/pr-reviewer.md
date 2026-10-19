---
name: PR Reviewer (team)
description: Lane-aware, findings-only first-pass review of pull requests, including forks
on:
  pull_request_target:
    types: [opened, ready_for_review]
  roles: all
  needs: [tier]
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
engine:
  id: claude
  model: ${{ needs.tier.outputs.model }}
sandbox:
  agent:
    token-steering: false
jobs:
  tier:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    outputs:
      model: ${{ steps.tier.outputs.model }}
    steps:
      - uses: actions/checkout@v6
        with:
          ref: ${{ github.event.pull_request.base.sha }}
          sparse-checkout: .github/trust.yml
          sparse-checkout-cone-mode: false
          persist-credentials: false
      - id: tier
        env:
          AUTHOR: ${{ github.event.pull_request.user.login }}
        run: |
          logins=$(yq '(.maintainers // []) + (.trusted // []) | .[]' .github/trust.yml)
          if grep -qixF -- "$AUTHOR" <<<"$logins"; then m=claude-opus-5-5; else m=claude-sonnet-5-5; fi
          echo "model=$m" >> "$GITHUB_OUTPUT"
  agent:
    needs: [tier]
  conclusion:
    needs: [tier]
  safe_outputs:
    needs: [tier]
max-ai-credits: 300
network: defaults
strict: true
timeout-minutes: 20
tools:
  github:
    toolsets: [default, actions]
  bash: ["git diff:*", "git show:*", "git log:*", "git merge-base:*", "git rev-parse:*", "git ls-files:*", "git grep:*", "ls", "cat", "grep", "head", "wc"]
safe-outputs:
  github-app:
    client-id: ${{ vars.ETHORG_AGENT_CLIENT_ID }}
    private-key: ${{ secrets.ETHORG_AGENT_PRIVATE_KEY }}
  add-comment:
    max: 1
    hide-older-comments:
      match: [backlog-sweeper]
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
  - name: Pre-fetch PR diff and metadata
    env:
      GH_TOKEN: ${{ github.token }}
      PR_NUMBER: ${{ github.event.pull_request.number }}
      REPO: ${{ github.repository }}
    run: |
      set -euo pipefail
      mkdir -p /tmp/gh-aw/agent
      { gh pr diff "$PR_NUMBER" --repo "$REPO" || true; } | awk 'NR <= 3000; END { if (NR > 3000) print "TRUNCATED: showing 3000 of " NR " lines" }' > /tmp/gh-aw/agent/pr-diff.patch
      [ -s /tmp/gh-aw/agent/pr-diff.patch ] || echo "TRUNCATED: diff unavailable (too large for the API)" > /tmp/gh-aw/agent/pr-diff.patch
      gh pr view "$PR_NUMBER" --repo "$REPO" \
        --json number,title,body,author,isDraft,baseRefName,headRefName,headRefOid,additions,deletions,changedFiles,files,labels \
        > /tmp/gh-aw/agent/pr-meta.json
      git fetch --no-tags origin "pull/$PR_NUMBER/head:pr-head"
imports:
  - shared/pr-review-core.md
---

Review pull request #${{ github.event.pull_request.number }} in ${{ github.repository }} following the core instructions below.
