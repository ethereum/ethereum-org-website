---
title: Zero-Knowledge Rollups
description: Introduction to zero-knowledge rollups
lang: en
sidebar: true
---

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics and a high-level understanding of [Ethereum scaling](/developers/docs/scaling/). Implementing scaling solutions such as rollups is an advanced topic as the technology is less battle-tested and continues to be researched and developed.

Looking for a more beginner-friendly resource? See our [introduction to layer 2](/layer-2/).

You should also be familiar with zero-knowledge proofs. See our [introduction to zero-knowledge proofs](/zero-knowledge-proofs/).

## Zero-knowledge rollups {#zk-rollups}

**Zero-knowledge rollups (ZK-rollups)** bundle (or "roll-up") hundreds of transfers off-chain and generate a cryptographic proof. These proofs can come in the form of SNARKs (succinct non-interactive argument of knowledge) or STARKs (scalable transparent argument of knowledge). SNARKs and STARKs are known as validity proofs and get posted to layer 1.

The ZK-rollup smart contract maintains the state of all transfers on layer 2, and this state can only be updated with a validity proof. This means that ZK-rollups only need the validity proof instead of all transaction data. With a ZK-rollup, validating a block is quicker and cheaper because less data is included.

With a ZK-rollup, there are no delays when moving funds from layer 2 to layer 1 because a validity proof accepted by the ZK-rollup contract has already verified the funds.

Being on layer 2, ZK-rollups can be optimised to reduce transaction size further. For instance, an account is represented by an index rather than an address, which reduces a transaction from 32 bytes to just 4 bytes. Transactions are also written to Ethereum as `calldata`, reducing gas.

### Pros and cons {#zk-pros-and-cons}

| Pros                                                                                                                                                          | Cons                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Faster finality time since the state is instantly verified once the proofs are sent to the main chain.                                                        | Some don't have EVM support.                                                                          |
| Not vulnerable to the economic attacks that [Optimistic rollups](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons) can be vulnerable to. | Validity proofs are intense to compute – not worth it for applications with little on-chain activity. |
| Secure and decentralized, since the data that is needed to recover the state is stored on the layer 1 chain.                                                  | An operator can influence transaction ordering.                                                       |

### A visual explanation of ZK-rollups {#zk-video}

Watch Finematics explain ZK-rollups:

<YouTube id="7pWxCklcNsU" start="406" />

### Use ZK-rollups {#use-zk-rollups}

Multiple implementations of ZK-rollups exist that you can integrate into your dapps:

<RollupProductDevDoc rollupType="zk" />

**ZK-rollups reading**

- [What Are Zero-Knowledge Rollups?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [EthHub on zk-rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [More on layer 2](/layer-2/)
