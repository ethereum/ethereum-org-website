---
title: 在 JavaScript 中设置 Web3.js 以使用以太坊区块链
description: 了解如何设置和配置 Web3.js 库，以便在 JavaScript 应用程序中与以太坊区块链进行交互。
author: "jdourlens"
tags: ["web3.js", "javascript"]
skill: beginner
breadcrumb: Web3.js 设置
lang: zh
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在本教程中，我们将了解如何开始使用 [Web3.js](https://web3js.readthedocs.io/) 与以太坊区块链进行交互。Web3.js 既可用于前端，也可用于后端，以从区块链读取数据或进行交易，甚至部署智能合约。

第一步是将 Web3.js 包含在你的项目中。要在网页中使用它，你可以使用像 JSDeliver 这样的 CDN 直接导入该库。

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

如果你更喜欢安装该库以在后端或使用构建工具的前端项目中使用，你可以使用 npm 进行安装：

```bash
npm install web3 --save
```

然后，要将 Web3.js 导入到 Node.js 脚本或 Browserify 前端项目中，你可以使用以下 JavaScript 代码：

```js
const Web3 = require("web3")
```

现在我们已经将该库包含在项目中，我们需要对其进行初始化。你的项目需要能够与区块链进行通信。大多数以太坊库通过 RPC 调用与[节点](/developers/docs/nodes-and-clients/)进行通信。为了初始化我们的 Web3 提供者 (provider)，我们将实例化一个 Web3 实例，并将提供者的 URL 作为构造函数传递。如果你在计算机上运行了一个节点或 [ganache 实例](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)，它将如下所示：

```js
const web3 = new Web3("http://localhost:8545")
```

如果你想直接访问托管节点，你可以在[节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service)中找到相关选项。

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

为了测试我们是否正确配置了 Web3 实例，我们将尝试使用 `getBlockNumber` 函数检索最新的区块号。该函数接受一个回调作为参数，并以整数形式返回区块号。

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

如果你执行此程序，它将简单地打印最新的区块号：即区块链的顶端。你还可以使用 `await/async` 函数调用来避免在代码中嵌套回调：

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

你可以在 [Web3.js 官方文档](https://docs.web3js.org/)中查看 Web3 实例上所有可用的函数。

大多数 Web3 库都是异步的，因为在后台，该库会对节点进行 JSON-RPC 调用，然后节点将结果发送回来。

<Divider />

如果你在浏览器中工作，一些钱包会直接注入一个 Web3 实例，你应该尽可能尝试使用它，特别是当你计划与用户的以太坊地址交互以进行交易时。

以下是用于检测梅塔马斯克钱包是否可用并在可用时尝试启用它的代码片段。稍后，它将允许你读取用户的余额，并使他们能够验证你希望他们在以太坊区块链上执行的交易：

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // 如果需要，请求账户访问权限
    await window.ethereum.enable()
    // 账户现已公开
  } catch (error) {
    // 用户拒绝了账户访问权限...
  }
}
```

确实存在像 [Ethers.js](https://docs.ethers.io/) 这样 Web3.js 的替代方案，并且它们也很常用。在下一个教程中，我们将了解[如何轻松监听区块链上新传入的区块并查看它们包含的内容](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/)。