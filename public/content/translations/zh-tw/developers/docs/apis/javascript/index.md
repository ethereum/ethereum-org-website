---
title: "JavaScript API 函式庫"
description: "介紹可讓您從應用程式與區塊鏈互動的 JavaScript 客戶端函式庫。"
lang: zh-tw
---

為了讓網頁應用程式與以太坊區塊鏈互動（即讀取區塊鏈資料和/或發送交易到網路），它必須連接到以太坊節點。

為此，每個以太坊客戶端都實作了 [JSON-RPC](/developers/docs/apis/json-rpc/) 規範，因此有一套統一的[方法](/developers/docs/apis/json-rpc/#json-rpc-methods)可供應用程式依賴。

如果您想使用 JavaScript 連接到以太坊節點，可以使用純 JavaScript，但生態系統中存在幾個便利的函式庫，使這變得容易得多。透過這些函式庫，開發人員可以編寫直觀的單行方法來初始化 JSON-RPC 請求（在底層運作），從而與以太坊互動。

請注意，自[合併](/roadmap/merge/)以來，運行一個節點需要兩個相連的以太坊軟體：執行客戶端和共識客戶端。請確保您的節點同時包含執行客戶端和共識客戶端。如果您的節點不在本機機器上（例如，您的節點在 AWS 執行個體上運行），請相應地更新教學中的 IP 位址。如需更多資訊，請參閱我們關於[運行節點](/developers/docs/nodes-and-clients/run-a-node/)的頁面。

## 先決條件 {#prerequisites}

除了了解 JavaScript 之外，了解[以太坊堆疊](/developers/docs/ethereum-stack/)和[以太坊客戶端](/developers/docs/nodes-and-clients/)可能也會有所幫助。

## 為什麼要使用函式庫？ {#why-use-a-library}

這些函式庫抽象化了直接與以太坊節點互動的許多複雜性。它們還提供了公用程式函式（例如，將 ETH 轉換為 Gwei），因此身為開發人員，您可以花更少的時間處理以太坊客戶端的複雜細節，而將更多時間集中在應用程式的獨特功能上。

## 函式庫功能 {#library-features}

### 連接到以太坊節點 {#connect-to-ethereum-nodes}

使用提供者 (providers)，這些函式庫允許您連接到以太坊並讀取其資料，無論是透過 JSON-RPC、Infura、Etherscan、Alchemy 還是梅塔馬斯克。

> **警告：** Web3.js 已於 2025 年 3 月 4 日封存。[閱讀公告](https://blog.chainsafe.io/web3-js-sunset/)。對於新專案，請考慮使用 [Ethers.js](https://ethers.或g) 或 [Viem](https://viem.sh) 等替代函式庫。

**Ethers 範例**

```js
// BrowserProvider 包裝了一個標準的 Web3 提供者，也就是
// 梅塔馬斯克 作為 window.ethereum 注入到每個頁面中的東西
const provider = new ethers.BrowserProvider(window.ethereum)

// 梅塔馬斯克 擴充功能也允許簽署交易來
// 發送以太幣並支付費用以改變區塊鏈內的狀態。
// 為此，我們需要帳戶簽署者...
const signer = provider.getSigner()
```

**Web3js 範例**

```js
var web3 = new Web3("http://localhost:8545")
// 或
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// 更改提供者
web3.setProvider("ws://localhost:8546")
// 或
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// 在 node.js 中使用 IPC 提供者
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os 路徑
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os 路徑
// 在 windows 上的路徑是："\\\\.\\pipe\\geth.ipc"
// 在 linux 上的路徑是："/users/myuser/.ethereum/geth.ipc"
```

設定完成後，您將能夠向區塊鏈查詢：

- 區塊號碼
- 燃料估算
- 智能合約事件
- 網路 ID
- 以及更多...

### 錢包功能 {#wallet-functionality}

這些函式庫為您提供建立錢包、管理金鑰和簽署交易的功能。

以下是 Ethers 的範例

```js
// 從助記詞建立一個錢包實例...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...或從私鑰建立
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// 根據 Signer API，地址作為一個 Promise
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// 錢包地址也可以同步取得
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// 內部密碼學元件
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// 錢包助記詞
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// 注意：使用私鑰建立的錢包沒有
//       助記詞（推導過程阻止了它）
walletPrivateKey.mnemonic
// null

// 簽署訊息
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// 簽署交易
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// connect 方法會回傳一個新的
// 連接到提供者的錢包實例
wallet = walletMnemonic.connect(provider)

// 查詢網路
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// 發送以太幣
wallet.sendTransaction(tx)
```

[閱讀完整文件](https://docs.ethers.io/v5/api/signer/#Wallet)

設定完成後，您將能夠：

- 建立帳戶
- 發送交易
- 簽署交易
- 以及更多...

### 與智能合約函式互動 {#interact-with-smart-contract-functions}

JavaScript 客戶端函式庫允許您的應用程式透過讀取已編譯合約的應用程式二進位介面 (ABI) 來呼叫智能合約函式。

ABI 基本上以 JSON 格式說明了合約的函式，並允許您像使用一般的 JavaScript 物件一樣使用它。

因此，以下 Solidity 合約：

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

將產生以下 JSON：

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

這意味著您可以：

- 發送交易到智能合約並執行其方法
- 呼叫以估算在 EVM 中執行方法時所需的燃料
- 部署合約
- 以及更多...

### 公用程式函式 {#utility-functions}

公用程式函式為您提供便利的捷徑，讓在以太坊上進行開發變得稍微容易一些。

ETH 的值預設以 Wei 為單位。1 ETH = 1,000,000,000,000,000,000 WEI – 這意味著您要處理很多數字！`web3.utils.toWei` 會為您將以太幣轉換為 Wei。

而在 Ethers 中，它看起來像這樣：

```js
// 取得帳戶餘額（透過地址或 ENS 名稱）
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// 通常您會需要為使用者格式化輸出
// 他們偏好看到以太幣（而不是 Wei）的值
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js 公用程式函式](https://docs.web3js.org/api/web3-utils)
- [Ethers 公用程式函式](https://docs.ethers.org/v6/api/utils/)

## 可用的函式庫 {#available-libraries}

**Web3.js -** **_以太坊 JavaScript API。_**

- [文件](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_在 JavaScript 和 TypeScript 中完整的以太坊錢包實作和公用程式。_**

- [Ethers.js 首頁](https://ethers.org/)
- [文件](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_用於索引以太坊和 IPFS 資料並使用 GraphQL 進行查詢的協定。_**

- [The Graph](https://thegraph.com)
- [Graph 瀏覽器](https://thegraph.com/explorer)
- [文件](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_具有增強 API 的 Ethers.js 包裝器。_**

- [文件](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_以太坊的 TypeScript 介面。_**

- [文件](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_跨數十個鏈的即時、豐富的區塊鏈資料 API。_**

- [文件](https://docs.codex.io)
- [瀏覽器](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_內建快取、掛鉤 (hooks) 和測試模擬的 TypeScript 中介函式庫。_**

- [文件](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## 延伸閱讀 {#further-reading}

_知道有幫助過您的社群資源嗎？編輯此頁面並加入它！_

## 相關主題 {#related-topics}

- [節點與客戶端](/developers/docs/nodes-and-clients/)
- [開發框架](/developers/docs/frameworks/)

## 相關教學 {#related-tutorials}

- [設定 Web3js 以在 JavaScript 中使用以太坊區塊鏈](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 在專案中設定 Web3.js 的說明。_
- [從 JavaScript 呼叫智能合約](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– 使用 DAI 代幣，了解如何使用 JavaScript 呼叫合約函式。_
- [使用 Web3 和 Alchemy 發送交易](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– 從後端發送交易的逐步演練。_

## 教學：以太坊上的 JavaScript API 與 WebSockets {#tutorials}

- [使用 WebSockets](/developers/tutorials/using-websockets/) _– 如何將 WebSockets 與 Alchemy 結合使用，以訂閱以太坊事件並發出即時 JSON-RPC 請求。_