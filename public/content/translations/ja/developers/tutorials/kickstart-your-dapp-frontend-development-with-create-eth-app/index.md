---
title: "create-eth-appでdappのフロントエンド開発を始めよう"
description: "create-eth-appの使い方とその機能の概要"
author: "マーカス・ワース"
tags:
  ["フロントエンド", "JavaScript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: ja
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

前回は[Solidityの全体像](https://soliditydeveloper.com/solidity-overview-2020)を見て、すでに[create-eth-app](https://github.com/PaulRBerg/create-eth-app)についても言及しました。今回は、その使い方、統合されている機能、そしてそれを拡張するための追加のアイデアについて説明します。[Sablier](https://sablier.com/)の創設者であるPaul Razvan Berg氏によって開始されたこのアプリは、フロントエンド開発をすぐに始められるようにするもので、選択可能なオプションの統合機能がいくつか付属しています。

## インストール {#installation}

インストールにはYarn 0.25以上（`npm install yarn --global`）が必要です。実行は非常に簡単です：

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

内部では[create-react-app](https://github.com/facebook/create-react-app)を使用しています。アプリを確認するには、`http://localhost:3000/`を開きます。本番環境にデプロイする準備ができたら、`yarn build`で縮小されたバンドルを作成します。これをホストする簡単な方法の1つは、[Netlify](https://www.netlify.com/)です。GitHubリポジトリを作成し、それをNetlifyに追加して、ビルドコマンドを設定すれば完了です！アプリがホストされ、誰でも利用できるようになります。しかも、すべて無料です。

## 機能 {#features}

### Reactとcreate-react-app {#react--create-react-app}

まず、アプリの心臓部であるReactと、_create-react-app_に付属するすべての追加機能についてです。イーサリアムを統合したくない場合は、これだけを使用するのも素晴らしい選択肢です。[React](https://react.dev/)自体は、インタラクティブなUIの構築を非常に簡単にします。[Vue](https://vuejs.org/)ほど初心者向けではないかもしれませんが、依然として最も広く使用されており、より多くの機能を備え、何よりも数千もの追加ライブラリから選択できるという利点があります。_create-react-app_を使用すると、Reactを非常に簡単に始めることができ、以下の機能が含まれています：

- React、JSX、ES6、TypeScript、Flow構文のサポート。
- オブジェクトのスプレッド構文など、ES6を超える言語の追加機能。
- CSSの自動プレフィックス付与（`-webkit-`などのプレフィックスは不要です）。
- カバレッジレポートの組み込みサポートを備えた、高速でインタラクティブなユニットテストランナー。
- 一般的な間違いを警告するライブ開発サーバー。
- ハッシュとソースマップを使用して、本番環境用にJS、CSS、画像をバンドルするビルドスクリプト。

特に_create-eth-app_は、新しい[フックエフェクト (hooks effects)](https://legacy.reactjs.org/docs/hooks-effect.html)を利用しています。これは、強力でありながら非常に小さな、いわゆる関数コンポーネントを記述するためのメソッドです。_create-eth-app_での使用方法については、以下のApolloに関するセクションを参照してください。

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)を使用すると、複数のパッケージを持つことができますが、それらをすべてルートフォルダから管理し、`yarn install`を使用してすべての依存関係を一度にインストールできます。これは、スマート・コントラクトのアドレス/ABI管理（どのスマート・コントラクトをどこにデプロイしたか、およびそれらと通信する方法に関する情報）やThe Graphの統合など、より小さな追加パッケージに特に役立ちます。これらはどちらも`create-eth-app`の一部です。

### Ethers.js {#ethersjs}

依然として[Web3](https://docs.web3js.org/)が最も使用されていますが、ここ1年で代替手段として[Ethers.js](https://docs.ethers.io/)が大きな注目を集めており、_create-eth-app_に統合されているのはこちらです。このまま使用することも、Web3に変更することも、ベータ版をまもなく終了する[Ethers.js v5](https://docs.ethers.org/v5/)へのアップグレードを検討することもできます。

### The Graph {#the-graph}

[GraphQL](https://graphql.org/)は、[RESTful API](https://restfulapi.net/)と比較してデータを処理するための代替手段です。特に分散型ブロックチェーンデータにおいて、RESTful APIよりもいくつかの利点があります。その理由に興味がある場合は、[GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a)をご覧ください。

通常、スマート・コントラクトから直接データを取得します。最新の取引時間を読み取りたいですか？イーサリアムのノードから分散型アプリケーション (dapp) にデータを取得する`MyContract.methods.latestTradeTime().call()`を呼び出すだけです。しかし、何百もの異なるデータポイントが必要な場合はどうなるでしょうか？その結果、ノードに対して何百回ものデータ取得が行われ、そのたびに[RTT](https://wikipedia.org/wiki/Round-trip_delay_time)が必要になり、dappが遅く非効率になります。1つの回避策として、一度に複数のデータを返すフェッチャー呼び出し関数をコントラクト内に作成することが考えられます。しかし、これが常に理想的であるとは限りません。

さらに、履歴データにも興味があるかもしれません。最後の取引時間だけでなく、これまでに自分で行ったすべての取引の時間を知りたいとします。_create-eth-app_のサブグラフパッケージを使用し、[ドキュメント](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph)を読んで、独自のコントラクトに適合させてください。人気のあるスマート・コントラクトを探している場合は、すでにサブグラフが存在する可能性もあります。[サブグラフエクスプローラー](https://thegraph.com/explorer/)を確認してください。

サブグラフを用意すれば、dapp内にシンプルなクエリを1つ記述するだけで、必要な履歴データを含むすべての重要なブロックチェーンデータを取得できるようになります。必要なフェッチは1回だけです。

### Apollo {#apollo}

[Apollo Boost](https://www.apollographql.com/docs/react/get-started/)の統合により、ReactのdappにThe Graphを簡単に統合できます。特に[ReactフックとApollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks)を使用する場合、コンポーネント内に単一のGraphQLクエリを記述するだけで簡単にデータを取得できます：

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## テンプレート {#templates}

さらに、いくつかの異なるテンプレートから選択できます。これまでのところ、アーベ、Compound、ユニスワップ、またはSablierの統合を使用できます。これらはすべて、事前に作成されたサブグラフの統合とともに、重要なサービスのスマート・コントラクトアドレスを追加します。`yarn create eth-app my-eth-app --with-template aave`のように、作成コマンドにテンプレートを追加するだけです。

### アーベ {#aave}

[アーベ](https://aave.com/)は、分散型のレンディング市場です。預金者は市場に流動性を提供して受動的所得を得る一方で、借り手は担保を使用して借り入れることができます。アーベのユニークな機能の1つは、1つのトランザクション内でローンを返済する限り、無担保で資金を借り入れることができる[フラッシュ・ローン](https://aave.com/docs/developers/flash-loans)です。これは、例えばアービトラージ取引で追加の資金を得るのに役立ちます。

利息を生み出す取引トークンは_aTokens_と呼ばれます。

<em>create-eth-app</em>とアーベを統合することを選択すると、[サブグラフの統合](https://docs.aave.com/developers/getting-started/using-graphql)が得られます。アーベはThe Graphを使用しており、[ロプステン](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten)および[メインネット](https://thegraph.com/explorer/subgraph/aave/protocol)上で、[raw](https://thegraph.com/explorer/subgraph/aave/protocol-raw)または[フォーマット済み](https://thegraph.com/explorer/subgraph/aave/protocol)の形式ですぐに使用できるサブグラフをすでにいくつか提供しています。

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/)はアーベに似ています。この統合には、すでに新しい[Compound v2サブグラフ](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195)が含まれています。ここで利息を生み出すトークンは、驚くべきことに_cTokens_と呼ばれます。

### ユニスワップ {#uniswap}

[ユニスワップ](https://uniswap.exchange/)は分散型取引所（DEX）です。流動性プロバイダーは、取引の双方に必要なトークンまたはイーサを提供することで手数料を稼ぐことができます。広く使用されているため、非常に幅広いトークンに対して最も高い流動性の1つを誇ります。これをdappに簡単に統合して、例えばユーザーがETHをDAIにスワップできるようにすることができます。

残念ながら、執筆時点では、この統合はユニスワップ v1のみを対象としており、[リリースされたばかりのv2](https://uniswap.org/blog/uniswap-v2/)は対象外です。

### Sablier {#sablier}

[Sablier](https://sablier.com/)を使用すると、ユーザーはストリーミングによる支払いを行うことができます。単一の給料日の代わりに、初期設定後は追加の管理なしで継続的に資金を受け取ることができます。この統合には、[独自のサブグラフ](https://thegraph.com/explorer/subgraph/sablierhq/sablier)が含まれています。

## 次のステップ {#whats-next}

<em>create-eth-app</em>について質問がある場合は、[Sablierコミュニティサーバー](https://discord.gg/bsS8T47)にアクセスしてください。そこで_create-eth-app_の作成者と連絡を取ることができます。最初の次のステップとして、[Material UI](https://mui.com/material-ui/)のようなUIフレームワークを統合し、実際に必要なデータのためのGraphQLクエリを記述し、デプロイメントを設定することをお勧めします。