---
title: 去中心化存储
description: 概述什么是分布式存储和集成到去中心化应用程序中的相关工具。
lang: zh
---

不同于由一个公司或组织控制的中心服务器，分布式存储系统由分别持有全局数据中部分数据的用户操作者组成 P2P 网络，形成了一个具有弹性的文件储存、共享系统。 这些可以应用于基于区块链的应用程序或任何 P2P 网络中。

以太坊本身可以用作分布式存储系统，所有智能合约的编码储存就是一种分布式存储。 然而，当涉及大量的数据存储时，就不太符合以太坊的最初目标。 这一区块链正在稳步增长，在本报告撰写之时，以太坊区块链约为 500GB - 1TB（[取决于客户端](https://etherscan.io/chartsync/chaindefault)），而网络上的每个节点都需要存储所有这些数据。 如果链上数据量继续扩大（例如 5TB），那么将导致所有节点都无法继续运行。 而且，由于[燃料](/developers/docs/gas)费用，将这么多数据部署到主网的费用将非常昂贵。

由于这些制约因素，我们需要使用不同的区块链或方法，以分布式的方式储存大量数据。

在查看去中心化存储选项时，用户必须牢记几件事情。

- 持久性机制/激励结构
- 数据保留执行
- 去中心化
- 共识

## 持久性机制/激励结构 {#persistence-mechanism}

### 基于区块链 {#blockchain-based}

为了使某个数据永久保存，我们需要使用一种持久性机制。 例如，在以太坊中，持久性机制是当运行一个节点时，需要考虑整条链的情况。 新建的数据持续不断地堆积到链的末端，并且要求每个节点复制所有新加入的数据。

这被称为**基于区块链**的持久性机制。

区块链的持久性存储机制会出现区块链过大，维护和存储所有数据十分困难的问题（比如[许多机构](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/)预测整个区块链网络需要 40ZB 的存储容量）。

区块链还必须有某种类型的激励结构。 为获得基于区块链的持久性，需要向验证者付款。 数据被添加到链上后，向验证者付款以继续添加数据。

基于区块链持久性的平台：

- 以太坊
- [Arweave](https://www.arweave.org/)

### 基于合约 {#contract-based}

我们能直观地感受到，**基于合约**的持久性使得数据不能被每个节点复制并永久存储，而必须根据合约协议进行维护。 这些是与多个节点达成的协议，这些节点承诺在一段时间内保存一份数据。 每当费用耗尽或数据更新时，就必须向这些节点续费，以保持数据的持续性。

在大多数情况下，不是在链上储存所有数据，而是在链上存储定位数据的哈希值。 这样，整条链不需要扩大规模，就能保存所有数据。

基于合约持久性的平台：

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### 其他注意事项 {#additional-consideration}

星际文件系统是一个储存和访问文件、网站、应用程序和数据的分布式系统。 虽然它没有内置激励计划，但可以与上述任何基于合同的激励解决方案一起使用，以获得更长期的持久性。 另一个将数据持久存储在星际文件系统上的办法是与某项固定服务（表示将你的数据固定在某处）一起使用。 你甚至可以运行自己的星际文件系统节点来为该网络做出贡献，从而将你和/或他人的数据免费持久地存储在星际文件系统上。

- [星际文件系统](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/)_（星际文件系统固定服务）_
- [web3.storage](https://web3.storage/)_（星际文件系统/菲乐币固定服务）_
- [Infura](https://infura.io/product/ipfs)_（星际文件系统固定服务）_
- [IPFS Scan](https://ipfs-scan.io) _（星际文件系统固定浏览器）_
- [4EVERLAND](https://www.4everland.org/)_（星际文件系统固定服务）_
- [Filebase](https://filebase.com)_（星际文件系统固定服务）_
- [Spheron Network](https://spheron.network/)_（星际文件系统/菲乐币固定服务）_

SWARM 是一种去中心化的数据存储和分发技术，具有存储激励系统和存储空间租金价格预言机。

## 数据留存 {#data-retention}

为了保留数据，系统必须有某种机制，确保数据得到保留。

### 质疑机制 {#challenge-mechanism}

一种最常见的确保保留数据的方法是使用某种类型的密码质询，这种加密质询向节点发出，确保它们仍然持有数据。 一种简单的方法是查看 Arweave 的访问证明。 他们向节点发出质询，查看它们是否在最近的区块和过去的随机区块中都具有数据。 如果节点无法给出答案，则会受到惩罚。

具有质询机制的去中心化存储类型：

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### 去中心化 {#decentrality}

没有有效的工具来衡量平台的去中心化程度，但一般来说，你可能想使用那些没有某种形式的身份验证的工具来证明平台并未中心化。

不使用身份验证的去中心化工具：

- Skynet
- Arweave
- Filecoin
- 星际文件系统
- 以太坊
- Crust Network
- 4EVERLAND

### 共识 {#consensus}

这些工具大多有自己的[共识机制](/developers/docs/consensus-mechanisms/)版本，但一般都是基于[**工作量证明 (PoW)**](/developers/docs/consensus-mechanisms/pow/) 或[**权益证明 (PoS)**](/developers/docs/consensus-mechanisms/pos/)。

基于工作量证明的工具：

- Skynet
- Arweave

基于权益证明的工具：

- 以太坊
- Filecoin
- Züs
- Crust Network

## 相关工具 {#related-tools}

**IPFS - _即星际文件系统，是以太坊的去中心化存储和文件引用系统。_**

- [Ipfs.io](https://ipfs.io/)
- [相关文档](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _安全、私有、与 S3 兼容的去中心化云对象存储，供开发者使用。_**

- [Storj.io](https://storj.io/)
- [相关文档](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Skynet - _Skynet 是一条去中心化的工作量证明链，专用于去中心化网络。_**

- [Skynet.net](https://siasky.net/)
- [相关文档](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin - _Filecoin 由星际文件系统背后的同一团队打造。 它是星际文件系统概念之上的一个激励层。_**

- [Filecoin.io](https://filecoin.io/)
- [相关文档](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave 是去中心化数据存储平台。_**

- [Arweave.org](https://www.arweave.org/)
- [相关文档](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs 是一个具有分片和 blobber 的权益证明去中心化存储平台。_**

- [zus.network](https://zus.network/)
- [相关文档](https://0chaindocs.gitbook.io/zus-docs)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust 是基于星际文件系统的去中心化存储平台。_**

- [Crust.network](https://crust.network)
- [相关文档](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _以太坊 Web3 堆栈的分布式存储平台和内容分发服务。_**

- [EthSwarm.org](https://www.ethswarm.org/)
- [相关文档](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _基于星际文件系统的去中心化点对点数据库。_**

- [OrbitDB.org](https://orbitdb.org/)
- [相关文档](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _去中心化云项目（数据库、文件存储、计算和去中心化身份）。 独特的链下和链上点对点技术融合。 星际文件系统以及多链兼容性。_**

- [Aleph.im](https://aleph.im/)
- [相关文档](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _用户控制的星际文件系统数据库存储，用于数据丰富和吸引人的应用程序。_**

- [Ceramic.network](https://ceramic.network/)
- [相关文档](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _ S3 兼容的去中心化存储和地理冗余星际文件系统固定服务。 所有通过 Filebase 上传到星际文件系统的文件都会自动被固定到 Filebase 基础设施，在全球复制 3 份。_**

- [Filebase.com](https://filebase.com/)
- [相关文档](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Web 3.0 云计算平台，集存储、计算和网络核心能力于一体，兼容 S3，在星际文件系统和 Arweave 等去中心化存储网络上提供同步数据存储。_**

- [4everland.org](https://www.4everland.org/)
- [相关文档](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _一个具有点击按钮星际文件系统节点的区块链即服务平台_**

- [Kaleido](https://kaleido.io/)
- [相关文档](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron 是一项平台即服务 (PaaS)，专为希望在去中心化基础设施上启动其应用程序并获得最佳性能的去中心化应用程序而设计。 它提供开箱即用的计算、去中心化存储、内容分发网络和虚拟主机。_**

- [spheron.network](https://spheron.network/)
- [相关文档](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## 延伸阅读 {#further-reading}

- [什么是去中心化存储？](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [打破关于去中心化存储的五种谣传](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_

## 相关主题 {#related-topics}

- [开发框架](/developers/docs/frameworks/)
