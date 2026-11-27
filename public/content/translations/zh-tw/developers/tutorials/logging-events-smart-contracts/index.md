---
title: "使用事件記錄智能合約的資料"
description: "智能合約事件簡介以及如何使用它們來記錄資料"
author: "jdourlens"
tags: ["智能合約", "Remix", "Solidity", "事件"]
skill: intermediate
breadcrumb: "事件日誌記錄"
lang: zh-tw
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在 Solidity 中，[事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)是智能合約可以觸發的發送訊號。去中心化應用程式 (dapp) 或任何連接到以太坊 JSON-RPC API 的事物，都可以監聽這些事件並採取相應的行動。事件也可以被索引，以便日後可以搜尋事件歷史記錄。

## 事件 {#events}

以太坊區塊鏈上最常見的事件之一是 `Transfer` 事件，當有人轉帳代幣時，ERC-20 代幣就會觸發該事件。

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

事件簽章宣告在合約程式碼內部，並可以使用 emit 關鍵字來觸發。例如，轉帳事件會記錄誰發送了轉帳 (_from_)、發送給誰 (_to_) 以及轉帳了多少代幣 (_value_)。

讓我們回到[部署你的第一個智能合約](/developers/tutorials/deploying-your-first-smart-contract/)中的 `Counter` 智能合約，並在每次數值改變時記錄下來。它看起來會像這樣：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // 用來記錄計數次數的 unsigned int 型別公開變數
    uint256 public count = 0;

    // 用來遞增計數器的函式
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // 用來取得計數值的非必要 getter
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

請注意：

- **第 6 行**：我們宣告了我們的事件及其包含的內容，即舊數值和新數值。

- **第 14 行**：當我們遞增 count 變數時，我們會觸發該事件。

如果我們現在部署合約並呼叫 increment 函式，我們會看到，如果你點擊名為 logs 的陣列內的新交易，Remix 將會自動顯示它。

![Remix 螢幕截圖](./remix-screenshot.png)

日誌對於除錯智能合約非常有用，但如果你建立供不同人使用的應用程式，日誌也很重要，因為它們能讓你更輕鬆地進行分析，以追蹤和了解你的智能合約是如何被使用的。交易產生的日誌會顯示在熱門的區塊瀏覽器中，例如，你也可以使用它們來建立鏈下腳本，以監聽特定事件並在事件發生時採取行動。
