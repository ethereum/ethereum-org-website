---
title: "什么是 DAO？"
metaTitle: "什么是 DAO？| 去中心化自治组织"
description: "以太坊上的 DAO 概览"
lang: zh
template: use-cases
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: "DAO 对提案进行投票的示意图。"
summaryPoints:
  - "没有中心化领导的成员所有制社区。"
  - "与互联网上的陌生人安全协作的方式。"
  - "为特定事业投入资金的安全场所。"
---

## 什么是 DAO？ {#what-are-daos}

DAO 是一个共同所有、致力于共同使命的组织。

DAO 允许我们与全球志同道合的人合作，而无需信任某个仁慈的领导者来管理资金或运营。这里没有可以随心所欲花费资金的首席执行官，也没有可以操纵账本的首席财务官。相反，写入代码的基于区块链的规则定义了组织的运作方式和资金的使用方式。

它们内置了金库，未经群体批准，任何人无权访问。决策由提案和投票进行治理，以确保组织中的每个人都有发言权，并且一切都在[链上](/glossary/#onchain)透明地发生。

## 为什么我们需要 DAO？ {#why-dao}

与他人共同创立一个涉及资金和金钱的组织，需要对合作者有极大的信任。但是，很难信任一个只在互联网上交流过的人。有了 DAO，你不需要信任群体中的任何其他人，只需信任 DAO 的代码，该代码是 100% 透明的，并且任何人都可以验证。

这为全球协作和协调开辟了许多新机会。

### 比较 {#dao-comparison}

| DAO                                                                                                                     | 传统组织                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 通常是扁平化的，并且完全民主化。                                                                                   | 通常是等级制的。                                                                            |
| 实施任何更改都需要成员投票。                                                           | 根据结构的不同，更改可能由单方要求，或者可能提供投票。     |
| 计票并自动实施结果，无需受信任的中间人。                                      | 如果允许投票，则在内部计票，并且必须手动处理投票结果。 |
| 提供的服务以去中心化的方式自动处理（例如慈善资金的分配）。 | 需要人工处理或集中控制的自动化，容易被操纵。              |
| 所有活动都是透明且完全公开的。                                                                           | 活动通常是私密的，对公众有限制。                                        |

### DAO 示例 {#dao-examples}

为了帮助你更好地理解，以下是几个如何使用 DAO 的示例：

- **慈善机构** —— 你可以接受世界上任何人的捐款，并投票决定资助哪些事业。
- **集体所有权** —— 你可以购买实物或数字资产，成员可以投票决定如何使用它们。
- **风险投资和资助** —— 你可以创建一个风险投资基金，汇集投资资本并投票决定支持哪些企业。偿还的资金随后可以在 DAO 成员之间重新分配。

<VideoWatch slug="dao-build-next-great-city" />

## DAO 是如何运作的？ {#how-daos-work}

DAO 的骨干是其[智能合约](/glossary/#smart-contract)，它定义了组织的规则并持有群体的金库。一旦合约在[以太坊](/)上生效，除了通过投票，任何人都无法更改规则。如果有人试图做一些代码中的规则和逻辑未涵盖的事情，它将会失败。而且因为金库也是由智能合约定义的，这意味着未经群体批准，任何人都无法动用资金。这意味着 DAO 不需要中央机构。相反，群体共同做出决策，并在投票通过时自动授权付款。

这是可能的，因为智能合约一旦在以太坊上生效就防篡改。你不能在不被人们注意的情况下随意编辑代码（DAO 的规则），因为一切都是公开的。

## 以太坊与 DAO {#ethereum-and-daos}

以太坊是 DAO 的完美基础，原因如下：

- 以太坊自身的共识是去中心化的，并且足够成熟，足以让组织信任该网络。
- 智能合约代码一旦生效就无法修改，即使是其所有者也无法修改。这使得 DAO 能够按照其编程的规则运行。
- 智能合约可以发送/接收资金。如果没有这一点，你将需要一个受信任的中间人来管理群体资金。
- 事实证明，以太坊社区更具协作性而非竞争性，这使得最佳实践和支持系统能够迅速涌现。

## DAO 治理 {#dao-governance}

在治理 DAO 时有许多注意事项，例如投票和提案如何运作。

### 委托 {#governance-delegation}

委托就像是 DAO 版本的代议制民主。代币持有者将选票委托给那些自我提名并承诺管理协议和保持知情的用户。

#### 著名示例 {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) —— ENS 持有者可以将他们的选票委托给积极参与的社区成员来代表他们。

### 自动交易治理 {#governance-example-2}

在许多 DAO 中，如果达到法定人数的成员投赞成票，交易将被自动执行。

#### 著名示例 {#governance-example-3}

[Nouns](https://nouns.wtf) —— 在 Nouns DAO 中，如果满足法定投票人数且多数投赞成票，只要创始人不否决，交易就会自动执行。

### 多重签名治理 {#governance-example-4}

虽然 DAO 可能有数千名投票成员，但资金可以存放在一个由 5-20 名活跃社区成员共享的[钱包](/glossary/#wallet)中，这些成员受到信任并且通常是实名的（社区知道其公开身份）。投票后，[多重签名](/glossary/#multisig)签名者执行社区的意愿。

## DAO 法律 {#dao-laws}

1977 年，怀俄明州发明了有限责任公司 (LLC)，它保护企业家并限制他们的责任。最近，他们率先制定了确立 DAO 法律地位的 DAO 法律。目前，怀俄明州、佛蒙特州和维尔京群岛都有某种形式的 DAO 法律。

### 著名示例 {#law-example}

[CityDAO](https://citizen.citydao.io/) —— CityDAO 利用怀俄明州的 DAO 法律在黄石国家公园附近购买了 40 英亩土地。

## DAO 成员资格 {#dao-membership}

DAO 成员资格有不同的模式。成员资格可以决定投票的运作方式以及 DAO 的其他关键部分。

### 基于代币的成员资格 {#token-based-membership}

通常是完全[无需许可](/glossary/#permissionless)的，具体取决于所使用的代币。大多数情况下，这些治理代币可以在[去中心化交易所](/glossary/#dex)上无需许可地进行交易。其他代币必须通过提供流动性或某种“工作量证明”来赚取。无论哪种方式，只需持有代币即可获得投票权。

_通常用于治理广泛的去中心化协议和/或代币本身。_

#### 著名示例 {#token-example}

[MakerDAO](https://makerdao.com) —— MakerDAO 的代币 MKR 在去中心化交易所上广泛可用，任何人都可以通过购买来获得对 Maker 协议未来的投票权。

### 基于股份的成员资格 {#share-based-membership}

基于股份的 DAO 更多是许可型的，但仍然相当开放。任何潜在成员都可以提交加入 DAO 的提案，通常以代币或工作的形式提供某种价值的贡品。股份代表直接的投票权和所有权。成员可以随时带着他们在金库中按比例分配的份额退出。

_通常用于更紧密、以人为本的组织，如慈善机构、工人集体和投资俱乐部。也可以治理协议和代币。_

### 基于声誉的成员资格 {#reputation-based-membership}

声誉代表参与证明，并授予在 DAO 中的投票权。与基于代币或股份的成员资格不同，基于声誉的 DAO 不会将所有权转移给贡献者。声誉不能被购买、转让或委托；DAO 成员必须通过参与来赢得声誉。链上投票是无需许可的，潜在成员可以自由提交加入 DAO 的提案，并请求获得声誉和代币作为奖励，以换取他们的贡献。

_通常用于协议和[去中心化应用 (dapp)](/glossary/#dapp)的去中心化开发和治理，但也非常适合各种组织，如慈善机构、工人集体、投资俱乐部等。_

#### 著名示例 {#reputation-example}

[DXdao](https://DXdao.eth.limo) —— DXdao 是一个自 2019 年以来构建和治理去中心化协议和应用的全球主权集体。它利用基于声誉的治理和[全息共识](/glossary/#holographic-consensus)来协调和管理资金，这意味着没有人可以通过花钱来影响其未来或治理。

## 加入 / 创建 DAO {#join-start-a-dao}

### 加入 DAO {#join-a-dao}

- [以太坊社区 DAO](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [DAOHaus 的 DAO 列表](https://app.daohaus.club/explore)
- [Tally.xyz 的 DAO 列表](https://www.tally.xyz/explore)
- [DeGov.AI 的 DAO 列表](https://apps.degov.ai/)

### 创建 DAO
- [使用 DAOHaus 创建 DAO](https://app.daohaus.club/summon)
- [使用 Tally 创建 Governor DAO](https://www.tally.xyz/get-started)
- [创建由 Aragon 驱动的 DAO](https://aragon.org/product)
- [创建 Colony](https://colony.io/)
- [使用 DeGov Launcher 启动 DAO](https://docs.degov.ai/integration/deploy)
## 延伸阅读 {#further-reading}

### DAO 文章 {#dao-articles}

- [什么是 DAO？](https://blog.aragon.org/what-is-a-dao/) —— [Aragon](https://aragon.org/)
- [DAO 之家 (House of DAOs)](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) —— [Metagame](https://wiki.metagame.wtf/)
- [什么是 DAO，它有什么用？](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) —— [DAOhaus](https://daohaus.club/)
- [如何启动由 DAO 驱动的数字社区](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) —— [DAOhaus](https://daohaus.club/)
- [什么是 DAO？](https://coinmarketcap.com/alexandria/article/what-is-a-dao) —— [Coinmarketcap](https://coinmarketcap.com)
- [什么是全息共识？](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [DAO 不是公司：自治组织中去中心化的重要性（作者：Vitalik）](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO、DAC、DA 及更多：不完整的术语指南](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [以太坊博客](https://blog.ethereum.org)

### 视频 {#videos}

- [加密货币中的 DAO 是什么？](https://youtu.be/KHm0uUPqmVE)
- [DAO 能建造一座城市吗？](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) —— [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />
