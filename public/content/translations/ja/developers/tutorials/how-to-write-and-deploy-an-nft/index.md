---
title: "NFTの作成とデプロイ方法（NFTチュートリアルシリーズのパート1/3）"
description: "このチュートリアルはNFTに関するシリーズのパート1であり、イーサリアムとInter Planetary File System（IPFS）を使用して、非代替性トークン（ERC-721トークン）のスマート・コントラクトを作成およびデプロイする方法をステップバイステップで説明します。"
author: "スミ・ムドギル"
tags: ["ERC-721", "Alchemy", "Solidity", "スマート・コントラクト"]
skill: beginner
breadcrumb: "NFTの作成とデプロイ"
lang: ja
published: 2021-04-22
---

NFTがブロックチェーンを世間の注目を集める中、イーサリアムのブロックチェーン上で独自のNFTコントラクト（ERC-721トークン）を公開することで、その熱狂を自ら理解する絶好の機会です！

Alchemyは、Makersplace（最近Christie'sで6,900万ドルのデジタルアートワーク販売記録を樹立）、Dapper Labs（NBA Top ShotとCrypto Kittiesのクリエイター）、オープンシー（世界最大のNFTマーケットプレイス）、Zora、Super Rare、NFTfi、Foundation、Enjin、Origin Protocol、Immutableなど、NFT分野のビッグネームを支えていることを非常に誇りに思っています。

このチュートリアルでは、[メタマスク](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org/)、[Pinata](https://pinata.cloud/)、および[Alchemy](https://alchemy.com/signup/eth)を使用して、Sepoliaテストネット上にERC-721スマート・コントラクトを作成およびデプロイする手順を説明します（これらの意味がまだわからなくても心配しないでください。後で説明します！）。

このチュートリアルのパート2では、スマート・コントラクトを使用してNFTをミントする方法を説明し、パート3ではメタマスクでNFTを表示する方法を説明します。

もちろん、途中で質問がある場合は、遠慮なく[Alchemyのディスコード](https://discord.gg/gWuC7zB)で質問するか、[AlchemyのNFT APIドキュメント](https://www.alchemy.com/docs/reference/nft-api-quickstart)にアクセスしてください！

## ステップ1：イーサリアムのネットワークに接続する {#connect-to-ethereum}

イーサリアムのブロックチェーンにリクエストを送信する方法はたくさんありますが、簡単にするために、独自のノードを実行せずにイーサリアムのチェーンと通信できるブロックチェーン開発者プラットフォームおよびAPIである[Alchemy](https://alchemy.com/signup/eth)の無料アカウントを使用します。

このチュートリアルでは、Alchemyの監視および分析用の開発者ツールも活用して、スマート・コントラクトのデプロイの内部で何が起こっているかを理解します。まだAlchemyアカウントを持っていない場合は、[こちら](https://alchemy.com/signup/eth)から無料でサインアップできます。

## ステップ2：アプリ（およびAPIキー）を作成する {#make-api-key}

Alchemyアカウントを作成したら、アプリを作成してAPIキーを生成できます。これにより、Sepoliaテストネットにリクエストを送信できるようになります。テストネットについて詳しく知りたい場合は、[こちらのガイド](https://www.alchemy.com/docs/choosing-a-web3-network)を確認してください。

1. ナビゲーションバーの「Apps」にカーソルを合わせ、「Create App」をクリックして、Alchemyダッシュボードの「Create App」ページに移動します。

![Create your app](./create-your-app.png)

2. アプリに名前を付け（ここでは「My First NFT!」を選択しました）、簡単な説明を入力し、チェーンに「Ethereum」を選択し、ネットワークに「Sepolia」を選択します。マージ以降、他のテストネットは非推奨になりました。

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. 「Create app」をクリックすれば完了です！アプリが下の表に表示されるはずです。

## ステップ3：イーサリアムのアカウント（アドレス）を作成する {#create-eth-address}

トランザクションを送受信するには、イーサリアムのアカウントが必要です。このチュートリアルでは、イーサリアムのアカウントのアドレスを管理するためにブラウザで使用される仮想ウォレットであるメタマスクを使用します。イーサリアムでのトランザクションの仕組みについて詳しく知りたい場合は、イーサリアム財団の[こちらのページ](/developers/docs/transactions/)を確認してください。

[こちら](https://metamask.io/download)からメタマスクをダウンロードして、無料でアカウントを作成できます。アカウントを作成する際、またはすでにアカウントを持っている場合は、右上のネットワークを「Sepolia Test Network」に切り替えてください（実際の資金を扱わないようにするためです）。

![Set Sepolia as your network](./metamask-goerli.png)

## ステップ4：フォーセットからイーサを追加する {#step-4-add-ether-from-a-faucet}

スマート・コントラクトをテストネットにデプロイするには、テスト用のETHが必要です。ETHを取得するには、Alchemyがホストする[Sepoliaフォーセット](https://sepoliafaucet.com/)にアクセスし、ログインしてアカウントのアドレスを入力し、「Send Me ETH」をクリックします。すぐにメタマスクのアカウントにETHが表示されるはずです！

## ステップ5：残高を確認する {#check-balance}

残高があることを再確認するために、[Alchemyのサンドボックスツール](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)を使用して[eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance)リクエストを送信してみましょう。これにより、ウォレット内のETHの量が返されます。メタマスクのアカウントのアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されるはずです。

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **注** この結果はETHではなくWeiで表示されています。Weiはイーサの最小単位として使用されます。WeiからETHへの変換は、1 eth = 10<sup>18</sup> Weiです。したがって、0xde0b6b3a7640000を10進数に変換すると、1\*10<sup>18</sup> Weiとなり、1 ETHに等しくなります。

ふう！テスト用の資金がちゃんと入っていますね。
## ステップ6：プロジェクトを初期化する {#initialize-project}

まず、プロジェクト用のフォルダを作成する必要があります。コマンドラインに移動して次のように入力します。

    mkdir my-nft
    cd my-nft

プロジェクトフォルダに入ったので、npm initを使用してプロジェクトを初期化します。npmをまだインストールしていない場合は、[Node.jsのインストール手順](https://nodejs.org/en/download/)に従ってください（このチュートリアルではNode.jsとnpmが必要です）。

    npm init

インストール時の質問にどのように答えても特に問題はありません。参考までに、私たちがどのように答えたかを以下に示します。

```json
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
```

package.jsonを承認すれば、準備完了です！
## ステップ7：[Hardhat](https://hardhat.org/getting-started/#overview)をインストールする {#install-hardhat}

Hardhatは、イーサリアムのソフトウェアをコンパイル、デプロイ、テスト、およびデバッグするための開発環境です。ライブチェーンにデプロイする前に、ローカルでスマート・コントラクトやdappを構築する際に開発者を支援します。

my-nftプロジェクト内で以下を実行します。

    npm install --save-dev hardhat

[インストール手順](https://hardhat.org/getting-started/#overview)の詳細については、こちらのページを確認してください。

## ステップ8：Hardhatプロジェクトを作成する {#create-hardhat-project}

プロジェクトフォルダ内で以下を実行します。

    npx hardhat

すると、ウェルカムメッセージと実行したい操作を選択するオプションが表示されます。「create an empty hardhat.config.js」を選択します。

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

これにより、プロジェクトのすべての設定を指定するhardhat.config.jsファイルが生成されます（ステップ13で設定します）。

## ステップ9：プロジェクトフォルダを追加する {#add-project-folders}

プロジェクトを整理するために、2つの新しいフォルダを作成します。コマンドラインでプロジェクトのルートディレクトリに移動し、次のように入力します。

    mkdir contracts
    mkdir scripts

- contracts/ は、NFTのスマート・コントラクトのコードを保存する場所です。

- scripts/ は、スマート・コントラクトをデプロイして対話するためのスクリプトを保存する場所です。

## ステップ10：コントラクトを作成する {#write-contract}

環境が整ったので、さらにエキサイティングな作業に進みましょう。_スマート・コントラクトのコードの作成です！_

お気に入りのエディタ（私たちは[VSCode](https://code.visualstudio.com/)が好きです）でmy-nftプロジェクトを開きます。スマート・コントラクトはSolidityと呼ばれる言語で記述されており、これを使用してMyNFT.solスマート・コントラクトを作成します。‌

1. `contracts`フォルダに移動し、MyNFT.solという新しいファイルを作成します。

2. 以下は、[オープンツェッペリン](https://docs.openzeppelin.com/contracts/3.x/erc721)ライブラリのERC-721実装に基づいたNFTスマート・コントラクトのコードです。以下の内容をコピーしてMyNFT.solファイルに貼り付けます。

   ```solidity
   //[https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721) に基づくコントラクト
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

3. オープンツェッペリンのコントラクトライブラリからクラスを継承しているため、コマンドラインで`npm install @openzeppelin/contracts^4.0.0`を実行して、ライブラリをフォルダにインストールします。

では、このコードは正確に_何をする_のでしょうか？行ごとに分解してみましょう。

スマート・コントラクトの先頭で、3つの[オープンツェッペリン](https://openzeppelin.com/)のスマート・コントラクトクラスをインポートします。

- @openzeppelin/contracts/token/ERC721/ERC721.solには、NFTスマート・コントラクトが継承するERC-721標準の実装が含まれています。（有効なNFTであるためには、スマート・コントラクトがERC-721標準のすべてのメソッドを実装している必要があります。）継承されたERC-721関数について詳しく知りたい場合は、[こちら](https://eips.ethereum.org/EIPS/eip-721)のインターフェース定義を確認してください。

- @openzeppelin/contracts/utils/Counters.solは、1ずつインクリメントまたはデクリメントすることしかできないカウンターを提供します。私たちのスマート・コントラクトは、ミントされたNFTの総数を追跡し、新しいNFTに一意のIDを設定するためにカウンターを使用します。（スマート・コントラクトを使用してミントされた各NFTには一意のIDを割り当てる必要があります。ここでは、一意のIDは存在するNFTの総数によって決定されます。たとえば、スマート・コントラクトでミントする最初のNFTのIDは「1」、2番目のNFTのIDは「2」のようになります。）

- @openzeppelin/contracts/access/Ownable.solは、スマート・コントラクトに[アクセス制御](https://docs.openzeppelin.com/contracts/3.x/access-control)を設定し、スマート・コントラクトの所有者（あなた）のみがNFTをミントできるようにします。（注：アクセス制御を含めるかどうかは完全に好みの問題です。誰でもスマート・コントラクトを使用してNFTをミントできるようにしたい場合は、10行目のOwnableと17行目のonlyOwnerという単語を削除してください。）

インポート文の後に、カスタムのNFTスマート・コントラクトがあります。これは驚くほど短く、カウンター、コンストラクタ、および単一の関数のみが含まれています！これは、NFTの所有者を返す`ownerOf`や、あるアカウントから別のアカウントへNFTの所有権を移転する`transferFrom`など、NFTを作成するために必要なほとんどのメソッドを実装している、継承されたオープンツェッペリンのコントラクトのおかげです。

ERC-721のコンストラクタでは、「MyNFT」と「NFT」という2つの文字列を渡していることに気付くでしょう。最初の変数はスマート・コントラクトの名前であり、2番目の変数はそのシンボルです。これらの変数は好きな名前に設定できます！

最後に、NFTをミントできる関数`mintNFT(address recipient, string memory tokenURI)`があります！この関数は2つの変数を受け取ることに気付くでしょう。

- `address recipient`は、新しくミントされたNFTを受け取るアドレスを指定します。

- `string memory tokenURI`は、NFTのメタデータを記述するJSONドキュメントに解決されるべき文字列です。NFTのメタデータは、名前、説明、画像、その他の属性などの構成可能なプロパティを持たせることで、NFTに命を吹き込むものです。このチュートリアルのパート2では、このメタデータを構成する方法について説明します。

`mintNFT`は、継承されたERC-721ライブラリからいくつかのメソッドを呼び出し、最終的に新しくミントされたNFTのIDを表す数値を返します。

## ステップ11：メタマスクとAlchemyをプロジェクトに接続する {#connect-metamask-and-alchemy}

メタマスクのウォレット、Alchemyアカウントを作成し、スマート・コントラクトを作成したので、これら3つを接続する時が来ました。

仮想ウォレットから送信されるすべてのトランザクションには、固有の秘密鍵を使用した署名が必要です。プログラムにこの権限を提供するために、秘密鍵（およびAlchemy APIキー）を環境ファイルに安全に保存できます。

トランザクションの送信について詳しく知りたい場合は、Web3を使用したトランザクションの送信に関する[こちらのチュートリアル](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)を確認してください。

まず、プロジェクトディレクトリにdotenvパッケージをインストールします。

    npm install dotenv --save

次に、プロジェクトのルートディレクトリに`.env`ファイルを作成し、メタマスクの秘密鍵とHTTP Alchemy API URLを追加します。

- [こちらの手順](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)に従って、メタマスクから秘密鍵をエクスポートします。

- 以下の手順でHTTP Alchemy API URLを取得し、クリップボードにコピーします。

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

`.env`は次のようになります。

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

これらを実際にコードに接続するために、ステップ13でhardhat.config.jsファイル内のこれらの変数を参照します。

<EnvWarningBanner />

## ステップ12：Ethers.jsをインストールする {#install-ethers}

Ethers.jsは、[標準のJSON-RPCメソッド](/developers/docs/apis/json-rpc/)をよりユーザーフレンドリーなメソッドでラップすることで、イーサリアムとの対話やリクエストの送信を容易にするライブラリです。

Hardhatを使用すると、追加のツールや拡張機能のための[プラグイン](https://hardhat.org/plugins/)を非常に簡単に統合できます。コントラクトのデプロイには[Ethersプラグイン](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)を活用します（[Ethers.js](https://github.com/ethers-io/ethers.js/)には非常にクリーンなコントラクトデプロイメソッドがいくつかあります）。

プロジェクトディレクトリで次のように入力します。

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

次のステップで、hardhat.config.jsでもethersをリクワイアします。

## ステップ13：hardhat.config.jsを更新する {#update-hardhat-config}

これまでにいくつかの依存関係とプラグインを追加しましたが、プロジェクトがそれらすべてを認識できるようにhardhat.config.jsを更新する必要があります。

hardhat.config.jsを次のように更新します。

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

## ステップ14：コントラクトをコンパイルする {#compile-contract}

これまでのところすべてが機能していることを確認するために、コントラクトをコンパイルしてみましょう。コンパイルタスクは、組み込みのHardhatタスクの1つです。

コマンドラインから以下を実行します。

    npx hardhat compile

ソースファイルにSPDXライセンス識別子が提供されていないという警告が表示される場合がありますが、心配する必要はありません。他のすべてが正常であることを願っています！そうでない場合は、いつでも[Alchemyのディスコード](https://discord.gg/u72VCg3)でメッセージを送信できます。

## ステップ15：デプロイスクリプトを作成する {#write-deploy}

コントラクトが作成され、構成ファイルの準備が整ったので、コントラクトのデプロイスクリプトを作成する時が来ました。

`scripts/`フォルダに移動し、`deploy.js`という新しいファイルを作成して、次の内容を追加します。

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // デプロイを開始し、コントラクトオブジェクトに解決されるPromiseを返す
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

Hardhatは、[コントラクトのチュートリアル](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)でこれらのコードの各行が何をするかを素晴らしい方法で説明しており、ここではその説明を採用しています。

    const MyNFT = await ethers.getContractFactory("MyNFT");

Ethers.jsのContractFactoryは、新しいスマート・コントラクトをデプロイするために使用される抽象化であるため、ここでのMyNFTはNFTコントラクトのインスタンスのファクトリです。hardhat-ethersプラグインを使用する場合、ContractFactoryとContractインスタンスはデフォルトで最初の署名者に接続されます。

    const myNFT = await MyNFT.deploy();

ContractFactoryでdeploy()を呼び出すと、デプロイが開始され、Contractに解決されるPromiseが返されます。これは、スマート・コントラクトの各関数のメソッドを持つオブジェクトです。

## ステップ16：コントラクトをデプロイする {#deploy-contract}

ついにスマート・コントラクトをデプロイする準備が整いました！プロジェクトディレクトリのルートに戻り、コマンドラインで以下を実行します。

    npx hardhat --network sepolia run scripts/deploy.js

すると、次のようなものが表示されるはずです。

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

[Sepolia Etherscan](https://sepolia.etherscan.io/)にアクセスしてコントラクトのアドレスを検索すると、正常にデプロイされたことが確認できるはずです。すぐに表示されない場合は、時間がかかることがあるため、しばらくお待ちください。トランザクションは次のようになります。

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

Fromアドレスはメタマスクのアカウントのアドレスと一致し、Toアドレスには「Contract Creation」と表示されます。トランザクションをクリックすると、Toフィールドにコントラクトのアドレスが表示されます。

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

やったー！イーサリアム（テストネット）チェーンにNFTスマート・コントラクトをデプロイしました！

内部で何が起こっているかを理解するために、[Alchemyダッシュボード](https://dashboard.alchemy.com/explorer)のExplorerタブに移動しましょう。複数のAlchemyアプリがある場合は、アプリでフィルタリングして「MyNFT」を選択してください。

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

ここでは、.deploy()関数を呼び出したときにHardhat/Ethersが内部で行ったいくつかのJSON-RPC呼び出しを確認できます。ここで注目すべき2つの重要な呼び出しは、スマート・コントラクトを実際にSepoliaチェーンに書き込むためのリクエストである[eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction)と、ハッシュを指定してトランザクションに関する情報を読み取るためのリクエストである[eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)（トランザクションを送信する際の典型的なパターン）です。トランザクションの送信について詳しく知りたい場合は、[Web3を使用したトランザクションの送信](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)に関するこちらのチュートリアルを確認してください。

このチュートリアルのパート1は以上です。[パート2では、NFTをミントすることで実際にスマート・コントラクトと対話します](/developers/tutorials/how-to-mint-an-nft/)。そして[パート3では、イーサリアムのウォレットでNFTを表示する方法を紹介します](/developers/tutorials/how-to-view-nft-in-metamask/)！
