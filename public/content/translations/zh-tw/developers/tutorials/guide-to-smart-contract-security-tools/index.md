---
title: 智能合約安全工具指南
description: 三種不同測試與程式分析技術的概述
author: "Trailofbits"
lang: zh-tw
tags: ["solidity", "智能合約", "安全"]
skill: intermediate
breadcrumb: 安全工具
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

我們將使用三種獨特的測試與程式分析技術：

- **使用 [斯立瑟](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) 進行靜態分析。** 透過不同的程式呈現方式（例如控制流程圖），同時對程式的所有路徑進行近似與分析。
- **使用 [埃奇德納](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) 進行模糊測試。** 程式碼會透過偽隨機生成的交易來執行。模糊測試工具將嘗試尋找一系列交易來違反給定的屬性。
- **使用 [曼蒂科爾](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/) 進行符號執行。** 這是一種形式化驗證技術，將每條執行路徑轉換為數學公式，並在這些公式上檢查約束條件。

每種技術都有其優缺點，並在[特定情況](#determining-security-properties)下非常有用：

| 技術 | 工具 | 用途 | 速度 | 遺漏的錯誤 | 誤報 |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| 靜態分析 | 斯立瑟 | CLI 與腳本 | 數秒 | 中等 | 低 |
| 模糊測試 | 埃奇德納 | Solidity 屬性 | 數分鐘 | 低 | 無 |
| 符號執行 | 曼蒂科爾 | Solidity 屬性與腳本 | 數小時 | 無\* | 無 |

\* 如果在未超時的情況下探索了所有路徑

**斯立瑟**能在幾秒鐘內分析合約，然而，靜態分析可能會導致誤報，且較不適合複雜的檢查（例如算術檢查）。透過 API 執行斯立瑟，可以一鍵存取內建的偵測器，或透過 API 進行使用者自訂的檢查。

**埃奇德納**需要執行幾分鐘，且只會產生真正的漏洞。埃奇德納會檢查使用者提供、以 Solidity 撰寫的安全屬性。由於它是基於隨機探索，因此可能會遺漏錯誤。

**曼蒂科爾**執行「最重量級」的分析。與埃奇德納一樣，曼蒂科爾會驗證使用者提供的屬性。它需要更多時間來執行，但它可以證明屬性的有效性，且不會報告誤報。

## 建議的工作流程 {#suggested-workflow}

從斯立瑟的內建偵測器開始，確保目前沒有簡單的錯誤，且未來也不會引入。使用斯立瑟檢查與繼承、變數依賴性及結構問題相關的屬性。隨著程式碼庫的增長，使用埃奇德納來測試狀態機更複雜的屬性。再次使用斯立瑟來開發自訂檢查，以提供 Solidity 無法提供的保護，例如防止函式被覆寫。最後，使用曼蒂科爾對關鍵安全屬性（例如算術運算）進行針對性的驗證。

- 使用斯立瑟的 CLI 來捕捉常見問題
- 使用埃奇德納來測試合約的高階安全屬性
- 使用斯立瑟撰寫自訂的靜態檢查
- 當你需要對關鍵安全屬性進行深入保證時，請使用曼蒂科爾

**關於單元測試的注意事項**。單元測試對於建立高品質軟體是必要的。然而，這些技術並不是尋找安全漏洞的最佳選擇。它們通常用於測試程式碼的正面行為（即程式碼在正常情況下如預期運作），而安全漏洞往往存在於開發人員未考慮到的邊緣情況中。在我們對數十個智能合約安全審查的研究中，我們發現[單元測試的覆蓋率對我們在客戶程式碼中發現的安全漏洞數量或嚴重程度沒有影響](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/)。

## 決定安全屬性 {#determining-security-properties}

為了有效地測試和驗證你的程式碼，你必須找出需要關注的領域。由於你在安全上投入的資源有限，界定程式碼庫中薄弱或高價值的部份對於最佳化你的工作非常重要。威脅建模可以提供幫助。考慮檢閱：

- [快速風險評估](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html)（時間緊迫時我們偏好的方法）
- [以資料為中心的系統威脅建模指南](https://csrc.nist.gov/pubs/sp/800/154/ipd)（即 NIST 800-154）
- [Shostack 威脅建模](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [斷言的使用](https://blog.regehr.org/archives/1091)

### 元件 {#components}

了解你想要檢查的內容也有助於你選擇正確的工具。

經常與智能合約相關的廣泛領域包括：

- **狀態機。** 大多數合約都可以表示為狀態機。考慮檢查 (1) 無法達到無效狀態，(2) 如果狀態有效則可以達到，以及 (3) 沒有狀態會困住合約。

  - 埃奇德納和曼蒂科爾是測試狀態機規格的首選工具。

- **存取控制。** 如果你的系統有特權使用者（例如擁有者、控制者等），你必須確保 (1) 每個使用者只能執行授權的操作，且 (2) 沒有使用者可以阻止更高特權使用者的操作。

  - 斯立瑟、埃奇德納和曼蒂科爾可以檢查存取控制是否正確。例如，斯立瑟可以檢查是否只有白名單中的函式缺少 onlyOwner 修飾符。埃奇德納和曼蒂科爾對於更複雜的存取控制很有用，例如只有在合約達到給定狀態時才給予權限。

- **算術運算。** 檢查算術運算的健全性至關重要。在各處使用 `SafeMath` 是防止溢位/下溢的好方法，然而，你仍然必須考慮其他算術缺陷，包括捨入問題和會困住合約的缺陷。

  - 曼蒂科爾是這裡的最佳選擇。如果算術超出了 SMT 求解器的範圍，則可以使用埃奇德納。

- **繼承正確性。** Solidity 合約嚴重依賴多重繼承。很容易引入諸如遮蔽函式缺少 `super` 呼叫以及誤解 C3 線性化順序等錯誤。

  - 斯立瑟是確保偵測到這些問題的工具。

- **外部互動。** 合約之間會相互互動，而某些外部合約是不應被信任的。例如，如果你的合約依賴外部預言機，那麼如果一半的可用預言機遭到入侵，它還能保持安全嗎？

  - 曼蒂科爾和埃奇德納是測試與你的合約進行外部互動的最佳選擇。曼蒂科爾有一個內建機制來對外部合約進行存根。

- **標準一致性。** 以太坊標準（例如 ERC-20）在設計上有過缺陷的歷史。請注意你所建構的標準的限制。
  - 斯立瑟、埃奇德納和曼蒂科爾將幫助你偵測偏離給定標準的情況。

### 工具選擇備忘錄 {#tool-selection-cheatsheet}

| 元件 | 工具 | 範例 |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 狀態機 | 埃奇德納、曼蒂科爾 |
| 存取控制 | 斯立瑟、埃奇德納、曼蒂科爾 | [斯立瑟練習 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md)，[埃奇德納練習 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| 算術運算 | 曼蒂科爾、埃奇德納 | [埃奇德納練習 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md)，[曼蒂科爾練習 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| 繼承正確性 | 斯立瑟 | [斯立瑟練習 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| 外部互動 | 曼蒂科爾、埃奇德納 |
| 標準一致性 | 斯立瑟、埃奇德納、曼蒂科爾 | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

根據你的目標，還需要檢查其他領域，但這些粗略的重點領域對於任何智能合約系統來說都是一個好的開始。

我們的公開審計包含已驗證或測試屬性的範例。考慮閱讀以下報告的 `Automated Testing and Verification` 部分，以檢閱現實世界中的安全屬性：

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)