---
title: Ethereum roadmap
description: An overview of Ethereum's upgrade plans
lang: en
template: staking
emoji: ":money_with_wings:"
image: ../../../assets/staking/leslie-pool.png
alt: Leslie the rhino swimming in the pool.
sidebarDepth: 2
summaryPoints:
  - Learn about how Ethereum will evolve into the future
  - Read why Ethereum is still being worked on
  - Understand how Ethereum is setting up for long term success
---

Ethereum is a powerful platform for global coordination, but it is not finished! An ambitious set of improvements will upgrade Ethereum from its current form into a fully scaled, maximally resilient platform. These upgrades are laid out in the Ethereum roadmap.

**To learn about previous upgrades to Ethereum, such as EIP-1559 or The Merge, please visit our [History](/history/) page**

## What changes are coming to Ethereum? {#what-changes-are-coming}

The Ethereum roadmap outlines the specific improvements that will be made to protocol in the future. Overall, the roadmap will bring the following benefits to Ethereum users:

<CardGrid>
  <Card title="Faster, cheaper transactions" emoji="🐟">

    Today's rollups are still in their "training wheels" phase where critical components are run by centralized operators. Decentralizing the rollup infrastructure is a critical part of scaling Ethereum without compromising on Ethereum's core ethos of decentralization. At the same time, it is too expensive for rollups to post their data to Ethereum and this limits how cheaply users can transact. Adding data-blobs to blocks and sharding data across nodes will solve this problem, leading to near-instant, <$0.001 transactions for users.

    [Read how Ethereum will scale](/roadmap/faster-transactions/)

  </Card>
  <Card title="Better user experience" emoji=":stopwatch:">

    Extremely lightweight nodes and more intuitive ways to manage accounts will make interacting with Ethereum in a permissionless, censorship-resistant way as straightforward as using any of today's familiar web2 apps. Changes to the way users use accounts will also bring simpler and safer access to Ethereum.

    [Read how the user experience will improve](/roadmap/user-experience/)

  </Card>
  <Card title="More security" emoji=":droplet:">

    Ethereum is the most secure and decentralized smart-contract platform in existence. However, there are still improvements that can be made so that Ethereum stays resilient to any level of attack far into the future.

    [Read how Ethereum will become even more secure](./more-secure-ethereum.md)

  </Card>
    <Card title="Future proofing" emoji=":droplet:">

    Today's Ethereum researchers and developers are building a protocol for future generations. This means anticipating problems that could arise in decades to centuries and solving them now, such as quantum computers that break current crypotography.

    [Read how Ethereum will be future-proofed](./future-proofing.md)

  </Card>
</CardGrid>

### Why does Ethereum need a roadmap? {#why-does-ethereum-need-a-roadmap}

Ethereum is a network that undergoes periodic upgrades that enhance its scalability, security or sustainability. One of the core strengths of Ethereum is that it is not fixed forever in its current form - as new ideas arise from research and development they can be implemented to make sure Ethereum is ever-improving. This gives Ethereum the flexibility to tackle emerging challenges and keep up with the most advanced technological breakthroughs in cryptography, computing and cryptoeconomics.

### Who decides the roadmap? {#who-decides-the-roadmap}

The roadmap is mostly the result of years of work by researchers and developers - because the protocol is very technical - but any motivated person can participate. Ideas usually start off as discussions on a forum such as [ethresear.ch](ethresear.ch), [Ethereum magicians](https://ethereum-magicians.org/) or the Eth R&D discord server. They may be responses to new vulnerabilities that are discovered, suggestions from organizations working in the application layer (such as dapps and exchanges) or from known frictions for end users (such as costs or transaction speeds). When these ideas mature, they can be proposed as **Ethereum Improvement Proposals (EIPs)**. EIPS undergo intense investigation and simulation before being scheduled for client teams to implement. Then, they are prototyped and tested extensively before eventually being scheduled for release. This is all done in public so that anyone from the community can weigh in at any time.

<ExpandableCard title="What is ETH2?">
The term 'Eth2' was commonly used before Ethereum switched to proof-of-stake but it was phased out in favor of more precise terminology. It was originally used to differentiate the Ethereum network before the switch to proof-of-stake and the network after, or sometimes to refer to the different Ethereum clients (execution clients were sometimes referred to as ETH1 clients and consensus clients were sometimes referred to as ETH2 clients).

Some staking operators have also represented ETH staked on the Beacon Chain with the ‘ETH2’ ticker. This creates potential confusion, given that users of these services are not actually receiving an ‘ETH2’ token. No ‘ETH2’ token exists; it simply represents their share in that specific providers’ stake.
</ExpandableCard>

<ExpandableCard title="What about the verge, the splurge etc?">
Vitalik proposed a vision for the Ethereum roadmap that was organized into several categories linked by their effects on Ethereum's artchitecture. It included:

- The Merge: upgrades relating to the switch from proof-of-work to proof-of-stake
- The Surge: upgrades related to scalability by rollups and data sharding
- The Scourge: upgrades related to censorship resistance, decentralization and protocol risks from MEV
- The Verge: upgrades related to verifying blocks more easily
- The Purge: upgrades related to reducing the computational costs of running nodes and simplifying the protocol
- The Splurge: other upgrades that don't fit well into the previous categories.

We decided not to persist this terminology on this page because we wanted to use a simpler and more user-centric model.
</ExpandableCard>

### Is the roadmap set in stone?

No! The roadmap is the current plan for upgrading Ethereum in the near term and also far into the future. The roadmap can change as new information and new technology becomes available. For example, the original Ethereum roadmap intended for sharding to be implemented before The Merge. However, scaling by rollups developed much faster than expected and the roadmap was updated to focus on layer 2 scaling first, allowing The Merge to happen sooner than originally anticipated. The roadmap is a set of intentions for improving Ethereum - it is the research and developer community's best guess about where we should go from here.

### When will the roadmap be finished?

The current roadmap contains some upgrades that will be implemented in the next 6 months (e.g. staking withdrawals) and others that will probably take 5-10 years to be fully implemented (e.g. quantum resistance). The precise timing of each upgrade is very difficult to predict as many roadmap items are worked on in parallel and develop at different speeds. The relative urgency of different upgrades can also change over time depending on external factors (e.g. a sudden leap in the performance and availability of quantum computers may make quantum resistant cryptography more urgent).

One way to think about Ethereum development is by analogy to biological evolution. A network that is able to adapt to new challenges and maintain fitness is more likely to succeed that one that is resistant to change. We aim for homeostasis rather than ossification, although as the network evolves to become more and more performant, scalable and secure over time fewer and fewer changes to the protocol will be required.

### Do I have to do anything when there is an upgrade?

Upgrades tend not to impact end-users except by providing better user-experiences and a more secure protocol and perhaps more _options_ for how to interact with Ethereum. End uses are not required to actively participate in an upgrade, nor are they required to do anything to secure their assets. Node operators will need to update their clients to prepare for an upgrade. Some upgrades may lead to changes for application developers. For example, history expiry upgrades may lead application developers to grab historical data from new sources.

## Further reading {#further-reading}

TBC
