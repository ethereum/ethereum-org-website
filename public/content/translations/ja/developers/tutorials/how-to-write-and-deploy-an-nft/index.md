---
title: "NFTの作成とデプロイ方法(NFTチュートリアルシリーズ 1/3)"
description: "このチュートリアルは、イーサリアムとInterPlanetary File System(IPFS)を使用して、非代替性トークン(ERC-721トークン)のスマートコントラクトを作成、デプロイする方法について、段階的に学ぶNFTシリーズのパート1です"
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity", "スマート契約" ]
skill: beginner
lang: ja
published: 2021-04-22
---

NFTによってブロックチェーンが世間の目に触れるようになった今、イーサリアムブロックチェーン上に自分のNFTコントラクト(ERC-721トークン)を公開することで、自身のモチベーションを高める絶好の機会となります。

Alchemyは、Makersplace (最近、クリスティーズで6900万ドルの記録的なデジタルアート作品の販売を達成)、Dapper Labs (NBA Top Shot & Crypto Kittiesの制作者)、OpenSea (世界最大のNFTマーケットプレイス)、Zora、Super Rare、NFTfi、Foundation、Enjin、Origin Protocol、Immutableなど、NFT分野のビッグネームを支えていることを非常に誇りに思っています。

このチュートリアルでは、[MetaMask](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org/)、[Pinata](https://pinata.cloud/)、[Alchemy](https://alchemy.com/signup/eth)を使用して、Sepoliaテストネット上でERC-721スマートコントラクトを作成し、デプロイする手順を説明します (これらの意味がまだ分からなくても心配はいりません — これから説明します！)。

チュートリアルのパート2では、スマートコントラクトを使用してNFTをミントする方法について、パート3では、MetaMaskでNFTを表示する方法について説明します。

もちろん、いつでも質問があれば、[Alchemy Discord](https://discord.gg/gWuC7zB)でお気軽にお問い合わせいただくか、[AlchemyのNFT APIドキュメント](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)をご覧ください！

## ステップ1: イーサリアムネットワークに接続する {#connect-to-ethereum}

イーサリアムのブロックチェーンにリクエストを送信する方法はいくつかありますが、簡単にするために、[Alchemy](https://alchemy.com/signup/eth)の無料アカウントを使用します。Alchemyは、独自のノードを実行することなくイーサリアムチェーンと通信できる、ブロックチェーン開発者向けのプラットフォームおよびAPIです。

このチュートリアルでは、スマートコントラクトのデプロイメントの仕組みを理解するために、Alchemyの開発者用ツールも活用します。 まだAlchemyアカウントをお持ちでない場合は、[こちら](https://alchemy.com/signup/eth)から無料で登録できます。

## ステップ2: アプリ (およびAPIキー) を作成する {#make-api-key}

Alchemyのアカウントを作成した後、アプリを作成することでAPIキーを生成することができます。 これにより、Sepoliaテストネットワークへのリクエストが可能になります。 テストネットについてさらに詳しく知りたい場合は、[こちらのガイド](https://docs.alchemyapi.io/guides/choosing-a-network)をご覧ください。

1. ナビゲーションバーの「Apps」にマウスを合わせて、「Create App)」をクリックし、Alchemyダッシュボードの「Create App」ページに移動してください。

![アプリを作成](./create-your-app.png)

2. アプリに名前を付け(私たちは「My First NFT!」にしました)、簡単な説明を記述し、「Ethereum」チェーンを選択して、ネットワークに「Sepolia」を設定します。 マージ以降、他のテストネットは非推奨となっています。

![アプリを設定して公開する](./alchemy-explorer-sepolia.png)

3. 「Create app」をクリックします。 アプリが下の表に表示されます。

## ステップ3: イーサリアムアカウント (アドレス) を作成する {#create-eth-address}

トランザクションの送受信には、イーサリアムアカウントが必要です。 このチュートリアルでは、イーサリアムアカウントアドレスを管理するためにブラウザの仮想ウォレットであるMetamaskを使用します。 イーサリアム上のトランザクションの仕組みについてさらに詳しく知りたい場合は、イーサリアム・ファウンデーションの[こちらのページ](/developers/docs/transactions/)をご覧ください。

MetaMaskアカウントは、[こちら](https://metamask.io/download)から無料でダウンロードして作成できます。 アカウントを作成後、またはすでにアカウントをお持ちの場合は(実際に支払いが発生しないように)右上の「Sepolia Test Network」に切り替えてください。

![Sepoliaをネットワークとして設定](./metamask-goerli.png)

## ステップ4: フォーセットからイーサを追加する {#step-4-add-ether-from-a-faucet}

テストネットワークにスマートコントラクトをデプロイするには、偽のETHが複数必要になります。 ETHを入手するには、Alchemyがホストする[Sepoliaフォーセット](https://sepoliafaucet.com/)にアクセスし、ログインしてアカウントアドレスを入力し、「Send Me ETH」をクリックします。 MetamaskアカウントにETHが表示されるはずです。

## ステップ5: 残高を確認する {#check-balance}

残高があることを再確認するために、[Alchemyのcomposerツール](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)を使用して[eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)リクエストを実行してみましょう。 このリクエストをすると、ウォレット内のETHの額が返されます。 MetaMaskアカウントアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されます。

    ```
    {"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
    ```

> **注** この結果はETHではなく、wei単位です。 weiはETHの最小単位として使われています。 「wei」 から「ETH」への変換は次の通りです: 1 eth = 10<sup>18</sup> wei 。 例えば、0xde0b6b3a7640000を10進数に変換すると1\*10<sup>18</sup> weiとなり、1ETHに相当します。

ふう! 私たちの偽物のお金はすべてそこにあります。

## ステップ6: プロジェクトを初期化する {#initialize-project}

まず、プロジェクトのフォルダを作成する必要があります。 コマンドラインに移動し、次のように入力します。

    ```
    mkdir my-nft
    cd my-nft
    ```

プロジェクトフォルダに入ったら、 npm initを使用してプロジェクトを初期化します。 まだnpmをインストールしていない場合は、[これらの手順](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)に従ってください ([Node.js](https://nodejs.org/en/download/)も必要なので、そちらもダウンロードしてください！)。

    ```
    npm init
    ```

インストール時の質問に対する回答方法は自由です。参考までに過去の回答方法は次のとおりです。

```json
    package name: (my-nft)
    version: (1.0.0)
    description: 初めてのNFT！
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "初めてのNFT！",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

「package.json」を承認してください。これで準備が完了しました。

## ステップ7: [Hardhat](https://hardhat.org/getting-started/#overview)をインストールする {#install-hardhat}

Hardhatは、イーサリアムのソフトウェアをコンパイル、デプロイ、テスト、デバッグするための開発環境です。 デベロッパーがライブチェーンにデプロイする前に、スマートコントラクトや分散型アプリケーション(Dapp)をローカルに構築する際に役立ちます。

「my-nft」プロジェクトの中で実行してください。

    ```
    npm install --save-dev hardhat
    ```

[インストール手順](https://hardhat.org/getting-started/#overview)の詳細については、このページをご覧ください。

## ステップ8: Hardhatプロジェクトを作成する {#create-hardhat-project}

プロジェクトフォルダ内で以下を実行します。

    ```
    npx hardhat
    ```

ウェルカムメッセージと、次に何をするのかを選択できるオプションが表示されます。 「create an empty hardhat.config.js」を選択してください。

    ```
    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Hardhat v2.0.11へようこそ 👷‍
    ? 何を行いますか？ …
    サンプルプロジェクトを作成する
    ❯ 空のhardhat.config.jsを作成する
    終了
    ```

「hardhat.config.js」というファイルが生成され、ここでプロジェクトのセットアップの全てを指定します (ステップ13)。

## ステップ9: プロジェクトフォルダを追加する {#add-project-folders}

プロジェクトを整理するために、2つの新しいフォルダを作成します。 コマンドラインでプロジェクトのルートディレクトリに移動し、次のように入力します。

    ```
    mkdir contracts
    mkdir scripts
    ```

- 「contracts/」は、NFT スマートコントラクトコードを保持する場所です。

- 「scripts/」 は、スマートコントラクトをデプロイして対話するスクリプトを保持する場所です。

## ステップ10: コントラクトを作成する {#write-contract}

環境が整ったので、もっと面白いこと、つまり_スマートコントラクトのコード作成_に取り掛かりましょう！

お気に入りのエディタ (私たちは[VSCode](https://code.visualstudio.com/)が好きです) でmy-nftプロジェクトを開いてください。 スマートコントラクトは、Solidityと呼ばれる言語で記述されています。MyNFT.solスマートコントラクトの作成にこの言語を使用します。

1. `contracts`フォルダに移動し、MyNFT.solという名前の新しいファイルを作成します

2. 以下は、[OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721)ライブラリのERC-721実装をベースにした、私たちのNFTスマートコントラクトのコードです。 以下の内容をコピーして、MyNFT.solファイルに貼り付けます。

   ```solidity
   //[https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721) をベースにしたコントラクト
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. OpenZeppelinのコントラクトライブラリからクラスを継承しているため、コマンドラインで`npm install @openzeppelin/contracts^4.0.0`を実行して、ライブラリをフォルダにインストールします。

では、このコードは一体何を_している_のでしょうか？ 一行ずつ分解してみましょう。

スマートコントラクトの冒頭で、3つの[OpenZeppelin](https://openzeppelin.com/)スマートコントラクトクラスをインポートします:

- @openzeppelin/contracts/token/ERC721/ERC721.solには、ERC-721標準の実装が含まれており、NFTスマートコントラクトはこれを継承しています。 (有効なNFTであるためには、スマートコントラクトはERC-721標準のすべてのメソッドを実装する必要があります。) 継承されたERC-721関数の詳細については、[こちら](https://eips.ethereum.org/EIPS/eip-721)のインターフェース定義をご確認ください。

- @openzeppelin/contracts/utils/Counters.solは、1つずつ増減するカウンタを提供しており、 私たちのスマートコントラクトは、ミントされたNFTの合計数を追跡し、新しいNFTにユニークなIDを設定するためにカウンタを使用しています。 (スマートコントラクトを使用してミントされた各NFTには、ユニークなIDが割り当てられている必要があります。ここでは、ユニークIDは、存在するNFTの合計数によって決定されます。 例えば、スマートコントラクトでミントした最初のNFTには「1」のIDが付与され、2番目のNFTには「2」のIDが付与されます。)

- @openzeppelin/contracts/access/Ownable.solは、スマートコントラクトに[アクセス制御](https://docs.openzeppelin.com/contracts/3.x/access-control)を設定するので、スマートコントラクトの所有者 (あなた) のみがNFTをミントできます。 (注: アクセス制御の実装は完全に任意です。 スマートコントラクトを使って誰でもNFTをミントできるようにしたい場合は、10行目の「Ownable」、17行目の「onlyOwner」を削除します。)

インポートステートメントの後にカスタムNFTスマートコントラクトがありますが、非常に短いもので、カウンタ、コンストラクタ、単一の関数しか含まれていません。 これは、継承したOpenZeppelinコントラクトのおかげです。このコントラクトには、NFTの所有者を返す`ownerOf`や、NFTの所有権をあるアカウントから別のアカウントに移転する`transferFrom`など、NFTの作成に必要なメソッドのほとんどが実装されています。

ERC-721コンストラクタでは、「MyNFT」と「NFT」の2つの文字列を渡すことに気づくでしょう。 最初の変数はスマートコントラクトの名前で、2番目の変数はそのシンボルです。 これらの変数にはそれぞれに自由に名前を付けることができます。

最後に、NFTをミントできる`mintNFT(address recipient, string memory tokenURI)`関数があります！ この関数には2つの変数が必要です。

- `address recipient`は、新しくミントされたNFTを受け取るアドレスを指定します

- `string memory tokenURI`は、NFTのメタデータを記述するJSONドキュメントに解決されるべき文字列です。 NFTのメタデータは、名前、説明、画像、その他の属性など、設定可能なプロパティを持つことができます。 チュートリアルのパート2では、このメタデータの設定方法について説明します。

`mintNFT`は、継承されたERC-721ライブラリからいくつかのメソッドを呼び出し、最終的に新しくミントされたNFTのIDを表す数値を返します。

## ステップ11: MetaMaskとAlchemyをプロジェクトに接続する {#connect-metamask-and-alchemy}

ここまででMetaMaskウォレットとAlchemyアカウントを作成し、スマートコントラクトを書きました。次はこの3つのアカウントを繋げていきましょう。

仮想ウォレットから送信されるすべてのトランザクションには、固有の秘密鍵を使用した署名が必要です。 この許可をプログラムに与えるために、秘密鍵(とAlchemyのAPIキー)を環境ファイルに安全に格納する作業を行います。

トランザクションの送信について詳しく知るには、web3を使用したトランザクション送信に関する[このチュートリアル](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)をご覧ください。

まず、プロジェクトディレクトリにdotenvパッケージをインストールします。

    ```
    npm install dotenv --save
    ```

次に、プロジェクトのルートディレクトリに`.env`ファイルを作成し、MetaMaskの秘密鍵とHTTP Alchemy API URLを追加します。

- MetaMaskから秘密鍵をエクスポートするには、[これらの手順](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)に従ってください

- HTTP Alchemy API URLを取得し、クリップボードにコピーするには、以下を参照してください。

![Alchemy API URLをコピー](./copy-alchemy-api-url.gif)

これで、`.env`は次のようになります:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

これらの変数を実際にコードに接続するために、ステップ13で hardhat.config.jsファイル内のこれらの変数を参照します。

<EnvWarningBanner />

## ステップ12: Ethers.jsをインストールする {#install-ethers}

Ethers.jsは、[標準のJSON-RPCメソッド](/developers/docs/apis/json-rpc/)をよりユーザーフレンドリーなメソッドでラップすることで、イーサリアムとの対話やリクエストを容易にするライブラリです。

Hardhatでは、追加のツールや拡張機能のための[プラグイン](https://hardhat.org/plugins/)を非常に簡単に統合できます。 コントラクトのデプロイには[Ethersプラグイン](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)を活用します([Ethers.js](https://github.com/ethers-io/ethers.js/)には非常にクリーンなコントラクトデプロイメントメソッドがあります)。

プロジェクトのホームディレクトリで以下を実行します。

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

次のステップのhardhat.config.jsでもEthers(.js)が必要になります。

## ステップ13: hardhat.config.jsを更新する {#update-hardhat-config}

ここまでで、いくつかの依存関係とプラグインを追加しました。次に、プロジェクトがそれらすべてを認識できるように、hardhat.config.jsをアップデートする必要があります。

hardhat.config.jsを以下のようにアップデートします。

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
       defaultNetwork: "sepolia",
       networks: {
          hardhat: {},
          sepolia: {
             url: API_URL,
             accounts: [`0x${PRIVATE_KEY}`]
          }
       },
    }
```

## ステップ14: コントラクトをコンパイルする {#compile-contract}

ここまでの作業がうまくいっていることを確認するために、コントラクトをコンパイルしてみましょう。 コンパイルは、組み込みのHardhatタスクの1つです。

コマンドラインで以下を実行します。

    ```
    npx hardhat compile
    ```

SPDXライセンス識別子がソースファイルで提供されていないという警告が表示される場合がありますが、心配する必要はありません。警告が表示されないのがベストですが、 うまくいかない場合は、いつでも[Alchemy Discord](https://discord.gg/u72VCg3)でメッセージを送ることができます。

## ステップ15: デプロイスクリプトを作成する {#write-deploy}

コントラクトの作成と設定ファイルの作成が完了したら、いよいよコントラクトのデプロイのためのスクリプトを作成します。

`scripts/`フォルダに移動して`deploy.js`という名前の新しいファイルを作成し、以下の内容を追加します:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // デプロイを開始し、コントラクトオブジェクトに解決されるプロミスを返す
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("コントラクトがデプロイされたアドレス:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhatは、[コントラクトのチュートリアル](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)で、これらのコードの各行が何をするかを非常にうまく説明しています。ここではその説明を採用しました。

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

ethers.jsのContractFactoryは新しいスマートコントラクトをデプロイするための抽象化であり、ここでのMyNFTはNFTコントラクトのインスタンスのためのファクトリです。 hardhat-ethersプラグインを使用する場合、 ContractFactoryおよびContractインスタンスはデフォルトで最初の署名者に接続されます。

    ```
    const myNFT = await MyNFT.deploy();
    ```

ContractFactoryのdeploy()を呼び出すとデプロイメントが開始し、 Contractを解決するためのPromiseが返されます。 これは、スマートコントラクトの各関数に対するメソッドを持つオブジェクトです。

## ステップ16: コントラクトをデプロイする {#deploy-contract}

ようやく、スマートコントラクトをデプロイする準備が整いました。 プロジェクトディレクトリのルートに戻り、コマンドラインで以下を実行します。

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

次のような画面が表示されるはずです。

    ```
    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

[Sepolia etherscan](https://sepolia.etherscan.io/)にアクセスし、コントラクトアドレスを検索すると、正常にデプロイされたことを確認できるはずです。 すぐに表示されない場合は、しばらくお待ちください。 トランザクションは以下のようなものになります。

![Etherscanでトランザクションアドレスを表示](./etherscan-sepoila-contract-creation.png)

FromアドレスはあなたのMetaMaskアカウントのアドレスと一致し、Toアドレスには「Contract Creation」と表示されます。 このトランザクションをクリックすると、Toフィールドにコントラクトアドレスが表示されます。

![Etherscanでコントラクトアドレスを表示](./etherscan-sepolia-tx-details.png)

おめでとうございます。 イーサリアム(テストネット)チェーンにNFTスマートコントラクトをデプロイできました。

内部で何が起こっているのかを理解するために、[Alchemyダッシュボード](https://dashboard.alchemyapi.io/explorer)のExplorerタブに移動してみましょう。 Alchemyのアプリが複数ある場合は、必ずアプリでフィルタリングして、「MyNFT」を選択してください。

![AlchemyのExplorerダッシュボードで「内部」で行われた呼び出しを表示](./alchemy-explorer-goerli.png)

ここでは、Hardhat/Ethersが.deploy()関数を呼び出した際に、内部で行ったJSON-RPCの呼び出しを見ることができます。 ここで特筆すべき重要な2つのリクエストは、実際にSepoliaチェーンにスマートコントラクトを書き込むためのリクエストである[eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction)と、ハッシュが与えられたトランザクションに関する情報を読み取るためのリクエスト (トランザクション送信時の典型的なパターン) である[eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)です。 トランザクションの送信についてさらに詳しく知るには、[Web3を使用したトランザクション送信](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)に関するこのチュートリアルをご覧ください。

チュートリアルのパート1は以上です。 [パート2では、NFTをミントしてスマートコントラクトと実際にやり取りし](/developers/tutorials/how-to-mint-an-nft/)、[パート3ではイーサリアムウォレットでNFTを表示する方法](/developers/tutorials/how-to-view-nft-in-metamask/)をご紹介します！
