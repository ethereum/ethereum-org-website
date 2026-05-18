# Non-English Edit Policy

Decision tree for: "Can I edit this translated file by hand?" The answer is sometimes yes, sometimes no, and the difference matters.

## The decision tree

```text
Are you editing a translated file?
│
├── Has the English source changed since the manifest was stamped?
│   (Check: is .manifest-source.json's sourceCommitSha older than the most recent commit
│    that touched the English file?)
│   │
│   ├── NO (English unchanged since stamp)
│   │   │
│   │   └── Allowed.
│   │       Examples: fixing a Gemini mistranslation, sanitizer follow-up,
│   │       native-speaker correction. Manifest stays valid.
│   │
│   └── YES (English moved after stamp)
│       │
│       └── NOT allowed by hand. Options:
│           - Trigger the pipeline -- it'll merge the English change into the locale via
│             incremental translation, preserving the locale parts unaffected by the change.
│           - If urgent (build-breaking): make the locale edit, THEN trigger
│             intl-pipeline.yml with stamp_only: true.
│             Safe only if no intl/pending-{base} branch exists.
```

## Why this rule exists

The pipeline tracks state with two manifests per file+locale: `.manifest-source.json` (Merkle tree of English at stamp time, plus `sourceCommitSha`) and `.manifest-translation.json` (Merkle tree of the locale, mirroring the English structure).

When the pipeline runs incrementally, it compares:

1. Current English vs the source manifest's tree → finds what changed
2. Routes inert/deterministic changes through scripts (URL updates, structural edits)
3. Routes prose changes through Gemini
4. Splices the result into the existing locale file, leaving unchanged sections byte-identical

This depends on the **manifest accurately reflecting the locale's relationship to English at a specific point in time**. If you hand-edit a locale to reflect an English change, the manifest no longer accurately describes that relationship — the next pipeline run will detect "drift" that doesn't exist, or fail to detect drift that does exist.

## Allowed edits (English side unchanged)

These are safe to do by hand without breaking the manifest:

- **Fixing a translation error a reviewer caught** — Gemini got a brand name wrong, a term doesn't match ETHGlossary, tone is off. The English meaning is unchanged.
- **Sanitizer follow-up edits** — `/fix-sanitizer-bug` or manual application of a sanitizer pattern.
- **Native-speaker corrections** during review — replacing a phonetic transliteration with the established one.
- **Typo fixes in localized content** — the English version doesn't have the same typo.
- **Comment-only edits inside code fences** — code comments may be translated; if you adjust one, the manifest doesn't care.

In all of these, the manifest's English-to-locale mapping is still accurate after the edit. The next pipeline run sees the corrected locale as the new baseline.

## Not-allowed edits (English-side change involved)

These will break the pipeline if done by hand:

- **Propagating a new URL into a locale** because English changed it
- **Restructuring a paragraph in the locale** to match English's restructure
- **Adding a new section to the locale** that English just added
- **Changing a JSX component's attributes in the locale** because English changed them
- **Updating the locale's frontmatter** (description, alt text) to mirror an English update

For all of these, run the pipeline. It handles the change correctly via Phase 3 (deterministic propagation for inert changes) or Phase 4 (LLM retranslation for prose changes).

## The `stamp_only: true` escape hatch

Sometimes you legitimately need to hand-edit a locale to reflect an English change — most commonly when English makes a structural change that would break the build for translated locales (e.g., a removed JSX component the locales still reference).

**Procedure:**

1. Confirm no `intl/pending-{base}` branch exists for the base you're working against. If one exists, merge or close it first. (Hand-edits + an open pending PR = merge conflict roulette.)
2. Make the English-driven edit on the locale by hand.
3. Trigger `intl-pipeline.yml` with `stamp_only: true`:

```bash
gh workflow run intl-pipeline.yml \
  -f target_path="public/content/some-page/index.md" \
  -f target_languages="ja,ko,..." \
  -f stamp_only=true
```

This regenerates manifests without translation. The pipeline reads the current locale state, computes new manifests, commits them. Next incremental run starts from the new stamped state.

## Detecting drift without running the pipeline

To check whether a hand-edit would cause drift:

```bash
# Get the stamped source commit for a locale file
jq -r '.sourceCommitSha' public/content/translations/ja/some-page/index.md.manifest-source.json

# Check if English has commits after that SHA
git log <stamped-sha>..HEAD -- public/content/some-page/index.md
```

If there are commits, the English side has moved. Hand-editing the locale will cause drift unless you also `stamp_only`.

## What about `.claude/translation-review/per-language/{lang}.md`?

Per-language findings files are review artifacts, NOT pipeline inputs. The pipeline ignores them entirely. Edit freely.

## What about translation entries in ETHGlossary?

Hand-edit them in the ETHGlossary repo via PR. The pipeline picks them up on the next run. See `references/ethglossary.md` for the workflow.

## When this rule does not apply

- The English file you're editing IS the English file (you're not touching translations)
- You're editing UI strings in `src/intl/en/*.json` (the English source — the pipeline propagates from these)
- You're touching pipeline source code at `src/scripts/intl-pipeline/`
- You're working in the `.worktrees/` of another task that doesn't intersect translation content

## See also

- `references/architecture.md` for why the manifest is structured the way it is
- `references/recovery.md` for what to do if a hand-edit already caused drift
- `references/orchestration.md` for the pending-branch lifecycle that interacts with `stamp_only`
