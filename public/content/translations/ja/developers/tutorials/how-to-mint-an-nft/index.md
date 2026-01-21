---
title: "NFTのミント方法(NFTチュートリアルシリーズの2/3)"
description: "このチュートリアルでは、スマートコントラクトとWeb3を使用してイーサリアムブロックチェーン上でNFTをミントする方法を説明します。"
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity", "スマート契約" ]
skill: beginner
lang: ja
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 6900万ドル
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 1100万ドル
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 600万ドル

いずれもAlchemyの強力なAPIを使ってNFTをミントしています。 このチュートリアルでは、\<10分で同じことを行う方法を説明します。

「NFTのミント」とは、ブロックチェーン上にERC-721トークンのユニークなインスタンスを公開することです。 この[NFTチュートリアルシリーズのパート1](/developers/tutorials/how-to-write-and-deploy-an-nft/)で作成したスマートコントラクトを使って、Web3のスキルを駆使し、NFTをミントしてみましょう。 このチュートリアルが終わるころには、あなた(とウォレット)が望むだけNFTをミントできるようになります。

さあ、始めましょう。

## ステップ1: Web3をインストールする {#install-web3}

NFTスマートコントラクトの作成に関する最初のチュートリアルに沿って進めている場合、すでにEthers.jsを使用した経験があるはずです。 Web3はEthersと同様、イーサリアムブロックチェーンへのリクエストを簡単に作成するために使用されるライブラリです。 このチュートリアルでは、自動再試行と堅牢なWebSocketサポートを提供する拡張Web3ライブラリである[Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)を使用します。

プロジェクトのホームディレクトリで以下を実行します。

```
npm install @alch/alchemy-web3
```

## ステップ2: `mint-nft.js`ファイルを作成する {#create-mintnftjs}

`scripts`ディレクトリ内に`mint-nft.js`ファイルを作成し、以下のコード行を追加してください。

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## ステップ3: コントラクトABIを取得する {#contract-abi}

コントラクトABI (Application Binary Interface) は、スマートコントラクトと対話するためのインターフェイスです。 コントラクトABIの詳細は[こちら](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is)をご覧ください。 Hardhatは自動的にABIを生成し、`MyNFT.json`ファイルに保存します。 これを使用するには、`mint-nft.js`ファイルに以下のコード行を追加してコンテンツを解析する必要があります。

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

ABIを確認したい場合は、コンソールに出力できます:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js`を実行し、コンソールに出力されたABIを確認するには、ターミナルに移動して以下を実行します。

```js
node scripts/mint-nft.js
```

## ステップ4: IPFSを使用してNFTのメタデータを設定する {#config-meta}

パート1のチュートリアルで触れたように、`mintNFT`スマートコントラクト関数は、`tokenURI`パラメータを受け取ります。このパラメータは、NFTのメタデータを記述したJSONドキュメントに解決される必要があります。このメタデータこそがNFTに命を吹き込み、名前、説明、画像、その他の属性などの設定可能なプロパティを持たせることを可能にするのです。

> _Interplanetary File System (IPFS) は、分散ファイルシステムでデータを保存・共有するための、分散型プロトコルでありピアツーピアネットワークです。_

NFTが真に分散化されるように、便利なIPFS APIおよびツールキットであるPinataを使用して、NFTのアセットとメタデータを保存します。 Pinataのアカウントをお持ちでない場合は、[こちら](https://app.pinata.cloud)から無料アカウントにサインアップし、メールアドレスの認証手続きを完了してください。

アカウントを作成したら:

- 「Files」ページに移動し、ページの左上にある青い「Upload」ボタンをクリックします。

- 画像をPinataにアップロードします。これがあなたのNFTの画像アセットになります。 アセットには自由に名前を付けてかまいません。

- アップロード後、「Files」ページのテーブルにファイル情報が表示されます。 CID列も表示されます。 隣にあるコピーボタンをクリックすると、CIDをコピーできます。 アップロードしたファイルは `https://gateway.pinata.cloud/ipfs/<CID>` で確認できます。 例えば、私たちが使用した画像はIPFS上の[こちら](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)にあります。

視覚的に学習したい方のために、上記の手順を以下にまとめます。

![Pinataに画像をアップロードする方法](./instructionsPinata.gif)

さて、Pinataにもう一つドキュメントをアップロードします。 しかしその前に、それを作成する必要があります。

ルートディレクトリに `nft-metadata.json` という新しいファイルを作成し、以下のJSONコードを追加してください。

```json
{
  "attributes": [
    {
      "trait_type": "品種",
      "value": "マルプー"
    },
    {
      "trait_type": "目の色",
      "value": "モカ"
    }
  ],
  "description": "世界で最も愛らしくて繊細な子犬です。",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "ラムセス"
}
```

JSON内のデータは自由に変更してかまいません。 `attributes`セクションは削除したり、追加したりできます。 最も重要なのは、`image`フィールドがあなたのIPFS画像の場所を指していることを確認することです。さもなければ、あなたのNFTには(とてもかわいい!) 犬の写真が含まれてしまいます。

JSONファイルの編集が終わったら保存し、画像をアップロードしたのと同じ手順でPinataにアップロードしてください。

![nft-metadata.jsonをPinataにアップロードする方法](./uploadPinata.gif)

## ステップ5: コントラクトのインスタンスを作成する {#instance-contract}

さて、コントラクトとやりとりするには、コード内でそのインスタンスを作成する必要があります。 そのためにはコントラクトアドレスが必要ですが、これはデプロイメントから取得するか、コントラクトのデプロイに使用したアドレスを[Blockscout](https://eth-sepolia.blockscout.com/)で検索することで取得できます。

![Etherscanでコントラクトアドレスを表示](./view-contract-etherscan.png)

上記の例では、コントラクトアドレスは`0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778`です。

次に、ABIとアドレスを使い、Web3の[contractメソッド](https://docs.web3js.org/api/web3-eth-contract/class/Contract)でコントラクトを作成します。 `mint-nft.js`ファイルに、以下を追加します。

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## ステップ6: `.env`ファイルを更新する {#update-env}

さて、イーサリアムチェーンにトランザクションを作成して送信するために、あなたの公開イーサリアムアカウントアドレスを使用してアカウントのノンス(後述)を取得します。

あなたの公開鍵を`.env`ファイルに追加してください。チュートリアルのパート1を完了している場合、`.env`ファイルは次のようになっているはずです:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/あなたのAPIキー"
PRIVATE_KEY = "あなたのプライベートアカウントアドレス"
PUBLIC_KEY = "あなたのパブリックアカウントアドレス"
```

## ステップ7: トランザクションを作成する {#create-txn}

まず、`mintNFT(tokenData)`という名前の関数を定義し、以下のようにトランザクションを作成します。

1. `.env`ファイルから_PRIVATE_KEY_と_PUBLIC_KEY_を取得します。

2. 次に、アカウントのノンスを確認する必要があります。 ノンスの仕様は、あなたのアドレスから送信されたトランザクション数を追跡するために使用されます。これは、セキュリティ上の目的と、[リプレイ攻撃](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)を防ぐために必要です。 あなたのアドレスから送信されたトランザクション数を取得するには、[getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)を使用します。

3. 最後に、以下の情報でトランザクションをセットアップします。

- `'from': PUBLIC_KEY` — トランザクションの発信元である、私たちの公開アドレス

- `'to': contractAddress` — やりとりを行い、トランザクションを送信したいコントラクト

- `'nonce': nonce` — 私たちのアドレスから送信されたトランザクション数を含むアカウントのノンス

- `'gas': estimatedGas` — トランザクションを完了するために必要な推定ガス量

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — このトランザクションで実行したい計算、この場合はNFTのミント

`mint-nft.js`ファイルは次のようになっているはずです:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

   //トランザクション
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## ステップ8: トランザクションに署名する {#sign-txn}

トランザクションを作成したので、次に送信するために署名する必要があります。 ここで秘密鍵を使用します。

`web3.eth.sendSignedTransaction`はトランザクションハッシュを返します。これを使用して、トランザクションがマイニングされ、ネットワークによってドロップされなかったことを確認できます。 トランザクション署名のセクションでは、トランザクションが正常に実行されたかどうかを知るために、エラーチェックを追加していることにお気づきでしょう。

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //トランザクション
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "トランザクションのハッシュ: ",
              hash,
              "\nAlchemyのメンプールでトランザクションのステータスを確認してください!"
            )
          } else {
            console.log(
              "トランザクションの送信中に問題が発生しました:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promiseが失敗しました:", err)
    })
}
```

## ステップ9: `mintNFT`を呼び出し、`node mint-nft.js`を実行する {#call-mintnft-fn}

Pinataにアップロードした`metadata.json`を覚えていますか？ Pinataからそのハッシュコードを取得し、`https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`をパラメータとして`mintNFT`関数に渡します。

ハッシュコードを取得する方法は次のとおりです。

![PinataでNFTメタデータのハッシュコードを取得する方法](./metadataPinata.gif)_PinataでNFTメタデータのハッシュコードを取得する方法_

> 別のウィンドウで `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` を読み込み、コピーしたハッシュコードがあなたの**metadata.json**にリンクしていることを再確認してください。 ページは下のスクリーンショットのようになっているはずです。

![ページにJSONメタデータが表示されるはずです](./metadataJSON.png)_ページにJSONメタデータが表示されるはずです_

すべてをまとめると、コードは次のようになります。

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //トランザクション
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "トランザクションのハッシュ: ",
              hash,
              "\nAlchemyのメンプールでトランザクションのステータスを確認してください!"
            )
          } else {
            console.log(
              "トランザクションの送信中に問題が発生しました:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promiseが失敗しました:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

さて、`node scripts/mint-nft.js`を実行して、NFTをミントしましょう。 数秒後、ターミナルに次のような応答が表示されるはずです。

    ```
    トランザクションのハッシュ: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Alchemyのメンプールでトランザクションのステータスを確認してください!
    ```

次に、[Alchemyメンプール](https://dashboard.alchemyapi.io/mempool)にアクセスして、トランザクションのステータス(ペンディング、マイニング済み、またはネットワークによるドロップ)を確認します。 トランザクションがドロップされた場合は、[Blockscout](https://eth-sepolia.blockscout.com/)でトランザクションハッシュを検索して確認することも役立ちます。

![EtherscanでNFTトランザクションハッシュを表示](./view-nft-etherscan.png)_EtherscanでNFTトランザクションハッシュを表示_

以上です。 これで、イーサリアムブロックチェーン上でNFTをデプロイし、ミントしました<Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js`を使えば、あなた(とウォレット)が望むだけNFTをミントできます。 必ずNFTのメタデータを記述した新しい`tokenURI`を渡すようにしてください(そうしないと、IDが違うだけで同一のものを大量に作ってしまうことになります)。

おそらく、ウォレットで自分のNFTを披露したいと思うでしょう。そのために、ぜひ[パート3: ウォレットでNFTを表示する方法](/developers/tutorials/how-to-view-nft-in-metamask/)もチェックしてください。
