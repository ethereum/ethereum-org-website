---
title: "ERC-777 代幣標準"
description: "了解 ERC-777，這是一種帶有掛鉤 (hooks) 的改良版同質化代幣標準，但基於安全考量，建議使用 ERC-20。"
lang: zh-tw
---

## 警告 {#warning}

<strong>ERC-777 由於[容易受到不同種類的網絡攻擊](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)，因此難以正確實行。 為此建議使用 [ERC-20](/developers/docs/standards/tokens/erc-20/)。</strong>本頁保留作歷史檔案。

## 簡介？ {#introduction}

ERC-777是一種同質化代幣標準, 改良於現有 [ERC-20](/developers/docs/standards/tokens/erc-20/) 標準上。

## 先決條件 {#prerequisites}

為能更好地理解本頁內容, 我們推薦你先閱讀有關 [ERC-20](/developers/docs/standards/tokens/erc-20/)。

## ERC-777 相對於 ERC-20 提出了哪些改進？ {#-erc-777-vs-erc-20}

ERC-777 相對於 ERC-20 進行了以下改進。

### 掛鉤 {#hooks}

掛鉤是智能合約程式碼中所描述的一種函式。當代幣透過合約發送或接收時，掛鉤就會被呼叫。這使得智能合約能夠對傳入或傳出的代幣做出反應。

掛鉤是使用 [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) 標準註冊和發現的。

#### 為什麼掛鉤如此出色？ {#why-are-hooks-great}

1. 掛鉤允許在單筆交易中向合約傳送代幣並通知合約，而 [ERC-20](https://eips.ethereum.org/EIPS/eip-20) 則需要進行雙重調用 (`approve`/`transferFrom`) 來達成同樣的操作。
2. 未註冊掛鉤的合約與 ERC-777 不相容。當接收合約未註冊掛鉤時，發送合約將中止交易。這可防止意外轉帳至非 ERC-777 智能合約。
3. 掛鉤可以拒絕交易。

### 小數 {#decimals}

此標準還解決了 ERC-20 中引起的 `decimals` 混亂。 這種明確度改善了開發者的體驗。

### 向後兼容 ERC-20 {#backwards-compatibility-with-erc-20}

ERC-777 合約可以像 ERC-20 合約一樣進行互動。

## 延伸閱讀 {#further-reading}

[EIP-777: 代幣標準](https://eips.ethereum.org/EIPS/eip-777)
