---
title: Gasper
description: An explanation of the Gasper PoS mechanism.
lang: en
sidebar: true
incomplete: true
---

Gasper is a combination of Casper the Friendly Finality Gadget and the LMD-GHOST fork choice algorithm. Together these components form the consensus mechanism securing proof-of-stake Ethereum. Casper is the mechanism that uprgades certain blocks to "finalized" so that new entrants into the network can be confident that they are syncing the canonical chain. The fork chocie algorithm uses accumulated votes to ensure that when forks arise in the blockchain nodes can easily select the correct one.

## What is a finality gadget?

Casper the Friendly Finality Gadget (Casper-FFG) is an algorithm that finalizes blocks. This means upgrading certain blocks so that they cannot be reverted unless there has been a critical consensus failure. Selecting a unique canonical chain by providing finality is Casper-FFG's only purpose, meaning it has to be paired with other components, such as block proposal and fork-choice rules to form a complete consensus mechanism. Casper-FFG could be applied as an upgrade to several existing blockchain designs. It currently runs on top of Ethereum's proof-of-work blockchain and will soon switch to finalizing the proof-of-stake chain. This modularity is the reason Casper is referred to as a "finality gadget".

## Why does Ethereum need a finality gadget?

Casper-FFG provides safety and liveness assurances to Ethereum. Once a block has been finalized, an attacker would have to destroy millions of ether (i.e. billions of USD) to change it.

## How does Casper-FFG work?

Casper-FFG (Casper the friendly finality gadget) is the mechanism used to ossify the chain at specific intervals. This is a process of upgrading blocks to "justified" if they are voted for by at least 2/3 of the total staked ether, and "finalized" is another block is justified on top of it.

### Justification

### Finality

Finalized blocks then cannot be reverted unless an attacker has burned at least 33% of the total staked ether (because they must have created two competing chains each with 2/3 attestations in order to create competing finalized blocks, meaning at least 1/3 of validators are contradicting themselves - they will be slashed maximally meaning 33% of the total stake is destroyed).

### Slashing

### Inactivity Leak

### Fork choice

The original definition of Casper-FFG included a fork choice algorithm that imposed the rule: `follow the chain containing the justified checkpoint that has the greatest height` where height is defined as the greatest distance from the genesis block. This has been deprecated in favour of a more sophisticated algorithm called LMD-GHOST. The combination of Casper-FFG and LMD-GHOST is soemtimes called "Gasper" and it is the consenuss mechanism that will be used in proof-of-stake Ethereum.
