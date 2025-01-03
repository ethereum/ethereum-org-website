---
title: "Waffleを使った動的モックアップの活用およびコントラクト呼び出しのテスト"
description: 動的モックアップの活用およびコントラクト呼び出しのテストについてのWaffle上級者向けチュートリアル
author: "Daniel Izdebski"
tags:
  - "Waffle"
  - "スマートコントラクト"
  - "Solidity"
  - "テスト"
  - "モックアップ作成"
skill: intermediate
lang: ja
published: 2020-11-14
---

## チュートリアルの内容 {#what-is-this-tutorial-about}

このチュートリアルでは、以下について学びます：

- 動的モックアップの使用方法
- スマートコントラクト間のやりとりをテストする方法

前提知識：

- `Solidity`でシンプルなスマートコントラクトを書ける
- `JavaScript`と`TypeScript`が扱える
- 他の`Waffle`のチュートリアルを受講したか、ある程度知識がある

## 動的モックアップ {#dynamic-mocking}

動的モックアップにはどのような利点があるでしょうか？ まず、統合テストではなく、単体テストを書くことができるという点が挙げられます。 どういう意味かと言うと、 スマートコントラクトの依存関係について心配する必要がないので、個々のスマートコントラクトを完全に隔離した状態でテストできるのです。 それでは、その方法を具体的に見ていきましょう。

### **1. プロジェクト** {#1-project}

まずはじめに、シンプルなnode.jsのプロジェクトを作成します。

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# or if you're using npm
npm init
```

次に、mochaとchaiの依存関係をテストするtypescriptを追加します。

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# or if you're using npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

さらに、`Waffle`と`ethers`も追加します。

```bash
yarn add --dev ethereum-waffle ethers
# or if you're using npm
npm install ethereum-waffle ethers --save-dev
```

これにより、プロジェクトの構造は次のようになっているはずです：

```
。
├── contracts
├── package.json
└── test
```

### **2. スマートコントラクト** {#2-smart-contract}

動的モックアップを使用するには、依存関係を含むスマートコントラクトが必要です。 こちらで用意してありますので、ご心配なく！

今回は`Solidity`で書かれたシンプルなスマートコントラクトを使用しますが、このコントラクトの唯一の目的は、私たちがお金持ちであるかを確認することです。 つまり、十分なERC-20トークンを保有しているかどうかを確認するだけのスマートコントラクトです。 このコードを、`./contracts/AmIRichAlready.sol`に追加します。

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

動的モックアップで使用するだけなので、ERC-20全体は必要なく、関数を1つだけ持つIERC-20インターフェイスを使います。

さっそく、コントラクトをビルドしましょう！ ビルドには、`Waffle`を使用します。 まず、コンパイルのオプションを指定するシンプルな`waffle.json`設定ファイルを作成します。

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

さて、Waffleでコントラクトをビルドする準備が整いました。

```bash
npx waffle
```

簡単ですね。 `build/`フォルダ内に、コントラクトとインターフェイスに対応する2つのファイルが現れました。 これらのファイルを使ってテストを行います。

### **3. テストを実行する** {#3-testing}

実際にテストするために、`AmIRichAlready.test.ts`という名前のファイルを作成します。 まずはじめに、インポートを可能にしなければなりません。 これは、後ほど必要になります：

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

JSの依存関係の他に、ビルドしたコントラクトとインターフェイスをインポートする必要があります：

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffleでは、`chai`を使ってテストを実行します。 ただしその前に、Waffleのマッチャーをchaiに追加する必要があります：

```typescript
use(solidity)
```

各テストの実行前にコントラクトの状態をリセットするため、`beforeEach()`関数を実装する必要があります。 まず、この関数には何が必要かを考えてみましょう。 コントラクトをデプロイするには、ウォレットと、`AmIRichAlready`コントラクトに引数として渡すためのデプロイされたERC-20コントラクトが必要です。

まず、ウォレットを作成します：

```typescript
const [wallet] = new MockProvider().getWallets()
```

次に、ERC-20コントラクトをデプロイする必要があります。 今のところ、私たちはインターフェイスしか持っていないので、工夫が必要になります。 ここで、Waffleが助けてくれます。 Waffleには、インターフェイスの_ABI_だけを使用してコントラクトを作成できる、魔法のような`deployMockContract()`関数が含まれているのです。

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

ウォレットとデプロイされたERC-20コントラクトの両方が準備できたので、さっそく`AmIRichAlready`コントラクトをデプロイしましょう：

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

これで、`beforeEach()`関数が作成できました。 現在のところ、 `AmIRichAlready.test.ts`のファイルは以下のようになっているはずです：

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

この`AmIRichAlready`コントラクトの最初のテストを書きましょう。 テストの対象は何にすべきだと思いますか？ 言うまでもなく、 私たちがお金持ちであるかをチェックするのですね :)

でもちょっと待ってください。 今作成したコントラクトでは、どのような値を返すべきかを指定していませんでした。 `balanceOf()`関数のロジックが実装されていないからです。 ここでもWaffleが助けてくれます。 モックアップを作成したコントラクトには、新たに以下のような素敵なコードが付け加えられています：

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

これを知っていれば、最初のテストを書くことができます。

```typescript
it("returns false if the wallet has less than 1000000 tokens", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

このテストを、構成要素に分解してみましょう：

1. モックアップのERC-20コントラクトは、常に、999999トークンの残高を返すように設定します。
2. `contract.check()`メソッドが、`false`を返すか確認します。

ようやく、テストを実行する準備ができました。

![1つのテストが合格](./test-one.png)

テストは実行されましたが・・・改善の余地がありますね。 `balanceOf()`関数は、常に99999を返します。 実際のコントラクトのように、関数が値を返すウォレットを指定するともっとテストらしくなるでしょう。

```typescript
it("returns false if the wallet has less than 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

このテストでは、今のところ、私たちが十分にお金持ちではない場合のみをチェックしています。 次に、その反対もチェックできるようにしてみましょう：

```typescript
it("returns true if the wallet has at least 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

テストを実行します・・・

![2つのテストが合格](test-two.png)

そして・・・うまく行きました！ 私たちのコントラクトは、意図したとおりに動作しているようです :)

## コントラクトの呼び出しをテストする {#testing-contract-calls}

これまでの進展をまとめておきましょう。 `AmIRichAlready`コントラクトの機能をテストし、正常に動作していることが確認できたようです。 これで終わりだろうって？ いいえ、まだ少し残っています。 Waffeを使えば、さらに多くの事項をテストすることができます。 具体的に説明すると、 Waffleには`calledOnContract()`マッチャーと`calledOnContractWith()`マッチャーが搭載されています。 これらを使えば、作成したコントラクトがモックアップのERC-20コントラクトを呼び出したかどうかを確認できるのです。 いずれかのマッチャーを使用した基本的なテストは、次のようになります：

```typescript
it("checks if contract called balanceOf on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

もう一方のマッチャーを使用することで、さらにこのテストを充実させることができます：

```typescript
it("checks if contract called balanceOf with certain wallet on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

テストがうまく行ったか確認しましょう：

![3つのテストが合格](test-three.png)

幸いなことに、すべてのテストに合格しました。

Waffleを使えば、コントラクトの呼び出しをとても簡単にテストできます。 特にすばらしいのは、 これらのマッチャーを通常のコントラクトとモックアップのコントラクトの両方に使えることです！ 他のテクノロジー向けの人気が高いテストライブラリと同じように、Waffleは、コードを挿入するのではなく、EVM呼び出しを記録し、フィルタ処理を行うアプローチを採用しています。

## おわりに {#the-finish-line}

おめでとうございます！ これで、Waffleを使用して、コントラクトの呼び出しや、モックアップのコントラクトを動的にテストする方法を身に付けることができました。 この他にもたくさんの興味深い機能がありますので、 Waffleのドキュメンテーションに目を通すことをおすすめします。

Waffleのドキュメンテーションは、[こちら](https://ethereum-waffle.readthedocs.io/)から入手できます。

このチュートリアルのソースコードは、[こちら](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls)からアクセスできます。

さらに、以下のチュートリアルをおすすめします：

- [Waffleを使ってスマートコントラクトをテストする](/developers/tutorials/testing-smart-contract-with-waffle/)
