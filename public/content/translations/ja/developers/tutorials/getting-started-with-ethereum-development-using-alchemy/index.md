---
title: "イーサリアム開発入門"
description: "この文書は、はじめてイーサリアム開発を行う初心者用のガイドです。 APIエンドポイントの立ち上げ、コマンドライン・リクエストの作成、さらにweb3スクリプトの作成までをステップごとに説明します。 ブロックチェーンの開発経験は必要ありません！"
author: "Elan Halpern"
tags: [ "JavaScript", "ethers.js", "ノード", "クエリ", "Alchemy" ]
skill: beginner
breadcrumb: "入門ガイド"
lang: ja
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![イーサリアムとAlchemyのロゴ](./ethereum-alchemy.png)

この記事は、はじめてイーサリアム開発を行う初心者向けのガイドです。 このチュートリアルでは、[Alchemy](https://alchemyapi.io/)を使用します。これは、Maker、0x、MyEtherWallet、Dharma、Kyberといったトップクラスのブロックチェーンアプリの70%に採用され、数百万人のユーザーを支える、業界をリードするブロックチェーン開発者プラットフォームです。 Alchemyを使用するとイーサリアムチェーン上でAPIエンドポイントにアクセスできるため、トランザクションの読み書きが可能になります。

Alchemyへのサインアップから、最初のWeb3スクリプト作成までご案内します！ ブロックチェーンの開発経験は必要ありません！

## 1. 無料のAlchemyアカウントにサインアップする {#sign-up-for-a-free-alchemy-account}

Alchemyのアカウント作成は簡単です。[こちらから無料でサインアップしてください](https://auth.alchemy.com/)。

## 2. Alchemyアプリを作成する {#create-an-alchemy-app}

イーサリアムチェーンと通信し、Alchemy製品を使用するには、あなたのリクエストを認証するためのAPIキーが必要になります。

APIキーは[ダッシュボードから作成](https://dashboard.alchemy.com/)できます。 新しいキーを作成するには、以下のように「Create App」に移動してください:

_ダッシュボードの表示を許可していただいた[_ShapeShift_](https://shapeshift.com/)に、心より感謝申し上げます！_

![Alchemyのダッシュボード](./alchemy-dashboard.png)

「Create App」の下にある詳細情報に記入して、新しいキーを取得してください。 ここでは、あなたが以前に作成したアプリや、あなたのチームが作成したアプリも確認できます。 どのアプリについても、「View Key」をクリックすると既存のキーを取得できます。

![Alchemyでアプリを作成するスクリーンショット](./create-app.png)

「Apps」にカーソルを合わせていずれかを選択することでも、既存のAPIキーを取得できます。 ここでは「View Key」の表示に加え、「Edit App」で特定のドメインをホワイトリストに登録したり、複数の開発者ツールを閲覧したり、アナリティクスを確認したりすることができます。

![ユーザーへのAPIキー取得方法を示すGIF](./pull-api-keys.gif)

## 3. コマンドラインからリクエストを行う {#make-a-request-from-the-command-line}

JSON-RPCとcurlを使用して、Alchemy経由でイーサリアムブロックチェーンとやり取りをします。

手動リクエストの場合は、`POST`リクエストを介して`JSON-RPC`とやり取りすることをお勧めします。 `Content-Type: application/json`ヘッダーと、以下のフィールドを含むクエリを`POST`ボディとして渡すだけです:

- `jsonrpc`: JSON-RPCのバージョン — 現在は`2.0`のみがサポートされています。
- `method`: ETH APIメソッド。 [APIリファレンスを参照](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: メソッドに渡すパラメータのリストです。
- `id`: リクエストのIDです。 この値はレスポンスによって返されるため、どのリクエストに対するレスポンスなのかを追跡できます。

以下は、コマンドラインから現在のガス価格を取得するために実行できる一例です:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**注：** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) を、ご自身のAPIキー `https://eth-mainnet.alchemyapi.io/v2/**your-api-key` に置き換えてください。_

**結果:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. Web3クライアントのセットアップ {#set-up-your-web3-client}

**既存のクライアントをお持ちの場合：** 現在のノードプロバイダーのURLを、ご自身のAPIキーを含むAlchemyのURL `“https://eth-mainnet.alchemyapi.io/v2/your-api-key\"` に変更してください。

**_注：_** 以下のスクリプトは、コマンドラインから実行するのではなく、**nodeコンテキスト**で実行するか、**ファイルに保存する**必要があります。 まだNodeまたはnpmをインストールしていない場合は、こちらの[Mac用クイックセットアップガイド](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs)をご覧ください。

Alchemyと統合できる[Web3ライブラリ](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries)はたくさんありますが、web3.jsのドロップインリプレースメントとして、Alchemyとシームレスに動作するように構築・設定された[Alchemy Web3](https://docs.alchemy.com/reference/api-overview)の使用をお勧めします。 これにより、自動リトライや堅牢なWebSocketサポートなど、複数の利点が得られます。

AlchemyWeb3.jsをインストールするには、**プロジェクトディレクトリに移動し**、以下を実行してください:

**Yarnの場合:**

```
yarn add @alch/alchemy-web3
```

**NPMの場合:**

```
npm install @alch/alchemy-web3
```

Alchemyのノードインフラストラクチャとやり取りするには、NodeJSで実行するか、このコードをJavaScriptファイルに追加してください:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. 最初のWeb3スクリプトを書きましょう！ {#write-your-first-web3-script}

それでは、少しWeb3プログラミングを試してみましょう。イーサリアムメインネットから最新のブロック番号を出力する簡単なスクリプトを作成します。

**1. **まだ作成していない場合は、ターミナルで新しいプロジェクトディレクトリを作成し、そこにcdで移動してください:**

```
mkdir web3-example
cd web3-example
```

**2. **まだインストールしていない場合は、Alchemy Web3(または任意のWeb3)の依存関係をプロジェクトにインストールしてください:**

```
npm install @alch/alchemy-web3
```

**3. **`index.js`という名前のファイルを作成し、次の内容を追加してください:**

> 最終的には`demo`をご自身のAlchemy HTTP APIキーに置き換える必要があります。

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

async（非同期処理）に慣れていませんか？ こちらの[Mediumの投稿](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c)をご確認ください。

**4. **nodeを使ってターミナルで実行します**

```
node index.js
```

**5. **コンソールに最新のブロック番号が出力されているはずです！**

```
The latest block number is 11043912
```

**素晴らしい！** おめでとうございます！ **これでAlchemyを使って最初のWeb3スクリプトが書けました 🎉**

次に何をすればいいかわからないですか？ [Hello Worldスマートコントラクトガイド](https://www.alchemy.com/docs/hello-world-smart-contract)で最初のスマートコントラクトをデプロイしてSolidityプログラミングを試すか、[ダッシュボードデモアプリ](https://docs.alchemyapi.io/tutorials/demo-app)でダッシュボードの知識を試してみてください！

_[Alchemyに無料でサインアップ](https://auth.alchemy.com/)し、[ドキュメント](https://www.alchemy.com/docs/)をチェックして、最新ニュースは[Twitter](https://twitter.com/AlchemyPlatform)でフォローしてください。_
