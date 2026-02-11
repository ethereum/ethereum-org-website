---
title: Providing your customers with a gasless experience
description: It is easy to create a private key and an address; it's just a matter of running the right software. But there are many places in the world where getting the ETH to send transactions is much harder. In this tutorial you learn how to cover the onchain gas costs for executing user-signed, off-chain structured data in your smart contract. You have the user sign a structure containing the transaction information, which your offchain code then submits to the blockchain as a transaction.
author: Ori Pomerantz
tags: ["gasless"]
skill: beginner
lang: en
published: 2026-03-01
---

## Introduction {#introduction}

If we want Ethereum to serve [a billion more people](https://blog.ethereum.org/category/next-billion) we need to remove friction, to make it as easy to use as possible. One of the sources of this friction is the need for ETH to pay gas fees.

If you have a dapp that makes money off of users, it might make sense to let users submit transactions through your server and pay their transaction fees yourself. Because users still sign their transactions in their wallets, they still get Ethereum guarantees of integrity. Availability depends on the server that relays the transactions, so it is more limited, but you can set things up so users will also be able to access the smart contract directly (if they get ETH), and to let others set up their own servers if they want to sponsor transactions.

The technique in this tutorial only works when you control the smart contract. There are ot[her techniques](https://eips.ethereum.org/EIPS/eip-4337) that let you sponsor transactions to other smart contracts, which I hope to cover in a future tutorial.

## The sample application {#sample-app}

The sample application here is a variant on HardHat's `Greeter` contract. 

### The smart contract {#smart-contract}

### The user interface {#ui-changes}

### The server {#server}


Changing the smart contract to accept and verify ERC-712 signatures.
## Conclusion {#conclusion}

ERC-712 vs. ERC-4337.

[See here for more of my work](https://cryptodocguy.pro/).
