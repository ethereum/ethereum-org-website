---
title: 初心者向けのHello Worldスマートコントラクト - フルスタック
description: イーサリアムでの簡単なスマートコントラクトの作成とデプロイに関する入門チュートリアル
author: "nstrike2"
tags:
  - "Solidity"
  - "Hardhat"
  - "Alchemy"
  - "スマートコントラクト"
  - "デプロイ"
  - "ブロックエクスプローラ"
  - "フロントエンド"
  - "トランザクション"
skill: beginner
lang: ja
published: 2021-10-25
---

このガイドはブロックチェーンの開発の初心者で、どこから始めたらよいか分からなかったり、スマートコントラクトのデプロイやインタラクト方法について分からない方向けのものです。 これから一緒に、Goerliテストネットワーク上で簡単なスマートコントラクトを作成してデプロイする方法を順を追ってたどりましょう。その際、[MetaMask](https://metamask.io)、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org)と[Alchemy](https://alchemyapi.io/eth)を使用します。

このチュートリアルを完了するためにはAlchemyのアカウントが必要です。 [無料でアカウント登録する](https://www.alchemy.com/).

質問がある場合は、いつでもお気軽に[Alchemy Discord](https://discord.gg/gWuC7zB)でお問い合わせください。

## パート1: Hardhatを利用してスマートコントラクトを作りデプロイする {#part-1}

### イーサリアムネットワークに接続する {#connect-to-the-ethereum-network}

イーサリアムチェーンにリクエストを行う方法はたくさんあります。 簡略化のため、ここではAlchemyの無料アカウントを使用します。このブロックチェーンのデベロッパープラットフォームとAPIにより、独自のノードを実行することなく、イーサリアムチェーンとの通信が可能になります。 Alchemyには、スマートコントラクトのデプロイメントにおいて内部で何が起こっているのかを把握するためにこのチュートリアルで利用する、監視と分析のためのデベロッパーツールも備わっています。

### アプリのAPIキーの作成 {#create-your-app-and-api-key}

Alchemyのアカウントを作成した後、アプリを作成することでAPIキーを生成することができます。 これにより、Goerliテストネットへのリクエストが可能になります。 テストネットに詳しくない場合は、[Alchemyのネットワークの選択ガイド](https://docs.alchemyapi.io/guides/choosing-a-network)をお読みください。

Alchemyダッシュボード上にあるナビゲーションバーで**Apps**ドロップダウンがあります。そこで、**Create App**をクリックします。

![Hello WorldのCreate App](./hello-world-create-app.png)

アプリに「_Hello World_」という名前を付けて、短い説明を書きます。 環境は、**Staging**を選択します。ネットワークは、**Goerli**を選択します。

![Hello WorldのCreate App画面](./create-app-view-hello-world.png)

_注意: 必ず**Goerli**を選択してください。そうしないと、このチュートリアルどおり行きません。_

**Create app**をクリックしてください。 アプリが下の表に表示されます。

### イーサリアムアカウントの作成 {#create-an-ethereum-account}

トランザクションの送受信には、イーサリアムアカウントが必要です。 ここでは、MetaMaskを使います。MataMaskは、ユーザーがイーサリアムのアカウントアドレスを管理できるブラウザーの仮想ウォレットです。

Metamaskのアカウントは[こちら](https://metamask.io/download.html)から無料でダウンロード、作成できます。 アカウントを作成後、またはすでにアカウントをお持ちの場合は(実際に支払いが発生しないように)右上の「Goerli Test Network」に切り替えてください。

### ステップ4: フォーセットからイーサリアムを追加する {#step-4-add-ether-from-a-faucet}

テストネットワークにスマートコントラクトをデプロイするには、偽のETHが複数必要になります。 GoerliネットワークでETHを取得するには、Goerliフォーセットに移動し、あなたのGoerliのアカウントアドレスを入力します。 Goerliフォーセットは最近、不安定になることがあります。試せるオプションのリストは、[テストネットワークのページ](/developers/docs/networks/#goerli)を参照してください。

_注意: ネットワークの混雑状況によっては、時間がかかる場合があります。_

### ステップ5: 残高を確認する {#step-5-check-your-balance}

あなたのウォレットにETHがあることをダブルチェックし、[eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)リクエストを[Alchemyのコンポーザーツール](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)を使って出してみましょう。 リクエストすると、ウォレット内のETHの量が返却されます。 詳細については、[Alchemyの短いチュートリアルにあるコンポーザーツールの使用方法](https://youtu.be/r6sjRxBZJuU)をご覧ください。

MetaMaskアカウントのアドレスを入力し、**Send Request**をクリックします。 以下のコードスニペットのようなレスポンスが来ます。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _注意: この結果の単位はweiであり、ETHではありません。 weiはETHの最小単位として使われています。_

ご安心ください。 私たちの偽物のお金はすべてそこにあります。

### ステップ6: プロジェクトを初期化する {#step-6-initialize-our-project}

まず、プロジェクトのフォルダを作成する必要があります。 コマンドラインに移動し、次のように入力します。

```
mkdir hello-world
cd hello-world
```

プロジェクトフォルダ内に入ったら、`npm init`を使用してプロジェクトを初期化します。

> npmをまだインストールしていない場合は、[こちら](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)の手順に従いNode.jsとnpmをインストールします。

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

package.jsonを承認すれば完了です。

### ステップ7: Hardhatのダウンロード {#step-7-download-hardhat}

Hardhatは、イーサリアムのソフトウェアをコンパイル、デプロイ、テスト、デバッグするための開発環境です。 デベロッパーがライブチェーンにデプロイする前に、スマートコントラクトや分散型アプリケーション(Dapp)をローカルに構築する際に役立ちます。

先ほど作成した`hello-world`プロジェクト内で、以下を実行します。

```
npm install --save-dev hardhat
```

[インストール手順](https://hardhat.org/getting-started/#overview)の詳細については、こちらのページをご覧ください。

### ステップ8: Hardhatプロジェクトを作成する {#step-8-create-hardhat-project}

先ほど作成した`hello-world`プロジェクトフォルダ内で、以下を実行します。

```
npx hardhat
```

ウェルカムメッセージと、次に何をするのかを選択できるオプションが表示されます。 「Create an empty hardhat.config.js」を選択します。

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

これで、プロジェクト内に`hardhat.config.js`ファイルが生成されます。 プロジェクトの設定を明記するのにチュートリアルの後半でこれを使用します。

### ステップ9: プロジェクトフォルダを追加する {#step-9-add-project-folders}

プロジェクトを整理するために、2つの新しいフォルダを作成します。 コマンドラインで、`hello-world`プロジェクトのルートディレクトリに移動し、次のように入力します。

```
mkdir contracts
mkdir scripts
```

- `contracts/`は、Hello Worldスマートコントラクトのコードファイルを格納する場所です。
- `scripts/`は、コントラクトをデプロイして対話するスクリプトを保持する場所です。

### ステップ10: コントラクトを作成する {#step-10-write-our-contract}

一体いつになったらコードを書くのだろうと疑問をお持ちではないでしょうか 。 まさに、その時です!

あなたのお気に入りのエディターでhello-worldプロジェクトを開きます。 スマートコントラクトは、最も一般的にはSolidityで書かれています。そのため、Solidityでスマートコントラクトを作成します。

1. `contracts`フォルダに移動し、`HelloWorld.sol`という名前の新規ファイルを作成します。
2. 以下は、このチュートリアルで使用するHello Worldスマートコントラクトのサンプルです。 以下の内容を`HelloWorld.sol`ファイルにコピーします。

_注意: 必ずコメントを読み、このコントラクトの処理内容を理解してください。_

```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

これは、作成時にメッセージを保存する基本的なスマートコントラクトです。 `update`関数を呼び出すことで更新できます。

### ステップ11: MetaMaskとAlchemyをプロジェクトに接続する {#step-11-connect-metamask-alchemy-to-your-project}

ここまでで、MetaMaskウォレットとAlchemyアカウントを作成し、スマートコントラクトも作成しました。次はこの3つを接続しましょう。

ウォレットから送信されるすべてのトランザクションには、固有の秘密鍵を使用した署名が必要です。 この許可をプログラムに与えるために、秘密鍵を環境ファイルに安全に格納する作業を行います。 AlchemyのAPIキーもここに保存します。

> トランザクションの送信の詳細については、[こちらのチュートリアル](https://docs.alchemyapi.io/alchemy/tutorials/sending-transactions-using-web3-and-alchemy)のweb3使ったトランザクションの送信に関する内容をご覧ください。

まず、プロジェクトディレクトリにdotenvパッケージをインストールします。

```
npm install dotenv --save
```

次に、プロジェクトのルートディレクトリに`.env`ファイルを作成します。 MetaMask秘密鍵とHTTP Alchemy API URLをファイルに加えます。

環境ファイルの名前は、必ず`.env`にしてください。そうしないと環境ファイルとして認識されません。

`process.env`や`.env-custom`などの名前を付けないでください。

- 秘密鍵をエクスポートするには、[こちらの手順](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)に従ってください。
- HTTP Alchemy APIのURLを取得するには、以下を参照してください。

![](./get-alchemy-api-key.gif)

`.env`ファイルは次のようになります。

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

これらの変数を実際にコードに接続するために、ステップ13でこれらの変数を`hardhat.config.js`ファイル内で参照します。

### ステップ12: Ethers.jsをインストールする {#step-12-install-ethersjs}

Ethers.jsは、よりユーザーフレンドリーなメソッドで[標準のJSON-RPCメソッド](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc)をラップすることにより、イーサリアムとの対話やリクエストを簡単に行うためのライブラリです。

Hardhatを使用すると、追加のツールと拡張機能のための[プラグイン](https://hardhat.org/plugins/)を統合できます。 コントラクトのデプロイでは、[Ethersプラグイン](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html)を利用します。

プロジェクトのホームディレクトリで以下を実行します。

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### ステップ13: hardhat.config.jsをアップデートする {#step-13-update-hardhat.configjs}

ここまでで、いくつかの依存関係とプラグインを追加しました。次に、`hardhat.config.js`を更新して、プロジェクトがそれらすべてについて認識できるようにする必要があります。

`hardhat.config.js`を以下のように更新します。

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

ここまででしっかりと動作していることを確認するため、コントラクトをコンパイルしてみましょう。 `compile`タスクは、組み込みのHardhatタスクの1つです。

コマンドラインで以下を実行します。

```bash
npx hardhat compile
```

`SPDX license identifier not provided in source file`という警告が表示される場合がありますが、心配する必要はありません。警告が表示されないのがベストですが、 表示された場合は、いつでも[Alchemy discord](https://discord.gg/u72VCg3)でメッセージを送信できます。

### ステップ15: デプロイスクリプトを書く {#step-15-write-our-deploy-script}

コントラクトの作成と設定ファイルの作成が完了したら、いよいよコントラクトのデプロイのためのスクリプトを作成します。

`scripts/`フォルダに移動して、`deploy.js`という名前のファイルを新規に作成し、以下の内容を追加します。

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // Start deployment, returning a promise that resolves to a contract object
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

Hardhatがコードの各行で行っている驚くべき内容については、Hardhatの[コントラクトチュートリアル](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)で説明されています。以下では、その説明を採用しています。

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.jsの`ContractFactory`は新しいスマートコントラクトをデプロイするための抽象化であり、ここでの`HelloWorld`はhello worldコントラクトのインスタンスのための[ファクトリ](https://en.wikipedia.org/wiki/Factory_(object-oriented_programming))です。 `hardhat-ethers`プラグインを使用する場合、`ContractFactory`および`Contract`インスタンスはデフォルトで最初の署名者 (所有者) に接続されます。

```javascript
const hello_world = await HelloWorld.deploy()
```

`ContractFactory`で`deploy()`を呼び出すとデプロイメントが開始され、`Contract`オブジェクトに解決すべき`Promise`が返されます。 これは、スマートコントラクトの各関数に対するメソッドを持つオブジェクトです。

### ステップ16: コントラクトをデプロイする {#step-16-deploy-our-contract}

ようやく、スマートコントラクトをデプロイする準備が整いました。 コマンドラインに移動し、以下を実行します。

```bash
npx hardhat run scripts/deploy.js --network goerli
```

次のような画面が表示されるはずです。

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**このアドレスを保存してください**。 このアドレスをチュートリアルの後半で使用します。

[Goerli etherscan](https://goerli.etherscan.io)に移動し、コントラクトアドレスを検索すると、コントラクトが正常にデプロイされていることを確認できるはずです。 トランザクションは以下のようなものになります。

![](./etherscan-contract.png)

`From`アドレスはMetaMaskアカウントのアドレスと一致し、`To`アドレスは「**Contract Creation**」と表示されます。 トランザクション内容をクリックすると、`To`フィールドにコントラクトアドレスが表示されます.

![](./etherscan-transaction.png)

おめでとうございます！ イーサリアムのテストネットにスマートコントラクトをデプロイできました.

内部で何が起こっているのかを理解するために、[Alchemyダッシュボード](https://dashboard.alchemyapi.io/explorer)のExplorerタブに移動してみましょう。 Alchemyのアプリが複数ある場合は、必ずアプリでフィルタリングし、「**Hello World**」を選択してください。

![](./hello-world-explorer.png)

ここでは、`.deploy()`関数を呼び出した際に、HardhatもしくはEthersが内部で行ったJSON-RPCメソッドを見ることができます。 ここで2つの重要なメソッドがあります。まずは、[`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction)です。これは、Goerliチェーンにコントラクトを書き込むリクエストです。次に[`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash)は、ハッシュを指定してトランザクションに関する情報を読み取るリクエストです。 トランザクションの送信の詳細については、[こちら](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)のチュートリアルにあるWeb3を使用したトランザクションの送信をご覧ください。

## パート2: スマートコントラクトとのやり取り {#part-2-interact-with-your-smart-contract}

スマートコントラクトをGoerliネットワークに正常にデプロイできました。それでは、スマートコントラクトとやり取りする方法について学びましょう。

### interact.jsファイルの作成 {#create-a-interactjs-file}

このファイルに、やり取りするスクリプトを記述します。 パート1でインストールしたEthers.jsライブラリを使用します。

`scripts/`フォルダ内に、`interact.js`という名前の新しいファイルを作成し、次のコードを追加します。

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### .envファイルの更新 {#update-your-env-file}

新しい環境変数を使用します。そのため、[以前に作成した](#step-11-connect-metamask-&-alchemy-to-your-project)`.env`ファイルに定義する必要があります。

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

コントラクト[ABI(アプリケーションバイナリインターフェイス)](/glossary/#abi)は、スマートコントラクトと対話するためのインターフェイスです。 Hardhatは自動的にABIを生成して、`HelloWorld.json`ファイルに保存します。 ABIを使うには、`interact.js`ファイルに次のコードを追加して、コンテンツをパースする必要があります。

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

ABIを表示したい場合は、次のコードを追加することでコンソールに出力できます:

```javascript
console.log(JSON.stringify(contract.abi))
```

コンソールに出力されたABIを確認するには、ターミナルに移動して次のコマンドを実行します。

```bash
npx hardhat run scripts/interact.js
```

### コントラクトのインスタンスを作成する {#create-an-instance-of-your-contract}

コントラクトを操作するには、コード内にコントラクトのインスタンスを作成する必要があります。 Ethers.jsでこれを行うには、次の3つのコンセプトを機能させる必要があります。

1. Provider - ブロックチェーンへの読み取りおよび書き込みアクセスを提供するノードプロバイダです。
2. Signer - トランザクションに署名するイーサリアムアカウントを表します。
3. Contract - オンチェーンにデプロイされた特定のコントラクトを表すEthers.jsのオブジェクトです。

前の手順で取得したコントラクABIを使って、コントラクトのインスタンスを作成します。

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

### initメッセージの読み取り {#read-the-init-message}

`initMessage = "Hello world!"`を使用してコントラクトをデプロイしたことを思い出せますでしょうか？ ここでは、スマートコントラクトに保存されているメッセージを読み取り、コンソールに出力します。

JavaScriptでは、ネットワークとのやり取りで非同期関数を使います。 非同期関数の詳細については、[この記事の中ほど](https://blog.bitsrc.io/Understanding-asynchronous-javascript-the-event-loop-74cd408419ff)をご覧ください。

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

ターミナルで`npx hardware run scripts/interact.js`を入力してファイルを実行すると、次のレスポンスが表示されるはずです。

```
The message is: Hello world!
```

おめでとうございます！ イーサリアムブロックチェーンからスマートコントラクトのデータを正常に読み取ることができました。

### メッセージの更新 {#update-the-message}

メッセージを読み取るだけでなく、`update`関数を使ってスマートコントラクトに保存されたメッセージを更新することもできます。 かなりイケてますよね？

メッセージを更新するには、インスタンス化されたコントラクトのオブジェクトで`update`関数を直接呼び出します。

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

11行目で、返されたトランザクションのオブジェクトに対して `.wait()`を呼び出していることに注目してください。 これにより、スクリプトが関数を終了する前に、トランザクションがブロックチェーン上でマイニングされるまで待機することを確実にします。 `.wait()`を呼び出しを含めなかった場合、スクリプトは、コントラクト内で更新された`message`の値を表示しないことがあります。

### 新しいメッセージの読み取り {#read-the-new-message}

[前の手順](#read-the-init-message)を繰り返して、更新された`message`の値を読み取ることができるのに違いありません。 その新しい値を出力するために必要となる変更を、少し考えてみましょう！

ヒントが必要ですか？この時点で、あなたの`interact.js`ファイルは次のようになるはずです。

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

このスクリプトを実行するだけで、古いメッセージ、更新ステータス、および新しいメッセージがコンソールに出力されるのを確認できるはずです。

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

このスクリプトの実行中、新しいメッセージが読み込まれる前に、 `Updating the message...`のステップの読み込みにしばらく時間がかかることに気づくかもしれません。 これはマイニングプロセスによるものです。マイニング中のトランザクションの追跡に興味があるならば、[Alchemy mempool](https://dashboard.alchemyapi.io/mempool)にアクセスしてトランザクションのステータスを確認できます。 トランザクションがドロップされた場合は、[Goerli Etherscan](https://goerli.etherscan.io)を確認してトランザクションのハッシュを検索することもできます。

## パート3: スマートコントラクトをEtherscanに公開する {#part-3-publish-your-smart-contract-to-etherscan}

あなたは、スマートコントラクトに命を吹き込むことに大変な努力をしました。それでは、その努力を世界に共有しましょう！

Etherscanでスマートコントラクトを検証すると、誰でもソースコードを表示して、あなたのスマートコントラクトとやり取りできるようになります。 さあ、始めましょう！

### ステップ1: EtherscanアカウントでAPIキーを生成する {#step-1-generate-an-api-key-on-your-etherscan-account}

EtherscanのAPIキーは、公開しようとしているスマートコントラクトを所有していることを確認するために必要になります。

Etherscanアカウントをお持ちでない場合は、[アカウントの登録](https://etherscan.io/register)をしてください。

ログインしたら、ナビゲーションバーでユーザー名を見つけ、その上にマウスを移動して、「**My profile**」ボタンを選択します。

プロフィールページにサイドナビゲーションバーが表示されます。 サイドナビゲーションバーで、**API Keys**を選択します。 次に、「Add」ボタンを押して新しいAPIキーを作成し、アプリに**hello-world**という名前を付けて、「**Create New API**」ボタンを押します。

新しいAPIキーがAPIキーテーブルに表示されるはずです。 APIキーをクリップボードにコピーします。

次に、EtherscanのAPIキーを`.env`ファイルに加える必要があります。

そうすると、`.env`ファイルは次のようになります。

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhatにデプロイされたスマートコントラクト {#hardhat-deployed-smart-contracts}

#### hardhat-etherscanのインストール {#install-hardhat-etherscan}

あなたのコントラクトをEtherescanへ公開するのは、Hardhatを使って簡単にできます。 はじめに、まず`hardhat-etherscan`プラグインをインストールしてください。 `hardhat-etherscan`は、スマートコントラクトのソースコードとEtherscan上のABIを自動的に検証します。 インストールするには、`hello-world`ディレクトリで次のコマンドを実行します。

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

インストールをしたら、`hardhat.config.js`の先頭に次のステートメントを含んだEtherscan構成オプションを追加します。

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
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscan上でスマートコントラクトを検証する {#verify-your-smart-contract-on-etherscan}

すべてのファイルが保存され、すべての`.env`変数が正しく構成されていることを確認してください。

`verify`タスクを実行し、コントラクトのアドレスと、コントラクトがデプロイされているネットワークを渡します。

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

`DEPLOYED_CONTRACT_ADDRESS`がGoerliテストネットワーク上にデプロイされたスマートコントラクトのアドレスであることを確認してください。 また、最後の引数 (`'Hello World!'`) は、 [パート1のデプロイ手順](#write-our-deploy-script)で使われたの文字列値と同じでなければなりません。

順調に行けば、コンソールに次のメッセージが表示されます。

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

おめでとうございます！ これで、あなたのスマートコントラクトコードは、Etherscan上にあります。

### Etherscanであなたのスマートコントラクトを確認する {#check-out-your-smart-contract-on-etherscan}

コンソールに表示されているリンクに移動すると、Etherscanで公開されているスマートコントラクトコードとABIが表示されます。

**ヤッホー！栄冠を手にしました。 これで、誰でもスマートコントラクトを呼び出したり、書き込んだりできるようになりました。 次にあなたが何を構築するか楽しみにしています。**

## パート4: フロントエンドとスマートコントラクトの統合 {#part-4-integrating-your-smart-contract-with-the-frontend}

このチュートリアルを終えると、次の方法がわかるようになります。

- MetaMaskウォレットをdappに接続する
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) APIを使用してスマートコントラクトからデータを読み取る。
- MetaMaskを使用してイーサリアムトランザクションに署名する

このdappでは、フロントエンドフレームワークで[React](https://reactjs.org/)を使っていますが、Web3の機能をプロジェクトに導入することに焦点を当てているので、Reactの基本を説明することに多くの時間を費やさないことに注意してください。

前提条件として、Reactについて初心者レベルの理解をしている必要があります。 知らなければ、公式の[React入門チュートリアル](https://reactjs.org/tutorial/tutorial.html)を読むことをお勧めします。

### スターターファイルのクローン {#clone-the-starter-files}

まず、このプロジェクトの開始ファイルを取得するために[「hello-world-part-four」GitHubリポジトリ](https://github.com/alchemyplatform/hello-world-part-four-tutorial)に行き、このリポジトリのクローンをローカルマシンに作成します。

クローンしたリポジトリをローカルで開きます。 `starter-files`と`completed`の2つのフォルダが含まれています。

- `starter-files` - **このディレクトリで作業します**。UIをイーサリアムウォレットおよび[パート3](#part-3)でEtherscanに公開したスマートコントラクトに接続します。
- `completed`には、チュートリアル全体が完了したものが入っています。行き詰まった場合にのみ、参考として使ってください。

次に、`starter-files`のコピーをお気に入りのコードエディタで開き、`src`フォルダに移動します。

これから作成するすべてのコードは、`src`フォルダに保存されます。 `HelloWorld.js`コンポーネントと JavaScriptファイルである`util/interact.js`を編集して、プロジェクトにWeb3の機能を追加していきます。

### スターターファイルの確認 {#check-out-the-starter-files}

コーディングを開始する前に、スターターファイルで提供されるものを探索してみましょう。

#### Reactプロジェクトの実行 {#get-your-react-project-running}

まずは、ブラウザでReactプロジェクトを実行しましょう。 Reactの素晴らしいところは、一度ブラウザでプロジェクトを実行すると、保存した変更がブラウザでも同時に更新されることです。

プロジェクトを実行するには、次のようにターミナルで`starter-files`フォルダのルートディレクトリに移動し、`npm install`を実行してプロジェクトの依存関係をインストールします。

```bash
cd starter-files
npm install
```

インストールが完了したら、ターミナルで`npm start`を実行します。

```bash
npm start
```

これにより、ブラウザで[http://localhost:3000/](http://localhost:3000/)を開くと、プロジェクトのフロントエンドが表示されます。 これは、1つのフィールド \(スマートコントラクトに保存されているメッセージを更新する場所\) である「Connect Wallet」ボタン、および「Update」ボタンで構成されています。

どちらのボタンをクリックしても、機能しないことがわかります。この機能をプログラムする必要があるためです。

#### `HelloWorld.js`コンポーネント {#the-helloworld-js-component}

エディタの`src`フォルダに戻り、`HelloWorld.js`ファイルを開きましょう。 このファイルには、これから作業を進めていく主要なReactコンポーネントが含まれています。すべての内容を理解することが非常に重要です。

このファイルの先頭には、いくつかの重要なステートメントがあるこに気が付くでしょう。Reactライブラリ、useEffectフックとuseStateフック、`./util/interact.js`のいくつかのアイテムなど、プロジェクトを実行するために必要になります (これらについては、すぐに詳しく説明します！) 。また、Alchemyのロゴがあります

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

それぞれの変数は以下の用途で使われます。

- `walletAddress` - ユーザーのウォレットアドレスを格納する文字列
- `status` - ユーザーにdappの操作方法を案内する補助メッセージを文字列として格納する
- `message` - スマートコントラクトの現在のメッセージを格納する文字列
- `newMessage` - スマートコントラクトに書き込まれる新しいメッセージを格納する文字列

ステート変数の後に、`useEffect` 、`addSmartContractListener`、 `addWalletListener`、 `connectWalletPressed`、`onUpdatePressed`の未実装の5つの関数があります。 次に、それらが何をするのかを説明します。

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

- [`useEffect`](https://reactjs.org/docs/hooks-effect.html)- コンポーネントがレンダリングされた後に呼び出されるReactフックです。 空の配列`[]`のプロップが渡されているため \(4行目を参照\)、コンポーネントの_最初_のレンダリングでのみ呼び出されます。 ここでは、スマートコントラクトに保存されている現在のメッセージのロード、スマートコントラクトとウォレットリスナーの呼び出し、ウォレットが既に接続されているかどうかを反映してUIを更新するのに使います。
- `addSmartContractListener` - この関数では、HelloWorldコントラクトの`UpdatedMessages`イベントを監視し、スマートコントラクトでメッセージが変更されたときにUIを更新するリスナーを設定します。
- `addWalletListener` - この関数では、ユーザーがウォレットを切断したときやアドレスを切り替えたときなど、ユーザーのMetaMaskウォレットのステートの変化を検出するリスナーを設定します。
- `connectWalletPressed` - この関数は、ユーザーのMetaMaskウォレットをdappに接続するのに呼び出されます。
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

- 6～12行目では、ユーザーのウォレットが接続されている場合 \(すなわち、`walletAddress.length > 0`\)、 ID「walletButton;」に省略されたユーザーの`walletAddress`がボタンに表示されます。 それ以外の場合は、単に「Connect Wallet」と表示されます。
- 17行目では、`message`文字列でキャプチャされたスマートコントラクトに保存されている現在のメッセージを表示します。
- 23～26行目では、テキストフィールドの入力が変化したときに[制御コンポーネント](https://reactjs.org/docs/forms.html#controlled-components)を使用して `newMessage`ステート変数を更新します。

ステート変数に加えて、IDが`publishButton`と`walletButton`である、それぞれがクリックされると`connectWalletPressed`および`onUpdatePressed`関数が呼び出されることがわります。

最後に、この`HelloWorld.js`コンポーネントがどこに加えられるかについて説明します。

他のすべてのコンポーネントのコンテナとして機能する、Reactのメインコンポーネントである`App.js`ファイルを表示すると、`HelloWorld.js`コンポーネントが7行目に挿入されていることが分かります。

最後の最後となりますが、提供されているもう1つのファイル、`interact.js`ファイルを確認してみましょう。

#### `interact.js`ファイル {#the-interact-js-file}

[M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)のパラダイムを実践したいので、dappのロジック、データ、ルールを管理するすべての関数を含んだファイルを分割し、これらの関数をフロントエンド \(`HelloWorld.js`コンポーネント\) にエクスポートできるようにします。

👆🏽まさにこれが`interact.js`ファイルの目的です。

`src`ディレクトリの`util`フォルダに移動すると、`interact.js`というファイルが含まれていることがわかります。これには、スマートコントラクトとのやり取り、ウォレット関数と変数が含まれています。

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

- `loadCurrentMessage` - この関数は、スマートコントラクトに保存されている現在のメッセージをロードするロジックを扱います。 [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3)を使ってHello Worldスマートコントラクトの_read_の呼び出しを行います。
- `connectWallet` - この関数は、私たちのdappをユーザーのMetaMaskに接続します。
- `getCurrentWalletConnected` - この関数は、ページの読み込み時にイーサリアムアカウントが既にdappに接続されているかどうかを確認し、それに応じてUIを更新します。
- `updateMessage` - この関数は、スマートコントラクトに保存されているメッセージを更新します。 Hello Worldスマートコントラクトで_write_の呼び出しが行われるため、ユーザーのMetaMaskウォレットでは、メッセージを更新するためにイーサリアムトランザクションに署名する必要があります。

何をするか理解したので、スマートコントラクトから読み取る方法を解明していきましょう。

### ステップ3: スマートコントラクトからの読み込み {#step-3-read-from-your-smart-contract}

スマートコントラクトから読み取るには、次の設定を正しく行う必要があります。

- イーサリアムチェーンへのAPI接続
- あなたのスマートコントラクトがロードされたインスタンス
- スマートコントラクトの関数を呼び出す関数
- スマートコントラクトから読み取っているデータが変更されたときの更新を監視するリスナー

手順がたくさんあるように感じますが、心配しないでください！ それぞれの方法を1つずつ説明していきます。 :\)

#### イーサリアムチェーンへのAPI接続を確立する {#establish-an-api-connection-to-the-ethereum-chain}

チュートリアルのパート2で私たちは、[Alchemy Web3キーを使ってスマートコントラクトから読み込みました](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)。 チェーンから読み取るには、あなたのdappでAlchemy Web3キーがまた必要になります。

もしなければ、最初に、 `starter-files`のルートディレクトリへ移動して、次のコマンドをコンソールで実行して[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)をインストールしてください。

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3)は、[Web3.js](https://docs.web3js.org/)のラッパーであり、強化されたAPIメソッドや重要なメリットを提供し、Web3デベロッパーの負担を軽減します。 最小限の設定で使えるように設計されているので、アプリですぐに使用可能です。

次に、[dotenv](https://www.npmjs.com/package/dotenv)パッケージをプロジェクトディレクトリにインストールします。これにより、APIキーを取得した後に安全な場所に保管できるようになります。

```text
npm install dotenv --save
```

dappでは、HTTP API キーの代わりに**Websockets APIキー**を使用します。これにより、スマートコントラクトに保存されたメッセージが変更されたときに検出するリスナーを設定できます。

APIキーを取得したら、ルートディレクトリに `.env`ファイルを作成し、Alchemy Websocketsの URLを.envファイルに加えます。 `.env`ファイルは次のようになります。

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

これで、私たちのdappにAlchemy Web3エンドポイントを設定する準備が整いました。 `util`フォルダー内に入っている`interact.js`に戻り、ファイルの先頭に次のコードを加えてください。

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

上記のコードでは、まず`.env`ファイルから Alchemyキーをインポートし、次に`alchemyKey`を`createAlchemyWeb3`に渡してAlchemy Web3エンドポイントへ確立しています。

エンドポイントの準備できたので、スマートコントラクトをロードするときです！

#### Hello Worldスマートコントラクトをロードする {#loading-your-hello-world-smart-contract}

Hello Worldスマートコントラクトをロードするには、そのコントラクトアドレスとABIが必要です。[このチュートリアルのパート3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan)を終了していれば、両方ともEtherscanから入手できます。

#### EtherscanからコントラクトABIを入手する方法 {#how-to-get-your-contract-abi-from-etherscan}

このチュートリアルのパート3を飛ばした場合は、アドレス[0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code)にあるHelloWorldコントラクトを使ってください。 ABIは、[こちら](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code)にあります。

コントラクトのABIは、コントラクトが呼び出す関数を指定し、関数が確実に意図しているフォーマットでデータを返すようにするために必要です。 コントラクトABIをコピーしたら、それを`contract-abi.json`という名前のJSONファイルとして`src`ディレクトリに保存しましょう。

contract-abi.jsonは、srcフォルダーに格納されている必要があります。

コントラクトアドレス、ABI、Alchemy Web3エンドポイントを用意することで、[コントラクトメソッド](https://docs.web3js.org/api/web3-eth-contract/class/Contract)を使ってスマートコントラクトのインスタンスをロードすることができます。 コントラクトABIを`interact.js`ファイルにインポートし、コントラクトアドレスを加えます。

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

私たちのコントラクトがロードされたので、`loadCurrentMessage`関数を実装できます！

#### `interact.js`ファイルに`loadCurrentMessage`を実装する {#implementing-loadCurrentMessage-in-your-interact-js-file}

これは非常にシンプルな関数です。 私たちのコントラクトから読み取るのに、単純な非同期のWeb3の呼び出しを作成します。 この関数では、スマートコントラクトに保存されているメッセージを返します。

`interact.js`ファイルの `loadCurrentMessage`を次のように更新してください。

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
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

`loadCurrentMessage`は、コンポーネントの最初のレンダリングで1回だけ呼び出されることに注目してください。 この後、`addSmartContractListener`を実装して、スマートコントラクト内のメッセージが変更された後にUIを自動的に更新できるようにします。

リスナーについて詳しく説明する前に、これまでの内容を確認してみましょう！ `HelloWorld.js`ファイルと`interact.js`ファイルを保存し、[http://localhost: 3000/](http://localhost:3000/)へアクセスしてください。

現在、「ネットワークに接続されていません」というメッセージが表示されなくなっていることがわかります。 代わりに、スマート コントラクトに保存されているメッセージが反映されます。 カッコイイ！

#### 今や、UIにスマートコントラクトに保存されたメッセージが反映されるようになりました。 {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

それでは、リスナーについて説明していきます。

#### `addSmartContractListener`を実装する {#implement-addsmartcontractlistener}

[このチュートリアルのパート1](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract)で記述した`HelloWorld.sol`ファイルについて振り返ると、`UpdatedMessages`というスマートコントラクトのイベントがあったと思います。このイベントは、スマートコントラクトの`update`関数が呼び出された後に発行されます \(9 行目と27行目を参照\)。

```javascript
// HelloWorld.sol

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

スマートコントラクトイベントは、ブロックチェーンで何かが起こったこと \(すなわち、_イベント_の発生 \) をフロントエンドアプリケーションに伝える方法です。特定のイベントを「リスニング」して、それが起きた時にアクションを実行します。

具体的には、`addSmartContractListener`関数がHello Worldスマートコントラクトの`UpdatedMessages`イベントをリッスンしており、新しいメッセージを表示するようにUIの更新をします。

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

リスナーがイベントを検出したときに何が起こるかを詳しく解説します。

- イベントの発行時にエラーが発生した場合、そのエラーは`status`ステート変数を介してUIに反映する。
- それ以外の場合は、返された`data`オブジェクトを使う。 `data.returnValues`は、配列にある最初のエレメントがインデックスの0に格納されている配列です。配列の最初のエレメントには前のメッセージが格納され、2番目のエレメントには更新されたメッセージが格納されます。 つまり、イベントが成功すると、`message`文字列を更新されたメッセージに設定し、`newMessage`文字列をクリアし、`status`ステート変数を更新します。 これにより、新しいメッセージがスマートコントラクトに公開されたことを反映しています。

最後に、`useEffect`関数でリスナーを呼び出して、`HelloWorld.js`コンポーネントの最初のレンダリング時にリスナーが初期化されるようにしましょう。 あなたの`useEffect`関数全体は、次のようになります。

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

スマートコントラクトから読み取れるようになったので、スマートコントラクトに書き込む方法も理解できるとなおよいでしょう！ ただし、dappに書き込むには、まずイーサリアムウォレットをdappに接続する必要があります。

それでは、次にイーサリアムウォレット \(MetaMask\) を設定し、それをdappに接続することに取り組んでいきましょう！

### ステップ4: イーサリアムウォレットのセットアップ {#step-4-set-up-your-ethereum-wallet}

イーサリアムチェーンに何かを書き込むには、ユーザーは仮想ウォレットの秘密鍵を使ってトランザクションに署名しなければなりません。 このチュートリアルでは、イーサリアムアカウントアドレスの管理に使用されるブラウザの仮想ウォレットである[MetaMask](https://metamask.io/)を使用します。これにより、エンドユーザーは、このランザクションの署名がとても簡単になります。

イーサリアムのトランザクションの仕組みの詳細については、イーサリアム・ファウンデーションの[こちらのページ](/developers/docs/transactions/)をご覧ください。

#### MetaMaskをダウンロード {#download-metamask}

Metamaskのアカウントは[こちら](https://metamask.io/download.html)から無料でダウンロード、作成できます。 アカウントを作成後、またはすでにアカウントをお持ちの場合は\( 実際に支払いが発生しないように \)右上の「Goerli Test Network」に切り替えてください。

#### フォーセットからイーサ(ETH)を追加 {#add-ether-from-a-faucet}

イーサリアムブロックチェーンでトランザクションに署名するには、偽のETHが必要になります。 ETHを取得するには、 [FaucETH](https://fauceth.komputing.org)にアクセスしてGoerliアカウントアドレスを入力し、「Request funds」をクリックしてください。 そしてドロップダウンで「Ethereum Testnet Goerli」を選択し、最後に「Request funds」ボタンを再度クリックします。 MetamaskアカウントにETHが表示されるはずです。

#### 残高の確認 {#check-your-balance}

残高を再確認するために、[Alchemyのコンポーザーツール](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)を使用して[eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)をリクエストしてみましょう。 このリクエストをすると、ウォレット内のETHの額が返されます。 Metamaskアカウントアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されます。

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**注:** この結果の単位は、ETHではなくweiです。 weiはETHの最小単位として使われています。 weiからETHへ変換すると、1 eth = 10¹⁸ weiになります。 つまり、0xde0b6b3a7640000を10進数に変換すると、1\*10¹⁸となり、1 ETHに相当します。

ご安心ください。 これで、偽のお金を手に入れました。 🤑

### ステップ5: メタマスクをUIへ接続する {#step-5-connect-metamask-to-your-UI}

MetaMaskウォレットが設定されたので、分散型アプリケーション(Dapp)を接続しましょう。

#### `connectWallet`関数 {#the-connectWallet-function}

`interact.js`ファイルの`connectWallet`関数を実装します。この関数は、`HelloWorld.js`コンポーネントで呼び出します。

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
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
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

この巨大なコードブロックは、正確には何をするのでしょうか?

まず、ブラウザで`window.ethereum`が有効になっているかどうかをチェックしています。

`window.ethereum`は、MetaMaskおよび他のウォレットプロバイダーによって挿入されるグローバルAPIであり、ウェブサイトがユーザーのイーサリアムアカウントを要求できるようにするものです。 承認されると、ユーザーが接続しているブロックチェーンからデータを読み取ったり、メッセージやトランザクションへの署名をユーザーに提案したりできるようになります。 詳細については、[MetaMaskのドキュメント](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents)を参照してください。

`window.ethereum`が_存在しない_場合は、MeTaMaskがインストールされていないことを意味します。 その結果、空の文字列に設定された、返される`address`と、ユーザーがMetaMaskをインストールする必要があることを伝える`status`JSXオブジェクトが入ったJSONオブジェクトが返されます。

`window.ethereum`が_存在_する場合、興味深いことが起こります。

try/catch ループを使用して、[`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)を呼び出すことでMetaMaskに接続しようとしています。 この関数を呼び出すと、ブラウザでMetaMaskが開き、ユーザーはウォレットを分散型アプリケーション(Dapp)に接続するように求められます。

- ユーザーが接続を選んだ場合、`method: "eth_requestAccounts"`は、分散型アプリケーション(Dapp)に接続されているすべてのユーザーのアカウントアドレスを含む配列を返します。 `connectWallet`関数は、配列内の_最初の_`address`と\(9 行目参照\)、ユーザーにスマートコントラクトにメッセージを書き込むように促す`status`メッセージが入ったJSONオブジェクトを返します。
- ユーザーが接続を拒否した場合、JSONオブジェクトには、返される`address`に入る空の文字列と、ユーザーが接続を拒否したことを示す`status`メッセージが入ることになります。

これで、`connectWallet`関数を作成できたので、次のステップでは、この関数を`HelloWorld.js`コンポーネントに呼び出します。

#### `connect Wallet`関数を`Hello World.js`UIコンポーネントに加える {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

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

`connectWalletPressed`では、単にインポートされた`connectWallet`関数のawait呼び出しを行っています。さらに、そのレスポンスを使用し、`status`と`walletAddress`変数を状態フックを介して更新しています。

それでは、両方のファイル \(`HelloWorld.js`と`interact.js`\) を保存して、これまでのUIをテストしてみましょう。

[http://localhost:3000/](http://localhost:3000/)でブラウザを開き、ページ右上にある「Connect Wallet」ボタンを押します。

MetaMaskがインストールされている場合は、ウォレットを分散型アプリケーション(Dapp)に接続するように求められます。 接続リクエストを承認します。

ウォレットボタンに、接続した自分のアドレスが表示されているはずです。 やりましたね🔥

次に、ページを更新してみてください。変ですね。 ウォレットボタンによって、すでに接続しているにもかかわらずMetaMaskに接続するよう求められます。

しかし、恐れるに足りません。 `getCurrentWalletConnected`を実装することで、簡単にこれを修正できます。この関数は、アドレスが分散型アプリケーション(Dapp) にすでに接続されているかどうかを確認し、それに応じてUIを更新します。

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
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
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

このコードは、前述の`connectWallet`関数に_非常に_似ています。

主な違いとしては、ユーザーがウォレットに接続するためにMetaMaskを開く`eth_requestAccounts`メソッドを呼び出す代わりに、 ここでは`eth_accounts`メソッドを呼び出しています。これは、現在、分散型アプリケーション(Dapp)に接続されているMetaMaskのアドレスを含む配列を単に返すだけです。

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

`walletAddress`状態変数と`status`状態変数を更新するのに、呼び出した`getCurrentWalletConnected`のレスポンスを使用していることに注目してください。

このコードを加えたら、ブラウザウィンドウを更新してみてください。

素晴らしい！ リフレッシュ後も、ボタンには接続されていることが示されており、接続されたウォレットのアドレスのプレビューが表示されているはずです。

#### `addWalletListener`の実装 {#implement-addwalletlistener}

分散型アプリケーション(Dapp)ウォレットの設定の最終ステップは、ウォレットリスナーを実装することです。これにより、ユーザーが接続を切断したり、アカウントを切り替えたりした場合など、ウォレットの状態が変更されたときにUIが更新されます。

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
        🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

この時点で何が起こっているかを理解するのに私たちの助けは必要ないと思いますが、完璧な理解を目指しているので簡単に説明します。

- まず、ブラウザで`window.ethereum`が有効になっているか\(すなわち MetaMaskがインストールされているか\)を関数がチェックしています。
  - 有効になっていない場合、ユーザーにMetaMaskのインストールを求めるJSX文字列を`status`状態変数に設定します。
  - 有効になっている場合、MetaMaskウォレットの状態変更をリッスンしている3行目の`window.ethereum.on("accountsChanged")`リスナーを設定します。この状態変更には、ユーザーが追加のアカウントを分散型アプリケーション(Dapp)に接続した場合、アカウントを切り替えた場合、アカウントを切断した場合が含まれます。 少なくとも1つのアカウントが接続されていれば、`accounts`配列の最初のアカウントがリスナーから返されたときに、`walletAddress`状態変数が更新されます。 それ以外の場合は、`walletAddress`に空の文字列が設定されます。

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

### ステップ6: `updateMessage`関数の実装する {#step-6-implement-the-updateMessage-function}

友よ！最終段階にたどり着きました。 `interact.js`ファイルの`updateMessage`で、次のことを実行します。

1. スマートコンタクトに公開したいメッセージが有効であることを確認する。
2. MetaMaskを使用してトランザクションに署名する
3. `HelloWorld.js`フロントエンドコンポーネントでこの関数を呼び出す。

これには、それほど時間を要しません。dappを完成させましょう！

#### 入力エラー処理 {#input-error-handling}

当然ながら、関数の開始時に何らかの入力エラー処理を行うことは理にかなっています。

MetaMaskエクステンションがインストールされていない場合や接続されているウォレットがない場合 \(つまり、渡された `address`が空の文字列\) 、 `message`は空の文字列になります。 次のエラー処理を`updateMessage`に追加しましょう。

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

入力エラーを適切に処理できるようなりました。それでは、MetaMaskを介してトランザクションに署名をします。

#### トランザクションへ署名する {#signing-our-transaction}

従来のWeb3イーサリアムトランザクションにすでに慣れている場合は、次に記述するコードは非常に馴染みのあるものになるでしょう。 入力エラー処理コードの下に、次の`updateMessage`を加えます。

```javascript
// interact.js

//set up transaction parameters
const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: address, // must match user's active address.
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//sign the transaction
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

何をしているか、説明していきましょう。 まず、次のようにトランザクションパラメータを設定します。

- `to`に受取人のアドレス\(スマートコントラクト\)を設定します 。
- `from`では、関数に渡した`address`変数であるトランザクションの署名者を指定します。
- `data`には、Hello Worldスマートコントラクトの `update`メソッドへの呼び出しが含まれており、`message`文字列変数を入力として受け取っています。

次に、`window.ethereum.request`をawaitで呼び出して、MetaMaskにトランザクションの署名を依頼します。 11行目と12行目で、ethメソッド `eth_sendTransaction`を指定し、`transactionParameters`を渡していることに注目してください。

この時点で、ブラウザでMetaMaskが開かれ、ユーザーにトランザクションの署名または拒否を求めます。

- トランザクションが成功した場合、この関数は、Etherscanでトランザクションについての詳細を確認するようユーザーに求める`status`JSX文字列が入ったJSONオブジェクトを返します。
- トランザクションが失敗した場合、この関数は、エラーメッセージを伝える`status`文字列が入ったJSONオブジェクトを返します。

全体では、`updateMessage`関数は次のようになります。

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //input error handling
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

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //sign the transaction
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

とても綺麗ででシンプルです。 そして、なんということでしょう。 dappの完成です。

**更新**ボタンを試してみてください！

### 自分自身でカスタムdappを作る {#make-your-own-custom-dapp}

おめでとう！あなたは、このチュートリアルを最後までやりきりました! おさらいすると、以下の方法を学びました。

- MetaMaskウォレットをdappプロジェクトに接続する
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) APIを使用してスマートコントラクトからデータを読み取る。
- MetaMaskを使用してイーサリアムトランザクションに署名する

これで、このチュートリアルのスキルを応用して独自のカスタムdappプロジェクトを構築するための準備が整いました。 何かご質問がございましたら、[Alchemy Discord](https://discord.gg/gWuC7zB)でいつでもお気軽にお問い合わせください。 🧙‍♂️

このチュートリアルを通して体験したことやフィードバックがあれば、Twitter[@alchemyplatform](https://twitter.com/AlchemyPlatform)でタグ付けしてお知らせください。
