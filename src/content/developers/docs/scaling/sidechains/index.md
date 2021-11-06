---
title: Sidechains
description: An introduction to sidechains as a scaling solution currently utilized by the Ethereum community.
lang: en
sidebar: true
incomplete: true
sidebarDepth: 3
---

A sidechain is a separate blockchain which runs in parallel to Ethereum Mainnet and operates independently. It has its own [consensus algorithm](/developers/docs/consensus-mechanisms/) (e.g. [Proof of Authority](https://en.wikipedia.org/wiki/Proof_of_authority), [Delegated proof-of-stake](https://en.bitcoinwiki.org/wiki/DPoS), [Byzantine fault tolerance](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)). It is connected to Mainnet by a two-way bridge.

What makes a sidechain particularly exciting is that the chain works the same as the main Ethereum chain because it's based on [the EVM](/developers/docs/evm/). It doesn't use Ethereum, it is Ethereum. This means if you want to use your [dapp](/developers/docs/dapps/) on a sidechain, it's just a matter of deploying your code to this sidechain. It looks, feels, and acts just like Mainnet – you write contracts in Solidity, and interact with the chain via the Web3 API.

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics and a high-level understanding of [Ethereum scaling](/developers/docs/scaling/).

## Pros and cons {#pros-and-cons}

| Pros                                             | Cons                                                                                           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Established technology.                          | Less decentralized.                                                                            |
| Supports general computation, EVM compatibility. | Uses a separate consensus mechanism. Not secured by layer 1 (so technically it’s not layer 2). |
|                                                  | A quorum of sidechain validators can commit fraud.                                             |

### Use Sidechains {#use-sidechains}

Multiple projects provide implementations of sidechains that you can integrate into your dapps:

- [Skale](https://skale.network/)
- [POA Network](https://www.poa.network/)
- [xDai](https://www.xdaichain.com/)

## Further reading {#further-reading}

- [EthHub on sidechains](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_

_Know of a community resource that helped you? Edit this page and add it!_
