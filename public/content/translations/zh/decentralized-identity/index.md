---
title: 去中心化身份
description: 什么是去中心化身份，它为什么很重要？
lang: zh
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoint1: 传统身份系统有权对你的身份标识进行发布、维护和控制。
summaryPoint2: 去中心化身份消除了对中心化第三方的依赖。
summaryPoint3: 多亏了加密技术，用户现在拥有了再次发布、持有和控制其自身身份标识和身份证明的工具。
---

现如今，身份几乎支撑着你生活的方方面面。 使用线上服务、银行开户、选举投票、购买房产、找工作——所有这些都需要证明你的身份。

然而，传统的身份管理系统长期以来一直依赖于中心化中介机构，由这些机构发行、持有和控制您的标识符和[身份证明](/glossary/#attestation)。 这意味着你无法掌控你的身份相关信息，也无法决定谁能够访问你的可识别个人信息 (PII)，以及这些人有多大的访问权限。

为了解决这些问题，我们在以太坊等公链上构建了去中心化身份系统。 去中心化身份允许每个人管理他们的身份相关信息。 借助去中心化身份解决方案，_您_可以创建标识符，声明和持有您的身份证明，而无需依赖服务提供商或政府等中心化机构。

## 什么是身份? {#what-is-identity}

身份是指由一些独特特征定义的一个人的自我意识。 身份是指作为_个体_，即一个独特的人类实体。 身份也可以指其他非人实体，比如组织或行政机构。

<YouTube id="Ew-_F-OtDFI" />

## 什么是身份标识？ {#what-are-identifiers}

身份标识是一条信息，用来指向一个特定身份或多个身份。 常见的身份标识包括：

- 名称
- 社会保障号/税号
- 手机号码
- 出生日期和出生地点
- 数字身份凭证，例如电子邮件地址、用户名、头像

这些传统身份标识示例均由中心化实体发布、持有和控制。 你需要获得政府的许可才能变更自己的姓名，或者需要获得社交媒体平台的许可才能更改自己的昵称。

## 去中心化身份的好处 {#benefits-of-decentralized-identity}

1. 去中心化身份增加了个人对识别信息的控制度。 可以在不依赖中心化机构和第三方服务的情况下验证去中心化身份标识和身份证明。

2. 去中心化身份解决方案为验证和管理用户身份提供了一种免信任、无缝且保护隐私的方法。

3. 去中心化身份利用区块链技术，在不同方之间建立信任，并提供加密保证来证实身份证明的有效性。

4. 去中心化身份使身份数据可移植。 用户将身份证明和标识符存储在移动钱包中，并可以与他们选择的任何一方共享。 去中心化身份标识和身份证明不会被锁在签发组织的数据库中。

5. 去中心化身份应与新兴的[零知识](/glossary/#zk-proof)技术很好地配合，这将使个人能够证明他们拥有某物或做过某事，但无需透露具体是什么。 这可以成为一种将信任和隐私结合在一起的强有力方式，适用于投票等应用。

6. 去中心化身份能使[反女巫](/glossary/#anti-sybil)机制能够识别一个个体假装成多个个体以利用或滥刷某个系统的情况。

## 去中心化身份用例 {#decentralized-identity-use-cases}

去中心化身份有许多可能的用例：

### 1. 通用登录 {#universal-dapp-logins}

去中心化身份有助于实现去中心化身份验证替代密码登录。 服务提供商可以向用户发布认证，这些认证可以存储在以太坊钱包中。 身份证明的一个示例是非同质化代币 ([NFT](/glossary/#nft))，可授予持有者访问在线社区的权限。

然后，[使用以太坊登录](https://siwe.xyz/)功能将使服务器能够确认用户的以太坊帐户，并从其帐户地址获取所需的身份证明。 这意味着用户无需记住冗长的密码即可访问平台和网站，从而改善用户的线上体验。

### 2. KYC 身份验证 {#kyc-authentication}

许多在线服务的使用需要个人提供身份证明和凭证，例如驾驶执照或国家护照。 但这种方法是有问题的，因为私人用户信息可能会被泄露，并且服务提供商无法验证身份证明的真实性。

去中心化身份使公司能够跳过传统的[“了解你的客户”(KYC)](https://en.wikipedia.org/wiki/Know_your_customer) 流程，通过可验证凭证来验证用户身份。 这降低了身份管理的成本，并防止使用伪造证件。

### 3. 投票和在线社区 {#voting-and-online-communities}

在线投票和社交媒体是去中心化身份的两个新应用。 在线投票方案容易受到操控，尤其当恶意行为者创建虚假身份进行投票时。 要求个人提供链上身份认证可以提高在线投票流程的公平性。

去中心化身份可以帮助创建没有虚假帐户的在线社区。 例如，每位用户可能必须使用链上身份系统（如以太坊域名服务）来验证他们的身份，从而减少是机器人的可能性。

### 4. 反女巫保护 {#sybil-protection}

使用[二次方投票](/glossary/#quadratic-voting)的资助应用程序容易受到[女巫攻击](/glossary/#sybil-attack)的影响，因为当更多人投票时，资助的价值就会增加，这会激励用户将捐款分散到多个身份中。 通过增加每位参与者证明他们是真人的负担，去中心化身份有助于防止这种情况发生，尽管通常不必透露具体的私人信息。

### 5. 国家和政府 ID {#national-and-government-id}

政府可以利用去中心化身份的原则，在以太坊上将国家 ID、护照或驾照等基础身份证件作为可验证凭证发行，从而提供强大的加密真实性保证，以减少在线身份验证中的欺诈和伪造行为。 公民可以将这些身份证明存储在他们的个人[钱包](/wallets/)中，并用它们来证明自己的身份、年龄或投票权。

该模型允许选择性披露，特别是在与[零知识证明 (ZKP)](/zero-knowledge-proofs/) 隐私技术结合使用时。 例如，公民可以通过加密方式证明自己年满 18 岁以访问有年龄限制的服务，而无需透露其确切出生日期，从而提供比传统 ID 更高的隐私性。

#### 💡案例研究：以太坊上的不丹国家数字身份 (NDI) {#case-study-bhutan-ndi}

- 为不丹近 80 万公民提供可验证的身份凭证
- 于 2025 年 10 月从 Polygon 网络[迁移到以太坊主网](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878)
- 截至 2025 年 3 月，已发行超过 [234,000 个数字 ID](https://www.blockchain-council.org/blockchain/bhutan-uses-blockchain-in-digital-id-project/)

不丹王国于 2025 年 10 月[将其国家数字身份 (NDI) 系统迁移到](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878)以太坊。 不丹的 NDI 系统建立在去中心化身份和自托管身份的原则之上，使用去中心化标识符和可验证凭证，将数字签名的凭证直接颁发到公民的个人钱包中。 通过将这些凭证的加密证明锚定在以太坊上，该系统确保了它们的真实性、防篡改性，并且任何一方都可以在不查询中央机构的情况下进行验证。

该系统的架构通过使用[零知识证明 (ZKP)](/zero-knowledge-proofs/) 技术来强调隐私。 这种“选择性披露”的实现方式允许公民在访问服务时证明特定事实（例如“我已年满 18 岁”或“我是公民”），而无需透露其完整的身份证号码或确切的出生日期等基础个人数据。 这展示了以太坊在构建安全、以用户为中心且保护隐私的国家 ID 系统方面的强大实际应用。

#### 💡案例研究：以太坊[二层网络](/layer-2/) ZKSync Era 上的布宜诺斯艾利斯市 QuarkID {#case-study-buenos-aires-quarkid}

- 在发布时向超过 [360 万用户](https://buenosaires.gob.ar/innovacionytransformaciondigital/miba-con-tecnologia-quarkid-la-ciudad-de-buenos-aires-incorporo)颁发了去中心化身份凭证
- QuarkID 是一种开源协议，被联合国可持续发展目标认定为[数字公共产品](https://www.digitalpublicgoods.net/r/quarkid)
- 强调“[政府即用户](https://buenosaires.gob.ar/innovacionytransformaciondigital/miba-con-tecnologia-quarkid-la-ciudad-de-buenos-aires-incorporo)”模型，即市政府不拥有该协议，从而赋予公民完全的数据所有权和隐私权

2024 年，布宜诺斯艾利斯市政府 (GCBA) 将 QuarkID 集成到 miBA 中。QuarkID 是由 GCBA 创新和数字化转型秘书处构建的开源“数字信任框架”，miBA 则是该市居民用于访问政府服务和官方文件的官方应用程序。 发布时，miBA 的所有 360 多万用户都获得了去中心化的数字身份，允许他们管理和分享链上可验证的数字文件和证书，包括公民身份凭证、出生、结婚和死亡证明、税务记录、疫苗接种记录等。

QuarkID 系统建立在以太坊[二层网络](/layer-2/) ZKSync Era 之上，使用 ZKP 技术，允许公民通过移动设备点对点地验证个人凭证，而无需暴露不必要的个人数据。 该计划强调了一个“政府即用户”的模型，其中 GCBA 作为开源、可互操作的 QuarkID 协议的一个用户，而不是一个中心化的所有者。 这种支持 ZKP 的架构提供了一个关键的隐私功能：任何第三方，甚至包括 GCBA，都无法追踪公民如何、何时或为何使用他们的凭证。 这个成功的项目为公民提供了完全的自托管身份和对其敏感数据的控制权，所有这些都由以太坊的全球分布式网络保障安全。

## 什么是身份证明？ {#what-are-attestations}

身份证明是一个实体对另一个实体提出的所有权声明。 如果你在美国生活，你的驾驶执照会由美国车辆管理局（一个实体）颁发，它证明你（另一个实体）依法可驾驶汽车。

身份证明与身份标识不同。 身份证明_包含_用于引用特定身份的标识符，并对与此身份相关的属性进行声明。 因此，你的驾驶执照具有身份标识（姓名、出生日期、地址），但也是你具有合法驾驶权利的证明。

### 什么是去中心化身份标识？ {#what-are-decentralized-identifiers}

诸如你的法定姓名或电子邮件地址等传统身份标识依赖于第三方——政府和电子邮件提供商。 去中心化身份标识 (DID) 则不同——它们不由任何中心实体发布、管理或控制。

去中心化身份标识由个人发行、持有和控制。 [以太坊帐户](/glossary/#account)是去中心化标识符的一个示例。 你可以根据需要创建任意数量的帐户，无需任何人的许可，也无需将它们存储在一个中心注册系统中。

去中心化标识符存储在分布式账本（[区块链](/glossary/#blockchain)）或[点对点网络](/glossary/#peer-to-peer-network)上。 这使得去中心化标识符 (DID) [具有全局唯一性、高可用性、可解析性，并可加密验证](https://w3c-ccg.github.io/did-primer/)。 去中心化身份标识可与不同的实体相关联，包括个人、组织或政府机构。

## 是什么让去中心化身份标识成为可能？ 是什么让去中心化标识符成为可能？{#what-makes-decentralized-identifiers-possible}

### 1. 公钥密码学 {#public-key-cryptography}

公钥密码学是一种信息安全措施，为实体生成一个[公钥](/glossary/#public-key)和一个[私钥](/glossary/#private-key)。 公钥[密码学](/glossary/#cryptography)在区块链网络中用于验证用户身份和证明数字资产的所有权。

一些去中心化身份标识，如以太坊帐户，都有公钥和私钥。 公钥用于识别帐户的操控者，而私钥可以签名和解密此帐户的消息。 公钥密码学提供验证实体身份、防止冒充和使用虚假身份所需的证明，它使用[加密签名](https://andersbrownworth.com/blockchain/public-private-keys/)来验证所有声明。

### 2. 去中心化数据存储 {#decentralized-datastores}

区块链是一个可验证数据注册系统：一个开放的去信任去中心化信息库。 公链的存在使得不再需要将身份标识存储在中心化注册系统。

如有任何人需要确认去中心化身份标识的有效性，他们可以在区块链上查找相关公钥。 这与需要第三方进行身份认证的传统身份标识不同。

## 去中心化身份标识和身份证明如何实现去中心化身份？ 去中心化标识符和身份证明如何实现去中心化身份？{#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

去中心化身份的概念是，与身份有关的信息应由自己控制，且应该是私密和可移植的，而其主要构成要素是去中心化身份标识和身份证明。

在去中心化身份的背景下，身份证明（也称为[可验证凭证](https://www.w3.org/TR/vc-data-model/)）是由签发者发布的、防篡改、可加密验证的声明。 实体（如，组织）发出的每个身份证明或可验证凭证都与他们的去中心化身份标识有关。

由于去中心化身份标识存储在区块链上，任何人都可以多方查证以太坊上签发者的去中心化身份标识，以验证身份证明的有效性。 实际上，以太坊区块链就像是一个共用目录，能够验证与某些实体相关的去中心化身份标识。

去中心化身份标识是让身份证明能够自行控制和可以验证的原因。 即使签发者不再存在，持有人也总会有证据证实该身份证明的出处和有效性。

去中心化身份标识对于通过去中心化身份保护个人隐私信息不受侵犯也至关重要。 例如，如果某人提交一份身份证明的证据（驾驶执照），则验证者不需要检查证据中信息的有效性。 只需要获得身份证明真实性的加密保证，以及颁发组织身份的加密保证，验证者就可以确定证据是否有效。

## 去中心化身份中的身份证明类型 {#types-of-attestations-in-decentralized-identity}

在基于太坊的身份生态系统中，如何存储和检索身份证明信息与传统身份管理系统不同。 下文概括了一些在去中心化身份系统中签发、存储和验证身份证明的方法。

### 链下身份证明 {#offchain-attestations}

将身份认证存储在链上的一个问题是，其中可能包含个人想要保密的信息。 以太坊区块链具有开放性，因此不适合用于存储此类身份证明。

解决方法是签发身份认证至用户的数字钱包，由用户链下持有，但使用签发者链上存储的去中心化身份标识进行签名。 这些身份证明被编码为 [JSON Web 令牌](https://en.wikipedia.org/wiki/JSON_Web_Token)，其中包含签发者的数字签名——可以轻松验证链下声明。

以下是用于解释链下身份认证的假设场景：

1. 大学（签发者）生成身份证明（数字学术证书），用其密钥签名，然后将其颁发给 Bob（身份所有者）。

2. Bob 申请了一份工作并想向雇主证明他的学历，因此他分享了移动钱包中的身份证明。 然后，公司（验证者）可以通过检查签发者的去中心化身份（即其在以太坊上的公钥）来确认身份证明的有效性。

### 具有持久访问权限的链下身份证明 {#offchain-attestations-with-persistent-access}

在这种协议下，身份证明被转换为 JSON 文件并存储在链下（理想情况下存储在 IPFS 或 Swarm 等[去中心化云存储](/developers/docs/storage/)平台上）。 但是，JSON 文件的[哈希](/glossary/#hash)值存储在链上，并通过链上注册表链接至去中心化标识符 (DID)。 所关联的去中心化身份可以是身份证明的签发者或接收者。

这种方法使身份证明能够基于区块链长期存在，同时使声明信息保持加密并维持其可验证性。 它还允许选择性披露，因为私钥的持有者可以解密信息。

### 链上身份证明 {#onchain-attestations}

链上身份证明保存在以太坊区块链上的[智能合约](/glossary/#smart-contract)中。 智能合约（充当注册系统）将身份认证映射到相应的链上去中心化身份标识（公钥）。

以下示例展示了链上身份认证在实践中的使用方式：

1. 一家公司（XYZ 公司）计划使用智能合约出售所有权份额，但只想卖给那些已完成背景调查的买家。

2. XYZ 公司可以让执行背景调查的公司在以太坊上发布链上身份认证。 此身份证明可以证实某人已通过背景调查，但不会暴露任何个人信息。

3. 出售股份的智能合约可以核查注册合约中筛选出的买家的身份，从而使智能合约确定哪些人可以购买股份。

### 灵魂绑定代币和身份 {#soulbound}

[灵魂绑定代币](https://vitalik.eth.limo/general/2022/01/26/soulbound.html)（[不可转让的 NFT](/glossary/#nft)）可用于收集特定钱包的独有信息。 这有效地创建了一个绑定至特定以太坊地址的唯一链上身份，其中可能包括代表成就（例如完成某些特定在线课程或在游戏中达到阈值分数）或社区参与度的代币。

## 使用去中心化身份 {#use-decentralized-identity}

有许多雄心勃勃的项目使用以太坊作为去中心化身份解决方案的基础：

- **[以太坊域名服务 (ENS)](https://ens.domains/)** - _一种去中心化的命名系统，用于机器可读的链上标识符，如以太坊钱包地址、内容哈希和元数据。_
- **[使用以太坊登录 (SIWE)](https://siwe.xyz/)** - _使用以太坊帐户进行身份验证的开放标准。_
- **[SpruceID](https://www.spruceid.com/)** - _一个去中心化身份项目，允许用户使用以太坊帐户和 ENS 个人资料来控制数字身份，而无需依赖第三方服务。_
- **[以太坊身份证明服务 (EAS)](https://attest.org/)** - _一个去中心化的账本/协议，用于对任何事物进行链上或链下身份证明。_
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (或 PoH) 是一个建立在以太坊上的社会身份验证系统。_
- **[BrightID](https://www.brightid.org/)** - _一个去中心化的开源社交身份网络，旨在通过创建和分析社交图谱来改革身份验证。_
- **[walt.id](https://walt.id)** — _开源的去中心化身份和钱包基础设施，使开发人员和组织能够利用自托管身份和 NFT/SBT。_
- **[Veramo](https://veramo.io/)** - _一个 JavaScript 框架，让任何人都可以轻松地在他们的应用程序中使用可加密验证的数据。_

## 扩展阅读{#further-reading}

### 文章 {#articles}

- [区块链用例：数字身份中的区块链](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [什么是以太坊 ERC725？ 区块链上的自托管身份管理](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [区块链如何解决数字身份问题](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [什么是去中心化身份，为何要关注它？](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [去中心化身份简介](https://walt.id/white-paper/digital-identity) — _Dominik Beron_

### 视频 {#videos}

- [去中心化身份（直播附赠环节）](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Andreas Antonopolous 制作的关于去中心化身份的精彩解说视频_
- [使用以太坊和 Ceramic、IDX、React 以及 3ID Connect 登录和实现去中心化身份](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Nader Dabit 制作的 YouTube 教程，介绍如何使用用户的以太坊钱包构建身份管理系统以创建、读取和更新他们的个人资料_
- [BrightID - 以太坊上的去中心化身份](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Bankless 播客节目，讨论以太坊的去中心化身份解决方案 BrightID_
- [链下互联网：去中心化身份和可验证凭证](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Evin McMullen 在 2022 年 EthDenver 上的演讲
- [可验证凭证解说](https://www.youtube.com/watch?v=ce1IdSr-Kig) - Tamino Baumann 制作的 YouTube 解说视频（含演示）

### 社区 {#communities}

- [GitHub 上的 ERC-725 联盟](https://github.com/erc725alliance) — _支持在以太坊区块链上管理身份的 ERC725 标准_
- [EthID Discord 服务器](https://discord.com/invite/ZUyG3mSXFD) — _致力于“使用以太坊登录”和“以太坊关注协议”的爱好者和开发人员社区_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _一个为应用程序构建可验证数据框架的开发人员社区_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — _一个由开发人员和构建者组成的社区，致力于研究跨各种行业的去中心化身份用例_
