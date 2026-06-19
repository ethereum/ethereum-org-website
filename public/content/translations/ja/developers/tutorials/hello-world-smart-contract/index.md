---
title: 初心者向けHello Worldスマート・コントラクト
description: イーサリアム上でシンプルなスマート・コントラクトを記述し、デプロイするための入門チュートリアル。
author: "elanh"
tags: ["solidity", "hardhat", "alchemy", "スマート・コントラクト", "デプロイ"]
skill: beginner
breadcrumb: Hello Worldコントラクト
lang: ja
published: 2021-03-31
---

ブロックチェーン開発が初めてでどこから始めればよいかわからない場合や、スマート・コントラクトのデプロイ方法と対話方法を理解したいだけの場合、このガイドはあなたのためのものです。仮想ウォレットの[メタマスク](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org/)、および[Alchemy](https://www.alchemy.com/eth)を使用して、Sepoliaテストネットワーク上にシンプルなスマート・コントラクトを作成し、デプロイする手順を説明します（これらの意味がまだわからなくても心配しないでください。後で説明します）。

このチュートリアルの[パート2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract)では、デプロイされたスマート・コントラクトと対話する方法について説明し、[パート3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)では、Etherscanで公開する方法について説明します。

途中で質問がある場合は、[Alchemyのディスコード](https://discord.gg/gWuC7zB)でお気軽にお問い合わせください！

## ステップ1: イーサリアムネットワークに接続する {#step-1}

イーサリアムチェーンにリクエストを送信する方法はたくさんあります。ここでは簡単にするために、独自のノードを実行せずにイーサリアムチェーンと通信できるブロックチェーン開発者プラットフォームおよびAPIであるAlchemyの無料アカウントを使用します。このプラットフォームには、監視と分析のための開発者ツールも用意されており、このチュートリアルではこれらを活用して、スマート・コントラクトのデプロイの内部で何が起こっているかを理解します。まだAlchemyアカウントをお持ちでない場合は、[こちらから無料でサインアップできます](https://dashboard.alchemy.com/signup)。

## ステップ2: アプリ（およびAPIキー）を作成する {#step-2}

Alchemyアカウントを作成したら、アプリを作成してAPIキーを生成できます。これにより、Sepoliaテストネットワークにリクエストを送信できるようになります。テストネットに馴染みがない場合は、[こちらのページ](/developers/docs/networks/)を確認してください。

1.  ナビゲーションバーの「Select an app」を選択し、「Create new app」をクリックして、Alchemyダッシュボードの「Create new app」ページに移動します。

![Hello world create app](./hello-world-create-app.png)

2. アプリに「Hello World」という名前を付け、簡単な説明を入力し、「Infra & Tooling」などのユースケースを選択します。次に、「Ethereum」を検索してネットワークを選択します。

![create app view hello world](./create-app-view-hello-world.png)

3. 「Next」をクリックして進み、「Create app」をクリックすれば完了です！ナビゲーションバーのドロップダウンメニューにアプリが表示され、APIキーをコピーできるようになります。

## ステップ3: イーサリアムアカウント（アドレス）を作成する {#step-3}

トランザクションを送受信するには、イーサリアムアカウントが必要です。このチュートリアルでは、イーサリアムアカウントのアドレスを管理するためにブラウザで使用する仮想ウォレットであるメタマスクを使用します。[トランザクション](/developers/docs/transactions/)の詳細はこちら。

[こちら](https://metamask.io/download)からメタマスクをダウンロードし、無料でイーサリアムアカウントを作成できます。アカウントを作成する際、またはすでにアカウントをお持ちの場合は、ネットワークのドロップダウンメニューを使用して「Sepolia」テストネットワークに切り替えてください（実際の資金を扱わないようにするためです）。

Sepoliaが表示されない場合は、メニューから「Advanced」に進み、下にスクロールして「Show test networks」をオンに切り替えます。ネットワーク選択メニューで「Custom」タブを選択してテストネットのリストを見つけ、「Sepolia」を選択します。

![metamask sepolia example](./metamask-sepolia-example.png)

## ステップ4: フォーセットからイーサを追加する {#step-4}

スマート・コントラクトをテストネットワークにデプロイするには、テスト用のETHが必要です。Sepolia ETHを取得するには、[Sepoliaネットワークの詳細](/developers/docs/networks/#sepolia)にアクセスして、さまざまなフォーセットのリストを表示します。枯渇していることもあるため、1つが機能しない場合は別のものを試してください。ネットワークのトラフィックによっては、テスト用のETHを受け取るまでに時間がかかる場合があります。しばらくすると、メタマスクのアカウントにETHが表示されるはずです！

## ステップ5: 残高を確認する {#step-5}

残高があることを再確認するために、[Alchemyのコンポーザーツール](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)を使用して[eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance)リクエストを送信してみましょう。これにより、ウォレット内のETHの量が返されます。メタマスクのアカウントアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されるはずです。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **注:** この結果はETHではなくWeiで表示されています。Weiはイーサの最小単位として使用されます。WeiからETHへの変換は、1 ETH = 10<sup>18</sup> Weiです。したがって、0x2B5E3AF16B1880000を10進数に変換すると5\*10¹⁸となり、5 ETHに等しくなります。
>
> ふぅ！テスト用の資金はすべて揃っています <Emoji text=":money_mouth_face:" size={1} />。

## ステップ6: プロジェクトを初期化する {#step-6}

まず、プロジェクト用のフォルダを作成する必要があります。コマンドラインに移動して、次のように入力します。

```
mkdir hello-world
cd hello-world
```

プロジェクトフォルダ内に移動したので、`npm init`を使用してプロジェクトを初期化します。npmがまだインストールされていない場合は、[こちらの手順](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)に従ってください（Node.jsも必要になるため、ダウンロードしてください！）。

```
npm init
```

インストール時の質問にどのように答えても問題ありませんが、参考までに私たちの回答例を以下に示します。

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.jsonを承認すれば準備完了です！

## ステップ7: [Hardhat](https://hardhat.org/getting-started/#overview)をダウンロードする {#step-7}

Hardhatは、イーサリアムソフトウェアをコンパイル、デプロイ、テスト、およびデバッグするための開発環境です。ライブチェーンにデプロイする前に、ローカルでスマート・コントラクトや分散型アプリケーション (dapp) を構築する際に開発者を支援します。

`hello-world`プロジェクト内で以下を実行します。

```
npm install --save-dev hardhat
```

[インストール手順](https://hardhat.org/getting-started/#overview)の詳細については、こちらのページを確認してください。

## ステップ8: Hardhatプロジェクトを作成する {#step-8}

プロジェクトフォルダ内で以下を実行します。

```
npx hardhat
```

すると、ウェルカムメッセージと実行したい操作を選択するオプションが表示されます。「create an empty hardhat.config.js」を選択します。

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

これにより、`hardhat.config.js`ファイルが生成されます。ここでプロジェクトのすべての設定を指定します（ステップ13）。

## ステップ9: プロジェクトフォルダを追加する {#step-9}

プロジェクトを整理するために、2つの新しいフォルダを作成します。コマンドラインでプロジェクトのルートディレクトリに移動し、次のように入力します。

```
mkdir contracts
mkdir scripts
```

- `contracts/`は、Hello Worldスマート・コントラクトのコードファイルを保存する場所です。
- `scripts/`は、コントラクトをデプロイし、対話するためのスクリプトを保存する場所です。

## ステップ10: コントラクトを記述する {#step-10}

いったいいつになったらコードを書くのかと疑問に思っているかもしれませんね。お待たせしました、ステップ10です。

お気に入りのエディタ（私たちは[VSCode](https://code.visualstudio.com/)が好きです）でhello-worldプロジェクトを開きます。スマート・コントラクトはSolidityと呼ばれる言語で記述されており、これを使用してHelloWorld.solスマート・コントラクトを記述します。‌

1.  「contracts」フォルダに移動し、HelloWorld.solという新しいファイルを作成します。
2.  以下は、このチュートリアルで使用するイーサリアム財団のサンプルHello Worldスマート・コントラクトです。以下の内容をコピーしてHelloWorld.solファイルに貼り付け、コメントを読んでこのコントラクトが何を行うかを理解してください。

```solidity
// セマンティックバージョニングを使用して、Solidityのバージョンを指定します。
// 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld`という名前のコントラクトを定義します。
// コントラクトは関数とデータ（その状態）の集合です。デプロイされると、コントラクトはイーサリアムブロックチェーン上の特定のアドレスに配置されます。詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string`型の状態変数`message`を宣言します。
   // 状態変数は、その値がコントラクトのストレージに永続的に保存される変数です。`public`キーワードを使用すると、変数はコントラクトの外部からアクセス可能になり、他のコントラクトやクライアントが値にアクセスするために呼び出すことができる関数が作成されます。
   string public message;

   // 多くのクラスベースのオブジェクト指向言語と同様に、コンストラクタはコントラクトの作成時にのみ実行される特別な関数です。
   // コンストラクタは、コントラクトのデータを初期化するために使用されます。詳細はこちら:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 文字列の引数`initMessage`を受け取り、その値をコントラクトの`message`ストレージ変数に設定します）。
      message = initMessage;
   }

   // 文字列の引数を受け取り、`message`ストレージ変数を更新するpublic関数です。
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

これは、作成時にメッセージを保存し、`update`関数を呼び出すことで更新できる、非常にシンプルなスマート・コントラクトです。

## ステップ11: メタマスクとAlchemyをプロジェクトに接続する {#step-11}

メタマスクウォレット、Alchemyアカウントを作成し、スマート・コントラクトを記述しました。次はこれら3つを接続します。

仮想ウォレットから送信されるすべてのトランザクションには、固有の秘密鍵を使用した署名が必要です。プログラムにこの権限を提供するために、秘密鍵（およびAlchemy APIキー）を環境ファイルに安全に保存できます。

> トランザクションの送信について詳しくは、Web3を使用したトランザクションの送信に関する[こちらのチュートリアル](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)を確認してください。

まず、プロジェクトディレクトリにdotenvパッケージをインストールします。

```
npm install dotenv --save
```

次に、プロジェクトのルートディレクトリに`.env`ファイルを作成し、メタマスクの秘密鍵とHTTP Alchemy API URLを追加します。

- 秘密鍵をエクスポートするには、[こちらの手順](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)に従ってください。
- HTTP Alchemy API URLを取得するには、以下を参照してください。

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URLをコピーする

`.env`は次のようになります。

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

これらを実際にコードに接続するために、ステップ13で`hardhat.config.js`ファイル内のこれらの変数を参照します。

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code>をコミットしないでください！<code>.env</code>ファイルを誰かと共有したり公開したりすると、シークレットが漏洩することになるため、絶対にしないでください。バージョン管理を使用している場合は、<code>.env</code>を<a href="https://git-scm.com/docs/gitignore">gitignore</a>ファイルに追加してください。
</AlertDescription>
</AlertContent>
</Alert>

## ステップ12: Ethers.jsをインストールする {#step-12-install-ethersjs}

Ethers.jsは、[標準のJSON-RPCメソッド](/developers/docs/apis/json-rpc/)をよりユーザーフレンドリーなメソッドでラップすることで、イーサリアムとの対話やリクエストの送信を容易にするライブラリです。

Hardhatを使用すると、追加のツールや拡張機能のための[プラグイン](https://hardhat.org/plugins/)を非常に簡単に統合できます。コントラクトのデプロイには[Ethersプラグイン](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)を活用します（[Ethers.js](https://github.com/ethers-io/ethers.js/)には非常に洗練されたコントラクトデプロイメソッドがいくつかあります）。

プロジェクトディレクトリで次のように入力します。

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

次のステップで、`hardhat.config.js`にethersをリクワイアします。

## ステップ13: hardhat.config.jsを更新する {#step-13-update-hardhatconfigjs}

これまでにいくつかの依存関係とプラグインを追加しました。次に、プロジェクトがそれらすべてを認識できるように`hardhat.config.js`を更新する必要があります。

`hardhat.config.js`を次のように更新します。

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
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

## ステップ14: コントラクトをコンパイルする {#step-14-compile-our-contracts}

ここまでがすべて機能していることを確認するために、コントラクトをコンパイルしてみましょう。`compile`タスクは、組み込みのHardhatタスクの1つです。

コマンドラインから以下を実行します。

```
npx hardhat compile
```

`SPDX license identifier not provided in source file`に関する警告が表示されるかもしれませんが、心配する必要はありません。他はすべて問題ないはずです！もし問題がある場合は、いつでも[Alchemyのディスコード](https://discord.gg/u72VCg3)でメッセージを送ってください。

## ステップ15: デプロイスクリプトを記述する {#step-15-write-our-deploy-scripts}

コントラクトの記述が完了し、設定ファイルの準備も整ったので、次はコントラクトのデプロイスクリプトを記述します。

`scripts/`フォルダに移動し、`deploy.js`という新しいファイルを作成して、次の内容を追加します。

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // デプロイを開始し、コントラクトオブジェクトに解決されるプロミスを返す
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhatは、[コントラクトチュートリアル](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)でこれらのコードの各行が何を行うかを見事に説明しており、ここではその説明を採用しています。

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Ethers.jsの`ContractFactory`は、新しいスマート・コントラクトをデプロイするために使用される抽象化であるため、ここでの`HelloWorld`はHello Worldコントラクトのインスタンスのファクトリです。`hardhat-ethers`プラグインを使用する場合、`ContractFactory`および`Contract`インスタンスはデフォルトで最初の署名者に接続されます。

```
const hello_world = await HelloWorld.deploy();
```

`ContractFactory`で`deploy()`を呼び出すとデプロイが開始され、`Contract`に解決される`Promise`が返されます。これは、スマート・コントラクトの各関数のメソッドを持つオブジェクトです。

## ステップ16: コントラクトをデプロイする {#step-16-deploy-our-contract}

ついにスマート・コントラクトをデプロイする準備が整いました！コマンドラインに移動して以下を実行します。

```
npx hardhat run scripts/deploy.js --network sepolia
```

すると、次のような出力が表示されるはずです。

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

[SepoliaのEtherscan](https://sepolia.etherscan.io/)にアクセスしてコントラクトアドレスを検索すると、正常にデプロイされたことが確認できるはずです。トランザクションは次のようになります。

![etherscan contract](./etherscan-contract.png)

`From`アドレスはメタマスクのアカウントアドレスと一致し、Toアドレスには「Contract Creation」と表示されますが、トランザクションをクリックすると、`To`フィールドにコントラクトアドレスが表示されます。

![etherscan transaction](./etherscan-transaction.png)

おめでとうございます！イーサリアムチェーンにスマート・コントラクトをデプロイしました 🎉

内部で何が起こっているかを理解するために、[Alchemyダッシュボード](https://dashboard.alchemyapi.io/explorer)のExplorerタブに移動しましょう。複数のAlchemyアプリがある場合は、アプリでフィルタリングして「Hello World」を選択してください。
![hello world explorer](./hello-world-explorer.png)

ここでは、`.deploy()`関数を呼び出したときに、Hardhat/Ethersが内部で行ったいくつかのJSON-RPC呼び出しを確認できます。ここで注目すべき重要な2つは、Sepoliaチェーンにコントラクトを実際に書き込むためのリクエストである[`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction)と、ハッシュを指定してトランザクションに関する情報を読み取るためのリクエストである[`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash)です（トランザクションを送信する際の典型的なパターンです）。トランザクションの送信について詳しくは、[Web3を使用したトランザクションの送信](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)に関するこちらのチュートリアルを確認してください。

このチュートリアルのパート1は以上です。パート2では、初期メッセージを更新することで実際に[スマート・コントラクトと対話](https://www.alchemy.com/docs/interacting-with-a-smart-contract)し、パート3では、誰もが対話方法を知ることができるように[スマート・コントラクトをEtherscanで公開](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)します。

**Alchemyについてもっと知りたいですか？私たちの[ウェブサイト](https://www.alchemy.com/eth)をチェックしてください。最新情報を見逃したくないですか？[こちら](https://www.alchemy.com/newsletter)からニュースレターを購読してください！[ディスコード](https://discord.gg/u72VCg3)への参加もお忘れなく。**