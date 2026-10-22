---
title: "使用 viem 发送交易"
description: "这是一份对初学者友好的指南，介绍如何使用 viem 库发送以太坊交易。向以太坊区块链发送交易主要有三个步骤：创建、签名和广播。我们将逐一介绍这三个步骤。"
author: "埃兰·哈尔彭"
tags:
  - 交易
  - viem
  - alchemy
skill: beginner
breadcrumb: "发送交易"
lang: zh
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

这是一份对初学者友好的指南，介绍如何使用 [viem](https://viem.sh/) 库发送以太坊交易。向以太坊区块链发送交易主要有三个步骤：创建、签名和广播。我们将逐一介绍这三个步骤，希望能解答你可能遇到的任何问题！在本教程中，我们将使用 [Alchemy](https://www.alchemy.com/) 将我们的交易发送到以太坊链。你可以[在此处创建一个免费的 Alchemy 账户](https://auth.alchemy.com/signup)。

**注意：** 本指南适用于在应用程序的_后端_对交易进行签名。如果你想在前端集成交易签名，请查看[梅塔马斯克提供程序 API](https://docs.metamask.io/wallet/reference/provider-api/)。

## 基础知识 {#the-basics}

就像大多数刚起步的区块链开发者一样，你可能已经对如何发送交易（这应该是一件非常简单的事情）做了一些研究，并遇到了大量的指南，每篇指南的说法都不尽相同，让你感到有些不知所措和困惑。如果你正处于这种状态，别担心；我们都曾经历过！所以，在开始之前，让我们先弄清楚几件事：

### 1\. Alchemy 不会存储你的私钥 {#alchemy-does-not-store-your-private-keys}

- 这意味着 Alchemy 无法代表你签名和发送交易。这样做的原因是出于安全考虑。Alchemy 永远不会要求你分享你的私钥，你也绝不应该与托管节点（或任何人）分享你的私钥。
- 你可以使用 Alchemy 的核心 API 从区块链读取数据，但要向其写入数据，你需要使用其他工具在通过 Alchemy 发送交易之前对其进行签名（这对于任何其他[节点服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)也是一样的）。

### 2\. 什么是“签名者”？ {#what-is-a-signer}

- 签名者将使用你的私钥为你对交易进行签名。在本教程中，我们将使用 [viem](https://viem.sh/) 对我们的交易进行签名，但你也可以使用任何其他 Web3 库。
- 在前端，签名者的一个很好的例子是[梅塔马斯克](https://metamask.io/)，它将代表你对交易进行签名并发送。

### 3\. 为什么我需要对我的交易进行签名？ {#why-do-i-need-to-sign-my-transactions}

- 每个想要在以太坊网络上发送交易的用户都必须（使用其私钥）对交易进行签名，以验证交易的来源是否如其所称。
- 保护这个私钥非常重要，因为拥有它的访问权限就意味着拥有对你以太坊账户的完全控制权，允许你（或任何有访问权限的人）代表你执行交易。

### 4\. 我该如何保护我的私钥？ {#how-do-i-protect-my-private-key}

- 有很多方法可以保护你的私钥并使用它来发送交易。在本教程中，我们将使用一个 `.env` 文件。不过，你也可以使用存储私钥的独立提供程序、使用密钥库文件或其他选项。

### 5\. `eth_sendTransaction` 和 `eth_sendRawTransaction` 之间有什么区别？ {#difference-between-send-and-send-raw}

`eth_sendTransaction` 和 `eth_sendRawTransaction` 都是以太坊 API 函数，它们将交易广播到以太坊网络，以便将其添加到未来的区块中。它们在处理交易签名的方式上有所不同。

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) 用于发送_未签名_的交易，这意味着你发送到的节点必须管理你的私钥，以便它可以在将交易广播到链上之前对其进行签名。由于 Alchemy 不持有用户的私钥，因此他们不支持此方法。
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) 用于广播已经签名的交易。这意味着你首先必须使用你的私钥对交易进行签名（在 viem 中，使用带有[本地账户](https://viem.sh/docs/accounts/local/privateKeyToAccount)的 [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction)），然后将结果传递给 `eth_sendRawTransaction`。

使用 viem 时，可以通过调用函数 [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction) 来访问 `eth_sendRawTransaction`。

这就是我们在本教程中将要使用的方法。

### 6\. 什么是 Web3 库？ {#what-is-the-web3-library}

- Web3 库是标准 [JSON-RPC 调用](/developers/docs/apis/json-rpc/)的包装器，在以太坊开发中非常常用。
- 有许多适用于不同语言的 Web3 库。在本教程中，我们将使用 [viem](https://viem.sh/)，它是用 TypeScript 编写的，可以在任何 JavaScript 项目中使用。你可以[在此处](/developers/docs/apis/javascript/)查看其他选项，例如 [ethers.js](https://docs.ethers.org/v6/)。

好了，现在我们已经解决了一些问题，让我们继续本教程。欢迎随时在 Alchemy [Discord](https://discord.gg/gWuC7zB) 中提问！

### 7\. 如何发送安全、Gas 优化和私密的交易？ {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy 提供了一套交易资源](https://www.alchemy.com/docs/sending-transactions)。你可以使用这些资源来发送交易、在交易发生前模拟交易、发送私密交易以及发送 Gas 优化的交易。
- 你还可以使用 [Alchemy Webhook](https://www.alchemy.com/docs/reference/webhooks-overview)，以便在你的交易从内存池中被提取并添加到链上时收到警报。

**注意：** 本指南需要一个 Alchemy 账户、一个以太坊地址或梅塔马斯克钱包，并安装 Node.js 和 npm。如果没有，请按照以下步骤操作：

1.  [创建一个免费的 Alchemy 账户](https://auth.alchemy.com/signup)
2.  [创建梅塔马斯克账户](https://metamask.io/)（或获取一个以太坊地址）
3.  [安装 Node.js 和 npm](https://nodejs.org/en/download/)
## 发送交易的步骤 {#steps-to-sending-your-transaction}

### 1\. 在 Sepolia 测试网上创建一个 Alchemy 应用程序 {#create-an-alchemy-app-on-the-sepolia-testnet}

导航到你的 [Alchemy 仪表板](https://dashboard.alchemy.com/)并创建一个新的应用程序，为你的网络选择 Sepolia（或任何其他测试网）。

### 2\. 从 Sepolia 水龙头请求 ETH {#request-eth-from-sepolia-faucet}

按照 [Alchemy Sepolia 水龙头](https://www.alchemy.com/faucets/ethereum-sepolia)上的说明接收 ETH，或使用其他 [Sepolia 水龙头](/developers/docs/networks/#sepolia)之一。水龙头会发放少量 ETH（Alchemy 水龙头每天发放 0.1 ETH），这对于本教程来说已经足够了。请确保包含你的 **Sepolia** 以太坊地址（来自梅塔马斯克），而不是其他网络。按照说明操作后，仔细检查你是否已在钱包中收到 ETH。

### 3\. 创建一个新的项目目录并 `cd` 进入该目录 {#create-a-new-project-direction}

从命令行（Mac 的终端）创建一个新的项目目录并导航进入该目录：

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. 安装 viem（或任何 Web3 库） {#install-alchemy-web3}

在你的项目目录中运行以下命令来安装 [viem](https://viem.sh/)：

注意，如果你想使用 ethers.js 库，请[按照此处的说明进行操作](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum)。

```sh
npm init -y
npm install viem
```

### 5\. 安装 dotenv {#install-dotenv}

我们将使用一个 `.env` 文件来安全地存储我们的 API 密钥和私钥。

```
npm install dotenv --save
```

### 6\. 创建 `.env` 文件 {#create-the-dotenv-file}

在你的项目目录中创建一个 `.env` 文件并添加以下内容（替换“`your-api-url`”和“`your-private-key`”）

- 要找到你的 Alchemy API URL，请导航到你在仪表板上刚刚创建的应用程序的应用程序详细信息页面，单击右上角的“View Key”，然后获取 HTTP URL。
- 要使用梅塔马斯克找到你的私钥，请查看此[指南](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)。请使用仅持有测试网 ETH 的账户。

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
不要提交 <code>.env</code>！请确保永远不要与任何人共享或暴露你的 <code>.env</code> 文件，因为这样做会泄露你的机密。如果你正在使用版本控制，请将你的 <code>.env</code> 添加到 <a href="https://git-scm.com/docs/gitignore">gitignore</a> 文件中。
</AlertDescription>
</AlertContent>
</Alert>

### 7\. 创建 `sendTx.js` 文件 {#create-sendtx-js}

太好了，现在我们已经在 `.env` 文件中保护了我们的敏感数据，让我们开始编码吧。对于我们的发送交易示例，我们将向你控制的另一个地址（例如梅塔马斯克中的第二个账户）发送 0.001 ETH。

创建一个 `sendTx.js` 文件，我们将在其中配置并发送我们的示例交易，并向其中添加以下代码行：

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // 随机数从 0 开始计数

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: 替换为你想要发送 ETH 的地址
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // 可选的数据字段，用于发送消息或执行智能合约
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

请务必将 `0xYourSecondAddress` 替换为你想要向其发送 ETH 的地址。该脚本从 `PRIVATE_KEY` 派生你自己的（发送）地址，因此你不需要输入它。

现在，在开始运行此代码之前，让我们先谈谈这里的一些组件。

- `account`：使用 [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) 从你的私钥创建的本地账户。签名在你的机器上进行，私钥永远不会发送给 Alchemy。
- `publicClient` 和 `walletClient`：向你的 Alchemy URL 发送 JSON-RPC 请求的 viem 客户端。公共客户端从链上读取数据，钱包客户端为你的账户准备并签名交易。
- `nonce`：随机数规范用于跟踪从你的地址发送的交易数量。出于安全目的和防止重放攻击，我们需要它。要获取从你的地址发送的交易数量，我们使用 [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count)。viem 也会为你填写此内容，但我们在此处显式获取它以显示它的来源。
- `transaction`：交易对象有几个我们需要指定的方面。[`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) 会根据当前网络状况为我们填写其余部分，包括 `chainId` 和 [EIP-1559](/developers/docs/gas/) 费用字段 `maxFeePerGas` 和 `maxPriorityFeePerGas`
  - `to`：这是我们想要向其发送 ETH 的地址。
  - `value`：这是我们希望发送的金额，以 Wei 指定，其中 10^18 Wei = 1 ETH。[`parseEther`](https://viem.sh/docs/utilities/parseEther) 为我们将 ETH 金额转换为 Wei。你的账户需要的金额比这多一点，因为它还需要支付 Gas 费用
  - `gas`：有许多方法可以确定交易中包含的正确 Gas 量。Alchemy 支持可以通知你链上活动的 [Webhook](https://www.alchemy.com/docs/reference/webhooks-overview)。对于主网交易，最好检查当前的 Gas 状况以确定要包含的正确 Gas 量。向普通地址的普通 ETH 转账始终使用正好 21000 Gas，这是任何交易的最低要求，因此我们在此处输入 21000。如果你省略 `gas`，viem 会为你估算。
  - `nonce`：参见上面的随机数定义。随机数从零开始计数。
  - [可选] data：用于在转账时发送附加信息，或调用智能合约，余额转账不需要，请查看下面的说明。
- `signedTx`：为了对我们的交易对象进行签名，我们将使用 `signTransaction` 方法，该方法使用从我们的 `PRIVATE_KEY` 创建的账户在本地对其进行签名
- `sendRawTransaction`：一旦我们有了签名的交易，我们就可以使用 `sendRawTransaction` 将其发送出去以包含在后续区块中，该方法调用 `eth_sendRawTransaction`
- `waitForTransactionReceipt`：等待交易被包含在区块中并返回其收据

**关于 data 的说明**
在以太坊中可以发送两种主要类型的交易。

- 余额转账：将 ETH 从一个地址发送到另一个地址。不需要 data 字段，但是，如果你想在交易旁边发送附加信息，你可以以 HEX 格式在此字段中包含该信息。
  - 例如，假设我们想将 IPFS 文档的哈希写入以太坊链，以便为其提供不可变的时间戳。我们的 data 字段应该看起来像 `data: toHex("IPFS hash")`，使用 viem 的 [`toHex`](https://viem.sh/docs/utilities/toHex)。现在任何人都可以查询该链并查看该文档是何时添加的。
- 智能合约交易：在链上执行一些智能合约代码。在这种情况下，data 字段应包含你希望执行的智能函数以及任何参数。
  - 有关实际示例，请查看 [Hello World 智能合约教程](/developers/tutorials/hello-world-smart-contract/)。

### 8\. 使用 `node sendTx.js` 运行代码 {#run-the-code-using-node-sendtx-js}

导航回你的终端或命令行并运行：

```
node sendTx.js
```

### 9\. 在区块浏览器上查看你的交易 {#see-your-transaction-in-the-mempool}

脚本在节点接受交易后立即打印交易哈希，然后等待它被包含在区块中（通常在几秒钟内）并打印结果。要查看详细信息，请将哈希粘贴到 Sepolia 区块浏览器中，例如 [Sepolia Etherscan](https://sepolia.etherscan.io/) 或 [Blockscout](https://eth-sepolia.blockscout.com/)。在那里，你可以观察交易从待处理变为已包含，并查看金额、费用和它所在的区块。

如果你看到 `insufficient funds` 错误，则说明你的账户没有足够的 Sepolia ETH 来支付价值加上 Gas 费用。返回第 2 步并从水龙头请求更多。

**太棒了！你刚刚使用 Alchemy 发送了你的第一笔以太坊交易 🎉**

_有关本指南的反馈和建议，请在 Alchemy 的 [Discord](https://discord.gg/gWuC7zB) 上给 Elan 留言！_

_最初由 Alchemy 发布。_
