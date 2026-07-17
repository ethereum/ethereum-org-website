---
title: "如何将泰勒设置为你的预言机"
description: "将泰勒预言机集成到你的协议中的入门指南"
author: "泰勒"
lang: zh
tags: ["Solidity", "智能合约", "预言机"]
skill: beginner
breadcrumb: "泰勒预言机"
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

突击测验：你的协议即将完成，但它需要一个预言机来访问链下数据……你该怎么办？

## （软）先决条件 {#soft-prerequisites}

本文旨在让访问预言机数据源变得尽可能简单直接。话虽如此，为了将重点放在预言机方面，我们对你的编程技能水平有以下假设。

假设：

- 你能够使用终端
- 你已安装 npm
- 你知道如何使用 npm 管理依赖项

泰勒是一个实时且开源的预言机，随时可以投入使用。这篇初学者指南旨在展示启动和运行泰勒是多么容易，从而为你的项目提供一个完全去中心化且抗审查的预言机。

## 概述 {#overview}

泰勒是一个预言机系统，各方可以请求链下数据点（例如 BTC/USD）的值，而报告者则竞争将该值添加到所有以太坊智能合约均可访问的链上数据库中。这个数据库的输入由一个由质押报告者组成的网络来保障安全。泰勒利用加密经济激励机制，通过发行泰勒的代币 Tributes (TRB) 和争议机制，奖励报告者诚实的数据提交并惩罚恶意行为者。

在本教程中，我们将介绍：

- 设置启动和运行所需的初始工具包。
- 演示一个简单的示例。
- 列出目前可以测试泰勒的网络的测试网地址。

## UsingTellor {#usingtellor}

你要做的第一件事是安装将泰勒用作预言机所需的基本工具。使用[此包](https://github.com/tellor-io/usingtellor)安装泰勒用户合约：

`npm install usingtellor`

安装完成后，这将允许你的合约继承“UsingTellor”合约中的函数。

太棒了！既然你已经准备好了工具，让我们通过一个简单的练习来检索比特币价格：

### BTC/USD 示例 {#btcusd-example}

继承 UsingTellor 合约，将泰勒地址作为构造函数参数传递：

下面是一个示例：

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //此合约现在可以访问 UsingTellor 中的所有函数

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

有关合约地址的完整列表，请参阅[此处](https://docs.tellor.io/tellor/the-basics/contracts-reference)。

为了便于使用，UsingTellor 仓库附带了一个版本的 [Tellor Playground](https://github.com/tellor-io/TellorPlayground) 合约，以便更轻松地进行集成。有关实用函数的列表，请参阅[此处](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)。

要获得更稳健的泰勒预言机实现，请在[此处](https://github.com/tellor-io/usingtellor/blob/master/README.md)查看可用函数的完整列表。