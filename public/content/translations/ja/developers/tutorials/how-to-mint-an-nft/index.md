---
title: "NFTをミントする方法（NFTチュートリアルシリーズ パート2/3）"
description: "このチュートリアルでは、スマート・コントラクト、Hardhat、およびEthers.jsを使用して、イーサリアムのブロックチェーン上でNFTをミントする方法について説明します。"
author: "スミ・ムドギル"
tags: ["ERC-721", "Alchemy", "Solidity", "スマートコントラクト"]
skill: beginner
breadcrumb: "NFTをミントする"
lang: ja
published: 2021-04-22
---

「非代替性トークン (NFT) のミンティング」とは、ブロックチェーン上でERC-721トークンのユニークなインスタンスを公開する行為です。[このNFTチュートリアルシリーズのパート1](/developers/tutorials/how-to-write-and-deploy-an-nft/)で作成したスマート・コントラクトを使用して、Web3のスキルを活かし、NFTをミントしてみましょう。このチュートリアルの最後には、心（とウォレット）が望む限り、いくらでもNFTをミントできるようになります！

さあ、始めましょう！

## ステップ1：セットアップの確認 {#install-web3}

NFTスマート・コントラクトの作成に関する最初のチュートリアルに従った場合、必要なものはすべて揃っています。[Ethersプラグイン](https://hardhat.org/docs/plugins/hardhat-ethers)と[Ethers.js](https://docs.ethers.org/v6/)（[イーサリアム](/)のブロックチェーンへのリクエスト作成を容易にするライブラリ）を含むHardhat 3プロジェクトです。ミンティングのコードはHardhatスクリプトとして記述するため、パート1のSepoliaネットワーク設定と`API_URL`および`PRIVATE_KEY`の値を再利用します。新しくインストールするものはありません。

## ステップ2：`mint-nft.js`ファイルの作成 {#create-mintnftjs}

scriptsディレクトリ内に`mint-nft.js`ファイルを作成し、以下のコードを追加します。

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

デプロイ・スクリプトと同様に、`network.create()`はスクリプトの実行時に`--network`で選択したネットワークに接続し、そのネットワーク用の`ethers`オブジェクトを提供します。

## ステップ3：コントラクトABIの取得 {#contract-abi}

コントラクトのアプリケーション・バイナリ・インターフェース (ABI) は、スマート・コントラクトと対話するためのインターフェースです。[コントラクトABI](/glossary/#abi)について詳しく学ぶことができます。Hardhatは、コントラクトをコンパイルする際に自動的にABIを生成し、`artifacts/contracts/MyNFT.sol/MyNFT.json`ファイルに保存します。ステップ5でコントラクトのインスタンスを作成する際、Hardhat EthersプラグインがそこからABIを読み込んでくれるため、自分で読み込む必要はありません。

ABIを確認したい場合は、コンソールに出力することができます。プロジェクトのルートディレクトリから、以下を実行します。

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## ステップ4：IPFSを使用してNFTのメタデータを設定する {#config-meta}

パート1のチュートリアルを思い出していただくと、`mintNFT`スマート・コントラクト関数は、NFTのメタデータを記述したJSONドキュメントに解決されるべき`tokenURI`パラメータを受け取ります。このメタデータこそがNFTに命を吹き込むものであり、名前、説明、画像、その他の属性など、設定可能なプロパティを持たせることができます。

> _Interplanetary File System (IPFS) は、分散型ファイルシステムでデータを保存および共有するための分散型プロトコルおよびピア・ツー・ピアのネットワークです。_

NFTのアセットとメタデータを保存し、NFTが真に分散型であることを保証するために、便利なIPFSのアプリケーション・プログラミング・インターフェース（API）およびツールキットであるPinataを使用します。Pinataアカウントをお持ちでない場合は、[こちら](https://app.pinata.cloud)から無料アカウントにサインアップし、メールアドレスの確認手順を完了してください。

アカウントを作成したら、以下の手順に従います。

- [Filesページ](https://app.pinata.cloud/ipfs/files)に移動し、ページ右上にある「Add」ボタンをクリックします。

- Pinataに画像をアップロードします。これがNFTの画像アセットになります。アセットの名前は自由につけて構いません。必ずパブリックIPFSにアップロードしてください。[プライベートIPFS](https://docs.pinata.cloud/files/private-ipfs)上のファイルは、NFTを表示するウォレットやマーケットプレイスから取得できません。

- アップロード後、FilesページにファイルがCID（コンテンツ識別子）とともにリストされているのがわかります。CIDをコピーします。アップロードしたファイルは、`https://gateway.pinata.cloud/ipfs/<CID>`、またはPinataのサイドバーの「Gateways」の下にリストされている専用ゲートウェイから確認できます。例えば、私たちがIPFSで使用した画像は[こちら](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5)で確認できます。

さて、Pinataにもう1つドキュメントをアップロードする必要があります。しかしその前に、それを作成しなければなりません！

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

JSONのデータは自由に変更してください。`attributes`セクションを削除したり追加したりできます。最も重要なのは、`image`フィールドが`ipfs://<image-CID>`の形式でIPFS画像の場所を指していることを確認することです。そうしないと、あなたのNFTには（とても可愛い！）犬の写真が含まれることになります。

JSONファイルの編集が完了したら保存し、画像をアップロードしたのと同じ手順でPinataにアップロードします。`nft-metadata.json`のCIDもコピーしておいてください。ステップ9で必要になります。

## ステップ5：コントラクトのインスタンスを作成する {#instance-contract}

さて、コントラクトと対話するために、コード内でそのインスタンスを作成する必要があります。そのためには、パート1でデプロイ・スクリプトが出力したコントラクトのアドレスが必要です。コントラクトをデプロイする際に使用したアドレスを検索することで、[Etherscan](https://sepolia.etherscan.io/)や[Blockscout](https://eth-sepolia.blockscout.com/)で見つけることもできます。

![Etherscanでコントラクトのアドレスを表示する](./view-contract-etherscan.png)

上記の例では、コントラクトのアドレスは0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778です。

次に、Hardhat Ethersプラグインの`getContractAt`メソッドを使用して、名前（どのABIを使用するかを指示します）とアドレスを使用してコントラクトを作成します。`mint-nft.js`ファイルに以下を追加し、アドレスを自分のものに置き換えてください。

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## ステップ6：`.env`ファイルの確認 {#update-env}

送信するすべてのトランザクションは、アカウントの秘密鍵で署名される必要があります。チュートリアルのパート1を完了している場合、`.env`ファイルはすでに以下のようになっているはずです。

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

パブリック・アドレスを追加する必要はありません。ethersが秘密鍵からそれを算出します。

## ステップ7：トランザクションの作成 {#create-txn}

まず、`mintNFT(tokenURI)`という名前の関数を定義し、以下の手順でトランザクションを作成しましょう。

1. トランザクションを送信するアカウントを取得します。`ethers.getSigners()`はネットワークに設定されたアカウントを返します。Sepoliaの場合、これは`.env`に秘密鍵があるアカウントです。`mintNFT`は`onlyOwner`であるため、これはコントラクトをデプロイしたのと同じアカウントである必要があります。

1. コントラクトのインスタンスで`mintNFT`関数を呼び出し、自分自身のアドレスを受信者として、メタデータのURIを指定します。これがこのトランザクションで実行したい計算であり、この場合はNFTのミンティングです。

ナンス（リプレイ攻撃を防ぐための、あなたのアドレスから送信されたトランザクションの数）、ガス・リミット、または手数料を自分で計算する必要はありません。ethersがトランザクションを送信する前にそれらを取得または見積もります。

現在の`mint-nft.js`ファイルは以下のようになっているはずです。

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // トランザクションを送信します。ethersがノンス、ガスリミット、手数料を自動的に入力します。
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## ステップ8：トランザクションへの署名 {#sign-txn}

ネットワークは私たちの秘密鍵で設定されているため、ethersはトランザクションを送信する前に自動的にそれで署名します。

`mintNFT`を呼び出すと、トランザクションが送信された後に戻り値としてトランザクション・ハッシュが得られます。これを使用して、トランザクションがマイニングされ、ネットワークによって破棄されなかったことを確認できます。その後、`tx.wait()`はトランザクションがブロックに含まれるまで待機します。また、トランザクションが正常に処理されたかどうかを知るために、いくつかのエラーチェックも追加しました。

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // トランザクションを送信します。ethersがノンス、ガスリミット、手数料を自動的に入力します。
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // トランザクションがブロックに含まれるのを待ちます。
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## ステップ9：`mintNFT`の呼び出しと`mint-nft.js`の実行 {#call-mintnft-fn}

Pinataにアップロードした`nft-metadata.json`を覚えていますか？PinataからそのCIDを取得し、`ipfs://<metadata-CID>`を関数`mintNFT`のパラメータとして渡します。ウォレットやマーケットプレイスは、任意のIPFSゲートウェイを通じて`ipfs://` URIを解決するため、あなたのNFTが単一のゲートウェイに依存することはありません。

> 別のウィンドウで`https://gateway.pinata.cloud/ipfs/<metadata-CID>`を読み込み、コピーしたCIDが**nft-metadata.json**にリンクしていることを再確認してください。ページは以下のスクリーンショットのようになるはずです。

![ページにはJSONメタデータが表示されるはずです](./metadataJSON.png)_ページにはJSONメタデータが表示されるはずです_

全体として、コードは以下のようになるはずです。

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // トランザクションを送信します。ethersがノンス、ガスリミット、手数料を自動的に入力します。
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // トランザクションがブロックに含まれるのを待ちます。
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

それでは、Sepoliaに対してスクリプトを実行し、NFTをミントします。

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

数秒後、ターミナルに以下のような応答が表示されるはずです。

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

トランザクションの詳細を確認するには、[Etherscan](https://sepolia.etherscan.io/)または[Blockscout](https://eth-sepolia.blockscout.com/)でそのハッシュを検索してください。

![EtherscanでNFTのトランザクション・ハッシュを表示する](./view-nft-etherscan.png)_EtherscanでNFTのトランザクション・ハッシュを表示する_

これで完了です！イーサリアムのブロックチェーン上でNFTをデプロイし、ミントすることができました <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js`を使用すれば、心（とウォレット）が望む限り、いくらでもNFTをミントできます！ただし、NFTのメタデータを記述した新しい`tokenURI`を渡すことを忘れないでください（そうしないと、IDが異なるだけの同一のNFTを大量に作成することになります）。

おそらく、ウォレットで自分のNFTを自慢したいと思うでしょう。ぜひ[パート3：ウォレットでNFTを表示する方法](/developers/tutorials/how-to-view-nft-in-metamask/)をチェックしてください！
