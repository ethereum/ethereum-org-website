---
title: Enterprise on Ethereum Mainnet
description: Guides, articles, and tools about enterprise applications on the public Ethereum blockchain
lang: en
---

# Ethereum for enterprise {#ethereum-for-enterprise}

Ethereum can help many kinds of businesses, including large companies:
 
- Increase trust and reduce the cost of coordination between business parties
- Improve business network accountability and operational efficiency
- Build new business models and value creation opportunities
- Competitively future-proof their organization

Enterprise blockchain applications can be built on the public permissionless Ethereum [Mainnet](/glossary/#mainnet), or on private blockchains that are based on Ethereum technology. Find more information on [private Enterprise Ethereum chains](/enterprise/private-ethereum/).

## Public vs private Ethereum {#private-vs-public}

There is only one public Ethereum Mainnet. Applications that are built on the Mainnet are able to interoperate, similarly to how applications built on the Internet can connect to each other, leveraging the full potential of decentralized blockchain.

Many businesses and consortia have deployed private, permissioned blockchains based on Ethereum technology, for specific applications.

### Key differences {#key-differences}

- Blockchain Security/Immutability - A blockchain’s resistance to tampering is determined by its consensus algorithm. Ethereum Mainnet is secured by the interaction of thousands of independent nodes run by individuals and miners throughout the world. Private chains typically have a small number of nodes which are controlled by one or a few organizations; those nodes can be tightly controlled, but only a few must be compromised in order to rewrite the chain or commit fraudulent transactions.
- Performance - Because private Enterprise Ethereum chains may use high performance nodes with special hardware requirements and different consensus algorithms such as proof-of-authority, they may achieve higher transaction throughput on the base layer (Layer 1). On Ethereum Mainnet, high throughput can be achieved with the use of [Layer 2 scaling solutions](/layer-2).
- Cost - The cost to operate a private chain is primarily reflected in labor to set up and manage the chain, and the servers to run it. While there is no cost to connect to Ethereum Mainnet, there is a gas cost for every transaction which must be paid for in Ether. Meta-transaction relayers can eliminate the need for end users and even enterprises to directly hold and use ether in their transactions. Some [analyses](https://theblockchaintest.com/uploads/resources/EY%20-%20Total%20cost%20of%20ownership%20for%20blockchain%20solutions%20-%202019%20-%20Apr.pdf) have shown that the total cost to operate an application may be lower on Mainnet than running a private chain.
- Node Permissioning - Only authorized nodes can join private chains. Anybody can set up a node on Ethereum Mainnet.
- Privacy - Access to data written to private chains can be controlled by restricting access to the network, and on a finer grained basis with access controls and private transactions. All data written to Mainnet Layer 1 is viewable by anyone, so sensitive information should be stored and transmitted off-chain, or else encrypted. Design patterns that facilitate this are emerging (e.g. Baseline, Nightfall), as well as Layer 2 solutions that can keep data compartmentalized and off of Layer 1.

### Why build on Ethereum Mainnet {#why-build-on-ethereum-mainnet}

A key benefit of public blockchains to businesses is monopoly resistance. Using Ethereum Mainnet as a neutral referee to coordinate business transactions avoids putting your trust in another company, over which your competitors may gain control or influence, putting you at a disadvantage. On an open, permissionless, and decentralized platform that anyone can join, use, and contribute to, there is no central authority who may use their power to gain an advantage over you.

Enterprises have been experimenting with blockchain technology since around 2016, when the Hyperledger, Quorum, and Corda projects were launched. Initially the focus was largely on private permissioned enterprise blockchains, but starting in 2019 there was a shift in thinking about public vs private blockchains for business applications. EY’s Paul Brody has [talked](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) about the benefits of building on public (vs. private) blockchains, which (depending on the application) may include stronger security/immutability, transparency, lower total cost of ownership, and the ability to interoperate with all of the other applications that are also on the Mainnet (network effects). Sharing a common frame of reference among businesses avoids the unnecessary creation of numerous isolated silos which cannot communicate and share or synchronize information with each other.

Another development which is shifting the focus toward public blockchains is [Layer 2](/layer-2). Layer 2 is primarily a scalability technology category which makes high throughput applications possible on public chains. But Layer 2 solutions can also [address some of the other challenges that have driven enterprise developers to choose private chains in the past](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

## Resources {#enterprise-resources}

### Further reading {#further-reading}

Non-technical resources for understanding how businesses can benefit from Ethereum

- [Enterprise Ethereum Alliance 2023 Business Readiness Report](https://entethalliance.org/eea-ethereum-business-readiness-report-2023/) - _surveys the potential and capabilities of public Ethereum and the broader Ethereum ecosystem for businesses_
- [_Ethereum for Business_ by Paul Brody](https://www.uapress.com/product/ethereum-for-business/) - _is a plain-English guide to the use cases that generate returns from asset management to payments to supply chains_

### Organizations {#organizations}

Some collaborative efforts to make Ethereum enterprise friendly have been made by different organizations

- [Enterprise Ethereum Alliance](https://entethalliance.org/) - The EEA helps organizations to adopt and use Ethereum technology in their daily business operations. Its goal is accelerating business Ethereum through professional and commercial support, advocacy and research, standards development and ecosystem trust services.
- [Global Blockchain Business Council](https://www.gbbc.io/) - The GBBC is an industry association for the blockchain technology ecosystem. Through engaging policymakers and regulators, curating events and in-depth discussions, and driving research, GBBC is dedicated to further adoption of blockchain to create more secure, equitable, and functional societies.


## Enterprise developer resources {#enterprise-developer-resources}

### Products and services {#products-and-services}

- [4EVERLAND](https://www.4everland.org/) - _provides APIs, RPC services and tools for hosting decentralized applications and enabling decentralized storage on Ethereum_
- [Alchemy](https://www.alchemy.com/) - _provides API services and tools for building and monitoring applications on Ethereum_
- [Blast](https://blastapi.io/) - _an API platform that provides RPC/WSS APIs for Ethereum Archive Mainnet and Testnets._
- [Blockapps](https://blockapps.net/) - _implementation of the Enterprise Ethereum protocol, tooling and APIs that form the STRATO platform_
- [Chainstack](https://chainstack.com/) - _mainnet and testnet Ethereum infrastructure hosted in public & isolated customer clouds_
- [ConsenSys](https://consensys.io/) - _provides a range of products and tools for building on Ethereum, as well as consulting and custom development services_
- [Envision Blockchain](https://envisionblockchain.com/) - _provides enterprise focused consulting and development services specializing in Ethereum Mainnet_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) - _provides a procurement workflow by issuing RFQ’s, contracts, purchase orders, and invoices across your network of trusted business partners_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) - _an enterprise focused open-source Ethereum client developed under the Apache 2.0 license and written in Java_
- [Infura](https://infura.io/) - _scalable API access to the Ethereum and IPFS networks_
- [Kaleido](https://kaleido.io/) - _an enterprise-focused development platform that offers simplified blockchain and digital asset applications_
- [NodeReal](https://nodereal.io/) - _provides scalable blockchain infrastructure and API services provider for the Web3 ecosystem_
- [Provide](https://provide.services/) - _enterprise zero-knowledge middleware_
- [QuickNode](https://www.quicknode.com/) - _provides reliable and fast nodes with high-level APIs like NFT API, Token API, etc., while delivering a unified product suite and enterprise-grade solutions_
- [Tenderly](https://tenderly.co) - _a Web3 development platform that provides debugging, observability, and infrastructure building blocks for developing, testing, monitoring, and operating smart contracts_
- [Unibright](https://unibright.io/) - _a team of blockchain specialists, architects, developers and consultants with 20+ years of experience in business processes and integration_
- [Zeeve](https://www.zeeve.io/) - _provides a range of products and tools for building on Ethereum, also infrastructure and APIs for Enterprise Web3 applications._

### Tooling and libraries {#tooling-and-libraries}

- [Baseline Project](https://www.baseline-protocol.org/) - _The Baseline Protocol is a set of tools and libraries that helps enterprises coordinate complex, multi-party business processes and workflows with privacy while keeping data in respective systems of record. The standard enables two or more state machines to achieve and maintain data consistency and workflow continuity by using a network as a common frame of reference._
- [Chainlens](https://www.chainlens.com/) - _SaaS and on-prem blockchain data and analytics platform from Web3 Labs_
- [Ernst & Young's 'Nightfall'](https://github.com/EYBlockchain/nightfall_3) - _an application for transferring ERC20, ERC721 and ERC1155 applications under Zero Knowledge, using an Optimistic Rollup_
- [Truffle Suite](https://trufflesuite.com) - _blockchain development suite (Truffle, Ganache, Drizzle)_

### Scalability solutions {#scalability-solutions}

[Layer 2](/layer-2) is a set of technologies or systems that run on top of Ethereum (Layer 1), inherit security properties from Layer 1, and provide greater transaction processing capacity (throughput), lower transaction fees (operating cost), and faster transaction confirmations than Layer 1. Layer 2 scaling solutions are secured by Layer 1, but they enable blockchain applications to handle many more users or actions or data than Layer 1 could accommodate. Many of them leverage recent advances in cryptography and zero-knowledge (ZK) proofs to maximize performance and security.

Building your application on top of a Layer 2 scalability solution can help [address many of the concerns that have previously driven companies to build on private blockchains](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), yet retain the benefits of building on Mainnet.

## Enterprise applications live on Ethereum Mainnet {#enterprise-live-on-mainnet}

Here are some of the enterprise applications that have been built on top of the public Ethereum Mainnet and L2s by and for traditional, non-blockchain based companies.

### Payments {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _pays users for their attention to advertisements and users can pay publishers to support them, via the Basic Attention Token_
- [City of Lugano, Switzerland](https://bitcoinsuisse.com/news/city-of-lugano-accepts-crypto-payments) _payment of taxes and other municipal services_ 
- [EthereumAds](https://ethereumads.com/) _lets web site operators sell advertising space and get paid via Ethereum_
- [hCaptcha](https://www.hcaptcha.com/) _Bot prevention CAPTCHA system which pays web site operators for the work done by users to label data for machine learning. Now deployed by Cloudflare_
- [Opera MiniPay](https://www.opera.com/products/minipay) _makes mobile payments more accessible and secure for people in Africa with a non-custodial wallet and leverages phone numbers for easy transactions_
- [Roxpay](https://www.roxpay.ch/) _automates pay-per-use asset invoicing and payments_
- [SAP Digital Currency Hub](https://community.sap.com/t5/technology-blogs-by-sap/cross-border-payments-made-easy-with-digital-money-experience-the-future/ba-p/13560384)  _cross border payments with stablecoins_ 
- [Toku](https://www.toku.com/) _payroll, token grant administration, tax compliance, local employment, benefits & distributed HR solutions_ 
- [Xerof](https://www.xerof.com/) _facilitates fast and inexpensive international (cross-border) B2B payments_

### Finance {#finance}

- [ABN AMRO](https://tokeny.com/tokeny-fuels-abn-amro-bank-in-tokenizing-green-bonds-on-polygon/) _with Tokeny, tokenized green bonds_
- [Mata Capital](https://consensys.io/blockchain-use-cases/finance/mata-capital) _real estate investment tokenization_ 
- [Siemens](https://press.siemens.com/global/en/pressrelease/siemens-issues-first-digital-bond-blockchain ) _bond issuance_
- [Sila](https://silamoney.com/) _banking and ACH payments infrastructure-as-a-service, using a stablecoin_
- [Societe Generale FORGE](https://www.sgforge.com/product/bonds/) _bond issuance_
- [Taurus](https://www.taurushq.com/) _issues tokenized securities_

### Asset tokenization {#tokenization}

- [AgroToken](https://agrotoken.io/en/) _tokenizing and trading agricultural commodities_
- [Bitbond](https://www.bitbond.com/) _improves the issuance, settlement and custody of financial assets with tokenization_ 
- [Blocksquare](https://blocksquare.io/) _tokenization infrastructure for real estate_
- [Centrifuge](https://centrifuge.io/) _tokenized receivables financing, debt, and assets_
- [Clearmatics](https://www.clearmatics.com) _builds decentralised network platforms for the p2p exchange of tokenised value_
- [dClimate](https://www.dclimate.net/) _decentralized climate information ecosystem_
- [Fabrica](https://www.fabrica.land/) _a platform for digitizing real estate assets, enabling DeFi borrowing and property trading 
- [Fasset](https://www.fasset.com/) _a platform for supporting sustainable infrastructure_
- [Nori](https://nori.com/) _open source market infrastructure to allow for carbon removal projects to measure and monetize their activity_
- [Propy](https://propy.com/) _a platform to automate residential real estate transactions with smart contracts_
- [RealT](https://realt.co/) _investors around the globe can buy into the US real estate market through fully-compliant, fractional, tokenized ownership_
- [Rubey](https://www.rubey.be/) _a platform that tokenizes high-end art to make it accessible to retail investors_
- [Swarm](https://swarm.com/) _a platform focused on the digitization and trading of real-world assets in a regulatory compliant manner_
- [Thallo](https://www.thallo.io/) _a platform to integrate digital carbon credits into business transactions_
- [Tokenchampions](https://tokenchampions.com/) _tokenizes European football players' image rights_ 

### Notarization of data {#notarization-of-data}

- [ANSA](https://www.ansa.it/english/news/science_tecnology/2020/04/06/ansa-using-blockchain-to-help-readers_af820b4f-0947-439b-843e-52e114f53318.html) _Italian news agency fights fake news and enables readers to verify the origin of news stories by recording them on Mainnet_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _records provenance and repair history of watches on Ethereum_
- [BRØK](https://www.xn--brk-1na.no/) _a cap tables platform for unlisted companies on the public, provided by The Norwegian Government_
- [Certifaction](https://certifaction.com/) _legally valid eSignatures with by privacy-by-design_
- [EthSign](https://ethsign.xyz/) _records signed electronic documents on the Ethereum blockchain_
- [Stacktical](https://stacktical.com/) _enables the software development, digital issuance and digital signature of Service Level Agreements (SLA) with native escrowing capabilities_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _logs press releases on Ethereum to ensure corporate accountability and trust_
- [WolfTown](https://www.mef.net/edge-view-blog/automated-secure-timely-sla-reporting-is-finally-a-reality/) _by MEF and Sage Management automates Service Level Agreement reporting between telecom carriers_

### Supply chain {#supply-chain}

- [Birra Peroni](https://www.ey.com/en_gl/news/2021/05/birra-peroni-is-the-first-industrial-organization-to-mint-unique-non-fungible-tokens-using-ey-opschain-traceability) _mints NFTs for each new batch of beer, enabling greater visibility and efficiency across its supply chain_
- [CargoX](https://cargox.io/) _electroinc bill of lading and document transfer provider for shipping_
- [Circularize](https://www.circularise.com/) _an end-to-end traceability solution for raw materials made into products_
- [EY OpsChain Contract Manager](https://blockchain.ey.com/products/contract-manager) _enables companies to engage in a procurement workflow by issuing RFQ’s, contracts, purchase orders, and invoices across a network of business partners_
- [Minespider](https://www.minespider.com/) _supply chain tracking and provenance, and CO2 emissions tracking_
- [Morpheus.network](https://morpheus.network/) _supply chain automation platform_
- [StaTwig](https://statwig.com/) _supply chain operations_
- [TradeTrust](https://www.tradetrust.io/) _verifies electronic Bills of Lading (eBLs) for international shipping_
- [Transmute](https://transmute.industries/) _data exchange platform for global trade; supports Transactions with Decentralized Identity on Ethereum_

### Insurance {#insurance}

- [Arbol](https://www.arbolmarket.com/) _parmetric insurance to cover weather related risks_
- [Etherisc](https://etherisc.com/) _decentralized insurance for a variety of risks_
- [Nayms](https://www.nayms.com/) _a digital space for the creation of insurance programs, the raising and trading of capital, the writing of risk, and the payment rails for premium and claim transactions, built with AON_

### Identity, credentials and certifications {#credentials}

- [BCdiploma](https://www.bcdiploma.com/) _digitizes and verifies diplomas, certificates, and micro-credentials_
- [Hyland Credentials](https://www.hylandcredentials.com) _digital diplomas and other education credentials, licenses, and certificates_
- [Palau Digital Residency Program](https://rns.id/) _offers global citizens the ability to have a legal Palau government-issued ID_
- [Spherity](https://www.spherity.com/) _offers digital identity management solutions to establish digital trust in ecosystems, focusing on decentralized identities and verifiable credentials_
- [Zug Digital ID](https://ezug.ch/en/) _is a blockchain-based identity system in Switzerland, offering residents digital access to government services and supporting functionalities like e-bike borrowing and municipal voting_

### Entertainment, NFTs, and Loyalty

- [Adidas Virtual Gear](https://www.adidas.com/metaverse) _a virtual gear NFT collection_
- [The British Museum's Sandbox](https://decrypt.co/150405/british-museum-enter-metaverse-via-sandbox) _an NFT collection_
- [Fruitlab](https://fruitlab.com/) _a platform for gamers to earn from watching, sharing and playing online games_
- [Nike Swoosh](https://www.swoosh.nike/) _an NFT platform_
- [Sothbebys Metaverse](https://metaverse.sothebys.com/) _a digital art NFT marketplace by Sothebys_
- [Starbucks Odyssey](https://odyssey.starbucks.com/) _a loylaty program with NFTs_

If you would like to add to this list, please see [instructions for contributing](/contributing/).
