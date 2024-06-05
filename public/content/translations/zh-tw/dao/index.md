---
title: 去中心化自治組織 (DAO)
description: 以太坊上的去中心化自治組織概要
lang: zh-tw
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /use-cases/dao-2.png
alt: 在對提案投票的去中心化自治組織代表。
summaryPoint1: 沒有中心化領導的成員共有社群。
summaryPoint2: 一個與網路上陌生人合作的安全方式。
summaryPoint3: 一個將資產投入特定事業的安全場所。
---

## 什麼是去中心化自治組織 {#what-are-daos}

去中心化自治組織為一種集體擁有，並致力於共同使命的組織。

去中心化自治組織使我們不需信任一個良善的領導者來管理資金或經營，便能與世界各地志趣相投的人們共事。 沒有執行長能夠衝動使用資金，也沒有財務長可以作假帳。 取而代之的是，由基於區塊鏈上程式碼所制定的規則來定義組織如何運作以及如何使用資金。

組織擁有自己的資金庫，未經團體核准，任何人都無權使用。 決策經由提案和投票來治理，以確保每位組織成員都能發聲，且任何事都在[鏈上](/glossary/#on-chain)進行，公開透明。

## 為何我們需要去中心化自治組織？ {#why-dao}

要和他人合作創立涉及經費和金錢的組織，你必須高度信任你的合夥人。 但你很難信任一個只在網路上互動過的人。 使用去中心化自治組織，你不必信任團體中的每個人，只需要相信 100% 透明、任何人都能驗證的去中心化自治組織程式碼。

這開啟了許多全球協作與合作的新機會。

### 比較 {#dao-comparison}

| 去中心化自治組織                  | 傳統組織                        |
| ------------------------- | --------------------------- |
| 通常是扁平組織，而且完全民主。           | 通常等級嚴明。                     |
| 任何更改都需要成員投票決定後才能實施。       | 視組織結構而定，可能由部分人進行決策，也可能投票表決。 |
| 不需要可信的中間人便能自動統計投票、執行結果。   | 如果允許投票，會在內部計票，而且投票結果必須人工執行。 |
| 以去中心化方式自動提供服務（例如慈善基金的分配）。 | 需要人工處理，或集中管控自動處理，易受操縱。      |
| 所有活動皆完全公開透明。              | 活動通常是隱密進行，公開程度有限。           |

### 去中心化自治組織範例 {#dao-examples}

為了幫助你了解，以下略舉幾個去中心化自治組織的使用範例：

- **慈善機構** – 你可以接受來自全世界任何人的捐贈，並投票決定要資助的事業。
- **共同擁有權** – 你可以購買實體或虛擬資產，且組織成員可以對如何使用資產進行投票。
- **風險投資和資助** – 你可以成立風險基金，透過該基金匯集投資資本並投票決定要進行的風險投資。 後續收益可以分配給相應的去中心化自治組織成員。

<YouTube id="zTStDvUtQWc" />

## How DAOs Work {#how-daos-work}

DAOs are based on smart contracts that define the rules and govern the organization's treasury. Once deployed on Ethereum, the rules cannot be modified unless approved by a vote. Any behavior that doesn't comply with the code rules and logic is invalid. The treasury, also defined by a smart contract, cannot be accessed without the approval of the community. This means that DAOs don't require centralized management. Instead, decisions are made collectively, and payments are authorized automatically after a vote.

The immutability of smart contracts once deployed on Ethereum ensures that any modifications to the code (the rules of the DAO) are transparent and traceable.

## Ethereum and DAOs {#ethereum-and-daos}

Ethereum provides an excellent foundation for DAOs due to the following reasons:

- Ethereum's consensus is decentralized and well-established, making the network trustworthy.
- Smart contracts, once deployed, cannot be modified, even by their creators. This allows DAOs to operate according to the programmed rules.
- Smart contracts can send and receive funds, eliminating the need for trusted intermediaries to manage the organization's treasury.
- The Ethereum community tends to collaborate rather than compete, fostering the development of best practices and support systems.

## DAO Governance {#dao-governance}

Governance of DAOs involves various considerations, such as how voting and proposal processes work.

### Delegation {#governance-delegation}

Delegation is a form of representative democracy in DAOs. Token holders can delegate their voting power to users who self-nominate and commit to managing the protocol and staying informed.

#### Example {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) - ENS token holders can delegate their votes to community members who actively participate in the ecosystem.

### Automatic Transaction Execution {#governance-example}

In many DAOs, transactions are automatically executed if they receive a certain number of votes and a majority vote in favor, unless vetoed by the creator.

#### Example {#governance-example}

[Nouns](https://nouns.wtf) - In the Nouns DAO, transactions are automatically executed if they receive the required number of votes and a majority vote in favor, unless vetoed by the creator.

### Multisig Governance {#governance-example}

While DAOs can have thousands of voting members, funds can be stored in a wallet controlled by a smaller group of trusted and publicly known (within the community) active members, typically ranging from 5 to 20. After a vote, the multisig signers execute the will of the community.

## DAO Laws {#dao-laws}

In 1977, Wyoming created the Limited Liability Company (LLC) structure to protect entrepreneurs and limit their liability. More recently, Wyoming pioneered DAO-related legislation, granting DAOs legal status. Currently, Wyoming, Vermont, and the British Virgin Islands have some form of DAO-related laws.

### Example {#law-example}

[CityDAO](https://citydao.io) - CityDAO used Wyoming's DAO-related legislation to purchase 40 acres of land near Yellowstone National Park.

## DAO Membership {#dao-membership}

DAOs have various membership models, where members decide on voting mechanisms and other important aspects of the DAO.

### Token-based Membership {#token-based-membership}

Token-based membership is typically fully permissionless, depending on the tokens used. Governance tokens of this kind are often freely tradable on decentralized exchanges without permission. Some may require earning them through providing liquidity or other forms of "work." Holding the tokens grants voting rights.

#### Example {#token-example}

[MakerDAO](https://makerdao.com) - MakerDAO's MKR token is widely available on decentralized exchanges, allowing anyone to acquire voting rights to decide the future of the Maker protocol.

### Share-based Membership {#share-based-membership}

Share-based DAOs have a higher level of permission but are still relatively open. Potential members can apply to join the DAO, usually by providing valuable contributions in the form of tokens or work. Shares represent direct voting and ownership rights. Members can exit with their share of the treasury at any time.

#### Example {#share-example}

[MolochDAO](http://molochdao.com/) - MolochDAO funds Ethereum projects. To become a member, you must apply and be evaluated by the community for the necessary expertise and capital to make informed decisions about potential grantees. You cannot directly purchase membership in the DAO on the open market.

### 信譽型成員 {#reputation-based-membership}

信譽代表參與證明，並能授予去中心化自治組織的投票權。 不同於代幣型或股份型成員，信譽型去中心化自治組織不會將所有權轉讓給貢獻者。 信譽不能購買、移轉或委託；去中心化自治組織成員必須透過參與來獲得信譽。 鏈上投票無需許可，潛在成員可以自由提出加入去中心化自治組織的申請，並要求獲得信譽和代幣作為其貢獻的獎勵。

_通常用於協定和[去中心化應用程式](/glossary/#dapp)的去中心化開發及治理，但也非常適合各種組織，如慈善機構、勞工團體、投資俱樂部等。_

#### 知名案例 {#reputation-example}

[DXdao](https://DXdao.eth.limo) – DXdao 是一個全球主權聯合組織，自 2019 年以來一直致力於建構與治理去中心化協定和應用程式。 它利用信譽型治理和[全局共識](/glossary/#holographic-consensus)來協調和管理資金，這意味著沒有人可以透過金錢來影響其未來或治理決策。

## 參與/建立去中心化自治組織

### 加入去中心化自治組織 (DAO)

- [以太坊社群去中心化自治組織](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [DAOHaus 的去中心化自治組織清單](https://app.daohaus.club/explore)
- [Tally.xyz 的去中心化自治組織清單](https://www.tally.xyz)

### 建立去中心化自治組織

- [使用 DAOHaus 建立去中心化自治組織](https://app.daohaus.club/summon)
- [使用 Tally 建立一個治理者型去中心化自治組織](https://www.tally.xyz/add-a-dao)
- [建立由 Aragon 支援的去中心化自治組織](https://aragon.org/product)
- [建立 colony](https://colony.io/)
- [使用 DAOstack 全局共識建立去中心化自治組織](https://alchemy.daostack.io/daos/create)

## 延伸閱讀

### 去中心化自治組織相關文章

- [什麼是去中心化自治組織？](https://aragon.org/dao)– [Aragon](https://aragon.org/)
- [去中心化自治組織之家](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [何謂去中心化自治組織？它有何用途？](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for)– [DAOhaus](https://daohaus.club/)
- [如何創立由去中心化自治組織支援的數位社群](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [什麼是去中心化自治組織？](https://coinmarketcap.com/alexandria/article/what-is-a-dao)– [Coinmarketcap](https://coinmarketcap.com)
- [什麼是全局共識？](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c)- [DAOstack](https://daostack.io/)
- [Vitalik，《去中心化自治組織並非法人團體：去中心化在自治組織裡的重要之處》](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [去中心化自治組織、去中心化自治公司、去中心化應用程式等：不完整術語指引](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [以太坊部落格](https://blog.ethereum.org)

### 影片

- [什麼是加密貨幣世界的去中心化自治組織？](https://youtu.be/KHm0uUPqmVE)
- [一個去中心化自治組織是否能建立一座城市？](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city)– [TED](https://www.ted.com/)
