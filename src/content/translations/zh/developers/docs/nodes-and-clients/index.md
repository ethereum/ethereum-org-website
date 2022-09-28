---
title: 节点和客户端
description: 以太坊节点和客户端软件的概述，以及如何设置节点和为什么您应该这样做。
lang: zh
sidebarDepth: 2
---

以太坊是一个由计算机组成的分布式网络，这些计算机运行可验证区块和交易数据的软件，称为节点。 软件应用程序（客户端）必须在电脑上运行，将你的电脑变成一个以太坊节点。

**注意：仍然可以仅运行执行客户端。 然而，在[合并](/upgrades/merge)之后，将不再可以继续这样做。 合并后，执行客户端和共识客户端必须一起运行，以使用户能够访问以太坊网络。 一些测试网（例如 Kiln、Ropsten）已经完成了它们自己的合并，这意味着仅运行执行客户端已经不足以访问这些网络，除非执行客户端与可以跟踪链头的共识客户端连接在一起。**

## 前提条件 {#prerequisites}

在更深入地探索并运行自己的以太坊客户端实例之前，你应该先理解对等网络的概念和[以太坊虚拟机基础知识](/developers/docs/evm/)。 查看我们的[以太坊简介](/developers/docs/intro-to-ethereum/)。

如果你不熟悉节点这一主题，建议先查看便于用户理解的[运行以太坊节点](/run-a-node)简介。

## 什么是节点和客户端？ {#what-are-nodes-and-clients}

“节点”是运行以太坊客户端软件的计算机。 客户端是一种以太坊实现，它验证每个区块中的所有交易，从而确保网络安全和数据准确。 在合并前，运行一个全节点需要一种软件（或者运行一个挖矿节点需要两种软件）。 在合并后，运行一个全节点需要两种客户端软件（运行一个验证者节点需要三种），一种客户端处理和传播交易（执行客户端），一种处理区块传播和分叉选择（共识客户端），而可选的验证者客户端处理区块生成以及对从其他对等节点收到的区块进行“投票”。

通过查看此[节点图](https://etherscan.io/nodetracker)，可以查看以太坊网络的实时视图。

有许多使用多种不同编程语言编写的[以太坊执行客户端](/developers/docs/nodes-and-clients/#execution-clients)和[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)，如 Go、Rust、JavaScript、Typescript、Python、C# .NET、Nim 和 Java。 这些客户端实现的共同之处是它们都遵循形式化规范。 这些规范规定了以太坊网络和区块链如何运作。

![已连接的执行客户端和共识客户端](./eth1eth2client.png) 已连接执行客户端和共识客户端的简化图。

## 节点类型 {#node-types}

如果你想[运行自己的节点](/developers/docs/nodes-and-clients/run-a-node/)，就应该明白节点有几种不同类型并且使用数据的方式亦不同。 事实上，客户端可以运行三种不同类型的节点 - 轻节点、全节点和归档节点。 也有不同的同步策略可供选择，可加快同步时间。 同步是指节点能以多快的速度获取最新以太坊状态信息。

### 全节点 {#full-node}

- 存储完整的区块链数据（会进行定期精减，所以全节点并不存储包含创世块在内的所有状态数据）
- 参与区块验证，验证所有区块和状态。
- 所有状态都可以从全节点中获取（尽管非常久远的状态是通过向归档节点发出请求重建的）。
- 提供网络服务，并应要求提供数据。

### 轻节点 {#light-node}

轻节点不下载所有区块，而是下载区块头。 这些区块头只包含区块内容的摘要信息。 轻节点所需的任何其他信息都从全节点请求。 然后，轻节点可以根据区块头中的状态根独自验证收到的数据。 轻节点可以让用户加入以太坊网络，无需运行全节点所需的功能强大的硬件或高带宽。 最终，轻节点也许能在手机和嵌入式设备中运行。 轻节点不参与共识（即它们不能成为矿工或验证者），但可以访问以太坊区块链，其功能与全节点相同。

执行客户端 Geth 有一个[轻量同步](https://github.com/ethereum/devp2p/blob/master/caps/les.md)选项。 然而，Geth 轻节点依赖于提供轻节点数据的全节点。 很少有全节点选择提供轻节点数据，这意味着轻节点通常无法找到对等节点。 共识层目前没有生产就绪的轻客户端，但是，有几个正在开发中。

可能还有一些方法可供在 [gossip 网络](https://www.ethportal.net/)上提供轻客户端数据。 这是有利的，因为 gossip 网络可以支持轻节点网络，而无需全节点来满足请求。

以太坊目前还不支持大量轻节点，但轻节点支持是一个有望在不久的将来快速发展的领域。

### 归档节点 {#archive-node}

- 存储全节点中保存的所有内容，并建立历史状态存档。 如果想查询区块 #4,000,000 中的帐户余额等内容，或者想简单可靠地[测试自己的一组交易而不使用 OpenEthereum 挖矿](https://openethereum.github.io/JSONRPC-trace-module#trace_callmany)，则需要归档节点。
- 这些数据用太字节作为单位，这使存档节点对普通用户的吸引力降低，但对于诸如区块浏览器、钱包供应商和链分析之类的服务而言却很方便。

以归档以外的任何方式同步客户端将导致区块链数据被精剪。 这意味着，没有所有历史状态的存档，但全节点能够在需要时构建它们。

## 为什么我要运行一个以太坊节点？ {#why-should-i-run-an-ethereum-node}

运行节点可以让您在支持生态系统的同时，无需信任地私下使用以太坊。

### 对您的好处 {#benefits-to-you}

运行自己的节点，你就能够以完全私密、独立且无需信任的方式使用以太坊。 你无需信任网络，因为你可以使用自己的客户端验证数据。 “不要信任，就验证”是流行的区块链口头禅。

- 你的节点根据共识规则独自验证所有交易和区块。 这意味着你不必依赖网络中的任何其他节点或完全信任它们。
- 你不必将地址和余额泄露到随机节点。 你可以用自己的客户端检查所有内容。
- 如果使用自己的节点，去中心化应用程序可以更安全、更私密。 [MetaMask](https://metamask.io)、[MyEtherWallet](https://myetherwallet.com) 和其他一些钱包可以很容易地指向你的本地节点。
- 你可以编写自己的自定义远程过程调用端点。
- 你可以使用**进程间通信 (IPC)** 连接到节点，或者重写节点将你的程序作为插件加载。 这样做会实现低延迟，在需要尽快替换你的交易（例如抢跑交易）时低延迟至关重要。

![如何通过你的应用程序和节点访问以太坊](./nodes.png)

### 对网络的好处 {#network-benefits}

多种节点对以太坊的健康、安全和运行恢复能力非常重要。

- 这些节点让依赖它们的轻量级客户端能够访问区块链数据。 在使用高峰期，需要有足够多的全节点帮助轻节点同步。 轻节点不存储整个区块链，而是通过[区块头中的状态根](/developers/docs/blocks/#block-anatomy)验证数据。 如果有需要，他们可以要求区块提供更多信息。
- 全节点强制执行工作量证明共识规则，因此无法欺骗它们接受不遵循规则的区块。 这为网络提供了额外的安全性，因为如果所有节点都是轻节点，不进行完整验证，区块生产者可能会攻击网络，例如，创建具有更高奖励的区块。

如果你运行一个全节点，整个以太坊网络将从中受益。

## 运行您自己的节点 {#running-your-own-node}

是否有兴趣运行自己的以太坊客户端？

如需适合初学者的简介，请访问我们的[运行节点](/run-a-node)页面以了解更多信息。

如果你是技术用户，可以学习如何使用命令行[启动您自己的节点](/developers/docs/nodes-and-clients/run-a-node/)！

### 项目 {#projects}

**选择客户端并遵它们的说明**

**ethnode -** **_运行一个以太坊节点（Geth 或 Parity）用于本地开发。_**

- [GitHub](https://github.com/vrde/ethnode)

** DAppNode - \*\***_操作系统图形用户界面，用于在专用机器上运行 Web3 节点（包括以太坊和信标链）。_\*\*

- [dappnode.io](https://dappnode.io)

### 资源 {#resources}

- [运行以太坊全节点：完整指南](https://www.coindesk.com/learn/ethereum-nodes-and-clients-a-complete-guide/)
- [运行您自己的以太坊节点](/developers/docs/nodes-and-clients/run-a-node)
- [Geth 相关文档](https://geth.ethereum.org/)
- [如何安装并运行 Lighthouse 节点](https://hackernoon.com/how-to-run-an-eth-20-beacon-node-using-the-lighthouse-macos-client-7t2u3wtv)
- [Nimbus 节点快速入门指南](https://nimbus.guide/quick-start.html)

## 替代方法 {#alternatives}

运行自己的节点可能很困难，而且你并非总是需要运行自己的实例。 在这种情况下，可以使用第三方应用程序接口提供商，如 [Infura](https://infura.io)、[Alchemy](https://alchemyapi.io) 或 [QuikNode](https://www.quiknode.io)。 另外，[ArchiveNode](https://archivenode.io/) 是一个社区资助的归档节点，旨在将以太坊区块链上的存档数据提供给无法负担它的独立开发者。 有关使用这些服务的概述，请查看[节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)。

如果有人在社区里运行一个具有公共应用程序接口的以太坊节点，你可以[通过自定义远程过程调用](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node)将轻量级钱包（如 Metamask）指向社区节点，并且比随机信任的第三方隐私性更强。

另一方面，如果你运行一个客户端，可以与可能需要它的朋友共享。

## 执行客户端（原“Eth1 客户端”） {#execution-clients}

以太坊社区维护着多种开放源代码的执行客户端（以前称为“以太坊 1 客户端”，或仅称为“以太坊客户端”），它们由不同的团队使用不同的编程语言开发。 这使得网络更加强大并且更加多样性。 最理想的目标是实现多样性，即没有任何客户端占据主导地位，从而减少任何单点故障。

下表汇总了不同的客户端。 它们均已通过[客户端测试](https://github.com/ethereum/tests)，并得到积极维护以保持与网络升级同步。

| 客户端                                          | 语言     | 操作系统：            | 网络                                | 同步策略                     | 状态缓冲        |
| ----------------------------------------------- | -------- | --------------------- | ----------------------------------- | ---------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)              | Go       | Linux, Windows, macOS | Mainnet、Görli、Rinkeby、Ropsten    | Snap、Full 同步式模式        | Archive，Pruned |
| [Nethermind](http://nethermind.io/)             | C#、.NET | Linux，Windows，macOS | Mainnet、Görli、Ropsten、Rinkeby 等 | Fast、Beam、Archive 同步模式 | Archive, Pruned |
| [Besu](https://besu.hyperledger.org/en/stable/) | Java     | Linux，Windows，macOS | Mainnet、Rinkeby、Ropsten、Görli 等 | 快速，完整                   | Archive, Pruned |
| [Erigon](https://github.com/ledgerwatch/erigon) | Go       | Linux，Windows，macOS | Mainnet、Görli、Rinkeby、Ropsten    | Full 同步模式                | Archive, Pruned |
| [Akula](https://akula.app)                      | Rust     | Linux                 | 主网、Görli、Rinkeby、Ropsten 等    | Full 同步模式                | Archive、Pruned |

**注意，OpenEthereum [已废弃](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)并已停止维护。**请谨慎使用，最好改用其他客户端实现。

有关支持网络的更多信息，请阅读[以太坊网络](/developers/docs/networks/)。

### 不同实现方式的优势 {#advantages-of-different-implementations}

每种客户端都有独特的用例和优势，所以您应该根据自己的偏好来选择。 多样性使得实现方式能够侧重于不同的功能和用户群。 你可能想根据功能、支持、编程语言或许可证选择一种客户端。

#### Go Ethereum {#geth}

Go Ethereum（简称 Geth）是最早实现的以太坊协议之一。 目前，它是使用最为广泛的客户端，拥有最大的用户群，为用户和开发者提供各种工具。 它用 Go 语言编写，完全开源，并依照 GNU LGPL v3 获得许可。

#### OpenEthereum {#openethereum}

OpenEthereum 是一种快捷、功能丰富、基于命令行界面的高级以太坊客户端。 它的诞生是为了给那些快捷、可靠的服务提供必要的基础设施，这些服务需要快速同步和最长运行时间。 OpenEthereum 的目标是成为最快、最轻量、最安全的以太坊客户端。 其整洁的模块化代码库可以：

- 便于自定义。
- 轻度集成到服务或产品中。
- 实现最少的内存和存储使用。

OpenEthereum 使用最先进的 Rust 编程语言开发，并依照 GPLv3 获得许可。

**注意，OpenEthereum [已废弃](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)并已停止维护。**请谨慎使用，最好改用其他客户端实现。

#### Nethermind {#nethermind}

Nethermind 是用 C# .NET 技术栈创建的以太坊协议，在包括 ARM 在内的所有主要平台上运行。 它在以下方面表现出了优越性能：

- 优化虚拟机
- 状态访问
- 联网和丰富的功能，如 Promethe/Graphana 仪表板、seq 企业日志支持、JSON RPC 跟踪和分析插件。

Nethermind 也有[详细的相关文档](https://docs.nethermind.io)、强大的开发支持、在线社区，并为高级用户提供全天候支持。

#### Besu {#besu}

Hyperledger Besu 是一种企业级以太坊客户端，面向公共和许可网络。 它运行包括追踪到 GraphQL 在内的所有以太坊主网功能，可进行广泛的监控，并通过开放的社区渠道以及面向企业的商业 SLA 获得 ConsenSys 支持。 Besu 用 Java 语言编写，并依照 Apache 2.0 获得许可。

#### Erigon {#erigon}

Erigon 以前称为 Turbo‐Geth，是 Go Ethereum 的一个分叉，注重速度和磁盘空间效率。 Erigon 是一种完全重新设计的以太坊实现，目前用 Go 语言编写，但以其他语言编写的实现也在计划中。 Erigon 的目标是成为更快、模块化程度更高和更优化的以太坊实现。 它可以在 3 天内使用少于 2 Tb 磁盘空间，执行归档节点完全同步。

### 同步模式 {#sync-modes}

为了关注和验证网络中的最新数据，以太坊客户端需要与最新的网络状态同步。 同步方法如下：从对等节点下载数据，用加密方法验证其完整性，并构建一个本地区块链数据库。

同步模式代表了这个过程的不同方法，并进行了不同的折衷。 客户端在实现同步算法方面也各不相同。 有关部署的具体细节，请参考您所选客户端的官方文档。

#### 战略概览 {#overview-of-strategies}

主网就绪客户端使用的同步方法概览：

##### 完全同步

完全同步下载所有区块（包括区块头、交易和收据），并通过执行从创世块开始的每个区块逐步生成区块链的状态。

- 通过验证每笔交易，最大限度地减少信任并实现最高安全性。
- 随着交易数量的增加，处理所有交易可能需要几天到几周时间。

##### 快速同步

快速同步下载所有区块（包括区块头、交易和收据），验证所有区块头，下载区块状态并对照区块头进行验证。

- 依赖共识机制的安全性。
- 同步只需要几个小时。

##### 轻量同步

轻客户端同步模式下载所有区块头、区块数据并对其中一些进行随机验证。 仅从信任的检查点开始同步区块链信息。

- 仅获取最新状态，同时依赖于对开发者和共识机制的信任。
- 客户端在几分钟内便可以使用当前网络状态。

[更多关于轻客户端的信息](https://www.parity.io/blog/what-is-a-light-client/)

##### 快照同步

由 Geth 执行。 使用对等节点提供的动态快照，检索所有帐户和存储数据但不下载中间字典树节点，然后在本地重建默克尔树。

- Geth 开发的最快同步策略，当前为其默认同步模式
- 节省大量磁盘使用和网络带宽，同时不影响安全。

[更多关于快照同步的信息](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

##### 压缩同步

由 OpenEthereum 执行。 节点定期生成一个共识关键状态快照，任何对等节点都可以通过网络提取这些快照，从而能够从这个节点快速同步。

- OpenEthereum 的最快和默认同步模式依赖于对等节点提供的静态快照。
- 和快照同步的策略类似，但不具备某些安全优点。

[更对关于压缩同步的信息](https://openethereum.github.io/Beginner-Introduction#warping---no-warp)

##### Beam 同步

由 Nethermind 和 Trinity 执行。 原理类似于快速同步，但是还会下载执行最新区块所需的数据，这允许用户在开始后的最初几分钟内查询链上信息。

- 首先同步状态，并允许你在几分钟内查询远程过程调用。
- 后台同步速度放慢，远程过程调用响应可能失败，仍处于开发阶段，而且并非完全可靠。

[更多关于 Beam 同步的信息](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)

#### 设置客户端 {#client-setup}

客户端提供丰富的配置选项，以满足你的需要。 根据安全程度、可用数据和成本选择最适合你的客户端。 除了同步算法之外，你还可以设置精剪不同类型的旧数据。 精简可以删除过时的数据，例如删除无法从最近区块上访问的状态树节点。

关注客户端的文档或帮助页面，确定默认同步模式。 你可以在设置时定义首选同步类型，如下所示：

**在 [GETH](https://geth.ethereum.org/) 或 [ERIGON](https://github.com/ledgerwatch/erigon) 设置轻量同步**

`geth --syncmode "light"`

想要了解更多详情，请查看[运行 Geth 轻节点](/developers/tutorials/run-light-node-geth/)上的教程。

**在 [Besu](https://besu.hyperledger.org/) 中设置归档节点的完全同步**

`besu --sync-mode=FULL`

像任何其他配置一样，同步模式可以通过启动标志或配置文件来定义。 另一个例子是 [Nethermind](https://docs.nethermind.io/nethermind/)，该客户端在首次初始化期间提示你选择一种配置并创建一个配置文件。

## 共识客户端（原“Eth2”客户端） {#consensus-clients}

有多种共识客户端（以前称为“以太坊 2”客户端）支持[共识升级](/upgrades/beacon-chain/)。 在[合并](/upgrades/merge/)之后，它们运行信标链并向执行客户端提供权益证明共识机制。

[查看共识客户端](/upgrades/get-involved/#clients)。

| 客户端                                                      | 语言       | 操作系统：            | 网络                            |
| ----------------------------------------------------------- | ---------- | --------------------- | ------------------------------- |
| [Teku](https://pegasys.tech/teku)                           | Java       | Linux, Windows, macOS | 信标链，Prater                  |
| [Nimbus](https://nimbus.team/)                              | Nim        | Linux，Windows，macOS | 信标链，Prater                  |
| [Lighthouse](https://lighthouse-book.sigmaprime.io/)        | Rust       | Linux，Windows，macOS | 信标链，Prater，Pyrmont         |
| [Lodestar](https://lodestar.chainsafe.io/)                  | TypeScript | Linux，Windows，macOS | 信标链，Prater                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/) | Go         | Linux，Windows，macOS | 信标链，Gnosis，Prater，Pyrmont |

## 硬件 {#hardware}

硬件要求因客户端不同而异，但通常不是很高，因为节点只需保持同步即可。 不要把它与需要更多算力的挖矿混为一谈。 然而，功能更强大的硬件的确可以提升同步时间和性能。 根据你的需求和需要，以太坊可以在你的计算机、家庭服务器、单板计算机或云端虚拟私有服务器上运行。

运行自己的节点有一种简单方法：使用“即插即用”盒，如 [DAppNode](https://dappnode.io/)。 它提供了运行客户端及依赖客户端的应用程序所需的硬件，具有一个简洁的用户界面。

### 要求 {#requirements}

在安装任何客户端之前，请确保计算机有足够的资源运行它。 最低和建议要求见下文，然而关键之处在于磁盘空间。 同步以太坊区块链是一种高强度的输入/输出密集型操作。 最好使用固态硬盘。 要在机械硬盘上运行以太坊客户端，至少需要 8GB 内存作为缓存。

#### 最低要求 {#recommended-specifications}

- 2 核以上 CPU
- 如果是固态硬盘，则内存需 4GB 以上。如果是机械硬盘，则内存需 8GB 以上
- 8 MB/秒带宽

#### 推荐的规格要求 {#recommended-specifications}

- 4 核以上快速 CPU
- 16GB 以上内存
- 快速固态硬盘，拥有至少 500 GB 可用空间
- 25 MB/秒以上带宽

你选择的同步模式将影响磁盘空间要求，但我们估计了下面每种客户端需要的磁盘空间。

| 客户端       | 磁盘大小（快速同步） | 磁盘大小（完整存档） |
| ------------ | -------------------- | -------------------- |
| Geth         | 400GB 以上           | 6TB 以上             |
| OpenEthereum | 280GB 以上           | 6TB 以上             |
| Nethermind   | 200GB 以上           | 5TB 以上             |
| Besu         | 750GB 以上           | 5TB 以上             |
| Erigon       | 不适用               | 1TB 以上             |

- 注意：Erigon 不进行快速同步，但可以完全精剪 (~500 GB)

![图表表明，完全同步所需的 GB 数正呈上升趋势](./full-sync.png)

![图表表明，存档同步所需的 GB 数正呈上升趋势](./archive-sync.png)

上面的图表显示存储要求的持续变化趋势。 关于 Geth 和 OpenEthereum 的最新数据，请参阅[完全同步数据](https://etherscan.io/chartsync/chaindefault)和[归档同步数据](https://etherscan.io/chartsync/chainarchive)。

### 在单板计算机上运行以太坊 {#ethereum-on-a-single-board-computer}

运行以太坊节点最方便、最实惠的方法是使用具有 ARM 架构的单板计算机，如 Raspberry Pi。 [Ethereum on ARM](https://twitter.com/EthereumOnARM) 提供了 Geth、OpenEthereum、Nethermind 和 Besu 客户端的映像。 请学习关于[如何构建和设置 ARM 客户端](/developers/tutorials/run-node-raspberry-pi/)的简单教程。

诸如此类小型、实惠、高效的设备是在家里运行节点的理想选择。

## 延伸阅读 {#further-reading}

互联网上有许多关于以太坊客户端的信息。 以下是一些可能有用的资源。

- [以太坊 101 - 第二部分 - 了解节点](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _- Wil Barnes，2019 年 2 月 13 日_
- [运行以太坊全节点：勉励者指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _- Justin Leroux，2019 年 11 月 7 日_
- [运行以太坊节点](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _- ETHHub，经常更新_
- [分析成为已验证以太坊全节点的硬件要求](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _- Albert Palau，2018 年 9 月 24 日_
- [在以太坊主网上运行 Hyperledger Besu 节点：优点、要求和设置](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi，2020 年 5 月 7 日_

## 相关主题 {#related-topics}

- [区块](/developers/docs/blocks/)
- [网络](/developers/docs/networks/)

## 相关教程 {#related-tutorials}

- [运行 Geth 节点](/developers/tutorials/run-light-node-geth/) _ – 如何下载、安装和运行 Geth。 涵盖同步模式、JavaScript 控制台等等。_
- [通过写入 MicroSD 卡将 Raspberry Pi 4 变成验证者节点 - 安装指南](/developers/tutorials/run-node-raspberry-pi/) _- 写入你的 Raspberry Pi 4，插入网线，连接固态磁盘并给设备供电，将 Raspberry Pi 4 变成运行执行层（主网）和/或共识层（信标链/验证者）的以太坊全节点。_
