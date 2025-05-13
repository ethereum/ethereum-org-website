---
title: Future-proofing Ethereum
description: These upgrades cement Ethereum as the resilient, decentralized base layer for the future, whatever it may hold.
lang: en
image: /images/roadmap/roadmap-future.png
alt: "Ethereum roadmap"
template: roadmap
---

Some parts of the roadmap are not necessarily required for scaling or securing Ethereum in the near-term, but set Ethereum up for stability and reliability far into the future.

## Quantum resistance {#quantum-resistance}

Some of the [cryptography](/glossary/#cryptography) securing present-day Ethereum will be compromised when quantum computing becomes a reality. Although quantum computers are probably decades away from being a genuine threat to modern cryptography, Ethereum is being built to be secure for centuries to come. This means making [Ethereum quantum resistant](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) as soon as possible.

The challenge facing Ethereum developers is that the current [proof-of-stake](/glossary/#pos) protocol relies upon a very efficient signature scheme known as BLS to aggregate votes on valid [blocks](/glossary/#block). This signature scheme is broken by quantum computers, but the quantum resistant alternatives are not as efficient.

The [“KZG” commitment schemes](/roadmap/danksharding/#what-is-kzg) used in several places across Ethereum to generate cryptographic secrets are known to be quantum-vulnerable. Currently, this is circumvented using “trusted setups” (for which the main setup ceremony completed successfully in 2023), where many users generated randomness that cannot be reverse-engineered by a quantum computer. However, the ideal long-term solution would be to incorporate quantum safe cryptography instead. There are two leading approaches that could become efficient replacements for the BLS scheme: [STARK-based](https://hackmd.io/@vbuterin/stark_aggregation) and [lattice-based](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) signing. **These are still being actively researched and prototyped**.

[Read about KZG and trusted setups](/roadmap/danksharding#what-is-kzg)

## Simpler and more efficient Ethereum {#simpler-more-efficient-ethereum}

Complexity creates opportunities for bugs or vulnerabilities that can be exploited by attackers. Therefore, part of the roadmap is simplifying Ethereum and removing or modifying code that has hung around through various upgrades but is no longer needed or can now be improved upon. A leaner, simpler codebase is easier for developers to maintain and reason about.

To make the [Ethereum Virtual Machine (EVM)](/developers/docs/evm) simpler and more efficient, improvements are continuously researched and implemented. This involves both addressing legacy components and introducing optimizations.

**Recent Changes Implemented:**

- **Gas Calculation Overhaul:** The way [gas](/glossary/#gas) is calculated was significantly improved with **EIP-1559 (implemented in the London upgrade, 2021)**, introducing a base fee and burn mechanism for more predictable transaction pricing.
- **`SELFDESTRUCT` Restriction:** The `SELFDESTRUCT` opcode, while rarely used, posed potential risks. Its functionality was heavily **restricted in the Dencun upgrade (March 2024) via EIP-6780** to mitigate dangers, especially concerning state management.
- **Modernized Transaction Types:** New transaction formats have been introduced (e.g., via **EIP-2718** and **EIP-4844** for blobs in the Dencun upgrade) to support new features and improve efficiency over legacy types.

**Ongoing and future goals:**

- **Further `SELFDESTRUCT` Handling:** While restricted, the **potential complete removal** of the `SELFDESTRUCT` opcode is still considered for future upgrades to further simplify the EVM state. ([More context on SELFDESTRUCT issues](https://hackmd.io/@vbuterin/selfdestruct)).
- **Phasing Out Legacy Transactions:** Although [Ethereum clients](/glossary/#consensus-client) still support older transaction types for backward compatibility, the goal is to encourage migration to newer types and **potentially deprecate or fully remove support for the oldest formats** in the future.
- **Continued Gas Efficiency Research:** Exploration continues into **further refinements for gas calculation**, potentially including concepts like multi-dimensional gas to better reflect resource usage.
- **Optimized Cryptographic Operations:** Efforts are ongoing to **bring in more efficient methods for the arithmetic** underpinning cryptographic operations used within the EVM.

Similarly, there are updates that can be made to other parts of present-day Ethereum clients. One example is that current execution and consensus clients use a different type of data compression. It will be much easier and more intuitive to share data between clients when the compression scheme is unified across the whole network. This remains an area of exploration.

## Current progress {#current-progress}

Many of the long-term future-proofing upgrades, particularly **full quantum resistance for core protocols, are still in the research phase and may be several years away** from being implemented.

However, **significant progress has already been made on simplification efforts.** For example, key changes like the **restriction of `SELFDESTRUCT` (EIP-6780)** and the introduction of **blob-carrying transactions (EIP-4844)** were implemented in the **Dencun upgrade (March 2024)**. Work on harmonizing client compression schemes and other efficiency improvements also continues.

**Further reading**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Data structures](/developers/docs/data-structures-and-encoding)