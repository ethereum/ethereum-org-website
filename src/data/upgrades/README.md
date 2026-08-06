# Upgrade status data

Volatile facts about network upgrades: phase, dates, milestones, EIP inclusion
status. One file per upgrade, typed by `types.ts`. **Prose stays in
`public/content/`** — these files exist so refreshing a date does not require
editing an explainer. If a value here is wrong, fix it here.

## Sources of truth

[Forkcast](https://forkcast.org) and the upgrade's meta EIP, nothing else. Facts
move roughly weekly with the All Core Devs cadence. Meta EIPs stay `Draft` until
activation, so scope can still change — record what is true today.

## `phase`

`planning` headliners not locked · `devnet` iterating on devnets · `testnet`
public testnet forks running · `scheduled` mainnet epoch confirmed via ACD ·
`activated` shipped to mainnet.

## Milestone `status`

Strongest to weakest claim: `live` running now · `confirmed` date set via ACD ·
`anticipated` expected, no date · `projected` inferred from the mainnet target ·
`complete` finished. The UI must never render a weaker status as a settled one.

## Status is confidence, not kind

`EipStatus` answers "how firm is this", never "what kind of change is this".
Networking EIPs are `sfi` like any other scheduled EIP — the meta EIP's
"Networking" grouping is a category, and categories do not belong in a
confidence enum. Collapsing two orthogonal dimensions is how enums rot. If a
consumer ever needs kind, add a field. None does today.

## Dates

`when` carries only the precision that has a source: `{ year }`,
`{ year, month }`, or `{ year, month, day }`. Deliberately **no quarter or
half-year** — every sourced value fits those three, and the one quarter ever
claimed for Glamsterdam traced to a staking provider's post, not an ACD call.

## Two date stamps

**Page last updated** is git-derived and implies a human reviewed the prose.
**`facts-verified`** says only that these values were checked against Forkcast
that day. Bump it whenever you check, even if nothing changed.
