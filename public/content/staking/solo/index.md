---
title: Home stake your ETH
description: An overview of how to get started home staking your ETH
lang: en
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie the rhino on her own computer chip.
sidebarDepth: 2
summaryPoints:
  - Receive maximum rewards directly from the protocol for keeping your validator properly functioning and online
  - Run home hardware and personally add to the security and decentralization of the Ethereum network
  - Remove trust, and never give up control of the keys to your funds
---

## What is home staking? {#what-is-solo-staking}

Home staking is the act of [running an Ethereum node](/run-a-node/) connected to the internet and depositing 32 ETH to activate a [validator](#faq), giving you the ability to participate directly in network consensus.

**Home staking increases the decentralization of the Ethereum network**, making Ethereum more censorship-resistant and robust against attacks. Other staking methods may not help the network in the same ways. Home staking is the best staking option for securing Ethereum.

An Ethereum node consists of both an execution layer (EL) client, as well as a consensus layer (CL) client. These clients are software that work together, along with a valid set of signing keys, to verify transactions and blocks, attest to the correct head of the chain, aggregate attestations, and propose blocks.

Home stakers are responsible for operating the hardware needed to run these clients. It is highly recommended to use a dedicated machine for this that you operate from home–this is extremely beneficial to the health of the network.

A home staker receives rewards directly from the protocol for keeping their validator properly functioning and online.

## Why stake from home? {#why-stake-solo}

Home staking comes with more responsibility but provides you with maximum control over your funds and staking setup.

<CardGrid>
  <Card title="Earn fresh ETH" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Full control" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Network security" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Considerations before home staking {#considerations-before-staking-solo}

As much as we wish that home staking was accessible and risk free to everyone, this is not reality. There are some practical and serious considerations to keep in mind before choosing to home stake your ETH.

<InfoGrid>
<ExpandableCard title="Required reading" eventCategory="SoloStaking" eventName="clicked required reading">
When operating your own node you should spend some time learning how to use the software you've chosen. This involves reading relevant documentation and being attune to communication channels of those dev teams.

The more you understand about the software you're running and how proof-of-stake works, the less risky it will be as a staker, and the easier it will be to fix any issues that may arise along the way as a node operator.
</ExpandableCard>

<ExpandableCard title="Comfortable with computers" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Node setup requires a reasonable comfort level when working with computers, although new tools are making this easier over time. Understanding of the command-line interface is helpful, but no longer strictly required.

It also requires very basic hardware setup, and some understanding of minimum recommended specs.
</ExpandableCard>

<ExpandableCard title="Secure key management" eventCategory="SoloStaking" eventName="clicked secure key management">
Just like how private keys secure your Ethereum address, you will need to generate keys specifically for your validator. You must understand how to keep any seed phrases or private keys safe and secure.{' '}

<a href="/security/">Ethereum security and scam prevention</a>
</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware occasionally fails, network connections error out, and client software occasionally needs upgrading. Node maintenance is inevitable and will occasionally require your attention. You'll want to be sure you stay aware of any anticipated network upgrades, or other critical client upgrades.
</ExpandableCard>

<ExpandableCard title="Reliable uptime" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Your rewards are proportional to the time your validator is online and properly attesting. Downtime incurs penalties proportional to how many other validators are offline at the same time, but <a href="#faq">does not result in slashing</a>. Bandwidth also matters, as rewards are decreased for attestations that are not received in time. Requirements will vary, but a minimum of 10 Mb/s up and down is recommended.
</ExpandableCard>

<ExpandableCard title="Slashing risk" eventCategory="SoloStaking" eventName="clicked slashing risk">
Different from inactivity penalties for being offline, <em>slashing</em> is a much more serious penalty reserved for malicious offenses. By running a minority client with your keys loaded on only one machine at time, your risk of being slashed is minimized. That being said, all stakers must be aware of the risks of slashing.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> More on slashing and validator lifecycle</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## How it works {#how-it-works}

<StakingHowSoloWorks />

While active you will earn ETH rewards, which will be periodically deposited into your withdrawal address.

If ever desired, you can exit as a validator which eliminates the requirement to be online, and stops any further rewards. Your remaining balance will then be withdrawn to the withdrawal address that you designate during setup.

[More on staking withdrawals](/staking/withdrawals/)

## Get started on the Staking Launchpad {#get-started-on-the-staking-launchpad}

The Staking Launchpad is an open source application that will help you become a staker. It will guide you through choosing your clients, generate your keys and depositing your ETH to the staking deposit contract. A checklist is provided to make sure you've covered everything to get your validator set up safely.

<StakingLaunchpadWidget />

## What to consider with node and client setup tools {#node-tool-considerations}

There are a growing number of tools and services to help you home stake your ETH, but each come with different risks and benefits.

Attribute indicators are used below to signal notable strengths or weaknesses a listed staking tool may have. Use this section as a reference for how we define these attributes while you’re choosing what tools to help with your staking journey.

<StakingConsiderations page="solo" />

## Explore node and client setup tools {#node-and-client-tools}

There are a variety of options available to help you with your setup. Use the above indicators to help guide you through the tools below.

<ProductDisclaimer />

### Node tools

<StakingProductsCardGrid category="nodeTools" />

Please note the importance of choosing a [minority client](/developers/docs/nodes-and-clients/client-diversity/) as it improves the security of the network, and limits your risk. Tools that allow you to setup minority client are denoted as <em style={{ textTransform: "uppercase" }}>"multi-client."</em>

### Key Generators

These tools can be used as an alternative to the [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) to help with key generation.

<StakingProductsCardGrid category="keyGen" />

Have a suggestion for a staking tool we missed? Check out our [product listing policy](/contributing/adding-staking-products/) to see if it would be a good fit, and to submit it for review.

## Explore home staking guides {#staking-guides}

<StakingGuides />

## Frequently asked questions {#faq}

These are a few of the most common questions about staking that are worth knowing about.

<ExpandableCard title="What is a validator?">

A <em>validator</em> is a virtual entity that lives on Ethereum and participates in the consensus of the Ethereum protocol. Validators are represented by a balance, public key, and other properties. A <em>validator client</em> is the software that acts on behalf of the validator by holding and using its private key. A single validator client can hold many key pairs, controlling many validators.

</ExpandableCard>

<ExpandableCard title="Can I deposit more than 32 ETH?">
Each key-pair associated with a validator requires exactly 32 ETH to be activated. More ETH deposited to a single set of keys does not increase rewards potential, as each validator is limited to an <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">effective balance</a> of 32 ETH. This means that staking is done in 32 ETH increments, each with it's own set of keys and balance.

Do not deposit more than 32 ETH for a single validator. It will not increase your rewards. If a withdrawal address has been set for the validator, excess funds over 32 ETH will be automatically withdrawn to this address during the next <a href="/staking/withdrawals/#validator-sweeping">validator sweep</a>.

If home staking seems too demanding for you, consider using a <a href="/staking/saas/">staking-as-a-service</a> provider, or if you're working with less than 32 ETH, check out the <a href="/staking/pools/">staking pools</a>.
</ExpandableCard>

<ExpandableCard title="Will I be slashed if I go offline? (tldr: No.)">
Going offline when the network is finalizing properly will NOT result in slashing. Small <em>inactivity penalties</em> are incurred if your validator is not available to attest for a given epoch (each 6.4 minutes long), but this is very different to <em>slashing</em>. These penalties are slightly less than the reward you would have earned had the validator been available to attest, and losses can be earned back with approximately an equal amount of time back online again.

Note that penalties for inactivity are proportional to how many validators are offline at the same time. In cases where a large portion of the network is all offline at once, the penalties for each of these validators will be greater than when a single validator is unavailable.

In extreme cases if the network stops finalizing as a result of more than a third of the validators being offline, these users will suffer what is known as a <em>quadratic inactivity leak</em>, which is an exponential drain of ETH from offline validator accounts. This enables the network to eventually self-heal by burning the ETH of inactive validators until their balance reaches 16 ETH, at which point they will be automatically ejected from the validator pool. The remaining online validators will eventually comprise over 2/3 the network again, satisfying the supermajority needed to once again finalize the chain.
</ExpandableCard>

<ExpandableCard title="How do I ensure I don't get slashed?">
In short, this can never be fully guaranteed, but if you act in good faith, run a minority client and only keep your signing keys on one machine at a time, the risk of getting slashed is nearly zero.

There are only a few specific ways that can result in a validator getting slashed and ejected from the network. At time of writing, the slashings that have occurred have been exclusively a product of redundant hardware setups where signing keys are stored on two separate machines at once. This can inadvertently result in a <em>double vote</em> from your keys, which is a slashable offense.

Running a supermajority client (any client used by over 2/3 the network) also holds the risk of potential slashing in the event this client has a bug that results in a chain fork. This can result in a faulty fork that gets finalized. To correct back to the intended chain would require submitting a <em>surround vote</em> by trying to undo a finalized block. This is also a slashable offense and can be avoided simply by running a minority client instead.

Equivalent bugs in a <em>minority client would never finalize</em> and thus would never result in a surround vote, and would simply result in inactivity penalties, <em>not slashing</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Learn more about the importance of running a minority client.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Learn more about slashing prevention</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Which client is best?">
Individual clients may vary slightly in terms of performance and user interface, as each are developed by different teams using a variety of programming languages. That being said, none of them are "best." All production clients are excellent pieces of software, that all perform the same core functions to sync and interact with the blockchain.

Since all production clients provide the same basic functionality, it is actually very important that you choose a <strong>minority client</strong>, meaning any client that is NOT currently being used by a majority of validators on the network. This may sound counterintuitive, but running a majority or supermajority client puts you at an increased risk of slashing in the event of a bug in that client. Running a minority client drastically limits these risks.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Learn more about why client diversity is critical</a>
</ExpandableCard>

<ExpandableCard title="Can I just use a VPS (virtual private server)?">
Although a virtual private server (VPS) can be used as a replacement to home hardware, the physical access and location of your validator client <em>does matter</em>. Centralized cloud solutions such as Amazon Web Services or Digital Ocean allow the convenience of not having to obtain and operate hardware, at the expense of centralizing the network.

The more validator clients running on a single centralized cloud storage solution, the more dangerous it becomes for these users. Any event that takes these providers offline, whether by an attack, regulatory demands, or just power/internet outages, will result in every validator client that relies on this server to go offline at the same time.

Offline penalties are proportional to how many others are offline at the same time. Using a VPS greatly increases the risk that offline penalties will be more severe, and increases your risk of quadratic leaking or slashing in the event the outage is large enough. To minimize your own risk, and the risk to the network, users are strongly encouraged to obtain and operate their own hardware.
</ExpandableCard>

<ExpandableCard title="How do I unlock my rewards or get my ETH back?">

Withdrawals of any kind from the Beacon Chain require withdrawal credentials to be set.

New stakers set this at time of key generation and deposit. Existing stakers who did not already set this can upgrade their keys to support this functionality.

Once withdrawal credentials are set, reward payments (accumulated ETH over the initial 32) will be periodically distributed to the withdrawal address automatically.

To unlock and receive your entire balance back you must also complete the process of exiting your validator.

<ButtonLink href="/staking/withdrawals/">More on staking withdrawals</ButtonLink>
</ExpandableCard>

## Further reading {#further-reading}

- [The Ethereum Staking Directory](https://www.staking.directory/) - _Eridian and Spacesider_
- [Ethereum's Client Diversity Problem](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Helping Client Diversity](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Client diversity on Ethereum's consensus layer](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [How To: Shop For Ethereum Validator Hardware](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Step by Step: How to join the Ethereum 2.0 Testnet](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [Eth2 Slashing Prevention Tips](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
