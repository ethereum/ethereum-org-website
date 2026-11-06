---
title: "适合初学者的 Hello World 智能合约"
description: "关于在以太坊上编写和部署简单智能合约的入门教程。"
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "智能合约", "部署"]
skill: beginner
breadcrumb: "Hello World 合约"
lang: zh
published: 2021-03-31
---

如果你是区块链开发的新手并且不知道从哪里开始，或者如果你只是想了解如何部署智能合约并与之交互，那么本指南非常适合你。我们将逐步介绍如何使用虚拟钱包 [梅塔马斯克](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/)、[Hardhat](https://hardhat.org/) 和 [Alchemy](https://www.alchemy.com/eth) 在 Sepolia 测试网络上创建和部署一个简单的智能合约（如果你还不懂这些词的意思，别担心，我们会解释的）。

一旦你的合约部署完毕，你可以[为它构建一个用户界面](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。

如果你在任何时候有疑问，请随时在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中联系我们！

## 第 1 步：连接到以太坊网络 {#step-1}

向以太坊链发出请求的方法有很多。为了简单起见，我们将在 Alchemy 上使用一个免费账户。Alchemy 是一个区块链开发者平台和 API，允许我们与以太坊链进行通信，而无需运行我们自己的节点。该平台还具有用于监控和分析的开发者工具，我们将在本教程中利用这些工具来了解智能合约部署的内部运作原理。如果你还没有 Alchemy 账户，[可以在这里免费注册](https://dashboard.alchemy.com/signup)。

## 第 2 步：创建你的应用（和 API 密钥） {#step-2}

创建 Alchemy 账户后，你可以通过创建应用来生成 API 密钥。这将允许我们向 Sepolia 测试网络发出请求。如果你不熟悉测试网，请查看[此页面](/developers/docs/networks/)。

1. 在导航栏中选择“Select an app”（选择应用），然后点击“Create new app”（创建新应用），导航到 Alchemy 仪表板中的“Create new app”页面。

![Hello world create app](./hello-world-create-app.png)

2. 将你的应用命名为“Hello World”，提供简短描述，并选择一个用例，例如“Infra & Tooling”（基础设施和工具）。接下来，搜索“Ethereum”并选择该网络。

![create app view hello world](./create-app-view-hello-world.png)

3. 点击“Next”（下一步）继续，然后点击“Create app”（创建应用），就这么简单！你的应用应该会出现在导航栏下拉菜单中，并提供可复制的 API 密钥。

## 第 3 步：创建一个以太坊账户（地址） {#step-3}

我们需要一个以太坊账户来发送和接收交易。在本教程中，我们将使用梅塔马斯克，这是一款浏览器中的虚拟钱包，用于管理你的以太坊账户地址。了解更多关于[交易](/developers/docs/transactions/)的信息。

你可以[在此处](https://metamask.io/download)免费下载梅塔马斯克并创建一个以太坊账户。当你创建账户时，或者如果你已经有一个账户，请确保使用网络下拉菜单切换到“Sepolia”测试网络（这样我们就不会使用真金白银进行操作）。

如果你没有看到 Sepolia 选项，请打开右上角的菜单，选择“Networks”（网络），然后在网络列表底部打开“Show test networks”（显示测试网络）开关（参见[梅塔马斯克查看测试网指南](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)）。然后在网络选择菜单中选择“Sepolia”。

![metamask sepolia example](./metamask-sepolia-example.png)

## 第 4 步：从水龙头添加以太币 {#step-4}

为了将我们的智能合约部署到测试网络，我们需要一些测试用的 ETH。要获取 Sepolia ETH，你可以前往 [Sepolia 网络详情](/developers/docs/networks/#sepolia)查看各种水龙头的列表。如果一个不起作用，请尝试另一个，因为它们有时会被领空。一些水龙头有资格规则；例如，Alchemy 的 Sepolia 水龙头要求接收地址在以太坊主网上至少持有 0.001 ETH。由于网络拥堵，接收测试用 ETH 可能需要一些时间。不久之后，你应该会在你的梅塔马斯克账户中看到 ETH！

## 第 5 步：检查你的余额 {#step-5}

为了再次确认我们的余额已到账，让我们使用 [Alchemy 的 composer 工具](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)发出一个 [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) 请求。这将返回我们钱包中的 ETH 数量。输入你的梅塔马斯克账户地址并点击“Send Request”（发送请求）后，你应该会看到类似如下的响应：

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **注意：** 此结果的单位是 Wei 而不是 ETH。Wei 被用作以太币的最小面额。Wei 到 ETH 的换算关系为：1 ETH = 10<sup>18</sup> Wei。因此，如果我们将 0x2B5E3AF16B1880000 转换为十进制，我们会得到 5\*10¹⁸，即等于 5 ETH。
>
> 呼！我们的测试资金都在那里了 <Emoji text=":money_mouth_face:" size={1} />。

## 第 6 步：初始化我们的项目 {#step-6}

首先，我们需要为我们的项目创建一个文件夹。导航到你的命令行并输入：

```sh
mkdir hello-world
cd hello-world
```

现在我们进入了项目文件夹，我们将使用 `npm init` 来初始化项目。如果你还没有安装 npm，请按照 [Node.js 安装说明](https://nodejs.org/en/download/)进行操作（本教程需要 Node.js 和 npm）。

```sh
npm init
```

你如何回答安装问题并不重要，以下是我们的做法以供参考：

```console
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

批准 package.json。我们接下来要安装的 Hardhat 3 仅支持 ES 模块项目，因此将项目标记为 ES 模块：

```sh
npm pkg set type=module
```

这样我们就准备就绪了！

## 第 7 步：下载 [Hardhat](https://hardhat.org/docs/getting-started) {#step-7}

Hardhat 是一个用于编译、部署、测试和调试以太坊软件的开发环境。它可以帮助开发人员在部署到实时链之前在本地构建智能合约和去中心化应用 (dapp)。

Hardhat 3 需要 Node.js v22.13.0 或更高版本。在我们的 `hello-world` 项目中运行：

```sh
npm install --save-dev hardhat
```

查看此页面以获取有关[安装说明](https://hardhat.org/docs/getting-started)的更多详细信息。

## 第 8 步：创建 Hardhat 项目 {#step-8}

运行 `npx hardhat --init` 会生成一个完整的示例项目，但对于本教程，我们将手动进行设置，以便你可以看到每个部分。在项目文件夹的根目录中，创建一个名为 `hardhat.config.js` 的文件，其内容如下：

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

这是我们将指定项目所有设置的地方（在第 13 步中）。目前，它只是告诉 Hardhat 要使用哪个版本的 Solidity 编译器。

## 第 9 步：添加项目文件夹 {#step-9}

为了保持项目井然有序，我们将创建两个新文件夹。在命令行中导航到项目的根目录并输入：

```sh
mkdir contracts
mkdir scripts
```

- `contracts/` 是我们存放 hello world 智能合约代码文件的地方
- `scripts/` 是我们存放用于部署和与合约交互的脚本的地方

## 第 10 步：编写我们的合约 {#step-10}

你可能会问自己，我们到底什么时候才开始写代码？？好吧，我们现在到了第 10 步。

在你最喜欢的编辑器中打开 hello-world 项目（我们喜欢 [VSCode](https://code.visualstudio.com/)）。智能合约是用一种叫做 Solidity 的语言编写的，我们将使用它来编写我们的 HelloWorld.sol 智能合约。‌

1.  导航到“contracts”文件夹并创建一个名为 HelloWorld.sol 的新文件
2.  下面是一个来自以太坊基金会的 Hello World 智能合约示例，我们将把它用于本教程。将以下内容复制并粘贴到你的 HelloWorld.sol 文件中，并确保阅读注释以了解此合约的作用：

```solidity
// SPDX-License-Identifier: MIT
// 指定 Solidity 的版本，使用语义化版本控制。
// 了解更多：https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// 定义一个名为 `HelloWorld` 的合约。
// 合约是函数和数据（其状态）的集合。一旦部署，合约就驻留在以太坊区块链上的特定地址。了解更多：https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // 声明一个 `string` 类型的状态变量 `message`。
   // 状态变量是其值永久存储在合约存储中的变量。关键字 `public` 使变量可以从合约外部访问，并创建一个函数，其他合约或客户端可以调用该函数来访问该值。
   string public message;

   // 与许多基于类的面向对象语言类似，构造函数是一个特殊的函数，仅在合约创建时执行。
   // 构造函数用于初始化合约的数据。了解更多：https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // 接受一个字符串参数 `initMessage` 并将该值设置到合约的 `message` 存储变量中）。
      message = initMessage;
   }

   // 一个接受字符串参数并更新 `message` 存储变量的公共函数。
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

这是一个超级简单的智能合约，它在创建时存储一条消息，并且可以通过调用 `update` 函数进行更新。

## 第 11 步：将梅塔马斯克和 Alchemy 连接到你的项目 {#step-11}

我们已经创建了梅塔马斯克钱包、Alchemy 账户，并编写了我们的智能合约，现在是时候将这三者连接起来了。

从你的虚拟钱包发送的每笔交易都需要使用你唯一的私钥进行签名。为了向我们的程序提供此权限，我们可以安全地将我们的私钥（和 Alchemy API 密钥）存储在环境文件中。

> 要了解有关发送交易的更多信息，请查看[交易文档](/developers/docs/transactions/)。

在我们的项目根目录中创建一个 `.env` 文件，并将你的梅塔马斯克私钥和 HTTP Alchemy API URL 添加到其中。

- 按照[这些说明](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)导出你的私钥
- 请参阅下文以获取 HTTP Alchemy API URL

![get alchemy api key](./get-alchemy-api-key.png)

复制 Alchemy API URL

你的 `.env` 应该如下所示：

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

为了将这些实际连接到我们的代码，我们将在第 13 步的 `hardhat.config.js` 文件中引用这些变量。Node.js 可以自行读取 `.env` 文件，因此无需安装额外的包。

<Alert variant="warning">
<AlertContent>
<AlertDescription>
不要提交 <code>.env</code>！请确保永远不要与任何人共享或暴露你的 <code>.env</code> 文件，因为这样做会泄露你的机密信息。如果你使用的是版本控制，请将你的 <code>.env</code> 添加到 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 文件中。
</AlertDescription>
</AlertContent>
</Alert>

## 第 12 步：安装 Ethers.js {#step-12-install-ethersjs}

Ethers.js 是一个库，它通过使用更用户友好的方法包装[标准 JSON-RPC 方法](/developers/docs/apis/json-rpc/)，使与以太坊交互和发出请求变得更加容易。

Hardhat 使得集成[插件](https://hardhat.org/docs/plugins/official-plugins)以获得额外的工具和扩展功能变得超级容易。我们将利用 [Ethers 插件](https://hardhat.org/docs/plugins/hardhat-ethers)进行合约部署（[Ethers.js](https://docs.ethers.org/v6/) 有一些非常简洁的合约部署方法）。

在你的项目目录中输入：

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

在下一步中，我们还将把该插件添加到我们的 `hardhat.config.js` 中。

## 第 13 步：更新 hardhat.config.js {#step-13-update-hardhatconfigjs}

到目前为止，我们已经添加了几个依赖项和插件，现在我们需要更新 `hardhat.config.js`，以便我们的项目知道它们。

将你的 `hardhat.config.js` 更新为如下所示：

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// 如果存在，则从 .env 文件中将 API_URL 和 PRIVATE_KEY 加载到 process.env 中
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` 告诉 Hardhat 仅在需要时才从环境变量中读取每个值，因此像 `compile` 这样的命令甚至在设置值之前就可以工作。如果你不想将私钥保存在纯文本文件中，Hardhat 也可以[从加密的密钥库中读取配置变量](https://hardhat.org/docs/guides/configuration-variables)。

## 第 14 步：编译我们的合约 {#step-14-compile-our-contracts}

为了确保到目前为止一切正常，让我们编译我们的合约。`compile` 任务是内置的 Hardhat 任务之一。

在命令行中运行：

```sh
npx hardhat compile
```

第一次编译时，Hardhat 会下载 Solidity 编译器。然后你应该会看到类似 `Compiled 1 Solidity file with solc 0.8.34` 的内容。如果没有，你可以随时在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中留言。

## 第 15 步：编写我们的部署脚本 {#step-15-write-our-deploy-scripts}

现在我们的合约已经写好，配置文件也准备就绪，是时候编写我们的合约部署脚本了。

导航到 `scripts/` 文件夹并创建一个名为 `deploy.js` 的新文件，向其中添加以下内容：

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// 开始部署，返回一个解析为合约对象的 promise
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

让我们来看看这些代码每一行的作用。

```js
const { ethers } = await network.create()
```

在 Hardhat 3 中，脚本会显式打开与网络的连接。`network.create()` 连接到你在运行脚本时使用 `--network` 选项选择的网络，并且 `hardhat-ethers` 插件会将一个 `ethers` 对象添加到该连接中。

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Ethers.js 中的 `ContractFactory` 是用于部署新智能合约的抽象，因此这里的 `HelloWorld` 是我们 hello world 合约实例的工厂。当使用 `hardhat-ethers` 插件时，`ContractFactory` 和 `Contract` 实例默认连接到第一个签名者。

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

在 `ContractFactory` 上调用 `deploy()` 将开始部署，并返回一个解析为 `Contract` 的 `Promise`。这个对象为我们的每个智能合约函数提供了一个方法。你传递给 `deploy()` 的参数会进入合约的构造函数，这里是初始消息。

`waitForDeployment()` 会等待直到部署交易被包含在一个区块中，而 `getAddress()` 会返回新合约的地址。有关更多详细信息，请参阅 [Ethers.js 合约文档](https://docs.ethers.org/v6/api/contract/)。

## 第 16 步：部署我们的合约 {#step-16-deploy-our-contract}

我们终于准备好部署我们的智能合约了！导航到命令行并运行：

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

然后你应该会看到类似如下的内容：

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

如果我们前往 [Sepolia Etherscan](https://sepolia.etherscan.io/) 并搜索我们的合约地址，我们应该能够看到它已成功部署。交易看起来会像这样：

![etherscan contract](./etherscan-contract.png)

`From` 地址应该与你的梅塔马斯克账户地址匹配，而 To 地址将显示“Contract Creation”（合约创建），但如果我们点击进入交易，我们将在 `To` 字段中看到我们的合约地址：

![etherscan transaction](./etherscan-transaction.png)

恭喜！你刚刚将一个智能合约部署到了以太坊链上 🎉

要了解其内部运作原理，你可以查看你的“Hello World”应用在 [Alchemy 仪表板](https://dashboard.alchemy.com/)中收到的请求。

在那里，你会看到当我们调用 `.deploy()` 函数时，Hardhat/Ethers 在后台为我们进行的一些 JSON-RPC 调用。这里需要指出的两个重要调用是 [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction)（这是实际将我们的合约写入 Sepolia 链的请求）和 [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash)（这是在给定哈希的情况下读取有关我们交易信息的请求，这是发送交易时的典型模式）。要了解有关发送交易的更多信息，请查看[交易文档](/developers/docs/transactions/)。

本教程到此结束。接下来，你可以[为你的合约构建一个用户界面](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)。
