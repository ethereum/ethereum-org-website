---
title: "如何將 Tellor 設定為您的預言機"
description: "入門指南：將 Tellor 預言機整合至您的協定"
author: "Tellor"
lang: zh-tw
tags: [ "穩固", "智能合約", "預言機" ]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

隨堂測驗：您的協定即將完成，但需要一個預言機來存取鏈下資料...您該怎麼辦？

## (軟性) 先決條件 {#soft-prerequisites}

本篇文章旨在讓存取預言機資料流的過程盡可能簡單明瞭。 話雖如此，為了專注於預言機的相關內容，我們假設您具備以下程式設計能力。

假設：

- 您會使用終端機
- 您已安裝 npm
- 您知道如何使用 npm 來管理相依性

Tellor 是一個已上線且可供執行的開源預言機。 本入門指南將說明如何輕鬆啟用並執行 Tellor，為您的專案提供一個完全去中心化且抗審查的預言機。

## 概覽{#overview}

Tellor 是一個預言機系統，各方可以在系統中請求鏈下資料點 (例如 BTC/USD) 的值，而回報者則會競相將此值新增到鏈上資料庫，此資料庫可供所有以太坊智能合約存取。 此資料庫的輸入內容，由已質押回報者組成的網路保護。 Tellor 利用加密經濟激勵機制，獎勵誠實提交資料的回報者，並透過發行 Tellor 的代幣 Tributes (TRB) 以及爭議機制來懲罰惡意行為者。

在本教學中，我們將介紹：

- 設定您啟用與執行時所需的初始工具組。
- 逐步解說一個簡單範例。
- 列出目前可供測試 Tellor 的網路所使用的測試網位址。

## UsingTellor {#usingtellor}

您首先要做的是安裝使用 Tellor 作為預言機所需的基本工具。 使用[此套件](https://github.com/tellor-io/usingtellor) 來安裝 Tellor 使用者合約：

`npm install usingtellor`

安裝後，您的合約就能繼承「UsingTellor」合約中的函式。

太棒了！ 現在您已準備好工具，讓我們透過一個簡單的練習來擷取比特幣價格：

### BTC/USD 範例 {#btcusd-example}

繼承 UsingTellor 合約，並將 Tellor 位址作為建構函式引數傳入：

例如：

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //此合約現在可以存取 UsingTellor 中的所有函式

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

如需完整的合約位址清單，請參閱[此處](https://docs.tellor.io/tellor/the-basics/contracts-reference)。

為方便使用，UsingTellor 儲存庫隨附 [Tellor Playground](https://github.com/tellor-io/TellorPlayground) 合約版本，以簡化整合。 請參閱[此處](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)取得實用函式清單。

若要更穩健地執行 Tellor 預言機，請到[此處](https://github.com/tellor-io/usingtellor/blob/master/README.md)查看可用函式的完整清單。
