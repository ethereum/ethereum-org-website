---
title: 活跃的以太坊研究领域
description: 探索不同的开放研究领域，并了解如何参与其中。
lang: zh
---

# 活跃的以太坊研究领域 {#active-areas-of-ethereum-research}

以太坊的主要优势之一就在于，有一个高度活跃的研究与工程社区在不断改进它。 全世界许多充满热情且技术熟练的人都希望致力于解决以太坊中尚未解决的问题，但找出这些问题的根源往往不那么容易。 本页概述了以太坊重要的活跃研究领域，作为介绍以太坊前沿领域的粗略指南。

## 以太坊研究是怎样进行的 {#how-ethereum-research-works}

以太坊研究是公开且透明的，体现了[去中心化科学 (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science) 的原则。 其文化致力于最大程度提升研究工具及成果的开放性和交互性，例如通过可执行笔记本。 以太坊研究进展迅速，新的研究成果会在 [ethresear.ch](https://ethresear.ch/) 等论坛上公开发布和讨论，而不是通过传统的发布方式，经过几轮同行评审后再向社区转播。

## 通用研究资源 {#general-research-resources}

无论是哪种具体主题，都可以在 [ethresear.ch](https://ethresear.ch) 和[以太坊研发 Discord 频道](https://discord.gg/qGpsxSA)中找到大量和以太坊研究相关的信息。 这些是以太坊研究人员讨论最新想法和开发机会的主要平台。

该报告由 [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) 于 2022 年 5 月发布，全面概述了以太坊路线图。

## 资金来源 {#sources-of-funding}

你可以参与以太坊研究，并因此获得报酬！ 例如，[以太坊基金会](/foundation/)最近开展了一轮[学术资助活动](https://esp.ethereum.foundation/academic-grants)。 你可以在[以太坊资助页面](/community/grants/)找到相关信息，了解目前正在进行和即将开展的资助机会。

## 协议研究 {#protocol-research}

协议研究关注以太坊的基础层，基础层指一系列规则，它们定义节点如何连接、通信、交换和储存以太坊数据以及如何就区块链状态达成共识。 协议研究分为两个顶层类别：共识和执行。

### 共识 {#consensus}

共识研究专注于[以太坊的权益证明机制](/developers/docs/consensus-mechanisms/pos/)。 下面是一些共识研究课题的示例：

- 发现和修补漏洞；
- 量化加密经济安全性；
- 提高客户端实现的安全性或性能；
- 以及开发轻客户端。

还开展了一些前瞻性研究，并对协议进行了一些重大重新设计（例如单时隙最终确定性），以实现以太坊的重要改进。 此外，共识客户端之间对等网络的效率、安全性和监测也是重要的研究课题。

#### 背景阅读 {#background-reading}

- [权益证明简介](/developers/docs/consensus-mechanisms/pos/)
- [Casper-FFG 论文](https://arxiv.org/abs/1710.09437)
- [Casper-FFG 的解释说明](https://arxiv.org/abs/1710.09437)
- [Gasper 论文](https://arxiv.org/abs/2003.03052)

#### 近期的研究 {#recent-research}

- [Ethresear.ch 共识](https://ethresear.ch/c/consensus/29)
- [可用性/最终确定性困境](https://arxiv.org/abs/2009.04987)
- [单时隙最终确定性](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [提议者-构建者分离](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### 执行 {#execution}

执行层专注于执行交易，运行[以太坊虚拟机 (EVM)](/developers/docs/evm/) 并生成执行有效载荷以传递给共识层。 有许多活跃的研究领域，包括：

- 构建轻客户端支持；
- 研究燃料限制；
- 以及采用新数据结构（例如沃克尔树）。

#### 背景阅读 {#background-reading-1}

- [以太坊虚拟机简介](/developers/docs/evm)
- [Ethresear.ch 执行层](https://ethresear.ch/c/execution-layer-research/37)

#### 近期的研究 {#recent-research-1}

- [数据库优化](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [状态到期](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [状态到期路径](https://hackmd.io/@vbuterin/state_expiry_paths)
- [沃克尔树和状态到期提案](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [历史管理](https://eips.ethereum.org/EIPS/eip-4444)
- [沃克尔树](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [数据可用性采样](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## 客户端开发 {#client-development}

以太坊客户端是以太坊协议的实现。 客户端开发通过将协议研究的成果融入客户端中，让这些成果转化为现实。 客户端开发包括更新客户端规范和搭建具体实现。

一个以太坊节点需要运行两个软件：

1. 一个共识客户端，用于追踪区块链头部、传播区块并处理共识逻辑
2. 一个执行客户端，用于支持以太坊虚拟机并执行交易和智能合约

查看[节点和客户端页面](/developers/docs/nodes-and-clients/)以了解关于节点和客户端的更多详细信息以及当前所有客户端实现的清单。 你也可以在[历史页面](/history/)找到所有以太坊升级的历史信息。

### 执行客户端 {#execution-clients}

- [执行客户端规范](https://github.com/ethereum/execution-specs)
- [执行应用程序接口规范](https://github.com/ethereum/execution-apis)

### 共识客户端 {#consensus-clients}

- [共识客户端规范](https://github.com/ethereum/consensus-specs)
- [信标应用程序接口规范](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## 扩容与性能 {#scaling-and-performance}

以太坊扩容是以太坊研究人员关注的一个重大领域。 目前的方法包括将交易转移到卷叠上，并使用数据二进制大对象使交易尽可能经济实惠。 我们的[扩容页面](/developers/docs/scaling)提供了关于以太坊扩容的介绍信息。

### 二层网络 {#layer-2}

现在有一些二层网络协议，它们使用不同的技术对以太坊进行扩容，在以太坊一层网络上批量处理交易并保证交易安全。 这个课题发展十分迅速，具备很大的研究和发展潜力。

#### 背景阅读 {#background-reading-2}

- [二层网络简介](/layer-2/)
- [Polynya：卷叠、数据可用性和模块化链](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### 近期的研究 {#recent-research-2}

- [面向排序者的 Arbitrum 公平排序](https://eprint.iacr.org/2021/1465)
- [ethresear.ch 二层网络](https://ethresear.ch/c/layer-2/32)
- [以卷叠为中心的路线图](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### 链桥 {#bridges}

二层网络中一个需要进行更多研究和开发的特别领域是安全且性能良好的链桥。 这包括不同二层网络之间以及一层网络与二层网络之间的链桥。 这是一个非常重要的研究领域，因为链桥往往是黑客攻击的目标。

#### 背景阅读 {#background-reading-3}

- [区块链桥简介](/bridges/)
- [Vitalik 谈链桥](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [区块链桥文章](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [锁定在链桥上的价值](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### 近期的研究 {#recent-research-3}

- [验证链桥](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### 分片 {#sharding}

分片以太坊区块链长期以来都是发展路线图的一部分。 不过，“Danksharding”等新的扩容解决方案目前占据了中心位置。

Proto-Danksharding 是完整 Danksharding 的先决条件 ，在 Cancun-Deneb ("Dencun") 网络升级后上线。

[更多关于 Dencun 升级的信息](/roadmap/dencun/)

#### 背景阅读 {#background-reading-4}

- [Proto-Danksharding 注释](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless 的 Danksharding 视频](https://www.youtube.com/watch?v=N5p0TB77flM)
- [以太坊分片研究纲要](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### 近期的研究 {#recent-research-4}

- [EIP-4844：Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Vitalik 谈分片和数据可用性采样](https://hackmd.io/@vbuterin/sharding_proposal)

### 硬件 {#hardware}

使用普通硬件[运行节点](/developers/docs/nodes-and-clients/run-a-node/)是保持以太坊去中心化的基础。 因此，尽可能降低运行节点的硬件要求是目前正在积极研究的一个重要领域。

#### 背景阅读 {#background-reading-5}

- [基于 ARM 的以太坊](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### 近期的研究 {#recent-research-5}

- [基于现场可编程门阵列的椭圆曲线数字签名算法](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## 安全 {#security}

安全是一个广泛的话题，可能包括垃圾邮件/诈骗防范、钱包安全、硬件安全、加密经济安全、应用程序和客户端软件的错误查找和测试以及密钥管理。 拓宽这些领域的知识将有助于促进主流采用。

### 加密与零知识证明 {#cryptography--zkp}

零知识证明 (ZKP) 和加密对于构建以太坊及其应用程序的隐私性和安全性非常关键。 零知识是一个相对年轻但发展迅速的领域，有许多开放研究和开发机会。 它包括一些可能性，如开发更高效的 [Keccak 哈希算法](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview)实现，寻找更好的多项式承诺，或是降低椭圆曲线数字签名算法公钥生成和签名验证电路的成本。

#### 背景阅读 {#background-reading-6}

- [0xparc 博客](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [零知识播客](https://zeroknowledge.fm/)

#### 近期的研究 {#recent-research-6}

- [椭圆曲线密码学的近期进展](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch 零知识](https://ethresear.ch/c/zk-s-nt-arks/13)

### 钱包 {#wallets}

以太坊钱包可以是浏览器扩展程序、桌面和移动应用程序，也可以是以太坊上的智能合约。 有关社交恢复钱包的研究目前很活跃，这种钱包可以降低与个人用户密钥管理相关的风险。 和钱包开发相关联的是对帐户抽象替代形式的研究，这是一个重要的新兴研究领域。

#### 背景阅读 {#background-reading-7}

- [钱包简介](/wallets/)
- [钱包安全性简介](/security/)
- [ethresear.ch 安全性](https://ethresear.ch/tag/security)
- [EIP-2938 帐户抽象](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 帐户抽象](https://eips.ethereum.org/EIPS/eip-4337)

#### 近期的研究 {#recent-research-7}

- [以验证为核心的智能合约钱包](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [帐户的未来](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH 和1 AUTHCALL 操作码](https://eips.ethereum.org/EIPS/eip-3074)
- [在外部帐户地址发布代码](https://eips.ethereum.org/EIPS/eip-5003)

## 社区、教育和宣传 {#community-education-and-outreach}

为了帮助新用户熟悉以太坊，需要新的教育资源和宣传方法。 这可能包括博客帖子和文章、书籍、播客、网络迷因、教学资源、活动以及其他任何关于建设社区、欢迎新手和教育人们了解以太坊的内容。

### 用户体验/用户界面 {#uxui}

为了帮助更多人熟悉以太坊，以太坊生态系统必须改善用户体验/用户界面。 这要求设计师和产品专家重新审视钱包和应用程序的设计。

#### 背景阅读 {#background-reading-8}

- [Ethresear.ch 用户体验/用户界面](https://ethresear.ch/c/ui-ux/24)

#### 近期的研究 {#recent-research-8}

- [Web3 设计 Discord](https://discord.gg/FsCFPMTSm9)
- [Web3 设计原则](https://www.web3designprinciples.com/)
- [以太坊魔术师用户体验讨论](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### 经济学 {#economics}

以太坊中的经济学研究普遍遵循两个途径：验证依赖于经济激励的机制的安全性（“微观经济学”）和分析协议、应用程序和用户之间的价值流动（“宏观经济学”）。 有一些复杂的加密经济学因素与以太坊原生资产（以太币）及构建于其上的代币（例如非同质化代币和 ERC20 代币）有关。

#### 背景阅读 {#background-reading-9}

- [稳健激励小组](https://ethereum.github.io/rig/)
- [Devconnect 上的 ETHconomics 研讨会](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### 近期的研究 {#recent-research-9}

- [EIP1559 实证分析](https://arxiv.org/abs/2201.05574)
- [流通量平衡](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [量化最大可提取价值：森林有多黑暗？](https://arxiv.org/abs/2101.05511)

### 区块空间和费用市场 {#blockspace-fee-markets}

区块空间市场管理最终用户交易的纳入，不管是直接在以太坊（一层网络）还是在卷叠等桥接网络（二层网络）上纳入。 在以太坊上，交易将提交到依据 EIP-1559 协议部署的费用市场，保护区块链免受垃圾邮件和定价拥堵的影响。 在两个网络上，交易可能产生外部效应，即最大可提取价值 (MEV)，引发可捕捉或管理这些外部效应的新型市场结构。

#### 背景阅读 {#background-reading-10}

- [以太坊区块链的交易费机制设计：EIP-1559 的经济分析（Tim Roughgarden，2020 年）](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559 的模拟（稳健激励小组）](https://ethereum.github.io/abm1559)
- [基于首要原则的卷叠经济学](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0：去中心化交易所中的抢先交易、交易重新排序和共识不稳定性](https://arxiv.org/abs/1904.05234)

#### 近期的研究 {#recent-research-10}

- [多维 EIP-1559 的视频演示](https://youtu.be/QbR4MTgnCko)
- [跨域最大可提取价值](http://arxiv.org/abs/2112.01472)
- [最大可提取价值拍卖](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### 权益证明激励 {#proof-of-stake-incentives}

验证者使用以太坊的原生资产（以太币）作为阻止不诚信行为的抵押品。 这类加密经济学决定了网络安全。 老练的验证者可能利用激励层的细微差别发起显式攻击。

#### 背景阅读 {#background-reading-11}

- [以太坊经济学大师课和经济模型](https://github.com/CADLabs/ethereum-economic-model)
- [权益证明激励的模拟（稳健激励小组）](https://ethereum.github.io/beaconrunner/)

#### 近期的研究 {#recent-research-11}

- [通过提议者-构建者分离 (PBS) 增强交易的抗审查性](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [针对权益证明以太坊的三次攻击](https://arxiv.org/abs/2110.10086)

### 流动性质押和衍生品 {#liquid-staking-and-derivatives}

流动性质押让拥有不足 32 以太币的用户，也能通过将以太币兑换成代表已质押以太币且可在去中心化金融中使用的代币来获得质押收益。 然而，我们仍在探索与流动性质押相关的激励和市场动态，及其对以太坊安全性的影响（例如中心化风险）。

#### 背景阅读 {#background-reading-12}

- [Ethresear.ch 流动性质押](https://ethresear.ch/search?q=liquid%20staking)
- [Lido：去信任以太坊质押之路](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool：质押协议简介](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### 近期的研究 {#recent-research-12}

- [处理 Lido 的提款](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [提款凭证](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [流动性质押衍生品的风险](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## 测试 {#testing}

### 形式验证 {#formal-verification}

形式验证是指编写代码以验证以太坊的共识规范正确无误。 该规范有一个用 Python 编写的可执行版本，需要维护和开发。 进一步研究可以帮助改进该规范的 Python 实现，并添加可以更稳健地验证正确性和发现问题的工具。

#### 背景阅读 {#background-reading-13}

- [形式验证简介](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [形式验证 (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### 近期的研究 {#recent-research-13}

- [存款合约的形式验证](https://github.com/runtimeverification/deposit-contract-verification)
- [信标链规范的形式验证](https://github.com/runtimeverification/deposit-contract-verification)

## 数据科学与分析 {#data-science-and-analytics}

我们需要更多的数据分析工具和仪表板，来提供有关以太坊活动和网络健康状况的详细信息。

### 背景阅读 {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [客户端多样性仪表板](https://clientdiversity.org/)

#### 近期的研究 {#recent-research-14}

- [稳健激励小组数据分析](https://ethereum.github.io/rig/)

## 应用程序与工具 {#apps-and-tooling}

应用程序层支持一个多样化的程序生态系统，这些程序在以太坊基础层上结算交易。 开发团队不断寻找新方法，来利用以太坊为重要的 Web2 应用程序创建可组合、无需许可且抗审查的版本，或者创建全新 Web3 原生概念。 同时，新工具也在持续开发中，降低了在以太坊上构建去中心化应用程序的复杂度。

### 去中心化金融 {#defi}

去中心化金融 (DeFi) 是构建在以太坊上的主要一类应用程序。 去中心化金融旨在创建可组合的“货币乐高”，允许用户通过智能合约存储、转账、借出、借入以及投资加密资产。 它是一个变化迅速、不断更新的领域。 需要持续不断地研究安全、高效和可访问的协议。

#### 背景阅读 {#background-reading-15}

- [去中心化金融](/defi/)
- [Coinbase：去中心化金融是什么？](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### 近期的研究 {#recent-research-15}

- [去中心化金融，中心化所有权？](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism：通往低费用交易之路](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### 去中心化自治组织 {#daos}

以太坊的一个有影响力的用例就是能够通过应用去中心化自治组织实现组织方式的去中心化。 当前正在进行大量研究，探索如何开发和利用以太坊上的去中心化自治组织，将其作为一种只需最少信任的协调工具来实施改进的治理形式，从而极大地扩展人们的选择，使之不再局限于传统的公司和组织。

#### 背景阅读 {#background-reading-16}

- [去中心化自治组织简介](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### 近期的研究 {#recent-research-16}

- [去中心化自治组织生态系统详细规划](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### 开发者工具 {#developer-tools}

以太坊开发者的工具正在迅速改进。 这一综合领域目前有大量的研发工作正在进行中。

#### 背景阅读 {#background-reading-17}

- [编程语言工具](/developers/docs/programming-languages/)
- [开发者框架](/developers/docs/frameworks/)
- [共识开发者工具列表](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [代币标准](/developers/docs/standards/tokens/)
- [CryptoDevHub：以太坊虚拟机工具](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### 近期的研究 {#recent-research-17}

- [以太坊研发 Discord 共识工具频道](https://discordapp.com/channels/595666850260713488/746343380900118528)

### 预言机 {#oracles}

预言机以一种无需许可、去中心化的方式将链下数据导入到区块链上。 将这些数据导入到链上，去中心化应用程序就可以对现实世界的现象做出反应，例如现实世界的资产价格波动、链下应用程序中的事件，甚至天气变化。

#### 背景阅读 {#background-reading-18}

- [预言机简介](/developers/docs/oracles/)

#### 近期的研究 {#recent-research-18}

- [区块链预言机调查](https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlink 白皮书](https://chain.link/whitepaper)

### 应用程序安全性 {#app-security}

以太坊上的黑客攻击通常利用单个应用程序中的漏洞，而不是协议本身的漏洞。 黑客和应用程序开发者陷入了一场开发新型攻击和防御手段的军备竞赛。 这意味着始终需要进行重要的研发，以保障应用程序安全并免受黑客攻击。

#### 背景阅读 {#background-reading-19}

- [虫洞攻击报告](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [以太坊合约黑客攻击事后分析列表](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt 新闻](https://twitter.com/RektHQ?s=20\&t=3otjYQdM9Bqk8k3n1a1Adg)

#### 近期的研究 {#recent-research-19}

- [ethresear.ch 应用程序](https://ethresear.ch/c/applications/18)

### 技术栈 {#technology-stack}

将整个以太坊技术栈去中心化是一项重要的研究领域。 目前，以太坊上的去中心化应用程序都有一定的中心化成分，因为它们依赖于中心化的工具或基础设施。

#### 背景阅读 {#background-reading-20}

- [以太坊堆栈](/developers/docs/ethereum-stack/)
- [Coinbase：Web3 堆栈简介](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [智能合约简介](/developers/docs/smart-contracts/)
- [去中心化存储简介](/developers/docs/storage/)

#### 近期的研究 {#recent-research-20}

- [智能合约的可组合性](/developers/docs/smart-contracts/composability/)
