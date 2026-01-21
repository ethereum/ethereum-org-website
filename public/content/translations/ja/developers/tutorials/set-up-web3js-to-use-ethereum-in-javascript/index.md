---
title: JavaScriptでイーサリアムブロックチェーンを使用するためにweb3.jsをセットアップする
description: JavaScriptアプリケーションからイーサリアムブロックチェーンと対話するために、web3.jsライブラリをセットアップおよび設定する方法を学びます。
author: "jdourlens"
tags: [ "web3.js", "JavaScript" ]
skill: beginner
lang: ja
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

このチュートリアルでは、[web3.js](https://web3js.readthedocs.io/)を使ってイーサリアムブロックチェーンと対話する方法を解説します。 Web3.jsは、フロントエンドとバックエンドの両方において、ブロックチェーンからデータを読み取ったり、トランザクションを行ったり、スマートコントラクトをデプロイするために使用できます。

最初のステップは、プロジェクトにweb3.jsを組み込むことです。 Webページで使用するには、JSDeliverのようなCDNを使用してライブラリを直接インポートします。

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

バックエンドやビルドを要するフロントエンドプロジェクトで使うためにライブラリをインストールする場合は、npmを使ってインストールできます：

```bash
npm install web3 --save
```

次に、Node.jsのスクリプトやBrowserifyのフロントエンドプロジェクトにWeb3.jsをインポートするには、以下のJavaScriptの行を使用します：

```js
const Web3 = require("web3")
```

プロジェクトにライブラリを組み込んだので、次に初期化が必要です。 プロジェクトは、ブロックチェーンと通信できる必要があります。 ほとんどのイーサリアムライブラリは、RPCコールを介して[ノード](/developers/docs/nodes-and-clients/)と通信します。 Web3プロバイダーを初期化するには、プロバイダーのURLをコンストラクタに渡してWeb3インスタンスを生成します。 お使いのコンピュータでノードまたは[ganacheインスタンスを実行](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)している場合は、次のようになります：

```js
const web3 = new Web3("http://localhost:8545")
```

ホストされているノードに直接アクセスしたい場合は、[サービスとしてのノード](/developers/docs/nodes-and-clients/nodes-as-a-service)でオプションを見つけることができます。

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Web3インスタンスが正しく設定されたかテストするために、`getBlockNumber`関数を使って最新のブロック番号を取得してみましょう。 この関数は、コールバックをパラメータとして受け取り、ブロック番号を整数として返します。

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

このプログラムを実行すると、最新のブロック番号、つまりブロックチェーンの最上部が、シンプルに表示されます。 また、`await/async`関数呼び出しを使うと、コード内でのコールバックのネストを避けることができます：

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Web3インスタンスで利用可能なすべての関数は、[web3.jsの公式ドキュメント](https://docs.web3js.org/)で確認できます。

ほとんどのWeb3ライブラリは非同期です。これは、バックグラウンドでライブラリがノードにJSON-RPCコールを行い、ノードが結果を返すためです。

<Divider />

ブラウザで作業している場合、一部のウォレットはWeb3インスタンスを直接インジェクトします。特にユーザーのイーサリアムアドレスとやり取りしてトランザクションを行う予定がある場合は、可能な限りそのインスタンスを使用するようにしてください。

これは、MetaMaskウォレットが利用可能かどうかを検出し、利用可能であれば有効化を試みるスニペットです。 これにより、後でユーザーの残高を読み取ったり、イーサリアムブロックチェーン上で実行させたいトランザクションをユーザーが検証できるようになります：

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // 必要に応じてアカウントへのアクセスを要求
    await window.ethereum.enable()
    // アカウントが公開されました
  } catch (error) {
    // ユーザーがアカウントアクセスを拒否しました...
  }
}
```

[Ethers.js](https://docs.ethers.io/)のようなweb3.jsの代替ライブラリも存在し、同様に広く使われています。 次のチュートリアルでは、[ブロックチェーン上で新たに着信するブロックを簡単にリッスンし、その内容を確認する方法](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/)を見ていきます。
