---
title: 网络层
description: 以太坊网络层简介。
lang: zh
sidebarDepth: 2
---

以太坊是一个由数千个节点组成的点对点网络，节点之间必须能够使用标准化协议相互通信。 “网络层”是使节点能够找到彼此并交换信息的协议栈。 可交换信息包括网络上的“广播”信息（一对多通信），以及特定节点之间的交换请求和答复（一对一通信）。 每个节点必须遵守特定的网络规则，以确保发送和接收正确的信息。

客户端软件由两部分组成（执行客户端和共识客户端），它们都具有各自的网络堆栈。 除了与其他以太坊节点进行通信外，执行客户端和共识客户端还必须互相通信。 本页介绍了用以实现这种通信的协议。

执行客户端通过执行层的点对点网络广播交易信息。 这需要经验证的对等点之间进行加密通信。 当一个验证者被选中来提议区块时，该节点本地交易池中的交易将会通过一个本地远程过程调用连接传递至共识客户端，然后再将其打包进信标区块。 之后，共识客户端将在它们的对等网络中广播信标区块。 广播过程需要两个独立的对等网络：一个连接执行客户端，负责交易的广播；另一个连接共识客户端，负责区块的广播。

## 前提条件 {#prerequisites}

对以太坊[节点和客户端](/developers/docs/nodes-and-clients/)略有了解将有助于理解本文。

## 执行层 {#execution-layer}

执行层的网络协议分为两个堆栈：

- 发现堆栈：建立在用户数据报协议之上，并使新节点能够找到相应节点并连接

- DevP2P 堆栈：建立在传输控制协议之上，并使节点能够交换信息

这两个堆栈并行作用， 发现堆栈将新的网络参与者输送到网络中，DevP2P 则使它们进行交互。

### 发现 {#discovery}

发现是在网络中寻找其他节点的过程。 该过程使用一小组引导节点（即地址[硬编码](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go)为客户端的节点，以便它们能被立即找到，并将客户端连接至对等点）进行引导。 这些引导节点旨在将新节点引入一组对等点，这是它们唯一的目的。它们不参与普通的客户端任务，例如同步链，仅在第一次使用客户端时使用。

节点与引导节点交互所使用的协议是 [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) 的修改版，它使用[分布式散列表](https://en.wikipedia.org/wiki/Distributed_hash_table)共享节点列表。 每个节点都有一版此表格，其中包含连接到最近节点所需的信息。 这个“最近”不是指地理距离，而是由节点 ID 的相似性来界定的。 每个节点的表格都会定期刷新，作为一种安全特性。 例如，在 [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) 中，发现协议节点也可以发送显示客户端支持的子协议的聚合发现服务，以便对等点协调通信所用的协议。

发现过程从 PING-PONG 游戏开始。 一个成功的 PING-PONG 将新节点“连接”到一个启动节点。 提醒引导节点有新节点进入网络的初始消息为 `PING`。 此 `PING` 包括关于新节点、引导节点和过期时间戳的哈希信息。 引导节点接收到 `PING` 返回 `PONG`，其中包含 `PING` 哈希值。 如果 `PING` 和 `PONG` 的哈希值相匹配，新节点和引导节点之间的连接就会得到验证，然后就认为它们已经“绑定”。

绑定之后，新节点即可向引导节点发送 `FIND-NEIGHBOURS` 请求。 引导节点返回的数据包含一个新节点可以连接的节点列表。 如果这两个节点没有绑定，`FIND-NEIGHBOURS` 请求将失败，新节点将无法进入网络。

新节点从引导节点收到邻居节点列表后，就会开始与每个邻居节点交换 PING-PONG。 成功的 PING-PONG 将新节点与邻居节点绑定在一起，以实现消息交换。

```
启动客户端 --> 连接到 bootnode --> 绑定到 bootnode --> 寻找邻居--> 绑定到邻居。
```

执行客户端目前使用 [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) 发现协议，并且正在积极迁移到 [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5) 协议。

#### ENR：以太坊节点记录 {#enr}

[以太坊节点记录 (ENR)](/developers/docs/networking-layer/network-addresses/) 是一个包含三个基本元素的对象：签名（根据某种商定的身份识别方案创建的记录内容的散列）、跟踪记录更改的序号和键:值对的任意列表。 这种格式不会过时，使新对等点之间身份识别信息的交换更加容易，并且是以太坊节点的首选[网络地址](/developers/docs/networking-layer/network-addresses)格式。

#### 发现为什么建立在UDP协议上？ {#why-udp}

UDP协议不支持任何错误检查、重新发送失败的数据包，或者动态地打开和关闭连接；相反，它只是将连续的信息流发送至目标，无论它们是否被对方成功接收。 这种最简化的功能会产生最少的连接开销，从而使这种连接非常迅速。 对于发现而言，如果某个节点只想让其它节点知道它的存在以便它与某个对等点建立正式的连接，UDP协议就已经足够了。 然而，对网络协议栈的其余部分来说，UDP协议就不那么合适了。 节点之间的信息交流相当复杂，因此需要一个功能更完善的协议来支持重新发送、错误检查等。 TCP协议带来更多功能所产生的额外连接开销是值得的。 因此，对等网络协议栈中的大多数协议在TCP协议之上运行。

### DevP2P {#devp2p}

DevP2P 本身就是以太坊为建立和维护对等网络而实施的一整套协议。 新节点进入网络后，它们的交互由 [DevP2P](https://github.com/ethereum/devp2p) 堆栈中的协议管控。 这些操作均基于传输控制协议，包括 RLPx 传输协议、线路协议和若干子协议。 [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) 是管理启动、验证和维护节点之间会话的协议。 使用 RLP（递归长前缀）的 RLPx 对消息进行编码。递归长度前缀是一种非常节省空间的编码方法，可将数据编码成最小结构，以便在节点之间发送。

两个节点之间的 RLPx 会话始于初始的加密握手。 这需要节点发送身份验证消息，然后等待对方进行验证。 成功验证后，对方会生成身份确认信息，并将信息返回初始节点。 这是一个密钥交换过程，使节点能够私下安全地进行沟通。 成功的加密握手会触发两个节点“在线”互相发送“hello”消息。 线路协议则通过成功地交换“hello”信息发起。

Hello 消息包含：

- 协议版本
- 客戶端 ID
- 端口
- 节点 ID
- 支持的子协议列表

成功交互需要这些信息，因为它们定义节点之间共享的能力并配置通信。 另外还有个子协议协调过程，届时会将每个节点支持的子协议列表进行对比，并能将两个节点共用的子协议用于会话。

除了“hello”消息之外，线路协议还可以发送一个“disconnect”消息，以警告对等点连接将被断开。 线路协议还包含定期发送的 PING 和 PONG 消息，以使会话保持开放。 因此，RLPx 和线路协议之间信息交换为节点之间的通信奠定了基础，并为根据特定子协议交换有用的信息提供了平台。

### 子协议 {#sub-protocols}

#### 线路协议 {#wire-protocol}

连接对等点并启动 RLPx 会话后，线路协议定义了对等点间的通信方式。 起初，线路协议定义了三项主要任务：链同步、区块传播和交易交换。 但是当以太坊切换至权益证明之后，区块传播和链同步变为共识层的一部分。 交易交换仍由执行客户端负责。 交易交换所是指在节点之间交换待处理的交易，以便区块构建者能够选择其中一些交易放到下一区块中。 有关这些任务的详细信息可从[这里](https://github.com/ethereum/devp2p/blob/master/caps/eth.md)获取。 支持这些子协议的客户端通过 [JSON-RPC](/developers/docs/apis/json-rpc/) 将自己公开给网络中的其它部分。

#### les（以太坊轻客户端子协议） {#les}

这是用于同步轻量级客户端的最小协议。 传统上很少使用这一协议，因为全部节点都要求在没有任何奖励的情况下向轻量级客户端提供数据。 执行客户端的默认行为不是通过以太坊轻客户端子协议为轻量级客户端数据提供服务。 更多信息请见以太坊轻客户端子协议[规范](https://github.com/ethereum/devp2p/blob/master/caps/les.md)。

#### 快照 {#snap}

[快照协议](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap)是一种可选扩展，该扩展使对等点能够交换最近状态的快照，从而无需下载默克尔前缀树的内部节点就能验证帐户信息和存储的数据。

#### Wit（见证协议） {#wit}

[见证协议](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit)也是一种可选扩展，可以使对等点交换彼此的状态见证，从而帮助客户端与链端同步。

#### 耳语 {#whisper}

耳语协议旨在实现对等节点之间的安全消息传输，无需向区块链写入任何信息。 它曾是 DevP2P 线路协议的一部分，但现在已经弃用。 其他[相关项目](https://wakunetwork.com/)也存在类似目标。

## 共识层 {#consensus-layer}

共识客户端参与具有不同规范的单独对等网络。 共识客户端需要参与区块广播，以便它们可以从对等点接收新区块，并在轮到它们成为区块提议者时进行广播。 与执行层类似，此过程首先需要一个发现协议，以便节点可以找到对等节点并建立安全会话，以交换区块、认证等。

### 发现 {#consensus-discovery}

与执行客户端类似，共识客户端使用基于用户数据报协议的 [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) 寻找对等点。 Discv5 的共识层实现与执行客户端的不同之处仅在于它包含一个将 discv5 连接到 [libP2P](https://libp2p.io/) 堆栈的适配器，而且弃用了 DevP2P。 执行层的 RLPx 会话已被弃用，取而代之的是 libP2P 的噪声安全信道握手。

### 以太坊节点记录 {#consensus-enr}

共识节点的以太坊节点记录包括节点的公钥、IP 地址、用户数据报协议和传输控制协议端口，以及两个共识特定字段：证明子网位字段和 `eth2` 密钥。 前者使节点更容易找到参与特定证明广播子网络的对等点。 `eth2` 密钥包含有关节点正在使用的以太坊分叉的版本信息，以确保对等点连接到正确的以太坊。

### libP2P {#libp2p}

LibP2P 堆栈支持发现后的所有通信。 根据其以太坊节点记录的定义，客户端可以在 IPv4 和/或 IPv6 上拨号和收听。 LibP2P 层上的协议可以细分为广播和请求-响应域。

### 广播 {#gossip}

广播域包括必须在整个网络中快速传播的所有信息。 这包括信标块、证明、认证、退出和罚没。 这是使用 libP2P gossipsub v1 传输的，并且依赖于在每个节点本地存储的各种元数据，包括要接收和传输的广播有效载荷的上限。 有关广播域的详细信息可在[此处](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub)找到。

### 请求-响应 {#request-response}

请求-响应域包含客户端从其对等点请求特定信息的协议。 示例包括请求匹配某些根哈希值或在一定时隙范围内的特定信标块。 响应总是以快速压缩的简单序列化编码字节的形式返回。

## 为什么共识客户端更偏好简单序列化而不是递归长度前缀？ {#ssz-vs-rlp}

SSZ 代表简单序列化。 它使用固定偏移量，可以轻松解码编码消息的各个部分，而无需解码整个结构，这对于共识客户端非常有用，因为它可以有效地从编码消息中获取特定信息。 它还专门设计用于与默克尔协议集成，并提升与默克尔化有关的效率。 由于共识层中的所有哈希值都是默克尔树根，因此这带来了显著的改进。 简单序列化还保证了值的唯一表示。

## 连接执行客户端和共识客户端 {#connecting-clients}

共识客户端和执行客户端同时运行。 它们需要彼此连接，这样共识客户端才能向执行客户端提供指令，后者也才能向前者传送需要纳入信标区块的交易捆绑包。 两个客户端之间的通信可通过本地远程过程调用连接实现。 名为[“引擎-API”](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)的应用程序接口定义两个客户端之间发送的指令。 由于两个客户端共用同一个网络身份，因此它们也共享同一个以太坊节点记录 (ENR)，其中包含了每个客户端单独的密钥（eth1 密钥和 eth2 密钥）。

下面显示了控制流摘要，括号中是相关的网络堆栈。

### 当共识客户端不是区块生产者时： {#when-consensus-client-is-not-block-producer}

- 共识客户端通过区块广播协议接收区块（共识对等网络）
- 共识客户端预先验证区块，即确保它来自具有正确元数据的有效发送人
- 区块中的交易作为执行有效载荷发送到执行层（本地远程过程调用连接）
- 执行层执行交易并验证区块头中的状态（即检查哈希匹配度）
- 执行层将验证数据传回共识层，现认为区块已验证（本地远程过程调用连接）
- 共识层将区块添加到自己的区块链头并对其进行证明，通过网络广播认证（共识对等网络）

### 当共识客户端是区块生产者时： {#when-consensus-client-is-block-producer}

- 共识客户端收到通知，指出它将成为下一个区块的生产者（共识对等网络）
- 共识层在执行客户端调用 `create block` 方法（本地远程过程调用）
- 执行层访问由交易广播协议填充的交易内存池（执行对等网络）
- 执行客户端将交易打包为一个区块、执行交易并生成一个区块哈希
- 共识客户端从执行客户端获取交易和区块哈希，并将它们加入信标区块（本地远程过程调用）
- 共识客户端通过区块广播协议广播区块（共识对等网络）
- 其他客户端通过区块广播协议接收提议的区块，并如上所述进行验证（共识对等网络）

区块被足够多的验证者认证后，就会被添加到链头，经过合理化并最终确定。

![](cons_client_net_layer.png) ![](exe_client_net_layer.png)

共识客户端和执行客户端的网络层示意图，取自 [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## 延伸阅读 {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p) [LibP2p](https://github.com/libp2p/specs) [共识层网络规范](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) [kademlia 至 discv5](https://vac.dev/kademlia-to-discv5) [kademlia 论文](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) [以太坊对等网络简介](https://p2p.paris/en/talks/intro-ethereum-networking/) [以太坊 1/以太坊 2 的关系](http://ethresear.ch/t/eth1-eth2-client-relationship/7248) [合并和以太坊 2 客户端详情视频](https://www.youtube.com/watch?v=zNIrIninMgg)
