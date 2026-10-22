---
title: "如何撰寫與部署 NFT（NFT 教學系列 1/3）"
description: "本教學為 NFT 系列的第一部分，將帶您逐步了解如何使用以太坊與星際檔案系統 (IPFS) 撰寫並部署非同質化代幣（ERC-721 代幣）智能合約。"
author: "蘇米·穆吉爾"
tags:
  - ERC-721
  - Alchemy
  - Solidity
  - 智能合約
skill: beginner
breadcrumb: "撰寫與部署 NFT"
lang: zh-tw
published: 2021-04-22
---

隨著非同質化代幣 (NFT) 將區塊鏈帶入大眾視野，現在正是您親自在以太坊區塊鏈上發布自己的 NFT 合約（ERC-721 代幣），以了解這股熱潮的絕佳機會！

在本教學中，我們將逐步引導您使用 [梅塔馬斯克](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/)、[Hardhat](https://hardhat.org/)、[Pinata](https://pinata.cloud/) 與 [Alchemy](https://alchemy.com/signup/eth)，在 Sepolia 測試網上建立並部署 ERC-721 智能合約（如果您還不了解這些名詞的意思，請不要擔心，我們將會為您解釋！）。

在本教學的第 2 部分，我們將介紹如何使用我們的智能合約來鑄造 NFT，而在第 3 部分，我們將解釋如何在梅塔馬斯克上檢視您的 NFT。

當然，如果您在任何時候有疑問，請隨時在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中提問，或造訪 [Alchemy 的 NFT API 文件](https://www.alchemy.com/docs/reference/nft-api-quickstart)！

## 第 1 步：連接至以太坊網路 {#connect-to-ethereum}

向以太坊區塊鏈發出請求的方法有很多種，但為了簡單起見，我們將在 [Alchemy](https://alchemy.com/signup/eth) 上使用免費帳戶。Alchemy 是一個區塊鏈開發者平台與 API，允許我們與以太坊鏈進行通訊，而無需執行我們自己的節點。

在本教學中，我們還將利用 Alchemy 的開發者工具進行監控與分析，以了解我們智能合約部署的內部運作原理。如果您還沒有 Alchemy 帳戶，可以在[這裡](https://alchemy.com/signup/eth)免費註冊。

## 第 2 步：建立您的應用程式（與 API 金鑰） {#make-api-key}

建立 Alchemy 帳戶後，您可以透過建立應用程式來產生應用程式介面 (API) 金鑰。這將允許我們向 Sepolia 測試網發出請求。如果您想了解更多關於測試網的資訊，請查看[本指南](https://www.alchemy.com/docs/choosing-a-web3-network)。

1. 在導覽列中選擇「Select an app」並點擊「Create new app」，導覽至 Alchemy 儀表板中的「Create new app」頁面。

![建立您的應用程式](./alchemy-create-new-app.png)

2. 為您的應用程式命名（我們選擇了「My First NFT!」），提供簡短描述，並選擇一個使用案例。接下來，搜尋「Ethereum」並選擇網路。我們將使用 Sepolia，這是推薦用於應用程式開發的測試網（請參閱[以太坊網路](/developers/docs/networks/#ethereum-testnets)）。

3. 點擊「Next」繼續，然後點擊「Create app」，就這樣完成了！您的應用程式應該會出現在導覽列的下拉式選單中，並提供可複製的 API 金鑰。

## 第 3 步：建立以太坊帳戶（地址） {#create-eth-address}

我們需要一個以太坊帳戶來發送與接收交易。在本教學中，我們將使用梅塔馬斯克，這是一個瀏覽器中的虛擬錢包，用於管理您的以太坊帳戶地址。如果您想進一步了解以太坊上的交易如何運作，請查看以太坊基金會的[此頁面](/developers/docs/transactions/)。

您可以免費在[這裡](https://metamask.io/download)下載並建立梅塔馬斯克帳戶。當您建立帳戶時，或者如果您已經有帳戶，請確保使用網路選擇選單切換到「Sepolia」測試網（這樣我們就不會使用真實資金進行交易）。如果您沒有看到 Sepolia 列出，請打開右上角的選單，選擇「Networks」，並開啟「Show test networks」（請參閱[梅塔馬斯克檢視測試網指南](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)）。

![將 Sepolia 設為您的網路](./metamask-sepolia.png)

## 第 4 步：從水龍頭添加以太幣 {#step-4-add-ether-from-a-faucet}

為了將我們的智能合約部署到測試網，我們需要一些假 ETH。要獲取 Sepolia ETH，請選擇[Sepolia 網路詳細資訊](/developers/docs/networks/#sepolia)中列出的其中一個水龍頭，並輸入您的帳戶地址。如果其中一個無法使用，請嘗試另一個，因為它們有時會枯竭，而且有些有資格規則：例如，[Alchemy Sepolia 水龍頭](https://www.alchemy.com/faucets/ethereum-sepolia)要求接收地址在以太坊主網上至少持有 0.001 ETH。不久之後，您應該會在您的梅塔馬斯克帳戶中看到 ETH！

## 第 5 步：檢查您的餘額 {#check-balance}

為了再次確認我們的餘額是否已入帳，讓我們使用 [Alchemy 的沙盒工具](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)發出 [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) 請求。這將回傳我們錢包中的 ETH 數量。在您輸入您的梅塔馬斯克帳戶地址並點擊「Send Request」後，您應該會看到類似以下的響應：

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **注意** 此結果的單位是 Wei，而不是 ETH。Wei 被用作以太幣的最小面額。從 Wei 到 ETH 的轉換為 1 ETH = 10<sup>18</sup> Wei。因此，如果我們將 0xde0b6b3a7640000 轉換為十進位，我們會得到 1\*10<sup>18</sup> Wei，這等於 1 ETH。

呼！我們的假錢都在那裡了。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```
## 第 6 步：初始化我們的專案 {#initialize-project}

首先，我們需要為我們的專案建立一個資料夾。導覽至您的命令列並輸入：

```sh
mkdir my-nft
cd my-nft
```

現在我們已經在專案資料夾中，我們將使用 npm init 來初始化專案。如果您尚未安裝 npm，請遵循 [Node.js 安裝說明](https://nodejs.org/en/download/)（本教學將需要 Node.js 與 npm）。

```sh
npm init
```

您如何回答安裝問題並不重要；以下是我們的做法供您參考：

```text
package name: (my-nft)
version: (1.0.0)
description: My first NFT!
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

{
  "name": "my-nft",
  "version": "1.0.0",
  "description": "My first NFT!",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

核准 package.json。我們接下來要安裝的 Hardhat 3 僅支援 ES 模組專案，因此請將專案標記為 ES 模組：

```sh
npm pkg set type=module
```

這樣我們就準備就緒了！

## 第 7 步：安裝 [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat 是一個用於編譯、部署、測試與除錯以太坊軟體的開發環境。它可協助開發者在部署到即時鏈之前，在本地端建置智能合約與去中心化應用程式 (dapp)。

Hardhat 3 需要 Node.js v22.13.0 或更高版本。在我們的 my-nft 專案中執行：

```sh
npm install --save-dev hardhat
```

查看此頁面以獲取有關[安裝說明](https://hardhat.org/docs/getting-started)的更多詳細資訊。

## 第 8 步：建立 Hardhat 專案 {#create-hardhat-project}

執行 `npx hardhat --init` 會產生一個完整的範例專案，但為了本教學，我們將手動進行設定，以便您可以看到每個部分。在您的專案資料夾根目錄中，建立一個名為 `hardhat.config.js` 的檔案，內容如下：

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

這是我們將指定專案所有設定的地方（在第 13 步）。目前，它只是告訴 Hardhat 要使用哪個版本的 Solidity 編譯器。

## 第 9 步：添加專案資料夾 {#add-project-folders}

為了保持專案井然有序，我們將建立兩個新資料夾。在命令列中導覽至專案的根目錄並輸入：

```sh
mkdir contracts
mkdir scripts
```

- contracts/ 是我們存放 NFT 智能合約程式碼的地方

- scripts/ 是我們存放用於部署與互動智能合約的腳本的地方

## 第 10 步：撰寫我們的合約 {#write-contract}

現在我們的環境已經設定好了，接下來是更令人興奮的事情：_撰寫我們的智能合約程式碼！_

在您最喜歡的編輯器中打開 my-nft 專案（我們喜歡 [VSCode](https://code.visualstudio.com/)）。智能合約是使用一種名為 Solidity 的語言撰寫的，我們將使用它來撰寫我們的 MyNFT.sol 智能合約。‌

1. 導覽至 `contracts` 資料夾並建立一個名為 MyNFT.sol 的新檔案

2. 以下是我們的 NFT 智能合約程式碼，我們基於 [歐本齊柏林](https://docs.openzeppelin.com/contracts/5.x/erc721) 函式庫的 ERC-721 實作。將以下內容複製並貼上到您的 MyNFT.sol 檔案中。

   ```solidity
   // 基於 https://docs.openzeppelin.com/contracts/5.x/erc721 的合約
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. 因為我們繼承了歐本齊柏林合約函式庫中的類別，請在命令列中執行 `npm install @openzeppelin/contracts` 將該函式庫安裝到我們的資料夾中。本教學使用歐本齊柏林合約 5.x，這需要 Solidity 0.8.24 或更高版本。

那麼，這段程式碼到底_做_了什麼？讓我們逐行分解。

在我們的智能合約頂部，我們匯入了三個 [歐本齊柏林](https://openzeppelin.com/) 智能合約類別：

- @openzeppelin/contracts/token/ERC721/ERC721.sol 包含 ERC-721 標準的實作，我們的 NFT 智能合約將繼承該標準。（要成為有效的 NFT，您的智能合約必須實作 ERC-721 標準的所有方法。）要了解更多關於繼承的 ERC-721 函式的資訊，請查看[此處](https://eips.ethereum.org/EIPS/eip-721)的介面定義。

- @openzeppelin/contracts/access/Ownable.sol 在我們的智能合約上設定了[存取控制](https://docs.openzeppelin.com/contracts/5.x/access-control)，因此只有智能合約的擁有者（您）可以鑄造 NFT。擁有者是傳遞給建構函式的 `initialOwner` 地址。（請注意，包含存取控制完全是個人偏好。如果您希望任何人都能使用您的智能合約鑄造 NFT，請從合約定義與建構函式中移除 `Ownable` 與 `Ownable(initialOwner)`，並從 `mintNFT` 函式中移除 `onlyOwner`。）

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol 擴充了 ERC-721，以便每個代幣都可以儲存自己的中繼資料 URI，我們在鑄造時會設定它。

在我們的匯入陳述式之後，我們有自訂的 NFT 智能合約，它出奇地短——它只包含一個計數器、一個建構函式與單一函式！這要歸功於我們繼承的歐本齊柏林合約，它實作了我們建立 NFT 所需的大部分方法，例如回傳 NFT 擁有者的 `ownerOf`，以及將 NFT 擁有權從一個帳戶轉移到另一個帳戶的 `transferFrom`。

計數器 `_nextTokenId` 追蹤已鑄造的 NFT 總數，並在我們的新 NFT 上設定唯一 ID。（每個使用智能合約鑄造的 NFT 都必須分配一個唯一 ID——這裡我們的唯一 ID 只是由現存的 NFT 總數決定。`++_nextTokenId` 在使用前增加計數器，因此我們使用智能合約鑄造的第一個 NFT 的 ID 為「1」，第二個 NFT 的 ID 為「2」，依此類推。）

在我們的 ERC-721 建構函式中，您會注意到我們傳遞了 2 個字串：「MyNFT」與「NFT」。第一個變數是智能合約的名稱，第二個是它的符號。您可以隨意命名這些變數！

最後，我們有 `mintNFT(address recipient, string memory tokenURI)` 函式，它允許我們鑄造 NFT！您會注意到這個函式接收兩個變數：

- `address recipient` 指定將接收您剛鑄造的 NFT 的地址

- `string memory tokenURI` 是一個字串，應該解析為描述 NFT 中繼資料的 JSON 文件。NFT 的中繼資料才是真正賦予它生命的東西，允許它具有可設定的屬性，例如名稱、描述、圖片與其他屬性。在本教學的第 2 部分，我們將描述如何設定此中繼資料。

`mintNFT` 呼叫了繼承的 ERC-721 函式庫中的一些方法，並最終回傳一個代表剛鑄造的 NFT ID 的數字。

## 第 11 步：將梅塔馬斯克與 Alchemy 連接至您的專案 {#connect-metamask-and-alchemy}

現在我們已經建立了梅塔馬斯克錢包、Alchemy 帳戶，並撰寫了我們的智能合約，是時候將這三者連接起來了。

從您的虛擬錢包發送的每筆交易都需要使用您唯一的私鑰進行簽章。為了向我們的程式提供此權限，我們可以安全地將我們的私鑰（與 Alchemy API 金鑰）儲存在環境檔案中。

要了解更多關於發送交易的資訊，請查看[交易文件](/developers/docs/transactions/)。

在我們專案的根目錄中建立一個 `.env` 檔案，並將您的梅塔馬斯克私鑰與 HTTP Alchemy API URL 添加到其中。

- 遵循[這些說明](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)從梅塔馬斯克匯出您的私鑰

- 請參閱下方以獲取 HTTP Alchemy API URL 並將其複製到您的剪貼簿

![複製您的 Alchemy API URL](./copy-alchemy-api-url.mp4#842x480)

您的 `.env` 現在應該看起來像這樣：

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

為了實際將這些連接到我們的程式碼，我們將在第 13 步的 hardhat.config.js 檔案中參考這些變數。Node.js 可以自行讀取 `.env` 檔案，因此不需要安裝額外的套件。

<EnvWarningBanner />

## 第 12 步：安裝 Ethers.js {#install-ethers}

Ethers.js 是一個函式庫，透過將[標準 JSON-RPC 方法](/developers/docs/apis/json-rpc/)包裝成更使用者友善的方法，使與以太坊互動及發出請求變得更加容易。

Hardhat 使得整合[外掛程式](https://hardhat.org/docs/plugins/official-plugins)以獲得額外工具與擴充功能變得非常容易。我們將利用 [Ethers 外掛程式](https://hardhat.org/docs/plugins/hardhat-ethers)進行合約部署（[Ethers.js](https://docs.ethers.org/v6/) 有一些非常簡潔的合約部署方法）。

在您的專案目錄中輸入：

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

我們也將在下一步將外掛程式添加到我們的 hardhat.config.js 中。

## 第 13 步：更新 hardhat.config.js {#update-hardhat-config}

到目前為止，我們已經添加了幾個相依性與外掛程式，現在我們需要更新 hardhat.config.js，以便我們的專案知道它們。

將您的 hardhat.config.js 更新為如下所示：

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// 如果 .env 檔案存在，則從中將 API_URL 與 PRIVATE_KEY 載入至 process.env
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

`configVariable` 告訴 Hardhat 僅在需要時才從環境變數中讀取每個值，因此即使在設定值之前，像 `compile` 這樣的命令也能運作。如果您不想將私鑰保存在純文字檔案中，Hardhat 也可以從[加密的金鑰庫讀取設定變數](https://hardhat.org/docs/guides/configuration-variables)。

## 第 14 步：編譯我們的合約 {#compile-contract}

為了確保到目前為止一切運作正常，讓我們編譯我們的合約。編譯任務是內建的 Hardhat 任務之一。

從命令列執行：

```sh
npx hardhat compile
```

第一次編譯時，Hardhat 會下載 Solidity 編譯器。然後您應該會看到類似 `Compiled 1 Solidity file with solc 0.8.34` 的內容。如果沒有，您隨時可以在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中留言。

## 第 15 步：撰寫我們的部署腳本 {#write-deploy}

現在我們的合約已經寫好，設定檔也準備就緒，是時候撰寫我們的合約部署腳本了。

導覽至 `scripts/` 資料夾並建立一個名為 `deploy.js` 的新檔案，將以下內容添加到其中：

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// 開始部署，回傳一個解析為合約物件的 Promise
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

讓我們來看看這些程式碼每一行的作用。

```js
const { ethers } = await network.create()
```

在 Hardhat 3 中，腳本會明確地開啟與網路的連線。`network.create()` 會連接到您在執行腳本時使用 `--network` 選項選擇的網路，而 `hardhat-ethers` 外掛程式會將 `ethers` 物件添加到該連線中。

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` 回傳為網路設定的帳戶。在 Sepolia 上，這就是您將私鑰放入 `.env` 中的帳戶。我們將其地址傳遞給建構函式，以便您成為合約的擁有者。

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

Ethers.js 中的 ContractFactory 是一個用於部署新智能合約的抽象概念，因此這裡的 MyNFT 是我們 NFT 合約實例的工廠。當使用 hardhat-ethers 外掛程式時，ContractFactory 與 Contract 實例預設會連接到第一個簽署者。

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

在 ContractFactory 上呼叫 deploy() 將開始部署，並回傳一個解析為 Contract 的 Promise。這是一個為我們每個智能合約函式提供方法的物件。您傳遞給 deploy() 的參數會進入合約的建構函式，這裡是 `initialOwner` 地址。

`waitForDeployment()` 會等待直到部署交易被包含在區塊中，而 `getAddress()` 會回傳新合約的地址。請參閱 [Ethers.js 合約文件](https://docs.ethers.org/v6/api/contract/)以獲取更多詳細資訊。

## 第 16 步：部署我們的合約 {#deploy-contract}

我們終於準備好部署我們的智能合約了！導覽回專案目錄的根目錄，並在命令列中執行：

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

然後您應該會看到類似以下的內容：

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

如果我們前往 [Sepolia Etherscan](https://sepolia.etherscan.io/) 並搜尋我們的合約地址，我們應該能夠看到它已成功部署。如果您無法立即看到它，請稍候，因為這可能需要一些時間。交易看起來會像這樣：

![在 Etherscan 上檢視您的交易地址](./etherscan-sepoila-contract-creation.png)

From 地址應該與您的梅塔馬斯克帳戶地址相符，而 To 地址將顯示「Contract Creation」。如果我們點擊進入交易，我們會在 To 欄位中看到我們的合約地址：

![在 Etherscan 上檢視您的合約地址](./etherscan-sepolia-tx-details.png)

太棒了！您剛剛將您的 NFT 智能合約部署到以太坊（測試網）鏈上了！

要了解內部運作原理，您可以查看您的應用程式在 [Alchemy 儀表板](https://dashboard.alchemy.com/)中收到的請求。

在那裡，您會看到一些 JSON-RPC 呼叫，這是當我們呼叫 .deploy() 函式時，Hardhat/Ethers 在內部為我們發出的。這裡要特別指出的兩個重要呼叫是 [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction)，這是實際將我們的智能合約寫入 Sepolia 鏈的請求，以及 [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash)，這是一個根據雜湊讀取有關我們交易資訊的請求（發送交易時的典型模式）。要了解更多關於發送交易的資訊，請查看[交易文件](/developers/docs/transactions/)。

這就是本教學第 1 部分的全部內容。在[第 2 部分，我們將透過鑄造 NFT 實際與我們的智能合約互動](/developers/tutorials/how-to-mint-an-nft/)，而在[第 3 部分，我們將向您展示如何在您的以太坊錢包中檢視您的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)！
