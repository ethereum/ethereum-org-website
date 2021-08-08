---
title: Scaling
description: An introduction to the different scaling options currently being developed by the Ethereum community.
lang: en
sidebar: true
---

## Scaling Overview {#scaling-overview}

As the number of people using Ethereum has grown, the blockchain has reached certain capacity limitations. This has driven up the cost of using the network, creating the need for "scaling solutions." There are multiple solutions being researched, tested and implemented that take different approaches to achieve similar goals.

The main goal of scalability is to increase transaction speed (faster finality), and transaction throughput (high transactions per second), without sacrificing decentralization or security (more on [Eth2 vision](/eth2/vision/)). On the layer 1 Ethereum blockchain, high demand leads to slower transactions and nonviable gas prices. Increasing the network capacity in terms of speed and throughput is fundamental to the meaningful and mass adoption of Ethereum.

While speed and throughput are important, it is essential that scaling solutions enabling these goals remain decentralized and secure. Keeping the barrier to entry low for node operators is critical in preventing a progression towards centralized and insecure computing power.

Conceptually we first categorize scaling as either on-chain scaling or off-chain scaling.

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics. Implementing scaling solutions is advanced as the technology is less battle-tested, and continues to be researched and developed.

## On-Chain Scaling {#on-chain-scaling}

This method of scaling requires changes to the Ethereum protocol (layer 1 [Mainnet](/glossary/#mainnet)). Sharding is currently the main focus for this method of scaling.

### Sharding {#sharding}

Sharding is the process of splitting a database horizontally to spread the load. In an Ethereum context, sharding will reduce network congestion and increase transactions per second by creating new chains, known as “shards.” This will also lighten the load for each validator who will no longer be required to process the entirety of all transactions across the network.

Learn more about [sharding](/eth2/shard-chains/).

## Off-Chain Scaling {#off-chain-scaling}

Off-chain solutions are implemented separately from layer 1 Mainnet - they require no changes to the existing Ethereum protocol. Some solutions, known as "layer 2" solutions, derive their security directly from layer 1 Ethereum consensus, such as [rollups](/developers/docs/scaling/layer-2-rollups/) or [state channels](/developers/docs/scaling/state-channels/). Other solutions involve the creation of new chains in various forms that derive their security separately from Mainnet, such as [sidechains](#sidechains) or [plasma](#plasma) chains. These solutions communicate with Mainnet, but derive their security differently to obtain a variety of goals.

### Layer 2 Scaling {#layer-2-scaling}

This category of off-chain solutions derives its security from Mainnet Ethereum.

Most layer 2 solutions are centered around a server or cluster of servers, each of which may be referred to as a node, validator, operator, sequencer, block producer, or similar term. Depending on the implementation, these layer 2 nodes may be run by the businesses or entities that use them, or by a 3rd party operator, or by a large group of individuals (similar to Mainnet). Generally speaking, transactions are submitted to these layer 2 nodes instead of being submitted directly to layer 1 (mainnet); the layer 2 instance then batches them into groups before anchoring them to layer 1, after which they are secured by layer 1 and cannot be altered. The details of how this is done vary significantly between different layer 2 technologies and implementations.

A specific layer 2 instance may be open and shared by many applications, or may be deployed by one company and dedicated to supporting only their application.

#### Rollups {#rollups}

Rollups perform transaction execution outside layer 1 and then the data is posted to layer 1 where consensus is reached. As transaction data is included in layer 1 blocks, this allows rollups to be secured by native Ethereum security.

- [ZK-rollups](/developers/docs/scaling/layer-2-rollups/#zk-rollups)
- [Optimistic rollups](/developers/docs/scaling/layer-2-rollups/#optimistic-rollups)

Learn more about [rollups](/developers/docs/scaling/layer-2-rollups/).

#### State Channels {#channels}

State channels utilize multisig contracts to enable participants to transact quickly and freely off-chain, then settle finality with Mainnet. This minimizes network congestion, fees, and delays. The two types of channels are currently state channels and payment channels.

Learn more about [state channels](/developers/docs/scaling/state-channels/).

### Sidechains {#sidechains}

A sidechain is an independent EVM-compatible blockchain which runs in parallel to Mainnet. These are compatible with Ethereum via two-way bridges, and run under their own chosen rules of consensus, and block parameters.

Learn more about [Sidechains](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

A plasma chain is a separate blockchain that is anchored to the main Ethereum chain, and uses fraud proofs (like [Optimistic rollups](/developers/docs/scaling/layer-2-rollups/#optimistic-rollups)) to arbitrate disputes.

Learn more about [Plasma](/developers/docs/scaling/plasma/).

## Why are so many scaling solutions needed? {#why-do-we-need-these}

- Multiple solutions can help reduce the overall congestion on any one part of the network, and also prevents single points of failure.
- The whole is greater than the sum of its parts. Different solutions can exist and work in harmony, allowing for an exponential effect on future transaction speed and throughput.
- Not all solutions require utilizing the Ethereum consensus algorithm directly, and alternatives can offer benefits that would otherwise be difficult to obtain.
- No one scaling solution is enough to fulfill the [eth2 vision](/eth2/vision/).

## More of a visual learner? {#visual-learner}

<iframe width="100%" height="315" src="https://www.youtube.com/embed/BgCgauWVTs0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

_Note the explanation in the video uses the term "Layer 2" to refer to all off-chain scaling solutions, while we differentiate "Layer 2" as an off-chain solution that derives its security through layer 1 Mainnet consensus._

## Further reading {#further-reading}

- [Up-to-date analytics on Layer 2 scaling solutions for Ethereum](https://www.l2beat.com/)
- [Evaluating Ethereum layer 2 Scaling Solutions: A Comparison Framework](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [An Incomplete Guide to Rollups](https://vitalik.ca/general/2021/01/05/rollup.html)

_Know of a community resource that helped you? Edit this page and add it!_
