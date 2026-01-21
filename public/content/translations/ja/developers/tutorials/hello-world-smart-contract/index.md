---
title: 初心者向けのHello Worldスマートコントラクト
description: イーサリアムでの簡単なスマートコントラクトの作成とデプロイに関する入門チュートリアル。
author: "elanh"
tags: [ "Solidity", "hardhat", "Alchemy", "スマート契約", "デプロイ" ]
skill: beginner
lang: ja
published: 2021-03-31
---

このガイドは、ブロックチェーンの開発が初めてでどこから始めたらよいのか分からない方や、スマートコントラクトをデプロイして対話する方法を理解したいだけの方に最適です。 このチュートリアルでは、仮想ウォレット([MetaMask](https://metamask.io/))、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org/)、[Alchemy](https://www.alchemy.com/)を使用して、Sepoliaテストネットワーク上で簡単なスマートコントラクトを作成してデプロイする方法を順を追って説明します(現時点でしっかりと理解できていなくても、心配はご無用です。後ほど説明します)。

このチュートリアルの[パート2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract)では、デプロイ後のスマートコントラクトとの対話方法について、[パート3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)ではEtherscanで公開する方法について説明します。

ご不明な点がございましたら、[Alchemy Discord](https://discord.gg/gWuC7zB)までお気軽にお問い合わせください！

## ステップ1: イーサリアムネットワークに接続する {#step-1}

イーサリアムチェーンにリクエストを行う方法はたくさんあります。 簡略化のため、ここではAlchemyの無料アカウントを使用します。これは独自のノードを実行することなく、イーサリアムチェーンとの通信を可能にするブロックチェーンのデベロッパープラットフォームとAPIです。 このプラットフォームには、スマートコントラクトのデプロイメントにおいて内部で何が起こっているのかを把握するためにこのチュートリアルで利用する、監視と分析のためのデベロッパーツールも備わっています。 Alchemyアカウントをお持ちでない場合は、[こちらから無料で登録](https://dashboard.alchemy.com/signup)できます。

## ステップ2: アプリ(およびAPIキー)を作成する {#step-2}

Alchemyのアカウントを作成した後、アプリを作成することでAPIキーを生成することができます。 これにより、Sepoliaテストネットワークへのリクエストが可能になります。 テストネットに詳しくない場合は、[こちらのページ](/developers/docs/networks/)をご覧ください。

1. Alchemyダッシュボードのナビゲーションバーで「Select an app」を選択し、「Create new app」をクリックして、「Create new app」ページに移動します。

![Hello worldアプリ作成](./hello-world-create-app.png)

2. アプリに「Hello World」という名前を付け、簡単な説明を提示し、「Infra & Tooling」などのユースケースを選択します。 次に、「Ethereum」を検索してネットワークを選択します。

![アプリ作成ビュー hello world](./create-app-view-hello-world.png)

3. 「Next」をクリックして続行し、次に「Create app」をクリックすれば完了です！ ナビゲーションバーのドロップダウンメニューにアプリが表示され、APIキーをコピーできるようになります。

## ステップ3: イーサリアムアカウント(アドレス)を作成する {#step-3}

トランザクションの送受信には、イーサリアムアカウントが必要です。 このチュートリアルでは、イーサリアムアカウントアドレスを管理するためにブラウザの仮想ウォレットであるMetamaskを使用します。 [トランザクション](/developers/docs/transactions/)に関する詳細はこちら。

MetaMaskは[こちら](https://metamask.io/download)からダウンロードして、無料でイーサリアムアカウントを作成できます。 アカウントを作成するとき、またはすでにアカウントをお持ちの場合は、(実際のお金を使わないように)ネットワークのドロップダウンメニューを使用して「Sepolia」テストネットワークに切り替えてください。

Sepoliaがリストに表示されない場合は、メニューから「高度な設定」に進み、下にスクロールして「テストネットワークを表示」をオンに切り替えます。 ネットワーク選択メニューで、「カスタム」タブを選択してテストネットのリストを見つけ、「Sepolia」を選択します。

![metamask sepolia の例](./metamask-sepolia-example.png)

## ステップ4: フォーセットからイーサを追加する {#step-4}

テストネットワークにスマートコントラクトをデプロイするには、偽のEthが必要になります。 Sepolia ETHを入手するには、[Sepoliaネットワーク詳細](/developers/docs/networks/#sepolia)にアクセスして、さまざまなフォーセットのリストを表示します。 1つが機能しない場合は、別のものを試してください。枯渇している場合があります。 ネットワークのトラフィックにより、偽のETHの受信に時間がかかる場合があります。 その後すぐに、MetaMaskアカウントにETHが表示されるはずです！

## ステップ5: 残高を確認する {#step-5}

残高があることを再確認するために、[Alchemyのcomposerツール](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)を使用して[eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance)リクエストを作成しましょう。 このリクエストをすると、ウォレット内のETHの額が返されます。 MetaMaskアカウントアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されます。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> \*\*注：\*\*この結果の単位はETHではなくweiです。 weiはETHの最小単位として使われています。 weiからETHへの変換は、1 eth = 10<sup>18</sup> weiです。 したがって、0x2B5E3AF16B1880000を10進数に変換すると5\*10¹⁸になり、これは5 ETHに相当します。
>
> ふう! 偽のお金がすべて揃いました<Emoji text=":money_mouth_face:" size={1} />。

## ステップ6: プロジェクトを初期化する {#step-6}

まず、プロジェクトのフォルダを作成する必要があります。 コマンドラインに移動し、次のように入力します。

```
mkdir hello-world
cd hello-world
```

プロジェクトフォルダに入ったので、`npm init`を使用してプロジェクトを初期化します。 npmをまだインストールしていない場合は、[これらの手順](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)に従ってください(Node.jsも必要なので、それもダウンロードしてください！)。

```
npm init
```

インストールの質問にどう答えるかは重要ではありませんが、参考までに私たちの回答方法を次に示します。

```
package name: (hello-world)
version: (1.0.0)
description: hello world スマートコントラクト
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
  "description": "hello world スマートコントラクト",
  "main": "index.js",
  "scripts": {
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.jsonを承認すれば完了です！

## ステップ7: [Hardhat](https://hardhat.org/getting-started/#overview)をダウンロードする {#step-7}

Hardhatは、イーサリアムのソフトウェアをコンパイル、デプロイ、テスト、デバッグするための開発環境です。 デベロッパーがライブチェーンにデプロイする前に、スマートコントラクトや分散型アプリケーション(Dapp)をローカルに構築する際に役立ちます。

`hello-world`プロジェクト内で次を実行します。

```
npm install --save-dev hardhat
```

[インストール手順](https://hardhat.org/getting-started/#overview)の詳細については、このページをご覧ください。

## ステップ8: Hardhatプロジェクトを作成する {#step-8}

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

これにより `hardhat.config.js` ファイルが生成されます。ここでプロジェクトのすべてのセットアップを指定します(ステップ13)。

## ステップ9: プロジェクトフォルダを追加する {#step-9}

プロジェクトを整理するために、2つの新しいフォルダを作成します。 コマンドラインでプロジェクトのルートディレクトリに移動し、次のように入力します。

```
mkdir contracts
mkdir scripts
```

- `contracts/` には、hello worldスマートコントラクトのコードファイルを保存します
- `scripts/` には、コントラクトをデプロイして対話するためのスクリプトを保存します

## ステップ10: コントラクトを作成する {#step-10}

一体いつになったらコードを書くのだろう、と思っているかもしれませんね。 さあ、このステップ10でコードを書き始めましょう。

お気に入りのエディタでhello-worldプロジェクトを開きます([VSCode](https://code.visualstudio.com/)がおすすめです)。 スマートコントラクトはSolidityという言語で書かれており、これを使ってHelloWorld.solスマートコントラクトを作成します。‌

1. 「contracts」フォルダに移動し、HelloWorld.solという名前の新規ファイルを作成します。
2. 以下は、このチュートリアルで使用するイーサリアム・ファウンデーションのHello Worldスマートコントラクトのサンプルです。 以下の内容をHelloWorld.solファイルにコピー&ペーストし、コメントを読んでこのコントラクトが何をするのかを理解してください。

```solidity
// セマンティックバージョニングを使用して、Solidityのバージョンを指定します。
// 詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld`という名前のコントラクトを定義します。
// コントラクトは関数とデータ(その状態)の集合です。デプロイされると、コントラクトはイーサリアムのブロックチェーン上の特定のアドレスに配置されます。詳細はこちら: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string`型の状態変数`message`を宣言します。
   // 状態変数は、その値がコントラクトストレージに永続的に保存される変数です。`public`キーワードは、変数をコントラクトの外部からアクセス可能にし、他のコントラクトやクライアントがその値をアクセスするために呼び出せる関数を作成します。
   string public message;

   // 多くのクラスベースのオブジェクト指向言語と同様に、コンストラクタはコントラクト作成時にのみ実行される特別な関数です。
   // コンストラクタは、コントラクトのデータを初期化するために使用されます。詳細はこちら:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 文字列引数`initMessage`を受け入れ、その値をコントラクトの`message`ストレージ変数に設定します。
      message = initMessage;
   }

   // 文字列引数を受け入れ、`message`ストレージ変数を更新する公開関数です。
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

これは、作成時にメッセージを保存し、`update`関数を呼び出すことで更新できる、非常にシンプルなスマートコントラクトです。

## ステップ11: MetaMaskとAlchemyをプロジェクトに接続する {#step-11}

MetaMaskウォレットとAlchemyアカウントを作成し、スマートコントラクトも作成しました。次はこの3つを接続しましょう。

仮想ウォレットから送信されるすべてのトランザクションには、固有の秘密鍵を使用した署名が必要です。 この許可をプログラムに与えるために、秘密鍵(とAlchemyのAPIキー)を環境ファイルに安全に格納する作業を行います。

> トランザクションの送信について詳しく知るには、web3を使用したトランザクション送信に関する[このチュートリアル](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)をご覧ください。

まず、プロジェクトディレクトリにdotenvパッケージをインストールします。

```
npm install dotenv --save
```

次に、プロジェクトのルートディレクトリに`.env`ファイルを作成し、MetaMaskの秘密鍵とHTTP Alchemy API URLを追加します。

- [これらの手順](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)に従って秘密鍵をエクスポートします
- HTTP Alchemy API URLを取得するには、以下を参照してください

![alchemy apiキーの取得](./get-alchemy-api-key.png)

Alchemy API URLをコピーする

`.env`は次のようになります:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

これらをコードに実際に接続するために、ステップ13で`hardhat.config.js`ファイル内のこれらの変数を参照します。

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code>はコミットしないでください！ <code>.env</code>は決して他人と共有したり、公開したりしないように注意してください。共有することで、あなたのアカウント情報が漏洩する可能性があります。 バージョンを管理する場合は、<code>.env</code>を<a href="https://git-scm.com/docs/gitignore">gitignore</a>ファイルに追加してください。
</AlertDescription>
</AlertContent>
</Alert>

## ステップ12: Ethers.jsをインストールする {#step-12-install-ethersjs}

Ethers.jsは、[標準のJSON-RPCメソッド](/developers/docs/apis/json-rpc/)をよりユーザーフレンドリーなメソッドでラップすることで、イーサリアムとの対話やリクエストを容易にするライブラリです。

Hardhatでは、追加のツールや拡張機能のための[プラグイン](https://hardhat.org/plugins/)を非常に簡単に統合できます。 コントラクトのデプロイには[Ethersプラグイン](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)を活用します([Ethers.js](https://github.com/ethers-io/ethers.js/)には非常にクリーンなコントラクトデプロイメントメソッドがあります)。

プロジェクトのホームディレクトリで以下を実行します。

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

次のステップで、`hardhat.config.js`にethersもrequireします。

## ステップ13: hardhat.config.jsを更新する {#step-13-update-hardhatconfigjs}

ここまでで、いくつかの依存関係とプラグインを追加しました。次に、プロジェクトがそれらすべてを認識できるように、`hardhat.config.js`を更新する必要があります。

`hardhat.config.js`を次のように更新します:

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

ここまでの作業がうまくいっていることを確認するために、コントラクトをコンパイルしてみましょう。 `compile`タスクは、組み込みのHardhatタスクの1つです。

コマンドラインで以下を実行します。

```
npx hardhat compile
```

`SPDX license identifier not provided in source file`という警告が表示されるかもしれませんが、心配する必要はありません。それ以外は問題ないはずです！ うまくいかない場合は、いつでも[Alchemy Discord](https://discord.gg/u72VCg3)でメッセージを送ることができます。

## ステップ15: デプロイスクリプトを作成する {#step-15-write-our-deploy-scripts}

コントラクトの作成と設定ファイルの作成が完了したら、いよいよコントラクトのデプロイのためのスクリプトを作成します。

`scripts/`フォルダに移動して`deploy.js`という名前の新しいファイルを作成し、次の内容を追加します:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // デプロイを開始し、コントラクトオブジェクトに解決されるpromiseを返します
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhatは、[コントラクトのチュートリアル](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)で、これらのコードの各行が何をするかを非常にうまく説明しています。ここではその説明を採用しました。

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.jsの`ContractFactory`は、新しいスマートコントラクトをデプロイするために使用される抽象化です。したがって、ここでの`HelloWorld`は、私たちのhello worldコントラクトのインスタンスのためのファクトリです。 `hardhat-ethers`プラグインを使用する場合、`ContractFactory`および`Contract`インスタンスはデフォルトで最初の署名者に接続されます。

```
const hello_world = await HelloWorld.deploy();
```

`ContractFactory`で`deploy()`を呼び出すとデプロイメントが開始され、`Contract`に解決される`Promise`が返されます。 これは、スマートコントラクトの各関数に対するメソッドを持つオブジェクトです。

## ステップ16: コントラクトをデプロイする {#step-16-deploy-our-contract}

ようやく、スマートコントラクトをデプロイする準備が整いました。 コマンドラインに移動し、次を実行します:

```
npx hardhat run scripts/deploy.js --network sepolia
```

次のような画面が表示されるはずです。

```
コントラクトがデプロイされたアドレス: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

[Sepolia etherscan](https://sepolia.etherscan.io/)にアクセスし、コントラクトアドレスを検索すると、正常にデプロイされたことが確認できるはずです。 トランザクションは以下のようなものになります。

![etherscanコントラクト](./etherscan-contract.png)

`From`アドレスはMetaMaskアカウントのアドレスと一致し、`To`アドレスは「Contract Creation」と表示されますが、トランザクションをクリックすると`To`フィールドにコントラクトアドレスが表示されます。

![etherscanトランザクション](./etherscan-transaction.png)

おめでとうございます！ イーサリアムチェーンにスマートコントラクトをデプロイできました 🎉

内部で何が起こっているのかを理解するために、[Alchemyダッシュボード](https://dashboard.alchemyapi.io/explorer)のExplorerタブに移動してみましょう。 Alchemyアプリが複数ある場合は、必ずアプリでフィルタリングし、「Hello World」を選択してください。
![hello worldエクスプローラー](./hello-world-explorer.png)

ここでは、`.deploy()`関数を呼び出したときにHardhat/Ethersが内部で行ったいくつかのJSON-RPCコールを確認できます。 ここで注目すべき重要なコールは2つあります。1つは、コントラクトをSepoliaチェーンに実際に書き込むためのリクエストである[`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction)で、もう1つはハッシュが与えられたトランザクションに関する情報を読み取るためのリクエストである[`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash)です(これはトランザクションにおける典型的なパターンです)。 トランザクションの送信についてさらに詳しく知りたい場合は、[Web3を使用したトランザクションの送信](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)に関するチュートリアルをご覧ください。

このチュートリアルのパート1は以上です。パート2では、最初のメッセージを更新して[スマートコントラクトと実際に対話](https://www.alchemy.com/docs/interacting-with-a-smart-contract)し、パート3では[スマートコントラクトをEtherscanに公開](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)して、誰もがその対話方法を知ることができるようにします。

**Alchemyについてもっと知りたいですか？ 私たちの[ウェブサイト](https://www.alchemy.com/eth)をご覧ください。 アップデートを見逃したくないですか？ [こちら](https://www.alchemy.com/newsletter)でニュースレターに登録してください！ 私たちの[Discord](https://discord.gg/u72VCg3)にもぜひご参加ください。**
