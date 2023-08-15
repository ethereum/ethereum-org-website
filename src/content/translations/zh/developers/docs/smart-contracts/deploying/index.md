---
title: 部署智能合约
description:
lang: zh
---

需要部署智能合约才能提供给以太坊网络的用户使用。

要部署一个智能合约，只需发送一个包含编译后的智能合约代码的以太坊交易，而不需要指定任何收件人。

## 前置要求 {#prerequisites}

在部署智能合约之前，您需要理解[以太坊网络](/developers/docs/networks/), [交易](/developers/docs/transactions/)和[详解智能合约](/developers/docs/smart-contracts/anatomy/)。

部署一个合约也需要耗费以太币 (ETH)，因为他们被存储在区块链上，所以您应该熟悉以太坊的[燃料和费用](/developers/docs/gas/)。

最后，您需要在部署之前编译您的合约，所以请确保您已经阅读了[编译智能合约](/developers/docs/smart-contracts/compiling/)。

## 如何部署智能合约 {#how-to-deploy-a-smart-contract}

### 您所需要的 {#what-youll-need}

- 您的合约字节码 – 这是通过[编译](/developers/docs/smart-contracts/compiling/)获得的。
- 用作燃料的以太币 – 像其他交易一样，您需要设定燃料限制，这样就知道部署合约比简单的以太币交易需要更多的燃料。
- 一个部署脚本或插件。
- 访问[以太坊节点](/developers/docs/nodes-and-clients/)，通过运行自己的节点，连接到公共节点或者通过应用程序接口秘钥使用诸如 [Infura](https://www.infura.io/) 和 [Alchemy](https://docs.alchemy.com/) 等[节点服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)来访问。

### 部署智能合约的步骤 {#steps-to-deploy}

所涉及的具体步骤将取决于您使用的工具。 例如，查看[关于部署合约的安全帽文档](https://hardhat.org/guides/deploying.html)或[关于网络和应用程序部署的 Truffle 文档](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment)。 这是两个最受欢迎的智能合约部署工具，它们涉及到编写脚本来处理部署步骤。

一旦部署，您的合约将有一个以太坊地址，就像其它[帐户](/developers/docs/accounts/)一样。

## 相关工具 {#related-tools}

**Remix - _Remix 集成开发环境可以开发、部署和管理类似区块链的以太坊智能合约。_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Web3 开发平台，提供调试、可观测性和基础设施构建基块，用于开发、测试、监测和操作智能合约_**

- [tenderly.co](https://tenderly.co/)
- [相关文档](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**安全帽 - _用于编译、部署、测试和调试您的以太坊软件的开发环境_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [关于部署合约的文档](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**Truffle -** **_开发环境、测试框架、部署通道及其他工具。_**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [关于网络和应用部署的文档](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment)
- [GitHub](https://github.com/trufflesuite/truffle)

## 相关教程 {#related-tutorials}

- [部署您的第一个智能合约](/developers/tutorials/deploying-your-first-smart-contract/) _ - 介绍如何在以太坊测试网络上部署您的第一个智能合约。_
- [Hello World |智能合约教程](/developers/tutorials/hello-world-smart-contract/) _ – 一门便于学习的教程，介绍如何在以太坊上创建和部署基本智能合约。_
- [在 Solidity 中与其他合约交互](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 如何从现有合约中部署智能合约并与之交互。_
- [如何减少合约的大小](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- 如何减少合约的大小使其保持在限制之下并节省燃料_

## 延伸阅读 {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [使用安全帽部署合约](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_还有哪些社区资源对您有所帮助？ 请编辑本页面并添加！_

## 相关主题 {#related-topics}

- [开发框架](/developers/docs/frameworks/)
- [运行以太坊节点](/developers/docs/nodes-and-clients/run-a-node/)
