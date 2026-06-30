---
title: "如何鑄造 NFT（NFT 教學系列第 2/3 部分）"
description: "本教學說明如何使用我們的智能合約與 Web3 在以太坊區塊鏈上鑄造 NFT。"
author: "蘇米·穆吉爾"
tags: ["ERC-721", "Alchemy", "Solidity", "智能合約"]
skill: beginner
breadcrumb: "鑄造 NFT"
lang: zh-tw
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html)：6900 萬美元
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b)：1100 萬美元
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens)：600 萬美元

他們全都使用 Alchemy 強大的 API 鑄造了他們的 NFT。在本教學中，我們將教你如何在不到 10 分鐘內完成同樣的事情。

「鑄造 NFT」是指在區塊鏈上發佈 ERC-721 代幣的唯一實例。使用我們在[本 NFT 教學系列第 1 部分](/developers/tutorials/how-to-write-and-deploy-an-nft/)中的智能合約，讓我們展現 Web3 技能並鑄造一個 NFT。在本教學結束時，你將能夠隨心所欲（且在錢包允許的範圍內）鑄造任意數量的 NFT！

我們開始吧！

## 第 1 步：安裝 Web3 {#install-web3}

如果你遵循了關於建立 NFT 智能合約的第一個教學，你應該已經有使用 Ethers.js 的經驗。Web3 類似於 Ethers，它是一個用來讓向[以太坊](/)區塊鏈發送請求變得更容易的函式庫。在本教學中，我們將使用 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)，這是一個增強版的 Web3 函式庫，提供自動重試和強大的 WebSocket 支援。

在你的專案主目錄中執行：

```
npm install @alch/alchemy-web3
```

## 第 2 步：建立 `mint-nft.js` 檔案 {#create-mintnftjs}

在你的 scripts 目錄中，建立一個 `mint-nft.js` 檔案並加入以下程式碼：

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## 第 3 步：取得你的合約 ABI

我們的合約 ABI（應用程式二進位介面）是與我們的智能合約互動的介面。你可以了解更多關於[合約 ABI](/glossary/#abi) 的資訊。Hardhat 會自動為我們產生一個 ABI，並將其儲存在 `MyNFT.json` 檔案中。為了使用它，我們需要透過在 `mint-nft.js` 檔案中加入以下程式碼來解析其內容：

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

如果你想查看 ABI，可以將其列印到主控台：

```js
console.log(JSON.stringify(contract.abi))
```

要執行 `mint-nft.js` 並在主控台看到列印出的 ABI，請前往你的終端機並執行：

```js
node scripts/mint-nft.js
```
## 第 4 步：使用 IPFS 設定 NFT 的中繼資料 {#config-meta}

如果你還記得第 1 部分的教學，我們的 `mintNFT` 智能合約函式會接收一個 tokenURI 參數，該參數應解析為描述 NFT 中繼資料的 JSON 文件——這正是賦予 NFT 生命力的關鍵，使其具有可設定的屬性，例如名稱、描述、圖片和其他屬性。

> _星際檔案系統 (IPFS) 是一個去中心化的協定和點對點網路，用於在分散式檔案系統中儲存和分享資料。_

我們將使用 Pinata（一個方便的 IPFS API 和工具套件）來儲存我們的 NFT 資產和中繼資料，以確保我們的 NFT 是真正去中心化的。如果你沒有 Pinata 帳戶，請[在此](https://app.pinata.cloud)註冊一個免費帳戶並完成驗證電子郵件的步驟。

建立帳戶後：

- 前往「Files」頁面，然後點擊頁面左上角的藍色「Upload」按鈕。

- 將圖片上傳到 Pinata——這將成為你 NFT 的圖片資產。你可以隨意為該資產命名。

- 上傳後，你將在「Files」頁面的表格中看到檔案資訊。你還會看到一個 CID 欄位。你可以點擊旁邊的複製按鈕來複製 CID。你可以在 `https://gateway.pinata.cloud/ipfs/<CID>` 檢視你的上傳內容。例如，你可以[在此](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)找到我們在 IPFS 上使用的圖片。

對於視覺學習者，上述步驟總結如下：

![How to upload your image to Pinata](./instructionsPinata.gif)

現在，我們還需要上傳另一份文件到 Pinata。但在那之前，我們需要先建立它！

在你的根目錄中，建立一個名為 `nft-metadata.json` 的新檔案，並加入以下 JSON 程式碼：

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

你可以隨意更改 JSON 中的資料。你可以移除或新增 attributes 區塊的內容。最重要的是，確保 image 欄位指向你的 IPFS 圖片位置——否則，你的 NFT 將會包含一張（非常可愛的！）狗狗照片。

完成 JSON 檔案的編輯後，儲存並將其上傳到 Pinata，步驟與我們上傳圖片時相同。

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## 第 5 步：建立合約實例 {#instance-contract}

現在，為了與我們的合約互動，我們需要在程式碼中建立一個合約實例。為此，我們需要合約地址，你可以從部署紀錄中取得，或透過在 [Blockscout](https://eth-sepolia.blockscout.com/) 上查詢你用來部署合約的地址來取得。

![View your contract address on Etherscan](./view-contract-etherscan.png)

在上述範例中，我們的合約地址是 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778。

接下來，我們將使用 Web3 的 [contract 方法](https://docs.web3js.org/api/web3-eth-contract/class/Contract)，透過 ABI 和地址來建立我們的合約。在你的 `mint-nft.js` 檔案中，加入以下內容：

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## 第 6 步：更新 `.env` 檔案 {#update-env}

現在，為了建立並發送交易到以太坊鏈上，我們將使用你的公開以太坊帳戶地址來取得帳戶隨機數（將在下方說明）。

將你的公鑰加入到 `.env` 檔案中——如果你完成了教學的第 1 部分，我們的 `.env` 檔案現在應該看起來像這樣：

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## 第 7 步：建立你的交易

首先，讓我們定義一個名為 `mintNFT(tokenData)` 的函式，並透過以下步驟建立我們的交易：

1. 從 `.env` 檔案中取得你的 _PRIVATE_KEY_ 和 _PUBLIC_KEY_。

1. 接下來，我們需要找出帳戶隨機數。隨機數規格用於追蹤從你的地址發送的交易數量——基於安全考量以及防止重放攻擊，我們需要這個數值。為了取得從你的地址發送的交易數量，我們使用 [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count)。

1. 最後，我們將使用以下資訊設定我們的交易：

- `'from': PUBLIC_KEY` — 我們交易的來源是我們的公開地址

- `'to': contractAddress` — 我們希望互動並發送交易的合約

- `'nonce': nonce` — 包含從我們地址發送的交易數量的帳戶隨機數

- `'gas': estimatedGas` — 完成交易所需的預估燃料

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — 我們希望在此交易中執行的運算——在這種情況下是鑄造一個 NFT

你的 `mint-nft.js` 檔案現在應該看起來像這樣：

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //取得最新隨機數

   //該交易
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```
## 第 8 步：簽署交易 {#sign-txn}

現在我們已經建立了交易，我們需要簽署它才能將其發送出去。這就是我們將使用私鑰的地方。

`web3.eth.sendSignedTransaction` 將為我們提供交易雜湊值，我們可以使用它來確保我們的交易已被開採，且沒有被網路丟棄。你會注意到在交易簽署部分，我們加入了一些錯誤檢查，以便我們知道交易是否成功通過。

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //取得最新隨機數

  //該交易
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## 第 9 步：呼叫 `mintNFT` 並執行 node `mint-nft.js` {#call-mintnft-fn}

還記得你上傳到 Pinata 的 `metadata.json` 嗎？從 Pinata 取得它的雜湊碼，並將以下內容作為參數傳遞給函式 `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

以下是取得雜湊碼的方法：

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_如何在 Pinata 上取得你的 NFT 中繼資料雜湊碼_

> 透過在獨立視窗中載入 `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`，再次確認你複製的雜湊碼連結到你的 **metadata.json**。該頁面應該看起來類似於下方的螢幕截圖：

![Your page should display the json metadata](./metadataJSON.png)_你的頁面應該會顯示 JSON 中繼資料_

總而言之，你的程式碼應該看起來像這樣：

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //取得最新隨機數

  //該交易
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

現在，執行 `node scripts/mint-nft.js` 來部署你的 NFT。幾秒鐘後，你應該會在終端機中看到類似這樣的回應：

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

接下來，造訪你的 [Alchemy 記憶體池](https://dashboard.alchemy.com/mempool)以查看你的交易狀態（無論是待處理、已開採，還是被網路丟棄）。如果你的交易被丟棄，檢查 [Blockscout](https://eth-sepolia.blockscout.com/) 並搜尋你的交易雜湊值也會很有幫助。

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_在 Etherscan 上檢視你的 NFT 交易雜湊值_

就是這樣！你現在已經在以太坊區塊鏈上部署並鑄造了一個 NFT <Emoji text=":money_mouth_face:" size={1} />

使用 `mint-nft.js`，你可以隨心所欲（且在錢包允許的範圍內）鑄造任意數量的 NFT！只要確保傳入一個描述 NFT 中繼資料的新 tokenURI 即可（否則，你最終只會製作出一堆具有不同 ID 的相同 NFT）。

想必你希望能夠在錢包中展示你的 NFT——所以請務必查看[第 3 部分：如何在錢包中檢視你的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)！
