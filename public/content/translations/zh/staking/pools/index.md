---
title: "联合质押"
description: "了解质押池"
lang: zh
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: "犀牛 Leslie 在池中游泳。"
sidebarDepth: 2
summaryPoints:
  - 与他人联合，使用任意数量的 ETH 进行质押并赚取奖励
  - 跳过困难的部分，将验证者操作委托给第三方
  - 在你自己的钱包中持有质押代币
---

## 什么是质押池？ {#what-are-staking-pools}

质押池是一种协作方式，允许许多拥有少量 ETH 的人凑齐激活一组验证者密钥所需的 32 个 ETH。协议本身原生不支持联合功能，因此人们单独构建了解决方案来满足这一需求。

一些质押池使用智能合约运行，资金可以存入合约，合约以无需信任的方式管理和跟踪你的质押，并向你发行代表该价值的代币。其他质押池可能不涉及智能合约，而是通过链下进行中介。

## 为什么要通过质押池进行质押？ {#why-stake-with-a-pool}

除了我们在[质押简介](/staking/)中概述的好处之外，通过质押池进行质押还有许多独特的好处。

<Grid>
  <Card title="准入门槛低" emoji="🐟" description="不是巨鲸？没问题。与需要 32 ETH 的单独质押不同，大多数质押池允许你与其他质押者联合，质押几乎任何数量的 ETH。" />
  <Card title="立即质押" emoji=":stopwatch:" description="在质押池中质押就像代币兑换一样简单。无需担心硬件设置和节点维护。质押池允许你存入 ETH，从而使节点运营商能够运行验证者。然后，奖励将在扣除节点运营费用后分配给贡献者。" />
  <Card title="质押代币" emoji=":droplet:" description="许多质押池提供一种代币，代表对你质押的 ETH 及其产生的奖励的索取权。这允许你利用你质押的 ETH，例如，在 DeFi 应用程序中作为抵押品。" />
</Grid>

<StakingComparison page="pools" />

## 注意事项 {#what-to-consider}

[以太坊](/)协议原生不支持联合质押或委托质押，但考虑到用户质押少于 32 个 ETH 的需求，越来越多的解决方案被构建出来以满足这一需求。

每个质押池及其使用的工具或智能合约都是由不同的团队构建的，并且各有其优缺点。质押池允许用户将他们的 ETH 兑换为代表已质押 ETH 的代币。这种代币很有用，因为它允许用户在去中心化交易所上将任意数量的 ETH 兑换为等量的生息代币，该代币从应用于底层已质押 ETH 的质押奖励中产生回报（反之亦然），尽管实际的 ETH 仍然质押在共识层上。这意味着在生息的质押 ETH 产品和“原始 ETH”之间来回兑换既快速又简单，而且不仅限于 32 个 ETH 的倍数。

然而，这些质押 ETH 代币往往会产生类似卡特尔的行为，导致大量质押的 ETH 最终被少数中心化组织控制，而不是分散在许多独立的个人手中。这为审查或价值提取创造了条件。质押的黄金标准应始终是个人在可能的情况下在自己的硬件上运行验证者。

[了解更多关于质押代币风险的信息](https://notes.ethereum.org/@djrtwo/risks-of-lsd)。

下面使用属性指标来表明列出的质押池可能具有的显著优势或劣势。在选择要加入的质押池时，请将本节作为我们如何定义这些属性的参考。

<StakingConsiderations page="pools" />

## 探索质押池 {#explore-staking-pools}

有多种选项可帮助你进行设置。使用上述指标来帮助你了解以下工具。

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

请注意，选择一个认真对待[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)的服务非常重要，因为它能提高网络的安全性并限制你的风险。有证据表明限制多数客户端使用的服务会标有<em style={{ textTransform: "uppercase" }}>“执行客户端多样性”</em>和<em style={{ textTransform: "uppercase" }}>“共识客户端多样性”</em>。

对我们遗漏的质押工具有什么建议吗？请查看我们的[产品上架政策](/contributing/adding-staking-products/)，看看它是否合适，并提交以供审核。

## 常见问题 {#faq}

<ExpandableCard title="我如何赚取奖励？">
通常，ERC-20 质押代币会发行给质押者，代表他们质押的 ETH 加上奖励的价值。请记住，不同的质押池将通过略有不同的方法向其用户分配质押奖励，但这是共同的主题。
</ExpandableCard>

<ExpandableCard title="我什么时候可以提取我的质押？">
现在就可以！上海/Capella 网络升级于 2023 年 4 月进行，并引入了质押提款。支持质押池的验证者账户现在能够退出并将 ETH 提取到其指定的提款地址。这使得你能够将你那部分质押赎回为底层的 ETH。请咨询你的提供商，了解他们如何支持此功能。

或者，使用 ERC-20 质押代币的质押池允许用户在公开市场上交易该代币，从而允许你出售你的质押头寸，实际上是在没有从质押合约中移除 ETH 的情况下进行“提款”。

<ButtonLink href="/staking/withdrawals/">了解更多关于质押提款的信息</ButtonLink>
</ButtonLink>

<ExpandableCard title="这与在交易所质押有什么不同吗？">
这些联合质押选项与中心化交易所之间有许多相似之处，例如能够质押少量 ETH 并将它们捆绑在一起以激活验证者。

与中心化交易所不同，许多其他联合质押选项利用智能合约和/或质押代币，这些代币通常是 ERC-20 代币，可以保存在你自己的钱包中，并且可以像任何其他代币一样买卖。这通过让你控制自己的代币提供了一层主权和安全性，但仍然没有让你直接控制在后台代表你进行证明的验证者客户端。

在支持它们的节点方面，一些联合选项比其他选项更加去中心化。为了促进网络的健康和去中心化，始终鼓励质押者选择支持无需许可的去中心化节点运营商集合的联合服务。
</ExpandableCard>

## 延伸阅读 {#further-reading}

- [以太坊质押目录](https://www.staking.directory/) - _Eridian 与 Spacesider_
- [使用 Rocket Pool 质押 - 质押概览](https://docs.rocketpool.net/guides/staking/overview.html) - _Rocket Pool 文档_
- [使用 Lido 质押以太坊](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido 帮助文档_