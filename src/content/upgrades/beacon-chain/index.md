---
title: The Beacon Chain
description: Learn about the Beacon Chain - the upgrade that introduced proof-of-stake Ethereum.
lang: en
template: upgrade
sidebar: true
image: ../../../assets/upgrades/core.png
summaryPoint1: The Beacon Chain doesn't change anything about the Ethereum we use today.
summaryPoint2: It will coordinate the network, serving as the consensus layer.
summaryPoint3: It introduced proof-of-stake to the Ethereum ecosystem.
summaryPoint4: You might know this as "Phase 0" on technical roadmaps.
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    The Beacon Chain shipped on December 1, 2020 at noon UTC. To learn more, <a href="https://beaconscan.com/">explore the data</a>. If you want to help validate the chain, you can <a href="/staking/">stake your ETH</a>.
</UpgradeStatus>

## What does the Beacon Chain do? {#what-does-the-beacon-chain-do}

The Beacon Chain will conduct or coordinate the expanded network of [shards](/upgrades/shard-chains/) and [stakers](/staking/). But it won't be like the [Ethereum Mainnet](/glossary/#mainnet) of today. It can't handle accounts or smart contracts.

The Beacon Chain’s role will change over time but it’s a foundational component for [the secure, sustainable and scalable Ethereum we’re working towards](/upgrades/vision/).

## Beacon Chain features {#beacon-chain-features}

### Introducing staking {#introducing-staking}

The Beacon Chain will introduce [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) to Ethereum. This is a new way for you to help keep Ethereum secure. Think of it like a public good that will make Ethereum healthier and earn you more ETH in the process. In practice, it will involve you staking ETH in order to activate validator software. As a validator you'll process transactions and create new blocks in the chain.

Staking and becoming a validator is easier than [mining](/developers/docs/mining/) (how the network is currently secured). And it's hoped this will help make Ethereum more secure in the long run. The more people that participate in the network, the more decentralized and safe from attack it will become.

<InfoBanner emoji=":money_bag:">
If you're interested in becoming a validator and helping secure the Beacon Chain, <a href="/staking/">learn more about staking</a>.
</InfoBanner>

This is also an important change for another upgrade: [shard chains](/upgrades/shard-chains/).

### Setting up for shard chains {#setting-up-for-shard-chains}

After Mainnet merges with the Beacon Chain, the next upgrade will introduce shard chains to the proof-of-stake network. These "shards" will increase the capacity of the network and improve transaction speed by extending the network to 64 blockchains. The Beacon Chain is an important first step in introducing shard chains, because they require staking to work securely.

Eventually the Beacon Chain will also be responsible for randomly assigning stakers to validate shard chains. This is key to making it difficult for stakers to collude and take over a shard. Well, it means they have [less than a 1 in a trillion chance](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relationship between upgrades {#relationship-between-upgrades}

The Ethereum upgrades are all somewhat interrelated. So let’s recap how the Beacon Chain affects the other upgrades.

### Mainnet and the Beacon Chain {#mainnet-and-beacon-chain}

The Beacon Chain, at first, will exist separately to the Ethereum Mainnet we use today. But eventually they will be connected. The plan is to "merge" Mainnet into the proof-of-stake system that's controlled and coordinated by the Beacon Chain.

<ButtonLink to="/upgrades/merge/">
    The Merge
</ButtonLink>

### Shards and the Beacon Chain {#shards-and-beacon-chain}

Shard chains can only safely enter the Ethereum ecosystem with a proof-of-stake consensus mechanism in place. The Beacon Chain will introduce staking, paving the way for the shard chain upgrade to follow.

<ButtonLink to="/upgrades/shard-chains/">
    Shard chains
</ButtonLink>

<Divider />

## Interact with the Beacon Chain {#interact-with-beacon-chain}

<BeaconChainActions />
