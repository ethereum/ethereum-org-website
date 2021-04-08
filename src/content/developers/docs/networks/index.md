---
title: Networks
description: An overview of Ethereum's networks and where to get testnet ether (ETH) for testing your application.
lang: en
sidebar: true
---

Since Ethereum is a protocol, this means there can be multiple independent "networks" conforming to this protocol that do not interact with each other.

Networks are different Ethereum environments you can access for development, testing, or production use cases. Your Ethereum account will work across the different networks but your account balance and transaction history wont carry over from the main Ethereum network. For testing purposes, it's useful to know which networks are available and how to get testnet ETH so you can play around with it.

## Prerequisites {#prerequisites}

You should understand the basics of Ethereum before reading up on the different networks as the test networks will give you a cheap, safe version of Ethereum to play around with. Try our [introduction to Ethereum](/developers/docs/intro-to-ethereum/).

## Public networks {#public-networks}

Public networks are accessible to anyone in the world with an internet connection. Anyone can read or create transactions on a public blockchain and validate the transactions being executed. Agreement on transactions and the state of the network is decided by a consensus of peers.

### Mainnet {#mainnet}

Mainnet is the primary public Ethereum production blockchain, where actual-value transactions occur on the distributed ledger.

When people and exchanges discuss ETH prices, they're talking about mainnet ETH.

### Testnets {#testnets}

In addition to mainnet, there are public testnets. These are networks used by protocol developers or smart contract developers to test both protocol upgrades as well as potential smart contracts in a production-like environment before deployment to mainnet. Think of this as an analog to production versus staging servers.

It’s generally important to test any contract code you write on a testnet before deploying to the mainnet. If you're building a dapp that integrates with existing smart contracts, most projects have copies deployed to testnests that you can interact with.

Most testnets use a proof-of-authority consensus mechanism. This means a small number of nodes are chosen to validate transactions and create new blocks – staking their identity in the process. It's hard to incentivise mining on a proof-of-work testnet which can leave it vulnerable.

#### Görli {#goerli}

A proof-of-authority testnet that works across clients.

#### Kovan {#kovan}

A proof-of-authority testnet for those running OpenEthereum clients.

#### Rinkeby {#rinkeby}

A proof-of-authority testnet for those running Geth client.

#### Ropsten {#ropsten}

A proof-of-work testnet. This means it's the best like-for-like representation of Ethereum.

### Testnet Faucets {#testnet-faucets}

ETH on testnets has no real value; therefore, there are no markets for testnet ETH. Since you need ETH to actually interact with Ethereum, most people get testnet ETH from faucets. Most faucets are webapps where you can input an address which you request ETH to be sent to.

- [Görli faucet](https://faucet.goerli.mudit.blog/)
- [Kovan faucet](https://faucet.kovan.network/)
- [Rinkeby faucet](https://faucet.rinkeby.io/)
- [Ropsten faucet](https://faucet.ropsten.be/)

## Private networks {#private-networks}

An Ethereum network is a private network if its nodes are not connected to a public network (i.e. mainnet or a testnet). In this context, private only means reserved or isolated, rather than protected or secure.

### Development networks {#development-networks}

To develop an Ethereum application, you'll want to run it on a private network to see how it works before deploying it. Similar to how you create a local server on your computer for web development, you can create a local blockchain instance to test your dapp. This allows for much faster iteration than a public testnet.

There are projects and tools dedicated to assist with this. Learn more about [development networks](/developers/docs/development-networks/).

### Consortium networks {#consortium-networks}

The consensus process is controlled by a pre-defined set of nodes that are trusted. For example, a private network of known academic institutions that each govern a single node, and blocks are validated by a threshold of signatories within the network.

If a public Ethereum network is like the public internet, you can think of a consortium network as a private intranet.

<!-- TODO

## Interacting with testnets

### Your own local network {#your-own-local-network}

`geth -—networkid="12345" console`

### Testnets {#testnets-1}

Wallets like MetaMask or MyEtherWallet will allow you to switch networks so you can test your apps using your test ETH.

-->

## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_
