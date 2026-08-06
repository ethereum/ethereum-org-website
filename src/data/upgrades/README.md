# Upgrade status data

Volatile facts about network upgrades: phase, dates, milestones, EIP inclusion
status. One file per upgrade, typed by `types.ts`.

**Prose stays in `public/content/`.** These files exist so that refreshing a
date does not require a human to edit an explainer. If a value here is wrong,
fix it here — do not paper over it in the markdown.

## Sources of truth

[Forkcast](https://forkcast.org) and the upgrade's meta EIP, and nothing else.
Not recollection, not news coverage, not another page on this site. Facts move
roughly weekly with the All Core Devs call cadence.

## `phase`

- `planning` — headliners not yet locked
- `devnet` — client teams iterating on devnets
- `testnet` — public testnet forks running
- `scheduled` — mainnet epoch confirmed via ACD
- `activated` — shipped to mainnet

## Milestone `status`

Ordered strongest to weakest claim. The UI must never render a weaker status as
a settled one — a `projected` date is not a promise.

- `live` — currently running
- `confirmed` — date set via ACD
- `anticipated` — expected, no date set
- `projected` — inferred from the mainnet target; the weakest claim
- `complete` — happened and is finished

## Two date stamps, two meanings

- **Page last updated** — derived from git. Implies a human reviewed the prose.
- **`facts-verified`** — says only that someone checked these values against
  Forkcast that day. It makes no claim about the surrounding prose. Bump it
  whenever you check, even if nothing changed.
