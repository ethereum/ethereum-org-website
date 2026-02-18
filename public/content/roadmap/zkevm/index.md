---
title: zkEVM for L1 block verification
description: Learn how zero-knowledge proofs can verify Ethereum block execution, enabling higher throughput and lower validator requirements.
lang: en
---

# zkEVM for L1 block verification {#zkevm-l1}

zkEVM is a technology that uses [zero-knowledge proofs](/zero-knowledge-proofs/) to verify Ethereum block execution. Instead of requiring every [validator](/glossary/#validator) to re-execute all transactions in a block, a single specialized actor (called a "prover") executes the block and generates a cryptographic proof that the execution was correct. Any node can then verify this proof—a process that is orders of magnitude cheaper than re-executing all the transactions.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Not to be confused with zkEVM rollups</AlertTitle>
<AlertDescription>
This page discusses using zkEVM to verify Ethereum L1 block execution. For zkEVM rollups that use ZK proofs to scale Ethereum as Layer 2 solutions, see <a href="/developers/docs/scaling/zk-rollups/">Zero-knowledge rollups</a>.
</AlertDescription>
</AlertContent>
</Alert>

## The re-execution problem {#reexecution-problem}

Today, Ethereum uses an "N-of-N" verification model: every validator must independently re-execute every transaction in every block to verify that the proposed state changes are correct. While this approach is maximally trustless, it creates a fundamental bottleneck.

The problem is that Ethereum's throughput is limited by what the average validator can process. Raising the [gas limit](/glossary/#gas-limit) would allow more transactions per block, but it would also raise the hardware requirements for validators. This threatens decentralization—if running a validator requires expensive hardware, fewer people can participate in securing the network.

zkEVM offers a way out of this tradeoff. By shifting from "everyone re-executes" to "one proves, everyone verifies," Ethereum can safely increase the gas limit without raising validator hardware requirements.

## How zkEVM L1 verification works {#how-it-works}

zkEVM verification transforms block validation into a "1-of-N" model:

1. **Execution**: A prover executes all transactions in a block, tracking every state change
2. **Proving**: The prover generates a cryptographic proof (a [SNARK or STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)) that attests to the correctness of the execution
3. **Verification**: Validators verify the proof instead of re-executing transactions—this is dramatically cheaper than full re-execution

The security guarantee remains the same: if the execution was incorrect, no valid proof can be generated. But now, instead of every node doing expensive computation, only the prover does—and verification is cheap enough that it doesn't constrain the gas limit.

### What is a Type 1 zkEVM? {#type-1-zkevm}

zkEVMs are classified into types based on their compatibility with Ethereum:

- **Type 1**: Fully Ethereum-equivalent. No modifications to the EVM, so any Ethereum block can be proven exactly as-is
- **Type 2-4**: Make various tradeoffs, modifying EVM behavior to make proving easier

For L1 verification, Type 1 is essential. The zkEVM must be able to prove any valid Ethereum block, including edge cases and historical blocks. Any deviation from Ethereum's exact behavior would create consensus issues.

The Ethereum Foundation's zkEVM research focuses on Type 1 implementations that are fully compatible with existing Ethereum execution.

## Benefits for Ethereum {#benefits}

### Higher throughput {#higher-throughput}

When verification is cheap, the gas limit can safely increase. This expands network capacity and helps stabilize fees during high-demand periods. The current gas limit is partly constrained by validator hardware—zkEVM removes this constraint.

### Stronger decentralization {#stronger-decentralization}

With zkEVM verification, validators only need to verify proofs rather than execute transactions. This dramatically lowers the hardware requirements for running a validator, enabling more people to participate in securing the network. Greater validator diversity strengthens Ethereum's censorship resistance and resilience.

### Predictable finality {#predictable-finality}

Proof verification operates in constant time regardless of block complexity. This makes attestation timing more predictable and reduces missed attestations that can occur when validators struggle to process complex blocks in time.

## Real-time proving challenges {#realtime-proving}

The main challenge for zkEVM L1 verification is speed. Ethereum blocks are produced every 12 seconds, meaning proofs need to be generated within a similar timeframe to be useful for consensus.

Current zkEVM implementations can take minutes to hours to prove a single block. Research focuses on closing this gap through:

- **Parallelization**: Distributing proving work across multiple machines
- **Specialized hardware**: Designing circuits and hardware optimized for ZK proving
- **Algorithmic improvements**: More efficient proof systems and circuit designs
- **Incremental proving**: Generating proofs as transactions execute, rather than after

## Current research and implementations {#current-research}

The Ethereum Foundation funds zkEVM research through the [Privacy and Scaling Explorations (PSE)](https://pse.dev/) team. Key research tracks include:

- **Real-time proving**: Generating full block proofs within 12-second slots
- **Client integration**: Standardizing interfaces between execution clients and provers
- **Economic incentives**: Designing sustainable prover markets and fee structures

### Implementation status {#implementations}

Several zkVM implementations are being developed and tested for Ethereum block proving:

| Implementation | Architecture | Test Status |
|----------------|--------------|-------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im | 47/47 passing |
| [RISC0](https://github.com/risc0/risc0) | rv32im | 47/47 passing |
| [Airbender](https://github.com/matter-labs/era-boojum) | rv32im | 46/47 passing |
| [Jolt](https://github.com/a16z/jolt) | rv32im | 47/47 passing |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima | 82/82 passing |

These implementations use RISC-V based virtual machines to execute EVM bytecode, then generate ZK proofs of correct execution. Progress is tracked at the [zkEVM Foundation's tracker](https://zkevm.ethereum.foundation/zkvm-tracker).

## How zkEVM fits with other upgrades {#related-upgrades}

zkEVM L1 verification connects with several other Ethereum roadmap items:

- **[Verkle Trees](/roadmap/verkle-trees/)**: Enable smaller witnesses for stateless verification, reducing the data provers need to work with
- **[Statelessness](/roadmap/statelessness/)**: zkEVM is a key enabler—with ZK proofs of execution, nodes don't need full state to verify blocks
- **[PBS](/roadmap/pbs/)**: Block builders could potentially integrate proof generation, or a separate prover market could emerge
- **[Single Slot Finality](/roadmap/single-slot-finality/)**: Faster proof generation could enable single-slot finality with cryptographic guarantees

## Current progress {#current-progress}

zkEVM L1 verification is in active research. Key milestones:

- Multiple zkVM implementations passing comprehensive test suites
- Research into real-time proving approaches
- Client integration specifications being developed

This technology is not yet integrated into production Ethereum clients. Full mainnet deployment is expected to take several years as proving speeds improve and the technology matures.

## Further reading {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) — Official Ethereum Foundation zkEVM research hub
- [zkevm.fyi](https://zkevm.fyi) — Technical book on zkEVM for L1
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) — Technical specifications
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) — Vitalik's overview of verification improvements
- [Benchmarking zkVMs for Ethereum](https://zkevm.ethereum.foundation/blog) — Performance analysis from the EF team
