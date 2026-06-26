---
title: "开发网络"
description: "开发网络以及可用于帮助构建以太坊应用的工具概述。"
lang: zh
---

在构建包含智能合约的[以太坊](/)应用时，你会希望在将其部署之前，先在本地网络上运行它以查看其工作情况。

就像在进行 Web 开发时可能会在计算机上运行本地服务器一样，你可以使用开发网络创建一个本地区块链实例来测试你的去中心化应用 (dapp)。这些以太坊开发网络提供的功能允许比公共测试网更快的迭代速度（例如，你不需要处理从测试网水龙头获取 ETH 的问题）。

## 前提条件 {#prerequisites}

在深入了解开发网络之前，你应该了解[以太坊技术栈的基础知识](/developers/docs/ethereum-stack/)和[以太坊网络](/developers/docs/networks/)。

## 什么是开发网络？ {#what-is-a-development-network}

开发网络本质上是专门为本地开发设计的以太坊客户端（以太坊的实现）。

**为什么不直接在本地运行一个标准的以太坊节点？**

你_可以_[运行一个节点](/developers/docs/nodes-and-clients/#running-your-own-node)，但由于开发网络是专门为开发而构建的，它们通常包含一些便捷的功能，例如：

- 确定性地为本地区块链填充数据（例如，具有 ETH 余额的帐户）
- 在收到每笔交易时立即按顺序生成区块，没有任何延迟
- 增强的调试和日志记录功能

## 可用工具 {#available-projects}

**注意**：大多数[开发框架](/developers/docs/frameworks/)都包含一个内置的开发网络。我们建议从一个框架开始来[设置你的本地开发环境](/developers/local-environment/)。

### Hardhat 网络 {#hardhat-network}

一个专为开发设计的本地以太坊网络。它允许你部署合约、运行测试并调试代码。

Hardhat 网络内置于 Hardhat 中，Hardhat 是一个面向专业人士的以太坊开发环境。

- [网站](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### 本地信标链 {#local-beacon-chains}

一些共识客户端内置了用于启动本地信标链以进行测试的工具。这里提供了莱特豪斯 (Lighthouse)、尼姆巴斯 (Nimbus) 和洛德斯塔 (Lodestar) 的说明：

- [使用洛德斯塔 (Lodestar) 的本地测试网](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [使用莱特豪斯 (Lighthouse) 的本地测试网](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### 公共以太坊测试链 {#public-beacon-testchains}

还有两个维护中的公共以太坊测试实现：Sepolia 和 Hoodi。推荐使用具有长期支持的测试网 Hoodi，任何人都可以自由地在上面进行验证。Sepolia 使用许可型验证者集，这意味着该测试网不向新验证者开放通用访问权限。

- [Hoodi 质押启动板](https://hoodi.launchpad.ethereum.org/)

### Kurtosis 以太坊包 {#kurtosis}

Kurtosis 是一个用于多容器测试环境的构建系统，它使开发者能够在本地启动可重现的区块链网络实例。

以太坊 Kurtosis 包可用于在 Docker 或 Kubernetes 上快速实例化一个可参数化、高度可扩展且私有的以太坊测试网。该包支持所有主要的执行层 (EL) 和共识层 (CL) 客户端。Kurtosis 能够优雅地处理代表性网络的所有本地端口映射和服务连接，以便用于与以太坊核心基础设施相关的验证和测试工作流。

- [以太坊网络包](https://github.com/kurtosis-tech/ethereum-package)
- [网站](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [文档](https://docs.kurtosis.com/)

## 延伸阅读 {#further-reading}

_知道有帮助过你的社区资源吗？编辑本页面并添加它！_

## 相关主题 {#related-topics}

- [开发框架](/developers/docs/frameworks/)
- [设置本地开发环境](/developers/local-environment/)

## 教程：以太坊上的开发网络与测试环境 {#tutorials}

- [使用多客户端本地以太坊测试网开发和测试去中心化应用 (dapp)](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– 如何使用 Kurtosis 启动本地多客户端以太坊测试网以进行 dapp 开发和测试。_