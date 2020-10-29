---
title: Shard chains
description: Learn about shard chains - the first major eth2 upgrade to Ethereum.
lang: en
template: eth2
sidebar: true
summary: Sharding is a multi-phase upgrade to improve Ethereum’s scalability and capacity. It involves spreading Ethereum’s load across many new chains to increase the amount of transactions Ethereum can handle per second and decrease the computational burden on those validating the transactions.
---

<UpgradeStatus date="~2021">
    Shard chains should ship sometime in 2021 based on how well <a href="/en/eth2/beacon-chain/">the beacon chain</a> launch goes. These shards will just help spread the data in the system, they won’t be used for executing code. The details of that are still being figured out.
</UpgradeStatus>

## What is sharding?

Sharding is the process of splitting a database horizontally to spread the load – it’s a common concept in computer science. In an Ethereum context, sharding will reduce network congestion and increase transactions per second by creating new chains, known as “shards”.

This is important for reasons other than scalability.

### Accessibility

Sharding is a good way to scale if you want to keep things decentralized as the alternative is to scale by increasing the size of the existing database. This would make Ethereum less accessible – you couldn't run it on a phone for instance. With shards you only need to store/run data for the shard you’re validating, not the entire network (like what happens today). This not only speeds things up but drastically reduces the requirements of the hardware.

### Decentralization

By making Ethereum more accessible, more people can participate. This drastically reduces the risks of collusion by helping Ethereum become more decentralized. It also offers those who know how a better opportunity to run clients themselves rather than rely on services that you have to trust.

## Shards and extra data

When the first shard chains are shipped they will just provide extra data to the network. They won’t handle transactions or smart contracts. But even in this phase, they’ll offer incredible improvements to transactions per second.

### Up to 100,000 transactions per second with rollups

Rollups are a technology that exists today. They allow dapps to bundle or “roll up” transactions into a single transaction off-chain, generate a cryptographic proof anddd then submit it to the chain. This reduces the data needed for a transaction. Combine this with all the extra data availability provided by shards and you get 100,000 transactions per second. More on [rollups](/en/developers/docs/advanced/layer-2-scaling/).

## Sharding phase 2: code execution

Rollups are a technology that exists today. They allow dapps to bundle or “roll up” transactions into a single transaction off-chain, generate a cryptographic proof anddd then submit it to the chain. This reduces the data needed for a transaction. Combine this with all the extra data availability provided by shards and you get 100,000 transactions per second. More on rollups

### Do shards need to be smarter?

Founder of Ethereum, Vitalik Buterin presented 3 potential options that are worth discussing.

#### State execution not needed

This would mean we don’t give shards the capability to handle smart contracts and leave them as data depots.

#### Have some execution shards

Perhaps there’s a compromise where we don’t need all shards (64 are planned right now) to be smarter. We could just add this functionality to a few and leave the rest. This could speed the delivery up.

#### Wait until we can do Zero Knowledge (ZK) snarks

Finally, perhaps we should revisit this debate when ZK snarks are firmed up. This is a technology that could help bring truly private transactions to the network. It’s likely that they’ll require smarter shards, but they’re still in research and development.
This is still an active discussion point. We’ll update these pages once we know more.

## Relationship between upgrades

The Eth2 upgrades are all somewhat interrelated. So let’s recap how the shard chains relate the other upgrades.

### Shards and the beacon chain

The beacon chain contains all the logic for keeping shards secure and synced up. The beacon chain will coordinate the stakers in the network, assigning them to shards they need to work on. And it will also facilitate communication between shards by receiving and storing shard transaction data that is accessible by other shards. This will give shards a snapshot of Ethereum’s state to keep everything up-to-date.

<ButtonLink to="/en/eth2/beacon-chain/">The beacon chain</ButtonLink>

### Shards and the docking

The Ethereum mainnet will exist as it does today even after the introduction of shards. However at some point, mainnet will need to become a shard so that it can transition to staking. It remains to be seen whether mainnet will exist as the only “smart” shard that can handle code execution – but either way, a decision will have to be made on phase 2 of sharding.

<ButtonLink to="/en/eth2/docking/">The docking</ButtonLink>

<Divider />

### Read more

<Eth2ShardChainsList />
