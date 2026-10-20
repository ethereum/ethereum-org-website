---
safe-outputs:
  jobs:
    submit-review:
      description: "Submit the first-pass review of one pull request. Call exactly once per reviewed PR; the comment is rendered and posted from these fields."
      runs-on: ubuntu-latest
      if: needs.detection.result == 'success'
      max: 5
      permissions:
        contents: read
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
          description: "Risk level from the review instructions' risk table"
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
            EVENT_PR: ${{ github.event.pull_request.number || github.event.issue.number || inputs.pr }}
            EVENT_SHA: ${{ github.event.pull_request.head.sha }}
            RUN_URL: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
          run: |
            set -euo pipefail
            jq -c '.items[] | select(.type == "submit_review")' "$GH_AW_AGENT_OUTPUT" > items.jsonl
            [ -s items.jsonl ] || { echo "No submit_review calls"; exit 1; }

            # One process per review, so `set -e` holds inside it and one bad item can't stop the rest.
            cat > review-one.sh <<'SCRIPT'
            set -euo pipefail
            item=$1
            pr=$(jq -r '.pr | tostring | gsub("[^0-9]"; "")' <<<"$item")
            [ -n "$pr" ] || { echo "::error::Item without a PR number"; exit 1; }

            if [ -n "$EVENT_PR" ]; then
              [ "$pr" = "$EVENT_PR" ] || { echo "::error::PR #$pr is not the triggering PR"; exit 1; }
              gh api "repos/$REPO/pulls/$pr" --jq '.state' | grep -qx open || { echo "PR #$pr closed before the review finished"; exit 0; }
            else
              # The agent can write files, so sweeper scope is re-checked here rather than trusted from its workspace.
              gh api "repos/$REPO/pulls/$pr" --jq '.state == "open" and (.draft | not) and .user.type != "Bot"' | grep -qx true \
                || { echo "::error::PR #$pr is not an open, non-draft, human-authored PR"; exit 1; }
            fi

            paths=$(gh api --paginate "repos/$REPO/pulls/$pr/files?per_page=100" --jq '.[].filename' | bash .github/scripts/pr-risk-floor.sh)
            commits=$(gh api --paginate "repos/$REPO/pulls/$pr/commits?per_page=100" --jq '.[].sha' | jq -R . | jq -s .)

            # Untrusted strings: cap length and defuse HTML comments so nothing can fake the data line.
            review=$(jq -c --arg evsha "${EVENT_SHA:-}" --arg run "$RUN_URL" --argjson paths "$paths" --argjson commits "$commits" '
              def clean: tostring | .[0:500] | gsub("<!--"; "&lt;!--") | gsub("-->"; "--&gt;");
              (.findings // "" | if . == "" then "[]" else . end | fromjson) as $f
              | if ($f | type) != "array" then error("findings is not an array") else . end
              | ($f | map(
                  if (.severity | IN("blocking", "should fix", "nit")) | not then error("bad severity: \(.severity)") else . end
                  | {severity, file: (.file // "" | clean),
                     line: ((.line | tostring | match("[0-9]+").string | tonumber)? // null),
                     title: (.title // "" | clean), detail: (.detail // "" | clean), fix: (.fix // "" | clean)}
                ) | sort_by({"blocking":0,"should fix":1,"nit":2}[.severity])) as $all
              | {v: 1, pr: (.pr | tostring | gsub("[^0-9]"; "") | tonumber),
                 sha: (.sha as $s | if ($s | type) == "string" and ($commits | index($s)) != null then $s
                       elif $evsha != "" then $evsha else $commits[-1] end),
                 lanes: (.lanes | split(",") | map(gsub("^\\s+|\\s+$"; "")) | map(select(. != "")) | unique
                   | if length == 0 or any(IN("code", "tooling", "data", "content", "translation", "deps", "docs") | not) then error("bad lanes") else . end),
                 risk: ([.risk, $paths.floor] | max),
                 reason: (if $paths.floor > .risk then "\($paths.floor) floor for `\($paths.floorReason)`; reviewer said \(.risk): \(.reason | clean)" else (.reason | clean) end),
                 summary: (.summary | clean),
                 findings: $all[0:25],
                 counts: {blocking: ($all | map(select(.severity == "blocking")) | length),
                          should_fix: ($all | map(select(.severity == "should fix")) | length),
                          nit: ($all | map(select(.severity == "nit")) | length)},
                 unreviewed: ((.unreviewed // "") | clean | split(",") | map(gsub("^\\s+|\\s+$"; "")) | map(select(. != ""))),
                 run: $run}
            ' <<<"$item") || { echo "::error::PR #$pr: invalid review payload"; exit 1; }

            # Visible text also gets @-mentions defused so injected text can't ping people or teams.
            body=$(jq -r '
              def say: gsub("@"; "@​");
              (.counts.blocking + .counts.should_fix + .counts.nit) as $n
              | "## 🔎 First-pass review — " + (if $n == 0 then "no findings" elif $n == 1 then "1 finding" else "\($n) findings" end)
              + "\n\n" + (.summary | say)
              + (if (.findings | length) > 0 then "\n\n" + ([.findings | to_entries[] | .value as $x
                  | "\(.key + 1). **\($x.severity)** `\($x.file)\(if $x.line then ":\($x.line)" else "" end)` — \($x.title | say)"
                    + (if $x.detail != "" then ". \($x.detail | say)" else "" end)
                    + (if $x.fix != "" then " **Fix:** \($x.fix | say)" else "" end)] | join("\n")) else "" end)
              + (if $n > (.findings | length) then "\n\n_\($n - (.findings | length)) more findings not shown._" else "" end)
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
            SCRIPT

            failed=0
            while IFS= read -r item; do
              bash review-one.sh "$item" || failed=1
            done < items.jsonl
            exit "$failed"
---
