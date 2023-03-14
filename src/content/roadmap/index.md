---
title: Ethereum roadmap
description: The path to more scalability, security and sustainability for Ethereum.
lang: en
template: roadmap
image: ../../assets/upgrades/merge.png
alt: "Ethereum roadmap"
summaryPoints:
buttons:
  - label: Further upgrades
    toId: what-changes-are-coming
  - label: Past upgrades
    to: /history/
    variant: outline
---

Ethereum is already a powerful platform for global coordination, but it is still being improved. An ambitious set of improvements will upgrade Ethereum from its current form into a fully scaled, maximally resilient platform. These upgrades are laid out in the Ethereum roadmap.

**To learn about previous upgrades to Ethereum, please visit our [History](/history/) page**

## What changes are coming to Ethereum? {#what-changes-are-coming}

The Ethereum roadmap outlines the specific improvements that will be made to protocol in the future. Overall, the roadmap will bring the following benefits to Ethereum users:

<CardGrid>
  <RoadmapActionCard
    to="/roadmap/scaling"
    title="Cheaper transactions"
    image="scaling"
    description="Rollups are too expensive and rely on centralized components, causing users to place too much trust in their operators. The roadmap includes fixes for both of these problems."
    buttonText="More on reducing fees"
  />
  <RoadmapActionCard
    to="/roadmap/security"
    title="Extra security"
    image="security"
    description="Ethereum is already very secure but it can be made even stronger, ready to withstand all kinds of attack far into the future."
    buttonText="More on security"
  />
  <RoadmapActionCard
    to="/roadmap/user-experience"
    title="Better user experience"
    image="userExperience"
    description="More support for smart contract wallets and light-weight nodes will make using Ethereum simpler and safer."
    buttonText="More on user experience"
  />
  <RoadmapActionCard
    to="/roadmap/future-proofing"
    title="Future proofing"
    image="futureProofing"
    description="Ethereum researchers and developers are solving tomorrow's problems today, readying the network for future generations."
    buttonText="More on future proofing"
  />
</CardGrid>

## Why does Ethereum need a roadmap? {#why-does-ethereum-need-a-roadmap}

Ethereum gets regular upgrades that enhance its scalability, security, or sustainability. One of Ethereum's core strengths is adapting as new ideas emerge from research and development. Adaptability gives Ethereum the flexibility to tackle emerging challenges and keep up with the most advanced technological breakthroughs.

<RoadmapImageContent title="How the roadmap is defined">

The roadmap is mostly the result of years of work by researchers and developers - because the protocol is very technical - but any motivated person can participate. Ideas usually start off as discussions on a forum such as [ethresear.ch](https://github.com/ethereum/ethereum-org-website/blob/1c5502a0abaa746512323bbce0fbf1093387a724/src/content/roadmap/ethresear.ch), [Ethereum magicians](https://www.figma.com/exit?url=https%3A%2F%2Fethereum-magicians.org%2F) or the Eth R&D discord server. They may be responses to new vulnerabilities that are discovered, suggestions from organizations working in the application layer (such as dapps and exchanges) or from known frictions for end users (such as costs or transaction speeds). When these ideas mature, they can be proposed as [Ethereum Improvement Proposals](https://eips.ethereum.org/). This is all done in public so that anyone from the community can weigh in at any time.

[More on Ethereum governance](/governance/)

</RoadmapImageContent>

<InfoBanner mb={8}>
  <h4 style="margin-top: 0">What was ETH2?</h4>

  <p>The term 'Eth2' was commonly used to describe the future of Ethereum before the switch to proof-of-stake but it was <strong>phased out in favor of more precise terminology.</strong> It was originally used to differentiate the Ethereum network before the switch to proof-of-stake and the network after, or sometimes to refer to the different Ethereum clients (execution clients were sometimes referred to as ETH1 clients and consensus clients were sometimes referred to as ETH2 clients).</p>

</InfoBanner>

## Will Ethereum's roadmap change over time? {#will-ethereums-roadmap-change-over-time}

Yes—almost definitely. The roadmap is the current plan for upgrading Ethereum, covering both near-term and future plans. We expect the roadmap to change as new information and technology become available.

Think of Ethereum's roadmap as a set of intentions for improving Ethereum; it is the core researchers' and developers' best hypothesize of Ethereum's most optimal path forward.

## When will the roadmap be finished? {#when-will-the-roadmap-be-finished}

Ethereum will implement some upgrades in the next six months (e.g. staking withdrawals); others are lower priority and likely not to be implemented for the next 5-10 years (e.g. quantum resistance). Giving precise timing of each upgrade is complicated to predict as many roadmap items are worked on in parallel and developed at different speeds. The urgency of an upgrade can also change over time depending on external factors (e.g. a sudden leap in the performance and availability of quantum computers may make quantum-resistant cryptography more urgent).

One way to think about Ethereum development is by analogy to biological evolution. A network that is able to adapt to new challenges and maintain fitness is more likely to succeed that one that is resistant to change, although as the network becomes more and more performant, scalable and secure fewer changes to the protocol will be required.

## Do I have to do anything when there is an upgrade? {#do-i-have-to-do-anything-when-there-is-an-upgrade}

Upgrades tend not to impact end-users except by providing better user-experiences and a more secure protocol and perhaps more <i>options</i> for how to interact with Ethereum. End uses are not required to actively participate in an upgrade, nor are they required to do anything to secure their assets. Node operators will need to update their clients to prepare for an upgrade. Some upgrades may lead to changes for application developers. For example, history expiry upgrades may lead application developers to grab historical data from new sources.

## What about The Verge, The Splurge, etc? {#what-about-the-verge-splurge-etc}

[Vitalik Buterin proposed a vision for the Ethereum roadmap](https://twitter.com/VitalikButerin/status/1588669782471368704) that was organized into several categories linked by their effects on Ethereum's architecture. It included:

- The Merge: upgrades relating to the switch from proof-of-work to proof-of-stake
- The Surge: upgrades related to scalability by rollups and data sharding
- The Scourge: upgrades related to censorship resistance, decentralization and protocol risks from MEV
- The Verge: upgrades related to verifying blocks more easily
- The Purge: upgrades related to reducing the computational costs of running nodes and simplifying the protocol
- The Splurge: other upgrades that don't fit well into the previous categories.

We decided not to use this terminology because we wanted to use a simpler and more user-centric model. Although we use user-centric language, the vision remains the same as the one proposed by Vitalik.
