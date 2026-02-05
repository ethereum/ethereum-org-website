---
title: PeerDAS
description: 作為 Fusaka 以太坊協議升級的一部分，了解 PeerDAS
lang: zh-tw
---

# 點對點資料可用性取樣（Peer Data Availability Sampling, PeerDAS）{#peer-das}

自從 [透過 EIP-4844 引入 blob 交易](/roadmap/danksharding/) 以來，以太坊協議正在進行其最重要的擴張升級。 作為 [Fusaka 升級](/roadmap/fusaka/) 的一部分，PeerDAS 引入了一種處理 blob 資料的新方法，為 Layer 2 的 **[資料可用性 (DA)](/developers/docs/data-availability/)** 容量帶來了約一個數量級的增長。

[關於 blob 擴張開發藍圖的更多資訊](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## 可擴展性 {#scalability}

以太坊的願景是成為一個中立、安全、去中心化的平台，供世界上每個人使用。 隨著網路用量增長，需要在網路的擴張性、安全性和去中心化這三難困境之間取得平衡。 如果以太坊僅在其當前設計中增加網路處理的資料量，則可能會壓垮 [以太坊賴以實現去中心化的節點](/developers/docs/nodes-and-clients/)。 可擴展性需要嚴謹的機制設計，以盡量減少權衡取捨。

實現此目標的策略之一是允許多樣化的 Layer 2 擴張解決方案生態系統，而不是在 [Layer 1 (L1)](/glossary/#layer-1) 主網上處理所有交易。 [Layer 2 (L2)](/glossary/#layer-2) 或 [Rollup](/glossary#rollups) 在其各自的獨立鏈上處理交易，並使用以太坊進行驗證和保障安全。 僅發布對安全至關重要的承諾並壓縮負載，讓 L2 更有效地使用以太坊的資料可用性容量。 反過來，L1 承載的資料更少，且不影響安全保證，而 L2 則能以更低的 Gas 成本吸引更多使用者。 最初，L2 將資料作為 `calldata` 發布在普通交易中，這會與 L1 交易爭奪 Gas，對於大量資料的可用性來說並不實用。

## Proto-Danksharding {#proto-danksharding}

擴張 L2 的第一個重要步驟是 Dencun 升級，它引入了 [原型 Danksharding](/roadmap/danksharding/) (EIP-4844)。 這次升級為 Rollup 創造了一種新的專用資料類型，稱為 blob。 [Blob](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs) (二進位大型物件) 是任意資料的短暫片段，不需要 EVM 執行，節點只會儲存有限的時間。 這種更高效的處理方式讓 L2 能夠向以太坊發布更多資料，並進一步擴張。

儘管使用 blob 對於擴張已經有很大的好處，但這只是最終目標的一部分。 在目前的協議中，網路中的每個節點仍然需要下載每個 blob。 瓶頸在於單一節點所需的頻寬，隨著 blob 數量的增加，需要下載的資料量也直接增加。

以太坊在去中心化方面毫不妥協，而頻寬是最敏感的調節因素之一。 即使任何負擔得起的人都能廣泛使用強大的計算能力，但在已開發國家的都會區 (例如[德國](https://www.speedtest.net/global-index/germany)、[比利時](https://www.speedtest.net/global-index/belgium)、[澳洲](https://www.speedtest.net/global-index/australia)或[美國](https://www.speedtest.net/global-index/united-states))，[上傳頻寬的限制](https://www.speedtest.net/global-index)若未經仔細調整，可能會導致節點只能在資料中心運行。

隨著 blob 增加，節點營運商對頻寬和磁碟空間的要求也越來越高。 blob 的大小和數量受到這些限制。 每個 blob 最多可承載 128kb 的資料，平均每個區塊有 6 個 blob。 這只是邁向未來更有效利用 blob 設計的第一步。

## 資料可用性抽樣 {#das}

資料可用性是確保所有獨立驗證鏈所需的資料對所有網路參與者都可存取。 它確保資料已完全發布，並可用於無信任地驗證鏈的新狀態或傳入的交易。

以太坊 blob 提供了強大的資料可用性保證，確保了 L2 的安全性。 為此，以太坊節點需要完整下載並儲存 blob。 但是，如果我們能更有效地在網路中分發 blob 並避免此限制呢？

儲存資料並確保其可用性的另一種方法是 **資料可用性抽樣 (DAS)**。 DAS 引入了去中心化的分工，而不是讓每台運行以太坊的電腦都完整儲存每個 blob。 它透過將較小、可管理的任務分發到整個節點網路中，來分擔處理資料的負擔。 Blob 被分成多個片段，每個節點使用一個在所有節點間均勻隨機分佈的機制，只下載幾個片段。

這帶來了一個新問題——證明資料的可用性和完整性。 當個別節點只持有小片段時，網路如何保證資料可用且全部正確？ 惡意節點可能會提供假資料，輕易地破壞強大的資料可用性保證！ 這就是密碼學發揮作用的地方。

為確保資料的完整性，EIP-4844 已經實作了 KZG 承諾。 這些是在新 blob 新增至網路時建立的密碼學證明。 每個區塊中都包含一個小證明，節點可以驗證收到的 blob 是否與該區塊的 KZG 承諾相對應。

DAS 是建立在此基礎上的一個機制，確保資料既正確又可用。 抽樣是一個過程，節點只查詢資料的一小部分，並根據承諾進行驗證。 KZG 是一種多項式承諾方案，這意味著多項式曲線上任何單一點都可以被驗證。 透過僅檢查多項式上的幾個點，進行抽樣的用戶端就可以對資料的可用性有很高的機率保證。

## 點對點資料可用性取樣（Peer Data Availability Sampling, PeerDAS）{#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) 是在以太坊中實作 DAS 機制的具體提案，這可能是自合併以來最大的一次升級。 PeerDAS 的設計旨在擴展 blob 資料，將其分成列，並將子集分發給節點。

以太坊借用了一些巧妙的數學方法來實現這一點：它將 Reed-Solomon 式的糾刪碼應用於 blob 資料。 Blob 資料表示為一個多項式，其係數對資料進行編碼，然後在額外的點上評估該多項式以建立擴展的 blob，從而使評估數量加倍。 這種增加的冗餘性使得糾刪恢復成為可能：即使某些評估缺失，只要包括擴展片段在內的總資料至少有一半可用，原始的 blob 就可以被重構。

![擴展多項式](./polynomial.png)

實際上，這個多項式有數千個係數。 KZG 承諾是幾個位元組的值，類似於哈希，所有節點都知道。 每個持有足夠資料點的節點都可以 [有效地重構完整的 blob 資料集](https://arxiv.org/abs/2207.11079)。

> 有趣的是：DVD 也使用了相同的編碼技術。 如果你刮傷了 DVD，播放器仍然能夠讀取它，這要歸功於 Reed-Solomon 編碼，它會補上多項式中缺失的部分。

從歷史上看，區塊鏈中的資料，無論是區塊還是 blob，都會廣播給所有節點。 有了 PeerDAS 的分割和抽樣方法，就不再需要向所有人廣播所有內容。 Fusaka 之後，共識層網路被組織成 gossip 主題/子網：blob 列被分配給特定的子網，每個節點訂閱預定的子集並只保管這些片段。

使用 PeerDAS，擴展的 blob 資料被分成 128 個稱為列的片段。 資料透過專用的 gossip 協議，在節點訂閱的特定子網上分發給這些節點。 網路上的每個常規節點至少參與 8 個隨機選擇的列子網。 僅從 128 個子網中的 8 個接收資料，意味著這個預設節點只接收到所有資料的 1/16，但由於資料經過擴展，這相當於原始資料的 1/8。

這使得理論上的擴張極限，可以達到當前「每個人都下載所有東西」模式的 8 倍。 由於節點訂閱了提供 blob 列的不同的隨機子網，它們均勻分佈的機率非常高，因此每份資料都存在於網路的某個地方。 運行驗證程式的節點，每運行一個驗證程式就需要訂閱更多的子網。

> 每個節點都有一個獨特的隨機生成 ID，通常作為其連線的公開身份。 在 PeerDAS 中，這個數字被用來決定它必須訂閱的隨機子網集，從而實現所有 blob 資料的均勻隨機分佈。

一旦一個節點成功重構原始資料，它就會將恢復的列重新分發回網路，主動修復任何資料缺口並增強整體系統的彈性。 連線到總餘額 ≥4096 ETH 的驗證程式的節點必須是超級節點，因此必須訂閱所有資料列子網並保管所有列。 這些超級節點將持續修復資料缺口。 該協議的機率性自我修復特性允許強大的可用性保證，同時不限制僅持有部分資料的家庭營運商。

![訂閱透過子網分發的列的節點](./subnets.png)

由於上述的抽樣機制，任何只持有 blob 資料小子集的節點都可以確認資料的可用性。 這種可用性是強制執行的：驗證程式必須遵循新的分叉選擇規則，這意味著他們只有在驗證了資料的可用性之後才會接受並投票給區塊。

對使用者（尤其是 L2 使用者）的直接影響是費用降低。 隨著 Rollup 資料空間增加 8 倍，使用者在其鏈上的操作成本會隨著時間推移而變得更便宜。 但在 Fusaka 之後，降低費用需要時間，並取決於 BPO。

## 僅限 Blob 參數 (BPO) {#bpo}

理論上，網路將能夠處理多 8 倍的 blob，但是增加 blob 是一個需要逐步進行適當測試和安全執行的變更。 測試網為在主網上部署這些功能提供了足夠的信心，但在啟用顯著更高數量的 blob 之前，我們需要確保 p2p 網路的穩定性。

為了在不壓垮網路的情況下逐步提高每個區塊的目標 blob 數量，Fusaka 引入了 **[僅限 Blob 參數 (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)** 分叉。 與需要廣泛生態系統協調、協議和軟體更新的常規分叉不同，[BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) 是預先編程的升級，隨著時間推移無需干預即可增加 blob 的最大數量。

這意味著在 Fusaka 啟動和 PeerDAS 上線後，blob 的數量將保持不變。 blob 的數量將每隔幾週開始翻倍，直到達到最大值 48，同時開發者會監控以確保該機制按預期工作，並且不會對運行網路的節點產生不利影響。

## 未來方向 {#future-directions}

PeerDAS 只是邁向 [FullDAS (或稱 Danksharding) 這個更大擴張願景](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529) 的一步。 PeerDAS 對每個 blob 單獨使用一維糾刪碼，而完整的 Danksharding 將在整個 blob 資料矩陣上使用更完整的二維糾刪碼方案。 在二維上擴展資料可產生更強的冗餘屬性，以及更高效的重構和驗證。 實現 FullDAS 將需要大量的網路和協議優化，以及額外的研究。

## 延伸閱讀 {#further-reading}

- [PeerDAS：由 Francesco D'Amato 講解的對等資料可用性抽樣](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [以太坊 PeerDAS 的文件](https://eprint.iacr.org/2024/1362.pdf)
- [不使用 AGM 證明 PeerDAS 的安全性](https://eprint.iacr.org/2025/1683)
- [Vitalik 談 PeerDAS、其影響以及 Fusaka 測試](https://x.com/VitalikButerin/status/1970983281090085200)