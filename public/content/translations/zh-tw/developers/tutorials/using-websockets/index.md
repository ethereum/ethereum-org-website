---
title: 使用 WebSockets
description: 使用 WebSockets 與 Alchemy 發送 JSON-RPC 請求並訂閱事件的指南。
author: "伊蘭·哈爾彭"
lang: zh-tw
tags: ["alchemy", "websockets", "查詢", "javascript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

這是一篇入門指南，介紹如何使用 WebSockets 與 Alchemy 向以太坊區塊鏈發送請求。

## WebSockets 與 HTTP 的比較 {#websockets-vs-http}

與 HTTP 不同，使用 WebSockets 時，你不需要在想要獲取特定資訊時不斷發送請求。WebSockets 會為你維持網路連線（如果設定正確的話）並監聽變更。

如同任何網路連線一樣，你不應假設 WebSocket 會永遠保持開啟而不中斷，但手動正確處理斷線與重新連線可能會是一項挑戰。WebSockets 的另一個缺點是，你不會在回應中獲得 HTTP 狀態碼，而只會收到錯誤訊息。

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) 會自動加入對 WebSocket 失敗與重試的處理，無需任何設定。

## 試試看 {#try-it-out}

測試 WebSockets 最簡單的方法是安裝一個用於發送 WebSocket 請求的命令列工具，例如 [wscat](https://github.com/websockets/wscat)。使用 wscat，你可以如下發送請求：

_注意：如果你有 Alchemy 帳戶，可以將 `demo` 替換為你自己的 API 金鑰。[在此註冊免費的 Alchemy 帳戶！](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## 如何使用 WebSockets {#how-to-use-websockets}

首先，使用你應用程式的 WebSocket URL 開啟一個 WebSocket。你可以在 [你的儀表板](https://dashboard.alchemy.com/) 中開啟應用程式頁面並點擊「View Key」來找到應用程式的 WebSocket URL。請注意，你的應用程式的 WebSocket URL 與 HTTP 請求的 URL 不同，但兩者都可以透過點擊「View Key」找到。

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

[Alchemy API 參考文件](https://www.alchemy.com/docs/reference/api-overview) 中列出的任何 API 都可以透過 WebSocket 使用。為此，請使用與 HTTP POST 請求主體相同的有效負載 (payload)，但改為透過 WebSocket 發送該有效負載。

## 使用 Web3 {#with-web3}

在使用像 Web3 這樣的客戶端函式庫時，轉換到 WebSockets 非常簡單。只需在實例化你的 Web3 客戶端時，傳入 WebSocket URL 而不是 HTTP URL 即可。例如：

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## 訂閱 API {#subscription-api}

透過 WebSocket 連線時，你可以使用兩個額外的方法：`eth_subscribe` 與 `eth_unsubscribe`。這些方法將允許你監聽特定事件並立即收到通知。

### `eth_subscribe` {#eth-subscribe}

為指定的事件建立新的訂閱。[了解更多關於 `eth_subscribe` 的資訊](https://docs.alchemy.com/reference/eth-subscribe)。

#### 參數 {#parameters}

1. 訂閱類型
2. 選擇性參數

第一個參數指定要監聽的事件類型。第二個參數包含取決於第一個參數的額外選項。不同的訂閱類型、其選項以及其事件有效負載說明如下。

#### 回傳值 {#returns}

訂閱 ID：此 ID 將附加到任何接收到的事件中，也可以用來透過 `eth_unsubscribe` 取消訂閱。

#### 訂閱事件 {#subscription-events}

當訂閱處於活動狀態時，你將收到事件，這些事件是具有以下欄位的物件：

- `jsonrpc`：始終為 "2.0"
- `method`：始終為 "eth_subscription"
- `params`：具有以下欄位的物件：
  - `subscription`：由建立此訂閱的 `eth_subscribe` 呼叫所回傳的訂閱 ID。
  - `result`：其內容根據訂閱類型而有所不同的物件。

#### 訂閱類型 {#subscription-types}

1. `alchemy_newFullPendingTransactions`

回傳所有新增至待處理狀態的交易資訊。此訂閱類型會訂閱待處理交易，類似於標準的 Web3 呼叫 `web3.eth.subscribe("pendingTransactions")`，但不同之處在於它會發出_完整的交易資訊_，而不僅僅是交易雜湊。

範例：

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

每當有新的區塊標頭新增至鏈上時（包括在區塊鏈重組期間），就會發出一個事件。

當發生區塊鏈重組時，此訂閱將發出一個包含新鏈所有新區塊標頭的事件。特別是，這意味著你可能會看到多個具有相同高度的區塊標頭被發出，當這種情況發生時，應將較晚發出的區塊標頭視為重組後的正確標頭。

範例：

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

發出屬於符合指定過濾條件的新增區塊一部分的日誌。

當發生區塊鏈重組時，屬於舊鏈上區塊一部分的日誌將再次被發出，且其屬性 `removed` 會被設定為 `true`。此外，屬於新鏈上區塊一部分的日誌也會被發出，這意味著在發生重組的情況下，可能會多次看到同一筆交易的日誌。

參數

1. 具有以下欄位的物件：
   - `address`（選擇性）：代表地址的字串或此類字串的陣列。
     - 只有從這些地址之一建立的日誌才會被發出。
   - `topics`：主題指定符的陣列。
     - 每個主題指定符可以是 `null`、代表主題的字串或字串陣列。
     - 陣列中非 `null` 的每個位置，會將發出的日誌限制為僅包含在該位置具有給定主題之一的日誌。

主題指定的一些範例：

- `[]`：允許任何主題。
- `[A]`：A 在第一個位置（以及之後的任何內容）。
- `[null, B]`：任何內容在第一個位置，且 B 在第二個位置（以及之後的任何內容）。
- `[A, B]`：A 在第一個位置，且 B 在第二個位置（以及之後的任何內容）。
- `[[A, B], [A, B]]`：（A 或 B）在第一個位置，且（A 或 B）在第二個位置（以及之後的任何內容）。

範例：

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

取消現有的訂閱，以便不再發送任何事件。

參數

1. 訂閱 ID，如先前從 `eth_subscribe` 呼叫中所回傳的。

回傳值

如果成功取消訂閱則回傳 `true`，如果不存在具有給定 ID 的訂閱則回傳 `false`。

範例：

**請求**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'
```

**結果**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

免費 [註冊 Alchemy](https://auth.alchemy.com)，查看 [我們的文件](https://www.alchemy.com/docs/)，並在 [推特](https://x.com/AlchemyPlatform) 上追蹤我們以獲取最新消息。