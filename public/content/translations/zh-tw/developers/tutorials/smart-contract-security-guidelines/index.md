---
title: 智能合約安全指南
description: 構建去中心化應用程式 (dapp) 時應考慮的安全指南清單
author: "Trailofbits"
tags: ["solidity", "智能合約", "安全"]
skill: intermediate
breadcrumb: 安全指南
lang: zh-tw
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

遵循這些高階建議來構建更安全的智能合約。

## 設計指南 {#design-guidelines}

在編寫任何程式碼之前，應提前討論合約的設計。

### 文件與規格 {#documentation-and-specifications}

文件可以分為不同層級編寫，並應在實作合約時進行更新：

- **系統的白話文描述**，說明合約的功能以及對程式碼庫的任何假設。
- **結構與架構圖**，包含合約互動與系統的狀態機。[斯立瑟印表機](https://github.com/crytic/slither/wiki/Printer-documentation)有助於產生這些結構圖。
- **詳盡的程式碼文件**，Solidity 可以使用 [NatSpec 格式](https://docs.soliditylang.org/en/develop/natspec-format.html)。

### 鏈上與鏈下運算 {#onchain-vs-offchain-computation}

- **盡可能將程式碼保持在鏈下。** 保持鏈上層精簡。在鏈下使用程式碼預先處理資料，使鏈上驗證變得簡單。你需要一個有序列表嗎？在鏈下對列表進行排序，然後只在鏈上檢查其順序。

### 可升級性 {#upgradeability}

我們在[部落格文章](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)中討論了不同的可升級性解決方案。在編寫任何程式碼之前，請審慎決定是否支援可升級性。這個決定將影響你組織程式碼的方式。一般來說，我們建議：

- **優先選擇[合約遷移](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)而非可升級性。** 遷移系統具有許多與可升級系統相同的優點，但沒有其缺點。
- **使用資料分離模式而非 delegatecallproxy 模式。** 如果你的專案有清晰的抽象分離，使用資料分離的可升級性只需要少數調整。delegatecallproxy 需要 EVM 專業知識，且極易出錯。
- **在部署前記錄遷移/升級程序。** 如果你必須在沒有任何指南的情況下承受壓力做出反應，你將會犯錯。提前寫下要遵循的程序。它應包含：
  - 啟動新合約的呼叫
  - 金鑰儲存的位置以及如何存取它們
  - 如何檢查部署！開發並測試部署後腳本。

## 實作指南 {#implementation-guidelines}

**力求簡單。** 始終使用符合你目的的最簡單解決方案。你團隊中的任何成員都應該能夠理解你的解決方案。

### 函式組合 {#function-composition}

你的程式碼庫架構應使程式碼易於審查。避免會降低推論其正確性能力的架構選擇。

- **拆分系統的邏輯**，透過多個合約或將相似的函式分組在一起（例如：身分驗證、算術等）。
- **編寫目的明確的小型函式。** 這將有助於更輕鬆地進行審查，並允許測試個別元件。

### 繼承 {#inheritance}

- **保持繼承易於管理。** 繼承應用於劃分邏輯，然而，你的專案應致力於最小化繼承樹的深度與廣度。
- **使用斯立瑟的[繼承印表機](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph)來檢查合約的階層結構。** 繼承印表機將幫助你審查階層結構的規模。

### 事件 {#events}

- **記錄所有關鍵操作的日誌。** 事件將有助於在開發期間對合約進行除錯，並在部署後對其進行監控。

### 避免已知陷阱 {#avoid-known-pitfalls}

- **了解最常見的安全問題。** 有許多線上資源可以學習常見問題，例如 [Ethernaut CTF](https://ethernaut.openzeppelin.com/)、[Capture the Ether](https://capturetheether.com/) 或 [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/)。
- **注意 [Solidity 文件](https://docs.soliditylang.org/en/latest/)中的警告章節。** 警告章節將告知你該語言中不明顯的行為。

### 依賴項目 {#dependencies}

- **使用經過充分測試的函式庫。** 從經過充分測試的函式庫匯入程式碼將降低你寫出充滿錯誤的程式碼的可能性。如果你想編寫 ERC-20 合約，請使用 [歐本齊柏林](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)。
- **使用依賴項目管理器；避免複製貼上程式碼。** 如果你依賴外部來源，那麼你必須使其與原始來源保持同步更新。

### 測試與驗證 {#testing-and-verification}

- **編寫詳盡的單元測試。** 廣泛的測試套件對於構建高品質軟體至關重要。
- **編寫 [斯立瑟](https://github.com/crytic/slither)、[埃奇德納](https://github.com/crytic/echidna)與[曼蒂科爾](https://github.com/trailofbits/manticore)的自訂檢查與屬性。** 自動化工具將有助於確保你的合約是安全的。檢閱本指南的其餘部分以了解如何編寫高效的檢查與屬性。
- **使用 [crytic.io](https://crytic.io/)。** Crytic 與 GitHub 整合，提供對私人斯立瑟偵測器的存取權限，並執行來自埃奇德納的自訂屬性檢查。

### Solidity {#solidity}

- **優先選擇 Solidity 0.5 而非 0.4 與 0.6。** 我們認為，Solidity 0.5 比 0.4 更安全且具有更好的內建實踐。Solidity 0.6 已被證明對生產環境來說過於不穩定，需要時間成熟。
- **使用穩定版本進行編譯；使用最新版本檢查警告。** 檢查你的程式碼在最新編譯器版本中沒有被回報問題。然而，Solidity 的發布週期很快，且有編譯器錯誤的歷史，因此我們不建議使用最新版本進行部署（請參閱斯立瑟的 [solc 版本建議](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)）。
- **不要使用行內組合語言 (inline assembly)。** 組合語言需要 EVM 專業知識。如果你還沒有_精通_黃皮書，請不要編寫 EVM 程式碼。

## 部署指南 {#deployment-guidelines}

一旦合約開發並部署完成：

- **監控你的合約。** 觀察日誌，並準備好在合約或錢包遭到入侵時做出反應。
- **將你的聯絡資訊新增至 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)。** 如果發現安全漏洞，此清單有助於第三方與你聯絡。
- **保護特權使用者的錢包。** 如果你將金鑰儲存在硬體錢包中，請遵循我們的[最佳實踐](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/)。
- **制定事件應變計畫。** 考慮到你的智能合約可能會遭到入侵。即使你的合約沒有錯誤，攻擊者也可能控制合約擁有者的金鑰。