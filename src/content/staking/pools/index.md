---
title: Pooled staking
description: An overview of how to get started with pooled ETH staking
lang: en
template: staking
emoji: ":money_with_wings:"
sidebar: true
image: ../../../assets/staking/leslie-pool.png
alt: Leslie the rhino swimming in the pool.
sidebarDepth: 2
summaryPoints:
  - Staking pools allow users to participate in the validating process of Ethereum and earn rewards with less than the required 32 ETH by joining forces with others.
---

## What are staking pools?

Staking pools are a collaborative approach to allow many with smaller amounts of ETH to obtain the 32 ETH required to activate a set of validator keys. Pooling functionality is not natively supported within the protocol, so solutions were built out separately to address this need.

Some pools operate using smart contracts, where funds can be deposited to a contract, which trustlessly manages and tracks your stake, and issues you a token that represents this value. Other pools may not involve smart contracts and are instead mediated off-chain.

## Why stake with a pool?

In addition to the benefits we outlined in our [intro to staking](/staking), staking with a pool comes with a number of distinct benefits.

<Card title="Low barrier to entry">
  Not a whale? No problem. Most staking pool lets you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH.
</Card>
<Card title="Stake today">
  Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations.
</Card>
<Card title="Liquidity tokens">
  Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications.
</Card>

## How does it compare?

**Solo staking** - Pooled staking has a significantly lower barrier to entry when compared to solo staking, but comes with additional risk by delegating all node operations to a third-party, and with a fee. Solo staking gives full sovereignty and control over the choices that go into choosing a staking setup. Stakers never have to hand over their keys, and they earn full rewards without any middlemen taking a cut. If this sounds like what you're looking for, learn more about [solo staking](/staking/solo).

**Staking as a service (SaaS)** - These are similar in that stakers do not run the validator software themselves, but unlike pooling options, SaaS requires a full 32 ETH deposit to activate a validator. Rewards accumulate to the staker, and usually involve a monthly fee or other stake to use the service. If you'd prefer your own validator keys and are looking to stake at least 32 ETH, check out [staking as a service](/staking/staking-as-a-service).

## What to consider

Pooled or delegated staking is not natively supported by the Ethereum protocol, but given the demand for users to stake less than 32 ETH a growing number of solutions have been built out to serve this demand.

Each pool and the tools or smart contracts they use have been built out by different teams and each come with their own risks and benefits.

Attribute indicators are used below to signal notable strengths or weaknesses a listed staking pool may have. Use this section as a reference for how we define these attributes while you're choosing a pool to join.

- **Open source**: Essential code is 100% open source and available to the public to fork and use
- **Audited**: Essential code has undergone formal auditing with results published and available publicly
- **Bug bounty**: A public bug bounty has been performed on any essential code to rewards users for safely reporting and/or fixing vulnerabilities
  - ✅ Currently active
- **Battle tested**: Service has been available and used by the public for the indicated period of time
  - ✅ Live for over one year
  - 🟡 Live for over six months
  - ⛔️ Live for less than six months
- **Trustless**: Service does not require trusting any humans to custody your keys or distribute rewards
- **Permissionless nodes**: Service allows anyone to join as a node operator for the pool, without permission
- **Diverse clients**: Service should not run more than 50% of their aggregate validators with a supermajority validator client
  - ⭐️ Less than 25%
  - ✅ Less than 50%
  - ⛔️ More than 50%
  - 🟡 Currently unknown
- **Liquidity token**: Offers tradable liquidity token representing your staked ETH, held in your own wallet

## Explore staking pools

There are a variety of options available to help you with your setup. Use the above indicators to help guide you through the tools below.

> Please note the importance of choosing a [minority client](/client-diversity) as it improves the security of the network, and limits your risk. Tools that allow you to setup minority client are denoted as "multi-client."

```
<CardGrid>
  {stakingProducts.nodeTools.map(tool => <ProductCard product={tool} />)}
</CardGrid>
```

Have a suggestion for a staking tool we missed? Check out our [product listing policy](/contributing/adding-staking-product) to see if it would be a good fit, and to submit it for review.

## FAQs of pooled staking

<!-- TODO: Add pool FAQs -->
