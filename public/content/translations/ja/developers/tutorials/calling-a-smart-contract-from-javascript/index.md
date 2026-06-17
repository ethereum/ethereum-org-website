---
title: "JavaScriptからスマート・コントラクトを呼び出す"
description: "Daiトークンの例を使用してJavaScriptからスマート・コントラクトの関数を呼び出す方法"
author: jdourlens
tags:
  - トランザクション
  - フロントエンド
  - JavaScript
  - web3.js
skill: beginner
breadcrumb: "JSからコントラクトを呼び出す"
lang: ja
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

このチュートリアルでは、JavaScriptから[スマート・コントラクト](/developers/docs/smart-contracts/)の関数を呼び出す方法を見ていきます。最初にスマート・コントラクトの状態（例：ERC-20保有者の残高）を読み取り、次にトークンの送金を行ってブロックチェーンの状態を変更します。すでに[ブロックチェーンと対話するためのJS環境のセットアップ](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)に慣れている必要があります。

この例ではDAIトークンを扱います。テスト目的で、ganache-cliを使用してブロックチェーンをフォークし、すでに大量のDAIを持っているアドレスをアンロックします。

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

スマート・コントラクトと対話するには、そのアドレスとABIが必要です。

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

このプロジェクトでは、完全なERC-20のABIを削り、`balanceOf`と`transfer`関数のみを保持していますが、[完全なERC-20のABIはこちら](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/)で確認できます。

次に、スマート・コントラクトをインスタンス化する必要があります。

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

また、2つのアドレスを設定します。

- 送金を受け取るアドレス
- すでにアンロックされている、送金を行うアドレス：

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

次のパートでは、`balanceOf`関数を呼び出して、両方のアドレスが現在保持しているトークンの量を取得します。

## Call: スマート・コントラクトからの値の読み取り {#call-reading-value-from-a-smart-contract}

最初の例では、「constant（定数）」メソッドを呼び出し、トランザクションを送信せずにEVM内でスマート・コントラクトのメソッドを実行します。このために、アドレスのERC-20残高を読み取ります。[ERC-20トークンに関する記事を読む](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。

ABIを提供してインスタンス化されたスマート・コントラクトのメソッドには、次のようにアクセスできます：`yourContract.methods.methodname`。`call`関数を使用することで、関数を実行した結果を受け取ることができます。

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

DAIのERC-20は18桁の小数部を持つため、正しい量を取得するにはゼロを18個取り除く必要があることを覚えておいてください。JavaScriptは大きな数値を処理できないため、uint256は文字列として返されます。[JSで大きな数値を扱う方法](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)がわからない場合は、bignumber.jsに関するチュートリアルを確認してください。

## Send: スマート・コントラクトの関数へのトランザクションの送信 {#send-sending-a-transaction-to-a-smart-contract-function}

2つ目の例では、DAIスマート・コントラクトの送金（transfer）関数を呼び出して、2つ目のアドレスに10 DAIを送金します。送金関数は、受信者のアドレスと送金するトークンの量の2つのパラメータを受け取ります。

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

呼び出し関数は、ブロックチェーンにマイニングされるトランザクションのハッシュを返します。イーサリアムでは、トランザクションのハッシュは予測可能です。そのため、実行される前にトランザクションのハッシュを取得することができます（[ハッシュの計算方法についてはこちらをご覧ください](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)）。

この関数はトランザクションをブロックチェーンに送信するだけなので、それがマイニングされてブロックチェーンに含まれるタイミングがわかるまで、結果を見ることはできません。次のチュートリアルでは、[ハッシュを知ることで、ブロックチェーン上でトランザクションが実行されるのを待つ方法](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)を学びます。