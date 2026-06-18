---
title: JavaScriptでイーサリアムブロックチェーンを使用するためのweb3.jsのセットアップ
description: JavaScriptアプリケーションからイーサリアムブロックチェーンと対話するためのweb3.jsライブラリのセットアップおよび構成方法を学びます。
author: "jdourlens"
tags:
  - web3.js
  - javascript
skill: beginner
breadcrumb: web3.jsのセットアップ
lang: ja
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

このチュートリアルでは、イーサリアムブロックチェーンと対話するために[web3.js](https://web3js.readthedocs.io/)を使い始める方法を見ていきます。 Web3.jsは、フロントエンドとバックエンドの両方で使用でき、ブロックチェーンからデータを読み取ったり、トランザクションを作成したり、スマートコントラクトをデプロイしたりすることができます。

最初のステップは、プロジェクトにweb3.jsを含めることです。 Webページで使用するには、JSDelivrのようなCDNを使用してライブラリを直接インポートできます。

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

バックエンド、またはビルドを使用するフロントエンドプロジェクトで使用するためにライブラリをインストールしたい場合は、npmを使用してインストールできます。

```bash
npm install web3 --save
```

次に、Node.jsスクリプトまたはBrowserifyフロントエンドプロジェクトにWeb3.jsをインポートするには、次のJavaScriptのコードを使用できます。

```js
const Web3 = require("web3")
```

プロジェクトにライブラリを含めたので、それを初期化する必要があります。 プロジェクトはブロックチェーンと通信できる必要があります。 ほとんどのイーサリアムライブラリは、RPC呼び出しを通じて[ノード](/developers/docs/nodes-and-clients/)と通信します。 Web3プロバイダーを初期化するには、プロバイダーのURLをコンストラクタとして渡してWeb3インスタンスをインスタンス化します。 コンピュータ上でノードまたは[Ganacheインスタンスを実行している](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)場合、次のようになります。

```js
const web3 = new Web3("http://localhost:8545")
```

ホストされているノードに直接アクセスしたい場合は、[サービスとしてのノード(nodes as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service)でオプションを見つけることができます。

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Web3インスタンスが正しく構成されたことをテストするために、`getBlockNumber`関数を使用して最新のブロック番号を取得してみます。 この関数はコールバックをパラメータとして受け取り、ブロック番号を整数として返します。

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

このプログラムを実行すると、単に最新のブロック番号、つまりブロックチェーンの先頭が出力されます。 また、コード内でコールバックがネストするのを避けるために、`await/async`関数呼び出しを使用することもできます。

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Web3インスタンスで利用可能なすべての関数は、[公式のweb3.jsドキュメント](https://docs.web3js.org/)で確認できます。

バックグラウンドでライブラリがノードに対してJSON-RPC呼び出しを行い、その結果を返すため、ほとんどのWeb3ライブラリは非同期です。

<Divider />

ブラウザで作業している場合、一部のウォレットはWeb3インスタンスを直接挿入します。特にユーザーのイーサリアムアドレスと対話してトランザクションを作成する予定がある場合は、可能な限りそれを使用するようにしてください。

以下は、メタマスクウォレットが利用可能かどうかを検出し、利用可能な場合はそれを有効にしようとするスニペットです。 これにより、後でユーザーの残高を読み取ったり、イーサリアムブロックチェーン上でユーザーに実行させたいトランザクションを検証させたりできるようになります。

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // 必要に応じてアカウントへのアクセスを要求する
    await window.ethereum.enable()
    // アカウントが公開されました
  } catch (error) {
    // ユーザーがアカウントへのアクセスを拒否しました...
  }
}
```

web3.jsの代替として[Ethers.js](https://docs.ethers.io/)のようなものも存在し、一般的に使用されています。 次のチュートリアルでは、[ブロックチェーン上の新しい受信ブロックを簡単にリッスンし、その内容を確認する方法](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/)を見ていきます。