---
title: Verifying smart contracts
description: An overview of source code verification for Ethereum smart contracts
lang: en
sidebar: true
---

[Smart contracts](/developers/docs/smart-contracts/) are designed to be “trustless”, meaning users shouldn’t have to trust third parties (e.g., developers and companies) before interacting with a contract. As a requisite for trustleness, users and other developers must be able to verify a smart contract’s source code. Source code verification assures users and developers that the published contract code is the same code running at the contract address on the Ethereum blockchain. 

## What is source code verification? {#what-is-source-code-verification}

A smart contract’s source code, which are instructions [written in Solidity](/developers/docs/smart-contracts/languages/) or another high-level programming language, is usually [compiled into bytecode](/developers/docs/smart-contracts/compiling/) before being deployed in the [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). This happens because the EVM cannot interpret high-level instructions and requires low-level, machine instructions (**bytecode**) to execute contract logic.  

Source code verification is comparing a smart contract’s source code and the compiled bytecode used during the contract creation to detect any differences. Verifying smart contracts matters because the advertised contract code may be different from what runs on the blockchain. 

Source code verification ensures that functions, values, and variables defined in the source code remain the same after the contract is compiled and deployed. Source verification also makes provision for code documentation, so that end-users know what a smart contract is designed to do. 

## Why is source code verification important? {#importance-of-source-code-verification}

### Trustlessness {#trustlessness}

Trustlessness is arguably the biggest premise for smart contracts and [decentralized applications (dapps)](/developers/docs/dapps/). Smart contracts are “immutable” and cannot be altered; a contract will only execute only business logic defined in the code at the time of deployment. This means developers and enterprises cannot tamper with a contract's code after deploying on Ethereum.

For a smart contract to be trustless, the contract code should be available for independent verification.  While the compiled bytecode for every smart contract is publicly available on the blockchain, low-level language is difficult to understand—for both developers and users. 

Projects reduce trust assumptions by publishing the source code of their contracts. But this leads to another problem: it is difficult to verify that the published source code matches the contract bytecode. In this scenario, the value of trustlessness is lost because users have to trust developers not to change contract code (thereby changing the bytecode) before deploying. 

Source code verification tools provide guarantees that a smart contract’s source code files matches the assembly code. The result is a trustless ecosystem, where users don’t blindly trust third parties and instead verify code before depositing funds into a contract. 

### User Safety {#user-safety}

With smart contracts, there’s usually a lot of money at stake. This calls for higher security guarantees and verification of a smart contract’s logic before using it. Without verification, malicious smart contracts can have [backdoors](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), controversial access control mechanisms, exploitable vulnerabilities, and other things that jeopardize user safety. The ability to verify source code for a smart contract reduces attack vectors and improves security for end-users. 

It is standard pratice in Solidity development to annotate source code files with inline comments using [NatSpec](https://docs.soliditylang.org/en/latest/natspec-format.html) (Ethereum Natutral Language Specification Format). NatSpec comments are human-readable descriptions of parts of a contract's code (e.g., contract functions and variables), which let users understand what happens with every contract interaction. 

The problem is that unscruplous developers can deceive users by later inserting malicious code in the contract and changing comments before compiling the source. Source verification can prevent this by checking if comments in the published source file match those used during compilation. 

## How to verify source code for Ethereum smart contracts {#how-to-verify-source-code-for-Ethereum-smart-contracts}

[Deploying a smart contract on Ethereum](/developers/docs/smart-contracts/deploying/) requires sending a transaction with a data payload (compiled bytecode) without specifying a recipient. This payload is generated from the source code file(s), [constructor arguments](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor), and available [contract metadata](https://docs.soliditylang.org/en/latest/metadata.html). 

Compilation is deterministic, meaning it always produces the same output (i.e., contract bytecode) if the same source file, metadata, and constructor paramemeters are used. This means anyone can generate the bytecode for a smart contract if the inputs, such as the original source code and constructor parameters, are available. 

The process described above is crucial for verifying similarities between open-source code and deployed contract code. As a developer, you should make available all data inputs for generating the bytecode including:

- Contract metadata file: This contains the compiler version, compiler settings, ABI encoding, NatSpec documentation, and other contract-related information. 
- Source code file
- Constructor parameters (if available) 
- Contract address 

With this information, others should be able to derive the contract bytecode. Verifying your contract is then a matter of finding the contract-creation transaction on-chain and comparing the stored code with the recompiled bytecode. If both match, then your contract is verified. 

## Source code verification tools {#source-code-verification-tools}

The traditional process of verifying contracts can be complex. This is why we have tools for verifying source code for smart contracts deployed on Ethereum. These tools automate large parts of the source code verification and also curate verified contracts for the benefits of users. 

### Etherscan {#etherscan}

Although mostly known as an [Ethereum blockchain explorer](/developers/docs/data-and-analytics/block-explorers/), Etherscan also offers a [source code verification service](https://etherscan.io/verifyContract) for smart contract developers and users. 

Etherscan allows you to recompile contract bytecode from the original data payload (source code, library address, compiler settings, contract address, etc.) If the recompiled bytecode is associated with the bytecode (and constructor parameters) of the on-chain contract, then [the contract is verified](https://info.etherscan.com/types-of-contract-verification/). 

Once verified, your contract’s source code receives a "Verified" label and is published on Etherscan for others to audit. It also gets added to the [Verified Contracts](https://etherscan.io/contractsVerified/) section—a repository of smart contracts with verified source codes. 

However, Etherscan's contract verification has a drawback: it fails to compare the **metadata hash** of the on-chain bytecode and recompiled bytecode. The Solidity compiler typically [adds a hash of the contract metadata](https://docs.soliditylang.org/en/v0.4.25/metadata.html#encoding-of-the-metadata-hash-in-the-bytecode) (stored on [IPFS or Swarm](/developers/docs/storage/)) to the deployed bytecode. This is done to allow anyone retrieve the metadata independently and verify that contents of the contract's metadata remained the same before *and* after compilation. 

Because Etherscan cannot check if the metadata changed or not, users must trust that those details remained consistent in the deployed code. But, as explained earlier, this opens the door for inserting malicious code in contract bytecode and can [lead to malicious contract execution](https://samczsun.com/hiding-in-plain-sight/). 

[More on verifying contracts on Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327).

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) is another tool for verifying contracts. It aims to make interacting with smart contracts a safe and transparent experience for users. 

Unlike Etherscan, [getting a “Full Match”](https://docs.sourcify.dev/docs/full-vs-partial-match/) on Sourcify requires matching contract metadata hashes. This means Sourcify checks if the metadata hash in the recompiled bytecode matches the metadata hash associated with the bytecode used for the contract-creation transaction. Any differences in the metadata hashes will only net you a “Partial Match”, which tells users your contract metadata changed at some point. 

Sourcify is open-source, with a publicly available [GitHub repo](https://github.com/ethereum/sourcify), so you can run the service independently. It also stores its repository of verified contracts on IPFS to provide persistent storage and availability. This means users can still access the [list of verified contracts](https://repo.sourcify.dev/select-contract/), even if Sourcify goes down (unlike Etherscan).

The only perceptible drawback with using Sourcify is that it there is no dedicated label for verified contracts (which would save users time of re-verifying verified contracts). However, BlockScout (a block explorer) [uses Sourcify for source verification](https://docs.blockscout.com/for-users/verifying-a-smart-contract/contracts-verification-via-sourcify) and clearly marks contracts verified with Sourcify. 

[More on verifying contracts on Sourcify](https://blog.soliditylang.org/2020/06/25/sourcify-faq/).

### Tenderly {#tenderly}

[Tenderly](https://tenderly.co/) is a platform aimed at accelerating workflow for Ethereum smart contract developers. It also [offers source code verification as a service](https://docs.tenderly.co/monitoring/verifying-a-smart-contract) for developers. 

You can choose to verify your contract with Tenderly by importing the source file or the metadata file generated by the Solidity compiler. Like other verification tools, Tenderly requires details like the contract address/network, compiler settings, and optimization features to verify any smart contract. 

It is possible to verify a contract *privately*, making it visible only to you (and other members of your team). Verifying a contract publicly makes it visible to everyone using the Tenderly platform. 

While useful for verifying contracts, Tenderly doesn't have useful features available with other tools on the list. For example, it doesn't allow end-users to check if a contract is verified (except the developers opt for public verification) and doesn't check for a match between metadata hashes. 

## Further reading {#further-reading}
- [How to verify the source code of Ethereum smart contract](https://developpaper.com/how-to-verify-the-source-code-of-ethereum-smart-contract/) 
- [Verifying contract source code](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
