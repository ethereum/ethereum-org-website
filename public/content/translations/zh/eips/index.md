---
title: 以太坊改进提案 (EIP) 简介
metaTitle: 以太坊改进提案 (EIP)
description: 了解 EIP 所需的基本信息
lang: zh
---

## 什么是 EIP？ {#what-are-eips}

[以太坊改进提案 (EIP)](https://eips.ethereum.org/) 是规定以太坊潜在新功能或流程的标准。EIP 包含所提议更改的技术规范，并作为社区的“事实来源”。[以太坊](/)的网络升级和应用标准都是通过 EIP 流程进行讨论和开发的。

以太坊社区内的任何人都可以创建 EIP。编写 EIP 的指南包含在 [EIP-1](https://eips.ethereum.org/EIPS/eip-1) 中。EIP 应主要提供简明的技术规范以及少量的动机说明。EIP 作者负责在社区内达成共识并记录不同意见。鉴于提交格式良好的 EIP 的技术门槛很高，从历史上看，大多数 EIP 作者通常是应用或协议开发者。

## 为什么 EIP 很重要？ {#why-do-eips-matter}

EIP 在以太坊上如何发生更改以及如何记录更改方面发挥着核心作用。它们是人们提议、辩论和采用更改的途径。有[不同类型的 EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)，包括用于影响共识并要求网络升级的底层协议更改的核心 EIP（如 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)），以及用于应用标准的 ERC（如 [EIP-20](https://eips.ethereum.org/EIPS/eip-20) 和 [EIP-721](https://eips.ethereum.org/EIPS/eip-721)）。

每次网络升级都包含一组需要由网络上的每个[以太坊客户端](/learn/#clients-and-nodes)实现的 EIP。这意味着，为了与以太坊主网上的其他客户端保持共识，客户端开发者需要确保他们已经实现了所有要求的 EIP。

除了为更改提供技术规范外，EIP 还是以太坊中进行治理的单位：任何人都可以自由提出 EIP，然后社区中的各个利益相关者将进行辩论，以决定是否应将其作为标准采用或包含在网络升级中。因为非核心 EIP 不必被所有应用采用（例如，可以创建一个不实现 EIP-20 的同质化代币），但核心 EIP 必须被广泛采用（因为所有节点都必须升级才能继续作为同一网络的一部分），所以核心 EIP 比非核心 EIP 需要在社区内达成更广泛的共识。

## EIP 的历史 {#history-of-eips}

[以太坊改进提案 (EIP) GitHub 仓库](https://github.com/ethereum/EIPs)创建于 2015 年 10 月。EIP 流程基于[比特币改进提案 (BIP)](https://github.com/bitcoin/bips) 流程，而后者本身又基于[ Python 增强提案 (PEP)](https://www.python.org/dev/peps/) 流程。

EIP 编辑的任务是审查 EIP 的技术合理性、格式问题，并纠正拼写、语法和代码风格。马丁·贝采、维塔利克·布特林、加文·伍德以及其他几位是 2015 年至 2016 年底的初代 EIP 编辑。

现任 EIP 编辑包括：

- 亚历克斯·贝雷格萨西 (@axic)
- 加文·约翰 (@Pandapip1)
- 格雷格·科尔文 (@gcolvin)
- 马特·加内特 (@lightclient)
- 萨姆·威尔逊 (@SamWilsn)

名誉 EIP 编辑包括：

- 凯西·德特里奥 (@cdetrio)
- 哈德森·詹姆森 (@Souptacular)
- 马丁·贝采 (@wanderer)
- 迈卡·佐尔图 (@MicahZoltu)
- 尼克·约翰逊 (@arachnid)
- 尼克·塞弗斯 (@nicksavers)
- 维塔利克·布特林 (@vbuterin)

如果你想成为一名 EIP 编辑，请查看 [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)。

EIP 编辑决定提案何时准备好成为 EIP，并帮助 EIP 作者推进他们的提案。[Ethereum Cat Herders](https://www.ethereumcatherders.com/) 协助组织 EIP 编辑与社区之间的会议（参见 [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)）。

完整的标准化流程以及图表在 [EIP-1](https://eips.ethereum.org/EIPS/eip-1) 中有详细说明。

## 了解更多 {#learn-more}

如果你有兴趣阅读更多关于 EIP 的内容，请查看 [EIP 网站](https://eips.ethereum.org/)和 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)。以下是一些有用的链接：

- [所有以太坊改进提案的列表](https://eips.ethereum.org/all)
- [所有 EIP 类型的说明](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [所有 EIP 状态的说明](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### 社区教育项目 {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP 是一个教育视频系列，讨论以太坊改进提案 (EIP) 以及即将到来的升级的关键功能。*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf 提供有关以太坊改进提案 (EIP) 的额外信息，包括其状态、实现细节、相关的拉取请求以及社区反馈。* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun 提供有关以太坊改进提案 (EIP) 的最新新闻、EIP 会议的更新等内容。*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight 根据从不同资源收集的信息，展示了以太坊改进提案 (EIP) 流程的状态和统计数据。*

## 参与 {#participate}

任何人都可以创建 EIP。在提交提案之前，必须阅读 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)，其中概述了 EIP 流程以及如何编写 EIP，并在 [Ethereum Magicians](https://ethereum-magicians.org/) 上征求反馈，在提交草案之前，提案会首先在那里与社区进行讨论。

## 参考文献 {#references}

<cite class="citation">

页面内容部分由哈德森·詹姆森的[以太坊协议开发治理与网络升级协调](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)提供

</cite>