#!/usr/bin/env bash
set -euo pipefail

echo "=== ethereum.org local setup check ==="
echo

# 1. Node.js version vs .nvmrc
echo "[1/4] Checking Node.js version..."
NVMRC_FILE=".nvmrc"
if [ -f "${NVMRC_FILE}" ]; then
  EXPECTED_NODE_VERSION="$(tr -d '[:space:]' < "${NVMRC_FILE}")"
  echo "Expected Node version from ${NVMRC_FILE}: ${EXPECTED_NODE_VERSION}"
else
  echo "No .nvmrc file found at the repository root."
  EXPECTED_NODE_VERSION=""
fi

if command -v node >/dev/null 2>&1; then
  NODE_VERSION_RAW="$(node --version 2>&1 || true)"
  echo "Detected Node: ${NODE_VERSION_RAW}"
else
  echo "Node.js is not installed or not in PATH."
fi

echo

# 2. pnpm and Corepack
echo "[2/4] Checking pnpm / Corepack..."
if command -v corepack >/dev/null 2>&1; then
  echo "corepack detected."
else
  echo "corepack not found. Consider installing Node.js with corepack support."
fi

if command -v pnpm >/dev/null 2>&1; then
  echo "pnpm detected: $(pnpm --version 2>/dev/null || echo 'version unknown')"
else
  echo "pnpm not found. You may need to enable it via corepack:"
  echo "  corepack enable"
fi

echo

# 3. Docker (optional, for preview / infra-related tasks)
echo "[3/4] Checking Docker..."
if command -v docker >/dev/null 2>&1; then
  echo "docker command found."
  if docker info >/dev/null 2>&1; then
    echo "Docker daemon appears to be running."
  else
    echo "Docker daemon is not running or not reachable."
  fi
else
  echo "Docker is not installed or not in PATH. This is fine for many content-only"
  echo "contributions, but required for some infrastructure or preview workflows."
fi

echo

# 4. Basic scripts presence
echo "[4/4] Checking package.json scripts..."
if [ -f "package.json" ]; then
  echo "package.json found. Commonly used scripts include:"
  echo "  pnpm dev      # run local development server"
  echo "  pnpm lint     # run linters (name may change over time)"
  echo "  pnpm test     # run tests (if configured)"
  echo
  echo "Use 'cat package.json' or your editor to inspect the exact script names."
else
  echo "package.json not found. Are you in the repository root?"
fi

echo
echo "Local setup check finished."
echo "Compare the information above with the requirements in the README and"
echo "fix any missing tools or configuration before opening a pull request."
