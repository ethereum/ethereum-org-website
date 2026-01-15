---
title: "智能合约的可组合性"
description: "了解智能合约如何像乐高积木那样，透过重用现有的组件来构建复杂的去中心化应用程序。"
lang: zh
incomplete: true
---

## 简介 {#a-brief-introduction}

智能合约在以太坊上公开，并且可以看成开放应用程序接口。 你不需要写自己的智能合约才能成为一个去中心化应用程序开发者，你只需要知道如何与它们交互。 例如，你可以使用去中心化交易所 [Uniswap](https://uniswap.exchange/swap) 的现有智能合约来处理你应用中的所有代币兑换逻辑——你不需要从头开始。 查看他们的一些 [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) 和 [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) 合约。

## 什么是可组合性？ {#what-is-composability}

可组合性是将独立的组件结合起来，以建立新的系统或输出。 在软件开发中，可组合性意味着开发者可以复用现有的软件组件来构建新的应用程序。 有个理解可组合性的好办法，就是将可组合的元素们视为乐高积木。 每个乐高积木都可以与另一个积木合并，这让你可以通过合并不同的积木来构建复杂的结构。

在以太坊，每个智能合约都是某种乐高积木 — 你可以使用其他项目的智能合约作为你项目的构造块。 这意味着你不需要花时间来重复造轮子或从零开始搭建项目。

## 可组合性是如何工作的？ {#how-does-composability-work}

以太坊智能合约就像是公共应用程序接口，任何人都可以与合约交互或将其整合到去中心化应用程序中以获得更多功能。 智能合约的可组合性一般有三个原则：模块化、自主性和可发现性。

**1. 模块化**：这是指单个组件执行特定任务的能力。 在以太坊，每个智能合约都有一个特定的用例（如 Uniswap 示例所示）。

**2. 自主性**：可组合组件必须能够独立运行。 以太坊中每个智能合约都可以在不依赖系统其他部分的情况下自动执行。

**3. 可发现性**：如果外部合约或软件库不是公开可用的，开发人员就无法调用它们或将其集成到应用程序中。 按照设计，智能合约是开源的；任何人都可以调用合约或派生代码库。

## 可组合性的好处 {#benefits-of-composability}

### 缩短开发周期 {#shorter-development-cycle}

可组合性减少了开发人员在创建[去中心化应用程序](/apps/#what-are-dapps)时所需的工作量。 [正如 Naval Ravikant 所说：](https://twitter.com/naval/status/1444366754650656770)“开源意味着每个问题只须解决一次。”

如果有智能合约解决了某个问题，那么其他开发者可以重用这个合约，所以他们无需解决同样的问题。 这种方法让开发者可以使用现有软件库并添加一些额外功能来创建新的去中心化应用程序。

### 更强的创新能力 {#greater-innovation}

可组合性鼓励创新和实验，因为开发者们可以自由地重用、修改、复制或整合开源代码以达到预期结果。 这样，开发小组在基础功能上将花费较少的时间，并可以将更多的时间分配到新功能的实验上。

### 更好的用户体验 {#better-user-experience}

以太坊生态系统中各组成部分之间的互操作性可改善用户体验。 相较于应用程序无法互通的碎片化生态系统，去中心化应用程序在集成外部智能合约后，用户可以获取更多功能。

我们将使用一个仲裁交易的示例来说明互操作性的好处：

如果某个代币在 `exchange A` 的交易价格高于 `exchange B`，你可以利用价差赚取利润。 但是，只有当你拥有足够的资金来完成这笔交易（即从 `exchange B` 购买代币，然后在 `exchange A` 上卖出）时，你才能这么做。

在你没有足够资金来支付交易的情况下，闪电贷可能是个理想的办法。 [闪电贷](/defi/#flash-loans) 技术性很强，但其基本思想是，你可以在_一笔_交易中（无抵押）借入资产并归还。

回到我们最初的例子，套利交易者可以借入一大笔闪电贷，从 `exchange B` 购买代币，在 `exchange A` 上卖出，偿还本金和利息，并在同一笔交易中保留利润。 这种复杂的逻辑需要将多个合约的调用结合起来，如果智能合约缺乏互操作性，这种调用是不可能做到的。

## 以太坊中的可组合性示例 {#composability-in-ethereum}

### 代币兑换 {#token-swaps}

如果你创建了一个需要用以太币支付交易费用的去中心化应用程序，你可以通过整合代币交换逻辑，允许用户使用其他 ERC-20 代币付款。 在合约执行调用的函数之前，代码会自动把用户的代币转换为以太币。

### 治理 {#governance}

为 [DAO](/dao/) 构建定制的治理系统可能既昂贵又耗时。 或者，你可以使用开源治理工具包（如 [Aragon Client](https://client.aragon.org/)）来引导你的 DAO，从而快速创建治理框架。

### 身份管理 {#identity-management}

你可以集成去中心化身份 (DID) 工具来管理用户的身份验证，而不是建立一个自定义身份验证系统或依靠中心化的身份提供商。 例如 [SpruceID](https://www.spruceid.com/)，它是一个开源工具包，提供“用以太坊登录”功能，让用户可以用以太坊钱包验证身份。

## 相关教程 {#related-tutorials}

- [使用 create-eth-app 快速开始你的去中心化应用程序前端开发](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/)_——概述如何使用 create-eth-app 创建开箱即用的、包含热门智能合约的应用程序。_

## 扩展阅读{#further-reading}

_你还知道哪些对你有帮助的社区资源？ 请编辑本页面并添加进来！_

- [可组合性即创新](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [为什么可组合性对 Web3 很重要](https://hackernoon.com/why-composability-matters-for-web3)
- [什么是可组合性？](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
