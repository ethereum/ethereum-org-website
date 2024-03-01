---
title: 初心者向けのHello Worldスマートコントラクト
description: イーサリアムでの簡単なスマートコントラクトの作成とデプロイに関する入門チュートリアル
author: "elanh"
tags:
  - "Solidity"
  - "hardhat"
  - "alchemy"
  - "スマートコントラクト"
  - "デプロイ"
skill: beginner
lang: ja
published: 2021-03-31
---

このチュートリアルは、ブロックチェーンの開発が初めてで、どこから始めたらよいのか分からない場合や、 スマートコントラクトをデプロイしてやり取りする方法を理解したいだけの場合に、最適なガイドとなります。 このチュートリアルでは、仮想ウォレット([MetaMask](https://metamask.io/))、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org/)、[Alchemy](https://alchemyapi.io/eth)を使用して、Goerli テストネットワーク上で簡単なスマートコントラクトを作成してデプロイする方法を順を追って説明します(現時点でしっかりと理解できていなくても、心配はご無用です。後ほど説明します)。

このチュートリアルの[パート 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract)では、ここでデプロイしたスマートコントラクトとやり取りする方法について説明します。[パート 3](https://docs.alchemy.com/docs/submitting-your-smart-contract-to-etherscan)では、そのスマートコントラクトを Etherscan で公開する方法について説明します。

質問がある場合は、いつでも[Alchemy Discord](https://discord.gg/gWuC7zB)でお問い合わせください。

## ステップ 1: イーサリアムネットワークに接続する {#step-1}

イーサリアムチェーンにリクエストを行う方法はたくさんあります。 簡略化のため、ここでは Alchemy の無料アカウントを使用します。これは独自のノードを実行することなく、イーサリアムチェーンとの通信を可能にするブロックチェーンのデベロッパープラットフォームと API です。 このプラットフォームには、スマートコントラクトのデプロイメントにおいて内部で何が起こっているのかを把握するためにこのチュートリアルで利用する、監視と分析のためのデベロッパーツールも備わっています。 Alchemy のアカウントをお持ちでない場合は、[こちら](https://dashboard.alchemyapi.io/signup)から無料で登録できます。

## ステップ 2: アプリ(および API キー)を作成する {#step-2}

Alchemy のアカウントを作成すると、アプリを作成することで API キーを生成できるようになります。 これにより、Goerli テストネットワークへのリクエストが可能になります。 テストネットに詳しくない場合は、[こちらのページ](/developers/docs/networks/)をご覧ください。

1.  ナビゲーションバーの「Apps」にマウスを合わせて、「Create App」をクリックし、Alchemy ダッシュボードの「Create App」ページに移動してください。

![Hello WorldのCreate App](./hello-world-create-app.png)

2. アプリに「Hello World」という名前を付け、簡単な説明を記述し、環境に「Staging」を選択(アプリのブックキーピングに使用)し、ネットワークに「Goerli」を選択します。

![Hello WorldのCreate App画面](./create-app-view-hello-world.png)

3. 「Create app」をクリックして完了です。 アプリが下の表に表示されます。

## ステップ 3: イーサリアムアカウント(アドレス)を作成する {#step-3}

トランザクションの送受信には、イーサリアムアカウントが必要です。 このチュートリアルでは、イーサリアムアカウントアドレスを管理するためにブラウザの仮想ウォレットである Metamask を使用します。 [トランザクション](/developers/docs/transactions/)の詳細。

Metamask のアカウントは[こちら](https://metamask.io/download.html)から無料でダウンロード、作成できます。 アカウントを作成後、またはすでにアカウントをお持ちの場合は(実際に支払いが発生しないように)右上の「Goerli Test Network」に切り替えてください。

![MetaMask Ropstenの例](./metamask-ropsten-example.png)

## ステップ 4: フォーセットからイーサ(ETH)を追加する {#step-4}

テストネットワークにスマートコントラクトをデプロイするには、偽の ETH が必要になります。 ETH を取得するには、[Goerli フォーセット](https://goerlifaucet.com/)にアクセスし、Alchemy アカウントでログインしてウォレットアドレスを入力し、「Send Me ETH」をクリックしてください。 ネットワークトラフィックのために偽の ETH を受け取るのに時間がかかる場合があります。 (この記事の執筆時点では、30 分ほどかかりました。) MetaMask アカウントに ETH が表示されるはずです!

## ステップ 5: 残高を確認する {#step-5}

残高を再確認するために、[eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance)を[Alchemy のコンポーザーツール](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D)を使用してリクエストしてみましょう。 このリクエストをすると、ウォレット内の ETH の額が返されます。 MetaMask アカウントアドレスを入力して「Send Request」をクリックすると、次のようなレスポンスが表示されます。

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **注:** この結果の単位は、ETH ではなく wei です。 wei は ETH の最小単位として使われています。 wei から ETH へ変換すると、1 eth = 10<sup>18</sup> wei になります。 つまり、0x2B5E3AF16B1880000 を 10 進数に変換すると、5\*10¹⁸ となり、5 ETH に相当します。
>
> ご安心ください。 偽のお金はすべてそこにあります<Emoji text=":money_mouth_face:" size={1} />。

## ステップ 6: プロジェクトを初期化する {#step-6}

まず、プロジェクトのフォルダを作成する必要があります。 コマンドラインに移動し、次のように入力します。

```
mkdir hello-world
cd hello-world
```

プロジェクトフォルダ内に入ったら、`npm init`を使用してプロジェクトを初期化します。 まだ npm がインストールされていない場合は、[こちらの手順](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)に従ってください(Node.js も必要となりますので、こちらもダウンロードしてください。)

```
npm init
```

インストール時の質問についてはどのように回答してもかまいませんが、参考までに以前行った回答を以下に示します。

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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json を承認すれば完了です。

## ステップ 7: [Hardhat](https://hardhat.org/getting-started/#overview)をダウンロードする {#step-7}

Hardhat は、イーサリアムのソフトウェアをコンパイル、デプロイ、テスト、デバッグするための開発環境です。 デベロッパーがライブチェーンにデプロイする前に、スマートコントラクトや分散型アプリケーション(Dapp)をローカルに構築する際に役立ちます。

先ほど作成した`hello-world`プロジェクト内で、以下を実行します。

```
npm install --save-dev hardhat
```

[インストール手順](https://hardhat.org/getting-started/#overview)の詳細については、こちらのページをご覧ください。

## ステップ 8: Hardhat プロジェクトを作成する {#step-8}

プロジェクトフォルダ内で以下を実行します。

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

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

`hardhat.config.js`ファイルが生成されます。このファイルでプロジェクトのすべての設定を行います(ステップ 13 で行います)。

## ステップ 9: プロジェクトフォルダを追加する {#step-9}

プロジェクトを整理するために、2 つの新しいフォルダを作成します。 コマンドラインでプロジェクトのルートディレクトリに移動し、次のように入力します。

```
mkdir contracts
mkdir scripts
```

- `contracts/`は、Hello World スマートコントラクトのコードファイルを格納する場所です。
- `scripts/`は、コントラクトをデプロイして対話するスクリプトを保持する場所です。

## ステップ 10: コントラクトを作成する {#step-10}

一体いつになったらコードを書くのだろうと疑問をお持ちではないでしょうか 。 このステップ 10 でコードを書いていきましょう。

お気に入りのエディタで hello-world プロジェクトを開きます(通常は[VScode](https://code.visualstudio.com/)を使用しています)。 スマートコントラクトは、Solidity と呼ばれる言語で記述されています。HelloWorld.sol スマートコントラクトの作成にこの言語を使用します。

1.  「contracts」フォルダに移動し、HelloWorld.sol という名前の新規ファイルを作成します。
2.  以下は、このチュートリアルで使用するイーサリアム・ファウンデーションの Hello World スマートコントラクトのサンプルです。 以下の内容をコピーして、HelloWorld.sol ファイルに貼り付けます。コメントを読んで、このコントラクトが何を行うのかを理解してください。

```solidity
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

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
      message = newMessage;
   }
}
```

これは、作成時にメッセージを保存し、`update`関数を呼び出すことで更新できる非常にシンプルなスマートコントラクトです。

## ステップ 11: MetaMask と Alchemy をプロジェクトに接続する {#step-11}

ここまでで、MetaMask ウォレットと Alchemy アカウントを作成し、スマートコントラクトも作成しました。次はこの 3 つを接続しましょう。

仮想ウォレットから送信されるすべてのトランザクションには、固有の秘密鍵を使用した署名が必要です。 この権限をプログラムに提供するため、秘密鍵(および Alchemy API キー)を環境ファイルに安全に保存できます。

> トランザクションの送信の詳細については、web3 を使用したトランザクションの送信についての[こちらのチュートリアル](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)をご覧ください。

まず、プロジェクトディレクトリに dotenv パッケージをインストールします。

```
npm install dotenv --save
```

次に、 `.env`ファイルをプロジェクトのルートディレクトリに作成し、そのファイルに Metamask の秘密鍵と HTTP Alchemy API の URL を追加します。

- 秘密鍵をエクスポートするには、[こちらの手順](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)に従ってください。
- HTTP Alchemy API の URL を取得するには、以下を参照してください。

![Alchemy APIキーの取得](./get-alchemy-api-key.gif)

Alchemy API の URL をコピーします。

`.env`ファイルは次のようになります。

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

これらの変数を実際にコードに接続するために、ステップ 13 でこれらの変数を`hardhat.config.js`ファイル内で参照します。

<InfoBanner isWarning={true}>
<code>.env</code>ファイルをコミットしないでください! <code>.env</code>ファイルを誰かと共有したり公開したりしないようにしてください。秘密が漏洩する可能性があります。 バージョン管理ツールを使用している場合は、<code>.env</code>を<a href="https://git-scm.com/docs/gitignore">gitignore</a>ファイルに追加します。
</InfoBanner>

## ステップ 12: Ethers.js をインストールする {#step-12-install-ethersjs}

Ethers.js は、よりユーザーフレンドリーなメソッドで[標準の JSON-RPC メソッド](/developers/docs/apis/json-rpc/)をラップすることにより、イーサリアムとの対話やリクエストを簡単にするライブラリです。

Hardhat は、追加のツールと拡張機能のための[プラグイン](https://hardhat.org/plugins/)の統合を非常に簡単にしてくれます。 コントラクトのデプロイメントに[Ethers プラグイン](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html)を利用します([Ethers.js](https://github.com/ethers-io/ethers.js/)には、複数の非常にクリーンなコントラクトのデプロイメント方法があります)。

プロジェクトのホームディレクトリで以下を実行します。

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

次のステップの`hardhat.config.js`でも Ethers(.js)が必要になります。

## ステップ 13: hardhat.config.js を更新する {#step-13-update-hardhatconfigjs}

ここまでで、いくつかの依存関係とプラグインを追加しました。次に、`hardhat.config.js`を更新して、プロジェクトがそれらすべてについて認識できるようにする必要があります。

`hardhat.config.js`を以下のように更新します。

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "goerli",
   networks: {
      hardhat: {},
      goerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## ステップ 14: コントラクトをコンパイルする {#step-14-compile-our-contracts}

ここまででしっかりと動作していることを確認するため、コントラクトをコンパイルしてみましょう。 `compile`タスクは、組み込みの Hardhat タスクの 1 つです。

コマンドラインで以下を実行します。

```
npx hardhat compile
```

`SPDX license identifier not provided in source file`という警告が表示される場合がありますが、心配する必要はありません。警告が表示されないのがベストですが、 表示された場合は、いつでも[Alchemy discord](https://discord.gg/u72VCg3)でメッセージを送信できます。

## ステップ 15: デプロイスクリプトを書く {#step-15-write-our-deploy-scripts}

コントラクトの作成と設定ファイルの作成が完了したら、いよいよコントラクトのデプロイのためのスクリプトを作成します。

`scripts/`フォルダに移動して、`deploy.js`という名前のファイルを新規に作成し、以下の内容を追加します。

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat がコードの各行で行っている驚くべき内容については、Hardhat の[コントラクトチュートリアル](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)で説明されています。以下では、その説明を採用しています。

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js の`ContractFactory`は新しいスマートコントラクトをデプロイするための抽象化であり、ここでの`HelloWorld`は hello world コントラクトのインスタンスのためのファクトリです。 `hardhat-ethers`プラグインを使用する場合、`ContractFactory`および`Contract`インスタンスはデフォルトで最初の署名者に接続されます。

```
const hello_world = await HelloWorld.deploy();
```

`ContractFactory`で`deploy()`を呼び出すとデプロイメントが開始され、`Contract`に解決すべき`Promise`が返されます。 これは、スマートコントラクトの各関数に対するメソッドを持つオブジェクトです。

## ステップ 16: コントラクトをデプロイする {#step-16-deploy-our-contract}

ようやく、スマートコントラクトをデプロイする準備が整いました。 コマンドラインに移動し、以下を実行します。

```
npx hardhat run scripts/deploy.js --network goerli
```

次のような画面が表示されるはずです。

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

[Goerli etherscan](https://goerli.etherscan.io/)に移動し、コントラクトアドレスを検索すると、コントラクトが正常にデプロイされていることを確認できるはずです。 トランザクションは以下のようなものになります。

![EtherscanのContract](./etherscan-contract.png)

`From`アドレスは MetaMask アカウントアドレスと一致する必要があります。To アドレスには「Contract Creation」と表示されますが、トランザクションをクリックすると、`To`フィールドにコントラクトアドレスが表示されます。

![EtherscanのTransaction](./etherscan-transaction.png)

おめでとうございます! イーサリアムチェーンにスマートコントラクトをデプロイできました 🎉

内部で何が起こっているのかを理解するために、[Alchemy ダッシュボード](https://dashboard.alchemyapi.io/explorer)の Explorer タブに移動してみましょう。 Alchemy のアプリが複数ある場合は、必ずアプリでフィルタリングし、「Hello World」を選択してください。 ![Hello WorldのExplorer](./hello-world-explorer.png)

ここでは、`.deploy()`関数を呼び出した際に、Hardhat/Ethers が内部で行った JSON-RPC の呼び出しを見ることができます。 ここで呼び出している 2 つの重要な JSON-RPC は、実際に Goerli チェーン上でコントラクトを書き込むリクエストの[`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction)と、(トランザクションの際の典型的なパターンである)ハッシュを与えられているトランザクションに関する情報を読み取るリクエストの[`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash)です。 トランザクションの送信の詳細については、こちらのチュートリアルの[Web3 を使用したトランザクションの送信](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)をご覧ください。

こちらのチュートリアルのパート 1 は以上となります。パート 2 では初期メッセージの更新による[スマートコントラクトとの実際のやり取り](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#part-2-interact-with-your-smart-contract)を、パート 3 では[Etherscan へのスマートコントラクトの公開](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#optional-part-3-publish-your-smart-contract-to-etherscan)を行い、やり取りする方法を学びます。

**Alchemy の詳細については、 [ウェブサイト](https://alchemyapi.io/eth)をご覧ください。 アップデートを見逃したくない場合は、 [こちら](https://www.alchemyapi.io/newsletter)でニュースレターを購読してください。 [Twitter](https://twitter.com/alchemyplatform)もあわせてフォローし、[Discord](https://discord.com/invite/u72VCg3)**にもご参加ください。
