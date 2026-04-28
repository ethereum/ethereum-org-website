---
title: "面向初学者的 Hello World 智能合约"
description: "关于在以太坊上编写和部署一个简单智能合约的入门教程。"
author: "elanh"
tags: [ "Solidity", "hardhat", "Alchemy", "智能合同", "部署" ]
skill: beginner
breadcrumb: "Hello World合约"
lang: zh
published: 2021-03-31
---

如果你是区块链开发的初学者，还不知道如何开始，或者你只是想了解怎样部署智能合约并与之进行交互，这篇教程就是为你准备的。 我们将逐步演示如何使用虚拟钱包 [MetaMask](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org/) 和 [Alchemy](https://www.alchemy.com/eth) 在 Sepolia 测试网上创建和部署一个简单的智能合约（如果你还不了解这些术语的含义，别担心，我们稍后会解释）。

在本教程的[第 2 部分](https://docs.alchemy.com/docs/interacting-with-a-smart-contract)中，我们将介绍如何在部署智能合约后与其进行交互；在[第 3 部分](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)中，我们将介绍如何在 Etherscan 上发布它。

如果你在任何时候有任何问题，请随时在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中提出！

## 第 1 步：连接到以太坊网络 {#step-1}

有很多方法可以向以太坊链发送请求。 为简单起见，我们将使用 Alchemy 上的免费帐户，这是一个区块链开发者平台和应用程序接口 (API)，它允许我们与以太坊链通信，而无需运行自己的节点。 该平台还有用于监控和分析的开发者工具，我们将在本教程中利用这些工具来了解智能合约部署的内部工作原理。 如果你还没有 Alchemy 帐户，[可在此处免费注册](https://dashboard.alchemy.com/signup)。

## 第 2 步：创建你的应用程序（和 API 密钥） {#step-2}

创建 Alchemy 帐户后，你可以通过创建应用程序来生成应用程序接口密钥。 这将使我们能够向 Sepolia 测试网络发出请求。 如果你不熟悉测试网，请查看[此页面](/developers/docs/networks/)。

1. 在 Alchemy 仪表板中，通过在导航栏中选择“Select an app”，然后点击“Create new app”，导航到“Create new app”页面。

![Hello world 创建应用程序](./hello-world-create-app.png)

2. 将你的应用程序命名为“Hello World”，提供简短描述，并选择一个用例，例如“Infra & Tooling”。 接下来，搜索“Ethereum”并选择网络。

![创建应用程序视图 hello world](./create-app-view-hello-world.png)

3. 点击“Next”继续，然后点击“Create app”，就完成了！ 你的应用程序应出现在导航栏下拉菜单中，并提供可供复制的 API 密钥。

## 第 3 步：创建以太坊帐户（地址） {#step-3}

我们需要一个以太坊帐户来发送和接收交易。 在本教程中，我们将使用 MetaMask，它是浏览器中的虚拟钱包，用来管理你的以太坊帐户地址。 更多关于[交易](/developers/docs/transactions/)的信息。

你可以在[此处](https://metamask.io/download)免费下载 MetaMask 并创建以太坊帐户。 创建帐户时，或者如果你已有帐户，请确保使用网络下拉菜单切换到“Sepolia”测试网（这样我们就不会处理真实货币）。

如果你没有看到 Sepolia 列出，请进入菜单，然后进入 Advanced，向下滚动以打开“Show test networks”。 在网络选择菜单中，选择“Custom”选项卡，找到测试网列表并选择“Sepolia”。

![metamask sepolia 示例](./metamask-sepolia-example.png)

## 第 4 步：从水龙头获取以太币 {#step-4}

为了将我们的智能合约部署到测试网，我们需要一些假的 Eth。 要获取 Sepolia ETH，你可以访问 [Sepolia 网络详情](/developers/docs/networks/#sepolia)页面查看各种水龙头列表。 如果一个不能用，就试试另一个，因为它们有时会枯竭。 由于网络拥堵，收到你的假 ETH 可能需要一些时间。 之后不久，你应该就能在你的 Metamask 帐户中看到 ETH 了！

## 第 5 步：检查你的余额 {#step-5}

为了再次检查我们的余额，让我们使用 [Alchemy 的编辑器工具](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) 发出 [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) 请求。 这将返回我们钱包中的以太币数量。 输入你的 MetaMask 帐户地址并点击“Send Request”后，你应该会看到这样的响应：

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> \*\*注意：\*\*这个结果以 wei 为单位，而不是 ETH。 Wei 是以太币的最小计量单位。 wei 到 ETH 的换算方法是：1 eth = 10<sup>18</sup> wei。 所以，如果我们将 0x2B5E3AF16B1880000 转换为十进制，我们会得到 5\*10¹⁸，即 5 ETH。
>
> 哦！ 我们的假钱都到账了 <Emoji text=":money_mouth_face:" size={1} />。

## 第 6 步：初始化我们的项目 {#step-6}

首先，需要为我们的项目创建一个文件夹。 导航到你的命令行，然后输入：

```
mkdir hello-world
cd hello-world
```

现在我们进入了项目文件夹，我们将使用 `npm init` 来初始化项目。 如果你还没有安装 npm，请遵循[这些说明](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)（我们还需要 Node.js，所以也请下载它！）。

```
npm init
```

如何回答安装问题并不重要，下面是我们的做法，仅供参考：

```
package name: (hello-world)
version: (1.0.0)
description: hello world 智能合约
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
  "description": "hello world 智能合约",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

批准 package.json，我们就可以继续了！

## 第 7 步：下载 [Hardhat](https://hardhat.org/getting-started/#overview) {#step-7}

Hardhat是一个用于编译、部署、测试和调试以太坊软件的开发环境。 它帮助开发者在本地构建智能合约和去中心化应用程序并部署到实时链上。

在我们的 `hello-world` 项目中运行：

```
npm install --save-dev hardhat
```

请查看此页面，详细了解[安装说明](https://hardhat.org/getting-started/#overview)。

## 第 8 步：创建 Hardhat 项目 {#step-8}

在我们的项目文件夹中运行：

```
npx hardhat
```

然后应该能看到一条欢迎消息和选项，用于选择你想要做的事情。 选择“创建一个空的 hardhat.config.js”：

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 欢迎来到 Hardhat v2.0.11 👷‍

您想做什么？…
创建一个示例项目
❯ 创建一个空的 hardhat.config.js
退出
```

这会为我们生成一个 `hardhat.config.js` 文件，我们将在其中指定我们项目的所有设置（在第 13 步中）。

## 第 9 步：添加项目文件夹 {#step-9}

为了让我们的项目井井有条，我们将创建两个新文件夹。 在你的命令行中导航到项目的根目录，然后输入：

```
mkdir contracts
mkdir scripts
```

- `contracts/` 是我们存放 hello world 智能合约代码文件的地方
- `scripts/` 是我们存放部署和交互合约脚本的地方

## 第 10 步：编写我们的合约 {#step-10}

你可能会问自己，我们到底什么时候才开始写代码？ 好了，现在就是第 10 步。

在你喜欢的编辑器中打开 hello-world 项目（我们喜欢 [VSCode](https://code.visualstudio.com/)）。 智能合约是用一种名为 Solidity 的语言编写的，我们将用它来编写 HelloWorld.sol 智能合约。‌

1. 导航到“contracts”文件夹并创建一个名为 HelloWorld.sol 的新文件
2. 下面是以太坊基金会提供的一个 Hello World 智能合约示例，我们将在本教程中使用它。 将以下内容复制并粘贴到你的 HelloWorld.sol 文件中，并务必阅读注释以了解此合约的作用：

```solidity
// 指定 Solidity 版本，使用语义化版本。
// 了解更多：https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// 定义一个名为 `HelloWorld` 的合约。
// 合约是函数和数据（其状态）的集合。部署后，合约位于以太坊区块链上的一个特定地址。了解更多：https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // 声明一个 `string` 类型的状态变量 `message`。
   // 状态变量是其值永久存储在合约存储中的变量。关键字 `public` 使变量可以从合约外部访问，并创建一个其他合约或客户端可以调用以访问该值的函数。
   string public message;

   // 与许多基于类的面向对象语言类似，构造函数是一个特殊函数，仅在创建合约时执行。
   // 构造函数用于初始化合约的数据。了解更多：https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 接受一个字符串参数 `initMessage`，并将其值设置到合约的 `message` 存储变量中）。
      message = initMessage;
   }

   // 一个公共函数，接受一个字符串参数并更新 `message` 存储变量。
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

这是一个非常简单的智能合约，它在创建时存储一条消息，并可以通过调用 `update` 函数进行更新。

## 第 11 步：将 MetaMask 和 Alchemy 连接到你的项目 {#step-11}

我们已经创建了 MetaMask 钱包、Alchemy 帐户并编写了智能合约，现在是时候将这三者连接起来了。

从虚拟钱包发送的每笔交易都需要使用你独有的私钥签名。 为了给程序提供此项许可，我们可以安全地将私钥（和 Alchemy 应用程序接口密钥）存储在一个环境文件中。

> 要了解有关发送交易的更多信息，请查看这篇关于使用 web3 发送交易的[教程](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)。

首先，在项目目录中安装 dotenv 软件包：

```
npm install dotenv --save
```

然后，在项目根目录中创建一个 `.env` 文件，并将你的 MetaMask 私钥和 HTTP Alchemy API URL 添加进去。

- 按照[这些说明](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)导出你的私钥
- 请参阅下文以获取 HTTP Alchemy API URL

![获取 alchemy api 密钥](./get-alchemy-api-key.png)

复制 Alchemy API URL

你的 `.env` 文件应如下所示：

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

为了真正将它们连接到我们的代码，我们将在第 13 步的 `hardhat.config.js` 文件中引用这些变量。

<Alert variant="warning">
<AlertContent>
<AlertDescription>
不要提交 <code>.env</code>！ 请确保永远不要与任何人共享或公开你的 <code>.env</code> 文件，因为这样做会泄露你的机密信息。 如果你使用版本控制，请将你的 <code>.env</code> 添加到 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 文件中。
</AlertDescription>
</AlertContent>
</Alert>

## 第 12 步：安装 Ethers.js {#step-12-install-ethersjs}

Ethers.js 是一个程序库，它通过将[标准的 JSON-RPC 方法](/developers/docs/apis/json-rpc/)封装成对用户更友好的方法，使得与以太坊交互和发出请求变得更加容易。

Hardhat可以非常轻松地集成[插件](https://hardhat.org/plugins/)，以获得额外的工具和扩展功能。 我们将利用 [Ethers 插件](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)进行合约部署（[Ethers.js](https://github.com/ethers-io/ethers.js/) 有一些非常简洁的合约部署方法）。

在你的项目目录中输入：

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

我们还将在下一步的 `hardhat.config.js` 中要求 ethers。

## 第 13 步：更新 hardhat.config.js {#step-13-update-hardhatconfigjs}

到目前为止，我们已经添加了几个依赖项和插件，现在我们需要更新 `hardhat.config.js`，以便我们的项目了解所有这些依赖项和插件。

将你的 `hardhat.config.js` 更新为如下所示：

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## 第 14 步：编译我们的合约 {#step-14-compile-our-contracts}

为了确保一切正常，我们来编译一下合约。 `compile` 任务是内置的 hardhat 任务之一。

在命令行中运行：

```
npx hardhat compile
```

你可能会收到关于 `SPDX license identifier not provided in source file` 的警告，但不必担心——希望其他一切都正常！ 如果编译不成功，可以随时在 [Alchemy discord](https://discord.gg/u72VCg3) 中发消息。

## 第 15 步：编写我们的部署脚本 {#step-15-write-our-deploy-scripts}

合约已经写完，配置文件也准备妥当，现在是写合约部署脚本的时候了。

导航到 `scripts/` 文件夹并创建一个名为 `deploy.js` 的新文件，向其中添加以下内容：

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // 开始部署，返回一个解析为合约对象的 promise
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("合约已部署到地址：", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat在他们的[合约教程](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)中极好地解释了每一行代码的作用，我们在此处采用了他们的解释。

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js 中的 `ContractFactory` 是一个用于部署新智能合约的抽象，所以这里的 `HelloWorld` 是我们的 hello world 合约实例的工厂。 使用 `hardhat-ethers` 插件时，`ContractFactory` 和 `Contract` 实例默认连接到第一个签名者。

```
const hello_world = await HelloWorld.deploy();
```

在 `ContractFactory` 上调用 `deploy()` 将开始部署，并返回一个解析为 `Contract` 的 `Promise`。 这个对象包括我们智能合约中每个函数的对应调用方法。

## 第 16 步：部署我们的合约 {#step-16-deploy-our-contract}

我们终于准备好部署我们的智能合约啦！ 导航到命令行并运行：

```
npx hardhat run scripts/deploy.js --network sepolia
```

你会看到类似以下所示的信息：

```
合约已部署到地址：0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

如果我们访问 [Sepolia etherscan](https://sepolia.etherscan.io/) 并搜索我们的合约地址，我们应该能看到它已成功部署。 交易将类似以下：

![etherscan 合约](./etherscan-contract.png)

`From` 地址应与你的 MetaMask 帐户地址匹配，而 To 地址将显示“Contract Creation”，但如果我们点击进入交易，我们将在 `To` 字段中看到我们的合约地址：

![etherscan 交易](./etherscan-transaction.png)

恭喜！ 你刚刚向以太坊链部署了一个智能合约 🎉

要了解其内部工作原理，我们导航至 [Alchemy 仪表板](https://dashboard.alchemyapi.io/explorer)中的“浏览器”选项卡。 如果你有多个 Alchemy 应用程序，请确保按应用程序筛选并选择“Hello World”。
![hello world 浏览器](./hello-world-explorer.png)

在这里，你会看到当我们调用 `.deploy()` 函数时，Hardhat/Ethers 在后台为我们进行的一些 JSON-RPC 调用。 这里需要指出的两个重要调用是 [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction)，这是将我们的合约实际写入 Sepolia 链的请求；以及 [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash)，这是一个根据哈希读取交易信息的请求（处理交易时的典型模式）。 要了解有关发送交易的更多信息，请查看本教程：[使用 Web3 发送交易](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)

本教程的第 1 部分到此结束，在第 2 部分中，我们将通过更新初始消息来实际[与我们的智能合约进行交互](https://www.alchemy.com/docs/interacting-with-a-smart-contract)；在第 3 部分中，我们将[把我们的智能合约发布到 Etherscan](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)，这样每个人都知道如何与它交互。

**想了解更多关于 Alchemy 的信息吗？ 请访问我们的[网站](https://www.alchemy.com/eth)。 不想错过任何更新？ 在此[订阅](https://www.alchemy.com/newsletter)我们的新闻通讯！ 也请务必加入我们的 [Discord](https://discord.gg/u72VCg3)。**。
