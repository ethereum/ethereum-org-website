---
title: Plasma chains
description: An introduction to plasma chains as a scaling solution currently utilized by the Ethereum community.
lang: en
sidebar: true
incomplete: true
sidebarDepth: 3
---

A plasma chain is a separate blockchain that is anchored to the main Ethereum chain, and uses fraud proofs (like [optimistic rollups](/developers/docs/scaling/optimistic-rollups/)) to arbitrate disputes. These chains are sometimes referred to as "child" chains as they are essentially smaller copies of the Ethereum Mainnet. Merkle trees enable creation of a limitless stack of these chains that can work to offload bandwidth from the parent chains (including Mainnet). These derive their security through [fraud proofs](/glossary/#fraud-proof), and each child chain has its own mechanism for block validation.

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics and a high-level understanding of [Ethereum scaling](/developers/docs/scaling/). Implementing scaling solutions such as Plasma is an advanced topic as the technology is less battle-tested, and continues to be researched and developed.

## Pros and cons {#pros-and-cons}

| Pros                                                                                                                  | Cons                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| High throughput, low cost per transaction.                                                                            | Does not support general computation. Only basic token transfers, swaps, and a few other transaction types are supported via predicate logic.                               |
| Good for transactions between arbitrary users (no overhead per user pair if both are established on the plasma chain) | Need to periodically watch the network (liveness requirement) or delegate this responsibility to someone else to ensure the security of your funds.                         |
|  Plasma chains can be adapted to specific use-cases that are unrelated to the main chain. Anyone, including businesses, can customize Plasma smart contracts to provide scalable infrastructure that works in different contexts.                                                       | Relies on one or more operators to store data and serve it upon request.                                                                                              |
|                                                                                                                        | Withdrawals are delayed by several days to allow for challenges. For fungible assets this can be mitigated by liquidity providers, but there is an associated capital cost. |
|                                                                                                                        | If too many users try to exit their Plasma chain simultaneously (due to malicious activity or network failure), they could flood the root chain and congest the network. | 

## How does Plasma differ from sidechains and sharding? 

Plasma, sidechains, and sharding all follow a similar pattern where a collection of "child chains" rely on a "main chain" for consensus. At intervals, cryptographic proofs of transaction validity (hashes) are submitted to the main chain to prevent fraudulent activity on child chains. 

However, the three scaling solutions have slight differences. Here is a quick comparison of plasma chains, sidechains, and shard chains:

### Plasma vs sidechains  

A [sidechain](/developers/docs/scaling/sidechains/) is an independently operated blockchain connected to the Ethereum Mainnet via a two-way bridge. [Bridges](/bridges/) allow users to exchange tokens between the two blockchains, so they can transact on the sidechain, reducing congestion on the base layer and improving scalability. 
Since sidechains use a separate consensus mechanism, and because these chains are typically much smaller than Ethereum Mainnet, bridging assets to these chains involves increased risk to your funds. Given the lack of security guarantees inherited from Mainnet in the sidechain model, users risk total loss of funds in the event of an attack on the sidechain.```

Conversely, plasma chains derive their security from Mainnet are somewhat safer than sidechains.  Both sidechains and plasma chains can have different consensus protocols, but the difference is that plasma chains publishes Merkle roots for each block on Ethereum Mainnet. Block roots are small pieces of information we can use to verify information about transactions that happen on a plasma chain. If an attack happens on a plasma chain, users can safely exit to Mainnet and withdraw their funds using the appropriate proofs. 


### Plasma vs sharding

Both Plasma chains and [shard chains](https://ethereum.org/en/upgrades/shard-chains/) periodically publish cryptographic proofs on the main chain. However, both have different security properties. 
Shard chains are tightly coupled to the main chain, but plasma chains are not. Even if one shard block is invalid, the entire chain will reorganize and discard the invalid block. Thus, shard chains can be as safe as the main chain. 

While Plasma chains can benefit from Layer 1 security, they are not as tightly linked to the main chain as shard chains. It's possible to commit an invalid Plasma block header to the main chain since the larger network has little information about the state of the Plasma chain. 

With sharding, the main chain knows how sharded sub-chains should operate and can reject an invalid shard transition. The upside to Plasma is the effects of a malicious activity can be restricted to the child chain, while the effect on malicious activity on shard chains would affect the entire network. 

### Use Plasma {#use-plasma}

Multiple projects provide implementations of Plasma that you can integrate into your dapps:

- [OMG Network](https://omg.network/)
- [Polygon](https://polygon.technology/) (previously Matic Network)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Further reading {#further-reading}

- [EthHub on Plasma](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/plasma/)
- [Learn Plasma](https://www.learnplasma.org/en/)
- [A quick reminder of what "shared security" means and why it's so important](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Sidechains vs Plasma vs Sharding](https://vitalik.ca/general/2019/06/12/plasma_vs_sharding.html)

_Know of a community resource that helped you? Edit this page and add it!_
