---
title: "网络层"
description: "以太坊网络层简介。"
lang: zh
sidebarDepth: 2
---

[以太坊](/)是一个点对点网络，拥有成千上万个节点，这些节点必须能够使用标准化的协议相互通信。“网络层”是允许这些节点相互发现并交换信息的协议栈。这包括在网络上“流言传播”信息（一对多通信），以及在特定节点之间交换请求和响应（一对一通信）。每个节点必须遵守特定的网络规则，以确保它们发送和接收正确的信息。

客户端软件分为两部分（执行客户端和共识客户端），每部分都有自己独立的网络栈。除了与其他以太坊节点通信外，执行客户端和共识客户端还必须相互通信。本页面对实现这种通信的协议进行了入门级的解释。

执行客户端在执行层点对点网络上通过流言协议传播交易。这需要经过身份验证的对等节点之间进行加密通信。当验证者被选中提议区块时，来自节点本地交易池的交易将通过本地 RPC 连接传递给共识客户端，并被打包到信标区块中。然后，共识客户端将在其点对点网络中通过流言协议传播信标区块。这需要两个独立的点对点网络：一个连接执行客户端用于交易流言传播，另一个连接共识客户端用于区块流言传播。

## 先决条件 {#prerequisites}

了解一些关于以太坊[节点和客户端](/developers/docs/nodes-and-clients/)的知识将有助于理解本页面。

## 执行层 {#execution-layer}

执行层的网络协议分为两个栈：

- 发现栈：建立在 UDP 之上，允许新节点发现要连接的对等节点

- devp2p 栈：位于 TCP 之上，使节点能够交换信息

这两个栈并行工作。发现栈将新的网络参与者引入网络，而 devp2p 栈则实现它们之间的交互。

### 发现 {#discovery}

发现是在网络中寻找其他节点的过程。这是使用一小部分引导节点（其地址被[硬编码](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go)到客户端中的节点，以便可以立即找到它们并将客户端连接到对等节点）来引导的。这些引导节点的存在仅仅是为了将新节点介绍给一组对等节点——这是它们的唯一目的，它们不参与同步链等正常的客户端任务，并且仅在客户端首次启动时使用。

用于节点与引导节点交互的协议是 [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) 的修改版本，它使用[分布式哈希表](https://en.wikipedia.org/wiki/Distributed_hash_table)来共享节点列表。每个节点都有该表的一个版本，其中包含连接到其最近对等节点所需的信息。这种“接近度”不是地理上的——距离是由节点 ID 的相似性定义的。作为一项安全功能，每个节点的表都会定期刷新。例如，在 [discv5](https://github.com/ethereum/devp2p/tree/master/discv5) 中，发现协议节点还能够发送显示客户端支持的子协议的“广告”，允许对等节点协商它们都可以用来通信的协议。

发现过程从 PING-PONG（乒乓）游戏开始。一次成功的 PING-PONG 会将新节点与引导节点“绑定”。提醒引导节点有新节点进入网络的初始消息是 `PING`。此 `PING` 包含有关新节点、引导节点和过期时间戳的哈希信息。引导节点接收 `PING` 并返回包含 `PING` 哈希的 `PONG`。如果 `PING` 和 `PONG` 哈希匹配，则新节点和引导节点之间的连接得到验证，它们被称为已“绑定”。

一旦绑定，新节点就可以向引导节点发送 `FIND-NEIGHBOURS` 请求。引导节点返回的数据包含新节点可以连接的对等节点列表。如果节点未绑定，`FIND-NEIGHBOURS` 请求将失败，因此新节点将无法进入网络。

一旦新节点从引导节点收到邻居列表，它就会开始与它们中的每一个进行 PING-PONG 交换。成功的 PING-PONG 会将新节点与其邻居绑定，从而实现消息交换。

```
启动客户端 --> 连接到引导节点 --> 绑定到引导节点 --> 寻找邻居 --> 绑定到邻居
```

执行客户端目前使用 [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) 发现协议，并且正在积极努力迁移到 [discv5](https://github.com/ethereum/devp2p/tree/master/discv5) 协议。

#### ENR：以太坊节点记录 {#enr}

[以太坊节点记录 (ENR)](/developers/docs/networking-layer/network-addresses/) 是一个包含三个基本元素的对象：签名（根据某些商定的身份方案生成的记录内容的哈希）、跟踪记录更改的序列号以及任意的键值对列表。这是一种面向未来的格式，允许新对等节点之间更轻松地交换身份信息，并且是以太坊节点首选的[网络地址](/developers/docs/networking-layer/network-addresses)格式。

#### 为什么发现建立在 UDP 之上？ {#why-udp}

UDP 不支持任何错误检查、重新发送失败的数据包或动态打开和关闭连接——相反，它只是向目标发射连续的信息流，而不管它是否被成功接收。这种最少的功能也转化为最小的开销，使得这种连接非常快。对于发现而言，节点只是想表明自己的存在，以便随后与对等节点建立正式连接，UDP 就足够了。然而，对于网络栈的其余部分，UDP 并不适用。节点之间的信息交换非常复杂，因此需要一个功能更全面的协议来支持重新发送、错误检查等。与 TCP 相关的额外开销对于其提供的额外功能来说是值得的。因此，大多数点对点栈都在 TCP 上运行。

### devp2p {#devp2p}

devp2p 本身就是以太坊为建立和维护点对点网络而实现的一整套协议栈。新节点进入网络后，它们的交互由 [devp2p](https://github.com/ethereum/devp2p) 栈中的协议控制。这些协议都位于 TCP 之上，包括 RLPx 传输协议、有线协议和几个子协议。[RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) 是控制节点之间发起、验证和维护会话的协议。RLPx 使用 RLP（递归长度前缀）对消息进行编码，这是一种非常节省空间的编码方法，可将数据编码为最小结构以便在节点之间发送。

两个节点之间的 RLPx 会话从初始的加密握手开始。这涉及节点发送身份验证消息，然后由对等节点进行验证。验证成功后，对等节点生成身份验证确认消息以返回给发起节点。这是一个密钥交换过程，使节点能够私密且安全地通信。成功的加密握手随后会触发两个节点在“线路上”向彼此发送“hello”消息。有线协议由成功交换 hello 消息而启动。

hello 消息包含：

- 协议版本
- 客户端 ID
- 端口
- 节点 ID
- 支持的子协议列表

这是成功交互所需的信息，因为它定义了两个节点之间共享的功能并配置了通信。存在一个子协议协商过程，其中比较每个节点支持的子协议列表，并且两个节点共有的子协议可以在会话中使用。

除了 hello 消息之外，有线协议还可以发送“disconnect”消息，向对等节点发出连接将关闭的警告。有线协议还包括定期发送的 PING 和 PONG 消息，以保持会话打开。因此，RLPx 和有线协议交换奠定了节点之间通信的基础，为根据特定子协议交换有用信息提供了框架。

### 子协议 {#sub-protocols}

#### 有线协议 {#wire-protocol}

一旦对等节点连接并且 RLPx 会话已经开始，有线协议就定义了对等节点如何通信。最初，有线协议定义了三个主要任务：链同步、区块传播和交易交换。然而，一旦以太坊切换到权益证明 (PoS)，区块传播和链同步就成为了共识层的一部分。交易交换仍然属于执行客户端的职权范围。交易交换是指在节点之间交换待处理的交易，以便区块构建者可以选择其中一些包含在下一个区块中。有关这些任务的详细信息，请参见[此处](https://github.com/ethereum/devp2p/blob/master/caps/eth.md)。支持这些子协议的客户端通过 [JSON-RPC](/developers/docs/apis/json-rpc/) 暴露它们。

#### les（轻以太坊子协议） {#les}

这是用于同步轻客户端的最小协议。传统上，该协议很少被使用，因为全节点需要在没有激励的情况下向轻客户端提供数据。执行客户端的默认行为是不通过 les 提供轻客户端数据。更多信息可在 les [规范](https://github.com/ethereum/devp2p/blob/master/caps/les.md)中找到。

#### Snap {#snap}

[snap 协议](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap)是一个可选扩展，允许对等节点交换最近状态的快照，从而允许对等节点验证账户和存储数据，而无需下载中间的默克尔树节点。

#### Wit（见证数据协议） {#wit}

[见证数据协议](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit)是一个可选扩展，支持在对等节点之间交换状态见证数据，帮助将客户端同步到链的顶端。

#### Whisper {#whisper}

Whisper 是一个旨在在对等节点之间传递安全消息而不向区块链写入任何信息的协议。它是 devp2p 有线协议的一部分，但现在已被弃用。存在具有类似目标的其他[相关项目](https://wakunetwork.com/)。

## 共识层 {#consensus-layer}

共识客户端参与具有不同规范的独立点对点网络。共识客户端需要参与区块流言传播，以便它们可以从对等节点接收新区块，并在轮到它们成为区块提议者时广播它们。与执行层类似，这首先需要一个发现协议，以便节点可以找到对等节点并建立安全会话来交换区块、证明等。

### 发现 {#consensus-discovery}

与执行客户端类似，共识客户端使用基于 UDP 的 [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) 来寻找对等节点。共识层的 discv5 实现与执行客户端的实现不同之处仅在于，它包含一个将 discv5 连接到 [libp2p](https://libp2p.io/) 栈的适配器，从而弃用了 devp2p。执行层的 RLPx 会话被弃用，取而代之的是 libp2p 的 noise 安全通道握手。

### ENR {#consensus-enr}

共识节点的 ENR 包括节点的公钥、IP 地址、UDP 和 TCP 端口以及两个特定于共识的字段：证明子网位域和 `eth2` 密钥。前者使节点更容易找到参与特定证明流言传播子网的对等节点。`eth2` 密钥包含有关节点正在使用哪个以太坊分叉版本的信息，确保对等节点连接到正确的以太坊。

### libp2p {#libp2p}

libp2p 栈支持发现之后的所有通信。客户端可以根据其 ENR 中的定义在 IPv4 和/或 IPv6 上拨号和监听。libp2p 层上的协议可以细分为流言传播和请求/响应（req/resp）域。

### 流言传播 {#gossip}

流言传播域包括必须在整个网络中快速传播的所有信息。这包括信标区块、证明、退出和罚没。这是使用 libp2p gossipsub v1 传输的，并依赖于每个节点本地存储的各种元数据，包括接收和传输的流言传播负载的最大大小。有关流言传播域的详细信息，请参见[此处](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub)。

### 请求-响应 {#request-response}

请求-响应域包含客户端向其对等节点请求特定信息的协议。示例包括请求匹配特定根哈希或在一定时隙范围内的特定信标区块。响应始终作为经过 snappy 压缩的 SSZ 编码字节返回。

## 为什么共识客户端更喜欢 SSZ 而不是 RLP？ {#ssz-vs-rlp}

SSZ 代表简单序列化。它使用固定的偏移量，使得解码编码消息的各个部分变得容易，而无需解码整个结构，这对于共识客户端非常有用，因为它可以有效地从编码消息中获取特定的信息片段。它还专门设计用于与默克尔协议集成，从而提高了默克尔化的相关效率。由于共识层中的所有哈希都是默克尔根，这加起来是一个显著的改进。SSZ 还保证了值的唯一表示。

## 连接执行客户端和共识客户端 {#connecting-clients}

共识客户端和执行客户端并行运行。它们需要连接起来，以便共识客户端可以向执行客户端提供指令，并且执行客户端可以将交易包传递给共识客户端以包含在信标区块中。两个客户端之间的通信可以使用本地 RPC 连接来实现。一个被称为 [“引擎 API (Engine-API)”](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) 的 API 定义了在两个客户端之间发送的指令。由于两个客户端都位于单个网络身份之后，因此它们共享一个 ENR（以太坊节点记录），其中包含每个客户端的单独密钥（Eth1 密钥和 Eth2 密钥）。

控制流的摘要如下所示，括号中是相关的网络栈。

### 当共识客户端不是区块生产者时： {#when-consensus-client-is-not-block-producer}

- 共识客户端通过区块流言协议接收区块（共识点对点网络）
- 共识客户端预验证区块，即确保它来自具有正确元数据的有效发送者
- 区块中的交易作为执行负载发送到执行层（本地 RPC 连接）
- 执行层执行交易并验证区块头中的状态（即检查哈希是否匹配）
- 执行层将验证数据传回共识层，区块现在被认为是已验证的（本地 RPC 连接）
- 共识层将区块添加到其自身区块链的顶端并对其进行证明，在网络上广播该证明（共识点对点网络）

### 当共识客户端是区块生产者时： {#when-consensus-client-is-block-producer}

- 共识客户端收到它是下一个区块生产者的通知（共识点对点网络）
- 共识层调用执行客户端中的 `create block` 方法（本地 RPC）
- 执行层访问由交易流言协议填充的交易内存池（执行点对点网络）
- 执行客户端将交易打包成一个区块，执行交易并生成区块哈希
- 共识客户端从执行客户端获取交易和区块哈希，并将它们添加到信标区块中（本地 RPC）
- 共识客户端通过区块流言协议广播区块（共识点对点网络）
- 其他客户端通过区块流言协议接收提议的区块，并如上所述进行验证（共识点对点网络）

一旦区块被足够的验证者证明，它就会被添加到链的顶端，变为已证明状态，并最终变为已最终确定状态。

![Diagram of the Ethereum consensus client networking layer](cons_client_net_layer.png)
![Diagram of the Ethereum execution client networking layer](exe_client_net_layer.png)

共识客户端和执行客户端的网络层示意图，来自 [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## 进一步阅读 {#further-reading}

[devp2p](https://github.com/ethereum/devp2p)
[libp2p](https://github.com/libp2p/specs)
[共识层网络规范](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[从 Kademlia 到 discv5](https://vac.dev/kademlia-to-discv5)
[Kademlia 论文](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[以太坊点对点网络简介](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Eth1/Eth2 关系](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[合并与 Eth2 客户端详细信息视频](https://www.youtube.com/watch?v=zNIrIninMgg)