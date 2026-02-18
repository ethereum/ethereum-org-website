---
title: "数据和分析"
description: "如何获取在链分析和数据以用于你的去中心化应用程序"
lang: zh
---

## 简介 {#Introduction}

随着网络利用率不断提高，链上数据中将有越来越多有价值的信息。 随着数据量的迅速增加，计算和汇总此信息以报告或驱动一个去中心化应用程序可能变成很费时间和体力的过程。

利用现有数据提供商可以加快开发、产生更准确的结果，并减少持续的维护工作。 这将使一个团队能够集中精力处理试图在项目中提供的核心功能。

## 前提条件 {#prerequisites}

你应该了解[区块浏览器](/developers/docs/data-and-analytics/block-explorers/)的基本概念，以便更好地理解在数据分析环境中使用它们。 此外，请熟悉[索引](/glossary/#index)的概念，以了解其为系统设计带来的好处。

在架构基础方面，即使只是理论上，也要了解什么是 [API](https://www.wikipedia.org/wiki/API) 和 [REST](https://www.wikipedia.org/wiki/Representational_state_transfer)。

## 区块浏览器 {#block-explorers}

许多[区块浏览器](/developers/docs/data-and-analytics/block-explorers/)都提供 [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) 网关，让开发者能够查看有关区块、交易、验证者、帐户及其他链上活动的实时数据。

然后，开发者可以处理和转换这些数据，为其用户提供与[区块链](/glossary/#blockchain)的独特见解和互动。 例如，[Etherscan](https://etherscan.io) 和 [Blockscout](https://eth.blockscout.com) 为每个 12 秒的时隙提供执行层和共识层数据。

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) 是一个索引协议，通过被称为子图 (subgraphs) 的开放 API 提供便捷的区块链数据查询方式。

使用 The Graph，开发者可以获得以下优势：

- 去中心化索引：通过多个索引者索引区块链数据，从而消除任何单点故障
- GraphQL 查询：提供强大的 GraphQL 接口用于查询已索引数据，使数据检索极为便捷
- 自定义：定义您自己的逻辑来转换和存储区块链数据，并重用 The Graph 网络上其他开发者发布的子图。

请按照此[快速入门](https://thegraph.com/docs/en/quick-start/)指南，在 5 分钟内创建、部署和查询子图。

## 客户端多样性 {#client-diversity}

[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)对以太坊网络的整体健康至关重要，因为它能针对程序错误和漏洞利用提供弹性。 现在有多个客户端多样性仪表板，包括 [clientdiversity.org](https://clientdiversity.org/)、[rated.network](https://www.rated.network)、[supermajority.info](https://supermajority.info//) 和 [Ethernodes](https://ethernodes.org/)。

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) 对区块链数据进行预处理，并存入关系型数据库 (DuneSQL) 表中，以便用户能够使用 SQL 查询区块链数据并基于查询结果构建仪表板。 链上数据整理到 4 个原始表中：`blocks`、`transactions`、（事件）`logs` 和（调用）`traces`。 常见的合约和协议都已解码，并且每个都有自己的事件集和调用表。 这些事件和调用表被进一步处理并按协议类型组织成抽象表，例如去中心化交易所、借贷、稳定币等。

## SQD {#sqd}

[SQD](https://sqd.dev/) 是一个去中心化的超大规模可扩展数据平台，经过优化，可提供对海量数据的高效、无许可访问。 它目前提供历史链上数据，包括事件日志、交易收据、轨迹以及每笔交易的状态差异。 SQD 提供强大的工具箱，用于创建自定义数据提取和处理管道，使索引速度达到最高每秒 15 万区块。

要开始使用，请访问[文档](https://docs.sqd.dev/)或查看可使用 SQD 构建的 [EVM 示例](https://github.com/subsquid-labs/squid-evm-examples)。

## SubQuery 网络 {#subquery-network}

[SubQuery](https://subquery.network/) 是一个领先的数据索引器，可为开发者的 web3 项目提供快速、可靠、去中心化和定制化的 API。 SubQuery 为超过 165 个生态系统（包括以太坊）的开发者赋能，利用丰富的索引数据，为他们的用户构建直观的、沉浸式体验。 SubQuery 网络通过其富有韧性且去中心化的网络基础设施，为你势不可挡的应用程序提供支持。 使用 SubQuery 的区块链开发者工具包来构建未来的 Web3 应用程序，无需花费时间为数据处理活动搭建定制的后端。

要开始使用，请访问[以太坊快速入门指南](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html)，以便在几分钟内于本地 Docker 环境中开始索引以太坊区块链数据进行测试，然后再上线到 [SubQuery 的托管服务](https://managedservice.subquery.network/)或 [SubQuery 的去中心化网络](https://app.subquery.network/dashboard)。

## EVM 查询语言 {#evm-query-language}

EVM 查询语言 (EQL) 是一种类似 SQL 的语言，旨在查询 EVM（以太坊虚拟机）链的信息。 EQL 的目标是对 EVM 链一等实体（区块、账户和交易）进行复杂的关系查询，同时为开发人员和研究人员提供日常使用的人体工程学语法。 使用 EQL，开发人员可以使用熟悉的类似 SQL 的语法获取区块链数据，无需复杂的样板代码。 EQL 支持标准区块链数据请求（例如，检索以太坊上帐户的随机数和余额或了解当前区块大小和时间戳），并且不断支持更复杂的请求和功能。

## 扩展阅读 {#further-reading}

- [探索加密数据 I：数据流架构](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Graph 网络概述](https://thegraph.com/docs/en/about/)
- [Graph 查询演练场](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Etherscan 上的 API 代码示例](https://etherscan.io/apis#contracts)
- [Blockscout 上的 API 文档](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in 信标链浏览器](https://beaconcha.in)
- [Dune 基础知识](https://docs.dune.com/#dune-basics)
- [SubQuery 以太坊快速入门指南](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [SQD 网络概述](https://docs.sqd.dev/)
- [EVM 查询语言](https://eql.sh/blog/alpha-release-notes)
