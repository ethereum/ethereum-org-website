---
title: "客户端多样性"
description: "关于以太坊客户端多样性重要性的高层次解释。"
lang: zh
sidebarDepth: 2
---

[以太坊](/)节点的行为由其运行的客户端软件控制。目前有几个生产级别的以太坊客户端，每一个都由不同的团队使用不同的语言开发和维护。这些客户端是根据通用规范构建的，该规范确保客户端之间能够无缝通信，具有相同的功能，并提供同等的用户体验。然而，目前客户端在节点间的分布还不够均匀，无法充分发挥这种网络防御的潜力。理想情况下，用户应大致平均地分布在各种客户端上，从而为网络带来尽可能多的客户端多样性。

## 前提条件 {#prerequisites}

如果你还不了解什么是节点和客户端，请查看[节点和客户端](/developers/docs/nodes-and-clients/)。词汇表中定义了[执行层](/glossary/#execution-layer)和[共识层](/glossary/#consensus-layer)。

## 为什么会有多个客户端？ {#why-multiple-clients}

存在多个独立开发和维护的客户端，是因为客户端多样性使网络对攻击和漏洞更具弹性。多个客户端是以太坊独有的优势——其他区块链依赖于单一客户端的绝对可靠性。然而，仅仅有多个可用的客户端是不够的，它们必须被社区采用，并且活跃节点总数需要在它们之间相对均匀地分布。

## 为什么客户端多样性很重要？ {#client-diversity-importance}

拥有许多独立开发和维护的客户端对于去中心化网络的健康至关重要。让我们来探讨一下原因。

### 漏洞 {#bugs}

当某个客户端仅占以太坊节点的少数时，该客户端中的漏洞对网络造成的风险较小。如果节点在许多客户端中大致均匀分布，大多数客户端遭受共同问题影响的可能性就很小，因此网络会更加健壮。

### 抵御攻击的弹性 {#resilience}

客户端多样性还提供了抵御攻击的弹性。例如，一种[诱骗特定客户端](https://twitter.com/vdWijden/status/1437712249926393858)进入链的特定分支的攻击不太可能成功，因为其他客户端不太可能以同样的方式被利用，规范链仍然不会被破坏。客户端多样性低会增加主导客户端被黑客攻击的相关风险。客户端多样性已被证明是抵御网络恶意攻击的重要防线，例如 2016 年的上海拒绝服务攻击之所以可能发生，是因为攻击者能够诱骗主导客户端（Go以太坊 (Geth)）在每个区块中执行数万次缓慢的磁盘 I/O 操作。由于没有该漏洞的替代客户端也在线，以太坊能够抵御攻击并继续运行，同时修复了 Go以太坊 (Geth) 中的漏洞。

### 权益证明最终性 {#finality}

如果一个占据超过 33% 以太坊节点的共识客户端出现漏洞，可能会阻止共识层实现最终性，这意味着用户无法相信交易在某个时刻不会被撤销或更改。这对于许多构建在以太坊之上的去中心化应用 (dapp) 来说将是非常成问题的，特别是去中心化金融 (DeFi)。

<Emoji text="🚨" className="me-4" /> 更糟糕的是，如果一个占据三分之二绝对多数的客户端出现严重漏洞，可能会导致链<a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">错误地分叉并实现最终性</a>，从而导致大量验证者卡在无效链上。如果他们想重新加入正确的链，这些验证者将面临罚没，或者缓慢且昂贵的自愿提款和重新激活。罚没的幅度与有罪节点的数量成正比，三分之二绝对多数的节点将被最大程度地罚没（32 ETH）。

尽管这些情况不太可能发生，但以太坊生态系统可以通过在活跃节点中均匀分布客户端来降低其风险。理想情况下，任何共识客户端都不应达到总节点数的 33% 份额。

### 共同责任 {#responsibility}

拥有多数客户端也会带来人力成本。它给一个小型开发团队带来了过度的压力和责任。客户端多样性越低，维护多数客户端的开发人员的责任负担就越重。将这种责任分散到多个团队中，既有利于以太坊节点网络的健康，也有利于其人员网络的健康。

## 当前的客户端多样性 {#current-client-diversity}

### 执行客户端 {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Go以太坊 (Geth)", value: 41 },
{ name: "奈瑟曼德", value: 38 },
{ name: "贝苏", value: 16 },
{ name: "埃里贡", value: 3 },
{ name: "瑞斯", value: 2 }
]}
/>

### 共识客户端 {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "莱特豪斯", value: 42.71 },
{ name: "普莱斯姆", value: 30.91},
{ name: "泰库", value: 13.86},
{ name: "尼姆巴斯", value: 8.74},
{ name: "洛德斯塔", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "其他", value: 0.07 }
]}
/>

此图表可能已过时——请访问 [ethernodes.org](https://ethernodes.org) 和 [clientdiversity.org](https://clientdiversity.org) 获取最新信息。

上面的两个饼图显示了执行层和共识层当前客户端多样性的快照（撰写本文时为 2025 年 10 月）。多年来，客户端多样性有所改善，执行层中 [Go以太坊 (Geth)](https://geth.ethereum.org/) 的主导地位有所下降，[奈瑟曼德](https://www.nethermind.io/nethermind-client) 紧随其后位居第二，[贝苏](https://besu.hyperledger.org/) 第三，[埃里贡](https://github.com/ledgerwatch/erigon) 第四，其他客户端占网络的不到 3%。共识层上最常用的客户端——[莱特豪斯](https://lighthouse.sigmaprime.io/)——与第二常用的客户端非常接近。[普莱斯姆](https://prysmaticlabs.com/#projects) 和 [泰库](https://consensys.net/knowledge-base/ethereum-2/teku/) 分别占约 31% 和约 14%，其他客户端很少被使用。

执行层数据于 2025 年 10 月 26 日从 [supermajority.info](https://supermajority.info/) 获取。共识客户端的数据从 [Michael Sproul](https://github.com/sigp/blockprint) 处获取。共识客户端数据更难获取，因为共识层客户端并不总是有可用于识别它们的明确痕迹。该数据是使用分类算法生成的，该算法有时会混淆一些少数客户端（有关更多详细信息，请参见[此处](https://twitter.com/sproulM_/status/1440512518242197516)）。在上图中，这些模棱两可的分类使用“非此即彼”的标签（例如 尼姆巴斯/泰库）来处理。尽管如此，很明显网络的大部分都在运行普莱斯姆。尽管只是快照，但图表中的数值很好地反映了当前客户端多样性状态的总体情况。

共识层的最新客户端多样性数据现在可以在 [clientdiversity.org](https://clientdiversity.org/) 获取。

## 执行层 {#execution-layer}

到目前为止，围绕客户端多样性的讨论主要集中在共识层。然而，执行客户端 [Go以太坊 (Geth)](https://geth.ethereum.org) 目前占所有节点的 85% 左右。这个比例存在问题，原因与共识客户端相同。例如，Go以太坊 (Geth) 中影响交易处理或构建执行有效负载的漏洞可能会导致共识客户端对有问题的或带漏洞的交易实现最终性。因此，如果执行客户端的分布更加均匀，以太坊将会更健康，理想情况下，没有任何客户端占网络的 33% 以上。

## 使用少数客户端 {#use-minority-client}

解决客户端多样性问题不仅需要个人用户选择少数客户端，还需要验证者池以及主要去中心化应用 (dapp) 和交易所等机构也切换客户端。然而，所有用户都可以尽自己的一份力量来纠正当前的不平衡，并使所有可用的以太坊软件的使用常态化。在合并之后，所有节点运营商都将被要求运行一个执行客户端和一个共识客户端。选择下面建议的客户端组合将有助于增加客户端多样性。

### 执行客户端 {#execution-clients}

- [贝苏](https://www.hyperledger.org/use/besu)
- [奈瑟曼德](https://downloads.nethermind.io/)
- [埃里贡](https://github.com/ledgerwatch/erigon)
- [Go以太坊 (Geth)](https://geth.ethereum.org/)
- [瑞斯](https://reth.rs/)

### 共识客户端 {#consensus-clients}

- [尼姆巴斯](https://nimbus.team/)
- [莱特豪斯](https://github.com/sigp/lighthouse)
- [泰库](https://consensys.io/teku)
- [洛德斯塔](https://github.com/ChainSafe/lodestar)
- [普莱斯姆](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

技术用户可以通过为少数客户端编写更多教程和文档，并鼓励其运营节点的同行从主导客户端迁移，来帮助加速这一过程。有关切换到少数共识客户端的指南，请访问 [clientdiversity.org](https://clientdiversity.org/)。

## 客户端多样性仪表板 {#client-diversity-dashboards}

有几个仪表板提供执行层和共识层的实时客户端多样性统计数据。

**共识层：**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**执行层：**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## 延伸阅读 {#further-reading}

- [以太坊共识层上的客户端多样性](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [以太坊合并：运行多数客户端风险自负！](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest，2022 年 3 月 24 日_
- [客户端多样性的重要性](https://our.status.im/the-importance-of-client-diversity/)
- [以太坊节点服务列表](https://ethereumnodes.com/)
- [客户端多样性问题的“五个为什么”](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [以太坊多样性及其解决方法 (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## 相关主题 {#related-topics}

- [运行以太坊节点](/run-a-node/)
- [节点和客户端](/developers/docs/nodes-and-clients/)
