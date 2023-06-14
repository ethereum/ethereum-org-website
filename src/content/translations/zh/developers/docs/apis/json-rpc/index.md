---
title: JSON-RPC 应用程序接口
description: 用于以太坊客户端的无状态、轻量级远程过程调用协议。
lang: zh
---

为了让软件应用程序与以太坊区块链交互（通过读取区块链数据或向网络发送交易），它必须连接到以太坊节点。

为此目的，每个[以太坊客户端](/developers/docs/nodes-and-clients/#execution-clients)都实现了一项 [JSON-RPC 规范](https://github.com/ethereum/execution-apis)，因此有一套统一的方法可供应用程序依赖，无论具体的节点或客户端实现如何。

[JSON-RPC](https://www.jsonrpc.org/specification) 是一种无状态的、轻量级远程过程调用 (RPC) 协议。 它定义了一些数据结构及其处理规则。 它与传输无关，因为这些概念可以在同一进程，通过接口、超文本传输协议或许多不同的消息传递环境中使用。 它使用 JSON (RFC 4627) 作为数据格式。

## 客户端实现 {#client-implementations}

每个客户端在执行 JSON-RPC 规范时可以使用不同的编程语言。 更多与特定编程语言相关的详细信息，请查阅[客户端文档](/developers/docs/nodes-and-clients/#execution-clients)。 我们建议查看每个客户端文档以获取最新的应用程序接口支持信息。

## 便利性库 {#convenience-libraries}

虽然您可以选择通过 JSON 应用程序接口直接与以太坊客户端交互，但是对于去中心化应用程序开发者来说，常常有更容易的选项。 许多 [JavaScript](/developers/docs/apis/javascript/#available-libraries) 和[后端应用程序接口](/developers/docs/apis/backend/#available-libraries)库已经存在，可以在 JSON-RPC 应用程序接口之上提供封装。 通过这些库，开发者可以方便地写下直观的一行函数来初始化（后端的）JSON RPC 请求并用于与以太坊进行交互。

## 共识客户端应用程序接口 {#consensus-clients}

本页主要处理以太坊执行客户端使用的 JSON-RPC 应用程序接口。 但是，共识客户端也有一个远程过程调用应用程序接口，允许用户直接从节点查询有关节点的信息、请求信标区块、信标状态和其他与共识相关的信息。 此应用程序接口记录在[信标应用程序接口网页](https://ethereum.github.io/beacon-APIs/#/)上。

内部应用程序接口还用于节点内的客户端间通信——也就是说，它使共识客户端和执行客户端能够交换数据。 它称为“引擎应用程序接口”，相关规范可在 [Github](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) 上找到。

## 执行客户端规范 {#spec}

[阅读 GitHub 上完整的 JSON-RPC 应用程序接口规范](https://github.com/ethereum/execution-apis)。

## 约定 {#conventions}

### 十六进制值编码 {#hex-encoding}

两种关键数据类型通过 JSON 传递：未格式化的字节数组和数量。 两者都使用十六进制编码传递，但对格式化有不同的要求。

#### 数量 {#quantities-encoding}

当对数量（整数、编号）进行编码时：编码为十六进制（以“0x”为前缀），最紧凑的表示方法（例外：0 应表示为“0x0”）。

以下是一些示例：

- 0x41（十进制中是 65）
- 0x400（十进制中是 1024）
- 错误：0x（后面至少有一位，0 是“0x0”）
- 错误：0x0400（不允许有前导零）
- 错误：ff（必须有前缀 0x）

### 无格式数据 {#unformatted-data-encoding}

当对无格式数据（字节数组、帐户地址、哈希、字节码数组）进行编码时：编码为十六进制，以“0x”为前缀，每字节两个十六进制数字。

以下是一些示例：

- 0x41（大小为 1，“A”）
- 0x004200（大小为 3，“\0B\0”）
- 0x（大小为 0，“”）
- 错误：0xf0f0f（位数必须是偶数）
- 错误：004200（必须以 0x 为前缀）

### 默认区块参数 {#default-block}

以下方法有额外的默认区块参数：

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

当发出作用于以太坊状态的请求时，最后一个默认区块参数决定了区块的高度。

默认区块参数可以使用以下选项：

- `HEX String` - 整数区块号
- `String "earliest"` - 表示最早/创世区块
- `String "latest"` - 最新挖出的区块
- `String "safe"` - 最新且安全的头部区块
- `String "finalized"` - 最新的最终确定的区块
- `String "pending"` - 未决状态/交易

## 示例

在此页面上，我们提供了如何通过命令行工具 [curl](https://curl.se) 使用单个 JSON_RPC 应用程序接口端点的示例。 这些单独的端点示例位于下面的 [Curl 示例](#curl-examples)部分。 在页面下方，我们还提供了一个[端到端示例](#usage-example)，用于使用 Geth 节点、JSON_RPC 应用程序接口和 curl 编译和部署智能合约。

## Curl 示例 {#curl-examples}

下面提供了通过向以太坊节点发出 [curl](https://curl.se) 请求来使用 JSON_RPC 应用程序接口的示例。 每个示例都包括对特定端点、其参数、返回类型的描述，以及应该如何使用它的工作示例。

Curl 请求可能会返回与内容类型相关的错误消息。 这是因为 `--data` 选项将内容类型设置为 `application/x-www-form-urlencoded`。 如果你的节点确实抱怨此问题，请通过在调用开始时放置 `-H "Content-Type: application/json"` 来手动设置标头。 这些示例也未包括网址/互联网协议与端口组合，该组合必须是 curl 的最后一个参数（例如 `127.0.0.1:8545`）。 包含这些附加数据的完整 curl 请求采用以下形式：

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip、State、History {#gossip-state-history}

少数核心 JSON-RPC 方法需要来自以太坊网络的数据，并且整齐地分为三个主要类别：_Gossip、State 和 History_。 使用这些部分中的链接跳转到每个方法，或使用目录浏览整个方法列表。

### Gossip 方法 {#gossip-methods}

> 这些方法用于跟踪链头。 这就是交易如何在网络中传播、如何找到进入区块的方式，以及客户端如何发现新区块的方式。

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### State 方法 {#state_methods}

> 用于报告所有已存储数据的当前状态的方法。 “状态”就像一大块共享内存，包括帐户余额、合约数据和燃料估算。

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### History 方法 {#history_methods}

> 将每个区块的历史记录追溯到创世块。 这就像一个大的仅附加文件，包括所有区块头、区块体、叔块和交易收据

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## JSON-RPC 应用程序接口方法 {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

返回当前客户端版本。

**参数**

无

**返回值**

`String` - 当前客户端版本

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Mist/v0.9.3/darwin/go1.4.1"
}
```

### web3_sha3 {#web3_sha3}

返回给定数据的 Keccak-256（*不是*标准化的 SHA3-256）。

**参数**

1. `DATA` - 要转换为 SHA3 哈希的数据

```js
params: ["0x68656c6c6f20776f726c64"]
```

**返回值**

`DATA` - 给定字符串的 SHA3 结果。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

返回当前网络 id。

**参数**

无

**返回值**

`String` - 当前网络 id。

当前网络 ID 的完整列表可在 [chainlist.org](https://chainlist.org) 获得。 一些常见的网络 ID 有： `1`：以太坊主网 `2`：Morden 测试网（现已弃用） `3`：Ropsten 测试网 `4`：Rinkeby 测试网 `5`：Goerli 测试网

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

如果客户端正在主动监听网络连接，则返回 `true`。

**参数**

无

**返回值**

`Boolean` - 监听时为 `true`，否则为 `false`。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

返回当前连接到客户端的对等点数。

**参数**

无

**返回值**

`QUANTITY` - 表示已连接的对等点数的整数。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

返回当前的以太坊协议版本。 请注意，此方法在 [Geth 中不可用](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)。

**参数**

无

**返回值**

`String` - 当前的以太坊协议版本

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

返回一个对象，其中包含有关同步状态的数据或 `false`。

**参数**

无

**返回值**

`Object|Boolean`，具有同步状态数据的对象，或 `FALSE`（当不同步时）：

- `startingBlock`：`QUANTITY` - 导入开始的区块（只有当同步到达链头后才会重置）
- `currentBlock`：`QUANTITY` - 当前区块，同 eth_blockNumber
- `highestBlock`：`QUANTITY` - 估计的最高区块

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

返回客户端 coinbase 地址。

**参数**

无

**返回值**

`DATA`，20 字节 - 当前的 coinbase 地址。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_mining {#eth_mining}

如果客户端正在积极挖掘新区块，则返回 `true`。

**参数**

无

**返回值**

`Boolean` - 如果客户端正在挖矿则返回 `true`，否则返回 `false`。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

返回节点挖矿时使用的每秒哈希数。

**参数**

无

**返回值**

`QUANTITY` - 每秒哈希数。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

返回单位燃料的当前价格（以 wei 为单位）。

**参数**

无

**返回值**

`QUANTITY` - 表示当前燃料价格（以 wei 为单位）的整数。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

返回客户端拥有的地址列表。

**参数**

无

**返回值**

`Array of DATA`，20 字节 - 客户端拥有的地址。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

返回最近区块的数量。

**参数**

无

**返回值**

`QUANTITY` - 表示客户端所在的当前区块号的整数。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

返回给定地址的帐户余额。

**参数**

1. `DATA`，20 字节 - 需要检查余额的地址。
2. `QUANTITY|TAG` - 整数区块号，或字符串`“latest”`、`“earliest”`或`“pending”`，参见[默认区块参数](/developers/docs/apis/json-rpc/#default-block)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**返回值**

`QUANTITY` - 表示当前余额的整数（以 wei 为单位）。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

从给定地址的存储位置返回值。

**参数**

1. `DATA`，20 字节 - 存储地址。
2. `QUANTITY` - 表示存储位置的整数。
3. `QUANTITY|TAG` - 整数区块号，或字符串`“latest”`、`“earliest”`或`“pending”`，参见[默认区块参数](/developers/docs/apis/json-rpc/#default-block)

**返回值**

`DATA` - 此存储位置的值。

**示例** 计算正确位置取决于要检索的存储。 考虑通过地址 `0x391694e7e0b0cce554cb130d723a9d27458f9298` 部署在 `0x295a70b2de5e3953354a6a8344e616ed314d7251` 的以下合约。

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

检索 pos0 的值很简单：

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

检索映射的元素更难。 映射中的元素位置通过以下方式计算：

```js
keccack(LeftPad32(key, 0), LeftPad32(map position, 0))
```

这意味着要检索 pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] 上的存储，我们需要通过以下方法计算位置：

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

可以使用 web3 库自带的 geth 控制台进行计算：

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

现在获取存储：

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

返回从一个地址*发送*的交易数量。

**参数**

1. `DATA`，20 字节 - 地址。
2. `QUANTITY|TAG` - 整数区块号，或字符串`“latest”`、`“earliest”`或`“pending”`，参见[默认区块参数](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**返回值**

`QUANTITY` - 表示从该地址发送的交易数量的整数。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

从与给定区块哈希匹配的区块返回区块中的交易数量。

**参数**

1. `DATA`，32 字节 - 区块的哈希

```js
params: ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"]
```

**返回值**

`QUANTITY` - 表示此区块中的交易数量的整数。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xb" // 11
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

返回与给定区块号匹配的区块中的交易数量。

**参数**

1. `QUANTITY|TAG` - 表示区块编号的整数，或字符串`“earliest”`、`“latest”`或`“pending”`，参见[默认区块参数](/developers/docs/apis/json-rpc/#default-block)。

```js
params: [
  "0xe8", // 232
]
```

**返回值**

`QUANTITY` - 表示此区块中的交易数量的整数。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa" // 10
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

从与给定区块哈希匹配的区块返回区块中的叔块数。

**参数**

1. `DATA`，32 字节 - 区块的哈希

```js
params: ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"]
```

**返回值**

`QUANTITY` - 表示此区块中的叔块数量的整数。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

从与给定区块号匹配的区块返回区块中的叔块数。

**参数**

1. `QUANTITY|TAG` - 表示区块编号的整数，或字符串“latest”、“earliest”或“pending”，参见[默认区块参数](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xe8", // 232
]
```

**返回值**

`QUANTITY` - 表示此区块中的叔块数量的整数。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getCode {#eth_getcode}

返回位于给定地址的代码。

**参数**

1. `DATA`，20 字节 - 地址
2. `QUANTITY|TAG` - 整数区块号，或字符串`“latest”`、`“earliest”`或`“pending”`，参见[默认区块参数](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
  "0x2", // 2
]
```

**返回值**

`DATA` - 来自给定地址的代码。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```

### eth_sign {#eth_sign}

Sign 方法计算以太坊特定的签名：`sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`。

通过在消息中添加前缀，可以将计算出的签名识别为以太坊特定的签名。 这可以防止恶意去中心化应用程序可以签署任意数据（例如交易）并使用签名冒充受害者的滥用行为。

注意：要签名的地址必须已解锁。

**参数**

1. `DATA`，20 字节 - 地址
2. `DATA`，N 字节 - 要签名的消息

**返回值**

`DATA`：签名

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

为交易签名，该交易随后可使用 [eth_sendRawTransaction](#eth_sendrawtransaction) 提交到网络。

**参数**

1. `Object` - 交易对象

- `from`：`DATA`，20 字节 - 发送交易的地址。
- `to`：`DATA`，20 字节 -（创建新合约时可选）将交易定向到的地址。
- `gas`：`QUANTITY` -（可选，默认值：90000）表示为交易执行提供的燃料的整数。 它将返回未使用的燃料。
- `gasPrice`：`QUANTITY` -（可选，默认值：待确定）表示用于每个付费燃料的 gasPrice 的整数，单位为 Wei。
- `value`：`QUANTITY` -（可选）表示与此交易一起发送的价值的整数，单位为 Wei。
- `data`：`DATA` - 合约的编译代码或调用的方法签名和编码参数的哈希。
- `nonce`：`QUANTITY` -（可选）表示随机数的整数。 这允许覆盖你自己的使用相同随机数的待处理交易。

**返回值**

`DATA`，签名的交易对象。

**示例**

```js
// Request
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

如果数据字段包含代码，则创建新的消息调用交易或合同创建。

**参数**

1. `Object` - 交易对象

- `from`：`DATA`，20 字节 - 发送交易的地址。
- `to`：`DATA`，20 字节 -（创建新合约时可选）将交易定向到的地址。
- `gas`：`QUANTITY` -（可选，默认值：90000）表示为交易执行提供的燃料的整数。 它将返回未使用的燃料。
- `gasPrice`：`QUANTITY` -（可选，默认值：待确定）表示用于每个付费燃料的 gasPrice 的整数。
- `value`：`QUANTITY` -（可选）表示与此交易一起发送的值的整数。
- `data`：`DATA` - 合约的编译代码或调用的方法签名和编码参数的哈希。
- `nonce`：`QUANTITY` -（可选）表示随机数的整数。 这允许覆盖你自己的使用相同随机数的待处理交易。

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**返回值**

`DATA`，32 字节 - 交易哈希，如果交易尚不可用，则为零哈希。

当你创建合约时，交易被挖掘后，使用 [eth_getTransactionReceipt](#eth_gettransactionreceipt) 获取合约地址。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

为已签名的交易创建新的消息调用交易或合约创建。

**参数**

1. `DATA`，签名的交易数据。

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**返回值**

`DATA`，32 字节 - 交易哈希，如果交易尚不可用，则为零哈希。

当你创建合约时，交易被挖掘后，使用 [eth_getTransactionReceipt](#eth_gettransactionreceipt) 获取合约地址。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

立即执行新的消息调用，而不在区块链上创建交易。

**参数**

1. `Object` - 交易调用对象

- `from`：`DATA`，20 字节 -（可选）发送交易的地址。
- `to`：`DATA`，20 字节 - 将交易定向到的地址。
- `gas`：`QUANTITY` -（可选）表示为交易执行提供的燃料的整数。 eth_call 消耗零燃料，但某些执行可能需要此参数。
- `gasPrice`：`QUANTITY` -（可选）表示用于每个付费燃料的 gasPrice 的整数。
- `value`：`QUANTITY` -（可选）表示与此交易一起发送的值的整数。
- `data`：`DATA` - （可选）方法签名和编码参数的哈希。 有关详细信息，请参阅 [Solidity 文档中的以太坊合约应用程序二进制接口](https://docs.soliditylang.org/en/latest/abi-spec.html)

2. `QUANTITY|TAG` - 整数区块号，或字符串`“latest”`、`“earliest”`或`“pending”`，参见[默认区块参数](/developers/docs/apis/json-rpc/#default-block)

**返回值**

`DATA` - 已执行合约的返回值。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

生成并返回允许交易完成所需燃料数量的估算值。 交易不会被添加到区块链中。 请注意，出于各种原因，包括以太坊虚拟机机制和节点性能，估算值可能远远超过交易实际使用的燃料数量。

**参数**

参见 [eth_call](#eth_call) 参数，但所有属性都是可选的。 如果没有指定燃料限制，geth 将使用来自待处理区块的区块燃料限制作为上限。 因此，当所需燃料数量高于待处理区块的燃料限制时，返回的估算数量可能不足以执行调用/交易。

**返回值**

`QUANTITY` - 使用的燃料数量。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

根据哈希返回关于区块的信息。

**参数**

1. `DATA`，32 字节 - 区块的哈希。
2. `Boolean` - 如果为 `true` 则返回完整的交易对象，如果为 `false` 则仅返回交易的哈希。

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**返回值**

`Object` - 区块对象，或 `null`（当没有找到区块时）：

- `number`：`QUANTITY` - 区块编号。 当它是待处理区块时，则为 `null`。
- `hash`：`DATA`，32 字节 - 区块的哈希。 当它是待处理区块时，则为 `null`。
- `parentHash`：`DATA`，32 字节 - 父区块的哈希。
- `nonce`：`DATA`，8 字节 - 已生成的工作量证明的哈希。 当它是待处理区块时，则为 `null`。
- `sha3Uncles`：`DATA`，32 字节 - 区块中的叔块数据的 SHA3。
- `logsBloom`：`DATA`，256 字节 - 区块日志的 bloom 过滤器。 当它是待处理区块时，则为 `null`。
- `transactionsRoot`：`DATA`，32 字节 - 区块交易前缀树的根。
- `stateRoot`：`DATA`，32 字节 - 区块最终状态前缀树的根。
- `receiptsRoot`：`DATA`，32 字节 - 区块收据前缀树的根。
- `miner`：`DATA`，20 字节 - 获得挖矿奖励的受益人地址。
- `difficulty`：`QUANTITY` - 表示此区块难度的整数。
- `totalDifficulty`：`QUANTITY` - 表示直到此区块为止链的总难度的整数。
- `extraData`：`DATA` - 此区块的“额外数据”字段。
- `size`：`QUANTITY` - 表示此区块大小的整数，以字节为单位。
- `gasLimit`：`QUANTITY` - 此区块允许的最大燃料值。
- `gasUsed`：`QUANTITY` - 此区块中所有交易使用的总燃料量。
- `timestamp`：`QUANTITY` - 整理区块时的 unix 时间戳。
- `transactions`：`Array` - 交易对象数组，或 32 字节交易哈希，取决于最后一个给定的参数。
- `uncles`：`Array` - 叔块哈希数组。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result
{
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

### eth_getBlockByNumber {#eth_getblockbynumber}

根据区块号返回关于区块的信息。

**参数**

1. `QUANTITY|TAG` - 表示区块编号的整数，或字符串`“earliest”`、`“latest”`或`“pending”`，参见[默认区块参数](/developers/docs/apis/json-rpc/#default-block)。
2. `Boolean` - 如果为 `true` 则返回完整的交易对象，如果为 `false` 则仅返回交易的哈希。

```js
params: [
  "0x1b4", // 436
  true,
]
```

**返回值** 参见 [eth_getBlockByHash](#eth_getblockbyhash)

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

结果参见 [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

根据交易哈希返回关于所请求交易的信息。

**参数**

1. `DATA`，32 字节- 交易的哈希

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**返回值**

`Object` - 交易对象，如果没有找到交易，则为 `null`：

- `blockHash`：`DATA`，32 字节 - 此交易所在区块的哈希。 当它是待处理区块时，则为 `null`。
- `blockNumber`：`QUANTITY` - 此交易所在的区块号。 当它是待处理区块时，则为 `null`。
- `from`：`DATA`，20 字节 - 发送者的地址。
- `gas`：`QUANTITY` - 发送者提供的燃料。
- `gasPrice`：`QUANTITY` - 发送者提供的燃料价格，以 Wei 为单位。
- `hash`：`DATA`，32 字节 - 交易的哈希。
- `input`：`DATA` - 与交易一起发送的数据。
- `nonce`：`QUANTITY` - 发送者在此交易之前进行的交易数量。
- `to`：`DATA`，20 字节 - 接收者的地址。 当它是合约创建交易时，则为 `null`。
- `transactionIndex`：`QUANTITY` - 表示区块中的交易索引位置的整数。 当它是待处理区块时，则为 `null`。
- `value`：`QUANTITY` - 传输的价值，以 Wei 为单位。
- `v`：`QUANTITY` - ECDSA 恢复 ID
- `r`：`QUANTITY` - ECDSA 签名 r
- `s`：`QUANTITY` - ECDSA 签名 s

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
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

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

根据区块哈希和交易索引位置返回关于交易的信息。

**参数**

1. `DATA`，32 字节 - 区块的哈希。
2. `QUANTITY` - 表示交易索引位置的整数。

```js
params: [
  "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
  "0x0", // 0
]
```

**返回值** 参见 [eth_getTransactionByHash](#eth_gettransactionbyhash)

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b", "0x0"],"id":1}'
```

结果参见 [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

根据区块编号和交易索引位置返回关于交易的信息。

**参数**

1. `QUANTITY|TAG` - 区块编号，或字符串`“earliest”`、`“latest”`或`“pending”`，参见[默认区块参数](/developers/docs/apis/json-rpc/#default-block)。
2. `QUANTITY` - 交易索引位置。

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**返回值** 参见 [eth_getTransactionByHash](#eth_gettransactionbyhash)

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

结果参见 [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

根据交易哈希返回交易的收据。

**注意**：收据不可用于待处理的交易。

**参数**

1. `DATA`，32 字节- 交易的哈希

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**返回值** `Object` - 交易收据对象，如果没有找到收据，则为 `null`：

- `transactionHash`：`DATA`，32 字节- 交易的哈希。
- `transactionIndex`：`QUANTITY` - 表示区块中的交易索引位置的整数。
- `blockHash`：`DATA`，32 字节 - 此交易所在区块的哈希。
- `blockNumber`：`QUANTITY` - 此交易所在的区块号。
- `from`：`DATA`，20 字节 - 发送者的地址。
- `to`：`DATA`，20 字节 - 接收者的地址。 当它是合约创建交易时，则为 null。
- `cumulativeGasUsed` : `QUANTITY` - 当在区块中执行此交易时使用的燃料总量。
- `effectiveGasPrice` : `QUANTITY` - 为每单位燃料支付的基础费用和小费的总和。
- `gasUsed`: `QUANTITY` - 仅此特定交易使用的燃料数量。
- `contractAddress`: `DATA`，20 字节 - 如果交易是创建合约，则为创建的合约地址，否则为 `null`。
- `logs`: `Array` - 此交易生成的日志对象数组。
- `logsBloom`: `DATA`，256 字节 - 轻客户端用于快速检索相关日志的布隆过滤器。
- `type`: `DATA` - 表示交易类型的整数，`0x00` 表示传统交易，`0x01` 表示访问列表类型，`0x02` 表示动态费用。 它还返回*以下两者之一*：
- `root` : `DATA`，32 字节的交易后状态根（拜占庭之前）
- `status`: `QUANTITY`，`1`（成功）或 `0`（失败）

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

根据哈希和叔块索引位置返回关于区块的叔块的信息。

**参数**

1. `DATA`，32 字节 - 区块的哈希。
2. `QUANTITY` - 叔块的索引位置。

```js
params: [
  "0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b",
  "0x0", // 0
]
```

**返回值** 参见 [eth_getBlockByHash](#eth_getblockbyhash)

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b", "0x0"],"id":1}'
```

结果参见 [eth_getBlockByHash](#eth_getblockbyhash)

**注意**：叔区不包含个人交易。

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

根据编号和叔块索引位置返回关于区块的叔块的信息。

**参数**

1. `QUANTITY|TAG` - 区块编号，或字符串`“earliest”`、`“latest”`或`“pending”`，参见[默认区块参数](/developers/docs/apis/json-rpc/#default-block)。
2. `QUANTITY` - 叔块的索引位置。

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**返回值** 参见 [eth_getBlockByHash](#eth_getblockbyhash)

**注意**：叔区不包含个人交易。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

结果参见 [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getCompilers {#eth_getcompilers}

返回客户端中的可用编译器列表。

**参数** 无

**返回值** `Array` - 可用编译器的数组。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCompilers","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["solidity", "lll", "serpent"]
}
```

### eth_compileSolidity {#eth_compile_solidity}

返回已编译的 solidity 代码。

**参数**

1. `String` - 源代码。

```js
params: [
  "contract test { function multiply(uint a) returns(uint d) {   return a * 7;   } }",
]
```

**返回值** `DATA` - 已编译的源代码。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_compileSolidity","params":["contract test { function multiply(uint a) returns(uint d) {   return a * 7;   } }"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
      "code": "0x605880600c6000396000f3006000357c010000000000000000000000000000000000000000000000000000000090048063c6888fa114602e57005b603d6004803590602001506047565b8060005260206000f35b60006007820290506053565b91905056",
      "info": {
        "source": "contract test {\n   function multiply(uint a) constant returns(uint d) {\n       return a * 7;\n   }\n}\n",
        "language": "Solidity",
        "languageVersion": "0",
        "compilerVersion": "0.9.19",
        "abiDefinition": [
          {
            "constant": true,
            "inputs": [
              {
                "name": "a",
                "type": "uint256"
              }
            ],
            "name": "multiply",
            "outputs": [
              {
                "name": "d",
                "type": "uint256"
              }
            ],
            "type": "function"
          }
        ],
        "userDoc": {
          "methods": {}
        },
        "developerDoc": {
          "methods": {}
        }
      }
}
```

### eth_compileLLL {#eth_compileLLL}

返回已编译的 LLL 代码。

**参数**

1. `String` - 源代码。

```js
params: ["(returnlll (suicide (caller)))"]
```

**返回值** `DATA` - 已编译的源代码。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_compileLLL","params":["(returnlll (suicide (caller)))"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x603880600c6000396000f3006001600060e060020a600035048063c6888fa114601857005b6021600435602b565b8060005260206000f35b600081600702905091905056" // the compiled source code
}
```

### eth_compileSerpent {#eth_compileserpent}

返回已编译的 serpent 代码。

**参数**

1. `String` - 源代码。

```js
params: ["/* some serpent */"]
```

**返回值** `DATA` - 已编译的源代码。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_compileSerpent","params":["/* some serpent */"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x603880600c6000396000f3006001600060e060020a600035048063c6888fa114601857005b6021600435602b565b8060005260206000f35b600081600702905091905056" // the compiled source code
}
```

### eth_newFilter {#eth_newfilter}

基于过滤器选项创建一个过滤器对象，以在状态更改（日志）时发出通知。 要检查状态是否已更改，请调用 [eth_getFilterChanges](#eth_getfilterchanges)。

**关于指定主题过滤器的说明：** 主题是顺序相关的。 日志中包含主题 [A, B] 的交易将被以下主题过滤器匹配：

- `[]`“任意值”
- `[A]`“第一个位置为 A（之后的位置为任意值）”
- `[null, B]`“第一个位置为任意值，且第二个位置为 B（之后的位置为任意值）”
- `[A, B]`“第一个位置为 A，且第二个位置为 B（之后的位置为任意值）”
- `[[A, B], [A, B]]`“第一个位置为 (A OR B)，且第二个位置为 (A OR B)（之后的位置为任意值）”
- **参数**

1. `Object` - 过滤器选项：

- `fromBlock`：`QUANTITY|TAG` -（可选，默认值：`“latest”`）整数区块号，`“latest”`（对于最后开采的区块），或`“pending”`、`“earliest”`（对于尚未开采的交易）。
- `toBlock`：`QUANTITY|TAG` -（可选，默认值：`“latest”`）整数区块号，`“latest”`（对于最后开采的区块），或`“pending”`、`“earliest”`（对于尚未开采的交易）。
- `address`：`DATA|Array`，20 字节 -（可选）日志起源的合同地址或地址列表。
- `topics`：`Array of DATA` -（可选）32 字节 `DATA` 主题数组。 主题是顺序相关的。 每个主题也可以是带有“或”选项的 DATA 数组。

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

**返回值** `QUANTITY` - 过滤器 id。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

在节点中创建一个过滤器，以在新区块到达时通知。 要检查状态是否已更改，请调用 [eth_getFilterChanges](#eth_getfilterchanges)。

**参数** 无

**返回值** `QUANTITY` - 过滤器 ID。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

在节点中创建一个过滤器，以在新的待处理交易到达时发出通知。 要检查状态是否已更改，请调用 [eth_getFilterChanges](#eth_getfilterchanges)。

**参数** 无

**返回值** `QUANTITY` - 过滤器 ID。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

卸载具有给定 ID 的过滤器。 当不再需要监控时应始终调用。 此外，过滤器在一段时间内未使用 [eth_getFilterChanges](#eth_getfilterchanges) 请求时便会超时。

**参数**

1. `QUANTITY` - 过滤器 ID。

```js
params: [
  "0xb", // 11
]
```

**返回值** `Boolean` - 如果成功卸载过滤器，则为 `true`，否则为 `false`。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

过滤器的轮询方法，它会返回自上次轮询以来发生的日志数组。

**参数**

1. `QUANTITY` - 过滤器 ID。

```js
params: [
  "0x16", // 22
]
```

**返回值** `Array` - 日志对象数组，如果自上次轮询以来没有任何变化，则为空数组。

- 对于使用 `eth_newBlockFilter` 创建的过滤器，返回值是区块哈希（`DATA`，32 字节），例如 `["0x3454645634534..."]`。
- 对于使用 `eth_newPendingTransactionFilter` 创建的过滤器，返回值是交易哈希（`DATA`，32 字节），例如 `["0x6345343454645..."]`。
- 对于使用 `eth_newFilter` 创建的过滤器，日志是具有以下参数的对象：
  - `removed`：`TAG` - 当日志被删除时，由于链重组，为 `true`。 当它是有效日志时，则为 `false`。
  - `logIndex`：`QUANTITY` - 表示日志在区块中的索引位置的整数。 当它是待处理日志时，则为 `null`。
  - `transactionIndex`：`QUANTITY` - 表示从中创建日志的交易索引位置的整数。 当它是待处理日志时，则为 `null`。
  - `transactionHash`：`DATA`，32 字节 - 从中创建此日志的交易的哈希。 当它是待处理日志时，则为 `null`。
  - `blockHash`: `DATA`，32 字节 - 此日志所在区块的哈希。 当它是待处理区块时，则为 `null`。 当它是待处理日志时，则为 `null`。
  - `blockNumber`：`QUANTITY` - 该日志所在的区块编号。 当它是待处理区块时，则为 `null`。 当它是待处理日志时，则为 `null`。
  - `address`：`DATA`，20 字节 - 此日志的来源地址。
  - `data`：`DATA` - 包含日志的一个或多个 32 字节非索引参数。
  - `topics`：`Array of DATA` - 0 到 4 个 32 字节 `DATA` 索引日志参数的数组。 （在 _solidity_ 中：第一个主题是事件签名的*哈希*（例如 `Deposit (address,bytes32,uint256)`），除非您使用 `anonymous` 限定符声明了该事件）。
- **示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result
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

### eth_getFilterLogs {#eth_getfilterlogs}

返回与给定 id 的过滤器匹配的所有日志的数组。

**参数**

1. `QUANTITY` - 过滤器 ID。

```js
params: [
  "0x16", // 22
]
```

**返回值** 参见 [eth_getFilterChanges](#eth_getfilterchanges)

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

结果参见 [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

返回与给定过滤器对象匹配的所有日志的数组。

**参数**

1. `Object` - 过滤器选项：

- `fromBlock`：`QUANTITY|TAG` -（可选，默认值：`“latest”`）整数区块号，`“latest”`（对于最后开采的区块），或`“pending”`、`“earliest”`（对于尚未开采的交易）。
- `toBlock`：`QUANTITY|TAG` -（可选，默认值：`“latest”`）整数区块号，`“latest”`（对于最后开采的区块），或`“pending”`、`“earliest”`（对于尚未开采的交易）。
- `address`：`DATA|Array`，20 字节 -（可选）日志起源的合同地址或地址列表。
- `topics`：`Array of DATA` -（可选）32 字节 `DATA` 主题数组。 主题是顺序相关的。 每个主题也可以是带有“或”选项的 DATA 数组。
- `blockhash`：`DATA`，32 字节 -（可选，**future**）添加 EIP-234 后，`blockHash` 将是一个新的过滤器选项，它会将返回的日志限制为具有 32 字节哈希 `blockHash` 的单一区块。 使用 `blockHash` 相当于 `fromBlock` = `toBlock` = 具有哈希`blockHash` 的区块号。 如果 `blockHash` 出现在筛选条件中，则 `fromBlock` 和 `toBlock` 都不允许。

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**返回值** 参见 [eth_getFilterChanges](#eth_getfilterchanges)

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

结果参见 [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getWork {#eth_getwork}

返回当前区块的哈希、种子哈希和要满足的边界条件（“目标”）。

**参数** 无

**返回** `Array` - 具有以下属性的数组：

1. `DATA`，32 字符 - 当前区块头 pow-hash
2. `DATA`，32 字节 - 用于有向无环图的种子哈希。
3. `DATA`，32 字节 - 边界条件（“目标”），2^256 / 难度。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getWork","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "0x5EED00000000000000000000000000005EED0000000000000000000000000000",
      "0xd1ff1c01710000000000000000000000d1ff1c01710000000000000000000000"
    ]
}
```

### eth_submitWork {#eth_submitwork}

用于提交工作量证明解。

**参数**

1. `DATA`，8 字节 - 找到的随机数（64 位）
2. `DATA`，32 字节 - 区块头的 pow-hash（256 位）
3. `DATA`，32 字节 - 混合摘要（256 位）

```js
params: [
  "0x0000000000000001",
  "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000",
]
```

**返回值** `Boolean` - 如果提供的解有效，则返回 `true`，否则返回 `false`。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0", "method":"eth_submitWork", "params":["0x0000000000000001", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "0xD1GE5700000000000000000000000000D1GE5700000000000000000000000000"],"id":73}'
// Result
{
  "id":73,
  "jsonrpc":"2.0",
  "result": true
}
```

### eth_submitHashrate {#eth_submithashrate}

用于提交挖矿哈希率。

**参数**

1. `Hashrate`，哈希率的十六进制字符串表示（32 字节）
2. `ID`，字符串 - 一个随机的十六进制（32 字节）ID，用于标识客户端

```js
params: [
  "0x0000000000000000000000000000000000000000000000000000000000500000",
  "0x59daa26581d0acd1fce254fb7e85952f4c09d0915afd33d3886cd914bc7d283c",
]
```

**返回值** `Boolean` - 如果提交成功则返回 `true`，否则返回 `false`。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0", "method":"eth_submitHashrate", "params":["0x0000000000000000000000000000000000000000000000000000000000500000", "0x59daa26581d0acd1fce254fb7e85952f4c09d0915afd33d3886cd914bc7d283c"],"id":73}'
// Result
{
  "id":73,
  "jsonrpc":"2.0",
  "result": true
}
```

### db_putString (deprecated) {#db_putstring}

在本地数据库中存储一个字符串。

**注意**：此方法已弃用。

**参数**

1. `String` - 数据库名称。
2. `String` - 键名。
3. `String` - 要存储的字符串。

```js
params: ["testDB", "myKey", "myString"]
```

**返回值** `Boolean` - 如果值已存储，则返回 `true`，否则返回 `false`。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"db_putString","params":["testDB","myKey","myString"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

### db_getString (deprecated) {#db_getstring}

从本地数据库返回字符串。 **注意**：此方法已弃用。

**参数**

1. `String` - 数据库名称。
2. `String` - 键名。

```js
params: ["testDB", "myKey"]
```

**返回值** `String` - 先前存储的字符串。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"db_getString","params":["testDB","myKey"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": "myString"
}
```

### db_putHex (deprecated) {#db_puthex}

在本地数据库中存储二进制数据。 **注意**：此方法已弃用。

**参数**

1. `String` - 数据库名称。
2. `String` - 键名。
3. `DATA` - 要存储的数据。

```js
params: ["testDB", "myKey", "0x68656c6c6f20776f726c64"]
```

**返回值** `Boolean` - 如果值已存储，则返回 `true`，否则返回 `false`。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"db_putHex","params":["testDB","myKey","0x68656c6c6f20776f726c64"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

### db_getHex (deprecated) {#db_gethex}

从本地数据库返回二进制数据。 **注意**：此方法已弃用。

**参数**

1. `String` - 数据库名称。
2. `String` - 键名。

```js
params: ["testDB", "myKey"]
```

**返回值** `DATA` - 先前存储的数据。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"db_getHex","params":["testDB","myKey"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": "0x68656c6c6f20776f726c64"
}
```

### shh_version (deprecated) {#shh_post}

返回当前的 whisper 协议版本。

**注意**：此方法已弃用。

**参数** 无

**返回值** `String` - 当前的 whisper 协议版本

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "2"
}
```

### shh_post (deprecated) {#shh_version}

发送 whisper 消息。

**注意**：此方法已弃用。

**参数**

1. `Object` - whisper post 对象：

- `from`：`DATA`，60 字节 -（可选）发送者的身份。
- `to`：`DATA`，60 字节 -（可选）接收者的身份。 当存在消息时，whisper 将加密消息，以便只有接收者可以将其解密。
- `topics`：`Array of DATA` - `DATA` 主题数组，供接收者识别消息。
- `payload`：`DATA` - 消息的载荷。
- `priority`：`QUANTITY` - 表示 ... (?) 范围内的优先级的整数。
- `ttl`：`QUANTITY` - 表示生存时间的整数，以秒为单位。

```js
params: [
  {
    from: "0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1",
    to: "0x3e245533f97284d442460f2998cd41858798ddf04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a0d4d661997d3940272b717b1",
    topics: [
      "0x776869737065722d636861742d636c69656e74",
      "0x4d5a695276454c39425154466b61693532",
    ],
    payload: "0x7b2274797065223a226d6",
    priority: "0x64",
    ttl: "0x64",
  },
]
```

**返回值** `Boolean` - 如果消息已发送，则返回 `true`，否则返回 `false`。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_post","params":[{"from":"0xc931d93e97ab07fe42d923478ba2465f2..","topics": ["0x68656c6c6f20776f726c64"],"payload":"0x68656c6c6f20776f726c64","ttl":0x64,"priority":0x64}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

### shh_newIdentity (deprecated){#shh_newidentity}

在客户端中创建新的 whisper 身份。

**注意**：此方法已弃用。

**参数** 无

**返回值** `DATA`，60 字节 - 新身份的地址。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_newIdentity","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xc931d93e97ab07fe42d923478ba2465f283f440fd6cabea4dd7a2c807108f651b7135d1d6ca9007d5b68aa497e4619ac10aa3b27726e1863c1fd9b570d99bbaf"
}
```

### shh_hasIdentity (deprecated){#shh_hasidentity}

检查客户端是否持有给定身份的私钥。

**注意**：此方法已弃用。

**参数**

1. `DATA`，60 字节 - 要检查的身份地址。

```js
params: [
  "0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1",
]
```

**返回值** `Boolean` - 如果客户端持有该身份的私钥，则返回 `true`，否则返回 `false`。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_hasIdentity","params":["0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### shh_newGroup (deprecated){#shh_newgroup}

**注意**：此方法已弃用。

**参数** 无

**返回值** `DATA`，60 字节 - 新组的地址。 (?)

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_newGroup","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xc65f283f440fd6cabea4dd7a2c807108f651b7135d1d6ca90931d93e97ab07fe42d923478ba2407d5b68aa497e4619ac10aa3b27726e1863c1fd9b570d99bbaf"
}
```

### shh_addToGroup (deprecated){#shh_addtogroup}

**注意**：此方法已弃用。

**参数**

1. `DATA`，60 字节 - 将要添加到组 (?) 的身份地址。

```js
params: [
  "0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1",
]
```

**返回值** `Boolean` - 如果身份已成功添加到组，则返回 `true`，否则返回 `false` (?)。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_addToGroup","params":["0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### shh_newFilter (deprecated){#shh_newfilter}

创建过滤器以通知客户端何时收到与过滤器选项匹配的 whisper 消息。 **注意**：此方法已弃用。

**参数**

1. `Object` - 过滤器选项：

- `to`：`DATA`，60 字节 -（可选）接收者的身份。 _如果客户端持有此身份的私钥，它将尝试解密任何传入的消息。_
- `topics`: `Array of DATA` - `DATA` 主题的数组，该主题应与传入消息的主题相匹配。 You can use the following combinations:
  - `[A, B] = A && B`
  - `[A, [B, C]] = A && (B || C)`
  - `[null, A, B] = ANYTHING && A && B` `null` 用作通配符
  -

```js
params: [
  {
    topics: ["0x12341234bf4b564f"],
    to: "0x04f96a5e25610293e42a73908e93ccc8c4d4dc0edcfa9fa872f50cb214e08ebf61a03e245533f97284d442460f2998cd41858798ddfd4d661997d3940272b717b1",
  },
]
```

**返回值** `QUANTITY` - 新创建的过滤器。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_newFilter","params":[{"topics": ['0x12341234bf4b564f'],"to": "0x2341234bf4b2341234bf4b564f..."}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": "0x7" // 7
}
```

### shh_uninstallFilter (deprecated){#shh_uninstallfilter}

卸载具有给定 id 的过滤器。 当不再需要监控时应始终调用。 此外，过滤器在一段时间内未使用 [shh_getFilterChanges](#shh_getfilterchanges) 请求时会超时。 **注意**：此方法已弃用。

**参数**

1. `QUANTITY` - 过滤器 ID。

```js
params: [
  "0x7", // 7
]
```

**返回值** `Boolean` - 如果成功卸载过滤器，则为 `true`，否则为 `false`。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_uninstallFilter","params":["0x7"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": true
}
```

### shh_getFilterChanges (deprecated){#shh_getfilterchanges}

Whisper 过滤器的轮询方法。 返回自上次调用此方法以来的新消息。 **注意**：调用 [shh_getMessages](#shh_getmessages) 方法将重置此方法的缓冲区，这样您就不会收到重复的消息。 **注意**：此方法已弃用。

**参数**

1. `QUANTITY` - 过滤器 ID。

```js
params: [
  "0x7", // 7
]
```

**返回值** `Array` - 自上次轮询以来收到的消息数组：

- `hash`：`DATA`，32 字节(?) - 消息的哈希。
- `from`：`DATA`，60 字节 - 如果指定了发送者，则为消息的发送者。
- `to`：`DATA`，60 字节- 如果指定了接收者，则为消息的接收者。
- `expiry`：`QUANTITY` - 表示此消息应到期的时间（以秒为单位）的整数 (?)。
- `ttl`：`QUANTITY` - 表示消息应在系统中浮动的时间（以秒为单位）的整数 (?)。
- `sent`：`QUANTITY` - 表示发送消息时的 unix 时间戳的整数。
- `topics`：`Array of DATA` - 消息中包含的 `DATA` 主题数组。
- `payload`：`DATA` - 消息的载荷。
- `workProved`：`QUANTITY` - 表示发送此消息之前所需工作的整数 (?)。

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_getFilterChanges","params":["0x7"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "hash": "0x33eb2da77bf3527e28f8bf493650b1879b08c4f2a362beae4ba2f71bafcd91f9",
    "from": "0x3ec052fc33..",
    "to": "0x87gdf76g8d7fgdfg...",
    "expiry": "0x54caa50a", // 1422566666
    "sent": "0x54ca9ea2", // 1422565026
    "ttl": "0x64", // 100
    "topics": ["0x6578616d"],
    "payload": "0x7b2274797065223a226d657373616765222c2263686...",
    "workProved": "0x0"
    }]
}
```

### shh_getMessages (deprecated) {#shh_getmessages}

获取与过滤器匹配的所有消息。 与 `shh_getFilterChanges` 不同，它返回所有消息。

**注意**：此方法已弃用。

**参数**

1. `QUANTITY` - 过滤器 ID。

```js
params: [
  "0x7", // 7
]
```

**返回值** 参见 [shh_getFilterChanges](#shh_getfilterchanges)

**示例**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"shh_getMessages","params":["0x7"
],"id":73}'
```

结果参见 [shh_getFilterChanges](#shh_getfilterchanges)

## 使用示例 {#usage-example}

### 使用 JSON_RPC 部署合约 {#deploying-contract}

本节包含如何仅使用远程过程调用接口部署合约的演示。 部署合约的其他途径可以消除这种复杂性 — 例如，使用在远程过程调用接口之上构建的库，如 [web3.js](https://web3js.readthedocs.io/) 和 [web3.py](https://github.com/ethereum/web3.py)。 这些抽象通常更容易理解且不易出错，但了解幕后发生的操作仍然很有帮助。

以下是一个名为 `Multiply7` 的简单智能合约，它将使用 JSON-RPC 接口部署到以太坊节点。 本教程假设读者已经在运行 Geth 节点。 [此处](/developers/docs/nodes-and-clients/run-a-node)提供了有关节点和客户端的更多信息。 请参阅单独的[客户端](/developers/docs/nodes-and-clients/)文档，了解如何为非 Geth 客户端启动超文本传输协议 JSON-RPC。 大多数客户端默认在 `localhost:8545` 上提供服务。

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

首先要做的是确保启用了超文本传输协议远程过程调用接口。 这意味着我们在启动时为 Geth 提供 `--http` 标志。 在此示例中，我们使用私有开发链上的 Geth 节点。 使用这种方法，我们在真实网络上不需要以太币。

```bash
geth --http --dev console 2>>geth.log
```

这将在 `http://localhost:8545` 上启动超文本传输协议远程过程调用接口。

我们可以通过使用 [curl](https://curl.se) 检索 Coinbase 地址和余额来验证接口是否正在运行。 请注意，这些示例中的数据在您的本地节点上会有所不同。 如果你想尝试这些命令，请将第二个 curl 请求中的请求参数替换为第一个 curl 请求返回的结果。

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_coinbase", "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

因为数字是十六进制编码的，所以余额以十六进制字符串返回（以 wei 为单位）。 如果我们想要获得数字形式的以太币余额，我们可以使用 Geth 控制台中的 web3。

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

现在我们的私有开发链上有一些以太币，我们可以部署合约了。 第一步是将 Multiply7 合约编译为可以发送到以太坊虚拟机的字节码。 要安装 Solidity 编译器 solc，请遵循 [Solidity 文档](https://docs.soliditylang.org/en/latest/installing-solidity.html)。 （您可能希望使用较旧的 `solc` 版本来匹配[在我们的示例中使用的编译器版本](https://github.com/ethereum/solidity/releases/tag/v0.4.20)）。

下一步是将 Multiply7 合约编译为可以发送到以太坊虚拟机的字节码。

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

现在我们有了编译后的代码，我们需要确定部署它需要花费多少燃料。 远程过程调用接口有一个 `eth_estimateGas` 方法，可以给我们一个估计值。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

最后部署合约。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

交易被节点接受并返回交易哈希。 此哈希可用于跟踪交易。 下一步是确定我们的合约部署的地址。 每个已执行的交易都将创建一个收据。 此收据包含有关交易的各种信息，例如交易包含在哪个区块中以及以太坊虚拟机使用了多少燃料。 如果交易创建了合约，它还将包含合约地址。 我们可以使用 `eth_getTransactionReceipt` 远程过程调用方法检索收据。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

我们的合约是在 `0x4d03d617d700cf81935d7f797f4e2ae719648262` 上创建的。 空结果而不是收据意味着交易 尚未包含在区块中。 稍等片刻，检查您的矿工是否正在运行，然后重试。

#### 与智能合约交互 {#interacting-with-smart-contract}

在本例中，我们将使用 `eth_sendTransaction` 将交易发送到合约的 `multiply` 方法。

`eth_sendTransaction` 需要几个参数，具体而言，`from`、`to` 和 `data`。 `From` 是我们帐户的公共地址，`to` 是合约地址。 `data` 参数包含有效载荷，其定义了必须调用哪个方法以及使用哪些参数。 这就是 [ABI（应用程序二进制接口）](https://docs.soliditylang.org/en/latest/abi-spec.html)发挥作用的地方。 应用程序二进制接口是一个 JSON 文件，定义了如何为以太坊虚拟机定义和编码数据。

有效载荷的字节定义了调用合约中的哪个方法。 这是 Keccak 哈希的前 4 个字节以及函数名称及其参数类型（十六进制编码）。 Multiply 函数接受一个 uint，它是 uint256 的别名。 这给我们留下了：

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

下一步是对参数进行编码。 只有一个 uint256，比如值 6。 应用程序二进制接口有一个部分指定了如何编码 uint256 类型。

`int<M>: enc(X)` 是 X 的高位优先二进制补码编码，对于负 X 在高阶（左侧）填充 0xff，对于正 X 填充零 > 字节，使得长度为 32 字节的倍数。

此编码为 `0000000000000000000000000000000000000000000000000000000000000006`。

结合函数选择器和编码参数，我们的数据将是 `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`。

现在可以将其发送到节点：

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

由于发送了交易，因此返回了交易哈希。 检索收据给出：

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

收据中包含一个日志。 此日志由以太坊虚拟机在交易执行时生成并包含在收据中。 `multiply` 函数显示 `Print` 事件在输入乘以 7 时触发。 由于 `Print` 事件的参数是 uint256，我们可以根据应用程序二进制接口规则对其进行解码，这将为我们得出预期的十进制数 42。 除了数据之外，值得注意的是，主题可用于确定哪个事件创建了日志：

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

这只是对一些最常见任务的简要介绍，展示了 JSON-RPC 的直接用法。

## 相关主题 {#related-topics}

- [JSON-RPC 规范](http://www.jsonrpc.org/specification)
- [节点和客户端](/developers/docs/nodes-and-clients/)
- [JavaScript 应用程序接口](/developers/docs/apis/javascript/)
- [后端应用程序接口](/developers/docs/apis/backend/)
- [执行客户端](/developers/docs/nodes-and-clients/#execution-clients)
