---
title: "給初學者的 Hello World 智能合約"
description: "在以太坊上撰寫和部署簡單智能合約的入門教學。"
author: "elanh"
tags: [ "solidity", "hardhat", "alchemy", "smart contracts", "deploying" ]
skill: beginner
breadcrumb: "Hello World合約"
lang: zh-tw
published: 2021-03-31
---

如果你是區塊鏈開發新手，不知道從何開始，或者你只是想了解如何部署智能合約並與之互動，本指南就是為你準備的。 我們將使用虛擬錢包 [MetaMask](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org/) 和 [Alchemy](https://www.alchemy.com/eth) 逐步說明如何在 Sepolia 測試網上建立和部署一個簡單的智能合約 (如果你還不了解這些術語的含義，別擔心，我們會解釋的)。

在本教學的[第 2 部分](https://docs.alchemy.com/docs/interacting-with-a-smart-contract)中，我們將介紹部署後如何與我們的智能合約互動，並在[第 3 部分](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)中介紹如何在 Etherscan 上發布它。

如果你有任何問題，隨時可以在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中提問！

## 第 1 步：連接到以太坊網路 {#step-1}

向以太坊鏈發出請求有很多種方式。 為求簡單，我們將使用 Alchemy 的免費帳戶，它是一個區塊鏈開發者平台暨 API，讓我們不用運行自己的節點，就能與以太坊鏈通訊。 該平台還提供用於監控和分析的開發者工具，我們將在本教學中利用這些工具來了解我們智能合約部署的底層情況。 如果你還沒有 Alchemy 帳戶，可以[在這裡免費註冊](https://dashboard.alchemy.com/signup)。

## 第 2 步：創建你的應用程式 (和 API 金鑰) {#step-2}

一旦你已經創建好一個Alchemy的帳戶，你可以通過建立一個程式來生成一個API鑰匙。 這將讓我們能向 Sepolia 測試網發出請求。 如果你不熟悉測試網，請查看[此頁面](/developers/docs/networks/)。

1. 在你的 Alchemy 儀表板中，導覽至「Create new app」頁面，方法是在導覽列中選擇「Select an app」，然後點擊「Create new app」。

![Hello world 創建應用程式](./hello-world-create-app.png)

2. 將你的應用程式命名為「Hello World」，提供簡短描述，並選擇一個使用案例，例如「Infra & Tooling」。 接著，搜尋「Ethereum」並選擇網路。

![創建應用程式檢視 hello world](./create-app-view-hello-world.png)

3. 點擊「Next」繼續，然後點擊「Create app」，就完成了！ 你的應用程式應該會出現在導覽列的下拉式選單中，並提供可供複製的 API 金鑰。

## 第 3 步：建立一個以太坊帳戶 (地址) {#step-3}

我們需要一個乙太坊帳戶去接收或發送交易。 為此教學，我們將會使用 MetaMask。它是一個在瀏覽器上管理你的乙太坊帳戶地址的虛擬錢包。 更多關於[交易](/developers/docs/transactions/)的資訊。

你可以[在這裡](https://metamask.io/download)免費下載 MetaMask 並建立一個以太坊帳戶。 當你在建立帳戶時，或者如果你已經有帳戶，請務必使用網路下拉式選單切換到「Sepolia」測試網 (這樣我們就不用處理真實貨幣)。

如果你沒有看到 Sepolia 列出，請進入選單，然後到「Advanced」，向下捲動以開啟「Show test networks」。 在網路選擇選單中，選擇「Custom」分頁以尋找測試網列表，然後選擇「Sepolia」。

![metamask sepolia 範例](./metamask-sepolia-example.png)

## 第 4 步：從水龍頭獲取以太幣 {#step-4}

為了將我們的智能合約部署到測試網，我們需要一些假的 Eth。 要取得 Sepolia ETH，你可以前往 [Sepolia 網路詳細資料](/developers/docs/networks/#sepolia)來查看各種水龍頭的列表。 如果其中一個不能用，試試另一個，因為它們有時可能會用完。 由於網路流量的關係，可能需要一些時間才能收到你的假 ETH。 不久之後，你應該會在你的 Metamask 帳戶中看到 ETH！

## 第 5 步：檢查你的餘額 {#step-5}

為再次確認我們的餘額，讓我們使用 [Alchemy 的 composer tool](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) 發出一個 [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) 請求。 這將會回傳你的錢包裡的餘額。 在你輸入自己的MetaMask帳戶地址，並且點下「寄送請求」後，你理應會看見一個這樣子的回應：

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **注意：**此結果以 wei 為單位，而非 ETH。 Wei是一個被用來計算以太最少分數的單位。 wei 與 ETH 的換算為：1 eth = 10<sup>18</sup> wei。 因此，如果我們將 0x2B5E3AF16B1880000 轉換為十進位，我們會得到 5\*10¹⁸，相當於 5 ETH。
>
> 哈! 我們的假錢都在這裡了 <Emoji text=":money_mouth_face:" size={1} />。

## 第 6 步：初始化我們的專案 {#step-6}

首先，我們需要一個資料夾給我們的專案。 前往到你的指令介面(powershell, cmd 或 Terminal) 接著輸入:

```
mkdir hello-world
cd hello-world
```

現在我們在專案資料夾中了，我們將使用 `npm init` 來初始化專案。 如果你還沒有安裝 npm，請遵循[這些說明](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (我們也需要 Node.js，所以也請下載它！)。

```
npm init
```

你如何回答安裝問題並不重要，以下是我們的做法，僅供參考：

```
套件名稱：(hello-world)
版本：(1.0.0)
描述：hello world 智能合約
進入點：(index.js)
測試指令：
git 儲存庫：
關鍵字：
作者：
授權：(ISC)
即將寫入 /Users/.../.../.../hello-world/package.json：

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world 智能合約",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

核准 package.json，我們就可以開始了！

## 第 7 步：下載 [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat 是一個開發環境，提供你去編譯、部屬、測試、以及除錯你的以太坊軟體。 它能協助開發人員在部署至即時鏈之前，於本機建立智慧合約和去中心化應用程式。

在我們的 `hello-world` 專案中執行：

```
npm install --save-dev hardhat
```

如需更多[安裝指示](https://hardhat.org/getting-started/#overview)的詳細資訊，請查看此頁面。

## 第 8 步：建立 Hardhat 專案 {#step-8}

在你的專案資料夾下執行：

```
npx hardhat
```

你接下來會看到歡迎訊息以及關於你想做什麼的選項。 選擇"create an empty hardhat.config.js":

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 歡迎來到 Hardhat v2.0.11 👷‍

你想做什麼？…
建立範例專案
❯ 建立一個空的 hardhat.config.js
退出
```

這會為我們產生一個 `hardhat.config.js` 檔案，我們將在其中指定專案的所有設定 (在第 13 步)。

## 第 9 步：新增專案資料夾 {#step-9}

為了讓我們的專案井然有序，我們將建立兩個新資料夾。 在你的指令介面返回到到專案資料夾，接著輸入：

```
mkdir contracts
mkdir scripts
```

- `contracts/` 是我們存放 hello world 智能合約程式碼檔案的地方
- `scripts/` 是我們存放部署和與合約互動的腳本的地方

## 第 10 步：撰寫我們的合約 {#step-10}

你可能會問自己，我們到底什麼時候才要寫程式碼？ 嗯，我們現在就在第 10 步。

在你喜歡的編輯器中打開 hello-world 專案 (我們喜歡 [VSCode](https://code.visualstudio.com/))。 智能合約是以一種稱為 Solidity 的語言編寫的，我們將用它來編寫我們的 HelloWorld.sol 智能合約。‌

1. 導覽至「contracts」資料夾並建立一個名為 HelloWorld.sol 的新檔案。
2. 以下是來自以太坊基金會的 Hello World 智能合約範例，我們將在本教學中使用它。 複製並貼上下方內容到你的 HelloWorld.sol 檔案中，並務必閱讀註解以了解此合約的功能：

```solidity
// 指定 Solidity 的版本，使用語意化版本。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// 定義一個名為 `HelloWorld` 的合約。
// 合約是函式和資料 (其狀態) 的集合。一旦部署，合約就會位於以太坊區塊鏈上的特定地址。了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // 宣告一個 `string` 型別的狀態變數 `message`。
   // 狀態變數是其值永久儲存在合約儲存空間中的變數。關鍵字 `public` 使變數可從合約外部存取，並建立一個其他合約或用戶端可以呼叫以存取該值的函式。
   string public message;

   // 與許多以類別為基礎的物件導向語言類似，建構函式是一個特殊函式，只在合約建立時執行。
   // 建構函式用於初始化合約的資料。了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 接受一個字串引數 `initMessage`，並將其值設定到合約的 `message` 儲存變數中。
      message = initMessage;
   }

   // 一個公開函式，接受一個字串引數並更新 `message` 儲存變數。
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

這是一個非常簡單的智能合約，它在建立時儲存一則訊息，並可以透過呼叫 `update` 函式進行更新。

## 第 11 步：將 MetaMask 和 Alchemy 連接到你的專案 {#step-11}

我們已經建立了 MetaMask 錢包、Alchemy 帳戶，並編寫了我們的智能合約，現在是時候將這三者連接起來了。

每一個從你的虛擬錢包送出的交易都需要用你的私鑰簽名。 為了給予程式這個權限，我們可以把私鑰（還有 Alchemy API key）存在環境檔案中。

> 若要深入了解傳送交易，請參閱這篇關於使用 web3 傳送交易的[教學文章](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)。

首先，安裝 dotenv 套件。

```
npm install dotenv --save
```

然後，在我們專案的根目錄中建立一個 `.env` 檔案，並在其中新增您的 MetaMask 私鑰和 HTTP Alchemy API URL。

- 遵循[這些說明](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)匯出你的私鑰
- 請參閱下文以取得 HTTP Alchemy API URL

![取得 alchemy api 金鑰](./get-alchemy-api-key.png)

複製 Alchemy API URL

你的 `.env` 應該看起來像這樣：

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/你的-api-金鑰"
PRIVATE_KEY = "你的-metamask-私鑰"
```

為了實際將這些連接到我們的程式碼，我們將在第 13 步的 `hardhat.config.js` 檔案中引用這些變數。

<Alert variant="warning">
<AlertContent>
<AlertDescription>
不要提交 <code>.env</code>！ 請務必不要與任何人分享或洩露您的 <code>.env</code> 檔案，因為這樣做會洩露您的機密。 如果您正在使用版本控制，請將您的 <code>.env</code> 新增到 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 檔案中。
</AlertDescription>
</AlertContent>
</Alert>

## 第 12 步：安裝 Ethers.js {#step-12-install-ethersjs}

Ethers.js 是一個函式庫，它將[標準 JSON-RPC 方法](/developers/docs/apis/json-rpc/)包裝成更方便使用者使用的方法，讓與以太坊互動和發出請求變得更簡單。

Hardhat 讓整合[外掛程式](https://hardhat.org/plugins/)以取得額外工具和擴充功能變得超級簡單。 我們將利用 [Ethers plugin](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) 進行合約部署 ([Ethers.js](https://github.com/ethers-io/ethers.js/) 有一些非常簡潔的合約部署方法)。

在你的專案目錄輸入：

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

我們也將在下一步的 `hardhat.config.js` 中引入 ethers。

## 第 13 步：更新 hardhat.config.js {#step-13-update-hardhatconfigjs}

我們目前已經新增了幾個相依套件和外掛程式，現在我們需要更新 `hardhat.config.js`，讓我們的專案知道它們全部。

將你的 `hardhat.config.js` 更新成如下所示：

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## 第 14 步：編譯我們的合約 {#step-14-compile-our-contracts}

為了確認一切運作正常，我們來編譯合約。 `compile` 任務是內建的 hardhat 任務之一。

在命令列工具輸入：

```
npx hardhat compile
```

你可能會收到關於 `SPDX license identifier not provided in source file` 的警告，但不用擔心——希望其他一切都看起來沒問題！ 如果沒有，您隨時可以在 [Alchemy discord](https://discord.gg/u72VCg3) 中傳送訊息。

## 第 15 步：編寫我們的部署腳本 {#step-15-write-our-deploy-scripts}

現在我們已經寫好了合約，並且也搞定配置檔案。現在我們該來撰寫部署合約的腳本。

導覽至 `scripts/` 資料夾並建立一個名為 `deploy.js` 的新檔案，將以下內容加入其中：

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // 開始部署，回傳一個解析為合約物件的 promise
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("合約已部署至地址：", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat 在其[合約教學文章](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)中詳細地解釋了每一行程式碼的作用，我們在此採用了他們的解釋。

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js 中的 `ContractFactory` 是用於部署新智能合約的抽象，因此這裡的 `HelloWorld` 是我們 hello world 合約實例的工廠。 使用 `hardhat-ethers` 外掛程式時，`ContractFactory` 和 `Contract` 實例預設會連接到第一個簽署者。

```
const hello_world = await HelloWorld.deploy();
```

在 `ContractFactory` 上呼叫 `deploy()` 將開始部署，並回傳一個解析為 `Contract` 的 `Promise`。 這就是和我們的智慧型合約函數有一對一的方法的物件。

## 第 16 步：部署我們的合約 {#step-16-deploy-our-contract}

我們終於準備好要部署合約了！ 導覽至命令列並執行：

```
npx hardhat run scripts/deploy.js --network sepolia
```

你會看到像這樣的輸出：

```
合約已部署至地址：0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

如果我們前往 [Sepolia etherscan](https://sepolia.etherscan.io/) 並搜尋我們的合約地址，我們應該能夠看到它已成功部署。 這個交易執行看起來會像這樣：

![etherscan 合約](./etherscan-contract.png)

`From` 地址應與你的 MetaMask 帳戶地址相符，而 To 地址會顯示「Contract Creation」，但如果我們點進交易，我們會在 `To` 欄位中看到我們的合約地址：

![etherscan 交易](./etherscan-transaction.png)

恭喜！ 你剛剛成功將一個智能合約部署到以太坊鏈了 🎉

為了了解幕後情況，讓我們前往 [Alchemy 儀表板](https://dashboard.alchemyapi.io/explorer)中的「Explorer」分頁。 如果你有多個 Alchemy 應用程式，請務必依應用程式篩選並選擇「Hello World」。
![hello world 瀏覽器](./hello-world-explorer.png)

在這裡你會看到一些 Hardhat/Ethers 在我們呼叫 `.deploy()` 函式時，在底層為我們發出的 JSON-RPC 呼叫。 這裡要特別提出兩個重要的呼叫，一個是 [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction)，這是實際將我們的合約寫入 Sepolia 鏈的請求；另一個是 [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash)，這是在給定哈希值的情況下讀取我們交易資訊的請求 (這是交易時的典型模式)。 要了解更多關於發送交易的資訊，請查看這篇關於[使用 Web3 發送交易](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)的教學。

本教學的第 1 部分到此結束，在第 2 部分中，我們將實際[與我們的智能合約互動](https://www.alchemy.com/docs/interacting-with-a-smart-contract)，方法是更新我們的初始訊息；在第 3 部分中，我們將[把我們的智能合約發布到 Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)，這樣每個人都會知道如何與它互動。

**想了解更多關於 Alchemy 的資訊嗎？** 請查看我們的[網站](https://www.alchemy.com/eth)。 不想錯過任何更新嗎？ [在此](https://www.alchemy.com/newsletter)訂閱我們的電子報！ 也請務必加入我們的 [Discord](https://discord.gg/u72VCg3)。
