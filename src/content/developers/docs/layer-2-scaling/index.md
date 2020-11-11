---
title: Layer 2 scaling
description: An introduction to the different scaling options currently being developed by the Ethereum community.
lang: en
sidebar: true
incomplete: true
---

Layer 2 is a collective term for solutions designed to help scale your application by handling transactions off chain. Transaction speed suffers when the network is busy which can make the user experience poor for certain types of dapps. And as the network gets busier, gas prices increase as transaction senders aim to outbid each other. This can make using Ethereum very expensive.

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics. Implementing layer 2 solutions are advanced as the technology is less battle-tested.

## Why is layer 2 needed? {#why-is-layer-2-needed}

- Some use-cases, like blockchain games, make no sense with current transaction times
- It can be unnecessarily expensive to use blockchain applications
- Any updates to scalability should not be at the expense of decentralization of security – layer 2 builds on top of Ethereum.

## Rollups {#rollups}

Rollups are solutions that bundle or "roll up" sidechain transactions into a single transaction and generate a cryptographic proof, known as a SNARK (succinct non-interactive argument of knowledge). Only this proof is submitted to the main chain.

_Sidechains are Ethereum-compatible, independent blockchains._

In other words, rollups mean that all state and execution is handled in sidechains – signature verification, contract execution, etc. The main Ethereum chain (layer 1) only stores transaction data.

Rollup solutions require relayers who have staked a bond in the rollup contract. This incentivises them to relay rollups accurately.

**Useful for:**

- reducing fees for users
- open participation
- fast transaction throughput

There are two types of rollups with different security models:

- Zero knowledge: runs computation off-chain and submits a **validity proof** to the chain
- Optimistic: assumes transactions are valid by default and only runs computation, via a **fraud proof**, in the event of a challenge

### Zero knowledge rollups {#zk-rollups}

Zero knowledge rollups, also known as ZK-Rollups, bundle hundreds of transfers off-chain into a single transaction via a smart contract. From the data submitted, the smart contract can verify all of the transfers that are included. This is known as a validity proof.

With a ZK rollup, validating a block is quicker and cheaper because less data is included. You don't need all the transaction data to verify the transaction, just the proof.

The sidechain where ZK rollups happen can be optimised to reduce transaction size further. For instance, an account is represented by an index rather than an address, which reduces a transaction from 32 bytes to just 4 bytes.

### Optimistic rollups {#optimistic-rollups}

Optimistic rollups use a side chain that sits in parallel to the main Ethereum chain. They can offer improvements in scalability because they don't do any computation by default. Instead, after a transaction they propose the new state to mainnet. Or "notarise" the transaction.

As computation is the slow, expensive part of using Ethereum, this can offer up to 10-100x improvements in scalability dependent on the transaction. This number will increase even more with the introduction of the Eth2 upgrade: [shard chains](/en/eth2/shard-chains). This is because there will be more data available in the event that a transaction is disputed.

#### Disputing transactions {#disputing-transactions}

Optimistic rollups don't actually compute the transaction, so there needs to be a mechanism in place to ensure transactions are legitimate and not fraudulent. This is where fraud proofs come in. If someone notices a fraudulent transaction, the rollup will execute a fraud-proof and run the transaction's computation, using the available state data. This means you may have longer wait times for transaction confirmation than a ZK-rollup, because it could be challenged.

![Diagram showing what happens when a fraudulent transaction occurs in an Optimistic rollup in Ethereum](./optimistic-rollups.png)

The gas you need to run the computation of the fraud proof is even reimbursed. Ben Jones from Optimism describes the bonding system in place:

"_anyone who might be able to take an action that you would have to prove fraudulent to secure your funds requires that you post a bond. You basically take some ETH and lock it up and you say "Hey, I promise to tell the truth"... If I don't tell the truth and fraud is proven, this money will be slashed. Not only does some of this money get slashed but some of it will pay for the gas that people spent doing the fraud proof_"

So you get reimbursed for proving fraud.

<!-- #### The Optimism virtual machine (OVM)

What makes Optimistic rollups particularly exciting is that the chain works the same as the main Ethereum chain because it's based on [the EVM](/en/developers/docs/evm/). It doesn't use Ethereum, it is Ethereum. This means if you want to use Optimistic rollups, it's just a matter of deploying it to the OVM. It looks, feels, and acts just like the Ethereum main chain–you write contracts in Solidity, and interact with the chain via the Web3 API.

The OVM also has a bunch of features that allow for a really seamless experience moving code from the EVM. In fact you can move Solidity contracts onto a cheaper and faster solution with just a few lines of code.

[Check out the OVM documentation](http://docs.optimism.io/) -->

## Channels {#channels}

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

## Further reading {#further-reading}

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
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**Sidechains**

- [EthHub on sidechains](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_
