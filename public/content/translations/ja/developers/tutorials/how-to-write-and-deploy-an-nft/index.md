---
title: NFTの作成&デプロイ方法(NFTチュートリアルシリーズの1/3)
description: このチュートリアルは、イーサリアムとInterPlanetary File System(IPFS)を使用して、非代替性トークン(ERC-721トークン)のスマートコントラクトを作成、デプロイする方法について、段階的に学ぶNFTシリーズのパート1です
author: "Sumi Mudgil"
tags:
  - "ERC-721"
  - "Alchemy"
  - "Solidity"
  - "スマートコントラクト"
skill: beginner
lang: ja
published: 2021-04-22
---

NFTによってブロックチェーンが世間の目に触れるようになった今、イーサリアムブロックチェーン上に自分のNFTコントラクト(ERC-721トークン)を公開することで、自身のモチベーションを高める絶好の機会となります。

Alchemyは、Makersplace(直近では、Christie'sでレコードデジタルアートワークが$69Mで落札され、記録を更新)、 Dapper Labs(NBA Top Shot&Crypto Kittiesのクリエイター)、OpenSea(世界最大のNFTマーケットプレイス)、Zora、Super Rare、NFTFi、Foundation、Enjin、Origin Protocol、Immutableなど、NFTスペースで著名人の力になれることを非常に誇りに思っています。

このチュートリアルでは、[MetaMask](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org/)、[Pinata](https://pinata.cloud/)、[Alchemy](https://alchemy.com/signup/eth)を使用してSepoliaテストネットワーク上でERC-721スマートコントラクトの作成とデプロイのウォークスルーを行います(現時点でしっかりと理解できていなくても、心配はご無用です。後ほどご説明します) 。

チュートリアルのパート2では、スマートコントラクトを使用してNFTをミントする方法について、パート3では、MetaMaskでNFTを表示する方法について説明します。

ご質問があれば[Alchemy Discord](https://discord.gg/gWuC7zB)にお問い合わせいただくか、 [AlchemyのNFT API docs](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)をご覧ください。

## ステップ1: イーサリアムネットワークに接続する {#connect-to-ethereum}

イーサリアムのブロックチェーンにリクエストを行う方法はたくさんありますが、ここでは分かりやすくするため、[Alchemy](https://alchemy.com/signup/eth)の無料アカウントを使用します。このアカウントはブロックチェーンの開発者プラットフォームとAPIで、独自のノードを実行せずにイーサリアムチェーンと通信できるものです。

このチュートリアルでは、スマートコントラクトのデプロイメントの仕組みを理解するために、Alchemyの開発者用ツールも活用します。 Alchemyアカウントをお持ちでない場合は、 [こちら](https://alchemy.com/signup/eth)から無料で登録できます。

## ステップ2: アプリ(およびAPIキー)を作成する {#make-api-key}

Alchemyのアカウントを作成すると、アプリを作成することでAPIキーを生成できます。 これにより、Sepoliaテストネットワークへのリクエストが可能になります。 テストネットワークの詳細については、[こちらのガイド](https://docs.alchemyapi.io/guides/choosing-a-network)をご覧ください。

1. ナビゲーションバーの「Apps」にマウスを合わせて、「Create App)」をクリックし、Alchemyダッシュボードの「Create App」ページに移動してください。

![アプリを作成する](./create-your-app.png)

2. アプリに名前を付け(私たちは「My First NFT!」にしました)、簡単な説明を記述し、「Ethereum」チェーンを選択して、ネットワークに「Sepolia」を設定します。 マージ以降、他のテストネットは非推奨となっています。

![アプリを設定して公開する](./alchemy-explorer-sepolia.png)

3. 「Create app」をクリックして完了です。 下記のテーブルにアプリが表示されます。

## ステップ 3: イーサリアムアカウント(アドレス)を作成する {#create-eth-address}

トランザクションの送受信には、イーサリアムアカウントが必要です。 このチュートリアルでは、イーサリアムアカウントアドレスを管理するためにブラウザの仮想ウォレットであるMetamaskを使用します。 イーサリアムのトランザクションの仕組みの詳細については、イーサリアム・ファウンデーションの[こちらのページ](/developers/docs/transactions/)をご覧ください。

Metamaskのアカウントは[こちら](https://metamask.io/download.html)から無料でダウンロード、作成できます。 アカウントを作成後、またはすでにアカウントをお持ちの場合は(実際に支払いが発生しないように)右上の「Sepolia Test Network」に切り替えてください。

![Sepoliaをネットワークとして設定する](./metamask-goerli.png)

## ステップ4: フォーセットからイーサリアムを追加する {#step-4-add-ether-from-a-faucet}

テストネットワークにスマートコントラクトをデプロイするには、偽のETHが複数必要になります。 ETHを取得するには、Alchemyがホストする[Sepoliaフォーセット](https://sepoliafaucet.com/)へ行き、ログインしてアカウントアドレスを入力し、「Send Me ETH」をクリックしてください。 MetamaskアカウントにETHが表示されるはずです。

## ステップ5: 残高を確認する {#check-balance}

残高を再度確認するには、 [Alchemy CHAINS APIS](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)を使用して [eth_getBalance](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)をリクエストしてみましょう。 リクエストすると、ウォレット内のETHの量が返却されます。 Metamaskアカウントアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されます。

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **注:** この結果の単位はweiであり、ETHではありません。 weiはETHの最小単位として使われています。 「wei」 から「ETH」への変換は次の通りです: 1 eth = 10<sup>18</sup> wei 。 例えば、0xde0b6b3a7640000を10進数に変換すると1*10<sup>18</sup> weiとなり、1ETHに相当します。

ご安心ください。 私たちの偽物のお金はすべてそこにあります。

## ステップ6: プロジェクトを初期化する {#initialize-project}

まず、プロジェクトのフォルダを作成する必要があります。 コマンドラインに移動し、次のように入力します。

    mkdir my-nft
    cd my-nft

プロジェクトフォルダに入ったら、 npm initを使用してプロジェクトを初期化します。 npmがインストールされていない場合は、[こちらの手順](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)に従ってください。([Node.js](https://nodejs.org/en/download/)も必要となりますので、こちらもダウンロードしてください。)

    npm init

インストール時の質問に対する回答方法は自由です。参考までに過去の回答方法は次のとおりです。

    package name: (my-nft)
    version: (1.0.0)
    description: My first NFT!
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
      "description": "My first NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }

「package.json」を承認してください。これで準備が完了しました。

## ステップ7: [Hardhat](https://hardhat.org/getting-started/#overview)をインストールする {#install-hardhat}

Hardhatは、イーサリアムのソフトウェアをコンパイル、デプロイ、テスト、デバッグするための開発環境です。 開発者がライブチェーンにデプロイする前に、スマートコントラクトやDappsをローカルに構築する際に役立ちます。

「my-nft」プロジェクトの中で実行してください。

    npm install --save-dev hardhat

[インストール手順](https://hardhat.org/getting-started/#overview)の詳細については、こちらのページをご覧ください。

## ステップ8: Hardhatプロジェクトを作成する {#create-hardhat-project}

プロジェクトフォルダ内で実行してください。

    npx hardhat

次に、ウェルカムメッセージと選択肢が表示されます。 「create an empty hardhat.config.js」を選択してください。

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

「hardhat.config.js」というファイルが生成され、ここでプロジェクトのセットアップの全てを指定します (ステップ13)。

## ステップ9: プロジェクトフォルダを追加する {#add-project-folders}

プロジェクトを整理するために、2つの新しいフォルダを作成します。 コマンドラインでプロジェクトのルートディレクトリに移動し、次のように入力します。

    mkdir contracts
    mkdir scripts

- 「contracts/」は、NFT スマートコントラクトコードを保持する場所です。

- 「scripts/」 は、スマートコントラクトをデプロイして対話するスクリプトを保持する場所です。

## ステップ10: コントラクトを作成する {#write-contract}

さて、環境が整ったところで、もっと面白いことをやりましょう。_スマートコントラクトのコードの作成です。_

お気に入りのエディタでmy-nftプロジェクトを開きます(通常は[VScode](https://code.visualstudio.com/)を使用しています)。 スマートコントラクトは、Solidityと呼ばれる言語で記述されています。MyNFT.solスマートコントラクトの作成にこの言語を使用します。

1. `contracts`フォルダに移動し、MyNFT.solという名前の新規ファイルを作成します。

2. 以下は、 NFTスマートコントラクトコードです。これは[OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721)ライブラリのERC-721実装に基づいています。 以下の内容をコピーして、MyNFT.solファイルに貼り付けます。

   ```solidity
   //Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. OpenZeppelinのコントラクトライブラリからクラスを継承しているので、コマンドラインで`npm install @openzeppelin/contracts`を実行して、ライブラリをフォルダにインストールします。

では、このコードの_役割_は一体何でしょうか。 一行ずつ分解してみましょう。

スマートコントラクトの先頭で、3つの[OpenZeppelin](https://openzeppelin.com/)スマートコントラクトのクラスをインポートしています。

- @openzeppelin/contracts/token/ERC721/ERC721.solには、ERC-721標準の実装が含まれており、NFTスマートコントラクトはこれを継承しています。 (有効なNFTであるためには、スマートコントラクトはERC-721標準のすべてのメソッドを実装する必要があります。) 継承されたERC-721関数の詳細については、[こちら](https://eips.ethereum.org/EIPS/eip-721)のインターフェイス定義をご覧ください。

- @openzeppelin/contracts/utils/Counters.solは、1つずつ増減するカウンタを提供しており、 私たちのスマートコントラクトは、ミントされたNFTの合計数を追跡し、新しいNFTにユニークなIDを設定するためにカウンタを使用しています。 (スマートコントラクトを使用してミントされた各NFTには、ユニークなIDが割り当てられている必要があります。ここでは、ユニークIDは、存在するNFTの合計数によって決定されます。 例えば、スマートコントラクトでミントした最初のNFTには「1」のIDが付与され、2番目のNFTには「2」のIDが付与されます。)

- @openzeppelin/contracts/access/Ownable.solは[アクセスコントロール](https://docs.openzeppelin.com/contracts/3.x/access-control)をスマートコントラクトに設定するため、スマートコントラクトの所有者(あなた)だけがNFTをミントできます。 (注: アクセス制御の実装は完全に任意です。 スマートコントラクトを使って誰でもNFTをミントできるようにしたい場合は、10行目の「Ownable」、17行目の「onlyOwner」を削除します。)

インポートステートメントの後にカスタムNFTスマートコントラクトがありますが、非常に短いもので、カウンタ、コンストラクタ、単一の関数しか含まれていません。 これは、NFTの所有者を返す`ownerOf`とNFTの所有権を他のアカウントに転送する`transferFrom`など、NFTを作成するために必要な大部分のメソッドを実装しているOpenZeppelinコントラクトを継承したおかげです。

ERC-721コンストラクタでは、「MyNFT」と「NFT」の2つの文字列を渡すことに気づくでしょう。 最初の変数はスマートコントラクトの名前で、2番目の変数はそのシンボルです。 これらの変数にはそれぞれに自由に名前を付けることができます。

最後に、`mintNFT(address recipient, string memory tokenURI)`という関数で、NFTをミントすることできます。 この関数には2つの変数が必要です。

- `address recipient`は、新しくミントされたNFTを受け取るアドレスを指定します。

- `string memory tokenURI`は、NFTのメタデータを記述したJSONドキュメントに解決される必要がある文字列です。 NFTのメタデータは、名前、説明、画像、その他の属性など、設定可能なプロパティを持つことができます。 チュートリアルのパート2では、このメタデータの設定方法について説明します。

`mintNFT`は継承されたERC-721ライブラリから複数のメソッドを呼び出し、最終的にミントされたばかりのNFTのIDを示す数値を返します。

## ステップ11: MetaMaskとAlchemyをプロジェクトに接続する {#connect-metamask-and-alchemy}

ここまででMetaMaskウォレットとAlchemyアカウントを作成し、スマートコントラクトを書きました。次はこの3つのアカウントを繋げていきましょう。

仮想ウォレットから送信されるすべてのトランザクションには、固有の秘密鍵を使用した署名が必要です。 この許可をプログラムに与えるために、秘密鍵(とAlchemyのAPIキー)を環境ファイルに安全に格納する作業を行います。

トランザクションの送信の詳細については、web3を使用したトランザクションの送信に関する[こちらのチュートリアル](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)をご覧ください。

まず、プロジェクトディレクトリにdotenvパッケージをインストールします。

    npm install dotenv --save

次に、 `.env`ファイルをプロジェクトのルートディレクトリに作成し、そのファイルにMetamaskの秘密鍵とHTTP Alchemy APIのURLを追加します。

- MetaMaskから秘密鍵をエクスポートするには、 [こちらの手順](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)に従ってください。

- HTTP Alchemy API URLを取得し、クリップボードにコピーするには、以下を参照してください。

![Alchemy API URLをコピーする](./copy-alchemy-api-url.gif)

`.env`ファイルは次のようになります。

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

これらの変数を実際にコードに接続するために、ステップ13で hardhat.config.jsファイル内のこれらの変数を参照します。

<EnvWarningBanner />

## ステップ12: Ethers.jsをインストールする {#install-ethers}

Ethers.jsは、よりユーザーフレンドリーなメソッドで[標準のJSON-RPCメソッド](/developers/docs/apis/json-rpc/)をラップすることにより、イーサリアムとの対話やリクエストを簡単にするライブラリです。

Hardhatは、追加のツールと拡張機能のための[プラグイン](https://hardhat.org/plugins/)の統合を非常に簡単にしてくれます。 コントラクトのデプロイメントに[Ethersプラグイン](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html)を利用します([Ethers.js](https://github.com/ethers-io/ethers.js/)には、複数の非常にクリーンなコントラクトのデプロイメント方法があります)。

プロジェクトのホームディレクトリで以下を実行します。

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

次のステップでは、 hardhat.config.js でもイーサリアムが必要になります。

## ステップ13: hardhat.config.jsをアップデートする {#update-hardhat-config}

これまでにいくつかの依存関係とプラグインを追加しました。プロジェクトがそれらすべてを知るように、 hardhat.config.js を更新する必要があります。

「hardhat.config.js」を以下のように更新してください:

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

## ステップ14: コントラクトをコンパイルする {#compile-contract}

ここまででしっかりと動作していることを確認するため、コントラクトをコンパイルしてみましょう。 コンパイルは、Hardhat の組み込まれた機能の1つです。

コマンドラインで以下を実行します。

    npx hardhat compile

SPDX license identifier not provided in source file という警告が表示されるかもしれません。しかし、それについて心配する必要はありません — うまくいけば、他のすべてが良く見えるでしょう！ 表示された場合は、いつでも[Alchemy discord](https://discord.gg/u72VCg3)でメッセージを送信できます。

## ステップ15: デプロイスクリプトを書く {#write-deploy}

コントラクトの作成と設定ファイルの作成が完了したら、いよいよコントラクトのデプロイのためのスクリプトを作成します。

`scripts/` フォルダに移動し、 `deploy.js` という名前の新しいファイルを作成し、以下の内容を追加します:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhatがコードの各行で行っている驚くべき内容については、Hardhatの[コントラクトチュートリアル](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)で説明されています。以下では、その説明を採用しています。

    const MyNFT = await ethers.getContractFactory("MyNFT");

ethers.js の中の ContractFactory は新しいスマートコントラクトを作成するための抽象化です。ここでの MyNFT は NFT コントラクトのインスタンスのためのファクトリです。 hardhat-ethers プラグインを使用する場合、 ContractFactory および Contract インスタンスはデフォルトで最初の署名者に接続されます。

    const myNFT = await MyNFT.deploy();

ContractFactory の deploy() を呼び出すとデプロイメントが開始し、 Contract を解決するための Promise が返されます。 これは、スマートコントラクトの各関数に対するメソッドを持つオブジェクトです。

## ステップ16: コントラクトをデプロイする {#deploy-contract}

ようやく、スマートコントラクトをデプロイする準備が整いました。 プロジェクトディレクトリのルートに戻り、コマンドラインで以下を実行します:

    npx hardhat --network sepolia run scripts/deploy.js

次のような画面が表示されるはずです。

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

[Sepolia etherscan](https://sepolia.etherscan.io/)に移動し、コントラクトアドレスを検索すると、正常にデプロイされたことが確認できるはずです。 すぐに見られない場合は、しばらくお待ちください。 トランザクションは以下のようなものになります。

![Etherscan でトランザクションアドレスを表示する](./etherscan-sepoila-contract-creation.png)

From アドレスは MetaMask アカウントアドレスと一致し、To アドレスは「Contract Creation」となります。 トランザクション内容をクリックすると、To フィールドにコントラクトアドレスが表示されます:

![Etherscanでコントラクトアドレスを表示する](./etherscan-sepolia-tx-details.png)

Yassss！ イーサリアム(テストネット)チェーンにNFTスマートコントラクトをデプロイできました。

内部で何が起こっているのかを理解するために、[Alchemyダッシュボード](https://dashboard.alchemyapi.io/explorer)のExplorerタブに移動してみましょう。 Alchemy のアプリが複数ある場合は、必ずアプリでフィルタリングし、「MyNFT」を選択してください。

![Alchemy のエクスプローラーダッシュボードで「内部」で行われた通話を表示する](./alchemy-explorer-goerli.png)

ここでは、 .deploy() 関数を呼び出した際に、Hardhat/Ethers が内部で作った JSON-RPC の呼び出しをいくつか見ることができます。 ここで呼び出している2つの重要なJSON-RPCは、実際にSepoliaチェーン上でコントラクトを書き込むリクエストの[eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction)と、(トランザクションを送信する際の典型的なパターンである) ハッシュを与えられたトランザクションに関する情報を読み取るリクエスト[eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)です。 トランザクションの送信の詳細については、このチュートリアルの [Web3 を使用したトランザクションの送信](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) をご覧ください。

以上がこのチュートリアルのパート1です。 [パート2](/developers/tutorials/how-to-mint-an-nft/) では、NFT を発行することで実際にスマートコントラクトとやりとりをします。そして、[パート3](/developers/tutorials/how-to-view-nft-in-metamask/) では、Etherreum ウォレット内の NFT を確認する方法を示します！
