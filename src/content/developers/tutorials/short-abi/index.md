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

In this article you learn about [optimistic rollups](/developers/docs/scaling/optimistic-rollups), the cost of transactions on them, and how that different cost structure requires us to optimize for different things than on the Ethereum mainnet.
You also learn how to implement this optimization.

### Proper disclosure {#proper-disclosure}

I'm a full time [Optimism](https://www.optimism.io/) employee, so most of the examples in this article are going to come from there.
However, the technique explained here should work for other rollups too.

### Terminology   {#terminology}

When discussing rollups the term "layer 1" (or L1) is used for mainnet, the production Etherum network.
The term "layer 2" (or L2) is used for the rollup, or any other system that relies on L1 for security but does most of its processing offchain.


## The problem {#the-problem}

### Cost of L2 transactions  {#cost-of-l2-transactions}

[Optimistic rollups](/developers/docs/scaling/optimistic-rollups) have to preserve a record of every historical transaction in such a manner that anybody will be able to go through them and verify that the current state is correct.
The cheapest way to get data into the Ethereum mainnet is to write it as calldata.
This solution was chosen by both [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) and [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

Therefore, the cost of L2 transactions is composed of two components:

1. L2 processing, which is usually extremely cheap
1. L1 storage, which is tied to mainnet gas costs

As I'm writing this, on Optimism the cost of L2 gas is 0.001 [Gwei](https://ethereum.org/en/developers/docs/gas/#pre-london).
The cost of L1 gas, on the other hand, is approximately 40 Gwei.
[You can see the current prices here](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

A byte of call data costs either 4 gas (if it is zero) or 16 gas (if it is any other value).
One of the most expensive operations on the EVM is writing to storage.
The maximum cost of writing a 32 byte word to storage on L2 is 22100 gas, currently that is 22.1 Gwei.
So if we can save a single zero byte of calldata, we'll be able to write about 200 bytes to storage and still come out ahead.


### The ABI {#the-abi}

The vast majority of transactions access a contract from an externally-owned account. 
Most contracts are written in Solidity and interpret their data field in accordance with [the application binary interface (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

However, the ABI was designed for L1 where a byte of calldata costs approximately the same as four arithmetic operations, not L2 where a byte of calldata costs more than a thousand arithmetic operations.
For example, [here is an ERC-20 transfer transaction](https://kovan-optimistic.etherscan.io/tx/0x7ce4c144ebfce157b4de99d8ad53a352ae91b57b3fa06d8a1c79439df6bfa998).
The call data is divided like this:

| Section | Length | Bytes | Wasted bytes | Wasted gas | Necessary bytes | Necessary gas |
| ------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Function selector | 4 | 0-3 | 3 | 48 | 1 | 16
| Zeroes | 12 | 4-15 | 12 | 48 | 0 | 0
| Destination address | 20 | 16-35 | 0 | 0 | 20 | 320 
| Amount | 32 | 36-67 | 17 | 64 | 15 | 240
| Total  | 68 | | | 160 | | 576

Explanation:

- **Function selector**: The contract has less than 256 functions, so we can distinguish them with a single byte.
  These bytes are typically non-zero and therefore [cost sixteen gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Zeroes**: These bytes are always zero because a twenty byte address does not require a thirty two byte word to hold it.
  Bytes that hold zero cost four gas ([see the yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), Appendix G,
  p. 27, the value for `G`<sub>`txdatazero`</sub>).
- **Amount**: If we assume that in this contract `decimals` is eighteen (the normal value) and the maximum amount of tokens we transfer will be 10<sup>18</sup>, we get a maximum amount of 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, so fifteen bytes are enough.
  
A waste of 160 gas on L1 is normally negligible. A transaction costs at least [21,000 gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), so an extra 0.8% doesn't matter.
However, on L2 things are different, almost the entire cost of the transaction is writing it to L1.
In addition to the transaction calldata, there are 109 bytes of transaction header (destination address, signature, etc.).
The total cost is therefore `109*16+576+160=2480`, and we are wasting about 6.5% of that.

## The solution {#the-solution}

Assuming that 


Example transaction of it working: https://kovan-optimistic.etherscan.io/tx/0x4c823826f9e19e7befe4ba78b9496e4e5fbb81007605030e8a2f8562a49ae82c


## Conclusion

You can do more if you control the destination contract too

