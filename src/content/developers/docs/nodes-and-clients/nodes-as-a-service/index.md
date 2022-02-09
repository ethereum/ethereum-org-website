---
title: Nodes as a service
description: An entry-level overview of node services, the pros and cons, and popular providers.
lang: en
sidebar: true
sidebarDepth: 2
---

## Introduction {#Introduction}

Running your own [Ethereum node](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) can be challenging, especially when getting started or while scaling fast. There are a [number of services](#popular-node-services) that run optimized node infrastructures for you, so you can focus on developing your application or product instead. We'll explain how node services work, the pros and cons for using them and list providers if you are interested in getting started.

## Prerequisites {#prerequisites}

If you don't already have an understanding of what nodes and clients are, check out [Nodes and clients](/developers/docs/nodes-and-clients/).

## How do node services work? {#how-do-node-services-work}

Node service providers run distributed node clients behind the scenes for you, so you don't have to.

These services typically provide an API key that you can use to write to and read from the blockchain. They often include access to [Ethereum testnets](/developers/docs/networks/#testnets) in addition to Mainnet.

Some services offer you your own dedicated node that they manage for you, while others use load balancers to distribute activity across nodes.

Almost all node services are extremely easy to integrate with, involving one line changes in your code to swap out your self hosted node, or even switch between the services themselves.

Often times node services will run a variety of [node clients](/developers/docs/nodes-and-clients/#execution-clients) and [types](/developers/docs/nodes-and-clients/#node-types), allowing you to access full and archive nodes in addition to client specific methods in one API.

It's important to note that node services do not and should not store your private keys or information.

## What are the benefits of using a node service? {#benefits-of-using-a-node-service}

The main benefit for using a node service is not having to spend engineering time maintaining and managing nodes yourself. This allows you to focus on building your product rather than having to worry about infrastructure maintenance.

Running your own nodes can be very expensive from storage to bandwidth to valuable engineering time. Things like spinning up more nodes when scaling, upgrading nodes to the latest versions, and ensuring state consistency, can distract from building and spending resources on your desired web3 product.

## What are the cons of using a Node Service? {#cons-of-using-a-node-service}

By using a node service you are centralizing the infrastructure aspect of your product. For this reason, projects that hold decentralization to the upmost importance might prefer self-hosting nodes rather than outsourcing to a 3rd party.

Read more about the [benefits of running your own node](/developers/docs/nodes-and-clients/#benefits-to-you).

## Popular node services {#popular-node-services}

Here is a list of some of the most popular Ethereum node providers, feel free to add any that are missing! Each node service offers different benefits and features in addition to free or paid tiers, you should investigate which ones best suit your needs prior to making a decision.

- [**Alchemy**](https://www.alchemy.com/)
  - [Docs](https://docs.alchemyapi.io/)
  - Features
    - Free tier option
    - Scale as you go
    - Free archival data
    - Analytics tools
    - Dashboard
    - Unique API endpoints
    - Webhooks
    - Direct support
- [**Ankr**](https://www.ankr.com/)
  - [Docs](https://docs.ankr.com/)
  - Features
    - Ankr Protocol - open access to Public RPC API endpoints for 8+ chains
    - Load balancing and node health monitoring for a fast and reliable gateway to the nearest available node
    - Premium tier enabling WSS endpoint and uncapped rate limit
    - One-click full node and validator node deployment for 40+ chains
    - Scale as you go
    - Analytics tools
    - Dashboard
    - RPC, HTTPS and WSS endpoints
    - Direct support
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Docs](https://ubiquity.docs.blockdaemon.com/)
  - Benefits
    - Dashboard
    - Per node basis
    - Analytics
- [**Chainstack**](https://chainstack.com/)
  - [Docs](https://docs.chainstack.com/)
  - Features
    - Free shared nodes
    - Shared archive nodes
    - GraphQL support
    - RPC and WSS endpoints
    - Dedicated full and archive nodes
    - Fast sync time for dedicated deployments
    - Bring your cloud
    - Pay-per-hour pricing
    - Direct 24/7 support
- [**GetBlock**](https://getblock.io/)
  - [Docs](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Features
    - Access to 40+ blockchain nodes
    - 40K free daily requests
    - Unlimited number of API keys
    - High connection speed at 1GB/sec
    - Trace+Archive
    - Advanced analytics
    - Automated updates
    - Technical support
- [**InfStones**](https://infstones.com/)
  - Features
    - Free tier option
    - Scale as you go
    - Analytics
    - Dashboard
    - Unique API endpoints
    - Dedicated full nodes
    - Fast sync time for dedicated deployments
    - Direct 24/7 support
    - Access to 50+ blockchain nodes
- [**Infura**](https://infura.io/)
  - [Docs](https://infura.io/docs)
  - Features
    - Free tier option
    - Scale as you go
    - Paid archival data
    - Direct Support
    - Dashboard
- [**Moralis**](https://moralis.io/)
  - [Docs](https://docs.moralis.io/)
  - Features
    - Free shared nodes
    - Free shared archive nodes
    - Privacy focused (no logs policy)
    - Cross chain support
    - Scale as you go
    - Dashboard
    - Unique Ethereum SDK
    - Unique API endpoints
    - Direct, technical support
- [**Pocket Network**](https://www.pokt.network/)
  - [Docs](https://docs.pokt.network/home/)
  - Features
    - Decentralized RPC Protocol and Marketplace
    - 1M Requests Per Day Free Tier (per endpoint, max 2)
    - [Public Endpoints](https://docs.pokt.network/home/resources/public-rpc-endpoints)
    - Pre-Stake+ Program (if you need more than 1M requests per day)
    - 15+ Blockchains Supported
    - 6400+ Nodes earning POKT for serving applications
    - Archival Node, Archival Node w/ Tracing, & Testnet Node Support
    - Ethereum Mainnet Node Client Diversity
    - No Single Point of Failure
    - Zero Downtime
    - Cost-Effective Near-Zero Tokenomics (stake POKT once for network bandwidth)
    - No monthly sunk costs, turn your infrastructure into an asset
    - Load-Balancing built into the Protocol
    - Infinitely scale the number of requests per day and nodes per hour as you go
    - The most private, censorship-resistant option
    - Hands-on developer support
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) dashboard and analytics
- [**QuikNode**](https://www.quiknode.io/)
  - Features
    - 7 day free trial
    - Varied support
    - Webhooks
    - Dashboard
    - Analytics
- [**Rivet**](https://rivet.cloud/)
  - [Docs](https://rivet.readthedocs.io/en/latest/)
  - Features
    - Free tier option
    - Scale as you go
- [**SettleMint**](https://console.settlemint.com/)
  - [Docs](https://docs.settlemint.com/)
  - Features
    - Free trial
    - Scale as you go
    - GraphQL support
    - RPC and WSS endpoints
    - Dedicated full nodes
    - Bring your cloud
    - Analytics tools
    - Dashboard
    - Pay-per-hour pricing
    - Direct support
- [**Watchdata**](https://watchdata.io/)
  - [Docs](https://docs.watchdata.io/)
  - Features
    - Data reliability
    - Uninterrupted connection with no downtime
    - Process automation
    - Free tariffs
    - High limits that suit any user
    - Support for various nodes
    - Resource scaling
    - High processing speeds

## Further reading {#further-reading}

- [List of Ethereum node services](https://ethereumnodes.com/)

## Related topics {#related-topics}

- [Nodes and clients](/developers/docs/nodes-and-clients/)

## Related tutorials {#related-tutorials}

- [Getting started with Ethereum development using Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guide to sending transactions using web3 and Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
