---
title: Optimistic Rollup
description: 乐观卷叠介绍
lang: zh
---

## 先决条件 {#prerequisites}

您应对所有基础性课题有很好的了解，并且对[以太坊扩容](/developers/docs/scaling/)有深入的了解。 实现诸如 rollup 之类的扩容解决方案是一个高阶主题，因为该技术没有经过多少实战测试，还在继续研发。

在寻找更适合初学者的资源？ 请参阅我们的[第二层简介](/layer-2/)。

## 乐观卷叠 {#optimistic-rollups}

乐观卷叠与第二层的以太坊主链同步进行。 它们能够实现可扩展性改进，因为它们默认不执行任何计算。 相反，它们会在一笔交易之后向主网提议新的状态或公证 (notarise) 交易。

通过乐观卷叠，交易以 `calldata` 的形式写入以太坊主链，并通过减少燃料费用进一步优化。

由于计算是使用以太坊缓慢而昂贵的部分，乐观卷叠可以改进高达 10-100 倍的可扩容性，具体取决于交易。 在引入[分片链](/upgrades/sharding)后，这个数字还会大大增加，因为如果交易有争议，将会产生更多的数据。

### 对交易提出异议 {#disputing-transactions}

乐观卷叠并不实际计算交易，因此需要有一个机制来确保交易是合法而不是欺诈性的。 这正是欺诈证明的用武之地。 如果有人发现欺诈性交易，乐观卷叠将借助可用的状态数据，执行欺诈证明并运行交易的计算。 这意味着交易确认等待时间可能比零知识卷叠更长，因为交易可能受到质疑。

![显示以太坊中的乐观卷叠中发生欺诈性交易时的图表](./optimistic-rollups.png)

运行欺诈证明计算所需的燃料甚至可以报销。 来自 Optimism 的 Ben Jones 介绍了现有的保证金制度。

"_任何可能能够采取行动帮助您证明欺诈以保护您的资金的人士，都要求您缴纳保证金。 您大概会拿出一些以太币并将它们锁定，然后说"嘿，我保证说实话"... 如果我不说实话，而且欺诈得到证实，这笔钱将会被没收。 这笔钱不仅有一部分会被没收，而且还有一部分将支付人们执行欺诈证明所消耗的燃料_“

您可以看到，激励机制就是参与者会因欺诈而受到惩罚，也会因提供欺诈证明而获得补偿。

### 优点和缺点 {#optimistic-pros-and-cons}

| 优点                                                                           | 缺点                                                 |
| ------------------------------------------------------------------------------ | ---------------------------------------------------- |
| 您能在以太坊第一层做的任何事情，都能用乐观卷叠做，因为它兼容 EVM 和 Solidity。 | 由于可能存在对欺诈的质疑，链上交易的等待时间会很长。 |
| 所有交易数据都存储在第一层链上，这意味着它是安全和分散的。                     | 运营者可以影响交易顺序。                             |

### 乐观卷叠的直观解释 {#optimistic-video}

观看 Finematics 解说乐观卷叠：

<YouTube id="7pWxCklcNsU" start="263" />

### 使用乐观卷叠 {#use-optimistic-rollups}

乐观重叠有多种实现方式，您可以将其整合到您的去中心化应用程序中。

<RollupProductDevDoc rollupType="optimistic" />

**乐观卷叠相关阅读**

- [关于 Optimistic Rollup，你所需要知道的一切](https://research.paradigm.xyz/rollups)
- [EthHub 上关于乐观卷叠的介绍](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [Arbitrum 基本指南](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [乐观卷叠究竟如何工作？](https://research.paradigm.xyz/optimism)
- [深入研究乐观虚拟机](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
