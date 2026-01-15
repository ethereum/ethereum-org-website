---
title: "单独质押你的以太币"
description: "简要介绍如何开始单独质押你的以太币"
lang: zh
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: "莱斯利犀牛在自己的电脑芯片上。"
sidebarDepth: 2
summaryPoints:
  - 直接从协议中获得最大奖励，以保持你的验证者正常运行和在线
  - 运行家用硬件并自行加入以太坊网络的安全和去中心化
  - 消除信任依赖，始终自己掌控资金密钥
---

## 什么是家庭质押？ {#what-is-solo-staking}

家庭质押是指[运行一个连接到互联网的以太坊节点](/run-a-node/)，并存入 32 ETH 以激活一个[验证者](#faq)的行为，从而使你能够直接参与网络共识。

**家庭质押增加了以太坊网络的去中心化程度**，使以太坊更具抗审查性，并能更稳健地抵御攻击。 其他质押方法可能无法以同样的方式帮助网络。 家庭质押是保护以太坊安全的最佳质押方案。

以太坊节点由一个执行层 (EL) 客户端和一个共识层 (CL) 客户端组成。 这些客户端是协同工作的软件，它们与一组有效的签名密钥一起，用于验证交易和区块、证明正确的链头、聚合证明以及提议区块。

家庭质押者负责运行运行这些客户端所需的硬件。 强烈建议在家中使用专用机器进行操作，这对网络的健康非常有益。

单独质押者由于保持他们的验证者在线并正常运行，可以直接从协议中获得奖励。

## 为什么要进行家庭质押？ {#why-stake-solo}

单独质押让你承担更大的责任，但会让你对资金和质押设置拥有最大的控制权。

<CardGrid>
  <Card title="赚取 ETH" emoji="💸" description="验证者在线时，可直接从协议赚取以 ETH 计价的奖励，没有任何中间商抽成。" />
  <Card title="全面掌控" emoji="🎛️" description="保管好你自己的密钥。选择客户端和硬件的组合，最大限度地降低你的风险，并为网络健康和安全做出最佳贡献。第三方质押服务会为你做这些决定，但他们并不总是会做出最安全的选择。" />
  <Card title="网络安全" emoji="🔐" description="家庭质押是影响最大的质押方式。通过在家用自己的硬件运行验证者，你可以增强以太坊协议的稳健性、去中心化程度和安全性。" />
</CardGrid>

## 家庭质押前的注意事项 {#considerations-before-staking-solo}

尽管我们希望家庭质押能够对所有人开放且毫无风险，但现实并非如此。 在选择家庭质押你的 ETH 之前，有一些实际且重要的注意事项需要牢记。

<InfoGrid>
<ExpandableCard title="必读内容" eventCategory="SoloStaking" eventName="clicked required reading">
运行自己的节点时，你应该花些时间学习如何使用你选择的软件。 这包括阅读相关文档并关注这些开发团队的沟通渠道。

你对所运行的软件和权益证明工作原理的了解越深入，作为质押者的风险就越小，作为节点运行者，解决可能出现的任何问题也就越容易。
</ExpandableCard>

<ExpandableCard title="熟悉电脑操作" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
节点设置需要操作者对计算机有相当的熟练度，不过随着时间的推移，新工具正让此过程变得更加容易。 了解命令行界面会有所帮助，但不再是硬性要求。

它还需要非常基本的硬件设置，以及对最低推荐规格的一些了解。
</ExpandableCard>

<ExpandableCard title="安全的密钥管理" eventCategory="SoloStaking" eventName="clicked secure key management">
就像私钥保护你的以太坊地址一样，你需要为你的验证者专门生成密钥。 你必须了解如何确保所有助记词或私钥的安全。{' '}

[以太坊安全与骗局防范](/security/)
</ExpandableCard>

<ExpandableCard title="维护" eventCategory="SoloStaking" eventName="clicked maintenance">
硬件偶尔会发生故障，网络连接会出错，客户端软件也偶尔需要升级。 节点维护是不可避免的，并且偶尔需要你的关注。 你需要确保自己随时了解任何预期的网络升级或其他关键的客户端升级。
</ExpandableCard>

<ExpandableCard title="可靠的在线时长" eventCategory="SoloStaking" eventName="clicked reliable uptime">
你的奖励与你的验证者在线并正常进行证明的时间成正比。 停机会导致与同时离线的其他验证者数量成正比的惩罚，但<a href="#faq">不会导致罚没</a>。 带宽也很重要，因为未能及时收到的证明会导致奖励减少。 具体要求会有所不同，但建议最低上传和下载速度为 10 Mb/s。
</ExpandableCard>

<ExpandableCard title="罚没风险" eventCategory="SoloStaking" eventName="clicked slashing risk">
与离线导致的“不活跃惩罚”不同，<em>罚没</em>是一种更为严重的惩罚，专为恶意行为而设。 通过运行少数派客户端，并且一次只在一台机器上加载你的密钥，可以将你被罚没的风险降至最低。 话虽如此，所有质押者都必须意识到罚没的风险。

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> 更多关于罚没和验证者生命周期的信息</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## 工作原理 {#how-it-works}

<StakingHowSoloWorks />

在线时你将赢得以太币奖励，奖励将定期存入你的提款地址。

如果需要，你可以退出验证者身份，这样就不再需要保持在线，并且会停止获得任何进一步的奖励。 你的剩余余额随后将被提取到你在设置时指定的提款地址。

[关于质押提款的更多信息](/staking/withdrawals/)

## 在质押启动板上开始 {#get-started-on-the-staking-launchpad}

质押启动板是一个开源应用程序，可以帮助你成为质押者。 它会指导你选择客户端、生成密钥，以及将你的 ETH 存入质押存款合约。 我们提供了一份核对清单，以确保你已完成所有步骤，安全地设置你的验证者。

<StakingLaunchpadWidget />

## 节点和客户端设置工具的注意事项 {#node-tool-considerations}

越来越多的工具和服务可以帮助你单独质押以太币，但每种工具和服务的风险和收益各不相同。

下方使用属性指标来标示所列质押工具可能具有的显著优点或缺点。 在你选择工具以帮助你的质押之旅时，请使用本节作为我们如何定义这些属性的参考。

<StakingConsiderations page="solo" />

## 探索节点和客户端设置工具 {#node-and-client-tools}

有多种方案可帮助你进行设置。 上述指标可引导你了解如何使用下方的工具。

<ProductDisclaimer />

### 节点工具

<StakingProductsCardGrid category="nodeTools" />

请注意选择[少数派客户端](/developers/docs/nodes-and-clients/client-diversity/)的重要性，因为这可以提高网络安全性并限制你的风险。 允许你设置少数派客户端的工具被标记为 <em style={{ textTransform: "uppercase" }}>“多客户端”。</em>

### 密钥生成器

这些工具可以作为 [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) 的替代方案，帮助生成密钥。

<StakingProductsCardGrid category="keyGen" />

想要推荐其他未提到的质押工具吗？ 查看我们的[产品上架政策](/contributing/adding-staking-products/)，了解您的产品是否合适，并提交审核。

## 探索家庭质押指南 {#staking-guides}

<StakingGuides />

## 常见问题{#faq}

下面是一些关于质押的最常见问题，值得了解一下。

<ExpandableCard title="什么是验证者？">

<em>验证者</em>是存在于以太坊上并参与以太坊协议共识的虚拟实体。 验证者由余额、公钥和其他属性表示。 <em>验证者客户端</em>是通过持有和使用验证者的私钥来代表验证者行事的软件。 单个验证者客户端可以持有多个密钥对，从而控制多个验证者。
</ExpandableCard>

<ExpandableCard title="我可以存入超过 32 ETH 吗？">
是的，现代验证者账户最多可以持有 2048 ETH。 超过 32 ETH 的部分将以阶梯方式复利，随着你的真实余额增加而以整数增量增加。 这就是所谓的<a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">有效余额</a>。

为了增加账户的有效余额从而增加奖励，必须超过任何整数 ETH 阈值 0.25 ETH 的缓冲。 例如，一个真实余额为 32.9、有效余额为 32 的账户需要再赚取 0.35 ETH，使其真实余额超过 33.25，才能触发有效余额的增加。

该缓冲区还可以防止有效余额下降，直到它比其当前有效余额低 0.25 ETH 为止。

与验证者关联的每个密钥对至少需要 32 ETH 才能激活。 超过此数额的任何余额都可以随时通过由该地址签名的交易提取到关联的提款地址。 任何超过最大有效余额的资金都将定期自动提取。

如果家庭质押对你来说要求太高，可以考虑使用[质押即服务](/staking/saas/)提供商；如果你的资金少于 32 ETH，可以查看[质押池](/staking/pools/)。
</ExpandableCard>

<ExpandableCard title="如果我离线了，会被罚没吗？ (简而言之：不会。)">
在网络正常进行最终确定的情况下离线，不会导致罚没。 如果你的验证者在某个时期（每个时期长 6.4 分钟）内无法进行证明，会产生小额的<em>不活跃惩罚</em>，但这与<em>罚没</em>截然不同。 这些惩罚略低于验证者在线证明本可获得的奖励，损失可以通过大致相等的在线时间重新赚回。

请注意，不活跃惩罚与同时离线的验证者数量成正比。 在网络大部分节点同时离线的情况下，每个验证者受到的惩罚将大于单个验证者离线时的惩罚。

在极端情况下，如果网络因超过三分之一的验证者离线而停止最终确定，这些用户将遭受所谓的<em>二次不活跃泄漏</em>，即离线验证者账户中的 ETH 会呈指数级流失。 这使得网络能够通过销毁不活跃验证者的 ETH，直到其余额达到 16 ETH 时最终实现自我修复，届时他们将被自动从验证者池中移除。 剩余的在线验证者最终将再次占网络的三分之二以上，满足再次最终确定链所需的绝对多数。
</ExpandableCard>

<ExpandableCard title="如何确保我不会被罚没？">
简而言之，这永远无法完全保证，但如果你本着诚信原则行事，运行少数派客户端，并且一次只在一台机器上保存你的签名密钥，那么被罚没的风险几乎为零。

只有少数几种特定方式会导致验证者被罚没并从网络中移除。 截至撰写本文时，已发生的罚没事件完全是冗余硬件设置的产物，即签名密钥同时存储在两台独立的机器上。 这可能会无意中导致你的密钥进行<em>双重投票</em>，这是一种可罚没的行为。

运行绝大多数客户端（网络中超过 2/3 的验证者使用的任何客户端）也存在潜在的罚没风险，即当该客户端存在导致链分叉的漏洞时。 这可能导致一个错误的分叉被最终确定。 要纠正回预期的链，需要通过尝试撤销一个已最终确定的区块来提交<em>环绕投票</em>。 这也是一种可罚没的行为，可以通过运行少数派客户端来避免。

<em>非主流客户端</em>中的等效错误永远不会被最终确认，因此也不会导致环绕投票，只会导致怠工处罚，而非<em>罚没</em>。

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">详细了解运行少数派客户端的重要性。</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">详细了解如何预防罚没</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="哪个客户端最好？">
各个客户端在性能和用户界面方面可能略有不同，因为它们是由不同团队使用各种编程语言开发的。 话虽如此，没有哪个是“最好”的。 所有生产级客户端都是优秀的软件，它们都执行相同的核心功能来同步区块链并与之交互。

由于所有生产级客户端都提供相同的基本功能，因此选择一个<strong>少数派客户端</strong>实际上非常重要，即当前网络上大多数验证者未使用的任何客户端。 这听起来可能违反直觉，但在该客户端出现漏洞的情况下，运行多数或绝大多数客户端会让你面临更高的罚没风险。 运行少数派客户端会大大降低这些风险。

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">详细了解客户端多样性至关重要的原因</a>
</ExpandableCard>

<ExpandableCard title="我可以直接使用 VPS (虚拟专用服务器) 吗？">
尽管虚拟专用服务器 (VPS) 可以替代家用硬件，但你的验证者客户端的物理访问权限和位置<em>确实很重要</em>。 Amazon Web Services 或 Digital Ocean 等中心化云解决方案提供了无需获取和操作硬件的便利，但代价是使网络中心化。

在单个中心化云存储解决方案上运行的验证者客户端越多，对这些用户来说就越危险。 任何导致这些提供商离线的事件，无论是攻击、监管要求，还是仅仅是断电/断网，都将导致依赖该服务器的每个验证者客户端同时离线。

离线惩罚与同时离线的其他人数量成正比。 使用 VPS 会大大增加离线惩罚更严重的风险，并且在中断规模足够大的情况下，会增加你遭受二次泄漏或罚没的风险。 为了将自身风险和网络风险降至最低，我们强烈鼓励用户获取并操作自己的硬件。
</ExpandableCard>

<ExpandableCard title="如何解锁我的奖励或取回我的 ETH？">

从信标链上进行任何类型的提款都需要设置提款凭据。

新质押者在生成密钥和存款时进行此设置。 尚未进行此设置的现有质押者可以升级其密钥以支持此功能。

设置提款凭据后，奖励支付（最初的 32 个以太币累积的以太币奖励）将自动定期分发到提款地址。

要解锁并收回全部余额，还必须完成验证者退出流程。

<ButtonLink href="/staking/withdrawals/">关于质押提款的更多信息</ButtonLink>
</ExpandableCard>

## 扩展阅读{#further-reading}

- [以太坊质押目录](https://www.staking.directory/) - _Eridian and Spacesider_
- [以太坊的客户端多样性问题](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [帮助实现客户端多样性](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [以太坊共识层上的客户端多样性](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [如何选购以太坊验证者硬件](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Eth2 罚没预防技巧](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
