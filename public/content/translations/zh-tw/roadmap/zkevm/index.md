---
title: 用於 L1 區塊驗證的 zkEVM
description: 了解零知識證明如何驗證以太坊區塊執行，從而實現更高的吞吐量並降低驗證者的硬體需求。
lang: zh-tw
---

# 用於 L1 區塊驗證的 zkEVM {#zkevm-l1}

zkEVM 是一種使用[零知識證明](/zero-knowledge-proofs/)來驗證以太坊區塊執行的技術。它不需要每個[驗證者](/glossary/#validator)重新執行區塊中的所有交易，而是由一個專門的參與者（稱為「證明者」）執行區塊，並產生一個加密證明來證明執行是正確的。然後，任何節點都可以驗證這個證明——這個過程比重新執行所有交易要便宜好幾個數量級。

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>請勿與 zkEVM 卷軸混淆</AlertTitle>
<AlertDescription>
本頁面討論使用 zkEVM 來驗證以太坊 L1 區塊執行。有關使用 ZK 證明作為二層網路解決方案來擴容以太坊的 zkEVM 卷軸，請參閱[零知識證明卷軸](/developers/docs/scaling/zk-rollups/)。
</AlertDescription>
</AlertContent>
</Alert>

## 重新執行問題 {#reexecution-problem}

如今，以太坊使用「N 分之 N」的驗證模型：每個驗證者必須獨立重新執行每個區塊中的每筆交易，以驗證提議的狀態變更是否正確。雖然這種方法最大程度地實現了去信任化，但它也造成了根本性的瓶頸。

問題在於，以太坊的吞吐量受限於一般驗證者所能處理的範圍。提高[燃料限制](/glossary/#gas-limit)將允許每個區塊包含更多交易，但這也會提高驗證者的硬體需求。這威脅到了去中心化——如果運行驗證者需要昂貴的硬體，能參與保護網路安全的人就會變少。

zkEVM 提供了解決這種權衡的方法。透過從「每個人都重新執行」轉變為「一人證明，所有人驗證」，以太坊可以安全地提高燃料限制，而無需提高驗證者的硬體需求。

## zkEVM L1 驗證如何運作 {#how-it-works}

zkEVM 驗證將區塊驗證轉變為「N 分之 1」模型：

1. **執行**：證明者執行區塊中的所有交易，追蹤每個狀態變更
2. **證明**：證明者產生一個加密證明（[SNARK 或 STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)），以證明執行的正確性
3. **驗證**：驗證者驗證證明，而不是重新執行交易——這比完全重新執行要便宜得多

安全保證保持不變：如果執行不正確，就無法產生有效的證明。但現在，不再是每個節點都進行昂貴的運算，而是只有證明者這樣做——而且驗證的成本夠低，不會限制燃料限制。

### 類型 1 zkEVM {#type-1-zkevm}

zkEVM 根據其與以太坊的相容性分為不同類型：

- **類型 1**：完全等同於以太坊。不對 EVM 進行任何修改，因此任何以太坊區塊都可以原封不動地被證明
- **類型 2-4**：做出各種權衡，修改 EVM 行為以使證明更容易

對於 L1 驗證，類型 1 是不可或缺的。zkEVM 必須能夠證明任何有效的以太坊區塊，包括邊緣情況和歷史區塊。任何偏離以太坊確切行為的情況都會產生共識問題。

以太坊基金會的 zkEVM 研究著重於與現有以太坊執行完全相容的類型 1 實作。

## 對以太坊的好處 {#benefits}

### 更高的吞吐量 {#higher-throughput}

當驗證成本低廉時，燃料限制可以安全地提高。這擴大了網路容量，並有助於在高需求期間穩定費用。目前的燃料限制部分受限於驗證者硬體——zkEVM 消除了這個限制。

### 更強的去中心化 {#stronger-decentralization}

有了 zkEVM 驗證，驗證者只需要驗證證明，而不需要執行交易。這大幅降低了運行驗證者的硬體需求，讓更多人能夠參與保護網路安全。更高的驗證者多樣性增強了以太坊的抗審查性和韌性。

請注意，證明本身需要大量的運算資源，大於目前驗證者硬體的需求。然而，與驗證不同的是，證明不需要以同樣的方式去中心化：每個區塊只需要一個正確的證明，而且任何人都可以快速驗證它。對證明者市場、證明聚合和硬體加速的研究旨在確保證明保持競爭力和可及性，而不是集中在少數大型營運商手中。

### 可預測的最終性 {#predictable-finality}

無論區塊複雜度如何，證明驗證都在恆定時間內運作。這使得證明時間更可預測，並減少了當驗證者難以及時處理複雜區塊時可能發生的錯過證明情況。

## 即時證明挑戰 {#realtime-proving}

zkEVM L1 驗證的主要挑戰是速度。以太坊區塊每 12 秒產生一次，這意味著證明需要在類似的時間範圍內產生，才能對共識有用。

目前的 zkEVM 實作可能需要幾分鐘到幾小時才能證明單一區塊。研究著重於透過以下方式縮小這個差距：

- **平行化**：將證明工作分配到多台機器上
- **專用硬體**：設計針對 ZK 證明最佳化的電路和硬體
- **演算法改進**：更有效率的證明系統和電路設計
- **增量證明**：在交易執行時產生證明，而不是在執行之後

## 目前的研究與實作 {#current-research}

以太坊基金會透過 [Privacy Stewards of Ethereum (PSE)](https://pse.dev/) 團隊資助 zkEVM 研究。主要研究方向包括：

- **即時證明**：在 12 秒的時段內產生完整的區塊證明
- **用戶端整合**：標準化執行用戶端和證明者之間的介面
- **經濟誘因**：設計永續的證明者市場和費用結構

### 實作狀態 {#implementations}

目前正在開發和測試幾種用於以太坊區塊證明的 zkVM 實作：

| 實作 | 架構 |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

這些實作使用基於 RISC-V 的虛擬機來執行 EVM 位元組碼，然後產生正確執行的 ZK 證明。最新的測試結果和進度可在[以太坊基金會的 zkVM 追蹤器](https://zkevm.ethereum.foundation/zkvm-tracker)上追蹤。

## zkEVM 如何與其他升級配合 {#related-upgrades}

zkEVM L1 驗證與其他幾個以太坊開發藍圖項目相關聯：

- **[沃克爾樹 (Verkle Trees)](/roadmap/verkle-trees/)**：為無狀態驗證啟用更小的見證，減少證明者需要處理的資料量
- **[無狀態性](/roadmap/statelessness/)**：zkEVM 是一個關鍵的推動因素——有了執行的 ZK 證明，節點不需要完整的狀態來驗證區塊
- **[PBS](/roadmap/pbs/)**：區塊建構者可能會整合證明產生，或者可能會出現一個獨立的證明者市場
- **[單槽最終性](/roadmap/single-slot-finality/)**：更快的證明產生可以透過加密保證實現單槽最終性

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
zkEVM L1 驗證正在積極研究中，尚未整合到生產環境的以太坊用戶端中。
</AlertDescription>
</AlertContent>
</Alert>

## 進一步閱讀 {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - 官方以太坊基金會 zkEVM 研究中心
- [Ethproofs](https://ethproofs.org/) - 追蹤即時證明以太坊的競賽
- [zkevm.fyi](https://zkevm.fyi) - 關於 L1 zkEVM 的技術書籍
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) - 技術規格
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Vitalik 對驗證改進的概述
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) - 來自以太坊基金會團隊的效能分析