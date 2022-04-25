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

At the very beginning of a blockchain, every node on the network agrees on a specific first block - a "genesis block". The entire blockchain is built on top of the genesis block - it is the universal "ground truth" agreed by all participants to be irreversible and always present in the canonical chain. Successive blocks are added objectively if there is only one valid chain that is chosen entirely deterministically. Alternatively, nodes might come to different conclusions about which blocks to add depending upon information received from their peers, possibly trusting some peers more than others.

The subjectivity in this model exposes the blockchain to certain types of attack, such as "long range attacks" where nodes that participated very early in the chain maintain an alternative fork that they release much later to their own advantage. Alternatively, if 33% of validators withdraw their stake but continue to attest and produce blocks, they might generate an alternative fork that conflicts with the canonical one. New nodes or nodes that have been offline for a long time might not be aware that these attacking validators have withdrawn their funds, so they could follow these dishonest validators onto an incorrect chain.

Closing these attack vector requires reducing the reliance of the consensus mechanism on social information. Instead of relying on social information from peers to form consensus, Ethereum nodes only require their peers to provide a recent state hash, known as a weak subjectvity checkpoint. Then, they can use that as a univeral ground truth, equivalent to a genesis block. From that genesis block, the new node can sync the remainder of the blocks deterministically using their consensus mechanism, confident that they are on the correct chain. This is known as "weak subjectivity".

## Weak subjectivity checkpoints

The way weak subjectivity is implemented in proof-of-stake Ethereum is by using "weak subjectivity checkpoints". These are blocks that all nodes on the network agree belong in the canonical chain. They serve a similar purpose to genesis blocks except that they do not sit at the genesis position in the blockchain. The fork choice algorithm run by each node treats the weak subjectivity checkpoints as de-facto genesis blocks, trusting that the blockchain state defined in that checkpoint is correct, and independently verifying the chain from that point onwards. The checkpoints can be thought of as "revert-limits" because blocks added to the chain before a weak-subjectivity checkpoint simply cannot be changed. This undermines long range attacks simply by defining long range forks to be invalid as part of the mechanism design. Ensuring that the weak subjectivity checkpoints separated by a smaller distance than the validator withdrawal period ensures that a validator that forks the chain is slashed at least some threshold amount before they are able to withdraw their stake, and that new entrants cannot be tricked onto incorrect forks by validators whose stake has been withdrawn.

## Difference between weak subjectivity checkpoints and finalized blocks

Finalized blocks and weak subjectivity checkpoints are treated differently by Ethereum nodes. If a node becomes aware of two competing finalized blocks then it is torn between the two - it has no way to identify automatically which is the canonical fork. This is symptomatic of a consensus failure. In contrast, a node simply rejects any block that conflicts with its weak subjectivity checkpoint. From the node's perspective the weak subjectivity checkpoint is represents an absolute truth that cannot be undermined by any new knowledge arriving from its peers.

## How weak is weak?

The subjective aspect of Ethereum's proof-of-stake is the requirement for a recent state (weak subjectivity checkpoint) from a trusted source to sync from. The risk of getting a bad weak subjectivity checkpoint is very low, partly because they can be checked against several independent public sources such as block explorers or multiple nodes. There is always some degree of trust required to run any software application, for example trusting that the software developers have produced honest software.

A weak subjectivity checkpoint may even come as part of the client software. Arguably an attacker can corrupt the checkpoint in the software can just as easily corrupt the software itself. There is no real crypto-economic route around this problem, but the impact of untrustworthy developers is minimized in Ethereum by having multiple independent client teams each building equivalent software in different langages, all with a vested interest in maintaining an honest chain. Block explorers may also provide weak subjectivity checkpoints, or at least provide a way to cross-reference checkpoints obtained from elsewhere against an additional source.

Finally, checkpoints can simply be requested from other nodes, perhaps another Etheruem user that runs a full node can provide a checkpoint that can then be verified against data from a block explorer. Overall, trusting the provider of a weak subjectivity checkpoint can be considered about as problematic as trusting the client developers. The overall trust required is low. It is also important to note that these considerations only become important in the very unlikely event where a majority of validators collude to produce an alternate fork of the blockchain. Under any other circumstances there is only one Ethereum chain to choose from.

## Further Reading

[Weak subjectivity in Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
[Vitalik: How I learned to love weak subjectivity](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
