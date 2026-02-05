---
title: 給初學者的 Hello World 智慧型合約 - 全端
description: 在以太坊上撰寫和部署簡單智能合約的入門教學。
author: "nstrike2"
tags:
  [
    "穩固",
    "hardhat",
    "alchemy",
    "智能合約",
    "部署",
    "區塊瀏覽器",
    "前端",
    "交易"
  ]
skill: beginner
lang: zh-tw
published: 2021-10-25
---

如果您是區塊鏈開發新手，不知道從何開始，或不知道如何部署智慧型合約並與之互動，本指南就是為您準備的。 我們將逐步說明如何使用 [MetaMask](https://metamask.io)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org) 和 [Alchemy](https://alchemy.com/eth)，在 Goerli 測試網上建立並部署一個簡單的智慧型合約。

您需要一個 Alchemy 帳戶才能完成本教學。 [註冊免費帳戶](https://www.alchemy.com/)

如果您在任何時候有任何疑問，歡迎隨時到 [Alchemy Discord](https://discord.gg/gWuC7zB) 提問！

## 第一部分 - 使用 Hardhat 建立與部署您的智慧型合約 {#part-1}

### 連線至以太坊網路 {#connect-to-the-ethereum-network}

向以太坊鏈發出請求有很多種方式。 為求簡單，我們將使用 Alchemy 上的免費帳戶。Alchemy 是一個區塊鏈開發者平台及 API，讓我們無須自行執行節點就能與以太坊鏈通訊。 Alchemy 也有用於監控和分析的開發者工具；我們將在本教學中利用這些工具來了解我們智慧型合約部署的底層運作情況。

### 建立您的應用程式和 API 金鑰 {#create-your-app-and-api-key}

建立 Alchemy 帳戶後，您可以透過建立應用程式來產生 API 金鑰。 這將允許您向 Goerli 測試網發出請求。 如果您不熟悉測試網，可以閱讀 [Alchemy 選擇網路的指南](https://www.alchemy.com/docs/choosing-a-web3-network)。

在 Alchemy 儀表板上，於導覽列中找到 **Apps** 下拉式選單，然後點擊 **Create App**。

![Hello world 創建應用程式](./hello-world-create-app.png)

將您的應用程式命名為「_Hello World_」，並寫下簡短描述。 選擇 **Staging** 作為您的環境，**Goerli** 作為您的網路。

![創建應用程式檢視 hello world](./create-app-view-hello-world.png)

_注意：請務必選擇 **Goerli**，否則本教學將無法運作。_

點擊 **Create app**。 您的應用程式將出現在下方的表格中。

### 建立一個以太坊帳戶 {#create-an-ethereum-account}

您需要一個以太坊帳戶來傳送和接收交易。 我們將使用 MetaMask，這是一款瀏覽器內的虛擬錢包，可讓使用者管理其以太坊帳戶地址。

您可以在[這裡](https://metamask.io/download)免費下載並建立 MetaMask 帳戶。 在建立帳戶時，或如果您已有帳戶，請確保切換到右上角的「Goerli 測試網」(這樣我們就不會處理真實貨幣)。

### 第 4 步：從水龍頭取得以太幣 {#step-4-add-ether-from-a-faucet}

要將您的智慧型合約部署到測試網，您會需要一些假的 ETH。 要在 Goerli 網路上取得 ETH，請前往 Goerli 水龍頭，並輸入您的 Goerli 帳戶地址。 請注意，Goerli 水龍頭最近可能有點不穩定 - 請參閱[測試網頁面](/developers/docs/networks/#goerli)，查看可嘗試的選項清單：

_注意：由於網路壅塞，這可能需要一些時間。_
\`\`

### 步驟 5：檢查您的餘額 {#step-5-check-your-balance}

為了再次確認 ETH 已在您的錢包中，讓我們使用 [Alchemy 的編寫工具](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) 發出 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 請求。 這將會回傳你的錢包裡的餘額。 要了解更多資訊，請查看 [Alchemy 關於如何使用編寫工具的簡短教學](https://youtu.be/r6sjRxBZJuU)。

輸入您的 MetaMask 帳戶地址，然後點擊 **Send Request**。 您將會看到類似下方程式碼片段的回應。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _注意：此結果以 wei 為單位，而非 ETH。_ Wei 是以太幣的最小單位。_

哈! 我們的假錢都在這。

### 步驟 6：初始化我們的專案 {#step-6-initialize-our-project}

首先，我們需要為我們的專案建立一個資料夾。 導覽至您的命令列並輸入以下內容。

```
mkdir hello-world
cd hello-world
```

現在我們在專案資料夾中了，我們將使用 `npm init` 來初始化專案。

> 如果您尚未安裝 npm，請遵循[這些說明來安裝 Node.js 和 npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)。

就本教學而言，您如何回答初始化問題並不重要。 以下是我們的做法，僅供參考：

```
套件名稱：(hello-world)
版本：(1.0.0)
描述：hello world 智慧型合約
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
   "description": "hello world 智慧型合約",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

核准 package.json，我們就可以開始了！

### 步驟 7：下載 Hardhat {#step-7-download-hardhat}

Hardhat 是一個開發環境，提供你去編譯、部屬、測試、以及除錯你的以太坊軟體。 它能協助開發人員在部署至即時鏈之前，於本機建立智慧合約和去中心化應用程式。

在我們的 `hello-world` 專案中執行：

```
npm install --save-dev hardhat
```

如需更多[安裝指示](https://hardhat.org/getting-started/#overview)的詳細資訊，請查看此頁面。

### 步驟 8：建立 Hardhat 專案 {#step-8-create-hardhat-project}

在我們的 `hello-world` 專案資料夾中，執行：

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

👷 歡迎使用 Hardhat v2.0.11 👷‍

您想做什麼？…
建立範例專案
❯ 建立一個空的 hardhat.config.js
退出
```

這將在專案中產生一個 `hardhat.config.js` 檔案。 我們稍後將在本教學中使用此檔案來指定專案的設定。

### 步驟 9：新增專案資料夾 {#step-9-add-project-folders}

為了讓專案保持井然有序，我們來建立兩個新資料夾。 在命令列中，導覽至 `hello-world` 專案的根目錄並輸入：

```
mkdir contracts
mkdir scripts
```

- `contracts/` 是我們存放 hello world 智能合約程式碼檔案的地方
- `scripts/` 是我們存放部署和與合約互動的腳本的地方

### 步驟 10：編寫我們的合約 {#step-10-write-our-contract}

您可能會問自己，我們什麼時候才要開始寫程式碼？ 就是現在！

在您喜歡的編輯器中開啟 hello-world 專案。 智慧型合約最常用 Solidity 編寫，我們將使用它來編寫我們的智慧型合約。‌

1. 導覽至 `contracts` 資料夾並建立一個名為 `HelloWorld.sol` 的新檔案
2. 以下是我們將在本教學中使用的範例 Hello World 智慧型合約。 將以下內容複製到 `HelloWorld.sol` 檔案中。

_注意：請務必閱讀註解以了解此合約的功能。_

```
// 指定 Solidity 的版本，使用語意化版本控制。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// 定義一個名為「HelloWorld」的合約。
// 合約是函式和資料 (其狀態) 的集合。部署後，合約會存放在以太坊區塊鏈的特定地址上。了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // 呼叫更新函式時發出
   // 智慧型合約事件是您合約的一種方式，可將區塊鏈上發生的事情傳達給您的應用程式前端，前端可以「監聽」某些事件並在事件發生時採取行動。
   event UpdatedMessages(string oldStr, string newStr);

   // 宣告一個「string」類型的狀態變數「message」。
   // 狀態變數是其值永久儲存在合約儲存空間中的變數。關鍵字「public」可讓變數從合約外部存取，並建立一個其他合約或用戶端可呼叫以存取該值的函式。
   string public message;

   // 與許多以類別為基礎的物件導向語言相似，建構函式是一個特殊函式，只在合約建立時執行。
   // 建構函式用於初始化合約的資料。了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 接受一個字串引數「initMessage」，並將該值設定到合約的「message」儲存變數中)。
      message = initMessage;
   }

   // 一個公共函式，接受一個字串引數並更新「message」儲存變數。
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

這是一個基本的智慧型合約，在建立時儲存一則訊息。 可以透過呼叫 `update` 函式來更新。

### 步驟 11：將 MetaMask 和 Alchemy 連線至您的專案 {#step-11-connect-metamask-alchemy-to-your-project}

我們已經建立了 MetaMask 錢包、Alchemy 帳戶，並編寫了我們的智能合約，現在是時候將這三者連接起來了。

從您的錢包傳送的每筆交易都需要使用您唯一的私密金鑰簽署。 為了向我們的程式提供此權限，我們可以安全地將我們的私密金鑰儲存在環境檔案中。 我們也將在此處儲存 Alchemy 的 API 金鑰。

> 若要深入了解如何傳送交易，請查看這篇關於使用 web3 傳送交易的[教學](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project)。

首先，安裝 dotenv 套件。

```
npm install dotenv --save
```

然後，在專案的根目錄中建立一個 `.env` 檔案。 將您的 MetaMask 私密金鑰和 HTTP Alchemy API URL 新增至其中。

您的環境檔案必須命名為 `.env`，否則它將不會被辨識為環境檔案。

請勿將其命名為 `process.env`、`.env-custom` 或任何其他名稱。

- 請遵循[這些說明](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)來匯出您的私密金鑰
- 請參閱下文以取得 HTTP Alchemy API URL

![](./get-alchemy-api-key.gif)

你的 `.env` 應該看起來像這樣：

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

為了實際將這些連接到我們的程式碼，我們將在第 13 步的 `hardhat.config.js` 檔案中引用這些變數。

### 第 12 步：安裝 Ethers.js {#step-12-install-ethersjs}

Ethers.js 是一個函式庫，它透過將[標準 JSON-RPC 方法](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc)包裝成更方便使用者使用的方法，讓與以太坊的互動和請求變得更容易。

Hardhat 可讓您整合[外掛程式](https://hardhat.org/plugins/)以取得額外的工具和擴充功能。 我們將利用 [Ethers 外掛程式](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)來部署合約。

在你的專案目錄輸入：

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### 步驟 13：更新 hardhat.config.js {#step-13-update-hardhat-configjs}

我們目前已經新增了幾個相依套件和外掛程式，現在我們需要更新 `hardhat.config.js`，讓我們的專案知道它們全部。

將你的 `hardhat.config.js` 更新成如下所示：

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### 步驟 14：編譯我們的合約 {#step-14-compile-our-contract}

為了確認一切運作正常，我們來編譯合約。 `compile` 任務是內建的 hardhat 任務之一。

在命令列工具輸入：

```bash
npx hardhat compile
```

您可能會收到關於「原始程式檔中未提供 SPDX 授權識別碼」的警告，但無須擔心，希望其他一切都沒問題！ 如果沒有，您隨時可以在 [Alchemy discord](https://discord.gg/u72VCg3) 中傳送訊息。

### 步驟 15：編寫我們的部署指令碼 {#step-15-write-our-deploy-script}

現在我們已經寫好了合約，並且也搞定配置檔案。現在我們該來撰寫部署合約的腳本。

導覽至 `scripts/` 資料夾並建立一個名為 `deploy.js` 的新檔案，將以下內容加入其中：

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // 開始部署，回傳一個解析為合約物件的 promise
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("合約已部署至地址：", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat 在其[合約教學文章](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)中詳細地解釋了每一行程式碼的作用，我們在此採用了他們的解釋。

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js 中的 `ContractFactory` 是用於部署新智慧型合約的抽象概念，因此這裡的 `HelloWorld` 是我們 hello world 合約執行個體的[工廠](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\))。 使用 `hardhat-ethers` 外掛程式時，`ContractFactory` 和 `Contract` 執行個體預設會連線至第一個簽署者 (擁有者)。

```javascript
const hello_world = await HelloWorld.deploy()
```

在 `ContractFactory` 上呼叫 `deploy()` 將會開始部署，並回傳一個解析為 `Contract` 物件的 `Promise`。 這就是和我們的智慧型合約函數有一對一的方法的物件。

### 第 16 步：部署我們的合約 {#step-16-deploy-our-contract}

我們終於準備好要部署合約了！ 導覽至命令列並執行：

```bash
npx hardhat run scripts/deploy.js --network goerli
```

你會看到像這樣的輸出：

```bash
合約已部署至地址：0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**請儲存此地址**。 我們稍後將在本教學中使用它。

如果我們前往 [Goerli etherscan](https://goerli.etherscan.io) 並搜尋我們的合約地址，我們應該能夠看到它已成功部署。 這個交易執行看起來會像這樣：

![](./etherscan-contract.png)

`From` 地址應與您的 MetaMask 帳戶地址相符，而 `To` 地址將顯示 **Contract Creation**。 如果我們點擊進入交易，我們將在 `To` 欄位中看到我們的合約地址。

![](./etherscan-transaction.png)

恭喜！ 您剛剛將智慧型合約部署到以太坊測試網。

若要了解底層的運作情況，讓我們導覽至 [Alchemy 儀表板](https://dashboard.alchemy.com/explorer)中的 Explorer 標籤。 如果您有多個 Alchemy 應用程式，請務必依應用程式篩選並選取 **Hello World**。

![](./hello-world-explorer.png)

在這裡您會看到當我們呼叫 `.deploy()` 函式時，Hardhat/Ethers 在幕後為我們進行的一些 JSON-RPC 方法。 這裡有兩個重要的方法：[`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) (這是將我們的合約寫入 Goerli 鏈的請求)，以及 [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash) (這是在給定哈希值的情況下，讀取我們交易資訊的請求)。 若要深入了解如何傳送交易，請查看[我們關於使用 Web3 傳送交易的教學](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)。

## 第二部分：與您的智慧型合約互動 {#part-2-interact-with-your-smart-contract}

既然我們已成功將智慧型合約部署至 Goerli 網路，讓我們來學習如何與它互動。

### 建立一個 interact.js 檔案 {#create-a-interactjs-file}

這就是我們將編寫互動腳本的檔案。 我們將使用您先前在第一部分中安裝的 Ethers.js 函式庫。

在 `scripts/` 資料夾中，建立一個名為 `interact.js` 的新檔案，並新增以下程式碼：

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### 更新您的 .env 檔案 {#update-your-env-file}

我們將使用新的環境變數，因此我們需要在[先前建立](#step-11-connect-metamask-&-alchemy-to-your-project) 的 `.env` 檔案中定義它們。

我們需要新增我們的 Alchemy `API_KEY` 和部署智慧型合約的 `CONTRACT_ADDRESS` 的定義。

您的 `.env` 檔案應如下所示：

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### 取得您的合約 ABI {#grab-your-contract-ABI}

我們的合約 [ABI (應用程式二進位介面)](/glossary/#abi) 是與我們的智慧型合約互動的介面。 Hardhat 會自動產生 ABI 並將其儲存在 `HelloWorld.json` 中。 若要使用 ABI，我們需要透過將以下程式碼行新增至我們的 `interact.js` 檔案來解析內容：

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

如果您想查看 ABI，可以將其輸出到您的主控台：

```javascript
console.log(JSON.stringify(contract.abi))
```

若要查看您的 ABI 列印至主控台，請導覽至您的終端機並執行：

```bash
npx hardhat run scripts/interact.js
```

### 建立您的合約執行個體 {#create-an-instance-of-your-contract}

若要與我們的合約互動，我們需要在我們的程式碼中建立一個合約執行個體。 若要使用 Ethers.js 執行此操作，我們需要處理三個概念：

1. 提供者 - 一個節點提供者，提供您對區塊鏈的讀寫存取權
2. 簽署者 - 代表一個可以簽署交易的以太坊帳戶
3. 合約 - 代表部署在鏈上特定合約的 Ethers.js 物件

我們將使用上一步的合約 ABI 來建立我們的合約執行個體：

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

在 [ethers.js 文件](https://docs.ethers.io/v5/) 中深入了解提供者、簽署者和合約。

### 讀取初始訊息 {#read-the-init-message}

還記得我們在部署合約時設定了 `initMessage = "Hello world!"` 嗎？ 我們現在要讀取儲存在我們智慧型合約中的那則訊息，並將它列印到主控台。

在 JavaScript 中，與網路互動時會使用非同步函式。 要深入了解非同步函式，請[閱讀這篇 Medium 文章](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)。

使用以下程式碼呼叫我們智慧型合約中的 `message` 函式並讀取初始訊息：

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("訊息是：" + message)
}
main()
```

在終端機中使用 `npx hardhat run scripts/interact.js` 執行檔案後，我們應該會看到以下回應：

```
訊息是：Hello world!
```

恭喜！ 您剛剛成功地從以太坊區塊鏈讀取智慧型合約資料，太棒了！

### 更新訊息 {#update-the-message}

除了只讀取訊息，我們還可以使用 `update` 函式來更新儲存在我們智慧型合約中的訊息！ 很酷，對吧？

若要更新訊息，我們可以直接在我們實例化的合約物件上呼叫 `update` 函式：

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("訊息是：" + message)

  console.log("正在更新訊息...")
  const tx = await helloWorldContract.update("這是新訊息。")
  await tx.wait()
}
main()
```

請注意，在第 11 行，我們在回傳的交易物件上呼叫了 `.wait()`。 這可確保我們的腳本在結束函式前，會等待交易在區塊鏈上被挖出。 如果未包含 `.wait()` 呼叫，腳本可能無法看到合約中更新的 `message` 值。

### 讀取新訊息 {#read-the-new-message}

您應該能夠重複[上一步](#read-the-init-message)來讀取更新的 `message` 值。 花點時間看看您是否能做出必要的變更來列印出那個新值！

如果您需要提示，以下是您此時的 `interact.js` 檔案應有的樣子：

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// 提供者 - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// 簽署者 - 您
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// 合約執行個體
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("訊息是：" + message)

  console.log("正在更新訊息...")
  const tx = await helloWorldContract.update("這是新訊息")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("新訊息是：" + newMessage)
}

main()
```

現在只要執行腳本，您就應該能看到舊訊息、更新狀態，以及新訊息列印到您的終端機上！

`npx hardhat run scripts/interact.js --network goerli`

```
訊息是：Hello World!
正在更新訊息...
新訊息是：這是新訊息。
```

執行該腳本時，您可能會注意到「正在更新訊息...」步驟在新訊息載入前需要一些時間。 這是由於挖礦過程所致；如果您好奇在挖礦時追蹤交易，請造訪 [Alchemy 記憶體池](https://dashboard.alchemyapi.io/mempool)來查看交易狀態。 如果交易被丟棄，檢查 [Goerli Etherscan](https://goerli.etherscan.io) 並搜尋您的交易哈希也很有幫助。

## 第三部分：將您的智慧型合約發布至 Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

您已費盡心力讓您的智慧型合約活起來；現在是時候與全世界分享它了！

透過在 Etherscan 上驗證您的智慧型合約，任何人都可以檢視您的原始碼並與您的智慧型合約互動。 我們開始吧！

### 步驟 1：在您的 Etherscan 帳戶上產生 API 金鑰 {#step-1-generate-an-api-key-on-your-etherscan-account}

需要 Etherscan API 金鑰來驗證您擁有您嘗試發布的智慧型合約。

如果您還沒有 Etherscan 帳戶，請[註冊一個帳戶](https://etherscan.io/register)。

登入後，在導覽列中找到您的使用者名稱，將滑鼠懸停在其上並選取 **My profile** 按鈕。

在您的個人資料頁面上，您應該會看到一個側邊導覽列。 從側邊導覽列中，選取 **API Keys**。 接下來，按下「新增」按鈕以建立新的 API 金鑰，將您的應用程式命名為 **hello-world** 並按下 **Create New API Key** 按鈕。

您的新 API 金鑰應會出現在 API 金鑰表格中。 將 API 金鑰複製到您的剪貼簿。

接下來，我們需要將 Etherscan API 金鑰新增至我們的 `.env` 檔案。

新增後，您的 `.env` 檔案應如下所示：

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat 部署的智慧型合約 {#hardhat-deployed-smart-contracts}

#### 安裝 hardhat-etherscan {#install-hardhat-etherscan}

使用 Hardhat 將您的合約發布至 Etherscan 非常簡單。 您首先需要安裝 `hardhat-etherscan` 外掛程式才能開始。 `hardhat-etherscan` 會自動在 Etherscan 上驗證智慧型合約的原始碼和 ABI。 若要新增此項，請在 `hello-world` 目錄中執行：

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

安裝後，在您的 `hardhat.config.js` 頂端包含以下陳述式，並新增 Etherscan 設定選項：

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // 在 https://etherscan.io/ 取得一個
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### 在 Etherscan 上驗證您的智慧型合約 {#verify-your-smart-contract-on-etherscan}

確保所有檔案都已儲存，且所有 `.env` 變數都已正確設定。

執行 `verify` 任務，傳遞合約地址以及部署到的網路：

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

請確定 `DEPLOYED_CONTRACT_ADDRESS` 是您在 Goerli 測試網上部署的智慧型合約的地址。 此外，最後一個引數 (`'Hello World!'`) 必須與[第一部分中的部署步驟](#write-our-deploy-script)中所使用的字串值相同。

如果一切順利，您將在終端機中看到以下訊息：

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

恭喜！ 您的智慧型合約程式碼已在 Etherscan 上！

### 在 Etherscan 上查看您的智慧型合約！ {#check-out-your-smart-contract-on-etherscan}

當您導覽至終端機中提供的連結時，您應該能夠看到您在 Etherscan 上發布的智慧型合約程式碼和 ABI！

**哇嗚 - 你做到了，冠軍！ 現在任何人都可以呼叫或寫入您的智慧型合約！ 我們迫不及待想看看您接下來會打造出什麼！**

## 第四部分 - 將您的智慧型合約與前端整合 {#part-4-integrating-your-smart-contract-with-the-frontend}

完成本教學後，您將知道如何：

- 將 MetaMask 錢包連線至您的去中心化應用程式
- 使用 [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API 從您的智慧型合約讀取資料
- 使用 MetaMask 簽署以太坊交易

對於這個去中心化應用程式，我們將使用 [React](https://react.dev/) 作為我們的前端框架；然而，需要注意的是，我們不會花太多時間分解其基礎知識，因為我們將主要專注於為我們的專案帶來 Web3 功能。

作為先決條件，您應該對 React 有初學者級的了解。 如果沒有，我們建議完成官方的[React 入門教學](https://react.dev/learn)。

### 複製入門檔案 {#clone-the-starter-files}

首先，前往 [hello-world-part-four GitHub 儲存庫](https://github.com/alchemyplatform/hello-world-part-four-tutorial) 以取得此專案的入門檔案，並將此儲存庫複製到您的本機電腦。

在本機開啟複製的儲存庫。 請注意，它包含兩個資料夾：`starter-files` 和 `completed`。

- `starter-files` - **我們將在此目錄中工作**，我們將把 UI 連線至您的以太坊錢包和我們在[第三部分](#part-3)中發布到 Etherscan 的智慧型合約。
- `completed` 包含整個已完成的教學，如果您遇到困難，應僅用作參考。

接下來，在您最喜歡的程式碼編輯器中開啟您的 `starter-files` 副本，然後導覽至 `src` 資料夾。

我們將撰寫的所有程式碼都會放在 `src` 資料夾底下。 我們將編輯 `HelloWorld.js` 元件和 `util/interact.js` JavaScript 檔案，為我們的專案提供 Web3 功能。

### 查看入門檔案 {#check-out-the-starter-files}

在我們開始編寫程式碼之前，讓我們來探索一下入門檔案中提供了什麼。

#### 讓你的 React 專案動起來 {#get-your-react-project-running}

讓我們透過在我們的瀏覽器內運行這個「反應」專案來開始是日的教程吧： 「反應」的美在於一旦我們在瀏覽器內已經有在運行自己的專案，我們儲存下來的任何改變都將會被實時更新到我們的瀏覽器裡。

若要讓專案執行，請導覽至 `starter-files` 資料夾的根目錄，然後在您的終端機中執行 `npm install` 以安裝專案的相依性：

```bash
cd starter-files
npm install
```

安裝完成後，在你的終端機中執行 `npm start`：

```bash
npm start
```

這麼做應該會在您的瀏覽器中開啟 [http://localhost:3000/](http://localhost:3000/)，您將在那裡看到我們專案的前端。 它應該包含一個欄位 (一個更新儲存在您智慧型合約中訊息的地方)、一個「連線錢包」按鈕，和一個「更新」按鈕。

如果您嘗試點擊任一按鈕，您會發現它們無法運作——那是因為我們還需要編寫它們的功能。

#### `HelloWorld.js` 元件 {#the-helloworld-js-component}

讓我們回到編輯器中的 `src` 資料夾，並開啟 `HelloWorld.js` 檔案。 這個動作在我們理解該檔案內所有東西上有著超級關鍵的作用，因為它是我們將會首先處理的第一個「反應」組件。

在此檔案的頂端，您會注意到我們有幾個執行專案所必需的匯入陳述式，包括 React 函式庫、useEffect 和 useState hook、來自 `./util/interact.js` 的一些項目 (我們稍後將更詳細地描述它們！)，以及 Alchemy 標誌。

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

接下來，我們有我們的狀態變數，我們將在特定事件後更新它們。

```javascript
// HelloWorld.js

//狀態變數
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("未連線至網路。")
const [newMessage, setNewMessage] = useState("")
```

以下是每個變數所代表的意義：

- `walletAddress` - 一個儲存使用者錢包位址的字串
- `status` - 一個儲存有用訊息的字串，引導使用者如何與去中心化應用程式互動
- `message` - 一個儲存智慧型合約中目前訊息的字串
- `newMessage` - 一個儲存將寫入智慧型合約的新訊息的字串

在狀態變數之後，您會看到五個未實作的函式：`useEffect`、`addSmartContractListener`、`addWalletListener`、`connectWalletPressed` 和 `onUpdatePressed`。 我們將在下方解釋它們的功能：

```javascript
// HelloWorld.js

//僅呼叫一次
useEffect(async () => {
  //TODO: 實作
}, [])

function addSmartContractListener() {
  //TODO: 實作
}

function addWalletListener() {
  //TODO: 實作
}

const connectWalletPressed = async () => {
  //TODO: 實作
}

const onUpdatePressed = async () => {
  //TODO: 實作
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - 這是一個 React hook，在您的元件渲染後呼叫。 因為它傳入了一個空陣列 `[]` prop (見第 4 行)，所以它只會在元件的_第一次_渲染時被呼叫。 在這裡，我們將載入儲存在我們智慧型合約中的目前訊息，呼叫我們的智慧型合約和錢包監聽器，並更新我們的 UI 以反映錢包是否已連線。
- `addSmartContractListener` - 此函式設定一個監聽器，它將監看我們的 HelloWorld 合約的 `UpdatedMessages` 事件，並在我們智慧型合約中的訊息變更時更新我們的 UI。
- `addWalletListener` - 此函式設定一個監聽器，偵測使用者 MetaMask 錢包狀態的變更，例如使用者中斷錢包連線或切換地址時。
- `connectWalletPressed` - 此函式將被呼叫以將使用者的 MetaMask 錢包連線至我們的去中心化應用程式。
- `onUpdatePressed` - 當使用者想要更新儲存在智慧型合約中的訊息時，將會呼叫此函式。

接近這份檔案的尾聲，我們得到了我們組件的UI。

```javascript
// HelloWorld.js

//我們元件的 UI
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "已連線：" +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>連線錢包</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>目前訊息：</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>新訊息：</h2>

    <div>
      <input
        type="text"
        placeholder="更新您智慧型合約中的訊息。"
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        更新
      </button>
    </div>
  </div>
)
```

如果您仔細掃描此程式碼，您會注意到我們在 UI 中使用了各種狀態變數：

- 在第 6-12 行，如果使用者的錢包已連線 (即 `walletAddress.length > 0`)，我們會在 ID 為「walletButton」的按鈕中顯示使用者 `walletAddress` 的截斷版本；否則它只會顯示「連線錢包」。
- 在第 17 行，我們顯示儲存在智慧型合約中的目前訊息，該訊息擷取在 `message` 字串中。
- 在第 23-26 行，我們使用[受控元件](https://legacy.reactjs.org/docs/forms.html#controlled-components)來更新我們的 `newMessage` 狀態變數，當文字欄位中的輸入變更時。

除了我們的狀態變數，您還會看到 `connectWalletPressed` 和 `onUpdatePressed` 函式分別在點擊 ID 為 `publishButton` 和 `walletButton` 的按鈕時被呼叫。

最後，讓我們來處理這個 `HelloWorld.js` 元件被新增到哪裡的問題。

如果您前往 `App.js` 檔案，這是 React 中的主要元件，作為所有其他元件的容器，您會看到我們的 `HelloWorld.js` 元件被注入在第 7 行。

最後但同樣重要的是，讓我們查看為您提供的另一個檔案，即 `interact.js` 檔案。

#### `interact.js` 檔案 {#the-interact-js-file}

因為我們想要遵循 [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 範式，我們將需要一個單獨的檔案，其中包含我們所有的函式來管理我們去中心化應用程式的邏輯、資料和規則，然後能夠將這些函式匯出到我們的前端 (我們的 `HelloWorld.js` 元件)。

👆🏽這正是我們的 `interact.js` 檔案的目的！

導覽至您 `src` 目錄中的 `util` 資料夾，您會注意到我們包含了一個名為 `interact.js` 的檔案，它將包含我們所有的智慧型合約互動和錢包函式與變數。

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

您會注意到檔案頂端，我們已註解掉 `helloWorldContract` 物件。 稍後在本教學中，我們將取消註解此物件，並在此變數中實例化我們的智慧型合約，然後我們將其匯出至我們的 `HelloWorld.js` 元件。

我們 `helloWorldContract` 物件之後的四個未實作函式執行以下操作：

- `loadCurrentMessage` - 此函式處理載入儲存在智慧型合約中目前訊息的邏輯。 它將使用 [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3) 對 Hello World 智慧型合約進行_讀取_呼叫。
- `connectWallet` - 此函式將把使用者的 MetaMask 連線至我們的去中心化應用程式。
- `getCurrentWalletConnected` - 此函式將在頁面載入時檢查以太坊帳戶是否已連線至我們的去中心化應用程式，並相應地更新我們的 UI。
- `updateMessage` - 此函式將更新儲存在智慧型合約中的訊息。 它將對 Hello World 智慧型合約進行_寫入_呼叫，因此使用者的 MetaMask 錢包必須簽署一筆以太坊交易才能更新訊息。

既然我們了解了我們正在處理的內容，讓我們來弄清楚如何從我們的智慧型合約中讀取！

### 步驟 3：從您的智慧型合約讀取 {#step-3-read-from-your-smart-contract}

若要從您的智慧型合約讀取，您需要成功設定：

- 與以太坊鏈的 API 連線
- 您智慧型合約的載入執行個體
- 呼叫您智慧型合約函式的函式
- 一個監聽器，用於在您從智慧型合約讀取的資料變更時監看更新

這聽起來可能有很多步驟，但別擔心！ 我們將一步一步引導您完成它們！ :\)

#### 建立與以太坊鏈的 API 連線 {#establish-an-api-connection-to-the-ethereum-chain}

還記得在本教學的第二部分中，我們如何使用我們的 [Alchemy Web3 金鑰從我們的智慧型合約讀取](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)嗎？ 您還需要在您的去中心化應用程式中使用 Alchemy Web3 金鑰才能從鏈上讀取。

如果您還沒有，首先安裝 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)，方法是導覽至您 `starter-files` 的根目錄，並在您的終端機中執行以下指令：

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) 是 [Web3.js](https://docs.web3js.org/) 的一個包裝器，提供了增強的 API 方法和其他關鍵優勢，讓你的 web3 開發者生活更輕鬆。 它是被設計成最低配置，因此你能夠在你的應用程式內馬上開始使用它！

然後，在您的專案目錄中安裝 [dotenv](https://www.npmjs.com/package/dotenv) 套件，這樣我們在取得 API 金鑰後就有一個安全的地方來儲存它。

```text
npm install dotenv --save
```

對於我們的去中心化應用程式，**我們將使用我們的 Websockets API 金鑰** 而非我們的 HTTP API 金鑰，因為它將允許我們設定一個監聽器，偵測儲存在智慧型合約中的訊息何時變更。

取得您的 API 金鑰後，在您的根目錄中建立一個 `.env` 檔案，並將您的 Alchemy Websockets url 新增至其中。 之後，您的 `.env` 檔案應如下所示：

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

現在，我們已準備好在我們的去中心化應用程式中設定我們的 Alchemy Web3 端點！ 讓我們回到我們的 `interact.js`，它巢狀在我們的 `util` 資料夾中，並在檔案頂端新增以下程式碼：

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

在上方，我們首先從我們的 `.env` 檔案匯入 Alchemy 金鑰，然後將我們的 `alchemyKey` 傳遞給 `createAlchemyWeb3` 以建立我們的 Alchemy Web3 端點。

有了這個端點，是時候載入我們的智慧型合約了！

#### 載入您的 Hello World 智慧型合約 {#loading-your-hello-world-smart-contract}

要載入您的 Hello World 智慧型合約，您需要其合約地址和 ABI，如果您完成了[本教學的第三部分](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)，兩者都可以在 Etherscan 上找到。

#### 如何從 Etherscan 取得您的合約 ABI {#how-to-get-your-contract-abi-from-etherscan}

如果您跳過了本教學的第三部分，您可以使用地址為 [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) 的 HelloWorld 合約。 其 ABI 可以在[這裡](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code)找到。

合約 ABI 對於指定合約將調用哪個函式以及確保函式將以您期望的格式回傳資料是必要的。 複製我們的合約 ABI 後，讓我們將其另存為一個名為 `contract-abi.json` 的 JSON 檔案，儲存在您的 `src` 目錄中。

您的 contract-abi.json 應儲存在您的 src 資料夾中。

有了我們的合約地址、ABI 和 Alchemy Web3 端點，我們可以使用 [contract 方法](https://docs.web3js.org/api/web3-eth-contract/class/Contract)來載入我們智慧型合約的執行個體。 將您的合約 ABI 匯入 `interact.js` 檔案並新增您的合約地址。

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

我們現在終於可以取消註解我們的 `helloWorldContract` 變數，並使用我們的 AlchemyWeb3 端點載入智慧型合約：

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

總結一下，您 `interact.js` 的前 12 行現在應該如下所示：

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

既然我們已載入合約，我們就可以實作我們的 `loadCurrentMessage` 函式了！

#### 在您的 `interact.js` 檔案中實作 `loadCurrentMessage` {#implementing-loadCurrentMessage-in-your-interact-js-file}

這個函式非常簡單。 我們將進行一個簡單的非同步 web3 呼叫來從我們的合約中讀取。 我們的函式將回傳儲存在智慧型合約中的訊息：

將您 `interact.js` 檔案中的 `loadCurrentMessage` 更新為以下內容：

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

由於我們希望在我們的 UI 中顯示此智慧型合約，讓我們將 `HelloWorld.js` 元件中的 `useEffect` 函式更新為以下內容：

```javascript
// HelloWorld.js

//僅呼叫一次
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

請注意，我們只希望在元件第一次渲染時呼叫一次 `loadCurrentMessage`。 我們很快就會實作 `addSmartContractListener`，以便在智慧型合約中的訊息變更後自動更新 UI。

在我們深入研究我們的監聽器之前，讓我們來看看我們目前為止的成果！ 儲存您的 `HelloWorld.js` 和 `interact.js` 檔案，然後前往 [http://localhost:3000/](http://localhost:3000/)

您會注意到目前訊息不再顯示「未連線至網路」。 而是反映儲存在智慧型合約中的訊息。 太棒了！

#### 您的 UI 現在應該反映儲存在智慧型合約中的訊息 {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

現在說到那個監聽器...

#### 實作 `addSmartContractListener` {#implement-addsmartcontractlistener}

如果您回想一下我們在本教學系列[第一部分](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract)中編寫的 `HelloWorld.sol` 檔案，您會記得在我們的智慧型合約的 `update` 函式被調用後 (見第 9 和 27 行)，會發出一個名為 `UpdatedMessages` 的智慧型合約事件：

```javascript
// HelloWorld.sol

// 指定 Solidity 的版本，使用語意化版本控制。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// 定義一個名為「HelloWorld」的合約。
// 合約是函式和資料 (其狀態) 的集合。部署後，合約會存放在以太坊區塊鏈的特定地址上。了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // 呼叫更新函式時發出
   // 智慧型合約事件是您合約的一種方式，可將區塊鏈上發生的事情傳達給您的應用程式前端，前端可以「監聽」某些事件並在事件發生時採取行動。
   event UpdatedMessages(string oldStr, string newStr);

   // 宣告一個「string」類型的狀態變數「message」。
   // 狀態變數是其值永久儲存在合約儲存空間中的變數。關鍵字「public」可讓變數從合約外部存取，並建立一個其他合約或用戶端可呼叫以存取該值的函式。
   string public message;

   // 與許多以類別為基礎的物件導向語言相似，建構函式是一個特殊函式，只在合約建立時執行。
   // 建構函式用於初始化合約的資料。了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 接受一個字串引數「initMessage」，並將該值設定到合約的「message」儲存變數中)。
      message = initMessage;
   }

   // 一個公共函式，接受一個字串引數並更新「message」儲存變數。
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

智慧型合約事件是您合約的一種方式，可將區塊鏈上發生的事情 (即發生了_事件_) 傳達給您的前端應用程式，前端可以「監聽」特定事件並在事件發生時採取行動。

`addSmartContractListener` 函式將專門監聽我們的 Hello World 智慧型合約的 `UpdatedMessages` 事件，並更新我們的 UI 以顯示新訊息。

將 `addSmartContractListener` 修改為以下內容：

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 您的訊息已更新！")
    }
  })
}
```

讓我們來分解一下監聽器偵測到事件時會發生什麼事：

- 如果事件發出時發生錯誤，它將透過我們的 `status` 狀態變數反映在 UI 中。
- 否則，我們將使用回傳的 `data` 物件。 `data.returnValues` 是一個從零開始索引的陣列，其中陣列中的第一個元素儲存先前的訊息，第二個元素儲存更新後的訊息。 總而言之，在一個成功的事件上，我們將把我們的 `message` 字串設定為更新後的訊息，清除 `newMessage` 字串，並更新我們的 `status` 狀態變數以反映新訊息已發布在我們的智慧型合約上。

最後，讓我們在我們的 `useEffect` 函式中呼叫我們的監聽器，以便它在 `HelloWorld.js` 元件的第一次渲染時被初始化。 總而言之，您的 `useEffect` 函式應如下所示：

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

既然我們能從我們的智慧型合約中讀取，如果能弄清楚如何寫入就太好了！ 然而，若要寫入我們的去中心化應用程式，我們必須先有一個以太坊錢包連線到它。

所以，接下來我們將處理設定我們的以太坊錢包 (MetaMask)，然後將它連線至我們的去中心化應用程式！

### 步驟 4：設定您的以太坊錢包 {#step-4-set-up-your-ethereum-wallet}

若要向以太坊鏈寫入任何內容，使用者必須使用其虛擬錢包的私密金鑰簽署交易。 在本教學中，我們將使用 [MetaMask](https://metamask.io/)，這是一款瀏覽器中的虛擬錢包，用於管理您的以太坊帳戶地址，因為它讓最終使用者簽署交易變得非常容易。

如果您想深入了解以太坊上的交易如何運作，請參閱以太坊基金會的[此頁面](/developers/docs/transactions/)。

#### 下載 MetaMask {#download-metamask}

您可以在[這裡](https://metamask.io/download)免費下載並建立 MetaMask 帳戶。 在建立帳戶時，或如果您已有帳戶，請確保切換到右上角的「Goerli 測試網」 (這樣我們就不會處理真實貨幣)。

#### 從水龍頭新增以太幣 {#add-ether-from-a-faucet}

若要在以太坊區塊鏈上簽署交易，我們需要一些假的 Eth。 若要取得 Eth，您可以前往 [FaucETH](https://fauceth.komputing.org) 並輸入您的 Goerli 帳戶地址，點擊「請求資金」，然後在下拉式選單中選取「以太坊測試網 Goerli」，最後再次點擊「請求資金」按鈕。 你應該很快便能在你的MetaMask帳戶裡看見ETH！

#### 檢查您的餘額 {#check-your-balance}

為了再次確認我們的餘額，讓我們使用 [Alchemy 的 composer 工具](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) 發出一個 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 請求。 這將會把我們錢包內的以太結餘回傳。 在你輸入自己的MetaMask帳戶地址，並且點下「寄送請求」後，你理應會看見一個這樣子的回應：

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注意：** 此結果的單位是 wei，不是 eth。 Wei是一個被用來計算以太最少分數的單位。 要把wei換算到ETH的算術是：1 ETH = 10¹⁸ wei。 所以，如果我們要換算 0xde0b6b3a7640000 到小數點，我們會得到 1\*10¹⁸的結果，它相當於一個ETH的數值。

哈! 我們的假錢都在這！ 🤑

### 步驟 5：將 MetaMask 連線至您的 UI {#step-5-connect-metamask-to-your-UI}

既然我們的 MetaMask 錢包已經設定好了，就讓我們把去中心化應用程式連接到它吧！

#### `connectWallet` 函式 {#the-connectWallet-function}

在我們的 `interact.js` 檔案中，讓我們來實作 `connectWallet` 函式，然後我們可以在我們的 `HelloWorld.js` 元件中呼叫它。

讓我們將 `connectWallet` 修改為以下內容：

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 在上方的文字欄位中寫一則訊息。",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              您必須在瀏覽器中安裝 MetaMask，這是一款虛擬以太坊錢包。
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

那麼這段龐大的程式碼究竟做了什麼？

首先，它會檢查您的瀏覽器中是否啟用了 `window.ethereum`。

`window.ethereum` 是由 MetaMask 和其他錢包提供者注入的全域 API，允許網站請求使用者的以太坊帳戶。 如果獲得批准，它可以從使用者連線的區塊鏈讀取資料，並建議使用者簽署訊息和交易。 查看 [MetaMask 文件](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)以獲得更多資訊！

如果 `window.ethereum` _不存在_，那表示 MetaMask 沒有安裝。 這會回傳一個 JSON 物件，其中回傳的 `address` 是一個空字串，而 `status` JSX 物件則傳達使用者必須安裝 MetaMask 的訊息。

現在如果 `window.ethereum` _存在_，事情就變得有趣了。

使用 try/catch 迴圈，我們將透過呼叫 [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) 來嘗試連接 MetaMask。 呼叫這個函式會在瀏覽器中開啟 MetaMask，提示使用者將他們的錢包連接到你的去中心化應用程式。

- 如果使用者選擇連線，`method: "eth_requestAccounts"` 將回傳一個陣列，其中包含所有連線至去中心化應用程式的使用者帳戶地址。 總而言之，我們的 `connectWallet` 函式會回傳一個 JSON 物件，其中包含此陣列中的_第一個_ `address` (見第 9 行) 和一則 `status` 訊息，提示使用者向智能合約寫入一則訊息。
- 如果使用者拒絕連接，那麼 JSON 物件將包含一個空字串作為回傳的 `address`，以及一則反映使用者拒絕連接的 `status` 訊息。

既然我們已編寫此 `connectWallet` 函式，下一步就是將它呼叫至我們的 `HelloWorld.js` 元件。

#### 將 `connectWallet` 函式新增至您的 `HelloWorld.js` UI 元件 {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

導覽至 `HelloWorld.js` 中的 `connectWalletPressed` 函式，並將其更新為以下內容：

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

注意到我們的大部分功能是如何從 `interact.js` 檔案中抽象出來，遠離我們的 `HelloWorld.js` 元件嗎？ 這是我們跟M-V-C規範相容的做法！

在 `connectWalletPressed` 中，我們只需對匯入的 `connectWallet` 函式進行一個 await 呼叫，並利用其回應，透過它們的 state hooks 更新我們的 `status` 和 `walletAddress` 變數。

現在，讓我們儲存這兩個檔案 (`HelloWorld.js` 和 `interact.js`)，並測試一下我們目前的 UI。

在 [http://localhost:3000/](http://localhost:3000/) 頁面上開啟您的瀏覽器，並按下頁面右上角的「連線錢包」按鈕。

如果你已安裝 MetaMask，系統應該會提示你將錢包連接到你的去中心化應用程式。 請接受進行連結的邀請。

您應該會看到錢包按鈕現在反映您的地址已連線！ 太棒了 🔥

接下來，試著重新整理頁面... 這很奇怪。 我們的錢包按鈕會鼓勵我們對MetaMask進行連結，就算它已經被連結好了。。。。。。

不過，別擔心！ 我們可以輕鬆地處理這個問題 (懂嗎？) 透過實作 `getCurrentWalletConnected`，它將檢查是否有地址已連線至我們的去中心化應用程式，並相應地更新我們的 UI！

#### `getCurrentWalletConnected` 函式 {#the-getcurrentwalletconnected-function}

將您 `interact.js` 檔案中的 `getCurrentWalletConnected` 函式更新為以下內容：

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 在上方的文字欄位中寫一則訊息。",
        }
      } else {
        return {
          address: "",
          status: "🦊 使用右上角按鈕連線至 MetaMask。",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              您必須在瀏覽器中安裝 MetaMask，這是一款虛擬以太坊錢包。
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

這段程式碼與我們剛在上一步中編寫的 `connectWallet` 函式_非常_相似。

主要的區別在於，我們不是呼叫 `eth_requestAccounts` 方法 (這會開啟 MetaMask 讓使用者連接他們的錢包)，而是在這裡呼叫 `eth_accounts` 方法，它只會回傳一個包含當前連接到我們去中心化應用程式的 MetaMask 位址的陣列。

若要查看此函式的實際運作情況，讓我們在我們的 `HelloWorld.js` 元件的 `useEffect` 函式中呼叫它：

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

注意，我們使用對 `getCurrentWalletConnected` 呼叫的回應來更新我們的 `walletAddress` 和 `status` 狀態變數。

既然您已新增此程式碼，讓我們試著重新整理我們的瀏覽器視窗。

太棒了！ 這個按鈕應該會跟你說：「你已經連結好了。」，然後會顯出一個你錢包被連結好的地址的預視 - 就算在你刷新之後也會這樣！

#### 實作 `addWalletListener` {#implement-addwalletlistener}

我們去中心化應用程式錢包設定的最後一個步驟是實作錢包監聽器，這樣當我們錢包的狀態改變時 (例如使用者中斷連線或切換帳戶)，我們的 UI 就會更新。

在您的 `HelloWorld.js` 檔案中，將您的 `addWalletListener` 函式修改為以下內容：

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 在上方的文字欄位中寫一則訊息。")
      } else {
        setWallet("")
        setStatus("🦊 使用右上角按鈕連線至 MetaMask。")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          您必須在瀏覽器中安裝 MetaMask，這是一款虛擬以太坊錢包。
        </a>
      </p>
    )
  }
}
```

我敢打賭，此時您甚至不需要我們的幫助就能了解這裡發生了什麼事，但為了周全起見，讓我們快速分解一下：

- 首先，我們的函式會檢查 `window.ethereum` 是否已啟用 (即 MetaMask 已安裝)。
  - 如果沒有啟用，我們只需將 `status` 狀態變數設定為一個 JSX 字串，提示使用者安裝 MetaMask。
  - 如果已啟用，我們在第 3 行設定監聽器 `window.ethereum.on("accountsChanged")`，它會監聽 MetaMask 錢包的狀態變化，包括使用者將額外帳戶連接到去中心化應用程式、切換帳戶或中斷帳戶連線時。 如果至少有一個帳戶已連接，`walletAddress` 狀態變數會更新為監聽器回傳的 `accounts` 陣列中的第一個帳戶。 否則，`walletAddress` 會被設定為空字串。

最後但同樣重要的是，我們必須在我們的 `useEffect` 函式中呼叫它：

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

就是這樣！ 我們已成功完成所有錢包功能的編寫！ 現在進入我們最後的任務：更新儲存在我們智慧型合約中的訊息！

### 步驟 6：實作 `updateMessage` 函式 {#step-6-implement-the-updateMessage-function}

好了，各位，我們已進入最後階段！ 在您 `interact.js` 檔案的 `updateMessage` 中，我們將執行以下操作：

1. 確保我們希望在我們的智慧合約中發布的訊息是有效的
2. 使用 MetaMask 簽署我們的交易
3. 從我們的 `HelloWorld.js` 前端元件呼叫此函式

這不會花很長時間；讓我們完成這個去中心化應用程式！

#### 輸入錯誤處理 {#input-error-handling}

自然地，在函式開始時進行某種輸入錯誤處理是合理的。

如果沒有安裝 MetaMask 擴充功能、沒有連線錢包 (即傳入的 `address` 是空字串)，或者 `message` 是空字串，我們希望我們的函式能提早回傳。 讓我們將以下錯誤處理新增至 `updateMessage`：

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 連線您的 MetaMask 錢包以更新區塊鏈上的訊息。",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ 您的訊息不能是空字串。",
    }
  }
}
```

既然它有了適當的輸入錯誤處理，是時候透過 MetaMask 簽署交易了！

#### 簽署我們的交易 {#signing-our-transaction}

如果您已經熟悉傳統的 web3 以太坊交易，我們接下來編寫的程式碼將會非常熟悉。 在您的輸入錯誤處理程式碼下方，將以下內容新增至 `updateMessage`：

```javascript
// interact.js

//設定交易參數
const transactionParameters = {
  to: contractAddress, // 合約發布期間除外為必要
  from: address, // 必須與使用者目前的地址相符
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//簽署交易
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          在 Etherscan 上查看您交易的狀態！
        </a>
        <br />
        ℹ️ 交易一旦經網路驗證，訊息將自動更新。
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

讓我們來分解一下發生了什麼事。 首先，我們設定我們的交易參數，其中：

- `to` 指定接收方位址 (我們的智能合約)
- `from` 指定交易的簽署者，即我們傳入函式的 `address` 變數
- `data` 包含對我們 Hello World 智慧型合約的 `update` 方法的呼叫，並接收我們的 `message` 字串變數作為輸入

然後，我們進行一個 await 呼叫，`window.ethereum.request`，我們在此請求 MetaMask 簽署交易。 請注意，在第 11 和 12 行，我們正在指定我們的 eth 方法 `eth_sendTransaction`，並傳入我們的 `transactionParameters`。

在這時機，MetaMask將會在瀏覽器中被開啟，然後鼓勵用戶去簽署或拒絕該筆交易。

- 如果交易成功，函式將回傳一個 JSON 物件，其中 `status` JSX 字串會提示使用者查看 Etherscan 以取得有關其交易的更多資訊。
- 如果交易失敗，函式將回傳一個 JSON 物件，其中 `status` 字串會轉達錯誤訊息。

總而言之，我們的 `updateMessage` 函式應如下所示：

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //輸入錯誤處理
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 連線您的 MetaMask 錢包以更新區塊鏈上的訊息。",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ 您的訊息不能是空字串。",
    }
  }

  //設定交易參數
  const transactionParameters = {
    to: contractAddress, // 合約發布期間除外為必要
    from: address, // 必須與使用者目前的地址相符
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //簽署交易
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            在 Etherscan 上查看您交易的狀態！
          </a>
          <br />
          ℹ️ 交易一旦經網路驗證，訊息將自動更新。
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

最後但同樣重要的是，我們需要將我們的 `updateMessage` 函式連線至我們的 `HelloWorld.js` 元件。

#### 將 `updateMessage` 連線至 `HelloWorld.js` 前端 {#connect-updatemessage-to-the-helloworld-js-frontend}

我們的 `onUpdatePressed` 函式應對匯入的 `updateMessage` 函式進行 await 呼叫，並修改 `status` 狀態變數以反映我們的交易是成功還是失敗：

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

它非常乾淨簡單。 您猜怎麼著... 您的去中心化應用程式完成了！！！

去測試一下**更新**按鈕吧！

### 製作您自己的自訂去中心化應用程式 {#make-your-own-custom-dapp}

哇，您完成了本教學！ 總結一下，您學會了如何：

- 將 MetaMask 錢包連線至您的去中心化應用程式專案
- 使用 [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API 從您的智慧型合約讀取資料
- 使用 MetaMask 簽署以太坊交易

現在您已完全具備應用本教學的技能，可以打造您自己的自訂去中心化應用程式專案了！ 一如既往，如果您有任何問題，請隨時到 [Alchemy Discord](https://discord.gg/gWuC7zB) 尋求協助。 🧙‍♂️

完成本教學後，請在 Twitter 上標記我們 [@alchemyplatform](https://twitter.com/AlchemyPlatform)，讓我們知道您的體驗如何，或是否有任何回饋！
