---
title: Introduction to smart contracts
description: An overview of smart contracts, focussing on their unique characteristics and limitations.
lang: en
sidebar: true
---

## What is a smart contract?

A "smart contract" is simply a program that runs on the Ethereum blockchain. It's a collection of code (its functions) and data (its state) that resides at a specific address on the Ethereum blockchain.

Smart contracts are a type of [Ethereum account](/en/developers/docs/accounts/). This means they have a balance and they can send transactions over the network. However they're not controlled by a user, instead they are deployed to the network and run as programmed. User accounts can then interact with a smart contract by submitting transactions that execute a function defined on the smart contract. Smart contracts can define rules, like a regular contract, and automatically enforce them via the code.

## Prerequisites {#prerequisites}

Make sure you've read up on [accounts](/developers/docs/accounts/), [transactions](/developers/docs/transactions/) and the [Ethereum virtual machine](/developers/docs/evm/) before jumping into the world of smart contracts.

<!-- TODO simpler example... scheduling payments in Ethereum is actually difficult -->
<!-- TODO show an example smart contract, e.g. an implementation of a vending machine -->

## A digital vending machine {#a-digital-vending-machine}

Perhaps the best metaphor for a smart contract is a vending machine, as described by [Nick Szabo](https://unenumerated.blogspot.com/). With the right inputs, a certain output is guaranteed.

To get a snack from a vending machine:

```
money + snack selection = snack dispensed
```

This logic is programmed into the vending machine.

A smart contract, like a vending machine, has logic programmed into it. Here's a simple example of how this vending machine might look like as a smart contract:

```solidity
pragma solidity 0.6.11;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() public {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Like how a vending machine removes the need for a vendor employee, smart contracts can replace intermediaries in many industries.

## Permissionless {#permissionless}

Anyone can write a smart contract and deploy it to the network. You just need to learn how to code in a [smart contract language](/en/developers/docs/smart-contracts/languages/), and have enough ETH to deploy your contract. Deploying a smart contract is technically a transaction, so you need to pay your [Gas](/en/developers/docs/gas/) in the same way that you need to pay gas for a simple ETH transfer. Gas costs for contract deployment are far higher, however.

Ethereum has developer-friendly languages for writing smart contracts:

- Solidity
- Vyper

[More on languages](/en/developers/docs/smart-contracts/languages/)

However, they must be compiled before they can be deployed so that Ethereum's virtual machine can interpret and store the contract. [More on compilation](/en/developers/docs/smart-contracts/compiling/)

## Composability {#composability}

Smart contracts are public on Ethereum and can be thought of as open APIs. That means you can call other smart contracts in your own smart contract to greatly extend what's possible. Contracts can even deploy other contracts.

Learn more about [smart contract composability](/developers/docs/smart-contracts/composability/).

## Limitations {#limitations}

Smart contracts alone cannot get information about "real-world" events because they can't send HTTP requests. This is by design. Relying on external information could jeopardise consensus, which is important for security and decentralization.

There are ways to get around this using [oracles](/en/developers/docs/oracles/).

## Smart contract resources {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Library for secure smart contract development._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Community Forum](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Safe, simple, flexible building-blocks for smart-contracts._**

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

## Further reading {#further-reading}

- [Smart Contracts: The Blockchain Technology That Will Replace Lawyers](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_
- [Best Practices for Smart Contract Development](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– Nov 10, 2019 - Yos Riady_
