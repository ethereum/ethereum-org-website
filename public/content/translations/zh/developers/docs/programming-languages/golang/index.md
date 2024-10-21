---
title: 面向 Go 开发者的以太坊
description: 学习如何使用基于 Go 的项目和工具参与以太坊的开发
lang: zh
incomplete: true
---

<FeaturedText>学习如何使用基于 Go 的项目和工具参与以太坊的开发</FeaturedText>

使用以太坊创建去中心化应用程序（即"dapps"）。 这些去中心化应用程序可被信任，意味着一旦被部署到以太坊上，它们将总是按既定程序运行。 它们是去中心化的，意味着它们运行在一个点对点网络中并且不存在单点故障。 不存在单一实体或者个人可以控制它们，它们也几乎不可能被审查。 它们可以通过控制数字资产来创建新的应用。

## 智能合约和 Solidity 语言入门 {#getting-started-with-smart-contracts-and-solidity}

**迈出集成 Go 与以太坊的第一步**

需要更基础的入门知识？ 请查看 [ethereum.org/learn](/learn/) 或者 [ethereum.org/developers](/developers/)。

- [区块链详解](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [理解智能合约](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [编写你的第一个智能合约](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [学习如何编写和部署 Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [智能合约教程](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 初学者文章和书籍 {#beginner-articles-and-books}

- [开始使用 Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [使用 Golang 连接到以太坊](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [使用 Golang 部署以太坊智能合约](https://www.youtube.com/watch?v=pytGqQmDslE)
- [一步步教你测试和部署以太坊 Go 语言智能合约](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [电子书：使用 Go 开发以太坊](https://goethereumbook.org/) - _使用 Go 开发以太坊应用程序_

## 面向中等程度用户的文章和文档 {#intermediate-articles-and-docs}

- [Go 以太坊相关文档](https://geth.ethereum.org/docs/) - _官方以太坊 Golang 相关文档_
- [Erigon 程序员指南](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _图文指南，包括状态树、多重证明和交易处理_
- [Erigon 和无状态以太坊](https://youtu.be/3-Mn7OckSus?t=394) - _2020 年以太坊社区会议 (EthCC 3)_
- [Erigon：优化以太坊客户端](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 年开发者大会 4_
- [Go 以太坊 GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [在 Go 上使用 Geth 创建去中心化应用程序](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [用 Golang 和 Geth 使用以太坊专用网络](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [使用 Go 对以太坊上的 Solidity 合约进行单元测试](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [使用 Geth 作为库的快速参考](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## 面向高等程度用户的使用模式 {#advanced-use-patterns}

- [使用 GETH 模拟后端搭建](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [基于以太坊和 Quorum 的区块链即服务应用程序](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [以太坊区块链应用程序中的分布式存储星际文件系统和 Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [移动客户端：各种库和 Inproc 以太坊节点](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [原生去中心化应用程序：到以太坊合约的 Go 绑定](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go 项目和工具 {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _以太坊协议的官方 Go 实现_
- [Go Ethereum Code Analysis](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _审查和分析 Go 以太坊源代码_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Go 以太坊的更快衍生品，专注于归档节点_
- [Golem](https://github.com/golemfactory/golem) - _Golem 正在创建一个算力全球市场_
- [Quorum](https://github.com/jpmorganchase/quorum) - _支持数据隐私的许可型以太坊实现_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _以太坊 'Serenity' 2.0 Go 实现_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _去中心化 Twitter：运行在以太坊区块链上的微博客服务_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Golang 实现以及最小可执行 Plasma 规范拓展_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _以太坊开源矿池_
- [Ethereum HD Wallet](https://github.com/miguelmota/go-ethereum-hdwallet) - _使用 Go 的以太坊硬件钱包衍生品_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _支持多种以太坊网络_
- [Geth Light Client](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _轻量级以太坊子协议的 Geth 实现_
- [以太坊 Golang 软件开发工具包](https://github.com/everFinance/goether) - _Golang 中的简单以太坊钱包实现和实用程序_
- [Covalent Golang 软件开发工具包](https://github.com/covalenthq/covalent-api-sdk-go) - _通过 Go 软件开发工具包高效访问多达 200 个区块链的区块链数据_

想要获取更多的资源？ 请查看 [ethereum.org/developers](/developers/)。

## Go 社区贡献者 {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum 频道](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - 以太坊](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth light Client Gitter](https://gitter.im/ethereum/light-client)

## 其他汇总列表 {#other-aggregated-lists}

- [强大的以太坊](https://github.com/btomashvili/awesome-ethereum)
- [Consensys：以太坊开发工具的权威清单](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub 源](https://github.com/ConsenSys/ethereum-developer-tools-list)
