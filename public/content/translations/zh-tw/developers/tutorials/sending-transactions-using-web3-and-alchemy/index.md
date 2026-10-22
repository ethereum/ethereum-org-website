---
title: "使用 viem 發送交易"
description: "這是一篇適合初學者的指南，介紹如何使用 viem 函式庫發送以太坊交易。要將交易發送到以太坊區塊鏈，主要有三個步驟：建立、簽署和廣播。我們將逐一介紹這三個步驟。"
author: "埃蘭·哈爾彭"
tags: ["交易", "viem", "Alchemy"]
skill: beginner
breadcrumb: "發送交易"
lang: zh-tw
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

這是一篇適合初學者的指南，介紹如何使用 [viem](https://viem.sh/) 函式庫發送以太坊交易。要將交易發送到以太坊區塊鏈，主要有三個步驟：建立、簽署和廣播。我們將逐一介紹這三個步驟，希望能解答您的任何疑問！在本教學中，我們將使用 [Alchemy](https://www.alchemy.com/) 將我們的交易發送到以太坊鏈。您可以[在此建立免費的 Alchemy 帳戶](https://auth.alchemy.com/signup)。

**注意：** 本指南適用於在應用程式的_後端_簽署交易。如果您想在前端整合交易簽署，請查看 [梅塔馬斯克提供者 API (MetaMask provider API)](https://docs.metamask.io/wallet/reference/provider-api/)。

## 基礎知識 {#the-basics}

就像大多數剛起步的區塊鏈開發人員一樣，您可能已經對如何發送交易（這應該是一件非常簡單的事情）做了一些研究，並遇到了大量的指南，每篇指南的說法都不盡相同，讓您感到有些不知所措和困惑。如果您正處於這種情況，請不要擔心；我們都曾有過這樣的經歷！因此，在我們開始之前，讓我們先釐清幾件事：

### 1\. Alchemy 不會儲存您的私鑰 {#alchemy-does-not-store-your-private-keys}

- 這意味著 Alchemy 無法代表您簽署和發送交易。這樣做是出於安全考量。Alchemy 永遠不會要求您分享您的私鑰，您也絕對不應該與託管節點（或任何人）分享您的私鑰。
- 您可以使用 Alchemy 的核心 API 從區塊鏈讀取資料，但要寫入資料，您需要使用其他工具來簽署交易，然後再透過 Alchemy 發送（這對於任何其他[節點服務](/developers/docs/nodes-and-clients/nodes-as-a-service/)也是一樣的）。

### 2\. 什麼是「簽署者 (signer)」？ {#what-is-a-signer}

- 簽署者將使用您的私鑰為您簽署交易。在本教學中，我們將使用 [viem](https://viem.sh/) 來簽署我們的交易，但您也可以使用任何其他 Web3 函式庫。
- 在前端，簽署者的一個好例子是 [梅塔馬斯克](https://metamask.io/)，它將代表您簽署並發送交易。

### 3\. 為什麼我需要簽署我的交易？ {#why-do-i-need-to-sign-my-transactions}

- 每個想要在以太坊網路上發送交易的使用者都必須簽署交易（使用他們的私鑰），以驗證交易的來源是否如其所稱。
- 保護這個私鑰非常重要，因為擁有它的存取權限就等於擁有對您以太坊帳戶的完全控制權，允許您（或任何擁有存取權限的人）代表您執行交易。

### 4\. 我該如何保護我的私鑰？ {#how-do-i-protect-my-private-key}

- 有許多方法可以保護您的私鑰並使用它來發送交易。在本教學中，我們將使用 `.env` 檔案。不過，您也可以使用儲存私鑰的獨立提供者、使用金鑰庫檔案或其他選項。

### 5\. `eth_sendTransaction` 和 `eth_sendRawTransaction` 之間有什麼區別？ {#difference-between-send-and-send-raw}

`eth_sendTransaction` 和 `eth_sendRawTransaction` 都是以太坊 API 函式，用於將交易廣播到以太坊網路，以便將其新增到未來的區塊中。它們的區別在於處理交易簽署的方式。

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) 用於發送_未簽署_的交易，這意味著您發送到的節點必須管理您的私鑰，以便在將交易廣播到鏈上之前對其進行簽署。由於 Alchemy 不會持有使用者的私鑰，因此他們不支援此方法。
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) 用於廣播已經簽署的交易。這意味著您必須先使用您的私鑰簽署交易（在 viem 中，使用 [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) 和[本機帳戶](https://viem.sh/docs/accounts/local/privateKeyToAccount)），然後將結果傳遞給 `eth_sendRawTransaction`。

使用 viem 時，可以透過呼叫 [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction) 函式來存取 `eth_sendRawTransaction`。

這就是我們在本教學中將要使用的方法。

### 6\. 什麼是 Web3 函式庫？ {#what-is-the-web3-library}

- Web3 函式庫是標準 [JSON-RPC 呼叫](/developers/docs/apis/json-rpc/)的包裝器，在以太坊開發中非常常見。
- 有許多適用於不同語言的 Web3 函式庫。在本教學中，我們將使用 [viem](https://viem.sh/)，它是用 TypeScript 編寫的，並且可以在任何 JavaScript 專案中運作。您可以在[此處](/developers/docs/apis/javascript/)查看其他選項，例如 [ethers.js](https://docs.ethers.org/v6/)。

好了，既然我們已經解決了其中一些問題，讓我們繼續進行教學。歡迎隨時在 Alchemy 的 [Discord](https://discord.gg/gWuC7zB) 中提問！

### 7\. 如何發送安全、燃料最佳化且私密的交易？ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy 提供了一系列交易資源](https://www.alchemy.com/docs/sending-transactions)。您可以使用這些資源來發送交易、在交易發生前進行模擬、發送私密交易，以及發送燃料最佳化的交易。
- 您還可以使用 [Alchemy webhooks](https://www.alchemy.com/docs/reference/webhooks-overview)，在您的交易從記憶體池中被提取並新增到鏈上時收到警報。

**注意：** 本指南需要一個 Alchemy 帳戶、一個以太坊地址或梅塔馬斯克錢包，並安裝 Node.js 和 npm。如果沒有，請按照以下步驟操作：

1.  [建立免費的 Alchemy 帳戶](https://auth.alchemy.com/signup)
2.  [建立梅塔馬斯克帳戶](https://metamask.io/)（或取得一個以太坊地址）
3.  [安裝 Node.js 和 npm](https://nodejs.org/en/download/)
## 發送交易的步驟 {#steps-to-sending-your-transaction}

### 1\. 在 Sepolia 測試網上建立 Alchemy 應用程式 {#create-an-alchemy-app-on-the-sepolia-testnet}

導覽至您的 [Alchemy 儀表板](https://dashboard.alchemy.com/)並建立一個新的應用程式，為您的網路選擇 Sepolia（或任何其他測試網）。

### 2\. 從 Sepolia 水龍頭請求 ETH {#request-eth-from-sepolia-faucet}

按照 [Alchemy Sepolia 水龍頭](https://www.alchemy.com/faucets/ethereum-sepolia)上的指示接收 ETH，或使用其他 [Sepolia 水龍頭](/developers/docs/networks/#sepolia)之一。水龍頭會發放少量資金（Alchemy 水龍頭每天發放 0.1 ETH），這對於本教學來說已經足夠了。請確保包含您的 **Sepolia** 以太坊地址（來自梅塔馬斯克），而不是其他網路。按照指示操作後，請仔細檢查您是否已在錢包中收到 ETH。

### 3\. 建立一個新的專案目錄並 `cd` 進入該目錄 {#create-a-new-project-direction}

從命令列（Mac 的終端機）建立一個新的專案目錄並導覽進入：

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. 安裝 viem（或任何 Web3 函式庫） {#install-alchemy-web3}

在您的專案目錄中執行以下命令來安裝 [viem](https://viem.sh/)：

請注意，如果您想使用 ethers.js 函式庫，請[按照此處的指示操作](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum)。

```sh
npm init -y
npm install viem
```

### 5\. 安裝 dotenv {#install-dotenv}

我們將使用 `.env` 檔案來安全地儲存我們的 API 金鑰和私鑰。

```
npm install dotenv --save
```

### 6\. 建立 `.env` 檔案 {#create-the-dotenv-file}

在您的專案目錄中建立一個 `.env` 檔案並新增以下內容（替換「`your-api-url`」和「`your-private-key`」）

- 要尋找您的 Alchemy API URL，請導覽至您剛剛在儀表板上建立的應用程式的詳細資訊頁面，點擊右上角的「View Key」，然後獲取 HTTP URL。
- 要使用梅塔馬斯克尋找您的私鑰，請查看此[指南](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)。請使用僅持有測試網 ETH 的帳戶。

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
請勿提交 <code>.env</code> 檔案！請確保永遠不要與任何人分享或暴露您的 <code>.env</code> 檔案，因為這樣做會危及您的機密資訊。如果您正在使用版本控制，請將您的 <code>.env</code> 新增到 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 檔案中。
</AlertDescription>
</AlertContent>
</Alert>

### 7\. 建立 `sendTx.js` 檔案 {#create-sendtx-js}

太好了，現在我們已經將敏感資料保護在 `.env` 檔案中，讓我們開始編寫程式碼。在我們的發送交易範例中，我們將發送 0.001 ETH 到您控制的另一個地址，例如梅塔馬斯克中的第二個帳戶。

建立一個 `sendTx.js` 檔案，我們將在其中設定並發送我們的範例交易，並在其中新增以下程式碼：

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // 隨機數從 0 開始計算

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: 替換為您想要發送 ETH 的地址
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // 用於發送訊息或執行智能合約的可選資料欄位
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

請務必將 `0xYourSecondAddress` 替換為您想要發送 ETH 的地址。該腳本會從 `PRIVATE_KEY` 衍生出您自己的（發送）地址，因此您不需要輸入它。

現在，在我們開始執行這段程式碼之前，讓我們先談談這裡的一些元件。

- `account`：使用 [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) 從您的私鑰建立的本機帳戶。簽署會在您的機器上進行，私鑰永遠不會發送給 Alchemy。
- `publicClient` 和 `walletClient`：向您的 Alchemy URL 發送 JSON-RPC 請求的 viem 客戶端。公共客戶端從鏈上讀取資料，而錢包客戶端則為您的帳戶準備並簽署交易。
- `nonce`：隨機數規範用於追蹤從您的地址發送的交易數量。出於安全考量和防止重放攻擊，我們需要這個值。要獲取從您的地址發送的交易數量，我們使用 [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count)。viem 也會為您填寫此資訊，但我們在此處明確擷取它以顯示其來源。
- `transaction`：交易物件有一些我們需要指定的屬性。[`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) 會根據目前的網路狀況為我們填寫其餘部分，包括 `chainId` 以及 [EIP-1559](/developers/docs/gas/) 費用欄位 `maxFeePerGas` 和 `maxPriorityFeePerGas`。
  - `to`：這是我們想要發送 ETH 的地址。
  - `value`：這是我們希望發送的金額，以 Wei 為單位指定，其中 10^18 Wei = 1 ETH。[`parseEther`](https://viem.sh/docs/utilities/parseEther) 會為我們將 ETH 金額轉換為 Wei。您的帳戶需要比這多一點的資金，因為它還需要支付燃料費用。
  - `gas`：有許多方法可以決定交易中應包含的正確燃料量。Alchemy 支援 [webhooks](https://www.alchemy.com/docs/reference/webhooks-overview)，可以通知您有關鏈上活動的資訊。對於主網交易，良好的做法是檢查目前的燃料狀況，以決定要包含的正確燃料量。向普通地址進行單純的 ETH 轉帳總是精確消耗 21000 燃料，這是任何交易的最低要求，因此我們在這裡填入 21000。如果您省略 `gas`，viem 會為您估算。
  - `nonce`：請參閱上述隨機數定義。隨機數從零開始計數。
  - [選填] data：用於在轉帳時發送額外資訊，或呼叫智能合約，餘額轉帳不需要此欄位，請查看下方的注意事項。
- `signedTx`：為了簽署我們的交易物件，我們將使用 `signTransaction` 方法，該方法會使用從我們的 `PRIVATE_KEY` 建立的帳戶在本地對其進行簽署。
- `sendRawTransaction`：一旦我們有了已簽署的交易，我們就可以使用 `sendRawTransaction`（它會呼叫 `eth_sendRawTransaction`）將其發送出去，以便包含在後續的區塊中。
- `waitForTransactionReceipt`：等待交易被包含在區塊中並返回其收據。

**關於 data 的注意事項**
在以太坊中可以發送兩種主要類型的交易。

- 餘額轉帳：將 ETH 從一個地址發送到另一個地址。不需要 data 欄位，但是，如果您想在交易中發送額外資訊，您可以在此欄位中以十六進位格式包含該資訊。
  - 例如，假設我們想將 IPFS 文件的雜湊寫入以太坊鏈，以便為其提供不可變的時間戳記。我們的 data 欄位應該看起來像 `data: toHex("IPFS hash")`，使用 viem 的 [`toHex`](https://viem.sh/docs/utilities/toHex)。現在任何人都可以查詢該鏈並查看該文件是何時新增的。
- 智能合約交易：在鏈上執行一些智能合約程式碼。在這種情況下，data 欄位應包含您希望執行的智能函式以及任何參數。
  - 如需實際範例，請查看 [Hello World 智能合約教學](/developers/tutorials/hello-world-smart-contract/)。

### 8\. 使用 `node sendTx.js` 執行程式碼 {#run-the-code-using-node-sendtx-js}

導覽回您的終端機或命令列並執行：

```
node sendTx.js
```

### 9\. 在區塊鏈瀏覽器上查看您的交易 {#see-your-transaction-in-the-mempool}

一旦節點接受交易，腳本就會印出交易雜湊值，然後等待它被包含在區塊中（通常在幾秒鐘內）並印出結果。要查看詳細資訊，請將雜湊貼到 Sepolia 區塊鏈瀏覽器中，例如 [Sepolia Etherscan](https://sepolia.etherscan.io/) 或 [Blockscout](https://eth-sepolia.blockscout.com/)。在那裡，您可以觀察交易從待處理到被包含的過程，並查看金額、費用以及它所在的區塊。

如果您看到 `insufficient funds` 錯誤，則表示您的帳戶沒有足夠的 Sepolia ETH 來支付價值加上燃料費用。請回到步驟 2 並從水龍頭請求更多資金。

**太棒了！您剛剛使用 Alchemy 發送了您的第一筆以太坊交易 🎉**

_如對本指南有任何回饋和建議，請在 Alchemy 的 [Discord](https://discord.gg/gWuC7zB) 上傳送訊息給 Elan！_

_最初由 Alchemy 發布。_
