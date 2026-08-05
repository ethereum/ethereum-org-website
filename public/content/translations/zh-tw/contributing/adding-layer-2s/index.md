---
title: 新增第二層 (L2)
description: 我們在 ethereum.org 上新增第二層 (L2) 時所使用的政策
lang: zh-tw
---

我們希望確保列出盡可能最好的資源，以便使用者能夠安全且自信地探索第二層 (L2) 領域。

任何人都可以在 ethereum.org 上自由建議新增第二層 (L2)。如果我們遺漏了某個第二層 (L2)，**[請向我們建議](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml)！**

我們目前在以下頁面列出 L2：

- [樂觀 Rollup](/developers/docs/scaling/optimistic-rollups/)
- [零知識卷疊](/developers/docs/scaling/zk-rollups/)
- [第二層 (L2)](/layer-2/)

第二層 (L2) 對以太坊來說是一個相對較新且令人興奮的典範。我們試圖在 ethereum.org 上建立一個公平的考量框架，但上架標準將隨著時間的推移而改變和演進。

## 決策框架 {#decision-framework}

### 收錄標準：必備條件 {#criteria-for-inclusion-the-must-haves}

**在 L2BEAT 上列出**

- 為了納入考量，該專案必須列在 [L2BEAT](https://l2beat.com) 上。L2BEAT 提供了對第二層 (L2) 專案的穩健風險評估，我們依賴它來評估 L2 專案。**如果該專案未在 L2BEAT 上列出，我們將不會在 ethereum.org 上將其列為 L2。**
- [了解如何將你的 L2 專案新增至 L2BEAT](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md)。

**開源**

- 你的程式碼必須是可存取的，並且你應該接受來自更廣泛社群的 PR。

**第二層 (L2) 類別**

我們目前將以下視為第二層 (L2) 解決方案：

- 樂觀 Rollup
- 零知識卷疊

_我們不將其他不使用以太坊來實現資料可用性或安全性的擴容解決方案視為第二層 (L2)。_

**以太坊用於資料可用性**

- 資料可用性是其他擴容解決方案與第二層 (L2) 之間的重要區分因素。專案**必須**使用以太坊主網來實現資料可用性，才能被考慮列出。

**橋接器**

- 使用者如何能夠進入該第二層 (L2)？

**專案上線日期**

- 在主網上「上線」超過 6 個月的第二層 (L2)

- 尚未經過使用者實戰測試的較新專案較不可能被列出。

**外部安全稽核**

- 無論是透過稽核、內部安全團隊還是其他方法，你的產品安全性必須經過可靠的測試。這降低了我們使用者的風險，並向我們表明你認真對待安全性。

**持續的使用者基礎**

- 我們將考慮總鎖倉量 (TVL) 歷史記錄、交易統計數據，以及它是否被知名公司或專案使用等指標

**活躍的開發團隊**

- 我們不會列出沒有活躍團隊致力於專案的第二層 (L2)。

**區塊鏈瀏覽器**

- 列出的專案要求有一個可運作的區塊鏈瀏覽器，以允許使用者輕鬆瀏覽該鏈。

### 其他標準：加分條件 {#nice-to-haves}

**交易所對專案的支援**

- 使用者是否能夠直接從交易所存款和/或提款？

**第二層 (L2) 生態系統中去中心化應用程式 (dapp) 的連結**

- 我們希望能夠提供有關使用者可以期望在這個第二層 (L2) 上做什麼的資訊。（例如：https://portal.arbitrum.io/、https://www.optimism.io/apps）

**代幣合約清單**

- 由於資產在第二層 (L2) 上將會有一個新地址，如果有可用的代幣清單資源，請分享。

**原生錢包支援**

- 是否有任何錢包原生支援該 L2？

## 新增你的第二層 (L2) {#add-exchange}

如果你想在 ethereum.org 上新增第二層 (L2)，請在 GitHub 上建立一個 issue。

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml">
  建立 issue
</ButtonLink>