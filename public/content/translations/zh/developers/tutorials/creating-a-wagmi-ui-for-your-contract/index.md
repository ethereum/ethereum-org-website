---
title: "为你的合约构建用户界面"
description: 使用 TypeScript、React、Vite 和 Wagmi 等现代组件，我们将探讨一个现代但极简的用户界面，并学习如何将钱包连接到用户界面、调用智能合约读取信息、向智能合约发送交易，以及监控智能合约的事件以识别更改。
author: 奥里·波梅兰茨
tags:
  - typescript
  - react
  - vite
  - wagmi
  - 前端
skill: beginner
breadcrumb: 使用 WAGMI 构建 UI
published: 2023-11-01
lang: zh
sidebarDepth: 3
---

你在以太坊生态系统中发现了一个我们需要的功能。你编写了智能合约来实现它，甚至可能还编写了一些在链下运行的相关代码。这太棒了！不幸的是，如果没有用户界面，你就不会有任何用户，而且你上一次写网站时，人们还在使用拨号调制解调器，JavaScript 还是个新鲜事物。

这篇文章就是为你准备的。我假设你懂编程，也许还懂一点 JavaScript 和 HTML，但你的用户界面技能已经生疏且过时了。我们将一起探讨一个简单的现代应用，让你了解如今是如何实现这些的。

## 为什么这很重要 {#why-important}

理论上，你可以直接让人们使用 [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) 或 [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) 与你的合约进行交互。这对于经验丰富的以太坊用户来说很棒。但我们正试图服务[另外十亿人](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion)。如果没有出色的用户体验，这是不可能实现的，而友好的用户界面是其中的重要组成部分。

## Greeter 应用 {#greeter-app}

现代 UI 的工作原理背后有很多理论，并且有[许多优秀的网站](https://react.dev/learn/thinking-in-react)[对此进行了解释](https://wagmi.sh/core/getting-started)。我不会重复这些网站所做的出色工作，而是假设你更喜欢在实践中学习，并从一个你可以把玩的应用开始。你仍然需要理论知识来完成工作，我们稍后会讲到——我们将逐个查看源文件，并在遇到问题时进行讨论。

### 安装 {#installation}

1. 该应用使用 [Sepolia](https://sepolia.dev/) 测试网络。如有必要，请[获取 Sepolia 测试 ETH](/developers/docs/networks/#sepolia) 并[将 Sepolia 添加到你的钱包](https://chainlist.org/chain/11155111)。

2. 克隆 GitHub 仓库并安装必要的包。

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. 该应用使用免费的接入点，这些接入点存在性能限制。如果你想使用[节点即服务 (Node as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service/) 提供商，请替换 [`src/wagmi.ts`](#wagmi-ts) 中的 URL。

4. 启动应用。

   ```sh
   npm run dev
   ```

5. 浏览应用显示的 URL。在大多数情况下，它是 [http://localhost:5173/](http://localhost:5173/)。

6. 你可以[在区块链浏览器上](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code)查看合约源代码，这是 Hardhat 的 Greeter 的修改版本。

### 文件演练 {#file-walk-through}

#### `index.html` {#index-html}

除了导入脚本文件的这一行之外，此文件是一个标准的 HTML 样板。

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

文件扩展名表明这是一个用 [TypeScript](https://www.typescriptlang.org/) 编写的 [React 组件](https://www.w3schools.com/react/react_components.asp)，TypeScript 是支持[类型检查](https://en.wikipedia.org/wiki/Type_system#Type_checking)的 JavaScript 扩展。TypeScript 会被编译为 JavaScript，因此我们可以在客户端使用它。

解释此文件主要是为了满足你的兴趣。通常你不需要修改此文件，而是修改 [`src/App.tsx`](#app-tsx) 及其导入的文件。

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

导入我们需要的库代码。

```tsx
import App from './App.tsx'
```

导入实现该应用的 React 组件（见下文）。

```tsx
import { config } from './wagmi.ts'
```

导入 [Wagmi](https://wagmi.sh/) 配置，其中包括区块链配置。

```tsx
const queryClient = new QueryClient()
```

创建 [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) 缓存管理器的新实例。此对象将存储：

- 缓存的 RPC 调用
- 合约读取
- 后台重新获取状态

我们需要缓存管理器，因为 Wagmi v3 在内部使用了 React Query。

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

创建根 React 组件。`render` 的参数是 [JSX](https://www.w3schools.com/react/react_jsx.asp)，这是一种同时使用 HTML 和 JavaScript/TypeScript 的扩展语言。这里的感叹号告诉 TypeScript 组件：“你不知道 `document.getElementById('root')` 会是 `ReactDOM.createRoot` 的有效参数，但别担心——我是开发者，我告诉你它会是的”。

```tsx
  <React.StrictMode>
```

该应用将放在 [`React.StrictMode` 组件](https://react.dev/reference/react/StrictMode)内。此组件告诉 React 库插入额外的调试检查，这在开发过程中非常有用。

```tsx
    <WagmiProvider config={config}>
```

该应用也位于 [`WagmiProvider` 组件](https://wagmi.sh/react/api/WagmiProvider)内。[Wagmi（我们将要创建它）库](https://wagmi.sh/)将 React UI 定义与用于编写以太坊去中心化应用 (dapp) 的 [Viem 库](https://viem.sh/)连接起来。

```tsx
      <QueryClientProvider client={queryClient}>
```

最后，添加一个 React Query 提供程序，以便任何应用组件都可以使用缓存的查询。

```tsx
        <App />
```

现在我们可以拥有该应用的组件，它实际实现了 UI。组件末尾的 `/>` 告诉 React，根据 XML 标准，此组件内部没有任何定义。

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

当然，我们必须闭合其他组件。

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

导入我们需要的库，以及 [`Greeter` 组件](#greeter-tsx)。

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

Sepolia 链 ID。

```
function App() {
```

这是创建 React 组件的标准方法：定义一个在需要渲染时调用的函数。此函数通常包含 TypeScript 或 JavaScript 代码，后跟一个返回 JSX 代码的 `return` 语句。

```tsx
  const connection = useConnection()
```

使用 [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) 获取与当前连接相关的信息，例如地址和 `chainId`。

按照惯例，在 React 中名为 `use...` 的函数是[钩子 (hooks)](https://www.w3schools.com/react/react_hooks.asp)。这些函数不仅向组件返回数据；它们还确保在数据更改时重新渲染组件（再次执行组件函数，其输出替换 HTML 中的前一个输出）。

```tsx
  const { connectors, connect, status, error } = useConnect()
```

使用 [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) 获取有关钱包连接的信息。

```tsx
  const { disconnect } = useDisconnect()
```

[这个钩子](https://wagmi.sh/react/api/hooks/useDisconnect)为我们提供了断开钱包连接的函数。

```tsx
  const { switchChain } = useSwitchChain()
```

[这个钩子](https://wagmi.sh/react/api/hooks/useSwitchChain)让我们能够切换链。

```tsx
  useEffect(() => {
```

React 钩子 [`useEffect`](https://react.dev/reference/react/useEffect) 允许你在变量值更改时运行一个函数，以同步外部系统。

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

如果我们已连接，但未连接到 Sepolia 区块链，则切换到 Sepolia。

```tsx
  }, [connection.status, connection.chainId])
```

每次连接状态或连接 chainId 更改时，重新运行该函数。

```tsx
  return (
    <>
```

React 组件的 JSX **必须**返回单个 HTML 组件。当我们有多个组件并且不需要容器来包装它们时，我们使用一个空组件 (`<> ... </>`) 将它们组合成一个组件。

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

提供有关当前连接的信息。在 JSX 中，`{<expression>}` 表示将表达式作为 JavaScript 进行求值。

```tsx
      {connection.status === 'connected' && (
```

语法 `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`”。

这是在 JSX 中放置 if 语句的标准方法。

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX 遵循 XML 标准，该标准比 HTML 更严格。如果标签没有相应的结束标签，它**必须**在末尾有一个斜杠 (`/`) 来终止它。

这里我们有两个这样的标签，`<Greeter />`（它实际上包含与合约通信的 HTML 代码）和[表示水平线的 `<HTML-PLACEHOLDER-HTMLTAG-8d9513 />`](https://www.w3schools.com/tags/tag_hr.asp)。

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      )}
```

如果用户点击此按钮，则调用 `disconnect` 函数。

```tsx
      {connection.status !== 'connected' && (
```

如果我们**未**连接，则显示连接到钱包的必要选项。

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

在 `connectors` 中，我们有一个连接器列表。我们使用 [`map`](https://www.w3schools.com/jsref/jsref_map.asp) 将其转换为要显示的 JSX 按钮列表。

```tsx
            <button
              key={connector.uid}
```

在 JSX 中，“兄弟”标签（从同一个父级派生的标签）必须具有不同的标识符。

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

连接器按钮。

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
      )}
```

提供其他信息。表达式语法 `<variable>?.<field>` 告诉 JavaScript，如果定义了该变量，则求值为该字段。如果未定义该变量，则此表达式的求值结果为 `undefined`。

当没有错误时，表达式 `error.message` 会引发异常。使用 `error?.message` 可以让我们避免这个问题。

#### `src/Greeter.tsx` {#greeter-tsx}

此文件包含大部分 UI 功能。它包含通常会放在多个文件中的定义，但由于这是一个教程，该程序针对初次理解的易用性进行了优化，而不是针对性能或易维护性。

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

我们使用这些库函数。同样，它们将在下面使用它们的地方进行解释。

```tsx
import { AddressType } from 'abitype'
```

[`abitype` 库](https://abitype.dev/)为我们提供了各种以太坊数据类型的 TypeScript 定义，例如 [`AddressType`](https://abitype.dev/config#addresstype)。

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

`Greeter` 合约的 ABI。
如果你同时开发合约和 UI，通常会将它们放在同一个仓库中，并将 Solidity 编译器生成的 ABI 作为应用中的文件使用。但是，这里没有必要这样做，因为合约已经开发完毕且不会更改。

我们使用 [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) 告诉 TypeScript 这是一个**真正的**常量。通常，当你在 JavaScript 中指定 `const x = {"a": 1}` 时，你可以更改 `x` 中的值，只是不能对其进行赋值。

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript 是强类型的。我们使用此定义来指定 `Greeter` 合约在不同链上部署的地址。键是一个数字（chainId），值是一个 `AddressType`（一个地址）。

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

合约在 [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract) 上的地址。

##### `Timer` 组件 {#timer-component}

`Timer` 组件显示自给定时间以来的秒数。这对于可用性目的很重要。当用户执行某项操作时，他们期望立即得到反应。在区块链中，这通常是不可能的，因为在交易被放入区块之前什么都不会发生。一种解决方案是显示自用户执行操作以来已经过去了多长时间，以便用户可以决定所需的时间是否合理。

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

`Timer` 组件接受一个参数 `lastUpdate`，即最后一次操作的时间。

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

我们需要有状态（绑定到组件的变量）并更新它以使组件正常工作。但我们永远不需要读取它，所以不用费心去创建一个变量。

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) 函数允许我们安排一个函数定期运行。在这种情况下，每秒运行一次。该函数调用 `setNow` 来更新状态，因此 `Timer` 组件将被重新渲染。我们将它包装在具有空依赖项列表的 [`useEffect`](https://react.dev/reference/react/useEffect) 中，这样它只会发生一次，而不是每次渲染组件时都发生。

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

计算自上次更新以来的秒数并返回它。

##### `Greeter` 组件 {#greeter-component}

```tsx
const Greeter = () => {
```

最后，我们来定义组件。

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

有关我们正在使用的链和帐户的信息，由 [Wagmi](https://wagmi.sh/) 提供。因为这是一个钩子 (`use...`)，所以每当此信息更改时，组件都会重新渲染。

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

Greeter 合约的地址，如果我们没有链信息，或者我们在没有该合约的链上，则该地址为 `undefined`。

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // 无参数
  })
```

[`useReadContract` 钩子](https://wagmi.sh/react/api/hooks/useReadContract)调用[合约](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract)的 `greet` 函数。

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

React 的 [`useState` 钩子](https://www.w3schools.com/react/react_usestate.asp)允许我们指定一个状态变量，其值在组件的多次渲染之间保持不变。初始值是参数，在本例中为空字符串。

`useState` 钩子返回一个包含两个值的列表：

1. 状态变量的当前值。
2. 一个在需要时修改状态变量的函数。由于这是一个钩子，每次调用它时都会再次渲染组件。

在这种情况下，我们使用一个状态变量来存储用户想要设置的新问候语。

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

如果多个用户同时使用同一个合约，他们可能会覆盖彼此的问候语。在用户看来，这就像是应用出现了故障。如果应用显示最后是谁设置了问候语，用户就会知道是其他人设置的，并且应用运行正常。

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

用户喜欢看到他们的操作立即生效。然而，在区块链上情况并非如此。这些状态变量让我们至少可以向用户显示一些内容，以便他们知道他们的操作正在进行中。

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

如果上面的 `readResults` 更改了数据并且它没有设置为假值（例如 `undefined`），则将当前问候语更新为从区块链读取的问候语。同时，更新状态。

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

监听 `SetGreeting` 事件。

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` 表示如果值为 `false`，或者求值为假的任何值（例如 `undefined`、`0` 或空字符串），则整个表达式为 `false`。对于任何其他值，它为 `true`。这是一种将值转换为布尔值的方法，因为如果没有 `greeterAddr`，我们就不想监听事件。

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

当我们看到日志时（当我们看到新事件时会发生这种情况），这意味着问候语已被修改。在这种情况下，我们可以将 `currentGreeting` 和 `lastSetterAddress` 更新为新值。此外，我们还想更新状态显示。

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

当我们更新状态时，我们想做两件事：

1. 更新状态字符串 (`status`)
2. 将上次状态更新的时间 (`statusTime`) 更新为现在。

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

这是新问候语输入字段更改的事件处理程序。我们可以指定 `evt` 参数的类型，但 TypeScript 是一种类型可选的语言。由于此函数仅在 HTML 事件处理程序中调用一次，我认为没有必要。

```tsx
  const { writeContractAsync } = useWriteContract()
```

写入合约的函数。它类似于 [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts)，但支持更好的状态更新。

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

从客户端的角度来看，提交区块链交易的过程如下：

1. 使用 [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) 将交易发送到区块链中的节点。
2. 等待节点的响应。
3. 收到响应后，要求用户通过钱包签署交易。此步骤**必须**在收到节点响应后发生，因为在签署交易之前会向用户显示交易的 gas 成本。
4. 等待用户批准。
5. 再次发送交易，这次使用 [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction)。

第 2 步可能会花费可感知的时间，在此期间用户可能会想知道用户界面是否收到了他们的命令，以及为什么还没有要求他们签署交易。这会造成糟糕的用户体验 (UX)。

一种解决方案是每次参数更改时发送 `eth_estimateGas`。然后，当用户实际想要发送交易时（在本例中通过按 **Update greeting**），gas 成本是已知的，用户可以立即看到钱包页面。

```tsx
  return (
```

现在我们终于可以创建要返回的实际 HTML 了。

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

显示当前问候语。

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

如果我们知道最后是谁设置了问候语，则显示该信息。`Greeter` 不会跟踪此信息，并且我们不想回头查找 `SetGreeting` 事件，因此我们只有在运行期间更改问候语时才能获取它。

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

这是用户可以设置新问候语的输入文本字段。每次用户按下一个键时，我们都会调用 `greetingChange`，它会调用 `setNewGreeting`。由于 `setNewGreeting` 来自 `useState`，它会导致 `Greeter` 组件重新渲染。这意味着：

- 我们需要指定 `value` 来保留新问候语的值，否则它将恢复为默认值，即空字符串。
- 每次 `newGreeting` 更改时，`simulation` 也会更新，这意味着我们将获得具有正确问候语的模拟。这可能是相关的，因为 gas 成本取决于调用数据的大小，而调用数据的大小取决于字符串的长度。

```tsx
      <button disabled={!simulation.data}
```

只有当我们拥有发送交易所需的信息时，才启用该按钮。

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

更新状态。此时，用户需要在钱包中进行确认。

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` 仅在交易实际发送后返回。这让我们能够向用户显示交易等待被包含在区块链中的时间。

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

显示状态以及自更新以来已经过去了多长时间。

```
export {Greeter}
```

导出组件。

#### `src/wagmi.ts` {#wagmi-ts}

最后，与 Wagmi 相关的各种定义都在 `src/wagmi.ts` 中。我不会在这里解释所有内容，因为其中大部分都是你不太可能需要更改的样板代码。

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

Wagmi 配置包括此应用支持的链。你可以查看[可用链的列表](https://wagmi.sh/core/api/chains)。

```ts
  connectors: [
    injected(),
  ],
```

[这个连接器](https://wagmi.sh/core/api/connectors/injected)让我们能够与安装在浏览器中的钱包进行通信。

```ts
  transports: {
    [sepolia.id]: http()
```

Viem 附带的默认 HTTP 端点已经足够好了。如果我们想要不同的 URL，我们可以使用 `http("https:// hostname ")` 或 `webSocket("wss:// hostname ")`。

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## 添加另一个区块链 {#add-blockchain}

如今有很多 [L2 扩容解决方案](https://ethereum.org/layer-2/)，你可能想要支持一些 Viem 尚未支持的解决方案。为此，你需要修改 `src/wagmi.ts`。这些说明解释了如何添加 [Optimism Sepolia](https://chainlist.org/chain/11155420)。

1.  编辑 `src/wagmi.ts`

    A. 从 Viem 导入 `defineChain` 类型。

          ```ts
          import { defineChain } from 'viem'
          ```

    B. 添加网络定义。你实际上不需要为 Optimism Sepolia 执行此操作，[它已经在 `viem` 中了](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts)，但通过这种方式，你可以学习如何添加不在 `viem` 中的区块链。

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

    C. 将新链添加到 `createConfig` 调用中。

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

2.  编辑 `src/App.tsx` 以注释掉自动切换到 Sepolia 的代码。在生产系统上，你可能会显示带有指向你支持的每个区块链的链接的按钮。

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

3.  编辑 `src/Greeter.tsx` 以确保应用知道你的合约在新网络上的地址。

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  在你的浏览器中。

    A. 浏览到 [ChainList](https://chainlist.org/chain/11155420?testnets=true) 并点击表格右侧的按钮之一，将该链添加到你的钱包中。

    B. 在应用中，**断开连接 (Disconnect)**，然后重新连接以更改区块链。有更好的方法来处理这个问题，但它们需要更改应用。

## 结论 {#conclusion}

当然，你并不真正关心为 `Greeter` 提供用户界面。你想为你自己的合约创建用户界面。要创建你自己的应用，请执行以下步骤：

1. 指定创建一个 Wagmi 应用。

   ```sh copy
   npm create wagmi
   ```

2. 输入 `y` 继续。

3. 命名该应用。

4. 选择 **React** 框架。

5. 选择 **Vite** 变体。

现在去让你的合约在广阔的世界中可用吧。

[在这里查看我的更多作品](https://cryptodocguy.pro/)。