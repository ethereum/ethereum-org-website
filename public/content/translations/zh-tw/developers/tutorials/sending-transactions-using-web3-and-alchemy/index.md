---
title: 使用 Web3 發送交易
description: "這是一篇適合初學者的指南，介紹如何使用 Web3 發送以太坊交易。將交易發送到以太坊區塊鏈主要有三個步驟：建立、簽署和廣播。我們將逐一介紹這三個步驟。"
author: "埃蘭·哈爾彭"
tags: ["交易", "web3.js", "alchemy"]
skill: beginner
breadcrumb: 發送交易
lang: zh-tw
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

這是一篇適合初學者的指南，介紹如何使用 Web3 發送以太坊交易。將交易發送到以太坊區塊鏈主要有三個步驟：建立、簽署和廣播。我們將逐一介紹這三個步驟，希望能解答您的任何疑問！在本教學中，我們將使用 [Alchemy](https://www.alchemy.com/) 將我們的交易發送到以太坊鏈。您可以[在此建立免費的 Alchemy 帳戶](https://auth.alchemyapi.io/signup)。

**注意：** 本指南適用於在應用程式的_後端_簽署交易。如果您想在前端整合交易簽署，請查看整合 [Web3 與瀏覽器提供者](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider)。

## 基礎知識 {#the-basics}

就像大多數剛起步的區塊鏈開發人員一樣，您可能已經對如何發送交易（這應該是一件非常簡單的事情）做了一些研究，並遇到了大量的指南，每篇指南的說法都不盡相同，讓您感到有些不知所措和困惑。如果您正處於這種情況，請不要擔心；我們都曾有過這樣的經歷！因此，在我們開始之前，讓我們先釐清幾件事：

### 1\. Alchemy 不會儲存您的私鑰 {#alchemy-does-not-store-your-private-keys}

- 這意味著 Alchemy 無法代表您簽署和發送交易。這樣做是出於安全考量。Alchemy 永遠不會要求您分享您的私鑰，您也絕對不應該與託管節點（或任何人）分享您的私鑰。
- 您可以使用 Alchemy 的核心 API 從區塊鏈讀取資料，但要寫入資料，您需要使用其他工具來簽署交易，然後再透過 Alchemy 發送（這對於任何其他[節點服務](/developers/docs/nodes-and-clients/nodes-as-a-service/)也是一樣的）。

### 2\. 什麼是「簽署者」？ {#what-is-a-signer}

- 簽署者將使用您的私鑰為您簽署交易。在本教學中，我們將使用 [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) 來簽署我們的交易，但您也可以使用任何其他 Web3 函式庫。
- 在前端，一個很好的簽署者範例是 [梅塔馬斯克 (MetaMask)](https://metamask.io/)，它將代表您簽署並發送交易。

### 3\. 為什麼我需要簽署我的交易？ {#why-do-i-need-to-sign-my-transactions}

- 每個想要在以太坊網路上發送交易的使用者都必須簽署交易（使用他們的私鑰），以驗證交易的來源是否如其所稱。
- 保護這個私鑰非常重要，因為擁有它的存取權限就等於擁有對您以太坊帳戶的完全控制權，允許您（或任何擁有存取權限的人）代表您執行交易。

### 4\. 我該如何保護我的私鑰？ {#how-do-i-protect-my-private-key}

- 有許多方法可以保護您的私鑰並使用它來發送交易。在本教學中，我們將使用 `.env` 檔案。不過，您也可以使用儲存私鑰的獨立提供者、使用金鑰庫檔案或其他選項。

### 5\. `eth_sendTransaction` 和 `eth_sendRawTransaction` 之間有什麼區別？ {#difference-between-send-and-send-raw}

`eth_sendTransaction` 和 `eth_sendRawTransaction` 都是以太坊 API 函數，它們將交易廣播到以太坊網路，以便將其新增到未來的區塊中。它們的區別在於處理交易簽署的方式。

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) 用於發送_未簽署_的交易，這意味著您發送到的節點必須管理您的私鑰，以便在將交易廣播到鏈上之前對其進行簽署。由於 Alchemy 不持有使用者的私鑰，因此他們不支援此方法。
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) 用於廣播已經簽署的交易。這意味著您必須先使用 [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction)，然後將結果傳遞給 `eth_sendRawTransaction`。

使用 Web3 時，可以透過呼叫 [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) 函數來存取 `eth_sendRawTransaction`。

這就是我們在本教學中將要使用的內容。

### 6\. 什麼是 Web3 函式庫？ {#what-is-the-web3-library}

- Web3.js 是一個圍繞標準 JSON-RPC 呼叫的包裝函式庫，在以太坊開發中非常常見。
- 有許多適用於不同語言的 Web3 函式庫。在本教學中，我們將使用以 JavaScript 編寫的 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)。您可以[在此處](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)查看其他選項，例如 [Ethers.js](https://docs.ethers.org/v5/)。

好了，現在我們已經解決了其中幾個問題，讓我們繼續進行教學。歡迎隨時在 Alchemy 的 [Discord](https://discord.gg/gWuC7zB) 中提問！

### 7\. 如何發送安全、燃料最佳化且私密的交易？ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy 提供了一套 Transact API](https://docs.alchemy.com/reference/transact-api-quickstart)。您可以使用這些 API 發送強化的交易、在交易發生前進行模擬、發送私密交易以及發送燃料最佳化的交易。
- 您還可以使用 [Notify API](https://docs.alchemy.com/docs/alchemy-notify)，在您的交易從記憶體池中被提取並新增到鏈上時收到警報。

**注意：** 本指南需要一個 Alchemy 帳戶、一個以太坊地址或梅塔馬斯克 (MetaMask) 錢包，並安裝 Node.js 和 npm。如果沒有，請按照以下步驟操作：

1.  [建立免費的 Alchemy 帳戶](https://auth.alchemyapi.io/signup)
2.  [建立 MetaMask 帳戶](https://metamask.io/)（或取得一個以太坊地址）
3.  [按照這些步驟安裝 Node.js 和 NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## 發送交易的步驟 {#steps-to-sending-your-transaction}

### 1\. 在 Sepolia 測試網上建立 Alchemy 應用程式 {#create-an-alchemy-app-on-the-sepolia-testnet}

導覽至您的 [Alchemy 儀表板](https://dashboard.alchemyapi.io/)並建立一個新的應用程式，為您的網路選擇 Sepolia（或任何其他測試網）。

### 2\. 從 Sepolia 水龍頭請求 ETH {#request-eth-from-sepolia-faucet}

按照 [Alchemy Sepolia 水龍頭](https://www.sepoliafaucet.com/)上的指示接收 ETH。請確保包含您的 **Sepolia** 以太坊地址（來自 MetaMask），而不是其他網路。按照指示操作後，請再次確認您已在錢包中收到 ETH。

### 3\. 建立一個新的專案目錄並 `cd` 進入該目錄 {#create-a-new-project-direction}

從命令列（Mac 的終端機）建立一個新的專案目錄並導覽進入：

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. 安裝 Alchemy Web3（或任何 Web3 函式庫） {#install-alchemy-web3}

在您的專案目錄中執行以下命令以安裝 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)：

請注意，如果您想使用 Ethers.js 函式庫，請[按照此處的指示操作](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum)。

```
npm install @alch/alchemy-web3
```

### 5\. 安裝 dotenv {#install-dotenv}

我們將使用 `.env` 檔案來安全地儲存我們的 API 金鑰和私鑰。

```
npm install dotenv --save
```

### 6\. 建立 `.env` 檔案 {#create-the-dotenv-file}

在您的專案目錄中建立一個 `.env` 檔案並新增以下內容（替換「`your-api-url`」和「`your-private-key`」）

- 要尋找您的 Alchemy API URL，請導覽至您剛在儀表板上建立的應用程式的詳細資料頁面，點擊右上角的「View Key」，然後複製 HTTP URL。
- 要使用 MetaMask 尋找您的私鑰，請查看此[指南](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)。

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
不要提交 <code>.env</code>！請確保永遠不要與任何人分享或暴露您的 <code>.env</code> 檔案，因為這樣做會危及您的機密。如果您正在使用版本控制，請將您的 <code>.env</code> 新增到 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 檔案中。
</AlertDescription>
</AlertContent>
</Alert>

### 7\. 建立 `sendTx.js` 檔案 {#create-sendtx-js}

太好了，現在我們已經將敏感資料保護在 `.env` 檔案中，讓我們開始編寫程式碼。在我們的發送交易範例中，我們將把 ETH 發送回 Sepolia 水龍頭。

建立一個 `sendTx.js` 檔案，我們將在其中設定並發送我們的範例交易，並在其中新增以下程式碼：

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //待辦事項：將此地址替換為您自己的公開地址

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // 隨機數從 0 開始計算

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // 退還 ETH 的水龍頭地址
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // 用於發送訊息或執行智能合約的選用資料欄位
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 您的交易雜湊為：", hash, "\n 檢查 Alchemy 的記憶體池以查看您的交易狀態！");
    } else {
      console.log("❗提交您的交易時發生錯誤：", error)
    }
   });
}

main();
```

請務必將**第 6 行**的地址替換為您自己的公開地址。

現在，在我們開始執行這段程式碼之前，讓我們先談談這裡的一些元件。

- `nonce`：隨機數規範用於追蹤從您的地址發送的交易數量。出於安全考量以及防止[重放攻擊](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)，我們需要這個值。為了取得從您的地址發送的交易數量，我們使用 [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)。
- `transaction`：交易物件有幾個我們需要指定的方面
  - `to`：這是我們想要發送 ETH 的目標地址。在這種情況下，我們將 ETH 發送回我們最初請求的 [Sepolia 水龍頭](https://sepoliafaucet.com/)。
  - `value`：這是我們希望發送的金額，以 Wei 為單位指定，其中 10^18 Wei = 1 ETH
  - `gas`：有許多方法可以決定交易中應包含的正確燃料量。Alchemy 甚至有一個 [Gas 價格 webhook](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1)，可以在 Gas 價格降至特定閾值內時通知您。對於主網交易，一個好的做法是檢查像 [ETH Gas Station](https://ethgasstation.info/) 這樣的燃料估算器，以決定要包含的正確燃料量。21000 是以太坊上操作將使用的最小燃料量，因此為了確保我們的交易將被執行，我們在這裡填入 30000。
  - `nonce`：請參閱上述隨機數定義。隨機數從零開始計算。
  - [選用] data：用於在轉帳時發送額外資訊，或呼叫智能合約，餘額轉帳不需要此欄位，請查看下方注意事項。
- `signedTx`：為了簽署我們的交易物件，我們將使用 `signTransaction` 方法和我們的 `PRIVATE_KEY`
- `sendSignedTransaction`：一旦我們有了已簽署的交易，我們就可以使用 `sendSignedTransaction` 將其發送出去，以便包含在後續的區塊中

**關於 data 的注意事項**
在以太坊中可以發送兩種主要類型的交易。

- 餘額轉帳：將 ETH 從一個地址發送到另一個地址。不需要 data 欄位，但是，如果您想在交易中發送額外資訊，您可以在此欄位中以 HEX 格式包含該資訊。
  - 例如，假設我們想將 IPFS 文件的雜湊寫入以太坊鏈，以便為其提供不可變的時間戳記。那麼我們的 data 欄位應該看起來像 data: `web3.utils.toHex(‘IPFS hash‘)`。現在任何人都可以查詢該鏈並查看該文件是何時新增的。
- 智能合約交易：在鏈上執行一些智能合約程式碼。在這種情況下，data 欄位應包含您希望執行的智能函數以及任何參數。
  - 如需實際範例，請查看此 [Hello World 教學](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction)中的步驟 8。

### 8\. 使用 `node sendTx.js` 執行程式碼 {#run-the-code-using-node-sendtx-js}

導覽回您的終端機或命令列並執行：

```
node sendTx.js
```

### 9\. 在記憶體池中查看您的交易 {#see-your-transaction-in-the-mempool}

開啟 Alchemy 儀表板中的[記憶體池頁面](https://dashboard.alchemyapi.io/mempool)，並按您建立的應用程式進行篩選以尋找您的交易。在這裡，我們可以觀察我們的交易從待處理狀態轉換為已挖礦狀態（如果成功）或已丟棄狀態（如果不成功）。請確保將其保持在「All」，以便您擷取「已挖礦」、「待處理」和「已丟棄」的交易。您也可以透過尋找發送到地址 `0x31b98d14007bdee637298086988a0bbd31184523` 的交易來搜尋您的交易。

找到交易後，若要查看其詳細資料，請選擇交易雜湊，這將帶您進入如下所示的檢視畫面：

![Mempool watcher screenshot](./mempool.png)

從那裡，您可以透過點擊紅色圓圈標示的圖示，在 Etherscan 上查看您的交易！

**太棒了！您剛剛使用 Alchemy 發送了您的第一筆以太坊交易 🎉**

_如對本指南有任何回饋和建議，請在 Alchemy 的 [Discord](https://discord.gg/A39JVCM) 上傳送訊息給 Elan！_

_最初發布於 [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_