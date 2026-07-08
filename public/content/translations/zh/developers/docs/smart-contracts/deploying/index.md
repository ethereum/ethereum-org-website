---
title: "部署智能合约"
description: "了解如何将智能合约部署到以太坊网络，包括先决条件、工具和部署步骤。"
lang: zh
---

你需要部署智能合约，才能使其对以太坊网络的用户可用。

要部署智能合约，你只需发送一笔包含智能合约编译代码的以太坊交易，而无需指定任何接收方。

## 先决条件 {#prerequisites}

在部署智能合约之前，你应该了解[以太坊网络](/developers/docs/networks/)、[交易](/developers/docs/transactions/)以及[智能合约的剖析](/developers/docs/smart-contracts/anatomy/)。

部署合约还需要花费以太币 (ETH)，因为它们存储在区块链上，因此你应该熟悉以太坊上的 [Gas 和费用](/developers/docs/gas/)。

最后，你需要在部署合约之前对其进行编译，因此请确保你已经阅读了有关[编译智能合约](/developers/docs/smart-contracts/compiling/)的内容。

## 如何部署智能合约 {#how-to-deploy-a-smart-contract}

### 你需要什么 {#what-youll-need}

- 合约的字节码 —— 这是通过[编译](/developers/docs/smart-contracts/compiling/)生成的
- 用于支付 Gas 的 ETH —— 你将像其他交易一样设置 gas 上限，因此请注意，合约部署需要的 Gas 远多于简单的 ETH 转账
- 部署脚本或插件
- 访问[以太坊节点](/developers/docs/nodes-and-clients/)的权限，可以通过运行你自己的节点、连接到公共节点，或者使用[节点服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)的 API 密钥来实现

### 部署智能合约的步骤 {#steps-to-deploy}

涉及的具体步骤将取决于所使用的开发框架。例如，你可以查看 [Hardhat 关于部署合约的文档](https://hardhat.org/docs/tutorial/deploying)或 [Foundry 关于部署和验证智能合约的文档](https://book.getfoundry.sh/forge/deploying)。部署后，你的合约将像其他[账户](/developers/docs/accounts/)一样拥有一个以太坊地址，并且可以使用[源代码验证工具](/developers/docs/smart-contracts/verifying/#source-code-verification-tools)进行验证。

## 相关工具 {#related-tools}

**Remix - _Remix IDE 允许为以太坊等区块链开发、部署和管理智能合约_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 开发平台，为开发、测试、监控和运行智能合约提供调试、可观测性和基础设施构建模块_**

- [tenderly.co](https://tenderly.co/)
- [文档](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _用于编译、部署、测试和调试以太坊软件的开发环境_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [关于部署合约的文档](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _使用单个命令轻松将任何合约部署到任何兼容 EVM 的链_**

- [文档](https://portal.thirdweb.com/deploy/)

**Crossmint - _企业级 Web3 开发平台，用于部署智能合约、启用信用卡和跨链支付，并使用 API 创建、分发、销售、存储和编辑 NFT。_**

- [crossmint.com](https://www.crossmint.com)
- [文档](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [博客](https://blog.crossmint.com)

## 相关教程 {#related-tutorials}

- [部署你的第一个智能合约](/developers/tutorials/deploying-your-first-smart-contract/) _—— 介绍如何在以太坊测试网络上部署你的第一个智能合约。_
- [Hello World | 智能合约教程](/developers/tutorials/hello-world-smart-contract/) _—— 一个易于理解的教程，介绍如何在以太坊上创建和部署基础智能合约。_
- [从 Solidity 与其他合约交互](/developers/tutorials/interact-with-other-contracts-from-solidity/) _—— 如何从现有合约部署智能合约并与之交互。_
- [如何缩减合约大小](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _—— 如何减小合约大小以使其保持在限制范围内并节省 Gas_

## 延伸阅读 {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _欧本齐柏林_
- [使用 Hardhat 部署合约](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_知道对你有帮助的社区资源吗？编辑本页面并添加它！_

## 相关主题 {#related-topics}

- [开发框架](/developers/docs/frameworks/)
- [运行以太坊节点](/developers/docs/nodes-and-clients/run-a-node/)
- [节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service)