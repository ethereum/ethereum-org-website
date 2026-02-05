---
title: 資料與分析
description: 如何獲取鏈上分析和資料以供你的去中心化應用程式使用
lang: zh-tw
---

## 介紹 {#Introduction}

隨著網路使用量的增長，鏈上資料中將存在越來越多有價值的信息。 隨著資料量的迅速增加，計算和匯總這些資訊以報告或驅動去中心化應用程式可能變得非常耗時且繁重。

利用現有的資料提供者可以加快開發過程，產生更準確的結果，並減少持續的維護工作。 這將使團隊能夠專注於其專案要提供的核心功能。

## 先決條件 {#prerequisites}

您應了解[區塊瀏覽器](/developers/docs/data-and-analytics/block-explorers/)的基本概念，以便更清楚如何在資料分析情境中使用它們。 此外，請熟悉[索引](/glossary/#index)的概念，以了解其為系統設計帶來的好處。

在架構基礎方面，即使只是理論上，也應了解什麼是 [API](https://www.wikipedia.org/wiki/API) 和 [REST](https://www.wikipedia.org/wiki/Representational_state_transfer)。

## 區塊瀏覽器 {#block-explorers}

許多[區塊瀏覽器](/developers/docs/data-and-analytics/block-explorers/)提供 [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [應用程式介面 (API)](https://www.wikipedia.org/wiki/API) 閘道，讓開發者能夠即時檢視區塊、交易、驗證程式、帳戶及其他鏈上活動的資料。

開發者接著可以處理並轉換這些資料，為使用者提供與[區塊鏈](/glossary/#blockchain)的獨特見解和互動。 例如，[Etherscan](https://etherscan.io) 和 [Blockscout](https://eth.blockscout.com) 為每個 12 秒的時隙提供執行和共識資料。

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) 是一種索引協定，可透過稱為子圖的開放式應用程式介面 (API) 提供查詢區塊鏈資料的簡單方法。

透過The Graph，開發者得益於：

- 去中心化索引：透過多個索引者索引區塊鏈資料，從而消除任何單點故障
- GraphQL 查詢：提供强大的 GraphQL 介面用於查詢已索引資料，使資料檢索非常便捷
- 自訂：為轉換和儲存區塊鏈資料定義您自己的邏輯，並重複使用其他開發者在 The Graph 網路上發布的子圖。

請遵循此份[快速入門](https://thegraph.com/docs/en/quick-start/)指南，在 5 分鐘內建立、部署及查詢子圖。

## 用戶端多樣性 {#client-diversity}

[用戶端多樣性](/developers/docs/nodes-and-clients/client-diversity/)對以太坊網路的整體健康至關重要，因為它提供了應對程式錯誤和漏洞的韌性。 目前有數個用戶端多樣性儀表板，包括 [clientdiversity.org](https://clientdiversity.org/)、[rated.network](https://www.rated.network)、[supermajority.info](https://supermajority.info//) 和 [Ethernodes](https://ethernodes.org/)。

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) 會將區塊鏈資料預處理為關聯式資料庫 (DuneSQL) 表格，讓使用者能使用 SQL 查詢區塊鏈資料，並根據查詢結果建立儀表板。 鏈上資料被組織成 4 個原始資料表：`blocks`、`transactions`、(事件) `logs` 和 (呼叫) `traces`。 常見的合約和協定已被解碼，而每個合約和協定都有自己的事件和呼叫表格集。 這些事件和呼叫表格被進一步處理並按協定類型組織成抽象表格，例如去中心化交易所、借貸、穩定幣等。

## SQD {#sqd}

[SQD](https://sqd.dev/) 是一個去中心化的超可擴充資料平台，經過最佳化，可有效率、無需許可地存取大量資料。 它目前提供歷史鏈上資料，包括事件日志、交易收據、軌跡以及每筆交易的狀態差異。 SQD 提供强大的工具包，用於創建自訂資料提取和處理管道，使索引速度達到最高每秒 15 萬區塊。

若要開始使用，請瀏覽[文件](https://docs.sqd.dev/)或查看您可使用 SQD 建置的 [EVM 範例](https://github.com/subsquid-labs/squid-evm-examples)。

## SubQuery 網路 {#subquery-network}

[SubQuery](https://subquery.network/) 是領先的資料索引器，為開發者的 web3 專案提供快速、可靠、去中心化且客製化的應用程式介面 (API)。 SubQuery 賦能來自超過 165 個生態系統（包括以太坊）的開發者，提供豐富的索引資料，以構建直觀且沉浸式的使用者體驗。 SubQuery 網路為你提供銳不可當、堅韌且有去中心化基礎設施網路的應用程式。 使用 SubQuery 的區塊鏈開發者工具組，構建未來的 Web3 應用程式，無需花時間為資料處理活動建立自訂後端。

若要開始，請瀏覽 [Ethereum 快速入門指南](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html)，以在本地 Docker 環境中，於幾分鐘內開始為以太坊區塊鏈資料建立索引進行測試，然後再於 [SubQuery 的託管服務](https://managedservice.subquery.network/)或 [SubQuery 的去中心化網路](https://app.subquery.network/dashboard)上線。

## EVM 查詢語言 {#evm-query-language}

以太坊虛擬機查詢語言 (EQL) 是一種類似 SQL 的語言，旨在查詢 EVM 鏈的資訊。 EQL 的目標是對 EVM 鏈一等公民（區塊、帳戶和交易）進行複雜的關聯查詢，同時為開發者和研究者提供日常使用的人類工程學語法。 透過 EQL，開發者可以使用熟悉的類似 SQL 的語法獲取區塊鏈資料，無需複雜的樣板代碼。 EQL 支援標準區塊鏈資料請求（例如在以太坊上檢索帳戶的 nonce 和餘額或獲取當前的區塊大小和時間戳），並且正在不斷地添加對更多複雜請求和功能的支援。

## 延伸閱讀 {#further-reading}

- [探索加密資料 I：資料流架構](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Graph 網路概觀](https://thegraph.com/docs/en/about/)
- [Graph 查詢遊樂場](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Etherscan 上的應用程式介面 (API) 程式碼範例](https://etherscan.io/apis#contracts)
- [Blockscout 上的應用程式介面 (API) 文件](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in 信標鏈瀏覽器](https://beaconcha.in)
- [Dune 基礎知識](https://docs.dune.com/#dune-basics)
- [SubQuery 以太坊快速入門指南](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [SQD 網路概觀](https://docs.sqd.dev/)
- [EVM 查詢語言](https://eql.sh/blog/alpha-release-notes)
