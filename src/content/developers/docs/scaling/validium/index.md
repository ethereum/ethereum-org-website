---
title: Validium
description: An introduction to Validium as a scaling solution currently utilized by the Ethereum community.
lang: en
sidebar: true
incomplete: true
sidebarDepth: 3
---

Uses validity proofs like [ZK-rollups](#zk-rollups) but data is not stored on the main layer 1 Ethereum chain. This can lead to 10k transactions per second per validium chain and multiple chains can be run in parallel.

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics. Scaling solutions such as Validium are not yet thoroughly battle-tested.

## Pros and cons {#pros-and-cons}

| Pros                                                                                                      | Cons                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| No withdrawal delay (no latency to on-chain/cross-chain tx); consequent greater capital efficiency.       | Limited support for general computation/smart contracts; specialized languages required.                                                 |
| Not vulnerable to certain economic attacks faced by fraud-proof based systems in high-value applications. | High computational power required to generate ZK proofs; not cost effective for low throughput applications.                             |
|                                                                                                           | Slower subjective finality time (10-30 min to generate a ZK proof) (but faster to full finality because there is no dispute time delay). |

### Use Validium {#use-validium}

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)
- [Loopring](https://loopring.org/#/)

## Further reading {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

_Know of a community resource that helped you? Edit this page and add it!_
