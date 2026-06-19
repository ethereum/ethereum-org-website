---
title: 部署你的第一個智能合約
description: 在以太坊測試網路上部署第一個智能合約的簡介
author: "jdourlens"
tags:
  - 智能合約
  - remix
  - solidity
  - 部署
skill: beginner
breadcrumb: 部署第一個合約
lang: zh-tw
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

我想你和我們一樣，對於在以太坊區塊鏈上[部署](/developers/docs/smart-contracts/deploying/)並與你的第一個[智能合約](/developers/docs/smart-contracts/)互動感到非常興奮。

別擔心，因為這是我們的第一個智能合約，我們將把它部署在[本機測試網路](/developers/docs/networks/)上，這樣你就可以免費部署並盡情測試。

## 撰寫我們的合約 {#writing-our-contract}

第一步是[造訪 Remix](https://remix.ethereum.org/) 並建立一個新檔案。在 Remix 介面的左上方新增一個檔案，並輸入你想要的檔案名稱。

![Adding a new file in the Remix interface](./remix.png)

在新檔案中，我們將貼上以下程式碼。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // 型別為無號整數的公開變數，用來保存計數次數
    uint256 public count = 0;

    // 遞增我們計數器的函式
    function increment() public {
        count += 1;
    }

    // 非必要的 getter，用來取得計數值
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

如果你熟悉程式設計，你可以輕易猜出這個程式的作用。以下是逐行說明：

- 第 4 行：我們定義了一個名為 `Counter` 的合約。
- 第 7 行：我們的合約儲存了一個名為 `count` 的無號整數，初始值為 0。
- 第 10 行：第一個函式將修改合約的狀態，並 `increment()` 我們的變數 `count`。
- 第 15 行：第二個函式只是一個 getter（獲取器），以便能夠在智能合約外部讀取 `count` 變數的值。請注意，由於我們將 `count` 變數定義為 public（公開），這其實是不必要的，但在此作為範例展示。

這就是我們第一個簡單智能合約的全部內容。如你所知，它看起來就像 Java 或 C++ 等物件導向程式設計 (OOP) 語言中的類別 (class)。現在是時候來測試我們的合約了。

## 部署我們的合約 {#deploying-our-contract}

既然我們已經寫好了第一個智能合約，現在我們將把它部署到區塊鏈上，以便能夠與它互動。

[在區塊鏈上部署智能合約](/developers/docs/smart-contracts/deploying/)實際上只是發送一筆包含已編譯智能合約程式碼的交易，而不指定任何接收者。

我們首先點擊左側的編譯圖示來[編譯合約](/developers/docs/smart-contracts/compiling/)：

![The compile icon in the Remix toolbar](./remix-compile-button.png)

然後點擊編譯 (compile) 按鈕：

![The compile button in the Remix solidity compiler](./remix-compile.png)

你可以選擇勾選「Auto compile（自動編譯）」選項，這樣當你在文字編輯器中儲存內容時，合約就會自動編譯。

接著導覽至「deploy and run transactions（部署與執行交易）」畫面：

![The deploy icon in the Remix toolbar](./remix-deploy.png)

進入「deploy and run transactions」畫面後，再次確認你的合約名稱有出現，然後點擊 Deploy（部署）。正如你在頁面頂部所見，目前的環境是「JavaScript VM」，這意味著我們將在一個本機測試區塊鏈上部署並與我們的智能合約互動，以便能夠更快速地測試且無需支付任何手續費。

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

點擊「Deploy」按鈕後，你會看到你的合約出現在底部。點擊左側的箭頭將其展開，我們就能看到合約的內容。這包含了我們的變數 `counter`、我們的 `increment()` 函式以及 getter `getCounter()`。

如果你點擊 `count` 或 `getCount` 按鈕，它實際上會擷取合約中 `count` 變數的內容並顯示出來。由於我們尚未呼叫 `increment` 函式，它應該會顯示 0。

![The function button in the Remix solidity compiler](./remix-function-button.png)

現在讓我們點擊按鈕來呼叫 `increment` 函式。你會看到已執行交易的日誌出現在視窗底部。你會發現，當你按下按鈕來擷取資料時，日誌與按下 `increment` 按鈕時是不同的。這是因為在區塊鏈上讀取資料不需要任何交易（寫入）或手續費。因為只有修改區塊鏈的狀態才需要發起交易：

![A log of transactions](./transaction-log.png)

按下 increment（遞增）按鈕會產生一筆交易來呼叫我們的 `increment()` 函式，之後如果我們再次點擊 count 或 getCount 按鈕，我們將讀取到智能合約最新更新的狀態，此時 count 變數的值將大於 0。

![Newly updated state of the smart contract](./updated-state.png)

在下一個教學中，我們將介紹[如何為你的智能合約加入事件](/developers/tutorials/logging-events-smart-contracts/)。記錄事件日誌是除錯智能合約並了解呼叫函式時發生了什麼事的便利方法。