---
title: 如何撰写和部署非同质化代币（非同质化代币教程系列 1/3）
description: 本教程是关于非同质化代币的系列教程的第一部分，将带您逐步了解如何使用以太坊和星际文件系统 (IPFS) 编写和部署非同质化代币（ERC-721 代币）智能合约。
author: "Sumi Mudgil"
tags:
  - "ERC-721"
  - "Alchemy"
  - "Solidity"
  - "智能合约"
skill: beginner
lang: zh
published: 2021-04-22
---

随着非同质化代币将区块链带入公众视野，现在正是通过在以太坊区链上发布自己的非同质化代币合约（ERC-721 代币）来了解这一宣传的绝佳机会！

Alchemy 非常自豪能够推动非同质化代币领域的一些巨头，包括 Makersplace（最近在克利斯蒂拍卖行创造了 6900 万美元的数字艺术品销售记录）、Dapper Labs（NBA Top Shot & Crypto Kitties 的创作者）、OpenSea（世界上最大的非同质化代币市场）、Zora、Super Rare、NFTfi、Foundation、Enjin、Origin Protocol、Immutable 等。

在本教程中，我们将使用 [MetaMask](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[安全帽](https://hardhat.org/)、[Pinata](https://pinata.cloud/) 及 [Alchemy](https://alchemy.com/signup/eth) 演示如何在 Goerli 测试网上创建和部署 ERC-721 智能合约（如果你对这些方式有不明白之处，不要着急，我们将加以解释！）。

在本教程的第二部分，我们将了解如何使用我们的智能合约来铸造非同质化代币；在第三部分，我们将说明如何在 MetaMask 上查看您的非同质化代币。

当然，如果您有任何问题，请随时通过 [Alchemy Discord](https://discord.gg/gWuC7zB) 联系我们或阅读 [Alchemy 的非同质化代币应用程序接口相关文档](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)！

## 步骤 1：连接到以太坊网络 {#connect-to-ethereum}

有很多方法可以向以太坊区块链发出请求，但为了方便起见，我们将使用 [Alchemy](https://alchemy.com/signup/eth) 上的免费帐户。Alchemy 是一个区块链开发平台，能够提供应用程序接口，让我们无需运行自己的节点，即可与以太坊区块链进行通信。

在本教程中，我们将利用 Alchemy 平台的开发者工具进行监测和分析，以便了解智能合约部署的底层逻辑。 如果您还没有 Alchemy 帐户，您可以在[此处](https://alchemy.com/signup/eth)免费注册。

## 步骤 2：创建应用程序（和应用程序接口密钥） {#make-api-key}

创建了 Alchemy 帐户后，您可以通过创建应用程序来生成应用程序接口密钥。 这样，我们就可以向 Goerli 测试网发出请求。 如果您想了解更多关于测试网络的信息，请查看[本指南](https://docs.alchemyapi.io/guides/choosing-a-network)。

1. 在您的 Alchemy 仪表板中的“创建应用程序”页面上，将鼠标悬停在导航栏中的“应用程序”上 ，然后点击“创建应用程序”

![创建您的应用程序](./create-your-app.png)

2. 给你的应用程序命名（我们选择使用“My First NFT!”），提供简短描述，选择“Ethereum”作为区块链和“Goerli”作为你的网络。 合并后，其他测试网已被弃用。

![配置并发布您的应用程序](./configure-and-publish-your-app.png)

3. 点击"创建应用程序"，完成！ 您的应用程序应该会出现在下面的表格中。

## 步骤 3：创建一个以太坊帐户（地址） {#create-eth-address}

我们需要一个以太坊帐户来发送和接收交易。 在本教程中，我们将使用 MetaMask——浏览器中的虚拟钱包，用来管理您的以太坊帐户地址。 如果您想了解更多关于以太坊交易的运作方式，请查看以太坊基金会的[这个页面](/developers/docs/transactions/)。

您可以[在这里](https://metamask.io/download.html)免费下载并创建一个 MetaMask 帐户。 在你创建帐户时，或者如果你已经有帐户，请确保切换到右上角的“Goerli Test Network”（这样我们就不会使用实际货币进行交易）。

![将 Goerli 设置为你的网络](./metamask-goerli.png)

## 步骤 4：从水龙头添加以太币 {#step-4-add-ether-from-a-faucet}

为了将我们的智能合约部署到测试网络，我们需要一些虚拟以太币。 要想获得以太币，可以访问 Alchemy 托管的 [Goerli 水龙头](https://goerlifaucet.com/)，登录并输入你的帐户地址，点击“Send Me ETH”。 您应该会很快在您的 MetaMask 帐户中看到以太币！

## 步骤 5：查看帐户余额 {#check-balance}

为了核实我们的余额，可以使用 [Alchemy 的创作者工具](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)发出 [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) 请求。 这将返回我们钱包中的以太币金额。 输入您的 Metamask 帐户地址并单击“发送请求”后，您应该会看到这样的响应：

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **注：**此结果以 wei 为单位，而非 ETH。 Wei 是以太币的最小计量单位。 wei 与 ETH 之间的转换为 1 eth = 10<sup>18</sup> wei。 因此，如果我们将 0xde0b6b3a7640000 转换为十进制，我们得到 1\*10<sup>18</sup> wei，即 1 ETH。

哦！ 这里显示了我们所有的虚拟货币。

## 步骤 6：初始化我们的项目 {#initialize-project}

首先，需要为我们的项目创建一个文件夹。 导航到您的命令行，然后输入：

    mkdir my-nft
    cd my-nft

现在我们进入了项目文件夹，我们将使用 npm init 来初始化项目。 如果还没有安装 npm，请遵循[此处的说明](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)（我们还需要 [Node.js](https://nodejs.org/en/download/)，所以请下载此工具！）。

    npm init

其实如何回答安装问题并不重要，以下提供一个回答的样例供参考：

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

批准 package.json，我们就可以开始了！

## 步骤 7：安装[安全帽 (Hardhat)](https://hardhat.org/getting-started/#overview) {#install-hardhat}

安全帽是一个用于编译、部署、测试和调试以太坊软件的开发环境。 它帮助开发者在本地构建智能合约和去中心化应用程序并部署到实时链上。

在我们的 my-nft 项目内运行：

    npm install --save-dev hardhat

查看此页面，了解更多有关[安装说明](https://hardhat.org/getting-started/#overview)的详细信息。

## 步骤 8：创建安全帽项目 {#create-hardhat-project}

在我们的项目文件夹中运行：

    npx hardhat

然后应该能看到一条欢迎消息和选项，用于选择您想要做的事情。 选择“创建一个空的 hardhat.config.js”：

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? 您想做什么？ …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

这将生成一个 hardhat.config.js 文件，我们将在其中指定项目的所有设置（步骤 13）。

## 步骤 9：添加项目文件夹 {#add-project-folders}

为了使我们的项目有条理，我们将创建两个新的文件夹。 在您的命令行中导航到项目的根目录，然后输入：

    mkdir contracts
    mkdir scripts

- contracts/ 是我们保存非同质化代币智能合约代码的位置。

- scripts/ 是我们存放脚本的位置，用于部署我们的智能合约和与之交互。

## 步骤 10：编写合约 {#write-contract}

现在我们的环境已经配置完成，接下来将是更令人兴奋的内容：_编写我们的智能合约代码！_

在你喜欢的编辑器中打开 my-nft 项目（我们喜欢用 [VSCode](https://code.visualstudio.com/)）。 智能合约用一种名为 Solidity 的语言编写，我们将用它来编写我们的 MyNFT.sol 智能合约。

1. 导航到 `contracts` 文件夹并创建一个名为 MyNFT.sol 的新文件

2. 下面是我们的非同质化代币智能合约代码，基于 [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721) 库的 ERC-721 实现。 复制并粘贴以下内容到您的 MyNFT.sol 文件。

   ```solidity
   //Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. 因为我们要从 OpenZeppelin 合约库继承类，请在您的命令行中运行 `npm install @openzeppelin/contracts`，将该库安装到我们的文件夹中。

那么，这段代码究竟*做*了什么？ 让我们把它逐行分解。

在我们的智能合约的顶部，我们导入了三个 [OpenZeppelin](https://openzeppelin.com/) 智能合约类：

- @openzeppelin/contracts/token/ERC721/ERC721.sol 包含 ERC-721 标准的实现，我们的非同质化代币智能合约将继承此标准。 （要成为有效的非同质化代币，您的智能合约必须实现 ERC-721 标准的所有方法。） 要更加详细地了解继承的 ERC-721 功能，请在[这里](https://eips.ethereum.org/EIPS/eip-721)查看接口定义。

- @openzeppelin/contracts/utils/Counters.sol 提供了只能以 1 为增量或减量的计数器。 我们的智能合约使用一个计数器来跟踪非同质化代币总铸币量，并在我们的新非同质化代币上设置唯一 ID。 （每个使用智能合约铸造的非同质化代币必须分配一个唯一 ID——在这里，我们的唯一 ID 仅由存在的非同质化代币总量决定。 例如，我们用智能合约铸造的第一个非同质化代币的 ID 是“1”，第二个非同质化代币的 ID 是“2”，以此类推）

- @openzeppelin/contracts/access/Ownable.sol 在我们的智能合约上设置了[访问控制](https://docs.openzeppelin.com/contracts/3.x/access-control)，因此只有智能合约的所有者（您）可以铸造非同质化代币。 （注意：包含访问控制完全是一种偏好。 如果您希望任何人都能使用您的智能合约铸造非同质化代币，请删除第 10 行的 Ownable 和第 17 行的 onlyOwner）。

导入语句后面，是我们自定义的非同质化代币智能合约。合约非常短，只包含一个计数器、一个构造函数和独立函数！ 这要归功于我们继承的 OpenZepelin 合约，它们实现了我们创建非同质化代币所需的大多数方法。例如 `owerOf` 函数，其作用是返回非同质化代币所有者，以及 `transferFrom` 函数，其作用是将非同质化代币的所有权从一个帐户转移到另一个帐户。

在我们的 ERC-721 构造函数中，你会注意到我们传递 2 个字符串，“MyNFT”和“NFT”。 第一个变量是智能合约的名称，第二个变量是其符号。 你可以随意命名这些变量！

最后，我们得到了函数 `mintNFT(address recipient, string memory tokenURI)`，它让我们能够铸造非同质化代币！ 你将注意到，这个函数包含两个变量：

- `address recipient` 指定了接收新铸造非同质化代币的地址

- `string memory tokenURI` 是一个可以解析为 JSON 文档的字符串，该文档用于描述非同质化代币的元数据。 非同质化代币的元数据是它的核心所在，使它拥有可配置的属性，例如名称、描述、图像和其他属性。 在本教程第二部分，我们将描述如何配置元数据。

`mintNFT` 调用了继承的 ERC-721 库中的一些方法，最终返回一个数字，代表新铸造非同质化代币的 ID。

## 步骤 11：将 Metamask 和 Alchemy 连接至您的项目 {#connect-metamask-and-alchemy}

我们已经创建了 Metamask 钱包、Alchemy 帐户，并且编写了一个智能合约，现在是将这三者连接起来的时候了。

从虚拟钱包发送的每笔交易都需要使用您独有的私钥签名。 为了给程序提供此项许可，我们可以安全地将私钥（和 Alchemy 应用程序接口密钥）存储在一个环境文件中。

如需了解更多关于发送交易的信息，请查看关于使用 web3 发送交易的 [本教程](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)。

首先，在项目目录中安装 dotenv 软件包：

    npm install dotenv --save

然后在我们的项目根目录中创建 `.env` 文件，并将您的 MetaMask 私钥和超文本传输协议 Alchemy 应用程序接口网址加入其中。

- 遵循[这些说明](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)，从 MetaMask 导出您的私钥

- 请从下方获取超文本传输协议 Alchemy 应用程序接口网址并将其复制到剪贴板

![复制你的 Alchemy 应用程序接口网址](./copy-alchemy-api-url.gif)

你的 `.env` 现在应该如下所示：

    API_URL="https://eth-goerli.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

为了将它们实际连接到我们的代码，我们将在步骤 13 中在 hardhat.config.js 文件中引用这些变量。

<InfoBanner isWarning>
不要提交 <code>.env</code>！ 请确保永远不要与任何人共享或公开您的 <code>.env</code> 文件，因为这样做会泄露您的秘密。 如果您使用版本控制，请将您的 <code>.env</code> 添加到 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 文件中。
</InfoBanner>

## 步骤 12：安装 Ethers.js {#install-ethers}

Ethers.js 是一个软件库，通过以更加方便用户的方法打包[标准 JSON RPC 方法](/developers/docs/apis/json-rpc/)，从而更容易与以太坊互动，并向以太坊提出请求。

安全帽使我们更容易将[插件](https://hardhat.org/plugins/)集成到工具和扩展功能中。 我们将利用 [Ethers 插件](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html)完成合约部署（[Ethers.js](https://github.com/ethers-io/ethers.js/) 有非常简洁的部署方法）。

在您的项目目录中输入：

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

下一步中，我们还将在 hardhat.config.js 中使用 ethers。

## 步骤 13：更新 hardhat.config.js {#update-hardhat-config}

到目前为止，我们已经添加了几个依赖项和插件，现在我们需要更新 hardhat.config.js，以便项目使用所有这些新的组件。

按如下所示更新您的 hardhat.config.js：

    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "goerli",
       networks: {
          hardhat: {},
          goerli: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }

## 步骤 14：编写合约 {#compile-contract}

为了确保一切正常，我们来编译一下合约。 编译任务是安全帽的内部任务之一。

在命令行中运行：

    npx hardhat compile

你可能会看到关于“源文件中未提供 SPDX 许可证标识符”的警告，但不用担心，希望其它部分看起来都正常！ 如果遇到问题，您可以随时在 [Alchemy cord](https://discord.gg/u72VCg3) 社区中发消息询问。

## 步骤 15：编写部署脚本 {#write-deploy}

合约已经写完，配置文件也准备妥当，现在是写合约部署脚本的时候了。

转到 `scripts/` 文件夹，创建一个新的文件名为 `deploy.js`，在其中添加以下内容：

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Start deployment, returning a promise that resolves to a contract object
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

安全帽在[合约教程](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)中对这些代码的每一行均提供了很好的解释，我们在这里直接引用他们的解释。

    const MyNFT = await ethers.getContractFactory("MyNFT");

ethers.js 中的 ContractFactory 是用于部署新智能合约的抽象对象，因此这里的 MyNFT 是我们非同质化代币合约实例的工厂。 使用 hardhat-ethers 插件时，ContractFactory 和合约实例默认与第一个签名帐户相连。

    const myNFT = await MyNFT.deploy();

调用 ContractFactory 代码中的 deploy() 函数会启动合约部署，并返回解析为合约的 Promise。 这个对象包括我们智能合约中每个函数的对应调用方法。

## 步骤 16：部署合约 {#deploy-contract}

我们终于准备好部署我们的智能合约啦！ 返回项目目录的根目录，在命令行中运行：

    npx hardhat --network goerli run scripts/deploy.js

您会看到类似以下所示的信息：

    在地址 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650 部署的合约

如果我们进入 [Goerli etherscan](https://goerli.etherscan.io/) 并搜索我们的合约地址，我们应该能够看到它已成功部署。 如果没有立刻看到它，请稍等片刻，因为部署可能需要一些时间。 交易将类似以下：

![在 Etherscan 上查看你的交易地址](./etherscan-goerli-contract-creation.png)

“From”地址应匹配你的 MetaMask 帐户地址，“To”地址将显示“Contract Creation”。 如果我们点击进入交易，我们将在“To”字段中看到我们的合约地址：

![在 Etherscan 上查看您的合约地址](./etherscan-goerli-tx-details.png)

太棒了！ 你刚刚在以太坊（测试网）区块链上部署了你的非同质化代币智能合约！

要了解后台运行情况，我们导航到 [Alchemy 仪表板](https://dashboard.alchemyapi.io/explorer)中的 Explorer 选项卡。 如果你有多个 Alchemy 应用程序，请确保按应用程序筛选，然后选择“MyNFT”。

![使用 Alchemy 的浏览器仪表板查看“后端”调用](./alchemy-explorer-goerli.png)

在这里你会看到一系列 JSON-RPC 调用，都是在我们调用 .deploy() 函数时，Hardhat/Ethers 替我们在后端完成的。 这里有两项重要调用，一个是 [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction)，这是实际将我们的智能合约写入 Ropsten 链的请求，另一个是 [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)，这是在提供哈希值时读取有关我们交易信息的请求（即发送交易时的典型模式）。 如需了解更多关于发送交易的信息，请查看关于[使用 Web3 发送交易](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)的教程。

以上即为本教程第 1 部分的全部内容。 在[第 2 部分，我们将通过铸造非同质化代币与我们的智能合约进行实际交互](/developers/tutorials/how-to-mint-an-nft/)，在[第 3 部分，我们将向你演示如何查看你的以太坊钱包中的非同质化代币](/developers/tutorials/how-to-view-nft-in-metamask/)！
