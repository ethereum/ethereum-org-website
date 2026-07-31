#!/usr/bin/env bash
# Deterministic evidence collector for the intake decision digest.
#
# Everything GitHub already knows is resolved here rather than inferred by the
# agent: head SHA, check rollup, mergeability, review state, linked issues,
# whether commits landed after the AI first-pass verdict, and who last spoke.
#
# Env: REPO (owner/name), GH_TOKEN. Writes to $OUT_DIR (default /tmp/gh-aw/agent):
#   open-prs.json     one record per open PR
#   open-issues.json  one record per open issue
#   queue-stats.json  repo-level counts
set -euo pipefail

OUT_DIR="${OUT_DIR:-/tmp/gh-aw/agent}"
OWNER="${REPO%%/*}"
NAME="${REPO##*/}"

mkdir -p "$OUT_DIR"

PR_QUERY='
query($owner: String!, $name: String!, $endCursor: String) {
  repository(owner: $owner, name: $name) {
    pullRequests(states: OPEN, first: 40, after: $endCursor, orderBy: {field: UPDATED_AT, direction: DESC}) {
      pageInfo { hasNextPage endCursor }
      nodes {
        number title url body createdAt updatedAt isDraft
        author { login }
        authorAssociation
        additions deletions changedFiles
        mergeable
        reviewDecision
        headRefOid
        labels(first: 20) { nodes { name } }
        files(first: 25) { nodes { path } }
        closingIssuesReferences(first: 5) { nodes { number } }
        reviewRequests(first: 10) {
          nodes { requestedReviewer { ... on User { login } ... on Team { name } } }
        }
        reviews(last: 20) { nodes { state submittedAt author { login } } }
        comments(last: 25) { nodes { createdAt authorAssociation body author { login __typename } } }
        commits(last: 1) {
          nodes {
            commit {
              committedDate
              statusCheckRollup {
                state
                contexts(first: 60) {
                  nodes {
                    ... on CheckRun { name conclusion status }
                    ... on StatusContext { context state }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}'

ISSUE_QUERY='
query($owner: String!, $name: String!, $endCursor: String) {
  repository(owner: $owner, name: $name) {
    issues(states: OPEN, first: 50, after: $endCursor, orderBy: {field: UPDATED_AT, direction: DESC}) {
      pageInfo { hasNextPage endCursor }
      nodes {
        number title url body createdAt updatedAt
        author { login }
        authorAssociation
        labels(first: 20) { nodes { name } }
        assignees(first: 5) { nodes { login } }
        comments(last: 10) { nodes { createdAt authorAssociation body author { login __typename } } }
      }
    }
  }
}'

# Bodies and comments are untrusted input: strip control characters, collapse
# whitespace, truncate. Shared by both transforms below.
#
# GraphQL reports bot logins without the REST "[bot]" suffix (`github-actions`,
# not `github-actions[bot]`), so author type is the only reliable discriminator.
read -r -d '' HELPERS <<'JQ' || true
def clean($n): (. // "")
  | gsub("[[:cntrl:]]"; " ") | gsub("\\s+"; " ") | sub("^ +"; "") | sub(" +$"; "")
  | if (length > $n) then (.[0:$n] + " …") else . end;
def days_since: (now - fromdateiso8601) / 86400 | floor;
def team: (. == "OWNER" or . == "MEMBER" or . == "COLLABORATOR");
def is_bot: ((.author.__typename // "") == "Bot")
  or ((.author.login // "") | IN("netlify", "codecov", "vercel"));
def human_comments: [ .comments.nodes[] | select(is_bot | not) ];
JQ

PR_TRANSFORM='
[ .[].data.repository.pullRequests.nodes[] ]
| map(
    (.commits.nodes[0].commit) as $head
  | ($head.statusCheckRollup.contexts.nodes // []) as $checks
  | ([ .comments.nodes[]
       | select(is_bot)
       | select((.body // "") | test("First-pass review — ")) ] | last) as $ai
  | (human_comments) as $human
  | {
      number, title, url,
      author: .author.login,
      isTeam: (.authorAssociation | team),
      isDraft, createdAt, updatedAt,
      ageDays: (.createdAt | days_since),
      idleDays: (.updatedAt | days_since),
      bodyExcerpt: (.body | clean($bodyChars)),
      labels: [ .labels.nodes[].name ],
      size: { files: .changedFiles, additions: .additions, deletions: .deletions },
      paths: ([ .files.nodes[].path ][0:15]),
      headSha: (.headRefOid[0:7]),
      lastCommitAt: $head.committedDate,
      mergeable,
      ci: {
        state: ($head.statusCheckRollup.state // "NONE"),
        failing: ([ $checks[]
                    | select(((.conclusion // .state) | IN("FAILURE", "ERROR", "TIMED_OUT")))
                    | (.name // .context) ] | unique),
        pending: ([ $checks[]
                    | select(.status == "IN_PROGRESS" or .status == "QUEUED" or .state == "PENDING") ] | length)
      },
      reviewDecision,
      requestedReviewers: [ .reviewRequests.nodes[].requestedReviewer | (.login // .name) ],
      reviews: [ .reviews.nodes[]
                 | select(.state | IN("APPROVED", "CHANGES_REQUESTED"))
                 | { author: .author.login, state, at: .submittedAt } ],
      linkedIssues: [ .closingIssuesReferences.nodes[].number ],
      aiReview: (if $ai == null then null else {
        verdict: (if ($ai.body | test("First-pass review — ✅ Looks mergeable")) then "looks-mergeable"
                  elif ($ai.body | test("First-pass review — 🔧 Needs work")) then "needs-work"
                  elif ($ai.body | test("First-pass review — 🗑️ Likely close")) then "likely-close"
                  else "unparsed" end),
        at: $ai.createdAt,
        supersededByCommits: ($head.committedDate > $ai.createdAt),
        excerpt: ($ai.body | clean($commentChars))
      } end),
      humanCommentCount: ($human | length),
      lastHumanComment: ($human | last | if . == null then null else {
        author: .author.login,
        at: .createdAt,
        isTeam: (.authorAssociation | team),
        excerpt: (.body | clean($commentChars))
      } end)
    })
| sort_by(.number)'

ISSUE_TRANSFORM='
[ .[].data.repository.issues.nodes[] ]
| map(
    (human_comments) as $human
  | {
      number, title, url,
      author: .author.login,
      isTeam: (.authorAssociation | team),
      createdAt, updatedAt,
      ageDays: (.createdAt | days_since),
      idleDays: (.updatedAt | days_since),
      bodyExcerpt: (.body | clean($bodyChars)),
      labels: [ .labels.nodes[].name ],
      assignees: [ .assignees.nodes[].login ],
      humanCommentCount: ($human | length),
      answeredByTeam: ([ $human[] | select(.authorAssociation | team) ] | length > 0),
      lastHumanComment: ($human | last | if . == null then null else {
        author: .author.login,
        at: .createdAt,
        isTeam: (.authorAssociation | team),
        excerpt: (.body | clean($commentChars))
      } end)
    })
| sort_by(.number)'

collect() {
  gh api graphql --paginate -F owner="$OWNER" -F name="$NAME" -f query="$1" \
    | jq -s --argjson bodyChars 600 --argjson commentChars 400 "$HELPERS $2"
}

collect "$PR_QUERY" "$PR_TRANSFORM" > "$OUT_DIR/open-prs.json"
collect "$ISSUE_QUERY" "$ISSUE_TRANSFORM" > "$OUT_DIR/open-issues.json"

# GitHub computes mergeability lazily, so the first read of `mergeable` is mostly
# UNKNOWN — the query itself is what schedules the computation. Ask again.
if jq -e 'any(.[]; .mergeable == "UNKNOWN")' "$OUT_DIR/open-prs.json" > /dev/null; then
  sleep 20
  gh api graphql --paginate -F owner="$OWNER" -F name="$NAME" -f query='
    query($owner: String!, $name: String!, $endCursor: String) {
      repository(owner: $owner, name: $name) {
        pullRequests(states: OPEN, first: 100, after: $endCursor) {
          pageInfo { hasNextPage endCursor }
          nodes { number mergeable }
        }
      }
    }' \
    | jq -s '[ .[].data.repository.pullRequests.nodes[] ] | INDEX(.number | tostring)' \
      > "$OUT_DIR/mergeable.json"
  jq --slurpfile fresh "$OUT_DIR/mergeable.json" '
    map(. + { mergeable: ($fresh[0][.number | tostring].mergeable // .mergeable) })
  ' "$OUT_DIR/open-prs.json" > "$OUT_DIR/open-prs.tmp.json"
  mv "$OUT_DIR/open-prs.tmp.json" "$OUT_DIR/open-prs.json"
  rm -f "$OUT_DIR/mergeable.json"
fi

# One line per open item, small enough to read whole. The detail files are big
# enough that an agent reading them can truncate and never know what it skipped,
# so candidate selection has to start from an index that covers 100% of the queue.
jq -s '{
  prs: (.[0] | map({
    n: .number, t: (.title[0:70]), a: .author, team: .isTeam, draft: .isDraft,
    age: .ageDays, idle: .idleDays, merge: .mergeable, ci: .ci.state,
    fail: (.ci.failing | length), rd: .reviewDecision,
    ai: (if .aiReview == null then null
         elif .aiReview.supersededByCommits then (.aiReview.verdict + "/stale")
         else .aiReview.verdict end),
    files: .size.files, linked: .linkedIssues, labels: .labels
  })),
  issues: (.[1] | map({
    n: .number, t: (.title[0:70]), a: .author, team: .isTeam,
    age: .ageDays, idle: .idleDays, comments: .humanCommentCount,
    answered: .answeredByTeam, assigned: (.assignees | length > 0), labels: .labels
  }))
}' "$OUT_DIR/open-prs.json" "$OUT_DIR/open-issues.json" > "$OUT_DIR/queue-index.json"

jq -n \
  --slurpfile prs "$OUT_DIR/open-prs.json" \
  --slurpfile issues "$OUT_DIR/open-issues.json" \
  '{
     openPRs: ($prs[0] | length),
     openPRsNonDraft: ($prs[0] | map(select(.isDraft | not)) | length),
     openIssues: ($issues[0] | length),
     externalIssuesAwaitingTeamReply:
       ($issues[0] | map(select((.isTeam | not) and (.answeredByTeam | not))) | length),
     prsWithFailingChecks: ($prs[0] | map(select(.ci.failing | length > 0)) | length),
     prsConflicting: ($prs[0] | map(select(.mergeable == "CONFLICTING")) | length)
   }' > "$OUT_DIR/queue-stats.json"

echo "Collected $(jq length "$OUT_DIR/open-prs.json") PRs, $(jq length "$OUT_DIR/open-issues.json") issues"
jq -c . "$OUT_DIR/queue-stats.json"
