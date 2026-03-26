---
title: 去中心化身份
description: 什么是去中心化身份，为什么它很重要？
lang: zh
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoint1: 传统的身份系统将标识符的发行、维护和控制集中化。
summaryPoint2: 去中心化身份消除了对中心化第三方的依赖。
summaryPoint3: 借助加密技术，用户现在拥有了再次发行、持有和控制自己的标识符和证明的工具。
---

如今，身份几乎支撑着你生活的方方面面。使用在线服务、开设银行账户、在选举中投票、购买房产、获得就业——所有这些都需要证明你的身份。

然而，传统的身份管理系统长期以来一直依赖中心化中介机构，由他们发行、持有和控制你的标识符和[证明](/glossary/#attestation)。这意味着你无法控制与身份相关的信息，也无法决定谁可以访问个人身份信息 (PII) 以及这些机构拥有多大的访问权限。

为了解决这些问题，我们在[以太坊](/)等公共区块链上构建了去中心化身份系统。去中心化身份允许个人管理其与身份相关的信息。借助去中心化身份解决方案，*你*可以创建标识符，并声明和持有你的证明，而无需依赖服务提供商或政府等中央机构。

## 什么是身份？ {#what-is-identity}

身份是指个人的自我意识，由独特的特征来定义。身份指的是作为一个*个体*，即一个独特的人类实体。身份也可以指其他非人类实体，例如组织或机构。

<YouTube id="Ew-_F-OtDFI" />

## 什么是标识符？ {#what-are-identifiers}

标识符是一段信息，充当指向特定身份的指针。常见的标识符包括：

- 姓名
- 社会安全号码/纳税识别号码
- 手机号码
- 出生日期和地点
- 数字身份凭证，例如电子邮件地址、用户名、头像

这些传统的标识符示例由中心化实体发行、持有和控制。你需要获得政府的许可才能更改姓名，或者获得社交媒体平台的许可才能更改用户名。

## 去中心化身份的好处 {#benefits-of-decentralized-identity}

1. 去中心化身份增加了个人对身份信息的控制。去中心化标识符和证明可以在不依赖中心化机构和第三方服务的情况下进行验证。

2. 去中心化身份解决方案促进了一种无需信任、无缝且保护隐私的方法，用于验证和管理用户身份。

3. 去中心化身份利用区块链技术，在不同方之间建立信任，并提供加密保证以证明证明的有效性。

4. 去中心化身份使身份数据具有可移植性。用户将证明和标识符存储在移动钱包中，并可以与他们选择的任何一方共享。去中心化标识符和证明不会被锁定在发行组织的数据库中。

5. 去中心化身份应与新兴的[零知识](/glossary/#zk-proof)技术良好配合，这将使个人能够证明他们拥有或做过某事，而无需透露具体是什么事。这可能成为将信任和隐私结合起来用于投票等应用程序的强大方式。

6. 去中心化身份支持[反女巫攻击](/glossary/#anti-sybil)机制，以识别何时有一个人假装成多个人来操纵系统或发送垃圾信息。

## 去中心化身份用例 {#decentralized-identity-use-cases}

去中心化身份有许多潜在的用例：

### 1. 通用登录 {#universal-dapp-logins}

去中心化身份可以帮助用去中心化身份验证取代基于密码的登录。服务提供商可以向用户发行证明，这些证明可以存储在以太坊钱包中。证明的一个例子是授予持有者访问在线社区权限的 [NFT](/glossary/#nft)。

然后，[使用以太坊登录 (Sign-In with Ethereum)](https://siwe.xyz/) 功能将使服务器能够确认用户的以太坊账户，并从其账户地址获取所需的证明。这意味着用户无需记住长密码即可访问平台和网站，从而改善了用户的在线体验。

### 2. KYC 身份验证 {#kyc-authentication}

使用许多在线服务需要个人提供证明和凭证，例如驾驶执照或国家护照。但这种方法存在问题，因为用户的私人信息可能会被泄露，而且服务提供商无法验证证明的真实性。

去中心化身份允许公司跳过传统的[了解你的客户 (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) 流程，并通过可验证凭证 (Verifiable Credentials) 验证用户身份。这降低了身份管理的成本，并防止了伪造文件的使用。

### 3. 投票和在线社区 {#voting-and-online-communities}

在线投票和社交媒体是去中心化身份的两个新颖应用。在线投票方案容易受到操纵，特别是如果恶意行为者创建虚假身份进行投票。要求个人出示链上证明可以提高在线投票过程的完整性。

去中心化身份可以帮助创建没有虚假账户的在线社区。例如，每个用户可能必须使用链上身份系统（如以太坊域名服务）来验证其身份，从而降低机器人存在的可能性。

### 4. 反女巫攻击保护 {#sybil-protection}

使用[二次方投票](/glossary/#quadratic-voting)的赠款发放应用程序容易受到[女巫攻击](/glossary/#sybil-attack)，因为当更多人投票支持某项赠款时，其价值就会增加，这会激励用户将他们的贡献分散到多个身份中。去中心化身份通过增加每个参与者证明自己是真实人类的负担来帮助防止这种情况，尽管通常无需透露具体的私人信息。

### 5. 国家和政府身份证件 {#national-and-government-id}

政府可以利用去中心化身份的原则，在以太坊上将基础身份文件（如国民身份证、护照或驾驶执照）作为可验证凭证发行，提供强大的加密真实性保证，以减少在线身份验证中的欺诈和伪造。公民可以将这些证明存储在他们的个人[钱包](/wallets/)中，并使用它们来证明自己的身份、年龄或投票权。

这种模式允许选择性披露，特别是当与[零知识证明 (ZKP)](/zero-knowledge-proofs/) 隐私技术结合使用时。例如，公民可以通过加密方式证明自己年满 18 岁，以访问受年龄限制的服务，而无需透露其确切的出生日期，从而提供比传统身份证件更好的隐私保护。

#### 💡案例研究：以太坊上的不丹国家数字身份 (NDI) {#case-study-bhutan-ndi}

- 为不丹近 80 万公民提供可验证凭证的访问权限
- 于 2025 年 10 月从 Polygon 网络迁移[至以太坊主网](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878)
- 截至 2025 年 3 月，已发行超过 [234,000 个数字身份](https://www.blockchain-council.org/blockchain/bhutan-uses-blockchain-in-digital-id-project/)

不丹王国于 2025 年 10 月[将其国家数字身份 (NDI) 系统迁移](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878)至以太坊。不丹的 NDI 系统建立在去中心化身份和自我主权身份的原则之上，使用去中心化标识符和可验证凭证，将经过数字签名的凭证直接发行到公民的个人钱包中。通过将这些凭证的发行者模式锚定在以太坊上，该系统确保它们是真实的、防篡改的，并且可以由任何一方进行验证，而无需查询中央机构。

## 什么是证明？ {#what-are-attestations}

证明是一个实体对另一个实体做出的声明。如果你住在美国，机动车辆管理局（一个实体）颁发给你的驾驶执照证明你（另一个实体）在法律上被允许驾驶汽车。

证明不同于标识符。证明*包含*用于引用特定身份的标识符，并对与该身份相关的属性做出声明。因此，你的驾驶执照具有标识符（姓名、出生日期、地址），但同时也是关于你合法驾驶权利的证明。

### 什么是去中心化标识符？ {#what-are-decentralized-identifiers}

传统的标识符（如你的法定姓名或电子邮件地址）依赖于第三方——政府和电子邮件提供商。去中心化标识符 (DID) 则不同——它们不由任何中心化实体发行、管理或控制。

去中心化标识符由个人发行、持有和控制。[以太坊账户](/glossary/#account)就是去中心化标识符的一个例子。你可以创建任意数量的账户，无需任何人的许可，也无需将它们存储在中央注册表中。

去中心化标识符存储在分布式账本（[区块链](/glossary/#blockchain)）或[点对点网络](/glossary/#peer-to-peer-network)上。这使得 DID 具有[全局唯一性、高可用性可解析性以及加密可验证性](https://w3c-ccg.github.io/did-primer/)。去中心化标识符可以与不同的实体相关联，包括个人、组织或政府机构。

## 是什么让去中心化标识符成为可能？ {#what-makes-decentralized-identifiers-possible}

### 1. 公钥密码学 {#public-key-cryptography}

公钥密码学是一种信息安全措施，它为一个实体生成[公钥](/glossary/#public-key)和[私钥](/glossary/#private-key)。公钥[密码学](/glossary/#cryptography)在区块链网络中用于验证用户身份并证明数字资产的所有权。

一些去中心化标识符（例如以太坊账户）具有公钥和私钥。公钥标识账户的控制者，而私钥可以为该账户签名和解密消息。公钥密码学提供了验证实体所需的证明，并防止冒充和使用虚假身份，使用[加密签名](https://andersbrownworth.com/blockchain/public-private-keys/)来验证所有声明。

### 2. 去中心化数据存储 {#decentralized-datastores}

区块链充当可验证的数据注册表：一个开放、无需信任且去中心化的信息存储库。公共区块链的存在消除了将标识符存储在中心化注册表中的需要。

如果任何人需要确认去中心化标识符的有效性，他们可以在区块链上查找关联的公钥。这不同于需要第三方进行身份验证的传统标识符。

## 去中心化标识符和证明如何实现去中心化身份？ {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

去中心化身份的理念是，与身份相关的信息应该是自我控制的、私密的和可移植的，而去中心化标识符和证明是其主要的构建模块。

在去中心化身份的背景下，证明（也称为[可验证凭证](https://www.w3.org/TR/vc-data-model/)）是发行者做出的防篡改、加密可验证的声明。实体（例如组织）发行的每个证明或可验证凭证都与其 DID 相关联。

因为 DID 存储在区块链上，任何人都可以通过在以太坊上交叉检查发行者的 DID 来验证证明的有效性。本质上，以太坊区块链就像一个全局目录，能够验证与某些实体关联的 DID。

去中心化标识符是证明能够自我控制和可验证的原因。即使发行者不再存在，持有者也始终拥有证明其出处和有效性的证据。

去中心化标识符对于通过去中心化身份保护个人信息的隐私也至关重要。例如，如果个人提交了证明的证据（驾驶执照），验证方不需要检查证据中信息的有效性。相反，验证者只需要证明真实性的加密保证以及发行组织的身份，即可确定证据是否有效。

## 去中心化身份中的证明类型 {#types-of-attestations-in-decentralized-identity}

在基于以太坊的身份生态系统中，证明信息的存储和检索方式与传统的身份管理不同。以下是去中心化身份系统中发行、存储和验证证明的各种方法的概述：

### 链下证明 {#offchain-attestations}

将证明存储在链上的一个担忧是，它们可能包含个人希望保密的信息。以太坊区块链的公开性质使得存储此类证明缺乏吸引力。

解决方案是发行证明，由用户在数字钱包中链下持有，但使用存储在链上的发行者 DID 进行签名。这些证明被编码为 [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) 并包含发行者的数字签名——这使得链下声明的验证变得容易。

这是一个假设的场景，用于解释链下证明：

1. 一所大学（发行者）生成一份证明（数字学历证书），用其密钥签名，并将其发给 Bob（身份所有者）。

2. Bob 申请工作并希望向雇主证明他的学历，因此他从移动钱包中分享了该证明。然后，公司（验证者）可以通过检查发行者的 DID（即其在以太坊上的公钥）来确认证明的有效性。

### 具有持久访问权限的链下证明 {#offchain-attestations-with-persistent-access}

在这种安排下，证明被转换为 JSON 文件并存储在链下（理想情况下是在[去中心化云存储](/developers/docs/storage/)平台上，例如 IPFS 或 Swarm）。然而，JSON 文件的[哈希](/glossary/#hash)存储在链上，并通过链上注册表链接到 DID。关联的 DID 可以是证明发行者的，也可以是接收者的。

这种方法使证明能够获得基于区块链的持久性，同时保持声明信息加密和可验证。它还允许选择性披露，因为私钥的持有者可以解密信息。

### 链上证明 {#onchain-attestations}

链上证明保存在以太坊区块链上的[智能合约](/glossary/#smart-contract)中。智能合约（充当注册表）将证明映射到相应的链上去中心化标识符（公钥）。

这是一个示例，展示链上证明在实践中可能如何工作：

1. 一家公司 (XYZ Corp) 计划使用智能合约出售所有权股份，但只希望已完成背景调查的买家参与。

2. XYZ Corp 可以让执行背景调查的公司在以太坊上发行链上证明。该证明认证个人已通过背景调查，而不会暴露任何个人信息。

3. 出售股份的智能合约可以检查注册表合约以获取经过筛选的买家身份，从而使智能合约能够确定谁被允许购买股份。

### 灵魂绑定代币与身份 {#soulbound}

[灵魂绑定代币 (Soulbound tokens)](https://vitalik.eth.limo/general/2022/01/26/soulbound.html)（[不可转让的非同质化代币](/glossary/#nft)）可用于收集特定钱包独有的信息。这有效地创建了一个绑定到特定以太坊地址的独特链上身份，其中可能包括代表成就（例如，完成某些特定的在线课程或在游戏中通过阈值分数）或社区参与的代币。

## 使用去中心化身份 {#use-decentralized-identity}

有许多雄心勃勃的项目使用以太坊作为去中心化身份解决方案的基础：

- **[以太坊域名服务 (ENS)](https://ens.domains/)** - *一个去中心化的命名系统，用于链上机器可读的标识符，例如以太坊钱包地址、内容哈希和元数据。*
- **[使用以太坊登录 (SIWE)](https://siwe.xyz/)** - *使用以太坊账户进行身份验证的开放标准。*
- **[SpruceID](https://www.spruceid.com/)** - *一个去中心化身份项目，允许用户使用以太坊账户和 ENS 配置文件控制数字身份，而不是依赖第三方服务。*
- **[以太坊证明服务 (EAS)](https://attest.org/)** - *一个去中心化账本/协议，用于对任何事物进行链上或链下证明。*
- **[Proof of Humanity](https://www.proofofhumanity.id)** - *Proof of Humanity（或 PoH）是一个建立在以太坊上的社会身份验证系统。*
- **[Veramo](https://veramo.io/)** - *一个 JavaScript 框架，使任何人都可以轻松地在其应用程序中使用加密可验证的数据。*

## 进一步阅读 {#further-reading}

### 文章 {#articles}

- [区块链用例：数字身份中的区块链](https://consensys.net/blockchain-use-cases/digital-identity/) — *ConsenSys*
- [什么是以太坊 ERC725？区块链上的自我主权身份管理](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — *Sam Town*
- [区块链如何解决数字身份问题](https://time.com/6142810/proof-of-humanity/) — *Andrew R. Chow*
- [什么是去中心化身份，为什么你应该关心？](https://web3.hashnode.com/what-is-decentralized-identity) — *Emmanuel Awosika*
- [去中心化身份简介](https://walt.id/white-paper/digital-identity) — *Dominik Beron*

### 视频 {#videos}

- [去中心化身份（额外直播环节）](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — *Andreas Antonopolous 关于去中心化身份的精彩讲解视频*
- [使用以太坊登录以及使用 Ceramic、IDX、React 和 3ID Connect 的去中心化身份](https://www.youtube.com/watch?v=t9gWZYJxk7c) — *Nader Dabit 在 YouTube 上的教程，介绍如何构建一个身份管理系统，以使用用户的以太坊钱包创建、读取和更新用户个人资料*
- [BrightID - 以太坊上的去中心化身份](https://www.youtube.com/watch?v=D3DbMFYGRoM) — *Bankless 播客节目，讨论以太坊的去中心化身份解决方案 BrightID*
- [链下互联网：去中心化身份与可验证凭证](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Evin McMullen 在 EthDenver 2022 上的演讲
- [可验证凭证详解](https://www.youtube.com/watch?v=ce1IdSr-Kig) - Tamino Baumann 在 YouTube 上的讲解视频及演示

### 社区 {#communities}

- [GitHub 上的 ERC-725 联盟](https://github.com/erc725alliance) — *在以太坊区块链上管理身份的 ERC725 标准的支持者*
- [EthID Discord 服务器](https://discord.com/invite/ZUyG3mSXFD) — *致力于使用以太坊登录和以太坊关注协议 (Ethereum Follow Protocol) 的爱好者和开发者的社区*
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — *一个致力于为应用程序构建可验证数据框架的开发者社区*
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — *一个致力于跨各个行业的去中心化身份用例的开发者和构建者社区*