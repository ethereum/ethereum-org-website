---
title: "如何將泰勒設定為你的預言機"
description: "將泰勒預言機整合到你的協定中的入門指南"
author: "泰勒"
lang: zh-tw
tags: ["Solidity", "智能合約", "預言機"]
skill: beginner
breadcrumb: "泰勒預言機"
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

隨堂測驗：你的協定即將完成，但需要一個預言機來存取鏈下資料……你會怎麼做？

## (軟性) 先決條件 {#soft-prerequisites}

本文旨在讓存取預言機資料來源變得盡可能簡單明瞭。儘管如此，為了專注於預言機方面，我們對你的程式設計技能水準有以下假設。

假設：

- 你能夠操作終端機
- 你已安裝 npm
- 你知道如何使用 npm 來管理相依性套件

泰勒是一個即時且開源的預言機，隨時可供實作。這篇入門指南旨在展示啟動並執行泰勒有多麼容易，為你的專案提供一個完全去中心化且抗審查的預言機。

## 概覽 {#overview}

泰勒是一個預言機系統，各方可以請求鏈下資料點的值（例如 BTC/USD），而報告者會競爭將此值新增至鏈上資料庫中，供所有以太坊智能合約存取。這個資料庫的輸入由一個質押報告者網路來保護。泰勒利用加密經濟激勵機制，透過發行泰勒的代幣 Tributes (TRB) 以及爭議機制，來獎勵報告者誠實提交資料並懲罰惡意行為者。

在本教學中，我們將探討：

- 設定啟動並執行所需的初始工具組。
- 逐步演練一個簡單的範例。
- 列出目前可用來測試泰勒的網路測試網地址。

## UsingTellor {#usingtellor}

你要做的第一件事是安裝將泰勒作為預言機所需的基本工具。使用[此套件](https://github.com/tellor-io/usingtellor)來安裝泰勒使用者合約：

`npm install usingtellor`

安裝完成後，這將允許你的合約繼承「UsingTellor」合約中的函式。

太棒了！既然你已經準備好工具，讓我們來進行一個簡單的練習，擷取比特幣價格：

### BTC/USD 範例 {#btcusd-example}

繼承 UsingTellor 合約，並將泰勒地址作為建構函式引數傳遞：

這是一個範例：

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

如需完整的合約地址清單，請參閱[此處](https://docs.tellor.io/tellor/the-basics/contracts-reference)。

為了方便使用，UsingTellor 存放庫隨附了一個 [Tellor Playground](https://github.com/tellor-io/TellorPlayground) 合約版本，以便更輕鬆地進行整合。請參閱[此處](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)以取得實用函式清單。

如需更穩健的泰勒預言機實作，請在[此處](https://github.com/tellor-io/usingtellor/blob/master/README.md)查看可用函式的完整清單。