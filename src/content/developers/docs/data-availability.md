---
title: Data availability 
description: An overview of problems and solutions relating to data availability in Ethereum 
lang: en
sidebar: true
---

In Ethereum, a node proposing a new block is required to make the underlying data available to the remaining peer-to-peer nodes on the network. This concept, known as data availability, is fundamental to the security and functionality of every blockchain, including Ethereum. Data availability is so important that an entire field of research studying the so-called “data availability problem” exists. 

## What is data availability? {#what-is-data-availability}

“Data availability” is a guarantee that all transaction data for a block was published by the block proposer and is available to other network participants. As explained in “[Intro to Ethereum](/developers/docs/intro-to-ethereum/)”, Ethereum transactions are processed in [blocks](/developers/docs/blocks/) and chained together to form the “blockchain”.

Each block has two major parts: 

- The **block header**: This contains general information (metadata) about the block, such as the timestamp, block hash, block number, etc.
- The  **block body**: This contains the actual transactions processed as part of the block. 

[Miner nodes](/developers/docs/consensus-mechanisms/pow/mining/) (or validators in [proof-of-stake](/developers/docs/consensus-mechanisms/pos/)) proposing new blocks must publish both the block header and block body. This allows nodes participating in [consensus](/developers/docs/consensus-mechanisms/) (full nodes) to download the block and confirm that transactions follow Ethereum’s consensus protocol. 

[Full nodes](/developers/docs/nodes-and-clients/#full-node) are different from [light nodes](/developers/docs/nodes-and-clients/#light-node) that only download the block header. Without full nodes verifying transactions, block proposers could get away with inserting malicious transactions in blocks. 

### The data availability problem {#the-data-availability-problem}

The data availability problem is encapsulated in one question: “How do we verify that the data for a newly produced block is actually available?” As mentioned, the security Ethereum rests on the assumption that full nodes have access to block data. 

If a block producer publishes a new block, but hides some (or all) of the underlying information, they might be able to finalize invalid transactions. Even if a block is valid, withholding data still has negative implications for users and the functionality of the network.   

Most early discussions around data availability concerned the visibility of transaction data to full nodes (validators) participating in Ethereum’s consensus. However, newer DA research is also focused on verifying data availability with light clients. For light clients, the problem of data availability concerns validating a block’s data availability without having to download the entire block. 

### Data availability vs. data retrievability {#data-availability-vs-data-retrievability}

Data availability is a different idea from data retrievability. Data availability is the ability of peer-to-peer nodes to download transaction data for a block while it is being proposed for addition to the chain. In other words, data availability is relevant when a block is yet to pass consensus. 

Data retrievability is the ability of nodes to download transactions from a block *after* it has passed consensus. Essentially, data retrievability is concerned with retrieving data from historical blocks. A block becomes “historical” when other blocks have been built on it. 

The core Ethereum protocol is primarily concerned with data availability, not data retrievability. It isn’t the blockckhain’s duty to store data for every transaction it reaches consensus on. Besides, storing state data in perpetuity increases hardware requirements for full nodes and may harm decentralization. 

Nevertheless, data retrievability is a much easier problem to solve than data availability. The ability to retrieve historical blockchain data only needs a weak `1-of-N` assumption, meaning only one honest node has to store the data to make it retrievable. It is also assumed that many entities, such as blockchain explorers, have incentives to store archival data and can make it available to others on request. 

[More on solutions to the data retrievability problem](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding).

## Why is data availability important? {#why-is-data-availability-important}

### Blockchain security {#blockchain-security}

Data availability is crucial for blockchain security, or else “data withholding attacks” would become commonplace. A data withholding attack occurs when a miner or validator publishes a block but doesn’t share the transaction data used to build the block. 

If a data withholding attack happens, full nodes cannot verify the correctness of updates to Ethereum’s world state. This gives malicious block producers leeway to subvert protocol rules and advance invalid state transitions on the Ethereum network. 

This is important because other network participants, such as light clients, rely on full nodes to verify the network’s state. Unlike full nodes, light clients only check block headers and don’t download block data. Therefore, the rules around data availability ensure full nodes can validate blocks and prevent the chain from getting corrupted. 

### Decentralized scalability {#decentralized-scalability}

Due to Ethereum’s constraints, scalability has become a widely discussed topic. However, Ethereum’s vision is to [scale computation without trading off decentralization and security[(/upgrades/vision/). Data availability is critical to achieving decentralized scalability as explained below:


#### Data availability and layer 2 scaling {#data-availability-and-layer-2-scaling}

[Layer 2 scaling solutions](/layer-2/), such as [rollups](/glossary/#rollups), scale network throughput and latency by processing transactions off Ethereum's main execution layer. These off-chain transactions are usually compressed and posted on Ethereum in batches. 

Thousands of transactions could happen off-chain, but Ethereum nodes need to process one on-chain transaction. This reduces congestion on the base layer and reduces fees for users, while ensuring faster transactions. 

However, for Ethereum to guarantee the security of rollups, it needs a mechanism for verifying the validity of off-chain transactions. This is where data availability comes into the picture. 

[Optimistic Rollups](/developers/docs/scaling/optimistic-rollups/) post (compressed) transaction data to Ethereum as `calldata`. This allows anyone to verify the state of the rollup and also provides guarantees of transaction validity. If a particular transaction is invalid, a verifier can use the available transaction data to construct a [fraud proof](/glossary/#fraud-proof) to challenge it. 

[Zero-knowledge (ZK) rollups](/developers/docs/scaling/zk-rollups) don't need to post transaction data since zero-knowledge proofs 
validity proofs](/glossary/#zk-proof) guarantee the correctness of state transitions. However, we cannot guarantee the functionality of the ZK-rollup (or interact with it) without access to its state data. 

For example, users cannot know their balances if an operator withholds details about the rollup’s state. Also, they cannot perform state updates using information contained in a newly added block. 


#### Data availability and sharding {data-availability-and-sharding}

Although rollups can scale throughput with off-chain computation, their capacity is limited by the data throughput of the underlying blockchain. If rollups are to use Ethereum as a data availability layer, it must increase its data storage and processing capabilities. 

[Sharding](/upgrades/shard-chains/) is a  proposed method for increasing data throughput on Ethereum’s execution layer. In sharding, the network is split into a select number of sub-chains—each with a dedicated set of validators. 

Validators will only need to run full nodes for their shard and run in light-client capacity for other shards. Sharding increases data space available to rollups since the job of storing data is split across different shards. 

But data sharding introduces a new problem: “What if validators on one shard become malicious and start processing invalid state transitions?”. This is possible since full nodes no longer have access to the same transaction data as is currently the case. 

Implementing data sharding requires creating a system for nodes to verify data availability in other shards without downloading blocks. If validators must download data dumped on every shard, then the purpose of sharding is defeated. 

## Types of data availability systems {#types-of-data-availability-systems} 

### On-chain data availability {#on-chain-data-availability} 

The standard solution to solving data availability is to force block producers to publish all transaction data and have validating nodes download it. Ethereum uses this method, as do rollups (and other scaling solutions) that post transaction data on the L1 blockchain. 

The problem is that on-chain data availability places bottlenecks on scalability. Full nodes have to download the same data and check it, which reduces the number of transactions that can be processed per second.

More importantly, on-chain DA has negative implications for decentralization since it increases the data that full nodes must hold. If Ethereum’s state spirals, validators must invest in more expensive machines—which would probably reduce the number of people willing to run a validating node.  

### Off-chain data availability {#off-chain-data-availability} 

Off-chain data availability solutions move data storage off Ethereum's base layer. The block producer doesn't publish the data on-chain, but provides a cryptographic commitment to prove the availability of the data. 

This is a method used by some scaling solutions, such as [validiums](/developers/docs/scaling/validium/), to reduce the amount of data posted on Ethereum. The drawback is that this system requires trusting block producers to release the data if necessary.  

## What are some solutions to the data availability problem? {#solutions-to-data-availability-problem}

As mentioned, the data availability problem concerns the ability to verify availability of the transaction data for a newly proposed block. Solutions to this problem employ some mechanism for guaranteeing data availability. 

### Data availability committees {#data-availability-committees}

Pure validiums store transaction data off-chain with a block producer, making them centralized to an extent. This reduces decentralization and security, since the block producer can publish invalid transactions and conceal the rollup's true state by hiding transaction data. 

Some validiums mitigate this problem by forcing block producers to store transaction data with trusted parties that form the Data Availability Committee (DAC). Members of the DAC are expected to securely store the data off-chain and publish it on-chain in event of a dispute. They also publish attestations on-chain to prove that the said data is indeed available. 

[More on data availability committees.](https://medium.com/starkware/data-availability-e5564c416424)  

### Proof-of-stake data availability committees {#proof-of-stake-data-availability-committees}

While data availability committees are better than the status quo in a validium, trust assumptions still persist. What if the DAC colludes with the block producer to withhold transaction data? DACs are often small in size, increasing the risk of collusion and the possibility of an external actor compromising the group. 

Some validiums replace DACs with a proof-of-stake (PoS) validator system. Here, anyone can become a validator and store data off-chain. However, they must provide a “bond”, which is deposited in a smart contract. In the event of malicious behavior, such as the validator withholding data, the bond can be slashed. 

Proof-of-stake data availability committees are considerably more secure than regular DACs. Not only are they permissionless and trustless, but they also have well-designed incentives to encourage honest behavior. 

[More on proof-of-stake data availability committees.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf) 

### Data availability sampling {#data-availability-sampling}

Data availability sampling is a cryptographic mechanism for guaranteeing data availability. Data availability sampling allows blockchain nodes to verify that data for a proposed block is available without having to download the entire block. 

In a DAS system, a node samples small, random chunks of a block over multiple rounds to verify data availability. With many nodes sampling different parts of a block simultaneously, its  availability can be verified with high statistical certainty. 

When applied to blockchains, like Ethereum, data availability sampling ensures light clients also participate in guaranteeing the chain's security and functionality. Light clients can run without expensive hardware, making it easier for anyone to validate on the Ethereum network. 

[More on data availability sampling.](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling) 

### Data availability proofs {#data-availability-proofs}

While DAS gives statistical guarantees of data availability, a malicious node can still hide some data. DAS techniques only prove that the majority of the block data is available, not that the entire block is available. And much harm can come from block producers hiding even a tiny amount of transaction data. 

To solve this problem, we combine data availability sampling with [erasure coding](https://en.wikipedia.org/wiki/Erasure_code) to create “data availability proofs”. Erasure coding is a technique that allows us to double a dataset by adding redundant pieces (called erasure codes). If the original data is lost, the erasure codes can be used to reconstruct the original piece of data. 

When implemented in blockchains, erasure codes improve data availability because a small fraction of the data is enough to reconstruct the whole transaction set in a block. In this system, a malicious block producer would need to withhold more than 50% of the block to perform a data withholding attack. Previously, a block producer only needed to seize 1% of block data to act maliciously. 

With erasure-coded blocks, light clients have statistical certainty that the entire block data was published on the network. It also means that light clients don't have to rely on full nodes to alert them of the unavailability of a block. 

[More on data availability proofs.](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Further reading {#further-reading}

- [WTF is Data Availability?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f) 
- [What Is Data Availability?](https://coinmarketcap.com/alexandria/article/what-is-data-availability) 
- [The Data Availability Problem](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/) 
- [The Ethereum Off-Chain Data Availability Landscape](https://blog.celestia.org/ethereum-off-chain-data-availability-landscape/)  
- [A primer on data availability checks](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html) 
- [An explanation of the sharding + DAS proposal](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling) 
