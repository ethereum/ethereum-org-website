---
title: 质押即服务
description: 简要介绍如何开始以太币联合质押
lang: zh
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-saas.png
alt: 莱斯利犀牛在云中漂浮。
sidebarDepth: 2
summaryPoints:
  - 第三方节点运营商负责你的验证者客户端的操作
  - 对于那些拥有 32 个以太币但是不能解决运行节点的技术问题的人来说，这是个很好的选择
  - 降低信任并保持你对提款密钥的控制权
---

## 什么是质押即服务？ {#what-is-staking-as-a-service}

质押即服务 (“SaaS") 代表一类质押服务，采用这种服务的用户会存入 32 个以太币用于验证者，但是将节点运营委托给第三方运营商执行。 这个过程通常需要你按引导完成初始设置，包括密钥生成和存款，然后将你的签名密钥上传给运营商。 这项服务将代表你运行验证者，通常按月收费。

## 为什么需要质押服务？ {#why-stake-with-a-service}

以太坊协议本身并不支持质押委托，于是这类服务便为了满足这一需求而建。 如果你有 32 个以太币需要质押，但是没有合适的硬件设备，那么质押即服务可以使你在使用运营商硬件设施的同时获得区块奖励。

<CardGrid>
  <Card title="你自己的验证者" emoji=":desktop_computer:">
    存入 32 个以太币后，可以激活你的一组签名密钥，这些密钥将参与以太坊共识。 你可以使用仪表板监控您的以太币奖励累积情况。
  </Card>
  <Card title="简单起步" emoji="🏁">
    在整个过程中你不需要关注硬件规格、设置、节点维护和升级。
    质押即服务提供商让你可以使用他们的硬件设施，只要你上传自己的签名凭证，允许他们代表你运行验证者，而你仅需支付较低的费用。
  </Card>
  <Card title="限制你的风险" emoji=":shield:">
    在大多数情况下，用户无需放弃掌控能够提取或转移质押资金的密钥。 这些密钥不同于签名密钥，它们可以分开存储从而降低（但不是消除）你作为质押人的风险。
  </Card>
</CardGrid>

<StakingComparison page="saas" />

## 需考虑事项 {#what-to-consider}

为了满足你质押以太币的需求，出现了越来越多的质押即服务提供商，每位提供商都能带来不同的风险与优势。

下列属性指标可以用来衡量市场上质押即服务供应商的优势或劣势。 在选择帮你度过质押之旅的服务时，请使用本节作为参考，了解我们如何定义这些属性。

<StakingConsiderations page="saas" />

## 探索质押服务提供商 {#saas-providers}

以下是一些可用的质押即服务提供商。 你可以利用上述指标来辅助你选择。

<InfoBanner emoji="⚠️" isWarning>
请注意支持<a href="/developers/docs/nodes-and-clients/client-diversity/">客户端多样性</a>的重要性，因为它可以提高网络安全性，并限制你的风险。 如果有证据表明服务限制了主流客户端的使用，则这些服务会被标记为<em style="text-transform: uppercase;">“多样性客户端”</em>。
</InfoBanner>

#### 质押即服务提供商

<StakingProductsCardGrid category="saas" />

#### 密钥生成器

<StakingProductsCardGrid category="keyGen" />

想要推荐其他未提到的质押即服务提供商吗？ 可以查看我们的[产品清单政策](/contributing/adding-staking-products/)，思考你想要推荐的提供商是否合适，合适的话，请提交以供审核。

## 常见问题 {#faq}

<ExpandableCard title="谁拥有我的密钥？" eventCategory="SaasStaking" eventName="clicked who holds my keys">
  不同的提供商会有不同的安排，但通常情况下，他们都会指导你设置所需的签名密钥（每 32 个以太币需要一个签名密钥），并将这些密钥上传给你的服务提供商，让他们代表你进行验证。 这些签名密钥本身并没有提现、转帐或者花费你资金的权限。 他们只提供为达成共识而投票的权限，如果投票执行方式不恰当，可能会受到离线处罚或罚没。
</ExpandableCard>

<ExpandableCard title="为什么有两套密钥？" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
由此可见， 每个账户都由<em>签名</em>密钥和<em>提现</em>密钥组成。 为了让验证者证明链的状态、参与同步委员会并提出区块建议，签名密钥必须易于验证者客户端访问。 为此签名密钥必须以某种形式与互联网连接，所以它们本质上被认为是“热”密钥。 这是验证者能够参与证明的必要条件，因此，出于安全原因，用于转移或提取资金的密钥是单独分开的。

所有这些密钥都可以通过使用你的 24 字助记词恢复。 <em>请确保你安全地备份了助记词，否则当你提现时，可能无法生成提现密钥</em>。
</ExpandableCard>

<ExpandableCard title="我什么时候可以提现？" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
  将 32 个以太币质押给质押即服务提供商时，你的以太币依然存入官方的质押存款合约中。 因此，目前使用质押即服务的质押人受到和单独质押的用户同样的提现限制。 这意味着质押以太币目前是单向存款。 这种情况将一直持续到上海升级为止。
</ExpandableCard>

<ExpandableCard title="如果我遭到罚没，会发生什么？" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
使用质押即服务提供商，你需要将节点运营委托给别人。 这伴随着一些你不能控制的节点性能不佳的风险。 如果你的验证者受到罚没，你的验证者余额将因处罚而遭受损失，验证者也将从验证者池中强行移除。 这些资金将被锁定，直到协议层的提款功能得到实现。

请联系你的质押即服务提供商，了解关于担保或保险方案的更多细节。 如果你想完全控制你的验证者设置，<a href="/staking/solo/">请详细了解如何单独质押以太币</a>。
</ExpandableCard>

## 延伸阅读 {#further-reading}

- [评估质押服务](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
