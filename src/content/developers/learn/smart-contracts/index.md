---
title: Introduction to smart contracts
description:
lang: en
sidebar: true
---

## Prerequisites

Make sure you've read up on accounts, transactions and the EVM before embarking on the world of smart contracts.

## What are smart contracts?

Smart contracts are a type of [Ethereum account](/en/developers/learn/accounts/). This means they have a balance and they can send transactions over the network. However they're not controlled by a user, instead they are deployed to the network and run as programmed. User accounts can then interact with a smart contract by submitting transactions that trigger certain functions that have been designed into the contract. They can define rules, like a regular contract, and automatically enforce them via the code.

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

Anyone can write a smart contract and deploy it to the network. You just need to learn how to code in a [smart contract language](/en/developers/learn/smart-contracts/languages) and have enough ETH to deploy your contract. Deploying a smart contract is technically a transaction, so you need to pay your [Gas](/en/developers/learn/gas/) in the same way that you need to pay gas for a simple ETH transfer. Gas costs for contract deployment are far higher however.

Ethereum has developer-friendly languages for writing smart contracts:

- Solidity
- Vyper

[More on languages](/en/developers/smart-contracts/languages/)

However, they must be compiled before they can be deployed so that Ethereum's virtual machine can interpret and store the contract. [More on compilation](/en/developers/learn/smart-contracts/compling-smart-contracts/)

## Composability

Smart contracts are public on Ethereum and can be thought of as open APIs. That means you can call other smart contracts in your own smart contract to greatly extend what's possible. Contracts can even deploy other contracts.

## Limitations

Smart contracts alone cannot get information about "real-world" events because they can't send HTTP requests. This is by design as relying on external information could jeopardise consensus, which is important for security and decentralization.

There are ways to get around this using [oracles](/en/developers/learn/oracles/).

## Further reading

- [Smart Contracts: The Blockchain Technology That Will Replace Lawyers](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_

## Related topics
