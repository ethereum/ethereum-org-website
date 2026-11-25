#!/usr/bin/env bash
# Usage: pr-content-checks.sh <base-ref>. Set HEAD_REF to the PR's head branch (defaults to the current branch).
# Fails on English intl keys the PR leaves unreferenced; everything else is a warning (flaky hosts, judgment calls).
set -euo pipefail
export LC_ALL=C

base=$(git merge-base "${1:?base ref}" HEAD)
head_ref=${HEAD_REF:-$(git rev-parse --abbrev-ref HEAD)}
intl_keys=(node_modules/.bin/tsx src/scripts/intl-keys.ts)
status=0

base_root=$(mktemp -d)
trap 'rm -rf "$base_root"' EXIT
git archive "$base" app src ':(exclude)src/intl' | tar -x -C "$base_root"
git archive "$base" src/intl/en | tar -x -C "$base_root"
git ls-tree -d -r --name-only "$base" public/content | grep -v '^public/content/translations' | (cd "$base_root" && xargs -r mkdir -p)

base_orphans=$("${intl_keys[@]}" orphans "$base_root" | sort)
head_orphans=$("${intl_keys[@]}" orphans . | sort)
while read -r ns key; do
  [ -n "$key" ] || continue
  echo "::error file=src/intl/en/$ns.json::Intl key \"$key\" is no longer referenced. Remove it from src/intl/en/ (translations follow via the pipeline), or if code builds it dynamically, teach findOrphanedKeys in src/scripts/intl-keys.ts the key family"
  status=1
done < <(comm -13 <(echo "$base_orphans") <(echo "$head_orphans"))

while read -r ns key message; do
  [ -n "$ns" ] || continue
  echo "::warning file=src/intl/en/$ns.json::Intl key \"$key\" $message"
done < <("${intl_keys[@]}" message-diff "$base_root" .)

if [[ $head_ref != intl/* ]]; then
  while read -r file; do
    [ -n "$file" ] || continue
    echo "::warning file=$file::Translations are written by the intl pipeline. Revert this unless it fixes a translation error whose English source hasn't changed"
  done < <(git diff --name-only "$base" HEAD -- public/content/translations src/intl ':(exclude)src/intl/en')
fi

existing_blobs=$(git ls-tree -r "$base" -- public | awk '$2 == "blob" { split($0, p, "\t"); print $3 "\t" p[2] }')
while read -r file; do
  [ -n "$file" ] || continue
  dupes=$(awk -F'\t' -v sha="$(git rev-parse "HEAD:$file")" '$1 == sha { print $2 }' <<<"$existing_blobs" | paste -sd ' ')
  [ -z "$dupes" ] || echo "::warning file=$file::Added image is identical to $dupes; reference the existing file instead"
done < <(git diff --name-only --diff-filter=A "$base" HEAD -- public | grep -iE '\.(png|jpe?g|gif|webp|avif|svg)$' || true)

urls=$(git diff -U0 "$base" HEAD -- 'public/content/*.md' ':!public/content/translations' 'src/data' 'src/intl/en' \
  | grep -E '^\+[^+]' | grep -oE 'https?://[^][[:space:]"'"'"'<>`(){}|\\^]+' | sed -E 's/[.,;:!?*]+$//' | sort -u \
  | grep -vE '^https?://(localhost|127\.0\.0\.1|example\.(com|org))([:/]|$)|\$$' || true)
while read -r url; do
  [ -n "$url" ] || continue
  if [[ $url =~ [?\&]utm_ ]]; then
    echo "::warning::Added link carries tracking parameters (utm_*); drop them: $url"
  fi
  code=$(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 20 -A "Mozilla/5.0 (link check; ethereum.org CI)" "$url" 2>/dev/null) && rc=0 || rc=$?
  if [ "$code" = 404 ] || [ "$code" = 410 ] || [ "$rc" = 6 ]; then
    echo "::warning::Added link looks broken (${code/000/host not found}): $url"
  elif [ "$code" = 000 ]; then
    echo "::warning::Added link could not be checked (curl exit $rc): $url"
  fi
done <<<"$urls"

exit "$status"
