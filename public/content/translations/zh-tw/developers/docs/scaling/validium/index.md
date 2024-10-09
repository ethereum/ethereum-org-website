---
title: Validium
description: 介紹目前作為擴張解決方案供以太坊社群使用的 Validium。
lang: zh-tw
sidebarDepth: 3
---

Validium 是一種[擴張解決方案](/developers/docs/scaling/)，使用如[零知識卷軸](/developers/docs/scaling/zk-rollups/)之類的有效性證明來強制執行交易的完整性，但它不在以太坊主網上儲存交易資料。 雖然鏈外資料可用性會帶來取捨，但卻能大幅提升可擴展性（Validium [每秒](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)可處理 [~9,000 個交易，甚至更多](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)）。

## 前置要求 {#prerequisites}

你應該已經在我們的頁面上閲讀並理解有關[以太坊擴張](/developers/docs/scaling/)和[二層網路](/layer-2)的内容。

## 什麼是 Validium？ {#what-is-validium}

Validium 是使用鏈外資料可用性和計算的擴張解決方案，旨在透過在以太坊主網外處理交易來提高吞吐量。 與零知識卷軸 (ZK-rollup) 一樣，Validium 發佈[零知識證明](/glossary/#zk-proof)以在以太坊上驗證鏈外交易。 這能夠防止無效的狀態轉換並增强 Validium 鏈的安全保證。

這些「有效性證明」可以是 ZK-SNARK（零知識簡潔非互動式知識論證）或 ZK-STARK（零知識可擴展透明知識論證）兩種形式。 更多有關[零知識證明](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)的資訊。

屬於 Validium 使用者的資金由以太坊上的智慧型合約控制。 Validium 與零知識卷軸很像，能夠提供幾乎即時的提款；在主網上驗證提款請求的有效性證明后，使用者可以透過提供[默克爾證明](/developers/tutorials/merkle-proofs-for-offline-data-integrity/)來提取資金。 默克爾證明驗證使用者的提款交易是否包含在經過驗證的交易批次中，這讓鏈上合約可以處理提款。

然而，Validium 使用者的資金可能會被凍結，並受到提款限制。 如果 Validium 鏈上資料可用性管理器拒絕向使用者提供鏈外狀態資料，就會發生這種情況。 如果無法存取交易資料，使用者將無法計算證明資金所有權和執行提款所需的默克爾證明。

這是 Validium 和零知識卷軸之間的主要區別，即它們在資料可用性範圍上的位置不同。 兩種解決方案處理資料存儲的方式不同，這會影響安全性和去信任。

## Validium 如何與以太坊互動？ {#how-do-validiums-interact-with-ethereum}

Validium 是建置在現有以太坊鏈上的擴張協定。 儘管它在鏈外執行交易，但 Validium 鏈由部署在主網上的一系列智慧型合約管理，包括：

1. **驗證者合約**：驗證者合約驗證 Validium 營運者在進行狀態更新時所提交證明的有效性。 該合約需要證明鏈外交易正確性的有效性證明，和驗證鏈外交易資料存在的資料可用性證明。

2. **主合約**：主合約儲存區塊生產者提交的狀態承諾（默克爾根），並在有效性證明完成鏈上驗證后更新 Validium 的狀態。 該合約還處理 Validium 鏈上的存款和提款。

Validium 還依賴於以太坊主鏈來獲得：

### 結算 {#settlement}

在 Validium 上執行的交易無法完全確認，直至父母鏈驗證其有效性。 所有在 Validium 上進行的業務最終都必須在主網上結算。 以太坊區塊鏈還為 Validium 使用者提供了「結算保證」，這意味鏈外交易一旦提交到鏈上，就無法逆轉或改變。

### 安全性 {#security}

充當結算層的以太坊也保證 Validium 上狀態轉換的有效性。 在 Validium 鏈上執行的鏈外交易透過以太坊基礎層上的智慧型合約進行驗證。

如果鏈上驗證者合約認爲證明無效，交易就會被拒絕。 這意味著營運者在更新 Validium 的狀態之前，必須滿足以太坊協定強制執行的有效性條件。

## Validium 如何運作？ {#how-does-validium-work}

### 交易 {#transactions}

使用者向營運者提交交易 - 營運者是負責在 Validium 鏈上執行交易的節點。 一些 Validium 可能使用單個營運者來執行鏈，或依賴[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos/) 機制來輪換營運者。

營運者將交易彙總到一個批次中，並將其發送到證明電路進行證明。 證明電路接受交易批次（以及其他有關資料）作爲輸入，並輸出驗證作業正確執行的有效性證明。

### 狀態承諾 {#state-commitments}

Validium 的狀態被雜處理湊為默克爾樹，其根儲存在以太坊的主合約中。 默克爾根，又稱爲狀態根，充當對 Validium 上當前帳戶狀態和餘額的加密承諾。

爲了執行狀態更新，營運者必須（在執行交易后）計算一個新的狀態根並將其提交給鏈上合約。 如果有效性證明得到驗證，提議的狀態就會被接受，Validium 將切換到新的狀態根。

### 存款和提款 {#deposits-and-withdrawals}

使用者透過在鏈上合約中存入以太幣（或任何與 ERC 兼容的代幣），將資金從以太坊轉移到 Validium。 該合約將存款事件轉發到鏈外 Validium，並向使用者在 Validium 上的地址存入與其存款相同的金額。 營運者還會將該存款交易包含在新批次中。

爲了將資金轉移回主網，Validium 使用者需要發起提款交易並提交到營運者，營運者將驗證提款請求並將其包含在批次中。 使用者在 Validium 鏈上的資產也會被銷毀，才能退出系統。 一旦與該批次相關的有效性證明得到驗證，使用者就可以呼叫主合約來提取剩餘的初始存款。

作爲一種抗審查機制，Validium 協定允許使用者直接從 Validium 合約提款，而無需透過營運者。 在這種情況下，使用者需要向驗證者合約提供默克爾證明，展示帳戶包含在狀態根内。 如果證明被接受，使用者就能夠呼叫主合約的提款函式，從 Validium 中提取其資金。

### 批次提交 {#batch-submission}

在執行一批交易后，營運者向驗證者合約提交相關的有效性證明，並向主合約提議新的狀態根。 如果證明有效，主合約就會更新 Validium 的狀態並最終確定批次中交易的結果。

與零知識卷軸不同，Validium 上的區塊生產者不需要發佈交易批次的交易資料（僅發佈區塊頭）。 這使 Validium 成爲一個純鏈外擴張協定，而不是在以太坊主鏈上發佈狀態資料（如 `calldata`）的「混合」擴張協定（即[二層網路](/layer-2/)）。

### 資料可用性 {#data-availability}

如前所述，Validium 利用一個鏈外資料可用性模型，營運者會將所有交易資料儲存在其中，而不是以太坊主網。 Validium 的鏈上資料足跡較低，這提升了可擴展性（吞吐量不受以太坊的資料處理能力限制），並降低了使用者費用（發佈 `calldata` 的成本降低）。

然而，鏈外資料可用性導致了一個問題：建立或驗證默克爾證明所需的資料可能不可用。 這意味著，如果營運者采取惡意行爲，使用者就可能無法從鏈上合約中提取資金。

各種 Validium 解決方案試圖透過將狀態資料的儲存去中心化來解決此問題。 這涉及迫使區塊生產者將底層資料發送至「資料可用性管理者」，由他們負責儲存鏈外資料並在使用者請求時提供給使用者。

Validium 中的資料可用性管理者透過簽署每個 Validium 批次，來證明鏈外交易資料的可用性。 這些簽名構成了一種「可用性證明」，鏈上驗證者合約會在批准狀態更新之前進行檢查。

Validium 的資料可用性管理方法不同。 一些依賴可信方儲存狀態資料，另一些則使用隨機指定的驗證者完成此工作。

#### 資料可用性委員會 (DAC) {#data-availability-committee}

爲了保證鏈外資料的可用性，一些 Validium 解決方案指定了一組可信實體（統稱爲資料可用性委員會 (DAC)）來儲存狀態複本並提供資料可用性證明。 由於成員較少，資料可用性委員會更容易實作，並且需要的協調更少。

然而，使用者必須信任資料可用性委員會，以便在需要時獲得資料（例如，用於產生默克爾證明）。 資料可用性委員會的成員有可能[被惡意行爲者損害](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view)，然後後者會扣留鏈外資料。

[更多有關 Validium 中資料可用性委員會的資訊](https://medium.com/starkware/data-availability-e5564c416424)。

#### 有保證金的資料可用性 {#bonded-data-availability}

其他 Validium 需要負責儲存離綫資料的參與者，在承擔其角色之前在智慧型合約中質押（即鎖定）代幣。 該質押充當一種「保證金」，保證資料可用性管理者之間誠實行事並減少信任假設。 如果這些參與者未能證明資料可用性，該保證金就會被罰沒。

在有保證金的資料可用性方案中，任何人在提供需要的質押后，都可以被指定保存鏈外資料。 這擴展了合格資料可用性管理者池，減少了影響資料可用性委員會 (DAC) 的中心化。 更重要的是，這種方法依賴於加密經濟激勵措施來防止惡意活動，這相比指定可信方在 Validium 中保護離綫資料要安全很多。

[更多有關 Validium 中有保證金的資料可用性的資訊](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)。

## Volition 和 Validium {#volitions-and-validium}

Validium 提供許多好處，但也會有取捨（最明顯的就是資料可用性）。 但是，與許多擴張解決方案一樣，Validium 適合特定的用例 - 這就是為何建立 Volition 的原因。

Volition 結合了零知識卷軸和 Validium 鏈，它允許使用者在兩種擴張解決方案之間切換。 使用 Volition，使用者能夠利用 Validium 的鏈外資料可用性進行某些交易，同時可以在需要時自由地切換到鏈上資料可用性解決方案（零知識卷軸）。 這本質上讓使用者能夠根據其獨特情況自由地進行權衡。

去中心化交易所 (DEX) 可能偏好使用 Validium 的可擴展和隱私基礎設施進行高價值交易。 它還可以為需要零知識卷軸的更高安全性保證和去信任的使用者使用零知識卷軸。

## Validium 和以太坊虛擬機的相容性 {#validiums-and-evm-compatibility}

與零知識卷軸一樣，Validium 最適合簡單的應用程式，例如代幣交換和支付。 由於在零知識證明電路中證明[以太坊虛擬機](/developers/docs/evm/)指示的開銷很大，因此很難實作在 Validium 之間為通用計算和智慧型合約執行提供支援。

一些 Validium 專案嘗試透過編譯與以太坊虛擬機兼容的語言（例如 Solidity、Viper），來建立為高效證明而最佳化的自訂位元組碼，從而回避這個問題。 這種方法的一個缺點是，零知識證明友好的新虛擬機可能不支援重要的以太坊虛擬機作業碼，並且開發者必須直接使用高階語言進行編寫才能獲得最佳體驗。 這導致了更多問題：它迫使開發者使用全新的開發堆棧構建去中心化應用程式，並破壞了與目前以太坊基礎設施的相容性。

然而，一些團隊正在嘗試針對零知識證明電路最佳化現有的以太坊虛擬機作業碼。 這包括對零知識以太坊虛擬機 (zkEVM) 的開發，這是一種與以太坊虛擬機兼容的虛擬機，可以生成驗證程式是否正確執行的證明。 使用零知識以太坊虛擬機，Validium 鏈可以在鏈外執行智慧型合約並提交有效性證明，以在以太坊上驗證鏈外計算（無需重新執行合約）。

[更多有關零知識以太坊虛擬機的資訊](https://www.alchemy.com/overviews/zkevm)。

## Validium 如何擴張以太坊？ {#scaling-ethereum-with-validiums}

### 1. 鏈外資料存儲 {#off-chain-data-storage}

二層網路擴張項目，例如樂觀卷軸和零知識卷軸，透過將部分交易資料發佈到一層網路，犧牲了純鏈外擴容協定（如 [Plasma](/developers/docs/scaling/plasma/)）的無限可擴展性來換取安全性。 然而，這意味著卷軸的可擴展性屬性受到以太坊主網上資料帶寬的限制（因此提出[資料分片](/roadmap/danksharding/)以提高以太坊的資料存儲容量）。

Validium 透過將所有交易資料保存在鏈外，並在轉送狀態更新到以太坊主鏈時僅發佈狀態承諾（及有效性證明），實現了可擴展性。 然而，有效性證明的存在為 Validium 提供了比其他純鏈外擴張解決方案（包括 Plasma 和[側鏈](/developers/docs/scaling/sidechains/)）更高的安全保證。 透過減少以太坊在驗證鏈外交易之前必須處理的資料量，Validium 設計極大地提升了主網上的吞吐量。

### 2. 遞迴證明 {#recursive-proofs}

遞迴證明是一種有效性證明，可驗證其他證明的有效性。 這些「證明的證明」透過以遞迴方式彙總多個證明，直到建立一個可以驗證所有先前證明的最終證明。 遞迴證明透過增加每個有效性證明可以驗證的交易數量來提升區塊鏈處理速度。

通常，Validium 營運者提交到以太坊來驗證的每個有效性證明都會驗證單個區塊的完整性。 而一個遞迴證明可用於同時確認幾個 Validium 區塊的有效性 - 這是有可能的，因爲證明電路能夠以遞迴方式將幾個區塊證明彙總為一個最終證明。 如果鏈上驗證者合約接受遞迴證明，則所有底層區塊都會立即被最終確定。

## Validium 的優勢和劣勢 {#pros-and-cons-of-validium}

| 優勢                                   | 劣勢                                                      |
| ------------------------------------ | ------------------------------------------------------- |
| 有效性證明强制驗證鏈外交易的完整性，並防止營運者最終確定無效的狀態更新。 | 生成有效性證明需要使用特定硬體，這會導致中心化風險。                              |
| 提高使用者的資本效率（將資金提取回以太坊時不會出現延遲）         | 對通用計算/智慧型合約的支持有限；開發需要使用專業化語言。                           |
| 對高價值應用程式中的詐欺證明型系統所面臨的某些經濟攻擊有高抵抗性。    | 生成零知識證明需要强大的算力；對於低吞吐量的應用程式不具有成本效益。                      |
| 透過不將回呼資料發佈到以太坊主網來降低使用者的燃料費用。         | 較慢的主觀最終性時間（生成零知識證明需要 10 - 30 分鐘），但完全最終性會快一些，因爲沒有爭議時間延遲。 |
| 這適用於特定用例，例如優先考慮交易隱私和可擴展性的交易或區塊鏈游戲。   | 可能會阻止使用者提取資金，因爲生成所有權的默克爾證明需要鏈外資料始終可用。                   |
| 鏈外資料可用性提升了吞吐量並增加了可擴展性。               | 安全模型依賴於信任假設和加密經濟激勵措施，與完全依賴加密安全機制的零知識卷軸不同。               |

### 使用 Validium/Volition {#use-validium-and-volitions}

有多項專案提供 Validium 和 Volition 實作，歡迎整合到你的去中心化應用程式：

**StarkWare StarkEx** - _StarkEx 是基於有效性證明的以太坊二層網路 (L2) 可擴展性解決方案。 它能夠在零知識卷軸或 Validium 資料可用性模式下運作。_

- [文件](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [網站](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter 是一個二層網路擴張協定，它使用一種結合了零知識卷軸與分片理念的混合方法來處理資料可用性。 它可支援任意數量的分片，每個分片都有自己的資料可用性原則。_

- [部落格](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [文件](https://docs.zksync.io/zk-stack/concepts/data-availability)
- [網站](https://zksync.io/)

## 衍生閱讀 {#further-reading}

- [Validium 及二層網路二合一 — 第 99 期](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [零知識卷軸與 Validium 的比較](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition 和新興資料可用性範圍](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [卷軸、Validium 和 Volition：瞭解最熱門的以太坊擴張解決方案](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
