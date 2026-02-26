---
title: "Crowdin File Path Mapping Bugs and Translation Review Workflow"
date: 2026-02-21
category: integration-issues
tags:
  - crowdin
  - translations
  - i18n
  - file-path-matching
  - sanitizer
  - worktree
  - automation
  - permissions
severity: high
component: crowdin-import-pipeline
symptoms:
  - "Translated files placed at incorrect paths (e.g., cs/beacon-chain/ instead of cs/roadmap/beacon-chain/)"
  - "Systematic translation errors: AI replaced with UI, semantic inversions"
  - "Orphaned translation files with no corresponding English source"
  - "Inaccurate fix count logging in sanitizer output"
  - "Cross-block href replacements affecting wrong sections"
  - "Build failures in worktrees due to missing .env.local"
  - "Merge conflicts discovered only at push time"
root_causes:
  - "findCrowdinFile() used .endsWith() for path matching, producing false matches on similarly named paths"
  - "Crowdin/Gemini translation engine confusing acronyms and inverting meaning"
  - "Sanitizer tracked in-memory transforms instead of actual disk changes"
  - "Href replacement applied globally instead of per-block"
  - "No .env.local in worktrees (USE_MOCK_DATA not set)"
  - "PR branches diverged from dev without early merge"
status: solved
related_prs:
  - 17547
  - 17553
  - 17556
  - 17182
---

# Crowdin File Path Mapping Bugs and Translation Review Workflow

## Problem Summary

During Phase 2 of the translation review pipeline (Czech pilot), we discovered that 12 Czech translation files were placed at incorrect filesystem paths. Investigation revealed the root cause in the Crowdin import workflow's path matching logic. Additionally, we established a reproducible worktree-based workflow for reviewing translation PRs and cataloged all permissions needed for automation.

## Root Cause Analysis

### Misplaced Translation Files

**File:** `src/scripts/i18n/lib/crowdin/files.ts`

The `findCrowdinFile()` function used `.endsWith()` to match Crowdin file paths against expected content paths:

```ts
// BROKEN: matches too broadly
const found = crowdinFiles.find(({ path }) =>
  path.endsWith(targetFile.filePath)
)
```

When looking for `public/content/roadmap/beacon-chain/index.md`, this matched `cs/beacon-chain/index.md` because the suffix `beacon-chain/index.md` is valid for both. The `roadmap/` parent directory was silently ignored.

**Data flow of the bug:**

```
GitHub file path                  findCrowdinFile()           processedFileIdToPath        Download destination
public/content/roadmap/     -->   .endsWith() matches    -->  Stores wrong Crowdin    -->  cs/beacon-chain/
  beacon-chain/index.md           cs/beacon-chain/             path for this fileId         index.md (WRONG)
```

**12 Czech files affected:**

| Wrong Location | Correct Location |
|---|---|
| `cs/account-abstraction/` | `cs/roadmap/account-abstraction/` |
| `cs/beacon-chain/` | `cs/roadmap/beacon-chain/` |
| `cs/danksharding/` | `cs/roadmap/danksharding/` |
| `cs/future-proofing/` | `cs/roadmap/future-proofing/` |
| `cs/scaling/` | `cs/roadmap/scaling/` |
| `cs/statelessness/` | `cs/roadmap/statelessness/` |
| `cs/user-experience/` | `cs/roadmap/user-experience/` |
| `cs/withdrawals/` | `cs/staking/withdrawals/` |
| `cs/dvt/` | `cs/staking/dvt/` |
| `cs/support/` | `cs/community/support/` |
| `cs/code-of-conduct/` | `cs/community/code-of-conduct/` |
| `cs/developers/docs/wrapped-eth/` | `cs/wrapped-eth/` |

### Translation Quality Issues

Crowdin/Gemini translation engine produced two categories of critical error:

1. **Acronym confusion**: "AI" systematically replaced with "UI" (5 instances in `cs/ai-agents/index.md`)
2. **Semantic inversion**: "malicious intent" translated as "good intentions" in `cs/bridges/index.md`

### Sanitizer Logging Inaccuracy

Individual fix functions returned `fixCount` based on in-memory transforms, not actual disk changes. Reported "22 files modified" when no bytes were written.

### Cross-Block Href Interference

`fixTranslatedHrefs()` applied replacements globally. When `/developers/docs/evm` appeared in both an EVM block and an Oracles block, the global replacement changed the correct href in the EVM block.

## Solutions Implemented

### Fix 1: Stricter Path Matching in findCrowdinFile()

**File:** `src/scripts/i18n/lib/crowdin/files.ts`
**Branch:** `fix-i18n-workflow`

```ts
// 1. Exact match first (after normalizing leading slashes)
const exactMatch = crowdinFiles.find(
  ({ path }) => path.replace(/^\/+/, "") === normalizedTarget
)
if (exactMatch) return exactMatch

// 2. Suffix match with "/" boundary guard
const suffixMatches = crowdinFiles.filter(({ path }) => {
  const normalized = path.replace(/^\/+/, "")
  if (!normalized.endsWith(normalizedTarget)) return false
  const prefixLength = normalized.length - normalizedTarget.length
  if (prefixLength === 0) return true
  return normalized[prefixLength - 1] === "/"
})

// 3. Prefer longest (most specific) match
suffixMatches.sort((a, b) => b.path.length - a.path.length)
return suffixMatches[0] ?? null
```

### Fix 2: Orphan Detection in Sanitizer

**File:** `src/scripts/i18n/post_import_sanitize.ts`
**Branch:** `fix-review-translations`

For each translated file, derives the expected English source path and checks existence. If missing, searches by filename to suggest the correct location:

```ts
const englishPath = path.join(CONTENT_ROOT, relPathWithinLang)

if (!fs.existsSync(englishPath)) {
  // Search for matching parent/file pattern in English content
  const englishContentFiles = listFiles(CONTENT_ROOT, (f) => {
    if (f.includes(`${path.sep}translations${path.sep}`)) return false
    return f.endsWith(`${path.sep}${parentDir}${path.sep}${basename}`)
  })

  if (englishContentFiles.length === 1) {
    suggestion = `Likely belongs at: ${correctTranslationPath}`
  } else if (englishContentFiles.length > 1) {
    suggestion = `Ambiguous: ${englishContentFiles.length} candidates`
  }
}
```

### Fix 3: Accurate Disk-Write Tracking

**File:** `src/scripts/i18n/post_import_sanitize.ts`

Added `applyFix()` helper that snapshots content before/after each transform, plus `originalOnDisk` comparison:

```ts
function applyFix(
  fn: () => { content: string; fixCount: number },
  label: (count: number) => string
) {
  const snapshot = content
  const result = fn()
  content = result.content
  if (content !== snapshot) {
    issues.push(label(result.fixCount))
  }
}
```

### Fix 4: Block-Scoped Href Replacement

**File:** `src/scripts/i18n/post_import_sanitize.ts`

Track `blockIdx` from detection phase, apply replacements only within the specific block:

```ts
// Detection phase
blockFixes.push({ blockIdx: i, wrong: translatedHref, correct: expectedHref })

// Replacement phase - scoped to block
for (const { blockIdx, wrong, correct } of blockFixes) {
  const originalBlock = translatedBlocks[blockIdx]
  let fixedBlock = originalBlock.replace(markdownRe, `$1${correct}$2`)
  if (fixedBlock !== originalBlock) {
    result = result.replace(originalBlock, fixedBlock)
  }
}
```

## Worktree Workflow for Translation Review

Reproducible 8-step sequence for reviewing a translation PR:

```bash
# 1. Create worktree from PR branch
git worktree add .worktrees/<name> <pr-branch>
cd .worktrees/<name>

# 2. Provide environment variables (USE_MOCK_DATA=true avoids network calls)
cp .env.example .env.local

# 3. Merge latest dev to catch conflicts early
git fetch origin dev && git merge origin/dev
# Resolve conflicts — typically modify/delete for misplaced files

# 4. Copy sanitizer scripts from canonical branch (until merged to dev)
#    Also add franc-min to package.json devDependencies
cp <canonical-branch>/src/scripts/i18n/post_import_sanitize.ts ./src/scripts/i18n/
cp <canonical-branch>/src/scripts/i18n/lib/workflows/sanitization.ts ./src/scripts/i18n/lib/workflows/

# 5. Install dependencies
pnpm install

# 6. Run sanitizer for orphan detection
TARGET_LANGUAGES=<lang> npx ts-node -O '{"module":"commonjs"}' ./src/scripts/i18n/post_import_sanitize.ts

# 7. Run review (critical issues only — no soft suggestions)
# Use /review-translations-local --pr=<NUMBER> --language=<lang>

# 8. Validate build
npx tsc --noEmit                                    # TypeScript check FIRST
NEXT_PUBLIC_BUILD_LOCALES=en,<lang> pnpm build      # Scoped build
```

### Key Notes

- **Always run `npx tsc --noEmit` before `pnpm build`** — catches type errors cheaply
- **`.env.local` is mandatory** — without it, build attempts real API connections and fails
- **Merge dev early** — resolving conflicts before review prevents wasted work
- **Merge conflicts are expected** — misplaced files from prior imports cause modify/delete conflicts; accept the deletion
- **`franc-min` is required** — ESM-only package, needs devDependency until sanitizer changes reach dev

### Tool Reliability: `diff` Command

During cs-part-07 review, `diff` returned empty output comparing two files that were verifiably different (confirmed by reading both files and re-running `diff` with identical arguments, which then returned correct output). Root cause unknown — not conclusively a sandbox issue since the second run succeeded with the same arguments.

**For automation, do not trust empty `diff` output as proof of file equality.** Mitigations:
- Check `diff` exit code explicitly (`0` = identical, `1` = different, `2` = error)
- Use `diff --brief` for a quick same/different check before assuming equality
- When comparing files for migration decisions (orphan dedup), read and verify content directly if `diff` returns empty

## Automation Permissions Required

All sandbox-restricted operations needed for this workflow:

### Git Operations

| Command | Purpose |
|---|---|
| `git worktree add/remove` | Create/destroy isolated review environments |
| `git fetch origin` | Retrieve latest upstream branches |
| `git merge origin/dev` | Integrate dev into PR branch |
| `git stash push/pop` | Temporarily shelve local edits |
| `git rm` | Remove orphaned/misplaced files |
| `git add` / `git commit` | Stage and commit fixes |
| `git push` | Push corrected branch to remote |

### Package Management

| Command | Purpose |
|---|---|
| `pnpm install` | Install dependencies (network + node_modules writes) |

### Script Execution

| Command | Purpose |
|---|---|
| `npx tsc --noEmit` | TypeScript check without emitting |
| `npx ts-node <script>` | Run sanitizer scripts directly |
| `NEXT_PUBLIC_BUILD_LOCALES=en,<lang> pnpm build` | Scoped production build |

### GitHub CLI

| Command | Purpose |
|---|---|
| `gh pr view` | Fetch PR metadata and branch name |
| `gh api repos/{owner}/{repo}/pulls/{PR}/files` | Get PR file list (paginated) |
| `gh pr comment` | Post review findings to PR |

### File Operations (within worktree paths)

| Operation | Purpose |
|---|---|
| `cp` | Copy scripts, .env.example |
| `mkdir -p` | Create correct translation directories |
| `rm` / `rmdir` | Remove misplaced files and empty dirs |

## Prevention Strategies

### Automated Guards

1. **Orphan detection in sanitizer** (implemented) — flags files with no English counterpart
2. **Stricter path matching** (implemented) — exact match with "/" boundary fallback
3. **`npx tsc --noEmit` before build** — cheap TypeScript error screen
4. **Early dev merge** — catches conflicts before review work begins
5. **`.env.example` copy** — ensures mock data mode for local builds

### Requires Human Judgment

1. **Translation semantic accuracy** — AI can flag systematic patterns but native speakers needed for nuance
2. **Merge conflict resolution** — deciding which version to keep requires domain context
3. **Glossary compliance** — community-voted terms are authoritative but context matters

## Review Command Improvements (Noted for Future)

1. **Critical issues only** — no soft suggestions, limit LLM opinion loop
2. **Run `npx tsc --noEmit` before building**
3. **Default `--fix` to true** (or invert to `--no-fix`)

## Cross-References

- [Turkish PR #17182 Review](../translation-review/crowdin-import-review-turkish-pr-17182.md)
- [Scaling Translation Review Pipeline](../translation-review/scaling-translation-review-pipeline.md)
- [Known Patterns Knowledge Base](~/.claude/translation-review/known-patterns.md)
- [Translation Glossary](~/.claude/translation-review/fetch-translation-glossary.json)
- Review command: `.claude/commands/review-translations.md`
- Sanitizer: `src/scripts/i18n/post_import_sanitize.ts`
- Path matching fix: `src/scripts/i18n/lib/crowdin/files.ts`
