---
title: 初心者向けのHello Worldスマートコントラクト - フルスタック
description: イーサリアムでの簡単なスマートコントラクトの作成とデプロイに関する入門チュートリアル。
author: "nstrike2"
tags:
  [
    "Solidity",
    "hardhat",
    "Alchemy",
    "スマート契約",
    "デプロイ",
    "ブロックエクスプローラー",
    "フロントエンド",
    "トランザクション"
  ]
skill: beginner
lang: ja
published: 2021-10-25
---

このガイドは、ブロックチェーン開発の初心者で、どこから始めればよいか、スマートコントラクトのデプロイやインタラクトの方法がわからない方を対象としています。 [MetaMask](https://metamask.io)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org)、[Alchemy](https://alchemy.com/eth) を使って、Goerliテストネットワークでシンプルなスマートコントラクトを作成し、デプロイする手順を説明します。

このチュートリアルを完了するには、Alchemyのアカウントが必要です。 [無料アカウントにサインアップ](https://www.alchemy.com/)

ご不明な点がありましたら、[Alchemy Discord](https://discord.gg/gWuC7zB) までお気軽にお問い合わせください。

## パート1 - Hardhatを使用してスマートコントラクトを作成・デプロイする {#part-1}

### Ethereumネットワークに接続する {#connect-to-the-ethereum-network}

イーサリアムチェーンにリクエストを行う方法はたくさんあります。 簡潔にするため、ブロックチェーン開発者プラットフォームであり、APIでもあるAlchemyの無料アカウントを使用します。これにより、自分でノードを実行することなく、Ethereumチェーンと通信できます。 Alchemyには、モニタリングと分析のための開発者ツールもあります。このチュートリアルでは、これらのツールを利用して、スマートコントラクトのデプロイで内部的に何が起こっているかを理解します。

### アプリとAPIキーを作成する {#create-your-app-and-api-key}

Alchemyのアカウントを作成したら、アプリを作成してAPIキーを生成できます。 これにより、Goerliテストネットにリクエストを送信できるようになります。 テストネットに馴染みがない場合は、[Alchemyのネットワーク選択ガイド](https://www.alchemy.com/docs/choosing-a-web3-network) をお読みください。

Alchemyのダッシュボードで、ナビゲーションバーにある **Apps** ドロップダウンを見つけ、**Create App** をクリックします。

![Hello worldアプリ作成](./hello-world-create-app.png)

アプリに「_Hello World_」という名前を付け、簡単な説明を記述します。 環境として **Staging** を、ネットワークとして **Goerli** を選択します。

![アプリ作成ビュー hello world](./create-app-view-hello-world.png)

_注: 必ず **Goerli** を選択してください。選択しないと、このチュートリアルは機能しません。_

**Create app** をクリックします。 作成したアプリが下の表に表示されます。

### Ethereumアカウントを作成する {#create-an-ethereum-account}

トランザクションを送受信するには、Ethereumアカウントが必要です。 ここでは、ユーザーがEthereumアカウントアドレスを管理できる、ブラウザ上の仮想ウォレットであるMetaMaskを使用します。

MetaMaskアカウントは、[こちら](https://metamask.io/download)から無料でダウンロードして作成できます。 アカウントを作成するとき、またはすでにアカウントをお持ちの場合は、右上の「Goerli Test Network」に必ず切り替えてください (実在の通貨を扱わないようにするため)。

### ステップ4: フォーセットからイーサを追加する {#step-4-add-ether-from-a-faucet}

スマートコントラクトをテストネットワークにデプロイするには、偽のETHが必要です。 GoerliネットワークでETHを取得するには、Goerliフォーセットにアクセスし、Goerliアカウントアドレスを入力します。 Goerliフォーセットは最近、少し信頼性が低い場合があります。試せるオプションの一覧については、[テストネットワークのページ](/developers/docs/networks/#goerli) を参照してください:

_注: ネットワークの混雑により、しばらく時間がかかる場合があります。_
\`\`

### ステップ5: 残高を確認する {#step-5-check-your-balance}

ウォレットにETHが入っていることを再確認するために、[Alchemyのcomposerツール](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) を使って [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) リクエストを実行してみましょう。 このリクエストをすると、ウォレット内のETHの額が返されます。 詳細については、[composerツールの使用方法に関するAlchemyの短いチュートリアル](https://youtu.be/r6sjRxBZJuU) をご覧ください。

MetaMaskアカウントのアドレスを入力し、**Send Request** をクリックします。 以下のようなコードスニペットのレスポンスが表示されます。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _注: この結果はETHではなく、wei単位です。_ _Weiはetherの最小単位として使用されます。_

ふう! 私たちの偽物のお金はすべてそこにあります。

### ステップ6: プロジェクトを初期化する {#step-6-initialize-our-project}

まず、プロジェクト用のフォルダを作成する必要があります。 コマンドラインに移動し、次のように入力します。

```
mkdir hello-world
cd hello-world
```

プロジェクトフォルダに入ったので、`npm init`を使用してプロジェクトを初期化します。

> まだnpmがインストールされていない場合は、[Node.jsとnpmをインストールするための指示](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)に従ってください。

このチュートリアルでは、初期化における質問にどのように答えるかには重点を置いていません。 参考までに、私たちは次のように行いました。

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

package.jsonを承認すれば完了です！

### ステップ7: Hardhatをダウンロードする {#step-7-download-hardhat}

Hardhatは、イーサリアムのソフトウェアをコンパイル、デプロイ、テスト、デバッグするための開発環境です。 デベロッパーがライブチェーンにデプロイする前に、スマートコントラクトや分散型アプリケーション(Dapp)をローカルに構築する際に役立ちます。

`hello-world`プロジェクト内で次を実行します。

```
npm install --save-dev hardhat
```

[インストール手順](https://hardhat.org/getting-started/#overview)の詳細については、このページをご覧ください。

### ステップ8: Hardhatプロジェクトを作成する {#step-8-create-hardhat-project}

`hello-world`プロジェクトフォルダ内で、以下を実行します:

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

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

これにより、プロジェクトに `hardhat.config.js` ファイルが生成されます。 チュートリアルの後半で、これを使用してプロジェクトのセットアップを指定します。

### ステップ9: プロジェクトフォルダを追加する {#step-9-add-project-folders}

プロジェクトを整理するために、2つの新しいフォルダを作成しましょう。 コマンドラインで、`hello-world` プロジェクトのルートディレクトリに移動し、次のように入力します:

```
mkdir contracts
mkdir scripts
```

- `contracts/` には、hello worldスマートコントラクトのコードファイルを保存します
- `scripts/` には、コントラクトをデプロイして対話するためのスクリプトを保存します

### ステップ10: コントラクトを作成する {#step-10-write-our-contract}

「いつになったらコードを書くのだろう？」と思っているかもしれませんね。 その時が来ました！

お好きなエディタでhello-worldプロジェクトを開いてください。 スマートコントラクトは、最も一般的にはSolidityで記述されており、今回もSolidityを使ってスマートコントラクトを作成します。

1. `contracts` フォルダに移動し、`HelloWorld.sol` という名前の新しいファイルを作成します。
2. 以下は、このチュートリアルで使用するHello Worldスマートコントラクトのサンプルです。 以下の内容を `HelloWorld.sol` ファイルにコピーしてください。

_注: このコントラクトが何をするのかを理解するために、必ずコメントをお読みください。_

```
// Solidityのバージョンをセマンティックバージョニングで指定します。
// 詳細: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// `HelloWorld` という名前のコントラクトを定義します。
// コントラクトは関数とデータ (その状態) の集合です。一度デプロイされると、コントラクトはEthereumブロックチェーン上の特定のアドレスに存在します。詳細: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // update関数が呼び出されたときに発行されます
   //スマートコントラクトのイベントは、ブロックチェーン上で何かが起こったことをコントラクトがアプリのフロントエンドに伝える方法です。フロントエンドは特定のイベントを「リッスン」し、それが起こったときに行動を起こすことができます。
   event UpdatedMessages(string oldStr, string newStr);

   // `string` 型の状態変数 `message` を宣言します。
   // 状態変数は、その値がコントラクトのストレージに永続的に保存される変数です。`public` キーワードにより、変数はコントラクトの外部からアクセス可能になり、他のコントラクトやクライアントが値をアクセスするために呼び出せる関数が作成されます。
   string public message;

   // 多くのクラスベースのオブジェクト指向言語と同様に、コンストラクタはコントラクト作成時に一度だけ実行される特別な関数です。
   // コンストラクタはコントラクトのデータを初期化するために使用されます。詳細:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 文字列引数 `initMessage` を受け取り、その値をコントラクトの `message` ストレージ変数に設定します)。
      message = initMessage;
   }

   // 文字列引数を受け取り、 `message` ストレージ変数を更新する公開関数です。
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

これは、作成時にメッセージを保存する基本的なスマートコントラクトです。 `update` 関数を呼び出すことで更新できます。

### ステップ11: MetaMaskとAlchemyをプロジェクトに接続する {#step-11-connect-metamask-alchemy-to-your-project}

MetaMaskウォレットとAlchemyアカウントを作成し、スマートコントラクトも作成しました。次はこの3つを接続しましょう。

ウォレットから送信されるすべてのトランザクションには、一意の秘密鍵を使用した署名が必要です。 プログラムにこの許可を与えるために、秘密鍵を環境ファイルに安全に保存することができます。 AlchemyのAPIキーもここに保存します。

> トランザクションの送信についてさらに詳しく知るには、web3を使用したトランザクションの送信に関する[このチュートリアル](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) を確認してください。

まず、プロジェクトディレクトリにdotenvパッケージをインストールします。

```
npm install dotenv --save
```

次に、プロジェクトのルートディレクトリに `.env` ファイルを作成します。 そのファイルに、MetaMaskの秘密鍵とHTTP Alchemy APIのURLを追加します。

環境ファイルは `.env` という名前にする必要があります。そうしないと、環境ファイルとして認識されません。

`process.env` や `.env-custom` など、他の名前にしないでください。

- 秘密鍵をエクスポートするための[これらの手順](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)に従ってください
- HTTP Alchemy API URLを取得するには、以下を参照してください

![](./get-alchemy-api-key.gif)

`.env`は次のようになります:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

これらをコードに実際に接続するために、ステップ13で`hardhat.config.js`ファイル内のこれらの変数を参照します。

### ステップ12: Ethers.jsをインストールする {#step-12-install-ethersjs}

Ethers.jsは、[標準的なJSON-RPCメソッド](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc)をよりユーザーフレンドリーなメソッドでラップすることにより、Ethereumとのインタラクションやリクエストを容易にするライブラリです。

Hardhatでは、追加のツールや拡張機能のために[プラグイン](https://hardhat.org/plugins/)を統合することができます。 コントラクトのデプロイには[Ethersプラグイン](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)を利用します。

プロジェクトのホームディレクトリで以下を実行します。

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### ステップ13: hardhat.config.jsを更新する {#step-13-update-hardhat-configjs}

ここまでで、いくつかの依存関係とプラグインを追加しました。次に、プロジェクトがそれらすべてを認識できるように、`hardhat.config.js`を更新する必要があります。

`hardhat.config.js`を次のように更新します:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### ステップ14: コントラクトをコンパイルする {#step-14-compile-our-contract}

ここまでの作業がうまくいっていることを確認するために、コントラクトをコンパイルしてみましょう。 `compile`タスクは、組み込みのHardhatタスクの1つです。

コマンドラインで以下を実行します。

```bash
npx hardhat compile
```

`SPDX license identifier not provided in source file` という警告が表示されるかもしれませんが、心配する必要はありません。それ以外はすべて問題ないはずです！ うまくいかない場合は、いつでも[Alchemy Discord](https://discord.gg/u72VCg3)でメッセージを送ることができます。

### ステップ15: デプロイスクリプトを作成する {#step-15-write-our-deploy-script}

コントラクトの作成と設定ファイルの作成が完了したら、いよいよコントラクトのデプロイのためのスクリプトを作成します。

`scripts/`フォルダに移動して`deploy.js`という名前の新しいファイルを作成し、次の内容を追加します:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // デプロイを開始し、コントラクトオブジェクトに解決されるpromiseを返す
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhatは、[コントラクトのチュートリアル](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)で、これらのコードの各行が何をするかを非常にうまく説明しています。ここではその説明を採用しました。

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.jsの `ContractFactory` は、新しいスマートコントラクトをデプロイするために使用される抽象化です。したがって、ここでの `HelloWorld` は、私たちのhello worldコントラクトのインスタンスのための[ファクトリ](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\))です。 `hardhat-ethers`プラグインを使用する場合、`ContractFactory`と`Contract`のインスタンスは、デフォルトで最初の署名者 (所有者) に接続されます。

```javascript
const hello_world = await HelloWorld.deploy()
```

`ContractFactory`で`deploy()`を呼び出すとデプロイが開始され、`Contract`オブジェクトに解決される`Promise`が返されます。 これは、スマートコントラクトの各関数に対するメソッドを持つオブジェクトです。

### ステップ16: コントラクトをデプロイする {#step-16-deploy-our-contract}

ようやく、スマートコントラクトをデプロイする準備が整いました。 コマンドラインに移動し、次を実行します:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

次のような画面が表示されるはずです。

```bash
コントラクトがデプロイされたアドレス: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**このアドレスを保存してください**。 このアドレスはチュートリアルの後半で使用します。

[Goerli etherscan](https://goerli.etherscan.io) にアクセスしてコントラクトアドレスを検索すると、正常にデプロイされたことを確認できるはずです。 トランザクションは以下のようなものになります。

![](./etherscan-contract.png)

`From`アドレスはMetaMaskアカウントのアドレスと一致し、`To`アドレスには**Contract Creation**と表示されます。 トランザクションをクリックすると、`To`フィールドにコントラクトアドレスが表示されます。

![](./etherscan-transaction.png)

おめでとうございます！ Ethereumテストネットにスマートコントラクトをデプロイできました。

内部で何が起こっているのかを理解するために、[Alchemyダッシュボード](https://dashboard.alchemy.com/explorer)のExplorerタブに移動してみましょう。 複数のAlchemyアプリをお持ちの場合は、必ずアプリでフィルタリングし、**Hello World**を選択してください。

![](./hello-world-explorer.png)

ここでは、`.deploy()`関数を呼び出した際に、Hardhat/Ethersが内部で行ったいくつかのJSON-RPCメソッドを見ることができます。 ここでの2つの重要なメソッドは、コントラクトをGoerliチェーンに書き込むリクエストである [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) と、ハッシュが与えられたトランザクションに関する情報を読み取るリクエストである [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash) です。 トランザクションの送信についてさらに詳しく知るには、[Web3を使用したトランザクション送信に関するチュートリアル](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)を確認してください。

## パート2: スマートコントラクトとインタラクトする {#part-2-interact-with-your-smart-contract}

スマートコントラクトをGoerliネットワークに正常にデプロイできました。それでは、スマートコントラクトとやり取りする方法について学びましょう。

### interact.jsファイルを作成する {#create-a-interactjs-file}

このファイルに、インタラクトするスクリプトを記述します。 パート1でインストールしたEthers.jsライブラリを使用します。

`scripts/`フォルダ内に、`interact.js`という名前の新しいファイルを作成し、次のコードを追加します。

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### .envファイルを更新する {#update-your-env-file}

新しい環境変数を使用するため、[以前に作成した](#step-11-connect-metamask-&-alchemy-to-your-project)`.env`ファイルに定義する必要があります。

Alchemyの`API_KEY`とスマートコントラクトがデプロイされている`CONTRACT_ADDRESS`の定義を加える必要があります。

`.env`ファイルは、以下のようになっていなければなりません。

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### コントラクトABIを取得する {#grab-your-contract-ABI}

コントラクトの[ABI (アプリケーションバイナリインターフェイス)](/glossary/#abi)は、スマートコントラクトとインタラクトするためのインターフェイスです。 Hardhatは自動的にABIを生成して、`HelloWorld.json`ファイルに保存します。 ABIを使うには、`interact.js`ファイルに次のコードを追加して、コンテンツをパースする必要があります。

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

ABIを確認したい場合は、コンソールに出力できます:

```javascript
console.log(JSON.stringify(contract.abi))
```

コンソールに出力されたABIを確認するには、ターミナルに移動して次のコマンドを実行します。

```bash
npx hardhat run scripts/interact.js
```

### コントラクトのインスタンスを作成する {#create-an-instance-of-your-contract}

コントラクトを操作するには、コード内にコントラクトのインスタンスを作成する必要があります。 Ethers.jsでこれを行うには、次の3つのコンセプトを扱う必要があります。

1. Provider - ブロックチェーンへの読み取りおよび書き込みアクセスを提供するノードプロバイダです。
2. Signer - トランザクションに署名するEthereumアカウントを表します。
3. Contract - オンチェーンにデプロイされた特定のコントラクトを表すEthers.jsのオブジェクトです。

前の手順で取得したコントラクトABIを使って、コントラクトのインスタンスを作成します。

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Provider、Signer、Contractの詳細については、[ethers.jsドキュメント](https://docs.ethers.io/v5/)をご覧ください。

### initメッセージを読み込む {#read-the-init-message}

`initMessage = "Hello world!"`を使用してコントラクトをデプロイしたことを覚えていますか？ ここでは、スマートコントラクトに保存されているメッセージを読み取り、コンソールに出力します。

JavaScriptでは、ネットワークとのインタラクトで非同期関数を使います。 非同期関数についてさらに詳しく知るには、[このmediumの記事](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)をお読みください。

以下のコードを使用して、スマートコントラクトの`message`関数を呼び出し、initメッセージを読み取ります。

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

ターミナルで `npx hardhat run scripts/interact.js` を使用してファイルを実行すると、次のようなレスポンスが表示されます。

```
The message is: Hello world!
```

おめでとうございます！ Ethereumブロックチェーンからスマートコントラクトのデータを正常に読み取ることができました。お見事！

### メッセージを更新する {#update-the-message}

メッセージを読み取るだけでなく、`update`関数を使ってスマートコントラクトに保存されたメッセージを更新することもできます。 かなりクールでしょう？

メッセージを更新するには、インスタンス化されたContractオブジェクトで`update`関数を直接呼び出します。

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

11行目で、返されたトランザクションオブジェクトに対して `.wait()` を呼び出していることに注目してください。 これにより、スクリプトが関数を終了する前に、トランザクションがブロックチェーン上でマイニングされるまで待機することが保証されます。 `.wait()` の呼び出しを含めなかった場合、スクリプトは、コントラクト内で更新された `message` の値を表示しないことがあります。

### 新しいメッセージを読み込む {#read-the-new-message}

[前の手順](#read-the-init-message)を繰り返して、更新された `message` の値を読み取ることができるはずです。 少し時間を取って、新しい値を表示するために必要な変更を加えられるか試してみましょう！

ヒントが必要な場合は、この時点で`interact.js`ファイルがどのようになるかを示します。

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// contract instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

このスクリプトを実行するだけで、古いメッセージ、更新ステータス、および新しいメッセージがターミナルに出力されるのを確認できるはずです。

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

このスクリプトの実行中、新しいメッセージが読み込まれる前に、 `Updating the message...` のステップの読み込みにしばらく時間がかかることに気づくかもしれません。 これはマイニングプロセスによるものです。マイニング中のトランザクションの追跡に興味があるならば、[Alchemyメンプール](https://dashboard.alchemyapi.io/mempool)にアクセスしてトランザクションのステータスを確認できます。 トランザクションがドロップされた場合は、[Goerli Etherscan](https://goerli.etherscan.io) を確認してトランザクションハッシュを検索することも役立ちます。

## パート3: スマートコントラクトをEtherscanに公開する {#part-3-publish-your-smart-contract-to-etherscan}

あなたは、スマートコントラクトに命を吹き込むために大変な努力をしました。さあ、その成果を世界に共有しましょう！

Etherscanでスマートコントラクトを検証すると、誰でもソースコードを表示して、あなたのスマートコントラクトとインタラクトできるようになります。 さあ、始めましょう！

### ステップ1: EtherscanアカウントでAPIキーを生成する {#step-1-generate-an-api-key-on-your-etherscan-account}

EtherscanのAPIキーは、公開しようとしているスマートコントラクトを所有していることを確認するために必要になります。

Etherscanアカウントをお持ちでない場合は、[アカウントにサインアップ](https://etherscan.io/register)してください。

ログインしたら、ナビゲーションバーでユーザー名を見つけ、その上にカーソルを合わせて **My profile** ボタンを選択します。

プロフィールページにサイドナビゲーションバーが表示されます。 サイドナビゲーションバーで、**API Keys**を選択します。 次に、「Add」ボタンを押して新しいAPIキーを作成し、アプリに **hello-world** という名前を付けて、「**Create New API Key**」ボタンを押します。

新しいAPIキーがAPIキーテーブルに表示されるはずです。 APIキーをクリップボードにコピーします。

次に、EtherscanのAPIキーを`.env`ファイルに加える必要があります。

追加した後、`.env`ファイルは次のようになります。

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhatでデプロイされたスマートコントラクト {#hardhat-deployed-smart-contracts}

#### hardhat-etherscanをインストールする {#install-hardhat-etherscan}

Hardhatを使ってコントラクトをEtherscanへ公開するのは簡単です。 まず、`hardhat-etherscan`プラグインをインストールする必要があります。 `hardhat-etherscan`は、スマートコントラクトのソースコードとEtherscan上のABIを自動的に検証します。 インストールするには、`hello-world`ディレクトリで次のコマンドを実行します。

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

インストールしたら、`hardhat.config.js`の先頭に次のステートメントを含め、Etherscanの構成オプションを追加します。

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Etherscan用のAPIキー
    // https://etherscan.io/ で取得
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscanでスマートコントラクトを検証する {#verify-your-smart-contract-on-etherscan}

すべてのファイルが保存され、すべての`.env`変数が正しく構成されていることを確認してください。

`verify`タスクを実行し、コントラクトのアドレスと、コントラクトがデプロイされているネットワークを渡します。

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

`DEPLOYED_CONTRACT_ADDRESS`がGoerliテストネットワーク上にデプロイされたスマートコントラクトのアドレスであることを確認してください。 また、最後の引数(`'Hello World!'`)は、[パート1のデプロイスクリプト作成手順](#write-our-deploy-script)で使用した文字列値と同じでなければなりません。

すべてが順調に進めば、ターミナルに次のメッセージが表示されます。

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

おめでとうございます！ これで、あなたのスマートコントラクトコードはEtherscan上にあります。

### Etherscanであなたのスマートコントラクトを確認しましょう！ {#check-out-your-smart-contract-on-etherscan}

ターミナルに表示されているリンクに移動すると、Etherscanで公開されているスマートコントラクトコードとABIが表示されます。

**ヤッター！やりましたね！ これで、誰でもスマートコントラクトを呼び出したり、書き込んだりできるようになりました。 次にあなたが何を構築するか楽しみにしています。**

## パート4 - スマートコントラクトをフロントエンドと統合する {#part-4-integrating-your-smart-contract-with-the-frontend}

このチュートリアルを終えると、次の方法がわかるようになります。

- MetaMaskウォレットをdappに接続する
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) APIを使用してスマートコントラクトからデータを読み取る
- MetaMaskを使用してEthereumトランザクションに署名する

このdappでは、フロントエンドフレームワークとして[React](https://react.dev/)を使用します。ただし、このプロジェクトではWeb3機能を導入することに主に焦点を当てているため、Reactの基礎を詳しく説明する時間はあまりかけない点に注意してください。

前提条件として、Reactについて初心者レベルの理解をしている必要があります。 そうでない場合は、公式の[React入門チュートリアル](https://react.dev/learn)を完了することをお勧めします。

### スターターファイルをクローンする {#clone-the-starter-files}

まず、[hello-world-part-four GitHubリポジトリ](https://github.com/alchemyplatform/hello-world-part-four-tutorial)にアクセスして、このプロジェクトのスターターファイルを取得し、このリポジトリをローカルマシンにクローンします。

クローンしたリポジトリをローカルで開きます。 `starter-files`と`completed`の2つのフォルダが含まれていることに注意してください。

- `starter-files` - **このディレクトリで作業します**。UIをEthereumウォレットおよび[パート3](#part-3)でEtherscanに公開したスマートコントラクトに接続します。
- `completed`には、チュートリアル全体が完了したものが入っています。行き詰まった場合にのみ、参考として使ってください。

次に、`starter-files`のコピーをお気に入りのコードエディタで開き、`src`フォルダに移動します。

私たちが書くコードはすべて`src`フォルダの下に置かれます。 `HelloWorld.js`コンポーネントと`util/interact.js`JavaScriptファイルを編集して、プロジェクトにWeb3機能を追加します。

### スターターファイルを確認する {#check-out-the-starter-files}

コーディングを開始する前に、スターターファイルで提供されるものを探索してみましょう。

#### Reactプロジェクトを実行する {#get-your-react-project-running}

まずは、ブラウザでReactプロジェクトを実行しましょう。 Reactの素晴らしいところは、一度ブラウザでプロジェクトを実行すると、保存した変更がブラウザでも同時に更新されることです。

プロジェクトを実行するには、`starter-files`フォルダのルートディレクトリに移動し、ターミナルで`npm install`を実行してプロジェクトの依存関係をインストールします。

```bash
cd starter-files
npm install
```

インストールが完了したら、ターミナルで`npm start`を実行します:

```bash
npm start
```

これにより、ブラウザで[http://localhost:3000/](http://localhost:3000/)が開かれ、プロジェクトのフロントエンドが表示されます。 これは、1つのフィールド \(スマートコントラクトに保存されているメッセージを更新する場所\)、「Connect Wallet」ボタン、および「Update」ボタンで構成されています。

どちらのボタンをクリックしても機能しないことに気づくでしょう。これは、まだその機能をプログラムする必要があるためです。

#### `HelloWorld.js`コンポーネント {#the-helloworld-js-component}

エディタの`src`フォルダに戻り、`HelloWorld.js`ファイルを開きましょう。 このファイルには、これから作業を進めていく主要なReactコンポーネントが含まれています。すべての内容を理解することが非常に重要です。

このファイルの先頭には、プロジェクトを実行するために必要な、Reactライブラリ、useEffectフックとuseStateフック、`./util/interact.js`からのいくつかのアイテム (これらについては、すぐに詳しく説明します！)、そしてAlchemyのロゴなど、いくつかのimport文があることに気づくでしょう。

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

次に、特定のイベントの後に更新するステート変数があります。

```javascript
// HelloWorld.js

//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

それぞれの変数は以下の内容を表します。

- `walletAddress` - ユーザーのウォレットアドレスを格納する文字列
- `status`- ユーザーにdappのインタラクト方法を案内する補助メッセージを格納する文字列
- `message` - スマートコントラクトの現在のメッセージを格納する文字列
- `newMessage` - スマートコントラクトに書き込まれる新しいメッセージを格納する文字列

ステート変数の後に、`useEffect`、`addSmartContractListener`、`addWalletListener`、`connectWalletPressed`、`onUpdatePressed`の5つの未実装の関数があります。 次に、それらが何をするのかを説明します。

```javascript
// HelloWorld.js

//called only once
useEffect(async () => {
  //TODO: implement
}, [])

function addSmartContractListener() {
  //TODO: implement
}

function addWalletListener() {
  //TODO: implement
}

const connectWalletPressed = async () => {
  //TODO: implement
}

const onUpdatePressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - これは、コンポーネントがレンダリングされた後に呼び出されるReactフックです。 空の配列`[]`のプロップが渡されているため \(4行目を参照\)、コンポーネントの_最初の_レンダリングでのみ呼び出されます。 ここでは、スマートコントラクトに保存されている現在のメッセージをロードし、スマートコントラクトとウォレットリスナーを呼び出し、ウォレットが既に接続されているかどうかを反映してUIを更新します。
- `addSmartContractListener` - この関数では、HelloWorldコントラクトの`UpdatedMessages`イベントを監視し、スマートコントラクトでメッセージが変更されたときにUIを更新するリスナーを設定します。
- `addWalletListener` - この関数では、ユーザーがウォレットを切断したときやアドレスを切り替えたときなど、ユーザーのMetaMaskウォレットのステートの変化を検出するリスナーを設定します。
- `connectWalletPressed`- この関数は、ユーザーのMetaMaskウォレットをdappに接続するのに呼び出されます。
- `onUpdatePressed` - この関数は、ユーザーがスマートコントラクトに保存されているメッセージを更新したいときに呼び出されます。

このファイルの終盤には、コンポーネントのUIがあります。

```javascript
// HelloWorld.js

//the UI of our component
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
    </div>
  </div>
)
```

このコードを注意深く読むと、さまざまなステート変数がUIのどの場所で使用されているかがわかります。

- 6～12行目では、ユーザーのウォレットが接続されている場合 \(すなわち`walletAddress.length > 0`\)、ID「walletButton」のボタンに省略されたユーザーの`walletAddress`が表示されます。それ以外の場合は、単に「Connect Wallet」と表示されます。
- 17行目では、`message`文字列でキャプチャされたスマートコントラクトに保存されている現在のメッセージを表示します。
- 23～26行目では、[制御されたコンポーネント](https://legacy.reactjs.org/docs/forms.html#controlled-components)を使用して、テキストフィールドの入力が変化したときに`newMessage`ステート変数を更新します。

ステート変数に加えて、IDが`publishButton`と`walletButton`であるボタンがそれぞれクリックされると、`connectWalletPressed`および`onUpdatePressed`関数が呼び出されることがわかります。

最後に、この`HelloWorld.js`コンポーネントがどこに加えられるかについて説明します。

`App.js`ファイルは、他のすべてのコンポーネントのコンテナとして機能するReactのメインコンポーネントですが、このファイルを表示すると、`HelloWorld.js`コンポーネントが7行目に挿入されていることが分かります。

最後に、提供されているもう1つのファイル、`interact.js`ファイルを確認してみましょう。

#### `interact.js`ファイル {#the-interact-js-file}

[M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)パラダイムに従うため、dappのロジック、データ、ルールを管理するすべての関数を含む個別のファイルを作成し、それらの関数をフロントエンド \(私たちの`HelloWorld.js`コンポーネント\) にエクスポートできるようにします。

👆🏽まさにこれが`interact.js`ファイルの目的です！

`src`ディレクトリの`util`フォルダに移動すると、`interact.js`というファイルが含まれていることがわかります。これには、すべてのスマートコントラクトとのインタラクション、ウォレット関数、変数が含まれています。

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

ファイルの先頭で、`helloWorldContract`オブジェクトがコメントアウトされていることがわかります。 このチュートリアルの後半で、このオブジェクトのコメントを外し、この変数でスマートコントラクトをインスタンス化し、それを`HelloWorld.js`コンポーネントにエクスポートします。

`helloWorldContract`オブジェクトの後の4つの未実装の関数は、次のことを行います。

- `loadCurrentMessage` - この関数は、スマートコントラクトに保存されている現在のメッセージをロードするロジックを扱います。 [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3)を使用して、Hello Worldスマートコントラクトへの_読み取り_呼び出しを行います。
- `connectWallet` - この関数は、ユーザーのMetaMaskをdappに接続します。
- `getCurrentWalletConnected` - この関数は、ページの読み込み時にEthereumアカウントが既にdappに接続されているかどうかを確認し、それに応じてUIを更新します。
- `updateMessage` - この関数は、スマートコントラクトに保存されているメッセージを更新します。 Hello Worldスマートコントラクトで_書き込み_呼び出しが行われるため、ユーザーのMetaMaskウォレットでは、メッセージを更新するためにEthereumトランザクションに署名する必要があります。

何をするか理解したので、スマートコントラクトから読み取る方法を解明していきましょう。

### ステップ3: スマートコントラクトから読み取る {#step-3-read-from-your-smart-contract}

スマートコントラクトから読み取るには、次の設定を正しく行う必要があります。

- EthereumチェーンへのAPI接続
- スマートコントラクトのロードされたインスタンス
- スマートコントラクトの関数を呼び出す関数
- スマートコントラクトから読み取っているデータが変更されたときの更新を監視するリスナー

手順がたくさんあるように感じますが、心配しないでください！ それぞれの方法を1つずつ説明していきます。 :​)

#### EthereumチェーンへのAPI接続を確立する {#establish-an-api-connection-to-the-ethereum-chain}

このチュートリアルのパート2で、[Alchemy Web3キーを使用してスマートコントラクトから読み取った](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)ことを覚えていますか？ チェーンから読み取るには、dappでAlchemy Web3キーも必要になります。

まだインストールしていない場合は、まず`starter-files`のルートディレクトリに移動し、ターミナルで次のコマンドを実行して[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)をインストールしてください。

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)は[Web3.js](https://docs.web3js.org/)のラッパーであり、強化されたAPIメソッドやその他の重要なメリットを提供し、web3開発者としての作業を容易にします。 最小限の設定で使えるように設計されているので、アプリですぐに使用可能です。

次に、[dotenv](https://www.npmjs.com/package/dotenv)パッケージをプロジェクトディレクトリにインストールします。これにより、APIキーを取得した後に安全な場所に保管できるようになります。

```text
npm install dotenv --save
```

dappでは、HTTP APIキーの代わりに**Websockets APIキーを使用します**。これにより、スマートコントラクトに保存されたメッセージが変更されたときに検出するリスナーを設定できます。

APIキーを取得したら、ルートディレクトリに `.env`ファイルを作成し、Alchemy Websocketsの URLをそのファイルに追加します。 その後、`.env`ファイルは次のようになります。

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

これで、dappにAlchemy Web3エンドポイントを設定する準備が整いました。 `util`フォルダー内に入っている`interact.js`に戻り、ファイルの先頭に次のコードを加えてください。

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

上記のコードでは、まず`.env`ファイルから Alchemyキーをインポートし、次に`alchemyKey`を`createAlchemyWeb3`に渡してAlchemy Web3エンドポイントを確立しています。

エンドポイントの準備できたので、スマートコントラクトをロードするときです！

#### Hello Worldスマートコントラクトをロードする {#loading-your-hello-world-smart-contract}

Hello Worldスマートコントラクトをロードするには、そのコントラクトアドレスとABIが必要です。これらは、[このチュートリアルのパート3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)を完了していれば、Etherscanで見つけることができます。

#### EtherscanからコントラクトABIを取得する方法 {#how-to-get-your-contract-abi-from-etherscan}

このチュートリアルのパート3を飛ばした場合は、アドレス[0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code)のHelloWorldコントラクトを使用できます。 そのABIは[こちら](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code)で見つけることができます。

コントラクトのABIは、コントラクトが呼び出す関数を指定し、関数が期待するフォーマットでデータを確実に返すようにするために必要です。 コントラクトABIをコピーしたら、それを`contract-abi.json`という名前のJSONファイルとして`src`ディレクトリに保存しましょう。

contract-abi.jsonは、srcフォルダーに格納されている必要があります。

コントラクトアドレス、ABI、Alchemy Web3エンドポイントを用意したので、[contractメソッド](https://docs.web3js.org/api/web3-eth-contract/class/Contract)を使ってスマートコントラクトのインスタンスをロードすることができます。 コントラクトABIを`interact.js`ファイルにインポートし、コントラクトアドレスを加えます。

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

ついに、`helloWorldContract`変数のコメントを外し、AlchemyWeb3エンドポイントを使用してスマートコントラクトをロードできるようになりました。

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

要約すると、`interact.js`の最初の12行は次のようになります。

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

コントラクトがロードされたので、`loadCurrentMessage`関数を実装できます！

#### `interact.js`ファイルに`loadCurrentMessage`を実装する {#implementing-loadCurrentMessage-in-your-interact-js-file}

これは非常にシンプルな関数です。 コントラクトから読み取るために、単純な非同期のweb3呼び出しを作成します。 この関数では、スマートコントラクトに保存されているメッセージを返します。

// interact.jsexport const loadCurrentMessage = async () => {
const message = await helloWorldContract.methods.message().call()
return message
}

```javascript
`interact.js`ファイルの `loadCurrentMessage`を次のように更新してください。
```

このスマートコントラクトをUIに表示したいので、`HelloWorld.js`コンポーネントの `useEffect`関数を次のように更新します。

```javascript
// HelloWorld.js

//called only once
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

注: `loadCurrentMessage`は、コンポーネントの最初のレンダリング時に1回だけ呼び出されるようにします。 この後、`addSmartContractListener`を実装して、スマートコントラクト内のメッセージが変更された後にUIを自動的に更新できるようにします。

リスナーについて詳しく説明する前に、これまでの内容を確認してみましょう！ `HelloWorld.js`ファイルと`interact.js`ファイルを保存し、[http://localhost:3000/](http://localhost:3000/)にアクセスしてください。

現在、「ネットワークに接続されていません」というメッセージが表示されなくなっていることがわかります。 代わりに、スマートコントラクトに保存されているメッセージが反映されます。 カッコイイ！

#### UIにスマートコントラクトに保存されたメッセージが反映されるはずです {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

それでは、リスナーについて説明していきます。

#### `addSmartContractListener`を実装する {#implement-addsmartcontractlistener}

このチュートリアルシリーズの[パート1で作成した`HelloWorld.sol`ファイル](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract)を思い出すと、スマートコントラクトの`update`関数が呼び出された後に`UpdatedMessages`というスマートコントラクトイベントが発行されることを思い出すでしょう（9行目と27行目を参照）。

```javascript
// HelloWorld.sol

// Solidityのバージョンをセマンティックバージョニングで指定します。
// 詳細: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` という名前のコントラクトを定義します。
// コントラクトは関数とデータ (その状態) の集合です。一度デプロイされると、コントラクトはEthereumブロックチェーン上の特定のアドレスに存在します。詳細: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // update関数が呼び出されたときに発行されます
   //スマートコントラクトのイベントは、ブロックチェーン上で何かが起こったことをコントラクトがアプリのフロントエンドに伝える方法です。フロントエンドは特定のイベントを「リッスン」し、それが起こったときに行動を起こすことができます。
   event UpdatedMessages(string oldStr, string newStr);

   // `string` 型の状態変数 `message` を宣言します。
   // 状態変数は、その値がコントラクトのストレージに永続的に保存される変数です。`public` キーワードにより、変数はコントラクトの外部からアクセス可能になり、他のコントラクトやクライアントが値をアクセスするために呼び出せる関数が作成されます。
   string public message;

   // 多くのクラスベースのオブジェクト指向言語と同様に、コンストラクタはコントラクト作成時に一度だけ実行される特別な関数です。
   // コンストラクタはコントラクトのデータを初期化するために使用されます。詳細:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 文字列引数 `initMessage` を受け取り、その値をコントラクトの `message` ストレージ変数に設定します)。
      message = initMessage;
   }

   // 文字列引数を受け取り、 `message` ストレージ変数を更新する公開関数です。
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

スマートコントラクトイベントは、ブロックチェーンで何かが起こったこと \(すなわち、_イベント_の発生\) をフロントエンドアプリケーションに伝える方法です。フロントエンドは特定のイベントを「リスニング」して、それが起きた時にアクションを実行します。

`addSmartContractListener`関数は、具体的にはHello Worldスマートコントラクトの`UpdatedMessages`イベントをリッスンし、新しいメッセージを表示するようにUIを更新します。

`addSmartContractListener`を次のように変更します。

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 メッセージが更新されました！")
    }
  })
}
```

リスナーがイベントを検出したときに何が起こるかを詳しく解説します。

- イベントの発行時にエラーが発生した場合、そのエラーは`status`ステート変数を介してUIに反映されます。
- それ以外の場合は、返された`data`オブジェクトを使います。 `data.returnValues`は、0からインデックス付けされた配列で、配列の最初の要素には前のメッセージが格納され、2番目の要素には更新されたメッセージが格納されます。 つまり、イベントが成功すると、`message`文字列を更新されたメッセージに設定し、`newMessage`文字列をクリアし、`status`ステート変数を更新して、新しいメッセージがスマートコントラクトに公開されたことを反映させます。

最後に、`useEffect`関数でリスナーを呼び出して、`HelloWorld.js`コンポーネントの最初のレンダリング時にリスナーが初期化されるようにしましょう。 全体として、`useEffect`関数は次のようになります。

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

スマートコントラクトから読み取れるようになったので、スマートコントラクトに書き込む方法も理解できると素晴らしいですね！ ただし、dappに書き込むには、まずEthereumウォレットをdappに接続する必要があります。

それでは、次にEthereumウォレット \(MetaMask\) を設定し、それをdappに接続することに取り組みましょう！

### ステップ4: Ethereumウォレットを設定する {#step-4-set-up-your-ethereum-wallet}

Ethereumチェーンに何かを書き込むには、ユーザーは仮想ウォレットの秘密鍵を使ってトランザクションに署名しなければなりません。 このチュートリアルでは、Ethereumアカウントアドレスの管理に使用されるブラウザの仮想ウォレットである[MetaMask](https://metamask.io/)を使用します。これにより、エンドユーザーは、このトランザクションの署名が非常に簡単になります。

イーサリアム上のトランザクションの仕組みについてさらに詳しく知りたい場合は、イーサリアム・ファウンデーションの[こちらのページ](/developers/docs/transactions/)をご覧ください。

#### MetaMaskをダウンロードする {#download-metamask}

MetaMaskアカウントは、[こちら](https://metamask.io/download)から無料でダウンロードして作成できます。 アカウントを作成するとき、またはすでにアカウントをお持ちの場合は、右上の「Goerli Test Network」に必ず切り替えてください \(実在の通貨を扱わないようにするため\)。

#### フォーセットからetherを追加する {#add-ether-from-a-faucet}

Ethereumブロックチェーンでトランザクションに署名するには、偽のEthが必要です。 Ethを取得するには、[FaucETH](https://fauceth.komputing.org)にアクセスしてGoerliアカウントアドレスを入力し、「Request funds」をクリックし、ドロップダウンで「Ethereum Testnet Goerli」を選択し、最後に「Request funds」ボタンを再度クリックします。 MetamaskアカウントにETHが表示されるはずです。

#### 残高を確認する {#check-your-balance}

残高を確認するために、[Alchemyのcomposerツール](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)を使用して[eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)リクエストを行いましょう。 このリクエストをすると、ウォレット内のETHの額が返されます。 MetaMaskアカウントアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されます。

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注:** この結果はethではなくwei単位です。 weiはETHの最小単位として使われています。 weiからETHへ変換すると、1 eth = 10¹⁸ weiになります。 つまり、0xde0b6b3a7640000を10進数に変換すると、1\*10¹⁸となり、1 ETHに相当します。

ふう! これで、偽のお金を手に入れました。 🤑

### ステップ5: MetaMaskをUIに接続する {#step-5-connect-metamask-to-your-UI}

MetaMaskウォレットが設定されたので、分散型アプリケーション(Dapp)を接続しましょう。

#### `connectWallet`関数 {#the-connectWallet-function}

`interact.js`ファイルで`connectWallet`関数を実装します。この関数は、`HelloWorld.js`コンポーネントで呼び出します。

`connectWallet`を次のように変更しましょう。

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 上のテキストフィールドにメッセージを書き込んでください。",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              ブラウザに仮想EthereumウォレットであるMetaMaskをインストールする必要があります。
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

この巨大なコードブロックは、正確には何をするのでしょうか?

まず、ブラウザで`window.ethereum`が有効になっているかどうかをチェックしています。

`window.ethereum`は、MetaMaskやその他のウォレットプロバイダーによって挿入されるグローバルAPIで、WebサイトがユーザーのEthereumアカウントを要求できるようにするものです。 承認されると、ユーザーが接続しているブロックチェーンからデータを読み取ったり、メッセージやトランザクションへの署名をユーザーに提案したりできるようになります。 詳細については[MetaMaskのドキュメント](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)をご覧ください。

`window.ethereum`が_存在しない_場合、それはMetaMaskがインストールされていないことを意味します。 これにより、返される`address`が空の文字列で、`status` JSXオブジェクトがユーザーにMetaMaskをインストールするよう促すJSONオブジェクトが返されます。

さて、`window.ethereum`が_存在する_場合、ここからが面白くなります。

try/catchループを使用して、[`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)を呼び出してMetaMaskへの接続を試みます。 この関数を呼び出すと、ブラウザでMetaMaskが開き、ユーザーはウォレットを分散型アプリケーション(Dapp)に接続するように求められます。

- ユーザーが接続を選んだ場合、`method: "eth_requestAccounts"`は、dappに接続されているすべてのユーザーのアカウントアドレスを含む配列を返します。 まとめると、`connectWallet`関数は、この配列の_最初の_`address`（9行目参照）と、ユーザーにスマートコントラクトへのメッセージを書き込むよう促す`status`メッセージを含むJSONオブジェクトを返します。
- ユーザーが接続を拒否した場合、JSONオブジェクトには返される`address`の空文字列と、ユーザーが接続を拒否したことを示す`status`メッセージが含まれます。

これで、`connectWallet`関数を作成できたので、次のステップでは、この関数を`HelloWorld.js`コンポーネントに呼び出します。

#### `connectWallet`関数を`HelloWorld.js`UIコンポーネントに追加する {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

`HelloWorld.js`にある `connectWalletPressed`関数に移動し、次のように更新します。

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

`interact.js`ファイルによって、機能の大部分が`HelloWorld.js`コンポーネントからどのように抽象化されているかに注目してください。 これは、モデルビューコントローラ(M-V-C)パラダイムに準拠しているためです。

`connectWalletPressed`では、インポートした`connectWallet`関数をawaitで呼び出し、そのレスポンスを使って状態フックを介して`status`と`walletAddress`変数を更新します。

それでは、両方のファイル \(`HelloWorld.js`と`interact.js`\) を保存して、これまでのUIをテストしてみましょう。

[http://localhost:3000/](http://localhost:3000/)ページでブラウザを開き、ページ右上にある「Connect Wallet」ボタンを押します。

MetaMaskがインストールされている場合は、ウォレットを分散型アプリケーション(Dapp)に接続するように求められます。 接続リクエストを承認します。

ウォレットボタンに、接続した自分のアドレスが表示されているはずです！ やった！🔥

次に、ページを再読み込みしてみてください... これは奇妙です。 ウォレットボタンによって、すでに接続しているにもかかわらずMetaMaskに接続するよう求められます。

しかし、恐れることはありません！ これを簡単に修正できます（分かりましたか？） `getCurrentWalletConnected`を実装することで、アドレスがすでにdappに接続されているかどうかを確認し、それに応じてUIを更新できます！

#### `getCurrentWalletConnected`関数 {#the-getcurrentwalletconnected-function}

`interact.js`ファイルの`getCurrentWalletConnected`関数を次のように更新します。

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 上のテキストフィールドにメッセージを書き込んでください。",
        }
      } else {
        return {
          address: "",
          status: "🦊 右上のボタンを使ってMetaMaskに接続してください。",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              ブラウザに仮想EthereumウォレットであるMetaMaskをインストールする必要があります。
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

このコードは、前のステップで作成した`connectWallet`関数に非常に似ています。

主な違いは、ユーザーがウォレットを接続するためにMetaMaskを開く`eth_requestAccounts`メソッドを呼び出す代わりに、ここでは`eth_accounts`メソッドを呼び出している点です。これは、現在dappに接続されているMetaMaskのアドレスを含む配列を単に返すだけです。

この関数を動作させるため、`HelloWorld.js`コンポーネントの`useEffect`関数で呼び出しましょう。

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

`walletAddress`と`status`の状態変数を更新するのに、`getCurrentWalletConnected`の呼び出しのレスポンスを使用していることに注目してください。

このコードを加えたら、ブラウザウィンドウを更新してみてください。

素晴らしい！ リフレッシュ後も、ボタンには接続されていることが示されており、接続されたウォレットのアドレスのプレビューが表示されているはずです。

#### `addWalletListener`を実装する {#implement-addwalletlistener}

分散型アプリケーション(Dapp)ウォレットの設定の最終ステップは、ウォレットリスナーを実装することです。これにより、ユーザーが接続を切断したり、アカウントを切り替えたりした場合など、ウォレットの状態が変更されたときにUIが更新されます。

`HelloWorld.js`ファイルで、`addWalletListener`関数を次のように変更します。

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 上のテキストフィールドにメッセージを書き込んでください。")
      } else {
        setWallet("")
        setStatus("🦊 右上のボタンを使ってMetaMaskに接続してください。")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          ブラウザに仮想EthereumウォレットであるMetaMaskをインストールする必要があります。
        </a>
      </p>
    )
  }
}
```

この時点で何が起こっているかを理解するのに私たちの助けは必要ないと思いますが、念のため、簡単に説明します。

- まず、この関数は`window.ethereum`が有効になっているか（つまり、MetaMaskがインストールされているか）をチェックします。
  - 有効でない場合、`status`状態変数を、ユーザーにMetaMaskのインストールを促すJSX文字列に設定するだけです。
  - 有効になっている場合、3行目のリスナー`window.ethereum.on("accountsChanged")`を設定します。これはMetaMaskウォレットの状態変更をリッスンします。これには、ユーザーがdappに追加のアカウントを接続した場合、アカウントを切り替えた場合、アカウントを切断した場合が含まれます。 少なくとも1つのアカウントが接続されていれば、`walletAddress`状態変数は、リスナーから返された`accounts`配列の最初のアカウントとして更新されます。 それ以外の場合、`walletAddress`には空の文字列が設定されます。

最後に、`useEffect`関数で次のように呼び出す必要があります。

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

完成です！ ウォレットのすべての機能をプログラミングしました。 次は最後のタスクです。スマートコントラクトに保存されているメッセージを更新します。

### ステップ6: `updateMessage`関数を実装する {#step-6-implement-the-updateMessage-function}

さあ、最終段階にたどり着きました。 `interact.js`ファイルの`updateMessage`で、次のことを実行します。

1. スマートコントラクトに公開したいメッセージが有効であることを確認する。
2. MetaMaskを使用してトランザクションに署名する
3. `HelloWorld.js`フロントエンドコンポーネントでこの関数を呼び出す。

これには、それほど時間はかかりません。dappを完成させましょう！

#### 入力エラー処理 {#input-error-handling}

当然ながら、関数の開始時に何らかの入力エラー処理を行うことは理にかなっています。

MetaMaskエクステンションがインストールされていない場合、接続されているウォレットがない場合 \(つまり、渡された `address`が空の文字列の場合\) 、または`message`が空の文字列の場合は、関数が早期にリターンするようにします。 次のエラー処理を`updateMessage`に追加しましょう。

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 ブロックチェーン上のメッセージを更新するには、MetaMaskウォレットを接続してください。",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ メッセージを空の文字列にすることはできません。",
    }
  }
}
```

入力エラーを適切に処理できるようなりました。それでは、MetaMaskを介してトランザクションに署名をします。

#### トランザクションに署名する {#signing-our-transaction}

従来のweb3 Ethereumトランザクションにすでに慣れている場合は、次に記述するコードは非常に馴染みのあるものになるでしょう。 入力エラー処理コードの下に、次の`updateMessage`を加えます。

```javascript
// interact.js

//トランザクションパラメータを設定する
const transactionParameters = {
  to: contractAddress, // コントラクト公開時以外は必須。
  from: address, // ユーザーのアクティブなアドレスと一致する必要がある。
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//トランザクションに署名する
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          Etherscanでトランザクションのステータスを表示してください！
        </a>
        <br />
        ℹ️ トランザクションがネットワークによって検証されると、メッセージは自動的に更新されます。
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

何をしているか、説明していきましょう。 まず、次のようにトランザクションパラメータを設定します。

- `to`は受信者アドレス（スマートコントラクト）を指定します
- `from`はトランザクションの署名者を指定します。これは関数に渡した`address`変数です。
- `data`には、Hello Worldスマートコントラクトの`update`メソッドへの呼び出しが含まれており、`message`文字列変数を入力として受け取っています。

次に、`window.ethereum.request`をawaitで呼び出して、MetaMaskにトランザクションの署名を依頼します。 11行目と12行目で、ethメソッド`eth_sendTransaction`を指定し、`transactionParameters`を渡していることに注目してください。

この時点で、ブラウザでMetaMaskが開かれ、ユーザーにトランザクションの署名または拒否を求めます。

- トランザクションが成功した場合、この関数は、`status` JSX文字列がEtherscanでトランザクションについての詳細を確認するようユーザーに促すJSONオブジェクトを返します。
- トランザクションが失敗した場合、この関数は、エラーメッセージを伝える`status`文字列が入ったJSONオブジェクトを返します。

全体として、`updateMessage`関数は次のようになります。

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //入力エラー処理
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 ブロックチェーン上のメッセージを更新するには、MetaMaskウォレットを接続してください。",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ メッセージを空の文字列にすることはできません。",
    }
  }

  //トランザクションパラメータを設定する
  const transactionParameters = {
    to: contractAddress, // コントラクト公開時以外は必須。
    from: address, // ユーザーのアクティブなアドレスと一致する必要がある。
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //トランザクションに署名する
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            Etherscanでトランザクションのステータスを表示してください！
          </a>
          <br />
          ℹ️ トランザクションがネットワークによって検証されると、メッセージは自動的に更新されます。
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

最後に、`updateMessage`関数を `HelloWorld.js`コンポーネントに接続する必要があります。

#### `updateMessage`を`HelloWorld.js`フロントエンドに接続する {#connect-updatemessage-to-the-helloworld-js-frontend}

`onUpdatePressed`関数では、インポートされた`updateMessage`関数へのawait呼び出しを行い、トランザクションが成功したか失敗したかを反映するように`status`ステート変数を次のように変更する必要があります。

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

とてもクリーンでシンプルです。 そして、なんと... dappの完成です！！！

**Update**ボタンを試してみてください！

### 独自のカスタムdappを作成する {#make-your-own-custom-dapp}

おめでとうございます！チュートリアルの最後までたどり着きました！ おさらいすると、以下の方法を学びました。

- MetaMaskウォレットをdappプロジェクトに接続する
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) APIを使用してスマートコントラクトからデータを読み取る
- MetaMaskを使用してEthereumトランザクションに署名する

これで、このチュートリアルのスキルを応用して独自のカスタムdappプロジェクトを構築するための準備が整いました。 いつものように、ご質問があれば、[Alchemy Discord](https://discord.gg/gWuC7zB)でお気軽にお問い合わせください。 🧙‍♂️

このチュートリアルを完了したら、Twitterで[@alchemyplatform](https://twitter.com/AlchemyPlatform)にタグ付けして、感想やフィードバックをお知らせください！
