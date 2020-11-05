---
title: Proof-of-stake (PoS)
description: An explanation of the proof-of-stake consensus protocol and its role in Ethereum.
lang: en
sidebar: true
incomplete: true
---

Ethereum is moving to a consensus mechanism called proof-of-stake (PoS) from [proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow/). This was always the plan as it's a key part in the community's strategy to scale Ethereum via [the Eth2 upgrades](/eth2/). However getting PoS right is a big technical challenge and not as straightforward as using PoW to reach consensus across the network.

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read up on [consensus mechanisms](/developers/docs/consensus-mechanisms/).

## What is proof-of-stake (PoS)? {#what-is-pos}

Proof of stake is a type of [consensus mechanism](/developers/docs/consensus-mechanisms/) used by blockchain networks to achieve distributed consensus.

It requires users to stake their ETH to become a validator in the network. Validators are responsible for the same thing as miners in [proof-of-work](/developers/docs/consensus-mechanisms/pow/): ordering transactions and creating new blocks so that all nodes can agree on the state of the network.

Proof-of-stake comes with a number of improvements to the proof-of-work system, including:

- better energy efficiency
- lower barriers to entry, reduced hardware requirements
- stronger crypto-economic incentives
- stronger immunity to centralization
- stronger support for shard chains, a key upgrade in scaling the Ethereum network

## Proof-of-stake, staking, and validators {#pos-staking-validators}

Proof-of-stake is the underlying system that activates validators upon receipt of enough stake. For Ethereum, users will need to stake 32ETH to become a validator. Validators are chosen at random to create blocks and are responsible for checking and confirming blocks they don't create. A user's stake is also used as a way to incentivise good validator behaviour. For example, a user can lose a portion of their stake for things like going offline (failing to validate), or their entire stake for deliberate collusion.

## How does Ethereum's proof-of-stake work? {#how-does-pos-work}

Unlike proof-of-work, validators don't need to use significant amounts of computational power because they're selected at random and aren't competing. They don't need to mine blocks, they just need to create blocks when chosen and validate proposed blocks when they're not. This validation is known as attesting. You can think of attesting as saying "this block looks good to me". Validators get rewards for proposing new blocks and for attesting to ones they've seen.

If you attest to malicious blocks, you lose your stake.

The beacon chain
Random assignment
Cross-links
Rewards/penalties

## Finality {#finality}

As Vlad Zamfir put it, imagine a version of proof of work where if you participate in a 51% attack your mining hardware burns down.

## Pros and cons {#pros-and-cons}

| Pros                                                                                                                                                                                                                                                                                                  | Cons |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| Staking makes it easier for you to run a node. It doesn't require huge investments in hardware or energy. And if you don't have enough ETH to stake, you can join staking pools.                                                                                                                      |      |
| Staking is more decentralized. It allows for increased participation and more nodes doesn't mean increased % returns, like with mining.                                                                                                                                                               |      |
| Staking allows for secure sharding. This will allow Ethereum to create multiple blocks at the same time, partitioning the network and increasing transaction throughput. Partioning the network in a proof-of-work system would simply lower the power needed to compromise a portion of the network. |      |

## Further Reading {#further-reading}

- [What is Proof of Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [The Beacon Chain Ethereum 2.0 explainer you need to read first](https://ethos.dev/beacon-chain/) _Ethos.dev_

## Related Topics {#related-topics}

- [Proof of work](/developers/docs/consensus-mechanisms/pow/)
