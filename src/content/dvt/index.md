---
title: Distributed validator technology
description: Distributed validator technology enables the distributed operation of an Ethereum validator by multiple parties.
lang: en
---

# Distributed validator technology {#what-is-dvt}

**Distributed Validator Technology (DVT)** splits the private key used to secure a validator across many computers organized into a "cluster". The benefit of this is that it makes it very difficult for attackers to gain access to the key, because it is not stored in full on any single machine. It also allows for some nodes to go offline, as the necessary signing can be done by a subset of the machines in each cluster. This reduces single points of failure from the network and makes the whole validator set more robust. 

A way to think about DVT is that DVT is to validators as multisig is to wallets. Where standard validators use a single key to sign duties, the key of a Distributed Validator is split across multiple nodes. In the case of DVT, the "multisig" is operated by a consensus protocol (BFT) instead of human interaction. Enabling the distributed operation of an Ethereum validator with best-in-class security practices. 


## How does DVT work? {#how-does-dvt-work}

A DVT solution contains the following components:

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

- **[Shamir's Secret Sharing](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Validator keys use BLS signatures - that are additive - allowing multiple signatures to be combined to recreate a validator key signature. The BLS private validator key is split into multiple "key shares." Using [BLS aggregation](https://our.status.im/fastest-bls-signature-implementation/), multiple shares or signatures can be aggregated into a single signature. 
- **[Threshold Signature Scheme](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Determines the number of individual key shares that are required for signing duties, e.g., 3 out of 4.
- **[Distributed Key Generation (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Cryptographic process that generates the key shares and is used to distribute the shares of an existing or new validator key to the nodes in a cluster.
- **[Multi-Party Computation (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - The full validator key is generated in secret using multiparty computation. The full key is never known to any individual operator - they only ever know their own part of it (their "share").
- **Consensus Protocol** - The consensus protocol selects one node to be the block proposer. They share the block with the other nodes in the cluster, who add their key shares to the aggregate signature. When enough key shares have been aggregated, the block is proposed on Ethereum.

Individual nodes do not need to trust each other in order to share a validator. As long as enough key shares get aggregated, the validator duties can be performed by the cluster. Distributed validators have built-in fault tolerance and can keep running even if some of the individual nodes go offline. 

## Why do we need DVT? {#why-do-we-need-dvt}

### Security {#security}

Validators generate two public-private key pairs: validator keys for participating in consensus and withdrawal keys for accessing funds. While validators can secure withdrawal keys in cold storage, validator private keys must be online 24/7, increasing the possibility of theft. If a validator private key is compromised, an attacker can control the validator, potentially leading to slashing or the loss of the staker's ETH. 

With DVT, the validator's private key is split into key shares, and since the nodes only need to have their key share online, the validator's private key can be safely stored in cold storage.

### No single points of failure {#no-single-point-of-failure}

When a validator is divided across multiple operators and multiple machines, it can withstand individual hardware and software failures without going offline. The risk of failures can also be reduced by using diverse hardware and software configurations across the nodes in a cluster. This resilience is not available to today's validators - it comes from the DVT layer.


If one of the components of a machine in a cluster goes down (For example, if there are four operators in a validator cluster and one uses a specific client that has a bug), the others ensure that the validator keeps running. 

### Decentralization {#decentralization}
``

The ideal scenario for Ethereum is to have as many independently operated validators as possible. However, a few staking providers have become very popular and account for a substantial portion of the total staked ETH on the network. DVT can allow these operators to exist while preserving decentralization of stake. This is because the keys for each validator are distributed across many machines and it would take much greater collusion for a validator to turn malicious.

Stake centralization can also lead to client centralization since it's easier for services to support only one or two client configurations. In case of a faulty node, or poor performance, this could have a massive impact on the entire network, which should be avoided.


Overall, DVT offers the following benefits to Ethereum:
- Decentralization of Ethereum's proof-of-stake consensus
- Ensures the liveness of the network
- Creates validator fault tolerance
- Trust minimized validator operation
- Minimized slashing and downtime risks
- Improves diversity (client, data center, location, regulation, etc.)
- Enhanced security of validator key management

## DVT use cases {#dvt-use-cases}

DVT has significant implications for the broader staking industry:

### Solo stakers {#solo-stakers}

The main benefit DVT brings to solo stakers is that it removes the technical barrier for running a validator node. Stakers that want to run their own validators no longer have to supply the infrastructure to participate in staking. Running a single validator instance is susceptible to technical issues, hacking, and high maintenance costs. A solo staker can use DVT to run their validator in a decentralized manner, on par with the performance of large staking services, while still having complete control over their validator keys and custody of their funds.

### Staking as a service (SaaS) {#saas}

Staking providers and institutions managing many validators can leverage DVT to mitigate the risks associated with large-scale single validator instance setups. By distributing their infrastructure, they can introduce redundancy to their operations and diversify their infrastructure components to achieve greater performance and eliminate single points of failure in any single location or client type. 

Staking providers invest heavily to work around operational costs in development, DevOps, and comprehensive insurance policies. With DVT, responsibility is distributed between nodes, resulting in much lower operational risk and expense.


### Staking pools {#staking-pools}

Due to standard validator setups, staking pools and LSP (Liquid Staking Providers) are compelled to have varying levels of single-operator trust since gains and losses are socialized throughout the pool. They are also reliant on operators to safeguard signing keys because, until now, there has been no other option for them.

Even though efforts are made to spread risk by distributing stakes across multiple operators, each operator still manages a significant stake independently. Relying on a single operator poses immense risks if they underperform, encounter downtime, get compromised, or act maliciously.

By leveraging DVT, the trust required from operators is significantly reduced. Pools can enable operators to hold stakes without needing custody of validator keys (as only key shares are utilized). It also allows managed stakes to be distributed between more operators (e.g., instead of having a single operator managing 1000 validators, DVT enables those validators to be collectively run by multiple operators). Diverse operator configurations will ensure that if one operator should go down, the others will still be able to attest. Resulting in redundancy and diversification that leads to better performance (maximizing rewards) and resilience.

Another benefit to minimizing single-operator trust is that staking pools can allow more open and permission-less operator participation. By doing this, services can reduce their risk and support Ethereum decentralization by using both curated and permissionless sets of operators, for example, by pairing home or more minor stakers with larger ones. 


## Potential drawbacks of using DVT {#potential-drawbacks-of-using-dvt}

- **Additional component** - introducing a DVT node adds another part that can possibly be faulty or vulnerable. A way to mitigate this is to strive for multiple implementations of a DVT node, meaning multiple clients (similarly as there are multiple clients for the consensus and execution layer).
- **Operational costs** - as DVT distributes the validator between multiple parties, there are more nodes required for operation instead of only a single node, which introduces increased operating costs.
- **Potentially increased latency** - since DVT utilizes a consensus protocol to achieve consensus between the multiple nodes operating a validator, it can potentially introduce increased latency.