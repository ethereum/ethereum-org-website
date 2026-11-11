#!/usr/bin/env bash
# Warns about English intl keys the PR leaves unreferenced and added links that are gone. Usage: pr-content-checks.sh <base-ref>
# Warnings only: dynamically built keys and flaky hosts make both checks heuristic.
set -euo pipefail

base=$(git merge-base "${1:?base ref}" HEAD)

literals() {
  git grep -hoE "[\"'\`][^\"'\`[:space:]]+[\"'\`]" "$1" -- src app ':!src/intl' | tr -d "\"'\`" | sort -u
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
  while read -r key file; do
    echo "::warning file=$file::Intl key \"$key\" looks unreferenced; if nothing builds it dynamically, remove it from src/intl/en/ (translations follow via the pipeline)"
  done <<<"$orphaned"
fi

urls=$(git diff -U0 "$base" HEAD -- 'public/content/*.md' ':!public/content/translations' 'src/data' 'src/intl/en' \
  | grep -E '^\+[^+]' | grep -oE 'https?://[^][[:space:]"'"'"'<>`(){}|\\^]+' | sed -E 's/[.,;:!?*]+$//' | sort -u \
  | grep -vE '^https?://(localhost|127\.0\.0\.1|example\.(com|org))([:/]|$)|\$$' || true)
while read -r url; do
  [ -n "$url" ] || continue
  code=$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 20 -A "Mozilla/5.0 (link check; ethereum.org CI)" "$url" 2>/dev/null) && rc=0 || rc=$?
  if [ "$code" = 404 ] || [ "$code" = 410 ] || [ "$rc" = 6 ]; then
    echo "::warning::Added link looks broken (${code/000/host not found}): $url"
  elif [ "$code" = 000 ]; then
    echo "::warning::Added link could not be checked (curl exit $rc): $url"
  fi
done <<<"$urls"
