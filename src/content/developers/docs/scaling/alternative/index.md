---
title: Alternative scaling solutions
description: An introduction to the different non-layer-2 scaling solutions currently being developed by the Ethereum community.
lang: en
sidebar: true
incomplete: true
sidebarDepth: 3
---

These solutions work to achieve similar scalability goals as layer 2 solutions, but by contrast they do not directly utilize the consensus of mainnet. This opens the door for different opportunities depending on different use cases. 

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics. Scaling solutions in general are not yet thoroughly battle-tested, and research continues to unfold.

## Why are alternatives scaling solutions needed? {#why-do-we-need-this}

- Not all solutions require utilizing the Ethereum consensus algorithm directly, and can offer benefits that would otherwise be difficult to obtain
- No one scaling solution is enough to fulfill the [eth2 vision](/eth2/vision/)
- Multiple solutions can help reduce the overall congestion on any one part of the network

## Type of alternative scaling
- [Plasma](#plasma)
- [Validium](#validium)
- [Sidechains](#sidechains)
- [Hybrid solutions](#hybrid-solutions)

## Plasma {#plasma}

A plasma chain is a separate blockchain that is anchored to the main Ethereum chain, and uses fraud proofs (like [Optimistic rollups](#optimistic-rollups)) to arbitrate disputes.

| Pros                                                                                                                  | Cons                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| High throughput, low cost per transaction.                                                                            | Does not support general computation. Only basic token transfers, swaps, and a few other transaction types are supported via predicate logic.                               |
| Good for transactions between arbitrary users (no overhead per user pair if both are established on the plasma chain) | Need to periodically watch the network (liveness requirement) or delegate this responsibility to someone else to ensure the security of your funds.                         |
|                                                                                                                       | Relies on one or more operators to store data and serve it upon request.                                                                                                    |
|                                                                                                                       | Withdrawals are delayed by several days to allow for challenges. For fungible assets this can be mitigated by liquidity providers, but there is an associated capital cost. |

### Use Plasma {#use-plasma}

- [OMG Network](https://omg.network/)
- [Polygon](https://polygon.technology/)[previously Matic Network](https://matic.network/)
- [Gluon](https://gluon.network/)
- [Gazelle](https://gzle.io/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Validium {#validium}

Uses validity proofs like [ZK-rollups](#zk-rollups) but data is not stored on the main layer 1 Ethereum chain. This can lead to 10k transactions per second per validium chain and multiple chains can be run in parallel.

| Pros                                                                                                      | Cons                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| No withdrawal delay (no latency to on-chain/cross-chain tx); consequent greater capital efficiency.       | Limited support for general computation/smart contracts; specialized languages required.                                                 |
| Not vulnerable to certain economic attacks faced by fraud-proof based systems in high-value applications. | High computational power required to generate ZK proofs; not cost effective for low throughput applications.                             |
|                                                                                                           | Slower subjective finality time (10-30 min to generate a ZK proof) (but faster to full finality because there is no dispute time delay). |

### Use Validium {#use-validium}

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)
- [Loopring](https://loopring.org/#/)

## Sidechains {#sidechains}

A sidechain is a separate blockchain which runs in parallel to mainnet and operates independently. It has its own consensus algorithm ([Proof of Authority](https://en.wikipedia.org/wiki/Proof_of_authority), [Delegated proof-of-stake](https://en.bitcoinwiki.org/wiki/DPoS), [Byzantine fault tolerance](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained), and so on). It is connected to the main chain by a two-way bridge.

| Pros                                             | Cons                                                                                           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Established technology.                          | Less decentralized .                                                                           |
| Supports general computation, EVM compatibility. | Uses a separate consensus mechanism. Not secured by layer 1 (so technically it’s not layer 2). |
|                                                  | A quorum of sidechain validators can commit fraud.                                             |

### Use Sidechains {#use-sidechains}

- [Skale](https://skale.network/)
- [POA Network](https://www.poa.network/)

## Hybrid solutions {#hybrid-solutions}

Combine the best parts of multiple layer 2 technologies, and may offer configurable tradeoffs.

### Use Hybrid solutions {#use-hybrid-solutions}

- [Offchain Labs Arbitrum SCSC](https://offchainlabs.com/arbitrum.pdf)
- [Celer](https://www.celer.network/)

## Further reading {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

**Sidechains**

- [EthHub on sidechains](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_
- [Adding Hybrid PoS-Rollup Sidechain to Celer’s Coherent Layer-2 Platform on Ethereum](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)
