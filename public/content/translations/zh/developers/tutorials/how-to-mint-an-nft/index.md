---
title: 如何铸造 NFT（NFT 教程系列第 2/3 部分）
description: 本教程介绍如何使用我们的智能合约和 Web3 在以太坊区块链上铸造 NFT。
author: "苏米-穆德吉尔"
tags: [ "ERC-721", "Alchemy", "Solidity", "智能合同" ]
skill: beginner
lang: zh
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html)：6900 万美元\n[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b)：1100 万美元\n[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens)：600 万美元

他们都使用 Alchemy 强大的 API 铸造了各自的 NFT。 在本教程中，我们将在 \<10 分钟内教会你如何做到同样的事情。

“铸造 NFT”是指在区块链上发布你的 ERC-721 代币的唯一实例的行为。 让我们使用 [本 NFT 教程系列第 1 部分](/developers/tutorials/how-to-write-and-deploy-an-nft/)中的智能合约，一展我们的 Web3 技能，铸造一个 NFT 吧。 在本教程结束时，你将能随心所欲（钱包也得跟上！）地铸造任意数量的 NFT！

我们开始吧！

## 第 1 步：安装 Web3 {#install-web3}

如果你学习了关于创建 NFT 智能合约的第一个教程，那么你应该已经有使用 Ethers.js 的经验了。 Web3 与 Ethers 类似，都是能让你更轻松地向以太坊区块链创建请求的库。 在本教程中，我们将使用 [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)，这是一个增强的 Web3 库，可提供自动重试和强大的 WebSocket 支持。

在你的项目主目录中运行：

```
npm install @alch/alchemy-web3
```

## 第 2 步：创建 `mint-nft.js` 文件 {#create-mintnftjs}

在你的 `scripts` 目录中，创建一个 `mint-nft.js` 文件，并添加以下代码行：

```js
require("dotenv").config()\nconst API_URL = process.env.API_URL\nconst { createAlchemyWeb3 } = require("@alch/alchemy-web3")\nconst web3 = createAlchemyWeb3(API_URL)
```

## 第 3 步：获取你的合约 ABI {#contract-abi}

我们的合约 ABI（应用程序二进制接口）是用于与我们的智能合约交互的接口。 你可以在[此处](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is)了解更多关于合约 ABI 的信息。 Hardhat 会自动为我们生成一个 ABI 并将其保存在 `MyNFT.json` 文件中。 为了使用它，我们需要将以下代码行添加到我们的 `mint-nft.js` 文件中以解析内容：

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

如果你想查看 ABI，可以将其打印到控制台：

```js
console.log(JSON.stringify(contract.abi))
```

要运行 `mint-nft.js` 并在控制台中查看打印出的 ABI，请导航到你的终端并运行：

```js
node scripts/mint-nft.js
```

## 第 4 步：使用 IPFS 为你的 NFT 配置元数据 {#config-meta}

如果你还记得我们第 1 部分教程的内容，我们的 `mintNFT` 智能合约函数接受一个 `tokenURI` 参数，该参数应解析为一个 JSON 文档，用于描述 NFT 的元数据——正是元数据赋予了 NFT 生命，让它拥有可配置的属性，例如名称、描述、图片和其他特性。

> _星际文件系统 (IPFS) 是一种用于在分布式文件系统中存储和共享数据的去中心化协议和点对点网络。_

我们将使用 Pinata，一个方便的 IPFS API 和工具包，来存储我们的 NFT 资产和元数据，以确保我们的 NFT 是真正去中心化的。 如果你还没有 Pinata 帐户，请[在此处](https://app.pinata.cloud)注册一个免费帐户，并完成电子邮件验证步骤。

创建帐户后：

- 导航到“文件”页面，然后单击页面左上角的蓝色“上传”按钮。

- 将图片上传到 Pinata — 这将是你的 NFT 的图片资产。 你可以随意为该资产命名

- 上传后，你将在“文件”页面的表格中看到文件信息。 你还会看到一个 CID 列。 你可以通过单击旁边的复制按钮来复制 CID。 你可以在以下地址查看你上传的内容：`https://gateway.pinata.cloud/ipfs/<CID>`。 例如，你可以在[此处](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)找到我们在 IPFS 上使用的图片。

为方便偏爱视觉学习的学习者，我们将以上步骤总结如下：

![如何将你的图片上传到 Pinata](./instructionsPinata.gif)

现在，我们还要向 Pinata 上传一份文档。 但在此之前，我们需要先创建它！

在你的根目录中，新建一个名为 `nft-metadata.json` 的文件，并添加以下 json 代码：

```json
{\n  "attributes": [\n    {\n      "trait_type": "品种",\n      "value": "马尔济斯"\n    },\n    {\n      "trait_type": "眼睛颜色",\n      "value": "摩卡"\n    }\n  ],\n  "description": "世界上最可爱、最敏感的小狗。",\n  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",\n  "name": "Ramses"\n}
```

你可以随意更改 json 中的数据。 你可以删除或添加属性部分。 最重要的是，确保 `image` 字段指向你的 IPFS 图片的位置 — 否则，你的 NFT 将包含一张（非常可爱的！） 狗狗的照片。

编辑完 JSON 文件后，保存并上传到 Pinata，步骤与上传图片时相同。

![如何将你的 nft-metadata.json 上传到 Pinata](./uploadPinata.gif)

## 第 5 步：创建合约实例 {#instance-contract}

现在，为了与我们的合约交互，我们需要在代码中创建它的一个实例。 为此，我们需要我们的合约地址。我们可以通过在 [Blockscout](https://eth-sepolia.blockscout.com/) 上查找你用于部署合约的地址，从部署中获取合约地址。

![在 Etherscan 上查看你的合约地址](./view-contract-etherscan.png)

在上面的示例中，我们的合约地址是 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778。

接下来，我们将使用 Web3 的 [合约方法](https://docs.web3js.org/api/web3-eth-contract/class/Contract)，通过 ABI 和地址来创建我们的合约。 在你的 `mint-nft.js` 文件中，添加以下内容：

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"\n\nconst nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## 第 6 步：更新 `.env` 文件 {#update-env}

现在，为了创建交易并将其发送到以太坊链，我们将使用你的以太坊公共帐户地址来获取帐户 nonce（随机数，下文会解释）。

将你的公钥添加到 `.env` 文件中 — 如果你完成了本教程的第 1 部分，你的 `.env` 文件现在应该如下所示：

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/你的-api-密钥"\nPRIVATE_KEY = "你的-私有-账户-地址"\nPUBLIC_KEY = "你的-公共-账户-地址"
```

## 第 7 步：创建你的交易 {#create-txn}

首先，我们来定义一个名为 `mintNFT(tokenData)` 的函数，并通过以下操作创建我们的交易：

1. 从 `.env` 文件中获取你的 _PRIVATE_KEY_ 和 _PUBLIC_KEY_。

2. 接下来，我们需要确定帐户 nonce（随机数）。 nonce 规范用于跟踪从你的地址发送的交易数量 — 出于安全目的和防止[重放攻击](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)的需要，我们必须使用它。 为了获取从你的地址发送的交易数量，我们使用 [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)。

3. 最后，我们将用以下信息设置我们的交易：

- `'from': PUBLIC_KEY` — 交易的来源，即我们的公共地址

- `'to': contractAddress` — 我们希望与之交互并向其发送交易的合约

- `'nonce': nonce` — 帐户 nonce（随机数），即从我们的地址发送的交易数量

- `'gas': estimatedGas` — 完成交易所需的预估燃料

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — 我们希望在此交易中执行的计算，在本例中就是铸造一个 NFT

你的 `mint-nft.js` 文件现在应该如下所示：

```js
   require('dotenv').config();\n   const API_URL = process.env.API_URL;\n   const PUBLIC_KEY = process.env.PUBLIC_KEY;\n   const PRIVATE_KEY = process.env.PRIVATE_KEY;\n\n   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");\n   const web3 = createAlchemyWeb3(API_URL);\n\n   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");\n   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";\n   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);\n\n   async function mintNFT(tokenURI) {\n     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //获取最新的 nonce\n\n   //交易\n     const tx = {\n       'from': PUBLIC_KEY,\n       'to': contractAddress,\n       'nonce': nonce,\n       'gas': 500000,\n       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()\n     };\n   }​
```

## 第 8 步：签署交易 {#sign-txn}

创建好交易后，我们需要对其进行签名才能发送。 在这里，我们将使用我们的私钥。

`web3.eth.sendSignedTransaction` 将为我们提供交易哈希，我们可以用它来确保我们的交易被挖出，而没有被网络丢弃。 你会注意到，在交易签名部分，我们添加了一些错误检查，以便我们知道交易是否成功。

```js
require("dotenv").config()\nconst API_URL = process.env.API_URL\nconst PUBLIC_KEY = process.env.PUBLIC_KEY\nconst PRIVATE_KEY = process.env.PRIVATE_KEY\n\nconst { createAlchemyWeb3 } = require("@alch/alchemy-web3")\nconst web3 = createAlchemyWeb3(API_URL)\n\nconst contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")\nconst contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"\nconst nftContract = new web3.eth.Contract(contract.abi, contractAddress)\n\nasync function mintNFT(tokenURI) {\n  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //获取最新的 nonce\n\n  //交易\n  const tx = {\n    from: PUBLIC_KEY,\n    to: contractAddress,\n    nonce: nonce,\n    gas: 500000,\n    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),\n  }\n\n  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)\n  signPromise\n    .then((signedTx) => {\n      web3.eth.sendSignedTransaction(\n        signedTx.rawTransaction,\n        function (err, hash) {\n          if (!err) {\n            console.log(\n              "你的交易哈希是：",\n              hash,\n              "\n检查 Alchemy 的内存池 (Mempool) 来查看你的交易状态！"\n            )\n          } else {\n            console.log(\n              "提交交易时出错了：",\n              err\n            )\n          }\n        }\n      )\n    })\n    .catch((err) => {\n      console.log(" Promise 失败：", err)\n    })\n}
```

## 第 9 步：调用 `mintNFT` 并运行 `node mint-nft.js` {#call-mintnft-fn}

还记得你上传到 Pinata 的 `metadata.json` 吗？ 从 Pinata 获取其哈希码，并将以下内容作为参数传递给 `mintNFT` 函数 `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

获取哈希码的方法如下：

![如何在 Pinata 上获取你的 NFT 元数据哈希码](./metadataPinata.gif)_如何在 Pinata 上获取你的 NFT 元数据哈希码_

> 通过将 `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` 加载到单独的窗口中，仔细检查你复制的哈希码是否链接到你的 **metadata.json**。 该页面应类似于下面的屏幕截图：

![你的页面应显示 json 元数据](./metadataJSON.png)_你的页面应显示 json 元数据_

总而言之，你的代码应该如下所示：

```js
require("dotenv").config()\nconst API_URL = process.env.API_URL\nconst PUBLIC_KEY = process.env.PUBLIC_KEY\nconst PRIVATE_KEY = process.env.PRIVATE_KEY\n\nconst { createAlchemyWeb3 } = require("@alch/alchemy-web3")\nconst web3 = createAlchemyWeb3(API_URL)\n\nconst contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")\nconst contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"\nconst nftContract = new web3.eth.Contract(contract.abi, contractAddress)\n\nasync function mintNFT(tokenURI) {\n  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //获取最新的 nonce\n\n  //交易\n  const tx = {\n    from: PUBLIC_KEY,\n    to: contractAddress,\n    nonce: nonce,\n    gas: 500000,\n    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),\n  }\n\n  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)\n  signPromise\n    .then((signedTx) => {\n      web3.eth.sendSignedTransaction(\n        signedTx.rawTransaction,\n        function (err, hash) {\n          if (!err) {\n            console.log(\n              "你的交易哈希是：",\n              hash,\n              "\n检查 Alchemy 的内存池 (Mempool) 来查看你的交易状态！"\n            )\n          } else {\n            console.log(\n              "提交交易时出错了：",\n              err\n            )\n          }\n        }\n      )\n    })\n    .catch((err) => {\n      console.log("Promise 失败：", err)\n    })\n}\n\nmintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

现在，运行 `node scripts/mint-nft.js` 来部署你的 NFT。 几秒钟后，你应该会在终端中看到如下响应：

    ```
    你的交易哈希为：0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8\n\n请检查 Alchemy 的内存池 (Mempool)，查看你的交易状态！
    ```

接下来，访问你的 [Alchemy 内存池](https://dashboard.alchemyapi.io/mempool)，查看你的交易状态（待处理、已挖出或已被网络丢弃）。 如果你的交易被丢弃，检查 [Blockscout](https://eth-sepolia.blockscout.com/) 并搜索你的交易哈希也会有所帮助。

![在 Etherscan 上查看你的 NFT 交易哈希](./view-nft-etherscan.png)_在 Etherscan 上查看你的 NFT 交易哈希_

就这么简单！ 你现在已经成功在以太坊区块链上部署并铸造了一个 NFT <Emoji text=":money_mouth_face:" size={1} />

使用 `mint-nft.js`，你可以随心所欲（钱包也得跟上！）地铸造任意数量的 NFT！ 只需确保传入一个新的、用于描述 NFT 元数据的 tokenURI（否则，你最终只会制作出一堆 ID 不同但内容相同的 NFT）。

想必你一定想在钱包里展示你的 NFT 吧 — 那就一定要看看[第 3 部分：如何在你的钱包中查看 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)！
