---
title: "数据与分析"
description: "如何获取链上分析和数据以在你的去中心化应用 (dapp) 中使用"
lang: zh
---

## 简介 {#introduction}

随着网络利用率的不断增长，链上数据中将存在越来越多有价值的信息。随着数据量的快速增加，计算和聚合这些信息以进行报告或驱动去中心化应用 (dapp) 可能会成为一项耗时且繁重的任务。

利用现有的数据提供商可以加快开发速度，产生更准确的结果，并减少持续的维护工作。这将使团队能够专注于其项目试图提供的核心功能。

## 前提条件 {#prerequisites}

你应该了解[区块浏览器](/developers/docs/data-and-analytics/block-explorers/)的基本概念，以便更好地理解在数据分析环境中使用它们。此外，请熟悉[索引](/glossary/#index)的概念，以了解它们为系统设计带来的好处。

在架构基础方面，即使只是在理论上，也要了解什么是 [API](https://www.wikipedia.org/wiki/API) 和 [REST](https://www.wikipedia.org/wiki/Representational_state_transfer)。

## 区块浏览器 {#block-explorers}

许多[区块浏览器](/developers/docs/data-and-analytics/block-explorers/)提供 [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) 网关，为开发者提供有关区块、交易、验证者、账户和其他链上活动的实时数据的可见性。

然后，开发者可以处理和转换这些数据，为用户提供独特的见解以及与[区块链](/glossary/#blockchain)的交互。例如，[Etherscan](https://etherscan.io) 和 [Blockscout](https://eth.blockscout.com) 为每个 12 秒的时隙提供执行和共识数据。

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) 是一个索引协议，它提供了一种通过称为子图的开放 API 查询区块链数据的简便方法。

借助 The Graph，开发者可以受益于：

- 去中心化索引：能够通过多个索引器对区块链数据进行索引，从而消除任何单点故障
- GraphQL 查询：提供强大的 GraphQL 接口来查询索引数据，使数据检索变得极其简单
- 定制化：定义你自己的逻辑来转换和存储区块链数据，并重用其他开发者在 The Graph 网络上发布的子图

按照此[快速入门](https://thegraph.com/docs/en/quick-start/)指南，在 5 分钟内创建、部署和查询子图。

## 客户端多样性 {#client-diversity}

[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)对于以太坊网络的整体健康非常重要，因为它提供了对漏洞和攻击的弹性。现在有几个客户端多样性仪表板，包括 [clientdiversity.org](https://clientdiversity.org/)、[rated.network](https://www.rated.network)、[supermajority.info](https://supermajority.info//) 和 [Ethernodes](https://ethernodes.org/)。

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) 将区块链数据预处理为关系数据库 (DuneSQL) 表，允许用户使用 SQL 查询区块链数据并根据查询结果构建仪表板。链上数据被组织成 4 个原始表：`blocks`、`transactions`、（事件）`logs` 和（调用）`traces`。流行的合约和协议已被解码，并且每个都有自己的一组事件和调用表。这些事件和调用表被进一步处理，并按协议类型（例如去中心化交易所 (DEX)、借贷、稳定币等）组织成抽象表。

## SQD {#sqd}

[SQD](https://sqd.dev/) 是一个去中心化的超可扩展数据平台，经过优化，可提供对大量数据的高效、无需许可的访问。它目前提供历史链上数据，包括事件日志、交易收据、追踪以及每笔交易的状态差异。SQD 提供了一个强大的工具包，用于创建自定义数据提取和处理管道，实现高达每秒 15 万个区块的索引速度。

要开始使用，请访问[文档](https://docs.sqd.dev/)或查看你可以使用 SQD 构建的 [EVM 示例](https://github.com/subsquid-labs/squid-evm-examples)。

## SubQuery 网络 {#subquery-network}

[SubQuery](https://subquery.network/) 是一个领先的数据索引器，为开发者提供快速、可靠、去中心化且定制化的 API，用于他们的 Web3 项目。SubQuery 为来自 165 个以上生态系统（包括以太坊）的开发者提供丰富的索引数据，以构建直观且沉浸式的用户体验。SubQuery 网络通过弹性和去中心化的基础设施网络为你不可阻挡的应用提供动力。使用 SubQuery 的区块链开发者工具包来构建未来的 Web3 应用，而无需花费时间为数据处理活动构建自定义后端。

要开始使用，请访问[以太坊快速入门指南](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html)，在几分钟内于本地 Docker 环境中开始索引以太坊区块链数据进行测试，然后再在 [SubQuery 的托管服务](https://managedservice.subquery.network/)或 [SubQuery 的去中心化网络](https://app.subquery.network/dashboard)上线。

## Codex {#codex}

[Codex](https://www.codex.io/) 是一个实时区块链数据 API，为 80 多个网络中的 7000 多万种代币提供丰富的数据。开发者可以访问结构化的代币定价、钱包余额、交易历史和聚合分析（交易量、流动性、独立钱包），而无需维护自定义索引基础设施。Codex 支持通过 WebSocket 和 webhook 集成实现亚秒级的数据交付。

要开始使用，请访问[文档](https://docs.codex.io)，尝试使用[浏览器](https://docs.codex.io/explore)，或在[仪表板](https://dashboard.codex.io/signup)注册。

## EVM 查询语言 {#evm-query-language}

EVM 查询语言 (EQL) 是一种类似 SQL 的语言，旨在查询 EVM（以太坊虚拟机）链。EQL 的最终目标是支持对 EVM 链一等公民（区块、账户和交易）进行复杂的关系查询，同时为开发者和研究人员提供符合人体工程学的日常使用语法。借助 EQL，开发者可以使用熟悉的类似 SQL 的语法获取区块链数据，并消除对复杂样板代码的需求。EQL 支持标准的区块链数据请求（例如，检索以太坊上账户的随机数和余额，或获取当前区块大小和时间戳），并不断增加对更复杂请求和功能集的支持。

## 延伸阅读 {#further-reading}

- [探索加密货币数据 I：数据流架构](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Graph 网络概述](https://thegraph.com/docs/en/about/)
- [Graph 查询游乐场](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan 上的 API 代码示例](https://etherscan.io/apis#contracts)
- [Blockscout 上的 API 文档](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in 信标链浏览器](https://beaconcha.in)
- [Dune 基础知识](https://docs.dune.com/#dune-basics)
- [SubQuery 以太坊快速入门指南](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [SQD 网络概述](https://docs.sqd.dev/)
- [EVM 查询语言](https://web.archive.org/web/20250719151453/https://www.eql.sh/blog/alpha-release-notes)

## 教程：数据与分析 / 以太坊上的 SQL {#tutorials}

- [使用 SQL 学习以太坊基础主题](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– 使用 SQL 查询以太坊链上数据，以了解交易、区块和 Gas 基础知识。_
