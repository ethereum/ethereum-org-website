---
title: "使用 WebSocket"
description: "使用 WebSocket 发起 JSON-RPC 请求并订阅事件的指南，适用于任何以太坊节点提供商。"
author: "埃兰·哈尔彭"
lang: zh
tags: ["Alchemy", "websockets", "查询", "JavaScript"]
skill: beginner
breadcrumb: WebSocket
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

这是一篇关于使用 WebSocket 向以太坊区块链发起请求的入门指南。示例使用标准的 JSON-RPC 方法，因此它们适用于任何提供 WebSocket 端点的节点或节点提供商，包括 Alchemy。

## WebSocket 与 HTTP {#websockets-vs-http}

与 HTTP 不同，使用 WebSocket 时，你不需要在想要获取特定信息时不断发起请求。WebSocket 会为你保持网络连接（如果配置正确的话）并监听更改。

与任何网络连接一样，你不应假设 WebSocket 会永远保持打开状态而不中断，但手动正确处理断开的连接和重新连接可能具有挑战性。WebSocket 的另一个缺点是你在响应中无法获得 HTTP 状态码，只能获得错误消息。

客户端库可以为你处理这个问题。例如，[Viem 的 WebSocket 传输](https://viem.sh/docs/clients/transports/websocket)会在套接字故障时重新连接，并默认发送保持活动状态的 ping 消息。

## 试一试 {#try-it-out}

你需要一个以太坊节点的 WebSocket URL。当你创建应用程序编程接口 (API) 密钥时，节点提供商会为你提供一个，通常格式为 `wss://<provider-host>/<your-api-key>`。例如，Alchemy 以太坊主网 URL 类似于 `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>`（[注册免费的 Alchemy 账户](https://auth.alchemy.com/signup)）。有关其他提供商，请参阅[节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)，或使用[你自己的节点](/developers/docs/nodes-and-clients/run-a-node/)的 WebSocket 端点。公共端点（如 `wss://ethereum-rpc.publicnode.com`）也可用于快速实验，但它们有速率限制，并且可能不支持每种订阅类型。

测试 WebSocket 最简单的方法是安装一个用于发起 WebSocket 请求的命令行工具，例如 [wscat](https://github.com/websockets/wscat)。使用 wscat，你可以按如下方式发送请求：

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

以 `>` 开头的行是你输入的内容，以 `<` 开头的行是节点返回的内容。

## 如何使用 WebSocket {#how-to-use-websockets}

首先，使用你的提供商的 WebSocket URL 打开一个 WebSocket。对于 Alchemy，你可以通过在[仪表板](https://dashboard.alchemy.com/)中打开你的应用程序并查看其应用程序编程接口 (API) 密钥来找到它。请注意，WebSocket 的 URL (`wss://`) 与 HTTP 请求的 URL (`https://`) 不同，尽管大多数提供商对两者使用相同的 API 密钥。

![在 Alchemy 仪表板中哪里可以找到你的 WebSocket URL](./use-websockets.mp4#602x280)

你的提供商支持的任何 [JSON-RPC 方法](/developers/docs/apis/json-rpc/)都可以通过 WebSocket 使用。为此，请使用与作为 HTTP POST 请求主体发送的相同有效载荷，但改为通过 WebSocket 发送该有效载荷。

## 使用 Web3 {#with-web3}

在使用像 [Viem](https://viem.sh/) 这样的客户端库时，过渡到 WebSocket 非常简单。使用带有你的 WebSocket URL 的 `webSocket` 传输，而不是 `http` 传输。例如，在 `npm install viem` 之后，将其保存为 `index.mjs` 并运行 `node index.mjs`：

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// 通过同一个 WebSocket 订阅新区块
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## 订阅 API {#subscription-api}

通过 WebSocket 连接时，你可以使用两个额外的方法：`eth_subscribe` 和 `eth_unsubscribe`。这些方法将允许你监听特定事件并立即收到通知。

### `eth_subscribe` {#eth-subscribe}

为指定事件创建新的订阅。[了解有关 `eth_subscribe` 的更多信息](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub)。

#### 参数 {#parameters}

1. 订阅类型
2. 可选参数

第一个参数指定要监听的事件类型。第二个参数包含取决于第一个参数的附加选项。下面描述了不同的订阅类型、它们的选项以及它们的事件有效载荷。

#### 返回值 {#returns}

订阅 ID：此 ID 将附加到任何接收到的事件中，也可用于使用 `eth_unsubscribe` 取消订阅。

#### 订阅事件 {#subscription-events}

在订阅处于活动状态时，你将收到事件，这些事件是具有以下字段的对象：

- `jsonrpc`：始终为 "2.0"
- `method`：始终为 "eth_subscription"
- `params`：具有以下字段的对象：
  - `subscription`：由创建此订阅的 `eth_subscribe` 调用返回的订阅 ID。
  - `result`：一个对象，其内容因订阅类型而异。

#### 订阅类型 {#subscription-types}

1. `newHeads`

每当有新区块头添加到链上时（包括在链重组期间），都会发出一个事件。

当发生链重组时，此订阅将发出一个包含新链所有新区块头的事件。特别是，这意味着你可能会看到发出多个具有相同高度的区块头，当发生这种情况时，应将较晚的区块头视为重组后的正确区块头。

示例：

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

发出属于新添加区块且符合指定过滤条件的日志。

当发生链重组时，属于旧链上区块的日志将再次发出，且其 `removed` 属性设置为 `true`。此外，还会发出属于新链上区块的日志，这意味着在重组的情况下，可能会多次看到同一笔交易的日志。

参数

1. 一个包含以下字段的对象：
   - `address`（可选）：表示地址的字符串或此类字符串的数组。
     - 只有从这些地址之一创建的日志才会被发出。
   - `topics`：主题说明符数组。
     - 每个主题说明符要么是 `null`，要么是表示主题的字符串，要么是字符串数组。
     - 数组中不为 `null` 的每个位置都会将发出的日志限制为仅包含在该位置具有给定主题之一的日志。

主题规范的一些示例：

- `[]`：允许任何主题。
- `[A]`：A 在第一个位置（以及之后的任何内容）。
- `[null, B]`：任何内容在第一个位置，B 在第二个位置（以及之后的任何内容）。
- `[A, B]`：A 在第一个位置，B 在第二个位置（以及之后的任何内容）。
- `[[A, B], [A, B]]`：（A 或 B）在第一个位置，（A 或 B）在第二个位置（以及之后的任何内容）。

示例：

此示例监听以太坊主网上 [WETH 合约](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)的 `Deposit` 事件：

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

发出添加到节点待处理状态（其内存池）的每笔交易的哈希。

示例：

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

一些提供商还提供他们自己的订阅类型。例如，Alchemy 的 [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) 发出<em>完整的交易对象</em>而不仅仅是哈希，并接受可选的 `fromAddress`、`toAddress` 和 `hashesOnly` 过滤器。这些不是标准 JSON-RPC 应用程序编程接口 (API) 的一部分，因此它们仅适用于该提供商。

### `eth_unsubscribe` {#eth-unsubscribe}

取消现有订阅，以便不再发送任何事件。

参数

1. 订阅 ID，即之前从 `eth_subscribe` 调用返回的 ID。

返回值

如果成功取消订阅，则返回 `true`；如果不存在具有给定 ID 的订阅，则返回 `false`。

订阅仅存在于创建它的 WebSocket 连接上，因此必须通过同一连接发送 `eth_unsubscribe`。它不能作为单独的 HTTP 请求发送。关闭连接也会取消其所有订阅。

示例：

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

免费[注册 Alchemy](https://auth.alchemy.com)，查看 [Alchemy 的文档](https://www.alchemy.com/docs/)，如需了解最新消息，请在[推特](https://x.com/Alchemy)上关注 Alchemy。
