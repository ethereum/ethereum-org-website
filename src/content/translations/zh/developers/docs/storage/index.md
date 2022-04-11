---
title: 去中心化存储
description: 概述什么是分布式存储和集成到 dapp 中的相关工具。
lang: zh
sidebar: true
---

不同于由一个公司或组织控制的中心服务器，分布式存储系统由分别持有全局数据中部分数据的用户操作者组成 P2P 网络，形成了一个具有弹性的文件储存、共享系统。 这些可以应用于基于区块链的应用程序或任何 P2P 网络中。

以太坊本身可以用作分布式存储系统，所有智能合约的编码储存就是一种分布式存储。 然而，当涉及大量的数据存储时，就不太符合以太坊的最初目标。 这一区块链正在稳步增长，在本报告撰写之时，以太坊区块链约为 500GB - 1TB（[取决于客户端](https://etherscan.io/chartsync/chaindefault)），而网络上的每个节点都需要存储所有这些数据。 如果链上数据量继续扩大（例如 5TB），那么将导致所有节点都无法继续运行。 而且，由于 [ gas](/developers/docs/gas) 费用，将这么多数据部署到主网的费用将非常昂贵。

由于这些制约因素，我们需要使用不同的区块链或方法，以分布式的方式储存大量数据。

在查看去中心化存储选项时，用户必须牢记几件事情。

- 持久性机制/激励结构
- 数据保留执行
- 去中心化
- 共识

## 持久性机制/激励结构 {#persistence-mechanism}

### 基于区块链 {#blockchain-based}

为了使某个数据永久保存，我们需要使用一种持久性机制。 例如，在以太坊中，持久性机制是当运行一个节点时，需要考虑整条链的情况。 新的数据被堆积在区块链末端，并且还在继续增长。

这被称为 **基于区块链** 的持久性。

基于区块链的持久性问题在于，该链可能变得太大以至于无法维护和存储所有数据。

区块链还必须有某种类型的激励结构。 出于基于区块链的持久性原因，需要为矿工支付报酬。 当数据被添加到链中时，会为添加数据的节点付费。

基于区块链持久性的平台：

- 以太坊
- [Arweave](https://www.arweave.org/)

### 基于合约 {#contract-based}

**基于合约的**持久性直观地告诉我们不能永久存储数据，而必须根据合约协议维护数据。 这些是与多个节点达成的协议，这些节点承诺在一段时间内保存一份数据。 每当费用耗尽或数据更新时，就必须向这些节点续费，以保持数据的持续性。

在大多数情况下，不是在链上储存所有数据，而是在链上存储定位数据的哈希值。 这样，整条链不需要扩大规模，就能保存所有数据。

基于合约持久性的平台：

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [0Chain](https://0chain.net/)

### 其他注意事项 {#additional-considertion}

作为一种奖励，IPFS 并没有真正的激励机制来保存数据，但它是社区中一个很好的工具。 如果您想要在 IPFS 上保留数据，您必须联系到固定服务，该服务将为您“固定”数据。 您甚至可以运行自己的节点，并为网络做出贡献！

- [IPFS](https://ipfs.io/)

## 数据留存 {#data-retention}

为了保留数据，系统必须有某种机制，以确保数据得到保留。

### 质疑机制 {#challenge-mechanism}

确保保留数据的一个最常见方法是使用向节点发出的某种类型的密码质询，以确保它们仍然持有数据。 一种简单的方法是查看 Arweave 的访问证明。 他们向节点发出质疑，以查看它们是否在最近的区块和过去的随机区块中都具有数据。 如果节点无法给出答案，则会受到惩罚。

具有质疑机制的去中心化存储类型：

- 0Chain
- Skynet
- Arweave
- Filecoin

### 去中心化 {#decentrality}

没有很好的工具来衡量平台的去中心化程度，但一般来说，您可能想使用那些没有某种形式的 KYC 的工具证明它们实际上是去中心化的。

不使用 KYC 的去中心化工具：

- 0Chain（实现非 KYC 版本）
- Skynet
- Arweave
- Filecoin
- IPFS
- 以太坊

### 共识 {#consensus}

这些工具大多有自己的 [共识机制](/developers/docs/consensus-mechanisms/) 版本，但一般都是基于[**工作量证明（PoW）**](/developers/docs/consensus-mechanisms/pow/) 或者[**权益证明（PoS）**](/developers/docs/consensus-mechanisms/pos/)。

基于 PoW：

- Skynet
- Arweave
- 以太坊

基于 PoS：

- [信标链](/upgrades/beacon-chain/)
- Filecoin
- 0Chain

## 相关工具 {#related-tools}

**IPFS - _星际文件系统 (InterPlanetary File System) 是以太坊的去中心化存储和文件引用系统。_**

- [Ipfs.io](https://ipfs.io/)
- [相关文档](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _安全、私有、与 S3 兼容的去中心化云对象存储，供开发者使用。_**

- [Storj.io](https://storj.io/)
- [相关文档](https://docs.storj.io/)

**Skynet - _Skynet 是一条去中心化 PoW 链，专用于去中心化网络。_**

- [Skynet.net](https://siasky.net/)
- [相关文档](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin - _Filecoin 是由 IPFS 背后的同一团队打造。 它是 IPFS 之上的一个激励层。_**

- [Filecoin.io](https://filecoin.io/)
- [相关文档](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave 是去中心化数据存储平台。_**

- [Arweave.org](https://www.arweave.org/)
- [相关文档](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**0chain - _0Chain 是一个具有区块分片和 blobbers 的基于权益证明的去中心化存储平台。_**

- [0Chain.net](https://0chain.net/)
- [相关文档](https://docs.0chain.net/0chain/)
- [GitHub](https://github.com/0chain/)

**Swarm - _以太坊 web3 堆栈的分布式存储平台和内容分发服务。_**

- [EthSwarm.org](https://www.ethswarm.org/)
- [相关文档](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _基于 IPFS 的去中心化点对点数据库。_**

- [OrbitDB.org](https://orbitdb.org/)
- [相关文档](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _去中心化云项目（数据库、文件存储、计算和 DID）。 独特的链下和链上点对点技术融合。 IPFS 以及多链兼容性。_**

- [Aleph.im](https://aleph.im/)
- [相关文档](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _用户控制的 IPFS 数据库存储，用于数据丰富和吸引人的应用程序。_**

- [Ceramic.network](https://ceramic.network/)
- [相关文档](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

## 延伸阅读 {#further-reading}

- [什么是去中心化存储？](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin)- _CoinMarketCAp_
- [五个关于去中心化存储的常见错误观念](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_还有哪些社区资源对您有所帮助？ 请编辑本页面并添加！_

## 相关主题 {#related-topics}

- [开发框架](/developers/docs/frameworks/)
