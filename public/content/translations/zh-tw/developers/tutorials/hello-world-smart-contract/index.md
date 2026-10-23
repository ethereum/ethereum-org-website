---
title: "初學者的 Hello World 智能合約"
description: "在以太坊上撰寫與部署簡單智能合約的入門教學。"
author: "elanh"
tags:
  - solidity
  - hardhat
  - alchemy
  - 智能合約
  - 部署
skill: beginner
breadcrumb: "Hello World 合約"
lang: zh-tw
published: 2021-03-31
---

如果你是區塊鏈開發的新手，不知道從何開始，或者你只是想了解如何部署智能合約並與之互動，那麼本指南就是為你準備的。我們將逐步介紹如何使用虛擬錢包 [梅塔馬斯克 (MetaMask)](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/)、[Hardhat](https://hardhat.org/) 和 [Alchemy](https://www.alchemy.com/eth) 在 Sepolia 測試網路上建立和部署一個簡單的智能合約（如果你還不明白這些是什麼意思，請不要擔心，我們將會解釋）。

一旦你的合約部署完成，你可以[為它建立一個使用者介面](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。

如果你在任何時候有疑問，請隨時在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中與我們聯絡！

## 第 1 步：連接到以太坊網路 {#step-1}

有許多方法可以向以太坊鏈發出請求。為了簡單起見，我們將在 Alchemy 上使用免費帳戶。Alchemy 是一個區塊鏈開發者平台與 API，允許我們與以太坊鏈通訊，而無需執行我們自己的節點。該平台還提供用於監控和分析的開發者工具，我們將在本教學中利用這些工具來了解智能合約部署在底層是如何運作的。如果你還沒有 Alchemy 帳戶，[可以在這裡免費註冊](https://dashboard.alchemy.com/signup)。

## 第 2 步：建立你的應用程式（與 API 金鑰） {#step-2}

建立 Alchemy 帳戶後，你可以透過建立應用程式來產生 API 金鑰。這將允許我們向 Sepolia 測試網路發出請求。如果你對測試網路不熟悉，請查看[此頁面](/developers/docs/networks/)。

1.  在導覽列中選擇「Select an app (選擇應用程式)」，然後點擊「Create new app (建立新應用程式)」，導覽至 Alchemy 儀表板中的「Create new app」頁面。

![Hello world create app](./hello-world-create-app.png)

2. 將你的應用程式命名為「Hello World」，提供簡短描述，並選擇一個使用案例，例如「Infra & Tooling (基礎設施與工具)」。接著，搜尋「Ethereum」並選擇網路。

![create app view hello world](./create-app-view-hello-world.png)

3. 點擊「Next (下一步)」繼續，然後點擊「Create app (建立應用程式)」，就完成了！你的應用程式應該會出現在導覽列的下拉式選單中，並提供可複製的 API 金鑰。

## 第 3 步：建立以太坊帳戶（地址） {#step-3}

我們需要一個以太坊帳戶來發送和接收交易。在本教學中，我們將使用 MetaMask，這是一個瀏覽器中的虛擬錢包，用於管理你的以太坊帳戶地址。了解更多關於[交易](/developers/docs/transactions/)的資訊。

你可以[在此處](https://metamask.io/download)免費下載 MetaMask 並建立一個以太坊帳戶。當你在建立帳戶時，或者如果你已經有一個帳戶，請確保使用網路下拉式選單切換到「Sepolia」測試網路（這樣我們就不會處理真實的資金）。

如果你沒有看到 Sepolia 列出，請打開右上角的選單，選擇「Networks (網路)」，並在網路列表底部開啟「Show test networks (顯示測試網路)」（請參閱 [MetaMask 關於查看測試網的指南](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)）。然後在網路選擇選單中選擇「Sepolia」。

![metamask sepolia example](./metamask-sepolia-example.png)

## 第 4 步：從水龍頭添加以太幣 {#step-4}

為了將我們的智能合約部署到測試網路，我們需要一些測試用的 ETH。要獲取 Sepolia ETH，你可以前往 [Sepolia 網路詳細資訊](/developers/docs/networks/#sepolia)查看各種水龍頭的列表。如果其中一個無法使用，請嘗試另一個，因為它們有時會枯竭。有些水龍頭有資格規則；例如，Alchemy 的 Sepolia 水龍頭要求接收地址在以太坊主網上至少持有 0.001 ETH。由於網路流量，接收你的測試用 ETH 可能需要一些時間。不久之後，你應該會在你的 MetaMask 帳戶中看到 ETH！

## 第 5 步：檢查你的餘額 {#step-5}

為了再次確認我們的餘額已入帳，讓我們使用 [Alchemy 的 composer 工具](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)發出 [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) 請求。這將回傳我們錢包中的 ETH 數量。輸入你的梅塔馬斯克 (MetaMask) 帳戶地址並點擊「Send Request (發送請求)」後，你應該會看到類似以下的響應：

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **注意：** 此結果的單位是 Wei 而不是 ETH。Wei 被用作以太幣的最小面額。Wei 到 ETH 的轉換為：1 eth = 10<sup>18</sup> Wei。因此，如果我們將 0x2B5E3AF16B1880000 轉換為十進位，我們會得到 5\*10¹⁸，這等於 5 ETH。
>
> 呼！我們的測試資金都在那裡了 <Emoji text=":money_mouth_face:" size={1} />。

## 第 6 步：初始化我們的專案 {#step-6}

首先，我們需要為我們的專案建立一個資料夾。導覽至你的命令列並輸入：

```sh
mkdir hello-world
cd hello-world
```

現在我們已經在專案資料夾中，我們將使用 `npm init` 來初始化專案。如果你尚未安裝 npm，請遵循 [Node.js 安裝說明](https://nodejs.org/en/download/)（本教學將需要 Node.js 和 npm）。

```sh
npm init
```

你如何回答安裝問題並不重要，以下是我們的做法供參考：

```console
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

核准 package.json。我們接下來要安裝的 Hardhat 3 僅支援 ES 模組專案，因此將專案標記為 ES 模組：

```sh
npm pkg set type=module
```

這樣我們就準備就緒了！

## 第 7 步：下載 [Hardhat](https://hardhat.org/docs/getting-started) {#step-7}

Hardhat 是一個用於編譯、部署、測試和除錯以太坊軟體的開發環境。它幫助開發者在部署到即時鏈之前，在本地端建立智能合約和去中心化應用程式 (dapp)。

Hardhat 3 需要 Node.js v22.13.0 或更高版本。在我們的 `hello-world` 專案中執行：

```sh
npm install --save-dev hardhat
```

查看此頁面以獲取有關[安裝說明](https://hardhat.org/docs/getting-started)的更多詳細資訊。

## 第 8 步：建立 Hardhat 專案 {#step-8}

執行 `npx hardhat --init` 會產生一個完整的範例專案，但為了本教學，我們將手動設定，以便你可以看到每個部分。在專案資料夾的根目錄中，建立一個名為 `hardhat.config.js` 的檔案，內容如下：

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

這是我們將指定專案所有設定的地方（在第 13 步）。目前，它只是告訴 Hardhat 要使用哪個版本的 Solidity 編譯器。

## 第 9 步：新增專案資料夾 {#step-9}

為了保持專案井然有序，我們將建立兩個新資料夾。在命令列中導覽至專案的根目錄並輸入：

```sh
mkdir contracts
mkdir scripts
```

- `contracts/` 是我們存放 hello world 智能合約程式碼檔案的地方
- `scripts/` 是我們存放用於部署和與合約互動的腳本的地方

## 第 10 步：撰寫我們的合約 {#step-10}

你可能會問自己，我們到底什麼時候才要寫程式碼？？好吧，我們現在到了第 10 步。

在你最喜歡的編輯器中打開 hello-world 專案（我們喜歡 [VSCode](https://code.visualstudio.com/)）。智能合約是用一種名為 Solidity 的語言撰寫的，這就是我們將用來撰寫 HelloWorld.sol 智能合約的語言。‌

1.  導覽至「contracts」資料夾並建立一個名為 HelloWorld.sol 的新檔案。
2.  以下是來自以太坊基金會的 Hello World 智能合約範例，我們將在本教學中使用它。將以下內容複製並貼上到你的 HelloWorld.sol 檔案中，並務必閱讀註解以了解此合約的作用：

```solidity
// SPDX-License-Identifier: MIT
// 指定 Solidity 的版本，使用語意化版本控制。
// 了解更多：https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// 定義一個名為 `HelloWorld` 的合約。
// 合約是函式與資料（其狀態）的集合。一旦部署，合約就會駐留在以太坊區塊鏈上的一個特定地址。了解更多：https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // 宣告一個型別為 `string` 的狀態變數 `message`。
   // 狀態變數是其值永久儲存在合約儲存空間中的變數。`public` 關鍵字使變數可從合約外部存取，並建立一個其他合約或客戶端可以呼叫以存取該值的函式。
   string public message;

   // 與許多基於類別的物件導向語言類似，建構子是一個特殊的函式，只在合約建立時執行。
   // 建構子用於初始化合約的資料。了解更多：https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // 接受一個字串引數 `initMessage`，並將該值設定到合約的 `message` 儲存變數中）。
      message = initMessage;
   }

   // 一個公開函式，接受一個字串引數並更新 `message` 儲存變數。
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

這是一個超級簡單的智能合約，它在建立時儲存一則訊息，並且可以透過呼叫 `update` 函式來更新。

## 第 11 步：將 MetaMask 與 Alchemy 連接到你的專案 {#step-11}

我們已經建立了一個 MetaMask 錢包、Alchemy 帳戶，並撰寫了我們的智能合約，現在是時候將這三者連接起來了。

從你的虛擬錢包發送的每筆交易都需要使用你獨特的私鑰進行簽章。為了向我們的程式提供此權限，我們可以安全地將我們的私鑰（以及 Alchemy API 金鑰）儲存在環境檔案中。

> 要了解更多關於發送交易的資訊，請查看[交易文件](/developers/docs/transactions/)。

在我們專案的根目錄中建立一個 `.env` 檔案，並將你的 MetaMask 私鑰和 HTTP Alchemy API URL 添加到其中。

- 遵循[這些說明](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)匯出你的私鑰
- 請參閱下方以獲取 HTTP Alchemy API URL

![get alchemy api key](./get-alchemy-api-key.png)

複製 Alchemy API URL

你的 `.env` 應該看起來像這樣：

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

為了實際將這些連接到我們的程式碼，我們將在第 13 步的 `hardhat.config.js` 檔案中引用這些變數。Node.js 可以自行讀取 `.env` 檔案，因此不需要安裝額外的套件。

<Alert variant="warning">
<AlertContent>
<AlertDescription>
不要提交 <code>.env</code>！請確保永遠不要與任何人分享或暴露你的 <code>.env</code> 檔案，因為這樣做會危及你的機密。如果你正在使用版本控制，請將你的 <code>.env</code> 添加到 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 檔案中。
</AlertDescription>
</AlertContent>
</Alert>

## 第 12 步：安裝 Ethers.js {#step-12-install-ethersjs}

Ethers.js 是一個函式庫，它透過將[標準 JSON-RPC 方法](/developers/docs/apis/json-rpc/)包裝成更使用者友善的方法，使與以太坊互動和發出請求變得更加容易。

Hardhat 使得整合[外掛程式 (Plugins)](https://hardhat.org/docs/plugins/official-plugins) 以獲得額外工具和擴充功能變得超級容易。我們將利用 [Ethers 外掛程式](https://hardhat.org/docs/plugins/hardhat-ethers)進行合約部署（[Ethers.js](https://docs.ethers.org/v6/) 有一些非常簡潔的合約部署方法）。

在你的專案目錄中輸入：

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

我們也將在下一步中將該外掛程式添加到我們的 `hardhat.config.js` 中。

## 第 13 步：更新 hardhat.config.js {#step-13-update-hardhatconfigjs}

到目前為止，我們已經添加了幾個相依套件和外掛程式，現在我們需要更新 `hardhat.config.js`，以便我們的專案知道它們的存在。

將你的 `hardhat.config.js` 更新為如下所示：

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// 如果 .env 檔案存在，則從中將 API_URL 和 PRIVATE_KEY 載入到 process.env 中
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` 告訴 Hardhat 僅在需要時才從環境變數中讀取每個值，因此像 `compile` 這樣的命令即使在設定值之前也能運作。如果你不想將私鑰保存在純文字檔案中，Hardhat 也可以[從加密的金鑰庫中讀取設定變數](https://hardhat.org/docs/guides/configuration-variables)。

## 第 14 步：編譯我們的合約 {#step-14-compile-our-contracts}

為了確保到目前為止一切運作正常，讓我們編譯我們的合約。`compile` 任務是內建的 Hardhat 任務之一。

從命令列執行：

```sh
npx hardhat compile
```

第一次編譯時，Hardhat 會下載 Solidity 編譯器。然後你應該會看到類似 `Compiled 1 Solidity file with solc 0.8.34` 的內容。如果沒有，你隨時可以在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中留言。

## 第 15 步：撰寫我們的部署腳本 {#step-15-write-our-deploy-scripts}

現在我們的合約已經寫好，設定檔也準備就緒，是時候撰寫我們的合約部署腳本了。

導覽至 `scripts/` 資料夾並建立一個名為 `deploy.js` 的新檔案，將以下內容添加到其中：

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// 開始部署，回傳一個解析為合約物件的 promise
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

讓我們來看看這些程式碼每一行的作用。

```js
const { ethers } = await network.create()
```

在 Hardhat 3 中，腳本會明確地開啟與網路的連線。當你執行腳本時，`network.create()` 會連接到你使用 `--network` 選項選擇的網路，而 `hardhat-ethers` 外掛程式會將一個 `ethers` 物件添加到該連線中。

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Ethers.js 中的 `ContractFactory` 是一個用於部署新智能合約的抽象概念，因此這裡的 `HelloWorld` 是我們 hello world 合約實例的工廠。當使用 `hardhat-ethers` 外掛程式時，`ContractFactory` 和 `Contract` 實例預設會連接到第一個簽署者。

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

在 `ContractFactory` 上呼叫 `deploy()` 將開始部署，並回傳一個解析為 `Contract` 的 `Promise`。這是一個為我們每個智能合約函式提供方法的物件。你傳遞給 `deploy()` 的參數會進入合約的建構函式，在這裡是初始訊息。

`waitForDeployment()` 會等待直到部署交易被包含在一個區塊中，而 `getAddress()` 會回傳新合約的地址。請參閱 [Ethers.js 合約文件](https://docs.ethers.org/v6/api/contract/)以獲取更多詳細資訊。

## 第 16 步：部署我們的合約 {#step-16-deploy-our-contract}

我們終於準備好部署我們的智能合約了！導覽至命令列並執行：

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

然後你應該會看到類似以下的內容：

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

如果我們前往 [Sepolia Etherscan](https://sepolia.etherscan.io/) 並搜尋我們的合約地址，我們應該能夠看到它已成功部署。交易看起來會像這樣：

![etherscan contract](./etherscan-contract.png)

`From` 地址應該與你的 MetaMask 帳戶地址相符，而 To 地址會顯示「Contract Creation (合約建立)」，但如果我們點擊進入交易，我們會在 `To` 欄位中看到我們的合約地址：

![etherscan transaction](./etherscan-transaction.png)

恭喜！你剛剛將一個智能合約部署到了以太坊鏈上 🎉

要了解底層發生了什麼事，你可以查看你的「Hello World」應用程式在 [Alchemy 儀表板](https://dashboard.alchemy.com/)中收到的請求。

在那裡，你會看到當我們呼叫 `.deploy()` 函式時，Hardhat/Ethers 在底層為我們發出的一些 JSON-RPC 呼叫。這裡要特別指出的兩個重要呼叫是 [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction)（這是實際將我們的合約寫入 Sepolia 鏈的請求）和 [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash)（這是一個根據雜湊讀取有關我們交易資訊的請求，這是發送交易時的典型模式）。要了解更多關於發送交易的資訊，請查看[交易文件](/developers/docs/transactions/)。

這就是本教學的全部內容。接下來，你可以[為你的合約建立一個使用者介面](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。
