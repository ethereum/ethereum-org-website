---
title: JavaScript APIライブラリ
description: アプリケーションからブロックチェーンへやり取りできるJavaScriptクライアントライブラリの紹介。
lang: ja
---

ウェブアプリがEthereumブロックチェーンと対話する（すなわち、ブロックチェーンデータの読み取りやネットワークへのトランザクション送信）には、Ethereumノードに接続する必要があります。

この目的のために、すべてのEthereumクライアントは[JSON-RPC](/developers/docs/apis/json-rpc/)仕様を実装しており、アプリケーションが利用できる統一された[メソッド](/developers/docs/apis/json-rpc/#json-rpc-methods)のセットが用意されています。

JavaScriptでイーサリアムノードに接続する場合、通常のJavaScriptを使用することは可能です。しかし、エコシステム内には、作業をより簡単にするいくつかの便利なライブラリがあります。 これらのライブラリにより、デベロッパーは直感的な1行のメソッドを作成するだけで、イーサリアムとやり取りするJSON-RPCリクエストを (内部的に) 初期化できるようになります。

[マージ](/roadmap/merge/)以降は、ノードの実行には、実行クライアントとコンセンサスクライアントという2つの接続されたEthereumソフトウェアが必要になることに注意してください。 必ず、ノードに実行クライアントとコンセンサスクライアントの両方が含まれるようにしてください。 ご使用のノードがローカルマシン上にない場合（例：ノードがAWSインスタンス上で実行されている）、チュートリアルのIPアドレスを適宜更新してください。 詳細については、[ノードの実行](/developers/docs/nodes-and-clients/run-a-node/)に関するページをご覧ください。

## 前提条件{#prerequisites}

JavaScriptを理解することに加えて、[Ethereumスタック](/developers/docs/ethereum-stack/)と[Ethereumクライアント](/developers/docs/nodes-and-clients/)を理解しておくと役立つでしょう。

## ライブラリの利点 {#why-use-a-library}

これらのライブラリにより、イーサリアムノードと直接やり取りする際の複雑さが抽象化されます。 また、ユーティリティ関数(例: ETHからGweiへの変換)も提供されているため、開発者はイーサリアムクライアントの複雑な処理に費やす時間を減らし、アプリケーション独自の機能に集中できます。

## ライブラリの機能 {#library-features}

### Ethereumノードへの接続 {#connect-to-ethereum-nodes}

providersライブラリを使用することで、JSON-RPC、INFURA、Etherscan、AlchemyまたはMetaMaskに関係なく、イーサリアムに接続してデータを読み取ることができます。

> **警告:** Web3.jsは2025年3月4日にアーカイブされました。 [発表を読む](https://blog.chainsafe.io/web3-js-sunset/)。 新しいプロジェクトでは、[ethers.js](https://ethers.org)や[viem](https://viem.sh)のような代替ライブラリの使用を検討してください。

**Ethers.jsを使った例**

```js
// BrowserProviderは標準のWeb3プロバイダをラップしたもので、
// MetaMaskが各ページにwindow.ethereumとしてインジェクトするものです
const provider = new ethers.BrowserProvider(window.ethereum)

// MetaMaskプラグインは、トランザクションに署名して
// イーサを送信し、ブロックチェーン内の状態を変更するための支払いを行うこともできます。
// そのためには、アカウントの署名者が必要です...
const signer = provider.getSigner()
```

**Web3.jsを使った例**

```js
var web3 = new Web3("http://localhost:8545")
// or
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// change provider
web3.setProvider("ws://localhost:8546")
// or
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Using the IPC provider in node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // mac os path
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // mac os path
// on windows the path is: "\\\\.\\pipe\\geth.ipc"
// on linux the path is: "/users/myuser/.ethereum/geth.ipc"
```

一度セットアップすると、ブロックチェーンへ以下のクエリが可能になります。

- ブロック番号
- ガスの推定値
- スマートコントラクトのイベント
- ネットワークID
- 等々。

### ウォレット機能 {#wallet-functionality}

これらのライブラリは、ウォレットの作成、キーの管理、トランザクションへ署名を行います。

Ethers.jsを使った例

```js
// ニーモニックからウォレットインスタンスを作成...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...または秘密鍵から
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Signer APIごとのPromiseとしてのアドレス
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// ウォレットアドレスは同期的に利用することもできます
walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// 内部の暗号コンポーネント
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// ウォレットのニーモニック
walletMnemonic.mnemonic
// {
//   locale: 'en',
//   path: 'm/44\'/60\'/0\'/0/0',
//   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
// }

// 注: 秘密鍵で作成されたウォレットには
//       ニーモニックがありません (派生によりこれが妨げられるため)
walletPrivateKey.mnemonic
// null

// メッセージへの署名
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// トランザクションへの署名
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// connectメソッドは、プロバイダに接続された
// ウォレットの新しいインスタンスを返します
wallet = walletMnemonic.connect(provider)

// ネットワークへのクエリ
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// イーサの送信
wallet.sendTransaction(tx)
```

[完全なドキュメントを読む](https://docs.ethers.io/v5/api/signer/#Wallet)

セットアップ後、以下が可能になります。

- アカウントの作成
- トランザクションの送信
- トランザクションへの署名
- 等々。

### スマートコントラクト関数との対話 {#interact-with-smart-contract-functions}

Javascriptクライアントライブラリを使用すると、コンパイルされたコントラクトのアプリケーションバイナリインタフェース (ABI) を読み取ることによって、アプリからスマートコントラクト関数を呼び出せるようになります。

ABIには基本的に JSON形式でコントラクトの関数が記述されており、それを通常のJavaScriptオブジェクトのように使用することができます。

以下はSolidityのスマートコントラクトです:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    constructor(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

上記は次のようなJSONになります:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

次のことが可能であることを意味します:

- スマートコントラクトにトランザクションを送信し、メソッドを実行
- EVMでメソッド実行時にかかるガス代を見積もるためにコール
- コントラクトのデプロイ
- その他

### ユーティリティ関数 {#utility-functions}

ユーティリティ関数は、イーサリアムでの構築を少し簡単にする便利なショートカットです。

ETHの値は、デフォルトでweiに設定されています。 1 ETHは、1,000,000,000,000,000,000,000,000,000,000,000,000 wei です。つまり、非常に巨大な数値を扱っているということです。 `web3.utils.toWei`は、etherをWeiに変換します。

Ethers.jsで記述した場合は次のようになります:

```js
// Get the balance of an account (by address or ENS name)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Often you will need to format the output for the user
// which prefer to see values in ether (instead of wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3jsユーティリティ関数](https://docs.web3js.org/api/web3-utils)
- [Ethersユーティリティ関数](https://docs.ethers.org/v6/api/utils/)

## 利用可能なライブラリ {#available-libraries}

**Web3.js -** **_Ethereum JavaScript API_**

- [ドキュメンテーション](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_JavaScriptとTypeScriptにおける完全なEthereumウォレットの実装とユーティリティ。_**

- [Ethers.jsホーム](https://ethers.org/)
- [ドキュメンテーション](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_EthereumとIPFSのデータをインデックス化し、GraphQLを使用してクエリを実行するためのプロトコル。_**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [ドキュメンテーション](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [Discord](https://thegraph.com/discord)

**Alchemy SDK -** **_強化されたAPIを備えたEthers.jsのラッパー。_**

- [ドキュメンテーション](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_EthereumのためのTypeScriptインターフェース。_**

- [ドキュメンテーション](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Drift -** **_組み込みのキャッシュ、フック、テストモックを備えたTypeScriptメタライブラリ。_**

- [ドキュメンテーション](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## 参考リンク{#further-reading}

_役に立つコミュニティリソースを知っていますか? Edit this page and add it!_

## 関連トピック{#related-topics}

- [ノードとクライアント](/developers/docs/nodes-and-clients/)
- [開発フレームワーク](/developers/docs/frameworks/)

## 関連チュートリアル {#related-tutorials}

- [JavaScriptでイーサリアムブロックチェーンを使用するためのWeb3.jsのセットアップ](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– プロジェクトでweb3.jsをセットアップする手順。_
- [JavaScriptからスマートコントラクトを呼び出す](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAIトークンを使用して、JavaScriptからコントラクト関数を呼び出す方法を説明します。_
- [web3とAlchemyを使用したトランザクションの送信](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– バックエンドからトランザクションを送信するためのステップバイステップのウォークスルー。_
