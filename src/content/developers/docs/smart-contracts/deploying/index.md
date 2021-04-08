---
title: Deploying smart contracts
description:
lang: en
sidebar: true
incomplete: true
---

You need to deploy your smart contract in order for it to be available to users of an Ethereum network.

To deploy a smart contract, you merely send an Ethereum transaction containing the code of the compiled smart contract without specifying any recipients.

## Prerequisites {#prerequisites}

You should understand [Ethereum networks](/developers/docs/networks/), [transactions](/developers/docs/transactions/) and the [anatomy of smart contracts](/developers/docs/smart-contracts/anatomy/) before deploying smart contracts.

Deploying a contract also costs ETH, so you should be familiar with [gas and fees](/developers/docs/gas/) on Ethereum.

Finally, you'll need to compile your contract before deploying it, so make sure you've read about [compiling smart contracts](/developers/docs/smart-contracts/compiling/).

## How to deploy a smart contract {#how-to-deploy-a-smart-contract}

This means you'll need to pay a transaction fee so make sure you have some ETH.

### What you'll need {#what-youll-need}

- your contract's bytecode – this is generated through [compilation](/developers/docs/smart-contracts/compiling/).
- Ether for gas – you'll set your gas limit like other transactions so be aware that contract deployment needs a lot more gas than a simple ETH transfer.
- a deployment script or plugin.
- access to an [Ethereum node](/developers/docs/nodes-and-clients/), either by running your own, connecting to a public node, or via an API key using a service like Infura or Alchemy

<!-- TODO Elaborate on options: e.g. run a node, use a node as a service etc. -->

<!-- TODO! -->
<!-- ### Steps to deploy a smart contract -->

Once deployed, your contract will have an Ethereum address like other [accounts](/developers/docs/accounts/).

## Related tools {#related-tools}

**Remix -** **_Remix IDE allows developing, deploying and administering smart contracts for Ethereum like blockchains._**

- [Remix](https://remix.ethereum.org)

**Tenderly -** **_A platform to easily monitor your smart contracts with error tracking, alerting, performance metrics, and detailed contract analytics._**

- [tenderly.co](https://tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

## Related tutorials {#related-tutorials}

- [Deploying your first smart contract](/developers/tutorials/deploying-your-first-smart-contract/) _– An introduction to deploying your first smart contract on an Ethereum test network._
- [Interact with other contracts from Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– How to deploy a smart contract from an existing contract and interact with it._
- [How to downsize your contract size](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- How to reduce your contract's size to keep it under the limit and save on gas_

## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_

## Related topics {#related-topics}

- [Development frameworks](/developers/docs/frameworks/)
