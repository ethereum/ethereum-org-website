---
title: 扩容
description: 介绍以太坊社区目前正在开发的不同扩容选择。
lang: zh
sidebar: true
---

## 扩容概述 {#scaling-overview}

随着以太坊使用人数增加，区块链已经达到了一定的容量限制。 这提高了网络使用成本，从而导致需要"扩容解决方案"。 目前正在研究、测试和执行多种解决方案，这些方案采取不同的办法来实现类似的目标。

扩容的主要目标是提升交易速度（更快确定交易）和交易吞吐量（提高每秒交易量），而不影响去中心化或安全性（详情请见 [Eth2 愿景](/upgrades/vision/)）。 在第一层以太坊区块链上，高需求导致交易速度减慢和 gas 价格不可行。 提高网络速度和吞吐量是有意义地大规模采用以太坊的基础。

虽然速度和吞吐量很重要，但实现这些目标的扩容解决方案必须保持去中心化和安全性。 降低节点运营商的进入门槛，对于防止向不安全的中心化计算能力发展至关重要。

从概念上说，我们首先将扩容分为链上扩容和链外扩容两类。

## 前提条件 {#prerequisites}

你应对所有基础性课题有很好的了解。 实施扩容解决方案是一项先进的任务，因为该技术没有经过多少实践检验，还在进一步研发中。

## 链上扩容 {#on-chain-scaling}

这种扩容方法需要变更以太坊协议（第一层[主网](/glossary/#mainnet)）。 区块分片目前是这种扩容方法的重点。

### 区块分片 {#sharding}

区块分片是一个横向分割数据库以扩展网络承载能力的过程。 在以太坊中，区块分片将通过创建新链（称为“分片”）来减少网络拥塞和增加每秒交易量。 这还可以减轻每位验证者的负担，因为他们不再需要处理整个网络的所有交易。

详细了解[区块分片](/upgrades/shard-chains/)。

## 链下扩容 {#off-chain-scaling}

链下解决方案与第一层主网分开实施，无需更改现有以太坊协议。 部分解决方案称为“第二层”解决方案，直接从第一层以太坊共识中获得安全性，例如 [rollups](/developers/docs/scaling/layer-2-rollups/) 或[状态通道](/developers/docs/scaling/state-channels/)。 其他解决方案包括建立不同形式的新链，这些新链单独从主网获得安全性， 例如[侧链](#sidechains)或 [plasma](#plasma) 链。 这些解决方案与主网进行通信，但为了实现各种不同的目标，它们获得安全性的方式也有所不同。

### 二层扩容 {#layer-2-scaling}

此类链下解决方案的安全性来自以太坊主网。

大多数二层解决方案均围绕着一个服务器或服务器群集，其中每一种都可以称为节点、验证者、操作者、排序器、区块生产者或类似术语。 根据实施情况，这些二层节点可由使用它们的个人、企业或实体运行，或者由第三方运营商或一大群个人（与主网相似）运行。 一般而言，交易会提交给第二层节点，而非直接提交给第一层（主网）。 对于部分解决方案， 第二层实例会将它们分组,，然后锚定到第一层，之后受第一层保护且不能更改。 对于不同的二层技术和实施而言，如何做到这一点的细节差异很大。

某个特定的二层实例可能是开放的，由许多应用程序共享，也可能由一个项目部署，专供支持该项目的应用程序。

#### Rollup {#rollups}

Rollup 在第一层之外执行交易执行任务，并在达成共识时，在第一层公开数据。 由于交易数据包含在第一层区块中，可以通过原生的以太坊安全性来保证 rollup 的安全性。

- [ZK-rollup](/developers/docs/scaling/layer-2-rollups/#zk-rollups)
- [Optimistic rollup](/developers/docs/scaling/layer-2-rollups/#optimistic-rollups)

进一步了解 [rollup](/developers/docs/scaling/layer-2-rollups/)。

#### 状态通道 {#channels}

状态通道采用多签合约，使参与者能够在链下快速自由地进行交易，然后再与主网结算。 这将最大限度地减少网络拥塞、费用和延迟。 现在有两种通道：状态通道和支付通道。

进一步了解[ 状态通道](/developers/docs/scaling/state-channels/)。

### 侧链 {#sidechains}

侧链是与主网并行运行且兼容 EVM 的独立区块链。 它们通过双向桥接与以太坊兼容，按照自行选择的共识规则和区块参数运行。

进一步了解[ 侧链](/developers/docs/scaling/sidechains/)。

### 以太坊 Plasma 扩容解决方案 {#plasma}

Plasma 是一条独立的区块链，锚定至以太坊主链，并使用欺诈证明（如[Optimistic rollup](/developers/docs/scaling/layer-2-rollups/#optimistic-rollups)）来仲裁争议。

进一步了解[以太坊 Plasma 扩容解决方案](/developers/docs/scaling/plasma/)。

## 为何需要如此多扩容解决方案？ {#why-do-we-need-these}

- 多重解决方案有助于减少网络任意部分的总体阻塞情况，也可防止单点故障。
- 整体大于各部分的总和。 不同的解决方案可以同时存在，并且可以协同工作，对未来的交易速度和吞吐量产生指数效应。
- 并非所有解决方案都需要直接利用以太坊共识算法，替代办法或许能带来难以获得的好处。
- 一个扩容解决方案通常不足以实现 [eth2.0 愿景](/upgrades/vision/)。

## 更愿意通过视频学习？ {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_请注意，视频中使用“第二层”这一术语指代所有链下扩容解决方案。 而我们通常所说的“第二层”是指通过第一层主网共识获得安全性的链下解决方案。_

## 延伸阅读 {#further-reading}

- [有关以太坊第二层扩容解决方案的最新分析](https://www.l2beat.com/)
- [评估以太坊第二层扩容解决方案：一个比较框架](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Rollup 不完全指南](https://vitalik.ca/general/2021/01/05/rollup.html)

_还有哪些社区资源帮助过您？ 编辑并添加本页面！_
