---
title: 质押提款
description: 本页面概述了什么是质押推送提款、它们如何运作，以及质押者需要做什么才能获得奖励
lang: zh
template: staking
image: /images/staking/leslie-withdrawal.png
alt: 犀牛 Leslie 和她的质押奖励
sidebarDepth: 2
summaryPoints:
  - 验证者操作员必须提供提款地址才能启用提款
  - 传统验证者每隔几天会自动提取超过 32 ETH 的多余余额
  - 复利验证者可在高达 2048 ETH 的全部余额上赚取奖励
  - 完全退出质押的验证者将收到其剩余余额
---

**质押提款**是指将 ETH 从以太坊共识层（信标链）上的验证者账户转移到执行层，以便在执行层进行交易。

提款的运作方式取决于你的验证者的提款凭证类型：

- **传统验证者（类型 1）**：超过 32 ETH 的多余余额会自动且定期地发送到与该验证者关联的提款地址。超过 32 ETH 的奖励不会增加该验证者在网络上的权重。
- **复利验证者（类型 2）**：奖励会复利计入验证者的有效余额中，最高可达 2048 ETH，从而增加验证者的权重并赚取更多奖励。只有超过 2048 ETH 的余额才会被自动清扫。

用户也可以**完全退出质押**，解锁其全部验证者余额。

## 质押奖励 {#staking-rewards}

奖励的处理方式取决于验证者的凭证类型：

**传统验证者（类型 1）**的有效余额上限为 32 ETH。通过奖励赚取的任何超过 32 ETH 的余额都不会计入本金，也不会增加该验证者在网络上的权重，并且每隔几天就会作为奖励支付自动提取。除了提供一次提款地址外，这些奖励不需要验证者操作员执行任何操作。这一切都在共识层上发起，因此在任何步骤都不需要燃料（交易费）。

**复利验证者（类型 2）**的有效余额可以在 32 到 2048 ETH 之间。这些验证者赚取的奖励会复利计入其有效余额中，从而增加验证者的权重和未来的奖励。自动清扫仅在余额超过 2048 ETH 时发生。要提取低于 2048 ETH 阈值的奖励，复利验证者必须从执行层手动触发部分提款，这需要消耗燃料。

### 我们是如何走到这一步的？ {#how-did-we-get-here}

在过去几年中，[以太坊](/)经历了多次网络升级，过渡到一个由 ETH 本身保护的网络，而不是像以前那样采用能源密集型的挖矿方式。现在，参与以太坊共识被称为“质押”，因为参与者自愿锁定 ETH，将其“质押”以获得参与网络的资格。遵守规则的用户将获得奖励，而试图作弊的行为将受到惩罚。

自 2020 年 11 月质押存款合约启动以来，一些勇敢的以太坊先驱自愿锁定资金以激活“验证者”，这是一种特殊账户，有权按照网络规则正式证明和提议区块。

在上海/Capella 升级之前，你无法使用或访问你质押的 ETH。但现在，你可以选择自动将奖励接收到选定的账户中，也可以随时提取你质押的 ETH。

### 我该如何准备？ {#how-do-i-prepare}

<WithdrawalsTabComparison />

### 重要通知 {#important-notices}

提供提款地址是任何验证者账户在有资格从其余额中提取 ETH 之前必须完成的步骤。

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**每个验证者账户只能分配一个提款地址，且只能分配一次。**一旦选择了一个地址并提交给共识层，就无法撤销或再次更改。在提交之前，请仔细检查所提供地址的所有权和准确性。
</AlertDescription>
</AlertContent>
</Alert>

如果不提供提款地址，**在此期间你的资金不会受到任何威胁**，前提是你的助记词一直安全地离线保存，并且没有以任何方式被泄露。未添加提款凭证只会让 ETH 像以前一样锁定在验证者账户中，直到提供提款地址为止。

## 复利验证者 {#compounding-validators}

验证者可以通过将其提款凭证从类型 1 转换为类型 2 来选择加入**复利**。这会将最大有效余额从 32 ETH 提高到 **2048 ETH**，允许奖励复利计入验证者的有效余额中，而不是被自动清扫。

启用复利后：

- 奖励以 1 ETH 的增量增加验证者的有效余额（受限于一个小的[滞后缓冲区](https://www.attestant.io/posts/understanding-validator-effective-balance/)），随着时间的推移赚取更多奖励
- 自动清扫仅在余额超过 2048 ETH 时发生
- 低于 2048 ETH 阈值的部分提款必须从执行层手动触发（这需要消耗燃料）
- 多个验证者可以**合并**为一个复利验证者，从而减少运营开销

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**从类型 1 转换为类型 2 提款凭证是不可逆的。**请使用[质押启动板 (Staking Launchpad)](https://launchpad.ethereum.org/validator-actions) 作为此转换的官方工具。有关转换过程、风险和合并的更多详细信息，请参阅 [MaxEB 深度解析](/roadmap/pectra/maxeb/)。
</AlertDescription>
</AlertContent>
</Alert>

## 完全退出质押 {#exiting-staking-entirely}

在将_任何_资金从验证者账户余额中转出之前，必须提供提款地址。

希望完全退出质押并提取全部余额的用户必须发起“自愿退出”。这可以通过两种方式完成：

- **使用验证者密钥**：使用你的验证者客户端签名并广播自愿退出消息，提交给你的共识节点。这不需要燃料。
- **使用提款凭证**：使用你的提款地址从执行层触发退出，无需访问验证者签名密钥。这需要发起一笔交易并消耗燃料。

验证者退出质押的过程需要的时间长短不一，具体取决于同时退出的其他验证者数量。一旦完成，该账户将不再负责履行验证者网络职责，不再有资格获得奖励，也不再将其 ETH 处于“质押”状态。此时，该账户将被标记为完全“可提款”。

一旦账户被标记为“可提款”，并且已提供提款凭证，用户除了等待之外不需要做任何其他事情。区块提议者会自动且持续地清扫账户以寻找符合条件的已退出资金，你的账户余额将在下一次<a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>清扫</a>期间全额转移（也称为“全额提款”）。

## 质押提款是何时启用的？ {#when}

提款功能最初作为上海/Capella 升级的一部分于 **2023 年 4 月 12 日**启用。随后的 [Pectra 升级](/roadmap/pectra/)（2025 年 5 月）引入了具有更高最大有效余额（2048 ETH）的复利验证者，以及由执行层触发的退出和部分提款。

上海/Capella 升级使得以前质押的 ETH 能够被回收至常规以太坊账户中。这完成了质押流动性的闭环，并使以太坊在构建可持续、可扩容、安全的去中心化生态系统的旅程中又迈进了一步。

- [了解更多以太坊历史](/ethereum-forks/)
- [了解更多以太坊路线图](/roadmap/)

## 提款支付是如何运作的？ {#how-do-withdrawals-work}

给定的验证者是否有资格提款取决于验证者账户本身的状态。在任何给定时间都不需要用户输入来决定是否应为账户发起提款——整个过程由共识层在连续循环中自动完成。

### 更喜欢视觉学习？ {#visual-learner}

查看 Finematics 对以太坊质押提款的解释：

<YouTube id="RwwU3P9n3uo" />

### 验证者“清扫” {#validator-sweeping}

当验证者被安排提议下一个区块时，它需要构建一个最多包含 16 个符合条件的提款的提款队列。这是通过最初从验证者索引 0 开始，根据协议规则确定该账户是否有符合条件的提款，如果有则将其添加到队列中来完成的。被设置为提议下一个区块的验证者将从上一个验证者停止的地方继续，无限期地按顺序进行。

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
想象一个模拟时钟。时钟上的指针指向小时，沿一个方向前进，不会跳过任何小时，并在到达最后一个数字后最终再次回到起点。

现在，想象时钟上不是 1 到 12，而是 0 到 N _（曾在共识层上注册过的验证者账户总数，截至 2023 年 1 月已超过 500,000 个）。_

时钟上的指针指向下一个需要检查是否有符合条件提款的验证者。它从 0 开始，一直向前推进，不会跳过任何账户。当到达最后一个验证者时，循环将回到起点继续。
</AlertDescription>
</AlertContent>
</Alert>

#### 检查账户的提款情况 {#checking-an-account-for-withdrawals}

当提议者在验证者中清扫可能的提款时，每个被检查的验证者都会根据一系列简短的问题进行评估，以确定是否应触发提款，如果应该，则确定应提取多少 ETH。

1. **是否已提供提款地址？**如果没有提供提款地址，则跳过该账户，不发起提款。
2. **验证者是否已退出且可提款？**如果验证者已完全退出，并且我们已经到达其账户被认为是“可提款”的时段，那么将处理全额提款。这会将全部剩余余额转移到提款地址。
3. **余额是否超过最大有效余额？**对于传统（类型 1）验证者，此阈值为 32 ETH。对于复利（类型 2）验证者，此阈值为 2048 ETH。如果账户有提款凭证，未完全退出，并且余额高于其阈值，则将处理部分提款，仅将多余部分转移到用户的提款地址。

在验证者的生命周期中，验证者操作员只采取两项直接影响此流程的操作：

- 提供提款凭证以启用任何形式的提款
- 从网络中退出，这将触发全额提款

### 免燃料费 {#gas-free}

自动提款清扫不需要质押者手动提交交易。这意味着自动清扫**不需要燃料（交易费）**，并且它们不会竞争现有的执行层区块空间。

请注意，希望触发低于 2048 ETH 阈值的部分提款的[复利验证者](#compounding-validators)必须从执行层手动执行此操作，这确实需要消耗燃料。

### 我多久能获得一次质押奖励？ {#how-soon}

单个区块最多可以处理 16 笔提款。按照这个速度，每天可以处理 115,200 笔验证者提款（假设没有错过的时隙）。如上所述，没有符合条件提款的验证者将被跳过，从而缩短完成清扫的时间。

扩展此计算，我们可以估算处理给定数量的提款所需的时间：

<TableContainer>

| 提款数量 | 完成时间 |
| :-------------------: | :--------------: |
|        400,000        |     3.5 天     |
|        500,000        |     4.3 天     |
|        600,000        |     5.2 天     |
|        700,000        |     6.1 天     |
|        800,000        |     7.0 天     |

</TableContainer>

如你所见，随着网络上验证者数量的增加，这个速度会变慢。错过的时隙增加可能会按比例减慢这个速度，但这通常代表了可能结果中较慢的一面。

## 常见问题 {#faq}

<ExpandableCard
title="一旦我提供了提款地址，我可以将其更改为其他提款地址吗？"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
不可以，提供提款凭证的过程是一次性的，一旦提交就无法更改。
</ExpandableCard>

<ExpandableCard
title="为什么提款地址只能设置一次？"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
通过设置执行层提款地址，该验证者的提款凭证已被永久更改。这意味着旧凭证将不再有效，新凭证将指向一个执行层账户。

提款地址可以是智能合约（由其代码控制），也可以是外部帐户（EOA，由其私钥控制）。目前，这些账户无法将消息传回共识层以发出更改验证者凭证的信号，而添加此功能会给协议增加不必要的复杂性。

作为更改特定验证者提款地址的替代方案，用户可以选择将智能合约设置为其提款地址，该合约可以处理密钥轮换，例如 Safe。将资金设置为自己外部帐户的用户可以执行完全退出以提取其所有质押资金，然后使用新凭证重新质押。
</ExpandableCard>

<ExpandableCard
title="如果我参与了质押代币或质押池怎么办？"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

如果你是[质押池](/staking/pools/)的一部分或持有质押代币，你应该向你的提供商咨询有关如何处理质押提款的更多详细信息，因为每项服务的运作方式都不同。

通常，用户应该可以自由地收回其底层质押的 ETH，或更改他们使用的质押提供商。如果某个特定的质押池变得太大，可以退出资金、赎回，并与[较小的提供商](https://rated.network/)重新质押。或者，如果你积累了足够的 ETH，你可以[在家质押](/staking/solo/)。

</ExpandableCard>

<ExpandableCard
title="奖励支付（部分提款）会自动发生吗？"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
对于**传统（类型 1）验证者**，是的——只要你的验证者提供了提款地址。必须提供一次以最初启用任何提款，然后每隔几天在每次验证者清扫时自动触发奖励支付。

对于**复利（类型 2）验证者**，奖励会复利计入有效余额中，而不是被清扫。自动清扫仅在余额超过 2048 ETH 时发生。要提取低于此阈值的奖励，你必须从执行层手动触发部分提款。
</ExpandableCard>

<ExpandableCard
title="全额提款会自动发生吗？"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

不会，如果你的验证者在网络上仍然活跃，全额提款不会自动发生。这需要手动发起自愿退出。

一旦验证者完成了退出过程，并且假设该账户有提款凭证，剩余余额_然后_将在下一次<a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "FAQ happen automatically (sweep)", eventName: "click" }}>验证者清扫</a>期间被提取。

</ExpandableCard>

<ExpandableCard title="我可以提取自定义金额吗？"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
对于**传统（类型 1）验证者**，提款会自动推送，转移任何未积极促成质押的 ETH。这包括已完成退出过程的账户的全部余额。对于类型 1 验证者，无法手动请求提取特定金额的 ETH。

**复利（类型 2）验证者**可以从执行层触发特定金额的部分提款，只要剩余余额保持在 32 ETH 或以上即可。这需要发起一笔交易并消耗燃料。
</ExpandableCard>

<ExpandableCard
title="我运营一个验证者。我在哪里可以找到有关启用提款的更多信息？"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

建议验证者操作员访问[质押启动板提款 (Staking Launchpad Withdrawals)](https://launchpad.ethereum.org/withdrawals/) 页面，在那里你会找到有关如何为你的验证者准备提款、事件时间安排以及有关提款如何运作的更多详细信息。

要首先在测试网上试用你的设置，请访问 [Hoodi 测试网质押启动板 (Hoodi Testnet Staking Launchpad)](https://hoodi.launchpad.ethereum.org) 开始。

</ExpandableCard>

<ExpandableCard
title="退出后，我可以通过存入更多 ETH 来重新激活我的验证者吗？"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
不可以。一旦验证者退出并且其全部余额已被提取，存入该验证者的任何额外资金将在下一次验证者清扫期间自动转移到提款地址。要重新质押 ETH，必须激活一个新的验证者。
</ExpandableCard>

<ExpandableCard
title="传统验证者和复利验证者之间有什么区别？"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
传统验证者使用**类型 1** 提款凭证，其有效余额上限为 32 ETH。任何多余部分每隔几天会自动清扫到提款地址。

复利验证者使用**类型 2** 提款凭证，其有效余额最高可达 2048 ETH。奖励会复利计入其有效余额中，从而增加验证者在网络上的权重和未来的奖励。自动清扫仅在余额超过 2048 ETH 时发生。要提取低于此阈值的金额，必须从执行层手动触发部分提款。

有关更多详细信息，请参阅 [MaxEB 深度解析](/roadmap/pectra/maxeb/)。
</ExpandableCard>

<ExpandableCard
title="我如何转换为复利验证者？"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
你可以使用[质押启动板 (Staking Launchpad)](https://launchpad.ethereum.org/validator-actions) 将提款凭证从类型 1 转换为类型 2。此操作是**不可逆的**——一旦转换，就无法恢复为类型 1 凭证。

转换后，你还可以将多个验证者**合并**为一个，将其余额合并到一个复利验证者中。有关转换过程、风险和合并工具的完整演练，请参阅 [MaxEB 深度解析](/roadmap/pectra/maxeb/)。
</ExpandableCard>

## 进一步阅读 {#further-reading}

- [质押启动板提款 (Staking Launchpad Withdrawals)](https://launchpad.ethereum.org/withdrawals)
- [质押启动板验证者操作 (Staking Launchpad Validator Actions)](https://launchpad.ethereum.org/validator-actions)
- [MaxEB 深度解析：复利与合并](/roadmap/pectra/maxeb/)
- [EIP-4895：信标链推送提款作为操作](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94：质押 ETH 提款（测试）与 Potuz 和 Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68：EIP-4895：信标链推送提款作为操作与 Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [了解验证者有效余额](https://www.attestant.io/posts/understanding-validator-effective-balance/)