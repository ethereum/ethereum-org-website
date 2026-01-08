#!/usr/bin/env bash
set -euo pipefail

# Prepare Release Script
# Handles deterministic git/gh operations for ethereum.org releases
#
# Usage:
#   ./src/scripts/prepare-release.sh preflight          # Run pre-flight checks and back-merge sync
#   ./src/scripts/prepare-release.sh version <type>     # Bump version (major|minor|patch) and push
#   ./src/scripts/prepare-release.sh merge-staging      # Merge dev into staging
#   ./src/scripts/prepare-release.sh fetch-draft        # Fetch draft release body
#   ./src/scripts/prepare-release.sh publish <version> <draft_tag> <body_file>  # Publish release
#   ./src/scripts/prepare-release.sh create-pr <version> <body_file>            # Create deploy PR
#   ./src/scripts/prepare-release.sh cleanup            # Remove worktree if created

REPO="ethereum/ethereum-org-website"

# Worktree configuration
REPO_ROOT=$(git rev-parse --show-toplevel)
WORKTREE_BASE="${PREPARE_RELEASE_WORKTREE_BASE:-/tmp/claude/worktrees}"
WORKTREE_DIR="${WORKTREE_BASE}/ethereum-org-dev"
WORKTREE_MARKER="/tmp/claude/prepare-release-worktree"
USING_WORKTREE=false
WORK_DIR=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Setup worktree for dev branch if not already on dev
setup_worktree() {
  CURRENT_BRANCH=$(git branch --show-current)

  if [[ "$CURRENT_BRANCH" == "dev" ]]; then
    WORK_DIR="$REPO_ROOT"
    log_info "✓ Already on dev branch"
    return 0
  fi

  log_info "Not on dev branch (on: $CURRENT_BRANCH). Setting up worktree..."

  # Create worktree base directory if needed
  mkdir -p "$WORKTREE_BASE"

  # Check if worktree already exists
  if [[ -d "$WORKTREE_DIR" ]]; then
    # Verify it's a valid worktree
    if git worktree list | grep -q "$WORKTREE_DIR"; then
      log_info "Using existing worktree at $WORKTREE_DIR"
    else
      # Directory exists but isn't a worktree - clean it up
      log_warn "Cleaning up stale worktree directory..."
      rm -rf "$WORKTREE_DIR"
      git worktree add "$WORKTREE_DIR" dev
      log_info "Created worktree at $WORKTREE_DIR"
    fi
  else
    git worktree add "$WORKTREE_DIR" dev
    log_info "Created worktree at $WORKTREE_DIR"
  fi

  WORK_DIR="$WORKTREE_DIR"
  USING_WORKTREE=true

  # Store marker so cleanup knows worktree was created this session
  mkdir -p /tmp/claude
  echo "$WORKTREE_DIR" > "$WORKTREE_MARKER"

  log_info "✓ Worktree ready at $WORKTREE_DIR"
}

# Run a command in the work directory (worktree or repo root)
run_in_workdir() {
  if [[ -z "$WORK_DIR" ]]; then
    log_error "WORK_DIR not set. Run preflight first."
    exit 1
  fi
  (cd "$WORK_DIR" && "$@")
}

# Cleanup worktree
cmd_cleanup() {
  if [[ -f "$WORKTREE_MARKER" ]]; then
    local worktree_path
    worktree_path=$(cat "$WORKTREE_MARKER")
    if [[ -d "$worktree_path" ]]; then
      log_info "Removing worktree at $worktree_path..."
      git worktree remove "$worktree_path" --force 2>/dev/null || true
      log_info "✓ Worktree removed"
    fi
    rm -f "$WORKTREE_MARKER"
  else
    log_info "No worktree to clean up"
  fi
}

cmd_preflight() {
  log_info "Running pre-flight checks..."

  # Check gh auth first (doesn't require being in worktree)
  if ! gh auth status &>/dev/null; then
    log_error "GitHub CLI not authenticated. Run 'gh auth login' first."
    exit 1
  fi
  log_info "✓ GitHub CLI authenticated"

  # Setup worktree if not on dev
  setup_worktree

  # Check clean working tree in the work directory
  if [[ -n $(run_in_workdir git status --porcelain) ]]; then
    log_error "Working tree is not clean. Commit or stash changes first."
    exit 1
  fi
  log_info "✓ Working tree clean"

  # Fetch latest from origin
  log_info "Fetching latest from origin..."
  run_in_workdir git fetch origin

  # Back-merge: master -> staging (if needed)
  log_info "Checking if master needs to be merged into staging..."
  MASTER_AHEAD=$(run_in_workdir git rev-list --count origin/staging..origin/master)
  if [[ "$MASTER_AHEAD" -gt 0 ]]; then
    log_info "Merging origin/master into staging ($MASTER_AHEAD commits)..."
    run_in_workdir git checkout staging
    run_in_workdir git merge origin/master -m "Merge master into staging"
    run_in_workdir git push origin staging
    run_in_workdir git checkout dev
  else
    log_info "✓ staging is up to date with master"
  fi

  # Back-merge: staging -> dev (if needed)
  log_info "Checking if staging needs to be merged into dev..."
  STAGING_AHEAD=$(run_in_workdir git rev-list --count origin/dev..origin/staging)
  if [[ "$STAGING_AHEAD" -gt 0 ]]; then
    log_info "Merging origin/staging into dev ($STAGING_AHEAD commits)..."
    run_in_workdir git merge origin/staging -m "Merge staging into dev"
    run_in_workdir git push origin dev
  else
    log_info "✓ dev is up to date with staging"
  fi

  # Pull latest dev
  log_info "Pulling latest origin/dev..."
  run_in_workdir git pull origin dev

  log_info "✓ Pre-flight checks complete"

  # Output the work directory for subsequent commands
  echo "WORK_DIR=$WORK_DIR"
}

cmd_version() {
  local VERSION_TYPE="${1:-}"

  if [[ -z "$VERSION_TYPE" ]]; then
    log_error "Version type required: major, minor, or patch"
    exit 1
  fi

  if [[ ! "$VERSION_TYPE" =~ ^(major|minor|patch)$ ]]; then
    log_error "Invalid version type: $VERSION_TYPE. Must be major, minor, or patch"
    exit 1
  fi

  # Ensure we're working in the right directory
  setup_worktree

  log_info "Bumping $VERSION_TYPE version..."
  run_in_workdir pnpm version "$VERSION_TYPE"

  NEW_VERSION=$(run_in_workdir node -p "require('./package.json').version")
  log_info "New version: v$NEW_VERSION"

  log_info "Pushing to origin with tags..."
  run_in_workdir git push origin dev --follow-tags

  echo "$NEW_VERSION"
}

cmd_merge_staging() {
  # Ensure we're working in the right directory
  setup_worktree

  log_info "Merging dev into staging..."

  run_in_workdir git checkout staging
  run_in_workdir git merge dev -m "Merge dev into staging for release"
  run_in_workdir git push origin staging
  run_in_workdir git checkout dev

  log_info "✓ dev merged into staging"
}

cmd_fetch_draft() {
  log_info "Fetching draft release..."

  # Get all releases and find the draft one
  DRAFT_RELEASE=$(gh release list --repo "$REPO" --json tagName,isDraft,body,name --limit 10 | \
    node -e "
      const data = JSON.parse(require('fs').readFileSync(0, 'utf8'));
      const draft = data.find(r => r.isDraft);
      if (!draft) {
        console.error('No draft release found');
        process.exit(1);
      }
      console.log(JSON.stringify(draft));
    ")

  if [[ -z "$DRAFT_RELEASE" ]]; then
    log_error "No draft release found. Ensure Release Drafter workflow has run."
    exit 1
  fi

  echo "$DRAFT_RELEASE"
}

cmd_publish() {
  local VERSION="${1:-}"
  local DRAFT_TAG="${2:-}"
  local BODY_FILE="${3:-}"

  if [[ -z "$VERSION" || -z "$DRAFT_TAG" || -z "$BODY_FILE" ]]; then
    log_error "Usage: prepare-release.sh publish <version> <draft_tag> <body_file>"
    exit 1
  fi

  if [[ ! -f "$BODY_FILE" ]]; then
    log_error "Body file not found: $BODY_FILE"
    exit 1
  fi

  log_info "Publishing release v$VERSION..."

  gh release edit "$DRAFT_TAG" \
    --repo "$REPO" \
    --tag "v$VERSION" \
    --title "v$VERSION" \
    --notes-file "$BODY_FILE" \
    --draft=false \
    --latest

  log_info "✓ Release v$VERSION published"
  echo "https://github.com/$REPO/releases/tag/v$VERSION"
}

cmd_create_pr() {
  local VERSION="${1:-}"
  local BODY_FILE="${2:-}"

  if [[ -z "$VERSION" || -z "$BODY_FILE" ]]; then
    log_error "Usage: prepare-release.sh create-pr <version> <body_file>"
    exit 1
  fi

  if [[ ! -f "$BODY_FILE" ]]; then
    log_error "Body file not found: $BODY_FILE"
    exit 1
  fi

  log_info "Creating deploy PR for v$VERSION..."

  PR_URL=$(gh pr create \
    --repo "$REPO" \
    --base master \
    --head staging \
    --title "Deploy v$VERSION" \
    --body-file "$BODY_FILE")

  log_info "✓ Deploy PR created"
  echo "$PR_URL"
}

# Main command router
case "${1:-}" in
  preflight)
    cmd_preflight
    ;;
  version)
    cmd_version "${2:-}"
    ;;
  merge-staging)
    cmd_merge_staging
    ;;
  fetch-draft)
    cmd_fetch_draft
    ;;
  publish)
    cmd_publish "${2:-}" "${3:-}" "${4:-}"
    ;;
  create-pr)
    cmd_create_pr "${2:-}" "${3:-}"
    ;;
  cleanup)
    cmd_cleanup
    ;;
  *)
    echo "Usage: $0 <command> [args]"
    echo ""
    echo "Commands:"
    echo "  preflight              Run pre-flight checks and back-merge sync"
    echo "  version <type>         Bump version (major|minor|patch) and push"
    echo "  merge-staging          Merge dev into staging"
    echo "  fetch-draft            Fetch draft release body (JSON)"
    echo "  publish <ver> <tag> <body_file>   Publish release"
    echo "  create-pr <ver> <body_file>       Create deploy PR"
    echo "  cleanup                Remove worktree if created"
    exit 1
    ;;
esac
