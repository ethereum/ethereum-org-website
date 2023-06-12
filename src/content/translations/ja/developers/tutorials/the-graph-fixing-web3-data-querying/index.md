---
title: "The Graph: Web3データクエリ問題を解決"
description: ブロックチェーンは、SQLのないデータベースのようなものです。 すべてのデータはありますが、アクセスする方法がありません。 The GraphとGraphQLでこの問題を解決する方法をご紹介します。
author: Markus Waas
lang: ja
tags:
  - "Solidity"
  - "スマートコントラクト"
  - "クエリ"
  - "the graph"
  - "create-eth-app"
  - "react"
skill: intermediate
published: 2020-09-06
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/thegraph
---

今回は、The Graph について詳しく見ていきます。The Grash は昨年、分散型アプリケーション(Dapp)を開発するために欠かせない標準スタックの一部となりました。 まずは、従来のやり方から見ていきましょう。

## The Graph を使わない例 {#without-the-graph}

それでは、説明のために簡単な例から始めます。 私たちは皆、ゲームが好きなので、ユーザーが賭けをする次の簡単なゲームを考えてみましょう。

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

ここでは、分散型アプリケーション(Dapp)で合計賭金、合計勝敗数を表示し、誰かが再度プレイするたびに更新したいとします。 このアプローチは次のようになります。

1. `totalGamesPlayerWon`の取得
2. `totalGamesPlayerLost`の取得
3. `BetPlaced`イベントのサブスクライブ

右に示したように[Web3 イベント](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#contract-events)をリッスンできますが、多くのケースを処理する必要があります。

```solidity
GameContract.events.BetPlaced({
    fromBlock: 0
}, function(error, event) { console.log(event); })
.on('data', function(event) {
    // event fired
})
.on('changed', function(event) {
    // event was removed again
})
.on('error', function(error, receipt) {
    // tx rejected
});
```

ここでの簡単な例では、これはまだある程度は大丈夫のようです。 しかし今度は、現在のプレイヤーが賭けで失った金額と獲得した金額を表示したいとしましょう。 こうなると、運が悪いとしか言えません。これらの値の格納や取得を行う新しいコントラクトをデプロイした方が良いでしょう。 では、さらに複雑なスマートコントラクトと分散型アプリケーション(Dapp)を想像してみてください。あっという間に厄介な状況になります。

![単純なクエリではない](./one-does-not-simply-query.jpg)

これが最適でないことは次のことからわかります。

- すでにデプロイ済みのコントラクトでは機能しないこと
- これらの値を格納するのに追加のガス代がかかること
- イーサリアムノードのデータを取得するのに別の呼び出しが必要なこと

![不十分](./not-good-enough.jpg)

では、より良い解決策を見ていきましょう。

## GraphQL の紹介 {#let-me-introduce-to-you-graphql}

最初に GraphQL について説明します。GraphQL は、もともとフェイスブック社によって設計され、実装されました。 従来の Rest API モデルについては、ご存知かもしれません。 では、今度は次のように必要なデータを正確に取得できるクエリを作成できると想像してみてください。

![GraphQL APIとREST APIの比較](./graphql.jpg)

<img src="https://cdn0.scrvt.com/b095ee27d37b3d7b6b150adba9ac6ec8/42226f4816a77656/bc5c8b270798/graphql-querygif.gif" width="100%" />

2 つの画像は、GraphQL の本質をほぼ捉えています。 右のクエリーでは、必要なデータを正確に定義できるので、1 回のリクエストで必要なものだけを取得できます。 GraphQL サーバーは必要とされるすべてのデータの取得を処理できるので、フロントエンドのコンシューマ側にとっては極めて使いやすいツールとなっています。 ご興味があれば、サーバーが具体的にどのようにクエリを処理するかについて[わかりやすい説明](https://www.apollographql.com/blog/graphql-explained-5844742f195e/)をご覧ください。

この知識をもとに、ブロックチェーン空間と The Graph の世界に入って行きましょう。

## The Graph とは {#what-is-the-graph}

ブロックチェーンは、分散型データベースですが、通常のデータベースとは対照的に、データベースに対するクエリ言語がありません。 データを取得することにおいては、苦痛を伴うか不可能かのどちらかです。 The Graph は、ブロックチェーンデータのインデックス作成とクエリを行うための分散型プロトコルです。 ご想像の通り The Graph は、GraphQL をクエリ言語として使用しています。

![The Graph](./thegraph.png)

何かを理解するには例を見るのが最善なので、先ほどの GameContract で The Graph を使ってみましょう。

## サブグラフの作成方法 {#how-to-create-a-subgraph}

サブグラフは、データにインデックスを作成する方法を定義するものです。 定義には、次の 3 つのコンポーネントが必要です。

1. マニフェスト(`subgraph.yaml`)
2. スキーマ(`schema.graphql`)
3. マッピング(`mapping.ts`)

### マニフェスト(`subgraph.yaml`) {#manifest}

マニフェストは設定ファイルであり、次のことを定義します。

- どのスマートコントラクトにインデックスを作成するか(アドレス、ネットワーク、アプリケーションバイナリインターフェース(ABI)等)
- どのイベントをリッスンするか
- 関数呼び出しやブロックなど、その他に何をリッスンするか
- 呼び出されるマッピング関数 (後述の`mapping.ts`を参照)

マニフェストには複数のコントラクトとハンドラを定義できます。 典型的な設定では、Truffle または Hardhat プロジェクト内にサブグラフフォルダと独自のリポジトリがあります。 それにより、簡単にアプリケーションバイナリインターフェース(ABI)を参照することができます。

便利さの観点から、Mustache のようなテンプレートツールを使用することもできます。 `subgraph.template.yaml`を作成し、最新のデプロイメントに基づいたアドレスを挿入します。 より高度な設定例については、[Aave サブグラフリポジトリ](https://github.com/aave/aave-protocol/tree/master/thegraph)の例をご覧ください。

完全なドキュメントは、こちらをご覧ください。https://thegraph.com/docs/define-a-subgraph#the-subgraph-manifest

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

### スキーマ(`schema.graphql`) {#schema}

スキーマは、GraphQL のデータ定義です。 必要なエンティティとタイプを定義することができます。 The Graph でサポートされているタイプは、次のとおりです。

- バイト型
- ID 型
- 文字列型
- ブール型
- 整数型
- BigInt 型
- BigDecimal 型

リレーションシップを定義するために、エンティティをタイプとして使用することもできます。 この例では、プレイヤーと賭け(Bet)で 1 対多のリレーションシップを定義します。 「!」 は、空の値を取れないこと意味します。 完全なドキュメントは、こちらをご覧ください。https://thegraph.com/docs/define-a-subgraph#the-graphql-schema

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

### マッピング(`mapping.ts`) {#mapping}

The Graph のマッピングファイルは、受信したイベントをエンティティに変換する関数を定義します。 Typescript のサブセットである AssemblyScript で書きます。 これは、より効率化され、よりポータブル化されたマッピングの実行を実現するため、WebAssembly(WASM)にコンパイルされます。

各関数を`subgraph.yaml`ファイルに定義する必要があります。この例では、`handleNewBet`の一つだけが必要です。 まず、id として送信者アドレスから Player エンティティを読み込もうとします。 存在しない場合は、新しいエンティティを作成して開始値を入れます。

次に、Bet エンティティを作成します。 id は、`event.transaction.hash.toHex() + "-" + event.logIndex.toString()`になり、常に一意の値になります。 誰かがスマートコントラクトを介して 1 つのトランザクションで placeBet 関数を複数回呼び出す可能性があるため、ハッシュのみの使用では十分ではありません。

最後に、すべてのデータで Player エンティティを更新します。 配列を直接プッシュすることはできませんが、ここに示すように更新する必要があります。 bet を参照するために id を使用します。 エンティティを保存するには、`.save()`が最後に必要です。

完全なドキュメントは、こちらをご覧ください。https://thegraph.com/docs/define-a-subgraph#writing-mappings マッピングファイルにログの出力を追加できます。詳細は[こちら](https://thegraph.com/docs/assemblyscript-api#api-reference)をご覧ください。

```typescript
import { Bet, Player } from "../generated/schema"
import { PlacedBet } from "../generated/GameContract/GameContract"

export function handleNewBet(event: PlacedBet): void {
  let player = Player.load(event.transaction.from.toHex())

  if (player == null) {
    // create if doesn't exist yet
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

  // update array like this
  let bets = player.bets
  bets.push(bet.id)
  player.bets = bets

  player.save()
}
```

## フロントエンドでの使用 {#using-it-in-the-frontend}

Apollo Boost などを使うと、The Graph を React(または Apollo-Vue)の分散型アプリケーション(Dapp)に簡単に統合できます。 特に React フックと Apollo を使用する場合は、コンポーネントに単一の GraphQL クエリを記述するのと同じくらいデータの取得が簡単です。 典型的な設定は次のようになります。

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

例えば、下記のようなクエリを書くことができます。 これで以下の情報を取得できます。

- 現在のユーザーの勝利数
- 現在のユーザーの敗北数
- 過去の賭けのタイムスタンプのリスト

GraphQL サーバーへの単一リクエストですべて取得できます。

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

![マジック](./magic.jpg)

しかし、最後のパズルの 1 つが欠けています。それがサーバーについてです。 自分のノードでサーバーを実行することも、ホストサービスを使用することもできます。

## The Graph サーバー {#the-graph-server}

### Graph エクスプローラー: ホストサービス {#graph-explorer-the-hosted-service}

最も簡単な方法は、ホストサービスを利用することです。 [こちらの手順](https://thegraph.com/docs/deploy-a-subgraph)に従ってサブグラフをデプロイします。 エクスプローラー(https://thegraph.com/explorer/)では、さまざまなプロジェクト向けに既存のサブグラフを探せます。

![The Graphエクスプローラー](./thegraph-explorer.png)

### 自分のノードで実行 {#running-your-own-node}

もう一つの方法として、次のように自分のノードで実行することもできます。 https://github.com/graphprotocol/graph-node#quick-start これにより、ホストサービスでサポートされていないネットワークで使用することができます。 現在サポートされいるネットワークは、Mainnet、Kovan、Rinkeby、Ropsten、Goerli、PoA-Core、xDAI、Sokol です。

## 非中央集権型の未来 {#the-decentralized-future}

GraphQL は、新しく受信するイベントのストリームもサポートしています。 The Graph では、完全にはサポートされていませんが、近々リリースされる予定です。

このサービスに欠けている側面の一つは、分散化です。 The Graph は、最終的に完全に分散化されたプロトコルになる予定です。 この計画を詳細に説明する次の 2 つの素晴らしい記事をご覧ください。

- https://thegraph.com/blog/the-graph-network-in-depth-part-1
- https://thegraph.com/blog/the-graph-network-in-depth-part-2

次の 2 つの重要な点があります。

1. ユーザーは、クエリのインデックス作成者に料金を支払う。
2. インデックス作成者は、グラフトークン(GRT)をステーキングする。
