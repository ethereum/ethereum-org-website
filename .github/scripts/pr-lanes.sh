#!/usr/bin/env bash
# Reads changed file paths (one per line) on stdin and prints the PR's review lanes and risk floor as
# JSON: {"lanes": [...], "floor": "R0-R3", "floorReason": "..."}. Deterministic: the first-pass
# reviewer gets its lanes from here, and the review job raises the model's risk to this floor.
set -euo pipefail

jq -R -s '
  def lane:
    if test("^public/content/translations/") or (test("^src/intl/") and (test("^src/intl/en/") | not)) then "translation"
    elif test("^public/content/.*\\.mdx?$") or test("^src/intl/en/") then "content"
    elif test("^src/data/") then "data"
    elif test("^(package\\.json|pnpm-lock\\.yaml)$") then "deps"
    elif test("^docs/") or test("^(README|CONTRIBUTING)") then "docs"
    elif test("^\\.github/") or test("^src/scripts/") or test("^[^/]+\\.(config\\.[cm]?[jt]s|toml|json|ya?ml)$") or test("^\\.[^/]+$") then "tooling"
    else "code" end;
  def floor:
    if test("^(netlify\\.toml|next\\.config\\.[cm]?[jt]s|redirects\\.config\\.[cm]?js|proxy\\.ts)$") or test("^\\.github/workflows/") then 3
    elif test("^\\.github/") or test("^(package\\.json|pnpm-lock\\.yaml)$") then 2
    else 0 end;
  [split("\n")[] | select(. != "")] as $files
  | ($files | map(lane) | unique) as $l
  | ($files | map({f: ., r: floor}) | max_by(.r) // {f: null, r: 0}) as $top
  | {
      lanes: ["tooling", "code", "data", "content", "translation", "deps", "docs"] | map(select(. as $x | $l | index($x))),
      floor: "R\($top.r)",
      floorReason: (if $top.r > 0 then $top.f else "" end)
    }'
