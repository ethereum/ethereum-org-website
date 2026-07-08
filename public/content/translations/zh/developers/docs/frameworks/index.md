---
title: "去中心化应用 (dapp) 开发框架"
description: "探索框架的优势并比较可用选项。"
lang: zh
---

## 框架简介 {#introduction-to-frameworks}

构建一个成熟的去中心化应用 (dapp) 需要不同的技术组件。软件框架包含了许多所需的功能，或者提供简单的插件系统来挑选你想要的工具。

框架提供了许多开箱即用的功能，例如：

- 启动本地区块链实例的功能。
- 编译和测试智能合约的实用工具。
- 客户端开发附加组件，用于在同一个项目/代码库中构建面向用户的应用程序。
- 连接到以太坊网络并部署合约的配置，无论是部署到本地运行的实例，还是以太坊的公共网络之一。
- 去中心化应用分发——与 IPFS 等存储选项的集成。

## 前提条件 {#prerequisites}

在深入了解框架之前，我们建议你首先阅读我们对[去中心化应用 (dapp)](/developers/docs/dapps/)和[以太坊技术栈](/developers/docs/ethereum-stack/)的介绍。

## 可用框架 {#available-frameworks}

**Foundry** - **_Foundry 是一个极速、便携且模块化的以太坊应用程序开发工具包_**

- [安装 Foundry](https://book.getfoundry.sh/)
- [Foundry 手册](https://book.getfoundry.sh/)
- [电报上的 Foundry 社区聊天](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_面向专业人士的以太坊开发环境。_**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_面向 Python 开发者、数据科学家和安全专业人员的智能合约开发工具。_**

- [文档](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_一个在 JVM 上开发区块链应用程序的平台。_**

- [主页](https://www.web3labs.com/web3j-sdk)
- [文档](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_适用于基于 EVM 的区块链的异步、高性能 Kotlin/Java/Android 库。_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [示例](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_只需一条命令即可创建由以太坊驱动的应用程序。附带广泛的 UI 框架和去中心化金融 (DeFi) 模板可供选择。_**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [模板](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Ethers.js + Hardhat + 适用于 Web3 的 React 组件和钩子：开始构建由智能合约驱动的去中心化应用所需的一切。_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Web3 开发平台，使区块链开发者能够构建、测试、调试、监控和操作智能合约，并改善去中心化应用 (dapp) 的用户体验。_**

- [网站](https://tenderly.co/)
- [文档](https://docs.tenderly.co/)

**The Graph -** **_用于高效查询区块链数据的 The Graph。_**

- [网站](https://thegraph.com/)
- [教程](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_以太坊开发平台。_**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_以太坊开发平台。_**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_使用我们强大的 SDK 和 CLI 构建可与你的智能合约交互的 Web3 应用程序。_**

- [文档](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3（以太坊及其他）开发平台。_**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_企业级 Web3 开发平台，允许你在所有主要链、EVM 链（及其他链）上构建 NFT 应用程序。_**

- [网站](https://www.crossmint.com)
- [文档](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_基于 Python 的开发环境和测试框架。_**

- [文档](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie 目前已停止维护**

**欧本齐柏林 SDK -** **_终极智能合约工具包：一套帮助你开发、编译、升级、部署智能合约并与之交互的工具。_**

- [欧本齐柏林 Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [社区论坛](https://forum.openzeppelin.com/c/support/17)
- **欧本齐柏林 SDK 开发已结束**

**Catapulta -** **_多链智能合约部署工具，在区块浏览器中自动进行验证，跟踪已部署的智能合约并共享部署报告，支持 Foundry 和 Hardhat 项目的即插即用。_**

- [GitHub](https://github.com/catapulta-sh)

**GoldRush（由 Covalent 提供支持）-** **_GoldRush 为开发者、分析师和企业提供最全面的区块链数据 API 套件。无论你是构建 DeFi 仪表板、钱包、交易机器人、AI 代理还是合规平台，这些数据 API 都能提供快速、准确且对开发者友好的访问方式，以获取你所需的基本链上数据_**

- [网站](https://goldrush.dev/)
- [文档](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_用于合约测试、模糊测试、部署、漏洞扫描和代码导航的一站式 Python 框架。_**

- [主页](https://getwake.io/)
- [文档](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_开源、模块化且与平台无关的框架，使去中心化应用 (dapp) 开发者能够轻松地将去中心化身份和可验证凭证构建到他们的应用程序中。_**

- [主页](https://veramo.io/)
- [文档](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [Discord](https://discord.com/invite/FRRBdjemHV)
- [NPM 包](https://www.npmjs.com/package/@veramo/core)

## 延伸阅读 {#further-reading}

_知道对你有帮助的社区资源吗？编辑本页面并添加它！_

## 相关主题 {#related-topics}

- [设置本地开发环境](/developers/local-environment/)

## 教程：以太坊上的开发框架 {#tutorials}

- [面向初学者的 Hello World 智能合约 – 全栈](/developers/tutorials/hello-world-smart-contract-fullstack/) _– 使用 Hardhat 构建并部署一个 Hello World 智能合约，然后将其连接到前端。_