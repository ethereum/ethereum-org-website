---
title: 在以太坊主网络上的企业
description: 有关公共以太坊区块链上的企业应用的指南、文章和工具
lang: zh
---

# 企业以太坊主网络 {#ethereum-for-enterprise}

区块链应用程序有助于企业：

- 增加信任，降低企业之间协调的成本
- 提高业务网络的帐户属性及运营效率
- 发现新的商业模式和创造价值的机会
- 提高组织未来的竞争力

企业级的区块链应用可以建立在以太坊[主网](/glossary/#mainnet)或基于以太坊技术的私有链上。 详见[企业级私有以太坊](/enterprise/private-ethereum/)。

## 以太坊主网与私有链 {#private-vs-public}

以太坊主网是唯一的。 建立在主网上的应用程序能够相互调用，类似于在互联网上建立的应用程序能够相互连接，充分发挥区块链去中心化的潜力。

许多企业和财团已经为基于以太坊技术的特定应用程序部署了私人的、需要许可的区块链。

### 主要区别 {#key-differences}

- 区块链安全/不可变性——区块链能否抵制被篡改是由其协商一致性的算法决定的。 以太网主网的安全是由世界各地的个人和矿工管理的数千个独立节点间的交互保证的。 私有链通常有少数几个节点，由一个或几个组织控制。 这些节点可以被严格地控制，但少数节点重写链上信息或进行欺诈性交易的行为必须受到惩罚。
- 性能——由于私有的以太坊可能使用具有特殊硬件要求和不同共识算法的高性能节点，例如 POA 等。它们可能在基准层（第一层）实现较高的交易吞吐量。 在以太网主网上，使用[第二层扩容解决方案](/developers/docs/scaling/#layer-2-scaling)可以实现高吞吐量。
- 成本——经营私有链的成本主要是建立和管理这条链所花费的精力及运行它的服务器。 虽然与以太网连接没有成本，但每笔交易都有燃料成本，必须在 Ether 支付。 目前正在开发交易转发器（又名燃料站），以消除最终用户甚至企业在交易中直接使用 Ether 的必要性。 一些[分析](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf)显示，在以太坊主网上运行应用程序的总成本可能低于运行私有链。
- 节点权限——只有授权的节点可以加入私有链。 任何人都可以在以太坊主链上设置一个节点。
- 隐私——访问写入私有链的数据可以通过限制访问网络来控制，并更加细粒度地进行访问控制和私有交易。 任何人都可以查看写入到主网一层的所有数据，所以敏感信息应该脱链存储、传输或者加密。 一些实现了以上设想的设计模式已经出现（如 Baseline、Aztec），以及能够保持数据分割的二层解决方案。

### 为什么要在以太坊主网上开发 {#why-build-on-ethereum-mainnet}

企业从 2016 年左右开始使用区块链技术，当时已经有了 Hyperledger、Quorum 和 Corda 项目。 最初的重点主要放在私有企业级区块链上。但从 2019 年开始，人们对商业应用程序在公共与私有区块链上的思考发生了转变。 福雷斯特进行的[调查](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf)显示，“调查答卷人... 看看这个潜力，75% 的人说他们可能会在未来使用公链，将近三分之一的人说他们很可能”。 EY’s Paul Brody 曾经[谈到](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668)有关在以太坊主链上进行构建的优点。其中（根据不同的应用）包括了更强的安全性/不可更改性、透明、低成本及方便与其他主链上的应用交互（网络效应）。 企业之间分享一个共同的参照基准，可以避免不必要地产生无数孤立的节点，它们不能相互沟通、分享或同步信息。

公共区块链另一个引人注意的发展是[二层网络](/developers/docs/scaling/#layer-2-scaling)。 第二层主要是一种可伸缩性技术类别，它提高了公共链上的吞吐量。 但第二层解决方案也可以[解决一些其他问题。这些问题正是当初企业开发者在过去选择私有链的原因](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/)。

## 企业开发者资源 {#enterprise-developer-resources}

### 组织 {#organizations}

不同组织开展了一些合作，让以太坊适合企业用户：

- [企业以太坊联盟（Enterprise Ethereum Alliance, EEA）](https://entethalliance.org/) EEA 旨在让各组织能够在其日常业务中采用和使用以太坊技术。 它让以太坊的生态系统可以找到新的商业机会，推进工业界的采用，并让参与者之间可以相互学习与合作。 EEA 的主网工作组是在公共以太坊主机上建设的企业代表的协调中心，以及希望支持他们的以太坊社区成员。
- [以太坊 OASIS 开放项目（Ethereum OASIS Open Project）](https://github.com/ethereum-oasis/oasis-open-project) 以太坊 OASIS 开放项目是一个 OASIS 开放项目，它为不同的利益攸关方提供了一个中立的论坛，以高质量地规范以太坊长期稳定性、交互性并使其易于集成。 该项目打算制定明确、开放标准、高质量的文档和共同的测试套件，以促进以太坊协议的改进。
- [Baseline 项目](https://www.baseline-protocol.org/) Baseline 协议是一个开放源码倡议，它结合了加密方面，发送消息和区块链的进步，通过公共以太坊主网以低成本的方式提供安全和私人的业务流程。 该协议使企业之间能够进行保密和复杂的合作，而不会在链上留下任何敏感的数据。 Baseline 项目是以太坊 OASIS 开放项目的一个次级项目，由 Baseline 技术指导委员会协调。

### 产品和服务 {#products-and-services}

- [Alchemy](https://www.alchemy.com/) _ 提供了 API 服务和工具，用于构建和监控以太坊上的应用程序_
- [Blast](https://blastapi.io/)_ 为以太坊存档主网和测试网提供远程过程调用/网络套接字应用程序接口的应用程序接口平台_
- [Blockapps](https://blockapps.net/) _通过部署企业级以太坊协议、工具和应用程序接口形成 STRATO 平台_
- [Chainstack](https://chainstack.com/) _ 主网和测试网以太坊基础设施托管在公共及孤立的客户云中_
- [ConsenSys](https://consensys.net/)_ 为以太坊上的开发提供了一系列工具和产品，同时还提供咨询和定制开发服务_
- [Envision Blockchain](https://envisionblockchain.com/)_ 专注于以太坊主网，并提供针对企业的咨询和开发服务_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _ 提供了一个采购流程，让用户在信任的业务合作伙伴网络中发出报价申请、合约、订单和发票_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _ 是一个针对企业的开源以太坊客户端，它依据 Apache 2.0 许可证开发并用 Java 语言编写_
- [Infura](https://infura.io/) _对以太坊和星际文件系统网络进行可扩展的应用程序接口访问_
- [Kaleido](https://kaleido.io/) _ 一个面向企业的开发平台，提供简化的区块链和数字资产应用程序_
- [NodeReal](https://nodereal.io/) _为 Web3 生态系统提供可扩展的区块链基础设施和应用程序接口服务提供商_
- [Provide](https://provide.services/) _为 企业级 Web3 应用程序提供基础设施和应用程序接口_
- [QuickNode](https://www.quicknode.com/) _ 通过非同质化代币应用程序接口、代币应用程序接口等高级应用程序接口提供可靠、快速的节点，同时提供统一的产品套件和企业级解决方案_
- [Tenderly](https://tenderly.co) _一个 Web3 开发平台，为开发、测试、监控和操作智能合约提供调试、可观测性和基础设施构建块_
- [Unibright](https://unibright.io/) _一支拥有 20 多年业务流程和整合经验的团队，成员包括区块链专家、架构师、开发者和咨询人员_
- [Zero Services GmbH](https://www.zeroservices.eu/) _在欧洲和亚洲的联合地点提供托管服务。 安全可靠地运营和监控你的节点_
- [Zeeve](https://www.zeeve.io/) _为在以太坊上构建应用程序提供一系列产品和工具，还为企业级 Web3 应用程序提供基础设施和应用程序接口。_

### 工具和库 {#tooling-and-libraries}

- [Alathio](https://explorer.aleth.io/) _以太坊数据分析平台_
- [Chainlens](https://www.chainlens.com/) _面向公共和私有以太坊兼容网络的数据和分析平台，由 Web3 Labs 提供_
- [Ernst & Young 的“Nightfall”](https://github.com/EYBlockchain/nightfall) _私有的交易工具包_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _与 Web3 应用提供商一起使用的交易签名应用程序_
- [Tenderly](https://tenderly.co/)_，一个提供实时分析、告警和监控，并为专用网络提供支持的数据平台_
- [Truffle Suite](https://trufflesuite.com) _区块链开发套件（Truffle、Ganache、Drizzle）_

### 可扩展性解决方案 {#scalability-solutions}

[二层网络](/layer-2)是在以太坊（一层网络）上运行的一系列技术或系统，它继承了一层网络的安全属性，但和一层网络相比，二层网络具有更强大的交易处理能力（吞吐量）、更低的交易费（操作费用）和更快的交易确认速度。 二层网络扩容解决方案由一层网络保护，但较之于一层网络，它们使区块链应用程序能够处理的用户、操作或数据要多出许多。 其中许多解决方案利用加密和零知识 (ZK) 证明方面取得的最新进展，最大限度地提高性能和安全性。

在二层网络上开发应用程序有助于[解决一些当初导致企业开发者选择在私有区块链上开发的问题](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/)，同时保留了在以太坊主网上开发的好处。

## 以太主网上的企业级应用 {#enterprise-live-on-mainnet}

以下是已经在公共以太主网上开发的一些企业级应用

### 支付 {#payments}

- [Brave 浏览器](https://basicattentiontoken.org/) _因用户关注广告而向用户付费，而用户可以通过 BAT 代币支付出版商以支持他们。_
- [hCaptcha](https://www.hcaptcha.com/) _防止机器人的 CAPTCHA 系统，用户标记数据供机器学习使用，该系统为此项工作给网站运营者付费。 现在由 Cloudflare 部署_
- [EthereumAds](https://ethereumads.com/) _让网站运营者通过以太坊出售广告空间并获得报酬_

### 金融 {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _债券发行和结算_
- [Societe Generale](https://www.generali-investments.com/it/en/institutional/article/generali-investments-and-generali-iard-carry-out-first-market-transaction-based-on-blockchain-infrastructure) _债券发行_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _FAT 品牌债券的发行与代币化_
- [Sila](https://silamoney.com/) _银行即服务和自动清算所 (ACH) 支付基础设施即服务（使用稳定币）_
- [Taurus](https://www.taurushq.com/) _发行代币化债券_

### 资产代币化 {#tokenization}

- [Tinlake](https://tinlake.centrifuge.io/) _通过代币化的实体资产（如发票、抵押或流媒体版权费等）进行应收款项融资_
- [RealT](https://realt.co/) _全球各地的投资者可以通过完全合规、代币化的部分所有权在美国房地产市场购买房产。_
- [AgroToken](https://agrotoken.io/en/) _农产品代币化和交易_
- [Fasset](https://www.fasset.com/) _支持可持续基础设施的平台_

### 数据公证 {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _对最终贷款的详细信息进行哈希处理并记录在主网上_
- [Slusk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _数据完整性可以通过定期将索引数据的哈希值写入主网来确保_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _意大利最大的新闻机构与假新闻作斗争，并使读者能够通过在主网上录制这些新闻故事来验证其来源_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _在以太坊上记录新闻稿，以确保公司的责任和信用_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _在以太坊上记录手表的来源和修理记录_
- [EthSign](https://ethsign.xyz/) _在以太坊区块链上记录签署的电子文件_

### 供应链 {#supply-chain}

- [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _提单和单证传输提供者_
- [Morphosus.network](https://morpheus.network/) _供应链自动化平台，通过以太坊主网上的公证数据实现了私有链的聚合，加拿大食品、石油与天然气经销商 Federated Co-op Ltd. 和阿根廷宠物食品供应商 Vitalcan 等企业目前都在使用该平台_
- [Minespider](https://www.minespider.com/) _供应链跟踪_
- [EY OpsChain Contract Manager](https://blockchain.ey.com/products/contract-manager) _让企业通过在信任的业务合作伙伴网络中发出报价申请、合约、订单和发票，参与采购流程_
- [Treum](https://treum.io/) _使用区块链技术为供应链带来透明度、可追溯性和可交易性_
- [TradeTrust](https://www.tradetrust.io/) _ 验证国际运输中的电子提单 (eBL)_
- [Birra Peroni](https://www.ey.com/en_gl/news/2021/05/birra-peroni-is-the-first-industrial-organization-to-mint-unique-non-fungible-tokens-using-ey-opschain-traceability) _ 可为每批新酿造的啤酒铸造非同质化代币，提高整条供应链的可见性和效率_

### 保险 {#insurance}

- [Arbol](https://www.arbolmarket.com/) _包括天气相关险别的参数险_
- [Etherisc](https://etherisc.com/) _各种险别的分散式保险_

### 凭证与证书 {#credentials}

- [两所意大利高中](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _在以太坊主网上颁发的数字文凭_
- [圣加仑大学](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _验证瑞士一所大学学位的试点项目_
- [Hyland Credentials](https://www.hylandcredentials.com) _数字文凭和其他教育类凭证、许可证和证书_
- [OpenCerts](https://opencerts.io/faq) _在新加坡颁发区块链教育凭证_
- [BlockCerts](https://www.blockcerts.org/) _制定了一个开放的区块链凭证标准_

### 工具 {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _电费支付_

如果想要向这个列表中添加项目，请参阅[贡献说明](/contributing/)。
