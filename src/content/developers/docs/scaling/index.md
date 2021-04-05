---
title: Scaling
description: An introduction to the different scaling options currently being developed by the Ethereum community.
lang: en
sidebar: true
incomplete: true
---

## Scaling Overview {#scaling-overview}

The scalability of a blockchain is measured in transactions per second. On the Ethereum blockchain network congestion leads to slower transactions and nonviable gas prices. Increasing the network capacity (transactions per second) is fundamental to the meaningful and mass adoption of Ethereum. Conceptually scaling can be categorised as either on-chain scaling or off-chain scaling.

## On-Chain Scaling {#on-chain-scaling}

### Sharding

Sharding is the process of splitting a database horizontally to spread the load. In an Ethereum context, sharding will reduce network congestion and increase transactions per second by creating new chains, known as “shards”.

Learn more about [sharding](/eth2/shard-chains/).

## Off-Chain Scaling {#off-chain-scaling}

### Rollups {#rollups}

Rollups are solutions that perform transaction execution outside layer 1, but post transaction data on layer 1. As transaction data is on layer 1, this allows rollups to be secured by layer 1.

Learn more about [rollups](/developers/docs/layer-2-scaling/).

### State channels {#state-channels}

Initialising a state channel (on-chain) allows users to transact off-chain, minimizing network congestion, fees and delays. Upon closing a state channel the new state would be submitted back to the blockchain.

Learn more about [State channels](/developers/docs/layer-2-scaling/).

### Plasma {#plasma}

A plasma chain is a separate blockchain that is anchored to the main Ethereum chain, and uses fraud proofs (like [Optimistic rollups](/developers/docs/layer-2-scaling/)) to arbitrate disputes.

Learn more about [Plasma](/developers/docs/layer-2-scaling/).

### Validium {#validium}

Uses validity proofs like [ZK-rollups](/developers/docs/layer-2-scaling/) but data is not stored on the main layer 1 Ethereum chain. This can lead to 10k transactions per second per validium chain and multiple chains can be run in parallel.

Learn more about [Validium](/developers/docs/layer-2-scaling/).

### Sidechains {#sidechains}

A sidechain is a separate blockchain which runs in parallel to mainnet and operates independently. It has its own consensus algorithm ([Proof of Authority](https://en.wikipedia.org/wiki/Proof_of_authority), [Delegated proof-of-stake](https://en.bitcoinwiki.org/wiki/DPoS), [Byzantine fault tolerance](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained), and so on). It is connected to the main chain by a two-way bridge.

Learn more about [sidechains](/developers/docs/layer-2-scaling/).

## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_
