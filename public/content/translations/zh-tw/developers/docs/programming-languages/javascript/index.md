---
title: "給 JavaScript 開發者的以太坊"
description: "了解如何使用基於 JavaScript 的專案與工具來開發以太坊。"
lang: zh-tw
---

JavaScript 是以太坊生態系中最受歡迎的語言之一。事實上，有一個[團隊](https://github.com/ethereumjs)致力於盡可能將以太坊的各個層面引入 JavaScript 中。

在[技術堆疊的所有層級](/developers/docs/ethereum-stack/)中，都有機會編寫 JavaScript（或類似的語言）。

## 與以太坊互動 {#interact-with-ethereum}

### JavaScript API 函式庫 {#javascript-api-libraries}

如果你想編寫 JavaScript 來查詢區塊鏈、發送交易等，最方便的方法是使用 [JavaScript API 函式庫](/developers/docs/apis/javascript/)。這些 API 讓開發者能輕鬆地與[以太坊網路中的節點](/developers/docs/nodes-and-clients/)互動。

你可以使用這些函式庫與以太坊上的智能合約互動，因此你可以只使用 JavaScript 來與現有的合約互動，藉此建立去中心化應用程式 (dapp)。

**推薦查看**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _包含 JavaScript 與 TypeScript 的以太坊錢包實作與公用程式。_
- [Viem](https://viem.sh) – _以太坊的 TypeScript 介面，提供用於與以太坊互動的低階無狀態原語。_
- [Drift](https://ryangoree.github.io/drift/) – _一個 TypeScript 元函式庫，內建快取、掛鉤 (hooks) 與測試模擬，讓跨 Web3 函式庫的以太坊開發變得毫不費力。_

### 智能合約 {#smart-contracts}

如果你是 JavaScript 開發者並想編寫自己的智能合約，你可能會想熟悉 [Solidity](https://solidity.readthedocs.io)。這是最受歡迎的智能合約語言，且其語法類似於 JavaScript，這可能會讓它更容易學習。

更多關於[智能合約](/developers/docs/smart-contracts/)的資訊。

## 了解協定 {#understand-the-protocol}

### 以太坊虛擬機 {#the-ethereum-virtual-machine}

目前有一個[以太坊虛擬機](/developers/docs/evm/)的 JavaScript 實作。它支援最新的分叉規則。分叉規則是指因計畫性升級而對 EVM 所做的變更。

它被拆分成多個 JavaScript 套件，你可以查看這些套件以進一步了解：

- 帳戶
- 區塊
- 區塊鏈本身
- 交易
- 以及更多...

這將幫助你了解像是「帳戶的資料結構是什麼？」這類的問題。

如果你偏好閱讀程式碼，這個 JavaScript 實作會是閱讀我們文件之外的絕佳替代方案。

**查看 EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### 節點與客戶端 {#nodes-and-clients}

一個 EthereumJS 客戶端正在積極開發中，它能讓你用你熟悉的語言——JavaScript，來深入探究以太坊客戶端的運作方式！

**查看客戶端**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## 其他專案 {#other-projects}

在以太坊 JavaScript 領域中還有許多其他正在進行的專案，包括：

- 錢包公用程式的函式庫。
- 產生、匯入與匯出以太坊金鑰的工具。
- `merkle-patricia-tree` 的實作——這是在以太坊黃皮書中概述的一種資料結構。

前往 [EthereumJS 儲存庫](https://github.com/ethereumjs)深入探索你最感興趣的內容

## 延伸閱讀 {#further-reading}

_知道有哪個社群資源對你有幫助嗎？編輯此頁面並加入它！_