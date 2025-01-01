---
title: 联合质押
description: 简要介绍如何开始以太币联合质押
lang: zh
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: 莱斯利犀牛在泳池中游泳。
sidebarDepth: 2
summaryPoints:
  - 通过联合其他人质押任意数量的以太币获得奖励
  - 跳过硬件部分，将验证者操作委托给第三方
  - 在自己的钱包中保存质押代币
---

## 什么是质押池？ {#what-are-staking-pools}

激活一组验证者密钥需要 32 个以太币，而质押池这种协作方式使拥有少量以太币的人能够满足这一条件。 协议本身并不支持联合功能，因此需要单独创建解决方案来满足这一需求。

一些资金池使用智能合约运行，资金会存入一个合约中，该合约以去信任的方式管理和跟踪你的质押，并向你发放代表该价值的代币。 其他资金池不涉及智能合约，而是在链下促成。

## 为什么要联合质押？ {#why-stake-with-a-pool}

除了我们在[质押简介](/staking/)中概述的好处之外，联合质押还有许多独有益处。

<CardGrid>
  <Card title="准入门槛低" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="快速质押" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="质押代币" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## 需考虑事项 {#what-to-consider}

联合质押和委托质押并未得到以太坊的原生支持，但是为满足用户质押少于 32 个以太币的需求，越来越多的方案已经开始建立。

每种质押池和它们使用的工具或智能合约均由不同的团队创建，因此都各有优点和风险。 质押池能够让用户使用以太币兑换代表已质押以太币的代币。 代币的用处在于允许用户在去中心化交易所将任意数量的以太币兑换成同等数量的可产生收益的代币，从底层质押以太币的质押奖励获得回报（反之亦然），即便实际上以太币仍然在共识层上质押。 这意味着，可以快速便捷地在产生收益的质押以太币产品和“原始以太币”之间进行双向兑换，同时兑换数量不必是 32 个以太币的整数倍。

然而，这些被质押的以太币往往会导致类似垄断的行为 — 大量质押的以太币最终处于少数中心化组织的控制之下，而非散布于许多独立的个人手中。 这就为审查或价值提取创造了条件。 质押的黄金标准应该始终是尽可能在自己的硬件上运行验证者的个人。

[更多关于质押代币相关风险的信息](https://notes.ethereum.org/@djrtwo/risks-of-lsd)。

下面使用属性指标来表示所列质押池可能具有的显著优势或劣势。 选择要加入的池时，请使用本节作为参考，了解我们如何定义这些属性。

<StakingConsiderations page="pools" />

## 探索质押池 {#explore-staking-pools}

有多种方案可帮助你进行设置。 上述指标可引导你了解如何使用下方的工具。

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

请注意，选择重视[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)的服务很重要，因为这样可以提高网络安全性，还可以限制你的风险。 <em style={{ textTransform: "uppercase" }}>“执行客户端多样性”</em>和<em style={{ textTransform: "uppercase" }}>“共识客户端多样性”</em>表明服务可证明其在限制使用主流客户端。

想要推荐其他未提到的质押工具吗？ 可以查看我们的[产品上线政策](/contributing/adding-staking-products/)，确定你推荐的质押工具是否合适，合适的话，请提交以供审核。

## 常见问题 {#faq}

<ExpandableCard title="我如何赚取奖励？">
通常，ERC-20 质押代币会发行给质押人，代表其质押以太币的价值以及奖励。 请记住，不同资金池向用户发放质押奖励的方法也略有不同，但主题却是相同的。
</ExpandableCard>

<ExpandableCard title="什么时候可以取出我的质押">
现在！马上！ 上海/卡佩拉网络升级发生在 2023 年 4 月，并引入了质押提款。 支持质押池的验证者帐户现在能够退出并将以太币提取到他们指定的提款地址。 这样你便能够赎回自己那部分质押的底层以太币。 请咨询你的提供商，了解他们如何支持此功能。

或者，使用 ERC-20 质押代币的资金池允许用户在公开市场上交易该代币，从而使你能够出售你的质押头寸，有效地“提款”，而无需实际从质押合约中移除以太币。

<ButtonLink href="/staking/withdrawals/">更多关于质押提款的信息</ButtonLink>
</ExpandableCard>

<ExpandableCard title="这与交易所质押有何不同？">
这些联合质押方案和中心化交易所之间有许多相似之处，例如能够质押少量以太币并将它们捆绑在一起以激活验证者。

与中心化交易所不同，许多其他联合质押方案使用智能合约和/或质押代币，质押代币通常是 ERC-20 代币，可以保存在你自己的钱包中并像其他任何代币一样买卖。 这样你就可以控制自己的代币，从而获得了一定的自主权和安全性，但仍旧你还是无法直接控制在后台代表你进行验证的验证者客户端。

涉及到支持它们的节点时，一些联合质押方案比其他方案更加分散。 为了加强网络的健康和去中心化程度，我们始终鼓励质押人选择一种无需许可即可实现节点运营商去中心化的联合服务。
</ExpandableCard>

## 延伸阅读 {#further-reading}

- [以太坊质押目录](https://www.staking.directory/) - _Eridian 和 Spacesider_
- [火箭池质押 - 质押概述](https://docs.rocketpool.net/guides/staking/overview.html) - _火箭池文档_
- [用 Lido 质押以太坊](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido 帮助文档_
