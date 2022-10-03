---
title: 分片
description: 了解分片 - 分解和分配必需的数据负载，增强以太坊交易能力并使其更易于运行。
lang: zh
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: 分片是一个多阶段升级，以提高以太坊的可扩容性和容量。
summaryPoint2: 分片实现了数据存储要求的安全分配，使卷叠更经济实惠，让节点更易于操作。
summaryPoint3: 它们使第二层解决方案能够提供更低的交易费，同时利用以太坊的安全性。
summaryPoint4: 在以太坊过渡到权益证明后，这种升级日益成为焦点。
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    分片可能在 2023 年某个时间上线。 分片将提升以太坊存储和访问数据的能力，但不会用于执行代码。
</UpgradeStatus>

## 是什么区块分片？ {#what-is-sharding}

是水平分割数据库以分散负载的过程——这是计算机科学中的一个常见概念。 在以太坊背景下，分片将与[二层网络卷叠](/layer-2/)协同工作，拆分在整个网络上进行卷叠所需处理的大量数据的负担。 这将继续减少网络拥塞并增加每秒交易量。

除了可扩展性之外，其他原因也很重要。

## 分片特性 {#features-of-sharding}

### 每个人都可以运行节点 {#everyone-can-run-a-node}

如果您想保持去中心化，那么是一种很好的扩展方式，另一种选择是通过增加现有数据库的大小来扩展。 这将使网络验证者更难访问以太坊，因为他们需要强大而昂贵的计算机。 通过分片，验证者将不再需要自己存储所有这些数据，而是可以使用数据技术来确认数据已由整个网络提供。 通过减少硬件需求，这大大降低了在一层网络存储数据的成本。

### 更多的网络参与 {#more-network-participation}

将最终让您在个人笔记本电脑或手机上运行以太坊。 因此，更多的人应该能够在中参与或运行[客户端](/developers/docs/nodes-and-clients/)。 这将提高安全性，因为网络越分散，攻击面越小。

由于硬件需求较低，区块分片将使您更容易单独运行 [客户端](/developers/docs/nodes-and-clients/) ，而根本不依赖任何中间服务。 如果您可以，请考虑运行多个客户端。 这可以通过进一步减少故障点来帮助网络健康。

<br />

<InfoBanner isWarning>
  你需要同时运行执行客户端和共识客户端。 <a href="https://launchpad.ethereum.org" target="_blank">启动板</a>将引导您完成硬件要求和过程。
</InfoBanner>

## 分片链版本 1：数据可用性 {#data-availability}

<InfoBanner emoji=":construction:" isWarning>
  <strong>注意：</strong>随着更高效扩容路径的开发，分片计划也在不断发展。 “Danksharding”是一种新的分片方法，它不使用分片“链”的概念，而是使用分片“blob”来分割数据，同时使用“数据可用性采样”来确认所有数据是否可用。 这个计划改变解决了原来的问题。<br/><br/>
  <strong>以下详细信息可能与最新的开发计划不符。</strong>在我们更新内容时，请参阅<a href="https://members.delphidigital.io/reports/the-hitchhikers-guide- to-ethereum">以太坊漫游指南</a>，了解太坊计路线图划详解。
</InfoBanner>

当第一个分片链发布时，它们只会向网络提供额外的数据。 他们不会处理交易或智能合约。 但当它们与卷叠相结合时，仍然会对每秒交易数提供令人难以置信的改进。

卷叠是一种现存的“第二层”技术。 它们允许去中心化应用将交易捆绑或“卷起”到链外的单个交易中，生成加密证明，然后提交到链上。 这减少了交易所需的数据。 将这一点与分片提供的所有额外数据可用性结合起来，您每秒可以得到 100,000TPS。

## 分片链版本 2: 代码执行 {#code-execution}

我们一直计划为分片添加额外功能，使其更像现在的[以太坊主网](/glossary/#mainnet)。 这将使他们能够存储和执行代码并处理交易，因为每个分片将包含一套独特的智能合约和账户余额。 跨分片通信将允许在分片之间进行交易。

尽管考虑到版本 1 分片会导致每秒增加交易量，但是这是否仍需要实现？ 社区里仍在辩论这个问题，这似乎有几种选择。

### 分片是否需要代码执行？ {#do-shards-need-code-execution}

Vitalik Buterin 在接受 Bankless 播客采访时提出了 3 个值得讨论的可能选择。

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. 不需要状态执行 {#state-execution-not-needed}

这将意味着，我们不会赋予分片处理智能合约的功能，而是让其成为数据仓库。

#### 2. 对部分分片执行 {#some-execution-shards}

也许有一个折衷方案，我们不需要所有分片都变得更智能。 我们可以仅将此功能添加到少数分片中，其余保持不变。 这可以加快交付速度。

#### 3. 等到我们能够使用简明非交互式零知识论证 {#wait-for-zk-snarks}

最后，也许我们应该在简明非交互式零知识论证得到验证后再讨论这个问题。 这种技术可以帮助将真正的私人交易带入网络。 很可能他们需要更智能的分片，但这种分片仍在研究和开发中。

#### 其他资源 {#other-sources}

以下文章具有一些类似的思路：

- [阶段 1 已完成：Eth2 成为数据可用性引擎](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

这仍然是一个活跃的讨论点。 一旦我们了解到更多信息，就会更新这些页面。

## 升级间的关系 {#relationship-between-upgrades}

以太坊所有升级都是有点关联的。 所以让我们回顾一下分批链如何与其他升级相关联。

### 分片和以太坊区块链 {#shards-and-blockchain}

保持分片安全和同步的逻辑都集成到构建区块链的以太坊客户端中。 网络中质押人将被分配到要处理的分片上。 这些分片将能够获得其他分片的快照，这样它们就可以构建一个以太坊状态的视图，随时更新整个网络。

### 了解更多 {#read-more}

<ShardChainsList />
