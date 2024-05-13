---
title: 针对初学者的 Hello World 智能合约指南 - 全栈
description: 关于编写和部署一个基于以太坊的简单智能合约的入门教程。
author: "nstrike2"
tags:
  - "solidity"
  - "hardhat"
  - "alchemy"
  - "智能合约"
  - "deploying"
  - "区块链浏览器"
  - "前端"
  - "交易"
skill: beginner
lang: zh
published: 2021-10-25
---

如果你是区块链开发的新手，不知道从哪里开始或者如何部署并与智能合约交互，那么这个指南就是为你准备的。 我们将演示如何使用 [MetaMask](https://metamask.io)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[安全帽](https://hardhat.org)以及 [Alchemy](https://alchemyapi.io/eth)，在 Goerli 测试网络上创建和部署一个简单的智能合约。

你将会需要一个 Alchemy 帐户来完成这个教程。 [注册一个免费帐户](https://www.alchemy.com/)。

如果你有任何问题，请随时在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中提出！

## 第一部分 - 使用安全帽创建和部署你的智能合约 {#part-1}

### 连接以太坊网络 {#connect-to-the-ethereum-network}

有多种方法可以向以太坊链发起连接请求。 简单起见，我们将会使用一个 Alchemy 上的免费帐户。Alchemy 是一个区块链开发者平台和应用程序接口，让我们在不用自己运行节点的情况下与以太坊链进行通信。 Alchemy 还有着用于监控和分析的开发者工具；我们将在本教程中利用这些工具来深入了解我们智能合约部署中的情况。

### 创建你的应用程序和应用程序接口密钥 {#create-your-app-and-api-key}

当你创建了一个 Alchemy 帐户后，你可以通过创建应用程序来生成应用程序接口密钥。 这将允许你向 Goerli 测试网发送请求。 如果你不熟悉测试网，你可以[阅读 Alchemy 指南来选择一个网络](https://docs.alchemyapi.io/guides/choosing-a-network)。

在 Alchemy 仪表板上，找到位于导航栏的 **Apps** 下拉菜单并点击 **Create App**。

![创建应用程序 Hello world](./hello-world-create-app.png)

给你的应用程序命名为“_Hello World_”并写一个简短的描述。 选择 **Staging** 作为你的环境以及 **Goerli** 作为你的网络。

![创建应用程序视图 hello world](./create-app-view-hello-world.png)

_注：请确保选择 **Goerli**，否则本教程将不适用。_

点击 **Create app**。 你的应用程序应该会出现在下面的表中。

### 创建一个以太坊帐户 {#create-an-ethereum-account}

你需要一个以太坊帐户来发送和接受交易。 我们将会使用 MetaMask，这是一个浏览器中的虚拟钱包，可供用户管理他们的以太坊帐户地址。

你可以[在这里](https://metamask.io/download.html)免费下载并创建一个 MetaMask 帐户。 When you are creating an account, or if you already have an account, make sure to switch over to the “Goerli Test Network” in the upper right (so that we’re not dealing with real money).

### 步骤 4：从水龙头添加以太币 {#step-4-add-ether-from-a-faucet}

为了将你的智能合约部署到测试网络，你需要一些虚拟以太币。 为了获得 Goerli 网络上的以太币，请前往 Goerli 水龙头并输入你的 Goerli 帐户地址。 注意 Goerli 水龙头最近可能不太可靠 - 请查看[测试网络页面](/developers/docs/networks/#goerli)以了解可以尝试的选项列表：

_注：由于网络拥塞，这可能需要一些时间。_

### 步骤 5：查看帐户余额 {#step-5-check-your-balance}

为了核查钱包中的以太币，我们使用 [Alchemy 的 Composer 工具](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)来发送 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 请求。 这将返回我们钱包中的以太币金额。 想要了解更多请查看 [Alchemy 关于如何使用 Composer 工具的简短教程](https://youtu.be/r6sjRxBZJuU)。

输入你的 MetaMask 帐户地址并点击 **Send Request**。 你将会看到类似以下代码片段的响应。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _注：此结果以 wei 为单位，而非 ETH。 Wei is used as the smallest denomination of ether._

Phew! 这里显示了我们所有的虚拟货币。

### 步骤 6：初始化我们的项目 {#step-6-initialize-our-project}

首先，需要为我们的项目创建一个文件夹。 导航到你的命令行并输入以下内容。

```
mkdir hello-world
cd hello-world
```

现在我们进入了项目文件夹，我们将使用 `npm init` 来初始化项目。

> 如果你尚未安装 npm，请按照[这些说明来安装 Node.js 和 npm](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)。

对于本教程而言，你如何回答初始化问题并不重要。 以下是我们的参考操作方式：

```
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

批准 package.json，我们就可以进行下一步了！

### 步骤 7：下载安全帽 {#step-7-download-hardhat}

安全帽是一个用于编译、部署、测试和调试以太坊软件的开发环境。 它帮助开发者在本地构建智能合约和去中心化应用程序并部署到实时链上。

在我们的 `hello-world` 项目中运行：

```
npm install --save-dev hardhat
```

查看此页面，了解更多有关[安装说明](https://hardhat.org/getting-started/#overview)的详细信息。

### 步骤 8：创建安全帽项目 {#step-8-create-hardhat-project}

在我们的 `hello-world` 项目文件夹中，运行：

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

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

这将会在项目中生成一个 `hardhat.config.js` 文件。 我们稍后将在教程中使用它来为我们的项目指定设置。

### 步骤 9：添加项目文件夹 {#step-9-add-project-folders}

为了使项目有条理，我们将创建两个新的文件夹。 在命令行中，导航到你的 `hello-world` 项目的根目录中并输入：

```
mkdir contracts
mkdir scripts
```

- `contracts/` 是保存我们的 hello world 智能合约代码文件的位置
- `scripts/` 是我们存放脚本的位置，用于部署我们的合约和与之交互。

### 步骤 10：编写合约 {#step-10-write-our-contract}

你可能在问自己，到底什么时候才能写代码？ 就是现在！

在你最喜爱的编辑器中打开 hello-world 项目。 智能合约通常使用 Solidity 来编写，我们也将使用它来编写智能合约。

1. 导航到 `contracts` 文件夹并创建一个名为 `HelloWorld.sol` 的新文件。
2. 下面是我们将在本教程中使用的示例 Hello World 智能合约。 将下面的内容复制到 `HelloWorld.sol` 文件中。

_注：务必阅读注释以理解此合约的内容。_

```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// 一个合约是函数和数据（其状态）的集合。 Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // 状态变量是其值永久存储在合约存储中的变量。 The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // 构造器用于初始化合约的数据。 Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

这是一个在创建时存储一条消息的基础智能合约。 可以通过调用 `update` 函数来更新该合约。

### 步骤 11：将 Metamask 和 Alchemy 连接至你的项目 {#step-11-connect-metamask-alchemy-to-your-project}

我们创建了 MetaMask 钱包、Alchemy 帐户，并且编写了一个智能合约，现在是将这三者连起来的时候了。

从你的钱包发出的每一笔交易都需要使用你独有私钥的签名。 为了给我们的程序提供此权限，我们可以安全地将私钥存储在一个环境文件中。 我们也会在此存储一个 Alchemy 的应用程序接口密钥。

> 如需了解更多关于发送交易的信息，请查看关于使用 web3 发送交易的[教程](https://docs.alchemyapi.io/alchemy/tutorials/sending-transactions-using-web3-and-alchemy)。

首先，在项目目录中安装 dotenv 软件包：

```
npm install dotenv --save
```

然后，在项目根目录下创建一个 `.env` 文件。 在文件中添加你的 MetaMask 私钥和 HTTP Alchemy 应用程序接口 URL。

你的环境文件必须以 `.env` 命名，否则不会被识别为环境文件。

不要命名为 `process.env` 或 `.env-custom` 或其他名称。

- 遵循[这些说明](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)导出你的私钥
- 请从下方获取超文本传输协议 Alchemy 应用程序接口网址

![](./get-alchemy-api-key.gif)

你的 `.env` 文件应该类似：

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

为了将这些变量和代码连接，我们将在步骤 13 中调用 `hardhat.config.js` 文件中的这些变量。

### 步骤 12：安装 Ethers.js {#step-12-install-ethersjs}

Ethers.js 是一个程序库，通过以更加方便用户的方法打包[标准 JSON RPC 方法](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc)，从而更容易与以太坊互动，以及向以太坊提出请求。

安全帽可用于集成[插件](https://hardhat.org/plugins/)以获取额外的工具和扩展功能。 我们将利用 [Ethers 插件](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html)完成合约部署。

在你的项目目录中输入：

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### 步骤 13：更新 hardhat.config.js {#step-13-update-hardhat.configjs}

到目前为止，我们已经添加了几个依赖库和插件，现在我们需要更新 `hardhat.config.js`，以便项目使用所有这些新的组件。

按如下所示更新你的 `hardhat.config.js` 代码：

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### 步骤 14：编写合约 {#step-14-compile-our-contract}

为了确保一切正常，我们来编译一下合约。 `compile` 任务是安全帽的内部任务之一。

在命令行中运行：

```bash
npx hardhat compile
```

你可能会看到关于 `SPDX license identifier not provided in source file` 的警告，但不用担心，希望其他方面看起来一切正常！ 如果遇到问题，你可以随时在 [Alchemy cord](https://discord.gg/u72VCg3) 社区中发消息询问。

### 步骤 15：编写部署脚本 {#step-15-write-our-deploy-script}

合约已经写完，配置文件也准备妥当，现在是写合约部署脚本的时候了。

转到 `scripts/` 文件夹，创建一个名为 `deploy.js` 的新文件，在其中添加以下内容：

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Start deployment, returning a promise that resolves to a contract object
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

安全帽在[合约教程](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)中对这些代码的每一行均提供了很好的解释，我们在这里直接引用他们的解释。

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js 中的 `ContractFactory` 是用于部署新智能合约的抽象对象。因此这里的 `HelloWorld` 是我们 hello world 合约实例的[工厂](https://en.wikipedia.org/wiki/Factory_(object-oriented_programming))。 使用 `hardhat-ethers` 插件时，`ContractFactory` 和 `Contract` 实例默认与第一个签名者（所有者）相连。

```javascript
const hello_world = await HelloWorld.deploy()
```

调用 `ContractFactory` 代码中的 `deploy()` 函数会启动合约部署，然后返回解析为 `Contract` 对象的 `Promise`。 这个对象包括我们智能合约中每个函数的对应调用方法。

### 步骤 16：部署合约 {#step-16-deploy-our-contract}

我们终于准备好部署我们的智能合约啦！ 导航到命令行后运行：

```bash
npx hardhat run scripts/deploy.js --network goerli
```

你会看到类似以下所示的信息：

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**请保存这个地址**。 之后在教程中我们会用到这个地址。

如果我们在 [Goerli etherscan](https://goerli.etherscan.io) 搜索我们的合约地址，我们应能够看到它已经成功部署。 交易将类似以下：

![](./etherscan-contract.png)

`From` 地址应该匹配你的 MetaMask 帐户地址，`To` 地址将是**合约创建**。 如果我们点击进入交易，我们将在 `To` 字段中看到我们的合约地址。

![](./etherscan-transaction.png)

恭喜！ 你刚刚在以太坊测试网上部署了一个智能合约。

为了更深入了解到底发生了什么，我们转到 [Alchemy 仪表板](https://dashboard.alchemyapi.io/explorer)中的 Explorer 选项卡。 如果你有多个 Alchemy 应用程序，请确保按应用程序筛选，然后选择 **Hello World**。

![](./hello-world-explorer.png)

在这里，你会看到一系列 JSON-RPC 方法，当我们调用 `.deploy()` 函数时，安全帽/Ethers 会在后端完成这些方法。 在这里有两个重要的方法，[`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) 是用于把我们的合约写入 Goerli 链的请求，[`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash) 是根据哈希读取交易信息的请求。 如需了解更多关于发送交易的信息，请查看[我们关于使用 Web3 发送交易的教程](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)。

## 第二部分 - 和你的智能合约交互 {#part-2-interact-with-your-smart-contract}

现在我们已经成功地将智能合约部署到 Goerli 网络，让我们学习如何与它交互。

### 创建 interact.js 文件 {#create-a-interactjs-file}

这是我们将在其中编写交互脚本的文件。 我们将使用在第一部分中安装的 Ethers.js 库。

在 `scripts/` 文件夹中，新建一个文件，命名为 `interact.js`，添加以下代码：

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### 更新 .env 文件 {#update-your-env-file}

我们将使用新的环境变量，因此需要在[我们之前创建的 ](#step-11-connect-metamask-&-alchemy-to-your-project)`.env` 文件中定义这些变量。

我们需要为 Alchemy `API_KEY` 和部署你的智能合约的 `CONTRACT_ADDRESS` 添加定义。

你的 `.env` 文件应该如下所示：

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### 获取你的合约应用程序二进制接口 {#grab-your-contract-ABI}

我们的合约 [ABI（应用程序二进制接口）](/glossary/#abi)是与我们的智能合约交互的接口。 安全帽自动生成应用程序二进制接口，并将其保存在 `HelloWorld.json` 中。 为了使用该接口，我们需要通过在我们的 `interact.js` 文件中添加以下代码行来解析内容：

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

如果你想查看应用程序二进制接口，你可以将其发送到你的控制台：

```javascript
console.log(JSON.stringify(contract.abi))
```

要查看输出到控制台的应用程序二进制接口，请导航至你的终端并运行：

```bash
npx hardhat run scripts/interact.js
```

### 创建合约的实例 {#create-an-instance-of-your-contract}

为了与我们的合约进行交互，我们需要在代码中创建一个合约实例。 要使用 Ethers.js 实现，我们需要使用三个概念：

1. 提供者 - 为你提供区块链读写访问权限的节点提供者。
2. 签名者 - 代表可以给交易签名的以太坊帐户
3. 合约 - 代表部署在链上的特定合约的 Ethers.js对象

我们将使用上一步中的合约应用程序二进制接口来创建我们的合约实例：

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

在 [ethers.js 文档](https://docs.ethers.io/v5/)获取更多关于提供者、签名者和合约的信息。

### 阅读 init 消息 {#read-the-init-message}

还记得我们用 `initMessage = "Hello world!"` 部署合约时的情况吗？ 我们现在要读取存储在智能合约中的消息，并将其输出到控制台。

在 JavaScript 中，与网络交互时会使用异步函数。 要了解更多关于异步函数的信息，[请阅读这篇 Medium 文章](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)。

使用下面的代码来调用智能合约中的 `message` 函数，并读取 init 消息：

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

在终端使用 `npx hardhat run scripts/interact.js` 运行文件后，我们应该看到如下响应：

```
The message is: Hello world!
```

恭喜！ 你刚刚成功从以太坊区块链读取了智能合约数据，好样的！

### 更新消息 {#update-the-message}

除了读取消息，我们还可以使用 `update` 函数更新保存在我们智能合约中的消息！ 很酷，对吗？

要更新消息，我们可以直接在实例化的合约对象上调用 `update` 函数：

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

请注意，在第 11 行，我们对返回的交易对象调用了 `.wait()`。 这确保了脚本在退出函数前等待交易在区块链上完成挖掘。 如果不包含 `.wait()` 调用，脚本可能不会看到合约中更新后的 `message` 值。

### 读取新消息 {#read-the-new-message}

你可以重复[前面的步骤](#read-the-init-message)来读取更新后的 `message` 值。 花点时间，看看是否可以进行必要的更改以输出新值！

如果你需要提示，你的 `interact.js` 文件现在应如下所示：

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// contract instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

现在只需运行脚本，你应该能够看到旧消息、更新状态和输出到终端的新消息！

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

当运行那条脚本时，你可能会发现 `Updating the message...` 步骤需要一段时间才能加载完成，然后再加载新消息。 这是由挖矿过程导致的；如果你希望在对交易进行挖矿的同时追踪交易，可以访问 [Alchemy 内存池](https://dashboard.alchemyapi.io/mempool)查看交易的状态。 如果交易被丢弃，可以访问 [Goerli Etherscan](https://goerli.etherscan.io) 并搜索你的交易哈希值。

## 第三部分：将你的智能合约发布到 Etherscan {#part-3-publish-your-smart-contract-to-etherscan}

你已经完成了实现智能合约相关的所有艰苦工作，现在是时候与世界分享了！

通过在 Etherscan 上验证你的智能合约，任何人都可以查看其源代码，并与智能合约进行交互。 让我们开始吧！

### 步骤 1：在你的 Etherscan 帐户上生成应用程序接口密钥 {#step-1-generate-an-api-key-on-your-etherscan-account}

需要 Etherscan 应用程序接口密钥来验证你是否拥有你正在尝试发布的智能合约。

如果你还没有 Etherscan 帐户，[请注册一个帐户](https://etherscan.io/register)。

登录后，在导航栏中找到你的用户名，将鼠标悬停在用户名上，然后选择 **My profile** 按钮。

在你的个人资料页面上，应该可以看到一个侧边导航栏。 从侧边导航栏中，选择 **API Key**。 接下来，按“Add”按钮创建一个新的应用程序接口密钥，将你的应用程序命名为 **hello-world**，然后按 **Create New API Key** 按钮。

你的新应用程序接口密钥应出现在应用程序接口密钥表中。 将应用程序接口复制到剪贴板。

接下来，我们需要将 Etherscan 应用程序接口添加到 `.env` 文件中。

添加完成后，你的 `.env` 文件应如下所示：

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### 使用安全帽部署智能合约 {#hardhat-deployed-smart-contracts}

#### 安装 hardhat-etherscan {#install-hardhat-etherscan}

使用安全帽将你的合约发布到 Etherscan 非常简单。 首先需要安装 `hardhat-etherscan` 插件。 `hardhat-etherscan` 会在 Etherscan 上自动验证智能合约的源代码和应用程序二进制接口。 为了添加此插件，你需要在 `hello-world` 目录中运行：

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

安装完成后，在你的 `hardhat.config.js` 文件中添加下面的语句，并添加 Etherscan 配置选项：

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### 在 Etherscan 验证你的智能合约 {#verify-your-smart-contract-on-etherscan}

确认所有文件都已保存，且所有 `.env` 变量都已正确配置。

运行 `verify` 任务，传入合约地址以及要部署到的网络：

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

确保 `DEPLOYED_CONTRACT_ADDRESS` 是你在 Goerli 测试网络上部署的智能合约的地址。 此外，最后一个参数 (`'Hello World!'`) 必须是你在[第一部分的部署步骤](#write-our-deploy-script)中使用的相同字符串。

如果一切正常，你会在终端中看到以下消息：

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

恭喜！ 你的智能合约代码已经在 Etherscan 部署！

### 在 Etherscan 查看你的智能合约！ {#check-out-your-smart-contract-on-etherscan}

当你进入终端中给出的链接时，你应该会看到你的智能合约代码和应用程序二进制接口已在 Etherscan 上发布！

**哇 - 你成功了！ 现在所有人都可以调用或写入你的智能合约！ 我们已经等不及看你接下来会做什么了！**

## 第 4 部分 - 将智能合约与前端集成 {#part-4-integrating-your-smart-contract-with-the-frontend}

本教程结束时，你将知道如何：

- 将 MetaMask 钱包连接到你的去中心化应用程序
- 使用 [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) 应用程序接口从你的智能合约中读取数据
- 使用 MetaMask 对以太坊交易签名

对于此去中心化应用程序，我们会使用 [React](https://reactjs.org/) 作为前端框架；然而，需要注意的是，我们不会花很多时间来分解其基本内容，而是会聚焦于将 Web3 功能引入我们的项目。

作为前提条件，你需要对 React 有基本的了解。 否则，建议你完成官方的 [React 入门教程](https://reactjs.org/tutorial/tutorial.html)。

### 克隆启动文件 {#clone-the-starter-files}

首先，到 [hello-world-part-four GitHub 存储库](https://github.com/alchemyplatform/hello-world-part-four-tutorial)中获取项目的初始文件，并将此存储库克隆到你的本地计算机中。

在本地打开克隆的存储库。 你会注意到它包含两个文件夹：`starter-files` 和 `completed`。

- `starter-files` - **我们会在这个目录中工作**，我们会将用户界面连接到你的以太坊钱包以及我们在[第三部分](#part-3)中发布到 Etherscan 的智能合约。
- `completed` 包含已完成的整个教程，并只应用作出现问题时的参考。

下面，用你喜欢的代码编辑器打开 `starter-files`，然后进入 `src` 文件夹。

我们编写的所有代码都将保存在 `src` 文件夹下。 我们将通过编辑 `HelloWorld.js` 组件并编写 `util/interact.js` JavaScript 文件，为我们的项目提供 Web3 功能。

### 查看初始文件 {#check-out-the-starter-files}

在我们开始编写之前，让我们看看初始文件为我们提供了什么。

#### 让你的 react 项目运行起来 {#get-your-react-project-running}

首先在浏览器中运行 React 项目。 React 的美妙之处在于，一旦我们的项目在浏览器中运行，保存的任何更改都会在浏览器中实时更新。

要让项目运行，浏览到 `starter-files` 文件夹的根目录，然后在终端运行 `npm install` 以安装项目的依赖项：

```bash
cd starter-files
npm install
```

依赖项安装完成后，在终端运行 `npm start`：

```bash
npm start
```

这样做应该会在你的浏览器中打开 [http://localhost:3000/](http://localhost:3000/)，在这里你会看到我们项目的前端界面。 它应该包含一个字段 \(一个更新存储在智能合约中的消息的地方\)，一个“Connect Wallet”按钮，以及一个“Update”按钮。

如果你试图点击这些按钮，你会发现它们都不起作用—这是因为我们仍然需要对其功能进行编程。

#### `HelloWorld.js` 组件 {#the-helloworld-js-component}

让我们在编辑器中返回 `src` 文件夹并打开 `HelloWorld.js` 文件。 理解该文件中的所有内容非常重要，因为它是我们将要处理的主要 React 组件。

在该文件开头，你会发现我们有几条 import 语句，这些语句是我们项目运行所必须的，它们包括 React 程序库，useEffect 和 useState 钩子，一些来自 `./util/interact.js` 的项（我们之后还会更详细的说明它们！）以及 Alchemy 徽标。

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

下面，我们来定义将在特定事件后更新的状态变量。

```javascript
// HelloWorld.js

//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

以下是每个变量的含义：

- `walletAddress` — 存储用户钱包地址的字符串
- `status` — 用于存储有用消息，指导用户如何与去中心化应用程序交互的字符串
- `message` — 存储智能合约中当前消息的字符串
- `newMessage` — 存储将要写入智能合约中的新消息的字符串

在状态变量后，你会发现五个还未实现的函数：`useEffect`、`addSmartContractListener`、`addWalletListener`、`connectWalletPressed` 以及 `onUpdatePressed`。 我们会在下面解释它们的作用：

```javascript
// HelloWorld.js

//called only once
useEffect(async () => {
  //TODO: implement
}, [])

function addSmartContractListener() {
  //TODO: implement
}

function addWalletListener() {
  //TODO: implement
}

const connectWalletPressed = async () => {
  //TODO: implement
}

const onUpdatePressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://reactjs.org/docs/hooks-effect.html) — 这是会在你的组件被渲染后调用的 React 钩子。 因为向它传入了一个空的数组 `[]` 属性 \（见第 4 行\），它只会在组件的_第一次_渲染时被调用。 在这里我们会加载智能合约中存储的当前消息，调用智能合约和钱包监听器，并更新用户界面来反映钱包是否已连接。
- `addSmartContractListener` — 这个函数设置了一个监听器，这个监听器会监视 HelloWorld 合约中的 `UpdatedMessages` 事件，并在智能合约中的消息变化时更新用户界面。
- `addWalletListener` — 这个函数设置了一个监听器，来检测用户的 MetaMask 钱包的状态变化，比如用户断开他们的钱包或切换钱包地址时。
- `connectWalletPressed` — 这个函数用于将用户的 MetaMask 钱包连接到我们的去中心化应用程序。
- `onUpdatePressed` — 这个函数会在用户更新智能合约中存储的消息时被调用。

在接近该文件末尾处，我们获得我们组件的用户界面。

```javascript
// HelloWorld.js

//the UI of our component
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
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

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
    </div>
  </div>
)
```

如果你细致地检查这段代码，就会发现我们在用户界面中的哪里使用了各种状态变量：

- 在第 6-12 行，如果用户的钱包已连接 \(即 `walletAddress.length > 0`\)，我们就在 ID 为“walletButton;”的按钮中显示用户 `walletAddress` 的截短版，否则我们就只显示“连接钱包”。
- 在第 17 行，我们显示在 `message` 字符串中获取的智能合约中存储的当前消息。
- 在第 23-26 行，我们使用一个[受控组件，](https://reactjs.org/docs/forms.html#controlled-components)以用于在文本字段中输入更改时更新 `newMessage` 状态变量。

除了状态变量之外，你还将看到，在分别单击 ID 为 `publishButton` 和 `walletButton` 的按钮时，会调用 `connectWalletPressed` 和 `onUpdatePressed`。

最后，我们来看看 `HelloWorld.js` 组件是在哪里添加的。

如果你打开 `App.js` 文件，将会看到我们的 `HelloWorld.js` 组件是在第 7 行添加的。此文件是 React 中的主要组件，作为所有其他组件的容器。

最后，让我们再看看另一个为你提供的文件，`interact.js`。

#### `interact.js` 文件 {#the-interact-js-file}

因为我们建议采用 [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) 规范，我们需要一个单独的文件包含用来管理我们的去中心化应用程序的逻辑、数据和规则的所有函数，然后我们就能将这些函数导出到前端 \(`HelloWorld.js` 组件\)。

👆🏽这就是 `interact.js` 文件的确切目的！

进入 `src` 目录中的 `util` 文件夹，然后你就会发现我们引入了 `interact.js` 文件，它包含所有的智能合约交互以及钱包函数和变量。

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

你会发现在文件的开头，我们注释了 `helloWorldContract` 对象。 在之后的教程里，我们会删除这个对象的注释，并且在这个变量中实例化智能合约，然后我们可以将其导出到 `HelloWorld.js` 组件。

`helloWorldContract` 对象之后的四个未实现函数会发挥以下作用：

- `loadCurrentMessage` — 这个函数处理加载智能合约中存储的信息的逻辑。 它会使用 [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3)，向 Hello World 智能合约发起一个_读取_调用。
- `connectWallet` — 这个函数会将用户的 MetaMask 连接到我们的去中心化应用程序。
- `getCurrentWalletConnected` — 这个函数会在页面加载时检查是否已经有以太坊帐户连接到我们的去中心化应用程序，并且相应更新我们的用户界面。
- `updateMessage` — 这个函数会更新智能合约中存储的消息。 它会向 Hello World 智能合约发起一个_写入_调用，所以用户的 MetaMask 钱包需要签名一个以太坊交易来更新此消息。

现在我们已经了解所操作的对象，让我们看看如何从智能合约中读取吧！

### 第三步：从你的智能合约中读取 {#step-3-read-from-your-smart-contract}

为了从智能合约中读取，你需要成功设置以下内容：

- 一个到以太坊链的应用程序接口连接
- 一个已加载的智能合约实例
- 一个用来调用智能合约函数的函数
- 一个监听器，用于监听智能合约中你正读取的数据出现变化时的更新

听起来步骤可能很多，但是不要担心！ 我们会引导你逐步完成这些步骤！ :\)

#### 建立一个到以太坊链的应用程序接口连接 {#establish-an-api-connection-to-the-ethereum-chain}

还记得我们在教程的第二部分怎么用我们的 [Alchemy Web3 密钥从我们的智能合约中读取](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)吗？ 你在去中心化应用程序中也需要一个 Alchemy Web3 密钥来从链上读取。

如果你还没有提前准备好，首先，我们来安装 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)，导航到 `starter-files` 的根目录，然后在你的终端运行以下内容：

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) 是 [Web3.js](https://docs.web3js.org/) 的包装器，提供增强的应用程序接口方法和其他重要优势，让 Web3 开发者的工作更轻松。 它设计成只需经过最少的配置即可使用，因此你可以直接在你的应用程序中开始使用它！

然后，在你的项目目录中安装 [dotenv](https://www.npmjs.com/package/dotenv) 程序包，我们就有了一个在获取我们应用程序接口密钥后安全存储它的地方。

```text
npm install dotenv --save
```

对于我们的去中心化应用程序，将不再使用 HTTP 应用程序接口密钥，**而是改用 Websockets 应用程序接口密钥**，因为它会允许我们设置一个监测智能合约中消息变化的监听器。

在你获得应用程序接口密钥后，在你的根目录中创建 `.env` 文件，并在其中添加你的 Alchemy Websockets URL。 在这之后，你的 `.env` 文件应该如下所示：

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

现在，我们已经准备好在我们的去中心化应用程序中设置 Alchemy Web3 端点了！ 让我们回到嵌套在 `util` 文件夹中的 `interact.js`，并在文件的开头加上以下代码：

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

在上面，我们先从 `.env` 文件中导入了 Alchemy 密钥，然后将 `alchemyKey` 传递给 `createAlchemyWeb3` 以建立 Alchemy Web3 端点。

准备好此端点后，我们就可以加载智能合约了！

#### 加载你的 Hello World 智能合约 {#loading-your-hello-world-smart-contract}

要加载你的 Hello World 智能合约，将需要其合约地址和应用程序二进制接口，如果你完成了[这个教程的第三部分](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)，这两者都可以在 Etherscan 上找到。

#### 如何从 Etherscan 获取合约的应用程序二进制接口 {#how-to-get-your-contract-abi-from-etherscan}

如果你跳过了这个教程的第三部分，你可以使用 HelloWorld 合约，其地址为 [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code)。 它的应用程序二进制接口可在[这里](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code)找到。

在指定合约将要调用的函数，以及确保函数以你期望的格式返回数据时，合约的应用程序二进制接口必不可少。 复制合约应用程序二进制接口后，让我们将其保存到 `src` 目录，保存为文件名为 `contract-abi.json` 的 JSON 文件。

你的 contract-abi.json 文件应存储在 src 文件夹。

有了合约地址、应用程序二进制接口和 Alchemy Web3 端点，我们就可以使用[合约方法](https://docs.web3js.org/api/web3-eth-contract/class/Contract)来加载智能合约的实例。 将你的合约应用程序二进制接口导入 `interact.js` 文件，然后添加你的合约地址。

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

现在，我们终于可以删除 `helloWorldContract` 变量的注释，并用 AlchemyWeb3 端点加载智能合约了：

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

概括一下，你的 `interact.js` 文件的前 12 行应该如下所示：

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

我们现在已经加载了合约，可以实现 `loadCurrentMessage` 函数了！

#### 在 `interact.js` 文件中实现 `loadCurrentMessage` {#implementing-loadCurrentMessage-in-your-interact-js-file}

这个函数非常简单。 我们将通过一个简单的异步 Web3 调用来从我们的合约中读取信息。 我们的函数会返回智能合约中存储的消息：

将 `interact.js` 文件中的 `loadCurrentMessage` 更新为如下：

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

因为我们希望在用户界面中显示该智能合约，让我们将 `HelloWorld.js` 组件中的 `useEffect` 函数更新如下：

```javascript
// HelloWorld.js

//called only once
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

注意，我们只希望在组件第一次渲染时调用 `loadCurrentMessage` 函数一次。 我们很快会实现 `addSmartContractListener` 以在智能合约中的消息变化后自动更新用户界面。

在我们深入研究监听器之前，让我们看看现在已经做了什么！ 保存你的 `HelloWorld.js` 和 `interact.js` 文件，然后访问 [http://localhost:3000/](http://localhost:3000/)。

你会发现当前的消息不再是“No connection to the network.” 相反，它反映了智能合约中存储的消息。 酷！

#### 你的用户界面现在应该反映了智能合约中存储的消息 {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

说到监听器……

#### 实现 `addSmartContractListener` {#implement-addsmartcontractlistener}

回想我们在[这个教程的第 1 部分](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract)编写的 `HelloWorld.sol`，你会记得有一个名为 `UpdatedMessages` 的智能合约事件，这是在调用我们的智能合约的 `update` 函数后触发的 \（参见第 9 行和第 27 行\）：

```javascript
// HelloWorld.sol

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Defines a contract named `HelloWorld`.
// 一个合约是函数和数据（其状态）的集合。 Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // 状态变量是其值永久存储在合约存储中的变量。 The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // 构造器用于初始化合约的数据。 Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

智能合约事件是你的合约向你的前端应用程序传达区块链上发生的事情 \（即：有一个_事件_\）的一种方式，你的前端应用程序可以“监听”特定事件，并在事件发生时采取行动。

`addSmartContractListener` 函数将专门监听我们 Hello World 智能合约的 `UpdatedMessages` 事件，并更新用户界面来显示新消息。

将 `addSmartContractListener` 修改为如下内容：

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

让我们分析一下当监听器检测到事件时会发生什么：

- 如果事件触发时出现错误，它将通过我们的 `status` 状态变量反映在用户界面中。
- 反之，我们就可以使用返回的 `data` 对象。 `data.returnValues` 是一个以 0 为起始索引的数组，其中数组的第一个元素保存的是之前的消息，而第二个元素则保存了更新后的新消息。 总体来说，在成功触发事件的情况下，我们会将 `message` 字符串设置为更新后的消息，同时清除 `newMessage` 字符串，并且更新 `status` 状态变量以表明已在智能合约上发布一条新的消息。

最终，我们应在 `useEffect` 钩子函数中调用这个监听器，确保它在 `HelloWorld.js` 组件初次渲染时即被初始化。 综上所述，我们的 `useEffect` 钩子函数应当如下所示：

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

现在我们已经掌握了从智能合约读取消息的方法，那么接下来了解如何向智能合约中写入消息那就太棒了！ 然而，要向我们的去中心化应用执行写入，我们首先必须有一个连接到该去中心化应用程序的以太坊钱包。

接下来，我们将着手设置以太坊钱包 \(MetaMask\)，然后将其连接到我们的去中心化应用程序！

### 第四步：设置你的以太坊钱包 {#step-4-set-up-your-ethereum-wallet}

为了向以太坊链上写入任何数据，用户必须使用其虚拟钱包的私钥来签署交易。 在本教程中，我们将使用浏览器中的虚拟钱包 [MetaMask](https://metamask.io/) 来管理你的以太坊帐户地址，因为它让终端用户签署交易变得极其简单。

如果你想了解更多关于以太坊交易的运作方式，请查看以太坊基金会的[这个页面](/developers/docs/transactions/)。

#### 下载 MetaMask {#download-metamask}

你可以[在这里](https://metamask.io/download.html)免费下载并创建一个 MetaMask 帐户。 在你创建帐户时，或者如果你已经有帐户，请确保切换到右上角的“Goerli 测试网络”（这样我们就不会使用实际货币进行交易）。

#### 通过水龙头中添加以太币 {#add-ether-from-a-faucet}

为了在以太坊区块链上签署交易，我们需要一些虚拟以太币。 要获取以太币，你可以前往 [FaucETH](https://fauceth.komputing.org) 并输入你的 Goerli 帐户地址，单击“Request funds”，然后在下拉菜单中选择“Ethereum Testnet Goerli”，最后再次单击“Request funds”按钮。 你应该会很快在你的 MetaMask 帐户中看到以太币！

#### 查看你的余额 {#check-your-balance}

为了核查我们帐户中有余额，我们使用 [Alchemy composer 工具](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)发出 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 请求。 这将返回我们钱包中的以太币数量。 输入你的 Metamask 帐户地址并单击“发送请求”后，你应该会看到这样的响应：

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注意：**结果以 wei 为单位，而非 ETH。 Wei is used as the smallest denomination of ether. 从 wei 到 eth 的转换是：1 eth = 10¹⁸ wei。 因此，如果我们将 0xde0b6b3a7640000 转换为十进制，我们会得到 1\*10¹⁸，它等于 1 eth。

Phew! 我们的虚拟以太币都在那里了！ 🤑

### 第五步：将 MetaMask 连接到你的用户界面 {#step-5-connect-metamask-to-your-UI}

既然我们的 MetaMask 钱包已经设置好了，我们将我们的去中心化应用程序与之连接！

#### `connectWallet` 函数 {#the-connectWallet-function}

在我们的 `interact.js` 文件中，我们实现了 `connectWallet` 函数，然后我们可以在 `HelloWorld.js` 组件中调用它。

让我们将 `connectWallet` 函数修改为以下形式：

```javascript
// interact.js

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
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
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

那么，这一大段代码究竟是做什么的呢？

首先，该函数会检查你的浏览器是否启用了 `window.ethereum`。

`window.ethereum` 是一个由 MetaMask 和其他钱包提供商注入的全局应用程序接口，它允许网站请求用户的以太坊帐户。 如果被批准，它可以读取用户连接的区块链上的数据，并建议用户签署消息和交易。 参阅 [MetaMask 文档](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)了解更多信息！

如果 `window.ethereum` _ 不存在_，则表示未安装 MetaMask。 这会导致返回一个 JSON 对象，其中返回的 `address` 是一个空字符串，而 `status` JSX 对象指示用户必须安装 MetaMask。

现在如果 `window.ethereum` _存在_，那么事情就会变得有趣。

使用 try/catch 循环，我们将尝试通过调用 [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) 连接到 MetaMask。 调用此函数将在浏览器中打开 MetaMask，提示用户将他们的钱包连接到你的去中心化应用程序。

- 如果用户选择连接，`method: "eth_requestAccounts"` 将返回一个数组，其中包含连接到去中心化应用程序的用户的所有帐户地址。 总之，我们的 `connectWallet` 函数将返回一个 JSON 对象，其中包含此数组中的_第一个 _ `address` \（见第 9 行\），并返回一条 `status` 信息，提示用户向智能合约写入信息。
- 如果用户拒绝连接，则 JSON 对象将包含返回的 `address` 的空字符串和反映用户拒绝连接的 `status` 信息。

现在我们已经编写了这个 `connectWallet` 函数，下一步是调用它到我们的 `HelloWorld.js` 组件中。

#### 将 `connectWallet` 函数添加到你的 `HelloWorld.js` 用户界面组件中 {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

导航到 `HelloWorld.js` 文件中的 `connectWalletPressed` 函数，并将其更新为以下内容：

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

注意我们的大部分函数是如何从 `interact.js` 文件中的 `HelloWorld.js` 组件中抽象出来的？ 这就是我们遵守 M-V-C 规范的原因！

在 `connectWalletPressed` 中，我们只需对导入的 `connectWallet` 函数进行 await 调用，并使用其响应，通过变量的状态挂钩更新我们的 `status` 和 `walletAddress ` 变量。

现在，让我们保存两个文件 \(`HelloWorld.js` 和 `interact.js`\) ，并测试一下我们目前的用户界面。

打开浏览器，在地址栏中输入 [localhost:3000](http://localhost:3000/)，然后按页面右上角的“Connect Wallet”按钮。

如果你安装了 MetaMask，系统会提示你将钱包连接到去中心化应用程序。 接受邀请并连接。

你会看到钱包按钮现在反映你的地址已连接！ 太棒了 🔥 ！

接下来，尝试刷新页面......有点儿奇怪。 我们的钱包按钮提示我们连接 MetaMask，尽管它已经连接......

然而，不要害怕！ 我们可以通过实现 `getCurrentWalletConnected` 轻松解决这个问题（明白了吗？），它将检查一个地址是否已经连接到我们的去中心化应用程序，并相应地更新我们的用户界面！

#### `getCurrentWalletConnected` 函数 {#the-getcurrentwalletconnected-function}

将 `interact.js` 文件中的 `getCurrentWalletConnected` 函数更新如下：

```javascript
// interact.js

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
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
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

这段代码与我们刚刚在上一步中编写的 `connectWallet` 函数 _非常相似_ 。

主要区别在于，这里我们调用了 `eth_accounts` 方法，它只是返回一个数组，其中包含当前连接到我们的去中心化应用程序的 MetaMask 地址，而不是调用 `eth_requestAccounts` 方法来打开 MetaMask 以供用户连接他们的钱包。

为了看看这个函数在实际应用中的效果，让我们在 `HelloWorld.js` 组件的 `useEffect` 函数中调用它：

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

请注意，我们使用调用 `getCurrentWalletConnected` 的响应来更新我们的 `walletAddress` 和 `status` 状态变量。

现在我们已经添加了这段代码，让我们刷新浏览器窗口，看看最新的效果如何。

很不错！ 按钮应显示你已连接，并显示已连接钱包地址的预览 — 即使在你刷新后也是如此！

#### 实现 `addWalletListener` {#implement-addwalletlistener}

我们的去中心化应用程序钱包设置的最后一步是实现钱包监听器，以便我们的用户界面在钱包状态发生变化时更新，例如当用户断开或切换帐户时。

在你的 `HelloWorld.js` 文件中，按照以下方式修改你的 `addWalletListener` 函数：

```javascript
// HelloWorld.js

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
        🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

我敢打赌，到了这一步你可能已经无需我们帮助就能理解这里发生的情况了，但为了确保详尽无遗，我们还是快速梳理一下：

- 首先，我们的函数检查是否启用了 `window.ethereum` \（即 MetaMask 已安装\）。
  - 如果未启用，我们只需将 `status` 状态变量设置为提示用户安装 MetaMask 的 JSX 字符串。
  - 如果启用，我们会在第 3 行设置监听器 `window.ethereum.on("accountsChanged")` 监听 MetaMask 钱包中的状态变化，变化包括用户将其他帐户连接到去中心化应用程序、切换帐户或断开帐户。 如果至少连接了一个帐户，`walletAddress` 状态变量将更新为监听器返回的 `accounts` 数组中的第一个帐户。 否则，`walletAddress` 设置为空字符串。

最后，但同样重要的一点是，我们必须在 `useEffect` 函数中调用它：

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

就是这样！ 我们已经成功完成了所有钱包功能的编程！ 现在，我们来完成最后一个任务：更新智能合约中存储的消息！

### 第六步：实现 `updateMessage` 函数 {#step-6-implement-the-updateMessage-function}

好嘞，伙计们，我们已经来到最后阶段了！ 在 `interact.js` 文件中的 `updateMessage` 函数中，我们将执行以下操作：

1. 确保我们想要在智能合约中发布的消息有效
2. 使用 MetaMask 钱包签署每项交易
3. 从 `HelloWorld.js` 前端组件调用这个函数

这不会太耗时；我们把这个去中心化应用程序做完！

#### 输入错误处理 {#input-error-handling}

显然，我们在函数开头加入一些输入错误处理代码是有意义的做法。

如果未安装 MetaMask 扩展，或者钱包尚未连接 \（即传入的 `address` 为空字符串\），亦或是 `message` 为空字符串，我们希望函数能够提前返回。 让我们在 `updateMessage` 函数中添加以下错误处理代码：

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

现在，我们已经实现了正确的输入错误处理，接下来就是通过 MetaMask 来签署交易的时候了！

#### 签署交易 {#signing-our-transaction}

如果你已经对传统的 web3 以太坊交易驾轻就熟，那么接下来我们要编写的代码将会非常熟悉。 在输入错误处理代码下方，向 `updateMessage` 函数添加以下内容：

```javascript
// interact.js

//set up transaction parameters
const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: address, // must match user's active address.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//sign the transaction
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

让我们来详细解析下这些代码的工作原理。 首先，我们设置了交易参数，具体内容如下：

- `to` 指定接收者地址\（我们的智能合约\）
- `from` 指定交易的签名者，即我们传入函数的 `address` 变量
- `data` 包含对我们的“Hello World”智能合约中 `update` 方法的调用，其中将 `message` 字符串变量作为输入

接下来，我们进行对 `window.ethereum.request` 进行异步调用，请求 MetaMask 对交易进行签名。 请注意，在第 11 和 12 行中，我们指定了以太坊方法 `eth_sendTransaction`，并传入了我们的 `transactionParameters`。

此时，MetaMask 将在浏览器中打开，并提示用户签署或拒绝交易。

- 如果交易成功，该函数将返回一个 JSON 对象，其中 `status` JSX 字符串会提示用户前往 Etherscan 查看更多关于他们交易的信息。
- 如果交易失败，该函数将返回一个 JSON 对象，其中 `status` 字符串会传递错误消息。

综上所述，我们的 `updateMessage` 函数应如下所示：

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

最后但同样重要的是，我们需要将 `updateMessage` 函数与我们的 `HelloWorld.js` 组件进行连接。

#### 将 `updateMessage` 函数连接到 `HelloWorld.js` 前端 {#connect-updatemessage-to-the-helloworld-js-frontend}

我们的 `onUpdatePressed` 函数应当通过异步调用导入的 `updateMessage` 函数，并根据交易成功或失败的结果来修改 `status` 状态变量：

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

这个实现非常干净且简单。 你猜怎么着... 你的去中心化应用程序终于完工了！

现在就去测试一下 **Update** 按钮吧！

### 开发你的去中心化应用程序 {#make-your-own-custom-dapp}

哇哦，你成功完成了本教程的全部内容！ 回顾一下，你已经学习了如何：

- 使用 MetaMask 钱包连接你的去中心化应用程序项目
- 使用 [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) 应用程序接口从你的智能合约中读取数据
- 使用 MetaMask 对以太坊交易签名

现在，你已经完全掌握本教程中的技能，可以着手开发属于自己的个性化去中心化应用程序项目了！ 一如既往，如果你有任何问题，欢迎随时在 [Alchemy Discord](https://discord.gg/gWuC7zB) 频道联系我们寻求帮助。 🧙‍♂️

完成本教程后，请在 Twitter 上标记我们 [@alchemyplatform](https://twitter.com/AlchemyPlatform)，告诉我们你的体验如何，或者你是否有任何反馈！
