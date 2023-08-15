---
title: 如何将 Tellor 设置为您的预言机
description: 将 Tellor 预言机集成到协议中的指南
author: "Tellor"
lang: zh
tags:
  - "solidity"
  - "智能合同"
  - "预言机"
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

小测验：您的协议即将完成，但它需要一个预言机来访问链下数据......您该怎么做？

## （软）前提条件 {#soft-prerequisites}

这篇文章旨在解释如何让访问预言机数据馈送变得简单易行。 这就是说，我们假定您具备一定的编码技能水平，下文侧重于讲述预言机方面。

本文假定：

- 您能够使用终端
- 您安装了 npm
- 您知道如何使用 npm 管理依赖项

Tellor 是一种可供直接实现的开源预言机。 本初学者教程旨在展示如何轻松地运行 Tellor，为您的项目提供一个完全去中心化的、抗审查的预言机。

## 概述 {#overview}

Tellor 是一种预言机系统，参与者可以在该系统中请求链下数据点（例如 BTC/USD）的值，提供者相互竞争将该值添加到链上数据库中，使得所有以太坊智能合约都可以访问该值。 该数据库的输入由质押提供者网络提供保护。 Tellor 利用加密经济激励机制，奖励提供者诚实的数据提交行为，并通过发行 Tellor 的代币、Tribute (TRB) 和争议机制来惩罚不良行为者。

在本教程中，我们将介绍：

- 设置您需要运行的初始工具包。
- 讲解一个简单示例。
- 列出目前可以测试 Tellor 的网络的测试网地址。

## 使用 Tellor {#usingtellor}

首先安装一些基本工具，以便将 Tellor 作为预言机。 使用[此软件包](https://github.com/tellor-io/usingtellor)安装 Tellor 用户合约：

`npm install usingtellor`

安装完成后，将允许您的合约继承“UsingTellor”合约的函数。

很好！ 既然您已经准备好工具了，我们来完成一个简单的练习来获取比特币价格：

### BTC/USD 示例 {#btcusd-example}

继承 UsingTellor 合约，将 Tellor 的地址作为构造函数的参数：

下面是一个示例：

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //This Contract now has access to all functions in UsingTellor

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

完整的合约地址列表参见 [这里](https://docs.tellor.io/tellor/the-basics/contracts-reference)。

为了便于使用，UsingTellor 合约库带有一个[Tellor Playground](https://github.com/tellor-io/TellorPlayground) 合约的版本以便于集成。 请参阅[此处](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)获取实用函数的列表。

要更加可靠地实现 Tellor 预言机，请点击[此处](https://github.com/tellor-io/usingtellor/blob/master/README.md)查看可用函数的完整列表。
