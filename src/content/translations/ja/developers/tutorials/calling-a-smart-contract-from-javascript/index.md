---
title: JavaScriptからスマートコントラクトを呼び出す
description: Daiトークンを使ってJavaScriptでスマートコントラクトを呼び出す方法
author: jdourlens
tags:
  - "トランザクション"
  - "フロントエンド"
  - "JavaScript"
  - "web3.js"
skill: beginner
lang: ja
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

このチュートリアルでは、JavaScript から[スマートコントラクト](/developers/docs/smart-contracts/)関数を呼び出す方法を見ていきます。 最初はスマートコントラクトの状態(ERC20 保有者の残高など)を読み取り、次にトークンの送金を行うことでブロックチェーンの状態を変更します。 [JS 環境を設定して](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)ブロックチェーンと対話することにはすでに慣れているはずです。

今回の例では、DAI トークンを使います。テストのために、ganache-cli を使ってブロックチェーンをフォークし、すでに大量の DAI を持っているアドレスをアンロックします。

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

スマートコントラクトと対話するのに必要なアドレスと ABI:

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

今回は、完全な ERC20 ABI ではなく、簡略化して`balanceOf`と`transfer`関数だけを残しました。ERC20 ABI の完全版は[こちら](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/)でご覧いただけます。

次に、スマートコントラクトをインスタンス化する必要があります。

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

次の 2 つのアドレスも設定します：

- 送金先アドレス
- アンロック済みの送金元アドレス

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

次のパートでは、両方のアドレスが保有している現在のトークンの量を取得するために`balanceOf`関数を呼び出します。

## Call: スマートコントラクトから値を読み込む {#call-reading-value-from-a-smart-contract}

最初の例では、トランザクションを送信することなく、「constant」メソッドを呼び出し、スマートコントラクトメソッドを EVM で実行します。 そのために、まずはアドレスの ERC20 の残高を読み込みます。 [ERC20 トークンに関する記事](/developers/tutorials/understand-the-erc-20-token-smart-contract/)をご覧ください。

ABI を提供した、インスタンス化されたスマートコントラクトのメソッドには、`yourContract.methods.methodname`でアクセスできます。 `call`関数を使用して、関数を実行した結果を受け取ることができます。

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("エラーが発生しました。", err)
    return
  }
  console.log("残高は: ", res)
})
```

ERC20 の DAI には 18 桁の 0 があり、正しい数値を得るためには 18 桁の 0 を削除する必要があります。 Javascript は大きな数値を扱えないため、uint256 は文字列で返されます。 JavaScript で大きな数字を扱う方法がご不明の場合、[JavaScript で大きな数字を扱う bignumber.js のチュートリアルをご覧ください。](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)

## send: スマートコントラクト関数にトランザクションを送信する {#send-sending-a-transaction-to-a-smart-contract-function}

2 番目の例では、DAI スマートコントラクトの transfer 関数を呼び出し、2 番目のアドレスに 10DAI を送信します。 この transfer 関数では、受取人のアドレスと送金するトークン数の 2 つのパラメータが必要です。

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("エラーが発生しました。", err)
      return
    }
    console.log("トランザクションのハッシュ: " + res)
  })
```

また、call 関数は、ブロックチェーンに組み込まれるトランザクションのハッシュを返します。 イーサリアムではトランザクションハッシュを予測できるため、トランザクションが実行される前にハッシュを取得することができます([ここでハッシュの計算方法を学びます](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction))。

関数はブロックチェーンにトランザクションを送るだけなので、マイニングされてブロックチェーンに組み込まれるまで結果は分かりません。 次のチュートリアルでは、[ハッシュ](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)を使用してブロックチェーンでトランザクションが実行されるのを待つ方法を学びます。
