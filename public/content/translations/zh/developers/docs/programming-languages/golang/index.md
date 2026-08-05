---
title: "面向 Go 开发者的以太坊"
description: "了解如何使用基于 Go 的项目和工具进行以太坊开发"
lang: zh
incomplete: true
---

<FeaturedText>了解如何使用基于 Go 的项目和工具进行以太坊开发</FeaturedText>

使用以太坊创建去中心化应用 (dapp)。这些 dapp 是值得信赖的，这意味着一旦它们被部署到以太坊，它们将始终按程序运行。它们是去中心化的，这意味着它们在点对点网络上运行，没有单点故障。没有任何单一实体或个人控制它们，并且几乎不可能审查它们。它们可以控制数字资产，从而创建新型应用。

## 智能合约与 Solidity 语言入门 {#getting-started-with-smart-contracts-and-solidity}

**迈出将 Go 与以太坊集成的第一步**

需要先了解更基础的入门知识？请查看 [ethereum.org/learn](/learn/) 或 [ethereum.org/developers](/developers/)。

- [区块链解释](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [了解智能合约](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [编写你的第一个智能合约](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [学习如何编译和部署 Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [合约教程](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## 初学者文章和书籍 {#beginner-articles-and-books}

- [Geth 入门](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [使用 Golang 连接到以太坊](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [使用 Golang 部署以太坊智能合约](https://www.youtube.com/watch?v=pytGqQmDslE)
- [在 Go 中测试和部署以太坊智能合约的分步指南](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [电子书：使用 Go 进行以太坊开发](https://goethereumbook.org/) - _使用 Go 开发以太坊应用_

## 进阶文章和文档 {#intermediate-articles-and-docs}

- [Go以太坊 (Geth) 文档](https://geth.ethereum.org/docs) - _官方以太坊 Golang 的文档_
- [埃里贡 (Erigon) 程序员指南](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _包含状态树、多重证明和交易处理的图解指南_
- [埃里贡 (Erigon) 与无状态以太坊](https://youtu.be/3-Mn7OckSus?t=394) - _2020 年以太坊社区会议 (EthCC 3)_
- [埃里贡 (Erigon)：优化以太坊客户端](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 年 Devcon 4_
- [Go以太坊 (Geth) GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [使用 Geth 在 Go 中创建去中心化应用 (dapp)](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [使用 Golang 和 Geth 在以太坊私有网络上工作](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [使用 Go 在以太坊上对 Solidity 合约进行单元测试](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [将 Geth 作为库使用的快速参考](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## 高级使用模式 {#advanced-use-patterns}

- [GETH 模拟后端](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [使用以太坊和 Quorum 的区块链即服务应用](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [以太坊区块链应用中的分布式存储 IPFS 和蜂群 (Swarm)](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [移动客户端：库和进程内以太坊节点](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [原生 dapp：以太坊合约的 Go 绑定](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go 项目和工具 {#go-projects-and-tools}

- [Geth / Go以太坊](https://github.com/ethereum/go-ethereum) - _以太坊协议的官方 Go 实现_
- [Go以太坊 (Geth) 代码分析](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go以太坊 (Geth) 源代码的审查和分析_
- [埃里贡 (Erigon)](https://github.com/ledgerwatch/erigon) - _Go以太坊 (Geth) 的更快速衍生版本，专注于归档节点_
- [Golem](https://github.com/golemfactory/golem) - _Golem 正在创建一个全球算力市场_
- [Quorum](https://github.com/jpmorganchase/quorum) - _支持数据隐私的以太坊许可型实现_
- [普莱斯姆 (Prysm)](https://github.com/prysmaticlabs/prysm) - _以太坊“宁静 (Serenity)”2.0 的 Go 实现_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _去中心化推特：运行在以太坊区块链上的微博服务_
- [等离子体 (Plasma) MVP Golang](https://github.com/kyokan/plasma) — _最小可行等离子体 (Plasma) 规范的 Golang 实现和扩展_
- [开放以太坊矿池](https://github.com/sammy007/open-ethereum-pool) - _一个开源的以太坊挖矿池_
- [以太坊 HD 钱包](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go 语言中的以太坊 HD 钱包派生_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _支持多种以太坊网络_
- [Geth 轻客户端](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _轻量级以太坊子协议的 Geth 实现_
- [以太坊 Golang SDK](https://github.com/everFinance/goether) - _Golang 中简单的以太坊钱包实现和实用工具_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _通过 Go SDK 高效访问 200 多条区块链的数据_

寻找更多资源？请查看 [ethereum.org/developers](/developers/)

## Go 社区贡献者 {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum 频道](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - 以太坊](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [以太坊 Gitter](https://gitter.im/ethereum/home)
- [Geth 轻客户端 Gitter](https://gitter.im/ethereum/light-client)

## 其他汇总列表 {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [ConsenSys：以太坊开发者工具权威列表](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub 源码](https://github.com/ConsenSys/ethereum-developer-tools-list)