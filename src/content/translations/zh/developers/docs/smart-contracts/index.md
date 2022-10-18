---
title: 智能合约简介
description: 智能合约概述，重点介绍其独特的特征和局限性。
lang: zh
---

## 什么是智能合约？ {#what-is-a-smart-contract}

智能合约只是一个运行在以太坊链上的一个程序。 它是位于以太坊区块链上一个特定地址的一系列代码（函数）和数据（状态）。

智能合约也是一个[以太坊帐户](/developers/docs/accounts/)，我们称之为合约帐户。 这意味着他们有余额，他们可以通过网络进行交易。 但是，他们无法被人操控，他们是被部署在网络上作为程序运行着。 个人用户可以通过提交交易执行智能合约的某一个函数来与智能合约进行交互。 智能合约能像常规合约一样定义规则，并通过代码自动强制执行。 默认情况下，您无法删除智能合约，与它们的交互是不可逆的。

## 前提条件 {#prerequisites}

如果您刚刚入门或寻找技术含量较低的介绍，我们推荐我们的[智能合约简介](/smart-contracts/)。

确保在您已深入了解[帐户](/developers/docs/accounts/)、[交易](/developers/docs/transactions/)和[以太坊虚拟机](/developers/docs/evm/)，然后再开始学习智能合约。

## 数字自动售货机 {#a-digital-vending-machine}

也许对于智能合约最恰当的比喻是自动售货机，就像 [Nick Szabo](https://unenumerated.blogspot.com/) 描述的那样。 有了正确的投入，就保证了某些产出。

要从售货机中获取零食：

```
money + snack selection = snack dispensed
```

这种逻辑以程序的形式写入自动售货机。

像自动售货机一样，智能合约也有逻辑编程到其中。 下面的简单示例展示了自动售货机如何看上去如同智能合约一样：

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
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

就像自动售货机让厂商不再需要员工一样，智能合约可以在许多行业中取代中间人。

## 无需准入性 {#permissionless}

任何人都可以编写智能合约并将其部署到区块链网络上。 您只需要学习如何用[智能合约语言编码](/developers/docs/smart-contracts/languages/)，并有足够的以太币来部署您的合约。 在技术层面上，部署智能合约是一项交易，所以您需要支付[燃料](/developers/docs/gas/)费用，就像您需要为简单的以太坊转账支付燃料一样。 然而，部署合约需要支付的燃料费用更高。

以太坊提供了对开发者友好的智能合约编程语言：

- Solidity
- Vyper

[关于语言的更多信息](/developers/docs/smart-contracts/languages/)

然而，智能合约必须要先编译才能部署，以便以太坊虚拟机可以解释并存储它们。 [关于编译的更多信息](/developers/docs/smart-contracts/compiling/)

## 可组合性 {#composability}

智能合约在以太坊上公开，并且可以看成开放应用程序接口。 这意味着您可以在自己的智能合约中调用其他智能合约，以便显著扩展可能性。 合约甚至可以部署其他合约。

了解关于[智能合约可组合性](/developers/docs/smart-contracts/composability/)的更多信息。

## 局限性 {#limitations}

智能合约本身无法获取关于”真实世界“事件的信息，因为它们无法发送 HTTP 请求。 这是设计使然。 因为依赖外部信息可能会影响共识，而共识对安全性和去中心化而言十分重要。

这可以通过[预言机](/developers/docs/oracles/)来规避。

智能合约的另一个限制是最大合约大小。 智能合约最大可达 24 KB，否则会消耗完燃料。 可以使用[钻石模式](https://eips.ethereum.org/EIPS/eip-2535)来规避它。

## 智能合约资源 {#smart-contract-resources}

**OpenZeppelin 合约 - _安全智能合约开发库。_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社区论坛](https://forum.openzeppelin.com/c/general/16)

**DappSys - _安全、简单、灵活的智能合约基石。_**

- [DappSys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## 延伸阅读 {#further-reading}

- [智能合约：将取代 Lawyer 的区块链技术](https://blockgeeks.com/guides/smart-contracts/) _- Blockgeek_
- [智能合约开发的最佳做法](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– 2019 年 11 月 10 日 - Yos Riady_
- [清洁合约 - 智能合约模式与实践指南](https://www.wslyvh.com/clean-contracts/) _– wslyvh，2020 年 7 月 30 日_
