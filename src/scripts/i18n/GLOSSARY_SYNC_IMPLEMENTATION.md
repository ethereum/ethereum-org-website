# Glossary Sync Implementation Summary

## Overview

Implemented automated synchronization of community-approved translations from Supabase to Crowdin glossaries, with automatic backup and PR creation for glossary version control.

## Architecture

### Data Flow

```
Supabase (top_translations table)
  ↓ Fetch glossary entries (min votes filter)
  ↓ Format as TBX (Term Base eXchange)
  ↓
Crowdin Glossaries
  ↓ Before import: export existing
  ↓ Calculate hash, detect changes
  ↓
.crowdin-backups/ (timestamped backups)
  ↓ Commit to separate branch
  ↓
GitHub PR (backup for reversion)
```

### Key Features

1. **Content-based change detection** - Only backs up when glossary content changes (SHA-256 hash comparison)
2. **Timestamped backups** - Each file named with `{timestamp}_{hash}_{name}.{ext}` for easy sorting and identification
3. **Separate backup PRs** - Glossary backups don't clutter translation PRs
4. **Language mapping** - Automatic conversion between internal codes (`es`) and Crowdin codes (`es-EM`)
5. **Vote filtering** - Only imports terms with minimum community consensus
6. **Fail-safe execution** - Glossary sync failures don't block translation workflow

## Files Created

### Core Modules

- **src/scripts/i18n/sync-glossary.ts** (275 lines)

  - Main orchestrator
  - Coordinates backup → fetch → import → PR flow
  - CLI executable: `npx ts-node src/scripts/i18n/sync-glossary.ts`

- **src/scripts/i18n/lib/glossary/supabase.ts** (206 lines)

  - REST API client (no dependencies, uses native `fetch`)
  - Functions: `fetchGlossaryForLanguage`, `fetchGlossaryForAllLanguages`
  - Formatters: `formatGlossaryAsCSV`, `formatGlossaryAsTBX`

- **src/scripts/i18n/lib/crowdin/glossary.ts** (309 lines)

  - Crowdin API wrappers for glossary and TM operations
  - Functions: `listGlossaries`, `exportGlossary`, `importGlossary`, `listTranslationMemories`, `exportTranslationMemory`
  - Handles storage upload, import polling, and glossary creation

- **src/scripts/i18n/lib/glossary/backup.ts** (223 lines)
  - Hash calculation and change detection
  - Timestamped backup file creation
  - Backup history management (cleanup old backups)
  - Git integration helpers

### Configuration

- **src/scripts/i18n/main.ts** (modified)

  - Added glossary sync step at workflow start
  - Runs before pre-translation
  - Skipped if resuming existing job

- **.github/workflows/crowdin-ai-import.yml** (modified)

  - Added `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` secrets
  - Added workflow inputs: `glossary_min_votes`, `skip_glossary_backup_pr`
  - Environment variables passed to script

- **.gitignore** (modified)
  - Added `.crowdin-backups/` to ignore backups locally (they go to separate PR only)

### Documentation

- **docs/glossary-sync.md** (153 lines)
  - Complete usage guide
  - Configuration reference
  - Troubleshooting
  - Backup restoration instructions

## Environment Variables

### Required

- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role API key
- `I18N_CROWDIN_API_KEY` - Crowdin API key (existing)
- `I18N_GITHUB_API_KEY` - GitHub token (existing)
- `TARGET_LANGUAGES` - Comma-separated internal codes

### Optional

- `GLOSSARY_MIN_VOTES` (default: `2`) - Min upvotes for inclusion
- `SKIP_GLOSSARY_BACKUP_PR` (default: `false`) - Skip PR creation

## Workflow Integration

### Normal Run

1. User triggers `crowdin-ai-import.yml` workflow
2. **Glossary Sync Phase**:
   - Export existing Crowdin glossaries
   - Compare hashes, backup if changed
   - Fetch from Supabase `top_translations` table
   - Import to Crowdin per language
   - Create backup PR (if changes detected)
3. Pre-translate phase (uses updated glossaries)
4. Build, commit, create translation PR

### Resume Run

- Glossary sync skipped (already completed in initial run)
- Proceeds directly to build/commit from existing pre-translation ID

## Supabase Schema

The script expects this table/view structure:

```sql
CREATE OR REPLACE VIEW top_translations AS
SELECT
  string_term,
  translation_text,
  total_votes,
  language_code
FROM glossary_entries
WHERE status = 'approved'
ORDER BY total_votes DESC;
```

## Example Workflow Run

```
[GLOSSARY-SYNC] ========== Starting Glossary Sync ==========
[GLOSSARY-SYNC] Supabase URL: https://cppthnnwfvkfwgoqmhjl.supabase.co
[GLOSSARY-SYNC] Min votes: 2

[GLOSSARY-SYNC] Step 1: Backing up existing Crowdin glossaries
[GLOSSARY-SYNC] Found 2 existing glossaries
[GLOSSARY-SYNC] Exporting glossary: Ethereum.org Community (es-EM)
[BACKUP] Content changed for glossary:Ethereum.org Community (es-EM)
[BACKUP] Saved glossary backup: 1733011200_abc12345_ethereum_org_community_es.tbx

[GLOSSARY-SYNC] Step 3: Fetching glossary from Supabase
[GLOSSARY] Fetching from Supabase for language: es
[GLOSSARY] Fetched 47 glossary entries for es
[GLOSSARY-SYNC] Importing glossary: Ethereum.org Community (es-EM)
[CROWDIN-GLOSSARY] Using existing glossary ID: 123456
[CROWDIN-GLOSSARY] Import started: abc-def-123
[CROWDIN-GLOSSARY] Import status: finished
[GLOSSARY-SYNC] ✓ Successfully updated glossary for es-EM

[GLOSSARY-SYNC] Step 5: Creating backup PR
[GLOSSARY-SYNC] Creating branch: i18n-glossary-backup-2024-12-01
[GLOSSARY-SYNC] Committing 3 backup files
[GLOSSARY-SYNC] Creating pull request
[GLOSSARY-SYNC] ✓ Created PR: https://github.com/ethereum/ethereum-org-website/pull/12345

[GLOSSARY-SYNC] ========== Sync Complete ==========
[GLOSSARY-SYNC] Updated glossaries: 2
[GLOSSARY-SYNC] Languages: es-EM, pt-BR
[GLOSSARY-SYNC] Backup PR: https://github.com/ethereum/ethereum-org-website/pull/12345

[MAIN] Proceeding with pre-translation...
```

## Testing Checklist

### Unit Testing

- [ ] Supabase API connection (test with real endpoint)
- [ ] Hash calculation and change detection
- [ ] TBX formatting (validate XML)
- [ ] Language code mapping (internal ↔ Crowdin)

### Integration Testing

- [ ] Export existing glossary from Crowdin
- [ ] Fetch glossary from Supabase (test with 1-2 languages)
- [ ] Import to Crowdin (use test glossary)
- [ ] Backup file creation and Git operations
- [ ] PR creation with backup files

### End-to-End Testing

- [ ] Run full workflow with `GLOSSARY_MIN_VOTES=10` (limited entries)
- [ ] Verify backup PR created
- [ ] Verify glossaries updated in Crowdin
- [ ] Run again without changes (should skip backup)
- [ ] Test resume mode (glossary sync should be skipped)

## Security Considerations

1. **Service Role Key** - Never commit or log; use GitHub Secrets only
2. **Backup Files** - Stored in Git (ensure no sensitive data in glossary terms)
3. **API Rate Limits** - Sequential per-language imports (no parallel to avoid 429s)
4. **Error Handling** - Glossary sync failures don't break translation workflow

## Performance Impact

- **Additional time**: ~1-3 minutes per workflow run
- **Skipped when**: No glossary changes detected (most runs)
- **Network calls**:
  - 1 Supabase query per language
  - 2 Crowdin API calls per glossary (export + import)
  - 1 GitHub API call per backup file

## Future Enhancements

1. **Incremental sync** - Only import changed terms (requires term-level tracking)
2. **TM population** - Push high-confidence translations to TM, not just glossary
3. **Bidirectional sync** - Pull Crowdin translator feedback back to Supabase
4. **Scheduled sync** - Daily cron job independent of translation workflow
5. **Term categories** - Support Crowdin glossary term tags/categories
6. **Conflict resolution** - Handle term collisions between languages

## Dependencies

**Zero new npm packages!** All implemented using:

- Native `fetch` API (Node 18+)
- Built-in `crypto`, `fs`, `path` modules
- Existing project dependencies

## Rollback Plan

If issues arise:

1. Set `SKIP_GLOSSARY_BACKUP_PR=true` to disable sync
2. Manually revert glossaries in Crowdin UI
3. Or restore from backup PR files
4. Comment out glossary sync call in `main.ts` if needed
