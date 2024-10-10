---
title: 以太坊扩容
description: 卷叠链下批量处理交易，从而降低用户的成本。 然而，目前卷叠使用数据的方法过于昂贵，这限制了交易费用的降低。 Proto-Danksharding 解决了这个问题。
lang: zh
image: /images/roadmap/roadmap-transactions.png
alt: "以太坊路线图"
template: roadmap
---

以太坊使用[二层](/layer-2/#rollups)网络（也称为“卷叠”）进行扩展，卷叠批量处理交易并将结果发送到以太坊上。 尽管卷叠比以太坊主网便宜多达八倍，但还可以进一步优化，以降低最终用户的成本。 卷叠还依赖于一些中心化的组件，随着卷叠的成熟，开发者可以逐步移除这些组件。

<InfoBanner mb={8} title="交易费">
  <ul style={{ marginBottom: 0 }}>
    <li>目前，卷叠比以太坊一层网络便宜大约 <strong>5-20 倍</strong></li>
    <li>零知识卷叠将很快把费用降低约 <strong>40-100 倍</strong></li>
    <li>即将进行的以太坊变更会再次扩容 <strong>100-1000 倍</strong></li>
    <li style={{ marginBottom: 0 }}>用户将从中受益，<strong>交易成本降至不足 0.001 美元</strong></li>
  </ul>
</InfoBanner>

## 让数据更实惠 {#making-data-cheaper}

卷叠会收集、执行大量的交易，并将结果提交到以太坊。 这会生成大量数据，这些数据需要公开，以便任何人都能执行交易并验证卷叠运营商的诚实性。 如果有人发现交易有出入，就会提出质疑。

### Proto-Danksharding {#proto-danksharding}

过去卷叠数据永久存储在以太坊上，这导致费用高昂。 用户在卷叠中支付的超过 90% 的交易费用是由于这种数据存储造成的。 为了减少交易费用，我们可以将数据转移到新的临时“二进制大对象”中存储。 由于二进制大对象不是永久性存储，所以相对便宜。一旦不再需要这些数据，可以将它们从以太坊中删除。 长期存储卷叠数据成为需要者的责任，例如卷叠运营者、交易所、索引服务等。 向以太坊添加数据块交易是被称作“Proto-Danksharding”的升级的一部分。

使用 Proto-Danksharding，可以向以太坊区块中添加许多二进制大对象。 这会进一步大幅（>100 倍）提高以太坊吞吐量、降低交易费用。

### Danksharding {#danksharding}

扩展二进制大对象数据的第二阶段非常复杂，因为它需要以新的方式检查卷叠数据在网络上的可用性，并依赖[验证者](/glossary/#validator)来分离他们的[区块](/glossary/#block)构建和区块提议责任。 同时，它还需要以一种加密方式证明验证者已验证二进制大对象数据的小子集。

这个第二步名为[“Danksharding”](/roadmap/danksharding/)。 **它可能需要几年时间**才能完全实现。 Danksharding 依赖于其他开发工作，例如[分离区块构建和区块提出](/roadmap/pbs)，以及进行新网络设计，让网络能够通过一次性随机采样少许千字节数据即可高效确认数据可用性，这称为“[数据可用性采样 (DAS)](/developers/docs/data-availability)”。

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">更多关于 Danksharding 的信息</ButtonLink>

## 去中心化卷叠 {#decentralizing-rollups}

[卷叠](/layer-2)已经在对以太坊扩容。 一个[丰富的卷叠项目生态系统](https://l2beat.com/scaling/tvl)正在使用户能够在一系列安全保证下快速和低成本地进行交易。 然而，卷叠目前是通过中心化的排序者（在提交给以太坊之前进行所有交易处理和聚合的计算机）来引导的。 这容易审查，因为这些排序运营商可能会受到制裁、受贿、或因其他原因妥协。 与此同时，[卷叠在验证传入数据的方式上也存在差异](https://l2beat.com)。 最好的方法是让“验证者”提交[欺诈证明](/glossary/#fraud-proof)或有效性证明，但不是所有卷叠都实现了这一点。 甚至那些使用了有效性/欺诈证明的卷叠也仅使用少数已知的证明者。 因此，以太坊扩容的下一个重要步骤是向更多人分配运行排序者和证明者的责任。

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">更多关于卷叠的信息</ButtonLink>

## 当前进展 {#current-progress}

Proto-Danksharding 是这些路线图项目中首个要实现的项目，将作为 2024 年 3 月的 Cancun-Deneb （“Dencun”）网络升级的一部分实现。 由于完整 Danksharding 依赖于其他几个路线图项目首先完成，所以**距离其实现可能仍需数年时间**。 卷叠基础设施去中心化很可能是一个渐进过程 - 存在许多不同的卷叠，它们正在建立的系统略有不同，并且完全去中心化的速度也不同。

[更多关于 Dencun 网络升级的信息](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
