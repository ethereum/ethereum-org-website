---
title: 数据和分析学
description: 如何获取在链分析和数据以用于您的去中心化应用程序。
lang: zh
---

## 介绍 {#Introduction}

随着网络利用率不断提高，链上数据中将有越来越多的宝贵信息。 随着数据量的迅速增加，计算和汇总此信息以报告或驱动一个去中心化应用程序可能变成很费时间和体力的过程。

利用现有数据提供商可以加快发展，产生更准确的结果，并减少正在进行的维护工作。 这将使一个团队能够集中精力处理试图在项目中提供的核心功能。

## 前提条件 {#prerequisites}

您应该理解[区块浏览器](/developers/docs/data-and-analytics/block-explorers/) 的基本概念，以便更好地理解在数据分析环境中使用它们。 此外，熟悉[索引](/glossary/#index)概念，以了解它们给系统设计带来的好处。

就架构基础而言，也要从理论上了解[应用程序接口](https://www.wikipedia.org/wiki/API)和 [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) 是什么。

## 区块浏览器 {#block-explorers}

许多[区块浏览器](/developers/docs/data-and-analytics/block-explorers/)提供 [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [应用程序接口](https://www.wikipedia.org/wiki/API)网关，它将使开发者可以看见区块上的实时数据、交易、矿工、帐户和其他链上活动。

然后开发者可以处理和转换此数据，让他们的用户有独特的洞察力并与[区块链](/glossary/#blockchain)交互。 例如，[Etherscan](https://etherscan.io) 在每个 12 秒时隙都提供执行和共识数据。

## Graph {#the-graph}

[Graph 网络](https://thegraph.com/)是用于组织区块链数据的去中心化索引协议。 通过 Graph 网络，开发者可以建立完全在公共基础设施上运行的无服务器应用程序，而不是建立和管理链外和集中的数据存储来聚合链上数据。

使用 [GraphQL](https://graphql.org/)，开发人员可以查询任何管理的开放应用程序接口（称为子图），以获取驱动去中心化应用程序所需的信息。 通过查询这些索引子图，报告和去中心化应用程序不仅可以获得性能和可扩展性优势，还可以获得网络共识提供的内置准确性。 当网络中新增改进和/或子图表时，你的项目可以快速迭代，以利用这些增强功能。

## 客户端多样性

[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)对于以太坊网络的整体健康很重要，因为它提供了对错误和漏洞利用的弹性。 现在有多个客户端多样性仪表板，包括 [clientdiversity.org](https://clientdiversity.org/)、[rated.network](rated.network)、[pool.invis.cloud](pool.invis.cloud)、[slashed.info](slashed.info) 和 [Ethernodes](https://ethernodes.org/)。

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) 对区块链数据进行预处理，并存入关系型数据库（PostgreSQL 和 DatabricksSQL）表中，以便用户可以使用结构化查询语言 (SQL) 查询区块链数据并基于查询结果构建仪表板。 链上数据被组织为 4 个原始表：`blocks`、`transactions`、（事件）`logs` 和（调用）`traces`。 常见的合约和协议都已解码，并且每个都有自己的事件集和调用表。 这些事件和调用表被进一步处理并按协议类型组织成抽象表，例如 DEX、借贷、稳定币等。

## 延伸阅读 {#further-reading}

- [Graph 网络概览](https://thegraph.com/docs/en/about/network/)
- [Graph 查询实战](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan 上的应用程序接口代码示例](https://etherscan.io/apis#contracts)
- [Beaconcha.in 信标链浏览器](https://beaconcha.in)
- [Dune 基础知识](https://docs.dune.com/#dune-basics)
