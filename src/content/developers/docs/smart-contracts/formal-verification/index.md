---
title: Formal verification of smart contracts
description: An overview of formal verification techniques for Ethereum smart contracts
lang: en
sidebar: true
---

[Smart contracts](/developers/docs/smart-contracts/) are making it possible to create decentralized, trustless, and robust applications that introduce new use-cases and unlock value for users. Because smart contracts handle large amounts of value, security is a critical consideration for developers.

Reliability is a highly desired quality of smart contracts, and both users and developers want assurances that a smart contract will work as intended. This is important because code in the [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) is immutable, which rules out the possibility of fixing bugs or retrieving funds lost to malicious attacks.

Formal verification is one of the recommended techniques for [testing smart contracts](/developers/docs/smart-contracts/testing/) and improving [smart contract security](/developers/docs/smart-contracts/security/). Formal verification involves testing a program (a smart contract in this case) to ensure it behaves as expected during execution.

## What is formal verification? {#what-is-formal-verification}

Formal verification is used to evaluate the _correctness_ of software programs and confirm compliance with predefined specifications using formal methods of mathematics. [More on formal verification](https://en.wikipedia.org/wiki/Formal_verification).

In the context of Ethereum, formal verification usually attempts to prove that a smart contract has certain properties, often called invariants. If these properties are violated, attackers can cause harm to protocols and users.

### Why formal verification is necessary {#why-formal-verification-is-necessary}

While manual code audits are great, human auditors cannot possibly cover every possible vulnerability. Also, an audit may reveal bugs in contract code, but it cannot confirm the absence of vulnerabilities.

Formal verification is grounded in [formal methods](https://en.wikipedia.org/wiki/Formal_methods), which use mathematically rigorous methods for specifying, developing, and verifying software. Formal verification allows developers to mathematically model software programs and create formalized specifications, making testing more precise and robust.

Specifications are a collection of properties used to describe the intended behavior of a smart contract. Formal verification can prove that a contract behaves exactly as described in the specification. Unlike testing based on informal assumptions, formal verification provides mathematical proof of a smart contract's correctness.

Formal verification is critical for smart contracts because minor vulnerabilities can lead to massive losses. For example, the [Parity Multisig wallet hack](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/) was the result of an unintended function that allowed the hacker to override owner settings and drain the contract of up to $31 million in ETH. 

## How does formal verification work? {#how-does-formal-verification-work}

Formal verification of Ethereum smart contracts can either be executed at the language level or bytecode level or both. Here’s a quick overview of both approaches:

### High-level verification {#high-level-verification}

Source code for Ethereum smart contracts is usually [written in high-level programming languages](/developers/docs/smart-contracts/languages/), such as Solidity, Vyper, or Yul. The source code defines the business logic, which determines how users can interact with the contract and how the contract should behave in response to certain inputs.

Formal verification can help verify the correctness of a contract's source code. This requires transforming the business logic into a set of formalized, high-level specifications. These specifications must adequately and comprehensively express the desired functionality of the smart contract.

The actual verification at this stage consists of checking the source code and confirming that it satisfies all specifications and requirements. Therefore, high-level verification gives developers a high degree of confidence that the source code has no bugs.

### Low-level verification {#low-level-verification}

Smart contracts written in high-level languages are compiled into **bytecode**—low-level machine instructions that the Ethereum Virtual Machine (EVM) understands. Source code may undergo subtle changes during compilation, which may cause the contract to execute operations not defined in high-level specifications.

Formal verification can help determine the correctness of a contract's compiled bytecode. This requires creating bytecode-based, low-level specifications that define how a smart contract should behave in the EVM environment.

Low-level formal verification uses techniques like static analysis and fuzzing to ensure that contract bytecode satisfies all properties. This assures developers that the business logic specified in the source code is what will run in the context of the EVM.

## Advantages of formal verification {#advantages-of-formal-verification}

Formal verification is useful for the following reasons:

### 1. Comprehensiveness {#comprehensiveness}

Formal verification uses automated tests, which can be run many times over. A formal verification assessment will likely cover the entire contract, reducing edge cases and hidden vulnerabilities.

### 2. Rigorous testing {#rigorous-testing}

Although effective, manual audits have some elements of human error and uncertainty—which can have costly consequences in cases. Formal verification approaches contract auditing in a formal and systematic manner that reduces ambiguity to the barest minimum.

Formal verification transforms informal specifications into properties grounded in formal logic. This makes it easier to test assertions and evaluate the correctness of smart contract programs.

### 3. Faster development cycle {#faster-development-cycle}

Automated formal verification can be more efficient than line-by-line analysis of smart contract code. Formal verification approaches cover a larger surface area in a short timeframe. This can speed up the testing and development cycle for developers.

## Disadvantages of formal verification {#disadvantages-of-formal-verification}

Although formal verification is great for testing smart contracts, it has some disadvantages:

### 1. Difficulty in creating formal specifications {#difficulty-in-creating-formal-specifications}

A prerequisite for formal verification is creating formal specifications, which can take a lot of time and effort. This will likely be the most difficult part of using formal verification for smart contracts.

### 2. False negatives {#false-negatives}

Formal verification can only check if the execution of the smart contract matches formal specifications. If specifications are poorly written, certain vulnerabilities cannot be detected by the formal verification audit. In this case, a developer might erroneously assume that the contract is bug-free.

## Use formal verification tools {#use-formal-verification-tools}

### Creating formal specifications {#creating-formal-specifications}

**Act - _High-level specification language for defining properties for EVM smart contracts._**

- [GitHub](https://github.com/ethereum/act)
- [Documentation](https://ethereum.github.io/act/)

**Scribble -** **_A specification language tool for translating high-level specifications into Solidity code._**

- [Website](https://consensys.net/diligence/scribble/)
- [Documentation](https://docs.scribble.codes/language/introduction)

### Fuzzing smart contracts {#fuzzing-smart-contracts}

**Echidna - _A fast contract fuzzer for detecting vulnerabilities in smart contracts through property-based testing._**

- [GitHub](https://github.com/crytic/echidna/)

**Harvey - _Automated fuzzing tool useful for detecting property violations in smart contract code._**

- [Website](https://consensys.net/diligence/fuzzing/)

### Code analysis {#code-analysis}

**Oyente - _Static analysis tool for analyzing vulnerabilities in EVM bytecode with symbolic execution._**

- [GitHub](https://github.com/melonproject/oyente)

**Mythril - _EVM bytecode assessment tool for detecting contract vulnerabilities using taint analysis, concolic analysis, and control flow checking._**

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Documentation](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore _- A tool for analyzing EVM bytecode analysis tool based on symbolic execution._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentation](https://github.com/trailofbits/manticore/wiki)

**Securify** **_- A security analyzer for analyzing Solidity source code in Ethereum smart contracts and detecting property violations._**
- [GitHub](https://github.com/eth-sri/securify2)

### Formal verification projects in Ethereum {#formal-verification-projects-in-ethereum}
**hevm - _An implementation of the Ethereum virtual machine (EVM) made specifically for symbolic execution, unit testing and debugging of smart contracts._**
- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**KEVM - _A correct-by-construction implementation of the Ethereum Virtual Machine (EVM) specified in the K Framework for implementing formal verification._**
- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Documentation](https://jellopaper.org/)

## Further reading {#further-reading}

- [How Formal Verification of Smart Contracts Works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) by Brian Marick
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) by Bernhard Mueller
- [Ethereum Formal Verification Overview](https://github.com/leonardoalt/ethereum_formal_verification_overview) by Leonardo Alt
- [Formal Verification of Ethereum Contracts](https://github.com/pirapira/Ethereum-Formal-Verification-Overview) by Yoichi Hirai
