---
title: Casper-FFG
description: An explanation of the Casper-FFG mechanism.
lang: en
sidebar: true
incomplete: true
---

# Consensus mechanism

Casper-FFG (Casper the friendly finalty gadget) is the mechanism used to ossify the chain at specific intervals. This is a process of upgrading blocks to "justified" if they are voted for by at least 2/3 of the total staked ether, and "finalized" is another block is justified on top of it.

## Justification

Justified blocks are essentially candidates for finalization. They probably wont be reorg'd, but they technically could be.

## Finalization

Finalization guarantees that the block will not be reverted unless the chain has suffered a critical consensus failure.

## Economic Finality

Finalized blocks then cannot be reverted unless an attacker has burned at least 33% of the total staked ether (because they must have created two competing chains each with 2/3 attestations in order to create competing finalized blocks, meaning at least 1/3 of validators are contradicting themselves - they will be slashed maximally meaning 33% of the total stake is destroyed).
