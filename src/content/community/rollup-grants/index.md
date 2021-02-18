---
title: Ethereum Rollup Community Grants
description: Grants to build a rollup ecosystem
lang: en
sidebar: true
---

# Rollup Community Grants {#rollup-community-grants}

_The Ethereum Foundation is sponsoring a wave of rollup community grants. Proposals are due **[date]**. Here are all the details you need._

<Divider />

Calling all those interested in building up the Ethereum rollup community!

The Ethereum ecosystem is likely to be all-in on rollups as a scaling strategy for the near and mid-term future (see Vitalik’s rollup centric ethereum [roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698/50?u=haoyuathz)). A variety of optimistic and zk-rollups are already in production or will go live in the near future.

As gas prices are soaring the most promising near term solution to getting a scalable EVM like developer experience is optimistic rollups such as [Optimism](https://optimism.io/) and [Arbitrum](https://offchainlabs.com/). Therefore, while we are equally excited about the promise of other rollups, we want to focus this round on EVM optimistic rollup.

The goal is to grow the rollup community and help to kickstart a flourishing ecosystem. We want to make it easy for dapps to live on multiple EVM rollups and have user and developer experience for rollups on par with mainnet or better. Social recovery wallets could be made the default and it should be easy for users to move from one rollup to another even during prolonged periods of very high gas prices.

## Wait, what are optimistic rollups? {#what-are-optimistic-rollups}

Here some links to dive deeper:

- Learn the basics on [Ethhub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [An Incomplete Guide to Rollups](https://vitalik.ca/general/2021/01/05/rollup.html) by Vitalik.
- [(Almost) Everything you need to know about Optimistic Rollup](https://research.paradigm.xyz/rollups) by Georgios Konstantopoulos.
- [How does Optimism's Rollup really work?](https://research.paradigm.xyz/optimism) by Georgios Konstantopoulos.

## Submit proposal {#submit-proposal}

Anyone is free to participate (individuals and teams) in this grants round.

If you want to submit something but need some inspiration, check out the [wishlist !insert link!]().

Ideas and projects at any stage of development are welcome:

- Idea phase.
- Proof of concept.
- Work in progress.
- Fleshed out project.

Grants are decided on a case-by-case basis and you may enter more than one proposal! So long as each proposal is unique and meets the requirements (add link to paragraph).

### Deadline {#deadline}

The deadline for proposals is any time the day of **[date]**. We will follow-up with you about your submission by email.

### Requirements {#requirements}

- Proposals must be in English.
- Work must be open source with a free and permissive license.
- If published work, it must be accessible by a url.

### Selection criteria {#selection-criteria}

_Surprise us with your creativity! But here are a few selection criteria considerations (depending on the submission type some criteria might not be applicable):_

- Potential impact on broadening the rollup community.
- Quality of contribution to the rollup ecosystem.
- Clarity, conciseness and organization of documentation.
- Novelty supporting rollup adoption.
- Insights that lead to substantive changes in rollup implementations or specifications.
- Analyses or visualizations that help a non-technical audience gain insight into the networks.

## Wishlist {#wishlist}

The Ethereum Foundation is interested in the following things, but don't let this restrict your creativity.

<ExpandableCard
contentPreview="Enable users to send transactions across rollups."
title="Wallets">

   <p>For example:</p>

   <ul>
    <li>A wallet that supports all rollups.</li>
    <li>Transaction abstraction default i.e. allow to use BLS or other crypto instead of ECDSA.</li>
    <li>Social key recovery.</li>
    <li>Make it easy to be layer agnostic. Enable the sender to process payments to addresses on different rollups as specified by the receiver.</li>
  </ul>
</ExpandableCard>

<ExpandableCard
contentPreview="Make it easy to monitor and interact with rollups."
title="Infrastructure">

   <p>For example:</p>

   <ul>
    <li>A block explorer that supports all rollups.</li>
    <li>Status dashboards to monitor network health.</li>
    <li>For rollups that have a single coordinator, provide a receipt to a user which gives assurance that the transaction will be included. Otherwise a penalty is applied.</li>
  </ul>
</ExpandableCard>

<ExpandableCard
contentPreview="Enable a community of rollup coordinators and verifiers to flourish."
title="Community">

Most rollups currently have a centralized coordinator that orders transactions, others are decentralized and allow more coordinators to join. Coordinators create blocks, verifiers make sure they are correct. It's important that verifiers stay online to submit fraud proofs.

   <p>For example:</p>

   <ul>
    <li>Create educational material for potential coordinators and verifiers.</li>
    <li>Support community infrastructure for coordinators and validators to facilitate communication and coordination.</li>
    <li>Organize pager duty for verifiers to ensure fraud proof submission.</li>
  </ul>
</ExpandableCard>

<ExpandableCard
contentPreview="Make it easy for devs to deploy dApps on rollups."
title="Developer Experience">

   <p>For example:</p>

   <ul>
    <li>Make it easy for developers to deploy contracts without rollup specific changes.</li>
    <li>Improve developer documentation.</li>
    <li>A wrapper that makes it easy to build UI's on multiple rollups. Ideally existing frontends just need a change to endpoints.</li>
  </ul>
</ExpandableCard>

<ExpandableCard
contentPreview="Enable interaction between rollups."
title="Interoperability">

   <p>For example:</p>

   <ul>
    <li>Mass migrations allow users to exit one rollup and move to another without on-chain action. Several rollups will support mass migrations, additional tooling could facilitate this in practice.</li>
    <li>Fast withdrawal: optimistic rollups have a slow withdrawal time. It is possible to expedite this process by advancing the withdrawal funds for a fee.</li>
    <li>State channels between two users on multiple rollups can be used to move funds without a L1 transaction.</li>
  </ul>
</ExpandableCard>

<ExpandableCard
contentPreview="Onboard users to rollups."
title="Adoption">

   <p>For example:</p>

   <ul>
    <li>Create a game that encourages people to try out optimistic rollups. Extra points if it involves a social recovery wallet or a wallet on multiple rollups.
    </li>
    <li>Bridge assets between mainnet and multiple optimistic rollups.</li>
  </ul>
</ExpandableCard>

<ExpandableCard
contentPreview="
The optimistic rollup space is very young, it is a good opportunity to establish standards."
title="Standards">

   <p>For example:</p>

   <ul>
    <li>Standards for mass migrations.</li>
    <li>An address format that supports multiple rollups and allows the user to share a single address to receive funds on multiple rollups.</li>
    <li>Name services working across multiple rollups.</li>
  </ul>
</ExpandableCard>

<ExpandableCard
contentPreview="
Find ways to make rollups more efficient."
title="Research">

Rollups need to make the state before and after a transition available. Its might be possible to further compress this data.

   <p>For example:</p>

   <ul>
    <li>Find better compression algorithms for EVM rollups, implement and benchmark.</li>
  </ul>
</ExpandableCard>

<ExpandableCard
contentPreview="
Explore the design space."
title="Build new optimistic rollups">

A lot of the design space that has not yet been explored. Learn from what has been built already. Build optimistic rollups with EVM, WASM or other VMs.
</ExpandableCard>

## Next steps and support {#Next-steps-and-support}

User this form [!!Insert link] to submit your proposal.

For any general support questions about your submission, please email rollupgrants@ethereum.org.

For technical questions about rollups, ideas or direction for proposals, and all things rollups, we invite you to join the [EthereumRollupGrants](https://t.me/EthereumRollupGrants) telegram channel.

## Frequently asked questions {#faq}

### Who can submit proposals for Rollup Community Grants? {#who-can-submit-proposals}

Anybody!

Feel free to submit as teams or individuals.

### What makes for a good proposal? {#what-makes-for-a-good-proposal}

The more detailed information, the better.

In short, we need enough information to understand your goals, your motivation and your challenges. The more details you provide, the more likely we’ll be able to help.

For example:

- Showing a clear grasp of the problem you're trying to solve
- Clearly identifying your project's impact and how it would help the rollup ecosystem
- Detailed description of your project

### What state does my idea or project need to be in? {#what-state-needs-the-project-be-in}

Any stage of development!

If you have an idea or project that benefits the rollup community, we want to hear about it! The goal is to support regular, consistent work that pushes forward the rollup ecosystem.

Rollup Community Grants is an open call for proposals. Which means, it's expected that some ideas or projects won't be fully shipped before the deadline, but instead require ongoing efforts.

### What if I miss the deadline? {#what-if-i-miss-deadline}

You can submit an inquiry for support through the Ecosystem Support Program.

The Ethereum Foundation has a general grants initiative called the [Ecosystem Support Program (ESP)](https://esp.ethereum.foundation/).

If you miss the deadline for this dedicated round of grants, but have a proposal related to rollups, head on over to ESP.
