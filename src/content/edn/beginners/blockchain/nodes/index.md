---
title: Nodes
description:
lang: en
sidebar: true
---

# Nodes

**Original author:** Wil Barnes  
**Link:** https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a

<Divider />

Nodes intro

## Prerequisites

## Overview

When we use the word node within this technical documentation, we're referring to an Ethereum client.

> _An Ethereum client is a software application that implements the Ethereum specification and communicates over the peer-to-peer network with other Ethereum clients. Different Ethereum clients interoperate if they comply with the reference specification and the standardized communications protocols. While these different clients are implemented by different teams and in different programming languages, they all "speak" the same protocol and follow the same rules. As such, they can all be used to operate and interact with the same Ethereum network._

– Author: Andreas M. Antonopoulos, "Mastering Ethereum" Section 03 - Clients.

Geth and Parity are arguably the two most common Ethereum clients. For this reason, we'll walk through how to run these clients in more detail through this documentation.

| Client             | Language                   | Developers                          |              |
| ------------------ | -------------------------- | ----------------------------------- | ------------ |
| Geth               | Go                         | Ethereum Foundation                 |
| Parity             | Rust                       | Ethcore                             |
| cpp-ethereum       | C++                        | Ethereum Foundation                 |
| Trinity            | Python                     | Ethereum Foundation / Piper Merriam |
| Ethereumjs modules | Javascript                 | Ethereum Foundation                 |
| Ethereum(J)        | Java                       | Ethereum Foundation                 |
| Harmony            | Java                       | Ether.camp                          |
| Pantheon           | Java                       | PegaSys                             |
| ruby-ethereum      | Ruby                       | Jan Xie                             | `DEPRECATED` |
| ethereumH          | Haskell                    | BlockApps                           | `DEPRECATED` |
| Quorum             | Go (A fork of go-ethereum) | JPMorgan Chase                      |
| Exthereum          | Elixir                     | Geoffrey Hayes                      |

The client diversity we enjoy as Ethereum network participants is indicative of a healthy ecosystem. There exists a myriad of different clients, many independently developed each with their own feature set, yet they remain interoperable with other Ethereum client implementations. Interoperability within the network is important, and it further boosts the adoption of software such as "remote clients" and "wallets" that improve the general user's experience.

## Running a node

### Full node

You're running a full implementation of the Ethereum network on your machine. This is as robust as it gets. It requires a not insignificant commitment of time and effort, as well as related hardware and bandwidth incurred costs, to support the synchronization and maintenance of a full node.

A full node is not required to develop on Ethereum.

A full node will require 80+ GB of disk storage space to store Ethereum's chaindata. Chaindata is the ever expanding chain from the genesis block to the latest best block.

Generally accepted criteria of a full Ethereum node: full synchronization of the blockchain, from the genesis block to the latest best block with the highest amount of accumulated work* full replay and validation of all transactions, contract deployments, and contract executions, per block, starting at the genesis to the latest best block* has recomputed the state of each consecutive block, from the genesis to latest best block* has all historical blocks on disk, from the genesis to latest best block* \* maintains the most recent states, while pruning ancient states

The full node theme here is self-evident: all block data from the genesis block to the latest best block with the highest amount of accumulated work is stored on the full node's disk. State data is allowed to be pruned because when a node holds the record of all historical blocks, it can subsequently recompute any historical state.

SOURCES: https://dev.to/5chdn/the-ethereum-blockchain-size-will-not-exceed-1tb-anytime-soon-58a

## Technical Dive

The Geth and Parity clients both support quicker synchronization modes, "fast sync" and "warp sync" respectively. The way each client actually syncs is a bit more nuanced.

### Geth

Full sync
When a Geth node full syncs, it starts at the genesis block and works through each consecutive transaction, on a per block basis, until it reaches the latest best block. This is a time consuming process.

When a Geth node fast syncs, instead of working through each consecutive transaction, the client downloads the transaction receipts in parallel to all the blocks, then pulls the entire most recent state database, and then switches to full sync mode as described above.

### Parity

When a Parity node no-warp, archive syncs, it starts at the genesis block and works through each consecutive transaction, on a per block basis, until it reaches the latest best block. Along the way, it computes and saves all state data for each block. This is a time consuming and storage intensive process.

When a Parity node no-warp, fast syncs, it starts at the genesis block and works through each consecutive transaction, on a per block basis, until it reaches the latest block. Along the way, it prunes ancient states, maintaining the most recent states on disk. This is a time consuming process.

When a Parity node warp, fast syncs, it skips almost all of the block processing, instead injecting appropriate data directly into the database. Warp synchronization fetches a recent snapshot from the network, restores it, and then continues syncing to the incoming newly validated blocks.

## Light node

You're running a truncated implementation of the Ethereum network. A light node validates block headers and only other things that need to be verified.
