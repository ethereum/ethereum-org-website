---
title: 分片链
description: 了解分片链——网络的分区可以让以太坊拥有更多的交易能力并使其更容易运行。
lang: zh
template: eth2
sidebar: true
image: ../../../../../assets/eth2/newrings.png
summaryPoints:
  [
    "分片是一个多阶段升级，以提高以太坊的可扩展性和容量。",
    "分片链将网络负荷扩展到64个新链。",
    "通过降低硬件需求使节点运行更加容易。",
    "技术路线图”包括在“第一阶段”和可能的“第二阶段”中的分片链上开展的工作。",
  ]
---

<UpgradeStatus date="~2022">
    分片链应该在2021年的某个时候启动，这取决于在 <a href="/eth2/beacon-chain/">信标链</a> 启动后的工作进度。 这些分片将增强以太坊存储和访问数据的能力，但不会用于执行代码。 这方面的细节仍然有待确定。
</UpgradeStatus>

## 分片是什么 {#what-is-sharding}

分片是水平分割数据库以分散负载的过程——这是计算机科学中的一个常见概念。 在以太坊的情况下，分片将通过创建新的链（称为“shards”）来减少网络拥塞并增加每秒的交易量。

除了可扩展性之外，其他原因也很重要。

## 分片特性 {#features-of-sharding}

### 每个人都可以运行节点 {#everyone-can-run-a-node}

如果您想保持去中心化，那么分片是一种很好的扩展方式，另一种选择是通过增加现有数据库的大小来扩展。 这将使网络验证者更难访问以太坊，因为他们需要强大而昂贵的计算机。 对于分片链，验证者只需要为他们正在验证的分片存储/运行数据，而不需要存储/运行整个网络（就像今天发生的那样）。 这加快了速度，并大大降低了硬件需求。

### 更多的网络参与 {#more-network-participation}

分片将最终让您在个人笔记本电脑或手机上运行以太坊。 因此，更多的人应该能够在分片中参与或运行[客户端](/developers/docs/nodes-and-clients/)。 这将提高安全性，因为网络越分散，攻击面越小。

由于硬件需求较低，分片将使您更容易单独运行 [客户端](/developers/docs/nodes-and-clients/) ，而根本不依赖任何中间服务。 如果您可以，请考虑运行多个客户端。 这可以通过进一步减少故障点来帮助网络健康。 [运行一个 Eth2 客户端](/eth2/get-involved/)

<br />

<InfoBanner isWarning={true}>
  首先，您需要在运行Eth2客户端的同时运行主网客户端。 <a href="https://launchpad.ethereum.org" target="_blank">启动面板</a> 将引导您完成硬件要求和过程。 也可以使用<a href="/developers/docs/apis/backend/#available-libraries">后端API</a>。
</InfoBanner>

## 分片链版本 1：数据可用性 {#data-availability}

当第一个分片链发布时，它们只会向网络提供额外的数据。 他们不会处理交易或智能合约。 但当它们与汇总相结合时，仍然会对每秒交易数提供令人难以置信的改进。

Rollups 是一种现存的“layer 2”技术。 它们允许去中心化应用将交易捆绑或“卷起”到链外的单个交易中，生成加密证明，然后提交到链上。 这减少了交易所需的数据。 将这一点与分片提供的所有额外数据可用性结合起来，您每秒可以得到 100,000TPS。

[关于 rollups 的更多信息](/developers/docs/layer-2-scaling/)

## 分片链版本 2: 代码执行 {#code-execution}

我们的计划一直是为分片添加额外的功能，使其更像今天的[以太坊主网](/glossary/#mainnet)。 这将允许他们存储和执行智能合约并处理账户。 但是，考虑到版本 1 碎片提供的每秒更新的交易，是否仍然需要这样做？ 社区仍在辩论这个问题，似乎有几种选择。

### 是否需要代码执行？ {#do-shards-need-code-execution}

Vitalik Buterin 在接受 Bankless 播客采访时提出了 3 个值得讨论的潜在选项。

<iframe width="100%" height="315" src="https://www.youtube.com/embed/-R0j5AMUSzA?start=5841" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

#### 1. 不需要执行状态 {#state-execution-not-needed}

这将意味着我们没有赋予分片处理智能合约并将其留为数据仓库的能力。

#### 2. 有一些执行分片 {#some-execution-shards}

也许存在一个折衷方案，那就是我们不需要所有的分片（现在计划有 64 个分片）变得更聪明。 我们可以仅将此功能添加到少数中，其余的保持不变。 这可以加快交付速度。

#### 3. 等到我们能够使用零知识证明（ZK） {#wait-for-zk-snarks}

最后，也许我们应该在零知识证明（ZK）得到验证后再讨论这个问题。 这种技术可以帮助将真正的隐私交易带入网络。 很可能他们需要更智能的分片，但他们仍在研究和开发中。

#### 其他资源 {#other-sources}

这里有一些类似的思路：

- [Phase One and Done: Eth2 as a data availability engine](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

这仍然是需要积极讨论的问题。 一旦我们了解更多信息，我们将更新这些页面。

## 升级间的关系 {#relationship-between-upgrades}

Eth2 升级在某种程度上是相互关联的。 所以让我们回顾一下分批链如何与其他升级相联系。

### 分片和信标链 {#shards-and-beacon-chain}

信标链包含所有保持分片安全和同步的逻辑。 信标链将协调网络中的质押者，将他们分配给他们需要处理的分片。 它还将通过接收和存储其他分片可访问的分片事务数据来促进分片之间的通信。 将给分片一个以太坊状态的快照，以保持一切最新。

<ButtonLink to="/eth2/beacon-chain/">信标链</ButtonLink>

### 分片和对接 {#shards-and-docking}

以太坊主网将像今天一样存在，即使是在引入分片之后。 然而在某个时候，主网需要成为一个分片，以便它可以过渡到质押。 主网是否会成为唯一一个能够处理代码执行的“智能”分片还有待观察——但无论如何，必须在分片的第二阶段做出决定。

<ButtonLink to="/eth2/docking/">对接</ButtonLink>

<Divider />

### 了解更多 {#read-more}

<Eth2ShardChainsList />
