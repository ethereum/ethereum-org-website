---
title: Data availability
description: An overview of problems and solutions relating to data availability in Ethereum
lang: en
---

Trustlessness is a major premise of public blockchains ("don't trust, verify"). One of the ways Ethereum reduces trust assumptions is by enforcing rules on data availability. Block producers are required to publish the data for each block, which nodes participating in Ethereum's consensus store locally.

All nodes on the Ethereum network execute the transactions in blocks they receive from peers to ensure that the changes proposed by a block producer precisely match those computed independently by the node. This is how nodes verify that new information is valid, rather than having to trust that block producers are honest. This is not possible if any data is missing.

Data availability is important because if we can’t reproduce something with the data we have available, from the blockchain’s perspective, it does not exist. Access to a block's data enables validating nodes to trustlessly replay transactions using their version of Ethereum's world state and independently verify the correctness of each block.

## Prerequisites {#prerequisites}

You should have a good understanding of [blockchain fundamentals](/developers/docs/intro-to-ethereum/), especially [consensus mechanisms](/developers/docs/consensus-mechanisms/). This page also assumes the reader is familiar with [blocks](/developers/docs/blocks/), [transactions](/developers/docs/transactions/), [nodes](/developers/docs/nodes-and-clients/), [scaling solutions](/developers/docs/scaling/), and other relevant topics.

## What is data availability? {#what-is-data-availability}

Data availability is the guarantee that the block proposer published all transaction data for a block and that the transaction data is available to other network participants. Ethereum transactions get processed in [blocks](/developers/docs/blocks/). These blocks are chained together to form the "blockchain".

Each block has two major parts:

- The **block header**: This contains general information (metadata) about the block, such as the timestamp, block hash, block number, etc.
- The **block body**: This contains the actual transactions processed as part of the block.

When proposing new blocks, block producers must publish the entire block, including the transaction data (contained in the block body). Nodes participating in consensus can then download the block's data and re-execute the transactions to confirm their validity. Without nodes verifying transactions, block proposers could get away with inserting malicious transactions in blocks.

### The data availability problem {#the-data-availability-problem}

We can encapsulate the data availability problem into the question: "how do we verify that the data for a newly produced block is available?". This data being available is crucial as the security of Ethereum assumes that full nodes have access to block data.

If a block producer proposes a block without all the data being available, it could reach finality whilst containing invalid transactions. Even if the block is valid, the block's data not being fully available to validate has negative implications for users and the functionality of the network.

The data availability problem is also relevant when discussing [scaling solutions](/developers/docs/scaling/), such as rollups. These protocols increase throughput by executing transactions off Ethereum Mainnet. However, for them to derive security from Ethereum, they must post transaction data on Mainnet, allowing anyone to verify the correctness of computations performed off the main chain.

#### Data availability and light clients

Although the classic notion of data availability concerned the visibility of transaction data to validating nodes, newer research has focused on verifying data availability with light clients. For light clients, the data availability problem concerns validating a block’s availability without having to download the entire block.

A light client is an Ethereum node that only syncs to the latest block header and requests other information from full nodes. As they don't download blocks, light clients cannot validate transactions or help secure Ethereum.

However, work is underway to ensure light clients can prove data availability without needing to download blocks. If light clients can verify the availability of a block, they can contribute to Ethereum's security by alerting other nodes to a block's unavailability.

A related area of research is focused on mechanisms for making data provably available in a stateless Ethereum. The [stateless client concept](https://ethresear.ch/t/the-stateless-client-concept/172) is a proposed version of Ethereum, where validating nodes don't have to store state data before verifying blocks.

Statelessness is expected to improve the security, scalability, and long-term sustainability of Ethereum. With lower hardware requirements for validating nodes, more validators can join the network and secure it against malicious actors.

### Data availability vs. data retrievability {#data-availability-vs-data-retrievability}

Data availability is different from data retrievability. Data availability is the ability of nodes to download transaction data for a block while it is being proposed for addition to the chain. In other words, data availability is relevant when a block is yet to pass consensus.

Data retrievability is the ability of nodes to retrieve _historical information_ from the blockchain. A blockchain's history is made up of ancient blocks and receipts that store information about past events. While historical blockchain data may be necessary for archiving purposes, nodes can validate the chain and process transactions without it.

The core Ethereum protocol is primarily concerned with data availability, not data retrievability. Ethereum will not store data for every transaction it has processed forever, as doing so increases storage requirements for full nodes, negatively impacting Ethereum's decentralization.

Fortunately, data retrievability is a much easier problem to solve than data availability. The ability to retrieve historical blockchain data only needs one honest node to store it for it to be retrievable. Furthermore, some entities, such as blockchain explorers, have incentives to store archival data and make it available to others on request.

[More on solutions to the data retrievability problem](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding).

## Why is data availability important? {#why-is-data-availability-important}

### Blockchain security {#blockchain-security}

Data availability is crucial for blockchain security, or else “data withholding attacks” would become commonplace. A data withholding attack occurs when a block producer publishes a block but doesn’t share the transaction data used to build the block.

If a data withholding attack happens, full nodes cannot verify the correctness of updates to Ethereum’s world state. This gives malicious block proposers leeway to subvert protocol rules and advance invalid state transitions on the Ethereum network.

Visibility of block data to full nodes is critical because other network participants, such as light clients, rely on full nodes to verify the network’s state. Unlike full nodes, light clients only check block headers and don’t download block body. Therefore, the rules around data availability ensure full nodes can validate blocks and prevent the chain from getting corrupted.

### Decentralized scalability {#decentralized-scalability}

[Ethereum’s goal is to scale computation without trading off decentralization and security](/upgrades/vision/). Due to the constraints of the monolithic blockchain architecture, data availability is critical to achieving decentralized scalability.

#### Data availability and layer 2 scaling {#data-availability-and-layer-2-scaling}

[Layer 2 scaling solutions](/layer-2/), such as [rollups](/glossary/#rollups), scale network throughput and latency by processing transactions off Ethereum's main execution layer. Off-chain transactions are compressed and posted on Ethereum in batches—thousands of transactions could happen off-chain, but Ethereum needs to process _one_ on-chain transaction associated with each batch submission. This reduces congestion on the base layer and reduces fees for users, while ensuring faster transactions.

However, for Ethereum to guarantee the security of rollups, it needs a mechanism for verifying the validity of off-chain transactions. This is where data availability comes into the picture.

[Optimistic rollups](/developers/docs/scaling/optimistic-rollups/) post compressed transaction data to Ethereum as `calldata`. This allows anyone to verify the state of the rollup and also provides guarantees of transaction validity. If a transaction is invalid, a verifier can use the available transaction data to construct a [fraud proof](/glossary/#fraud-proof) to challenge it.

[Zero-knowledge (ZK) rollups](/developers/docs/scaling/zk-rollups) don't need to post transaction data since [zero-knowledge validity proofs](/glossary/#zk-proof) guarantee the correctness of state transitions. However, we cannot guarantee the functionality of the ZK-rollup (or interact with it) without access to its state data.

For example, users cannot know their balances if an operator withholds details about the rollup’s state. Also, they cannot perform state updates using information contained in a newly added block.

## Types of data availability systems in blockchains {#types-of-data-availability-systems-in-blockchains}

### On-chain data availability {#on-chain-data-availability}

The standard solution to solving data availability is to force block producers to publish all transaction data on-chain and have validating nodes download it. On-chain data availability is a feature of "monolithic blockchains" that manage data availability, transaction execution, and consensus, on a single layer. By storing state data redundantly across the network, the Ethereum protocol ensures that nodes have access to data necessary to reproduce transactions, verify state updates, and flag invalid state transitions.

However, on-chain data availability places bottlenecks on scalability. Monolithic blockchains often have slow processing speeds as nodes must download every block and replay the same transactions. It also requires full nodes to store increasing amounts of state—a trend that could affect decentralization. If Ethereum’s state spirals, validators must invest in larger machines, which would likely reduce the number of people willing to run a validating node.

### Off-chain data availability {#off-chain-data-availability}

Off-chain data availability systems move data storage off the blockchain: block producers don't publish transaction data on-chain, but provide a cryptographic commitment to prove the availability of the data. This is a method used by [modular blockchains](https://celestia.org/learn/basics-of-modular-blockchains/), where the chain manages some tasks, such as transaction execution and consensus, and offloads others (e.g., data availability) to another layer.

Many scaling solutions adopt a modular approach by separating data availability from consensus and execution, as this is considered the ideal way to scale blockchains without increasing node requirements. For example, [validiums](/developers/docs/scaling/validium/) and [plasma](/developers/docs/scaling/plasma/) use off-chain storage to reduce the amount of data posted on-chain.

While off-chain data availability improves efficiency, it has negative implications for decentralization, security, and trustlessness. For example, participants in validiums and plasma chains must trust block producers not to include invalid transactions in proposed blocks. Block producers can act maliciously (ie., by advancing invalid state transitions) and cripple attempts to challenge malicious transactions by withholding state data.

Due to the problems associated with off-chain storage, some scaling solutions store transaction data on the parent blockchain, like Ethereum. Optimistic rollups and ZK-rollups, for example, don't store transaction data, but use Ethereum Mainnet as a data availability layer.

## What are some solutions to the data availability problem? {#solutions-to-data-availability-problem}

As mentioned, the data availability problem concerns the ability to verify availability of the transaction data for a newly proposed block. Solutions to this problem employ some mechanism for guaranteeing data availability.

### Data availability sampling {#data-availability-sampling}

Data availability sampling is a cryptographic mechanism for guaranteeing data availability. Data availability sampling allows blockchain nodes to verify that data for a proposed block is available without having to download the entire block.

In a DAS system, a node samples small, random chunks of a block over multiple rounds to verify data availability. With many nodes sampling different parts of a block simultaneously, its availability can be verified with high statistical certainty.

When applied to blockchains, like Ethereum, data availability sampling ensures light clients also participate in guaranteeing the chain's security and functionality. Light clients can run without expensive hardware, making it easier for anyone to validate on the Ethereum network.

[More on data availability sampling.](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)

#### Data availability proofs {#data-availability-proofs}

While data availability sampling gives statistical guarantees of a block's availability, a malicious node can still hide some data. DAS techniques only prove that the majority of the block data is available, not that the entire block is available. And much harm can come from block producers hiding even a tiny amount of transaction data.

To solve this problem, we combine data availability sampling with [erasure coding](https://en.wikipedia.org/wiki/Erasure_code) to create “data availability proofs”. Erasure coding is a technique that allows us to double a dataset by adding redundant pieces (called erasure codes). If the original data is lost, the erasure codes can be used to reconstruct the original piece of data.

When implemented in blockchains, erasure codes improve data availability because a small fraction of the data is enough to reconstruct the whole transaction set in a block. In this system, a malicious block producer would need to withhold more than 50% of the block to perform a data withholding attack. Previously, a block producer only needed to seize 1% of block data to act maliciously.

With erasure-coded blocks, light clients have statistical certainty that the entire block data was published on the network. It also means that light clients don't have to rely on full nodes to alert them of the unavailability of a block.

[More on data availability proofs.](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

### Data availability committees {#data-availability-committees}

Pure validiums store transaction data off-chain with a block producer, making them centralized to an extent. This reduces decentralization and security, since the block producer can publish invalid transactions and conceal the rollup's true state by hiding transaction data.

Some validiums attempt to solve this problem by asking block producers to store transaction data with trusted parties that form the Data Availability Committee (DAC). The DAC stories copies of off-chain data offline, but is required to make it available in the event of a dispute. Members of the DAC also publish on-chain attestations to prove that the said data is indeed available.

[More on data availability committees.](https://medium.com/starkware/data-availability-e5564c416424)

### Proof-of-stake data availability committees {#proof-of-stake-data-availability-committees}

While data availability committees are better than the status quo in a validium, trust assumptions still persist. What if the DAC colludes with the block producer to withhold transaction data? DACs are often small in size, increasing the risk of collusion and the possibility of an external actor compromising the group.

Some validiums replace DACs with a proof-of-stake (PoS) validator system. Here, anyone can become a validator and store data off-chain. However, they must provide a “bond”, which is deposited in a smart contract. In the event of malicious behavior, such as the validator withholding data, the bond can be slashed.

Proof-of-stake data availability committees are considerably more secure than regular DACs. Not only are they permissionless and trustless, but they also have well-designed incentives to encourage honest behavior.

[More on proof-of-stake data availability committees.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)

## Ethereum and the future of data availability {#ethereum-and-the-future-of-data-availability}

Although rollups can scale throughput with off-chain computation, their capacity is limited by the data throughput of the underlying blockchain. If rollups are to use Ethereum as a data availability layer, it must increase its data storage and processing capabilities.

[Sharding](/upgrades/shard-chains/) is a proposed method for increasing data throughput on Ethereum’s execution layer. In sharding, the network is split into a select number of sub-chains—each with a dedicated set of validators.

Validators will only need to run full nodes for their shard and run in light-client capacity for other shards. Sharding increases data space available to rollups since the job of storing data is split across different shards.

But data sharding introduces a new problem: “What if validators on one shard become malicious and start processing invalid state transitions?”. This is possible since full nodes no longer have access to the same transaction data as is currently the case. Implementing data sharding requires creating a system for nodes to verify data availability in other shards without downloading blocks, or else the purpose of sharding is defeated.

To solve this problem, newer scaling proposals for Ethereum, such as [Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq), rely upon data availability sampling to verify that the entire contents of a blob have been seen by the network. This system relieves individual nodes from the burden of downloading and validating it all directly.

## Further reading {#further-reading}

- [WTF is Data Availability?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [What Is Data Availability?](https://coinmarketcap.com/alexandria/article/what-is-data-availability)
- [The Data Availability Problem](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
- [The Ethereum Off-Chain Data Availability Landscape](https://blog.celestia.org/ethereum-off-chain-data-availability-landscape/)
- [A primer on data availability checks](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [An explanation of the sharding + DAS proposal](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
