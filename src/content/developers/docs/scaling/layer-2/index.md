---
title: Layer 2 scaling
description: An introduction to the different layer 2 scaling solutions currently being developed by the Ethereum community.
lang: en
sidebar: true
incomplete: true
sidebarDepth: 3
---

Layer 2 is a collective term for solutions designed to help scale your application by handling transactions off the main Ethereum chain (layer 1). Transaction speed suffers when the network is busy which can make the user experience poor for certain types of dapps. And as the network gets busier, gas prices increase as transaction senders aim to outbid each other. This can make using Ethereum very expensive.

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics. Implementing layer 2 solutions are advanced as the technology is less battle-tested.

## Why is layer 2 needed? {#why-is-layer-2-needed}

- Some use-cases, like blockchain games, make no sense with current transaction times
- It can be unnecessarily expensive to use blockchain applications
- Any updates to scalability should not be at the expense of decentralization of security – layer 2 builds on top of Ethereum.

## Types of Layer 2 solution {#types}

- [Rollups](#rollups)
  - [ZK rollups](#zk-rollups)
  - [Optimistic rollups](#optimistic-rollups)
- [State channels](#channels)

Most layer 2 solutions are centered around a server or cluster of servers, each of which may be referred to as a node, validator, operator, sequencer, block producer, or similar term. Depending on the implementation, these layer 2 nodes may be run by the businesses or entities that use them, or by a 3rd party operator, or by a large group of individuals (similar to mainnet). Generally speaking, transactions are submitted to these layer 2 nodes instead of being submitted directly to layer 1 ([mainnet](/glossary/#mainnet)); the layer 2 instance then batches them into groups before anchoring them to layer 1, after which they are secured by layer 1 and cannot be altered. The details of how this is done vary significantly between different layer 2 technologies and implementations.

A specific Layer 2 instance may be open and shared by many applications, or may be deployed by one company and dedicated to supporting only their application.

## Rollups {#rollups}

Rollups are solutions that perform transaction _execution_ outside layer 1, but post transaction _data_ on layer 1. As transaction _data_ is on layer 1, this allows rollups to be secured by layer 1. Inheriting the security properties of the main Ethereum chain (layer 1), while performing execution outside of layer 1, is a defining characteristic of rollups.

Three simplified properties of rollups are:

1. transaction _execution_ outside layer 1
2. data or proof of transactions is on layer 1
3. a rollup smart contract in layer 1 that can enforce correct transaction execution by using the transaction data on layer 1

Rollups require operators to stake a bond in the rollup contract. This incentivises operators to verify and execute transactions correctly.

**Useful for:**

- reducing fees for users
- open participation
- fast transaction throughput

There are two types of rollups with different security models:

- Zero knowledge: runs computation off-chain and submits a [**validity proof**](/glossary/#validity-proof) to the chain
- Optimistic: assumes transactions are valid by default and only runs computation, via a [**fraud proof**](/glossary/#fraud-proof), in the event of a challenge

### Zero knowledge rollups {#zk-rollups}

Zero knowledge rollups, also known as ZK rollups, bundle or "roll up" hundreds of transfers off-chain and generates a cryptographic proof, known as a SNARK (succinct non-interactive argument of knowledge). This is known as a validity proof and is posted on layer 1.

The ZK rollup contract maintains the state of all transfers on layer 2, and this state can only be updated with a validity proof. This means that ZK rollups only need the validity proof, instead of all transaction data. With a ZK rollup, validating a block is quicker and cheaper because less data is included.

With a ZK rollup, there are no delays when moving funds from layer 2 to layer 1 because a validity proof accepted by the ZK rollup contract has already verified the funds.

The sidechain where ZK rollups happen can be optimised to reduce transaction size further. For instance, an account is represented by an index rather than an address, which reduces a transaction from 32 bytes to just 4 bytes. Transactions are also written to Ethereum as calldata, reducing gas.

#### Pros and cons {#zk-pros-and-cons}

| Pros                                                                                                              | Cons                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Faster finality time since the state is instantly verified once the proofs are sent to the main chain.            | Some don't have EVM support.                                                                          |
| Not vulnerable to the economic attacks that [Optimistic rollups](#optimistic-pros-and-cons) can be vulnerable to. | Validity proofs are intense to compute – not worth it for applications with little on-chain activity. |
| Secure and decentralized, since the data that is needed to recover the state is stored on the layer 1 chain.      |                                                                                                       |

#### Use ZK rollups {#use-zk-rollups}

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs zkSync](https://zksync.io/)
- [Aztec 2.0](https://aztec.network/)

### Optimistic rollups {#optimistic-rollups}

Optimistic rollups use a side chain that sits in parallel to the main Ethereum chain. They can offer improvements in scalability because they don't do any computation by default. Instead, after a transaction they propose the new state to mainnet. Or "notarise" the transaction.

With Optimistic rollups transactions are written to the main Ethereum chain as calldata, optimising them further by reducing the gas cost.

As computation is the slow, expensive part of using Ethereum, Optimistic rollups can offer up to 10-100x improvements in scalability dependent on the transaction. This number will increase even more with the introduction of the Eth2 upgrade: [shard chains](/eth2/shard-chains). This is because there will be more data available in the event that a transaction is disputed.

#### Disputing transactions {#disputing-transactions}

Optimistic rollups don't actually compute the transaction, so there needs to be a mechanism in place to ensure transactions are legitimate and not fraudulent. This is where fraud proofs come in. If someone notices a fraudulent transaction, the rollup will execute a fraud-proof and run the transaction's computation, using the available state data. This means you may have longer wait times for transaction confirmation than a ZK-rollup, because it could be challenged.

![Diagram showing what happens when a fraudulent transaction occurs in an Optimistic rollup in Ethereum](./optimistic-rollups.png)

The gas you need to run the computation of the fraud proof is even reimbursed. Ben Jones from Optimism describes the bonding system in place:

"_anyone who might be able to take an action that you would have to prove fraudulent to secure your funds requires that you post a bond. You basically take some ETH and lock it up and you say "Hey, I promise to tell the truth"... If I don't tell the truth and fraud is proven, this money will be slashed. Not only does some of this money get slashed but some of it will pay for the gas that people spent doing the fraud proof_"

So you get reimbursed for proving fraud.

#### Pros and cons {#optimistic-pros-and-cons}

| Pros                                                                                                             | Cons                                                                        |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Anything you can do on Ethereum layer 1, you can do with Optimistic rollups as it's EVM and Solidity compatible. | Long wait times for on-chain transaction due to potential fraud challenges. |
| All transaction data is stored on the layer 1 chain, meaning it's secure and decentralized.                      |                                                                             |

#### Use Optimistic rollups {#use-optimistic-rollups}

- [Optimism](https://optimism.io/)
- [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
- [Fuel Network](https://fuel.sh/)
- [Cartesi](https://cartesi.io)

<!-- #### The Optimism virtual machine (OVM)

What makes Optimistic rollups particularly exciting is that the chain works the same as the main Ethereum chain because it's based on [the EVM](/developers/docs/evm/). It doesn't use Ethereum, it is Ethereum. This means if you want to use Optimistic rollups, it's just a matter of deploying it to the OVM. It looks, feels, and acts just like the Ethereum main chain–you write contracts in Solidity, and interact with the chain via the Web3 API.

The OVM also has a bunch of features that allow for a really seamless experience moving code from the EVM. In fact you can move Solidity contracts onto a cheaper and faster solution with just a few lines of code.

[Check out the OVM documentation](http://docs.optimism.io/) -->

## Channels {#channels}

Channels allow participants to transact `x` number of times off-chain while only submitting two transaction to the network on chain. This allows for extremely high transaction throughput

**Useful for**:

- lots of state updates
- when number of participants is known upfront
- when participants are always available

Participants must lock a portion of Ethereum's state, like an ETH deposit, into a multisig contract. A multisig contract is a type of contract that requires the signatures (and thus agreement) of multiple private keys to execute.

Locking the state in this way is the first transaction and opens up the channel. The participants can then transact quickly and freely off-chain. When the interaction is finished, a final on-chain transaction is submitted, unlocking the state.

### State channels {#state-channels}

State channel tic tac toe:

1. Create a multisig smart contract “Judge” on the Ethereum main-chain that understands the rules of tic-tac-toe, and can identify Alice and Bob as the two players in our game. This contract holds the 1ETH prize.

2. Then, Alice and Bob begin playing the game, opening the state channel. Each moves creates an off-chain transaction containing a “nonce”, which simply means that we can always tell later in what order the moves happened.

3. When there's a winner, they close the channel by submitting the final state (e.g. a list of transactions) to the Judge contract, paying only a single transaction fee. The Judge ensures that this “final state” is signed by both parties, and waits a period of time to ensure that no one can legitimately challenge the result, and then pays out the 1ETH award to Alice.

There are two types of channels right now:

- State channels – as described above
- Payment channels – Simplified state channels that only deal with payments. They allow off-chain transfers between two participants, as long as the net sum of their transfers does not exceed the deposited tokens.

#### Pros and cons {#channels-pros-and-cons}

| Pros                                                                            | Cons                                                                                                                                                |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instant withdrawal/settling on mainnet (if both parties to a channel cooperate) | Time and cost to set up and settle a channel - not so good for occasional one-off transactions between arbitrary users.                             |
| Extremely high throughput is possible                                           | Need to periodically watch the network (liveness requirement) or delegate this responsibility to someone else to ensure the security of your funds. |
| Lowest cost per transaction - good for streaming micropayments                  | Have to lockup funds in open payment channels                                                                                                       |
|                                                                                 | Don't support open participation                                                                                                                    |

#### Use State channels {#use-state-channels}

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Further reading {#further-reading}

- [Up-to-date analytics on Layer 2 scaling solutions for Ethereum](https://www.l2beat.com/)
- [An Incomplete Guide to Rollups](https://vitalik.ca/general/2021/01/05/rollup.html)
- [Evaluating Ethereum layer 2 Scaling Solutions: A Comparison Framework](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Zero-Knowledge Blockchain Scalability](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)

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

- [Everything you need to know about Optimistic Rollup](https://research.paradigm.xyz/rollups)
- [EthHub on optimistic rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [How does Optimism's Rollup really work?](https://research.paradigm.xyz/optimism)
