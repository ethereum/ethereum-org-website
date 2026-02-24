---
title: "在 JavaScript 中設定 web3.js 以使用以太坊區塊鏈"
description: "了解如何設定與配置 web3.js 函式庫，以便從 JavaScript 應用程式與以太坊區塊鏈互動。"
author: "jdourlens"
tags: [ "web3.js", "javascript" ]
skill: beginner
lang: zh-tw
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在本教學中，我們將了解如何開始使用 [web3.js](https://web3js.readthedocs.io/) 來與以太坊區塊鏈互動。 Web3.js 可同時用於前端和後端，以從區塊鏈讀取資料、進行交易，甚至部署智能合約。

第一步是將 web3.js 引入您的專案。 若要在網頁中使用，您可以使用像 JSDeliver 這類的 CDN 來直接匯入該函式庫。

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

如果您偏好安裝函式庫，以便在後端或使用建置工具的前端專案中使用，您可以使用 npm 來安裝：

```bash
npm install web3 --save
```

然後，要將 Web3.js 匯入 Node.js 指令稿或 Browserify 前端專案，您可以使用下面這行 JavaScript 程式碼：

```js
const Web3 = require("web3")
```

現在我們已經將函式庫引入專案中，接著需要將其初始化。 您的專案需要能夠與區塊鏈通訊。 大多數以太坊函式庫透過 RPC 呼叫與[節點](/developers/docs/nodes-and-clients/)通訊。 為了啟動我們的 Web3 供應商，我們將實例化一個 Web3 執行個體，並將供應商的 URL 作為建構函式傳遞。 如果您電腦上有執行中的節點或 [ganache 執行個體](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)，它會看起來像這樣：

```js
const web3 = new Web3("http://localhost:8545")
```

如果您想直接存取託管節點，可以在[節點即服務](/developers/docs/nodes-and-clients/nodes-as-a-service)中找到選項。

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

為了測試我們是否正確地設定了 Web3 執行個體，我們將嘗試使用 `getBlockNumber` 函式來擷取最新的區塊號碼。 此函式接受一個回呼作為參數，並以整數形式傳回區塊號碼。

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

如果您執行此程式，它將只會印出最新的區塊號碼：也就是區塊鏈的頂端。 您也可以使用 `await/async` 函式呼叫，以避免在程式碼中出現巢狀回呼：

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

您可以在 [web3.js 官方文件](https://docs.web3js.org/)中，查看 Web3 執行個體上所有可用的函式。

大多數 Web3 函式庫都是非同步的，因為函式庫會在背景對節點進行 JSON-RPC 呼叫，而節點會傳回結果。

<Divider />

如果您是在瀏覽器中作業，有些錢包會直接注入一個 Web3 執行個體，您應該盡可能使用它，特別是當您打算與使用者的以太坊地址互動以進行交易時。

以下是偵測 MetaMask 錢包是否可用，並在可用時嘗試啟用的程式碼片段。 之後，您便能讀取使用者的餘額，並讓他們驗證您希望他們在以太坊區塊鏈上進行的交易：

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // 如有需要，請求帳戶存取權限
    await window.ethereum.enable()
    // 帳戶現已公開
  } catch (error) {
    // 使用者拒絕帳戶存取權限...
  }
}
```

web3.js 也有替代方案，例如 [Ethers.js](https://docs.ethers.io/)，而且也相當常用。 在下一個教學中，我們將會了解[如何在區塊鏈上輕鬆地監聽新傳入的區塊，並查看其內容](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/)。
