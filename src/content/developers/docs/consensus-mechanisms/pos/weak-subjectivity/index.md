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

In proof-of-work blockchains there is a single canonical chain that all honest nodes agree upon (e.g. the one that has taken the most energy, measured in proof-of-work difficulty, to mine). This is "objective". Alternatively, in "subjective" blockchains there are multiple valid states and nodes choose between them based on social information from their peers. Ethereum PoS is "weakly subjective" because there is one correct chain that all honest nodes agree upon. Nodes that are continuously connected are effectively objective because they simply follow the consensus mechanism to the head of the chain. However, nodes entering the network for the first time or after some long delay rely upon information about the state of the blockchain gathered from some trusted source such as a friend's node or a block explorer (or it could be bundled into the client source code so that the trusted source is the client developer team). Given an honest recent state and the full set of blocks, any new node entering the network will independently arrive at the correct head.

## Weak subjectivity checkpoints

The way weak subjectivity is implemented in proof-of-stake Ethereum is by using "weak subjectivity checkpoints". These are blocks that all nodes on the network agree belong in the canonical chain. They serve a similar purpose to genesis blocks except that they do not sit at the genesis position in the blockchain. The fork choice algorithm executed by each node treats the weak subjectivity checkpoints as a genesis block, trusting that the blockchain state defined in that checkpoint to be correct, and then independently verifying the chain from that point onwards. The fork choice algorithm automatically rejects any block that does not build upon the most recent weak subjectivity checkpoint.

## How weak is weak?

Subjectivity in a blockchain consensus mechanism is undesirable because it allows a attacker to take over the chain if they can control enough nodes. However, this is not the case in Ethereum's proof-of-stake because the checkpoints make the subjectivity "weak". The issue is reliance upon trusted sources for recent states to build upon. However, the risk of getting a bad weak subjectivity checkpoint is low. There is always some degree of trust required to run any software application, for example trusting that the software developers have produced honest software. Adding a requirement to trust the community to provide honest weak subjectivity checkpoints can be considered about as problematic as trusting the client developers. The overall trust required is low, and the checkpoint only adds marginally.

## Difference between weak subjectivity checkpoints and finalized blocks

"It is a block that the entire network agrees on as always being part of the canonical chain. Note that this is quite different than the concept of a “finalized” block – if a node sees two conflicting finalized blocks, then the network has experienced consensus failure and the node cannot identify a canonical fork. On the other hand, if a node sees a block conflicting with a weak subjectivity checkpoint, then it immediately rejects that block. As far as the fork choice of nodes is concerned, the latest weak subjectivity checkpoint is the new genesis block of the network."
