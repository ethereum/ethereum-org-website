---
title: WebSocketを利用する
description: WebSocketsとAlchemyを使って、JSON-RPCリクエストを作成し、イベントを講読するためのガイド
author: "Elan Halpern"
lang: ja
tags:
  - "Alchemy"
  - "WebSockets"
  - "クエリ"
  - "JavaScript"
skill: beginner
source: Alchemy ドキュメント
sourceUrl: https://docs.alchemyapi.io/guides/using-websockets
published: 2020-12-01
---

このガイドでは、初級者向けに、WebSocket と Alchemy を使ってイーサリアムブロックチェーンにリクエストを送信する方法を学びます。

## WebSocket と HTTP の比較 {#websockets-vs-http}

HTTP とは異なり、WebSocket では特定の情報が必要な場合にリクエストを継続的に実行する必要はありません。 WebSocket では、正しく設定されていれば、ネットワーク接続が継続され、変更をリッスンすることができます。

どのネットワーク接続でも同様ですが、WebSocket が中断なしに永続的にオープンであると想定すべきではありませんが、手動で切断された接続に適切に対処し、再接続するのは手間がかかる場合があります。 WebSocket のもう一つの欠点は、応答にはエラーメッセージのみが含まれ、HTTP ステータスコードを取得できないという点です。

​[Alchemy Web3](https://docs.alchemy.com/reference/api-overview)を利用することで、WebSocket の接続失敗に自動的に対応し、設定なしでリトライさせることができます。

## さっそく試してましょう {#try-it-out}

WebSocket をテストする最も簡単な方法は、[wscat](https://github.com/websockets/wscat)などの WebSocket リクエストを行うためのコマンドラインツールをインストールすることです。 wscat を使って、次のようにリクエストを送ります：

_注意：Alchemy アカウントをお持ちの場合は、 `demo`をあなたの API キーに置き換えてください。 [こちら](https://auth.alchemyapi.io/signup)で、Alchemy の無料アカウントを作成できます。_

```
$ wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## WebSocket の使用方法 {#how-to-use-websockets}

まず、アプリに WebSocket の URL を入力して WebSocket を開きます。 アプリの WebSocket URL を確認するには、[ダッシュボード](https://dashboard.alchemyapi.io/)の App ページを開き、「View Key」をクリックしてください。 アプリの WebSocket 用 URL は HTTP リクエスト用の URL とは異なっており、両方とも「View Key」で確認できる点に注意してください。

![AlchemyのダッシュボードでWebSocket URLを確認できる場所](./use-websockets.gif)

[Alchemy API レファレンス](https://docs.alchemyapi.io/documentation/alchemy-api-reference/)に記載されている API は、いずれも WebSocket 経由で使用可能です。 これには、HTTP POST リクエストの本文として送信する場合と同じペイロードを使用しますが、このペイロードを WebSocket 経由で送信します。

## Web3 での WebSocket 使用方法 {#with-web3}

Web3 のようなクライアント向けライブラリを使用する場合、WebSocket への移行は簡単です。 Web3 クライアントのインスタンスを作成する際に、HTTP URL ではなく WebSocket URL を渡すだけでよいです。 以下の例をご覧ください：

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API を講読する {#subscription-api}

WebSocket 経由で接続する場合、`eth_subscribe`および`eth_unsubscribe`という 2 つの追加メソッドを使用できます。 これらのメソッドを使用することで、特定のイベントをリッスンし、すぐに通知を受け取ることができるようになります。

### `eth_subscribe` {#eth-subscribe}

特定のイベントを対象とする新規のサブスクリプションを作成しましょう。 `eth_subscribe`の詳細については、[こちら](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_subscribe)をご覧ください。

#### パラメータ {#parameters}

1. サブスクリプションの種類
2. オプションのパラメータ

最初の引数では、リッスンするイベントのタイプを指定します。 2 番目の引数では、最初の引数に依存したオプションを追加します。 以下では、説明タイプ、タイプ別のオプション、およびイベントのペイロードについて説明します。

#### 戻り値 {#returns}

サブスクリプション ID：この ID は、受信したすべてのイベントに付与されるもので、`eth_unsubscribe`を使用してサブスクリプションを取り消すする際にも使用します。

#### サブスクリプション関連のイベント {#subscription-events}

サブスクリプションが有効である場合、以下のフィールドを含むオブジェクトであるイベントが送信されます：

- `jsonrpc`: 常に「2.0」です。
- `method`: 常に「eth_subscription」です。
- `params`：以下のフィールドを含むオブジェクトです：
  - `subscription`：このサブスクリプションを作成した`eth_subscription`の呼び出しが返したサブスクリプション ID です。
  - `result`：サブスクリプションのタイプによって内容が異なるオブジェクトです。

#### サブスクリプションのタイプ {#subscription-types}

1. `alchemy_newFullPendingTransactions`

保留状態に追加されたすべてのトランザクションにつき、トランザクション情報を返します。 このサブスクリプションタイプは保留中のトランザクションを講読するため、Web3 の標準的な呼び出しである`web3.eth.subscribe("pendingTransactions")`と似ていますが、トランザクションのハッシュだけでなく*トランザクションの完全な情報*を発行するという点が異なります。

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

ブロックチェーンの再編成時も含む、ブロックチェーンに新たなヘッダーが追加された際に常にイベントを発行します。

このサブスクリプションでは、ブロックチェーンの再編成が実行された場合に、新たなチェーンに対するすべてのヘッダーを含むイベントが発行されます。 特に、同じ高さを持つ複数のヘッダーが発行される場合があるため、このような状況が発生した場合は、より後ろのヘッダーを再編成後の適切なヘッダーと見なす必要があります。

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

3. `ログ類`

新たに追加されたブロックのうち、指定したフィルター条件に合致した部分のログを発行します。

チェーンの再構成が発生した場合、`removed`のプロパティを`true`に設定すれば、古いチェーン上のブロックに含まれたログも再度発行されます。 さらに新しいチェーン上のブロックに含まれるログも発行されるため、再編成時には、同一のトランザクションのログが複数回表示される場合があります。

パラメータ

1. 以下のフィールドを持つオブジェクトです：
   - `address`（オプション）：アドレスを表す文字列あるいは、そのような文字列の配列です。
     - これらのアドレスのいずれかで作成したログのみが発行されます。
   - `topics`：トピック指定子の配列です。
     - トピック指定子は、`null`、トピックを表す文字列、または文字列の配列のいずれかです。
     - 配列において`null`ではない各位置は、当該の位置において与えられたトピックのひとつを持つユーザーだけにログを発行します。

トピック仕様の例：

- `[]`：すべてのトピックを許可します。
- `[A]`：最初の位置が A である（その後の位置については条件なし）。
- `[null, B]`：最初の位置は条件なしで、かつ 2 番目の位置が B である（その後の位置については条件なし）。
- `[A, B]`：最初の位置が A であり、2 番目の位置が B (その後の位置については条件なし) 。
- `[[A, B], [A, B]]`: 最初の位置が (A または B)、かつ 2 番目の位置が (A または B) (その後の位置については条件なし)

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

新たにイベントが送信されないように、既存のサブスクリプションを取り消します。

パラメータ

1. 以前に`eth_subscribe`呼び出しで返されたサブスクリプションの ID です。

戻り値

サブスクリプションのキャンセルに成功した場合に`true`、または渡された ID のサブスクリプションが存在しない場合に`false`が返ります。

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

無料で[Alchemy に登録し](https://auth.alchemyapi.io/signup)、[ドキュメント](https://docs.alchemyapi.io/)を確認しましょう。また[Twitter](https://twitter.com/AlchemyPlatform)をフォローして最新のニュースをチェックしてください。
