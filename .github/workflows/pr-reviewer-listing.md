---
name: PR Reviewer (listing)
description: First-pass review of outside contributors' listing requests, with sourced research on the product
on:
  pull_request_target:
    types: [opened, ready_for_review]
  workflow_dispatch:
    inputs:
      pr:
        description: "Pull request number to review"
        required: true
        type: string
  roles: all
  permissions:
    contents: read
    pull-requests: read
  steps:
    - uses: actions/checkout@v6
      with:
        sparse-checkout: |
          .github/scripts/listing-research.mjs
          .github/CODEOWNERS
        sparse-checkout-cone-mode: false
        persist-credentials: false
    - name: Detect listing request
      id: listing
      continue-on-error: true
      env:
        GH_TOKEN: ${{ github.token }}
        REPO: ${{ github.repository }}
        PR: ${{ github.event.pull_request.number || inputs.pr }}
        EVENT: ${{ github.event_name }}
      run: |
        if [ "$EVENT" = workflow_dispatch ]; then exit 0; fi
        node .github/scripts/listing-research.mjs match "$PR" || {
          rc=$?
          [ "$rc" -eq 1 ] || echo "::warning::Listing gate failed (exit $rc); PR Reviewer (team) reviews this PR"
          exit "$rc"
        }
  skip-bots:
    - allcontributors[bot]
    - github-actions[bot]
    - dependabot[bot]
if: needs.pre_activation.outputs.listing_result == 'success'
concurrency:
  group: "gh-aw-${{ github.workflow }}-${{ github.event.pull_request.number || inputs.pr }}"
  cancel-in-progress: true
  job-discriminator: ${{ github.run_id }}
permissions:
  contents: read
  issues: read
  pull-requests: read
  actions: read
# PR code is only fetched as the `pr-head` ref, never checked out or run.
checkout:
  repository: ${{ github.repository }}
  fetch-depth: 0
engine:
  id: claude
  model: claude-opus-5-5
max-ai-credits: 600
max-daily-ai-credits: 2000
strict: true
timeout-minutes: 25
# Only this reviewer reads the web: listing research needs independent sources, other reviews don't.
network:
  allowed:
    - defaults
    - github
    - web.archive.org
    - rdap.org
    - etherscan.io
    - defillama.com
    - api.llama.fi
    - l2beat.com
    - rekt.news
    - apps.apple.com
    - play.google.com
    - find-and-update.company-information.service.gov.uk
    - code4rena.com
    - cantina.xyz
    - solodit.cyfrin.io
    - theblock.co
    - www.theblock.co
    - coindesk.com
    - www.coindesk.com
    - cointelegraph.com
    - decrypt.co
    - npmjs.com
    - www.npmjs.com
    - registry.npmjs.org
tools:
  web-fetch:
  web-search:
  github:
    toolsets: [default, actions]
  bash: ["git diff:*", "git show:*", "git log:*", "git merge-base:*", "git rev-parse:*", "git ls-files:*", "git branch -a", "git branch --list:*", "git branch --contains:*", "ls:*", "cat:*", "grep:*", "head:*", "tail:*", "wc:*"]
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
  - name: Fetch PR head, metadata and the pages it links
    env:
      GH_TOKEN: ${{ github.token }}
      PR_NUMBER: ${{ github.event.pull_request.number || inputs.pr }}
      REPO: ${{ github.repository }}
    run: |
      set -euo pipefail
      mkdir -p /tmp/gh-aw/agent
      gh pr view "$PR_NUMBER" --repo "$REPO" \
        --json number,title,body,author,isDraft,baseRefName,headRefName,headRefOid,mergeStateStatus,additions,deletions,changedFiles,labels \
        > /tmp/gh-aw/agent/pr-meta.json
      git fetch --no-tags origin "pull/$PR_NUMBER/head:pr-head"
      node .github/scripts/listing-research.mjs prefetch "$PR_NUMBER" /tmp/gh-aw/agent/listing
imports:
  - shared/pr-review-core.md
  - shared/submit-review.md
---

Review pull request #${{ github.event.pull_request.number || inputs.pr }} in ${{ github.repository }} following the core instructions below. It is a listing request with saved research, so the `listing` lane applies with its research, alongside any other lanes the PR touches.
