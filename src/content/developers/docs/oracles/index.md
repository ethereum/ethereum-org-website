---
title: Oracles
description: Oracles help get real-world data into your Ethereum application because smart contracts can't query real-world data on their own.
lang: en
sidebar: true
incomplete: true
---

Oracles are a data feed that connect Ethereum to off-chain, real-world information, so you can query data in your smart contracts. For example, prediction market dapps use oracles to settle payments based on events. A prediction market may ask you to bet your ETH on the next president of the United States. They'll use an oracle to confirm the outcome and pay out to the winners.

## Prerequisites {#prerequisites}

Make sure you're familiar with [nodes](/developers/docs/nodes-and-clients/), [consensus mechanisms](/developers/docs/consensus-mechanisms/), and [smart contract anatomy](/developer/docs/smart-contracts/anatomy/), specifically events.

## What is an oracle {#what-is-an-oracle}

An oracle is a bridge between the blockchain and the real world. They act as on-chain APIs you can query to get information into your smart contracts. This could be anything from price information to weather reports.

## Why are they needed? {#why-are-they-needed}

With a blockchain like Ethereum you need every node in the network to be able to replay every transaction and end up with the same result, guaranteed. APIs introduce potentially variable data. If you were sending someone an amount of ETH based on an agreed $USD value using a price API, the query would return a different result from one day to the next. Not to mention, the API could be hacked or deprecated. If this happens, the nodes in the network wouldn't be able to agree on Ethereum's current state, effectively breaking [consensus](/developers/docs/consensus-mechanisms/).

Oracles solve this problem by posting the data on the blockchain. So any node replaying the transaction will use the same immutable data that's posted for all to see. To do this, an oracle is typically made up of a smart contract and some off-chain components that can query APIs, then periodically send transactions to update the smart contract's data.

## Oracle architecture {#oracle-architecture}

To understand how an oracle works, let's play through a scenario where your smart contract needs to know who won the superbowl. This is an example of how it could work:

1. Your smart contract requests information from an oracle smart contract.
2. The oracle smart contract emits an [event](/developers/docs/smart-contracts/anatomy/#events-and-logs).
3. Off-chain oracle nodes listen for events and upon hearing one, they query an API.
4. The API returns a JSON response to the nodes.
5. The nodes call on the oracle smart contract.
6. The oracle smart contract returns the data to your smart contract.

### Security {#security}

Notice in the above example there are multiple nodes. This is to prevent an oracle becoming a security risk. If a contract relies on one API or one off-chain node then there is a single point of failure. Because they're off-chain, they can be compromised. Often the oracle smart contract will require a set number of the same results from a whole network of nodes to improve security.

## Usage {#usage}

### Oracles as a service {#oracles-as-a-service}

Services like Chainlink offer oracles-as-a-service for you to use. They have the infrastructure in place for you to do things like:

- get crypto price feeds in your contract
- generate verifiable random numbers (useful for gaming)
- call external APIs

This is an example of how to get the latest ETH price in your smart contract using a Chainlink price feed:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}

```

[View the docs](https://docs.chain.link/docs/get-the-latest-price)

#### Oracle services {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)

### Build an oracle smart contract {#build-an-oracle-smart-contract}

Here's an example oracle contract by Pedro Costa. You can find further annotation in his article: [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e).

```solidity
pragma solidity >=0.4.21 <0.6.0;

contract Oracle {
  Request[] requests; //list of requests made to the contract
  uint currentId = 0; //increasing request id
  uint minQuorum = 2; //minimum number of responses to receive before declaring final result
  uint totalOracleCount = 3; // Hardcoded oracle count

  // defines a general api request
  struct Request {
    uint id;                            //request id
    string urlToQuery;                  //API url
    string attributeToFetch;            //json attribute (key) to retrieve in the response
    string agreedValue;                 //value from key
    mapping(uint => string) anwers;     //answers provided by the oracles
    mapping(address => uint) quorum;    //oracles which will query the answer (1=oracle hasn't voted, 2=oracle has voted)
  }

  //event that triggers oracle outside of the blockchain
  event NewRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch
  );

  //triggered when there's a consensus on the final result
  event UpdatedRequest (
    uint id,
    string urlToQuery,
    string attributeToFetch,
    string agreedValue
  );

  function createRequest (
    string memory _urlToQuery,
    string memory _attributeToFetch
  )
  public
  {
    uint lenght = requests.push(Request(currentId, _urlToQuery, _attributeToFetch, ""));
    Request storage r = requests[lenght-1];

    // Hardcoded oracles address
    r.quorum[address(0x6c2339b46F41a06f09CA0051ddAD54D1e582bA77)] = 1;
    r.quorum[address(0xb5346CF224c02186606e5f89EACC21eC25398077)] = 1;
    r.quorum[address(0xa2997F1CA363D11a0a35bB1Ac0Ff7849bc13e914)] = 1;

    // launch an event to be detected by oracle outside of blockchain
    emit NewRequest (
      currentId,
      _urlToQuery,
      _attributeToFetch
    );

    // increase request id
    currentId++;
  }

  //called by the oracle to record its answer
  function updateRequest (
    uint _id,
    string memory _valueRetrieved
  ) public {

    Request storage currRequest = requests[_id];

    //check if oracle is in the list of trusted oracles
    //and if the oracle hasn't voted yet
    if(currRequest.quorum[address(msg.sender)] == 1){

      //marking that this address has voted
      currRequest.quorum[msg.sender] = 2;

      //iterate through "array" of answers until a position if free and save the retrieved value
      uint tmpI = 0;
      bool found = false;
      while(!found) {
        //find first empty slot
        if(bytes(currRequest.anwers[tmpI]).length == 0){
          found = true;
          currRequest.anwers[tmpI] = _valueRetrieved;
        }
        tmpI++;
      }

      uint currentQuorum = 0;

      //iterate through oracle list and check if enough oracles(minimum quorum)
      //have voted the same answer has the current one
      for(uint i = 0; i < totalOracleCount; i++){
        bytes memory a = bytes(currRequest.anwers[i]);
        bytes memory b = bytes(_valueRetrieved);

        if(keccak256(a) == keccak256(b)){
          currentQuorum++;
          if(currentQuorum >= minQuorum){
            currRequest.agreedValue = _valueRetrieved;
            emit UpdatedRequest (
              currRequest.id,
              currRequest.urlToQuery,
              currRequest.attributeToFetch,
              currRequest.agreedValue
            );
          }
        }
      }
    }
  }
}

```

_We'd love more documentation on creating an oracle smart contract. If you can help, create a PR!_

## Further reading {#further-reading}

- [Decentralised Oracles: a comprehensive overview](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) –_Julien Thevenard_
- [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) –_Pedro Costa_
- [Oracles](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) –_EthHub_
