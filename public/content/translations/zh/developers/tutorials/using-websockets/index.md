---
title: 使用WebSocket
description: 有关使用WebSocket和Alchemy进行JSON-RPC请求并订阅事件的指南。
author: "Elan Halpern"
lang: zh
tags:
  - "Alchemy"
  - "websocket"
  - "查询"
  - "javascript"
skill: beginner
source: Alchemy 文档
sourceUrl: https://docs.alchemyapi.io/guides/using-websockets
published: 2020-12-01
---

这是有关使用 WebSocket 和 Alchemy 向以太坊区块链发出请求的入门级指南。

## WebSocket 与 HTTP {#websockets-vs-http}

与 HTTP 不同的是，使用 WebSocket，您无需要需要特定信息时持续进行请求。 WebSocket 为您维护网络连接（如果操作正确）并侦听变化。

与任何网络连接一样，您不应该假设 WebSocket 将永远保持打开状态而不会中断，但是正确地手动处理丢弃的连接和重新连接可能很难做到正确。 WebSocket 的另一个缺点是，您在响应中不会得到 HTTP 状态码，而只会得到错误消息。

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) 自动添加对 WebSocket 连接失败的处理并重试，无需进行配置。

## 试试看 {#try-it-out}

测试 WebSocket 最简单的方式是安装命令行工具来进行 WebSocket 请求，例如[wscat](https://github.com/websockets/wscat)。 使用 wscat，您可以发送如下请求：

_注意：如果您有 Alchemy 帐户，则可以将`demo`替换成自己的 API 密钥。 [点击此处注册免费 Alchemy 帐户！](https://auth.alchemyapi.io/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## 如何使用 WebSocket {#how-to-use-websockets}

首先，使用应用的 WebSocket URL 打开 WebSocket 您可以在[您的仪表板](https://dashboard.alchemyapi.io/)中打开应用的页面并点击“View Key”来找到您的应用的 WebSocket URL。 请注意，您的应用的 WebSocket URL 与其 HTTP 请求的 URL 不同，但两者都可以通过点击“View Key”找到。

![在您的Alchemy仪表板中的何处可找到您的WebSocket URL](./use-websockets.gif)

[Alchemy API 参考](https://docs.alchemyapi.io/documentation/alchemy-api-reference/)中列出的的任何 API 都可以通过 WebSocket 使用。 为此，请使用与 HTTP POST 请求正文相同的有效载荷，而不是通过 WebSocket 发送该有效负载。

## 使用 Web3 {#with-web3}

在使用像 Web3 这样的客户端库时过渡到 WebSocket 是很简单的。 在实例化您的 Web3 客户端时，只需传递 WebSocket URL 而不是 HTTP URL。 例如：

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## 订阅 API {#subscription-api}

当通过 WebSocket 连接时，您可以使用两个额外的方法：`eth_subscribe`和`eth_unsubscribe`。 这些方法将允许您侦听特定事件并立即收到通知。

### `eth_subscribe` {#eth-subscribe}

为指定的事件创建新的订阅。 [详细了解 `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe)。

#### 参数 {#parameters}

1. 订阅类型
2. 可选参数

第一个参数指定要侦听的事件类型。 第二个参数包含其他选项，具体取决于第一个参数。 不同的描述类型，其选项和事件有效载荷描述如下。

#### 返回 {#returns}

订阅 ID：此 ID 将附加到任何收到的事件 并且也可用于通过`eth_unsubscribe`取消订阅。

#### 订阅事件 {#subscription-events}

当订阅处于活动状态时，您将收到包含以下字段的对象事件：

- `jsonrpc`：始终为“2.0”
- `method`：始终为“eth_subscription”
- `params`：具有以下字段的对象：
  - `subscription`：由创建此订阅的`eth_subscription`调用返回的订阅 ID。
  - `result`：其内容因订阅类型而异的对象。

#### 订阅类型 {#subscription-types}

1. `alchemy_newFullPendingTransactions`

返回被添加到待定状态的所有交易的交易信息。 此订阅类型订阅待处理交易，类似于标准 Web3 调用`web3.eth.subscribe("pendingTransactions")`，但不同之处是它触发*完整的交易信息*，而不只是交易哈希。

示例：

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

发生链重组时，此订阅将触发一个事件，其中包含新链的所有新标头。 具体地说，这意味着您可能会看到多个高度相同的标头，当发生这种情况时，应该将后一个标头视为重组后的正确标头。

示例：

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

当发生链重组时，作为旧链上区块的一部分的日志将再次触发，并将属性`removed`设置为`true`。 此外，作为新链上区块的一部分的日志被触发，这意味着在重组的情况下可以多次看到同一交易的日志。

参数

1. 具有以下字段的对象：
   - `address`（可选）：表示地址的字符串或此类字符串的数组。
     - 只会触发从这些地址之一创建的日志。
   - `topics`：主题说明符的数组。
     - 每个主题说明符都是`null`、表示主题的字符串或字符串数组。
     - 数组中非`null`的每个位置将触发的日志仅限制为在该位置具有给定主题之一的那些位置。

主题规范的一些示例：

- `[]`：任何允许的主题。
- `[A]`: A 位置第一个位置（以及后面任何位置）。
- `[null, B]`：任何内容位置第一个位置的，B 位于第二个位置（以及后面任何位置）。
- `[A, B]`：A 位于第一个位置的，B 位于第二个位置（以及后面任何位置）。
- `[[A、B]、[A、B]]`：（A 或 B）位于第一个位置，（A 或 B）位于第二个位置（以及后面任何位置）。

示例：

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

1. 先前从`eth_comment`调用返回的订阅 ID。

返回

如果订阅成功取消则为`true`，或者，如果没有具有给定 ID 的订阅，则为`false`。

示例：

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

免费[注册 Alchemy](https://auth.alchemyapi.io/signup)，查看我们的[相关文档](https://docs.alchemyapi.io/)，并关注我们的 [Twitter](https://twitter.com/AlchemyPlatform) 了解最新消息。
