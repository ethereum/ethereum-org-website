---
title: zkEVM for L1 block verification
description: Learn how zero-knowledge proofs can verify Ethereum block execution, enabling higher throughput and lower validator requirements.
lang: en
template: roadmap
---

zkEVM is a technology that uses [zero-knowledge proofs](/zero-knowledge-proofs/) to verify Ethereum block execution. Instead of requiring every [validator](/glossary/#validator) to re-execute all transactions in a block, a single specialized actor (called a "prover") executes the block and generates a cryptographic proof that the execution was correct. Any node can then verify this proof—a process that is orders of magnitude cheaper than re-executing all the transactions.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Not to be confused with zkEVM rollups</AlertTitle>
<AlertDescription>
This page discusses using zkEVM to verify Ethereum L1 block execution. For zkEVM rollups that use ZK proofs to scale Ethereum as layer 2 solutions, see [zero-knowledge rollups](/developers/docs/scaling/zk-rollups/).
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

### Type 1 zkEVMs {#type-1-zkevm}

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

Note that proving itself requires significant computational resources, greater than that of current validator hardware. However, unlike validation, proving does not need to be decentralized in the same way: only one correct proof is needed per block, and anyone can verify it quickly. Research into prover markets, proof aggregation, and hardware acceleration aims to ensure that proving remains competitive and accessible rather than concentrated among a few large operators.

### Predictable finality {#predictable-finality}

Proof verification operates in constant time regardless of block complexity. This makes attestation timing more predictable and reduces missed attestations that can occur when validators struggle to process complex blocks in time.

## Real-time proving challenges {#realtime-proving}

The main challenge for zkEVM L1 verification is speed. Ethereum blocks are produced every 12 seconds, meaning proofs need to be generated within a similar timeframe to be useful for consensus.

Proving has become much faster. At the time of writing (November 2026), [Ethproofs](https://ethproofs.org/) reports that most Mainnet blocks are proven in under 10 seconds, within a single slot. Research now focuses on making real-time proving reliable for every block and affordable to run, through:

- **Parallelization**: Distributing proving work across multiple machines
- **Specialized hardware**: Designing circuits and hardware optimized for ZK proving
- **Algorithmic improvements**: More efficient proof systems and circuit designs
- **Incremental proving**: Generating proofs as transactions execute, rather than after

## Current research and implementations {#current-research}

The Ethereum Foundation's [zkEVM team](https://zkevm.ethereum.foundation/) leads this work. Key research tracks include:

- **Real-time proving**: Generating full block proofs within 12-second slots
- **Client integration**: Standardizing interfaces between execution clients and provers
- **Economic incentives**: Designing sustainable prover markets and fee structures

### Optional execution proofs {#optional-execution-proofs}

The zkEVM team's first proposed protocol change is [EIP-8025](https://eips.ethereum.org/EIPS/eip-8025) (Optional Execution Proofs). Provers that choose to take part generate proofs of each block's execution and share them on the network, and validators that opt in can check those proofs instead of re-executing the block. The proofs are a supplementary check: EIP-8025 does not change consensus validity rules, and a validator that hasn't received enough valid proofs in time attests as it does today.

EIP-8025 was proposed for the Hegotá upgrade, but the Hegotá planning EIP ([EIP-8081](https://eips.ethereum.org/EIPS/eip-8081)) lists it as declined for inclusion. It remains a draft.

### Implementation status {#implementations}

The [Ethereum Foundation's zkVM tracker](https://zkevm.ethereum.foundation/track) lists the zkVMs that meet its readiness criteria, which include being open source and being a 64-bit RISC-V machine that passes its ISA compliance tests. At the time of writing (November 2026), it lists:

| Implementation | Architecture |
|----------------|--------------|
| [LambdaVM](https://github.com/yetanotherco/lambda_vm) | RV64IM_Zicclsm |
| [OpenVM](https://github.com/openvm-org/openvm) | RV64IM_Zicclsm |
| [ZisK](https://github.com/0xPolygonHermez/zisk) | RV64IMFDAC_Zicclsm |

These use RISC-V based virtual machines to execute EVM bytecode, then generate ZK proofs of correct execution. Up-to-date test results are on the tracker, and proving performance for these and other zkVMs is tracked on [Ethproofs](https://ethproofs.org/).

## How zkEVM fits with other upgrades {#related-upgrades}

zkEVM L1 verification connects with several other Ethereum roadmap items:

- **New state tree**: A partitioned binary tree ([EIP-8297](https://eips.ethereum.org/EIPS/eip-8297)), proposed in place of the earlier [Verkle tree](/roadmap/verkle-trees/) design, would enable smaller witnesses for stateless verification and is designed to be easier to prove
- **[Statelessness](/roadmap/statelessness/)**: zkEVM is a key enabler—with ZK proofs of execution, nodes don't need full state to verify blocks
- **[PBS](/roadmap/pbs/)**: Enshrined PBS ([ePBS](/roadmap/glamsterdam/#epbs)), scheduled for the Glamsterdam upgrade, restructures the slot so that provers get more time between a block becoming available and the attestation deadline. Block builders could also integrate proof generation, or a separate prover market could emerge
- **[Faster finality](/roadmap/single-slot-finality/)**: Faster proof generation could support faster finality with cryptographic guarantees

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
zkEVM L1 verification is in active research and not yet integrated into production Ethereum clients. Optional execution proofs (EIP-8025) have been proposed as a first step, but they are not scheduled for a network upgrade.
</AlertDescription>
</AlertContent>
</Alert>

## Further reading {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - Official Ethereum Foundation zkEVM research hub
- [Ethproofs](https://ethproofs.org/) - Track the race to prove Ethereum in real-time
- [EIP-8025: Optional Execution Proofs](https://eips.ethereum.org/EIPS/eip-8025) - Technical specification
- [EIP-8025: bringing optional execution proofs to Hegotá](https://zkevm.ethereum.foundation/blog/eip-8025-optional-execution-proofs-hegota) - EF zkEVM team
- [zkevm.fyi](https://zkevm.fyi) - Technical book on zkEVM for L1
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) - Technical specifications
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Vitalik's overview of verification improvements
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) - Performance analysis from the EF team
