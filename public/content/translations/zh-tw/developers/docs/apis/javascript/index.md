---
title: JavasScript API 圖書館
description: JavaScript 用戶端程式庫簡介，可讓你從應用程式與區塊鏈進行互動。
lang: zh-tw
---

為了使網路應用程式能夠與以太坊區塊鏈互動（即讀取區塊鏈資料和/或將交易傳送到網路），它必須連結到以太坊節點。

為了這個目的，每個以太坊用戶端需實作 [JSON-RPC](/developers/docs/apis/json-rpc/) 規範，如此一來，應用程式就可以使用一組統一的[方法](/developers/docs/apis/json-rpc/#json-rpc-methods)。

如果你想使用 JavaScript 與以太坊節點連結，可以使用普通 JavaScript，但生態系統中存在幾個便利的程式庫，讓連結變得更加容易。 借助這些程式庫，開發者可以編寫直覺的單行方法來初始化與以太坊互動的 JSON-RPC 請求（在後台）。

請注意，在[合併](/roadmap/merge/)後，如要運行節點，需要兩個互相連結的以太坊軟體：執行用戶端和共識用戶端。 請確定你的節點包含執行用戶端和共識用戶端。 如果你的節點不在本地機器上（比如你的節點在 AWS 執行個體上），請相應地修改教學中的 IP 位址。 更多資訊請見我們的[運行節點](/developers/docs/nodes-and-clients/run-a-node/)頁面。

## 基本資訊 {#prerequisites}

除了瞭解 JavaScript 之外，瞭解<0>以太坊堆疊</0>和<1>以太坊用戶端</1>可能也會有所幫助。

## 為何使用資料圖書庫 {#why-use-a-library}

函式庫簡化與以太坊節點的複雜步驟. 並提供其他效功能(例如: 轉化以太(ETH)到Gwei)使開發者花少時間處理以太坊客戶, 且花更多時間在提升應用程式獨特功能.

## 程式庫功能 {#library-features}

### 連結以太坊節點 {#connect-to-ethereum-nodes}

使用提供者，這些程式庫讓你能夠連結到以太坊並讀取其資料，無論是透過 JSON-RPC、INFURA、Etherscan、Alchemy 還是 MetaMask。

**Ethers 範例**

```js
// BrowserProvider 包裝了一個標準的 Web3 提供者
// 這就是 MetaMask 注入到每個頁面中的 window.ethereum
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMask 外掛程式也允許簽署交易
// 以傳送以太幣並支付以改變區塊鏈中的狀態。
//為此, 我們須帳戶簽署者
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
- 和更多相關內容...

### 錢包功能 {#wallet-functionality}

這些程式庫為你提供建立錢包、管理金鑰和簽署交易的功能。

下面是以太幣範例

```js
//由助記符(mnemonic) 創建錢包
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...或者從私鑰建立
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// 根據簽署者應用程式介面取得地址（以 Promise 形式）
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// 錢包地址也可以同步獲取
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// 內部加密組件
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

// 注意：用私鑰建立的錢包
//       沒有助記詞（因為衍生過程不支援）
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

// 連接方法返回一個新的連接到提供者的
// 錢包執行個體，
wallet = walletMnemonic.connect(provider)

// 查詢網路
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// 發送以太幣
wallet.sendTransaction(tx)
```

[閱讀完整文檔](https://docs.ethers.io/v5/api/signer/#Wallet)

設定完成後，你將能夠：

- 建立帳戶
- 傳送交易
- 簽署交易
- 和更多...

### 與智慧型合約功能互動 {#interact-with-smart-contract-functions}

JavaScript 用戶端程式庫讓你的應用程式能透過讀取編譯合約的應用程式二進位介面 (ABI) 呼叫智慧型合約函式。

應用程式二進位介面本質上以 JSON 格式解釋了合約的功能，並讓你能夠像使用普通 JavaScript 物件一樣使用合約。

以下為 Solidity 合約範例：

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt)  { a = testInt;}

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
- 和更多...

### 公用程式功能 {#utility-functions}

公用程式功能提供了方便的捷徑，讓以太坊中的構建變得更加容易。

以太幣值預設以 Wei 為單位。 1 以太幣 = 1,000,000,000,000,000,000 WEI – 這意味著你正在處理大量數字！ `web3.utils.toWei` 自動將以太幣轉換至 Wei。

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

- [Web3js 公用程式功能](https://docs.web3js.org/api/web3-utils)
- [Ethers 公用程式功能](https://docs.ethers.io/v5/api/utils/)

## 可用資料圖書庫 {#available-libraries}

**Web3.js -** **_以太坊 JavaScript 應用程式介面。 _**

- [文件](https://docs.web3js.org/)
- [Github](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_使用 JavaScript 和 TypeScript 的完整以太坊錢包實作和公用程式。 _**

- [文件](https://docs.ethers.io/)
- [Github](https://github.com/ethers-io/ethers.js/)

**The Graph -** **_用於為以太坊和星際檔案係統資料編製索引並使用 GraphQL 進行查詢的協議。_**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [文件](https://thegraph.com/docs/)
- [Github](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js ****_針對輕量用戶端最佳化的高階回應式 JS 程式庫。_**

- [Github](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_可替代 Web3.js 的 Typescript。_**

- [文件](https://0x.org/docs/web3-wrapper#introduction)
- [Github](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_具有自動重試和增強型應用程式介面的 Web3.js 包裝函式。_**

- [文件](https://docs.alchemy.com/reference/api-overview)
- [Github](https://github.com/alchemyplatform/alchemy-web3)

**Alchemy 非同質化代幣應用程式介面 -** **_用於擷取非同質化代幣資料的應用程式介面，包括所有權、中繼資料屬性以及更多。_**

- [文件](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

**viem -** **_以太坊的 TypeScript 介面。_**

- [文件](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

## 衍生閱讀 {#further-reading}

_知道對你有幫助的社群資源嗎？ 請編輯此頁面並新增資源！_

## 相關主題 {#related-topics}

- [節點和用戶端](/developers/docs/nodes-and-clients/)
- [開發架構](/developers/docs/frameworks/)

## 相關教學影片 {#related-tutorials}

- [設定 Web3js 以在 Javascript 中使用以太坊區塊鏈](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– 在專案中設定 web3.js 的說明。_
- [從 JavaScript 呼叫智慧型合約](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– 使用 DAI 代幣，瞭解如何使用 JavaScript 呼叫合約函式。_
- [使用 web3 和 Alchemy 傳送交易](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– 從後端傳送交易的逐步演練。_
