---
title: "create-eth-appでdappのフロントエンド開発を始めましょう"
description: "create-eth-appの使い方と機能の概要"
author: "Markus Waas"
tags:
  [
    "フロントエンド",
    "JavaScript",
    "ethers.js",
    "the graph",
    "DeFi"
  ]
skill: beginner
lang: ja
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

前回は[Solidityの全体像](https://soliditydeveloper.com/solidity-overview-2020)を確認し、すでに[create-eth-app](https://github.com/PaulRBerg/create-eth-app)についても言及しました。 今回は、その使い方、統合されている機能、そしてそれを拡張するための追加のアイデアについて解説します。 [Sablier](http://sablier.com/)の創業者であるPaul Razvan Bergによって始められたこのアプリは、フロントエンド開発をすぐに開始でき、いくつかのオプションの統合機能から選択することができます。

## インストール {#installation}

インストールには、Yarn 0.25以上が必要です (`npm install yarn --global`)。 次のように実行するだけで簡単です:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

内部で[create-react-app](https://github.com/facebook/create-react-app)を使用しています。 アプリを表示するには、`http://localhost:3000/`を開きます。 本番環境にデプロイする準備ができたら、`yarn build`で最小化されたバンドルを作成します。 これを簡単にホストする方法の一つとして、[Netlify](https://www.netlify.com/)があります。 GitHubリポジトリを作成し、それをNetlifyに追加し、ビルドコマンドをセットアップすれば完了です！ あなたのアプリはホストされ、誰でも利用できるようになります。 そして、そのすべてが無料です。

## 機能 {#features}

### Reactとcreate-react-app {#react--create-react-app}

まず、このアプリの心臓部であるReactと、_create-react-app_に付属するすべての追加機能です。 Ethereumとの統合を望まない場合は、これだけを使用するのも良い選択肢です。 [React](https://react.dev/)を使えば、インタラクティブなUIをとても簡単に構築できます。 [Vue](https://vuejs.org/)ほど初心者向けではないかもしれませんが、依然として広く使われており、より多くの機能を持ち、そして最も重要なことに、何千もの追加のライブラリから選択することができます。 _create-react-app_を使えば、非常に簡単に始めることができ、次のものが含まれています：

- React、JSX、ES6、TypeScript、Flow構文のサポート。
- オブジェクトスプレッド演算子のようなES6を超える言語拡張。
- 自動で接頭辞が付加されるCSS。-webkit-やその他の接頭辞は不要です。
- カバレッジレポート機能を搭載した、高速でインタラクティブな単体テストランナー。
- よくある間違いについて警告するライブ開発サーバー。
- ハッシュとソースマップを使用して、本番用にJS、CSS、画像をバンドルするビルドスクリプト。

特に_create-eth-app_は、新しい[副作用フック](https://legacy.reactjs.org/docs/hooks-effect.html)を利用しています。 強力でありながら非常に小さい、いわゆる関数コンポーネントを記述するためのメソッドです。 副作用フックをcreate-eth-appで活用する方法については、以下のApolloに関するセクションを参照してください。

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)では、複数のパッケージをひとつのルートフォルダで管理することができ、`yarn install`を使って依存関係を一度にインストールすることができます。 このアプローチは、スマートコントラクトのアドレスやABI管理（スマートコントラクトをどこにデプロイしたか、スマートコントラクトとどのようなやり取りを行うか）などの小さなパッケージを追加したり、The Graphとの統合において特に有益であり、どちらの機能もcreate-eth-appに含まれています。

### ethers.js {#ethersjs}

[Web3](https://docs.web3js.org/)がまだ主流で使われていますが、[ethers.js](https://docs.ethers.io/)は昨年、代替として多くの注目を集めており、_create-eth-app_に統合されているものです。 これを使用するか、Web3に変更するか、またはベータ版がもうすぐ終了する[ethers.js v5](https://docs.ethers.org/v5/)へのアップグレードを検討することができます。

### The Graph {#the-graph}

[GraphQL](https://graphql.org/)は、[Restful API](https://restfulapi.net/)と比較して、データを処理するための代替方法です。 特に分散型ブロックチェーンデータにとって、Restful APIよりもいくつかの利点があります。 この背後にある理由に興味がある場合は、[GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a)をご覧ください。

通常、スマートコントラクトから直接データを取得します。 最新の取引の時刻を読み取りたいですか？ `MyContract.methods.latestTradeTime().call()`を呼び出すだけで、Ethereumノードからdappにデータを取得します。 しかし、何百もの異なるデータポイントが必要な場合はどうでしょうか？ そうなると、ノードへのデータフェッチが何百回も発生し、そのたびに[RTT](https://wikipedia.org/wiki/Round-trip_delay_time)が必要になり、dappが遅く非効率になります。 一つの回避策として、一度に複数のデータを返すフェッチャーコール関数をコントラクト内に設けることが考えられます。 しかし、これは必ずしも理想的ではありません。

そして、履歴データにも興味があるかもしれません。 最後の取引時間だけでなく、これまでに自分が行ったすべての取引の時間も知りたくなるでしょう。 _create-eth-app_のサブグラフパッケージを使用し、[ドキュメント](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph)を読んで、それを自分のコントラクトに適合させてください。 人気のあるスマートコントラクトを探している場合、すでにサブグラフが存在するかもしれません。 [サブグラフエクスプローラー](https://thegraph.com/explorer/)をチェックしてください。

サブグラフがあれば、dappで簡単なクエリを1つ書くだけで、必要な履歴データを含むすべての重要なブロックチェーンデータを取得でき、必要なフェッチは1回だけです。

### Apollo {#apollo}

[Apollo Boost](https://www.apollographql.com/docs/react/get-started/)の統合のおかげで、React dappにグラフを簡単に統合できます。 特に[ReactフックとApollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks)を使用する場合、データのフェッチはコンポーネントに単一のGraphQlクエリを記述するのと同じくらい簡単です：

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## テンプレート {#templates}

さらに、いくつかの異なるテンプレートから選択できます。 これまでのところ、Aave、Compound、UniSwap、またはsablierの統合を使用できます。 それらはすべて、あらかじめ作成されたサブグラフ統合とともに、重要なサービススマートコントラクトのアドレスを追加します。 `yarn create eth-app my-eth-app --with-template aave`のように、作成コマンドにテンプレートを追加するだけです。

### Aave {#aave}

[Aave](https://aave.com/)は、分散型の金融市場です。 預金者は市場に流動性を提供して受動的収入を得る一方、借手は担保を使って借り入れることができます。 Aaveのユニークな特徴の1つは、[フラッシュローン](https://aave.com/docs/developers/flash-loans)です。これは、1つのトランザクション内でローンを返済する限り、担保なしでお金を借りることを可能にします。 これは、例えば裁定取引で追加の現金を得るのに役立ちます。

利子を得るために取引されるトークンは、_aTokens_と呼ばれます。

_create-eth-app_とAaveを統合することを選択すると、[サブグラフ統合](https://docs.aave.com/developers/getting-started/using-graphql)が得られます。 AaveはThe Graphを使用しており、[Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten)と[メインネット](https://thegraph.com/explorer/subgraph/aave/protocol)上で、[raw](https://thegraph.com/explorer/subgraph/aave/protocol-raw)または[フォーマット済み](https://thegraph.com/explorer/subgraph/aave/protocol)形式で、すぐに使えるいくつかのサブグラフをすでに提供しています。

![Aaveフラッシュローンのミーム – 「ああ、もしフラッシュローンを1トランザクション以上保持できたら、最高なんだけどな」](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/)はAaveに似ています。 この統合には、新しい[Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195)がすでに含まれています。 ここでの利息獲得トークンは、驚くべきことに_cTokens_と呼ばれています。

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/)は分散型取引所（DEX）です。 流動性供給者は、取引の両側に必要なトークンやEtherを提供することで手数料を得ることができます。 広く利用されているため、非常に広範囲のトークンに対して最も高い流動性の1つを持っています。 例えば、ユーザーがETHをDAIにスワップできるように、dappに簡単に統合できます。

残念ながら、この記事の執筆時点では、統合はUniswap v1のみで、[リリースされたばかりのv2](https://uniswap.org/blog/uniswap-v2/)には対応していません。

### Sablier {#sablier}

[Sablier](https://sablier.com/)は、ユーザーがお金をストリーミングで支払うことを可能にします。 一度の給料日ではなく、初期設定後は追加の管理なしに継続的にお金を受け取ることができます。 この統合には、[独自のサブグラフ](https://thegraph.com/explorer/subgraph/sablierhq/sablier)が含まれています。

## 次のステップ {#whats-next}

_create-eth-app_について質問がある場合は、[Sablierコミュニティサーバー](https://discord.gg/bsS8T47)にアクセスしてください。そこで_create-eth-app_の作成者と連絡を取ることができます。 最初の次のステップとして、[Material UI](https://mui.com/material-ui/)のようなUIフレームワークを統合し、実際に必要なデータのためにGraphQLクエリを書き、デプロイをセットアップすることをお勧めします。
