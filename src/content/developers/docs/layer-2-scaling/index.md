---
title: Layer 2 scaling
description:
lang: en
sidebar: true
incomplete: true
---

## What is layer 2?

Layer 2 is a collective term for solutions designed to help scale your application by handling transactions off chain. Transaction speed suffers when the network is busy which can make the user experience poor for certain types of dapps. And as the network gets busier, gas prices increase as transaction senders aim to outbid each other. This can make using Ethereum very expensive.

## Prerequisites

You should have a good understanding of all the foundational topics. Implementing layer 2 solutions is advanced as the technology is less battle-tested.

## Why is layer 2 needed?

- Some use-cases, like blockchain games, make no sense with current transaction times
- It can be unnecessarily expensive to use blockchain applications
- Any updates to scalability should not be at the expense of decentralization of security – layer 2 builds on top of Ethereum.

## Channels

Channels allow participants to transact `x` number of times off-chain while only submitting two transaction to the network on chain.

**Useful for**:

- lots of state updates
- when number of participants is known upfront
- when participants are always available

Participants must lock a portion of Ethereum's state, like an ETH deposit, into a multisig contract. A multisig contract is a type of contract that requires the signatures (and thus agreement) of multiple private keys to execute.

Locking the state in this way is the first transaction and opens up the channel. The participants can then transact quickly and freely off-chain. When the interaction is finished, a final on-chain transaction is submitted, unlocking the state.

**An example**

State channel tic tac toe:

1. Create a multisig smart contract “Judge” on the ethereum main-chain that understands the rules of tic-tac-toe, and can identify Alice and Bob as the two players in our game. This contract holds the 1ETH prize.

2. Then, Alice and Bob begin playing the game, opening the state channel. Each moves creates an off-chain transaction containing a “nonce”, which simply means that we can always tell later in what order the moves happened.

3. When there's a winner, they close the channel by submitting the final state (e.g. a list of transactions) to the Judge contract, paying only a single transaction fee. The Judge ensures that this “final state” is signed by both parties, and waits a period of time to ensure that no one can legitimately challenge the result, and then pays out the 1ETH award to Alice.

There are two types of channels right now:

- State channels – as described above
- Payment channels – Simplified state channels that only deal with payments. They allow off-chain transfers between two participants, as long as the net sum of their transfers does not exceed the deposited tokens.

**Cons**

- Don't support open participation
- Have to lock up funds

## Rollups and sidechains

Rollups are solutions that bundle or "roll up" sidechain transactions into a single transaction and generate a cryptographic proof, known as a SNARK (succinct non-interactive argument of knowledge). Only this proof is submitted to the main chain.

_Sidechains are Ethereum-compatible, independent blockchains._

In other words, rollups mean that all state and execution is handled in sidechains – signature verification, contract execution, etc. The main Ethereum chain only stores transaction data.

Rollup solutions require relayers who have staked a bond in the rollup contract. This incentivises them to relay rollups accurately.

**Useful for:**

- reducing fees for users
- open participation
- fast transaction throughput

There are two types of rollups:

- Zero knowledge – can only handle simple transactions
- Optimistic – can run anything Ethereum can using an optimistic version of the EVM, the Optimistic virtual machine

## Further reading

**State channels**

- [EthHub on state channels](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/state-channels/)
- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Payment channels**

- [EthHub on payment channels](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/payment-channels/)

**ZK rollups**

- [EthHub on zk-rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/)

**Optimistic rollups**

- [EthHub on optimistic rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic-rollups/)

**Sidechains**

- [EthHub on sidechains](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_
