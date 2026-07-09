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

Home staking is the act of [running an Ethereum node](/run-a-node/) connected to the internet and depositing at least 32 ETH to activate a [validator](#faq), giving you the ability to participate directly in network consensus.

Home staking is the most direct way to stake. No smart contracts, operators, or custodians stand between you and the protocol: you hold your own keys and receive rewards directly. Every other staking method adds layers on top of this.

**Home staking increases the decentralization of the Ethereum network**, making [Ethereum](/) more censorship-resistant and robust against attacks. Other staking methods may not help the network in the same ways. Home staking is the best staking option for securing Ethereum.

An Ethereum node consists of both an execution layer (EL) client, as well as a consensus layer (CL) client. These clients are software that work together, along with a valid set of signing keys, to verify transactions and blocks, attest to the correct head of the chain, aggregate attestations, and propose blocks.

Home stakers are responsible for operating the hardware needed to run these clients. It is highly recommended to use a dedicated machine for this that you operate from home–this is extremely beneficial to the health of the network.

A home staker receives rewards directly from the protocol for keeping their validator properly functioning and online.

## Why stake from home? {#why-stake-solo}

Home staking comes with more responsibility but provides you with maximum control over your funds and staking setup.

<Grid>
  <Card title="Keep all rewards" emoji="💸" description="Home stakers receive 100% of protocol rewards, paid directly by the protocol while your validator is online." />
  <Card title="Self-sovereignty" emoji="🎛️" description="Keep your own keys and full custody of your funds at all times. Choose the combination of clients and hardware that allows you to minimize your risk. No third party can make these decisions for you or restrict your withdrawals." />
  <Card title="Client and geographic diversity" emoji="🔐" description="Home stakers running minority clients on hardware spread across many locations strengthen the decentralization and security of the network." />
</Grid>

## Considerations before home staking {#considerations-before-staking-solo}

As much as we wish that home staking was accessible and risk free to everyone, this is not reality. There are some practical and serious considerations to keep in mind before choosing to home stake your ETH.

<ExpandableCard title="Required reading" eventCategory="SoloStaking" eventName="clicked required reading">
When operating your own node you should spend some time learning how to use the software you've chosen. This involves reading relevant documentation and being attune to communication channels of those dev teams.

The more you understand about the software you're running and how proof-of-stake works, the less risky it will be as a staker, and the easier it will be to fix any issues that may arise along the way as a node operator.
</ExpandableCard>

<ExpandableCard title="Comfortable with computers" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Node setup requires a reasonable comfort level when working with computers, although new tools are making this easier over time. Understanding of the command-line interface is helpful, but no longer strictly required.

It also requires very basic hardware setup, and some understanding of minimum recommended specs.
</ExpandableCard>

<ExpandableCard title="Hardware requirements" eventCategory="SoloStaking" eventName="clicked hardware requirements">
Current community guidance for validator hardware and bandwidth is maintained in <a href="https://eips.ethereum.org/EIPS/eip-7870">EIP-7870</a>. As a rough guide, plan for a 4 TB NVMe SSD, 64 GB of RAM (less can work, but this is the recommended headroom), a solid modern multi-core CPU, and an internet connection of around 50 Mbps download / 25 Mbps upload.

Since the Fusaka upgrade introduced PeerDAS, a staking node only needs to store and download a fraction of the network's blob data, significantly reducing disk and bandwidth requirements for home stakers.

[More on running a node](/run-a-node/)
</ExpandableCard>

<ExpandableCard title="Secure key management" eventCategory="SoloStaking" eventName="clicked secure key management">
Just like how private keys secure your Ethereum address, you will need to generate keys specifically for your validator. You must understand how to keep any seed phrases or private keys safe and secure.{' '}

[Ethereum security and scam prevention](/security/)
</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware occasionally fails, network connections error out, and client software occasionally needs upgrading. Node maintenance is inevitable and will occasionally require your attention. You'll want to be sure you stay aware of any anticipated network upgrades, or other critical client upgrades.
</ExpandableCard>

<ExpandableCard title="Reliable uptime" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Your rewards are proportional to the time your validator is online and properly attesting. Downtime incurs penalties proportional to how many other validators are offline at the same time, but <a href="#faq">does not result in slashing</a>. Bandwidth also matters, as rewards are decreased for attestations that are not received in time. Requirements will vary, but current validator guidance ([EIP-7870](https://eips.ethereum.org/EIPS/eip-7870)) recommends around 50 Mbps download and 25 Mbps upload.
</ExpandableCard>

<ExpandableCard title="Slashing risk" eventCategory="SoloStaking" eventName="clicked slashing risk">
Different from inactivity penalties for being offline, <em>slashing</em> is a much more serious penalty reserved for malicious offenses. By running a minority client with your keys loaded on only one machine at time, your risk of being slashed is minimized. That being said, all stakers must be aware of the risks of slashing.

<a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">More on rewards, penalties, and slashing</a>
</ExpandableCard>

<StakingComparison page="solo" />

## How it works {#how-it-works}

<StakingHowSoloWorks />

Once your node is synced and your keys are generated, you deposit your stake to activate your validator. A single validator requires a minimum of 32 ETH, and can hold up to 2048 ETH. The network recognizes deposits in around 13 minutes, but new validators pass through an activation queue before they start attesting; its length varies with demand.

While active you will earn ETH rewards. With compounding (0x02) withdrawal credentials, rewards are added to your stake automatically; with regular withdrawals (0x01) credentials, rewards above the initial 32 ETH are periodically swept to your withdrawal address.

If ever desired, you can exit as a validator, which eliminates the requirement to be online and stops any further rewards. Your remaining balance will then be withdrawn to the withdrawal address that you designate during setup. Exits can be initiated with your validator signing keys, or triggered directly from your withdrawal address with an execution layer transaction, so ultimate control of your funds always rests with your withdrawal address.

### Compounding and the 2048 ETH maximum {#compounding-and-max-effective-balance}

Validators have one of two types of withdrawal credentials:

- **Regular withdrawals (0x01)**: the validator's effective balance is capped at 32 ETH, and any balance above that is automatically swept to your withdrawal address every few days.
- **Compounding (0x02)**: the validator's effective balance can grow up to 2048 ETH. Rewards compound automatically, and you earn rewards on every whole ETH above the 32 ETH minimum, so you can stake flexible amounts like 40 ETH, not just multiples of 32. Only balance above 2048 ETH is swept automatically; withdrawing anything else means manually triggering a partial withdrawal from your withdrawal address, which costs gas.

If you run multiple validators, you can consolidate them into a single compounding validator without exiting and re-entering the network, reducing your maintenance overhead. Consolidation is requested from your withdrawal address and is subject to processing queues. Switching a validator from 0x01 to 0x02 credentials uses this same mechanism, and **cannot be reversed** without fully exiting and depositing again.

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

### Node tools {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Please note the importance of choosing a [minority client](/developers/docs/nodes-and-clients/client-diversity/) as it improves the security of the network, and limits your risk. Tools that allow you to setup minority client are denoted as <em style={{ textTransform: "uppercase" }}>"multi-client."</em>

### Key Generators {#key-generators}

These tools can be used as an alternative to the [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) to help with key generation.

<StakingProductsCardGrid category="keyGen" />

Have a suggestion for a staking tool we missed? Check out our [product listing policy](/contributing/adding-staking-products/) to see if it would be a good fit, and to submit it for review.

## Explore home staking guides {#staking-guides}

<StakingGuides />

## Squad staking: home staking with fault tolerance {#squad-staking}

**Distributed validator technology (DVT)** lets a single validator run across a cluster of machines instead of just one. The validator key is split into shares using distributed key generation, and a threshold of the cluster (for example, any 3 of 4 nodes) must sign together; the full key never exists on any single machine. If one machine fails, goes offline, or is misconfigured, the rest of the cluster keeps the validator attesting.

For home stakers this enables "squad staking": teaming up with friends or other community members to run validators together, removing the single points of failure of a solo setup and reducing the risk of slashing from a single misbehaving machine. Obol and SSV Network both provide production DVT implementations, used today across home staking, staking as a service, and staking pools.

[More on distributed validator technology](/staking/dvt/)

## Run validators for a staking protocol {#run-validators-for-a-staking-protocol}

If you have the hardware and skills to run a node but less than 32 ETH, some staking protocols will match your validator with ETH from their pooled stakers. You post a smaller bond as collateral and run the validator on your own machine; the protocol supplies the rest of the stake, and you earn a share of the rewards.

<ProductDisclaimer />

- **Lido Community Staking Module (CSM)** is permissionless to join, with a bond starting around 2.4 ETH for your first validator key (decreasing for additional keys), or 1.5 ETH for stakers who qualify as Identified Community Stakers.
- **Rocket Pool megapools** require a 4 ETH bond per validator, with the protocol allocating the remaining 28 ETH from its liquid staking pool. (Rocket Pool's earlier "minipools" were closed to new creation in December 2025.)

This is a hybrid approach: you keep the responsibilities (and satisfaction) of operating your own hardware, but your validator operates under the protocol's smart contracts, governance, and performance rules, which is a different trust profile from staking your own ETH directly. Learn more about how these protocols work, including their trust assumptions and token mechanics, on the [pooled staking page](/staking/pools/).

## Home staking and restaking {#home-staking-and-restaking}

Restaking is often confused with staking, but it is a separate, opt-in system built on top of staking. Restaking protocols reuse staked ETH to help secure additional applications in exchange for extra rewards, introducing additional slashing conditions, smart contract risk, and withdrawal delays that do not exist in Ethereum protocol staking. Restaking is never required: your validator earns full protocol rewards without it, and opting in exposes your stake to risks beyond those described on this page.

[More on restaking](/restaking/)

## More ways to use your node {#run-a-node-without-staking}

You don't need to stake at all to put node-operation skills to work. Anyone can [run an Ethereum node](/run-a-node/) without depositing any ETH. You get a self-verified view of the chain, your own private endpoint for sending transactions and interacting with applications, and you contribute to the health and resilience of the network. Running a node is also a good way to build experience before activating a validator, with no ETH at risk.

## Frequently asked questions {#faq}

These are a few of the most common questions about staking that are worth knowing about.

<ExpandableCard title="What is a validator?">

A <em>validator</em> is a virtual entity that lives on Ethereum and participates in the consensus of the Ethereum protocol. Validators are represented by a balance, public key, and other properties. A <em>validator client</em> is the software that acts on behalf of the validator by holding and using its private key. A single validator client can hold many key pairs, controlling many validators.

</ExpandableCard>

<ExpandableCard title="Can I deposit more than 32 ETH?">
Yes. A validator with <em>compounding</em> (0x02) withdrawal credentials can hold an effective balance of up to 2048 ETH, while the minimum to activate remains 32 ETH. Rewards on a compounding validator are added to its stake automatically, and it earns rewards on every whole ETH above the 32 ETH minimum, so you can stake amounts that aren't multiples of 32. See [Compounding and the 2048 ETH maximum](#compounding-and-max-effective-balance).

Validators with <em>regular withdrawals</em> (0x01) credentials remain capped at an <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">effective balance</a> of 32 ETH, with any balance above that automatically swept to the withdrawal address every few days.

For a compounding validator, only balance above the 2048 ETH maximum is swept automatically. To withdraw anything below that, you trigger a partial withdrawal from your withdrawal address (a transaction that costs gas), which can draw down any balance above the 32 ETH minimum. If you run multiple validators, you can also consolidate them into a single compounding validator without exiting the network.

[More on staking withdrawals](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="Can I stake with less than 32 ETH and still run my own node?">
Yes. Activating your own validator directly with the protocol requires 32 ETH, but you can run validators for a staking protocol by posting a smaller bond: Lido's Community Staking Module requires around 2.4 ETH for a first validator key (1.5 ETH for Identified Community Stakers), and Rocket Pool megapools require a 4 ETH bond per validator. In both cases you run the node while the protocol supplies the remainder of the stake, in exchange for operating under its smart contracts and rules. See <a href="#run-validators-for-a-staking-protocol">Run validators for a staking protocol</a> above.

If you don't want to run hardware at all, [staking pools](/staking/pools/) let you participate with any amount of ETH.
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
  <li><a href="https://clientdiversity.org/">Learn more about the importance of running a minority client.</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">Learn more about rewards, penalties, and slashing</a></li>
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

Every withdrawal requires your validator to have a withdrawal address set. New stakers set this at time of key generation and deposit. Stakers from the network's early days who have not yet set a withdrawal address will need to update their withdrawal credentials before withdrawing.

For validators with regular withdrawals (0x01) credentials, reward payments (accumulated ETH over the initial 32) are periodically distributed to the withdrawal address automatically. For compounding (0x02) validators, rewards remain staked and compound automatically. You can withdraw any balance above 32 ETH by triggering a partial withdrawal from your withdrawal address.

To unlock and receive your entire balance back you must exit your validator. You can do this using your validator signing keys, or trigger it directly from your withdrawal address with an execution layer transaction, meaning your funds remain recoverable even if your signing keys are lost.

<ButtonLink href="/staking/withdrawals/">More on staking withdrawals</ButtonLink>
</ExpandableCard>

## Further reading {#further-reading}

- [The Ethereum Staking Directory](https://www.staking.directory/) - _Eridian and Spacesider_
- [Client diversity statistics and migration guides](https://clientdiversity.org/)
- [Helping Client Diversity](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Client diversity on Ethereum's consensus layer](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [How To: Shop For Ethereum Validator Hardware](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870: Hardware and bandwidth recommendations](https://eips.ethereum.org/EIPS/eip-7870)
- [The Pectra upgrade: max effective balance and more](/roadmap/pectra/)
- [Obol documentation](https://docs.obol.org/) - _Obol_
- [SSV Network documentation](https://docs.ssv.network/) - _SSV_
- [Lido Community Staking Module operator portal](https://operatorportal.lido.fi/modules/community-staking-module) - _Lido_
- [Rocket Pool node operator documentation](https://docs.rocketpool.net/) - _Rocket Pool_

<QuizWidget quizKey="staking-solo" />
