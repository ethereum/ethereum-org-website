---
title: Fork choice
description: An explanation of the fork choice algorithm implemented in proof-of-stake Ethereum.
lang: en
sidebar: true
incomplete: true
---

## Why do clients need a fork choice algorithm?

Under ideal conditions of no network latency and 100% participation of completely honest validators, there is no need for a fork choice algorithm in proof-of-stake Ethereum. This is because in each slot, a single block proposer is randomly selected to create and propagate a block to other nodes, who all validate and add it to the head of their blockchain. However, in reality there are several circumstances that can lead different nodes to have different views of the head of the chain (for example because some nodes receive blocks later than other) or even for two blocks to exist in the same slot (if a malicious validator has "equivocated" by proposing twice). In these scenarios, Ethereum clients must have a fixed set of rules to follow to determine which block to add to the chain and which to discard. This set of rules is encoded in the fork choice algorithm.

## LMD-GHOST

Ethereum's fork-choice algorithm is known as LMD_GHOST, standing for "latest message driven greedy heaviest observed subtree". The basic idea is to choose the fork that has accumulated the greatest weight of attestations. The attestation weight is the total number of attestations weighted by the balance of each validator, so that validators that have been lazy or badly behaved have a smaller influence. This expains the GHOST part of the algorithm - if the client observes a subtree (>=1 fork) at the head of the chain, it chooses the heaviest one.

The LMD part is a modification that ensures the client only accepts a single message from each validator. If it receives additional messages, older ones are simply discarded. This closes a theoretical attack vectors that uses delayed messages to trick LMD-naive GHOST algorithms into choosing a particular fork that it would otherwise discard.
