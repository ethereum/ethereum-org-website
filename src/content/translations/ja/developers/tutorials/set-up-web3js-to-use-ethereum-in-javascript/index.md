---
title: イーサリアムブロックチェーン上でJavaScriptを使用するために、web3.jsをセットアップする方法
description: Solidity言語で書かれたトークンとやりとりするには、スマートコントラクトをどのように使用すればよいか
author: "jdourlens"
tags:
  - "web3.js"
  - "JavaScript"
skill: beginner
lang: ja
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

このチュートリアルでは、イーサリアム・ブロックチェーンでのやりとりで使用するために[web3.js](https://web3js.readthedocs.io/)を導入する方法を学びます。 Web3.js は、フロントエンドとバックエンドの両方において、ブロックチェーンからデータを読み取ったり、トランザクションを行ったり、スマートコントラクトをデプロイするために使用できます。

まず最初に、あなたのプロジェクトに web3.js を追加する必要があります。 Web ページで使用するには、JSDeliver のような CDN を使用してライブラリを直接インポートしてください。

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

バックエンドで使用するライブラリをインストールしたい場合や、ビルドが必要なフロントエンドのプロジェクトの場合は、 次のように npm を使用してインストールします。

```bash
npm install web3 --save
```

次に、Node.js のスクリプトや Browserify のフロントエンド・プロジェクトに Web3.js をインポートするには、以下の JavaScript コードを使用します：

```js
const Web3 = require("web3")
```

プロジェクトにライブラリを追加したので、初期化する必要があります。 プロジェクトは、ブロックチェーンと通信できなければなりません。 イーサリアムのほとんどのライブラリは、リモートプロシージャーコール（RPC）を使って[ノード](/developers/docs/nodes-and-clients/)と通信します。 Web3 プロバイダを開始するには、プロバイダの URL をコンストラクタとして橋渡しする Web3 のインスタンスを生成します。 お使いのコンピュータで、ノードあるいは[Ganache インスタンス](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/)を実行中の場合は、以下のようになります：

```js
const web3 = new Web3("http://localhost:8545")
```

ホストされたノードに直接アクセスしたい場合は、Infura や、[Cloudflare](https://cloudflare-eth.com/)が提供する無料サービスを利用できます。

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

Web3 インスタンスが正しく設定されたかをテストするために、 `getBlockNumber`関数を使用して、最新のブロック番号を取得してみましょう。 この関数は、コールバックをパラメータとして受け取り、ブロック番号を整数として返します。

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

このプログラムを実行すると、最新のブロック番号（ブロックチェーンの最上部） が表示されます。 また、`await/async`の関数呼び出しを使用することで、コードにおける入れ子状の呼び出しを回避することができます。

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

Web3 インスタンス上で利用可能なすべての関数は、 [web3.js の公式ドキュメンテーション](https://web3js.readthedocs.io/en/v1.2.6/web3-eth.html#)をご覧ください。

ほとんどの Web3 ライブラリでは、結果を送り返すノードに対してバックグラウンドで JSON RPC を呼び出すため、非同期で処理を行います。

<Divider />

ブラウザで作業している場合、一部のウォレットは、Web3 インスタンスを直接注入します。トランザクションを行うためにユーザーのイーサリアムアドレスとやり取りを行う予定がある場合は特に、可能な限り`await/async`関数呼び出しを使用するようにしてください。

以下のコードスニペットは、MetaMask ウォレットが利用可能か確認し、利用できる場合は有効化するものです。 その後、あなたはユーザーの残高を確認できるようになり、各ユーザーは、あなたが彼らにイーサリアムブロックチェーン上で実行させたいトランザクションを各自で検証できるようになります：

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // Request account access if needed
    await window.ethereum.enable()
    // Accounts now exposed
  } catch (error) {
    // User denied account access...
  }
}
```

web3.js の代替として Ethers.js なども存在しますが、web3.js はブラウザからイーサリアムとやりとりする際の公式ライブラリですので、JavaScript に関するチュートリアルはすべて web3.js を使用します。 次のチュートリアルでは、[ブロックチェーンに新たに追加されたブロックを簡単にリッスンし、その内容を確認する方法](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/)を紹介します。
