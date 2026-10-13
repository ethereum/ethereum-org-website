---
title: "更安全的以太坊"
description: "以太坊路线图在今天强化了区块生产和抗审查性，同时为协议进入量子时代和未来数十年的可靠运行做好准备。"
lang: zh
image: /images/roadmap/roadmap-security.png
alt: "以太坊路线图"
template: roadmap
summaryPoints:
  - 诸如协议内提议者-构建者分离和包含列表等近期强化升级正在积极开发中
  - 后量子时代的准备工作正在进行中，远早于任何可信的量子威胁出现
  - 协议简化消除了复杂性，并缩小了以太坊的攻击面
---

以太坊已经是一个非常安全、去中心化的[智能合约](/glossary/#smart-contract)平台。路线图旨在通过**在今天强化网络，同时为可能在数年后才会出现的威胁做好准备**，使其在未来几十年内保持这种状态。近期升级在 [forkcast.org](https://forkcast.org) 上进行跟踪，而更长远的路线图草案则发布在 [strawmap.org](https://strawmap.org) 上。

<ExpandableCard title="以太坊今天安全吗？" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

是的。以太坊自 2015 年以来一直持续运行，从未停机。本页介绍的改进使这个本已安全的网络更难被攻击、审查或破坏。

</ExpandableCard>

## 无须信任的区块构建 {#trustless-block-building}

如今，大多数以太坊区块都是通过分工组装的：专业的构建者尽可能构建最有价值的区块，而轮到其出块的[验证者](/glossary/#validator)则提出最佳报价。这防止了专业的区块构建将[质押](/glossary/#staking)集中在最大的运营商手中，但自 2022 年以来，它一直依赖于网络无法验证的协议外软件。

**协议内提议者-构建者分离 (ePBS，或 EIP-7732)** 将这种分工移入协议中，消除了对中继（目前在构建者和验证者之间传递区块的第三方中间人）的信任需求。ePBS 是即将到来的 [格拉姆斯特丹](/roadmap/glamsterdam/) 升级的重头戏，目标定于 2026 年。主网日期尚未确定；客户端团队正在开发网（临时测试网络）上对其进行测试。

<ButtonLink variant="outline" href="/roadmap/pbs/">更多关于提议者-构建者分离 (PBS) 的信息</ButtonLink>

## 抗审查性 {#censorship-resistance}

抗审查的网络意味着没有人可以阻止有效的交易上链。**分叉选择强制包含列表 (FOCIL，或 EIP-7805)** 赋予许多验证者对区块必须包含的内容的发言权：他们发布待处理交易的列表，区块构建者被要求包含这些交易。没有任何单一参与者可以悄悄地将你的交易排除在外。

FOCIL 是 Hegotá 升级的共识层重头戏，该升级紧随格拉姆斯特丹之后，目标定于 2027 年。它被刻意安排在格拉姆斯特丹之后，以便 ePBS 和 FOCIL 永远不会作为一个未经测试的组合一起发布。对加密内存池的研究仍在继续，该技术将隐藏等待中交易的内容，直到它们被安全地包含在区块中。

## 更快的最终性 {#faster-finality}

对用户而言，[最终性](/glossary/#finality)是交易变得永久不可逆的时刻，此时若要撤销交易，攻击者将付出巨额质押 ETH 的代价。如今，最终性大约需要 15 分钟，而**研究人员希望大幅缩短这一时间**。这项工作始于单时隙最终性，演变为三时隙最终性，现在作为 Minimmit 继续进行，这是 2025 年 7 月引入的精简以太坊 (Lean Ethereum) 计划中的单轮共识协议。秒级最终性是路线图草案中的一个长期北极星目标，预计在 2029 年左右实现。这仍然是活跃的研究领域，目前尚未有最终性升级被分配到任何分叉中。

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">更多关于更快最终性研究的信息</ButtonLink>

## 弹性验证者 {#resilient-validators}

验证者通常是一台持有单个签名密钥的机器。**分布式验证者技术 (DVT)** 用一个共享密钥并共同签名的机器委员会取代了那台单一机器，因此一台计算机发生故障或一个密钥被盗不会导致验证者宕机。DVT 已在生产环境中上线，并被质押运营商大规模使用。2026 年 1 月，维塔利克·布特林提出了一个简化的协议层变体，称为 DVT-lite；这是一个早期提案，尚未安排在任何分叉中。

网络还通过[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)来保护自身：以太坊运行在几个独立构建的软件实现上，因此一个客户端中的错误不会影响网络其余部分的正常运行。

两个早期的研究想法——视图合并 (view-merge) 和秘密领导者选举——已不再是活跃的路线图项目。

<ButtonLink variant="outline" href="/staking/dvt/">更多关于分布式验证者技术 (DVT) 的信息</ButtonLink>

## 抗量子性 {#quantum-resistance}

以太坊使用[密码学](/glossary/#cryptography)来保持网络安全并保护用户资金。最终，其中一些密码学方法将**容易受到量子计算机的攻击**，量子计算机解决特定数学问题的速度比经典机器快呈指数级。

<strong>如今没有任何量子计算机能够破解以太坊的密码学。</strong>所需的硬件尚未大规模存在。但最近的研究表明，这一差距缩小的速度比之前预期的要快。2026 年 3 月，Google Quantum AI 发表了一篇论文，估计破解 256 位椭圆曲线密码学（以太坊用于账户签名的类型）可能需要大约 1,200 个逻辑量子比特，比早期的估计少了约 20 倍。

密码学过渡需要数年时间来安全地规划和执行，因此准备工作现在正在进行中，远在硬件出现之前。已确定有四个领域需要进行后量子升级：验证者共识签名 (BLS)、用于数据可用性的承诺方案 (KZG)、账户签名 (ECDSA) 以及[汇总](/glossary/#rollups)使用的零知识证明 (ZK-proof) 系统。

以太坊基金会于 2026 年 1 月成立了一个专门的**后量子安全团队**，其工作在 [pq.ethereum.org](https://pq.ethereum.org) 上公开跟踪。活跃的工作包括基于哈希的验证者签名 (leanXMSS) 搭配一个最小化的 zkVM (leanVM)，以高效地聚合较大的量子安全签名，以及与 10 多个客户端团队每周进行的互操作性开发网测试。

过渡策略的一个关键部分是 **EIP-8141**，它引入了原生的[账户抽象](/roadmap/account-abstraction/)。这允许各个账户选择自己的签名验证，这意味着用户可以切换到量子安全签名，而无需等待单一的、全协议范围的迁移。EIP-8141 正在被考虑纳入 Hegotá 升级。核心后量子基础设施里程碑目标定于 2029 年左右完成。这些是规划目标，可能会发生变化。

<ExpandableCard title="量子计算机今天能窃取我的 ETH 吗？" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

不能。如今没有任何量子计算机能够破解以太坊的密码学。本页描述的工作是为几年后才会出现的威胁所做的早期准备。当后量子钱包可用时，钱包软件将引导你完成迁移。目前，你不需要做任何事情。

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">更多关于抗量子性的信息</ButtonLink>

## 更简单、更高效的协议 {#simpler-and-more-efficient-protocol}

复杂性会为错误和漏洞创造机会。路线图的一部分侧重于**简化以太坊并消除技术债务**，以便协议更容易维护、审计和推理。更简单的协议也使攻击者可探测的攻击面更小。

迄今已交付：

- **[佩克特拉 (2025 年 5 月)](/roadmap/pectra/)**：引入了 EIP-7702，它允许外部拥有账户临时委托给智能合约代码，这是迈向完全账户抽象的垫脚石。
- **[弗萨卡 (2025 年 12 月)](/roadmap/fusaka/)**：部署了 PeerDAS (EIP-7594)，它将数据可用性工作负载分布在整个网络中。还增加了斑点参数，扩大了汇总的数据吞吐量。
- **[Dencun (2024 年 3 月)](/roadmap/dencun/)**：引入了斑点交易 (EIP-4844) 以实现更便宜的 Rollup 数据，并限制了 `SELFDESTRUCT` (EIP-6780) 以消除一个长期存在的复杂性来源。
- **[沙佩拉 (2023 年 4 月)](/staking/withdrawals/)**：允许验证者提取质押的 ETH (EIP-4895)，消除了[权益证明 (PoS)](/glossary/#pos) 质押的早期限制。
- **伦敦 (2021 年 8 月)**：通过 EIP-1559 彻底改革了 Gas 定价，引入了基础费用和销毁机制，以实现更可预测的交易成本。

进行中：

- **格拉姆斯特丹 (目标定于 2026 年)**：重头戏是 ePBS (EIP-7732) 和区块级访问列表 (EIP-7928)，同时也在考虑 Gas 重新定价。
- **Hegotá (目标定于 2027 年)**：FOCIL (EIP-7805) 是共识层的重头戏。正在考虑纳入：EIP-8141（原生账户抽象）。
- **持续进行**：简化 [EVM](/developers/docs/evm/)、协调客户端实现以及逐步淘汰已弃用功能的努力在各个客户端团队中继续进行。关于无状态（让参与者在不存储所有数据的情况下验证链）的工作正在围绕量子安全的二叉哈希树进行重新设计，最终方法尚未确认。

## 当前进展 {#current-progress}

截至 2026 年中：

- **区块构建与抗审查性**：ePBS 和区块级访问列表正在格拉姆斯特丹开发网上运行。FOCIL 计划用于 Hegotá，目标定于 2027 年。
- **最终性**：Minimmit 和更广泛的精简以太坊 (Lean Ethereum) 共识工作仍在积极研究中，尚未分配到任何分叉。
- **抗量子性**：每周的后量子互操作性开发网正在运行，核心基础设施里程碑目标定于 2029 年左右。
- **简化**：佩克特拉和弗萨卡已发布；格拉姆斯特丹和 Hegotá 将进行下一轮清理。

这项工作的任何部分都尚未完成，所有时间表都是可能会发生变化的估计值。

## 延伸阅读 {#further-reading}

- [Forkcast：以太坊网络升级跟踪器](https://forkcast.org)
- [Strawmap：以太坊一层网络 (l1) 路线图草案](https://strawmap.org) - _以太坊基金会架构团队 (EF Architecture)_
- [后量子以太坊](https://pq.ethereum.org) - _以太坊基金会_
- [精简以太坊 (Lean Ethereum) 路线图跟踪器](https://leanroadmap.org) - _ReamLabs_
- [权益证明 (PoS) 与最终性](/developers/docs/consensus-mechanisms/pos/#finality)
- [EVM](/developers/docs/evm/)