#!/usr/bin/env bash
# Bug-bounty leaderboard PRs: bounty-entry.yml validates and auto-merges them; the AI reviewers skip them.
#   match <pr>              exit 0 if the author is in AUTHORS and the PR changes only FILES (needs REPO, GH_TOKEN)
#   validate <base> <head>  print what is wrong with FILES at git rev <head>; exit 1 if anything is
# Sourcing it only defines AUTHORS and FILES (JSON arrays).
set -euo pipefail

AUTHORS='["0xMushow"]'
FILES='["src/data/consensus-bounty-hunters.json", "src/data/execution-bounty-hunters.json"]'

[[ "${BASH_SOURCE[0]}" == "$0" ]] || return 0

case "${1:-}" in
  match)
    gh api "repos/$REPO/pulls/$2" --jq .user.login \
      | jq -eR --argjson a "$AUTHORS" 'IN($a[])' > /dev/null
    gh api --paginate "repos/$REPO/pulls/$2/files" --jq '.[].filename' \
      | jq -esR --argjson f "$FILES" '[splits("\n") | select(. != "")] | length > 0 and all(IN($f[]))' > /dev/null
    ;;
  validate)
    errors=$(for f in $(jq -r '.[]' <<< "$FILES"); do
      if ! git show "$3:$f" | jq -e 'type == "array"' > /dev/null 2>&1; then
        echo "$f: not valid JSON, or not an array"
        continue
      fi
      git show "$3:$f" | jq -r --arg f "$f" --argjson base "$(git show "$2:$f")" '
        def problem:
          if type != "object" or keys != ["name", "score", "username"] then "needs exactly the keys name, username, score"
          elif (.name | type) != "string" or .name == "" then "name must be a non-empty string"
          elif (.username | type) != "string" or (.username != "" and (.username | test("^[a-zA-Z0-9][a-zA-Z0-9-]{0,38}$") | not))
            then "username must be \"\" or a GitHub handle"
          elif (.score | type) != "number" or .score <= 0 or .score != (.score | floor) then "score must be a positive integer"
          else empty end;
        def dups(f): [.[] | objects | f | strings | select(. != "")] | group_by(.) | map(select(length > 1)[0]);
        (.[] | . as $e | problem | "\($f): \($e | tojson): \(.)"),
        ((dups(.name) - ($base | dups(.name)))[] | "\($f): duplicate name \(tojson)"),
        ((dups(.username | strings | ascii_downcase) - ($base | dups(.username | ascii_downcase)))[]
          | "\($f): duplicate username \(tojson)")'
    done)
    [ -z "$errors" ] || { echo "$errors"; exit 1; }
    ;;
  *) echo "usage: $0 match <pr> | validate <base> <head>" >&2; exit 2 ;;
esac
