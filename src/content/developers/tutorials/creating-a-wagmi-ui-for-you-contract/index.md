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

## Why is this important {#why-important}

In theory, you could just have people use [Etherscan](https://goerli-optimism.etherscan.io/address/0x51dac29fe2da340f03ec4e4c9e3724c153314d1f#readContract) to interact with your contracts. That will be great for the experienced Ethereans. But we are trying to serve [another billion people](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). This won't happen without a great user experience, and a friendly user interface is a big part of that. 


# Greeter application {#greeter-app}

There is a lot of theory behind for a modern UI works, and [a lot of good sites](https://react.dev/learn/thinking-in-react) [that explain it](https://wagmi.sh/core/getting-started). Instead of repeating the fine work done by those sites, I'm going to assume you prefer to learn by doing and start with an application you can play with. You still need the theory to get things done, and we'll get to it - we'll just go source file by source file, and discuss things as we get to them.



## Scaffolding

```
npm create wagmi
simple-app
Vite (React)
RainbowKit






For: https://github.com/ethereum/ethereum-org-website/issues/10489
