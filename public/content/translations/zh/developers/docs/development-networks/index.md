---
title: 开发网络
description: 对以太坊应用的开发网络环境与开发工具的概览。
lang: zh
---

当使用智能合约来开发一个以太坊应用时，你可能想要在部署之前在本地查看它是如何工作的。

这和在本地运行一个本地网页服务器相似。为了测试你的去中心化应用程序，你可以使用开发网络创建一个本地的区块链。 这些以太坊开发网络提供了能够比公共测试网更快的迭代功能（例如你不需要从测试网获取以太币）。

## 前置要求 {#prerequisites}

你应该先理解[以太坊堆栈](/developers/docs/ethereum-stack/)和[以太坊网络](/developers/docs/networks/)基础知识才能进入开发网络。

## 什么是开发网络？ {#what-is-a-development-network}

实质上开发网络是指哪些对本地开发特殊设计的以太坊客户端（会对以太坊进行部署应用）。

**为什么不在本地运行一个标准的以太坊节点？**

你_可以_[运行节点](/developers/docs/nodes-and-clients/#running-your-own-node)，但由于开发网络是以开发为目的而建立的，它们往往会打包一些快捷方便的功能，例如：

- 为本地区块链提供数据，这个功能很重要（例如使用以太币余额的帐户）
- 用接收的每笔交易，按照顺序即时产生区块，毫不延迟。
- 增强调试和日志功能

## 可用工具 {#available-projects}

**注意**：大多数[开发框架](/developers/docs/frameworks/)包含一个内置的开发网络。 我们建议从一个框架开始[设置你的本地开发环境](/developers/local-environment/)。

### 安全帽网络 {#hardhat-network}

一个专门用于开发的本地以太坊网络。 该网络允许你部署合约，运行测试并调试代码。

安全帽网络内置了安全帽，安全帽是专业人员的以太坊开发环境。

- [网站](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### 本地信标链 {#local-beacon-chains}

一些共识客户端具有内置工具，用于启动本地信标链以进行测试。 提供了 Lighthouse、Nimbus 和 Lodestar 的说明：

- [使用 Lodestar 的本地测试网](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [使用 Lightthouse 的本地测试网](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)
- [使用 Nimbus 的本地测试网](https://github.com/status-im/nimbus-eth1/blob/master/fluffy/docs/local_testnet.md)

### 公共以太坊测试链 {#public-beacon-testchains}

以太坊还有两个维护中的公共测试网实现：Sepolia 和 Hoodi。 Sepolia 是推荐的应用程序开发标准测试网，具有封闭的验证器集以实现快速同步。 Hoodi 是一个用于验证和质押的测试网，它使用开放的验证器集，并允许任何人进行验证。

- [Hoodi 质押启动板](https://hoodi.launchpad.ethereum.org/en/)
- [Sepolia 网站](https://sepolia.dev/)
- [Hoodi 网站](https://hoodi.ethpandaops.io/)

### Kurtosis 以太坊包 {#kurtosis}

Kurtosis 是一个用于多容器测试环境的构建系统，让开发者能够在本地构建区块链网络的可复现实例。

以太坊 Kurtosis 包可用于通过 Docker 或 Kubernetes 快速实例化一个可参数化和高度可扩展的私有以太坊测试网。 该包支持所有主要的执行层 (EL) 和共识层 (CL) 客户端。 Kurtosis 可从容处理代表性网络的所有本地端口映射和服务连接，以用于与以太坊核心基础设施相关的验证和测试工作流程。

- [以太坊网络包](https://github.com/kurtosis-tech/ethereum-package)
- [网站](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [相关文档](https://docs.kurtosis.com/)

## 延伸阅读 {#further-reading}

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_

## 相关主题 {#related-topics}

- [开发框架](/developers/docs/frameworks/)
- [设置本地开发环境](/developers/local-environment/)
