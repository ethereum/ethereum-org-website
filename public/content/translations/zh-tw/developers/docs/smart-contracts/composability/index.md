---
title: "智能合約可組合性"
description: "了解如何像樂高積木一樣組合智能合約，透過重複使用現有元件來建立複雜的去中心化應用程式 (dapp)。"
lang: zh-tw
incomplete: true
---

## 簡介 {#a-brief-introduction}

智能合約在以太坊上是公開的，可以被視為開放的 API。你不需要自己編寫智能合約就能成為去中心化應用程式 (dapp) 開發者，你只需要知道如何與它們互動。例如，你可以使用去中心化交易所 [尤尼斯瓦普](https://uniswap.exchange/swap) 現有的智能合約，來處理應用程式中所有的代幣兌換邏輯，而不需要從頭開始。查看他們的一些 [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) 和 [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) 合約。

## 什麼是可組合性？ {#what-is-composability}

可組合性是將不同的元件組合起來，以建立新的系統或輸出。在軟體開發中，可組合性意味著開發者可以重複使用現有的軟體元件來建立新的應用程式。理解可組合性的一個好方法是將可組合的元素想像成樂高積木。每塊樂高積木都可以與另一塊結合，讓你透過組合不同的樂高積木來建立複雜的結構。

在以太坊中，每個智能合約都是一種樂高積木——你可以使用其他專案的智能合約作為你專案的基礎模塊。這意味著你不需要花時間重新發明輪子或從頭開始建立。

## 可組合性是如何運作的？ {#how-does-composability-work}

以太坊智能合約就像公開的 API，因此任何人都可以與合約互動，或將它們整合到 dapp 中以增加功能。智能合約可組合性通常基於三個原則運作：模組化、自主性和可發現性：

**1. 模組化**：這是個別元件執行特定任務的能力。在以太坊中，每個智能合約都有特定的使用案例（如尤尼斯瓦普的例子所示）。

**2. 自主性**：可組合的元件必須能夠獨立運作。以太坊中的每個智能合約都是自動執行的，並且可以在不依賴系統其他部分的情況下運作。

**3. 可發現性**：如果外部合約或軟體函式庫沒有公開，開發者就無法呼叫它們或將其整合到應用程式中。在設計上，智能合約是開源的；任何人都可以呼叫智能合約或分叉程式碼庫。

## 可組合性的好處 {#benefits-of-composability}

### 縮短開發週期 {#shorter-development-cycle}

可組合性減少了開發者在建立 [dapp](/apps/#what-are-dapps) 時必須做的工作。[正如 Naval Ravikant 所說：](https://twitter.com/naval/status/1444366754650656770)「開源意味著每個問題只需要被解決一次。」

如果有一個智能合約解決了一個問題，其他開發者就可以重複使用它，這樣他們就不必解決相同的問題。這樣一來，開發者就可以採用現有的軟體函式庫並添加額外的功能來建立新的 dapp。

### 更多的創新 {#greater-innovation}

可組合性鼓勵創新和實驗，因為開發者可以自由地重複使用、修改、複製或整合開源程式碼，以創造出想要的結果。因此，開發團隊花在基本功能上的時間更少，可以分配更多時間來實驗新功能。

### 更好的使用者體驗 {#better-user-experience}

以太坊生態系統元件之間的互操作性改善了使用者體驗。當 dapp 整合外部智能合約時，使用者可以獲得比在應用程式無法通訊的碎片化生態系統中更多的功能。

我們將使用套利交易的例子來說明互操作性的好處：

如果某個代幣在 `exchange A` 上的交易價格高於 `exchange B`，你可以利用價格差異來獲利。然而，只有當你有足夠的資金來為交易提供資金時（即從 `exchange B` 購買代幣並在 `exchange A` 上出售），你才能這樣做。

在你沒有足夠資金來支付交易的情況下，閃電貸可能是理想的選擇。[閃電貸](/defi/#flash-loans) 具有很高的技術性，但基本概念是你可以借入資產（無需抵押品）並在「單筆」交易內歸還。

回到我們最初的例子，套利交易者可以借出大筆閃電貸，從 `exchange B` 購買代幣，在 `exchange A` 上出售，償還本金和利息，並保留利潤，所有這些都在同一筆交易中完成。這種複雜的邏輯需要組合對多個合約的呼叫，如果智能合約缺乏互操作性，這是不可能實現的。

## 以太坊中可組合性的例子 {#composability-in-ethereum}

### 代幣兌換 {#token-swaps}

如果你建立了一個需要用 ETH 支付交易的 dapp，你可以透過整合代幣兌換邏輯，允許使用者用其他 ERC-20 代幣支付。在合約執行被呼叫的函式之前，程式碼會自動將使用者的代幣轉換為 ETH。

### 治理 {#governance}

為 [DAO](/dao/) 建立客製化的治理系統可能會非常昂貴且耗時。相反地，你可以使用開源的治理工具包，例如 [Aragon Client](https://client.aragon.org/)，來引導你的 DAO 快速建立治理框架。

### 身分管理 {#identity-management}

與其建立自訂的驗證系統或依賴中心化提供者，你可以整合去中心化身分 (DID) 工具來管理使用者的驗證。一個例子是 [SpruceID](https://www.spruceid.com/)，這是一個開源工具包，提供「使用以太坊登入 (Sign in with Ethereum)」功能，讓使用者可以使用以太坊錢包驗證身分。

## 相關教學 {#related-tutorials}

- [使用 create-eth-app 啟動你的 dapp 前端開發](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– 概述如何使用 create-eth-app 來建立開箱即用、包含熱門智能合約的應用程式。_

## 延伸閱讀 {#further-reading}

_知道有什麼社群資源對你有幫助嗎？編輯此頁面並加入它！_

- [可組合性就是創新](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [為什麼可組合性對 Web3 很重要](https://hackernoon.com/why-composability-matters-for-web3)
- [什麼是可組合性？](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)