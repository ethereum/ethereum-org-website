---
title: 客户端多样性
description: 概括解释以太坊客户端多样性的重要性。
lang: zh
sidebarDepth: 2
---

以太坊节点的行为是由其运行的客户端软件控制的。 有一些生产级的以太坊客户端，每个都是由不同的团队用不同的语言开发和维护。 这些客户端都是按照共同规范建立的，确保客户端相互之间无缝通信，具有相同的功能并提供一致的用户体验。 然而，目前各节点的客户端分布并不均匀，不足以发挥这种网络防御措施的全部潜力。 理想情况下，用户在各个客户端之间大致平均分布，以便在网络上最大程度地实现客户端多样性。

## 前提条件 {#prerequisites}

如果你还不了解什么是节点和客户端，请查看[节点和客户端](/developers/docs/nodes-and-clients/)。 [执行层](/glossary/#execution-layer)和[共识层](/glossary/#consensus-layer)的定义见词汇表。

## 为什么会有多种客户端？ {#why-multiple-clients}

存在多种独立开发和维护的客户端，是因为客户端多样性使网络在面对攻击和漏洞时恢复能力更强。 多种客户端是以太坊独有的优势，而其他区块链依赖于单一客户端的无误性。 然而，仅仅拥有多种可用的客户端是不够的，这些客户端必须被社区采用，并且全部活跃节点必须相对均匀地分布在它们之间。

## 为什么客户端多样性很重要？ {#client-diversity-importance}

拥有许多独立开发和维护的客户端对于去中心化网络的健康至关重要。 让我们来探究其中的原因。

### 漏洞 {#bugs}

当代表少数以太坊节点时，一种客户端中的漏洞对网络的风险较小。 由于许多客户端的节点分布大致均匀，大多数客户端出现同一问题的可能性很小，因此网络更加稳健。

### 抵御攻击 {#resilience}

客户端多样性还提供了抵御攻击的能力。 例如，要[欺骗特定客户端](https://twitter.com/vdWijden/status/1437712249926393858)让其接受链的某条分支，这种攻击不太可能成功，因为不大可能以相同方式利用其他客户端，并且规范链未损坏。 客户端多样性程度低增加了主要客户端受到黑客攻击的风险。 已经证实，客户端多样性是抵御网络受到恶意攻击的重要防御手段，例如，由于攻击者能够欺骗主要客户端 (Geth) 对每个区块执行数万次慢速磁盘输入/输出操作，2016 年的上海拒绝服务攻击得以实施。 由于有其他客户端在线且没有同样的漏洞，因此以太坊能够抵抗那次攻击并继续运行，同时修复了 Geth 中的漏洞。

### 权益证明的最终确定性 {#finality}

超过 33% 的以太坊节点的共识客户端中有一个漏洞，它可能会阻止共识层的最终确定，这意味着用户无法相信交易不会在某些时候被回滚或更改。 对于许多建立在以太坊之上的应用程序，尤其是去中心化金融，这将是一个很大的问题。

<Emoji text="🚨" className="me-4" /> 更糟糕的是，当拥有三分之二多数节点的客户端出现严重漏洞，可能会导致链<a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">错误地分叉并最终确定</a>，让大量验证者困陷在无效链上。 如果这些验证者想重新加入正确的链，他们将面临罚没或缓慢而昂贵的自愿退出和重新激活过程。 罚没的轻重随过错节点数量而异，三分之二的大多数将受到最严重的惩罚（32 个以太币）。

尽管这些情况不太可能发生，但为了降低这类风险，以太坊生态系统可以使客户端均衡分布在活跃节点上。 理想情况下，任何共识客户端任何时候都不会达到总节点数的 33%。

### 共担责任 {#responsibility}

采用主流客户端也需要人力成本。 这给小型开发团队带来了过多的压力和责任。 客户端多样性程度越低，维护主流客户端的开发者的责任负担就越大。 将这一责任分摊到多个团队，既有利于以太坊节点网络的健康，也有益于相关人员的健康。

## 客户端多样性现状 {#current-client-diversity}

![显示客户端多样性的饼状图](./client-diversity.png) _图表数据来自 [ethernodes.org](https://ethernodes.org) 和 [ clientdiversity.org](https://clientdiversity.org/)_

上面的两个饼图显示了执行层和共识层客户端多样性现状的快照（在 2022 年 1 月撰写本文时）。 在执行层，[Geth](https://geth.ethereum.org/) 占据绝对主导地位，[Open Ethereum ](https://openethereum.github.io/) 以极大的差距位居第二，[Erigon](https://github.com/ledgerwatch/erigon) 和 [Nethermind](https://nethermind.io/) 分别占据第三和第四，其他客户端加起来占网络的比例不到 1%。 共识层最常用的客户端 [Prysm](https://prysmaticlabs.com/#projects) 不像 Geth 那样占据绝对主导地位，但仍占有网络的 60% 以上。 [Lighthouse](https://lighthouse.sigmaprime.io/) 和 [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) 分别占据约 20% 和约 14%，其他客户端很少使用。

2022 年 1 月 23 日，从 [Ethernodes](https://ethernodes.org) 获得执行层数据。 共识客户端的数据来自 [Michael Sproul](https://github.com/sigp/blockprint)。 共识客户端数据更难获取，因为共识层客户端并不总是具有可以用来识别它们的明确痕迹。 这些数据是使用分类算法生成的，该算法有时会混淆一些非主流客户端（点击[此处](https://twitter.com/sproulM_/status/1440512518242197516)了解更多详细信息）。 在上图中，这些含糊的分类使用了“/”符号进行处理（例如 Nimbus/Teku）。 尽管如此，很明显大部分网络都在运行 Prysm。 这些数据是一组固定区块的快照（在本例中为时隙 2048001 与 2164916 之间的信标区块），Prysm 的主导地位曾经一度更高，超过 68%。 尽管只是快照，但上图中的数值可以让你清晰地了解客户端多样性现状的全局。

现在，可以在 [clientdiversity.org](https://clientdiversity.org/) 查阅最新的共识层客户端多样性数据。

## 执行层 {#execution-layer}

迄今为止，围绕客户端多样性进行的对话主要集中在共识层。 然而，执行客户端 [Geth](https://geth.ethereum.org) 目前约占所有节点的 85%。 这一百分比是有问题的，原因与共识客户端一样。 例如，Geth 中影响交易处理或造成执行负载的漏洞，可能导致共识客户端最终确定有问题或有漏洞的交易。 因此，如果执行客户端分布更均匀，以太坊会更健康。理想情况是所有客户端占据的网络都不超过 33%。

## 使用非主流客户端 {#use-minority-client}

解决客户端多样性问题不仅需要个人用户选择非主流客户端，还需要矿池/验证者池以及主要去中心应用程序和交易所等机构改用客户端。 然而，所有用户都可以尽一份力量，纠正目前的失衡状况并且实现所有可用以太坊软件的使用正常化。 合并后，所有节点运营商都需要运行执行客户端和共识客户端。 选择下面建议的客户端组合将有助于提高客户端多样性。

### 执行客户端 {#execution-clients}

[Besu](https://www.hyperledger.org/use/besu)

[Nethermind](https://downloads.nethermind.io/)

[Erigon](https://github.com/ledgerwatch/erigon)

[Go-Ethereum](https://geth.ethereum.org/)

### 共识客户端 {#consensus-clients}

[Nimbus](https://nimbus.team/)

[Lighthouse](https://github.com/sigp/lighthouse)

[Teku](https://consensys.net/knowledge-base/ethereum-2/teku/)

[Lodestar](https://github.com/ChainSafe/lodestar)

[Prysm](https://docs.prylabs.network/docs/getting-started)

技术用户可以为非主流客户端编写更多教程和相关文档，并鼓励他们运营节点的对等体从主流客户端迁离，帮助加快这一进程。 [clientdiversity.org](https://clientdiversity.org/) 提供了改用非主流共识客户端的指南。

## 客户端多样性仪表板 {#client-diversity-dashboards}

一些仪表板提供了执行层和共识层客户端多样性实时统计数据。

**共识层：**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/) **执行层：**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## 延伸阅读 {#further-reading}

- [以太坊共识层的客户端多样性](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [以太坊合并：运行主流客户端须自担风险！](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest，2022 年 3 月 24 日_
- [客户端多样性的重要性](https://our.status.im/the-importance-of-client-diversity/)
- [以太坊节点服务列表](https://ethereumnodes.com/)
- [客户端多样性问题的“五个原因”](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [以太坊多样性及其解决方法 (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## 相关主题 {#related-topics}

- [运行以太坊节点](/run-a-node/)
- [节点和客户端](/developers/docs/nodes-and-clients/)
