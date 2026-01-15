---
title: "以太坊改进提案 (EIP)"
description: "了解以太坊改进提案所需的基本信息"
lang: zh
---

# 以太坊改进提议 (EIP) 简介 {#introduction-to-ethereum-improvement-proposals}

## 什么是 EIP？ {#what-are-eips}

[以太坊改进提议 (EIP)](https://eips.ethereum.org/) 是为以太坊指定潜在新功能或流程的标准。 EIP 包含提议改进的技术规范，并作为社区的“真相来源”。 在 EIP 的过程中，将会讨论和制定以太坊的网络升级和应用标准。

以太坊社区中的任何人都可以创造一个 EIP。 编写 EIP 的指南包含在 [EIP-1](https://eips.ethereum.org/EIPS/eip-1) 中。 以太坊改进提案应主要包括简明技术规范，并提供一些激励措施。 以太坊改进提案的创作者负责在社区内建立共识并记录不同意见。 从历史上看，大多数以太坊改进提案的创作者通常是应用程序或协议开发者，因为提交高水平的以太坊改进提案需要很强的技术能力。

## 为什么 EIP 很重要？ {#why-do-eips-matter}

EIP 作为一个中心角色，记载以太坊的变化并且记载在以太坊中。 它们是人们提出、讨论和采纳变更的途径。 EIP 有[多种不同类型](https://eips.ethereum.org/EIPS/eip-1#eip-types)，包括用于影响共识且需要进行网络升级（例如 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)）的低级别协议变更的核心 EIP，以及用于应用程序标准（例如 [EIP-20](https://eips.ethereum.org/EIPS/eip-20) 和 [EIP-721](https://eips.ethereum.org/EIPS/eip-721)）的 ERC。

每次网络升级都包含一组 EIP，网络上的每个[以太坊客户端](/learn/#clients-and-nodes)都需要实现这些 EIP。 这就意味着要想在以太坊主网上与其他客户端保持共识，客户端开发者需要确保他们已经全部实现了必需的以太坊改进提案。

在提供变更技术规格的同时，EIP 是以太坊社区治理的基本单位。任何人都可以自由提议，然后由社区不同的参与者讨论，决定是否将其发展为通用标准或者加入到网络升级中。 因为非核心以太坊改进提案不必被所有应用程序采用（例如，可以创建未实现 EIP-20 的同质化代币），而核心以太坊改进提案必须要广泛采用（因为所有节点都必须升级才能一直属于同一网络），因此与非核心以太坊改进提案相比，核心以太坊改进提案需要在社区内达成更广泛的共识。

## EIP 的历史 {#history-of-eips}

[以太坊改进提议 (EIP) GitHub 代码库](https://github.com/ethereum/EIPs)创建于 2015 年 10 月。 EIP 流程基于[比特币改进提议 (BIP)](https://github.com/bitcoin/bips) 流程，而 BIP 流程本身又基于[Python 增强提案 (PEP)](https://www.python.org/dev/peps/) 流程。

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

若想成为 EIP 编辑，请查阅 [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)。

以太坊改进提案编辑人员决定一个提议何时可以成为以太坊改进提案，并帮助以太坊改进提案创作者们推进他们的提议。 [Ethereum Cat Herders](https://www.ethereumcatherders.com/) 帮助组织 EIP 编辑与社区之间的会议（参见 [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)）。

[EIP-1](https://eips.ethereum.org/EIPS/eip-1) 中描述了完整的标准化流程及图表。

## 了解更多 {#learn-more}

若有兴趣阅读更多关于 EIP 的信息，请查看 [EIP 网站](https://eips.ethereum.org/)和 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)。 下面是一些有用的链接：

- [所有以太坊改进提议的列表](https://eips.ethereum.org/all)
- [所有 EIP 类型的说明](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [所有 EIP 状态的说明](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### 社区教育项目 {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP 是一个教育视频系列，讨论以太坊改进提议 (EIP) 和即将进行的升级的关键特性。_
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf 为以太坊改进提议 (EIP) 提供额外信息，包括其状态、实现详情、相关拉取请求和社区反馈。_
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun 提供有关以太坊改进提议 (EIP) 的最新消息、EIP 会议的最新动态等。_
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight 根据从不同资源收集的信息，展示以太坊改进提议 (EIP) 流程的状态和统计数据。_

## 参与 {#participate}

任何人都可以创建以太坊改进提案。 在提交提案前，必须阅读 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)（其中概述了 EIP 流程以及如何编写 EIP），并在 [Ethereum Magicians](https://ethereum-magicians.org/) 论坛上征求反馈。提案草案在提交前会先在该论坛上与社区进行讨论。

## 参考文献 {#references}

<cite class="citation">

网页内容部分来自 Hudson Jameson [以太坊协议开发治理和网络升级协调](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)

</cite>
