#!/usr/bin/env bash
set -uo pipefail

ROOT="${1:-.}"
CI_MODE="${CI_MODE:-false}"

echo "🔍 Checking for build-unsafe Next.js cache usage"
echo

RG_FLAGS=(
  --line-number
  --hidden
  --follow
  --glob '!.git/**'
  --glob '!.next/**'
  --glob '!node_modules/**'
  --glob '!dist/**'
  --glob '!build/**'
  --glob '!check-no-next-cache.sh'
  --glob '!scan-next-no-cache.sh'
  --glob '!README.md'
  --glob '!**/*.md'
)

FAIL=0

run_check () {
  local TITLE="$1"
  local PATTERN="$2"

  echo "== $TITLE =="
  if rg "${RG_FLAGS[@]}" "$PATTERN" "$ROOT"; then
    echo
    FAIL=1
  else
    echo "✓ none found"
    echo
  fi
}

# 🚫 ENDAST detta är förbjudet
run_check \
  "Static import of revalidatePath/revalidateTag from next/cache (FORBIDDEN)" \
  "import\s+\{[^}]*revalidate(Tag|Path)[^}]*\}\s+from\s+['\"]next/cache['\"]"

if [[ "$FAIL" -eq 1 ]]; then
  echo "❌ Build-unsafe Next.js cache usage found."
  if [[ "$CI_MODE" == "true" ]]; then
    exit 1
  else
    echo "ℹ️  Local mode: not exiting shell"
  fi
else
  echo "✅ Safe: no build-breaking Next.js cache usage found."
fi
#!/usr/bin/env bash
set -uo pipefail

ROOT="${1:-.}"
CI_MODE="${CI_MODE:-false}"

echo "🔍 Checking for build-unsafe Next.js cache usage"
echo

RG_FLAGS=(
  --line-number
  --hidden
  --follow
  --glob '!.git/**'
  --glob '!.next/**'
  --glob '!node_modules/**'
  --glob '!dist/**'
  --glob '!build/**'
  --glob '!check-no-next-cache.sh'
  --glob '!scan-next-no-cache.sh'
  --glob '!README.md'
  --glob '!**/*.md'
)

FAIL=0

run_check () {
  local TITLE="$1"
  local PATTERN="$2"

  echo "== $TITLE =="
  if rg "${RG_FLAGS[@]}" "$PATTERN" "$ROOT"; then
    echo
    FAIL=1
  else
    echo "✓ none found"
    echo
  fi
}

# 🚫 ENDAST detta är förbjudet
run_check \
  "Static import of revalidatePath/revalidateTag from next/cache (FORBIDDEN)" \
  "import\s+\{[^}]*revalidate(Tag|Path)[^}]*\}\s+from\s+['\"]next/cache['\"]"

if [[ "$FAIL" -eq 1 ]]; then
  echo "❌ Build-unsafe Next.js cache usage found."
  if [[ "$CI_MODE" == "true" ]]; then
    exit 1
  else
    echo "ℹ️  Local mode: not exiting shell"
  fi
else
  echo "✅ Safe: no build-breaking Next.js cache usage found."
fi
