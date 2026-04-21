---
title: "Ethereum layer 2 scaling explained"
description: "An overview of layer 2 scaling solutions for Ethereum, including rollups, Plasma, state channels, and sidechains."
lang: en
youtubeId: "BgCgauWVTs0"
uploadDate: 2021-02-03
duration: "0:14:28"
educationLevel: intermediate
topic:
  - "scaling"
  - "layer-2"
format: explainer
author: Finematics
breadcrumb: "Layer 2 Scaling"
---

An explainer by **Finematics** covering layer 2 scaling solutions for Ethereum — including channels, Plasma, sidechains, and rollups, and why rollups are emerging as the dominant scaling strategy. Learn how these technologies reduce costs and increase throughput while inheriting Ethereum's security.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=BgCgauWVTs0) published by Finematics. It has been lightly edited for readability.*

#### Ethereum scaling (0:31) {#ethereum-scaling-031}

Ethereum scaling has been one of the most discussed topics pretty much since the time when the network launched. The scaling debate always heats up after a period of major network congestion.

One of the first periods like this was the 2017 crypto bull market, where the infamous CryptoKitties together with ICOs were able to clog up the entire Ethereum network, causing a major spike in gas fees. This year the network congestion came back even stronger, this time caused by the popularity of DeFi and yield farming. There were periods of time when even gas fees as high as 500+ gwei would not get your transaction verified for a while.

#### Scaling blockchains (1:20) {#scaling-blockchains-120}

When it comes to scaling Ethereum or blockchains in general, there are two major ways of doing it: scaling the base layer itself — layer 1 — or scaling the network by offloading some of the work to another layer — layer 2.

Layer 1 is the standard base consensus layer where pretty much all transactions are currently settled. The concept of layers is not an Ethereum-specific concept; other blockchains such as Bitcoin or Zcash also use it extensively.

Layer 2 is another layer built on top of layer 1. There are a few important points here: layer 2 doesn't require any changes in layer 1 — it can be just built on top of layer 1 using its existing elements, such as smart contracts. Layer 2 also leverages the security of layer 1 by anchoring its state into layer 1.

Ethereum can currently process around 15 transactions per second on its base layer. Layer 2 scaling can dramatically increase the number of transactions — depending on the solution, processing between 2,000 and 4,000 transactions per second.

#### Ethereum 2.0 (2:39) {#ethereum-20-239}

How about Ethereum 2.0? Wasn't that supposed to scale Ethereum? Yes — Ethereum 2.0 introduces proof of stake and sharding that will dramatically increase the transaction throughput on the base layer.

Does it mean we don't need layer 2 scaling when Ethereum 2.0 ships? Not really — even with sharding, Ethereum will still need layer 2 scaling to be able to handle hundreds of thousands or even millions of transactions per second in the future.

#### Scalability trilemma (3:15) {#scalability-trilemma-315}

This is also where the famous scalability trilemma comes into play. In theory, we could just skip layer 2 entirely and focus on scaling the base layer instead. This would require highly specialized nodes to handle the increased workload, which would lead to higher centralization and therefore lower the security and censorship-resistant properties of the network.

Sticking to the fact that scalability should never come at the expense of security and decentralization, we are left with a combination of layer 1 and layer 2 scaling going forward into the future.

#### Layer 2 scaling (3:52) {#layer-2-scaling-352}

Layer 2 scaling is a collective term for solutions that help with increasing the capabilities of layer 1 by handling transactions off-chain. The two main capabilities that can be improved are transaction speed and transaction throughput. On top of that, layer 2 solutions can greatly reduce the gas fees.

When it comes to actual scaling solutions, there are multiple options available. Some of the options are available right now and can increase the Ethereum network throughput in the near to medium term, while others are aiming for a medium to long-term time horizon. Some solutions are application-specific — for example, payment channels — while others, such as optimistic rollups, can be used for any arbitrary contract executions.

#### Channels (5:03) {#channels-503}

Channels are one of the first widely discussed scaling solutions. They allow participants to exchange their transactions a number of times while only submitting two transactions to the base layer. The most popular types of channels are state channels and their subtype, payment channels.

Although channels have the potential to easily process thousands of transactions per second, they come with a few downsides. They don't offer open participation — participants have to be known upfront, and users have to lock up their funds in a multisig contract. On top of that, this scaling solution is application-specific and cannot be used to scale general-purpose smart contracts.

The main project that leverages the power of state channels on Ethereum is Raiden. The concept of payment channels is also extensively used by Bitcoin's Lightning Network.

#### Plasma (6:04) {#plasma-604}

Plasma is a layer 2 scaling solution that was originally proposed by Joseph Poon and Vitalik Buterin. It's a framework for building scalable applications on Ethereum.

Plasma leverages the use of smart contracts and Merkle trees to enable the creation of an unlimited number of child chains — copies of the parent Ethereum blockchain. Offloading transactions from the main chain into child chains allows for fast and cheap transactions.

One of the drawbacks of Plasma is a long waiting period for users who want to withdraw their funds from layer 2. Plasma, similarly to channels, cannot be used to scale general-purpose smart contracts. The OMG Network is built on their own implementation of Plasma called More Viable Plasma. Matic Network is another example of a platform using an adapted version of the Plasma framework.

#### Sidechains (7:08) {#sidechains-708}

Sidechains are Ethereum-compatible independent blockchains with their own consensus models and block parameters. Interoperability with Ethereum is made possible by using the same Ethereum Virtual Machine, so contracts deployed to the Ethereum base layer can be directly deployed to the sidechain.

xDai is one example of such a sidechain.

#### ZK rollups (8:11) {#zk-rollups-811}

Rollups provide scaling by bundling — or "rolling up" — sidechain transactions into a single transaction and generating a cryptographic proof, also known as a SNARK (Succinct Non-interactive Argument of Knowledge). Only this proof is submitted to the base layer. With rollups, all transaction state and execution are handled in sidechains; the main Ethereum chain only stores transaction data.

There are two types of rollups: ZK rollups and optimistic rollups.

ZK rollups, although faster and more efficient than optimistic rollups, do not provide an easy way for existing smart contracts to migrate to layer 2.

Optimistic rollups run an EVM-compatible virtual machine called OVM (Optimistic Virtual Machine), which allows for executing the same smart contracts as can be executed on Ethereum. This is really important as it makes it easier for existing smart contracts to maintain their composability, which is extremely relevant in DeFi where all major smart contracts were already battle-tested.

One of the main projects working on optimistic rollups is Optimism, which is getting closer and closer to their mainnet launch. When it comes to ZK rollups, Loopring and DeversiFi are good examples of decentralized exchanges built on layer 2. On top of that, we have zkSync enabling scalable crypto payments.

#### A rollup-centric roadmap (9:18) {#a-rollup-centric-roadmap-918}

Rollup scalability can also be magnified by Ethereum 2.0. In fact, because rollups only need the data layer to be scaled, they can get a tremendous boost already in Ethereum 2.0 Phase 1, which is about the sharding of data.

Despite a spectrum of layer 2 scaling solutions available, it looks like the Ethereum community is converging on the approach of mainly scaling through rollups and Ethereum 2.0 Phase 1 data sharding. This approach was also confirmed in a recent post by Vitalik Buterin called "A Rollup-Centric Ethereum Roadmap."

In future videos, we'll explore the base layer scaling with Ethereum 2.0 and how both layer 1 and layer 2 scaling can help with making decentralized finance more accessible to everyone.
