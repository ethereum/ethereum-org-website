---
title: 以太坊技术栈简介
description: 介绍以太坊技术栈的不同层级以及它们如何组合在一起。
lang: zh
---

像任何软件技术栈一样，完整的“以太坊技术栈”会因项目目标的不同而有所差异。

然而，以太坊的核心组件有助于提供一个心智模型，说明软件应用程序如何与以太坊区块链进行交互。了解技术栈的各个层级将有助于你理解将以太坊集成到软件项目中的不同方式。

## 第 1 层：以太坊虚拟机 {#ethereum-virtual-machine}

[以太坊虚拟机 (EVM)](/developers/docs/evm/) 是以太坊上智能合约的运行环境。以太坊区块链上的所有智能合约和状态更改均由[交易](/developers/docs/transactions/)执行。EVM 处理以太坊网络上的所有交易处理。

与任何虚拟机一样，EVM 在执行代码和执行机器（以太坊节点）之间创建了一个抽象层。目前，EVM 运行在分布于世界各地的数千个节点上。

在底层，EVM 使用一组操作码指令来执行特定任务。这些（140 个独特的）操作码使 EVM 具备[图灵完备性](https://en.wikipedia.org/wiki/Turing_completeness)，这意味着只要有足够的资源，EVM 几乎可以计算任何东西。

作为一名去中心化应用 (dapp) 开发者，你不需要对 EVM 了解太多，只需知道它的存在，并且它可靠地为以太坊上的所有应用程序提供动力而不会停机。

## 第 2 层：智能合约 {#smart-contracts}

[智能合约](/developers/docs/smart-contracts/)是在以太坊区块链上运行的可执行程序。

智能合约使用特定的[编程语言](/developers/docs/smart-contracts/languages/)编写，这些语言会编译成 EVM 字节码（称为操作码的低级机器指令）。

智能合约不仅充当开源库，它们本质上还是始终运行且无法被关闭的开放 API 服务。智能合约提供公共函数，用户和应用程序（[去中心化应用 (dapp)](/developers/docs/dapps/)）无需许可即可与之交互。任何应用程序都可以与已部署的智能合约集成以组合功能，例如添加[数据馈送](/developers/docs/oracles/)或支持代币兑换。此外，任何人都可以向以太坊部署新的智能合约，以添加自定义功能来满足其应用程序的需求。

作为一名去中心化应用 (dapp) 开发者，只有当你想要在以太坊区块链上添加自定义功能时，才需要编写智能合约。你可能会发现，仅仅通过与现有的智能合约集成，就可以满足项目的大部分或全部需求，例如，如果你想支持稳定币支付或实现代币的去中心化交易所。

## 第 3 层：以太坊节点 {#ethereum-nodes}

为了让应用程序与以太坊区块链进行交互，它必须连接到一个[以太坊节点](/developers/docs/nodes-and-clients/)。连接到节点允许你读取区块链数据和/或向网络发送交易。

以太坊节点是运行软件（以太坊客户端）的计算机。客户端是以太坊的一种实现，它验证每个区块中的所有交易，从而保持网络安全和数据准确。**以太坊节点就是以太坊区块链**。它们共同存储以太坊区块链的状态，并就改变区块链状态的交易达成共识。

通过将你的应用程序连接到以太坊节点（通过 [JSON-RPC API](/developers/docs/apis/json-rpc/)），你的应用程序能够从区块链读取数据（例如用户账户余额），以及向网络广播新交易（例如在用户账户之间转移 ETH 或执行智能合约的函数）。

## 第 4 层：以太坊客户端 API {#ethereum-client-apis}

许多便捷的库（由以太坊开源社区构建和维护）允许你的应用程序连接到以太坊区块链并与之通信。

如果你面向用户的应用程序是一个 Web 应用，你可以选择直接在前端 `npm install` 一个 [JavaScript API](/developers/docs/apis/javascript/)。或者你可能会选择在服务器端实现此功能，使用 [Python](/developers/docs/programming-languages/python/) 或 [Java](/developers/docs/programming-languages/java/) API。

虽然这些 API 不是技术栈中必不可少的部分，但它们抽象出了直接与以太坊节点交互的大部分复杂性。它们还提供实用函数（例如，将 ETH 转换为 Gwei），因此作为开发者，你可以花更少的时间处理以太坊客户端的复杂细节，而将更多时间集中在应用程序的特定功能上。

## 第 5 层：最终用户应用程序 {#end-user-applications}

技术栈的最顶层是面向用户的应用程序。这些是你今天经常使用和构建的标准应用程序：主要是 Web 和移动应用。

开发这些用户界面的方式基本保持不变。通常，用户不需要知道他们正在使用的应用程序是使用区块链构建的。

## 准备好选择你的技术栈了吗？ {#ready-to-choose-your-stack}

查看我们的指南，为你的以太坊应用程序[设置本地开发环境](/developers/local-environment/)。

## 延伸阅读 {#further-reading}

- [Web 3.0 应用程序的架构](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_知道对你有帮助的社区资源吗？编辑本页面并添加它！_