---
title: How to Set Up Tellor as your Oracle
description: A guide to get started with integrating the Tellor oracle into your protocol
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "pricefeeds", "oracles"]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---


Tellor is a live and open-sourced oracle ready for implementation. This guide is here to act as a beginner's guide to showcase the ease with which one can get up and running with Tellor - providing your project with a fully decentralized and censorship-resistent oracle.


## Overview
Tellor is an oracle system where parties can request the value of an off-chain data point (e.g. BTC/USD) and miners compete to add this value to an on-chain data-bank, accessible by all Ethereum smart contracts.  The inputs to this data-bank are secured by a network of staked miners. Tellor utilizes crypto-economic incentive mechanisms, rewarding honest data submissions by miners and punishing bad actors, through the issuance of Tellor’s token, Tributes (TRB) and a dispute mechanism.


In this tutorial we'll go over:
* Setting up the initial toolkit you'll need to get up and running.
* Walk through a simple example.
* Provide basic functions that can be used for a more robust use of Tellor.
* List out testnet addresses of networks you currently can test Tellor on.


## UsingTellor
First thing you'll want to do is install the basic tools necessary for using Tellor as your oracle. Use [this package](https://github.com/tellor-io/usingtellor) to install the Tellor User Contracts to test the implementation of Tellor in your contracts:

`npm install usingtellor`

Once installed this will allow your contracts to inherit the functions from the contract 'UsingTellor'. 


Great! Now that you've got the tools ready, let's go through a simple excercise where we request the Bitcoin price:


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


## Available Tellor Functions:

Below is a group of basic functions that come with inheriting the UsingTellor contract. These will allow you to utilize Tellor in a more robust fashion than the example above.

Children contracts have access to the following functions:

```solidity
    /**
    * @dev Retreive value from oracle based on requestId/timestamp
    * @param _requestId being requested
    * @param _timestamp to retreive data/value from
    * @return uint value for requestId/timestamp submitted
    */
    function retrieveData(uint256 _requestId, uint256 _timestamp) public view returns(uint256);

    /**
    * @dev Gets if the mined value for the specified requestId/_timestamp is currently under dispute
    * @param _requestId to looku p
    * @param _timestamp is the timestamp to look up miners for
    * @return bool true if requestId/timestamp is under dispute
    */
    function isInDispute(uint256 _requestId, uint256 _timestamp) public view returns(bool);

    /**
    * @dev Counts the number of values that have been submited for the request
    * @param _requestId the requestId to look up
    * @return uint count of the number of values received for the requestId
    */
    function getNewValueCountbyRequestId(uint256 _requestId) public view returns(uint);

    /**
    * @dev Gets the timestamp for the value based on their index
    * @param _requestId is the requestId to look up
    * @param _index is the value index to look up
    * @return uint timestamp
    */
    function getTimestampbyRequestIDandIndex(uint256 _requestId, uint256 _index) public view returns(uint256);

    /**
    * @dev Allows the user to get the latest value for the requestId specified
    * @param _requestId is the requestId to look up the value for
    * @return bool true if it is able to retreive a value, the value, and the value's timestamp
    */
    function getCurrentValue(uint256 _requestId) public view returns (bool ifRetrieve, uint256 value, uint256 _timestampRetrieved);

    /**
    * @dev Allows the user to get the first value for the requestId before the specified timestamp
    * @param _requestId is the requestId to look up the value for
    * @param _timestamp before which to search for first verified value
    * @return bool true if it is able to retreive a value, the value, and the value's timestamp
    */
    function getDataBefore(uint256 _requestId, uint256 _timestamp)
        public
        view
        returns (bool _ifRetrieve, uint256 _value, uint256 _timestampRetrieved);

```
## Looking to do some testing first? See the list below for our active testnet addresses:

#### Addresses:

Mainnet: [`0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0`](https://etherscan.io/address/0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0)

Rinkeby: [`0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0`](https://rinkeby.etherscan.io/address/0x20374E579832859f180536A69093A126Db1c8aE9#code)

Kovan: [`0x20374E579832859f180536A69093A126Db1c8aE9`](https://kovan.etherscan.io/address/0x20374E579832859f180536A69093A126Db1c8aE9#code)

Ropsten: [`0x20374E579832859f180536A69093A126Db1c8aE9`](https://ropsten.etherscan.io/address/0x20374E579832859f180536A69093A126Db1c8aE9#code)

Goerli: [`0x20374E579832859f180536A69093A126Db1c8aE9`](https://goerli.etherscan.io/address/0x20374E579832859f180536A69093A126Db1c8aE9#code)

<br>

#### The following networks use the ['Fellowship'](https://github.com/tellor-io/fellowship) instead of the POW miners:

BSC Testnet: [`0xbc2f9E092ac5CED686440E5062D11D6543202B24`](https://testnet.bscscan.com/address/0xbc2f9E092ac5CED686440E5062D11D6543202B24)

Polygon Mumbai Testnet: [`0xbc2f9E092ac5CED686440E5062D11D6543202B24`](https://explorer-mumbai.maticvigil.com/address/0xbc2f9E092ac5CED686440E5062D11D6543202B24/transactions)
