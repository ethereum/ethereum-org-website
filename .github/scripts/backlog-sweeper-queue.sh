#!/usr/bin/env bash
# Picks the PRs the Backlog Sweeper reviews this run and pre-fetches their metadata and heads.
#
# Eligible: open, non-draft, not bot-authored, not a release/intl/automated
# branch of this repo, and never reviewed (no "First-pass review" comment from ethorg-agent). Oldest first,
# at most $LIMIT. With PR_NUMBER set (a `/review` comment or `pr` dispatch input), only that PR if it is open and not a
# release/intl/automated branch of this repo; drafts, bot PRs and reviewed PRs are allowed, and closed PRs when DRY_RUN=true.
#
# Env: REPO (owner/name), GH_TOKEN, PR_NUMBER (optional), DRY_RUN and HEAD_SHA (optional: pin the head on dry runs). Writes to $OUT_DIR (default /tmp/gh-aw/agent):
#   candidates.json        selected PR numbers, oldest first
#   pr-<n>/pr-meta.json    PR metadata
# Also fetches each PR's head as the local branch pr-<n>-head (never checked out).
set -euo pipefail

OUT_DIR="${OUT_DIR:-/tmp/gh-aw/agent}"
LIMIT="${LIMIT:-5}"
mkdir -p "$OUT_DIR"

if [ -n "${PR_NUMBER:-}" ]; then
  gh api "repos/$REPO/pulls/$PR_NUMBER" --jq '
    if (.state == "open" or env.DRY_RUN == "true") and (.head.repo.full_name != .base.repo.full_name
      or (.head.ref | test("^(staging|dev)$|^intl/|^automated") | not))
    then [.number] else [] end' > "$OUT_DIR/candidates.json"
fi

[ -n "${PR_NUMBER:-}" ] || gh api graphql --paginate \
  -F owner="${REPO%%/*}" -F name="${REPO##*/}" \
  -f query='
query($owner: String!, $name: String!, $endCursor: String) {
  repository(owner: $owner, name: $name) {
    pullRequests(states: OPEN, first: 50, after: $endCursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        number createdAt isDraft headRefName isCrossRepository
        author { login __typename }
        early: comments(first: 100) { nodes { body author { login } } }
        late: comments(last: 100) { nodes { body author { login } } }
      }
    }
  }
}' --jq '.data.repository.pullRequests.nodes[]' \
| jq -s --argjson limit "$LIMIT" '
  map(
    select((.isDraft | not)
      and .author.__typename != "Bot"
      and (.isCrossRepository or (.headRefName | test("^(staging|dev)$|^intl/|^automated") | not)))
    | select([.early.nodes[], .late.nodes[]
        | select(.author.login == "ethorg-agent" and (.body | contains("First-pass review")))] | length == 0)
  )
  | sort_by(.createdAt) | .[:$limit] | map(.number)' > "$OUT_DIR/candidates.json"

for n in $(jq -r '.[]' "$OUT_DIR/candidates.json"); do
  mkdir -p "$OUT_DIR/pr-$n"
  gh pr view "$n" --repo "$REPO" \
    --json number,title,body,author,isDraft,baseRefName,headRefName,headRefOid,mergeStateStatus,additions,deletions,changedFiles,labels \
    > "$OUT_DIR/pr-$n/pr-meta.json"
  git fetch -q --no-tags origin "pull/$n/head:pr-$n-head"
  if [ "${DRY_RUN:-}" = true ] && [ -n "${HEAD_SHA:-}" ]; then
    [[ "$HEAD_SHA" =~ ^[0-9a-f]{7,40}$ ]] || { echo "::error::head must be a commit sha"; exit 1; }
    git fetch -q --no-tags origin "$HEAD_SHA"
    git branch -f "pr-$n-head" "$HEAD_SHA"
    jq --arg sha "$(git rev-parse "$HEAD_SHA")" '.headRefOid = $sha' "$OUT_DIR/pr-$n/pr-meta.json" > "$OUT_DIR/pr-$n/meta.tmp"
    mv "$OUT_DIR/pr-$n/meta.tmp" "$OUT_DIR/pr-$n/pr-meta.json"
  fi
done

echo "Candidates: $(cat "$OUT_DIR/candidates.json")"
