---
title: Trust fund account with Remix
description: Ethereum smart contract tutorial. Learn how to develop and deploy a trust fund contract. Build using Remix IDE.
author: Ake Gaviar
lang: en
tags: ["chainstack", "remix", "solidity"]
skill: intermediate
published: 2023-01-31
source: Chainstack
sourceUrl: https://docs.chainstack.com/docs/ethereum-tutorial-trust-fund-account-with-remix
---

Unlike legacy finance systems, where you need to rely on a well-established third party, you can build your own financial instrument on Ethereum.

The objective of this tutorial is to show how easy it is to build and run your own instance of a simple decentralized finance example, or DeFi.

In this tutorial, you will:

- Create a basic Trust Fund account smart contract with the following interaction options:
  - Fund the account from any Ethereum address
  - Withdraw all funds from the account only from the account owner's address
  - Withdraw partial funds from the account only from the account owner's address
  - Transfer the account ownership to any Ethereum address
- Compile the smart contract with Remix IDE.
- Deploy the smart contract to the Ethereum Sepolia testnet through a Chainstack node.
- Interact with the smart contract through Remix IDE and a Chainstack node.

> 📘 Ethereum Sepolia testnet
> 
> For illustration purposes, this tutorial uses Ethereum Sepolia testnet.
> 
> For Ethereum mainnet, the steps are exactly the same, except you need to use mainnet ether.

## Prerequisites

- [Chainstack account](https://console.chainstack.com/) to deploy an Ethereum node.
- [Remix IDE](https://remix.ethereum.org/) to compile the contract and deploy it through MetaMask.
- [MetaMask](https://metamask.io/) to deploy the contract through the Chainstack node and interact with the contract.

## Overview

To get from zero to a deployed Trust Fund account on the Ethereum Sepolia testnet, do the following:

1. With Chainstack, create a <<glossary:public chain project>>.
2. With Chainstack, join the Ethereum Sepolia testnet.
3. With Chainstack, access your Ethereum node credentials.
4. Set up your MetaMask to work through a Chainstack node.
5. With Remix IDE, create and compile the Trust Fund smart contract.
6. Set up your Remix IDE to work through a Chainstack node.
7. With Remix IDE, deploy the contract to the Ethereum Sepolia testnet.
8. With Remix IDE, interact with the contract on the Ethereum Sepolia testnet.

## Step-by-step

### Create a public chain project

See [Create a project](doc:manage-your-project#create-a-project).

### Join the Ethereum Sepolia testnet

See [Join a public network](doc:manage-your-networks#join-a-public-network).

### Get your Ethereum node access and credentials

See [View node access and credentials](doc:manage-your-node#view-node-access-and-credentials).

### Set up MetaMask

See [Ethereum tooling: MetaMask](doc:ethereum-tooling#metamask).

Having set up your MetaMask to interact through a Chainstack node, your Remix IDE will also interact with the network through a Chainstack node.

Create at least two accounts in MetaMask. You need two accounts to transfer the contract ownership from one to another.

In your MetaMask, fund each account with Sepolia ether [POW's faucet](https://sepolia-faucet.pk910.de/).

### Create and compile the Trust Fund smart contract

1. Open [Remix IDE](https://remix.ethereum.org/).

2. On the home page, click **Environments** > **Solidity**.

3. On the left pane, click **File explorers** > **+**.

4. In the modal, give any name to your contract. For example, `transferableTrustFund.sol`.

5. Put in the contract code:

   ```sol transferableTrustFund.sol
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   /**
    * @title TransferableTrustFundAccount
    * @dev A trust fund account that can be transferred to a new owner
    */
   contract TransferableTrustFundAccount {
       address payable public owner; // The current owner of the contract

       /**
        * @dev Modifier to restrict access to owner-only functions
        */
       modifier onlyOwner() {
           require(msg.sender == owner, "Caller is not the owner");
           _;
       }

       /**
        * @dev Initializes the contract by setting the initial owner
        */
       constructor() {
           owner = payable(msg.sender);
       }

       /**
        * @dev Withdraws the entire contract balance to the owner
        */
       function withdrawAll() public onlyOwner {
           uint256 balance = address(this).balance;
           require(balance > 0, "Insufficient funds");
           owner.transfer(balance);
       }

       /**
        * @dev Withdraws a specified amount to the owner
        * @param amount The amount to withdraw
        */
       function withdrawAmount(uint256 amount) public onlyOwner {
           uint256 balance = address(this).balance;
           require(balance >= amount, "Insufficient funds");
           owner.transfer(amount);
       }

       /**
        * @dev Transfers ownership of the contract to a new account
        * @param newOwner The address of the new owner
        */
       function transferAccount(address payable newOwner) public onlyOwner {
           require(newOwner != address(0), "Invalid address");
           owner = newOwner;
       }   

       /**
        * @dev Gets the current balance of the contract
        * @return The current balance of the contract
        */
       function getBalance() public view returns (uint256) {
           return address(this).balance;
       }

       /**
        * @dev Gets the current owner of the contract
        * @return The address of the current owner
        */
       function getOwner() public view returns (address) {
           return owner;
       }

       /**
        * @dev Fallback function to accept incoming transfers
        */
       receive() external payable {}
   }

   ```

     This is your Trust Fund account smart contract:

   - The contract belongs to the Ethereum account that deploys the contract through:

     ```sol transferableTrustFund.sol
     contract TransferableTrustFundAccount {
       address payable public owner;
       ...
     }
     ```

   - The `onlyOwner` modifier is used to restrict access to certain functions in the smart contract to only the owner of the contract. A modifier is like a wrapper that can be applied to a function, and it modifies the behavior of the function in some way:

     ```sol transferableTrustFund.sol
         modifier onlyOwner() {
           require(msg.sender == owner, "Caller is not the owner");
           _;
       }
     ```

   - Only the contract owner can withdraw all funds from the contract through:

     ```sol transferableTrustFund.sol
     function withdrawAll() public onlyOwner {
       uint256 balance = address(this).balance;
       require(balance > 0, "Insufficient funds");
       owner.transfer(balance);
       }
     ```

   - Only the contract owner can withdraw partial funds from the contract through:

     ```sol transferableTrustFund.sol
     function withdrawAmount(uint256 amount) public onlyOwner {
       uint256 balance = address(this).balance;
       require(balance >= amount, "Insufficient funds");
       owner.transfer(amount);
       }
     ```

   - Anyone can deposit funds to the contract through:

     ```sol transferableTrustFund.sol
     receive() external payable {}
     ```

   - Only the contract owner can transfer the contract ownership to any other Ethereum account through:

     ```sol transferableTrustFund.sol
     function transferAccount(address payable newOwner) public onlyOwner {
       require(newOwner != address(0), "Invalid address");
       owner = newOwner;
     		} 	
     ```

   - Retrieve the current balance on the smart contract and the current owner with:

     ```sol transferableTrustFund.sol
     function getBalance() public view returns (uint256) {
       return address(this).balance;
      }

     function getOwner() public view returns (address) {
       return owner;
      }
     ```

6. Compile the contract. On the left pane, click **Solidity compiler** > **Compile**:

> 📘 Compilation failed?
> 
> If the contract does not compile, make sure to change the compiler version to 0.8.0 or higher.

### Set up Remix IDE to work through your Chainstack node

On the left pane, click **Deploy** and switch to **Injected Provider - Metamask**:

This will engage your MetaMask and interact with the network through the Chainstack node provided in MetaMask.

### Deploy the Trust Fund smart contract

On the left pane, click **Deploy & run transactions** > **Deploy:**

This will engage your MetaMask to deploy the contract to the Ethereum Sepolia testnet through your currently selected MetaMask account. Click **Confirm** in the MetaMask modal.

### Interact with the Trust Fund smart contract

Once the contract is deployed, fund the contract:

1. Copy the contract address under **Deployed Contracts**.
2. Open your MetaMask and send Sepolia ether to the copied contract address.

Now that your contract is funded, you can interact with it.

Expand the contract under **Deployed Contracts**:

- `withdrawAmount` — enter any amount that is less than the current contract balance to withdraw partial funds.
- `withdrawAll` — click to withdraw all funds from the contract.
- `transferAccount` — enter any Ethereum address to transfer the contract ownership. For this example, enter the address of your second account in MetaMask.
- `getBalance` — click to display the current ether balance in the smart contract; the balance is shown in Wei.
- `getOwner` — click to display the address currently owning the Trust fund smart contract.