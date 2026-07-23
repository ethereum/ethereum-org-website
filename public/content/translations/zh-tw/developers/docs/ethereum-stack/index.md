---
title: "以太坊堆疊簡介"
description: "介紹以太坊堆疊的不同層級以及它們如何組合在一起。"
lang: zh-tw
---

就像任何軟體堆疊一樣，完整的「以太坊堆疊」會根據你的目標而因專案而異。

然而，以太坊的核心元件有助於提供一個心智模型，說明軟體應用程式如何與以太坊區塊鏈互動。了解堆疊的各個層級將有助於你了解將以太坊整合到軟體專案中的不同方式。

## 第 1 層：以太坊虛擬機 {#ethereum-virtual-machine}

[以太坊虛擬機 (EVM)](/developers/docs/evm/) 是以太坊上智能合約的執行環境。以太坊區塊鏈上的所有智能合約和狀態變更都是由[交易](/developers/docs/transactions/)執行的。EVM 處理以太坊網路上的所有交易處理。

與任何虛擬機一樣，EVM 在執行的程式碼和執行的機器（以太坊節點）之間建立了一個抽象層。目前，EVM 運行在分佈於世界各地的數千個節點上。

在底層，EVM 使用一組操作碼指令來執行特定任務。這些（140 個獨特的）操作碼使 EVM [具備圖靈完備性](https://en.wikipedia.org/wiki/Turing_completeness)，這意味著只要有足夠的資源，EVM 幾乎可以計算任何東西。

身為去中心化應用程式 (dapp) 開發者，你不需要對 EVM 有太多了解，只需知道它的存在，並且它能可靠地為以太坊上的所有應用程式提供動力而不會停機。

## 第 2 層：智能合約 {#smart-contracts}

[智能合約](/developers/docs/smart-contracts/)是在以太坊區塊鏈上運行的可執行程式。

智能合約是使用特定的[程式語言](/developers/docs/smart-contracts/languages/)編寫的，這些語言會編譯成 EVM 位元組碼（稱為操作碼的低階機器指令）。

智能合約不僅可作為開源函式庫，本質上也是始終運行且無法被關閉的開放 API 服務。智能合約提供公開的函式，使用者和應用程式（[dapp](/developers/docs/dapps/)）無需許可即可與之互動。任何應用程式都可以與已部署的智能合約整合以組合功能，例如新增[資料饋送](/developers/docs/oracles/)或支援代幣交換。此外，任何人都可以將新的智能合約部署到以太坊，以新增自訂功能來滿足其應用程式的需求。

身為 dapp 開發者，只有當你想在以太坊區塊鏈上新增自訂功能時，才需要編寫智能合約。你可能會發現，僅僅透過與現有的智能合約整合，就能實現專案的大部分或全部需求，例如，如果你想支援穩定幣支付或啟用代幣的去中心化交易所。

## 第 3 層：以太坊節點 {#ethereum-nodes}

為了讓應用程式與以太坊區塊鏈互動，它必須連接到[以太坊節點](/developers/docs/nodes-and-clients/)。連接到節點可讓你讀取區塊鏈資料和/或向網路發送交易。

以太坊節點是運行軟體（以太坊客戶端）的電腦。客戶端是以太坊的一種實作，它會驗證每個區塊中的所有交易，從而保持網路安全和資料準確。**以太坊節點就是以太坊區塊鏈**。它們共同儲存以太坊區塊鏈的狀態，並對改變區塊鏈狀態的交易達成共識。

透過將你的應用程式連接到以太坊節點（透過 [JSON-RPC API](/developers/docs/apis/json-rpc/)），你的應用程式能夠從區塊鏈讀取資料（例如使用者帳戶餘額），以及向網路廣播新交易（例如在使用者帳戶之間轉移 ETH 或執行智能合約的函式）。

## 第 4 層：以太坊客戶端 API {#ethereum-client-apis}

許多便利的函式庫（由以太坊開源社群建立和維護）允許你的應用程式連接到以太坊區塊鏈並與之通訊。

如果你面向使用者的應用程式是網頁應用程式，你可以選擇直接在前端 `npm install` [JavaScript API](/developers/docs/apis/javascript/)。或者你可能會選擇在伺服器端實作此功能，使用 [Python](/developers/docs/programming-languages/python/) 或 [Java](/developers/docs/programming-languages/java/) API。

雖然這些 API 不是堆疊中必要的組成部分，但它們抽象化了直接與以太坊節點互動的許多複雜性。它們還提供實用函式（例如，將 ETH 轉換為 Gwei），因此身為開發者，你可以花更少的時間處理以太坊客戶端的複雜細節，而將更多時間集中在應用程式的特定功能上。

## 第 5 層：終端使用者應用程式 {#end-user-applications}

堆疊的最頂層是面向使用者的應用程式。這些是你今天經常使用和建立的標準應用程式：主要是網頁和行動應用程式。

你開發這些使用者介面的方式基本上保持不變。通常，使用者不需要知道他們正在使用的應用程式是使用區塊鏈建立的。

## 準備好選擇你的堆疊了嗎？ {#ready-to-choose-your-stack}

查看我們的指南，為你的以太坊應用程式[設定本機開發環境](/developers/local-environment/)。

## 延伸閱讀 {#further-reading}

- [Web 3.0 應用程式的架構](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_知道有幫助過你的社群資源嗎？編輯此頁面並加入它！_