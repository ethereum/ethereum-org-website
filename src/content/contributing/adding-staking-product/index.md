---
title: Adding staking products or services
description: The policy we use when adding a staking products or services to ethereum.org
lang: en
sidebar: true
---

# Adding staking products or services {#adding-staking-products-or-services}

We want to make sure we list the best resources possible while keeping users safe and confident.

Anyone is free to suggest adding a staking products or service on ethereum.org. If there's one that we have missed, **please suggest it!**

We currently list staking products and services on the following pages:

- [Solo staking](/staking/solo/)
- [Staking-as-a-service](/staking/saas/)
- [Staking pools](/staking/pools/)

Proof-of-stake on the Beacon Chain has been live since December 1, 2020. While it's relatively new, we've tried to create a fair framework for consideration on ethereum.org but the listing criteria will change and evolve over time.

## Information we require {#information-we-require}

Staking products or services submissions will be assessed by the following criteria:

**What category of product or service is it?**

- Node or client tooling
- Key management
- Staking as a service
- Staking pool
- Other

**When was the project or service launched?**

- Is there evidence of when the product or service became available to the public?

**Is the project or service being actively maintained?**

- Is there an active team developing the project?
- Who is involved?

**Is the product or service free of trusted/human intermediaries?**

- What steps in the users journey require trusting humans to either hold the keys to their funds, or to properly distribute rewards?

**What platforms are supported?**

- ie. Linux, macOS, Windows, iOS, Android

**What user interfaces are supported?**

- ie. Browser app, desktop app, mobile app, CLI app

**What wallets support the product or service?**

- What wallets directly support the product or service?

**Social media links**

- List available social media links. ie. Discord, Twitter, Telegram, Reddit

### Software and smart contracts {#software-and-smart-contracts}

For any custom software or smart contracts involved:

**Is everything open source?**

- Open source projects should have a publicly available source code repository

**Is the product out of _beta_ development?**

- Where is the product at in its development cycle?

**Has the software undergone an external security audit?**

- If not, are there plans to conduct an external audit?

**Has the software undergone any security bug bounties?**

- If not, are there plans to conduct a security bug bounty?

### Node or client tooling {#node-or-client-tooling}

For software products related to node or client setup, management or migration:

**Which CL clients (ie. Lighthouse, Teku, Nimbus, Prysm) are supported?**

- Which clients are supported?

**Does the software provide an easy way to switch between clients?**

- Can the user easily and safely change clients without too much difficulty using the tool?

### Staking as a service {#staking-as-a-service}

For staking-as-a-service listings (ie. delegated node operation):

**What are the fees associated with using the service?**

- Is there a monthly fee for the service?
- Any additional staking requirements?

**Are users required to sign-up for an account?**

- Can someone use the service without permission or KYC?

**Who holds the signing keys, and withdrawal keys?**

- What keys does the user maintain access to? What keys does the service gain access to?

### Staking pool {#staking-pool}

For pooled staking services:

**What is the minimum ETH required to stake?**

**What are the fees or staking requirements involved?**

- What percentage of rewards are removed as fees?
- Any additional staking requirements?

**Is there a liquidity token?**

- What are the tokens involved?
- How do they work?

**Can users participate as a node operator without permission?**

- What is required to run validator clients using the pooled funds?
- Does this require permission from an individual, company or DAO?

**What percent of node operators are running a supermajority CL client?**

- As of last edit, Prysm is the CL client being run by a supermajority of node operators, which is dangerous for the network. If the network currently has a supermajority CL client, we request data related to its usage.

## Add your product or service {#add-product}

If you want to add a staking product or service to ethereum.org, create an issue on GitHub.

<ButtonLink to="https://github.com/ethereum/ethereum-org-website/issues/new?&template=suggest_staking_product.md">
  Create an issue
</ButtonLink>
