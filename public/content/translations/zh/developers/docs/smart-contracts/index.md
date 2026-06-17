---
title: 智能合约简介
description: 智能合约概述，重点介绍其独有的特征和局限性。
lang: zh
---

## 什么是智能合约？ {#what-is-a-smart-contract}

“智能合约”只是一个运行在[以太坊](/)区块链上的程序。它是位于以太坊区块链上一个特定地址的一系列代码（它的函数）和数据（它的状态）的集合。

智能合约是一种[以太坊账户](/developers/docs/accounts/)。这意味着它们有余额，并且可以成为交易的目标。但是，它们不受用户控制，而是部署到网络并按程序运行。然后，用户账户可以通过提交执行智能合约上定义的函数的交易来与智能合约进行交互。智能合约可以像常规合约一样定义规则，并通过代码自动强制执行。默认情况下，智能合约无法被删除，并且与它们的交互是不可逆的。

## 前提条件 {#prerequisites}

如果你刚刚入门，或者正在寻找技术性较弱的介绍，我们推荐阅读我们的[智能合约简介](/smart-contracts/)。

在进入智能合约的世界之前，请确保你已经阅读了有关[账户](/developers/docs/accounts/)、[交易](/developers/docs/transactions/)和[以太坊虚拟机](/developers/docs/evm/)的内容。

## 数字自动售货机 {#a-digital-vending-machine}

正如[尼克·萨博](https://unenumerated.blogspot.com/)所描述的那样，智能合约最好的比喻也许是自动售货机。有了正确的输入，就一定能保证特定的输出。

要从自动售货机获取零食：

```
金钱 + 零食选择 = 吐出零食
```

这种逻辑被编程到自动售货机中。

智能合约就像自动售货机一样，其中也编程了逻辑。如果这台自动售货机是用 Solidity 编写的智能合约，下面是一个简单的示例：

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // 声明合约的状态变量
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // 当 'VendingMachine' 合约被部署时：
    // 1. 将部署地址设置为合约的所有者
    // 2. 将已部署的智能合约的纸杯蛋糕余额设置为 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // 允许所有者增加智能合约的纸杯蛋糕余额
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // 允许任何人购买纸杯蛋糕
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

就像自动售货机消除了对售货员的需求一样，智能合约可以在许多行业中取代中间人。

## 无需许可 {#permissionless}

任何人都可以编写智能合约并将其部署到网络。你只需要学习如何使用[智能合约语言](/developers/docs/smart-contracts/languages/)进行编码，并拥有足够的 ETH 来部署你的合约。在技术上，部署智能合约是一笔交易，因此你需要支付 [Gas](/developers/docs/gas/)，就像你需要为简单的 ETH 转账支付 Gas 一样。然而，合约部署的 Gas 成本要高得多。

以太坊拥有对开发者友好的语言来编写智能合约：

- Solidity
- Vyper

[更多关于语言的信息](/developers/docs/smart-contracts/languages/)

但是，它们必须在部署之前进行编译，以便以太坊虚拟机可以解释和存储合约。[更多关于编译的信息](/developers/docs/smart-contracts/compiling/)

## 可组合性 {#composability}

智能合约在以太坊上是公开的，可以被认为是开放的 API。这意味着你可以在自己的智能合约中调用其他智能合约，从而极大地扩展可能性。合约甚至可以部署其他合约。

了解更多关于[智能合约可组合性](/developers/docs/smart-contracts/composability/)的信息。

## 局限性 {#limitations}

仅靠智能合约无法获取有关“现实世界”事件的信息，因为它们无法从链下数据源检索数据。这意味着它们无法对现实世界中的事件做出响应。这是有意为之的。依赖外部信息可能会危及共识，而共识对于安全性和去中心化至关重要。

然而，对于区块链应用程序来说，能够使用链下数据非常重要。解决方案是[预言机](/developers/docs/oracles/)，它们是摄取链下数据并将其提供给智能合约的工具。

智能合约的另一个局限性是最大合约大小。智能合约最大只能是 24KB，否则会耗尽 Gas。这可以通过使用[钻石模式](https://eips.ethereum.org/EIPS/eip-2535)来规避。

## 多重签名合约 {#multisig}

多重签名合约是需要多个有效签名才能执行交易的智能合约账户。这对于避免持有大量以太币或其他代币的合约出现单点故障非常有用。多重签名还在多方之间划分了合约执行和密钥管理的责任，并防止单个私钥丢失导致不可逆转的资金损失。由于这些原因，多重签名合约可用于简单的 DAO 治理。多重签名需要 M 个可能的有效签名中的 N 个签名（其中 N ≤ M，且 M > 1）才能执行。通常使用 `N = 3, M = 5` 和 `N = 4, M = 7`。4/7 多重签名需要七个可能的有效签名中的四个。这意味着即使丢失了三个签名，资金仍然可以找回。在这种情况下，这也意味着大多数密钥持有者必须同意并签名才能执行合约。

## 智能合约资源 {#smart-contract-resources}

**欧本齐柏林合约 -** **_用于安全智能合约开发的库。_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社区论坛](https://forum.openzeppelin.com/c/general/16)

## 延伸阅读 {#further-reading}

- [Coinbase：什么是智能合约？](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [切恩林克：什么是智能合约？](https://chain.link/education/smart-contracts)
- [视频：简单解释 - 智能合约](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft：Web3 学习和审计平台](https://updraft.cyfrin.io)

## 教程：以太坊上的智能合约签名 (EIP-1271) {#tutorials}

- [EIP-1271：签署和验证智能合约签名](/developers/tutorials/eip-1271-smart-contract-signatures/) _– EIP-1271 如何使智能合约能够验证签名，并附带 Safe 实现的演练。_