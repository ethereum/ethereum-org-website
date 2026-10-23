---
title: A more secure Ethereum
description: Ethereum's roadmap hardens block production and censorship resistance today while preparing the protocol for the quantum era and decades of reliable operation.
lang: en
image: /images/roadmap/roadmap-security.png
alt: "Ethereum roadmap"
template: roadmap
summaryPoints:
  - Near-term hardening upgrades like enshrined proposer-builder separation and inclusion lists are in active development
  - Post-quantum preparation is underway years ahead of any credible quantum threat
  - Protocol simplification removes complexity and shrinks Ethereum's attack surface
---

Ethereum is already a very secure, decentralized [smart contract](/glossary/#smart-contract) platform. The roadmap aims to keep it that way for decades by **hardening the network today while preparing for threats that may only appear years from now**. Near-term upgrades are tracked at [forkcast.org](https://forkcast.org), and the longer-range draft roadmap is published at [strawmap.org](https://strawmap.org).

<ExpandableCard title="Is Ethereum secure today?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Yes. Ethereum has run continuously since 2015 without downtime. The improvements on this page make an already secure network harder to attack, censor, or disrupt.

</ExpandableCard>

## Trustless block building {#trustless-block-building}

Most Ethereum blocks today are assembled through a division of labor: specialized builders construct the most valuable block they can, and the [validator](/glossary/#validator) whose turn it is proposes the best offer. This keeps professional block building from concentrating [stake](/glossary/#staking) among the largest operators, but since 2022 it has relied on off-protocol software the network cannot verify.

**Enshrined proposer-builder separation (ePBS, or EIP-7732)** moves this split into the protocol, removing the need to trust relays, the third-party middlemen that currently pass blocks between builders and validators. ePBS is a headliner of the upcoming [Glamsterdam](/roadmap/glamsterdam/) upgrade, targeted for 2026. No Mainnet date has been set; client teams are testing it on devnets (temporary test networks).

<ButtonLink variant="outline" href="/roadmap/pbs/">More on proposer-builder separation</ButtonLink>

## Censorship resistance {#censorship-resistance}

A censorship-resistant network means nobody can stop a valid transaction from reaching the chain. **Fork-choice enforced inclusion lists (FOCIL, or EIP-7805)** give many validators a say in what a block must include: they publish lists of pending transactions that the block builder is required to include. No single actor can quietly leave your transaction out.

FOCIL is the consensus-layer headliner of Hegotá, the upgrade that follows Glamsterdam and is targeted for 2027. It was deliberately scheduled after Glamsterdam so that ePBS and FOCIL never ship as one untested combination. Research into encrypted mempools, which would hide the contents of waiting transactions until they are safely included in a block, continues.

## Faster finality {#faster-finality}

For users, [finality](/glossary/#finality) is the moment a transaction becomes permanent, when reversing it would cost an attacker an enormous amount of staked ETH. Today finality takes about 15 minutes, and **researchers want to shrink that dramatically**. The work began as single-slot finality, evolved into three-slot finality, and now continues as Minimmit, a one-round consensus protocol in the Lean Ethereum program introduced in July 2025. Finality in seconds is a long-range north star on the draft roadmap, targeting roughly 2029. This remains active research, and no finality upgrade is assigned to a fork yet.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">More on faster finality research</ButtonLink>

## Resilient validators {#resilient-validators}

A validator is usually one machine holding one signing key. **Distributed validator technology (DVT)** replaces that single machine with a committee of machines that share the key and sign together, so one computer failing or one key being stolen does not take the validator down. DVT is live in production and used by staking operators at scale. In January 2026, Vitalik Buterin proposed a simplified protocol-level variant called DVT-lite; it is an early proposal with no scheduled fork.

The network also protects itself through [client diversity](/developers/docs/nodes-and-clients/client-diversity/): Ethereum runs on several independently built software implementations, so a bug in one client leaves the rest of the network standing.

Two earlier research ideas, view-merge and secret leader election, are no longer active roadmap items.

<ButtonLink variant="outline" href="/staking/dvt/">More on distributed validator technology</ButtonLink>

## Quantum resistance {#quantum-resistance}

Ethereum uses [cryptography](/glossary/#cryptography) to keep the network secure and protect user funds. Eventually, some of these cryptographic methods will be **vulnerable to quantum computers**, which can solve specific mathematical problems exponentially faster than classical machines.

**No quantum computer can break Ethereum's cryptography today.** The hardware required does not yet exist at scale. But recent research suggests the gap is closing faster than previously expected. In March 2026, Google Quantum AI published a paper estimating that breaking 256-bit elliptic curve cryptography (the type Ethereum uses for account signatures) could require roughly 1,200 logical qubits, about 20 times fewer than earlier estimates.

Cryptographic transitions take years to plan and execute safely, so preparation is happening now, long before the hardware exists. Four areas have been identified as requiring post-quantum upgrades: validator consensus signatures (BLS), the commitment schemes used for data availability (KZG), account signatures (ECDSA), and the ZK-proof systems used by [rollups](/glossary/#rollups).

The Ethereum Foundation formed a dedicated **Post-Quantum Security team** in January 2026, and its work is tracked publicly at [pq.ethereum.org](https://pq.ethereum.org). Active work includes hash-based validator signatures (leanXMSS) paired with a minimal zkVM (leanVM) that aggregates the larger quantum-safe signatures efficiently, and weekly interop devnets with more than 10 client teams.

A key part of the transition strategy is **EIP-8141**, which introduces native [account abstraction](/roadmap/account-abstraction/). This allows individual accounts to choose their own signature verification, meaning users could switch to quantum-safe signatures without waiting for a single protocol-wide migration. EIP-8141 is being considered for the Hegotá upgrade. Core post-quantum infrastructure milestones target completion by approximately 2029. These are planning targets and may shift.

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

No. No quantum computer today can break Ethereum's cryptography. The work described on this page is early preparation for a threat that is still years away. When post-quantum wallets become available, wallet software will guide you through the migration. For now, there is nothing you need to do.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">More on quantum resistance</ButtonLink>

## Simpler and more efficient protocol {#simpler-and-more-efficient-protocol}

Complexity creates opportunities for bugs and vulnerabilities. Part of the roadmap focuses on **simplifying Ethereum and removing technical debt** so the protocol is easier to maintain, audit, and reason about. A simpler protocol also gives attackers less surface to probe.

Delivered so far:

- **[Pectra (May 2025)](/roadmap/pectra/)**: Introduced EIP-7702, which lets externally owned accounts temporarily delegate to smart contract code, a stepping stone toward full account abstraction.
- **[Fusaka (December 2025)](/roadmap/fusaka/)**: Deployed PeerDAS (EIP-7594), which distributes the data availability workload across the network. Also increased blob parameters, expanding data throughput for rollups.
- **[Dencun (March 2024)](/roadmap/dencun/)**: Introduced blob transactions (EIP-4844) for cheaper rollup data and restricted `SELFDESTRUCT` (EIP-6780) to remove a long-standing source of complexity.
- **[Shapella (April 2023)](/staking/withdrawals/)**: Enabled validators to withdraw staked ETH (EIP-4895), removing an early constraint of [proof-of-stake](/glossary/#pos) staking.
- **London (August 2021)**: Overhauled gas pricing with EIP-1559, introducing a base fee and burn mechanism for more predictable transaction costs.

In progress:

- **Glamsterdam (targeted for 2026)**: The headliners are ePBS (EIP-7732) and block-level access lists (EIP-7928), with gas repricing also being considered.
- **Hegotá (targeted for 2027)**: FOCIL (EIP-7805) is the consensus-layer headliner. Being considered for inclusion: EIP-8141 (native account abstraction).
- **Ongoing**: Efforts to simplify the [EVM](/developers/docs/evm/), harmonize client implementations, and phase out deprecated features continue across client teams. Work on statelessness (letting participants verify the chain without storing all of its data) is being redesigned around quantum-safe binary hash trees, with the final approach yet to be confirmed.

## Current progress {#current-progress}

As of mid 2026:

- **Block building and censorship resistance**: ePBS and block-level access lists are running on Glamsterdam devnets. FOCIL is planned for Hegotá, targeted for 2027.
- **Finality**: Minimmit and the wider Lean Ethereum consensus work remain in active research with no fork assignment yet.
- **Quantum resistance**: Weekly post-quantum interop devnets are running, and core infrastructure milestones target approximately 2029.
- **Simplification**: Pectra and Fusaka shipped; Glamsterdam and Hegotá carry the next round of cleanups.

No part of this work is finished, and all timelines are estimates that may shift.

## Further reading {#further-reading}

- [Forkcast: Ethereum network upgrade tracker](https://forkcast.org)
- [Strawmap: a draft Ethereum L1 roadmap](https://strawmap.org) - _EF Architecture_
- [Post-Quantum Ethereum](https://pq.ethereum.org) - _Ethereum Foundation_
- [Lean Ethereum roadmap tracker](https://leanroadmap.org) - _ReamLabs_
- [Proof-of-stake and finality](/developers/docs/consensus-mechanisms/pos/#finality)
- [The EVM](/developers/docs/evm/)
