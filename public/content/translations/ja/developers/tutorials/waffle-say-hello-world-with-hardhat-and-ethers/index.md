---
title: "WaffleでHardhatとethersを使って「Hello world!」と出力するチュートリアル"
description: "Hardhatとethers.jsを使って、はじめてのWaffleプロジェクトを作成する"
author: "MiZiet"
tags:
  [
    "Waffle",
    "スマートコントラクト",
    "Solidity",
    "テスト",
    "Hardhat",
    "ethers.js"
  ]
skill: beginner
lang: ja
published: 2020-10-16
---

この[Waffle](https://ethereum-waffle.readthedocs.io)チュートリアルでは、[hardhat](https://hardhat.org/)と[ethers.js](https://docs.ethers.io/v5/)を使い、シンプルな「Hello world」スマートコントラクトプロジェクトをセットアップする方法を学びます。 次に、スマートコントラクトに新しい機能を追加する方法と、Waffleでそれをテストする方法を学びます。

まず、新しいプロジェクトを作成することから始めましょう:

```bash
yarn init
```

または

```bash
npm init
```

そして、必要なパッケージをインストールします:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

または

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

次のステップでは、`npx hardhat`を実行して、Hardhatのサンプルプロジェクトを作成します。

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Hardhat v2.0.3へようこそ 👷‍

? 何をしますか？ …
❯ サンプルプロジェクトを作成する
空のhardhat.config.jsを作成する
終了
```

「Create a sample project」を選択します

プロジェクトの構成は次のようになります:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributes
├── .gitignore
├── hardhat.config.js
└── package.json
```

### では、これらのファイルについて見ていきましょう: {#now-lets-talk}

- Greeter.sol - Solidityで書かれたスマートコントラクトです。

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("Deploying a Greeter with greeting:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

このスマートコントラクトは、3つの部分に分けられます:

1. constructor - `greeting`という名前のstring型変数を宣言します。
2. function greet - 呼び出されたときに`greeting`を返す関数です。
3. function setGreeting - `greeting`の値を変更できるようにする関数です。

- sample-test.js - テストファイルです

```js
describe("Greeter", function () {
  it("変更されると新しい挨拶を返すはず", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### 次のステップでは、コントラクトのコンパイルとテストの実行を行います: {#compiling-and-testing}

Waffleのテストでは、Mocha (テストフレームワーク) とChai (アサーションライブラリ) を使用します。 `npx hardhat test`を実行し、次のメッセージが表示されるのを待つだけです。

```bash
✓ 変更されると新しい挨拶を返すはず
```

### ここまでは順調です。プロジェクトにもう少し複雑な機能を追加してみましょう <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

誰かが挨拶として空の文字列を追加する状況を想像してみてください。 それでは心のこもった挨拶にはなりませんよね？  
そうならないようにしてみましょう:

誰かが空の文字列を渡した場合に、Solidityの`revert`を使いたいと思います。 幸いなことに、WaffleのChaiマッチャー`to.be.revertedWith()`を使えば、この機能を簡単にテストできます。

```js
it("空の文字列を渡したときにリバートするはず", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Greeting should not be empty"
  )
})
```

新しいテストはパスしなかったようです:

```bash
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to 'Hola, mundo!'
    ✓ 変更されると新しい挨拶を返すはず (1514ms)
Deploying a Greeter with greeting: Hello, world!
Changing greeting from 'Hello, world!' to ''
    1) 空の文字列を渡したときにリバートするはず


  1件成功 (2s)
  1件失敗
```

この機能をスマートコントラクトに実装しましょう:

```solidity
require(bytes(_greeting).length > 0, "Greeting should not be empty");
```

これで、setGreeting関数は次のようになります:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Greeting should not be empty");
console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
greeting = _greeting;
}
```

もう一度テストを実行してみましょう:

```bash
✓ 変更されると新しい挨拶を返すはず (1467ms)
✓ 空の文字列を渡したときにリバートするはず (276ms)

2件成功 (2s)
```

おめでとうございます！ やり遂げましたね :)

### 結論 {#conclusion}

Waffle、Hardhat、ethers.jsを使ってシンプルなプロジェクトを作成しました。 プロジェクトのセットアップ、テストの追加、新機能の実装方法を学びました。

スマートコントラクトをテストするための、さらに優れたChaiマッチャーについては、[Waffleの公式ドキュメント](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html)を確認してください。
