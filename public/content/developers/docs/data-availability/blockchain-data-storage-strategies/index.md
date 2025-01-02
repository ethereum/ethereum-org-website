---
title: Blockchain Data Storage Strategies
description: There are several ways to store data using the blockchain. This article will compare the different strategies, their costs and tradeoffs, as well as the requirements to use it safely.
lang: en
---

There are multiple ways to store information either directly on the blockchain, or in a manner that is secured by the blockchain:

- EIP-4844 blobs
- Calldata
- Offchain with L1 mechanisms
- Contract "code"
- Events
- EVM storage

The choice of which method to use is based on several criteria:

- The source of the information. Information in calldata cannot come directly from the blockchain itself.
- The destination of the information. Calldata is available only in the transaction it initiates. Events are not accessible onchain at all.
- How much hassle is acceptable? Computers that run a full-scale node can perform more processing than a light client in an application running in a browser.
- Is it necessary to facilitate easy access to the information from every node?
- The security requirements.

## The security requirements {#security-requirements}

In general, information security consists of three attributes:

- _Confidentiality_, unauthorized entities are not allowed to read the information. This is important in many cases, but not here. _There are no secrets on the blockchain_. Blockchains work because anybody can verify the state transitions, so it is impossible to use them to store secrets directly. There are ways to store confidential information on the blockchain, but they all rely on some offchain component to store at least a key.

- _Integrity_, the information is correct, it cannot be changed by unauthorized entities, or in unauthorized ways (for example, transferring [ERC-20 tokens](https://eips.ethereum.org/EIPS/eip-20#events) without a `Transfer` event). On the blockchain, every node verifies every state change, which ensures integrity.

- _Availability_, the information is available to any authorized entity. On the blockchain, this is usually achieved by having the information available on every [full node](https://ethereum.org/developers/docs/nodes-and-clients#full-node).

The different solutions here all have excellent integrity, because hashes are posted on L1. However, they do have different availability guarantees.

## Prerequisites {#prerequisites}

You should have a good understanding of [blockchain fundamentals](/developers/docs/intro-to-ethereum/). This page also assumes the reader is familiar with [blocks](/developers/docs/blocks/), [transactions](/developers/docs/transactions/), and other relevant topics.

## EIP-4844 blobs {#eip-4844-blobs}

Starting with [the Dencun hardfork](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) the Ethereum blockchain includes [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), which adds to Ethereum data blobs with a limited lifetime (initially about [18 days](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). These blobs are priced separately from the [execution gas](/developers/docs/gas), although using a similar mechanism. They are a cheap way to post temporary data.

The main use case for EIP-4844 blobs is for rollups to publish their transactions. [Optimistic rollups](/developers/docs/scaling/optimistic-rollups) need to publish the transactions on their blockchains. Those transactions have to be available to anybody during the [challenge period](https://docs.optimism.io/connect/resources/glossary#challenge-period) to enable [validators](https://docs.optimism.io/connect/resources/glossary#validator) to fix the mistake if the rollup's [sequencer](https://docs.optimism.io/connect/resources/glossary#sequencer) posts an incorrect state root.

However, once the challenge period has passed and the state root is finalized, the remaining purpose for knowing these transactions is to replicate the chain's current state. This state is also available from chain nodes, with a lot less processing required. So transaction information should still be preserved in a few places, such as [block explorers](/developers/docs/data-and-analytics/block-explorers), but there is no need to pay for the level of censorship resistance Ethereum provides.

[Zero-knowledge rollups](/developers/docs/scaling/zk-rollups/#data-availability) also post their transaction data to enable other nodes to replicate the existing state and verify validity proofs, but again that is a short-term requirement.

At writing posting on EIP-4844 costs one wei (10<sup>-18</sup> ETH) per byte, which is negligible compared to [the 21,000 execution gas that any transaction, including one that posts blobs, costs](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). You can see the current EIP-4844 price on [blobscan.com](https://blobscan.com/blocks).

Here are the addresses to see the blobs posted by some famous rollups.

| Rollup                               | Mailbox address                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata refers to the bytes sent as part of the transaction. It is stored as part of the permanent record of the blockchain in the block which includes that transaction.

This is the cheapest method to permanently put data in the blockchain. The cost per byte is either 4 execution gas (if the byte is zero) or 16 gas (any other value). If the data is compressed, which is standard practice, then every byte value is equally likely, so the average cost is approximately 15.95 gas per byte.

At writing the prices are 12 gwei/gas and 2300 $/ETH, which means the cost is approximately 45 cents per kilobyte. Because this was the cheapest method prior to EIP-4844, this is the method rollups used to store transaction information, which need to be available for [fault challenges](https://docs.optimism.io/stack/protocol/overview#fault-proofs), but do not need to be accessible directly onchain.

Here are the addresses to see the transactions posted by some famous rollups.

| Rollup                               | Mailbox address                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Offchain with L1 mechanisms {#offchain-with-l1-mechs}

Depending on your security tradeoffs, it might be acceptable to put the information elsewhere and use a mechanism that ensures the data is available when needed. There are two requirements for this to work:

1. Post a [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of the data on the blockchain, called an _input commitment_. This can be a single 32-byte word, so it is not expensive. As long as the input commitment is available, integrity is assured because it's not feasible to find any other data that would hash to the same value. So if incorrect data is provided, it can be detected.

2. Have a mechanism that ensures availability. For example, in [Redstone](https://redstone.xyz/docs/what-is-redstone) any node can submit an availability challenge. If the sequencer does not respond onchain by the deadline, the input commitment is discarded, so the information is considered never to have been posted.

This is acceptable for an optimistic rollup because we are already relying on having at least one honest verifier for the state root. Such an honest verifier will also make sure it has the data to process blocks, and issue an availability challenge if the information is not available offchain. This type of optimistic rollup is called [plasma](/developers/docs/scaling/plasma/).

## Contract code {#contract-code}

Information that only needs to be written once, never gets overwritten, and needs to be available onchain can be stored as contract code. This means that we create a "smart contract" with the data and then use [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) to read the information. The advantage is that copying code is relatively cheap.

Other than the cost of memory expansion, `EXTCODECOPY` costs 2600 gas for the first access to a contract (when it is "cold") and 100 gas for subsequent copies from the same contract plus 3 gas per 32 byte word. Compared with calldata, which costs 15.95 per byte, this is cheaper starting at about 200 bytes. Based on [the formula for memory expansion costs](https://www.evm.codes/about#memoryexpansion), at long as you don't need more than 4MB of memory, the memory expansion cost is smaller than the cost of adding calldata.

Of course, this is just the cost to _read_ the data. To create the contract costs approximately 32,000 gas + 200 gas/byte. This method is only economical when the same information needs to be read many times in different transactions.

Contract code can be nonsensical, as long as it doesn't start with `0xEF`. Contracts that start with `0xEF` are interpreted as [ethereum object format](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), which has much stricter requirements.

## Events {#events}

[Events](https://docs.alchemy.com/docs/solidity-events) are emitted by smart contracts, and read by offchain software.
Their advantage is that offchain code can listen for events. The cost is [gas](https://www.evm.codes/#a0?fork=cancun), 375 plus 8 gas per byte of data. At 12 gwei/gas and 2300 $/ETH, this translates to one cent plus 22 cents per kilobyte.

## Storage {#storage}

Smart contracts have access to [persistent storage](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). However, it is very expensive. Writing a 32 byte word to a previously empty storage slot can [cost 22,100 gas](https://www.evm.codes/#55?fork=cancun). At 12 gwei/gas and 2300 $/ETH, this is about 61 cents per write operation, or $19.5 per kilobyte.

This is the most expensive form of storage in Ethereum.

## Summary {#summary}

This table summarizes the difference options, their advantages and disadvantages.

| Storage type                | Source of data      | Availability guarantee                                                                                                             | Onchain availability                                             | Additional limitations                                                  |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| EIP-4844 blobs              | Offchain            | Ethereum guarantee for [~18 days](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Only hash is available                                           |                                                                         |
| Calldata                    | Offchain            | Ethereum guarantee forever (part of the blockchain)                                                                                | Only available if written to a contract, and at that transaction |
| Offchain with L1 mechanisms | Offchain            | "One honest verifier" guarantee during the challenge period                                                                        | Hash only                                                        | Guaranteed by the challenge mechanism, only during the challenge period |
| Contract code               | Onchain or offchain | Ethereum guarantee forever (part of the blockchain)                                                                                | Yes                                                              | Written to a "random" address, cannot start with `0xEF`                 |
| Events                      | Onchain             | Ethereum guarantee forever (part of the blockchain)                                                                                | No                                                               |
| Storage                     | Onchain             | Ethereum guarantee forever (part of the blockchain and the present state until overwritten)                                        | Yes                                                              |
