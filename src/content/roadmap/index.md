---
title: Ethereum roadmap
description: An overview of Ethereum's upgrade plans
lang: en
template: roadmap
image: ../../assets/upgrades/merge.png
alt: "Ethereum roadmap"
summaryPoints:
  - Learn about how Ethereum will evolve into the future
  - Read why Ethereum is still being worked on
  - Understand how Ethereum is setting up for long term success
buttons:
  - label: Further updates
    toId: what-changes-are-coming
  - label: Past updates
    to: /history/
    variant: outline
---

Ethereum is a powerful platform for global coordination, but it is not finished! An ambitious set of improvements will upgrade Ethereum from its current form into a fully scaled, maximally resilient platform. These upgrades are laid out in the Ethereum roadmap.

**To learn about previous upgrades to Ethereum, such as EIP-1559 or The Merge, please visit our [History](/history/) page**

## What changes are coming to Ethereum? {#what-changes-are-coming}

The Ethereum roadmap outlines the specific improvements that will be made to protocol in the future. Overall, the roadmap will bring the following benefits to Ethereum users:

<CardGrid>
  <RoadmapActionCard
    to="/roadmap/scaling"
    title="Faster, cheaper transactions"
    image="scaling"
    description="Today's scaling solutions, known as rollups, are too centralized, meaning users have to trust small groups of operators to behave honestly. Also, the way rollups send data to Ethereum is too expensive, limiting how cheap transactions can be for end users. The roadmap includes fixes for both of these problems."
  >
    <ButtonLink to="/roadmap/scaling/">Read more</ButtonLink>
  </RoadmapActionCard>
  <RoadmapActionCard
    to="/roadmap/security"
    title="More security"
    image="security"
    description="Ethereum is the most secure and decentralized smart-contract platform in existence. However, there are still improvements that can be made so that Ethereum stays resilient to any level of attack far into the future."
  >
    <ButtonLink to="/roadmap/security/">Read more</ButtonLink>
  </RoadmapActionCard>
  <RoadmapActionCard
    to="/roadmap/user-experience"
    title="Improved user experience"
    image="userExperience"
    description="Using Ethereum will soon be as intuitive as the rest of the web. Ethereum nodes will run on mobile phones, giving every user trustless access to their data and assets. Changes to the way users use accounts will also make using Ethereum simpler and safer."
  >
    <ButtonLink to="/roadmap/user-experience/">Read more</ButtonLink>
  </RoadmapActionCard>
  <RoadmapActionCard
    to="/roadmap/future-proofing"
    title="Future proofing"
    image="futureProofing"
    description="Today's Ethereum researchers and developers are building a protocol for future generations. This means anticipating problems that could arise in decades to centuries and solving them now, such as quantum computers that break current crypotography."
  >
    <ButtonLink to="/roadmap/future-proofing/">Read more</ButtonLink>
  </RoadmapActionCard>
</CardGrid>

### Why Ethereum needs a roadmap {#why-ethereum-needs-a-roadmap}

Ethereum is a network that undergoes periodic upgrades that enhance its scalability, security or sustainability. One of the core strengths of Ethereum is that it is not fixed forever in its current form - as new ideas arise from research and development they can be implemented to make sure Ethereum is ever-improving. This gives Ethereum the flexibility to tackle emerging challenges and keep up with the most advanced technological breakthroughs in cryptography, computing and cryptoeconomics.

<RoadmapImageContent title="How the roadmap is defined">

The roadmap is mostly the result of years of work by researchers and developers - because the protocol is very technical - but any motivated person can participate. Ideas usually start off as discussions on a forum such as [ethresear.ch](https://github.com/ethereum/ethereum-org-website/blob/1c5502a0abaa746512323bbce0fbf1093387a724/src/content/roadmap/ethresear.ch), [Ethereum magicians](https://www.figma.com/exit?url=https%3A%2F%2Fethereum-magicians.org%2F) or the Eth R&D discord server. They may be responses to new vulnerabilities that are discovered, suggestions from organizations working in the application layer (such as dapps and exchanges) or from known frictions for end users (such as costs or transaction speeds).

When these ideas mature, they can be proposed as [Ethereum Improvement Proposals](https://eips.ethereum.org/). Client developers then create prototypes that get investigated intensely and simulated on private and then public testnets before being scheduled for releasing on Ethereum Mainnet. There are nine independent Ethereum client teams (four execution clients and five consensus clients) that all do this independently in different languages. This is all done in public so that anyone from the community can weigh in at any time.

</RoadmapImageContent>

<InfoBanner>
  <h4 style="margin-top: 0">What is ETH2?</h4>

  <p>The term 'Eth2' was commonly used to describe the future of Ethereum before the switch to proof-of-stake but it was <strong>phased out in favor of more precise terminology.</strong> It was originally used to differentiate the Ethereum network before the switch to proof-of-stake and the network after, or sometimes to refer to the different Ethereum clients (execution clients were sometimes referred to as ETH1 clients and consensus clients were sometimes referred to as ETH2 clients).</p>

  <p style="margin-bottom: 0">Some staking operators have also represented ETH staked on the Beacon Chain with the ‘ETH2’ ticker. This creates potential confusion, given that users of these services are not actually receiving an ‘ETH2’ token. No ‘ETH2’ token exists; it simply represents their share in that specific providers’ stake.</p>
</InfoBanner>

## Frequently asked questions {#faq}

<ExpandableCard title="Do I have to do anything when there is an upgrade?" eventCategory="/roadmap" eventName="clicked do i have to do anything when there is an upgrade?">
  Upgrades tend not to impact end-users except by providing better user-experiences and a more secure protocol and perhaps more <i>options</i> for how to interact with Ethereum. End uses are not required to actively participate in an upgrade, nor are they required to do anything to secure their assets. Node operators will need to update their clients to prepare for an upgrade. Some upgrades may lead to changes for application developers. For example, history expiry upgrades may lead application developers to grab historical data from new sources.
</ExpandableCard>

<ExpandableCard title="What about the verge, the splurge etc?" eventCategory="/roadmap" eventName="clicked what about the verge, the splurge, etc?">
Vitalik proposed a vision for the Ethereum roadmap that was organized into several categories linked by their effects on Ethereum's artchitecture. It included:

- The Merge: upgrades relating to the switch from proof-of-work to proof-of-stake
- The Surge: upgrades related to scalability by rollups and data sharding
- The Scourge: upgrades related to censorship resistance, decentralization and protocol risks from MEV
- The Verge: upgrades related to verifying blocks more easily
- The Purge: upgrades related to reducing the computational costs of running nodes and simplifying the protocol
- The Splurge: other upgrades that don't fit well into the previous categories.

We decided not to persist this terminology on this page because we wanted to use a simpler and more user-centric model.
</ExpandableCard>

<ExpandableCard title="Is the roadmap set in stone?" eventCategory="/roadmap" eventName="clicked is the roadmap set in stone?">
  No! The roadmap is the current plan for upgrading Ethereum in the near term and also far into the future. The roadmap can change as new information and new technology becomes available. For example, the original Ethereum roadmap intended for sharding to be implemented before The Merge. However, scaling by rollups developed much faster than expected and the roadmap was updated to focus on layer 2 scaling first, allowing The Merge to happen sooner than originally anticipated. The roadmap is a set of intentions for improving Ethereum - it is the research and developer community's best guess about where we should go from here.
</ExpandableCard>

<ExpandableCard title="When will the roadmap be finished?" eventCategory="/roadmap" eventName="clicked when will the roadmap be finished?">
  The current roadmap contains some upgrades that will be implemented in the next 6 months (e.g. staking withdrawals) and others that will probably take 5-10 years to be fully implemented (e.g. quantum resistance). The precise timing of each upgrade is very difficult to predict as many roadmap items are worked on in parallel and develop at different speeds. The relative urgency of different upgrades can also change over time depending on external factors (e.g. a sudden leap in the performance and availability of quantum computers may make quantum resistant cryptography more urgent).

One way to think about Ethereum development is by analogy to biological evolution. A network that is able to adapt to new challenges and maintain fitness is more likely to succeed that one that is resistant to change. We aim for homeostasis rather than ossification, although as the network evolves to become more and more performant, scalable and secure over time fewer and fewer changes to the protocol will be required.
</ExpandableCard>
