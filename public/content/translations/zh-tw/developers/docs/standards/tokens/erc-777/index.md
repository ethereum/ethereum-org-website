---
title: ERC-777 代幣標準
description: 了解 ERC-777，這是一種帶有掛鉤 (hooks) 的改良版同質化代幣標準，但基於安全考量，建議使用 ERC-20。
lang: zh-tw
---

## 警告 {#warning}

\*\*ERC-777 由於[容易受到不同種類的網絡攻擊], 因此難以正確實行 (https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)。 為此建議使用 [ERC-20]
(/developers/docs/standards/tokens/erc-20/) 。\*\*本頁保留作歷史檔案。

## 簡介？ {#introduction}

ERC-777是一種同質化代幣標準, 改良於現有 [ERC-20](/developers/docs/standards/tokens/erc-20/) 標準上。

## 先決條件 {#prerequisites}

為能更好地理解本頁內容, 我們推薦你先閱讀有關 [ERC-20](/developers/docs/standards/tokens/erc-20/)。

## ERC-777 相對於 ERC-20 提出了哪些改進？ {#-erc-777-vs-erc-20}

ERC-777 相對於 ERC-20 進行了以下改進。

### 挂鈎 {#hooks}

Hooks為一功能函數於智慧型合約程式中. 其能被調用當代幣被接發經由一智慧型合約. 其使智慧型合約能與進發之代幣互動.

挂鈎是使用 [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) 標準注冊和發現的。

#### 為何掛鉤棒棒? {#why-are-hooks-great}

1. 挂鈎允許在單筆交易中向合約傳送代幣並通知合約，而 [ERC-20](https://eips.ethereum.org/EIPS/eip-20) 則需要進行雙重調用 (`approve`/`transferFrom`) 來達成同樣的操作。
2. 合約無登記之掛鉤為非完整ERC-777. 傳送合約將終止交易當接收合約無法登記一掛鉤. 此預防意外傳送至一ERC-777智慧型合約.
3. 掛鉤能脫退中止合約.

### 小數 {#decimals}

此標準還解決了 ERC-20 中引起的 `decimals` 混亂。 這種明確度改善了開發者的體驗。

### 向後兼容 ERC-20 {#backwards-compatibility-with-erc-20}

ERC-777 合約可以像 ERC-20 合約一樣進行互動。

## 延伸閱讀 {#further-reading}

[EIP-777: 代幣標準](https://eips.ethereum.org/EIPS/eip-777)
