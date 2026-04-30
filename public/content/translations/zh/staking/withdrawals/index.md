---
title: "质押提款"
description: "总结质押推送提款是什么、如何运作以及质押者需要做什么才能获得奖励的页面"
lang: zh
template: staking
image: /images/staking/leslie-withdrawal.png
alt: "带着质押奖励的犀牛 Leslie"
sidebarDepth: 2
summaryPoints:
  - 验证者操作员必须提供提款地址才能启用提款
  - 传统验证者每隔几天会自动提取超过 32 ETH 的多余余额
  - 复利验证者可就其高达 2048 ETH 的全部余额赚取奖励
  - 完全退出质押的验证者将收到其剩余余额
---

<strong>质押提款</strong>是指将 ETH 从以太坊共识层（信标链）上的验证者账户转账到执行层，以便在执行层进行交易。

> 如果你是[质押池](/staking/pools/)的成员或持有质押代币，你应该向你的提供商咨询有关如何处理质押提款的更多详细信息，因为每项服务的运作方式各不相同。

提款的运作方式取决于你的验证者的提款凭证类型：

- **传统验证者（类型 1）**：超过 32 ETH 的多余余额会自动定期发送到与该验证者关联的提款地址。超过 32 ETH 的奖励不会增加该验证者在网络上的权重。
- **复利验证者（类型 2）**：奖励会复利计入验证者的有效余额（最高 2048 ETH），从而增加验证者的权重并赚取更多奖励。只有超过 2048 ETH 的余额才会被自动清扫。

用户也可以**完全退出质押**，提交提款交易，等待提款队列（根据网络需求而定），并解锁其全部验证者余额。

## 质押奖励 {#staking-rewards}

奖励的处理方式取决于验证者的凭证类型：

<strong>传统验证者（类型 1）</strong>的有效余额上限为 32 ETH。作为网络奖励收到的任何超过 32 ETH 的余额都不会计入有效余额，也不会增加该验证者在网络上的权重，并且这些奖励每隔几天就会自动提取到验证者的专用提款地址。除了提供一次提款地址外，领取这些奖励不需要验证者操作员执行任何操作。这一切都在共识层上发起，因此在任何步骤都不需要 Gas（交易费）。

<strong>复利验证者（类型 2）</strong>的有效余额可以在 32 到 2048 ETH 之间。这些验证者收到的网络奖励会复利计入其有效余额，从而增加验证者的权重和获得未来奖励的潜力。自动清扫仅在余额超过 2048 ETH 时发生。要提取低于 2048 ETH 阈值的奖励，复利验证者必须从执行层手动触发部分提款，这需要消耗 Gas。

### 我们是如何走到这一步的？ {#how-did-we-get-here}

在过去几年中，[以太坊](/)经历了多次网络升级，过渡到一个由 ETH 本身保护的网络，而不是像以前那样依赖能源密集型的挖矿。现在，参与以太坊共识被称为“质押”，因为参与者自愿锁定 ETH，将其“置于风险之中”以获得参与网络的资格。遵守规则的用户将获得奖励，而试图作弊的行为将受到惩罚。

自 2020 年 11 月质押存款合约启动以来，一些勇敢的以太坊先驱自愿锁定资金以激活“验证者”，这些特殊账户有权按照网络规则正式证明和提议区块。

在上海/Capella 升级之前，你无法使用或访问你质押的 ETH。但现在，你可以选择自动将奖励接收到选定的账户中，也可以随时提取你质押的 ETH。

### 我该如何准备？ {#how-do-i-prepare}

<WithdrawalsTabComparison />

### 重要提示 {#important-notices}

验证者账户必须提供提款地址，然后才能访问和提取累积的网络奖励，或在退出质押时处理全额提款。

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
<strong>每个验证者账户只能分配一个提款地址，且只能分配一次。</strong>一旦选择了一个地址并提交给共识层，就无法撤销或再次更改。在提交之前，请仔细检查所提供地址的所有权和准确性。
</AlertDescription>
</AlertContent>
</Alert>

如果你尚未为你的验证者账户提供提款地址，只要你的助记词一直安全地离线保存且未以任何方式泄露，**在此期间你的资金就不会受到威胁**。未添加提款凭证只会让 ETH 锁定在验证者账户中，直到提供提款地址为止。

## 复利验证者 {#compounding-validators}

验证者可以通过将其提款凭证从类型 1 转换为类型 2 来选择**复利**。这会将最大有效余额从 32 ETH 提高到 **2048 ETH**，允许奖励复利计入验证者的有效余额，而不是被自动清扫。

启用复利后：

- 奖励以 1 ETH 的增量增加验证者的有效余额（受限于一个小的[滞后缓冲](https://www.attestant.io/posts/understanding-validator-effective-balance/)），随着时间的推移赚取更多奖励
- 自动清扫仅在余额超过 2048 ETH 时发生
- 低于 2048 ETH 阈值的部分提款必须从执行层手动触发（这需要消耗 Gas）
- 多个验证者可以**合并**为一个复利验证者，从而减少运营开销

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
<strong>从类型 1 转换为类型 2 提款凭证是不可逆的。</strong>请使用[质押启动板](https://launchpad.ethereum.org/validator-actions)作为此转换的官方工具。有关转换过程、风险和合并的更多详细信息，请参阅 [MaxEB 深入探讨](/roadmap/pectra/maxeb/)。
</AlertDescription>
</AlertContent>
</Alert>

## 完全退出质押 {#exiting-staking-entirely}

在将*任何*资金从验证者账户余额中转出之前，必须提供提款地址。

希望完全退出质押并提取全部余额的用户必须发起“自愿退出”。这可以通过两种方式完成：

- **使用验证者密钥**：使用你的验证者客户端签名并广播自愿退出消息，提交给你的共识节点。这不需要 Gas。
- **使用提款凭证**：使用你的提款地址从执行层触发退出，而无需访问验证者签名密钥。这需要一笔交易并消耗 Gas。

验证者退出质押的过程需要的时间长短不一，具体取决于同时退出的其他验证者数量。一旦完成，该账户将不再负责履行验证者网络职责，不再有资格获得奖励，也不再将其 ETH“置于风险之中”。此时，该账户将被标记为完全“可提款”。

一旦账户被标记为“可提款”，并且已提供提款凭证，用户除了等待之外不需要做任何其他事情。区块提议者会自动且持续地清扫账户以寻找符合条件的已退出资金，你的账户余额将在下一次<a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>清扫</a>期间全额转账（也称为“全额提款”）。

## 自动奖励如何运作（类型 1 验证者）？ {#how-do-withdrawals-work}

给定验证者是否有资格提款取决于验证者账户本身的状态。在任何时候都不需要用户输入来决定是否应为某个账户发起提款——整个过程由共识层在连续循环中自动完成。

### 更喜欢视觉学习？ {#visual-learner}

请观看 Finematics 对以太坊质押提款的解释：

<VideoWatch slug="ethereum-staking-withdrawals" />

### 验证者“清扫” {#validator-sweeping}

当验证者被安排提议下一个区块时，它需要构建一个最多包含 16 个符合条件的提款的提款队列。这是通过从验证者索引 0 开始，根据协议规则确定该账户是否有符合条件的提款，如果有则将其添加到队列中来完成的。被安排提议下一个区块的验证者将从上一个验证者停止的地方继续，无限期地按顺序进行。

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
想象一个模拟时钟。时钟上的指针指向小时，沿一个方向前进，不会跳过任何小时，最终在到达最后一个数字后再次回到起点。

现在，假设时钟上的数字不是 1 到 12，而是 0 到 N*（N 是在共识层上注册过的验证者账户总数，截至 2026 年 4 月已超过 120 万）*。

时钟上的指针指向下一个需要检查是否有符合条件提款的验证者。它从 0 开始，一直前进，不会跳过任何账户。当到达最后一个验证者时，循环将回到起点继续。
</AlertDescription>
</AlertContent>
</Alert>

#### 检查账户提款 {#checking-an-account-for-withdrawals}

当提议者在验证者中清扫可能的提款时，每个被检查的验证者都会根据一系列简短的问题进行评估，以确定是否应触发提款，如果应该，则确定应提取多少 ETH。

1. <strong>是否已提供提款地址？</strong>如果没有提供提款地址，则跳过该账户，不发起提款。
2. <strong>验证者是否已退出且可提款？</strong>如果验证者已完全退出，并且我们已经到达其账户被视为“可提款”的时段，那么将处理全额提款。这会将全部剩余余额转账到提款地址。
3. <strong>余额是否超过其最大有效余额？</strong>对于传统（类型 1）验证者，此阈值为 32 ETH。对于复利（类型 2）验证者，此阈值为 2048 ETH。如果账户有提款凭证，未完全退出，有效余额达到最大值，并且余额高于此阈值，那么将处理部分提款，仅将多余部分转账到用户的提款地址。

在验证者的生命周期中，验证者操作员只有两项操作会直接影响此流程：

- 提供提款凭证以启用任何形式的提款
- 从网络中退出，这将触发全额提款

### 免 Gas {#gas-free}

自动提款清扫不需要质押者手动提交交易。这意味着自动清扫**不需要 Gas（交易费）**，并且它们不会竞争现有的执行层区块空间。

请注意，希望触发低于 2048 ETH 阈值的部分提款的[复利验证者](#compounding-validators)必须从执行层手动执行此操作，这确实需要消耗 Gas。

### 我的质押奖励多久解锁一次并在我的钱包中可用？ {#how-soon}

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
title="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
不可以，提供提款凭证的过程是一次性的，一旦提交就无法更改。
</ExpandableCard>

<ExpandableCard
title="Why can a validator's withdrawal address only be set once?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
设置验证者的执行层提款地址是对共识层上验证者凭证的永久更改。一旦注册，就无法更新共识层凭证。

验证者的提款地址凭证可以设置为指向智能合约（由其代码控制）或外部拥有账户（EOA，由其私钥控制）。目前，这些账户无法将消息传回共识层以发出更改验证者凭证的信号，而添加此功能会给协议增加不必要的复杂性。

寻求灵活提款管理的用户可以将支持密钥轮换的智能合约钱包（例如 [Safe](https://safe.global/)）设置为验证者的提款地址，从而有效地允许更新最终的接收者 EOA。如果用户已经将 EOA 设置为提款凭证，他们必须发起完全退出以收回其质押的 ETH，然后使用这些资金激活具有不同凭证的新验证者。
</ExpandableCard>

<ExpandableCard
title="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
如果你使用质押池或持有质押代币，请联系你的提供商以了解他们如何处理提款，因为各家服务的流程有所不同。 

通常，当通过提供商或质押池进行质押时，你应该可以自由地收回你底层质押的 ETH，或者提取并更改你使用的质押提供商。如果某个特定的质押池变得太大，可以退出、赎回质押的 ETH，并使用[较小的提供商](https://rated.network/)再次质押。或者，如果你积累了足够的 ETH，你可以[在家质押](/staking/solo/)。

</ExpandableCard>

<ExpandableCard
title="Does claiming network rewards (partial withdrawals) happen automatically?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
对于**传统（类型 1）验证者**，是的——只要你的验证者提供了提款地址。必须提供一次以启用任何提款，然后每隔几天随着每次验证者清扫，就会自动触发向提款地址的网络奖励分配。

对于**复利（类型 2）验证者**，奖励会复利计入验证者的有效余额（最高 2048 ETH），而不是被清扫到提款地址。自动清扫仅在余额超过 2048 ETH 时发生。要提取低于此阈值的奖励，你必须从执行层手动触发部分提款。
</ExpandableCard>

<ExpandableCard title="Can I withdraw a custom amount?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
对于**传统（类型 1）验证者**，任何超过验证者 32 ETH 有效余额的累积 ETH 网络奖励都会自动推送到提款地址。已提交全额提款交易并完成质押退出流程的类型 1 验证者，其全部 ETH 余额将被提取到其提款地址。类型 1 验证者无法手动请求提取特定金额的 ETH。

<strong>复利（类型 2）验证者</strong>可以从执行层触发特定金额的部分提款，只要验证者的剩余余额保持在 32 ETH 或以上即可。这需要提交部分提款交易并消耗 Gas。
</ExpandableCard>

<ExpandableCard
title="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

建议验证者操作员访问[质押启动板提款](https://launchpad.ethereum.org/withdrawals/)页面，你将在那里找到有关如何为验证者准备提款、事件时间安排以及提款运作方式的更多详细信息。

要首先在测试网上试用你的设置，请访问 [Hoodi 测试网质押启动板](https://hoodi.launchpad.ethereum.org)开始。

</ExpandableCard>

<ExpandableCard
title="Can I re-activate my validator after exiting by depositing more ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
不可以。一旦验证者退出并且其全部余额已被提取，存入该验证者的任何额外 ETH 都将在下一次验证者清扫期间自动转账到提款地址。要使用该 ETH 再次开始质押，你必须激活一个新的验证者。
</ExpandableCard>

<ExpandableCard
title="What is the difference between legacy and compounding validators?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
传统验证者使用**类型 1** 提款凭证（提款凭证地址以 0x01 开头），其有效余额上限为 32 ETH。作为网络奖励收到的任何多余 ETH 每隔几天就会自动清扫到提款地址。

复利验证者使用**类型 2** 提款凭证（提款凭证地址以 0x02 开头），其有效余额最高可达 2048 ETH。奖励会复利计入验证者的有效余额，从而增加验证者在网络上的权重和获得未来奖励的潜力。自动清扫仅在余额超过 2048 ETH 时发生。要提取低于此阈值的 ETH，必须从执行层触发手动部分提款。

有关更多详细信息，请参阅 [MaxEB 深入探讨](/roadmap/pectra/maxeb/)。
</ExpandableCard>

<ExpandableCard
title="How do I convert to a compounding validator?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
你可以使用[质押启动板](https://launchpad.ethereum.org/validator-actions)将类型 1 提款凭证转换为类型 2。此操作是**不可逆的**——一旦转换，就无法恢复为类型 1 凭证。

转换后，你还可以将多个验证者**合并**为一个，将其余额合并为单个复利验证者。有关转换过程、风险和合并工具的完整演练，请参阅 [MaxEB 深入探讨](/roadmap/pectra/maxeb/)。
</ExpandableCard>

<ExpandableCard
title="When were staking withdrawals enabled?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
提款功能最初作为上海/Capella 升级的一部分于 <strong>2023 年 4 月 12 日</strong>启用。随后的 [佩克特拉升级](/roadmap/pectra/)（2025 年 5 月）引入了具有更高最大有效余额（2048 ETH）的复利验证者，以及执行层触发的退出和部分提款。

上海/Capella 升级使得以前质押的 ETH 能够被收回到常规以太坊账户中。这闭环了质押流动性，并使以太坊在构建可持续、可扩展、安全的去中心化生态系统的旅程中又迈进了一步。

- [更多关于以太坊历史的信息](/ethereum-forks/)
- [更多关于以太坊路线图的信息](/roadmap/)
</ExpandableCard>

## 进一步阅读 {#further-reading}

- [质押启动板提款](https://launchpad.ethereum.org/withdrawals)
- [质押启动板验证者操作](https://launchpad.ethereum.org/validator-actions)
- [MaxEB 深入探讨：复利与合并](/roadmap/pectra/maxeb/)
- [EIP-4895：信标链推送提款作为操作](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94：质押 ETH 提款（测试）与 Potuz 和 Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68：EIP-4895：信标链推送提款作为操作与 Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [了解验证者有效余额](https://www.attestant.io/posts/understanding-validator-effective-balance/)