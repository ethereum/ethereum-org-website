---
title: 智慧型合約的可組合性
description: 了解智能合約如何像樂高積木一樣組合，透過重複使用現有元件來建構複雜的去中心化應用程式。
lang: zh-tw
incomplete: true
---

## 簡介 {#a-brief-introduction}

智慧型合約在以太坊上公開，類似於傳統網路世界中的 Open API。 你不一定需要編寫自己的智慧型合約才能成為一名去中心化應用程式的開發者，你只需要知道要怎樣與它們互動即可。 例如，您可以使用去中心化交易所 [Uniswap](https://uniswap.exchange/swap) 現有的智能合約，來處理您應用程式中的所有代幣交換邏輯 — 您不需要從頭開始。 查看他們的一些 [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) 和 [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) 合約。

## 甚麼是可組合性？ {#what-is-composability}

可組合性是指組合不同的元件來建立全新的系統或輸出。 在軟體開發中，可組合性指開發者可以重複使用現有的軟體元件來建置全新的應用程式。 一個很好理解可組合性的方法是，把可組合的元素想像成樂高方塊。 每個樂高方塊可以與另一個樂高方塊組合，允許你透過組合不同的樂高方塊來構建複雜結構。

在以太坊，每一個智慧型合約都是一個樂高方塊 — 你可以使用其他專案的智慧型合約作為自己的專案方塊。 這意味著你不需要花費時間來重新發明輪子或是從零開始構建。

## 可組合性如何運作？ {#how-does-composability-work}

以太坊上的智慧型合約就如同公開的應用程式介面 (API)，所有人都可以與合約互動，或把它整合到去中心化應用程式獲得新增的功能。 智慧型合約的可組合性通常遵循三個原則：模塊化、自主性和可發現性。

\*\*1. **模組化**：這是指個別元件執行特定任務的能力。 在以太坊，每個智慧型合約都有特定的使用案例（如 Uniswap 範例所顯示）。

\*\*2. **自主性**：可組合的元件必須能夠獨立運作。 以太坊上的每一個智慧型合約都能自我執行，且可以在不依賴系統其他部分的情況下運作。

\*\*3. **可發現性**：如果外部合約或軟體程式庫不是公開可用的，開發人員就無法呼叫它們或將其整合到應用程式中。 智慧型合約被設計成開放原始碼，任何人都可以調用智慧型合約或分叉一個程式碼庫。

## 可組合性的優點 {#benefits-of-composability}

### 更短的開發週期 {#shorter-development-cycle}

可組合性減少了開發人員在建立[去中心化應用程式](/apps/#what-are-dapps)時所需的工作量。 [正如 Naval Ravikant 所說：](https://twitter.com/naval/status/1444366754650656770) "開放原始碼意味著每個問題只需要解決一次。"

如果有一個智慧型合約解決了某個問題，其他開發者便可以重複使用它，所以他們便不必再解決同一個問題。 這樣，開發者可以使用現有的軟體程式庫並增加額外的功能，以建立新的去中心化應用程式 (dapp)。

### 更強的創新能力 {#greater-innovation}

可組合性鼓勵創新和實驗，因為開發者可以自由地重複使用、修改、複製或整合開放原始程式碼以達到所需的效果。 因此，開發團隊可以花費更少時間在基本功能上，且可以分配更多的時間進行新功能的實驗。

### 更佳的使用者體驗 {#better-user-experience}

以太坊生態系統元件之間的互通性提高了使用者體驗。 當去中心化應用程式 (dapp) 整合外部智慧型合約時，使用者可以獲得更多功能，而在一個分散的生態系統中，應用程式無法通訊，功能就會受限。

我們將使用套利交易的一個範例來說明互通性的好處：

如果一個代幣在 `exchange A` 的交易價格高於 `exchange B`，您可以利用價差獲利。 然而，只有在您有足夠的資本為交易提供資金時，才能這麼做 (亦即，從 `exchange B` 購買代幣，然後在 `exchange A` 賣出)。

在你沒有足夠資金來完成這筆交易的情境下，閃電貸可能是一個理想的選擇。 [閃電貸](/defi/#flash-loans) 的技術性很強，但基本概念是您可以在 _單一_ 筆交易中借入資產 (無須抵押品) 並歸還。

回到我們最初的例子，套利交易者可以在同一筆交易中，借入大額閃電貸，從 `exchange B` 購買代幣，在 `exchange A` 賣出，償還本金和利息，並保留利潤。 這個複雜的邏輯需要組合多個智慧型合約的調用，而如果智慧型合約缺乏互通性，這將是不可能的。

## 以太坊中可組合性的範例 {#composability-in-ethereum}

### 代幣交換 {#token-swaps}

如果你正建立一個需要用以太幣來支付交易的去中心化應用程式 (dapp)，透過整合代幣交換邏輯，你可以讓使用者用其他 ERC-20 代幣進行支付。 程式碼會在合約執行被調用的函式前自動把使用者的代幣轉換成以太幣。

### 管理體系 {#governance}

為 [DAO](/dao/) 建立客製化的管理體系可能既昂貴又耗時。 或者，您也可以使用開放原始碼的管理體系工具組，例如 [Aragon Client](https://client.aragon.org/)，來啟動您的 DAO，以快速建立一個管理體系框架。

### 身分管理 {#identity-management}

你可以整合去中心化身分 ( DID) 工具來管理使用者的認證，而不是建置一個自訂的驗證系統或依賴中心化的服務提供商。 其中一個範例是 [SpruceID](https://www.spruceid.com/)，它是一個開放原始碼的工具組，提供"使用以太坊登入"功能，讓使用者能使用以太坊錢包驗證身分。

## 相關教學 {#related-tutorials}

- [使用 create-eth-app 快速啟動您的去中心化應用程式前端開發](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _— 概述如何使用 create-eth-app，透過現成即用的熱門智能合約來建立應用程式。_

## 延伸閱讀 {#further-reading}

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_

- [可組合性即創新](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [為何可組合性對 Web3 至關重要](https://hackernoon.com/why-composability-matters-for-web3)
- [什麼是可組合性？](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
