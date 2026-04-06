---
title: "如何撰寫與部署 NFT (NFT 教學系列第 1/3 部分)"
description: "這篇教學是是一個關於NFT教學系列的文章之一，這將會帶著你一步步地學習如何撰寫與部署一個非同質化代幣 (ERC-721 代幣) 的智慧型合約在以太坊以及星際檔案系統(IPFS) 上"
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity", "smart contracts" ]
skill: beginner
breadcrumb: "編寫和部署NFT"
lang: zh-tw
published: 2021-04-22
---

隨著 NFT 將區塊鏈帶入公眾視野，現在正是您親自了解這股熱潮的絕佳機會，只要在以太坊區塊鏈上發佈您自己的 NFT 合約 (ERC-721 代幣) 即可！

Alchemy 非常自豪能為 NFT 領域中最頂尖的品牌提供技術支援，包括 Makersplace (最近在佳士得拍賣會上以 6900 萬美元創下數位藝術品銷售記錄)、Dapper Labs (NBA Top Shot 和 CryptoKitties 的創造者)、OpenSea (全球最大的 NFT 市場)、Zora、Super Rare、NFTfi、Foundation、Enjin、Origin Protocol、Immutable 等等。

在本教學中，我們將逐步解說如何使用 [MetaMask](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org/)、[Pinata](https://pinata.cloud/) 和 [Alchemy](https://alchemy.com/signup/eth) 在 Sepolia 測試網上建立與部署 ERC-721 智慧合約（如果您還不了解這些術語的含義，請別擔心——我們會一一解釋！）。

在這個教學的第二部分，我們將會瀏覽如何使用我們的智慧型合約去件至一個NFT，在第三部分我們將解釋如何在MeraMask查閱你的NFT。

當然，如果您在任何時候有任何問題，請隨時到 [Alchemy Discord](https://discord.gg/gWuC7zB) 提問，或造訪 [Alchemy 的 NFT API 文件](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)！

## 第 1 步：連線至以太坊網路 {#connect-to-ethereum}

有很多方法可以向以太坊區塊鏈發出請求，但為了簡化流程，我們將使用 [Alchemy](https://alchemy.com/signup/eth) 的免費帳戶。它是一個區塊鏈開發人員平台與 API，可讓我們在不需執行自有節點的情況下與以太坊鏈進行通訊。

在這個教學裡，我們也將會使用Alchemy的開發者工具監控與分析了解我們的智慧型合約部署方式 如果您還沒有 Alchemy 帳戶，可以點擊[此處](https://alchemy.com/signup/eth)免費註冊。

## 第 2 步：建立您的應用程式 (和 API 金鑰) {#make-api-key}

一旦你已經創建好一個Alchemy的帳戶，你可以通過建立一個程式來生成一個API鑰匙。 這將讓我們能向 Sepolia 測試網發出請求。 如果您想深入了解測試網，請參閱[本指南](https://docs.alchemyapi.io/guides/choosing-a-network)。

1. 將滑鼠移至標題列上方的"Apps"以及點選"Create App"以前往到在你的Alchemy Dashboard 上的"Create App"頁面。

![建立您的應用程式](./create-your-app.png)

2. 為您的應用程式命名 (我們選擇「My First NFT!」)、提供簡短描述、在「Chain」欄位選取「Ethereum」，並為您的網路選取「Sepolia」。 自「合併」後，其他測試網皆已棄用。

![設定並發布您的應用程式](./alchemy-explorer-sepolia.png)

3. 點擊「創建程式」然後就好了！ 你的程式應該會在下列圖表中出現。

## 第 3 步：建立以太坊帳戶 (地址) {#create-eth-address}

我們需要一個乙太坊帳戶去接收或發送交易。 為此教學，我們將會使用 MetaMask。它是一個在瀏覽器上管理你的乙太坊帳戶地址的虛擬錢包。 如果您想深入了解以太坊上的交易如何運作，請參閱以太坊基金會的[此頁面](/developers/docs/transactions/)。

您可以在[這裡](https://metamask.io/download)免費下載並建立 MetaMask 帳戶。 建立帳戶時，或如果您已有帳戶，請務必在右上角切換至「Sepolia 測試網」(這樣我們就不用處理真實貨幣)。

![將 Sepolia 設為您的網路](./metamask-goerli.png)

## 第 4 步：從水龍頭取得以太幣 {#step-4-add-ether-from-a-faucet}

為了部屬我們的智慧型合約到測試網上，我們將會需要一些假的以太幣(ETH)。 若要取得 ETH，您可以前往由 Alchemy 託管的 [Sepolia Faucet](https://sepoliafaucet.com/)，登入並輸入您的帳戶地址，然後點擊「Send Me ETH」。 接著你應蓋到你的MetaMask帳戶確認你的ETH!

## 第 5 步：檢查您的餘額 {#check-balance}

為了再次確認我們的餘額，我們將使用 [Alchemy 的編輯器工具](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) 發出 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 請求。 這將會回傳你的錢包裡的餘額。 在你輸入自己的MetaMask帳戶地址，並且點下「寄送請求」後，你理應會看見一個這樣子的回應：

    ```
    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`
    ```

> **注意**：此結果以 wei 為單位，而非 ETH。 Wei是一個被用來計算以太最少分數的單位。 「1 eth = 10<sup>18</sup> wei」他是這樣轉換的。 所以如果我們轉換0xde0b6b3a7640000到十進制，我們將會獲得1\*10<sup>18</sup>wei，這剛好是1ETH。

哈! 我們的假錢都在這。

## 第 6 步：初始化我們的專案 {#initialize-project}

首先，我們需要一個資料夾給我們的專案。 前往到你的指令介面(powershell, cmd 或 Terminal) 接著輸入:

    ```
    mkdir my-nft
    cd my-nft
    ```

現在我們已經在我們的專案資料夾底下了，接著我們將會使用npm去初始化我們的專案。 如果您尚未安裝 npm，請遵循[這些指示](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (我們也需要 [Node.js](https://nodejs.org/en/download/)，所以也請一併下載！)。

    ```
    npm init
    ```

你如何回答安裝問題並不重要，這是我們提供的參考:

```json
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

同意創建package.json，接著我們已經準備好開始了!

## 第 7 步：安裝 [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat 是一個開發環境，提供你去編譯、部屬、測試、以及除錯你的以太坊軟體。 它能協助開發人員在部署至即時鏈之前，於本機建立智慧合約和去中心化應用程式。

在我們的 my-nft 專案下執行:

    ```
    npm install --save-dev hardhat
    ```

如需更多[安裝指示](https://hardhat.org/getting-started/#overview)的詳細資訊，請查看此頁面。

## 第 8 步：建立 Hardhat 專案 {#create-hardhat-project}

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
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit
    ```

這將會摻生一個 hardhat.config.js file 給我們。

## 第 9 步：新增專案資料夾 {#add-project-folders}

為了保持我們的資料夾的結構性，我們將會創建兩個資料夾。 在你的指令介面返回到到專案資料夾，接著輸入：

    ```
    mkdir contracts
    mkdir scripts
    ```

- contracts/ 是放置我們智慧型合約程式碼的地方

- scripts/ 是我們部屬我們的智慧型合約的地方

## 第 10 步：撰寫我們的合約 {#write-contract}

現在我們的環境已經設定好了，接下來是更令人興奮的部分：_撰寫我們的智慧合約程式碼！_

在您偏好的編輯器中開啟 my-nft 專案 (我們推薦 [VSCode](https://code.visualstudio.com/))。 我們撰寫智慧型合約的語言稱作 Solidity 這將是我們使用去撰寫 MyNFT.sol智慧型合約。

1. 前往 `contracts` 資料夾，並建立一個名為 MyNFT.sol 的新檔案

2. 以下是我們的 NFT 智慧合約程式碼，此程式碼以 [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721) 函式庫的 ERC-721 實作為基礎。 複製與貼上下面的內容到你的MyNFT.sol檔案。

   ```solidity
   //合約基於 [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. 因為我們繼承了 OpenZeppelin 合約函式庫的類別，所以請在命令列中執行 `npm install @openzeppelin/contracts^4.0.0`，將函式庫安裝至我們的資料夾中。

那麼，這段程式碼的確切功用是什麼？ 讓我們拆解他，一行一行解說。

在智慧合約的頂部，我們匯入了三個 [OpenZeppelin](https://openzeppelin.com/) 智慧合約類別：

- @openzeppelin/contracts/token/ERC721/ERC721.sol 包含了ERC-721的執行標準，我們的智慧型合約將會繼承他。 要成為一個有效的非同質化代幣 (NFT)，你的智慧型合約必須執行所有在ERR-721標準裡的方法。 若要深入了解繼承的 ERC-721 函式，請參閱[此處](https://eips.ethereum.org/EIPS/eip-721)的介面定義。

- @openzeppelin/contracts/utils/Counters.sol 提供一個儘可以逐一遞減或遞增的計數器。 我們的智慧型合約使用一個計數器去持續追蹤所有NFT的鑄造數與設定一個唯一的ID在每一個新NFT。 (每一個被鑄造的NFT都要用一個智慧型合約分配一個唯一的ID -- 我們的ID在這裡只有使用NFT總數來決定。 舉一個例子，我們鑄造的第一個NFT擁有一個「1」的ID，第二個則是「2」，依此類推。)

- @openzeppelin/contracts/access/Ownable.sol 會在我們的智慧合約上設定[存取權控制](https://docs.openzeppelin.com/contracts/3.x/access-control)，如此一來，只有智慧合約的擁有者 (也就是您) 可以鑄造 NFT。 (編註: 包括使用權控制指示一種偏好。 如果你不喜歡有人可以使用你的智慧型合約鑄造NFT，移除在第十行的的"Ownable"，以及第17行的"onlyOwner"。)

在引入以上函式庫後，我們有我們傳統的NFT智慧型合約，程式碼意外的短，他只包刮一個計數器，一個構建函數，和一個函式! 這要歸功於我們繼承的 OpenZeppelin 合約，它實作了我們建立 NFT 所需的大部分方法，例如傳回 NFT 擁有者的 `ownerOf`，以及將 NFT 擁有權從一個帳戶轉移至另一個帳戶的 `transferFrom`。

在我們的 ERC-721 的建構函數裡(constractor)，你可能會注意到我們傳入了兩個字串，"MyNFT" 和 "NFT"。 第一個變數是智慧型合約名稱，第二個則是他的代號(象徵 symbol)。 你可以為每一個變數命名。

最後，我們有了函式 `mintNFT(address recipient, string memory tokenURI)`，可以用來鑄造 NFT！ 你可能會注意到這個函數傳入了兩個變數:

- `address recipient` 會指定接收您剛鑄造好的 NFT 的地址

- `string memory tokenURI` 是一個字串，應解析為描述 NFT 元資料的 JSON 文件。 NFT的後設數據(metadata) 實際上是使其生存的原因，允許它具有可配置的屬性，例如名稱，描述，圖像和其他屬性。 在這個教學的第二部份我們將會解釋如何設定這個後設資料(metadata)。

`mintNFT` 會從繼承的 ERC-721 函式庫呼叫一些方法，並最終傳回一個數字，此數字代表新鑄造的 NFT 的 ID。

## 第 11 步：將 MetaMask 和 Alchemy 連線至您的專案 {#connect-metamask-and-alchemy}

現在，我們已經創建了一個MetaMask錢包、Alchemy帳戶，並編寫了我們的智慧型合約，是時候將這三者連接起來了。

每一個從你的虛擬錢包送出的交易都需要用你的私鑰簽名。 為了給予程式這個權限，我們可以把私鑰（還有 Alchemy API key）存在環境檔案中。

若要深入了解傳送交易，請參閱這篇關於使用 web3 傳送交易的[教學文章](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)。

首先，安裝 dotenv 套件。

    ```
    npm install dotenv --save
    ```

然後，在我們專案的根目錄中建立一個 `.env` 檔案，並在其中新增您的 MetaMask 私鑰和 HTTP Alchemy API URL。

- 請遵循[這些指示](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)從 MetaMask 匯出您的私鑰

- 請參見下麵獲取HTTP Alchemy 接口地址並將其複製到剪貼板

![複製您的 Alchemy API URL](./copy-alchemy-api-url.gif)

您的 `.env` 檔案現在應該會像這樣：

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

為了將這些變數實際連線至我們的程式碼，我們會在第 13 步的 hardhat.config.js 檔案中參考這些變數。

<EnvWarningBanner />

## 第 12 步：安裝 Ethers.js {#install-ethers}

Ethers.js 是一個函式庫，它將[標準 JSON-RPC 方法](/developers/docs/apis/json-rpc/)包裝成更方便使用者使用的方法，讓與以太坊互動和發出請求變得更簡單。

Hardhat 讓整合[外掛程式](https://hardhat.org/plugins/)以取得額外工具和擴充功能變得超級簡單。 我們將利用 [Ethers plugin](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) 進行合約部署 ([Ethers.js](https://github.com/ethers-io/ethers.js/) 有一些非常簡潔的合約部署方法)。

在你的專案目錄輸入：

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

我們會在下一步 hardhat.config.js 將 ethers 納入進來。

## 第 13 步：更新 hardhat.config.js {#update-hardhat-config}

我們目前已經新增了幾個套件，現在則是要更新 hardhat.config.js ，告訴專案我們要用它們。

將 hardhat.config.js 更新成如下方：

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
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

## 第 14 步：編譯我們的合約 {#compile-contract}

為了確認一切運作正常，我們來編譯合約。 編譯任務是安全帽的內部任務之一

在命令列工具輸入：

    ```
    npx hardhat compile
    ```

你可能會看到關於“源文件中未提供SPDX許可證識別碼”的警告，但是不用擔心，希望其他的看起來都正常 如果沒有，您隨時可以在 [Alchemy discord](https://discord.gg/u72VCg3) 中傳送訊息。

## 第 15 步：撰寫我們的部署腳本 {#write-deploy}

現在我們已經寫好了合約，並且也搞定配置檔案。現在我們該來撰寫部署合約的腳本。

前往 `scripts/` 資料夾並建立一個名為 `deploy.js` 的新檔案，在其中加入以下內容：

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // 開始部署，傳回一個解析為合約物件的 promise
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat 在其[合約教學文章](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)中詳細地解釋了每一行程式碼的作用，我們在此採用了他們的解釋。

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

Ethers.js 中的 ContractFactory 是用於部署新智慧型合約的抽象對象。所以這裡的MyNFT是我們NFT合約實例的工廠 使用 hardhat-ethers 插件时，ContractFactory 和合約實例默認與第一個簽名帳戶相連。

    ```
    const myNFT = await MyNFT.deploy();
    ```

調用 ContractFactory 程式碼中的 deploy() 函數會啟動合約部署，然後返回解析為合約的Promise。 這就是和我們的智慧型合約函數有一對一的方法的物件。

## 第 16 步：部署我們的合約 {#deploy-contract}

我們終於準備好要部署合約了！ 返回你專案目錄的根目錄，在命令行中於行：

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

你會看到像這樣的輸出：

    ```
    合約已部署至地址：0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

如果我們前往 [Sepolia etherscan](https://sepolia.etherscan.io/) 並搜尋我們的合約地址，我們應該能夠看到它已成功部署。 如果你沒立即看到它，請稍等片刻，因為它可能需要一些時間。 這個交易執行看起來會像這樣：

![在 Etherscan 上檢視您的交易地址](./etherscan-sepoila-contract-creation.png)

「From」地址應與您的 MetaMask 帳戶地址相符，而「To」地址將顯示「Contract Creation」。 如果我們電機進入交易，我們將在“To”字段中看到我們的合約地址：

![在 Etherscan 上檢視您的合約地址](./etherscan-sepolia-tx-details.png)

太棒了！ 您剛剛已將您的 NFT 智慧合約部署到以太坊 (測試網) 鏈上了！

為了了解幕後情況，讓我們前往 [Alchemy 儀表板](https://dashboard.alchemyapi.io/explorer)中的「Explorer」分頁。 如果你有多個Alchemy應用程序，請確保按應用程序篩選，然後選擇“MyNFT”。

![使用 Alchemy 的 Explorer 儀表板檢視「幕後」進行的呼叫](./alchemy-explorer-goerli.png)

在這裡你會看到Hardhat/Ethers 替我們在後端完成的一系列JSON-RPC調用，當我們調用.deploy() 函數時候。 這裡要特別提出兩個重要的呼叫：[eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction) 是將我們的智慧合約實際寫入 Sepolia 鏈的請求；[eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) 則是在給定哈希的情況下讀取交易資訊的請求 (這是傳送交易時的典型模式)。 若要深入了解傳送交易，請參閱這篇關於[使用 Web3 傳送交易](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)的教學文章。

以上即為這個教程的第1部分全部內容。 在[第 2 部分，我們將透過鑄造 NFT 來實際與我們的智慧合約互動](/developers/tutorials/how-to-mint-an-nft/)，而在[第 3 部分，我們將示範如何在您的以太坊錢包中檢視您的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)！
