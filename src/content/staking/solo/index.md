---
title: Solo stake your ETH
description: An overview of how to get started solo staking your ETH
lang: en
template: staking
emoji: ":money_with_wings:"
sidebar: true
image: ../../../assets/staking/leslie-solo.png
alt: Leslie the rhino on her own computer chip.
sidebarDepth: 2
summaryPoints:
  - Solo stakers running home hardware provide the most possible benefit to the health and decentralization of the Ethereum network.
  - Staking at home gives you complete control over the security of your funds.
  - Stakers receive rewards directly from the protocol for keeping their validator properly functioning and online.
---

## What is solo staking? {#what-is-solo-staking}

Solo staking is the act of running an Ethereum node connected to the internet and depositing 32 ETH to activate a [validator](#what-is-a-validator), giving you the ability to participate directly in network consensus.

An Ethereum node consists of both an execution layer (EL) client, as well as a consensus layer (CL) client. These clients are software that work together, along with a valid set of signing keys, to verify transactions and blocks, attest to the correct head of the chain, aggregate attestations, and propose blocks.

Solo stakers are responsible for operating the hardware needed to run these clients. It is highly recommended to use a dedicated machine for this that you operate from home–this is extremely beneficial to the health of the network.

A solo staker receives rewards directly from the protocol for keeping their validator properly functioning and online.

## Why stake solo? {#why-stake-solo}

Solo staking comes with more responsibility, but provides you with maximum control over your funds and staking setup.

<CardGrid>
  <Card title="Earn fresh ETH" emoji="💸">
    Earn ETH denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut.
  </Card>
  <Card title="Full control" emoji="🎛️">
    Keep your own keys, and choose the combination of clients and hardware that allows you to minimize your risk, and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices.
  </Card>
  <Card title="Network security" emoji="🔐">
    Solo staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol.
  </Card>
</CardGrid>

## Considerations before staking solo {#considerations-before-staking-solo}

<!-- TODO: Add slashing link in card below -->

As much as we wish that solo staking was accessible and risk free to everyone, this is not reality. There are some practical and serious considerations to keep in mind before choosing to solo stake your ETH.

<ExpandableCardGrid>
  <ExpandableCard title="Required reading">
    When operating your own node you should spend some time learning how to use the software you've chosen. This should involve reading relevant documentation and being attune to communication channels of those dev teams.
    The more you understand about the software you're running and how proof-of-stake works, the less risky it will be as a staker, and the easier it will be to fix any issues that may arise along the way as a node operator. 
  </ExpandableCard>
  <ExpandableCard title="Comfortable with computers">
    Node setup requires a reasonable comfort level when working with computers, although new tools are making this easier over time. Understanding of the command-line interface is helpful, but no longer strictly required 
    It also requires very basic hardware setup, and some understanding of minimum recommended specs.
  </ExpandableCard>
  <ExpandableCard title="Secure key management">
    Just like how private keys secure your Ethereum address, you will need to generate keys specifically for your validator. You must understand how to keep any seed phrases or private keys safe and secure.
    <ButtonLink to="/security">Ethereum security and scam prevention</ButtonLink>
  </ExpandableCard>
  <ExpandableCard title="No withdrawing (for now)">
    Withdrawing staked ETH or rewards from a validator balance is not yet supported. Support for withdrawals are planned for the Shanghai upgrade following The Merge. You should anticipate your ETH being locked for at least one-to-two years. After Shanghai, this will no longer be the case, at which point you will be able to freely withdraw portions or all of your stake if you wish.
  </ExpandableCard>
  <ExpandableCard title="Maintenance">
    Hardware occasionally fails, connections error out, and client software occasionally needs upgrading. Node maintenance is inevitable and will occasionally require your attention. You'll want to be sure you stay aware of any anticipated network upgrades, or other critical client upgrades.
  </ExpandableCard>
  <ExpandableCard title="Reliable uptime">
    Your rewards are proportional to the time your validator is online and properly attesting. Downtime incurs penalties roughly equal to what you would have earned in that same amount of time. Being offline while the network is finalizing does not result in slashing.
    Epoch rewards are inversely proportional to how long it takes your attestations to be included, meaning internet bandwidth also matter. This can vary, but a minimum of 10 Mb/s up and down is recommended.
  </ExpandableCard>
  <ExpandableCard title="Slashing risk">
    Different from inactivity penalties for being offline, <em>slashing</em> is a much more serious penalty reserved for malicious offenses. By running a minority client with your keys loaded on only one machine at time, your risk of being slashed is minimized. That being said, all stakers must be aware of the risks of slashing.
    
    <a href="">More on slashing</a>
  </ExpandableCard>
</ExpandableCardGrid>

<StakingComparison page="solo" />

## How it works {#how-it-works}

<HowSoloStakingWorks />

If ever desired, you can exit as a validator which eliminates the requirement to be online, and stops any further rewards. Be aware that until the planned Shanghai upgrade _withdrawing_ those funds will not be possible.

After Shanghai, users will be able to withdraw their rewards as well as their stake if they choose.

## Get started on the Staking Launchpad {#get-started-on-the-staking-launchpad}

The Staking Launchpad is an open source application that will help you become a validator. It walks you through a preparation checklist, how to choose clients, generate your keys and assists with depositing your ETH to the staking deposit contract.

<LaunchpadWidget />

## What to consider with node and client setup tools {#node-tool-considerations}

There are a growing number of tools and services to help you solo stake your ETH, but each come with different risks and benefits.

Attribute indicators are used below to signal notable strengths or weaknesses a listed staking tool may have. Use this section as a reference for how we define these attributes while you’re choosing what tools to help with your staking journey.

<!-- TODO: Create card grid component for these items -->

- **Open source**: Essential code is 100% open source and available to the public to fork and use
- **Audited**: Essential code has undergone formal auditing with results published and available publicly
- **Bug bounty**: A public bug bounty has been performed on any essential code to rewards users for safely reporting and/or fixing vulnerabilities
  - ✅ Currently active
- **Battle tested**: Software has been available and used by the public for the indicated period of time
  - ✅ Live for over one year
  - 🟡 Live for over six months
  - 🛑 Live for less than six months
- **Trustless**: Validator keys are not entrusted to any other human at any time in the validator lifecycle. Any smart contracts involved are free of back doors, without reliance on privileged permissions for execution.
- **Permissionless**: User does not require any special permission to operate a validator using the software or service
- **Multi-client**: Software enables users to pick from and switch between at least two or more CL clients
  - ✅ Easy client switching
  - 🛑 Limits users to a supermajority client
- **Self custody**: User maintains custody of any validator credentials, including signing and withdrawal keys
- **Economical**: Users can operate a validator by staking less than 32 ETH, utilizing pooled funds from others

## 🛠 Explore node and client setup tools {#node-and-client-tools}

There are a variety of options available to help you with your setup. Use the above indicators to help guide you through the tools below.

> Please note the importance of choosing a [minority client](/developers/docs/nodes-and-clients/client-diversity) as it improves the security of the network, and limits your risk. Tools that allow you to setup minority client are denoted as "multi-client."

<StakingProductsCardGrid category="nodeTools" />

**Key Generators**

<StakingProductsCardGrid category="keyGen" />

Have a suggestion for a staking tool we missed? Check out our [product listing policy](/contributing/adding-staking-product) to see if it would be a good fit, and to submit it for review.

## 📖 Explore solo staking guides {#staking-guides}

- **CoinCashew's Ethereum 2.0 Guide** - Linux (CLI)
- **Somer Esat** - Linux (CLI)
- **Rocket Pool Node Operators** - Linux, macOS (CLI)

## Things to know {#things-to-know}

These are a few of the most common questions about staking that are worth knowing about.

**What is a validator?**

A _validator_ is a virtual entity that lives on the Beacon Chain, represented by a balance, public key, and other properties. A _validator client_ is the software that acts on behalf of the validator by holding and using its private key. A single validator client can hold many key pairs, controlling many validators.

Each key-pair associated with a validator requires 32 ETH to be activated. More ETH deposited to a single set of keys does not increase rewards potential, as each validator is limited to an [effective balance]() of 32 ETH. This means that staking is done in 32 ETH increments, each with it's own set of keys and balance.

Do not deposit more than 32 ETH for a single validator. It will be locked until the planned Shanghai update.

If solo staking seems too demanding you you, consider using a [staking-as-a-service](/staking/saas) provider, or if you're working with less than 32 ETH, check out the [staking pools](/staking/pools).

**Is staking already live?**

<!-- TODO: Answer to try and clarify a synopsis of the Beacon Chain and The Merge. -->

**I'm running the Beacon Chain, is that enough?**

<!-- TODO: Answer about how you need to run both clients as of The Merge... content on Figma? -->

**Which client is best?**

Individual clients may vary slightly in terms of performance of user interface, as each are developed by different teams, using a variety of programming languages. That being said, none of them are "the best." All production clients are excellent pieces of software, that all perform the same basic functions to sync and interact with the blockchain.

Since all production clients provide the same basic functionality, it is actually very important that you choose a **minority client**, meaning a client that is NOT currently being used by a majority of validators on the network. This may sound counterintuitive, but running a majority or supermajority client puts you at an increased risk of slashing in the event of a bug in that client. Running a minority client drastically limits these risks.

[Learn more about why client diversity is critical](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)

**Can I just use a VPS (virtual private service)?**

<!-- TODO: Answer about cloud servers being detrimental to centralization of the network. If AWS or DigitalOcean go down, you're penalties will be much larger, and you'll be at an increased risk of slashing. ie: >1/3 the network uses AWS and it goes down or is targetted by regulation... The network would no longer finalize, and you, by using AWS, could be part of the validators set that would be subject to quadratic leaking.-->

**Do I need to do anything before The Merge?**

<!-- TODO: Answer -->
