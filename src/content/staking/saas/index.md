---
title: Staking as a service
description: An overview of how to get started with pooled ETH staking
lang: en
template: staking
emoji: ":money_with_wings:"
sidebar: true
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

The Ethereum protocol does not natively support delegation of stake, so these services have been built out to fill this demand. If you have 32 ETH to stake, but don't feel comfortable dealing with hardware, SaaS services allow you to delegate the hard part, while you earn native block rewards.

<CardGrid>
  <Card title="Your own validator" emoji=":desktop_computer:">
    Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate.
  </Card>
  <Card title="Easy to start" emoji="🏁">
    Forget about hardware specs, setup, node maintenance and upgrades.
    SaaS providers let you to outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost.
  </Card>
  <Card title="Limit your risk" emoji=":shield:">
    In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different than the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker.
  </Card>
</CardGrid>

<StakingComparison page="saas" />

## What to consider {#what-to-consider}

There are a growing number of staking-as-a-service providers to help you stake your ETH, but each come with different risks and benefits.

Attribute indicators are used below to signal notable strengths or weaknesses a listed SaaS provider may have. Use this section as a reference for how we define these attributes while you're choosing a service to help with your staking journey.

<StakingConsiderations page="saas" />

## Explore staking service providers {#saas-providers}

Below are some available SaaS provider. Use the above indicators to help guide you through these services

<Emoji text="⚠️" mr="1rem" /> Please note the importance of supporting <a href="/client-diversity">client diversity</a> as it improves the security of the network, and limits your risk. Services that have evidence of limiting majority client use are marked as "diverse clients."

<StakingProductsCardGrid category="saas" />

**Key Generators**

<StakingProductsCardGrid category="keyGen" />

Have a suggestion for a staking-as-a-service provider we missed? Check out our [product listing policy](/contributing/adding-staking-product) to see if it would be a good fit, and to submit it for review.

## FAQs of staking services {#faqs}

- Who holds the keys?
- When can I withdraw?
<!-- TODO: Fill out FAQ -->
