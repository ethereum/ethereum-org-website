---
title: 以太坊研究的活跃领域
description: 探索开放研究的不同领域，并了解如何参与其中。
lang: zh
---

以太坊的主要优势之一是，一个活跃的研究和工程社区在不断地对其进行改进。全世界许多热情、技术娴熟的人都希望致力于解决以太坊中悬而未决的问题，但要弄清楚这些问题是什么并不总是那么容易。本页面概述了关键的活跃研究领域，作为了解以太坊前沿技术的粗略指南。

## 以太坊研究如何运作 {#how-ethereum-research-works}

以太坊研究是公开透明的，体现了[去中心化科学 (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science)的原则。其文化是使研究工具和成果尽可能开放和具有互动性，例如，通过可执行的笔记本。以太坊研究进展迅速，新发现会在 [ethresear.ch](https://ethresear.ch/) 等论坛上公开首发并进行讨论，而不是在经过多轮同行评审后通过传统出版物传达给社区。

## 通用研究资源 {#general-research-resources}

无论具体主题是什么，都可以在 [ethresear.ch](https://ethresear.ch) 和 [Eth R&D Discord 频道](https://discord.gg/qGpsxSA)找到大量关于以太坊研究的信息。这些是以太坊研究人员讨论最新想法和开发机会的主要场所。

[DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) 于 2022 年 5 月发布的这份报告很好地概述了以太坊路线图。

## 资金来源 {#sources-of-funding}

你可以参与以太坊研究并获得报酬！例如，[以太坊基金会](/foundation/)最近进行了一轮[学术资助](https://esp.ethereum.foundation/academic-grants)。你可以在[以太坊资助页面](/community/grants/)上找到有关活跃和即将到来的资助机会的信息。

## 协议研究 {#protocol-research}

协议研究关注以太坊的基础层——定义节点如何连接、通信、交换和存储以太坊数据，并对区块链的状态达成共识的一套规则。协议研究分为两个顶级类别：共识和执行。

### 共识 {#consensus}

共识研究关注[以太坊的权益证明 (PoS) 机制](/developers/docs/consensus-mechanisms/pos/)。一些共识研究主题的例子包括：

- 识别和修补漏洞；
- 量化密码经济学安全性；
- 提高客户端实现的安全性或性能；
- 以及开发轻客户端。

除了前瞻性研究之外，还在研究对协议进行一些根本性的重新设计，例如单槽最终性，以实现对以太坊的重大改进。此外，共识客户端之间点对点网络的效率、安全性和监控也是重要的研究主题。

#### 背景阅读 {#background-reading}

- [权益证明 (PoS) 简介](/developers/docs/consensus-mechanisms/pos/)
- [Casper FFG 论文](https://arxiv.org/abs/1710.09437)
- [Casper FFG 解释](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Gasper 论文](https://arxiv.org/abs/2003.03052)

#### 近期研究 {#recent-research}

- [Ethresear.ch 共识](https://ethresear.ch/c/consensus/29)
- [可用性/最终性困境](https://arxiv.org/abs/2009.04987)
- [单槽最终性](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [提议者-构建者分离 (PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### 执行 {#execution}

执行层关注执行交易、运行[以太坊虚拟机 (EVM)](/developers/docs/evm/)以及生成执行有效负载以传递给共识层。有许多活跃的研究领域，包括：

- 构建轻客户端支持；
- 研究 Gas 限制；
- 以及整合新的数据结构（例如，沃克尔树 (Verkle Tries)）。

#### 背景阅读 {#background-reading-1}

- [EVM 简介](/developers/docs/evm)
- [Ethresear.ch 执行层](https://ethresear.ch/c/execution-layer-research/37)

#### 近期研究 {#recent-research-1}

- [数据库优化](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [状态过期](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [实现状态过期的路径](https://hackmd.io/@vbuterin/state_expiry_paths)
- [沃克尔树与状态过期提案](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [历史记录管理](https://eips.ethereum.org/EIPS/eip-4444)
- [沃克尔树](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [数据可用性采样 (DAS)](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## 客户端开发 {#client-development}

以太坊客户端是以太坊协议的实现。客户端开发通过将协议研究的成果构建到这些客户端中，使其成为现实。客户端开发包括更新客户端规范以及构建特定的实现。

一个以太坊节点需要运行两款软件：

1. 一个共识客户端，用于跟踪区块链的头部、广播区块并处理共识逻辑
2. 一个执行客户端，用于支持以太坊虚拟机并执行交易和智能合约

有关节点和客户端的更多详细信息以及所有当前客户端实现的列表，请参阅[节点和客户端页面](/developers/docs/nodes-and-clients/)。你还可以在[历史页面](/ethereum-forks/)上找到所有以太坊升级的历史记录。

### 执行客户端 {#execution-clients}

- [执行客户端规范](https://github.com/ethereum/execution-specs)
- [执行 API 规范](https://github.com/ethereum/execution-apis)

### 共识客户端 {#consensus-clients}

- [共识客户端规范](https://github.com/ethereum/consensus-specs)
- [信标 API 规范](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## 扩容与性能 {#scaling-and-performance}

扩容以太坊是以太坊研究人员关注的一个重要领域。目前的方法包括将交易卸载到汇总上，并使用数据 blob 使其尽可能便宜。有关以太坊扩容的介绍性信息，请访问我们的[扩容页面](/developers/docs/scaling)。

### 二层网络 (l2) {#layer-2}

现在有几个二层网络 (l2) 协议使用不同的技术来批量处理交易并在以太坊一层网络 (l1) 上保护它们，从而扩展以太坊。这是一个发展非常迅速的主题，具有很大的研发潜力。

#### 背景阅读 {#background-reading-2}

- [二层网络 (l2) 简介](/layer-2/)
- [Polynya：汇总、DA 和模块化链](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### 近期研究 {#recent-research-2}

- [Arbitrum 排序器的公平排序](https://eprint.iacr.org/2021/1465)
- [Ethresear.ch 二层网络 (l2)](https://ethresear.ch/c/layer-2/32)
- [以 Rollup 为中心的路线图](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2BEAT](https://l2beat.com/)

### 桥接 {#bridges}

二层网络 (l2) 中一个需要更多研发的特定领域是安全且高性能的桥接。这包括各种二层网络 (l2) 之间的桥接以及一层网络 (l1) 和二层网络 (l2) 之间的桥接。这是一个特别重要的研究领域，因为桥接通常是黑客攻击的目标。

#### 背景阅读 {#background-reading-3}

- [区块链桥接简介](/bridges/)
- [Vitalik 谈桥接](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [区块链桥接文章](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [桥接中的锁定价值](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### 近期研究 {#recent-research-3}

- [验证桥接](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### 分片 {#sharding}

对以太坊区块链进行分片长期以来一直是开发路线图的一部分。然而，诸如“丹克分片”等新的扩容解决方案目前正占据中心舞台。

完整丹克分片的前身 Proto-Danksharding 已随 Cancun-Deneb（“登昆升级”）网络升级上线。

[了解有关登昆升级的更多信息](/roadmap/dencun/)

#### 背景阅读 {#background-reading-4}

- [Proto-Danksharding 笔记](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless 丹克分片视频](https://www.youtube.com/watch?v=N5p0TB77flM)
- [以太坊分片研究纲要](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [丹克分片 (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### 近期研究 {#recent-research-4}

- [EIP-4844：Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik 谈分片和数据可用性采样 (DAS)](https://hackmd.io/@vbuterin/sharding_proposal)

### 硬件 {#hardware}

在普通硬件上[运行节点](/developers/docs/nodes-and-clients/run-a-node/)是保持以太坊去中心化的基础。因此，积极研究如何最大限度地降低运行节点的硬件要求是一个重要的研究领域。

#### 背景阅读 {#background-reading-5}

- [ARM 上的以太坊](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### 近期研究 {#recent-research-5}

- [FPGA 上的 ECDSA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## 安全性 {#security}

安全性是一个广泛的主题，可能包括防止垃圾邮件/诈骗、钱包安全、硬件安全、密码经济学安全、漏洞搜寻以及应用程序和客户端软件的测试以及密钥管理。为这些领域的知识做出贡献将有助于促进主流采用。

### 密码学与零知识证明 (ZKP) {#cryptography--zkp}

零知识证明 (ZKP) 和密码学对于在以太坊及其应用程序中构建隐私和安全性至关重要。零知识是一个相对年轻但发展迅速的领域，拥有许多开放的研发机会。一些可能性包括开发更高效的 [Keccak 哈希处理算法](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview)实现，寻找比目前更好的多项式承诺，或降低 ECDSA 公钥生成和签名验证电路的成本。

#### 背景阅读 {#background-reading-6}

- [0xparc 博客](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [零知识播客](https://zeroknowledge.fm/)

#### 近期研究 {#recent-research-6}

- [椭圆曲线密码学的最新进展](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch 零知识](https://ethresear.ch/c/zk-s-nt-arks/13)

### 钱包 {#wallets}

以太坊钱包可以是浏览器扩展、桌面和移动应用程序，也可以是以太坊上的智能合约。目前正在积极研究社交恢复钱包，以降低与个人用户密钥管理相关的一些风险。与钱包开发相关的是对账户抽象替代形式的研究，这是一个重要的新兴研究领域。

#### 背景阅读 {#background-reading-7}

- [钱包简介](/wallets/)
- [钱包安全简介](/security/)
- [Ethresear.ch 安全性](https://ethresear.ch/tag/security)
- [EIP-2938 账户抽象](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 账户抽象](https://eips.ethereum.org/EIPS/eip-4337)

#### 近期研究 {#recent-research-7}

- [专注于验证的智能合约钱包](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [账户的未来](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH 和 AUTHCALL 操作码](https://eips.ethereum.org/EIPS/eip-3074)
- [在外部拥有账户 (EOA) 地址发布代码](https://eips.ethereum.org/EIPS/eip-5003)

## 社区、教育和推广 {#community-education-and-outreach}

引导新用户进入以太坊需要新的教育资源和推广方法。这可能包括博客文章和报道、书籍、播客、模因、教学资源、活动以及任何其他建立社区、欢迎新手并向人们普及以太坊知识的内容。

### 用户体验/用户界面 (UX/UI) {#uxui}

为了引导更多人进入以太坊，生态系统必须改善用户体验/用户界面 (UX/UI)。这将需要设计师和产品专家重新审视钱包和应用程序的设计。

#### 背景阅读 {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### 近期研究 {#recent-research-8}

- [Web3 设计 Discord](https://discord.gg/FsCFPMTSm9)
- [Web3 设计原则](https://www.web3designprinciples.com/)
- [Ethereum Magicians UX 讨论](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### 经济学 {#economics}

以太坊的经济学研究大致遵循两种方法：验证依赖经济激励的机制的安全性（“微观经济学”），以及分析协议、应用程序和用户之间的价值流动（“宏观经济学”）。存在与以太坊原生资产（以太币）及其之上构建的代币（例如 NFT 和 ERC-20 代币）相关的复杂密码经济学因素。

#### 背景阅读 {#background-reading-9}

- [稳健激励小组 (Robust Incentives Group)](https://rig.ethereum.org/)
- [Devconnect 上的 ETHconomics 研讨会](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### 近期研究 {#recent-research-9}

- [EIP-1559 的实证分析](https://arxiv.org/abs/2201.05574)
- [流通供应均衡](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [量化最大可提取价值 (MEV)：黑暗森林有多黑？](https://arxiv.org/abs/2101.05511)

### 区块空间和费用市场 {#blockspace-fee-markets}

区块空间市场管理最终用户交易的包含，无论是直接在以太坊（一层网络 (l1)）上还是在桥接网络上，例如汇总（二层网络 (l2)）。在以太坊上，交易被提交到作为 EIP-1559 部署在协议内的费用市场，从而保护链免受垃圾邮件和定价拥堵的影响。在这两层网络上，交易可能会产生外部性，称为最大可提取价值 (MEV)，这会引发新的市场结构来捕获或管理这些外部性。

#### 背景阅读 {#background-reading-10}

- [以太坊区块链的交易费机制设计：EIP-1559 的经济学分析 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559 模拟（稳健激励小组）](https://ethereum.github.io/abm1559)
- [基于第一性原理的 Rollup 经济学](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [闪电男孩 2.0：去中心化交易所中的抢跑、交易重排序和共识不稳定性](https://arxiv.org/abs/1904.05234)

#### 近期研究 {#recent-research-10}

- [多维 EIP-1559 视频演示](https://youtu.be/QbR4MTgnCko)
- [跨域 MEV](https://arxiv.org/abs/2112.01472)
- [MEV 拍卖](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### 权益证明 (PoS) 激励 {#proof-of-stake-incentives}

验证者使用以太坊的原生资产（以太币）作为抵押品，以防止不诚实行为。这种密码经济学决定了网络的安全性。经验丰富的验证者可能能够利用激励层的细微差别发起明确的攻击。

#### 背景阅读 {#background-reading-11}

- [以太坊经济学大师班和经济模型](https://github.com/CADLabs/ethereum-economic-model)
- [PoS 激励模拟（稳健激励小组）](https://ethereum.github.io/beaconrunner/)

#### 近期研究 {#recent-research-11}

- [在提议者-构建者分离 (PBS) 下提高交易的抗审查性](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [对 PoS 以太坊的三种攻击](https://arxiv.org/abs/2110.10086)

### 流动性质押和衍生品 {#liquid-staking-and-derivatives}

流动性质押允许拥有少于 32 个 ETH 的用户通过将以太币兑换为代表已质押以太币的代币（可在去中心化金融 (DeFi) 中使用）来获得质押收益。然而，与流动性质押相关的激励和市场动态仍在探索中，其对以太坊安全性的影响（例如，中心化风险）也是如此。

#### 背景阅读 {#background-reading-12}

- [Ethresear.ch 流动性质押](https://ethresear.ch/search?q=liquid%20staking)
- [Lido：通往无须信任的以太坊质押之路](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool：质押协议简介](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### 近期研究 {#recent-research-12}

- [处理从 Lido 的提款](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [提款凭证](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [流动性质押衍生品的风险](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## 测试 {#testing}

### 形式化验证 {#formal-verification}

形式化验证是编写代码来验证以太坊的共识规范是否正确且无漏洞。有一个用 Python 编写的规范的可执行版本，需要维护和开发。进一步的研究有助于改进规范的 Python 实现，并添加能够更稳健地验证正确性和识别问题的工具。

#### 背景阅读 {#background-reading-13}

- [形式化验证简介](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [形式化验证 (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### 近期研究 {#recent-research-13}

- [存款合约的形式化验证](https://github.com/runtimeverification/deposit-contract-verification)
- [信标链规范的形式化验证](https://github.com/runtimeverification/deposit-contract-verification)

## 数据科学与分析 {#data-science-and-analytics}

需要更多的数据分析工具和仪表板，以提供有关以太坊活动和网络健康状况的详细信息。

### 背景阅读 {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [客户端多样性仪表板](https://clientdiversity.org/)

#### 近期研究 {#recent-research-14}

- [稳健激励小组数据分析](https://rig.ethereum.org/)

## 应用程序和工具 {#apps-and-tooling}

应用层支持一个多样化的程序生态系统，这些程序在以太坊的基础层上结算交易。开发团队不断寻找利用以太坊的新方法，以创建重要 Web2 应用程序的可组合、无需许可和抗审查版本，或创建全新的 Web3 原生概念。同时，正在开发新的工具，使在以太坊上构建去中心化应用 (dapp) 变得不那么复杂。

### 去中心化金融 (DeFi) {#defi}

去中心化金融 (DeFi) 是构建在以太坊之上的主要应用类别之一。去中心化金融 (DeFi) 旨在创建可组合的“货币乐高”，允许用户使用智能合约存储、转账、借贷和投资加密资产。去中心化金融 (DeFi) 是一个快速发展且不断更新的领域。持续需要对安全、高效和易于访问的协议进行研究。

#### 背景阅读 {#background-reading-15}

- [去中心化金融 (DeFi)](/defi/)
- [Coinbase：什么是去中心化金融 (DeFi)？](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### 近期研究 {#recent-research-15}

- [去中心化金融，中心化所有权？](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism：通往低于一美元交易之路](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### 去中心化自治组织 (DAO) {#daos}

以太坊的一个有影响力的用例是能够通过使用去中心化自治组织 (DAO) 以去中心化的方式进行组织。目前有大量活跃的研究探讨如何开发和利用以太坊上的 DAO 来执行改进的治理形式，作为一种信任最小化的协调工具，极大地扩展了人们在传统公司和组织之外的选择。

#### 背景阅读 {#background-reading-16}

- [DAO 简介](/dao/)
- [DAO Collective](https://daocollective.xyz/)

#### 近期研究 {#recent-research-16}

- [绘制 DAO 生态系统图](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### 开发者工具 {#developer-tools}

以太坊开发者的工具正在迅速改进。在这个总体领域有很多活跃的研发工作要做。

#### 背景阅读 {#background-reading-17}

- [按编程语言分类的工具](/developers/docs/programming-languages/)
- [开发者框架](/developers/docs/frameworks/)
- [共识开发者工具列表](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [代币标准](/developers/docs/standards/tokens/)
- [CryptoDevHub：EVM 工具](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### 近期研究 {#recent-research-17}

- [Eth R&D Discord 共识工具频道](https://discordapp.com/channels/595666850260713488/746343380900118528)

### 预言机 {#oracles}

预言机以无需许可和去中心化的方式将链下数据导入区块链。将这些数据放到链上，使得去中心化应用 (dapp) 能够对现实世界的现象做出反应，例如现实世界资产的价格波动、链下应用程序中的事件，甚至天气的变化。

#### 背景阅读 {#background-reading-18}

- [预言机简介](/developers/docs/oracles/)

#### 近期研究 {#recent-research-18}

- [区块链预言机调查](https://arxiv.org/pdf/2004.07140.pdf)
- [切恩林克白皮书](https://chain.link/whitepaper)

### 应用程序安全 {#app-security}

对以太坊的黑客攻击通常利用单个应用程序中的漏洞，而不是协议本身的漏洞。黑客和应用程序开发者陷入了开发新攻击和防御手段的军备竞赛。这意味着始终需要进行重要的研发工作，以确保应用程序免受黑客攻击。

#### 背景阅读 {#background-reading-19}

- [Wormhole 漏洞利用报告](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [以太坊合约黑客攻击事后分析列表](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### 近期研究 {#recent-research-19}

- [Ethresear.ch 应用程序](https://ethresear.ch/c/applications/18)

### 技术栈 {#technology-stack}

去中心化整个以太坊技术栈是一个重要的研究领域。目前，以太坊上的去中心化应用 (dapp) 通常存在一些中心化点，因为它们依赖于中心化的工具或基础设施。

#### 背景阅读 {#background-reading-20}

- [以太坊技术栈](/developers/docs/ethereum-stack/)
- [Coinbase：Web3 技术栈简介](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [智能合约简介](/developers/docs/smart-contracts/)
- [去中心化存储简介](/developers/docs/storage/)

#### 近期研究 {#recent-research-20}

- [智能合约可组合性](/developers/docs/smart-contracts/composability/)