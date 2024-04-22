---
title: Nodes as a service
description: An entry-level overview of node services, the pros and cons, and popular providers.
lang: en
sidebarDepth: 2
---

## Introduction {#Introduction}

Running your own [Ethereum node](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) can be challenging, especially when getting started or while scaling fast. There are a [number of services](#popular-node-services) that run optimized node infrastructures for you, so you can focus on developing your application or product instead. We'll explain how node services work, the pros and cons for using them and list providers if you are interested in getting started.

## Prerequisites {#prerequisites}

If you don't already have an understanding of what nodes and clients are, check out [Nodes and clients](/developers/docs/nodes-and-clients/).

## Stakers {#stakoooooooooooooors}

Solo stakers must run their own infrastructure rather than relying on third-party providers. This means running an execution client coupled with a consensus client. Before [The Merge](/roadmap/merge), it was possible to run a consensus client only and use a centralized provider for execution data; this is no longer possible - a solo staker must run both clients. However, there are services available to ease this process.

[Read more on running a node](/developers/docs/nodes-and-clients/run-a-node/).

The services described on this page are for non-staking nodes.

## How do node services work? {#how-do-node-services-work}

Node service providers run distributed node clients behind the scenes for you, so you don't have to.

These services typically provide an API key that you can use to write to and read from the blockchain. They often include access to [Ethereum testnets](/developers/docs/networks/#ethereum-testnets) in addition to Mainnet.

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

- [**Alchemy**](https://alchemy.com/)
  - [Docs](https://docs.alchemyapi.io/)
  - Features
    - Largest free tier with 300M compute units per month (~30M getLatestBlock requests)
    - Multichain support for Polygon, Starknet, Optimism, Arbitrum
    - Powering ~70% of the largest Ethereum dapps and DeFi transaction volume
    - Real-time webhook alerts via Alchemy Notify
    - Best-in-class support and reliability / stability
    - Alchemy's NFT API
    - Dashboard with Request Explorer, Mempool Watcher, and Composer
    - Integrated testnet faucet access
    - Active Discord builder community with 18k users
- [**All That Node**](https://allthatnode.com/)
  - [Docs](https://docs.allthatnode.com/)
  - Features
    - Largest free tier with 150,000 requests daily
    - Access to 24+ blockchain nodes
    - RPC, HTTPS and WSS endpoints
    - Unlimited access to archive data
    - 24/7 support and uptime over 99.9%
    - Faucet available on multi chains
    - Unlimited endpoint access with limitless number of API keys
    - Trace/Debug namespace available
    - Automated updates
    - Technical support
- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Docs](https://aws.amazon.com/managed-blockchain/resources/)
  - Features
    - Fully managed Ethereum nodes
    - Available in six regions
    - JSON-RPC over HTTP and secure WebSockets
    - Supports 3 chains
    - SLAs, AWS Support 24/7
    - Go-ethereum and Lighthouse
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
- [**Blast**](https://blastapi.io/)
  - [Docs](https://docs.blastapi.io/)
  - Features
    - RPC and WSS support
    - Multi-region node hosting
    - Decentralized infrastructure
    - Public API
    - Dedicated Free Plan
    - Multichain support (17+ blockchains)
    - Archive Nodes
    - 24/7 Discord Support
    - 24/7 Monitoring and alerts
    - An overall SLA of 99.9%
    - Pay in crypto
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Docs](https://ubiquity.docs.blockdaemon.com/)
  - Benefits
    - Dashboard
    - Per node basis
    - Analytics
- [**BlockPI**](https://blockpi.io/)
  - [Docs](https://docs.blockpi.io/)
  - Features
    - Robust & distributed node structure
    - Up to 40 HTTPS and WSS endpoints
    - Free signup package and monthly package
    - Trace method + Archive data support
    - Packages up to 90 days validity
    - Custom plan and pay as you go payment
    - Pay in crypto
    - Direct support & Technical support
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
- [**DataHub**](https://datahub.figment.io)
  - [Docs](https://docs.figment.io/)
  - Features
    - Free tier option with 3,000,000 reqs/month
    - RPC and WSS endpoints
    - Dedicated full and archive nodes
    - Auto-Scaling (Volume Discounts)
    - Free archival data
    - Service Analytics
    - Dashboard
    - Direct 24/7 Support
    - Pay in Crypto (Enterprise)
- [DRPC](https://drpc.org/)
  - [Docs](https://docs.drpc.org/)
  - Features
    - Decentralized RPC nodes
    - 15+ Node providers
    - Node balancing
    - Unlimited compute units per month on the free tier
    - Data verification
    - Custom endpoints
    - http and WSS endpoints
    - Unlimited keys (free and paid tier)
    - Flexible fallback options
    - [Public Endpoint](https://eth.drpc.org)
    - Free shared archive nodes
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
- [**Kaleido**](https://kaleido.io/)
  - [Docs](https://docs.kaleido.io/)
  - Features
    - Free startier tier
    - One-click Ethereum node deployment
    - Customizable clients and algorithms (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - 500+ administrative and service APIs
    - RESTful interface for Ethereum transaction submission (Apache Kafka backed)
    - Outbound streams for event delivery (Apache Kafka backed)
    - Deep collection of "off-chain" and ancillary services (e.g. bilateral encrypted messaging transport)
    - Straightforward network onboarding with governance and role-based access control
    - Sophisticated user management for both administrators and end users
    - Highly scalable, resilient, enterprise-grade infrastructure
    - Cloud HSM private key management
    - Ethereum Mainnet Tethering
    - ISO 27k and SOC 2, Type 2 certifications
    - Dynamic runtime configuration (e.g. adding cloud integrations, altering node ingresses, etc.)
    - Support for multi-cloud, multi-region and hybrid deployment orchestrations
    - Simple hourly SaaS-based pricing
    - SLAs and 24x7 support
- [**Lava Network**](https://www.lavanet.xyz/)
  - [Docs](https://docs.lavanet.xyz/)
  - Features
    - Free Testnet Use
    - Decentralized Redundancy for High Uptime
    - Open-source
    - Fully Decentralized SDK
    - Ethers.js Integration
    - Intuitive Project Management Interface
    - Consensus-Based Data Integrity
    - Multi-chain Support
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
- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Docs](https://docs.nodereal.io/nodereal/meganode/introduction)
  - Features
    - Reliable, fast and scalable RPC API services
    - Enhanced API for web3 developers
    - Multi-chain support
    - Get started for free
- [**NOWNodes**](https://nownodes.io/)
  - [Docs](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Features
    - Access to 50+ blockchain nodes
    - Free API Key
    - Block Explorers
    - API Response Time ⩽ 1 sec
    - 24/7 Support Team
    - Personal Account Manager
    - Shared, archive, backup and dedicated nodes
- [**Pocket Network**](https://www.pokt.network/)
  - [Docs](https://docs.pokt.network/home/)
  - Features
    - Decentralized RPC Protocol and Marketplace
    - 1M Requests Per Day Free Tier (per endpoint, max 2)
    - [Public Endpoints](https://docs.pokt.network/developers/public-endpoints)
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
- [**QuickNode**](https://www.quicknode.com)
  - [Docs](https://www.quicknode.com/docs/)
  - Features
    - 24/7 technical support & dev Discord community
    - Geo-balanced, multi cloud/metal, low-latency network
    - Multichain support (Optimism, Arbitrum, Polygon + 11 others)
    - Middle-layers for speed & stability (call routing, cache, indexing)
    - Smart-Contract monitoring via Webhooks
    - Intuitive dashboard, analytics suite, RPC composer
    - Advanced security features (JWT, masking, whitelisting)
    - NFT data and analytics API
    - [SOC2 Certified](https://www.quicknode.com/security)
    - Suitable for Developers to Enterprises
- [**Rivet**](https://rivet.cloud/)
  - [Docs](https://rivet.readthedocs.io/en/latest/)
  - Features
    - Free tier option
    - Scale as you go
- [**SenseiNode**](https://senseinode.com)
  - [Docs](https://docs.senseinode.com/)
  - Features
    - Dedicated and Share nodes
    - Dashboard
    - Hosting off AWS on multiple hosting providers across different locations in Latin America
    - Prysm and Lighthouse clients
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
- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Docs](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Features
    - Free tier including 25 million Tenderly Units per month
    - Free access to historical data
    - Up to 8x faster read-heavy workloads
    - 100% consistent read access
    - JSON RPC endpoints
    - UI-based RPC request builder and request preview
    - Tightly integrated with Tenderly’s development, debugging, and testing tools
    - Transaction simulations
    - Usage analytics and filtering
    - Easy access key management
    - Dedicated engineering support via chat, email, and Discord
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
- [**ZMOK**](https://zmok.io/)
  - [Docs](https://docs.zmok.io/)
  - Features
    - Front-running as a service
    - Global transactions mempool with search/filtering methods
    - Unlimited TX fee and infinite Gas for sending transactions
    - Fastest getting of the new block and reading of the blockchain
    - The best price per API call guarantee
- [**Chainbase**](https://www.chainbase.com/)
  - [Docs](https://docs.chainbase.com)
  - Features
    - Highly available, fast, and scalable RPC service
    - Multi-chain support
    - Free tariffs
    - User-friendly dashboard
    - Provides blockchain data services beyond RPC

[**Zeeve**](https://www.zeeve.io/)

- [Docs](https://www.zeeve.io/docs/)
- Features
  - Enterprise-grade no-code automation platform providing deployment, monitoring and management of Blockchain nodes and networks
  - 30+ Supported Protocols & Integrations, and adding more
  - Value added web3 infrastructure services like decentralized storage, decentralized identity and Blockchain Ledger data APIs for real-world use cases
  - 24/7 support and proactive monitoring ensure the health of nodes all the time.
  - RPC endpoints offer authenticated access to API’s, hassle free management with intuitive dashboard and analytics.
  - Provides both managed cloud and bring your own cloud options to choose from and supports all major cloud providers like AWS, Azure, Google Cloud, Digital Ocean and on-premise.
  - We use intelligent routing to hit the node closest to your user every time

[**Tokenview**](https://services.tokenview.io/)

- [Docs](https://services.tokeniew/docs?type=nodeService)
- Features
  - 24/7 technical support & Dev Telegram community
  - Multichain support (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
  - Both rpc and wss endpoints are open to use
  - Unlimited access to archive data API
  - Dashboard with Request Explorer and Mempool Watcher
  - NFT data API and Webhook notify
  - Pay in Crypto
  - External support for extra behavior requirements

## Further reading {#further-reading}

- [List of Ethereum node services](https://ethereumnodes.com/)

## Related topics {#related-topics}

- [Nodes and clients](/developers/docs/nodes-and-clients/)

## Related tutorials {#related-tutorials}

- [Getting started with Ethereum development using Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guide to sending transactions using web3 and Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
