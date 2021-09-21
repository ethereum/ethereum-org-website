---
title: 智能合约简介
description: 智能合约概述，重点介绍其独特的特征和局限性。
lang: zh
sidebar: true
---

## 什么是智能合约？

智能合约只是一个运行在以太坊链上的一个程序。 它是位于以太坊区块链上一个特定地址的一系列代码（函数）和数据（状态）。

智能合约就是一个[以太坊帐户](/developers/docs/accounts/)。 这意味着他们有余额，他们可以通过网络进行交易。 但是，他们无法被人操控，他们是被部署在网络上作为程序运行着。 个人用户可以通过提交交易执行智能合约的某一个函数来与智能合约进行交互。 智能合约能像常规合同一样定义规则，并通过代码自动强制执行。

## 前置要求 {#prerequisites}

确保在您已了解有关[帐户](/developers/docs/accounts/)、[交易](/developers/docs/transactions/)和[以太坊虚拟机](/developers/docs/evm/)后再进入智能合约。

<!-- TODO simpler example... scheduling payments in Ethereum is actually difficult -->
<!-- TODO show an example smart contract, e.g. an implementation of a vending machine -->

## 数字自动售货机 {#a-digital-vending-machine}

智能合约的最佳比喻也许是一种售货机，如 Nick Szabo 所描述的那样。 有了正确的投入，就保证了某些产出。

从售货机中获取快餐：

```
钱 + 选择零食 = 零食分发
```

这种逻辑是以程序的形式写入自动售货机的。

一个智能合约，就像自动售货机一样，是有逻辑被写入进去的。 下面是使得自动售货机看起来像智能合约的一个简单示例：

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

就像自动售货机消除了对供应商雇员的需求一样，智能合约可以在许多行业中取代中介机构。

## 无需准入性 {#permissionless}

任何人都可以编写智能合约并将其部署到区块链网络上。 你只需要学习如何用[智能合约语言编码](/developers/docs/smart-contracts/languages/)，并有足够的 ETH 来部署你的合约。 在技术上，部署智能合约是一项交易，所以你需要支付你的[Gas](/developers/docs/gas/)，就像你需要为简单的以太坊转账支付 gas 一样。 然而，部署合约所需要消耗的 gas 费要高得多。

以太坊编写智能合约的语言，对开发者比较友好：

- Solidity
- Vyper

[有关更多语言](/developers/docs/smart-contracts/languages/)

然而，它们必须要先编译才能部署，以便以太坊虚拟机可以解释并储存合约。 [更多关于编译的内容](/developers/docs/smart-contracts/compiling/)

## 可组合性 {#composability}

智能合约在以太坊上公开，并被认为是开放应用程序接口。 这意味着你可以在你自己的智能合约中调用其他智能合约以极大地扩展可能性。 合约甚至可以部署其他合约。

了解更多关于[智能合约可组合性](/developers/docs/smart-contracts/composability/)的内容。

## 局限性 {#limitations}

智能合约本身无法获取关于”真实世界“的事件信息，因为它们无法发送 HTTP 请求。 这样设计是因为依赖于外部信息可能会危及共识，这对安全性和去中心化而言十分重要。

这可以通过 [预言机](/developers/docs/oracles/) 来规避。

## 智能合约资源 {#smart-contract-resources}

**OpenZeppelin 合约——\*\***_安全智能合约开发的库。_\*\*

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社区论坛](https://forum.openzeppelin.com/c/general/16)

**DappSys——\*\***_安全、简单、灵活的智能合约构建模块。_\*\*

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

## 延伸阅读 {#further-reading}

- [智能合约：将取代 Lawyer 的区块链技术](https://blockgeeks.com/guides/smart-contracts/) _- Blockgeek_
- [智能合约开发的最佳实践](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– 2019 年 11 月 10 日 - Yos Riady_
