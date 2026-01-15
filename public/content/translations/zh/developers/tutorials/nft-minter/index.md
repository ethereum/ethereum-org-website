---
title: 非同质化代币铸币机教程
description: 在本教程中，你将构建一个非同质化代币铸币机，并学习如何通过使用 MetaMask 和 Web3 工具将智能合约连接到 React 前端来创建全栈去中心化应用程序。
author: "smudgil"
tags:
  [
    "Solidity",
    "非同质化代币",
    "Alchemy",
    "智能合同",
    "前端",
    "Pinata"
  ]
skill: intermediate
lang: zh
published: 2021-10-06
---

对于具有 Web2 背景的开发者来说，最大的挑战之一是弄清楚如何将智能合约连接到前端项目并与之交互。

通过构建非同质化代币铸币机 — 一个可以用来输入数字资产链接、名称与描述的简单用户界面 — 你将学会如何：

- 通过你的前端项目连接到 MetaMask
- 在前端调用智能合约的方法
- 使用 MetaMask 签署交易

在本教程中，我们将使用 [React](https://react.dev/) 作为我们的前端框架。 由于本教程主要侧重于 Web3 开发，我们不会花太多时间来细讲 React 基础知识。 相反，我们将专注于为项目添加功能。

作为先决条件，你应该对 React 有入门水平的认识 — 了解组件、属性、useState/useEffect 和基本函数调用是如何工作的。 如果你以前从未听说过这些术语，不妨看看这篇 [React 入门教程](https://react.dev/learn/tutorial-tic-tac-toe)。 对于视觉型学习者，我们强烈推荐 Net Ninja 推出的这个优秀的[现代 React 完整教程](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)视频系列。

如果你还没有 Alchemy 帐户，你肯定需要一个来完成本教程以及在区块链上完成任何构建。 请[在此](https://alchemy.com/)注册一个免费帐户。

事不宜迟，让我们开始吧！

## NFT 制作入门 {#making-nfts-101}

在我们开始考虑任何代码之前，了解非同质化代币的工作原理非常重要。 它包括两个步骤：

### 在以太坊区块链上发布 NFT 智能合约 {#publish-nft}

两种非同质化代币智能合约标准的最大区别在于，ERC-1155 是多代币标准且包含批量功能，而 ERC-721 是单代币标准，因此仅支持一次转账一个代币。

### 调用铸币函数 {#minting-function}

通常，这个铸币函数需要你传入两个变量作为参数：第一个是 `recipient`，它指定将接收你新铸造的 NFT 的地址；第二个是 NFT 的 `tokenURI`，它是一个字符串，可解析为描述此 NFT 元数据的 JSON 文档。

非同质化代币的元数据是其核心所在，使它拥有多种属性，例如名称、描述、图像（或不同的数字资产）及其他特性。 这是一个 `tokenURI` 的[示例](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)，其中包含某个 NFT 的元数据。

在本教程中，我们将重点关注第 2 部分，使用我们的 React UI 调用现有的非同质化代币智能合约铸币函数。

本教程中我们将调用的 ERC-721 NFT 智能合约的[链接在此](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)。 如果你想了解我们是如何制作它的，我们强烈建议你查看我们的另一篇教程：[“如何创建 NFT”](https://www.alchemy.com/docs/how-to-create-an-nft)。

太好了，现在我们已经了解了非同质化代币的工作原理，我们来克隆我们的启动文件！

## 克隆启动文件 {#clone-the-starter-files}

首先，访问 [nft-minter-tutorial GitHub 仓库](https://github.com/alchemyplatform/nft-minter-tutorial)以获取本项目的启动文件。 将此仓库克隆到你的本地环境中。

打开这个克隆的 `nft-minter-tutorial` 仓库后，你会发现它包含两个文件夹：`minter-starter-files` 和 `nft-minter`。

- `minter-starter-files` 包含此项目的启动文件（主要是 React UI）。 在本教程中，**我们将在该目录中工作**，你将学习如何通过将其连接到你的以太坊钱包和 NFT 智能合约来激活此 UI。
- `nft-minter` 包含完整的教程，**如果你遇到困难**，可以作为**参考**。

接下来，在你的代码编辑器中打开 `minter-starter-files` 的副本，然后导航到 `src` 文件夹。

我们将编写的所有代码都将存放在 `src` 文件夹下。 我们将编辑 `Minter.js` 组件并编写额外的 javascript 文件，为我们的项目提供 Web3 功能。

## 第 2 步：查看我们的启动文件 {#step-2-check-out-our-starter-files}

在我们开始编码之前，必须检查起始文件中已经为我们提供了什么。

### 运行你的 React 项目 {#get-your-react-project-running}

首先在浏览器中运行 React 项目。 React 的美妙之处在于，一旦我们的项目在浏览器中运行，保存的任何更改都会在浏览器中实时更新。

要运行项目，请导航到 `minter-starter-files` 文件夹的根目录，然后在终端中运行 `npm install` 来安装项目的依赖项：

```bash
cd minter-starter-files
npm install
```

安装完成后，在终端中运行 `npm start`：

```bash
npm start
```

运行后，http://localhost:3000/ 应该在浏览器中打开，你可以在其中看到项目前端。 其中应该包括 3 个字段：一个用于输入非同质化代币资产的链接、一个用于输入非同质化代币的名称，一个提供描述。

如果你尝试点击“Connect Wallet”或“Mint NFT”按钮，你会发现它们不起作用 — 那是因为我们仍然需要对它们的功能进行编程！ :\)

### `Minter.js` 组件 {#minter-js}

\*\*注意：\*\*请确保你位于 `minter-starter-files` 文件夹，而不是 `nft-minter` 文件夹！

让我们在编辑器中返回 `src` 文件夹，并打开 `Minter.js` 文件。 理解该文件中的所有内容非常重要，因为它是我们将要处理的主要 React 组件。

在该文件的顶部，有我们将在特定事件后更新的状态变量。

```javascript
//状态变量
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

从未听过 React 状态变量或状态挂钩？ 查看[这些](https://legacy.reactjs.org/docs/hooks-state.html)文档。

以下是每个变量的含义：

- `walletAddress` - 存储用户钱包地址的字符串
- `status` - 包含要显示在 UI 底部的消息的字符串
- `name` - 存储 NFT 名称的字符串
- `description` - 存储 NFT 描述的字符串
- `url` - 指向 NFT 数字资产链接的字符串

在状态变量之后，你会看到三个未实现的函数：`useEffect`、`connectWalletPressed` 和 `onMintPressed`。 你会注意到所有这些函数都是 `async` 的，这是因为我们将在其中进行异步 API 调用！ 它们的名称与功能同名：

```javascript
useEffect(async () => {
  //待办：实现
}, [])

const connectWalletPressed = async () => {
  //待办：实现
}

const onMintPressed = async () => {
  //待办：实现
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - 这是一个 React 钩子，在组件渲染后调用。 因为它传入了一个空数组 `[]` 属性（见第 3 行），所以它只会在组件_首次_渲染时被调用。 在这里，我们将调用钱包监听器和另一个钱包函数，来更新我们的用户界面以指示钱包是否已经连接。
- `connectWalletPressed` - 此函数将被调用，以将用户的 MetaMask 钱包连接到我们的去中心化应用程序。
- `onMintPressed` - 此函数将被调用，以铸币用户的 NFT。

在接近该文件末尾处，我们获得我们组件的用户界面。 如果你仔细查看此代码，你会注意到当相应文本字段中的输入发生变化时，我们会更新 `url`、`name` 和 `description` 状态变量。

你还会看到，当分别点击 ID 为 `mintButton` 和 `walletButton` 的按钮时，会调用 `connectWalletPressed` 和 `onMintPressed`。

```javascript
//我们组件的 UI
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "已连接：" +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>连接钱包</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT 铸币器</h1>
    <p>
      只需添加你的资产链接、名称和描述，然后按“铸币”。
    </p>
    <form>
      <h2>🖼 资产链接：</h2>
      <input
        type="text"
        placeholder="例如，https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 名称：</h2>
      <input
        type="text"
        placeholder="例如，我的第一个 NFT！"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ 描述：</h2>
      <input
        type="text"
        placeholder="例如，比加密猫还酷 ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      铸币 NFT
    </button>
    <p id="status">{status}</p>
  </div>
)
```

最后，我们来看看这个铸币机组件是在哪里添加的。

如果你转到 `App.js` 文件（它是 React 中的主组件，充当所有其他组件的容器），你会看到我们的 Minter 组件在第 7 行被注入。

**在本教程中，我们将只编辑 `Minter.js file` 文件，并在我们的 `src` 文件夹中添加文件。**

我们已经了解了我们正在进行的操作，现在我们来设置我们的以太坊钱包！

## 设置你的以太坊钱包 {#set-up-your-ethereum-wallet}

为了让用户能够与你的智能合约交互，他们需要将其以太坊钱包连接到你的去中心化应用程序。

### 下载 MetaMask {#download-metamask}

在本教程中，我们将使用 MetaMask，它是浏览器中的虚拟钱包，用来管理你的以太坊帐户地址。 如果你想进一步了解以太坊上的交易如何运作，请查看[此页面](/developers/docs/transactions/)。

你可以[在此处](https://metamask.io/download)免费下载和创建 MetaMask 帐户。 在创建帐户时，或者如果你已经有一个帐户，确保切换到右上角的“Ropsten 测试网络”\（这样我们就不会交易真正的钱币\）。

### 从水龙头获取以太币 {#add-ether-from-faucet}

为了铸造我们的非同质化代币（或在以太坊区块链上签署任何交易），我们需要一些虚拟以太币。 要获取 Eth，你可以前往 [Ropsten 水龙头](https://faucet.ropsten.be/) 并输入你的 Ropsten 帐户地址，然后点击“Send Ropsten Eth”。 你应该会很快在你的 MetaMask 帐户中看到以太币！

### 检查你的余额 {#check-your-balance}

为了仔细检查我们的余额，让我们使用 [Alchemy 的 composer 工具](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) 发出一个 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 请求。 这将返回我们钱包中的以太币数量。 输入你的 MetaMask 帐户地址并点击“Send Request”后，你应该会看到这样的响应：

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

\*\*注意：\*\*此结果以 wei 为单位，而不是 eth。 Wei 是以太币的最小计量单位。 从 wei 到 eth 的转换是：1 eth = 10¹⁸ wei。 因此，如果我们将 0xde0b6b3a7640000 转换为十进制，我们会得到 1\*10¹⁸，它等于 1 eth。

哦！ 我们的虚拟以太币都在那里了！ <Emoji text=":money_mouth_face:" size={1} />

## 将 MetaMask 连接到你的 UI {#connect-metamask-to-your-UI}

既然我们的 MetaMask 钱包已经设置好了，我们将我们的去中心化应用程序与之连接！

因为我们想要遵循 [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 范式，所以我们将创建一个单独的文件，其中包含用于管理我们去中心化应用程序的逻辑、数据和规则的函数，然后将这些函数传递到我们的前端（我们的 Minter.js 组件）。

### `connectWallet` 函数 {#connect-wallet-function}

为此，让我们在 `src` 目录中创建一个名为 `utils` 的新文件夹，并在其中添加一个名为 `interact.js` 的文件，该文件将包含我们所有的钱包和智能合约交互函数。

在我们的 `interact.js` 文件中，我们将编写一个 `connectWallet` 函数，然后我们将在 `Minter.js` 组件中导入并调用它。

在你的 `interact.js` 文件中，添加以下内容

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 请在上面的文本字段中写入一条消息。",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              你必须在浏览器中安装 MetaMask（一个虚拟的以太坊钱包）。
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

我们详细讲解一下这段代码的作用：

首先，我们的函数会检查 `window.ethereum` 是否在你的浏览器中启用。

`window.ethereum` 是由 MetaMask 和其他钱包提供商注入的全局 API，允许网站请求用户的以太坊帐户。 如果获得批准，它可以从用户连接的区块链中读取数据，并建议用户签署消息和交易。 有关详细信息，请查看 [MetaMask 文档](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)！

如果 `window.ethereum` _不_存在，则意味着 MetaMask 未安装。 这将导致返回一个 JSON 对象，其中返回的 `address` 是一个空字符串，而 `status` JSX 对象则会提示用户必须安装 MetaMask。

**我们编写的大多数函数都将返回 JSON 对象，我们可以用它们来更新我们的状态变量和 UI。**

现在，如果 `window.ethereum` _是_存在的，事情就变得有趣了。

使用 try/catch 循环，我们将通过调用 [`window.ethereum.request({ method: \"eth_requestAccounts\" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) 来尝试连接到 MetaMask。 调用此函数将在浏览器中打开 MetaMask，提示用户将他们的钱包连接到你的去中心化应用程序。

- 如果用户选择连接，`method: \"eth_requestAccounts\"` 将返回一个数组，其中包含连接到该去中心化应用程序的所有用户帐户地址。 总而言之，我们的 `connectWallet` 函数将返回一个 JSON 对象，其中包含此数组中的_第一个_ `address`（见第 9 行）和一条提示用户向智能合约写入消息的 `status` 消息。
- 如果用户拒绝连接，则 JSON 对象将包含一个空字符串作为返回的 `address`，以及一条反映用户拒绝连接的 `status` 消息。

### 将 `connectWallet` 函数添加到你的 Minter.js UI 组件 {#add-connect-wallet}

既然我们已经编写了 `connectWallet` 函数，现在就把它连接到我们的 `Minter.js` 组件。

首先，我们必须通过在 `Minter.js` 文件顶部添加 `import { connectWallet } from \"./utils/interact.js\";`，将我们的函数导入到 `Minter.js` 文件中。 现在，`Minter.js` 的前 11 行应该如下所示：

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //状态变量
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

然后，在 `connectWalletPressed` 函数中，我们将调用导入的 `connectWallet` 函数，如下所示：

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

请注意我们的大部分功能是如何从 `interact.js` 文件中抽象出来，并与 `Minter.js` 组件分离的？ 这就是我们遵守 M-V-C 规范的原因！

在 `connectWalletPressed` 中，我们只需对导入的 `connectWallet` 函数进行 `await` 调用，并使用其响应通过它们的状态钩子来更新 `status` 和 `walletAddress` 变量。

现在，让我们保存 `Minter.js` 和 `interact.js` 这两个文件，并测试一下我们目前的 UI。

在 localhost:3000 地址打开浏览器，然后按页面右上角的“连接钱包”按钮。

如果你安装了 MetaMask，系统会提示你将钱包连接到去中心化应用程序。 接受邀请并连接。

你应该会看到钱包按钮现在显示你的地址已连接。

接下来，尝试刷新页面…… 这很奇怪。 我们的钱包按钮提示我们连接 MetaMask，尽管它已经连接......

不过不用担心！ 我们可以通过实现一个名为 `getCurrentWalletConnected` 的函数来轻松解决这个问题，该函数将检查一个地址是否已连接到我们的去中心化应用程序，并相应地更新我们的 UI！

### `getCurrentWalletConnected` 函数 {#get-current-wallet}

在你的 `interact.js` 文件中，添加以下 `getCurrentWalletConnected` 函数：

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 请在上面的文本字段中写入一条消息。",
        }
      } else {
        return {
          address: "",
          status: "🦊 使用右上角的按钮连接到 MetaMask。",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              你必须在浏览器中安装 MetaMask（一个虚拟的以太坊钱包）。
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

此代码与我们刚才编写的 `connectWallet` 函数_非常_相似。

主要区别在于，我们这里调用的方法是 `eth_accounts`，它只是返回一个包含当前连接到我们去中心化应用程序的 MetaMask 地址的数组，而不是调用会打开 MetaMask 供用户连接钱包的 `eth_requestAccounts` 方法。

要查看这个函数的实际作用，我们在 `Minter.js` 组件的 `useEffect` 函数中调用它。

就像我们对 `connectWallet` 的操作一样，我们必须将此函数从 `interact.js` 文件导入到 `Minter.js` 文件，如下所示：

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //在此导入
} from "./utils/interact.js"
```

现在，我们只需在 `useEffect` 函数中调用它：

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

请注意，我们使用调用 `getCurrentWalletConnected` 的响应来更新我们的 `walletAddress` 和 `status` 状态变量。

添加这段代码后，请尝试刷新我们的浏览器窗口。 按钮应显示你已连接，并显示已连接钱包地址的预览 — 即使在你刷新后也是如此！

### 实现 addWalletListener {#implement-add-wallet-listener}

我们的去中心化应用程序钱包设置的最后一步是实现钱包监听器，以便我们的用户界面在钱包状态发生变化时更新，例如当用户断开或切换帐户时。

在你的 `Minter.js` 文件中，添加如下所示的函数 `addWalletListener`：

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 请在上面的文本字段中写入一条消息。")
      } else {
        setWallet("")
        setStatus("🦊 使用右上角的按钮连接到 MetaMask。")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          你必须在浏览器中安装 MetaMask（一个虚拟的以太坊钱包）。
        </a>
      </p>
    )
  }
}
```

我们快速分板一下这段代码的运行情况：

- 首先，我们的函数会检查 `window.ethereum` 是否已启用（即 MetaMask 是否已安装）。
  - 如果未启用，我们只需将 `status` 状态变量设置为提示用户安装 MetaMask 的 JSX 字符串。
  - 如果启用，我们会在第 3 行设置监听器 `window.ethereum.on("accountsChanged")` 监听 MetaMask 钱包中的状态变化，变化包括用户将其他帐户连接到去中心化应用程序、切换帐户或断开帐户。 如果至少连接了一个帐户，`walletAddress` 状态变量将更新为监听器返回的 `accounts` 数组中的第一个帐户。 否则，`walletAddress` 将设置为空字符串。

最后，我们必须在 `useEffect` 函数中调用它：

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

瞧！ 我们已经完成了所有钱包功能的编程！ 我们的钱包已经设置好了，现在让我们弄清楚如何铸造非同质化代币！

## NFT 元数据入门 {#nft-metadata-101}

所以，请记住我们刚刚在本教程的第 0 步讨论过的非同质化代币元数据，它是非同质化代币的核心，让非同质化代币具有属性，例如数字资产、名称、描述及其他特性。

我们需要将此元数据配置为 JSON 对象并存储它，以便在调用智能合约的 `mintNFT` 函数时将其作为 `tokenURI` 参数传入。

“资产链接”、“名称”、“描述”字段中的文本将包含我们非同质化代币元数据的不同属性。 我们将此元数据格式化为 JSON 对象，但是对于这个 JSON 对象的存储位置，有几个选项可以选择：

- 我们可以将其存储在以太坊区块链上；但这样做会非常昂贵。
- 我们可以将其存储在中心化服务器上，例如 AWS 或 Firebase。 但这会违背我们的去中心化核心理念。
- 我们可以使用去中心化协议和对等网络星际文件系统，在分布式文件系统中存储和共享数据。 由于该协议是去中心化且免费的，因此它是我们的最佳选择！

要将我们的元数据存储在 IPFS 上，我们将使用 [Pinata](https://pinata.cloud/)，这是一种方便的 IPFS API 和工具包。 下一步，我们将准确解释如何操作！

## 使用 Pinata 将你的元数据固定到 IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

如果你没有 [Pinata](https://pinata.cloud/) 帐户，请[在此处](https://app.pinata.cloud/auth/signup)注册一个免费帐户，并完成验证你的电子邮件和帐户的步骤。

### 创建你的 Pinata API 密钥 {#create-pinata-api-key}

导航到 [https://pinata.cloud/keys](https://pinata.cloud/keys) 页面，然后选择顶部的“New Key”按钮并将“管理”小组件设置为启用，然后给你的密钥命名。

然后，将显示一个包含你的应用程序接口信息的弹出窗口。 确保把它放在安全的地方。

我们的密钥已经设置好了，我们现在将它添加到项目中以便可以使用它。

### 创建 .env 文件 {#create-a-env}

我们可以将 Pinata 密钥和私钥安全地存储在环境文件中。 让我们在你的项目目录中安装 [dotenv 包](https://www.npmjs.com/package/dotenv)。

在你的终端中打开一个新标签页（与运行本地主机的标签页分开），并确保你位于 `minter-starter-files` 文件夹中，然后在终端运行以下命令：

```text
npm install dotenv --save
```

接下来，通过在命令行输入以下内容，在 `minter-starter-files` 的根目录中创建一个 `.env` 文件：

```javascript
vim.env
```

这将在 vim（一种文本编辑器）中弹出并打开你的 `.env` 文件。 要保存它，依次在键盘上按“esc” + “:” + “q”。

接下来，在 VSCode 中，导航到你的 `.env` 文件并向其中添加你的 Pinata API 密钥和 API 私钥，如下所示：

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

保存该文件，然后你就可以开始编写函数将你的 JSON 元数据上传到星际文件系统！

### 实现 pinJSONToIPFS {#pin-json-to-ipfs}

幸运的是，Pinata 有一个[专门用于将 JSON 数据上传到 IPFS 的 API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json)，以及一个方便的、带有 axios 示例的 JavaScript，我们可以稍作修改后加以使用。

在你的 `utils` 文件夹中，我们创建另一个名为 `pinata.js` 的文件，然后从 .env 文件中导入我们的 Pinata 私钥和密钥，如下所示：

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

接下来，将下面的代码粘贴到你的 `pinata.js` 文件中。 别担心，我们将详细讲解每一行的含义！

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //向 Pinata 发出 axios POST 请求 ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

那么这段代码到底是做什么的呢？

首先，它导入 [axios](https://www.npmjs.com/package/axios)，axios 是一个基于 Promise 的超文本传输协议客户端，可用于浏览器和 node.js，我们将使用它创建一个发送到 Pinata 的请求。

然后，我们使用异步函数 `pinJSONToIPFS`，它以 `JSONBody` 作为输入参数，并在其报头中使用 Pinata api 密钥和私钥，这些都是为了向其 `pinJSONToIPFS` API 发出 POST 请求。

- 如果此 POST 请求成功，我们的函数返回一个 `success` 布尔值为 true 的 JSON 对象以及固定我们元数据的 `pinataUrl`。 我们将使用返回的 `pinataUrl` 作为我们智能合约的 mint 函数的 `tokenURI` 输入。
- 如果此 post 请求失败，我们的函数返回一个 `success` 布尔值为 false 的 JSON 对象和一个指示我们错误的 `message` 字符串。

与 `connectWallet` 函数返回类型一样，会返回 JSON 对象，因此我们可以使用它们的参数更新状态变量和 UI。

## 加载你的智能合约 {#load-your-smart-contract}

我们有办法通过 `pinJSONToIPFS` 函数将 NFT 元数据上传到 IPFS，现在我们需要一种办法来加载我们智能合约的实例，以便我们可以调用其 `mintNFT` 函数。

正如我们之前提到的，在本教程中，我们将使用[这个现有的 NFT 智能合约](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)；但是，如果你想了解我们如何创建或者想自己创建一个，我们强烈建议你参阅我们的另一个教程[“如何创建 NFT”](https://www.alchemy.com/docs/how-to-create-an-nft)。

### 合约 ABI {#contract-abi}

如果你仔细研究我们的文件，你会注意到我们的 `src` 目录中有一个 `contract-abi.json` 文件。 在指定合约将要调用的函数以及确保函数以你期望的格式返回数据时，应用程序二进制接口必不可少。

我们还需要一个 Alchemy 应用程序接口密钥和 Alchemy Web3 应用程序接口，用来连接到以太坊区块链并加载我们的智能合约。

### 创建你的 Alchemy API 密钥 {#create-alchemy-api}

如果你还没有 Alchemy 帐户，[请在此处免费注册。](https://alchemy.com/?a=eth-org-nft-minter)

创建 Alchemy 帐户后，你可以通过创建应用程序来生成应用程序接口密钥。 我们可以用它向 Ropsten 测试网发出请求。

通过将鼠标悬停在导航栏中的“Apps”上方并点击“Create App”，导航到你的 Alchemy 仪表板中的“Create App”页面。

给你的应用程序命名，我们选择“My First NFT!”（我的第一个非同质化代币！），提供简短描述，对于你的应用程序簿记环境选择“Staging”，对于网络选择“Ropsten”。

点击“Create app”，完成！ 你的应用程序应该就会出现在下面的表格中。

太棒了，我们已经创建了我们的 HTTP Alchemy 应用程序接口网址，现在请将其复制到剪贴板......

…然后让我们将它添加到我们的 `.env` 文件中。 总之，你的 .env 文件应如下所示：

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

既然我们已经有合约 ABI 和 Alchemy API 密钥了，现在我们可以使用 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) 加载我们的智能合约。

### 设置你的 Alchemy Web3 端点和合约 {#setup-alchemy-endpoint}

首先，如果你还没有 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)，你需要通过在终端导航到主目录 `nft-minter-tutorial` 来安装它：

```text
cd ..
npm install @alch/alchemy-web3
```

接下来，我们返回 `interact.js` 文件。 在该文件顶部添加以下代码，以便从你的 .env 文件中导入 Alchemy 密钥并设置你的 Alchemy Web3 端点：

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) 是 [Web3.js](https://docs.web3js.org/) 的包装器，提供增强的 API 方法和其他重要优势，让 Web3 开发者的工作更轻松。 它设计成只需经过最少的配置即可使用，因此你可以直接在你的应用程序中开始使用它！

接下来，我们将合约应用程序二进制接口和合约地址添加到我们的文件中。

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

在有了这两项后，我们就可以开始编写我们的铸币函数了！

## 实现 mintNFT 函数 {#implement-the-mintnft-function}

在 `interact.js` 文件中，我们定义的函数 `mintNFT`，它将用相同的名称铸造 NFT。

因为我们将进行大量异步调用\（调用 Pinata 将我们的元数据固定到星际文件系统，调用 Alchemy Web3 加载我们的智能合约，并且调用 MetaMask 签署我们的交易\），我们的函数也将是异步的。

我们函数的三个输入将是我们数字资产的 `url`、`name` 和 `description`。 在 `connectWallet` 函数下方添加以下函数签名：

```javascript
export const mintNFT = async (url, name, description) => {}
```

### 输入错误处理 {#input-error-handling}

当然，在函数开始运行时进行某种输入错误处理是合理的，这样，如果输入参数不正确，我们将退出该函数。 在我们的函数中，我们添加以下代码：

```javascript
export const mintNFT = async (url, name, description) => {
  //错误处理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗请在铸币前确保所有字段都已填写完毕。",
    }
  }
}
```

本质上，如果有任何输入参数是空字符串，我们返回一个 JSON 对象，其中 `success` 布尔值为 false，并且 `status` 字符串指示我们 UI 中的所有字段必须完整。

### 将元数据上传到 IPFS {#upload-metadata-to-ipfs}

在知道我们的元数据格式正确后，下一步是将其包装到 JSON 对象中，并通过我们编写的 `pinJSONToIPFS` 将其上传到 IPFS！

为此，我们首先需要将 `pinJSONToIPFS` 函数导入到 `interact.js` 文件中。 在 `interact.js` 文件最顶部，我们添加：

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

回想一下 `pinJSONToIPFS` 接受 JSON 主体。 因此，在调用它之前，我们需要将 `url`、`name` 和 `description` 参数格式化为 JSON 对象。

我们更新代码以创建一个名为 `metadata` 的 JSON 对象，然后使用此 `metadata` 参数调用 `pinJSONToIPFS`：

```javascript
export const mintNFT = async (url, name, description) => {
  //错误处理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗请在铸币前确保所有字段都已填写完毕。",
    }
  }

  //创建元数据
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //发出 pinata 请求
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 上传你的 tokenURI 时出错了。",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

请注意，我们将 `pinJSONToIPFS(metadata)` 调用的响应存储在 `pinataResponse` 对象中。 然后，我们解析该对象是否有任何错误。

如果有错误，我们返回一个 JSON 对象，其中 `success` 布尔值为 false，并且我们的 `status` 字符串指示我们的调用失败。 否则，我们从 `pinataResponse` 中提取 `pinataURL` 并将其存储为我们的 `tokenURI` 变量。

现在是时候使用我们在文件顶部初始化的 Alchemy Web3 应用程序接口加载我们的智能合约了。 将以下代码行添加到 `mintNFT` 函数的底部，以便在 `window.contract` 全局变量处设置合约：

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

最后，在 `mintNFT` 函数中添加我们的以太坊交易：

```javascript
//设置你的以太坊交易
const transactionParameters = {
  to: contractAddress, // 合约发布期间外为必填项。
  from: window.ethereum.selectedAddress, // 必须与用户活动地址匹配。
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //调用 NFT 智能合约
}

//通过 MetaMask 签署交易
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ 在 Etherscan 上查看你的交易：https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 出错了：" + error.message,
  }
}
```

如果你已经熟悉以太坊交易，你会注意到其结构与你以前看到的非常相似。

- 首先，我们设置交易参数。
  - `to` 指定接收者地址（我们的智能合约）
  - `from` 指定交易的签名者（用户连接到 MetaMask 的地址：`window.ethereum.selectedAddress`）
  - `data` 包含对智能合约 `mintNFT` 方法的调用，该方法接收 `tokenURI` 和用户的钱包地址 `window.ethereum.selectedAddress` 作为输入
- 接下来，我们进行对 `window.ethereum.request` 进行异步调用，请求 MetaMask 对交易进行签名。 注意，在该请求中，我们指定了我们的以太币方法（`eth_SentTransaction`）并传入了 `transactionParameters`。 此时，MetaMask 将在浏览器中打开，并提示用户签署或拒绝交易。
  - 如果交易成功，该函数将返回一个 JSON 对象，其中布尔值 `success` 设置为 true，并且 `status` 字符串提示用户查看 Etherscan 区块浏览器以获取有关其交易的更多信息。
  - 如果交易失败，该函数将返回一个 JSON 对象，其中 `success` 布尔值设置为 false，并且 `status` 字符串指示错误信息。

总之，我们的 `mintNFT` 函数应该如下所示：

```javascript
export const mintNFT = async (url, name, description) => {
  //错误处理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗请在铸币前确保所有字段都已填写完毕。",
    }
  }

  //创建元数据
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata 置顶请求
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 上传你的 tokenURI 时出错了。",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //加载智能合约
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //设置你的以太坊交易
  const transactionParameters = {
    to: contractAddress, // 合约发布期间外为必填项。
    from: window.ethereum.selectedAddress, // 必须与用户活动地址匹配。
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //调用 NFT 智能合约
  }

  //通过 MetaMask 签署交易
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ 在 Etherscan 上查看你的交易：https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 出错了：" + error.message,
    }
  }
}
```

这是一个大型函数！ 现在，我们只需要将 `mintNFT` 函数连接到我们的 `Minter.js` 组件......

## 将 mintNFT 连接到我们的 Minter.js 前端 {#connect-our-frontend}

打开你的 `Minter.js` 文件，并将顶部的 `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` 行更新为：

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

最后，实现 `onMintPressed` 函数对导入的 `mintNFT` 函数进行 `await` 调用，并更新 `status` 状态变量以表示我们的交易是成功还是失败：

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## 将你的 NFT 部署到在线网站 {#deploy-your-NFT}

准备好让你的项目上线和用户互动了吗？ 查看[本教程](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online)以将你的 Minter 部署到在线网站。

最后一步......

## 让区块链世界为之震撼 {#take-the-blockchain-world-by-storm}

开个玩笑，你已经完成了本教程！

概括一下，通过构建非同质化代币铸币机，你成功学会了如何：

- 通过你的前端项目连接到 MetaMask
- 在前端调用智能合约的方法
- 使用 MetaMask 签署交易

也许你希望能够在钱包中展示通过你的去中心化应用程序铸造的 NFT — 因此请务必查看我们的快速教程[“如何在钱包中查看你的 NFT”](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)！

一如既往，如果你有任何问题，我们会在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中随时为你提供帮助。 我们迫不及待地想看看你如何在将来的项目中应用本教程中的概念！
