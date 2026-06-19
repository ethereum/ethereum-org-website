---
title: "客戶端多樣性"
description: "關於以太坊客戶端多樣性重要性的高階說明。"
lang: zh-tw
sidebarDepth: 2
---

[以太坊](/)節點的行為由其執行的客戶端軟體控制。有幾個生產級別的以太坊客戶端，每一個都由不同的團隊使用不同的語言開發和維護。這些客戶端是根據共同的規範構建的，確保客戶端之間能夠無縫通訊，具有相同的功能，並提供同等的使用者體驗。然而，目前客戶端在節點間的分佈還不夠平均，無法充分發揮這種網路強化的潛力。理想情況下，使用者應大致平均地分佈在各種客戶端中，為網路帶來盡可能多的客戶端多樣性。

## 先決條件 {#prerequisites}

如果您還不了解什麼是節點和客戶端，請查看[節點和客戶端](/developers/docs/nodes-and-clients/)。[執行層](/glossary/#execution-layer)和[共識層](/glossary/#consensus-layer)在術語表中皆有定義。

## 為什麼有多個客戶端？ {#why-multiple-clients}

存在多個獨立開發和維護的客戶端，是因為客戶端多樣性使網路對攻擊和錯誤更具彈性。多個客戶端是以太坊獨有的優勢——其他區塊鏈依賴於單一客戶端的絕對可靠性。然而，僅僅有多個可用的客戶端是不夠的，它們必須被社群採用，並且活躍節點總數必須相對均勻地分佈在這些客戶端中。

## 為什麼客戶端多樣性很重要？ {#client-diversity-importance}

擁有多個獨立開發和維護的客戶端對於去中心化網路的健康至關重要。讓我們探討其中的原因。

### 錯誤 {#bugs}

當單一客戶端僅佔以太坊節點的少數時，該客戶端中的錯誤對網路造成的風險較小。由於節點大致均勻地分佈在許多客戶端中，大多數客戶端遭遇共同問題的可能性很小，因此網路更加穩健。

### 抵禦攻擊的彈性 {#resilience}

客戶端多樣性也提供了抵禦攻擊的彈性。例如，[欺騙特定客戶端](https://twitter.com/vdWijden/status/1437712249926393858)進入鏈的特定分支的攻擊不太可能成功，因為其他客戶端不太可能以相同的方式被利用，且規範鏈仍保持未受損狀態。低客戶端多樣性會增加主導客戶端遭駭客攻擊的相關風險。客戶端多樣性已被證明是防禦網路惡意攻擊的重要手段，例如 2016 年的上海阻斷服務攻擊之所以可能發生，是因為攻擊者能夠欺騙主導客戶端（Go 以太坊 (Geth)）在每個區塊中執行數萬次緩慢的磁碟 I/O 操作。由於沒有此漏洞的替代客戶端也在線上，以太坊能夠抵禦攻擊並繼續運作，同時修復了 Geth 中的漏洞。

### 權益證明 (PoS) 最終性 {#finality}

如果佔以太坊節點 33% 以上的共識客戶端出現錯誤，可能會阻止共識層達成最終性，這意味著使用者無法相信交易在某個時間點不會被還原或更改。這對於許多建立在以太坊之上的應用程式來說將是非常成問題的，特別是去中心化金融 (DeFi)。

<Emoji text="🚨" className="me-4" /> 更糟的是，如果佔絕對多數（三分之二）的客戶端出現嚴重錯誤，可能會導致鏈<a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">錯誤地分叉並達成最終性</a>，導致大量驗證者卡在無效鏈上。如果他們想重新加入正確的鏈，這些驗證者將面臨罰沒，或是緩慢且昂貴的自願提款和重新啟動。罰沒的幅度與有過失的節點數量成正比，佔絕對多數（三分之二）的節點將被最大程度地罰沒（32 ETH）。

雖然這些是不太可能發生的情況，但以太坊生態系統可以透過平均活躍節點中的客戶端分佈來減輕其風險。理想情況下，任何共識客戶端都不應達到總節點數的 33% 份額。

### 共同責任 {#responsibility}

擁有多數客戶端也會帶來人力成本。這會給一個小型開發團隊帶來過度的壓力和責任。客戶端多樣性越低，維護多數客戶端的開發人員的責任負擔就越大。將這種責任分散到多個團隊中，對以太坊節點網路和人員網路的健康都有好處。

## 目前的客戶端多樣性 {#current-client-diversity}

### 執行客戶端 {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### 共識客戶端 {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Other", value: 0.07 }
]}
/>

此圖表可能已過時 — 請前往 [ethernodes.org](https://ethernodes.org) 和 [clientdiversity.org](https://clientdiversity.org) 獲取最新資訊。

上面的兩個圓餅圖顯示了執行層和共識層目前客戶端多樣性的快照（撰寫本文時為 2025 年 10 月）。多年來，客戶端多樣性有所改善，執行層中 [Go 以太坊 (Geth)](https://geth.ethereum.org/) 的主導地位有所下降，[奈瑟邁](https://www.nethermind.io/nethermind-client) 緊隨其後位居第二，[貝蘇](https://besu.hyperledger.org/) 第三，[艾瑞貢](https://github.com/ledgerwatch/erigon) 第四，其他客戶端佔網路的比例不到 3%。共識層上最常用的客戶端——[萊特豪斯](https://lighthouse.sigmaprime.io/)——與第二常用的客戶端非常接近。[普萊斯姆](https://prysmaticlabs.com/#projects)和[泰庫](https://consensys.net/knowledge-base/ethereum-2/teku/)分別佔約 31% 和約 14%，其他客戶端則很少使用。

執行層資料於 2025 年 10 月 26 日從 [supermajority.info](https://supermajority.info/) 取得。共識客戶端資料從 [Michael Sproul](https://github.com/sigp/blockprint) 取得。共識客戶端資料較難取得，因為共識層客戶端並不總是有明確的痕跡可用於識別它們。該資料是使用分類演算法產生的，有時會混淆一些少數客戶端（詳情請見[此處](https://twitter.com/sproulM_/status/1440512518242197516)）。在上面的圖表中，這些模稜兩可的分類使用「非此即彼」的標籤處理（例如寧布斯/泰庫）。儘管如此，很明顯網路的大多數都在執行普萊斯姆。儘管只是快照，圖表中的數值仍能讓人對目前客戶端多樣性的狀態有一個良好的整體了解。

共識層的最新客戶端多樣性資料現在可在 [clientdiversity.org](https://clientdiversity.org/) 取得。

## 執行層 {#execution-layer}

到目前為止，關於客戶端多樣性的討論主要集中在共識層。然而，執行客戶端 [Go 以太坊 (Geth)](https://geth.ethereum.org) 目前佔所有節點的 85% 左右。這個比例是有問題的，原因與共識客戶端相同。例如，Geth 中影響交易處理或建構執行負載的錯誤，可能會導致共識客戶端對有問題或有錯誤的交易達成最終性。因此，如果執行客戶端的分佈更均勻，以太坊會更健康，理想情況下，沒有任何客戶端佔網路的比例超過 33%。

## 使用少數客戶端 {#use-minority-client}

解決客戶端多樣性問題不僅需要個別使用者選擇少數客戶端，還需要驗證者池以及主要去中心化應用程式 (dapp) 和交易所等機構也切換客戶端。然而，所有使用者都可以盡一份心力，糾正目前的不平衡狀態，並使所有可用以太坊軟體的使用常態化。在合併之後，所有節點營運者都將被要求執行一個執行客戶端和一個共識客戶端。選擇以下建議的客戶端組合將有助於增加客戶端多樣性。

### 執行客戶端 {#execution-clients}

- [貝蘇](https://www.hyperledger.org/use/besu)
- [奈瑟邁](https://downloads.nethermind.io/)
- [艾瑞貢](https://github.com/ledgerwatch/erigon)
- [Go 以太坊 (Geth)](https://geth.ethereum.org/)
- [瑞斯](https://reth.rs/)

### 共識客戶端 {#consensus-clients}

- [寧布斯](https://nimbus.team/)
- [萊特豪斯](https://github.com/sigp/lighthouse)
- [泰庫](https://consensys.io/teku)
- [洛德斯塔](https://github.com/ChainSafe/lodestar)
- [普萊斯姆](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

技術使用者可以透過為少數客戶端撰寫更多教學和文件，並鼓勵其營運節點的同儕從主導客戶端遷移，來幫助加速這個過程。切換到少數共識客戶端的指南可在 [clientdiversity.org](https://clientdiversity.org/) 上取得。

## 客戶端多樣性儀表板 {#client-diversity-dashboards}

有幾個儀表板提供執行層和共識層的即時客戶端多樣性統計資料。

**共識層：**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**執行層：**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## 進一步閱讀 {#further-reading}

- [以太坊共識層的客戶端多樣性](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [以太坊合併：執行多數客戶端風險自負！](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest，2022 年 3 月 24 日_
- [客戶端多樣性的重要性](https://our.status.im/the-importance-of-client-diversity/)
- [以太坊節點服務清單](https://ethereumnodes.com/)
- [客戶端多樣性問題的「五個為什麼」](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [以太坊多樣性及其解決方案 (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## 相關主題 {#related-topics}

- [執行以太坊節點](/run-a-node/)
- [節點和客戶端](/developers/docs/nodes-and-clients/)