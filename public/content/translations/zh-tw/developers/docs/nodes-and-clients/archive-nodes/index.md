---
title: "以太坊歸檔節點"
description: "歸檔節點概述"
lang: zh-tw
sidebarDepth: 2
---

歸檔節點是設定為建立所有歷史狀態歸檔的 [以太坊](/) 用戶端實例。對於某些使用案例來說，這是一個有用的工具，但運行起來可能比全節點更棘手。

## 先決條件 {#prerequisites}

您應該了解 [以太坊節點](/developers/docs/nodes-and-clients/) 的概念、[其架構](/developers/docs/nodes-and-clients/node-architecture/)、[同步策略](/developers/docs/nodes-and-clients/#sync-modes)，以及 [運行](/developers/docs/nodes-and-clients/run-a-node/) 和 [使用它們](/developers/docs/apis/json-rpc/) 的實務做法。

## 什麼是歸檔節點 {#what-is-an-archive-node}

為了理解歸檔節點的重要性，讓我們先釐清「狀態」的概念。以太坊可以被稱為_基於交易的狀態機_。它由帳戶和應用程式組成，這些帳戶和應用程式透過執行交易來改變其狀態。包含每個帳戶和合約資訊的全域資料，儲存在稱為狀態的 Trie（字典樹）資料庫中。這由執行層 (EL) 用戶端處理，並包含：

- 帳戶餘額與隨機數 (nonce)
- 合約程式碼與儲存空間
- 共識相關資料，例如質押存款合約

為了與網路互動、驗證並產生新區塊，以太坊用戶端必須跟上最新的變更（鏈的頂端），也就是當前的狀態。設定為全節點的執行層用戶端會驗證並跟隨網路的最新狀態，但只會快取過去的幾個狀態（例如與最後 128 個區塊相關的狀態），以便處理鏈重組並提供對近期資料的快速存取。近期狀態是所有用戶端驗證傳入交易和使用網路所需要的。

您可以將狀態想像成在特定區塊的瞬間網路快照，而歸檔則是歷史重播。

歷史狀態可以安全地被修剪，因為它們對於網路運作來說並非必要，而且讓用戶端保留所有過時資料會造成無用的冗餘。存在於某些近期區塊（例如鏈頭前 128 個區塊）之前的狀態實際上會被丟棄。全節點只保留歷史區塊鏈資料（區塊和交易）以及偶爾的歷史快照，它們可以根據要求使用這些快照來重新產生較舊的狀態。它們透過在 EVM 中重新執行過去的交易來實現這一點，當所需狀態距離最近的快照很遠時，這可能會耗費大量運算資源。

然而，這意味著在全節點上存取歷史狀態會消耗大量運算資源。用戶端可能需要執行所有過去的交易，並從創世區塊開始計算出一個歷史狀態。歸檔節點透過不僅儲存最新狀態，還儲存每個區塊產生後建立的每個歷史狀態來解決這個問題。它基本上是以更大的磁碟空間需求來進行權衡。

值得注意的是，網路並不依賴歸檔節點來保留和提供所有歷史資料。如上所述，所有歷史過渡狀態都可以在全節點上推導出來。交易由任何全節點儲存（目前小於 400GB），並且可以被重播以建立完整的歸檔。

### 使用案例 {#use-cases}

以太坊的常規使用（如發送交易、部署合約、驗證共識等）不需要存取歷史狀態。使用者在與網路進行標準互動時，永遠不需要歸檔節點。

狀態歸檔的主要好處是可以快速存取有關歷史狀態的查詢。例如，歸檔節點會迅速回傳以下結果：

- _在區塊 15537393 時，帳戶 0x1337... 的 ETH 餘額是多少？_
- _在區塊 1920000 時，合約 0x 中代幣 0x 的餘額是多少？_

如上所述，全節點需要透過 EVM 執行來產生這些資料，這會佔用 CPU 並且需要時間。歸檔節點則在磁碟上存取它們並立即提供回應。這對於基礎設施的某些部分來說是一個有用的功能，例如：

- 服務供應商（如區塊鏈瀏覽器）
- 研究人員
- 安全分析師
- 去中心化應用程式 (dapp) 開發人員
- 稽核與合規

有各種免費的 [服務](/developers/docs/nodes-and-clients/nodes-as-a-service/) 也允許存取歷史資料。由於運行歸檔節點的要求較高，這種存取通常受到限制，並且僅適用於偶爾的存取。如果您的專案要求持續存取歷史資料，您應該考慮自己運行一個歸檔節點。

## 實作與使用 {#implementations-and-usage}

在此背景下的歸檔節點，是指由面向使用者的執行層用戶端所提供的資料，因為它們處理狀態資料庫並提供 JSON-RPC 端點。設定選項、同步時間和資料庫大小可能因用戶端而異。如需詳細資訊，請參閱您的用戶端所提供的文件。

在啟動您自己的歸檔節點之前，請先了解用戶端之間的差異，特別是各種 [硬體要求](/developers/docs/nodes-and-clients/run-a-node/#requirements)。大多數用戶端並未針對此功能進行最佳化，其歸檔需要超過 12TB 的空間。相比之下，像艾瑞貢 (Erigon) 這樣的實作可以在 3TB 以下儲存相同的資料，這使其成為運行歸檔節點最有效的方式。

## 推薦實務 {#recommended-practices}

除了 [運行節點的一般建議](/developers/docs/nodes-and-clients/run-a-node/) 之外，歸檔節點對硬體和維護的要求可能更高。考慮到艾瑞貢 (Erigon) 的 [關鍵功能](https://github.com/ledgerwatch/erigon#key-features)，最實用的方法是使用 [艾瑞貢 (Erigon)](/developers/docs/nodes-and-clients/#erigon) 用戶端實作。

### 硬體 {#hardware}

請務必在用戶端文件中驗證特定模式的硬體要求。
歸檔節點最大的要求是磁碟空間。根據用戶端的不同，空間需求從 3TB 到 12TB 不等。即使 HDD 可能被認為是處理大量資料的更好解決方案，但同步資料並不斷更新鏈頭將需要 SSD 磁碟機。[SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) 磁碟機已經足夠好，但應該具備可靠的品質，至少是 [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences)。磁碟可以安裝在桌上型電腦或具有足夠插槽的伺服器中。這類專用裝置非常適合運行高正常運行時間的節點。完全可以在筆記型電腦上運行它，但便攜性將帶來額外的成本。

所有資料都需要放入一個磁碟區中，因此必須將磁碟合併，例如使用 [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) 或 LVM。也值得考慮使用 [ZFS](https://en.wikipedia.org/wiki/ZFS)，因為它支援「寫入時複製 (Copy-on-write)」，這可確保資料正確寫入磁碟而不會出現任何低階錯誤。

為了在防止意外資料庫損毀方面獲得更高的穩定性和安全性（特別是在專業設定中），如果您的系統支援，請考慮使用 [ECC 記憶體](https://en.wikipedia.org/wiki/ECC_memory)。通常建議 RAM 的大小與全節點相同，但更多的 RAM 有助於加快同步速度。

在初始同步期間，處於歸檔模式的用戶端將執行自創世區塊以來的每筆交易。執行速度主要受限於 CPU，因此更快的 CPU 有助於縮短初始同步時間。在一般的消費級電腦上，初始同步可能需要長達一個月的時間。

## 延伸閱讀 {#further-reading}

- [以太坊全節點與歸檔節點比較](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode，2022 年 9 月_
- [建立您自己的以太坊歸檔節點](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush，2021 年 8 月_
- [如何將 Erigon、Erigon 的 RPC 和 TrueBlocks（抓取與 API）設定為服務](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson，更新於 2022 年 9 月_

## 相關主題 {#related-topics}

- [節點與用戶端](/developers/docs/nodes-and-clients/)
- [運行節點](/developers/docs/nodes-and-clients/run-a-node/)