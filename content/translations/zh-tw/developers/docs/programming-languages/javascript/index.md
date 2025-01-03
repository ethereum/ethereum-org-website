---
title: JavaScript 開發者適用的以太坊資源
description: 學習如何使用 JavaScript 型專案和工具進行以太坊開發。
lang: zh-tw
---

JavaScript 是以太坊生態系統中最常用的語言之一。 事實上，有[團隊](https://github.com/ethereumjs)致力於將盡可能多的以太坊內容引入 JavaScript。

有機會在[堆疊的所有層級](/developers/docs/ethereum-stack/)編寫 JavaScript（或類似內容）。

## 與以太坊互動 {#interact-with-ethereum}

### Javascript 應用程式介面程式庫 {#javascript-api-libraries}

如果想編寫 JavaScript 來查詢區塊鏈、傳送交易等，最方便的方法是使用 [JavaScript 應用程式介面程式庫](/developers/docs/apis/javascript/)。 這些應用程式介面讓開發者能夠輕鬆與[以太坊網路中的節點](/developers/docs/nodes-and-clients/)進行互動。

你可以使用這些程式庫與以太坊上的智慧型合約進行互動，因此可以構建一個去中心化應用程式，在此去中心化應用程式中，你只需使用 JavaScript 就能夠與預先存在的合約進行互動。

**查看**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _– 包含 JavaScript 和 TypeScript 的以太坊錢包實作和公用程式。_
- [viem](https://viem.sh) – 以太坊的 TypeScript 介面，提供用於與以太坊互動的低階無狀態基元。

### 智慧型合約 {#smart-contracts}

如果你是 JavaScript 開發者，並打算編寫自己的智慧型合約，那你會想瞭解 [Solidity](https://solidity.readthedocs.io)。 這是最常用的智慧型合約語言，它在語法上與 JavaScript 類似，因而可能更容易學習。

更多[智慧型合約](/developers/docs/smart-contracts/)相關資訊。

## 理解協定 {#understand-the-protocol}

### 以太坊虛擬機 {#the-ethereum-virtual-machine}

[以太坊虛擬機](/developers/docs/evm/)有 JavaScript 實作。 該虛擬機支援最新的分叉規則。 分叉規則是指由於計劃的升級而對以太坊虛擬機所做的變更。

分叉規則分為各種 JavaScript 包，可以查看這些包取得更深入的理解：

- 帳戶
- 區塊
- 區塊鏈本身
- 交易紀錄
- 和更多相關內容...

這將幫助你理解「帳戶的資料結構是什麼？」等問題。

如果你喜歡閱讀程式碼，此 JavaScript 可能是閱讀我們文件的絕佳替代方案。

**請查看 monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### 節點和客戶 {#nodes-and-clients}

目前正在開發的 Ethereum.js 讓你能夠深入瞭解以太坊用戶端如何用你理解的語言 JavaScript 運作！

它曾經托管於獨立的[`儲存庫`](https://github.com/ethereumjs/ethereumjs-client)中，但後來作為一個包被併入 EthereumVM monorepo 中。

**請查看用戶端**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## 其他專案 {#other-projects}

以太坊 JavaScript 領域也發生了許多其他事情，包括：

- 錢包公用程式程式庫。
- 用於產生匯入和匯出以太坊金鑰的工具。
- `merkle-patricia-tree` 的實作 – 以太坊黃皮書中概述的資料結構。

在 [EthereumJS repo](https://github.com/ethereumjs) 深入瞭解你感興趣的任何內容

## 了解更多 {#further-reading}

_知道對你有幫助的社群資源嗎？ 請編輯此頁面並新增資源！_
