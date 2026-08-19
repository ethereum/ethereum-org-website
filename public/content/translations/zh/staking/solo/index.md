---
title: 在家质押你的 ETH
description: 关于如何开始在家质押 ETH 的概述
lang: zh
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - 保持验证者正常运行并在线，直接从协议中获得最大奖励
  - 运行家用硬件，亲自为以太坊网络的安全性和去中心化做出贡献
  - 消除信任假设，绝不放弃对资金密钥的控制
---

## 什么是家庭质押？ {#what-is-solo-staking}

在家质押是指[运行一个连接到互联网的以太坊节点](/run-a-node/)并存入至少 32 个 ETH 以激活[验证者](#faq)的行为，这使你能够直接参与网络共识。

在家质押是最直接的质押方式。在你和协议之间没有智能合约、运营商或托管人。你持有自己的密钥，积极参与验证[以太坊](/)网络，并直接获得网络奖励。所有其他质押方法都在这一核心网络活动之上增加了技术、中间件或服务层。

**在家质押提高了以太坊网络的去中心化程度**，使以太坊更具抗审查性，并能更稳健地抵御攻击。其他质押方法可能无法以同样的方式帮助网络。在家质押是保护以太坊安全的最佳质押选择。

以太坊节点由执行层 (EL) 客户端和共识层 (CL) 客户端组成。这些客户端是协同工作的软件，连同一组有效的签名密钥，用于验证交易和区块、证明正确的链头、聚合证明并提议区块。

在家质押者负责操作运行这些客户端所需的硬件。强烈建议使用一台你在家操作的专用机器来进行此操作——这对网络的健康极其有益。

在家质押者通过保持其验证者正常运行并在线，直接从协议中获得奖励。

## 为什么在家质押？ {#why-stake-solo}

在家质押伴随着更多的责任，但为你提供了对资金和质押设置的最大控制权。

<Grid>
  <Card title="Keep all rewards" icon={<HandCoins />} description="在家质押者获得 100% 的协议奖励，当你的验证者在线时，由协议直接支付。" />
  <Card title="自我主权" icon={<KeyRound />} description="始终保留你自己的密钥并完全托管你的资金。选择能让你将风险降至最低的客户端和硬件组合。没有任何第三方可以为你做这些决定或限制你的提款。" />
  <Card title="Client and geographic diversity" icon={<GlobeLock />} description="在家质押者在分布于多个地点的硬件上运行少数派客户端，从而增强了网络的去中心化和安全性。" />
</Grid>

## 在家质押前的注意事项 {#considerations-before-staking-solo}

尽管我们希望在家质押对每个人来说都是触手可及且没有风险的，但这并不现实。在选择在家质押你的 ETH 之前，需要牢记一些实际且严肃的注意事项。

<ExpandableCard title="必读内容" eventCategory="SoloStaking" eventName="clicked required reading">
运行自己的节点时，你应该花一些时间学习如何使用你选择的软件。这包括阅读相关文档并关注这些开发团队的沟通渠道。

你对正在运行的软件以及权益证明 (PoS) 的工作原理了解得越多，作为质押者的风险就越小，作为节点运营商解决在此过程中可能出现的任何问题也就越容易。
</ExpandableCard>

<ExpandableCard title="熟悉计算机操作" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
节点设置要求对计算机操作有一定的熟练度，尽管随着时间的推移，新工具正在使这变得更容易。了解命令行界面会有所帮助，但不再是严格要求的。

它还需要非常基础的硬件设置，以及对最低推荐规格的一些了解。
</ExpandableCard>

<ExpandableCard title="硬件要求" eventCategory="SoloStaking" eventName="clicked hardware requirements">
目前社区关于验证者硬件和带宽的指南维护在[硬件和带宽建议 (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870)中。作为粗略的指南，请准备 4 TB NVMe SSD、64 GB RAM（更小也可以，但这是推荐的余量）、可靠的现代多核 CPU，以及大约 50 Mbps 下载 / 25 Mbps 上传的互联网连接。

由于弗萨卡升级引入了 PeerDAS，质押节点只需要存储和下载网络斑点数据的一小部分，从而显著降低了在家质押者的磁盘和带宽要求。
</ExpandableCard>

<ExpandableCard title="安全的密钥管理" eventCategory="SoloStaking" eventName="clicked secure key management">
就像私钥保护你的以太坊地址一样，你需要专门为你的验证者生成密钥。你必须了解如何确保任何助记词或私钥的安全。{' '}

[以太坊安全与防骗](/security/)
</ExpandableCard>

<ExpandableCard title="维护" eventCategory="SoloStaking" eventName="clicked maintenance">
硬件偶尔会发生故障，网络连接会出错，客户端软件偶尔也需要升级。节点维护是不可避免的，偶尔需要你的关注。你需要确保自己随时了解任何预期的网络升级或其他关键的客户端升级。
</ExpandableCard>

<ExpandableCard title="可靠的正常运行时间" eventCategory="SoloStaking" eventName="clicked reliable uptime">
你的奖励与你的验证者在线并正确进行证明的时间成正比。停机时间会招致惩罚，惩罚力度与同时离线的其他验证者数量成正比，但[不会导致罚没](#faq)。带宽也很重要，因为未及时收到的证明会减少奖励。要求会有所不同，但当前的[硬件和带宽建议 (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870)建议大约 50 Mbps 下载和 25 Mbps 上传。
</ExpandableCard>

<ExpandableCard title="罚没风险" eventCategory="SoloStaking" eventName="clicked slashing risk">
与离线导致的怠工惩罚不同，<em>罚没</em>是一种严重得多的惩罚，专门针对恶意违规行为。通过运行少数派客户端并确保你的密钥一次只加载在一台机器上，你被罚没的风险将降至最低。话虽如此，所有质押者都必须意识到罚没的风险。

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> 更多关于罚没和验证者生命周期的信息</a>
</ExpandableCard>

## 质押选项比较 {#comparison-of-staking-options}

<StakingComparison page="solo" />

## 工作原理 {#how-it-works}

<StakingHowSoloWorks />

一旦你的节点同步完成并生成了密钥，你就可以存入质押存款以激活你的验证者。单个验证者至少需要 32 个 ETH，最多可持有 2048 个 ETH。网络大约在 13 分钟内识别存款，但新的验证者在开始证明之前需要通过一个激活队列；其长度随需求而变化。

在活跃期间，你将赚取 ETH 奖励。使用复利 (0x02) 提款凭证，奖励会自动添加到你的质押中；使用常规提款 (0x01) 凭证，超过初始 32 个 ETH 的奖励会定期自动转入你的提款地址。

如果需要，你可以作为验证者退出，这消除了在线的要求并停止任何进一步的奖励。你剩余的余额随后将被提取到你在设置期间指定的提款地址。退出可以使用你的验证者签名密钥发起，或者直接从你的提款地址通过执行层交易触发，因此对你资金的最终控制权始终掌握在你的提款地址手中。

### 复利与 2048 ETH 上限 {#compounding}

验证者拥有以下两种提款凭证之一：

- **常规提款 (0x01)**：验证者的有效余额上限为 32 个 ETH，任何超过该数额的余额每隔几天会自动转入你的提款地址。
- **复利 (0x02)**：验证者的有效余额最高可增长至 2048 个 ETH。奖励自动复利，并且你可以在超过 32 个 ETH 最低限额的每一个完整 ETH 上赚取奖励，因此你可以质押灵活的金额（例如 40 个 ETH），而不仅仅是 32 的倍数。只有超过 2048 个 ETH 的余额才会被自动转出；提取任何其他金额意味着从你的提款地址手动触发部分提款，这需要消耗 Gas。

如果你运行多个验证者，你可以将它们合并为一个单一的复利验证者，而无需退出并重新进入网络，从而减少你的维护开销。合并请求从你的提款地址发出，并受处理队列的限制。将验证者从 0x01 凭证切换到 0x02 凭证使用相同的机制，并且在没有完全退出并再次存款的情况下**无法撤销**。

[更多关于质押提款的信息](/staking/withdrawals/)

## 在质押启动板上开始 {#get-started-on-the-staking-launchpad}

质押启动板 (Staking Launchpad) 是一个开源应用程序，将帮助你成为一名质押者。它将引导你选择客户端、生成密钥并将你的 ETH 存入质押存款合约。它提供了一份清单，以确保你已涵盖所有内容，从而安全地设置你的验证者。

<StakingLaunchpadWidget />

## 节点和客户端设置工具的注意事项 {#node-tool-considerations}

帮助你在家质押 ETH 的工具和服务越来越多，但每种工具和服务都伴随着不同的风险和收益。

下面使用属性指标来标明列出的质押工具可能具有的显著优势或劣势。在选择哪些工具来帮助你的质押之旅时，请将本节作为我们如何定义这些属性的参考。

<StakingConsiderations page="solo" />

## 探索节点和客户端设置工具 {#node-and-client-tools}

有多种选项可帮助你进行设置。使用上述指标来帮助你了解以下工具。

<ProductDisclaimer />

### 节点工具 {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

请注意选择[少数派客户端](/developers/docs/nodes-and-clients/client-diversity/)的重要性，因为它提高了网络的安全性，并限制了你的风险。允许你设置少数派客户端的工具被标记为<em style={{ textTransform: "uppercase" }}>“多客户端”</em>。

### 密钥生成器 {#key-generators}

这些工具可以作为[质押存款 CLI](https://github.com/ethereum/staking-deposit-cli/)的替代方案，以帮助生成密钥。

<StakingProductsCardGrid category="keyGen" />

对我们遗漏的质押工具有什么建议吗？请查看我们的[产品上架政策](/contributing/adding-staking-products/)，看看它是否合适，并提交给我们进行审核。

## 探索在家质押指南 {#staking-guides}

<StakingGuides />

## 团队质押：具有容错能力的在家质押 {#squad-staking}

**分布式验证者技术 (DVT)** 允许单个验证者在机器集群上运行，而不是仅在一台机器上运行。验证者密钥使用分布式密钥生成技术被分成多个份额，并且集群的阈值（例如，4 个节点中的任意 3 个）必须共同签名；完整的密钥永远不会存在于任何单台机器上。如果一台机器发生故障、离线或配置错误，集群的其余部分将保持验证者继续进行证明。

对于在家质押者来说，这实现了“团队质押”：与朋友或其他社区成员组队共同运行验证者，消除了单人设置的单点故障，并降低了因单台机器行为不当而导致罚没的风险。Obol 和 SSV Network 都提供了生产级别的 DVT 实现，目前广泛应用于在家质押、质押即服务和质押池中。

[更多关于分布式验证者技术 (DVT) 的信息](/staking/dvt/)

## 为质押协议运行验证者 {#run-validators-for-a-staking-protocol}

如果你拥有运行节点的硬件和技能，但少于 32 个 ETH，一些质押协议会将你的验证者与其联合质押者的 ETH 进行匹配。你存入较少的保证金作为抵押品，并在你自己的机器上运行验证者；协议提供剩余的质押，你将赚取一部分奖励。

这是一种混合方法：你保留了操作自己硬件的责任（和满足感），但你的验证者在协议的智能合约、治理和性能规则下运行，这与直接质押你自己的 ETH 具有不同的信任假设。

在[联合质押页面](/staking/pools/)上了解有关这些协议如何工作的更多信息，包括它们的信任假设和代币机制。

## 使用节点的更多方式 {#more-ways-to-use-your-node}

你完全不需要质押就可以将节点操作技能付诸实践。任何人都可以[运行以太坊节点](/run-a-node/)而无需存入任何 ETH。你将获得链的自我验证视图、用于发送交易和与应用程序交互的私有端点，并且你为网络的健康和弹性做出了贡献。在激活验证者之前，运行节点也是积累经验的好方法，且没有任何 ETH 风险。

<StakingCommunityCallout className="my-16" />

## 常见问题 {#faq}

以下是一些关于质押的最常见问题，值得了解。

<ExpandableCard title="什么是验证者？">

<em>验证者</em>是存在于以太坊上并参与以太坊协议共识的虚拟实体。验证者由余额、公钥和其他属性表示。<em>验证者客户端</em>是代表验证者行事的软件，它持有并使用其私钥。单个验证者客户端可以持有许多密钥对，从而控制许多验证者。

</ExpandableCard>

<ExpandableCard title="我可以存入超过 32 ETH 吗？">
是的。具有_复利_ (0x02) 提款凭证的验证者可以持有高达 2048 个 ETH 的有效余额，而激活的最低要求仍为 32 个 ETH。复利验证者的奖励会自动添加到其质押中，并且它可以在超过 32 个 ETH 最低限额的每一个完整 ETH 上赚取奖励，因此你可以质押非 32 倍数的金额。请参阅[复利与 2048 ETH 上限](#compounding)。

具有_常规提款_ (0x01) 凭证的验证者的有效余额上限仍为 32 个 ETH，任何超过该数额的余额每隔几天会自动转入提款地址。

对于复利验证者，只有超过 2048 个 ETH 上限的余额才会被自动转出。要提取低于该数额的任何金额，你需要从你的提款地址触发部分提款（这笔交易需要消耗 Gas），这可以提取超过 32 个 ETH 最低限额的任何余额。如果你运行多个验证者，你也可以在不退出网络的情况下将它们合并为一个单一的复利验证者。

[更多关于质押提款的信息](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="如果我离线会被罚没吗？（简而言之：不会。）">
当网络正常最终确定时离线**不会**导致罚没。如果你的验证者在给定时段（每个时段长 6.4 分钟）内无法进行证明，则会产生少量的<em>怠工惩罚</em>，但这与<em>罚没</em>截然不同。这些惩罚略低于验证者在可进行证明时本应获得的奖励，并且损失可以通过大约相等时间的重新在线来赚回。

请注意，怠工惩罚与同时离线的验证者数量成正比。在网络的大部分同时离线的情况下，这些验证者中每一个受到的惩罚将大于单个验证者不可用时的惩罚。

在极端情况下，如果由于超过三分之一的验证者离线而导致网络停止最终确定，这些用户将遭受所谓的<em>二次方怠工泄漏</em>，即从离线验证者账户中呈指数级流失 ETH。这使得网络最终能够通过销毁不活跃验证者的 ETH 来完成自我修复，直到其余额达到 16 ETH，此时它们将被自动从验证者池中逐出。剩余的在线验证者最终将再次占网络的 2/3 以上，满足再次最终确定链所需的绝对多数。
</ExpandableCard>

<ExpandableCard title="我如何确保自己不被罚没？">
简而言之，这永远无法得到完全保证，但如果你出于善意行事，运行少数派客户端，并且一次只在一台机器上保留你的签名密钥，那么被罚没的风险几乎为零。

只有少数几种特定方式会导致验证者被罚没并被逐出网络。在撰写本文时，已发生的罚没完全是冗余硬件设置的产物，即签名密钥同时存储在两台独立的机器上。这可能会无意中导致你的密钥进行<em>双重投票</em>，这是一种可被罚没的违规行为。

运行绝对多数客户端（网络中超过 2/3 使用的任何客户端）也存在潜在的罚没风险，如果该客户端存在导致链分叉的错误。这可能导致错误的区块被最终确定。要纠正回预期的链，需要通过尝试撤销已最终确定的区块来提交<em>环绕投票</em>。这也是一种可被罚没的违规行为，只需运行少数派客户端即可避免。

<em>少数派客户端</em>中相同的错误永远不会最终确定，因此永远不会导致环绕投票，而只会导致怠工惩罚，<em>不会导致罚没</em>。

<ul>
  <li><a href="https://clientdiversity.org/">了解更多关于运行少数派客户端重要性的信息。</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">了解更多关于奖励、惩罚和罚没的信息</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="哪个客户端最好？">
各个客户端在性能和用户界面方面可能略有不同，因为它们是由不同的团队使用各种编程语言开发的。话虽如此，它们中没有一个是“最好的”。所有生产级别的客户端都是优秀的软件，它们都执行相同的核心功能来同步并与区块链进行交互。

由于所有生产级别的客户端都提供相同的基本功能，因此选择<strong>少数派客户端</strong>实际上非常重要，这意味着当前未被网络上大多数验证者使用的任何客户端。这听起来可能违反直觉，但运行多数或绝对多数客户端会使你在该客户端出现错误时面临更高的罚没风险。运行少数派客户端极大地限制了这些风险。

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">了解更多关于为什么客户端多样性至关重要的信息</a>
</ExpandableCard>

<ExpandableCard title="我可以直接使用 VPS（虚拟专用服务器）吗？">
尽管虚拟专用服务器 (VPS) 可以用作家庭硬件的替代品，但验证者客户端的物理访问和位置<em>确实很重要</em>。诸如 Amazon Web Services 或 Digital Ocean 等中心化云解决方案提供了无需获取和操作硬件的便利，但代价是使网络中心化。

在单一中心化云存储解决方案上运行的验证者客户端越多，对这些用户来说就越危险。任何导致这些提供商离线的事件，无论是由于攻击、监管要求，还是仅仅是断电/断网，都将导致依赖该服务器的每个验证者客户端同时离线。

离线惩罚与同时离线的其他验证者数量成正比。使用 VPS 会大大增加离线惩罚更严重的风险，并在中断范围足够大时增加你遭受二次方泄漏或罚没的风险。为了将你自己的风险以及对网络的风险降至最低，强烈建议用户获取并操作自己的硬件。
</ExpandableCard>

<ExpandableCard title="我如何解锁我的奖励或取回我的 ETH？">

每次提款都要求你的验证者设置了提款地址。新的质押者在生成密钥和存款时设置此地址。尚未设置提款地址的网络早期质押者需要在提款前更新其提款凭证。

对于具有常规提款 (0x01) 凭证的验证者，奖励支付（超过初始 32 个的累积 ETH）会定期自动分配到提款地址。对于复利 (0x02) 验证者，奖励保持质押状态并自动复利。你可以通过从你的提款地址触发部分提款来提取超过 32 个 ETH 的任何余额。

要解锁并收回你的全部余额，你必须退出你的验证者。你可以使用你的验证者签名密钥执行此操作，或者直接从你的提款地址通过执行层交易触发，这意味着即使你的签名密钥丢失，你的资金仍然可以恢复。

<ButtonLink href="/staking/withdrawals/">更多关于质押提款的信息</ButtonLink>
</ButtonLink>

## 进一步阅读 {#further-reading}

- [客户端多样性统计数据和迁移指南](https://clientdiversity.org/)
- [帮助实现客户端多样性](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [以太坊共识层上的客户端多样性](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [操作指南：选购以太坊验证者硬件](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870：硬件和带宽建议](https://eips.ethereum.org/EIPS/eip-7870)
- [佩克特拉升级：最大有效余额及更多](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />