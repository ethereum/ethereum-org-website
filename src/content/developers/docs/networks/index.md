---
title: Networks
description: An overview of Ethereum's test networks and where to get testnet Ether (ETH) for testing your application.
lang: en
sidebar: true
---

Networks are different Ethereum environments you can access for development, testing, or production use cases. Your Ethereum account will work across the different networks but your account balance and transaction history wont carry over from the main Ethereum network. For testing purposes, it's useful to know which networks are available and how to get testnet ETH so you can play around with it.

## Prerequisites

You should understand the basics of Ethereum before reading up on the different networks as the test networks will give you a cheap, safe version of Ethereum to play around with. Try our [introduction to Ethereum](/en/developers/docs/intro-to-ethereum/).

## Public available networks

Ethereum is a protocol. This means there can be multiple independent networks conforming to this protocol that do not interact with each other.

### Mainnet

Mainnet is the primary public Ethereum production blockchain, where actual valued transactions occur on the distributed ledger.

When people and exchanges discuss ETH prices, they're talking about mainnet ETH.

### Testnets

In addition to mainnet, there are public testnets. These are networks used by protocol developers or smart contract developers to test both protocol upgrades as well as potential smart contracts in a production-like environment before deployment to mainnet. Think of this as an analog to production versus staging servers.

It’s generally important to test any contract code you write on a testnet before deploying to the mainnet. If you're building a dapp that integrates with existing smart contracts, most projects have copies deployed to testnests that you can interact with.

Most testnets use a proof-of-authority consensus mechanism. This means a small number of nodes are chosen to validate transactions and create new blocks – staking their identity in the process. It's hard to incentivise mining on a proof-of-work testnet which can leave it vulnerable.

#### Görli

A proof-of-authority testnet that works across clients.

#### Kovan

A proof-of-authority testnet for those running OpenEthereum clients.

#### Rinkeby

A proof-of-authority testnet for those running Geth client.

#### Ropsten

A proof-of-work testnet. This means it's the best like-for-like representation of Ethereum.

## Testnet Faucets

ETH on testnets has no real value; therefore, there are no markets for testnet ETH. Since you need ETH to actually interact with Ethereum, most people get testnet ETH from faucets. Most faucets are webapps where you can input an address which you request ETH to be sent to.

- [Görli faucet](https://faucet.goerli.mudit.blog/)
- [Kovan faucet](https://faucet.kovan.network/)
- [Rinkeby faucet](https://faucet.rinkeby.io/)
- [Ropsten faucet](https://faucet.ropsten.be/)

<!-- TODO -->
<!-- ## Interacting with testnets

### Your own local network

`geth -—networkid="12345" console`

### Testnets

Wallets like MetaMask or MyEtherWallet will allow you to switch networks so you can test your apps using your test ETH. -->
