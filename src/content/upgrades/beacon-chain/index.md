---
title: The Beacon Chain
description: Learn about the Beacon Chain - the upgrade that introduced proof-of-stake Ethereum.
lang: en
template: upgrade
sidebar: true
image: ../../../assets/upgrades/core.png
summaryPoint1: The Beacon Chain doesn't change anything about the Ethereum we use today.
summaryPoint2: It introduced proof-of-stake to the Ethereum ecosystem.
summaryPoint3: It will coordinate the network, serving as the consensus layer.
summaryPoint4: It is an essential precursor to upcoming scaling upgrades, such as sharding.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
  The Beacon Chain shipped on December 1, 2020. To learn more, <a href="https://beaconscan.com/">explore the data</a>. If you want to help validate the chain, you can <a href="/staking/">stake your ETH</a>.
</UpgradeStatus>

## What does the Beacon Chain do? {#what-does-the-beacon-chain-do}

The Beacon Chain is a ledger of accounts that conducts and coordinates the network of [stakers](/staking/). It isn't quite like the [Ethereum Mainnet](/glossary/#mainnet) of today. It does not process transactions or handle smart contract interactions.

It is a new consensus engine (or "consensus layer") that will soon take the place of proof-of-work mining, bringing many significant improvements with it.

The Beacon Chain's role will change over time, but it's a foundational component for [the secure, environmentally friendly and scalable Ethereum we’re working towards](/upgrades/vision/).

## Beacon Chain impact {#beacon-chain-features}

### Introducing staking {#introducing-staking}

The Beacon Chain introduced [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) to Ethereum. This is a new way for you to help keep Ethereum secure. Think of it like a public good that will make Ethereum healthier and earn you more ETH in the process. In practice, staking involves you staking ETH in order to activate validator software. As a staker, you'll run node software that processes transactions and creates new blocks in the chain.

Staking serves a similar purpose to [mining](/developers/docs/mining/), but is different in many ways. Mining requires large up-front expenditures in the form of powerful hardware and energy consumption, resulting in economies of scale, and promoting centralization. Mining also does not come with any requirement to lock up assets as collateral, limiting the protocol's ability to punish bad actors after an attack.

The transition to proof-of-stake will make Ethereum significantly more secure and decentralized by comparison. The more people that participate in the network, the more decentralized and safe from attacks it becomes.

<InfoBanner emoji=":money_bag:">
  If you're interested in becoming a validator and helping secure the Ethereum, <a href="/staking/">learn more about staking</a>.
</InfoBanner>

### The Merge and the end of mining {#the-merge}

While the Beacon Chain (or "consensus layer") is already live, it has existed as a separate chain from Mainnet (or the "execution layer") since its genesis. The plan is to swap out the current proof-of-work algorithm on the execution layer today and replace it with the proof-of-stake consensus protocol that the Beacon Chain provides.

This process is known as **The Merge**, as it will 'merge' the new consensus layer with the existing execution layer and stop the use of mining.

The Merge will have an immediate and profound impact on the carbon footprint of the Ethereum network. It also sets the stage for future scalability upgrades such as sharding.

[Learn more about Ethereum energy consumption](/energy-consumption/)

[Learn more about The Merge](/upgrades/merge/)

### Setting up for sharding {#setting-up-for-sharding}

After Mainnet merges with the Beacon Chain, the next major upgrade will introduce data sharding to the network.

Proof-of-stake has the advantage of having a registry of all approved block producers at any given time, each with ETH at stake. This registry sets the stage for the ability to divide and conquer but reliably split up specific network responsibilities.

This responsibility is in contrast to proof-of-work, where miners have no obligation to the network and could stop mining and turn their node software off permanently in an instant without repercussion. There is also no registry of known block proposers and no reliable way to split network responsibilities safely.

[More on sharding](/upgrades/shard-chains/)

## Relationship between upgrades {#relationship-between-upgrades}

The Ethereum upgrades are all somewhat interrelated. So let’s recap how the Beacon Chain affects the other upgrades.

### Beacon Chain and The Merge {#merge-and-beacon-chain}

The Beacon Chain, at first, will exist separately to the Ethereum Mainnet we use today. But eventually they will be connected. The plan is to "merge" Mainnet into the proof-of-stake system that's controlled and coordinated by the Beacon Chain.

<ButtonLink to="/upgrades/merge/">
  The Merge
</ButtonLink>

### Shards and the Beacon Chain {#shards-and-beacon-chain}

Sharding can only safely enter the Ethereum ecosystem with a proof-of-stake consensus mechanism in place. The Beacon Chain introduced staking, which when 'merged' with Mainnet will pave the way for sharding to help further scale Ethereum.

<ButtonLink to="/upgrades/shard-chains/">
  Shard chains
</ButtonLink>

<Divider />

## Interact with the Beacon Chain {#interact-with-beacon-chain}

<BeaconChainActions />
