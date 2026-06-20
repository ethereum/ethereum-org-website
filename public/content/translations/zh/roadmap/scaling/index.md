---
title: "扩容以太坊"
description: "汇总将交易在链下批量处理，从而降低用户的成本。然而，目前汇总使用数据的方式过于昂贵，限制了交易成本的降低空间。Proto-Danksharding 解决了这个问题。"
lang: zh
image: /images/roadmap/roadmap-transactions.png
alt: "以太坊路线图"
template: roadmap
---

以太坊通过 [二层网络](/layer-2/#rollups)（也称为汇总）进行扩容，汇总将交易批量处理并将结果发送到以太坊。尽管汇总的成本比以太坊主网低多达八倍，但仍有可能进一步优化汇总以降低最终用户的成本。汇总还依赖于一些中心化组件，随着汇总的成熟，开发人员可以移除这些组件。

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  交易成本
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>如今的汇总比以太坊一层网络 (l1) 便宜 <strong>约 5-20 倍</strong></li>
    <li>ZK-rollup 很快将使费用降低 <strong>约 40-100 倍</strong></li>
    <li>以太坊即将进行的变更将提供另外 <strong>约 100-1000 倍</strong> 的扩容</li>
 <li style={{ marginBottom: 0 }}>用户将受益于 <strong>成本低于 0.001 美元</strong> 的交易</li>
  </ul>
</AlertContent>
</Alert>

## 降低数据成本 {#making-data-cheaper}

汇总收集大量交易，执行它们并将结果提交给以太坊。这会产生大量需要公开可用的数据，以便任何人都可以自行执行交易并验证 Rollup 操作员是否诚实。如果有人发现差异，他们可以提出挑战。

### Proto-Danksharding {#proto-danksharding}

过去，Rollup 数据一直永久存储在以太坊上，这非常昂贵。用户在汇总上支付的交易成本中，超过 90% 是由于这种数据存储造成的。为了降低交易成本，我们可以将数据转移到一个新的临时“斑点”存储中。斑点更便宜，因为它们不是永久性的；一旦不再需要，它们就会从以太坊中删除。长期存储 Rollup 数据成为需要它的人的责任，例如 Rollup 操作员、交易所、索引服务等。向以太坊添加斑点交易是被称为“Proto-Danksharding”的升级的一部分。

借助 Proto-Danksharding，可以向以太坊区块添加许多斑点。这使得以太坊的吞吐量实现了另一次大幅（>100 倍）提升，并大幅降低了交易成本。

### 丹克分片 {#danksharding}

扩展斑点数据的第二阶段很复杂，因为它需要新的方法来检查网络上是否可用 Rollup 数据，并且依赖于 [验证者](/glossary/#validator) 分离其 [区块](/glossary/#block) 构建和区块提案职责。它还需要一种方法来通过密码学证明验证者已经验证了斑点数据的一小部分。

这第二步被称为 [“丹克分片”](/roadmap/danksharding/)。实施工作仍在继续，在诸如 [分离区块构建和区块提案](/roadmap/pbs) 等先决条件方面取得了进展，并且新的网络设计使网络能够通过每次随机采样几千字节来有效地确认数据可用，这被称为 [数据可用性采样 (DAS)](/developers/docs/data-availability)。

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">更多关于丹克分片的信息</ButtonLink>

## 去中心化汇总 {#decentralizing-rollups}

[汇总](/layer-2) 已经在对以太坊进行扩容。一个 [丰富的 Rollup 项目生态系统](https://l2beat.com/scaling/tvs) 正在使用户能够快速、廉价地进行交易，并提供一系列安全保证。然而，汇总在启动时使用了中心化的定序器（在将交易提交给以太坊之前完成所有交易处理和聚合的计算机）。这很容易受到审查，因为定序器操作员可能会受到制裁、贿赂或以其他方式被破坏。同时，[汇总](https://l2beat.com/scaling/summary) 验证传入数据的方式各不相同。最好的方法是由“证明者”提交 [欺诈证明](/glossary/#fraud-proof) 或有效性证明，但并非所有汇总都已达到这一步。即使是那些确实使用有效性/欺诈证明的汇总，也只使用一小部分已知的证明者。因此，扩容以太坊的下一个关键步骤是将运行定序器和证明者的责任分配给更多人。

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">更多关于汇总的信息</ButtonLink>

## 当前进展 {#current-progress}

Proto-Danksharding 已作为 2024 年 3 月坎昆-德内布（“Dencun”）网络升级的一部分成功实施。自实施以来，汇总已开始利用斑点存储，从而降低了用户的交易成本，并在斑点中处理了数百万笔交易。

完整丹克分片的工作仍在继续，在其先决条件（如提议者-构建者分离 (PBS) 和数据可用性采样 (DAS)）方面取得了进展。去中心化 Rollup 基础设施是一个渐进的过程——有许多不同的汇总正在构建略有不同的系统，并将以不同的速度完全去中心化。

[更多关于 Dencun 网络升级及其影响的信息](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />