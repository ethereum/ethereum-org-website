---
title: JSON-RPC API
description: "イーサリアム・クライアント向けのステートレスで軽量なリモート・プロシージャ・コール（RPC）プロトコル。"
lang: ja
---

ソフトウェア・アプリケーションが[イーサリアム](/)・ブロックチェーンとやり取りするためには（ブロックチェーンのデータを読み取るにせよ、ネットワークにトランザクションを送信するにせよ）、イーサリアムのノードに接続する必要があります。

この目的のために、すべての[イーサリアム・クライアント](/developers/docs/nodes-and-clients/#execution-clients)は[JSON-RPC仕様](https://github.com/ethereum/execution-apis)を実装しています。これにより、特定のノードやクライアントの実装に関係なく、アプリケーションが依存できる統一されたメソッドのセットが提供されます。

[JSON-RPC](https://www.jsonrpc.org/specification)は、ステートレスで軽量なリモート・プロシージャ・コール（RPC）プロトコルです。いくつかのデータ構造と、その処理に関するルールを定義しています。トランスポートに依存しない性質を持ち、その概念は同一プロセス内、ソケット経由、HTTP経由、または様々なメッセージ・パッシング環境で使用できます。データ形式としてJSON（RFC 4627）を使用します。

## クライアントの実装 {#client-implementations}

イーサリアムのクライアントは、JSON-RPC仕様を実装する際に、それぞれ異なるプログラミング言語を使用する場合があります。特定のプログラミング言語に関連する詳細については、個々の[クライアントのドキュメント](/developers/docs/nodes-and-clients/#execution-clients)を参照してください。最新のAPIサポート情報については、各クライアントのドキュメントを確認することをお勧めします。

## 便利なライブラリ {#convenience-libraries}

JSON-RPC APIを介してイーサリアム・クライアントと直接やり取りすることもできますが、分散型アプリケーション (dapp) の開発者には、より簡単なオプションが用意されていることがよくあります。JSON-RPC APIのラッパーを提供する、多くの[JavaScript](/developers/docs/apis/javascript/#available-libraries)および[バックエンドAPI](/developers/docs/apis/backend/#available-libraries)ライブラリが存在します。これらのライブラリを使用すると、開発者は好みのプログラミング言語で直感的な1行のメソッドを記述し、イーサリアムとやり取りするJSON-RPCリクエストを（内部的に）初期化できます。

## コンセンサス・クライアントAPI {#consensus-clients}

このページでは主に、イーサリアムの実行クライアントで使用されるJSON-RPC APIについて説明します。しかし、コンセンサス・クライアントにもRPC APIがあり、ユーザーはノードに関する情報を照会したり、ビーコン・ブロック、ビーコン状態、その他のコンセンサス関連情報をノードから直接リクエストしたりすることができます。このAPIについては、[Beacon APIのウェブページ](https://ethereum.github.io/beacon-APIs/#/)で文書化されています。

ノード内のクライアント間通信には内部APIも使用されます。つまり、コンセンサス・クライアントと実行クライアントがデータをスワップできるようにします。これは「Engine API」と呼ばれ、その仕様は[GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)で公開されています。

## 実行クライアントの仕様 {#spec}

[GitHubでJSON-RPC APIの完全な仕様を読む](https://github.com/ethereum/execution-apis)。このAPIは[実行APIのウェブページ](https://ethereum.github.io/execution-apis/)に文書化されており、利用可能なすべてのメソッドを試すことができるインスペクターが含まれています。

## 規則 {#conventions}

### 16進数値のエンコーディング {#hex-encoding}

JSONを介して渡される主要なデータ型には、フォーマットされていないバイト配列と数量の2つがあります。どちらも16進数エンコーディングで渡されますが、フォーマットの要件が異なります。

#### 数量 {#quantities-encoding}

数量（整数、数値）をエンコードする場合: 16進数としてエンコードし、プレフィックスとして「0x」を付け、最もコンパクトな表現にします（わずかな例外として、ゼロは「0x0」として表現する必要があります）。

以下にいくつか例を示します。

- 0x41 (10進数で65)
- 0x400 (10進数で1024)
- 誤り: 0x (常に少なくとも1桁の数字が必要です。ゼロは「0x0」です)
- 誤り: 0x0400 (先頭にゼロを付けることはできません)
- 誤り: ff (プレフィックスとして0xを付ける必要があります)

### フォーマットされていないデータ {#unformatted-data-encoding}

フォーマットされていないデータ（バイト配列、アカウントのアドレス、ハッシュ、バイトコード配列）をエンコードする場合: 16進数としてエンコードし、プレフィックスとして「0x」を付け、1バイトにつき2桁の16進数を使用します。

以下にいくつか例を示します。

- 0x41 (サイズ1、「A」)
- 0x004200 (サイズ3、「0B0」)
- 0x (サイズ0、「」)
- 誤り: 0xf0f0f (偶数桁である必要があります)
- 誤り: 004200 (プレフィックスとして0xを付ける必要があります)

### ブロックパラメータ {#block-parameter}

以下のメソッドにはブロックパラメータがあります。

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

イーサリアムの状態を照会するリクエストが行われる際、提供されたブロックパラメータによってブロックの高さが決定されます。

ブロックパラメータには以下のオプションが可能です。

- `HEX String` - 整数のブロック番号
- `String "earliest"` - 最古のブロック／ジェネシス・ブロック
- `String "latest"` - 提案された最新のブロック
- `String "safe"` - 最新の安全なヘッドブロック
- `String "finalized"` - 最新のファイナライズ済みブロック
- `String "pending"` - 保留中の状態／トランザクション

## 例 {#examples}

このページでは、コマンドラインツールである[curl](https://curl.se)を使用して、個々のJSON_RPC APIエンドポイントを使用する方法の例を提供します。これらの個々のエンドポイントの例は、以下の[Curlの例](#curl-examples)セクションに記載されています。さらにページの下部では、Gethノード、JSON_RPC API、およびcurlを使用してスマート・コントラクトをコンパイルおよびデプロイするための[エンドツーエンドの例](#usage-example)も提供しています。

## Curlの例 {#curl-examples}

イーサリアム・ノードに対して[curl](https://curl.se)リクエストを行うことによるJSON_RPC APIの使用例を以下に示します。各例には、特定のエンドポイントの説明、そのパラメーター、戻り値の型、およびその使用方法の実際の例が含まれています。

curlリクエストは、コンテンツタイプに関連するエラーメッセージを返す場合があります。これは、`--data`オプションがコンテンツタイプを`application/x-www-form-urlencoded`に設定するためです。ノードがこれについてエラーを出す場合は、呼び出しの先頭に`-H "Content-Type: application/json"`を配置して、ヘッダーを手動で設定してください。また、これらの例には、curlに渡す最後の引数として指定する必要があるURL/IPとポートの組み合わせ（例：`127.0.0.1:8545`）は含まれていません。これらの追加データを含む完全なcurlリクエストは、次の形式になります。

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## ゴシップ、状態、履歴 {#gossip-state-history}

一部のコアなJSON-RPCメソッドはイーサリアム・ネットワークからのデータを必要とし、主に3つのカテゴリ（_ゴシップ、状態、履歴_）に分類されます。これらのセクションのリンクを使用して各メソッドにジャンプするか、目次を使用してメソッドの全リストを確認してください。

### ゴシップ・メソッド {#gossip-methods}

> これらのメソッドはチェーンの先頭を追跡します。これにより、トランザクションがネットワーク上を伝播してブロックに組み込まれる仕組みや、クライアントが新しいブロックを検出する仕組みが提供されます。

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### 状態メソッド {#state-methods}

> 保存されているすべてのデータの現在の状態を報告するメソッドです。「状態」は1つの大きな共有RAMのようなものであり、アカウント残高、コントラクトのデータ、ガスの見積もりなどが含まれます。

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### 履歴メソッド {#history-methods}

> ジェネシス・ブロックまで遡って、すべてのブロックの履歴レコードを取得します。これは1つの大きな追記専用ファイルのようなものであり、すべてのブロックヘッダー、ブロック本体、アンクルブロック、およびトランザクション・レシートが含まれます。

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

## JSON-RPC API プレイグラウンド {#json-rpc-api-playground}

[プレイグラウンドツール](https://ethereum-json-rpc.com)を使用して、APIメソッドを見つけて試すことができます。また、さまざまなノードプロバイダーがサポートしているメソッドやネットワークも確認できます。

## JSON-RPC API メソッド {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

現在のクライアントのバージョンを返します。

**パラメータ**

なし

**戻り値**

`String` - 現在のクライアントのバージョン

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// 結果
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

指定されたデータのケチャック・256（標準化された SHA3-256 _ではなく_）を返します。

**パラメータ**

1. `DATA` - SHA3 ハッシュに変換するデータ

```js
params: ["0x68656c6c6f20776f726c64"]
```

**戻り値**

`DATA` - 指定された文字列の SHA3 の結果。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// 結果
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

現在のネットワークIDを返します。

**パラメータ**

なし

**戻り値**

`String` - 現在のネットワークID。

現在のネットワークIDの完全なリストは、[chainlist.org](https://chainlist.org)で確認できます。一般的なものは以下の通りです。

- `1`: イーサリアム・メインネット
- `11155111`: Sepoliaテストネット
- `560048` : Hoodiテストネット

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// 結果
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

クライアントがネットワーク接続をアクティブにリッスンしている場合、`true` を返します。

**パラメータ**

なし

**戻り値**

`Boolean` - リッスンしている場合は `true`、それ以外の場合は `false`。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// 結果
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

現在クライアントに接続されているピアの数を返します。

**パラメータ**

なし

**戻り値**

`QUANTITY` - 接続されているピアの数の整数。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// 結果
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

現在のイーサリアム・プロトコルのバージョンを返します。このメソッドは[Gethでは利用できない](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924)ことに注意してください。

**パラメータ**

なし

**戻り値**

`String` - 現在のイーサリアム・プロトコルのバージョン

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// 結果
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

同期ステータスに関するデータを含むオブジェクト、または `false` を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

なし

**戻り値**

正確な戻り値のデータはクライアントの実装によって異なります。ノードが同期していない場合、すべてのクライアントは `False` を返します。また、すべてのクライアントは以下のフィールドを返します。

`Object|Boolean`、同期ステータスデータを含むオブジェクト、または同期していない場合は `FALSE`:

- `startingBlock`: `QUANTITY` - インポートが開始されたブロック（同期が先頭に達した後にのみリセットされます）
- `currentBlock`: `QUANTITY` - 現在のブロック（eth_blockNumber と同じ）
- `highestBlock`: `QUANTITY` - 推定される最も高いブロック

ただし、個々のクライアントは追加のデータを提供する場合もあります。たとえば、Geth は以下を返します。

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

一方、ベスは以下を返します。

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

詳細については、特定のクライアントのドキュメントを参照してください。

**例**

```js
// リクエスト
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
// または同期していない場合
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

クライアントのコインベース・アドレスを返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

> **注:** このメソッドは **v1.14.0** で非推奨となり、現在はサポートされていません。このメソッドを使用しようとすると、「Method not supported」エラーが発生します。

**パラメータ**

なし

**戻り値**

`DATA`、20バイト - 現在のコインベース・アドレス。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// 結果
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

リプレイ保護されたトランザクションの署名に使用されるチェーンIDを返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

なし

**戻り値**

`chainId`、現在のチェーンIDの整数を表す16進数値の文字列。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// 結果
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

クライアントが新しいブロックをアクティブにマイニングしている場合、`true` を返します。これはプルーフ・オブ・ワーク (PoW) ネットワークでのみ `true` を返す可能性があり、[マージ](/roadmap/merge/)以降、一部のクライアントでは利用できない場合があります。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

なし

**戻り値**

`Boolean` - クライアントがマイニングしている場合は `true` を返し、そうでない場合は `false` を返します。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

ノードがマイニングに使用している1秒あたりのハッシュ数を返します。これはプルーフ・オブ・ワーク (PoW) ネットワークに対してのみ `true` を返すことができ、[マージ](/roadmap/merge/)以降、一部のクライアントでは利用できない場合があります。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

なし

**戻り値**

`QUANTITY` - 1秒あたりのハッシュ数。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// 結果
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

現在のガスあたりの価格の推定値をWei単位で返します。例えば、ベス・クライアントはデフォルトで過去100ブロックを調べ、ガス単価の中央値を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

なし

**戻り値**

`QUANTITY` - 現在のガス価格（Wei単位）の整数。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// 結果
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

クライアントが所有するアドレスのリストを返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

なし

**戻り値**

`Array of DATA`、20バイト - クライアントが所有するアドレス。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

最新のブロック番号を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

なし

**戻り値**

`QUANTITY` - クライアントの現在のブロック番号を示す整数。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// 結果
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

指定されたアドレスのアカウントの残高を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `DATA`、20バイト - 残高を確認するアドレス。
2. `QUANTITY|TAG` - 整数値のブロック番号、または文字列 `"latest"`、`"earliest"`、`"pending"`、`"safe"`、`"finalized"`。[ブロックパラメータ](/developers/docs/apis/json-rpc/#block-parameter)を参照してください。

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**戻り値**

`QUANTITY` - 現在の残高の整数値（単位：Wei）。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

指定されたアドレスのストレージ位置から値を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `DATA`、20バイト - ストレージのアドレス。
2. `QUANTITY` - ストレージ内の位置を示す整数。
3. `QUANTITY|TAG` - 整数値のブロック番号、または文字列 `"latest"`、`"earliest"`、`"pending"`、`"safe"`、`"finalized"`。[ブロックパラメータ](/developers/docs/apis/json-rpc/#block-parameter)を参照してください。

**戻り値**

`DATA` - このストレージ位置にある値。

**例**
正しい位置の計算は、取得するストレージによって異なります。アドレス `0x391694e7e0b0cce554cb130d723a9d27458f9298` によって `0x295a70b2de5e3953354a6a8344e616ed314d7251` にデプロイされた以下のコントラクトを考えてみましょう。

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

pos0 の値の取得は簡単です。

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

マップの要素の取得はより複雑です。マップ内の要素の位置は次のように計算されます。

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

つまり、pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] のストレージを取得するには、次のように位置を計算する必要があります。

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

Web3ライブラリに付属しているGethコンソールを使用して、この計算を行うことができます。

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

これでストレージを取得できます。

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

あるアドレスから_送信された_トランザクションの数を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `DATA`、20バイト - アドレス。
2. `QUANTITY|TAG` - 整数のブロック番号、または文字列 `"latest"`、`"earliest"`、`"pending"`、`"safe"`、`"finalized"`。[ブロックパラメータ](/developers/docs/apis/json-rpc/#block-parameter)を参照してください。

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // 最新ブロックの状態
]
```

**戻り値**

`QUANTITY` - このアドレスから送信されたトランザクションの数の整数。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

指定されたブロック・ハッシュに一致するブロック内のトランザクション数を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `DATA`、32バイト - ブロックのハッシュ

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**戻り値**

`QUANTITY` - このブロック内のトランザクション数の整数。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

指定されたブロック番号に一致するブロック内のトランザクション数を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `QUANTITY|TAG` - ブロック番号の整数、または[ブロックパラメータ](/developers/docs/apis/json-rpc/#block-parameter)にある文字列 `"earliest"`、`"latest"`、`"pending"`、`"safe"`、`"finalized"` のいずれか。

```js
params: [
  "0x13738ca", // 20396234
]
```

**戻り値**

`QUANTITY` - このブロック内のトランザクション数の整数。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

指定されたブロックハッシュに一致するブロック内のアンクルの数を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `DATA`, 32バイト - ブロックのハッシュ

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**戻り値**

`QUANTITY` - このブロック内のアンクルの数の整数。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

指定されたブロック番号に一致するブロック内のアンクルの数を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `QUANTITY|TAG` - ブロック番号の整数、または文字列 `"latest"`、`"earliest"`、`"pending"`、`"safe"`、`"finalized"`。[ブロックパラメータ](/developers/docs/apis/json-rpc/#block-parameter)を参照してください。

```js
params: [
  "0xe8", // 232
]
```

**戻り値**

`QUANTITY` - このブロック内のアンクルの数の整数。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

指定されたアドレスのコードを返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `DATA`、20バイト - アドレス
2. `QUANTITY|TAG` - 整数値のブロック番号、または文字列 `"latest"`、`"earliest"`、`"pending"`、`"safe"`、`"finalized"`。[ブロックパラメータ](/developers/docs/apis/json-rpc/#block-parameter)を参照してください。

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**戻り値**

`DATA` - 指定されたアドレスのコード。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

signメソッドは、`sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`を使用してイーサリアム固有の署名を計算します。

メッセージにプレフィックスを追加することで、計算された署名がイーサリアム固有の署名として認識されるようになります。これにより、悪意のある分散型アプリケーション (dapp) が任意のデータ（トランザクションなど）に署名し、その署名を使用して被害者になりすますといった悪用を防ぐことができます。

注: 署名に使用するアドレスはロック解除されている必要があります。

**パラメーター**

1. `DATA`、20バイト - アドレス
2. `DATA`、Nバイト - 署名するメッセージ

**戻り値**

`DATA`: 署名

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

[eth_sendRawTransaction](#eth-sendrawtransaction) を使用して後でネットワークに送信できるトランザクションに署名します。

**パラメーター**

1. `Object` - トランザクション・オブジェクト

- `type`:
- `from`: `DATA`、20バイト - トランザクションの送信元アドレス。
- `to`: `DATA`、20バイト - （新しいコントラクトを作成する場合はオプション）トランザクションの宛先アドレス。
- `gas`: `QUANTITY` - （オプション、デフォルト: 90000）トランザクション実行のために提供されるガスの整数値。未使用のガスは返還されます。
- `gasPrice`: `QUANTITY` - （オプション、デフォルト: 未定）支払われる各ガスに使用されるガス価格（Wei単位）の整数値。
- `value`: `QUANTITY` - （オプション）このトランザクションで送信される値（Wei単位）の整数値。
- `data`: `DATA` - コントラクトのコンパイルされたコード、または呼び出されたメソッドの署名とエンコードされたパラメーターのハッシュ。
- `nonce`: `QUANTITY` - （オプション）ナンスの整数値。これにより、同じナンスを使用する自身の保留中のトランザクションを上書きできます。

**戻り値**

`DATA`、指定されたアカウントによって署名された、RLPエンコードされたトランザクション・オブジェクト。

**例**

```js
// リクエスト
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// 結果
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

`data` フィールドにコードが含まれている場合、新しいメッセージ・コール・トランザクションまたはコントラクト作成を行い、`from` で指定されたアカウントを使用して署名します。

**パラメータ**

1. `Object` - トランザクション・オブジェクト

- `from`: `DATA`、20バイト - トランザクションの送信元アドレス。
- `to`: `DATA`、20バイト - （新しいコントラクトを作成する場合はオプション）トランザクションの宛先アドレス。
- `gas`: `QUANTITY` - （オプション、デフォルト: 90000）トランザクション実行のために提供されるガスの整数値。未使用のガスは返還されます。
- `gasPrice`: `QUANTITY` - （オプション、デフォルト: 未定）支払われる各ガスに使用される gasPrice の整数値。
- `value`: `QUANTITY` - （オプション）このトランザクションで送信される値の整数値。
- `input`: `DATA` - コントラクトのコンパイル済みコード、または呼び出されたメソッド署名のハッシュとエンコードされたパラメータ。
- `nonce`: `QUANTITY` - （オプション）ナンスの整数値。これにより、同じナンスを使用する自身の保留中トランザクションを上書きできます。

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

**戻り値**

`DATA`、32バイト - トランザクション・ハッシュ。トランザクションがまだ利用できない場合はゼロハッシュ。

コントラクトを作成した場合、トランザクションがブロックに提案された後にコントラクトのアドレスを取得するには、[eth_getTransactionReceipt](#eth-gettransactionreceipt) を使用します。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

署名済みトランザクションに対して、新しいメッセージ・コール・トランザクションまたはコントラクト作成を作成します。

**パラメータ**

1. `DATA`、署名済みトランザクション・データ。

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**戻り値**

`DATA`、32バイト - トランザクション・ハッシュ。トランザクションがまだ利用できない場合はゼロハッシュ。

コントラクトを作成した場合、トランザクションがブロックに提案された後にコントラクトのアドレスを取得するには、[eth_getTransactionReceipt](#eth-gettransactionreceipt)を使用します。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

ブロックチェーン上にトランザクションを作成することなく、新しいメッセージ・コールを即座に実行します。ERC-20コントラクトの `balanceOf` など、読み取り専用のスマート・コントラクト関数の実行によく使用されます。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `Object` - トランザクション・コール・オブジェクト

- `from`: `DATA`、20バイト - (オプション) トランザクションの送信元アドレス。
- `to`: `DATA`、20バイト - トランザクションの宛先アドレス。
- `gas`: `QUANTITY` - (オプション) トランザクション実行のために提供されるガスの整数値。eth_callはガスを消費しませんが、一部の実行ではこのパラメータが必要になる場合があります。
- `gasPrice`: `QUANTITY` - (オプション) 支払われる各ガスに使用されるgasPriceの整数値。
- `value`: `QUANTITY` - (オプション) このトランザクションで送信される値の整数値。
- `input`: `DATA` - (オプション) メソッド署名とエンコードされたパラメータのハッシュ。詳細については、[Solidityドキュメントのイーサリアム・コントラクトABI](https://docs.soliditylang.org/en/latest/abi-spec.html)を参照してください。

2. `QUANTITY|TAG` - 整数値のブロック番号、または文字列 `"latest"`、`"earliest"`、`"pending"`、`"safe"`、`"finalized"`。[ブロック・パラメータ](/developers/docs/apis/json-rpc/#block-parameter)を参照してください。

**戻り値**

`DATA` - 実行されたコントラクトの戻り値。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

トランザクションを完了させるために必要なガスの見積もりを生成して返します。トランザクションはブロックチェーンには追加されません。EVMのメカニズムやノードのパフォーマンスなど、さまざまな理由により、見積もり額がトランザクションで実際に使用されるガス量よりも大幅に多くなる可能性があることに注意してください。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメーター**

すべてのプロパティがオプションであることを除き、[eth_call](#eth-call)のパラメーターを参照してください。ガス・リミットが指定されていない場合、gethは保留中のブロックのブロック・ガス・リミットを上限として使用します。その結果、ガス量が保留中のブロックのガス・リミットよりも高い場合、返された見積もりではコールやトランザクションを実行するのに十分ではない可能性があります。

**戻り値**

`QUANTITY` - 使用されたガス量。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

ハッシュからブロックに関する情報を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `DATA`、32バイト - ブロックのハッシュ。
2. `Boolean` - `true` の場合は完全なトランザクション・オブジェクトを返し、`false` の場合はトランザクションのハッシュのみを返します。

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**戻り値**

`Object` - ブロック・オブジェクト。ブロックが見つからない場合は `null` を返します。

- `number`: `QUANTITY` - ブロック番号。保留中のブロックの場合は `null`。
- `hash`: `DATA`、32バイト - ブロックのハッシュ。保留中のブロックの場合は `null`。
- `parentHash`: `DATA`、32バイト - 親ブロックのハッシュ。
- `nonce`: `DATA`、8バイト - 生成されたプルーフ・オブ・ワークのハッシュ。保留中のブロックの場合は `null`、プルーフ・オブ・ステークのブロック（マージ以降）の場合は `0x0`。
- `sha3Uncles`: `DATA`、32バイト - ブロック内のアンクル・データのSHA3。
- `logsBloom`: `DATA`、256バイト - ブロックのログのブルーム・フィルタ。保留中のブロックの場合は `null`。
- `transactionsRoot`: `DATA`、32バイト - ブロックのトランザクション・トライのルート。
- `stateRoot`: `DATA`、32バイト - ブロックの最終ステート・トライのルート。
- `receiptsRoot`: `DATA`、32バイト - ブロックのレシート・トライのルート。
- `miner`: `DATA`、20バイト - ブロック報酬が与えられた受益者のアドレス。
- `difficulty`: `QUANTITY` - このブロックの難易度の整数値。
- `totalDifficulty`: `QUANTITY` - このブロックまでのチェーンの合計難易度の整数値。
- `extraData`: `DATA` - このブロックの「エキストラ・データ」フィールド。
- `size`: `QUANTITY` - このブロックのバイト単位のサイズの整数値。
- `gasLimit`: `QUANTITY` - このブロックで許可されている最大ガス。
- `gasUsed`: `QUANTITY` - このブロック内のすべてのトランザクションによって使用された合計ガス。
- `timestamp`: `QUANTITY` - ブロックが生成されたときのUNIXタイムスタンプ。
- `transactions`: `Array` - 最後に指定されたパラメータに応じて、トランザクション・オブジェクトの配列、または32バイトのトランザクション・ハッシュの配列。
- `uncles`: `Array` - アンクル・ハッシュの配列。

**例**

```js
// リクエスト
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

ブロック番号からブロックに関する情報を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメーター**

1. `QUANTITY|TAG` - ブロック番号の整数、または[ブロック・パラメーター](/developers/docs/apis/json-rpc/#block-parameter)にある文字列 `"earliest"`、`"latest"`、`"pending"`、`"safe"`、`"finalized"` のいずれか。
2. `Boolean` - `true` の場合は完全なトランザクション・オブジェクトを返し、`false` の場合はトランザクションのハッシュのみを返します。

```js
params: [
  "0x1b4", // 436
  true,
]
```

**戻り値**
[eth_getBlockByHash](#eth-getblockbyhash) を参照してください。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

結果については [eth_getBlockByHash](#eth-getblockbyhash) を参照してください。

### eth_getTransactionByHash {#eth-gettransactionbyhash}

トランザクション・ハッシュによってリクエストされたトランザクションに関する情報を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `DATA`、32バイト - トランザクションのハッシュ

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**戻り値**

`Object` - トランザクション・オブジェクト。トランザクションが見つからなかった場合は `null` を返します。

- `blockHash`: `DATA`、32バイト - このトランザクションが含まれているブロックのハッシュ。保留中の場合は `null`。
- `blockNumber`: `QUANTITY` - このトランザクションが含まれているブロック番号。保留中の場合は `null`。
- `from`: `DATA`、20バイト - 送信者のアドレス。
- `gas`: `QUANTITY` - 送信者が提供したガス。
- `gasPrice`: `QUANTITY` - 送信者が提供したガス価格（Wei単位）。
- `hash`: `DATA`、32バイト - トランザクションのハッシュ。
- `input`: `DATA` - トランザクションと一緒に送信されたデータ。
- `nonce`: `QUANTITY` - このトランザクションより前に送信者が行ったトランザクションの数。
- `to`: `DATA`、20バイト - 受信者のアドレス。コントラクト作成トランザクションの場合は `null`。
- `transactionIndex`: `QUANTITY` - ブロック内のトランザクションのインデックス位置を示す整数。保留中の場合は `null`。
- `value`: `QUANTITY` - 転送された値（Wei単位）。
- `v`: `QUANTITY` - ECDSAリカバリID
- `r`: `QUANTITY` - ECDSA署名 r
- `s`: `QUANTITY` - ECDSA署名 s

**例**

```js
// リクエスト
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

ブロックのハッシュとトランザクションのインデックス位置から、トランザクションに関する情報を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `DATA`、32バイト - ブロックのハッシュ。
2. `QUANTITY` - トランザクションのインデックス位置の整数。

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**戻り値**
[eth_getTransactionByHash](#eth-gettransactionbyhash) を参照してください

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

結果については、[eth_getTransactionByHash](#eth-gettransactionbyhash) を参照してください

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

ブロック番号とトランザクションのインデックス位置に基づいて、トランザクションに関する情報を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメーター**

1. `QUANTITY|TAG` - ブロック番号、または[ブロック・パラメーター](/developers/docs/apis/json-rpc/#block-parameter)で説明されている文字列 `"earliest"`、`"latest"`、`"pending"`、`"safe"`、`"finalized"` のいずれか。
2. `QUANTITY` - トランザクションのインデックス位置。

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**戻り値**
[eth_getTransactionByHash](#eth-gettransactionbyhash)を参照してください。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

結果については[eth_getTransactionByHash](#eth-gettransactionbyhash)を参照してください。

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

トランザクション・ハッシュからトランザクションのレシートを返します。

**注:** 保留中のトランザクションのレシートは利用できません。

**パラメータ**

1. `DATA`、32バイト - トランザクションのハッシュ

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**戻り値**
`Object` - トランザクション・レシート・オブジェクト。レシートが見つからない場合は `null` を返します。

- `transactionHash `: `DATA`、32バイト - トランザクションのハッシュ。
- `transactionIndex`: `QUANTITY` - ブロック内のトランザクションのインデックス位置を示す整数。
- `blockHash`: `DATA`、32バイト - このトランザクションが含まれていたブロックのハッシュ。
- `blockNumber`: `QUANTITY` - このトランザクションが含まれていたブロック番号。
- `from`: `DATA`、20バイト - 送信者のアドレス。
- `to`: `DATA`、20バイト - 受信者のアドレス。コントラクト作成トランザクションの場合は null。
- `cumulativeGasUsed` : `QUANTITY ` - このトランザクションがブロック内で実行されたときに使用されたガスの総量。
- `effectiveGasPrice` : `QUANTITY` - ガス1単位あたりに支払われた基本料金とチップの合計。
- `gasUsed `: `QUANTITY ` - この特定のトランザクション単独で使用されたガスの量。
- `contractAddress `: `DATA`、20バイト - トランザクションがコントラクト作成であった場合は作成されたコントラクトのアドレス、それ以外の場合は `null`。
- `logs`: `Array` - このトランザクションが生成したログ・オブジェクトの配列。
- `logsBloom`: `DATA`、256バイト - ライト・クライアントが関連するログをすばやく取得するためのブルーム・フィルター。
- `type`: `QUANTITY` - トランザクション・タイプを示す整数。レガシー・トランザクションの場合は `0x0`、アクセス・リスト・タイプの場合は `0x1`、動的料金の場合は `0x2`。

また、以下の_いずれか_を返します。

- `root` : `DATA` 32バイトのトランザクション後の状態ルート（ビザンチウム以前）
- `status`: `QUANTITY `1`（成功）または `0`（失敗）のいずれか

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// 結果
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // 作成された場合はアドレスの文字列
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // getFilterLogsなどによって返されるログ
    }],
    "logsBloom": "0x00...0", // 256バイトのブルームフィルター
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

ハッシュとアンクルのインデックス位置を指定して、ブロックのアンクルに関する情報を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `DATA`、32バイト - ブロックのハッシュ。
2. `QUANTITY` - アンクルのインデックス位置。

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**戻り値**
[eth_getBlockByHash](#eth-getblockbyhash) を参照してください

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

結果については [eth_getBlockByHash](#eth-getblockbyhash) を参照してください

**注**: アンクルには個別のトランザクションは含まれません。

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

ブロック番号とアンクルのインデックス位置を指定して、ブロックのアンクルに関する情報を返します。

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  プレイグラウンドでエンドポイントを試す
</ButtonLink>

**パラメータ**

1. `QUANTITY|TAG` - ブロック番号、または[ブロック・パラメータ](/developers/docs/apis/json-rpc/#block-parameter)で説明されている文字列 `"earliest"`、`"latest"`、`"pending"`、`"safe"`、`"finalized"` のいずれか。
2. `QUANTITY` - アンクルのインデックス位置。

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**戻り値**
[eth_getBlockByHash](#eth-getblockbyhash) を参照してください

**注**: アンクルには個別のトランザクションは含まれません。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

結果については [eth_getBlockByHash](#eth-getblockbyhash) を参照してください

### eth_newFilter {#eth-newfilter}

フィルターオプションに基づいてフィルターオブジェクトを作成し、状態が変更されたとき（ログ）に通知します。
状態が変更されたかどうかを確認するには、[eth_getFilterChanges](#eth-getfilterchanges)を呼び出します。

**トピックフィルターの指定に関する注意:**
トピックは順序に依存します。トピック[A, B]を持つログを含むトランザクションは、以下のトピックフィルターに一致します。

- `[]` 「任意」
- `[A]` 「最初の位置にA（およびそれ以降は任意）」
- `[null, B]` 「最初の位置は任意、かつ2番目の位置にB（およびそれ以降は任意）」
- `[A, B]` 「最初の位置にA、かつ2番目の位置にB（およびそれ以降は任意）」
- `[[A, B], [A, B]]` 「最初の位置に（AまたはB）、かつ2番目の位置に（AまたはB）（およびそれ以降は任意）」
- **パラメーター**

1. `Object` - フィルターオプション:

- `fromBlock`: `QUANTITY|TAG` - （オプション、デフォルト: `"latest"`）整数のブロック番号。または、最後に提案されたブロックの場合は`"latest"`、最新の安全なブロックの場合は`"safe"`、最新のファイナライズ済みブロックの場合は`"finalized"`、まだブロックに含まれていないトランザクションの場合は`"pending"`、`"earliest"`。
- `toBlock`: `QUANTITY|TAG` - （オプション、デフォルト: `"latest"`）整数のブロック番号。または、最後に提案されたブロックの場合は`"latest"`、最新の安全なブロックの場合は`"safe"`、最新のファイナライズ済みブロックの場合は`"finalized"`、まだブロックに含まれていないトランザクションの場合は`"pending"`、`"earliest"`。
- `address`: `DATA|Array`、20バイト - （オプション）ログの発生元となるコントラクトのアドレス、またはアドレスのリスト。
- `topics`: `Array of DATA` - （オプション）32バイトの`DATA`トピックの配列。トピックは順序に依存します。各トピックは、「または（or）」オプションを持つDATAの配列にすることもできます。

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

**戻り値**
`QUANTITY` - フィルターID。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

新しいブロックが到着したときに通知するフィルターをノード内に作成します。
状態が変更されたかどうかを確認するには、[eth_getFilterChanges](#eth-getfilterchanges) を呼び出します。

**パラメーター**
なし

**戻り値**
`QUANTITY` - フィルターID。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// 結果
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

新しい保留中のトランザクションが到着したときに通知するために、ノードにフィルターを作成します。
状態が変更されたかどうかを確認するには、[eth_getFilterChanges](#eth-getfilterchanges)を呼び出します。

**パラメーター**
なし

**戻り値**
`QUANTITY` - フィルターID。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// 結果
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

指定されたIDのフィルターをアンインストールします。監視が不要になった場合は、常に呼び出す必要があります。
さらに、フィルターは一定期間 [eth_getFilterChanges](#eth-getfilterchanges) でリクエストされないとタイムアウトします。

**パラメーター**

1. `QUANTITY` - フィルターID。

```js
params: [
  "0xb", // 11
]
```

**戻り値**
`Boolean` - フィルターが正常にアンインストールされた場合は `true`、それ以外の場合は `false`。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// 結果
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

フィルターのポーリングメソッドです。前回のポーリング以降に発生したログの配列を返します。

**パラメーター**

1. `QUANTITY` - フィルターID。

```js
params: [
  "0x16", // 22
]
```

**戻り値**
`Array` - ログオブジェクトの配列。前回のポーリング以降に変更がない場合は空の配列になります。

- `eth_newBlockFilter` で作成されたフィルターの場合、戻り値はブロックのハッシュ (`DATA`、32バイト) になります。例: `["0x3454645634534..."]`。
- `eth_newPendingTransactionFilter ` で作成されたフィルターの場合、戻り値はトランザクション・ハッシュ (`DATA`、32バイト) になります。例: `["0x6345343454645..."]`。
- `eth_newFilter` で作成されたフィルターの場合、ログは以下のパラメーターを持つオブジェクトになります。
  - `removed`: `TAG` - チェーンのリオーグによりログが削除された場合は `true`。有効なログの場合は `false`。
  - `logIndex`: `QUANTITY` - ブロック内におけるログのインデックス位置を示す整数。保留中のログの場合は `null`。
  - `transactionIndex`: `QUANTITY` - ログの作成元となったトランザクションのインデックス位置を示す整数。保留中のログの場合は `null`。
  - `transactionHash`: `DATA`、32バイト - このログの作成元となったトランザクションのハッシュ。保留中のログの場合は `null`。
  - `blockHash`: `DATA`、32バイト - このログが含まれていたブロックのハッシュ。保留中の場合は `null`。保留中のログの場合は `null`。
  - `blockNumber`: `QUANTITY` - このログが含まれていたブロック番号。保留中の場合は `null`。保留中のログの場合は `null`。
  - `address`: `DATA`、20バイト - このログの発生元のアドレス。
  - `data`: `DATA` - 可変長のインデックス化されていないログデータ。（_Solidity_ の場合: 0個以上の32バイトのインデックス化されていないログ引数。）
  - `topics`: `Array of DATA` - 0〜4個の32バイト `DATA` のインデックス化されたログ引数の配列。（_Solidity_ の場合: イベントを `anonymous` 指定子で宣言した場合を除き、最初のトピックはイベントの署名の_ハッシュ_（例: `Deposit(address,bytes32,uint256)`）になります。）

- **例**

```js
// リクエスト
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

指定されたIDのフィルターに一致するすべてのログの配列を返します。

**パラメーター**

1. `QUANTITY` - フィルターID。

```js
params: [
  "0x16", // 22
]
```

**戻り値**
[eth_getFilterChanges](#eth-getfilterchanges)を参照してください。

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

結果については[eth_getFilterChanges](#eth-getfilterchanges)を参照してください。

### eth_getLogs {#eth-getlogs}

指定されたフィルターオブジェクトに一致するすべてのログの配列を返します。

**パラメーター**

1. `Object` - フィルターオプション:

- `fromBlock`: `QUANTITY|TAG` - (オプション、デフォルト: `"latest"`) 整数値のブロック番号。または、最後に提案されたブロックの場合は `"latest"`、最新の安全なブロックの場合は `"safe"`、最新のファイナライズ済みブロックの場合は `"finalized"`、まだブロックに含まれていないトランザクションの場合は `"pending"` または `"earliest"`。
- `toBlock`: `QUANTITY|TAG` - (オプション、デフォルト: `"latest"`) 整数値のブロック番号。または、最後に提案されたブロックの場合は `"latest"`、最新の安全なブロックの場合は `"safe"`、最新のファイナライズ済みブロックの場合は `"finalized"`、まだブロックに含まれていないトランザクションの場合は `"pending"` または `"earliest"`。
- `address`: `DATA|Array`、20バイト - (オプション) ログの発生元となるコントラクトアドレス、またはアドレスのリスト。
- `topics`: `Array of DATA` - (オプション) 32バイトの `DATA` トピックの配列。トピックは順序に依存します。各トピックは、「or」オプションを持つDATAの配列にすることもできます。
- `blockHash`: `DATA`、32バイト - (オプション、**将来**) EIP-234の追加により、`blockHash` は返されるログを32バイトのハッシュ `blockHash` を持つ単一のブロックに制限する新しいフィルターオプションになります。`blockHash` の使用は、`fromBlock` = `toBlock` = ハッシュ `blockHash` を持つブロック番号、と同等です。フィルター条件に `blockHash` が存在する場合、`fromBlock` と `toBlock` のどちらも許可されません。

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**戻り値**
[eth_getFilterChanges](#eth-getfilterchanges) を参照してください

**例**

```js
// リクエスト
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

結果については [eth_getFilterChanges](#eth-getfilterchanges) を参照してください

## 使用例 {#usage-example}

### JSON_RPCを使用したコントラクトのデプロイ {#deploying-contract}

このセクションでは、RPCインターフェースのみを使用してコントラクトをデプロイする方法を実演します。このような複雑さを抽象化した、コントラクトをデプロイする別の方法もあります。例えば、RPCインターフェースの上に構築された[Web3.js](https://web3js.readthedocs.io/)や[Web3.py](https://github.com/ethereum/web3.py)などのライブラリを使用する方法です。これらの抽象化は一般的に理解しやすく、エラーが発生しにくいですが、内部の仕組みを理解することは依然として役立ちます。

以下は、JSON-RPCインターフェースを使用してイーサリアムのノードにデプロイされる、`Multiply7`と呼ばれるシンプルなスマート・コントラクトです。このチュートリアルでは、読者がすでにGethノードを実行していることを前提としています。ノードとクライアントに関する詳細情報は[こちら](/developers/docs/nodes-and-clients/run-a-node)で確認できます。Geth以外のクライアントでHTTP JSON-RPCを開始する方法については、個々の[クライアント](/developers/docs/nodes-and-clients/)のドキュメントを参照してください。ほとんどのクライアントは、デフォルトで`localhost:8545`でサービスを提供します。

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

最初に行うべきことは、HTTP RPCインターフェースが有効になっていることを確認することです。つまり、起動時にGethに`--http`フラグを指定します。この例では、プライベートな開発チェーン上のGethノードを使用します。このアプローチを使用すると、実際のネットワーク上のイーサは必要ありません。

```bash
geth --http --dev console 2>>geth.log
```

これにより、`http://localhost:8545`でHTTP RPCインターフェースが開始されます。

[curl](https://curl.se)を使用してコインベースのアドレス（アカウントの配列から最初のアドレスを取得）と残高を取得することで、インターフェースが実行されていることを確認できます。これらの例のデータは、ローカルのノードでは異なることに注意してください。これらのコマンドを試す場合は、2番目のcurlリクエストのリクエストパラメータを、最初のリクエストから返された結果に置き換えてください。

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

数値は16進数でエンコードされているため、残高はWei単位の16進数文字列として返されます。残高をイーサ単位の数値として取得したい場合は、GethコンソールからWeb3を使用できます。

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

プライベートな開発チェーンにいくらかのイーサが用意できたので、コントラクトをデプロイできます。最初のステップは、Multiply7コントラクトをEVMに送信できるバイトコードにコンパイルすることです。Solidityコンパイラであるsolcをインストールするには、[Solidityのドキュメント](https://docs.soliditylang.org/en/latest/installing-solidity.html)に従ってください。（[この例で使用されているコンパイラのバージョン](https://github.com/ethereum/solidity/releases/tag/v0.4.20)に合わせるために、古い`solc`リリースを使用することをお勧めします。）

次のステップは、Multiply7コントラクトをEVMに送信できるバイトコードにコンパイルすることです。

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

コンパイルされたコードが用意できたので、デプロイにどれくらいのガスがかかるかを判断する必要があります。RPCインターフェースには、見積もりを提供する`eth_estimateGas`メソッドがあります。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

そして最後に、コントラクトをデプロイします。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

トランザクションはノードによって受け入れられ、トランザクション・ハッシュが返されます。このハッシュを使用して、トランザクションを追跡できます。次のステップは、コントラクトがデプロイされたアドレスを特定することです。実行された各トランザクションはレシートを作成します。このレシートには、トランザクションがどのブロックに含まれたか、EVMによってどれくらいのガスが使用されたかなど、トランザクションに関するさまざまな情報が含まれています。トランザクションがコントラクトを作成する場合、コントラクトのアドレスも含まれます。`eth_getTransactionReceipt` RPCメソッドを使用してレシートを取得できます。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

コントラクトは`0x4d03d617d700cf81935d7f797f4e2ae719648262`に作成されました。レシートの代わりにnullの結果が返された場合、トランザクションがまだブロックに含まれていないことを意味します。しばらく待ってから、コンセンサス・クライアントが実行されているか確認し、再試行してください。

#### スマート・コントラクトとの対話 {#interacting-with-smart-contract}

この例では、`eth_sendTransaction`を使用してコントラクトの`multiply`メソッドにトランザクションを送信します。

`eth_sendTransaction`にはいくつかの引数、具体的には`from`、`to`、および`data`が必要です。`From`はアカウントのパブリックアドレスであり、`to`はコントラクトのアドレスです。`data`引数には、どのメソッドをどの引数で呼び出すかを定義するペイロードが含まれています。ここで[ABI（アプリケーション・バイナリ・インターフェース）](https://docs.soliditylang.org/en/latest/abi-spec.html)の出番となります。ABIは、EVM用のデータを定義およびエンコードする方法を定義するJSONファイルです。

ペイロードのバイトは、コントラクト内のどのメソッドが呼び出されるかを定義します。これは、関数名とその引数の型に対するKeccakハッシュの最初の4バイトを16進数でエンコードしたものです。multiply関数は、uint256のエイリアスであるuintを受け入れます。これにより、次のようになります。

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

次のステップは、引数をエンコードすることです。uint256は1つだけで、例えば値6とします。ABIには、uint256型をエンコードする方法を指定するセクションがあります。

`int<M>: enc(X)`はXのビッグ・エンディアンの2の補数エンコーディングであり、長さが32バイトの倍数になるように、負のXの場合は上位（左）側に0xffが埋め込まれ、正のXの場合はゼロバイトが埋め込まれます。

これは`0000000000000000000000000000000000000000000000000000000000000006`にエンコードされます。

関数セレクタとエンコードされた引数を組み合わせると、データは`0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`になります。

これをノードに送信できるようになりました。

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

トランザクションが送信されたため、トランザクション・ハッシュが返されました。レシートを取得すると次のようになります。

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

レシートにはログが含まれています。このログは、トランザクションの実行時にEVMによって生成され、レシートに含まれました。`multiply`関数は、入力の7倍の値で`Print`イベントが発生したことを示しています。`Print`イベントの引数はuint256であったため、ABIのルールに従ってデコードでき、期待される10進数の42が得られます。データとは別に、トピックを使用してどのイベントがログを作成したかを判断できることは注目に値します。

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

これは、JSON-RPCの直接的な使用法を示す、最も一般的なタスクのいくつかについての簡単な紹介にすぎません。

## 関連トピック {#related-topics}

- [JSON-RPC仕様](http://www.jsonrpc.org/specification)
- [ノードとクライアント](/developers/docs/nodes-and-clients/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [バックエンドAPI](/developers/docs/apis/backend/)
- [実行クライアント](/developers/docs/nodes-and-clients/#execution-clients)