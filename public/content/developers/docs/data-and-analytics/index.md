---
title: Data and analytics
description: How to get on-chain analytics and data for use in your dapps
lang: en
---

## Introduction {#Introduction}

As utilization of the network continues to grow, an increasing amount of valuable information will exist in the on-chain data. As the volume of data rapidly increases, calculating and aggregating this information to report upon or drive a dapp can become a time and process heavy endeavor.

Leveraging existing data providers can expedite development, produce more accurate results, and reduce ongoing maintenance efforts. This will enable a team to concentrate on the core functionality their project is trying to provide.

## Prerequisites {#prerequisites}

You should understand the basic concept of [Block Explorers](/developers/docs/data-and-analytics/block-explorers/) in order to better understand using them in the data analytics context. In addition, familiarize yourself with the concept of an [index](/glossary/#index) to understand the benefits they add to a system design.

In terms of architectural fundamentals, understanding what an [API](https://www.wikipedia.org/wiki/API) and [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) are, even in theory.

## Block explorers {#block-explorers}

Many [Block Explorers](/developers/docs/data-and-analytics/block-explorers/) offer [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) gateways that will provide developers visibility into real-time data on blocks, transactions, validators, accounts, and other on-chain activity.

Developers can then process and transform this data to give their users unique insights and interactions with the [blockchain](/glossary/#blockchain). For example, [Etherscan](https://etherscan.io) provides execution and consensus data for every 12s slot.

## The Graph {#the-graph}

The [Graph Network](https://thegraph.com/) is a decentralized indexing protocol for organizing blockchain data. Instead of building and managing off-chain and centralized data stores to aggregate on-chain data, with The Graph, developers can build serverless applications that run entirely on public infrastructure.

Using [GraphQL](https://graphql.org/), developers can query any of the curated open APIs, known as sub-graphs, to acquire the necessary information they need to drive their dapp. By querying these indexed sub-graphs, Reports and dapps not only get performance and scalability benefits but also the built in accuracy provided by network consensus. As new improvements and/or sub-graphs are added to the network, your projects can rapidly iterate to take advantage of these enhancements.

## Client diversity

[Client diversity](/developers/docs/nodes-and-clients/client-diversity/) is important for the overall health of the Ethereum network because it provides resilience to bugs and exploits. There are now several client diversity dashboards including [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) and [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) pre-processes blockchain data into relational database (DuneSQL) tables, allows users to query blockchain data using SQL and build dashboards based on query results. On-chain data are organized into 4 raw tables: `blocks`, `transactions`, (event) `logs` and (call) `traces`. Popular contracts and protocols have been decoded, and each has its own set of event and call tables. Those event and call tables are processed further and organized into abstraction tables by the type of protocols, for example, dex, lending, stablecoins, etc.

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) is a leading data indexer that gives developers fast, reliable, decentralized, and customized APIs for their web3 projects. SubQuery empower developers from over 165+ ecosystems (including Ethereum) with rich indexed data to build an intuitive and immersive experiences for their users. The SubQuery Network powers your unstoppable apps with a resilient and decentralized infrastructure network. Use SubQuery's blockchain developer toolkit to build the web3 applications of the future, without spending time building a custom backend for data processing activities.

To start, visit the [Ethereum quick start guide](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) to start indexing Ethereum blockchain data in minutes in a local Docker environment for testing before going live on a [SubQuery's managed service](https://managedservice.subquery.network/) or on [SubQuery's decentralised network](https://app.subquery.network/dashboard).

## Ethernow - Mempool Data Program {#ethernow}
[Blocknative](https://www.blocknative.com/) provides open access to its Ethereum historical [mempool data archive](https://www.ethernow.xyz/mempool-data-archive). This enables researchers and community good projects to explore the pre-chain layer of Ethereum Mainnet. The data set is actively maintained and represents the most comprehensive historical record of mempool transaction events within the Ethereum ecosystem. Learn more at [Ethernow](https://www.ethernow.xyz/). 

## Further Reading {#further-reading}

- [Graph Network Overview](https://thegraph.com/docs/en/about/network/)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [API code examples on EtherScan](https://etherscan.io/apis#contracts)
- [Beaconcha.in Beacon Chain explorer](https://beaconcha.in)
- [Dune Basics](https://docs.dune.com/#dune-basics)
- [SubQuery Ethereum Quick Start Guide](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
