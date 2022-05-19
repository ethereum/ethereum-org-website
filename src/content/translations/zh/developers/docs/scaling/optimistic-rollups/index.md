---
title: 乐观卷叠
description: 乐观卷叠介绍
lang: zh
sidebar: true
---

## 前提条件 {#prerequisites}

您应该很好地了解所有基本主题，并且对[以太坊扩容](/developers/docs/scaling/)具有高层次的理解。 实现诸如卷叠之类的扩容解决方案是一个高阶主题，因为该技术没有经过多少实战测试，还在继续研发中。

## 乐观卷叠 {#optimistic-rollups}

乐观卷叠与第二层的以太坊主链同步进行。 它们可以提供可扩容性方面的改进，因为它们默认不做任何计算。 相反，它们会在一笔交易之后向主网提议新的状态或公证交易。

通过乐观卷叠，交易以 `calldata` 的形式写入以太坊主网，通过减少燃料成本进一步优化。

由于计算是使用以太坊缓慢而昂贵的部分，乐观卷叠可以改进高达 10-100 倍的可扩容性，具体取决于交易。 在引入[分片链](/upgrades/shard-chains)后，这个数字还会大大增加，因为如果交易有争议，将会产生更多的数据。

### 对交易提出异议 {#disputing-transactions}

乐观卷叠并不实际计算交易，所以需要有一个机制来确保交易是合法而不是欺诈性的。 这正是欺诈证明的用武之地。 如果有人注意到有欺诈性交易，卷叠将执行防欺诈，并使用可用的状态数据运行交易的计算。 这意味着您的交易确认等待时间可能比零知识卷叠更长，因为交易可能受到质疑。

![显示如何处理在以太坊的乐观卷叠中发生的欺诈性交易的图表](./optimistic-rollups.png)

您运行欺诈证明计算需要消耗的燃料甚至可以报销。 来自 Optimism 的 Ben Jones 介绍了现有的联系制度。

"_任何人都有可能能够采取某种行动，您为了保证您的资金安全，必须证明该行动是否具有欺诈性，因此这个人就必须缴纳保证金。 这基本上等同于您拿出一些以太币，将其锁定，然后说 "嘿，我保证说实话"... 如果我不说实话，欺诈被证实，这笔钱就会被扣减。 这笔钱不仅有一部分会被扣减，而且还有一部分将支付人们做欺诈证明时所花的燃料_。

您可以看到奖惩措施：参与者因欺诈而受到惩罚，也会因提供欺诈证明而获得补偿。

### 优点和缺点 {#optimistic-pros-and-cons}

| 优点                                                                           | 缺点                                                 |
| ------------------------------------------------------------------------------ | ---------------------------------------------------- |
| 您能在以太坊第一层做的任何事情，都能用乐观卷叠做，因为它兼容 EVM 和 Solidity。 | 由于可能存在对欺诈的质疑，链上交易的等待时间会很长。 |
| 所有交易数据都存储在第一层链上，这意味着它是安全和分散的。                     | 运营者可以影响交易顺序。                             |

### 乐观卷叠的直观解释 {#optimistic-video}

观看 Finematics 解说乐观卷叠的视频：

<YouTube id="7pWxCklcNsU" start="263" />

### 使用乐观卷叠 {#use-optimistic-rollups}

存在多种乐观卷叠的实现方式，您可以整合到您的去中心化应用程序中。

<RollupProductDevDoc rollupType="optimistic" />

**乐观卷叠相关阅读**

- [关于 Optimistic Rollup，你所需要知道的一切](https://research.paradigm.xyz/rollups)
- [Optimistic rollup 上的 EthHub](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [Arbitrum 指南](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Optimistic Rollup 究竟是如何起作用的？](https://research.paradigm.xyz/optimism)
- [深入研究 OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
