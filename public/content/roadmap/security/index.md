---
title: A more secure Ethereum
description: Ethereum is the most secure and decentralized smart-contract platform in existence. However, there are still improvements that can be made so that Ethereum stays resilient to any level of attack far into the future.
lang: en
image: /images/roadmap/roadmap-security.png
alt: "Ethereum roadmap"
template: roadmap
---

**Ethereum is already a very secure**, decentralized [smart-contract](/glossary/#smart-contract) platform. However, there are still improvements that can be made so that Ethereum stays resilient to all kinds of attack far into the future. These include subtle changes to the way [Ethereum clients](/glossary/#consensus-client) deal with competing [blocks](/glossary/#block), as well as increasing the speed the network considers blocks to be ["finalized"](/developers/docs/consensus-mechanisms/pos/#finality) (meaning they can't be changed without extreme economic losses to an attacker).

There are also improvements that make censoring transactions much more difficult by making block proposers blind to the actual contents of their blocks, and new ways to identify when a client is censoring. Together these improvements will upgrade the [proof-of-stake](/glossary/#pos) protocol so that users - from individuals to corporations - have instant confidence in their apps, data and assets on Ethereum.

## Staking withdrawals {#staking-withdrawals}

The upgrade from [proof-of-work](/glossary/#pow) to proof-of-stake began with Ethereum pioneers “staking” their ETH in a deposit contract. That ETH is used to protect the network. There has been a second update on April 12, 2023 to allow withdraw the staked ETH. Since then validators can freely stake or withdraw ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Read about withdrawals</ButtonLink>

## Defending against attacks {#defending-against-attacks}

There are improvements that can be made to Ethereum's proof-of-stake protocol. One is known as [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - a more secure [fork](/glossary/#fork)-choice algorithm that makes certain sophisticated types of attack more difficult.

Reducing the time Ethereum takes to [finalize](/glossary/#finality) blocks would provide a better user experience and prevent sophisticated "reorg" attacks where attackers try to reshuffle very recent blocks to extract profit or censor certain transactions. [**Single slot finality (SSF)**](/roadmap/single-slot-finality/) is a **way to minimize the finalization delay**. Right now there are 15 mins worth of blocks that an attacker could theoretically convince other validators to reconfigure. With SSF, there are 0. Users, from individuals to apps and exchanges, benefit from fast assurance that their transactions will not be reverted, and the network benefits by shutting down a whole class of attacks.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Read about single slot finality</ButtonLink>

## Defending against censorship {#defending-against-censorship}

Decentralization prevents individuals or small groups of [validators](/glossary/#validator) from becoming too influential. New staking technologies can help to ensure Ethereum's validators stay as decentralized as possible while also defending them against hardware, software and network failures. This includes software that shares validator responsibilities across multiple [nodes](/glossary/#node). This is known as **distributed validator technology (DVT)**. [Staking pools](/glossary/#staking-pool) are incentivized to use DVT because it allows multiple computers to collectively participate in validation, adding redundancy and fault-tolerance. It also splits validator keys across several systems, rather than having single operators running multiple validators. This makes it harder for dishonest operators to coordinate attacks on Ethereum. Overall, the idea is to derive security benefits by running validators as _communities_ rather than as individuals.

<ButtonLink variant="outline-color" href="/staking/dvt/">Read about distributed validator technology</ButtonLink>

Implementing **proposer-builder separation (PBS)** will drastically improve Ethereum's built-in defenses against censorship. PBS allows one validator to create a block and another to broadcast it across the Ethereum network. This ensures that the gains from professional profit-maximizing block building algorithms are shared more fairly across the network, **preventing stake from concentrating** with the best-performing institutional stakers over time. The block proposer gets to select the most profitable block offered to them by a market of block builders. To censor, a block proposer would often have to choose a less profitable block, which would be **economically irrational and also obvious to the rest of the validators** on the network.

There are potential add-ons to PBS, such as encrypted transactions and inclusion lists, that could further improve Ethereum's censorship resistance. These make the block builder and proposer blind to the actual transactions included in their blocks.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Read about proposer-builder separation</ButtonLink>

## Protecting validators {#protecting-validators}

It is possible that a sophisticated attacker could identify upcoming validators and spam them to prevent them from proposing blocks; this is known as a **denial of service (DoS)** attack. Implementing [**secret leader election (SLE)**](/roadmap/secret-leader-election) will protect against this type of attack by preventing block proposers from being knowable in advance. This works by continually shuffling a set of cryptographic commitments representing candidate block proposers and using their order to determine which validator is selected in such a way that only the validators themselves know their ordering in advance.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Read about secret leader election</ButtonLink>

## Current progress {#current-progress}

**Security upgrades on the roadmap are in advanced stages of research**, but they are not expected to be implemented for some time. The next steps for view-merge, PBS, SSF and SLE is to finalize a specification and start building prototypes.
