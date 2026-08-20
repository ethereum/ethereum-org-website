---
title: 以太坊研究的活跃领域
description: 探索开放研究的不同领域，并了解如何参与其中。
lang: zh
---

以太坊的主要优势之一是，一个活跃的研究和工程社区在不断地对其进行改进。全世界许多热情、技术娴熟的人都希望致力于解决以太坊中悬而未决的问题，但要弄清楚这些问题是什么并不总是那么容易。本页面概述了关键的活跃研究领域，作为了解以太坊前沿技术的粗略指南。

## 以太坊研究如何运作 {#how-ethereum-research-works}

以太坊研究是公开透明的。其文化是使研究工具和成果尽可能开放和具有交互性，例如通过可执行的笔记本。以太坊研究进展迅速，新发现会在 [ethresear.ch](https://ethresear.ch/) 等论坛上公开首发并进行讨论，而不是在经过多轮同行评审后通过传统出版物传达给社区。以太坊基金会也会公布其优先事项及原因，因此任何人都可以看到当前哪些问题被认为是紧迫的。

## 通用研究资源 {#general-research-resources}

无论具体主题是什么，都可以在 [ethresear.ch](https://ethresear.ch) 和 [Eth R&D Discord 频道](https://discord.gg/qGpsxSA)找到大量关于以太坊研究的信息。这些是以太坊研究人员讨论最新想法和开发机会的主要场所。

要了解协议的发展方向，请从[以太坊路线图](/roadmap/)开始，然后阅读以太坊基金会的 [2026 年协议优先事项更新](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)以及报告相关进展的[协议集群更新](https://blog.ethereum.org/2026/05/11/protocol-update-may-26)。对于想要致力于协议本身的人来说，[以太坊协议研究 (Ethereum Protocol Studies)](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26) 是一个结构化的切入点。

## 资金来源 {#sources-of-funding}

你可以参与以太坊研究并获得报酬。[以太坊基金会](/foundation/)通过其[生态系统支持计划 (Ecosystem Support Program)](https://esp.ethereum.foundation/applicants)资助研究和公共物品，该计划会发布愿望清单项目和提案请求，描述其希望看到解决的问题。你可以在[以太坊资助页面](/community/grants/)上找到有关活跃和即将到来的资助机会的信息。

## 协议研究 {#protocol-research}

协议研究关注以太坊的基础层：定义节点如何连接、通信、交换和存储以太坊数据，并就区块链的状态达成共识的一组规则。其两个长期存在的类别是共识和执行，现在有几个研究主题跨越了这两个类别。

### 共识 {#consensus}

共识研究关注[以太坊的权益证明 (PoS) 机制](/developers/docs/consensus-mechanisms/pos/)：分叉选择规则和最终性小工具的安全性、质押的密码经济学、承载区块、证明和斑点数据的点对点网络，以及验证者签名所使用的密码学。一些共识研究主题的例子包括：

- 识别和修补漏洞；
- 量化密码经济学安全性；
- 减少区块达到最终性所需的时间；
- 以及提高共识客户端之间点对点网络的效率、安全性和监控。

这项工作的大部分已经从论文转向了规范。数据可用性采样 (DAS) 已在 [弗萨卡 (Fusaka)](/roadmap/fusaka/) 升级中发布，关于区块构建方式和如何保证交易被包含的更改已在即将到来的升级中指定，而被称为精简共识 (lean consensus) 的更长远重新设计正在探索更快的最终性以及抗量子签名。

#### 背景阅读 {#background-reading}

- [权益证明 (PoS) 简介](/developers/docs/consensus-mechanisms/pos/)
- [单槽最终性](/roadmap/single-slot-finality/)
- [Casper FFG 论文](https://arxiv.org/abs/1710.09437)
- [Gasper 论文](https://arxiv.org/abs/2003.03052)
- [精简以太坊 (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### 近期研究 {#recent-research}

- [Ethresear.ch 共识](https://ethresear.ch/c/consensus/29)
- [可用性/最终性困境](https://arxiv.org/abs/2009.04987)
- [3 槽最终性：SSF 并非关于“单”槽](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### 执行 {#execution}

执行层关注执行交易、运行[以太坊虚拟机 (EVM)](/developers/docs/evm/)以及生成执行负载以传递给共识层。这里的研分为两条主线：使状态的持有和证明变得廉价，以及在不增加运行节点的人的成本的情况下提高吞吐量。有许多活跃的研究领域，包括：

- 重新定价创建状态的操作的 Gas 成本；
- 过期节点不再需要提供的历史数据；
- 允许并行验证交易的区块级访问列表；
- 分别对状态、数据和计算进行定价的多维费用市场；
- 以及使用 zkEVM 证明一层网络 (l1) 区块的执行。

#### 背景阅读 {#background-reading-1}

- [EVM 简介](/developers/docs/evm/)
- [Ethresear.ch 执行层](https://ethresear.ch/c/execution-layer-research/37)
- [以太坊执行层规范](https://github.com/ethereum/execution-specs)
- [数据库优化](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### 近期研究 {#recent-research-1}

- [EIP-7928：区块级访问列表](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037：状态创建 Gas 成本增加](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999：统一的多维费用市场](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642：eth/69、历史数据过期和更简单的收据](https://eips.ethereum.org/EIPS/eip-7642)
- [发布一层网络 (l1) zkEVM：实时证明](https://blog.ethereum.org/2025/07/10/realtime-proving)

### 抗审查性与区块构建 {#censorship-resistance-and-block-building}

目前，大多数以太坊区块由少数专门的构建者组装，这集中了决定包含哪些交易的权力。该领域的研究涵盖了将构建者市场引入协议本身，以便提议和构建区块的角色由共识规则而不是协议外软件分离（即提议者-构建者分离 (PBS)），并为验证者提供一种方法来强制包含构建者遗漏的交易。

#### 背景阅读 {#background-reading-21}

- [提议者-构建者分离 (PBS)](/roadmap/pbs/)
- [单一秘密领导者选举 (SSLE)](/roadmap/secret-leader-election/)

#### 近期研究 {#recent-research-21}

- [EIP-7732：协议内置的提议者-构建者分离](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805：分叉选择强制包含列表](https://eips.ethereum.org/EIPS/eip-7805)
- [在提议者/构建者分离下提高交易的抗审查性](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### 状态增长与无状态 {#state-growth-and-statelessness}

每个全节点都存储以太坊的状态，因此该状态增长的速度设定了运行全节点的成本底线。在短期内，研究重点是重新定价创建状态的操作，以及过期节点不再需要保留的历史数据。从长远来看，计划是用产生更小证明的二叉树替换以太坊的十六进制 Merkle-Patricia 树，并向无状态迈进，以便节点可以在不持有整个状态的情况下验证区块。该领域早期的工作假设使用沃克尔树 (Verkle trees)；目前的提案是统一的二叉树，它延续了为早期工作线指定的见证数据 Gas 计划。

#### 背景阅读 {#background-reading-22}

- [无状态与状态过期](/roadmap/statelessness/)
- [以太坊无状态手册](https://stateless.fyi/)

#### 近期研究 {#recent-research-22}

- [EIP-7864：使用统一二叉树的以太坊状态](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762：无状态 Gas 成本变更](https://eips.ethereum.org/EIPS/eip-4762)
- [为什么去中心化状态对以太坊很重要](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### 抗量子密码学 {#post-quantum-cryptography}

以太坊的验证者签名及其大部分应用层依赖于椭圆曲线密码学，而一台能力足够强的量子计算机将能够破解它。使以太坊具备抗量子能力意味着用基于哈希或基于格的替代方案替换这些签名，保持签名聚合对于大型验证者集足够高效，并为现有账户提供迁移路径。以太坊基金会运营着一个专门的抗量子团队，这是路线图上最长远的项目之一。

#### 背景阅读 {#background-reading-23}

- [抗量子性](/roadmap/security/quantum-resistance/)
- [抗量子以太坊](https://pq.ethereum.org/)

#### 近期研究 {#recent-research-23}

- [精简以太坊 (lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Ethresear.ch 密码学](https://ethresear.ch/c/cryptography/28)
- [精简以太坊实现](https://github.com/leanEthereum)

## 客户端开发 {#client-development}

以太坊客户端是以太坊协议的实现。客户端开发通过将协议研究的成果构建到这些客户端中，使其成为现实。客户端开发包括更新客户端规范以及构建特定的实现。

一个以太坊节点需要运行两款软件：

1. 一个共识客户端，用于跟踪区块链的头部、广播区块并处理共识逻辑
2. 一个执行客户端，用于支持以太坊虚拟机并执行交易和智能合约

除了这两种客户端之外，还在对新型客户端进行原型设计，包括证明一层网络 (l1) 区块执行的客户端，以及围绕抗量子签名构建的精简共识客户端。

有关节点和客户端的更多详细信息以及所有当前客户端实现的列表，请参阅[节点和客户端页面](/developers/docs/nodes-and-clients/)。你还可以在[历史页面](/ethereum-forks/)上找到所有以太坊升级的历史记录。

### 执行客户端 {#execution-clients}

- [执行客户端规范](https://github.com/ethereum/execution-specs)
- [执行 API 规范](https://github.com/ethereum/execution-apis)

### 共识客户端 {#consensus-clients}

- [共识客户端规范](https://github.com/ethereum/consensus-specs)
- [信标 API 规范](https://ethereum.github.io/beacon-APIs/)

### zkEVM 客户端 {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [发布一层网络 (l1) zkEVM：安全基础](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## 扩容与性能 {#scaling-and-performance}

扩容以太坊是以太坊研究人员关注的一个重要领域，它同时在两条轨道上运行：提高一层网络 (l1) 本身的吞吐量，以及将执行转移到将其数据发布到以太坊的汇总 (rollups) 上。目前的工作包括增加区块 gas 上限、重新定价状态增长、扩展汇总数据的斑点容量，以及减少节点必须存储和验证的内容。有关扩容以太坊的介绍性信息，请参阅我们的[扩容页面](/developers/docs/scaling/)和[扩容路线图](/roadmap/scaling/)。

### 二层网络 (l2) {#layer-2}

现在有几个二层网络 (l2) 协议使用不同的技术来批量处理交易并在以太坊一层网络 (l1) 上保护它们，从而扩展以太坊。开放研究包括降低证明的延迟和成本，缩短交易达到无须信任的最终性所需的时间，以及为用户提供跨多个汇总的单一连贯体验。

#### 背景阅读 {#background-reading-2}

- [二层网络 (l2) 简介](/layer-2/)
- [L2BEAT：扩容总结](https://l2beat.com/scaling/summary)
- [以 Rollup 为中心的以太坊路线图](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### 近期研究 {#recent-research-2}

- [Ethresear.ch 二层网络 (l2)](https://ethresear.ch/c/layer-2/32)
- [L2BEAT：链上成本](https://l2beat.com/scaling/costs)
- [2026 年在以太坊上构建：发生了什么变化](/latest/building-on-ethereum-in-2026/)

### 互操作性 {#interoperability}

用户和资产分布在以太坊一层网络 (l1) 和许多二层网络 (l2) 中，研究问题是让他们在不信任中介的情况下跨这些链移动和行动。这里的工作涵盖基于意图的转账、标准化的跨链寻址和命名、通用消息传递以及钱包级别的链抽象。这取代了托管桥持有资产的模式，而桥在历史上一直是生态系统中最大的损失来源之一，因此任何跨链机制的安全性仍然是核心关注点。

#### 背景阅读 {#background-reading-3}

- [区块链桥简介](/bridges/)
- [让以太坊再次感觉像是一条链](https://blog.ethereum.org/2025/11/18/eil)
- [开放意图框架 (Open Intents Framework)](https://openintents.xyz/)
- [验证桥](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### 近期研究 {#recent-research-3}

- [ERC-7683：跨链意图](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930：可互操作地址](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828：可互操作名称](https://eips.ethereum.org/EIPS/eip-7828)

### 数据可用性与斑点扩容 {#data-availability-and-blob-scaling}

汇总 (Rollups) 将其数据以斑点的形式发布到以太坊，而扩展该数据层本身就是一个独立于扩展执行的研究问题。以太坊现在使用数据可用性采样 (DAS)，因此验证者可以通过对部分数据进行采样而不是下载全部数据来验证斑点数据是否已发布，并且斑点容量通过专用的仅限斑点参数的分叉逐步提高。悬而未决的问题包括采样可以推进到什么程度，如何使在家质押的人的带宽需求保持在可控范围内，以及斑点定价应如何响应需求。

#### 背景阅读 {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [弗萨卡 (Fusaka) 升级](/roadmap/fusaka/)
- [丹克分片 (Danksharding)](/roadmap/danksharding/)
- [数据可用性](/developers/docs/data-availability/)
- [EIP-4844：分片斑点交易](https://eips.ethereum.org/EIPS/eip-4844)
- [Proto-Danksharding 笔记](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### 近期研究 {#recent-research-4}

- [EIP-7594：PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892：仅限斑点参数的硬分叉](https://eips.ethereum.org/EIPS/eip-7892)
- [Ethresear.ch 分片](https://ethresear.ch/c/sharding/6)

### 硬件 {#hardware}

在普通硬件上[运行节点](/developers/docs/nodes-and-clients/run-a-node/)是保持以太坊去中心化的基础，因此吞吐量的每一次增加都必须与节点运营商的成本进行权衡。随着区块 gas 上限的提高以及计划中的进一步增加，活跃的研究涵盖了状态增长及其定价方式、更大状态下的同步和数据库性能、历史数据过期带来的磁盘节省，以及最终的无状态。

#### 背景阅读 {#background-reading-5}

- [启动你自己的以太坊节点](/developers/docs/nodes-and-clients/run-a-node/)
- [无状态与状态过期](/roadmap/statelessness/)
- [ARM 上的以太坊](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### 近期研究 {#recent-research-5}

- [扩容以太坊：通往更高 gas 上限及更远目标的道路](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261：Gas 上限计划](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037：状态创建 Gas 成本增加](https://eips.ethereum.org/EIPS/eip-8037)

## 安全性 {#security}

安全性是一个广泛的主题，可能包括垃圾信息和诈骗预防、钱包安全、硬件安全、密码经济学安全、抗审查性、抗量子准备、漏洞搜寻，以及应用程序和客户端软件的测试和验证。以太坊的[安全路线图](/roadmap/security/)涵盖了协议级别的工作。

### 密码学与零知识证明 (ZKP) {#cryptography--zkp}

零知识证明 (ZKP) 和密码学对于在以太坊及其应用程序中构建隐私和安全性至关重要。零知识证明已经从研究走向生产基础设施：证明真实以太坊区块的证明者现在在延迟、成本和可靠性方面进行公开基准测试。悬而未决的问题也相应地发生了转变，转向足够快地证明一层网络 (l1) 区块以实现实时证明，严格说明所使用的证明系统的安全性，并为抗量子密码学做准备。

#### 背景阅读 {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [隐私](/roadmap/privacy/)
- [零知识播客](https://zeroknowledge.fm/)

#### 近期研究 {#recent-research-6}

- [Ethresear.ch 零知识 (ZK)](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Ethresear.ch 密码学](https://ethresear.ch/c/cryptography/28)
- [基于哈希的 zkEVM 证明系统的可靠性计算器](https://github.com/ethereum/soundcalc)
- [发布一层网络 (l1) zkEVM：安全基础](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### 钱包 {#wallets}

以太坊钱包可以是浏览器扩展、桌面和移动应用程序，或者是以太坊上的智能合约。账户抽象不再是实验性的：ERC-4337 在不更改协议的情况下提供智能账户，而 EIP-7702 允许普通账户设置代码，以便交易批量处理、Gas 赞助和社交恢复可以与用户已有的地址一起使用。现在的开放研究集中在协议本身的本地账户抽象、模块化和可审计的账户架构，以及普通人可以安全操作的密钥管理和恢复上。

#### 背景阅读 {#background-reading-7}

- [钱包简介](/wallets/)
- [钱包安全简介](/security/)
- [账户抽象](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Ethresear.ch 安全性](https://ethresear.ch/c/security/25)

#### 近期研究 {#recent-research-7}

- [EIP-8141：框架交易](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792：钱包调用 API](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963：多注入提供者发现](https://eips.ethereum.org/EIPS/eip-6963)
- [专注于验证的智能合约钱包](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## 社区、教育与推广 {#community-education-and-outreach}

将新用户引导至以太坊需要新的教育资源和推广方法。这可能包括博客文章和文章、书籍、播客、模因 (memes)、教学资源、活动以及任何其他建立社区、欢迎新手并向人们普及以太坊知识的内容。

### 设计与用户体验 (UX) {#design-and-ux}

为了将更多人引导至以太坊，生态系统必须改善其设计和用户体验。这需要设计师和产品专家重新审视钱包和应用程序的工作方式，并且越来越意味着要针对已经存在的标准进行设计：批量钱包调用、Gas 赞助、可恢复的账户以及带有其所属链信息的人类可读地址。相对而言，Web3 用户体验研究的权威场所较少，因此已发表的研究和设计指南往往比较分散。

#### 背景阅读 {#background-reading-8}

- [Web3 中的设计与用户体验](/developers/docs/design-and-ux/)
- [以太坊用户体验路线图](/roadmap/user-experience/)
- [Web3 设计手册](https://learnweb3.design/)
- [Web3 用户体验设计手册](https://web3ux.design/)

#### 近期研究 {#recent-research-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792：钱包调用 API](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828：可互操作名称](https://eips.ethereum.org/EIPS/eip-7828)

### 经济学 {#economics}

以太坊的经济学研究大致遵循两种方法：验证依赖经济激励的机制的安全性（“微观经济学”），以及分析协议、应用程序和用户之间的价值流动（“宏观经济学”）。存在与以太坊原生资产（以太币）及其之上构建的代币（例如 NFT 和 ERC-20 代币）相关的复杂密码经济学因素。

#### 背景阅读 {#background-reading-9}

- [稳健激励小组 (Robust Incentives Group)](https://rig.ethereum.org/)
- [以太坊经济学大师班与经济模型](https://github.com/CADLabs/ethereum-economic-model)

#### 近期研究 {#recent-research-9}

- [Ethresear.ch 经济学](https://ethresear.ch/c/economics/16)
- [流通供应均衡](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [量化 MEV：黑暗森林有多黑？](https://arxiv.org/abs/2101.05511)

### 区块空间与费用市场 {#blockspace-fee-markets}

区块空间市场管理最终用户交易的包含，无论是在以太坊（一层网络 (l1)）上直接进行，还是在桥接网络（例如汇总（二层网络 (l2)））上进行。在以太坊上，交易被提交到作为 EIP-1559 部署在协议内的费用市场，从而保护链免受垃圾信息的侵害并对拥堵进行定价。在这两层网络上，交易都可能产生外部性，即最大可提取价值 (MEV)，这会引发新的市场结构来捕获或管理这些外部性。目前的工作将其扩展到同时对多种资源进行定价，因为状态、数据和计算是独立拥堵的，并改变由谁组装区块以及在什么条件下组装。

#### 背景阅读 {#background-reading-10}

- [以太坊区块链的交易费机制设计：EIP-1559 的经济学分析 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559 模拟 (稳健激励小组)](https://ethereum.github.io/abm1559)
- [基于第一性原理的 Rollup 经济学](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [闪电男孩 2.0：去中心化交易所中的抢跑、交易重排序和共识不稳定性](https://arxiv.org/abs/1904.05234)

#### 近期研究 {#recent-research-10}

- [EIP-7999：统一的多维费用市场](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928：区块级访问列表](https://eips.ethereum.org/EIPS/eip-7928)
- [跨域 MEV](https://arxiv.org/abs/2112.01472)

### 权益证明 (PoS) 激励 {#proof-of-stake-incentives}

验证者使用以太坊的原生资产（以太币）作为抵押品，以防止不诚实行为。这种密码经济学决定了网络的安全性。复杂的验证者可能能够利用激励层的细微差别来发起明确的攻击。自佩克特拉 (Pectra) 升级以来，验证者还可以持有并赚取大得多的有效余额，并将多个验证者合并为一个，这改变了运行它们的经济学。

#### 背景阅读 {#background-reading-11}

- [最大有效余额 (MaxEB)](/roadmap/pectra/maxeb/)
- [以太坊经济学大师班与经济模型](https://github.com/CADLabs/ethereum-economic-model)
- [PoS 激励模拟 (稳健激励小组)](https://ethereum.github.io/beaconrunner/)

#### 近期研究 {#recent-research-11}

- [稳健激励小组 (Robust Incentives Group)](https://rig.ethereum.org/)
- [对 PoS 以太坊的三种攻击](https://arxiv.org/abs/2110.10086)

### 流动性质押与衍生品 {#liquid-staking-and-derivatives}

流动性质押允许拥有少于 32 ETH 的用户通过将以太币兑换为代表已质押以太币的代币（可用于去中心化金融 (DeFi)）来获得质押收益。然而，与流动性质押相关的激励和市场动态仍在探索中，其对以太坊安全性的影响（例如中心化风险）也是如此。

#### 背景阅读 {#background-reading-12}

- [Ethresear.ch 流动性质押](https://ethresear.ch/search?q=liquid%20staking)
- [Lido：通往无须信任的以太坊质押之路](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### 近期研究 {#recent-research-12}

- [流动性质押衍生品的风险](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [处理从 Lido 的提款](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## 测试 {#testing}

### 客户端与网络测试 {#client-and-network-testing}

以太坊的规范是可执行的，从中生成的测试夹具是客户端团队用来检查其实现的依据。除此之外，共享的测试工具让客户端相互运行，并在故意设置的恶劣网络条件下运行，而公共测试网在升级到达主网之前对其进行演练。改进这种基础设施是目前最具杠杆作用的工作之一，因为这是在漏洞到达用户之前捕获它们的方法。

#### 背景阅读 {#background-reading-24}

- [以太坊执行层规范](https://github.com/ethereum/execution-specs)
- [共识客户端规范](https://github.com/ethereum/consensus-specs)

#### 近期研究 {#recent-research-24}

- [hive，一个端到端的客户端测试工具](https://github.com/ethereum/hive)
- [Assertoor，一个测试网测试工具](https://github.com/ethpandaops/assertoor)

### 形式化验证 {#formal-verification}

形式化验证使用机器检查的数学证明来确定规范或实现的行为符合预期。在以太坊中，这涵盖了证明 EVM 实现与形式语义相匹配，证明零知识证明者所依赖的电路和证明系统的可靠性，以及验证它们底层的密码学原语。进一步的研究可以加强这些证明，并将其扩展到堆栈的更多部分。

#### 背景阅读 {#background-reading-13}

- [经过验证的 zkEVM](https://verified-zkevm.org/)
- [形式化验证 (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### 近期研究 {#recent-research-13}

- [经过验证的 zkEVM 项目概述](https://github.com/Verified-zkEVM/Overview)
- [KEVM：K 语言中的 EVM 语义](https://github.com/runtimeverification/evm-semantics)
- [存款合约的形式化验证](https://github.com/runtimeverification/deposit-contract-verification)

## 数据科学与分析 {#data-science-and-analytics}

需要更多的数据分析工具和仪表板，以提供有关以太坊上的活动和网络健康状况的详细信息。大部分底层数据都是公开且可查询的，因此差距通常在于分析和呈现，而不是访问。

### 背景阅读 {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [客户端多样性仪表板](https://clientdiversity.org/)
- [以太坊 JSON-RPC 执行 API 规范](https://ethereum.github.io/execution-apis/)

#### 近期研究 {#recent-research-14}

- [稳健激励小组数据分析](https://rig.ethereum.org/)
- [ethPandaOps 开放数据](https://ethpandaops.io/data/)
- [L2BEAT：扩容总结](https://l2beat.com/scaling/summary)

## 应用程序与工具 {#apps-and-tooling}

应用层支持一个多样化的程序生态系统，这些程序在以太坊的基础层上结算交易。开发团队不断寻找利用以太坊的新方法，以创建重要 Web2 应用程序的可组合、无需许可和抗审查的版本，或者创建全新的 Web3 原生概念。同时，正在开发新的工具，使在以太坊上构建去中心化应用 (dapp) 变得不那么复杂。

### 去中心化金融 (DeFi) {#defi}

去中心化金融 (DeFi) 是构建在以太坊之上的主要应用类别之一。DeFi 旨在创建可组合的“货币乐高”，允许用户使用智能合约存储、转账、借贷和投资加密资产。DeFi 是一个快速发展且不断更新的领域。持续需要对安全、高效和可访问的协议进行研究。

#### 背景阅读 {#background-reading-15}

- [去中心化金融 (DeFi)](/defi/)
- [Coinbase：什么是 DeFi？](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### 近期研究 {#recent-research-15}

- [去中心化金融，中心化所有权？](https://arxiv.org/pdf/2012.09306.pdf)
- [Ethresear.ch 应用程序](https://ethresear.ch/c/applications/18)

### 去中心化自治组织 (DAO) {#daos}

以太坊的一个有影响力的用例是能够通过使用 DAO 以去中心化的方式进行组织。关于如何开发和利用以太坊上的 DAO 来执行改进的治理形式，作为一种信任最小化的协调工具，极大地扩展了人们在传统公司和组织之外的选择，目前有大量活跃的研究。

#### 背景阅读 {#background-reading-16}

- [DAO 简介](/dao/)

#### 近期研究 {#recent-research-16}

- [绘制 DAO 生态系统图](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### 开发者工具 {#developer-tools}

以太坊开发者的工具正在迅速改进。在这个总体领域有很多活跃的研究和开发工作要做。

#### 背景阅读 {#background-reading-17}

- [按编程语言分类的工具](/developers/docs/programming-languages/)
- [开发者框架](/developers/docs/frameworks/)
- [去中心化应用 (dapp) 简介](/developers/docs/dapps/)
- [代币标准](/developers/docs/standards/tokens/)

#### 近期研究 {#recent-research-17}

- [Eth R&D Discord](https://discord.gg/qGpsxSA)
- [以太坊执行 API 规范](https://github.com/ethereum/execution-apis)

### 预言机 {#oracles}

预言机以无需许可和去中心化的方式将链下数据导入区块链。将这些数据放到链上，使得去中心化应用 (dapp) 能够对现实世界的现象做出反应，例如现实世界资产的价格波动、链下应用程序中的事件，甚至天气的变化。

#### 背景阅读 {#background-reading-18}

- [预言机简介](/developers/docs/oracles/)

#### 近期研究 {#recent-research-18}

- [区块链预言机调查](https://arxiv.org/pdf/2004.07140.pdf)

### 应用程序安全 {#app-security}

以太坊上的黑客攻击通常利用单个应用程序中的漏洞，而不是协议本身的漏洞。黑客和应用程序开发者陷入了开发新攻击和防御手段的军备竞赛。这意味着始终需要进行重要的研究和开发，以确保应用程序免受黑客攻击。

#### 背景阅读 {#background-reading-19}

- [智能合约安全](/developers/docs/smart-contracts/security/)
- [Wormhole 漏洞利用报告](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [以太坊合约黑客攻击事后分析列表](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### 近期研究 {#recent-research-19}

- [Ethresear.ch 应用程序](https://ethresear.ch/c/applications/18)

### 技术栈 {#technology-stack}

去中心化整个以太坊技术栈是一个重要的研究领域。目前，以太坊上的去中心化应用 (dapp) 通常存在一些中心化点，因为它们依赖于中心化的工具或基础设施。减少这种依赖意味着使应用程序在不信任单一提供商的情况下读取以太坊变得切实可行，这就是轻客户端和对节点数据的无须信任访问发挥作用的地方。

#### 背景阅读 {#background-reading-20}

- [以太坊技术栈](/developers/docs/ethereum-stack/)
- [轻客户端](/developers/docs/nodes-and-clients/light-clients/)
- [智能合约简介](/developers/docs/smart-contracts/)
- [去中心化存储简介](/developers/docs/storage/)

#### 近期研究 {#recent-research-20}

- [智能合约可组合性](/developers/docs/smart-contracts/composability/)
- [Coinbase：Web3 技术栈简介](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)