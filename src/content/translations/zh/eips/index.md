---
title: 以太坊改进提议 (EIP)
description: 了解以太坊改进提议 (EIP) 的基本信息。
lang: zh
---

# 隆重介绍以太坊改进提议（EIPs） {#introduction-to-ethereum-improvement-proposals-eips}

## 什么是 EIP？ {#what-are-eips}

[以太坊改进提议 (EIP)](https://eips.ethereum.org/)是为以太坊潜在新功能或流程提出建议的标准。 EIP 包含提议改进的技术规范，并作为社区的“真相来源”。 在 EIP 的过程中，将会讨论和制定以太坊的网络升级和应用标准。

以太坊社区中的任何人都可以创造一个 EIP。 关于如何编写 EIP，你可以在 [EIP 1](https://eips.ethereum.org/EIPS/eip-1) 中找到。 EIP 应提供功能及其原理的简明技术细节和提出的理由。 EIP 作者负责在社区内建立共识并记录反对意见。 提交一个高水平的 EIP 需要很强的技术能力，历史上，大多数 EIP 作者都是应用程序或者协议开发者。

## 为什么 EIP 很重要？ {#why-do-eips-matter}

EIP 作为一个中心角色，记载以太坊的变化并且记载在以太坊中。 它们是人们提议、辩论和适应变化的途径。 有[各种不同类型的 EIP](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types)，其中包括会影响共识并需要网络升级的用于底层协议更改的核心 EIP，以及用于应用程序标准的 ERC。 例如，创建 token 的标准，[ERC20](https://eips.ethereum.org/EIPS/eip-20) 或 [ERC721](https://eips.ethereum.org/EIPS/eip-721) 允许应用程序使用相同的规则处理所有 token，使得创建互操作应用程序更加容易。

每个网络升级都包含一组 EIP，需要网络上每个 [以太坊客户端](/learn/#clients-and-nodes)来执行。 这意味着要在以太坊主网上与其他客户达成共识， 客户端开发者需要确保他们都实现了所需的 EIP。

在提供变更技术规格的同时，EIP 是以太坊社区治理的基本单位。任何人都可以自由提议，然后由社区不同的参与者讨论，决定是否将其发展为通用标准或者加入到网络升级中。 因为非核心 EIP 不必被所有应用程序采纳（例如，您可以创建一个非 [ERC20 代币](https://eips.ethereum.org/EIPS/eip-20))，但核心 EIP 必须被广泛采用（因为所有节点都必须升级，才能保证其属于同一网络的一部分），与非核心 EIP 相比，核心 EIP 需要在社区内达成更广泛的共识。

## EIP 历史 {#history-of-eips}

[Ethereum Improvement Proposals (EIP) Github 存储库](https://github.com/ethereum/EIPs) 于 2015 年 10 月创建。 EIP 进程基于[比特币改进提议 (BIP)](https://github.com/bitcoin/bips) 进程。它本身基于 [Python 增强提议 (PEP)](https://www.python.org/dev/peps/) 进程。

EIP 编辑人员的任务是审查 EIP 的技术可靠性、正确的拼写/语法和代码风格。 Martin Becze、Vitalik Buterin、Gavin Wood 和其他一些人是 2015 年至 2016 年末最初的 EIP 编辑者。

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

以太坊改进提案编辑人员与[以太坊牧猫人组织](https://ethereumcatherders.com/)及 [Ethererum Magicians](https://ethereum-magicians.org/) 社区的成员共同决定要实施的以太坊改进提案，共同负责以太坊改进提案的推广以及推动以太坊改进提案进入“定稿”或“已撤销”阶段。

完整的标准化流程和图表在 [EIP-1](https://eips.ethereum.org/EIPS/eip-1) 中描述

## 查看更多 {#learn-more}

如果你有兴趣阅读更多关于以太坊改进提案的信息，请查看[以太坊改进提案网站](https://eips.ethereum.org/)，该网站提供了更多信息，包括：

- [各种不同类型的以太坊改进提案](https://eips.ethereum.org/)
- [已编制以太坊改进提案清单](https://eips.ethereum.org/all)
- [以太坊改进提案的状态和含义](https://eips.ethereum.org/)

## 参与 {#participate}

任何人都可以编制以太坊改进提案或以太坊意见征求，但编制前应该先阅读 [EIP-1](https://eips.ethereum.org/EIPS/eip-1)，其中概述了以太坊改进提案流程、什么是以太坊改进提案、以太坊改进提案类型、以太坊改进提案文件内容、以太坊改进提案的格式和模板、以太坊改进提案编辑人员名单以及在编制以太坊改进提案之前你需要了解的所有以太坊改进提案相关内容。 你新编制的以太坊改进提案应该定义新功能，新功能不太复杂，但也不太小众，可以在以太坊生态系统的项目中使用。 最难的部分是推广，作为创作者，需要促使人们关注你的以太坊改进提案，收集反馈，撰写文章描述你的以太坊改进提案解决的问题，并与项目合作实施你的以太坊改进提案。

如果你有兴趣关注讨论过程或分享你对以太坊改进提案的看法意见，请查看 [Ethereum Magicans 论坛](https://ethereum-magicians.org/)，在那里与社区讨论以太坊改进提案。

另请参见：

- [如何编制以太坊改进提案](https://eips.ethereum.org/EIPS/eip-1)

## 引用 {#references}

<cite class="citation">

网页内容部分来自 Hudson Jameson [以太坊协议开发治理和网络升级协调](https://hudsonjameson.com/2020-03-23-thero-protocol-development-governance-and-network-upde-coordination/)

</cite>
