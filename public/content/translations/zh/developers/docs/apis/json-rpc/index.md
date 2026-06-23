---
title: JSON-RPC API
description: "适用于以太坊客户端的无状态、轻量级远程过程调用 (RPC) 协议。"
lang: zh
---

为了使软件应用程序能够与[以太坊](/)区块链进行交互（无论是读取区块链数据还是向网络发送交易），它必须连接到一个以太坊节点。

为此，每个[以太坊客户端](/developers/docs/nodes-and-clients/#execution-clients)都实现了 [JSON-RPC 规范](https://github.com/ethereum/execution-apis)，因此无论具体的节点或客户端实现如何，应用程序都可以依赖一组统一的方法。

[JSON-RPC](https://www.jsonrpc.org/specification) 是一种无状态、轻量级的远程过程调用 (RPC) 协议。它定义了多种数据结构及其处理规则。它与传输方式无关，因为这些概念可以在同一进程内、通过套接字、通过 HTTP 或在许多不同的消息传递环境中使用。它使用 JSON (RFC 4627) 作为数据格式。

## 客户端实现 {#client-implementations}

在实现 JSON-RPC 规范时，各个以太坊客户端可能会使用不同的编程语言。请参阅各个[客户端文档](/developers/docs/nodes-and-clients/#execution-clients)，了解与特定编程语言相关的更多详细信息。我们建议查看每个客户端的文档，以获取最新的 API 支持信息。

## 便捷库 {#convenience-libraries}

虽然你可以选择通过 JSON-RPC API 直接与以太坊客户端交互，但对于去中心化应用 (dapp) 开发者来说，通常有更简单的选择。有许多 [JavaScript](/developers/docs/apis/javascript/#available-libraries) 和 [后端 API](/developers/docs/apis/backend/#available-libraries) 库在 JSON-RPC API 之上提供了封装。借助这些库，开发者可以使用他们选择的编程语言编写直观的单行方法，从而（在底层）初始化与以太坊交互的 JSON-RPC 请求。

## 共识客户端 API {#consensus-clients}

本页面主要介绍以太坊执行客户端使用的 JSON-RPC API。不过，共识客户端也有一个 RPC API，允许用户查询有关节点的信息，请求信标区块、信标状态以及直接从节点获取其他与共识相关的信息。此 API 的文档位于 [信标 API 网页](https://ethereum.github.io/beacon-APIs/#/)。

节点内的客户端间通信也使用一个内部 API——也就是说，它使共识客户端和执行客户端能够交换数据。这被称为“引擎 API”（Engine API），其规范可在 [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) 上获取。

## 执行客户端规范 {#spec}

[在 GitHub 上阅读完整的 JSON-RPC API 规范](https://github.com/ethereum/execution-apis)。此 API 记录在[执行 API 网页](https://ethereum.github.io/execution-apis/)上，并包含一个检查器（Inspector），用于尝试所有可用的方法。

## 约定 {#conventions}

### 十六进制值编码 {#hex-encoding}

通过 JSON 传递两种关键数据类型：未格式化的字节数组和数量。两者都使用十六进制编码传递，但格式要求不同。

#### 数量 {#quantities-encoding}

在对数量（整数、数字）进行编码时：编码为十六进制，以“0x”为前缀，使用最紧凑的表示形式（一个小例外：零应表示为“0x0”）。

以下是一些示例：

- 0x41（十进制的 65）
- 0x400（十进制的 1024）
- 错误：0x（应始终至少有一位数字 - 零为“0x0”）
- 错误：0x0400（不允许有前导零）
- 错误：ff（必须以 0x 为前缀）

### 未格式化数据 {#unformatted-data-encoding}

在对未格式化数据（字节数组、账户地址、哈希、字节码数组）进行编码时：编码为十六进制，以“0x”为前缀，每个字节两个十六进制数字。

以下是一些示例：

- 0x41（大小为 1，“A”）
- 0x004200（大小为 3，“0B0”）
- 0x（大小为 0，“”）
- 错误：0xf0f0f（必须是偶数位数字）
- 错误：004200（必须以 0x 为前缀）

### 区块参数 {#block-parameter}

以下方法具有区块参数：

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

当发出查询以太坊状态的请求时，提供的区块参数决定了区块的高度。

区块参数可以使用以下选项：

- `HEX String` - 整数区块号
- `String "earliest"` 用于最早的区块/创世区块
- `String "latest"` - 用于最新提议的区块
- `String "safe"` - 用于最新安全头部区块
- `String "finalized"` - 用于最新已最终确定的区块
- `String "pending"` - 用于待处理状态/交易

## 示例 {#examples}

在本页中，我们提供了如何使用命令行工具 [curl](https://curl.se) 来使用各个 JSON_RPC API 端点的示例。这些各个端点的示例可以在下方的 [Curl 示例](#curl-examples) 部分找到。在页面的更下方，我们还提供了一个[端到端示例](#usage-example)，演示如何使用 Geth 节点、JSON_RPC API 和 curl 来编译和部署智能合约。

## Curl 示例 {#curl-examples}

下面提供了通过向以太坊节点发出 [curl](https://curl.se) 请求来使用 JSON_RPC API 的示例。每个示例都包含对特定端点、其参数、返回类型的描述，以及如何使用它的实际示例。

curl 请求可能会返回与内容类型相关的错误消息。这是因为 `--data` 选项将内容类型设置为 `application/x-www-form-urlencoded`。如果你的节点确实对此报错，请通过在调用开头放置 `-H "Content-Type: application/json"` 来手动设置标头。这些示例也不包含 URL/IP 和端口组合，它必须是提供给 curl 的最后一个参数（例如 `127.0.0.1:8545`）。包含这些附加数据的完整 curl 请求采用以下形式：

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip、状态与历史 {#gossip-state-history}

少数核心 JSON-RPC 方法需要来自以太坊网络的数据，它们可以清晰地分为三个主要类别：_Gossip、状态和历史_。使用这些部分中的链接跳转到每个方法，或者使用目录浏览整个方法列表。

### Gossip 方法 {#gossip-methods}

> 这些方法跟踪链的头部。这就是交易在网络中传播、进入区块以及客户端发现新区块的方式。

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### 状态方法 {#state-methods}

> 报告所有已存储数据当前状态的方法。“状态”就像一块巨大的共享内存（RAM），包括账户余额、合约数据和 Gas 估算。

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### 历史方法 {#history-methods}

> 获取追溯到创世区块的每个区块的历史记录。这就像一个巨大的仅追加文件，包括所有区块头、区块体、叔块和交易收据。

- [eth_getBlockTransactionCountByHash](#eth-getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth-getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth-getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth-getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth-getblockbyhash)
- [eth_getBlockByNumber](#eth-getblockbynumber)
- [eth_getTransactionByHash](#eth-gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth-gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth-gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth-gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth-getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth-getunclebyblocknumberandindex)

## JSON-RPC API 演练场 {#json-rpc-api-playground}

你可以使用[演练场工具](https://ethereum-json-rpc.com)来发现和尝试 API 方法。它还会向你展示各个节点提供商支持哪些方法和网络。

## JSON-RPC API 方法 {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

返回当前客户端版本。

**参数**

无

**返回**

`String` - 当前客户端版本

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// 结果
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

返回给定数据的 Keccak-256（*非*标准化的 SHA3-256）。

**参数**

1. `DATA` - 要转换为 SHA3 哈希的数据

```js
params: ["0x68656c6c6f20776f726c64"]
```

**返回值**

`DATA` - 给定字符串的 SHA3 结果。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// 结果
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

返回当前网络 ID。

**参数**

无

**返回**

`String` - 当前网络 ID。

当前网络 ID 的完整列表可在 [chainlist.org](https://chainlist.org) 查看。一些常见的网络 ID 包括：

- `1`：以太坊主网
- `11155111`：Sepolia 测试网
- `560048`：Hoodi 测试网

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// 结果
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

如果客户端正在主动监听网络连接，则返回 `true`。

**参数**

无

**返回**

`Boolean` - 监听时为 `true`，否则为 `false`。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// 结果
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

返回当前连接到客户端的对等节点数量。

**参数**

无

**返回值**

`QUANTITY` - 表示已连接对等节点数量的整数。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// 结果
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

返回当前的以太坊协议版本。请注意，此方法[在 Geth 中不可用](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)。

**参数**

无

**返回**

`String` - 当前的以太坊协议版本

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// 结果
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

返回一个包含同步状态数据的对象，或者返回 `false`。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  在演练场中尝试端点
</ButtonLink>

**参数**

无

**返回**

确切的返回数据因客户端实现而异。当节点未同步时，所有客户端都会返回 `False`，并且所有客户端都会返回以下字段。

`Object|Boolean`，一个包含同步状态数据的对象，或者在未同步时返回 `FALSE`：

- `startingBlock`: `QUANTITY` - 开始导入的区块（只有在同步到达其头部后才会重置）
- `currentBlock`: `QUANTITY` - 当前区块，与 eth_blockNumber 相同
- `highestBlock`: `QUANTITY` - 估计的最高区块

但是，各个客户端也可能提供额外的数据。例如，Geth 返回以下内容：

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

而贝苏 (Besu) 返回：

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

有关更多详细信息，请参阅特定客户端的文档。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// 或者当未同步时
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

返回客户端的 Coinbase 地址。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  在演练场中尝试端点
</ButtonLink>

> <strong>注意：</strong>此方法自 **v1.14.0** 起已被弃用，且不再受支持。尝试使用此方法将导致“Method not supported”错误。

**参数**

无

**返回**

`DATA`，20 字节 - 当前的 Coinbase 地址。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// 结果
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

返回用于签名防重放交易的链 ID。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  在演练场中尝试端点
</ButtonLink>

**参数**

无

**返回**

`chainId`，以字符串形式表示当前链 ID 整数的十六进制值。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// 结果
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

如果客户端正在积极挖掘新区块，则返回 `true`。这只能在工作量证明 (PoW) 网络中返回 `true`，并且自[合并](/roadmap/merge/)以来，在某些客户端中可能不可用。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  在演练场中尝试端点
</ButtonLink>

**参数**

无

**返回**

`Boolean` - 如果客户端正在挖矿，则返回 `true`，否则返回 `false`。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

返回节点挖矿时每秒的哈希次数。这只能为工作量证明网络返回 `true`，并且自[合并](/roadmap/merge/)以来，在某些客户端中可能不可用。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  在演练场中尝试端点
</ButtonLink>

**参数**

无

**返回**

`QUANTITY` - 每秒的哈希次数。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// 结果
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

返回当前每单位 Gas 价格的估算值（单位为 Wei）。例如，贝苏客户端默认检查最近的 100 个区块并返回 Gas 单价的中位数。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  在演练场中尝试端点
</ButtonLink>

**参数**

无

**返回**

`QUANTITY` - 当前 Gas 价格的整数（单位为 Wei）。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// 结果
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

返回客户端拥有的地址列表。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  在演练场中尝试端点
</ButtonLink>

**参数**

无

**返回**

`Array of DATA`，20 字节 - 客户端拥有的地址。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

返回最新区块的编号。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  在演练场中尝试端点
</ButtonLink>

**参数**

无

**返回**

`QUANTITY` - 客户端当前所在区块编号的整数。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// 结果
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

返回给定地址的账户余额。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `DATA`，20 字节 - 要检查余额的地址。
2. `QUANTITY|TAG` - 整数区块号，或者字符串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，请参阅[区块参数](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**返回**

`QUANTITY` - 当前余额的整数，单位为 Wei。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

返回给定地址的存储位置的值。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `DATA`，20 字节 - 存储的地址。
2. `QUANTITY` - 存储位置的整数。
3. `QUANTITY|TAG` - 整数区块号，或者字符串 `"latest"`、`"earliest"`、`"pending"`、`"safe"`、`"finalized"`，请参阅[区块参数](/developers/docs/apis/json-rpc/#block-parameter)

**返回**

`DATA` - 该存储位置的值。

**示例**
计算正确的位置取决于要检索的存储。考虑由地址 `0x391694e7e0b0cce554cb130d723a9d27458f9298` 部署在 `0x295a70b2de5e3953354a6a8344e616ed314d7251` 的以下合约。

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

检索 pos0 的值非常简单：

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

检索映射中的元素则比较困难。映射中元素的位置计算方式如下：

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

这意味着要检索 pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] 上的存储，我们需要通过以下方式计算位置：

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

可以使用 Web3 库自带的 Geth 控制台进行计算：

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

现在来获取存储：

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

返回从某个地址_发出_的交易数量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `DATA`，20 字节 - 地址。
2. `QUANTITY|TAG` - 整数区块号，或字符串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，请参阅[区块参数](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // 最新区块的状态
]
```

**返回**

`QUANTITY` - 整数，表示从该地址发出的交易数量。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

返回与给定区块哈希匹配的区块中的交易数量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `DATA`，32 字节 - 区块的哈希

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**返回值**

`QUANTITY` - 该区块中交易数量的整数。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

返回与给定区块编号匹配的区块中的交易数量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `QUANTITY|TAG` - 区块编号的整数，或者是字符串 `"earliest"`、`"latest"`、`"pending"`、`"safe"` 或 `"finalized"`，如 [block 参数](/developers/docs/apis/json-rpc/#block-parameter) 中所述。

```js
params: [
  "0x13738ca", // 20396234
]
```

**返回值**

`QUANTITY` - 该区块中交易数量的整数。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

返回与给定区块哈希匹配的区块中的叔块数量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `DATA`，32 字节 - 区块的哈希

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**返回**

`QUANTITY` - 整数，表示该区块中的叔块数量。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

返回与给定区块号匹配的区块中的叔块数量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `QUANTITY|TAG` - 区块号的整数，或者字符串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，请参阅[区块参数](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**返回值**

`QUANTITY` - 该区块中叔块数量的整数。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

返回给定地址的代码。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `DATA`，20 字节 - 地址
2. `QUANTITY|TAG` - 整数区块号，或者字符串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，请参阅[区块参数](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**返回值**

`DATA` - 给定地址的代码。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

sign 方法使用 `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))` 计算以太坊特定的签名。

通过在消息中添加前缀，可以使计算出的签名被识别为以太坊特定的签名。这可以防止恶意去中心化应用 (dapp) 签署任意数据（例如交易）并使用该签名冒充受害者的滥用行为。

注意：用于签名的地址必须已解锁。

**参数**

1. `DATA`，20 字节 - 地址
2. `DATA`，N 字节 - 要签名的消息

**返回值**

`DATA`：签名

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

签名一笔交易，该交易可以在稍后使用 [eth_sendRawTransaction](#eth-sendrawtransaction) 提交到网络。

**参数**

1. `Object` - 交易对象

- `type`:
- `from`: `DATA`，20 字节 - 发送交易的地址。
- `to`: `DATA`，20 字节 - （创建新合约时为可选）交易指向的地址。
- `gas`: `QUANTITY` - （可选，默认值：90000）为执行交易提供的 Gas 整数值。它将退还未使用的 Gas。
- `gasPrice`: `QUANTITY` - （可选，默认值：待定）每个支付的 Gas 所使用的 gasPrice 整数值，单位为 Wei。
- `value`: `QUANTITY` - （可选）随此交易发送的价值整数，单位为 Wei。
- `data`: `DATA` - 合约的编译代码，或者调用的方法签名和编码参数的哈希。
- `nonce`: `QUANTITY` - （可选）随机数的整数值。这允许覆盖使用相同随机数的自己的待处理交易。

**返回值**

`DATA`，由指定账户签名的 RLP 编码交易对象。

**示例**

```js
// 请求
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// 结果
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

如果 data 字段包含代码，则创建新的消息调用交易或合约创建交易，并使用 `from` 中指定的账户对其进行签名。

**参数**

1. `Object` - 交易对象

- `from`: `DATA`，20 字节 - 发送交易的地址。
- `to`: `DATA`，20 字节 - （创建新合约时为可选）交易指向的地址。
- `gas`: `QUANTITY` - （可选，默认值：90000）为交易执行提供的 Gas 整数值。它将退还未使用的 Gas。
- `gasPrice`: `QUANTITY` - （可选，默认值：待定）每个支付的 Gas 所使用的 gasPrice 整数值。
- `value`: `QUANTITY` - （可选）随此交易发送的 value 整数值。
- `input`: `DATA` - 合约的编译代码，或者调用的方法签名与编码参数的哈希。
- `nonce`: `QUANTITY` - （可选）随机数的整数值。这允许你覆盖使用相同随机数的自己的待处理交易。

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**返回**

`DATA`，32 字节 - 交易哈希；如果交易尚不可用，则为零哈希。

在你创建合约时，如果交易已被打包到区块中，请使用 [eth_getTransactionReceipt](#eth-gettransactionreceipt) 获取合约地址。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

为已签名的交易创建新的消息调用交易或合约创建。

**参数**

1. `DATA`，已签名的交易数据。

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**返回值**

`DATA`，32 字节 - 交易哈希，如果交易尚不可用，则为零哈希。

如果你创建了合约，在交易被打包进区块后，请使用 [eth_getTransactionReceipt](#eth-gettransactionreceipt) 来获取合约地址。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

立即执行一个新的消息调用，而无需在区块链上创建交易。通常用于执行只读的智能合约函数，例如 ERC-20 合约的 `balanceOf`。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `Object` - 交易调用对象

- `from`: `DATA`，20 字节 - （可选）发送交易的地址。
- `to`: `DATA`，20 字节 - 交易指向的地址。
- `gas`: `QUANTITY` - （可选）为交易执行提供的 Gas 整数。eth_call 消耗零 Gas，但某些执行可能需要此参数。
- `gasPrice`: `QUANTITY` - （可选）用于每个付费 Gas 的 gasPrice 整数
- `value`: `QUANTITY` - （可选）随此交易发送的值的整数
- `input`: `DATA` - （可选）方法签名和编码参数的哈希。有关详细信息，请参阅 [Solidity 文档中的以太坊合约 ABI](https://docs.soliditylang.org/en/latest/abi-spec.html)。

2. `QUANTITY|TAG` - 整数区块号，或字符串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，请参阅[区块参数](/developers/docs/apis/json-rpc/#block-parameter)

**返回值**

`DATA` - 执行合约的返回值。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

生成并返回完成该交易所需 Gas 的估算值。该交易不会被添加到区块链中。请注意，由于 EVM 机制和节点性能等多种原因，估算值可能会大大超过交易实际使用的 Gas 量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  在演练场中尝试此端点
</ButtonLink>

**参数**

参见 [eth_call](#eth-call) 参数，但所有属性都是可选的。如果未指定 gas 上限，Geth 会将待处理区块的区块 gas 上限作为上限。因此，当 Gas 量高于待处理区块的 gas 上限时，返回的估算值可能不足以执行该调用/交易。

**返回值**

`QUANTITY` - 使用的 Gas 量。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

根据哈希返回关于某个区块的信息。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `DATA`，32 字节 - 区块的哈希。
2. `Boolean` - 如果为 `true`，则返回完整的交易对象；如果为 `false`，则仅返回交易的哈希。

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**返回值**

`Object` - 一个区块对象，如果未找到区块则返回 `null`：

- `number`: `QUANTITY` - 区块号。如果是待处理区块则为 `null`。
- `hash`: `DATA`，32 字节 - 区块的哈希。如果是待处理区块则为 `null`。
- `parentHash`: `DATA`，32 字节 - 父区块的哈希。
- `nonce`: `DATA`，8 字节 - 生成的工作量证明的哈希。如果是待处理区块则为 `null`，对于权益证明区块（自合并以来）则为 `0x0`。
- `sha3Uncles`: `DATA`，32 字节 - 区块中叔块数据的 SHA3 哈希。
- `logsBloom`: `DATA`，256 字节 - 区块日志的布隆过滤器。如果是待处理区块则为 `null`。
- `transactionsRoot`: `DATA`，32 字节 - 区块的交易树根。
- `stateRoot`: `DATA`，32 字节 - 区块的最终状态树根。
- `receiptsRoot`: `DATA`，32 字节 - 区块的收据树根。
- `miner`: `DATA`，20 字节 - 获得区块奖励的受益人地址。
- `difficulty`: `QUANTITY` - 此区块难度的整数。
- `totalDifficulty`: `QUANTITY` - 截至此区块的链总难度的整数。
- `extraData`: `DATA` - 此区块的“额外数据”字段。
- `size`: `QUANTITY` - 此区块大小的整数（以字节为单位）。
- `gasLimit`: `QUANTITY` - 此区块中允许的 gas 上限。
- `gasUsed`: `QUANTITY` - 此区块中所有交易使用的总 Gas。
- `timestamp`: `QUANTITY` - 区块打包时的 Unix 时间戳。
- `transactions`: `Array` - 交易对象的数组，或 32 字节的交易哈希，具体取决于最后给定的参数。
- `uncles`: `Array` - 叔块哈希的数组。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// 结果
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth-getblockbynumber}

根据区块号返回有关区块的信息。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `QUANTITY|TAG` - 区块号的整数，或字符串 `"earliest"`、`"latest"`、`"pending"`、`"safe"` 或 `"finalized"`，如 [block 参数](/developers/docs/apis/json-rpc/#block-parameter) 中所述。
2. `Boolean` - 如果为 `true`，则返回完整的交易对象；如果为 `false`，则仅返回交易的哈希。

```js
params: [
  "0x1b4", // 436
  true,
]
```

**返回值**
请参阅 [eth_getBlockByHash](#eth-getblockbyhash)

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

结果请参阅 [eth_getBlockByHash](#eth-getblockbyhash)

### eth_getTransactionByHash {#eth-gettransactionbyhash}

返回通过交易哈希请求的交易信息。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `DATA`，32 字节 - 交易的哈希

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**返回**

`Object` - 交易对象；如果未找到交易，则返回 `null`：

- `blockHash`: `DATA`，32 字节 - 包含此交易的区块哈希。如果处于待处理状态，则返回 `null`。
- `blockNumber`: `QUANTITY` - 包含此交易的区块号。如果处于待处理状态，则返回 `null`。
- `from`: `DATA`，20 字节 - 发送方的地址。
- `gas`: `QUANTITY` - 发送方提供的 Gas。
- `gasPrice`: `QUANTITY` - 发送方提供的 Gas 价格（单位为 Wei）。
- `hash`: `DATA`，32 字节 - 交易的哈希。
- `input`: `DATA` - 随交易一起发送的数据。
- `nonce`: `QUANTITY` - 发送方在此交易之前进行的交易数量。
- `to`: `DATA`，20 字节 - 接收方的地址。如果是合约创建交易，则返回 `null`。
- `transactionIndex`: `QUANTITY` - 交易在区块中索引位置的整数。如果处于待处理状态，则返回 `null`。
- `value`: `QUANTITY` - 转移的金额（单位为 Wei）。
- `v`: `QUANTITY` - ECDSA 恢复 ID
- `r`: `QUANTITY` - ECDSA 签名 r
- `s`: `QUANTITY` - ECDSA 签名 s

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// 结果
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth-gettransactionbyblockhashandindex}

通过区块哈希和交易索引位置返回有关交易的信息。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `DATA`，32 字节 - 区块的哈希。
2. `QUANTITY` - 交易索引位置的整数。

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**返回值**
请参阅 [eth_getTransactionByHash](#eth-gettransactionbyhash)

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

结果请参阅 [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

通过区块号和交易索引位置返回关于某笔交易的信息。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `QUANTITY|TAG` - 区块号，或字符串 `"earliest"`、`"latest"`、`"pending"`、`"safe"` 或 `"finalized"`，如 [block 参数](/developers/docs/apis/json-rpc/#block-parameter) 中所述。
2. `QUANTITY` - 交易索引位置。

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**返回值**
请参阅 [eth_getTransactionByHash](#eth-gettransactionbyhash)

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

结果请参阅 [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

通过交易哈希返回交易的收据。

**注意** 待处理的交易无法获取收据。

**参数**

1. `DATA`，32 字节 - 交易的哈希

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**返回值**
`Object` - 交易收据对象，如果未找到收据则返回 `null`：

- `transactionHash `: `DATA`，32 字节 - 交易的哈希。
- `transactionIndex`: `QUANTITY` - 交易在区块中索引位置的整数。
- `blockHash`: `DATA`，32 字节 - 包含此交易的区块的哈希。
- `blockNumber`: `QUANTITY` - 包含此交易的区块号。
- `from`: `DATA`，20 字节 - 发送方的地址。
- `to`: `DATA`，20 字节 - 接收方的地址。如果是合约创建交易，则为 null。
- `cumulativeGasUsed` : `QUANTITY ` - 在区块中执行此交易时使用的 Gas 总量。
- `effectiveGasPrice` : `QUANTITY` - 每单位 Gas 支付的基础费用和优先费之和。
- `gasUsed `: `QUANTITY ` - 仅此特定交易所使用的 Gas 量。
- `contractAddress `: `DATA`，20 字节 - 如果交易是合约创建交易，则为创建的合约地址，否则为 `null`。
- `logs`: `Array` - 此交易生成的日志对象数组。
- `logsBloom`: `DATA`，256 字节 - 供轻客户端快速检索相关日志的布隆过滤器。
- `type`: `QUANTITY` - 交易类型的整数，`0x0` 表示传统交易，`0x1` 表示访问列表类型，`0x2` 表示动态费用。

它还会返回以下_其中之一_：

- `root` : `DATA` 32 字节的交易后状态根（拜占庭升级前）
- `status`: `QUANTITY `1`（成功）或 `0`（失败）

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// 结果
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // 如果已创建，则为地址的字符串
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // 由 getFilterLogs 等返回的日志
    }],
    "logsBloom": "0x00...0", // 256 字节布隆过滤器
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth-getunclebyblockhashandindex}

通过哈希和叔块索引位置返回关于某个区块的叔块信息。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `DATA`，32 字节 - 区块的哈希。
2. `QUANTITY` - 叔块的索引位置。

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**返回**
请参阅 [eth_getBlockByHash](#eth-getblockbyhash)

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

结果请参阅 [eth_getBlockByHash](#eth-getblockbyhash)

**注意**：叔块不包含单独的交易。

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

返回有关指定区块编号和叔块索引位置的叔块信息。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  在演练场中尝试端点
</ButtonLink>

**参数**

1. `QUANTITY|TAG` - 区块编号，或字符串 `"earliest"`、`"latest"`、`"pending"`、`"safe"`、`"finalized"`，如 [block 参数](/developers/docs/apis/json-rpc/#block-parameter) 中所述。
2. `QUANTITY` - 叔块的索引位置。

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**返回**
请参阅 [eth_getBlockByHash](#eth-getblockbyhash)

**注意**：叔块不包含单独的交易。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

结果请参阅 [eth_getBlockByHash](#eth-getblockbyhash)

### eth_newFilter {#eth-newfilter}

根据过滤器选项创建一个过滤器对象，以便在状态发生变化（日志）时发出通知。
要检查状态是否已更改，请调用 [eth_getFilterChanges](#eth-getfilterchanges)。

**关于指定主题过滤器的说明：**
主题是依赖于顺序的。包含主题 [A, B] 的日志的交易将与以下主题过滤器匹配：

- `[]` “任何内容”
- `[A]` “A 在第一个位置（以及之后的任何内容）”
- `[null, B]` “第一个位置的任何内容，且 B 在第二个位置（以及之后的任何内容）”
- `[A, B]` “A 在第一个位置，且 B 在第二个位置（以及之后的任何内容）”
- `[[A, B], [A, B]]` “（A 或 B）在第一个位置，且（A 或 B）在第二个位置（以及之后的任何内容）”
- **参数**

1. `Object` - 过滤器选项：

- `fromBlock`: `QUANTITY|TAG` - （可选，默认值：`"latest"`）整数区块号，或者使用 `"latest"` 表示最新提议的区块，`"safe"` 表示最新的安全区块，`"finalized"` 表示最新已最终确定的区块，或者使用 `"pending"`、`"earliest"` 表示尚未包含在区块中的交易。
- `toBlock`: `QUANTITY|TAG` - （可选，默认值：`"latest"`）整数区块号，或者使用 `"latest"` 表示最新提议的区块，`"safe"` 表示最新的安全区块，`"finalized"` 表示最新已最终确定的区块，或者使用 `"pending"`、`"earliest"` 表示尚未包含在区块中的交易。
- `address`: `DATA|Array`，20 字节 - （可选）合约地址或日志应源自的地址列表。
- `topics`: `Array of DATA`，- （可选）32 字节 `DATA` 主题的数组。主题是依赖于顺序的。每个主题也可以是带有“或”选项的 DATA 数组。

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**返回**
`QUANTITY` - 过滤器 ID。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

在节点中创建一个过滤器，以便在有新区块到达时发出通知。
要检查状态是否已更改，请调用 [eth_getFilterChanges](#eth-getfilterchanges)。

**参数**
无

**返回值**
`QUANTITY` - 过滤器 ID。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// 结果
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

在节点中创建一个过滤器，以便在新的待处理交易到达时发出通知。
要检查状态是否已更改，请调用 [eth_getFilterChanges](#eth-getfilterchanges)。

**参数**
无

**返回值**
`QUANTITY` - 过滤器 ID。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// 结果
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

卸载具有给定 ID 的过滤器。当不再需要监听时，应始终调用此方法。
此外，如果一段时间内没有使用 [eth_getFilterChanges](#eth-getfilterchanges) 请求过滤器，它们将会超时。

**参数**

1. `QUANTITY` - 过滤器 ID。

```js
params: [
  "0xb", // 11
]
```

**返回值**
`Boolean` - 如果过滤器成功卸载，则返回 `true`，否则返回 `false`。

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// 结果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

过滤器的轮询方法，返回自上次轮询以来发生的日志数组。

**参数**

1. `QUANTITY` - 过滤器 ID。

```js
params: [
  "0x16", // 22
]
```

**返回**
`Array` - 日志对象数组，如果自上次轮询以来没有任何变化，则返回空数组。

- 对于使用 `eth_newBlockFilter` 创建的过滤器，返回的是区块哈希（`DATA`，32 字节），例如 `["0x3454645634534..."]`。
- 对于使用 `eth_newPendingTransactionFilter ` 创建的过滤器，返回的是交易哈希（`DATA`，32 字节），例如 `["0x6345343454645..."]`。
- 对于使用 `eth_newFilter` 创建的过滤器，日志是包含以下参数的对象：
  - `removed`: `TAG` - 如果由于链重组导致日志被移除，则为 `true`。如果是有效日志，则为 `false`。
  - `logIndex`: `QUANTITY` - 日志在区块中索引位置的整数。如果是待处理日志，则为 `null`。
  - `transactionIndex`: `QUANTITY` - 创建该日志的交易索引位置的整数。如果是待处理日志，则为 `null`。
  - `transactionHash`: `DATA`，32 字节 - 创建该日志的交易哈希。如果是待处理日志，则为 `null`。
  - `blockHash`: `DATA`，32 字节 - 包含该日志的区块哈希。如果是待处理状态，则为 `null`。如果是待处理日志，则为 `null`。
  - `blockNumber`: `QUANTITY` - 包含该日志的区块号。如果是待处理状态，则为 `null`。如果是待处理日志，则为 `null`。
  - `address`: `DATA`，20 字节 - 产生此日志的地址。
  - `data`: `DATA` - 可变长度的非索引日志数据。（在 _Solidity_ 中：零个或多个 32 字节的非索引日志参数。）
  - `topics`: `Array of DATA` - 包含 0 到 4 个 32 字节 `DATA` 索引日志参数的数组。（在 _Solidity_ 中：第一个主题是事件签名的_哈希_（例如 `Deposit(address,bytes32,uint256)`），除非你使用 `anonymous` 说明符声明了该事件。）

- **示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// 结果
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth-getfilterlogs}

返回与给定 id 的过滤器匹配的所有日志的数组。

**参数**

1. `QUANTITY` - 过滤器 id。

```js
params: [
  "0x16", // 22
]
```

**返回值**
请参阅 [eth_getFilterChanges](#eth-getfilterchanges)

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

结果请参阅 [eth_getFilterChanges](#eth-getfilterchanges)

### eth_getLogs {#eth-getlogs}

返回与给定过滤器对象匹配的所有日志的数组。

**参数**

1. `Object` - 过滤器选项：

- `fromBlock`: `QUANTITY|TAG` - （可选，默认值：`"latest"`）整数区块号，或者使用 `"latest"` 表示最新提议的区块，`"safe"` 表示最新的安全区块，`"finalized"` 表示最新已最终确定的区块，或者使用 `"pending"`、`"earliest"` 表示尚未包含在区块中的交易。
- `toBlock`: `QUANTITY|TAG` - （可选，默认值：`"latest"`）整数区块号，或者使用 `"latest"` 表示最新提议的区块，`"safe"` 表示最新的安全区块，`"finalized"` 表示最新已最终确定的区块，或者使用 `"pending"`、`"earliest"` 表示尚未包含在区块中的交易。
- `address`: `DATA|Array`，20 字节 - （可选）日志来源的合约地址或地址列表。
- `topics`: `Array of DATA` - （可选）32 字节 `DATA` 主题的数组。主题与顺序相关。每个主题也可以是带有“或”选项的 DATA 数组。
- `blockHash`: `DATA`，32 字节 - （可选，**未来**）随着 EIP-234 的加入，`blockHash` 将成为一个新的过滤器选项，它将返回的日志限制在具有 32 字节哈希 `blockHash` 的单个区块中。使用 `blockHash` 等同于 `fromBlock` = `toBlock` = 具有哈希 `blockHash` 的区块号。如果过滤条件中存在 `blockHash`，则不允许使用 `fromBlock` 和 `toBlock`。

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**返回值**
请参阅 [eth_getFilterChanges](#eth-getfilterchanges)

**示例**

```js
// 请求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

结果请参阅 [eth_getFilterChanges](#eth-getfilterchanges)

## 用法示例 {#usage-example}

### 使用 JSON-RPC 部署合约 {#deploying-contract}

本节包含仅使用 RPC 接口部署合约的演示。还有其他部署合约的途径可以抽象掉这种复杂性——例如，使用构建在 RPC 接口之上的库，如 [Web3.js](https://web3js.readthedocs.io/) 和 [Web3.py](https://github.com/ethereum/web3.py)。这些抽象通常更容易理解且不易出错，但了解其底层原理仍然很有帮助。

以下是一个名为 `Multiply7` 的简单智能合约，它将使用 JSON-RPC 接口部署到以太坊节点。本教程假设读者已经在运行一个 Geth 节点。有关节点和客户端的更多信息，请参见[此处](/developers/docs/nodes-and-clients/run-a-node)。请参阅各个[客户端](/developers/docs/nodes-and-clients/)文档，了解如何为非 Geth 客户端启动 HTTP JSON-RPC。大多数客户端默认在 `localhost:8545` 上提供服务。

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

首先要做的是确保 HTTP RPC 接口已启用。这意味着我们在启动时为 Geth 提供 `--http` 标志。在本例中，我们在私有开发链上使用 Geth 节点。使用这种方法，我们不需要真实网络上的以太币。

```bash
geth --http --dev console 2>>geth.log
```

这将在 `http://localhost:8545` 上启动 HTTP RPC 接口。

我们可以通过使用 [curl](https://curl.se) 检索 Coinbase 地址（通过从账户数组中获取第一个地址）和余额来验证接口是否正在运行。请注意，这些示例中的数据在你的本地节点上会有所不同。如果你想尝试这些命令，请将第二个 curl 请求中的请求参数替换为第一个请求返回的结果。

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

由于数字是十六进制编码的，余额将以十六进制字符串的形式返回，单位为 Wei。如果我们想以数字形式获取以太币余额，我们可以使用 Geth 控制台中的 web3。

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

现在我们的私有开发链上有一些以太币了，我们可以部署合约。第一步是将 Multiply7 合约编译为可以发送到 EVM 的字节码。要安装 Solidity 编译器 solc，请遵循 [Solidity 文档](https://docs.soliditylang.org/en/latest/installing-solidity.html)。（你可能希望使用较旧的 `solc` 版本，以匹配[我们示例中使用的编译器版本](https://github.com/ethereum/solidity/releases/tag/v0.4.20)。）

下一步是将 Multiply7 合约编译为可以发送到 EVM 的字节码。

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

现在我们有了编译后的代码，我们需要确定部署它需要花费多少 Gas。RPC 接口有一个 `eth_estimateGas` 方法，可以为我们提供估算值。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

最后部署合约。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

交易被节点接受并返回一个交易哈希。此哈希可用于跟踪交易。下一步是确定我们合约部署的地址。每笔执行的交易都会创建一个收据。此收据包含有关交易的各种信息，例如交易包含在哪个区块中以及 EVM 使用了多少 Gas。如果交易创建了一个合约，它还将包含合约地址。我们可以使用 `eth_getTransactionReceipt` RPC 方法检索收据。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

我们的合约创建于 `0x4d03d617d700cf81935d7f797f4e2ae719648262`。如果返回空结果而不是收据，则意味着交易尚未包含在区块中。稍等片刻，检查你的共识客户端是否正在运行，然后重试。

#### 与智能合约交互 {#interacting-with-smart-contract}

在本例中，我们将使用 `eth_sendTransaction` 向合约的 `multiply` 方法发送一笔交易。

`eth_sendTransaction` 需要几个参数，特别是 `from`、`to` 和 `data`。`From` 是我们账户的公共地址，`to` 是合约地址。`data` 参数包含一个有效负载，该负载定义了必须调用哪个方法以及使用哪些参数。这就是 [ABI（应用程序二进制接口）](https://docs.soliditylang.org/en/latest/abi-spec.html) 发挥作用的地方。ABI 是一个 JSON 文件，定义了如何为 EVM 定义和编码数据。

有效负载的字节定义了调用合约中的哪个方法。这是对函数名称及其参数类型进行 Keccak 哈希计算后的前 4 个字节，并进行了十六进制编码。multiply 函数接受一个 uint，它是 uint256 的别名。这给我们留下了：

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

下一步是对参数进行编码。只有一个 uint256，假设值为 6。ABI 有一个部分指定了如何编码 uint256 类型。

`int<M>: enc(X)` 是 X 的大端序二进制补码编码，对于负数 X，在高位（左侧）填充 0xff，对于正数 X，填充零字节，使得长度为 32 字节的倍数。

这编码为 `0000000000000000000000000000000000000000000000000000000000000006`。

将函数选择器和编码后的参数结合起来，我们的数据将是 `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`。

现在可以将其发送到节点：

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

由于发送了一笔交易，因此返回了一个交易哈希。检索收据得到：

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

收据包含一个日志。此日志由 EVM 在交易执行时生成并包含在收据中。`multiply` 函数显示触发了 `Print` 事件，其值为输入乘以 7。由于 `Print` 事件的参数是 uint256，我们可以根据 ABI 规则对其进行解码，这将为我们留下预期的十进制数 42。除了数据之外，值得注意的是，主题（topics）可用于确定哪个事件创建了日志：

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

这只是对一些最常见任务的简要介绍，演示了 JSON-RPC 的直接用法。

## 相关主题 {#related-topics}

- [JSON-RPC 规范](http://www.jsonrpc.org/specification)
- [节点与客户端](/developers/docs/nodes-and-clients/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [后端 API](/developers/docs/apis/backend/)
- [执行客户端](/developers/docs/nodes-and-clients/#execution-clients)