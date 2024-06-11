---
title: 单独质押你的以太币
description: 简要介绍如何单独质押你的以太币
lang: zh
template: staking
emoji: ":money_with_wings:"
image: /staking/leslie-solo.png
alt: 莱斯利犀牛在自己的电脑芯片上。
sidebarDepth: 2
summaryPoints:
  - 直接从协议中获得最大奖励，以保持你的验证者正常运行和在线
  - 运行家用硬件并自行加入以太坊网络的安全和去中心化
  - 消除信任依赖，始终自己掌控资金密钥
---

## 什么是单独质押？ {#what-is-solo-staking}

单独质押是指运行一个连接到互联网的[以太坊节点](/run-a-node/)，并存入 32 个以太币以激活一个[验证者](#faq)，使你有能力直接参与网络共识。

**单独质押增强了以太坊网络的去中心化**，使以太坊更加抗审查，更加稳健，能够抵御攻击。 其他质押方法可能不会给网络带来同样的助益。 单独质押是保护以太坊的最佳质押方案。

一个以太坊节点既包括执行层 (EL) 客户端，也包括共识层 (CL) 客户端。 这些客户端是一套共同工作的软件，拥有一套有效的签名密钥，以验证交易和区块、证明链头的正确性、汇总认证和提交区块。

单独质押用户负责操作运行这些客户端所需的硬件。 强烈建议使用一台专用机器在家进行操作，这对网络安全非常有益。

单独质押人可以直接从协议中获得奖励，以保持他们的验证者在线并正常运行。

## 为什么要单独质押？ {#why-stake-solo}

单独质押让你承担更大的责任，但会让你对资金和质押设置拥有最大的控制权。

<CardGrid>
  <Card title="赚取以太币" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="完全控制" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="网络安全" emoji="🔐" description="Solo staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## 单独质押前的考量 {#considerations-before-staking-solo}

尽管我们希望每个人都能无风险地进行单独质押，但这并不现实。 在选择单独质押以太币之前，有一些实际和严肃的事项需要记住。

<InfoGrid>
<ExpandableCard title="必读内容" eventCategory="SoloStaking" eventName="clicked required reading">
在操作自己的节点时，你应该花一些时间学习如何使用你所选择的软件。 这涉及到阅读相关文档，以及了解开发团队的沟通渠道。

你对所运行的软件和权益证明的原理了解得越多，作为一名质押人的风险就越小，也越容易解决在节点运行过程中可能出现的任何问题。
</ExpandableCard>

<ExpandableCard title="熟悉计算机" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
节点设置要求用户能够熟练使用计算机，尽管随着时间的推移，新的工具正在使其变得更容易。 了解命令行界面会有帮助，但并非必需。

节点设置还需要用户对基本的硬件设置，以及最低推荐规格有一些了解。
</ExpandableCard>

<ExpandableCard title="安全的密钥管理" eventCategory="SoloStaking" eventName="clicked secure key management">
就像私钥保护以太坊地址的方式一样，你也需要为验证者单独生成密钥。 你必须了解如何保护好助记词或私钥的安全。{' '}

<a href="/security/">以太坊的安全性和防范欺诈</a>
</ExpandableCard>

<ExpandableCard title="维护" eventCategory="SoloStaking" eventName="clicked maintenance">
硬件设施会发生故障，网络连接会出错，客户端软件也需要升级。 因此节点维护不可避免，需要你偶尔关注。 你要确保知道任何预期的网络升级，或其他关键的客户端升级。
</ExpandableCard>

<ExpandableCard title="可靠的正常运行时间" eventCategory="SoloStaking" eventName="clicked reliable uptime">
你的回报与你的验证者在线并正确验证的时间成正比。 宕机会导致一定比例的处罚，具体与有多少其他验证者同时离线有关，但<a href="#faq">不会导致罚没</a>。 同时网络带宽也很重要，因为如果没有及时收到认证，奖励就会减少。 建议至少要有 10 Mb/s 的上行和下行带宽。
</ExpandableCard>

<ExpandableCard title="罚没风险" eventCategory="SoloStaking" eventName="clicked slashing risk">
与离线导致的怠工处罚不同，<em>罚没</em>是一种更严重的处罚，专门针对恶意违规。 同一时间只在一台机器上运行加载你密钥的客户端，你被罚没的风险可以降到最低。 总得来说，所有质押人都必须意识到被罚没的风险。

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">更多关于惩罚和验证者生命周期的信息</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## 工作原理 {#how-it-works}

<StakingHowSoloWorks />

在线时你将赢得以太币奖励，奖励将定期存入你的提款地址。

如果需要，你可以验证者身份退出，这样就不需要在线，也不会再有任何奖励。 之后，你的余额将提取到你在设置过程指定的提款地址。

[更多关于质押提款的信息](/staking/withdrawals/)

## 开始使用 Staking Launchpad {#get-started-on-the-staking-launchpad}

Staking Launchpad 是一个开源应用程序，可帮助你成为质押人。 它将指导你选择客户端、生成密钥并将你的以太币存入质押存款合约。 会提供一份清单，确保已经涵盖安全设置验证者需要的所有内容。

<StakingLaunchpadWidget />

## 使用节点和客户端设置工具时应考虑的事项 {#node-tool-considerations}

有越来越多的工具和服务可以帮助你单独质押以太币，但每种工具和服务的风险和收益各不相同。

下面使用属性指标来表示列出的质押工具可能具有的显著优势或劣势。 在选择帮你度过质押之旅的工具时，请使用本节作为参考，了解我们如何定义这些属性。

<StakingConsiderations page="solo" />

## 探索节点和客户端设置工具 {#node-and-client-tools}

有多种方案可帮助你进行设置。 上述指标可引导你了解如何使用下方的工具。

<ProductDisclaimer />

### 节点工具

<StakingProductsCardGrid category="nodeTools" />

请注意选择[非主流客户端](/developers/docs/nodes-and-clients/client-diversity/)的重要性，因为可以提高网络安全性，并限制你的风险。 可让你设置非主流客户端的工具称为<em style={{ textTransform: "uppercase" }}>“多客户端”。</em>

### 密钥生成器

这些工具可用来替代[质押存款命令行接口](https://github.com/ethereum/staking-deposit-cli/)，帮助生成密钥。

<StakingProductsCardGrid category="keyGen" />

想要推荐其他未提到的质押工具吗？ 可以查看我们的[产品上线政策](/contributing/adding-staking-products/)，确定你推荐的质押工具是否合适，合适的话，请提交以供审核。

## 探索单独质押指南 {#staking-guides}

<StakingGuides />

## 常见问题 {#faq}

下面是一些关于质押的最常见问题，值得了解一下。

<ExpandableCard title="什么是验证者？">

<em>验证者</em>是一个虚拟实体，存在于以太坊上并参与以太坊协议的共识。 验证者由余额、公钥和其他属性信息表示。 <em>验证者客户端</em>是通过持有并使用验证者的私钥代表验证者行动的软件。 一个验证者客户端可以持有多个密钥对，从而控制多个验证者。

</ExpandableCard>

<ExpandableCard title="我能存入超过 32 个以太币吗？">
每个与验证者相关的密钥对都需要正好 32 个以太币才能激活。 将更多以太币存入一对密钥并不能增加可能获得的奖励，因为每个验证者的<a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">有效余额</a>被限制为 32 个以太币。 这意味着质押时需要以 32 个以太币为单位递增，每个验证者都有自己的一套密钥和余额。

不要为一个验证者存入超过 32 以太币的资金。 这样做不会增加你的奖励。 如果为验证者设置了提款地址，超过 32 个以太币多余资金将在下一次<a href="/staking/withdrawals/#validator-sweeping">验证者扫描</a>时自动提取到该地址。

如果单独质押对你来说要求太高，可以考虑使用<a href="/staking/saas/">质押即服务</a>提供商，或者如果你的资金少于 32 个以太币，则可以考虑<a href="/staking/pools/">联合质押</a>。
</ExpandableCard>

<ExpandableCard title="如果我离线了会被罚没吗？ （简单地说：不会）">
在网络最终确认时下线，不会导致罚没。 如果你的验证者在某个周期（每个周期 6.4 分钟）内无法进行验证，就会导致少量的<em>怠工处罚</em>，但这与<em>罚没</em>有很大不同。 这些处罚比你在验证者可用的情况下获得的奖励要少一些，而且损失可以通过将验证者上线大约相等的时间赚回来。

请注意，对怠工验证者的处罚与有多少个验证者同时下线成正比。 在大部分网络参与者同时离线的情况下，对每个验证者的处罚会比单个验证者怠工所受的处罚大。

在极端情况下，如果网络因超过三分之一的验证者离线而停止最终确认，这些验证者将受到所谓的<em>二次怠惰惩罚</em>，离线验证者帐户中的以太币将遭受指数级损失。 这时以太坊网络将通过消耗怠工验证者的以太币进行自我修复，直到他们的余额达到 16 个以太币，此时他们将自动从验证者池中退出。 剩余在线的验证者最终将再次超过 2/3，从而满足再次最终确认链的绝对多数要求。
</ExpandableCard>

<ExpandableCard title="如何保证我不会被罚没？">
简而言之，虽然永远不能完全保证，但如果你真诚行事，运行非主流客户端，并且每次只在一台机器上保留你的签名密钥，你被罚没的风险几乎为零。

只有几种特定的情况会导致验证者被罚没并从网络中退出。 在撰写本文时，已经发生的罚没事件完全是冗余硬件设置的产物，即签名密钥同时存储在两台不同的机器上。 这可能会无意中导致你的密钥出现<em>两次投票</em>，这是一种可被罚没的行为。

运行主流客户端（任何被超过 2/3 的用户使用的客户端）也存在可能被罚没的风险，比如该客户端有一个导致链分叉的错误。 这可能会导致一个有问题的分叉被最终确认。 要纠正并返回预定链，需要提交一个<em>环绕投票</em>，以尝试撤销最终确定的区块。 这也是一种可被罚没的行为，可以通过运行非主流客户端来避免。

<em>非主流客户端</em>中的等效错误永远不会被最终确认，因此也不会导致环绕投票，只会导致怠工处罚，而非<em>罚没</em>。

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">详细了解运行非主流客户端的重要性。</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">详细了解预防罚没</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="哪个客户端最好？">
各个客户端在性能和用户界面方面可能略有不同，因为每个客户端都是由不同的团队使用不同编程语言开发的。 这意味着，它们之中没有“最好的”。 所有生产用客户端都是优秀的软件，它们都执行相同的核心功能，即与区块链进行同步和交互。

由于所有生产用客户端都提供相同的基本功能，所以选择一个<strong>非主流客户端</strong>实际上非常重要，即并未被网络上大多数验证者使用的任何客户端。 这听起来可能有悖常理，但运行多数或绝对多数人使用的客户端会使你在该客户端出现错误时面临更大的罚没风险。 运行一个少数人使用的客户端可以极大地降低这些风险。

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">详细了解为什么客户端多样性至关重要</a>
</ExpandableCard>

<ExpandableCard title="我可以仅使用 VPS（虚拟专用服务器）吗？">
虽然虚拟专用服务器 (VPS) 可用于替代家庭硬件设施，但你的验证者客户端的物理访问和位置<em>确实很重要</em>。 使用中心化云计算解决方案（如亚马逊网络服务或 Digital Ocean）的便捷之处在于，你不必拥有和操作硬件设施，但代价是网络需要中心化。

在一个中心化云存储解决方案上运行的验证者客户端越多，对这些用户来说就越危险。 任何使这些提供商离线的事件，无论是攻击、监管要求，还是电力/互联网中断，都会导致每个依赖于该服务器的验证者客户端同时离线。

离线处罚与有多少其他验证者同时离线成正比。 使用虚拟专用服务器会大大增加离线处罚的风险，并在大范围宕机的情况下增加你的二次惩罚或罚没的风险。 为了尽量降低你自己的风险，以及以太坊网络的风险，我们强烈建议用户获取并操作自己的硬件。
</ExpandableCard>

<ExpandableCard title="我如何解锁我的奖励或收回我的以太币？">

从信标链上进行任何类型的提款都需要设置提款凭据。

新质押人在生成密钥和存款时设置提款凭据。 尚未设置提款凭证的现有质押人可以升级他们的密钥，以支持提款功能。

设置提款凭据后，奖励支付（最初的 32 个以太币累积的以太币奖励）将自动定期分发到提款地址。

要解锁并收回全部余额，还必须完成验证者退出流程。

<ButtonLink to="/staking/withdrawals/">更多关于质押提款的信息</ButtonLink>
</ExpandableCard>

## 延伸阅读 {#further-reading}

- [以太坊质押目录](https://www.staking.directory/) - _Eridian 和 Spacesider_
- [以太坊客户端多样性问题](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [帮助实现客户端多样性](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [以太坊共识层的客户端多样性](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [如何选购以太坊验证者的硬件](https://www.youtube.com/watch?v=C2wwu1IlhDc)- _EthStaker 2022_
- [加入以太坊 2.0 测试网的详细步骤](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [以太坊 2 防止罚没小技巧](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="solo-staking" />
