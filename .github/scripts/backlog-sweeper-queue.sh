#!/usr/bin/env bash
# Picks the PRs the Backlog Sweeper reviews this run and pre-fetches their metadata and heads.
#
# Eligible: open, non-draft, not bot-authored, not a release/intl/automated
# branch of this repo, and never reviewed (no "First-pass review" comment). Oldest first,
# at most $LIMIT.
#
# Env: REPO (owner/name), GH_TOKEN. Writes to $OUT_DIR (default /tmp/gh-aw/agent):
#   candidates.json        selected PR numbers, oldest first
#   pr-<n>/pr-meta.json    PR metadata
# Also fetches each PR's head as the local branch pr-<n>-head (never checked out).
set -euo pipefail

OUT_DIR="${OUT_DIR:-/tmp/gh-aw/agent}"
LIMIT="${LIMIT:-5}"
mkdir -p "$OUT_DIR"

gh api graphql --paginate \
  -F owner="${REPO%%/*}" -F name="${REPO##*/}" \
  -f query='
query($owner: String!, $name: String!, $endCursor: String) {
  repository(owner: $owner, name: $name) {
    pullRequests(states: OPEN, first: 50, after: $endCursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        number createdAt isDraft headRefName isCrossRepository
        author { login __typename }
        comments(first: 100) { nodes { createdAt body author { login __typename } } }
      }
    }
  }
}' --jq '.data.repository.pullRequests.nodes[]' \
| jq -s --argjson limit "$LIMIT" '
  map(
    select((.isDraft | not)
      and .author.__typename != "Bot"
      and (.isCrossRepository or (.headRefName | test("^(staging|dev)$|^intl/|^automated") | not)))
    | select([.comments.nodes[]
        | select(.author.__typename == "Bot" and (.body | contains("First-pass review")))] | length == 0)
  )
  | sort_by(.createdAt) | .[:$limit] | map(.number)' > "$OUT_DIR/candidates.json"

for n in $(jq -r '.[]' "$OUT_DIR/candidates.json"); do
  mkdir -p "$OUT_DIR/pr-$n"
  gh pr view "$n" --repo "$REPO" \
    --json number,title,body,author,isDraft,baseRefName,headRefName,headRefOid,additions,deletions,changedFiles,labels \
    > "$OUT_DIR/pr-$n/pr-meta.json"
  git fetch -q --no-tags origin "pull/$n/head:pr-$n-head"
done

echo "Candidates: $(cat "$OUT_DIR/candidates.json")"
