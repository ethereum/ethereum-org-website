---
title: "如何编写和部署 NFT（NFT 教程系列第 1/3 部分）"
description: "本教程是 NFT 系列的第 1 部分，将带你逐步了解如何使用以太坊和星际文件系统 (IPFS) 编写和部署非同质化代币（ERC-721 代币）智能合约。"
author: "苏米·穆吉尔"
tags: ["ERC-721", "Alchemy", "Solidity", "智能合约"]
skill: beginner
breadcrumb: "编写和部署 NFT"
lang: zh
published: 2021-04-22
---

随着非同质化代币 (NFT) 将区块链带入公众视野，现在正是你通过在以太坊区块链上发布自己的 NFT 合约（ERC-721 代币）来亲自了解这一热潮的绝佳机会！

在本教程中，我们将逐步介绍如何使用 [梅塔马斯克](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/)、[Hardhat](https://hardhat.org/)、[Pinata](https://pinata.cloud/) 和 [Alchemy](https://alchemy.com/signup/eth) 在 Sepolia 测试网上创建和部署 ERC-721 智能合约（如果你还不懂这些词的意思，请不要担心，我们会解释的！）。

在本教程的第 2 部分，我们将介绍如何使用我们的智能合约铸造 NFT，在第 3 部分，我们将解释如何在梅塔马斯克上查看你的 NFT。

当然，如果你在任何时候有疑问，请随时在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中联系我们，或访问 [Alchemy 的 NFT API 文档](https://www.alchemy.com/docs/reference/nft-api-quickstart)！

## 第 1 步：连接到以太坊网络 {#connect-to-ethereum}

有很多方法可以向以太坊区块链发出请求，但为了简单起见，我们将在 [Alchemy](https://alchemy.com/signup/eth) 上使用一个免费账户。Alchemy 是一个区块链开发者平台和 API，允许我们与以太坊链进行通信，而无需运行我们自己的节点。

在本教程中，我们还将利用 Alchemy 的开发者工具进行监控和分析，以了解我们的智能合约部署在内部是如何运作的。如果你还没有 Alchemy 账户，可以在[这里](https://alchemy.com/signup/eth)免费注册。

## 第 2 步：创建你的应用（和 API 密钥） {#make-api-key}

创建 Alchemy 账户后，你可以通过创建应用来生成应用程序编程接口 (API) 密钥。这将允许我们向 Sepolia 测试网发出请求。如果你想了解有关测试网的更多信息，请查看[本指南](https://www.alchemy.com/docs/choosing-a-web3-network)。

1. 在导航栏中选择“Select an app”，然后点击“Create new app”，导航到 Alchemy 仪表板中的“Create new app”页面。

![创建你的应用](./alchemy-create-new-app.png)

2. 为你的应用命名（我们选择了“My First NFT!”），提供简短描述，并选择一个用例。接下来，搜索“Ethereum”并选择网络。我们将使用 Sepolia，这是推荐用于应用程序开发的测试网（请参阅[以太坊网络](/developers/docs/networks/#ethereum-testnets)）。

3. 点击“Next”继续，然后点击“Create app”，就这么简单！你的应用应该会出现在导航栏的下拉菜单中，并提供可复制的 API 密钥。

## 第 3 步：创建一个以太坊账户（地址） {#create-eth-address}

我们需要一个以太坊账户来发送和接收交易。在本教程中，我们将使用梅塔马斯克，这是一款浏览器中的虚拟钱包，用于管理你的以太坊账户地址。如果你想了解更多关于以太坊交易如何运作的信息，请查看以太坊基金会的[此页面](/developers/docs/transactions/)。

你可以免费在[这里](https://metamask.io/download)下载并创建一个梅塔马斯克账户。在创建账户时，或者如果你已经有账户，请确保使用网络选择菜单切换到“Sepolia”测试网（这样我们就不会使用真金白银）。如果你没有看到 Sepolia，请打开右上角的菜单，选择“Networks”，然后打开“Show test networks”开关（请参阅[梅塔马斯克查看测试网指南](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)）。

![将 Sepolia 设置为你的网络](./metamask-sepolia.png)

## 第 4 步：从水龙头添加以太币 {#step-4-add-ether-from-a-faucet}

为了将我们的智能合约部署到测试网，我们需要一些假 ETH。要获取 Sepolia ETH，请选择[Sepolia 网络详情](/developers/docs/networks/#sepolia)中列出的水龙头之一，并输入你的账户地址。如果一个不起作用，请尝试另一个，因为它们有时会枯竭，而且有些有资格规则：例如，[Alchemy Sepolia 水龙头](https://www.alchemy.com/faucets/ethereum-sepolia)要求接收地址在以太坊主网上至少持有 0.001 ETH。不久之后，你应该会在你的梅塔马斯克账户中看到 ETH！

## 第 5 步：检查你的余额 {#check-balance}

为了再次确认我们的余额已到账，让我们使用 [Alchemy 的沙盒工具](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)发出一个 [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) 请求。这将返回我们钱包中的 ETH 数量。输入你的梅塔马斯克账户地址并点击“Send Request”后，你应该会看到类似如下的响应：

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **注意** 此结果的单位是 Wei，而不是 ETH。Wei 被用作以太币的最小面额。从 Wei 到 ETH 的转换是 1 ETH = 10<sup>18</sup> Wei。因此，如果我们将 0xde0b6b3a7640000 转换为十进制，我们会得到 1\*10<sup>18</sup> Wei，这等于 1 ETH。

呼！我们的假钱都在那里了。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```
## 第 6 步：初始化我们的项目 {#initialize-project}

首先，我们需要为我们的项目创建一个文件夹。导航到你的命令行并输入：

```sh
mkdir my-nft
cd my-nft
```

现在我们进入了项目文件夹，我们将使用 npm init 来初始化项目。如果你还没有安装 npm，请按照 [Node.js 安装说明](https://nodejs.org/en/download/)进行操作（本教程需要 Node.js 和 npm）。

```sh
npm init
```

你如何回答安装问题并不重要；以下是我们的做法，仅供参考：

```text
package name: (my-nft)
version: (1.0.0)
description: My first NFT!
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

{
  "name": "my-nft",
  "version": "1.0.0",
  "description": "My first NFT!",
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

## 第 7 步：安装 [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat 是一个用于编译、部署、测试和调试以太坊软件的开发环境。它可以帮助开发人员在部署到实时链之前在本地构建智能合约和去中心化应用 (dapp)。

Hardhat 3 需要 Node.js v22.13.0 或更高版本。在我们的 my-nft 项目中运行：

```sh
npm install --save-dev hardhat
```

查看此页面以获取有关[安装说明](https://hardhat.org/docs/getting-started)的更多详细信息。

## 第 8 步：创建 Hardhat 项目 {#create-hardhat-project}

运行 `npx hardhat --init` 会生成一个完整的示例项目，但在本教程中，我们将手动进行设置，以便你可以看到每个部分。在项目文件夹的根目录中，创建一个名为 `hardhat.config.js` 的文件，其内容如下：

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

这是我们将指定项目所有设置的地方（在第 13 步）。目前，它只是告诉 Hardhat 使用哪个版本的 Solidity 编译器。

## 第 9 步：添加项目文件夹 {#add-project-folders}

为了保持项目井然有序，我们将创建两个新文件夹。在命令行中导航到项目的根目录并输入：

```sh
mkdir contracts
mkdir scripts
```

- contracts/ 是我们保存 NFT 智能合约代码的地方

- scripts/ 是我们保存用于部署智能合约并与之交互的脚本的地方

## 第 10 步：编写我们的合约 {#write-contract}

现在我们的环境已经设置好了，接下来是更激动人心的事情：*编写我们的智能合约代码！*

在你最喜欢的编辑器（我们喜欢 [VSCode](https://code.visualstudio.com/)）中打开 my-nft 项目。智能合约是用一种叫做 Solidity 的语言编写的，我们将使用它来编写我们的 MyNFT.sol 智能合约。

1. 导航到 `contracts` 文件夹并创建一个名为 MyNFT.sol 的新文件。

2. 以下是我们的 NFT 智能合约代码，它基于 [欧本齐柏林](https://docs.openzeppelin.com/contracts/5.x/erc721) 库的 ERC-721 实现。将以下内容复制并粘贴到你的 MyNFT.sol 文件中。

   ```solidity
   // 基于 https://docs.openzeppelin.com/contracts/5.x/erc721 的合约
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. 因为我们继承了欧本齐柏林合约库中的类，所以在命令行中运行 `npm install @openzeppelin/contracts` 将该库安装到我们的文件夹中。本教程使用欧本齐柏林 Contracts 5.x，它需要 Solidity 0.8.24 或更高版本。

那么，这段代码到底*做*了什么？让我们逐行分解。

在智能合约的顶部，我们导入了三个 [欧本齐柏林](https://openzeppelin.com/) 智能合约类：

- @openzeppelin/contracts/token/ERC721/ERC721.sol 包含 ERC-721 标准的实现，我们的 NFT 智能合约将继承该标准。（要成为有效的 NFT，你的智能合约必须实现 ERC-721 标准的所有方法。）要了解有关继承的 ERC-721 函数的更多信息，请在[此处](https://eips.ethereum.org/EIPS/eip-721)查看接口定义。

- @openzeppelin/contracts/access/Ownable.sol 在我们的智能合约上设置了[访问控制](https://docs.openzeppelin.com/contracts/5.x/access-control)，因此只有智能合约的所有者（你）才能铸造 NFT。所有者是传递给构造函数的 `initialOwner` 地址。（注意，包含访问控制完全是个人偏好。如果你希望任何人都能使用你的智能合约铸造 NFT，请从合约定义和构造函数中删除 `Ownable` 和 `Ownable(initialOwner)`，并从 `mintNFT` 函数中删除 `onlyOwner`。）

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol 扩展了 ERC-721，以便每个代币都可以存储自己的元数据 URI，我们在铸造时设置该 URI。

在导入语句之后，我们有了自定义的 NFT 智能合约，它出奇地短——只包含一个计数器、一个构造函数和一个函数！这要归功于我们继承的欧本齐柏林合约，它们实现了我们创建 NFT 所需的大部分方法，例如返回 NFT 所有者的 `ownerOf`，以及将 NFT 的所有权从一个账户转移到另一个账户的 `transferFrom`。

计数器 `_nextTokenId` 跟踪已铸造的 NFT 总数，并在我们的新 NFT 上设置唯一 ID。（使用智能合约铸造的每个 NFT 都必须分配一个唯一 ID——在这里，我们的唯一 ID 仅由存在的 NFT 总数决定。`++_nextTokenId` 在使用计数器之前增加它，因此我们使用智能合约铸造的第一个 NFT 的 ID 为“1”，第二个 NFT 的 ID 为“2”，依此类推。）

在我们的 ERC-721 构造函数中，你会注意到我们传递了 2 个字符串，“MyNFT”和“NFT”。第一个变量是智能合约的名称，第二个是它的符号。你可以随意命名这些变量！

最后，我们有 `mintNFT(address recipient, string memory tokenURI)` 函数，它允许我们铸造 NFT！你会注意到这个函数接收两个变量：

- `address recipient` 指定将接收你新铸造的 NFT 的地址

- `string memory tokenURI` 是一个字符串，它应该解析为描述 NFT 元数据的 JSON 文档。NFT 的元数据才是真正赋予它生命的东西，允许它具有可配置的属性，例如名称、描述、图像和其他属性。在本教程的第 2 部分中，我们将描述如何配置此元数据。

`mintNFT` 调用继承的 ERC-721 库中的一些方法，并最终返回一个代表新铸造的 NFT 的 ID 的数字。

## 第 11 步：将梅塔马斯克和 Alchemy 连接到你的项目 {#connect-metamask-and-alchemy}

现在我们已经创建了梅塔马斯克钱包、Alchemy 账户并编写了智能合约，是时候将这三者连接起来了。

从你的虚拟钱包发送的每笔交易都需要使用你唯一的私钥进行签名。为了向我们的程序提供此权限，我们可以安全地将私钥（和 Alchemy API 密钥）存储在环境文件中。

要了解有关发送交易的更多信息，请查看[交易文档](/developers/docs/transactions/)。

在项目的根目录中创建一个 `.env` 文件，并将你的梅塔马斯克私钥和 HTTP Alchemy API URL 添加到其中。

- 按照[这些说明](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)从梅塔马斯克导出你的私钥

- 请参阅下文获取 HTTP Alchemy API URL 并将其复制到剪贴板

![复制你的 Alchemy API URL](./copy-alchemy-api-url.mp4#842x480)

你的 `.env` 现在应该如下所示：

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

为了将这些实际连接到我们的代码，我们将在第 13 步的 hardhat.config.js 文件中引用这些变量。Node.js 可以自行读取 `.env` 文件，因此无需安装额外的包。

<EnvWarningBanner />

## 第 12 步：安装 Ethers.js {#install-ethers}

Ethers.js 是一个库，它通过用更用户友好的方法包装[标准 JSON-RPC 方法](/developers/docs/apis/json-rpc/)，使与以太坊交互和发出请求变得更加容易。

Hardhat 使得集成[插件](https://hardhat.org/docs/plugins/official-plugins)以获得额外的工具和扩展功能变得非常容易。我们将利用 [Ethers 插件](https://hardhat.org/docs/plugins/hardhat-ethers)进行合约部署（[Ethers.js](https://docs.ethers.org/v6/) 有一些非常简洁的合约部署方法）。

在你的项目目录中输入：

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

在下一步中，我们还将把该插件添加到我们的 hardhat.config.js 中。

## 第 13 步：更新 hardhat.config.js {#update-hardhat-config}

到目前为止，我们已经添加了几个依赖项和插件，现在我们需要更新 hardhat.config.js，以便我们的项目了解所有这些内容。

将你的 hardhat.config.js 更新为如下所示：

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// 如果存在 .env 文件，则将其中的 API_URL 和 PRIVATE_KEY 加载到 process.env 中
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

## 第 14 步：编译我们的合约 {#compile-contract}

为了确保到目前为止一切正常，让我们编译我们的合约。编译任务是内置的 hardhat 任务之一。

在命令行中运行：

```sh
npx hardhat compile
```

第一次编译时，Hardhat 会下载 Solidity 编译器。然后你应该会看到类似 `Compiled 1 Solidity file with solc 0.8.34` 的内容。如果没有，你可以随时在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中留言。

## 第 15 步：编写我们的部署脚本 {#write-deploy}

现在我们的合约已经编写完毕，配置文件也准备就绪，是时候编写我们的合约部署脚本了。

导航到 `scripts/` 文件夹并创建一个名为 `deploy.js` 的新文件，向其中添加以下内容：

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// 开始部署，返回一个解析为合约对象的 Promise
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

让我们来看看这些代码行各自的作用。

```js
const { ethers } = await network.create()
```

在 Hardhat 3 中，脚本显式打开与网络的连接。`network.create()` 连接到你在运行脚本时使用 `--network` 选项选择的网络，并且 `hardhat-ethers` 插件将 `ethers` 对象添加到该连接中。

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` 返回为网络配置的账户。在 Sepolia 上，这就是你在 `.env` 中放入私钥的账户。我们将其地址传递给构造函数，以便你成为合约的所有者。

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

ethers.js 中的 ContractFactory 是用于部署新智能合约的抽象，因此这里的 MyNFT 是我们 NFT 合约实例的工厂。使用 hardhat-ethers 插件时，ContractFactory 和 Contract 实例默认连接到第一个签名者。

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

在 ContractFactory 上调用 deploy() 将开始部署，并返回一个解析为 Contract 的 Promise。这个对象为我们的每个智能合约函数提供了一个方法。你传递给 deploy() 的参数会进入合约的构造函数，这里是 `initialOwner` 地址。

`waitForDeployment()` 等待部署交易被包含在区块中，而 `getAddress()` 返回新合约的地址。有关更多详细信息，请参阅 [ethers.js 合约文档](https://docs.ethers.org/v6/api/contract/)。

## 第 16 步：部署我们的合约 {#deploy-contract}

我们终于准备好部署我们的智能合约了！导航回项目目录的根目录，并在命令行中运行：

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

然后你应该会看到类似以下内容：

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

如果我们转到 [Sepolia Etherscan](https://sepolia.etherscan.io/) 并搜索我们的合约地址，我们应该能够看到它已成功部署。如果你不能立即看到它，请稍等片刻，因为这可能需要一些时间。交易将如下所示：

![在 Etherscan 上查看你的交易地址](./etherscan-sepoila-contract-creation.png)

From 地址应与你的梅塔马斯克账户地址匹配，To 地址将显示“Contract Creation”。如果我们点击进入交易，我们将在 To 字段中看到我们的合约地址：

![在 Etherscan 上查看你的合约地址](./etherscan-sepolia-tx-details.png)

太棒了！你刚刚将你的 NFT 智能合约部署到了以太坊（测试网）链上！

要了解内部运作原理，你可以查看你的应用在 [Alchemy 仪表板](https://dashboard.alchemy.com/)中收到的请求。

在那里，你会看到当我们调用 .deploy() 函数时，Hardhat/Ethers 在内部为我们进行的一些 JSON-RPC 调用。这里需要指出的两个重要调用是 [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction)（这是将我们的智能合约实际写入 Sepolia 链的请求）和 [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash)（这是在给定哈希的情况下读取有关我们交易信息的请求，这是发送交易时的典型模式）。要了解有关发送交易的更多信息，请查看[交易文档](/developers/docs/transactions/)。

这就是本教程第 1 部分的全部内容。在[第 2 部分中，我们将通过铸造 NFT 实际与我们的智能合约进行交互](/developers/tutorials/how-to-mint-an-nft/)，在[第 3 部分中，我们将向你展示如何在你的以太坊钱包中查看你的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)！
