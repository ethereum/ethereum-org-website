---
title: Oracle（预言机）
description: 预言机有助于将真实世界数据输入您的以太坊应用程序，因为智能合约本身无法查询真实世界的数据。
lang: zh
sidebar: true
incomplete: true
---

预言机是将以太坊连接到链外、真实世界信息的数据源，以便您可以在智能合约中查询数据。 例如，预测市场的 dapp 使用预言机来根据事件进行结算。 预测市场可能要求您使用 ETH 来打赌下一任美国总统是谁。 他们将使用一个预言机来确认结果并向获胜者付款。

## 前置要求 {#prerequisites}

请确保您熟悉[节点](/developers/docs/nodes-and-clients/)、[共识机制](/developers/docs/consensus-mechanisms/)和[智能合约解析](/developers/docs/smart-contracts/anatomy/)，尤其是事件。

## 什么是预言机 {#what-is-an-oracle}

预言机是区块链与真实世界之间的桥梁。 他们充当在链上的 API，你可以查询以获取信息到你的智能合约。 可以是任何信息，从价格信息到天气预报。

## 为什么需要预言机？ {#why-are-they-needed}

使用以太坊这样的区块链，你需要确保：网络中的每个节点都能够重放每个交易并最终产生同样的结果。 API 引入潜在的变量数据。 如果你正在使用一个价格 API 根据一个商定的 $USD 值向某人发送一定数量的 ETH，查询将在不同日期返回不同的结果。 不言而喻，API 可能会被破解或废弃。 一旦发生这种情况，网络中的节点不会接受当前状态，导致打破[共识](/developers/docs/consensus-mechanisms/)。

预言机通过发布数据到区块链来解决这个问题， 以便任何重放交易的节点使用所有人都能看到的、相同的、不可变的数据。 要做到这一点，预言机通常由智能合约和某些可以查询 API 的链外组件组成，然后定期发送交易以更新智能合约的数据。

<!-- ## Oracle architecture {#oracle-architecture}

To understand how an oracle works, let's play through a scenario where your smart contract needs to know who won the superbowl. This is an example of how it could work:

1. Your smart contract requests information from an oracle smart contract.
2. The oracle smart contract emits an [event](/developers/docs/smart-contracts/anatomy/#events-and-logs).
3. Off-chain oracle nodes listen for events and upon hearing one, they query an API.
4. The API returns a JSON response to the nodes.
5. The nodes call on the oracle smart contract.
6. The oracle smart contract returns the data to your smart contract. -->

### 安全性 {#security}

预言机的安全性等同于其数据源。 如果一个 dapp 使用 Uniswap 作为其 ETH/DAI 价格的预言机，攻击者就可能在 Uniswap 上篡改价格，以操纵 dapp 对当前价格的理解。 如何对付这个隐患的一个例子是 MakerDAO 所使用的 [price feed oracles](https://developer.makerdao.com/feeds/) 。它将来自若干外部数据源的价格数据相互核对，而不是仅仅依靠单一来源。

## 使用方法 {#usage}

### 预言机即服务 {#oracles-as-a-service}

Chainlink 等服务提供预言机即服务供你使用。 他们已经具备了基础设施，你可以做以下事情：

- [在你的合约中获取加密货币价格](https://chain.link/solutions/defi)
- [生成可验证的随机数字（对游戏有用）](https://chain.link/solutions/chainlink-vrf)
- [调用外部 API](https://docs.chain.link/docs/request-and-receive-data) – 一个新颖的使用方法是 [检查 wBTC 储备](https://cointelegraph.com/news/1b-in-wrapped-bitcoin-now-being-audited-using-chainlink-s-proof-of-reserve)

这是如何在智能合约中获取最新的 ETH 价格的一个例子：

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

[查看文档](https://docs.chain.link/docs/get-the-latest-price)

#### 预言机服务 {#other-services}

- [Chainlink](https://chain.link/)
- [Witnet](https://witnet.io/)
- [Provable](https://provable.xyz/)

### 构建一个预言机智能合约 {#build-an-oracle-smart-contract}

这是 Pedro Costa 编写的一个预言机智能合约范例。 你可以在他的文章中找到更多注释： [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e)。

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

_我们希望有更多关于构建预言机智能合约的文档。 如果你能帮助我们，就创建一个 PR 吧！_

## 延伸阅读 {#further-reading}

- [Decentralised Oracles: a comprehensive overview](https://medium.com/fabric-ventures/decentralised-oracles-a-comprehensive-overview-d3168b9a8841) –_Julien Thevenard_
- [Implementing a Blockchain Oracle on Ethereum](https://medium.com/@pedrodc/implementing-a-blockchain-oracle-on-ethereum-cedc7e26b49e) –_Pedro Costa_
- [Oracles](https://docs.ethhub.io/built-on-ethereum/oracles/what-are-oracles/) –_EthHub_
