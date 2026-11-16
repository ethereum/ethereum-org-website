---
title: "如何鑄造 NFT（NFT 教學系列第 2/3 部分）"
description: "本教學說明如何使用我們的智能合約、Hardhat 與 ethers.js 在以太坊區塊鏈上鑄造非同質化代幣 (NFT)。"
author: "蘇米·穆吉爾"
tags: ["ERC-721", "Alchemy", "Solidity", "智能合約"]
skill: beginner
breadcrumb: "鑄造 NFT"
lang: zh-tw
published: 2021-04-22
---

「鑄造 NFT」是指在區塊鏈上發布 ERC-721 代幣的唯一實例。使用我們在[本 NFT 教學系列第 1 部分](/developers/tutorials/how-to-write-and-deploy-an-nft/)中的智能合約，讓我們展現 Web3 技能並鑄造一個非同質化代幣 (NFT)。在本教學結束時，你將能夠隨心所欲（且在錢包允許的範圍內）鑄造任意數量的 NFT！

讓我們開始吧！

## 步驟 1：檢查你的設定 {#install-web3}

如果你已經跟著第一篇教學建立了你的非同質化代幣 (NFT) 智能合約，你應該已經具備所有需要的東西：一個包含 [Ethers 外掛程式](https://hardhat.org/docs/plugins/hardhat-ethers)與 [ethers.js](https://docs.ethers.org/v6/) 的 Hardhat 3 專案，ethers.js 是一個用來讓向[以太坊](/)區塊鏈發送請求變得更容易的函式庫。我們將把鑄造程式碼寫成一個 Hardhat 腳本，這樣它就能重複使用第 1 部分的 Sepolia 網路設定以及 `API_URL` 和 `PRIVATE_KEY` 的值——不需要安裝任何新東西。

## 步驟 2：建立 `mint-nft.js` 檔案 {#create-mintnftjs}

在你的 scripts 目錄中，建立一個 `mint-nft.js` 檔案並加入以下程式碼：

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

就像在我們的部署腳本中一樣，當你執行腳本時，`network.create()` 會連接到你使用 `--network` 選擇的網路，並為我們提供該網路的 `ethers` 物件。

## 步驟 3：取得你的合約 ABI {#contract-abi}

我們的合約 ABI（應用程式二進制介面 (ABI)）是與我們的智能合約互動的介面。你可以了解更多關於[合約 ABI](/glossary/#abi) 的資訊。當 Hardhat 編譯合約時，會自動為我們產生一個 ABI，並將其儲存在 `artifacts/contracts/MyNFT.sol/MyNFT.json` 檔案中。當我們在步驟 5 建立合約實例時，Hardhat Ethers 外掛程式會從那裡為我們讀取它，因此我們不需要自己載入它。

如果你想查看 ABI，可以將其列印到主控台。從你的專案根目錄執行：

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## 步驟 4：使用 IPFS 設定你的 NFT 中繼資料 {#config-meta}

如果你還記得我們在第 1 部分的教學，我們的 `mintNFT` 智能合約函式接受一個 tokenURI 參數，該參數應解析為一個描述非同質化代幣 (NFT) 中繼資料的 JSON 文件——這正是賦予 NFT 生命力的關鍵，使其能夠擁有可設定的屬性，例如名稱、描述、圖片和其他屬性。

> _星際檔案系統 (IPFS) 是一個去中心化的協定與點對點網路，用於在分散式檔案系統中儲存和分享資料。_

我們將使用 Pinata（一個方便的 IPFS 應用程式介面 (API) 與工具組）來儲存我們的 NFT 資產和中繼資料，以確保我們的 NFT 是真正去中心化的。如果你沒有 Pinata 帳戶，請在[這裡](https://app.pinata.cloud)註冊一個免費帳戶，並完成驗證電子郵件的步驟。

建立帳戶後：

- 導覽至 [Files 頁面](https://app.pinata.cloud/ipfs/files)，然後點擊頁面右上角的「Add」按鈕。

- 上傳一張圖片到 Pinata——這將成為你 NFT 的圖片資產。你可以隨意為該資產命名。請確保將其上傳到公開的 IPFS：顯示你 NFT 的錢包和市場無法擷取 [Private IPFS](https://docs.pinata.cloud/files/private-ipfs) 上的檔案。

- 上傳後，你會在 Files 頁面上看到該檔案及其 CID（內容識別碼）列在一起。複製該 CID。你可以在 `https://gateway.pinata.cloud/ipfs/<CID>` 檢視你的上傳內容，或透過 Pinata 側邊欄「Gateways」下所列的專用閘道檢視。例如，你可以在[這裡](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)找到我們在 IPFS 上使用的圖片。

現在，我們還需要上傳另一份文件到 Pinata。但在那之前，我們需要先建立它！

在你的根目錄中，建立一個名為 `nft-metadata.json` 的新檔案，並加入以下 json 程式碼：

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

你可以隨意更改 json 中的資料。你可以移除或新增 attributes 區塊的內容。最重要的是，確保 image 欄位指向你的 IPFS 圖片位置，格式為 `ipfs://<image-CID>`——否則，你的 NFT 將會包含一張（非常可愛的！）狗狗照片。

完成編輯 JSON 檔案後，儲存並將其上傳到 Pinata，步驟與我們上傳圖片時相同。也請複製 `nft-metadata.json` 的 CID；我們在步驟 9 會用到它。

## 步驟 5：建立你的合約實例 {#instance-contract}

現在，為了與我們的合約互動，我們需要在程式碼中建立一個它的實例。為此，我們需要我們的合約地址，這在第 1 部分的部署腳本中已經印出。你也可以透過查詢你用來部署合約的地址，在 [Etherscan](https://sepolia.etherscan.io/) 或 [Blockscout](https://eth-sepolia.blockscout.com/) 上找到它。

![在 Etherscan 上檢視你的合約地址](./view-contract-etherscan.png)

在上述範例中，我們的合約地址是 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778。

接下來，我們將使用 Hardhat Ethers 外掛程式的 `getContractAt` 方法，透過合約名稱（這會告訴它要使用哪個 ABI）和地址來建立我們的合約。在你的 `mint-nft.js` 檔案中，加入以下內容，並將地址替換為你自己的地址：

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## 步驟 6：檢查 `.env` 檔案 {#update-env}

我們發送的每一筆交易都必須使用你帳戶的私鑰進行簽署。如果你完成了教學的第 1 部分，我們的 `.env` 檔案應該已經長這樣：

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

不需要加入你的公開地址：ethers 會從私鑰推算出來。

## 步驟 7：建立你的交易 {#create-txn}

首先，讓我們定義一個名為 `mintNFT(tokenURI)` 的函式，並透過以下步驟建立我們的交易：

1. 取得我們發送交易的帳戶。`ethers.getSigners()` 會回傳為該網路設定的帳戶，在 Sepolia 上，這就是私鑰位於 `.env` 中的帳戶。由於 `mintNFT` 是 `onlyOwner`，這必須是部署合約的同一個帳戶。

1. 在我們的合約實例上呼叫 `mintNFT` 函式，將我們自己的地址作為接收者，並傳入中繼資料 URI。這是我們希望在此交易中執行的運算——在這種情況下就是鑄造一個非同質化代幣 (NFT)。

你不需要自己計算隨機數（從你的地址發送的交易數量，用於防止重放攻擊）、Gas 限制或手續費：ethers 會在發送交易前擷取或估算它們。

你的 `mint-nft.js` 檔案現在應該長這樣：

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // 發送交易。ethers 會為我們填入 nonce、gas limit 與費用。
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## 步驟 8：簽署交易 {#sign-txn}

因為網路已經設定了我們的私鑰，ethers 會在發送交易前自動使用它來簽署交易。

呼叫 `mintNFT` 會在交易發送後回傳，並給我們交易雜湊值，我們可以使用它來確保我們的交易已被開採，且沒有被網路丟棄。接著 `tx.wait()` 會等待直到交易被包含在一個區塊中。我們也加入了一些錯誤檢查，這樣我們就能知道交易是否成功完成。

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // 發送交易。ethers 會為我們填入 nonce、gas limit 與費用。
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // 等待交易被包含在區塊中
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## 步驟 9：呼叫 `mintNFT` 並執行 `mint-nft.js` {#call-mintnft-fn}

還記得你上傳到 Pinata 的 `nft-metadata.json` 嗎？從 Pinata 取得它的 CID，並將 `ipfs://<metadata-CID>` 作為參數傳遞給 `mintNFT` 函式。錢包和市場會透過他們選擇的 IPFS 閘道來解析 `ipfs://` URI，因此你的非同質化代幣 (NFT) 不會依賴任何單一閘道。

> 透過在獨立視窗中載入 `https://gateway.pinata.cloud/ipfs/<metadata-CID>`，再次確認你複製的 CID 連結到你的 **nft-metadata.json**。頁面應該會類似下方的螢幕截圖：

![你的頁面應該會顯示 json 中繼資料](./metadataJSON.png)_你的頁面應該會顯示 json 中繼資料_

總而言之，你的程式碼應該會長得像這樣：

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // 發送交易。ethers 會為我們填入 nonce、gas limit 與費用。
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // 等待交易被包含在區塊中
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

現在，針對 Sepolia 執行腳本來鑄造你的 NFT：

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

幾秒鐘後，你應該會在終端機中看到類似這樣的回應：

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

要查看你的交易詳細資訊，請在 [Etherscan](https://sepolia.etherscan.io/) 或 [Blockscout](https://eth-sepolia.blockscout.com/) 上搜尋其雜湊值。

![在 Etherscan 上檢視你的 NFT 交易雜湊值](./view-nft-etherscan.png)_在 Etherscan 上檢視你的 NFT 交易雜湊值_

就這樣！你現在已經在以太坊區塊鏈上部署並鑄造了一個 NFT <Emoji text=":money_mouth_face:" size={1} />

使用 `mint-nft.js`，你可以隨心所欲（且在錢包允許的範圍內）鑄造任意數量的 NFT！只要確保傳入一個描述 NFT 中繼資料的新 tokenURI 即可（否則，你最終只會製作出一堆 ID 不同但內容完全相同的 NFT）。

想必你會希望能在錢包中炫耀你的 NFT——所以請務必查看[第 3 部分：如何在錢包中檢視你的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)！
