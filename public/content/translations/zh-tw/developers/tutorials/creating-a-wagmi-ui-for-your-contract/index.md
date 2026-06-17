---
title: "為你的合約建立使用者介面"
description: 使用 TypeScript、React、Vite 和 Wagmi 等現代元件，我們將探討一個現代但極簡的使用者介面，並學習如何將錢包連接到使用者介面、呼叫智慧合約以讀取資訊、發送交易至智慧合約，以及監控智慧合約的事件以識別變更。
author: 奧里·波梅蘭茨
tags:
  - typescript
  - react
  - vite
  - wagmi
  - 前端
skill: beginner
breadcrumb: 使用 WAGMI 的 UI
published: 2023-11-01
lang: zh-tw
sidebarDepth: 3
---

你在以太坊生態系中發現了一個我們需要的功能。你編寫了智慧合約來實作它，甚至可能還寫了一些在鏈下執行的相關程式碼。這太棒了！不幸的是，如果沒有使用者介面，你將不會有任何使用者，而且你上次寫網站時，人們還在使用撥接數據機，JavaScript 也才剛問世。

這篇文章就是為你準備的。我假設你懂程式設計，或許還懂一點 JavaScript 和 HTML，但你的使用者介面技能已經生疏且過時了。我們將一起探討一個簡單的現代應用程式，讓你了解現在是如何開發的。

## 為什麼這很重要 {#why-important}

理論上，你可以直接讓人們使用 [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) 或 [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) 來與你的合約互動。這對經驗豐富的以太坊使用者來說很棒。但我們正試圖服務[另外十億人](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion)。如果沒有良好的使用者體驗，這是不可能實現的，而友善的使用者介面正是其中的重要部分。

## Greeter 應用程式 {#greeter-app}

現代 UI 的運作原理背後有許多理論，而且有[許多優秀的網站](https://react.dev/learn/thinking-in-react)[對此進行了解釋](https://wagmi.sh/core/getting-started)。與其重複這些網站的精彩工作，我假設你更喜歡從做中學，並從一個你可以實際操作的應用程式開始。你仍然需要理論來完成工作，我們稍後會提到——我們將逐一檢視原始碼檔案，並在遇到時進行討論。

### 安裝 {#installation}

1. 該應用程式使用 [Sepolia](https://sepolia.dev/) 測試網路。如有需要，請[取得 Sepolia 測試 ETH](/developers/docs/networks/#sepolia) 並[將 Sepolia 新增至你的錢包](https://chainlist.org/chain/11155111)。

2. 複製 GitHub 儲存庫並安裝必要的套件。

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. 該應用程式使用免費的存取點，這會有性能限制。如果你想使用[節點即服務 (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) 供應商，請替換 [`src/wagmi.ts`](#wagmi-ts) 中的 URL。

4. 啟動應用程式。

   ```sh
   npm run dev
   ```

5. 瀏覽應用程式顯示的 URL。在大多數情況下，它是 [http://localhost:5173/](http://localhost:5173/)。

6. 你可以[在區塊鏈瀏覽器上](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code)查看合約原始碼，這是 Hardhat 的 Greeter 的修改版本。

### 檔案導覽 {#file-walk-through}

#### `index.html` {#index-html}

除了這行匯入指令碼檔案的程式碼外，此檔案是一個標準的 HTML 樣板。

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

檔案副檔名表示這是一個用 [TypeScript](https://www.typescriptlang.org/) 編寫的 [React 元件](https://www.w3schools.com/react/react_components.asp)，TypeScript 是支援[型別檢查](https://en.wikipedia.org/wiki/Type_system#Type_checking)的 JavaScript 擴充功能。TypeScript 會被編譯成 JavaScript，因此我們可以在用戶端使用它。

解釋這個檔案主要是為了滿足你的好奇心。通常你不需要修改這個檔案，而是修改 [`src/App.tsx`](#app-tsx) 以及它所匯入的檔案。

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

匯入我們需要的函式庫程式碼。

```tsx
import App from './App.tsx'
```

匯入實作應用程式的 React 元件（見下文）。

```tsx
import { config } from './wagmi.ts'
```

匯入 [Wagmi](https://wagmi.sh/) 設定，其中包含區塊鏈設定。

```tsx
const queryClient = new QueryClient()
```

建立一個 [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) 快取管理器的新實例。此物件將儲存：

- 快取的 RPC 呼叫
- 合約讀取
- 背景重新擷取狀態

我們需要快取管理器，因為 Wagmi v3 在內部使用了 React Query。

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

建立根 React 元件。`render` 的參數是 [JSX](https://www.w3schools.com/react/react_jsx.asp)，這是一種同時使用 HTML 和 JavaScript/TypeScript 的擴充語言。這裡的驚嘆號告訴 TypeScript 元件：「你不知道 `document.getElementById('root')` 會是 `ReactDOM.createRoot` 的有效參數，但別擔心——我是開發者，我告訴你它會是。」

```tsx
  <React.StrictMode>
```

應用程式將被放置在 [一個 `React.StrictMode` 元件](https://react.dev/reference/react/StrictMode)內。此元件告訴 React 函式庫插入額外的除錯檢查，這在開發過程中非常有用。

```tsx
    <WagmiProvider config={config}>
```

應用程式也位於 [一個 `WagmiProvider` 元件](https://wagmi.sh/react/api/WagmiProvider)內。[Wagmi（我們將要建立它）函式庫](https://wagmi.sh/)將 React UI 定義與用於編寫以太坊去中心化應用程式 (dapp) 的 [Viem 函式庫](https://viem.sh/)連接起來。

```tsx
      <QueryClientProvider client={queryClient}>
```

最後，新增一個 React Query 提供者，以便任何應用程式元件都可以使用快取的查詢。

```tsx
        <App />
```

現在我們可以擁有應用程式的元件，它實際實作了 UI。元件末尾的 `/>` 告訴 React，根據 XML 標準，此元件內部沒有任何定義。

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

當然，我們必須關閉其他元件。

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

匯入我們需要的函式庫，以及 [`Greeter` 元件](#greeter-tsx)。

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Sepolia 鏈 ID。

```
function App() {
```

這是建立 React 元件的標準方法：定義一個在需要渲染時被呼叫的函式。此函式通常包含 TypeScript 或 JavaScript 程式碼，接著是一個回傳 JSX 程式碼的 `return` 敘述。

```tsx
  const connection = useConnection()
```

使用 [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) 來取得與目前連線相關的資訊，例如地址和 `chainId`。

按照慣例，在 React 中名為 `use...` 的函式是 [hooks](https://www.w3schools.com/react/react_hooks.asp)。這些函式不僅會將資料回傳給元件；它們還能確保當資料變更時，元件會重新渲染（再次執行元件函式，並將其輸出替換 HTML 中先前的輸出）。

```tsx
  const { connectors, connect, status, error } = useConnect()
```

使用 [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) 來取得有關錢包連線的資訊。

```tsx
  const { disconnect } = useDisconnect()
```

[這個 hook](https://wagmi.sh/react/api/hooks/useDisconnect) 提供了我們中斷錢包連線的函式。

```tsx
  const { switchChain } = useSwitchChain()
```

[這個 hook](https://wagmi.sh/react/api/hooks/useSwitchChain) 讓我們可以切換鏈。

```tsx
  useEffect(() => {
```

React hook [`useEffect`](https://react.dev/reference/react/useEffect) 讓你在變數值變更時執行一個函式，以同步外部系統。

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

如果我們已連線，但不是連線到 Sepolia 區塊鏈，則切換到 Sepolia。

```tsx
  }, [connection.status, connection.chainId])
```

每次連線狀態或連線 chainId 變更時，重新執行該函式。

```tsx
  return (
    <>
```

React 元件的 JSX _必須_回傳單一 HTML 元件。當我們有多個元件且不需要容器來包裝它們時，我們使用一個空元件 (`<> ... </>`) 將它們組合成單一元件。

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
      </div>
```

提供有關目前連線的資訊。在 JSX 中，`{<expression>}` 表示將該表達式作為 JavaScript 進行求值。

```tsx
      {connection.status === 'connected' && (
```

語法 `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`」。

這是將 if 敘述放入 JSX 中的標準方法。

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX 遵循 XML 標準，這比 HTML 更嚴格。如果標籤沒有對應的結束標籤，它_必須_在末尾加上斜線 (`/`) 來終止它。

這裡我們有兩個這樣的標籤，`<Greeter />`（它實際上包含與合約通訊的 HTML 程式碼）和[代表水平線的 `<HTML-PLACEHOLDER-HTMLTAG-8d9513 />`](https://www.w3schools.com/tags/tag_hr.asp)。

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      )}
```

如果使用者點擊此按鈕，則呼叫 `disconnect` 函式。

```tsx
      {connection.status !== 'connected' && (
```

如果我們_尚未_連線，則顯示連接到錢包的必要選項。

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

在 `connectors` 中，我們有一個連接器清單。我們使用 [`map`](https://www.w3schools.com/jsref/jsref_map.asp) 將其轉換為要顯示的 JSX 按鈕清單。

```tsx
            <button
              key={connector.uid}
```

在 JSX 中，「兄弟」標籤（來自同一個父層的標籤）必須具有不同的識別碼。

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

連接器按鈕。

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
      )}
```

提供額外資訊。表達式語法 `<variable>?.<field>` 告訴 JavaScript，如果變數已定義，則求值為該欄位。如果變數未定義，則此表達式求值為 `undefined`。

當沒有錯誤時，表達式 `error.message` 會引發例外狀況。使用 `error?.message` 可以讓我們避免這個問題。

#### `src/Greeter.tsx` {#greeter-tsx}

此檔案包含大部分的 UI 功能。它包含了通常會放在多個檔案中的定義，但由於這是一個教學課程，程式經過最佳化，以便於初次理解，而不是為了效能或易於維護。

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

我們使用這些函式庫函式。同樣地，它們會在下方使用到的地方進行解釋。

```tsx
import { AddressType } from 'abitype'
```

[`abitype` 函式庫](https://abitype.dev/)為我們提供了各種以太坊資料型別的 TypeScript 定義，例如 [`AddressType`](https://abitype.dev/config#addresstype)。

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

`Greeter` 合約的 ABI。
如果你同時開發合約和 UI，通常會將它們放在同一個儲存庫中，並將 Solidity 編譯器產生的 ABI 作為應用程式中的檔案使用。然而，這裡不需要這樣做，因為合約已經開發完成且不會變更。

我們使用 [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) 來告訴 TypeScript 這是一個_真正的_常數。通常，當你在 JavaScript 中指定 `const x = {"a": 1}` 時，你可以變更 `x` 中的值，只是不能對其進行賦值。

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript 是強型別的。我們使用此定義來指定 `Greeter` 合約在不同鏈上部署的地址。鍵是一個數字 (chainId)，而值是一個 `AddressType`（一個地址）。

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

合約在 [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) 上的地址。

##### `Timer` 元件 {#timer-component}

`Timer` 元件顯示自給定時間以來的秒數。這對於可用性目的很重要。當使用者執行某項操作時，他們期望立即得到反應。在區塊鏈中，這通常是不可能的，因為在交易被放入區塊之前什麼都不會發生。一種解決方案是顯示自使用者執行操作以來經過了多長時間，以便使用者可以決定所需的時間是否合理。

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` 元件接受一個參數 `lastUpdate`，這是最後一次操作的時間。

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

我們需要有狀態（與元件綁定的變數）並更新它，以便元件能正確運作。但我們永遠不需要讀取它，所以不用費心去建立一個變數。

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) 函式讓我們可以排程一個函式定期執行。在這個例子中，是每秒執行一次。該函式呼叫 `setNow` 來更新狀態，因此 `Timer` 元件將被重新渲染。我們將其包裝在帶有空相依性清單的 [`useEffect`](https://react.dev/reference/react/useEffect) 中，這樣它就只會發生一次，而不是每次渲染元件時都發生。

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

計算自上次更新以來的秒數並回傳。

##### `Greeter` 元件 {#greeter-component}

```tsx
const Greeter = () => {
```

最後，我們來定義這個元件。

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

關於我們正在使用的鏈和帳戶的資訊，由 [Wagmi](https://wagmi.sh/) 提供。因為這是一個 hook (`use...`)，所以每當此資訊變更時，元件都會重新渲染。

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Greeter 合約的地址，如果我們沒有鏈資訊，或者我們所在的鏈沒有該合約，則為 `undefined`。

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // 無參數
  })
```

[`useReadContract` hook](https://wagmi.sh/react/api/hooks/useReadContract) 呼叫[合約](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract)的 `greet` 函式。

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React 的 [`useState` hook](https://www.w3schools.com/react/react_usestate.asp) 讓我們可以指定一個狀態變數，其值在元件的多次渲染之間保持不變。初始值是參數，在這個例子中是空字串。

`useState` hook 回傳一個包含兩個值的清單：

1. 狀態變數的目前值。
2. 一個在需要時修改狀態變數的函式。由於這是一個 hook，每次呼叫它時，元件都會再次渲染。

在這個例子中，我們使用一個狀態變數來儲存使用者想要設定的新問候語。

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

如果多個使用者同時使用同一個合約，他們可能會覆寫彼此的問候語。這對使用者來說，看起來就像應用程式發生故障。如果應用程式顯示最後是誰設定了問候語，使用者就會知道是其他人做的，且應用程式運作正常。

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

使用者喜歡看到他們的操作立即產生效果。然而，在區塊鏈上並非如此。這些狀態變數讓我們至少能向使用者顯示一些內容，讓他們知道他們的操作正在進行中。

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

如果上方的 `readResults` 變更了資料，且未設定為 false 值（例如 `undefined`），則將目前的問候語更新為從區塊鏈讀取的問候語。同時，更新狀態。

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

監聽 `SetGreeting` 事件。

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` 表示如果值為 `false`，或求值為 false 的值（例如 `undefined`、`0` 或空字串），則整個表達式為 `false`。對於任何其他值，它都是 `true`。這是一種將值轉換為布林值的方法，因為如果沒有 `greeterAddr`，我們就不想監聽事件。

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

當我們看到日誌時（這發生在我們看到新事件時），這意味著問候語已被修改。在這種情況下，我們可以將 `currentGreeting` 和 `lastSetterAddress` 更新為新值。此外，我們也想更新狀態顯示。

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

當我們更新狀態時，我們想做兩件事：

1. 更新狀態字串 (`status`)
2. 將最後狀態更新時間 (`statusTime`) 更新為現在。

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

這是新問候語輸入欄位變更的事件處理常式。我們可以指定 `evt` 參數的型別，但 TypeScript 是一種型別可選的語言。由於此函式只在 HTML 事件處理常式中被呼叫一次，我認為沒有必要。

```tsx
  const { writeContractAsync } = useWriteContract()
```

寫入合約的函式。它類似於 [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts)，但能提供更好的狀態更新。

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

從用戶端角度來看，提交區塊鏈交易的過程如下：

1. 使用 [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) 將交易發送至區塊鏈中的節點。
2. 等待節點的回應。
3. 收到回應後，要求使用者透過錢包簽署交易。此步驟_必須_在收到節點回應後發生，因為在簽署之前，會向使用者顯示交易的 gas 成本。
4. 等待使用者核准。
5. 再次發送交易，這次使用 [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction)。

步驟 2 可能會花費一段可察覺的時間，在此期間，使用者可能會懷疑使用者介面是否收到了他們的指令，以及為什麼還沒有要求他們簽署交易。這會造成糟糕的使用者體驗 (UX)。

一種解決方案是每次參數變更時都發送 `eth_estimateGas`。然後，當使用者實際想要發送交易時（在這個例子中是按下 **Update greeting**），gas 成本已經知道了，使用者可以立即看到錢包頁面。

```tsx
  return (
```

現在我們終於可以建立要回傳的實際 HTML 了。

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

顯示目前的問候語。

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

如果我們知道最後是誰設定了問候語，則顯示該資訊。`Greeter` 不會追蹤此資訊，而且我們不想回頭尋找 `SetGreeting` 事件，因此我們只有在執行期間問候語被變更時才會取得它。

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

這是使用者可以設定新問候語的輸入文字欄位。每次使用者按下按鍵時，我們都會呼叫 `greetingChange`，它會呼叫 `setNewGreeting`。由於 `setNewGreeting` 來自 `useState`，它會導致 `Greeter` 元件被重新渲染。這意味著：

- 我們需要指定 `value` 來保留新問候語的值，否則它會變回預設值（空字串）。
- 每次 `newGreeting` 變更時，`simulation` 也會更新，這意味著我們將獲得帶有正確問候語的模擬。這可能是相關的，因為 gas 成本取決於呼叫資料的大小，而呼叫資料的大小又取決於字串的長度。

```tsx
      <button disabled={!simulation.data}
```

只有在我們獲得發送交易所需的資訊後，才啟用該按鈕。

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

更新狀態。此時，使用者需要在錢包中進行確認。

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` 只有在交易實際發送後才會回傳。這讓我們可以向使用者顯示交易等待被包含在區塊鏈中的時間。

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

顯示狀態以及自更新以來經過了多長時間。

```
export {Greeter}
```

匯出元件。

#### `src/wagmi.ts` {#wagmi-ts}

最後，與 Wagmi 相關的各種定義都在 `src/wagmi.ts` 中。我不會在這裡解釋所有內容，因為其中大部分都是你不太可能需要變更的樣板程式碼。

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Wagmi 設定包含此應用程式支援的鏈。你可以查看[可用鏈的清單](https://wagmi.sh/core/api/chains)。

```ts
  connectors: [
    injected(),
  ],
```

[這個連接器](https://wagmi.sh/core/api/connectors/injected)讓我們可以與安裝在瀏覽器中的錢包進行通訊。

```ts
  transports: {
    [sepolia.id]: http()
```

Viem 隨附的預設 HTTP 端點已經夠好了。如果我們想要不同的 URL，我們可以使用 `http("https:// hostname ")` 或 `webSocket("wss:// hostname ")`。

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## 新增另一個區塊鏈 {#add-blockchain}

現在有許多 [L2 擴容解決方案](https://ethereum.org/layer-2/)，你可能想要支援一些 Viem 尚未支援的方案。為此，你需要修改 `src/wagmi.ts`。這些指示說明了如何新增 [Optimism Sepolia](https://chainlist.org/chain/11155420)。

1.  編輯 `src/wagmi.ts`

    A. 從 Viem 匯入 `defineChain` 型別。

          ```ts
          import { defineChain } from 'viem'
          ```

    B. 新增網路定義。你其實不需要為 Optimism Sepolia 這樣做，[它已經在 `viem` 中了](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts)，但透過這種方式，你可以學習如何新增不在 `viem` 中的區塊鏈。

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    C. 將新鏈新增至 `createConfig` 呼叫中。

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  編輯 `src/App.tsx` 以註解掉自動切換到 Sepolia 的功能。在正式環境系統上，你可能會顯示帶有連結的按鈕，指向你支援的每個區塊鏈。

    ```ts
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  編輯 `src/Greeter.tsx` 以確保應用程式知道你的合約在新網路上的地址。

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  在你的瀏覽器中。

    A. 瀏覽至 [ChainList](https://chainlist.org/chain/11155420?testnets=true)，然後點擊表格右側的其中一個按鈕，將該鏈新增至你的錢包。

    B. 在應用程式中，點擊 **Disconnect**（中斷連線），然後重新連線以變更區塊鏈。有更好的方法來處理這個問題，但這需要修改應用程式。

## 結論 {#conclusion}

當然，你並不真的在乎為 `Greeter` 提供使用者介面。你想要為自己的合約建立使用者介面。要建立你自己的應用程式，請執行以下步驟：

1. 指定建立一個 Wagmi 應用程式。

   ```sh copy
   npm create wagmi
   ```

2. 輸入 `y` 繼續。

3. 為應用程式命名。

4. 選擇 **React** 框架。

5. 選擇 **Vite** 變體。

現在，去讓你的合約能被全世界使用吧。

[點此查看更多我的作品](https://cryptodocguy.pro/)。