---
title: JavaScriptからスマートコントラクトを呼び出す
description: Daiトークンを例に、JavaScriptでスマートコントラクトの関数を呼び出す方法
author: jdourlens
tags: [ "トランザクション", "フロントエンド", "JavaScript", "web3.js" ]
skill: beginner
lang: ja
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

このチュートリアルでは、JavaScriptから[スマートコントラクト](/developers/docs/smart-contracts/)関数を呼び出す方法を見ていきます。 最初はスマートコントラクトの状態(ERC20保有者の残高など)を読み取り、次にトークンの送金を行うことでブロックチェーンの状態を変更します。 すでに[ブロックチェーンとやり取りするためのJS環境の設定](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/)に精通している必要があります。

今回の例では、DAIトークンを使います。テストのために、ganache-cliを使ってブロックチェーンをフォークし、すでに大量のDAIを持っているアドレスのロックを解除します。

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

スマートコントラクトとやり取りするには、そのアドレスとABIが必要です。

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

このプロジェクトでは、完全なERC20 ABIから`balanceOf`関数と`transfer`関数のみを残しました。完全なERC20のABIは[こちら](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/)で確認できます。

次に、スマートコントラクトをインスタンス化する必要があります。

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

また、2つのアドレスを設定します。

- 送金先のアドレス
- ロック解除済みの送金元アドレス:

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

次のパートでは、`balanceOf`関数を呼び出して、両方のアドレスが保有している現在のトークン量を取得します。

## コール：スマートコントラクトからの値の読み取り {#call-reading-value-from-a-smart-contract}

最初の例では、「constant」メソッドを呼び出し、トランザクションを送信することなく、EVMでスマートコントラクトメソッドを実行します。 そのために、アドレスのERC20残高を読み取ります。 [ERC20トークンに関する記事をお読みください](/developers/tutorials/understand-the-erc-20-token-smart-contract/)

ABIを提供してインスタンス化されたスマートコントラクトのメソッドには、`yourContract.methods.methodname`のようにアクセスできます。 `call`関数を使用することで、関数を実行した結果を受け取ることができます。

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("エラーが発生しました", err)
    return
  }
  console.log("残高は: ", res)
})
```

DAI ERC20は18桁の小数位を持つことを覚えておいてください。これは、正しい量を得るには、値から18個のゼロを削除する必要があることを意味します。 JavaScriptは大きな数値を扱えないため、uint256は文字列として返されます。 JSで大きな数値を扱う方法がわからない場合は、[bignumber.jsに関するチュートリアル](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/)をご覧ください。

## センド：スマートコントラクト関数へのトランザクションの送信 {#send-sending-a-transaction-to-a-smart-contract-function}

2番目の例では、DAIスマートコントラクトの`transfer`関数を呼び出して、2つ目のアドレスに10 DAIを送信します。 `transfer`関数は2つのパラメータを受け取ります。送金先のアドレスと送金するトークンの量です。

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("エラーが発生しました", err)
      return
    }
    console.log("トランザクションのハッシュ: " + res)
  })
```

`send`関数は、ブロックチェーンにマイニングされるトランザクションのハッシュを返します。 イーサリアムでは、トランザクションハッシュは予測可能です。そのため、トランザクションが実行される前にハッシュを取得できます([ハッシュの計算方法はこちら](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)をご覧ください)。

この関数はトランザクションをブロックチェーンに送信するだけなので、それがマイニングされブロックチェーンに含まれるまでは結果を確認できません。 次のチュートリアルでは、[ハッシュを使って、トランザクションがブロックチェーン上で実行されるのを待つ方法](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)を学びます。
