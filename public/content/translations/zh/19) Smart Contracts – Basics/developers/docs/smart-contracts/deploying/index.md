---
title: 部署智能合约
description:
lang: zh
---

需要部署智能合约才能提供给以太坊网络的用户使用。

要部署一个智能合约，只需发送一个包含编译后的智能合约代码的以太坊交易，而不需要指定任何收件人。

## 前置要求 {#prerequisites}

在部署智能合约之前，你需要理解[以太坊网络](/developers/docs/networks/), [交易](/developers/docs/transactions/)和[详解智能合约](/developers/docs/smart-contracts/anatomy/)。

部署一个合约也需要耗费以太币 (ETH)，因为他们被存储在区块链上，所以你应该熟悉以太坊的[燃料和费用](/developers/docs/gas/)。

最后，你需要在部署之前编译你的合约，所以请确保你已经阅读了[编译智能合约](/developers/docs/smart-contracts/compiling/)。

## 如何部署智能合约 {#how-to-deploy-a-smart-contract}

### 你所需要的 {#what-youll-need}

- 合约的字节码 – 可通过[编译](/developers/docs/smart-contracts/compiling/)生成
- 用作燃料的以太币 – 像其他交易一样，你需要设定燃料限制，这样就知道部署合约比简单的以太币交易需要更多的燃料。
- 一个部署脚本或插件。
- 通过以下方式之一可以访问[以太坊节点](/developers/docs/nodes-and-clients/)：运行自己的节点、连接到公共节点或使用[节点服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)的应用程序接口密钥。

### 部署智能合约的步骤 {#steps-to-deploy}

具体步骤将取决于使用的开发框架。 例如，你可以查看[安全帽提供的合约部署文档](https://hardhat.org/guides/deploying.html)或 [Foundry 提供 的智能合约部署与验证文档](https://book.getfoundry.sh/forge/deploying)。 如同其他[帐户](/developers/docs/accounts/)一样，部署后，你的合约将有一个以太坊地址，并且可以使用[源代码验证工具](/developers/docs/smart-contracts/verifying/#source-code-verification-tools)来验证。

## 相关工具 {#related-tools}

**Remix - _Remix 集成开发环境可以开发、部署和管理类似区块链的以太坊智能合约。_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 开发平台，提供调试、可观测性和基础设施构建基块，用于开发、测试、监测和操作智能合约_**

- [tenderly.co](https://tenderly.co/)
- [相关文档](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**安全帽 - _用于编译、部署、测试和调试你的以太坊软件的开发环境_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [关于部署合约的文档](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _使用一条命令轻松地将任何合约部署到任何与以太坊虚拟机兼容的区块链_**

- [相关文档](https://portal.thirdweb.com/deploy/)

**Crossmint - _企业级 Web3 开发平台，可用于部署智能合约，启用信用卡和跨链支付，使用应用程序接口创建、分发、销售、储存和编辑非同质化代币。_**

- [crossmint.com](https://www.crossmint.com)
- [相关文档](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [博客](https://blog.crossmint.com)

## 相关教程 {#related-tutorials}

- [部署你的第一个智能合约](/developers/tutorials/deploying-your-first-smart-contract/) _ – 介绍如何在以太坊测试网络上部署你的第一个智能合约。_
- [Hello World | 智能合约教程](/developers/tutorials/hello-world-smart-contract/) _ – 一门便于学习的教程，介绍如何在以太坊上创建和部署基本智能合约。_
- [在 Solidity 中与其它合约交互](/developers/tutorials/interact-with-other-contracts-from-solidity/) _——如何从现有合约中部署智能合约并与之交互。_
- [如何减少合约的大小](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- 如何减少合约的大小使其保持在限制之下并节省燃料_

## 延伸阅读 {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [使用安全帽部署合约](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_

## 相关主题 {#related-topics}

- [开发框架](/developers/docs/frameworks/)
- [运行以太坊节点](/developers/docs/nodes-and-clients/run-a-node/)
- [节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service)
