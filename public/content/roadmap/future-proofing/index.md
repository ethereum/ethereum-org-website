---
title: Future-proofing Ethereum and crypto quantum security
description: These upgrades cement Ethereum as the resilient, decentralized base layer for the future, whatever it may hold.
lang: en
image: /images/roadmap/roadmap-future.png
alt: "Ethereum roadmap"
template: roadmap
summaryPoints:
  - Post-quantum cryptography protects Ethereum from future quantum computer threats
  - Protocol simplification makes Ethereum easier to maintain and more secure
  - Recent upgrades have already delivered meaningful efficiency improvements
---

Some parts of the roadmap are not about scaling or securing Ethereum right now. They are about making Ethereum **stable and reliable far into the future**. This means preparing for new kinds of threats and removing unnecessary complexity from the protocol.

## Quantum resistance {#quantum-resistance}

Ethereum uses [cryptography](/glossary/#cryptography) to keep the network secure and protect user funds. Some of these cryptographic methods will eventually be **vulnerable to quantum computers**, a new type of computer that solves certain mathematical problems much faster than today's machines.

**No quantum computer can break Ethereum's cryptography today.** Current quantum hardware is far from powerful enough. But recent research suggests the gap is closing faster than previously expected. In March 2026, Google Quantum AI published a paper estimating that breaking 256-bit elliptic curve cryptography (the type Ethereum uses for account signatures) could require roughly 1,200 logical qubits, about 20 times fewer than earlier estimates. Google has set a 2029 internal deadline for migrating its own systems to quantum-safe cryptography.

Cryptographic transitions take years to plan and execute. Ethereum's security model is designed to last decades. That is why preparation is happening now, not as a reaction to an emergency.

### What is at risk? {#what-is-at-risk}

Vitalik Buterin has identified **four areas** of Ethereum's cryptography that need post-quantum upgrades:

1. **Consensus signatures (BLS)**: [Validators](/glossary/#validator) use BLS signatures to vote on valid [blocks](/glossary/#block). Quantum computers could break these.
2. **Data availability (KZG commitments)**: The [commitment schemes](/roadmap/danksharding/#what-is-kzg) that help Ethereum scale rely on math that quantum computers can attack.
3. **Account signatures (ECDSA)**: The signature scheme that protects individual Ethereum accounts. A quantum computer could derive a private key from a public key, potentially allowing theft of funds.
4. **Application-layer ZK-proofs**: Zero-knowledge proof systems used by rollups and other applications rely on cryptographic assumptions that quantum computers could undermine.

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

No. No quantum computer today can break Ethereum's cryptography. The work described on this page is preparation for the future, not a response to an active threat. When post-quantum wallets become available, wallet software will guide you through the migration. For now, there is nothing you need to do.

</ExpandableCard>

### What is being done? {#what-is-being-done}

The Ethereum Foundation formed a dedicated **Post-Quantum Security team** in January 2026. The team's work is tracked publicly at [pq.ethereum.org](https://pq.ethereum.org).

Active work includes:

- **Hash-based signatures (leanXMSS)**: A quantum-safe replacement for validator signatures, built on hash functions that quantum computers cannot efficiently break.
- **Minimal zkVM (leanVM)**: A tool for aggregating quantum-safe signatures efficiently, so the network does not slow down after the transition.
- **Weekly interop testing**: More than 10 client teams participate in regular post-quantum devnets.
- **Poseidon Prize**: A $1 million research prize targeting improvements in hash-based cryptographic primitives.
- **NIST standards**: The U.S. National Institute of Standards and Technology finalized three post-quantum cryptography standards in August 2024 (ML-KEM, ML-DSA, SLH-DSA). Ethereum's work builds on these foundations.

A key part of the transition strategy is **EIP-8141**, which introduces native [account abstraction](/roadmap/account-abstraction/). This allows individual accounts to choose their own signature verification, meaning users could switch to quantum-safe signatures **without waiting for a single protocol-wide migration**. EIP-8141 is being considered for the Hegota hard fork (planned for H2 2026).

The Ethereum Foundation has outlined structured fork milestones targeting completion of core post-quantum infrastructure by approximately 2029. These are planning targets, not guaranteed commitments.

[Read our detailed guide to post-quantum cryptography on Ethereum](/roadmap/future-proofing/quantum-resistance/)

## Simpler and more efficient Ethereum {#simpler-more-efficient-ethereum}

Complexity creates opportunities for bugs and vulnerabilities. Part of the roadmap focuses on **simplifying Ethereum and removing technical debt** so the protocol is easier to maintain, audit, and reason about.

### What has been delivered {#what-has-been-delivered}

Several recent upgrades have made Ethereum simpler and more efficient:

- **Pectra (7-May-2025)**: Introduced EIP-7702, which lets externally owned accounts temporarily delegate to smart contract code, a stepping stone toward full [account abstraction](/roadmap/account-abstraction/). Also added the BLS12-381 precompile (EIP-2537), onchain deposit handling (EIP-6110), historical block hash access in the EVM (EIP-2935), and increased the maximum effective balance for validators (EIP-7251).
- **Fusaka (3-Dec-2025)**: Deployed PeerDAS (EIP-7594), a peer-to-peer data availability sampling system that distributes the data availability workload across the network. Also increased blob parameters, expanding data throughput for [rollups](/glossary/#rollups).
- **Dencun (March 2024)**: Introduced blob transactions (EIP-4844) for cheaper rollup data and restricted `SELFDESTRUCT` (EIP-6780) to remove a long-standing source of complexity.
- **London (2021)**: Overhauled [gas](/glossary/#gas) pricing with EIP-1559, introducing a base fee and burn mechanism for more predictable transaction costs.

### What is in progress {#what-is-in-progress}

- **Glamsterdam (planned H1 2026)**: Expected to include enshrined proposer-builder separation (EIP-7732), block-level access lists (EIP-7928), and gas repricing to better align costs with actual resource usage.
- **Hegota (planned H2 2026)**: Expected to include [Verkle Trees](/roadmap/verkle-trees/), replacing the current data structure with a more efficient one that enables stateless clients. Also targeted for EIP-8141 (native account abstraction).
- **Ongoing**: Efforts to simplify the [EVM](/developers/docs/evm/), harmonize client implementations, and phase out deprecated features continue across the Ethereum development community.

## Current progress {#current-progress}

As of early 2026:

**Simplification and efficiency**: Significant progress. Pectra and Fusaka delivered real improvements in account flexibility, data availability, and validator operations. Glamsterdam and Hegota are in active development with clear EIP targets.

**Post-quantum cryptography**: Active research and early implementation. The Ethereum Foundation has a dedicated team, funded research prizes, and weekly interop devnets running across multiple clients. However, **no post-quantum code is in production on Ethereum Mainnet yet**. The structured fork milestones target 2029 for completion.

**Account abstraction and signature agility**: EIP-7702 shipped in Pectra. EIP-8141, being considered for Hegota, will allow accounts to use any signature scheme, giving users a path to adopt quantum-safe signatures before the full protocol transition is complete.

No part of this work is finished. Timelines are targets, not guarantees. But the scope and pace of active development represent a clear commitment to keeping Ethereum secure and efficient for the long term.

**Further reading**

- [pq.ethereum.org](https://pq.ethereum.org)
- [Post-quantum cryptography on Ethereum](/roadmap/future-proofing/quantum-resistance/)
- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Data structures](/developers/docs/data-structures-and-encoding/)
