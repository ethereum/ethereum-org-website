---
title: "初心者向けHello Worldスマート・コントラクト"
description: "イーサリアム上でシンプルなスマート・コントラクトを記述し、デプロイするための入門チュートリアル。"
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "スマート・コントラクト", "デプロイ"]
skill: beginner
breadcrumb: "Hello Worldコントラクト"
lang: ja
published: 2021-03-31
---

ブロックチェーン開発が初めてでどこから始めればよいかわからない場合や、スマート・コントラクトのデプロイと対話の方法を理解したいだけの場合、このガイドはあなたのためのものです。仮想ウォレットの[メタマスク](https://metamask.io/)、[Solidity](https://docs.soliditylang.org/)、[Hardhat](https://hardhat.org/)、および[Alchemy](https://www.alchemy.com/eth)を使用して、Sepoliaテストネットワーク上でシンプルなスマート・コントラクトを作成し、デプロイする手順を説明します（これらの意味がまだわからなくても心配しないでください。後で説明します）。

コントラクトがデプロイされたら、[そのユーザーインターフェースを構築する](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)ことができます。

途中で質問がある場合は、いつでも[Alchemyのディスコード](https://discord.gg/gWuC7zB)でお気軽にお問い合わせください！

## ステップ1: イーサリアムネットワークに接続する {#step-1}

イーサリアムチェーンにリクエストを送信する方法はたくさんあります。ここでは簡単にするために、独自のノードを実行せずにイーサリアムチェーンと通信できるブロックチェーン開発者プラットフォームおよびAPIであるAlchemyの無料アカウントを使用します。このプラットフォームには、監視と分析のための開発者ツールも用意されており、このチュートリアルではこれらを活用して、スマート・コントラクトのデプロイの内部で何が起こっているかを理解します。まだAlchemyアカウントをお持ちでない場合は、[こちらから無料でサインアップできます](https://dashboard.alchemy.com/signup)。

## ステップ2: アプリ（およびAPIキー）を作成する {#step-2}

Alchemyアカウントを作成したら、アプリを作成してAPIキーを生成できます。これにより、Sepoliaテストネットワークにリクエストを送信できるようになります。テストネットに馴染みがない場合は、[こちらのページ](/developers/docs/networks/)を確認してください。

1.  ナビゲーションバーの「Select an app」を選択し、「Create new app」をクリックして、Alchemyダッシュボードの「Create new app」ページに移動します。

![Hello world create app](./hello-world-create-app.png)

2. アプリに「Hello World」という名前を付け、簡単な説明を入力し、「Infra & Tooling」などのユースケースを選択します。次に、「Ethereum」を検索してネットワークを選択します。

![create app view hello world](./create-app-view-hello-world.png)

3. 「Next」をクリックして進み、「Create app」をクリックすれば完了です！ナビゲーションバーのドロップダウンメニューにアプリが表示され、APIキーをコピーできるようになります。

## ステップ3: イーサリアムのアカウント（アドレス）を作成する {#step-3}

トランザクションを送受信するには、イーサリアムのアカウントが必要です。このチュートリアルでは、イーサリアムのアカウントアドレスを管理するために使用されるブラウザ内の仮想ウォレットであるメタマスクを使用します。[トランザクション](/developers/docs/transactions/)の詳細についてはこちらをご覧ください。

[こちら](https://metamask.io/download)からメタマスクをダウンロードし、無料でイーサリアムのアカウントを作成できます。アカウントを作成する際、またはすでにアカウントをお持ちの場合は、（実際の資金を扱わないようにするために）ネットワークのドロップダウンメニューを使用して「Sepolia」テストネットワークに切り替えてください。

Sepoliaがリストに表示されない場合は、右上のメニューを開き、「Networks」を選択して、ネットワークリストの下部にある「Show test networks」をオンに切り替えます（[テストネットの表示に関するメタマスクのガイド](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)を参照してください）。次に、ネットワーク選択メニューで「Sepolia」を選択します。

![metamask sepolia example](./metamask-sepolia-example.png)

## ステップ4: フォーセットからイーサを追加する {#step-4}

スマート・コントラクトをテストネットワークにデプロイするには、テスト用のETHが必要です。Sepolia ETHを取得するには、[Sepoliaネットワークの詳細](/developers/docs/networks/#sepolia)にアクセスして、さまざまなフォーセットのリストを確認できます。枯渇していることもあるため、1つが機能しない場合は別のものを試してください。一部のフォーセットには利用条件があります。たとえば、AlchemyのSepoliaフォーセットでは、受信アドレスがイーサリアム・メインネット上で少なくとも0.001 ETHを保持している必要があります。ネットワークのトラフィックによっては、テスト用のETHを受け取るまでに時間がかかる場合があります。しばらくすると、メタマスクのアカウントにETHが表示されるはずです！

## ステップ5: 残高を確認する {#step-5}

残高があることを再確認するために、[Alchemyのコンポーザーツール](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)を使用して[eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance)リクエストを送信してみましょう。これにより、ウォレット内のETHの量が返されます。メタマスクのアカウントアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されるはずです。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **注:** この結果はETHではなくWeiで表示されています。Weiはイーサの最小単位として使用されます。WeiからETHへの変換は、1 ETH = 10<sup>18</sup> Weiです。したがって、0x2B5E3AF16B1880000を10進数に変換すると5\*10¹⁸となり、5 ETHに等しくなります。
>
> ふぅ！テスト用の資金はすべて揃っています <Emoji text=":money_mouth_face:" size={1} />。

## ステップ6: プロジェクトを初期化する {#step-6}

まず、プロジェクト用のフォルダを作成する必要があります。コマンドラインに移動して次のように入力します。

```sh
mkdir hello-world
cd hello-world
```

プロジェクトフォルダ内に移動したので、`npm init`を使用してプロジェクトを初期化します。npmがまだインストールされていない場合は、[Node.jsのインストール手順](https://nodejs.org/en/download/)に従ってください（このチュートリアルではNode.jsとnpmが必要です）。

```sh
npm init
```

インストールの質問にどのように答えても問題ありませんが、参考までに私たちがどのように設定したかを以下に示します。

```text
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

package.jsonを承認します。次にインストールするHardhat 3はESモジュールプロジェクトのみをサポートしているため、プロジェクトをESモジュールとしてマークします。

```sh
npm pkg set type=module
```

これで準備完了です！

## ステップ7: [Hardhat](https://hardhat.org/docs/getting-started)をダウンロードする {#step-7}

Hardhatは、イーサリアムソフトウェアをコンパイル、デプロイ、テスト、およびデバッグするための開発環境です。ライブチェーンにデプロイする前に、ローカルでスマート・コントラクトや分散型アプリケーション (dapp) を構築する際に開発者を支援します。

Hardhat 3にはNode.js v22.13.0以降が必要です。`hello-world`プロジェクト内で以下を実行します。

```sh
npm install --save-dev hardhat
```

[インストール手順](https://hardhat.org/docs/getting-started)の詳細については、こちらのページを確認してください。

## ステップ8: Hardhatプロジェクトを作成する {#step-8}

`npx hardhat --init`を実行すると完全なサンプルプロジェクトが生成されますが、このチュートリアルではすべての要素を理解できるように手動で設定します。プロジェクトフォルダのルートに、以下の内容で`hardhat.config.js`というファイルを作成します。

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

ここでプロジェクトのすべての設定を指定します（ステップ13で行います）。今のところ、使用するSolidityコンパイラのバージョンをHardhatに指示するだけです。

## ステップ9: プロジェクトフォルダを追加する {#step-9}

プロジェクトを整理するために、2つの新しいフォルダを作成します。コマンドラインでプロジェクトのルートディレクトリに移動し、次のように入力します。

```sh
mkdir contracts
mkdir scripts
```

- `contracts/`は、Hello Worldスマート・コントラクトのコードファイルを保存する場所です。
- `scripts/`は、コントラクトをデプロイし、対話するためのスクリプトを保存する場所です。

## ステップ10: コントラクトを記述する {#step-10}

一体いつになったらコードを書くのかと疑問に思っているかもしれませんね。お待たせしました、ステップ10でいよいよコードを書きます。

お気に入りのエディタ（私たちは[VSCode](https://code.visualstudio.com/)が好きです）でhello-worldプロジェクトを開きます。スマート・コントラクトはSolidityと呼ばれる言語で記述されており、これを使用してHelloWorld.solスマート・コントラクトを記述します。‌

1.  「contracts」フォルダに移動し、HelloWorld.solという新しいファイルを作成します。
2.  以下は、このチュートリアルで使用するイーサリアム財団のサンプルHello Worldスマート・コントラクトです。以下の内容をコピーしてHelloWorld.solファイルに貼り付け、コメントを読んでこのコントラクトが何を行うかを理解してください。

```solidity
// SPDX-License-Identifier: MIT
// セマンティックバージョニングを使用して、Solidityのバージョンを指定します。
// 詳細はこちら: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// `HelloWorld`という名前のコントラクトを定義します。
// コントラクトは、関数とデータ（その状態）の集合です。デプロイされると、コントラクトはイーサリアムのブロックチェーン上の特定のアドレスに配置されます。詳細はこちら: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // `string`型の状態変数`message`を宣言します。
   // 状態変数は、その値がコントラクトのストレージに永続的に保存される変数です。`public`キーワードを使用すると、コントラクトの外部から変数にアクセスできるようになり、他のコントラクトやクライアントが値にアクセスするために呼び出すことができる関数が作成されます。
   string public message;

   // 多くのクラスベースのオブジェクト指向言語と同様に、コンストラクタはコントラクトの作成時にのみ実行される特別な関数です。
   // コンストラクタは、コントラクトのデータを初期化するために使用されます。詳細はこちら: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // 文字列の引数`initMessage`を受け取り、コントラクトの`message`ストレージ変数に値を設定します。
      message = initMessage;
   }

   // 文字列の引数を受け取り、`message`ストレージ変数を更新するpublic関数です。
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

これは、作成時にメッセージを保存し、`update`関数を呼び出すことで更新できる非常にシンプルなスマート・コントラクトです。

## ステップ11: メタマスクとAlchemyをプロジェクトに接続する {#step-11}

メタマスクのウォレット、Alchemyのアカウントを作成し、スマート・コントラクトを記述しました。次はこれら3つを接続します。

仮想ウォレットから送信されるすべてのトランザクションには、固有の秘密鍵を使用した署名が必要です。プログラムにこの権限を提供するために、秘密鍵（およびAlchemyのAPIキー）を環境ファイルに安全に保存できます。

> トランザクションの送信について詳しくは、[トランザクションのドキュメント](/developers/docs/transactions/)を確認してください。

プロジェクトのルートディレクトリに`.env`ファイルを作成し、メタマスクの秘密鍵とHTTP Alchemy API URLを追加します。

- 秘密鍵をエクスポートするには、[こちらの手順](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/)に従ってください。
- HTTP Alchemy API URLを取得するには、以下を参照してください。

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URLをコピーします。

`.env`ファイルは次のようになります。

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

これらを実際にコードに接続するために、ステップ13で`hardhat.config.js`ファイル内のこれらの変数を参照します。Node.jsは単独で`.env`ファイルを読み込むことができるため、追加のパッケージをインストールする必要はありません。

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code>をコミットしないでください！秘密情報が漏洩してしまうため、<code>.env</code>ファイルを絶対に他の人と共有したり公開したりしないでください。バージョン管理を使用している場合は、<code>.env</code>を<a href="https://git-scm.com/docs/gitignore">gitignore</a>ファイルに追加してください。
</AlertDescription>
</AlertContent>
</Alert>

## ステップ12: Ethers.jsをインストールする {#step-12-install-ethersjs}

Ethers.jsは、[標準のJSON-RPCメソッド](/developers/docs/apis/json-rpc/)をよりユーザーフレンドリーなメソッドでラップすることで、イーサリアムとの対話やリクエストの送信を容易にするライブラリです。

Hardhatを使用すると、追加のツールや拡張機能のための[プラグイン](https://hardhat.org/docs/plugins/official-plugins)を非常に簡単に統合できます。コントラクトのデプロイには[Ethersプラグイン](https://hardhat.org/docs/plugins/hardhat-ethers)を活用します（[Ethers.js](https://docs.ethers.org/v6/)には非常に洗練されたコントラクトのデプロイメソッドがいくつかあります）。

プロジェクトディレクトリで次のように入力します。

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

次のステップで、このプラグインを`hardhat.config.js`にも追加します。

## ステップ13: hardhat.config.jsを更新する {#step-13-update-hardhatconfigjs}

これまでにいくつかの依存関係とプラグインを追加しました。次に、プロジェクトがそれらすべてを認識できるように`hardhat.config.js`を更新する必要があります。

`hardhat.config.js`を次のように更新します。

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// .envファイルが存在する場合、そこからAPI_URLとPRIVATE_KEYをprocess.envに読み込みます。
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

`configVariable`は、必要な場合にのみ環境変数から各値を読み取るようにHardhatに指示するため、値が設定される前でも`compile`のようなコマンドが機能します。秘密鍵をプレーンテキストファイルに保存したくない場合、Hardhatは[暗号化されたキーストアから設定変数](https://hardhat.org/docs/guides/configuration-variables)を読み取ることもできます。

## ステップ14: コントラクトをコンパイルする {#step-14-compile-our-contracts}

これまでのところすべてが機能していることを確認するために、コントラクトをコンパイルしてみましょう。`compile`タスクは、組み込みのHardhatタスクの1つです。

コマンドラインから以下を実行します。

```sh
npx hardhat compile
```

初めてコンパイルするとき、HardhatはSolidityコンパイラをダウンロードします。その後、`Compiled 1 Solidity file with solc 0.8.34`のようなメッセージが表示されるはずです。表示されない場合は、いつでも[Alchemyのディスコード](https://discord.gg/gWuC7zB)でメッセージを送信してください。

## ステップ15: デプロイスクリプトを記述する {#step-15-write-our-deploy-scripts}

コントラクトが記述され、設定ファイルの準備が整ったので、コントラクトのデプロイスクリプトを記述します。

`scripts/`フォルダに移動し、`deploy.js`という新しいファイルを作成して、以下の内容を追加します。

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// デプロイを開始し、コントラクトオブジェクトに解決されるPromiseを返します。
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

これらのコードの各行が何を行うかを見ていきましょう。

```js
const { ethers } = await network.create()
```

Hardhat 3では、スクリプトはネットワークへの接続を明示的に開きます。`network.create()`は、スクリプトの実行時に`--network`オプションで選択したネットワークに接続し、`hardhat-ethers`プラグインはその接続に`ethers`オブジェクトを追加します。

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

Ethers.jsの`ContractFactory`は、新しいスマート・コントラクトをデプロイするために使用される抽象化であるため、ここでの`HelloWorld`はHello Worldコントラクトのインスタンスのファクトリです。`hardhat-ethers`プラグインを使用する場合、`ContractFactory`と`Contract`のインスタンスはデフォルトで最初の署名者に接続されます。

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

`ContractFactory`で`deploy()`を呼び出すとデプロイが開始され、`Contract`に解決される`Promise`が返されます。これは、スマート・コントラクトの各関数のメソッドを持つオブジェクトです。`deploy()`に渡す引数はコントラクトのコンストラクタに渡され、ここでは初期メッセージとなります。

`waitForDeployment()`はデプロイトランザクションがブロックに含まれるまで待機し、`getAddress()`は新しいコントラクトのアドレスを返します。詳細については、[Ethers.jsのコントラクトドキュメント](https://docs.ethers.org/v6/api/contract/)を参照してください。

## ステップ16: コントラクトをデプロイする {#step-16-deploy-our-contract}

ついにスマート・コントラクトをデプロイする準備が整いました！コマンドラインに移動して以下を実行します。

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

すると、次のように表示されるはずです。

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

[SepoliaのEtherscan](https://sepolia.etherscan.io/)にアクセスしてコントラクトのアドレスを検索すると、正常にデプロイされたことが確認できるはずです。トランザクションは次のようになります。

![etherscan contract](./etherscan-contract.png)

`From`アドレスはメタマスクのアカウントアドレスと一致し、Toアドレスには「Contract Creation」と表示されますが、トランザクションをクリックすると、`To`フィールドにコントラクトのアドレスが表示されます。

![etherscan transaction](./etherscan-transaction.png)

おめでとうございます！イーサリアムチェーンにスマート・コントラクトをデプロイしました 🎉

内部で何が起こっているかを理解するために、[Alchemyダッシュボード](https://dashboard.alchemy.com/)で「Hello World」アプリが受信したリクエストを確認できます。

そこには、`.deploy()`関数を呼び出したときにHardhat/Ethersが内部で行ったいくつかのJSON-RPC呼び出しが表示されます。ここで注目すべき重要な2つは、コントラクトを実際にSepoliaチェーンに書き込むためのリクエストである[`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction)と、ハッシュを指定してトランザクションに関する情報を読み取るためのリクエストである[`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash)（トランザクションを送信する際の典型的なパターン）です。トランザクションの送信について詳しくは、[トランザクションのドキュメント](/developers/docs/transactions/)を確認してください。

このチュートリアルは以上です。次は、[コントラクトのユーザーインターフェースを構築する](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)ことができます。
