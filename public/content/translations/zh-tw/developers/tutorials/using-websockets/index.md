---
title: "使用 WebSockets"
description: "使用 WebSockets 透過任何以太坊節點提供者發出 JSON-RPC 請求並訂閱事件的指南。"
author: "伊蘭·哈爾彭"
lang: zh-tw
tags: ["Alchemy", "websockets", "查詢", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

這是一份使用 WebSockets 向以太坊區塊鏈發出請求的入門指南。這些範例使用標準的 JSON-RPC 方法，因此它們適用於任何提供 WebSocket 端點的節點或節點提供者，包括 Alchemy。

## WebSockets 與 HTTP 的比較 {#websockets-vs-http}

與 HTTP 不同，使用 WebSockets 時，當你需要特定資訊時，不需要持續發出請求。WebSockets 會為你維持網路連線（如果設定正確的話）並監聽變更。

與任何網路連線一樣，你不應假設 WebSocket 會永遠保持開啟而不中斷，但手動正確處理斷線和重新連線可能具有挑戰性。WebSockets 的另一個缺點是，你不會在回應中獲得 HTTP 狀態碼，而只會收到錯誤訊息。

客戶端函式庫可以為你處理這個問題。例如，[Viem 的 WebSocket 傳輸](https://viem.sh/docs/clients/transports/websocket)會在 socket 失敗時重新連線，並預設發送 keep-alive ping。

## 試試看 {#try-it-out}

你需要一個以太坊節點的 WebSocket URL。當你建立應用程式介面 (API) 金鑰時，節點提供者會給你一個，通常格式為 `wss://<provider-host>/<your-api-key>`。例如，Alchemy 的以太坊主網 URL 看起來像 `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>`（[註冊免費的 Alchemy 帳戶](https://auth.alchemy.com/signup)）。請參閱[節點即服務](/developers/docs/nodes-and-clients/nodes-as-a-service/)以了解其他提供者，或使用[你自己的節點](/developers/docs/nodes-and-clients/run-a-node/)的 WebSocket 端點。像 `wss://ethereum-rpc.publicnode.com` 這樣的公共端點也適用於快速實驗，但它們有速率限制，且可能不支援每種訂閱類型。

測試 WebSockets 最簡單的方法是安裝一個用於發出 WebSocket 請求的命令列工具，例如 [wscat](https://github.com/websockets/wscat)。使用 wscat，你可以如下發送請求：

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

以 `>` 開頭的行是你輸入的內容，以 `<` 開頭的行是節點傳回的內容。

## 如何使用 WebSockets {#how-to-use-websockets}

首先，使用你的提供者的 WebSocket URL 開啟 WebSocket。使用 Alchemy 時，你可以透過在[儀表板](https://dashboard.alchemy.com/)中開啟你的應用程式並檢視其應用程式介面 (API) 金鑰來找到它。請注意，WebSockets 的 URL (`wss://`) 與 HTTP 請求的 URL (`https://`) 不同，儘管大多數提供者對兩者使用相同的 API 金鑰。

![在你的 Alchemy 儀表板中哪裡可以找到你的 WebSocket URL](./use-websockets.mp4#602x280)

你的提供者支援的任何 [JSON-RPC 方法](/developers/docs/apis/json-rpc/)都可以透過 WebSocket 使用。為此，請使用與作為 HTTP POST 請求主體發送的相同有效負載，但改為透過 WebSocket 發送該有效負載。

## 使用 Web3 {#with-web3}

在使用像 [Viem](https://viem.sh/) 這樣的客戶端函式庫時，轉換到 WebSockets 很簡單。將 `webSocket` 傳輸與你的 WebSocket URL 一起使用，而不是使用 `http` 傳輸。例如，在 `npm install viem` 之後，將其儲存為 `index.mjs` 並執行 `node index.mjs`：

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// 透過同一個 WebSocket 訂閱新區塊
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## 訂閱 API {#subscription-api}

透過 WebSocket 連線時，你可以使用兩個額外的方法：`eth_subscribe` 與 `eth_unsubscribe`。這些方法將允許你監聽特定事件並立即收到通知。

### `eth_subscribe` {#eth-subscribe}

為指定的事件建立新的訂閱。[了解更多關於 `eth_subscribe` 的資訊](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub)。

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

1. `newHeads`

每當有新的標頭新增到鏈上時（包括在區塊鏈重組期間），就會發出一個事件。

當發生區塊鏈重組時，此訂閱將發出一個包含新鏈所有新標頭的事件。特別是，這意味著你可能會看到發出多個具有相同高度的標頭，當這種情況發生時，應將較晚的標頭視為重組後的正確標頭。

範例：

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

發出屬於新新增區塊且符合指定過濾條件的日誌。

當發生區塊鏈重組時，屬於舊鏈上區塊的日誌將再次發出，且其 `removed` 屬性設定為 `true`。此外，會發出屬於新鏈上區塊的日誌，這意味著在重組的情況下，可能會多次看到同一筆交易的日誌。

參數

1. 具有以下欄位的物件：
   - `address`（選擇性）：代表地址的字串或此類字串的陣列。
     - 只有從這些地址之一建立的日誌才會被發出。
   - `topics`：主題指定符的陣列。
     - 每個主題指定符可以是 `null`、代表主題的字串或字串陣列。
     - 陣列中非 `null` 的每個位置，會將發出的日誌限制為僅包含在該位置具有給定主題之一的日誌。

主題規格的一些範例：

- `[]`：允許任何主題。
- `[A]`：A 在第一個位置（以及之後的任何內容）。
- `[null, B]`：任何內容在第一個位置，B 在第二個位置（以及之後的任何內容）。
- `[A, B]`：A 在第一個位置，B 在第二個位置（以及之後的任何內容）。
- `[[A, B], [A, B]]`：（A 或 B）在第一個位置，且（A 或 B）在第二個位置（以及之後的任何內容）。

範例：

此範例監聽以太坊主網上 [WETH 合約](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)的 `Deposit` 事件：

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

發出新增到節點待處理狀態（其記憶體池）的每筆交易的雜湊。

範例：

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

一些提供者也提供他們自己的訂閱類型。例如，Alchemy 的 [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) 發出_完整的交易物件_而不僅僅是雜湊，並接受選擇性的 `fromAddress`、`toAddress` 和 `hashesOnly` 過濾器。這些不是標準 JSON-RPC 應用程式介面 (API) 的一部分，因此它們僅適用於該提供者。

### `eth_unsubscribe` {#eth-unsubscribe}

取消現有的訂閱，以便不再發送任何事件。

參數

1. 訂閱 ID，如先前從 `eth_subscribe` 呼叫所回傳。

回傳值

如果成功取消訂閱，則為 `true`；如果不存在具有給定 ID 的訂閱，則為 `false`。

訂閱僅存在於建立它的 WebSocket 連線上，因此必須透過該相同連線發送 `eth_unsubscribe`。它不能作為單獨的 HTTP 請求發送。關閉連線也會取消其所有訂閱。

範例：

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

免費[註冊 Alchemy](https://auth.alchemy.com)，查看 [Alchemy 的文件](https://www.alchemy.com/docs/)，如需最新消息，請在[推特](https://x.com/Alchemy)上追蹤 Alchemy。
