---
title: 联合质押
description: 简要介绍如何开始以太币联合质押
lang: zh
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-pool.png
alt: 莱斯利犀牛在泳池中游泳。
sidebarDepth: 2
summaryPoints:
  - 通过联合其他人质押任意数量的以太币获得奖励
  - 跳过硬件部分，将验证者操作委托给第三方
  - 在你自己的钱包中保存流动性代币
---

## 什么是质押池？ {#what-are-staking-pools}

激活一组验证者密钥需要 32 个以太币，而质押池这种协作方式使拥有少量以太币的人能够满足这一条件。 协议本身并不支持联合功能，因此需要单独创建解决方案来满足这一需求。

一些资金池使用智能合约运行，资金会存入一个合约中，该合约以免信任的方式管理和跟踪你的质押，并向你发放代表该价值的代币。 其他资金池不涉及智能合约，而是在链下促成。

## 为什么要联合质押？ {#why-stake-with-a-pool}

除了我们在[质押简介](/staking/)中概述的好处之外，联合质押还有许多独有益处。

<CardGrid>
  <Card title="准入门槛低" emoji="🐟">
    没有“巨款”？ 没关系。 在单独行动中，你需要一口气质押 32 枚以太币。然而联合质押池允许你和其他质押者合作——这样你想质押多少以太币都可以。
  </Card>
  <Card title="快速质押" emoji=":stopwatch:">
    在池中质押就和代币交换一样简单。 你不需要担心硬件设置和节点维护。 质押池允许你存入以太币，使节点操作者能够运行验证者。 在减去节点操作的费用后，剩余的奖励将分配给所有贡献者。
  </Card>
  <Card title="流动性代币" emoji=":droplet:">
    多数质押池会给你提供代币，代表你在此质押的以太币及其产生的收益。 这使得你可以将质押中的以太币物尽其用，比如作为去中心化金融应用中的抵押品。
  </Card>
</CardGrid>

<StakingComparison page="pools" />

## 需考虑事项 {#what-to-consider}

联合质押和委托质押并未得到以太坊的原生支持，但是为满足用户质押少于 32 个以太币的需求，越来越多的方案已经开始建立。

每个质押池和它们使用的工具和智能合约均由不同的团队创建，因此都有各自的优缺点。

下面使用属性指标来表示所列质押池可能具有的显著优势或劣势。 选择要加入的池时，请使用本节作为参考，了解我们如何定义这些属性。

<StakingConsiderations page="pools" />

## 探索质押池 {#explore-staking-pools}

有多种方案可帮助你进行设置。 上述指标可引导你了解如何使用下方的工具。

<InfoBanner emoji="⚠️" isWarning>
请选择注重<a href="/developers/docs/nodes-and-clients/client-diversity/">客户端多元化</a>的服务，因为这些服务不仅可以提高网络安全性，还可以限制你的风险。 如果有证据表明服务限制了主流客户端的使用，则这些服务会被标记为<em style="text-transform: uppercase;">“多样性客户端”</em>。
</InfoBanner>

<StakingProductsCardGrid category="pools" />

想要推荐其他未提到的质押工具吗？ 可以查看我们的[产品清单政策](/contributing/adding-staking-products/)，思考你想要推荐的工具是否合适，合适的话，请提交以供审核。

## 常见问题 {#faq}

<ExpandableCard title="我如何赚取奖励？">
一般来说，会将 ERC-20 流动性代币发给质押人，代表他们所质押以太币的价值加上奖励。 请记住，不同资金池向用户发放质押奖励的方法也略有不同，但主题却是相同的。
</ExpandableCard>

<ExpandableCard title="什么时候可以取出我的质押">

目前，无法从以太坊验证者中提取资金，这限制了你实际兑换流动池代币以获得锁定在共识层中的 ETH 奖励的能力。

或者，使用 ERC-20 流动池代币的资金池允许用户在公开市场上交易该代币，允许你出售你的质押店铺位置，有效地“取款”，而无需实际从质押合约中移除 ETH。
</ExpandableCard>

<ExpandableCard title="这与交易所质押有何不同？">
这些联合质押方案和中心化交易所之间有许多相似之处，例如能够质押少量以太币并将它们捆绑在一起以激活验证者。

与中心化交易所不同，许多其他联合质押方案使用智能合约和/或流动性代币，通常是可以保存在你自己的钱包中并像其他任何代币一样买卖的 ERC-20 代币。 这样你就可以控制自己的代币，从而获得了一定的自主权和安全性，但仍旧你还是无法直接控制在后台代表你进行验证的验证者客户端。

涉及到支持它们的节点时，一些联合质押方案比其他方案更加分散。 为了促进网络健康和去中心化，我们始终鼓励质押人选择一种无需许可即可实现节点运营商去中心化的联合服务。
</ExpandableCard>

## 延伸阅读 {#further-reading}

- [火箭池质押 - 质押概述](https://docs.rocketpool.net/guides/staking/overview.html) - _火箭池文档_
- [用 Lido 质押以太坊](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido 帮助文档_
