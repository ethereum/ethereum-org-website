---
title: 节点和客户端
description: 以太坊节点和客户端软件的概述，以及如何设置节点和为什么您应该这样做。
lang: zh
sidebar: true
sidebarDepth: 2
---

以太坊要以去中心化的方式工作，它需要一个分布式的节点网络，能够验证区块和交易数据。 您需要一个被称为客户端的应用程序，才能在您的设备上“运行”一个节点。

## 前置要求 {#prerequisites}

在更深入地研究和运行自己的以太坊客户端实例之前，您应该了解去中心化网络的概念。 看看我们的[以太坊介绍](/developers/docs/intro-to-ethereum/)。

## 什么是节点和客户端？ {#what-are-nodes-and-clients}

“节点”是指一种称为客户端的软件。 客户端是一种以太坊的实现，它可以验证每个区块中的所有交易，从而确保网络安全和数据准确。

通过查看此[节点图](https://etherscan.io/nodetracker)，您可以查看以太坊网络的实时视图。

许多[以太坊客户端](/developers/docs/nodes-and-clients/#clients)的实现已经以多种语言存在。 这些客户端实现的共同之处是它们都遵循了正式的规范。 此规范决定了以太坊网络和区块链的功能。

![以太坊1x 客户端](./client-diagram.png) 以太坊客户端功能的简化图表。

## 节点类型 {#node-types}

如果您想运行自己的节点，您应该了解有不同类型的节点以不同的方式使用数据。 事实上，客户端可以运行三种不同类型的节点——轻量、完整和归档。 也有不同同步策略的选项，可加快同步时间。 同步是指它能以多快的速度获取有关以太坊状态的最新信息。

### 完整节点 {#full-node}

- 存储完整的区块链数据。
- 参与区块验证，验证所有区块和状态。
- 所有状态都可以从一个完整的节点推出。
- 提供网络服务，并应要求提供数据。

### 轻节点 {#light-node}

- 存储头链并请求其他所有内容。
- 可以对照区块头中的状态根来验证数据的有效性。
- 对于低容量的设备，如嵌入式设备或移动电话来说是有用的，这些设备无法储存数千兆字节的区块链数据。

### 归档节点 {#archive-node}

- 存储保留在完整节点中的所有内容，并建立历史状态档案。 如果您要查询诸如在块＃4,000,000 处的帐户余额之类的信息，则需要。
- 这些数据以太字节为单位，这使存档节点对普通用户的吸引力降低，但对于诸如区块浏览器、钱包供应商和链分析之类的服务而言却很方便。

以存档以外的任何方式同步客户端将导致修剪的区块链数据。 这意味着，没有所有历史状态的档案，但是整个节点都可以按需构建它们。

## 为什么我要运行一个以太坊节点？ {#why-should-i-run-an-ethereum-node}

运行节点可以让您在支持生态系统的同时，不受信任地私下使用以太坊。

### 对您的好处 {#benefits-to-you}

运行自己的节点使您能够以真正私有、自给自足和不信任的方式使用以太坊。 您无需信任网络，因为您可以自己与客户端验证数据。 “不信任，验证”是流行的区块链口头禅。

- 您的节点根据一致性规则自己验证所有交易和区块。 这意味着您不必依赖网络中的任何其他节点或完全信任它们。
- 您不必将地址和余额泄露到随机节点。 一切都可以由您自己的客户检查。
- 如果您使用自己的节点，则去中心化应用可以更安全和私有。 [Metamask](https://metamask.io)、[MyTherWallet](https://myetherwallet.com) 和其他钱包可以轻松指向您自己的本地节点。

![如何通过您的应用程序和节点访问以太坊](./nodes.png)

### 网络优势 {#network-benefits}

多种节点对以太坊的健康、安全和运行弹性非常重要。

- 他们为依赖它的轻量级客户端提供对区块链数据的访问。 在使用高峰期，需要有足够的完整节点来帮助轻量节点同步。 轻量节点不存储整个区块链，而是通过区块头的状态根来验证数据。 如果有需要，他们可以要求区块提供更多信息。
- 完整的节点会强制执行工作量证明的共识规则，因此它们不会被欺骗来接受不遵循规则的代码块。 这为网络中提供了额外的安全性，因为如果所有节点都是轻型节点（不进行完全验证），则矿工可能会攻击网络，例如，创建具有更高奖励的区块。

如果您运行一个完整的节点，整个以太坊网络将从中受益。

## 运行您自己的节点 {#running-your-own-node}

### 项目 {#projects}

[**选择客户端并遵循他们的说明**](#clients)

**ethnode -** **_运行一个以太坊节点（Geth 或 Parity）用于本地开发。_**

- [GitHub](https://github.com/vrde/ethnode)

** DAppNode-\*\***_在专用服务器上运行 Web3 节点（包括以太坊）的操作系统机器。_\*\*

- [dappnode.io](https://dappnode.io)

### 资源 {#resources}

- [运行以太坊完整节点：完整指南](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _Nov 7, 2019 - Justin Leroux_
- [节点配置备忘单](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _Jan 5, 2019 - Afri Schoeden_
- [如何安装和运行一个 Geth 节点](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _October 4, 2020 - Sahil Sen_
- [如何安装和运行一个 OpenEtherum(fka. Parity) 节点](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _2020 - Sahil Sen_

## 替代方法 {#alternatives}

运行您自己的节点可能很困难，您不必总是运行您自己的实例。 在这种情况下，您可以使用第三方 API 提供商，如 [Infura](https://infura.io)、[Alchemy](https://alchemyapi.io) 或 [QuikNode](https://www.quiknode.io)。 除了以上这些，[ArchiveNode](https://archivenode.io/) 是一个社区资助的节点。ArchiveNode 可以将以太坊上的数据带给无法运行自己的节点的独立开发者。

如果某人在您的社区里运行一个包含公共 API 的以太坊节点， 您可以通过自定义 RPC 将您的 light wallet（如 Metamask）指向社区节点 ，并比随机受托的第三方更加隐私。

另一方面，如果您运行一个客户端，您可以与可能需要它的朋友分享它。

## 客户端 {#clients}

以太坊为不同的客户设计不同的客户端，由不同的团队使用不同的编程语言开发。 这使得该网络更加强大和更加多样化。 理想的目标是在没有任何客户端支配的情况下实现多样性，以减少任何单点故障。

本表概括了不同的客户端。 所有这些都在积极工作，维护并通过了[客户端测试](https://github.com/ethereum/tests)。

| 客户端                                                      | 语言     | 操作系统：            | 网络                                          | 同步策略                | 状态缓冲        |
| ----------------------------------------------------------- | -------- | --------------------- | --------------------------------------------- | ----------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)                          | Go       | Linux, Windows, macOS | Mainnet、Görli、Rinkeby、Ropsten              | 快速，完整              | Archive，Pruned |
| [OpenEtherum](https://github.com/openethereum/openethereum) | Rust     | Linux，Windows，macOS | Mainnet、Kovan、Ropsten 及更多                | Warp，完整              | Archive, Pruned |
| [Nethermind](http://nethermind.io/)                         | C#, .NET | Linux，Windows，macOS | Mainnet、Gounderster、Ropsten、Rinkeby 及更多 | 快速，完整              | Archive, Pruned |
| [Besu](https://pegasys.tech/solutions/hyperledger-besu/)    | Java     | Linux，Windows，macOS | Mainnet、Rinkeby、Ropsten 和 Görli            | 快速，完整              | Archive, Pruned |
| [Trinity](https://trinity.ethereum.org/)                    | Python   | Linux，macOS          | Mainnet、Kovan、Ropsten 及更多                | 完整，Beam，Fast/Header | Archive         |

更多关于支持网络的信息，请在[以太坊网络中查阅](/developers/docs/networks/)。

### 不同实现方式的优势 {#advantages-of-different-implementations}

每个客户端都有独特的用例和优势，所以您应该根据自己的偏好来选择一个。 多样性使得执行工作能够侧重于不同的特征和用户群。 您可能想要根据功能、支持、编程语言或许可证选择一个客户端。

#### Go Ethereum {#geth}

Go Ethereum（简称 Geth）是实现以太坊原始协议之一。 目前，它是使用最为广泛的客户端，拥有最大的用户群，为用户和开发者提供各种工具。 它用 Go 语言编写，完全开放源代码，并由 GNU LGPL v3 授权许可。

#### OpenEtherum {#openethereum}

OpenEtherum 是一个快速、功能丰富、基于 CLI 的以太坊高级客户端。 它的诞生是为了给那些需要快速同步和最大运行时间的快速和可靠的服务提供必要的基础设施。 OpenEtherum 的目标是成为最快、最轻、最安全的以太坊客户端。 它提供了以下简洁的模块化代码：

- 易于自定义。
- 轻度融入服务或产品。
- 最小的内存和存储痕迹。

OpenEthereum 是使用最先进的 Rust 编程语言开发的，并由 GPLv3 授权许可。

#### Nethermind {#nethermind}

Nethermind 是一个用 C# .NET 技术栈创建的以太坊协议，在包括 ARM 在内的所有主要平台上运行。 它表现出了优越的性能，具有：

- 优化虚拟机
- 状态访问
- 网络和丰富的功能，如 Promethe/Graphana 仪表盘、seq 企业日志支持、JSON RPC 跟踪和分析插件。

Nethermind 同样拥有[详细文档](https://docs.nethermind.io)，强大的开发支持，在线社区，并为高级用户提供 7\*24 小时服务。

#### Besu {#besu}

Hyperledger Besu 是一个企业级的以太坊客户端，用于公共和许可网络。 它运行所有的以太坊主网功能，从追踪到 GraphQL，有广泛的监控，并得到 ConsenSys 的支持，无论是在开放的社区渠道还是通过企业的商业 SLA。 它使用 Java 编写，并由 Apache 2.0 授权许可。

### 同步模式 {#sync-modes}

- 完整——下载所有区块（包括区块头、交易和接收的数据），并通过执行每个区块来逐步生成区块链的状态。
- 快速（默认）— 下载所有区块（包括区块头、交易和接收的数据），验证所有区块头，下载区块状态并对区块头进行验证。
- 轻便——下载所有区块头、区块数据并对其进行随机验证。
- 压缩同步——每 5000 个区块，节点将对该区块的状态进行一次关键性的共识快照。 任何节点都可以通过网络获取这些快照，启用快速同步功能。 [有关压缩同步的更多信息](https://openethereum.github.io/wiki/Warp-Sync-Snapshot-Format)
- Beam 同步——一种同步模式，让您更快地进入。 它不需要长时间等候才能同步，而是随着时间的推移填充数据。 [有关 Beam 的更多信息](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)
- 区块头同步——你可以使用一个受信任的检查点，从一个较新的区块头开始同步，然后让后台进程最终填补空白。

您在设置时定义同步类型，如：

**在 [GETH](https://geth.ethereum.org/) 中设置简洁同步**

`geth --syncmode "light"`

**在 Trinity 中设置区块头同步**

`trinity --sync-from-checks eth://block/byhash/0xa65877df954e1ff20473ee8287252eee956c0d395a5791f1103a950a1e21?score=15835,269,727,022,672,760,774`

## 硬件 {#hardware}

硬件要求因客户端不同而已，但通常要求不是那么高，因为节点只需要保持同步。 不要把它与需要更多算力的挖矿混为一谈。 然而，更强大的硬件的确可以提升同步时间和性能。 根据您的需求和目的，以太坊可以在您的计算机、家庭服务器、单板计算机或云端虚拟私人服务器上运行。

运行你自己的节点的一个简单方法是使用即插即用的盒子，如 [DAppNode](https://dappnode.io/)。 一个简单的用户接口，为运行客户端和依赖客户端的应用程序提供了硬件。

### 要求 {#requirements}

在安装任何客户端之前，请确保您的计算机有足够的资源运行它。 最低和建议的要求见下文，然而核心部分在于磁盘空间。 同步以太坊区块链即是进行高强度的输入/输出。 最好有一个固态硬盘 (SSD)。 要在机械硬盘上运行以太坊客户端，你将需要至少 8GB 的内存作为缓存使用。

#### 最低要求 {#recommended-specifications}

- 2 核以上 CPU
- 如果是固态硬盘，则内存需 4GB 以上。如果是机械硬盘，则内存需 8GB 以上。
- 8MBit/s 带宽

#### 推荐的规格要求 {#recommended-specifications}

- 具有 4 核以上快速 CPU
- 16GB 以上 RAM
- 快速固态硬盘，拥有至少 500 GB 可用空间
- 25MBit/s 以上带宽

根据你要使用的软件和同步模式，需要数百 GB 的磁盘空间。 大致规格如下：

| 客户端      | 磁盘大小（快速同步） | 磁盘大小（完整存档） |
| ----------- | -------------------- | -------------------- |
| Geth        | 400GB 以上           | 4.7TB 以上           |
| OpenEtherum | 280GB 以上           | 4.6TB 以上           |
| Nethermind  | 200GB 以上           | 3TB 以上             |
| Besu        | 750GB 以上           | 4TB 以上             |

![图表表明，完全同步所需的 GB 数正呈上升趋势](./full-sync.png)

![图表表明，存档同步所需的GB数正呈上升趋势。](./archive-sync.png)

这些图表显示储存要求总是如何改变的。 关于 Geth 和 Parity 的最新数据，请参阅[完整同步数据](https://etherscan.io/chartsync/chaindefault)和[归档同步数据](https://etherscan.io/chartsync/chainarchive)。

### 单板计算机上的以太坊 {#ethereum-on-a-single-board-computer}

运行以太坊节点的最方便和最便宜的方法是使用 Raspberry Pi 这样的 ARM 架构的单板计算机。 [Ethereum on ARM](https://twitter.com/EthereumOnARM)提供 Geth、Parity、Nethermind 和 Besu 客户端的图像。 这是一个关于如何构建和设置 ARM 客户端[的简单教程](/developers/tutorials/run-node-raspberry-pi/)。

像这样的小型、实惠和高效的设备是在家里运行节点的理想选择。

## 以太坊 2.0 客户端 {#eth2-clients}

有新客户端支持[以太坊 2.0 升级](/eth2/beacon-chain/)。 他们将运行信标链，并支持新的[权益证明](/developers/docs/consensus-mechanisms/pos/)共识机制。

[查看以太坊 2.0 客户端](/eth2/get-involved/#clients)。

## 延伸阅读 {#further-reading}

互联网上有很多关于以太坊客户端的说明和信息，这里有几个可能会有帮助。

- [以太坊 101 - 第二部分 - 了解节点](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _- Wil Barnes，2019 年 2 月 13 日_
- [运气以太坊全节点：勉励者指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _- Justin Leroux，2019 年 11 月 7 日_
- [运行一个以太坊节点](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _- ETHHub，经常更新_
- [分析成为以太坊完全验证节点的硬件要求](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _- Albert Palau，2018 年 9 月 24 日_
- [在以太坊主网上运行 Hyperledger Besu 节点：优点、要求和设置](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _- Felipe Faraggi，2020 年 5 月 7 日_

## 相关主题 {#related-topics}

- [区块](/developers/docs/blocks/)
- [网络](/developers/docs/networks/)

## 相关教程 {#related-tutorials}

- [用 Geth 运行一个节点](/developers/tutorials/run-light-node-geth/) _- 如何下载、安装和运行 Geth。 涵盖了同步模式、Javascript 控制台等内容。_
- [将您的 Raspberry Pi 4 变成一个以太坊 1.0 或以太坊 2.0 节点 - 安装指南](/developers/tutorials/run-node-raspberry-pi/) _- 闪存您的 Raspberry Pi 4，插入以太网电缆，连接固态磁盘并给设备供电，将 Raspberry Pi 4 变成一个完整的以太坊 1.0 或以太坊 2.0 节点（信标链/验证者）。_
