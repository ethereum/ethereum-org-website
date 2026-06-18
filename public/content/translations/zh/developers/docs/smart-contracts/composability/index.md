---
title: 智能合约可组合性
description: 了解如何通过重用现有组件，像搭乐高积木一样组合智能合约来构建复杂的去中心化应用 (dapp)。
lang: zh
incomplete: true
---

## 简介 {#a-brief-introduction}

智能合约在以太坊上是公开的，可以被视为开放的 API。你不需要编写自己的智能合约就能成为去中心化应用 (dapp) 开发者，你只需要知道如何与它们进行交互。例如，你可以使用去中心化交易所 [尤尼斯瓦普](https://uniswap.exchange/swap) 现有的智能合约来处理你应用中的所有代币兑换逻辑——你不需要从头开始。查看他们的一些 [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) 和 [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) 合约。

## 什么是可组合性？ {#what-is-composability}

可组合性是指将不同的组件结合起来创建新的系统或输出。在软件开发中，可组合性意味着开发者可以重用现有的软件组件来构建新的应用程序。理解可组合性的一个好方法是将可组合元素想象成乐高积木。每块乐高积木都可以与另一块结合，让你通过组合不同的乐高积木来构建复杂的结构。

在以太坊中，每个智能合约都像是一块乐高积木——你可以使用其他项目中的智能合约作为你项目的构建模块。这意味着你不需要花时间重新发明轮子或从头开始构建。

## 可组合性是如何运作的？ {#how-does-composability-work}

以太坊智能合约就像公共 API，因此任何人都可以与合约交互，或将它们集成到 dapp 中以增加功能。智能合约可组合性通常基于三个原则：模块化、自治性和可发现性：

**1. 模块化**：这是单个组件执行特定任务的能力。在以太坊中，每个智能合约都有特定的用例（如尤尼斯瓦普示例所示）。

**2. 自治性**：可组合组件必须能够独立运行。以太坊中的每个智能合约都是自动执行的，并且可以在不依赖系统其他部分的情况下运行。

**3. 可发现性**：如果外部合约或软件库没有公开，开发者就无法调用它们或将其集成到应用程序中。按照设计，智能合约是开源的；任何人都可以调用智能合约或分叉代码库。

## 可组合性的优势 {#benefits-of-composability}

### 缩短开发周期 {#shorter-development-cycle}

可组合性减少了开发者在创建 [dapp](/apps/#what-are-dapps) 时必须做的工作。[正如 Naval Ravikant 所说：](https://twitter.com/naval/status/1444366754650656770)“开源意味着每个问题只需解决一次。”

如果有一个智能合约解决了一个问题，其他开发者就可以重用它，这样他们就不必解决同样的问题。通过这种方式，开发者可以利用现有的软件库并添加额外的功能来创建新的 dapp。

### 促进创新 {#greater-innovation}

可组合性鼓励创新和实验，因为开发者可以自由地重用、修改、复制或集成开源代码以创造预期的结果。因此，开发团队在基本功能上花费的时间更少，可以分配更多时间来尝试新功能。

### 更好的用户体验 {#better-user-experience}

以太坊生态系统组件之间的互操作性改善了用户体验。当 dapp 集成外部智能合约时，用户可以获得比在应用程序无法通信的碎片化生态系统中更强大的功能。

我们将使用套利交易的例子来说明互操作性的好处：

如果某种代币在 `exchange A` 上的交易价格高于 `exchange B`，你可以利用价格差来获利。然而，只有当你有足够的资金来支持这笔交易（即从 `exchange B` 购买代币并在 `exchange A` 上出售）时，你才能做到这一点。

在你没有足够资金来支付交易费用的情况下，闪电贷可能是理想的选择。[闪电贷](/defi/#flash-loans) 的技术性很强，但基本理念是你可以借入资产（无需抵押品）并在_同一笔_交易中归还。

回到我们最初的例子，套利交易者可以借出一笔大额闪电贷，从 `exchange B` 购买代币，在 `exchange A` 上出售，偿还本金和利息，并保留利润，所有这些都在同一笔交易中完成。这种复杂的逻辑需要组合调用多个合约，如果智能合约缺乏互操作性，这是不可能实现的。

## 以太坊中可组合性的示例 {#composability-in-ethereum}

### 代币兑换 {#token-swaps}

如果你创建了一个需要用 ETH 支付交易费用的 dapp，你可以通过集成代币兑换逻辑，允许用户使用其他 ERC-20 代币进行支付。在合约执行被调用的函数之前，代码会自动将用户的代币转换为 ETH。

### 治理 {#governance}

为 [DAO](/dao/) 构建定制的治理系统可能既昂贵又耗时。相反，你可以使用开源治理工具包（例如 [Aragon Client](https://client.aragon.org/)）来引导你的 DAO，从而快速创建治理框架。

### 身份管理 {#identity-management}

你无需构建自定义身份验证系统或依赖中心化提供商，而是可以集成去中心化身份 (DID) 工具来管理用户的身份验证。一个例子是 [SpruceID](https://www.spruceid.com/)，这是一个开源工具包，提供“使用以太坊登录”功能，让用户可以使用以太坊钱包验证身份。

## 相关教程 {#related-tutorials}

- [使用 create-eth-app 启动你的 dapp 前端开发](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– 概述如何使用 create-eth-app 开箱即用地创建带有流行智能合约的应用。_

## 延伸阅读 {#further-reading}

_知道有帮助过你的社区资源吗？编辑本页面并添加它！_

- [可组合性即创新](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [为什么可组合性对 Web3 很重要](https://hackernoon.com/why-composability-matters-for-web3)
- [什么是可组合性？](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)