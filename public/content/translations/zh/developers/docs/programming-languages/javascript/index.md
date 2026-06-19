---
title: 面向 JavaScript 开发者的以太坊
description: 了解如何使用基于 JavaScript 的项目和工具进行以太坊开发。
lang: zh
---

JavaScript 是以太坊生态系统中最受欢迎的语言之一。事实上，有一个[团队](https://github.com/ethereumjs)致力于尽可能多地将以太坊引入 JavaScript。

在[技术栈的各个层面](/developers/docs/ethereum-stack/)都有机会编写 JavaScript（或类似的语言）。

## 与以太坊交互 {#interact-with-ethereum}

### JavaScript API 库 {#javascript-api-libraries}

如果你想编写 JavaScript 来查询区块链、发送交易等，最方便的方法是使用 [JavaScript API 库](/developers/docs/apis/javascript/)。这些 API 允许开发者轻松地与[以太坊网络中的节点](/developers/docs/nodes-and-clients/)进行交互。

你可以使用这些库与以太坊上的智能合约进行交互，因此可以构建一个去中心化应用 (dapp)，只需使用 JavaScript 即可与预先存在的合约进行交互。

**查看**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _包含 JavaScript 和 TypeScript 版本的以太坊钱包实现和实用工具。_
- [viem](https://viem.sh) – _一个以太坊的 TypeScript 接口，提供用于与以太坊交互的底层无状态原语。_
- [Drift](https://ryangoree.github.io/drift/) – _一个 TypeScript 元库，内置缓存、钩子和测试模拟，可跨 Web3 库轻松进行以太坊开发。_

### 智能合约 {#smart-contracts}

如果你是一名 JavaScript 开发者并希望编写自己的智能合约，你可能需要熟悉 [Solidity](https://solidity.readthedocs.io)。这是最受欢迎的智能合约语言，其语法类似于 JavaScript，这可能会使其更容易学习。

了解更多关于[智能合约](/developers/docs/smart-contracts/)的信息。

## 了解协议 {#understand-the-protocol}

### 以太坊虚拟机 {#the-ethereum-virtual-machine}

[以太坊虚拟机](/developers/docs/evm/)有一个 JavaScript 实现。它支持最新的分叉规则。分叉规则是指由于计划升级而对 EVM 所做的更改。

它被拆分为各种 JavaScript 包，你可以查看这些包以更好地了解：

- 账户
- 区块
- 区块链本身
- 交易
- 以及更多……

这将帮助你理解诸如“账户的数据结构是什么？”之类的问题。

如果你更喜欢阅读代码，那么这个 JavaScript 实现可能是通读我们文档的绝佳替代方案。

**查看 EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### 节点和客户端 {#nodes-and-clients}

一个 EthereumJS 客户端正在积极开发中，它让你能够用你熟悉的语言——JavaScript，深入了解以太坊客户端的工作原理！

**查看客户端**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## 其他项目 {#other-projects}

在以太坊 JavaScript 领域还有许多其他正在进行的项目，包括：

- 钱包实用工具库。
- 生成、导入和导出以太坊密钥的工具。
- `merkle-patricia-tree` 的实现——以太坊黄皮书中概述的一种数据结构。

在 [EthereumJS 仓库](https://github.com/ethereumjs)中深入研究你最感兴趣的内容。

## 延伸阅读 {#further-reading}

_知道对你有帮助的社区资源吗？编辑本页面并添加它！_