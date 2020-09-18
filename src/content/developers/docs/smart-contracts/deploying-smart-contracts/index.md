---
title: Deploying smart contracts
description:
lang: en
sidebar: true
incomplete: true
---

You need to deploy your contract for it to be available to users of the Ethereum network. Deploying is just sending a transaction containing the code of the compiled smart contract without specifying any recipients. This means you'll need to pay a transaction fee so make sure you have some ETH.

## Prerequisites

Before deploying your contract you'll need to have compiled it, so make sure you've read about [compiling smart contracts](/developers/docs/smart-contracts/compiling-smart-contracts/). Also make sure you understand how smart contracts are written – you'll pay more in Gas to deploy a bloated smart contract. Take a look at [smart contract anatomy](/developers/docs/smart-contracts/anatomy/) and a tutorial on [how to downsize your contract](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/).

## What you'll need

- your contract's bytecode – this is generated through [compilation](/developers/docs/smart-contracts/compiling-smart-contracts/).
- Ether for gas – you'll set your gas limit like other transactions so be aware that contract deployment needs a lot more gas than a simple ETH transfer.
- a deployment script or plugin.
- an API key, like the ones provided by Infura or Alchemy, or a [node](/developers/docs/nodes-and-clients/) to point to.

<!-- Elaborate on options: e.g. run a node, use a node as a service etc. -->

Once deployed your contract will have an Ethereum address like other [accounts](/developers/docs/accounts/).

## Related tutorials

- [Deploying your first smart contract](/developers/tutorials/deploying-your-first-smart-contract/) _– An introduction to deploying your first smart contract on an Ethereum test network._
- [Interact with other contracts from Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– How to deploy a smart contract from an existing contract and interact with it._

## Related tools

- [Remix](https://remix.ethereum.org) _– Remix IDE allows developing, deploying and administering smart contracts for Ethereum like blockchains._
