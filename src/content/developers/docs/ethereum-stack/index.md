---
title: Introduction to the Ethereum stack
description: A walkthrough of the different layers of the Ethereum stack and how they fit together.
lang: en
sidebar: true
---

Like any traditional software stack, the complete "Ethereum stack" varies from project to project depending on your business goals.

There are, however, consistent layers of the stack that help provide a mental model for how software applications interact with the Ethereum blockchain.

## Level 1: Ethereum Virtual Machine {#ethereum-virtual-machine}

The [Ethereum Virtual Machine (EVM)](/developers/docs/evm) is the runtime environment for smart contracts in Ethereum. Smart contracts are executed by [transactions](/developers/docs/transactions/). The EVM handles all of the transaction processing on the Ethereum network.

As with any virtual machine, the EVM creates a level of abstraction between the executing code and the executing machine (an Ethereum node).

Under the hood, the EVM uses a set of opcode instructions to execute specific tasks. These (140 unique) opcodes allow the EVM to be Turing-complete, which means the EVM is able to compute just about anything, given enough resources.

## Level 2: Smart Contracts {#smart-contracts}

[Smart contracts](/developers/docs/smart-contracts/) are the executable programs that live on the Ethereum blockchain.

Smart contracts are written using specific [programming languages](/developers/docs/smart-contracts/languages/) that compile to EVM bytecode (low-level machine instructions called opcodes).

Not only do smart contracts serve as open source libraries, they are essentially open API services. Smart contracts provide public functions which applications may permissionaly intract with. Any application may integrate with deployed smart contracts to compose functionality (such as data feeds or decentralized exchanges). Anyone can deploy new smart contracts to Ethereum in order to add custom functionality to meet their application's needs.

## Level 3: Ethereum Nodes {#ethereum-nodes}

In order for an application to interact with the Ethereum blockchain (i.e. read blockchain data and/or send transactions to the network), it must connect to an [Ethereum node](/developers/docs/nodes-and-clients/).

Ethereum nodes are computers running software - an Ethereum client. A client is an implementation of Ethereum that verifies all transactions in each block, keeping the network secure and the data accurate. Ethereum nodes ARE the Ethereum blockchain. They collectively store the state of the Ethereum blockchain and reach consensus on transactions to mutate the blockchain state.

By connecting your application to an Ethereum node (via a JSON RPC spec), your application is able to read data from the blockchain (such as user account balances) as well as broadcast new transactions to the network (such as transfering ETH between user accounts or executing functions of smart contracts).

## Level 4: Ethereum Client APIs {#ethereum-client-apis}

Many convenience libraries (built and maintained by Ethereum's open source community) allow your end user applications to connect to and communicate with the Ethereum blockchain.

If your user-facing application is a web app, you may choose to `npm install` a [JavaScript API](/developers/docs/apis/javascript/) directly in your frontend. Or perhaps you'll choose to implement this functionality server-side, using a [Python](/developers/docs/programming-languages/python/) or [Java](/developers/docs/programming-languages/java/) API.

While these APIs are not a necessary piece of the stack, they abstract away much of the complexity of interacting directly with an Ethereum node. They also provide utility functions (e.g. converting ETH to Gwei) so as a developer you can spend less time dealing with the intricacies of Ethereum clients and more time focused on the unique functionality of your application.

## Level 5: End User Applications {#end-user-applications}

At the top level of the stack are user-facing applications. These are the standard applications you regularly use and build today: primarily web and mobile apps.

The way you develop these user interfaces remains essentially unchanged. Often users will not need to know the application they're using is built using a blockchain.

## Ready to choose your stack? {#ready-to-choose-your-stack}

Check out our guide to [set up a local development environment](/developers/local-environment/) for your Ethereum application.

## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_
