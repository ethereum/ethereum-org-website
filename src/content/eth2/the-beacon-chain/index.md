---
title: The beacon chain
description: Everything you need to know about the beacon chain
lang: en
sidebar: true
sidebarDepth: 2
---

# The beacon chain

The beacon chain is a new blockchain at the core of Eth2 that will ensure the whole network is in sync with the same data. In Eth2 this is a lot more difficult than it is today because the network will exist across many shards. This means rather than just one blockchain, Ethereum will become many blockchains all running in parallel. These [shard chains](/en/eth2/#shard-chains) are an important part of increasing the number of transactions Ethereum can handle per second.

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

When you submit a transaction – like sending ETH to someone – a validator will be responsible for adding your transaction to a shard block. Validators are algorithmically chosen to propose new blocks.

The bigger your stake, the more often you'll be chosen to propose shard blocks.Athough 32ETH is effectively the max, so having more than 32ETH staked does not change the amount you are selected, but having less than 32 does.

#### Attestation

If a validator isn't chosen to propose a new shard block, they'll have to validate the proposal and confirm that everything looks as it should.

If a validator agrees with a block proposal they are "attesting" to it. This is like giving the block the "ok" before shipping it off to the beacon chain. It's the attestation that is recorded in the beacon chain, rather than the transaction itself.

At least 128 validators are required to attest to each shard block – this is known as a "committee".

By separating validators out into committees, the effort required to verify Eth2 and propose shard blocks is massively reduced. It's this design that allows you to be a validator on a regular piece of hardware like a laptop. This is different to Ethereum today where to produce blocks you need to run intense mining software. This will help Ethereum become even more decentralized.

The committee has a time-frame in which to propose and validate a shard block. This is known as a "slot". Only one valid block is created per slot. There are 32 slots in an "epoch". After each epoch, the committee is disbanded and reformed with different participants. This helps keep committees safe from bad actors.

New epochs occur every 6.4 minutes.

Eth2 should have at least 64 shard chains to start with, so how are the 63 other chains going to know about your transaction? The beacon chain!

### Rewards, penalties and finality

During each epoch, the beacon chain has to do all the record-keeping. This includes issuing rewards and penalties to validators, and finalising beacon blocks.

#### Rewards and penalties

Once a new shard block proposal has enough attestations, a "crosslink" is created which confirms the inclusion of the block, and your transaction, in the beacon chain.

This is coming in [Phase 1](/en/eth2/#phase-one).

Once there's a crosslink, the shard block proposer gets a reward in the form of more ETH.

Validators can also receive penalties if they've been bad actors. Or even have their ETH slashed completely.

You can be penalized for being offline, but not slashed. Slashings are much more serious cryptographically provable malicious actions against the protocol. These are met with an ejection from the validator set and a harsher penalty.

#### Finality

Once a block is ready for the beacon chain, it needs finality. It shouldn't be able to be reverted. The beacon chain uses a protocol known as Casper (the friendly finality gadget) to finalise blocks.

Casper uses cryptoeconomic incentives to discourage validators from reverting a block. You can make votes on non-canonical chains but if you equivocate (double vote or contradict yourself), you can be slashed.

When the Beacon Chain block has been finalised, the shard block is also considered finalised. Other shards will then be able to read that data.

## In summary

The beacon chain receives block attestations from shards and uses Casper to ensure they are finalised.

Prior to that, the shard blocks go through a proof-of-stake process:

- proposed by a chosen validator in a committee
- attested by the rest of the committee during an epoch "slot"
- crosslinked with the beacon chain after enough attestations
- finalised by Casper using cryptoeconomic incentives

And that's how Eth2 stays in sync using the beacon chain.

## Further reading

For more on the Beacon Chain:

- [The Beacon Chain Ethereum 2.0 explainer you need to read first](https://ethos.dev/beacon-chain/) _– Ethos.dev_
- [Two Point Oh: The Beacon Chain](https://our.status.im/two-point-oh-the-beacon-chain/) _– Status_
- [Sharding consensus](https://blog.ethereum.org/2020/03/27/sharding-consensus/) _– Ethereum foundation_
