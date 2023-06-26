---
title: "Building a user interface for your contract"
description: Using modern components such as TypeScript, React, Vite, and Wagmi, we will go over a modern, but minimal, user interface and learn how to connect a wallet to the user interface, call a smart contract to read information, send a transaction to a smart contract, and monitor events from a smart contract to identify changes.
author: Ori Pomerantz
tags: ["typescript", "react", "vite", "wagmi", "frontend"]
skill: beginner
published: 2023-08-01
lang: en
---

You found a feature we need in the Ethereum ecosystem. You wrote the smart contracts to implement it, and maybe even some related code that runs offchain. This is great! Unfortunately, without a user interface you aren't going to have any users, and the last time you wrote a web site people used dial-up modems and JavaScript was new.

This article is for you. I assume you know programming, and maybe a bit of JavaScript and HTML, but that your user interface skills are rusty and out of date. Together we will go over a simple modern application so you'll see how it's done these days.

## Why is this important {#why-is-this-important}

In theory, you could just have people use [Etherscan](https://goerli-optimism.etherscan.io/address/0x51dac29fe2da340f03ec4e4c9e3724c153314d1f#readContract) to interact with your contracts. That will be great for the experienced Ethereans. But we are trying to serve [another billion people](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). This won't happen without a great user experience, and a friendly user interface is a big part of that. 


For: https://github.com/ethereum/ethereum-org-website/issues/10489
