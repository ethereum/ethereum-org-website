# Pipeline Orchestration

The per-file pipeline (phases 1-6) is a pure function. The orchestration layer wraps it to coordinate multiple pipeline runs over time against a shared base branch.

## Pending branch as durable cursor

Each base branch has a corresponding pending branch: `intl/pending-{base}` (e.g., `intl/pending-dev`). The pending branch is the **durable accumulator** of translations against that base. It advances forward across runs until its contents merge back into base.

Lifecycle:

1. **First run (no pending exists):**
   - Create `intl/pending-{base}` from `{base}` HEAD
   - Translate, stamp manifests, merge into pending
   - Open PR: `intl/pending-{base}` → `{base}`
2. **Subsequent run (pending exists):**
   - **Merge `{base}` into pending first.** This brings in new English that landed on base since the previous run. **Fail fast** on merge conflicts — no translation work happens.
   - Use pending's state as the baseline: the pipeline's local working tree and temp branch both derive from pending (not base). Drift detection compares current English against the manifests on pending (stamped to the previous run's commit), not against base.
   - Translate only what changed since the last stamp.
   - Merge the run's temp branch back into pending. The existing PR updates.
3. **After pending PR merges:**
   - The pending branch is deleted (by normal PR merge flow or manually). The next pipeline run starts fresh, creating a new pending branch.

## Why pending-as-baseline

Without this, a second run against the same base would re-translate English that the first run already handled. Non-deterministic LLM output means Run 2's translations differ from Run 1's for the same sections, producing merge conflicts on the pending branch after expensive translation work.

With pending-as-baseline:

- The manifests on pending are authoritative. "What changed" is measured from the last stamp, not from base.
- Sections already translated in Run 1 are unchanged for Run 2 (same English → same stamped hash → no drift).
- Run 2 translates only the delta introduced since Run 1.
- Merges back into pending are always fast-forward or clean, never conflicting on translation output.

## Temp branch lifecycle

Each pipeline run creates an ephemeral temp branch (`tmp-intl/run-<timestamp>`) to accumulate its commits before merging into pending.

- **Created from**: pending's HEAD if pending exists, otherwise base's HEAD
- **Deleted**: after successful merge into pending. Temp branches are not audit artifacts — once their commits are on pending, they serve no purpose.
- **Preserved**: only when the pipeline fails partway through translation or when the final merge into pending fails. This is a debug aid for manual recovery.

## Base-branch-moved-during-run

If `{base}` advances while the pipeline is running (new PR merges to `{base}` between `start` and `end`), the run's output is based on slightly-stale English. This is acceptable: the next pipeline run sees the new English state and translates the delta. No special handling required — orchestration naturally catches up.

## When base diverges from pending

If `{base}` has commits not in pending and pending can't be fast-forward-merged from base (e.g., someone hand-edited a locale on base, conflicting with pending's translation of the same file), the next pipeline run fails its base-into-pending merge step and aborts.

**Recovery:**

- If the conflict reflects a real disagreement (hand-edit vs pipeline output): close the pending PR without merging, delete pending, re-run. The pipeline creates a fresh pending from current base and translates the delta from there.
- If the conflict is mechanical and resolvable: manually resolve on pending, then re-run.

Do NOT force-push or rebase pending. The pipeline's drift detection depends on pending's commit history matching the manifest's `sourceCommitSha`. Force-push breaks that linkage.

## Hot fixes to `staging` / `master`

The pipeline only targets `dev` in production. Hot fixes that land on `staging` or `master` go out **English-only** until the next release cycle, when `dev` (with translations) flows to `staging` then `master` via prepare-release.

If a hot fix translation is genuinely urgent, the pipeline can be manually dispatched with `base_branch=staging` and a custom `translation_branch`, but this is not the standard flow and may create cleanup work later. Default answer: hot fix in English, let translations catch up.

## `stamp_only: true` and orchestration

The `stamp_only: true` workflow input regenerates manifests without translation. It only operates on the current file state — useful for "the locale is correct, but the manifest is wrong" scenarios.

**Constraint:** safe only when no `intl/pending-{base}` branch exists for the base being stamped. If pending exists, the stamped manifests on base would conflict with pending's state. Procedure: merge or close pending first, then stamp.

## The orchestration contract

Given a sequence of pipeline runs against the same base:

- Each run's output is deterministic given its inputs (current English + pending manifests).
- The pending branch is the sole accumulator. Each run advances it forward.
- Merge conflicts (base-into-pending, temp-into-pending) abort the run with a clear error. They never corrupt existing translations or silently drop work.
- Successful runs leave the repository in a state where the next run is idempotent: if nothing changed in base, a rerun produces zero drift and zero LLM calls.

## What this reference does NOT cover

- Per-file pipeline phases (see `references/architecture.md`)
- Hand-edit policy (see `references/non-english-edits.md`)
- Recovery procedures for stuck or broken pending branches (see `references/recovery.md`)
- Workflow file inputs and their effects (see `.github/workflows/intl-pipeline.yml`)
