---
title: "智慧型合約安全指南"
description: "一安全指南列表來介紹如何考慮安全當建立你個人Dapp"
author: "Trailofbits"
tags: [ "solidity", "smart contracts", "security" ]
skill: intermediate
lang: zh-tw
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

遵照以下高階推薦來建立一更加安全之智慧型合約.

## 設計準則 {#design-guidelines}

智慧型合約設計應被事前討論, 遠早於任何程式被編輯前.

### 文件與規範 {#documentation-and-specifications}

文檔能被編輯於多重等級, 並需備更新當被導入合約時:

- **以淺顯易懂的英文描述系統**，說明合約的功能以及對程式碼庫的任何假設。
- **綱要與架構圖**，包括合約互動和系統的狀態機器。 [Slither printers](https://github.com/crytic/slither/wiki/Printer-documentation) 可協助產生這些綱要。
- **詳盡的程式碼文件**，Solidity 可使用 [Natspec 格式](https://docs.soliditylang.org/en/develop/natspec-format.html)。

### 鏈上與鏈外運算 {#onchain-vs-offchain-computation}

- \*\*盡可能將程式碼保持在鏈外。\*\*保持鏈上層的精簡。 以鏈外程式碼預先處理資料，使鏈上驗證更簡單。 你需要一採購列表嗎? 排列鏈下列表, 並只查看先前老舊之鏈上資訊.

### 可升級性 {#upgradeability}

我們在[我們的部落格文章](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)中討論了不同的可升級性解決方案。 編輯程式前, 先意識決定來支持或非支持此更新能力. 這個決定將會影響您架構程式碼的方式。 通常上來說, 我們推薦:

- \*\*優先選擇[合約遷移](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)，而非可升級性。\*\*遷移系統擁有許多與可升級系統相同的優點，但沒有其缺點。
- \*\*使用資料分離模式，而非 delegatecallproxy 模式。\*\*如果您的專案有清楚的抽象分離，使用資料分離的可升級性將只需要少許調整。 Delegatecallproxy 系統要求EVM專家, 且其具高錯誤率.
- \*\*在部署前記錄遷移/升級程序。\*\*如果您必須在沒有任何指導方針的壓力下做出反應，就會犯錯。 事前編輯一程式步驟. 此應包含:
  - 一調用來展開一新合約
  - 鑰鍵儲存場所及入手方式
  - 解釋如何查看部署! 開發並測試一部署後腳本

## 實作準則 {#implementation-guidelines}

\*\*力求簡單。\*\*永遠使用符合您目的最簡單的解決方案。 團隊任何成員應全員了解你的方案.

### 函式組合 {#function-composition}

你數據庫之構成結構應使程式能被簡單閱讀. 避免程式結構降低閱讀正確率.

- **分割您系統的邏輯**，可以透過多個合約或將相似的函式分組（例如，驗證、算術...）來達成。
- \*\*撰寫目的明確的小函式。\*\*這將有助於簡化審查，並允許對個別組件進行測試。

### 繼承 {#inheritance}

- \*\*保持繼承的可管理性。\*\*繼承應用來分割邏輯，但是，您的專案應致力於最小化繼承樹的深度和廣度。
- \*\*使用 Slither 的 [inheritance printer](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) 檢查合約的層次結構。\*\*inheritance printer 將幫助您檢視層次結構的大小。

### Events {#events}

- \*\*記錄所有關鍵操作。\*\*事件將有助於在開發期間對合約進行偵錯，並在部署後對其進行監控。

### 避免已知的陷阱 {#avoid-known-pitfalls}

- \*\*注意最常見的安全性問題。\*\*有許多線上資源可以學習常見問題，例如 [Ethernaut CTF](https://ethernaut.openzeppelin.com/)、[Capture the Ether](https://capturetheether.com/) 或 [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/)。
- \*\*注意 [Solidity 文件](https://docs.soliditylang.org/en/latest/)中的警告部分。\*\*警告部分會告知您該語言中不甚明顯的行為。

### 相依性 {#dependencies}

- \*\*使用經過良好測試的程式庫。\*\*從經過良好測試的程式庫匯入程式碼將降低您編寫有錯誤程式碼的可能性。 如果您想編寫 ERC20 合約，請使用 [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)。
- \*\*使用相依性管理員；避免複製貼上程式碼。\*\*如果您依賴外部來源，那麼您必須使其與原始來源保持同步。

### 測試與驗證 {#testing-and-verification}

- \*\*撰寫詳盡的單元測試。\*\*一個廣泛的測試套件對於建構高品質軟體至關重要。
- \*\*撰寫 [Slither](https://github.com/crytic/slither)、[Echidna](https://github.com/crytic/echidna) 和 [Manticore](https://github.com/trailofbits/manticore) 的自訂檢查和屬性。\*\*自動化工具將有助於確保您的合約安全。 回顧此指南其他部分來學習如何編輯一有效查看及屬性.
- **使用 [crytic.io](https://crytic.io/)。** Crytic 與 GitHub 整合，提供對私有 Slither 偵測器的存取權限，並從 Echidna 執行自訂屬性檢查。

### Solidity {#solidity}

- \*\*優先使用 Solidity 0.5，而非 0.4 和 0.6。\*\*在我們看來，Solidity 0.5 比 0.4 更安全，並具有更好的內建實踐。 Solidity 0.6已被證實其於實際生成還未安全, 並需要些時間來發展成熟.
- \*\*使用穩定版本進行編譯；使用最新版本檢查警告。\*\*請檢查您的程式碼在最新的編譯器版本中沒有回報任何問題。 然而，Solidity 的發佈週期很快，且有編譯器錯誤的歷史，因此我們不建議使用最新版本進行部署（請參閱 Slither 的 [solc 版本建議](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)）。
- \*\*不要使用內嵌組合語言。\*\*組合語言需要 EVM 專業知識。 如果您還沒有_精通_黃皮書，請不要編寫 EVM 程式碼。

## 部署準則 {#deployment-guidelines}

一旦合約被開發及部署:

- \*\*監控您的合約。\*\*觀察日誌，並準備好在合約或錢包遭到入侵時做出反應。
- \*\*將您的聯絡資訊新增至 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)。\*\*如果發現安全性漏洞，此列表有助於第三方與您聯絡。
- \*\*保護特權使用者的錢包。\*\*如果您將金鑰儲存在硬體錢包中，請遵循我們的[最佳實踐](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/)。
- \*\*制定事件應變計畫。\*\*請考慮到您的智慧合約可能會受到損害。 即使合約本身無任何bug, 一攻擊者還是可能嘗試掌控合約持有者之密鑰.
