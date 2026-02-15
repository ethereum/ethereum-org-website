---
title: "JSON-RPC 應用程式介面"
description: "一種無狀態、輕量的以太坊用戶端遠端程序呼叫 (RPC) 協定。"
lang: zh-tw
---

為了讓軟體應用程式能夠和以太坊區塊鏈互動（例如：讀取區塊鏈資料，發送交易到網路），必須先連結以太坊節點。

為此，每個 [以太坊用戶端](/developers/docs/nodes-and-clients/#execution-clients) 都實作了 [JSON-RPC 規範](https://github.com/ethereum/execution-apis)，因此無論特定的節點或用戶端實作如何，應用程式都可以依賴一組統一的方法。

[JSON-RPC](https://www.jsonrpc.org/specification) 是一種無狀態、輕量的遠端程序呼叫 (RPC) 協定。 該協定定義了幾種資料結構及其處理規則。 它與傳輸無關，因為這些概念可以在同一進程中、透過通訊端、透過超文字傳輸協定或在許多不同的訊息傳遞環境中使用。 它使用 JSON (RFC 4627) 作為資料格式。

## 用戶端實作 {#client-implementations}

每個以太坊用戶端在實作 JSON-RPC 規範時可能會使用不同的程式設計語言。 有關特定程式設計語言的進一步詳細資訊，請參閱各個 [用戶端文件](/developers/docs/nodes-and-clients/#execution-clients)。 我們建議檢查每個用戶端的文件以取得最新的應用程式介面支援資訊。

## 便利函式庫 {#convenience-libraries}

雖然可以選擇透過 JSON-RPC 應用程式介面直接與以太坊用戶端互動，但對於去中心化應用程式開發者來說通常有更簡單的選擇。 有許多 [JavaScript](/developers/docs/apis/javascript/#available-libraries) 和 [後端應用程式介面](/developers/docs/apis/backend/#available-libraries) 函式庫，可在 JSON-RPC API 之上提供包裝函式。 借助這些程式庫，開發者可以用自己選擇的程式語言編寫直覺的單行方法，以初始化與以太坊互動的 JSON-RPC 請求（在後台）。

## 共識用戶端 API {#consensus-clients}

本頁面主要討論以太坊執行用戶端使用的 JSON-RPC 應用程式介面。 然而，共識用戶端也有一個遠端程序呼叫應用程式介面，讓使用者能夠直接從節點查詢有關節點的資訊、請求信標區塊、信標狀態和其他共識相關資訊。 此 API 記錄在 [Beacon API 網頁](https://ethereum.github.io/beacon-APIs/#/) 上。

內部應用程式介面也用於節點內的用戶端間通訊 - 也就是說，它讓共識用戶端和執行用戶端能夠交換資料。 這稱為「引擎 API」，規格可在 [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) 上取得。

## 執行用戶端規格 {#spec}

[在 GitHub 上閱讀完整的 JSON-RPC API 規格](https://github.com/ethereum/execution-apis)。 此 API 記錄在 [執行 API 網頁](https://ethereum.github.io/execution-apis/)，並包含一個檢查器來試用所有可用的方法。

## 慣例 {#conventions}

### 十六進位值編碼 {#hex-encoding}

透過 JSON 傳遞兩種關鍵資料類型：未格式化的位元組陣列和數量。 兩者都以十六進位編碼傳遞，但對格式有不同的要求。

#### 數量 {#quantities-encoding}

編碼數量（整數、數字）時：編碼為十六進位，前綴為「0x」，最緊湊的表示形式（輕微例外：零應表示為「0x0」）。

下面有些範例：

- 0x41（在十進位中是 65）
- 0x400（在十進位中是 1024）
- 錯誤：0x（應始終至少有一位數字，零是「0x0」）
- 錯誤：0x0400（不允許有前導零）
- 錯誤：ff（必須有前綴 0x）

### 未格式化資料 {#unformatted-data-encoding}

編碼無格式資料（位元組陣列、帳戶位址、雜湊值、位元組碼陣列）時：編碼為十六進位，前綴為「0x」，每個位元組兩個十六進位數字。

下面有些範例：

- 0x41（大小為 1，「A」）
- 0x004200（大小為 3，「0B0」）
- 0x（大小為 0，""）
- 錯誤：0xf0f0f（位數必須為偶數）
- 錯誤：004200（必須以 0x 為前綴）

### 區塊參數 {#block-parameter}

下列方法有一個額外的區塊參數：

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

當發出對以太坊狀態進行查詢的請求時，提供的區塊參數決定了區塊的高度。

區塊參數可以使用以下選項：

- `HEX 字串` - 整數區塊編號
- `字串 "earliest"` 代表最早/創世區塊
- `字串 "latest"` - 代表最新提議的區塊
- `字串 "safe"` - 代表最新安全標頭區塊
- `字串 "finalized"` - 代表最新最終確認區塊
- `字串 "pending"` - 代表待處理狀態/交易

## 範例

本頁我們提供使用命令列工具 [curl](https://curl.se) 來操作各個 JSON_RPC API 端點的範例。 這些個別的端點範例可在下方的 [Curl 範例](#curl-examples) 一節中找到。 在頁面下方，我們也提供一個使用 Geth 節點、JSON_RPC API 和 curl 來編譯和部署智能合約的 [端對端範例](#usage-example)。

## Curl 範例 {#curl-examples}

下方提供了透過向以太坊節點發出 [curl](https://curl.se) 請求來使用 JSON_RPC API 的範例。 每個範例包含對特定端點的描述、其參數、傳回類型，以及應該如何使用的可行範例。

curl 請求可能會傳回與內容類型相關的錯誤訊息。 這是因為 `--data` 選項會將內容類型設定為 `application/x-www-form-urlencoded`。 如果你的節點確實對此發出警告，請在呼叫的開頭放置 `-H "Content-Type: application/json"` 來手動設定標頭。 這些範例也不包含 URL/IP 和通訊埠的組合，此組合必須是提供給 curl 的最後一個引數 (例如 `127.0.0.1:8545`)。 完整的 curl 請求包含採用以下形式的附加資料：

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip、狀態、歷史 {#gossip-state-history}

少數核心 JSON-RPC 方法需要來自以太坊網路的資料，並可整齊地分為三大類：_Gossip、狀態和歷史_。 利用這些章節中的連結移動至每個方法，或利用目錄探索完整的方法清單。

### Gossip 方法 {#gossip-methods}

> 這些方法用於追蹤鏈頭。 這就是交易如何在網路中傳播、進入區塊以及用戶端如何發現新區塊的方式。

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### 狀態方法 {#state_methods}

> 報告所有已存儲資料的目前狀態的方法。 「狀態」像是一大塊可分享的隨機存取記憶體，包含帳戶餘額、合約資料和燃料預估。

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### 歷史方法 {#history_methods}

> 取得包括創世區塊在內的每一區塊的歷史記錄。 這像一個大型只能附加資料的檔案，包括所有區塊頭、區塊體、叔塊和交易收據。

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

## JSON-RPC 應用程式介面訓練場

你可以使用 [遊樂場工具](https://ethereum-json-rpc.com) 來探索和試用 API 方法。 訓練場也顯示不同的節點提供者支援的方法和網路。

## JSON-RPC API 方法 {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

傳回目前用戶端版本。

**參數**

無

**傳回**

`字串` - 目前的用戶端版本

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

### web3_sha3 {#web3_sha3}

傳回給定資料的 Keccak-256 (「不是」標準化的 SHA3-256)。

**參數**

1. `DATA` - 要轉換為 SHA3 雜湊值的資料

```js
params: ["0x68656c6c6f20776f726c64"]
```

**傳回**

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

### net_version {#net_version}

傳回目前網路 ID。

**參數**

無

**傳回**

`String` - 目前網路 ID。

目前網路 ID 的完整清單可在 [chainlist.org](https://chainlist.org) 上找到。 一些常用的如下：

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

### net_listening {#net_listening}

如果用戶端正在主動偵聽網路連線，則傳回 `true`。

**參數**

無

**傳回**

`布林值` - 偵聽時為 `true`，否則為 `false`。

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

### net_peerCount {#net_peercount}

傳回目前連線到用戶端的對等點數量。

**參數**

無

**傳回**

`QUANTITY` - 連線的對等點數量的整數。

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

### eth_protocolVersion {#eth_protocolversion}

傳回目前的以太坊協定版本。 請注意，此方法在 [Geth 中不可用](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)。

**參數**

無

**傳回**

`字串` - 目前的以太坊協定版本

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

### eth_syncing {#eth_syncing}

傳回一個包含同步狀態資料的物件，或傳回 `false`。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  在遊樂場試用端點
</ButtonLink>

**參數**

無

**傳回**

準確的傳回資料因用戶端實作而異。 當節點未同步時，所有用戶端都會傳回 `False`，且所有用戶端都會傳回下列欄位。

`物件|布林值`，一個具有同步狀態資料的物件，或在未同步時為 `FALSE`：

- `startingBlock`：`QUANTITY` - 開始匯入的區塊 (只有在同步達到其標頭後才會重設)
- `currentBlock`：`QUANTITY` - 目前區塊，與 eth_blockNumber 相同
- `highestBlock`：`QUANTITY` - 預估的最高區塊

然而，個別用戶端也可以提供額外的資料。 例如 Geth 傳回如下資料：

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

而 Besu 傳回：

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

請參閱特定用戶端的文檔以獲得更多詳細資料。

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
// 或在未同步時
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

傳回用戶端的 coinbase 地址。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  在遊樂場試用端點
</ButtonLink>

> **注意：**此方法自 **v1.14.0** 起已被棄用，不再支援。 嘗試採用此方法將會出現「不支援此方法」的錯誤。

**參數**

無

**傳回**

`DATA`，20 位元組 - 目前的 coinbase 位址。

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

### eth_chainId {#eth_chainId}

傳回用來簽署重新執行攻擊保護交易的區塊鏈 ID。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  在遊樂場試用端點
</ButtonLink>

**參數**

無

**傳回**

`chainId`，十六進位值，以字串形式表示目前鏈 ID 的整數。

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

### eth_mining {#eth_mining}

如果用戶端正在積極開採新區塊，則傳回 `true`。 這只能對工作量證明網路傳回 `true`，且自 [合併](/roadmap/merge/) 後，某些用戶端可能無法使用。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  在遊樂場試用端點
</ButtonLink>

**參數**

無

**傳回**

`布林值` - 如果用戶端正在挖礦，則傳回 `true`，否則為 `false`。

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

### eth_hashrate {#eth_hashrate}

傳回正在挖礦的節點每秒的雜湊值數量。 這只能對工作量證明網路傳回 `true`，且自 [合併](/roadmap/merge/) 後，某些用戶端可能無法使用。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  在遊樂場試用端點
</ButtonLink>

**參數**

無

**傳回**

`QUANTITY` - 每秒的哈希數。

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

### eth_gasPrice {#eth_gasprice}

傳回預估的目前燃料價格，以 wei 為單位。 例如：Besu 用戶端檢查最後面 100 個區塊並預設傳回燃料單價中位數。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  在遊樂場試用端點
</ButtonLink>

**參數**

無

**傳回**

`QUANTITY` - 目前 gas 價格的整數，以 wei 為單位。

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

### eth_accounts {#eth_accounts}

傳回用戶端擁有的地址清單。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  在遊樂場試用端點
</ButtonLink>

**參數**

無

**傳回**

`DATA 陣列`，20 位元組 - 用戶端擁有的位址。

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

### eth_blockNumber {#eth_blocknumber}

傳回最新區塊的編號。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  在遊樂場試用端點
</ButtonLink>

**參數**

無

**傳回**

`QUANTITY` - 用戶端目前所在區塊編號的整數。

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

### eth_getBalance {#eth_getbalance}

傳回指定位址帳戶的餘額。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `DATA`，20 位元組 - 要檢查餘額的位址。
2. `QUANTITY|TAG` - 整數區塊編號，或字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**傳回**

`QUANTITY` - 目前餘額的整數，以 wei 為單位。

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

### eth_getStorageAt {#eth_getstorageat}

從給定地址的存儲位置傳回值。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `DATA`，20 位元組 - 儲存的位址。
2. `QUANTITY` - 儲存中位置的整數。
3. `QUANTITY|TAG` - 整數區塊編號，或字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"`、`"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

**傳回**

`DATA` - 此儲存位置的值。

**範例**
計算正確位置取決於要擷取的儲存。 請考慮由位址 `0x391694e7e0b0cce554cb130d723a9d27458f9298` 部署在 `0x295a70b2de5e3953354a6a8344e616ed314d7251` 的下列合約。

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

擷取對應的元素較困難。 對應中元素位置是依照下列方式計算的：

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

這意味著要擷取 pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] 處的存儲，我們需要以下列方式計算位置：

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

可以使用 web3 程式庫的 Geth 控制台進行計算：

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

現在擷取存儲：

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

傳回從某一位址「傳送」的交易數量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `DATA`，20 位元組 - 位址。
2. `QUANTITY|TAG` - 整數區塊編號，或字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // 最新區塊的狀態
]
```

**傳回**

`QUANTITY` - 從此位址傳送的交易數量之整數。

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

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

傳回區塊中從符合給定區塊雜湊值的交易數量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `DATA`，32 位元組 - 區塊的哈希

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**傳回**

`QUANTITY` - 此區塊中交易數量的整數。

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

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

傳回與給定區塊編號相符的區塊中的交易數量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `QUANTITY|TAG` - 區塊編號的整數，或字串 `"earliest"`、`"latest"`、`"pending"`、`"safe"` 或 `"finalized"`，如[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)中所述。

```js
params: [
  "0x13738ca", // 20396234
]
```

**傳回**

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

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

傳回區塊中符合給定區塊雜湊值的叔塊數量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `DATA`，32 位元組 - 區塊的哈希

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**傳回**

`QUANTITY` - 此區塊中叔塊數量的整數。

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

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

傳回區塊中符合給定區塊編號的叔塊數量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `QUANTITY|TAG` - 區塊編號的整數，或字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**傳回**

`QUANTITY` - 此區塊中叔塊數量的整數。

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

### eth_getCode {#eth_getcode}

傳回給定地址的程式碼。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `DATA`，20 位元組 - 位址
2. `QUANTITY|TAG` - 整數區塊編號，或字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**傳回**

`DATA` - 來自給定位址的程式碼。

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

### eth_sign {#eth_sign}

sign 方法會使用 `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))` 計算以太坊特定的簽章。

透過在訊息中加入前綴，可以將計算出的簽章識別為以太坊特定簽章。 這可以防止惡意去中心化應用程式簽署任意資料 (例如交易)，並使用簽章冒充受害者的濫用情況。

注意：要簽章的地址必須解鎖。

**參數**

1. `DATA`，20 位元組 - 位址
2. `DATA`，N 位元組 - 要簽署的訊息

**傳回**

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

### eth_signTransaction {#eth_signtransaction}

簽署一筆交易，稍後可使用 [eth_sendRawTransaction](#eth_sendrawtransaction) 提交到網路。

**參數**

1. `物件` - 交易物件

- `type`：
- `from`：`DATA`，20 位元組 - 交易傳送方的位址。
- `to`：`DATA`，20 位元組 - (建立新合約時為選用) 交易指向的位址。
- `gas`：`QUANTITY` - (選用，預設值：90000) 為交易執行提供的 gas 整數值。 將傳回未使用的燃料。
- `gasPrice`：`QUANTITY` - (選用，預設值：待定) 用於每次支付 gas 的 gasPrice 整數值，以 Wei 為單位。
- `value`：`QUANTITY` - (選用) 隨此交易傳送的價值整數值，以 Wei 為單位。
- `data`：`DATA` - 合約的已編譯程式碼，或是所叫用方法簽章和已編碼參數的哈希。
- `nonce`：`QUANTITY` - (選用) nonce 的整數值。 這允許覆寫你自己的使用相同隨機數的待處理交易。

**傳回**

`DATA`，由指定帳戶簽署的 RLP 編碼交易物件。

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

### eth_sendTransaction {#eth_sendtransaction}

如果資料欄位包含程式碼，則建立新的訊息呼叫交易或合約建立，並使用 `from` 中指定的帳戶簽署。

**參數**

1. `物件` - 交易物件

- `from`：`DATA`，20 位元組 - 交易傳送方的位址。
- `to`：`DATA`，20 位元組 - (建立新合約時為選用) 交易指向的位址。
- `gas`：`QUANTITY` - (選用，預設值：90000) 為交易執行提供的 gas 整數值。 將傳回未使用的燃料。
- `gasPrice`：`QUANTITY` - (選用，預設值：待定) 用於每次支付 gas 的 gasPrice 整數值。
- `value`：`QUANTITY` - (選用) 隨此交易傳送的價值整數值。
- `input`：`DATA` - 合約的已編譯程式碼，或是所叫用方法簽章和已編碼參數的哈希。
- `nonce`：`QUANTITY` - (選用) nonce 的整數值。 這允許覆寫你自己的使用相同隨機數的待處理交易。

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

**傳回**

`DATA`，32 位元組 - 交易哈希，如果交易尚不可用，則為零哈希。

當您建立合約時，在區塊中提議交易後，使用 [eth_getTransactionReceipt](#eth_gettransactionreceipt) 來取得合約位址。

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

### eth_sendRawTransaction {#eth_sendrawtransaction}

建立新的訊息呼叫交易或為簽署的交易建立合約。

**參數**

1. `DATA`，已簽署的交易資料。

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**傳回**

`DATA`，32 位元組 - 交易哈希，如果交易尚不可用，則為零哈希。

當您建立合約時，在區塊中提議交易後，使用 [eth_getTransactionReceipt](#eth_gettransactionreceipt) 來取得合約位址。

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

### eth_call {#eth_call}

立即執行一個新的訊息調用，但不在區塊鏈上建立交易。 常見用於執行唯讀的智能合約函式，例如 ERC-20 合約的 `balanceOf`。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `物件` - 交易呼叫物件

- `from`：`DATA`，20 位元組 - (選用) 交易傳送方的位址。
- `to`：`DATA`，20 位元組 - 交易指向的位址。
- `gas`：`QUANTITY` - (選用) 為交易執行提供的 gas 整數值。 eth_call 消耗零燃料，但某些執行可能需要此參數。
- `gasPrice`：`QUANTITY` - (選用) 用於每次支付 gas 的 gasPrice 整數值
- `value`：`QUANTITY` - (選用) 隨此交易傳送的價值整數值
- `input`：`DATA` - (選用) 方法簽章和已編碼參數的哈希。 有關詳細資訊，請參閱 [Solidity 文件中的以太坊合約 ABI](https://docs.soliditylang.org/en/latest/abi-spec.html)。

2. `QUANTITY|TAG` - 整數區塊編號，或字串 `"latest"`、`"earliest"`、`"pending"`、`"safe"` 或 `"finalized"`，請參閱[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)

**傳回**

`DATA` - 已執行合約的傳回值。

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

### eth_estimateGas {#eth_estimategas}

產生和傳回完成交易所必需的燃料量預估值。 交易將不會新增至區塊鏈。 請注意，由於以太坊虛擬機機制和節點效能等種種原因，預估值可能明顯地大於交易實際使用的燃料量。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  在遊樂場試用端點
</ButtonLink>

**參數**

請參閱 [eth_call](#eth_call) 參數，但所有屬性都是選用的。 假如沒有明確說明燃料限制，Geth 將使用來自待處理區塊的區塊燃料限制作為上限。 因此，當 gas 量高於待處理區塊的 gas 限制時，傳回的估計值可能不足以執行呼叫/交易。

**傳回**

`QUANTITY` - 使用的 gas 數量。

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

### eth_getBlockByHash {#eth_getblockbyhash}

根據雜湊值傳回區塊資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `DATA`，32 位元組 - 區塊的哈希。
2. `布林值` - 如果為 `true`，則傳回完整的交易物件；如果為 `false`，則只傳回交易的哈希。

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**傳回**

`物件` - 區塊物件，如果找不到區塊，則為 `null`：

- `number`：`QUANTITY` - 區塊編號。 當區塊為待處理區塊時為 `null`。
- `hash`：`DATA`，32 位元組 - 區塊的哈希。 當區塊為待處理區塊時為 `null`。
- `parentHash`：`DATA`，32 位元組 - 父區塊的哈希。
- `nonce`：`DATA`，8 位元組 - 產生的工作量證明哈希。 當區塊為待處理區塊時為 `null`，權益證明區塊 (自合併後) 為 `0x0`。
- `sha3Uncles`：`DATA`，32 位元組 - 區塊中叔塊資料的 SHA3。
- `logsBloom`：`DATA`，256 位元組 - 用於區塊日誌的布隆篩選器。 當區塊為待處理區塊時為 `null`。
- `transactionsRoot`：`DATA`，32 位元組 - 區塊交易樹的根。
- `stateRoot`：`DATA`，32 位元組 - 區塊最終狀態樹的根。
- `receiptsRoot`：`DATA`，32 位元組 - 區塊收據樹的根。
- `miner`：`DATA`，20 位元組 - 獲得區塊獎勵的受益人位址。
- `difficulty`：`QUANTITY` - 此區塊難度的整數。
- `totalDifficulty`：`QUANTITY` - 到此區塊為止的鏈總難度的整數。
- `extraData`：`DATA` - 此區塊的「額外資料」欄位。
- `size`：`QUANTITY` - 此區塊大小的整數，以位元組為單位。
- `gasLimit`：`QUANTITY` - 此區塊中允許的最大 gas。
- `gasUsed`：`QUANTITY` - 此區塊中所有交易使用的總 gas。
- `timestamp`：`QUANTITY` - 區塊整理時的 unix 時間戳。
- `transactions`：`陣列` - 交易物件的陣列，或 32 位元組的交易哈希，取決於最後一個給定的參數。
- `uncles`：`陣列` - 叔塊哈希的陣列。

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

### eth_getBlockByNumber {#eth_getblockbynumber}

根據區塊編號傳回關於區塊的資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `QUANTITY|TAG` - 區塊編號的整數，或字串 `"earliest"`、`"latest"`、`"pending"`、`"safe"` 或 `"finalized"`，如[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)中所述。
2. `布林值` - 如果為 `true`，則傳回完整的交易物件；如果為 `false`，則只傳回交易的哈希。

```js
params: [
  "0x1b4", // 436
  true,
]
```

**傳回**
請參閱 [eth_getBlockByHash](#eth_getblockbyhash)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

結果請參閱 [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

傳回有關按交易雜湊值請求的交易的資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `DATA`，32 位元組 - 交易的哈希

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**傳回**

`物件` - 交易物件，如果找不到交易，則為 `null`：

- `blockHash`：`DATA`，32 位元組 - 此交易所在區塊的哈希。 當為待處理時為 `null`。
- `blockNumber`：`QUANTITY` - 此交易所在的區塊編號。 當為待處理時為 `null`。
- `from`：`DATA`，20 位元組 - 傳送方的位址。
- `gas`：`QUANTITY` - 傳送方提供的 gas。
- `gasPrice`：`QUANTITY` - 傳送方提供的 gas 價格，以 Wei 為單位。
- `hash`：`DATA`，32 位元組 - 交易的哈希。
- `input`：`DATA` - 隨交易一起傳送的資料。
- `nonce`：`QUANTITY` - 傳送方在此交易之前所做的交易數量。
- `to`：`DATA`，20 位元組 - 接收方的位址。 當為合約建立交易時為 `null`。
- `transactionIndex`：`QUANTITY` - 區塊中交易索引位置的整數。 當為待處理時為 `null`。
- `value`：`QUANTITY` - 轉帳的價值，以 Wei 為單位。
- `v`：`QUANTITY` - ECDSA 復原 ID
- `r`：`QUANTITY` - ECDSA 簽章 r
- `s`：`QUANTITY` - ECDSA 簽章 s

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

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

按區塊雜湊值和交易索引位置傳回有關交易的資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `DATA`，32 位元組 - 區塊的哈希。
2. `QUANTITY` - 交易索引位置的整數。

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**傳回**
請參閱 [eth_getTransactionByHash](#eth_gettransactionbyhash)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

結果請參閱 [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

按區塊編號和交易索引位置傳回有關交易的資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `QUANTITY|TAG` - 區塊編號，或字串 `"earliest"`、`"latest"`、`"pending"`、`"safe"` 或 `"finalized"`，如[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)中所述。
2. `QUANTITY` - 交易索引位置。

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**傳回**
請參閱 [eth_getTransactionByHash](#eth_gettransactionbyhash)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

結果請參閱 [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

按交易雜湊值返回交易的收據。

**注意** 待處理交易沒有收據。

**參數**

1. `DATA`，32 位元組 - 交易的哈希

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**傳回**
`物件` - 交易收據物件，如果找不到收據，則為 `null`：

- `transactionHash `：`DATA`，32 位元組 - 交易的哈希。
- `transactionIndex`：`QUANTITY` - 區塊中交易索引位置的整數。
- `blockHash`：`DATA`，32 位元組 - 此交易所在區塊的哈希。
- `blockNumber`：`QUANTITY` - 此交易所在的區塊編號。
- `from`：`DATA`，20 位元組 - 傳送方的位址。
- `to`：`DATA`，20 位元組 - 接收方的位址。 如果是合約建立交易，則為 null。
- `cumulativeGasUsed` : `QUANTITY ` - 當此交易在區塊中執行時使用的總 gas 量。
- `effectiveGasPrice`：`QUANTITY` - 每單位 gas 支付的基本費用和小費的總和。
- `gasUsed `：`QUANTITY ` - 僅此特定交易所使用的 gas 量。
- `contractAddress `：`DATA`，20 位元組 - 如果交易是合約建立，則為建立的合約位址，否則為 `null`。
- `logs`：`陣列` - 此交易所產生的日誌物件陣列。
- `logsBloom`：`DATA`，256 位元組 - 供輕用戶端快速擷取相關日誌的布隆篩選器。
- `type`：`QUANTITY` - 交易類型的整數，`0x0` 為舊式交易，`0x1` 為存取列表類型，`0x2` 為動態費用。

它也傳回以下其中一項：

- `root`：`DATA` 32 位元組的交易後狀態根 (拜占庭前)
- `status`：`QUANTITY` 為 `1` (成功) 或 `0` (失敗)

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
    "contractAddress": null, // 如果已建立，則為位址字串
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogs 等傳回的日誌
    }],
    "logsBloom": "0x00...0", // 256 位元組布隆篩選器
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

透過哈希和叔塊索引位置傳回區塊叔塊的相關資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `DATA`，32 位元組 - 區塊的哈希。
2. `QUANTITY` - 叔塊的索引位置。

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**傳回**
請參閱 [eth_getBlockByHash](#eth_getblockbyhash)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

結果請參閱 [eth_getBlockByHash](#eth_getblockbyhash)

**注意**：叔塊不包含個別交易。

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

透過編號和叔塊索引位置傳回區塊叔塊的相關資訊。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  在遊樂場試用端點
</ButtonLink>

**參數**

1. `QUANTITY|TAG` - 區塊編號，或字串 `"earliest"`、`"latest"`、`"pending"`、`"safe"`、`"finalized"`，如[區塊參數](/developers/docs/apis/json-rpc/#block-parameter)中所述。
2. `QUANTITY` - 叔塊的索引位置。

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**傳回**
請參閱 [eth_getBlockByHash](#eth_getblockbyhash)

**注意**：叔塊不包含個別交易。

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

結果請參閱 [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

根據篩選條件選項建立一個篩選條件物件，以在狀態改變時發出通知（日誌）。
若要檢查狀態是否已變更，請呼叫 [eth_getFilterChanges](#eth_getfilterchanges)。

**關於指定主題篩選器的說明：**
主題是順序相依的。 以下主題篩選條件將匹配日誌中包含主題 [A, B] 的交易：

- `[]` 「任何內容」
- `[A]` 「A 在第一個位置 (後面可以是任何內容)」
- `[null, B]` 「第一個位置是任何內容，且 B 在第二個位置 (後面可以是任何內容)」
- `[A, B]` 「A 在第一個位置，且 B 在第二個位置 (後面可以是任何內容)」
- `[[A, B], [A, B]]` 「(A 或 B) 在第一個位置，且 (A 或 B) 在第二個位置 (後面可以是任何內容)」
- **參數**

1. `物件` - 篩選選項：

- `fromBlock`：`QUANTITY|TAG` - (選用，預設：`"latest"`) 整數區塊編號，或 `"latest"` 代表最後提議的區塊、`"safe"` 代表最新的安全區塊、`"finalized"` 代表最新的最終確認區塊，或 `"pending"`、`"earliest"` 代表尚未進入區塊的交易。
- `toBlock`：`QUANTITY|TAG` - (選用，預設：`"latest"`) 整數區塊編號，或 `"latest"` 代表最後提議的區塊、`"safe"` 代表最新的安全區塊、`"finalized"` 代表最新的最終確認區塊，或 `"pending"`、`"earliest"` 代表尚未進入區塊的交易。
- `address`：`DATA|陣列`，20 位元組 - (選用) 合約位址或日誌應源自的位址清單。
- `topics`：`DATA 陣列` - (選用) 32 位元組 `DATA` 主題的陣列。 主題與順序相關。 每個主題也可以為帶有「或」選項的 DATA 陣列。

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

**傳回**
`QUANTITY` - 篩選器 ID。

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

### eth_newBlockFilter {#eth_newblockfilter}

在節點中建立一個篩選條件，以在新區塊到達時發出通知。
若要檢查狀態是否已變更，請呼叫 [eth_getFilterChanges](#eth_getfilterchanges)。

**參數**
無

**傳回**
`QUANTITY` - 篩選器 ID。

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

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

在節點中建立一個篩選條件，以在新的待處理交易到達時發出通知。
若要檢查狀態是否已變更，請呼叫 [eth_getFilterChanges](#eth_getfilterchanges)。

**參數**
無

**傳回**
`QUANTITY` - 篩選器 ID。

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

### eth_uninstallFilter {#eth_uninstallfilter}

根據給定 ID 解除安裝篩選條件。 當不再需要監視時，應始終對其進行呼叫。
此外，如果篩選器在一段時間內未使用 [eth_getFilterChanges](#eth_getfilterchanges) 請求，則會逾時。

**參數**

1. `QUANTITY` - 篩選器 ID。

```js
params: [
  "0xb", // 11
]
```

**傳回**
`布林值` - 如果篩選器成功解除安裝，則為 `true`，否則為 `false`。

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

### eth_getFilterChanges {#eth_getfilterchanges}

篩選條件輪詢方法，傳回自從上次輪詢後產生的日誌陣列。

**參數**

1. `QUANTITY` - 篩選器 ID。

```js
params: [
  "0x16", // 22
]
```

**傳回**
`陣列` - 日誌物件的陣列，如果自上次輪詢以來沒有任何變更，則為空陣列。

- 對於使用 `eth_newBlockFilter` 建立的篩選器，傳回值為區塊哈希 (`DATA`，32 位元組)，例如 `["0x3454645634534..."]`。

- 對於使用 `eth_newPendingTransactionFilter ` 建立的篩選器，傳回值為交易哈希 (`DATA`，32 位元組)，例如 `["0x6345343454645..."]`。

- 對於使用 `eth_newFilter` 建立的篩選器，日誌是具有以下參數的物件：
  - `removed`：`TAG` - `true` 表示由於鏈重組而移除了日誌。 如果是有效日誌，則為 `false`。
  - `logIndex`：`QUANTITY` - 區塊中日誌索引位置的整數。 當為待處理日誌時為 `null`。
  - `transactionIndex`：`QUANTITY` - 建立日誌的交易索引位置的整數。 當為待處理日誌時為 `null`。
  - `transactionHash`：`DATA`，32 位元組 - 建立此日誌的交易哈希。 當為待處理日誌時為 `null`。
  - `blockHash`：`DATA`，32 位元組 - 此日誌所在區塊的哈希。 當為待處理時為 `null`。 當為待處理日誌時為 `null`。
  - `blockNumber`：`QUANTITY` - 此日誌所在的區塊編號。 當為待處理時為 `null`。 當為待處理日誌時為 `null`。
  - `address`：`DATA`，20 位元組 - 此日誌源自的位址。
  - `data`：`DATA` - 可變長度的非索引日誌資料。 （在 _solidity_ 中：零個或多個 32 位元組的非索引日誌引數。）
  - `topics`：`DATA 陣列` - 0 到 4 個 32 位元組 `DATA` 的索引日誌引數陣列。 （在 _solidity_ 中：第一個主題是事件簽章的_哈希_ (例如 `Deposit(address,bytes32,uint256)`)，除非您使用 `anonymous` 指定符宣告了該事件。）

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

### eth_getFilterLogs {#eth_getfilterlogs}

傳回與給定 ID 之篩選條件相符的所有日誌的陣列。

**參數**

1. `QUANTITY` - 篩選器 ID。

```js
params: [
  "0x16", // 22
]
```

**傳回**
請參閱 [eth_getFilterChanges](#eth_getfilterchanges)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

結果請參閱 [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

傳回與給定篩選條件物件相符的所有日誌的陣列。

**參數**

1. `物件` - 篩選選項：

- `fromBlock`：`QUANTITY|TAG` - (選用，預設：`"latest"`) 整數區塊編號，或 `"latest"` 代表最後提議的區塊、`"safe"` 代表最新的安全區塊、`"finalized"` 代表最新的最終確認區塊，或 `"pending"`、`"earliest"` 代表尚未進入區塊的交易。
- `toBlock`：`QUANTITY|TAG` - (選用，預設：`"latest"`) 整數區塊編號，或 `"latest"` 代表最後提議的區塊、`"safe"` 代表最新的安全區塊、`"finalized"` 代表最新的最終確認區塊，或 `"pending"`、`"earliest"` 代表尚未進入區塊的交易。
- `address`：`DATA|陣列`，20 位元組 - (選用) 合約位址或日誌應源自的位址清單。
- `topics`：`DATA 陣列` - (選用) 32 位元組 `DATA` 主題的陣列。 主題與順序相關。 每個主題也可以為帶有「或」選項的 DATA 陣列。
- `blockHash`：`DATA`，32 位元組 - (選用，**未來**) 隨著 EIP-234 的新增，`blockHash` 將成為一個新的篩選選項，它會將傳回的日誌限制在具有 32 位元組哈希 `blockHash` 的單一區塊中。 使用 `blockHash` 等同於 `fromBlock` = `toBlock` = 具有哈希 `blockHash` 的區塊編號。 如果 `blockHash` 存在於篩選條件中，則不允許使用 `fromBlock` 和 `toBlock`。

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**傳回**
請參閱 [eth_getFilterChanges](#eth_getfilterchanges)

**範例**

```js
// 請求
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

結果請參閱 [eth_getFilterChanges](#eth_getfilterchanges)

## 使用範例 {#usage-example}

### 使用 JSON_RPC 部署合約 {#deploying-contract}

這部分示範如何只使用遠端程序呼叫介面部署合約。 還有其他部署合約的替代途徑，可以將這種複雜性抽象化，例如，使用建構在 RPC 介面之上的函式庫，如 [web3.js](https://web3js.readthedocs.io/) 和 [web3.py](https://github.com/ethereum/web3.py)。 雖然在抽象化之後，一般來說比較容易理解和較不易出錯，但理解在後台發生了什麼是有益的。

以下是一個名為 `Multiply7` 的簡單智能合約，將使用 JSON-RPC 介面部署到以太坊節點。 本教學假設讀者已經執行一個 Geth 節點。 有關節點和用戶端的更多資訊，請參閱[此處](/developers/docs/nodes-and-clients/run-a-node)。 請參閱個別[用戶端](/developers/docs/nodes-and-clients/)文件，以了解如何為非 Geth 用戶端啟動 HTTP JSON-RPC。 大多數用戶端預設在 `localhost:8545` 上提供服務。

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

首先，確定啟用了 HTTP 遠端程序呼叫介面。 這表示我們在啟動時為 Geth 提供 `--http` 旗標。 在這個例子中，我們使用私有開發鏈的 Geth 節點。 使用這個方法，將不需要真實網路上的以太幣。

```bash
geth --http --dev console 2>>geth.log
```

這將在 `http://localhost:8545` 上啟動 HTTP RPC 介面。

我們可以使用 [curl](https://curl.se) 擷取 coinbase 位址 (透過取得帳戶陣列中的第一個位址) 和餘額，來驗證介面是否正在執行。 請注意，這些範例中的資料與你的本地節點有所不同。 如果你想嘗試這些命令，請將第二個 curl 請求中的請求參數替換為第一個請求返回的結果。

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

由於數字是十六進位編碼的，因此餘額以十六進位字串形式形式傳回（單位為 wei）。 如果想要以數位形式獲得以太幣餘額，可以使用 Geth 控制台中的 web3。

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

現在我們的私有開發鏈上有一些以太幣，我們可以部署合約了。 第一步是把 Multiply7 合約編譯成可以傳送到以太坊虛擬機的字元組程式碼。 若要安裝 Solidity 編譯器 solc，請遵循 [Solidity 文件](https://docs.soliditylang.org/en/latest/installing-solidity.html)。 (您可能需要使用較舊的 `solc` 版本，以符合[我們範例中使用的編譯器版本](https://github.com/ethereum/solidity/releases/tag/v0.4.20)。)

下一步是將 Multiply7 合約編譯成可傳送至 EVM 的位元組碼。

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

現在我們有了編譯後的程式碼，我們需要確定部署程式碼需要花費多少燃料。 RPC 介面有一個 `eth_estimateGas` 方法，可以提供我們一個估計值。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

最後部署合約。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

交易被節點接受且傳回交易雜湊值。 雜湊值可以用來追蹤交易。 下一步是確定將合約部署至的地址。 每一個被執行的交易將會產生一份收據。 此收據包含各種關於交易的資訊，例如：交易包含在哪一個區塊中，以及以太坊虛擬機使用多少燃料。 假如交易建立一個合約，交易也將包含合約地址。 我們可以使用 `eth_getTransactionReceipt` RPC 方法擷取收據。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

我們的合約建立於 `0x4d03d617d700cf81935d7f797f4e2ae719648262`。 結果為 null 而不是收據時，表示交易尚未列入區塊中。 稍等一下，並檢查你的共識用戶端是否正常執行，然後重試一次。

#### 與智能合約互動 {#interacting-with-smart-contract}

在此範例中，我們將使用 `eth_sendTransaction` 將交易傳送到合約的 `multiply` 方法。

`eth_sendTransaction` 需要幾個引數，特別是 `from`、`to` 和 `data`。 `From` 是我們帳戶的公開位址，`to` 是合約位址。 `data` 引數包含一個有效負載，定義了必須呼叫哪個方法以及使用哪些引數。 這就是 [ABI (應用程式二進位介面)](https://docs.soliditylang.org/en/latest/abi-spec.html) 發揮作用的地方。 應用程式二進位介面是定義如何為以太坊虛擬機定義和編碼資料的 JSON 檔案。

有效負載中的位元組定義要呼叫合約中的哪個方法。 這是函式名稱及其引數類型的 Keccak 雜湊值的前 4 個位元組（十六進位編碼）。 Multiply 函式接受 uint，它是 uint256 的別名。 我們得到以下結果：

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

下一步是對引數進行編碼。 只有一個 uint256，例如值 6。 應用程式二進制介面有一個部分指定如何對 uint256 類型進行編碼。

`int<M>`: `enc(X)` 是 X 的大序二補數編碼，對於負數 X，在高位（左側）填充 0xff；對於正數 X，則填充零位元組，使長度成為 32 位元組的倍數。

這會編碼為 `0000000000000000000000000000000000000000000000000000000000000006`。

結合函式選擇器和編碼引數，我們的資料將是 `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`。

現在可將其傳送到節點：

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

由於傳送了交易，因此傳回了交易雜湊值。 擷取收據得到以下內容：

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

收據包含了日誌。 此日誌由以太坊虛擬機在交易執行時產生並包含在收據中。 `multiply` 函式顯示，當輸入乘以 7 時，會引發 `Print` 事件。 由於 `Print` 事件的引數是 uint256，我們可以根據 ABI 規則對其進行解碼，這將得到預期的十進位 42。 除了資料之外，值得注意的是，主題可用於確定哪個事件建立了日誌：

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

這只是對一些最常見任務的簡要介紹，演示了 JSON-RPC 的直接使用。

## 相關主題 {#related-topics}

- [JSON-RPC 規範](http://www.jsonrpc.org/specification)
- [節點和用戶端](/developers/docs/nodes-and-clients/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [後端 API](/developers/docs/apis/backend/)
- [執行用戶端](/developers/docs/nodes-and-clients/#execution-clients)
