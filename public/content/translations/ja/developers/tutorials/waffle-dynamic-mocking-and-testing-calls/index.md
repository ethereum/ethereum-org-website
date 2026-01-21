---
title: "Waffle: 動的モッキングとコントラクト呼び出しのテスト"
description: 動的モッキングとコントラクト呼び出しのテストのためのWaffle上級チュートリアル
author: "Daniel Izdebski"
tags: [ "waffle", "スマート契約", "Solidity", "テスト", "モックアップ作成" ]
skill: intermediate
lang: ja
published: 2020-11-14
---

## このチュートリアルについて {#what-is-this-tutorial-about}

このチュートリアルでは、以下の方法を学びます:

- 動的モッキングの使用
- スマートコントラクト間のインタラクションをテストする

前提知識：

- `Solidity`で簡単なスマートコントラクトを記述する方法をすでに知っている
- `JavaScript`と`TypeScript`に精通している
- 他の`Waffle`チュートリアルを完了したか、`Waffle`についてある程度の知識がある

## 動的モッキング {#dynamic-mocking}

動的モッキングはなぜ便利なのでしょうか？ これにより、統合テストの代わりに単体テストを作成できます。 これは何を意味するのでしょうか。 つまり、スマートコントラクトの依存関係を気にする必要がなく、完全に分離してすべてのテストを行えるということです。 その具体的な方法をご紹介します。

### **1. プロジェクト** {#1-project}

始める前に、簡単なnode.jsプロジェクトを準備する必要があります。

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# またはnpmを使用している場合
npm init
```

まず、TypeScriptとテストの依存関係であるmochaとchaiを追加しましょう。

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# またはnpmを使用している場合
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

では、`Waffle`と`ethers`を追加しましょう:

```bash
yarn add --dev ethereum-waffle ethers
# またはnpmを使用している場合
npm install ethereum-waffle ethers --save-dev
```

これで、プロジェクトの構成は以下のようになります:

```
.
├── contracts
├── package.json
└── test
```

### **2. スマートコントラクト** {#2-smart-contract}

動的モッキングを開始するには、依存関係のあるスマートコントラクトが必要です。 ご心配なく。こちらで用意してあります。

これは`Solidity`で書かれた簡単なスマートコントラクトで、唯一の目的は私たちがお金持ちかどうかをチェックすることです。 ERC20トークンを使って、十分なトークンを保有しているかチェックします。 これを`./contracts/AmIRichAlready.sol`に配置してください。

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

動的モッキングを使いたいので、ERC20全体は必要ありません。そのため、関数が1つだけのIERC20インターフェースを使用しています。

では、このコントラクトをビルドしましょう。 そのために`Waffle`を使用します。 まず、コンパイルオプションを指定する簡単な`waffle.json`設定ファイルを作成します。

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

これでWaffleでコントラクトをビルドする準備ができました:

```bash
npx waffle
```

簡単でしょう？ `build/`フォルダに、コントラクトとインターフェースに対応する2つのファイルが作成されました。 これらは後でテストに使用します。

### **3. テスト** {#3-testing}

実際のテストのために、`AmIRichAlready.test.ts`というファイルを作成しましょう。 まず、インポートを記述します。 これらは後で必要になります:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

JSの依存関係とは別に、ビルドしたコントラクトとインターフェースをインポートする必要があります:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffleはテストに`chai`を使用します。 ただし、使用する前にWaffleのマッチャーをchai自体に注入する必要があります:

```typescript
use(solidity)
```

各テストの前にコントラクトの状態をリセットする`beforeEach()`関数を実装する必要があります。 まず、そこで何が必要になるかを考えてみましょう。 コントラクトをデプロイするには、ウォレットと、`AmIRichAlready`コントラクトの引数として渡すためのデプロイ済みERC20コントラクトの2つが必要です。

まず、ウォレットを作成します:

```typescript
const [wallet] = new MockProvider().getWallets()
```

次に、ERC20コントラクトをデプロイする必要があります。 ここが難しいところです。インターフェースしかありません。 ここでWaffleが助けになります。 Waffleには、インターフェースのABIのみを使用してコントラクトを作成する、魔法のような`deployMockContract()`関数があります:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

ウォレットとデプロイ済みのERC20の両方を使用して、`AmIRichAlready`コントラクトをデプロイできます:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

以上で、`beforeEach()`関数は完成です。 ここまでの`AmIRichAlready.test.ts`ファイルは以下のようになります:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

`AmIRichAlready`コントラクトの最初のテストを書きましょう。 テストでは何をすべきだと思いますか？ ええ、その通りです！ 私たちがお金持ちかどうかをチェックすべきですね :)

しかし、少し待ってください。 モックコントラクトは、どの値を返すかどうやって知るのでしょうか？ `balanceOf()`関数のロジックを実装していません。 ここでもWaffleが役立ちます。 モックコントラクトには、このような新しい気の利いた機能が追加されました:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

この知識をもとに、ようやく最初のテストを書くことができます:

```typescript
it("ウォレットの保有するトークンが1,000,000未満の場合にfalseを返す", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

このテストを分解してみましょう:

1. モックERC20コントラクトが常に999,999トークンの残高を返すように設定します。
2. `contract.check()`メソッドが`false`を返すかどうかを確認します。

準備ができたので、実行してみましょう。

![1つのテストが合格](./test-one.png)

テストは動作しますが、しかし... まだ改善の余地があります。 `balanceOf()`関数は常に99999を返します。 実際のコントラクトのように、関数が値を返すウォレットを指定することで改善できます:

```typescript
it("ウォレットの保有するトークンが1,000,001未満の場合にfalseを返す", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

ここまでは、十分にお金持ちでない場合のみをテストしました。 代わりに、その逆をテストしてみましょう:

```typescript
it("ウォレットが少なくとも1,000,001トークンを保有している場合にtrueを返す", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

テストを実行すると...

![2つのテストが合格](test-two.png)

...これで完了です！ コントラクトは意図通りに動作しているようです :)

## コントラクト呼び出しのテスト {#testing-contract-calls}

これまでの作業をまとめましょう。 `AmIRichAlready`コントラクトの機能をテストし、正しく動作しているようです。 これで完了ということですよね？ 必ずしもそうではありません。 Waffleを使えば、コントラクトをさらにテストすることができます。 しかし、具体的にはどうやって？ Waffleには、`calledOnContract()`と`calledOnContractWith()`というマッチャーが用意されています。 これらにより、コントラクトがERC20モックコントラクトを呼び出したかどうかをチェックできます。 これらのマッチャーの1つを使用した基本的なテストは次のとおりです:

```typescript
it("コントラクトがERC20トークンでbalanceOfを呼び出したかチェックする", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

先ほどお話ししたもう一方のマッチャーで、このテストをさらに改善することができます:

```typescript
it("コントラクトがERC20トークンで特定のウォレットに対してbalanceOfを呼び出したかチェックする", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

テストが正しいかチェックしましょう:

![3つのテストが合格](test-three.png)

素晴らしい、すべてのテストに合格しました。

Waffleを使ったコントラクト呼び出しのテストは非常に簡単です。 そして、ここからが一番すごいところです。 これらのマッチャーは、通常のコントラクトとモックコントラクトの両方で動作します！ これは、他の技術で一般的なテストライブラリのようにコードを注入するのではなく、WaffleがEVM呼び出しを記録・フィルタリングするためです。

## ゴール {#the-finish-line}

おめでとうございます！ これで、Waffleを使ってコントラクト呼び出しをテストし、コントラクトを動的にモックする方法がわかりました。 他にも発見すべき興味深い機能がたくさんあります。 Waffleのドキュメンテーションを深く読んでみることをお勧めします。

Waffleのドキュメンテーションは[こちら](https://ethereum-waffle.readthedocs.io/)でご覧いただけます。

このチュートリアルのソースコードは[こちら](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls)にあります。

こちらもおすすめのチュートリアルです:

- [Waffleでスマートコントラクトをテストする](/developers/tutorials/waffle-test-simple-smart-contract/)
