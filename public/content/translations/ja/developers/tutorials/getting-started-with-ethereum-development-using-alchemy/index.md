---
title: イーサリアム開発の始め方
description: "これはイーサリアム開発を始めるための初心者向けガイドです。APIエンドポイントの立ち上げから、コマンドラインでのリクエスト、そして初めてのWeb3スクリプトの作成までをご案内します！ブロックチェーン開発の経験は必要ありません！"
author: "エラン・ハルパーン"
tags: ["javascript", "ethers.js", "ノード", "クエリ", "alchemy"]
skill: beginner
breadcrumb: 始め方
lang: ja
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

これはイーサリアム開発を始めるための初心者向けガイドです。このチュートリアルでは、Maker、0x、MyEtherWallet、Dharma、Kyberなど、トップクラスのブロックチェーンアプリの70%から数百万人のユーザーを支える、主要なブロックチェーン開発者プラットフォームである[Alchemy](https://alchemyapi.io/)を使用します。Alchemyは、トランザクションの読み書きができるように、イーサリアム・チェーン上のAPIエンドポイントへのアクセスを提供します。

Alchemyへのサインアップから、初めてのWeb3スクリプトの作成までをご案内します！ブロックチェーン開発の経験は必要ありません！

## 1. 無料のAlchemyアカウントにサインアップする {#sign-up-for-a-free-alchemy-account}

Alchemyのアカウント作成は簡単です。[こちらから無料でサインアップ](https://auth.alchemy.com/)してください。

## 2. Alchemyアプリを作成する {#create-an-alchemy-app}

イーサリアム・チェーンと通信し、Alchemyの製品を使用するには、リクエストを認証するためのAPIキーが必要です。

[ダッシュボードからAPIキーを作成](https://dashboard.alchemy.com/)できます。新しいキーを作成するには、以下に示すように「Create App」に移動します。

ダッシュボードの表示を許可してくれた[_ShapeShift_](https://shapeshift.com/)_に特別な感謝を捧げます！_

![Alchemy dashboard](./alchemy-dashboard.png)

「Create App」の下に詳細を入力して、新しいキーを取得します。ここでは、以前に作成したアプリやチームが作成したアプリも確認できます。任意のアプリの「View Key」をクリックして、既存のキーを取得します。

![Create app with Alchemy screenshot](./create-app.png)

「Apps」にカーソルを合わせてアプリを選択することでも、既存のAPIキーを取得できます。ここで「View Key」をクリックできるほか、「Edit App」をクリックして特定のドメインをホワイトリストに登録したり、いくつかの開発者ツールを確認したり、分析を表示したりできます。

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. コマンドラインからリクエストを行う {#make-a-request-from-the-command-line}

JSON-RPCとcurlを使用して、Alchemy経由でイーサリアム・ブロックチェーンと対話します。

手動でのリクエストの場合、`POST`リクエストを介して`JSON-RPC`と対話することをお勧めします。`Content-Type: application/json`ヘッダーと、以下のフィールドを持つ`POST`の本文としてクエリを渡すだけです。

- `jsonrpc`: JSON-RPCのバージョン。現在は`2.0`のみがサポートされています。
- `method`: ETH APIメソッド。[APIリファレンスを参照してください。](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: メソッドに渡すパラメータのリスト。
- `id`: リクエストのID。レスポンスがどのリクエストに属しているかを追跡できるように、レスポンスによって返されます。

以下は、現在のガス価格を取得するためにコマンドラインから実行できる例です。

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**注:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo)を自身のAPIキー`https://eth-mainnet.alchemyapi.io/v2/**your-api-key`に置き換えてください。_

**結果:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Web3クライアントをセットアップする {#set-up-your-web3-client}

**既存のクライアントがある場合は、**現在のノードプロバイダーのURLを、APIキーを含むAlchemyのURLに変更します: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_注:_** 以下のスクリプトは、コマンドラインから実行するのではなく、**ノードコンテキスト**で実行するか、**ファイルに保存**する必要があります。Nodeまたはnpmをまだインストールしていない場合は、こちらの簡単な[Mac向けセットアップガイド](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs)を確認してください。

Alchemyと統合できる[Web3ライブラリ](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)は多数ありますが、Alchemyとシームレスに連携するように構築および構成された、Web3.jsのドロップイン代替品である[Alchemy Web3](https://docs.alchemy.com/reference/api-overview)を使用することをお勧めします。これにより、自動再試行や堅牢なWebSocketサポートなど、複数の利点が得られます。

AlchemyWeb3.jsをインストールするには、**プロジェクトディレクトリに移動**して以下を実行します:

**Yarnの場合:**

```
yarn add @alch/alchemy-web3
```

**NPMの場合:**

```
npm install @alch/alchemy-web3
```

Alchemyのノードインフラストラクチャと対話するには、NodeJSで実行するか、JavaScriptファイルに以下を追加します:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. 初めてのWeb3スクリプトを作成する！ {#write-your-first-web3-script}

それでは、少しWeb3プログラミングを実践するために、イーサリアム・メインネットから最新のブロック番号を出力する簡単なスクリプトを作成しましょう。

**1. まだ行っていない場合は、ターミナルで新しいプロジェクトディレクトリを作成し、そこに移動(cd)します:**

```
mkdir web3-example
cd web3-example
```

**2. まだインストールしていない場合は、プロジェクトにAlchemy Web3（または任意のWeb3）の依存関係をインストールします:**

```
npm install @alch/alchemy-web3
```

**3. `index.js`という名前のファイルを作成し、以下の内容を追加します:**

> 最終的には、`demo`を自身のAlchemy HTTP APIキーに置き換える必要があります。

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

非同期処理に慣れていない場合は、こちらの[Mediumの記事](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c)を確認してください。

**4. nodeを使用してターミナルで実行します**

```
node index.js
```

**5. これで、コンソールに最新のブロック番号が出力されるはずです！**

```
The latest block number is 11043912
```

**やりました！おめでとうございます！Alchemyを使用して初めてのWeb3スクリプトを作成しました 🎉**

次に何をすべきか迷っていますか？[Hello Worldスマート・コントラクト・ガイド](https://www.alchemy.com/docs/hello-world-smart-contract)で初めてのスマート・コントラクトをデプロイしてSolidityプログラミングを実践してみるか、[ダッシュボード・デモアプリ](https://docs.alchemyapi.io/tutorials/demo-app)でダッシュボードの知識を試してみてください！

_[Alchemyに無料でサインアップ](https://auth.alchemy.com/)し、[ドキュメント](https://www.alchemy.com/docs/)を確認してください。最新ニュースについては、[Twitter](https://twitter.com/AlchemyPlatform)をフォローしてください。_