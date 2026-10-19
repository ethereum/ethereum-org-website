---
safe-outputs:
  jobs:
    submit-review:
      description: "Submit the first-pass review of one pull request. Call exactly once per reviewed PR; the comment is rendered and posted from these fields."
      runs-on: ubuntu-latest
      if: needs.detection.result == 'success'
      permissions:
        contents: read
      artifacts:
        - /tmp/gh-aw/agent/candidates.json
      inputs:
        pr:
          description: "Pull request number"
          required: true
          type: string
        sha:
          description: "Reviewed head commit: headRefOid from pr-meta.json"
          required: true
          type: string
        lanes:
          description: "Comma-separated lanes the PR touches, from: code, tooling, data, content, translation, deps, docs"
          required: true
          type: string
        risk:
          description: "Highest impact if anything in the PR is wrong: R0 no behavior or meaning change, R1 small contained user-visible change, R2 changes what users see or do or can break the build, R3 product, policy or security decision"
          required: true
          type: choice
          options: ["R0", "R1", "R2", "R3"]
        reason:
          description: "One line: why this risk"
          required: true
          type: string
        summary:
          description: "One sentence: what the PR does"
          required: true
          type: string
        findings:
          description: 'JSON array, possibly empty, of {"severity": "blocking"|"should fix"|"nit", "file": "path", "line": 123, "title": "short problem", "detail": "trigger and effect", "fix": "the fix, or empty"}'
          required: true
          type: string
        unreviewed:
          description: "Files not reviewed, comma-separated, or empty"
          required: false
          type: string
      steps:
        - uses: actions/checkout@v6
          with:
            ref: ${{ github.event.pull_request.base.sha || github.sha }}
            sparse-checkout: .github/scripts/pr-risk-floor.sh
            sparse-checkout-cone-mode: false
            persist-credentials: false
        - name: Mint app token
          id: app-token
          uses: actions/create-github-app-token@v3
          with:
            client-id: ${{ vars.ETHORG_AGENT_CLIENT_ID }}
            private-key: ${{ secrets.ETHORG_AGENT_PRIVATE_KEY }}
            repositories: ${{ github.event.repository.name }}
            permission-issues: write
            permission-pull-requests: write
        - name: Validate, render and post
          env:
            GH_TOKEN: ${{ steps.app-token.outputs.token }}
            REPO: ${{ github.repository }}
            EVENT_PR: ${{ github.event.pull_request.number }}
            EVENT_SHA: ${{ github.event.pull_request.head.sha }}
            RUN_URL: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
          run: |
            set -euo pipefail
            candidates=$(find "$(dirname "$GH_AW_AGENT_OUTPUT")" -name candidates.json -print -quit || true)
            jq -c '.items[] | select(.type == "submit_review")' "$GH_AW_AGENT_OUTPUT" > items.jsonl
            [ -s items.jsonl ] || { echo "No submit_review calls"; exit 1; }
            failed=0
            while IFS= read -r item; do
              pr=$(jq -r '.pr | tonumber' <<<"$item")
              if [ -n "$EVENT_PR" ]; then
                [ "$pr" = "$EVENT_PR" ] || { echo "::error::PR #$pr is not the triggering PR"; failed=1; continue; }
              elif [ -z "$candidates" ] || ! jq -e --argjson n "$pr" 'index($n)' "$candidates" >/dev/null; then
                echo "::error::PR #$pr was not selected for this run"; failed=1; continue
              fi

              paths=$(gh api --paginate "repos/$REPO/pulls/$pr/files?per_page=100" --jq '.[].filename' | bash .github/scripts/pr-risk-floor.sh)

              # Untrusted strings: cap length and defuse HTML comments so nothing can fake the data line.
              review=$(jq -c --arg sha "${EVENT_SHA:-}" --arg run "$RUN_URL" --argjson paths "$paths" '
                def clean: tostring | .[0:500] | gsub("<!--"; "&lt;!--") | gsub("-->"; "--&gt;");
                (.findings | fromjson) as $f
                | if ($f | type) != "array" then error("findings is not an array") else . end
                | ($f | map(
                    if (.severity | IN("blocking", "should fix", "nit")) | not then error("bad severity: \(.severity)") else . end
                    | {severity, file: (.file | clean), line: (if .line == null then null else (.line | tonumber | floor) end),
                       title: (.title | clean), detail: (.detail // "" | clean), fix: (.fix // "" | clean)}
                  ) | sort_by({"blocking":0,"should fix":1,"nit":2}[.severity]) | .[0:25]) as $findings
                | {v: 1, pr: (.pr | tonumber),
                   sha: (if $sha != "" then $sha else (.sha | if test("^[0-9a-f]{40}$") then . else error("bad sha") end) end),
                   lanes: (.lanes | split(",") | map(gsub("^\\s+|\\s+$"; "")) | map(select(. != "")) | unique
                     | if length == 0 or any(IN("code", "tooling", "data", "content", "translation", "deps", "docs") | not) then error("bad lanes") else . end),
                   risk: ([.risk, $paths.floor] | max),
                   reason: (if $paths.floor > .risk then "\($paths.floor) floor for `\($paths.floorReason)`; reviewer said \(.risk): \(.reason | clean)" else (.reason | clean) end),
                   summary: (.summary | clean),
                   findings: $findings,
                   counts: {blocking: ($findings | map(select(.severity == "blocking")) | length),
                            should_fix: ($findings | map(select(.severity == "should fix")) | length),
                            nit: ($findings | map(select(.severity == "nit")) | length)},
                   unreviewed: ((.unreviewed // "") | clean | split(",") | map(gsub("^\\s+|\\s+$"; "")) | map(select(. != ""))),
                   run: $run}
              ' <<<"$item") || { echo "::error::PR #$pr: invalid review payload"; failed=1; continue; }

              body=$(jq -r '
                (.findings | length) as $n
                | "## 🔎 First-pass review — " + (if $n == 0 then "no findings" elif $n == 1 then "1 finding" else "\($n) findings" end)
                + "\n\n" + .summary
                + (if $n > 0 then "\n\n" + ([.findings | to_entries[] | .value as $x
                    | "\(.key + 1). **\($x.severity)** `\($x.file)\(if $x.line then ":\($x.line)" else "" end)` — \($x.title)"
                      + (if $x.detail != "" then ". \($x.detail)" else "" end)
                      + (if $x.fix != "" then " **Fix:** \($x.fix)" else "" end)] | join("\n")) else "" end)
                + (if (.unreviewed | length) > 0 then "\n\n_Not reviewed: " + (.unreviewed | map("`\(.)`") | join(", ")) + "_" else "" end)
                + "\n\n<!-- ethorg-review: " + tojson + " -->"
              ' <<<"$review")

              existing=$(gh api --paginate "repos/$REPO/issues/$pr/comments?per_page=100" \
                --jq '.[] | select(.user.login == "ethorg-agent[bot]" and (.body | contains("First-pass review"))) | .id' | tail -n 1)
              if [ -n "$existing" ]; then
                gh api -X PATCH "repos/$REPO/issues/comments/$existing" -f body="$body" > /dev/null
                echo "Updated review comment on #$pr"
              else
                gh api -X POST "repos/$REPO/issues/$pr/comments" -f body="$body" > /dev/null
                echo "Posted review comment on #$pr"
              fi
            done < items.jsonl
            exit "$failed"
---
