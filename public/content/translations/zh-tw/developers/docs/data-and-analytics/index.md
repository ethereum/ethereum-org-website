---
title: 數據分析
description: 如何獲取鏈上分析和資料以供你的去中心化應用程式使用
lang: zh-tw
---

## 簡介 {#Introduction}

隨著網路使用量的增長，鏈上資料中將存在越來越多有價值的信息。 隨著資料量的迅速增加，計算和匯總這些資訊以報告或驅動去中心化應用程式可能變得非常耗時且繁重。

利用現有的資料提供者可以加快開發過程，產生更準確的結果，並減少持續的維護工作。 這將使團隊能夠專注於其專案要提供的核心功能。

## 基本資訊 {#prerequisites}

你應該瞭解[區塊瀏覽器](/developers/docs/data-and-analytics/block-explorers/)的基本概念，以便更好地理解在資料分析背景中如何使用它們。 此外，熟悉[索引](/glossary/#index)的概念以瞭解它們對系統設計所帶來的好處。

在架構基礎方面，瞭解[應用程式介面](https://www.wikipedia.org/wiki/API)和 [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) 的基本概念，即使只是理論上的也很重要。

## 區塊瀏覽器 {#block-explorers}

許多[區塊瀏覽器](/developers/docs/data-and-analytics/block-explorers/)提供 [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [應用程式介面](https://www.wikipedia.org/wiki/API)閘道，這些閘道能夠讓開發者查看區塊、交易、驗證者、帳戶及其他鏈上活動的即時資料。

開發者可以進一步處理和轉換這些資料，以提供使用者獨特的見解和與[區塊鏈](/glossary/#blockchain)的互動。 例如，[Etherscan](https://etherscan.io) 在每個 12 秒時隙都提供執行和共識資料。

## 圖表 {#the-graph}

[Graph Network](https://thegraph.com/) 是一個去中心化的索引協議，用於組織區塊鏈資料。 與其建立和管理鏈下的集中式資料儲存來匯總鏈上資料，使用 The Graph 可以讓開發者構建完全在公共基礎設施上運行的無伺服器應用程式。

透過使用 [GraphQL](https://graphql.org/)，開發者可以查詢稱為子圖的精選開放應用程式介面，以獲取驅動其去中心化應用程式所需的必要資訊。 透過查詢這些已索引的子圖，報告及去中心化應用程式不僅能獲得效能和可擴充性的好處，還能享受由網路共識提供的內建準確性。 隨著新改進和/或子圖新增至網路中，你的專案可以迅速迭代，以利用這些增強功能。

## 用戶的多樣化

[用戶端多樣性](/developers/docs/nodes-and-clients/client-diversity/)對以太坊網路的整體健康至關重要，因為它提供了針對錯誤和漏洞的韌性。 目前有幾個用戶端多樣性儀表板，包括 [clientdiversity.org](https://clientdiversity.org/)、[rated.network](https://www.rated.network)、[supermajority.info](https://supermajority.info//) 和 [Ethernodes](https://ethernodes.org/)。

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) 將區塊鏈資料預處理成關聯資料庫（DuneSQL）表格，允許使用者使用 SQL 查詢區塊鏈資料並根據查詢結果建立儀表板。 鏈上資料組織成 4 個原始表格：`blocks`、`transactions`、（事件）`logs` 和（呼叫）`traces`。 常見的合約和協定已被解碼，而每個合約和協定都有自己的事件和呼叫表格集。 這些事件和呼叫表格被進一步處理並按協定類型組織成抽象表格，例如去中心化交易所、借貸、穩定幣等。

## SubQuery 網路 {#subquery-network}

[SubQuery](https://subquery.network/) 是一個領先的資料索引器服務，為開發者提供快速、可靠、去中心化且自訂的應用程式介面以支援其 Web3 專案。 SubQuery 賦能來自超過 165 個生態系統（包括以太坊）的開發者，提供豐富的索引資料，以構建直觀且沉浸式的使用者體驗。 SubQuery 網路為你提供銳不可當、堅韌且有去中心化基礎設施網路的應用程式。 使用 SubQuery 的區塊鏈開發者工具組，構建未來的 Web3 應用程式，無需花時間為資料處理活動建立自訂後端。

首先，請瀏覽[以太坊快速入門指南](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html)，在本地 Docker 環境中快速開始索引以太坊區塊鏈資料以進行測試，然後再上線到 [SubQuery 的受管理服務](https://managedservice.subquery.network/) 或 [SubQuery 的去中心化網路](https://app.subquery.network/dashboard)。

## Ethernow - 記憶體池資料程式 {#ethernow}
[Blocknative](https://www.blocknative.com/) 提供了對其以太坊歷史[記憶體池資料存檔](https://www.ethernow.xyz/mempool-data-archive)的開放存取。 這使研究人員和社群公益專案能夠探索以太坊主網的鏈前層。 該資料集得到積極維護，代表了以太坊生態系統中記憶體池交易事件的最全面歷史紀錄。 請參見 [Ethernow](https://www.ethernow.xyz/) 瞭解更多資訊。

## 衍生閱讀 {#further-reading}

- [Graph Network 概覽](https://thegraph.com/docs/en/about/network/)
- [Graph Query 訓練場](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan 上的應用程式介面程式碼範例](https://etherscan.io/apis#contracts)
- [Beaconcha.in 信標鏈瀏覽器](https://beaconcha.in)
- [Dune 基礎知識](https://docs.dune.com/#dune-basics)
- [SubQuery 以太坊快速入門指南](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
