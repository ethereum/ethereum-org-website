---
title: Ethereum 2.0 (Eth2)
description: Everything you need to know about Eth2
lang: en
sidebar: true
sidebarDepth: 4
---

# Ethereum 2.0 (Eth2)

<Subtitle>Eth2 will give Ethereum the scalability upgrades it needs to serve all of humanity. It’s a multi-phase process but the phase 0 should be with us before the end of 2020.</Subtitle>

Eth2 refers to a major upgrade happening to the Ethereum blockchain. This will make transactions faster, reduce energy consumption and introduce staking rewards. Technically speaking, Ethereum will be moving from [proof-of-work](/en/learn/#proof-of-work-and-mining) to a [proof-of-stake](/en/eth2/proof-of-stake/) blockchain and introducing [shard chains](/en/eth2/shard-chains/). This is a huge change to how Ethereum works but it should bring equally huge benefits.

<InfoBanner emoji=":thinking_face:">
    <b>Not following?</b> Try reading up on <a href="/en/what-is-ethereum/">Ethereum 1.0</a>
</InfoBanner>

## Latest status

Eth2 is currently **in testing** so, if you're really bullish, now's the time to help test the latest developments.

This testing phase is the first tangible step in the journey to Eth2. The roadmap will show the ground we still have left to cover.

- [The roadmap](/en/eth2/roadmap/)
- [How to get involved](/en/eth2/get-involved/)

Folks from around the community are doing a great job of documenting progress so we recommend you check these out. Danny Ryan is also posting regular updates on the ethereum.org blog.

<Eth2List />

## Learn Eth2

If you're here to understand Eth2, we'll dive into why it's needed and how it works.

If you're already an ETH holder, dapp user or dapp developer, you don't need to do anything because Eth2 will be compatible with the main Ethereum network you use today. **You'll be able to use the ETH you own today in Eth2 too.**

### Why Eth2?

<Subtitle>In the five years since launch, Ethereum has shown us what’s possible when you combine blockchain technology and software applications to create open, permissionless systems. But Ethereum still needs to scale to fulfil its potential.</Subtitle>

Today, Ethereum handles a tremendous amount of value and it works well. But the design of Eth2 was always the vision – it just wasn't possible at the time Ethereum launched. Eth2 will solve the compromises of [Ethereum 1.0](/what-is-ethereum/).

#### Current limitations

**Speed** ⚡️

Ethereum can only handle ~15 transactions per second. For comparison Visa processes around 1500. Right now, Ethereum couldn’t handle mainstream adoption.

**Energy** 💡

Verifying transactions is currently very energy intensive which isn’t sustainable.

**Opportunity** 🏗

The upfront costs of mining equipment means there’s a a substantial financial barrier to participating in the network.

Some blockchains have claimed to solve some or all of these issues. But this is often at the expense of principles that Ethereum won't ever compromise on, like decentralization.

#### The Ethereum trilemma

The Ethereum trilemma is that it's inherently difficult to scale a blockchain in a secure, decentralized way.

To make ETH more scalable it will have to be faster and less energy-intensive. This wouldn't be as tricky if you were willing to compromise on decentralization. But when you compromise decentralization you also start to compromise the openness and security of the system. This is a big no-no for Ethereum.

**Secure** 🛡

Ethereum needs the same level of security and incentives in place to keep the network safe.

**Decentralized** 🌐

Extra scalability and security can’t come at the expense of centralization.

**Scalable** 💗

Ethereum needs to handle lots of transactions and meet growing demands without sacrificing performance.

#### Eth2 features

The features planned for Eth2 solve the trilemma with the addition of the beacon chain, shard chains and proof-of-stake.

##### Proof of stake

Staking is the process of committing your ETH to become a validator for Ethereum. A validator is responsible for running software that validates transactions and, when chosen, creates new blocks in the chain. To become a full validator you'll need 32 ETH. However there will be opportunities to offer a smaller stake by joining staking pools.

There will be thousands of validators. And they will keep the network secure by processing the transactions and making sure everyone is using the same data.

##### Shard chains

Shard chains are Eth2's answer to the scaling problem. They'll turn Ethereum into a super highway of interconnected blockchains.
A shard chain is like a parallel blockchain that takes on some of the processing work.

They are inspired by sharded databases, which scalability by spreading the load of a database across multiple instances. In other words, sharding increases the number of actors in the network to scale.

Right now, all nodes in the Ethereum network must download, compute, store and read every transaction in the history of Ethereum before processing a new one. It's no surprise that it can only process ~15 transactions per second.

If your computer is processing transactions on a shard chain, it only needs to download, compute, store and read every transaction on that shard. This is far less work.

With many shards processing transactions in parallel, it's the job of the beacon chain to make sure they're all in sync.

##### The beacon chain

The beacon chain is a new blockchain at the core of Ethereum that will provide consensus to all the shard chains. On every shard chain, validators will create blocks of transactions and report them to the beacon chain. This information will then become available to all the other shards – maintaining consensus across the whole network. The beacon chain will be the first eth2 feature shipped in Phase 0.

See [how transactions work with the beacon chain](/en/eth2/the-beacon-chain)

## Eth2 roadmap

<Subtitle>The road to Eth2 is long and winding but there are some important checkpoints along the way. </Subtitle>

### Where we are now

Currently, teams are building out [Eth2 clients](/en/eth2/get-involved#eth2-clients) and in the process of testing them. A client is a piece of software that serves as a "node" in the Ethereum network, helping to read and validate transactions.

There are many different types of clients because Ethereum encourages a multi-client world. As Danny Ryan puts it, "Ethereum is the abstract set of rules that makes up the protocol rather than any specific implementation of those set of rules".

And they're being tested across different testnets so that teams can iron out any bugs.

[More info on teams building Eth2](https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth2.0-teams/teams-building-eth2.0/) _– ETHHub_

Testing is public so you can check it out here:

- [eth2stats](https://eth2stats.io/onyx-testnet)
- [beaconcha.in](https://beaconcha.in/)
- [Etherscan](https://beaconscan.com/)

_All work on Eth2 is open source and an incredible coordination effort across a large number of teams. All timings are estimates_

### Phase 0: the beacon chain

Expected: 2020

The first part of Eth2 to ship will be the beacon chain. But it won't be fully operational right away as without any shard chains, there'll be nothing to really orchestrate. Remember, the beacon chain's starring role in Eth2 is keeping the shards in sync.

At first, the beacon chain will be responsible for registering validator stakes. In other words it will store the information of everyone staking their ETH to become an Eth2 validator. But that's about it.

For Phase 0, the act of staking will be handled by a smart contract on mainnet (the Ethereum we use today).

Once the beacon chain is live, you'll be able to stake your real ETH. However, staking in Phase 0 is a one-way transaction. You won't be able to withdraw your ETH until the shard chains are available in Phase 1.

<Button to="/en/eth2/the-beacon-chain">More on the beacon chain</Button>

### Phase 1: the shard chains {#phase-one}

Expected: 2021

Phase 1 is where we'll see the creation of the shard chains. These are chains that are delegated a portion of Ethereum's transactions and account data. However in Phase 1 it's just the structure that will be put into place. Shards won't support accounts or smart contracts yet.

Shard chains will be proof-of-stake chains. This means validators (who have staked ETH) will create blocks, not miners like today.

We expect to start Phase 1 with 64 shards.

### Phase 1.5: integration with mainnet

Expected: 2021

Up until Phase 1.5, the Ethereum we use today on mainnet will continue as a [proof-of-work blockchain](/en/learn/#proof-of-work-and-mining). Transactions will continue to be processed by miners. But in Phase 1.5, mainnet will officially become a shard and transition to proof-of-stake.

For end users and dapps, this change should be seamless.

### Phase 2: fully formed shards

Expected: 2021+

In phase 2, shards should be fully functional chains. Shards will be able to communicate with each other more freely and developers may even be able to design shards in their own ways.

<InfoBanner emoji=":right-pointing_magnifying_glass:">
    Phase 2 is still very much in the research phase.
 </InfoBanner>

## Get involved

We've outlined ways for you to play your part in Eth2.
<Button to="/eth2/get-involved">Take part in Eth2</Button>

<CardContainer>
    <MarkdownCard emoji=":bug:" title="Test clients" description="If you want to play a part in Eth2, help test the different clients.
    ">
        <Button to="/eth2/get-involved#go-bug-hunting">Start testing</Button>
    </MarkdownCard>
    <MarkdownCard emoji=":rhinoceros:" title="Test clients" description="You can now stake GöETH and become a validator for the [Medalla multi-client testnet](https://github.com/goerli/medalla/blob/master/medalla/README.md). GöETH is ETH running on the Görli testnet. You can get some from the Görli faucet">
        <Button to="https://medalla.launchpad.ethereum.org/">Stake GöETH</Button> {" "}{" "}<Button isSecondary to="https://faucet.goerli.mudit.blog/">Request GöETH</Button>
    </MarkdownCard>
</CardContainer>
