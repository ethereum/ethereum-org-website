---
title: 节点和客户端
description: 以太坊节点和客户端软件的概述，以及如何设置节点和为什么您应该这样做。
lang: zh
sidebarDepth: 2
---

以太坊是一个由计算机组成的分布式网络，这些计算机运行可验证区块和交易数据的软件，称为节点。 软件应用程序（客户端）必须在电脑上运行，将你的电脑变成一个以太坊节点。

**注意：现在再也不能仅运行执行客户端了。 [合并](/roadmap/merge)后，执行客户端和共识客户端必须一起运行，用户才能够访问以太坊网络。**

## 前提条件 {#prerequisites}

在更深入地探索并运行自己的以太坊客户端实例之前，你应该先理解对等网络的概念和[以太坊虚拟机基础知识](/developers/docs/evm/)。 查看我们的[以太坊简介](/developers/docs/intro-to-ethereum/)。

如果你不熟悉节点这一主题，建议先查看便于用户理解的[运行以太坊节点](/run-a-node)简介。

## 什么是节点和客户端？ {#what-are-nodes-and-clients}

“节点”是指任何以太坊客户端软件的实例，它连接到也运行以太坊软件的其他计算机，形成一个网络。 客户端是以太坊的实现，它根据协议规则验证数据并保持网络安全。

合并后的以太坊由两部分组成：执行层和共识层。 这两层网络是由不同的客户端软件运行。 在本页面，我们分别称他们为“执行客户端”和“共识客户端”。

- 执行客户端（也称为执行引擎、EL 客户端或旧称“以太坊 1”客户端）侦听网络中广播的新交易，在以太坊虚拟机中执行它们，并保存所有当前以太坊数据的最新状态和数据库。
- 共识客户端（也称为信标节点、CL 客户端或旧称“以太坊 2”客户端）实现了权益证明共识算法，使网络能够根据来自执行客户端的经过验证的数据达成一致。

在[合并](/roadmap/merge/)之前，共识层和执行层是独立的网络，以太坊上的所有交易和用户活动都发生在现在的执行层。 一个客户端软件为矿工生产的区块提供执行环境和共识验证。 2020 年 12 月后，共识层即[信标链](/roadmap/beacon-chain/)一直单独运行。 它引入了权益证明，并根据来自以太坊网络的数据协调验证者网络。

通过合并，以太坊连接这些网络并过渡到权益证明。 执行客户端和共识客户端共同验证以太坊的状态。

各种软件协同工作的模块化设计称为[封装复杂性](https://vitalik.ca/general/2022/02/28/complexity.html)。 这种方法更轻松地实现了顺利合并，并支持各客户端的重用，例如在[二层网络生态系统](/layer-2/)中的重用。

![已连接的执行客户端和共识客户端](./eth1eth2client.png) 已连接执行客户端和共识客户端的简化图。

### 客户端多样性 {#client-diversity}

[执行客户端](/developers/docs/nodes-and-clients/#execution-clients)和[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)采用各种不同编程语言编写，并由不同团队开发。

多种客户端实现减少了对于单一代码库的依赖，使网络更强大。 理想的目标是实现多样性，即没有任何客户端在网络中占据主导地位，从而排除潜在的单点故障。 语言多样化令开发者社区更加广泛，并允许他们用自己喜欢的语言创建集成。

了解有关[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)的更多信息。

这些实现的共同点是它们都遵循一种规范。 这些规范规定了以太坊网络和区块链如何运作。 规范定义了每个技术细节，并有以下几种形式：

- 最初为[以太坊黄皮书](https://ethereum.github.io/yellowpaper/paper.pdf)
- [执行规范](https://github.com/ethereum/execution-specs/)
- [共识规范](https://github.com/ethereum/consensus-specs)
- 在各种[网络升级](/history/)中实现的[以太坊改进提案](https://eips.ethereum.org/)

### 跟踪网络中的节点 {#network-overview}

多种跟踪器提供以太坊网络中节点的实时概览。 请注意，由于去中心化网络的性质，这些爬虫只能提供有限的网络视图，并且可能会报告不同的结果。

- [节点地图](https://etherscan.io/nodetracker)，由 Etherscan 提供
- [以太坊节点](https://ethernodes.org/)，由 Bitfly 提供
- [以太坊节点爬虫](https://crawler.ethereum.org/)
- [Nodewatch](https://www.nodewatch.io/) 由 Chainsafe 提供，爬取共识节点

## 节点类型 {#node-types}

如果你想[运行自己的节点](/developers/docs/nodes-and-clients/run-a-node/)，就应该明白节点有几种不同类型并且使用数据的方式亦不同。 事实上，客户端可以运行三种不同类型的节点：轻节点、全节点和归档节点。 还有不同同步策略的选项，可以实现更快的同步时间。 同步是指节点能以多快的速度获取最新以太坊状态信息。

### 全节点 {#full-node}

- 存储全部区块链数据（会定期修剪，所以全节点并不存储包含创世块在内的所有状态数据）
- 参与区块验证，验证所有区块和状态。
- 所有状态都可以从全节点中获取（尽管非常久远的状态是通过向归档节点发出请求重建的）。
- 为网络提供服务，并应要求提供数据。

### 轻节点 {#light-node}

轻节点不下载所有区块，而是下载区块头。 这些区块头只包含区块内容的摘要信息。 轻节点所需的任何其他信息都从全节点请求。 然后，轻节点可以根据区块头中的状态根独自验证收到的数据。 轻节点可以让用户加入以太坊网络，无需运行全节点所需的功能强大的硬件或高带宽。 最终，轻节点也许能在手机和嵌入式设备中运行。 轻节点不参与共识（即它们不能成为矿工或验证者），但可以访问以太坊区块链，其功能与全节点相同。

执行客户端 Geth 有一个[轻量同步](https://github.com/ethereum/devp2p/blob/master/caps/les.md)选项。 然而，Geth 轻节点依赖于提供轻节点数据的全节点。 很少有全节点选择提供轻节点数据，这意味着轻节点通常无法找到对等节点。 共识层目前没有生产就绪的轻客户端，但是，有几个正在开发中。

可能还有一些方法可供在 [gossip 网络](https://www.ethportal.net/)上提供轻客户端数据。 这是有利的，因为 gossip 网络可以支持轻节点网络，而无需全节点来满足请求。

以太坊目前还不支持大量轻节点，但轻节点支持是一个有望在不久的将来快速发展的领域。

### 归档节点 {#archive-node}

- 存储全节点中保存的所有内容，并建立历史状态存档。 如果你想查询区块 #4,000,000 的帐户余额，或者想简单可靠地测试自己的一组交易而不使用跟踪挖掘它们，则需要归档节点。
- 这些数据以太字节为单位，这使得归档节点对普通用户的吸引力较低，但对于区块浏览器、钱包供应商和链分析等服务来说却很方便。

以归档以外的任何方式同步客户端将导致区块链数据被修剪。 这意味着，没有所有历史状态的存档，但全节点能够在需要时构建它们。

## 为什么我要运行一个以太坊节点？ {#why-should-i-run-an-ethereum-node}

运行一个节点可以让你直接、无需信任和私密地使用以太坊，同时通过保持网络更加健壮和去中心化来支持网络。

### 对您的好处 {#benefits-to-you}

运行你自己的节点使你能够以私有、自给自足和无需信任的方式使用以太坊。 你无需信任网络，因为你可以使用自己的客户端验证数据。 “不要信任，就验证”是流行的区块链口头禅。

- 你的节点根据共识规则独自验证所有交易和区块。 这意味着你不必依赖网络中的任何其他节点或完全信任它们。
- 你可以将以太坊钱包与你自己的节点一起使用。 你可以更安全、更私密地使用去中心化应用程序，因为你不必将地址和余额泄露给随机节点。 你可以用自己的客户端检查所有内容。 [MetaMask](https://metamask.io)、[Frame](https://frame.sh/) 和[许多其他钱包](/wallets/find-wallet/)提供远程过程调用导入，这让它们可以使用你的节点。
- 你可以运行和自我托管其他依赖于以太坊数据的服务。 例如，可以是信标链验证者、二层网络等软件、基础设施、区块浏览器、支付机构等。
- 你可以提供自己的自定义[远程过程调用端点](/developers/docs/apis/json-rpc/)。 公开供社区使用，甚至私有托管的以太坊端点可以让用户使用你的节点，并避免大型中心化提供商。
- 你可以使用**进程间通信 (IPC)** 连接到节点，或者重写节点将你的程序作为插件加载。 这样可以减少网络延迟，例如在使用 web3 库处理大量数据时或者当你需要尽快替换交易时（即抢先交易）会带来很大帮助。
- 你可以直接质押以太币以保护网络并获得奖励。 请参见[单独质押](/staking/solo/)开始操作。

![如何通过你的应用程序和节点访问以太坊](./nodes.png)

### 对网络的好处 {#network-benefits}

多种节点对以太坊的健康、安全和运行恢复能力非常重要。

- 全节点强制执行共识规则，因此无法欺骗它们接受不遵循规则的区块。 这在网络中提供了额外的安全性，因为如果所有节点都是轻节点，不进行完整验证，验证者可能会攻击网络。
- 如果遇到攻击并且攻破了[权益证明](/developers/docs/consensus-mechanisms/pos/#what-is-pos)加密经济防御，全节点可以执行社交恢复以选择跟随最诚实的链。
- 网络中的节点越多，网络就更加多样化和更加健壮，这是去中心化的最终目标，可实现一个抗审查的可靠系统。
- 这些节点让依赖它们的轻客户端能够访问区块链数据。 在使用高峰期，需要有足够多的全节点帮助轻节点同步。 轻节点不存储整条区块链，而是通过[区块头中的状态根](/developers/docs/blocks/#block-anatomy)验证数据。 如果需要，它们可以请求区块提供更多信息。

如果你运行一个全节点，整个以太坊网络将从中受益。

## 运行您自己的节点 {#running-your-own-node}

是否有兴趣运行你自己的以太坊客户端？

如需适合初学者的简介，请访问我们的[运行节点](/run-a-node)页面以了解更多信息。

如果你是一名技术用户，请深入了解有关如何[启动你自己的节点](/developers/docs/nodes-and-clients/run-a-node/)的更多详细信息和选项。

## 替代方法 {#alternatives}

设置自己的节点会耗费你的时间和资源，而且你并非总是需要运行自己的实例。 在这种情况下，可以使用第三方应用程序接口提供商，比如 [Infura](https://infura.io)、[Alchemy](https://alchemyapi.io)、[Chainstack](https://chainstack.com) 或 [QuikNode](https://www.quiknode.io)。 另外，[ArchiveNode](https://archivenode.io/) 是一个社区资助的归档节点，旨在将以太坊区块链上的存档数据提供给无法负担它的独立开发者。 有关使用这些服务的概述，请查看[节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)。

如果有人在社区运行一个具有公共应用程序接口的以太坊节点，你可以[通过自定义远程过程调用](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node)将轻量级钱包（如 Metamask）指向社区节点，并获得比一些随机受信任的第三方更强的隐私性。

另一方面，如果你运行一个客户端，可以与可能需要它的朋友共享。

## 执行客户端（原“Eth1 客户端”） {#execution-clients}

以太坊社区维护着多种开放源代码的执行客户端（以前称为“以太坊 1 客户端”，或仅称为“以太坊客户端”），它们由不同的团队使用不同的编程语言开发。 这使得网络更加健壮，更加[多样化](/developers/docs/nodes-and-clients/client-diversity/)。 理想的目标是实现多样性，即没有任何客户端占据主导地位，从而减少任何单点故障。

下表汇总了不同的客户端。 这些客户端均通过[客户端测试](https://github.com/ethereum/tests)，并得到积极维护以保持与网络升级同步。

| 客户端                                          | 语言     | 操作系统：            | 网络                                      | 同步策略                       | 状态缓冲        |
| ----------------------------------------------- | -------- | --------------------- | ----------------------------------------- | ------------------------------ | --------------- |
| [Geth](https://geth.ethereum.org/)              | Go       | Linux、Windows、macOS | 主网、Sepolia、Görli、Ropsten、Rinkeby    | 快照、完全                     | Archive、Pruned |
| [Nethermind](http://nethermind.io/)             | C#、.NET | Linux、Windows、macOS | 主网、Sepolia、Görli、Ropsten、Rinkeby 等 | 快照（不提供服务）、快速、完全 | Archive、Pruned |
| [Besu](https://besu.hyperledger.org/en/stable/) | Java     | Linux、Windows、macOS | 主网、Sepolia、Görli、Ropsten、Rinkeby 等 | 快速、完全                     | Archive、Pruned |
| [Erigon](https://github.com/ledgerwatch/erigon) | Go       | Linux、Windows、macOS | 主网、Sepolia、Görli、Rinkeby、Ropsten 等 | 完全                           | Archive、Pruned |

**注意，OpenEthereum [已废弃](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)并已停止维护。**请谨慎使用，最好改用其他客户端实现。

有关受支持网络的更多信息，请仔细阅读[以太坊网络](/developers/docs/networks/)。

每种客户端都有独特的用例和优势，所以你应该根据自己的偏好来选择。 多样性使得实现能够侧重于不同的功能和用户群。 你可能想根据功能、支持、编程语言或许可证选择一种客户端。

### Besu {#besu}

Hyperledger Besu 是一种企业级以太坊客户端，面向公共网络和许可网络。 它运行包括追踪到 GraphQL 在内的所有以太坊主网功能，可进行广泛的监控，并通过开放的社区渠道以及面向企业的商业服务等级协议获得 ConsenSys 支持。 Besu 用 Java 语言编写，并依照 Apache 2.0 获得许可。

Besu 提供大量[相关文档](https://besu.hyperledger.org/en/stable/)，将指导你了解有关其功能和设置的所有详细信息。

### Erigon {#erigon}

Erigon 以前称为 Turbo‐Geth，最初是 Go Ethereum 的一个分叉，注重速度和磁盘空间效率。 Erigon 是一个完全重新架构的以太坊实现，目前用 Go 语言编写，但正在开发其他语言的实现。 Erigon 的目标是成为更快、模块化程度更高和更优化的以太坊实现。 它可以在 3 天内使用大约 2TB 的磁盘空间执行完整的存档节点同步。

### Go Ethereum {#geth}

Go Ethereum（简称 Geth）是最早实现的以太坊协议之一。 目前，它是使用最为广泛的客户端，拥有最大的用户群，为用户和开发者提供各种工具。 它用 Go 语言编写，完全开源，并依照 GNU LGPL v3 获得许可。

在[相关文档](https://geth.ethereum.org/docs/)中了解有关 Geth 的更多信息。

### Nethermind {#nethermind}

Nethermind 是使用 C# .NET 技术栈创建的以太坊实现，依照 LGPL-3.0 获得许可，可在包括 ARM 在内的所有主要平台上运行。 它在以下方面表现出了优越性能：

- 优化虚拟机
- 状态访问
- 联网和丰富的功能，如 Promethe/Graphana 仪表板、seq 企业日志支持、JSON RPC 跟踪和分析插件。

Nethermind 也有[详细的相关文档](https://docs.nethermind.io)、强大的开发支持、在线社区，并为高级用户提供全天候支持。

## 共识客户端（原“Eth2”客户端） {#consensus-clients}

有多种共识客户端（以前称为“以太坊 2”客户端）支持[共识升级](/roadmap/beacon-chain/)。 它们运行信标链，并且将在[合并](/roadmap/merge/)后向执行客户端提供权益证明共识机制。

| 客户端                                                        | 语言       | 操作系统：            | 网络                                                 |
| ------------------------------------------------------------- | ---------- | --------------------- | ---------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux、Windows、macOS | 信标链、Goerli、Pyrmont、Sepolia、Ropsten 等         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux、Windows、macOS | 信标链、Goerli、Sepolia、Ropsten 等                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux、Windows、macOS | 信标链、Goerli、Sepolia、Ropsten 等                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/)   | Go         | Linux、Windows、macOS | 信标链、Gnosis、Goerli、Pyrmont、Sepolia、Ropsten 等 |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux、Windows、macOS | 信标链、Gnosis、Goerli、Sepolia、Ropsten 等          |

### Lighthouse {#lighthouse}

Lighthouse 是一种共识客户端实现，它用 Rust 语言编写，并依照 Apache-2.0 获得许可。 它由 Sigma Prime 维护，自信标链创世以来一直保持稳定且可直接投入生产。 各类企业、质押池和个人都依赖它。 从台式电脑到复杂的自动化部署，Lighthouse 的目标是在各种环境中实现安全、高性能和互操作性。

相关文档可以在 [Lighthouse 手册](https://lighthouse-book.sigmaprime.io/)中找到。

### Lodestar {#lodestar}

Lodestar 是一种生产就绪共识客户端实现，它用 Typescript 语言编写，并依照 LGPL-3.0 获得许可。 它由 ChainSafe Systems 维护，是面向单独质押人、开发者和研究人员的最新共识客户端。 Lodestar 由信标节点和验证者客户端组成，由以太坊协议的 JavaScript 实现提供支持。 Lodestar 旨在通过轻客户端提高以太坊的可用性，让更多开发者获得可访问性，并进一步促进生态系统多样性。

更多信息可以在 [Lodestar 网站](https://lodestar.chainsafe.io/)找到。

### Nimbus {#nimbus}

Nimbus 是一种共识客户端实现，它用 Nim 语言编写，并依照 Apache-2.0 获得许可。 它是一种供单独质押人和质押池使用的生产就绪客户端。 Nimbus 专为提高资源效率而设计，可同样轻松地在资源有限的设备和企业级基础设施上运行，并且不会影响稳定性或奖励性能。 更少的资源占用意味着客户端在网络处于压力下时具有更大的安全边际。

它由 Trinity 实现。 其原理类似于快速同步，但是还会下载执行最新区块所需的数据，这样用户可以在开始后的最初几分钟内查询链上信息。

- 首先同步状态，并让你可以在几分钟内查询远程过程调用。
- 仍处于开发阶段，所以并不完全可靠，后台同步速度较慢，远程过程调用响应可能失败。

在 [Nimbus 相关文档中了解更多信息](https://nimbus.guide/)

### Prysm {#prysm}

Prysm 是一种功能齐全的开源共识客户端，它用 Go 语言编写，并依照 GPL-3.0 获得许可。 它具有可选的 Web 应用程序用户界面，并将个人用户和机构用户的用户体验、相关文档和可配置性放在首位。

访问 [Prysm 相关文档](https://docs.prylabs.network/docs/getting-started/)了解更多信息。

### Teku {#teku}

Teku 是最早的信标链初始客户端之一。 除了常规目标（安全性、稳健性、稳定性、可用性、性能）外，Teku 还特别致力于恪守全部各类共识客户端标准。

Teku 提供了非常灵活的部署选项。 信标节点和验证者客户端可以作为单个进程一起运行，这对于单独质押人来说非常方便，或者在处理复杂的质押操作时节点可以各自运行。 此外，Teku 实现了与 [Web3Signer](https://github.com/ConsenSys/web3signer/) 的完全互操作性，用于为密钥安全性签名并提供罚没防范措施。

Teku 用 Java 语言编写，并依照 Apache 2.0 获得许可。 它由 ConsenSys 的 Protocols 团队开发，该团队还负责 Besu 和 Web3Signer。 在 [Teku 相关文档](https://docs.teku.consensys.net/en/latest/)中了解更多信息。

## 同步模式 {#sync-modes}

为了关注和验证网络中的最新数据，以太坊客户端需要与最新网络状态同步。 同步方法如下：从对等节点下载数据，用加密方法验证其完整性，并构建一个本地区块链数据库。

同步模式代表了这个过程的不同方法，并进行了不同的折衷。 客户端在实现同步算法方面也各不相同。 有关部署的具体细节，请参考你所选客户端的官方文档。

### 执行层同步模式 {#execution-layer-sync-modes}

#### 完全同步 {#full-sync}

完全同步下载所有区块（包括区块头、交易和收据），并通过执行从创世块开始的每个区块逐步生成区块链的状态。

- 通过验证每笔交易，最大限度地减少信任并实现最高安全性。
- 随着交易数量的增加，处理所有交易可能需要几天到几周时间。

#### 快速同步 {#fast-sync}

快速同步下载所有区块（包括区块头、交易和收据），验证所有区块头，下载区块状态并对照区块头进行验证。

- 依赖共识机制的安全性。
- 完成同步只需要几个小时。

#### 轻量同步 {#light-sync}

轻客户端同步模式下载所有区块头和区块数据，并对其中一些进行随机验证。 仅从信任的检查点开始同步区块链信息。

- 仅获取最新状态，同时依赖于对开发者和共识机制的信任。
- 几分钟内客户端便可以使用并且具有当前网络状态。

[更多关于轻客户端的信息](https://www.parity.io/blog/what-is-a-light-client/)

#### 快照同步 {#snap-sync}

快照同步是最新的客户端同步方法，由 Geth 团队首创。 使用对等节点提供的动态快照，可以检索所有帐户和存储数据但不下载中间前缀树节点，然后在本地重建默克尔树。

- 最快的同步策略，目前是以太坊主网默认设置
- 节省大量磁盘使用和网络带宽，同时不影响安全

[更多关于快照同步的信息](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

| 客户端       | 磁盘大小（快速同步） | 磁盘大小（完整存档） |
| ------------ | -------------------- | -------------------- |
| Geth         | 400GB+               | 6TB+                 |
| OpenEthereum | 280GB+               | 6TB+                 |
| Nethermind   | 500GB+               | 12TB+                |
| Besu         | 750GB+               | 5TB+                 |
| Erigon       | 未提供               | 1TB+                 |

#### 乐观同步 {#optimistic-sync}

乐观同步是一种合并后同步策略，旨在选择加入和向后兼容，允许执行节点通过已建立的方法进行同步。 执行引擎可以在不进行完全验证的情况下*乐观地*导入信标区块，找到最新区块头，然后使用上述方法开始同步链。 然后，在执行客户端更新之后，它将通知共识客户端信标链中交易的有效性。

[更多关于乐观同步的信息](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### 检查点同步 {#checkpoint-sync}

检查点同步也称为弱主观性同步，可提供卓越的信标节点同步用户体验。 它基于[弱主观性](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/)假设，这使得信标链能够从最近的弱主观性检查点而不是创世块同步。 检查点同步使初始同步时间明显更快，其信任假设与从[创世块](/glossary/#genesis-block)同步类似。

实际上，这意味着你的节点连接到远程服务，以下载最近的最终确定状态并从该点继续验证数据。 提供数据的第三方要受到信任，应谨慎选择。

更多关于[检查点同步](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)的信息

## 延伸阅读 {#further-reading}

互联网上充斥着大量关于以太坊客户端的信息。 以下是一些可能有用的资源。

- [以太坊 101 - 第二部分 - 了解节点](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes，2019 年 2 月 13 日_
- [运行以太坊全节点：勉励者指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux，2019 年 11 月 7 日_

## 相关主题 {#related-topics}

- [区块](/developers/docs/blocks/)
- [网络](/developers/docs/networks/)

## 相关教程 {#related-tutorials}

- [运行 Geth 节点](/developers/tutorials/run-light-node-geth/) _– 如何下载、安装和运行 Geth。 涵盖同步模式、JavaScript 控制台等等。_
- [通过写入 MicroSD 卡将树莓派 4 变成验证者节点 – 安装指南](/developers/tutorials/run-node-raspberry-pi/) _– 写入你的树莓派 4，插入网线，连接固态硬盘并给设备供电，将树莓派 4 变成运行执行层（主网）和/或共识层（信标链/验证者）的以太坊全节点。_
