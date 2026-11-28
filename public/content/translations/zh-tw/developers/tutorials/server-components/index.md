---
title: "Web3 應用程式的伺服器元件與代理"
description: "閱讀本教學後，你將能夠編寫 TypeScript 伺服器，用於監聽區塊鏈上的事件並透過發送自己的交易來做出相應的回應。這將使你能夠編寫中心化應用程式（因為伺服器是一個單點故障），但可以與 Web3 實體互動。同樣的技術也可以用來編寫一個代理，在無需人工介入的情況下回應鏈上事件。"

author: "奧里·波梅蘭茨"
lang: zh-tw
tags: ["代理", "伺服器", "鏈下", "dapp"]
skill: beginner
breadcrumb: "伺服器元件"
published: 2024-07-15
---

## 簡介 {#introduction}

在大多數情況下，去中心化應用程式 (dapp) 使用伺服器來散佈軟體，但所有實際的互動都發生在客戶端（通常是網頁瀏覽器）與區塊鏈之間。

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

然而，在某些情況下，應用程式會受益於擁有一個獨立運作的伺服器元件。這樣的伺服器將能夠透過發送交易來回應事件，以及來自其他來源（例如 API）的請求。

![The interaction with the addition of a server](./fig-2.svg)

這樣的伺服器可以完成幾種可能的任務。

- 秘密狀態的持有者。在遊戲中，不讓玩家獲得遊戲所知的所有資訊通常是有用的。然而，_區塊鏈上沒有秘密_，區塊鏈上的任何資訊都很容易被任何人找出來。因此，如果要將部分遊戲狀態保密，就必須將其儲存在其他地方（並且可能使用 [零知識證明](/zero-knowledge-proofs) 來驗證該狀態的影響）。

- 中心化預言機。如果風險夠低，一個在線上讀取某些資訊然後將其發佈到鏈上的外部伺服器，可能就足以作為 [預言機](/developers/docs/oracles/) 使用。

- 代理。如果沒有交易來觸發，區塊鏈上就不會發生任何事情。當機會出現時，伺服器可以代表使用者執行諸如 [套利](/developers/docs/mev/#mev-examples-dex-arbitrage) 等操作。

## 範例程式 {#sample-program}

你可以在 [GitHub 上](https://github.com/qbzzt/20240715-server-component) 查看範例伺服器。這個伺服器會監聽來自 Sepolia 測試網上 [這個合約](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code) 的事件，這是 Hardhat 的 Greeter 的修改版本。當問候語被更改時，它會將其改回來。

這個合約與其他教學共用，因此其他使用者（以及他們的伺服器）可能會在你的伺服器運行時更改問候語。完成後請停止你的伺服器，以避免花費你的測試網 ETH。

要運行它：

1. 複製（Clone）儲存庫。

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. 這個範例儲存庫是為 Holesky 測試網編寫的，該測試網現已關閉。請將其更新為使用 Sepolia 和 Sepolia 合約地址。

   ```sh copy
   sed -i.bak -e 's/holesky/sepolia/g' -e 's/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA/' src/app.ts
   ```

3. 安裝必要的套件。如果你還沒有安裝，請[先安裝 Node](https://nodejs.org/en/download/package-manager)。

   ```sh copy
   npm install
   ```

4. 編輯 `.env` 以指定一個在 Sepolia 測試網上擁有 ETH 的帳戶私鑰。如果你在 Sepolia 上沒有 ETH，你可以[使用這個水龍頭](https://sepolia-faucet.pk910.de/)。請使用一個僅用於測試的新帳戶，絕對不要使用持有真實資產的帳戶。

   ```sh filename=".env" copy
   PRIVATE_KEY=0x<private key goes here>
   ```

5. 啟動伺服器。

   ```sh copy
   npm start
   ```

6. 前往[區塊鏈瀏覽器](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=write_contract)，並使用與擁有私鑰的地址不同的地址來修改問候語。你會看到問候語會自動被改回來。

### 它是如何運作的？ {#how-it-works}

了解如何編寫伺服器元件最簡單的方法，就是逐行檢視這個範例。

#### `src/app.ts` {#src-app-ts}

絕大部分的程式碼都包含在 [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) 中。

##### 建立必備物件

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

這些是我們需要的 [Viem](https://viem.sh/) 實體、函式以及 [`Address` 類型](https://viem.sh/docs/glossary/types#address)。這個伺服器是用 [TypeScript](https://www.typescriptlang.org/) 編寫的，它是 JavaScript 的擴充，使其成為[強型別](https://en.wikipedia.org/wiki/Strong_and_weak_typing)語言。

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[這個函式](https://viem.sh/docs/accounts/privateKey) 讓我們能夠產生對應於私鑰的錢包資訊，包含地址。

```typescript
import { sepolia } from "viem/chains"
```

要在 Viem 中使用區塊鏈，你需要匯入它的定義。在這個例子中，我們想要連接到 [Sepolia](/developers/docs/networks/#sepolia) 測試區塊鏈。

```typescript
// 這是我們將 .env 中的定義加入到 process.env 的方式。
import * as dotenv from "dotenv"
dotenv.config()
```

這就是我們將 `.env` 讀取到環境中的方式。我們需要它來取得私鑰（詳見後文）。

```typescript
const greeterAddress : Address = "0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

要使用合約，我們需要它的地址和它的 [ABI](/glossary/#abi)。我們在這裡提供了這兩者。

在 JavaScript（以及 TypeScript）中，你不能將新值指派給常數，但你_可以_修改儲存在其中的物件。透過使用後綴 `as const`，我們告訴 TypeScript 這個列表本身是常數，且不能被更改。

```typescript
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

建立一個 Viem [公共客戶端 (public client)](https://viem.sh/docs/clients/public)。公共客戶端沒有附加的私鑰，因此無法發送交易。它們可以呼叫 [`view` 函式](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm)、讀取帳戶餘額等。

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

環境變數可以在 [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) 中取得。然而，TypeScript 是強型別的。環境變數可以是任何字串，或者是空的，所以環境變數的類型是 `string | undefined`。但是，在 Viem 中，金鑰被定義為 `0x${string}`（`0x` 後面跟著一個字串）。在這裡，我們告訴 TypeScript `PRIVATE_KEY` 環境變數將會是那個類型。如果不是，我們將會得到一個執行階段錯誤。

然後，[`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) 函式會使用這個私鑰來建立一個完整的帳戶物件。

```typescript
const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(),
})
```

接下來，我們使用帳戶物件來建立一個[錢包客戶端 (wallet client)](https://viem.sh/docs/clients/wallet)。這個客戶端擁有私鑰和地址，所以它可以用來發送交易。

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

現在我們已經具備了所有必備條件，我們終於可以建立一個[合約實例 (contract instance)](https://viem.sh/docs/contract/getContract)。我們將使用這個合約實例與鏈上合約進行通訊。

##### 從區塊鏈讀取

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

唯讀的合約函式（[`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) 和 [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)）可以在 `read` 下取得。在這個例子中，我們使用它來存取 [`greet`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_contract) 函式，它會回傳問候語。

JavaScript 是單執行緒的，所以當我們啟動一個長時間運行的程序時，我們需要[指定我們以非同步方式執行它](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)。呼叫區塊鏈，即使是唯讀操作，也需要在電腦和區塊鏈節點之間進行一次往返。這就是為什麼我們在這裡指定程式碼需要 `await`（等待）結果的原因。

如果你對它的運作方式感興趣，你可以[在這裡閱讀相關資訊](https://www.w3schools.com/js/js_promise.asp)，但實際上你只需要知道，如果你啟動一個需要很長時間的操作，你需要 `await`（等待）結果，而且任何執行此操作的函式都必須宣告為 `async`。

##### 發送交易

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

這是你呼叫來發送更改問候語交易的函式。由於這是一個長時間的操作，該函式被宣告為 `async`。因為內部實作的關係，任何 `async` 函式都需要回傳一個 `Promise` 物件。在這個例子中，`Promise<any>` 表示我們沒有指定 `Promise` 中確切會回傳什麼。

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

合約實例的 `write` 欄位包含了所有寫入區塊鏈狀態的函式（那些需要發送交易的函式），例如 [`setGreeting`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=write_contract)。參數（如果有的話）以列表形式提供，並且該函式會回傳交易的雜湊。

```typescript
    console.log(`Working on a fix, see https://eth-sepolia.blockscout.com/tx/${txHash}`)

    return txHash
}
```

報告交易的雜湊（作為區塊鏈瀏覽器 URL 的一部分以供查看）並將其回傳。

##### 回應事件

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` 函式](https://viem.sh/docs/actions/public/watchEvent) 讓你能夠指定當事件發出時要執行的函式。如果你只關心一種類型的事件（在這個例子中是 `SetGreeting`），你可以使用這種語法將自己限制在該事件類型。

```typescript
    onLogs: logs => {
```

當有日誌條目時，會呼叫 `onLogs` 函式。在以太坊中，「日誌」和「事件」通常是可以互換的。

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

可能有多個事件，但為了簡單起見，我們只關心第一個。`logs[0].args` 是事件的參數，在這個例子中是 `sender` 和 `greeting`。

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

如果發送者_不是_這個伺服器，請使用 `setGreeting` 來更改問候語。

#### `package.json` {#package-json}

[這個檔案](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) 控制了 [Node.js](https://nodejs.org/en) 的設定。本文僅解釋重要的定義。

```json
{
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

scripts 是各種應用程式動作。在這個例子中，我們唯一擁有的是 `start`，它會編譯然後運行伺服器。`tsc` 指令是 `typescript` 套件的一部分，會將 TypeScript 編譯成 JavaScript。如果你想手動運行它，它位於 `node_modules/.bin` 中。第二個指令會運行伺服器。

```json
  "type": "module",
```

JavaScript node 應用程式有多種類型。`module` 類型讓我們可以在頂層程式碼中使用 `await`，這在執行緩慢（且非同步）的操作時非常重要。

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

這些是僅在開發時需要的套件。在這裡我們需要 `typescript`，而且因為我們將它與 Node.js 一起使用，我們也取得了 node 變數和物件的類型，例如 `process`。[`^<version>` 標記](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) 表示該版本或沒有破壞性變更的更高版本。有關版本號碼含義的更多資訊，請參閱[這裡](https://semver.org)。

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

這些是在執行階段，當運行 `dist/app.js` 時所需的套件。

## 結論 {#conclusion}

我們在這裡建立的中心化伺服器完成了它的工作，也就是作為使用者的代理。任何其他希望去中心化應用程式 (dapp) 繼續運作並願意花費燃料的人，都可以使用自己的地址來執行一個新的伺服器實例。

然而，這只有在中心化伺服器的操作可以輕易被驗證時才有效。如果中心化伺服器擁有任何秘密狀態資訊，或者執行困難的計算，它就是一個你需要信任才能使用該應用程式的中心化實體，這正是區塊鏈試圖避免的。在未來的文章中，我計畫展示如何使用 [零知識證明](/zero-knowledge-proofs) 來解決這個問題。

[點擊這裡查看我更多的作品](https://cryptodocguy.pro/)。
