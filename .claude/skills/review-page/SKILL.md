---
name: review-page
description: Adversarial review loop for a built ethereum.org page — spawns copy and design-system reviewer subagents against the Figma source, triages their findings, fixes, and re-reviews until a fresh round comes back clean. Invoke with /review-page.
disable-model-invocation: true
---

# Review Page

Audit a built page by turning two **adversarial** reviewers loose on it, fixing what they find, and re-running them until a fresh round comes back **green**. Each reviewer is a subagent prompted to assume the page is *wrong* and hunt for proof — never to rubber-stamp it. You (the orchestrator) own the Figma pull, the triage, and the fixes; the reviewers only report. This is the QA half of building a page — pair it with `/new-page`, or run it standalone against any existing page.

Work the steps in order. Each ends on a checkable condition — don't start the next until the current one is met.

## Step 0 — Ground truth

You need two things before any review:

1. **The live page.** Start `pnpm dev`, load the route (locale-stripped for `en`: `/<route>/`), confirm **HTTP 200**. A 500 is a build/asset error — fix that first; there is nothing to audit on a broken page.
2. **The design source.** A Figma link/selection is the gold standard. A written spec serves the copy reviewer but not the pixel-level design checks. **No source at all → the copy reviewer has nothing to sync against; say so and confirm the user still wants a design-system-only pass.**

**Done when:** the page serves 200 and the design source is known (or its absence is confirmed).

## Step 1 — Capture both sides

The reviewers compare *the page as it renders* against *the design as it's specified*. Capture both once, to a scratch dir, and pass the paths to the subagents — don't make each reviewer re-pull Figma (reads drift between pulls, and it burns rate limits).

- **Design.** Read the Figma **fresh** — never a read from an earlier turn: `get_metadata` for the frame tree, `get_screenshot` per region, `get_design_context` for the text, `get_variable_defs` for tokens. Save the region screenshots; keep the text/token dump.
- **Live page.** Full-page screenshot with `playwright-cli`, plus per-section shots for a long page. Save them beside the design shots.

**Done when:** design and live-page artifacts are saved and their paths are known.

## Step 2 — Spawn the adversarial reviewers

Read both briefs in `reviewers/` and spawn **one subagent per brief, in parallel** — a single message with two `Agent` calls. Give each subagent its brief verbatim, the route, and the artifact paths from Step 1. Each returns a structured findings list — `{location, claim, evidence, fix, severity}` — and nothing else. **Reviewers report; they never edit** (two agents editing in parallel would collide).

- `reviewers/copy.md` — every string on the page matches the Figma/source copy.
- `reviewers/design-system.md` — components, spacing, heading sizes, and colors are the design system's, with no custom CSS bolted onto primitives.

Reviewers are **adversarial**: each defaults to *fault found* and must cite evidence to clear a region. Expect over-reporting — that is the point; you filter next.

**Done when:** both subagents have returned their findings lists.

## Step 3 — Triage

Adversarial reviewers over-report. **You** judge each finding before touching code — keep the real ones, drop the noise. Two calls need judgment:

- **Intentional copy divergence.** A string differs because the *design is stale*, or because it's a templated/localized value — not a copy bug. Confirm against the source, not the reviewer's assumption.
- **Justified custom CSS.** Custom CSS *chasing pixel parity* on a primitive is a finding; custom CSS the design *genuinely requires* (a one-off the system can't express) is acceptable per "match, don't mimic." Don't strip styling the design needs.

Show the user the **confirmed** findings as a table — `Region · Finding · Fix · Severity` — and flag anything ambiguous for their call. This is their window into what the reviewers saw.

**Done when:** every finding is confirmed or dropped, and the confirmed table has been shown to the user.

## Step 4 — Fix

Apply the confirmed findings yourself, reuse-first — a variant, not custom CSS; the right primitive, not a re-invention. Load the `design-system` skill if you haven't, for the component and token calls.

**Done when:** every confirmed finding is fixed in the working tree.

## Step 5 — Re-review until green

Re-capture the **live page** (it changed; the Figma side didn't — reuse Step 1's design artifacts) and re-spawn the same reviewers. The loop is **green** when a fresh adversarial round returns **zero** confirmed findings. Until then: triage → fix → re-review.

Cap it: if the loop isn't green after **3 rounds**, stop and hand the user the stubborn findings — a finding that survives three fixes usually needs a human design call, not another pass.

**Done when:** a fresh round is green, or the 3-round cap is hit and the remaining findings are handed off.
