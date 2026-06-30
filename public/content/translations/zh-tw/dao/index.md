---
title: "什麼是 DAO？"
metaTitle: "什麼是 DAO？ | 去中心化自治組織"
description: "以太坊上的 DAO 概覽"
lang: zh-tw
template: use-cases
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: "DAO 對提案進行投票的示意圖。"
summaryPoints:
  - "沒有中心化領導、由成員擁有的社群。"
  - "與網路上陌生人安全協作的方式。"
  - "為特定目標投入資金的安全場所。"
---

## 什麼是 DAO？ {#what-are-daos}

DAO 是一個共同擁有的組織，致力於實現共同的使命。

DAO 允許我們與全球志同道合的人合作，而無需信任某個仁慈的領導者來管理資金或營運。這裡沒有可以隨意花費資金的執行長，也沒有可以操縱帳本的財務長。相反地，寫入程式碼中基於區塊鏈的規則定義了組織的運作方式以及資金的使用方式。

它們內建了資金庫，未經群體批准，任何人都無權存取。決策由提案和投票來治理，以確保組織中的每個人都有發言權，並且一切都在[鏈上](/glossary/#onchain)透明地發生。

## 為什麼我們需要 DAO？ {#why-dao}

與他人共同創立一個涉及資金和金錢的組織，需要對合作夥伴有極大的信任。但是，要信任一個只在網路上互動過的人是很困難的。有了 DAO，你不需要信任群體中的任何其他人，只需要信任 DAO 的程式碼，它是 100% 透明且任何人都可以驗證的。

這為全球協作與協調開啟了許多新機會。

### 比較 {#dao-comparison}

| DAO                                                                                                                     | 傳統組織                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 通常是扁平化且完全民主化的。                                                                                   | 通常是階層式的。                                                                            |
| 任何變更的實施都需要成員投票。                                                           | 根據結構，變更可能由單一方要求，或者可能提供投票。     |
| 統計投票，並在沒有受信任中介的情況下自動實施結果。                                      | 如果允許投票，則在內部統計投票，且投票結果必須手動處理。 |
| 提供的服務以去中心化的方式自動處理（例如慈善資金的分配）。 | 需要人工處理或集中控制的自動化，容易受到操縱。              |
| 所有活動都是透明且完全公開的。                                                                           | 活動通常是私密的，且對大眾有限制。                                        |

### DAO 範例 {#dao-examples}

為了幫助理解，以下是一些你可以如何使用 DAO 的範例：

- **慈善機構** – 你可以接受來自世界各地任何人的捐款，並投票決定資助哪些事業。
- **集體所有權** – 你可以購買實體或數位資產，成員可以投票決定如何使用它們。
- **創投與贈款** – 你可以建立一個創投基金，匯集投資資金並投票決定支持哪些企業。償還的資金稍後可以在 DAO 成員之間重新分配。

<VideoWatch slug="dao-build-next-great-city" />

## DAO 是如何運作的？ {#how-daos-work}

DAO 的骨幹是其[智能合約](/glossary/#smart-contract)，它定義了組織的規則並持有該群體的資金庫。一旦合約在[以太坊](/)上線，除了透過投票之外，沒有人可以更改規則。如果有人試圖做一些程式碼中的規則和邏輯未涵蓋的事情，它將會失敗。而且因為資金庫也是由智能合約定義的，這意味著未經群體批准，任何人都無法花費這筆錢。這意味著 DAO 不需要中央權威。相反地，群體共同做出決策，並在投票通過時自動授權付款。

這是可能的，因為智能合約一旦在以太坊上線就是防篡改的。你不能在不被發現的情況下編輯程式碼（DAO 的規則），因為一切都是公開的。

## 以太坊與 DAO {#ethereum-and-daos}

以太坊是 DAO 的完美基礎，原因如下：

- 以太坊本身的共識是去中心化的，且已經足夠成熟，讓組織能夠信任該網路。
- 智能合約程式碼一旦上線就無法修改，即使是其擁有者也一樣。這使得 DAO 能夠按照其編寫的規則運作。
- 智能合約可以發送/接收資金。如果沒有這個功能，你將需要一個受信任的中介來管理群體資金。
- 以太坊社群已被證明是協作大於競爭的，這使得最佳實踐和支援系統能夠快速出現。

## DAO 治理 {#dao-governance}

在治理 DAO 時有許多考量因素，例如投票和提案的運作方式。

### 委託 {#governance-delegation}

委託就像是 DAO 版本的代議民主。代幣持有者將投票委託給自我提名並承諾管理協定且保持消息靈通的使用者。

#### 著名範例 {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – ENS 持有者可以將他們的投票委託給積極參與的社群成員來代表他們。

### 自動交易治理 {#governance-example-2}

在許多 DAO 中，如果達到法定人數的成員投下贊成票，交易將會自動執行。

#### 著名範例 {#governance-example-3}

[Nouns](https://nouns.wtf) – 在 Nouns DAO 中，如果達到法定投票人數且多數投贊成票，只要創辦人沒有否決，交易就會自動執行。

### 多方簽名治理 {#governance-example-4}

雖然 DAO 可能有數千名投票成員，但資金可以存放在一個由 5-20 名活躍社群成員共享的[錢包](/glossary/#wallet)中，這些成員受到信任且通常是公開身份的（社群知道其公開身份）。在投票之後，[多方簽名](/glossary/#multisig)簽署者會執行社群的意願。

## DAO 法律 {#dao-laws}

1977 年，懷俄明州發明了有限責任公司 (LLC)，保護了企業家並限制了他們的責任。最近，他們率先推出了為 DAO 確立法律地位的 DAO 法律。目前，懷俄明州、佛蒙特州和維京群島都有某種形式的 DAO 法律。

### 著名範例 {#law-example}

[CityDAO](https://citizen.citydao.io/) – CityDAO 利用懷俄明州的 DAO 法律在黃石國家公園附近購買了 40 英畝的土地。

## DAO 成員資格 {#dao-membership}

DAO 成員資格有不同的模式。成員資格可以決定投票的運作方式以及 DAO 的其他關鍵部分。

### 基於代幣的成員資格 {#token-based-membership}

通常是完全[無需許可](/glossary/#permissionless)的，取決於所使用的代幣。大多數情況下，這些治理代幣可以在[去中心化交易所](/glossary/#dex)上無需許可地進行交易。其他代幣則必須透過提供流動性或某些其他的「工作量證明 (PoW)」來賺取。無論哪種方式，只要持有代幣即可獲得投票權。

_通常用於治理廣泛的去中心化協定和/或代幣本身。_

#### 著名範例 {#token-example}

[MakerDAO](https://makerdao.com) – MakerDAO 的代幣 MKR 在去中心化交易所上廣泛可用，任何人都可以購買以獲得對 Maker 協定未來的投票權。

### 基於股份的成員資格 {#share-based-membership}

基於股份的 DAO 較偏向許可制，但仍然相當開放。任何潛在成員都可以提交加入 DAO 的提案，通常以代幣或工作的形式提供某種價值的貢獻。股份代表直接的投票權和所有權。成員可以隨時帶著他們在資金庫中按比例分配的份額退出。

_通常用於關係更緊密、以人為本的組織，如慈善機構、工人集體和投資俱樂部。也可以治理協定和代幣。_

### 基於聲譽的成員資格 {#reputation-based-membership}

聲譽代表參與的證明，並賦予在 DAO 中的投票權。與基於代幣或股份的成員資格不同，基於聲譽的 DAO 不會將所有權轉移給貢獻者。聲譽不能被購買、轉讓或委託；DAO 成員必須透過參與來贏得聲譽。鏈上投票是無需許可的，潛在成員可以自由提交加入 DAO 的提案，並要求獲得聲譽和代幣作為獎勵，以換取他們的貢獻。

_通常用於協定和[去中心化應用程式 (dapp)](/glossary/#dapp)的去中心化開發與治理，但也非常適合各種組織，如慈善機構、工人集體、投資俱樂部等。_

#### 著名範例 {#reputation-example}

[DXdao](https://DXdao.eth.limo) – DXdao 是一個自 2019 年以來建立和治理去中心化協定與應用程式的全球主權集體。它利用基於聲譽的治理和[全息共識](/glossary/#holographic-consensus)來協調和管理資金，這意味著沒有人可以透過花錢來影響其未來或治理。

## 加入 / 建立 DAO {#join-start-a-dao}

### 加入 DAO {#join-a-dao}

- [以太坊社群 DAO](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [DAOHaus 的 DAO 列表](https://app.daohaus.club/explore)
- [Tally.xyz 的 DAO 列表](https://www.tally.xyz/explore)
- [DeGov.AI 的 DAO 列表](https://apps.degov.ai/)

### 建立 DAO
- [使用 DAOHaus 召喚 DAO](https://app.daohaus.club/summon)
- [使用 Tally 建立 Governor DAO](https://www.tally.xyz/get-started)
- [建立由 Aragon 驅動的 DAO](https://aragon.org/product)
- [建立 colony](https://colony.io/)
- [使用 DeGov Launcher 啟動 DAO](https://docs.degov.ai/integration/deploy)
## 延伸閱讀 {#further-reading}

### DAO 文章 {#dao-articles}

- [什麼是 DAO？](https://blog.aragon.org/what-is-a-dao/) – [Aragon](https://aragon.org/)
- [DAO 之家 (House of DAOs)](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [什麼是 DAO 以及它的用途是什麼？](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [如何建立由 DAO 驅動的數位社群](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [什麼是 DAO？](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [什麼是全息共識？](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [DAO 不是公司：Vitalik 探討自治組織中去中心化的重要性](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO、DAC、DA 及更多：不完整的術語指南](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [以太坊部落格](https://blog.ethereum.org)

### 影片 {#videos}

- [加密貨幣中的 DAO 是什麼？](https://youtu.be/KHm0uUPqmVE)
- [DAO 能建造一座城市嗎？](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />
