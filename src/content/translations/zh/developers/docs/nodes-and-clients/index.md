---
title: 节点和客户端
description: 以太坊节点和客户端软件的概述，以及如何设置节点和为什么您应该这样做。
lang: zh
sidebar: true
sidebarDepth: 2
---

以太坊是一个由计算机组成的分布式网络，运行可验证区块和交易数据的软件（称为节点）。 您需要一个被称为客户端的应用程序，才能在您的设备上“运行”一个节点。

## 前置要求 {#prerequisites}

在您更深层次介入和运行自己的以太坊客户端前，您应该理解点对点网络和 [EVM 基础](/developers/docs/evm/)概念。 查看我们的[以太坊简介](/developers/docs/intro-to-ethereum/)。

## 什么是节点和客户端？ {#what-are-nodes-and-clients}

“节点”是指一种称为客户端的软件。 客户端是一种以太坊的实现，它可以验证每个区块中的所有交易，从而确保网络安全和数据准确。

通过查看此[节点图](https://etherscan.io/nodetracker)，您可以查看以太坊网络的实时视图。

存在许多用不同编程语言（如 Go、Rust、JavaScrip、Python、C# .NET 和 Java）编写的[以太坊客户端](/developers/docs/nodes-and-clients/#execution-clients)。 这些实现的共同之处是它们都遵循了正式规范（原为[以太坊黄皮书](https://ethereum.github.io/yellowpaper/paper.pdf)）。 此规范决定了以太坊网络和区块链的功能。

![以太坊1x 客户端](../../../../../developers/docs/nodes-and-clients/client-diagram.png) 以太坊客户端功能的简化图表。

## 节点类型 {#node-types}

如果您想 [运行自己的节点](/developers/docs/nodes-and-clients/run-a-node/)，就应该明白不同类型的节点会消耗不同数据量。 事实上，客户端可以运行三种不同类型的节点——轻量、完整和归档。 也有不同同步策略的选项，可加快同步时间。 同步是指它能以多快的速度获取有关以太坊状态的最新信息。

### 全节点 {#full-node}

- 存储完整的区块链数据。
- 参与区块验证，验证所有区块和状态。
- 所有状态都可以从一个全节点推出。
- 为网络提供服务，并按照请求提供数据。

### 轻节点 {#light-node}

- 存储头链并请求其他所有内容。
- 可以对照区块头中的状态根来验证数据的有效性。
- 对于低容量的设备，如嵌入式设备或移动电话来说是有用的，这些设备无法储存数千兆字节的区块链数据。

### 归档节点 {#archive-node}

- 存储保留在全节点中的所有内容，并建立一个历史状态的归档。 如果您想查询区块 #4,000,000 的帐户余额等内容，或者简单可靠地[使用 OpenEthereum 在不挖坑的情况下测试自己的交易集](https://openethereum.github.io/JSONRPC-trace-module#trace_callmany)，就需要这样做。
- 这些数据的数据量会达到TB级别，这使得存档节点对普通用户的吸引力降低，但对于诸如区块浏览器、钱包供应商和链分析之类的服务而言却很方便。

以存档以外的任何方式同步客户端将导致修剪的区块链数据。 这意味着，没有所有历史状态的档案，但是整个节点都可以按需构建它们。

## 为什么我要运行一个以太坊节点？ {#why-should-i-run-an-ethereum-node}

运行节点可以让您在支持生态系统的同时，不受信任地私下使用以太坊。

### 对您的好处 {#benefits-to-you}

运行自己的节点使您能够以真正私有、自给自足和不信任的方式使用以太坊。 您无需信任网络，因为您可以自己与客户端验证数据。 “不信任，验证”是流行的区块链口头禅。

- 您的节点根据一致性规则自己验证所有交易和区块。 这意味着您不必依赖网络中的任何其他节点或完全信任它们。
- 您不必将地址和余额泄露到随机节点。 一切都可以由您自己的客户检查。
- 如果您使用自己的节点，则去中心化应用可以更安全和私有。[Metamask](https://metamask.io)、[MyEtherWallet](https://myetherwallet.com) 和其他钱包可以轻松指向您自己的本地节点。
- 您可以编程自己的自定义 RPC 端点。
- 您可以使用**进程间通信 (IPC)**连接到节点，或者重写节点，将您的程序作为插件加载。 这会降低延迟，您需要尽快替换您的交易（例如抢跑交易）。

![如何通过您的应用程序和节点访问以太坊](../../../../../developers/docs/nodes-and-clients/nodes.png)

### 网络优势 {#network-benefits}

多种节点对以太坊的健康、安全和运行弹性非常重要。

- 他们为依赖它的轻量级客户端提供对区块链数据的访问。 在使用高峰期，需要有足够的全节点来帮助轻量节点同步。 轻量节点不会存储整个区块链，而是通过[区块头中的状态根](/developers/docs/blocks/#block-anatomy)来验证数据。 如果有需要，他们可以要求区块提供更多信息
- 完整的节点会强制执行工作量证明的共识规则，因此它们不会被欺骗来接受不遵循规则的代码块。 这为网络中提供了额外的安全性，因为如果所有节点都是轻型节点（不进行完全验证），则矿工可能会攻击网络，例如，创建具有更高奖励的区块。

如果您运行一个完整的节点，整个以太坊网络将从中受益。

## 运行您自己的节点 {#running-your-own-node}

是否有兴趣运行自己的以太坊客户端？ 学习如何 [升级您自己的节点](/developers/docs/nodes-and-clients/run-a-node/)！

### 项目 {#projects}

[**选择客户端并按说明操作**](#clients)

**ethnode -** **_运行一个以太坊节点（Geth 或 Parity）用于本地开发。_**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode - _用于在专用机器上运行 Web3 节点（包括以太坊和信标链）的操作系统 GUI。_**

- [dappnode.io](https://dappnode.io)

### 资源 {#resources}

- [运行以太坊全节点：完整指南](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _Nov 7, 2019 - Justin Leroux_
- [节点配置备忘单](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _Jan 5, 2019 - Afri Schoeden_
- [如何安装和运行一个 Geth 节点](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _October 4, 2020 - Sahil Sen_
- [如何安装和运行一个 OpenEthereum(fka. Parity) 节点](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _2020 - Sahil Sen_

## 替代方法 {#alternatives}

运行您自己的节点可能很难，您不必总是运行您自己的实例。 在这种情况下，您可以使用第三方 API 提供商，如 [Infura](https://infura.io)、[Alchemy](https://alchemyapi.io) 或 [QuikNode](https://www.quiknode.io)。 另外，[ArchiveNode](https://archivenode.io/) 是一个社区资助的归档节点，希望将以太坊上的数据带给无法运行自己节点的独立开发者。 如果想了解使用这些服务的概况，请查看[节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)。

如果有人在您的社区里运行一个包含公共 API 的以太坊节点，您可以[通过自定义 RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) 将您的轻量级钱包（如 Metamask）指向社区节点，并比随机受托的第三方隐私性更强。

另一方面，如果您运行一个客户端，则可以与可能需要它的朋友分享。

## 客户端 {#execution-clients}

以太坊社区维护着多个开源客户端，这些客户端由不同团队使用不同的编程语言开发。 这使得该网络更强大、更多样化。 理想的目标是在没有任何客户端支配的情况下实现多样性，以减少任何单点故障。

本表概括了不同的客户端。 它们均已通过[客户端测试](https://github.com/ethereum/tests)，并积极维护以保持与网络升级同步。

| 客户端                                                       | 语言     | 操作系统：            | 网络                                          | 同步策略   | 状态缓冲        |
| ------------------------------------------------------------ | -------- | --------------------- | --------------------------------------------- | ---------- | --------------- |
| [Geth](https://geth.ethereum.org/)                           | Go       | Linux, Windows, macOS | Mainnet、Görli、Rinkeby、Ropsten              | 快速，完整 | Archive，Pruned |
| [OpenEthereum](https://github.com/openethereum/openethereum) | Rust     | Linux，Windows，macOS | Mainnet、Kovan、Ropsten 及更多                | Warp，完整 | Archive, Pruned |
| [Nethermind](http://nethermind.io/)                          | C#, .NET | Linux，Windows，macOS | Mainnet、Gounderster、Ropsten、Rinkeby 及更多 | 快速，完整 | Archive, Pruned |
| [Besu](https://pegasys.tech/solutions/hyperledger-besu/)     | Java     | Linux，Windows，macOS | Mainnet、Rinkeby、Ropsten 和 Görli            | 快速，完整 | Archive, Pruned |
| [Erigon](https://github.com/ledgerwatch/erigon)              | 出发     | Linux、Windows、macOS | Mainnet、Görli、Rinkeby、Ropsten              | 快速、完整 | Archive、Pruned |

更多关于支持网络的信息，请在[以太坊网络中查阅](/developers/docs/networks/)。

### 不同实现方式的优势 {#advantages-of-different-implementations}

每个客户端都有独特的用例和优势，所以您应该根据自己的偏好选择。 多样性使得实现工作能够侧重于不同的特性和用户群。 您可能想要根据特性、支持、编程语言或许可证选择客户端。

#### Go Ethereum {#geth}

Go Ethereum（简称 Geth）是实现以太坊原始协议之一。 目前，它是使用最为广泛的客户端，拥有最大的用户群，为用户和开发者提供各种工具。 它用 Go 语言编写，完全开源，并由 GNU LGPL v3 授权许可。

#### OpenEthereum {#openethereum}

OpenEthereum 是一个快速、功能丰富、基于 CLI 的高级以太坊客户端。 它的诞生是为了给那些需要快速同步和最大运行时间的快速和可靠的服务提供必要的基础设施。 OpenEthereum 的目标是成为最快、最轻、最安全的以太坊客户端。 它提供了以下简洁的模块化代码：

- 易于自定义。
- 轻度融入服务或产品。
- 最小的内存和存储痕迹。

OpenEthereum 是使用最先进的 Rust 编程语言开发的，并由 GPLv3 授权许可。

**注意，OpenEthereum [已被废弃](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)并已停止维护。**请谨慎使用，最好切换至其他客户端实现。

#### Nethermind {#nethermind}

Nethermind 是一个用 C# .NET 技术栈创建的以太坊协议，在包括 ARM 在内的所有主要平台上运行。 它表现出了优越性能：

- 优化虚拟机
- 状态访问
- 网络和丰富的功能，如 Promethe/Graphana 仪表板、seq 企业日志支持、JSON RPC 跟踪和分析插件。

Nethermind 同样拥有[详细文档](https://docs.nethermind.io)，强大的开发支持，在线社区，并为高级用户提供全天候服务。

#### Besu {#besu}

Hyperledger Besu 是一个企业级以太坊客户端，用于公共和许可网络。 运行所有以太坊主网功能，从追踪到 GraphQL，有广泛的监控并得到 ConsenSys 支持，无论是在开放社区渠道中还是通过企业的商业 SLA。 使用 Java 编写，并由 Apache 2.0 授权许可。

#### Erigon {#erigon}

Erigon（前称 TurbohyGeth）是 Go Ethereum 的一个分叉，注重速度和磁盘空间效率。 Erigon 是一个完全重新设计的以太坊实现项目，目前用 Go 语言编写，但以其他语言实现。 Erigon 的目标是为以太坊提供更快、更模块化和更优化的实现。 它可以在 3 天内使用不到 2 TB 磁盘空间，执行完整归档节点同步。

### 同步模式 {#sync-modes}

为了关注和验证网络中的当前数据，以太坊客户端需要与最新的网络状态同步。 通过从其他人那里下载数据，用密码学方法验证其完整性，并建立一个本地区块链数据库来实现。

同步模式代表了这个过程的不同方法，并有不同的权衡。 客户端在实现同步算法方面也有所不同。 有关部署的具体细节，请参考您所选择的客户端的官方文件。

#### 战略概览 {#overview-of-strategies}

蛛网客户端使用的同步方法概览：

##### 完全同步 {#full-sync}

完整下载所有区块（包括区块头、交易和接收的数据），并通过执行每个区块来逐步生成区块链的状态。

- 通过验证每笔交易，最大限度地减少信任并实现最高安全性。
- 随着交易数量的增加，处理所有交易可能需要几天到几周时间。

##### 快速同步

快速同步会下载所有区块（包括区块头、交易和接收的数据），验证所有区块头，下载区块状态并对区块头进行验证。

- 依赖共识机制的安全性。
- 同步只需要几个小时。

##### 轻量同步

轻量客户端下载所有区块头、区块数据并对其进行随机验证。 仅从信任的检查点同步区块链信息。

- 仅获取最新状态，同时依赖于对开发者的信任和共识机制。
- 客户端已准备好在几分钟内使用当前网络状态。

[关于轻量客户端的更多信息](https://www.parity.io/blog/what-is-a-light-client/)

##### 快照同步

由 Geth 执行。 使用动态快照，用户可以检索所有帐户和存储数据，而不下载中间三角形节点，然后在本地重建 Merkle trie。

- Geth 开发的最快同步策略，为当前默认值
- 节省大量磁盘使用和网络带宽，同时不影响安全。

[关于快照的更多信息](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

##### 压缩同步

由 OpenEthereum 执行。 节点定期生成一个对共识至关重要的状态快照，任何节点都可以通过网络获取这些快照，从而能够从这个节点快速同步。

- OpenEthereum 的最快和默认同步模式依赖于节点提供的静态快照。
- 它和快照同步的策略类似，但没有确定的安全效益。

[关于压缩的更多信息](https://openethereum.github.io/Beginner-Introduction#warping---no-warp)

##### Beam 同步

由 Nethermind 和 Trinity 执行。 可以快速同步，但也可以下载执行最新模块所需的数据，这允许您在启动后的最初几分钟内查询链上信息。

- 首先同步状态，并允许您在几分钟内查询 RPC。
- 后台同步速度放慢，RPC 响应可能失败，仍处于开发阶段，但并非完全可靠。

[关于 Beam 的更多信息](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)

#### 设置客户端 {#client-setup}

客户端提供丰富的配置选项，可满足您的需要。 根据安全程度、可用数据和成本选择最适合的方法。 除了同步算法之外，您还可以设置对不同类型的旧数据的精简。 精简可以删除过时的数据，例如删除无法从最近区块上访问的节点。

关注客户端的文档或帮助页面来找出默认的同步模式。 您在设置时定义所希望的同步类型，如：

**在 [GETH](https://geth.ethereum.org/) 或 [ERIGON](https://github.com/ledgerwatch/erigon) 设置轻量同步**

`geth --syncmode "light"`

想要了解更多详情，请查看[运行 Geth 轻量节点](/developers/tutorials/run-light-node-geth/)的教程。

**在 [Besu](https://besu.hyperledger.org/) 中设置与归档的完整同步**

`besu --sync-mode=FULL`

像任何其他配置一样，它可以通过启动标志或配置文件来定义。 另一个例子是 [Nethermind](https://docs.nethermind.io/nethermind/) ，它促使您在初始化过程中选择一个配置并创建一个配置文件。

## 硬件 {#hardware}

硬件要求因客户端不同而已，但通常要求不是那么高，因为节点只需要保持同步。 不要把它与需要更多算力的挖矿混为一谈。 然而，更强大的硬件的确可以提升同步时间和性能。 根据您的需求和目的，以太坊可以在您的计算机、家庭服务器、单板计算机或云端虚拟私人服务器上运行。

运行你自己的节点的一个简单方法是使用即插即用的盒子，如 [DAppNode](https://dappnode.io/)。 一个简单的用户接口，为运行客户端和依赖客户端的应用程序提供了硬件。

### 要求 {#requirements}

在安装任何客户端之前，请确保您的计算机有足够的资源运行它。 最低和建议的要求见下文，然而核心部分在于磁盘空间。 同步以太坊区块链即是进行高强度的输入/输出。 最好有一个固态硬盘 (SSD)。 要在机械硬盘上运行以太坊客户端，你将需要至少 8GB 的内存作为缓存使用。

#### 最低要求 {#recommended-specifications}

- 2 核以上 CPU
- 如果是固态硬盘，则内存需 4GB 以上。如果是机械硬盘，则内存需 8GB 以上。
- 8 MBit/s 带宽

#### 推荐的规格要求 {#recommended-specifications}

- 具有 4 核以上快速 CPU
- 16GB 以上 RAM
- 快速固态硬盘，拥有至少 500 GB 可用空间
- 25 MBit/s 以上带宽

您选择的同步模式将影响空间要求，但我们估计了下面每个客户端需要的磁盘空间。

| 客户端       | 磁盘大小（快速同步） | 磁盘大小（完整存档） |
| ------------ | -------------------- | -------------------- |
| Geth         | 400GB 以上           | 6TB+                 |
| OpenEthereum | 280GB 以上           | 6TB+                 |
| Nethermind   | 200GB 以上           | 5TB+                 |
| Besu         | 750GB 以上           | 5TB+                 |
| Erigon       | N/A                  | 1TB+                 |

- 注意：Erigon 无法快速同步，但可以完全修剪 (~500 GB)。

![图表表明，完全同步所需的 GB 数正呈上升趋势](../../../../../developers/docs/nodes-and-clients/full-sync.png)

![图表表明，归档同步所需的 GB 数正呈上升趋势。](../../../../../developers/docs/nodes-and-clients/archive-sync.png)

这些图表显示储存要求总是如何改变的。 关于 Geth 和 OpenEthereum 的最新数据，请参阅[完整同步数据](https://etherscan.io/chartsync/chaindefault)和[归档同步数据](https://etherscan.io/chartsync/chainarchive)。

### 单板计算机上的以太坊 {#ethereum-on-a-single-board-computer}

运行以太坊节点的最方便和最便宜的方法是使用 Raspberry Pi 这样的 ARM 架构的单板计算机。 [Ethereum on ARM](https://twitter.com/EthereumOnARM)提供 Geth、OpenEthereum、Nethermind 和 Besu 客户端的图像。 这是一个关于[如何构建和设置 ARM 客户端](/developers/tutorials/run-node-raspberry-pi/)的简单教程。

像这样的小型、实惠和高效的设备是在家里运行节点的理想选择。

## 以太坊 2.0 客户端 {#consensus-clients}

有新客户端支持[以太坊 2.0 升级](/upgrades/beacon-chain/)。 他们将运行信标链，并支持新的[权益证明](/developers/docs/consensus-mechanisms/pos/)共识机制。

[查看以太坊 2.0 客户端](/upgrades/get-involved/#clients)。

## 延伸阅读 {#further-reading}

互联网上有许多关于以太坊客户端的信息。 以下是一些可能有所帮助的资源。

- [以太坊 101 - 第二部分 - 了解节点](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _- Wil Barnes，2019 年 2 月 13 日_
- [运气以太坊全节点：勉励者指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _- Justin Leroux，2019 年 11 月 7 日_
- [运行一个以太坊节点](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _- ETHHub，经常更新_
- [分析成为以太坊完全验证节点的硬件要求](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _- Albert Palau，2018 年 9 月 24 日_
- [在以太坊主网上运行 Hyperledger Besu 节点：优点、要求和设置](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _- Felipe Faraggi，2020 年 5 月 7 日_

## 相关主题 {#related-topics}

- [块](/developers/docs/blocks/)
- [网络](/developers/docs/networks/)

## 相关教程 {#related-tutorials}

- [用 Geth 运行一个节点](/developers/tutorials/run-light-node-geth/) _- 如何下载、安装和运行 Geth。 涵盖了同步模式、Javascript 控制台等内容。_
- [将您的 Raspberry Pi 4 变成一个以太坊 1.0 或以太坊 2.0 节点 - 安装指南](/developers/tutorials/run-node-raspberry-pi/) - _闪存您的 Raspberry Pi 4，插入以太网电缆，连接固态磁盘并给设备供电，将 Raspberry Pi 4 变成一个完整的以太坊 1.0 或以太坊 2.0 节点（信标链/验证者）。_
