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
---

## What is solo staking?

Solo staking is the act of running an Ethereum node connected to the internet and depositing 32 ETH to activate a [validator](#what-is-a-validator), giving you the ability to participate directly in network consensus.

Running an Ethereum node consists of running both an execution layer (EL) client, as well as a consensus layer (CL) client. These clients are software that work together, along with a valid set of signing keys, to verify transactions and blocks, attest to the correct head of the chain, aggregate attestations, and propose blocks.

Solo stakers are responsible for operating the hardware needed to run these clients. It is highly recommended to use a dedicated machine for this that you operate from home – this is extremely beneficial to the health of the network.

A solo staker receives rewards directly from the protocol for simply being online and properly fulfilling tasks assigned to it when needed. Note, the user just needs to keep the node powered and online with clients running; the client software will do the rest.

Being offline results in small penalties roughly in the amount of what you would have earned in that same amount of time. Slashing is a more serious penalty reserved for malicious behavior, which results in losing at least 0.5 ETH and ejection from the network.

## What is a validator? {#what-is-a-validator}

A _validator_ is a virtual entity that lives on the Beacon Chain, represented by a balance, public key, and other properties. A _validator client_ is the software that acts on behalf of the validator by holding and using its private key. A single validator client can hold many key pairs, controlling many validators.

Each key-pair associated with a validator requires 32 ETH to be activated. More ETH deposited to a single set of keys does not increase rewards potential, as each validator is limited to an [effective balance]() of 32 ETH. This means that staking is done in 32 ETH increments, each with it's own set of keys and balance.

Do not deposit more than 32 ETH for a single validator. It will be locked until the planned Shanghai update.

## What is solo staking?

Solo staking provides you with maximum power as well as maximum responsibility. Here's a few things to consider when deciding if you'd like to solo stake vs. using a staking service or joining a staking pool.

<Card title="Full control">
  Solo staking allows you to completely customize your staking setup. You can configure your hardware, your software clients, your monitoring setup, choose which upgrades you support, etc. Unlike pool services that often make this decisions for you.
</Card>
<Card title="Network security">
  Solo staking is the most impactful way to stake. By running a validator on your own hardware, you help ensure the Ethereum protocol remains robust, decentralized, and secure.
</Card>
<Card title="Maximum rewards">
  You'll earn full rewards from the Ethereum protocol when you solo stake, unlike staking pools or staking services that all extract a fee..
</Card>

## ✋ Gerneral requirements regarding solo staking

As much as we wish that solo staking was accessible and risk free to everyone, this is not reality. There are some practical and serious considerations to keep in mind before choosing to solo stake your ETH.

If you think you’d be more comfortable with a less technical option, check out some of the [pooled staking services](/staking/pools/) that exist, or keep ready to get started with solo staking.

- Comfortable with computers: <!-- TODO: Quick explanation -->
- Secure key management: <!-- TODO: Quick explanation -->
- Unable to withdraw (for now): <!-- TODO: Quick explanation -->
- Maintenance: <!-- TODO: Quick explanation -->
- Reliable Uptime: <!-- TODO: Quick explanation -->

## How it works

1. Get some hardware: You need to run a node to stake. [Learn more](/run-a-node/)
2. Sync an execution layer (EL) client
3. Sync a consensus layer (CL) client
4. Generate your keys: Load them into your validator client
5. Monitor and maintain your node

If ever desired, you can exit as a validator which eliminates the requirement to be online, and stops any further rewards. Be aware that until the planned Shanghai upgrade _withdrawing_ those funds will not be possible.

After Shanghai, users will be able to withdraw their rewards as well as their stake if they choose.

## Get started on the Staking Launchpad

The Staking Launchpad is an open source application that will help you become a validator. It walks you through a preparation checklist, how to choose clients, generate your keys and assists with depositing your ETH to the staking deposit contract.

<LaunchpadWidget>
  
  Choose network
    - **Testnet**
    - Mainnet

Solo validators are expected to **test their setup** and operational skills on the prater testnet before risking funds.

If you're comfortable with it, you can set up everything needed from the command line using the Staking Launchpad alone.

To make things easier, check out some of the tools and guides below that can help you alongside the Staking Launchpad to get your clients set up with ease.

It is important to choose a [minority client](/client-diversity) as it improves the security of the network, and limits your risk.

If you need help along the way, check out some of the solo staking tools or guides below.

<ButtonLink to="https://prater.launchpad.ethereum.org">Start staking</ButtonLink>
<ButtonLink scrollTo="#tools">Software tools and guide</ButtonLink>

</LaunchpadWidget>

## What to consider with node and client setup tools

There are a growing number of tools and services to help you solo stake your ETH, but each come with different risks and benefits.

Attribute indicators are used below to signal notable strengths or weaknesses a listed staking tool may have. Use this section as a reference for how we define these attribute while you’re choosing what tools to help with your staking journey.

<!-- Card grid: -->

- **Open source**: Essential code is 100% open source and available to the public to fork and use
- **Audited**: Essential code has undergone formal auditing with results published and available publicly
- **Bug bounty**: A public bug bounty has been performed on any essential code to rewards users for safely reporting and/or fixing vulnerabilities
  - ✅ Currently active
- **Battle tested**: Software has been available and used by the public for a period of time
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

## 🛠 Explore node and client setup tools

Variety options are available to choose from. Please be aware tha it is also important to choose a [minority client](/client-diversity) as it improves the security of the network.

<CardGrid>
  {stakingProducts.nodeTools.map(tool => <Card tool={tool} />)}
</CardGrid>

Have a suggestion for a staking tool we missed? Check out our [product listing policy](/contributing/adding-staking-product/) to see if it would be a good fit, and to submit it for review.

## 📖 Explore solo staking guides

- **CoinCashew's Ethereum 2.0 Guide** - Linux (CLI)
- **Somer Esat** - Linux (CLI)
- **Rocket Pool Node Operators** - Linux, macOS (CLI)

## Things to know

These are some of the most common questions about solo staking on Ethereum.

<!-- TODO: Edit and fill this out, and reevaluate placement on page -->

- What do I need to know before solo staking?
  <!-- TODO: Answer -->
- Initial setup: Internet and hardware requirements
  <!-- TODO: Answer -->
- Choosing the right client
  <!-- TODO: Answer -->
- Summary of penalties
  <!-- TODO: Answer -->
- Changes after the merge
  <!-- TODO: Answer -->

If solo staking seems too demanding you you, consider using a [staking-as-a-service](/staking/saas/) provider, or if you're working with <32 ETH, check out the [staking pools](/staking/pools/).

<FeedbackCard prompt="Was this page helpful?" />
