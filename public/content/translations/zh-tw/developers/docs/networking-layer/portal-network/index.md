---
title: "波特爾網路"
description: "波特爾網路的概覽，這是一個點對點網路，在客戶端停止儲存所有以太坊歷史記錄時，仍能保持這些記錄的可用性。"
lang: zh-tw
---

[以太坊](/)是一個由執行以太坊客戶端軟體的電腦所組成的網路。這些電腦中的每一台都被稱為「節點」。客戶端軟體允許節點在以太坊網路上傳送和接收資料，並根據以太坊協定規則驗證資料。節點在其磁碟儲存空間中保留大量歷史資料，並在從網路上的其他節點接收到稱為區塊的新資訊封包時將其加入。這對於始終檢查節點是否具有與網路其餘部分一致的資訊是必要的。這意味著執行節點可能要求大量的磁碟空間。某些節點操作也可能要求大量的 RAM。

執行客戶端不再需要保留所有這些資料。自 2025 年 7 月起，它們可以捨棄[合併](/roadmap/merge/)之前的區塊主體和收據，且以太坊路線圖包含隨著時間推移捨棄更多鏈的歷史記錄。這些歷史記錄仍然必須對任何需要它的人保持可用，例如區塊瀏覽器、索引器或尋找舊交易的錢包。

波特爾網路透過將這些歷史記錄分成小塊並在許多節點之間共享，來保持其可用性。沒有任何節點必須儲存所有記錄，且節點可以擷取任何片段並將其與已持有的資料進行核對，而無需信任傳送該片段的節點。

更多關於[節點與客戶端](/developers/docs/nodes-and-clients/)的資訊

## 為什麼我們需要波特爾網路 {#why-do-we-need-portal-network}

以太坊節點儲存其自身的完整或部分以太坊區塊鏈副本。此本機副本用於驗證交易並確保節點遵循正確的鏈。這些本機儲存的資料允許節點獨立驗證傳入的資料是否有效且正確，而無需信任任何其他實體。

區塊鏈的本機副本以及相關的狀態和收據資料佔用了節點硬碟上的大量空間。例如，建議使用 4TB SSD 來執行與共識客戶端配對的 [Geth](https://geth.ethereum.org) 節點。若包含完整的鏈歷史記錄，Geth 佔用超過 1.8TB 的磁碟空間（截至 2026 年 9 月），並且隨著鏈的增長而持續增加。

這意味著執行節點可能會很昂貴，因為必須將大量的磁碟空間專門用於以太坊。[歷史記錄過期](/roadmap/statelessness/#history-expiry)透過讓客戶端刪除它們不需要用來跟隨鏈的舊區塊資料來減少空間佔用：自 2025 年 7 月的[部分歷史記錄過期](https://blog.ethereum.org/2025/07/08/partial-history-exp)以來，執行客戶端可以捨棄合併之前每個區塊的主體和收據。[狀態過期](/roadmap/statelessness/#state-expiry)和[無狀態性](/roadmap/statelessness/)是仍在研究中的進一步解決方案。

一旦節點停止儲存舊的歷史記錄，它們就無法再將其提供給其他人。封存檔、種子 (torrents) 和提供者會保留其副本；波特爾網路將其分散在許多節點上，因此它可以在不依賴任何單一節點的情況下保持可用。

## 波特爾網路如何運作？ {#how-does-portal-network-work}

以太坊節點具有嚴格的協定，定義了它們如何相互通訊。執行客戶端使用一組稱為 [DevP2P](/developers/docs/networking-layer/#devp2p) 的子協定進行通訊，而共識客戶端則使用稱為 [libP2P](/developers/docs/networking-layer/#libp2p) 的不同子協定堆疊。DevP2P 允許節點向其對等節點請求區塊主體和收據，但已捨棄舊歷史記錄的對等節點無法提供它。應用程式和錢包也可以透過 [JSON-RPC 應用程式介面 (API)](/developers/docs/apis/json-rpc/) 從節點取得資料，但這依賴於單一節點或提供者儲存資料，並信任其是誠實的。

波特爾網路是一個獨立的點對點網路，專為共享歷史記錄而建置。它在 [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md) 上執行，這是共識客戶端也用來尋找對等節點的節點發現協定，並將其節點組織為[分散式雜湊表 (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table)，類似於 BitTorrent 的做法。每個節點都有一個節點 ID，而每一段內容（例如一個區塊的收據）在相同的 ID 空間中都有一個內容 ID，該 ID 衍生自其區塊號碼。每個節點會儲存 ID 最接近其自身 ID 的內容，直到其選擇的距離（稱為其半徑）。為了擷取一段內容，節點會詢問它所知最接近該內容 ID 的對等節點。沒有該內容的對等節點會回覆更接近的節點，直到請求到達儲存該內容的節點為止。

<PortalHistoryDiagram />

節點永遠不需要信任它接收到的資料。它保留每個區塊頭，且每個區塊頭透過諸如 `transactionsRoot` 和 `receiptsRoot` 等根 (roots) 來承諾其區塊的交易和收據。節點在使用區塊主體或區塊收據之前，會根據這些根來檢查它們。

### 波特爾網路 {#the-portal-networks}

波特爾網路最初被設計為幾個子網路，讓輕量級客戶端可以在不信任全節點的情況下跟隨鏈：信標鏈輕客戶端網路、狀態網路、交易八卦 (gossip) 網路和歷史記錄網路。在 2025 年，除了其中一個之外，所有子網路的規範都被移至舊版 (legacy)，現在的開發重點放在**歷史記錄網路 (History network)**，它為保留每個區塊頭但已捨棄其餘歷史記錄的執行客戶端儲存過去區塊的主體和收據。

## 波特爾網路客戶端 {#client-diversity-as-default}

有幾個團隊建置了波特爾網路客戶端：

- [寧布斯 (Nimbus) Portal 客戶端](https://fluffy.guide)（前身為 Fluffy）：以 Nim 撰寫，是目前仍在積極開發中的客戶端
- [Trin](https://github.com/ethereum/trin)：以 Rust 撰寫，已不再維護
- [Ultralight](https://github.com/ethereumjs/ultralight)：以 TypeScript 撰寫，自 2025 年中以來未再更新
- [Shisui](https://github.com/zen-eth/shisui)：以 Go 撰寫，自 2025 年中以來未再更新

## 進一步閱讀 {#further-reading}

- [波特爾網路規範](https://github.com/ethereum/portal-network-specs)
- [使用波特爾網路協定進行歷史記錄過期](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [部分歷史記錄過期](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [波特爾網路（Piper Merriam 在波哥大 Devcon 的演講）](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [波特爾網路 Discord](https://discord.gg/CFFnmE7Hbs)
- [波特爾網路網站](https://www.ethportal.net/)
