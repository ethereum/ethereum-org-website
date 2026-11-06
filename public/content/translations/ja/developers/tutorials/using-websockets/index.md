---
title: "WebSocketの使用"
description: "任意のイーサリアムノードプロバイダーを使用して、JSON-RPCリクエストを行い、イベントをサブスクライブするためのWebSocketの使用ガイド。"
author: "エラン・ハルパーン"
lang: ja
tags: ["Alchemy", "WebSocket", "クエリ", "JavaScript"]
skill: beginner
breadcrumb: WebSocket
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

これは、WebSocketを使用してイーサリアムブロックチェーンにリクエストを行うための入門ガイドです。例では標準のJSON-RPCメソッドを使用しているため、Alchemyを含む、WebSocketエンドポイントを提供する任意のノードまたはノードプロバイダーで機能します。

## WebSocketとHTTPの比較 {#websockets-vs-http}

HTTPとは異なり、WebSocketを使用すると、特定の情報が必要なときに継続的にリクエストを行う必要はありません。WebSocketは（正しく実装されていれば）ネットワーク接続を維持し、変更をリッスンします。

他のネットワーク接続と同様に、WebSocketが中断されることなく永久に開いたままであると想定すべきではありませんが、切断された接続の処理や手動での再接続を正しく行うのは難しい場合があります。WebSocketのもう1つの欠点は、レスポンスでHTTPステータスコードを取得できず、エラーメッセージのみが返されることです。

クライアントライブラリは、これを代わりに処理してくれます。たとえば、[ViemのWebSocketトランスポート](https://viem.sh/docs/clients/transports/websocket)は、ソケットの障害時に再接続し、デフォルトでキープアライブのpingを送信します。

## 試してみる {#try-it-out}

イーサリアムノードのWebSocket URLが必要です。ノードプロバイダーは、アプリケーション・プログラミング・インターフェース（API）キーを作成する際に、通常`wss://<provider-host>/<your-api-key>`の形式でURLを提供します。たとえば、Alchemyのイーサリアム・メインネットのURLは`wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>`のようになります（[無料のAlchemyアカウントに登録する](https://auth.alchemy.com/signup)）。他のプロバイダーについては[サービスとしてのノード](/developers/docs/nodes-and-clients/nodes-as-a-service/)を参照するか、[独自のノード](/developers/docs/nodes-and-clients/run-a-node/)のWebSocketエンドポイントを使用してください。`wss://ethereum-rpc.publicnode.com`のようなパブリックエンドポイントも簡単な実験には機能しますが、レート制限があり、すべてのサブスクリプションタイプをサポートしているわけではありません。

WebSocketをテストする最も簡単な方法は、[wscat](https://github.com/websockets/wscat)などのWebSocketリクエストを行うためのコマンドラインツールをインストールすることです。wscatを使用すると、次のようにリクエストを送信できます。

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

`>`で始まる行は入力する内容であり、`<`で始まる行はノードが送り返す内容です。

## WebSocketの使用方法 {#how-to-use-websockets}

まず、プロバイダーのWebSocket URLを使用してWebSocketを開きます。Alchemyの場合、[ダッシュボード](https://dashboard.alchemy.com/)でアプリを開き、そのアプリケーション・プログラミング・インターフェース（API）キーを表示することで見つけることができます。ほとんどのプロバイダーは両方に同じAPIキーを使用しますが、WebSocketのURL（`wss://`）はHTTPリクエストのURL（`https://`）とは異なることに注意してください。

![AlchemyダッシュボードでWebSocket URLを見つける場所](./use-websockets.mp4#602x280)

プロバイダーがサポートする任意の[JSON-RPCメソッド](/developers/docs/apis/json-rpc/)をWebSocket経由で使用できます。これを行うには、HTTP POSTリクエストの本文として送信されるのと同じペイロードを使用しますが、代わりにそのペイロードをWebSocket経由で送信します。

## Web3での使用 {#with-web3}

[Viem](https://viem.sh/)のようなクライアントライブラリを使用しながらWebSocketに移行するのは簡単です。`http`トランスポートの代わりに、WebSocket URLを指定して`webSocket`トランスポートを使用します。たとえば、`npm install viem`を実行した後、これを`index.mjs`として保存し、`node index.mjs`を実行します。

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// 同じWebSocket経由で新しいブロックをサブスクライブする
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## サブスクリプションAPI {#subscription-api}

WebSocket経由で接続している場合、`eth_subscribe`と`eth_unsubscribe`の2つの追加メソッドを使用できます。これらのメソッドを使用すると、特定のイベントをリッスンし、すぐに通知を受け取ることができます。

### `eth_subscribe` {#eth-subscribe}

指定されたイベントの新しいサブスクリプションを作成します。[`eth_subscribe`の詳細はこちら](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub)。

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

1. `newHeads`

チェーンのリオーグ中を含め、新しいヘッダーがチェーンに追加されるたびにイベントを発行します。

チェーンのリオーグが発生した場合、このサブスクリプションは新しいチェーンのすべての新しいヘッダーを含むイベントを発行します。特に、これは同じ高さで複数のヘッダーが発行されるのを見る可能性があることを意味し、これが発生した場合、後のヘッダーをリオーグ後の正しいものとして扱う必要があります。

例：

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

指定されたフィルター条件に一致する、新しく追加されたブロックの一部であるログを発行します。

チェーンのリオーグが発生した場合、古いチェーンのブロックの一部であるログは、`removed`プロパティが`true`に設定されて再度発行されます。さらに、新しいチェーンのブロックの一部であるログが発行されるため、リオーグの場合、同じトランザクションのログを複数回見る可能性があります。

パラメータ

1. 以下のフィールドを持つオブジェクト：
   - `address`（オプション）：アドレスを表す文字列、またはそのような文字列の配列。
     - これらのアドレスのいずれかから作成されたログのみが発行されます。
   - `topics`：トピック指定子の配列。
     - 各トピック指定子は、`null`、トピックを表す文字列、または文字列の配列のいずれかです。
     - 配列内の`null`ではない各位置は、発行されるログを、その位置に指定されたトピックのいずれかを持つもののみに制限します。

トピック指定の例：

- `[]`：任意のトピックが許可されます。
- `[A]`：最初の位置にA（およびそれ以降は任意）。
- `[null, B]`：最初の位置は任意で、2番目の位置にB（およびそれ以降は任意）。
- `[A, B]`：最初の位置にA、2番目の位置にB（およびそれ以降は任意）。
- `[[A, B], [A, B]]`：最初の位置に（AまたはB）、2番目の位置に（AまたはB）（およびそれ以降は任意）。

例：

この例では、イーサリアム・メインネット上の[ラップド・イーサ（WETH）コントラクト](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)からの`Deposit`イベントをリッスンします。

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

ノードの保留中の状態（メンプール）に追加された各トランザクションのハッシュを発行します。

例：

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

一部のプロバイダーは、独自のサブスクリプションタイプも提供しています。たとえば、Alchemyの[`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions)は、ハッシュだけでなく<em>完全なトランザクションオブジェクト</em>を発行し、オプションの`fromAddress`、`toAddress`、および`hashesOnly`フィルターを受け入れます。これらは標準のJSON-RPCアプリケーション・プログラミング・インターフェース（API）の一部ではないため、そのプロバイダーでのみ機能します。

### `eth_unsubscribe` {#eth-unsubscribe}

既存のサブスクリプションをキャンセルし、それ以降イベントが送信されないようにします。

パラメータ

1. 以前に`eth_subscribe`呼び出しから返されたサブスクリプションID。

戻り値

サブスクリプションが正常にキャンセルされた場合は`true`、指定されたIDのサブスクリプションが存在しなかった場合は`false`。

サブスクリプションは、それを作成したWebSocket接続上にのみ存在するため、`eth_unsubscribe`は同じ接続を介して送信する必要があります。別のHTTPリクエストとして送信することはできません。接続を閉じると、そのすべてのサブスクリプションもキャンセルされます。

例：

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

無料で[Alchemyに登録](https://auth.alchemy.com)し、[Alchemyのドキュメント](https://www.alchemy.com/docs/)を確認してください。最新ニュースについては、[ツイッター](https://x.com/Alchemy)でAlchemyをフォローしてください。
