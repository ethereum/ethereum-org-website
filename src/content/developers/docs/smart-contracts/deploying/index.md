---
title: Deploying smart contracts
description:
lang: en
---

You need to deploy your smart contract for it to be available to users of an Ethereum network.

To deploy a smart contract, you merely send an Ethereum transaction containing the compiled code of the smart contract without specifying any recipient.

## Prerequisites {#prerequisites}

You should understand [Ethereum networks](/developers/docs/networks/), [transactions](/developers/docs/transactions/) and the [anatomy of smart contracts](/developers/docs/smart-contracts/anatomy/) before deploying smart contracts.

Deploying a contract also costs ether (ETH), so you should be familiar with [gas and fees](/developers/docs/gas/) on Ethereum.

Finally, you'll need to compile your contract before deploying it, so make sure you've read about [compiling smart contracts](/developers/docs/smart-contracts/compiling/).

## How to deploy a smart contract {#how-to-deploy-a-smart-contract}

### What you'll need {#what-youll-need}

- your contract's bytecode – this is generated through [compilation](/developers/docs/smart-contracts/compiling/)
- ETH for gas – you'll set your gas limit like other transactions so be aware that contract deployment needs a lot more gas than a simple ETH transfer
- a deployment script or plugin
- access to an [Ethereum node](/developers/docs/nodes-and-clients/), either by running your own, connecting to a public node, or via an API key using a [node service](/developers/docs/nodes-and-clients/nodes-as-a-service/) like [Infura](https://www.infura.io/) or [Alchemy](https://docs.alchemy.com/).

### Steps to deploy a smart contract {#steps-to-deploy}

The specific steps involved will depend on the tooling you use. For an example, check out the [Hardhat documentation on deploying your contracts](https://hardhat.org/guides/deploying.html) or [Truffle documentation on networks and app deployment](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment). These are two of the most popular tools for smart contract deployment, which involve writing a script to handle the deployment steps.

Once deployed, your contract will have an Ethereum address like other [accounts](/developers/docs/accounts/).

## Related tools {#related-tools}

**Remix - _Remix IDE allows developing, deploying and administering smart contracts for Ethereum like blockchains_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 development platform that provides debugging, observability, and infrastructure building blocks for developing, testing, monitoring, and operating smart contracts_**

- [tenderly.co](https://tenderly.co/)
- [Docs](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _A development environment to compile, deploy, test, and debug your Ethereum software_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Docs on deploying your contracts](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**Truffle -** **_A development environment, testing framework, build pipeline, and other tools._**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [Docs on networks and app deployment](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment)
- [GitHub](https://github.com/trufflesuite/truffle)

## Related tutorials {#related-tutorials}

- [Deploying your first smart contract](/developers/tutorials/deploying-your-first-smart-contract/) _– An introduction to deploying your first smart contract on an Ethereum test network._
- [Hello World | smart contract tutorial](/developers/tutorials/hello-world-smart-contract/) _– An easy-to-follow tutorial to create & deploy a basic smart contract on Ethereum._
- [Interact with other contracts from Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– How to deploy a smart contract from an existing contract and interact with it._
- [How to downsize your contract size](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- How to reduce your contract's size to keep it under the limit and save on gas_

## Further reading {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Deploying your contracts with Hardhat](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_Know of a community resource that helped you? Edit this page and add it!_

## Related topics {#related-topics}

- [Development frameworks](/developers/docs/frameworks/)
- [Run an Ethereum node](/developers/docs/nodes-and-clients/run-a-node/)
