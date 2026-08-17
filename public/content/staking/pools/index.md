---
title: Liquid & pooled staking
description: An overview of liquid and pooled staking on Ethereum
lang: en
template: staking
image: /images/staking/leslie-pool.png
sidebarDepth: 2
summaryPoints:
  - Stake and earn rewards with any amount of ETH by joining forces with others
  - Skip the hard part and entrust validator operation to a third-party
  - Hold liquid staking tokens in your own wallet
---

## What are staking pools? {#what-are-staking-pools}

Staking pools are a collaborative approach to allow many people with smaller amounts of ETH to obtain the 32 ETH minimum required to activate a validator on [Ethereum](/). Pooling functionality is not natively supported within the protocol, so solutions were built out separately to address the need for participating with smaller amounts.

Some staking pools operate using smart contracts, where funds are deposited to a contract that manages and tracks your stake, and issues you a receipt token (liquid staking token) that represents this value. Other pools may not involve smart contracts and are instead mediated offchain.

Pooled options differ enormously in how much you can verify about them. Transparent, protocol-governed pools are open-source smart contracts on Ethereum that hold deposits, publish their node operator sets, and issue a redeemable token; everything backing your position is visible onchain. Opaque pooled products, such as some centralized exchange yield programs, take your ETH into custody, and you cannot independently verify what is staked on your behalf, if anything. Most of this page covers the first kind; see [opaque pooled products](#opaque-pooled-products) for how to tell the difference.

Every pooled option solves the real access problem of staking with less than 32 ETH, or without running hardware. But each also puts an intermediary between the staker and core Ethereum protocol. Only [solo staking](/staking/solo/) gives you a direct, unmediated relationship with Ethereum.

## Why stake with a pool? {#why-stake-with-a-pool}

In addition to the benefits of [participating in staking](/staking/), staking with a pool comes with a number of unique benefits.

<Grid>
  <Card title="Low barrier to entry" icon={<Fish />} description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="Stake today" icon={<Clock />} description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="Liquid staking tokens" icon={<Droplets />} description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g., as collateral in DeFi applications." />
</Grid>

## Comparison of staking options {#comparison-of-staking-options}

<StakingComparison page="pools" />

## Liquid staking tokens {#liquid-staking-tokens}

Most transparent staking pools issue a **liquid staking token (LST)**, an ERC-20 token that represents a claim on staked ETH and the rewards it earns. When you deposit ETH, the protocol stakes it with its node operators and mints a receipt token (LST) to your wallet. You can hold the token yourself or custody it with a third-party provider, and can transfer or sell the token at any time. The underlying ETH stays staked on the consensus layer. Liquid staking protocols account for around a third of all staked ETH, making LSTs one of the most common ways to stake today.

### How rewards show up in the token {#how-rewards-show-up-in-the-token}

LSTs reflect staking rewards in one of two ways:

- **Rebasing tokens** (such as Lido's stETH): your token balance increases as rewards accrue, so one token stays roughly equal in value to one ETH.
- **Exchange-rate tokens** (such as Rocket Pool's rETH): your token balance stays the same, but each token becomes redeemable for a growing amount of ETH over time.

Both designs deliver rewards net of the staking protocol's fee. Neither is inherently better, but they behave differently in wallets and DeFi applications, and are treated differently for tax purposes in some jurisdictions. Rebasing tokens often have "wrapped" non-rebasing versions for compatibility with [DeFi](/glossary/#defi) applications.

### Redeeming and trading {#redeeming-and-trading}

There are two ways to exit an LST position:

- **Redeem through the protocol** for the underlying ETH. Redemption depends on the protocol having liquidity available, either a buffer of unstaked ETH or validators exiting through the consensus layer exit queue, which can take time.
- **Sell on secondary markets** at any time. Because the token trades freely, its market price can deviate from the value of the ETH backing it, particularly during periods of market stress.

Since the Pectra upgrade, [execution layer triggered withdrawals (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) allow validator exits to be triggered directly from the execution layer by the withdrawal address holder. Staking protocols can use this feature to ensure their validators can be exited without relying on node operators to cooperate, so redemptions rely less on trusting node operators than they used to.

### Holding an LST is not the same as staking {#holding-an-lst-is-not-the-same-as-staking}

The Ethereum protocol pays rewards to validators; it doesn't know your token exists. When you hold an LST, you are not a staker from the protocol's point of view. Instead, you hold a claim on a service or smart contract that stakes on your behalf. This works well in normal conditions, but it comes with additional trust dependencies. Your staked ETH depends on the pool's contracts, governance, and operators working correctly, not just on Ethereum itself.

## Risks of liquid staking tokens {#risks-of-liquid-staking-tokens}

LSTs inherit the underlying risks of staking (such as slashing and downtime penalties on the pool's validators) and add layers of their own:

- **Smart contract risk** - your ETH is held by contracts that could contain bugs or be exploited. Favor protocols with open-source, audited, battle-tested code.
- **Market and liquidity risk** - the token's secondary-market price can fall below the value of the ETH backing it ("depegging"). If protocol redemptions are slow or congested when you want out, selling at a discount may be your only fast exit.
- **Governance and upgrade risk** - fees, node operator sets, and even how the token works can be changed through the protocol's governance and contract upgrades. As a token holder you typically have no vote in that governance.
- **Operator-set centralization** - some pools concentrate stake with their chosen node operators. Large amounts of staked ETH under the control of a few organizations create conditions for censorship, value extraction, and single points of failure. Prefer pools with permissionless, distributed operator sets.
- **Slashing pass-through** - if the pool's validators are slashed or penalized, the loss is typically socialized across all token holders according to the protocol's rules.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
Many pools reduce operator risk using **distributed validator technology (DVT)**, middleware that splits a validator's key across multiple machines and operators so no single failure or compromise takes the validator down. [More on distributed validator technology](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Opaque pooled products {#opaque-pooled-products}

Not everything marketed as "staking" is protocol staking. Centralized exchange "earn" or "rewards" programs, and some yield products built on top of staking tokens, pool customer ETH in ways you cannot inspect:

- **Custodial** - the provider holds the withdrawal keys and the ETH.
- **Terms can change** - rates, lockups, and eligibility are set by company policy and can be revised at any time, unlike rules enforced by onchain contracts.
- **May not be staking at all** - under the hood, the yield may come from lending, trading, or other activities rather than validators. You usually have no way to verify.
- **Counterparty risk** - if the provider becomes insolvent or freezes withdrawals, there is nothing onchain for you to redeem.

To tell a transparent pool from an opaque product, ask:

1. Can you verify onchain where your ETH goes, in open-source, audited contracts?
2. Is the node operator set published?
3. Do you receive a token held in your own wallet that is redeemable for the underlying ETH?
4. Are the rules enforced by smart contracts and public governance, or by a company's terms of service?

The more of these questions a provider can only answer with "trust us," the more opaque the product.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
Some products advertise "enhanced" or "boosted" yield by combining staking with **restaking**, a use case for LSTs that commits staked ETH to secure additional protocols under additional slashing conditions. Restaking is a separate risk category and novel application built on top of LSTs, not a form of direct staking participation. If a yield figure is meaningfully higher than the core network staking rate, you should ask exactly where the extra yield comes from. [What is restaking?](/restaking/)
</AlertDescription>
</AlertContent>
</Alert>

## Run a node for a pool {#run-a-node-for-a-pool}

Becoming a bonded node operator for a staking pool is a middle path between holding a token and solo staking. Some staking protocols let individuals run validators using pooled ETH from other users. You post a bond of your own ETH as collateral, run the hardware and keys, and earn a commission on the stake matched to you.

For example, Rocket Pool megapool validators require a 4 ETH bond per validator, and Lido's Community Staking Module requires around 2.4 ETH for a first validator key (1.5 ETH for Identified Community Stakers). This offers people with less than 32 ETH a way to run their own hardware and strengthen the network's operator set, while accepting the pool's rules, performance requirements, and penalty conditions.

## What to consider {#what-to-consider}

Each pool and the tools or smart contracts they use have been built out by different teams, and each comes with benefits and risks. Pooled or delegated staking is not natively supported by the Ethereum protocol, and the gold standard for staking should always be individuals running validators on their own hardware whenever possible.

Attribute indicators are used below to signal notable strengths or weaknesses a listed staking pool may have. Use this section as a reference for how we define these attributes while you're choosing a pool to join.

<StakingConsiderations page="pools" />

## Explore staking pools {#explore-staking-pools}

There are a variety of options available to help you with your setup. Use the above indicators to help guide you through the tools below.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Please note the importance of choosing a service that takes [client diversity](/developers/docs/nodes-and-clients/client-diversity/) seriously, as it improves the security of the network, and limits your risk. Services that have evidence of limiting majority client use are indicated with <em style={{ textTransform: "uppercase" }}>"execution client diversity"</em> and <em style={{ textTransform: "uppercase" }}>"consensus client diversity."</em>

Have a suggestion for a staking tool we missed? Check out our [product listing policy](/contributing/adding-staking-products/) to see if it would be a good fit, and to submit it for review.

<StakingCommunityCallout className="my-16" />

## Frequently asked questions {#faq}

<ExpandableCard title="How do I earn rewards?">
Typically ERC-20 liquid staking tokens are issued to stakers and represent the value of their staked ETH plus rewards. Rewards reach you in one of two ways depending on the token design: rebasing tokens increase your token balance as rewards accrue, while exchange-rate tokens keep your balance fixed and become redeemable for more ETH over time. Either way, rewards are distributed net of the pool's fee.
</ExpandableCard>

<ExpandableCard title="When can I withdraw my stake?">
Staking withdrawals have been enabled since the Shanghai/Capella upgrade in April 2023. Validator accounts that back staking pools can exit and withdraw ETH to their designated withdrawal address, which lets you redeem your portion of stake for the underlying ETH. Redemption speed depends on your pool's available liquidity and the consensus layer exit queue. Check with your provider to see how they support this functionality.

Since the Pectra upgrade, pools can also use execution layer triggered withdrawals (EIP-7002) to exit validators directly from the withdrawal address, without relying on node operators' signing keys, reducing the trust required for redemptions to be honored.

Alternatively, pools that utilize an ERC-20 liquid staking token allow users to trade this token in the open market, allowing you to sell your staking position, effectively "withdrawing" without actually removing ETH from the staking contract. Note that the market price can differ from the token's redemption value.

<ButtonLink href="/staking/withdrawals/">More on staking withdrawals</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Is this different from staking with my exchange?">
There are many similarities between these pooled staking options and centralized exchanges, such as the ability to stake small amounts of ETH and have them bundled together to activate validators.

Unlike centralized exchanges, many other pooled staking options utilize smart contracts and/or liquid staking tokens, which are usually ERC-20 tokens that can be held in your own wallet, and bought or sold just like any other token. This offers a layer of sovereignty and security by giving you control over your tokens, but still does not give you direct control over the validator client attesting on your behalf in the background.

Exchange "earn" programs are also custodial and governed by company terms rather than onchain rules, and their yield may not come from protocol staking at all. See [opaque pooled products](#opaque-pooled-products) for how to tell the difference.

Some pooling options are more decentralized than others when it comes to the nodes that back them. To promote the health and decentralization of the network, stakers are always encouraged to select a pooling service that enables a permissionless decentralized set of node operators.
</ExpandableCard>

## Further reading {#further-reading}

- [The Ethereum Staking Directory](https://www.staking.directory/) - _Eridian and Spacesider_
- [The risks of liquid staking derivatives](https://notes.ethereum.org/@djrtwo/risks-of-lsd) - _Danny Ryan_
- [What Is Liquid Staking?](https://chain.link/education-hub/liquid-staking) - _Chainlink_
- [EIP-7002: Execution layer triggerable withdrawals](https://eips.ethereum.org/EIPS/eip-7002) - _Ethereum Improvement Proposals_
- [Ethereum Staking Pool Ratings](https://explorer.rated.network/) - _Rated Network Explorer_
- [What's the difference between a liquid restaking token (LRT) and a liquid staking token (LST)?](https://liquidcollective.io/lst-vs-lrt/) - _Liquid Collective_
