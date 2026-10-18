---
name: PR Reviewer (team)
description: Lane-aware, verdict-first first-pass review of pull requests, including forks
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
# PR code is never checked out; the diff is read through the API.
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
          if grep -qixF -- "  - $AUTHOR" .github/trust.yml; then m=claude-opus-5-5; else m=claude-sonnet-5-5; fi
          echo "model=$m" >> "$GITHUB_OUTPUT"
  agent:
    needs: [tier]
  conclusion:
    needs: [tier]
max-ai-credits: 300
network: defaults
strict: true
timeout-minutes: 10
tools:
  github:
    toolsets: [default, actions]
safe-outputs:
  github-app:
    client-id: ${{ vars.ETHORG_AGENT_CLIENT_ID }}
    private-key: ${{ secrets.ETHORG_AGENT_PRIVATE_KEY }}
  add-comment:
    max: 1
    hide-older-comments:
      match: [backlog-sweeper]
  create-pull-request-review-comment:
    max: 10
  submit-pull-request-review:
    max: 1
    allowed-events: [COMMENT]
    footer: none
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
imports:
  - shared/pr-review-core.md
---

Review pull request #${{ github.event.pull_request.number }} in ${{ github.repository }} following the core instructions below.

For small, exact fixes (a typo, a broken link, a missing heading anchor), also leave an inline review comment on the line with a ```` ```suggestion ```` block so the author can apply it in one click, then submit the review as a `COMMENT` with a one-line body. Skip the review entirely when there is nothing to suggest.
