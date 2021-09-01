---
title: Ethereum Governance
description: An introduction to how decisions about Ethereum are made.
lang: en
sidebar: true
---

# Introduction to Ethereum Governance {#introduction}

_If no one owns Ethereum, how are decisions about past and future changes to Ethereum made? Ethereum governance refers to the process that allows such decisions to be made_

<Divider />

## What is Governance? {#what-is-governance}

The Cambridge dictionary defines governance as:

> _the way that organizations or countries are managed at the highest level, and the systems for doing this_

In essence, governance is the system in place that allows decisions to be made. In a typical organizational structure, the executive team or a directors' board may have the final say in decision-making. In a political system, elected officials may enact legislation that attempts to represent their constituent's desires.

<Divider />

## Decentralized Governance {#decentalized-governance}

No one person owns the Ethereum protocol, but decisions still need to be made about implementing changes to best ensure the longevity and prosperity of the network. This lack of ownership makes traditional organizational governance an incompatible solution.

## Ethereum Governance {#ethereum-governance}

Ethereum governance is the process by which protocol changes are made. It's important to point out that this process isn't related to how people and applications use the protocol - Ethereum is permissionless. Anyone from anywhere in the world can participate in on-chain activities. There are no rules set for who can or cannot build an application or send a transaction. However, there is a process to propose changes to the core protocol, which these applications run on top of. Since so many people depend on Ethereum's stability, there is a very high coordination threshold for core changes, including social and technical processes, to ensure any changes to Ethereum are secure and widely supported by the community

### On-chain vs Off-chain governance {#on-chain-vs-off-chain}

Blockchain technology allows for new governance capabilities, known as on-chain governance. On-chain governance is when proposed protocol changes are decided by a stakeholder vote, usually by holders of a governance token, and voting happens on the blockchain. With on-chain governance, the proposed protocol changes are already written in code and implemented automatically if the stakeholders approve the changes.

The opposite approach, off-chain governance, is where any protocol change decisions happen through an informal process of social discussion, which, if approved, would be implemented in code.

**Ethereum governance happens off-chain** with a wide variety of stakeholders involved in the process.

_Whilst at a protocol level Ethereum governance is off-chain, many use cases built on top of Ethereum, such as DAOs, use on-chain governance._

<ButtonLink to="/dao/">More on DAOs</ButtonLink>

<Divider />

## Who is involved? {#who-is-involved}

There are various stakeholders in the [Ethereum community](/community/), each playing a role in the governance process. Starting from the stakeholders closest to the protocol and zooming out, we have:

- **Protocol Developers** (a.k.a. "Core Developers" ): these people maintain the various Ethereum implementations (e.g. go-ethereum, Nethermind, Besu, Erigon at the execution layer or Prysm, Lighthouse, Nimbus, Teku, Lodestar at the consensus layer). [More on Ethereum clients](/developers/docs/nodes-and-clients/).
- **EIP Authors**: these people propose changes to the Ethereum protocol, in the form of Ethereum Improvement Proposals (EIPs). [More on EIPs](/eips/).
- **Miners/Validators**: these people run nodes that can add new blocks to the Ethereum blockchain.
- **Node Operators**: these people run nodes that propagate blocks and transactions, rejecting any invalid transaction or block that they come across. [More on nodes](/developers/docs/nodes-and-clients/).
- **Application/Tooling Developers**: these people write applications that are run on the Ethereum blockchain (e.g. DeFi, NFTs, etc.) or build tooling to interact with Ethereum (e.g. wallets, test suites, etc.). [More on dapps](/dapps/).
- **Application Users**: these people interact with applications on the Ethereum blockchain.
- **Ether holders**: these people own the ETH token. [More on ETH](/eth/).

_Note: any individual can be part of multiple of these groups (e.g. a protocol developer could champion an EIP, and run a beacon chain validator, and use DeFi applications). For conceptual clarity, it is easiest to distinguish between them, though._

<Divider />

## What is an EIP? {#what-is-an-eip}

One important process used in Ethereum governance is the proposal of **Ethereum Improvement Proposals (EIPs)**. EIPs are standards specifying potential new features or processes for Ethereum. Anyone within the Ethereum community can create an EIP. For example, none of the authors of EIP-721, the EIP that standardized NFTs, have worked directly on Ethereum's protocol development.

<ButtonLink to="/eips/">More on EIPs</ButtonLink>

<Divider />

## The Formal Process {#formal-process}

The formal process for introducing changes to the Ethereum protocol is as follows:

1. **Propose a Core EIP**: as described in [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), the first step to formally proposing a change to Ethereum is to detail it in a Core EIP. This will act as the official specification for an EIP that Protocol Developers will implement if accepted.

2. **Present your EIP to Protocol Developers**: once you have a Core EIP, you should get feedback on it from Protocol Developers. You can get feedback can by proposing it for discussion on an [AllCoreDevs call](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Alternatively, discussion can happen asynchronously on the [Ethereum Magician's forum](https://ethereum-magicians.org/) or in the [Ethereum R&D Discord](https://discord.gg/mncqtgVSVw).

> Potential outcomes of this stage are:

> - The EIP will be considered for a future network upgrade
> - Technical changes will be requested
> - It may be rejected if it is not a priority or the improvement is not large enough relative to the development effort.

3. **[Optional] Gather Community Consensus for your EIP**: some EIPs are purely technical changes with little room for debate, but others can be more contentious. If the EIP is in the latter category, Protocol Developers will likely want to see strong evidence of overwhelming community support before proceeding with it. There is no "one size fits all" approach here, as each EIP is unique.

4. **EIP Included in Network Upgrade**: assuming the EIP is approved, tested and implemented, it gets scheduled as part of a network upgrade. Given the high coordination costs of network upgrades (everyone needs to upgrade simultaneously), EIPs are generally bundled together in upgrades.

5. **Network Upgrade Activated**: after the network upgrade is activated, the EIP will be live on the Ethereum network. _Note: network upgrades are usually activated on testnets before being activated on the Ethereum Mainnet._

This flow, while very simplified, gives an overview of the significant stages for a protocol change to be activated on Ethereum. Now, let's look at the informal factors at play during this process.

## Informal Process {#informal-process}

### Understanding Prior Work {#prior-work}

EIP Champions should familiarise themselves with prior work and proposals before creating an EIP which can be seriously considered for deployment on the Ethereum Mainnet. This way, the EIP hopefully brings something new which hasn't been rejected before. The three main places to research this are the [EIP repository](https://github.com/ethereum/eips), [Ethereum Magicians](https://www.ethereum-magicians.org/) and [ethresear.ch](https://www.ethresear.ch/).

### Working Groups {#working-groups}

An initial EIP is unlikely to be implemented on the Ethereum Mainnet without edits or changes. Generally, EIP Champions will work with a subset of Protocol Developers to specify, implement, test, iterate, and finalize their proposal. Historically, these working groups have required several months (and sometimes years!) of work. Similarly, EIP Champions for such changes should involve relevant Application/Tooling Developers early in their efforts to gather end-user feedback and mitigate any deployment risks.

### Community Consensus {#community-consensus}

Unfortunately, there is no clear playbook on how to handle contentious proposals. Since they have no way to force people to adopt network upgrades, Protocol Developers will generally avoid including EIPs that are contentious amongst various stakeholder groups.

As the champion of a contentious EIP, you should try and build consensus, address objections and document community support for your proposal. Given the size and diversity of the Ethereum community, there isn't a single metric (e.g. a coin vote) that can be used, and EIP Champions are expected to adapt to the circumstances of their proposal.

Beyond the security of the Ethereum network, significant weight is usually placed on what Application/Tooling Developers and Application Users value, given that their using and developing on Ethereum is what makes the ecosystem attractive for other stakeholders.

<Divider />

## Handling disagreements {#disagreements}

Having many stakeholders with different motivations and beliefs means that disagreements are not uncommon.

Generally, disagreements are handled with long-form discussion to understand the root of the problem. Typically, one group concedes, or a happy medium is achieved. If one group feels strongly enough, forcing through a particular change could result in a split chain. A split chain is when some stakeholders protest implementing a protocol change resulting in different, incompatible versions of the protocol operating, from which two distinct blockchains emerge.

### The DAO fork {#dao-fork}

Forks are when major technical upgrades or changes need to be made to the network and change the "rules" of the protocol. [Ethereum clients](/developers/docs/nodes-and-clients/) must update their software to implement the new fork rules.

The DAO fork was in response to the [2016 DAO attack](https://www.coindesk.com/understanding-dao-hack-journalists) where an insecure [DAO](/glossary/#dao) contract was drained of over 3.6 million ETH in a hack. The fork moved the funds from the faulty contract to a new contract allowing anyone who lost funds in the hack to recover them.

This course of action was voted on by the Ethereum community. Any ETH holder was able to vote via a transaction on [a voting platform](http://v1.carbonvote.com/). The decision to fork reached over 85% of the votes.

Some miners refused to fork because the DAO incident wasn't a defect in the protocol. They went on to form [Ethereum Classic](https://ethereumclassic.org/).

Watch more on the DAO hack:

<iframe width="100%" height="315px" src="https://www.youtube.com/embed/rNeLuBOVe8A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<Divider />

## Beacon Chain Development {#beacon-chain}

The Ethereum governance process often trades off speed and efficiency for openness and inclusivity. In order to accelerate the development of the Beacon Chain, it was launched separately from the proof of work Ethereum network and followed its own governance practices.

While the specification and implementations development has always been fully open source, the formal processes used to propose updates described above weren't used. This allowed changes to be specified and agreed upon quicker by researchers and implementers.

When the Beacon Chain merges with the Ethereum execution layer, the governance process to propose changes will be harmonized.

<ButtonLink to="/eth2/merge/">More on the merge</ButtonLink>

<Divider />

## How can I get involved? {#get-involved}

- [Propose an EIP](/eips/#participate)
- [Discuss current proposals](https://ethereum-magicians.org/)
- [Get involved in R&D discussion](https://discord.gg/mncqtgVSVw)
- [Run a node](/developers/docs/nodes-and-clients/)

## Further reading {#further-reading}

Governance in Ethereum isn’t rigidly defined. Various community participants have diverse perspectives on it. Here are a few of them:

- [Governance on Ethereum](https://docs.ethhub.io/ethereum-basics/governance/) – _ETHHub_
- [How does Ethereum Governance work?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [How Ethereum governance works](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
