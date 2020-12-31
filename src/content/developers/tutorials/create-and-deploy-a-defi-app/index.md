---
title: Create and deploy a DeFi App
description: Deposit ERC20 tokens to the smart contract and mint Farm Tokens
author: "strykerin"
tags:
  [
    "solidity",
    "defi",
    "web3.js",
    "truffle",
    "ganache",
    "smart contracts"
  ]
skill: intermediate
lang: en
sidebar: true
published: 2020-12-31
source: github.com
sourceUrl: https://github.com/strykerin/DeFi-Token-Farm
---

In this tutorial we will build a DeFi Application with Solidity where users can deposit an ERC20 token to the smart contract and it will mint and transfer Farm Tokens to them. The users can later withdraw their ERC20 tokens by burning their Farm Token on smart contract and the ERC20 tokens will be transferred back to them.

## Install Truffle and Ganache

If this is the first time you are writing a smart contract, you will need to set up your environment. We are going to use two tools: [Truffle](https://www.trufflesuite.com/) and [Ganache](https://www.trufflesuite.com/ganache).

Truffle is a development environment and testing framework for developing smart contracts for Ethereum. With Truffle it is easy to build and deploy smart contracts to the blockchain. Ganache allow us to create a local Ethereum blockchain in order to test smart contracts. It simulates the features of the real network and the first 10 accounts are funded with 100 test Ether, thus making the smart contract deployment and testing free and easy. Ganache is available as a desktop application and a command-line tool. For this article we will be using the UI desktop application.

![Ganache UI desktop application](https://cdn-images-1.medium.com/max/2360/1*V1iQ5onbLbT5Ib2QaiOSyg.png)*Ganache UI desktop application*

To create the project, run the following commands

```Powershell
mkdir YourProjectName
cd YourProjectName
truffle init
```

This will create a blank project for the development and deployment of our smart contracts. The created project structure is the following:

* `contracts`: Folder for the solidity smart contracts

* `migrations`: Folder for the deployment scripts

* `test`: Folder for testing our smart contracts

* `truffle-config.js`: Truffle configuration file

## Create the ERC20 Token

First we need to create our ERC20 token that we will use to stake on the smart contract. To create our fungible token, we will first need to install the OpenZeppelin library. This library contains the implementations of standards such as the ERC20 and the ERC721. To install it, run the command:

```powershell
npm install @openzeppelin/contracts
```

Using the openzeppelin library we can create our ERC20 token called `MyToken` with the following solidity code:

```solidity
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() public ERC20("MyToken", "MTKN"){
        _mint(msg.sender, 1000000000000000000000000);
    }
}
```

In the code above on:

* Line 3: We import the contract ERC20.sol from openzeppelin that contains the implementation for this token standard.

* Line 5: We inherit from the ERC20.sol contract.

* Line 6: We are calling the ERC20.sol constructor and passing for the name and symbol parameters as `"MyToken"` and `"MTKN"` respectively.

* Line 7: We are minting and transferring 1 million tokens for the account that is deploying the smart contract (we are using the default 18 decimals for the ERC20 token, that means that if we want to mint 1 token, you will represent it as 1000000000000000000, 1 with 18 zeros).

We can see below the ERC20.sol constructor implementation where the `_decimals` field is set to 18:

```solidity
string private _name;
string private _symbol;
uint8 private _decimals;

constructor (string memory name_, string memory symbol_) public {
    _name = name_;
    _symbol = symbol_;
    _decimals = 18;
}
```

## Deploy ERC20 Token

On the `migrations` folder, create a file called `2_deploy_Tokens.js`. This file is where we will deploy both our ERC20 Token and our FarmToken smart contract. The code below is used to deploy our MyToken.sol contract:

```javascript
const MyToken = artifacts.require('MyToken')

module.exports = async function(deployer, network, accounts) {
    // Deploy MyToken
    await deployer.deploy(MyToken)
    const myToken = await MyToken.deployed()
}
```

To compile our smart contract, we must first check our solidity compiler version. You can check that by running the command:

```powershell
truffle version
```

The default version is the `Solidity v0.5.16`. Since our token is written using the solidity version `0.6.2`, if we run the command to compile our contracts we will get a compiler error. In order to specify which solidity compiler version to use, go to the file `truffle-config.js` and set to the desired compiler version as seen below:

```javascript
// Configure your compilers
compilers: {
  solc: {
    version: "0.6.2",    // Fetch exact version from solc-bin (default: truffle's version)
    // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
    // settings: {          // See the solidity docs for advice about optimization and evmVersion
    //  optimizer: {
    //    enabled: false,
    //    runs: 200
    //  },
    //  evmVersion: "byzantium"
    // }
  }
}
```

Now we can compile our smart contract by running the following command:

```powershell
truffle compile
```

After compiling, we can now deploy our token. For this open Ganache and select the option ÔÇ£QuickstartÔÇØ to start a local Ethereum blockchain. To deploy our contract, run:

```powershell
truffle migrate
```

The address used to deploy our contracts is the first one from the list of addresses that Ganache shows us. To verify that, we can open the Ganache desktop application and we can verify that the balance of Ether for the first account has been reduced due to the cost of Ether to deploy our smart contracts:

![Ganache desktop application](https://cdn-images-1.medium.com/max/2346/1*1iJ9VRlyLuza58HL3DLfpg.png)*Ganache desktop application*

To verify that 1 million MyToken tokens have been sent to the deployer address, we can use the Truffle Console to interact with our deployed smart contract.
> [Truffle Console is a a basic interactive console connecting to any Ethereum client.](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)