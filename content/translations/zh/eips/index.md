---
title: 以太坊改进提案 (EIP)
description: 了解以太坊改进提案所需的基本信息
lang: zh
---

# 以太坊改进提案 (EIP) 介绍 {#introduction-to-ethereum-improvement-proposals}

## 什么是 EIP？ {#what-are-eips}

[以太坊改进提案 (EIP)](https://eips.ethereum.org/)是为以太坊潜在新功能或流程提出建议的标准。 EIP 包含提议改进的技术规范，并作为社区的“真相来源”。 在 EIP 的过程中，将会讨论和制定以太坊的网络升级和应用标准。

以太坊社区中的任何人都可以创造一个 EIP。 以太坊改进提案编写准则在 [EIP 1](https://eips.ethereum.org/EIPS/eip-1) 中提供。 以太坊改进提案应主要包括简明技术规范，并提供一些激励措施。 以太坊改进提案的创作者负责在社区内建立共识并记录不同意见。 从历史上看，大多数以太坊改进提案的创作者通常是应用程序或协议开发者，因为提交高水平的以太坊改进提案需要很强的技术能力。

## 为什么 EIP 很重要？ {#why-do-eips-matter}

EIP 作为一个中心角色，记载以太坊的变化并且记载在以太坊中。 它们是人们提议、辩论和适应变化的途径。 有[各种不同种类的以太坊改进提案](https://eips.ethereum.org/EIPS/eip-1#eip-types)，其中包括涉及底层协议更改，影响共识并需要网络升级的核心以太坊改进提案，例如 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)，还有应用程序标准相关的以太坊意见征求，例如 [EIP-20](https://eips.ethereum.org/EIPS/eip-20) 和 [EIP-721](https://eips.ethereum.org/EIPS/eip-721)。

每个网络升级都包含一组 EIP，需要网络上每个 [以太坊客户端](/learn/#clients-and-nodes)来执行。 这就意味着要想在以太坊主网上与其他客户端保持共识，客户端开发者需要确保他们已经全部实现了必需的以太坊改进提案。

在提供变更技术规格的同时，EIP 是以太坊社区治理的基本单位。任何人都可以自由提议，然后由社区不同的参与者讨论，决定是否将其发展为通用标准或者加入到网络升级中。 因为非核心以太坊改进提案不必被所有应用程序采用（例如，可以创建未实现 EIP-20 的同质化代币），而核心以太坊改进提案必须要广泛采用（因为所有节点都必须升级才能一直属于同一网络），因此与非核心以太坊改进提案相比，核心以太坊改进提案需要在社区内达成更广泛的共识。

## EIP 历史 {#history-of-eips}

[Ethereum Improvement Proposals (EIP) GitHub 存储库](https://github.com/ethereum/EIPs) 于 2015 年 10 月创建。 EIP 进程基于[比特币改进提议 (BIP)](https://github.com/bitcoin/bips) 进程。它本身基于 [Python 增强提议 (PEP)](https://www.python.org/dev/peps/) 进程。

以太坊改进提案编辑人员的任务是审查以太坊改进提案的技术可靠性、格式问题，并校正拼写、语法和代码风格。 Martin Becze、Vitalik Buterin、Gavin Wood 和其他一些人是 2015 年至 2016 年末最初的 EIP 编辑者。

现有以太坊改进提案编辑人员有

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

以太坊改进提案名誉编辑人员有

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

如果你想成为以太坊改进提案编辑人员，请查看 [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)。

以太坊改进提案编辑人员决定一个提议何时可以成为以太坊改进提案，并帮助以太坊改进提案创作者们推进他们的提议。 以太坊改进提案编辑人员和社区之间的会议由[以太坊牧猫人组织](https://www.ethereumcatherders.com/)协助组织（请参阅 [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)）。

完整的标准化流程和图表在 [EIP-1](https://eips.ethereum.org/EIPS/eip-1) 中描述

## 了解更多 {#learn-more}

如果你有兴趣详细了解以太坊改进提案，请查看[以太坊改进提案网站](https://eips.ethereum.org/)和[ EIP-1](https://eips.ethereum.org/EIPS/eip-1)。 下面是一些有用的链接：

- [以太坊改进提案列表](https://eips.ethereum.org/all)
- [所以太坊改进提案类型说明](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [所有以太坊改进提案状态说明](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### 社区教育项目 {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP 是一系列教学视频，讨论以太坊改进提案 (EIP) 和即将到来的升级中的关键特性。*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research) — *EIPs For Nerds 针对各种以太坊改进提案 (EIP)（包括核心以太坊改进提案以及应用程序/基础设施层以太坊改进提案 (ERC)）提供 ELI5 风格的全面概述，以教育读者并围绕以太坊协议的提议改进达成共识。*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf 提供以太坊改进提议 (EIP) 的额外信息，包括它们的状态、实现细节、相关拉取请求，以及社区反馈。*
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun 提供关于以太坊改进提议 (EIP)、以太坊改进提议会议更新等等的最新消息。*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight 根据从不同来源收集的信息，表示以太坊改进提议 (EIP) 流程和统计数据的状态。*

## 参与 {#participate}

任何人都可以创建以太坊改进提案。 提交提议之前，请务必阅读[ EIP-1](https://eips.ethereum.org/EIPS/eip-1)，其中概述了以太坊改进提案流程以及如何编写以太坊改进提案，而且在[以太坊魔术师](https://ethereum-magicians.org/)论坛上征求反馈意见并首先与社区讨论提议，然后再提交提议草案。

## 引用 {#references}

<cite class="citation">

网页内容部分来自 Hudson Jameson [以太坊协议开发治理和网络升级协调] (https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)

</cite>
