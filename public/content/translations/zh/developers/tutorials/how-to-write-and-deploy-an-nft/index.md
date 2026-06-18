---
title: 如何编写和部署 NFT（NFT 教程系列第 1/3 部分）
description: 本教程是 NFT 系列的第 1 部分，将带你逐步了解如何使用以太坊和星际文件系统 (IPFS) 编写和部署非同质化代币（ERC-721 代币）智能合约。
author: "苏米·穆吉尔"
tags: ["ERC-721", "Alchemy", "Solidity", "智能合约"]
skill: beginner
breadcrumb: 编写和部署 NFT
lang: zh
published: 2021-04-22
---

随着 NFT 将区块链带入公众视野，现在正是通过在以太坊区块链上发布你自己的 NFT 合约（ERC-721 代币）来亲自了解这一热潮的绝佳机会！

Alchemy 非常自豪能够为 NFT 领域的知名项目提供支持，包括 Makersplace（最近在佳士得以 6900 万美元创下数字艺术品拍卖纪录）、Dapper Labs（NBA Top Shot 和 Crypto Kitties 的创作者）、OpenSea（全球最大的 NFT 市场）、Zora、Super Rare、NFTfi、Foundation、Enjin、Origin Protocol、Immutable 等。

在本教程中，我们将逐步介绍如何使用 [梅塔马斯克](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org/)、[Pinata](https://pinata.cloud/) 和 [Alchemy](https://alchemy.com/signup/eth) 在 Sepolia 测试网上创建和部署 ERC-721 智能合约（如果你还不明白这些是什么意思，请不要担心——我们会解释的！）。

在本教程的第 2 部分中，我们将介绍如何使用我们的智能合约来铸造 NFT，在第 3 部分中，我们将解释如何在梅塔马斯克上查看你的 NFT。

当然，如果你在任何时候有疑问，请随时在 [Alchemy Discord](https://discord.gg/gWuC7zB) 中联系我们，或访问 [Alchemy 的 NFT API 文档](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)！

## 第 1 步：连接到以太坊网络 {#connect-to-ethereum}

有很多方法可以向以太坊区块链发出请求，但为了简单起见，我们将在 [Alchemy](https://alchemy.com/signup/eth) 上使用一个免费账户。Alchemy 是一个区块链开发者平台和 API，允许我们与以太坊链进行通信，而无需运行我们自己的节点。

在本教程中，我们还将利用 Alchemy 的开发者工具进行监控和分析，以了解我们的智能合约部署在内部是如何运作的。如果你还没有 Alchemy 账户，可以在[这里](https://alchemy.com/signup/eth)免费注册。

## 第 2 步：创建你的应用（和 API 密钥） {#make-api-key}

创建 Alchemy 账户后，你可以通过创建应用来生成 API 密钥。这将允许我们向 Sepolia 测试网发出请求。如果你想了解有关测试网的更多信息，请查看[本指南](https://docs.alchemyapi.io/guides/choosing-a-network)。

1. 将鼠标悬停在导航栏中的“Apps”上并点击“Create App”，导航到 Alchemy 仪表板中的“Create App”页面。

![Create your app](./create-your-app.png)

2. 为你的应用命名（我们选择了“My First NFT!”），提供简短描述，在 Chain（链）中选择“Ethereum”，并在 network（网络）中选择“Sepolia”。自合并以来，其他测试网已被弃用。

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. 点击“Create app”，就这么简单！你的应用应该会出现在下表中。

## 第 3 步：创建一个以太坊账户（地址） {#create-eth-address}

我们需要一个以太坊账户来发送和接收交易。在本教程中，我们将使用梅塔马斯克，这是一款浏览器中的虚拟钱包，用于管理你的以太坊账户地址。如果你想了解更多关于以太坊交易如何运作的信息，请查看以太坊基金会的[此页面](/developers/docs/transactions/)。

你可以在[这里](https://metamask.io/download)免费下载并创建梅塔马斯克账户。在创建账户时，或者如果你已经有账户，请确保切换到右上角的“Sepolia Test Network”（这样我们就不会使用真金白银了）。

![Set Sepolia as your network](./metamask-goerli.png)

## 第 4 步：从水龙头添加以太币 {#step-4-add-ether-from-a-faucet}

为了将我们的智能合约部署到测试网，我们需要一些测试用的 ETH。要获取 ETH，你可以前往由 Alchemy 托管的 [Sepolia 水龙头](https://sepoliafaucet.com/)，登录并输入你的账户地址，点击“Send Me ETH”。不久之后，你应该就能在你的梅塔马斯克账户中看到 ETH 了！

## 第 5 步：检查你的余额 {#check-balance}

为了再次确认我们的余额已到账，让我们使用 [Alchemy 的 composer 工具](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)发出一个 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 请求。这将返回我们钱包中的 ETH 数量。输入你的梅塔马斯克账户地址并点击“Send Request”后，你应该会看到类似如下的响应：

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **注意** 此结果的单位是 Wei，而不是 ETH。Wei 被用作以太币的最小面额。Wei 到 ETH 的换算关系是 1 ETH = 10<sup>18</sup> Wei。因此，如果我们将 0xde0b6b3a7640000 转换为十进制，我们会得到 1\*10<sup>18</sup> Wei，这等于 1 ETH。

呼！我们的测试资金都在那里了。

## 第 6 步：初始化我们的项目 {#initialize-project}

首先，我们需要为我们的项目创建一个文件夹。导航到你的命令行并输入：

    mkdir my-nft
    cd my-nft

现在我们进入了项目文件夹，我们将使用 npm init 来初始化项目。如果你还没有安装 npm，请遵循[这些说明](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)（我们还需要 [Node.js](https://nodejs.org/en/download/)，所以也请下载它！）。

    npm init

你如何回答安装问题并不重要；以下是我们的做法，仅供参考：

```json
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

批准 package.json，我们就可以开始了！

## 第 7 步：安装 [Hardhat](https://hardhat.org/getting-started/#overview) {#install-hardhat}

Hardhat 是一个用于编译、部署、测试和调试以太坊软件的开发环境。它帮助开发者在部署到实时链之前在本地构建智能合约和去中心化应用 (dapp)。

在我们的 my-nft 项目中运行：

    npm install --save-dev hardhat

查看此页面以获取有关[安装说明](https://hardhat.org/getting-started/#overview)的更多详细信息。

## 第 8 步：创建 Hardhat 项目 {#create-hardhat-project}

在我们的项目文件夹中运行：

    npx hardhat

然后你应该会看到一条欢迎消息以及选择你要执行的操作的选项。选择“create an empty hardhat.config.js”：

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

这将为我们生成一个 hardhat.config.js 文件，我们将在其中指定项目的所有设置（在第 13 步中）。

## 第 9 步：添加项目文件夹 {#add-project-folders}

为了保持项目井井有条，我们将创建两个新文件夹。在命令行中导航到项目的根目录并输入：

    mkdir contracts
    mkdir scripts

- contracts/ 是我们存放 NFT 智能合约代码的地方

- scripts/ 是我们存放用于部署和与智能合约交互的脚本的地方

## 第 10 步：编写我们的合约 {#write-contract}

现在我们的环境已经设置完毕，接下来是更激动人心的事情：_编写我们的智能合约代码！_

在你最喜欢的编辑器（我们喜欢 [VSCode](https://code.visualstudio.com/)）中打开 my-nft 项目。智能合约是用一种叫做 Solidity 的语言编写的，我们将使用它来编写我们的 MyNFT.sol 智能合约。‌

1. 导航到 `contracts` 文件夹并创建一个名为 MyNFT.sol 的新文件

2. 下面是我们的 NFT 智能合约代码，它基于 [欧本齐柏林](https://docs.openzeppelin.com/contracts/3.x/erc721) 库的 ERC-721 实现。将以下内容复制并粘贴到你的 MyNFT.sol 文件中。

   ```solidity
   //基于 [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721) 的合约
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. 因为我们继承了欧本齐柏林合约库中的类，所以在命令行中运行 `npm install @openzeppelin/contracts^4.0.0` 以将该库安装到我们的文件夹中。

那么，这段代码到底_做_了什么？让我们逐行分解。

在智能合约的顶部，我们导入了三个 [欧本齐柏林](https://openzeppelin.com/) 智能合约类：

- @openzeppelin/contracts/token/ERC721/ERC721.sol 包含 ERC-721 标准的实现，我们的 NFT 智能合约将继承该标准。（要成为有效的 NFT，你的智能合约必须实现 ERC-721 标准的所有方法。）要了解有关继承的 ERC-721 函数的更多信息，请在[此处](https://eips.ethereum.org/EIPS/eip-721)查看接口定义。

- @openzeppelin/contracts/utils/Counters.sol 提供了只能递增或递减一的计数器。我们的智能合约使用计数器来跟踪已铸造的 NFT 总数，并在我们的新 NFT 上设置唯一 ID。（使用智能合约铸造的每个 NFT 都必须分配一个唯一 ID——在这里，我们的唯一 ID 仅由现存的 NFT 总数决定。例如，我们使用智能合约铸造的第一个 NFT 的 ID 为“1”，第二个 NFT 的 ID 为“2”，依此类推。）

- @openzeppelin/contracts/access/Ownable.sol 在我们的智能合约上设置了[访问控制](https://docs.openzeppelin.com/contracts/3.x/access-control)，因此只有智能合约的所有者（你）才能铸造 NFT。（注意，包含访问控制完全是个人偏好。如果你希望任何人都能使用你的智能合约铸造 NFT，请删除第 10 行的 Ownable 和第 17 行的 onlyOwner。）

在导入语句之后，是我们自定义的 NFT 智能合约，它出奇地短——只包含一个计数器、一个构造函数和一个函数！这要归功于我们继承的欧本齐柏林合约，它们实现了我们创建 NFT 所需的大部分方法，例如返回 NFT 所有者的 `ownerOf`，以及将 NFT 的所有权从一个账户转移到另一个账户的 `transferFrom`。

在我们的 ERC-721 构造函数中，你会注意到我们传递了 2 个字符串：“MyNFT”和“NFT”。第一个变量是智能合约的名称，第二个是它的符号。你可以随意命名这些变量！

最后，我们有允许我们铸造 NFT 的函数 `mintNFT(address recipient, string memory tokenURI)`！你会注意到这个函数接受两个变量：

- `address recipient` 指定将接收你新铸造的 NFT 的地址

- `string memory tokenURI` 是一个字符串，应解析为描述 NFT 元数据的 JSON 文档。NFT 的元数据真正赋予了它生命，使其具有可配置的属性，例如名称、描述、图像和其他属性。在本教程的第 2 部分中，我们将描述如何配置此元数据。

`mintNFT` 调用了继承的 ERC-721 库中的一些方法，并最终返回一个代表新铸造的 NFT 的 ID 的数字。

## 第 11 步：将梅塔马斯克和 Alchemy 连接到你的项目 {#connect-metamask-and-alchemy}

现在我们已经创建了梅塔马斯克钱包、Alchemy 账户并编写了我们的智能合约，是时候将这三者连接起来了。

从你的虚拟钱包发送的每笔交易都需要使用你唯一的私钥进行签名。为了向我们的程序提供此权限，我们可以安全地将我们的私钥（和 Alchemy API 密钥）存储在环境文件中。

要了解有关发送交易的更多信息，请查看[这篇关于使用 Web3 发送交易的教程](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)。

首先，在你的项目目录中安装 dotenv 包：

    npm install dotenv --save

然后，在我们的项目根目录中创建一个 `.env` 文件，并将你的梅塔马斯克私钥和 HTTP Alchemy API URL 添加到其中。

- 遵循[这些说明](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)从梅塔马斯克导出你的私钥

- 请参阅下文以获取 HTTP Alchemy API URL 并将其复制到剪贴板

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

你的 `.env` 现在应该如下所示：

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

为了将这些实际连接到我们的代码，我们将在第 13 步的 hardhat.config.js 文件中引用这些变量。

<EnvWarningBanner />

## 第 12 步：安装 Ethers.js {#install-ethers}

Ethers.js 是一个库，它通过用更用户友好的方法包装[标准 JSON-RPC 方法](/developers/docs/apis/json-rpc/)，使与以太坊交互和发出请求变得更加容易。

Hardhat 使得集成[插件](https://hardhat.org/plugins/)以获得额外的工具和扩展功能变得超级容易。我们将利用 [Ethers 插件](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)进行合约部署（[Ethers.js](https://github.com/ethers-io/ethers.js/) 有一些非常简洁的合约部署方法）。

在你的项目目录中输入：

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

在下一步中，我们还需要在 hardhat.config.js 中引入 ethers。

## 第 13 步：更新 hardhat.config.js {#update-hardhat-config}

到目前为止，我们已经添加了几个依赖项和插件，现在我们需要更新 hardhat.config.js，以便我们的项目了解所有这些内容。

将你的 hardhat.config.js 更新为如下所示：

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
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

## 第 14 步：编译我们的合约 {#compile-contract}

为了确保到目前为止一切正常，让我们编译我们的合约。编译任务是内置的 hardhat 任务之一。

从命令行运行：

    npx hardhat compile

你可能会收到关于源文件中未提供 SPDX 许可证标识符的警告，但无需担心——希望其他一切看起来都不错！如果不行，你随时可以在 [Alchemy Discord](https://discord.gg/u72VCg3) 中留言。

## 第 15 步：编写我们的部署脚本 {#write-deploy}

现在我们的合约已经编写完毕，配置文件也准备就绪，是时候编写我们的合约部署脚本了。

导航到 `scripts/` 文件夹并创建一个名为 `deploy.js` 的新文件，向其中添加以下内容：

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // 开始部署，返回一个解析为合约对象的 Promise
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat 在他们的[合约教程](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)中非常出色地解释了这些代码行各自的作用，我们在这里采用了他们的解释。

    const MyNFT = await ethers.getContractFactory("MyNFT");

Ethers.js 中的 ContractFactory 是用于部署新智能合约的抽象，因此这里的 MyNFT 是我们 NFT 合约实例的工厂。使用 hardhat-ethers 插件时，ContractFactory 和 Contract 实例默认连接到第一个签名者。

    const myNFT = await MyNFT.deploy();

在 ContractFactory 上调用 deploy() 将启动部署，并返回一个解析为 Contract 的 Promise。这是一个为我们的每个智能合约函数提供方法的对象。

## 第 16 步：部署我们的合约 {#deploy-contract}

我们终于准备好部署我们的智能合约了！导航回项目目录的根目录，并在命令行中运行：

    npx hardhat --network sepolia run scripts/deploy.js

然后你应该会看到类似如下的内容：

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

如果我们前往 [Sepolia Etherscan](https://sepolia.etherscan.io/) 并搜索我们的合约地址，我们应该能够看到它已成功部署。如果你不能立即看到它，请稍等片刻，因为这可能需要一些时间。交易将如下所示：

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

From 地址应与你的梅塔马斯克账户地址匹配，To 地址将显示“Contract Creation”。如果我们点击进入交易，我们将在 To 字段中看到我们的合约地址：

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

太棒了！你刚刚将你的 NFT 智能合约部署到了以太坊（测试网）链上！

为了了解内部是如何运作的，让我们导航到 [Alchemy 仪表板](https://dashboard.alchemyapi.io/explorer)中的 Explorer 选项卡。如果你有多个 Alchemy 应用，请确保按应用过滤并选择“MyNFT”。

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

在这里，你将看到当我们调用 .deploy() 函数时，Hardhat/Ethers 在后台为我们进行的一些 JSON-RPC 调用。这里需要指出的两个重要调用是 [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction)（这是将我们的智能合约实际写入 Sepolia 链的请求）和 [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)（这是在给定哈希的情况下读取有关我们交易信息的请求，这是发送交易时的典型模式）。要了解有关发送交易的更多信息，请查看这篇关于[使用 Web3 发送交易](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)的教程。

本教程的第 1 部分到此结束。在[第 2 部分中，我们将通过铸造 NFT 实际与我们的智能合约进行交互](/developers/tutorials/how-to-mint-an-nft/)，在[第 3 部分中，我们将向你展示如何在你的以太坊钱包中查看你的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)！