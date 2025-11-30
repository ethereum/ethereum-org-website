# Glossary Synchronization

Automatically syncs community-approved translations from Supabase to Crowdin glossaries before each translation workflow run.

## How It Works

1. **Backup Existing**: Exports current Crowdin glossaries and Translation Memories, calculates content hashes, and saves timestamped backups if content changed
2. **Fetch from Supabase**: Queries the `top_translations` table for terms with minimum vote threshold per language
3. **Import to Crowdin**: Formats as TBX and imports into Crowdin glossaries (creates new glossary per language if doesn't exist)
4. **Create Backup PR**: Commits backup files to a separate branch (`i18n-glossary-backup-YYYY-MM-DD`) and creates a PR

## Backup Structure

```
.crowdin-backups/
├── glossary/
│   ├── 1733011200_abc12345_ethereum_org_community_es.tbx
│   └── 1733011200_def67890_ethereum_org_community_pt.tbx
├── tm/
│   ├── 1733011200_xyz98765_main_translation_memory.tmx
│   └── ...
└── hashes.json  # Tracks content hashes to detect changes
```

Each backup filename includes:

- Unix timestamp (for sorting/chronology)
- Short hash (first 8 chars of SHA-256, for quick verification)
- Sanitized resource name

## Configuration

### Required Secrets (GitHub Actions)

Add these to your repository secrets:

- `SUPABASE_URL`: Your Supabase project URL (default: `https://cppthnnwfvkfwgoqmhjl.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key for API access

### Environment Variables

- `GLOSSARY_MIN_VOTES` (default: `2`): Minimum upvotes required for a term to be included
- `SKIP_GLOSSARY_BACKUP_PR` (default: `false`): Set to `true` to save backups locally without creating a PR

### Supabase Schema

The script expects a `top_translations` table (or view) with these columns:

```sql
CREATE TABLE top_translations (
  string_term TEXT NOT NULL,          -- The English term
  translation_text TEXT NOT NULL,     -- The translated term
  total_votes INTEGER NOT NULL,       -- Number of upvotes
  language_code TEXT NOT NULL         -- Internal language code (e.g., 'es', 'pt', 'fr')
);
```

**Note**: Use internal language codes (`es`, `pt`, `zh`, etc.) in Supabase. The script automatically maps them to Crowdin codes (`es-EM`, `pt-BR`, `zh-CN`, etc.).

## Workflow Integration

The glossary sync runs automatically at the start of each `crowdin-ai-import.yml` workflow before pre-translation:

```yaml
- name: Run Crowdin AI translation import
  run: npx ts-node -O '{"module":"commonjs"}' ./src/scripts/i18n/main.ts
  env:
    SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
    SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
    GLOSSARY_MIN_VOTES: ${{ github.event.inputs.glossary_min_votes }}
    SKIP_GLOSSARY_BACKUP_PR: ${{ github.event.inputs.skip_glossary_backup_pr }}
    # ... other env vars
```

## Manual Sync

You can also run the glossary sync manually:

```bash
# Set required environment variables
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
export I18N_CROWDIN_API_KEY="your-crowdin-api-key"
export I18N_GITHUB_API_KEY="your-github-token"
export TARGET_LANGUAGES="es,pt,fr"  # Internal codes
export GLOSSARY_MIN_VOTES="2"
export SKIP_GLOSSARY_BACKUP_PR="false"

# Run the sync
npx ts-node -O '{"module":"commonjs"}' ./src/scripts/i18n/sync-glossary.ts
```

## Backup Restoration

If you need to revert to a previous glossary version:

1. Find the backup file in `.crowdin-backups/glossary/` (sorted by timestamp, most recent first)
2. Download the TBX file
3. Manually import it to Crowdin via UI or API:
   ```bash
   # Using the Crowdin API
   curl -X POST "https://api.crowdin.com/api/v2/glossaries/{glossaryId}/imports" \
     -H "Authorization: Bearer $CROWDIN_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"storageId": "...", "scheme": {...}}'
   ```

Or merge the backup PR to preserve it in Git history, then cherry-pick specific versions as needed.

## How Crowdin Uses Glossaries

- **For AI/MT**: Crowdin AI and Machine Translation engines prefer glossary terms when translating
- **For Human Translators**: Terms are highlighted in the editor with suggested translations
- **For QA**: Crowdin can flag inconsistent terminology (if QA checks are enabled)
- **For TM Matching**: Glossary terms boost Translation Memory match confidence

## Troubleshooting

### "No glossary entries found for language X"

- Check that `top_translations` has rows for that language code
- Verify `GLOSSARY_MIN_VOTES` isn't too high
- Confirm you're using internal codes (`es`) not Crowdin codes (`es-EM`)

### "Failed to import glossary"

- Check Crowdin API rate limits
- Verify TBX format is valid (UTF-8, well-formed XML)
- Ensure glossary name doesn't conflict with existing non-project glossaries

### "Backup PR creation failed"

- Verify `I18N_GITHUB_API_KEY` has `repo` scope
- Check branch doesn't already exist (delete old backup branches if needed)
- Ensure `.crowdin-backups/` is in `.gitignore` so backups go to PR only

## Performance Notes

- Glossary export/import for 10 languages: ~30-60 seconds
- TM export (large): ~2-5 minutes
- Backup PR creation: ~10-30 seconds (depends on file count)
- Total overhead: ~1-3 minutes per workflow run (skipped if no changes)

## Files

- `src/scripts/i18n/sync-glossary.ts` - Main orchestrator
- `src/scripts/i18n/lib/glossary/supabase.ts` - Supabase REST API client
- `src/scripts/i18n/lib/crowdin/glossary.ts` - Crowdin glossary/TM API wrappers
- `src/scripts/i18n/lib/glossary/backup.ts` - Hash calculation, file I/O, Git operations
