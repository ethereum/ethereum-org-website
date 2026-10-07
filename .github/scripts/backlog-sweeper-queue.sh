#!/usr/bin/env bash
# Picks the PRs the Backlog Sweeper reviews this run and pre-fetches their diffs.
#
# Eligible: open, non-draft, not bot-authored, not a release/intl/automated
# branch, and either never reviewed or with a new commit or author comment
# since the latest "First-pass review" comment. Oldest first, at most $LIMIT.
#
# Env: REPO (owner/name), GH_TOKEN. Writes to $OUT_DIR (default /tmp/gh-aw/agent):
#   candidates.json        selected PR numbers, oldest first
#   pr-<n>/pr-meta.json    PR metadata
#   pr-<n>/pr-diff.patch   diff, capped at 3000 lines
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
        number createdAt isDraft headRefName
        author { login __typename }
        commits(last: 1) { nodes { commit { committedDate } } }
        comments(last: 50) { nodes { createdAt body author { login __typename } } }
      }
    }
  }
}' --jq '.data.repository.pullRequests.nodes[]' \
| jq -s --argjson limit "$LIMIT" '
  map(
    select((.isDraft | not)
      and .author.__typename != "Bot"
      and (.headRefName | test("^(staging|dev)$|^intl/|^automated") | not))
    | .author.login as $author
    | ([.comments.nodes[]
        | select(.author.__typename == "Bot" and (.body | contains("First-pass review — ")))
        | .createdAt] | max) as $reviewed
    | select($reviewed == null
        or (.commits.nodes[0].commit.committedDate > $reviewed)
        or ([.comments.nodes[] | select(.author.login == $author and .createdAt > $reviewed)] | length > 0))
  )
  | sort_by(.createdAt) | .[:$limit] | map(.number)' > "$OUT_DIR/candidates.json"

for n in $(jq -r '.[]' "$OUT_DIR/candidates.json"); do
  mkdir -p "$OUT_DIR/pr-$n"
  { gh pr diff "$n" --repo "$REPO" || true; } | head -n 3000 > "$OUT_DIR/pr-$n/pr-diff.patch"
  gh pr view "$n" --repo "$REPO" \
    --json number,title,body,author,isDraft,baseRefName,headRefName,additions,deletions,changedFiles,files,labels \
    > "$OUT_DIR/pr-$n/pr-meta.json"
done

echo "Candidates: $(cat "$OUT_DIR/candidates.json")"
