---
title: 使用事件記錄智能合約的資料
description: 智能合約事件簡介以及如何使用它們來記錄資料
author: "jdourlens"
tags: ["智能合約", "remix", "solidity", "事件"]
skill: intermediate
breadcrumb: 事件日誌記錄
lang: zh-tw
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在 Solidity 中，[事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)是智能合約可以觸發的發送訊號。去中心化應用程式 (dapp) 或任何連接到以太坊 JSON-RPC API 的事物，都可以監聽這些事件並採取相應的行動。事件也可以被索引，以便日後可以搜尋事件歷史記錄。

## 事件 {#events}

在撰寫本文時，以太坊區塊鏈上最常見的事件是 Transfer 事件，當有人轉帳代幣時，ERC-20 代幣就會發出該事件。

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

事件簽章宣告在合約程式碼內部，並且可以使用 emit 關鍵字發出。例如，transfer 事件會記錄誰發送了轉帳（_from_）、發送給誰（_to_）以及轉帳了多少代幣（_value_）。

如果我們回到我們的 Counter 智能合約，並決定在每次數值更改時進行記錄。由於這個合約不打算被部署，而是作為透過擴展來建立另一個合約的基礎：它被稱為抽象合約。在我們的計數器範例中，它看起來會像這樣：

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // 無號整數型別的私有變數，用來記錄計數次數
    uint256 private count = 0;

    // 用來遞增計數器的函式
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // 用來取得計數值的 Getter
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

請注意：

- **第 5 行**：我們宣告了我們的事件及其包含的內容，即舊數值和新數值。

- **第 13 行**：當我們遞增 count 變數時，我們會發出該事件。

如果我們現在部署合約並呼叫 increment 函數，我們會看到，如果您點擊名為 logs 的陣列內部的新交易，Remix 將會自動顯示它。

![Remix screenshot](./remix-screenshot.png)

日誌對於除錯您的智能合約非常有用，但如果您建立供不同人使用的應用程式，它們也很重要，並且可以更輕鬆地進行分析，以追蹤和了解您的智能合約是如何被使用的。由交易產生的日誌會顯示在熱門的區塊瀏覽器中，例如，您也可以使用它們來建立鏈下腳本，以監聽特定事件並在事件發生時採取行動。