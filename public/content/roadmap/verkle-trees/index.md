---
title: Verkle trees
description: A high level description of Verkle trees and why Ethereum's state tree plans moved to a binary tree
lang: en
template: roadmap
summaryPoints:
  - Discover what Verkle trees are
  - Read why Verkle trees were set aside in favor of a binary tree
---

Verkle trees (a portmanteau of "Vector commitment" and "Merkle Trees") are a data structure that can be used to upgrade [Ethereum](/) nodes so that they can stop storing large amounts of state data without losing the ability to validate blocks.

Verkle trees were proposed as Ethereum's next state tree in [EIP-6800](https://eips.ethereum.org/EIPS/eip-6800), but that proposal is now stagnant and has been set aside in favor of a binary tree. The current proposal is a partitioned binary tree ([EIP-8297](https://eips.ethereum.org/EIPS/eip-8297)), which builds on an earlier binary tree draft ([EIP-7864](https://eips.ethereum.org/EIPS/eip-7864)). The binary tree pursues the same goal of small witnesses for stateless clients. This page explains how Verkle trees work and why research moved to a binary tree.

## Statelessness {#statelessness}

Verkle trees were designed as a step on the path to stateless Ethereum clients. Stateless clients are ones that do not have to store the entire state database in order to validate incoming blocks. Instead of using their own local copy of Ethereum's state to verify blocks, stateless clients use a "witness" to the state data that arrives with the block. A witness is a collection of individual pieces of the state data that are required to execute a particular set of transactions, and a cryptographic proof that the witness is really part of the full data. The witness is used _instead_ of the state database. For this to work, the witnesses need to be very small, so that they can be safely broadcast across the network in time for validators to process them within a 12 second slot. The current state data structure is not suitable because witnesses are too large. Verkle trees were designed to solve this problem by enabling small witnesses, removing one of the main barriers to stateless clients.

<ExpandableCard title="Why do we want stateless clients?" eventCategory="/roadmap/verkle-trees" eventName="clicked why do we want stateless clients?">

Ethereum clients currently use a data structure known as a Patricia Merkle Trie to store its state data. Information about individual accounts is stored in leaves on the trie, and each branch node, which can have up to 16 children, is hashed together with its children's hashes, level by level, until only a single hash remains. This final hash is known as the "root". To verify blocks, Ethereum clients execute all the transactions in a block and update their local state trie. The block is considered valid if the root of the local tree is identical to the one provided by the block proposer, because any differences in the computation done by the block proposer and the validating node would cause the root hash to be completely different. The problem with this is that verifying the blockchain requires each full node to maintain Ethereum's entire state, along with a record of recent changes so that it can handle chain reorganizations. This requires clients to have access to a large amount of disk space, which is a barrier to running full nodes on cheap, low power hardware. A solution to this is to update the state trie to a more efficient structure (such as a Verkle tree or a binary tree) that can be summarized using a small "witness" to the data that can be shared instead of the full state data. Reformatting the state data into a new tree structure is a stepping stone for moving to stateless clients.

</ExpandableCard>

## What is a witness and why do we need them? {#what-is-a-witness}

Verifying a block means re-executing the transactions contained in the block, applying the changes to Ethereum's state trie, and calculating the new root hash. A verified block is one whose computed state root hash is the same as the one provided with the block (because this means the block proposer really did the computation they say they did). In today's Ethereum clients, updating the state requires access to the entire state trie, which is a large data structure that must be stored locally. A witness only contains the fragments of the state data that are required to execute the transactions in the block. A validator can then only use those fragments to verify that the block proposer has executed the block transactions and updated the state correctly. However, this means that the witness needs to be transferred between peers on the Ethereum network rapidly enough to be received and processed by each node safely within a 12 second slot. If the witness is too large, it might take some nodes too long to download it and keep up with the chain. This is a centralizing force because it means only nodes with fast internet connections can participate in validating blocks. With small enough witnesses, such as the ones Verkle trees were designed to produce, a stateless client would not need to keep the full state database on its hard drive. It could verify a block using the block, the state witness that accompanies it and the previously verified state root. Unfortunately, the witnesses that can be produced from today's hexary Merkle-Patricia trie are too large to support stateless clients.

## Why do Verkle trees enable smaller witnesses? {#why-do-verkle-trees-enable-smaller-witnesses}

The structure of today's hexary Merkle-Patricia trie makes witness sizes very large - too large to safely broadcast between peers within a 12 second slot. This is because the witness is a path connecting the data, which is held in leaves, to the root hash. To verify the data it is necessary to have not only all the intermediate hashes that connect each leaf to the root, but also all the "sibling" nodes. Each node in the proof has a sibling that it is hashed with to create the next hash up the trie. This is a lot of data. Verkle trees reduce the witness size by shortening the distance between the leaves of the tree and its root and also eliminating the need to provide sibling nodes for verifying the root hash. Even more space efficiency will be gained by using a powerful polynomial commitment scheme instead of the hash-style vector commitment. The polynomial commitment allows the witness to have a fixed size regardless of the number of leaves that it proves.

Under the polynomial commitment scheme, the witnesses have manageable sizes that can easily be transferred on the peer-to-peer network. This allows clients to verify state changes in each block with a minimal amount of data.

<ExpandableCard title="Exactly how much can Verkle trees reduce witness size?" eventCategory="/roadmap/verkle-trees" eventName="clicked exactly how much can Verkle trees reduce witness size?">

The witness size varies depending on the number of leaves it includes. Assuming the witness covers 1000 leaves, a witness for today's hexary Merkle-Patricia trie would be about 3.5MB (assuming 7 levels to the trie). A witness for the same data in a Verkle tree (assuming 4 levels to the tree) would be about 150 kB - **about 23x smaller**. This reduction in witness size would have made stateless client witnesses acceptably small. Polynomial witnesses are 0.128 -1 kB depending on which specific polynomial commitment is used.

</ExpandableCard>

## What is the structure of a Verkle tree? {#what-is-the-structure-of-a-verkle-tree}

Verkle trees are `(key,value)` pairs where the keys are 32-byte elements composed of a 31-byte _stem_ and a single byte _suffix_. These keys are organized into _extension_ nodes and _inner_ nodes. Extension nodes represent a single stem for 256 children with different suffixes. Inner nodes also have 256 children, but they can be other extension nodes. The main difference between the Verkle tree and the Merkle tree structure is that the Verkle tree is much flatter, meaning there are fewer intermediate nodes linking a leaf to the root, and therefore less data required to generate a proof.

<VerkleTreeDiagram />

[Read more about the structure of Verkle trees](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)

## Current progress {#current-progress}

[EIP-6800](https://eips.ethereum.org/EIPS/eip-6800), the proposal to move Ethereum's state into a unified Verkle tree, is now stagnant. The current state tree proposal is a partitioned binary tree, specified in [EIP-8297](https://eips.ethereum.org/EIPS/eip-8297). It builds on [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864), an earlier draft for a unified binary tree. Both EIPs are drafts.

The binary tree proposals give two main reasons for moving away from Verkle trees. Verkle trees rely on elliptic-curve cryptography that is not secure against quantum computers, so they would eventually need to be replaced, while a binary tree relies only on hash functions. Progress in proving systems also reduces the need for the small, fast-to-generate proofs that were the main advantage of Verkle trees. Because each node in a binary tree has only two children, its proofs are also much smaller than proofs from today's hexary trie.

In the partitioned binary tree, account data, storage and contract code all live in one binary tree. The key space is split into zones for account headers, contract code and storage, and contract code is broken into small chunks stored in the tree. Unlike the Verkle design, EIP-8297 does not change the gas schedule.

Client teams have followed this change. Geth has removed its Verkle-era code, including the earlier unified binary tree and the witness gas changes from [EIP-4762](https://eips.ethereum.org/EIPS/eip-4762), and now has an experimental implementation of the partitioned binary tree. An experimental implementation for Erigon is in development.

Moving to a new tree means converting all of Ethereum's existing state. [EIP-8347](https://eips.ethereum.org/EIPS/eip-8347) proposes an offline migration: clients convert the state at a finalized anchor block into the new tree, then catch up by replaying the changes recorded in block-level access lists ([EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)). A later network upgrade would then switch the state root from the current trie to the binary tree.

No network upgrade has been scheduled for this switch. The new state tree is not part of the Hegotá upgrade, and researchers currently expect the migration to come in a later upgrade, with no date set.

## Further reading {#further-reading}

- [EIP-8297: Partitioned Binary Tree](https://eips.ethereum.org/EIPS/eip-8297)
- [EIP-8347: Offline State Migration to the PBT](https://eips.ethereum.org/EIPS/eip-8347)
- [EIP-7864: Ethereum state using a unified binary tree](https://eips.ethereum.org/EIPS/eip-7864)
- [How Hegotá can influence the state roadmap](https://ethresear.ch/t/how-hegota-can-influence-the-state-roadmap/25895)
- [The Future of Ethereum's State](https://blog.ethereum.org/2025/12/16/future-of-state)
- ["Completing the Circle: Transitioning from Verkle to Binary Trees in Ethereum" by Guillaume Ballet at EthCC[8]](https://ethcc.io/archives/completing-the-circle-transitioning-from-verkle-to-binary-trees-in-ethereum)

Verkle (historical):

- [Verkle Trees for Statelessness](https://verkle.info/)
- [Dankrad Feist explain Verkle trees on PEEPanEIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Verkle Trees For The Rest Of Us](https://web.archive.org/web/20250124132255/https://research.2077.xyz/verkle-trees)
- [Anatomy of A Verkle Proof](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)
- [Guillaume Ballet explain Verkle trees at ETHGlobal](https://www.youtube.com/watch?v=f7bEtX3Z57o)
- ["How Verkle trees make Ethereum lean and mean" by Guillaume Ballet at Devcon 6](https://www.youtube.com/watch?v=Q7rStTKwuYs)
- [Piper Merriam on stateless clients from ETHDenver 2020](https://www.youtube.com/watch?v=0yiZJNciIJ4)
- [Dankrad Fiest explains Verkle trees and statelessness on Zero Knowledge podcast](https://zeroknowledge.fm/podcast/202/)
- [Vitalik Buterin on Verkle trees](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Dankrad Feist on Verkle trees](https://dankradfeist.de/ethereum/2021/06/18/verkle-trie-for-eth1.html)
- [Verkle tree EIP documentation](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Illustration)
- [EIP-6800: Ethereum state using a unified verkle tree](https://eips.ethereum.org/EIPS/eip-6800)
