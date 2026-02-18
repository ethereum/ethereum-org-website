---
title: "使用WebSockets"
description: "利用WebSockets 及 Alchemy提交一JSON-RPC要求和事件訂閱之簡介."
author: "Elan Halpern"
lang: zh-tw
tags: [ "alchemy", "websockets", "querying", "javascript" ]
skill: beginner
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

此為一初級教學來指導你如何利用WebSockets 及 Alchemy來提交一請求於以太坊區塊鏈.

## WebSockets 與 HTTP 的比較 {#websockets-vs-http}

不像HTTP, 利用WebSockets, 你無須持續請求當想要一特定情報時. WebSockets 為你維持一網路連結(如使用正確) 並傾聽變化.

就如任何網絡連接一樣, 你不應該假設WebSocket永遠不間斷地保持打開狀態, 你應期盼其正確處理丟棄的連接和處理正確新連接可能為一挑戰. 另一WebSocket缺點為你不需要取得一HTTP狀態節點於一回覆, 你只需一錯誤訊息.

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) 會自動新增 WebSocket 故障和重試的處理，無需任何設定。

## 試用看看 {#try-it-out}

測試 WebSockets 最簡單的方法，是安裝用於發出 WebSocket 請求的命令列工具，例如 [wscat](https://github.com/websockets/wscat)。 使用wscat, 你將能傳送以下之請求:

_注意：如果您有 Alchemy 帳戶，可以用您自己的 API 金鑰取代 `demo`。 [在此註冊免費的 Alchemy 帳戶！](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## 如何使用 WebSockets {#how-to-use-websockets}

來開始, 為你的應用程式打開一WebSocket使用其URL. 您可以在[您的儀表板](https://dashboard.alchemy.com/)中打開應用程式的頁面，然後按一下「檢視金鑰」，即可找到您應用程式的 WebSocket URL。 值得注意的是, 你應用程式之WebSockets URL與其HTTP請求有所些微相異, 但雙方登能被發現當點擊"驗證鑰鍵".

![在您的 Alchemy 儀表板中尋找 WebSocket URL 的位置](./use-websockets.gif)

[Alchemy API 參考資料](https://www.alchemy.com/docs/reference/api-overview)中列出的任何 API 都可以透過 WebSocket 使用。 來達成此, 使用HTTP POST本文體相同之有效載荷, 且通過WebSocket傳送下載之有效載荷.

## 使用 Web3 {#with-web3}

轉換至WebSockets利用客戶圖書資料庫如Web3極為簡單. 簡單來通過WebSocket URL, 而非HTTP URL, 當轉換至Web3客戶. 例如：

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## 訂閱 API {#subscription-api}

透過 WebSocket 連線時，您可以使用另外兩種方法：`eth_subscribe` 和 `eth_unsubscribe`。 此方案需要你來傾聽特定事件並被立即通知.

### `eth_subscribe` {#eth-subscribe}

生成一新訂閱為專門特定事件. [進一步了解 `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe)。

#### 參數 {#parameters}

1. 訂閱類型
2. 可選參數

第一參數特定出傾聽事件之類型. 第二參數包含額外選項基於第一參數. 不同類型之訂閱類型, 選項, 及其事件有效載荷形容如下.

#### 傳回值 {#returns}

訂閱 ID：此 ID 將附加至任何收到的事件，也可用於透過 `eth_unsubscribe` 取消訂閱。

#### 訂閱事件 {#subscription-events}

當訂閱處於活動狀態, 你將接收一系列事件, 而其為物件於以下範圍:

- `jsonrpc`：一律為「2.0」
- `method`：一律為「eth_subscription」
- `params`：具有以下欄位的物件：
  - `subscription`：建立此訂閱的 `eth_subscribe` 呼叫所傳回的訂閱 ID。
  - `result`：一個物件，其內容會因訂閱類型而異。

#### 訂閱類型 {#subscription-types}

1. `alchemy_newFullPendingTransactions`

為所有被添加於等待狀態之交易回返一交易訊息. 此訂閱類型會訂閱待處理的交易，與標準 Web3 呼叫 `web3.eth.subscribe("pendingTransactions")` 類似，但不同之處在於，它會發出_完整的交易資訊_，而不僅僅是交易哈希。

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

隱藏式鍵當一新區塊頭被添加於鏈上, 或處於區塊認識途中程序時.

當一區塊認識發生, 此訂閱將隱藏一包含所有新區塊頭之事件. 特別是, 此意味著你可以見識到多個區塊頭發射至同一區塊高度, 而當發生這種情況時, 重整後的標題應將後面的標題視為認識後正確區塊頭.

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

發布日誌紀錄/logs當一新添增之區塊符合一特定要求.

發生鏈重組時，舊鏈上屬於區塊一部分的日誌將會再次發出，且屬性 `removed` 會設為 `true`。 更加延伸的話, 日誌為新鏈還區塊發佈時的一部分, 意旨此可在重組的情況下可以多次看到同一交易的日誌.

參數

1. 一物件具有以下可選之範圍:
   - `address` (選用)：代表地址的字串，或此類字串的陣列。
     - 此只能從其中一個地址創建之紀錄日誌才被發布.
   - `topics`：主題指定元的陣列。
     - 每個主題指定元可以是 `null`、代表主題的字串，或字串陣列。
     - 陣列中每個非 `null` 的位置，都會將發出的日誌限制為僅在該位置具有其中一個指定主題的日誌。

主題特定標註範例:

- `[]`：允許任何主題。
- `[A]`：A 在第一個位置 (後面接任何內容)。
- `[null, B]`：第一個位置為任何內容，B 在第二個位置 (後面接任何內容)。
- `[A, B]`：A 在第一個位置，B 在第二個位置 (後面接任何內容)。
- `[[A, B], [A, B]]`：(A 或 B) 在第一個位置，(A 或 B) 在第二個位置 (後面接任何內容)。

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

取消現行訂閱並避免未來事件被送發.

參數

1. 訂閱 ID，由先前的 `eth_subscribe` 呼叫傳回。

傳回

如果訂閱成功取消，則為 `true`；如果不存在具有指定 ID 的訂閱，則為 `false`。

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

免費[註冊 Alchemy](https://auth.alchemy.com)、查看[我們的文件](https://www.alchemy.com/docs/)，以及如欲了解最新消息，請在 [Twitter](https://x.com/AlchemyPlatform) 上關注我們。
