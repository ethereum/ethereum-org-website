---
title: "如何铸造 NFT（NFT 教程系列第 2/3 部分）"
description: "本教程介绍如何使用我们的智能合约、Hardhat 和 Ethers.js 在以太坊区块链上铸造非同质化代币 (NFT)。"
author: "苏米·穆吉尔"
tags: ["ERC-721", "Alchemy", "Solidity", "智能合约"]
skill: beginner
breadcrumb: "铸造 NFT"
lang: zh
published: 2021-04-22
---

“铸造非同质化代币 (NFT)”是指在区块链上发布 ERC-721 代币的唯一实例的行为。使用我们在[本 NFT 教程系列第 1 部分](/developers/tutorials/how-to-write-and-deploy-an-nft/)中的智能合约，让我们展现一下我们的 Web3 技能并铸造一个 NFT。在本教程结束时，你将能够随心所欲（取决于钱包余额）地铸造任意数量的 NFT！

让我们开始吧！

## 第 1 步：检查你的设置 {#install-web3}

如果你跟进了第一篇关于创建非同质化代币 (NFT) 智能合约的教程，你就已经拥有了所需的一切：一个带有 [Ethers 插件](https://hardhat.org/docs/plugins/hardhat-ethers)和 [Ethers.js](https://docs.ethers.org/v6/) 的 Hardhat 3 项目，后者是一个用于使向[以太坊](/)区块链创建请求变得更容易的库。我们将把我们的铸造代码写成一个 Hardhat 脚本，以便它重用 Sepolia 网络设置和第 1 部分中的 `API_URL` 与 `PRIVATE_KEY` 值——不需要安装任何新东西。

## 第 2 步：创建一个 `mint-nft.js` 文件 {#create-mintnftjs}

在你的 `scripts` 目录中，创建一个 `mint-nft.js` 文件并添加以下几行代码：

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

就像在我们的部署脚本中一样，`network.create()` 会连接到你在运行脚本时使用 `--network` 选择的网络，并为我们提供一个用于该网络的 `ethers` 对象。

## 第 3 步：获取你的合约应用程序二进制接口 (ABI) {#contract-abi}

我们的合约应用程序二进制接口 (ABI) 是与智能合约进行交互的接口。你可以了解更多关于[合约 ABI](/glossary/#abi) 的信息。在编译合约时，Hardhat 会自动为我们生成一个 ABI，并将其保存在 `artifacts/contracts/MyNFT.sol/MyNFT.json` 文件中。在第 5 步创建我们的合约实例时，Hardhat Ethers 插件会从那里为我们读取它，所以我们不需要自己加载。

如果你想查看 ABI，你可以将其打印到控制台。在项目的根目录下，运行：

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## 第 4 步：使用 IPFS 配置非同质化代币 (NFT) 的元数据 {#config-meta}

如果你还记得第 1 部分的教程，我们的 `mintNFT` 智能合约函数接受一个 `tokenURI` 参数，该参数应解析为一个描述 NFT 元数据的 JSON 文档——这真正赋予了 NFT 生命，使其能够拥有可配置的属性，如名称、描述、图像和其他属性。

> _星际文件系统 (IPFS) 是一个去中心化的协议和点对点网络，用于在分布式文件系统中存储和共享数据。_

我们将使用 Pinata，一个方便的 IPFS 应用程序编程接口 (API) 和工具包，来存储我们的 NFT 资产和元数据，以确保我们的 NFT 是真正去中心化的。如果你还没有 Pinata 账户，请在[这里](https://app.pinata.cloud)免费注册一个账户，并完成验证邮箱的步骤。

创建账户后：

- 导航至 [Files 页面](https://app.pinata.cloud/ipfs/files)，并点击页面右上角的“Add”按钮。

- 将一张图片上传至 Pinata——这将成为你 NFT 的图像资产。你可以随意为资产命名。确保将其上传到公共 IPFS：钱包和显示 NFT 的市场无法获取[私有 IPFS](https://docs.pinata.cloud/files/private-ipfs) 上的文件。

- 上传后，你会看到该文件及其 CID（内容标识符）列在 Files 页面上。复制该 CID。你可以通过以下方式查看你的上传内容：`https://gateway.pinata.cloud/ipfs/<CID>`，或通过 Pinata 侧边栏“Gateways”下列出的专用网关查看。例如，你可以[在 IPFS 上查看我们使用的图片](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)。

现在，我们需要再上传一份文档到 Pinata。但在那之前，我们需要先创建它！

在你的根目录下，新建一个名为 `nft-metadata.json` 的文件，并添加以下 JSON 代码：

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

你可以随意更改 JSON 中的数据。你可以删除或添加 attributes（属性）部分的内容。最重要的是，确保 image（图像）字段指向你 IPFS 图像的位置，格式为 `ipfs://<image-CID>`——否则，你的 NFT 将包含一张（非常可爱的！）狗狗照片。

完成 JSON 文件的编辑后，保存并按照上传图像的相同步骤将其上传到 Pinata。也要复制 `nft-metadata.json` 的 CID；我们在第 9 步中会用到它。

## 第 5 步：创建合约实例 {#instance-contract}

现在，为了与我们的合约进行交互，我们需要在代码中创建它的一个实例。为此，我们需要我们的合约地址，我们的部署脚本在第 1 部分中已经打印了该地址。你也可以在 [Etherscan](https://sepolia.etherscan.io/) 或 [Blockscout](https://eth-sepolia.blockscout.com/) 上通过查找用于部署合约的地址来找到它。

![在 Etherscan 上查看你的合约地址](./view-contract-etherscan.png)

在上面的示例中，我们的合约地址是 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778。

接下来，我们将使用 Hardhat Ethers 插件的 `getContractAt` 方法，使用合约名称（它告诉插件要使用哪个 ABI）和地址来创建我们的合约。在你的 `mint-nft.js` 文件中，添加以下内容，并用你自己的地址替换示例地址：

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## 第 6 步：检查 `.env` 文件 {#update-env}

我们发送的每笔交易都必须使用你账户的私钥进行签名。如果你完成了教程的第 1 部分，我们的 `.env` 文件应该已经如下所示：

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

不需要添加你的公共地址：Ethers 会通过私钥计算得出。

## 第 7 步：创建交易 {#create-txn}

首先，我们定义一个名为 `mintNFT(tokenURI)` 的函数，并通过以下步骤来创建我们的交易：

1. 获取我们发送交易的账户。`ethers.getSigners()` 返回为网络配置的账户，在 Sepolia 上，也就是其私钥存放在 `.env` 中的账户。由于 `mintNFT` 使用了 `onlyOwner` 修饰符，这必须是部署合约的同一个账户。

1. 在我们的合约实例上调用 `mintNFT` 函数，将我们自己的地址作为接收者，并附上元数据 URI。这是我们希望在该交易中执行的计算——在这种情况下就是铸造一个非同质化代币 (NFT)。

你不需要自己计算随机数（从你的地址发送的交易数量，用于防止重放攻击）、gas 上限或费用：Ethers 会在发送交易前获取或估算它们。

你现在的 `mint-nft.js` 文件应该如下所示：

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // 发送交易。ethers 会为我们填写 nonce、gas 限制和费用。
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## 第 8 步：签署交易 {#sign-txn}

由于网络已经使用我们的私钥进行了配置，Ethers 会在发送交易之前自动用私钥对其进行签名。

一旦交易发送完毕，调用 `mintNFT` 就会返回结果，并为我们提供交易哈希，我们可以用它来确认我们的交易已被打包出块，而没有被网络丢弃。然后 `tx.wait()` 会等待，直到交易被包含在一个区块中。我们还添加了一些错误检查，这样我们就能知道交易是否成功通过。

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // 发送交易。ethers 会为我们填写 nonce、gas 限制和费用。
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // 等待交易被包含在区块中
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## 第 9 步：调用 `mintNFT` 并运行 `mint-nft.js` {#call-mintnft-fn}

还记得你上传到 Pinata 的 `nft-metadata.json` 吗？从 Pinata 获取其 CID，并将 `ipfs://<metadata-CID>` 作为参数传递给函数 `mintNFT`。钱包和市场会通过它们选择的 IPFS 网关解析 `ipfs://` URI，这样你的非同质化代币 (NFT) 就不会依赖于任何单一的网关。

> 请在一个独立的窗口中加载 `https://gateway.pinata.cloud/ipfs/<metadata-CID>`，仔细检查你复制的 CID 是否链接到了你的 **nft-metadata.json**。页面看起来应该与下方的截图类似：

![你的页面应该显示 JSON 元数据](./metadataJSON.png)_你的页面应该显示 JSON 元数据_

将所有内容整合后，你的代码应该类似于这样：

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // 发送交易。ethers 会为我们填写 nonce、gas 限制和费用。
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // 等待交易被包含在区块中
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

现在，针对 Sepolia 运行脚本来铸造你的 NFT：

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

几秒钟后，你应该会在终端中看到类似以下的响应：

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

要查看交易的详细信息，请在 [Etherscan](https://sepolia.etherscan.io/) 或 [Blockscout](https://eth-sepolia.blockscout.com/) 上搜索其哈希。

![在 Etherscan 上查看你的 NFT 交易哈希](./view-nft-etherscan.png)_在 Etherscan 上查看你的 NFT 交易哈希_

就是这样！你现在已经在以太坊区块链上部署并铸造了一个 NFT <Emoji text=":money_mouth_face:" size={1} />

使用 `mint-nft.js`，你可以随心所欲（取决于钱包余额）地铸造任意数量的 NFT！只要确保传入一个描述 NFT 元数据的全新 `tokenURI` 即可（否则，你只会铸造出一堆带有不同 ID 的相同 NFT）。

你大概会想在你的钱包中展示你的 NFT——那么，请一定要查看[第 3 部分：如何在钱包中查看你的 NFT](/developers/tutorials/how-to-view-nft-in-metamask/)！
