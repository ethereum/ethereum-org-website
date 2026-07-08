---
title: "以太坊开发入门"
description: "这是一份以太坊开发入门指南。我们将带你从启动 API 端点、发起命令行请求，一直到编写你的第一个 Web3 脚本！无需任何区块链开发经验！"
author: "伊兰·哈尔彭"
tags:
  - javascript
  - ethers.js
  - 节点
  - 查询
  - alchemy
skill: beginner
breadcrumb: "入门"
lang: zh
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

这是一份以太坊开发入门指南。在本教程中，我们将使用 [Alchemy](https://www.alchemy.com/)，这是领先的区块链开发者平台，为排名前 70% 的区块链应用程序（包括 Maker、0x、MyEtherWallet、Dharma 和 Kyber）的数百万用户提供支持。Alchemy 将为我们提供以太坊链上的 API 端点访问权限，以便我们可以读取和写入交易。

我们将带你从注册 Alchemy 账户一直到编写你的第一个 Web3 脚本！无需任何区块链开发经验！

## 1. 注册免费的 Alchemy 账户 {#sign-up-for-a-free-alchemy-account}

注册 Alchemy 账户非常简单，[在此处免费注册](https://auth.alchemy.com/)。

## 2. 创建 Alchemy 应用程序 {#create-an-alchemy-app}

要与以太坊链通信并使用 Alchemy 的产品，你需要一个 API 密钥来验证你的请求。

你可以[在仪表板中创建 API 密钥](https://dashboard.alchemy.com/)。要创建新密钥，请导航至“Create App”（创建应用程序），如下所示：

特别感谢 [_ShapeShift_](https://shapeshift.com/) _允许我们展示他们的仪表板！_

![Alchemy dashboard](./alchemy-dashboard.png)

填写“Create App”下的详细信息以获取新密钥。你还可以在此处查看你以前创建的应用程序以及你的团队创建的应用程序。通过点击任何应用程序的“View Key”（查看密钥）来提取现有密钥。

![Create app with Alchemy screenshot](./create-app.png)

你还可以通过将鼠标悬停在“Apps”（应用程序）上并选择一个来提取现有的 API 密钥。你可以在此处“View Key”（查看密钥），以及“Edit App”（编辑应用程序）以将特定域名列入白名单、查看多种开发者工具并查看分析数据。

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. 从命令行发起请求 {#make-a-request-from-the-command-line}

使用 JSON-RPC 和 curl 通过 Alchemy 与以太坊区块链进行交互。

对于手动请求，我们建议通过 `POST` 请求与 `JSON-RPC` 进行交互。只需传入 `Content-Type: application/json` 标头，并将你的查询作为 `POST` 主体，包含以下字段：

- `jsonrpc`：JSON-RPC 版本——目前仅支持 `2.0`。
- `method`：ETH API 方法。[请参阅 API 参考。](/developers/docs/apis/json-rpc/)
- `params`：要传递给该方法的参数列表。
- `id`：你的请求 ID。将由响应返回，以便你可以跟踪响应属于哪个请求。

以下是一个你可以从命令行运行以检索当前 Gas 价格的示例：

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**注意：**请将 `https://eth-mainnet.alchemyapi.io/v2/demo` 替换为你自己的 API 密钥 `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`。_

**结果：**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. 设置你的 Web3 客户端 {#set-up-your-web3-client}

<strong>如果你已有客户端，</strong>请将你当前的节点提供者 URL 更改为带有你 API 密钥的 Alchemy URL：`“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

<strong>_注意：_</strong>以下脚本需要在 <strong>Node 环境</strong>中运行或**保存在文件中**，而不是从命令行运行。如果你尚未安装 Node 或 npm，请遵循 [Node.js 安装说明](https://nodejs.org/en/download/)。

有许多 [Web3 库](/developers/docs/apis/javascript/)可以与 Alchemy 集成，但是，我们建议使用 [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)，它是 Web3.js 的直接替代品，经过构建和配置，可与 Alchemy 无缝协作。这提供了多种优势，例如自动重试和强大的 WebSocket 支持。

要安装 AlchemyWeb3.js，请**导航到你的项目目录**并运行：

**使用 Yarn：**

```
yarn add @alch/alchemy-web3
```

**使用 NPM：**

```
npm install @alch/alchemy-web3
```

要与 Alchemy 的节点基础设施进行交互，请在 NodeJS 中运行或将其添加到 JavaScript 文件中：

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. 编写你的第一个 Web3 脚本！ {#write-your-first-web3-script}

现在，为了亲自动手进行一些 Web3 编程，我们将编写一个简单的脚本，打印出以太坊主网的最新区块号。

**1. 如果你还没有这样做，请在终端中创建一个新的项目目录并进入该目录：**

```
mkdir web3-example
cd web3-example
```

**2. 如果你尚未安装，请将 Alchemy Web3（或任何 Web3）依赖项安装到你的项目中：**

```
npm install @alch/alchemy-web3
```

**3. 创建一个名为 `index.js` 的文件并添加以下内容：**

> 你最终应该将 `demo` 替换为你的 Alchemy HTTP API 密钥。

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

不熟悉异步（async）操作？请查看这篇 [Medium 文章](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c)。

**4. 使用 node 在终端中运行它**

```
node index.js
```

**5. 你现在应该会在控制台中看到输出的最新区块号！**

```
The latest block number is 11043912
```

**哇！恭喜！你刚刚使用 Alchemy 编写了你的第一个 Web3 脚本 🎉**

不确定接下来该做什么？尝试部署你的第一个智能合约，并在我们的 [Hello World 智能合约指南](/developers/tutorials/hello-world-smart-contract/)中亲自动手进行一些 Solidity 编程，或者继续探索 [Alchemy 的文档](https://www.alchemy.com/docs/)以获取更多示例。

_[免费注册 Alchemy](https://auth.alchemy.com/)，查看我们的[文档](https://www.alchemy.com/docs/)，如需获取最新消息，请在 [Twitter](https://twitter.com/AlchemyPlatform) 上关注我们_。