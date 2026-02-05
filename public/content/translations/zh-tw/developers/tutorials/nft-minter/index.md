---
title: "非同質化代幣鑄幣機使用教學"
description: "在本教學中，你將建構一個 NFT 鑄造器，並學習如何透過 MetaMask 和 Web3 工具將你的智能合約連接到 React 前端，來建立一個全端去中心化應用程式。"
author: "smudgil"
tags: [ "穩固", "非同質化代幣", "alchemy", "智能合約", "前端", "Pinata" ]
skill: intermediate
lang: zh-tw
published: 2021-10-06
---

對於來自 Web2 背景的開發人員來說，最大的挑戰之一是弄清楚如何將你的智慧型合約連接到前端專案並與之交互。

通過構建非同質化代幣鑄幣機 ，一個可以用來輸入數字資產鏈接、名稱與描述的簡單用戶界面 — 你將學會如何：

- 通過你的前端專案連接到 MetaMask
- 在前端調用智慧型合約的方法
- 使用MetaMask簽署交易

在本教學中，我們將使用 [React](https://react.dev/) 作為前端框架。 因為此教程最初是專注於Web3的發展上，我們將不會花費過多的時間來解釋功能「反應」的基本概念。 反之，我們將會集中在往我們專案帶來功能的方法。

作為一個前提，你理應有一個初學者對「反應」的理解 - 會知道組件、道具、useState/useEffect，還有基本功能回呼的運作。 如果你之前從未聽過這些術語，不妨先看看這篇 [React 入門教學](https://react.dev/learn/tutorial-tic-tac-toe)。 對於偏好視覺學習的讀者，我們強烈推薦由 Net Ninja 製作的這套優質影片系列：[Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)。

而且如果你還沒準備好，你且將會一定需要一個Alchemy的帳戶來完成該份教程，也會在區塊鏈上建立任何東西。 [在此](https://alchemy.com/)註冊一個免費帳戶。

迫不及待了嗎？那麼讓我們開始吧！

## NFT 製作入門 {#making-nfts-101}

在我們甚至要開始著眼在任何程式碼前，理解創造一個NFT的運作過程是重要的。 它由兩個步驟組成：

### 在以太坊區塊鏈上發布 NFT 智能合約 {#publish-nft}

在兩份NFT智慧型合約標準中最大的分別是：ERC-1155協議是一份具有多種代幣標準且內有批次的功能的合約；對比來看ERC-721協議只是一份單一代幣標準的合約，也因此它只會支持一次性地傳送一個代幣。

### 呼叫鑄造函式 {#minting-function}

通常，這個鑄造函式需要你傳入兩個變數作為參數：第一個是 `recipient`，用來指定接收你新鑄造 NFT 的位址；第二個是 NFT 的 `tokenURI`，這是一個字串，會解析成描述 NFT 元資料的 JSON 文件。

一個NFT的元數據是把NFT從虛擬帶到現實的東西，它容許NFT持有特質，如一個名字、描述、圖像（或不同的電子資產），還有其他屬性。 這是 [一個 tokenURI 的範例](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)，其中包含了 NFT 的元資料。

在此教程內，我們將會專注於第二部分，它是有關使用我們的功能「反應」UI回呼一個現存NFT的智慧型合約挖礦功能的方法。

[這個連結](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) 是我們在本教學中將會呼叫的 ERC-721 NFT 智能合約。 如果你想學習我們是如何製作它的，我們強烈推薦你查看我們的另一篇教學：["如何建立一個 NFT"](https://www.alchemy.com/docs/how-to-create-an-nft)。

好的，現在我們明白了讓一個NFT運作的原理，讓我們複製我們的起始檔案們吧！

## 複製入門檔案 {#clone-the-starter-files}

首先，前往 [nft-minter-tutorial GitHub 儲存庫](https://github.com/alchemyplatform/nft-minter-tutorial) 以取得此專案的入門檔案。 將此儲存庫複製到你的本機環境中。

當你開啟這個複製的 `nft-minter-tutorial` 儲存庫時，你會注意到它包含兩個資料夾：`minter-starter-files` 和 `nft-minter`。

- `minter-starter-files` 包含此專案的入門檔案 (主要是 React UI)。 在本教學中，**我們將會在這個目錄中工作**，你將學習如何將此 UI 連接到你的以太坊錢包和 NFT 智能合約，讓它活起來。
- `nft-minter` 包含整個已完成的教學，如果你卡關了，可以把它當作**參考**。

接著，在你的程式碼編輯器中開啟你的 `minter-starter-files` 複本，然後導覽至 `src` 資料夾。

我們將撰寫的所有程式碼都會放在 `src` 資料夾底下。 我們將會編輯 `Minter.js` 元件並撰寫額外的 javascript 檔案，為我們的專案提供 Web3 功能。

## 步驟 2：查看我們的入門檔案 {#step-2-check-out-our-starter-files}

在我們開始打碼前，在起始檔案裡面檢查一下有甚麼是已經提供給我們發展專案是很重要的。

### 讓你的 React 專案動起來 {#get-your-react-project-running}

讓我們透過在我們的瀏覽器內運行這個「反應」專案來開始是日的教程吧： 「反應」的美在於一旦我們在瀏覽器內已經有在運行自己的專案，我們儲存下來的任何改變都將會被實時更新到我們的瀏覽器裡。

要讓專案動起來，請導覽至 `minter-starter-files` 資料夾的根目錄，然後在你的終端機中執行 `npm install` 來安裝專案的依賴項：

```bash
cd minter-starter-files
npm install
```

安裝完成後，在你的終端機中執行 `npm start`：

```bash
npm start
```

此舉理應會在你的瀏覽器內打開網站（http://localhost:3000/），在那裡你將會看見我們專案的前端。 它應該由三個欄位組成：一個輸入往你的NFT資產所在地的連結空位、一個輸入你的NFT名字的空格，以及一個提供形容段落的欄位。

如你試圖點擊按鈕「連結錢包」或「挖取NFT」，你將會注意到它們不會如常運作 - 這是因為我們將仍然需要設計一下它們的功能！ :\)

### Minter.js 元件 {#minter-js}

**注意：** 請確保你位在 `minter-starter-files` 資料夾，而不是 `nft-minter` 資料夾！

讓我們回到編輯器中的 `src` 資料夾，並開啟 `Minter.js` 檔案。 這個動作在我們理解該檔案內所有東西上有著超級關鍵的作用，因為它是我們將會首先處理的第一個「反應」組件。

在此檔案的最頂部，有著我們將會在特定事件後更新的一些狀態變數。

```javascript
//狀態變數
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

從來沒有聽過「反應」狀態變數或者狀態勾手嗎？ 查看[這些](https://legacy.reactjs.org/docs/hooks-state.html)文件。

在此是每個變數代表的意思：

- `walletAddress` - 一個儲存使用者錢包位址的字串
- `status` - 一個包含訊息的字串，會顯示在 UI 底部
- `name` - 一個儲存 NFT 名稱的字串
- `description` - 一個儲存 NFT 描述的字串
- `url` - 一個連結到 NFT 數位資產的字串

在狀態變數之後，你會看到三個未實作的函式：`useEffect`、`connectWalletPressed` 和 `onMintPressed`。 你會注意到所有這些函式都是 `async`，這是因為我們將在其中進行非同步的 API 呼叫！ 它們的名稱是以各自的功能來命名的：

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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - 這是一個 React hook，會在你的元件渲染後被呼叫。 因為它傳入了一個空陣列 `[]` 的 prop (見第 3 行)，所以它只會在元件的_第一次_渲染時被呼叫。 在此我們將會回呼我們的錢包聽眾以及其他錢包功能來更新我們的UI，去反思一下一個錢包是否已經被連結好。
- `connectWalletPressed` - 這個函式將被呼叫，用來將使用者的 MetaMask 錢包連接到我們的去中心化應用程式。
- `onMintPressed` - 這個函式將被呼叫，用來鑄造使用者的 NFT。

接近這份檔案的尾聲，我們得到了我們組件的UI。 如果你仔細查看這段程式碼，你會注意到當對應的文字欄位中的輸入改變時，我們會更新 `url`、`name` 和 `description` 這些狀態變數。

你也會看到當 ID 為 `mintButton` 和 `walletButton` 的按鈕被點擊時，`connectWalletPressed` 和 `onMintPressed` 會分別被呼叫。

```javascript
//我們元件的 UI
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "已連接： " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>連接錢包</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT 鑄造器</h1>
    <p>
      只需加入你資產的連結、名稱和描述，然後按下「鑄造」。
    </p>
    <form>
      <h2>🖼 資產連結： </h2>
      <input
        type="text"
        placeholder="例如：https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 名稱： </h2>
      <input
        type="text"
        placeholder="例如：我的第一個 NFT！"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ 描述： </h2>
      <input
        type="text"
        placeholder="例如：比謎戀貓還酷 ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      鑄造 NFT
    </button>
    <p id="status">{status}</p>
</div>
)
```

最後，讓我們強調一下這個Minter組件會在哪裡被添加。

如果你查看 `App.js` 檔案，這是 React 中的主要元件，作為所有其他元件的容器，你會看到我們的 Minter 元件在第 7 行被注入。

**在本教學中，我們只會編輯 `Minter.js` 檔案，並在 `src` 資料夾中新增檔案。**

現在我們明白了到底是在跟甚麼東西一起操作後，讓我們設定自己的以太虛擬坊錢包吧！

## 設定你的以太坊錢包 {#set-up-your-ethereum-wallet}

使用者需要將他們的以太坊錢包連接到你的去中心化應用程式，才能與你的智能合約互動。

### 下載 MetaMask {#download-metamask}

為此教學，我們將會使用 MetaMask。它是一個在瀏覽器上管理你的乙太坊帳戶地址的虛擬錢包。 如果你想更深入了解以太坊上的交易如何運作，請查看[此頁面](/developers/docs/transactions/)。

您可以在[這裡](https://metamask.io/download)免費下載並建立 MetaMask 帳戶。 當你正在創建一個帳戶時，或者如果你已經持有一個帳戶，你要確定在右上方把模式轉移到「Ropsten測試網路」之上 \（因為這樣我們才不會處理到真實金錢\）。

### 從水龍頭取得以太幣 {#add-ether-from-faucet}

為了要挖取我們的NFT（或是簽署任何在以太坊區塊鏈的交易），我們將需要一些假ETH。 要取得 Eth，你可以前往 [Ropsten 水龍頭](https://faucet.ropsten.be/)，輸入你的 Ropsten 帳戶位址，然後點擊「Send Ropsten Eth」。 你應該很快便能在你的MetaMask帳戶裡看見ETH！

### 檢查你的餘額 {#check-your-balance}

為了再次確認我們的餘額，讓我們使用 [Alchemy 的 composer 工具](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) 發出一個 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 請求。 這將會把我們錢包內的以太結餘回傳。 在你輸入自己的MetaMask帳戶地址，並且點下「寄送請求」後，你理應會看見一個這樣子的回應：

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注意：** 此結果的單位是 wei，不是 eth。 Wei是一個被用來計算以太最少分數的單位。 要把wei換算到ETH的算術是：1 ETH = 10¹⁸ wei。 所以，如果我們要換算 0xde0b6b3a7640000 到小數點，我們會得到 1\*10¹⁸的結果，它相當於一個ETH的數值。

哈! 我們的假錢都在這！ <Emoji text=":money_mouth_face:" size={1} />

## 將 MetaMask 連接到你的 UI {#connect-metamask-to-your-UI}

既然我們的 MetaMask 錢包已經設定好了，就讓我們把去中心化應用程式連接到它吧！

因為我們想遵循 [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 範式，所以我們要建立一個獨立的檔案，其中包含管理我們去中心化應用程式的邏輯、資料和規則的函式，然後將這些函式傳遞給我們的前端 (我們的 Minter.js 元件)。

### `connectWallet` 函式 {#connect-wallet-function}

為此，讓我們在你的 `src` 目錄中建立一個名為 `utils` 的新資料夾，並在其中加入一個名為 `interact.js` 的檔案，它將包含我們所有錢包和智能合約的互動函式。

在我們的 `interact.js` 檔案中，我們將撰寫一個 `connectWallet` 函式，然後在我們的 `Minter.js` 元件中匯入並呼叫它。

在你的 `interact.js` 檔案中，加入以下內容

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 請在上方文字欄位中寫入一則訊息。",
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
              你必須在瀏覽器中安裝 MetaMask，一個虛擬的以太坊錢包。
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

讓我們一起分解這個程式碼的工作：

首先，我們的函式會檢查你的瀏覽器中是否啟用了 `window.ethereum`。

`window.ethereum` 是由 MetaMask 和其他錢包提供者注入的全域 API，允許網站請求使用者的以太坊帳戶。 如果請求被接納，它能夠從連結成功的用戶那裡的區塊鏈中讀取數據，並且會向用戶提出簽署訊息和交易的建議。 查看 [MetaMask 文件](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)以獲得更多資訊！

如果 `window.ethereum` _不存在_，那表示 MetaMask 沒有安裝。 這會回傳一個 JSON 物件，其中回傳的 `address` 是一個空字串，而 `status` JSX 物件則傳達使用者必須安裝 MetaMask 的訊息。

**我們撰寫的大部分函式都會回傳 JSON 物件，我們可以用它來更新我們的狀態變數和 UI。**

現在如果 `window.ethereum` _存在_，事情就變得有趣了。

使用 try/catch 迴圈，我們將透過呼叫 [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) 來嘗試連接 MetaMask。 呼叫這個函式會在瀏覽器中開啟 MetaMask，提示使用者將他們的錢包連接到你的去中心化應用程式。

- 如果使用者選擇連接，`method: "eth_requestAccounts"` 會回傳一個陣列，其中包含所有連接到此去中心化應用程式的使用者帳戶位址。 總而言之，我們的 `connectWallet` 函式會回傳一個 JSON 物件，其中包含此陣列中的_第一個_ `address` (見第 9 行) 和一則 `status` 訊息，提示使用者向智能合約寫入一則訊息。
- 如果使用者拒絕連接，那麼 JSON 物件將包含一個空字串作為回傳的 `address`，以及一則反映使用者拒絕連接的 `status` 訊息。

### 將 connectWallet 函式新增至你的 Minter.js UI 元件 {#add-connect-wallet}

既然我們已經寫好了 `connectWallet` 函式，就把它連接到我們的 `Minter.js` 元件吧。

首先，我們必須將函式匯入到 `Minter.js` 檔案中，方法是在 `Minter.js` 檔案的頂部新增 `import { connectWallet } from "./utils/interact.js";`。 你的 `Minter.js` 的前 11 行現在應該看起來像這樣：

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

然後，在我們的 `connectWalletPressed` 函式內部，我們將呼叫匯入的 `connectWallet` 函式，如下所示：

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

注意到我們大部分的功能是如何從 `interact.js` 檔案中抽象出來，與 `Minter.js` 元件分離的嗎？ 這是我們跟M-V-C規範相容的做法！

在 `connectWalletPressed` 中，我們只需對匯入的 `connectWallet` 函式進行一個 await 呼叫，並利用其回應，透過它們的 state hooks 更新我們的 `status` 和 `walletAddress` 變數。

現在，讓我們儲存 `Minter.js` 和 `interact.js` 這兩個檔案，並測試一下我們目前的 UI。

在「localhost:3000」打開你的瀏覽器，並在頁面的右上方按下按鍵「連結起錢包」。

如果你已安裝 MetaMask，系統應該會提示你將錢包連接到你的去中心化應用程式。 請接受進行連結的邀請。

你應會看得到錢包的按鈕現時反映了你的地址被連結好了。

接下來，試著重新整理頁面... 這很奇怪。 我們的錢包按鈕會鼓勵我們對MetaMask進行連結，就算它已經被連結好了。。。。。。

但是，請不要擔心！ 我們可以透過實作一個名為 `getCurrentWalletConnected` 的函式輕鬆解決這個問題，該函式會檢查是否有位址已經連接到我們的去中心化應用程式，並相應地更新我們的 UI！

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
          status: "👆🏽 請在上方文字欄位中寫入一則訊息。",
        }
      } else {
        return {
          address: "",
          status: "🦊 請使用右上角的按鈕連接到 MetaMask。",
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
              你必須在瀏覽器中安裝 MetaMask，一個虛擬的以太坊錢包。
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

這段程式碼與我們剛才寫的 `connectWallet` 函式_非常_相似。

主要的區別在於，我們不是呼叫 `eth_requestAccounts` 方法 (這會開啟 MetaMask 讓使用者連接他們的錢包)，而是在這裡呼叫 `eth_accounts` 方法，它只會回傳一個包含當前連接到我們去中心化應用程式的 MetaMask 位址的陣列。

為了看到這個函式的實際作用，讓我們在 `Minter.js` 元件的 `useEffect` 函式中呼叫它。

就像我們對 `connectWallet` 所做的一樣，我們必須將這個函式從 `interact.js` 檔案匯入到 `Minter.js` 檔案中，如下所示：

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //在此匯入
} from "./utils/interact.js"
```

現在，我們只需在 `useEffect` 函式中呼叫它：

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

注意，我們使用對 `getCurrentWalletConnected` 呼叫的回應來更新我們的 `walletAddress` 和 `status` 狀態變數。

一旦你已經添加好了這個程式碼，嘗試刷新我們的瀏覽器視窗。 這個按鈕應該會跟你說：「你已經連結好了。」，然後會顯出一個你錢包被連結好的地址的預視 - 就算在你刷新之後也會這樣！

### 實作 addWalletListener {#implement-add-wallet-listener}

我們去中心化應用程式錢包設定的最後一個步驟是實作錢包監聽器，這樣當我們錢包的狀態改變時 (例如使用者中斷連線或切換帳戶)，我們的 UI 就會更新。

在你的 `Minter.js` 檔案中，新增一個 `addWalletListener` 函式，如下所示：

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 請在上方文字欄位中寫入一則訊息。")
      } else {
        setWallet("")
        setStatus("🦊 請使用右上角的按鈕連接到 MetaMask。")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          你必須在瀏覽器中安裝 MetaMask，一個虛擬的以太坊錢包。
        </a>
      </p>
    )
  }
}
```

讓我們趕快分析在這裡發生的事情：

- 首先，我們的函式會檢查 `window.ethereum` 是否已啟用 (即 MetaMask 已安裝)。
  - 如果沒有啟用，我們只需將 `status` 狀態變數設定為一個 JSX 字串，提示使用者安裝 MetaMask。
  - 如果已啟用，我們在第 3 行設定監聽器 `window.ethereum.on("accountsChanged")`，它會監聽 MetaMask 錢包的狀態變化，包括使用者將額外帳戶連接到去中心化應用程式、切換帳戶或中斷帳戶連線時。 如果至少有一個帳戶已連接，`walletAddress` 狀態變數會更新為監聽器回傳的 `accounts` 陣列中的第一個帳戶。 否則，`walletAddress` 會被設定為空字串。

最後，我們必須在 `useEffect` 函式中呼叫它：

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

然後就沒有然後了！ 我們已經完成了所有有關我們錢包功能的編程！ 現在我們的錢包已被設定好，讓我們探索一下這樣挖取我們的NFT吧！

## NFT 元資料入門 {#nft-metadata-101}

那麼記得我們剛才在此教程的第零步驟提到的NFT元數據 - 它把一個虛擬的NFT帶到現實生活中，容許它持有特質，像是一個電子資產、名稱、描述，還有其他屬性。

我們需要將此元資料設定為一個 JSON 物件並儲存它，這樣我們就可以在呼叫智能合約的 `mintNFT` 函式時，將它作為 `tokenURI` 參數傳入。

在欄位的文字：「往資產的連結」、「名稱」，「描述」將會由我們NFT元數據的不同特質而組成。 我們將會把這些文字整理成為一個JSON客體，但是那裡有能讓我們能夠選擇把這個客體儲存好的幾個位置：

- 我們可以把它安放在以太坊區塊鏈上；但是，這樣做的花費會非常昂貴。
- 我們可以把它儲存在一個中心化服務器上，像 AWS或Firebase。 但是那樣可能會違背我們的去中央化宗旨。
- 我們也可以使用IPFS，它是一個去中央化的規條和朋輩間的網路，讓我們在一個分配檔案系統內儲存及分享數據。 因為這個規條是去中央化和免費的，它是我們的最佳選項！

為了將我們的元資料儲存在 IPFS 上，我們將使用 [Pinata](https://pinata.cloud/)，這是一個方便的 IPFS API 和工具包。 在下一步，我們將會逐步解釋怎樣使用它！

## 使用 Pinata 將你的元資料釘選到 IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

如果你沒有 [Pinata](https://pinata.cloud/) 帳戶，請[在此](https://app.pinata.cloud/auth/signup)註冊一個免費帳戶，並完成驗證你的電子郵件和帳戶的步驟。

### 建立你的 Pinata API 金鑰 {#create-pinata-api-key}

導覽至 [https://pinata.cloud/keys](https://pinata.cloud/keys) 頁面，然後選取頂部的「New Key」按鈕，將 Admin 小工具設定為啟用，並為你的金鑰命名。

你便會看見一個彈出視窗，內有你的API資訊。 確保把這個鑰匙放在某個安全的地方。

現在我們的鑰匙被設定好了，讓我們把它添加到專案中來使用它。

### 建立一個 .env 檔案 {#create-a-env}

我們能夠在一個環境檔案中安全地儲存我們的Pinata金鑰和祕密。 讓我們在你的專案目錄中安裝 [dotenv 套件](https://www.npmjs.com/package/dotenv)。

在你的終端機中開啟一個新分頁 (與執行 local host 的分頁分開)，並確保你在 `minter-starter-files` 資料夾中，然後在終端機中執行以下指令：

```text
npm install dotenv --save
```

接下來，在你的 `minter-starter-files` 的根目錄中建立一個 `.env` 檔案，方法是在你的指令列中輸入以下內容：

```javascript
vim.env
```

這會在 vim (一個文字編輯器) 中開啟你的 `.env` 檔案。 在你的鍵盤上以這個順序來點擊按鍵「esc」+「：」+「q」進行儲存。

接下來，在 VSCode 中，導覽至你的 `.env` 檔案，並將你的 Pinata API 金鑰和 API 密鑰加入其中，如下所示：

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

儲存檔案，然後你就準備好開始為了上載自己JSON元數據到IPFS而書寫的功能了！

### 實作 pinJSONToIPFS {#pin-json-to-ipfs}

幸運的是，Pinata 有一個[專門用於將 JSON 資料上傳到 IPFS 的 API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) 和一個方便的 JavaScript 與 axios 範例，我們稍作修改即可使用。

在你的 `utils` 資料夾中，讓我們建立另一個名為 `pinata.js` 的檔案，然後從 .env 檔案匯入我們的 Pinata 密鑰和金鑰，如下所示：

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

接下來，將下面額外的程式碼貼到你的 `pinata.js` 檔案中。 不用擔心，我們將會把每個步驟都挑出來細說！

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

所以，這個程式碼到底是用來做甚麼的呢？

首先，它匯入了 [axios](https://www.npmjs.com/package/axios)，這是一個基於 promise 的 HTTP 用戶端，適用於瀏覽器和 node.js，我們將用它來向 Pinata 發出請求。

然後我們有我們的非同步函式 `pinJSONToIPFS`，它接收一個 `JSONBody` 作為其輸入，並在其標頭中包含 Pinata API 金鑰和密鑰，所有這些都是為了向他們的 `pinJSONToIPFS` API 發出 POST 請求。

- 如果這個 POST 請求成功，那麼我們的函式會回傳一個 JSON 物件，其中 `success` 布林值為 true，以及我們元資料被釘選的 `pinataUrl`。 我們將使用這個回傳的 `pinataUrl` 作為我們智能合約鑄造函式的 `tokenURI` 輸入。
- 如果此 post 請求失敗，那麼我們的函式會回傳一個 JSON 物件，其中 `success` 布林值為 false，以及一個傳達我們錯誤的 `message` 字串。

與我們的 `connectWallet` 函式回傳類型一樣，我們回傳 JSON 物件，以便我們可以使用它們的參數來更新我們的狀態變數和 UI。

## 載入你的智能合約 {#load-your-smart-contract}

既然我們有辦法透過我們的 `pinJSONToIPFS` 函式將我們的 NFT 元資料上傳到 IPFS，我們就需要一種方法來載入我們智能合約的實例，以便我們可以呼叫它的 `mintNFT` 函式。

如前所述，在本教學中，我們將使用[這個現有的 NFT 智能合約](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)；然而，如果你想學習我們是如何製作它的，或自己製作一個，我們強烈建議你查看我們的另一篇教學，["如何建立一個 NFT"](https://www.alchemy.com/docs/how-to-create-an-nft)。

### 合約 ABI {#contract-abi}

如果你仔細檢查過我們的檔案，你會注意到在我們的 `src` 目錄中，有一個 `contract-abi.json` 檔案。 為了特別註明哪一個功能會將被一份合約啟發，並且保障這個功能將會回返在你預計體裁內的數據，一個ABI是達成此目的基本條件。

我們也將會需要一個Alchemy的API鑰匙，還有Alchemy Web3的API來連結到以太坊區塊鏈，並且把我們的智慧型合約上載。

### 建立你的 Alchemy API 金鑰 {#create-alchemy-api}

如果你還沒有 Alchemy 帳戶，[請在此免費註冊](https://alchemy.com/?a=eth-org-nft-minter)。

一旦你已經創建好一個Alchemy的帳戶，你可以通過建立一個程式來生成一個API鑰匙。 這將會允許我們發送請求到Ropsten的測試網上。

在你的「Alchemy里程表」內導航至頁面「創建程式」（“Create App”）。這動作能夠透過把在導航列條內的選項「程式」懸停，並減低「創建程式」來完成。

命名你的程式。我們已經選擇好「我的最初NFT！」作為名稱，提供一個短段描述，選取「盤點」來選擇為你的程式藏書的理想環境，並選擇「Ropsten」作為你的網路。

點擊「創建程式」然後就好了！ 你的程式應該會在下列圖表中出現。

非常好，所以現在我們已經創建好我們的HTTP的Alchemy，API超連結。把它複製到你的剪貼板。。。。。。

…然後讓我們把它加到我們的 `.env` 檔案中。 好了，你的 .env檔案應該是像這個樣子的：

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

現在我們有了合約 ABI 和 Alchemy API 金鑰，我們準備好使用 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) 來載入我們的智能合約了。

### 設定你的 Alchemy Web3 端點和合約 {#setup-alchemy-endpoint}

首先，如果你還沒有安裝 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)，你需要到終端機的主目錄 `nft-minter-tutorial` 來安裝它：

```text
cd ..
npm install @alch/alchemy-web3
```

接下來讓我們回到 `interact.js` 檔案。 在檔案的頂部，新增下列程式碼從你的 .env檔案中輸入你的Alchemy金鑰，並且設定你Alchemy Web3的重點：

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) 是 [Web3.js](https://docs.web3js.org/) 的一個包裝器，提供了增強的 API 方法和其他關鍵優勢，讓你的 web3 開發者生活更輕鬆。 它是被設計成最低配置，因此你能夠在你的應用程式內馬上開始使用它！

之後，讓我們往我們的檔案裡添加我們的合約ABI以及合約地址。

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

一旦我們有以上兩者，我們已經準備好開始為挖礦功能進行編碼了！

## 實作 mintNFT 函式 {#implement-the-mintnft-function}

在你的 `interact.js` 檔案中，讓我們定義我們的函式 `mintNFT`，顧名思義，它將鑄造我們的 NFT。

因為我們將製作無數的非同步回呼 \(往Pinata釘下我們往IPFS，Alchemy Web3上載的元數據來載入我們的智慧型合約，以及MetaMask來為我們的交易簽署\)，我們的功能將同時被設定為非同步的。

我們函式的三個輸入將是我們數位資產的 `url`、`name` 和 `description`。 在 `connectWallet` 函式下方新增以下函式簽章：

```javascript
export const mintNFT = async (url, name, description) => {}
```

### 輸入錯誤處理 {#input-error-handling}

自然地，在功能開始時持有某些輸入錯誤的處理方法是合乎常理的。所以如果我們的輸入指標不正確的話，我們會離開此功能。 在我們的功能內，讓我們新增以下程式碼：

```javascript
export const mintNFT = async (url, name, description) => {
  //錯誤處理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗鑄造前請確保所有欄位都已填寫完畢。",
    }
  }
}
```

基本上，如果任何輸入參數是空字串，那麼我們會回傳一個 JSON 物件，其中 `success` 布林值為 false，而 `status` 字串則傳達我們 UI 中的所有欄位都必須填寫完整。

### 將元資料上傳至 IPFS {#upload-metadata-to-ipfs}

一旦我們知道我們的元資料格式正確，下一步就是將它包裝成一個 JSON 物件，並透過我們寫的 `pinJSONToIPFS` 將它上傳到 IPFS！

為此，我們首先需要將 `pinJSONToIPFS` 函式匯入到我們的 `interact.js` 檔案中。 在 `interact.js` 的最頂部，讓我們新增：

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

回想一下，`pinJSONToIPFS` 接收一個 JSON 主體。 所以在我們呼叫它之前，我們需要將我們的 `url`、`name` 和 `description` 參數格式化成一個 JSON 物件。

讓我們更新我們的程式碼，以建立一個名為 `metadata` 的 JSON 物件，然後使用這個 `metadata` 參數呼叫 `pinJSONToIPFS`：

```javascript
export const mintNFT = async (url, name, description) => {
  //錯誤處理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗鑄造前請確保所有欄位都已填寫完畢。",
    }
  }

  //製作元資料
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //進行 pinata 呼叫
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 上傳你的 tokenURI 時出了點問題。",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

注意，我們將對 `pinJSONToIPFS(metadata)` 的呼叫回應儲存在 `pinataResponse` 物件中。 然後，我們對這個客體進行語法分析以檢查任何可能的語法錯誤。

如果有錯誤，我們會回傳一個 JSON 物件，其中 `success` 布林值為 false，而我們的 `status` 字串則傳達我們的呼叫失敗。 否則，我們從 `pinataResponse` 中提取 `pinataURL` 並將其儲存為我們的 `tokenURI` 變數。

現在是時候使用Alchemy Web3的API來上載我們的智慧型合約。我們把它們在自家檔案的頂部進行了初始化。 將以下程式碼行新增到 `mintNFT` 函式的底部，以在 `window.contract` 全域變數上設定合約：

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

最後要加入我們 `mintNFT` 函式的是我們的以太坊交易：

```javascript
//設定你的以太坊交易
const transactionParameters = {
  to: contractAddress, // 必填，除非是合約發布。
  from: window.ethereum.selectedAddress, // 必須與使用者目前的位址相符。
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //呼叫 NFT 智能合約
}

//透過 MetaMask 簽署交易
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ 在 Etherscan 上查看你的交易：https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 出了點問題：" + error.message,
  }
}
```

如你已經對以太坊的交易很熟悉了，你將會注意到這個結構跟你以前看過的那些結構是蠻相近的。

- 首先，我們設定好我們交易的指標們。
  - `to` 指定接收方位址 (我們的智能合約)
  - `from` 指定交易的簽署者 (使用者連接到 MetaMask 的位址：`window.ethereum.selectedAddress`)
  - `data` 包含對我們智能合約 `mintNFT` 方法的呼叫，該方法接收我們的 `tokenURI` 和使用者錢包位址 `window.ethereum.selectedAddress` 作為輸入
- 然後，我們進行一個 await 呼叫 `window.ethereum.request`，我們要求 MetaMask 簽署交易。 注意，在這個請求中，我們指定了我們的 eth 方法 (eth_SentTransaction) 並傳入了我們的 `transactionParameters`。 在這時機，MetaMask將會在瀏覽器中被開啟，然後鼓勵用戶去簽署或拒絕該筆交易。
  - 如果交易成功，函式將回傳一個 JSON 物件，其中布林值 `success` 設定為 true，而 `status` 字串則提示使用者查看 Etherscan 以獲取有關其交易的更多資訊。
  - 如果交易失敗，函式將回傳一個 JSON 物件，其中 `success` 布林值設定為 false，而 `status` 字串則傳達錯誤訊息。

總而言之，我們的 `mintNFT` 函式應該看起來像這樣：

```javascript
export const mintNFT = async (url, name, description) => {
  //錯誤處理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗鑄造前請確保所有欄位都已填寫完畢。",
    }
  }

  //製作元資料
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata 釘選請求
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 上傳你的 tokenURI 時出了點問題。",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //載入智能合約
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //設定你的以太坊交易
  const transactionParameters = {
    to: contractAddress, // 必填，除非是合約發布。
    from: window.ethereum.selectedAddress, // 必須與使用者目前的位址相符。
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //呼叫 NFT 智能合約
  }

  //透過 MetaMask 簽署交易
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ 在 Etherscan 上查看你的交易：https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 出了點問題：" + error.message,
    }
  }
}
```

那是一個大型功能呀！ 現在，我們只需要將我們的 `mintNFT` 函式連接到我們的 `Minter.js` 元件...

## 將 mintNFT 連接到我們的 Minter.js 前端 {#connect-our-frontend}

打開你的 `Minter.js` 檔案，並將頂部的 `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` 行更新為：

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

最後，實作 `onMintPressed` 函式，以對你匯入的 `mintNFT` 函式進行 await 呼叫，並更新 `status` 狀態變數以反映我們的交易是成功還是失敗：

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## 將你的 NFT 部署到線上網站 {#deploy-your-NFT}

準備好實時把你的專案提供給用戶們去進行互動了嗎？ 查看[此教學](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online)以將你的鑄造器部署到線上網站。

最終一步。。。。。。

## 席捲區塊鏈世界 {#take-the-blockchain-world-by-storm}

開玩笑的，你成功堅持到教程的最終點了！

可以透過建立一個NFT挖礦者來複習。你已經成功學會怎樣：

- 通過你的前端專案連接到 MetaMask
- 在前端調用智慧型合約的方法
- 使用MetaMask簽署交易

想必你會希望能夠在錢包中展示透過你的去中心化應用程式所鑄造的 NFT——所以請務必查看我們的快速教學 [如何在你的錢包中查看你的 NFT](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)！

一如既往，如果你有任何問題，我們會在 [Alchemy Discord](https://discord.gg/gWuC7zB) 提供協助。 我們不能更迫切地看見你是怎樣運用此篇教程的概念來建立自己在不遠未來的專案們了！
