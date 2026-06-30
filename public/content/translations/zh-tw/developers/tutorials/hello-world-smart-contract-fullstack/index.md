---
title: "初學者 Hello World 智能合約 - 全端"
description: "在以太坊上撰寫與部署簡單智能合約的入門教學。"
author: "nstrike2"
breadcrumb: "Hello World 全端"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "智能合約",
    "部署",
    "區塊瀏覽器",
    "前端",
    "交易",
    "框架",
  ]
skill: beginner
lang: zh-tw
published: 2021-10-25
---

如果您是區塊鏈開發的新手，不知道從何開始，或者不知道如何部署智能合約並與之互動，那麼本指南非常適合您。我們將逐步介紹如何使用 [梅塔馬斯克](https://metamask.io)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org) 和 [Alchemy](https://alchemy.com/eth) 在 Goerli 測試網路上建立並部署一個簡單的智能合約。

您需要一個 Alchemy 帳戶才能完成本教學。[註冊免費帳戶](https://www.alchemy.com/)。

如果您在任何時候有疑問，歡迎隨時在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中提問！

## 第 1 部分 - 使用 Hardhat 建立並部署你的智能合約 {#part-1}

### 連接到以太坊網路 {#connect-to-the-ethereum-network}

有許多方法可以向以太坊鏈發出請求。為了簡單起見，我們將在 Alchemy 上使用免費帳戶，這是一個區塊鏈開發者平台和 API，允許我們與以太坊鏈通訊，而無需自己執行節點。Alchemy 也有用於監控和分析的開發者工具；我們將在本教學中利用這些工具來了解智能合約部署在底層是如何運作的。

### 建立你的應用程式和 API 金鑰 {#create-your-app-and-api-key}

建立 Alchemy 帳戶後，你可以透過建立應用程式來產生 API 金鑰。這將允許你向 Goerli 測試網發出請求。如果你對測試網不熟悉，可以[閱讀 Alchemy 的選擇網路指南](https://www.alchemy.com/docs/choosing-a-web3-network)。

在 Alchemy 儀表板上，找到導覽列中的 **Apps** 下拉式選單，然後點擊 **Create App**。

![Hello world create app](./hello-world-create-app.png)

將你的應用程式命名為「_Hello World_」並寫一段簡短的描述。選擇 **Staging** 作為你的環境，並選擇 **Goerli** 作為你的網路。

![create app view hello world](./create-app-view-hello-world.png)

_注意：請務必選擇 **Goerli**，否則本教學將無法運作。_

點擊 **Create app**。你的應用程式將出現在下方的表格中。

### 建立以太坊帳戶 {#create-an-ethereum-account}

你需要一個以太坊帳戶來發送和接收交易。我們將使用梅塔馬斯克，這是一個瀏覽器中的虛擬錢包，讓使用者可以管理他們的以太坊帳戶地址。

你可以在[這裡](https://metamask.io/download)免費下載並建立梅塔馬斯克帳戶。當你建立帳戶時，或者如果你已經有帳戶，請確保切換到右上角的「Goerli Test Network」（這樣我們就不會使用真實資金進行交易）。

### 第 4 步：從水龍頭添加以太幣 {#step-4-add-ether-from-a-faucet}

要將你的智能合約部署到測試網，你需要一些測試用的 ETH。要在 Goerli 網路上獲取 ETH，請前往 Goerli 水龍頭並輸入你的 Goerli 帳戶地址。請注意，最近 Goerli 水龍頭可能有點不穩定 - 請參閱[測試網頁面](/developers/docs/networks/#goerli)以獲取可嘗試的選項列表：

_注意：由於網路擁塞，這可能需要一段時間。_
``

### 第 5 步：檢查你的餘額
為了再次確認 ETH 已存入你的錢包，讓我們使用 [Alchemy 的沙盒工具](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)發出 [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) 請求。這將回傳我們錢包中的 ETH 數量。要了解更多資訊，請查看 [Alchemy 關於如何使用 composer 工具的簡短教學](https://youtu.be/r6sjRxBZJuU)。

輸入你的梅塔馬斯克帳戶地址，然後點擊 **Send Request**。你將會看到類似下方程式碼片段的回應。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _注意：此結果的單位是 wei，而不是 ETH。Wei 被用作以太幣的最小面額。_

呼！我們的假錢都在那裡。
### 第 6 步：初始化我們的專案

首先，我們需要為專案建立一個資料夾。導覽至你的命令列並輸入以下內容。

```
mkdir hello-world
cd hello-world
```

現在我們已經在專案資料夾中，我們將使用 `npm init` 來初始化專案。

> 如果你尚未安裝 npm，請按照 [Node.js 安裝指示](https://nodejs.org/en/download/)來安裝 Node.js 和 npm。

就本教學而言，你如何回答初始化問題並不重要。以下是我們的做法，供你參考：

```
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

核准 package.json，我們就可以開始了！
### 第 7 步：下載 Hardhat {#step-7-download-hardhat}

Hardhat 是一個用於編譯、部署、測試和除錯以太坊軟體的開發環境。它幫助開發者在部署到即時鏈之前，在本地端建立智能合約和去中心化應用程式 (dapp)。

在我們的 `hello-world` 專案中執行：

```
npm install --save-dev hardhat
```

查看此頁面以獲取有關[安裝指示](https://hardhat.org/getting-started/#overview)的更多詳細資訊。

### 第 8 步：建立 Hardhat 專案 {#step-8-create-hardhat-project}

在我們的 `hello-world` 專案資料夾中，執行：

```
npx hardhat
```

然後你應該會看到一條歡迎訊息和選擇你想要做什麼的選項。選擇「create an empty hardhat.config.js」：

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

這將在專案中產生一個 `hardhat.config.js` 檔案。我們稍後將在本教學中使用它來指定我們專案的設定。

### 第 9 步：新增專案資料夾 {#step-9-add-project-folders}

為了保持專案井然有序，讓我們建立兩個新資料夾。在命令列中，導覽至你的 `hello-world` 專案的根目錄並輸入：

```
mkdir contracts
mkdir scripts
```

- `contracts/` 是我們存放 hello world 智能合約程式碼檔案的地方
- `scripts/` 是我們存放用於部署和與我們的合約互動的腳本的地方

### 第 10 步：編寫我們的合約 {#step-10-write-our-contract}

你可能會問自己，我們什麼時候才要寫程式碼？就是現在！

在你最喜歡的編輯器中打開 hello-world 專案。智能合約最常使用 Solidity 編寫，我們將使用它來編寫我們的智能合約。‌

1. 導覽至 `contracts` 資料夾並建立一個名為 `HelloWorld.sol` 的新檔案
2. 以下是我們將在本教學中使用的 Hello World 智能合約範例。將以下內容複製到 `HelloWorld.sol` 檔案中。

_注意：請務必閱讀註解以了解此合約的作用。_

```
// 指定 Solidity 的版本，使用語意化版本控制。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// 定義一個名為 `HelloWorld` 的合約。
// 合約是函式和資料（其狀態）的集合。一旦部署，合約就會駐留在以太坊區塊鏈上的特定地址。了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // 當呼叫 update 函式時發出
   // 智能合約事件是你的合約向應用程式前端傳達區塊鏈上發生了某事的一種方式，前端可以「監聽」特定事件並在它們發生時採取行動。
   event UpdatedMessages(string oldStr, string newStr);

   // 宣告一個型別為 `string` 的狀態變數 `message`。
   // 狀態變數是其值永久儲存在合約儲存空間中的變數。關鍵字 `public` 使變數可以從合約外部存取，並建立一個其他合約或客戶端可以呼叫以存取該值的函式。
   string public message;

   // 與許多基於類別的物件導向語言類似，建構子是一個特殊的函式，僅在建立合約時執行。
   // 建構子用於初始化合約的資料。了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 接受一個字串參數 `initMessage` 並將該值設定到合約的 `message` 儲存變數中）。
      message = initMessage;
   }

   // 一個公開函式，接受一個字串參數並更新 `message` 儲存變數。
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

這是一個基本的智能合約，在建立時儲存一則訊息。可以透過呼叫 `update` 函式來更新它。

### 第 11 步：將梅塔馬斯克與 Alchemy 連接到你的專案 {#step-11-connect-metamask-alchemy-to-your-project}

我們已經建立了一個梅塔馬斯克錢包、Alchemy 帳戶，並編寫了我們的智能合約，現在是時候將這三者連接起來了。

從你的錢包發送的每筆交易都需要使用你獨特的私密金鑰進行簽章。為了向我們的程式提供此權限，我們可以安全地將我們的私密金鑰儲存在環境檔案中。我們也將在這裡儲存 Alchemy 的 API 金鑰。

> 要了解有關發送交易的更多資訊，請查看[這篇關於使用 Web3 發送交易的教學](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)。

首先，在你的專案目錄中安裝 dotenv 套件：

```
npm install dotenv --save
```

然後，在專案的根目錄中建立一個 `.env` 檔案。將你的梅塔馬斯克私密金鑰和 HTTP Alchemy API URL 新增到其中。

你的環境檔案必須命名為 `.env`，否則它將不會被識別為環境檔案。

不要將其命名為 `process.env` 或 `.env-custom` 或任何其他名稱。

- 按照[這些指示](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)匯出你的私密金鑰
- 請參閱下方以獲取 HTTP Alchemy API URL

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

你的 `.env` 應該看起來像這樣：

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

為了實際將這些連接到我們的程式碼，我們將在第 13 步的 `hardhat.config.js` 檔案中參考這些變數。

### 第 12 步：安裝 Ethers.js {#step-12-install-ethersjs}

Ethers.js 是一個函式庫，它透過將[標準 JSON-RPC 方法](/developers/docs/apis/json-rpc/)包裝成更使用者友善的方法，使與以太坊互動和發出請求變得更加容易。

Hardhat 允許我們整合[外掛程式](https://hardhat.org/plugins/)以獲得額外的工具和擴充功能。我們將利用 [Ethers 外掛程式](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)來進行合約部署。

在你的專案目錄中輸入：

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### 第 13 步：更新 hardhat.config.js {#step-13-update-hardhat-configjs}

到目前為止，我們已經新增了幾個相依套件和外掛程式，現在我們需要更新 `hardhat.config.js`，以便我們的專案知道它們的存在。

將你的 `hardhat.config.js` 更新為如下所示：

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

### 第 14 步：編譯我們的合約 {#step-14-compile-our-contract}

為了確保到目前為止一切運作正常，讓我們編譯我們的合約。`compile` 任務是內建的 Hardhat 任務之一。

從命令列執行：

```bash
npx hardhat compile
```

你可能會收到關於 `SPDX license identifier not provided in source file` 的警告，但不用擔心——希望其他一切看起來都不錯！如果沒有，你隨時可以在 [Alchemy Discord](https://discord.gg/u72VCg3) 中留言。

### 第 15 步：編寫我們的部署腳本 {#step-15-write-our-deploy-script}

現在我們的合約已經寫好，設定檔也準備就緒，是時候編寫我們的合約部署腳本了。

導覽至 `scripts/` 資料夾並建立一個名為 `deploy.js` 的新檔案，將以下內容新增到其中：

```javascript
async function main() {
  const HelloWorld = await ethers.get合約Factory("HelloWorld")

  // 開始部署，回傳一個解析為合約物件的 promise
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat 在他們的[合約教學](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)中非常出色地解釋了這些程式碼每一行的作用，我們在這裡採用了他們的解釋。

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js 中的 `ContractFactory` 是一個用於部署新智能合約的抽象概念，因此這裡的 `HelloWorld` 是我們 hello world 合約實例的[工廠](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>)。當使用 `hardhat-ethers` 外掛程式 `ContractFactory` 和 `Contract` 時，實例預設會連接到第一個簽署者（擁有者）。

```javascript
const hello_world = await HelloWorld.deploy()
```

在 `ContractFactory` 上呼叫 `deploy()` 將開始部署，並返回一個解析為 `Contract` 物件的 `Promise`。這是一個為我們每個智能合約函式提供方法的物件。

### 第 16 步：部署我們的合約 {#step-16-deploy-our-contract}

我們終於準備好部署我們的智能合約了！導覽至命令列並執行：

```bash
npx hardhat run scripts/deploy.js --network goerli
```

然後你應該會看到類似以下的內容：

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**請儲存此地址**。我們稍後將在本教學中使用它。

如果我們前往 [Goerli Etherscan](https://goerli.etherscan.io) 並搜尋我們的合約地址，我們應該能夠看到它已成功部署。交易看起來會像這樣：

![](./etherscan-contract.png)

`From` 地址應該與你的梅塔馬斯克帳戶地址相符，而 `To` 地址將顯示 **Contract Creation**。如果我們點擊進入交易，我們將在 `To` 欄位中看到我們的合約地址。

![](./etherscan-transaction.png)

恭喜！你剛剛將智能合約部署到了以太坊測試網。

為了了解底層發生了什麼事，讓我們導覽至 [Alchemy 儀表板](https://dashboard.alchemy.com/explorer)中的 Explorer 索引標籤。如果你有多個 Alchemy 應用程式，請確保按應用程式篩選並選擇 **Hello World**。

![](./hello-world-explorer.png)

在這裡，你將看到當我們呼叫 `.deploy()` 函式時，Hardhat/Ethers 在底層為我們執行的一些 JSON-RPC 方法。這裡有兩個重要的方法：[`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction)，這是將我們的合約寫入 Goerli 鏈的請求；以及 [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash)，這是根據雜湊值讀取有關我們交易資訊的請求。要了解有關發送交易的更多資訊，請查看[我們關於使用 Web3 發送交易的教學](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)。

## 第 2 部分：與你的智能合約互動 {#part-2-interact-with-your-smart-contract}

既然我們已經成功將智能合約部署到 Goerli 網路，接下來讓我們學習如何與它互動。

### 建立 interact.js 檔案 {#create-a-interactjs-file}

我們將在這個檔案中撰寫互動腳本。我們將使用你先前在第 1 部分安裝的 Ethers.js 函式庫。

在 `scripts/` 資料夾中，建立一個名為 `interact.js` 的新檔案，並加入以下程式碼：

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### 更新你的 .env 檔案 {#update-your-env-file}

我們將使用新的環境變數，因此我們需要在[我們先前建立的](#step-11-connect-metamask-alchemy-to-your-project) `.env` 檔案中定義它們。

我們需要為我們的 Alchemy `API_KEY` 以及部署智能合約的 `CONTRACT_ADDRESS` 加入定義。

你的 `.env` 檔案應該會看起來像這樣：

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### 取得你的合約 ABI {#grab-your-contract-abi}

我們的合約 [ABI（應用程式二進位介面）](/glossary/#abi) 是與智能合約互動的介面。Hardhat 會自動產生一個 ABI 並將其儲存在 `HelloWorld.json` 中。為了使用 ABI，我們需要透過在 `interact.js` 檔案中加入以下程式碼來解析其內容：

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

如果你想查看 ABI，可以將它印出到主控台：

```javascript
console.log(JSON.stringify(contract.abi))
```

若要查看印出到主控台的 ABI，請前往你的終端機並執行：

```bash
npx hardhat run scripts/interact.js
```

### 建立你的合約實例 {#create-an-instance-of-your-contract}

為了與我們的合約互動，我們需要在程式碼中建立一個合約實例。若要使用 Ethers.js 執行此操作，我們需要了解三個概念：

1. 供應商 (Provider) - 提供你對區塊鏈讀寫權限的節點供應商
2. 簽署者 (Signer) - 代表一個可以簽署交易的以太坊帳戶
3. 合約 (Contract) - 代表部署在鏈上特定合約的 Ethers.js 物件

我們將使用上一個步驟中的合約 ABI 來建立我們的合約實例：

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

在 [ethers.js 文件](https://docs.ethers.io/v5/)中了解更多關於供應商、簽署者和合約的資訊。

### 讀取初始訊息 {#read-the-init-message}

還記得我們使用 `initMessage = "Hello world!"` 部署合約的時候嗎？我們現在要讀取儲存在智能合約中的該訊息，並將其印出到主控台。

在 JavaScript 中，與網路互動時會使用非同步函式。若要了解更多關於非同步函式的資訊，請[閱讀這篇 Medium 文章](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)。

使用下方的程式碼來呼叫我們智能合約中的 `message` 函式，並讀取初始訊息：

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

在終端機中使用 `npx hardhat run scripts/interact.js` 執行檔案後，我們應該會看到這個回應：

```
訊息是：Hello world!
```

恭喜！你剛剛成功從以太坊區塊鏈讀取了智能合約資料，做得好！

### 更新訊息 {#update-the-message}

除了讀取訊息之外，我們還可以使用 `update` 函式來更新儲存在智能合約中的訊息！很酷吧？

若要更新訊息，我們可以直接在實例化的合約物件上呼叫 `update` 函式：

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

請注意，在第 11 行，我們對回傳的交易物件呼叫了 `.wait()`。這確保了我們的腳本在退出函式之前，會等待交易在區塊鏈上被開採。如果沒有包含 `.wait()` 呼叫，腳本可能無法在合約中看到更新後的 `message` 值。

### 讀取新訊息 {#read-the-new-message}

你應該能夠重複[上一個步驟](#read-the-init-message)來讀取更新後的 `message` 值。花點時間看看你是否能進行必要的修改，將那個新值印出來！

如果你需要提示，以下是你的 `interact.js` 檔案此時應該看起來的樣子：

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

// 簽署者 - 你
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// 合約實例
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

現在只要執行腳本，你應該就能在終端機中看到印出的舊訊息、更新狀態以及新訊息！

`npx hardhat run scripts/interact.js --network goerli`

```
訊息是：Hello World!
正在更新訊息...
新訊息是：This is the new message.
```

在執行該腳本時，你可能會注意到 `Updating the message...` 步驟需要載入一段時間，然後才會載入新訊息。這是因為開採過程的緣故；如果你對在交易開採期間追蹤交易感到好奇，請造訪 [Alchemy 記憶體池 (mempool)](https://dashboard.alchemy.com/mempool) 來查看交易狀態。如果交易被丟棄，檢查 [Goerli Etherscan](https://goerli.etherscan.io) 並搜尋你的交易雜湊也會很有幫助。

## 第三部分：將你的智能合約發佈到 Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

你已經完成了讓智能合約運作的所有艱難工作；現在是時候與全世界分享它了！

透過在 Etherscan 上驗證你的智能合約，任何人都可以查看你的原始碼並與你的智能合約互動。我們開始吧！

### 第一步：在你的 Etherscan 帳戶中產生 API 金鑰 {#step-1-generate-an-api-key-on-your-etherscan-account}

必須要有 Etherscan API 金鑰，才能驗證你擁有嘗試發佈的智能合約。

如果你還沒有 Etherscan 帳戶，請[註冊一個帳戶](https://etherscan.io/register)。

登入後，在導覽列中找到你的使用者名稱，將滑鼠游標懸停在上面，然後選擇 **My profile** 按鈕。

在你的個人資料頁面上，你應該會看到一個側邊導覽列。從側邊導覽列中選擇 **API Keys**。接著，按下「Add」按鈕來建立新的 API 金鑰，將你的應用程式命名為 **hello-world**，然後按下 **Create New API Key** 按鈕。

你的新 API 金鑰應該會出現在 API 金鑰表格中。將該 API 金鑰複製到剪貼簿。

接下來，我們需要將 Etherscan API 金鑰新增到我們的 `.env` 檔案中。

新增後，你的 `.env` 檔案應該會像這樣：

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### 使用 Hardhat 部署的智能合約 {#hardhat-deployed-smart-contracts}

#### 安裝 hardhat-etherscan {#install-hardhat-etherscan}

使用 Hardhat 將你的合約發佈到 Etherscan 非常簡單。首先，你需要安裝 `hardhat-etherscan` 外掛程式才能開始。`hardhat-etherscan` 會自動在 Etherscan 上驗證智能合約的原始碼和 ABI。要新增此功能，請在 `hello-world` 目錄中執行：

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

安裝完成後，在你的 `hardhat.config.js` 頂部加入以下陳述式，並新增 Etherscan 設定選項：

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
    // 你的 Etherscan API 金鑰
    // 請至 https://etherscan.io/ 取得
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### 在 Etherscan 上驗證你的智能合約 {#verify-your-smart-contract-on-etherscan}

確保所有檔案都已儲存，且所有 `.env` 變數都已正確設定。

執行 `verify` 任務，傳入合約地址以及它所部署的網路：

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

請確保 `DEPLOYED_CONTRACT_ADDRESS` 是你在 Goerli 測試網上部署的智能合約地址。此外，最後一個參數（`'Hello World!'`）必須與[第一部分部署步驟中](#step-15-write-our-deploy-script)使用的字串值相同。

如果一切順利，你將在終端機中看到以下訊息：

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

恭喜！你的智能合約程式碼已經在 Etherscan 上了！

### 在 Etherscan 上查看你的智能合約！ {#check-out-your-smart-contract-on-etherscan}

當你前往終端機中提供的連結時，你應該能夠看到發佈在 Etherscan 上的智能合約程式碼和 ABI！

**太棒了——你做到了，冠軍！現在任何人都可以呼叫或寫入你的智能合約！我們等不及想看你接下來會打造什麼了！**

## 第 4 部分 - 將您的智能合約與前端整合 {#part-4-integrating-your-smart-contract-with-the-frontend}

在本教學結束時，您將了解如何：

- 將梅塔馬斯克 (MetaMask) 錢包連接到您的去中心化應用程式 (dapp)
- 使用 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) API 從您的智能合約讀取資料
- 使用梅塔馬斯克簽署以太坊交易

對於這個 dapp，我們將使用 [React](https://react.dev/) 作為我們的前端框架；然而，需要注意的是，我們不會花太多時間來解析它的基礎知識，因為我們將主要專注於為我們的專案帶來 Web3 功能。

作為先決條件，您應該對 React 有初學者程度的了解。如果沒有，我們建議您完成官方的 [React 介紹教學](https://react.dev/learn)。

### 複製起始檔案 {#clone-the-starter-files}

首先，前往 [hello-world-part-four GitHub 儲存庫](https://github.com/alchemyplatform/hello-world-part-four-tutorial) 取得此專案的起始檔案，並將此儲存庫複製到您的本機電腦。

在本機開啟複製的儲存庫。請注意，它包含兩個資料夾：`starter-files` 和 `completed`。

- `starter-files` - **我們將在這個目錄中工作**，我們將把使用者介面 (UI) 連接到您的以太坊錢包以及我們在[第 3 部分](#part-3-publish-your-smart-contract-to-etherscan)發佈到 Etherscan 的智能合約。
- `completed` 包含整個已完成的教學，僅應在您卡住時作為參考。

接下來，在您最喜歡的程式碼編輯器中開啟您的 `starter-files` 副本，然後導覽至 `src` 資料夾。

我們將編寫的所有程式碼都將位於 `src` 資料夾下。我們將編輯 `HelloWorld.js` 元件和 `util/interact.js` JavaScript 檔案，以賦予我們的專案 Web3 功能。

### 檢查起始檔案 {#check-out-the-starter-files}

在我們開始編寫程式碼之前，讓我們先探索起始檔案中提供了什麼。

#### 讓您的 React 專案執行起來 {#get-your-react-project-running}

讓我們先在瀏覽器中執行 React 專案。React 的優點在於，一旦我們的專案在瀏覽器中執行，我們儲存的任何變更都會在瀏覽器中即時更新。

要讓專案執行，請導覽至 `starter-files` 資料夾的根目錄，然後在您的終端機中執行 `npm install` 以安裝專案的相依套件：

```bash
cd starter-files
npm install
```

一旦這些安裝完成，在您的終端機中執行 `npm start`：

```bash
npm start
```

這樣做應該會在您的瀏覽器中開啟 [http://localhost:3000/](http://localhost:3000/)，您將在那裡看到我們專案的前端。它應該包含一個欄位（一個更新儲存在您智能合約中訊息的地方）、一個「連接錢包 (Connect Wallet)」按鈕和一個「更新 (Update)」按鈕。

如果您嘗試點擊任一按鈕，您會發現它們不起作用——這是因為我們仍然需要編寫它們的功能程式碼。

#### `HelloWorld.js` 元件 {#the-helloworld-js-component}

讓我們回到編輯器中的 `src` 資料夾並開啟 `HelloWorld.js` 檔案。了解此檔案中的所有內容非常重要，因為它是我們將要處理的主要 React 元件。

在此檔案的頂部，您會注意到我們有幾個讓專案執行所必需的 import 語句，包括 React 函式庫、useEffect 和 useState hooks、來自 `./util/interact.js` 的一些項目（我們很快會詳細描述它們！），以及 Alchemy 標誌。

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
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

以下是每個變數代表的含義：

- `walletAddress` - 儲存使用者錢包地址的字串
- `status` - 儲存有用訊息的字串，引導使用者如何與 dapp 互動
- `message` - 儲存智能合約中目前訊息的字串
- `newMessage` - 儲存將寫入智能合約的新訊息的字串

在狀態變數之後，您會看到五個未實作的函式：`useEffect`、`addSmartContractListener`、`addWalletListener`、`connectWalletPressed` 和 `onUpdatePressed`。我們將在下面解釋它們的作用：

```javascript
// HelloWorld.js

//只被呼叫一次
useEffect(async () => {
  //待辦：實作
}, [])

function addSmartContractListener() {
  //待辦：實作
}

function addWalletListener() {
  //待辦：實作
}

const connectWalletPressed = async () => {
  //待辦：實作
}

const onUpdatePressed = async () => {
  //待辦：實作
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - 這是一個在您的元件渲染後被呼叫的 React hook。因為它傳入了一個空陣列 `[]` 屬性（見第 4 行），所以它只會在元件的_第一次_渲染時被呼叫。在這裡，我們將載入儲存在我們智能合約中的目前訊息，呼叫我們的智能合約和錢包監聽器，並更新我們的 UI 以反映錢包是否已經連接。
- `addSmartContractListener` - 此函式設定一個監聽器，它將觀察我們 HelloWorld 合約的 `UpdatedMessages` 事件，並在我們智能合約中的訊息更改時更新我們的 UI。
- `addWalletListener` - 此函式設定一個監聽器，用於偵測使用者梅塔馬斯克錢包狀態的變化，例如當使用者斷開錢包連接或切換地址時。
- `connectWalletPressed` - 將呼叫此函式以將使用者的梅塔馬斯克錢包連接到我們的 dapp。
- `onUpdatePressed` - 當使用者想要更新儲存在智能合約中的訊息時，將呼叫此函式。

在此檔案的末尾附近，我們有我們元件的 UI。

```javascript
// HelloWorld.js

//我們元件的使用者介面
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

如果您仔細掃描此程式碼，您會注意到我們在 UI 中使用各種狀態變數的位置：

- 在第 6-12 行，如果使用者的錢包已連接（即 `walletAddress.length > 0`），我們會在 ID 為「walletButton」的按鈕中顯示使用者 `walletAddress` 的截斷版本；否則它只會顯示「Connect Wallet」。
- 在第 17 行，我們顯示儲存在智能合約中的目前訊息，該訊息被擷取在 `message` 字串中。
- 在第 23-26 行，當文字欄位中的輸入發生變化時，我們使用[受控元件](https://legacy.reactjs.org/docs/forms.html#controlled-components)來更新我們的 `newMessage` 狀態變數。

除了我們的狀態變數之外，您還會看到當分別點擊 ID 為 `publishButton` 和 `walletButton` 的按鈕時，會呼叫 `connectWalletPressed` 和 `onUpdatePressed` 函式。

最後，讓我們來看看這個 `HelloWorld.js` 元件被加在哪裡。

如果您前往 `App.js` 檔案（它是 React 中的主要元件，充當所有其他元件的容器），您會看到我們的 `HelloWorld.js` 元件被注入在第 7 行。

最後但同樣重要的是，讓我們檢查為您提供的另一個檔案，即 `interact.js` 檔案。

#### `interact.js` 檔案 {#the-interact-js-file}

因為我們想要遵循 [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 典範，所以我們需要一個獨立的檔案來包含我們所有管理 dapp 邏輯、資料和規則的函式，然後能夠將這些函式匯出到我們的前端（我們的 `HelloWorld.js` 元件）。

👆🏽這正是我們 `interact.js` 檔案的目的！

導覽至您 `src` 目錄中的 `util` 資料夾，您會注意到我們包含了一個名為 `interact.js` 的檔案，它將包含我們所有的智能合約互動以及錢包函式和變數。

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

您會注意到在檔案的頂部，我們已經註解掉了 `helloWorldContract` 物件。在本教學的稍後部分，我們將取消註解此物件並在此變數中實例化我們的智能合約，然後我們將其匯出到我們的 `HelloWorld.js` 元件中。

在我們的 `helloWorldContract` 物件之後的四個未實作函式執行以下操作：

- `loadCurrentMessage` - 此函式處理載入儲存在智能合約中目前訊息的邏輯。它將使用 [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3) 對 Hello World 智能合約進行_讀取_呼叫。
- `connectWallet` - 此函式將使用者的梅塔馬斯克連接到我們的 dapp。
- `getCurrentWalletConnected` - 此函式將在頁面載入時檢查是否已有以太坊帳戶連接到我們的 dapp，並相應地更新我們的 UI。
- `updateMessage` - 此函式將更新儲存在智能合約中的訊息。它將對 Hello World 智能合約進行_寫入_呼叫，因此使用者的梅塔馬斯克錢包必須簽署一筆以太坊交易來更新訊息。

現在我們了解了我們正在處理的內容，讓我們弄清楚如何從我們的智能合約中讀取資料！

### 第 3 步：從您的智能合約讀取 {#step-3-read-from-your-smart-contract}

要從您的智能合約讀取，您需要成功設定：

- 到以太坊鏈的 API 連線
- 您的智能合約的已載入實例
- 呼叫您智能合約函式的函式
- 一個監聽器，用於在您從智能合約讀取的資料發生變化時觀察更新

這聽起來可能有很多步驟，但別擔心！我們將逐步引導您完成每一個步驟！ :\)

#### 建立與以太坊鏈的 API 連線
還記得在本教學的第 2 部分中，我們如何使用 Alchemy Web3 金鑰從智能合約中讀取資料嗎？您在去中心化應用程式 (dapp) 中也需要一個 Alchemy Web3 金鑰才能從鏈上讀取資料。

如果您還沒有安裝，請先導覽至 `starter-files` 的根目錄，並在終端機中執行以下指令來安裝 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)：

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) 是 [Web3.js](https://docs.web3js.org/) 的包裝器，提供增強的 API 方法和其他重要優勢，讓您作為 Web3 開發者的生活更加輕鬆。它的設計只需要最少的設定，因此您可以立即開始在應用程式中使用它！

接著，在您的專案目錄中安裝 [dotenv](https://www.npmjs.com/package/dotenv) 套件，這樣我們在取得 API 金鑰後，就有一個安全的地方來儲存它。

```text
npm install dotenv --save
```

對於我們的 dapp，**我們將使用 Websockets API 金鑰**而不是 HTTP API 金鑰，因為這將允許我們設定一個監聽器，用來偵測儲存在智能合約中的訊息何時發生變化。

取得 API 金鑰後，在您的根目錄中建立一個 `.env` 檔案，並將您的 Alchemy Websockets URL 新增到其中。之後，您的 `.env` 檔案應該會像這樣：

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

現在，我們準備好在我們的 dapp 中設定 Alchemy Web3 端點了！讓我們回到位於 `util` 資料夾內的 `interact.js`，並在檔案頂部加入以下程式碼：

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

在上面的程式碼中，我們先從 `.env` 檔案匯入 Alchemy 金鑰，然後將我們的 `alchemyKey` 傳遞給 `createAlchemyWeb3` 以建立我們的 Alchemy Web3 端點。

端點準備就緒後，是時候載入我們的智能合約了！
#### 載入您的 Hello World 智能合約 {#loading-your-hello-world-smart-contract}

要載入您的 Hello World 智能合約，您需要它的合約地址和 ABI，如果您完成了[本教學的第 3 部分](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)，這兩者都可以在 Etherscan 上找到。

#### 如何從 Etherscan 取得您的合約 ABI {#how-to-get-your-contract-abi-from-etherscan}

如果您跳過了本教學的第 3 部分，您可以使用地址為 [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) 的 HelloWorld 合約。它的 ABI 可以在[這裡](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code)找到。

合約 ABI 對於指定合約將呼叫哪個函式以及確保函式將以您期望的格式傳回資料是必要的。一旦我們複製了我們的合約 ABI，讓我們將其儲存為名為 `contract-abi.json` 的 JSON 檔案，放在您的 `src` 目錄中。

您的 contract-abi.json 應該儲存在您的 src 資料夾中。

有了我們的合約地址、ABI 和 Alchemy Web3 端點，我們可以使用 [contract 方法](https://docs.web3js.org/api/web3-eth-contract/class/Contract)來載入我們智能合約的實例。將您的合約 ABI 匯入到 `interact.js` 檔案中並新增您的合約地址。

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

我們現在終於可以取消註解我們的 `helloWorldContract` 變數，並使用我們的 AlchemyWeb3 端點載入智能合約：

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

總結一下，您的 `interact.js` 的前 12 行現在應該如下所示：

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

現在我們已經載入了我們的合約，我們可以實作我們的 `loadCurrentMessage` 函式了！

#### 在您的 `interact.js` 檔案中實作 `loadCurrentMessage` {#implementing-loadcurrentmessage-in-your-interact-js-file}

這個函式非常簡單。我們將進行一個簡單的非同步 Web3 呼叫來從我們的合約讀取。我們的函式將傳回儲存在智能合約中的訊息：

將您 `interact.js` 檔案中的 `loadCurrentMessage` 更新為以下內容：

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

因為我們想要在我們的 UI 中顯示這個智能合約，所以讓我們將 `HelloWorld.js` 元件中的 `useEffect` 函式更新為以下內容：

```javascript
// HelloWorld.js

//只被呼叫一次
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

請注意，我們只希望我們的 `loadCurrentMessage` 在元件的第一次渲染期間被呼叫一次。我們很快就會實作 `addSmartContractListener`，以便在智能合約中的訊息更改後自動更新 UI。

在我們深入研究我們的監聽器之前，讓我們先檢查一下我們目前擁有的內容！儲存您的 `HelloWorld.js` 和 `interact.js` 檔案，然後前往 [http://localhost:3000/](http://localhost:3000/)

您會注意到目前的訊息不再顯示「No connection to the network.」。相反，它反映了儲存在智能合約中的訊息。太酷了！

#### 您的 UI 現在應該反映儲存在智能合約中的訊息 {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

現在說到那個監聽器……

#### 實作 `addSmartContractListener` {#implement-addsmartcontractlistener}

如果您回想一下我們在[本教學系列第 1 部分](#step-10-write-our-contract)中編寫的 `HelloWorld.sol` 檔案，您會記得有一個名為 `UpdatedMessages` 的智能合約事件，它在我們智能合約的 `update` 函式被呼叫後發出（見第 9 行和第 27 行）：

```javascript
// HelloWorld.sol

// 指定 Solidity 的版本，使用語意化版本控制。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// 定義一個名為 `HelloWorld` 的合約。
// 合約是函式與資料（其狀態）的集合。一旦部署，合約就會駐留在以太坊區塊鏈上的特定地址。了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //當呼叫 update 函式時發出
   //智能合約事件是你的合約將區塊鏈上發生的事情傳達給應用程式前端的一種方式，前端可以「監聽」特定事件並在事件發生時採取行動。
   event UpdatedMessages(string oldStr, string newStr);

   // 宣告一個型別為 `string` 的狀態變數 `message`。
   // 狀態變數是其值永久儲存在合約儲存空間中的變數。關鍵字 `public` 讓變數可以從合約外部存取，並建立一個其他合約或客戶端可以呼叫以存取該值的函式。
   string public message;

   // 與許多基於類別的物件導向語言類似，建構子是一個特殊的函式，只在建立合約時執行。
   // 建構子用於初始化合約的資料。了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 接受一個字串參數 `initMessage` 並將該值設定到合約的 `message` 儲存變數中）。
      message = initMessage;
   }

   // 一個公開函式，接受一個字串參數並更新 `message` 儲存變數。
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

智能合約事件是您的合約將區塊鏈上發生的事情（即發生了一個_事件_）傳達給您的前端應用程式的一種方式，前端應用程式可以「監聽」特定事件並在它們發生時採取行動。

`addSmartContractListener` 函式將專門監聽我們 Hello World 智能合約的 `UpdatedMessages` 事件，並更新我們的 UI 以顯示新訊息。

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
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

讓我們分解一下當監聽器偵測到事件時會發生什麼：

- 如果在發出事件時發生錯誤，它將透過我們的 `status` 狀態變數反映在 UI 中。
- 否則，我們將使用傳回的 `data` 物件。`data.returnValues` 是一個從零開始索引的陣列，其中陣列中的第一個元素儲存先前的訊息，第二個元素儲存更新後的訊息。總而言之，在成功的事件中，我們將把我們的 `message` 字串設定為更新後的訊息，清除 `newMessage` 字串，並更新我們的 `status` 狀態變數以反映新訊息已發佈在我們的智能合約上。

最後，讓我們在我們的 `useEffect` 函式中呼叫我們的監聽器，以便它在 `HelloWorld.js` 元件的第一次渲染時被初始化。總而言之，您的 `useEffect` 函式應該如下所示：

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

現在我們能夠從我們的智能合約讀取資料了，如果能弄清楚如何寫入它就太好了！然而，要寫入我們的 dapp，我們必須先將一個以太坊錢包連接到它。

因此，接下來我們將著手設定我們的以太坊錢包（梅塔馬斯克），然後將其連接到我們的 dapp！

### 第 4 步：設定您的以太坊錢包 {#step-4-set-up-your-ethereum-wallet}

要將任何內容寫入以太坊鏈，使用者必須使用其虛擬錢包的私鑰簽署交易。在本教學中，我們將使用 [梅塔馬斯克](https://metamask.io/)，這是一個瀏覽器中的虛擬錢包，用於管理您的以太坊帳戶地址，因為它讓終端使用者可以非常輕鬆地進行交易簽署。

如果您想進一步了解以太坊上的交易如何運作，請查看以太坊基金會的[這個頁面](/developers/docs/transactions/)。

#### 下載梅塔馬斯克 {#download-metamask}

您可以免費在[這裡](https://metamask.io/download)下載並建立一個梅塔馬斯克帳戶。當您建立帳戶時，或者如果您已經有一個帳戶，請確保切換到右上角的「Goerli 測試網 (Goerli Test Network)」（這樣我們就不會處理真錢）。

#### 從水龍頭新增以太幣 {#add-ether-from-a-faucet}

要在以太坊區塊鏈上簽署交易，我們需要一些假的 ETH。要取得 ETH，您可以前往 [FaucETH](https://fauceth.komputing.org) 並輸入您的 Goerli 帳戶地址，點擊「Request funds」，然後在下拉選單中選擇「Ethereum Testnet Goerli」，最後再次點擊「Request funds」按鈕。不久之後，您應該會在您的梅塔馬斯克帳戶中看到 ETH！

#### 檢查你的餘額

為了再次確認我們的餘額，讓我們使用 [Alchemy 的沙盒工具](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)發出 [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) 請求。這將回傳我們錢包中的 ETH 數量。在輸入你的梅塔馬斯克帳戶地址並點擊「Send Request」後，你應該會看到類似這樣的回應：

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注意：** 此結果的單位是 wei，而不是 ETH。Wei 是以太幣的最小面額單位。從 wei 到 ETH 的轉換公式為：1 ETH = 10¹⁸ wei。因此，如果我們將 0xde0b6b3a7640000 轉換為十進位，我們會得到 1\*10¹⁸，這等於 1 ETH。

呼！我們的假錢都在那裡了！ 🤑
### 第 5 步：將梅塔馬斯克連接到您的 UI {#step-5-connect-metamask-to-your-ui}

現在我們的梅塔馬斯克錢包已經設定好了，讓我們將我們的 dapp 連接到它！

#### `connectWallet` 函式 {#the-connectwallet-function}

在我們的 `interact.js` 檔案中，讓我們實作 `connectWallet` 函式，然後我們可以在我們的 `HelloWorld.js` 元件中呼叫它。

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
        status: "👆🏽 Write a message in the text-field above.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

那麼這大塊程式碼到底是做什麼的呢？

首先，它會檢查您的瀏覽器中是否啟用了 `window.ethereum`。

`window.ethereum` 是由梅塔馬斯克和其他錢包提供商注入的全域 API，允許網站請求使用者的以太坊帳戶。如果獲得批准，它可以從使用者連接的區塊鏈讀取資料，並建議使用者簽署訊息和交易。查看[梅塔馬斯克文件](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)以獲取更多資訊！

如果 `window.ethereum` _不存在_，則表示未安裝梅塔馬斯克。這會導致傳回一個 JSON 物件，其中傳回的 `address` 是一個空字串，並且 `status` JSX 物件傳達使用者必須安裝梅塔馬斯克。

現在，如果 `window.ethereum` _存在_，那麼事情就變得有趣了。

使用 try/catch 迴圈，我們將嘗試透過呼叫 [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) 來連接到梅塔馬斯克。呼叫此函式將在瀏覽器中開啟梅塔馬斯克，從而提示使用者將其錢包連接到您的 dapp。

- 如果使用者選擇連接，`method: "eth_requestAccounts"` 將傳回一個陣列，其中包含連接到 dapp 的所有使用者帳戶地址。總而言之，我們的 `connectWallet` 函式將傳回一個 JSON 物件，其中包含此陣列中的_第一個_ `address`（見第 9 行）以及一個提示使用者向智能合約寫入訊息的 `status` 訊息。
- 如果使用者拒絕連接，則 JSON 物件將包含一個空字串作為傳回的 `address`，以及一個反映使用者拒絕連接的 `status` 訊息。

現在我們已經編寫了這個 `connectWallet` 函式，下一步是在我們的 `HelloWorld.js` 元件中呼叫它。

#### 將 `connectWallet` 函式新增到您的 `HelloWorld.js` UI 元件 {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

導覽至 `HelloWorld.js` 中的 `connectWalletPressed` 函式，並將其更新為以下內容：

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

注意到我們的大部分功能是如何從 `interact.js` 檔案中抽象出來，遠離我們的 `HelloWorld.js` 元件的嗎？這是為了讓我們遵守 M-V-C 典範！

在 `connectWalletPressed` 中，我們只需對匯入的 `connectWallet` 函式進行 await 呼叫，並使用其響應，透過它們的狀態 hooks 更新我們的 `status` 和 `walletAddress` 變數。

現在，讓我們儲存這兩個檔案（`HelloWorld.js` 和 `interact.js`）並測試我們目前的 UI。

在瀏覽器中開啟 [http://localhost:3000/](http://localhost:3000/) 頁面，然後按下頁面右上角的「Connect Wallet」按鈕。

如果您安裝了梅塔馬斯克，系統應該會提示您將錢包連接到您的 dapp。接受連接邀請。

您應該會看到錢包按鈕現在反映您的地址已連接！太棒了 🔥

接下來，嘗試重新整理頁面……這很奇怪。我們的錢包按鈕提示我們連接梅塔馬斯克，即使它已經連接了……

不過，別擔心！我們可以透過實作 `getCurrentWalletConnected` 輕鬆解決這個問題（懂了嗎？），它將檢查是否已有地址連接到我們的 dapp 並相應地更新我們的 UI！

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
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

這段程式碼與我們在上一步中剛寫的 `connectWallet` 函式_非常_相似。

主要區別在於，我們不是呼叫 `eth_requestAccounts` 方法（該方法會為使用者開啟梅塔馬斯克以連接其錢包），而是呼叫 `eth_accounts` 方法，該方法僅傳回一個包含目前連接到我們 dapp 的梅塔馬斯克地址的陣列。

要查看此函式的實際運作情況，讓我們在 `HelloWorld.js` 元件的 `useEffect` 函式中呼叫它：

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

請注意，我們使用對 `getCurrentWalletConnected` 呼叫的響應來更新我們的 `walletAddress` 和 `status` 狀態變數。

現在您已經新增了這段程式碼，讓我們嘗試重新整理我們的瀏覽器視窗。

太棒了！按鈕應該顯示您已連接，並顯示您已連接錢包地址的預覽 - 即使在您重新整理之後也是如此！

#### 實作 `addWalletListener` {#implement-addwalletlistener}

我們 dapp 錢包設定的最後一步是實作錢包監聽器，以便當我們錢包的狀態發生變化時（例如當使用者斷開連接或切換帳戶時），我們的 UI 會更新。

在您的 `HelloWorld.js` 檔案中，將您的 `addWalletListener` 函式修改如下：

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

我敢打賭，此時您甚至不需要我們的幫助就能理解這裡發生了什麼，但為了徹底起見，讓我們快速分解一下：

- 首先，我們的函式檢查是否啟用了 `window.ethereum`（即是否安裝了梅塔馬斯克）。
  - 如果沒有，我們只需將我們的 `status` 狀態變數設定為一個提示使用者安裝梅塔馬斯克的 JSX 字串。
  - 如果已啟用，我們在第 3 行設定監聽器 `window.ethereum.on("accountsChanged")`，它會監聽梅塔馬斯克錢包中的狀態變化，包括當使用者將其他帳戶連接到 dapp、切換帳戶或斷開帳戶連接時。如果至少有一個帳戶已連接，則 `walletAddress` 狀態變數將更新為監聽器傳回的 `accounts` 陣列中的第一個帳戶。否則，`walletAddress` 將設定為空字串。

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

就是這樣！我們已經成功完成了所有錢包功能的程式設計！現在進入我們的最後一項任務：更新儲存在我們智能合約中的訊息！

### 第 6 步：實作 `updateMessage` 函式 {#step-6-implement-the-updatemessage-function}

好了各位，我們已經到了最後衝刺階段！在您 `interact.js` 檔案的 `updateMessage` 中，我們將執行以下操作：

1. 確保我們希望在智能合約中發佈的訊息是有效的
2. 使用梅塔馬斯克簽署我們的交易
3. 從我們的 `HelloWorld.js` 前端元件呼叫此函式

這不會花很長時間；讓我們完成這個 dapp！

#### 輸入錯誤處理 {#input-error-handling}

自然地，在函式開始時進行某種輸入錯誤處理是有意義的。

如果沒有安裝梅塔馬斯克擴充功能、沒有連接錢包（即傳入的 `address` 是空字串），或者 `message` 是空字串，我們希望我們的函式提早傳回。讓我們將以下錯誤處理新增到 `updateMessage`：

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

現在它有了適當的輸入錯誤處理，是時候透過梅塔馬斯克簽署交易了！

#### 簽署我們的交易 {#signing-our-transaction}

如果您已經熟悉傳統的 Web3 以太坊交易，我們接下來編寫的程式碼將會非常熟悉。在您的輸入錯誤處理程式碼下方，將以下內容新增到 `updateMessage`：

```javascript
// interact.js

//設定交易參數
const transactionParameters = {
  to: contractAddress, // 除合約發布期間外皆為必填。
  from: address, // 必須符合使用者的有效地址。
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
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

讓我們分解一下發生了什麼。首先，我們設定我們的交易參數，其中：

- `to` 指定接收者地址（我們的智能合約）
- `from` 指定交易的簽署者，即我們傳遞給函式的 `address` 變數
- `data` 包含對我們 Hello World 智能合約的 `update` 方法的呼叫，接收我們的 `message` 字串變數作為輸入

然後，我們進行一個 await 呼叫 `window.ethereum.request`，我們要求梅塔馬斯克簽署交易。請注意，在第 11 行和第 12 行，我們指定了我們的 eth 方法 `eth_sendTransaction` 並傳入我們的 `transactionParameters`。

此時，梅塔馬斯克將在瀏覽器中開啟，並提示使用者簽署或拒絕交易。

- 如果交易成功，函式將傳回一個 JSON 物件，其中 `status` JSX 字串提示使用者查看 Etherscan 以獲取有關其交易的更多資訊。
- 如果交易失敗，函式將傳回一個 JSON 物件，其中 `status` 字串傳達錯誤訊息。

總而言之，我們的 `updateMessage` 函式應該如下所示：

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //輸入錯誤處理
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //設定交易參數
  const transactionParameters = {
    to: contractAddress, // 除合約發布期間外皆為必填。
    from: address, // 必須符合使用者的有效地址。
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
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
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

最後但同樣重要的是，我們需要將我們的 `updateMessage` 函式連接到我們的 `HelloWorld.js` 元件。

#### 將 `updateMessage` 連接到 `HelloWorld.js` 前端 {#connect-updatemessage-to-the-helloworld-js-frontend}

我們的 `onUpdatePressed` 函式應該對匯入的 `updateMessage` 函式進行 await 呼叫，並修改 `status` 狀態變數以反映我們的交易是成功還是失敗：

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

它非常乾淨和簡單。你猜怎麼著……你的 DAPP 完成了！！！

繼續並測試 **Update** 按鈕！

### 製作您自己的自訂 dapp {#make-your-own-custom-dapp}

哇，您已經到了教學的最後！總結一下，您學習了如何：

- 將梅塔馬斯克錢包連接到您的 dapp 專案
- 使用 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) API 從您的智能合約讀取資料
- 使用梅塔馬斯克簽署以太坊交易

現在您已具備充分的條件，可以應用本教學中的技能來建立您自己的自訂 dapp 專案！一如既往，如果您有任何問題，請隨時在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中與我們聯絡以尋求幫助。 🧙‍♂️

完成本教學後，請在推特 (Twitter) 上標記我們 [@alchemyplatform](https://twitter.com/AlchemyPlatform)，讓我們知道您的體驗如何或您是否有任何回饋！
