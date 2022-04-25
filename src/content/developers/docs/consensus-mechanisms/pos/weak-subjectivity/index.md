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

At the very beginning of a blockchain, every node on the network agrees on a specific first block - a "genesis block". The entire blockchain is built on top of the genesis block - it is the universal "ground truth". This means that the genesis block has to be irreversible and always present in the canonical chain. The blockchain can then grow from this genesis block "objectively" if there is only one valid chain that is chosen entirely deterministically. Alternatively, nodes might come to different conclusions about which blocks to add to the canonical blockchain depending upon the timing of certain messages received from their peers, possibly trusting some peers more than others. In this model there exist multiple possible valid blocks that a node chooses between by trusting social information from other nodes. This is "subjective". The subjectivity exposes the blockchain to certain types of attack, such as "long range attacks" where nodes that participated very early the chain genesis maintain an alternative fork that they release much later to their own advantage, having already withdrawn their staked ether. Alternatively, if 33% of validators withdraw their stake but continue to attest and produce blocks, they might generate an alternative fork that conflicts with the finalized canonical one. Nodes that lag the rest of the network because they have been offline for a long time or are simply new entrants to the network might not be aware that these attacking validators have withdrawn their funds, so they could follow these dishonest validators onto an incorrect chain.

Closing this attack vector requires reducing the consensus mechanism's reliance on social information. For Ethereum, nodes that are always online and began participating at genesis are protected by the consensus mechanism. The valid chain is simply the one that has accumulated the most attestation-weight since genesis. However, new nodes entering the network or nodes that have been offline for long periods of time are not reliably protected by the consensus mechanism in the same way. They require some trusted information from peers about a recent block that is definitely part of the canonical chain - without this they could be tricked into following an alternative chain. There is still a subjective element to this process because the new node needs to find a trusted source to retrieve the state of a recent canonical block to build upon, but once this is available the node can sync to the head of the chain deterministically. The subjective aspect is therefore weak.

## Weak subjectivity checkpoints

The way weak subjectivity is implemented in proof-of-stake Ethereum is by using "weak subjectivity checkpoints". These are blocks that all nodes on the network agree belong in the canonical chain. They serve a similar purpose to genesis blocks except that they do not sit at the genesis position in the blockchain. The fork choice algorithm executed by each node treats the weak subjectivity checkpoints as de-facto genesis blocks, trusting that the blockchain state defined in that checkpoint to be correct, and then independently verifying the chain from that point onwards. The fork choice algorithm automatically rejects any block that does not build upon the most recent weak subjectivity checkpoint. The checkpoints can be thought of as "revert-limits" because blocks added to the chain before a weak-subjectivity checkpoint simply cannot be changed. This undermines long range attacks simply by defining long range forks to be invalid as part of the mechanism design. Ensuring that the weak subjectivity checkpoints separated by a smaller distance than the validator withdrawal period ensures that a validator that forks the chain is slashed at least some threshold amount before they are able to withdraw their stake, and that new entrants cannot be tricked onto incorrect forks by validators whose stake has been withdrawn.

## How weak is weak?

The subjective aspect of Ethereum's proof-of-stake is the requirement for a recent state (weak subjectivity checkpoint) from a trusted source to sync from. The risk of getting a bad weak subjectivity checkpoint is very low, partly because they can be checked against several independent public sources such as block explorers or multiple nodes. There is always some degree of trust required to run any software application, for example trusting that the software developers have produced honest software. Adding a requirement to trust the community to provide honest weak subjectivity checkpoints can be considered about as problematic as trusting the client developers. The overall trust required is low, and the checkpoint only adds marginally.

It is also important to realize that these considerations are become important in the very unlikely event of a majority of validators colluding to produce an alternate fork of the blockchain. Under any other circumstances there is only one Ethereum chain to choose from.

## Difference between weak subjectivity checkpoints and finalized blocks

Finalized blocks and weak subjectivity checkpoints are treated differently by Ethereum nodes. If a node becomes aware of two competing finalized blocks then it is torn between the two - it has no way to identify automatically which is the canonical fork. This is symptomatic of a consensus failure. In contrast, a node simply rejects any block that conflicts with its weak subjectivity checkpoint. From the node's perspective the weak subjectivity checkpoint is represents an absolute truth that cannot be undermined by any new knowledge arriving from its peers.

## Who to trust?

In practice, a weak subjectivity checkpoint may come as part of the client software used to verify the blockchain. Arguably an attacker can corrupt the checkpoint in the software can just as easily corrupt the software itself. There is no real crypto-economic route around this problem, but the impact of untrustworthy developers is minimized in Ethereum by having multiple independent client teams each building equivalent software in different langages, all with a vested interest in maintaining an honest chain. Block explorers may also provide weak subjecticity checkpoints, or at least provide a way to cross-reference checkpoints obtained from elsewhere against an additional source. Finally, checkpoints can simply be requested from another node, perhaps another Etheruem user that runs a full node can provide a checkpoint that can then be verified against data from a block explorer.

## Further Reading

[Weak subjectivity in Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
[Vitalik: How I learned to love weak subjectivity](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
