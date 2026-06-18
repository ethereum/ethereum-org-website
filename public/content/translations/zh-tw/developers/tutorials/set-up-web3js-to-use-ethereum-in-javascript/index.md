---
title: 在 JavaScript 中設定 Web3.js 以使用以太坊區塊鏈
description: 了解如何設定與配置 Web3.js 函式庫，以便從 JavaScript 應用程式與以太坊區塊鏈進行互動。
author: "jdourlens"
tags:
  - "web3.js"
  - "javascript"
skill: beginner
breadcrumb: Web3.js 設定
lang: zh-tw
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在本教學中，我們將了解如何開始使用 [Web3.js](https://web3js.readthedocs.io/) 與以太坊區塊鏈進行互動。Web3.js 可用於前端和後端，以從區塊鏈讀取資料、進行交易，甚至部署智能合約。

第一步是將 Web3.js 包含到你的專案中。若要在網頁中使用它，你可以使用像 JSDeliver 這樣的 CDN 直接匯入該函式庫。

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

如果你偏好安裝該函式庫以用於後端或使用建置工具的前端專案，你可以使用 npm 來安裝它：

```bash
npm install web3 --save
```

接著，若要將 Web3.js 匯入 Node.js 腳本或 Browserify 前端專案中，你可以使用以下 JavaScript 程式碼：

```js
const Web3 = require("web3")
```

既然我們已經將該函式庫包含在專案中，我們需要對其進行初始化。你的專案需要能夠與區塊鏈進行通訊。大多數的以太坊函式庫透過 RPC 呼叫與[節點](/developers/docs/nodes-and-clients/)進行通訊。為了初始化我們的 Web3 提供者 (provider)，我們將實例化一個 Web3 實例，並將提供者的 URL 作為建構函式傳遞。如果你在電腦上執行了一個節點或 [Ganache 實例](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)，它看起來會像這樣：

```js
const web3 = new Web3("http://localhost:8545")
```

如果你想直接存取託管節點，你可以在[節點即服務 (nodes as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service) 中找到相關選項。

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

為了測試我們是否正確配置了 Web3 實例，我們將嘗試使用 `getBlockNumber` 函式來擷取最新的區塊號碼。此函式接受一個回呼 (callback) 作為參數，並以整數形式回傳區塊號碼。

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

如果你執行這個程式，它將會簡單地印出最新的區塊號碼：區塊鏈的頂端。你也可以使用 `await/async` 函式呼叫，以避免在程式碼中巢狀使用回呼：

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

你可以在[官方 Web3.js 文件](https://docs.web3js.org/)中查看 Web3 實例上所有可用的函式。

大多數的 Web3 函式庫都是非同步的，因為在背景中，該函式庫會向節點發出 JSON-RPC 呼叫，然後節點會將結果傳送回來。

<Divider />

如果你在瀏覽器中進行開發，某些錢包會直接注入一個 Web3 實例，你應該盡可能嘗試使用它，特別是當你計畫與使用者的以太坊地址互動以進行交易時。

以下是偵測梅塔馬斯克 (MetaMask) 錢包是否可用，並在可用時嘗試啟用它的程式碼片段。這稍後將允許你讀取使用者的餘額，並讓他們能夠驗證你希望他們在以太坊區塊鏈上進行的交易：

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // 若有需要，請求帳戶存取權限
    await window.ethereum.enable()
    // 帳戶現已公開
  } catch (error) {
    // 使用者拒絕了帳戶存取權限...
  }
}
```

確實存在像 [Ethers.js](https://docs.ethers.io/) 這樣 Web3.js 的替代方案，而且它們也很常用。在下一個教學中，我們將了解[如何輕鬆監聽區塊鏈上新傳入的區塊並查看其內容](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/)。