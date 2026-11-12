#!/usr/bin/env bash
# Bug-bounty leaderboard PRs: bounty-entry.yml validates and approves them; the AI reviewers skip them.
#   match <pr>              print true if the author is in AUTHORS and the PR changes only FILES, else false;
#                           exit non-zero if that can't be determined (needs REPO, GH_TOKEN)
#   validate <base> <head>  print what is wrong with FILES at git rev <head> compared to <base>; exit 1 if anything is
# Sourcing it only defines AUTHORS and FILES (JSON arrays).
set -euo pipefail

AUTHORS='["0xMushow"]'
FILES='["src/data/consensus-bounty-hunters.json", "src/data/execution-bounty-hunters.json"]'

[[ "${BASH_SOURCE[0]}" == "$0" ]] || return 0

case "${1:-}" in
  match)
    author=$(gh api "repos/$REPO/pulls/$2" --jq .user.login)
    changed=$(gh api --paginate "repos/$REPO/pulls/$2/files" --jq '.[].filename')
    jq -nr --arg author "$author" --arg changed "$changed" --argjson a "$AUTHORS" --argjson f "$FILES" '
      [$changed | splits("\n") | select(. != "")] as $c
      | ($author | IN($a[])) and ($c | length > 0) and all($c[]; IN($f[]))'
    ;;
  validate)
    tmp=$(mktemp -d)
    trap 'rm -rf "$tmp"' EXIT
    errors=()
    for f in $(jq -r '.[]' <<< "$FILES"); do
      if ! git show "$2:$f" > "$tmp/base.json" || ! jq -e 'type == "array"' "$tmp/base.json" > /dev/null; then
        errors+=("$f: could not read the base version"); continue
      fi
      if ! git show "$3:$f" > "$tmp/head.json" 2> /dev/null; then
        errors+=("$f: missing"); continue
      fi
      if ! jq -e 'type == "array"' "$tmp/head.json" > /dev/null 2>&1; then
        errors+=("$f: not valid JSON, or not an array"); continue
      fi
      if ! out=$(jq -r --arg f "$f" --slurpfile base "$tmp/base.json" '
        $base[0] as $base
        | def problem:
          if type != "object" or keys != ["name", "score", "username"] then "needs exactly the keys name, username, score"
          elif (.name | type) != "string" or .name == "" then "name must be a non-empty string"
          elif (.username | type) != "string" or (.username != "" and (.username | test("^[a-zA-Z0-9][a-zA-Z0-9-]{0,38}$") | not))
            then "username must be \"\" or a GitHub handle"
          elif (.score | type) != "number" or .score <= 0 or .score != (.score | floor) then "score must be a positive integer"
          else empty end;
        def dups(f): [.[] | objects | f | strings | ascii_downcase | select(. != "")] | group_by(.) | map(select(length > 1)[0]);
        def scores($k): [.[] | objects | select([.name, .username] == $k) | .score | numbers] | sort | reverse;
        . as $head
        | (if length == 0 then "\($f): must not be empty" else empty end),
          (.[] | . as $e | problem | "\($f): \($e | tojson): \(.)"),
          ((dups(.name) - ($base | dups(.name)))[] | "\($f): duplicate name \(tojson)"),
          ((dups(.username) - ($base | dups(.username)))[] | "\($f): duplicate username \(tojson)"),
          ($base | group_by([.name, .username])[] | [.[0].name, .[0].username] as $k | (scores($k)) as $b
            | ($head | scores($k)) as $h
            | if ($h | length) < ($b | length) then "\($f): entry removed: \($k[0]) (\($k[1]))"
              elif any(range($b | length); $h[.] < $b[.]) then "\($f): score lowered: \($k[0]) (\($k[1]))"
              else empty end)' "$tmp/head.json"); then
        errors+=("$f: could not be checked"); continue
      fi
      [ -z "$out" ] || errors+=("$out")
    done
    [ ${#errors[@]} -eq 0 ] || { printf '%s\n' "${errors[@]}"; exit 1; }
    ;;
  *) echo "usage: $0 match <pr> | validate <base> <head>" >&2; exit 2 ;;
esac
