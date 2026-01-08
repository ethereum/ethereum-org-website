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

REPO="ethereum/ethereum-org-website"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

cmd_preflight() {
  log_info "Running pre-flight checks..."

  # Check current branch
  CURRENT_BRANCH=$(git branch --show-current)
  if [[ "$CURRENT_BRANCH" != "dev" ]]; then
    log_error "Must be on 'dev' branch. Currently on: $CURRENT_BRANCH"
    exit 1
  fi
  log_info "✓ On dev branch"

  # Check clean working tree
  if [[ -n $(git status --porcelain) ]]; then
    log_error "Working tree is not clean. Commit or stash changes first."
    exit 1
  fi
  log_info "✓ Working tree clean"

  # Check gh auth
  if ! gh auth status &>/dev/null; then
    log_error "GitHub CLI not authenticated. Run 'gh auth login' first."
    exit 1
  fi
  log_info "✓ GitHub CLI authenticated"

  # Fetch latest from origin
  log_info "Fetching latest from origin..."
  git fetch origin

  # Back-merge: master -> staging (if needed)
  log_info "Checking if master needs to be merged into staging..."
  MASTER_AHEAD=$(git rev-list --count origin/staging..origin/master)
  if [[ "$MASTER_AHEAD" -gt 0 ]]; then
    log_info "Merging origin/master into staging ($MASTER_AHEAD commits)..."
    git checkout staging
    git merge origin/master -m "Merge master into staging"
    git push origin staging
    git checkout dev
  else
    log_info "✓ staging is up to date with master"
  fi

  # Back-merge: staging -> dev (if needed)
  log_info "Checking if staging needs to be merged into dev..."
  STAGING_AHEAD=$(git rev-list --count origin/dev..origin/staging)
  if [[ "$STAGING_AHEAD" -gt 0 ]]; then
    log_info "Merging origin/staging into dev ($STAGING_AHEAD commits)..."
    git merge origin/staging -m "Merge staging into dev"
    git push origin dev
  else
    log_info "✓ dev is up to date with staging"
  fi

  # Pull latest dev
  log_info "Pulling latest origin/dev..."
  git pull origin dev

  log_info "✓ Pre-flight checks complete"
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

  log_info "Bumping $VERSION_TYPE version..."
  pnpm version "$VERSION_TYPE"

  NEW_VERSION=$(node -p "require('./package.json').version")
  log_info "New version: v$NEW_VERSION"

  log_info "Pushing to origin with tags..."
  git push origin dev --follow-tags

  echo "$NEW_VERSION"
}

cmd_merge_staging() {
  log_info "Merging dev into staging..."

  git checkout staging
  git merge dev -m "Merge dev into staging for release"
  git push origin staging
  git checkout dev

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
    exit 1
    ;;
esac
