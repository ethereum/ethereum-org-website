---
title: 单独质押你的以太币
description: 简要介绍如何单独质押你的以太币
lang: zh
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-solo.png
alt: 莱斯利犀牛在自己的电脑芯片上。
sidebarDepth: 2
summaryPoints:
  - 直接从协议中获得最大奖励，以保持你的验证者正常运行和在线
  - 运行家用硬件并自行加入以太坊网络的安全和去中心化
  - 消除信任依赖，始终自己掌控资金密钥
---

## 什么是单独质押？ {#what-is-solo-staking}

单独质押是指运行一个连接到互联网的[以太坊节点](/run-a-node/)，并存入 32 个以太币以激活一个[验证者](#faq)，使你有能力直接参与网络共识。

一个以太坊节点既包括执行层 (EL) 客户端，也包括共识层 (CL) 客户端。 这些客户端是一套共同工作的软件，拥有一套有效的签名密钥，以验证交易和区块、证明链头的正确性、汇总认证和提交区块。

单独质押用户负责操作运行这些客户端所需的硬件。 强烈建议使用一台专用机器在家进行操作，这对网络安全非常有益。

单独质押人可以直接从协议中获得奖励，以保持他们的验证者在线并正常运行。

## 为什么要单独质押？ {#why-stake-solo}

单独质押会带来更多责任，但也为你提供了对资金和质押设置的最大控制权。

<CardGrid>
  <Card title="赚取以太币" emoji="💸">
    当你的验证者在线时，可以直接从协议中赚取以太币奖励，没有任何中间商从中抽成。
  </Card>
  <Card title="完全控制" emoji="🎛️">
    自己保存密钥， 自己选择客户端和硬件组合，使你的风险最小化，也为以太坊网络的健康和安全做出最大贡献。 第三方质押服务可以为你做这些决定，但他们并不总是能做出最安全的选择。
  </Card>
  <Card title="网络安全" emoji="🔐">
    单独质押是最具影响的质押方式。 通过在自己的家用硬件上运行验证者，便能增强加以太坊协议的稳定性、去中心化程度和安全性。
  </Card>
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
    就像私钥保护了你的以太坊钱包一样，你也需要为验证者单独生成密钥。 你必须了解如何保障助记词或私钥的安全。
    <p style={{marginTop: "1rem"}}><a href="/security">以太坊安全和预防欺诈措施</a></p>
  </ExpandableCard>
  <ExpandableCard title="无法提款（暂时性）" eventCategory="SoloStaking" eventName="clicked no withdrawing">
    目前还不支持从验证者余额中提取质押的以太币或奖励。 计划为即将到来的上海升级提供提款支持。 预计你的以太币至少会被锁定一到两年。 在上海升级后，如果你愿意，你将能够自由提取质押的以太币。
  </ExpandableCard>
  <ExpandableCard title="维护" eventCategory="SoloStaking" eventName="clicked maintenance">
    硬件设施会发生故障，网络连接会出错，客户端软件也需要升级。 因此节点维护不可避免，需要你偶尔关注。 你要确保知道任何预期的网络升级，或其他关键的客户端升级。
  </ExpandableCard>
  <ExpandableCard title="可靠的正常运行时间" eventCategory="SoloStaking" eventName="clicked reliable uptime">
    你的回报与你的验证者在线并正确验证的时间成正比。 宕机会导致一定比例的处罚，具体与有多少其他验证者同时离线有关，但<a href="#faq">不会导致罚没</a>。 同时网络带宽也很重要，因为如果没有及时收到认证，奖励就会减少。 建议至少要有 10 Mb/s 的上行和下行带宽。
  </ExpandableCard>
  <ExpandableCard title="罚没风险" eventCategory="SoloStaking" eventName="clicked slashing risk">
    与离线导致的怠工处罚不同，<em>罚没</em>是一种更严重的处罚，专门针对恶意违规。 同一时间只在一台机器上运行加载你密钥的客户端，你被罚没的风险可以降到最低。 总得来说，所有质押人都必须意识到被罚没的风险。
    
    <p><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">更多关于罚没和验证者周期的信息</a></p>
  </ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## 工作原理 {#how-it-works}

<StakingHowSoloWorks />

如果需要，你可以验证者身份退出，这样就不需要在线，也不会再有任何奖励。 请注意，在上海升级之前，这些资金无法*提取*。

上海升级之后，用户可以选择提取他们的质押物及奖励。

## 开始使用 Staking Launchpad {#get-started-on-the-staking-launchpad}

Staking Launchpad 是一个开源应用程序，可帮助你成为质押人。 它将指导你选择客户端、生成密钥并将你的以太币存入质押存款合约。 会提供一份清单，确保已经涵盖安全设置验证者需要的所有内容。

<StakingLaunchpadWidget />

## 使用节点和客户端设置工具时应考虑的事项 {#node-tool-considerations}

有越来越多的工具和服务可以帮助你单独质押以太币，但每种工具和服务的风险和收益各不相同。

下面使用属性指标来表示列出的质押工具可能具有的显著优势或劣势。 在选择帮你度过质押之旅的工具时，请使用本节作为参考，了解我们如何定义这些属性。

<StakingConsiderations page="solo" />

## 探索节点和客户端设置工具 {#node-and-client-tools}

有多种方案可帮助你进行设置。 上述指标可引导你了解如何使用下方的工具。

<InfoBanner emoji="⚠️" isWarning>
请注意选择<a href="/developers/docs/nodes-and-clients/client-diversity/">非主流客户端</a>的重要性，因为可以提高网络安全性，并限制你的风险。 可让你设置非主流客户端的工具称为<em style="text-transform: uppercase;">“多客户端”。</em>
</InfoBanner>

#### 节点工具

<StakingProductsCardGrid category="nodeTools" />

#### 密钥生成器

这些工具可用于替代[质押存款命令行接口](https://github.com/ethereum/staking-deposit-cli/)，帮助生成密钥。

<StakingProductsCardGrid category="keyGen" />

想要推荐其他未提到的质押工具吗？ 可以查看我们的[产品清单政策](/contributing/adding-staking-products/)，思考你想要推荐的工具是否合适，合适的话，请提交以供审核。

## 探索单独质押指南 {#staking-guides}

<StakingGuides />

## 常见问题 {#faq}

以下关于质押的问题是值得了解的几个最常见问题。

<ExpandableCard title="什么是验证者？">

验证者是一个存在于以太坊上并参与以太坊协议共识的虚拟实体。 验证者由余额、公钥和其他属性信息表示。 验证者客户端是代表验证者通过持有和使用其私钥进行操作的软件。 一个验证者客户端可以持有多个密钥对，从而控制多个验证者。

</ExpandableCard>

<ExpandableCard title="我能存入超过 32 个以太币吗？">
每个与验证者相关的密钥对都需要正好 32 个以太币才能激活。 将更多以太币存入一对密钥并不能增加可能获得的奖励，因为每个验证者的<a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">有效余额</a>被限制为 32 个以太币。 这意味着质押时需要以 32 个以太币为单位递增，每个验证者都有自己的一套密钥和余额。

不要为一个验证者存入超过 32 以太币的资金。 这不会增加你的奖励，而且资金会被锁定，直到计划执行的上海更新完成为止。

如果单独质押对你来说要求太高，可以考虑使用<a href="/staking/saas/">质押即服务</a>提供商，或者如果你的资金少于 32 个以太币，则可以考虑<a href="/staking/pools/">联合质押</a>。
</ExpandableCard>

<ExpandableCard title="如果我离线了会被罚没吗？ （简单地说：不会）">
在网络最终确认时下线，不会导致罚没。 如果你的验证者在某个周期（每个周期 6.4 分钟）内无法进行验证，就会导致少量的<em>怠工处罚</em>，但这与<em>罚没</em>有很大不同。 这些处罚比你在验证者可用的情况下获得的奖励要少一些，而且损失可以通过将验证者上线大约相等的时间赚回来。

请注意，对怠工验证者的处罚与有多少个验证者同时下线成正比。 在大部分网络参与者同时离线的情况下，对每个验证者的处罚会比单个验证者怠工所受的处罚大。

在极端情况下，如果网络因超过三分之一的验证者离线而停止最终确认，这些验证者将受到所谓的<em>二次怠工惩罚</em>，离线验证者账户中的以太币将遭受指数级损失。 这时以太坊网络将通过消耗怠工验证者的以太币进行自我修复，直到他们的余额达到 16 个以太币，此时他们将自动从验证者池中退出。 剩余在线的验证者最终将再次超过 2/3，从而满足再次最终确认链的绝对多数要求。
</ExpandableCard>

<ExpandableCard title="如何保证我不会被罚没？">
简而言之，虽然永远不能完全保证，但如果你真诚行事，运行非主流客户端，并且每次只在一台机器上保留你的签名密钥，你被罚没的风险几乎为零。

只有几种特定的情况会导致验证者被罚没并从网络中退出。 在撰写本文时，已经发生的罚没事件完全是冗余硬件设置的产物，即签名密钥同时存储在两台不同的机器上。 这可能会无意中导致你的密钥出现<em>两次投票</em>，这是一种可被罚没的行为。

运行主流客户端（任何被超过 2/3 的用户使用的客户端）也存在可能被罚没的风险，比如该客户端有一个导致链分叉的错误。 这可能会导致一个有问题的分叉被最终确认。 要纠正并返回预定链，需要提交一个<em>环绕投票</em>，以尝试撤销最终确定的区块。 这也是一种可被罚没的行为，可以通过运行非主流客户端来避免。

<em>非主流客户端</em>中的等效错误永远不会被最终确认，因此也不会导致环绕投票，只会导致怠工处罚，而非<em>罚没</em>。

<p><a href="https://hackernoon.com/ethereums-client-diversity-problem">详细了解运行非主流客户端的重要性。</a></p>
<p><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">了解更多关于预防罚没的信息</a></p>
</ExpandableCard>

<ExpandableCard title="哪个客户端最好？">
各个客户端在性能和用户界面方面可能略有不同，因为每个客户端都是由不同的团队使用不同编程语言开发的。 这意味着，它们之中没有“最好的”。 所有生产用客户端都是优秀的软件，它们都执行相同的核心功能，即与区块链进行同步和交互。

由于所有生产用客户端都提供相同的基本功能，所以选择一个<strong>非主流客户端</strong>实际上非常重要，即并未被网络上大多数验证者使用的任何客户端。 这听起来可能有悖常理，但运行多数或绝对多数人使用的客户端会使你在该客户端出现错误时面临更大的罚没风险。 运行一个少数人使用的客户端可以极大地降低这些风险。

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">详细了解为什么客户端多样性至关重要</a>
</ExpandableCard>

<ExpandableCard title="我可以仅使用 VPS（虚拟专用服务器）吗？">
虽然虚拟专用服务器 (VPS) 可用于替代家庭硬件设施，但您的验证者客户端的物理访问和位置<em>确实很重要</em>。 使用中心化云计算解决方案（如亚马逊网络服务或 Digital Ocean）的便捷之处在于，你不必拥有和操作硬件设施，但代价是网络需要中心化。

在一个中心化云存储解决方案上运行的验证者客户端越多，对这些用户来说就越危险。 任何使这些提供商离线的事件，无论是攻击、监管要求，还是电力/互联网中断，都会导致每个依赖于该服务器的验证者客户端同时离线。

离线处罚与有多少其他验证者同时离线成正比。 使用虚拟专用服务器会大大增加离线处罚的风险，并在大范围宕机的情况下增加你的二次惩罚或罚没的风险。 为了尽量降低你自己的风险，以及以太坊网络的风险，我们强烈建议用户获取并操作自己的硬件。

<a href="https://consensys.net/blog/codefi/rewards-and-penalties-on-ethereum-20-phase-0/">更多关于奖励和惩罚的信息</a>
</ExpandableCard>

## 延伸阅读 {#further-reading}

- [以太坊客户端多样性问题](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [帮助实现客户端多样性](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [以太坊共识层的客户端多样性](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [如何选购以太坊验证者的硬件](https://www.youtube.com/watch?v=C2wwu1IlhDc)- _EthStaker 2022_
- [加入以太坊 2.0 测试网的详细步骤](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [以太坊 2 防止罚没小技巧](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_
- [以太坊 2.0 的奖惩措施](https://consensys.net/blog/codefi/rewards-and-penalties-on-ethereum-20-phase-0/) - _James BeckMarch 2020_
