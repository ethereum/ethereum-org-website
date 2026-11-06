#!/usr/bin/env bash
# Reads changed file paths (one per line) on stdin and prints the PR's minimum risk as JSON:
# {"floor": "R0-R3", "floorReason": "<path>"}. The review job raises the model's risk to this
# floor, so PR text can't talk the reviewer below it for sensitive paths.
set -euo pipefail

jq -R -s '
  def floor:
    if test("^(netlify\\.toml|next\\.config\\.[cm]?[jt]s|redirects\\.config\\.[cm]?js|proxy\\.ts)$") or test("^\\.github/workflows/") then 3
    elif test("^\\.github/") or test("^(package\\.json|pnpm-lock\\.yaml)$") then 2
    else 0 end;
  ([split("\n")[] | select(. != "") | {f: ., r: floor}] | max_by(.r) // {f: null, r: 0}) as $top
  | {floor: "R\($top.r)", floorReason: (if $top.r > 0 then $top.f else "" end)}'
