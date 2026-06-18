---
title: "The Graph: Web3のデータクエリの改善"
description: ブロックチェーンはSQLのないデータベースのようなものです。すべてのデータはそこにありますが、アクセスする方法がありません。The GraphとGraphQLを使ってこの問題を解決する方法を紹介します。
author: マーカス・ワース
lang: ja
tags: ["solidity", "スマート・コントラクト", "クエリ", "the graph", "react"]
skill: intermediate
breadcrumb: The Graph
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

今回は、昨年分散型アプリケーション (dapp) 開発の標準スタックの一部となったThe Graphについて詳しく見ていきます。まずは、従来の方法でどのように行うかを見てみましょう。

## The Graphを使用しない場合... {#without-the-graph}

説明のために簡単な例を見てみましょう。誰もがゲームを好きなので、ユーザーが賭けをする簡単なゲームを想像してみてください。

```solidity
pragma solidity 0.7.1;

contract Game {
    uint256 totalGamesPlayerWon = 0;
    uint256 totalGamesPlayerLost = 0;
    event BetPlaced(address player, uint256 value, bool hasWon);

    function placeBet() external payable {
        bool hasWon = evaluateBetForPlayer(msg.sender);

        if (hasWon) {
            (bool success, ) = msg.sender.call{ value: msg.value * 2 }('');
            require(success, "Transfer failed");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

さて、このdappで、合計の賭け金、負け/勝ちの合計ゲーム数を表示し、誰かが再びプレイするたびにそれを更新したいとします。そのアプローチは次のようになります。

1. `totalGamesPlayerWon` を取得する。
2. `totalGamesPlayerLost` を取得する。
3. `BetPlaced` イベントをサブスクライブする。

右に示されているように、[Web3でイベント](https://docs.web3js.org/api/web3/class/Contract#events)をリッスンすることはできますが、かなり多くのケースを処理する必要があります。

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // イベント発火
})
.on('changed', function(event) {
    // イベントが再度削除された
})
.on('error', function(error, receipt) {
    // トランザクションが拒否された
});
```

この簡単な例であれば、まだ何とかなります。しかし、現在のプレイヤーの負け/勝ちの賭け金のみを表示したいとします。残念ながら、それらの値を保存する新しいコントラクトをデプロイして取得するしかありません。さらに複雑なスマート・コントラクトとdappを想像してみてください。事態はすぐに収拾がつかなくなる可能性があります。

![One Does Not Simply Query](./one-does-not-simply-query.jpg)

これが最適ではない理由は以下の通りです。

- すでにデプロイされたコントラクトでは機能しない。
- それらの値を保存するための追加のガスコストがかかる。
- イーサリアムのノードからデータを取得するために別の呼び出しが必要になる。

![Thats not good enough](./not-good-enough.jpg)

では、より良い解決策を見てみましょう。

## GraphQLの紹介 {#let-me-introduce-to-you-graphql}

まず、フェイスブックによって最初に設計および実装されたGraphQLについて説明します。従来のREST APIモデルには馴染みがあるかもしれません。代わりに、必要なデータだけを正確に取得するクエリを記述できると想像してみてください。

![GraphQL API vs. REST API](./graphql.jpg)

![Animated demonstration of a GraphQL query in The Graph playground](./graphql-query.gif)

この2つの画像は、GraphQLの本質をよく表しています。右側のクエリを使用すると、必要なデータを正確に定義できるため、1回のリクエストですべてを取得でき、必要なもの以外は取得しません。GraphQLサーバーが必要なすべてのデータの取得を処理するため、フロントエンドのコンシューマー側にとって非常に使いやすくなっています。興味がある場合は、サーバーがクエリを正確に処理する方法について[こちらでわかりやすく説明されています](https://www.apollographql.com/blog/graphql-explained)。

この知識を踏まえて、いよいよブロックチェーンの領域とThe Graphについて見ていきましょう。

## The Graphとは？ {#what-is-the-graph}

ブロックチェーンは分散型データベースですが、通常とは異なり、このデータベース用のクエリ言語がありません。データを取得するための解決策は苦痛を伴うか、完全に不可能です。The Graphは、ブロックチェーンデータのインデックス作成とクエリを行うための分散型プロトコルです。ご想像の通り、クエリ言語としてGraphQLを使用しています。

![The Graph](./thegraph.png)

何かを理解するには例を見るのが一番なので、GameContractの例でThe Graphを使ってみましょう。

## サブグラフの作成方法 {#how-to-create-a-subgraph}

データのインデックス作成方法の定義はサブグラフと呼ばれます。これには3つのコンポーネントが必要です。

1. マニフェスト (`subgraph.yaml`)
2. スキーマ (`schema.graphql`)
3. マッピング (`mapping.ts`)

### マニフェスト (`subgraph.yaml`) {#manifest}

マニフェストは設定ファイルであり、以下を定義します。

- インデックスを作成するスマート・コントラクト (アドレス、ネットワーク、ABIなど)
- リッスンするイベント
- 関数呼び出しやブロックなど、リッスンするその他の要素
- 呼び出されるマッピング関数 (以下の `mapping.ts` を参照)

ここでは複数のコントラクトとハンドラーを定義できます。一般的なセットアップでは、Hardhatプロジェクト内に独自のリポジトリを持つサブグラフフォルダーを配置します。これにより、ABIを簡単に参照できます。

利便性のために、mustacheのようなテンプレートツールを使用することもできます。その場合、`subgraph.template.yaml` を作成し、最新のデプロイに基づいてアドレスを挿入します。より高度なセットアップ例については、[アーベのサブグラフリポジトリ](https://github.com/aave/aave-protocol/tree/master/thegraph)などを参照してください。

完全なドキュメントは[こちら](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)で確認できます。

```yaml
specVersion: 0.0.1
description: Placing Bets on Ethereum
repository: - GitHub link -
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: GameContract
    network: mainnet
    source:
      address: '0x2E6454...cf77eC'
      abi: GameContract
      startBlock: 6175244
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.1
      language: wasm/assemblyscript
      entities:
        - GameContract
      abis:
        - name: GameContract
          file: ../build/contracts/GameContract.json
      eventHandlers:
        - event: PlacedBet(address,uint256,bool)
          handler: handleNewBet
      file: ./src/mapping.ts
```

### スキーマ (`schema.graphql`) {#schema}

スキーマはGraphQLのデータ定義です。これにより、存在するエンティティとその型を定義できます。The Graphでサポートされている型は以下の通りです。

- Bytes
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

エンティティを型として使用して、関係を定義することもできます。この例では、プレイヤーから賭けへの1対多の関係を定義しています。! は値が空であってはならないことを意味します。完全なドキュメントは[こちら](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)で確認できます。

```graphql
type Bet @entity {
  id: ID!
  player: Player!
  playerHasWon: Boolean!
  time: Int!
}

type Player @entity {
  id: ID!
  totalPlayedCount: Int
  hasWonCount: Int
  hasLostCount: Int
  bets: [Bet]!
}
```

### マッピング (`mapping.ts`) {#mapping}

The Graphのマッピングファイルは、受信したイベントをエンティティに変換する関数を定義します。これはTypeScriptのサブセットであるAssemblyScriptで記述されています。つまり、マッピングをより効率的かつポータブルに実行するために、WASM (WebAssembly) にコンパイルできます。

`subgraph.yaml` ファイルで指定された各関数を定義する必要があります。この例では、`handleNewBet` の1つだけが必要です。まず、送信者のアドレスをIDとしてPlayerエンティティを読み込もうとします。存在しない場合は、新しいエンティティを作成し、初期値を入力します。

次に、新しいBetエンティティを作成します。このIDは `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` となり、常に一意の値になるようにします。スマート・コントラクトを介して1つのトランザクション内でplaceBet関数を複数回呼び出す可能性があるため、ハッシュだけを使用するのでは不十分です。

最後に、すべてのデータでPlayerエンティティを更新できます。配列は直接プッシュすることはできず、ここに示すように更新する必要があります。IDを使用して賭けを参照します。そして、エンティティを保存するには、最後に `.save()` が必要です。

完全なドキュメントはこちらで確認できます: https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings。マッピングファイルにログ出力を追加することもできます。[こちら](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference)を参照してください。

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // まだ存在しない場合は作成する
    player = new Player(event.transaction.from.toHex())
    player.bets = new Array<string>(0)
    player.totalPlayedCount = 0
    player.hasWonCount = 0
    player.hasLostCount = 0
  }

  let bet = new Bet(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  bet.player = player.id
  bet.playerHasWon = event.params.hasWon
  bet.time = event.block.timestamp
  bet.save()

  player.totalPlayedCount++
  if (event.params.hasWon) {
    player.hasWonCount++
  } else {
    player.hasLostCount++
  }

  // このように配列を更新する
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## フロントエンドでの使用 {#using-it-in-the-frontend}

Apollo Boostなどを使用すると、Reactのdapp (またはApollo-Vue) にThe Graphを簡単に統合できます。特にReactフックとApolloを使用する場合、データの取得はコンポーネント内に単一のGraphQLクエリを記述するのと同じくらい簡単です。一般的なセットアップは次のようになります。

```javascript
// すべてのサブグラフを参照: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "{{ subgraphUrl }}",
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
```

これで、例えば次のようなクエリを記述できます。これにより、以下の情報が取得されます。

- 現在のユーザーが勝った回数
- 現在のユーザーが負けた回数
- 過去のすべての賭けのタイムスタンプのリスト

これらすべてをGraphQLサーバーへの1回のリクエストで取得できます。

```javascript
const myGraphQlQuery = gql`
    players(where: { id: $currentUser }) {
      totalPlayedCount
      hasWonCount
      hasLostCount
      bets {
        time
      }
    }
`

const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

![Magic](./magic.jpg)

しかし、パズルの最後のピースが1つ欠けています。それはサーバーです。自分で実行するか、ホスト型サービスを使用することができます。

## The Graphサーバー {#the-graph-server}

### Graph Explorer: ホスト型サービス {#graph-explorer-the-hosted-service}

最も簡単な方法は、ホスト型サービスを使用することです。[こちら](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/)の手順に従ってサブグラフをデプロイします。多くのプロジェクトでは、実際に[エクスプローラー](https://thegraph.com/explorer/)で既存のサブグラフを見つけることができます。

![The Graph-Explorer](./thegraph-explorer.png)

### 独自のノードの実行 {#running-your-own-node}

あるいは、独自のノードを実行することもできます。ドキュメントは[こちら](https://github.com/graphprotocol/graph-node#quick-start)です。これを行う理由の1つは、ホスト型サービスでサポートされていないネットワークを使用することかもしれません。現在サポートされているネットワークは[こちらで確認できます](https://thegraph.com/docs/en/developing/supported-networks/)。

## 分散型の未来 {#the-decentralized-future}

GraphQLは、新しく受信したイベントのストリームもサポートしています。これらは、現在オープンベータ版である[Substreams](https://thegraph.com/docs/en/substreams/)を通じてThe Graph上でサポートされています。

[2021年](https://thegraph.com/blog/mainnet-migration/)に、The Graphは分散型インデックスネットワークへの移行を開始しました。この分散型インデックスネットワークのアーキテクチャについて詳しくは、[こちら](https://thegraph.com/docs/en/network/explorer/)をご覧ください。

2つの重要な側面は以下の通りです。

1. ユーザーはクエリに対してインデクサーに支払う。
2. インデクサーはGraph Token (GRT) をステークする。