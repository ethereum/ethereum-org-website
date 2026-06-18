---
title: 擴容
description: 介紹以太坊社群目前正在開發的不同擴容選項。
lang: zh-tw
sidebarDepth: 3
---

## 擴容概覽 {#scaling-overview}

隨著使用[以太坊](/)的人數增加，區塊鏈已經達到了一定的容量限制。這推高了使用網路的成本，從而產生了對「擴容解決方案」的需求。目前有多種解決方案正在研究、測試和實作中，它們採用不同的方法來實現相似的目標。

可擴展性的主要目標是在不犧牲去中心化或安全性的情況下，提高交易速度（更快的最終性）和交易吞吐量（每秒更高的交易數量）。在第一層 (L1) 以太坊區塊鏈上，高需求會導致交易變慢和難以承受的[燃料價格](/developers/docs/gas/)。在速度和吞吐量方面增加網路容量，對於以太坊的實質性與大規模採用至關重要。

雖然速度和吞吐量很重要，但實現這些目標的擴容解決方案必須保持去中心化和安全。保持節點營運者的低進入門檻，對於防止運算能力走向中心化和不安全至關重要。

在概念上，我們首先將擴容分為鏈上擴容或鏈下擴容。

## 先決條件 {#prerequisites}

你應該對所有基礎主題有良好的了解。實作擴容解決方案屬於進階內容，因為該技術尚未經過充分的實戰測試，並且仍在持續研究和開發中。

## 鏈上擴容 {#onchain-scaling}

鏈上擴容需要對以太坊協定（第一層 (L1) [主網](/glossary/#mainnet)）進行更改。長期以來，區塊鏈分片一直被期望用來擴容以太坊。這將涉及將區塊鏈分割成離散的部分（分片），由驗證者的子集進行驗證。然而，透過第二層 (L2) 匯總進行擴容已經成為主要的擴容技術。這得益於附加到以太坊區塊的一種新的、更便宜的資料形式，該資料專門設計用於降低使用者使用匯總的成本。

### 分片 {#sharding}

分片是分割資料庫的過程。驗證者的子集將負責各個分片，而不是追蹤整個以太坊。分片長期以來一直在以太坊[路線圖](/roadmap/)上，並且曾經打算在合併為權益證明 (PoS) 之前發布。然而，[第二層 (L2) 匯總](#layer-2-scaling)的快速發展和[丹克分片](/roadmap/danksharding)的發明（將匯總資料的 blob 附加到以太坊區塊中，驗證者可以非常高效地驗證這些資料），使得以太坊社群傾向於以匯總為中心的擴容，而不是透過分片進行擴容。這也將有助於保持以太坊的共識邏輯更加簡單。

## 鏈下擴容 {#offchain-scaling}

鏈下解決方案與第一層 (L1) 主網分開實作——它們不需要對現有的以太坊協定進行任何更改。某些被稱為「第二層 (L2)」的解決方案，其安全性直接源自第一層 (L1) 以太坊共識，例如[樂觀匯總](/developers/docs/scaling/optimistic-rollups/)、[零知識匯總](/developers/docs/scaling/zk-rollups/)或[狀態通道](/developers/docs/scaling/state-channels/)。其他解決方案涉及以各種形式建立新鏈，其安全性獨立於主網，例如[側鏈](#sidechains)、[Validium](#validium) 或[電漿鏈](#plasma)。這些解決方案與主網通訊，但以不同的方式獲取安全性以實現各種目標。

### 第二層 (L2) 擴容 {#layer-2-scaling}

這類鏈下解決方案的安全性源自以太坊主網。

第二層 (L2) 是解決方案的統稱，旨在透過在以太坊主網（第一層 (L1)）之外處理交易來幫助擴展你的應用程式，同時利用主網強大的去中心化安全模型。當網路繁忙時，交易速度會受到影響，導致某些類型的去中心化應用程式 (dapp) 的使用者體驗變差。隨著網路變得更加繁忙，燃料價格會隨著交易發送者競相出價而上漲。這會使得使用以太坊變得非常昂貴。

大多數第二層 (L2) 解決方案都圍繞著一台伺服器或伺服器叢集，其中每一個都可以被稱為節點、驗證者、營運者、定序器、區塊生產者或類似的術語。根據實作方式的不同，這些第二層 (L2) 節點可以由使用它們的個人、企業或實體營運，也可以由第三方營運者營運，或者由一大群個人營運（類似於主網）。一般來說，交易會提交給這些第二層 (L2) 節點，而不是直接提交給第一層 (L1)（主網）。對於某些解決方案，第二層 (L2) 實例隨後會將它們分批分組，然後將它們錨定到第一層 (L1)，之後它們將受到第一層 (L1) 的保護且無法更改。不同第二層 (L2) 技術和實作之間，具體如何完成這些操作的細節差異很大。

特定的第二層 (L2) 實例可能是開放的並由許多應用程式共用，或者可能由一個專案部署並專門用於支援其應用程式。

#### 為什麼需要第二層 (L2)？ {#why-is-layer-2-needed}

- 每秒交易數量的增加極大地改善了使用者體驗，並減少了以太坊主網上的網路擁塞。
- 交易被匯總為提交至以太坊主網的單筆交易，從而降低了使用者的燃料費用，並使以太坊對世界各地的人們更具包容性和可及性。
- 任何可擴展性的更新都不應以犧牲去中心化或安全性為代價——第二層 (L2) 是建立在以太坊之上的。
- 有些特定於應用程式的第二層 (L2) 網路，在處理大規模資產時能帶來其獨特的效率。

[更多關於第二層 (L2) 的資訊](/layer-2/)。

#### 匯總 {#rollups}

匯總在第一層 (L1) 之外執行交易，然後將資料發布到第一層 (L1) 以達成共識。由於交易資料包含在第一層 (L1) 區塊中，這使得匯總能夠受到原生以太坊安全性的保護。

有兩種類型的匯總，具有不同的安全模型：

- **樂觀匯總**：預設假設交易是有效的，並且只有在發生挑戰時，才透過[**欺詐證明**](/glossary/#fraud-proof)執行運算。[更多關於樂觀匯總的資訊](/developers/docs/scaling/optimistic-rollups/)。
- **零知識匯總**：在鏈下執行運算，並向鏈上提交[**有效性證明**](/glossary/#validity-proof)。[更多關於零知識匯總的資訊](/developers/docs/scaling/zk-rollups/)。

#### 狀態通道 {#channels}

狀態通道利用多方簽名合約，使參與者能夠在鏈下快速自由地進行交易，然後與主網結算最終性。這將網路擁塞、費用和延遲降至最低。目前有兩種類型的通道：狀態通道和支付通道。

了解更多關於[狀態通道](/developers/docs/scaling/state-channels/)的資訊。

### 側鏈 {#sidechains}

側鏈是一條獨立的、與 EVM 相容的區塊鏈，與主網平行運行。它們透過雙向橋接器與以太坊相容，並根據其自行選擇的共識規則和區塊參數運行。

了解更多關於[側鏈](/developers/docs/scaling/sidechains/)的資訊。

### 電漿 {#plasma}

電漿鏈是一條獨立的區塊鏈，錨定在以太坊主鏈上，並使用欺詐證明（類似於[樂觀匯總](/developers/docs/scaling/optimistic-rollups/)）來仲裁爭議。

了解更多關於[電漿](/developers/docs/scaling/plasma/)的資訊。

### Validium {#validium}

Validium 鏈使用類似零知識匯總的有效性證明，但資料不儲存在第一層 (L1) 以太坊主鏈上。這可以使每條 Validium 鏈達到每秒 1 萬筆交易，並且可以平行運行多條鏈。

了解更多關於 [Validium](/developers/docs/scaling/validium/) 的資訊。

## 為什麼需要這麼多擴容解決方案？ {#why-do-we-need-these}

- 多種解決方案有助於減少網路上任何單一部分的整體擁塞，並防止單點故障。
- 整體大於部分之和。不同的解決方案可以共存並和諧運作，從而對未來的交易速度和吞吐量產生指數級的影響。
- 並非所有解決方案都需要直接利用以太坊共識演算法，而替代方案可以提供原本難以獲得的好處。

## 比較喜歡視覺學習？ {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_請注意，影片中的解釋使用「第二層 (L2)」一詞來指代所有鏈下擴容解決方案，而我們將「第二層 (L2)」區分為透過第一層 (L1) 主網共識獲取安全性的鏈下解決方案。_

<VideoWatch slug="rollups-scaling-strategy" />

## 進階閱讀 {#further-reading}

- [以匯總為中心的以太坊路線圖](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [以太坊第二層 (L2) 擴容解決方案的最新分析](https://www.l2beat.com/)
- [評估以太坊第二層 (L2) 擴容解決方案：比較框架](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [不完整的匯總指南](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [由以太坊驅動的零知識匯總：世界級的強者](https://hackmd.io/@canti/rkUT0BD8K)
- [樂觀匯總與零知識匯總的比較](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [為什麼匯總 + 資料分片是高可擴展性的唯一永續解決方案](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [什麼樣的第三層 (L3) 才有意義？](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [資料可用性，或者：匯總如何學會停止擔憂並愛上以太坊](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [以太坊匯總實用指南](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_知道有什麼社群資源對你有幫助嗎？編輯此頁面並加入它！_

## 教學：在以太坊上建立可擴展的第二層 (L2) {#tutorials}

- [盡情快取](/developers/tutorials/all-you-can-cache/) _– 如何建立和使用快取合約來降低匯總上的呼叫資料成本。_
- [用於呼叫資料最佳化的簡短 ABI](/developers/tutorials/short-abi/) _– 如何使用較短的 ABI 來降低第二層 (L2) 交易的呼叫資料成本。_