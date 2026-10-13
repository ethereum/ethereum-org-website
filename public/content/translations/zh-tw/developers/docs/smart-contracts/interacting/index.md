---
title: 與智能合約互動
description: 了解如何讀取和寫入已部署在以太坊上的智能合約。
lang: zh-tw
---

你不一定總是需要撰寫並部署自己的智能合約。身為開發者，大多數時候你會想要與其他人已經部署到以太坊網路的智能合約進行互動。

本頁面涵蓋了與智能合約互動的兩種基本方式——**讀取**資料與**寫入**資料——以及執行這兩項操作所需的工具。

## 先決條件 {#prerequisites}

你應該了解：

- [智能合約如何運作](/developers/docs/smart-contracts/)
- [以太坊帳戶及其如何簽署交易](/developers/docs/accounts/)
- [什麼是交易](/developers/docs/transactions/)

## 與智能合約互動的兩種方式 {#two-ways}

與智能合約互動可分為兩大類：

### 從合約讀取 {#reading-from-a-contract}

讀取是一項**免費**的操作，不會建立交易，也不會改變區塊鏈上的任何狀態。

當你從合約讀取時，你只是在查詢已經存在的資料。例如：

- 檢查 ERC-20 代幣餘額
- 從去中心化交易所讀取當前價格
- 取得 NFT 的擁有者

因為讀取不會修改狀態，所以不需要消耗[燃料](/developers/docs/gas/)，任何人都可以執行而不需要 ETH。

### 寫入合約 {#writing-to-a-contract}

寫入是一項**改變狀態**的操作，需要發送交易並消耗燃料。

當你寫入合約時，你正在觸發一個會修改區塊鏈狀態的函式。例如：

- 轉移代幣
- 在去中心化交易所交換代幣
- 鑄造 NFT

寫入總是需要：

1. 一個擁有足夠 ETH 支付燃料費的[外部擁有帳戶 (EOA)](/developers/docs/accounts/#types-of-account)
2. 一筆由該帳戶私鑰簽署的交易
3. 該交易被挖礦並包含在區塊中

透過[帳戶抽象化](/roadmap/account-abstraction/)，智能合約帳戶也可以發起寫入操作，並且代付合約可以代表使用者支付燃料費——因此不嚴格要求必須擁有持有 ETH 的 EOA。

## 了解合約 ABI {#understanding-contract-abis}

為了與智能合約互動，你的應用程式需要知道合約*能做什麼*。這就是**應用程式二進位介面 (ABI)** 發揮作用的地方。

ABI 是一個 JSON 文件，描述了：

- 合約公開的每個函式（名稱、輸入、輸出）
- 合約可以發出的每個事件
- 在與合約通訊時如何編碼和解碼資料

可以把 ABI 想像成合約的使用手冊——沒有它，你的應用程式就不知道存在哪些函式，或者它們預期什麼參數。

### 哪裡可以找到合約的 ABI {#where-to-find-abis}

- **Etherscan 上已驗證的合約** - [Etherscan](https://etherscan.io) 會自動公開已驗證原始碼的 ABI
- **來自開發者** - 許多專案會在他們的文件或 npm 套件中發布他們的 ABI
- **從原始碼產生** - 如果你有 Solidity 原始碼，你可以[編譯它](/developers/docs/smart-contracts/compiling/)來產生 ABI

## 用於與合約互動的工具和函式庫 {#tools-and-libraries}

開發者通常使用 JavaScript/TypeScript 函式庫，從網頁應用程式、後端或腳本與合約進行互動。

### 客戶端函式庫 (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** - 現代、輕量級的以太坊 TypeScript 介面，具備一流的型別安全性
- **[ethers.js](https://docs.ethers.org/)** - 經過實戰測試的函式庫，用於與以太坊區塊鏈互動
- **[web3.js](https://web3js.org/)** - 最初的以太坊 JavaScript API

### 後端函式庫 {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - 也可在 Node.js 中運作，適用於伺服器端腳本和機器人
- **[Web3.py](https://web3py.readthedocs.io/)** - 用於以太坊互動的 Python 函式庫
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - 來自 Geth 團隊的官方 Go 函式庫

### 範例：使用 Viem 讀取代幣餘額 {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC 合約地址與 ABI（部分，用於 balanceOf）
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC 有 6 位小數
```

### 範例：使用 ethers.js 發送交易 {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20 轉帳 ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // 等待交易被打包
console.log(`Transferred! TX: ${tx.hash}`)
```

## 事件與日誌 {#events-and-logs}

智能合約可以發出**事件**來發出某事發生的訊號。你的應用程式可以監聽這些事件以即時做出反應。

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// 監聽 USDC Transfer 事件
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## 模擬交易 {#simulating}

在發送交易之前，你可以**模擬**它以檢查是否會成功——並查看其回傳值——而無需消耗燃料。這對於及早發現錯誤和預覽結果非常有用。

大多數客戶端函式庫透過 `eth_call` 支援此功能：

```ts
// 使用 Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## 錢包與簽署 {#wallets-and-signing}

在去中心化應用程式 (dapp) 中，使用者的錢包（如梅塔馬斯克、Rainbow 或 WalletConnect）負責處理簽署。你不需要直接管理私鑰。

[錢包函式庫與連線工具](/developers/docs/apis/javascript/)將此過程抽象化，讓你可以專注於建立應用程式邏輯。

## 相關教學 {#related-tutorials}

- [從 JavaScript 呼叫智能合約](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [使用 Web3.js 和 Alchemy 發送交易](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [如何在錢包中檢視你的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)

## 進階閱讀 {#further-reading}

- [Viem 文件：讀取與寫入合約](https://viem.sh/docs/contract/readContract)
- [ethers.js 文件：合約](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI 規範](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [什麼是 ABI？ - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## 相關主題 {#related-topics}

- [編譯智能合約](/developers/docs/smart-contracts/compiling/)
- [部署智能合約](/developers/docs/smart-contracts/deploying/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [後端 API](/developers/docs/apis/backend/)