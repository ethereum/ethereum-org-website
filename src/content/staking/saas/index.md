---
title: Staking as a service
description: An overview of how to get started with pooled ETH staking
lang: en
template: staking
emoji: ":money_with_wings:"
image: ../../../assets/staking/leslie-saas.png
alt: Leslie the rhino floating in the clouds.
sidebarDepth: 2
summaryPoints:
  - Third-party node operators handle the operation of your validator client
  - Great option for anyone with 32 ETH who doesn't feel comfortable dealing with the technical complexity of running a node
  - Reduce trust, and maintain custody of your withdrawal keys
---

## What is staking as a service? {#what-is-staking-as-a-service}

Staking as a service (“SaaS") represents a category of staking services where you deposit your own 32 ETH for a validator, but delegate node operations to a third-party operator. This process usually involves being guided through the initial setup, including key generation and deposit, then uploading your signing keys to the operator. This allows the service to operate your validator on your behalf, usually for a monthly fee.

## Why stake with a service? {#why-stake-with-a-service}

The Ethereum protocol does not natively support delegation of stake, so these services have been built out to fill this demand. If you have 32 ETH to stake, but don't feel comfortable dealing with hardware, SaaS services allow you to delegate the hard part while you earn native block rewards.

<CardGrid>
  <Card title="Your own validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />    
  <Card title="Easy to start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you to outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limit your risk" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different than the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## What to consider {#what-to-consider}

There are a growing number of SaaS providers to help you stake your ETH, but each comes with different benefits and risks. You should consider that all SaaS options require additional trust assumptions compared to home-staking. Saas options may have additional code wrapping the Ethereum clients that is not open or auditable. SaaS also has a detrimental effect on network decentralization. Depending on the setup, you may not control your validator - the operator could act dishonestly using your ETH.

Attribute indicators are used below to signal notable strengths or weaknesses a listed SaaS provider may have. Use this section as a reference for how we define these attributes while you're choosing a service to help with your staking journey.

<StakingConsiderations page="saas" />

## Explore staking service providers {#saas-providers}

Below are some available SaaS provider. Use the above indicators to help guide you through these services

<InfoBanner emoji="⚠️" isWarning>
Please note the importance of supporting <a href="/developers/docs/nodes-and-clients/client-diversity/">client diversity</a> as it improves the security of the network, and limits your risk. Services that have evidence of limiting majority client use are marked as <em style="text-transform: uppercase;">"diverse clients."</em>
</InfoBanner>

#### SaaS providers

<StakingProductsCardGrid category="saas" />

#### Key Generators

<StakingProductsCardGrid category="keyGen" />

Have a suggestion for a staking-as-a-service provider we missed? Check out our [product listing policy](/contributing/adding-staking-products/) to see if it would be a good fit, and to submit it for review.

## FAQ {#faq}

<ExpandableCard title="Who holds my keys?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
  Arrangements will differ from provider-to-provider, but commonly you will be guided through setting up any signing keys you need (one per 32 ETH), and uploading these to your provider to allow them to validate on your behalf. The signing keys alone do not give any ability to withdraw, transfer or spend your funds. However, they do provide the ability to cast votes towards consensus, which if not done properly can result in offline penalties or slashing.
</ExpandableCard>

<ExpandableCard title="So there are two sets of keys?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Yes. Each account is comprised of both <em>signing</em> keys, and <em>withdrawal</em> keys. In order for a validator to attest to the state of the chain, participate in sync committees and propose blocks, the signing keys must be readily accessible by a validator client. These must be connected to the internet in some form, and are thus inherently considered to be "hot" keys. This is a requirement for your validator to be able to attest, and thus the keys used to transfer or withdraw funds are separated for security reasons.

All of these keys can always be regenerated in a reproducible manner using your 24-word mnemonic seed phrase. <em>Make certain you back this seed phrase up safely or you will be unable to generate your withdraw keys when the time comes</em>.
</ExpandableCard>

<ExpandableCard title="When can I withdraw?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
  When you stake 32 ETH with a SaaS provider, that ETH is still deposited to the official staking deposit contract. As such, SaaS stakers are currently limited by the same withdrawal restrictions as solo stakers. This means that staking your ETH is currently a one-way deposit. This will be the case until the Shanghai upgrade.
</ExpandableCard>

<ExpandableCard title="What happens if I get slashed?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
By using an SaaS provider, you are entrusting the operation of your node to someone else. This comes with the risk of poor node performance, which is not in your control. In the event your validator is slashed, your validator balance will be penalized and forcibly removed from the validator pool. These funds will be locked until withdrawals are enabled at the protocol level.

Contact individual SaaS provider for more details on any guarantees or insurance options. If you'd prefer to be in full control of your validator setup, <a href="/staking/solo/">learn more about how to solo stake your ETH</a>.
</ExpandableCard>

## Further reading {#further-reading}

- [Evaluating Staking Services](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
