---
title: Pooled staking
description: An overview of how to get started with pooled ETH staking
lang: en
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Leslie the rhino swimming in the pool.
sidebarDepth: 2
summaryPoints:
  - Stake and earn rewards with any amount of ETH by joining forces with others
  - Skip the hard part and entrust validator operation to a third-party
  - Hold staking tokens in your own wallet
---

## What are staking pools? {#what-are-staking-pools}

Staking pools are a collaborative approach to allow many with smaller amounts of ETH to obtain the 32 ETH required to activate a set of validator keys. Pooling functionality is not natively supported within the protocol, so solutions were built out separately to address this need.

Some pools operate using smart contracts, where funds can be deposited to a contract, which trustlessly manages and tracks your stake, and issues you a token that represents this value. Other pools may not involve smart contracts and are instead mediated off-chain.

## Why stake with a pool? {#why-stake-with-a-pool}

In addition to the benefits we outlined in our [intro to staking](/staking/), staking with a pool comes with a number of distinct benefits.

<CardGrid>
  <Card title="Low barrier to entry" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="Stake today" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Staking tokens" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## What to consider {#what-to-consider}

Pooled or delegated staking is not natively supported by the Ethereum protocol, but given the demand for users to stake less than 32 ETH a growing number of solutions have been built out to serve this demand.

Each pool and the tools or smart contracts they use have been built out by different teams, and each comes with benefits and risks. Pools enable users to swap their ETH for a token representing staked ETH. The token is useful because it allows users to swap any amount of ETH to an equivalent amount of a yield-bearing token that generates a return from the staking rewards applied to the underlying staked ETH (and vice versa) on decentralized exchanges even though the actual ETH stays staked on the consensus layer. This means swaps back and forth from a yield-bearing staked-ETH product and "raw ETH" is quick, easy and not only available in multiples of 32 ETH.

However, these staked-ETH tokens tend to create cartel-like behaviors where a large amount of staked ETH ends up under the control of a few centralized organizations rather than spread across many independent individuals. This creates conditions for censorship or value extraction. The gold standard for staking should always be individuals running validators on their own hardware whenever possible.

[More on risks of staking tokens](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Attribute indicators are used below to signal notable strengths or weaknesses a listed staking pool may have. Use this section as a reference for how we define these attributes while you're choosing a pool to join.

<StakingConsiderations page="pools" />

## Explore staking pools {#explore-staking-pools}

There are a variety of options available to help you with your setup. Use the above indicators to help guide you through the tools below.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Please note the importance of choosing a service that takes [client diversity](/developers/docs/nodes-and-clients/client-diversity/) seriously, as it improves the security of the network, and limits your risk. Services that have evidence of limiting majority client use are indicated with <em style={{ textTransform: "uppercase" }}>"execution client diversity"</em> and <em style={{ textTransform: "uppercase" }}>"consensus client diversity."</em>

Have a suggestion for a staking tool we missed? Check out our [product listing policy](/contributing/adding-staking-products/) to see if it would be a good fit, and to submit it for review.

## Frequently asked questions {#faq}

<ExpandableCard title="How do I earn rewards?">
Typically ERC-20 staking tokens are issued to stakers and represent the value of their staked ETH plus rewards. Keep in mind that different pools will distribute staking rewards to their users via slightly different methods, but this is the common theme.
</ExpandableCard>

<ExpandableCard title="When can I withdraw my stake?">
Right now! The Shanghai/Capella network upgrade occurred in April 2023, and introduced staking withdrawals. Validator accounts that back staking pools now have the ability to exit and withdraw ETH to their designated withdrawal address. This enables the ability to redeem your portion of stake for the underlying ETH. Check with your provider to see how they support this functionality.

Alternatively, pools that utilize an ERC-20 staking token allow users to trade this token in the open market, allowing you to sell your staking position, effectively "withdrawing" without actually removing ETH from the staking contract.

<ButtonLink href="/staking/withdrawals/">More on staking withdrawals</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Is this different from staking with my exchange?">
There are many similarities between these pooled staking options and centralized exchanges, such as the ability to stake small amounts of ETH and have them bundled together to activate validators.

Unlike centralized exchanges, many other pooled staking options utilize smart contracts and/or staking tokens, which are usually ERC-20 tokens that can be held in your own wallet, and bought or sold just like any other token. This offers a layer of sovereignty and security by giving you control over your tokens, but still does not give you direct control over the validator client attesting on your behalf in the background.

Some pooling options are more decentralized than others when it comes to the nodes that back them. To promote the health and decentralization of the network, stakers are always encouraged to select a pooling service that enables a permissionless decentralized set of node operators.
</ExpandableCard>

## Further reading {#further-reading}

- [The Ethereum Staking Directory](https://www.staking.directory/) - _Eridian and Spacesider_
- [Staking with Rocket Pool - Staking Overview](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool docs_
- [Staking Ethereum With Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido help docs_
