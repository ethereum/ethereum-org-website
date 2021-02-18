---
title: Data and analytics
description: How to get on-chain analytics and data for use in your dapps
lang: en
sidebar: true

---

## Introduction {#Introduction}

As utilization of the network continues to grow, an increasing amount of valuable information will exist in the on-chain data. As the volume of data rapidly increases, calculating and aggregating this information to report upon or drive a dApp can become a time and process heavy endeavor. 

Leveraging existing data providers can expedite development, produce more accurate results, and reduce on going maintenance efforts. This will enable a team to concentrate on the core functionality their project is trying to provide. 

## Prerequisites {#prerequisites}

You should understand the basic concept of [Block Explorers](/en/developers/docs/block-explorers/) in order to better understand using them in the data analytics context. In addition, familiarize yourself with the concept of an [index](/glossary/#index) to understand the benefits they add to a system design.

In terms of architectural fundamentals, understanding what an [API](https://www.wikipedia.org/wiki/API) and [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) are, even in theory.

## The Graph {#the-graph}

The [Graph Network](https://thegraph.com/) is a decentralized indexing protocol for organizing blockchain data. Instead of building and managing off-chain and centralized data stores to aggregate on-chain data, with The Graph, developers can build serverless applications that run entirely on public infrastructure.

Using [GraphQL](https://graphql.org/), developers can query any of the curated open APIs, known as sub-graphs, to acquire the necessary information they need to drive their dApp. By querying these indexed sub-graphs, Reports and dApps not only get performance and scalability benefits but also the built in accuracy provided by network consensus. As new improvements and/or sub-graphs are added to the network, your projects can rapidly iterate to take advantage of these enhancements.

## Block explorers {#block-explorers}

Many [Block Explorers](/en/developers/docs/block-explorers#block-explorers) offer [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) gateways that will provide developers visibility into real-time data on blocks, transactions, miners, accounts, and other on-chain activity.

Developers can then process and transform this data to give their users unique insights and interactions with the [blockchain](/glossary/#blockchain).

## Further Reading {#further-reading}

- [Graph Network Overview](https://thegraph.com/docs/network#overview)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [API code examples on EtherScan](https://etherscan.io/apis#contracts)   
 

