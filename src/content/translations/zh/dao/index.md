---
title: 去中心化自治组织 (DAO)
description: 以太坊上的 DAO 简介
lang: zh
template: use-cases
emoji: ":handshake:"
sidebar: true
sidebarDepth: 2
image: ../../../../assets/use-cases/dao-2.png
alt: DAO 代表在对提案投票。
summaryPoint1: 没有集中领导的成员制社区。
summaryPoint2: 与网上陌生人合作的安全方式。
summaryPoint3: 为特定事业投入资金的安全场所。
---

## 什么是 DAO？ {#what-are-daos}

DAO 是与全球志同道合之士共同工作的安全有效的方式。

可以将 DAO 视作由成员集体所有和共同管理的互联网原生企业。 DAO 拥有内置资产，未经该组织批准，任何人都无权动用。 DAO 通过提案和投票来决策，以确保组织内的每个人都有发言权。

不会有仅凭心血来潮就随意授权支出的 CEO，也不会有徇私枉法操纵账簿的 CFO。 一切行为公开，有关开支的规则都会通过代码编入 DAO 组织。

## 我们为什么需要 DAO？ {#why-dao}

与他人创办涉及资金和金钱的组织，需要对与合作对象高度信任。 不过，显然很难相信互联网上素不相识的人。 通过 DAO，您不需要相信组织中的其他人，只需要相信 DAO 的代码就够了，它是 100% 公开透明的，任何人都可以验证。

这为全球合作和协调提供了许多新机会。

### 对比 {#dao-comparison}

| 去中心化自治组织 (DAO)                             | 传统组织                                                     |
| -------------------------------------------------- | ------------------------------------------------------------ |
| 通常是平等的，并且完全民主。                       | 通常等级鲜明。                                               |
| 需要成员投票才能实施任何更改。                     | 可能部分人就能进行决策，也可能投票表决，具体取决于组织结构。 |
| 不需要可信的中间人就可以自动计算投票、执行结果。   | 如果允许投票，则在内部计票，投票结果必须由人工处理。         |
| 以去中心化方式自动提供服务（例如慈善基金的分配）。 | 需要人工处理或自动集中控制，易受操纵。                       |
| 所有活动公开透明。                                 | 活动通常是私密进行，不向公众开放。                           |

### DAO 示例 {#dao-examples}

为了帮助您更好地理解，这里有一些 DAO 的应用示例：

- 捐赠 - 您可以接受来自世界上任何人的成员资格和捐赠，组织可以决定如何使用捐款。
- 自由职业者网络 - 您可以创建承包商网络，为办公室和软件订阅募集资金。
- 风险投资和赠款 - 您可以成立一个风险基金，汇集投资资本并投票进行商业投资。 后续收益可以分配给相应 DAO 成员。

## DAO 成员资格 {#dao-membership}

DAO 成员资格分为多种模式。 成员资格可以决定投票方式和其他 DAO 关键事项。

### 基于代币的成员资格 {#token-based-membership}

通常无需许可，取决于使用的代币。 这些治理型代币大部分可以在去中心化交易所进行无限制交易。 其余部分要通过提供流动性或者进行工作量证明 (POW) 才能赚取。 无论何种方式，只要持有代币就可以参与投票。

_通常用来管理广泛去中心化协议和/或代币本身。_

#### 知名案例 {#token-example}

[MakerDAO](https://makerdao.com) - 可在各大去中心化交易所找到 MakerDAO 的代币 MKR。 因此，任何人都可以购买对 Maker 协议未来的投票权。

### 基于份额的成员资格 {#share-based-membership}

基于份额的 DAO 通常拥有更多权限，但仍然相当公开透明。 任何潜在的成员都可以提交加入 DAO 的建议，通常以代币或工作的形式提供有价贡献。 份额直接代表投票权和所有权。 成员可以随时带着资金库份额退出。

_通常用于联系更紧密、以人为中心的组织，例如慈善机构、工人团体和投资俱乐部等。 也可以管理协议和代币。_

#### 知名案例 {#share-example}

[MolochDAO](http://molochdao.com/) - MolochDAO 致力于为以太坊项目募集资金。 他们需要成员资格提案，以便小组可以评估您是否具有必要的专业知识和资本来对潜在资助方做出明智判断。 您无法通过直接购买代币来加入组织。

## DAO 如何运作？ {#how-daos-work}

智能合约是 DAO 的核心。 合约界定了组织的规则，管理组织资金。 一旦在以太链上启用合约，除非表决通过，否则任何人都不能修改规则， 任何违背代码规则和逻辑的行为都将失败。 由于资金库由智能合约定义，任何人都不能未经组织批准而挪用资金。 这意味着 DAO 不需要集中管理机构。 相反，组织共同作出决定，而付款会在投票通过后自动获批。

之所以能够做到这一点，是因为智能合约一旦在以太坊中生效，就无法被篡改。 一切都是公开的，只要修改代码（DAO 组织规则）就会被发现。

<DocLink to="/developers/docs/smart-contracts/">
  了解关于智能合约的更多信息
</DocLink>

## 以太坊与 DAO {#ethereum-and-daos}

以太坊为 DAO 提供了良好基础，原因如下：

- 以太坊本身已经建立足够的共识，足以让各类组织信任以太坊网络。
- 智能合约一旦生效就无法更改，即便是其所有者也是如此。 这使得 DAO 能够按照编程规则运行。
- 智能合约可以发送/接收资金。 没有这点，您就需要可信的中间人来管理组织资金。
- 比起竞争，以太坊社区更趋向于合作，这使得各类应用程序和服务系统蓬勃发展。

## 加入/创立 DAO {#join-start-a-dao}

### 加入 DAO {#join-a-dao}

- [以太坊社区中的 DAO](/community/#decentralized-autonomous-organizations-daos/community/#decentralized-autonomous-organizations-daos)
- [DAOHaus 的 DAO 列表](https://app.daohaus.club/explore)

### 启动 DAO {#start-a-dao}

- [使用 DAOHaus 创立 DAO](https://app.daohaus.club/summon)
- [创立 Aragon 支持的 DAO](https://aragon.org/product)
- [启动 colony](https://colony.io/)
- [使用 DAOstack 创立 DAO](https://daostack.io/)

## 延伸阅读 {#further-reading}

### DAO 相关文章 {#dao-articles}

- [What's a DAO?（什么是 DAO？）](https://aragon.org/dao)– [Aragon](https://aragon.org/)
- [House of DAOs（DAO 之家）](https://wiki.metagame.wtf/docs/great-houses/house-of-daos)– [Metagame](https://wiki.metagame.wtf/)
- [What is a DAO and what is it for?（什么是 DAO 及其目的？）](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for)– [DAOhaus](https://daohaus.club/)
- [How to Start a DAO-Powered Digital Community（如何启动 DAO 提供支持的数字社区）](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [What is a DAO?（什么是 DAO？）](https://coinmarketcap.com/alexandria/article/what-is-a-dao)– [Coinmarketcap](https://coinmarketcap.com)

### 相关视频 {#videos}

- [什么是加密货币中的 DAO？](https://youtu.be/KHm0uUPqmVE)
