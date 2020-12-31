---
title: Create and deploy a DeFi App
description: Deposit ERC20 tokens to the smart contract and mint Farm Tokens
author: "strykerin"
tags:
  [
    "solidity",
    "defi",
    "web3.js",
    "truffle",
    "ganache",
    "smart contracts"
  ]
skill: intermediate
lang: en
sidebar: true
published: 2020-12-31
source: github.com
sourceUrl: https://github.com/strykerin/DeFi-Token-Farm
---

In this tutorial we will build a DeFi Application with Solidity where users can deposit an ERC20 token to the smart contract and it will mint and transfer Farm Tokens to them. The users can later withdraw their ERC20 tokens by burning their Farm Token on smart contract and the ERC20 tokens will be transferred back to them.

## Install Truffle and Ganache

If this is the first time you are writing a smart contract, you will need to set up your environment. We are going to use two tools: [Truffle](https://www.trufflesuite.com/) and [Ganache](https://www.trufflesuite.com/ganache).

Truffle is a development environment and testing framework for developing smart contracts for Ethereum. With Truffle it is easy to build and deploy smart contracts to the blockchain. Ganache allow us to create a local Ethereum blockchain in order to test smart contracts. It simulates the features of the real network and the first 10 accounts are funded with 100 test Ether, thus making the smart contract deployment and testing free and easy. Ganache is available as a desktop application and a command-line tool. For this article we will be using the UI desktop application.
