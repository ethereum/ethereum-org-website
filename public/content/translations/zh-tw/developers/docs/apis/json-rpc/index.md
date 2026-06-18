---
title: JSON-RPC API
description: 適用於以太坊客戶端的無狀態、輕量級遠端程序呼叫 (RPC) 協定。
lang: zh-tw
---

為了讓軟體應用程式能夠與 [以太坊](/) 區塊鏈互動（無論是讀取區塊鏈資料還是發送交易到網路），它必須連接到一個以太坊節點。

為此，每個 [以太坊客戶端](/developers/docs/nodes-and-clients/#execution-clients) 都實作了 [JSON-RPC 規範](https://github.com/ethereum/execution-apis)，因此無論具體的節點或客戶端實作為何，應用程式都可以依賴一組統一的方法。

[JSON-RPC](https://www.jsonrpc.org/specification) 是一種無狀態、輕量級的遠端程序呼叫 (RPC) 協定。它定義了幾種資料結構及其處理規則。它與傳輸方式無關，因為這些概念可以用於同一個行程內、透過 Socket、透過 HTTP，或在許多不同的訊息傳遞環境中。它使用 JSON (RFC 4627) 作為資料格式。

## 客戶端實作 {#client-implementations}

以太坊客戶端在實作 JSON-RPC 規範時，各自可能會使用不同的程式語言。請參閱個別的[客戶端文件](/developers/docs/nodes-and-clients/#execution-clients)，以了解關於特定程式語言的更多詳細資訊。我們建議查看各個客戶端的文件，以獲取最新的 API 支援資訊。

## 便利函式庫 {#convenience-libraries}

雖然您可以選擇透過 JSON-RPC API 直接與以太坊客戶端互動，但對於去中心化應用程式 (dapp) 開發者來說，通常有更簡單的選擇。有許多 [JavaScript](/developers/docs/apis/javascript/#available-libraries) 和[後端 API](/developers/docs/apis/backend/#available-libraries) 函式庫在 JSON-RPC API 之上提供封裝。藉由這些函式庫，開發者可以使用他們選擇的程式語言編寫直觀的單行方法，從而在底層初始化與以太坊互動的 JSON-RPC 請求。

## 共識客戶端 API {#consensus-clients}

本頁面主要探討以太坊執行客戶端所使用的 JSON-RPC API。然而，共識客戶端也有一個 RPC API，允許使用者直接從節點查詢有關節點的資訊、請求信標區塊、信標狀態以及其他與共識相關的資訊。此 API 記錄在 [Beacon API 網頁](https://ethereum.github.io/beacon-APIs/#/)上。

節點內部的客戶端之間通訊也使用了一個內部 API——也就是說，它使共識客戶端和執行客戶端能夠交換資料。這被稱為「引擎 API (Engine API)」，其規格可在 [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) 上取得。

## 執行客戶端規範 {#spec}

[在 GitHub 上閱讀完整的 JSON-RPC API 規範](https://github.com/ethereum/execution-apis)。此 API 記錄在[執行 API 網頁](https://ethereum.github.io/execution-apis/)上，並包含一個檢查器 (Inspector) 以供試用所有可用的方法。

## 慣例 {#conventions}

### 十六進位值編碼 {#hex-encoding}

有兩種關鍵資料類型透過 JSON 傳遞：未格式化的位元組陣列和數量。兩者都以十六進位編碼傳遞，但格式化要求不同。

#### 數量 {#quantities-encoding}

編碼數量（整數、數字）時：編碼為十六進位，加上「0x」前綴，使用最精簡的表示法（小例外：零應表示為「0x0」）。

以下是一些範例：

- 0x41（十進位的 65）
- 0x400（十進位的 1024）
- 錯誤：0x（應始終至少有一位數 - 零為「0x0」）
- 錯誤：0x0400（不允許前導零）
- 錯誤：ff（必須加上 0x 前綴）

### 未格式化資料 {#unformatted-data-encoding}

編碼未格式化資料（位元組陣列、帳戶地址、雜湊、位元組碼陣列）時：編碼為十六進位，加上「0x」前綴，每個位元組兩個十六進位數字。

以下是一些範例：

- 0x41（大小為 1，「A」）
- 0x004200（大小為 3，「0B0」）
- 0x（大小為 0，「」）
- 錯誤：0xf0f0f（必須是偶數位數）
- 錯誤：004200（必須加上 0x 前綴）

### 區塊參數 {#block-parameter}

以下方法具有區塊參數：

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

當發出查詢以太坊狀態的請求時，提供的區塊參數決定了區塊的高度。

區塊參數有以下選項：

- `HEX String` - 整數區塊號碼
- `String "earliest"` 代表最早／創世區塊
- `String "latest"` - 代表最新提議的區塊
- `String "safe"` - 代表最新安全的頭部區塊
- `String "finalized"` - 代表最新已定案的區塊
- `String "pending"` - 代表待處理的狀態／交易

## 範例 {#examples}

在此頁面中，我們提供了如何使用命令列工具 [curl](https://curl.se) 來使用個別 JSON_RPC API 端點的範例。這些個別端點的範例可以在下方的 [Curl 範例](#curl-examples) 章節中找到。在頁面更下方，我們還提供了一個[端到端範例](#usage-example)，示範如何使用 Geth 節點、JSON_RPC API 以及 curl 來編譯與部署智能合約。

## Curl 範例 {#curl-examples}

以下提供透過向以太坊節點發送 [curl](https://curl.se) 請求來使用 JSON_RPC API 的範例。每個範例都包含特定端點的描述、其參數、回傳類型，以及如何使用的實際操作範例。

curl 請求可能會回傳與內容類型相關的錯誤訊息。這是因為 `--data` 選項會將內容類型設定為 `application/x-www-form-urlencoded`。如果您的節點出現此錯誤，請在呼叫的開頭加上 `-H "Content-Type: application/json"` 來手動設定標頭。這些範例也沒有包含 URL/IP 與通訊埠組合，這必須是提供給 curl 的最後一個參數（例如：`127.0.0.1:8545`）。包含這些額外資料的完整 curl 請求格式如下：

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip、狀態與歷史 {#gossip-state-history}

少數幾個核心的 JSON-RPC 方法需要來自以太坊網路的資料，並可清楚分為三個主要類別：_Gossip、狀態與歷史_。使用這些章節中的連結跳轉至各個方法，或使用目錄來探索完整的方法列表。

### Gossip 方法 {#gossip-methods}

> 這些方法會追蹤鏈的頂端。這就是交易在網路中傳播、被納入區塊，以及客戶端發現新區塊的方式。

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### 狀態方法 {#state-methods}

> 報告所有已儲存資料當前狀態的方法。「狀態」就像一塊巨大的共享記憶體 (RAM)，包含帳戶餘額、合約資料以及燃料估算。

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### 歷史方法 {#history-methods}

> 獲取追溯至創世區塊的每個區塊歷史紀錄。這就像一個巨大的僅限附加 (append-only) 檔案，包含所有區塊標頭、區塊主體、叔區塊以及交易收據。

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

## JSON-RPC API 遊樂場 {#json-rpc-api-playground}

您可以使用[遊樂場工具](https://ethereum-json-rpc.com)來探索並試用 API 方法。它還會向您顯示各種節點供應商支援哪些方法與網路。

## JSON-RPC API 方法 {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

回傳目前的客戶端版本。

**參數**

無

**回傳**

`String` - 目前的客戶端版本

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// 結果
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

回傳給定資料的 Keccak-256（_不是_ 標準化的 SHA3-256）。

**參數**

1. `DATA` - 要轉換為 SHA3 雜湊值的資料

```js
params: ["0x68656c6c6f20776f726c64"]
```

**回傳值**

`DATA` - 給定字串的 SHA3 結果。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// 結果
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

回傳目前的網路 ID。

**參數**

無

**回傳值**

`String` - 目前的網路 ID。

目前網路 ID 的完整清單可在 [chainlist.org](https://chainlist.org) 取得。一些常見的包括：

- `1`：以太坊主網
- `11155111`：Sepolia 測試網
- `560048`：Hoodi 測試網

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// 結果
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

如果客戶端正在主動監聽網路連線，則回傳 `true`。

**參數**

無

**回傳值**

`Boolean` - 監聽時為 `true`，否則為 `false`。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// 結果
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

回傳目前連接到客戶端的對等節點數量。

**參數**

無

**回傳值**

`QUANTITY` - 已連接對等節點數量的整數。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// 結果
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

回傳目前的以太坊協定版本。請注意，此方法[在 Geth 中無法使用](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)。

**參數**

無

**回傳**

`String` - 目前的以太坊協定版本

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// 結果
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

傳回包含同步狀態資料的物件，或 `false`。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

無

**傳回值**

確切的傳回資料因客戶端實作而異。當節點未在同步時，所有客戶端都會傳回 `False`，且所有客戶端都會傳回以下欄位。

`Object|Boolean`，包含同步狀態資料的物件，或在未同步時傳回 `FALSE`：

- `startingBlock`: `QUANTITY` - 開始匯入的區塊（只有在同步到達其頂端後才會重設）
- `currentBlock`: `QUANTITY` - 目前的區塊，與 eth_blockNumber 相同
- `highestBlock`: `QUANTITY` - 估計的最高區塊

然而，個別客戶端也可能提供額外的資料。例如，Geth 會傳回以下內容：

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

而貝蘇 (Besu) 則傳回：

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

請參閱您特定客戶端的說明文件以了解更多詳細資訊。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// 或未同步時
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

回傳客戶端 Coinbase 地址。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  在測試區中嘗試端點
</ButtonLink>

> **注意：** 此方法自 **v1.14.0** 起已棄用，且不再受到支援。嘗試使用此方法將導致「Method not supported」錯誤。

**參數**

無

**回傳值**

`DATA`，20 個位元組 - 目前的 Coinbase 地址。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// 結果
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

回傳用於簽署防重放交易的鏈 ID。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

無

**回傳值**

`chainId`，以字串表示的十六進位值，代表目前鏈 ID 的整數。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// 結果
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

如果客戶端正在積極挖礦產生新區塊，則回傳 `true`。這只能在工作量證明網路中回傳 `true`，且自[合併](/roadmap/merge/)以來，在某些客戶端中可能無法使用。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

無

**回傳值**

`Boolean` - 如果客戶端正在挖礦則回傳 `true`，否則回傳 `false`。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

回傳節點挖礦時每秒的雜湊次數。這只能在工作量證明網路中回傳 `true`，且自[合併](/roadmap/merge/)以來，在某些客戶端中可能無法使用。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

無

**回傳值**

`QUANTITY` - 每秒的雜湊次數。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// 結果
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

回傳以 Wei 為單位的當前每單位 Gas 價格估算值。例如，貝蘇客戶端預設會檢查過去 100 個區塊，並回傳 Gas 單位價格的中位數。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

無

**回傳值**

`QUANTITY` - 以 Wei 為單位的當前 Gas 價格整數。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// 結果
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

回傳由客戶端擁有的地址列表。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

無

**回傳**

`Array of DATA`，20 位元組 - 由客戶端擁有的地址。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

回傳最新區塊的編號。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

無

**回傳值**

`QUANTITY` - 客戶端目前所在區塊編號的整數。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// 結果
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

回傳指定地址帳戶的餘額。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `DATA`，20 位元組 - 要檢查餘額的地址。
2. `QUANTITY|TAG` - 整數區塊號碼，或字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**回傳值**

`QUANTITY` - 目前餘額的整數，單位為 Wei。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

傳回給定地址中儲存位置的值。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `DATA`，20 位元組 - 儲存的地址。
2. `QUANTITY` - 儲存位置的整數。
3. `QUANTITY|TAG` - 整數區塊號碼，或是字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"`、`"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

**傳回值**

`DATA` - 該儲存位置的值。

**範例**
計算正確的位置取決於要擷取的儲存內容。考慮以下由地址 `0x391694e7e0b0cce554cb130d723a9d27458f9298` 部署在 `0x295a70b2de5e3953354a6a8344e616ed314d7251` 的合約。

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

擷取 pos0 的值很簡單：

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

擷取映射 (map) 的元素比較困難。映射中元素的位置計算方式如下：

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

這表示要擷取 pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] 上的儲存內容，我們需要使用以下方式計算位置：

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

可以使用 Web3 函式庫隨附的 geth 主控台來進行計算：

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

現在來擷取儲存內容：

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

傳回從某個地址_發送_的交易數量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `DATA`，20 位元組 - 地址。
2. `QUANTITY|TAG` - 整數區塊號碼，或是字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // 最新區塊的狀態
]
```

**傳回值**

`QUANTITY` - 整數，表示從此地址發送的交易數量。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

回傳符合給定區塊雜湊值的區塊中的交易數量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `DATA`，32 位元組 - 區塊的雜湊值

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**回傳值**

`QUANTITY` - 整數，表示此區塊中的交易數量。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

傳回符合給定區塊編號的區塊中的交易數量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `QUANTITY|TAG` - 區塊編號的整數，或是字串 `"earliest"`、`"latest"`、`"pending"`、`"safe"` 或 `"finalized"`，如同 [區塊參數](/developers/docs/apis/json-rpc/#block-parameter)。

```js
params: [
  "0x13738ca", // 20396234
]
```

**回傳值**

`QUANTITY` - 此區塊中交易數量的整數。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

回傳符合給定區塊雜湊值的區塊中，其叔塊的數量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `DATA`，32 位元組 - 區塊的雜湊值

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**回傳值**

`QUANTITY` - 整數，表示此區塊中的叔塊數量。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

回傳符合給定區塊編號的區塊中的叔塊數量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `QUANTITY|TAG` - 區塊編號的整數，或是字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**回傳值**

`QUANTITY` - 該區塊中叔塊數量的整數。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

回傳給定地址的程式碼。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `DATA`，20 位元組 - 地址
2. `QUANTITY|TAG` - 整數區塊編號，或字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**回傳值**

`DATA` - 來自給定地址的程式碼。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

sign 方法計算以太坊特定的簽章，使用：`sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`。

透過在訊息中加入前綴，可讓計算出的簽章被識別為以太坊特定的簽章。這可以防止濫用，避免惡意的去中心化應用程式 (dapp) 簽署任意資料（例如：交易），並使用該簽章來冒充受害者。

注意：用於簽署的地址必須處於解鎖狀態。

**參數**

1. `DATA`，20 位元組 - 地址
2. `DATA`，N 位元組 - 要簽署的訊息

**回傳值**

`DATA`：簽章

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

簽署一筆交易，該交易稍後可以使用 [eth_sendRawTransaction](#eth-sendrawtransaction) 提交至網路。

**參數**

1. `Object` - 交易物件

- `type`:
- `from`: `DATA`, 20 位元組 - 發送交易的地址。
- `to`: `DATA`, 20 位元組 - （建立新合約時為選填）交易指向的地址。
- `gas`: `QUANTITY` - （選填，預設值：90000）為執行交易提供的燃料整數。它將退回未使用的燃料。
- `gasPrice`: `QUANTITY` - （選填，預設值：待定）每個支付的燃料所使用的 Gas 價格整數，單位為 Wei。
- `value`: `QUANTITY` - （選填）隨此交易發送的價值整數，單位為 Wei。
- `data`: `DATA` - 合約的編譯程式碼，或被呼叫方法簽章與編碼後參數的雜湊值。
- `nonce`: `QUANTITY` - （選填）隨機數的整數。這允許覆寫您自己使用相同隨機數的待處理交易。

**回傳值**

`DATA`，由指定帳戶簽署、經 RLP 編碼的交易物件。

**範例**

```js
// 請求
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// 結果
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

創建新的訊息呼叫交易或合約創建（如果資料欄位包含程式碼），並使用 `from` 中指定的帳戶對其進行簽署。

**參數**

1. `Object` - 交易物件

- `from`: `DATA`，20 位元組 - 發送交易的地址。
- `to`: `DATA`，20 位元組 - （創建新合約時為選填）交易指向的地址。
- `gas`: `QUANTITY` - （選填，預設值：90000）為執行交易提供的燃料整數。它將退回未使用的燃料。
- `gasPrice`: `QUANTITY` - （選填，預設值：待定）每個支付的燃料所使用的 gasPrice 整數。
- `value`: `QUANTITY` - （選填）與此交易一起發送的金額整數。
- `input`: `DATA` - 合約的編譯程式碼，或是被呼叫方法簽章與編碼後參數的雜湊值。
- `nonce`: `QUANTITY` - （選填）隨機數的整數。這允許覆寫您自己使用相同隨機數的待處理交易。

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

**回傳值**

`DATA`，32 位元組 - 交易雜湊值，如果交易尚不可用，則為零雜湊。

當您創建合約時，請在交易被提議到區塊後，使用 [eth_getTransactionReceipt](#eth-gettransactionreceipt) 來取得合約地址。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

為已簽署的交易建立新的訊息呼叫交易或合約創建。

**參數**

1. `DATA`，已簽署的交易資料。

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**回傳值**

`DATA`，32 位元組 - 交易雜湊值，如果交易尚未可用，則為零雜湊值。

當你創建合約時，在交易被提議到區塊後，請使用 [eth_getTransactionReceipt](#eth-gettransactionreceipt) 來取得合約地址。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

立即執行新的訊息呼叫，而不在區塊鏈上建立交易。通常用於執行唯讀的智能合約函式，例如 ERC-20 合約的 `balanceOf`。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  在測試區中嘗試端點
</ButtonLink>

**參數**

1. `Object` - 交易呼叫物件

- `from`: `DATA`，20 Bytes - （選填）發送交易的地址。
- `to`: `DATA`，20 Bytes - 交易指向的地址。
- `gas`: `QUANTITY` - （選填）為交易執行所提供燃料的整數。eth_call 消耗零燃料，但某些執行可能需要此參數。
- `gasPrice`: `QUANTITY` - （選填）用於每個支付燃料的 gasPrice 整數
- `value`: `QUANTITY` - （選填）隨此交易發送之值的整數
- `input`: `DATA` - （選填）方法簽章與編碼參數的雜湊。詳情請見 [Solidity 文件中的以太坊合約 ABI](https://docs.soliditylang.org/en/latest/abi-spec.html)。

2. `QUANTITY|TAG` - 整數區塊號碼，或字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

**回傳值**

`DATA` - 已執行合約的回傳值。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

產生並回傳讓交易完成所需燃料的估算值。該交易不會被加入到區塊鏈中。請注意，由於 EVM 機制和節點效能等多種原因，估算值可能會明顯高於交易實際使用的燃料量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

請參閱 [eth_call](#eth-call) 的參數，差別在於所有屬性皆為選填。如果未指定 Gas 限制，Geth 會使用待處理區塊的區塊 Gas 限制作為上限。因此，當燃料量高於待處理區塊的 Gas 限制時，回傳的估算值可能不足以執行該呼叫／交易。

**回傳值**

`QUANTITY` - 使用的燃料量。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

透過雜湊值回傳區塊的相關資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  在遊樂場中測試端點
</ButtonLink>

**參數**

1. `DATA`，32 Bytes - 區塊的雜湊值。
2. `Boolean` - 如果為 `true`，則回傳完整的交易物件；如果為 `false`，則僅回傳交易的雜湊值。

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**回傳值**

`Object` - 一個區塊物件，如果未找到區塊則回傳 `null`：

- `number`: `QUANTITY` - 區塊號碼。當其為待處理區塊時為 `null`。
- `hash`: `DATA`，32 Bytes - 區塊的雜湊值。當其為待處理區塊時為 `null`。
- `parentHash`: `DATA`，32 Bytes - 父區塊的雜湊值。
- `nonce`: `DATA`，8 Bytes - 產生的工作量證明 (PoW) 雜湊值。當其為待處理區塊時為 `null`，對於權益證明 (PoS) 區塊（自合併以來）為 `0x0`。
- `sha3Uncles`: `DATA`，32 Bytes - 區塊中叔區塊資料的 SHA3 雜湊值。
- `logsBloom`: `DATA`，256 Bytes - 區塊日誌的布隆過濾器。當其為待處理區塊時為 `null`。
- `transactionsRoot`: `DATA`，32 Bytes - 區塊的交易樹根節點。
- `stateRoot`: `DATA`，32 Bytes - 區塊的最終狀態樹根節點。
- `receiptsRoot`: `DATA`，32 Bytes - 區塊的收據樹根節點。
- `miner`: `DATA`，20 Bytes - 獲得區塊獎勵的受益人地址。
- `difficulty`: `QUANTITY` - 此區塊難度的整數值。
- `totalDifficulty`: `QUANTITY` - 鏈直到此區塊的總難度整數值。
- `extraData`: `DATA` - 此區塊的「額外資料 (extra data)」欄位。
- `size`: `QUANTITY` - 此區塊大小的整數值（以位元組為單位）。
- `gasLimit`: `QUANTITY` - 此區塊允許的最大燃料。
- `gasUsed`: `QUANTITY` - 此區塊中所有交易總消耗的燃料。
- `timestamp`: `QUANTITY` - 區塊打包時的 Unix 時間戳記。
- `transactions`: `Array` - 交易物件的陣列，或 32 Bytes 的交易雜湊值，取決於最後給定的參數。
- `uncles`: `Array` - 叔區塊雜湊值的陣列。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// 結果
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

根據區塊號碼回傳區塊的相關資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `QUANTITY|TAG` - 區塊號碼的整數，或是字串 `"earliest"`、`"latest"`、`"pending"`、`"safe"` 或 `"finalized"`，如同[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)中所述。
2. `Boolean` - 若為 `true`，則回傳完整的交易物件；若為 `false`，則僅回傳交易的雜湊值。

```js
params: [
  "0x1b4", // 436
  true,
]
```

**回傳值**
請參閱 [eth_getBlockByHash](#eth-getblockbyhash)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

結果請參閱 [eth_getBlockByHash](#eth-getblockbyhash)

### eth_getTransactionByHash {#eth-gettransactionbyhash}

根據請求的交易雜湊值，回傳關於該交易的資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `DATA`，32 位元組 - 交易的雜湊值

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**回傳值**

`Object` - 交易物件，如果找不到交易則回傳 `null`：

- `blockHash`: `DATA`，32 位元組 - 包含此交易的區塊雜湊值。如果處於待處理狀態則為 `null`。
- `blockNumber`: `QUANTITY` - 包含此交易的區塊號碼。如果處於待處理狀態則為 `null`。
- `from`: `DATA`，20 位元組 - 發送者的地址。
- `gas`: `QUANTITY` - 發送者提供的燃料。
- `gasPrice`: `QUANTITY` - 發送者提供的 Gas 價格，單位為 Wei。
- `hash`: `DATA`，32 位元組 - 交易的雜湊值。
- `input`: `DATA` - 隨交易發送的資料。
- `nonce`: `QUANTITY` - 發送者在此交易之前進行的交易數量。
- `to`: `DATA`，20 位元組 - 接收者的地址。如果是合約創建交易則為 `null`。
- `transactionIndex`: `QUANTITY` - 交易在區塊中索引位置的整數。如果處於待處理狀態則為 `null`。
- `value`: `QUANTITY` - 轉移的價值，單位為 Wei。
- `v`: `QUANTITY` - ECDSA 恢復 ID
- `r`: `QUANTITY` - ECDSA 簽章 r
- `s`: `QUANTITY` - ECDSA 簽章 s

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// 結果
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

根據區塊雜湊與交易索引位置，回傳交易的相關資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  在遊樂場中測試端點
</ButtonLink>

**參數**

1. `DATA`，32 位元組 - 區塊的雜湊值。
2. `QUANTITY` - 交易索引位置的整數。

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**回傳值**
請參閱 [eth_getTransactionByHash](#eth-gettransactionbyhash)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

結果請參閱 [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

根據區塊號碼與交易索引位置，回傳交易的相關資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `QUANTITY|TAG` - 區塊號碼，或是字串 `"earliest"`、`"latest"`、`"pending"`、`"safe"` 或 `"finalized"`，如同 [區塊參數](/developers/docs/apis/json-rpc/#block-parameter) 中的說明。
2. `QUANTITY` - 交易索引位置。

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**回傳**
請參閱 [eth_getTransactionByHash](#eth-gettransactionbyhash)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

結果請參閱 [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

透過交易雜湊值回傳交易的收據。

**注意**：待處理的交易無法取得收據。

**參數**

1. `DATA`，32 位元組 - 交易的雜湊值

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**回傳值**
`Object` - 交易收據物件，如果找不到收據則回傳 `null`：

- `transactionHash `：`DATA`，32 位元組 - 交易的雜湊值。
- `transactionIndex`：`QUANTITY` - 交易在區塊中索引位置的整數。
- `blockHash`：`DATA`，32 位元組 - 包含此交易的區塊雜湊值。
- `blockNumber`：`QUANTITY` - 包含此交易的區塊號碼。
- `from`：`DATA`，20 位元組 - 發送者的地址。
- `to`：`DATA`，20 位元組 - 接收者的地址。如果是合約創建交易，則為 null。
- `cumulativeGasUsed`：`QUANTITY ` - 在區塊中執行此交易時所使用的燃料總量。
- `effectiveGasPrice`：`QUANTITY` - 每單位燃料支付的基礎費用與小費總和。
- `gasUsed `：`QUANTITY ` - 僅此特定交易所使用的燃料量。
- `contractAddress `：`DATA`，20 位元組 - 如果該交易是合約創建交易，則為創建的合約地址，否則為 `null`。
- `logs`：`Array` - 此交易所產生的日誌物件陣列。
- `logsBloom`：`DATA`，256 位元組 - 供輕客戶端快速擷取相關日誌的布隆過濾器。
- `type`：`QUANTITY` - 交易類型的整數，`0x0` 為傳統交易，`0x1` 為存取清單類型，`0x2` 為動態費用。

它還會回傳_以下其中一項_：

- `root`：`DATA` 32 位元組的交易後狀態根（拜占庭升級前）
- `status`：`QUANTITY` 為 `1`（成功）或 `0`（失敗）

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// 結果
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // 如果已建立，則為該地址的字串
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // 由 getFilterLogs 等回傳的日誌
    }],
    "logsBloom": "0x00...0", // 256 位元組布隆過濾器
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

根據區塊雜湊值與叔塊索引位置，回傳區塊的叔塊資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  在遊樂場測試端點
</ButtonLink>

**參數**

1. `DATA`，32 位元組 - 區塊的雜湊值。
2. `QUANTITY` - 叔塊的索引位置。

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**回傳值**
請參閱 [eth_getBlockByHash](#eth-getblockbyhash)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

結果請參閱 [eth_getBlockByHash](#eth-getblockbyhash)

**注意**：叔塊不包含個別交易。

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

根據區塊編號與叔塊索引位置，回傳區塊的叔塊資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  在遊樂場中嘗試端點
</ButtonLink>

**參數**

1. `QUANTITY|TAG` - 區塊編號，或是字串 `"earliest"`、`"latest"`、`"pending"`、`"safe"`、`"finalized"`，如同 [區塊參數](/developers/docs/apis/json-rpc/#block-parameter) 中的說明。
2. `QUANTITY` - 叔塊的索引位置。

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**回傳值**
請參閱 [eth_getBlockByHash](#eth-getblockbyhash)

**注意**：叔塊不包含個別交易。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

結果請參閱 [eth_getBlockByHash](#eth-getblockbyhash)

### eth_newFilter {#eth-newfilter}

根據過濾器選項建立一個過濾器物件，以便在狀態改變（日誌）時發出通知。
若要檢查狀態是否已改變，請呼叫 [eth_getFilterChanges](#eth-getfilterchanges)。

**關於指定主題過濾器的注意事項：**
主題與順序有關。包含主題為 [A, B] 之日誌的交易將與以下主題過濾器相符：

- `[]` 「任何值」
- `[A]` 「A 在第一個位置（及其後任何值）」
- `[null, B]` 「任何值在第一個位置，且 B 在第二個位置（及其後任何值）」
- `[A, B]` 「A 在第一個位置，且 B 在第二個位置（及其後任何值）」
- `[[A, B], [A, B]]` 「(A 或 B) 在第一個位置，且 (A 或 B) 在第二個位置（及其後任何值）」
- **參數**

1. `Object` - 過濾器選項：

- `fromBlock`: `QUANTITY|TAG` - （選填，預設值：`"latest"`）整數區塊號碼，或以 `"latest"` 代表最後一個提議的區塊，`"safe"` 代表最新的安全區塊，`"finalized"` 代表最新的已定案區塊，或以 `"pending"`、`"earliest"` 代表尚未包含在區塊中的交易。
- `toBlock`: `QUANTITY|TAG` - （選填，預設值：`"latest"`）整數區塊號碼，或以 `"latest"` 代表最後一個提議的區塊，`"safe"` 代表最新的安全區塊，`"finalized"` 代表最新的已定案區塊，或以 `"pending"`、`"earliest"` 代表尚未包含在區塊中的交易。
- `address`: `DATA|Array`，20 Bytes - （選填）合約地址或日誌應源自的地址清單。
- `topics`: `Array of DATA`，- （選填）32 Bytes 的 `DATA` 主題陣列。主題與順序有關。每個主題也可以是帶有「或 (or)」選項的 DATA 陣列。

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

**回傳值**
`QUANTITY` - 過濾器 ID。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

在節點中建立一個過濾器，以便在有新區塊到達時發出通知。
若要檢查狀態是否已更改，請呼叫 [eth_getFilterChanges](#eth-getfilterchanges)。

**參數**
無

**回傳值**
`QUANTITY` - 過濾器 ID。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// 結果
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

在節點中建立一個過濾器，以便在新的待處理交易到達時發出通知。
若要檢查狀態是否已更改，請呼叫 [eth_getFilterChanges](#eth-getfilterchanges)。

**參數**
無

**回傳值**
`QUANTITY` - 過濾器 ID。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// 結果
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

卸載具有指定 ID 的過濾器。當不再需要監聽時，應始終呼叫此方法。
此外，如果一段時間內未透過 [eth_getFilterChanges](#eth-getfilterchanges) 請求過濾器，過濾器將會逾時。

**參數**

1. `QUANTITY` - 過濾器 ID。

```js
params: [
  "0xb", // 11
]
```

**回傳值**
`Boolean` - 如果過濾器成功卸載則回傳 `true`，否則回傳 `false`。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

篩選器的輪詢方法，會回傳自上次輪詢以來發生的日誌陣列。

**參數**

1. `QUANTITY` - 篩選器 ID。

```js
params: [
  "0x16", // 22
]
```

**回傳值**
`Array` - 日誌物件的陣列，如果自上次輪詢以來沒有任何變更，則為空陣列。

- 對於使用 `eth_newBlockFilter` 建立的篩選器，回傳值為區塊雜湊值（`DATA`，32 位元組），例如 `["0x3454645634534..."]`。
- 對於使用 `eth_newPendingTransactionFilter ` 建立的篩選器，回傳值為交易雜湊值（`DATA`，32 位元組），例如 `["0x6345343454645..."]`。
- 對於使用 `eth_newFilter` 建立的篩選器，日誌是具有以下參數的物件：
  - `removed`: `TAG` - 當日誌因為區塊鏈重組而被移除時為 `true`。如果是有效的日誌則為 `false`。
  - `logIndex`: `QUANTITY` - 日誌在區塊中索引位置的整數。當其為待處理的日誌時為 `null`。
  - `transactionIndex`: `QUANTITY` - 產生該日誌的交易索引位置的整數。當其為待處理的日誌時為 `null`。
  - `transactionHash`: `DATA`，32 位元組 - 產生該日誌的交易雜湊值。當其為待處理的日誌時為 `null`。
  - `blockHash`: `DATA`，32 位元組 - 包含該日誌的區塊雜湊值。當其為待處理時為 `null`。當其為待處理的日誌時為 `null`。
  - `blockNumber`: `QUANTITY` - 包含該日誌的區塊號碼。當其為待處理時為 `null`。當其為待處理的日誌時為 `null`。
  - `address`: `DATA`，20 位元組 - 產生此日誌的來源地址。
  - `data`: `DATA` - 可變長度的非索引日誌資料。（在 _Solidity_ 中：零個或多個 32 位元組的非索引日誌參數。）
  - `topics`: `Array of DATA` - 包含 0 到 4 個 32 位元組 `DATA` 的索引日誌參數陣列。（在 _Solidity_ 中：第一個主題是事件簽章的_雜湊_（例如 `Deposit(address,bytes32,uint256)`），除非您使用 `anonymous` 說明符宣告該事件。）

- **範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// 結果
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

回傳符合給定 ID 過濾器的所有日誌陣列。

**參數**

1. `QUANTITY` - 過濾器 ID。

```js
params: [
  "0x16", // 22
]
```

**回傳值**
請參閱 [eth_getFilterChanges](#eth-getfilterchanges)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

結果請參閱 [eth_getFilterChanges](#eth-getfilterchanges)

### eth_getLogs {#eth-getlogs}

傳回符合給定過濾器物件的所有日誌陣列。

**參數**

1. `Object` - 過濾器選項：

- `fromBlock`: `QUANTITY|TAG` - (選填，預設值：`"latest"`) 整數區塊號碼，或使用 `"latest"` 表示最後一個提議的區塊，`"safe"` 表示最新的安全區塊，`"finalized"` 表示最新已定案的區塊，或使用 `"pending"`、`"earliest"` 表示尚未包含在區塊中的交易。
- `toBlock`: `QUANTITY|TAG` - (選填，預設值：`"latest"`) 整數區塊號碼，或使用 `"latest"` 表示最後一個提議的區塊，`"safe"` 表示最新的安全區塊，`"finalized"` 表示最新已定案的區塊，或使用 `"pending"`、`"earliest"` 表示尚未包含在區塊中的交易。
- `address`: `DATA|Array`，20 位元組 - (選填) 合約地址或日誌來源的地址清單。
- `topics`: `Array of DATA`，- (選填) 包含 32 位元組 `DATA` 主題的陣列。主題與順序相關。每個主題也可以是帶有「或 (or)」選項的 DATA 陣列。
- `blockHash`: `DATA`，32 位元組 - (選填，**未來**) 隨著 EIP-234 的加入，`blockHash` 將成為一個新的過濾器選項，它將傳回的日誌限制在具有 32 位元組雜湊值 `blockHash` 的單一區塊中。使用 `blockHash` 等同於 `fromBlock` = `toBlock` = 具有雜湊值 `blockHash` 的區塊號碼。如果過濾條件中存在 `blockHash`，則不允許使用 `fromBlock` 或 `toBlock`。

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**回傳值**
請參閱 [eth_getFilterChanges](#eth-getfilterchanges)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

結果請參閱 [eth_getFilterChanges](#eth-getfilterchanges)

## 使用範例 {#usage-example}

### 使用 JSON-RPC 部署合約 {#deploying-contract}

本節包含如何僅使用 RPC 介面部署合約的示範。還有其他部署合約的途徑可以將這種複雜性抽象化——例如，使用建構在 RPC 介面之上的函式庫，像是 [Web3.js](https://web3js.readthedocs.io/) 和 [Web3.py](https://github.com/ethereum/web3.py)。這些抽象化通常更容易理解且較不容易出錯，但了解其內部運作原理仍然很有幫助。

以下是一個名為 `Multiply7` 的簡單智能合約，將使用 JSON-RPC 介面部署到以太坊節點。本教學假設讀者已經在執行 Geth 節點。有關節點與客戶端的更多資訊，請參閱[這裡](/developers/docs/nodes-and-clients/run-a-node)。請參閱個別[客戶端](/developers/docs/nodes-and-clients/)文件，了解如何為非 Geth 客戶端啟動 HTTP JSON-RPC。大多數客戶端預設在 `localhost:8545` 上提供服務。

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

首先要做的是確保 HTTP RPC 介面已啟用。這意味著我們在啟動時為 Geth 提供 `--http` 標籤。在這個範例中，我們在私有開發鏈上使用 Geth 節點。使用這種方法，我們不需要真實網路上的以太幣。

```bash
geth --http --dev console 2>>geth.log
```

這將在 `http://localhost:8545` 上啟動 HTTP RPC 介面。

我們可以透過使用 [curl](https://curl.se) 擷取 Coinbase 地址（從帳戶陣列中取得第一個地址）和餘額，來驗證介面是否正在執行。請注意，這些範例中的資料在您的本機節點上會有所不同。如果您想嘗試這些指令，請將第二個 curl 請求中的請求參數替換為第一個請求傳回的結果。

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

因為數字是十六進位編碼，所以餘額會以十六進位字串的形式，以 Wei 為單位傳回。如果我們想將餘額轉換為以太幣的數字形式，我們可以使用 Geth 主控台中的 web3。

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

現在我們的私有開發鏈上有一些以太幣了，我們可以部署合約。第一步是將 Multiply7 合約編譯為可以傳送到 EVM 的位元組碼。要安裝 Solidity 編譯器 solc，請遵循 [Solidity 文件](https://docs.soliditylang.org/en/latest/installing-solidity.html)。（您可能需要使用較舊的 `solc` 版本，以符合[我們範例中使用的編譯器版本](https://github.com/ethereum/solidity/releases/tag/v0.4.20)。）

下一步是將 Multiply7 合約編譯為可以傳送到 EVM 的位元組碼。

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

現在我們有了編譯好的程式碼，我們需要決定部署它需要花費多少燃料。RPC 介面有一個 `eth_estimateGas` 方法可以給我們一個估算值。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

最後部署合約。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

交易被節點接受，並傳回一個交易雜湊值。這個雜湊可用於追蹤交易。下一步是決定我們合約部署的地址。每筆執行的交易都會建立一張收據。這張收據包含有關交易的各種資訊，例如交易被包含在哪個區塊中，以及 EVM 使用了多少燃料。如果交易建立了一個合約，它也會包含合約地址。我們可以使用 `eth_getTransactionReceipt` RPC 方法來擷取收據。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

我們的合約建立在 `0x4d03d617d700cf81935d7f797f4e2ae719648262` 上。傳回 null 結果而不是收據，意味著交易尚未被包含在區塊中。請稍候片刻，檢查您的共識客戶端是否正在執行，然後重試。

#### 與智能合約互動 {#interacting-with-smart-contract}

在這個範例中，我們將使用 `eth_sendTransaction` 傳送一筆交易到合約的 `multiply` 方法。

`eth_sendTransaction` 需要幾個參數，特別是 `from`、`to` 和 `data`。`From` 是我們帳戶的公開地址，而 `to` 是合約地址。`data` 參數包含一個有效負載 (payload)，定義了必須呼叫哪個方法以及使用哪些參數。這就是 [ABI（應用程式二進位介面）](https://docs.soliditylang.org/en/latest/abi-spec.html) 發揮作用的地方。ABI 是一個 JSON 檔案，定義了如何為 EVM 定義和編碼資料。

有效負載的位元組定義了要呼叫合約中的哪個方法。這是對函式名稱及其參數類型進行 Keccak 雜湊後的前 4 個位元組，並以十六進位編碼。multiply 函式接受一個 uint，它是 uint256 的別名。這讓我們得到：

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

下一步是編碼參數。只有一個 uint256，例如，值為 6。ABI 有一個部分指定了如何編碼 uint256 類型。

`int<M>: enc(X)` 是 X 的大端序二補數編碼，對於負數 X，在較高階（左）側填補 0xff，對於正數 X，則填補零位元組，使得長度為 32 位元組的倍數。

這會編碼為 `0000000000000000000000000000000000000000000000000000000000000006`。

結合函式選擇器和編碼後的參數，我們的資料將會是 `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`。

現在可以將其傳送到節點：

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

由於傳送了一筆交易，因此傳回了一個交易雜湊值。擷取收據會得到：

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

收據包含一個日誌。這個日誌是由 EVM 在執行交易時產生的，並包含在收據中。`multiply` 函式顯示觸發了 `Print` 事件，其值為輸入值乘以 7。由於 `Print` 事件的參數是 uint256，我們可以根據 ABI 規則對其進行解碼，這將讓我們得到預期的十進位數 42。除了資料之外，值得注意的是，主題 (topics) 可用於決定是哪個事件建立了該日誌：

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

這只是對一些最常見任務的簡短介紹，示範了 JSON-RPC 的直接用法。

## 相關主題 {#related-topics}

- [JSON-RPC 規範](http://www.jsonrpc.org/specification)
- [節點與客戶端](/developers/docs/nodes-and-clients/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [後端 API](/developers/docs/apis/backend/)
- [執行客戶端](/developers/docs/nodes-and-clients/#execution-clients)