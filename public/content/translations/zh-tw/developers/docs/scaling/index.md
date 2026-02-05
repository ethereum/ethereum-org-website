---
title: 擴容
description: 介紹以太坊社群目前正在開發的多種擴張方案。
lang: zh-tw
sidebarDepth: 3
---

## 擴張總覽 {#scaling-overview}

隨著以太坊使用者數量暴增，該區塊鏈已抵達一定程度的處理能力極限。 這大幅提高了使用該網路所需的費用，引發了對「擴展解決方案」的需求。 目前正在研究、試驗和實作多種解決方案，採取不同的方法實現相似的目標。

可擴展性的主要目標是在不犧牲去中心化或安全性的情況下提高交易速度（更快達到最終性）和交易吞吐量（每秒更高的交易量）。 在第 1 層以太坊區塊鏈上，高需求會導致交易速度變慢，[gas 價格](/developers/docs/gas/) 也高到不可行。 從速度和吞吐量方面提高網路處理能力，將成為促進以太坊廣泛運用的重要基礎。

雖然速度及吞吐量極為重要，但擴張解決方案在實現這些目標的同時保持去中心化和安全也很重要。 降低節點營運者的進入門檻，對於防止算力的中心化和非安全化演進至關重要。

概念上，我們首先將擴張歸為兩種類型：鏈上擴張和鏈下擴張。

## 先決條件 {#prerequisites}

你需要全面了解以太坊的所有基礎概念。 擴張解決方案的實作尚未被廣泛接受，因為該技術較少歷經實戰檢驗，並且仍在研究和開發中。

## 鏈上擴張 {#onchain-scaling}

鏈上擴張需要變更以太坊協定（Layer 1 [主網](/glossary/#mainnet)）。 長期以來，區塊鏈分片被寄望於擴張以太坊。 分片涉及將區塊鏈分割成單獨的片段（分片），並由部分驗證者進行驗證。 然而，透過二層網路卷軸進行擴張已經取而代之，成爲首要的擴張技術。 為了支援這一點，我們增加了一種新的較便宜的資料形式附加到以太坊區塊，該資料專門為了降低使用者使用卷軸的成本而設計。

### 分片 {#sharding}

分片是分割資料庫的過程。 部分驗證者將負責單獨的分片，而無需追蹤整個以太坊。 分片長久以來都是以太坊[開發藍圖](/roadmap/) 的一部分，原先打算在「合併」轉換為權益證明之前推出。 然而，[第 2 層卷軸](#layer-2-scaling) 的快速發展與 [Danksharding](/roadmap/danksharding)（將卷軸資料的 blob 新增到以太坊區塊中，讓驗證者可以極有效率地驗證）的發明，已使以太坊社群傾向採用以卷軸為中心的擴張方案，而非透過分片來擴張。 這也會有助於使以太坊的共識邏輯更為簡單。

## 鏈外擴張 {#offchain-scaling}

鏈下擴張與一層網路主網分開實作 - 它們不需要變更現有的以太坊協定。 有些解決方案，稱為「Layer 2」解決方案，其安全性直接源自 Layer 1 以太坊的共識，例如[樂觀卷軸](/developers/docs/scaling/optimistic-rollups/)、[零知識卷軸](/developers/docs/scaling/zk-rollups/)或[狀態通道](/developers/docs/scaling/state-channels/)。 其他解決方案涉及建立各種形式的新鏈，這些鏈的安全性獨立於主網，例如[側鏈](#sidechains)、[Validium](#validium) 或 [Plasma 鏈](#plasma)。 這些解決方案與主網通訊，但以不同方式獲取其安全性以實現不同的目標。

### Layer 2 擴張 {#layer-2-scaling}

此類鏈下解決方案從以太坊主網獲取安全性。

二層網路是一種統稱，用於描述那些旨在透過在以太坊主網（一層網路）之外處理交易，同時利用主網强大的去中心化安全模型來幫助擴張應用程式的解決方案。 當網路堵塞時，交易速度會受到影響，這會使某些類型的去中心化應用程式的用戶體驗變差。 而且隨著網路更加堵塞，交易送發者需要用高價燃料費來標取處理優先權，導致燃料費漲價。 這會讓使用以太坊非常昂貴。

多數二層網路解決方案以一個伺服器或伺服器叢集為中心，分別可以稱為節點、驗證者、營運者、排序者、區塊生成者或類似術語。 視具體實作而定，這些二層網路節點可能由使用它們的個人、企業或實體，或由第三方營運者或大型個人群體（類似於主網）運行。 一般而言，交易被提交至這些二層網路節點而非直接提交至一層網路（主網）。 對於某些解決方案，二層網路執行個體接著將交易分批成組並錨定至一層網路，然後再由一層網路提供保護且無法被更改。 詳細實際狀況將依不同二層網路技術和實現而有所差異。

特定二層網路執行個體可能是開放的並由多個應用程式共用，也可能由一個專案部署並專用於支援其應用程式。

#### 為何需要二層網路？ {#why-is-layer-2-needed}

- 增加每秒交易量會極大提升用戶體驗，並減少以太坊主網上的網路擁塞。
- 多筆交易被彙總到單筆交易中傳送至以太坊主網，這為用戶減少了燃料費用，並使以太坊對所有人更加包容且易於存取。
- 任何可擴性更新不應以損害去中心化或安全性為代價 - 二層網路建置于以太坊之上。
- 一些二層網路有特定的應用領域，在大規模處理資產時有很高的效率。

[更多關於 Layer 2 的資訊](/layer-2/)。

#### 卷軸 {#rollups}

卷軸在一層網路之外執行交易，接著將資料發佈到一層網路並在其上達成共識。 當交易資料被包含至Layer 1區塊中, 此使卷軸能夠被以太坊原生安全系統所保障.

依不同安全模式，有兩種類型的卷軸：

- **樂觀卷軸**：預設假設交易有效，只在有人提出挑戰時，才會透過 [**詐欺證明**](/glossary/#fraud-proof) 執行運算。 [更多關於樂觀卷軸的資訊](/developers/docs/scaling/optimistic-rollups/)。
- **零知識卷軸**：在鏈下執行運算，並向鏈上提交 [**有效性證明**](/glossary/#validity-proof)。 [更多關於零知識卷軸的資訊](/developers/docs/scaling/zk-rollups/)。

#### 狀態通道 {#channels}

狀態通道使用多簽合約，讓參與者能夠快速、自由地在鏈下交易，然後與主網達成最終性。 這會減少網路擁塞，降低費用並縮短處理延遲。 目前主要有兩種類型的通道：狀態通道和支付通道。

深入了解[狀態通道](/developers/docs/scaling/state-channels/)。

### 側鏈 {#sidechains}

側鏈是一個與以太坊相容，並與以太坊主網平行運行的獨立區塊鏈。 側鏈透過雙向跨鏈橋與以太坊相容，並運行自己選定的共識規則及區塊參數。

深入了解[側鏈](/developers/docs/scaling/sidechains/)。

### Plasma {#plasma}

Plasma 鏈是一條獨立的區塊鏈，錨定於以太坊主鏈，並使用詐欺證明（類似[樂觀卷軸](/developers/docs/scaling/optimistic-rollups/)）來仲裁爭議。

深入了解 [Plasma](/developers/docs/scaling/plasma/)。

### Validium {#validium}

Validium 鏈使用零知識證明卷軸一類的有效性證明，但不是將資料儲存在以太坊一層網路主鏈上。 每個 Validium 鏈能有每秒 10,000 筆交易的處理速度，多個 Validium 鏈能平行運作。

深入了解 [Validium](/developers/docs/scaling/validium/)。

## 為何我們需要那麼多擴張解決方案？ {#why-do-we-need-these}

- 多個解決方案有助於減少網路任一部分的整體擁塞，並防止出現單一故障點。
- 整體大於各部分的總和。 不同解決方案能共存並協調發揮效益，對未來的交易速度和吞吐量產生指數級影響。
- 並非所有解決方案都需要直接使用以太坊共識演算法，替代機制或許能提供其他共識機制無法達成之好處。

## 想透過視覺方式學習？ {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_請注意，影片中的解說將 "Layer 2" 一詞用於指稱所有鏈外擴張解決方案，但我們則將 "Layer 2" 區分為透過 Layer 1 主網共識取得安全性的鏈外解決方案。_

<YouTube id="7pWxCklcNsU" />

## 延伸閱讀 {#further-reading}

- [以卷軸為中心的以太坊開發藍圖](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [關於以太坊 Layer 2 擴張解決方案的最新分析](https://www.l2beat.com/)
- [評估以太坊 Layer 2 擴張解決方案：一個比較框架](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [卷軸不完全指南](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [由以太坊驅動的 ZK 卷軸：世界頂尖](https://hackmd.io/@canti/rkUT0BD8K)
- [樂觀卷軸與 ZK 卷軸之比較](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [為何卷軸 + 資料分片是實現高可擴展性的唯一可持續解決方案](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [哪種 Layer 3 才有意義？](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [資料可得性，或：卷軸如何學會停止擔憂並愛上以太坊](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [以太坊卷軸實用指南](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_
