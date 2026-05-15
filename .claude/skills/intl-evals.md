# intl-pipeline + intl-review Skill Trigger Evals

A small evaluation set for verifying that the `intl-pipeline` and `intl-review` skill `description` fields trigger reliably on relevant prompts (and don't trigger on near-miss prompts that aren't actually about translation infrastructure).

Per agentskills.io's [Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions.md) guide, model behavior is non-deterministic — each query should run 3 times and a trigger rate computed. Pass threshold: ≥ 0.67 (2 of 3 runs).

8 queries total: 6 should-trigger (3 per skill), 2 should-not-trigger (1 per skill's neighborhood).

## How to run

Pick a query, paste it into a fresh Claude Code session (no prior context), observe which skills (if any) get loaded via the Skill tool call. Repeat 3 times per query.

Use `claude -p "<query>" --output-format json` to log skill invocations, then check whether the target skill name appears in the tool-use list. The triggering-evals script template from [agentskills.io](https://agentskills.io/skill-creation/optimizing-descriptions#testing-whether-a-description-triggers) is the canonical pattern.

Or, simpler manual approach: paste each query in a fresh session, watch the Skill tool indicator, mark pass/fail.

## Query 1 — should trigger `intl-pipeline` (high-explicit)

```
The translations for our Japanese page suddenly have raw English brand names showing up in the prose where they used to be transliterated. What changed in the intl-pipeline or ETHGlossary that could cause this?
```

**Expected:** `intl-pipeline` skill loads (and probably `intl-review` too, since it touches brand-name policy). Critical: the agent should NOT just answer from generic translation knowledge — it should reach for the skill because the question names `intl-pipeline` and ETHGlossary explicitly.

## Query 2 — should trigger `intl-pipeline` (medium-explicit, no skill name in query)

```
The Hindi build is failing with an MDX compilation error on quantum-resistance/index.md. English builds fine. The error is "Unexpected character before name." How do I fix this for just the Hindi locale without breaking the next pipeline run?
```

**Expected:** `intl-pipeline` skill loads. The query is about a translation-pipeline-specific failure mode (MDX in a translated file, locale-specific build failure, concern about pipeline re-running) without naming the skill.

## Query 3 — should trigger `intl-pipeline` (low-explicit, no skill name)

```
I need to update the description in the frontmatter of an English content file. It's currently translated into all 24 languages. What's the right way to make this change so the translations get updated correctly?
```

**Expected:** `intl-pipeline` skill loads. The query is about the don't-hand-propagate rule + the pipeline workflow. The agent shouldn't just say "edit the file"; it should reach for the skill to surface the rule.

## Query 4 — should trigger `intl-review` (high-explicit)

```
I need to score the translation quality of the open intl/pending-dev PR for Korean and Vietnamese. Walk me through what I should look for and how to produce the final scores.
```

**Expected:** `intl-review` skill loads. The query explicitly mentions scoring, the pending branch, and the review activity.

## Query 5 — should trigger `intl-review` (medium-explicit)

```
A Chinese translator is saying that "智能合约" is wrong for "smart contract" and we should use "智慧合約" instead. How do I decide which is right, and where would I fix it if their suggestion is correct?
```

**Expected:** `intl-review` skill loads (and probably `intl-pipeline`). The query is about a glossary disagreement — the answer involves ETHGlossary as authority (intl-review's core rule), the zh vs zh-tw distinction, and the upstream-PR-to-ETHGlossary workflow.

## Query 6 — should trigger `intl-review` (low-explicit, no skill name)

```
The Japanese translation of a tutorial page has `<a href="/governance">` rendered as `<a href="/ガバナンス">`. Is this expected, and what's the severity?
```

**Expected:** `intl-review` skill loads. Query is about a translated href — a critical issue per the review rubric — but doesn't name "review" or the skill. The agent should reach for the skill to assess severity correctly (critical, auto-fixable).

## Query 7 — should NOT trigger either skill (near-miss against intl-pipeline)

```
We need to add a new language to the site. What's the process for updating i18n.config.json and adding a new locale to next-intl?
```

**Expected:** neither skill loads. This is about i18n routing configuration in Next.js, not the translation pipeline. The agent should answer from general Next.js / next-intl knowledge. Triggering `intl-pipeline` here would be a false positive — the pipeline isn't involved in adding a language; the config + provider setup is.

## Query 8 — should NOT trigger either skill (near-miss against intl-review)

```
I'm reviewing a PR that changes the Card component to use `tailwind-variants`. Anything in our design system I should look out for?
```

**Expected:** neither intl skill loads. The `design-system` skill should load instead. The word "reviewing" might tempt `intl-review` but the PR has nothing to do with translations. Triggering `intl-review` here would be a false positive.

## Pass criteria

For each query, compute the trigger rate over 3 runs:

- **Should-trigger queries (1-6):** pass if trigger rate ≥ 0.67 (≥ 2 of 3 runs)
- **Should-not-trigger queries (7-8):** pass if trigger rate ≤ 0.33 (≤ 1 of 3 runs)

Overall pass: 6+ of 8 queries pass (75%+). If 4 or fewer pass, the description needs revision (per agentskills.io's optimization loop).

## Diagnosing failures

- **Should-trigger fails** → description is too narrow. Look for missing trigger keywords or scenarios. Consider broadening or adding "even if the user doesn't explicitly mention..." framing.
- **Should-not-trigger fires** → description is too broad. Look for ambiguous keywords. Add specificity about what the skill does NOT do, or clarify boundary against the adjacent skill.
- **Cross-skill confusion** (intl-pipeline triggers for review queries, or vice versa) → boundary description is unclear. Both descriptions should explicitly mention the other skill as the alternative (already done in current drafts — see "Other Project Skills That May Apply" sections).

## What this eval does NOT cover

- **Skill output quality** — once activated, does the skill produce a correct answer? That's a separate evaluation type ([Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills.md)). Building output-quality evals is a follow-up if needed.
- **Reference-loading accuracy** — does the agent load the right `references/*.md` file at the right time? Harder to evaluate; consider sampling agent traces during real use.
- **Cross-skill composition** — when both `intl-pipeline` and `intl-review` should activate, do they? The pattern in queries 4 and 5 tests this lightly; for systematic evaluation, build a separate set.
