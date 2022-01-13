---
title: 分片链
description: 了解链——网络的分区可以让以太坊拥有更多的交易能力并使其更容易运行。
lang: zh
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: 碎片是一个多阶段升级，以提高以太坊的可扩容性和容量。
summaryPoint2: 碎链将网络负荷扩展到 64 个新链。
summaryPoint3: 通过降低硬件需求使节点运行变得更加容易。
summaryPoint4: 此升级计划跟随主网与信标链的合并。
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    链应该在 2022 年的某个时候启动，这取决于<a href="/upgrades/merge/">合并</a>启动后的工作进度。 这些分片将增强以太坊存储和访问数据的能力，但不会用于执行代码。 这方面的细节仍然有待确定。
</UpgradeStatus>

## 是什么区块分片？ {#what-is-sharding}

是水平分割数据库以分散负载的过程——这是计算机科学中的一个常见概念。 在以太坊的情况下，将通过创建新的链（称为“shards”）来减少网络拥塞并增加每秒的交易量。

除了可扩展性之外，其他原因也很重要。

## 分片特性 {#features-of-sharding}

### 每个人都可以运行节点 {#everyone-can-run-a-node}

如果您想保持去中心化，那么是一种很好的扩展方式，另一种选择是通过增加现有数据库的大小来扩展。 这将使网络验证者更难访问以太坊，因为他们需要强大而昂贵的计算机。 对于链，验证者只需要为他们正在验证的存储/运行数据，而不需要存储/运行整个网络（就像今天发生的那样）。 这加快了速度，并大大降低了硬件需求。

### 更多的网络参与 {#more-network-participation}

将最终让您在个人笔记本电脑或手机上运行以太坊。 因此，更多的人应该能够在中参与或运行[客户端](/developers/docs/nodes-and-clients/)。 这将提高安全性，因为网络越分散，攻击面越小。

由于硬件需求较低，区块分片将使您更容易单独运行 [客户端](/developers/docs/nodes-and-clients/) ，而根本不依赖任何中间服务。 如果您可以，请考虑运行多个客户端。 这可以通过进一步减少故障点来帮助网络健康。 [运行一个 Eth2 客户端](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  首先，您需要在运行Eth2客户端的同时运行主网客户端。 <a href="https://launchpad.ethereum.org" target="_blank">启动面板</a> 将引导您完成硬件要求和过程。 也可以使用<a href="/developers/docs/apis/backend/#available-libraries">后端 API</a>。
</InfoBanner>

## 分片链版本 1：数据可用性 {#data-availability}

当第一个分片链发布时，它们只会向网络提供额外的数据。 他们不会处理交易或智能合约。 但当它们与汇总相结合时，仍然会对每秒交易数提供令人难以置信的改进。

Rollups 是一种现存的“layer 2”技术。 它们允许去中心化应用将交易捆绑或“卷起”到链外的单个交易中，生成加密证明，然后提交到链上。 这减少了交易所需的数据。 将这一点与分片提供的所有额外数据可用性结合起来，您每秒可以得到 100,000TPS。

<InfoBanner isWarning={false}>
  鉴于第二层扩容解决方案近期的研发进展，促使我们考虑在推出分片链之前进行合并。 这些将是主网向权益证明过渡之后的重点。

[更多关于 rollup 的信息] (/developers/docs/scaling/layer-2-roups/)
</InfoBanner>

## 分片链版本 2: 代码执行 {#code-execution}

我们一直计划为分片添加额外功能，使其更像现在的[以太坊主网](/glossary/#mainnet)。 这将允许他们存储并执行智能合约，同时处理帐户。 但是，考虑到版本 1 分片导致每秒增加的交易量，是否仍然需要这样做？ 社区仍在辩论这个问题，似乎有几种选择。

### 分片是否需要代码执行？ {#do-shards-need-code-execution}

Vitalik Buterin 在接受 Bankless 播客采访时提出了 3 个值得讨论的潜在选项。

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. 不需要执行状态 {#state-execution-not-needed}

这将意味着，我们没有为分片赋予处理智能合约的能力，而是将其作为数据仓库。

#### 2. 有一些执行 {#some-execution-shards}

也许存在一个折衷方案，那就是我们不需要所有分片（现在计划有 64 个）变得更智能。 我们可以仅为少数分片添加此功能，其余保持不变。 这可以加快交付速度。

#### 3. 等到我们能够使用零知识证明（ZK） {#wait-for-zk-snarks}

最后，也许我们应该在 ZK SNARK 得到验证后再讨论这个问题。 这项技术有助于在网络上实现真正的私密交易。 他们很可能需要更智能的分片，但仍在研发中。

#### 其他资源 {#other-sources}

这里有一些类似的思路：

- [Phase One and Done: Eth2 as a data availability engine](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

这仍然是需要积极讨论的问题。 一旦了解更多信息，我们将更新这些页面。

## 升级间的关系 {#relationship-between-upgrades}

Eth2 升级的各部分在一定程度上相互关联。 让我们回顾一下分片链如何与其他升级相联系。

### 分片和信标链 {#shards-and-beacon-chain}

信标链包含所有保持分片安全和同步的逻辑。 信标链将协调网络中的质押者，将他们分配给他们需要处理的。 它还将通过接收和存储其他分片可访问的事务数据来促进分片之间的通信。 这将生成以太坊状态快照，以便随时更新所有内容。

<ButtonLink to="/upgrades/beacon-chain/">
  信标链
</ButtonLink>

### 分片与合并 {#shards-and-docking}

添加额外分片时，以太坊主网已由使用权益证明的信标链提供保护。 这使得一个繁荣的主网可以建立分片链，并由增强可扩容性的第二层解决方案提供支持。

主网是否会成为唯一能够处理代码执行的“智能”分片还有待观察 - 但无论如何，都可以根据需要重新考虑扩展分片的决定。

<div>
  <ButtonLink to="/upgrades/merge/">合并</ButtonLink>
</div>

<Divider />

### 了解更多 {#read-more}

<ShardChainsList />
