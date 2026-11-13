#!/usr/bin/env bash
# Picks the PRs the Backlog Sweeper reviews this run and pre-fetches their metadata and heads.
#
# Eligible: open, non-draft, not bot-authored, not a release/intl/automated
# branch of this repo, not a bug bounty leaderboard-only PR (bounty-entry.sh), and never reviewed (no "First-pass review" comment from ethorg-agent). Oldest first,
# at most $LIMIT. With PR_NUMBER set (a `/review` comment or `pr` dispatch input), only that PR if it is open and not a
# release/intl/automated branch of this repo; drafts, bot PRs and reviewed PRs are allowed.
#
# Env: REPO (owner/name), GH_TOKEN, PR_NUMBER (optional). Writes to $OUT_DIR (default /tmp/gh-aw/agent):
#   candidates.json        selected PR numbers, oldest first
#   pr-<n>/pr-meta.json    PR metadata
#   pr-<n>/listing.txt     listing-research match gate: yes, no or error
# Also fetches each PR's head as the local branch pr-<n>-head (never checked out).
set -euo pipefail

OUT_DIR="${OUT_DIR:-/tmp/gh-aw/agent}"
LIMIT="${LIMIT:-5}"
mkdir -p "$OUT_DIR"
source "$(dirname "$0")/bounty-entry.sh"

if [ -n "${PR_NUMBER:-}" ]; then
  gh api "repos/$REPO/pulls/$PR_NUMBER" --jq '
    if .state == "open" and (.head.repo.full_name != .base.repo.full_name
      or (.head.ref | test("^(staging|dev)$|^intl/|^automated") | not))
    then [.number] else [] end' > "$OUT_DIR/candidates.json"
fi

[ -n "${PR_NUMBER:-}" ] || gh api graphql --paginate \
  -F owner="${REPO%%/*}" -F name="${REPO##*/}" -F bountyFiles="$(jq length <<< "$FILES")" \
  -f query='
query($owner: String!, $name: String!, $bountyFiles: Int!, $endCursor: String) {
  repository(owner: $owner, name: $name) {
    pullRequests(states: OPEN, first: 50, after: $endCursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        number createdAt isDraft headRefName isCrossRepository
        author { login __typename }
        files(first: $bountyFiles) { totalCount nodes { path } }
        early: comments(first: 100) { nodes { body author { login } } }
        late: comments(last: 100) { nodes { body author { login } } }
      }
    }
  }
}' --jq '.data.repository.pullRequests.nodes[]' \
| jq -s --argjson limit "$LIMIT" --argjson bountyFiles "$FILES" '
  map(
    select((.isDraft | not)
      and .author.__typename != "Bot"
      and (.isCrossRepository or (.headRefName | test("^(staging|dev)$|^intl/|^automated") | not))
      and ((.files.totalCount > 0 and .files.totalCount <= ($bountyFiles | length)
        and all(.files.nodes[]; .path | IN($bountyFiles[])) | not))
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
  listing=no
  if [ -f .github/scripts/listing-research.mjs ]; then
    rc=0; err=$(node .github/scripts/listing-research.mjs match "$n" 2>&1 >/dev/null) || rc=$?
    if [ "$rc" = 0 ]; then listing=yes
    elif [ "$rc" != 1 ] || [ -n "$err" ]; then listing=error; echo "$err" >&2; echo "::warning::listing-research match failed for #$n"; fi
  fi
  echo "$listing" > "$OUT_DIR/pr-$n/listing.txt"
done

echo "Candidates: $(cat "$OUT_DIR/candidates.json")"
