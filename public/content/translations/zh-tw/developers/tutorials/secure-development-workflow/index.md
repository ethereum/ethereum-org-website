---
title: 智慧型合約安全列清單
description: 一推薦程序來編輯安全智慧型合約
author: "Trailofbits"
tags: [ "智能合約", "安全性", "solidity" ]
skill: intermediate
lang: zh-tw
published: 2020-09-07
source: 建立安全合約
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## 智能合約開發檢查清單 {#smart-contract-development-checklist}

此為一推薦之高階程序來遵照當你編輯你的智慧型合約.

確認已知安全問題:

- 使用 [Slither](https://github.com/crytic/slither) 檢閱您的合約。 此具一40 內建偵查器來檢查常見程式漏洞. 運行其於各新程式之檢查點並確保此具有一清晰回報(或利用一分流模式來靜音某些問題).
- 使用 [Crytic](https://crytic.io/) 檢閱您的合約。 此確認Slither不包含之50額外問題. Crytic能幫助你的團隊來處於開發優勢, 藉由簡單來顯示安全物提於GitHub提取請求.

為你的合約考慮特殊規範:

- 你的合約是否可被升級? 使用 [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) 或 [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/) 檢查可升級性程式碼中的瑕疵。 我們已記錄17種可能導致失敗之升級方式.
- 你的合約是否聲稱符合ERCs標準? 使用 [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) 檢查。 此工具立即表示6項常見檢測指標觀點.
- 你是否與一第三方代幣互動? 在信賴外部合約前，請先檢閱我們的[代幣整合檢查清單](/developers/tutorials/token-integration-checklist/)。

可視重要安全特徵於你的合約程式:

- 檢閱 Slither 的 [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) 輸出器。 避免不經意之影覆蓋及C3線性化問題.
- 檢閱 Slither 的 [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) 輸出器。 此回報功能函數可視性及其訪問控制.
- 檢閱 Slither 的 [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) 輸出器。 此回報訪問控制及狀態變量.

紀錄重要安全特性並使用自動化測試生成者來判斷其:

- 學習如何[為您的程式碼記錄安全屬性](/developers/tutorials/guide-to-smart-contract-security-tools/)。 此剛開始極為困難, 但其為一最重要之活動來達成一良好安全結果. 此也為一基本要求來為任何先進技術於此教程.
- 在 Solidity 中定義安全屬性，以便與 [Echidna](https://github.com/crytic/echidna) 和 [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html) 一起使用。 專注於你的狀態機器, 訪問控制, 算數操作, 外部互動, 及基本一致性.
- 使用 [Slither 的 Python 應用程式介面 (API)](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) 定義安全屬性。 專注於繼承, 變量依據, 訪問控制, 及其他架構問題.
- 在每次提交時，使用 [Crytic](https://crytic.io) 執行您的屬性測試。 Crytic能消化及價值安全特性測試所以任何參與者於你開發團隊能簡單來查看其是否正確通過於GitHub. 失敗測試可能阻擋提議.

最終, 請留心自動工具無法簡單發現之問題:

- 隱私缺乏性: 所有參與者將能查看你的交易當其排隊於池內.
- 偷跑運行交易
- 加密操作
- 高風險互動與外部Defi部件

## 尋求協助 {#ask-for-help}

[以太坊辦公時間](https://calendly.com/dan-trailofbits/office-hours) 於每週二下午舉行。 此1小時, 1-對-1對應為一極佳機會來讓任何人來詢問關於安全, 道具使用憂慮, 並取得專家回報關於你的目前選擇方案. 我們將幫助你於此對應機會.

加入我們的 Slack：[Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw)。 我們永遠於#crytic 及 #ethereum通道如你有任何問題.
