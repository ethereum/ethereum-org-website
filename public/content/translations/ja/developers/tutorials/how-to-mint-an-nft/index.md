---
title: NFTをミントする方法（NFTチュートリアルシリーズ パート2/3）
description: このチュートリアルでは、スマートコントラクトとWeb3を使用してイーサリアムブロックチェーン上でNFTをミントする方法を説明します。
author: "スミ・ムドギル"
tags: ["ERC-721", "alchemy", "solidity", "スマートコントラクト"]
skill: beginner
breadcrumb: NFTをミントする
lang: ja
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): 6,900万ドル
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): 1,100万ドル
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): 600万ドル

彼らは皆、Alchemyの強力なAPIを使用してNFTをミントしました。このチュートリアルでは、10分未満で同じことを行う方法を説明します。

「NFTのミント」とは、ERC-721トークンのユニークなインスタンスをブロックチェーン上に公開する行為です。[このNFTチュートリアルシリーズのパート1](/developers/tutorials/how-to-write-and-deploy-an-nft/)で作成したスマートコントラクトを使用して、Web3のスキルを活かし、NFTをミントしてみましょう。このチュートリアルの最後には、あなたの心（とウォレット）が望む限り、いくらでもNFTをミントできるようになります！

さあ、始めましょう！

## ステップ1: Web3をインストールする {#install-web3}

NFTスマートコントラクトの作成に関する最初のチュートリアルに従った場合、すでにEthers.jsを使用した経験があるはずです。Web3はEthersに似ており、[イーサリアム](/)ブロックチェーンへのリクエスト作成を容易にするために使用されるライブラリです。このチュートリアルでは、自動再試行と堅牢なWebSocketサポートを提供する拡張Web3ライブラリである[Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3)を使用します。

プロジェクトのホームディレクトリで以下を実行します。

```
npm install @alch/alchemy-web3
```

## ステップ2: `mint-nft.js` ファイルを作成する {#create-mintnftjs}

scriptsディレクトリ内に`mint-nft.js`ファイルを作成し、以下のコードを追加します。

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## ステップ3: コントラクトのABIを取得する {#contract-abi}

コントラクトのABI（Application Binary Interface）は、スマートコントラクトと対話するためのインターフェースです。コントラクトのABIについて詳しくは、[こちら](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is)をご覧ください。Hardhatは自動的にABIを生成し、`MyNFT.json`ファイルに保存します。これを使用するには、`mint-nft.js`ファイルに以下のコードを追加して、内容を解析する必要があります。

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

ABIを確認したい場合は、コンソールに出力できます。

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js`を実行し、コンソールに出力されたABIを確認するには、ターミナルに移動して以下を実行します。

```js
node scripts/mint-nft.js
```

## ステップ4: IPFSを使用してNFTのメタデータを設定する {#config-meta}

パート1のチュートリアルを思い出していただくと、`mintNFT`スマートコントラクト関数は、NFTのメタデータを記述したJSONドキュメントに解決されるtokenURIパラメータを受け取ります。これはまさにNFTに命を吹き込むものであり、名前、説明、画像、その他の属性などの設定可能なプロパティを持たせることができます。

> _Interplanetary File System（IPFS）は、分散ファイルシステムでデータを保存および共有するための分散型プロトコルおよびピア・ツー・ピアネットワークです。_

NFTが真に分散型であることを保証するために、便利なIPFS APIおよびツールキットであるPinataを使用して、NFTアセットとメタデータを保存します。Pinataアカウントをお持ちでない場合は、[こちら](https://app.pinata.cloud)から無料アカウントにサインアップし、メールアドレスの確認手順を完了してください。

アカウントを作成したら、以下の手順に従います。

- 「Files」ページに移動し、ページの左上にある青い「Upload」ボタンをクリックします。

- Pinataに画像をアップロードします。これがNFTの画像アセットになります。アセットの名前は自由につけて構いません。

- アップロード後、「Files」ページの表にファイル情報が表示されます。CID列も表示されます。横にあるコピーボタンをクリックしてCIDをコピーできます。アップロードしたファイルは、`https://gateway.pinata.cloud/ipfs/<CID>`で確認できます。たとえば、私たちが使用したIPFS上の画像は[こちら](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)で確認できます。

視覚的に学びたい方のために、上記の手順を以下にまとめました。

![How to upload your image to Pinata](./instructionsPinata.gif)

次に、もう1つのドキュメントをPinataにアップロードします。しかしその前に、それを作成する必要があります！

ルートディレクトリに`nft-metadata.json`という新しいファイルを作成し、以下のJSONコードを追加します。

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

JSON内のデータは自由に変更してください。attributesセクションを削除したり追加したりできます。最も重要なのは、imageフィールドがIPFS画像の場所を指していることを確認することです。そうしないと、あなたのNFTには（とてもかわいい！）犬の写真が含まれることになります。

JSONファイルの編集が完了したら保存し、画像をアップロードしたときと同じ手順でPinataにアップロードします。

![How to upload your nft-metadata.json to Pinata](./uploadPinata.gif)

## ステップ5: コントラクトのインスタンスを作成する {#instance-contract}

さて、コントラクトと対話するには、コード内でそのインスタンスを作成する必要があります。そのためには、デプロイメントから、またはコントラクトのデプロイに使用したアドレスを[Blockscout](https://eth-sepolia.blockscout.com/)で検索して取得できるコントラクトアドレスが必要です。

![View your contract address on Etherscan](./view-contract-etherscan.png)

上記の例では、コントラクトアドレスは0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778です。

次に、Web3の[contractメソッド](https://docs.web3js.org/api/web3-eth-contract/class/Contract)を使用して、ABIとアドレスからコントラクトを作成します。`mint-nft.js`ファイルに以下を追加します。

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## ステップ6: `.env` ファイルを更新する {#update-env}

次に、イーサリアムチェーンにトランザクションを作成して送信するために、公開イーサリアムアカウントアドレスを使用してアカウントのナンスを取得します（詳細は後述します）。

公開鍵を`.env`ファイルに追加します。チュートリアルのパート1を完了している場合、`.env`ファイルは次のようになっているはずです。

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## ステップ7: トランザクションを作成する {#create-txn}

まず、`mintNFT(tokenData)`という名前の関数を定義し、以下の手順でトランザクションを作成しましょう。

1. `.env`ファイルから_PRIVATE_KEY_と_PUBLIC_KEY_を取得します。

1. 次に、アカウントのナンスを把握する必要があります。ナンスの仕様は、アドレスから送信されたトランザクションの数を追跡するために使用されます。これはセキュリティ上の目的と、[リプレイ攻撃](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce)を防ぐために必要です。アドレスから送信されたトランザクションの数を取得するには、[getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount)を使用します。

1. 最後に、以下の情報を使用してトランザクションを設定します。

- `'from': PUBLIC_KEY` — トランザクションの送信元は公開アドレスです。

- `'to': contractAddress` — 対話し、トランザクションを送信したいコントラクトです。

- `'nonce': nonce` — アドレスから送信されたトランザクションの数を示すアカウントのナンスです。

- `'gas': estimatedGas` — トランザクションを完了するために必要な推定ガスです。

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — このトランザクションで実行したい計算です。この場合はNFTのミントです。

現在の`mint-nft.js`ファイルは次のようになっているはずです。

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
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //最新のナンスを取得

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

トランザクションを作成したので、送信するために署名する必要があります。ここで秘密鍵を使用します。

`web3.eth.sendSignedTransaction`はトランザクション・ハッシュを提供します。これを使用して、トランザクションがマイニングされ、ネットワークによってドロップされなかったことを確認できます。トランザクションの署名セクションでは、トランザクションが正常に処理されたかどうかを知るために、いくつかのエラーチェックを追加していることに気付くでしょう。

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //最新のナンスを取得

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

## ステップ9: `mintNFT` を呼び出し、node `mint-nft.js` を実行する {#call-mintnft-fn}

Pinataにアップロードした`metadata.json`を覚えていますか？Pinataからそのハッシュコードを取得し、関数`mintNFT`のパラメータとして以下を渡します。`https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

ハッシュコードの取得方法は次のとおりです。

![How to get your nft metadata hashcode on Pinata](./metadataPinata.gif)_PinataでNFTメタデータのハッシュコードを取得する方法_

> 別のウィンドウで`https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`を読み込み、コピーしたハッシュコードが**metadata.json**にリンクしていることを再確認してください。ページは以下のスクリーンショットのようになるはずです。

![Your page should display the json metadata](./metadataJSON.png)_ページにJSONメタデータが表示されるはずです_

全体として、コードは次のようになります。

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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //最新のナンスを取得

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

次に、`node scripts/mint-nft.js`を実行してNFTをデプロイします。数秒後、ターミナルに次のような応答が表示されるはずです。

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

次に、[Alchemyのメンプール](https://dashboard.alchemyapi.io/mempool)にアクセスして、トランザクションのステータス（保留中か、マイニングされたか、ネットワークによってドロップされたか）を確認します。トランザクションがドロップされた場合は、[Blockscout](https://eth-sepolia.blockscout.com/)を確認し、トランザクション・ハッシュを検索するのも役立ちます。

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_EtherscanでNFTのトランザクション・ハッシュを表示する_

以上です！これで、イーサリアムブロックチェーン上でNFTをデプロイし、ミントすることができました <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js`を使用すると、あなたの心（とウォレット）が望む限り、いくらでもNFTをミントできます！ただし、NFTのメタデータを記述した新しいtokenURIを必ず渡すようにしてください（そうしないと、IDが異なるだけの同じNFTを大量に作成することになります）。

おそらく、ウォレットで自分のNFTを自慢したいと思うでしょう。ぜひ[パート3：ウォレットでNFTを表示する方法](/developers/tutorials/how-to-view-nft-in-metamask/)をチェックしてください！