---
title: "以太坊開發入門"
description: "這是一份以太坊開發入門的初學者指南。我們將帶你從建立 API 端點、發送命令列請求，到編寫你的第一個 Web3 腳本！無需任何區塊鏈開發經驗！"
author: "伊蘭·哈爾彭"
tags: ["JavaScript", "ethers.js", "節點", "查詢", "Alchemy"]
skill: beginner
breadcrumb: "入門"
lang: zh-tw
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

這是一份以太坊開發入門的初學者指南。在本教學中，我們將使用 [Alchemy](https://alchemyapi.io/)，這是一個領先的區塊鏈開發者平台，為前 70% 頂級區塊鏈應用程式（包括 Maker、0x、MyEtherWallet、Dharma 和 Kyber）的數百萬用戶提供支援。Alchemy 將為我們提供以太坊鏈上的 API 端點存取權限，以便我們能夠讀取和寫入交易。

我們將帶你從註冊 Alchemy 到編寫你的第一個 Web3 腳本！無需任何區塊鏈開發經驗！

## 1. 註冊免費的 Alchemy 帳戶 {#sign-up-for-a-free-alchemy-account}

註冊 Alchemy 帳戶非常簡單，[請在此免費註冊](https://auth.alchemy.com/)。

## 2. 建立 Alchemy 應用程式 {#create-an-alchemy-app}

為了與以太坊鏈通訊並使用 Alchemy 的產品，你需要一個 API 金鑰來驗證你的請求。

你可以[從儀表板建立 API 金鑰](https://dashboard.alchemy.com/)。要建立新的金鑰，請導覽至「Create App」（建立應用程式），如下所示：

特別感謝 [_ShapeShift_](https://shapeshift.com/) _讓我們展示他們的儀表板！_

![Alchemy dashboard](./alchemy-dashboard.png)

填寫「Create App」下的詳細資訊以獲取你的新金鑰。你也可以在這裡看到你之前建立的應用程式以及你團隊建立的應用程式。點擊任何應用程式的「View Key」（檢視金鑰）即可提取現有的金鑰。

![Create app with Alchemy screenshot](./create-app.png)

你也可以將滑鼠懸停在「Apps」（應用程式）上並選擇其中一個來提取現有的 API 金鑰。你可以在這裡「View Key」（檢視金鑰），也可以「Edit App」（編輯應用程式）以將特定網域加入白名單、查看多種開發者工具以及檢視分析數據。

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. 從命令列發送請求 {#make-a-request-from-the-command-line}

使用 JSON-RPC 和 curl 透過 Alchemy 與以太坊區塊鏈互動。

對於手動請求，我們建議透過 `POST` 請求與 `JSON-RPC` 互動。只需傳入 `Content-Type: application/json` 標頭，並將你的查詢作為 `POST` 主體，包含以下欄位：

- `jsonrpc`：JSON-RPC 版本——目前僅支援 `2.0`。
- `method`：ETH API 方法。[請參閱 API 參考文件。](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`：要傳遞給該方法的參數清單。
- `id`：你的請求 ID。將由回應傳回，以便你可以追蹤回應屬於哪個請求。

以下是一個你可以從命令列執行的範例，用於擷取目前的 Gas 價格：

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**注意：**請將 [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) 替換為你自己的 API 金鑰 `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`。_

**結果：**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. 設定你的 Web3 客戶端 {#set-up-your-web3-client}

<strong>如果你已有現成的客戶端，</strong>請將你目前的節點提供者 URL 變更為帶有你 API 金鑰的 Alchemy URL：`“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_注意：_** 以下腳本需要在 <strong>Node 環境</strong>中執行或**儲存在檔案中**，而不是從命令列執行。如果你尚未安裝 Node 或 npm，請查看這份快速的 [Mac 設定指南](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs)。

有許多 [Web3 函式庫](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)可以與 Alchemy 整合，不過，我們建議使用 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)，這是 Web3.js 的直接替代品，專為與 Alchemy 無縫運作而建置和設定。這提供了多種優勢，例如自動重試和強大的 WebSocket 支援。

要安裝 AlchemyWeb3.js，請**導覽至你的專案目錄**並執行：

**使用 Yarn：**

```
yarn add @alch/alchemy-web3
```

**使用 NPM：**

```
npm install @alch/alchemy-web3
```

要與 Alchemy 的節點基礎設施互動，請在 NodeJS 中執行或將此新增至 JavaScript 檔案中：

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. 編寫你的第一個 Web3 腳本！ {#write-your-first-web3-script}

現在讓我們動手進行一些 Web3 程式設計，我們將編寫一個簡單的腳本，印出以太坊主網的最新區塊號碼。

**1. 如果你還沒這麼做，請在終端機中建立一個新的專案目錄並進入該目錄：**

```
mkdir web3-example
cd web3-example
```

**2. 如果你尚未安裝，請將 Alchemy Web3（或任何 Web3）相依套件安裝到你的專案中：**

```
npm install @alch/alchemy-web3
```

**3. 建立一個名為 `index.js` 的檔案並加入以下內容：**

> 你最終應該將 `demo` 替換為你的 Alchemy HTTP API 金鑰。

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

對非同步（async）的內容不熟悉嗎？請查看這篇 [Medium 文章](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c)。

**4. 使用 Node 在終端機中執行它**

```
node index.js
```

**5. 你現在應該會在主控台中看到最新區塊號碼的輸出！**

```
The latest block number is 11043912
```

**太棒了！恭喜！你剛剛使用 Alchemy 編寫了你的第一個 Web3 腳本 🎉**

不知道接下來該做什麼？嘗試部署你的第一個智能合約，並在我們的 [Hello World 智能合約指南](https://www.alchemy.com/docs/hello-world-smart-contract)中動手進行一些 Solidity 程式設計，或者透過 [儀表板展示應用程式](https://docs.alchemyapi.io/tutorials/demo-app)測試你的儀表板知識！

_[免費註冊 Alchemy](https://auth.alchemy.com/)，查看我們的[文件](https://www.alchemy.com/docs/)，並在 [Twitter](https://twitter.com/AlchemyPlatform) 上追蹤我們以獲取最新消息_。