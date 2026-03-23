---
title: "使用事件記錄智能合約資料"
description: "智能合約事件簡介，以及如何使用它們來記錄資料"
author: "jdourlens"
tags: [ "smart contracts", "remix", "solidity", "events" ]
skill: intermediate
lang: zh-tw
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在 Solidity 中，[事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)是智能合約可以發出的信號。 去中心化應用程式或任何連接到 Ethereum JSON-RPC API 的東西，都可以監聽這些事件並採取相應的行動。 事件也可以被索引，以便日後可以搜尋事件歷史。

## Events {#events}

撰寫本文時，Ethereum 區塊鏈上最常見的事件是轉帳事件，當有人轉移代幣時，ERC20 代幣會發出此事件。

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

事件簽章在合約程式碼內部宣告，並可以使用 `emit` 關鍵字發出。 例如，轉帳事件記錄了誰發送了轉帳 (`_from`)、轉給誰 (`_to`) 以及轉移了多少代幣 (`_value`)。

如果我們回到我們的 Counter 智能合約，並決定在每次值變更時都進行記錄。 由於此合約並非用於部署，而是作為透過擴展來建立另一個合約的基礎：它被稱為抽象合約。 在我們的計數器範例中，它會是這個樣子：

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // 用於儲存計數的私有 unsigned int 變數
    uint256 private count = 0;

    // 增加計數器的函式
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // 用於取得計數值的 Getter 函式
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

請注意：

- **第 5 行**：我們宣告了我們的事件以及它包含的內容：舊值和新值。

- **第 13 行**：當我們遞增計數變數時，我們會發出事件。

如果我們現在部署合約並呼叫 increment 函式，我們會看到，如果你在名為 logs 的陣列中點擊新的交易，Remix 將會自動顯示它。

![Remix 螢幕截圖](./remix-screenshot.png)

日誌對於偵錯你的智能合約非常有用，但如果你建立供不同人使用的應用程式，它們也很重要，可以讓分析更容易，以追蹤和了解你的智能合約是如何被使用的。 交易產生的日誌會顯示在熱門的區塊瀏覽器中，你也可以使用它們來建立鏈下腳本，以監聽特定事件並在事件發生時採取行動。
