---
title: ERC-777 代幣標準
description: 了解 ERC-777，這是一種具備掛鉤（hook）功能的改良版同質化代幣標準，但基於安全性考量，建議使用 ERC-20。
lang: zh-tw
---

## 警告 {#warning}

**由於 ERC-777 [容易受到不同形式的攻擊](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)，因此很難正確實作。建議改用 [ERC-20](/developers/docs/standards/tokens/erc-20/)。**本頁面僅作為歷史存檔保留。

## 簡介？ {#introduction}

ERC-777 是一種同質化代幣標準，改良了現有的 [ERC-20](/developers/docs/standards/tokens/erc-20/) 標準。

## 先決條件 {#prerequisites}

為了更易於理解本頁面，我們建議你先閱讀有關 [ERC-20](/developers/docs/standards/tokens/erc-20/) 的內容。

## ERC-777 提出了哪些優於 ERC-20 的改良？ {#-erc-777-vs-erc-20}

ERC-777 提供了以下優於 ERC-20 的改良。

### 掛鉤 {#hooks}

掛鉤（Hook）是智能合約程式碼中描述的一種函式。當透過合約發送或接收代幣時，就會呼叫掛鉤。這使得智能合約能夠對轉入或轉出的代幣做出反應。

掛鉤是使用 [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) 標準進行註冊與發現的。

#### 為什麼掛鉤很好用？ {#why-are-hooks-great}

1. 掛鉤允許在單筆交易中將代幣發送至合約並通知該合約，這與 [ERC-20](https://eips.ethereum.org/EIPS/eip-20) 不同，後者需要雙重呼叫（`approve`/`transferFrom`）才能實現此目的。
2. 未註冊掛鉤的合約與 ERC-777 不相容。當接收合約未註冊掛鉤時，發送合約將中止交易。這可以防止意外將代幣轉移到非 ERC-777 智能合約中。
3. 掛鉤可以拒絕交易。

### 小數位數 {#decimals}

該標準還解決了 ERC-20 中由 `decimals` 引起的混淆。這種清晰度改善了開發人員體驗。

### 向下相容 ERC-20 {#backwards-compatibility-with-erc-20}

可以像與 ERC-20 合約互動一樣，與 ERC-777 合約進行互動。

## 延伸閱讀 {#further-reading}

[EIP-777：代幣標準](https://eips.ethereum.org/EIPS/eip-777)