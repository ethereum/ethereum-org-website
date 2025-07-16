---
title: Adding staking products or services
description: The policy we use when adding a staking products or services to ethereum.org
lang: en
---

# Adding staking products or services {#adding-staking-products-or-services}

We want to make sure we list the best resources possible while keeping users safe and confident.

Anyone is free to suggest adding a staking products or service on ethereum.org. If there's one that we have missed, **[please suggest it](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

We currently list staking products and services on the following pages:

- [Solo staking](/staking/solo/)
- [Staking as a service](/staking/saas/)
- [Staking pools](/staking/pools/)

Proof-of-stake on the Beacon Chain has been live since December 1, 2020. While staking is still relatively new, we've tried to create a fair and transparent framework for consideration on ethereum.org but the listing criteria will change and evolve over time, and is ultimately at the discretion of the ethereum.org website team.

## The decision framework {#the-decision-framework}

The decision to list a product on ethereum.org is not dependent on any one factor. Multiple criteria are considered together when deciding to list a product or service. The more of these criteria are met, the more likely it is to be listed.

**First, which category of product or service is it?**

- Node or client tooling
- Key management
- Staking as a service (SaaS)
- Staking pool

Currently, we are only listing products or services in these categories.

### Criteria for inclusion {#criteria-for-inclusion}

Staking products or services submissions will be assessed by the following criteria:

**When was the project or service launched?**

- Is there evidence of when the product or service became available to the public?
- This is used to determine the products "battle tested" score.

**Is the project being actively maintained?**

- Is there an active team developing the project? Who is involved?
- Only actively maintained products will be considered.

**Is the product or service free of trusted/human intermediaries?**

- What steps in the users journey require trusting humans to either hold the keys to their funds, or to properly distribute rewards?
- This is used to determine the product or services "trustless" score.

**Does the project provide accurate and reliable information?**

- It is crucial that the product's website features up-to-date, accurate, and non-misleading information, particularly if it pertains to the Ethereum protocol or other related technologies.
- Submissions containing misinformation, outdated details, or potentially misleading statements about Ethereum or other relevant subjects will not be listed or will be removed if already listed.

**What platforms are supported?**

- i.e. Linux, macOS, Windows, iOS, Android

#### Software and smart contracts {#software-and-smart-contracts}

For any custom software or smart contracts involved:

**Is everything open source?**

- Open source projects should have a publicly available source code repository
- This is used to determine the products "open source" score.

**Is the product out of _beta_ development?**

- Where is the product at in its development cycle?
- Products in the beta stage are not considered for inclusion on ethereum.org

**Has the software undergone an external security audit?**

- If not, are there plans to conduct an external audit?
- This is used to determine the products "audited" score.

**Does the project have a bug bounty program?**

- If not, are there plans to create a security bug bounty?
- This is used to determine the products "bug bounty" score.

#### Node or client tooling {#node-or-client-tooling}

For software products related to node or client setup, management or migration:

**Which consensus layer clients (i.e. Lighthouse, Teku, Nimbus, Prysm, Grandine) are supported?**

- Which clients are supported? Can the user choose?
- This is used to determine the products "multi-client" score.

#### Staking as a service {#staking-as-a-service}

For [staking-as-a-service listings](/staking/saas/) (i.e. delegated node operation):

**What are the fees associated with using the service?**

- What is the fee structure, e.g. is there a monthly fee for the service?
- Any additional staking requirements?

**Are users required to sign-up for an account?**

- Can someone use the service without permission or KYC?
- This is used to determine the products "permissionless" score.

**Who holds the signing keys, and withdrawal keys?**

- What keys does the user maintain access to? What keys does the service gain access to?
- This is used to determine the products "trustless" score.

**What is the client diversity of the nodes being operated?**

- What percent of validator keys are being run by a majority consensus layer (CL) client?
- As of last edit, Prysm is the consensus layer client being run by a majority of node operators, which is dangerous for the network. If any CL client is currently being used by over 33% of the network, we request data related to its usage.
- This is used to determine the products "diverse clients" score.

#### Staking pool {#staking-pool}

For [pooled staking services](/staking/pools/):

**What is the minimum ETH required to stake?**

- e.g. 0.01 ETH

**What are the fees or staking requirements involved?**

- What percentage of rewards are removed as fees?
- Any additional staking requirements?

**Is there a liquidity token?**

- What are the tokens involved? How do they work? What are the contract addresses?
- This is used to determine the products "liquidity token" score.

**Can users participate as a node operator?**

- What is required to run validator clients using the pooled funds?
- Does this require permission from an individual, company or DAO?
- This is used to determine the products "permissionless nodes" score.

**What is the client diversity of the pool node operators?**

- What percent of node operators are running a majority consensus layer (CL) client?
- As of last edit, Prysm is the consensus layer client being run by a majority of node operators, which is dangerous for the network. If any CL client is currently being used by over 33% of the network, we request data related to its usage.
- This is used to determine the products "diverse clients" score.

### Other criteria: the nice-to-haves {#other-criteria}

**What user interfaces are supported?**

- i.e. Browser app, desktop app, mobile app, CLI

**For node tooling, does the software provide an easy way to switch between clients?**

- Can the user easily and safely change clients using the tool?

**For SaaS, how many validators are currently being operated by the service?**

- This gives us an idea of the reach of your service so far.

## How we display results {#product-ordering}

The [criteria for inclusion](#criteria-for-inclusion) above are used to calculate a cumulative score for each product or service. This is used as a means of sorting and showcasing products that meet certain objective criteria. The more criteria that evidence is provided for, the higher a product will be sorted, with ties being randomized on load.

The code logic and weights for these criteria are currently contained in [this JavaScript component](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) in our repo.

## Add your product or service {#add-product}

If you want to add a staking product or service to ethereum.org, create an issue on GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Create an issue
</ButtonLink>
