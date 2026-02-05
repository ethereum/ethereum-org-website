---
title: JavaScript 開發者適用的以太坊資源
description: 學習如何使用 JavaScript 型專案和工具進行以太坊開發。
lang: zh-tw
---

JavaScript 是以太坊生態系統中最常用的語言之一。 事實上，有個[團隊](https://github.com/ethereumjs)致力於將盡可能多的以太坊內容引入 JavaScript。

有機會在[堆疊的所有層級](/developers/docs/ethereum-stack/)編寫 JavaScript（或類似內容）。

## 與以太坊互動 {#interact-with-ethereum}

### JavaScript API 函式庫 {#javascript-api-libraries}

如果您想編寫 JavaScript 來查詢區塊鏈、傳送交易等，最方便的方法是使用 [JavaScript API 函式庫](/developers/docs/apis/javascript/)。 這些 API 可讓開發人員輕鬆與[以太坊網路中的節點](/developers/docs/nodes-and-clients/)互動。

你可以使用這些程式庫與以太坊上的智慧型合約進行互動，因此可以構建一個去中心化應用程式，在此去中心化應用程式中，你只需使用 JavaScript 就能夠與預先存在的合約進行互動。

**查看**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _包含 JavaScript 和 TypeScript 的以太坊錢包實作和公用程式。_
- [viem](https://viem.sh) – _一個適用於以太坊的 TypeScript 介面，提供用於與以太坊互動的低階無狀態基元。_
- [Drift](https://ryangoree.github.io/drift/) – _一個 TypeScript 元函式庫，內建快取、掛鉤和測試模擬，可跨 web3 函式庫輕鬆進行以太坊開發。_

### 智能合約 {#smart-contracts}

如果您是 JavaScript 開發人員，且想撰寫自己的智慧型合約，您可能會想熟悉 [Solidity](https://solidity.readthedocs.io)。 這是最常用的智慧型合約語言，它在語法上與 JavaScript 類似，因而可能更容易學習。

更多關於[智慧型合約](/developers/docs/smart-contracts/)的資訊。

## 了解協議 {#understand-the-protocol}

### 以太坊虛擬機 {#the-ethereum-virtual-machine}

已有 [以太坊虛擬機](/developers/docs/evm/) 的 JavaScript 實作。 該虛擬機支援最新的分叉規則。 分叉規則是指由於計劃的升級而對以太坊虛擬機所做的變更。

分叉規則分為各種 JavaScript 包，可以查看這些包取得更深入的理解：

- 帳戶
- 區塊
- 區塊鏈本身
- 交易
- 和更多相關內容...

這將幫助你理解「帳戶的資料結構是什麼？」等問題。

如果你喜歡閱讀程式碼，此 JavaScript 可能是閱讀我們文件的絕佳替代方案。

**查看 EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### 節點與用戶端 {#nodes-and-clients}

目前正在開發的 Ethereum.js 讓你能夠深入瞭解以太坊用戶端如何用你理解的語言 JavaScript 運作！

**查看用戶端**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## 其他專案 {#other-projects}

以太坊 JavaScript 領域也發生了許多其他事情，包括：

- 錢包公用程式程式庫。
- 用於產生匯入和匯出以太坊金鑰的工具。
- `merkle-patricia-tree` 的實作 – 一種以太坊黃皮書中所概述的資料結構。

前往 [EthereumJS repo](https://github.com/ethereumjs) 深入探索您最感興趣的內容。

## 延伸閱讀 {#further-reading}

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_
