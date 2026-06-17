---
title: "NFT 铸造器教程"
description: "在本教程中，你将构建一个 NFT 铸造器，并学习如何使用梅塔马斯克和 Web3 工具将智能合约连接到 React 前端，从而创建一个全栈去中心化应用 (dapp)。"
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "智能合约", "前端", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: "NFT 铸造器 dapp"
lang: zh
published: 2021-10-06
---

对于具有 Web2 背景的开发者来说，最大的挑战之一是弄清楚如何将智能合约连接到前端项目并与之交互。

通过构建一个 NFT 铸造器（一个简单的用户界面，你可以在其中输入数字资产的链接、标题和描述），你将学习如何：

- 通过前端项目连接到梅塔马斯克
- 从前端调用智能合约方法
- 使用梅塔马斯克签署交易

在本教程中，我们将使用 [React](https://react.dev/) 作为前端框架。由于本教程主要侧重于 Web3 开发，我们不会花太多时间分解 React 基础知识。相反，我们将专注于为项目引入功能。

作为先决条件，你应该对 React 有初学者水平的了解——了解组件、props、useState/useEffect 以及基本函数调用的工作原理。如果你以前从未听说过这些术语，你可能需要查看这篇 [React 简介教程](https://react.dev/learn/tutorial-tic-tac-toe)。对于更喜欢视觉学习的人，我们强烈推荐 Net Ninja 制作的这个优秀的 [现代 React 完整教程](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) 视频系列。

如果你还没有 Alchemy 账户，你肯定需要一个来完成本教程以及在区块链上构建任何东西。在[此处](https://alchemy.com/)注册一个免费账户。

事不宜迟，让我们开始吧！

## 制作 NFT 基础知识 {#making-nfts-101}

在开始查看任何代码之前，了解制作 NFT 的工作原理非常重要。它包括两个步骤：

### 在以太坊区块链上发布 NFT 智能合约 {#publish-nft}

这两种 NFT 智能合约标准之间的最大区别在于，ERC-1155 是多代币标准并包含批处理功能，而 ERC-721 是单代币标准，因此一次只支持转移一个代币。

### 调用铸造函数 {#minting-function}

通常，此铸造函数要求你传入两个变量作为参数，第一个是 `recipient`，它指定将接收你新铸造的 NFT 的地址，第二个是 NFT 的 `tokenURI`，这是一个解析为描述 NFT 元数据的 JSON 文档的字符串。

NFT 的元数据真正赋予了它生命，使其具有名称、描述、图像（或不同的数字资产）和其他属性等特性。这是[一个 tokenURI 示例](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2)，其中包含 NFT 的元数据。

在本教程中，我们将重点关注第 2 部分，即使用我们的 React 用户界面调用现有 NFT 的智能合约铸造函数。

[这是](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)我们将在本教程中调用的 ERC-721 NFT 智能合约的链接。如果你想了解我们是如何制作它的，我们强烈建议你查看我们的另一篇教程[“如何创建 NFT”](https://www.alchemy.com/docs/how-to-create-an-nft)。

太棒了，现在我们了解了制作 NFT 的工作原理，让我们克隆启动文件！

## 克隆启动文件 {#clone-the-starter-files}

首先，前往 [nft-minter-tutorial GitHub 仓库](https://github.com/alchemyplatform/nft-minter-tutorial)获取此项目的启动文件。将此仓库克隆到你的本地环境中。

当你打开这个克隆的 `nft-minter-tutorial` 仓库时，你会注意到它包含两个文件夹：`minter-starter-files` 和 `nft-minter`。

- `minter-starter-files` 包含此项目的启动文件（本质上是 React 用户界面）。在本教程中，**我们将在此目录中工作**，因为你将学习如何通过将其连接到你的以太坊钱包和 NFT 智能合约来赋予此用户界面生命。
- `nft-minter` 包含整个已完成的教程，并在**你遇到困难时**作为**参考**。

接下来，在代码编辑器中打开你的 `minter-starter-files` 副本，然后导航到 `src` 文件夹。

我们将编写的所有代码都将位于 `src` 文件夹下。我们将编辑 `Minter.js` 组件并编写额外的 JavaScript 文件，以赋予我们的项目 Web3 功能。

## 第 2 步：查看我们的启动文件 {#step-2-check-out-our-starter-files}

在开始编码之前，检查启动文件中已经为我们提供了什么是很重要的。

### 运行你的 React 项目 {#get-your-react-project-running}

让我们从在浏览器中运行 React 项目开始。React 的美妙之处在于，一旦我们在浏览器中运行了项目，我们保存的任何更改都将在浏览器中实时更新。

要运行该项目，请导航到 `minter-starter-files` 文件夹的根目录，然后在终端中运行 `npm install` 以安装项目的依赖项：

```bash
cd minter-starter-files
npm install
```

安装完成后，在终端中运行 `npm start`：

```bash
npm start
```

这样做应该会在浏览器中打开 http://localhost:3000/，你将在其中看到我们项目的前端。它应该包含 3 个字段：输入 NFT 资产链接的位置、输入 NFT 名称以及提供描述。

如果你尝试点击“连接钱包”或“铸造 NFT”按钮，你会发现它们不起作用——那是因为我们仍然需要对它们的功能进行编程！:\)

### Minter.js 组件 {#minter-js}

**注意：** 确保你在 `minter-starter-files` 文件夹中，而不是在 `nft-minter` 文件夹中！

让我们回到编辑器中的 `src` 文件夹并打开 `Minter.js` 文件。理解此文件中的所有内容非常重要，因为它是我们将要处理的主要 React 组件。

在此文件的顶部，我们有状态变量，我们将在特定事件后更新它们。

```javascript
//状态变量
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

从未听说过 React 状态变量或状态钩子？请查看[这些](https://legacy.reactjs.org/docs/hooks-state.html)文档。

以下是每个变量代表的含义：

- `walletAddress` - 存储用户钱包地址的字符串
- `status` - 包含要在用户界面底部显示的消息的字符串
- `name` - 存储 NFT 名称的字符串
- `description` - 存储 NFT 描述的字符串
- `url` - 作为 NFT 数字资产链接的字符串

在状态变量之后，你将看到三个未实现的函数：`useEffect`、`connectWalletPressed` 和 `onMintPressed`。你会注意到所有这些函数都是 `async`，那是因为我们将在其中进行异步 API 调用！它们的名称与其功能同名：

```javascript
useEffect(async () => {
  //TODO: 实现
}, [])

const connectWalletPressed = async () => {
  //TODO: 实现
}

const onMintPressed = async () => {
  //TODO: 实现
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - 这是一个在组件渲染后调用的 React 钩子。因为它传入了一个空数组 `[]` prop（见第 3 行），所以它只会在组件的_首次_渲染时被调用。在这里，我们将调用我们的钱包监听器和另一个钱包函数来更新我们的用户界面，以反映钱包是否已连接。
- `connectWalletPressed` - 将调用此函数以将用户的梅塔马斯克钱包连接到我们的去中心化应用 (dapp)。
- `onMintPressed` - 将调用此函数以铸造用户的 NFT。

在此文件末尾附近，我们有组件的用户界面。如果你仔细扫描此代码，你会注意到当相应文本字段中的输入发生变化时，我们会更新 `url`、`name` 和 `description` 状态变量。

你还会看到，当分别点击 ID 为 `mintButton` 和 `walletButton` 的按钮时，会调用 `connectWalletPressed` 和 `onMintPressed`。

```javascript
//我们组件的 UI
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
 
</div>
)
```

最后，让我们解决这个 Minter 组件添加在哪里的问题。

如果你转到 `App.js` 文件（它是 React 中作为所有其他组件容器的主要组件），你会看到我们的 Minter 组件被注入在第 7 行。

**在本教程中，我们将只编辑 `Minter.js file` 并在我们的 `src` 文件夹中添加文件。**

现在我们了解了我们要处理的内容，让我们设置我们的以太坊钱包！

## 设置你的以太坊钱包 {#set-up-your-ethereum-wallet}

为了让用户能够与你的智能合约交互，他们需要将他们的以太坊钱包连接到你的 dapp。

### 下载梅塔马斯克 {#download-metamask}

在本教程中，我们将使用梅塔马斯克，这是一个浏览器中的虚拟钱包，用于管理你的以太坊账户地址。如果你想了解更多关于以太坊上交易如何工作的信息，请查看[此页面](/developers/docs/transactions/)。

你可以免费在[此处](https://metamask.io/download)下载并创建一个梅塔马斯克账户。当你创建账户时，或者如果你已经有一个账户，请确保切换到右上角的“Ropsten 测试网络”（这样我们就不会处理真钱）。

### 从水龙头添加以太币 {#add-ether-from-faucet}

为了铸造我们的 NFT（或在以太坊区块链上签署任何交易），我们需要一些假 ETH。要获取 ETH，你可以前往 [Ropsten 水龙头](https://faucet.ropsten.be/)并输入你的 Ropsten 账户地址，然后点击“Send Ropsten Eth”。不久之后，你应该会在你的梅塔马斯克账户中看到 ETH！

### 检查你的余额 {#check-your-balance}

为了仔细检查我们的余额是否在那里，让我们使用 [Alchemy 的 composer 工具](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)发出一个 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 请求。这将返回我们钱包中的 ETH 数量。输入你的梅塔马斯克账户地址并点击“Send Request”后，你应该会看到如下响应：

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注意：** 此结果以 Wei 为单位，而不是 ETH。Wei 被用作以太币的最小面额。从 Wei 到 ETH 的转换为：1 ETH = 10¹⁸ Wei。因此，如果我们将 0xde0b6b3a7640000 转换为十进制，我们得到 1\*10¹⁸，等于 1 ETH。

呼！我们的假钱都在那里！<Emoji text=":money_mouth_face:" size={1} />

## 将梅塔马斯克连接到你的用户界面 {#connect-metamask-to-your-ui}

现在我们的梅塔马斯克钱包已设置完毕，让我们将 dapp 连接到它！

因为我们希望遵循 [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 范式，我们将创建一个单独的文件，其中包含管理 dapp 逻辑、数据和规则的函数，然后将这些函数传递给我们的前端（我们的 Minter.js 组件）。

### `connectWallet` 函数 {#connect-wallet-function}

为此，让我们在你的 `src` 目录中创建一个名为 `utils` 的新文件夹，并在其中添加一个名为 `interact.js` 的文件，该文件将包含我们所有的钱包和智能合约交互函数。

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
        status: "👆🏽 Write a message in the text-field above.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

让我们分解一下这段代码的作用：

首先，我们的函数检查你的浏览器中是否启用了 `window.ethereum`。

`window.ethereum` 是由梅塔马斯克和其他钱包提供商注入的全局 API，允许网站请求用户的以太坊账户。如果获得批准，它可以从用户连接的区块链读取数据，并建议用户签署消息和交易。查看[梅塔马斯克文档](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)了解更多信息！

如果 `window.ethereum` _不存在_，则意味着未安装梅塔马斯克。这将导致返回一个 JSON 对象，其中返回的 `address` 是一个空字符串，并且 `status` JSX 对象传达用户必须安装梅塔马斯克。

**我们编写的大多数函数都将返回 JSON 对象，我们可以使用这些对象来更新我们的状态变量和用户界面。**

现在，如果 `window.ethereum` _存在_，那么事情就变得有趣了。

使用 try/catch 循环，我们将尝试通过调用 [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) 连接到梅塔马斯克。调用此函数将在浏览器中打开梅塔马斯克，从而提示用户将其钱包连接到你的 dapp。

- 如果用户选择连接，`method: "eth_requestAccounts"` 将返回一个数组，其中包含连接到 dapp 的所有用户账户地址。总而言之，我们的 `connectWallet` 函数将返回一个 JSON 对象，其中包含此数组中的_第一个_ `address`（见第 9 行）以及一条提示用户向智能合约写入消息的 `status` 消息。
- 如果用户拒绝连接，则 JSON 对象将包含返回的 `address` 的空字符串，以及反映用户拒绝连接的 `status` 消息。

### 将 connectWallet 函数添加到你的 Minter.js 用户界面组件 {#add-connect-wallet}

现在我们已经编写了这个 `connectWallet` 函数，让我们将其连接到我们的 `Minter.js.` 组件。

首先，我们必须通过将 `import { connectWallet } from "./utils/interact.js";` 添加到 `Minter.js` 文件的顶部，将我们的函数导入到 `Minter.js` 文件中。你的 `Minter.js` 的前 11 行现在应该如下所示：

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

然后，在我们的 `connectWalletPressed` 函数中，我们将调用导入的 `connectWallet` 函数，如下所示：

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

注意到我们的大部分功能是如何从 `interact.js` 文件中抽象出我们的 `Minter.js` 组件的吗？这是为了让我们遵守 M-V-C 范式！

在 `connectWalletPressed` 中，我们只需对导入的 `connectWallet` 函数进行 await 调用，并使用其响应，通过它们的状态钩子更新我们的 `status` 和 `walletAddress` 变量。

现在，让我们保存 `Minter.js` 和 `interact.js` 这两个文件，并测试我们目前的用户界面。

在 localhost:3000 上打开浏览器，然后按页面右上角的“连接钱包”按钮。

如果你安装了梅塔马斯克，系统会提示你将钱包连接到 dapp。接受连接邀请。

你应该会看到钱包按钮现在反映你的地址已连接。

接下来，尝试刷新页面……这很奇怪。我们的钱包按钮提示我们连接梅塔马斯克，即使它已经连接了……

不过别担心！我们可以通过实现一个名为 `getCurrentWalletConnected` 的函数来轻松解决这个问题，该函数将检查地址是否已连接到我们的 dapp 并相应地更新我们的用户界面！

### getCurrentWalletConnected 函数 {#get-current-wallet}

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
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

这段代码与我们之前编写的 `connectWallet` 函数_非常_相似。

主要区别在于，我们没有调用为用户打开梅塔马斯克以连接其钱包的 `eth_requestAccounts` 方法，而是在这里调用了 `eth_accounts` 方法，该方法仅返回一个包含当前连接到我们 dapp 的梅塔马斯克地址的数组。

要查看此函数的实际效果，让我们在 `Minter.js` 组件的 `useEffect` 函数中调用它。

就像我们对 `connectWallet` 所做的那样，我们必须将此函数从 `interact.js` 文件导入到 `Minter.js` 文件中，如下所示：

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //在此处导入
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

请注意，我们使用对 `getCurrentWalletConnected` 调用的响应来更新我们的 `walletAddress` 和 `status` 状态变量。

添加此代码后，尝试刷新我们的浏览器窗口。该按钮应该显示你已连接，并显示你已连接钱包地址的预览 - 即使在你刷新之后！

### 实现 addWalletListener {#implement-add-wallet-listener}

我们 dapp 钱包设置的最后一步是实现钱包监听器，以便当我们的钱包状态发生变化（例如当用户断开连接或切换账户）时，我们的用户界面会更新。

在你的 `Minter.js` 文件中，添加一个如下所示的 `addWalletListener` 函数：

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

让我们快速分解一下这里发生的事情：

- 首先，我们的函数检查是否启用了 `window.ethereum`（即是否安装了梅塔马斯克）。
  - 如果没有，我们只需将 `status` 状态变量设置为提示用户安装梅塔马斯克的 JSX 字符串。
  - 如果已启用，我们在第 3 行设置监听器 `window.ethereum.on("accountsChanged")`，它监听梅塔马斯克钱包中的状态变化，包括用户将其他账户连接到 dapp、切换账户或断开账户连接时。如果至少连接了一个账户，则 `walletAddress` 状态变量将更新为监听器返回的 `accounts` 数组中的第一个账户。否则，`walletAddress` 将设置为空字符串。

最后，我们必须在 `useEffect` 函数中调用它：

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

大功告成！我们已经完成了所有钱包功能的编程！现在我们的钱包已设置完毕，让我们弄清楚如何铸造我们的 NFT！

## NFT 元数据基础知识 {#nft-metadata-101}

还记得我们在本教程第 0 步中刚刚谈到的 NFT 元数据吗——它赋予了 NFT 生命，使其具有数字资产、名称、描述和其他属性等特性。

我们需要将此元数据配置为 JSON 对象并存储它，以便在调用智能合约的 `mintNFT` 函数时将其作为 `tokenURI` 参数传入。

“资产链接”、“名称”、“描述”字段中的文本将构成我们 NFT 元数据的不同属性。我们将把这个元数据格式化为一个 JSON 对象，但是对于我们可以将这个 JSON 对象存储在哪里，有几个选项：

- 我们可以将其存储在以太坊区块链上；然而，这样做会非常昂贵。
- 我们可以将其存储在集中式服务器上，例如 AWS 或 Firebase。但这将违背我们的去中心化精神。
- 我们可以使用 IPFS，这是一种去中心化协议和点对点网络，用于在分布式文件系统中存储和共享数据。由于该协议是去中心化且免费的，因此它是我们的最佳选择！

为了将我们的元数据存储在 IPFS 上，我们将使用 [Pinata](https://pinata.cloud/)，这是一个方便的 IPFS API 和工具包。在下一步中，我们将准确解释如何做到这一点！

## 使用 Pinata 将你的元数据固定到 IPFS {#use-pinata-to-pin-your-metadata-to-ipfs}

如果你没有 [Pinata](https://pinata.cloud/) 账户，请在[此处](https://app.pinata.cloud/auth/signup)注册一个免费账户，并完成验证你的电子邮件和账户的步骤。

### 创建你的 Pinata API 密钥 {#create-pinata-api-key}

导航到 [https://pinata.cloud/keys](https://pinata.cloud/keys) 页面，然后选择顶部的“New Key”按钮，将 Admin 小部件设置为启用，并命名你的密钥。

然后，你将看到一个包含你的 API 信息的弹出窗口。确保将其放在安全的地方。

现在我们的密钥已设置完毕，让我们将其添加到我们的项目中以便我们可以使用它。

### 创建 .env 文件 {#create-a-env}

我们可以安全地将我们的 Pinata 密钥和机密存储在环境文件中。让我们在你的项目目录中安装 [dotenv 包](https://www.npmjs.com/package/dotenv)。

在你的终端中打开一个新选项卡（与运行本地主机的选项卡分开），并确保你在 `minter-starter-files` 文件夹中，然后在你的终端中运行以下命令：

```text
npm install dotenv --save
```

接下来，通过在命令行中输入以下内容，在你的 `minter-starter-files` 的根目录中创建一个 `.env` 文件：

```javascript
vim.env
```

这将在 vim（文本编辑器）中弹出打开你的 `.env` 文件。要保存它，请按顺序在键盘上按“esc”+“:”+“q”。

接下来，在 VSCode 中，导航到你的 `.env` 文件并将你的 Pinata API 密钥和 API 机密添加到其中，如下所示：

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

保存文件，然后你就可以开始编写将 JSON 元数据上传到 IPFS 的函数了！

### 实现 pinJSONToIPFS {#pin-json-to-ipfs}

对我们来说幸运的是，Pinata 有一个[专门用于将 JSON 数据上传到 IPFS 的 API](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json)，以及一个方便的带有 axios 的 JavaScript 示例，我们可以稍作修改后使用。

在你的 `utils` 文件夹中，让我们创建另一个名为 `pinata.js` 的文件，然后像这样从 .env 文件中导入我们的 Pinata 机密和密钥：

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

接下来，将下面的附加代码粘贴到你的 `pinata.js` 文件中。别担心，我们将分解所有内容的含义！

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //向 Pinata 发起 axios POST 请求 ⬇️
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

首先，它导入了 [axios](https://www.npmjs.com/package/axios)，这是一个基于 promise 的用于浏览器和 Node.js 的 HTTP 客户端，我们将使用它向 Pinata 发出请求。

然后我们有异步函数 `pinJSONToIPFS`，它将 `JSONBody` 作为其输入，并在其标头中包含 Pinata API 密钥和机密，所有这些都是为了向其 `pinJSONToIPFS` API 发出 POST 请求。

- 如果此 POST 请求成功，则我们的函数返回一个 JSON 对象，其中 `success` 布尔值为 true，以及我们的元数据被固定的 `pinataUrl`。我们将使用返回的此 `pinataUrl` 作为智能合约铸造函数的 `tokenURI` 输入。
- 如果此 POST 请求失败，则我们的函数返回一个 JSON 对象，其中 `success` 布尔值为 false，以及一个传达我们错误的 `message` 字符串。

与我们的 `connectWallet` 函数返回类型一样，我们返回 JSON 对象，以便我们可以使用它们的参数来更新我们的状态变量和用户界面。

## 加载你的智能合约 {#load-your-smart-contract}

现在我们有办法通过我们的 `pinJSONToIPFS` 函数将我们的 NFT 元数据上传到 IPFS，我们将需要一种方法来加载我们的智能合约实例，以便我们可以调用其 `mintNFT` 函数。

正如我们之前提到的，在本教程中，我们将使用[这个现有的 NFT 智能合约](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE)；但是，如果你想了解我们是如何制作它的，或者自己制作一个，我们强烈建议你查看我们的另一篇教程[“如何创建 NFT”](https://www.alchemy.com/docs/how-to-create-an-nft)。

### 合约 ABI {#contract-abi}

如果你仔细检查了我们的文件，你会注意到在我们的 `src` 目录中，有一个 `contract-abi.json` 文件。ABI 对于指定合约将调用哪个函数以及确保该函数将以你期望的格式返回数据是必要的。

我们还需要一个 Alchemy API 密钥和 Alchemy Web3 API 来连接到以太坊区块链并加载我们的智能合约。

### 创建你的 Alchemy API 密钥 {#create-alchemy-api}

如果你还没有 Alchemy 账户，请在[此处免费注册。](https://alchemy.com/?a=eth-org-nft-minter)

创建 Alchemy 账户后，你可以通过创建应用来生成 API 密钥。这将允许我们向 Ropsten 测试网络发出请求。

通过将鼠标悬停在导航栏中的“Apps”上并点击“Create App”，导航到 Alchemy 仪表板中的“Create App”页面。

为你的应用命名，我们选择了“My First NFT!”，提供简短描述，为用于应用簿记的环境选择“Staging”，并为你的网络选择“Ropsten”。

点击“Create app”，就是这样！你的应用应该出现在下表中。

太棒了，现在我们已经创建了我们的 HTTP Alchemy API URL，将其复制到你的剪贴板……

……然后让我们将其添加到我们的 `.env` 文件中。总而言之，你的 .env 文件应该如下所示：

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

现在我们有了合约 ABI 和 Alchemy API 密钥，我们准备使用 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) 加载我们的智能合约。

### 设置你的 Alchemy Web3 端点和合约 {#setup-alchemy-endpoint}

首先，如果你还没有安装，你需要通过在终端中导航到主目录 `nft-minter-tutorial` 来安装 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)：

```text
cd ..
npm install @alch/alchemy-web3
```

接下来让我们回到我们的 `interact.js` 文件。在文件顶部，添加以下代码以从你的 .env 文件导入你的 Alchemy 密钥并设置你的 Alchemy Web3 端点：

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) 是 [Web3.js](https://docs.web3js.org/) 的包装器，提供增强的 API 方法和其他关键优势，让作为 Web3 开发者的你生活更轻松。它被设计为需要最少的配置，因此你可以立即开始在你的应用中使用它！

接下来，让我们将我们的合约 ABI 和合约地址添加到我们的文件中。

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

一旦我们拥有了这两个，我们就可以开始编写我们的铸造函数了！

## 实现 mintNFT 函数 {#implement-the-mintnft-function}

在你的 `interact.js` 文件中，让我们定义我们的函数 `mintNFT`，顾名思义，它将铸造我们的 NFT。

因为我们将进行大量异步调用（向 Pinata 调用以将我们的元数据固定到 IPFS，向 Alchemy Web3 调用以加载我们的智能合约，以及向梅塔马斯克调用以签署我们的交易），所以我们的函数也将是异步的。

我们函数的三个输入将是数字资产的 `url`、`name` 和 `description`。在 `connectWallet` 函数下方添加以下函数签名：

```javascript
export const mintNFT = async (url, name, description) => {}
```

### 输入错误处理 {#input-error-handling}

自然地，在函数开始时进行某种输入错误处理是有意义的，因此如果我们的输入参数不正确，我们将退出此函数。在我们的函数中，让我们添加以下代码：

```javascript
export const mintNFT = async (url, name, description) => {
  //错误处理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

本质上，如果任何输入参数为空字符串，那么我们将返回一个 JSON 对象，其中 `success` 布尔值为 false，并且 `status` 字符串传达我们用户界面中的所有字段都必须填写完整。

### 将元数据上传到 IPFS {#upload-metadata-to-ipfs}

一旦我们知道我们的元数据格式正确，下一步就是将其包装成一个 JSON 对象，并通过我们编写的 `pinJSONToIPFS` 将其上传到 IPFS！

为此，我们首先需要将 `pinJSONToIPFS` 函数导入到我们的 `interact.js` 文件中。在 `interact.js` 的最顶部，让我们添加：

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

回想一下，`pinJSONToIPFS` 接收一个 JSON 主体。因此，在调用它之前，我们需要将我们的 `url`、`name` 和 `description` 参数格式化为一个 JSON 对象。

让我们更新我们的代码以创建一个名为 `metadata` 的 JSON 对象，然后使用此 `metadata` 参数调用 `pinJSONToIPFS`：

```javascript
export const mintNFT = async (url, name, description) => {
  //错误处理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //创建元数据
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //发起 Pinata 调用
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

请注意，我们将对 `pinJSONToIPFS(metadata)` 调用的响应存储在 `pinataResponse` 对象中。然后，我们解析此对象以查找任何错误。

如果出现错误，我们将返回一个 JSON 对象，其中 `success` 布尔值为 false，并且我们的 `status` 字符串传达我们的调用失败。否则，我们从 `pinataResponse` 中提取 `pinataURL` 并将其存储为我们的 `tokenURI` 变量。

现在是时候使用我们在文件顶部初始化的 Alchemy Web3 API 加载我们的智能合约了。将以下代码行添加到 `mintNFT` 函数的底部，以在 `window.contract` 全局变量处设置合约：

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

在我们的 `mintNFT` 函数中要添加的最后一件事是我们的以太坊交易：

```javascript
//设置你的以太坊交易
const transactionParameters = {
  to: contractAddress, // 除合约发布期间外必填。
  from: window.ethereum.selectedAddress, // 必须与用户的活动地址匹配。
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //调用 NFT 智能合约
}

//通过梅塔马斯克签署交易
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

如果你已经熟悉以太坊交易，你会注意到其结构与你所见过的非常相似。

- 首先，我们设置我们的交易参数。
  - `to` 指定接收方地址（我们的智能合约）
  - `from` 指定交易的签名者（用户连接到梅塔马斯克的地址：`window.ethereum.selectedAddress`）
  - `data` 包含对我们智能合约 `mintNFT` 方法的调用，该方法接收我们的 `tokenURI` 和用户的钱包地址 `window.ethereum.selectedAddress` 作为输入
- 然后，我们进行 await 调用 `window.ethereum.request,`，要求梅塔马斯克签署交易。请注意，在此请求中，我们指定了我们的 eth 方法 (eth_SentTransaction) 并传入了我们的 `transactionParameters`。此时，梅塔马斯克将在浏览器中打开，并提示用户签署或拒绝交易。
  - 如果交易成功，该函数将返回一个 JSON 对象，其中布尔值 `success` 设置为 true，并且 `status` 字符串提示用户查看 Etherscan 以获取有关其交易的更多信息。
  - 如果交易失败，该函数将返回一个 JSON 对象，其中 `success` 布尔值设置为 false，并且 `status` 字符串传达错误消息。

总而言之，我们的 `mintNFT` 函数应该如下所示：

```javascript
export const mintNFT = async (url, name, description) => {
  //错误处理
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //创建元数据
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //Pinata pin 请求
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //加载智能合约
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //设置你的以太坊交易
  const transactionParameters = {
    to: contractAddress, // 除合约发布期间外必填。
    from: window.ethereum.selectedAddress, // 必须与用户的活动地址匹配。
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //调用 NFT 智能合约
  }

  //通过梅塔马斯克签署交易
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

这是一个巨大的函数！现在，我们只需要将我们的 `mintNFT` 函数连接到我们的 `Minter.js` 组件……

## 将 mintNFT 连接到我们的 Minter.js 前端 {#connect-our-frontend}

打开你的 `Minter.js` 文件并将顶部的 `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` 行更新为：

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

最后，实现 `onMintPressed` 函数以对导入的 `mintNFT` 函数进行 await 调用，并更新 `status` 状态变量以反映我们的交易是成功还是失败：

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## 将你的 NFT 部署到实时网站 {#deploy-your-nft}

准备好让你的项目上线以供用户交互了吗？查看[本教程](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online)，了解如何将你的铸造器部署到实时网站。

最后一步……

## 风靡区块链世界 {#take-the-blockchain-world-by-storm}

开个玩笑，你已经到了教程的结尾！

回顾一下，通过构建 NFT 铸造器，你成功学习了如何：

- 通过前端项目连接到梅塔马斯克
- 从前端调用智能合约方法
- 使用梅塔马斯克签署交易

想必，你希望能够在钱包中炫耀通过你的 dapp 铸造的 NFT——所以一定要查看我们的快速教程[如何在钱包中查看你的 NFT](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)！

而且，一如既往，如果你有任何问题，我们会在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中提供帮助。我们迫不及待地想看看你如何将本教程中的概念应用到你未来的项目中！