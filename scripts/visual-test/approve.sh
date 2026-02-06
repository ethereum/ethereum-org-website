#!/bin/bash
set -e

BUCKET="${VISUAL_TEST_BUCKET:-eth-org-visual-baselines}"
ENDPOINT="${S3_ENDPOINT:-}"
ENDPOINT_FLAG=""
if [ -n "$ENDPOINT" ]; then
  ENDPOINT_FLAG="--endpoint-url $ENDPOINT"
fi

# Get current PR number from git branch
BRANCH=$(git branch --show-current)
PR=$(gh pr view "$BRANCH" --json number --jq '.number' 2>/dev/null || echo "")

if [ -z "$PR" ]; then
  echo "No PR found for branch $BRANCH"
  echo "Usage: Provide PR number as argument"
  PR=$1
fi

if [ -z "$PR" ]; then
  echo "Error: Could not determine PR number"
  exit 1
fi

echo "Promoting pending screenshots for PR #$PR to baselines..."

# Copy pending to baselines
aws s3 sync \
  "s3://${BUCKET}/pending/${PR}/" \
  "s3://${BUCKET}/baselines/" \
  $ENDPOINT_FLAG

# Update metadata
aws s3 cp "s3://${BUCKET}/metadata/${PR}.json" /tmp/metadata.json $ENDPOINT_FLAG
GIT_USER_NAME="$(git config user.name)" node -e "
  const m = require('/tmp/metadata.json');
  const approver = process.env.GIT_USER_NAME;
  m.changes.forEach(c => {
    if (c.status === 'pending') {
      c.status = 'approved';
      c.approvedBy = approver;
      c.approvedAt = new Date().toISOString();
    }
  });
  m.summary.approved = m.changes.filter(c => c.status === 'approved').length;
  m.summary.pending = m.changes.filter(c => c.status === 'pending').length;
  m.updatedAt = new Date().toISOString();
  require('fs').writeFileSync('/tmp/metadata.json', JSON.stringify(m, null, 2));
"
aws s3 cp /tmp/metadata.json "s3://${BUCKET}/metadata/${PR}.json" $ENDPOINT_FLAG

echo "Done. Baselines updated. Push or re-run CI to validate."
