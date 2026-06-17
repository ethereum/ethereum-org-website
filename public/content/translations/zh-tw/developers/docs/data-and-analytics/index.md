---
title: "資料與分析"
description: "如何獲取鏈上分析與資料以供您的去中心化應用程式 (dapp) 使用"
lang: zh-tw
---

## 簡介 {#introduction}

隨著網路使用率持續成長，鏈上資料中將存在越來越多有價值的資訊。隨著資料量迅速增加，計算和彙總這些資訊以進行報告或驅動去中心化應用程式 (dapp) 可能會成為一項耗時且繁重的處理工作。

善用現有的資料提供者可以加快開發速度、產生更準確的結果，並減少持續的維護工作。這將使團隊能夠專注於其專案試圖提供的核心功能。

## 先決條件 {#prerequisites}

您應該了解[區塊瀏覽器](/developers/docs/data-and-analytics/block-explorers/)的基本概念，以便更了解如何在資料分析環境中使用它們。此外，請熟悉[索引](/glossary/#index)的概念，以了解它們為系統設計帶來的好處。

在架構基礎方面，即使只是在理論上，也應了解 [API](https://www.wikipedia.org/wiki/API) 和 [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) 是什麼。

## 區塊瀏覽器 {#block-explorers}

許多[區塊瀏覽器](/developers/docs/data-and-analytics/block-explorers/)提供 [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) 閘道，為開發人員提供區塊、交易、驗證者、帳戶和其他鏈上活動的即時資料可見性。

開發人員隨後可以處理和轉換這些資料，為其使用者提供獨特的見解以及與[區塊鏈](/glossary/#blockchain)的互動。例如，[Etherscan](https://etherscan.io) 和 [Blockscout](https://eth.blockscout.com) 提供每個 12 秒時槽的執行和共識資料。

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) 是一個索引協定，提供了一種透過稱為子圖的開放 API 查詢區塊鏈資料的簡單方法。

透過 The Graph，開發人員可以受益於：

- 去中心化索引：能夠透過多個索引器對區塊鏈資料進行索引，從而消除任何單點故障
- GraphQL 查詢：提供強大的 GraphQL 介面來查詢索引資料，使資料檢索變得非常簡單
- 自訂：定義您自己轉換和儲存區塊鏈資料的邏輯，並重複使用其他開發人員在 The Graph 網路上發布的子圖

遵循此[快速入門](https://thegraph.com/docs/en/quick-start/)指南，在 5 分鐘內建立、部署和查詢子圖。

## 客戶端多樣性 {#client-diversity}

[客戶端多樣性](/developers/docs/nodes-and-clients/client-diversity/)對於以太坊網路的整體健康非常重要，因為它提供了對錯誤和漏洞利用的彈性。現在有幾個客戶端多樣性儀表板，包括 [clientdiversity.org](https://clientdiversity.org/)、[rated.network](https://www.rated.network)、[supermajority.info](https://supermajority.info//) 和 [Ethernodes](https://ethernodes.org/)。

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) 將區塊鏈資料預先處理為關聯式資料庫 (DuneSQL) 資料表，允許使用者使用 SQL 查詢區塊鏈資料，並根據查詢結果建立儀表板。鏈上資料被組織成 4 個原始資料表：`blocks`、`transactions`、(事件) `logs` 和 (呼叫) `traces`。熱門的合約和協定已經過解碼，並且每個都有自己的一組事件和呼叫資料表。這些事件和呼叫資料表會被進一步處理，並按協定類型（例如去中心化交易所、借貸、穩定幣等）組織成抽象資料表。

## SQD {#sqd}

[SQD](https://sqd.dev/) 是一個去中心化的超可擴展資料平台，針對提供高效、無需許可的大量資料存取進行了最佳化。它目前提供歷史鏈上資料，包括事件日誌、交易收據、追蹤以及每筆交易的狀態差異。SQD 提供了一個強大的工具組，用於建立自訂資料擷取和處理管線，實現高達每秒 15 萬個區塊的索引速度。

若要開始使用，請造訪[文件](https://docs.sqd.dev/)，或查看您可以使用 SQD 建立的 [EVM 範例](https://github.com/subsquid-labs/squid-evm-examples)。

## SubQuery 網路 {#subquery-network}

[SubQuery](https://subquery.network/) 是領先的資料索引器，為開發人員的 Web3 專案提供快速、可靠、去中心化且自訂的 API。SubQuery 透過豐富的索引資料，賦能來自超過 165 個生態系統（包括以太坊）的開發人員，為其使用者打造直覺且身歷其境的體驗。SubQuery 網路透過具備彈性且去中心化的基礎設施網路，為您不可阻擋的應用程式提供動力。使用 SubQuery 的區塊鏈開發人員工具組來建立未來的 Web3 應用程式，而無需花費時間為資料處理活動建立自訂後端。

若要開始使用，請造訪[以太坊快速入門指南](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html)，在幾分鐘內於本機 Docker 環境中開始索引以太坊區塊鏈資料以進行測試，然後再上線至 [SubQuery 的託管服務](https://managedservice.subquery.network/)或 [SubQuery 的去中心化網路](https://app.subquery.network/dashboard)。

## Codex {#codex}

[Codex](https://www.codex.io/) 是一個即時區塊鏈資料 API，為超過 80 個網路上的 7000 萬種以上代幣提供豐富的資料。開發人員可以存取結構化的代幣定價、錢包餘額、交易歷史記錄和彙總分析（交易量、流動性、獨立錢包），而無需維護自訂的索引基礎設施。Codex 支援透過 WebSocket 和 webhook 整合進行亞秒級的資料傳遞。

若要開始使用，請造訪[文件](https://docs.codex.io)、嘗試使用 [Explorer](https://docs.codex.io/explore)，或在[儀表板](https://dashboard.codex.io/signup)註冊。

## EVM 查詢語言 {#evm-query-language}

EVM 查詢語言 (EQL) 是一種類似 SQL 的語言，專為查詢 EVM（以太坊虛擬機）鏈而設計。EQL 的最終目標是支援對 EVM 鏈一等公民（區塊、帳戶和交易）進行複雜的關聯式查詢，同時為開發人員和研究人員提供符合人體工學的語法以供日常使用。透過 EQL，開發人員可以使用熟悉的類 SQL 語法來擷取區塊鏈資料，並消除對複雜樣板程式碼的需求。EQL 支援標準的區塊鏈資料請求（例如，檢索以太坊上帳戶的隨機數和餘額，或擷取目前的區塊大小和時間戳記），並持續增加對更複雜請求和功能集的支援。

## 進一步閱讀 {#further-reading}

- [探索加密貨幣資料 I：資料流架構](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Graph 網路概覽](https://thegraph.com/docs/en/about/)
- [Graph 查詢遊樂場](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan 上的 API 程式碼範例](https://etherscan.io/apis#contracts)
- [Blockscout 上的 API 文件](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in 信標鏈瀏覽器](https://beaconcha.in)
- [Dune 基礎知識](https://docs.dune.com/#dune-basics)
- [SubQuery 以太坊快速入門指南](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [SQD 網路概覽](https://docs.sqd.dev/)
- [EVM 查詢語言](https://eql.sh/blog/alpha-release-notes)

## 教學：以太坊上的資料與分析 / SQL {#tutorials}

- [使用 SQL 學習以太坊基礎主題](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– 使用 SQL 查詢鏈上以太坊資料，以了解交易、區塊和燃料基礎知識。_