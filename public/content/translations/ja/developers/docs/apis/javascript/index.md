---
title: JavaScript APIライブラリ
description: アプリケーションからブロックチェーンと対話するためのJavaScriptクライアントライブラリの紹介。
lang: ja
---

Webアプリがイーサリアムのブロックチェーンと対話する（つまり、ブロックチェーンのデータを読み取ったり、ネットワークにトランザクションを送信したりする）ためには、イーサリアムのノードに接続する必要があります。

この目的のために、すべてのイーサリアムクライアントは[JSON-RPC](/developers/docs/apis/json-rpc/)仕様を実装しているため、アプリケーションが依存できる統一された[メソッド](/developers/docs/apis/json-rpc/#json-rpc-methods)のセットが存在します。

JavaScriptを使用してイーサリアムのノードに接続する場合、バニラJavaScriptを使用することも可能ですが、エコシステム内にはこれをはるかに簡単にする便利なライブラリがいくつか存在します。これらのライブラリを使用すると、開発者は直感的な1行のメソッドを記述するだけで、イーサリアムと対話するJSON-RPCリクエストを（内部的に）初期化できます。

[マージ](/roadmap/merge/)以降、ノードを実行するには、実行クライアントとコンセンサス・クライアントという2つの接続されたイーサリアムソフトウェアが必要になることに注意してください。ノードに実行クライアントとコンセンサス・クライアントの両方が含まれていることを確認してください。ノードがローカルマシン上にない場合（例：ノードがAWSインスタンスで実行されている場合）は、チュートリアルのIPアドレスを適宜更新してください。詳細については、[ノードの実行](/developers/docs/nodes-and-clients/run-a-node/)に関するページをご覧ください。

## 前提条件 {#prerequisites}

JavaScriptを理解することに加えて、[イーサリアムスタック](/developers/docs/ethereum-stack/)と[イーサリアムクライアント](/developers/docs/nodes-and-clients/)について理解しておくと役立つ場合があります。

## なぜライブラリを使用するのか？ {#why-use-a-library}

これらのライブラリは、イーサリアムのノードと直接対話する際の複雑さの多くを抽象化します。また、ユーティリティ関数（例：ETHからGweiへの変換）も提供するため、開発者はイーサリアムクライアントの複雑な処理に費やす時間を減らし、アプリケーション独自の機能に集中する時間を増やすことができます。

## ライブラリの機能 {#library-features}

### イーサリアムのノードへの接続 {#connect-to-ethereum-nodes}

プロバイダーを使用することで、これらのライブラリはイーサリアムに接続し、JSON-RPC、Infura、Etherscan、Alchemy、メタマスクのいずれを経由する場合でも、そのデータを読み取ることができます。

> **警告:** Web3.jsは2025年3月4日にアーカイブされました。[発表を読む](https://blog.chainsafe.io/web3-js-sunset/)。新しいプロジェクトでは、[ethers.js](https://ethers.またはg)や[viem](https://viem.sh)などの代替ライブラリの使用を検討してください。

**Ethersの例**

```js
// BrowserProviderは標準のWeb3プロバイダーをラップします。これは
// メタマスクが各ページにwindow.ethereumとして注入するものです
const provider = new ethers.BrowserProvider(window.ethereum)

// メタマスクのプラグインは、トランザクションに署名して
// イーサを送信し、ブロックチェーン内の状態を変更するための支払いをすることも可能にします。
// このためには、アカウントの署名者（signer）が必要です...
const signer = provider.getSigner()
```

**Web3jsの例**

```js
var web3 = new Web3("http://localhost:8545")
// または
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// プロバイダーの変更
web3.setProvider("ws://localhost:8546")
// または
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// node.jsでIPCプロバイダーを使用する
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // Mac OSのパス
// or
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // Mac OSのパス
// Windowsでのパス: "\\\\.\\pipe\\geth.ipc"
// Linuxでのパス: "/users/myuser/.ethereum/geth.ipc"
```

セットアップが完了すると、ブロックチェーンに対して以下のクエリを実行できるようになります。

- ブロック番号
- ガスの見積もり
- スマート・コントラクトのイベント
- ネットワークID
- その他...

### ウォレット機能 {#wallet-functionality}

これらのライブラリは、ウォレットの作成、キーの管理、トランザクションの署名を行う機能を提供します。

以下はEthersの例です。

```js
// ニーモニックからウォレットのインスタンスを作成します...
mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
walletMnemonic = Wallet.fromPhrase(mnemonic)

// ...または秘密鍵から作成します
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.address === walletPrivateKey.address
// true

// Signer APIによるPromiseとしてのアドレス
walletMnemonic.getAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// ウォレットのアドレスは同期的にも利用可能です
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
//       ニーモニックがありません（派生により防がれます）
walletPrivateKey.mnemonic
// null

// メッセージの署名
walletMnemonic.signMessage("Hello World")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.parseEther("1.0"),
}

// トランザクションの署名
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// connectメソッドは、プロバイダーに接続された
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

[ドキュメント全文を読む](https://docs.ethers.io/v5/api/signer/#Wallet)

セットアップが完了すると、以下のことができるようになります。

- アカウントの作成
- トランザクションの送信
- トランザクションの署名
- その他...

### スマート・コントラクトの関数との対話 {#interact-with-smart-contract-functions}

JavaScriptクライアントライブラリを使用すると、コンパイルされたコントラクトのアプリケーション・バイナリ・インターフェース（ABI）を読み取ることで、アプリケーションからスマート・コントラクトの関数を呼び出すことができます。

ABIは基本的にコントラクトの関数をJSON形式で説明するものであり、通常のJavaScriptオブジェクトのように使用できるようにします。

したがって、以下のSolidityコントラクトは：

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

次のようなJSONになります。

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

これにより、以下のことが可能になります。

- スマート・コントラクトにトランザクションを送信し、そのメソッドを実行する
- EVMで実行された場合にメソッドの実行にかかるガスを見積もるために呼び出す
- コントラクトをデプロイする
- その他...

### ユーティリティ関数 {#utility-functions}

ユーティリティ関数は、イーサリアムでの構築を少し簡単にする便利なショートカットを提供します。

ETHの値はデフォルトでWei単位です。1 ETH = 1,000,000,000,000,000,000 WEIであり、これは非常に大きな数値を扱うことを意味します！`web3.utils.toWei`は、イーサをWeiに変換してくれます。

Ethersでは次のようになります。

```js
// アカウントの残高を取得する（アドレスまたはENS名による）
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// 多くの場合、ユーザー向けに出力をフォーマットする必要があります
// ユーザーは（Weiではなく）イーサで値を見ることを好むためです
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Web3jsのユーティリティ関数](https://docs.web3js.org/api/web3-utils)
- [Ethersのユーティリティ関数](https://docs.ethers.org/v6/api/utils/)

## 利用可能なライブラリ {#available-libraries}

**Web3.js -** **_イーサリアムJavaScript API_**

- [ドキュメント](https://docs.web3js.org)
- [GitHub](https://github.com/ethereum/web3.js)

**Ethers.js -** **_JavaScriptおよびTypeScriptによる完全なイーサリアムウォレットの実装とユーティリティ_**

- [Ethers.js ホーム](https://ethers.org/)
- [ドキュメント](https://docs.ethers.io)
- [GitHub](https://github.com/ethers-io/ethers.js)

**The Graph -** **_イーサリアムおよびIPFSのデータをインデックス化し、GraphQLを使用してクエリを実行するためのプロトコル_**

- [The Graph](https://thegraph.com)
- [Graph Explorer](https://thegraph.com/explorer)
- [ドキュメント](https://thegraph.com/docs)
- [GitHub](https://github.com/graphprotocol)
- [ディスコード](https://thegraph.com/discord)

**Alchemy SDK -** **_強化されたAPIを備えたEthers.jsのラッパー_**

- [ドキュメント](https://www.alchemy.com/docs)
- [GitHub](https://github.com/alchemyplatform/alchemy-sdk-js)

**viem -** **_イーサリアムのためのTypeScriptインターフェース_**

- [ドキュメント](https://viem.sh)
- [GitHub](https://github.com/wagmi-dev/viem)

**Codex -** **_数十のチェーンにわたるリアルタイムで強化されたブロックチェーンデータAPI_**

- [ドキュメント](https://docs.codex.io)
- [エクスプローラー](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [ディスコード](https://discord.com/invite/mFpUhT3vAq)

**Drift -** **_キャッシュ、フック、テストモックが組み込まれたTypeScriptメタライブラリ_**

- [ドキュメント](https://ryangoree.github.io/drift/)
- [GitHub](https://github.com/ryangoree/drift/)

## 参考文献 {#further-reading}

_役に立ったコミュニティリソースをご存知ですか？このページを編集して追加してください！_

## 関連トピック {#related-topics}

- [ノードとクライアント](/developers/docs/nodes-and-clients/)
- [開発フレームワーク](/developers/docs/frameworks/)

## 関連チュートリアル {#related-tutorials}

- [JavaScriptでイーサリアムのブロックチェーンを使用するためのWeb3jsのセットアップ](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– プロジェクトでweb3.jsをセットアップするための手順。_
- [JavaScriptからのスマート・コントラクトの呼び出し](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAIトークンを使用して、JavaScriptでコントラクトの関数を呼び出す方法を確認します。_
- [Web3とAlchemyを使用したトランザクションの送信](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– バックエンドからトランザクションを送信するためのステップバイステップのウォークスルー。_

## チュートリアル：イーサリアム上のJavaScript APIとWebSocket {#tutorials}

- [WebSocketの使用](/developers/tutorials/using-websockets/) _– AlchemyでWebSocketを使用してイーサリアムのイベントをサブスクライブし、リアルタイムのJSON-RPCリクエストを行う方法。_