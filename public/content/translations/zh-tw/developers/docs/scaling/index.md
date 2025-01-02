---
title: 擴張
description: 介紹以太坊社群目前正在開發的多種擴張方案。
lang: zh-tw
sidebarDepth: 3
---

## 擴張方案概覽 {#scaling-overview}

隨著以太坊使用者數量暴增，該區塊鏈已抵達一定程度的處理能力極限。 這大幅提高了使用該網路所需的費用，引發了對「擴展解決方案」的需求。 目前正在研究、試驗和實作多種解決方案，採取不同的方法實現相似的目標。

可擴展性的主要目標是在不犧牲去中心化或安全性的情況下，提高交易速度（更快的最終性）和交易吞吐量（更高的每秒交易數）（更多資訊，請參閱[以太坊願景](/roadmap/vision/)）。 在一層網路以太坊區塊鏈上，高需求導致交易速度下降和難以維繫的[燃料價格](/developers/docs/gas/)。 從速度和吞吐量方面提高網路處理能力，將成為促進以太坊廣泛運用的重要基礎。

雖然速度及吞吐量極為重要，但擴張解決方案在實現這些目標的同時保持去中心化和安全也很重要。 降低節點營運者的進入門檻，對於防止算力的中心化和非安全化演進至關重要。

概念上，我們首先將擴張歸為兩種類型：鏈上擴張和鏈外擴張.

## 基本資訊 {#prerequisites}

你需要全面了解以太坊的所有基礎概念。 擴張解決方案的實作尚未被廣泛接受，因為該技術較少歷經實戰檢驗，並且仍在研究和開發中。

## 鏈上擴張 {#on-chain-scaling}

鏈上擴張需要更改以太坊協定（一層網路[主網](/glossary/#mainnet)）。 長期以來，區塊鏈分片被寄望於擴張以太坊。 分片涉及將區塊鏈分割成單獨的片段（分片），並由部分驗證者進行驗證。 然而，透過二層網路卷軸進行擴張已經取而代之，成爲首要的擴張技術。 為了支援這一點，我們增加了一種新的較便宜的資料形式附加到以太坊區塊，該資料專門為了降低使用者使用卷軸的成本而設計。

### 分片 {#sharding}

分片是分割資料庫的過程。 部分驗證者將負責單獨的分片，而無需追蹤整個以太坊。 分片曾長期居於以太坊[開發藍圖](/roadmap/)之上，並且在合併至權益證明之前一度計劃上線。 然而，[二層網路卷軸](#layer-2-scaling)的快速發展和 [Danksharding](/roadmap/danksharding) 的發明（將卷軸資料的二進位大型物件新增至可由驗證者非常高效地進行驗證的以太坊區塊），致使以太坊社群更傾向於采用以卷軸為中心的擴張，而不是透過分片擴張。 這也會有助於使以太坊的共識邏輯更為簡單。

## 鏈外擴張 {#off-chain-scaling}

鏈外擴張與一層網路主網分開實作 - 它們不需要變更現有的以太坊協定。 一些被稱爲「二層網路」的解決方案，直接從一層網路以太坊共識獲得安全性，例如[樂觀卷軸](/developers/docs/scaling/optimistic-rollups/)、[零知識證明卷軸](/developers/docs/scaling/zk-rollups/)或[狀態通道](/developers/docs/scaling/state-channels/)。 其他解決方案涉及建立獨立於主網獲取安全性的各種形式的新鏈，例如[側鏈](#sidechains)、[Validium](#validium) 或 [Plasma 鏈](#plasma)。 這些解決方案與主網通訊，但以不同方式獲取其安全性以實現不同的目標。

### 二層網路擴張 {#layer-2-scaling}

此類鏈外解決方案從以太坊主網獲取安全性。

二層網路是一種統稱，用於描述那些旨在透過在以太坊主網（一層網路）之外處理交易，同時利用主網强大的去中心化安全模型來幫助擴張應用程式的解決方案。 當網路堵塞時，交易速度會受到影響，這會使某些類型的去中心化應用程式的用戶體驗變差。 而且隨著網路更加堵塞，交易送發者需要用高價燃料費來標取處理優先權，導致燃料費漲價。 這會讓使用以太坊非常昂貴。

多數二層網路解決方案以一個伺服器或伺服器叢集為中心，分別可以稱為節點、驗證者、營運者、排序者、區塊生成者或類似術語。 視具體實作而定，這些二層網路節點可能由使用它們的個人、企業或實體，或由第三方營運者或大型個人群體（類似於主網）運行。 一般而言，交易被提交至這些二層網路節點而非直接提交至一層網路（主網）。 對於某些解決方案，二層網路執行個體接著將交易分批成組並錨定至一層網路，然後再由一層網路提供保護且無法被更改。 詳細實際狀況將依不同二層網路技術和實現而有所差異。

特定二層網路執行個體可能是開放的並由多個應用程式共用，也可能由一個專案部署並專用於支援其應用程式。

#### 為何需要二層網路？ {#why-is-layer-2-needed}

- 增加每秒交易量會極大提升用戶體驗，並減少以太坊主網上的網路擁塞。
- 多筆交易被彙總到單筆交易中傳送至以太坊主網，這為用戶減少了燃料費用，並使以太坊對所有人更加包容且易於存取。
- 任何可擴性更新不應以損害去中心化或安全性為代價 - 二層網路建置于以太坊之上。
- 一些二層網路有特定的應用領域，在大規模處理資產時有很高的效率。

[瞭解更多關於二層網路的資訊](/layer-2/)。

#### 卷軸 {#rollups}

卷軸在一層網路之外執行交易，接著將資料發佈到一層網路並在其上達成共識。 當交易資料被包含到一層網路區塊時，這讓卷軸能夠受到原生以太坊安全性的保障。

依不同安全模式，有兩種類型的卷軸：

- **樂觀卷軸**：假設交易在預設條件下有效，並且僅在遇到挑戰時透過[**詐欺證明**](/glossary/#fraud-proof)執行計算。 [有關樂觀卷軸的更多資訊](/developers/docs/scaling/optimistic-rollups/)。
- **零知識卷軸**：在鏈外執行計算並提交[**有效性證明**](/glossary/#validity-proof)至鏈上。 [有關零知識卷軸的更多資訊](/developers/docs/scaling/zk-rollups/)。

#### 狀態通道 {#channels}

狀態通道使用多簽合約，讓參與者能夠快速、自由地在鏈外交易，然後與主網達成最終性。 這會減少網路擁塞，降低費用並縮短處理延遲。 目前主要有兩種類型的通道：狀態通道和支付通道。

瞭解更多關於[狀態通道](/developers/docs/scaling/state-channels/)的資訊。

### 側鏈 {#sidechains}

側鏈是一個與以太坊相容，並與以太坊主網平行運行的獨立區塊鏈。 側鏈透過雙向跨鏈橋與以太坊相容，並運行自己選定的共識規則及區塊參數。

瞭解更多關於[側鏈](/developers/docs/scaling/sidechains/)的資訊。

### Plasma {#plasma}

Plasma 是一條獨立的區塊鏈，與以太坊主鏈錨定，並使用詐欺證明（像[樂觀卷軸](/developers/docs/scaling/optimistic-rollups/)一樣）來仲裁爭議。

瞭解更多關於 [Plasma](/developers/docs/scaling/plasma/) 的資訊。

### Validium {#validium}

Validium 鏈使用零知識證明卷軸一類的有效性證明，但不是將資料儲存在以太坊一層網路主鏈上。 每個 Validium 鏈能有每秒 10,000 筆交易的處理速度，多個 Validium 鏈能平行運作。

瞭解更多關於 [Validium](/developers/docs/scaling/validium/) 的資訊。

## 為何我們需要那麼多擴張解決方案？ {#why-do-we-need-these}

- 多個解決方案有助於減少網路任一部分的整體擁塞，並防止出現單一故障點。
- 整體大於各部分的總和。 不同解決方案能共存並協調發揮效益，對未來的交易速度和吞吐量產生指數級影響。
- 並非所有解決方案都需要直接使用以太坊共識演算法，替代機制或許能提供其他共識機制無法達成之好處。
- 沒有一種擴張解決方案能夠完全滿足[以太坊願景](/roadmap/vision/)。

## 想透過視覺方式學習？ {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_請注意，此影片中的解釋使用「二層網路」指代所有鏈外擴張解決方案，而我們將其區分為透過一層網路主網共識機制獲取安全性的鏈外解決方案。_

<YouTube id="7pWxCklcNsU" />

## 衍生閱讀 {#further-reading}

- [以卷軸為中心的以太坊開發藍圖](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [以太坊二層網路擴展解決方案最新分析](https://www.l2beat.com/)
- [評估以太坊二層網路擴張解決方案：比較框架](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [卷軸之不完整指南](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [以太坊驅動的零知識證明卷軸：業界佼佼者](https://hackmd.io/@canti/rkUT0BD8K)
- [樂觀卷軸與零知識證明卷軸](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [零知識區塊鏈可擴展性](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [爲什麽說卷軸 + 資料分片是提高可擴展性的唯一可持續解決方案](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [什麽類型的三層網路才有意義？](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [資料可用性或：卷軸如何學會停止擔憂並熱愛以太坊](https://ethereum2077.substack.com/p/data-availability-in-ethereum-rollups)

_知道對你有幫助的社群資源嗎？ 請編輯此頁面並新增資源！_
