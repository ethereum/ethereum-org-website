---
title: How to Set Up Tellor as your Oracle
description: A guide to get started with integrating the Tellor oracle into your protocol
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles"]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Pop Quiz: Your protocol is just about finished, but it needs an oracle to plug in to get an active off chain data feed going...What do you do?

## (Soft) Prerequisites

This post aims to make accessing an oracle feed as simple and straightforward as possible. That said, we're assuming the following about your coding skill-level to focus on the oracle aspect.

Assumptions:

- you can navigate a terminal
- you have npm installed
- you know how to use npm to manage dependencies

Tellor is a live and open-sourced oracle ready for implementation. This beginner's guide is here to showcase the ease with which one can get up and running with Tellor, providing your project with a fully decentralized and censorship-resistent oracle.

## Overview

Tellor is an oracle system where parties can request the value of an off-chain data point (e.g. BTC/USD) and miners compete to add this value to an on-chain data-bank, accessible by all Ethereum smart contracts. The inputs to this data-bank are secured by a network of staked miners. Tellor utilizes cryptoeconomic incentive mechanisms, rewarding honest data submissions by miners and punishing bad actors through the issuance of Tellor’s token, Tributes (TRB) and a dispute mechanism.

In this tutorial we'll go over:

- Setting up the initial toolkit you'll need to get up and running.
- Walk through a simple example.
- List out testnet addresses of networks you currently can test Tellor on.

## UsingTellor

The first thing you'll want to do is install the basic tools necessary for using Tellor as your oracle. Use [this package](https://github.com/tellor-io/usingtellor) to install the Tellor User Contracts to test the implementation of Tellor in your contracts:

`npm install usingtellor`

Once installed this will allow your contracts to inherit the functions from the contract 'UsingTellor'.

Great! Now that you've got the tools ready, let's go through a simple exercise where we request the bitcoin price:

### BTC/USD Example

Inherit the UsingTellor contract, passing the Tellor address as a constructor argument:

Here's an example

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract BtcPriceContract is UsingTellor {

  //This contract now has access to all functions in UsingTellor

  uint256 btcPrice;
  uint256 btcRequestId = 2;

  // Input Tellor oracle address. See below for available addresses or
  // deploy the TellorPlayground yourself
  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) {}

  function setBtcPrice() public {
    bool _didGet;
    uint _timestamp;

    (_didGet, btcPrice, _timestamp) = getCurrentValue(btcRequestId);
  }
}

```

**Want to try a different price feed? Check out the list of supported prices here:
[Current Data Feeds](https://docs.tellor.io/tellor/integration/data-ids/current-data-feeds)**

## Looking to do some testing first? See the list below for our active testnet addresses:

#### Addresses:

Mainnet: [`0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0`](https://etherscan.io/address/0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0)

Rinkeby: [`0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0`](https://rinkeby.etherscan.io/address/0x20374E579832859f180536A69093A126Db1c8aE9#code)

Kovan: [`0x20374E579832859f180536A69093A126Db1c8aE9`](https://kovan.etherscan.io/address/0x20374E579832859f180536A69093A126Db1c8aE9#code)

Ropsten: [`0x20374E579832859f180536A69093A126Db1c8aE9`](https://ropsten.etherscan.io/address/0x20374E579832859f180536A69093A126Db1c8aE9#code)

Goerli: [`0x20374E579832859f180536A69093A126Db1c8aE9`](https://goerli.etherscan.io/address/0x20374E579832859f180536A69093A126Db1c8aE9#code)

#### The following networks use the ['Fellowship'](https://github.com/tellor-io/fellowship) instead of the POW miners:

BSC Testnet: [`0xbc2f9E092ac5CED686440E5062D11D6543202B24`](https://testnet.bscscan.com/address/0xbc2f9E092ac5CED686440E5062D11D6543202B24)

Polygon Mumbai Testnet: [`0xbc2f9E092ac5CED686440E5062D11D6543202B24`](https://explorer-mumbai.maticvigil.com/address/0xbc2f9E092ac5CED686440E5062D11D6543202B24/transactions)

#### For a more robust implementation of the Tellor oracle, check out the full list of available functions [here.](https://github.com/tellor-io/usingtellor/blob/master/README.md)
