#!/usr/bin/env bash
# Replays past PR reviews through the Backlog Sweeper's dry-run mode and scores them against cases.json.
#
#   eval.sh run <ref> <out-dir> [pr...]   dispatch one dry run per case from workflow ref <ref> (a pushed branch), wait, download
#   eval.sh score <out-dir>               judge each rendered review against its case and print the scorecard
#
# Each case pins the base to the base branch as it was at the original review ("at") and the PR head to the reviewed sha.
# Needs gh (repo write access to dispatch), jq, git with origin fetched, and claude (the judge).
set -euo pipefail

REPO="${REPO:-ethereum/ethereum-org-website}"
WORKFLOW=backlog-sweeper.lock.yml
CASES="$(dirname "$0")/cases.json"
JUDGE_MODEL="${JUDGE_MODEL:-claude-sonnet-5-5}"

run() {
  local ref=$1 out=$2; shift 2
  mkdir -p "$out"
  local prs=("$@")
  [ ${#prs[@]} -gt 0 ] || mapfile -t prs < <(jq -r '.[].pr' "$CASES")

  for pr in "${prs[@]}"; do
    local case at head base as_of before id
    case=$(jq -c --argjson pr "$pr" '.[] | select(.pr == $pr)' "$CASES")
    [ -n "$case" ] || { echo "No case for #$pr" >&2; continue; }
    at=$(jq -r .at <<<"$case"); head=$(jq -r .head <<<"$case")
    base=$(gh pr view "$pr" --repo "$REPO" --json baseRefName -q .baseRefName)
    as_of=$(git rev-list -1 --before="$at" "origin/$base")

    before=$(gh run list --repo "$REPO" --workflow "$WORKFLOW" --event workflow_dispatch -L 1 --json databaseId -q '.[0].databaseId // 0')
    gh workflow run "$WORKFLOW" --repo "$REPO" --ref "$ref" -f pr="$pr" -f dry_run=true -f as_of="$as_of" -f head="$head" >/dev/null
    id=""
    for _ in $(seq 30); do
      id=$(gh run list --repo "$REPO" --workflow "$WORKFLOW" --event workflow_dispatch -L 1 --json databaseId -q '.[0].databaseId // 0')
      [ "$id" != "$before" ] && break
      sleep 2
    done
    [ "$id" != "$before" ] || { echo "Dispatch for #$pr never showed up" >&2; continue; }
    echo "#$pr -> run $id (base $as_of)"
    jq -n --argjson pr "$pr" --argjson id "$id" --arg ref "$ref" --arg as_of "$as_of" '{pr: $pr, run: $id, ref: $ref, as_of: $as_of}' > "$out/$pr.run.json"
  done

  for f in "$out"/*.run.json; do
    local pr id
    pr=$(jq -r .pr "$f"); id=$(jq -r .run "$f")
    [ -f "$out/review-$pr.md" ] && continue
    gh run watch "$id" --repo "$REPO" --exit-status >/dev/null 2>&1 || echo "Run $id for #$pr did not succeed" >&2
    gh run download "$id" --repo "$REPO" -n dry-run-reviews -D "$out" 2>/dev/null || echo "No review artifact for #$pr" >&2
    gh aw audit "$id" --repo "$REPO" --json -o "$out/.audit" 2>/dev/null | jq '.metrics.aic // null' > "$out/$pr.aic" || true
  done
}

score() {
  local out=$1 rows="" pr case review data verdict
  for f in "$out"/review-*.md; do
    pr=$(basename "$f" .md); pr=${pr#review-}
    case=$(jq -c --argjson pr "$pr" '.[] | select(.pr == $pr)' "$CASES")
    review=$(cat "$f")
    data=$(sed -n 's/.*<!-- ethorg-review: \(.*\) -->.*/\1/p' "$f"); data=${data:-"{}"}
    verdict=$(claude -p --model "$JUDGE_MODEL" --output-format text "You grade an automated PR review against a golden case. Reply with JSON only, no prose:
{\"expect\": [{\"caught\": true|false, \"where\": \"the finding, claim or base status that covers it, or empty\"}], \"must_not\": [{\"violated\": true|false}], \"extra\": [{\"title\": \"finding not covered by any expected item\", \"kind\": \"plausible\"|\"noise\"}]}

An expected item is caught when a finding, a contradicted or unverifiable claim, or the base status says the same thing in substance, even in other words. 'noise' means cosmetic, speculative or restating something lint would catch.

<case>$case</case>
<review>$review</review>" </dev/null) || verdict='{}'
    verdict=$(sed -n '/^{/,/^}/p' <<<"$verdict" | jq -c . 2>/dev/null || echo '{}')
    echo "$verdict" > "$out/$pr.verdict.json"
    rows+=$(jq -n --argjson pr "$pr" --argjson c "$case" --argjson d "$data" --argjson v "$verdict" \
      --argjson aic "$(cat "$out/$pr.aic" 2>/dev/null || echo null)" '{
        pr: $pr,
        expected: ($c.expect // [] | length),
        caught: ([$v.expect[]? | select(.caught)] | length),
        must_not_violated: ([$v.must_not[]? | select(.violated)] | length),
        silent_ok: (if $c.silent then (($d.counts.blocking // 0) + ($d.counts.should_fix // 0)) == 0 else null end),
        blocking: ($d.counts.blocking // 0), should_fix: ($d.counts.should_fix // 0), nit: ($d.counts.nit // 0),
        noise: ([$v.extra[]? | select(.kind == "noise")] | length),
        base: ($d.base // null), aic: $aic}')$'\n'
  done

  {
  jq -s -r '
    (["PR", "caught", "must-not", "silent", "B/S/N", "noise", "base", "AIC"] | @tsv),
    (.[] | [.pr, "\(.caught)/\(.expected)", .must_not_violated, (.silent_ok // "-"), "\(.blocking)/\(.should_fix)/\(.nit)", .noise, (.base // "-"), (.aic // "-" | tostring | .[0:6])] | @tsv)
  ' <<<"$rows" | column -t -s $'\t'
  echo
  jq -s -r '
    "recall \(map(.caught) | add)/\(map(.expected) | add) | must-not violations \(map(.must_not_violated) | add) | silent on clean \(map(select(.silent_ok == true)) | length)/\(map(select(.silent_ok != null)) | length) | noise findings \(map(.noise) | add) | AIC total \(map(.aic // 0) | add | floor)"
  ' <<<"$rows"
  } | tee "$out/score.txt"
}

case "${1:-}" in
  run) shift; [ $# -ge 2 ] || { echo "usage: eval.sh run <ref> <out-dir> [pr...]" >&2; exit 2; }; run "$@" ;;
  score) shift; [ $# -eq 1 ] || { echo "usage: eval.sh score <out-dir>" >&2; exit 2; }; score "$1" ;;
  *) sed -n '2,8p' "$0" | sed 's/^# \{0,1\}//'; exit 2 ;;
esac
