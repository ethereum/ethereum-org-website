---
title: Block production
description: Explanation of how blocks are produced in proof-of-stake Ethereum.
lang: en
---

Blocks are the fundamental units of the blockchain. This page explains how they are produced.

## Prerequisites

Block production is part of the proof-of-stake protocol. To help understand this page, we recommend you read about [proof-of-stake](src/content/developers/docs/consensus-mechanisms/pos/) and [block architecture](src/content/developers/docs/blocks/).

## Who produces blocks?

Blocks are produced by validators. Validators are node operators that run validator software as well as their execution and consensus clients, and have deposited at least 32 ETH into the deposit contract. However, each individual validator is only occasionally responsible for producing a block. Time in Etheruem is broken into slots and epochs. Each slot is 12s in real-world time, and 32 slots (6.4 minutes) make up an epoch. Every slot is an opportunity for a block to be added to the blockchain.

In Ethereum's proof-of-stake mechanism, an algorithm called RANDAO chooses a single validator to propose a block in each slot. This works by accumulating randomness from block to block. The block proposer adds a random value to the block that is mixed with the 'accumulated' RANDAO value when the block is processed. The random value gets its entropy from the validator's private key, which itself is generated sufficiently randomly, the total number of active validators, missed blocks, and the validator's effective balance.

Although validators add to RANDAO in each slot, the global RANDAO value is only updated once per epoch. To compute the index of the next block proposer, the RANDAO value is mixed with the slot number to give a unique value in each slot. The probability of an individual validator being selected is not simply `1/N` (where `N` = total active validators). Instead, it is weighted by the effective ETH balance of each validator. The maximum effective balance is 32 ETH (this means that `balance < 32 ETH` leads to a lower weight than `balance ==32 ETH`, but `balance > 32 ETH` does not lead to higher weighting than `balance == 32 ETH`).

Only one block proposer is selected in each slot. Under normal conditions, a single block producer creates and releases a single block in their dedicated slot. Creating two blocks for the same slot is a slashable offence, often known as "equivocation".

## What is in a block?

Once a block proposer has been selected, their next task is to create a block. A detailed description of the contents of a block is available on our [blocks page](/developers/docs/blocks/index.md/#block-anatomy). The block contents can be divided into two broad categories - consensus information and execution payload.

The consensus information includes the `randao_reveal` used to select the next block proposer, information about slashings, attestations for the block, information about exiting validators and sync-committee information for serving light clients. The execution payload contains all the information related to transactions, including the transactions themselves, the roots of the state and receipts tries and the parent root, the gas used to execute the transactions and related metadata.

The information in the block is used to update Ethereum's global state, manage validator entries/exits, maintain consensus and process rewards, penalties and slashings.

## How is the block produced?

The block producer creates a block by collecting data from its own local database. The execution client has access to a local pool of transactions that it has heard about on its own gossip network. These transactions are executed locally to generate an updated state trie known as a post-state.

## what happens to the block?

## further reading
