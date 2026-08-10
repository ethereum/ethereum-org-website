---
title: Delegated staking (staking as a service)
description: An overview of how to get started with delegated staking
lang: en
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Leslie the rhino floating in the clouds.
sidebarDepth: 2
summaryPoints:
  - Third-party node operators handle the operation of your validator client
  - A great option for anyone with 32 ETH who doesn't want to deal with the technical complexity of running a node
  - Delegation spans a spectrum, from services where you keep your withdrawal keys to fully custodial exchanges
---

## What is delegated staking? {#what-is-staking-as-a-service}

Delegated staking represents a category of staking services where you deposit your own 32 ETH for a validator, but delegate node operations to a third-party operator. The process usually involves being guided through the initial setup, including key generation and deposit, then uploading your signing keys to the operator. You provide the ETH, but hand the operation of the validator's hardware to someone else.

The [Ethereum](/) protocol does not natively support delegation of stake, so a range of services have been built to fill this demand. This category is best known as **staking as a service (SaaS)**, but it covers a spectrum of arrangements that differ on the key question of how much control you keep over your staked ETH:

- **Non-custodial staking as a service**: you keep your own withdrawal keys and delegate only validator operation.
- **Fully custodial staking**: the provider, usually an exchange, holds both the keys and the funds.

Compared to [solo staking](/staking/solo/), every form of delegation places middleware between you and the Ethereum protocol. That middleware is software and infrastructure run by someone else's business. Each step toward convenience adds a trust assumption, so before choosing a service, work out where it sits on this spectrum.

### What delegated staking is not {#what-delegated-staking-is-not}

- **Pooled staking and liquid staking tokens**: with pools you combine any amount of ETH with other stakers, usually receiving a token that represents your share of the pool's stake. You are not delegating your own validator; the pool's smart contracts and node operators control the validators. [More on pooled staking](/staking/pools/)
- **Bonded node operation**: some staking protocols let you run a validator on your own hardware with less than 32 ETH by posting a bond. That is node operation, the opposite of delegation, and is covered alongside [solo staking](/staking/solo/).

## Why delegate your staking? {#why-stake-with-a-service}

If you have 32 ETH to stake, but don't feel comfortable dealing with hardware, delegated staking services allow you to hand off the technical side while you earn native Ethereum block rewards.

<Grid>
  <Card title="Your own validator" icon={<MonitorCheck />} description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Easy to start" icon={<Flag />} description="Forget about hardware specs, setup, node maintenance and upgrades. Providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limit your risk" icon={<ShieldHalf />} description="With non-custodial services you keep control of the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</Grid>

## Comparison of staking options {#comparison-of-staking-options}

<StakingComparison page="saas" />

## The delegation spectrum {#the-delegation-spectrum}

Providers differ in which keys they hold for you, and every key they hold is something you must trust them with.

### Non-custodial staking as a service {#non-custodial-staking-as-a-service}

With non-custodial SaaS, you're typically guided through generating your validator keys and making your own 32 ETH deposit, then you upload the _signing keys_ to the operator. The signing keys allow the operator to perform validator duties (attesting and proposing blocks) on your behalf. Misusing them can get your validator penalized or slashed, but they cannot be used to withdraw, transfer, or spend your funds.

The validator's _withdrawal credentials_ stay pointed at an address you control. Rewards and exited funds can only ever go there (see the trust model section below).

### Custodial services and exchange staking {#custodial-services-and-exchange-staking}

At the fully delegated end of the spectrum sits custodial staking, most commonly offered by centralized exchanges. You never handle keys at all; you just hold ETH in your platform account and opt in to staking. This is the simplest possible user experience, and it's a legitimate option for people who already keep funds on an exchange and accept custodial risk.

It also requires the most trust. The provider controls both the signing keys and the withdrawal credentials; what you hold is a balance on their platform, not a validator. That means:

- Your staked ETH is exposed to the provider's solvency, security, and regulatory situation, and withdrawals are subject to their terms and processing times, not just Ethereum protocol rules.
- You have no independent way to exit the validator or recover funds if the provider fails or freezes withdrawals.
- Large amounts of ETH staked under a handful of exchange operators contribute to stake centralization, and these operators' client choices affect the health of the network. Staking in a way that keeps more control in your hands, or choosing providers that demonstrably run minority clients, does more for Ethereum's resilience.

## Trust model: what to evaluate {#trust-model-what-to-evaluate}

Delegated staking always means trusting someone else with part of your staking setup. Answer these questions before handing anything over:

- **Who holds the withdrawal keys?** A validator's withdrawal credentials (type 0x01 or 0x02) point to an execution layer address that ultimately controls the stake. If that address is yours, the arrangement is non-custodial; the operator can run (or mismanage) the validator, but the ETH can only ever be withdrawn to you. If the credentials point to the provider's address, you hold a promise, not a stake.
- **Can you exit without the operator?** Since the [Pectra upgrade](/roadmap/pectra/), [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) allows the withdrawal address to trigger a validator exit (or, for compounding 0x02 validators, a partial withdrawal of balance above 32 ETH) directly from the execution layer, without the signing keys. It requires a transaction and costs gas, but it means an unresponsive or defunct operator can no longer hold your validator hostage, provided the withdrawal credentials are yours.
- **What is the fee structure?** Services charge a flat monthly fee or a percentage of rewards. Check how fees interact with downtime and penalties: who bears the cost if the operator underperforms, and whether any guarantees or insurance are offered.
- **Which clients does the operator run?** An operator running majority [execution or consensus clients](/developers/docs/nodes-and-clients/client-diversity/) exposes both your stake and the network to correlated failure if that client has a bug. Prefer providers that document minority client usage.
- **Is the service open and audited?** Providers may run additional software around the standard Ethereum clients that is not open source or auditable. Look for public audits, an established operating history, and a clean slashing record.
- **What happens if the provider disappears?** A responsible provider documents its offboarding process, providing clear instructions for how you exit your validator, recover your keys, or trigger an exit yourself. If the answer depends entirely on the provider staying in business it is a custodial arrangement.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
**Some providers can run your validator using distributed validator technology (DVT)**, splitting the signing key across multiple nodes so that no single machine or operator is a point of failure. [More on distributed validator technology](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## What to consider {#what-to-consider}

There are a growing number of providers to help you delegate the operation of your validator, but they all have their own benefits and risks. All delegated options require additional trust assumptions compared to solo staking. Delegated options may have additional code wrapping the Ethereum clients that is not open or auditable. Delegation also has a detrimental effect on network decentralization. Depending on the setup, you may not control your validator, and the operator could act dishonestly using your ETH.

Attribute indicators are used below to signal notable strengths or weaknesses a listed provider may have. Use this section as a reference for how we define these attributes while you're choosing a staking service.

<StakingConsiderations page="saas" />

## Explore staking service providers {#saas-providers}

Below are some available staking-as-a-service providers. Use the above indicators to help guide you through these services.

<ProductDisclaimer />

### SaaS providers {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Please note the importance of supporting [client diversity](/developers/docs/nodes-and-clients/client-diversity/) as it improves the security of the network, and limits your risk. Services that have evidence of limiting majority client use are indicated with <em style={{ textTransform: "uppercase" }}>"execution client diversity"</em> and <em style={{ textTransform: "uppercase" }}>"consensus client diversity."</em>

### Key Generators {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Have a suggestion for a staking-as-a-service provider we missed? Check out our [product listing policy](/contributing/adding-staking-products/) to see if it would be a good fit, and to submit it for review.

<StakingCommunityCallout className="my-16" />

## Frequently asked questions {#faq}

<ExpandableCard title="Who holds my keys?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Arrangements will differ from provider-to-provider, but commonly you will be guided through setting up any signing keys you need (one per 32 ETH), and uploading these to your provider to allow them to validate on your behalf. The signing keys alone do not give any ability to withdraw, transfer, or spend your funds. However, they do provide the ability to cast votes towards consensus, which if not done properly can result in offline penalties or slashing.
</ExpandableCard>

<ExpandableCard title="So there are two sets of keys?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Yes. Each account is comprised of both BLS <em>signing</em> keys, and BLS <em>withdrawal</em> keys. In order for a validator to attest to the state of the chain, participate in sync committees and propose blocks, the signing keys must be readily accessible by a validator client. These must be connected to the internet in some form, and are thus inherently considered to be "hot" keys. This is a requirement for your validator to be able to attest, and thus the keys used to transfer or withdraw funds are separated for security reasons.

The BLS withdrawal keys are used to sign a one-time message that declares which execution layer account staking rewards and exited funds should go to. Once this message is broadcast, the <em>BLS withdrawal</em> keys are no longer needed. Instead, control over withdrawn funds is permanently delegated to the address you provided. This allows you to set a withdrawal address secured via your own cold storage, minimizing risk to your validator funds, even if someone else controls your validator signing keys.

Updating withdrawal credentials is a required step to enable withdrawals\*. This process involves generating the withdrawal keys using your mnemonic seed phrase.

<strong>Make certain you back this seed phrase up safely or you will be unable to generate your withdraw keys when the time comes.</strong>

\*Stakers who provided a withdrawal address with initial deposit do not need to set this. Check with your SaaS provider for support regarding how to prepare your validator.
</ExpandableCard>

<ExpandableCard title="When can I withdraw?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Stakers need to provide a withdrawal address (if not provided on initial deposit), and reward payments will begin being distributed automatically on a periodic basis every few days.

Validators can also fully exit as a validator, which will unlock their remaining ETH balance for withdrawal. Accounts that have provided an execution withdrawal address and completed the exiting process will receive their entire balance to the withdrawal address provided during the next validator sweep.

<ButtonLink href="/staking/withdrawals/">More on staking withdrawals</ButtonLink>
</ExpandableCard>

<ExpandableCard title="What if my provider disappears or won't exit my validator?" eventCategory="SaasStaking" eventName="clicked what if my provider disappears">
If your validator's withdrawal credentials point to an address you control, an unresponsive operator can no longer hold your stake hostage. Since the Pectra upgrade, <a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> allows the withdrawal address to trigger a validator exit directly from the execution layer, without needing the signing keys. It requires sending a transaction and costs gas, but once the exit completes, your remaining balance is swept to your withdrawal address.

If the provider holds the withdrawal credentials (a custodial arrangement), you have no independent way to exit or recover funds, and you depend entirely on the provider. This is the key question to answer before choosing a service.
</ExpandableCard>

<ExpandableCard title="What happens if I get slashed?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
By using an SaaS provider, you are entrusting the operation of your node to someone else. This comes with the risk of poor node performance, which is not in your control. In the event your validator is slashed, your validator balance will be penalized and forcibly removed from the validator pool.

Upon completion of the slashing/exiting process, these funds will be transferred to the withdrawal address assigned to the validator. This requires providing a withdrawal address to enable. This may have been provided on initial deposit. If not, the validator withdrawal keys will need to be used to sign a message declaring a withdrawal address. If no withdrawal address has been provided, funds will remain locked until provided.

Contact individual SaaS provider for more details on any guarantees or insurance options, and for instructions on how to provide a withdrawal address. If you'd prefer to be in full control of your validator setup, [learn more about how to solo stake your ETH](/staking/solo/).
</ExpandableCard>

## Further reading {#further-reading}

- [What is Staking-as-a-Service?](https://figment.io/insights/what-is-staking-as-a-service/) - _Figment_
- [The Ethereum Staking Directory](https://www.staking.directory/) - _Eridian and Spacesider_
- [Evaluating Staking Services](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
- [EIP-7002: Execution layer triggerable withdrawals](https://eips.ethereum.org/EIPS/eip-7002) - _the specification for exiting a validator from its withdrawal address_
