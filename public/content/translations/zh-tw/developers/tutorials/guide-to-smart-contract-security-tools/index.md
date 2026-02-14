---
title: "智能合約安全工具指南"
description: "三種不同測試與程式分析技術的概觀"
author: "Trailofbits"
lang: zh-tw
tags: [ "穩固", "智能合約", "安全性" ]
skill: intermediate
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

我們將使用三種獨特的測試與程式分析技術：

- \*\*透過 [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) 進行靜態分析。\*\*程式的所有路徑會透過不同的程式呈現方式（例如控制流程圖）同時進行近似與分析
- \*\*透過 [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) 進行模糊測試。\*\*程式碼會透過偽隨機產生的交易來執行。 模糊測試器會嘗試找到違反給定屬性的交易序列。
- \*\*透過 [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/) 進行符號執行。\*\*一種正規的驗證技術，將每個執行路徑轉換成數學公式，並在其上檢查約束條件。

每種技術都有其優點和缺點，在[特定情況](#determining-security-properties)下會很有用：

| 技術   | 工具        | 用法              | 速度 | 遺漏的錯誤 | 誤報 |
| ---- | --------- | --------------- | -- | ----- | -- |
| 靜態分析 | Slither   | 命令列介面與指令碼       | 秒  | 中等    | 低  |
| 模糊測試 | Echidna   | Solidity 屬性     | 分  | 低     | 無  |
| 符號執行 | Manticore | Solidity 屬性與指令碼 | 小時 | 無\*   | 無  |

\* 如果所有路徑都在沒有逾時的情況下完成探索

**Slither** 可在幾秒鐘內分析合約，但靜態分析可能會導致誤報，且較不適合用於複雜的檢查（例如算術檢查）。 透過應用程式介面執行 Slither，以按鈕方式存取內建的偵測器，或透過應用程式介面進行使用者定義的檢查。

**Echidna** 需要運行數分鐘，且只會產生真陽性結果。 Echidna 會檢查使用者提供的、以 Solidity 編寫的安全屬性。 由於它基於隨機探索，可能會遺漏錯誤。

**Manticore** 會執行「最重量級」的分析。 與 Echidna 類似，Manticore 也會驗證使用者提供的屬性。 它需要更長的運行時間，但可以證明屬性的有效性，且不會報告誤報。

## 建議工作流程 {#suggested-workflow}

從 Slither 的內建偵測器開始，確保目前沒有簡單的錯誤，未來也不會引入。 使用 Slither 檢查與繼承、變數相依性和結構性問題相關的屬性。 隨著程式碼庫的增長，使用 Echidna 測試狀態機更複雜的屬性。 再次使用 Slither 開發自訂檢查，以提供 Solidity 中沒有的保護措施，例如防止函式被覆寫。 最後，使用 Manticore 對關鍵安全屬性（例如算術運算）執行有針對性的驗證。

- 使用 Slither 的命令列介面來捕捉常見問題
- 使用 Echidna 測試合約的高階安全屬性
- 使用 Slither 編寫自訂的靜態檢查
- 當您想要對關鍵安全屬性進行深度保證時，請使用 Manticore

**關於單元測試的說明**。 單元測試是建立高品質軟體的必要條件。 然而，這些技術並非最適合用來發現安全漏洞。 它們通常用於測試程式碼的正面行為（即程式碼在正常情況下如預期般運作），而安全漏洞則傾向於存在於開發者未曾考慮到的邊際情況。 在我們對數十個智能合約安全審查的研究中，我們在客戶的程式碼中發現，[單元測試覆蓋率對安全漏洞的數量或嚴重性沒有影響](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/)。

## 確定安全屬性 {#determining-security-properties}

為了有效地測試和驗證您的程式碼，您必須找出需要注意的區域。 由於您在安全性上投入的資源有限，確定您程式碼庫中較弱或高價值的部分，對於優化您的投入非常重要。 威脅模型可以提供幫助。 請考慮審查：

- [快速風險評估](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html)（時間緊迫時我們的首選方法）
- [以資料為中心的系統威脅模型指南](https://csrc.nist.gov/pubs/sp/800/154/ipd) (又名 NIST 800-154)
- [Shostack 威脅模型](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [斷言的使用](https://blog.regehr.org/archives/1091)

### 元件 {#components}

了解您想檢查的內容，也有助於您選擇正確的工具。

與智能合約經常相關的廣泛領域包括：

- \*\*狀態機。\*\*大多數合約都可以表示為狀態機。 考慮檢查 (1) 無法達到任何無效狀態，(2) 如果一個狀態是有效的，那麼它可以被達到，以及 (3) 沒有任何狀態會讓合約陷入陷阱。

  - Echidna 和 Manticore 是測試狀態機規格的首選工具。

- \*\*存取控制。\*\*如果您的系統有特權使用者（例如擁有者、控制者等） 您必須確保 (1) 每個使用者只能執行授權的動作，以及 (2) 沒有使用者可以阻止更具特權的使用者執行動作。

  - Slither、Echidna 和 Manticore 可以檢查存取控制的正確性。 例如，Slither 可以檢查是否只有列入白名單的函式缺少 `onlyOwner` 修飾符。 Echidna 和 Manticore 對於更複雜的存取控制很有用，例如只有在合約達到給定狀態時才授予權限。

- \*\*算術運算。\*\*檢查算術運算的健全性至關重要。 在各處使用 `SafeMath` 是防止溢出/下溢的好方法，但您仍需考慮其他算術缺陷，包括捨入問題和會讓合約陷入陷阱的缺陷。

  - Manticore 是這裡的最佳選擇。 如果算術超出 SMT 求解器的範圍，可以使用 Echidna。

- \*\*繼承正確性。\*\*Solidity 合約高度依賴多重繼承。 很容易會出現錯誤，例如遮蔽函式缺少 `super` 呼叫，以及對 C3 線性化順序的誤解。

  - Slither 是確保偵測到這些問題的工具。

- \*\*外部互動。\*\*合約會彼此互動，而某些外部合約不應被信任。 例如，如果您的合約依賴外部預言機，當一半可用的預言機遭到入侵時，它還能保持安全嗎？

  - Manticore 和 Echidna 是測試您的合約與外部互動的最佳選擇。 Manticore 有內建機制來模擬外部合約。

- \*\*標準符合性。\*\*以太坊標準（例如 ERC20）的設計歷史上曾出現過瑕疵。 請注意您所依據的標準的限制。
  - Slither、Echidna 和 Manticore 將幫助您偵測與給定標準的偏差。

### 工具選擇快捷手冊 {#tool-selection-cheatsheet}

| 元件    | 工具                        | 範例                                                                                                                                                                                                                                                               |
| ----- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 狀態機   | Echidna、Manticore         |                                                                                                                                                                                                                                                                  |
| 存取控制  | Slither、Echidna、Manticore | [Slither 練習 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md)、[Echidna 練習 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| 算術運算  | Manticore、Echidna         | [Echidna 練習 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md)、[Manticore 練習 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)      |
| 繼承正確性 | Slither                   | [Slither 練習 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                  |
| 外部互動  | Manticore、Echidna         |                                                                                                                                                                                                                                                                  |
| 標準符合性 | Slither、Echidna、Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                          |

根據您的目標，可能還需要檢查其他領域，但這些粗略的重點領域對於任何智能合約系統來說都是一個好的開始。

我們的公開審計報告中包含了經過驗證或測試的屬性範例。 請考慮閱讀以下報告的「自動化測試與驗證」部分，以審查真實世界的安全屬性：

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
