# Pipeline Orchestration

The per-file pipeline (phases 1-6) is a pure function. The orchestration layer wraps it to coordinate multiple pipeline runs over time against a shared base branch.

**The model itself is specified in `tests/specs/PIPELINE-SPEC.md` § Orchestration** — pending branch as durable cursor (`intl/pending-{base}`), why pending-is-the-baseline, temp-branch lifecycle, base-moved-during-run, and the orchestration contract. Read it there; this reference only carries the operational judgment calls the spec doesn't.

Two facts worth having before opening the spec:

- Subsequent runs **merge `{base}` into pending first** and fail fast on conflict; drift is measured against pending's manifests, so re-runs only translate the delta.
- Do NOT rebase, squash, or force-push `intl/pending-{base}` — drift detection depends on its history matching the manifests' `sourceCommitSha`.

## When base diverges from pending

If `{base}` has commits not in pending and pending can't be cleanly merged from base (e.g., someone hand-edited a locale on base, conflicting with pending's translation of the same file), the next pipeline run fails its base-into-pending merge step and aborts.

**Recovery:**

- If the conflict reflects a real disagreement (hand-edit vs pipeline output): close the pending PR without merging, delete pending, re-run. The pipeline creates a fresh pending from current base and translates the delta from there.
- If the conflict is mechanical and resolvable: manually resolve on pending, then re-run.

## Hot fixes to `staging` / `master`

The pipeline only targets `dev` in production. Hot fixes that land on `staging` or `master` go out **English-only** until the next release cycle, when `dev` (with translations) flows to `staging` then `master` via prepare-release.

If a hot fix translation is genuinely urgent, the pipeline can be manually dispatched with `base_branch=staging` and a custom `target_branch`, but this is not the standard flow and may create cleanup work later. Default answer: hot fix in English, let translations catch up.

## `stamp_only: true` and orchestration

The `stamp_only: true` workflow input regenerates manifests without translation. It only operates on the current file state — useful for "the locale is correct, but the manifest is wrong" scenarios.

**Constraint:** safe only when no `intl/pending-{base}` branch exists for the base being stamped. If pending exists, the stamped manifests on base would conflict with pending's state. Procedure: merge or close pending first, then stamp.
