---
title: "用戶端多樣化"
description: "對以太坊用戶端多樣性的重要性的高階解釋。"
lang: zh-tw
sidebarDepth: 2
---

以太坊節點的行為是由它所運行的用戶端軟體控制。 有許多生產等級的以太坊用戶端，每個用戶端都由不同團隊以不同程式語言開發和維護。 用戶端是以相同規範建立的，以確保用戶端彼此可以無縫互相通訊，且具有相同的功能及提供相等的使用者體驗。 然而，目前節點間的用戶端分佈仍然不夠均勻，無法充分發揮這種網路強化的潛力。 理想上，使用者大致平均分配到各個用戶端，以為網路帶來儘可能多的用戶端多樣性。

## 先決條件 {#prerequisites}

如果你還不了解節點和用戶端是什麼，請參閱[節點和用戶端](/developers/docs/nodes-and-clients/)。 詞彙表中定義了[執行層](/glossary/#execution-layer)和[共識層](/glossary/#consensus-layer)。

## 為什麼會有多樣化的用戶端呢? {#why-multiple-clients}

存在多種獨立開發和維護的用戶端是有利的，因為用戶端多樣性使網路應對攻擊和錯誤時更有彈性。 多種用戶端是以太坊獨有的優勢 - 其他區塊鏈依賴單一用戶端的正確性。 然而，僅僅擁有多個可用的用戶端是不夠的，它們必須被社群採用，且全部的活躍節點必須相對平均地分佈在它們之間。

## 為什麼用戶端多樣化重要? {#client-diversity-importance}

有許多獨立開發和維護的用戶端對去中心化網路的健康十分重要。 讓我們探索一下其中原因。

### 程式錯誤 {#bugs}

當單一用戶端中存在錯誤，如果該用戶端只代表少數以太坊節點時，對網路的風險較小。 節點在許多用戶端上分佈大致均勻，大多數用戶端遭受共同問題的可能性很小，網路因此更加穩健。

### 抵禦攻擊的韌性 {#resilience}

用戶端多樣性提供了攻擊抗性。 舉例來說，一種[欺騙特定用戶端](https://twitter.com/vdWijden/status/1437712249926393858)到特定鏈分支的攻擊不太可能成功，因為其他用戶端不太可能以同樣的方式被利用，而且正統鏈仍然完好無損。 低用戶端多樣性會增加主導用戶端被駭的風險。 用戶端多樣性已被證明是抵禦網路上惡意攻擊的重要防禦，舉例來說 2016 年的上海阻斷服務攻擊是可能成功的，因為攻擊者能夠欺騙主導用戶端 (Geth) 在每個區塊中執行數千萬次的慢速磁碟讀寫操作。 因為替代用戶端同時在線且沒有同樣的漏洞，以太坊才得以在修復 Geth 的漏洞期間抵禦攻擊並持續運行。

### 權益證明的最終性 {#finality}

超過 33% 的以太坊節點共識用戶端中都存在的錯誤可能會阻止共識層的最終確定，這表示使用者沒辦法相信交易在某個時刻不會被撤銷或更改。 這對建立在以太坊上的許多應用程式是非常大的問題，尤其是去中心化金融。

<Emoji text="🚨" className="me-4" /> 更糟的是，擁有三分之二多數的用戶端如果存在一個嚴重錯誤，可能導致鏈<a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">錯誤地分裂和敲定</a>，造成大量驗證者卡在無效鏈上。 如果這些驗證者想重新加入正確的鏈，它們可能會面臨罰沒或緩慢且昂貴的自願提款和重新啟用流程。 罰沒的規模與有罪節點的數量成正比，其中三分之二的主流節點會被罰沒最高金額（32 以太幣）。

雖然這些情況不太可能發生，以太坊生態系可以透過平均分佈用戶端至各個活躍節點以降低風險。 理想上，不會有共識用戶端超過總節點數的 33%。

### 共同責任 {#responsibility}

擁有主流用戶端也有人力成本問題。 它為小型開發團隊帶來了過多壓力和責任。 越低的用戶端多樣性，會使得開發者維護主流用戶端的負擔更重。 將此責任分散至多個團隊，對以太坊網路上的節點和網路上的開發者的健康都有益。

## 目前的用戶端多樣性 {#current-client-diversity}

### 執行用戶端 {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### 共識用戶端 {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "其他", value: 0.07 }
]}
/>

此圖表可能已過時 — 請前往 [ethernodes.org](https://ethernodes.org) 和 [clientdiversity.org](https://clientdiversity.org) 取得最新資訊。

上方的兩個圓餅圖顯示了執行層和共識層目前用戶端多樣性的快照（撰寫於 2025 年 10 月）。 用戶端多樣性多年來有所改善，執行層中 [Geth](https://geth.ethereum.org/) 的主導地位已見減弱，[Nethermind](https://www.nethermind.io/nethermind-client) 緊隨其後，[Besu](https://besu.hyperledger.org/) 第三，[Erigon](https://github.com/ledgerwatch/erigon) 第四，而其他用戶端則佔不到網路的 3%。 共識層最常用的用戶端——[Lighthouse](https://lighthouse.sigmaprime.io/)——與第二常用的用戶端非常接近。 [Prysm](https://prysmaticlabs.com/#projects) 和 [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) 分別佔約 31% 和約 14%，其他用戶端則很少被使用。

執行層的資料於 2025 年 10 月 26 日從 [supermajority.info](https://supermajority.info/) 取得。 共識用戶端的資料是從 [Michael Sproul](https://github.com/sigp/blockprint) 取得的。 共識層資料較難取得，因為共識層用戶端並不總是有可用於識別它們的明確足跡。 此資料是透過一種分類演算法產生的，該演算法有時會混淆一些小眾用戶端（詳情請見[此處](https://twitter.com/sproulM_/status/1440512518242197516)）。 在上方的圖表中，這些模糊的分類是採用二選一的標籤處理 (例如 Nimbus/Teku)。 儘管如此，很顯然主要網路都在運行 Prysm。 儘管只是快照，但圖中的數值提供了我們目前整體用戶端多樣性狀態的良好認識。

關於共識層用戶端多樣性的最新資料，現已公布在 [clientdiversity.org](https://clientdiversity.org/)。

## 執行層 {#execution-layer}

直到現在，關於用戶端多樣性的討論主要集中在共識層。 然而，執行用戶端 [Geth](https://geth.ethereum.org) 目前約佔所有節點的 85%。 這個比例問題很大，與共識用戶端的原因一樣。 舉例來說，Geth 中影響交易處理或建立執行有效負載的錯誤可能會導致共識用戶端最終確定有問題或錯誤的交易。 因此，如果執行用戶端分佈狀況更均勻，以太坊將更加健康，理想情況下不該有用戶端網路佔比超過 33%。

## 使用小眾用戶端 {#use-minority-client}

解決用戶端多樣性需要的不只是個人使用者選擇小眾用戶端 - 它還需要驗證者池及主要去中心化應用程式和交易所等機構更換用戶端。 然而，所有使用者都可以儘自己的一份力量，以糾正目前的不平衡，並讓所有可用的以太坊軟體使用分佈正常化。 合併後，所有節點營運者都需要運行執行用戶端和共識用戶端。 選擇以下推薦的用戶端組合，可幫助提升用戶端多樣性。

### 執行用戶端 {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### 共識用戶端 {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

技術性使用者可以透過為小眾用戶端撰寫更多教學和文檔，並鼓勵其節點營運的對等節點從主導用戶端遷出，以幫助加速此流程。 關於如何切換至小眾共識用戶端的指南，可在 [clientdiversity.org](https://clientdiversity.org/) 上找到。

## 用戶端多樣性儀表板 {#client-diversity-dashboards}

一些儀表板提供了執行層和共識層上即時的用戶端多樣性統計資料。

**共識層：**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**執行層：**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## 延伸閱讀 {#further-reading}

- [以太坊共識層的用戶端多樣性](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [以太坊合併：執行多數用戶端，後果自負！](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest，2022 年 3 月 24 日_
- [用戶端多樣性的重要性](https://our.status.im/the-importance-of-client-diversity/)
- [以太坊節點服務清單](https://ethereumnodes.com/)
- [用戶端多樣性問題的「五個為什麼」](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [以太坊的多樣性以及如何解決 (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## 相關主題 {#related-topics}

- [執行一個以太坊節點](/run-a-node/)
- [節點和用戶端](/developers/docs/nodes-and-clients/)
