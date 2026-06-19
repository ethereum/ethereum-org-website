---
title: 合并
description: 了解合并——以太坊主网采用权益证明的时刻。
lang: zh
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - "以太坊主网使用权益证明，但并非一直如此。"
  - "从最初的工作量证明机制升级到权益证明被称为合并。"
  - "合并是指最初的以太坊主网与一个名为信标链的独立权益证明区块链合并，现在作为一个链存在。"
  - "合并使以太坊的能源消耗减少了约 99.95%。"
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  合并于 2022 年 9 月 15 日执行。这完成了以太坊向权益证明共识的过渡，正式弃用了工作量证明，并将能源消耗减少了约 99.95%。
</UpgradeStatus>

## 什么是合并？ {#what-is-the-merge}

合并是将以太坊最初的执行层（自[创世](/ethereum-forks/#frontier)以来一直存在的主网）与其新的权益证明共识层（信标链）结合在一起。它消除了对能源密集型挖矿的需求，转而使用质押的 ETH 来保护网络。这是实现[以太坊](/)愿景（更高的可扩展性、安全性和可持续性）的真正令人兴奋的一步。

<MergeInfographic />

最初，[信标链](/roadmap/beacon-chain/)与[主网](/glossary/#mainnet)是分开发布的。以太坊主网——连同其所有的账户、余额、智能合约和区块链状态——继续由[工作量证明](/developers/docs/consensus-mechanisms/pow/)保护，即使信标链使用[权益证明](/developers/docs/consensus-mechanisms/pos/)并行运行。合并是这两个系统最终结合在一起的时刻，工作量证明被权益证明永久取代。

想象一下，以太坊是一艘在尚未完全准备好进行星际航行之前就发射的宇宙飞船。通过信标链，社区建造了一个新引擎和一个坚固的船体。经过大量测试，是时候在飞行中热插拔新旧引擎了。这将新的、更高效的引擎合并到现有的飞船中，使其能够航行数光年并探索宇宙。

## 与主网合并 {#merging-with-mainnet}

从创世到合并，工作量证明一直保护着以太坊主网。这使得我们都习惯的以太坊区块链在 2015 年 7 月诞生，并具有所有熟悉的特征——交易、智能合约、账户等。

在以太坊的整个历史中，开发者一直在为最终从工作量证明过渡到权益证明做准备。2020 年 12 月 1 日，信标链作为独立于主网的区块链被创建，并并行运行。

信标链最初并不处理主网交易。相反，它通过就活跃验证者及其账户余额达成一致，来就其自身状态达成共识。经过广泛的测试，是时候让信标链就真实世界的数据达成共识了。合并后，信标链成为所有网络数据（包括执行层交易和账户余额）的共识引擎。

合并代表着正式切换到使用信标链作为区块生产的引擎。挖矿不再是生产有效区块的手段。相反，权益证明验证者接管了这一角色，现在负责处理所有交易的有效性并提议区块。

在合并中没有丢失任何历史记录。随着主网与信标链合并，它也合并了以太坊的整个交易历史。

<Alert variant="update">
<AlertContent>
<AlertDescription>
这种向权益证明的过渡改变了以太币的发行方式。了解更多关于[合并前后以太币发行](/roadmap/merge/issuance/)的信息。
</AlertDescription>
</AlertContent>
</Alert>

### 用户和持有者 {#users-holders}

**合并并没有为持有者/用户改变任何事情。**

_这值得重申_：作为 ETH 或以太坊上任何其他数字资产的用户或持有者，以及非节点运营的质押者，**您无需对您的资金或钱包进行任何操作来应对合并。** ETH 就是 ETH。没有所谓的“旧 ETH”/“新 ETH”或“Eth1”/“Eth2”，钱包在合并后的工作方式与以前完全相同——告诉您其他情况的人很可能是骗子。

尽管替换了工作量证明，但自创世以来的整个以太坊历史保持完好，并未因向权益证明的过渡而改变。合并前您钱包中持有的任何资金在合并后仍然可以访问。**您无需采取任何行动进行升级。**

[更多关于以太坊安全性的信息](/security/#eth2-token-scam)

### 节点运营者和去中心化应用 (dapp) 开发者 {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node operators and providers"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

关键行动项目包括：

1. _同时_运行共识客户端和执行客户端；自合并以来，获取执行数据的第三方端点不再起作用。
2. 使用共享的 JWT 密钥对执行客户端和共识客户端进行身份验证，以便它们可以安全地通信。
3. 设置一个 `fee recipient` 地址以接收您赚取的交易费小费/MEV。

未完成上述前两项将导致您的节点被视为“离线”，直到两层都已同步并经过身份验证。

未设置 `fee recipient` 仍将允许您的验证者照常运行，但您将错过未销毁的费用小费以及您的验证者提议的区块中本应赚取的任何 MEV。
</ExpandableCard>

<ExpandableCard
title="Non-validating node operators and infrastructure providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

在合并之前，一个执行客户端（如 Go以太坊 (Geth)、埃里贡、贝苏或奈瑟曼德）就足以接收、正确验证和传播网络中正在广播的区块。_合并后_，执行负载中包含的交易的有效性现在也取决于其所在的“共识区块”的有效性。

因此，一个完整的以太坊节点现在需要同时具备执行客户端和共识客户端。这两个客户端使用新的引擎 API 协同工作。引擎 API 需要使用 JWT 密钥进行身份验证，该密钥提供给两个客户端以允许安全通信。

关键行动项目包括：

- 除了执行客户端之外，还要安装共识客户端
- 使用共享的 JWT 密钥对执行客户端和共识客户端进行身份验证，以便它们可以安全地相互通信。

未完成上述项目将导致您的节点显示为“离线”，直到两层都已同步并经过身份验证。

</ExpandableCard>

<ExpandableCard
title="Dapp and smart contract developers"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

合并带来了共识的变化，其中还包括与以下相关的变化：

<ul>
  <li>区块结构</li>
  <li>时隙/区块时间</li>
  <li>操作码更改</li>
  <li>链上随机性来源</li>
  <li><em>安全区块头</em>和<em>已最终确定区块</em>的概念</li>
</ul>

有关更多信息，请查看 Tim Beiko 的这篇博文：<a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">合并如何影响以太坊的应用层</a>。

</ExpandableCard>

## 合并与能源消耗 {#merge-and-energy}

合并标志着以太坊工作量证明的结束，并开启了一个更可持续、更环保的以太坊时代。以太坊的能源消耗估计下降了 99.95%，使以太坊成为一个绿色区块链。了解更多关于[以太坊能源消耗](/energy-consumption/)的信息。

## 合并与扩容 {#merge-and-scaling}

合并还为在工作量证明下不可能实现的进一步可扩展性升级奠定了基础，使以太坊离实现[其路线图](/roadmap/)所构建的全面规模、安全性和可持续性又近了一步。

## 关于合并的误解 {#misconceptions}

<ExpandableCard
title="Misconception: &quot;Running a node requires staking 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e., run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

以太坊节点有两种类型：可以提议区块的节点和不能提议区块的节点。

提议区块的节点只占以太坊节点总数的一小部分。此类包括工作量证明 (PoW) 下的挖矿节点和权益证明 (PoS) 下的验证者节点。此类需要投入经济资源（例如工作量证明中的 GPU 哈希算力或权益证明中质押的 ETH），以换取偶尔提议下一个区块并赚取协议奖励的能力。

网络上的其他节点（即大多数节点）除了具有 1-2 TB 可用存储空间和互联网连接的消费级计算机外，不需要投入任何经济资源。这些节点不提议区块，但它们在保护网络方面仍然发挥着关键作用，通过监听新区块并根据网络共识规则在到达时验证其有效性，让所有区块提议者承担责任。如果区块有效，节点将继续在网络中传播它。如果区块因任何原因无效，节点软件将忽略它并停止其传播。

在任何一种共识机制（工作量证明或权益证明）下，任何人都可以运行非区块生产节点；如果条件允许，<em>强烈鼓励</em>所有用户这样做。运行节点对以太坊非常有价值，并为运行节点的任何个人带来额外的好处，例如提高安全性、隐私和抗审查性。

任何人运行自己节点的能力对于维持以太坊网络的去中心化是<em>绝对必要的</em>。

[更多关于运行您自己的节点的信息](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge failed to reduced gas fees.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Gas 费是网络需求相对于网络容量的产物。合并弃用了工作量证明，过渡到权益证明以达成共识，但并未显著改变任何直接影响网络容量或吞吐量的参数。

通过<a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">以 Rollup 为中心的路线图</a>，工作重点集中在扩展[二层网络 (l2)](/layer-2/) 的用户活动上，同时将一层网络 (l1) 主网作为安全的去中心化结算层，针对 Rollup 数据存储进行优化，以帮助使 Rollup 交易呈指数级便宜。向权益证明的过渡是实现这一目标的关键先决条件。[更多关于 Gas 和费用的信息。](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Transactions were accelerated substantially by The Merge.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
交易的“速度”可以通过几种方式来衡量，包括被包含在区块中的时间和最终确定的时间。这两者都略有变化，但用户不会注意到。

从历史上看，在工作量证明上，目标是每约 13.3 秒产生一个新区块。在权益证明下，时隙精确地每 12 秒发生一次，每个时隙都是验证者发布区块的机会。大多数时隙都有区块，但不一定全部都有（例如，验证者离线）。在权益证明中，区块的产生频率比工作量证明高约 10%。这是一个相当微不足道的变化，用户不太可能注意到。

权益证明引入了以前不存在的交易最终性概念。在工作量证明中，随着在交易之上挖掘的每一个区块的增加，撤销区块的能力变得呈指数级困难，但它永远不会完全达到零。在权益证明下，区块被捆绑成时段（6.4 分钟的时间跨度，包含 32 次出块机会），验证者对其进行投票。当时段结束时，验证者投票决定是否认为该时段“已证明”。如果验证者同意证明该时段，它将在下一个时段中被最终确定。撤销已最终确定的交易在经济上是不可行的，因为这需要获得并销毁超过总质押 ETH 的三分之一。

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge enabled staking withdrawals.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

在合并后的最初阶段，质押者只能访问因区块提议而赚取的费用小费和 MEV。这些奖励记入由验证者控制的非质押账户（称为<em>费用接收者</em>），并可立即使用。这些奖励与执行验证者职责的协议奖励是分开的。

自上海/Capella 网络升级以来，质押者现在可以指定一个<em>提款地址</em>，开始接收任何多余质押余额（来自协议奖励的超过 32 个 ETH）的自动支付。此次升级还使验证者能够在退出网络时解锁并收回其全部余额。

[更多关于质押提款的信息](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Now that The Merge is complete, and withdrawals are enabled, stakers could all exit at once.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
由于上海/Capella 升级启用了提款，验证者被激励提取其超过 32 ETH 的质押余额，因为这些资金不会增加收益，否则会被锁定。根据 APR（由质押的 ETH 总量决定），他们可能会被激励退出其验证者以收回其全部余额，或者可能使用其奖励质押更多以赚取更多收益。

这里需要注意的一个重要事项是，完整的验证者退出受到协议的速率限制，每个时段（每 6.4 分钟）只有这么多验证者可以退出。此限制根据活跃验证者的数量而波动，但大约每天可以从网络中退出总质押 ETH 的 0.33%。

这防止了质押资金的大规模流失。此外，它防止了能够访问大部分总质押 ETH 的潜在攻击者在协议执行罚没惩罚之前，在同一时段内犯下可罚没的罪行并退出/提取所有违规验证者余额。

APR 也是有意动态的，允许质押者市场平衡他们愿意获得多少报酬来帮助保护网络。如果费率太低，那么验证者将以协议限制的速率退出。逐渐地，这将提高所有留下的人的 APR，再次吸引新的或回归的质押者。
</ExpandableCard>

## “Eth2”怎么了？ {#eth2}

“Eth2”一词已被弃用。在将“Eth1”和“Eth2”合并为一条链后，不再需要区分两个以太坊网络；只有以太坊。

为了减少混淆，社区更新了这些术语：

- “Eth1”现在是“执行层”，负责处理交易和执行。
- “Eth2”现在是“共识层”，负责处理权益证明共识。

这些术语更新仅改变了命名约定；这并没有改变以太坊的目标或路线图。

[了解更多关于“Eth2”重命名的信息](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## 升级之间的关系 {#relationship-between-upgrades}

以太坊的升级都在某种程度上相互关联。因此，让我们回顾一下合并与其他升级的关系。

### 合并与信标链 {#merge-and-beacon-chain}

合并代表正式采用信标链作为最初主网执行层的新共识层。自合并以来，验证者被分配来保护以太坊主网，而在[工作量证明](/developers/docs/consensus-mechanisms/pow/)上挖矿不再是有效的区块生产手段。

相反，区块由质押了 ETH 的验证节点提议，以换取参与共识的权利。这些升级为未来的可扩展性升级（包括分片）奠定了基础。

<ButtonLink href="/roadmap/beacon-chain/">
  信标链
</ButtonLink>

### 合并与上海升级 {#merge-and-shanghai}

为了简化并最大限度地集中精力成功过渡到权益证明，合并升级并未包含某些预期的功能，例如提取质押 ETH 的能力。此功能在上海/Capella 升级中单独启用。

对于那些好奇的人，请了解更多关于 Vitalik 在 2021 年 4 月 ETHGlobal 活动上展示的[合并后会发生什么](https://youtu.be/7ggwLccuN5s?t=101)的信息。

### 合并与分片 {#merge-and-data-sharding}

最初，计划是在合并之前进行分片以解决可扩展性问题。然而，随着[二层网络 (l2) 扩容解决方案](/layer-2/)的繁荣，优先级转移到了首先将工作量证明替换为权益证明。

分片计划正在迅速发展，但鉴于二层网络 (l2) 技术在扩展交易执行方面的兴起和成功，分片计划已转向寻找最理想的方法来分配存储来自 Rollup 合约的压缩调用数据的负担，从而实现网络容量的指数级增长。如果不首先过渡到权益证明，这是不可能实现的。

<ButtonLink href="/roadmap/danksharding/">
  分片
</ButtonLink>

## 延伸阅读 {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />