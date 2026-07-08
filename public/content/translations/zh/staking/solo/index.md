---
title: "在家质押你的 ETH"
description: "关于如何开始在家质押 ETH 的概述"
lang: zh
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: "犀牛 Leslie 站在她自己的计算机芯片上。"
sidebarDepth: 2
summaryPoints:
  - 保持验证者正常运行并保持在线，直接从协议中获得最大奖励
  - 运行家用硬件，亲自为以太坊网络的安全性和去中心化做出贡献
  - 消除信任假设，绝不放弃对资金密钥的控制权
---

## 什么是家庭质押？ {#what-is-solo-staking}

在家质押是指[运行一个连接到互联网的以太坊节点](/run-a-node/)并存入 32 ETH 以激活[验证者](#faq)的行为，这使你能够直接参与网络共识。

**在家质押提高了以太坊网络的去中心化程度**，使[以太坊](/)更具抗审查性，并能更有效地抵御攻击。其他质押方法可能无法以同样的方式帮助网络。在家质押是保护以太坊安全的最佳质押选择。

以太坊节点由执行层 (EL) 客户端和共识层 (CL) 客户端组成。这些客户端是协同工作的软件，它们与一组有效的签名密钥一起，用于验证交易和区块、证明正确的链头、聚合证明并提议区块。

在家质押者负责操作运行这些客户端所需的硬件。强烈建议使用一台你在家操作的专用机器来进行此操作——这对网络的健康极其有益。

在家质押者通过保持其验证者正常运行和在线，直接从协议中获得奖励。

## 为什么要在家质押？ {#why-stake-solo}

在家质押伴随着更多的责任，但为你提供了对资金和质押设置的最大控制权。

<Grid>
  <Card title="赚取新的 ETH" emoji="💸" description="当您的验证者在线时，直接从协议中赚取以 ETH 计价的奖励，无需任何中间人抽成。" />
  <Card title="完全控制" emoji="🎛️" description="掌管您自己的密钥。选择最能降低风险并为网络健康与安全做出最大贡献的客户端和硬件组合。第三方质押服务会替您做决定，但他们做出的选择未必最安全。" />
  <Card title="网络安全" emoji="🔐" description="居家质押是最具影响力的质押方式。通过在自己的家用硬件上运行验证者，您可以增强以太坊协议的稳健性、去中心化和安全性。" />
</Grid>

## 在家质押前的注意事项 {#considerations-before-staking-solo}

尽管我们希望每个人都能无风险地进行在家质押，但这并不现实。在选择在家质押你的 ETH 之前，需要牢记一些实际且严肃的注意事项。

<ExpandableCard title="必读内容" eventCategory="SoloStaking" eventName="clicked required reading">
在运行自己的节点时，你应该花一些时间学习如何使用你选择的软件。这包括阅读相关文档并关注这些开发团队的沟通渠道。

你对正在运行的软件以及权益证明 (PoS) 的工作原理了解得越多，作为质押者的风险就越小，作为节点操作员解决在此过程中可能出现的任何问题也就越容易。
</ExpandableCard>

<ExpandableCard title="熟练使用计算机" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
节点设置要求对计算机操作有一定的熟练度，尽管随着时间的推移，新工具正在使这变得更容易。了解命令行界面会有所帮助，但不再是严格要求的。

它还需要非常基础的硬件设置，以及对最低推荐规格的一些了解。
</ExpandableCard>

<ExpandableCard title="安全的密钥管理" eventCategory="SoloStaking" eventName="clicked secure key management">
就像私钥保护你的以太坊地址一样，你需要专门为你的验证者生成密钥。你必须了解如何确保任何助记词或私钥的安全。{' '}

[以太坊安全与防骗](/security/)
</ExpandableCard>

<ExpandableCard title="维护" eventCategory="SoloStaking" eventName="clicked maintenance">
硬件偶尔会发生故障，网络连接会出错，客户端软件偶尔也需要升级。节点维护是不可避免的，偶尔需要你的关注。你需要确保自己随时了解任何预期的网络升级或其他关键的客户端升级。
</ExpandableCard>

<ExpandableCard title="稳定的在线时间" eventCategory="SoloStaking" eventName="clicked reliable uptime">
你的奖励与验证者在线并正确进行证明的时间成正比。停机时间会招致惩罚，惩罚力度与同时离线的其他验证者数量成正比，但<a href="#faq">不会导致罚没</a>。带宽也很重要，因为未及时收到的证明会减少奖励。要求会有所不同，但建议上下行带宽至少为 10 Mb/s。
</ExpandableCard>

<ExpandableCard title="罚没风险" eventCategory="SoloStaking" eventName="clicked slashing risk">
与离线导致的怠工惩罚不同，<em>罚没</em>是一种严重得多的惩罚，专门针对恶意违规行为。通过运行少数派客户端并确保你的密钥一次只加载在一台机器上，你被罚没的风险将降至最低。话虽如此，所有质押者都必须意识到罚没的风险。

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">更多关于罚没和验证者生命周期的信息</a>
</ExpandableCard>

<StakingComparison page="solo" />

## 工作原理 {#how-it-works}

<StakingHowSoloWorks />

在活跃期间，你将赚取 ETH 奖励，这些奖励将定期存入你的提款地址。

如果需要，你可以作为验证者退出，这消除了在线的要求，并停止任何进一步的奖励。然后，你的剩余余额将被提取到你在设置期间指定的提款地址。

[更多关于质押提款的信息](/staking/withdrawals/)

## 在质押启动板 (Staking Launchpad) 上开始 {#get-started-on-the-staking-launchpad}

质押启动板 (Staking Launchpad) 是一个开源应用程序，将帮助你成为一名质押者。它将引导你选择客户端、生成密钥并将你的 ETH 存入质押存款合约。它提供了一份清单，以确保你已涵盖所有内容，从而安全地设置你的验证者。

<StakingLaunchpadWidget />

## 节点和客户端设置工具的注意事项 {#node-tool-considerations}

有越来越多的工具和服务可以帮助你在家质押 ETH，但每种工具和服务都伴随着不同的风险和收益。

下面使用属性指标来表明列出的质押工具可能具有的显著优势或劣势。在选择哪些工具来帮助你的质押之旅时，请将本节作为我们如何定义这些属性的参考。

<StakingConsiderations page="solo" />

## 探索节点和客户端设置工具 {#node-and-client-tools}

有多种选项可帮助你进行设置。使用上述指标来帮助你了解以下工具。

<ProductDisclaimer />

### 节点工具 {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

请注意选择[少数派客户端](/developers/docs/nodes-and-clients/client-diversity/)的重要性，因为它提高了网络的安全性，并限制了你的风险。允许你设置少数派客户端的工具被标记为<em style={{ textTransform: "uppercase" }}>“多客户端” (multi-client)</em>。

### 密钥生成器 {#key-generators}

这些工具可以作为[质押存款命令行界面 (Staking Deposit CLI)](https://github.com/ethereum/staking-deposit-cli/)的替代方案，以帮助生成密钥。

<StakingProductsCardGrid category="keyGen" />

对我们遗漏的质押工具有什么建议吗？请查看我们的[产品列表政策](/contributing/adding-staking-products/)，看看它是否合适，并提交以供审核。

## 探索在家质押指南 {#staking-guides}

<StakingGuides />

## 常见问题 {#faq}

以下是一些关于质押的最常见问题，值得了解。

<ExpandableCard title="什么是验证者？">

<em>验证者</em>是存在于以太坊上并参与以太坊协议共识的虚拟实体。验证者由余额、公钥和其他属性表示。<em>验证者客户端</em>是代表验证者行事的软件，它持有并使用其私钥。单个验证者客户端可以持有许多密钥对，从而控制许多验证者。

</ExpandableCard>

<ExpandableCard title="我可以存入超过 32 ETH 吗？">
是的，现代验证者账户最多可持有 2048 ETH。超过 32 的额外 ETH 将以阶梯方式复利，随着你的真实余额增加而以整数增量增加。这被称为你的<a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">有效余额</a>。

为了增加账户的有效余额，从而增加奖励，必须跨越任何完整 ETH 阈值之上 0.25 ETH 的缓冲。例如，一个真实余额为 32.9 且有效余额为 32 的账户，需要再赚取 0.35 ETH，使其真实余额超过 33.25，才能触发有效余额的增加。

此缓冲还可以防止有效余额下降，直到它比当前有效余额低 0.25 ETH。

与验证者关联的每个密钥对至少需要 32 ETH 才能被激活。任何高于此金额的余额都可以随时通过由该地址签名的交易提取到关联的提款地址。任何超过最大有效余额的资金将定期自动提取。

如果在家质押对你来说要求太高，请考虑使用[质押即服务 (staking-as-a-service)](/staking/saas/) 提供商，或者如果你持有的 ETH 少于 32 个，请查看[质押池](/staking/pools/)。
</ExpandableCard>

<ExpandableCard title="如果我离线会被罚没吗？（简而言之：不会。）">
当网络正常最终确定时离线不会导致罚没。如果你的验证者在给定时段（每个时段长 6.4 分钟）内无法进行证明，则会产生少量的<em>怠工惩罚</em>，但这与<em>罚没</em>截然不同。这些惩罚略低于验证者在可进行证明时本应获得的奖励，并且可以通过大约相等的重新在线时间赚回损失。

请注意，怠工惩罚与同时离线的验证者数量成正比。在网络的大部分同时离线的情况下，这些验证者中每一个受到的惩罚将大于单个验证者不可用时的惩罚。

在极端情况下，如果由于超过三分之一的验证者离线而导致网络停止最终确定，这些用户将遭受所谓的<em>二次方怠工泄漏</em>，即离线验证者账户中的 ETH 呈指数级流失。这使得网络最终能够通过销毁不活跃验证者的 ETH 来完成自我修复，直到其余额达到 16 ETH，此时它们将被自动逐出验证者池。剩余的在线验证者最终将再次占网络的 2/3 以上，满足再次最终确定链所需的绝对多数。
</ExpandableCard>

<ExpandableCard title="我如何确保自己不被罚没？">
简而言之，这永远无法得到完全保证，但如果你出于善意行事，运行少数派客户端，并且一次只在一台机器上保留你的签名密钥，那么被罚没的风险几乎为零。

只有几种特定的方式会导致验证者被罚没并被逐出网络。在撰写本文时，已发生的罚没完全是冗余硬件设置的产物，即签名密钥同时存储在两台独立的机器上。这可能会无意中导致你的密钥进行<em>双重投票</em>，这是一种可被罚没的违规行为。

运行绝对多数客户端（网络中超过 2/3 使用的任何客户端）也存在潜在的罚没风险，前提是该客户端存在导致链分叉的错误。这可能导致错误的区块分叉被最终确定。要纠正回预期的链，需要通过尝试撤销已最终确定的区块来提交<em>环绕投票</em>。这也是一种可被罚没的违规行为，只需运行少数派客户端即可避免。

<em>少数派客户端中的等效错误永远不会最终确定</em>，因此永远不会导致环绕投票，而只会导致怠工惩罚，<em>而不是罚没</em>。

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">了解更多关于运行少数派客户端重要性的信息。</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">了解更多关于预防罚没的信息</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="哪个客户端最好？">
各个客户端在性能和用户界面方面可能略有不同，因为它们是由不同的团队使用各种编程语言开发的。话虽如此，它们中没有一个是“最好的”。所有生产客户端都是优秀的软件，它们都执行相同的核心功能来同步并与区块链交互。

由于所有生产客户端都提供相同的基本功能，因此选择<strong>少数派客户端</strong>实际上非常重要，这意味着当前未被网络上大多数验证者使用的任何客户端。这听起来可能违反直觉，但运行多数派或绝对多数客户端会使你在该客户端出现错误时面临更高的罚没风险。运行少数派客户端极大地限制了这些风险。

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">了解更多关于为什么客户端多样性至关重要的信息</a>
</ExpandableCard>

<ExpandableCard title="我可以直接使用 VPS（虚拟专用服务器）吗？">
尽管虚拟专用服务器 (VPS) 可以用作家庭硬件的替代品，但验证者客户端的物理访问和位置<em>确实很重要</em>。Amazon Web Services 或 Digital Ocean 等中心化云解决方案提供了不必获取和操作硬件的便利，但代价是使网络中心化。

在单个中心化云存储解决方案上运行的验证者客户端越多，对这些用户来说就越危险。任何导致这些提供商离线的事件，无论是由于攻击、监管要求，还是仅仅是断电/断网，都将导致依赖此服务器的每个验证者客户端同时离线。

离线惩罚与同时离线的其他验证者数量成正比。使用 VPS 会大大增加离线惩罚更严重的风险，并在中断范围足够大时增加你遭受二次方泄漏或罚没的风险。为了将你自己的风险以及对网络的风险降至最低，强烈鼓励用户获取并操作自己的硬件。
</ExpandableCard>

<ExpandableCard title="我如何解锁我的奖励或取回我的 ETH？">

从信标链进行任何形式的提款都需要设置提款凭证。

新的质押者在生成密钥和存款时设置此凭证。尚未设置此凭证的现有质押者可以升级其密钥以支持此功能。

一旦设置了提款凭证，奖励支付（超过初始 32 个的累积 ETH）将定期自动分配到提款地址。

要解锁并收回你的全部余额，你还必须完成退出验证者的过程。

<ButtonLink href="/staking/withdrawals/">更多关于质押提款的信息</ButtonLink>
</ExpandableCard>

## 延伸阅读 {#further-reading}

- [以太坊质押目录 (The Ethereum Staking Directory)](https://www.staking.directory/) - _Eridian 和 Spacesider_
- [以太坊的客户端多样性问题 (Ethereum's Client Diversity Problem)](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [帮助实现客户端多样性 (Helping Client Diversity)](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [以太坊共识层上的客户端多样性 (Client diversity on Ethereum's consensus layer)](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [操作指南：选购以太坊验证者硬件 (How To: Shop For Ethereum Validator Hardware)](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Eth2 预防罚没提示 (Eth2 Slashing Prevention Tips)](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />