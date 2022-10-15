---
title: Sharding
description: Learn about sharding - breaking up and distributing the data load needed to give Ethereum more transaction capacity and make it easier to run.
lang: en
template: upgrade
image: ../../../assets/upgrades/newrings.png
summaryPoint1: Sharding is a multi-phase upgrade to improve Ethereum’s scalability and capacity.
summaryPoint2: Sharding provides secure distribution of data storage requirements, enabling rollups to be even cheaper, and making nodes easier to operate.
summaryPoint3: They enable layer 2 solutions to offer low transaction fees while leveraging the security of Ethereum.
summaryPoint4: This upgrade has become more of a focus since Ethereum moved to proof-of-stake.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Sharding could ship sometime in 2023. Shards will give Ethereum more capacity to store and access data, but they won’t be used for executing code.
</UpgradeStatus>

## What is sharding? {#what-is-sharding}

Sharding is the process of splitting a database horizontally to spread the load – it’s a common concept in computer science. In an Ethereum context, sharding will work synergistically with [layer 2 rollups](/layer-2/) by splitting up the burden of handling the large amount of data needed by rollups over the entire network. This will continue to reduce network congestion and increase transactions per second.

This is important for reasons other than scalability.

## Features of sharding {#features-of-sharding}

### Everyone can run a node {#everyone-can-run-a-node}

Sharding is a good way to scale if you want to keep things decentralized as the alternative is to scale by increasing the size of the existing database. This would make Ethereum less accessible for network validators because they'd need powerful and expensive computers. With sharding, validators will no longer be required to store all of this data themselves, but instead can use data techniques to confirm that the data has been made available by the network as a whole. This drastically reduces the cost of storing data on layer 1 by reducing hardware requirements.

### More network participation {#more-network-participation}

Sharding will eventually let you run Ethereum on a personal laptop or phone. So more people should be able to participate, or run [clients](/developers/docs/nodes-and-clients/), in a sharded Ethereum. This will increase security because the more decentralized the network, the smaller the attack surface area.

With lower hardware requirements, sharding will make it easier to run [clients](/developers/docs/nodes-and-clients/) on your own, without relying on any intermediary services at all. And if you can, consider running multiple clients. This can help network health by further reducing points of failure.

<br />

<InfoBanner isWarning>
  You'll need to run an execution client at the same time as your consensus client. <a href="https://launchpad.ethereum.org" target="_blank">The launchpad</a> will walk you through the hardware requirements and process.
</InfoBanner>

## Shard chains version 1: data availability {#data-availability}

<InfoBanner emoji=":construction:" isWarning>
  <strong>Note:</strong> The plans for sharding have been evolving as more efficient paths to scaling have been developed. "Danksharding" is a new approach to sharding, which does not utilize the concept of shard "chains" but instead uses shard "blobs" to split up the data, along with "data availability sampling" to confirm all data has been made available. This change in plan solves the same original problem.<br/><br/>
  <strong>Details below may be out of date with the latest development plans.</strong> While we update things, check out <a href="https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum">The Hitchhiker's Guide to the Ethereum</a> for an excellent breakdown of Ethereum roadmap.
</InfoBanner>

When the first shard chains are shipped they will just provide extra data to the network. They won’t handle transactions or smart contracts. But they’ll still offer incredible improvements to transactions per second when combined with rollups.

Rollups are a "layer 2" technology that exists today. They allow dapps to bundle or “roll up” transactions into a single transaction off-chain, generate a cryptographic proof and then submit it to the chain. This reduces the data needed for a transaction. Combine this with all the extra data availability provided by shards and you get 100,000 transactions per second.

## Shard chains version 2: code execution {#code-execution}

The plan was always to add extra functionality to shards, to make them more like the [Ethereum Mainnet](/glossary/#mainnet) today. This would allow them to store and execute code and handle transactions, as each shard would contain its unique set of smart contracts and account balances. Cross-shard communication would allow for transactions between shards.

Considering the transactions per second boost that version 1 shards provide though, does this still need to happen? This is still being debated in the community and it seems like there are a few options.

### Do shards need code execution? {#do-shards-need-code-execution}

Vitalik Buterin, when talking to Bankless podcast, presented 3 potential options that are worth discussing.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. State execution not needed {#state-execution-not-needed}

This would mean we don’t give shards the capability to handle smart contracts and leave them as data depots.

#### 2. Have some execution shards {#some-execution-shards}

Perhaps there’s a compromise where we don’t need all shards to be smarter. We could just add this functionality to a few and leave the rest. This could speed the delivery up.

#### 3. Wait until we can do Zero Knowledge (ZK) snarks {#wait-for-zk-snarks}

Finally, perhaps we should revisit this debate when ZK snarks are firmed up. This is a technology that could help bring truly private transactions to the network. It’s likely that they’ll require smarter shards, but they’re still in research and development.

#### Other sources {#other-sources}

Here's some more thinking along the same lines:

- [Phase One and Done: Eth2 as a data availability engine](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

This is still an active discussion point. We’ll update these pages once we know more.

## Relationship between upgrades {#relationship-between-upgrades}

The Ethereum upgrades are all somewhat interrelated. So let’s recap how the shard chains relate the other upgrades.

### Shards and the Ethereum blockchain {#shards-and-blockchain}

The logic for keeping shards secure and synced up is all integrated into the Ethereum clients that build the blockchain. Stakers in the network will be assigned to shards to work on. Shards will have access to snapshots of other shards so they can build a view of Ethereum’s state to keep everything up-to-date.

### Read more {#read-more}

<ShardChainsList />
