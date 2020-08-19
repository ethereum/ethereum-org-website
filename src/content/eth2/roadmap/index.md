---
title: Eth2 roadmap
description: The path to Eth2 explained
lang: en
sidebar: true
---

# Eth2 roadmap

<Subtitle>The road to Eth2 is long and winding but there are some important checkpoints along the way. </Subtitle>

## Where we are now

Currently, teams are building out [Eth2 clients](/en/eth2/get-involved#eth2-clients) and in the process of testing them. A client is a piece of software that serves as a "node" in the Ethereum network, helping to read and validate transactions.

There are many different types of clients because Ethereum encourages a multi-client world. As Danny Ryan puts it, "Ethereum is the abstract set of rules that makes up the protocol rather than any specific implementation of those set of rules".

And they're being tested across different testnets so that teams can iron out any bugs.

[More info on teams building Eth2](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth2.0-teams/teams-building-eth2.0/) _– ETHHub_

Testing is public so you can check it out here:

- [eth2stats](https://eth2stats.io/onyx-testnet)
- [beaconcha.in](https://beaconcha.in/)
- [Etherscan](https://beaconscan.com/)

### Join testing {#join-testing}

If you want to play a part in Eth2, help test the different clients.

<Button to="/eth2/get-involved#go-bug-hunting">Start testing</Button>

_All work on Eth2 is open source and an incredible coordination effort across a large number of temams. All timings are estimates_

## Phase 0: the beacon chain

Expected: 2020

In Eth2 there will be lots of parallel chains (or [shards](/en/eth2/shard-chains/)) with their own validators processing transactions.

<InfoBanner emoji=":thinking_face:">
    <b>What's a validator?</b> An actor who proposes and confirms the state of new blocks on the network.
 </InfoBanner>

Shards are where the additional scalability and throughput will come from. However all the shards will need consensus for the network to remain safe.

**The beacon chain is a new blockchain at the core of Ethereum that will provide consensus to all the shard chains.**

By the end of Phase 0, the beacon chain will be active. There will still be a long way to go, but the beacon chain paves the way for the shard chains.

### The purpose of the beacon chain

At first, the beacon chain will be responsible for registering validator [stakes](/en/eth2/proof-of-stake/). The deposits will be handled by a smart contract on mainnet (the Ethereum we use today).

In other words, once the beacon chain is live, you'll be able to stake your ETH.

[Get started with staking](/en/eth2/get-involved/)

<Warning emoji=":warning:">
    You won't be able to withdraw your ETH until the shard chains are available in Phase 1
</Warning>

The beacon chain will also store cryptographic receipts of the current state of a given shard in the form of a hash. Shard validators will report a hash to the beacon chain whenever the data on their shard changes. The beacon chain will then store it as proof.

<Button to="/eth2/the-beacon-chain/">More on the beacon chain</Button>

## Phase 1: the shard chains {#phase-one}

Expected: 2021

Phase 1 is where we'll see the creation of the shard chains. These are chains that are delegated a portion of Ethereum's transactions and account data. However in Phase 1 it's just the structure that will be put into place. Shards won't support accounts or smart contracts yet.

Shard chains will be [proof-of-stake chains](/en/eth2/proof-of-stake/). This means validators (who have staked ETH) will create blocks and not miners like today.

We expect to start Phase 1 with 64 shards.

## Phase 1.5: integration with mainnet

Expected: 2021

Up until Phase 1.5, the Ethereum we use today on mainnet will continue as a [proof-of-work blockchain](/en/learn/#proof-of-work-and-mining). Transactions will continue to be processed by miners. But in Phase 1.5, mainnet will officially become a shard and transition to [proof-of-stake](/en/eth2/proof-of-stake/).

For end users and dapps, this change should be seamless.

## Phase 2: fully formed shards

Expected: 2021+

In phase 2, shards should be fully functional chains. Shards will be able to communicate with each other more freely and developers may even be able to design shards in their own ways.

<InfoBanner emoji=":right-pointing_magnifying_glass:">
    Phase 2 is still very much in the research phase.
 </InfoBanner>

## Learn more

If you'd like to read up on the key components of Eth2, we've got you covered.

- [Proof-of-stake](/en/eth2/proof-of-stake/)
- [Shard chains](/en/eth2/shard-chains/)
