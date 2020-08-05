---
title: The beacon chain
description: Everything you need to know about the beacon chain
lang: en
sidebar: true
sidebarDepth: 2
---

# The beacon chain

The beacon chain is a new blockchain at the core of Ethereum that will ensure the whole network is in sync with the same data. In Eth2 this is a lot more difficult than it is today because the network will exist across many shards. This means rather than just one blockchain, Ethereum will become many blockchains all running in parallel. These [shard chains](/en/eth2/#shard-chains) are an important part of improving the amount of tranasctions Ethereum can handle.

It's the job of the beacon chain to make sure every shard has the most up-to-date data. It does this with the help of validators who communicate the state of shard chains to the beacon chain. A validator is someone who has staked 32ETH in the network to take part in processing transactions, creating new blocks and earning staking rewards.

The beacon chain does all this by storing:

- validator addresses
- the state of each validator
- block attestations
- links to shards

How this works is best explained by following the lifecycle of a transaction in Eth2.

## How transactions work in Eth2

### Shard to beacon communication

#### Validation

When you submit a transaction – like sending ETH to someone – a validator will be responsible for adding your transaction to a block. Validators are algorithmically chosen to propose new blocks.

The amount of transactions a validator can add to a block proposal depends on the size of their stake. A validator with 40ETH behind them can add more transactions than someone with 32ETH.

#### Attestation

If a validator isn't chosen to propose a new block, they'll have to validate the proposal and confirm that everything looks as it should.

If a validator agrees with a block proposal they are "attesting" to it. This is like giving the block the "ok" before shipping it off to the beacon chain. It's the attestation that is recorded in the beacon chain, rather than the transaction itself.

128 validators are required to attest to a block – this is known as a "committee".

By separating validators out into committees, the effort required to verify Eth2 is massively reduced. It's this design that allows you to be a validator on a regular piece of hardware like a laptop. This is different to Ethereum today where to verify the chain you need to run intense mining software. This will help Ethereum become even more decentralized.

The committee has a time-frame in which to propose and validate a block. This is known as a "slot". Only one valid block is created per slot. There are 32 slots in an "epoch". After each epoch, the committee is disbanded and reformed with different participants. This helps keep committes safe from malicious actors.

New epochs occur every 6.4 minutes.

Eth2 should have at least 64 shard chains to start with, so how are the 63 other chains going to know about your transaction? The beacon chain!

### Rewards, slashing and finality

During each epoch, the beacon chain has to do all the record-keeping. This includes issuing rewards and slashing penalties to validators, and finalising blocks.

#### Rewards and slashing

Once a new block proposal has enough attestations, a "crosslink" is created which confirms to the beacon chain that it should include that block, and your transaction, in the beacon chain.

This is coming in [Phase 1](/en/eth2/roadmap/#phase-one).

Once there's a crosslink, the block proposer gets a reward in the form of more ETH.

During this epoch validators can also have their ETH slashed if they've been bad actors. They might lose ETH for being offline for example.

#### Finality

Once a block is ready for the beacon chain, it needs finality. It shouldn't be able to be reverted. The beacon chain uses a protocol known as Casper (Friendly Finality Gadget) to finalise blocks.

Casper uses cryptoeconomic incentives to discourage validators frrom reverting a block. The protocol finalises blocks by requiring 2/3 validators to make a "maximum-odds" bet that the block will be finalised. This bet discourages any bad behaviour because any guilty validators will lose their stakes.

## In summary

The beacon chain receives block attestations from shards and uses Casper FFG to ensure they are finalised.

Prior to that, the shard blocks go through a proof-of-stake process:

- proposed by a chosen validator in a committee
- attested by the rest of the committee during an epoch "slot"
- crosslinked with the beacon chain after enough attestations
- finalised by Casper using cryptoeconomic incentives

## Further reading

For more on the Beacon Chain:

- [The Beacon Chain Ethereum 2.0 explainer you need to read first](https://ethos.dev/beacon-chain/) _– Ethos.dev_
- [Two Point Oh: The Beacon Chain](https://our.status.im/two-point-oh-the-beacon-chain/) _– Status_
- [Sharding consensus](https://blog.ethereum.org/2020/03/27/sharding-consensus/) _– Ethereum foundation_
