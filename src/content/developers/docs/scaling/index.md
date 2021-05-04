---
title: Scaling
description: An introduction to the different scaling options currently being developed by the Ethereum community.
lang: en
sidebar: true
incomplete: true
---

## Scaling Overview {#scaling-overview}

As the number of people using Ethereum has grown, the blockchain in its native form has reached certain capacity limitations. This has driven up the cost of using the network, creating the need for "scaling solutions." There are multiple solutions being researched, tested and implemented that take different approaches to achieving similar goals.

The main goal of scalability is to increase transactions per second (TPS), without sacrificing decentralization or security (more on [Eth2 vision](/eth2/vision/)). On the layer 1 Ethereum blockchain, high demand leads to slower transactions and nonviable gas prices. Increasing the network capacity in terms of TPS is fundamental to the meaningful and mass adoption of Ethereum. 

While TPS is important, it is essential that scaling solutions enabling high transaction throughout remain decentralized and secure. Keeping the barrier to entry low for node operators is critical in preventing a progression towards centralized and insecure computing power.

Conceptually scaling can be categorised as either on-chain scaling or off-chain scaling.

## On-Chain Scaling {#on-chain-scaling}

### Sharding {#sharding}

Sharding is the process of splitting a database horizontally to spread the load. In an Ethereum context, sharding will reduce network congestion and increase transactions per second by creating new chains, known as “shards”. This will also lighten the load for each validator who will no longer be required to process the entirety of all transactions across the network.

Learn more about [Sharding](/eth2/shard-chains/).

## Off-Chain Scaling {#off-chain-scaling}

Off-chain solutions are designed separate from layer 1 mainnet. Some solutions, known as "Layer 2" solutions, derive their security directly from layer 1 Ethereum consensus. Other solutions have created their own chains with independent consensus mechanisms. These solutions communicate with mainnet, but derive their security differently to obtain a variety of goals.

### Rollups {#rollups}

Rollups are solutions that perform transaction execution outside layer 1, but post transaction data on layer 1. As transaction data is included in layer 1 blocks, this allows rollups to be secured by native Ethereum security.

Learn more about [Rollups](/developers/docs/scaling/layer-2/).

### State channels {#state-channels}

Initialising a state channel (on-chain) allows users to transact off-chain, minimizing network congestion, fees and delays. Upon closing a state channel the new state would be submitted back to the blockchain.

Learn more about [State channels](/developers/docs/scaling/layer-2/).

### Plasma {#plasma}

A plasma chain is a separate blockchain that is anchored to the main Ethereum chain, and uses fraud proofs (like [Optimistic rollups](/developers/docs/scaling/layer-2/)) to arbitrate disputes.

Learn more about [Plasma](/developers/docs/scaling/alternative/).

### Validium {#validium}

Uses validity proofs like [ZK-rollups](/developers/docs/scaling/layer-2/) but data is not stored on the main layer 1 Ethereum chain. This can lead to 10k transactions per second per validium chain and multiple chains can be run in parallel.

Learn more about [Validium](/developers/docs/scaling/alternative/).

### Sidechains {#sidechains}

A sidechain is a separate blockchain which runs in parallel to mainnet and operates independently. It has its own consensus algorithm ([Proof of Authority](https://en.wikipedia.org/wiki/Proof_of_authority), [Delegated proof-of-stake](https://en.bitcoinwiki.org/wiki/DPoS), [Byzantine fault tolerance](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained), and so on). It is connected to the main chain by a two-way bridge.

Learn more about [Sidechains](/developers/docs/scaling/alternative/).

## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_
