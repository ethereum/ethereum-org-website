---
title: Gasper
description: An explanation of the Gasper PoS mechanism.
lang: en
sidebar: true
incomplete: false
---

Gasper is a combination of Casper the Friendly Finality Gadget and the LMD-GHOST fork choice algorithm. Together these components form the consensus mechanism securing proof-of-stake Ethereum. Casper is the mechanism that uprgades certain blocks to "finalized" so that new entrants into the network can be confident that they are syncing the canonical chain. The fork choice algorithm uses accumulated votes to ensure that when forks arise in the blockchain nodes can easily select the correct one.

**note** that the original definition of Casper-FFG was updated slightly for inclusion in Gasper. On this page we consider the updated version.

## The role of Gasper

Gasper is designed to sit atop a proof-of-stake blockchain where nodes provide ether as a security deposit that can be destroyed if they are lazy or dishonest in proposing or validating blocks. Gasper is the mechanism that defines how and why validators are rewarded and punished, how they decide which blocks to accept and reject, and which fork of the blockchain to build on.

## What is finality?

[Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf) is an algorithm that finalizes blocks. This means upgrading certain blocks so that they cannot be reverted (unless there has been a critical consensus failure). Finalized blocks can be thought of as information the blockchain is certain about. In order for a block to be finalized it has to pass through a two-step uprgade procedure. First, 2/3 of the total staked ether must have voted in favor of that block's inclusion in the canonical chain. This condition upgrades the block to "justified". Justified blocks are unlikely to be reverted but technically they could be. The justified block is then upgraded to "finalized" when another block is justified on top of it. This is a commitment to include the block in the canonical chain so that it cannot be reverted unless an attacker destroys millions of ether (billions of $USD).

These block upgrades do not happen in every slot. Instead, only epoch-boundary blocks can be justified and finalized. These blocks are known as "checkpoints". Upgrading considers pairs of checkpoints. A "supermajority link" must exist between two successive checkpoints (i.e. 2/3 of the total staked ether voting that checkpoint B is the correct descendant of checkpoint A) in order to upgrade the less recent checkpoint to finalized and the more recent block to justified.

Because finality requires 2/3 agreement that a block is canonical, an attacker cannot possibly create an alternative finalized chain without a) owning or manipulating 2/3 of the total staked ether, b) destroying at least 1/3 of the total staked ether. The first condition arises because 2/3 of the staked ether is required to finalize a chain. The second condition arises because if 2/3 of the total stake has voted in favour of both forks then 1/3 must have voted on both - this is a slashing condition that would be maximally punished and 1/3 of the total stake would be destroyed. At the time of writing this requires an attacker be willing to lose about $10,000,000,000 worth of ether.

### Incentives and Slashing

Validators are rewarded for honestly proposing and validating blocks. The rewards come in the form of ether added to their stake. On the other hand, validators that are absent and fail to act when called upon miss out on these rewards and sometimes lose a small portion of their existing stake. However, the penalties for being offline are small and in most cases amount to opportunity costs of missing rewards. There are some validator actions that are very difficult to do accidentally and signify some malicious intent such as proposing multiple blocks for the same slot, attesting to multiple blocks for the same slot or contradicting previous checkpoint votes. These are “slashable” behaviors that are penalized mroe harshly. Slashing results in some portion of the validator's stake being destroyed and the validator being removed from the network. This takes 36 days. On Day 1 there is an initial penalty of up to 0.5 ETH. Then the slashed validator’s ether slowly drains away across the exit period, but on Day 18 they receive a “correlation penalty” which is larger when more validators are slashed around the same time. The maximum penalty is the entire stake. These rewards and penalties are designed to incentivize honest validators and disincentivize attacks on the network.

### Inactivity Leak

As well as security, Gasper also provides "plausible liveness". This is the condition that as long as 2/3 of the total staked ether is voting honestly and following the protocol, the chain will be able to finalize irrespective of any other activity (such as attacks, latency issues or slashings). Put another way, 1/3 of the total staked ether must be somehow compromised to prevent the chain from finalizing. In Gasper there is an additional line of defense against a liveness failure, known as the "inactivity leak". This mechanism activates when the chain has failed to finalize for more than 4 epochs. The validators that are not actively attesting to the majority chain have their stake gradually drained away until the majority regains 2/3 of the total stake, ensuring that liveness failures are only temporary.

### Fork choice

The original definition of Casper-FFG included a fork choice algorithm that imposed the rule: `follow the chain containing the justified checkpoint that has the greatest height` where height is defined as the greatest distance from the genesis block. In Gasper the original fork choice-rule has been deprecated in favour of a more sophisticated algorithm called LMD-GHOST. It is important to realize that under normal conditions a fork choice rule is uneccessary - there is a single block proposer for every slot and honest validators attest to it. It is only in cases of large network asynchronicity or when a dishonest block proposer has equivoated that a fork choice algorithm is required. However, when those cases do arise, the fork choice algorithm is a critical defense that secures the correct chain.

LMD-GHOST stands for "latest message driven greedy heaviest observed sub-tree". This is a jargon-heavy way to define an algorithm the selects the fork with the greatest accumulated weight of attestations as the canonical one (greedy heaviest subtree) and that if multiple messages are received from a validator, only the latest one is considered (latest-message driven). Every validator assesses each block using this rule before adding the heaviest block to its canonical chain.

## Further Reading

[Gasper: Combining GHOST and Casper](https://arxiv.org/pdf/2003.03052.pdf)
[Capser the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)
