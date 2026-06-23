---
title: Validium
description: "介紹目前以太坊社群所使用的擴容解決方案 Validium。"
lang: zh-tw
sidebarDepth: 3
---

Validium 是一種[擴容解決方案](/developers/docs/scaling/)，它像 [ZK 匯總 (ZK-rollup)](/developers/docs/scaling/zk-rollups/) 一樣使用有效性證明來強制執行交易的完整性，但不會將交易資料儲存在[以太坊](/)主網上。雖然鏈下資料可用性會帶來一些權衡，但它可以大幅提升可擴展性（Validium [每秒可處理約 9,000 筆或更多交易](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)）。

## 先決條件 {#prerequisites}

你應該已經閱讀並理解我們關於[以太坊擴容](/developers/docs/scaling/)和[第二層 (L2)](/layer-2) 的頁面。

## 什麼是 Validium？ {#what-is-validium}

Validium 是一種擴容解決方案，使用鏈下資料可用性與運算，旨在透過在以太坊主網之外處理交易來提高吞吐量。與零知識匯總 (ZK-rollup) 類似，Validium 會發布[零知識證明](/glossary/#zk-proof)，以在以太坊上驗證鏈下交易。這可以防止無效的狀態轉換，並增強 Validium 鏈的安全保證。

這些「有效性證明」可以採用 ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) 或 ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge) 的形式。了解更多關於[零知識證明](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)的資訊。

屬於 Validium 用戶的資金由以太坊上的智能合約控制。Validium 提供近乎即時的提款，就像 ZK 匯總一樣；一旦提款請求的有效性證明在主網上被驗證，用戶就可以透過提供[默克爾證明](/developers/tutorials/merkle-proofs-for-offline-data-integrity/)來提取資金。默克爾證明會驗證用戶的提款交易是否包含在已驗證的交易批次中，從而允許鏈上合約處理該提款。

然而，Validium 用戶的資金可能會被凍結且提款受到限制。如果 Validium 鏈上的資料可用性管理者向用戶隱瞞鏈下狀態資料，就會發生這種情況。如果無法存取交易資料，用戶就無法計算證明資金所有權和執行提款所需的默克爾證明。

這是 Validium 和 ZK 匯總之間的主要區別——它們在資料可用性光譜上的位置不同。這兩種解決方案處理資料儲存的方式不同，這對安全性和無須信任性有著深遠的影響。

## Validium 如何與以太坊互動？ {#how-do-validiums-interact-with-ethereum}

Validium 是建立在現有以太坊鏈之上的擴容協定。雖然它在鏈下執行交易，但 Validium 鏈是由部署在主網上的一組智能合約所管理，包括：

1. **驗證者合約**：驗證者合約負責驗證 Validium 營運者在進行狀態更新時提交的證明是否有效。這包括證明鏈下交易正確性的有效性證明，以及驗證鏈下交易資料是否存在的資料可用性證明。

2. **主合約**：主合約儲存區塊生產者提交的狀態承諾（默克爾根），並在有效性證明於鏈上被驗證後更新 Validium 的狀態。該合約還處理 Validium 鏈的存款和提款。

Validium 還依賴以太坊主鏈來實現以下功能：

### 結算 {#settlement}

在 Validium 上執行的交易在父鏈驗證其有效性之前無法完全確認。在 Validium 上進行的所有業務最終都必須在主網上結算。以太坊區塊鏈還為 Validium 用戶提供「結算保證」，這意味著鏈下交易一旦承諾到鏈上，就無法被撤銷或更改。

### 安全性 {#security}

以太坊作為結算層，也保證了 Validium 上狀態轉換的有效性。在 Validium 鏈上執行的鏈下交易會透過以太坊基礎層上的智能合約進行驗證。

如果鏈上驗證者合約認為證明無效，交易就會被拒絕。這意味著營運者在更新 Validium 的狀態之前，必須滿足以太坊協定強制執行的有效性條件。

## Validium 是如何運作的？ {#how-does-validium-work}

### 交易 {#transactions}

用戶將交易提交給營運者，這是一個負責在 Validium 鏈上執行交易的節點。某些 Validium 可能會使用單一營運者來執行該鏈，或者依賴[權益證明 (PoS)](/developers/docs/consensus-mechanisms/pos/) 機制來輪替營運者。

營運者將交易聚合成一個批次，並將其發送到證明電路進行證明。證明電路接受交易批次（以及其他相關資料）作為輸入，並輸出一個有效性證明，以驗證操作是否正確執行。

### 狀態承諾 {#state-commitments}

Validium 的狀態被雜湊為一棵默克爾樹，其根儲存在以太坊上的主合約中。默克爾根（也稱為狀態根）作為對 Validium 上帳戶和餘額當前狀態的密碼學承諾。

為了執行狀態更新，營運者必須計算一個新的狀態根（在執行交易之後）並將其提交給鏈上合約。如果有效性證明驗證通過，提議的狀態就會被接受，並且 Validium 會切換到新的狀態根。

### 存款與提款 {#deposits-and-withdrawals}

用戶透過在鏈上合約中存入 ETH（或任何相容 ERC 的代幣），將資金從以太坊轉移到 Validium。合約將存款事件中繼到鏈下的 Validium，在該處用戶的地址會被記入與其存款相等的金額。營運者也會將此存款交易包含在一個新批次中。

為了將資金轉回主網，Validium 用戶發起一筆提款交易並將其提交給營運者，營運者會驗證提款請求並將其包含在一個批次中。用戶在 Validium 鏈上的資產在退出系統之前也會被銷毀。一旦與該批次相關的有效性證明被驗證，用戶就可以呼叫主合約來提取其初始存款的剩餘部分。

作為一種抗審查機制，Validium 協定允許用戶直接從 Validium 合約中提款，而無需經過營運者。在這種情況下，用戶需要向驗證者合約提供默克爾證明，以顯示帳戶包含在狀態根中。如果證明被接受，用戶就可以呼叫主合約的提款功能，將其資金從 Validium 中退出。

### 批次提交 {#batch-submission}

在執行一批交易後，營運者將相關的有效性證明提交給驗證者合約，並向主合約提議一個新的狀態根。如果證明有效，主合約會更新 Validium 的狀態，並將批次中交易的結果已定案。

與 ZK 匯總不同，Validium 上的區塊生產者不需要發布交易批次的交易資料（只需發布區塊標頭）。這使得 Validium 成為一種純粹的鏈下擴容協定，這與使用資料塊 (blob) 資料、`calldata` 或兩者結合在以太坊主鏈上發布狀態資料的「混合」擴容協定（即[第二層 (L2)](/layer-2/)）形成對比。

### 資料可用性 {#data-availability}

如前所述，Validium 利用鏈下資料可用性模型，營運者將所有交易資料儲存在以太坊主網之外。Validium 較低的鏈上資料足跡提高了可擴展性（吞吐量不受以太坊資料處理能力的限制），並降低了用戶費用（在鏈上發布資料的成本較低）。

然而，鏈下資料可用性帶來了一個問題：建立或驗證默克爾證明所需的資料可能無法取得。這意味著如果營運者有惡意行為，用戶可能無法從鏈上合約中提取資金。

各種 Validium 解決方案試圖透過將狀態資料的儲存去中心化來解決這個問題。這涉及強制區塊生產者將底層資料發送給「資料可用性管理者」，他們負責儲存鏈下資料並在用戶請求時提供這些資料。

Validium 中的資料可用性管理者透過簽署每個 Validium 批次來證明鏈下交易資料的可用性。這些簽章構成了一種「可用性證明」，鏈上驗證者合約在批准狀態更新之前會檢查該證明。

Validium 在資料可用性管理的方法上有所不同。有些依賴受信任的各方來儲存狀態資料，而有些則使用隨機分配的驗證者來執行此任務。

#### 資料可用性委員會 (DAC) {#data-availability-committee}

為了保證鏈下資料的可用性，一些 Validium 解決方案指定了一組受信任的實體，統稱為資料可用性委員會 (DAC)，來儲存狀態副本並提供資料可用性證明。DAC 更容易實施且需要較少的協調，因為成員數量較少。

然而，用戶必須信任 DAC 會在需要時（例如，用於產生默克爾證明）提供資料。資料可用性委員會的成員有可能[遭到惡意行為者入侵](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view)，進而隱瞞鏈下資料。

[了解更多關於 Validium 中資料可用性委員會的資訊](https://medium.com/starkware/data-availability-e5564c416424)。

#### 綁定資料可用性 {#bonded-data-availability}

其他 Validium 要求負責儲存離線資料的參與者在承擔其角色之前，在智能合約中質押（即鎖定）代幣。這種質押作為一種「保證金」，以保證資料可用性管理者之間的誠實行為，並減少信任假設。如果這些參與者未能證明資料可用性，保證金將被罰沒。

在綁定資料可用性方案中，任何人只要提供所需的質押，就可以被指派來保存鏈下資料。這擴大了符合條件的資料可用性管理者的範圍，減少了影響資料可用性委員會 (DAC) 的中心化問題。更重要的是，這種方法依賴密碼經濟學激勵來防止惡意活動，這比指定受信任的各方來保護 Validium 中的離線資料要安全得多。

[了解更多關於 Validium 中綁定資料可用性的資訊](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)。

## Volition 與 Validium {#volitions-and-validium}

Validium 提供了許多好處，但也伴隨著權衡（最顯著的是資料可用性）。但是，與許多擴容解決方案一樣，Validium 適用於特定的使用案例——這就是為什麼會創造出 Volition。

Volition 結合了 ZK 匯總和 Validium 鏈，並允許用戶在這兩種擴容解決方案之間切換。透過 Volition，用戶可以在某些交易中利用 Validium 的鏈下資料可用性，同時保留在需要時切換到鏈上資料可用性解決方案 (ZK 匯總) 的自由。這本質上賦予了用戶根據其獨特情況自由選擇權衡的權利。

去中心化交易所 (DEX) 可能更傾向於使用 Validium 可擴展且具隱私性的基礎設施來進行高價值交易。它也可以為那些希望獲得 ZK 匯總更高安全保證和無須信任性的用戶使用 ZK 匯總。

## Validium 與 EVM 相容性 {#validiums-and-evm-compatibility}

與 ZK 匯總一樣，Validium 主要適用於簡單的應用程式，例如代幣交換和支付。考慮到在零知識證明電路中證明 [EVM](/developers/docs/evm/) 指令的巨大開銷，在 Validium 中支援通用運算和智能合約執行是很難實現的。

一些 Validium 專案試圖透過將相容 EVM 的語言（例如 Solidity、Vyper）編譯成針對高效證明進行最佳化的自訂位元組碼來迴避這個問題。這種方法的一個缺點是，新的對零知識證明友善的虛擬機可能不支援重要的 EVM 操作碼，開發人員必須直接使用高階語言編寫才能獲得最佳體驗。這產生了更多問題：它迫使開發人員使用全新的開發堆疊來建立去中心化應用程式 (dapp)，並破壞了與當前以太坊基礎設施的相容性。

然而，一些團隊正試圖針對 ZK 證明電路最佳化現有的 EVM 操作碼。這將促成零知識以太坊虛擬機 (zkEVM) 的開發，這是一種相容 EVM 的虛擬機，可產生證明來驗證程式執行的正確性。有了 zkEVM，Validium 鏈可以在鏈下執行智能合約，並提交有效性證明以在以太坊上驗證鏈下運算（而無需重新執行）。

[了解更多關於 zkEVM 的資訊](https://www.alchemy.com/overviews/zkevm)。

## Validium 如何擴容以太坊？ {#scaling-ethereum-with-validiums}

### 1. 鏈下資料儲存 {#offchain-data-storage}

第二層 (L2) 擴容專案（例如樂觀匯總和 ZK 匯總）透過在第一層 (L1) 上發布一些交易資料，以純鏈下擴容協定（例如[電漿 (Plasma)](/developers/docs/scaling/plasma/)）的無限可擴展性來換取安全性。但這意味著匯總的可擴展性屬性受到以太坊主網上資料頻寬的限制（[資料分片](/roadmap/danksharding/)正是為此提議改善以太坊的資料儲存能力）。

Validium 透過將所有交易資料保留在鏈下，並且僅在將狀態更新中繼到以太坊主鏈時發布狀態承諾（和有效性證明）來實現可擴展性。然而，有效性證明的存在賦予了 Validium 比其他純鏈下擴容解決方案（包括電漿和[側鏈](/developers/docs/scaling/sidechains/)）更高的安全保證。透過減少以太坊在驗證鏈下交易之前必須處理的資料量，Validium 的設計極大地擴展了主網的吞吐量。

### 2. 遞迴證明 {#recursive-proofs}

遞迴證明是一種驗證其他證明有效性的有效性證明。這些「證明的證明」是透過遞迴聚合多個證明來產生的，直到建立一個驗證所有先前證明的最終證明。遞迴證明透過增加每個有效性證明可以驗證的交易數量來擴展區塊鏈的處理速度。

通常，Validium 營運者提交給以太坊進行驗證的每個有效性證明都會驗證單個區塊的完整性。而單個遞迴證明可用於同時確認幾個 Validium 區塊的有效性——這是可能的，因為證明電路可以遞迴地將幾個區塊證明聚合成一個最終證明。如果鏈上驗證者合約接受遞迴證明，所有底層區塊都會立即已定案。

## Validium 的優缺點 {#pros-and-cons-of-validium}

| 優點                                                                                                                     | 缺點                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 有效性證明強制執行鏈下交易的完整性，並防止營運者將無效的狀態更新已定案。 | 產生有效性證明需要特殊的硬體，這帶來了中心化風險。                                                              |
| 提高用戶的資金效率（將資金提取回以太坊沒有延遲）。                                 | 對通用運算/智能合約的支援有限；開發需要專門的語言。                                             |
| 在高價值應用中，不易受到基於詐欺證明的系統所面臨的某些經濟攻擊。                | 產生 ZK 證明需要很高的運算能力；對於低吞吐量應用不具成本效益。                                         |
| 透過不將呼叫資料發布到以太坊主網，降低了用戶的燃料費用。                                                  | 主觀最終性時間較慢（產生 ZK 證明需要 10-30 分鐘），但達到完全最終性的速度更快，因為沒有爭議時間延遲。               |
| 適用於特定的使用案例，例如優先考慮交易隱私和可擴展性的交易或區塊鏈遊戲。  | 用戶可能會被阻止提取資金，因為產生所有權的默克爾證明需要鏈下資料隨時可用。      |
| 鏈下資料可用性提供了更高水準的吞吐量並增加了可擴展性。                              | 安全模型依賴於信任假設和密碼經濟學激勵，這與純粹依賴密碼學安全機制的 ZK 匯總不同。 |

### 使用 Validium/Volition {#use-validium-and-volitions}

多個專案提供了 Validium 和 Volition 的實作，你可以將它們整合到你的去中心化應用程式 (dapp) 中：

**StarkWare StarkEx** - _StarkEx 是一個基於有效性證明的以太坊第二層 (L2) 可擴展性解決方案。它可以在 ZK 匯總或 Validium 資料可用性模式下運作。_

- [文件](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [網站](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _zkPorter 是一個第二層 (L2) 擴容協定，採用結合 zkRollup 和分片概念的混合方法來解決資料可用性問題。它可以支援任意數量的分片，每個分片都有自己的資料可用性策略。_

- [部落格](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [文件](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [網站](https://zksync.io/)

## 延伸閱讀 {#further-reading}

- [Validium 與第二層 (L2) 的二乘二矩陣 — 第 99 期](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK 匯總與 Validium 的比較](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition 與新興的資料可用性光譜](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [以太坊匯總實用指南](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)