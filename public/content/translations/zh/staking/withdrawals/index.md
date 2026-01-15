---
title: 质押提款
description: 本页面概述质押推送提款是什么，它们如何工作，质押人需要做什么才能获得奖励
lang: zh
template: staking
image: /images/staking/leslie-withdrawal.png
alt: 犀牛莱斯利与她的质押奖励
sidebarDepth: 2
summaryPoints:
  - 上海/卡佩拉升级实现了以太坊上的质押提款功能。
  - 验证者操作员必须提供一个提款地址以启用
  - 奖励每隔几天自动分发
  - 完全退出质押的验证者将收到他们的剩余余额
---

**质押提款**指的是将 ETH 从以太坊共识层（信标链）上的验证者账户转移到执行层，以便进行交易。

一旦用户提供了提款地址，超过 32 ETH 的**超额余额奖励**将自动并定期发送至每个验证者关联的提款地址。 用户也可以**完全退出质押**，解锁其全部验证者余额。

## 质押奖励 {#staking-rewards}

对于有效余额已满 32 ETH 的活跃验证者帐户，奖励支付将自动处理。

通过奖励获得的超过 32 ETH 的余额实际上并不构成本金，也不会增加该验证者在网络上的权重，因此每隔几天会自动提取作为奖励支付。 除了一次性提供提款地址外，这些奖励不需要验证者操作员采取任何行动。 这都是在共识层启动的，因此在任何步骤都不需要燃料（交易费）。

### 我们怎么发展到现在的？ {#how-did-we-get-here}

在过去的几年里，以太坊经历了几次网络升级，从依赖能源密集型挖矿的网络转变为由以太坊本身保护的网络。 现在，在以太坊上参与共识被称为“质押”，因为参与者自愿锁定以太币，将其“押注”以参与网络。 遵守规则的用户将获得奖励，而尝试欺骗的行为可能会受到惩罚。

自 2020 年 11 月推出质押存款合约以来，一些勇敢的以太坊先驱者自愿锁定资金以激活“验证者”，验证者即遵循网络规则有权正式证明和提出区块的特殊帐户。

在上海/卡佩拉升级之前，你可能无法使用或访问自己质押的以太币。 但现在，你可以选择在选定的帐户自动接收你的奖励，也可以随时提取质押的以太币。

### 我应该如何准备？ {#how-do-i-prepare}

<WithdrawalsTabComparison />

### 重要通知 {#important-notices}

为任何验证器帐户提供提款地址是一个必需的步骤，否则无法从其余额中提取以太币。

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription><strong>每个验证者账户只能分配一个提款地址，且仅可分配一次。</strong> 一旦选定地址并提交到共识层，便无法撤销或再次更改。 提交前，请仔细检查所提供地址的所有权和准确性。
</AlertDescription>
</AlertContent>
</Alert>

同时，如果你的助记符/助记词在离线时一直保持安全，没有受到任何损害。不提供提款地址<strong>不会给你的资金带来任何威胁</strong>。 未添加提款凭据只会将以太币保持锁定在验证者帐户中，直到提供提款地址为止。

## 完全退出质押 {#exiting-staking-entirely}

必须先提供提款地址，然后才能将_任何_资金从验证者账户余额中转出。

希望完全退出质押并取回全部余额的用户还必须使用验证者密钥签署并广播一个“自愿退出”的消息，这将启动退出质押的过程。 此操作通过你的验证者客户端完成，并提交给你的共识节点，无需燃料。

验证者从抵押退出的过程所需时间不同，具体取决于同时退出的人数。 一旦完成，此帐户将不再负责执行验证者网络职责，不再有资格获得奖励，并且不再拥有“质押”的以太币。 此时，该帐户将被标记为完全“可提款”。

一旦帐户被标记为“可提款”，并且已提供提款凭据，用户除了等待之外，无需再做任何事情。 区块提议者会自动并持续地清扫账户中符合条件的已退出资金，您的账户余额将在下一次<a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>清扫</a>期间全额转出（也称为“全额提款”）。

## 质押提款在什么时候启用？ {#when}

提款功能是上海/Capella 升级的一部分，该升级已于 **2023 年 4 月 12 日**进行。

上海/卡佩拉升级后，可以将之前质押的以太币收回到普通以太坊帐户中。 这就结束了质押流动性循环，并使以太坊向着建立一个可持续、可扩展、安全的去中心化生态系统迈进一步。

- [关于以太坊历史的更多信息](/ethereum-forks/)
- [关于以太坊路线图的更多信息](/roadmap/)

## 提款支付是如何运作的？ {#how-do-withdrawals-work}

特定验证者是否有资格提款取决于验证者帐户本身的状态。 在任何时候，都不需要用户输入来确定帐户是否应该发起提款，整个过程由共识层在连续循环中自动完成。

### 更愿意通过视频学习？ {#visual-learner}

请查看Finematics对以太坊质押提款的解释：

<YouTube id="RwwU3P9n3uo" />

### 验证者“清扫” {#validator-sweeping}

当验证者被安排提议下一个区块时，需要构建一个最多包含 16 个合格提款的提款队列。 首先从验证者索引 0 开始，根据协议规则判断该帐户是否有合格的提款，如果有，则将其添加到队列中。 被安排提议下一个区块的验证者将从上一个验证者离开的地方继续，无限期地按顺序进行。

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
想想模拟时钟。 时钟上的指针指向小时，朝一个方向前进，不会跳过任何小时，并且在到达最后一个数字后最终会绕回到开头。<br/><br/>
现在，想象一下，时钟上的数字不是 1 到 12，而是 0 到 N <em>（截至 2023 年 1 月，在共识层上注册过的验证者账户总数超过 500,000 个）。</em><br/><br/>
时钟上的指针指向下一个需要检查是否有合格提款的验证者。 它从 0 开始，一直前进，不会跳过任何账户。 到达最后一个验证者时，循环从头开始。
</AlertDescription>
</AlertContent>
</Alert>

#### 检查账户提款 {#checking-an-account-for-withdrawals}

在提议者扫描验证者以寻找可能的提款时，使用一系列简短的问题评估正接受检查的每个验证者，以确定是否应触发提款，如果是，应提取多少以太币。

1. \*\*是否已提供提款地址？\*\*如果未提供提款地址，则跳过该账户，不发起提款。
2. \*\*验证者是否已退出且可提款？\*\*如果验证者已完全退出，并且我们已到达其账户被视为“可提款”的时期，则将处理全额提款。 这将把所有剩余余额转移到提款地址。
3. \*\*有效余额是否已达到 32 ETH 的上限？\*\*如果账户具有提款凭证，未完全退出，并且有超过 32 ETH 的奖励等待领取，则将处理部分提款，仅将超过 32 ETH 的奖励转入用户的提款地址。

在验证者生命周期中，验证者操作员只会执行以下两个直接影响此流程的操作：

- 提供提款凭证以启用任何形式的提款
- 退出网络，这将触发全额提款

### 免 Gas 费 {#gas-free}

这种质押提款方法不需要质押人手动提交交易来请求提款特定数量以太币。 这意味着**无需 gas（交易费）**，并且提款也不会占用现有的执行层区块空间。

### 我会多久收到一次质押奖励？ {#how-soon}

单个区块最多可处理 16 笔提款。 以这个速度计算，每天可处理 115,200 个验证者提款（假设没有错过任何时隙）。 如上所述，没有符合条件的提款的验证者将被跳过，这将减少完成扫描所需的时间。

扩展这个算法，我们可以预估处理特定数量的提款所需的时间：

<TableContainer>

|   提款数量  |          完成时间         |
| :-----: | :-------------------: |
| 400,000 | 3.5 天 |
| 500,000 | 4.3 天 |
| 600,000 | 5.2 天 |
| 700,000 | 6.1 天 |
| 800,000 | 7.0 天 |

</TableContainer>

正如你所看到的，随着网络上的验证者数量增加，完成该过程的速度也会变慢。 错过的时隙数增加可能成比例减慢提款速度，但这通常代表了可能的结果中较慢的情况。

## 常见问题{#faq}

<ExpandableCard
title="提供提款地址后，我能将其更改为其他提款地址吗？"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
不能，提供提款凭证是单次操作，提交后无法更改。 </ExpandableCard>

<ExpandableCard
title="为什么提款地址只能设置一次？"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
设置执行层提款地址会永久更改该验证者的提款凭证。 这意味着旧的提款凭证将不再起作用，新的提款凭证将指向执行层帐户。

提款地址可以是智能合约（由其代码控制），也可以是外部拥有的帐户（EOA，由其私钥控制）。 目前，这些帐户无法向共识层传回信息以表示验证者凭证已更改，而添加此功能将给协议增加不必要的复杂性。

作为更改特定验证者提款地址的替代方案，用户可以选择设置智能合约作为他们的提款地址，该智能合约可以处理密钥轮换，例如 Safe。 将资金去向设置为自己的外部帐户的用户可以执行完全退出以提取所有的质押资金，然后使用新的凭证重新进行质押。 </ExpandableCard>

<ExpandableCard
title="What if I participate in staking tokens or pooled staking"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

如果你参加了[质押池](/staking/pools/)，或持有质押代币，你应该咨询你的提供商，了解更多关于如何处理质押提款的细节，因为每种服务的运作方式不同。

一般来说，用户应该可以随意收回他们的底层质押以太币，或者更换他们使用的质押服务提供商。 如果某个质押池变得过大，可以退出、收回资金，并通过<a href="https://rated.network/">较小的提供商</a>重新质押。 或者，如果你已经积攒了足够多的以太币，你就可以[自行质押](/staking/solo/)。

</ExpandableCard>

<ExpandableCard
title="奖励支付（部分提款）会自动进行吗？"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
是的，只要您的验证者提供了提款地址。 提款地址必须要提供一次，以便在最初时启用任何提款，之后奖励支付将每隔几天在进行验证者扫描时自动分发。 </ExpandableCard>

<ExpandableCard
title="Do full withdrawals happen automatically?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

不。如果你的验证者仍在网络上运行，则不会自动执行完全提款。 需要手动发起自愿退出。

一旦验证者完成退出流程，并且假设该帐户具有提款凭证，则剩余余额<em>随后将在</em>下一次<a href="#validator-sweeping">验证者扫描</a>期间提取。

</ExpandableCard>

<ExpandableCard title="我可以提取自定义金额吗？"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
提款被设计为自动推送，转移任何未用于质押的 ETH。 这包括已完成退出流程的帐户的全部余额。

无法手动请求要提取以太币的具体数量。 </ExpandableCard>

<ExpandableCard
title="我是一名验证者运营者。 在哪里可以找到有关启用提款的更多信息？"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

建议验证者运营商访问<a href="https://launchpad.ethereum.org/withdrawals/">质押启动板提款</a>页面，你可以在其中找到有关如何准备验证者以便提款的更多详细信息、事件的时间安排，以及有关提款如何运作的更多详细信息。

如需先在测试网上试用您的设置，请访问 <a href="https://hoodi.launchpad.ethereum.org">Hoodi 测试网质押启动板</a>开始。

</ExpandableCard>

<ExpandableCard
title="退出后，我可以通过存入更多 ETH 来重新激活我的验证者吗？"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
不可以。 一旦验证者退出并提取其全部余额，存入该验证者的任何额外资金将在下一次验证者扫描期间自动转移到提款地址。 要重新质押以太币，必须激活新的验证者。 </ExpandableCard>

## 扩展阅读{#further-reading}

- [质押启动板提款](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895：信标链将提款作为操作推送](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94：与 Potuz & Hsiao-Wei Wang 谈已质押 ETH 提款（测试）](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68：与 Alex Stokes 谈 EIP-4895：信标链将提款作为操作推送](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [了解验证者有效余额](https://www.attestant.io/posts/understanding-validator-effective-balance/)
