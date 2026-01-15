---
title: 部署智能合约
description: 了解如何将智能合约部署到以太坊网络，包括先决条件、工具，以及部署步骤。
lang: zh
---

你需要部署你的智能合约，以供以太坊网络的用户使用。

要部署智能合约，你只需发送一笔包含已编译智能合约代码的以太坊交易，无需指定任何接收方。

## 前提条件 {#prerequisites}

在部署智能合约之前，你应该了解[以太坊网络](/developers/docs/networks/)、[交易](/developers/docs/transactions/)以及[智能合约剖析](/developers/docs/smart-contracts/anatomy/)。

部署合约也需要花费以太币 (ETH)，因为合约存储在区块链上，所以你应该熟悉以太坊上的[燃料和费用](/developers/docs/gas/)。

最后，在部署合约之前，你需要先编译它，所以请确保你已经阅读过关于[编译智能合约](/developers/docs/smart-contracts/compiling/)的文章。

## 如何部署智能合约 {#how-to-deploy-a-smart-contract}

### 你需要准备什么 {#what-youll-need}

- 你的合约字节码——通过[编译](/developers/docs/smart-contracts/compiling/)生成
- 用作燃料的以太币 – 像其他交易一样，你需要设定燃料限制，这样就知道部署合约比简单的以太币交易需要更多的燃料。
- 一个部署脚本或插件
- 访问[以太坊节点](/developers/docs/nodes-and-clients/)，可以通过运行自己的节点、连接到公共节点，或通过 API 密钥使用[节点服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)。

### 部署智能合约的步骤 {#steps-to-deploy}

具体步骤将取决于使用的开发框架。 例如，你可以查看[安全帽关于部署合约的文档](https://hardhat.org/docs/tutorial/deploying)或 [Foundry 关于部署和验证智能合约的文档](https://book.getfoundry.sh/forge/deploying)。 一旦部署，你的合约将拥有一个以太坊地址，和其他[账户](/developers/docs/accounts/)一样，并且可以使用[源代码验证工具](/developers/docs/smart-contracts/verifying/#source-code-verification-tools)进行验证。

## 相关工具 {#related-tools}

**Remix - _Remix IDE 允许为以太坊等区块链开发、部署和管理智能合约_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 开发平台，为开发、测试、监控和运行智能合约提供调试、可观察性和基础设施构建模块_**

- [tenderly.co](https://tenderly.co/)
- [文档](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _一个用于编译、部署、测试和调试你的以太坊软件的开发环境_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [关于部署你的合约的文档](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _使用一条命令，轻松将任何合约部署到任何兼容 EVM 的链_**

- [相关文档](https://portal.thirdweb.com/deploy/)

**Crossmint - _企业级 web3 开发平台，可用于部署智能合约，支持信用卡和跨链支付，并使用 API 来创建、分发、出售、存储和编辑 NFT。_**

- [crossmint.com](https://www.crossmint.com)
- [文档](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [博客](https://blog.crossmint.com)

## 相关教程 {#related-tutorials}

- [部署你的第一个智能合约](/developers/tutorials/deploying-your-first-smart-contract/)_– 介绍如何在以太坊测试网络上部署你的第一个智能合约。_
- [Hello World | 智能合约教程](/developers/tutorials/hello-world-smart-contract/) _– 一个简单易懂的教程，介绍如何在以太坊上创建和部署一个基本的智能合约。_
- [在 Solidity 中与其他合约交互](/developers/tutorials/interact-with-other-contracts-from-solidity/)_– 如何从现有合约部署智能合约并与之交互。_
- [如何缩减合约大小](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- 如何减小合约大小，使其保持在限制范围内并节省燃料_

## 扩展阅读{#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [使用安全帽部署你的合约](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_你还知道哪些对你有帮助的社区资源？ 请编辑本页面并添加进来！_

## 相关话题 {#related-topics}

- [开发框架](/developers/docs/frameworks/)
- [运行一个以太坊节点](/developers/docs/nodes-and-clients/run-a-node/)
- [节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service)
