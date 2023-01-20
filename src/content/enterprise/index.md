---
title: Enterprise on Ethereum Mainnet
description: Guides, articles, and tools about enterprise applications on the public Ethereum blockchain
lang: en
---

# Ethereum Mainnet for enterprise {#ethereum-for-enterprise}

Blockchain applications help businesses:

- Increase trust and reduce the cost of coordination between business parties
- Improve business network accountability and operational efficiency
- Build new business models and value creation opportunities
- Competitively future-proof their organization

Enterprise blockchain applications can be built on the public permissionless Ethereum [Mainnet](/glossary/#mainnet), or on private blockchains that are based on Ethereum technology. Find more information on [private Enterprise Ethereum chains](/enterprise/private-ethereum/).

## Public vs private Ethereum {#private-vs-public}

There is only one public Ethereum Mainnet. Applications that are built on the Mainnet are able to interoperate, similarly to how applications built on the Internet can connect to each other, leveraging the full potential of decentralized blockchain.

Many businesses and consortia have deployed private, permissioned blockchains for specific applications based on Ethereum technology.

### Key differences {#key-differences}

- Blockchain Security/Immutability - A blockchain’s resistance to tampering is determined by its consensus algorithm. Ethereum Mainnet is secured by the interaction of thousands of independent nodes run by individuals and miners throughout the world. Private chains typically have a small number of nodes which are controlled by one or a few organizations; those nodes can be tightly controlled, but only a few must be compromised in order to rewrite the chain or commit fraudulent transactions.
- Performance - Because private Enterprise Ethereum chains may use high performance nodes with special hardware requirements and different consensus algorithms such as proof-of-authority, they may achieve higher transaction throughput on the base layer (Layer 1). On Ethereum Mainnet, high throughput can be achieved with the use of [Layer 2 scaling solutions](/developers/docs/scaling/#layer-2-scaling).
- Cost - The cost to operate a private chain is primarily reflected in labor to set up and manage the chain, and the servers to run it. While there is no cost to connect to Ethereum Mainnet, there is a gas cost for every transaction which must be paid for in ether. Transaction relayers (aka Gas Stations) are being developed in order to eliminate the need for end users and even enterprises to directly use ether in their transactions. Some [analyses](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) have shown that the total cost to operate an application may be lower on Mainnet than running a private chain.
- Node Permissioning - Only authorized nodes can join private chains. Anybody can set up a node on Ethereum Mainnet.
- Privacy - Access to data written to private chains can be controlled by restricting access to the network, and on a finer grained basis with access controls and private transactions. All data written to Mainnet Layer 1 is viewable by anyone, so sensitive information should be stored and transmitted off-chain, or else encrypted. Design patterns that facilitate this are emerging (e.g. Baseline, Aztec), as well as Layer 2 solutions that can keep data compartmentalized and off of Layer 1.

### Why build on Ethereum Mainnet {#why-build-on-ethereum-mainnet}

Enterprises have been experimenting with blockchain technology since around 2016, when the Hyperledger, Quorum, and Corda projects were launched. The focus was largely on private permissioned enterprise blockchains, but starting in 2019 there has been a shift in thinking about public vs private blockchains for business applications. A [survey](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf) conducted by Forrester revealed that “Survey respondents ... see this potential, with 75% stating that they’re likely to leverage public blockchains in the future, and nearly one-third saying they’re very likely”. EY’s Paul Brody has [talked](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) about the benefits of building on public blockchain, which (depending on the application) may include stronger security/immutability, transparency, lower total cost of ownership, and the ability to interoperate with all of the other applications that are also on the Mainnet (network effects). Sharing a common frame of reference among businesses avoids the unnecessary creation of numerous isolated silos which cannot communicate and share or synchronize information with each other.

Another development which is shifting the focus toward public blockchains is [Layer 2](/developers/docs/scaling/#layer-2-scaling). Layer 2 is primarily a scalability technology category which makes high throughput applications possible on public chains. But Layer 2 solutions can also [address some of the other challenges that have driven enterprise developers to choose private chains in the past](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

## Enterprise developer resources {#enterprise-developer-resources}

### Organizations {#organizations}

Some collaborative efforts to make Ethereum enterprise friendly have been made by different organizations:

- [Enterprise Ethereum Alliance (EEA)](https://entethalliance.org/)
  The EEA enables organizations to adopt and use Ethereum technology in their daily business operations. It empowers the Ethereum ecosystem to develop new business opportunities, drive industry adoption, and learn and collaborate with one another.
  The EEA’s Mainnet working group is a focal point for representatives from businesses who are interested in building on the public Ethereum Mainnet, as well as members of the Ethereum community who would like to support them.
- [Ethereum OASIS Open Project](https://github.com/ethereum-oasis/oasis-open-project)
  The Ethereum OASIS Open Project is an OASIS Open Project that exists to provide a neutral forum for diverse stakeholders to create high-quality specifications that facilitate Ethereum’s longevity, interoperability, and ease of integration. The project intends to develop clear, open standards, high-quality documentation, and shared test suites that facilitate new features and enhancements to the Ethereum protocol.
- [Baseline Project](https://www.baseline-protocol.org/)
  The Baseline Protocol is an open source initiative that combines advances in cryptography, messaging, and blockchain to deliver secure and private business processes at low cost via the public Ethereum Mainnet. The protocol enables confidential and complex collaboration between enterprises without leaving any sensitive data on-chain. The Baseline project is a sub-project of the Ethereum OASIS Open Project, and is coordinated by the Baseline Technical Steering Committee.

### Products and services {#products-and-services}

- [Alchemy](https://www.alchemy.com/) _provides API services and tools for building and monitoring applications on Ethereum_
- [Blast](https://blastapi.io/) _an API platform that provides RPC/WSS APIs for Ethereum Archive Mainnet and Testnets._
- [Blockapps](https://blockapps.net/) _implementation of the Enterprise Ethereum protocol, tooling and APIs that form the STRATO platform_
- [Chainstack](https://chainstack.com/) _mainnet and testnet Ethereum infrastructure hosted in public & isolated customer clouds_
- [ConsenSys](https://consensys.net/) _provides a range of products and tools for building on Ethereum, as well as consulting and custom development services_
- [Envision Blockchain](https://envisionblockchain.com/) _provides enterprise focused consulting and development services specializing in Ethereum Mainnet_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _provides a procurement workflow by issuing RFQ’s, contracts, purchase orders, and invoices across your network of trusted business partners_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _an enterprise focused open-source Ethereum client developed under the Apache 2.0 license and written in Java_
- [Infura](https://infura.io/) _scalable API access to the Ethereum and IPFS networks_
- [Kaleido](https://kaleido.io/) _an enterprise-focused development platform that offers simplified blockchain and digital asset applications_
- [Provide](https://provide.services/) _infrastructure and APIs for Enterprise Web3 applications_
- [QuickNode](https://www.quicknode.com/) _provides reliable and fast nodes with high-level APIs like NFT API, Token API, etc., while delivering a unified product suite and enterprise-grade solutions_
- [Tenderly](https://tenderly.co) _a Web3 development platform that provides debugging, observability, and infrastructure building blocks for developing, testing, monitoring, and operating smart contracts_
- [Unibright](https://unibright.io/) _a team of blockchain specialists, architects, developers and consultants with 20+ years of experience in business processes and integration_
- [Zero Services GmbH](https://www.zeroservices.eu/) _provider of managed services spread across co-locations in Europe and Asia. Operates & monitors your nodes securely and reliably_

### Tooling and libraries {#tooling-and-libraries}

- [Alethio](https://explorer.aleth.io/) _Ethereum Data Analytics Platform_
- [Epirus](https://www.web3labs.com/epirus) _a platform for developing, deploying and monitoring blockchain applications by Web3 Labs_
- [Ernst & Young's ‘Nightfall'](https://github.com/EYBlockchain/nightfall) _a toolkit for private transactions_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _a transaction signing application to be used with a web3 provider_
- [Tenderly](https://tenderly.co/) _a Data Platform providing real-time analytics, alerting and monitoring with support for private networks_
- [Truffle Suite](https://trufflesuite.com) _blockchain development suite (Truffle, Ganache, Drizzle)_

### Scalability solutions {#scalability-solutions}

[Layer 2](/layer-2) is a set of technologies or systems that run on top of Ethereum (Layer 1), inherit security properties from Layer 1, and provide greater transaction processing capacity (throughput), lower transaction fees (operating cost), and faster transaction confirmations than Layer 1. Layer 2 scaling solutions are secured by Layer 1, but they enable blockchain applications to handle many more users or actions or data than Layer 1 could accommodate. Many of them leverage recent advances in cryptography and zero-knowledge (ZK) proofs to maximize performance and security.

Building your application on top of a Layer 2 scalability solution can help [address many of the concerns that have previously driven companies to build on private blockchains](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), yet retain the benefits of building on Mainnet.

Layer 2 projects include:

- Optimistic rollups (data on chain, fraud proofs)
  - [Optimism](https://optimism.io/)
  - [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
  - [Fuel Network](https://fuel.sh)
  - [Boba Network](https://boba.network/)
- ZK-rollups (data on chain, ZK validity proofs)
  - [Loopring](https://loopring.org)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkSync](https://matter-labs.io/)
  - [Aztec 2.0](https://aztec.network/)
- Validium (data off chain, ZK validity proofs)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkPorter](https://matter-labs.io/)
- State channels
  - [Connext](https://connext.network/)
  - [Kchannels](https://www.kchannels.io/)
  - [Perun](https://perun.network)
  - [Raiden](https://raiden.network/)
- Sidechains
  - [Polygon POS](https://polygon.technology/)
  - [Skale](https://skale.network)
  - [POA Network](https://www.poa.network/)
- Hybrid solutions that combine properties of multiple categories
  - [Celer](https://celer.network)

## Enterprise applications live on Mainnet {#enterprise-live-on-mainnet}

Here are some of the enterprise applications that have been deployed to the public Ethereum Mainnet

### Payments {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _pays users for their attention to advertisements and users can pay publishers to support them, via the Basic Attention Token_
- [hCaptcha](https://www.hcaptcha.com/) _Bot prevention CAPTCHA system which pays web site operators for the work done by users to label data for machine learning. Now deployed by Cloudflare_
- [Audius](https://audius.co/) _a streaming service that connects music fans directly with artists, and allows artists to be paid in full by their fans, directly and instantly for every stream_
- [EthereumAds](https://ethereumads.com/) _lets web site operators sell advertising space and get paid via Ethereum_

### Finance {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _bond issuance and settlement_
- [Societe Generale](https://www.societegenerale.com/en/news/newsroom/societe-generale-performs-first-financial-transaction-settled-central-bank-digital) _bond issuance_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _bond offering and tokenization for FAT Brands_
- [Sila](https://silamoney.com/) _banking and ACH payments infrastructure-as-a-service_
- [Kratos](https://triterras.com/kratos) _commodity trading and trade finance platform that connects and enables commodity traders to trade and source capital from lenders directly online_
- [Taurus](https://www.taurushq.com/) _issues tokenized securities_

### Asset tokenization {#tokenization}

- [Tinlake](https://tinlake.centrifuge.io/) _receivables financing via tokenized real-world assets such as invoices, mortgages or streaming royalties_
- [RealT](https://realt.co/) _investors around the globe can buy into the US real estate market through fully-compliant, fractional, tokenized ownership._
- [AgroToken](https://agrotoken.io/en/) _tokenizing and trading agricultural commodities_
- [Fasset](https://www.fasset.com/) _a platform for supporting sustainable infrastructure_

### Notarization of data {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _details of finalized loans are hashed and recorded on Mainnet_
- [Splunk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _data integrity can be ensured by periodically writing hashes of indexed data to Mainnet_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _Italy's largest news agency fights fake news and enables readers to verify the origin of news stories by recording them on Mainnet_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _logs press releases on Ethereum to ensure corporate accountability and trust_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _records provenance and repair history of watches on Ethereum_
- [EthSign](https://ethsign.xyz/) _records signed electronic documents on the Ethereum blockchain_

### Supply chain {#supply-chain}

- [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _bill of lading and document transfer provider_
- [Morpheus.network](https://morpheus.network/) _supply chain automation platform which implements a hybrid of private chains with notarized data on the Ethereum Mainnet, and is in use by companies such as Canadian food, oil & gas distributor Federated Co-op Ltd. and Argentinian pet food provider Vitalcan_
- [Minespider](https://www.minespider.com/) _supply chain tracking_
- [Follow Our Fibre](https://www.followourfibre.com) _viscose supply chain traceability_
- [EY OpsChain Contract Manager](https://blockchain.ey.com/products/contract-manager) _enables companies to engage in a procurement workflow by issuing RFQ’s, contracts, purchase orders, and invoices across your network of trusted business partners_
- [Treum](https://treum.io/) _brings transparency, traceability, and tradability to supply chains, using blockchain technology_
- [TradeTrust](https://www.tradetrust.io/) _verifies electronic Bills of Lading (eBLs) for international shipping_
- [Birra Peroni](https://www.ey.com/en_gl/news/2021/05/birra-peroni-is-the-first-industrial-organization-to-mint-unique-non-fungible-tokens-using-ey-opschain-traceability) _mints NFTs for each new batch of beer, enabling greater visibility and efficiency across its supply chain_

### Insurance {#insurance}

- [Arbol](https://www.arbolmarket.com/) _parmetric insurance to cover weather related risks_
- [Etherisc](https://etherisc.com/) _decentralized insurance for a variety of risks_

### Credentials and certifications {#credentials}

- [Two Italian high schools](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _digital diplomas issued on Ethereum Mainnet_
- [University of St. Gallen](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _pilot project to verify degrees by a Swiss university_
- [Malta](https://cointelegraph.com/news/malta-to-store-education-certificates-on-a-blockchain) _all educational certificates recorded on Mainnet by [Hyland](https://www.learningmachine.com/)_
- [Pohang University of Science and Technology](https://www.theblockcrypto.com/linked/55176/south-korean-university-issues-blockchain-stored-diplomas-amid-the-spread-of-the-coronavirus) _South Korean university issues blockchain-stored diplomas to its new graduates_
- [OpenCerts](https://opencerts.io/) _issues blockchain education credentials in Singapore_
- [BlockCerts](https://www.blockcerts.org/) _developed an open standard for blockchain credentials_
- [SkillTree](http://skilltree.org/) _online skill training and certifications which can be configured with expiration triggers or dependencies on other skills_

### Utilities {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _electricity payments_

If you would like to add to this list, please see [instructions for contributing](/contributing/).
