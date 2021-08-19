---
title: 部署智能合约
description:
lang: zh
sidebar: true
incomplete: true
---

需要部署智能合约才能提供给以太坊网络的用户使用。

要部署一个智能合约，只需发送一个包含编译后的智能合约代码的以太坊交易，而不需要指定任何收件人。

## 前置要求 {#prerequisites}

在部署智能合约之前，你需要理解[以太坊网络](/developers/docs/networks/), [交易](/developers/docs/transactions/) 和 [详解智能合约](/developers/docs/smart-contracts/anatomy/)。

部署一个合约也需要耗费 ETH，所以你应该熟悉以太坊的 [gas 和费用](/developers/docs/gas/)。

最后，你需要在部署之前编译你的合约，所以请确保你已经阅读了[编译智能合约](/developers/docs/smart-contracts/compiling/)。

## 如何部署一个智能合约

这意味着你要支付交易费，因此请确保你有一些 ETH。

### 你所需要的 {#what-youll-need}

- 你的合约字节码 – 这是通过 [编译](/developers/docs/smart-contracts/compiling/)获得的。
- 用作 gas 的以太币（Ether） – 像其他交易一样，你需要设定 gas 限制，这样就知道部署合约比简单的 ETH 交易需要更多的 gas。
- 一个部署脚本或插件。
- 访问一个[以太坊节点](/developers/docs/nodes-and-clients/)，或者运行自己的节点，连接到公共节点或者通过 API key 使用 Infura 或者 Alchemy 服务

<!-- TODO Elaborate on options: e.g. run a node, use a node as a service etc. -->

<!-- TODO! -->
<!-- ### Steps to deploy a smart contract -->

一旦部署，你的合约将有一个以太坊地址，就像其它 [帐户](/developers/docs/accounts/)一样。

## 相关工具 {#related-tools}

**Remix -** **_Remix IDE 可以开发、部署和管理类似区块链的以太坊智能合约。_**

- [Remix](https://remix.ethereum.org)

**Tenderly -** **_用错误跟踪、警报、性能指标和详细的合约分析来轻松监测您的智能合约的平台。_**

- [tenderly.co](https://tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

## 相关教程 {#related-tutorials}

- [部署你的第一个智能合约](/developers/tutorials/deploying-your-first-smart-contract/) _——介绍如何在以太坊测试网络上部署你的第一个智能合约。_
- [在 Solidity 中与其他合约交互](/developers/tutorials/interact-with-other-contracts-from-solidity/) _——如何从现有合约中部署智能合约并与之交互。_
- [如何减少合约的大小](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _——如何减少合约的大小，使其保持在限制之下并节省 gas_

## 延伸阅读 {#further-reading}

_你知道有什么社区资源帮助过你吗？ 编辑并添加本页面！_

## 相关主题

- [开发框架](/developers/docs/frameworks/)
