---
title: Plasma chains
description: An introduction to plasma chains as a scaling solution currently utilized by the Ethereum community.
lang: en
sidebar: true
incomplete: true
sidebarDepth: 3
---

A plasma chain is a separate blockchain that is anchored to the main Ethereum chain, and uses fraud proofs (like [Optimistic rollups](/developers/docs/scaling/layer-2-rollups/#optimistic-rollups)) to arbitrate disputes. These chains are sometimes referred to as "child" chains as they are essentially smaller copies of the Ethereum Mainnet. Merkel trees enable creation of a limitless stack of these chains that can work to offload bandwidth from the parent chains (including Mainnet). These derive their security through [fraud proofs](/glossary/#fraud-proof), and each child chain has its own mechanism for block validation.

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics and a high-level understanding of [Ethereum scaling](/developers/docs/scaling/). Implementing scaling solutions such as Plasma is an advanced topic as the technology is less battle-tested, and continues to be researched and developed.

## Pros and cons {#pros-and-cons}

| Pros                                                                                                                  | Cons                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| High throughput, low cost per transaction.                                                                            | Does not support general computation. Only basic token transfers, swaps, and a few other transaction types are supported via predicate logic.                               |
| Good for transactions between arbitrary users (no overhead per user pair if both are established on the plasma chain) | Need to periodically watch the network (liveness requirement) or delegate this responsibility to someone else to ensure the security of your funds.                         |
|                                                                                                                       | Relies on one or more operators to store data and serve it upon request.                                                                                                    |
|                                                                                                                       | Withdrawals are delayed by several days to allow for challenges. For fungible assets this can be mitigated by liquidity providers, but there is an associated capital cost. |

### Use Plasma {#use-plasma}

Multiple projects provide implementations of Plasma that you can integrate into your dapps:

- [OMG Network](https://omg.network/)
- [Polygon](https://polygon.technology/)[previously Matic Network](https://matic.network/)
- [Gluon](https://gluon.network/)
- [Gazelle](https://gzle.io/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Further reading {#further-reading}

- [EthHub on Plasma](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/plasma/)
- [A COMPLETE GUIDE TO ETHEREUM PLASMA](https://www.blockchain-council.org/blockchain/a-complete-guide-to-ethereum-plasma/)

_Know of a community resource that helped you? Edit this page and add it!_
