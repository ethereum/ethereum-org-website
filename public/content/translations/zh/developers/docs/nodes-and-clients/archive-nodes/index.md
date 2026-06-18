---
title: 以太坊归档节点
description: 归档节点概述
lang: zh
sidebarDepth: 2
---

归档节点是配置为构建所有历史状态归档的 [以太坊](/) 客户端实例。对于某些用例来说，它是一个有用的工具，但运行起来可能比全节点更复杂。

## 先决条件 {#prerequisites}

你应该了解 [以太坊节点](/developers/docs/nodes-and-clients/) 的概念、[其架构](/developers/docs/nodes-and-clients/node-architecture/)、[同步策略](/developers/docs/nodes-and-clients/#sync-modes)，以及 [运行](/developers/docs/nodes-and-clients/run-a-node/) 和 [使用它们](/developers/docs/apis/json-rpc/) 的实践。

## 什么是归档节点 {#what-is-an-archive-node}

为了理解归档节点的重要性，让我们先澄清“状态”的概念。以太坊可以被称为_基于交易的状态机_。它由执行交易的账户和应用组成，这些交易会改变它们的状态。包含每个账户和合约信息的全局数据存储在一个称为状态的字典树（trie）数据库中。这由执行层（EL）客户端处理，包括：

- 账户余额和随机数（nonce）
- 合约代码和存储
- 共识相关数据，例如质押存款合约

为了与网络交互、验证和生成新区块，以太坊客户端必须跟上最新的变化（链的顶端），从而掌握当前状态。配置为全节点的执行层客户端会验证并跟踪网络的最新状态，但只缓存过去几个状态（例如，与最近 128 个区块相关的状态），以便处理链重组并提供对近期数据的快速访问。所有客户端都需要近期状态来验证传入的交易并使用网络。

你可以将状态想象为特定区块的瞬时网络快照，而将归档想象为历史重放。

历史状态可以被安全地修剪，因为它们对于网络运行来说不是必需的，而且客户端保留所有过时数据将是无用的冗余。存在于某个近期区块（例如，链头之前的 128 个区块）之前的状态实际上会被丢弃。全节点只保留历史区块链数据（区块和交易）以及偶尔的历史快照，它们可以根据请求使用这些快照重新生成旧状态。它们通过在 EVM 中重新执行过去的交易来实现这一点，当所需状态距离最近的快照很远时，这可能会消耗大量计算资源。

然而，这意味着在全节点上访问历史状态会消耗大量计算资源。客户端可能需要执行所有过去的交易，并从创世区块开始计算出一个历史状态。归档节点通过不仅存储最新状态，还存储每个区块之后创建的每一个历史状态来解决这个问题。它基本上是以更大的磁盘空间需求为代价做出的权衡。

值得注意的是，网络并不依赖归档节点来保存和提供所有历史数据。如上所述，所有历史中间状态都可以在全节点上推导出来。交易由任何全节点存储（目前小于 400G），并且可以被重放以构建整个归档。

### 用例 {#use-cases}

以太坊的常规使用（如发送交易、部署合约、验证共识等）不需要访问历史状态。用户在与网络进行标准交互时，永远不需要归档节点。

状态归档的主要好处是可以快速访问有关历史状态的查询。例如，归档节点会迅速返回如下结果：

- _在区块 15537393 时，账户 0x1337... 的 ETH 余额是多少？_
- _在区块 1920000 时，合约 0x 中代币 0x 的余额是多少？_

如上所述，全节点需要通过 EVM 执行来生成这些数据，这会占用 CPU 并花费时间。归档节点在磁盘上访问它们并立即提供响应。对于基础设施的某些部分来说，这是一个有用的功能，例如：

- 区块浏览器等服务提供商
- 研究人员
- 安全分析师
- 去中心化应用 (dapp) 开发者
- 审计与合规

有各种免费的 [服务](/developers/docs/nodes-and-clients/nodes-as-a-service/) 也允许访问历史数据。由于运行归档节点的要求更高，这种访问大多受到限制，并且仅适用于偶尔的访问。如果你的项目需要持续访问历史数据，你应该考虑自己运行一个归档节点。

## 实现与使用 {#implementations-and-usage}

在此语境下，归档节点指的是由面向用户的执行层客户端提供的数据，因为它们处理状态数据库并提供 JSON-RPC 端点。配置选项、同步时间和数据库大小可能因客户端而异。有关详细信息，请参阅你的客户端提供的文档。

在启动你自己的归档节点之前，请了解客户端之间的差异，尤其是各种 [硬件要求](/developers/docs/nodes-and-clients/run-a-node/#requirements)。大多数客户端并未针对此功能进行优化，它们的归档需要超过 12TB 的空间。相比之下，像埃里贡（Erigon）这样的实现可以在不到 3TB 的空间内存储相同的数据，这使得它们成为运行归档节点的最有效方式。

## 推荐实践 {#recommended-practices}

除了 [运行节点的一般建议](/developers/docs/nodes-and-clients/run-a-node/) 之外，归档节点对硬件和维护的要求可能更高。考虑到埃里贡的 [关键特性](https://github.com/ledgerwatch/erigon#key-features)，最实用的方法是使用 [埃里贡](/developers/docs/nodes-and-clients/#erigon) 客户端实现。

### 硬件 {#hardware}

务必在客户端文档中验证特定模式的硬件要求。
归档节点最大的要求是磁盘空间。根据客户端的不同，它从 3TB 到 12TB 不等。即使 HDD 可能被认为是处理大量数据的更好解决方案，但同步数据并不断更新链头将需要 SSD 驱动器。[SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) 驱动器已经足够好，但它应该是可靠的质量，至少是 [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences)。磁盘可以安装在台式电脑或具有足够插槽的服务器中。这种专用设备是运行高正常运行时间节点的理想选择。完全可以在笔记本电脑上运行它，但便携性将带来额外的成本。

所有数据都需要放在一个卷中，因此必须将磁盘连接起来，例如使用 [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) 或 LVM。也可以考虑使用 [ZFS](https://en.wikipedia.org/wiki/ZFS)，因为它支持“写时复制 (Copy-on-write)”，这可确保数据正确写入磁盘而没有任何底层错误。

为了在防止意外数据库损坏方面获得更高的稳定性和安全性，特别是在专业设置中，如果你的系统支持，请考虑使用 [ECC](https://en.wikipedia.org/wiki/ECC_memory) 内存。通常建议 RAM 的大小与全节点相同，但更多的 RAM 有助于加快同步速度。

在初始同步期间，处于归档模式的客户端将执行自创世以来的每笔交易。执行速度主要受 CPU 限制，因此更快的 CPU 有助于缩短初始同步时间。在普通的消费级计算机上，初始同步可能需要长达一个月的时间。

## 延伸阅读 {#further-reading}

- [以太坊全节点与归档节点对比](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode，2022 年 9 月_
- [构建你自己的以太坊归档节点](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush，2021 年 8 月_
- [如何将埃里贡、埃里贡的 RPC 和 TrueBlocks（抓取和 API）设置为服务](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson，更新于 2022 年 9 月_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [运行节点](/developers/docs/nodes-and-clients/run-a-node/)