---
title: "開始以太坊開發之旅"
description: "這是一份以太坊開發的入門指南。 我們將引導您完成建立 API 端點、發出命令列請求，到撰寫您的第一個 Web3 腳本！ 無需區塊鏈開發經驗！"
author: "Elan Halpern"
tags: [ "javascript", "ethers.js", "節點", "諮詢", "alchemy" ]
skill: beginner
lang: zh-tw
published: 2020-10-30
source: "中"
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![以太坊和 Alchemy 標誌](./ethereum-alchemy.png)

這是一份以太坊開發的入門指南。 在本教學中，我們將使用 [Alchemy](https://alchemyapi.io/)，這是一個領先的區塊鏈開發者平台，為 70% 的頂級區塊鏈應用程式 (包括 Maker、0x、MyEtherWallet、Dharma 和 Kyber) 的數百萬名使用者提供支援。 Alchemy 將讓我們能夠存取以太坊鏈上的 API 端點，以便我們讀取和寫入交易。

我們將引導您從註冊 Alchemy 到撰寫您的第一個 Web3 腳本！ 無需區塊鏈開發經驗！

## 1. 註冊免費的 Alchemy 帳戶 {#sign-up-for-a-free-alchemy-account}

建立 Alchemy 帳戶很簡單，[在此免費註冊](https://auth.alchemy.com/)。

## 2. 建立 Alchemy 應用程式 {#create-an-alchemy-app}

若要與以太坊鏈通訊並使用 Alchemy 的產品，您需要一個 API 金鑰來驗證您的請求。

您可以[從儀表板建立 API 金鑰](https://dashboard.alchemy.com/)。 若要建立新的金鑰，請如下所示導覽至「Create App」：

特別感謝 [_ShapeShift_](https://shapeshift.com/) _讓我們展示他們的儀表板！_

![Alchemy 儀表板](./alchemy-dashboard.png)

在「Create App」下填寫詳細資料，即可取得新的金鑰。 您也可以在此處看到您先前建立的應用程式，以及您團隊建立的應用程式。 按一下任何應用程式的「View Key」來擷取現有的金鑰。

![使用 Alchemy 建立應用程式的螢幕截圖](./create-app.png)

您也可以將游標懸停在「Apps」上並選取一個應用程式，來擷取現有的 API 金鑰。 您可以在此處「View Key」(檢視金鑰) 以及「Edit App」(編輯應用程式)，將特定網域加入白名單、查看多個開發者工具，以及檢視分析資料。

![顯示使用者如何擷取 API 金鑰的 Gif](./pull-api-keys.gif)

## 3 從命令列發出請求 {#make-a-request-from-the-command-line}

透過 Alchemy 使用 JSON-RPC 和 curl 與以太坊區塊鏈互動。

對於手動請求，我們建議透過 `POST` 請求與 `JSON-RPC` 互動。 只需傳入 `Content-Type: application/json` 標頭，並將您的查詢作為 `POST` 主體，並包含以下欄位：

- `jsonrpc`：JSON-RPC 版本—目前僅支援 `2.0`。
- `method`：ETH API 方法。 [請參閱 API 參考資料。](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`：要傳遞給方法的參數清單。
- `id`：您請求的 ID。 回應中將會傳回此 ID，以便您追蹤哪個回應屬於哪個請求。

以下是您可以從命令列執行的範例，用以擷取目前的 gas 價格：

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_\*\*注意：\*\*將 [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) 替換為您自己的 API 金鑰 `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`。_

**結果：**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4 設定您的 Web3 用戶端 {#set-up-your-web3-client}

\*\*如果您有現有的用戶端，\*\*請將您目前的節點提供者 URL 變更為帶有您 API 金鑰的 Alchemy URL：`“https://eth-mainnet.alchemyapi.io/v2/your-api-key\"`

**_注意：_** 下方的腳本需要在 **節點環境** 中執行，或 **儲存在檔案中** 執行，而非從命令列執行。 如果您尚未安裝 Node 或 npm，請查看這份快速的 [mac 版設定指南](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs)。

有許多 [Web3 程式庫](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)可以與 Alchemy 整合，但我們建議使用 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)，它是 web3.js 的直接替代品，其建構與設定可和 Alchemy 無縫協作。 這提供了多種優點，例如自動重試和強大的 WebSocket 支援。

若要安裝 AlchemyWeb3.js，請 **導覽至您的專案目錄** 並執行：

**使用 Yarn：**

```
yarn add @alch/alchemy-web3
```

**使用 NPM：**

```
npm install @alch/alchemy-web3
```

若要與 Alchemy 的節點基礎架構互動，請在 NodeJS 中執行或將此新增至 JavaScript 檔案：

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5 撰寫您的第一個 Web3 腳本！ {#write-your-first-web3-script}

現在，讓我們來實際動手做一點 Web3 程式設計，我們將撰寫一個簡單的腳本，從以太坊主網印出最新的區塊編號。

**1. 如果您尚未這麼做，請在您的終端機中建立一個新的專案目錄，並用 cd 進入該目錄：**

```
mkdir web3-example
cd web3-example
```

**2. 如果您尚未這麼做，請將 Alchemy Web3 (或任何 Web3) 相依性安裝到您的專案中：**

```
npm install @alch/alchemy-web3
```

**3. 建立一個名為 `index.js` 的檔案，並新增以下內容：**

> 最終您應該將 `demo` 替換為您的 Alchemy HTTP API 金鑰。

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

不熟悉非同步 (async) 相關內容？ 請參閱這篇 [Medium 文章](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c)。

**4. 使用 node 在您的終端機中執行它**

```
node index.js
```

**5. 您現在應該會在主控台中看到最新的區塊編號輸出！**

```
The latest block number is 11043912
```

**讚！** 恭喜！ 您剛使用 Alchemy 撰寫了您的第一個 Web3 腳本 🎉\*\*

不確定下一步要做什麼？ 試著部署您的第一個智能合約，並在我們的 [Hello World 智能合約指南](https://www.alchemy.com/docs/hello-world-smart-contract) 中實際動手進行一些 Solidity 程式設計，或使用 [儀表板示範應用程式](https://docs.alchemyapi.io/tutorials/demo-app) 來測試您的儀表板知識！

_[免費註冊 Alchemy](https://auth.alchemy.com/)、查看我們的[文件](https://www.alchemy.com/docs/)，以及如需最新消息，請在 [Twitter](https://twitter.com/AlchemyPlatform) 上追蹤我們_。
