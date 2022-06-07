---
title: The Merge
description: Learn about The Merge - when Mainnet Ethereum joins the Beacon Chain coordinated proof-of-stake system.
lang: en
template: upgrade
sidebar: true
image: ../../../assets/upgrades/merge.png
summaryPoint1: Soon the current Ethereum Mainnet will merge with the Beacon Chain proof-of-stake system.
summaryPoint2: This will mark the end of proof-of-work for Ethereum, and the full transition to proof-of-stake.
summaryPoint3: This sets the stage for future scaling upgrades including data sharding.
summaryPoint4: With The Merge, Ethereum's eneregy consumption drops by 99.95%. Welcome to a new greener Ethereum.
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
The Merge is one of the most significant and high-stakes upgrades in the history of Ethereum. Extensive testing and bug bounties have been underway for years to ensure a safe transition to proof-of-stake.

This process is in its final stages, with plans to undergo The Merge on a few public testnets before finally moving forward with Mainnet. If you’re as excited about The Merge as we are, follow the <a href="https://blog.ethereum.org">EF Blog</a> or the client communication channels for the latest official word on <em>When Merge?</em>
</UpgradeStatus>

## What is The Merge? {#what-is-the-docking}

It's important to remember that initially, the [Beacon Chain](/upgrades/beacon-chain/) shipped separately from [Mainnet](/glossary/#mainnet) - the chain we use today. Ethereum Mainnet continues to be secured by [proof-of-work](/developers/docs/consensus-mechanisms/pow/), even while the Beacon Chain runs in parallel using [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). The Merge is when these two systems finally come together.

Imagine Ethereum is a space ship that isn’t quite ready for an interstellar voyage. With the Beacon Chain the community has built a new engine and a hardened hull. When it’s time, the current ship will dock with this new system, merging into one ship, ready to put in some serious lightyears and take on the universe.

## Merging with Mainnet {#docking-mainnet}

When ready, Ethereum Mainnet will "merge" with the Beacon Chain, becoming its own shard which uses proof-of-stake instead of [proof-of-work](/developers/docs/consensus-mechanisms/pow/).

Mainnet will bring the ability to run smart contracts into the proof-of-stake system, plus the full history and current state of Ethereum, to ensure that the transition is smooth for all ETH holders and users.

## After The Merge {#after-the-merge}

This will signal the end of proof-of-work for Ethereum and start the era of a more sustainable, eco-friendly Ethereum. At this point Ethereum will be one step closer to achieving the full scale, security and sustainability outlined in its [Ethereum vision](/upgrades/vision/).

It is important to note that an implementation goal of The Merge is simplicity in order to expedite the transition from proof-of-work to proof-of-stake. Developers are focusing their efforts on this transition, and minimizing additional features that could delay this goal.

**This means a few features, such as the ability to withdraw staked ETH, will have to wait a little longer after The Merge is complete.** Plans include a post-merge "cleanup" upgrade to address these features, which is expected to happen very soon after The Merge is completed.

## Relationship between upgrades {#relationship-between-upgrades}

The Ethereum upgrades are all somewhat interrelated. So let’s recap how The Merge relates to the other upgrades.

### The Merge and the Beacon Chain {#merge-and-beacon-chain}

The Merge represents the formal adoption of the Beacon Chain as the new consensus layer to the current Mainnet execution layer. Once The Merge happens, validators will be assigned to secure Ethereum Mainnet and mining [proof-of-work](/developers/docs/consensus-mechanisms/pow/) will no longer be a valid means of block production.

Blocks will instead be proposed by validating nodes that have ether staked for the right to participate in consensus. These upgrades set the stage for future scalability upgrades including data sharding.

<ButtonLink to="/upgrades/beacon-chain/">
  The Beacon Chain
</ButtonLink>

### The Merge and the Shanghai upgrade {#merge-and-post-merge-cleanup}

In order to simplify and maximize focus on a successful transition to proof-of-stake, The Merge upgrade will not include certain anticipated features such as the ability to withdraw staked ETH. The Shanghai upgrade is planned to follow The Merge, in which the ability to withdraw is slotted as a top priority.

Stay up-to-date with the [Shanghai Planning issue on GitHub](https://github.com/ethereum/pm/issues/450), or the [EF Research and Development Blog](https://blog.ethereum.org/category/research-and-development/). For those curious, learn more about [What Happens After The Merge](https://youtu.be/7ggwLccuN5s?t=101), presented by Vitalik at the April 2021 ETHGlobal event.

### The Merge and data sharding {#merge-and-data-sharding}

Originally, the plan was to work on shard chains before The Merge—to address scalability. However, with the boom of [layer 2 scaling solutions](/layer-2/), the priority has shifted to swapping proof-of-work to proof-of-stake via The Merge.

Plans for sharding are rapidly evolving, but given the rise and success of layer 2 technologies to scale transaction execution, sharding plans have shifted to finding the most optimal way to distribute the burden of storing compressed calldata from rollup contracts, allowing for exponential growth in network capacity. This would not be possible without first transitioning to proof-of-stake.

<ButtonLink to="/upgrades/shard-chains/">
  Data sharding
</ButtonLink>

## Read more {#read-more}

<MergeArticleList />
