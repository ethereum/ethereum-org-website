---
title: "使用 Web3 发送交易"
description: "本文是面向初学者的指南，介绍如何用 Web3 发送以太坊交易。 向以太坊区块链发送交易主要有三个步骤：创建、签署和广播。 我们将对三个方面进行讨论。"
author: "Elan Halpern"
tags: [ "交易", "web3.js", "Alchemy" ]
skill: beginner
lang: zh
published: 2020-11-04
source: Alchemy 文档
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

本文是面向初学者的指南，介绍如何用 Web3 发送以太坊交易。 向以太坊区块链发送交易主要有三个步骤：创建、签署和广播。 我们将逐一讲解这三个步骤，希望能回答你可能遇到的任何问题！ 在本教程中，我们将使用 [Alchemy](https://www.alchemy.com/) 将我们的交易发送到以太坊链。 你可以在[此处创建免费的 Alchemy 帐户](https://auth.alchemyapi.io/signup)。

\*\*注意：\*\*本指南适用于在应用程序的_后端_签署交易。 如果想在前端集成交易签名，可以查阅[集成 Web3 和浏览器提供商](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider)的相关内容。

## 基础知识 {#the-basics}

和大多数区块链开发者入门时一样，你可能已经研究了如何发送交易（这本应很简单），但却看到了海量指南，而且众说纷纭，让你感到不知所措、心生困惑。 如果你也有同感，别担心，我们都曾经历过！ 所以，在开始之前，我们先要弄清楚几件事：

### 1. Alchemy 不会储存你的私钥 {#alchemy-does-not-store-your-private-keys}

- 这意味着 Alchemy 无法代表你签署和发送交易。 这是出于安全考虑。 Alchemy 绝不会要求你分享你的私钥，你也绝不应该与托管节点（或任何其他人）分享你的私钥。
- 你可以使用 Alchemy 的核心 API 从区块链读取数据，但要向区块链写入数据，你需要先用其他工具为交易签名，然后再通过 Alchemy 发送（这对任何其他[节点服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)都一样）。

### 2. 什么是“签名者”？ {#what-is-a-signer}

- 签名者会用你的私钥为你签署交易。 在本教程中，我们将使用 [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) 签署交易，但你也可以使用任何其他 web3 库。
- 在前端，[MetaMask](https://metamask.io/) 就是一个很好的签名者例子，它会代表你签署并发送交易。

### 3. 为什么我需要为我的交易签名？ {#why-do-i-need-to-sign-my-transactions}

- 每个想在以太坊网络上发送交易的用户，都必须用自己的私钥为交易签名，以验证交易发起人的身份。
- 保护私钥至关重要，因为拥有私钥就等于拥有了以太坊帐户的完全控制权，你（或任何知道私钥的人）可以代表你执行交易。

### 4. 如何保护我的私钥？ {#how-do-i-protect-my-private-key}

- 有很多方法可以保护你的私钥并用它来发送交易。 在本教程中，我们将使用一个 `.env` 文件。 不过，你也可以使用单独的私钥存储提供商、使用密钥存储文件或其他选项。

### 5. `eth_sendTransaction` 和 `eth_sendRawTransaction` 之间有什么区别？ {#difference-between-send-and-send-raw}

`eth_sendTransaction` 和 `eth_sendRawTransaction` 都是以太坊 API 函数，可将交易广播到以太坊网络，以便将其添加到未来的区块中。 它们在处理交易签名的方式上有所不同。

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) 用于发送_未签名_的交易，这意味着你发送到的节点必须管理你的私钥，这样它才能在将交易广播到链上之前对其进行签名。 由于 Alchemy 不持有用户的私钥，因此不支持此方法。
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) 用于广播已签名的交易。 这意味着你必须先使用 [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction)，然后将结果传入 `eth_sendRawTransaction`。

使用 web3 时，可以通过调用 [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction) 函数来访问 `eth_sendRawTransaction`。

这就是我们将在本教程中使用的函数。

### 6. 什么是 web3 库？ {#what-is-the-web3-library}

- Web3.js 是一个围绕标准 JSON-RPC 调用的封装库，在以太坊开发中非常常用。
- 有许多适用于不同语言的 web3 库。 在本教程中，我们将使用以 JavaScript 编写的 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)。 你可以在[此处](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)查看其他选项，例如 [ethers.js](https://docs.ethers.org/v5/)。

好了，澄清了这几个问题后，我们继续学习本教程。 欢迎随时在 Alchemy [discord](https://discord.gg/gWuC7zB) 提问！

### 7. 如何发送安全、燃料优化和私密的交易？ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy 有一套 Transact API](https://docs.alchemy.com/reference/transact-api-quickstart)。 你可以用它们来发送增强型交易、在交易发生前模拟交易、发送私密交易和发送燃料优化的交易。
- 你也可以使用 [Notify API](https://docs.alchemy.com/docs/alchemy-notify)，在你的交易被从内存池中取出并添加到链上时收到提醒。

\*\*注意：\*\*本指南需要一个 Alchemy 帐户、一个以太坊地址或 MetaMask 钱包，并且需要安装 NodeJs 和 npm。 如果没有，请按以下步骤操作：

1. [创建免费的 Alchemy 帐户](https://auth.alchemyapi.io/signup)
2. [创建 MetaMask 帐户](https://metamask.io/)（或获取一个以太坊地址）
3. [按照这些步骤安装 NodeJs 和 NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## 发送交易的步骤 {#steps-to-sending-your-transaction}

### 1. 在 Sepolia 测试网上创建一个 Alchemy 应用程序 {#create-an-alchemy-app-on-the-sepolia-testnet}

导航至你的 [Alchemy 控制面板](https://dashboard.alchemyapi.io/)并创建一个新应用，为你的网络选择 Sepolia（或任何其他测试网）。

### 2. 从 Sepolia 水龙头请求 ETH {#request-eth-from-sepolia-faucet}

按照 [Alchemy Sepolia 水龙头](https://www.sepoliafaucet.com/)上的说明接收 ETH。 请确保输入你的 **Sepolia** 以太坊地址（来自 MetaMask），而不是其他网络的地址。 按照说明操作后，请再次检查你是否已在钱包中收到 ETH。

### 3. 创建一个新项目目录并用 `cd` 命令进入 {#create-a-new-project-direction}

从命令行（Mac 系统是终端）创建一个新项目目录，并进入该目录：

```
mkdir sendtx-example
cd sendtx-example
```

### 4. 安装 Alchemy Web3（或任何 web3 库） {#install-alchemy-web3}

在你的项目目录中运行以下命令，以安装 [Alchemy Web3](https://docs.alchemy.com/reference/api-overview)：

注意，如果你想使用 ethers.js 库，请[按照此处的说明操作](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum)。

```
npm install @alch/alchemy-web3
```

### 5. 安装 dotenv {#install-dotenv}

我们将使用一个 `.env` 文件来安全地存储我们的 API 密钥和私钥。

```
npm install dotenv --save
```

### 6. 创建 `.env` 文件 {#create-the-dotenv-file}

在你的项目目录中创建一个 `.env` 文件，并添加以下内容（替换“`your-api-url`”和“`your-private-key`”）

- 要查找你的 Alchemy API URL，请导航到你刚在控制面板上创建的应用的详细信息页面，点击右上角的“View Key”，然后复制 HTTP URL。
- 要使用 MetaMask 查找你的私钥，请查看此[指南](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)。

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
不要提交 <code>.env</code>！ 请确保永远不要与任何人共享或公开你的 <code>.env</code> 文件，因为这样做会泄露你的机密信息。 如果你使用版本控制，请将你的 <code>.env</code> 添加到 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 文件中。
</AlertDescription>
</AlertContent>
</Alert>

### 7. 创建 `sendTx.js` 文件 {#create-sendtx-js}

很好，现在我们已将敏感数据保护在 `.env` 文件中，可以开始编码了。 对于我们的发送交易示例，我们会将 ETH 发送回 Sepolia 水龙头。

创建一个 `sendTx.js` 文件，我们将在这里配置并发送我们的示例交易，然后向其中添加以下代码行：

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: 将此地址替换为你自己的公共地址

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce 从 0 开始计数

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // 用于返回 eth 的水龙头地址
     'value': 1000000000000000000, // 1 个 ETH
     'gas': 30000,
     'nonce': nonce,
     // 发送消息或执行智能合约的可选数据字段
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 你的交易哈希是： ", hash, "\n 检查 Alchemy 的内存池，查看你的交易状态！");
    } else {
      console.log("❗提交交易时出错了：", error)
    }
   });
}

main();
```

请务必将**第 6 行**的地址替换为你自己的公共地址。

现在，在运行此代码之前，我们先来讨论一下其中的一些组件。

- `nonce`：nonce 规范用于跟踪从你的地址发送的交易数量。 我们需要它来确保安全并防止[重放攻击](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)。 为获取从你的地址发送的交易数量，我们使用 [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)。
- `transaction`：交易对象有几个方面需要我们指定
  - `to`：这是我们要将 ETH 发送到的地址。 在本例中，我们将 ETH 发送回我们最初请求 ETH 的 [Sepolia 水龙头](https://sepoliafaucet.com/)。
  - `value`：这是我们希望发送的金额，以 Wei 为单位，其中 10^18 Wei = 1 ETH
  - `gas`：有很多方法可以确定交易中要包含的正确燃料数量。 Alchemy 甚至有一个[燃料价格 webhook](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1)，可以在燃料价格降至特定阈值时通知你。 对于主网交易，最好使用 [ETH Gas Station](https://ethgasstation.info/) 等燃料估算器来确定要包含的正确燃料数量。 21000 是以太坊上一次操作将使用的最小燃料量，因此为确保我们的交易能够执行，我们在这里设置为 30000。
  - `nonce`：见上面的 nonce 定义。 Nonce 从零开始计数。
  - [可选] data：用于在转账时发送附加信息，或用于调用智能合约。余额转账不需要此字段，请查看下面的说明。
- `signedTx`：要签署我们的交易对象，我们将使用 `signTransaction` 方法和 `PRIVATE_KEY`
- `sendSignedTransaction`：一旦我们有了签名的交易，就可以使用 `sendSignedTransaction` 将其发送出去，以包含在后续区块中

**关于数据的说明**
在以太坊中可以发送两种主要类型的交易。

- 余额转账：将 ETH 从一个地址发送到另一个地址。 不需要数据字段，但是，如果你想在交易中发送附加信息，可以在此字段中包含十六进制 (HEX) 格式的信息。
  - 例如，假设我们想将 IPFS 文档的哈希写入以太坊链，以便为其提供不可变的时间戳。 我们的数据字段应该如下所示：data: `web3.utils.toHex(‘IPFS hash‘)`。 这样，任何人都可以查询该链，查看该文档的添加时间。
- 智能合约交易：在链上执行一些智能合约代码。 在这种情况下，数据字段应包含你希望执行的智能合约函数及其所有参数。
  - 如需查看实际示例，请查看此 [Hello World 教程](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction)的第 8 步。

### 8. 使用 `node sendTx.js` 运行代码 {#run-the-code-using-node-sendtx-js}

返回你的终端或命令行并运行：

```
node sendTx.js
```

### 9. 在内存池中查看你的交易 {#see-your-transaction-in-the-mempool}

在你的 Alchemy 控制面板中打开[内存池页面](https://dashboard.alchemyapi.io/mempool)，并按你创建的应用进行筛选以查找你的交易。 在这里，我们可以观察我们的交易从待处理状态转为已打包状态（如果成功）或被丢弃状态（如果失败）。 确保将其保留在“全部”状态，以便捕获“已打包”、“待处理”和“已丢弃”的交易。 你也可以通过查找发送到地址 `0x31b98d14007bdee637298086988a0bbd31184523` 的交易来搜索你的交易。

找到交易后，要查看其详细信息，请选择交易哈希，这会带你进入如下所示的视图：

![内存池观察程序屏幕截图](./mempool.png)

从那里，你可以通过单击红色圆圈中的图标，在 Etherscan 上查看你的交易！

**太棒啦！** 你刚刚使用 Alchemy 发送了你的第一笔以太坊交易 🎉\*\*

_有关本指南的反馈和建议，请在 Alchemy 的 [Discord](https://discord.gg/A39JVCM) 上给 Elan 留言！_

_原文发布于 [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
