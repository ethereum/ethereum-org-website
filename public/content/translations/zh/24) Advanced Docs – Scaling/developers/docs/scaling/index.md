---
title: 扩容
description: 介绍以太坊社区目前正在开发的不同扩容选择。
lang: zh
sidebarDepth: 3
---

## 扩容概述 {#scaling-overview}

随着以太坊使用人数增加，区块链已经达到了一定的容量限制。 这提高了网络使用成本，从而导致需要“扩容解决方案”。 目前正在研究、测试和执行多种解决方案，这些方案采取不同的办法来实现类似的目标。

可扩展性的主要目标是，在不牺牲去中心化或安全性的情况下提高交易速度（更快的最终确定性）和交易吞吐量（每秒更高的交易数量）（详情请参阅[以太坊愿景](/roadmap/vision/)）。 在第一层以太坊区块链上，高需求导致交易速度减慢和[燃料价格](/developers/docs/gas/)难以持续。 提高网络速度和吞吐量是有意义地大规模采用以太坊的基础。

虽然速度和吞吐量很重要，但实现这些目标的扩容解决方案必须保持去中心化和安全性。 降低节点运营商的进入门槛，对于防止向不安全的中心化计算能力发展至关重要。

从概念上说，我们首先将扩容分为链上扩容和链外扩容两类。

## 前提条件 {#prerequisites}

你应对所有基础性课题有很好的了解。 实施扩容解决方案是一项先进的任务，因为该技术没有经过多少实践检验，还在进一步研发中。

## 链上扩容 {#on-chain-scaling}

链上扩容需要更改以太坊协议（一层网络[主网](/glossary/#mainnet)）。 长期以来，区块链分片有望扩展以太坊。 分片就是将区块链拆分成单独的部分（分片），并由部分验证者进行验证。 然而，二层网络卷叠扩容方案已取而代之，成为主要的扩容技术。 更加经济的向以太坊区块添加数据的新方式旨在让卷叠方案对用户经济划算，它的出现无疑为这一形势增添了助力。

### 分片 {#sharding}

分片是拆分数据库的过程。 部分验证者将负责单独的分片，而不是跟踪整个以太坊。 分片包含在以太坊[路线图](/roadmap/)上由来已久，并且曾计划于合并到权益证明之前上线。 然而，[二层网络卷叠](#layer-2-scaling)的快速发展和 [Danksharding](/roadmap/danksharding) 的发明（将卷叠数据的二进制大对象添加以太坊区块中，并且验证者可以非常高效地进行验证），让以太坊社区青睐以卷叠为中心的扩容方案，而不是分片扩容方案。 这也将有助于保持以太坊的共识逻辑更简单。

## 链下扩容 {#off-chain-scaling}

链下解决方案与一层网络主网分开实现，它们无需更改现有以太坊协议。 部分解决方案称为“二层网络”解决方案，它们直接从一层网络以太坊共识中获得安全性，例如[乐观卷叠](/developers/docs/scaling/optimistic-rollups/)、[零知识卷叠](/developers/docs/scaling/zk-rollups/)或[状态通道](/developers/docs/scaling/state-channels/)。 其他解决方案涉及创建独立于主网获取安全性的各种形式的新链，例如[侧链](#sidechains)、[Validium](#validium) 或 [Plasma 链](#plasma)。 这些解决方案与主网进行通信，但为了实现各种不同目标，它们获得安全性的方式也有所不同。

### 二层扩容 {#layer-2-scaling}

此类链下解决方案的安全性来自以太坊主网。

二层网络是一种统称，用来描述那些通过在以太坊主网（一层网络）下处理交易，同时利用主网强大的去中心化安全模型来帮助扩展你的应用程序的解决方案。 当网络繁忙时，交易速度会受到影响，这可能使某些类型的去中心化应用程序的用户体验变差。 而且，随着网络越来越繁忙，由于交易发送者的目标是超出对方的出价，燃料价格也随之上升。 这可能会让以太坊的使用成本非常高。

大多数二层网络解决方案均围绕着一个服务器或服务器群集，其中每一种都可以称为节点、验证者、运营商、排序者、区块生产者或类似术语。 根据实现情况，这些二层网络的节点可由使用它们的个人、企业或实体运行，或者由第三方运营商或一大群个人（与主网相似）运行。 一般而言，交易会提交给二层网络节点，而非直接提交给一层网络（主网）。 对于部分解决方案，二层网络实例会将它们分组,然后锚定到一层网络，之后它们受一层网络保护且不能更改。 对于不同的二层网络技术和实现而言，如何做到这一点，细节方面差异很大。

某个特定的二层网络实例可能是开放的，由许多应用程序共享，也可能由一个项目部署，专供支持该项目的应用程序。

#### 为什么需要第二层？ {#why-is-layer-2-needed}

- 每秒增加交易量会大大提高用户体验，并减少以太坊主网上的网络拥塞情况。
- 卷叠就是将多个交易打包到一个交易中，然后发到以太坊主网上，这为用户减少了燃料费用。以太坊将更具包容性，任何人都可以用得起以太坊。
- 关于可扩容性的任何更新都不应以分散安全性为代价 - 第二层建立在以太坊的基础上。
- 有一些特定应用的第二层网络，在大规模处理资产时有它们自己的效率。

[关于二层网络的更多信息](/layer-2/)。

#### 卷叠 {#rollups}

卷叠在一层网络外执行交易，并在达成共识时，在一层网络公开数据。 由于交易数据包含在一层网络区块中，因此可以通过原生的以太坊安全性来保证卷叠的安全性。

有两种具有不同安全模型的卷叠：

- **乐观卷叠**：假设交易在默认情况下有效，并且在遇到挑战的情况下只通过[**欺诈证明**](/glossary/#fraud-proof)运行计算。 [关于乐观卷叠的更多信息](/developers/docs/scaling/optimistic-rollups/)。
- **零知识卷叠**：在链下运行计算并向链上提交[**有效性证明**](/glossary/#validity-proof)。 [关于零知识卷叠的更多信息](/developers/docs/scaling/zk-rollups/)。

#### 状态通道 {#channels}

状态通道采用多签合约，使参与者能够在链下快速自由地进行交易，然后再与主网落实最终确定性。 这将最大限度地减少网络拥塞、费用和延迟。 现在有两种通道：状态通道和支付通道。

了解更多关于[状态通道](/developers/docs/scaling/state-channels/)的信息。

### 侧链 {#sidechains}

侧链是与主网并行运行且兼容以太坊虚拟机的独立区块链。 它们通过双向桥接与以太坊兼容，按照自行选择的共识规则和区块参数运行。

了解更多有关[侧链](/developers/docs/scaling/sidechains/)的信息。

### 以太坊 Plasma 扩容解决方案 {#plasma}

Plasma 是一条独立的区块链，锚定至以太坊主链，并使用欺诈证明（如[乐观卷叠](/developers/docs/scaling/optimistic-rollups/)）来仲裁争议。

了解更多关于 [Plasma](/developers/docs/scaling/plasma/) 的信息。

### Validium {#validium}

Validium 链使用诸如零知识卷叠之类的有效性证明，但数据未存储在一层网络以太坊主链上。 这会导致每条 Validium 链每秒处理 10000 笔交易，并且可以并行运行多条链。

了解关于 [Validium](/developers/docs/scaling/validium/) 的更多信息。

## 为何需要如此多扩容解决方案？ {#why-do-we-need-these}

- 多重解决方案有助于减少网络任意部分的总体阻塞情况，也可防止单点故障。
- 整体大于各部分的总和。 不同的解决方案可以同时存在，并且可以协同工作，对未来的交易速度和吞吐量产生指数效应。
- 并非所有解决方案都需要直接利用以太坊共识算法，替代办法或许能带来难以获得的好处。
- 一种扩容方案不足以完全满足[以太坊愿景](/roadmap/vision/)。

## 更愿意通过视频学习？ {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_请注意，视频中的解释使用“二层网络”这一术语指代所有链下扩容解决方案，而我们通常所说的“二层网络”是指通过一层网络主网共识获得安全性的链下解决方案。_

<YouTube id="7pWxCklcNsU" />

## 延伸阅读 {#further-reading}

- [以卷叠为中心的以太坊路线图](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [有关以太坊第二层扩容解决方案的最新分析](https://www.l2beat.com/)
- [评估以太坊第二层扩容解决方案：一个比较框架](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [卷叠不完全指南](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [以太坊赋能的零知识卷叠：强者](https://hackmd.io/@canti/rkUT0BD8K)
- [“乐观卷叠”对比“零知识卷叠”](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [零知识区块链的可扩展性](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [为什么卷叠 + 数据分片是高可扩展性的唯一可持续的解决办法](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [什么类型的三层网络有意义？](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [数据可用性或：卷叠如何学会停止担忧并爱上以太坊](https://ethereum2077.substack.com/p/data-availability-in-ethereum-rollups)

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_
