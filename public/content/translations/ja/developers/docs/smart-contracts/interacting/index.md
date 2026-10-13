---
title: スマート・コントラクトとのやり取り
description: イーサリアム上にすでにデプロイされているスマート・コントラクトからデータを読み取ったり、データを書き込んだりする方法を学びます。
lang: ja
---

常に独自のスマート・コントラクトを記述してデプロイする必要はありません。開発者としては、他の人がすでにイーサリアムネットワークにデプロイしたスマート・コントラクトとやり取りしたい場合がほとんどです。

このページでは、スマート・コントラクトとやり取りするための2つの基本的な方法（データの**読み取り**と**書き込み**）と、その両方を行うために必要なツールについて説明します。

## 前提条件 {#prerequisites}

以下について理解している必要があります。

- [スマート・コントラクトの仕組み](/developers/docs/smart-contracts/)
- [イーサリアムのアカウントとトランザクションの署名方法](/developers/docs/accounts/)
- [トランザクションとは何か](/developers/docs/transactions/)

## スマート・コントラクトとやり取りする2つの方法 {#two-ways}

スマート・コントラクトとのやり取りは、2つのカテゴリに分類されます。

### コントラクトからの読み取り {#reading-from-a-contract}

読み取りは**無料**の操作であり、トランザクションを作成せず、ブロックチェーン上の状態を変更することもありません。

コントラクトから読み取る場合、単にすでに存在するデータをクエリしているだけです。例：

- ERC-20トークンの残高の確認
- 分散型取引所からの現在の価格の読み取り
- NFTの所有者の取得

読み取りは状態を変更しないため、[ガス](/developers/docs/gas/)を消費せず、ETHを必要とせずに誰でも実行できます。

### コントラクトへの書き込み {#writing-to-a-contract}

書き込みは**状態を変更する**操作であり、トランザクションを必要とし、ガスを消費します。

コントラクトに書き込む場合、ブロックチェーンの状態を変更する関数をトリガーします。例：

- トークンの送金
- 分散型取引所でのトークンのスワップ
- NFTのミンティング

書き込みには常に以下が必要です。

1. ガス代として十分なETHを持つ[外部所有アカウント（EOA）](/developers/docs/accounts/#types-of-account)
2. アカウントの秘密鍵によって署名されたトランザクション
3. トランザクションがマイニングされ、ブロックに含まれること

[アカウント抽象化](/roadmap/account-abstraction/)を使用すると、スマート・コントラクトアカウントも書き込みを開始でき、ペイマスターがユーザーの代わりにガス代を負担できるため、ETHを保持するEOAは厳密には必要ありません。

## コントラクトABIの理解 {#understanding-contract-abis}

スマート・コントラクトとやり取りするには、アプリケーションがコントラクトに*何が*できるかを知る必要があります。ここで**アプリケーション・バイナリ・インターフェース（ABI）**の出番となります。

ABIは、以下を記述するJSONドキュメントです。

- コントラクトが公開するすべての関数（名前、入力、出力）
- コントラクトが発行できるすべてのイベント
- コントラクトと通信する際のデータのエンコードおよびデコード方法

ABIはコントラクトの取扱説明書と考えてください。これがないと、アプリケーションはどの関数が存在するのか、どのようなパラメータを期待しているのかを知ることができません。

### コントラクトのABIを見つける場所 {#where-to-find-abis}

- **Etherscan上の検証済みコントラクト** - [Etherscan](https://etherscan.io)は、検証済みのソースコードのABIを自動的に公開します。
- **開発者から** - 多くのプロジェクトは、ドキュメントやnpmパッケージでABIを公開しています。
- **ソースからの生成** - Solidityのソースコードがある場合は、それを[コンパイル](/developers/docs/smart-contracts/compiling/)してABIを生成できます。

## コントラクトとやり取りするためのツールとライブラリ {#tools-and-libraries}

開発者は通常、Webアプリ、バックエンド、またはスクリプトからコントラクトとやり取りするために、JavaScript/TypeScriptライブラリを使用します。

### クライアントライブラリ（JavaScript/TypeScript） {#client-libraries}

- **[Viem](https://viem.sh)** - ファーストクラスの型安全性を備えた、イーサリアム向けのモダンで軽量なTypeScriptインターフェース
- **[ethers.js](https://docs.ethers.org/)** - イーサリアムブロックチェーンとやり取りするための実戦テスト済みのライブラリ
- **[Web3.js](https://web3js.org/)** - オリジナルのイーサリアムJavaScript API

### バックエンドライブラリ {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** - サーバーサイドスクリプトやボット向けにNode.jsでも動作します。
- **[Web3.py](https://web3py.readthedocs.io/)** - イーサリアムとやり取りするためのPythonライブラリ
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** - Gethチームによる公式のGoライブラリ

### 例：Viemを使用したトークン残高の読み取り {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDCのコントラクトアドレスとABI（balanceOf用の一部）
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDCの小数点以下は6桁
```

### 例：ethers.jsを使用したトランザクションの送信 {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20のtransferのABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // トランザクションがマイニングされるのを待つ
console.log(`Transferred! TX: ${tx.hash}`)
```

## イベントとログ {#events-and-logs}

スマート・コントラクトは、何かが起こったことを知らせるために**イベント**を発行できます。アプリケーションはこれらのイベントをリッスンして、リアルタイムで反応することができます。

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// USDCのTransferイベントを監視する
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## トランザクションのシミュレーション {#simulating}

トランザクションを送信する前に、それを**シミュレーション**して、ガスを消費することなく成功するかどうかを確認し、その戻り値を見ることができます。これは、エラーを早期に発見したり、結果をプレビューしたりするのに役立ちます。

ほとんどのクライアントライブラリは、`eth_call`を通じてこれをサポートしています。

```ts
// Viemを使用する場合
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## ウォレットと署名 {#wallets-and-signing}

分散型アプリケーション (dapp) では、ユーザーのウォレット（メタマスク、Rainbow、WalletConnectなど）が署名を処理します。秘密鍵を直接管理することはありません。

[ウォレットライブラリと接続ツール](/developers/docs/apis/javascript/)はこれを抽象化するため、アプリケーションロジックの構築に集中できます。

## 関連チュートリアル {#related-tutorials}

- [JavaScriptからスマート・コントラクトを呼び出す](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Web3.jsとAlchemyを使用したトランザクションの送信](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [ウォレットでNFTを表示する方法](/developers/tutorials/how-to-view-nft-in-metamask/)

## 参考文献 {#further-reading}

- [Viemドキュメント：コントラクトへの読み取りと書き込み](https://viem.sh/docs/contract/readContract)
- [ethers.jsドキュメント：コントラクト](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI仕様](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [ABIとは何か？ - Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## 関連トピック {#related-topics}

- [スマート・コントラクトのコンパイル](/developers/docs/smart-contracts/compiling/)
- [スマート・コントラクトのデプロイ](/developers/docs/smart-contracts/deploying/)
- [JavaScript API](/developers/docs/apis/javascript/)
- [バックエンドAPI](/developers/docs/apis/backend/)