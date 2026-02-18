---
title: "The Graph: Web3データクエリ問題の解決"
description: "ブロックチェーンは、SQLのないデータベースのようなものです。 すべてのデータはありますが、アクセスする方法がありません。 The GraphとGraphQLでこの問題を解決する方法をご紹介します。"
author: Markus Waas
lang: ja
tags: ["solidity", "smart contracts", "querying", "the graph", "react"]
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

今回は、The Graphを詳しく見ていきます。これは昨年、dappsを開発するための標準スタックの一部となりました。 まずは、従来のやり方から見ていきましょう...

## The Graphを使用しない場合... {#without-the-graph}

それでは、説明のために簡単な例を見ていきましょう。 私たちは皆ゲームが好きなので、ユーザーがベットするシンプルなゲームを想像してみましょう：

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
            require(success, "送金に失敗しました");
            totalGamesPlayerWon++;
        } else {
            totalGamesPlayerLost++;
        }

        emit BetPlaced(msg.sender, msg.value, hasWon);
    }
}
```

さて、私たちのdappで合計ベット数、勝敗の合計ゲーム数を表示し、誰かが再度プレイするたびにそれを更新したいとしましょう。 アプローチは次のようになります：

1. `totalGamesPlayerWon`を取得します。
2. `totalGamesPlayerLost`を取得します。
3. `BetPlaced`イベントをサブスクライブします。

右に示すように[Web3のイベント](https://docs.web3js.org/api/web3/class/Contract#events)をリッスンできますが、かなりの数のケースを処理する必要があります。

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // イベントが発火
})
.on('changed', function(event) {
    // イベントが再度削除された
})
.on('error', function(error, receipt) {
    // トランザクションが拒否された
});
```

この単純な例では、これでもまだある程度は問題ありません。 しかし、今度は現在のプレイヤーの勝敗ベット額のみを表示したいとしましょう。 残念ながら、それらの値を保存して取得する新しいコントラクトをデプロイするしかありません。 そして、はるかに複雑なスマートコントラクトとdappを想像してみてください。事態はすぐに厄介になる可能性があります。

![単純にクエリはできない](./one-does-not-simply-query.jpg)

これが最適ではない理由は、以下の通りです：

- すでにデプロイ済みのコントラクトでは機能しない。
- それらの値を保存するための追加のガス代。
- イーサリアムノードのデータを取得するために、別の呼び出しが必要になる。

![これでは不十分](./not-good-enough.jpg)

では、より良い解決策を見ていきましょう。

## GraphQLのご紹介 {#let-me-introduce-to-you-graphql}

まず、GraphQLについてお話ししましょう。これは元々Facebookによって設計・実装されたものです。 従来のREST APIモデルには馴染みがあるかもしれません。 代わりに、欲しいデータを正確に取得するためのクエリを書けると想像してみてください。

![GraphQL API 対 REST API](./graphql.jpg)

![](./graphql-query.gif)

この2つの画像は、GraphQLの本質をよく捉えています。 右側のクエリでは、欲しいデータを正確に定義できます。そのため、1回のリクエストで必要なものだけをすべて取得できます。 GraphQLサーバーは必要なすべてのデータの取得を処理するため、フロントエンドの利用者側にとっては非常に使いやすくなっています。 ご興味があれば、[こちらの分かりやすい説明](https://www.apollographql.com/blog/graphql-explained)で、サーバーがクエリをどのように処理するかを正確に知ることができます。

この知識をもとに、いよいよブロックチェーンとThe Graphの世界に飛び込んでみましょう。

## The Graphとは？ {#what-is-the-graph}

ブロックチェーンは分散型データベースですが、通常の場合とは対照的に、このデータベースにはクエリ言語がありません。 データを取得するためのソリューションは、手間がかかるか、あるいはまったく不可能です。 The Graphは、ブロックチェーンのデータをインデックス化し、クエリを実行するための分散型プロトコルです。 お察しの通り、クエリ言語としてGraphQLを使用しています。

![The Graph](./thegraph.png)

何かを理解するには例を見るのが一番です。そこで、私たちのGameContractの例でThe Graphを使ってみましょう。

## サブグラフの作成方法 {#how-to-create-a-subgraph}

データをインデックス化する方法の定義は、サブグラフと呼ばれます。 それには3つのコンポーネントが必要です：

1. マニフェスト (`subgraph.yaml`)
2. スキーマ (`schema.graphql`)
3. マッピング (`mapping.ts`)

### マニフェスト (`subgraph.yaml`) {#manifest}

マニフェストは設定ファイルで、以下を定義します：

- どのスマートコントラクトをインデックス化するか (アドレス、ネットワーク、ABIなど)
- どのイベントをリッスンするか
- 関数呼び出しやブロックなど、他にリッスンするもの
- 呼び出されるマッピング関数 (下記の`mapping.ts`を参照)

ここでは複数のコントラクトとハンドラを定義できます。 典型的なセットアップでは、Hardhatプロジェクト内に独自のレポジトリを持つサブグラフフォルダを置きます。 そうすれば、ABIを簡単に参照できます。

利便性のために、Mustacheのようなテンプレートツールを使ってもよいでしょう。 次に、`subgraph.template.yaml`を作成し、最新のデプロイに基づいてアドレスを挿入します。 より高度なセットアップ例については、例えば[Aaveサブグラフリポジトリ](https://github.com/aave/aave-protocol/tree/master/thegraph)を参照してください。

完全なドキュメントは[こちら](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)でご覧いただけます。

```yaml
specVersion: 0.0.1
description: イーサリアム上でのベット
repository: - GitHubリンク -
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

スキーマはGraphQLのデータ定義です。 これにより、どのエンティティが存在し、その型は何かを定義できます。 The Graphでサポートされている型は次の通りです

- バイト
- ID
- String
- Boolean
- Int
- BigInt
- BigDecimal

エンティティを型として使用して、リレーションシップを定義することもできます。 この例では、プレイヤーからベットへの1対多のリレーションシップを定義します。 ! は値が空にできないことを意味します。 完全なドキュメントは[こちら](https://thegraph.com/docs/en/developing/creating-a-subgraph/#the-subgraph-manifest)でご覧いただけます。

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

The Graphのマッピングファイルは、受信したイベントをエンティティに変換する関数を定義します。 これはTypescriptのサブセットであるAssemblyScriptで書かれています。 これは、マッピングの実行をより効率的でポータブルにするために、WASM (WebAssembly) にコンパイルできることを意味します。

`subgraph.yaml`ファイルで名付けられた各関数を定義する必要があります。この例では、`handleNewBet`の1つだけが必要です。 まず、送信者のアドレスをIDとしてPlayerエンティティをロードしようとします。 それが存在しない場合は、新しいエンティティを作成し、初期値を入力します。

次に、新しいBetエンティティを作成します。 このIDは `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` となり、常に一意の値を保証します。 スマートコントラクトを介して1つのトランザクションで誰かがplaceBet関数を複数回呼び出す可能性があるため、ハッシュのみでは不十分です。

最後に、すべてのデータでPlayerエンティティを更新できます。 配列に直接プッシュすることはできませんが、ここに示すように更新する必要があります。 ベットを参照するためにIDを使用します。 そして、エンティティを保存するためには最後に `.save()` が必要です。

完全なドキュメントは[こちら](https://thegraph.com/docs/en/developing/creating-a-subgraph/#writing-mappings)でご覧いただけます。 マッピングファイルにログ出力を追加することもできます。[こちら](https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#api-reference)を参照してください。

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // まだ存在しない場合は作成
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

  // このように配列を更新
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## フロントエンドでの使用 {#using-it-in-the-frontend}

Apollo Boostのようなものを使用すると、React dapp (またはApollo-Vue) にThe Graphを簡単に統合できます。 特にReactフックとApolloを使用する場合、データの取得はコンポーネントに単一のGraphQLクエリを記述するのと同じくらい簡単です。 典型的な設定は次のようになります。

```javascript
// See all subgraphs: https://thegraph.com/explorer/
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

そして今、例えばこのようなクエリを書くことができます。 これにより、以下が取得されます

- 現在のユーザーが勝った回数
- 現在のユーザーが負けた回数
- 彼の過去のすべてのベットのタイムスタンプのリスト

すべてGraphQLサーバーへの単一のリクエストで完了します。

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

![魔法](./magic.jpg)

しかし、パズルの最後のピース、つまりサーバーが欠けています。 自分で実行するか、ホストされたサービスを使用することができます。

## The Graphサーバー {#the-graph-server}

### Graph Explorer: ホストされたサービス {#graph-explorer-the-hosted-service}

最も簡単な方法は、ホストされたサービスを使用することです。 サブグラフをデプロイするには、[こちら](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-hosted/)の指示に従ってください。 多くのプロジェクトでは、実際に[エクスプローラー](https://thegraph.com/explorer/)で既存のサブグラフを見つけることができます。

![The Graph Explorer](./thegraph-explorer.png)

### 独自のノードの実行 {#running-your-own-node}

あるいは、独自のノードを実行することもできます。 ドキュメントは[こちら](https://github.com/graphprotocol/graph-node#quick-start)。 これを行う理由の1つは、ホストされたサービスでサポートされていないネットワークを使用する場合かもしれません。 現在サポートされているネットワークは[こちら](https://thegraph.com/docs/en/developing/supported-networks/)で確認できます。

## 分散型の未来 {#the-decentralized-future}

GraphQLは、新たに着信するイベントのストリームもサポートしています。 これらは、現在オープンベータ版である[Substreams](https://thegraph.com/docs/en/substreams/) を介してグラフ上でサポートされています。

[2021年](https://thegraph.com/blog/mainnet-migration/)、The Graphは分散型インデックスネットワークへの移行を開始しました。 この分散型インデックスネットワークのアーキテクチャについては、[こちら](https://thegraph.com/docs/en/network/explorer/)で詳しく読むことができます。

2つの重要な側面は次のとおりです。

1. ユーザーはクエリに対してインデクサーに支払います。
2. インデクサーはグラフトークン (GRT) をステークします。
