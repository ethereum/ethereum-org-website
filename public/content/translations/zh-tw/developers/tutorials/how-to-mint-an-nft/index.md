---
title: "如何鑄造 NFT (NFT 教學系列 2/3)"
description: "本教學說明如何在以太坊區塊鏈上，使用我們的智能合約和 Web3 來鑄造 NFT。"
author: "Sumi Mudgil"
tags: [ "ERC-721", "alchemy", "穩固", "智能合約" ]
skill: beginner
lang: zh-tw
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html)：6900 萬美元
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b)：1100 萬美元
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens)：600 萬美元

他們全都使用 Alchemy 強大的 API 鑄造了他們的 NFT。 在本教學中，我們將教您如何在 \<10 分鐘內完成同樣的操作。

「鑄造 NFT」是在區塊鏈上發佈您 ERC-721 代幣的獨特實例的行為。 使用我們在 [本 NFT 教學系列第 1 部分](/developers/tutorials/how-to-write-and-deploy-an-nft/) 中的智能合約，讓我們大展 Web3 身手，鑄造一個 NFT。 在本教學結束時，您將能夠鑄造您內心 (和錢包) 渴望的任意數量 NFT！

讓我們開始吧！

## 第 1 步：安裝 Web3 {#install-web3}

如果您跟隨了關於創建 NFT 智能合約的第一個教學，那麼您已經有使用 Ethers.js 的經驗了。 Web3 與 Ethers 類似，它是一個函式庫，可用來更輕鬆地向以太坊區塊鏈發出請求。 在本教學中，我們將使用 [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)，這是一個增強型的 Web3 函式庫，提供自動重試和穩健的 WebSocket 支援。

在您的專案主目錄中執行：

```
npm install @alch/alchemy-web3
```

## 第 2 步：建立 `mint-nft.js` 檔案 {#create-mintnftjs}

在您的 scripts 目錄中，建立一個 `mint-nft.js` 檔案並新增以下程式碼：

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## 第 3 步：取得您的合約 ABI {#contract-abi}

我們的合約 ABI (應用程式二進位介面) 是與我們的智能合約互動的介面。 您可以在[此處](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is)深入了解合約 ABI。 Hardhat 會自動為我們產生一個 ABI，並將其儲存在 `MyNFT.json` 檔案中。 為了使用它，我們需要將以下程式碼新增至我們的 `mint-nft.js` 檔案來解析內容：

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

如果您想查看 ABI，可以將其輸出到您的主控台：

```js
console.log(JSON.stringify(contract.abi))
```

若要執行 `mint-nft.js` 並在主控台中查看您的 ABI，請前往您的終端機並執行：

```js
node scripts/mint-nft.js
```

## 第 4 步：使用 IPFS 設定 NFT 的元數據 {#config-meta}

如果您還記得我們在第 1 部分的教學，我們的 `mintNFT` 智能合約函數會接收一個 `tokenURI` 參數，該參數應解析為一個描述 NFT 元數據的 JSON 文件 — 元數據是真正賦予 NFT 生命的東西，允許它擁有可設定的屬性，例如名稱、描述、圖片和其他屬性。

> _星際檔案系統 (IPFS) 是一種去中心化協定和點對點網路，用於在分散式檔案系統中儲存和共享資料。_

我們將使用 Pinata 這個方便的 IPFS API 和工具組，來儲存我們的 NFT 資產和元數據，以確保我們的 NFT 是真正去中心化的。 如果您沒有 Pinata 帳戶，請[在此](https://app.pinata.cloud)註冊一個免費帳戶，並完成步驟來驗證您的電子郵件。

建立帳戶後：

- 前往「檔案」頁面，然後點擊頁面左上方的藍色「上傳」按鈕。

- 將圖片上傳到 Pinata — 這將是您 NFT 的圖片資產。 您可以隨意為資產命名。

- 上傳後，您會在「檔案」頁面的表格中看到檔案資訊。 您還會看到一個 CID 欄位。 您可以點擊旁邊的複製按鈕來複製 CID。 您可以在 `https://gateway.pinata.cloud/ipfs/<CID>` 查看您上傳的內容。 例如，您可以在[此處](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)找到我們在 IPFS 上使用的圖片。

為方便視覺型學習者，以上步驟總結如下：

![如何將您的圖片上傳到 Pinata](./instructionsPinata.gif)

現在，我們要再上傳一份文件到 Pinata。 但在這麼做之前，我們需要先建立它！

在您的根目錄中，建立一個名為 `nft-metadata.json` 的新檔案，並新增以下 json 程式碼：

```json
{
  "attributes": [
    {
      "trait_type": "品種",
      "value": "瑪爾濟斯貴賓犬"
    },
    {
      "trait_type": "眼睛顏色",
      "value": "摩卡色"
    }
  ],
  "description": "全世界最可愛、最敏感的小狗。",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

您可以隨意變更 json 中的資料。 您可以移除或新增屬性區段。 最重要的是，請確保圖片欄位指向您 IPFS 圖片的位置 — 否則，您的 NFT 將包含一張 (非常可愛的！) 狗的照片。 狗。

完成編輯 JSON 檔案後，儲存並上傳到 Pinata，步驟與我們上傳圖片時相同。

![如何將您的 nft-metadata.json 上傳到 Pinata](./uploadPinata.gif)

## 第 5 步：建立您合約的實例 {#instance-contract}

現在，為了與我們的合約互動，我們需要在程式碼中建立它的實例。 為此，我們需要我們的合約地址，可以從部署中取得，或透過 [Blockscout](https://eth-sepolia.blockscout.com/) 查詢您用來部署合約的地址來取得。

![在 Etherscan 上查看您的合約地址](./view-contract-etherscan.png)

在上面的範例中，我們的合約地址是 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778。

接下來，我們將使用 Web3 的[合約方法](https://docs.web3js.org/api/web3-eth-contract/class/Contract)，利用 ABI 和地址來建立我們的合約。 在您的 `mint-nft.js` 檔案中，新增以下內容：

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## 第 6 步：更新 `.env` 檔案 {#update-env}

現在，為了建立交易並傳送到以太坊鏈，我們將使用您的公開以太坊帳戶地址來取得帳戶 nonce (稍後會解釋)。

將您的公鑰新增到 `.env` 檔案 — 如果您完成了教學的第 1 部分，我們的 `.env` 檔案現在應該會像這樣：

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## 第 7 步：建立您的交易 {#create-txn}

首先，我們來定義一個名為 `mintNFT(tokenData)` 的函式，並透過以下步驟建立我們的交易：

1. 從 `.env` 檔案中取得您的 _PRIVATE_KEY_ 和 _PUBLIC_KEY_。

2. 接下來，我們需要找出帳戶 nonce。 nonce 規範是用來追蹤從您的地址傳送的交易數量 — 我們需要它來確保安全並防止[重放攻擊](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)。 若要取得從您的地址傳送的交易數量，我們使用 [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)。

3. 最後，我們將使用以下資訊來設定我們的交易：

- `'from': PUBLIC_KEY` — 我們交易的來源是我們的公開地址

- `'to': contractAddress` — 我們希望與之互動並傳送交易的合約

- `'nonce': nonce` — 帳戶 nonce，其中包含從我們地址傳送的交易數量

- `'gas': estimatedGas` — 完成交易預計所需的 Gas

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — 我們希望在此交易中執行的運算 — 在本例中是鑄造一個 NFT

您的 `mint-nft.js` 檔案現在應該會像這樣：

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // 取得最新的 nonce

   // 交易
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

既然我們已經建立了交易，就需要簽署它才能將其傳送出去。 這就是我們要使用私鑰的地方。

`web3.eth.sendSignedTransaction` 會提供給我們交易哈希，我們可以用它來確保我們的交易已被挖出，且沒有被網路丟棄。 您會注意到，在交易簽署部分，我們新增了一些錯誤檢查，以便我們知道交易是否成功完成。

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // 取得最新的 nonce

  // 交易
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
              "您的交易哈希為：",
              hash,
              "\n請查看 Alchemy 的 Mempool 以檢視您交易的狀態！"
            )
          } else {
            console.log(
              "提交您的交易時發生錯誤：",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" 承諾失敗：", err)
    })
}
```

## 第 9 步：呼叫 `mintNFT` 並執行 node `mint-nft.js` {#call-mintnft-fn}

還記得您上傳到 Pinata 的 `metadata.json` 嗎？ 從 Pinata 取得其哈希碼，並將以下內容作為參數傳遞給 `mintNFT` 函式 `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

以下是如何取得哈希碼：

![如何在 Pinata 上取得您的 nft 元數據哈希碼](./metadataPinata.gif)_如何在 Pinata 上取得您的 nft 元數據哈希碼_

> 透過在獨立視窗中載入 `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`，再次確認您複製的哈希碼連結到您的 **metadata.json**。 頁面應與下方的螢幕截圖類似：

![您的頁面應顯示 json 元數據](./metadataJSON.png)_您的頁面應顯示 json 元數據_

總而言之，您的程式碼看起來應該像這樣：

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // 取得最新的 nonce

  // 交易
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
              "您的交易哈希為：",
              hash,
              "\n請查看 Alchemy 的 Mempool 以檢視您交易的狀態！"
            )
          } else {
            console.log(
              "提交您的交易時發生錯誤：",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("承諾失敗：", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

現在，執行 `node scripts/mint-nft.js` 來部署您的 NFT。 幾秒鐘後，您應該會在終端機中看到類似這樣的回應：

    ```
    您的交易哈希為：0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    請查看 Alchemy 的 Mempool 以檢視您交易的狀態！
    ```

接下來，造訪您的 [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) 查看您交易的狀態 (無論是待處理、已挖出或被網路丟棄)。 如果您的交易被丟棄，查看 [Blockscout](https://eth-sepolia.blockscout.com/) 並搜尋您的交易哈希也會有幫助。

![在 Etherscan 上檢視您的 NFT 交易哈希](./view-nft-etherscan.png)_在 Etherscan 上檢視您的 NFT 交易哈希_

就這樣！ 您現在已經在以太坊區塊鏈上部署並鑄造了一個 NFT <Emoji text=":money_mouth_face:" size={1} />

使用 `mint-nft.js`，您可以隨心所欲 (錢包也允許的話) 地鑄造任意數量的 NFT！ 只要確保傳入一個新的 tokenURI 來描述 NFT 的元數據即可 (否則，您最終只會製造出一堆 ID 不同但內容相同的 NFT)。

想必您會希望能在錢包中展示您的 NFT — 所以請務必查看 [第 3 部分：如何在您的錢包中檢視您的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)！
