---
title: 以太坊归档节点
description: 归档节点概述
lang: zh
sidebarDepth: 2
---

归档节点是以太坊客户端实例，配置用于构建所有历史状态的归档。 它是一种对某些用例有用的工具，但可能比全节点更难运行。

## 前提条件 {#prerequisites}

你应该理解[以太坊节点](/developers/docs/nodes-and-clients/)的概念、[它们的架构](/developers/docs/nodes-and-clients/node-architecture/)、[同步策略](/developers/docs/nodes-and-clients/#sync-modes)，以及它们的[运行](/developers/docs/nodes-and-clients/run-a-node/)和[使用](/developers/docs/apis/json-rpc/)的实践。

## 什么是归档节点

为了理解归档节点的重要性，让我们澄清一下“状态”的概念。 以太坊可以被称为_基于交易的状态机_。 它由执行交易并改变其状态的帐户和应用程序组成。 关于每个帐户和合约的信息等全局数据储存在一个名为“状态”的字典树数据库当中。 这些都是由执行层 (EL) 客户端处理，包括：

- 帐户余额和随机数
- 合约代码和存储
- 与共识相关的数据，例如质押存款合约

为了与网络交互，验证和产生新的区块，以太坊客户端必须跟上最新的变化（链的头部），从而显示最新的状态。 一个配置为全节点的执行层客户端会验证并追踪网络的最新状态，但只缓存过去几个状态，例如与最后 128 个区块相关联的状态，这样它就可以处理链重组并提供对最近数据的快速访问。 最近的状态是所有客户端在验证传入交易和使用网络时需要的状态。

你可以把状态想象成给定区块的瞬时网络快照，而归档是历史回放。

历史状态可被安全修剪，因为它们对网络的运行不是必要条件，而且对于客户端来说，保留所有过时的数据没有意义。 在某个最近区块之前存在的状态（例如在头部之前 128个 区块）实际上会被丢弃。 全节点只保留历史区块链数据（区块和交易）和偶尔的历史快照，它们可以用来根据请求重新生成较旧的状态。 在以太坊虚拟机中重新执行过往交易就可以做到这一点；当所需状态离最近的快照很远时，可能对计算要求很高。

然而，这意味着在全节点上访问历史状态会消耗大量计算资源。 客户端可能需要执行从创世块开始的所有过往交易并计算一个历史状态。 归档节点不仅会储存最近的状态，而且还会储存在创建每个区块以后的每个历史状态，进而解决这个问题。 它基本上是以更大的磁盘空间需求为代价。

需要注意的是，网络不依赖于归档节点来保留和提供所有历史数据。 如上所述，所有历史中间状态都可以在全节点上派生出来。 任何全节点都会存储交易（目前不到 400G），而且可重放交易以构建整个归档。

### 用例

像发送交易、部署合约、验证共识等常规使用以太坊的方式不需要访问历史状态。 用户从不需要一个归档节点来进行标准的网络交互。

状态归档的主要好处是快速访问关于历史状态的查询。 例如，归档节点会立即返回以下类似结果：

- _帐户 0x1337…在区块 15537393 时的以太币余额是多少？_
- _合约 0x 中的代币 0x 在区块 1920000 时的余额是多少？_

如上所述，一个全节点需要通过以太坊虚拟机执行来生成这些数据，这会消耗 CPU 并花费时间。 归档节点在磁盘上访问它们，并立即提供响应。 此功能对于基础设施的某些部分十分有用，例如：

- 服务提供商，如区块浏览器
- 研究人员
- 安全分析师
- 去中心化应用程序开发者
- 审计和合规

还有一些免费[服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)也允许访问历史数据。 由于运行一个归档节点的要求更高，这种访问通常是有限的，只适用于偶尔的访问。 如果你的项目需要不断地访问历史数据，你应该考虑自己运行一个。

## 实现和使用

在这种情况下，归档节点意味着由面向用户的执行层客户端提供数据，因为它们要处理状态数据库并提供 JSON-RPC 端点。 配置选项、同步时间和数据库大小可能因客户端而异。 详情请参考你的客户端提供的文档。

在开始使用你自己的归档节点之前，了解一下客户端之间的差异，特别是各种[硬件要求](/developers/docs/nodes-and-clients/run-a-node/#requirements)。 大多数客户端没有针对这项特性进行优化，它们的归档需要超过 12TB 的空间。 相比之下，像 Erigon 这样的实现可以将相同的数据存储在不到 3TB 的空间内，这使它们成为运行归档节点的最有效方式。

## 推荐的做法

除了[运行节点的一般建议](/developers/docs/nodes-and-clients/run-a-node/)以外，归档节点可能对硬件和维护的要求更高。 考虑到 Erigon 的[关键特性](https://github.com/ledgerwatch/erigon#key-features)，最实用的方法是使用 [Erigon](/developers/docs/nodes-and-clients/#erigon) 客户端实现。

### 硬件

始终确保满足客户端文档中给定模式的硬件要求。 归档节点的最大要求是磁盘空间。 根据不同的客户端，此项要求从 3TB 到 12TB 不等。 虽然人们可能认为机械硬盘是更适合存储大量数据的解决方案，不过，同步数据和持续地更新链头需要使用固态硬盘。 [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) 驱动器足够好，但它应该拥有可靠的质量，至少是 [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences) 类型的。 磁盘可以安装在有足够插槽的台式电脑或服务器中。 这样的专用设备是运行高正常运行时间节点的理想选择。 在笔记本上运行是完全可以实现的，代价是需要牺牲一定的便携性。

所有数据需要存放在一个卷中，因此必须对磁盘进行合并，例如采用 [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) 方案或 [LVM](https://web.mit.edu/rhel-doc/5/RHEL-5-manual/Deployment_Guide-en-US/ch-lvm.html)。 你也可以考虑使用 [ZFS](https://en.wikipedia.org/wiki/ZFS)，因为它支持“写时复制”，从而确保数据正确地写入磁盘，而不会出现任何低级错误。

为了提高稳定性和安全性，防止发生意外的数据库损坏，你可以在系统支持时考虑使用 [ECC 内存](https://en.wikipedia.org/wiki/ECC_memory)，尤其是在专业设置中。 内存大小通常建议与全节点相同，但更大的内存可以帮助加速同步。

在初始同步期间，归档模式下的客户端将执行自创世块以来的每笔交易。 执行速度主要受 CPU 限制，所以更快的 CPU 可以帮助缩短初始同步时间。 在一台普通的消费者计算机上，初始同步所需的时间可能长达一个月。

## 延伸阅读 {#further-reading}

- [以太坊全节点 vs 归档节点](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode，2022 年 9 月_
- [构建你自己的以太坊归档节点](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush，2021 年 8 月_
- [如何设置 Erigon、Erigon 的远程过程调用和 TrueBlocks（抓取和应用程序接口）即服务](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson，2022 年 9 月更新_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [运行节点](/developers/docs/nodes-and-clients/run-a-node/)
