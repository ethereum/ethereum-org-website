---
title: "以太坊开发入门"
description: "这是一份针对以太坊开发入门的初学者指南。 我们将带领你从启动一个 API 终端节点开始，到提出一个命令行请求，再到编写你的第一个 web3 脚本。 无需区块链开发经验！"
author: "Elan Halpern"
tags: [ "javascript", "ethers.js", "节点", "查询中", "Alchemy" ]
skill: beginner
breadcrumb: "入门指南"
lang: zh
published: 2020-10-30
source: "中"
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![以太坊和 Alchemy 徽标](./ethereum-alchemy.png)

这是一份关于以太坊开发的初学者指南。 在本教程中，我们将使用 [Alchemy](https://alchemyapi.io/)，这是一个领先的区块链开发者平台，为 70% 的顶级区块链应用程序（包括 Maker、0x、MyEtherWallet、Dharma 和 Kyber）的数百万用户提供支持。 Alchemy 使我们能够访问以太坊链上的 API 端点，这样我们就可以读写交易。

我们将带你注册 Alchemy 来编写你的第一个 web3 脚本！ 无需区块链开发经验！

## 1. 注册一个免费的 Alchemy 帐户 {#sign-up-for-a-free-alchemy-account}

创建 Alchemy 帐户很容易，[点击此处免费注册](https://auth.alchemy.com/)。

## 2. 创建 Alchemy 应用 {#create-an-alchemy-app}

为了与以太坊链通信，以及为了使用 Alchemy 的产品，你需要一个 API 密钥来验证你的请求。

你可以[从仪表板创建 API 密钥](https://dashboard.alchemy.com/)。 要创建一个新密钥，导航到如下所示的“Create App”：

特别感谢 [_ShapeShift_](https://shapeshift.com/) _允许我们展示他们的仪表板！_

![Alchemy 仪表板](./alchemy-dashboard.png)

填写“Create App”下的详细信息以获取你的新密钥。 在此处还可以看到你以前创建的应用以及你的团队创建的应用。 通过点击任何应用的“View Key”来查看现有密钥。

![使用 Alchemy 创建应用的屏幕截图](./create-app.png)

你也可以通过将鼠标悬停在“Apps”上并选择一个来获取现有 API 密钥。 你可以在这里“View Key”，以及“Edit App”以将特定域加入白名单、查看几个开发者工具并查看分析。

![显示用户如何获取 API 密钥的 Gif](./pull-api-keys.gif)

## 3. 从命令行发出请求 {#make-a-request-from-the-command-line}

使用 JSON-RPC 和 curl 通过 Alchemy 与以太坊区块链交互。

对于手动请求，我们建议通过 `POST` 请求与 `JSON-RPC` 交互。 只需传入 `Content-Type: application/json` 标头，并将你的查询作为 `POST` 正文，其中包含以下字段：

- `jsonrpc`：JSON-RPC 版本——目前仅支持 `2.0`。
- `method`：ETH API 方法。 [请参阅 API 参考。](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`：要传递给方法的参数列表。
- `id`：你的请求的 ID。 响应中会返回此 ID，以便你跟踪响应所属的请求。

这是一个可以从命令行运行以检索当前燃料价格的示例：

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_\*\*注意：\*\*请将 [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) 替换为你自己的 API 密钥 `https://eth-mainnet.alchemyapi.io/v2/**your-api-key`。_

**结果：**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. 设置你的 Web3 客户端 {#set-up-your-web3-client}

\*\*如果你有现有客户端，\*\*请将你当前的节点提供商 URL 更改为包含你 API 密钥的 Alchemy URL：`“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_注意：_**下面的脚本需要在**节点环境**中运行或**保存在文件中**运行，而不是从命令行运行。 如果你尚未安装 Node 或 npm，请查看此 [Mac 快速设置指南](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs)。

有许多可以与 Alchemy 集成的 [Web3 库](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)，但我们建议使用 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)，这是一个 web3.js 的直接替代品，经构建和配置可与 Alchemy 无缝协作。 这个库有很多优点，例如自动重试和可靠的 WebSocket 支持。

要安装 AlchemyWeb3.js，**导航到你的项目目录**并运行：

**使用 Yarn：**

```
yarn add @alch/alchemy-web3
```

**使用 NPM：**

```
npm install @alch/alchemy-web3
```

要与 Alchemy 的节点基础设施交互，请在 NodeJS 中运行或将其添加到 JavaScript 文件：

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. 编写你的第一个 Web3 脚本！ {#write-your-first-web3-script}

现在用一个小的 web3 编程来练习，我们将编写一个简单的脚本，用于打印出以太坊主网中最新的区块高度。

**1. 在终端中创建一个新的项目目录并通过 cd 命令进入该目录（如果尚未这样做）：**

```
mkdir web3-example
cd web3-example
```

**2. 在项目中安装 Alchemy Web3（或任何 Web3）依赖项（如果尚未这样做）：**

```
npm install @alch/alchemy-web3
```

**3. 创建一个名为 `index.js` 的文件并添加以下内容：**

> 你最终应将 `demo` 替换为你的 Alchemy HTTP API 密钥。

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

不熟悉 async 函数？ 请查看这篇 [Medium 帖子](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c)。

**4. 在你的终端中使用 node 运行**

```
node index.js
```

**5. 现在你应该可以在控制台中看到最新的区块编号输出！**

```
The latest block number is 11043912
```

**哇！** 恭喜！ 你刚刚使用 Alchemy 编写了你的第一个 Web3 脚本 🎉\*\*

不知道下一步该怎么做？ 尝试部署你的第一个智能合约，并在我们的 [Hello World 智能合约指南](https://www.alchemy.com/docs/hello-world-smart-contract)中动手进行一些 Solidity 编程，或者使用 [Dashboard 演示应用](https://docs.alchemyapi.io/tutorials/demo-app)测试你的仪表板知识！

_[免费注册 Alchemy](https://auth.alchemy.com/)，查看我们的[文档](https://www.alchemy.com/docs/)，以及要了解最新消息，请在 [Twitter](https://twitter.com/AlchemyPlatform) 上关注我们_。
