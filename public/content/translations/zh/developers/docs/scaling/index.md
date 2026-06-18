---
title: "扩容"
description: "介绍以太坊社区目前正在开发的不同扩容方案。"
lang: zh
sidebarDepth: 3
---

## 扩容概述 {#scaling-overview}

随着使用[以太坊](/)的人数不断增加，区块链已经达到了一定的容量限制。这推高了使用网络的成本，从而产生了对“扩容解决方案”的需求。目前有多种解决方案正在研究、测试和实施中，它们采用不同的方法来实现相似的目标。

可扩展性的主要目标是在不牺牲去中心化或安全性的情况下，提高交易速度（更快的最终性）和交易吞吐量（更高的每秒交易量）。在一层网络 (l1) 以太坊区块链上，高需求会导致交易变慢以及难以承受的 [Gas 价格](/developers/docs/gas/)。在速度和吞吐量方面增加网络容量，对于以太坊实现有意义的大规模采用至关重要。

虽然速度和吞吐量很重要，但实现这些目标的扩容解决方案必须保持去中心化的和安全的。保持节点运营商的低准入门槛，对于防止算力走向中心化和不安全至关重要。

从概念上讲，我们首先将扩容分为链上扩容或链下扩容。

## 前提条件 {#prerequisites}

你应该对所有基础主题有很好的理解。实施扩容解决方案属于高级内容，因为该技术尚未经过充分的实战检验，并且仍在不断研究和开发中。

## 链上扩容 {#onchain-scaling}

链上扩容需要对以太坊协议（一层网络 (l1) [Mainnet](/glossary/#mainnet)）进行更改。很长一段时间以来，对区块链进行分片被认为是扩容以太坊的预期方式。这将涉及将区块链分割成离散的部分（分片），由验证者的子集进行验证。然而，通过二层网络 (l2) 汇总进行扩容已经取代其成为主要的扩容技术。这得益于附加到以太坊区块的一种新的、更便宜的数据形式，该数据形式专为降低用户使用汇总的成本而设计。

### 分片 {#sharding}

分片是分割数据库的过程。验证者的子集将负责各个分片，而不是跟踪整个以太坊。分片在很长一段时间内都在以太坊[路线图](/roadmap/)上，并且曾计划在合并到权益证明 (PoS) 之前发布。然而，[二层网络 (l2) 汇总](#layer-2-scaling)的快速发展以及 [丹克分片](/roadmap/danksharding)（将 Rollup 数据 blob 添加到以太坊区块中，验证者可以非常高效地对其进行验证）的发明，使得以太坊社区更倾向于以 Rollup 为中心的扩容，而不是通过分片进行扩容。这也将有助于保持以太坊的共识逻辑更加简单。

## 链下扩容 {#offchain-scaling}

链下解决方案独立于一层网络 (l1) Mainnet 实施——它们不需要对现有的以太坊协议进行任何更改。一些被称为“二层网络 (l2)”的解决方案直接从一层网络 (l1) 以太坊共识中获得安全性，例如[乐观汇总 (optimistic rollups)](/developers/docs/scaling/optimistic-rollups/)、[零知识汇总 (zero-knowledge rollups)](/developers/docs/scaling/zk-rollups/)或[状态通道](/developers/docs/scaling/state-channels/)。其他解决方案涉及以各种形式创建新链，这些新链独立于 Mainnet 获得安全性，例如[侧链](#sidechains)、[Validium](#validium) 或[等离子体链](#plasma)。这些解决方案与 Mainnet 通信，但以不同的方式获得安全性，从而实现各种目标。

### 二层网络 (l2) 扩容 {#layer-2-scaling}

这类链下解决方案从 Mainnet 以太坊获得安全性。

二层网络 (l2) 是指旨在通过在以太坊 Mainnet（一层网络 (l1)）之外处理交易来帮助扩展应用程序，同时利用 Mainnet 强大的去中心化安全模型的解决方案的统称。当网络繁忙时，交易速度会受到影响，导致某些类型的去中心化应用 (dapp) 的用户体验变差。随着网络变得更加繁忙，由于交易发送者试图在出价上超过彼此，Gas 价格也会随之增加。这会使得使用以太坊变得非常昂贵。

大多数二层网络 (l2) 解决方案都围绕一台服务器或服务器集群展开，其中每一个都可以被称为节点、验证者、运营商、定序器、区块生产者或类似术语。根据具体实现，这些二层网络 (l2) 节点可以由使用它们的个人、企业或实体运行，也可以由第三方运营商运行，或者由一大群个人运行（类似于 Mainnet）。一般来说，交易被提交给这些二层网络 (l2) 节点，而不是直接提交给一层网络 (l1) (Mainnet)。对于某些解决方案，二层网络 (l2) 实例随后将它们分批打包，然后锚定到一层网络 (l1)，此后它们由一层网络 (l1) 提供安全保障且无法更改。不同二层网络 (l2) 技术和实现之间，具体如何完成这一过程的细节差异很大。

一个特定的二层网络 (l2) 实例可能是开放的并由许多应用程序共享，也可能由一个项目部署并专门用于支持其自身的应用程序。

#### 为什么需要二层网络 (l2)？ {#why-is-layer-2-needed}

- 每秒交易量的增加极大地改善了用户体验，并减少了 Mainnet 以太坊上的网络拥堵。
- 多笔交易被汇总为一笔交易提交到 Mainnet 以太坊，降低了用户的 Gas 费用，使以太坊更具包容性，让世界各地的人们更容易使用。
- 任何可扩展性的更新都不应以牺牲去中心化或安全性为代价——二层网络 (l2) 是构建在以太坊之上的。
- 存在特定于应用程序的二层网络 (l2) 网络，它们在处理大规模资产时带来了自身的一套效率优势。

[更多关于二层网络 (l2) 的信息](/layer-2/)。

#### 汇总 {#rollups}

汇总在一层网络 (l1) 之外执行交易，然后将数据发布到一层网络 (l1) 以达成共识。由于交易数据包含在一层网络 (l1) 区块中，这使得汇总能够受到原生以太坊安全性的保护。

有两种具有不同安全模型的汇总：

- **乐观汇总 (Optimistic rollups)**：默认假设交易是有效的，并且仅在出现挑战时，通过[**欺诈证明**](/glossary/#fraud-proof)运行计算。[更多关于乐观汇总的信息](/developers/docs/scaling/optimistic-rollups/)。
- **零知识汇总 (Zero-knowledge rollups)**：在链下运行计算，并向链上提交[**有效性证明**](/glossary/#validity-proof)。[更多关于零知识汇总的信息](/developers/docs/scaling/zk-rollups/)。

#### 状态通道 {#channels}

状态通道利用多重签名合约使参与者能够在链下快速自由地进行交易，然后与 Mainnet 结算最终性。这最大限度地减少了网络拥堵、费用和延迟。目前通道的两种类型是状态通道和支付通道。

了解更多关于[状态通道](/developers/docs/scaling/state-channels/)的信息。

### 侧链 {#sidechains}

侧链是一条独立的、兼容 EVM 的区块链，与 Mainnet 平行运行。它们通过双向桥接与以太坊兼容，并在其自身选择的共识规则和区块参数下运行。

了解更多关于[侧链](/developers/docs/scaling/sidechains/)的信息。

### 等离子体 {#plasma}

等离子体链是一条独立的区块链，锚定在以太坊主链上，并使用欺诈证明（类似于[乐观汇总](/developers/docs/scaling/optimistic-rollups/)）来仲裁争议。

了解更多关于[等离子体](/developers/docs/scaling/plasma/)的信息。

### Validium {#validium}

Validium 链像零知识汇总一样使用有效性证明，但数据不存储在主要的一层网络 (l1) 以太坊链上。这可以使每条 Validium 链达到每秒 1 万笔交易的吞吐量，并且可以并行运行多条链。

了解更多关于 [Validium](/developers/docs/scaling/validium/) 的信息。

## 为什么需要这么多扩容解决方案？ {#why-do-we-need-these}

- 多种解决方案有助于减少网络任何部分的整体拥堵，并防止单点故障。
- 整体大于部分之和。不同的解决方案可以共存并和谐运作，从而对未来的交易速度和吞吐量产生指数级的影响。
- 并非所有解决方案都需要直接利用以太坊共识算法，替代方案可以提供原本难以获得的优势。

## 更喜欢视觉学习？ {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_请注意，视频中的解释使用“二层网络 (l2)”一词来指代所有链下扩容解决方案，而我们将“二层网络 (l2)”区分为通过一层网络 (l1) Mainnet 共识获得安全性的链下解决方案。_

<VideoWatch slug="rollups-scaling-strategy" />

## 延伸阅读 {#further-reading}

- [以 Rollup 为中心的以太坊路线图](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [以太坊二层网络 (l2) 扩容解决方案的最新分析](https://www.l2beat.com/)
- [评估以太坊二层网络 (l2) 扩容解决方案：比较框架](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Rollup 不完全指南](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [以太坊驱动的 ZK-Rollup：世界级的颠覆者](https://hackmd.io/@canti/rkUT0BD8K)
- [乐观汇总 (Optimistic Rollups) 与 ZK Rollup 对比](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [为什么 Rollup + 数据分片是实现高可扩展性的唯一可持续解决方案](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [什么样的三层网络 (L3) 是有意义的？](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [数据可用性，或者：Rollup 如何学会停止担忧并爱上以太坊](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [以太坊 Rollup 实用指南](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_知道对你有帮助的社区资源吗？编辑此页面并添加它！_

## 教程：在以太坊上构建可扩展的二层网络 (l2) {#tutorials}

- [尽你所能缓存](/developers/tutorials/all-you-can-cache/) _– 如何构建和使用缓存合约以降低汇总上的调用数据成本。_
- [用于调用数据优化的短 ABI](/developers/tutorials/short-abi/) _– 如何使用更短的 ABI 来降低二层网络 (l2) 交易的调用数据成本。_