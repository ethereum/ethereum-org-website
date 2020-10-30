---
title: The docking
description: Learn about the docking - the first major eth2 upgrade to Ethereum.
lang: en
template: eth2
sidebar: true
summary: Once the beacon chain and all the shards are running smoothly, attention will turn to Ethereum mainnet. Mainnet won't change for a while – we're building the beacon chain and the shard chains in parallel to the Ethereum we use today. But eventually mainnet will become a shard so it can join the new proof-of-stake system.
summary1: Mainnet won't be affected by any Eth2 upgrade until the docking.
summary2: Docking merges mainnet with the beacon chain system that is validated separately from mainnet.
summary3: Docking will turn mainnet into a shard chain and signal the end of of Proof of Work.
---

<UpgradeStatus date="~2021/22">
    This upgrade depends on the success of the shard chain implementation. But it’s the moment we can finally say that Ethereum has become Ethereum 2.0 – more scalability, security, and sustainability with staking supporting the whole network.
</UpgradeStatus>

## What is the docking?

It's important to remember that initially, the other Eth2 upgrades don't impact Ethereum mainnet - the chain we use today. Ethereum mainnet will continue to be secured by [Proof of Work](/en/developers/docs/mining/), even while [the beacon chain](/en/eth2/beacon-chain/) and its [shard chains](/en/eth2/shard-chains/) run in parallel using Proof of Stake. The docking is when these two systems are merged together.

Imagine Ethereum is a space ship that isn’t quite ready for an interstellar voyage. With the beacon chain and the shard chains we’ve built an amazing new mothership that’s ready to put in some serious lightyears – complete with a better engine and a hardened hull. When it’s time, we want the ship we started with to dock with the mothership so it can become one ship, ready to take on the universe.

## Docking mainnet

When ready, Ethereum mainnet will "dock" with the beacon chain, becoming its own shard which uses Proof of Stake instead of Proof of Work.

Mainnet will bring the ability to run smart contracts into the Proof of Stake system, plus Ethereum's "state" to make sure the chain's history remains verifiable.

<!-- ### Improving mainnet

Before mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/en/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## After the docking

This will signal the end of proof-of-work for Ethereum and start the era of a more sustainable, eco-friendly Ethereum. At this point Ethereum will have the scale, security and sustainability outlined in its [Eth2 vision](/en/eth2/vision/).

## Relationship between upgrades

The Eth2 upgrades are all somewhat interrelated. So let’s recap how the docking relates to the other upgrades.

### Docking and the beacon chain

Once the docking happens, stakers will be assigned to validate the Ethereum mainnet. Just like with the shard chains. Mining will no longer be required so miners will likely invest their earnings into staking in the new proof-of-stake system.

<ButtonLink to="/en/eth2/beacon-chain/">The beacon chain</ButtonLink>

### Docking and shard chains

With mainnet becoming a shard, the successful implementation of the shard chains is critical to this upgrade. It’s likely that the transition will play an important role in helping the community to decide whether to rollout a second upgraded to sharding. This upgradde will make the other shards like mainnet: they’ll be able to handle transactions and smart contracts and not just provide more data.

<ButtonLink to="/en/eth2/shard-chains/">Shard chains</ButtonLink>

<Divider />

### Read more

<Eth2DockingList />
