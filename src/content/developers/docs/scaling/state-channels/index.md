---
title: State Channels
description: An introduction to state channels and payment channels as a scaling solution currently utilized by the Ethereum community.
lang: en
sidebar: true
incomplete: true
sidebarDepth: 3
---

State channels allow participants to transact `x` number of times off-chain while only submitting two on-chain transactions to the Ethereum network. This allows for extremely high transaction throughput.

## Prerequisites {#prerequisites}

You should have a good understanding of all the foundational topics and a high-level understanding of [Ethereum scaling](/developers/docs/scaling/). Implementing scaling solutions such as channels is an advanced topic as the technology is less battle-tested, and continues to be researched and developed.

## Channels {#channels}

Participants must lock a portion of Ethereum's state, like an ETH deposit, into a multisig contract. A multisig contract is a type of contract that requires the signatures (and thus agreement) of multiple private keys to execute.

Locking the state in this way is the first transaction and opens up the channel. The participants can then transact quickly and freely off-chain. When the interaction is finished, a final on-chain transaction is submitted, unlocking the state.

**Useful for**:

- lots of state updates
- when number of participants is known upfront
- when participants are always available

There are two types of channels right now: state channels and payment channels.

## State channels {#state-channels}

State channel are perhaps best explained through an example, such as a game of tic tac toe:

1. Create a multisig smart contract “Judge” on the Ethereum main-chain that understands the rules of tic-tac-toe, and can identify Alice and Bob as the two players in our game. This contract holds the 1ETH prize.

2. Then, Alice and Bob begin playing the game, opening the state channel. Each move creates an off-chain transaction containing a “nonce”, which simply means that we can always tell later in what order the moves happened.

3. When there's a winner, they close the channel by submitting the final state (e.g. a list of transactions) to the Judge contract, paying only a single transaction fee. The Judge ensures that this “final state” is signed by both parties, and waits a period of time to ensure that no one can legitimately challenge the result, and then pays out the 1ETH award to Alice.

## Payment channels {#payment-channels}

Simplified state channels that only deal with payments (e.g. ETH transfers). They allow off-chain transfers between two participants, as long as the net sum of their transfers does not exceed the deposited tokens.

## Pros and cons {#channels-pros-and-cons}

| Pros                                                                            | Cons                                                                                                                                                |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instant withdrawal/settling on Mainnet (if both parties to a channel cooperate) | Time and cost to set up and settle a channel - not so good for occasional one-off transactions between arbitrary users.                             |
| Extremely high throughput is possible                                           | Need to periodically watch the network (liveness requirement) or delegate this responsibility to someone else to ensure the security of your funds. |
| Lowest cost per transaction - good for streaming micropayments                  | Have to lockup funds in open payment channels                                                                                                       |
|                                                                                 | Don't support open participation                                                                                                                    |

## Use state channels {#use-state-channels}

Multiple projects provide implementations of state channels that you can integrate into your dapps:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Further reading {#further-reading}

**State channels**

- [EthHub on state channels](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/state-channels/)
- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, Feb 12 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _Nov 6, 2015 - Jeff Coleman_
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Payment channels**

- [EthHub on payment channels](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/payment-channels/)

_Know of a community resource that helped you? Edit this page and add it!_
