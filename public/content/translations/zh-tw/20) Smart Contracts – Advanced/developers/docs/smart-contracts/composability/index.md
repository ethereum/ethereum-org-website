---
title: 智慧型合約的可組合性
description:
lang: zh-tw
incomplete: true
---

## 簡介 {#a-brief-introduction}

智慧型合約在以太坊上公開，類似於傳統網路世界中的 open API。 你不一定需要編寫自己的智慧型合約才能成為一名去中心化應用的開發者，你只需要知道要怎樣與他們互動即可。 例如，你可以使用已存在的 [Uniswap](https://uniswap.exchange/swap)（一個去中心化的交易所）智慧型合約，來處理你應用程式中的代幣交換邏輯 – 你不需要從新開發一個。 歡迎查看其[v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts)及[v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts)合約。

## 甚麼是可組合性？ {#what-is-composability}

可組合性是指組合不同的部件來創造出全新的系統或輸出。 在軟體開發中，可組合性指開發者可以重覆使用現有的軟體組件來構建全新的應用程式。 一個很好理解可組合性的方法是把可組合的元素想像成樂高方塊。 每個樂高方塊可以與另一個樂高方塊組合，允許你通過組合不同的樂高方塊來構建複雜結構。

在以太坊，每一個智慧型合約都是樂高方塊 — 你可以使用其他專案的智慧型合約作為你專案的方塊。 這意味著你不需要花費時間來重新發明輪子或是從零開始構建。

## 可組合性如何運作？ {#how-does-composability-work}

以太坊上的智慧型合約就如同公開的 APIs，所有人都可以與合約互動或把它整合到 dApps 作為新增的功能。 智慧型合約的可組合性通常遵循三個原則：模塊化、自主性和可發現性。

**1. 模塊化**：這是指獨立組件執行特定任務的能力。 在以太坊，每個智慧型合約都有特定的使用案例（如 Uniswap 範例所顯示）。

**2. 自主性**：可組合的元件必需要有獨立運作的能力。 每一個在以太坊上的智慧型合約都是自我執行的，且可以在不依賴系統其他部分的情況下運作。

**3. 可發現性**：如果外部合約不是公開可用的，開發者就無法調用它或將軟件庫集成到應用程序中。 智慧型合約是被設計成開源的，任何人都可以調用智慧型合約或分叉一個程式庫。

## 可組合性的好處 {#benefits-of-composability}

### 更短的開發週期 {#shorter-development-cycle}

可組合性減少了開發者在創建[dApps](/dapps/#what-are-dapps)時需要做的工作。 [正如同 Naval Ravikant 所說：](https://twitter.com/naval/status/1444366754650656770)「開源意指所有問題都只需要解決一遍。」

如果有一個智慧型合約解決了某個問題，其他開發者便可以重複使用它，所以他們便不必再解決同一個問題。 這樣，開發者可以使用現有的軟件庫並增加額外的功能，以創建新的 dApps。

### 更大的創新 {#greater-innovation}

可組合性鼓勵創新和實驗，因為開發者可以自由地重用、修改、複製或整合開源程式碼以達到所需的效果。 因此，開發團隊可以花費更少時間在基本功能上，且可以分配更多的時間進行新功能的實驗。

### 更好的使用者體驗 {#better-user-experience}

以太坊生態組件之間的互操作性提高了使用者體驗。 當去中心化應用整合外部智慧型合約時，用戶可以獲得更多功能，而在一個分散的生態系統中，應用程式無法通信，功能就會受限。

我們將使用套利交易的一個例子來說明互操作性的好處：

如果一個代幣在`交易所 A `的交易價格高於`交易所 B`，你可以利用價格差異來獲利。 但是，你只可以在有足夠的資金才能完成這筆交易（如：`在交易所 B `買入代幣並在`交易所 A `賣出）。

在一個你沒有足夠資金來完成這筆交易的情境下，閃電貸可能是一個理想的選擇。 [閃電貸](/defi/#flash-loans)技術性很高，但它的基本概念是你可以借用資產（不需抵押）並在_一_筆交易內把它歸還。

回到我們一開始的例子，一個套利交易者可以借一筆大額的閃電貸，於同一筆交易中從`交易所 B `買入代幣，然後在`交易所 A `賣出，把資金和利息歸返，並把利潤留下。 這個複雜的邏輯需要組合多個智慧型合約的調用，而如果智慧型合約缺乏互操作性，這將是不可能的。

## 以太坊裡可組合性的範例 {#composability-in-ethereum}

### 代幣交換 {#token-swaps}

如果你正建立一個需要用 ETH 來支付交易的 dApps，通過整合代幣交換邏輯，你可以讓使用者用其他 ERC-20 代幣進行支付。 程式碼會在執行被調用的函數前自動把使用者的代幣轉換成 ETH。

### 治理 {#governance}

為[ DAO ](/dao/)打造定制的治理系統可能既昂貴又耗時。 相反，你可以使用開源的治理工具包，例如[Aragon Client](https://client.aragon.org/)，來快速為你的 DAO 啟動一個治理框架。

### 身份管理 {#identity-management}

你可以整合去中心化身份 ( DID ) 工具來管理使用者的身份認證，而不是建立一個定制的身份驗證系統或依賴中心化的服務提供商。 一個例子是[ SpruceID ](https://www.spruceid.com/)，這是一個提供「使用以太坊登錄」功能的開源工具包，讓使用者能使用以太坊錢包進行身份驗證。

## 相關教程 {#related-tutorials}

- [開始您的前端研發利用creat-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-wth-create-eth-app/)_ -- 一簡介指導您如何使用creat-eth-app來創建帶有熱門智能合約之應用程式._

## 衍生閱讀 {#further-reading}

_認識社區或社團資源能幫助大家學習更多? 歡迎自由編輯或添加於本頁!!_

- [可組合性是創新](https://future.a16z.com/how-composability-unlocks-crypto-and-everything-else/)
- [為甚麼可組合性對 Web3 很重要](https://hackernoon.com/why-composability-matters-for-web3)
- [甚麼是可組合性？](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
