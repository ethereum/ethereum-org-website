#!/usr/bin/env bash
# Deterministic evidence collector for the intake decision digest.
#
# Everything GitHub already knows is resolved here rather than inferred by the
# agent: head SHA, check rollup, whether the merge button is actually enabled,
# review state, linked issues, whether commits landed after the AI first-pass
# verdict, and who last spoke.
#
# Env: REPO (owner/name), GH_TOKEN. Writes to $OUT_DIR (default /tmp/gh-aw/agent):
#   queue-index.jsonl one compact line per open item, the whole queue
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
        author { login __typename }
        authorAssociation
        additions deletions changedFiles
        mergeable
        mergeStateStatus
        reviewDecision
        headRefOid
        labels(first: 20) { nodes { name } }
        files(first: 25) { nodes { path } }
        closingIssuesReferences(first: 5) { nodes { number } }
        reviewRequests(first: 10) {
          nodes { requestedReviewer { ... on User { login } ... on Team { name } } }
        }
        reviews(last: 20) {
          nodes {
            state submittedAt body authorAssociation
            author { login __typename }
            comments { totalCount }
          }
        }
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
        author { login __typename }
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

# A review is a reply. `comments` covers only issue-comments, so a maintainer who
# answered with a review — very often an inline-only one, with an empty body —
# looks like silence unless reviews are merged into the same stream.
def human_events:
  ([ .comments.nodes[]
     | select(is_bot | not)
     | { author: .author.login, at: .createdAt, isTeam: (.authorAssociation | team),
         via: "comment", inlineComments: 0, body: (.body // "") } ]
   + [ (.reviews.nodes // [])[]
       | select(is_bot | not)
       | select(((.body // "") | test("\\S")) or ((.comments.totalCount // 0) > 0))
       | { author: .author.login, at: .submittedAt, isTeam: (.authorAssociation | team),
           via: ("review:" + (.state | ascii_downcase)),
           inlineComments: (.comments.totalCount // 0), body: (.body // "") } ])
  | sort_by(.at);
JQ

PR_TRANSFORM='
[ .[].data.repository.pullRequests.nodes[] ]
| map(
    (.commits.nodes[0].commit) as $head
  | ($head.statusCheckRollup.contexts.nodes // []) as $checks
  | ([ .comments.nodes[]
       | select(is_bot)
       | select((.body // "") | test("First-pass review — ")) ] | last) as $ai
  | (human_events) as $human
  | {
      number, title, url,
      author: .author.login,
      isTeam: (.authorAssociation | team),
      isBot: is_bot,
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
      mergeState: (.mergeStateStatus // "UNKNOWN"),
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
                 | select(is_bot | not)
                 | select(.state | IN("APPROVED", "CHANGES_REQUESTED", "COMMENTED"))
                 | { author: .author.login, state, at: .submittedAt,
                     isTeam: (.authorAssociation | team),
                     inlineComments: (.comments.totalCount // 0),
                     excerpt: (.body | clean($commentChars)) } ],
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
        author, at, isTeam, via, inlineComments,
        excerpt: (.body | clean($commentChars))
      } end)
    })
| sort_by(.number)'

ISSUE_TRANSFORM='
[ .[].data.repository.issues.nodes[] ]
| map(
    (human_events) as $human
  | {
      number, title, url,
      author: .author.login,
      isTeam: (.authorAssociation | team),
      isBot: is_bot,
      createdAt, updatedAt,
      ageDays: (.createdAt | days_since),
      idleDays: (.updatedAt | days_since),
      bodyExcerpt: (.body | clean($bodyChars)),
      labels: [ .labels.nodes[].name ],
      assignees: [ .assignees.nodes[].login ],
      humanCommentCount: ($human | length),
      answeredByTeam: ([ $human[] | select(.isTeam) ] | length > 0),
      lastHumanComment: ($human | last | if . == null then null else {
        author, at, isTeam, via,
        excerpt: (.body | clean($commentChars))
      } end)
    })
| sort_by(.number)'

# GitHub's GraphQL gateway drops these queries with a 502 during rough patches —
# observed three times in a few minutes, then not once in twelve later attempts.
# Piping a failed response straight into jq turned that into a parse error and
# lost the whole morning's digest, so retry until the response is complete JSON
# with every page's `repository` present.
collect() {
  local raw="$OUT_DIR/.raw-response.json" attempt
  for attempt in 1 2 3 4 5; do
    if gh api graphql --paginate -F owner="$OWNER" -F name="$NAME" -f query="$1" > "$raw" \
       && jq -se 'length > 0 and all(.[]; .data.repository != null)' "$raw" > /dev/null 2>&1; then
      jq -s --argjson bodyChars 600 --argjson commentChars 400 "$HELPERS $2" "$raw"
      rm -f "$raw"
      return 0
    fi
    echo "GraphQL attempt $attempt/5 returned no usable response" >&2
    if [ "$attempt" -lt 5 ]; then sleep $((attempt * 5)); fi
  done
  echo "GraphQL collection failed after 5 attempts" >&2
  return 1
}

collect "$PR_QUERY" "$PR_TRANSFORM" > "$OUT_DIR/open-prs.json"
collect "$ISSUE_QUERY" "$ISSUE_TRANSFORM" > "$OUT_DIR/open-issues.json"

# GitHub computes mergeability lazily, so the first read of `mergeable` and
# `mergeStateStatus` is mostly UNKNOWN — the query itself is what schedules the
# computation. Ask again, up to three times, since one pass is not always enough.
for _ in 1 2 3; do
  jq -e 'any(.[]; .mergeable == "UNKNOWN" or .mergeState == "UNKNOWN")' \
    "$OUT_DIR/open-prs.json" > /dev/null || break
  sleep 10
  # A failed refresh is not fatal: the records already carry a mergeState, and
  # UNKNOWN is documented to the agent as "not verified". Losing the digest over
  # a flaky follow-up query would be the worse trade.
  if ! gh api graphql --paginate -F owner="$OWNER" -F name="$NAME" -f query='
    query($owner: String!, $name: String!, $endCursor: String) {
      repository(owner: $owner, name: $name) {
        pullRequests(states: OPEN, first: 100, after: $endCursor) {
          pageInfo { hasNextPage endCursor }
          nodes { number mergeable mergeStateStatus }
        }
      }
    }' > "$OUT_DIR/.mergeable-raw.json" \
    || ! jq -se '[ .[].data.repository.pullRequests.nodes[] ] | INDEX(.number | tostring)' \
         "$OUT_DIR/.mergeable-raw.json" > "$OUT_DIR/mergeable.json" 2>/dev/null; then
    echo "Mergeability refresh failed; keeping the values already collected" >&2
    rm -f "$OUT_DIR/.mergeable-raw.json" "$OUT_DIR/mergeable.json"
    break
  fi
  rm -f "$OUT_DIR/.mergeable-raw.json"
  jq --slurpfile fresh "$OUT_DIR/mergeable.json" '
    map(. as $pr
        | ($fresh[0][$pr.number | tostring]) as $f
        | $pr + {
            mergeable: (if ($f.mergeable // "UNKNOWN") == "UNKNOWN" then $pr.mergeable else $f.mergeable end),
            mergeState: (if ($f.mergeStateStatus // "UNKNOWN") == "UNKNOWN" then $pr.mergeState else $f.mergeStateStatus end)
          })
  ' "$OUT_DIR/open-prs.json" > "$OUT_DIR/open-prs.tmp.json"
  mv "$OUT_DIR/open-prs.tmp.json" "$OUT_DIR/open-prs.json"
  rm -f "$OUT_DIR/mergeable.json"
done

# One line per open item, so candidate selection can start from something that
# covers 100% of the queue — the detail files are big enough that an agent
# reading them truncates and never knows what it skipped. Emitted compact (one
# item per line, PRs then issues, newest first) because pretty-printing this ran
# to ~2,700 lines, which truncates at a file-read cap just like the detail files
# and so reintroduced the exact blind spot the index exists to close.
jq -s -c '
  (.[0] | sort_by(-.number) | .[] | {
    k: "pr",
    n: .number, t: (.title[0:70]), a: .author, team: .isTeam, bot: .isBot, draft: .isDraft,
    age: .ageDays, idle: .idleDays, merge: .mergeable, ms: .mergeState, ci: .ci.state,
    fail: (.ci.failing | length), rd: .reviewDecision,
    hc: .humanCommentCount, rv: (.reviews | length),
    ai: (if .aiReview == null then null
         elif .aiReview.supersededByCommits then (.aiReview.verdict + "/stale")
         else .aiReview.verdict end),
    files: .size.files, linked: .linkedIssues, labels: .labels
  }),
  (.[1] | sort_by(-.number) | .[] | {
    k: "issue",
    n: .number, t: (.title[0:70]), a: .author, team: .isTeam, bot: .isBot,
    age: .ageDays, idle: .idleDays, comments: .humanCommentCount,
    answered: .answeredByTeam, assigned: (.assignees | length > 0), labels: .labels
  })
' "$OUT_DIR/open-prs.json" "$OUT_DIR/open-issues.json" > "$OUT_DIR/queue-index.jsonl"

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
