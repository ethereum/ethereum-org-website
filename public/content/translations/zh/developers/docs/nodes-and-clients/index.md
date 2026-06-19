---
title: 节点和客户端
description: 以太坊节点和客户端软件概述，以及如何设置节点和为什么要设置节点。
lang: zh
sidebarDepth: 2
---

[以太坊](/)是一个由计算机（称为节点）组成的分布式网络，这些计算机运行可以验证区块和交易数据的软件。必须在你的计算机上运行该软件，才能将其变成一个以太坊节点。构成一个节点需要两个独立的软件（称为“客户端”）。

## 前提条件 {#prerequisites}

在深入了解并运行你自己的以太坊客户端实例之前，你应该了解点对点网络的概念以及[以太坊虚拟机 (EVM) 的基础知识](/developers/docs/evm/)。请参阅我们的[以太坊简介](/developers/docs/intro-to-ethereum/)。

如果你对节点这个主题比较陌生，我们建议你首先查看我们关于[运行以太坊节点](/run-a-node)的通俗易懂的介绍。

## 什么是节点和客户端？ {#what-are-nodes-and-clients}

“节点”是指连接到其他同样运行以太坊软件的计算机并形成网络的任何以太坊客户端软件实例。客户端是以太坊的一种实现，它根据协议规则验证数据并保持网络安全。一个节点必须运行两个客户端：一个共识客户端和一个执行客户端。

- 执行客户端（也称为执行引擎、EL 客户端或以前的 Eth1 客户端）侦听网络中广播的新交易，在 EVM 中执行它们，并保存所有当前以太坊数据的最新状态和数据库。
- 共识客户端（也称为信标节点、CL 客户端或以前的 Eth2 客户端）实现了权益证明 (PoS) 共识算法，该算法使网络能够根据来自执行客户端的已验证数据达成一致。还有第三个软件，称为“验证者”，可以添加到共识客户端中，允许节点参与保护网络。

这些客户端协同工作以跟踪以太坊链的头部，并允许用户与以太坊网络进行交互。这种由多个软件协同工作的模块化设计被称为[封装复杂性](https://vitalik.eth.limo/general/2022/02/28/complexity.html)。这种方法使得无缝执行[合并](/roadmap/merge)变得更加容易，使客户端软件更易于维护和开发，并实现了单个客户端的重用，例如在[二层网络 (l2) 生态系统](/layer-2/)中。

![Coupled execution and consensus clients](./eth1eth2client.png)
耦合的执行客户端和共识客户端的简化图。

### 客户端多样性 {#client-diversity}

[执行客户端](/developers/docs/nodes-and-clients/#execution-clients)和[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)都有由不同团队使用各种编程语言开发的版本。

多种客户端实现可以通过减少对单一代码库的依赖来使网络更加强大。理想的目标是实现多样性，而没有任何一个客户端主导网络，从而消除潜在的单点故障。
语言的多样性也吸引了更广泛的开发者社区，并允许他们使用自己喜欢的语言创建集成。

了解有关[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)的更多信息。

这些实现的共同点是它们都遵循单一的规范。规范规定了以太坊网络和区块链的运作方式。每个技术细节都已定义，规范可以在以下位置找到：

- 最初的[以太坊黄皮书](https://ethereum.github.io/yellowpaper/paper.pdf)
- [执行规范](https://github.com/ethereum/execution-specs/)
- [共识规范](https://github.com/ethereum/consensus-specs)
- 在各种[网络升级](/ethereum-forks/)中实现的 [EIP](https://eips.ethereum.org/)

### 跟踪网络中的节点 {#network-overview}

多个跟踪器提供了以太坊网络中节点的实时概览。请注意，由于去中心化网络的性质，这些爬虫只能提供网络的有限视图，并且可能会报告不同的结果。

- Etherscan 的[节点地图](https://etherscan.io/nodetracker)
- Bitfly 的 [Ethernodes](https://ethernodes.org/)
- Chainsafe 的 [Nodewatch](https://www.nodewatch.io/)，爬取共识节点
- MigaLabs 的 [Monitoreth](https://monitoreth.io/)，一个分布式网络监控工具
- ProbeLab 的[每周网络健康报告](https://probelab.io)，使用 [Nebula 爬虫](https://github.com/dennis-tra/nebula)和其他工具

## 节点类型 {#node-types}

如果你想[运行自己的节点](/developers/docs/nodes-and-clients/run-a-node/)，你应该了解有不同类型的节点，它们使用数据的方式也不同。事实上，客户端可以运行三种不同类型的节点：轻节点、全节点和归档节点。还有不同同步策略的选项，可以实现更快的同步时间。同步是指它获取以太坊状态最新信息的速度。

### 全节点 {#full-node}

全节点对区块链进行逐块的区块验证，包括下载和验证每个区块的区块体和状态数据。全节点有不同的类别——有些从创世区块开始，验证区块链整个历史中的每一个区块。其他节点则从它们信任为有效的较新区块开始验证（例如，Geth 的“快照同步”）。无论验证从哪里开始，全节点只保留相对较新数据（通常是最近的 128 个区块）的本地副本，允许删除旧数据以节省磁盘空间。旧数据可以在需要时重新生成。

- 存储完整的区块链数据（尽管这会定期修剪，因此全节点不会存储追溯到创世区块的所有状态数据）
- 参与区块验证，验证所有区块和状态。
- 全节点可以从本地存储中检索所有状态，也可以从“快照”中重新生成所有状态。
- 为网络提供服务并根据请求提供数据。

### 归档节点 {#archive-node}

归档节点是验证从创世区块开始的每个区块并且从不删除任何下载数据的全节点。

- 存储全节点中保留的所有内容，并建立历史状态的归档。如果你想查询诸如第 4,000,000 个区块的账户余额之类的信息，或者只是可靠地测试你自己的交易集而无需使用跟踪来验证它们，则需要它。
- 这些数据以太字节 (TB) 为单位，这使得归档节点对普通用户的吸引力降低，但对于区块浏览器、钱包供应商和链上分析等服务来说却很方便。

在除归档之外的任何模式下同步客户端都会导致区块链数据被修剪。这意味着，没有所有历史状态的归档，但全节点能够按需构建它们。

了解有关[归档节点](/developers/docs/nodes-and-clients/archive-nodes)的更多信息。

### 轻节点 {#light-node}

轻节点不下载每个区块，而只下载区块头。这些区块头包含有关区块内容的摘要信息。轻节点所需的任何其他信息都会向全节点请求。然后，轻节点可以根据区块头中的状态根独立验证它们接收到的数据。轻节点使用户能够参与以太坊网络，而无需运行全节点所需的强大硬件或高带宽。最终，轻节点可能会在手机或嵌入式设备上运行。轻节点不参与共识（即它们不能成为验证者），但它们可以访问以太坊区块链，并具有与全节点相同的功能和安全保证。

轻客户端是以太坊积极开发的一个领域，我们期望很快能看到用于共识层和执行层的新轻客户端。
还有一些潜在的途径可以通过 [gossip 网络](https://www.ethportal.net/)提供轻客户端数据。这是有利的，因为 gossip 网络可以支持轻节点网络，而不需要全节点来处理请求。

以太坊目前还不支持大量的轻节点，但轻节点支持是预计在不久的将来会快速发展的一个领域。特别是，像 [尼姆巴斯](https://nimbus.team/)、[Helios](https://github.com/a16z/helios) 和 [洛德斯塔](https://lodestar.chainsafe.io/) 这样的客户端目前非常关注轻节点。

## 为什么要运行以太坊节点？ {#why-should-i-run-an-ethereum-node}

运行节点允许你直接、无须信任且私密地使用以太坊，同时通过保持网络更加健壮和去中心化来支持网络。

### 对你的好处 {#benefits-to-you}

运行你自己的节点使你能够以私密、自给自足和无须信任的方式使用以太坊。你不需要信任网络，因为你可以使用你的客户端自己验证数据。“不要信任，要验证”是一句流行的区块链格言。

- 你的节点会自行根据共识规则验证所有交易和区块。这意味着你不必依赖网络中的任何其他节点或完全信任它们。
- 你可以将以太坊钱包与你自己的节点一起使用。你可以更安全、更私密地使用去中心化应用 (dapp)，因为你不必向中介泄露你的地址和余额。一切都可以用你自己的客户端进行检查。[梅塔马斯克](https://metamask.io)、[Frame](https://frame.sh/) 和[许多其他钱包](/wallets/find-wallet/)提供 RPC 导入功能，允许它们使用你的节点。
- 你可以运行和自托管依赖于以太坊数据的其他服务。例如，这可能是信标链验证者、二层网络 (l2) 等软件、基础设施、区块浏览器、支付处理器等。
- 你可以提供自己的自定义 [RPC 端点](/developers/docs/apis/json-rpc/)。你甚至可以向社区公开提供这些端点，以帮助他们避开大型中心化提供商。
- 你可以使用**进程间通信 (IPC)** 连接到你的节点，或者重写节点以将你的程序作为插件加载。这提供了低延迟，这非常有帮助，例如，当使用 Web3 库处理大量数据时，或者当你需要尽可能快地替换交易时（即抢跑）。
- 你可以直接质押 ETH 来保护网络并赚取奖励。请参阅[独立质押](/staking/solo/)以开始使用。

![How you access Ethereum via your application and nodes](./nodes.png)

### 网络优势 {#network-benefits}

多样化的节点集对于以太坊的健康、安全和运营弹性非常重要。

- 全节点强制执行共识规则，因此它们不会被欺骗去接受不遵循这些规则的区块。这在网络中提供了额外的安全性，因为如果所有节点都是不进行全面验证的轻节点，验证者就可以攻击网络。
- 如果发生克服了[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos/#what-is-pos)加密经济防御的攻击，全节点可以通过选择跟随诚实链来执行社交恢复。
- 网络中更多的节点会带来更加多样化和健壮的网络，这是去中心化的最终目标，它实现了一个抗审查和可靠的系统。
- 全节点为依赖区块链数据的轻量级客户端提供访问权限。轻节点不存储整个区块链，而是通过[区块头中的状态根](/developers/docs/blocks/#block-anatomy)验证数据。如果需要，它们可以向全节点请求更多信息。

如果你运行一个全节点，整个以太坊网络都会从中受益，即使你不运行验证者。

## 运行你自己的节点 {#running-your-own-node}

有兴趣运行你自己的以太坊客户端吗？

如需适合初学者的介绍，请访问我们的[运行节点](/run-a-node)页面以了解更多信息。

如果你更偏向于技术用户，请深入了解有关如何[启动你自己的节点](/developers/docs/nodes-and-clients/run-a-node/)的更多详细信息和选项。

## 替代方案 {#alternatives}

设置你自己的节点可能会花费你时间和资源，但你并不总是需要运行自己的实例。在这种情况下，你可以使用第三方 API 提供商。有关使用这些服务的概述，请查看[节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)。

如果有人在你的社区中运行带有公共 API 的以太坊节点，你可以通过自定义 RPC 将你的钱包指向社区节点，并获得比使用某些随机受信任的第三方更多的隐私。

另一方面，如果你运行一个客户端，你可以与可能需要它的朋友分享。

## 执行客户端 {#execution-clients}

以太坊社区维护着多个开源执行客户端（以前称为“Eth1 客户端”，或简称为“以太坊客户端”），由不同团队使用不同的编程语言开发。这使得网络更加强大和[多样化](/developers/docs/nodes-and-clients/client-diversity/)。理想的目标是实现多样性，而没有任何客户端占据主导地位，以减少任何单点故障。

下表总结了不同的客户端。它们都通过了[客户端测试](https://github.com/ethereum/tests)，并得到积极维护以跟上网络升级的步伐。

| 客户端                                                                   | 语言   | 操作系统     | 网络                | 同步策略                                            | 状态修剪   |
| ------------------------------------------------------------------------ | ---------- | --------------------- | ----------------------- | ---------------------------------------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)                                       | Go         | Linux, Windows, macOS | 主网、Sepolia、Hoodi | [快照](#snap-sync)、[完整](#full-sync)                     | 归档、已修剪 |
| [Nethermind](https://www.nethermind.io/)                                 | C#, .NET   | Linux, Windows, macOS | 主网、Sepolia、Hoodi | [快照](#snap-sync)、快速、[完整](#full-sync)               | 归档、已修剪 |
| [Besu](https://besu.hyperledger.org/en/stable/)                          | Java       | Linux, Windows, macOS | 主网、Sepolia、Hoodi | [快照](#snap-sync)、[快速](#fast-sync)、[完整](#full-sync) | 归档、已修剪 |
| [Erigon](https://github.com/ledgerwatch/erigon)                          | Go         | Linux, Windows, macOS | 主网、Sepolia、Hoodi | [完整](#full-sync)                                         | 归档、已修剪 |
| [Reth](https://reth.rs/)                                                 | Rust       | Linux, Windows, macOS | 主网、Sepolia、Hoodi | [完整](#full-sync)                                         | 归档、已修剪 |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(测试版)_ | TypeScript | Linux, Windows, macOS | Sepolia、Hoodi          | [完整](#full-sync)                                         | 已修剪          |

有关支持的网络的更多信息，请阅读[以太坊网络](/developers/docs/networks/)。

每个客户端都有独特的用例和优势，因此你应该根据自己的偏好选择一个。多样性允许实现专注于不同的功能和用户受众。你可能希望根据功能、支持、编程语言或许可证来选择客户端。

### 贝苏 {#besu}

Hyperledger Besu 是一个用于公共和许可型网络的企业级以太坊客户端。它运行所有以太坊主网功能，从跟踪到 GraphQL，具有广泛的监控，并由 ConsenSys 在开放社区渠道和通过企业商业 SLA 提供支持。它是用 Java 编写的，并获得 Apache 2.0 许可。

贝苏广泛的[文档](https://besu.hyperledger.org/en/stable/)将引导你了解有关其功能和设置的所有详细信息。

### 埃里贡 {#erigon}

埃里贡（以前称为 Turbo-Geth）最初是 Go以太坊 (Geth) 的一个分叉，旨在提高速度和磁盘空间效率。埃里贡是一个完全重新架构的以太坊实现，目前用 Go 编写，但其他语言的实现正在开发中。埃里贡的目标是提供一个更快、更模块化和更优化的以太坊实现。它可以在不到 3 天的时间内使用大约 2TB 的磁盘空间执行完整的归档节点同步。

### Go以太坊 (Geth) {#geth}

Go以太坊 (Geth)（简称 Geth）是以太坊协议的最初实现之一。目前，它是最广泛的客户端，拥有最大的用户群以及为用户和开发者提供的各种工具。它是用 Go 编写的，完全开源，并根据 GNU LGPL v3 获得许可。

在它的[文档](https://geth.ethereum.org/docs)中了解有关 Geth 的更多信息。

### 奈瑟曼德 {#nethermind}

奈瑟曼德是一个使用 C# .NET 技术栈创建的以太坊实现，获得 LGPL-3.0 许可，可在包括 ARM 在内的所有主要平台上运行。它提供了卓越的性能，具有：

- 优化的虚拟机
- 状态访问
- 网络和丰富的功能，如 Prometheus/Grafana 仪表板、seq 企业日志记录支持、JSON-RPC 跟踪和分析插件。

奈瑟曼德还拥有[详细的文档](https://docs.nethermind.io)、强大的开发支持、在线社区以及为高级用户提供的 24/7 全天候支持。

### 瑞斯 {#reth}

瑞斯（Rust Ethereum 的缩写）是一个以太坊全节点实现，专注于用户友好、高度模块化、快速和高效。瑞斯最初由 Paradigm 构建和推动，并根据 Apache 和 MIT 许可证获得许可。

瑞斯已准备好投入生产，适用于关键任务环境，例如质押或高正常运行时间服务。在需要具有巨大余量的高性能的用例中表现良好，例如 RPC、最大可提取价值 (MEV)、索引、模拟和点对点活动。

通过查看 [Reth Book](https://reth.rs/) 或 [Reth GitHub 仓库](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth)了解更多信息。

### 开发中 {#execution-in-development}

这些客户端仍处于早期开发阶段，尚不建议用于生产环境。

#### EthereumJS {#ethereumjs}

EthereumJS 执行客户端 (EthereumJS) 是用 TypeScript 编写的，由许多包组成，包括由区块、交易和默克尔帕特里夏树 (Merkle-Patricia Trie) 类表示的核心以太坊原语，以及核心客户端组件，包括以太坊虚拟机 (EVM) 的实现、区块链类和 devp2p 网络堆栈。

通过阅读其[文档](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master)了解更多信息

## 共识客户端 {#consensus-clients}

有多个共识客户端（以前称为“Eth2”客户端）来支持[共识升级](/roadmap/beacon-chain/)。它们负责所有与共识相关的逻辑，包括分叉选择算法、处理证明以及管理[权益证明 (PoS)](/developers/docs/consensus-mechanisms/pos)奖励和罚没。

| 客户端                                                        | 语言   | 操作系统     | 网络                                                |
| ------------------------------------------------------------- | ---------- | --------------------- | ------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | 信标链、Hoodi、Pyrmont、Sepolia 等         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | 信标链、Hoodi、Sepolia 等                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | 信标链、Hoodi、Sepolia 等                  |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | 信标链、Gnosis、Hoodi、Pyrmont、Sepolia 等 |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | 信标链、Gnosis、Hoodi、Sepolia 等          |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | 信标链、Hoodi、Sepolia 等                  |

### 莱特豪斯 {#lighthouse}

莱特豪斯是一个用 Rust 编写的共识客户端实现，采用 Apache-2.0 许可证。它由 Sigma Prime 维护，自信标链创世以来一直稳定且可用于生产。它受到各种企业、质押池和个人的信赖。它的目标是在从台式电脑到复杂的自动化部署等各种环境中保持安全、高性能和可互操作。

文档可以在 [Lighthouse Book](https://lighthouse-book.sigmaprime.io/) 中找到

### 洛德斯塔 {#lodestar}

洛德斯塔是一个可用于生产的共识客户端实现，用 TypeScript 编写，采用 LGPL-3.0 许可证。它由 ChainSafe Systems 维护，是面向独立质押者、开发者和研究人员的最新共识客户端。洛德斯塔由信标节点和验证者客户端组成，由以太坊协议的 JavaScript 实现提供支持。洛德斯塔旨在通过轻客户端提高以太坊的可用性，扩大对更多开发者的可访问性，并进一步促进生态系统的多样性。

更多信息可以在[洛德斯塔网站](https://lodestar.chainsafe.io/)上找到

### 尼姆巴斯 {#nimbus}

尼姆巴斯是一个用 Nim 编写的共识客户端实现，采用 Apache-2.0 许可证。它是一个可用于生产的客户端，被独立质押者和质押池使用。尼姆巴斯专为资源效率而设计，使其能够轻松地在资源受限的设备和企业基础设施上运行，而不会影响稳定性或奖励性能。更轻的资源占用意味着当网络处于压力之下时，客户端具有更大的安全裕度。

在[尼姆巴斯文档](https://nimbus.guide/)中了解更多信息

### 普莱斯姆 {#prysm}

普莱斯姆是一个功能齐全的开源共识客户端，用 Go 编写，采用 GPL-3.0 许可证。它具有可选的 Web 应用程序 UI，并优先考虑家庭质押用户和机构用户的用户体验、文档和可配置性。

访问[普莱斯姆文档](https://prysm.offchainlabs.com/docs/)以了解更多信息。

### 泰库 {#teku}

泰库是最初的信标链创世客户端之一。除了通常的目标（安全性、稳健性、稳定性、可用性、性能）之外，泰库还特别致力于完全遵守所有各种共识客户端标准。

泰库提供非常灵活的部署选项。信标节点和验证者客户端可以作为单个进程一起运行，这对于独立质押者来说非常方便，或者节点可以分开运行以进行复杂的质押操作。此外，泰库与 [Web3Signer](https://github.com/ConsenSys/web3signer/) 完全可互操作，以实现签名密钥安全和罚没保护。

泰库是用 Java 编写的，并获得 Apache 2.0 许可。它由 ConsenSys 的协议团队开发，该团队也负责贝苏和 Web3Signer。在[泰库文档](https://docs.teku.consensys.net/en/latest/)中了解更多信息。

### Grandine {#grandine}

Grandine 是一个共识客户端实现，用 Rust 编写，采用 GPL-3.0 许可证。它由 Grandine 核心团队维护，具有快速、高性能和轻量级的特点。它适合广泛的质押者，从在 Raspberry Pi 等低资源设备上运行的独立质押者，到运行数万个验证者的大型机构质押者。

文档可以在 [Grandine Book](https://docs.grandine.io/) 中找到

## 同步模式 {#sync-modes}

为了跟踪和验证网络中的当前数据，以太坊客户端需要与最新的网络状态同步。这是通过从对等节点下载数据、以加密方式验证其完整性并构建本地区块链数据库来完成的。

同步模式代表了此过程的不同方法，并具有各种权衡。客户端在同步算法的实现上也有所不同。请始终参考你所选客户端的官方文档以了解实现的具体细节。

### 执行层同步模式 {#execution-layer-sync-modes}

执行层可以以不同的模式运行以适应不同的用例，从重新执行区块链的世界状态到仅从受信任的检查点与链的顶端同步。

#### 完整同步 {#full-sync}

完整同步会下载所有区块（包括区块头和区块体），并通过执行从创世区块开始的每个区块来增量重新生成区块链的状态。

- 通过验证每笔交易，最大限度地减少信任并提供最高的安全性。
- 随着交易数量的增加，处理所有交易可能需要几天到几周的时间。

[归档节点](#archive-node)执行完整同步，以构建（并保留）每个区块中每笔交易进行的状态更改的完整历史记录。

#### 快速同步 {#fast-sync}

与完整同步一样，快速同步会下载所有区块（包括区块头、交易和收据）。然而，快速同步不重新处理历史交易，而是依赖于收据，直到它到达最近的头部，此时它切换到导入和处理区块以提供全节点。

- 快速同步策略。
- 减少处理需求以利于带宽使用。

#### 快照同步 {#snap-sync}

快照同步也逐块验证链。然而，快照同步不是从创世区块开始，而是从已知是真实区块链一部分的较新“受信任”检查点开始。节点保存定期检查点，同时删除超过一定期限的数据。这些快照用于根据需要重新生成状态数据，而不是永久存储它。

- 最快的同步策略，目前是以太坊主网的默认策略。
- 在不牺牲安全性的情况下节省大量磁盘使用量和网络带宽。

[有关快照同步的更多信息](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)。

#### 轻同步 {#light-sync}

轻客户端模式下载所有区块头、区块数据，并随机验证一些。仅从受信任的检查点同步链的顶端。

- 仅获取最新状态，同时依赖于对开发者和共识机制的信任。
- 客户端在几分钟内即可使用当前网络状态。

**注意** 轻同步尚不适用于权益证明 (PoS) 以太坊——新版本的轻同步应该很快就会发布！

[有关轻客户端的更多信息](/developers/docs/nodes-and-clients/light-clients/)

### 共识层同步模式 {#consensus-layer-sync-modes}

#### 乐观同步 {#optimistic-sync}

乐观同步是一种合并后的同步策略，旨在成为可选且向后兼容的，允许执行节点通过既定方法进行同步。执行引擎可以_乐观地_导入信标区块而无需完全验证它们，找到最新的头部，然后开始使用上述方法同步链。然后，在执行客户端赶上之后，它将通知共识客户端信标链中交易的有效性。

[有关乐观同步的更多信息](https://github.com/ethereum/consensus-specs/blob/master/sync/optimistic.md)

#### 检查点同步 {#checkpoint-sync}

检查点同步，也称为弱主观性同步，为同步信标节点创造了卓越的用户体验。它基于[弱主观性](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/)的假设，这使得能够从最近的弱主观性检查点而不是创世区块同步信标链。检查点同步使初始同步时间显着加快，其信任假设与从[创世区块](/glossary/#genesis-block)同步相似。

在实践中，这意味着你的节点连接到远程服务以下载最近已最终确定的状态，并从该点继续验证数据。提供数据的第三方是受信任的，应仔细挑选。

有关[检查点同步](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)的更多信息

## 延伸阅读 {#further-reading}

- [以太坊 101 - 第 2 部分 - 了解节点](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes，2019 年 2 月 13 日_
- [运行以太坊全节点：给动力不足者的指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux，2019 年 11 月 7 日_

## 相关主题 {#related-topics}

- [区块](/developers/docs/blocks/)
- [网络](/developers/docs/networks/)

## 相关教程 {#related-tutorials}

- [只需刷入 MicroSD 卡即可将你的 Raspberry Pi 4 变成验证者节点 – 安装指南](/developers/tutorials/run-node-raspberry-pi/) _– 刷入你的 Raspberry Pi 4，插入以太网电缆，连接 SSD 磁盘并启动设备，即可将 Raspberry Pi 4 变成运行执行层（主网）和/或共识层（信标链/验证者）的完整以太坊节点。_