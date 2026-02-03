# Agent Context Bible

This directory contains JSON schema files that describe the ethereum.org codebase for AI agent consumption.

## Overview

The Context Bible is a **local-only, AI-specific documentation layer** that helps AI agents understand the ethereum.org repository structure, navigation patterns, content schemas, and design system without needing to explore the entire codebase.

> [!IMPORTANT]
> **This is NOT part of the upstream repository.** All files in `.agent-context/` are gitignored and never committed to the public ethereum.org fork.

## Bootstrap Protocol

The Context Bible uses a **Discovery Beacon** pattern to help agents locate the documentation even when `.agent-context/` is missing.

### How It Works

**Discovery Beacon:** This README.md file serves as the "beacon" that signals the Context Bible is present. When an AI agent instantiates in the ethereum.org repository, it checks for `.agent-context/README.md`:

- **Beacon Present** (README.md exists) → Proceed with normal orientation
- **Beacon Missing** (README.md does NOT exist) → Consult Knowledge Item for directive

### Directive-Based Restoration Flow

When `.agent-context/README.md` is missing:

1. **Query Knowledge Item:** Agent queries the KI titled "Ethereum.org Repository Architecture & Agent Orientation"
2. **Read Directive:** Agent reads the orientation directive explaining that Context Bible should be in `.agent-context/`
3. **Report to Maintainer:** Agent reports that files are missing and cannot auto-restore from KI
4. **Wait for Restoration:** Maintainer manually restores files to `.agent-context/`
5. **Continue Orientation:** Agent proceeds with orientation once files are available

```
Agent Instantiation
        │
        ▼
Check: .agent-context/README.md exists?
        │
    ┌───┴────┐
    ▼        ▼
  YES       NO
    │        │
    │        ▼
    │   Query KI: "Ethereum.org Repository
    │              Architecture & Agent Orientation"
    │        │
    │        ▼
    │   Read directive: "Context Bible is in repo at `.agent-context/`"
    │        │
    │        ▼
    │   Report to maintainer: Files missing, cannot auto-restore
    │        │
    │        ▼
    │   Wait for maintainer to restore files
    └────────┘
```

### Why This Matters

Since `.agent-context/` is gitignored (never committed upstream), it won't persist across:
- Fresh repository clones
- Branch switches that don't have local `.agent-context/` 
- Clean checkouts

The Bootstrap Protocol ensures agents know WHERE to find the Context Bible (via KI directive) and can report to maintainers when restoration is needed.

> [!IMPORTANT]
> **Course Correction (2026-02-02):** This protocol was revised from full-file restoration to directive-based approach. The Knowledge Item contains orientation instructions only, NOT file backups. The repository is the single source of truth.

## Schema Files

### Master Index

- **`context-bible.json`** - Start here. Contains tech stack overview, directory structure, and references to component schemas.

### Component Schemas

- **`navigation-schema.json`** - Route structure, menu logic, and navigation patterns
- **`data-bible.json`** - Content type schemas (Blog, Docs, Locales) with frontmatter definitions
- **`design-system.json`** - CSS variables, UI tokens, component patterns, and visual design system

## Agent Consumption Pattern

1. **Read `context-bible.json` first** to understand the project structure
2. **Identify relevant schemas** from the `schemas` object
3. **Selectively load** only the schemas you need for your current task
4. **Never load all schemas** if you only need one

### Example: Adding a New Component

```javascript
// 1. Load the master index
const contextBible = JSON.parse(fs.readFileSync('.agent-context/context-bible.json', 'utf-8'));

// 2. Identify the design system schema
const designSystemPath = contextBible.schemas.design.path;

// 3. Load only the design system schema
const designSystem = JSON.parse(fs.readFileSync(`.agent-context/${designSystemPath}`, 'utf-8'));

// 4. Use the schema to create a style-compliant component
const primaryColor = designSystem.colorTokens.primary.value;
```

## Validation

### Validate All Schemas

```bash
node .agent-context/validation/validate-all-schemas.js
```

### Validate Individual Schema

```bash
node .agent-context/validation/validate-design-system.js
```

### What Validation Checks

- ✅ Valid JSON syntax
- ✅ JSON Schema Draft-07 `$schema` reference
- ✅ Required sections present
- ✅ Description fields on major properties
- ✅ Examples arrays populated
- ✅ File paths use relative format (no leading slash)
- ✅ Property names use camelCase

## Updating Schemas

### When to Update

Update schemas when the upstream ethereum.org repository changes in ways that affect:
- Navigation structure (routes, menus)
- Content frontmatter fields
- Design system tokens (CSS variables, colors, spacing)
- Project architecture (tech stack, directory structure)

### Update Check Workflow

> [!IMPORTANT]
> **Trigger:** Run this check **after syncing your fork with upstream main**.
> 
> **Quick Schema Reference** (full table in Step 3): Changes to `src/lib/nav/` → `navigation-schema.json` | `public/content/` → `data-bible.json` | `src/styles/` → `design-system.json` | `package.json` → `context-bible.json`

The update check workflow determines if any Context Bible schemas need updates based on upstream changes. This process is designed to be completable in under 30 minutes (estimate, not validated through testing).

#### Step 1: Sync and Diff

```bash
# 1. Fetch upstream changes
git fetch upstream

# 2. View changes since last sync (adjust commit range as needed)
git diff HEAD..upstream/main --stat

# 3. Generate detailed diff for AI analysis
git diff HEAD..upstream/main > upstream_changes.diff
```

#### Step 2: AI-Assisted Review

Request an AI agent to analyze the diff using this prompt:

```
Analyze the upstream changes in `upstream_changes.diff` and identify which 
Context Bible schemas need updates. Check for changes in:

1. Navigation (affects navigation-schema.json):
   - src/lib/nav/
   - src/configs/navMenu.ts
   - Route definitions

2. Content Types (affects data-bible.json):
   - public/content/ directory structure
   - MDX frontmatter patterns
   - Content type definitions

3. Design System (affects design-system.json):
   - src/styles/
   - CSS variable definitions
   - Theme configuration

4. Project Architecture (affects context-bible.json):
   - package.json dependencies
   - New top-level directories
   - Tech stack changes

For each affected schema, output a structured report in this format:

| Schema | Change Type | Priority | Action Required |
|--------|-------------|----------|----------------|
| (schema name) | (new/modified/deprecated) | (HIGH/MEDIUM/LOW) | (specific update needed) |

Priority Levels:
- HIGH: Breaking change (route rename, field removal, major restructure)
- MEDIUM: New feature addition (new nav section, new frontmatter field)
- LOW: Content updates (new blog post, doc updates - often no schema change needed)

Exclude from report:
- Comment-only changes
- Whitespace/formatting changes
- Documentation updates that don't affect structure
```

#### Step 3: Source File → Schema Mapping

Use this reference to identify which schemas need updates:

| Source Files/Directories | Affected Schema | Key Changes to Watch |
|--------------------------|-----------------|----------------------|
| `src/lib/nav/`, `src/configs/navMenu.ts` | `navigation-schema.json` | Route structure, menu items |
| `public/content/`, MDX files | `data-bible.json` | Frontmatter fields, content types |
| `src/styles/`, CSS variables | `design-system.json` | Tokens, color palettes, spacing |
| `package.json`, project structure | `context-bible.json` | Tech stack, directories |

#### Step 4: Triage Findings

Review the AI analysis and decide which updates to apply:

1. **HIGH priority:** Must update schema before next agent use
2. **MEDIUM priority:** Should update, can batch with other changes
3. **LOW priority:** Often no action needed, monitor for patterns

> [!TIP]
> Not all upstream changes require schema updates. Focus on structural changes that affect how agents interpret the codebase.
>
> **If no HIGH or MEDIUM priority updates are found, the update check is complete—no further action required.**

#### Step 5: Apply Updates

1. Open the affected schema file(s) in `.agent-context/`
2. Update the schema to reflect upstream changes
3. Run validation: `node .agent-context/validation/validate-all-schemas.js`
4. Verify all paths are still accurate

### Update Checklist

- [ ] Identify which schemas are affected by upstream changes
- [ ] Update schema files with new information
- [ ] Verify all file paths are still accurate
- [ ] Run validation scripts to check for errors
- [ ] Test selective loading pattern still works

### In-Place Update Process

This section documents **how to update** schemas after drift is detected (see [Update Check Workflow](#update-check-workflow) for detection).

> [!IMPORTANT]
> **In-Place Strategy:** Schemas are edited directly—no version suffixes like `navigation-schema-v2.json`. Git history provides implicit versioning.

#### Why In-Place Updates

1. **Simplicity** - Agents always load from the same path; no version discovery logic needed
2. **Git History** - Full change history available via `git log .agent-context/`
3. **No Migration Complexity** - No scripts to migrate between schema versions
4. **Single Source of Truth** - Each schema file is always the current version

#### Preservation of Structure Guidelines

When updating schemas, **preserve existing structure** where possible to minimize breaking changes for agents:

| Do | Don't |
|----|-------|
| Add new properties alongside existing ones | Rename properties without deprecation notice |
| Keep property paths stable | Restructure nested objects unnecessarily |
| Maintain backward-compatible examples | Remove existing examples that agents may reference |
| Add `deprecation` notes before removing | Delete properties without warning |

**Example: Adding a new navigation section**
```json
{
  "topLevelSections": {
    "description": "Main navigation sections",
    "sections": {
      "learn": { /* existing */ },
      "use": { /* existing */ },
      "newSection": { /* add here, don't restructure */ }
    }
  }
}
```

#### Verification Steps

After making any schema update:

```bash
# 1. Validate all schemas (JSON syntax, Draft-07, camelCase, descriptions)
node .agent-context/validation/validate-all-schemas.js

# 2. Review validation output - resolve any errors
# Expected: "✅ All schemas valid" with 0 errors (warnings for missing descriptions
# are tracked by Story 5.3 - currently 22 warnings are acceptable)

# 3. Spot-check file paths still exist in codebase
ls src/lib/nav/buildNavigation.ts  # Example: verify nav source exists
```

#### Git-Based Versioning

> [!NOTE]
> **Prerequisite:** Git history commands require files to be committed first. If `.agent-context/` is newly created or untracked, run `git add .agent-context/ && git commit -m "Add agent context schemas"` before using the commands below.

Rely on Git history for versioning instead of file suffixes:

```bash
# View schema change history
git log --oneline .agent-context/navigation-schema.json

# Compare with previous version
git diff HEAD~1 .agent-context/navigation-schema.json

# View schema at specific point in time
git show HEAD~5:.agent-context/design-system.json
```

> [!TIP]
> Use meaningful commit messages when updating schemas: "Update navigation-schema.json: add /governance route section"

## Schema Conventions

### Path Format

All file paths in schemas are **relative to project root**:

- ✅ `src/lib/nav/buildNavigation.ts`
- ✅ `public/content/developers/docs`
- ❌ `/src/lib/nav/buildNavigation.ts` (no leading slash)
- ❌ `./buildNavigation.ts` (ambiguous relative path)

### Property Naming

All JSON properties use **camelCase**:

- ✅ `filePath`, `sourceFile`, `lastUpdated`
- ❌ `file_path`, `source_file`, `last_updated`

### Description Fields

Every major object and property **must have a description**:

```json
{
  "navConfig": {
    "description": "Source of truth for site navigation. Agents should never modify this file directly.",
    "path": "src/lib/nav/buildNavigation.ts"
  }
}
```

### Examples

Complex schemas **must include examples**:

```json
{
  "examples": [
    {
      "_comment": "Blog post frontmatter",
      "title": "What is Ethereum?",
      "date": "2024-01-15",
      "author": "ethereum.org"
    }
  ]
}
```

## Troubleshooting

### Schema Validation Fails

**Problem:** Validation script reports errors

**Solutions:**
1. Check JSON syntax with a linter
2. Verify `$schema` reference is `http://json-schema.org/draft-07/schema#`
3. Ensure all property names are camelCase
4. Add missing `description` fields
5. Verify file paths exist in the actual codebase

### Agent Can't Find Schema

**Problem:** Agent reports schema file not found

**Solutions:**
1. Verify you're in the repository root directory
2. Check that `.agent-context/` directory exists
3. Confirm schema file name matches reference in `context-bible.json`
4. Use relative paths, not absolute paths

### Paths Don't Match Codebase

**Problem:** Schema references files that don't exist

**Solutions:**
1. Sync your fork with upstream ethereum.org
2. Review recent commits for file moves/renames
3. Update schema paths to match current codebase
4. Run validation to catch broken paths

## Related Documentation

- **Architecture:** `_bmad-output/planning-artifacts/architecture.md` - Architectural decisions for this project
- **PRD:** `_bmad-output/planning-artifacts/prd.md` - Product requirements
- **Epics:** `_bmad-output/planning-artifacts/epics.md` - Implementation breakdown
- **Agent Sandbox Limitations:** `_bmad-output/implementation-artifacts/story-4-5-document-agent-sandbox-limitations.md` - Known restrictions for AI agents

## Project Principles

### What This Project IS

- ✅ A set of 4 JSON schema files for AI agent consumption
- ✅ Local-only documentation layer (never committed upstream)
- ✅ Self-contained, no build pipeline or runtime dependencies
- ✅ Human-editable with standard text editor

### What This Project IS NOT

- ❌ Not a runtime application
- ❌ Not code that gets compiled or bundled
- ❌ Not committed to the public ethereum.org repository
- ❌ Not integrated with upstream package.json or test suite
