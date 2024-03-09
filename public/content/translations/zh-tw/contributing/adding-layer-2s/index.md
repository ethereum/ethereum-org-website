---
title: 新增二層網絡
description: 將二層網路加入 ethereum.org 時適用的政策
lang: zh-tw
---

# 新增二層網路 {#adding-layer-2}

我們想要確保上架的資源是最好的，讓使用者能安全放心地瀏覽二層網路空間。

任何人都可以提出在 ethereum.org 上新增二層網路的建議。 如果有遺漏的二層網絡，**[請提出建議](https://github.com/ethereum/ethereum-org-website/issues/new?&template=suggest_layer2.md)！**

我們目前在以下頁面上架了二層網路：

- [樂觀卷疊](/developers/docs/scaling/optimistic-rollups/)
- [零知識卷疊](/developers/docs/scaling/zk-rollups/)
- [二層網路](/layer-2/)

對以太坊來說，二層網路是一個相對較新的、令人振奮的範式。 我們已嘗試在 ethereum.org 上創建一個公平的考量框架，但納入標準會隨時間推移而變化和發展。

## 決策架構 {#decision-framework}

### 納入標準：必備條件 {#criteria-for-inclusion-the-must-haves}

**在 L2BEAT 上架**

- 若要納入考量範圍，專案必須已在 [L2BEAT](https://l2beat.com) 上架。 L2BEAT 為二層網路專案提供了可靠的風險評估，可供我們評估二層網路專案。 **如果專案未在 L2BEAT 上架，我們不會將其作為二層網路納入 ethereum.org。**
- [了解如何將你的二層網路專案加入 L2BEAT](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md)。

**開源**

- 你的程式碼必須是可存取的，同時你應接受來自更廣泛社群的拉取請求。

**二層網路類別**

我們目前將以下項目列為二層網路解決方案：

- 樂觀卷疊
- 零知識卷疊

_我們認為，其他不使用以太坊來實現資料可用性或安全性的擴容解決方案不是二層網路。 _

**以太坊數據可用性**

- 資料可用性是其他擴容方案與二層網路方案之間的重要區分因素。 一個專案**必須**使用以太坊主網來實現資料可用性，才考慮讓它上架。

**鏈橋**

- 使用者如何登臨二層網路？

**項目上線日期**

- 未經用戶實戰測試的較新項目不太可能上架。

**外部安全審核**

- 無論是透過審核、內部安全團隊或其他方法，產品安全性都必須經過可靠測試。 這會降低我們用戶的風險，並向我們表明你非常重視安全性。

**持續的用戶群**

- 我們將價值總量歷史記錄、交易統計數據以及是否被知名公司或項目使用等指標考慮在內

**活躍的開發團隊**

- 我們不會上架沒有活躍團隊來開發專案的二層網路方案。

**區塊瀏覽器**

- 上架的項目需要能正常運作的區塊瀏覽器，讓用戶輕鬆瀏覽區塊鏈。

### 其他標準：最好具備 {#nice-to-haves}

**交易所對專案的支援**

- 用戶是否可以直接從存款到交易所和/或從交易所提款？

**二層網路生態系統去中心化應用程式連結**

- 我們希望能夠提供有關使用者可以在此二層網路上執行哪些操作的資訊 （例如 https://portal.arbitrum.one/、https://www.optimism.io/apps/all）。

**代幣合約列表**

- 由於資產會在二層網路產生新位址，如果有可用的代幣清單資源，請分享。

**支援原生錢包**

- 是否有任何錢包原生支援二層網路？

## 增加你的二層網路 {#add-exchange}

如果你想將二層網路加入 ethereum.org，請在 GitHub 上建立一個提案。

<ButtonLink to="https://github.com/ethereum/ethereum-org-website/issues/new?&template=suggest_layer2.md">
   創建一個提議
</ButtonLink>
