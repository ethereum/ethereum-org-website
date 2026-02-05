---
title: 以太坊歸檔節點
description: 歸檔節點概覽
lang: zh-tw
sidebarDepth: 2
---

歸檔節點是一個以太坊用戶端的實例，經設定用來建立所有歷史狀態的存檔。 它是某些用例的有用工具，但可能比運行一個全節點更加複雜。

## 先決條件 {#prerequisites}

您應該了解 [以太坊節點](/developers/docs/nodes-and-clients/) 的概念、[其架構](/developers/docs/nodes-and-clients/node-architecture/)、[同步策略](/developers/docs/nodes-and-clients/#sync-modes)，以及 [運行](/developers/docs/nodes-and-clients/run-a-node/) 和 [使用它們](/developers/docs/apis/json-rpc/) 的方法。

## 什麼是歸檔節點

要理解歸檔節點的重要性，讓我們先釐清「狀態」的概念。 以太坊可以稱為_以交易為基礎的狀態機_。 它包括了帳戶以及執行交易並改變帳戶狀態的應用程式。 有關每個帳戶和合約的全球數據儲存在一個稱為狀態的 字典樹資料庫中。 這由執行層 (EL) 用戶端處理，並包括:

- 帳戶餘額和隨機數
- 合約代碼與儲存
- 共識相關資料，例如：質押存款合約

為了與網路互動、驗證和產生新區塊，以太坊用戶端必須跟上最近的變化（鏈尖），因此需要知道當前狀態。 設定為完整節點的執行層用戶端會驗證並追蹤網路的最新狀態，但只會快取過去的少數幾個狀態 (例如：與最近 128 個區塊相關的狀態)，因此它可以處理鏈重組，並提供對近期資料的快速存取。 最近的狀態是所有用戶端需要用來驗證傳入交易和使用網路的資料。

你可以將狀態想像為給定區塊的瞬間網路快照，而將存檔視為歷史重播。

歷史狀態可以安全地修剪，因為它們對網路的運作並不必要，而且用戶端保留所有過時資料是無用的。 在某個近期區塊 (例如：標頭前的 128 個區塊) 之前存在的狀態，實際上會被捨棄。 全節點只保留歷史區塊鏈資料（區塊和交易）以及可供全節點用來根據請求重新產生較早狀態的偶然歷史快照。 它們透過在以太坊虛擬機中重新執行過去的交易來實現這一點，當所需的狀態距離最近的快照很遠時，這可能在計算上要求很高。

然而，這意味著在全節點上存取歷史狀態會消耗大量的算力。 用戶端可能需要執行所有過去的交易並從創世塊計算一個歷史狀態。 歸檔節點透過不僅儲存最近的狀態，而且儲存每個區塊後建立的每個歷史狀態來解決這個問題。 它基本上是以更大的磁碟空間需求作為代價。

值得注意的是，網路並不依賴歸檔節點來保存和提供所有歷史資料。 如上所述，所有歷史中間狀態都可以在全節點上推導出來。 任何全節點都儲存交易（目前少於 400G），並且可以重播以建立整個存檔。

### 使用案例

發送交易、部署合約、驗證共識等常規的以太坊使用不需要存取歷史狀態。 使用者無需歸檔節點，就可以與網路進行標準互動。

狀態存檔的主要好處是可以快速存取歷史狀態查詢。 舉例來說，歸檔節點將即時返回以下結果：

- _0x1337... 帳戶的 ETH 餘額為何..._ _在區塊 15537393？_
- _在區塊 1920000，合約 0x 中的代幣 0x 餘額是多少？_

如上所述，全節點會需要透過以太坊虛擬機執行以產生此資料，這會使用 CPU 並花費時間。 歸檔節點在磁碟上存取它們，且立即回應。 對一些特定基礎設施來說，這非常有用，例如：

- 服務提供者，如區塊瀏覽器
- 研究者
- 安全分析師
- 去中心化應用程式開發者
- 審計和合規

也有各種免費的 [服務](/developers/docs/nodes-and-clients/nodes-as-a-service/) 能讓您存取歷史資料。 由於運行歸檔節點要求更高，因此這種存取往往受到限制，且只適用於偶爾存取。 如果你的專案需要持續存取歷史資料，你應該考慮運行一個自己的歸檔節點。

## 實作和使用

歸檔節點在此處表示由面向使用者的執行層用戶端提供的資料，因為它們處理狀態資料庫並提供 JSON-RPC 端點。 設定選項、同步時間和資料庫大小可能因用戶端而異。 詳細資訊請參考你的用戶端提供的文檔。

在開始運行您自己的存檔節點前，請先了解不同用戶端之間的差異，特別是各種 [硬體需求](/developers/docs/nodes-and-clients/run-a-node/#requirements)。 多數用戶端沒有最佳化這個部分，且它們的存檔需要超過 12TB 的儲存空間。 與如 Erigon 的實作對比，Erigon 可以在低於 3TB 的空間儲存相同的資料，使其成為運行歸檔節點最有效率的方式。

## 推薦的做法

除了 [運行節點的一般建議](/developers/docs/nodes-and-clients/run-a-node/) 之外，存檔節點可能對硬體和維護有更高的要求。 考量到 Erigon 的 [主要功能](https://github.com/ledgerwatch/erigon#key-features)，最實際的方法是使用 [Erigon](/developers/docs/nodes-and-clients/#erigon) 用戶端實作。

### 硬體

永遠在用戶端文檔中確認滿足了特定模式的硬體要求。
對歸檔節點來說，最大的需求是磁碟空間。 取決於用戶端的不同，可能從 3TB 到 12TB 都有。 雖然硬碟被認為可能是儲存大量資料的更好辦法，但同步資料和不斷地更新鏈頭需要固態硬碟。 [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) 硬碟已足夠，但應具備可靠的品質，至少是 [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences) 等級。 磁碟可以安裝在有足夠插槽的桌機或伺服器中。 這些專用設備適合需要長時間正常運行的節點。 在筆電上運行也是完全可行的，但便攜性將帶來額外的成本。

所有資料都必須放在單一磁碟區中，因此必須合併磁碟，例如：使用 [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) 或 LVM。 或許也值得考慮使用 [ZFS](https://en.wikipedia.org/wiki/ZFS)，因為它支援「寫入時複製」，可確保資料正確寫入磁碟，不會有任何低階錯誤。

為了在防止意外的資料庫損壞方面獲得更高的穩定性和安全性，特別是在專業設定中，如果您的系統支援，請考慮使用 [ECC 記憶體](https://en.wikipedia.org/wiki/ECC_memory)。 RAM 的大小一般建議和全節點一樣，但更多的 RAM 可以加速同步速度。

在初始同步時，在歸檔模式的用戶端會執行自創世塊以來的每個交易。 執行速度大多時候受到 CPU 限制，所以更快的 CPU 對減少初始同步時間有幫助。 在平均水準的消費級電腦上，初始同步可能會長達一個月。

## 延伸閱讀 {#further-reading}

- [以太坊完整節點與存檔節點比較](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode，2022 年 9 月_
- [建立您自己的以太坊存檔節點](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush，2021 年 8 月_
- [如何將 Erigon、Erigon 的 RPC 與 TrueBlocks (抓取與 API) 設定為服務](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson，2022 年 9 月更新_

## 相關主題 {#related-topics}

- [節點和用戶端](/developers/docs/nodes-and-clients/)
- [運行節點](/developers/docs/nodes-and-clients/run-a-node/)
