---
title: NFTのミント方法(NFTチュートリアルシリーズの2/3)
description: このチュートリアルでは、スマートコントラクトとWeb3を使用してEthereumブロックチェーン上でNFTをミントする方法を説明します。
author: "Sumi Mudgil"
tags:
  - "ERC-721"
  - "alchemy"
  - "Solidity"
  - "スマートコントラクト"
skill: beginner
lang: ja
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69,000,000 [3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11,000,000 [Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6,000,000

いずれもAlchemyの強力なAPIを使ってNFTをミントしています。 このチュートリアルでは、<10分以内でNFTをミントする方法を説明します。

「NFTのミント」とは、ブロックチェーン上にERC-721トークンのユニークなインスタンスを公開することです。 [NFTチュートリアルシリーズのパート1](/developers/tutorials/how-to-write-and-deploy-an-nft/)で作成したスマートコントラクトを使って、Web3のスキルを駆使し、NFTをミントしてみましょう。 このチュートリアルが終わるころには、あなた(とウォレット) の望むがままにNFTをミントできるようになります。

さあ、始めましょう。

## ステップ1: Web3をインストールする {#install-web3}

NFTスマートコントラクトの作成に関する最初のチュートリアルに沿って進めている場合、すでにEthers.jsを使用していることと思います。 Web3はEthersと同様、イーサリアムブロックチェーンへのリクエストを簡単に作成するために使用されるライブラリです。 このチュートリアルでは、自動再試行と堅牢なWebSocketサポートを提供する拡張Web3ライブラリ、[Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)を使用します。

プロジェクトのホームディレクトリで以下を実行します。

```
npm install @alch/alchemy-web3
```

## ステップ2: `mint-nft.js`ファイルを作成する {#create-mintnftjs}

scriptsディレクトリ内に`mint-nft.js`ファイルを作成し、以下のコード行を追加します。

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## ステップ3: コントラクトABIを取得する {#contract-abi}

コントラクトABI(アプリケーションバイナリインターフェイス)は、スマートコントラクトと対話するためのインターフェイスです。 コントラクトABIの詳細については、[こちら](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is)をご覧ください。 Hardhatは自動的にABIを生成して、`MyNFT.json`ファイルに保存します。 このABIを使用するには、`mint-nft.js`に次のコードを追加して、ABIをパースする必要があります。

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

ABIを表示したい場合は、次のコードを追加することでコンソールに出力できます:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js`を実行し、コンソールに出力されたABIを表示するには、ターミナルに移動して次のコードを実行します。

```js
node scripts/mint-nft.js
```

## ステップ4: IPFSを使用してNFTのメタデータを設定する {#config-meta}

パート1のチュートリアルを思い出してください。スマートコントラクトの`mintNFT`関数は、NFTのメタデータを記述したJSONドキュメントで解決すべきtokenURIパラメータを取り込みます。その結果、NFTが生成され、名前、記述、画像、その他の属性などの設定可能なプロパティを実装することができます。

> _Interplanetary File System(IPFS)は、分散型ファイルシステムでデータを格納、共有するための分散プロトコルであり、ピアツーピアネットワークです。_

私たちは、NFTアセットとメタデータを保存してNFTを真に分散化するために、便利なIPFS APIとツールキットであるPinataを使用します。 Pinataアカウントをお持ちでない場合は、[こちら](https://app.pinata.cloud)から無料アカウントにサインアップし、メールアドレスの認証手順を完了してください。

アカウント作成後の手順:

- 「Files」ページに移動し、ページの左上にある青色の「Upload」ボタンをクリックします。

- Pinataに画像をアップロードします。これがNFTの画像アセットになります。 アセットに好きな名前を付けてください。

- アップロード後、「Files」ページのテーブルにファイル情報が表示されます。 また、CID列も表示されます。 隣のコピーボタンをクリックするとCIDをコピーできます。 アップロードは`https://gateway.pinata.cloud/ipfs/<CID>`で確認できます。 例えば、IPFSで使われている画像は、[こちら](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)です。

視覚型学習者のために、上記の手順を要約します。

![Pinataに画像をアップロードする方法](./instructionsPinata.gif)

次に、Pinataにもう1件ドキュメントをアップロードしますが、 その前にドキュメントを作成する必要があります。

ルートディレクトリに`nft-metadata.json`というファイルを新規作成し、以下のjsonコードを追加してください。

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

json内のデータは自由に変更できます。 属性セクションを削除または追加できます。 最も重要なことは、画像フィールドがIPFS画像の位置を指していることを確認することです。そうしないと、NFTに(とても可愛い)犬の写真が含まれます。

JSONファイルの編集が終わったら、保存して、画像のアップロードと同じ手順でPinataにアップロードしてください。

![nft-metadata.jsonを Pinataにアップロードする方法](./uploadPinata.gif)

## ステップ5: コントラクトのインスタンスを作成する {#instance-contract}

ここで、私たちのコントラクトと対話するには、コード内でインスタンスを作成する必要があります インスタンスの作成には、コントラクトアドレスが必要になります。コントラクトをデプロイする際に使用したアドレスを検索することで、デプロイメントまたは[Etherscan](https://sepolia.etherscan.io/)から取得できます。

![Etherscanでコントラクトアドレスを表示する](./view-contract-etherscan.png)

上記の例では、コントラクトのアドレスは、0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778です。

次に、Web3の[コントラクトメソッド](https://docs.web3js.org/api/web3-eth-contract/class/Contract)を活用して、ABIとアドレスを使用したコントラクトを作成します。 `mint-nft.js`ファイルに以下を追加します。

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## ステップ6: `.env`ファイルをアップデートする {#update-env}

それでは、イーサリアムチェーンにトランザクションを作成して送信するために、公開されているイーサリアムのアカウントアドレスを使用してアカウントのノンスを取得します(以下で説明します)。

`.env`ファイルにあなたの公開鍵を追加します。チュートリアルのパート1を完了している場合、`.env`ファイルは次のようになっているはずです。

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## ステップ7: トランザクションを作成する {#create-txn}

まず、`mintNFT(tokenData)`という名前の関数を定義し、次のようにトランザクションを作成してみましょう。

1. _PRIVATE_KEY_と_PUBLIC_KEY_を`.env`ファイルから取得します。

1. 次に、アカウントのノンスを確認します。 ノンスの指定は、あなたのアドレスから送信されたトランザクションの数を追跡するために使用されます。これは、セキュリティ目的で、[リプレイ攻撃](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)を防ぐために必要となります。 あなたのアドレスから送信されたトランザクションの数を取得するには、 [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)を使用します。

1. 最後に、以下の情報を使用してトランザクションを設定します。

- `'from': PUBLIC_KEY` — トランザクションの発信元は公開アドレス

- `'to': contractAddress` — 対話し、トランザクションを送信したいコントラクト

- `'nonce': nonce` — アドレスから送信されたトランザクションの数を持つアカウントのノンス

- `'gas': estimatedGas` —トランザクションを完了するために必要な推定ガス

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — このトランザクションで実行したい計算。今回の場合は、NFTを発行すること。

`mint-nft.js`ファイルは、現在このような状態になっているはずです。

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

   // トランザクション
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

さて、トランザクションを作成したら、それを送信するために署名する必要があります。 ここで秘密鍵を使用します。

`web3.eth.sendSignedTransaction`はトランザクションハッシュを提供することで、トランザクションがきちんとマイニングされ、ネットワークによってドロップされていないことを確認できます。 トランザクション署名のセクションにいくつかエラーチェックを追加することで、トランザクションが正常に完了したかどうかを確認できるようにしておきます。

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

  // トランザクション
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
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## ステップ9: `mintNFT`を呼び出し、ノード`mint-nft.js`を実行する {#call-mintnft-fn}

Pinataにアップロードした`metadata.json`を覚えているでしょうか。 Pinataからそのハッシュコードを取得し、`https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`をパラメータとして、関数`mintNFT`に渡します。

ハッシュコードを取得する方法をこちらにご紹介します。

![Pinataでnftメタデータハッシュコードを取得する方法](./metadataPinata.gif)_Pinataでnftメタデータハッシュコードを取得する方法_

> 別のウィンドウで`https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`を読み込んでみて、コピーしたハッシュコードが**metadata.json**にリンクしているか確認します。 以下のスクリーンショットと類似したページが表示されるはずです。

![ページにjsonメタデータが表示されるはずです](./metadataJSON.png)_ページにjsonメタデータが表示されるはずです_

最終的には、次のようなコードになっているはずです。

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

  //the transaction
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
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

次に、`node scripts/mint-nft.js`を実行してNFTをデプロイします。 数秒後にターミナル上に次のようなレスポンスが表示されるはずです。

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    Alchemyのメンプールをチェックし、あなたのトランザクションのステータスを確認しましょう。

[Alchemy mempool](https://dashboard.alchemyapi.io/mempool)にアクセスして、トランザクションのステータス(保留中、マイニング中、ネットワークによってドロップされたかどうか)を確認します。 トランザクションが削除された場合は、 [Sepolia Etherscan](https://sepolia.etherscan.io/)を確認してトランザクションハッシュを検索することもできます。

![EtherscanでNFTトランザクションハッシュを表示する](./view-nft-etherscan.png)_EtherscanでNFTトランザクションハッシュを表示します_

以上で完了です。 イーサリアムブロックチェーン上にデプロイしてNFTをミントしました。 <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js`を使えば、あなたの心(ウォレット)が望むだけ、NFTをミントすることができます。 NFTのメタデータを記述した新しいtokenURIを必ず渡してください(この作業を怠ると、異なるIDを備えた同一のものを大量に作成してしまいます)。

ウォレットにNFTを表示する方法については、[パート3: ウォレットにNFTを表示する方法](/developers/tutorials/how-to-view-nft-in-metamask/)をご覧ください。
