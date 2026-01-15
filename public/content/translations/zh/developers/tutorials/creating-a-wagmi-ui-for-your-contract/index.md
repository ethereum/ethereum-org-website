---
title: "为您的合约构建用户界面"
description: "我们将使用 TypeScript、React、Vite 和 Wagmi 等现代组件来构建一个现代但简约的用户界面，并学习如何将钱包连接到用户界面、调用智能合约来读取信息、向智能合约发送交易以及监控来自智能合约的事件以识别更改。"
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "前端" ]
skill: beginner
published: 2023-11-01
lang: zh
sidebarDepth: 3
---

您在以太坊生态系统中找到了我们需要的功能。 您编写了智能合约来实现它，甚至可能编写了一些在链下运行的相关代码。 太好了！ 遗憾的是，如果没有用户界面，您就不会有任何用户，而且您上一次编写网站时，人们还在使用拨号调制解调器，JavaScript 还是个新事物。

本文就是为您准备的。 我假设您了解编程，或许还了解一些 JavaScript 和 HTML，但您的用户界面技能已经生疏和过时了。 我们将一起学习一个简单的现代应用，这样您就会知道现在是如何做的了。

## 为何这很重要 {#why-important}

理论上，您可以让人们使用 [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) 或 [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) 与您的合约进行交互。 对于经验丰富的以太坊用户来说，这很好。 但我们正努力为[另外十亿人](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion)服务。 如果没有出色的用户体验，这是不可能实现的，而友好的用户界面是其中的重要组成部分。

## Greeter 应用 {#greeter-app}

现代 UI 的工作原理背后有很多理论，也有[很多不错的网站](https://react.dev/learn/thinking-in-react)[对此进行了解释](https://wagmi.sh/core/getting-started)。 我不会重复那些网站已经做得很好的工作，而是假设您更喜欢通过实践来学习，并从一个您可以上手的应用开始。 您仍然需要理论来完成工作，我们稍后会讲到这一点——我们将逐个源文件进行讲解，并在讲到时进行讨论。

### 安装 {#installation}

1. 如有必要，请将 [Holesky 区块链](https://chainlist.org/?search=holesky&testnets=true) 添加到您的钱包并[获取测试 ETH](https://www.holeskyfaucet.io/)。

2. 克隆 github 仓库。

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. 安装必要的软件包。

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. 启动应用。

   ```sh
   pnpm dev
   ```

5. 浏览到应用显示的 URL。 在大多数情况下，该 URL 为 [http://localhost:5173/](http://localhost:5173/)。

6. 您可以在[区块链浏览器](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract)上看到合约源代码，它是 Hardhat Greeter 的略微修改版本。

### 文件演练 {#file-walk-through}

#### `index.html` {#index-html}

该文件是标准的 HTML 样板文件，但导入脚本文件的这一行除外。

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

文件扩展名告诉我们，这是一个用 [TypeScript](https://www.typescriptlang.org/) 编写的 [React 组件](https://www.w3schools.com/react/react_components.asp)，TypeScript 是 JavaScript 的一个扩展，支持[类型检查](https://en.wikipedia.org/wiki/Type_system#Type_checking)。 TypeScript 被编译成 JavaScript，因此我们可以用它来进行客户端执行。

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

导入我们需要的库代码。

```tsx
import { App } from './App'
```

导入实现该应用的 React 组件（见下文）。

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

创建根 React 组件。 `render` 的参数是 [JSX](https://www.w3schools.com/react/react_jsx.asp)，这是一种同时使用 HTML 和 JavaScript/TypeScript 的扩展语言。 这里的感叹号告诉 TypeScript 组件：“你不知道 `document.getElementById('root')` 是否会是 `ReactDOM.createRoot` 的有效参数，但别担心——我是开发者，我告诉你它会是”。

```tsx
  <React.StrictMode>
```

该应用将放在 [一个 `React.StrictMode` 组件](https://react.dev/reference/react/StrictMode)中。 该组件告诉 React 库插入额外的调试检查，这在开发过程中很有用。

```tsx
    <WagmiConfig config={config}>
```

该应用也位于 [一个 `WagmiConfig` 组件](https://wagmi.sh/react/api/WagmiProvider)中。 [Wagmi (we are going to make it) 库](https://wagmi.sh/) 将 React UI 定义与 [viem 库](https://viem.sh/)连接起来，用于编写以太坊去中心化应用程序。

```tsx
      <RainbowKitProvider chains={chains}>
```

最后，还有[一个 `RainbowKitProvider` 组件](https://www.rainbowkit.com/)。 此组件处理登录以及钱包和应用之间的通信。

```tsx
        <App />
```

现在我们可以为应用提供组件，该组件实际实现了 UI。 组件末尾的 `/>` 告诉 React，根据 XML 标准，该组件内部没有任何定义。

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

当然，我们必须关闭其他组件。

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

这是创建 React 组件的标准方法——定义一个函数，每次需要渲染时都会调用该函数。 这个函数通常在顶部有一些 TypeScript 或 JavaScript 代码，然后是一个返回 JSX 代码的 `return` 语句。

```tsx
  const { isConnected } = useAccount()
```

这里我们使用 [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) 来检查我们是否通过钱包连接到区块链。

按照惯例，在 React 中，名为 `use...` 的函数是返回某种数据的 [hooks](https://www.w3schools.com/react/react_hooks.asp)。 当您使用此类挂钩时，您的组件不仅会获取数据，而且当该数据更改时，组件会使用更新后的信息重新渲染。

```tsx
  return (
    <>
```

React 组件的 JSX _必须_返回一个组件。 当我们有多个组件并且没有任何东西可以“自然地”包装它们时，我们使用一个空组件 (`<> ...` </>`) 将它们变成单个组件。

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

我们从 RainbowKit 中获取 [`ConnectButton` 组件](https://www.rainbowkit.com/docs/connect-button)。 当我们未连接时，它会给我们一个“连接钱包”按钮，该按钮会打开一个模式窗口，解释什么是钱包，并让您选择使用哪一个。 当我们连接时，它会显示我们使用的区块链、我们的帐户地址和我们的 ETH 余额。 我们可以使用这些显示来切换网络或断开连接。

```tsx
      {isConnected && (
```

当我们需要将实际的 JavaScript（或将被编译成 JavaScript 的 TypeScript）插入到 JSX 中时，我们使用括号（`{}`）。

语法 `a && b` 是 [`a ?` 的缩写 b : a`](https://www.w3schools.com/react/react_es6_ternary.asp)。 也就是说，如果 `a`为真，则其值为`b`，否则其值为 `a`（可以是 `false`、`0` 等）。 这是一种告诉 React 组件只应在满足特定条件时才显示的简单方法。

在这种情况下，我们只想在用户连接到区块链时向用户显示 `Greeter`。

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

该文件包含大部分 UI 功能。 它包含通常会放在多个文件中的定义，但由于这是一个教程，程序被优化为第一次易于理解，而不是为了性能或易于维护。

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

我们使用这些库函数。 同样，在使用它们的地方，下面会进行解释。

```tsx
import { AddressType } from 'abitype'
```

[`abitype` 库](https://abitype.dev/)为我们提供了各种以太坊数据类型的 TypeScript 定义，例如 [`AddressType`](https://abitype.dev/config#addresstype)。

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

`Greeter` 合约的 ABI。
如果您同时开发合约和 UI，通常会将它们放在同一个仓库中，并使用 Solidity 编译器生成的 ABI 作为应用中的文件。 然而，这里没有必要这样做，因为合约已经开发完毕，不会再改变。

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript 是强类型的。 我们使用这个定义来指定 `Greeter` 合约在不同链上部署的地址。 键是数字（chainId），值是 `AddressType`（一个地址）。

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

合约在两个受支持网络上的地址：[Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) 和 [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code)。

注意：实际上还有第三个定义，针对 Redstone Holesky，将在下面解释。

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

此类型用作 `ShowObject` 组件的参数（稍后解释）。 它包括对象的名称及其值，用于调试目的。

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

在任何时候，我们都可能知道问候语是什么（因为我们从区块链中读取了它），也可能不知道（因为我们还没有收到它）。 因此，拥有一个可以是字符串或空的类型是很有用的。

##### `Greeter` 组件 {#greeter-component}

```tsx
const Greeter = () => {
```

最后，我们来定义这个组件。

```tsx
  const { chain } = useNetwork()
```

我们使用的链的信息，由 [wagmi](https://wagmi.sh/react/hooks/useNetwork) 提供。
因为这是一个钩子 (`use...`)，所以每当此信息发生变化时，组件都会被重新绘制。

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

Greeter 合约的地址，它因链而异（如果我们没有链信息或者我们在没有该合约的链上，它就是 `undefined`）。

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[`useReadContract` 钩子](https://wagmi.sh/react/api/hooks/useReadContract) 从合约中读取信息。 您可以在 UI 中展开 `readResults` 来确切地看到它返回了什么信息。 在这种情况下，我们希望它继续观察，以便在问候语更改时得到通知。

\*\*注意：\*\*我们可以监听 [`setGreeting` 事件](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs)来了解问候语何时更改并以这种方式进行更新。 然而，虽然这样可能更高效，但它并不适用于所有情况。 当用户切换到不同的链时，问候语也会改变，但这种改变并不伴随事件。 我们可以让一部分代码监听事件，另一部分识别链的变化，但这会比仅仅设置 [`watch` 参数](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional)更复杂。

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

React 的 [`useState` 钩子](https://www.w3schools.com/react/react_usestate.asp)允许我们指定一个状态变量，其值在组件的多次渲染之间保持不变。 初始值是参数，在本例中为空字符串。

`useState` 钩子返回一个包含两个值的列表：

1. 状态变量的当前值。
2. 一个在需要时修改状态变量的函数。 由于这是一个钩子，所以每次调用它时，组件都会重新渲染。

在这种情况下，我们使用一个状态变量来表示用户想要设置的新问候语。

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

这是新问候语输入字段发生变化时的事件处理程序。 类型 [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/) 指定这是 HTML 输入元素值变化的处理器。 之所以使用 `<HTMLInputElement>` 部分，是因为这是一个[泛型类型](https://www.w3schools.com/typescript/typescript_basic_generics.php)。

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

这是从客户端角度提交区块链交易的过程：

1. 使用 [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas) 将交易发送到区块链中的一个节点。
2. 等待节点的响应。
3. 收到响应后，请用户通过钱包签署交易。 这一步_必须_在收到节点响应后进行，因为在签名之前，用户会看到交易的 gas 成本。
4. 等待用户批准。
5. 再次发送交易，这次使用 [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction)。

第 2 步可能会花费一段可感知的时间，在此期间，用户会想知道他们的命令是否真的被用户界面接收到，以及为什么还没有要求他们签署交易。 这会造成糟糕的用户体验 (UX)。

解决方案是使用[准备钩子](https://wagmi.sh/react/prepare-hooks)。 每次参数更改时，立即向节点发送 `eth_estimateGas` 请求。 然后，当用户实际想要发送交易时（在本例中，通过按**更新问候语**），gas 成本是已知的，用户可以立即看到钱包页面。

```tsx
  return (
```

现在我们终于可以创建要返回的实际 HTML 了。

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

创建一个 `ShowGreeting` 组件（在下面解释），但前提是问候语已成功从区块链中读取。

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

这是用户可以设置新问候语的输入文本字段。 每次用户按下一个键，我们都会调用 `greetingChange`，它会调用 `setNewGreeting`。 由于 `setNewGreeting` 来自 `useState` 钩子，它会导致 `Greeter` 组件再次渲染。 这意味着：

- 我们需要指定 `value` 来保留新问候语的值，否则它将变回默认值，即空字符串。
- 每次 `newGreeting` 更改时都会调用 `usePrepareContractWrite`，这意味着它在准备好的交易中总是会有最新的 `newGreeting`。

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        更新问候语
      </button>
```

如果没有 `workingTx.write`，那么我们仍在等待发送问候语更新所需的信息，因此按钮是禁用的。 如果有一个 `workingTx.write` 值，那么这就是调用以发送交易的函数。

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

最后，为了帮助您了解我们在做什么，请显示我们使用的三个对象：

- `readResults`
- `preparedTx`
- `workingTx`

##### `ShowGreeting` 组件 {#showgreeting-component}

此组件显示

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

组件函数接收一个包含组件所有属性的参数。

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### `ShowObject` 组件 {#showobject-component}

为了提供信息，我们使用 `ShowObject` 组件来显示重要的对象（`readResults` 用于读取问候语，`preparedTx` 和 `workingTx` 用于我们创建的交易）。

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

我们不希望所有信息都杂乱地显示在 UI 中，因此为了能够查看或关闭它们，我们使用 [`details`](https://www.w3schools.com/tags/tag_details.asp) 标签。

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

大多数字段都是使用 [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp) 显示的。

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Functions:
          <ul>
```

唯一的例外是函数，它不属于 [JSON 标准](https://www.json.org/json-en.html)，因此必须单独显示。

```tsx
          {funs.map((f, i) =>
```

在 JSX 中，`{` 花括号 `}` 内的代码被解释为 JavaScript。 然后，`(` 圆括号 `)` 内的代码再次被解释为 JSX。

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React 要求 [DOM 树](https://www.w3schools.com/js/js_htmldom.asp)中的标签具有不同的标识符。 这意味着同一标签（在本例中为[无序列表](https://www.w3schools.com/tags/tag_ul.asp)）的子标签需要不同的 `key` 属性。

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

结束各种 HTML 标签。

##### 最终的 `export` {#the-final-export}

```tsx
export { Greeter }
```

`Greeter` 组件是我们需要为应用导出的组件。

#### `src/wagmi.ts` {#wagmi-ts}

最后，与 WAGMI 相关的各种定义都在 `src/wagmi.ts` 中。 我不会在这里解释所有内容，因为其中大部分是您不太可能需要更改的样板代码。

这里的代码与[在 github 上](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts)的代码不完全相同，因为在文章后面我们添加了另一条链（[Redstone Holesky](https://redstone.xyz/docs/network-info)）。

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

导入应用支持的区块链。 您可以在 [viem github](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions) 中查看支持的链的列表。

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

要使用 [WalletConnect](https://walletconnect.com/)，您需要为您的应用提供一个项目 ID。 您可以在 [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in) 上获取。

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

### 添加另一个区块链 {#add-blockchain}

如今有很多 [L2 扩容解决方案](/layer-2/)，您可能想支持一些 viem 尚不支持的方案。 要做到这一点，您需要修改 `src/wagmi.ts`。 这些说明解释了如何添加 [Redstone Holesky](https://redstone.xyz/docs/network-info)。

1. 从 viem 导入 `defineChain` 类型。

   ```ts
   import { defineChain } from 'viem'
   ```

2. 添加网络定义。

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

3. 将新链添加到 `configureChains` 调用中。

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. 确保应用知道您在新网络上的合约地址。 在这种情况下，我们修改 `src/components/Greeter.tsx`：

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

## 结论 {#conclusion}

当然，您并不真正关心为 `Greeter` 提供用户界面。 您想为自己的合约创建用户界面。 要创建您自己的应用，请执行以下步骤：

1. 指定创建 wagmi 应用。

   ```sh copy
   pnpm create wagmi
   ```

2. 为应用命名。

3. 选择 **React** 框架。

4. 选择 **Vite** 变体。

5. 您可以[添加 Rainbow kit](https://www.rainbowkit.com/docs/installation#manual-setup)。

现在去为您的合约创造一个全世界都能使用的界面吧。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。

