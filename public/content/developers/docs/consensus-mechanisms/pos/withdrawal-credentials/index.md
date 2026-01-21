---
title: Withdrawal credentials
description: An explanation of validator withdrawal credential types (0x00, 0x01, 0x02) and their implications for Ethereum stakers.
lang: en
---

Every validator has a **withdrawal credential** that determines how and where their staked ETH and rewards can be withdrawn. The credential type is indicated by the first byte: `0x00`, `0x01`, or `0x02`. Understanding these types is important for validators managing their stake.

## 0x00: Pre-Shapella credentials {#0x00-credentials}

The `0x00` type is the original withdrawal credential format from before the Shapella upgrade (April 2023). Validators with this credential type have no execution-layer withdrawal address set, meaning their funds remain locked on the consensus layer. If you still have `0x00` credentials, you must upgrade to `0x01` or `0x02` before you can receive any withdrawals.

## 0x01: Legacy withdrawal credentials {#0x01-credentials}

The `0x01` type was introduced with the Shapella upgrade and became the standard for validators who wanted to set an execution-layer withdrawal address. With `0x01` credentials:

- Any balance above 32 ETH is **automatically swept** to your withdrawal address
- Full exits go through the standard exit queue
- Rewards above 32 ETH cannot compound—they are periodically swept out

**Why some validators still use 0x01:** It's simpler and familiar. Many validators deposited after Shapella and already have this type, and it works fine for those who want automatic withdrawals of excess balance.

**Why it is not recommended:** With `0x01`, you lose the ability to compound rewards above 32 ETH. Every bit of excess is swept away automatically, which limits your validator's earning potential and requires managing withdrawn funds separately.

## 0x02: Compounding withdrawal credentials {#0x02-credentials}

The `0x02` type was introduced with the Pectra upgrade and is the **recommended choice** for validators today. Validators with `0x02` credentials are sometimes called "compounding validators."

With `0x02` credentials:

- Rewards above 32 ETH **compound** in 1 ETH increments up to a maximum effective balance of 2048 ETH
- Partial withdrawals must be requested manually (automatic sweeps only occur above the 2048 ETH threshold)
- Validators can consolidate multiple 32 ETH validators into a single higher-balance validator
- Full exits are still supported through the standard exit queue

Both partial withdrawals and consolidations can be performed via the [Launchpad Validator Actions](https://launchpad.ethereum.org/en/validator-actions).

**Why validators should prefer 0x02:** It offers better capital efficiency through compounding, more control over when withdrawals happen, and supports validator consolidation. For solo stakers who accumulate rewards over time, this means their effective balance—and thus their rewards—can grow beyond 32 ETH without manual intervention.

**Important:** Once you convert from `0x01` to `0x02`, you cannot revert back.

For a detailed guide on converting to Type 2 credentials and the MaxEB feature, see the [MaxEB explainer page](/roadmap/pectra/maxeb/).

## What should I pick? {#what-should-i-pick}

- **New validators:** Choose `0x02`. It's the modern standard with better compounding and flexibility.
- **Existing 0x01 validators:** Consider converting to `0x02` if you want rewards to compound above 32 ETH or plan to consolidate validators.
- **Existing 0x00 validators:** Upgrade immediately—you cannot withdraw without updating your credentials. You must first convert to `0x01`, then you can convert to `0x02`.

## Tools for managing withdrawal credentials {#withdrawal-credential-tools}

Several tools support choosing or converting between credential types:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** — The official tool for deposits and validator management, including credential conversions and consolidations
- **[Pectra Staking Manager](https://pectrastaking.com)** — Web UI with wallet-connect support for conversions and consolidation
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** — Command-line tool for batch conversions
- **[Ethereal](https://github.com/wealdtech/ethereal)** — CLI tool for Ethereum operations including validator management

For a complete list of consolidation tools and detailed conversion instructions, see [MaxEB consolidation tooling](/roadmap/pectra/maxeb/#consolidation-tooling).

## Further reading {#further-reading}

- [Keys in proof-of-stake Ethereum](/developers/docs/consensus-mechanisms/pos/keys/) — Learn about validator keys and how they relate to withdrawal credentials
- [MaxEB](/roadmap/pectra/maxeb/) — Detailed guide on the Pectra upgrade and maximum effective balance feature
