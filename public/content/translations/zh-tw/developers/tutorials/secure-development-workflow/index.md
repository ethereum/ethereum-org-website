---
title: "智能合約安全檢查清單"
description: "撰寫安全智能合約的建議工作流程"
author: "Trailofbits"
tags:
  - 智能合約
  - 安全
  - solidity
skill: intermediate
breadcrumb: "安全檢查清單"
lang: zh-tw
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## 智能合約開發檢查清單 {#smart-contract-development-checklist}

以下是我們建議在撰寫智能合約時遵循的高階流程。

檢查已知的安全問題：

- 使用 [斯立瑟](https://github.com/crytic/slither) 審查你的合約。它內建了超過 40 種常見漏洞的偵測器。在每次提交新程式碼時執行它，並確保獲得無漏洞的報告（或使用分類模式來忽略特定問題）。
- 使用 [Crytic](https://crytic.io/) 審查你的合約。它會檢查 50 個斯立瑟未涵蓋的問題。Crytic 也能透過在 GitHub 的拉取請求 (Pull Request) 中輕鬆呈現安全問題，幫助你的團隊隨時掌握彼此的狀況。

考慮合約的特殊功能：

- 你的合約是否可升級？使用 [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) 或 [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/) 審查你的升級程式碼是否存在缺陷。我們已經記錄了 17 種升級可能出錯的情況。
- 你的合約是否聲稱符合 ERC 標準？使用 [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) 檢查它們。這個工具能立即找出與六種常見規格不符的地方。
- 你是否整合了第三方代幣？在依賴外部合約之前，請先審查我們的[代幣整合檢查清單](/developers/tutorials/token-integration-checklist/)。

視覺化檢查程式碼的關鍵安全特徵：

- 審查斯立瑟的 [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) 列印工具。避免無意間的變數遮蔽 (shadowing) 和 C3 線性化問題。
- 審查斯立瑟的 [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) 列印工具。它會報告函式可見性與存取控制。
- 審查斯立瑟的 [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) 列印工具。它會報告狀態變數的存取控制。

記錄關鍵的安全屬性，並使用自動化測試產生器來評估它們：

- 學習[為你的程式碼記錄安全屬性](/developers/tutorials/guide-to-smart-contract-security-tools/)。這起初很困難，但卻是獲得良好成果最重要的一項活動。這也是使用本教學中任何進階技術的先決條件。
- 在 Solidity 中定義安全屬性，以便與 [埃奇德納](https://github.com/crytic/echidna) 和 [曼蒂科爾](https://manticore.readthedocs.io/en/latest/verifier.html) 搭配使用。專注於你的狀態機、存取控制、算術運算、外部互動以及標準一致性。
- 使用 [斯立瑟的 Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) 定義安全屬性。專注於繼承、變數依賴性、存取控制及其他結構性問題。
- 在每次提交時使用 [Crytic](https://crytic.io) 執行你的屬性測試。Crytic 可以接收並評估安全屬性測試，讓團隊中的每個人都能在 GitHub 上輕鬆看到測試通過。失敗的測試可以阻擋提交。

最後，請留意自動化工具難以輕易發現的問題：

- 缺乏隱私：當你的交易在交易池中排隊時，其他人都能看到它們
- 搶先交易 (Front running)
- 密碼學運算
- 與外部去中心化金融 (DeFi) 元件的高風險互動

## 尋求協助 {#ask-for-help}

[以太坊辦公時間](https://calendly.com/dan-trailofbits/office-hours)在每週二下午進行。這些為期 1 小時的一對一會議是一個好機會，你可以向我們詢問任何有關安全的問題、使用我們的工具進行疑難排解，並從專家那裡獲得對你目前方法的反饋。我們將協助你完成本指南。

加入我們的 Slack：[Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw)。如果你有任何問題，我們隨時都在 #crytic 和 #ethereum 頻道為你解答。