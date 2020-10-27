---
title: Ethereum 2.0 (Eth2)
description: Everything you need to know about Eth2
lang: en
sidebar: true
sidebarDepth: 2
---

# Ethereum 2.0 (Eth2) {#ethereum-20-eth2}

Eth2 is a long-planned upgrade to the Ethereum network, giving it the scalability and security it needs to serve all of humanity. The first stage of Eth2, called Phase 0, is planned to launch in 2020.

Eth2 will reduce energy consumption, allow the network to process more transactions, and increase security. Technically speaking, Ethereum will become a [proof-of-stake](/en/eth2/#proof-of-stake) blockchain and introduce [shard chains](/en/eth2/#shard-chains). This is a huge change to how Ethereum works and it should bring equally huge benefits.

But it's only a change to Ethereum's infrastructure. If you're already an ETH holder, dapp user or dapp developer, you don't need to do anything because Eth2 will be compatible with the main Ethereum network you use today. **You'll be able to use the ETH you own today in Eth2 too.**

**Feeling lost?** Try reading up on today's [Ethereum](/en/what-is-ethereum/)

<SectionNav>
<ul>
<li>    
<a href="/en/eth2/the-beacon-chain/">Phase 0: the beacon chain</a> <br />What does the beacon chain do?
</li>
<li>
<a href="/en/eth2/get-involved/">Get involved in Eth2</a> <br />The different ways you can play a part right now
</li>
</ul>
</SectionNav>

<Divider />

## Latest status {#latest-status}

Eth2 is shipping in phases. For more on each phase, [see the roadmap](/en/eth2/#roadmap).

Currently, we're in Phase 0 testing and you can help out. You can run the new Eth2 clients and you can stake testnet ETH on the Medalla multi-client testnet. A client is a piece of software that serves as a "node" in the Ethereum network, helping to read and validate transactions. For more details on how to start testing, see how you can [get involved](/en/eth2/get-involved).

If you're more curious than technical, you can follow the testing here:

- [eth2stats](https://eth2stats.io/onyx-testnet)
- [beaconcha.in](https://beaconcha.in/)
- [Etherscan](https://beaconscan.com/)

Eth2 is complex and not a sequential process, so there are lots of great teams working on the other phases too. However they're not expected to be ready until 2021.

### Updates from Eth2 research and development {#updates-from-eth2-research-and-development}

Folks from around the community are doing a great job of documenting progress so we recommend you check these out for regular updates.

<Eth2Articles />
<Divider />

## Why Eth2? {#why-eth2}

Since launching in 2015, Ethereum has grown into the worlds most-used programmable blockchain. Open, permissionless systems have created billions of dollars of value and enabled entirely new kinds of software applications. But Ethereum still needs to scale to fulfill its potential.

The Eth2 upgrade, originally known as [Serenity](https://blog.ethereum.org/2015/12/24/understanding-serenity-part-i-abstraction/), was always the long term vision. Bringing scalable proof-of-stake consensus to Ethereum has always been on the roadmap.

### Current limitations {#current-limitations}

**Speed, energy, and opportunity**

Ethereum can only handle ~15 transactions per second. For comparison Visa processes around 1500. And the [mining process](/en/learn/#proof-of-work-and-mining) for verifying these transactions isn't sustainable because it's so energy intensive.

Proof-of-work blockchains need the mining process to be energy-intensive for security reasons – so the cost of attacking the network is high. But this also means that there's a financial barrier to participating as a miner.

Ethereum needs to scale but it still needs to be secure and decentralized. These three things aren't easy to achieve all at the same time.

**It's hard to scale a blockchain in a secure, decentralized way.**

Some blockchains are able to provide more transactions per second. But this is because they are more centralized than Ethereum. When you compromise decentralization you also compromise the openness and security of the system. This is a big no-no for Ethereum.

Eth2 is designed to scale without sacrificing performance, security or decentralization. How? Well the network will be going through some big changes and shipping some important new features to make Eth2 a reality.

### Proof of stake {#proof-of-stake}

Ethereum today is a [proof-of-work blockchain](/en/learn/#proof-of-work-and-mining). It relies on miners to keep the network secure and in sync by devoting a great amount of computing power to creating new blocks. Proof-of-stake keeps the network secure but replaces energy consumption with a financial commitment.

Staking is the process of committing your ETH to become a validator for Ethereum. A validator runs software that confirms transactions and, when chosen, creates new blocks in the chain. To become a full validator you'll need 32 ETH. However there will be opportunities to offer a smaller stake by joining staking pools.

There will be thousands of validators. And they will keep the network secure by processing transactions and making sure everyone agrees on the same data.

### Shard chains {#shard-chains}

Shard chains are like parallel blockchains that sit within Ethereum and take on a portion of the network's processing work. They'll turn Ethereum into a super highway of interconnected blockchains.

Right now, all nodes in the Ethereum network must download, compute, store and read every transaction in the history of Ethereum before processing a new one. It's no surprise that Ethereum can only process ~15 transactions per second at the moment.

In Eth2, nodes will be dispersed across a subset of shards. They'll only need to download, compute, store, and read every transaction on that subset – not the whole network. This will increase Ethereum's capacity.

With many shards processing transactions in parallel, it's the job of the beacon chain to make sure they're all in sync.

### The beacon chain {#the-beacon-chain}

The beacon chain is a new blockchain at the core of Ethereum that will provide consensus to all the shard chains. On every shard chain, validators will create blocks of transactions and report them to the beacon chain. This information will then become available to all the other shards – maintaining consensus across the whole network.

**The beacon chain will be the first Eth2 feature shipped in Phase 0.**

See [how transactions work with the beacon chain](/en/eth2/the-beacon-chain/)

<Divider />

## Eth2 roadmap {#roadmap}

The road to Eth2 is long and winding but there are some important checkpoints along the way.

_All work on Eth2 is open source and an incredible coordination effort across a large number of teams. All timings are estimates._

### Phase 0: the beacon chain {#phase-zero}

Expected: 2020

The first part of Eth2 to ship will be the beacon chain. It won't be fully operational right away because there won't be any shard chains, so there'll be nothing to keep in sync other than itself. Remember, the beacon chain's main role in Eth2 is making sure all the shards have the most up-to-date data.

At first, the beacon chain will be responsible for registering validators and coordinating everyone's staked ETH. This is foundational to the rest of Eth2 and lays the groundwork for the shard chains.

In other words, once the beacon chain is live, you'll be able to stake your real ETH. However, staking in Phase 0 is a one-way transaction. You won't be able to withdraw your ETH until the current chain becomes a shard of Eth2 in Phase 1.5. That's because staking in Phase 0 will be handled by a smart contract on mainnet (the Ethereum we use today).

<ButtonLink to="/eth2/the-beacon-chain/">More on the beacon chain</ButtonLink>

### Phase 1: the shard chains {#phase-one}

Expected: 2021

Phase 1 is when we'll meet the shard chains. These are chains that are delegated a portion of Ethereum's transactions and account data. They will be proof-of-stake chains, which means validators (who have staked ETH) will create blocks – not miners like today.

We expect to start Phase 1 with 64 shards but they won't support accounts or smart contracts right away.

### Phase 1.5: mainnet becomes a shard {#phase-one-five}

Expected: 2021

Up until Phase 1.5, the Ethereum we use today on mainnet will continue as a [proof-of-work blockchain](/en/learn/#proof-of-work-and-mining). Transactions will continue to be processed by miners. But in Phase 1.5, mainnet will officially become a shard and transition to proof-of-stake.

For end users and dapps, this change should be seamless.

### Phase 2: fully formed shards {#phase-two}

Expected: 2021+

In Phase 2, shards should be fully functional chains. Shards will now be compatible with smart contracts and they'll be able to communicate with each other more freely. Developers may even be able to design shards in their own ways.

<InfoBanner emoji=":right-pointing_magnifying_glass:">
  Phase 2 is still very much in the research phase.
</InfoBanner>

 <Divider />

## Get involved {#get-involved}

Eth2 is a community effort and there are ways you can play a part. Currently you can help out by running Eth2 clients, hacking testnets or staking your test ETH.
<ButtonLink to="/eth2/get-involved/">Take part in Eth2</ButtonLink>

## Further reading {#further-reading}

- [The State of Eth2, June 2020](https://blog.ethereum.org/2020/06/02/the-state-of-eth2-june-2020/) _Jun 2, 2020 – Danny Ryan_
- [What's new in Eth2?](https://hackmd.io/@benjaminion/eth2_news/https%3A%2F%2Fhackmd.io%2F%40benjaminion%2Fwnie2_200725) _Updated often – Ben Edginton_
- [ETH 2.0 Roadmap and Phases](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/) _Updated often - EthHub_
- [Proof of Stake](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/proof-of-stake/) _Updated often - EthHub_
- [Sharding](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/sharding/) _Updated often - EthHub_
- [ETH 2.0 Researchers AMA Part 1](https://docs.ethhub.io/other/ethereum-2.0-ama/#part-1) _Jan 24, 2019 - EthHub_
- [ETH 2.0 Researchers AMA Part 2](https://docs.ethhub.io/other/ethereum-2.0-ama/#part-2) _Jul 15, 2019 - EthHub_
- [The Beacon Chain Ethereum 2.0 explainer you need to read first](https://ethos.dev/beacon-chain/) _Feb 25, 2020 - ethos.dev_
- [ETH 2.0 Hacker Start](https://notes.ethereum.org/@protolambda/eth2_start) _Updated often - Diederik Loerakker_
- [Combining GHOST and Casper](https://arxiv.org/abs/2003.03052) _Mar 12, 2020 - Vitalik Buterin et. al_
- [One security audit of ETH 2.0 specs](https://leastauthority.com/static/publications/LeastAuthority-Ethereum-2.0-Specifications-Audit-Report.pdf) _Mar 6, 2020 - Dominic Tarr et. al_
