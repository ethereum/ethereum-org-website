---
title: Weak subjectivity
description: An explanation of weak subjectivity and its role in PoS Ethereum.
lang: en
sidebar: true
incomplete: false
---

## Prerequisites

To understand this page it is necessary to first understand the fundamentals of [proof-of-stake](/developers/docs/consensus-mechanisms/pos/).

## Weak Subjectivity

At the very beginning of a blockchain, every node on the network agrees on a specific first block - a "genesis block". Any nodes that enter the network later on are required to download that genesis block and every block that came after it and re-execute the transactions inside them. The entire blockchain is built on top of the genesis block - it is the universal "ground truth". This means that the genesis block has to be irreversible and always present in the canonical chain.

In proof-of-work blockchains there is a single canonical chain that all honest nodes agree upon (e.g. the one that has taken the most energy, measured in proof-of-work difficulty, to mine). This is "objective". Alternatively, in "subjective" blockchains there are multiple valid states and nodes choose between them based on social information from their peers. Ethereum PoS is "weakly subjective" because there is one correct chain that all honest nodes agree upon. Nodes that are continuously connected are effectively objective because they simply follow the consensus mechanism to the head of the chain. However, nodes entering the network for the first time or after some long delay rely upon information about the state of the blockchain gathered from some trusted source such as a friend's node or a block explorer. Given an honest recent state and the full set of blocks, any new node entering the network will independently arrive at the correct head.

## Weak subjectivity checkpoints

The way weak subjectivity is implemented in proof-of-stake Ethereum is by using "weak subjectivity checkpoints". These are blocks that all nodes on the network agree belong in the canonical chain. They serve a similar purpose to genesis blocks except that they do not sit at the genesis position in the blockchain. The fork choice algorithm executed by each node treats the weak subjectivity checkpoints as a genesis block, trusting that the blockchain state defined in that checkpoint to be correct, and then independently verifying the chain from that point onwards. The fork choice algorithm automatically rejects any block that does not build upon the most recent weak subjectivity checkpoint.

## How weak is weak?

"
However, arguably this is a very weak requirement; in fact, users need to trust client developers and/or "the community" to about this extent already. At the very least, users need to trust someone (usually client developers) to tell them what the protocol is and what any updates to the protocol have been. This is unavoidable in any software application. Hence, the marginal additional trust requirement that PoS imposes is still quite low.
"
