---
title: "Web3 應用程式的伺服器元件和代理"
description: "閱讀本教學後，您將能編寫 TypeScript 伺服器，以偵聽區塊鏈上的事件，並透過自己的交易做出相應的回應。 這將讓您能夠編寫中心化應用程式（因為伺服器是一個故障點），但可以與 Web3 實體互動。 同樣的技術也可以用來編寫一個無需人工干預即可回應鏈上事件的代理。"

author: Ori Pomerantz
lang: zh-tw
tags: [ "agent", "server", "offchain" ]
skill: beginner
published: 2024-07-15
---

## 介紹 {#introduction}

在大多數情況下，去中心化應用程式會使用伺服器來分發軟體，但所有實際互動都發生在用戶端（通常是網頁瀏覽器）和區塊鏈之間。

![網頁伺服器、用戶端和區塊鏈之間的正常互動](./fig-1.svg)

然而，在某些情況下，應用程式可以從獨立執行的伺服器元件中受益。 這樣的伺服器能夠透過發行交易來回應事件以及來自其他來源（如 API）的請求。

![新增伺服器後的互動](./fig-2.svg)

這樣的伺服器可以完成幾個可能的任務。

- 秘密狀態的持有者。 在遊戲中，不讓玩家知道遊戲所知的所有資訊通常很有用。 然而，_區塊鏈上沒有秘密_，區塊鏈中的任何資訊都很容易被任何人發現。 因此，如果遊戲狀態的一部分要保密，就必須儲存在其他地方（而且可能需要使用[零知識證明](/zero-knowledge-proofs)來驗證該狀態的效果）。

- 中心化預言機。 如果利害關係夠低，一個從網路上讀取一些資訊然後發布到鏈上的外部伺服器，可能就足以作為[預言機](/developers/docs/oracles/)來使用。

- 代理。 如果沒有交易來啟動，區塊鏈上什麼事都不會發生。 當機會出現時，伺服器可以代表使用者執行套利等操作，例如[套利](/developers/docs/mev/#mev-examples-dex-arbitrage)。

## 範例程式 {#sample-program}

您可以在 [github](https://github.com/qbzzt/20240715-server-component) 上看到一個範例伺服器。 這個伺服器會偵聽來自[此合約](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code) 的事件，這是 Hardhat 的 Greeter 的修改版本。 當問候語被更改時，它會將其改回來。

若要執行它：

1. 複製儲存庫。

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. 安裝必要的套件。 如果您還沒有，[請先安裝 Node](https://nodejs.org/en/download/package-manager)。

   ```sh copy
   npm install
   ```

3. 編輯 `.env` 來指定在 Holesky 測試網上擁有 ETH 的帳戶的私密金鑰。 如果您在 Holesky 上沒有 ETH，您可以使用[這個水龍頭](https://holesky-faucet.pk910.de/)。

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <此處填入私密金鑰>
   ```

4. 啟動伺服器。

   ```sh copy
   npm start
   ```

5. 前往[區塊瀏覽器](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract)，並使用與擁有私密金鑰的地址不同的地址來修改問候語。 查看問候語是否自動被改回。

### 它是如何運作的？ {#how-it-works}

理解如何編寫伺服器元件最簡單的方法是逐行檢查範例。

#### `src/app.ts` {#src-app-ts}

程式的絕大部分都包含在 [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) 中。

##### 建立先決物件

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

這些是我們需要的 [Viem](https://viem.sh/) 實體、函式以及 [`Address` 類型](https://viem.sh/docs/glossary/types#address)。 這個伺服器是用 [TypeScript](https://www.typescriptlang.org/) 編寫的，它是 JavaScript 的一個擴充，使其成為[強型別](https://en.wikipedia.org/wiki/Strong_and_weak_typing)。

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[這個函式](https://viem.sh/docs/accounts/privateKey) 讓我們可以根據私密金鑰產生錢包資訊，包括地址。

```typescript
import { holesky } from "viem/chains"
```

要在 Viem 中使用區塊鏈，您需要匯入其定義。 在這種情況下，我們想要連接到 [Holesky](https://github.com/eth-clients/holesky) 測試區塊鏈。

```typescript
// 這就是我們如何將 .env 中的定義新增到 process.env 的方法。
import * as dotenv from "dotenv"
dotenv.config()
```

這就是我們將 `.env` 讀入環境的方式。 我們需要它來取得私密金鑰（稍後會看到）。

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
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

要使用合約，我們需要它的地址和 [ABI](/glossary/#abi)。 我們在這裡提供了這兩者。

在 JavaScript（以及因此在 TypeScript 中），您不能為常數指定新值，但您_可以_修改儲存在其中的物件。 透過使用 `as const` 後綴，我們告訴 TypeScript 該清單本身是常數，不可更改。

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

建立一個 Viem [公開用戶端](https://viem.sh/docs/clients/public.html)。 公開用戶端沒有附加的私密金鑰，因此無法傳送交易。 他們可以呼叫 [`view` 函式](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm)、讀取帳戶餘額等。

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

環境變數可在 [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) 中取得。 然而，TypeScript 是強型別的。 環境變數可以是任何字串，或為空，所以環境變數的類型是 `string | undefined`。 然而，金鑰在 Viem 中被定義為 `0x${string}`（`0x` 後面跟著一個字串）。 在這裡，我們告訴 TypeScript `PRIVATE_KEY` 環境變數將是該類型。 如果不是，我們將會得到一個執行時錯誤。

[`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) 函式接著使用此私密金鑰來建立一個完整的帳戶物件。

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

接下來，我們使用帳戶物件來建立一個[錢包用戶端](https://viem.sh/docs/clients/wallet)。 此用戶端擁有私密金鑰和地址，因此可以用於傳送交易。

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

現在我們有了所有先決條件，終於可以建立一個[合約實例](https://viem.sh/docs/contract/getContract)。 我們將使用此合約實例與鏈上合約進行通訊。

##### 從區塊鏈讀取

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

唯讀的合約函式（[`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) 和 [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)）可在 `read` 下找到。 在這種情況下，我們使用它來存取 [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) 函式，該函式會傳回問候語。

JavaScript 是單執行緒的，所以當我們啟動一個長時間執行的程序時，我們需要[指定我們以非同步方式執行](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)。 呼叫區塊鏈，即使是唯讀操作，也需要電腦和區塊鏈節點之間的來回通訊。 這就是為什麼我們在這裡指定程式碼需要 `await` 結果的原因。

如果您對其運作方式感興趣，可以[在此處閱讀相關內容](https://www.w3schools.com/js/js_promise.asp)，但實際上您只需要知道，如果您啟動一個耗時較長的操作，就需要 `await` 結果，並且任何執行此操作的函式都必須宣告為 `async`。

##### 發行交易

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

這就是您呼叫來發行一筆更改問候語的交易的函式。 由於這是一個耗時較長的操作，該函式被宣告為 `async`。 由於內部實作，任何 `async` 函式都需要傳回一個 `Promise` 物件。 在這種情況下，`Promise<any>` 表示我們沒有指定 `Promise` 中確切會傳回什麼。

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

合約實例的 `write` 欄位包含所有寫入區塊鏈狀態的函式（那些需要傳送交易的函式），例如 [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862)。 參數（如果有的話）以清單形式提供，函式會傳回交易的哈希。

```typescript
    console.log(`正在修復中，請參閱 https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

報告交易的哈希（作為查看它的區塊瀏覽器 URL 的一部分）並傳回它。

##### 回應事件

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` 函式](https://viem.sh/docs/actions/public/watchEvent) 讓您指定在發出事件時要執行的函式。 如果您只關心一種事件類型（在此例中為 `SetGreeting`），您可以使用此語法將自己限制在該事件類型。

```typescript
    onLogs: logs => {
```

當有日誌項目時，`onLogs` 函式會被呼叫。 在以太坊中，「日誌」和「事件」通常可以互換使用。

```typescript
console.log(
  `地址 ${logs[0].args.sender} 已將問候語變更為 ${logs[0].args.greeting}`
)
```

可能有多個事件，但為簡單起見，我們只關心第一個。 `logs[0].args` 是事件的引數，在此例中為 `sender` 和 `greeting`。

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

如果傳送者_不是_這個伺服器，請使用 `setGreeting` 來更改問候語。

#### `package.json` {#package-json}

[這個檔案](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) 控制 [Node.js](https://nodejs.org/en) 的設定。 本文僅解釋重要的定義。

```json
{
  "main": "dist/index.js",
```

這個定義指定了要執行的 JavaScript 檔案。

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

指令碼是各種應用程式操作。 在這種情況下，我們只有 `start`，它會編譯然後執行伺服器。 `tsc` 命令是 `typescript` 套件的一部分，可將 TypeScript 編譯成 JavaScript。 如果您想手動執行，它位於 `node_modules/.bin`。 第二個命令執行伺服器。

```json
  "type": "module",
```

JavaScript 節點應用程式有多種類型。 `module` 類型讓我們可以在頂層程式碼中使用 `await`，這在您執行慢速（也就是非同步）操作時很重要。

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

這些是僅在開發時需要的套件。 在這裡我們需要 `typescript`，而且因為我們將它與 Node.js 一起使用，我們也需要取得節點變數和物件的類型，例如 `process`。 [`^<version>` 符號](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) 表示該版本或沒有破壞性變更的更高版本。 有關版本號碼含義的更多資訊，請參閱[此處](https://semver.org)。

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

這些是在執行 `dist/app.js` 時，在執行期間所需的套件。

## 結論 {#conclusion}

我們在這裡建立的中心化伺服器完成了它的工作，即作為使用者的代理。 任何其他希望去中心化應用程式繼續運作並願意花費 gas 的人，都可以用自己的地址執行一個新的伺服器實例。

然而，這僅在中心化伺服器的操作可以輕鬆驗證時才有效。 如果中心化伺服器擁有任何秘密狀態資訊，或執行困難的計算，那麼它就是一個您需要信任才能使用該應用程式的中心化實體，而這正是區塊鏈試圖避免的。 在未來的文章中，我計畫展示如何使用[零知識證明](/zero-knowledge-proofs)來解決這個問題。

[在此查看我的更多作品](https://cryptodocguy.pro/)。
