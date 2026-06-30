---
title: "初心者のためのHello Worldスマート・コントラクト - フルスタック"
description: "イーサリアム上でシンプルなスマート・コントラクトを記述し、デプロイするための入門チュートリアル。"
author: "nstrike2"
breadcrumb: "Hello World フルスタック"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "スマート・コントラクト",
    "デプロイ",
    "ブロックエクスプローラー",
    "フロントエンド",
    "トランザクション",
    "フレームワーク",
  ]
skill: beginner
lang: ja
published: 2021-10-25
---

ブロックチェーン開発が初めてで、どこから始めればよいか、あるいはスマート・コントラクトをどのようにデプロイして対話すればよいかわからない場合、このガイドはあなたのためのものです。[メタマスク](https://metamask.io)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org)、および[Alchemy](https://alchemy.com/eth)を使用して、ゴエリのテストネットワーク上にシンプルなスマート・コントラクトを作成し、デプロイする手順を説明します。

このチュートリアルを完了するには、Alchemyのアカウントが必要です。[無料アカウントに登録してください](https://www.alchemy.com/)。

途中で質問がある場合は、[Alchemyのディスコード](https://discord.gg/gWuC7zB)でお気軽にお問い合わせください！

## パート1 - Hardhatを使用したスマート・コントラクトの作成とデプロイ {#part-1}

### イーサリアムネットワークへの接続 {#connect-to-the-ethereum-network}

イーサリアムチェーンにリクエストを送信する方法はたくさんあります。ここではシンプルにするため、ブロックチェーン開発者向けプラットフォームおよびAPIであるAlchemyの無料アカウントを使用します。これにより、自分でノードを実行することなくイーサリアムチェーンと通信できるようになります。Alchemyには監視や分析のための開発者ツールも備わっており、このチュートリアルではこれらを活用して、スマート・コントラクトのデプロイの内部で何が起こっているのかを理解します。

### アプリとAPIキーの作成 {#create-your-app-and-api-key}

Alchemyアカウントを作成したら、アプリを作成してAPIキーを生成できます。これにより、ゴエリテストネットへのリクエストが可能になります。テストネットに馴染みがない場合は、[ネットワークの選択に関するAlchemyのガイド](https://www.alchemy.com/docs/choosing-a-web3-network)をお読みください。

Alchemyのダッシュボードで、ナビゲーションバーの**Apps**ドロップダウンを見つけ、**Create App**をクリックします。

![Hello world create app](./hello-world-create-app.png)

アプリに「_Hello World_」という名前を付け、短い説明を書きます。環境（Environment）として**Staging**を、ネットワークとして**Goerli**を選択します。

![create app view hello world](./create-app-view-hello-world.png)

_注: 必ず**Goerli**を選択してください。そうしないと、このチュートリアルは機能しません。_

<strong>Create app</strong>をクリックします。アプリが下の表に表示されます。

### イーサリアムアカウントの作成 {#create-an-ethereum-account}

トランザクションを送受信するには、イーサリアムアカウントが必要です。ここでは、ユーザーがブラウザ上でイーサリアムアカウントのアドレスを管理できる仮想ウォレットであるメタマスクを使用します。

メタマスクのアカウントは[こちら](https://metamask.io/download)から無料でダウンロードして作成できます。アカウントを作成する際、またはすでにアカウントを持っている場合は、右上で「Goerli Test Network」に切り替えてください（実際の資金を扱わないようにするためです）。

### ステップ4: フォーセットからイーサを追加する {#step-4-add-ether-from-a-faucet}

テストネットワークにスマート・コントラクトをデプロイするには、テスト用のETHが必要です。ゴエリネットワークでETHを取得するには、ゴエリのフォーセットにアクセスし、ゴエリアカウントのアドレスを入力します。最近、ゴエリのフォーセットは少し不安定になることがあるため、試せるオプションのリストについては[テストネットワークのページ](/developers/docs/networks/#goerli)を参照してください。

_注: ネットワークの混雑状況により、これには少し時間がかかる場合があります。_
``

### ステップ5: 残高を確認する {#step-5-check-your-balance}

ウォレットにETHがあることを再確認するために、[Alchemyのサンドボックスツール](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)を使用して[eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance)リクエストを送信してみましょう。これにより、ウォレット内のETHの量が返されます。詳細については、[コンポーザーツールの使用方法に関するAlchemyの短いチュートリアル](https://youtu.be/r6sjRxBZJuU)を確認してください。

メタマスクのアカウントアドレスを入力し、**Send Request**をクリックします。以下のコードスニペットのような応答が表示されます。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _注: この結果はETHではなくweiで表示されています。weiはイーサの最小単位として使用されます。_

ふう！テスト用の資金は無事に入っていました。
### ステップ6: プロジェクトを初期化する {#step-6-initialize-our-project}

まず、プロジェクト用のフォルダを作成する必要があります。コマンドラインに移動し、次のように入力します。

```
mkdir hello-world
cd hello-world
```

プロジェクトフォルダ内に移動したので、`npm init`を使用してプロジェクトを初期化します。

> まだnpmをインストールしていない場合は、[Node.jsのインストール手順](https://nodejs.org/en/download/)に従ってNode.jsとnpmをインストールしてください。

このチュートリアルの目的においては、初期化の質問にどのように答えても問題ありません。参考までに、以下のように設定しました。

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

package.jsonを承認すれば、準備完了です！
### ステップ7: Hardhatをダウンロードする {#step-7-download-hardhat}

Hardhatは、イーサリアムソフトウェアをコンパイル、デプロイ、テスト、およびデバッグするための開発環境です。ライブチェーンにデプロイする前に、ローカルでスマート・コントラクトや分散型アプリケーション (dapp) を構築する開発者を支援します。

`hello-world`プロジェクト内で以下を実行します。

```
npm install --save-dev hardhat
```

[インストール手順](https://hardhat.org/getting-started/#overview)の詳細については、こちらのページを確認してください。

### ステップ8: Hardhatプロジェクトを作成する {#step-8-create-hardhat-project}

`hello-world`プロジェクトフォルダ内で、以下を実行します。

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

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

これにより、プロジェクト内に`hardhat.config.js`ファイルが生成されます。このファイルは、チュートリアルの後半でプロジェクトの設定を指定するために使用します。

### ステップ9: プロジェクトフォルダを追加する {#step-9-add-project-folders}

プロジェクトを整理するために、2つの新しいフォルダを作成しましょう。コマンドラインで`hello-world`プロジェクトのルートディレクトリに移動し、次のように入力します。

```
mkdir contracts
mkdir scripts
```

- `contracts/` は、Hello Worldスマート・コントラクトのコードファイルを保存する場所です
- `scripts/` は、コントラクトをデプロイして対話するためのスクリプトを保存する場所です

### ステップ10: コントラクトを記述する {#step-10-write-our-contract}

いつコードを書くのか疑問に思っているかもしれません。いよいよその時です！

お気に入りのエディタでhello-worldプロジェクトを開きます。スマート・コントラクトは一般的にSolidityで記述されるため、ここでもSolidityを使用してスマート・コントラクトを記述します。‌

1. `contracts`フォルダに移動し、`HelloWorld.sol`という新しいファイルを作成します
2. 以下は、このチュートリアルで使用するHello Worldスマート・コントラクトのサンプルです。以下の内容を`HelloWorld.sol`ファイルにコピーします。

_注: コメントを読んで、このコントラクトが何を行うかを理解してください。_

```
// セマンティックバージョニングを使用して、Solidityのバージョンを指定します。
// 詳細: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// `HelloWorld`という名前のコントラクトを定義します。
// コントラクトは、関数とデータ（その状態）の集合体です。デプロイされると、コントラクトはイーサリアムブロックチェーン上の特定のアドレスに配置されます。詳細: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // update関数が呼び出されたときに発行されます
   // スマート・コントラクトのイベントは、ブロックチェーン上で何かが発生したことをアプリのフロントエンドに伝えるための手段です。フロントエンドは特定のイベントを「リッスン」し、それらが発生したときにアクションを実行できます。
   event UpdatedMessages(string oldStr, string newStr);

   // `string`型の状態変数`message`を宣言します。
   // 状態変数は、その値がコントラクトのストレージに永続的に保存される変数です。`public`キーワードを使用すると、コントラクトの外部から変数にアクセスできるようになり、他のコントラクトやクライアントが値にアクセスするために呼び出せる関数が作成されます。
   string public message;

   // 多くのクラスベースのオブジェクト指向言語と同様に、コンストラクタはコントラクトの作成時にのみ実行される特別な関数です。
   // コンストラクタは、コントラクトのデータを初期化するために使用されます。詳細: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 文字列の引数`initMessage`を受け取り、その値をコントラクトの`message`ストレージ変数に設定します。
      message = initMessage;
   }

   // 文字列の引数を受け取り、`message`ストレージ変数を更新するパブリック関数です。
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

これは、作成時にメッセージを保存する基本的なスマート・コントラクトです。`update`関数を呼び出すことで更新できます。

### ステップ11: メタマスクとAlchemyをプロジェクトに接続する {#step-11-connect-metamask-alchemy-to-your-project}

メタマスクウォレット、Alchemyアカウントを作成し、スマート・コントラクトを記述しました。次はこれら3つを接続します。

ウォレットから送信されるすべてのトランザクションには、固有の秘密鍵を使用した署名が必要です。プログラムにこの権限を与えるために、秘密鍵を環境ファイルに安全に保存できます。また、AlchemyのAPIキーもここに保存します。

> トランザクションの送信について詳しくは、Web3を使用したトランザクションの送信に関する[こちらのチュートリアル](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)を確認してください。

まず、プロジェクトディレクトリにdotenvパッケージをインストールします。

```
npm install dotenv --save
```

次に、プロジェクトのルートディレクトリに`.env`ファイルを作成します。そこにメタマスクの秘密鍵とHTTP Alchemy API URLを追加します。

環境ファイルの名前は`.env`である必要があります。そうでない場合、環境ファイルとして認識されません。

`process.env`や`.env-custom`などの他の名前を付けないでください。

- 秘密鍵をエクスポートするには、[こちらの手順](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)に従ってください
- HTTP Alchemy API URLの取得については以下を参照してください

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

`.env`ファイルは次のようになります。

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

これらを実際にコードに接続するために、ステップ13で`hardhat.config.js`ファイル内のこれらの変数を参照します。

### ステップ12: Ethers.jsをインストールする {#step-12-install-ethersjs}

Ethers.jsは、[標準のJSON-RPCメソッド](/developers/docs/apis/json-rpc/)をよりユーザーフレンドリーなメソッドでラップすることで、イーサリアムとの対話やリクエストの送信を容易にするライブラリです。

Hardhatでは、追加のツールや拡張機能のために[プラグイン](https://hardhat.org/plugins/)を統合できます。ここでは、コントラクトのデプロイに[Ethersプラグイン](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers)を活用します。

プロジェクトディレクトリで次のように入力します。

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### ステップ13: hardhat.config.jsを更新する {#step-13-update-hardhat-configjs}

これまでにいくつかの依存関係とプラグインを追加しました。次に、プロジェクトがそれらすべてを認識できるように`hardhat.config.js`を更新する必要があります。

`hardhat.config.js`を次のように更新します。

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

ここまでがすべて正常に機能していることを確認するために、コントラクトをコンパイルしましょう。`compile`タスクは、Hardhatに組み込まれているタスクの1つです。

コマンドラインから以下を実行します。

```bash
npx hardhat compile
```

`SPDX license identifier not provided in source file`に関する警告が表示されるかもしれませんが、心配する必要はありません。他はすべて問題ないはずです！もし問題がある場合は、いつでも[Alchemyのディスコード](https://discord.gg/u72VCg3)でメッセージを送ることができます。

### ステップ15: デプロイスクリプトを記述する {#step-15-write-our-deploy-script}

コントラクトの記述が完了し、設定ファイルの準備も整ったので、コントラクトのデプロイスクリプトを記述します。

`scripts/`フォルダに移動し、`deploy.js`という新しいファイルを作成して、以下の内容を追加します。

```javascript
async function main() {
  const HelloWorld = await ethers.getコントラクトFactory("HelloWorld")

  // デプロイを開始し、コントラクトオブジェクトに解決されるプロミスを返します
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

Hardhatは、[コントラクトのチュートリアル](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)でこれらのコードの各行が何を行うかを非常にわかりやすく説明しています。ここではその説明を採用しています。

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.jsの`ContractFactory`は、新しいスマート・コントラクトをデプロイするために使用される抽象化です。したがって、ここでの`HelloWorld`は、Hello Worldコントラクトのインスタンスの[ファクトリ](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>)です。`hardhat-ethers`プラグインの`ContractFactory`と`Contract`を使用する場合、インスタンスはデフォルトで最初の署名者（所有者）に接続されます。

```javascript
const hello_world = await HelloWorld.deploy()
```

`ContractFactory`で`deploy()`を呼び出すとデプロイが開始され、`Contract`オブジェクトに解決される`Promise`が返されます。これは、スマート・コントラクトの各関数のメソッドを持つオブジェクトです。

### ステップ16: コントラクトをデプロイする {#step-16-deploy-our-contract}

ついにスマート・コントラクトをデプロイする準備が整いました！コマンドラインに移動して以下を実行します。

```bash
npx hardhat run scripts/deploy.js --network goerli
```

すると、次のような出力が表示されるはずです。

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**このアドレスを保存してください**。チュートリアルの後半で使用します。

[ゴエリのEtherscan](https://goerli.etherscan.io)にアクセスしてコントラクトのアドレスを検索すると、正常にデプロイされたことが確認できるはずです。トランザクションは次のようになります。

![](./etherscan-contract.png)

`From`のアドレスはメタマスクのアカウントアドレスと一致し、`To`のアドレスには**Contract Creation**と表示されます。トランザクションをクリックすると、`To`フィールドにコントラクトのアドレスが表示されます。

![](./etherscan-transaction.png)

おめでとうございます！イーサリアムのテストネットにスマート・コントラクトをデプロイしました。

内部で何が起こっているのかを理解するために、[Alchemyダッシュボード](https://dashboard.alchemy.com/explorer)のExplorerタブに移動しましょう。複数のAlchemyアプリがある場合は、アプリでフィルタリングして**Hello World**を選択してください。

![](./hello-world-explorer.png)

ここでは、`.deploy()`関数を呼び出したときに、Hardhat/Ethersが内部で実行したいくつかのJSON-RPCメソッドを確認できます。ここで重要な2つのメソッドは、ゴエリチェーンにコントラクトを書き込むためのリクエストである[`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction)と、ハッシュを指定してトランザクションに関する情報を読み取るためのリクエストである[`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash)です。トランザクションの送信について詳しくは、[Web3を使用したトランザクションの送信に関するチュートリアル](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)を確認してください。

## パート2: スマート・コントラクトとのやり取り {#part-2-interact-with-your-smart-contract}

ゴエリ・ネットワークへのスマート・コントラクトのデプロイに成功したので、次はそれとやり取りする方法を学びましょう。

### interact.jsファイルの作成 {#create-a-interactjs-file}

これは、やり取りのためのスクリプトを記述するファイルです。パート1でインストールしたEthers.jsライブラリを使用します。

`scripts/`フォルダ内に、`interact.js`という名前の新しいファイルを作成し、以下のコードを追加します。

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### .envファイルの更新 {#update-your-env-file}

新しい環境変数を使用するため、[以前に作成した](#step-11-connect-metamask-alchemy-to-your-project)`.env`ファイルでそれらを定義する必要があります。

Alchemyの`API_KEY`と、スマート・コントラクトがデプロイされた`CONTRACT_ADDRESS`の定義を追加する必要があります。

`.env`ファイルは次のようになります。

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### コントラクトABIの取得 {#grab-your-contract-abi}

コントラクトの[ABI (Application Binary Interface)](/glossary/#abi)は、スマート・コントラクトとやり取りするためのインターフェースです。Hardhatは自動的にABIを生成し、`HelloWorld.json`に保存します。ABIを使用するには、`interact.js`ファイルに以下のコード行を追加して、内容を解析する必要があります。

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

ABIを確認したい場合は、コンソールに出力できます。

```javascript
console.log(JSON.stringify(contract.abi))
```

コンソールに出力されたABIを確認するには、ターミナルに移動して以下を実行します。

```bash
npx hardhat run scripts/interact.js
```

### コントラクトのインスタンスの作成 {#create-an-instance-of-your-contract}

コントラクトとやり取りするには、コード内でコントラクトのインスタンスを作成する必要があります。Ethers.jsでこれを行うには、3つの概念を扱う必要があります。

1. プロバイダー (プロバイダー) - ブロックチェーンへの読み書きアクセスを提供するノードプロバイダー
2. 署名者 (サイナー) - トランザクションに署名できるイーサリアムのアカウントを表す
3. コントラクト (Contract) - オンチェーンにデプロイされた特定のコントラクトを表すEthers.jsオブジェクト

前のステップのコントラクトABIを使用して、コントラクトのインスタンスを作成します。

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

プロバイダー、署名者、コントラクトの詳細については、[ethers.jsのドキュメント](https://docs.ethers.io/v5/)を参照してください。

### 初期メッセージの読み取り {#read-the-init-message}

`initMessage = "Hello world!"`を使用してコントラクトをデプロイしたことを覚えていますか？これから、スマート・コントラクトに保存されているそのメッセージを読み取り、コンソールに出力します。

JavaScriptでは、ネットワークとやり取りする際に非同期関数が使用されます。非同期関数の詳細については、[こちらのMedium記事](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)をお読みください。

以下のコードを使用して、スマート・コントラクトの`message`関数を呼び出し、初期メッセージを読み取ります。

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

ターミナルで`npx hardhat run scripts/interact.js`を使用してファイルを実行すると、次の応答が表示されるはずです。

```
メッセージ: Hello world!
```

おめでとうございます！イーサリアムのブロックチェーンからスマート・コントラクトのデータを正常に読み取ることができました。よくやりました！

### メッセージの更新 {#update-the-message}

メッセージを読み取るだけでなく、`update`関数を使用してスマート・コントラクトに保存されているメッセージを更新することもできます！素晴らしいですね。

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

11行目で、返されたトランザクションオブジェクトに対して`.wait()`を呼び出していることに注意してください。これにより、関数を終了する前に、スクリプトがブロックチェーン上でトランザクションがマイニングされるのを待機するようになります。`.wait()`の呼び出しが含まれていない場合、スクリプトはコントラクト内の更新された`message`の値を認識できない可能性があります。

### 新しいメッセージの読み取り {#read-the-new-message}

[前のステップ](#read-the-init-message)を繰り返して、更新された`message`の値を読み取ることができるはずです。少し時間を取って、その新しい値を出力するために必要な変更を加えられるか試してみてください！

ヒントが必要な場合、現時点での`interact.js`ファイルは次のようになります。

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// プロバイダー - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// サイナー - あなた
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// コントラクトインスタンス
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

あとはスクリプトを実行するだけで、古いメッセージ、更新ステータス、そして新しいメッセージがターミナルに出力されるのを確認できるはずです！

`npx hardhat run scripts/interact.js --network goerli`

```
メッセージ: Hello World!
メッセージを更新中...
新しいメッセージ: This is the new message.
```

スクリプトの実行中、新しいメッセージが読み込まれる前に`Updating the message...`のステップで少し時間がかかることに気づくかもしれません。これはマイニングプロセスによるものです。マイニング中のトランザクションの追跡に興味がある場合は、[Alchemyのメンプール](https://dashboard.alchemy.com/mempool)にアクセスしてトランザクションのステータスを確認してください。トランザクションがドロップされた場合は、[Goerli Etherscan](https://goerli.etherscan.io)を確認し、トランザクションハッシュを検索するのも役立ちます。

## パート3: スマート・コントラクトをEtherscanに公開する {#part-3-publish-your-smart-contract-to-etherscan}

スマート・コントラクトを完成させるための大変な作業はすべて終わりました。次はそれを世界と共有する番です！

Etherscanでスマート・コントラクトを検証することで、誰でもソースコードを閲覧し、スマート・コントラクトとやり取りできるようになります。さあ、始めましょう！

### ステップ1: EtherscanアカウントでAPIキーを生成する {#step-1-generate-an-api-key-on-your-etherscan-account}

公開しようとしているスマート・コントラクトの所有者であることを検証するために、EtherscanのAPIキーが必要です。

まだEtherscanアカウントを持っていない場合は、[アカウントを登録してください](https://etherscan.io/register)。

ログインしたら、ナビゲーションバーでユーザー名を見つけ、その上にカーソルを合わせて**My profile**ボタンを選択します。

プロフィールページにサイドナビゲーションバーが表示されます。サイドナビゲーションバーから**API Keys**を選択します。次に、「Add」ボタンを押して新しいAPIキーを作成し、アプリに**hello-world**と名付け、**Create New API Key**ボタンを押します。

新しいAPIキーがAPIキーのテーブルに表示されるはずです。APIキーをクリップボードにコピーします。

次に、EtherscanのAPIキーを`.env`ファイルに追加する必要があります。

追加すると、`.env`ファイルは次のようになります。

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhatでデプロイされたスマート・コントラクト {#hardhat-deployed-smart-contracts}

#### hardhat-etherscanのインストール {#install-hardhat-etherscan}

Hardhatを使用してコントラクトをEtherscanに公開するのは簡単です。始めるには、まず`hardhat-etherscan`プラグインをインストールする必要があります。`hardhat-etherscan`は、Etherscan上でスマート・コントラクトのソースコードとABIを自動的に検証します。これを追加するには、`hello-world`ディレクトリで以下を実行します。

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

インストールが完了したら、`hardhat.config.js`の先頭に以下の文を含め、Etherscanの設定オプションを追加します。

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
    // EtherscanのAPI鍵
    // https://etherscan.io/ で取得してください
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscanでスマート・コントラクトを検証する {#verify-your-smart-contract-on-etherscan}

すべてのファイルが保存され、すべての`.env`変数が正しく設定されていることを確認します。

コントラクトのアドレスとデプロイ先のネットワークを渡して、`verify`タスクを実行します。

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

`DEPLOYED_CONTRACT_ADDRESS`が、ゴエリのテストネットにデプロイされたスマート・コントラクトのアドレスであることを確認してください。また、最後の引数（`'Hello World!'`）は、[パート1のデプロイ手順](#step-15-write-our-deploy-script)で使用したのと同じ文字列値である必要があります。

すべてがうまくいけば、ターミナルに次のメッセージが表示されます。

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

おめでとうございます！あなたのスマート・コントラクトのコードがEtherscanに公開されました！

### Etherscanでスマート・コントラクトを確認しましょう！ {#check-out-your-smart-contract-on-etherscan}

ターミナルに表示されたリンクにアクセスすると、Etherscanに公開されたスマート・コントラクトのコードとABIを確認できるはずです！

**やったね、大成功です！これで誰でもあなたのスマート・コントラクトを呼び出したり、書き込んだりできるようになりました！次にあなたが何を構築するのか、楽しみにしています！**

## パート4 - スマート・コントラクトとフロントエンドの統合 {#part-4-integrating-your-smart-contract-with-the-frontend}

このチュートリアルを終えると、以下のことができるようになります。

- メタマスクウォレットを分散型アプリケーション (dapp) に接続する
- [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) APIを使用してスマート・コントラクトからデータを読み取る
- メタマスクを使用してイーサリアムのトランザクションに署名する

このdappでは、フロントエンドフレームワークとして[React](https://react.dev/)を使用します。ただし、主にプロジェクトにWeb3機能をもたらすことに焦点を当てるため、Reactの基礎を解説することに多くの時間を費やさない点に注意してください。

前提条件として、Reactの初心者レベルの理解が必要です。そうでない場合は、公式の[React入門チュートリアル](https://react.dev/learn)を完了することをお勧めします。

### スターターファイルのクローン {#clone-the-starter-files}

まず、[hello-world-part-fourのGitHubリポジトリ](https://github.com/alchemyplatform/hello-world-part-four-tutorial)にアクセスしてこのプロジェクトのスターターファイルを取得し、このリポジトリをローカルマシンにクローンします。

クローンしたリポジトリをローカルで開きます。`starter-files`と`completed`の2つのフォルダーが含まれていることに注意してください。

- `starter-files` - **このディレクトリで作業します**。UIをイーサリアムウォレットと、[パート3](#part-3-publish-your-smart-contract-to-etherscan)でEtherscanに公開したスマート・コントラクトに接続します。
- `completed`には完成したチュートリアル全体が含まれており、行き詰まった場合の参考としてのみ使用してください。

次に、お気に入りのコードエディターで`starter-files`のコピーを開き、`src`フォルダーに移動します。

記述するコードはすべて`src`フォルダー内に配置されます。`HelloWorld.js`コンポーネントと`util/interact.js` JavaScriptファイルを編集して、プロジェクトにWeb3機能を追加します。

### スターターファイルの確認 {#check-out-the-starter-files}

コーディングを始める前に、スターターファイルで提供されているものを確認しましょう。

#### Reactプロジェクトの実行 {#get-your-react-project-running}

まずはブラウザでReactプロジェクトを実行してみましょう。Reactの素晴らしい点は、プロジェクトをブラウザで実行すると、保存した変更がブラウザ上でリアルタイムに更新されることです。

プロジェクトを実行するには、`starter-files`フォルダーのルートディレクトリに移動し、ターミナルで`npm install`を実行してプロジェクトの依存関係をインストールします。

```bash
cd starter-files
npm install
```

インストールが完了したら、ターミナルで`npm start`を実行します。

```bash
npm start
```

これにより、ブラウザで[http://localhost:3000/](http://localhost:3000/)が開き、プロジェクトのフロントエンドが表示されるはずです。1つのフィールド（スマート・コントラクトに保存されているメッセージを更新する場所）、「Connect Wallet（ウォレットを接続）」ボタン、「Update（更新）」ボタンで構成されているはずです。

どちらかのボタンをクリックしてみると、機能しないことに気づくでしょう。これは、まだその機能をプログラミングする必要があるためです。

#### `HelloWorld.js`コンポーネント {#the-helloworld-js-component}

エディターで`src`フォルダーに戻り、`HelloWorld.js`ファイルを開きましょう。これは私たちが作業する主要なReactコンポーネントであるため、このファイル内のすべてを理解することが非常に重要です。

このファイルの上部には、Reactライブラリ、useEffectおよびuseStateフック、`./util/interact.js`からのいくつかのアイテム（これらについては後で詳しく説明します！）、Alchemyのロゴなど、プロジェクトを実行するために必要なインポート文がいくつかあることに気づくでしょう。

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

次に、特定のイベントの後に更新する状態変数があります。

```javascript
// HelloWorld.js

//状態変数
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

各変数が表すものは以下の通りです。

- `walletAddress` - ユーザーのウォレットアドレスを保存する文字列
- `status` - ユーザーにdappとの対話方法を案内する役立つメッセージを保存する文字列
- `message` - スマート・コントラクト内の現在のメッセージを保存する文字列
- `newMessage` - スマート・コントラクトに書き込まれる新しいメッセージを保存する文字列

状態変数の後には、未実装の5つの関数（`useEffect`、`addSmartContractListener`、`addWalletListener`、`connectWalletPressed`、`onUpdatePressed`）があります。それぞれの機能について以下で説明します。

```javascript
// HelloWorld.js

//一度だけ呼び出されます
useEffect(async () => {
  //TODO: 実装する
}, [])

function addSmartContractListener() {
  //TODO: 実装する
}

function addWalletListener() {
  //TODO: 実装する
}

const connectWalletPressed = async () => {
  //TODO: 実装する
}

const onUpdatePressed = async () => {
  //TODO: 実装する
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - これはコンポーネントがレンダリングされた後に呼び出されるReactフックです。空の配列`[]`プロパティが渡されているため（4行目を参照）、コンポーネントの_最初_のレンダリング時にのみ呼び出されます。ここでは、スマート・コントラクトに保存されている現在のメッセージを読み込み、スマート・コントラクトとウォレットのリスナーを呼び出し、ウォレットがすでに接続されているかどうかを反映するようにUIを更新します。
- `addSmartContractListener` - この関数は、HelloWorldコントラクトの`UpdatedMessages`イベントを監視し、スマート・コントラクト内のメッセージが変更されたときにUIを更新するリスナーを設定します。
- `addWalletListener` - この関数は、ユーザーがウォレットを切断したりアドレスを切り替えたりするなど、ユーザーのメタマスクウォレットの状態の変化を検出するリスナーを設定します。
- `connectWalletPressed` - この関数は、ユーザーのメタマスクウォレットをdappに接続するために呼び出されます。
- `onUpdatePressed` - この関数は、ユーザーがスマート・コントラクトに保存されているメッセージを更新したいときに呼び出されます。

このファイルの終わり近くに、コンポーネントのUIがあります。

```javascript
// HelloWorld.js

//コンポーネントのUI
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

このコードを注意深く見ると、UIでさまざまな状態変数をどこで使用しているかがわかります。

- 6〜12行目では、ユーザーのウォレットが接続されている場合（つまり、`walletAddress.length > 0`）、IDが「walletButton」のボタンにユーザーの`walletAddress`の短縮版を表示します。そうでない場合は、単に「Connect Wallet」と表示します。
- 17行目では、スマート・コントラクトに保存されている現在のメッセージを表示します。これは`message`文字列にキャプチャされています。
- 23〜26行目では、[制御されたコンポーネント](https://legacy.reactjs.org/docs/forms.html#controlled-components)を使用して、テキストフィールドの入力が変更されたときに`newMessage`状態変数を更新します。

状態変数に加えて、IDが`publishButton`と`walletButton`のボタンがそれぞれクリックされたときに、`connectWalletPressed`と`onUpdatePressed`関数が呼び出されることもわかります。

最後に、この`HelloWorld.js`コンポーネントがどこに追加されるかを確認しましょう。

他のすべてのコンポーネントのコンテナとして機能するReactのメインコンポーネントである`App.js`ファイルを見ると、7行目に`HelloWorld.js`コンポーネントが注入されていることがわかります。

最後になりましたが、提供されているもう1つのファイルである`interact.js`ファイルを確認しましょう。

#### `interact.js`ファイル {#the-interact-js-file}

[M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)パラダイムに従うため、dappのロジック、データ、ルールを管理するすべての関数を含む別のファイルを用意し、それらの関数をフロントエンド（`HelloWorld.js`コンポーネント）にエクスポートできるようにします。

👆🏽これこそが`interact.js`ファイルの目的です！

`src`ディレクトリ内の`util`フォルダーに移動すると、スマート・コントラクトとの対話やウォレットの関数と変数をすべて含む`interact.js`というファイルが含まれていることに気づくでしょう。

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

ファイルの上部で、`helloWorldContract`オブジェクトがコメントアウトされていることに気づくでしょう。このチュートリアルの後半で、このオブジェクトのコメントを解除し、この変数にスマート・コントラクトをインスタンス化して、`HelloWorld.js`コンポーネントにエクスポートします。

`helloWorldContract`オブジェクトの後の4つの未実装の関数は、以下のことを行います。

- `loadCurrentMessage` - この関数は、スマート・コントラクトに保存されている現在のメッセージを読み込むロジックを処理します。[Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3)を使用して、Hello Worldスマート・コントラクトへの_読み取り_呼び出しを行います。
- `connectWallet` - この関数は、ユーザーのメタマスクをdappに接続します。
- `getCurrentWalletConnected` - この関数は、ページ読み込み時にイーサリアムアカウントがすでにdappに接続されているかどうかを確認し、それに応じてUIを更新します。
- `updateMessage` - この関数は、スマート・コントラクトに保存されているメッセージを更新します。Hello Worldスマート・コントラクトへの_書き込み_呼び出しを行うため、ユーザーのメタマスクウォレットはメッセージを更新するためにイーサリアムのトランザクションに署名する必要があります。

作業内容が理解できたところで、スマート・コントラクトから読み取る方法を見ていきましょう！

### ステップ3: スマート・コントラクトからの読み取り {#step-3-read-from-your-smart-contract}

スマート・コントラクトから読み取るには、以下を正常に設定する必要があります。

- イーサリアムチェーンへのAPI接続
- 読み込まれたスマート・コントラクトのインスタンス
- スマート・コントラクトの関数を呼び出すための関数
- スマート・コントラクトから読み取っているデータが変更されたときに更新を監視するリスナー

手順が多いように聞こえるかもしれませんが、心配しないでください！それぞれの手順を段階的に説明します！ :\)

#### イーサリアムチェーンへのAPI接続の確立 {#establish-an-api-connection-to-the-ethereum-chain}

このチュートリアルのパート2で、スマート・コントラクトから読み取るためにAlchemy Web3キーを使用したことを覚えていますか？チェーンから読み取るために、分散型アプリケーション (dapp) にもAlchemy Web3キーが必要になります。

まだインストールしていない場合は、まず`starter-files`のルートディレクトリに移動し、ターミナルで以下を実行して[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)をインストールします。

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)は[Web3.js](https://docs.web3js.org/)のラッパーであり、拡張されたAPIメソッドやその他の重要な利点を提供することで、Web3開発者としての作業を容易にします。最小限の設定で済むように設計されているため、アプリですぐに使い始めることができます！

次に、プロジェクトディレクトリに[dotenv](https://www.npmjs.com/package/dotenv)パッケージをインストールして、取得したAPIキーを安全に保存する場所を確保します。

```text
npm install dotenv --save
```

このdappでは、HTTP APIキーの代わりに**Websockets APIキーを使用します**。これにより、スマート・コントラクトに保存されているメッセージが変更されたときに検出するリスナーを設定できるようになります。

APIキーを取得したら、ルートディレクトリに`.env`ファイルを作成し、そこにAlchemy WebsocketsのURLを追加します。その後、`.env`ファイルは次のようになります。

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

これで、dappにAlchemy Web3エンドポイントを設定する準備が整いました！`util`フォルダ内にある`interact.js`に戻り、ファイルの先頭に以下のコードを追加しましょう。

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

上記では、まず`.env`ファイルからAlchemyキーをインポートし、次に`alchemyKey`を`createAlchemyWeb3`に渡してAlchemy Web3エンドポイントを確立しました。

このエンドポイントの準備ができたら、いよいよスマート・コントラクトを読み込みます！
#### Hello Worldスマート・コントラクトの読み込み {#loading-your-hello-world-smart-contract}

Hello Worldスマート・コントラクトを読み込むには、そのコントラクトアドレスとABIが必要です。これらは両方とも、[このチュートリアルのパート3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)を完了していればEtherscanで見つけることができます。

#### EtherscanからコントラクトABIを取得する方法 {#how-to-get-your-contract-abi-from-etherscan}

このチュートリアルのパート3をスキップした場合は、アドレス[0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code)のHelloWorldコントラクトを使用できます。そのABIは[こちら](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code)にあります。

コントラクトABIは、コントラクトがどの関数を呼び出すかを指定し、関数が期待する形式でデータを返すことを保証するために必要です。コントラクトABIをコピーしたら、`src`ディレクトリに`contract-abi.json`というJSONファイルとして保存しましょう。

contract-abi.jsonはsrcフォルダーに保存する必要があります。

コントラクトアドレス、ABI、およびAlchemy Web3エンドポイントが揃ったので、[contractメソッド](https://docs.web3js.org/api/web3-eth-contract/class/Contract)を使用してスマート・コントラクトのインスタンスを読み込むことができます。コントラクトABIを`interact.js`ファイルにインポートし、コントラクトアドレスを追加します。

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

これでようやく`helloWorldContract`変数のコメントを解除し、AlchemyWeb3エンドポイントを使用してスマート・コントラクトを読み込むことができます。

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

まとめると、`interact.js`の最初の12行は次のようになります。

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

コントラクトが読み込まれたので、`loadCurrentMessage`関数を実装できます！

#### `interact.js`ファイルでの`loadCurrentMessage`の実装 {#implementing-loadcurrentmessage-in-your-interact-js-file}

この関数は非常にシンプルです。コントラクトから読み取るために、シンプルな非同期Web3呼び出しを行います。この関数は、スマート・コントラクトに保存されているメッセージを返します。

`interact.js`ファイルの`loadCurrentMessage`を次のように更新します。

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

このスマート・コントラクトをUIに表示したいため、`HelloWorld.js`コンポーネントの`useEffect`関数を次のように更新しましょう。

```javascript
// HelloWorld.js

//一度だけ呼び出されます
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

なお、`loadCurrentMessage`はコンポーネントの最初のレンダリング時に1回だけ呼び出されるようにします。スマート・コントラクト内のメッセージが変更された後にUIを自動的に更新する`addSmartContractListener`をすぐに実装します。

リスナーに入る前に、これまでの内容を確認しましょう！`HelloWorld.js`と`interact.js`ファイルを保存し、[http://localhost:3000/](http://localhost:3000/)にアクセスします。

現在のメッセージが「No connection to the network.（ネットワークに接続されていません）」ではなくなっていることに気づくでしょう。代わりに、スマート・コントラクトに保存されているメッセージが反映されています。素晴らしいですね！

#### UIにスマート・コントラクトに保存されているメッセージが反映されるはずです {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

さて、そのリスナーについてですが...

#### `addSmartContractListener`の実装 {#implement-addsmartcontractlistener}

[このチュートリアルシリーズのパート1](#step-10-write-our-contract)で記述した`HelloWorld.sol`ファイルを思い出すと、スマート・コントラクトの`update`関数が呼び出された後に発行される`UpdatedMessages`というスマート・コントラクトイベントがあることを思い出すでしょう（9行目と27行目を参照）。

```javascript
// HelloWorld.sol

// セマンティックバージョニングを使用して、Solidityのバージョンを指定します。
// 詳細: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld`という名前のコントラクトを定義します。
// コントラクトは関数とデータ（その状態）の集合です。デプロイされると、コントラクトはイーサリアムブロックチェーン上の特定のアドレスに配置されます。詳細: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //update関数が呼び出されたときに発行されます
   //スマート・コントラクトのイベントは、ブロックチェーン上で何かが発生したことをアプリのフロントエンドに伝えるための方法です。フロントエンドは特定のイベントを「リッスン」し、それらが発生したときにアクションを起こすことができます。
   event UpdatedMessages(string oldStr, string newStr);

   // `string`型の状態変数 `message` を宣言します。
   // 状態変数は、その値がコントラクトのストレージに永続的に保存される変数です。`public`キーワードを使用すると、コントラクトの外部から変数にアクセスできるようになり、他のコントラクトやクライアントが値にアクセスするために呼び出すことができる関数が作成されます。
   string public message;

   // 多くのクラスベースのオブジェクト指向言語と同様に、コンストラクターはコントラクトの作成時にのみ実行される特別な関数です。
   // コンストラクターはコントラクトのデータを初期化するために使用されます。詳細: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // 文字列の引数 `initMessage` を受け取り、その値をコントラクトの `message` ストレージ変数に設定します）。
      message = initMessage;
   }

   // 文字列の引数を受け取り、`message` ストレージ変数を更新するpublic関数です。
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

スマート・コントラクトイベントは、ブロックチェーン上で何かが起こった（つまり、_イベント_があった）ことをフロントエンドアプリケーションに伝えるためのコントラクトの方法です。フロントエンドアプリケーションは特定のイベントを「リッスン」し、それらが発生したときにアクションを起こすことができます。

`addSmartContractListener`関数は、Hello Worldスマート・コントラクトの`UpdatedMessages`イベントを特別にリッスンし、新しいメッセージを表示するようにUIを更新します。

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
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

リスナーがイベントを検出したときに何が起こるかを分解してみましょう。

- イベントの発行時にエラーが発生した場合、`status`状態変数を介してUIに反映されます。
- それ以外の場合は、返された`data`オブジェクトを使用します。`data.returnValues`はゼロからインデックス付けされた配列で、配列の最初の要素には前のメッセージが保存され、2番目の要素には更新されたメッセージが保存されます。全体として、イベントが成功すると、`message`文字列を更新されたメッセージに設定し、`newMessage`文字列をクリアして、新しいメッセージがスマート・コントラクトに公開されたことを反映するように`status`状態変数を更新します。

最後に、`HelloWorld.js`コンポーネントの最初のレンダリング時に初期化されるように、`useEffect`関数でリスナーを呼び出しましょう。全体として、`useEffect`関数は次のようになります。

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

スマート・コントラクトから読み取ることができるようになったので、書き込む方法もわかると素晴らしいですね！ただし、dappに書き込むには、まずイーサリアムウォレットを接続する必要があります。

そこで、次はイーサリアムウォレット（メタマスク）を設定し、それをdappに接続することに取り組みます！

### ステップ4: イーサリアムウォレットの設定 {#step-4-set-up-your-ethereum-wallet}

イーサリアムチェーンに何かを書き込むには、ユーザーは仮想ウォレットの秘密鍵を使用してトランザクションに署名する必要があります。このチュートリアルでは、イーサリアムアカウントアドレスを管理するために使用されるブラウザ内の仮想ウォレットである[メタマスク](https://metamask.io/)を使用します。これにより、エンドユーザーにとってこのトランザクションの署名が非常に簡単になります。

イーサリアムでのトランザクションの仕組みについてさらに詳しく知りたい場合は、イーサリアム財団の[こちらのページ](/developers/docs/transactions/)を確認してください。

#### メタマスクのダウンロード {#download-metamask}

[こちら](https://metamask.io/download)から無料でメタマスクをダウンロードしてアカウントを作成できます。アカウントを作成する際、またはすでにアカウントを持っている場合は、右上の「Goerli Test Network」に切り替えてください（実際のお金を扱わないようにするためです）。

#### フォーセットからイーサを追加する {#add-ether-from-a-faucet}

イーサリアムブロックチェーンでトランザクションに署名するには、偽のETHが必要です。ETHを取得するには、[FaucETH](https://fauceth.komputing.org)にアクセスしてゴエリアカウントアドレスを入力し、「Request funds」をクリックして、ドロップダウンで「Ethereum Testnet Goerli」を選択し、最後に「Request funds」ボタンをもう一度クリックします。すぐにメタマスクアカウントにETHが表示されるはずです！

#### 残高の確認 {#check-your-balance}

残高があることを再確認するために、[Alchemyのサンドボックスツール](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest)を使用して[eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance)リクエストを行ってみましょう。これにより、ウォレット内のETHの量が返されます。メタマスクのアカウントアドレスを入力して「Send Request」をクリックすると、次のような応答が表示されるはずです。

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注:** この結果はETHではなくweiで表示されています。weiはイーサの最小単位として使用されます。weiからETHへの変換は、1 ETH = 10¹⁸ weiです。したがって、0xde0b6b3a7640000を10進数に変換すると1\*10¹⁸となり、1 ETHに等しくなります。

ふう！偽のお金がすべて揃っていますね！ 🤑
### ステップ5: メタマスクをUIに接続する {#step-5-connect-metamask-to-your-ui}

メタマスクウォレットの設定が完了したので、dappを接続しましょう！

#### `connectWallet`関数 {#the-connectwallet-function}

`interact.js`ファイルで、`connectWallet`関数を実装しましょう。これを`HelloWorld.js`コンポーネントで呼び出すことができます。

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
        status: "👆🏽 Write a message in the text-field above.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

では、この巨大なコードブロックは正確に何をするのでしょうか？

まず、ブラウザで`window.ethereum`が有効になっているかどうかを確認します。

`window.ethereum`は、メタマスクやその他のウォレットプロバイダーによって注入されるグローバルAPIであり、Webサイトがユーザーのイーサリアムアカウントを要求できるようにします。承認されると、ユーザーが接続しているブロックチェーンからデータを読み取り、ユーザーにメッセージやトランザクションへの署名を提案できます。詳細については、[メタマスクのドキュメント](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)を確認してください！

`window.ethereum`が存在_しない_場合、それはメタマスクがインストールされていないことを意味します。これによりJSONオブジェクトが返され、返される`address`は空の文字列になり、`status` JSXオブジェクトはユーザーがメタマスクをインストールする必要があることを伝えます。

一方、`window.ethereum`が存在_する_場合、ここからが面白くなります。

try/catchループを使用して、[`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)を呼び出すことでメタマスクへの接続を試みます。この関数を呼び出すとブラウザでメタマスクが開き、ユーザーはウォレットをdappに接続するように求められます。

- ユーザーが接続を選択した場合、`method: "eth_requestAccounts"`はdappに接続されたユーザーのすべてのアカウントアドレスを含む配列を返します。全体として、`connectWallet`関数は、この配列の_最初_の`address`（9行目を参照）と、ユーザーにスマート・コントラクトへのメッセージの書き込みを促す`status`メッセージを含むJSONオブジェクトを返します。
- ユーザーが接続を拒否した場合、JSONオブジェクトには返される`address`の空の文字列と、ユーザーが接続を拒否したことを反映する`status`メッセージが含まれます。

この`connectWallet`関数を記述したので、次のステップはそれを`HelloWorld.js`コンポーネントで呼び出すことです。

#### `HelloWorld.js` UIコンポーネントへの`connectWallet`関数の追加 {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

`HelloWorld.js`の`connectWalletPressed`関数に移動し、次のように更新します。

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

機能の大部分が`interact.js`ファイルから`HelloWorld.js`コンポーネントへと抽象化されていることに気づきましたか？これはM-V-Cパラダイムに準拠するためです！

`connectWalletPressed`では、インポートされた`connectWallet`関数へのawait呼び出しを単に行い、その応答を使用して、状態フックを介して`status`および`walletAddress`変数を更新します。

それでは、両方のファイル（`HelloWorld.js`と`interact.js`）を保存し、これまでのUIをテストしてみましょう。

ブラウザで[http://localhost:3000/](http://localhost:3000/)ページを開き、右上の「Connect Wallet」ボタンを押します。

メタマスクがインストールされている場合は、ウォレットをdappに接続するように求められるはずです。接続の招待を承認します。

ウォレットボタンにアドレスが接続されていることが反映されるはずです！やったー 🔥

次に、ページを更新してみてください...これは奇妙です。すでに接続されているにもかかわらず、ウォレットボタンがメタマスクの接続を求めています...

しかし、恐れることはありません！`getCurrentWalletConnected`を実装することで、アドレスがすでにdappに接続されているかどうかを確認し、それに応じてUIを更新することで、この問題には簡単に対処できます！

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
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

このコードは、前のステップで記述した`connectWallet`関数と_非常_によく似ています。

主な違いは、ユーザーがウォレットを接続するためにメタマスクを開く`eth_requestAccounts`メソッドを呼び出す代わりに、ここでは現在dappに接続されているメタマスクアドレスを含む配列を単に返す`eth_accounts`メソッドを呼び出すことです。

この関数の動作を確認するために、`HelloWorld.js`コンポーネントの`useEffect`関数で呼び出してみましょう。

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

`getCurrentWalletConnected`への呼び出しの応答を使用して、`walletAddress`および`status`状態変数を更新していることに注意してください。

このコードを追加したので、ブラウザウィンドウを更新してみましょう。

素晴らしい！ボタンには接続されていることが表示され、更新した後でも接続されているウォレットのアドレスのプレビューが表示されるはずです！

#### `addWalletListener`の実装 {#implement-addwalletlistener}

dappウォレット設定の最後のステップは、ユーザーが切断したりアカウントを切り替えたりするなど、ウォレットの状態が変化したときにUIが更新されるようにウォレットリスナーを実装することです。

`HelloWorld.js`ファイルで、`addWalletListener`関数を次のように変更します。

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

現時点では、ここで何が起こっているかを理解するのに私たちの助けは必要ないと思いますが、念のため、簡単に分解してみましょう。

- まず、関数は`window.ethereum`が有効になっているか（つまり、メタマスクがインストールされているか）を確認します。
  - 有効になっていない場合は、`status`状態変数を、ユーザーにメタマスクのインストールを促すJSX文字列に設定するだけです。
  - 有効になっている場合は、3行目でメタマスクウォレットの状態の変化をリッスンするリスナー`window.ethereum.on("accountsChanged")`を設定します。これには、ユーザーが追加のアカウントをdappに接続したとき、アカウントを切り替えたとき、またはアカウントを切断したときが含まれます。少なくとも1つのアカウントが接続されている場合、`walletAddress`状態変数は、リスナーによって返される`accounts`配列の最初のアカウントとして更新されます。それ以外の場合、`walletAddress`は空の文字列として設定されます。

最後になりましたが、これを`useEffect`関数で呼び出す必要があります。

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

これで完了です！すべてのウォレット機能のプログラミングが正常に完了しました！それでは最後のタスク、スマート・コントラクトに保存されているメッセージの更新に進みましょう！

### ステップ6: `updateMessage`関数の実装 {#step-6-implement-the-updatemessage-function}

さあ皆さん、いよいよ大詰めです！`interact.js`ファイルの`updateMessage`で、以下のことを行います。

1. スマート・コントラクトに公開したいメッセージが有効であることを確認する
2. メタマスクを使用してトランザクションに署名する
3. `HelloWorld.js`フロントエンドコンポーネントからこの関数を呼び出す

それほど時間はかかりません。このdappを完成させましょう！

#### 入力エラー処理 {#input-error-handling}

当然のことながら、関数の開始時に何らかの入力エラー処理を行うことは理にかなっています。

メタマスク拡張機能がインストールされていない場合、ウォレットが接続されていない場合（つまり、渡された`address`が空の文字列である場合）、または`message`が空の文字列である場合は、関数が早期に返されるようにします。`updateMessage`に次のエラー処理を追加しましょう。

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

適切な入力エラー処理が追加されたので、メタマスクを介してトランザクションに署名する時間です！

#### トランザクションへの署名 {#signing-our-transaction}

従来のWeb3イーサリアムトランザクションにすでに慣れている場合、次に記述するコードは非常に馴染みのあるものになります。入力エラー処理コードの下に、`updateMessage`に次を追加します。

```javascript
// interact.js

//トランザクションのパラメーターを設定する
const transactionParameters = {
  to: contractAddress, // コントラクトの公開時を除き必須です。
  from: address, // ユーザーのアクティブなアドレスと一致する必要があります。
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
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

何が起こっているかを分解してみましょう。まず、トランザクションパラメーターを設定します。ここで、

- `to`は受信者アドレス（スマート・コントラクト）を指定します
- `from`はトランザクションの署名者、つまり関数に渡した`address`変数を指定します
- `data`には、Hello Worldスマート・コントラクトの`update`メソッドへの呼び出しが含まれており、入力として`message`文字列変数を受け取ります

次に、await呼び出し`window.ethereum.request`を行い、メタマスクにトランザクションへの署名を要求します。11行目と12行目で、ETHメソッド`eth_sendTransaction`を指定し、`transactionParameters`を渡していることに注意してください。

この時点で、ブラウザでメタマスクが開き、ユーザーにトランザクションへの署名または拒否を求めます。

- トランザクションが成功した場合、関数はJSONオブジェクトを返します。ここで、`status` JSX文字列は、トランザクションの詳細についてEtherscanを確認するようにユーザーに促します。
- トランザクションが失敗した場合、関数はJSONオブジェクトを返します。ここで、`status`文字列はエラーメッセージを伝えます。

全体として、`updateMessage`関数は次のようになります。

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //入力エラーの処理
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //トランザクションのパラメーターを設定する
  const transactionParameters = {
    to: contractAddress, // コントラクトの公開時を除き必須です。
    from: address, // ユーザーのアクティブなアドレスと一致する必要があります。
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
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
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

最後になりましたが、`updateMessage`関数を`HelloWorld.js`コンポーネントに接続する必要があります。

#### `updateMessage`を`HelloWorld.js`フロントエンドに接続する {#connect-updatemessage-to-the-helloworld-js-frontend}

`onUpdatePressed`関数は、インポートされた`updateMessage`関数へのawait呼び出しを行い、トランザクションが成功したか失敗したかを反映するように`status`状態変数を変更する必要があります。

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

非常にクリーンでシンプルです。そしてなんと...あなたのdappが完成しました！！！

さあ、**Update**ボタンをテストしてみてください！

### 独自のカスタムdappの作成 {#make-your-own-custom-dapp}

おめでとうございます、チュートリアルの最後までやり遂げました！まとめると、以下の方法を学びました。

- メタマスクウォレットをdappプロジェクトに接続する
- [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) APIを使用してスマート・コントラクトからデータを読み取る
- メタマスクを使用してイーサリアムのトランザクションに署名する

これで、このチュートリアルで得たスキルを応用して、独自のカスタムdappプロジェクトを構築する準備が完全に整いました！いつものように、質問がある場合は、遠慮なく[Alchemyのディスコード](https://discord.gg/gWuC7zB)で助けを求めてください。 🧙‍♂️

このチュートリアルを完了したら、ツイッターで[@alchemyplatform](https://twitter.com/AlchemyPlatform)をタグ付けして、体験談やフィードバックをお知らせください！
