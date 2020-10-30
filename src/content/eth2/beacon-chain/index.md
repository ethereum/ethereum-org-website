---
title: The Beacon Chain
description: Learn about the beacon chain - the first major eth2 upgrade to Ethereum.
lang: en
template: eth2
sidebar: true
summary: The beacon chain is the first major Eth2 upgrade to Ethereum. But it doesn’t change anything about the Ethereum we use today. Instead it introduces a second chain to the ecosystem. A chain with a different role that brings in some exciting new opportunities to ETH holders everywhere.
---

<UpgradeStatus isShipped date="Shipped!">
    The beacon chain shipped in late November 2020. You won’t haven’t noticed a change in your Ethereum usage but you can now play a more active role in securing the Ethereum network by <a href="/en/eth2/staking/">staking</a>.
</UpgradeStatus>

## What does the beacon chain do?

The beacon chain will conduct or coordinate the expanded network of [shards](/en/eth2/shard-chains/) and [stakers](/en/eth2/staking/). But it isn’t like the Ethereum mainnet of today. It doesn’t have accounts and it can’t handle smart contracts.

The beacon chain’s role will change over time but it’s a foundational component for [the secure, sustainable and scalable Ethereum we’re working towards](/en/eth2/vision/).

## Beacon chain features

### Introducing staking

The beacon chain introduces staking to Ethereum. This allows you to put your ETH into a special account where it helps secure the network. Think of this like a public good that will make Ethereum healthier and earn you more ETH in the process. In practice, it will involve you staking ETH in order to run software that keeps Ethereum going. With this software you’ll be processing transactions and creating new blocks in the chain.

This is a lot easier to do than how the network is currently secured: [mining](/en/developers/docs/mining/).

This extra accessibility will help make Ethereum more secure in the long run. The more people that participate in the network, the more decentralized and secure it will become.

This is also an important change for the second Eth2 upgade: [shard chains](/en/eth2/shard-chains/).

### Setting up for shard chains

Shard chains will be the second Eth2 upgrade. They’ll increase the capacity of the network and improve transaction speed by extending the network to 64 blockchains. The beacon chain is an important first step in introducing shard chains, because they require staking to work securely.

Eventually the beacon chain will also be responsible for randomly assigning stakers to validate shard chains. This is key to making it difficult for stakers to collude and take over a shard. Well, it means they have [less than a 1 in a trillion chance](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relationship between upgrades

The Eth2 upgrades are all somewhat interrelated. So let’s recap how the beacon chain affects the other upgrades.

### Shards and the beacon chain

Shard chains can only safely enter the Ethereum ecosystem with a proof-of-stake consensus mechanism in place. The beacon chain will introduce staking, pathing the way for the shard chain upgrade to follow.

<ButtonLink to="/en/eth2/shard-chains/">Shard chains</ButtonLink>

### Mainnet and the beacon chain

The beacon chain will exist separately to the Ethereum mainnet we use today. But the plan is to “dock” mainnet into the proof-of-stake system in the future. Remember, that’s controlled and coordinated by the beacon chain.

<ButtonLink to="/en/eth2/docking/">The docking</ButtonLink>

<Divider />

## Interact with the beacon chain

<Eth2BeaconChainActions />
