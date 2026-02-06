---
title: "使用WebSocket"
description: "有关使用WebSocket和Alchemy进行JSON-RPC请求并订阅事件的指南。"
author: "Elan Halpern"
lang: zh
tags: [ "Alchemy", "websocket", "查询中", "javascript" ]
skill: beginner
source: "Alchemy 文档"
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

这是有关使用WebSocket和Alchemy向以太坊区块链发出请求的入门级指南。

## WebSockets 与 HTTP {#websockets-vs-http}

与HTTP不同的是，使用WebSocket，你无需要需要特定信息时持续进行请求。 WebSocket为你维护网络连接（如果操作正确）并侦听变化。

与任何网络连接一样，你不应该假设WebSocket将永远保持打开状态而不会中断，但是正确地手动处理丢弃的连接和重新连接可能很难做到正确。 WebSocket的另一个缺点是，你在响应中不会得到HTTP状态码，而只会得到错误消息。

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) 自动添加对 WebSocket 连接失败的处理并重试，无需进行配置。

## 试一试 {#try-it-out}

测试 WebSocket 最简单的方式是安装一个命令行工具来进行 WebSocket 请求，例如 [wscat](https://github.com/websockets/wscat)。 使用wscat，你可以发送如下请求：

_注意：如果你有 Alchemy 帐户，可以将 `demo` 替换为自己的 API 密钥。 [在此注册免费的 Alchemy 帐户！](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## 如何使用 WebSockets {#how-to-use-websockets}

首先，使用应用的WebSocket URL打开WebSocket 你可以在[你的仪表板](https://dashboard.alchemy.com/)中打开应用的页面并点击“View Key”，即可找到应用的 WebSocket URL。 请注意，你的应用的 WebSocket URL 与其 HTTP 请求的 URL 不同，但两者都可以通过点击“View Key”找到。

![在你的 Alchemy 仪表板中查找 WebSocket URL 的位置](./use-websockets.gif)

[Alchemy API 参考](https://www.alchemy.com/docs/reference/api-overview)中列出的任何 API 都可以通过 WebSocket 使用。 为此，请使用与HTTP POST请求正文相同的有效载荷，而不是通过WebSocket发送该有效负载。

## 使用 Web3 {#with-web3}

在使用像Web3这样的客户端库时过渡到WebSocket是很简单的。 在实例化你的Web3客户端时，只需传递WebSocket URL而不是HTTP URL。 例如：

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## 订阅 API {#subscription-api}

通过 WebSocket 连接时，你可以使用两个额外的方法：`eth_subscribe` 和 `eth_unsubscribe`。 这些方法将允许你侦听特定事件并立即收到通知。

### `eth_subscribe` {#eth-subscribe}

为指定的事件创建新的订阅。 [了解有关 `eth_subscribe` 的更多信息](https://docs.alchemy.com/reference/eth-subscribe)。

#### 参数 {#parameters}

1. 订阅类型
2. 可选参数

第一个参数指定要侦听的事件类型。 第二个参数包含其他选项，具体取决于第一个参数。 不同的描述类型，其选项和事件有效载荷描述如下。

#### 返回值 {#returns}

订阅 ID：此 ID 将附加到所有收到的事件，也可用于通过 `eth_unsubscribe` 取消订阅。

#### 订阅事件 {#subscription-events}

当订阅处于活动状态时，你将收到包含以下字段的对象事件：

- `jsonrpc`：始终为 "2.0"
- `method`：始终为 "eth_subscription"
- `params`：一个包含以下字段的对象：
  - `subscription`：创建此订阅的 `eth_subscribe` 调用所返回的订阅 ID。
  - `result`：一个对象，其内容因订阅类型而异。

#### 订阅类型 {#subscription-types}

1. `alchemy_newFullPendingTransactions`

返回被添加到待定状态的所有交易的交易信息。 此订阅类型可订阅待处理的交易，类似于标准 Web3 调用 `web3.eth.subscribe("pendingTransactions")`，但不同之处在于它会发出_完整的交易信息_，而不仅仅是交易哈希。

例如：

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["alchemy_newFullPendingTransactions"]}

<  {"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}
<  {
      "jsonrpc":"2.0",
      "method":"eth_subscription",
      "params":{
          "result":{
          "blockHash":null,
          "blockNumber":null,
          "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
          "gas":"0x1adb0",
          "gasPrice":"0x7735c4d40",
          "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
          "nonce":"0x0",
          "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
          "transactionIndex":null,
          "value":"0x0",
          "v":"0x26",
          "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
          "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
          "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
      }
  }

```

2. `newHeads`

每当向链中添加新标头时（包括在链重组期间）都会触发事件。

发生链重组时，此订阅将触发一个事件，其中包含新链的所有新标头。 具体地说，这意味着你可能会看到多个高度相同的标头，当发生这种情况时，应该将后一个标头视为重组后的正确标头。

例如：

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "nonce":  "0x084149998194cc5f",
          "number":  "0x1348c9",
          "parentHash":  "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
          "receiptRoot":  "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
          "sha3Uncles":  "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "stateRoot":  "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
          "timestamp":  "0x56ffeff8",
          "transactionsRoot":  "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
      },
  "subscription":  "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}

```

3. `logs`

触发日志，这些日志是符合指定筛选条件的新添加区块的一部分。

当发生链重组时，属于旧链上区块的日志将再次发出，其 `removed` 属性会设置为 `true`。 此外，作为新链上区块的一部分的日志被触发，这意味着在重组的情况下可以多次看到同一交易的日志。

参数

1. 具有以下字段的对象：
   - `address`（可选）：一个表示地址的字符串，或由这类字符串组成的数组。
     - 只会触发从这些地址之一创建的日志。
   - `topics`：主题说明符数组。
     - 每个主题说明符可以是 `null`、代表一个主题的字符串，或一个字符串数组。
     - 数组中每个非 `null` 的位置都会限制所发出的日志，只包含在相应位置上拥有给定主题之一的日志。

主题规范的一些示例：

- `[]`：允许任何主题。
- `[A]`：A 在第一个位置（以及之后的任何内容）。
- `[null, B]`：第一个位置为任何内容，第二个位置为 B（以及之后的任何内容）。
- `[A, B]`：A 在第一个位置，B 在第二个位置（以及之后的任何内容）。
- `[[A, B], [A, B]]`：第一个位置为（A 或 B），第二个位置为（A 或 B）（以及之后的任何内容）。

例如：

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "subscription":  "0x4a8a4c0517381924f9838102c5a4dcb7",
      "result":  {
          "address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
          "blockHash":  "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
          "blockNumber":  "0x29e87",
          "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
          "logIndex":"0x0",
          "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
          "transactionHash":  "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
          "transactionIndex":  "0x0"
      }
  }
}

```

### `eth_unsubscribe` {#eth-unsubscribe}

取消一个现有的订阅，以便不再发送任何事件。

参数

1. 订阅 ID，即先前从 `eth_subscribe` 调用返回的 ID。

返回值

如果订阅成功取消，则为 `true`；如果不存在具有给定 ID 的订阅，则为 `false`。

例如：

**请求**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'


```

**结果**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

免费[注册 Alchemy](https://auth.alchemy.com)，查看[我们的文档](https://www.alchemy.com/docs/)，并在 [Twitter](https://x.com/AlchemyPlatform) 上关注我们以获取最新消息。
