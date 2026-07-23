---
title: 以太坊治理简介
metaTitle: 以太坊治理
description: 介绍以太坊是如何做出决策的。
lang: zh
---

_如果没有人拥有[以太坊](/)，那么关于以太坊过去和未来变更的决策是如何做出的呢？以太坊治理就是指允许做出这些决策的过程。_

<Divider />

## 什么是治理？ {#what-is-governance}

治理是允许做出决策的既定系统。在典型的组织结构中，执行团队或董事会可能在决策中拥有最终决定权。或者，也许股东通过对提案进行投票来实施变更。在政治体系中，民选官员可以制定试图代表其选民意愿的立法。

## 去中心化治理 {#decentralized-governance}

没有任何一个人拥有或控制以太坊协议，但仍然需要就实施变更做出决策，以最好地确保网络的寿命和繁荣。这种所有权的缺失使得传统的组织治理成为一种不兼容的解决方案。

## 以太坊治理 {#ethereum-governance}

以太坊治理是进行协议变更的过程。需要指出的是，这个过程与人们和应用程序如何使用协议无关——以太坊是无需许可的。世界上任何地方的任何人都可以参与链上活动。没有规定谁可以或不可以构建应用程序或发送交易。然而，有一个提出核心协议变更的流程，而去中心化应用 (dapp) 正是运行在核心协议之上的。由于有如此多的人依赖以太坊的稳定性，核心变更（包括社会和技术流程）的协调门槛非常高，以确保对以太坊的任何变更都是安全的，并得到社区的广泛支持。

<VideoWatch slug="ethereum-core-governance-explained" />

### 链上治理与链下治理 {#onchain-vs-offchain}

区块链技术带来了新的治理能力，被称为链上治理。链上治理是指提议的协议变更由利益相关者（通常是治理代币的持有者）投票决定，并且投票在区块链上进行。在某些形式的链上治理中，提议的协议变更已经写入代码中，如果利益相关者通过签名交易授权这些变更，它们就会自动实施。

相反的方法是链下治理，即任何协议变更决策都是通过非正式的社会讨论过程做出的，如果获得批准，将在代码中实施。

**以太坊治理在链下进行**，有各种各样的利益相关者参与到这个过程中。

_虽然在协议层面以太坊治理是链下的，但构建在以太坊之上的许多用例（例如 DAO）使用的是链上治理。_

<ButtonLink href="/dao/">
  了解更多关于 DAO 的信息
</ButtonLink>

<Divider />

## 谁参与其中？ {#who-is-involved}

[以太坊社区](/community/)中有各种利益相关者，每个人都在治理过程中发挥着作用。从距离协议最远的利益相关者开始，逐步深入，我们有：

- **以太币持有者**：这些人持有任意数量的 ETH。[了解更多关于 ETH 的信息](/what-is-ether/)。
- **应用程序用户**：这些人在以太坊区块链上与应用程序进行交互。
- **应用程序/工具开发者**：这些人编写运行在以太坊区块链上的应用程序（例如去中心化金融 (DeFi)、NFT 等），或构建与以太坊交互的工具（例如钱包、测试套件等）。[了解更多关于 dapp 的信息](/apps/)。
- **节点运营商**：这些人运行传播区块和交易的节点，拒绝他们遇到的任何无效交易或区块。[了解更多关于节点的信息](/developers/docs/nodes-and-clients/)。
- **EIP 作者**：这些人以以太坊改进提案 (EIP) 的形式提出对以太坊协议的变更。[了解更多关于 EIP 的信息](/eips/)。
- **验证者**：这些人运行可以将新区块添加到以太坊区块链的节点。
- **协议开发者**（又名“核心开发者”）：这些人维护各种以太坊实现（例如，执行层的 go-ethereum、奈瑟曼德 (Nethermind)、贝苏 (Besu)、埃里贡 (Erigon)、瑞斯 (Reth)，或共识层的普莱斯姆 (Prysm)、莱特豪斯 (Lighthouse)、尼姆巴斯 (Nimbus)、泰库 (Teku)、洛德斯塔 (Lodestar)、Grandine）。[了解更多关于以太坊客户端的信息](/developers/docs/nodes-and-clients/)。

_注意：任何个人都可以同时属于这些群体中的多个（例如，协议开发者可以倡导 EIP，运行信标链验证者，并使用 DeFi 应用程序）。不过，为了概念上的清晰，最好将它们区分开来。_

<Divider />

## 什么是 EIP？ {#what-is-an-eip}

以太坊治理中使用的一个重要流程是提出**以太坊改进提案 (EIP)**。EIP 是为以太坊指定潜在新功能或流程的标准。以太坊社区内的任何人都可以创建 EIP。如果你有兴趣编写 EIP 或参与同行评审和/或治理，请参阅：

<ButtonLink href="/eips/">
  了解更多关于 EIP 的信息
</ButtonLink>

<Divider />

## 正式流程 {#formal-process}

引入以太坊协议变更的正式流程如下：

1. **提出核心 EIP**：如 [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips) 中所述，正式提出以太坊变更的第一步是在核心 EIP 中详细说明。这将作为 EIP 的官方规范，如果被接受，协议开发者将实施该规范。

2. **向协议开发者展示你的 EIP**：一旦你拥有了一个收集了社区意见的核心 EIP，你就应该将其展示给协议开发者。你可以通过在 [AllCoreDevs 电话会议](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status)上提议讨论来做到这一点。很可能一些讨论已经在 [Ethereum Magicians 论坛](https://ethereum-magicians.org/)或 [Ethereum R&D Discord](https://discord.gg/mncqtgVSVw) 上异步进行了。

> 这个阶段的潜在结果是：

> - 该 EIP 将被考虑用于未来的网络升级
> - 将被要求进行技术修改
> - 如果它不是优先事项，或者相对于开发工作量而言改进不够大，它可能会被拒绝

3. **迭代以形成最终提案：** 在收到所有相关利益相关者的反馈后，你可能需要对初始提案进行修改，以提高其安全性或更好地满足各种用户的需求。一旦你的 EIP 包含了你认为必要的所有更改，你需要再次将其展示给协议开发者。然后，你将进入此流程的下一步，或者会出现新的问题，需要对你的提案进行新一轮的迭代。

4. **EIP 包含在网络升级中**：假设 EIP 获得批准、测试和实施，它将被安排作为网络升级的一部分。鉴于网络升级的协调成本很高（每个人都需要同时升级），EIP 通常会捆绑在一起进行升级。

5. **网络升级激活**：网络升级激活后，EIP 将在以太坊网络上生效。_注意：网络升级通常在测试网上激活，然后再在以太坊主网上激活。_

这个流程虽然非常简化，但概述了在以太坊上激活协议变更的重要阶段。现在，让我们看看在这个过程中起作用的非正式因素。

## 非正式流程 {#informal-process}

### 了解先前的工作 {#prior-work}

EIP 倡导者在创建一个可以被认真考虑部署在以太坊主网上的 EIP 之前，应该熟悉先前的工作和提案。这样，EIP 有望带来一些以前没有被拒绝过的新东西。研究此内容的三个主要地方是 [EIP 存储库](https://github.com/ethereum/EIPs)、[Ethereum Magicians](https://ethereum-magicians.org/) 和 [ethresear.ch](https://ethresear.ch/)。

### 工作组 {#working-groups}

EIP 的初稿如果不经过编辑或修改，是不太可能在以太坊主网上实施的。通常，EIP 倡导者将与一部分协议开发者合作，以规范、实施、测试、迭代并最终确定他们的提案。从历史上看，这些工作组需要几个月（有时甚至几年！）的工作。同样，此类变更的 EIP 倡导者应尽早让相关的应用程序/工具开发者参与进来，以收集最终用户的反馈并降低任何部署风险。

### 社区共识 {#community-consensus}

虽然有些 EIP 是直接的技术改进，细微差别很小，但有些则更为复杂，并伴随着权衡，这将以不同的方式影响不同的利益相关者。这意味着某些 EIP 在社区内比其他 EIP 更具争议性。

关于如何处理有争议的提案，没有明确的剧本。这是以太坊去中心化设计的结果，即没有任何一个利益相关者群体可以通过强力胁迫另一个群体：协议开发者可以选择不实施代码更改；节点运营商可以选择不运行最新的以太坊客户端；应用程序团队和用户可以选择不在链上进行交易。由于协议开发者无法强迫人们采用网络升级，因此他们通常会避免实施那些争议性大于对更广泛社区利益的 EIP。

EIP 倡导者应征求所有相关利益相关者的反馈。如果你发现自己是一个有争议的 EIP 的倡导者，你应该尝试解决反对意见，以围绕你的 EIP 建立共识。鉴于以太坊社区的规模和多样性，没有单一的指标（例如，代币投票）可以用来衡量社区共识，EIP 倡导者需要适应其提案的具体情况。

除了以太坊网络的安全性之外，协议开发者历来非常重视应用程序/工具开发者和应用程序用户所看重的东西，因为他们在以太坊上的使用和开发正是使生态系统对其他利益相关者具有吸引力的原因。此外，EIP 需要在所有客户端实现中实施，而这些实现由不同的团队管理。这个过程的一部分通常意味着要说服多个协议开发者团队，让他们相信特定的变更是有价值的，并且它有助于最终用户或解决安全问题。

<Divider />

## 处理分歧 {#disagreements}

拥有许多动机和信念各不相同的利益相关者意味着分歧并不罕见。

通常，分歧会在公共论坛上通过长篇讨论来处理，以了解问题的根源并允许任何人发表意见。通常，一个群体会做出让步，或者达成一个折中的方案。如果一个群体的态度足够强硬，强行通过特定的变更可能会导致链分裂。链分裂是指一些利益相关者抗议实施协议变更，导致运行不同且不兼容的协议版本，从而产生两条截然不同的区块链。

### DAO 分叉 {#dao-fork}

分叉是指需要对网络进行重大技术升级或变更，并改变协议的“规则”。[以太坊客户端](/developers/docs/nodes-and-clients/)必须更新其软件以实施新的分叉规则。

DAO 分叉是对 [2016 年 DAO 攻击](https://www.coindesk.com/learn/understanding-the-dao-attack)的回应，在这次黑客攻击中，一个不安全的 [DAO](/glossary/#dao) 合约被抽走了超过 360 万个 ETH。分叉将资金从有缺陷的合约转移到一个新合约中，允许任何在黑客攻击中损失资金的人收回资金。

这一行动方案由以太坊社区投票表决。任何 ETH 持有者都可以通过在[投票平台](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)上发送交易来进行投票。分叉的决定获得了超过 85% 的选票。

需要注意的是，虽然协议确实进行了分叉以回退黑客攻击，但投票在决定分叉中所占的权重是有争议的，原因如下：

- 投票率极低
- 大多数人不知道正在进行投票
- 投票仅代表 ETH 持有者，不代表系统中的任何其他参与者

社区中的一部分人拒绝分叉，主要是因为他们认为 DAO 事件不是协议的缺陷。他们继续组建了[以太坊经典](https://ethereumclassic.org/)。

如今，以太坊社区在出现合约错误或资金丢失的情况下采取了不干预政策，以维持系统可靠的中立性。

观看更多关于 DAO 黑客攻击的内容：

<VideoWatch slug="dao-hack-ethereum-classic" />

<Divider />

### 分叉的效用 {#forking-utility}

以太坊/以太坊经典分叉是健康分叉的一个绝佳例子。我们有两个群体在一些核心价值观上存在强烈分歧，以至于他们认为值得冒着风险去追求他们各自的行动方案。

在面临重大的政治、哲学或经济分歧时进行分叉的能力，在以太坊治理的成功中发挥了很大作用。如果没有分叉的能力，替代方案将是持续的内斗，迫使那些最终形成以太坊经典的人勉强参与，以及对以太坊成功愿景的日益分歧。

<Divider />

## 信标链治理 {#beacon-chain}

以太坊治理过程通常以牺牲速度和效率为代价来换取开放性和包容性。为了加速信标链的开发，它与工作量证明 (PoW) 以太坊网络分开启动，并遵循其自身的治理实践。

虽然规范和开发实现始终是完全开源的，但并没有使用上述用于提出更新的正式流程。这使得研究人员和实施者能够更快地指定并商定变更。

当信标链于 2022 年 9 月 15 日与以太坊执行层合并时，合并作为 [Paris 网络升级](/ethereum-forks/#paris)的一部分宣告完成。提案 [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) 从“最后征求意见 (Last Call)”更改为“最终 (Final)”，完成了向权益证明 (PoS) 的过渡。

<ButtonLink href="/roadmap/merge/">
  了解更多关于合并的信息
</ButtonLink>

<Divider />

## 我该如何参与？ {#get-involved}

- [提出 EIP](/eips/#participate)
- [讨论当前提案](https://ethereum-magicians.org/)
- [参与研发讨论](https://ethresear.ch/)
- [加入 Ethereum R&D Discord](https://discord.gg/mncqtgVSVw)
- [运行节点](/developers/docs/nodes-and-clients/run-a-node/)
- [为客户端开发做贡献](/developers/docs/nodes-and-clients/#execution-clients)
- [核心开发者学徒计划](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort)

## 延伸阅读 {#further-reading}

以太坊中的治理并没有严格的定义。各种社区参与者对此有不同的看法。以下是其中一些：

- [关于区块链治理的笔记](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [以太坊治理是如何运作的？](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [以太坊治理的运作方式](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [什么是以太坊核心开发者？](https://hudsonjameson.com/posts/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [治理，第 2 部分：财阀统治依然糟糕](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [超越代币投票治理](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [了解区块链治理](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [以太坊政府](https://www.galaxy.com/insights/research/ethereum-governance/) - _Christine Kim_