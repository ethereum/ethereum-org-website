---
title: "Javascript 應用程式介面程式庫"
description: "JavaScript 用戶端程式庫簡介，可讓你從應用程式與區塊鏈進行互動。"
lang: zh-tw
---

若要讓 Web 應用程式與以太坊區塊鏈互動 (即讀取區塊鏈資料和/或將交易傳送到網路)，它必須連線到以太坊節點。

為此，每個以太坊用戶端都會實作 [JSON-RPC](/developers/docs/apis/json-rpc/) 規範，因此應用程式可以仰賴一組統一的 [方法](/developers/docs/apis/json-rpc/#json-rpc-methods)。

如果你想使用 JavaScript 與以太坊節點連結，可以使用普通 JavaScript，但生態系統中存在幾個便利的程式庫，讓連結變得更加容易。 借助這些程式庫，開發者可以編寫直覺的單行方法來初始化與以太坊互動的 JSON-RPC 請求（在後台）。

請注意，自 [合併](/roadmap/merge/) 之後，執行節點需要兩個相連的以太坊軟體：一個執行用戶端和一個共識用戶端。 請確定你的節點包含執行用戶端和共識用戶端。 如果您的節點不在本機電腦上 (例如，您的節點在 AWS 執行個體上執行)，請相應地更新教學中的 IP 位址。 如需詳細資訊，請參閱我們的[執行節點](/developers/docs/nodes-and-clients/run-a-node/)頁面。

## 先決條件 {#prerequisites}

除了瞭解 JavaScript 之外，瞭解[以太坊技術堆疊](/developers/docs/ethereum-stack/)和[以太坊用戶端](/developers/docs/nodes-and-clients/)可能也會有幫助。

## 為何使用程式庫？ {#why-use-a-library}

這些程式庫顯著降低了直接和以太坊節點互動的複雜度。 它們也提供公用程式函式（例如將 ETH 轉換為 Gwei），因此作為開發者，您可以花費較少時間處理以太坊用戶端的複雜細節，並將更多時間專注於應用程式的獨特功能。

## 程式庫功能 {#library-features}

### 連線至以太坊節點 {#connect-to-ethereum-nodes}

使用提供者，這些程式庫讓你能夠連結到以太坊並讀取其資料，無論是透過 JSON-RPC、INFURA、Etherscan、Alchemy 還是 MetaMask。

> **警告：** Web3.js 已於 2025 年 3 月 4 日封存。 [閱讀公告](https://blog.chainsafe.io/web3-js-sunset/) 針對新專案，請考慮使用 [ethers.js](https://ethers.org) 或 [viem](https://viem.sh) 等替代程式庫。

**Ethers 範例**

```js
// BrowserProvider 會包裝一個標準的 Web3 提供者，
// 也就是 MetaMask 注入到每個頁面的 window.ethereum
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMask 外掛程式也允許簽署交易
// 以傳送以太幣並支付費用來變更區塊鏈中的狀態。
// 為此，我們需要帳戶簽署者…
const signer = provider.getSigner()
```

**Web3js 範例**

```js
var web3 = new Web3("http://localhost:8545")
// 或
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// 更改Provider
web3.setProvider("ws://localhost:8546")
// 或
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// 使用 IPC provider 於 node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// 或
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os 路徑
// windows 路徑為: "\\\\.\\pipe\\geth.ipc"
// linux 路徑為: "/users/myuser/.ethereum/geth.ipc"
```

設定完成後，將能夠在區塊鏈查詢：

- 區塊編碼
- 燃料預估值
- 智慧型合約活動
- 網路 id
- 以及更多...

### 錢包功能 {#wallet-functionality}

這些程式庫為你提供建立錢包、管理金鑰和簽署交易的功能。

下面是以太幣範例

```js
// 從助記詞建立錢包執行個體...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...或從私密金鑰
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// 根據 Signer API，以 Promise 形式呈現的地址
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// 錢包地址也可以同步取得
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// 內部加密元件
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

// 注意：使用私密金鑰建立的錢包並
//       不會有助記詞 (衍生過程不支援)
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

// connect 方法會回傳一個
// 連線至提供者的新錢包執行個體
wallet = walletMnemonic.connect(provider)

// 查詢網路
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// 傳送以太幣
wallet.sendTransaction(tx)
```

[閱讀完整文件](https://docs.ethers.io/v5/api/signer/#Wallet)

設定完成後，你將能夠：

- 建立帳戶
- 傳送交易
- 簽署交易
- 以及更多...

### 與智能合約函式互動 {#interact-with-smart-contract-functions}

JavaScript 用戶端程式庫讓你的應用程式能透過讀取編譯合約的應用程式二進位介面 (ABI) 呼叫智慧型合約函式。

應用程式二進位介面本質上以 JSON 格式解釋了合約的功能，並讓你能夠像使用普通 JavaScript 物件一樣使用合約。

以下為 Solidity 合約範例：

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

這意味著你可以：

- 傳送交易至智慧型合約並執行其方法
- 呼叫以預估在以太坊虛擬機中執行時方法將花費的燃料
- 部署合約
- 和更多相關內容...

### 工具函式 {#utility-functions}

公用程式功能提供了方便的捷徑，讓以太坊中的構建變得更加容易。

以太幣值預設以 Wei 為單位。 1 以太幣 = 1,000,000,000,000,000,000 WEI – 這意味著你正在處理大量數字！ `web3.utils.toWei` 會為您將 ether 轉換為 Wei。

在以太幣中，如下所示：

```js
// 取得帳戶殘額(藉由地址或ENS名)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// 因用戶通常想看到以太(ETH)殘額, 通常開發者需
// 顯示以太(ETH)殘額, 而不是Wei.
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3js 工具函式](https://docs.web3js.org/api/web3-utils)
- [Ethers 工具函式](https://docs.ethers.org/v6/api/utils/)

## 可用函式庫 {#available-libraries}

**Web3.js -** **_以太坊 JavaScript API。_**

- [文件](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_在 JavaScript 和 TypeScript 中的完整以太坊錢包實作與工具。_**

- [Ethers.js 首頁](https://ethers.org/)
- [文件](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_一種用於索引以太坊和 IPFS 資料，並使用 GraphQL 查詢資料的協定。_**

- [The Graph](https://thegraph.com)
- [Graph 瀏覽器](https://thegraph.com/explorer)
- [文件](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_Ethers.js 的包裝器，具備增強的 API。_**

- [文件](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_以太坊的 TypeScript 介面。_**

- [文件](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_具有內建快取、掛鉤和測試模擬的 TypeScript 元程式庫。_**

- [文件](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## 延伸閱讀 {#further-reading}

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_

## 相關主題 {#related-topics}

- [節點和用戶端](/developers/docs/nodes-and-clients/)
- [開發框架](/developers/docs/frameworks/)

## 相關教學 {#related-tutorials}

- [設定 Web3js 以在 JavaScript 中使用以太坊區塊鏈](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 在專案中設定 web3.js 的說明。_
- [從 JavaScript 呼叫智慧型合約](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– 使用 DAI 代幣，了解如何透過 JavaScript 呼叫合約函式。_
- [使用 web3 和 Alchemy 傳送交易](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– 從後端傳送交易的逐步教學。_
