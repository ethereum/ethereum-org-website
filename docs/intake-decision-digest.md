# Intake decision digest

The weekday digest that turns the open queue into a short list of maintainer decisions, rather than a copy of GitHub's issue and PR lists.

It runs as `intake-decisions.md` (gh-aw), currently **in shadow mode** alongside the existing `team-digest.md`. Shadow mode means it publishes to the workflow run summary and changes nothing else — no labels, no comments, no post to the team channel unless a webhook is explicitly configured.

## Why it exists

The original digest received PR titles, labels, dates and one derived boolean, and was instructed to emit facts and links only. Two problems followed:

- **The analysis was thrown away.** The PR reviewer produces a repository-aware first pass; the digest reduced it to a single substring match and discarded the rest.
- **"Ready to merge" was not a readiness calculation.** It meant "an approval exists, or some comment contains `First-pass review — ✅ Looks mergeable`" — a verdict the reviewer is allowed to emit while CI is still running, and which is never invalidated by later commits. On a sample run, 27 open PRs qualified under that rule; 9 were actually mergeable, green, and analyzed at their current head SHA. The rest were conflicting, failing, still running, or carrying a verdict written against code that had since changed.

## Architecture

**1. `.github/scripts/intake-evidence.sh` — deterministic evidence collector.**

Two GraphQL queries resolve everything GitHub already knows, so the agent never infers it: head SHA, status check rollup, mergeability, review decisions and requested reviewers, changed files and diff size, linked issues, author association, body excerpts, and the last human comment on each thread.

Two derived fields do the work the old boolean could not:

- `aiReview.supersededByCommits` — true when the head commit is newer than the reviewer's verdict, i.e. the verdict describes code that no longer exists. The digest treats such a verdict as absent.
- `answeredByTeam` — whether anyone with a team association has replied to an issue, from GitHub's author association rather than a hand-maintained handle list.

Mergeability is read twice: GitHub computes it lazily, so the first query mostly returns `UNKNOWN` and is really what schedules the computation.

**2. The analyst prompt** builds a decision card per candidate (intent, state, recommended disposition, the human decision still required, waiting-on actor, impact, effort, risk, related items, lane, confidence, evidence, analyzed SHA), clusters related work, ranks by *human decision required × impact × ease of action*, and publishes at most five cards. The AI verdict is one input to readiness, never the readiness state itself.

**3. Deltas, and not repeating yourself.** The cards are cached (`intake-cards-<run id>`, restored by prefix) and read back on the next run. An item whose recommendation has not changed does not get a card a second time — it drops to a one-line "Carried over" entry, so the slot goes to something the team has not already seen. At three runs without action the line stops restating the ask and says why it thinks the item is stuck.

Only one prior run is handed to the agent, so `runs_seen` and `first_seen` live inside the cards and are carried forward each run; that is what makes "third morning in a row" knowable at all. A changed recommendation resets the count, because that is new news rather than an old ask repeating. The first run — and any run after the 7-day cache eviction — omits all of this and starts clean.

## Promoting it out of shadow mode

1. Watch a few runs in the Actions run summary. The full card set, including cards that did not make the digest, is in the collapsed JSON block.
2. To trial it in a side channel, set the `DISCORD_INTAKE_SHADOW_WEBHOOK_URL` secret. Without it the workflow posts nowhere.
3. To cut over: point the workflow at `DISCORD_INTAKE_WEBHOOK_URL`, drop `(shadow)` from the workflow name, and delete `team-digest.md` and `team-digest.lock.yml`. Run `gh aw compile` after any edit.

## Known coupling

The collector parses the reviewer's rendered verdict header (`First-pass review — <verdict>`). `shared/pr-review-core.md` carries a comment saying so. Changing the header wording without updating both consumers makes the detection silently always-false — which is how the original digest's readiness check would have degraded unnoticed.

The next iterations make the reviewer and triager emit this card schema directly, so the digest becomes almost deterministic, and split "AI pre-triaged" from "human triaged" in the label lifecycle.
