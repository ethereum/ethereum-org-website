---
title: Verkle trees
description: A high level description of Verkle trees and how they will be used to upgrade Ethereum
lang: en
template: staking
emoji: ":money_with_wings:"
image: ../../../assets/staking/leslie-pool.png
alt: Leslie the rhino swimming in the pool.
sidebarDepth: 2
summaryPoints:
  - Discover Verkle Trees
  - Read why Verkle Trees are a useful upgrade for Ethereum
---

Verkle tries (a.k.a Vector Merkle Tries) are a data structure that be used to upgrade Ethereum nodes so that they can stop storing large amounts of state data without losing the ability to validate blocks.

## Prerequisites {#prerequisites}

KZG, Merkle trees, statelessness

## Statelessness {#statelessness}

Ethereum clients currently use a data structure known as a Patricia Merkle Trie to store its state data. Information about individual accounts are stored as leaves on the trie and pairs of leaves are hashed repeatedly until only a single hash remains. This final hash is known as the "root". To verify blocks, Ethereum clients execute all the transactions in a block and update their local state trie. The block is considered honest if the root of the local tree is identical to the one provided by the block proposer, because any differences in the computation done by the block proposer and the validating node would cause the root hash to be completely different. The problem with this is that verifying the blockchain requires each client to store the whole state trie for the head block and several historical blocks (the default in Geth is to keep state data for 128 blocks behind the head). This requires clients to have access to a large amount of disk space, which is a barrier to running full nodes on cheap, low power hardware.

A solution to this is to move to stateless clients. Instead of using their own local copy of Ethereum's state to verify blocks, stateless clients use a "witness" to the state data that arrives with the block. A witness is a collection of individual pieces of the state data that are required to execute a particular set of transactions, and a cryptographic proof that the witness is part of the full state trie. The witness is used _instead_ of the state database.

The problem with this is that a witness for a Patricia Merkle Trie is too large to efficiently broadcast across the network. Verkle trees solve this problem by enabling small witnesses, removing one of the main barriers to statelkess clients.

## Why do small witnesses unlock statelessness?

Verifying a block means re-executing the transactions contained in the block, applying the changes to Ethereum's state trie, and calculating the new root hash. A verified block is one whose computed state root hash is the same as the one provided with the block (because this means the block proposer really did the computation they say they did). In today's Ethereum clients, updating the state requires access to the entire state trie, which is a large data structure that must be stored locally. A witness only contains the fragments of the state data that are required to execute the transactions in the block. A validator can then onyl use those fragments to verify that the block proposer has executed the block transactions and updated the state correctly. However, this means that the witness needs to be transferred between peers on the Ethereum network rapidly enough to be received and processed by each node safely within a 12 second slot. If the witness is too large, it might take some nodes too long to download it and keep up with the chain. This is a centralizing force because it means only nodes with fast internet connections can participate in validating blocks. With Verkle trees there is no need to have _anything_ stored on your hard drive; _everything_ you need to verify a block is contained withint he block itself. Unfortunately, the witnesses that can be produced from Merkle tries are too large to support stateless clients.

## Why do Verkle trees enable smaller witnesses?

The structure of a Merkle Tree makes witness sizes very large - too large to safely broadcast between peers within a 12 second slot. This is because the witness is a path connecting the data, which is held in trie leaves, to the root hash. To verify the data it is necessary to have not only all the intermediate hashes that connect each leaf to the root, but also all the "sister" nodes. Each node in the proof has a sister that it is hashed with to create the next hash up the trie. This is a lot of data.

Verkle trees eliminate this problem by allowing small _fixed size_ witnesses that can easily be broadcast quickly across the peer-to-peer network. This has two benefits: 1) it allows clients to handle small amounts of data and still verify the state changes; 2) clients know exactly how much data to expect in the witness for each block, so they can always make sufficient resources available. This is achieved by restructuring the tree so that it is much wider and less deep (i.e. more leaves, fewer nodes). Then, the witness is only the path from node to node; the sisters are not required. Furthermore, the structure of the Verkle tree allows for polynomial commitments that are even smaller and faster to compute.

<ExpandableCard title="Exactly how much can Verkle trees reduce witness size?">

A typical witness size for today's hexary Merkle trie is ~3 kB but can be much larger, up to a worst case of ~18MB. A witness for a Verkle trie is closer to 200 bytes for the average case. However,

A witness accessing an account in today’s hexary Patricia tree is, in the average case, close to 3 kB, and in the worst case it may be three times larger. Assuming a worst case of 6000 accesses per block (15m gas / 2500 gas per access), this corresponds to a witness size of ~18 MB, which is too large to safely broadcast through a p2p network within a 12-second slot. Verkle trees reduce witness sizes to ~200 bytes per account in the average case, allowing stateless client witnesses to be acceptably small.

</ExpandableCard>

## What is the structure of a Verkle tree?
