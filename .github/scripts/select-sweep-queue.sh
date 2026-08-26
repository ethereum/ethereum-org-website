#!/usr/bin/env bash
# Deterministic queue selection + diff pre-fetch for the PR Backlog Sweeper.
#
# The agent used to discover its own work: it walked the backlog oldest-first,
# pulling every candidate's comment thread over MCP until five PRs still needed a
# first pass. That screening was ~75% of the run's context and grew as coverage
# grew. It is all answerable from intake-evidence.sh's records, so it happens
# here and the agent is handed the five PRs plus their capped diffs.
#
# Env: REPO (owner/name), GH_TOKEN. Reads $OUT_DIR/open-prs.json, written by
# intake-evidence.sh. Writes to $OUT_DIR (default /tmp/gh-aw/agent):
#   sweep-queue.json  the selected PRs, oldest first, full evidence records
#   pr-<n>.patch      each selected PR's diff, capped as the PR Reviewer caps its own
set -euo pipefail

OUT_DIR="${OUT_DIR:-/tmp/gh-aw/agent}"
MAX_PRS="${MAX_PRS:-5}"
QUIET_DAYS="${MAINTAINER_QUIET_DAYS:-14}"
DIFF_LINES="${DIFF_LINES:-3000}"

cutoff="$(date -u -d "-${QUIET_DAYS} days" +%Y-%m-%dT%H:%M:%SZ)"

# Mirrors the selection the prompt used to describe. `aiReview` covers both this
# workflow and the PR Reviewer — they post the same header, so either one counts
# as covered, and `supersededByCommits` is how "updated after it was posted" is
# resolved without re-reading the thread.
jq --arg cutoff "$cutoff" --argjson max "$MAX_PRS" '
  [ .[]
    | select(.isDraft | not)
    | select(.isBot | not)
    | select(.aiReview == null or .aiReview.supersededByCommits)
    | select((.lastHumanComment == null)
             or (.lastHumanComment.isTeam | not)
             or (.lastHumanComment.at < $cutoff))
  ]
  | sort_by(.createdAt)
  | .[:$max]
' "$OUT_DIR/open-prs.json" > "$OUT_DIR/sweep-queue.json"

count="$(jq 'length' "$OUT_DIR/sweep-queue.json")"
echo "sweep queue: ${count} PR(s), maintainer-quiet cutoff ${cutoff}"

for pr in $(jq -r '.[].number' "$OUT_DIR/sweep-queue.json"); do
  { gh pr diff "$pr" --repo "$REPO" || true; } | head -n "$DIFF_LINES" > "$OUT_DIR/pr-${pr}.patch"
  echo "  #${pr}: $(wc -l < "$OUT_DIR/pr-${pr}.patch") diff lines"
done
