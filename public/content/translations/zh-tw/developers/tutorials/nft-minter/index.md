---
title: "NFT 鑄造程式教學"
description: "在本教學中，你將建立一個 NFT 鑄造程式，並學習如何使用梅塔馬斯克與 Web3 工具將智能合約連接到 React 前端，從而建立一個全端去中心化應用程式 (dapp)。"
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "智能合約", "前端", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: "NFT 鑄造程式 dapp"
lang: zh-tw
published: 2021-10-06
---

對於來自 Web2 背景的開發人員來說，最大的挑戰之一是弄清楚如何將智能合約連接到前端專案並與之互動。

透過建立一個 NFT 鑄造程式（一個簡單的使用者介面，你可以在其中輸入數位資產的連結、標題和描述），你將學習如何：

- 透過你的前端專案連接到梅塔馬斯克
- 從你的前端呼叫智能合約方法
- 使用梅塔馬斯克簽署交易

在本教學中，我們將使用 [React](https://react.dev/) 作為我們的前端框架。因為本教學主要側重於 Web3 開發，我們不會花太多時間詳細解釋 React 的基礎知識。相反地，我們將專注於為我們的專案帶來功能。

作為先決條件，你應該對 React 有初學者程度的了解——知道元件 (components)、屬性 (props)、useState/useEffect 以及基本函式呼叫是如何運作的。如果你以前從未聽過這些術語，你可能需要查看這篇 [React 簡介教學](https://react.dev/learn/tutorial-tic-tac-toe)。對於視覺學習者，我們強烈推薦 Net Ninja 製作的這個優秀的 [現代 React 完整教學](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) 影片系列。

如果你還沒有帳戶，你絕對需要一個 Alchemy 帳戶來完成本教學以及在區塊鏈上建立任何東西。在[這裡](https://alchemy.com/)註冊一個免費帳戶。

廢話不多說，我們開始吧！

## 製作 NFT 基礎知識 {#making-nfts-101}

在我們開始查看任何程式碼之前，了解製作 NFT 的運作方式非常重要。它包含兩個步驟：

### 在以太坊區塊鏈上發佈 NFT 智能合約 {#publish-nft}

這兩個 NFT 智能合約標準之間最大的區別在於，ERC-1155 是一個多代幣標準並包含批次處理功能，而 ERC-721 是一個單一代幣標準，因此一次只支援轉移一個代幣。

### 呼叫鑄造函式 {#minting-function}

通常，這個鑄造函式要求你傳入兩個變數作為參數：第一個是 `recipient`，它指定將接收你剛鑄造的 NFT 的地址；第二個是 NFT 的 `tokenURI`，這是一個解析為描述 NFT 中繼資料的 JSON 文件的字串。

NFT 的中繼資料才是真正賦予它生命的東西，讓它擁有屬性，例如名稱、描述、圖片（或不同的數位資產）以及其他屬性。這是一個包含 NFT 中繼資料的 [tokenURI 範例](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)。

在本教學中，我們將專注於第 2 部分：使用我們的 React 使用者介面呼叫 NFT 智能合約的鑄造函式。

你需要一個部署到受支援測試網（例如 Sepolia）的 ERC-721 NFT 智能合約。如果你想自己部署一個，我們推薦 Alchemy 的[將智能合約部署到 Sepolia](https://www.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet) 指南。

太棒了，現在我們了解了製作 NFT 的運作方式，讓我們複製我們的起始檔案吧！
## 複製起始檔案 {#clone-the-starter-files}

首先，前往 [nft-minter-tutorial GitHub 儲存庫](https://github.com/alchemyplatform/nft-minter-tutorial)以取得此專案的起始檔案。將此儲存庫複製到你的本機環境中。

當你打開這個複製的 `nft-minter-tutorial` 儲存庫時，你會注意到它包含兩個資料夾：`minter-starter-files` 和 `nft-minter`。

- `minter-starter-files` 包含此專案的起始檔案（主要是 React 使用者介面）。在本教學中，**我們將在此目錄中工作**，因為你將學習如何透過將此使用者介面連接到你的以太坊錢包和 NFT 智能合約來賦予它生命。
- `nft-minter` 包含整個已完成的教學，並在你**卡住時作為參考**。

接下來，在你的程式碼編輯器中打開你的 `minter-starter-files` 副本，然後導覽到你的 `src` 資料夾。

我們將編寫的所有程式碼都將位於 `src` 資料夾下。我們將編輯 `Minter.js` 元件並編寫額外的 JavaScript 檔案，以賦予我們的專案 Web3 功能。

## 第 2 步：查看我們的起始檔案 {#step-2-check-out-our-starter-files}

在我們開始編寫程式碼之前，查看起始檔案中已經為我們提供了什麼是很重要的。

### 讓你的 React 專案執行起來 {#get-your-react-project-running}

讓我們從在瀏覽器中執行 React 專案開始。React 的美妙之處在於，一旦我們的專案在瀏覽器中執行，我們儲存的任何變更都會在瀏覽器中即時更新。

要讓專案執行，請導覽到 `minter-starter-files` 資料夾的根目錄，然後在你的終端機中執行 `npm install` 以安裝專案的相依套件：

```bash
cd minter-starter-files
npm install
```

安裝完成後，在你的終端機中執行 `npm start`：

```bash
npm start
```

這樣做應該會在你的瀏覽器中打開 http://localhost:3000/，你將在其中看到我們專案的前端。它應該包含 3 個欄位：一個輸入 NFT 資產連結的地方、輸入 NFT 的名稱，以及提供描述。

如果你嘗試點擊「連接錢包 (Connect Wallet)」或「鑄造 NFT (Mint NFT)」按鈕，你會發現它們不起作用——那是因為我們還需要編寫它們的功能程式碼！ :\)

### Minter.js 元件 {#minter-js}

**注意：** 確保你在 `minter-starter-files` 資料夾中，而不是在 `nft-minter` 資料夾中！

讓我們回到編輯器中的 `src` 資料夾並打開 `Minter.js` 檔案。了解此檔案中的所有內容非常重要，因為它是我們將要處理的主要 React 元件。

在這個檔案的頂部，我們有我們的狀態變數，我們將在特定事件後更新它們。

```javascript
//狀態變數
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

從未聽過 React 狀態變數或狀態掛鉤 (state hooks)？請查看[這些](https://legacy.reactjs.org/docs/hooks-state.html)文件。

以下是每個變數代表的含義：

- `walletAddress` - 儲存使用者錢包地址的字串
- `status` - 包含要顯示在使用者介面底部訊息的字串
- `name` - 儲存 NFT 名稱的字串
- `description` - 儲存 NFT 描述的字串
- `url` - 作為 NFT 數位資產連結的字串

在狀態變數之後，你會看到三個未實作的函式：`useEffect`、`connectWalletPressed` 和 `onMintPressed`。你會注意到所有這些函式都是 `async`，那是因為我們將在其中進行非同步 API 呼叫！它們的名稱與其功能同名：

```javascript
useEffect(async () => {
  //TODO: 實作
}, [])

const connectWalletPressed = async () => {
  //TODO: 實作
}

const onMintPressed = async () => {
  //TODO: 實作
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - 這是一個在你的元件渲染後被呼叫的 React 掛鉤。因為它傳入了一個空陣列 `[]` 屬性（見第 3 行），所以它只會在元件的_第一次_渲染時被呼叫。在這裡，我們將呼叫我們的錢包監聽器和另一個錢包函式來更新我們的使用者介面，以反映錢包是否已經連接。
- `connectWalletPressed` - 將呼叫此函式以將使用者的梅塔馬斯克錢包連接到我們的 dapp。
- `onMintPressed` - 將呼叫此函式以鑄造使用者的 NFT。

在這個檔案的末尾附近，我們有我們元件的使用者介面。如果你仔細掃描這段程式碼，你會注意到當對應文字欄位中的輸入發生變化時，我們會更新我們的 `url`、`name` 和 `description` 狀態變數。

你還會看到，當分別點擊 ID 為 `mintButton` 和 `walletButton` 的按鈕時，會呼叫 `connectWalletPressed` 和 `onMintPressed`。

```javascript
//我們元件的 UI
return (
  <div className="Minter">
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

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

最後，讓我們說明這個 Minter 元件被加在哪裡。

如果你轉到 `App.js` 檔案（它是 React 中的主要元件，充當所有其他元件的容器），你會看到我們的 Minter 元件被注入在第 7 行。

**在本教學中，我們將只編輯 `Minter.js file` 並在我們的 `src` 資料夾中新增檔案。**

現在我們了解了我們正在處理的內容，讓我們設定我們的以太坊錢包！

## 設定你的以太坊錢包 {#set-up-your-ethereum-wallet}

為了讓使用者能夠與你的智能合約互動，他們需要將他們的以太坊錢包連接到你的 dapp。

### 下載梅塔馬斯克 {#download-metamask}

在本教學中，我們將使用梅塔馬斯克，這是一個瀏覽器中的虛擬錢包，用於管理你的以太坊帳戶地址。如果你想進一步了解以太坊上的交易是如何運作的，請查看[此頁面](/developers/docs/transactions/)。

你可以免費在[這裡](https://metamask.io/download)下載並建立一個梅塔馬斯克帳戶。當你在建立帳戶時，或者如果你已經有一個帳戶，請確保切換到如 Sepolia 等受支援的測試網 \(這樣我們就不會牽涉到真實的資金\)。
### 從水龍頭新增以太幣 {#add-ether-from-faucet}

為了鑄造我們的 NFT（或在以太坊區塊鏈上簽署任何交易），我們需要一些假的 ETH。要獲取測試網 ETH，請使用維護中的水龍頭，例如 [Alchemy Sepolia 水龍頭](https://www.alchemy.com/faucets/ethereum-sepolia)，並輸入你的 Sepolia 帳戶地址。不久之後，你應該就會在你的梅塔馬斯克帳戶中看到 ETH！
### 檢查你的餘額 {#check-your-balance}

為了再次確認我們的餘額是否存在，讓我們使用 [Alchemy 的沙盒工具](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)發出 [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) 請求。這將回傳我們錢包中的 ETH 數量。在輸入你的梅塔馬斯克帳戶地址並點擊「發送請求 (Send Request)」後，你應該會看到類似以下的響應：

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注意：** 這個結果的單位是 Wei，而不是 ETH。Wei 被用作以太幣的最小面額。Wei 到 ETH 的轉換為：1 ETH = 10¹⁸ Wei。因此，如果我們將 0xde0b6b3a7640000 轉換為十進位，我們會得到 1\*10¹⁸，等於 1 ETH。

呼！我們的假錢都在那裡！ <Emoji text=":money_mouth_face:" size={1} />
## 將梅塔馬斯克連接到你的使用者介面 {#connect-metamask-to-your-ui}

現在我們的梅塔馬斯克錢包已經設定好了，讓我們將我們的 dapp 連接到它！

因為我們想要遵循 [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 範式，我們將建立一個單獨的檔案，其中包含我們管理 dapp 邏輯、資料和規則的函式，然後將這些函式傳遞給我們的前端（我們的 Minter.js 元件）。

### `connectWallet` 函式 {#connect-wallet-function}

為此，讓我們在你的 `src` 目錄中建立一個名為 `utils` 的新資料夾，並在其中新增一個名為 `interact.js` 的檔案，它將包含我們所有的錢包和智能合約互動函式。

在我們的 `interact.js` 檔案中，我們將編寫一個 `connectWallet` 函式，然後我們將在我們的 `Minter.js` 元件中匯入並呼叫它。

在你的 `interact.js` 檔案中，新增以下內容：

```javascript
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

讓我們分解一下這段程式碼的作用：

首先，我們的函式會檢查你的瀏覽器中是否啟用了 `window.ethereum`。

`window.ethereum` 是由梅塔馬斯克和其他錢包提供商注入的全域 API，允許網站請求使用者的以太坊帳戶。如果獲得批准，它可以從使用者連接的區塊鏈讀取資料，並建議使用者簽署訊息和交易。查看[梅塔馬斯克文件](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)以獲取更多資訊！

如果 `window.ethereum` _不存在_，則表示未安裝梅塔馬斯克。這會導致回傳一個 JSON 物件，其中回傳的 `address` 是一個空字串，而 `status` JSX 物件傳達使用者必須安裝梅塔馬斯克。

**我們編寫的大多數函式都將回傳 JSON 物件，我們可以使用它們來更新我們的狀態變數和使用者介面。**

現在，如果 `window.ethereum` _存在_，那麼事情就變得有趣了。

使用 try/catch 迴圈，我們將嘗試透過呼叫 [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) 來連接到梅塔馬斯克。呼叫此函式將在瀏覽器中打開梅塔馬斯克，從而提示使用者將他們的錢包連接到你的 dapp。

- 如果使用者選擇連接，`method: "eth_requestAccounts"` 將回傳一個陣列，其中包含連接到 dapp 的所有使用者帳戶地址。總而言之，我們的 `connectWallet` 函式將回傳一個 JSON 物件，其中包含此陣列中的_第一個_ `address` \(見第 9 行\) 以及一個提示使用者向智能合約寫入訊息的 `status` 訊息。
- 如果使用者拒絕連接，則 JSON 物件將包含一個空字串作為回傳的 `address`，以及一個反映使用者拒絕連接的 `status` 訊息。

### 將 connectWallet 函式新增到你的 Minter.js 使用者介面元件 {#add-connect-wallet}

現在我們已經編寫了這個 `connectWallet` 函式，讓我們將它連接到我們的 `Minter.js.` 元件。

首先，我們必須透過將 `import { connectWallet } from "./utils/interact.js";` 新增到 `Minter.js` 檔案的頂部，將我們的函式匯入到我們的 `Minter.js` 檔案中。你的 `Minter.js` 的前 11 行現在應該看起來像這樣：

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //狀態變數
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

然後，在我們的 `connectWalletPressed` 函式中，我們將呼叫我們匯入的 `connectWallet` 函式，如下所示：

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

注意到我們的大部分功能是如何從 `interact.js` 檔案中抽象出來，遠離我們的 `Minter.js` 元件的嗎？這是為了讓我們遵守 M-V-C 範式！

在 `connectWalletPressed` 中，我們只需對我們匯入的 `connectWallet` 函式進行 await 呼叫，並使用其響應，透過它們的狀態掛鉤更新我們的 `status` 和 `walletAddress` 變數。

現在，讓我們儲存 `Minter.js` 和 `interact.js` 兩個檔案，並測試我們目前的使用者介面。

在瀏覽器中打開 localhost:3000，然後按下頁面右上角的「連接錢包 (Connect Wallet)」按鈕。

如果你安裝了梅塔馬斯克，系統應該會提示你將錢包連接到你的 dapp。接受連接邀請。

你應該會看到錢包按鈕現在反映你的地址已連接。

接下來，嘗試重新整理頁面... 這很奇怪。我們的錢包按鈕提示我們連接梅塔馬斯克，即使它已經連接了...

不過別擔心！我們可以透過實作一個名為 `getCurrentWalletConnected` 的函式來輕鬆解決這個問題，該函式將檢查地址是否已經連接到我們的 dapp，並相應地更新我們的使用者介面！

### getCurrentWalletConnected 函式 {#get-current-wallet}

在你的 `interact.js` 檔案中，新增以下 `getCurrentWalletConnected` 函式：

```javascript
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

這段程式碼與我們剛才編寫的 `connectWallet` 函式_非常_相似。

主要區別在於，我們不是呼叫 `eth_requestAccounts` 方法（該方法會打開梅塔馬斯克讓使用者連接他們的錢包），而是呼叫 `eth_accounts` 方法，它只是回傳一個包含目前連接到我們 dapp 的梅塔馬斯克地址的陣列。

要查看此函式的實際運作情況，讓我們在我們的 `Minter.js` 元件的 `useEffect` 函式中呼叫它。

就像我們對 `connectWallet` 所做的那樣，我們必須將此函式從我們的 `interact.js` 檔案匯入到我們的 `Minter.js` 檔案中，如下所示：

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //在此匯入
} from "./utils/interact.js"
```

現在，我們只需在我們的 `useEffect` 函式中呼叫它：

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

請注意，我們使用對 `getCurrentWalletConnected` 呼叫的響應來更新我們的 `walletAddress` 和 `status` 狀態變數。

新增此程式碼後，嘗試重新整理我們的瀏覽器視窗。按鈕應該會顯示你已連接，並顯示你已連接錢包地址的預覽 - 即使在你重新整理之後！

### 實作 addWalletListener {#implement-add-wallet-listener}

我們 dapp 錢包設定的最後一步是實作錢包監聽器，以便當我們錢包的狀態發生變化時（例如當使用者斷開連接或切換帳戶時），我們的使用者介面會更新。

在你的 `Minter.js` 檔案中，新增一個看起來像這樣的 `addWalletListener` 函式：

```javascript
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

讓我們快速分解一下這裡發生的事情：

- 首先，我們的函式會檢查是否啟用了 `window.ethereum` \(即是否安裝了梅塔馬斯克\)。
  - 如果沒有，我們只需將我們的 `status` 狀態變數設定為一個提示使用者安裝梅塔馬斯克的 JSX 字串。
  - 如果已啟用，我們在第 3 行設定監聽器 `window.ethereum.on("accountsChanged")`，它會監聽梅塔馬斯克錢包中的狀態變化，包括當使用者將額外帳戶連接到 dapp、切換帳戶或斷開帳戶連接時。如果至少有一個帳戶連接，則 `walletAddress` 狀態變數將更新為監聽器回傳的 `accounts` 陣列中的第一個帳戶。否則，`walletAddress` 將設定為空字串。

最後，我們必須在我們的 `useEffect` 函式中呼叫它：

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

大功告成！我們已經完成了所有錢包功能的程式設計！現在我們的錢包已經設定好了，讓我們弄清楚如何鑄造我們的 NFT！

## NFT 中繼資料基礎知識 {#nft-metadata-101}

還記得我們在本教學第 0 步中剛才談到的 NFT 中繼資料嗎——它賦予了 NFT 生命，讓它擁有屬性，例如數位資產、名稱、描述和其他屬性。

我們需要將此中繼資料設定為 JSON 物件並儲存它，以便在呼叫我們智能合約的 `mintNFT` 函式時將其作為 `tokenURI` 參數傳入。

「資產連結 (Link to Asset)」、「名稱 (Name)」、「描述 (Description)」欄位中的文字將構成我們 NFT 中繼資料的不同屬性。我們將把這個中繼資料格式化為 JSON 物件，但是對於我們可以將這個 JSON 物件儲存在哪裡，有幾個選項：

- 我們可以將它儲存在以太坊區塊鏈上；然而，這樣做會非常昂貴。
- 我們可以將它儲存在集中式伺服器上，例如 AWS 或 Firebase。但這將違背我們的去中心化精神。
- 我們可以使用 IPFS，這是一個去中心化協定和點對點網路，用於在分散式檔案系統中儲存和共享資料。由於這個協定是去中心化且免費的，它是我們最好的選擇！

為了將我們的中繼資料儲存在 IPFS 上，我們將使用 [Pinata](https://pinata.cloud/)，這是一個方便的 IPFS API 和工具包。在下一步中，我們將確切解釋如何做到這一點！

## 使用 Pinata 將你的中繼資料固定到 IPFS {#use-pinata-to-pin-your-metadata-to-ipfs}

如果你沒有 [Pinata](https://pinata.cloud/) 帳戶，請在[這裡](https://app.pinata.cloud/auth/signup)註冊一個免費帳戶，並完成驗證你的電子郵件和帳戶的步驟。

### 建立你的 Pinata API 金鑰 {#create-pinata-api-key}

導覽到 [https://pinata.cloud/keys](https://pinata.cloud/keys) 頁面，然後選擇頂部的「新增金鑰 (New Key)」按鈕，將管理員 (Admin) 小工具設定為啟用，並為你的金鑰命名。

然後你會看到一個包含你的 API 資訊的彈出視窗。確保將其放在安全的地方。

現在我們的金鑰已經設定好了，讓我們將它新增到我們的專案中以便我們可以使用它。

### 建立一個 .env 檔案 {#create-a-env}

我們可以安全地將我們的 Pinata 金鑰和密碼儲存在環境檔案中。讓我們在你的專案目錄中安裝 [dotenv 套件](https://www.npmjs.com/package/dotenv)。

在你的終端機中打開一個新分頁 \(與執行 localhost 的分頁分開\)，並確保你在 `minter-starter-files` 資料夾中，然後在你的終端機中執行以下命令：

```text
npm install dotenv --save
```

接下來，透過在命令列中輸入以下內容，在你的 `minter-starter-files` 的根目錄中建立一個 `.env` 檔案：

```javascript
vim.env
```

這將在 vim \(一個文字編輯器\) 中彈出打開你的 `.env` 檔案。要儲存它，請按順序在鍵盤上按下「esc」+「:」+「q」。

接下來，在 VSCode 中，導覽到你的 `.env` 檔案，並將你的 Pinata API 金鑰和 API 密碼新增到其中，如下所示：

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

儲存檔案，然後你就可以開始編寫將 JSON 中繼資料上傳到 IPFS 的函式了！

### 實作 pinJSONToIPFS {#pin-json-to-ipfs}

對我們來說幸運的是，Pinata 有一個[專門用於將 JSON 資料上傳到 IPFS 的 API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json)，以及一個方便的帶有 axios 的 JavaScript 範例，我們只需稍作修改即可使用。

在你的 `utils` 資料夾中，讓我們建立另一個名為 `pinata.js` 的檔案，然後從 .env 檔案中匯入我們的 Pinata 密碼和金鑰，如下所示：

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

接下來，將下面的額外程式碼貼上到你的 `pinata.js` 檔案中。別擔心，我們將分解所有內容的含義！

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //向 Pinata 發送 axios POST 請求 ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

那麼這段程式碼到底是做什麼的呢？

首先，它匯入了 [axios](https://www.npmjs.com/package/axios)，這是一個用於瀏覽器和 Node.js 的基於 Promise 的 HTTP 客戶端，我們將使用它向 Pinata 發出請求。

然後我們有我們的非同步函式 `pinJSONToIPFS`，它接受一個 `JSONBody` 作為其輸入，並在其標頭中包含 Pinata API 金鑰和密碼，所有這些都是為了向他們的 `pinJSONToIPFS` API 發出 POST 請求。

- 如果這個 POST 請求成功，那麼我們的函式會回傳一個 JSON 物件，其中 `success` 布林值為 true，以及我們的中繼資料被固定到的 `pinataUrl`。我們將使用這個回傳的 `pinataUrl` 作為我們智能合約鑄造函式的 `tokenURI` 輸入。
- 如果這個 POST 請求失敗，那麼我們的函式會回傳一個 JSON 物件，其中 `success` 布林值為 false，以及一個傳達我們錯誤的 `message` 字串。

與我們的 `connectWallet` 函式回傳類型一樣，我們回傳 JSON 物件，以便我們可以使用它們的參數來更新我們的狀態變數和使用者介面。

## 載入你的智能合約 {#load-your-smart-contract}

現在我們有辦法透過我們的 `pinJSONToIPFS` 函式將我們的 NFT 中繼資料上傳到 IPFS，我們將需要一種方法來載入我們智能合約的實例，以便我們可以呼叫它的 `mintNFT` 函式。

正如我們之前提到的，在本教學中我們將使用[這個現有的 NFT 智能合約](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)；然而，如果你想了解我們是如何製作它的，或者自己製作一個，我們強烈推薦你查看我們的另一篇教學：[「如何建立 NFT」](https://www.alchemy.com/docs/how-to-create-an-nft)。

### 合約 ABI {#contract-abi}

如果你仔細檢查了我們的檔案，你會注意到在我們的 `src` 目錄中，有一個 `contract-abi.json` 檔案。ABI 對於指定合約將呼叫哪個函式以及確保該函式將以你期望的格式回傳資料是必要的。

我們還需要一個 Alchemy API 金鑰和 Alchemy Web3 API 來連接到以太坊區塊鏈並載入我們的智能合約。

### 建立你的 Alchemy API 金鑰 {#create-alchemy-api}

如果你還沒有 Alchemy 帳戶，[請在這裡免費註冊。](https://alchemy.com/?a=eth-org-nft-minter)

建立 Alchemy 帳戶後，你可以透過建立應用程式來產生 API 金鑰。這將允許我們向 Sepolia 測試網發出請求。

將滑鼠懸停在導覽列中的「Apps」上，然後點擊「Create App」，導覽至 Alchemy 儀表板中的「Create App」頁面。

為你的應用程式命名（我們選擇了「My First NFT!」），提供簡短的描述，為你的應用程式記帳環境選擇「Staging」，並為你的網路選擇「Sepolia」。

點擊「Create app」，就這樣！你的應用程式應該會出現在下表中。

太棒了，現在我們已經建立了我們的 HTTP Alchemy API URL，將其複製到你的剪貼簿...

...然後讓我們將其新增到我們的 `.env` 檔案中。總而言之，你的 .env 檔案應該看起來像這樣：

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-sepolia.g.alchemy.com/v2/<alchemy-key>
```

現在我們有了我們的合約 ABI 和我們的 Alchemy API 金鑰，我們準備好使用 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) 載入我們的智能合約了。
### 設定你的 Alchemy Web3 端點和合約 {#setup-alchemy-endpoint}

首先，如果你還沒有安裝，你需要透過在終端機中導覽到主目錄：`nft-minter-tutorial` 來安裝 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)：

```text
cd ..
npm install @alch/alchemy-web3
```

接下來讓我們回到我們的 `interact.js` 檔案。在檔案的頂部，新增以下程式碼以從你的 .env 檔案匯入你的 Alchemy 金鑰並設定你的 Alchemy Web3 端點：

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) 是 [Web3.js](https://docs.web3js.org/) 的包裝器，提供增強的 API 方法和其他關鍵優勢，讓身為 Web3 開發人員的你生活更輕鬆。它的設計要求最少的設定，因此你可以立即開始在你的應用程式中使用它！

接下來，讓我們將我們的合約 ABI 和合約地址新增到我們的檔案中。

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

一旦我們有了這兩個，我們就準備好開始編寫我們的鑄造函式程式碼了！

## 實作 mintNFT 函式 {#implement-the-mintnft-function}

在你的 `interact.js` 檔案中，讓我們定義我們的函式 `mintNFT`，顧名思義，它將鑄造我們的 NFT。

因為我們將進行大量的非同步呼叫 \(向 Pinata 呼叫以將我們的中繼資料固定到 IPFS，向 Alchemy Web3 呼叫以載入我們的智能合約，以及向梅塔馬斯克呼叫以簽署我們的交易\)，我們的函式也將是非同步的。

我們函式的第一個輸入將是我們數位資產的 `url`、`name` 和 `description`。在 `connectWallet` 函式下方新增以下函式簽章：

```javascript
export const mintNFT = async (url, name, description) => {}
```

### 輸入錯誤處理 {#input-error-handling}

自然地，在函式開始時進行某種輸入錯誤處理是有意義的，因此如果我們的輸入參數不正確，我們就會退出此函式。在我們的函式中，讓我們新增以下程式碼：

```javascript
export const mintNFT = async (url, name, description) => {
  //錯誤處理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

本質上，如果任何輸入參數是空字串，那麼我們會回傳一個 JSON 物件，其中 `success` 布林值為 false，並且 `status` 字串傳達我們使用者介面中的所有欄位都必須填寫完整。

### 將中繼資料上傳到 IPFS {#upload-metadata-to-ipfs}

一旦我們知道我們的中繼資料格式正確，下一步就是將其包裝成 JSON 物件，並透過我們編寫的 `pinJSONToIPFS` 將其上傳到 IPFS！

為此，我們首先需要將 `pinJSONToIPFS` 函式匯入到我們的 `interact.js` 檔案中。在 `interact.js` 的最頂部，讓我們新增：

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

回想一下，`pinJSONToIPFS` 接受一個 JSON 主體。因此，在我們呼叫它之前，我們需要將我們的 `url`、`name` 和 `description` 參數格式化為 JSON 物件。

讓我們更新我們的程式碼以建立一個名為 `metadata` 的 JSON 物件，然後使用這個 `metadata` 參數呼叫 `pinJSONToIPFS`：

```javascript
export const mintNFT = async (url, name, description) => {
  //錯誤處理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //建立中繼資料
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //呼叫 Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

請注意，我們將對 `pinJSONToIPFS(metadata)` 呼叫的響應儲存在 `pinataResponse` 物件中。然後，我們解析此物件以尋找任何錯誤。

如果有錯誤，我們會回傳一個 JSON 物件，其中 `success` 布林值為 false，並且我們的 `status` 字串傳達我們的呼叫失敗。否則，我們從 `pinataResponse` 中提取 `pinataURL` 並將其儲存為我們的 `tokenURI` 變數。

現在是時候使用我們在檔案頂部初始化的 Alchemy Web3 API 載入我們的智能合約了。將以下程式碼行新增到 `mintNFT` 函式的底部，以在 `window.contract` 全域變數處設定合約：

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

在我們的 `mintNFT` 函式中要新增的最後一件事是我們的以太坊交易：

```javascript
//設定您的以太坊交易
const transactionParameters = {
  to: contractAddress, // 除非在合約發佈期間，否則為必填。
  from: window.ethereum.selectedAddress, // 必須符合使用者的有效地址。
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //呼叫 NFT 智能合約
}

//透過梅塔馬斯克簽署交易
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

如果你已經熟悉以太坊交易，你會注意到其結構與你所見過的非常相似。

- 首先，我們設定我們的交易參數。
  - `to` 指定接收者地址 \(我們的智能合約\)
  - `from` 指定交易的簽署者 \(使用者連接到梅塔馬斯克的地址：`window.ethereum.selectedAddress`\)
  - `data` 包含對我們智能合約 `mintNFT` 方法的呼叫，該方法接收我們的 `tokenURI` 和使用者的錢包地址 `window.ethereum.selectedAddress` 作為輸入
- 然後，我們進行 await 呼叫 `window.ethereum.request,`，我們要求梅塔馬斯克簽署交易。請注意，在這個請求中，我們指定了我們的 eth 方法 \(eth_SentTransaction\) 並傳入我們的 `transactionParameters`。此時，梅塔馬斯克將在瀏覽器中打開，並提示使用者簽署或拒絕交易。
  - 如果交易成功，該函式將回傳一個 JSON 物件，其中布林值 `success` 設定為 true，並且 `status` 字串提示使用者查看 Etherscan 以獲取有關其交易的更多資訊。
  - 如果交易失敗，該函式將回傳一個 JSON 物件，其中 `success` 布林值設定為 false，並且 `status` 字串傳達錯誤訊息。

總而言之，我們的 `mintNFT` 函式應該看起來像這樣：

```javascript
export const mintNFT = async (url, name, description) => {
  //錯誤處理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //建立中繼資料
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata pin 請求
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //載入智能合約
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //設定您的以太坊交易
  const transactionParameters = {
    to: contractAddress, // 除非在合約發佈期間，否則為必填。
    from: window.ethereum.selectedAddress, // 必須符合使用者的有效地址。
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //呼叫 NFT 智能合約
  }

  //透過梅塔馬斯克簽署交易
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

這是一個巨大的函式！現在，我們只需要將我們的 `mintNFT` 函式連接到我們的 `Minter.js` 元件...

## 將 mintNFT 連接到我們的 Minter.js 前端 {#connect-our-frontend}

打開你的 `Minter.js` 檔案，並將頂部的 `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` 行更新為：

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

最後，實作 `onMintPressed` 函式以對你匯入的 `mintNFT` 函式進行 await 呼叫，並更新 `status` 狀態變數以反映我們的交易是成功還是失敗：

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## 將你的 NFT 部署到上線的網站 {#deploy-your-nft}

準備好讓你的專案上線供使用者互動了嗎？請查看 [React 部署文件](https://create-react-app.dev/docs/deployment/)，了解如何將你的鑄造程式部署到上線的網站。

最後一步...
## 席捲區塊鏈世界 {#take-the-blockchain-world-by-storm}

開玩笑的，你已經來到了教學的尾聲！

總結一下，透過建立一個 NFT 鑄造程式，你成功學習了如何：

- 透過你的前端專案連接到梅塔馬斯克
- 從你的前端呼叫智能合約方法
- 使用梅塔馬斯克簽署交易

想必，你希望能夠在你的錢包中展示透過你的 dapp 鑄造的 NFT——所以一定要查看我們的快速教學：[如何在你的錢包中查看你的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)！

而且，一如既往，如果你有任何問題，我們會在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中提供協助。我們迫不及待地想看看你如何將本教學中的概念應用到你未來的專案中！
