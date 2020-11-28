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

Proof-of-stake comes with a number of improvements to the proof-of-work system:

- better energy efficiency – you don't need to use lots of energy mining blocks
- lower barriers to entry, reduced hardware requirements – you don't need elite hardware to stand a chance of creating new blocks
- stronger immunity to centralization – proof-of-stake should lead to more nodes in the network
- stronger support for shard chains – a key upgrade in scaling the Ethereum network

## Proof-of-stake, staking, and validators {#pos-staking-validators}

Proof-of-stake is the underlying mechanism that activates validators upon receipt of enough stake. For Ethereum, users will need to stake 32ETH to become a validator. Validators are chosen at random to create blocks and are responsible for checking and confirming blocks they don't create. A user's stake is also used as a way to incentivise good validator behaviour. For example, a user can lose a portion of their stake for things like going offline (failing to validate), or their entire stake for deliberate collusion.

## How does Ethereum's proof-of-stake work? {#how-does-pos-work}

Unlike proof-of-work, validators don't need to use significant amounts of computational power because they're selected at random and aren't competing. They don't need to mine blocks, they just need to create blocks when chosen and validate proposed blocks when they're not. This validation is known as attesting. You can think of attesting as saying "this block looks good to me". Validators get rewards for proposing new blocks and for attesting to ones they've seen.

If you attest to malicious blocks, you lose your stake.

### The beacon chain {#the-beacon-chain}

When Ethereum replaces proof-of-work with proof-of-stake, there will be the added complexity of [shard chains](/eth2/shard-chains/). These are separate blockchains that will need validators to process transactions and create new blocks. The plan is to have 64 shard chains and they all need a shared understanding of the state of the network. So extra coordination is needed and this will be done by [the beacon chain](/eth2/beacon-chain/).

The beacon chain receives state information from shards and makes it available for other shards so that the network can stay in sync. The beacon chain will also manage the validators, from registering their stake deposits to issuing their rewards and penalties.

Here's how that process works.

### How validation works {#how-does-validation-work}

When you submit a transaction on a shard a validator will be responsible for adding your transaction to a shard block. Validators are algorithmically chosen by the beacon chain to propose new blocks.

#### Attestation {#attestation}

If a validator isn't chosen to propose a new shard block, they'll have to attest to the proposal and confirm that everything looks as it should. It's the attestation that is recorded in the beacon chain, rather than the transaction itself.

At least 128 validators are required to attest to each shard block – this is known as a "committee".

The committee has a time-frame in which to propose and validate a shard block. This is known as a "slot". Only one valid block is created per slot. There are 32 slots in an "epoch". After each epoch, the committee is disbanded and reformed with different, random participants. This helps keep shards safe from committees of bad actors.

#### Crosslinks {#rewards-and-penalties}

Once a new shard block proposal has enough attestations, a "crosslink" is created which confirms the inclusion of the block, and your transaction, in the beacon chain.

Once there's a crosslink, the validator who proposed the block gets their reward.

#### Finality {#finality}

In distributed networks, a transaction has "finality" when it's part of a block that can't change.

To do this in proof-of-stake, Casper, a finality protocol, gets validators to agree on the state of a block at certain checkpoints. So long as 2/3 of the validators agree, the block is finalised. Validators will lose their entire stake if they try and revert this later on via a 51% attack.

As Vlad Zamfir put it, this is like a miner participating in a 51% attack, causing their mining hardware to immediately burn down.

## Proof-of-stake and security

The threat of a [51% attack](https://www.investopedia.com/terms/1/51-attack.asp) still exists in proof-of-stake but it's even more risky for the attackers. To do so, you'd need to control 51% of the staked ETH. Not only is this a lot of money but it would probably cause ETH's value to drop. There's very little incentive to destroy the value of a currency you have a majority stake in. There are stronger incentives to keep the network secure and healthy.

Stake slashings, ejections, and other penalties, coordinated by the beacon chain, will exist to prevent other acts of bad behaviour. Validators will also be responsible for flagging these incidents.

## Pros and cons {#pros-and-cons}

| Pros                                                                                                                                                                                                                                                                      | Cons                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Staking makes it easier for you to run a node. It doesn't require huge investments in hardware or energy. And if you don't have enough ETH to stake, you can join staking pools.                                                                                          | Proof-of-stake is still in its infancy, and less battle-tested, compared to proof-of-work |
| Staking is more decentralized. It allows for increased participation and more nodes doesn't mean increased % returns, like with mining.                                                                                                                                   |                                                                                           |
| Staking allows for secure sharding. Shard chains allow Ethereum to create multiple blocks at the same time, increasing transaction throughput. Sharding the network in a proof-of-work system would simply lower the power needed to compromise a portion of the network. |                                                                                           |

## Further Reading {#further-reading}

- [What is Proof of Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [The Beacon Chain Ethereum 2.0 explainer you need to read first](https://ethos.dev/beacon-chain/) _Ethos.dev_
-

## Related Topics {#related-topics}

- [Proof of work](/developers/docs/consensus-mechanisms/pow/)
