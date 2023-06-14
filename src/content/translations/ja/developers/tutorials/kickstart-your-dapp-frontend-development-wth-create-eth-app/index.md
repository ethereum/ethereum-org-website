---
title: create-eth-appでDappのフロントエンド開発をはじめましょう
description: create-eth-appの使い方と機能の概要
author: "Markus Waas"
tags:
  - "create-eth-app"
  - "フロントエンド"
  - "JavaScript"
  - "ethers.js"
  - "The Graph"
  - "Aave"
  - "Compound"
  - "Uniswap"
  - "Sablier"
skill: beginner
lang: ja
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

[create-eth-app](https://github.com/PaulRBerg/create-eth-app)については、前回の記事（[Solidity の全体像](https://soliditydeveloper.com/solidity-overview-2020)）で紹介しました。 今回は、create-eth-app をどのように使うか、どのような機能が統合されているか、およびさらに拡張する方法について学びます。 create-eth-app は、[ Sablier ](http://sablier.finance/)の創業者である Paul Razvan Berg が立ち上げたプロジェクトで、フロントエンド開発をすばやく開始できるだけでなく、さまざまなオプションの統合機能も活用できます。

## インストール {#installation}

インストールには、Yarn 0.25 以上が必要です（`npm install yarn --global`）。 とても簡単です！

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

このアプリでは、 [create-react-app](https://github.com/facebook/create-react-app)を利用しています。 アプリを表示するには、ブラウザで `http://localhost:3000/` を開きます。 本番環境にデプロイする準備ができたら、yarn build を実行してソースコードをまとめたファイルを作成します。 このアプリを手軽にホスティングするには、 [Netlify](https://www.netlify.com/)を利用すると良いでしょう。 GitHub リポジトリを作成して Netlify に登録し、ビルドコマンドをセットアップすれば完了です！ あなたのアプリはインターネットに公開され、誰でも利用できるようになります。 これらはすべて無料です。

## 機能 {#features}

### React と create-react-app {#react--create-react-app}

まずは、このアプリの核心である React と、*create-react-app*で提供される追加の機能すべてについて説明します。 イーサリアムとの統合を希望しない場合は、このアプリだけを使うのも良い方法です。 [React](https://reactjs.org/)を使えば、インタラクティブな UI を簡単に作成できます。 React は、[Vue](https://vuejs.org/)ほど初心者向けではありませんが、広く使われており、より多くの機能が提供されているだけでなく、何千ものライブラリを利用して機能を追加できます。 *create-react-app*も UI 開発を手軽に開始するのに役立つアプリで、以下の機能が含まれています。

- React、JSX、ES6、TypeScript、および Flow の構文に対応
- スプレッド構文などの ES6 に含まれない言語拡張
- オートプレフィックス CSS により、-webkit- などの接頭辞が不必要
- カバレッジレポート機能を搭載した、高速でインタラクティブな単体テストランナー
- よくある間違いをリアルタイムで警告する開発環境用サーバ
- 本番環境用に、JS、CSS、および画像ファイルをハッシュやソースマップとバンドルできるビルドスクリプト

特に*create-eth-app* は、新しい[副作用フック](https://reactjs.org/docs/hooks-effect.html)を利用しています。 これは、強力かつとてもコンパクトな、いわゆる関数コンポーネントを書くための方法です。 副作用フックを*create-eth-app*で活用する方法については、以下の Apollo に関するセクションを参照してください。

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)では、複数のパッケージをひとつのルートフォルダで管理することができ、`yarn install`を使って依存関係を一度にインストールすることができます。 このアプローチは、スマートコントラクトのアドレスや ABI 管理（スマートコントラクトをどこにデプロイしたか、スマートコントラクトとどのようなやり取りを行うか）などの小さなパッケージを追加したり、The Graph との統合において特に有益であり、どちらの機能も`create-eth-app`に含まれています。

### ethers.js {#ethersjs}

大部分のユーザーは現在でも[Web3.js](https://web3js.readthedocs.io/en/v1.2.7/)を使用していますが、昨年は[ethers.js](https://docs.ethers.io/)を Web3.js の代替として利用するユーザーが増加したため、*create-eth-app*には ethers.js が統合されています。 このライブラリで作業してもよいですし、Web3 に切り替えてもよいです。あるいは、もうすくベータが外れる[ethers.js v5](https://docs-beta.ethers.io/)にアップグレードするのもよいでしょう。

### The Graph {#the-graph}

[GraphQL](https://graphql.org/)は、[RESTful API](https://restfulapi.net/)とは違う方法でデータを扱います。 特に分散型ブロックチェーンのデータを扱う場合、RESTful API よりもいくつかの利点があります。 その理由に興味がある方は、[GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a)をご覧ください。

通常、スマートコントラクトからは直接データを取得することができます。 最後に行った取引の時間を取得したい場合は、 `MyContract.methods.latestTradeTime().call()`を呼び出すだけで、infura のようなイーサリアムノードからデータを取得し、あなたの Dapp で使うことができます。 しかし、何百もの異なる種類のデータが必要な場合は事情が異なります。 ノードからのデータ取得が何百回も発生し、その都度[RTT](https://wikipedia.org/wiki/Round-trip_delay_time)が必要となるため、Dapp の処理速度が低下し、非効率になってしまいます。 ひとつの回避策としては、一度に複数のデータを返すデータ取得用の関数をスマートコントラクト側で用意する方法があるでしょう。 しかし、これは常に最善の方法とは言えません。

また、過去のデータが必要な場合もあるでしょう。 最後の取引の時間だけではなく、今まで自分が行った全ての取引の時間が知りたいかもしれません。 このような場合は、*create-eth-app*にある subgraph パッケージを活用できます。[ドキュメンテーション](https://thegraph.com/docs/define-a-subgraph)を参照して、あなたのニーズに合うように調整してください。 人気が高いスマートコントラクトの場合、すでに subgraph が含まれているかもしれません。 [subgraph explorer](https://thegraph.com/explorer/)をチェックしてみてください。

subgraph があれば、Dapp にシンプルなクエリをひとつ追加するだけで、過去のデータも含めた全てのブロックチェーンのデータを 1 回のフェッチ処理で取得することができます。

### Apollo {#apollo}

[Apollo Boost](https://www.apollographql.com/docs/react/get-started/)との統合により、React で作成した Dapp に The Graph を簡単に搭載できるようになりました。 特に[React hooks と Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks-676d116eeae2)を使えば、コンポーネントに GraphQL のクエリをひとつ追加するだけで、簡単にデータ取得が可能になります：

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## テンプレート {#templates}

さらに、Dapp 用にさまざまなテンプレートが用意されています。 今のところ、Aave、Compound、UniSwap、および Sablier 用のテンプレートがあります。 これらのテンプレートはすべて、すでに subgraph と統合されており、スマートコントラクトのアドレスに対して重要なサービスを追加します。 `yarn create eth-app my-eth-app --with-template aave`などの作成コマンドを、テンプレートに追加するだけでよいです。

### Aave {#aave}

[Aave](https://aave.com/)は、分散型の通貨レンディングプラットフォームです。 預金者は、市場に流動性を提供することで金利収入を獲得でき、借主は担保を提供して借り入れることができます。 Aave のユニークな特徴のひとつは、1 回のトランザクション内で返済する限り無担保で通貨を借入できる[フラッシュローン](https://docs.aave.com/developers/guides/flash-loans)という仕組みです。 この機能は、裁定取引で余分のキャッシュが必要になる場合などに有効でしょう。

利子が付与される取引中のトークンは、*aToken*と呼ばれます。

Aave と*create-eth-app*を統合すると、[Aave 用の subgraph](https://docs.aave.com/developers/getting-started/using-graphql)が使えるようになります。 Aave は The Graph を採用しており、[Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten)および[メインネット](https://thegraph.com/explorer/subgraph/aave/protocol)上では、すぐに導入できる subgraph を[raw](https://thegraph.com/explorer/subgraph/aave/protocol-raw)または[formatted](https://thegraph.com/explorer/subgraph/aave/protocol)形式で提供しています。

![Aaveフラッシュローンのミーム - 「あ〜、フラッシュローンを1トランザクション以上に延長できれば、最高なんだけどなあ」](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/)は、Aave に類似したサービスです。 create-eth-app ではすでに、[Compound v2 の subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195)が利用可能です。 驚くべきことに、Compound では利子が付与されるトークンを*cToken*と呼んでいます。

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/)は、分散型取引所 (DEX) です。 流動性を供給するユーザーは、取引の売主／買主の両方に対して、必要なトークンや ether を提供して手数料を獲得することができます。 Uniswap は広く利用されているため、多種多様なトークンに最大規模の流動性を提供する取引所のひとつです。 あなたの Dapp に Uniswap を組み込むことで、ETH を DAI とスワップする機能などが簡単に実現できます。

残念ながら、この記事の執筆時点で利用可能なのは Uniswap v1 のみとなっており、[最新リリースの v2](https://uniswap.org/blog/uniswap-v2/)は利用できません。

### Sablier {#sablier}

[ Sablier](https://sablier.finance/)は、ストリーミング決済を可能にする分散型アプリです。 Sablier をセットアップすれば、その後の管理を必要とせずに、1 回の支払日の代わりに常にお金を受け取ることができるようになります。 create-eth-app では、[独自の subgraph](https://thegraph.com/explorer/subgraph/sablierhq/sablier)が利用できます。

## 次のステップ {#whats-next}

*create-eth-app*について質問がある場合は、[Sablier コミュニティーのサーバー](https://discord.gg/bsS8T47)にアクセスして、 *create-eth-app*の開発者に問い合わせることができます。 次のステップとしては、[Material UI](https://material-ui.com/)のような UI フレームワークの導入、あなたが実際に必要とするデータを取得するための GraphQL クエリの作成、およびデプロイのセットアップなどが考えられます。
