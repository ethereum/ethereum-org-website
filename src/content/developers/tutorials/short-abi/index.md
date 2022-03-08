---
title: "Short ABIs for Calldata Optimization"
description: Optimizing smart contracts for Optimistic Rollups
author: Ori Pomerantz
lang: en
sidebar: true
tags: ["layer 2", "l2", "optimism"]
skill: intermediate
published: 2022-04-01
---

## Introduction {#introduction}

[Optimistic rollups](/developers/docs/scaling/optimistic-rollups) have to preserve a record of every historical transaction in such a manner that anybody will be able to go through them and verify that the current state is correct.
The cheapest way to get data into the Ethereum mainnet is to write it as calldata.
This solution was chosen by both [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) and [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

Therefore, the cost of L2 transactions is composed of two components:

1. L2 processing, which is usually extremely cheap
1. L1 storage, which is tied to mainnet gas costs

As I'm writing this, on Optimism the cost of L2 gas is 0.001 [Gwei](https://ethereum.org/en/developers/docs/gas/#pre-london).
The cost of L1 gas, on the other hand, is approximately 40 Gwei.
[You can see the current prices here](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

A byte of call data costs either 4 gas (if it is zero) or 16 gas (if it is any other value), currently that is 640 Gwei.
One of the most expensive operations on the EVM is writing to storage.
The maximum cost of writing a 32 byte word to storage on L2 is 22100 gas, currently that is 22.1 Gwei.
So if we can save a single zero byte of calldata, we'll be able to write about 200 bytes to storage and still come out ahead.


### The ABI {#the-abi}

The vast majority of transactions access a contract from an externally-owned account. 
Most contracts are written in Solidity and interpret their data field in accordance with [the application binary interface (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

However, the ABI was designed for L1. 


### Proper disclosure {#proper-disclosure}

I'm a full time [Optimism](https://www.optimism.io/) employee, so most of the examples in this article are going to come from there.
However, the technique explained here should work for other rollups too.

