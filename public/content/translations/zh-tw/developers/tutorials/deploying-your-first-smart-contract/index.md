---
title: 部署你的第一個智能合約
description: 在以太坊測試網上部署你的第一個智能合約的簡介
author: "jdourlens"
tags: [ "智能合約", "remix", "穩固", "部署" ]
skill: beginner
lang: zh-tw
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

我想你和我們一樣興奮，都想在以太坊區塊鏈上[部署](/developers/docs/smart-contracts/deploying/)並與你的第一個[智能合約](/developers/docs/smart-contracts/)互動。

別擔心，因為這是我們的第一個智能合約，我們會在[本地測試網](/developers/docs/networks/)上部署它，所以你部署和盡情操作它都不需要任何費用。

## 撰寫我們的合約 {#writing-our-contract}

第一步是[訪問 Remix](https://remix.ethereum.org/) 並建立一個新檔案。 在 Remix 介面的左上角新增一個新檔案，並輸入你想要的檔案名稱。

![在 Remix 介面中新增檔案](./remix.png)

在新檔案中，我們將貼上以下程式碼：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // 公開的無正負號整數，用來記錄次數
    uint256 public count = 0;

    // 遞增計數器的函式
    function increment() public {
        count += 1;
    }

    // 取得計數值的 getter，非必要
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

如果你習慣寫程式，你應該可以輕易猜出這個程式的功能。 以下是逐行說明：

- 第 4 行：我們定義了一個名為 `Counter` 的合約。
- 第 7 行：我們的合約儲存一個名為 `count` 的無正負號整數，初始值為 0。
- 第 10 行：第一個函式會修改合約的狀態，並透過 `increment()` 遞增我們的 `count` 變數。
- 第 15 行：第二個函式只是一個 getter，用來從智能合約外部讀取 `count` 變數的值。 請注意，因為我們將 `count` 變數定義為 public (公開)，所以這不是必要的，只是作為範例展示。

這就是我們第一個簡單的智能合約。 你可能知道，它看起來像 Java 或 C++ 等物件導向程式設計 (OOP) 語言中的類別 (class)。 現在可以來操作我們的合約了。

## 部署我們的合約 {#deploying-our-contract}

既然我們寫好了第一個智能合約，現在就要將它部署到區塊鏈上，以便進行操作。

[在區塊鏈上部署智能合約](/developers/docs/smart-contracts/deploying/)，實際上只是傳送一筆交易，其中包含已編譯智能合約的程式碼，而無須指定任何接收者。

首先，我們要點擊左側的編譯圖示來[編譯合約](/developers/docs/smart-contracts/compiling/)：

![Remix 工具列中的編譯圖示](./remix-compile-button.png)

然後點擊編譯按鈕：

![Remix Solidity 編譯器中的編譯按鈕](./remix-compile.png)

你可以選擇「自動編譯」(Auto compile) 選項，這樣每當你在文字編輯器中儲存內容時，合約就會自動編譯。

然後前往「部署及執行交易」(deploy and run transactions) 畫面：

![Remix 工具列中的部署圖示](./remix-deploy.png)

進入「部署及執行交易」畫面後，再次確認你的合約名稱是否出現，然後點擊「部署」(Deploy)。 如你在頁面頂端所見，目前環境是「JavaScript VM」(JavaScript 虛擬機)，這代表我們將在一個本地測試鏈上部署我們的智能合約並與之互動，以便能更快地測試，且無須支付任何費用。

![Remix Solidity 編譯器中的部署按鈕](./remix-deploy-button.png)

點擊「部署」(Deploy) 按鈕後，你會在底部看到你的合約。 點擊左邊的箭頭將它展開，我們便能看到合約的內容。 這就是我們的 `count` 變數、`increment()` 函式和 `getCounter()` getter。

如果你點擊 `count` 或 `getCount` 按鈕，它會實際擷取合約的 `count` 變數內容並顯示出來。 因為我們還沒呼叫 `increment` 函式，所以它應該會顯示 0。

![Remix Solidity 編譯器中的函式按鈕](./remix-function-button.png)

現在讓我們點擊按鈕來呼叫 `increment` 函式。 你會在視窗底部看到所執行交易的紀錄。 你會發現，當你按下擷取資料的按鈕時，紀錄會與按下 `increment` 按鈕時不同。 這是因為在區塊鏈上讀取資料不需要任何交易 (寫入) 或費用。 因為只有修改區塊鏈的狀態才需要進行交易：

![交易紀錄](./transaction-log.png)

按下 increment 按鈕會產生一筆交易來呼叫我們的 `increment()` 函式，之後如果我們回頭點擊 count 或 getCount 按鈕，我們就會讀取到智能合約已更新的狀態，其中 count 變數的值會大於 0。

![智能合約已更新的狀態](./updated-state.png)

在下一篇教學中，我們將介紹[如何在你的智能合約中新增事件](/developers/tutorials/logging-events-smart-contracts/)。 記錄事件是個便利的方法，可以對你的智能合約進行除錯，並了解呼叫函式時發生了什麼事。
