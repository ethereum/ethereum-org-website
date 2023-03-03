---
title: A more secure Ethereum
description: Ethereum is the most secure and decentralized smart-contract platform in existence. However, there are still improvements that can be made so that Ethereum stays resilient to any level of attack far into the future.
lang: en
image: ../../../assets/hackathon_transparent.png
alt: "Ethereum roadmap"
template: roadmap
---

Ethereum is already a very secure, decentralized smart-contract platform. However, there are still improvements that can be made so that Ethereum stays resilient to all kinds of attack far into the future. These include subtle changes to the way Ethereum clients deal with competing blocks, as well as increasing the speed the network considers blocks to be ["finalized"](/developers/docs/consensus-mechanisms/pos/#finality) (meaning they can't be changed without extreme economic losses to an attacker). There are also improvements that make censoring transactions much more difficult by making block proposers blind to the actual contents of their blocks, and new ways to identify when a client is censoring. Together these improvements will upgrade the proof-of-stake protocol so that users - from individuals to corporations - have instant confidence in their apps, data and assets on Ethereum.

## Staking withdrawals {#staking-withdrawals}

The upgrade from proof-of-work to proof-of-stake began with Ethereum pioneers “staking” their ETH in a deposit contract. That ETH is used to protect the network. However, that ETH cannot yet be unlocked and returned to the users. Allowing ETH to be withdrawn is a critical part of the proof-of-stake upgrade. In addition to withdrawals being a critical component of a fully-functional proof-of-stake protocol, allowing withdrawals is also good for Ethereum security as it allows stakers to use their ETH rewards for other non-staking purposes. This means users that want liquidity do not have to rely upon liquid staking derivatives (LSDs) that can be a centralizing force on Ethereum. This upgrade is due to be completed in Q1/Q2 2023.

<ButtonLink variant="outline-color" to="/staking/withdrawals/">Read about withdrawals</ButtonLink>

## Defending against attacks {#defending-against-attacks}

Even after withdrawals there are improvements that can be made to Ethereum's [proof-of-stake](/developers/docs/consensus-mechanisms/pos/) protocol. One is known as [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - a more secure fork-choice algorithm that makes certain sophisticated types of attack more difficult.

However, the relatively long time window does not provide a great user experience and creates opportunities for sophisticated "reorg" attacks. This problem can be solved using [**single slot finality (SSF)**](/roadmap/single-slot-finality). Right now there are 15 mins worth of blocks that an attacker could theoretically convince other validators to reconfigure. With single slot finality, there are 0. Users, from individuals to apps and exchanges, benefit from fast assurance that their transactions will not be reverted, and the network benefits by closing an attack vector.

<ButtonLink variant="outline-color" to="/roadmap/single-slot-finality/">Read about single slot finality</ButtonLink>

## Defending against censorship {#defending-against-censorship}

Another facet of security is preventing certain individuals or small groups of validators from becoming too influential. This includes building software that shares validator responsibilities across multiple nodes. This is known as Distributed Validator Technology (DVT). Staking pools are incentivized to use DVT because it allows multiple computers to collectively participate in validation, adding redundancy and fault-tolerance. It also splits validator keys across several systems, rather than having single operators running multiple validators. This makes it harder for dishonest operators to coordinate attacks on Ethereum. Overall, the idea is to derive security benefits by running validators as _communities_ rather than as individuals.

Implementing proposer-builder separation (PBS) will drastically improve Ethereum's built-in defenses against censorship. PBS allows one validator to create a block and another to broadcast it across the Ethereum network. In this system, the proposer could be blind to the actual transactions included, selecting blocks based on their economic value only. There are several add-ons to PBS that improve Ethereum's censorship resistance even further, such as encrypted transactions and inclusion lists.

<ButtonLink variant="outline-color" to="/roadmap/pbs/">Read about proposer-builder separation</ButtonLink>

## Protecting validators {#protecting-validators}

Although it is unlikely, it is possible that a sophisticated attacker could identify upcoming validators and spam them to prevent them from proposing blocks. Implementing [**secret leader election (SLE)**](/roadmap/secret-leader-election) will protect against this type of attack by preventing block proposers from being knowable in advance. This works by continually shuffling a set of cryptographic commitments representing candidate block proposers and using their order to determine which validator is selected in such a way that only the validators themselves know their ordering in advance.

<ButtonLink variant="outline-color" to="/roadmap/secret-leader-election">Read about secret leader election</ButtonLink>

## Current progress {#current-progress}

Staking withdrawals are the next major uprade coming to Ethereum. They should ship in Q1/Q2 2023. They have already been rolled out on public testnets and the next step in launching on Ethereum Mainnet. The other security upgrades on the roadmap are in advanced stages of research, but they are not expected to be implemented for some time. The next steps for view-merge, PBS, SSF and SLE is to finalize a specification and start building prototypes.
