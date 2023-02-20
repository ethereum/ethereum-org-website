---
title: 开发网络
description: 对以太坊应用的开发网络环境与开发工具的概览。
lang: zh
---

当使用智能合约来开发一个以太坊应用时，您可能想要在部署之前在本地查看它是如何工作的。

这和在本地运行一个本地网页服务器相似。为了测试您的去中心化应用程序，您可以使用开发网络创建一个本地的区块链。 这些以太坊开发网络提供了能够比公共测试网更快的迭代功能（例如您不需要从测试网获取以太币）。

## 前置要求 {#prerequisites}

您应该先理解[以太坊堆栈](/developers/docs/ethereum-stack/)和[以太坊网络](/developers/docs/networks/)基础知识才能进入开发网络。

## 什么是开发网络？ {#what-is-a-development-network}

实质上开发网络是指哪些对本地开发特殊设计的以太坊客户端（会对以太坊进行部署应用）。

**为什么不在本地运行一个标准的以太坊节点？**

你*可以*[运行节点](/developers/docs/nodes-and-clients/#running-your-own-node)，但由于开发网络是以开发为目的而建立的，它们往往会打包一些快捷方便的功能，例如：

- 为本地区块链提供数据，这个功能很重要（例如使用以太币余额的帐户）
- 在接受到每个交易时就立即按顺序和没有延迟地挖掘区块。
- 增强调试和日志功能

## 可用工具 {#available-projects}

**注意**：大多数[开发框架](/developers/docs/frameworks/)包含一个内置的开发网络。 我们建议从一个框架开始[设置您的本地开发环境](/developers/local-environment/)。

### Ganache {#ganache}

快速构建一个个人的以太坊区块链，您可以用它来运行测试，执行命令，并在控制链的运行方式时检查状态。

Ganache 提供了一个桌面应用程序 (Ganache UI) 以及一个命令行工具 (`ganache-cli`)。 它是 Truffle 工具套装的一部分。

- [网站](https://www.trufflesuite.com/ganache)
- [GitHub](https://github.com/trufflesuite/ganache)
- [相关文档](https://www.trufflesuite.com/docs/ganache/overview)

### Hardhat 网络 {#hardhat-network}

一个专门用于开发的本地以太坊网络。 该网络允许您部署合约，运行测试并调试代码。

Hardhat 网络内置了安全帽，安全帽是专业人员的以太坊开发环境。

- [网站](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### 本地信标链 {#local-beacon-chains}

一些共识客户端具有内置工具，用于启动本地信标链以进行测试。 提供了 Lighthouse、Nimbus 和 Lodestar 的说明：

- [使用 Lodestar 的本地测试网](https://chainsafe.github.io/lodestar/usage/local/)
- [使用 Lightthouse 的本地测试网](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)
- [使用 Nimbus 的本地测试网](https://github.com/status-im/nimbus-eth1/blob/master/fluffy/docs/local_testnet.md)

### 公共以太坊测试链 {#public-beacon-testchains}

当前有三个公共的、用于测试的以太坊实现。 建议使用长期受支持的 Goerli 测试网。 Sepolia 测试网在可预见的将来预期也会一直维护，但其验证者集合是经许可产生的，这意味着此测试网上的新验证者没有一般访问权限。 Ropsten 链预计将被弃用。

- [Goerli 质押启动板](https://goerli.launchpad.ethereum.org/)
- [Ropsten 质押启动板](https://ropsten.launchpad.ethereum.org/)

## 延伸阅读 {#further-reading}

_还有哪些社区资源对你有所帮助？ 编辑本页面以添加！_

## 相关主题 {#related-topics}

- [开发框架](/developers/docs/frameworks/)
- [设置本地开发环境](/developers/local-environment/)
