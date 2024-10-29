---
title: 合并
description: 了解合并 - 以太坊主网何时采用权益证明机制。
lang: zh
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: 以太坊主网采用权益证明机制，但情况并非一直如此。
summaryPoint2: 从原有的工作量证明机制过渡到权益证明机制的升级称为合并。
summaryPoint3: 合并是指原有的以太坊主网与单独的权益证明区块链（即信标链）合并，现已成为一条链。
summaryPoint4: 合并将使以太坊的能源消耗减少大约 99.95%。
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  合并于 2022 年 9 月 15 日执行， 它完成了以太坊向权益证明共识的过渡，以太坊正式弃用了工作量证明并将能源消耗减少了约 99.95%。
</UpgradeStatus>

## 什么是合并？ {#what-is-the-merge}

合并是指以太坊的原有执行层（从[创世块](/history/#frontier)开始就一直存在的主网）加入其新的权益证明共识层，即信标链。 合并摒弃了消耗大量能源的挖矿，而是通过质押以太币来保护网络的安全。 这是实现以太坊愿景 — 可扩展性、安全性和可持续性更强 — 这一过程中真正激动人心的一步。

<MergeInfographic />

[信标链](/roadmap/beacon-chain/)最初是与[主网](/glossary/#mainnet)分开上线的。 以太坊主网（所有帐户、余额、智能合约和区块链状态）仍继续由[工作量证明](/developers/docs/consensus-mechanisms/pow/)保护，即便与此同时，与之一起运行的信标链采用[权益证明](/developers/docs/consensus-mechanisms/pos/)。 合并是指这两个系统最终整合在一起之时，而工作量证明被权益证明永久取代。

想象一下，以太坊是一艘还没有完全准备好进行星际航行的就已经起飞的宇宙飞船。 借助信标链，社区构建了新的引擎和坚固的外壳。 经过大量测试，是时候在飞行途中通过“热插拔”用新引擎更换旧引擎了。 将新的、更高效引擎装入现有飞船后，飞船就能够开始许多光年的航行并占领整个宇宙。

## 与主网合并 {#merging-with-mainnet}

直到合并之前，工作量证明一直保护着以太坊主网的安全。 这使得我们都习惯的以太坊区块链在 2015 年 7 月诞生，并且具有我们熟悉的所有功能 — 交易、智能合约、帐户等等。

纵观以太坊的历史，开发人员一直在为从工作量证明到权益证明的最终过渡做准备。 信标链于 2020 年 12 月 1 日创建，它作为独立的区块链与主网一起运行。

信标链最开始并不处理主网上的交易。 而是通过对活跃的验证者及其帐户余额达成一致来就自己的状态达成共识。 经过广泛测试后，是时候让信标链就真实数据上达成共识了。 合并后，信标链将成为所有网络数据的共识引擎，包括执行层交易和帐户余额。

合并代表正式转变成使用信标链作为区块生产引擎。 挖矿将不再是生产有效区块的手段。 而是由权益证明验证者承担这个角色，并且现在负责处理所有交易的有效性及提出区块。

历史记录不会在合并中丢失。 随着主网与信标链合并，它还合并以太坊的整个交易历史记录。

<InfoBanner>
这种向权益证明的过渡改变了以太币的发行方式。 了解有关<a href="/roadmap/merge/issuance/">合并前后以太币发行的更多信息</a>。
</InfoBanner>

### 用户与持有者 {#users-holders}

**对于持有者/用户而言，合并不会带来任何变化。**

_再次提醒：_作为以太币或以太坊上任何其他数字资产的用户或持有者，以及非节点运营的质押人，**不需要在合并之前对你的资金或钱包做任何事情以加入合并。**以太币还是以太币。 没有像“旧以太币”/“新以太币”或“以太坊 1”/“以太坊 2”这样说法，钱包在合并前后的工作方式一样 — 告诉你其他说法人很可能是骗子。

虽然权益证明替代了工作量证明，但是以太坊自创世块以来的全部历史记录都完整保留且没有改变。 合并前你钱包里的所有资金在合并后仍可使用。 **你不需要采取任何行动来升级。**

[有关以太坊安全的更多内容](/security/#eth2-token-scam)

### 节点运营商与去中心化应用程序开发者 {#node-operators-dapp-developers}

<ExpandableCard
title="质押节点运营商与提供商"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

主要操作项目包括：

1. 同时运行共识层客户端和执行层客户端；合并之后，获取执行数据的第三方端点将不可用。
2. 使用共享 JWT 密钥对执行层和共识层客户端进行身份验证，以便它们能够安全地通信。
3. 设置“费用接收人”地址，以接收你赚取的交易费的小费/矿工可提取价值。

如果没有完成上述操作的前两项，会导致你的节点被视为“离线”，直到这两层都完成同步和身份验证。

不设置“费用接收人”将仍然允许验证者像往常一样运行，但你将无法获得交易费小费和矿工可提取价值，这些你原本可以在你的验证者提出的区块中赢得。
</ExpandableCard>

<ExpandableCard
title="非验证节点运营商和基础设施提供商"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

在合并之前，执行层客户端（比如 Geth、Erigon、Besu 或 Nethermind）足以接收、正确验证和传播由网络传播的区块。 合并之后，包含在执行负载中的交易的有效性也将取决于包含它的“共识区块”的有效性。

因此，一个完整的以太坊节点现在同时需要执行层客户端和共识层客户端。 这两种客户端使用一个新的引擎应用程序接口协同工作。 该引擎应用程序接口需要使用 JWT 密钥进行身份验证，密钥提供给两种客户端以允许安全通信。

主要行动项目包括：

- 除了安装执行客户端外，还需要安装共识客户端
- 使用共享的 JWT 秘钥对执行客户端和共识客户端进行身份验证，以便它们可以安全地彼此通信。

如果不能及时完成上述项目，在合并之后你的节点会显示为“离线”，直到两层都同步并通过身份验证。

</ExpandableCard>

<ExpandableCard
title="去中心化应用程序和智能合约开发者"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

合并导致共识层发生变化，其中还包括以下方面的变化：<

<ul>
  <li>区块结构</li>
  <li>时隙/区块时间</li>
  <li>操作码变化</li>
  <li>链上随机性的来源</li>
  <li><em>安全头部区块</em> 和<em>最终确定区块</em>的概念</li>
</ul>

有关详细信息，请查看 Tim Beiko 的博客文章<a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">“合并对以太坊的应用程序层有何影响”</a>。

</ExpandableCard>

## 合并和能源消耗 {#merge-and-energy}

合并标志着以太坊工作量证明的终结，从此以太坊进入一个可持续性更强、更加环保的时代。 以太坊的能耗预计会下降 99.95%，这使得以太坊成为一个绿色环保的区块链。 了解有关[以太坊能源消耗](/energy-consumption/)的更多信息。

## 合并与扩容 {#merge-and-scaling}

合并还为工作量证明下无法实现的进一步可扩展性升级奠定了基础，使以太坊距离实现[以太坊愿景](/roadmap/vision/)中概述的全面可扩展、安全性和可持续性更近一步。

## 合并的误区 {#misconceptions}

<ExpandableCard
title="误区：&quot;运行一个节点需要质押 32 个以太币。&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

以太坊节点有两种类型：可以提议区块的节点和不能提议区块的节点。

可以提议区块的节点只占以太坊节点总数的一小部分。 这类节点包括工作量证明 (PoW) 下的挖矿节点和权益证明 (PoS) 下的验证者节点。 该类别需要投入经济资源（例如工作量证明中的图形处理单元哈希算力或权益证明中的质押以太币），以换取有时提出下一个区块并获得协议奖励的能力。

网络上的其他节点（例如大部分节点）不需要投入任何经济资源，只需一台有着 1 到 2 TB的可用存储空间并且可以连接互联网的消费级计算机即可。 这些节点不提出区块，但它们仍然在网络安全中扮演着关键的角色，通过监听新的区块，在区块到达时根据网络共识规则验证它们的有效性，并对所有的区块产出负责任。 如果区块是有效的，节点将继续通过网络传播它。 如果区块出于任何原因无效，节点软件将会忽略它将他视为无效区块并停止传播。

在任一共识机制（工作量证明或权益证明）下，任何人都可以运行非区块生产节点；我们<em>强烈建议</em>所有有能力的用户都这样做。 运行一个节点对以太坊非常有价值，并为任何运行节点的个人提供额外的好处，如改进的安全性、隐私性和抗审查性。

让任何人都拥有运行自己的节点的能力对于维持以太坊网络的去中心化<em>极其重要</em>。

<a href="/run-a-node/">更多关于运行你自己的节点的信息</a>

</ExpandableCard>

<ExpandableCard
title="误解：&quot;合并未能降低燃料费用。&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

燃料费用是网络需求受限于网络容量的产物。 合并弃用了工作量证明，过渡到权益证明共识机制，但这并不会明显改变直接影响网络容量和吞吐量的任何参数。

根据<a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">以卷叠为中心的路线图</a>，工作重点是扩展用户在<a href="/layer-2/">二层网络</a>的活动，同时使一层主网成为安全的去中心化结算层，针对卷叠数据存储进行优化，帮助迅速降低卷叠交易费用。 转变成权益证明机制是实现这一点的关键先导步骤。 <a href="/developers/docs/gas/">更多关于燃料和费用的信息。</a>

</ExpandableCard>

<ExpandableCard
title="误解：&quot;合并令交易大幅提速。&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
交易的“速度”可用多种方式衡量，既可以是入块时间，也可以是最终确定的时间。 这些变化都是很轻微的，用户不会注意到

以前，工作量证明机制的目标是每 13.3 秒产生一个新的区块。 在权益证明机制下，时隙每 12 秒精确出现一次，每个时隙都是验证者发布区块的机会。 大多数时隙都有区块产出，但不一定全部都有（即验证者离线）。 在权益证明机制下，区块的产生频率比工作量证明下提升了约 10%。 这是一个相当微不足道的变化，用户不太可能注意到。

权益证明引入了以前不存在的交易最终确定概念。 在工作量证明机制下，回滚一个区块的难度将随着在它之后因交易产生的区块数目的增加而呈指数增长，但这个难度却永远不会归零。 在权益证明机制下，区块打包在一起放入由验证者投票的时段中，时段为 6.4 分钟的时间跨度，包含 32 次出块机会。 当一个时段结束时，验证者投票来决定是否认为该时段“合理”。 如果验证者同意证明该时段的合理性，它将在下一个时段中最终确定。 撤销最终确定的交易在经济上是不可行的，因为它需要获得并销毁超过 1/3 的质押以太币总量。

</ExpandableCard>

<ExpandableCard
title="误解：&quot;合并启用了质押提款。&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

在刚刚合并后，质押者只能获得因提议区块而赚取的小费和最大可提取价值。 这些奖励会被记入由验证者（称为<em>费用接收者</em>）控制的非质押帐户，并可以立即获得。 这些奖励与因履行验证者职责而获得的协议奖励区分开。

在上海/卡佩拉网络升级后，质押者现在可以指定一个<em>提款地址</em>，开始接收自动支付的任何超额质押余额（协议奖励中超过 32 以太币的部分）。 这次升级还使验证者可以在退出网络时解锁并收回全部余额。

<a href="/staking/withdrawals/">更多关于质押提款的信息</a>

</ExpandableCard>

<ExpandableCard
title="误解：&quot;因为合并已经完成，提款功能也已启用，所以质押人可以全部一次性退出。&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
上海/卡佩拉升级启用提款功能后，我们鼓励所有验证者将超过 32 以太币的质押余额提取出来，因为这些资金不会增加收益并且不提取还会被锁定。 根据年化利率（由质押的以太币总量决定），验证者可能会退出以提取他们的全部余额，或者使用他们的奖励增加质押，以赚取更多收益。

这里有一项重要限制，协议对验证者的退出速度设置了限制，每个时段只允许退出一定数量的验证者（每 6.4 分钟退出 1 个）。 这一限制会根据活跃验证者的数量浮动，但每天可以退出网络的验证者数量为质押以太币总数的大约 0.33%。

这样可以防止质押资金大规模流出。 另外，还可以防止掌握一大部分质押以太币总量的潜在攻击者进行可遭致罚没的行为，然后在同一时段、协议能够执行罚没之前退出/提取违规所得的所有验证者余额。

以太坊故意将年化利率设置为动态，以便市场上的质押人权衡他们愿意为保护网络付出多少资金。 如果利率过低，验证者将按照协议限制的速度退出。 这样会逐渐提高所有留下来的验证者的年化利率，从而吸引新的质押人加入或者退出的质押人回归。
</ExpandableCard>

## “以太坊 2”发生了什么？ {#eth2}

“以太坊 2”一词已弃用。 在将“以太坊 1”和“以太坊 2”合并为一条链之后，将不再需要区分两个不同 的以太坊网络；只有以太坊。

为了减少混乱，社区更新了这些条款：

- “以太坊 1”现在是处理交易和执行的“执行层”。
- “以太坊 2”现在是处理权益证明共识的“共识层”。

这些术语的更新仅会改变命名约定；不会改变以太坊的目标及路线图。

[了解有关“以太坊 2”重命名的更多信息](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## 升级间的关系 {#relationship-between-upgrades}

以太坊所有升级都存在一些关联。 因此，让我们回顾一下合并与其他升级的关系。

### 合并与信标链 {#merge-and-beacon-chain}

合并表示正式采用信标链作为原有主网执行层的新共识层。 合并之后，将分配验证者以保护以太坊主网的安全，[工作量证明](/developers/docs/consensus-mechanisms/pow/)机制下的挖矿将不再是有效的区块生产方式。

相反，区块由验证节点提出，验证节点质押以太币以获得参与共识的权利。 这些升级为未来的可扩展性升级（包括分片）奠定了基础。

<ButtonLink href="/roadmap/beacon-chain/">
  信标链
</ButtonLink>

### 合并与上海升级 {#merge-and-shanghai}

为了简化并确保顺利过渡到权益证明，合并升级没有包括某些预期的功能，如提取质押以太币的功能。 该功能是通过上海/卡佩拉升级单独启用的。

如果感兴趣，请参阅 Vitalik 在 2021 年 4 月的 ETHGlobal 活动中发表的演讲“[合并后会发生什么](https://youtu.be/7ggwLccuN5s?t=101)”，了解更多信息。

### 合并与分片 {#merge-and-data-sharding}

最初的计划是在合并之前进行分片，以解决可扩展性问题。 然而，随着[二层网络扩容解决方案](/layer-2/)方兴未艾，工作重点已经变成首先从工作量证明过渡到权益证明。

分片计划正在迅速发展，但随着扩展交易执行的二层网络技术的兴起和成功，分片计划已变为寻找最佳的负载分配方式，来存储来自卷叠合约中的压缩调用数据，这使得网络容量呈指数级增长。 如果不先过渡到权益证明，这是不可能的。

<ButtonLink href="/roadmap/danksharding/">
  分片
</ButtonLink>

## 延伸阅读 {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
