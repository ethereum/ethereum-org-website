---
title: The merge
description: Learn about the merge - when mainnet Ethereum joins the Beacon Chain coordinated proof-of-stake system.
lang: en
template: eth2
sidebar: true
image: ../../../assets/eth2/merge.png
summaryPoints:
  [
    'Eventually the current Ethereum Mainnet will "merge" with the beacon chain proof-of-stake system.',
    "This will mark the end of proof-of-work for Ethereum, and the full transition to proof-of-stake.",
    "This is planned to precede the roll out of shard chains.",
    'We formerly referred to this as "the docking."',
  ]
---

<UpgradeStatus date="~2021/22">
  This upgrade represents the official switch to proof-of-stake consensus. This eliminates the need for energy-intensive mining, and instead secures the network using staked ether. A truly exciting step in realizing the <a href="/eth2/vision/">Eth2 vision</a> – more scalability, security, and sustainability.
</UpgradeStatus>

## What is the merge? {#what-is-the-docking}

It's important to remember that initially, the [Beacon Chain](/eth2/beacon-chain/) shipped separately from [mainnet](/glossary/#mainnet) - the chain we use today. Ethereum Mainnet continues to be secured by [proof-of-work](/developers/docs/consensus-mechanisms/pow/), even while the Beacon Chain runs in parallel using [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). The merge is when these two systems finally come together.

Imagine Ethereum is a space ship that isn’t quite ready for an interstellar voyage. With the Beacon Chain the community has built a new engine and a hardened hull. When it’s time, the current ship will dock with this new system, merging into one ship, ready to put in some serious lightyears and take on the universe.

## Merging with mainnet {#docking-mainnet}

When ready, Ethereum Mainnet will "merge" with the Beacon Chain, becoming its own shard which uses proof-of-stake instead of [proof-of-work](/developers/docs/consensus-mechanisms/pow/).

Mainnet will bring the ability to run smart contracts into the proof-of-stake system, plus the full history and current state of Ethereum, to ensure that the transition is smooth for all ETH holders and users.

<!-- ### Improving mainnet

Before mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the merge. -->

## After the merge {#after-the-merge}

This will signal the end of proof-of-work for Ethereum and start the era of a more sustainable, eco-friendly Ethereum. At this point Ethereum will be one step closer to achieving the full scale, security and sustainability outlined in its [Eth2 vision](/eth2/vision/).

It is important to note that an implementation goal of the merge is simplicity in order to expedite the transition from proof-of-work to proof-of-stake. Developers are focusing their efforts on this transition, and minimizing additional features that could delay this goal.

**This means a few features, such as the ability to withdraw staked ETH, will have to wait a little longer after the merge is complete.** Plans include a post-merge "cleanup" upgrade to address these features, which is expected to happen very soon after the merge is completed.

## Relationship between upgrades {#relationship-between-upgrades}

The Eth2 upgrades are all somewhat interrelated. So let’s recap how the merge relates to the other upgrades.

### The merge and the Beacon Chain {#docking-and-beacon-chain}

Once the merge happens, stakers will be assigned to validate the Ethereum Mainnet. [Mining](/developers/docs/consensus-mechanisms/pow/mining/) will no longer be required so miners will likely invest their earnings into staking in the new proof-of-stake system.

<ButtonLink to="/eth2/beacon-chain/">The Beacon Chain</ButtonLink>

### The merge and the post-merge cleanup {#merge-and-post-merge-cleanup}

Immediately after the merge, some features such as withdrawing staked ETH, will not yet be supported. These are planned for a separate upgrade to follow shortly after the merge.

Stay up-to-date with the [EF Research and Development Blog](https://blog.ethereum.org/category/research-and-development/). For those curious, learn more about [What Happens After the Merge](https://youtu.be/7ggwLccuN5s?t=101), presented by Vitalik at the April 2021 ETHGlobal event.

### The merge and shard chains {#docking-and-shard-chains}

Originally, the plan was to work on shard chains before the merge – to address scalability. However, with the boom of [layer 2 scaling solutions](/developers/docs/scaling/#layer-2-scaling), the priority has shifted to swapping proof-of-work to proof-of-stake via the merge.

This will be an ongoing assessment from the community as to the need for potentially multiple rounds of shard chains to allow for endless scalability.

<ButtonLink to="/eth2/shard-chains/">Shard chains</ButtonLink>
