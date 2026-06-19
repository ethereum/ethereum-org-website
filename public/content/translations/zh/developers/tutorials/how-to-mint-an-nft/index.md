---
title: 如何铸造 NFT（NFT 教程系列第 2/3 部分）
description: 本教程介绍如何使用我们的智能合约和 Web3 在以太坊区块链上铸造 NFT。
author: "苏米·穆吉尔"
tags: ["ERC-721", "alchemy", "solidity", "智能合约"]
skill: beginner
breadcrumb: 铸造 NFT
lang: zh
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html)：6900 万美元
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b)：1100 万美元
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens)：600 万美元

他们都是使用 Alchemy 强大的 API 铸造了他们的 NFT。在本教程中，我们将教你如何在不到 10 分钟的时间内完成同样的操作。

“铸造 NFT”是指在区块链上发布你的 ERC-721 代币的唯一实例的行为。使用我们在[本 NFT 教程系列第 1 部分](/developers/tutorials/how-to-write-and-deploy-an-nft/)中创建的智能合约，让我们大展 Web3 技能并铸造一个 NFT。在本教程结束时，你将能够随心所欲（且在钱包允许的范围内）铸造任意数量的 NFT！

让我们开始吧！

## 第 1 步：安装 Web3 {#install-web3}

如果你学习了关于创建 NFT 智能合约的第一个教程，那么你已经有了使用 Ethers.js 的经验。Web3 与 Ethers 类似，它也是一个用于简化向[以太坊](/)区块链发送请求的库。在本教程中，我们将使用 [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)，这是一个增强版的 Web3 库，提供自动重试和强大的 WebSocket 支持。

在你的项目主目录中运行：

```
npm install @alch/alchemy-web3
```

## 第 2 步：创建 `mint-nft.js` 文件 {#create-mintnftjs}

在你的 scripts 目录中，创建一个 `mint-nft.js` 文件并添加以下代码行：

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## 第 3 步：获取你的合约 ABI {#contract-abi}

我们的合约 ABI（应用二进制接口）是与我们的智能合约进行交互的接口。你可以[在此处](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is)了解有关合约 ABI 的更多信息。Hardhat 会自动为我们生成一个 ABI 并将其保存在 `MyNFT.json` 文件中。为了使用它，我们需要通过在 `mint-nft.js` 文件中添加以下代码行来解析其内容：

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

如果你想查看 ABI，可以将其打印到控制台：

```js
console.log(JSON.stringify(contract.abi))
```

要运行 `mint-nft.js` 并查看打印到控制台的 ABI，请导航到你的终端并运行：

```js
node scripts/mint-nft.js
```

## 第 4 步：使用 IPFS 配置 NFT 的元数据 {#config-meta}

如果你还记得我们在第 1 部分的教程，我们的 `mintNFT` 智能合约函数接收一个 tokenURI 参数，该参数应解析为一个描述 NFT 元数据的 JSON 文档——这正是赋予 NFT 生命力的关键，使其能够拥有可配置的属性，例如名称、描述、图像和其他属性。

> _星际文件系统 (IPFS) 是一个去中心化的协议和点对点网络，用于在分布式文件系统中存储和共享数据。_

我们将使用 Pinata（一个便捷的 IPFS API 和工具包）来存储我们的 NFT 资产和元数据，以确保我们的 NFT 是真正去中心化的。如果你没有 Pinata 账户，请[在此处](https://app.pinata.cloud)注册一个免费账户并完成验证电子邮件的步骤。

创建账户后：

- 导航到“Files”（文件）页面，然后点击页面左上角的蓝色“Upload”（上传）按钮。

- 将图像上传到 Pinata——这将成为你 NFT 的图像资产。你可以随意命名该资产。

- 上传后，你将在“Files”页面的表格中看到文件信息。你还会看到一个 CID 列。你可以通过点击旁边的复制按钮来复制 CID。你可以通过以下链接查看你的上传内容：`https://gateway.pinata.cloud/ipfs/<CID>`。例如，你可以[在此处](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)找到我们在 IPFS 上使用的图像。

对于更喜欢视觉学习的读者，上述步骤总结如下：

![How to upload your image to Pinata](./instructionsPinata.gif)

现在，我们需要再上传一个文档到 Pinata。但在那之前，我们需要先创建它！

在你的根目录中，创建一个名为 `nft-metadata.json` 的新文件并添加以下 json 代码：

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

你可以随意更改 json 中的数据。你可以删除或添加到 attributes（属性）部分。最重要的是，确保 image 字段指向你的 IPFS 图像的位置——否则，你的 NFT 将包含一张（非常可爱的！）狗的照片。

完成 JSON 文件的编辑后，保存它并按照我们上传图像的相同步骤将其上传到 Pinata。

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## 第 5 步：创建你的合约实例 {#instance-contract}

现在，为了与我们的合约进行交互，我们需要在代码中创建它的一个实例。为此，我们需要我们的合约地址，我们可以从部署中获取，或者通过在 [Blockscout](https://eth-sepolia.blockscout.com/) 上查找你用于部署合约的地址来获取。

![View your contract address on Etherscan](./view-contract-etherscan.png)

在上面的示例中，我们的合约地址是 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778。

接下来，我们将使用 Web3 的 [contract 方法](https://docs.web3js.org/api/web3-eth-contract/class/Contract)，通过 ABI 和地址来创建我们的合约。在你的 `mint-nft.js` 文件中，添加以下内容：

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## 第 6 步：更新 `.env` 文件 {#update-env}

现在，为了创建交易并将其发送到以太坊链，我们将使用你的公共以太坊账户地址来获取账户随机数（将在下面解释）。

将你的公钥添加到 `.env` 文件中——如果你完成了教程的第 1 部分，我们的 `.env` 文件现在应该如下所示：

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## 第 7 步：创建你的交易 {#create-txn}

首先，让我们定义一个名为 `mintNFT(tokenData)` 的函数，并通过执行以下操作来创建我们的交易：

1. 从 `.env` 文件中获取你的 _PRIVATE_KEY_ 和 _PUBLIC_KEY_。

1. 接下来，我们需要计算出账户随机数。随机数规范用于跟踪从你的地址发送的交易数量——出于安全目的和防止[重放攻击](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)，我们需要它。为了获取从你的地址发送的交易数量，我们使用 [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)。

1. 最后，我们将使用以下信息设置我们的交易：

- `'from': PUBLIC_KEY` — 我们交易的来源是我们的公共地址

- `'to': contractAddress` — 我们希望与之交互并发送交易的合约

- `'nonce': nonce` — 包含从我们地址发送的交易数量的账户随机数

- `'gas': estimatedGas` — 完成交易所需的估计 Gas

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — 我们希望在此交易中执行的计算——在本例中是铸造 NFT

你的 `mint-nft.js` 文件现在应该如下所示：

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //获取最新随机数

   //交易
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## 第 8 步：签署交易 {#sign-txn}

现在我们已经创建了交易，我们需要对其进行签名以便将其发送出去。这就是我们将使用私钥的地方。

`web3.eth.sendSignedTransaction` 将为我们提供交易哈希，我们可以使用它来确保我们的交易已被打包并且没有被网络丢弃。你会注意到在交易签名部分，我们添加了一些错误检查，以便我们知道交易是否成功通过。

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //获取最新随机数

  //交易
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## 第 9 步：调用 `mintNFT` 并运行 node `mint-nft.js` {#call-mintnft-fn}

还记得你上传到 Pinata 的 `metadata.json` 吗？从 Pinata 获取其哈希码，并将以下内容作为参数传递给函数 `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

以下是获取哈希码的方法：

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_如何在 Pinata 上获取你的 NFT 元数据哈希码_

> 通过在单独的窗口中加载 `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`，仔细检查你复制的哈希码是否链接到你的 **metadata.json**。该页面应类似于下面的屏幕截图：

![Your page should display the json metadata](./metadataJSON.png)_你的页面应显示 json 元数据_

总而言之，你的代码应该类似于以下内容：

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //获取最新随机数

  //交易
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

现在，运行 `node scripts/mint-nft.js` 来部署你的 NFT。几秒钟后，你应该会在终端中看到类似这样的响应：

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

接下来，访问你的 [Alchemy 内存池](https://dashboard.alchemyapi.io/mempool)以查看你的交易状态（无论是待处理、已打包还是被网络丢弃）。如果你的交易被丢弃，检查 [Blockscout](https://eth-sepolia.blockscout.com/) 并搜索你的交易哈希也会很有帮助。

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_在 Etherscan 上查看你的 NFT 交易哈希_

就是这样！你现在已经在以太坊区块链上部署并铸造了一个 NFT <Emoji text=":money_mouth_face:" size={1} />

使用 `mint-nft.js`，你可以随心所欲（且在钱包允许的范围内）铸造任意数量的 NFT！只需确保传入一个描述 NFT 元数据的新 tokenURI（否则，你最终只会制作出一堆具有不同 ID 的相同 NFT）。

想必你希望能够在钱包中炫耀你的 NFT——所以一定要查看[第 3 部分：如何在钱包中查看你的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)！