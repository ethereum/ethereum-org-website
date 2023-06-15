---
title: 如何铸造非同质化代币（非同质化代币教程系列 2/3）
description: 本教程描述了如何使用我们的智能合约和 Web3 在以太坊区块链上铸造非同质化代币。
author: "苏米-穆德吉尔"
tags:
  - "ERC-721"
  - "Alchemy"
  - "solidity"
  - "智能合约"
skill: beginner
lang: zh
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html)：6900 万美元 [3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b)：1100 万美元 [Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens)：600 万美元

他们都使用 Alchemy 强大的应用程序接口铸造他们的非同质化代币。 在本教程中，我们将教您如何在 < 10 分钟内做到这一点。

“铸造非同质化代币”是在区块链上发布您的 ERC-721 代币的唯一方式。 使用我们在[非同质化代币教程系列第 1 部分](/developers/tutorials/how-to-write-and-deploy-an-nft/)中获得的智能合约，我们可以运用我们的 Web3 技能并铸造非同质化代币。 在本教程结束时，您将能够按照您的内心（和钱包）的愿望铸造出更多非同质化代币！

我们开始吧！

## 第 1 步：安装 Web3 {#install-web3}

如果您跟随第一个教程创建了您的非同质化代币智能合约，那么您在使用 Ethers.js 方面已经有了经验。 Web3 与 Ethers 相似，也是一个库，用于更轻松地创建对以太坊区块链的请求。 在本教程中，我们将使用增强版 Web3 库 [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)，它提供自动重试和强大的 WebSocket 支持。

在您的项目主目录中运行：

```
npm install @alch/alchemy-web3
```

## 第 2 步：创建 `mint-nft.js` 文件 {#create-mintnftjs}

在你的脚本目录中，创建一个 `mint-nft.js` 文件并添加以下代码行：

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## 第 3 步：获取您的合约应用程序二进制接口 {#contract-abi}

我们的合约 ABI（应用程序二进制接口）是与我们的智能合约交互的接口。 您可以在[此处](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is)了解更多关于合约应用程序二进制接口的信息。 安全帽自动为我们生成应用程序二进制接口，并将其保存在 `MyNFT.json` 文件中。 为了使用该接口，我们需要通过在我们的 `mint-nft.js` 文件中添加以下代码行来解析内容：

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

如果您想查看应用程序二进制接口，您可以将其发送到您的控制台：

```js
console.log(JSON.stringify(contract.abi))
```

要运行 `mint-nft.js` 并查看输出到控制台的应用程序二进制接口，请导航至你的终端并运行:

```js
node scripts/mint-nft.js
```

## 第 4 步：使用 IPFS 系统为您的 NFT 配置元数据 {#config-meta}

如果你还记得我们第 1 部分的教程，我们的 `mintNFT` 智能合约函数使用 tokenURI 参数，该参数应解析为描述非同质化代币元数据的 JSON 文档，正是它生成非同质化代币并赋予非同质化代币可配置的属性，如名称、描述、图像和其他属性。

> _星际文件系统 (IPFS) 是一个分散协议和对等网络，用于在分布式文件系统中存储和共享数据。_

我们将使用 Pinata，一个方便的星际文件系统应用程序接口和工具包，用于存储我们的非同质化代币资产和元数据，以确保我们的非同质化代币真正去中心化。 如果您没有 Pinata 帐户，请在[此处](https://app.pinata.cloud)注册一个免费帐户，并完成电子邮件验证步骤。

创建帐户后：

- 导航到“文件”页面，点击页面左上方蓝色的“上传”按钮。

- 将图像上传到 Pinata — 这将是你的非同质化代币的图像资产。 您可以随意为该资产命名。

- 上传之后，你将在“File”页面的表格中看到文件信息。 您还会看到 CID 列。 您可以通过单击旁边的复制按钮来复制 CID。 您可以通过 `https://gateway.pinata.cloud/ipfs/<CID>` 查看您上传的信息。 例如，你可以在[此处](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)找到我们在星际文件系统上使用的图片。

为了方便更偏向视觉型的学习者理解，上述步骤总结如下：

![如何将您的图像上传到 Pinata](./instructionsPinata.gif)

现在，我们要再上传一份文件到 Pinata。 但在我们上传之前，需要先创建该文件！

在你的根目录中，创建一个名为 `nft-metadata.json` 的新文件，并添加以下 json 代码：

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

可随意更改 json 中的数据。 您可以删除或添加到属性部分。 最重要的是，确保图像字段指向您的星际文件系统图像的位置——否则，您的非同质化代币将包含一张（非常可爱！）的狗狗照片。

编辑完 JSON 文件后，保存并上传到 Pinata，步骤与上传图像相同。

![如何将您的 nft-metadata.json 上传至 Pinata](./uploadPinata.gif)

## 第 5 步：创建您的合约实例 {#instance-contract}

现在，为了与我们的合约进行交互，我们需要在代码中创建一个实例。 为此，我们需要合约地址，可以从部署或 [Etherscan](https://goerli.etherscan.io/) 中查找用来部署合约的地址。

![在 Etherscan 上查看您的合约地址](./viewContractEtherscan.png)

在上面的示例中，我们的合约地址是 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778。

接下来我们将使用 Web3 的[合约方法](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract)，创建使用应用程序二进制接口和地址的合约。 在你的 `mint-nft.js` 文件中，添加以下内容:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef778"

const nftContract = new web3.eth.Contract(contracts.abi, contracttAddress)
```

## 第 6 步：更新 `.env` 文件 {#update-env}

现在，为了创建并发送交互到以太坊链，我们将使用您的以太坊公共帐户地址来获得账户随机数（解释如下）。

将你的公钥添加到你的 `.env` 文件中 — 如果你完成了教程第 1 部分，我们的 `.env` 文件现在应该如下所示：

```js
API_URL = "https://eth-goerli.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## 第 7 步：创建您的交易 {#create-txn}

首先，让我们定义一个名为 `mintNFT(tokenData)` 的函数并通过执行以下操作创建我们的交易：

1. 获取 _PRIVATE_KEY_ 和 _PUBLIC_KEY_，来源为 `.env` 文件。

1. 接下来，我们需要弄清楚帐户的随机数。 随机数规范用于跟踪从您的地址发送的交易数量——我们这样做是出于安全目的，以防止[重放攻击](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)。 要获得从您的地址发送的交易数量，我们要用到 [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)。

1. 最后，我们将使用以下信息设置我们的交易：

- `'from': PUBLIC_KEY`——我们的交易源于我们的公共地址

- `'to': contractAddress`——我们希望与之交互并发送交易的合约

- `'nonce': nonce` — 帐户随机数和从我们的地址发送的交易数量

- `'gas': estimatedGas`——预估完成交易所需的燃料

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()`——我们希望在这笔交易中进行的计算——铸造一个非同质化代币

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

   //the transaction
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

现在我们已经创建了我们的交易，我们需要签署它，以便将其发送出去。 在这里我们将使用到我们的私钥。

`web3.eth.sendSignedTransaction` 会给我们提供交易的哈希值，我们可以用它来确保我们的交易被开采出来，没有被网络丢弃。 您会注意到在交易签署部分，我们已经增加了一些错误检查，以便我们知晓交易是否成功通过。

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
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

## 第 9 步：调用 `mintNFT` 并运行节点 `mint-nft.js` {#call-mintnft-fn}

还记得你上传到 Pinata 的 `metadata.json` 吗？ 从 Pinata 获取其哈希代码，并将以下内容作为参数传送给函数 `mintNFT` `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

如何获取哈希代码：

![如何在 Pinata 上获得您的非同质化代币元数据哈希代码](./metadataPinata.gif)_How to get your nft metadata hashcode on Pinata_

> 仔细检查您复制的哈希代码是否链接到您的 **metadata.json**，方法是将 `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` 加载到独立窗口。 页面看起来应该类似于下面的截图：

![您的页面应该显示 json 元数据](./metadataJSON.png)_Your page should display the json metadata_

总之，您的代码应该看起来像这样：

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
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

现在，运行 `node scripts/mint-nft.js` 来部署您的非同质化代币。 几秒钟后，您应该在终端中看到这样的响应：

    你的交易哈希值为：0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    检查 Alchem 的内存池以查看您的交易状态！

接下来，访问您的 [Alchemy 内存池](https://dashboard.alchemyapi.io/mempool)，查看您的交易状态（待定、已开采还是被网络放弃）。 如果你的交易被丢弃，可以访问 [Goerli Etherscan](https://goerli.etherscan.io/) 并搜索你的交易哈希值。

![在 Etherscan 上查看您的非同质化代币交易哈希值](./viewNFTEtherscan.png)_View your NFT transaction hash on Etherscan_

就是这样！ 您现在已经在以太坊区块链上部署和铸造了一个非同质化代币 <Emoji text=":money_mouth_face:" size={1} />

使用 `mint-nft.js`，你可以随心所欲地（配合钱包）铸造尽可能多的非同质化代币！ 只要确保输入一个新的 tokenURI 来描述非同质化代币的元数据（否则，您将最终生成一堆相同但具有不同 ID 的 tokenURI）。

大概，您会想要展示一下您钱包中的非同质化代币——所以请务必查看[第 3 部分：如何在您的钱包中查看您的非同质化代币](/developers/tutorials/how-to-view-nft-in-metamask/)！
