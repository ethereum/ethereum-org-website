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

NFTがブロックチェーンを世間の注目を集める中、イーサリアムのブロックチェーン上に独自のNFTコントラクト（ERC-721トークン）を公開することで、その熱狂を自ら理解する絶好の機会です！

このチュートリアルでは、[メタマスク](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/)、[Hardhat](https://hardhat.org/)、[Pinata](https://pinata.cloud/)、および[Alchemy](https://alchemy.com/signup/eth)を使用して、Sepoliaテストネット上にERC-721スマート・コントラクトを作成およびデプロイする手順を説明します（これらの意味がまだわからなくても心配しないでください。後で説明します！）。

このチュートリアルのパート2では、スマート・コントラクトを使用してNFTをミントする方法を説明し、パート3ではメタマスクでNFTを表示する方法を説明します。

もちろん、途中で質問がある場合は、遠慮なく[Alchemyのディスコード](https://discord.gg/gWuC7zB)で質問するか、[AlchemyのNFT APIドキュメント](https://www.alchemy.com/docs/reference/nft-api-quickstart)にアクセスしてください！

## ステップ1：イーサリアムのネットワークに接続する {#connect-to-ethereum}

イーサリアムのブロックチェーンにリクエストを送信する方法はたくさんありますが、簡単にするために、独自のノードを実行せずにイーサリアムのチェーンと通信できるブロックチェーン開発者プラットフォームおよびAPIである[Alchemy](https://alchemy.com/signup/eth)の無料アカウントを使用します。

このチュートリアルでは、Alchemyの監視および分析用の開発者ツールも活用して、スマート・コントラクトのデプロイの内部で何が起こっているかを理解します。まだAlchemyアカウントを持っていない場合は、[こちら](https://alchemy.com/signup/eth)から無料でサインアップできます。

## ステップ2：アプリ（およびAPIキー）を作成する {#make-api-key}

Alchemyアカウントを作成したら、アプリを作成してアプリケーション・プログラミング・インターフェース（API）キーを生成できます。これにより、Sepoliaテストネットにリクエストを送信できるようになります。テストネットについて詳しく知りたい場合は、[こちらのガイド](https://www.alchemy.com/docs/choosing-a-web3-network)をご覧ください。

1. ナビゲーションバーの「Select an app」を選択し、「Create new app」をクリックして、Alchemyダッシュボードの「Create new app」ページに移動します。

![アプリの作成](./alchemy-create-new-app.png)

2. アプリに名前を付け（ここでは「My First NFT!」としました）、簡単な説明を入力し、ユースケースを選択します。次に、「Ethereum」を検索してネットワークを選択します。アプリケーション開発に推奨されるテストネットであるSepoliaを使用します（[イーサリアムのネットワーク](/developers/docs/networks/#ethereum-testnets)を参照）。

3. 「Next」をクリックして進み、「Create app」をクリックすれば完了です！ナビゲーションバーのドロップダウンメニューにアプリが表示され、コピー可能なAPIキーが利用できるようになります。

## ステップ3：イーサリアムのアカウント（アドレス）を作成する {#create-eth-address}

トランザクションを送受信するには、イーサリアムのアカウントが必要です。このチュートリアルでは、イーサリアムのアカウントのアドレスを管理するためにブラウザ上の仮想ウォレットであるメタマスクを使用します。イーサリアム上のトランザクションの仕組みについて詳しく知りたい場合は、イーサリアム財団の[こちらのページ](/developers/docs/transactions/)をご覧ください。

メタマスクのアカウントは、[こちら](https://metamask.io/download)から無料でダウンロードして作成できます。アカウントを作成する際、またはすでにアカウントを持っている場合は、ネットワーク選択メニューを使用して「Sepolia」テストネットに切り替えてください（実際の資金を扱わないようにするためです）。Sepoliaがリストに表示されない場合は、右上隅のメニューを開き、「Networks」を選択して、「Show test networks」をオンに切り替えます（[テストネットの表示に関するメタマスクのガイド](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)を参照）。

![Sepoliaをネットワークとして設定する](./metamask-sepolia.png)

## ステップ4：フォーセットからイーサを追加する {#step-4-add-ether-from-a-faucet}

スマート・コントラクトをテストネットにデプロイするには、テスト用のETHが必要です。SepoliaのETHを取得するには、[Sepoliaネットワークの詳細](/developers/docs/networks/#sepolia)にリストされているフォーセットのいずれかを選択し、アカウントのアドレスを入力します。フォーセットが枯渇している場合や、利用資格のルールがある場合があるため、機能しない場合は別のフォーセットを試してください。たとえば、[AlchemyのSepoliaフォーセット](https://www.alchemy.com/faucets/ethereum-sepolia)では、受信アドレスがイーサリアム・メインネット上で少なくとも0.001 ETHを保持している必要があります。すぐにメタマスクのアカウントにETHが表示されるはずです！

## ステップ5：残高を確認する {#check-balance}

残高があることを再確認するために、[Alchemyのサンドボックスツール](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)を使用して[eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance)リクエストを送信してみましょう。これにより、ウォレット内のETHの量が返されます。メタマスクのアカウントのアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されるはずです。

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **注** この結果はETHではなくWeiで表示されています。Weiはイーサの最小単位として使用されます。WeiからETHへの変換は、1 eth = 10<sup>18</sup> Weiです。したがって、0xde0b6b3a7640000を10進数に変換すると、1\*10<sup>18</sup> Weiとなり、1 ETHに等しくなります。

ふう！テスト用の資金がちゃんと入っていますね。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```
## ステップ6：プロジェクトを初期化する {#initialize-project}

まず、プロジェクト用のフォルダを作成する必要があります。コマンドラインに移動して、次のように入力します。

```sh
mkdir my-nft
cd my-nft
```

プロジェクトフォルダ内に移動したので、`npm init`を使用してプロジェクトを初期化します。まだnpmをインストールしていない場合は、[Node.jsのインストール手順](https://nodejs.org/en/download/)に従ってください（このチュートリアルではNode.jsとnpmが必要です）。

```sh
npm init
```

インストールの質問にどのように答えても問題ありません。参考までに、以下のように入力しました。

```text
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

`package.json`を承認します。次にインストールするHardhat 3はESモジュールプロジェクトのみをサポートしているため、プロジェクトをESモジュールとしてマークします。

```sh
npm pkg set type=module
```

これで準備完了です！

## ステップ7：[Hardhat](https://hardhat.org/docs/getting-started)をインストールする {#install-hardhat}

Hardhatは、イーサリアムのソフトウェアをコンパイル、デプロイ、テスト、およびデバッグするための開発環境です。ライブチェーンにデプロイする前に、ローカルでスマート・コントラクトや分散型アプリケーション (dapp) を構築する際に開発者を支援します。

Hardhat 3にはNode.js v22.13.0以降が必要です。`my-nft`プロジェクト内で以下を実行します。

```sh
npm install --save-dev hardhat
```

[インストール手順](https://hardhat.org/docs/getting-started)の詳細については、こちらのページをご覧ください。

## ステップ8：Hardhatプロジェクトを作成する {#create-hardhat-project}

`npx hardhat --init`を実行すると完全なサンプルプロジェクトが生成されますが、このチュートリアルではすべての要素を理解できるように手動で設定します。プロジェクトフォルダのルートに、以下の内容で`hardhat.config.js`というファイルを作成します。

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

ここでプロジェクトのすべての設定を指定します（ステップ13で実施）。今のところ、使用するSolidityコンパイラのバージョンをHardhatに指示するだけです。

## ステップ9：プロジェクトフォルダを追加する {#add-project-folders}

プロジェクトを整理するために、2つの新しいフォルダを作成します。コマンドラインでプロジェクトのルートディレクトリに移動し、次のように入力します。

```sh
mkdir contracts
mkdir scripts
```

- `contracts/`は、NFTスマート・コントラクトのコードを保存する場所です。

- `scripts/`は、スマート・コントラクトをデプロイし、対話するためのスクリプトを保存する場所です。

## ステップ10：コントラクトを記述する {#write-contract}

環境が整ったので、さらにエキサイティングな作業に進みましょう。_スマート・コントラクトのコードを記述します！_

お気に入りのエディタ（私たちは[VSCode](https://code.visualstudio.com/)が好きです）で`my-nft`プロジェクトを開きます。スマート・コントラクトはSolidityと呼ばれる言語で記述されており、これを使用して`MyNFT.sol`スマート・コントラクトを記述します。‌

1. `contracts`フォルダに移動し、`MyNFT.sol`という新しいファイルを作成します。

2. 以下は、[オープンツェッペリン](https://docs.openzeppelin.com/contracts/5.x/erc721)ライブラリのERC-721実装に基づいたNFTスマート・コントラクトのコードです。以下の内容をコピーして、`MyNFT.sol`ファイルに貼り付けます。

   ```solidity
   // https://docs.openzeppelin.com/contracts/5.x/erc721 に基づくコントラクト
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. オープンツェッペリンのコントラクトライブラリからクラスを継承しているため、コマンドラインで`npm install @openzeppelin/contracts`を実行して、ライブラリをフォルダにインストールします。このチュートリアルではOpenZeppelin Contracts 5.xを使用しており、これにはSolidity 0.8.24以降が必要です。

では、このコードは正確に_何をする_のでしょうか？1行ずつ分解してみましょう。

スマート・コントラクトの先頭で、3つの[オープンツェッペリン](https://openzeppelin.com/)のスマート・コントラクトクラスをインポートします。

- `@openzeppelin/contracts/token/ERC721/ERC721.sol`には、NFTスマート・コントラクトが継承するERC-721標準の実装が含まれています。（有効なNFTであるためには、スマート・コントラクトがERC-721標準のすべてのメソッドを実装している必要があります。）継承されたERC-721関数の詳細については、[こちら](https://eips.ethereum.org/EIPS/eip-721)のインターフェース定義を確認してください。

- `@openzeppelin/contracts/access/Ownable.sol`は、スマート・コントラクトに[アクセス制御](https://docs.openzeppelin.com/contracts/5.x/access-control)を設定し、スマート・コントラクトの所有者（あなた）のみがNFTをミントできるようにします。所有者は、コンストラクタに渡される`initialOwner`アドレスです。（注：アクセス制御を含めるかどうかは完全に好みの問題です。誰でもスマート・コントラクトを使用してNFTをミントできるようにしたい場合は、コントラクト定義とコンストラクタから`Ownable`と`Ownable(initialOwner)`を削除し、`mintNFT`関数から`onlyOwner`を削除してください。）

- `@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol`はERC-721を拡張し、各トークンが独自のメタデータURIを保存できるようにします。これはミント時に設定します。

インポート文の後に、カスタムNFTスマート・コントラクトがあります。これは驚くほど短く、カウンター、コンストラクタ、および単一の関数のみが含まれています！これは、NFTの所有者を返す`ownerOf`や、あるアカウントから別のアカウントへNFTの所有権を移転する`transferFrom`など、NFTを作成するために必要なほとんどのメソッドを実装している、継承されたオープンツェッペリンのコントラクトのおかげです。

カウンターである`_nextTokenId`は、ミントされたNFTの総数を追跡し、新しいNFTに一意のIDを設定します。（スマート・コントラクトを使用してミントされた各NFTには一意のIDを割り当てる必要があります。ここでは、一意のIDは存在するNFTの総数によって決定されます。`++_nextTokenId`は使用される前にカウンターを増やすため、スマート・コントラクトでミントする最初のNFTのIDは「1」、2番目のNFTのIDは「2」のようになります。）

ERC-721コンストラクタでは、「MyNFT」と「NFT」という2つの文字列を渡していることに気付くでしょう。最初の変数はスマート・コントラクトの名前で、2番目はそのシンボルです。これらの変数は好きな名前に設定できます！

最後に、NFTをミントできる関数`mintNFT(address recipient, string memory tokenURI)`があります！この関数は2つの変数を受け取ります。

- `address recipient`は、新しくミントされたNFTを受け取るアドレスを指定します。

- `string memory tokenURI`は、NFTのメタデータを記述するJSONドキュメントに解決されるべき文字列です。NFTのメタデータは、名前、説明、画像、その他の属性など、設定可能なプロパティを持たせることで、NFTに命を吹き込むものです。このチュートリアルのパート2では、このメタデータを設定する方法を説明します。

`mintNFT`は、継承されたERC-721ライブラリからいくつかのメソッドを呼び出し、最終的に新しくミントされたNFTのIDを表す数値を返します。

## ステップ11：メタマスクとAlchemyをプロジェクトに接続する {#connect-metamask-and-alchemy}

メタマスクのウォレット、Alchemyアカウントを作成し、スマート・コントラクトを記述したので、これら3つを接続する時が来ました。

仮想ウォレットから送信されるすべてのトランザクションには、固有の秘密鍵を使用した署名が必要です。プログラムにこの権限を提供するために、秘密鍵（およびAlchemyのAPIキー）を環境ファイルに安全に保存できます。

トランザクションの送信について詳しく知りたい場合は、[トランザクションのドキュメント](/developers/docs/transactions/)をご覧ください。

プロジェクトのルートディレクトリに`.env`ファイルを作成し、メタマスクの秘密鍵とHTTP Alchemy API URLを追加します。

- [こちらの手順](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)に従って、メタマスクから秘密鍵をエクスポートします。

- 以下の手順を参照してHTTP Alchemy API URLを取得し、クリップボードにコピーします。

![Alchemy API URLをコピーする](./copy-alchemy-api-url.mp4#842x480)

`.env`ファイルは次のようになります。

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

これらを実際にコードに接続するために、ステップ13で`hardhat.config.js`ファイル内のこれらの変数を参照します。Node.jsは単独で`.env`ファイルを読み込むことができるため、追加のパッケージをインストールする必要はありません。

<EnvWarningBanner />

## ステップ12：Ethers.jsをインストールする {#install-ethers}

Ethers.jsは、[標準のJSON-RPCメソッド](/developers/docs/apis/json-rpc/)をよりユーザーフレンドリーなメソッドでラップすることで、イーサリアムとの対話やリクエストの送信を容易にするライブラリです。

Hardhatを使用すると、追加のツールや拡張機能のための[プラグイン](https://hardhat.org/docs/plugins/official-plugins)を非常に簡単に統合できます。コントラクトのデプロイには[Ethersプラグイン](https://hardhat.org/docs/plugins/hardhat-ethers)を活用します（[Ethers.js](https://docs.ethers.org/v6/)には非常に洗練されたコントラクトのデプロイメソッドがあります）。

プロジェクトディレクトリで次のように入力します。

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

次のステップで、プラグインを`hardhat.config.js`にも追加します。

## ステップ13：hardhat.config.jsを更新する {#update-hardhat-config}

これまでいくつかの依存関係とプラグインを追加してきましたが、プロジェクトがそれらすべてを認識できるように`hardhat.config.js`を更新する必要があります。

`hardhat.config.js`を次のように更新します。

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// .envファイルが存在する場合、API_URLとPRIVATE_KEYを.envファイルからprocess.envに読み込む
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable`は、必要な場合にのみ環境変数から各値を読み込むようにHardhatに指示するため、値が設定される前でも`compile`などのコマンドが機能します。秘密鍵をプレーンテキストファイルに保存したくない場合は、Hardhatは[暗号化されたキーストアから設定変数](https://hardhat.org/docs/guides/configuration-variables)を読み込むこともできます。

## ステップ14：コントラクトをコンパイルする {#compile-contract}

これまでのところすべてが機能していることを確認するために、コントラクトをコンパイルしてみましょう。コンパイルタスクは、組み込みのHardhatタスクの1つです。

コマンドラインから以下を実行します。

```sh
npx hardhat compile
```

初めてコンパイルするとき、HardhatはSolidityコンパイラをダウンロードします。その後、`Compiled 1 Solidity file with solc 0.8.34`のようなメッセージが表示されるはずです。表示されない場合は、いつでも[Alchemyのディスコード](https://discord.gg/gWuC7zB)でメッセージを送信できます。

## ステップ15：デプロイスクリプトを記述する {#write-deploy}

コントラクトが記述され、設定ファイルの準備が整ったので、コントラクトのデプロイスクリプトを記述する時が来ました。

`scripts/`フォルダに移動し、`deploy.js`という新しいファイルを作成して、次の内容を追加します。

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// デプロイを開始し、コントラクトオブジェクトに解決されるPromiseを返す
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

これらのコードの各行が何をするのかを見ていきましょう。

```js
const { ethers } = await network.create()
```

Hardhat 3では、スクリプトはネットワークへの接続を明示的に開きます。`network.create()`は、スクリプトの実行時に`--network`オプションで選択したネットワークに接続し、`hardhat-ethers`プラグインはその接続に`ethers`オブジェクトを追加します。

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()`は、ネットワークに設定されたアカウントを返します。Sepoliaでは、これは`.env`に秘密鍵を入力したアカウントです。あなたがコントラクトの所有者になるように、そのアドレスをコンストラクタに渡します。

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

Ethers.jsの`ContractFactory`は、新しいスマート・コントラクトをデプロイするために使用される抽象化であるため、ここでの`MyNFT`はNFTコントラクトのインスタンスのファクトリです。`hardhat-ethers`プラグインを使用する場合、`ContractFactory`と`Contract`インスタンスはデフォルトで最初の署名者に接続されます。

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

`ContractFactory`で`deploy()`を呼び出すとデプロイが開始され、`Contract`に解決されるPromiseが返されます。これは、スマート・コントラクトの各関数のメソッドを持つオブジェクトです。`deploy()`に渡す引数はコントラクトのコンストラクタに渡されます。ここでは`initialOwner`アドレスです。

`waitForDeployment()`は、デプロイのトランザクションがブロックに含まれるまで待機し、`getAddress()`は新しいコントラクトのアドレスを返します。詳細については、[Ethers.jsのコントラクトドキュメント](https://docs.ethers.org/v6/api/contract/)を参照してください。

## ステップ16：コントラクトをデプロイする {#deploy-contract}

ついにスマート・コントラクトをデプロイする準備が整いました！プロジェクトディレクトリのルートに戻り、コマンドラインで以下を実行します。

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

すると、次のようなメッセージが表示されるはずです。

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

[SepoliaのEtherscan](https://sepolia.etherscan.io/)にアクセスしてコントラクトのアドレスを検索すると、正常にデプロイされたことが確認できるはずです。すぐに表示されない場合は、時間がかかることがあるため、しばらくお待ちください。トランザクションは次のようになります。

![Etherscanでトランザクションのアドレスを表示する](./etherscan-sepoila-contract-creation.png)

「From」アドレスはメタマスクのアカウントのアドレスと一致し、「To」アドレスには「Contract Creation」と表示されます。トランザクションをクリックすると、「To」フィールドにコントラクトのアドレスが表示されます。

![Etherscanでコントラクトのアドレスを表示する](./etherscan-sepolia-tx-details.png)

やりました！イーサリアム（テストネット）チェーンにNFTスマート・コントラクトをデプロイしました！

内部で何が起こっているかを理解するために、[Alchemyダッシュボード](https://dashboard.alchemy.com/)でアプリが受信したリクエストを確認できます。

そこには、`.deploy()`関数を呼び出したときにHardhat/Ethersが内部で行ったいくつかのJSON-RPC呼び出しが表示されます。ここで注目すべき重要な2つは、スマート・コントラクトを実際にSepoliaチェーンに書き込むためのリクエストである[eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction)と、ハッシュを指定してトランザクションに関する情報を読み取るためのリクエストである[eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash)（トランザクションを送信する際の典型的なパターン）です。トランザクションの送信について詳しく知りたい場合は、[トランザクションのドキュメント](/developers/docs/transactions/)をご覧ください。

このチュートリアルのパート1は以上です。[パート2では、NFTをミントすることで実際にスマート・コントラクトと対話します](/developers/tutorials/how-to-mint-an-nft/)。そして[パート3では、イーサリアムのウォレットでNFTを表示する方法を紹介します](/developers/tutorials/how-to-view-nft-in-metamask/)！
