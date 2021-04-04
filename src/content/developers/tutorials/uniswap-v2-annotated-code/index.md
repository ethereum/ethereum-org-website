---
title: "Uniswap-v2 Contract Walk-Through"
description: How does the Uniswap-v2 contract work? Why is it written that way?
author: Ori Pomerantz
lang: en
sidebar: true
tags: ["solidity", "uniswap"]
skill: intermediate
published: 2021-05-01
---

## Introduction {#introduction}

[Uniswap v2](https://uniswap.org/whitepaper.pdf) can create an exchange market between any two ERC-20 tokens. In this
article we will go over the source code for the contracts that implement this protocol and see why they are written
this way.

### Why v2? Why not v3? {#why-v2}

As I'm writing this, [Uniswap v3](https://uniswap.org/whitepaper-v3.pdf) is almost ready. However, it is an upgrade
that is much more complicated than the original. It is easier to first do v2, which is simpler, and then go to v3.


### Core Contracts vs Periphery Contracts  {#contract-types}

The contracts


## The Core Contracts {#core-contracts}

### UniswapV2Pair.sol   {#UniswapV2Pair}
### UniswapV2Factory.sol  {#UniswapV2Factory}
### UniswapV2ERC20.sol    {#UniswapV2ERC20}


## The Periphery Contracts {#periphery-contracts}

### UniswapV2Migrator.sol  {#UniswapV2Migrator}
### UniswapV2Router01.sol  {#UniswapV2Router01}
### UniswapV2Router02.sol  {#UniswapV2Router02} 

## Conclusion {#Conclusion}
