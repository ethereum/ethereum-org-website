---
title: WebSocketの使用
description: WebSocketとAlchemyを使用してJSON-RPCリクエストを行い、イベントをサブスクライブするためのガイド。
author: "エラン・ハルパーン"
lang: ja
tags: ["alchemy", "WebSocket", "クエリ", "javascript"]
skill: beginner
breadcrumb: WebSocket
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

これは、WebSocketとAlchemyを使用してイーサリアムブロックチェーンにリクエストを行うための入門ガイドです。

## WebSocketとHTTPの比較 {#websockets-vs-http}

HTTPとは異なり、WebSocketを使用すると、特定の情報が必要なときに継続的にリクエストを行う必要はありません。WebSocketは（正しく行われれば）ネットワーク接続を維持し、変更をリッスンします。

他のネットワーク接続と同様に、WebSocketが中断されることなく永久に開いたままであると想定すべきではありませんが、切断された接続の処理と再接続を手動で正しく行うことは難しい場合があります。WebSocketのもう1つの欠点は、レスポンスでHTTPステータスコードを取得できず、エラーメッセージのみを取得することです。

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview)は、設定不要でWebSocketの失敗と再試行の処理を自動的に追加します。

## 試してみる {#try-it-out}

WebSocketをテストする最も簡単な方法は、[wscat](https://github.com/websockets/wscat)などのWebSocketリクエストを行うためのコマンドラインツールをインストールすることです。wscatを使用すると、次のようにリクエストを送信できます。

_注：Alchemyアカウントをお持ちの場合は、`demo`をご自身のAPIキーに置き換えることができます。[無料のAlchemyアカウントの登録はこちらから！](https://auth.alchemy.com/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}
```

## WebSocketの使用方法 {#how-to-use-websockets}

まず、アプリのWebSocket URLを使用してWebSocketを開きます。アプリのWebSocket URLは、[ダッシュボード](https://dashboard.alchemy.com/)でアプリのページを開き、「View Key」をクリックすることで確認できます。アプリのWebSocket用URLはHTTPリクエスト用URLとは異なりますが、どちらも「View Key」をクリックすることで確認できます。

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.gif)

[Alchemy APIリファレンス](https://www.alchemy.com/docs/reference/api-overview)に記載されているAPIはすべて、WebSocket経由で使用できます。これを行うには、HTTP POSTリクエストの本文として送信されるのと同じペイロードを使用しますが、代わりにそのペイロードをWebSocket経由で送信します。

## Web3を使用する場合 {#with-web3}

Web3のようなクライアントライブラリを使用しながらWebSocketに移行するのは簡単です。Web3クライアントをインスタンス化する際に、HTTPのURLの代わりにWebSocketのURLを渡すだけです。例：

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## サブスクリプションAPI {#subscription-api}

WebSocket経由で接続している場合、`eth_subscribe`と`eth_unsubscribe`の2つの追加メソッドを使用できます。これらのメソッドを使用すると、特定のイベントをリッスンし、すぐに通知を受け取ることができます。

### `eth_subscribe` {#eth-subscribe}

指定されたイベントの新しいサブスクリプションを作成します。[`eth_subscribe`の詳細はこちら](https://docs.alchemy.com/reference/eth-subscribe)。

#### パラメータ {#parameters}

1. サブスクリプションタイプ
2. オプションのパラメータ

最初の引数は、リッスンするイベントのタイプを指定します。2番目の引数には、最初の引数に依存する追加のオプションが含まれます。さまざまなサブスクリプションタイプ、そのオプション、およびイベントペイロードについて以下で説明します。

#### 戻り値 {#returns}

サブスクリプションID：このIDは受信したすべてのイベントに添付され、`eth_unsubscribe`を使用してサブスクリプションをキャンセルするためにも使用できます。

#### サブスクリプションイベント {#subscription-events}

サブスクリプションがアクティブな間、以下のフィールドを持つオブジェクトであるイベントを受信します。

- `jsonrpc`: 常に "2.0"
- `method`: 常に "eth_subscription"
- `params`: 以下のフィールドを持つオブジェクト：
  - `subscription`: このサブスクリプションを作成した`eth_subscribe`呼び出しによって返されたサブスクリプションID。
  - `result`: サブスクリプションのタイプによって内容が異なるオブジェクト。

#### サブスクリプションタイプ {#subscription-types}

1. `alchemy_newFullPendingTransactions`

保留中の状態に追加されたすべてのトランザクションのトランザクション情報を返します。このサブスクリプションタイプは、標準のWeb3呼び出しである`web3.eth.subscribe("pendingTransactions")`と同様に保留中のトランザクションをサブスクライブしますが、トランザクションハッシュだけでなく_完全なトランザクション情報_を出力する点が異なります。

例：

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

チェーンの再編成（リオーグ）中を含め、新しいヘッダーがチェーンに追加されるたびにイベントを出力します。

チェーンのリオーグが発生した場合、このサブスクリプションは新しいチェーンのすべての新しいヘッダーを含むイベントを出力します。具体的には、同じ高さで複数のヘッダーが出力される場合があり、これが発生した場合は、後のヘッダーをリオーグ後の正しいヘッダーとして扱う必要があります。

例：

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

指定されたフィルター条件に一致する、新しく追加されたブロックの一部であるログを出力します。

チェーンのリオーグが発生した場合、古いチェーンのブロックの一部であるログは、プロパティ`removed`が`true`に設定されて再度出力されます。さらに、新しいチェーンのブロックの一部であるログが出力されるため、リオーグの場合には同じトランザクションのログが複数回表示される可能性があります。

パラメータ

1. 以下のフィールドを持つオブジェクト：
   - `address` (オプション): アドレスを表す文字列、またはそのような文字列の配列。
     - これらのアドレスのいずれかから作成されたログのみが出力されます。
   - `topics`: トピック指定子の配列。
     - 各トピック指定子は、`null`、トピックを表す文字列、または文字列の配列のいずれかです。
     - 配列内の`null`ではない各位置は、出力されるログを、その位置に指定されたトピックのいずれかを持つもののみに制限します。

トピック指定の例：

- `[]`: 任意のトピックを許可。
- `[A]`: 最初の位置にA（およびそれ以降は任意）。
- `[null, B]`: 最初の位置は任意で、2番目の位置にB（およびそれ以降は任意）。
- `[A, B]`: 最初の位置にA、2番目の位置にB（およびそれ以降は任意）。
- `[[A, B], [A, B]]`: 最初の位置に（AまたはB）、2番目の位置に（AまたはB）（およびそれ以降は任意）。

例：

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

既存のサブスクリプションをキャンセルし、それ以降のイベントが送信されないようにします。

パラメータ

1. 以前に`eth_subscribe`呼び出しから返されたサブスクリプションID。

戻り値

サブスクリプションが正常にキャンセルされた場合は`true`、指定されたIDのサブスクリプションが存在しなかった場合は`false`。

例：

**リクエスト**

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

無料で[Alchemyに登録](https://auth.alchemy.com)し、[ドキュメント](https://www.alchemy.com/docs/)を確認してください。最新ニュースについては、[ツイッター](https://x.com/AlchemyPlatform)でフォローしてください。