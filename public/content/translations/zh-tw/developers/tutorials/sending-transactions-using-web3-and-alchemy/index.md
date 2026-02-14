---
title: "使用 Web3 發送交易"
description: "這是一份初學者友善指南，說明如何使用 Web3 發送以太坊交易。 將交易發送到以太坊區塊鏈有三個主要步驟：建立、簽署和廣播。 我們將會逐一說明。"
author: "Elan Halpern"
tags: [ "交易", "web3.js", "alchemy" ]
skill: beginner
lang: zh-tw
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

這是一份初學者友善指南，說明如何使用 Web3 發送以太坊交易。 將交易發送到以太坊區塊鏈有三個主要步驟：建立、簽署和廣播。 我們將逐一說明這三個步驟，希望能解答您可能有的任何問題！ 在本教學中，我們將使用 [Alchemy](https://www.alchemy.com/) 將交易發送到以太坊鏈。 您可以在[此處建立免費的 Alchemy 帳戶](https://auth.alchemyapi.io/signup)。

\*\*注意：\*\*本指南適用於在您應用程式的_後端_簽署交易。 如果您想在前端整合簽署交易，請參閱[整合 Web3 與瀏覽器供應商](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider)。

## 基本知識 {#the-basics}

和大多數初入門的區塊鏈開發人員一樣，您可能已經研究過如何發送交易（這應該是件很簡單的事），卻看到一大堆指南，每個指南的說法都不一樣，讓您有點不知所措和困惑。 如果您也遇到這種情況，別擔心，我們都曾有過同樣的經歷！ 那麼，在開始之前，讓我們先釐清幾件事：

### 1. Alchemy 不會儲存您的私密金鑰 {#alchemy-does-not-store-your-private-keys}

- 這表示 Alchemy 無法代表您簽署和發送交易。 這是出於安全考量。 Alchemy 絕不會要求您分享您的私密金鑰，您也絕不應該將您的私密金鑰與託管節點（或任何人）分享。
- 您可以使用 Alchemy 的核心 API 從區塊鏈讀取資料，但要寫入資料，您需要在透過 Alchemy 發送交易前，使用其他工具簽署交易（這適用於任何其他[節點服務](/developers/docs/nodes-and-clients/nodes-as-a-service/)）。

### 2. 什麼是「簽署者」？ {#what-is-a-signer}

- 簽署者會使用您的私密金鑰為您簽署交易。 在本教學中，我們將使用 [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) 來簽署我們的交易，但您也可以使用任何其他 web3 函式庫。
- 在前端，[MetaMask](https://metamask.io/) 就是一個簽署者的好例子，它會代表您簽署並發送交易。

### 3. 為什麼我需要簽署我的交易？ {#why-do-i-need-to-sign-my-transactions}

- 每位想在以太坊網路上發送交易的使用者都必須簽署該交易（使用他們的私密金鑰），以驗證交易的來源確實是其所聲稱的發送者。
- 保護此私密金鑰極為重要，因為擁有它就等於完全控制您的以太坊帳戶，讓您（或任何有權存取的人）能代表您執行交易。

### 4. 我該如何保護我的私密金鑰？ {#how-do-i-protect-my-private-key}

- 保護您的私密金鑰並用它來發送交易的方法有很多種。 在本教學中，我們將使用一個 `.env` 檔案。 然而，您也可以使用儲存私密金鑰的獨立供應商、使用金鑰儲存檔案或其他選項。

### 5. `eth_sendTransaction` 和 `eth_sendRawTransaction` 之間有什麼區別？ {#difference-between-send-and-send-raw}

`eth_sendTransaction` 和 `eth_sendRawTransaction` 都是以太坊 API 函式，可將交易廣播到以太坊網路，以便將其新增到未來的區塊中。 它們的不同之處在於處理交易簽署的方式。

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) 用於發送_未簽署_的交易，這表示您發送到的節點必須管理您的私密金鑰，才能在將交易廣播到鏈上之前對其進行簽署。 由於 Alchemy 不持有使用者的私密金鑰，因此不支援此方法。
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) 用於廣播已經簽署的交易。 這表示您必須先使用 [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction)，然後將結果傳遞到 `eth_sendRawTransaction` 中。

使用 web3 時，可透過呼叫 [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) 函式來存取 `eth_sendRawTransaction`。

這就是我們將在本教學中使用的內容。

### 6. 什麼是 web3 函式庫？ {#what-is-the-web3-library}

- Web3.js 是一個標準 JSON-RPC 呼叫的包裝函式庫，在以太坊開發中相當常用。
- 有許多針對不同語言的 web3 函式庫。 在本教學中，我們將使用以 JavaScript 編寫的 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)。 您可以[在此處](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)查看其他選項，例如 [ethers.js](https://docs.ethers.org/v5/)。

好了，既然我們已經解決了這些問題，就讓我們繼續進行教學吧。 隨時歡迎在 Alchemy [Discord](https://discord.gg/gWuC7zB) 中提問！

### 7. 如何發送安全、燃料優化和私密的交易？ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy 有一套 Transact API](https://docs.alchemy.com/reference/transact-api-quickstart)。 您可以使用這些 API 來發送增強型交易、在交易發生前進行模擬、發送私密交易，以及發送燃料優化的交易。
- 您也可以使用 [Notify API](https://docs.alchemy.com/docs/alchemy-notify) 在您的交易從記憶體池中取出並新增到鏈上時收到提醒。

\*\*注意：\*\*本指南需要一個 Alchemy 帳戶、一個以太坊地址或 MetaMask 錢包，並安裝 NodeJs 和 npm。 如果沒有，請按照以下步驟操作：

1. [建立免費的 Alchemy 帳戶](https://auth.alchemyapi.io/signup)
2. [建立 MetaMask 帳戶](https://metamask.io/)（或取得一個以太坊地址）
3. [按照這些步驟安裝 NodeJs 和 NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## 發送交易的步驟 {#steps-to-sending-your-transaction}

### 1. 在 Sepolia 測試網上建立一個 Alchemy 應用程式 {#create-an-alchemy-app-on-the-sepolia-testnet}

前往您的 [Alchemy 儀表板](https://dashboard.alchemyapi.io/) 並建立一個新應用程式，為您的網路選擇 Sepolia（或任何其他測試網）。

### 2. 從 Sepolia 水龍頭請求 ETH {#request-eth-from-sepolia-faucet}

按照 [Alchemy Sepolia 水龍頭](https://www.sepoliafaucet.com/) 上的說明接收 ETH。 請務必提供您的 **Sepolia** 以太坊地址（來自 MetaMask），而不是其他網路的地址。 按照說明操作後，請再次檢查您的錢包是否已收到 ETH。

### 3. 建立一個新專案目錄並 `cd` 進入 {#create-a-new-project-direction}

從命令列（macs 為終端機）建立一個新專案目錄並進入其中：

```
mkdir sendtx-example
cd sendtx-example
```

### 4. 安裝 Alchemy Web3（或任何 web3 函式庫） {#install-alchemy-web3}

在您的專案目錄中執行以下指令來安裝 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)：

注意，如果您想使用 ethers.js 函式庫，請[按照此處的說明操作](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum)。

```
npm install @alch/alchemy-web3
```

### 5. 安裝 dotenv {#install-dotenv}

我們將使用一個 `.env` 檔案來安全地儲存我們的 API 金鑰和私密金鑰。

```
npm install dotenv --save
```

### 6. 建立 `.env` 檔案 {#create-the-dotenv-file}

在您的專案目錄中建立一個 `.env` 檔案並新增以下內容（取代「`your-api-url`」和「`your-private-key`」）

- 若要尋找您的 Alchemy API URL，請前往您儀表板上剛建立的應用程式的詳細資料頁面，點擊右上角的「View Key」，然後複製 HTTP URL。
- 若要使用 MetaMask 尋找您的私密金鑰，請參閱本[指南](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)。

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
不要提交 <code>.env</code>！ 請務必不要與任何人分享或洩露您的 <code>.env</code> 檔案，因為這樣做會洩露您的機密。 如果您正在使用版本控制，請將您的 <code>.env</code> 新增到 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 檔案中。
</AlertDescription>
</AlertContent>
</Alert>

### 7. 建立 `sendTx.js` 檔案 {#create-sendtx-js}

太好了，既然我們的敏感資料已在 `.env` 檔案中受到保護，就讓我們開始編寫程式碼吧。 在我們的發送交易範例中，我們會將 ETH 發送回 Sepolia 水龍頭。

建立一個 `sendTx.js` 檔案，我們將在其中設定並發送我們的範例交易，然後將以下程式碼行新增到該檔案中：

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //待辦事項：將此地址替換為您自己的公開地址

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce 從 0 開始計數

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // 用於返還 eth 的水龍頭地址
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // 可選的資料欄位，用於發送訊息或執行智能合約
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 您的交易哈希為： ", hash, "\n 請到 Alchemy 的記憶體池查看您的交易狀態！");
    } else {
      console.log("❗提交交易時出錯：", error)
    }
   });
}

main();
```

請務必將**第 6 行**的地址替換為您自己的公開地址。

現在，在我們開始執行這段程式碼之前，讓我們先談談這裡的一些組成部分。

- `nonce`：nonce 規範用於追蹤從您的地址發送的交易數量。 我們需要它來確保安全並防止[重放攻擊](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)。 為了取得從您的地址發送的交易數量，我們使用 [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)。
- `transaction`：交易物件有幾個我們需要指定的方面
  - `to`：這是我們要發送 ETH 的目標地址。 在這種情況下，我們是將 ETH 發送回我們最初請求的 [Sepolia 水龍頭](https://sepoliafaucet.com/)。
  - `value`：這是我們希望發送的金額，以 Wei 為單位，其中 10^18 Wei = 1 ETH
  - `gas`：有很多方法可以決定交易中要包含的正確燃料數量。 Alchemy 甚至有一個[燃料價格 webhook](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1)，可以在燃料價格降至特定閾值時通知您。 對於主網交易，最好檢查像 [ETH Gas Station](https://ethgasstation.info/) 這樣的燃料估算器，以確定要包含的正確燃料數量。 21000 是以太坊上一次操作將使用的最低燃料量，因此為了確保我們的交易能夠執行，我們在此設定為 30000。
  - `nonce`：請參見上面的 nonce 定義。 Nonce 從零開始計數。
  - [可選] data：用於在您的轉帳中發送附加資訊，或呼叫智能合約，餘額轉帳非必要，請參閱下面的說明。
- `signedTx`：為了簽署我們的交易物件，我們將使用 `signTransaction` 方法和我們的 `PRIVATE_KEY`
- `sendSignedTransaction`：一旦我們有了已簽署的交易，就可以使用 `sendSignedTransaction` 將其發送出去，以便包含在後續的區塊中

**關於 data 的說明**
在以太坊中可以發送兩種主要類型的交易。

- 餘額轉帳：將 ETH 從一個地址發送到另一個地址。 不需要 data 欄位，但是，如果您想在交易中附帶額外資訊，可以在此欄位中以 HEX 格式包含該資訊。
  - 例如，假設我們想將 IPFS 文件的哈希寫入以太坊鏈，以便為其提供一個不可變的時間戳。 我們的 data 欄位看起來就會像這樣：`web3.utils.toHex(‘IPFS 哈希‘)`。 現在任何人都可以查詢鏈，查看該文件是何時新增的。
- 智能合約交易：在鏈上執行一些智能合約程式碼。 在這種情況下，data 欄位應包含您希望執行的智能函式以及任何參數。
  - 如需實際範例，請參閱此 [Hello World 教學](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction)中的步驟 8。

### 8. 使用 `node sendTx.js` 執行程式碼 {#run-the-code-using-node-sendtx-js}

返回您的終端機或命令列並執行：

```
node sendTx.js
```

### 9. 在記憶體池中查看您的交易 {#see-your-transaction-in-the-mempool}

在您的 Alchemy 儀表板中開啟[記憶體池頁面](https://dashboard.alchemyapi.io/mempool)，並按您建立的應用程式進行篩選以尋找您的交易。 在這裡，我們可以看到我們的交易從待處理狀態轉換為已探勘狀態（如果成功）或已丟棄狀態（如果不成功）。 請務必將其保持在「全部」狀態，以便捕獲「已探勘」、「待處理」和「已丟棄」的交易。 您也可以透過搜尋發送到地址 `0x31b98d14007bdee637298086988a0bbd31184523` 的交易來尋找您的交易。

找到交易後，若要查看其詳細資訊，請選擇交易哈希，這會將您帶到如下所示的檢視畫面：

![記憶體池觀察器螢幕截圖](./mempool.png)

從那裡，您可以點擊紅色圈出的圖示，在 Etherscan 上查看您的交易！

**太棒了！ 您剛剛使用 Alchemy 發送了您的第一筆以太坊交易 🎉**

_若對本指南有任何回饋與建議，請在 Alchemy 的 [Discord](https://discord.gg/A39JVCM) 上傳送訊息給 Elan！_

_原文發表於 [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
