---
title: "為你的合約建立一個使用者介面"
description: "我們將使用 TypeScript、React、Vite 和 Wagmi 等現代元件，探討一個現代但極簡的使用者介面，並學習如何將錢包連接到使用者介面、呼叫智能合約來讀取資訊、將交易傳送到智能合約，以及監視智能合約的事件來識別變更。"
author: Ori Pomerantz
tags: [ "typescript", "反應", "vite", "wagmi", "前端" ]
skill: beginner
published: 2023-11-01
lang: zh-tw
sidebarDepth: 3
---

你找到了一個我們在以太坊生態系統中需要的功能。 你編寫了智能合約來實作它，甚至可能編寫了一些在鏈外執行的相關程式碼。 這太棒了！ 不幸的是，如果沒有使用者介面，你就不會有任何使用者。而且在你上一次寫網站的時候，人們還在使用撥接數據機，JavaScript 還是個新玩意兒。

這篇文章就是為你而寫的。 我假設你懂程式設計，可能也懂一點 JavaScript 和 HTML，但你的使用者介面技能已經生疏過時了。 我們將一起探討一個簡單的現代應用程式，讓你看看現在是怎麼做的。

## 為什麼這很重要 {#why-important}

理論上，你可以讓大家直接使用 [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) 或 [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) 來與你的合約互動。 對於經驗豐富的以太坊使用者來說，這很棒。 但我們正試圖為 [另外十億人](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion) 提供服務。 如果沒有出色的使用者體驗，這一切都不會發生，而友善的使用者介面是其中的重要一環。

## Greeter 應用程式 {#greeter-app}

現代 UI 的運作背後有很多理論，也有 [很多好的網站](https://react.dev/learn/thinking-in-react) [對此進行了解釋](https://wagmi.sh/core/getting-started)。 與其重複那些網站已經完成的出色工作，我假設你更喜歡從做中學，從一個你可以實際操作的應用程式開始。 你仍然需要理論來完成工作，我們也會談到它——我們將逐一檢視原始檔，並在遇到問題時進行討論。

### 安裝 {#installation}

1. 如有需要，請將 [Holesky 區塊鏈](https://chainlist.org/?search=holesky&testnets=true) 新增到你的錢包，並 [取得測試 ETH](https://www.holeskyfaucet.io/)。

2. 複製 GitHub 儲存庫。

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. 安裝必要的套件。

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. 啟動應用程式。

   ```sh
   pnpm dev
   ```

5. 瀏覽應用程式顯示的 URL。 在大多數情況下，它是 [http://localhost:5173/](http://localhost:5173/)。

6. 你可以在 [區塊鏈瀏覽器](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract) 上看到合約的原始碼，它是 Hardhat 的 Greeter 的一個稍作修改的版本。

### 檔案走查 {#file-walk-through}

#### `index.html` {#index-html}

這個檔案是標準的 HTML 樣板，除了這一行，它匯入了腳本檔案。

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

副檔名告訴我們這個檔案是一個用 [TypeScript](https://www.typescriptlang.org/) 編寫的 [React 元件](https://www.w3schools.com/react/react_components.asp)，TypeScript 是 JavaScript 的一個擴充，支援 [型別檢查](https://en.wikipedia.org/wiki/Type_system#Type_checking)。 TypeScript 會被編譯成 JavaScript，所以我們可以用它來進行用戶端執行。

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

匯入我們需要的庫程式碼。

```tsx
import { App } from './App'
```

匯入實作應用程式的 React 元件（見下文）。

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

建立根 React 元件。 `render` 的參數是 [JSX](https://www.w3schools.com/react/react_jsx.asp)，這是一種使用 HTML 和 JavaScript/TypeScript 的擴充語言。 這裡的驚嘆號告訴 TypeScript 元件：「你不知道 `document.getElementById('root')` 將會是 `ReactDOM.createRoot` 的一個有效參數，但別擔心——我是開發者，我告訴你它會是」。

```tsx
  <React.StrictMode>
```

應用程式將放在 [一個 `React.StrictMode` 元件](https://react.dev/reference/react/StrictMode) 內。 此元件會告訴 React 庫插入額外的偵錯檢查，這在開發過程中很有用。

```tsx
    <WagmiConfig config={config}>
```

應用程式也放在 [一個 `WagmiConfig` 元件](https://wagmi.sh/react/api/WagmiProvider) 內。 [wagmi (we are going to make it) 庫](https://wagmi.sh/) 將 React UI 定義與 [viem 庫](https://viem.sh/) 連接起來，用於編寫以太坊去中心化應用程式。

```tsx
      <RainbowKitProvider chains={chains}>
```

最後是 [一個 `RainbowKitProvider` 元件](https://www.rainbowkit.com/)。 此元件處理登入以及錢包和應用程式之間的通訊。

```tsx
        <App />
```

現在我們可以擁有應用程式的元件，它實際實作了 UI。 元件結尾的 `/>` 告訴 React，根據 XML 標準，此元件內部沒有任何定義。

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

當然，我們必須關閉其他元件。

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

這是建立 React 元件的標準方法——定義一個函式，每次需要渲染時都會呼叫它。 這個函式通常在頂部有一些 TypeScript 或 JavaScript 程式碼，後面跟著一個回傳 JSX 程式碼的 `return` 陳述式。

```tsx
  const { isConnected } = useAccount()
```

這裡我們使用 [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) 來檢查我們是否透過錢包連接到區塊鏈。

按照慣例，在 React 中，名為 `use...` 的函式是回傳某種資料的 [hook](https://www.w3schools.com/react/react_hooks.asp)。 當你使用這樣的 hook 時，你的元件不僅會取得資料，而且當該資料變更時，元件會用更新後的資訊重新渲染。

```tsx
  return (
    <>
```

React 元件的 JSX _必須_回傳一個元件。 當我們有多個元件，並且沒有任何東西可以「自然地」包裝它們時，我們使用一個空元件（`<> ...` </>`) 來將它們變成單一元件。

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

我們從 RainbowKit 取得 [`ConnectButton` 元件](https://www.rainbowkit.com/docs/connect-button)。 當我們未連接時，它會提供一個 `Connect Wallet` 按鈕，開啟一個說明錢包的強制回應視窗，讓你選擇使用哪一個錢包。 當我們連接時，它會顯示我們使用的區塊鏈、我們的帳戶地址和我們的 ETH 餘額。 我們可以使用這些顯示來切換網路或中斷連接。

```tsx
      {isConnected && (
```

當我們需要將實際的 JavaScript（或將被編譯為 JavaScript 的 TypeScript）插入 JSX 時，我們使用大括號（`{}`）。

`a && b` 語法是 [`a ?` 的簡寫 b : a`](https://www.w3schools.com/react/react_es6_ternary.asp)。 也就是說，如果 `a`為 true，它的評估結果為`b`，否則它的評估結果為 `a`（可以是 `false`、`0` 等）。 這是一種簡單的方法，可以告訴 React 只有在滿足特定條件時才顯示元件。

在這種情況下，我們只想在使用者連接到區塊鏈時向使用者顯示 `Greeter`。

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

這個檔案包含了大部分的 UI 功能。 它包含了一些通常會放在多個檔案中的定義，但因為這是一個教學，所以程式的最佳化目標是為了初次閱讀時容易理解，而不是為了效能或易於維護。

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

我們使用這些庫函式。 同樣，它們在下面使用到的地方會進行解釋。

```tsx
import { AddressType } from 'abitype'
```

[`abitype` 庫](https://abitype.dev/) 為我們提供了各種以太坊資料型別的 TypeScript 定義，例如 [`AddressType`](https://abitype.dev/config#addresstype)。

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

`Greeter` 合約的 ABI。
如果你同時開發合約和 UI，通常會將它們放在同一個儲存庫中，並將 Solidity 編譯器產生的 ABI 作為一個檔案用在你的應用程式中。 然而，在這裡這不是必要的，因為合約已經開發完成，不會再變更。

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript 是強型別的。 我們使用這個定義來指定 `Greeter` 合約在不同鏈上部署的地址。 鍵是一個數字（chainId），值是一個 `AddressType`（一個地址）。

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

合約在兩個支援的網路上的地址：[Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) 和 [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code)。

注意：實際上還有第三個定義，針對 Redstone Holesky，下面將會解釋。

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

這個型別被用作 `ShowObject` 元件（稍後解釋）的參數。 它包含物件的名稱和其值，這些是用於偵錯目的而顯示的。

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

在任何時候，我們可能知道問候語是什麼（因為我們從區塊鏈讀取了它），也可能不知道（因為我們還沒有收到它）。 所以有一個可以是字串或什麼都沒有的型別是很有用的。

##### `Greeter` 元件 {#greeter-component}

```tsx
const Greeter = () => {
```

最後，我們來定義元件。

```tsx
  const { chain } = useNetwork()
```

關於我們正在使用的鏈的資訊，由 [wagmi](https://wagmi.sh/react/hooks/useNetwork) 提供。
因為這是一個 hook (`use...`)，所以每次這個資訊變更時，元件都會被重新繪製。

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Greeter 合約的地址，它會因鏈而異（如果我們沒有鏈的資訊，或者我們在沒有該合約的鏈上，則為 `undefined`）。

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // 無引數
    watch: true
  })
```

[`useReadContract` hook](https://wagmi.sh/react/api/hooks/useReadContract) 從合約中讀取資訊。 你可以在 UI 中展開 `readResults` 來查看它回傳的確切資訊。 在這種情況下，我們希望它持續檢查，以便在問候語變更時得到通知。

**注意：** 我們可以監聽 [`setGreeting` 事件](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) 來得知問候語何時變更，並以此方式更新。 然而，雖然這樣可能更有效率，但它並不適用於所有情況。 當使用者切換到不同的鏈時，問候語也會變更，但此變更並無伴隨事件。 我們可以讓一部分程式碼監聽事件，另一部分來識別鏈的變更，但這會比僅僅設定 [`watch` 參數](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional) 更複雜。

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

React 的 [`useState` hook](https://www.w3schools.com/react/react_usestate.asp) 讓我們可以指定一個狀態變數，其值在元件的多次渲染之間保持不變。 初始值是參數，此處為空字串。

`useState` hook 回傳一個包含兩個值的清單：

1. 狀態變數的目前值。
2. 一個在需要時修改狀態變數的函式。 因為這是一個 hook，所以每次呼叫它時，元件都會重新渲染。

在這種情況下，我們使用一個狀態變數來儲存使用者想要設定的新問候語。

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

這是當新問候語輸入欄位變更時的事件處理常式。 型別 [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/) 指定這是一個 HTML 輸入元素值變更的處理常式。 使用 `<HTMLInputElement>` 部分是因為這是一個 [泛型型別](https://www.w3schools.com/typescript/typescript_basic_generics.php)。

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

這是從用戶端角度提交區塊鏈交易的過程：

1. 使用 [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) 將交易傳送到區塊鏈中的一個節點。
2. 等待節點的回應。
3. 收到回應後，要求使用者透過錢包簽署交易。 這一步驟_必須_在收到節點回應後進行，因為使用者在簽署交易前會看到交易的 gas 成本。
4. 等待使用者核准。
5. 再次傳送交易，這次使用 [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction)。

步驟 2 可能會花費一段可觀的時間，在此期間，使用者會想知道他們的指令是否真的被使用者介面接收到，以及為什麼還沒有被要求簽署交易。 這會造成不好的使用者體驗（UX）。

解決方案是使用 [prepare hook](https://wagmi.sh/react/prepare-hooks)。 每當參數變更時，立即向節點傳送 `eth_estimateGas` 請求。 然後，當使用者實際想要傳送交易時（在此例中是按下 **更新問候語**），gas 成本是已知的，使用者可以立即看到錢包頁面。

```tsx
  return (
```

現在我們終於可以建立要回傳的實際 HTML 了。

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

建立一個 `ShowGreeting` 元件（下面會解釋），但只有在成功從區塊鏈讀取問候語時才建立。

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

這是使用者可以設定新問候語的輸入文字欄位。 每當使用者按下一個鍵，我們就呼叫 `greetingChange`，它會再呼叫 `setNewGreeting`。 由於 `setNewGreeting` 來自 `useState` hook，它會導致 `Greeter` 元件再次被渲染。 這表示：

- 我們需要指定 `value` 來保留新問候語的值，否則它會變回預設的空字串。
- 每當 `newGreeting` 變更時，`usePrepareContractWrite` 就會被呼叫，這表示它在準備好的交易中永遠會擁有最新的 `newGreeting`。

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        更新問候語
      </button>
```

如果沒有 `workingTx.write`，那麼我們仍在等待傳送問候語更新所需的資訊，所以按鈕是停用的。 如果有 `workingTx.write` 值，那麼這就是傳送交易時要呼叫的函式。

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

最後，為了幫助你了解我們在做什麼，顯示我們使用的三個物件：

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting` 元件 {#showgreeting-component}

此元件顯示

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

一個元件函式接收一個包含該元件所有屬性的參數。

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject` 元件 {#showobject-component}

為了提供資訊，我們使用 `ShowObject` 元件來顯示重要的物件（`readResults` 用於讀取問候語，`preparedTx` 和 `workingTx` 用於我們建立的交易）。

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

我們不希望用所有資訊來塞滿 UI，所以為了可以檢視或關閉它們，我們使用了 [`details`](https://www.w3schools.com/tags/tag_details.asp) 標籤。

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

大部分的欄位都是使用 [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp) 來顯示的。

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          函式：
          <ul>
```

例外是函式，它們不是 [JSON 標準](https://www.json.org/json-en.html) 的一部分，所以必須分開顯示。

```tsx
          {funs.map((f, i) =>
```

在 JSX 中，`{` 大括號 `}` 內的程式碼會被解讀為 JavaScript。 然後，`(` 普通括號 `)` 內的程式碼會再次被解讀為 JSX。

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React 要求 [DOM 樹](https://www.w3schools.com/js/js_htmldom.asp) 中的標籤必須有不同的識別碼。 這表示同一個標籤的子標籤（在此例中為 [無序清單](https://www.w3schools.com/tags/tag_ul.asp)）需要有不同的 `key` 屬性。

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

結束各種 HTML 標籤。

##### 最後的 `export` {#the-final-export}

```tsx
export { Greeter }
```

我們需要為應用程式匯出的就是 `Greeter` 元件。

#### `src/wagmi.ts` {#wagmi-ts}

最後，與 WAGMI 相關的各種定義都在 `src/wagmi.ts` 中。 我不會在這裡解釋所有內容，因為大部分都是樣板程式碼，你不太可能需要變更。

這裡的程式碼與 [github 上的](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) 不完全相同，因為在文章後面我們會新增另一條鏈 ([Redstone Holesky](https://redstone.xyz/docs/network-info))。

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

匯入應用程式支援的區塊鏈。 你可以在 [viem 的 github](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions) 中看到支援的鏈的清單。

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

要能使用 [WalletConnect](https://walletconnect.com/)，你的應用程式需要一個專案 ID。 你可以在 [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in) 上取得它。

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### 新增另一條區塊鏈 {#add-blockchain}

現今有很多 [L2 擴展解決方案](/layer-2/)，你可能想要支援一些 viem 尚未支援的方案。 要做到這點，你需要修改 `src/wagmi.ts`。 這些說明解釋了如何新增 [Redstone Holesky](https://redstone.xyz/docs/network-info)。

1. 從 viem 匯入 `defineChain` 型別。

   ```ts
   import { defineChain } from 'viem'
   ```

2. 新增網路定義。

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. 將新鏈新增到 `configureChains` 呼叫中。

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. 確保應用程式知道你的合約在新網路上的地址。 在這種情況下，我們修改 `src/components/Greeter.tsx`：

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## 結論 {#conclusion}

當然，你並不是真的在乎為 `Greeter` 提供使用者介面。 你想要為你自己的合約建立一個使用者介面。 要建立你自己的應用程式，請執行以下步驟：

1. 指定建立一個 wagmi 應用程式。

   ```sh copy
   pnpm create wagmi
   ```

2. 為應用程式命名。

3. 選擇 **React** 框架。

4. 選擇 **Vite** 變體。

5. 你可以 [新增 Rainbow kit](https://www.rainbowkit.com/docs/installation#manual-setup)。

現在去讓你的合約為廣大世界所用吧。

[在此查看我的更多作品](https://cryptodocguy.pro/)。

