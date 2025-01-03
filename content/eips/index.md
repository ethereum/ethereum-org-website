---
title: Ethereum Improvement Proposals (EIPs)
description: The basic information you need to understand EIPs
lang: en
---

# Introduction to Ethereum Improvement Proposals (EIPs) {#introduction-to-ethereum-improvement-proposals}

## What are EIPs? {#what-are-eips}

[Ethereum Improvement Proposals (EIPs)](https://eips.ethereum.org/) are standards specifying potential new features or processes for Ethereum. EIPs contain technical specifications for the proposed changes and act as the “source of truth” for the community. Network upgrades and application standards for Ethereum are discussed and developed through the EIP process.

Anyone within the Ethereum community has the ability to create an EIP. Guidelines for writing EIPs are included in [EIP-1](https://eips.ethereum.org/EIPS/eip-1). An EIP should primarily provide a concise technical specification with a small amount of motivation. The EIP author is responsible for reaching consensus within the community and documenting alternative opinions. Given the high technical barrier for submitting a well-formed EIP, historically, most EIP authors are typically application or protocol developers.

## Why do EIPs matter? {#why-do-eips-matter}

EIPs play a central role in how changes happen and are documented on Ethereum. They are the way for people to propose, debate, and adopt changes. There are [different types of EIPs](https://eips.ethereum.org/EIPS/eip-1#eip-types), including core EIPs for low-level protocol changes that affect consensus and require a network upgrade like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), and ERCs for application standards like [EIP-20](https://eips.ethereum.org/EIPS/eip-20) and [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Every network upgrade consists of a set of EIPs that need to be implemented by each [Ethereum client](/learn/#clients-and-nodes) on the network. This means that to stay in consensus with other clients on the Ethereum Mainnet, client developers need to make sure they have all implemented the required EIPs.

Along with providing a technical specification for changes, EIPs are the unit around which governance happens in Ethereum: anyone is free to propose one, and then various stakeholders in the community will debate to determine if it should be adopted as a standard or included in a network upgrade. Because non-core EIPs don't have to be adopted by all applications (for example, it is possible to create a fungible token that doesn't implement EIP-20), but core EIPs must be widely adopted (because all nodes must upgrade to stay part of the same network), core EIPs require a broader consensus within the community than non-core EIPs.

## History of EIPs {#history-of-eips}

The [Ethereum Improvement Proposals (EIPs) GitHub repository](https://github.com/ethereum/EIPs) was created in October 2015. The EIP process is based on the [Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips) process, which itself is based on the [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/) process.

EIP editors are tasked with process of reviewing EIPs for technical soundness, formatting issues, and correcting spelling, grammar, and code style. Martin Becze, Vitalik Buterin, Gavin Wood, and a few others were the original EIP editors from 2015 to late 2016.

The current EIP editors are

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Emeritus EIP editors are

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

If you would like to become an EIP editor, please check [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

EIP editors decide when a proposal is ready to become an EIP, and help EIP authors move their proposals forward. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) help organize meetings between the EIP editors and the community (see [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Full standardization process alongside with chart is described in [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Learn more {#learn-more}

If you’re interested to read more about EIPs, check out the [EIPs website](https://eips.ethereum.org/) and [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Here are some useful links:

- [A list of every Ethereum Improvement Proposal](https://eips.ethereum.org/all)
- [A description of all EIP types](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [A description of all EIP statuses](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Community education projects {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP is an educational video series that discusses Ethereum Improvement Proposal (EIPs) and key features of upcoming upgrades.*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research) — *EIPs For Nerds provides comprehensive, ELI5-style overviews of various Ethereum Improvement Proposals (EIPs), including core EIPs and application/infrastructure-layer EIPs (ERCs), to educate readers and shape consensus around proposed changes to the Ethereum protocol.* 
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf provides extra information for Ethereum Improvement Proposals (EIPs), including their status, implementation details, related pull requests, and community feedback.* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun provides the latest news on Ethereum Improvement Proposals (EIPs), updates on EIP meetings, and more.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight is a representation of state of Ethereum Improvement Proposals (EIPs) process & statistics as per information collected from different resources.*

## Participate {#participate}

Anyone can create an EIP. Before submitting a proposal, one must read [EIP-1](https://eips.ethereum.org/EIPS/eip-1) which outlines the EIP process and how to write an EIP, and solicit feedback on [Ethereum Magicians](https://ethereum-magicians.org/), where proposals are first discussed with the community before a draft is submitted.

## References {#references}

<cite class="citation">

Page content provided in part from [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) by Hudson Jameson

</cite>
