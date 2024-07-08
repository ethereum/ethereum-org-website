---
title: Data and Analytics
description: Understanding and navigating the crypto data stack
lang: en
---

## Introduction {#Introduction}

As you get into crypto, you're likely to see stats, charts, and APIs across dozens of different websites (and github repos). This is a stark contrast from traditional tech or finance where there is just one trusted source (i.e. Bloomberg). This is due to the open data nature of the industry, where all data can be freely downloaded from client nodes.

However, that data is stored in hex/binary form and is hardly legible or usable. As an ecosystem, we've had to work together to share queries, tools, tables, and labor to make crypto data accessible for everyone. Each year, we see giant leaps in how we can combine onchain/offchain data in analytics and applications. 

In this overview page, we'll cover all the parts of the crypto data stack as they stand today (last updated in 2024).

## Crypto Data Landscape

Below is a diagram of the five parts of the crypto data stack, with some top example product logos called out. You can learn more about these products in the [tool descriptions page](public/content/developers/docs/data-and-analytics/tool-descriptions.md)

![](/public/images/data/data_landscape.jpg)

#### web2 counterparts

If you are new to web3 and this looks confusing to you, think of these web2 parallels:

- indexing: amplitude, stripe, general logging services
- explore: grafana, datadog
- query: metabase, hex
- define and store: dbt, snowflake, databricks
- …and back onchain: this is just reverse ETL

### Index: Read raw data from the blockchain

Blockchains run with nodes. Nodes run “client” code - which are repos that have implemented the EVM in some fashion. These clients have a set of implemented RPCs (API endpoints), some of which are standard and some of which are custom to support better/faster data querying. Data from RPC endpoints are direct reflections of the blockchain state - there are no external party changes or transformations here. Nodes-as-a-service providers run tons of nodes and offer them collectively through an API product, creating a stable data service.

We’ve seen a ton of change in the indexing layer over the last year, with two new subcategories emerging:

- Forks-as-a-Service
  - Fork any contract and add events and calculations, and then pull this data from a new “forked” RPC/data service.
  - Some of the main providers for this are [shadow.xyz](https://www.shadow.xyz/), [ghostlogs](https://ghostlogs.xyz/), and [smlXL](https://smlxl.io/).
  - ilemi gave his thoughts on [shortcomings and difficulties](https://twitter.com/andrewhong5297/status/1732230186966413484) on this approach.

- Rollups-as-a-Service (RaaS):
  - The big theme of the year has been rollups, with Coinbase kicking it off by launching a rollup (Base) on the Optimism Stack (OP Stack) earlier this year.
  - Teams are building products specifically for running the nodes and sequencer(s) for your own Rollup. We’ve already seen dozens of rollups launch.
  - New startups like [Conduit](https://conduit.xyz/), [Caldera](https://caldera.xyz/), and [Astria](https://www.astria.org/) are offering full stack rollup services. Quicknode and Alchemy have launched similar RaaS offerings.

Alchemy and Quicknode have expanded further into crypto native infra and data engineering infra. Alchemy launched [account abstraction](https://www.alchemy.com/account-abstraction-infrastructure) and [subgraph services](https://www.alchemy.com/subgraphs). Quicknode has been busy with [alerts](https://www.quicknode.com/quickalerts), [data streaming](https://www.quicknode.com/quickstreams), and [rollup services](https://blog.quicknode.com/introducing-quicknode-custom-chains).

We should see our first “intents” clients/services soon. Intents are a part of the modular stack, and are essentially transactions handled outside the mempool that have extra preferences attached. UniswapX and Cowswap both operate limit order intent pools, and should both release clients within the year. Account abstraction bundlers like [stackup](https://www.stackup.sh/) and [biconomy](https://www.biconomy.io/) should venture into intents as well. It’s unclear if data providers like Alchemy will index these “intents” clients, or if it will be like MEV where we have specialized providers like [Blocknative](https://www.blocknative.com/) and [Bloxroute](https://bloxroute.com/).

Another up-and-coming type of provider is the “all-in-one” service, which combines indexing, querying, and defining. There are a few products here such as [indexing.co](https://www.indexing.co/) and [spec.dev](https://spec.dev/) - they are not included them in the landscape since they are still nascent.

### Explore: Quickly look into addresses, transactions, protocols, and chains

It’s common to jump between well-crafted data dashboards and blockchain explorers iteratively, to help you identify a trend or build out a cohesive data pipeline.

Outside of etherscan, we now have this plethora of explorers to choose from:

- More intuitive explorers like [parsec](https://parsec.fi/), [arkham](https://platform.arkhamintelligence.com/), [onceupon](https://www.onceupon.gg/home) showcasing more metadata and charts for transactions and addresses.
- In depth explorers like [evm.storage](https://evm.storage/eth/18906826/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#map) showcasing storage slots and memory stacks
- Cross-chain explorers like [Routescan](https://routescan.io/) (superscan), [Dora](https://www.ondora.xyz/), and [Onceupon](https://www.onceupon.gg/home)
- ZK proof explorers like [modulus](https://explorer.modulus.xyz/batch/157/inference/61974), [succinct](https://alpha.succinct.xyz/), and [axiom](https://explorer.axiom.xyz/v1/mainnet).
- Bridge explorers like [socketscan](https://www.socketscan.io/) and [wormhole](https://wormhole.com/explorer/)
- MEV explorers like [Eigenphi](https://eigenphi.io/mev/ethereum/txr) for transactions or [mevboost.pics](https://mevboost.pics/) for bundles and [beaconcha.in](https://beaconcha.in/) for blocks
- Nansen launched a 2.0 of their token and wallet tracking product, with cool new features like “smart segments”

The dashboard layer hasn’t changed much. It’s still the wild west here. If you spend a day on Twitter, you’ll see charts from dozens of different platforms covering similar data but all with slight differences or twists. Verification and attribution are becoming a bigger issue, especially now with the large growth in both teams and chains.

Marketing specific address explorers are on the rise. Teams like spindl and bello will lead the way here. Cross-chain explorers (and pre-chain like MEV/intents) will see expansion in development.

Across platforms, wallets are still poorly labelled and tracked, and it’s getting worse with intents/account abstraction now. We don’t mean static labels like “Coinbase” but instead more dynamic ones like “Experienced Contract Deployer”. Some teams are trying to tackle this such as [walletlabels](https://walletlabels.xyz/), [onceupon context](https://github.com/Once-Upon/context), and [syve.ai](https://www.syve.ai/). It will also improve naturally alongside web3 social, which is growing mainly on Farcaster.

### Query: Raw, decoded, and abstracted data that can be queried

Most SQL query engines are cloud-based, so you can use an in-browser IDE to query against raw and aggregated data (like nf.trades/dex.trades). These also allow for definition of great tables such as NFT wash trading filters. All these products come with their own APIs to grab results from your queries.

GraphQL APIs here let you define your own schemas (in typescript or SQL) and then generates a graphQL endpoint by running the full blockchain history through your schema.

For predefined APIs (where you query prebuilt schemas), there are a ton of niche data providers that are not included in my chart. Data providers covering domains like mempool, nft, governance, orderbook, prices, and more.

Holistically, every platform has got a lot more efficient with their infra (meaning your queries run faster). Most platforms explored advanced methods of getting data out like odbc connectors, data streams, s3 parquet sharing, bigquery/snowflake direct transfers, etc.

Recent changes to existing products:

1. Query engines like [Dune](https://dune.com/) and [Flipside](https://flipsidecrypto.xyz/) have accepted there is more data than can possibly be ingested in custom data pipelines, and have launched products that allow the user to bring in that data instead. Flipside launched livequery (query an API in SQL) and Dune launched uploads/syncs (upload csv or api, or sync your database to Dune directly).
2. Our favorite decentralized data child, [The Graph](https://thegraph.com/), has had to really beef up their infra to not lose market share to centralized subgraph players like goldsky and satsuma (alchemy). They’ve partnered closely with [StreamingFast](https://www.streamingfast.io/), separating out “reader” and “relayer” of data and also introducing [substreams](https://thegraph.com/docs/en/substreams/) which allow you to write rust based subgraphs across chains.

No provider here is truly set up for the rollup world yet, either in terms of scaling ingestion or fixing cross-chain schemas/transformations. And by not ready, we mean not ready for the case of 500 rollups launching in a week. Dune has launched a [rollup ingestion product](https://dune.com/product/dune-catalyst) to start making this easier, especially if you use an existing RaaS provider like Conduit.

LLM query/dashboard products like Dune AI will start to gain stronger traction in certain domains, such as wallet analysis or token analysis. Labels datasets will play a strong part in enabling this.

### Define and Store: Create and store aggregations that rely on heavy data transformations

Raw data is great, but to get to better metrics, you need to be able to standardize and aggregate data across contracts of different protocols. Once you have aggregations, you can create new metrics and labels that enhance everyone's analysis. We've have only included products that have active contribution from both inside and outside the platform’s team, and are publicly accessible.

The collaborative layer of data definition has not really evolved over the last year. Product teams and engineering are barely keeping up as is. To give a sense of growth rate here, in the month of December 2023:

- DeFiLlama adapters saw [230 pull requests from 150 contributors across 559 files](https://github.com/DefiLlama/DefiLlama-Adapters/pulse/monthly) out of about 3700 total files.
- Dune spellbook saw [127 pull requests from 42 contributors across 779 files](https://github.com/duneanalytics/spellbook/pulse/monthly) out of about 3700 total files.

You can probably consider every 2-3 files to be a new protocol/table. So 200+ tables shifting around every month, and that number is only increasing with new chains and startups. If you’ve never worked in GitHub or data tables before, let me tell you that’s a ton of work to manage.

### Back Onchain: Putting the data back into contracts using Zero Knowledge (ZK) tech

This layer is completely new, and still very nascent. The idea here is that you can prove some data or computation was correctly collected using a “ZK circuit”, and then post that proof onchain (sometimes with outputs, depending on the application). You can get a sense of how this works by trying to create your own simple identity proofs yourself. This [presentation from the summer](https://www.youtube.com/watch?v=EVUELLiDjDA) also gives a good summary of these “ZK coprocessors”.

For historic data access and compute, the main players for now are [herodotus](https://herodotus.dev/), [axiom](https://www.axiom.xyz/), [succinct](https://alpha.succinct.xyz/), [lagrange](https://lagrange.dev/), and [spaceandtime](https://www.spaceandtime.io/). They each have slightly different approaches to their prover and ZK stack, which does impact the type of data and type of calculations that you could verify and post using each tool.

ZK machine learning is the idea that you can prove that a certain inference came from a certain model that was trained on certain data. [EZKL](https://github.com/zkonduit/ezkl) is the backbone of most ZK machine learning stacks right now, other than modulus who is building their own custom ML model prover system. Ritual, Giza, and Spectral all use EZKL for the model proof portion of their stack for now.

ZK machine learning is not as simple as deploy and run (can’t just host on kubeflow), because you now need provers as part of the stack. Products like [gensyn](https://www.gensyn.ai/), [blockless](https://blockless.network/), and other AVS providers are working on forming a prover/compute marketplace.

To get a good sense of where ZK fits in to the future and some of the surrounding technologies enabling it, read these three articles:
- [“Modular Stack” for dummies](https://read.cryptodatabytes.com/p/the-future-of-transactions-for-dummies)
- [The Era of Soft Composability](https://read.cryptodatabytes.com/p/fbb45562-4541-4ea0-a65d-7f1a5c92bf12)
- [The Future of Digital Identity](https://dcbuilder.mirror.xyz/myIlus8pl6SbyuUR4ufGf9OYRps8hCGqeZHNYce3i94)

## Further Reading {#further-reading}

- [Andrew Hong's 2024 Data Landscape Guide](https://read.cryptodatabytes.com/p/2024-annual-guide-web3-data-tools)
- [Bytexplorers, an onchain data community that learns and earns together](https://read.cryptodatabytes.com/p/join-the-bytexplorers)
- [Learn SQL and Ethereum on Dune](https://read.cryptodatabytes.com/p/a-basic-wizard-guide-to-dune-sql)
