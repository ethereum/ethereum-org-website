#!/usr/bin/env bash
# Deterministic PR checks the reviewer used to do by eye. Usage: pr-content-checks.sh <base-ref>
#   intl keys: English keys the PR leaves unreferenced (compared with the base, so dynamically built keys don't count)
#   links:     URLs the PR adds to English content, data or intl files that are gone (404/410) or whose host doesn't resolve; bot blocks (403/429) pass
set -euo pipefail

base=$(git merge-base "${1:?base ref}" HEAD)
failed=0

literals() {
  git grep -hoE "[\"'\`][a-z0-9][a-z0-9_.-]*[\"'\`]" "$1" -- src app ':!src/intl' | tr -d "\"'\`" | sort -u
}

# Prints "<key> <file>" for each English key no source literal mentions.
unreferenced() {
  local ref=$1
  for f in $(git ls-tree --name-only "$ref" src/intl/en/); do
    git show "$ref:$f" | jq -r --arg f "$f" 'keys[] | "\(.) \($f)"'
  done | grep -vE '^(language|region)-' | awk 'NR == FNR { lit[$0]; next } !($1 in lit)' <(literals "$ref") - | sort
}

orphaned=$(comm -13 <(unreferenced "$base") <(unreferenced HEAD))
if [ -n "$orphaned" ]; then
  failed=1
  while read -r key file; do
    echo "::error file=$file::Intl key \"$key\" is no longer referenced; remove it from src/intl/en/ (translations follow via the pipeline)"
  done <<<"$orphaned"
fi

urls=$(git diff -U0 "$base" HEAD -- 'public/content/*.md' ':!public/content/translations' 'src/data' 'src/intl/en' \
  | grep -E '^\+[^+]' | grep -oE 'https?://[^][[:space:]"'"'"'<>`(){}|\\^]+' | sed -E 's/[.,;:!?*]+$//' | sort -u \
  | grep -vE '^https?://(localhost|127\.0\.0\.1|example\.(com|org))([:/]|$)' || true)
while read -r url; do
  [ -n "$url" ] || continue
  code=$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 20 -A "Mozilla/5.0 (link check; ethereum.org CI)" "$url" 2>/dev/null) && rc=0 || rc=$?
  if [ "$code" = 404 ] || [ "$code" = 410 ] || [ "$rc" = 6 ]; then
    failed=1
    echo "::error::Added link is broken (${code/000/host not found}): $url"
  elif [ "$code" = 000 ]; then
    echo "::warning::Added link could not be checked (curl exit $rc): $url"
  fi
done <<<"$urls"

exit "$failed"
