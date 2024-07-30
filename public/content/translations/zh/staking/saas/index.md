---
title: 质押即服务
description: 简要介绍如何开始以太币联合质押
lang: zh
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
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
  <Card title="你自己的验证者" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="简单起步" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="限制你的风险" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## 需考虑事项 {#what-to-consider}

为了满足人们质押以太币的需求，质押即服务提供商的数量不断增长，但每位提供商的优势与风险不尽相同。 相比于自行质押，所有质押即服务方案都需要进一步的信任假设。 质押即服务方案可能使用更多代码包装以太坊客户端，而且这些代码未公开且不可审计。 质押即服务还会对网络去中心化造成有害影响。 取决于设置情况，你可能无法控制自己的验证者 - 运营者在使用你的以太币时可能会缺失诚信。

下列属性指标可以用来衡量市场上质押即服务供应商的优势或劣势。 在选择帮你度过质押之旅的服务时，请使用本节作为参考，了解我们如何定义这些属性。

<StakingConsiderations page="saas" />

## 探索质押服务提供商 {#saas-providers}

以下是一些可用的质押即服务提供商。 你可以利用上述指标来辅助你选择。

<ProductDisclaimer />

### 质押即服务提供商

<StakingProductsCardGrid category="saas" />

请注意支持[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)的重要性，因为它可以提高网络安全性，并限制你的风险。 <em style={{ textTransform: "uppercase" }}>“执行客户端多样性”</em>和<em style={{ textTransform: "uppercase" }}>“共识客户端多样性”</em>表明服务可证明其在限制使用主流客户端。

### 密钥生成器

<StakingProductsCardGrid category="keyGen" />

想要推荐其他未提到的质押即服务提供商吗？ 可以查看我们的[产品上线政策](/contributing/adding-staking-products/)，确定你推荐的质押工具是否合适，合适的话，请提交以供审核。

## 常见问题 {#faq}

<ExpandableCard title="谁拥有我的密钥？" eventCategory="SaasStaking" eventName="clicked who holds my keys">
不同的提供商会有不同的安排，但通常情况下，他们都会指导你设置所需的签名密钥（每 32 个以太币需要一个签名密钥），并将这些密钥上传给你的服务提供商，让他们代表你进行验证。 这些签名密钥本身并没有提现、转帐或者花费你资金的权限。 他们只提供为达成共识而投票的权限，如果投票执行方式不恰当，可能会受到离线处罚或罚没。
</ExpandableCard>

<ExpandableCard title="为什么有两套密钥？" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
由此可见， 每个帐户都由 BLS <em>签名</em>密钥和 BLS <em>提款</em>密钥组成。 为了让验证者证明链的状态、参与同步委员会并提出区块建议，签名密钥必须易于验证者客户端访问。 为此签名密钥必须以某种形式与互联网连接，所以它们本质上被认为是“热”密钥。 这是验证者能够参与证明的必要条件，因此，出于安全原因，用于转移或提取资金的密钥是单独分开的。

BLS 提款密钥用于签署一次性信息，声明质押奖励和退出的资金应该转入哪个执行层帐户。 在该信息广播后，不再需要 <em>BLS 提款</em>密钥。 然而，已提取资金的控制权将永久委托给你提供的地址。 因此，你可以设置一个用自己的冷存储保护的提款地址，即使有人控制了你的验证者签名密钥，也可以最大程度降低验证者资金的风险。

更新提款凭证是进行提款的必需步骤\*。 此过程包括使用自己的助记词生成提款密钥。

<strong>确保安全备份该助记词，否则在需要时将无法生成提款密钥。</strong>

\*提供了提款地址和初始存款的质押人不需要设置此项。 如需有关准备验证者方面的支持，请联系你的质押即服务提供商。
</ExpandableCard>

<ExpandableCard title="我什么时候可以提现？" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
2023 年 4 月，上海/卡佩拉升级实现了质押提款功能。 质押人需要提供一个提款地址（如果在初始存款时没有提供），并将开始每隔几天定期自动分发奖励支付。

验证者还能够以验证者身份完全退出，这种情况下，他们剩余的以太币余额将解锁以供提取。 提供执行提款地址并完成退出流程的帐户将在下次验证者扫描时在提供的提款地址收到其全部余额。

<ButtonLink href="/staking/withdrawals/">更多关于质押提款的信息</ButtonLink>
</ExpandableCard>

<ExpandableCard title="如果我遭到罚没，会发生什么？" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
使用质押即服务提供商，你需要将节点运营委托给别人。 这伴随着一些你不能控制的节点性能不佳的风险。 如果你的验证者受到罚没，你的验证者余额将因处罚而遭受损失，验证者也将从验证者池中强行移除。

在罚没/退出流程结束后，这些资金将转移到分配给验证者的提款地址。 需要提供一个提款地址才能实现资金转移。 提款地址可能已在初次存款时提供。 如果没有提供，就需要使用验证者提款密钥签署一条声明提款地址的信息。 如果没有提供提款地址，资金将保持锁定状态，直到提供提款地址为止。

有关任何担保或保险方案的详细信息，以及如何提供提款地址的说明，请联系各质押即服务提供商。 如果你想完全控制你的验证者设置，<a href="/staking/solo/">请详细了解如何单独质押以太币</a>。
</ExpandableCard>

## 延伸阅读 {#further-reading}

- [以太坊质押目录](https://www.staking.directory/) - _Eridian 和 Spacesider_
- [评估质押服务](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
