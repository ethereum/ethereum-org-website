---
title: "Web3 应用的服务器组件与代理"
description: "阅读本教程后，你将能够编写 TypeScript 服务器，监听区块链上的事件并使用自己的交易做出相应响应。这将使你能够编写中心化应用（因为服务器是一个单点故障），但可以与 Web3 实体进行交互。同样的技术也可用于编写在无需人工干预的情况下响应链上事件的代理。"

author: "奥里·波梅兰茨"
lang: zh
tags: ["代理", "服务器", "链下", "dapp"]
skill: beginner
breadcrumb: "服务器组件"
published: 2024-07-15
---

## 简介 {#introduction}

在大多数情况下，去中心化应用 (dapp) 使用服务器来分发软件，但所有实际的交互都发生在客户端（通常是 Web 浏览器）和区块链之间。

![Normal interaction between web server, client, and blockchain](./fig-1.svg)

然而，在某些情况下，应用程序会受益于拥有一个独立运行的服务器组件。这样的服务器将能够通过发出交易来响应事件以及来自其他来源（如 API）的请求。

![The interaction with the addition of a server](./fig-2.svg)

这样的服务器可以完成几个可能的任务。

- 秘密状态的持有者。在游戏中，不让玩家获取游戏已知的所有信息通常是有用的。然而，_区块链上没有秘密_，区块链上的任何信息都很容易被任何人弄清楚。因此，如果要对部分游戏状态保密，就必须将其存储在其他地方（并可能使用[零知识证明](/zero-knowledge-proofs)来验证该状态的影响）。

- 中心化预言机。如果风险足够低，一个在网上读取一些信息然后将其发布到链上的外部服务器可能就足以用作[预言机](/developers/docs/oracles/)。

- 代理。如果没有交易来激活，区块链上什么都不会发生。当机会出现时，服务器可以代表用户执行诸如[套利](/developers/docs/mev/#mev-examples-dex-arbitrage)等操作。

## 示例程序 {#sample-program}

你可以在 [GitHub 上](https://github.com/qbzzt/20240715-server-component)查看示例服务器。该服务器监听来自[此合约](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code)（Hardhat 的 Greeter 的修改版本）的事件。当问候语被更改时，它会将其改回来。

要运行它：

1. 克隆仓库。

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. 安装必要的包。如果你还没有安装，请[先安装 Node](https://nodejs.org/en/download/package-manager)。

   ```sh copy
   npm install
   ```

3. 编辑 `.env` 以指定在 Holesky 测试网上拥有 ETH 的账户的私钥。如果你在 Holesky 上没有 ETH，你可以[使用此水龙头](https://holesky-faucet.pk910.de/)。

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
   ```

4. 启动服务器。

   ```sh copy
   npm start
   ```

5. 前往[区块浏览器](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract)，并使用与拥有私钥的地址不同的地址修改问候语。你会看到问候语被自动改了回来。

### 它是如何工作的？ {#how-it-works}

了解如何编写服务器组件的最简单方法是逐行查看示例。

#### `src/app.ts` {#src-app-ts}

程序的绝大部分包含在 [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts) 中。

##### 创建先决条件对象

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

这些是我们需要的 [Viem](https://viem.sh/) 实体、函数和 [`Address` 类型](https://viem.sh/docs/glossary/types#address)。此服务器是用 [TypeScript](https://www.typescriptlang.org/) 编写的，它是 JavaScript 的一个扩展，使其成为[强类型](https://en.wikipedia.org/wiki/Strong_and_weak_typing)语言。

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[此函数](https://viem.sh/docs/accounts/privateKey)让我们能够生成与私钥对应的钱包信息，包括地址。

```typescript
import { holesky } from "viem/chains"
```

要在 Viem 中使用区块链，你需要导入其定义。在这种情况下，我们想要连接到 [Holesky](https://github.com/eth-clients/holesky) 测试区块链。

```typescript
// 这就是我们将 .env 中的定义添加到 process.env 的方法。
import * as dotenv from "dotenv"
dotenv.config()
```

这就是我们将 `.env` 读取到环境中的方式。我们需要它来获取私钥（见后文）。

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

要使用合约，我们需要它的地址和它的 [ABI](/glossary/#abi)。我们在这里提供了这两者。

在 JavaScript（以及 TypeScript）中，你不能为常量分配新值，但你_可以_修改存储在其中的对象。通过使用后缀 `as const`，我们告诉 TypeScript 该列表本身是常量，不可更改。

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

创建一个 Viem [公共客户端](https://viem.sh/docs/clients/public.html)。公共客户端没有附加的私钥，因此无法发送交易。它们可以调用 [`view` 函数](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm)、读取账户余额等。

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

环境变量可在 [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env) 中获取。然而，TypeScript 是强类型的。环境变量可以是任何字符串，也可以为空，因此环境变量的类型是 `string | undefined`。但是，密钥在 Viem 中被定义为 `0x${string}`（`0x` 后跟一个字符串）。在这里，我们告诉 TypeScript `PRIVATE_KEY` 环境变量将是该类型。如果不是，我们将得到一个运行时错误。

然后，[`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) 函数使用此私钥创建一个完整的账户对象。

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

接下来，我们使用账户对象创建一个[钱包客户端](https://viem.sh/docs/clients/wallet)。此客户端具有私钥和地址，因此可用于发送交易。

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

现在我们已经具备了所有先决条件，终于可以创建一个[合约实例](https://viem.sh/docs/contract/getContract)了。我们将使用此合约实例与链上合约进行通信。

##### 从区块链读取

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

只读的合约函数（[`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) 和 [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)）可在 `read` 下获取。在这种情况下，我们使用它来访问 [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217) 函数，该函数返回问候语。

JavaScript 是单线程的，因此当我们启动一个长时间运行的进程时，我们需要[指定我们异步执行它](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE)。调用区块链，即使是只读操作，也需要在计算机和区块链节点之间进行往返通信。这就是为什么我们在这里指定代码需要 `await`（等待）结果的原因。

如果你对它的工作原理感兴趣，可以[在这里阅读相关内容](https://www.w3schools.com/js/js_promise.asp)，但实际上你只需要知道，如果你启动一个需要很长时间的操作，你需要 `await` 结果，并且任何执行此操作的函数都必须声明为 `async`。

##### 发出交易

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

这是你调用以发出更改问候语的交易的函数。由于这是一个耗时的操作，该函数被声明为 `async`。由于内部实现的原因，任何 `async` 函数都需要返回一个 `Promise` 对象。在这种情况下，`Promise<any>` 意味着我们没有指定 `Promise` 中具体将返回什么。

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

合约实例的 `write` 字段包含所有写入区块链状态的函数（那些需要发送交易的函数），例如 [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862)。参数（如果有）以列表形式提供，该函数返回交易的哈希。

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

报告交易的哈希（作为在区块浏览器中查看它的 URL 的一部分）并将其返回。

##### 响应事件

```typescript
greeter.watchEvent.SetGreeting({
```

[`watchEvent` 函数](https://viem.sh/docs/actions/public/watchEvent)让你能够指定在发出事件时要运行的函数。如果你只关心一种类型的事件（在这种情况下是 `SetGreeting`），你可以使用此语法将自己限制为该事件类型。

```typescript
    onLogs: logs => {
```

当有日志条目时，将调用 `onLogs` 函数。在以太坊中，“日志”和“事件”通常是可以互换的。

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

可能会有多个事件，但为了简单起见，我们只关心第一个事件。`logs[0].args` 是事件的参数，在这种情况下是 `sender` 和 `greeting`。

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

如果发送者_不是_此服务器，请使用 `setGreeting` 更改问候语。

#### `package.json` {#package-json}

[此文件](https://github.com/qbzzt/20240715-server-component/blob/main/package.json)控制 [Node.js](https://nodejs.org/en) 配置。本文仅解释重要的定义。

```json
{
  "main": "dist/index.js",
```

此定义指定要运行的 JavaScript 文件。

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

脚本是各种应用程序操作。在这种情况下，我们唯一拥有的是 `start`，它编译然后运行服务器。`tsc` 命令是 `typescript` 包的一部分，用于将 TypeScript 编译为 JavaScript。如果你想手动运行它，它位于 `node_modules/.bin` 中。第二个命令运行服务器。

```json
  "type": "module",
```

有多种类型的 JavaScript Node 应用程序。`module` 类型允许我们在顶层代码中使用 `await`，这在执行缓慢（且异步）的操作时非常重要。

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

这些是仅在开发时需要的包。在这里我们需要 `typescript`，并且因为我们将其与 Node.js 一起使用，所以我们还获取了 Node 变量和对象的类型，例如 `process`。[`^<version>` 符号](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004)表示该版本或没有破坏性更改的更高版本。有关版本号含义的更多信息，请参见[此处](https://semver.org)。

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

这些是在运行时（运行 `dist/app.js` 时）所需的包。

## 结论 {#conclusion}

我们在这里创建的中心化服务器完成了它的工作，即充当用户的代理。任何其他希望 dapp 继续运行并愿意花费 Gas 的人都可以使用自己的地址运行服务器的新实例。

然而，这仅在中心化服务器的操作可以轻松验证时才有效。如果中心化服务器拥有任何秘密状态信息，或运行复杂的计算，它就是一个你需要信任才能使用该应用程序的中心化实体，这正是区块链试图避免的。在未来的文章中，我计划展示如何使用[零知识证明](/zero-knowledge-proofs)来解决这个问题。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。