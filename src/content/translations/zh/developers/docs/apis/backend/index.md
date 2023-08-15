---
title: 后端应用程序接口库
description: 以太坊客户端应用程序接口的介绍，使您能够从您的应用程序中与区块链进行交互。
lang: zh
---

为了使软件应用程序能够与以太坊区块链进行交互（例如：读取区块链数据或发送交易信息到网络），软件必须连接到以太坊节点。

为此，每种以太坊客户端都实现了 [JSON-RPC](/developers/docs/apis/json-rpc/) 规范，因而应用程序可以依赖一组统一的[方法](/developers/docs/apis/json-rpc/#json-rpc-methods)。

如果您想使用特定的编程语言去连接以太坊的节点，您可自行选择，但是在社区中已有几个方便的库，可以更方便地实现应用程序与以太坊的连接。 通过这些库，开发者可以方便地写下直观的一行函数来初始化（后端的）JSON RPC 请求并用于与以太坊进行交互。

## 前置要求 {#prerequisites}

了解[以太坊堆栈](/developers/docs/ethereum-stack/)和[以太坊客户端](/developers/docs/nodes-and-clients/)可能会对您有所帮助。

## 为什么要使用库？ {#why-use-a-library}

这些库降低了与一个以太坊节点交互的复杂性。 它们还提供实用的函数（例如：将 ETH 转化为 Gwei），而作为开发者，您可以花费更少的时间来处理以太坊客户端的复杂问题，从而将更多的时间集中于处理您的应用程序的独特功能。

## 可用的库 {#available-libraries}

**Alchemy -** **_以太坊开发平台_**

- [alchemy.com](https://www.alchemy.com/)
- [相关文档](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**BlockCypher -** **_以太坊 Web 应用程序接口。_**

- [blockcypher.com](https://www.blockcypher.com/)
- [相关文档](https://www.blockcypher.com/dev/ethereum/)

**Blast by Bware Labs -** **_面向以太坊主网和测试网的去中心化应用程序接口。_**

- [blastapi.io](https://blastapi.io/)
- [相关文档](https://docs.blastapi.io)
- [Discord](https://discord.com/invite/VPkWESgtvV)

**Infura -** **_以太坊应用程序接口即服务。_**

- [infura.io](https://infura.io)
- [相关文档](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare 以太坊网关。**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Coinbase 云节点 -** **_区块链基础设施应用程序接口。_**

- [Coinbase 云节点](https://www.coinbase.com/cloud/products/node)
- [相关文档](https://docs.cloud.coinbase.com/node/reference/welcome-to-node)

**Figment 数据中心 -** **_以太坊主网和测试网的 Web3 应用程序接口服务。_**

- [数据中心](https://www.figment.io/datahub)
- [相关文档](https://docs.figment.io/introduction/what-is-datahub)

**NFTPort -** **_以太坊数据和铸币应用程序接口。_**

- [nftport.xyz](https://www.nftport.xyz/)
- [相关文档](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Nodesmith -** **_可对以太坊主网和测试网进行 JSON-RPC 应用程序接口访问。_**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [相关文档](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_运行自己的支持以太坊和以太坊经典的以太坊应用程序接口服务。_**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_共享及专用的以太坊节点即服务。_**

- [chainstack.com](https://chainstack.com)
- [相关文档](https://docs.chainstack.com)
- [以太坊应用程序接口参考](https://docs.chainstack.com/api/ethereum/ethereum-api-reference)

**QuickNode -** **_区块链基础设施即服务。_**

- [quicknode.com](https://quicknode.com)
- [相关文档](https://www.quicknode.com/docs)
- [Discord](https://discord.gg/NaR7TtpvJq)

**Python 工具 -** **_通过 Python 和以太坊交互的各种库。_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py 聊天](https://gitter.im/ethereum/web3.py)

**web3j -** **_面向以太坊的 Java/Android/Kotlin/Scala 集成库。_**

- [GitHub](https://github.com/web3j/web3j)
- [相关文档](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_由开源软件提供支持的以太坊和以太坊经典应用程序接口即服务。_**

- [rivet.cloud](https://rivet.cloud)
- [相关文档](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_面向区块链的开源 .NET 集成库。_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [相关文档](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**QuikNode -** **_终极区块链开发平台。_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [相关文档](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Watchdata -** **_提供对以太坊区块链简单可靠的应用程序接口访问。_**

- [Watchdata](https://watchdata.io/)
- [相关文档](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Zmok -** **_注重速度的以太坊节点即 JSON-RPC/WebSockets 应用程序接口。_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [相关文档](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

**NOWNodes - _全节点和全区块浏览器。_**

- [NOWNodes.io](https://nownodes.io/)
- [相关文档](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**Moralis -** **_企业级以太坊虚拟机应用程序接口提供商。_**

- [moralis.io](http://moralis.io)
- [相关文档](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://discord.com/invite/KYswaxwEtg)
- [论坛](https://forum.moralis.io/)

\*_GetBlock - 用于 Web3 开发的区块链即服务_

- [GetBlock.io](https://getblock.io/)
- [相关文档](https://getblock.io/docs/)

## 延伸阅读 {#further-reading}

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [开发框架](/developers/docs/frameworks/)

## 相关教程 {#related-tutorials}

- [设置 Web3js 以在 JavaScript 中使用以太坊区块链](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 在项目中设置 web3.js 的说明。_
- [在 JavaScript 中调用智能合约](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– 使用稳定币 DAI 代币，了解如何使用 JavaScript 调用合约函数。_
