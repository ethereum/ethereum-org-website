# Glossary Storage Strategy

## Current State

JSON files in the repo:
- `scripts/glossary-terms-enhanced.json` (~200KB, 486 terms with English metadata)
- `scripts/translations/glossary-{lang}.json` (~100KB each, 24 files, ~2.4MB total)

Consumers:
1. **Lookup module** (`glossary-lookup.ts`) -- loads JSON into memory, builds regex index, filters terms
2. **GH Actions pipeline** -- reads/writes JSON during translation generation
3. **Dashboard** (`glossary-dashboard.html`) -- fetches JSON via HTTP
4. **Future: community platform** (ethglossary.xyz rebuild) -- SIWE auth, user feedback

## Decision: JSON now, database later, sync between them

### Phase 1: JSON (current)

JSON works for consumers #1-3. At 486 terms / 12K entries, in-memory regex matching is faster than any database query. No external dependencies, works in GH Actions, works offline.

**Portability investment**: wrap data access in a simple interface so swapping backends later is ~50-100 lines of change:

```typescript
interface GlossaryProvider {
  getTerms(): Promise<Record<string, GlossaryTerm>>
  getTranslations(langCode: string): Promise<Record<string, TranslationEntry>>
}

// Current implementation
class JsonGlossaryProvider implements GlossaryProvider { ... }

// Future implementation
class SupabaseGlossaryProvider implements GlossaryProvider { ... }
```

The lookup module's core logic (regex index building, source text matching, lean prompt formatting) stays the same regardless of backend.

### Phase 2: Supabase (for community platform)

When ethglossary.xyz is rebuilt with SIWE auth and community feedback, a database is required. JSON files in Git can't handle concurrent user writes, voting, moderation queues, or pending/approved states.

Supabase is the natural choice:
- Already used by the existing ethglossary.xyz (Supabase `top_translations` view)
- Hosted Postgres with auth, realtime, and REST API
- Row-level security for moderation workflows
- Free tier likely sufficient for this use case

### Phase 3: Sync (database as source of truth, JSON as distribution)

```
Community platform (Supabase) -- source of truth
    |
    v (GitHub Action on approval/change)
Export to JSON files in repo
    |
    v
Translation pipeline consumes JSON (unchanged)
Dashboard consumes JSON (unchanged)
Lookup module consumes JSON (unchanged)
```

A GitHub Action exports approved translations from Supabase to the repo's JSON files whenever data changes. This keeps:
- The pipeline fast and dependency-free (no DB connection needed in GH Actions)
- The dashboard static and portable
- The community platform as the single writeable source of truth

### Migration complexity

| Step | Effort | Impact on existing code |
|------|--------|------------------------|
| Add GlossaryProvider interface | Low (~50 lines) | None (wrapper around existing) |
| Build Supabase schema | Medium (tables, RLS, views) | None (new code) |
| Build export Action | Low (query + write JSON) | None (additive) |
| Wire community platform to Supabase | High (new app) | None (separate project) |
| Swap lookup module to Supabase (optional) | Low (~100 lines) | Minimal (interface swap) |

**Total migration from JSON to Supabase: zero breaking changes to existing consumers.** The JSON files remain the pipeline's interface; only the source of truth moves to Supabase.

### What NOT to do

- **SQLite in repo**: Adds complexity without solving the community platform need. Binary file in Git is awkward for diffs/reviews. Not recommended.
- **Git-as-backend for community writes**: Merge conflicts, race conditions, sluggish UX. Not realistic for an interactive app.
- **Move lookup module to direct DB queries**: No performance benefit at this scale. Adds a runtime dependency. Keep it reading JSON.

## References

- Gemini assessment: "DB for source, JSON for distribution" (2026-03-31)
- Existing ethglossary.xyz uses Supabase with `top_translations` view
- Current glossary API at `/api/glossary/` already fetches from Supabase
