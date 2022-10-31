---
title: Ethereum for JavaScript developers
description: Learn how to develop for Ethereum using JavaScript-based projects and tooling.
lang: en
---

JavaScript is among the most popular languages in the Ethereum ecosystem. In fact, there's a [team](https://github.com/ethereumjs) dedicated to bringing as much of Ethereum to JavaScript as possible.

There are opportunities to write JavaScript (or something close) at [all levels of the stack](/developers/docs/ethereum-stack/).

## Interact with Ethereum {#interact-with-ethereum}

### JavaScript API libraries {#javascript-api-libraries}

If you'd like to write JavaScript to query the blockchain, send transactions and more, the most convenient way to do this is using a [JavaScript API library](/developers/docs/apis/javascript/). These APIs allow developers to easily interact with the [nodes in the Ethereum network](/developers/docs/nodes-and-clients/).

You can use these libraries to interact with smart contracts on Ethereum so it's possible to build a dapp where you just use JavaScript to interact with pre-existing contracts.

**Check out**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _– includes Ethereum wallet implementation and utilities in JavaScript and TypeScript._

### Smart contracts {#smart-contracts}

If you're a JavaScript developer and want to write your own smart contract, you may want to get familiar with [Solidity](https://solidity.readthedocs.io). This is the most popular smart contract language and it's syntactically similar to JavaScript, which may make it easier to learn.

More on [smart contracts](/developers/docs/smart-contracts/).

## Understand the protocol {#understand-the-protocol}

### The Ethereum virtual machine {#the-ethereum-virtual-machine}

There is a JavaScript implementation of [Ethereum's virtual machine](/developers/docs/evm/). It supports the latest fork rules. Fork rules refer to changes made to the EVM as a result of planned upgrades.

It's split out into various JavaScript packages that you can check out to better understand:

- Accounts
- Blocks
- The blockchain itself
- Transactions
- And more...

This will help you understand things like "what's the data structure of an account?".

If you prefer to read code, this JavaScript could be a great alternative to reading through our docs.

**Check out the monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Nodes and clients {#nodes-and-clients}

There's an Ethereumjs client in development. This will let you dig into how Ethereum clients work in a language you understand.

**Check out the client**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-client)

## Other projects {#other-projects}

There are also plenty of other things going on in the land of Ethereum JavaScript, including:

- libraries of wallet utilities.
- tools to generate, import, and export Ethereum keys.
- an implementation of the `merkle-patricia-tree` – a data structure outlined in the Ethereum yellow paper.

Dig into whatever interests you most over at the [EthereumJS repo](https://github.com/ethereumjs)

## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_
