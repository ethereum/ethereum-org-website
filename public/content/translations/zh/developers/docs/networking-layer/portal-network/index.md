---
title: 门户网络
description: 门户网络概览 - 旨在为低资源客户端提供支持的开发中网络。
lang: zh
---

以太坊是由运行以太坊客户端软件的计算机组成的网络。 其中每一台电脑都称为“节点”。 客户端软件让节点能够发送和接收以太坊网络上的数据，并根据以太坊协议规则验证数据。 节点在其磁盘存储中保存大量历史数据，并且当它们从网络上的其他节点接收到新的数据包（即区块）时就添加到里面。 对于始终检查一个节点是否具有和网络其他部分一致的信息，这是必不可少的。 这意味着运行一个节点需要大量磁盘空间。 一些节点操作也需要占用大量 RAM。

为了解决这一磁盘存储问题，开发出了“轻”节点，它从全节点请求信息，而不是自己存储数据。 但是，这意味着轻节点无法独立验证信息，而是信任另一个节点。 它也意味着全节点需要承担额外的工作来服务那些轻节点。

门户网络是一种针对以太坊的新型网络设计，旨在通过在整个网络以小数据块的形式分享必要的数据，解决“轻”节点的数据可用性问题，让轻节点无需信任全节点或者向其增加额外压力。

关于[节点和客户端](/developers/docs/nodes-and-clients/)的更多信息

## 为什么需要门户网络 {#why-do-we-need-portal-network}

以太坊节点在本地存储以太坊区块链的全部或部分副本。 这个本地副本用来验证交易并确保节点追随正确的链。 这些本地存储的数据让节点能够独立验证传入的数据是否正确有效，而无需信任任何其他实体。

区块链以及相关状态和收据数据的本地副本占用节点硬盘中的大量空间。 例如，要运行使用 [Geth](https://geth.ethereum.org) 搭配一种共识客户端的节点，推荐 2TB 硬盘。 快照同步只存储近期一组区块的链数据，采用这种同步时，Geth 一般占用约 650 GB的磁盘空间但是所需空间以每周大概 14GB 的速度增长（你可以定期将节点删除到 650 GB）。

这意味着运行节点的成本相当昂贵，因为大量的磁盘空间必须专门给以太坊使用。 以太坊路线图上针对这个问题有几种解决方案，包括[历史数据到期](/roadmap/statelessness/#history-expiry)、[状态数据到期](/roadmap/statelessness/#state-expiry)和[无状态性](/roadmap/statelessness/)。 但是，这些方案很可能要好几年才能实现。 还有不自己保存链数据副本的[轻节点](/developers/docs/nodes-and-clients/light-clients/)，它们从全节点请求需要的数据。 然而，这意味着轻节点必须信任全节点会提供诚实的数据，并会给全节点带来压力，它们不得不提供轻节点所需的数据。

门户网络旨在提供一种可选方案，让轻节点无需信任全节点或者不会让全节点显著增加工作量，就可以获得需要的数据。 其运作原理是为以太坊节点引入了一种在整个网络中分享数据的新方式。

## 门户网络如何运作？ {#how-does-portal-network-work}

以太坊节点有着严格的协议，协议定义节点如何相互通信。 执行客户端使用一组子协议 [DevP2P](/developers/docs/networking-layer/#devp2p) 通信，而共识客户端使用一组不同的子协议 [libP2P](/developers/docs/networking-layer/#libp2p)。 这些子协议定义了可以在节点间传送的数据类型。

![devP2P 和 libP2P](portal-network-devp2p-libp2p.png)

节点还能通过 [JSON-RPC 应用程序接口](/developers/docs/apis/json-rpc/)提供特定数据，这就是应用程序和钱包与以太坊节点交换信息的方式。 但是，这些都不是为轻客户端提供数据的理想协议。

轻客户端目前不能通过 DevP2P 或 libP2p 请求特定的链数据，因为这些协议只用于支持链同步和区块与交易的传播。 轻客户端不想要下载这类信息，因为那将无法让它们保持“轻量”。

JSON-RPC 也不是轻客户端请求数据的理想选择，因为它必须要连接到能够提供数据的特定全节点或中心化远程过程调用提供者。 这意味着轻客户端必须信任特定节点或提供者是诚实的，并且全节点很可能不得不处理来自许多轻客户端的大量请求，这提高了它们对带宽的要求.

门户网络的关键是重新思考整个设计，为轻量化专门设计，摆脱现有以太坊客户端的设计限制。

门户网络的核心理念是采用目前网络堆栈的精华部分，它利用[分布式哈希表](https://en.wikipedia.org/wiki/Distributed_hash_table)，通过轻量级 DevP2P 风格的对等去中心化网络提供轻客户端所需的信息，比如历史数据和当前链头的身份（与 Bittorrent 类似）。

这种想法是将以太坊全部历史数据的一小部分和一些特定节点职责添加给每个节点。 然后，通过搜索所请求的特定数据的存储节点，从中检索数据完成请求。

这颠覆了轻节点请求数据的普通模式，即查找单个节点然后请求它们筛选并提供大量数据；相反，轻节点快速筛选大型节点网络，其中每个节点处理少量数据。

目标是允许去中心化轻量级门户客户端网络：

- 跟踪链头
- 同步最近的和历史链数据
- 检索状态数据
- 广播交易
- 使用[以太坊虚拟机](/developers/docs/evm/)执行交易

这种网络设计的优势在于：

- 减少对中心化提供者的依赖
- 减少网络带宽使用
- 最小化或零同步
- 可供资源有限的设备访问（\<1 GB 内存、\<100 MB 磁盘、1 个 CPU）

下表展示了门户网络可提供的现有客户端的功能，让用户可在极低资源设备上访问它们。

### 门户网络

| 信标轻客户端 | 状态网络    | 交易广播  | 历史数据网络 |
| ------ | ------- | ----- | ------ |
| 信标链轻节点 | 帐户与合约存储 | 轻量内存池 | 区块头    |
| 协议数据   |         |       | 区块体    |
|        |         |       | 收据     |

## 默认支持客户端多样性 {#client-diversity-as-default}

门户网络开发者一开始还做出了设计选择：构建三种不同的门户网络客户端。

这些门户网络客户端如下：

- [Trin](https://github.com/ethereum/trin)：用 Rust 编写
- [Fluffy](https://nimbus.team/docs/fluffy.html)：用 Nim 编写
- [Ultralight](https://github.com/ethereumjs/ultralight)：用 Typescript 编写
- [Shisui](https://github.com/optimism-java/shisui)：用 Go 编写

多种独立客户端实现提升了以太坊网络的弹性和去中心化。

如果一种客户端遇到问题或者出现漏洞，其他客户端能继续平稳运行，防止单点故障。 另外，多样化的客户端实现促进了创新和竞争，推动改进并降低生态系统内的单一作物风险。

## 延伸阅读 {#further-reading}

- [门户网络（Piper Merriam 在 Devcon Bogota 上的讲解）](https://www.youtube.com/watch?v=0stc9jnQLXA)。
- [门户网络 discord](https://discord.gg/CFFnmE7Hbs)
- [门户网络网站](https://www.ethportal.net/)
