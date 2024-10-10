---
title: 新增二層網路
description: 向 ethereum.org 新增二層網路時使用的政策
lang: zh-tw
---

# 新增二層網路 {#adding-layer-2}

我們想確保上架最佳的資源，讓使用者能夠以安全放心的方式瀏覽二層網路空間。

任何人都可以建議在 ethereum.org 上新增二層網路。 如我們有遺漏二層網絡，**[請提出建議](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml)！**

我們目前在以下頁面上架二層網路：

- [Optimistic rollup (樂觀卷軸)](/developers/docs/scaling/optimistic-rollups/)
- [ZK零知識證明卷軸](/developers/docs/scaling/zk-rollups/)
- [層二（Layer 2）](/layer-2/)

二層網路是以太坊相對較新且令人興奮的範式。 我們嘗試在 ethereum.org 上創建一個公平的考量框架，但納入標準會隨時間推移而變化和發展。

## 決策框架 {#decision-framework}

### 納入標準：必備條件 {#criteria-for-inclusion-the-must-haves}

**在 L2BEAT 上架**

- 要被納入考量範圍，專案必須已在 [L2BEAT](https://l2beat.com) 上架。 L2BEAT 為二層網路專案提供了可靠的風險評估，供我們評估二層網路專案。 **如果專案未在 L2BEAT 上架，我們不會在 ethereum.org 上將其作為二層網路上架。**
- [了解如何將二層網路專案新增到 L2BEAT](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md)。

**開源**

- 你的程式碼必須是可存取的，同時你應接受來自更廣泛社群的拉取請求 (PR)。

**二層網路類別**

我們目前將以下列為二層網路解決方案：

- 樂觀卷軸
- 零知識卷軸

_我們認為，其他不使用以太坊來實現資料可用性或安全性的擴張解決方案，不是二層網路。_

**以太坊的資料可用性**

- 資料可用性是其他擴張方案與二層網路方案之間的重要區分因素。 一個專案**必須**使用以太坊主網來實現資料可用性，才能考慮讓其上架。

**跨鏈橋**

- 使用者怎樣才能登錄利用二層網路？

**專案上線日期**

- 二層網路已在主網「上線」超過 6 個月

- 未經使用者實際測試的較新專案不太可能上架。

**外部安全審核**

- 無論是透過審核、內部安全團隊或其他方法，你的產品安全性都必須經可靠測試。 對我們的用戶而言，這會減低相關風險，並且向我們顯示出你有認真思考產品安全的問題。

**持續的使用者群**

- 我們會考慮總鎖定價值 (TVL) 歷史記錄、交易統計數據以及是否被知名公司或專案使用等指標

**活躍的開發團隊**

- 我們不會上架沒有活躍團隊去開發專案的二層網路。

**區塊瀏覽器**

- 上架的專案需要正常運作的區塊瀏覽器，讓使用者輕鬆瀏覽區塊鏈。

### 其他標準：加分項 {#nice-to-haves}

**交易所對專案的支援**

- 使用者能否直接存款到交易所和/或從交易所提款？

**二層網絡生態系統的去中心化應用程式連結**

- 我們希望能夠提供有關使用者可以在此二層網路上執行哪些操作的資訊。 （例如 https://portal.arbitrum.io/、https://www.optimism.io/apps）

**代幣合約清單**

- 由於資產會在二層網路擁有新地址，如有可用的代幣清單資源，請分享。

**支援原生錢包**

- 是否有任何錢包原生支援二層網路？

## 新增你的二層網絡 {#add-exchange}

如果你想在 ethereum.org 上新增二層網路層，請在 GitHub 上建立議題。

<ButtonLink to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml">
  建立一個議題
</ButtonLink>
