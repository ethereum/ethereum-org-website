---
title: 面向 JavaScript 开发者的以太坊资源
description: 学习如何使用并通过基于 JavaScript 的项目及工具参与以太坊的开发。
lang: zh
---

JavaScript是以太坊生态中最受欢迎的语言之一。 事实上，有一个 [团队](https://github.com/ethereumjs) 致力于尽可能多地在以太坊引入 JavaScript。

有机会在[堆栈的所有级别](/developers/docs/ethereum-stack/)使用 JavaScript（或接近）。

## Javascript 和以太坊的交互 {#interact-with-ethereum}

### JavaScript API 库 {#javascript-api-libraries}

如果你想要写入 JavaScript 来查询区块链、发送交易等，则最方便的方法是使用 [JavaScript API 库](/developers/docs/apis/javascript/)。 这些 API 允许开发者轻松与[以太坊网络节点](/developers/docs/nodes-and-clients/)交互。

你可以使用这些库与以太坊上的智能合约交互，因此只需要使用 JavaScript 与既有合约交互就可以构建一个 dapp。

**参阅：**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _– 包含 JavaScript 和 TypeScript 的完整以太坊钱包的实现和工具。_
- [viem](https://viem.sh) – 一个用于以太坊的 TypeScript 接口，提供与以太坊交互的底层无状态基元。

### 智能合约 {#smart-contracts}

作为 JavaScript 开发者，如果希望编写自己的智能合约，你可能想要了解 [Solidity](https://solidity.readthedocs.io)。 这是最受欢迎的智能合约语言，它在语法上类似于 JavaScript，可能会更容易学习。

关于[智能合约](/developers/docs/smart-contracts/)的更多信息。

## 理解协议 {#understand-the-protocol}

### 以太坊虚拟机 {#the-ethereum-virtual-machine}

有用 JavaScript 实现的[以太坊虚拟机](/developers/docs/evm/)。 它支持最新的分叉（fork）规则。 分叉规则是指因计划的升级而对 EVM 进行的改造。

它被拆分成各种 JavaScript 软件包，以便你可以更好地了解：

- 帐户
- 区块
- 区块链本身
- 交易
- 更多...

这将有助于你理解像“一个帐户的数据结构是什么？”这样的问题。

如果你倾向于阅读代码，下面的 JavaScript 代码可以很好地成为通读文档的替代方案。

**参阅 monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### 节点和客户端 {#nodes-and-clients}

目前正在开发的 Ethereumjs 客户端允许你发掘以太坊客户端如何使用你能理解的语言 (JavaScript) 工作！

它曾经在独立的[`存储库`](https://github.com/ethereumjs/ethereumjs-client)中托管，然而，后来作为一个包整合进了 EthereumVM monorepo。

**参阅客户端**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## 其它项目 {#other-projects}

以太坊的 JavaScript 领域内还有许多其它东西：

- 钱包工具库。
- 生成、导入和导出以太坊密钥的工具。
- 一个 `merkle-patricia-tree` 的实现 - 一种在以太坊黄皮书中描述的数据结构。

可以在 [EthereumJS 存储库](https://github.com/ethereumjs)中深入了解你最感兴趣的内容

## 延伸阅读 {#further-reading}

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_
