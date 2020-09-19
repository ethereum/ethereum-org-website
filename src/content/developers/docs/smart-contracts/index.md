---
title: Introduction to smart contracts
description: An overview of smart contracts, focussing on their unique characteristics and limitations.
lang: en
sidebar: true
---

Smart contracts are a type of [Ethereum account](/en/developers/docs/accounts/). This means they have a balance and they can send transactions over the network. However they're not controlled by a user, instead they are deployed to the network and run as programmed. User accounts can then interact with a smart contract by submitting transactions that trigger certain functions that have been designed into the contract. They can define rules, like a regular contract, and automatically enforce them via the code.

## Prerequisites

Make sure you've read up on [accounts](/developers/docs/accounts/), [transactions](/developers/docs/transactions/) and the [Ethereum virtual machine](/developers/docs/evm/) before jumping into the world of smart contracts.

## A digital vending machine

Perhaps the best metaphor for a smart contract is a vending machine, as described by Nick Szabo. With the right inputs, a certain output is guaranteed.

To get a snack from a vending machine:

```
money + snack selection = snack dispensed
```

This logic is programmed into the vending machine.

A smart contract, like a vending machine, has logic programmed into it. A simple example might be a contract that delivers ETH to another user on a certain date.

```
ETH + date + recipient address = scheduled payment
```

In this example, a user would submit a transaction which would include:

- the money they want to eventually send. This will be stored in the contract (a contract can receive ETH like a regular account).
- the date they want the funds released.
- the account address of the desired recipient.
- gas or a transaction fee – this will cause the contract's code to run so it can accept the deposit and schedule the payment.

Like a vending machine removes the need for a vendor employee, smart contracts can replace intermediaries in many industries.

## Permissionless

Anyone can write a smart contract and deploy it to the network. You just need to learn how to code in a [smart contract language](/en/developers/docs/smart-contracts/languages) and have enough ETH to deploy your contract. Deploying a smart contract is technically a transaction, so you need to pay your [Gas](/en/developers/docs/gas/) in the same way that you need to pay gas for a simple ETH transfer. Gas costs for contract deployment are far higher however.

Ethereum has developer-friendly languages for writing smart contracts:

- Solidity
- Vyper

[More on languages](/en/developers/smart-contracts/languages/)

However, they must be compiled before they can be deployed so that Ethereum's virtual machine can interpret and store the contract. [More on compilation](/en/developers/docs/smart-contracts/compling-smart-contracts/)

## Composability

Smart contracts are public on Ethereum and can be thought of as open APIs. That means you can call other smart contracts in your own smart contract to greatly extend what's possible. Contracts can even deploy other contracts.

Learn more about [smart contract composability](/developers/docs/smart-contracts/composability/).

## Limitations

Smart contracts alone cannot get information about "real-world" events because they can't send HTTP requests. This is by design as relying on external information could jeopardise consensus, which is important for security and decentralization.

There are ways to get around this using [oracles](/en/developers/docs/oracles/).

## Smart contract resources

**OpenZeppelin Contracts -** **_Library for secure smart contract development._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Community Forum](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Safe, simple, flexible building-blocks for smart-contracts._**

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

## Further reading

- [Smart Contracts: The Blockchain Technology That Will Replace Lawyers](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_
- [Best Practices for Smart Contract Development](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– Nov 10, 2019 - Yos Riady_
