---
title: "去中心化存储"
description: "概述什么是去中心化存储以及将其集成到去中心化应用 (dapp) 中的可用工具。"
lang: zh
authors: ["帕特里克·柯林斯"]
---

与由单一公司或组织运营的中心化服务器不同，去中心化存储系统由持有整体数据一部分的用户运营者组成的点对点网络构成，从而创建了一个具有弹性的文件存储共享系统。这些系统可以存在于基于区块链的应用或任何基于点对点的网络中。

以太坊本身可以用作去中心化存储系统，在所有智能合约的代码存储方面，它确实是这样做的。然而，当涉及大量数据时，这并不是以太坊的设计初衷。链在稳步增长，但在撰写本文时，以太坊链的大小约为 500GB - 1TB（[取决于客户端](https://etherscan.io/chartsync/chaindefault)），并且网络上的每个节点都需要能够存储所有数据。如果链扩展到大量数据（比如 5TB），所有节点继续运行将变得不可行。此外，由于 [Gas](/developers/docs/gas) 费用，将如此大量的数据部署到主网的成本将极其高昂。

由于这些限制，我们需要一种不同的链或方法来以去中心化的方式存储大量数据。

在考察去中心化存储（dStorage）选项时，用户必须牢记以下几点。

- 持久化机制 / 激励结构
- 数据保留强制执行
- 去中心化程度
- 共识

## 持久化机制 / 激励结构 {#persistence-mechanism}

### 基于区块链 {#blockchain-based}

为了让一段数据永久保存，我们需要使用持久化机制。例如，在以太坊上，持久化机制是在运行节点时需要考虑整条链。新的数据片段被附加到链的末端，并且链不断增长——要求每个节点复制所有嵌入的数据。

这被称为**基于区块链**的持久化。

基于区块链的持久化的问题在于，链可能会变得太大，以至于无法切实地维护和存储所有数据（例如，[许多来源](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/)估计互联网需要超过 40 泽字节（Zettabytes）的存储容量）。

区块链还必须具有某种类型的激励结构。对于基于区块链的持久化，会向验证者支付报酬。当数据被添加到链上时，验证者会因为添加数据而获得报酬。

具有基于区块链持久化的平台：

- 以太坊
- [Arweave](https://www.arweave.org/)

### 基于合约 {#contract-based}

<strong>基于合约</strong>的持久化的直觉是，数据不能被每个节点复制并永久存储，而是必须通过合约协议来维护。这些是与多个节点达成的协议，这些节点承诺在一段时间内保存一段数据。每当协议到期时，必须重新注资或续约以保持数据的持久化。

在大多数情况下，不是将所有数据存储在链上，而是存储数据在链上位置的哈希。这样，整条链就不需要为了保存所有数据而进行扩展。

具有基于合约持久化的平台：

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [蜂群](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### 其他注意事项 {#additional-consideration}

IPFS 是一个用于存储和访问文件、网站、应用和数据的分布式系统。它没有内置的激励方案，但可以与上述任何基于合约的激励解决方案结合使用，以实现更长期的持久化。在 IPFS 上持久化数据的另一种方法是使用固定（pinning）服务，该服务将为您“固定”数据。您甚至可以运行自己的 IPFS 节点并为网络做出贡献，以免费持久化您和/或其他人的数据！

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS 固定服务)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin 固定服务)_
- [Infura](https://infura.io/product/ipfs) _(IPFS 固定服务)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS 固定浏览器)_
- [4EVERLAND](https://www.4everland.org/)_（IPFS 固定服务）_
- [Filebase](https://filebase.com) _(IPFS 固定服务)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoin 固定服务)_

蜂群（SWARM）是一种去中心化的数据存储和分发技术，具有存储激励系统和存储租金价格预言机。

## 数据保留 {#data-retention}

为了保留数据，系统必须具有某种机制来确保数据被保留。

### 挑战机制 {#challenge-mechanism}

确保数据被保留的最流行方法之一是使用某种类型的密码学挑战，该挑战向节点发出以确保它们仍然拥有数据。一个简单的例子是 Arweave 的访问证明（proof-of-access）。他们向节点发出挑战，以查看它们是否在最近的区块和过去的一个随机区块中都拥有该数据。如果节点无法给出答案，它们将受到惩罚。

具有挑战机制的去中心化存储（dStorage）类型：

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### 去中心化程度 {#decentrality}

目前还没有很好的工具来衡量平台的去中心化程度，但通常来说，你会希望使用没有某种形式的 KYC 的工具，以此作为它们不是中心化的证据。

没有 KYC 的去中心化工具：

- Skynet
- Arweave
- Filecoin
- IPFS
- 以太坊
- Crust Network
- 4EVERLAND

### 共识 {#consensus}

大多数这些工具都有自己版本的[共识机制](/developers/docs/consensus-mechanisms/)，但通常它们基于[**工作量证明 (PoW)**](/developers/docs/consensus-mechanisms/pow/)或[**权益证明 (PoS)**](/developers/docs/consensus-mechanisms/pos/)。

基于工作量证明：

- Skynet
- Arweave

基于权益证明：

- 以太坊
- Filecoin
- Züs
- Crust Network

## 相关工具 {#related-tools}

**IPFS - _星际文件系统（InterPlanetary File System）是以太坊的去中心化存储和文件引用系统。_**

- [Ipfs.io](https://ipfs.io/)
- [文档](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _为开发者提供的安全、私密且兼容 S3 的去中心化云对象存储。_**

- [Storj.io](https://storj.io/)
- [文档](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _利用密码学创建一个无须信任的云存储市场，允许买卖双方直接交易。_**

- [Skynet.net](https://sia.tech/)
- [文档](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin 由 IPFS 背后的同一团队创建。它是建立在 IPFS 理念之上的激励层。_**

- [Filecoin.io](https://filecoin.io/)
- [文档](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave 是一个用于存储数据的去中心化存储（dStorage）平台。_**

- [Arweave.org](https://www.arweave.org/)
- [文档](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs 是一个具有分片和 blobber 的权益证明去中心化存储（dStorage）平台。_**

- [zus.network](https://zus.network/)
- [文档](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust 是建立在 IPFS 之上的去中心化存储（dStorage）平台。_**

- [Crust.network](https://crust.network)
- [文档](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**蜂群 - _为以太坊 Web3 技术栈提供的分布式存储平台和内容分发服务。_**

- [EthSwarm.org](https://www.ethswarm.org/)
- [文档](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _建立在 IPFS 之上的去中心化点对点数据库。_**

- [OrbitDB.org](https://orbitdb.org/)
- [文档](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _去中心化云项目（数据库、文件存储、计算和去中心化身份 (DID)）。链下和链上点对点技术的独特融合。兼容 IPFS 和多链。_**

- [Aleph.im](https://aleph.cloud/)
- [文档](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _用户控制的 IPFS 数据库存储，适用于数据丰富且引人入胜的应用。_**

- [Ceramic.network](https://ceramic.network/)
- [文档](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _兼容 S3 的去中心化存储和异地冗余的 IPFS 固定服务。通过 Filebase 上传到 IPFS 的所有文件都会自动固定到 Filebase 基础设施，并在全球范围内进行 3 次复制。_**

- [Filebase.com](https://filebase.com/)
- [文档](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _一个集成了存储、计算和网络核心功能的 Web 3.0 云计算平台，兼容 S3，并在 IPFS 和 Arweave 等去中心化存储网络上提供同步数据存储。_**

- [4everland.org](https://www.4everland.org/)
- [文档](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _一个提供一键式 IPFS 节点的区块链即服务（BaaS）平台_**

- [Kaleido](https://kaleido.io/)
- [文档](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron 是一个平台即服务（PaaS），专为希望在去中心化基础设施上以最佳性能启动其应用的去中心化应用（dapp）而设计。它开箱即用地提供计算、去中心化存储、CDN 和网络托管。_**

- [spheron.network](https://spheron.network/)
- [文档](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 - _去中心化网页的解析器，类似于 eth.limo，支持所有类型，不限于 ENS 和 IPFS。_**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass - _由 IPFS + ENS 支持的去中心化网站的搜索引擎。_**

- [web3compass.net](https://www.web3compass.net/)
- [文档](https://www.web3compass.net/statistics)

## 延伸阅读 {#further-reading}

- [什么是去中心化存储？](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [打破关于去中心化存储的五个常见误区](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_知道对您有帮助的社区资源吗？编辑本页面并添加它！_

## 相关主题 {#related-topics}

- [开发框架](/developers/docs/frameworks/)