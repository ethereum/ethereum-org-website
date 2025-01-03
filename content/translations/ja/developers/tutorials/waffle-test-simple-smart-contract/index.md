---
title: Waffleライブラリを使用したシンプルなスマートコントラクトのテスト
description: 初心者用チュートリアル
author: Ewa Kowalska
tags:
  - "スマートコントラクト"
  - "Solidity"
  - "Waffle"
  - "テスト"
skill: beginner
lang: ja
published: 2021-02-26
---

## このチュートリアルでは、以下について学びます {#in-this-tutorial-youll-learn-how-to}

- ウォレットの残高が変わることのテスト
- 特定の引数でイベントが発行されることのテスト
- トランザクションが取り消されたことのアサーション

## 前提知識 {#assumptions}

- 新規のJavaScriptまたはTypeScriptのプロジェクトを作成できる
- JavaScriptのテストの基本的な経験がある
- yarnやnpmなどのパッケージマネージャーを使用したことがある
- スマートコントラクトおよびSolidityのごく基本的な知識を持っている

# はじめに {#getting-started}

このチュートリアルでは、yarnを使ってテストのセットアップおよび実行をしていますが、npmの方が良ければnpmでも問題ありません。公式のWaffleのドキュメントは、[こちら](https://ethereum-waffle.readthedocs.io/en/latest/index.html)になります。

## 依存関係のインストール {#install-dependencies}

プロジェクトに対してethereum-waffleとtypescriptの依存関係を開発環境の依存関係に[追加](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation)します。

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## スマートコントラクトのコード例 {#example-smart-contract}

このチュートリアルでは、EtherSplitterというシンプルなスマートコントラクトの例に取り組みます。 このコードでは、誰もがweiを送信でき、それを2つの事前定義された受信者間で均等に分割するだけです。 split関数ではweiの数が偶数でなければなりません。さもないと処理が取り消されます。 両方の受信者に対して、weiの送金を実行し、続いてTransferイベントを発行します。

`src/EtherSplitter.sol`に、EtherSplitterコードのスニペットを配置します。

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## コントラクトのコンパイル {#compile-the-contract}

コントラクトを[コンパイル](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract)するのに、package.jsonファイルに次のエントリを追加します。

```json
"scripts": {
    "build": "waffle"
  }
```

次に、プロジェクトのルートディレクトリにWaffleの設定ファイル (`waffle.json`) を作成し、次の設定を貼り付けます。

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

`yarn build`を実行してください。 終了すると、`build`ディレクトリに、JSON形式でコンパイルされたEtherSplitterコントラクトが現れます。

## テストの設定 {#test-setup}

Waffleでテストするには ChaiマッチャーとMochaが必要になるため、プロジェクトに[追加](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)します。 次のようにscriptの場所に`test`エントリを追加してpackage.jsonファイルを更新してください。

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

テストを[実行](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests)する場合は、 `yarn test`を実行します。

# テストを実行する {#testing}

それでは、`test`ディレクトリを作成し、新しいファイル `test\EtherSplitter.test.ts`を作成してください。 以下のスニペットをコピーして、テストファイルに貼り付けてください。

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // add the tests here
})
```

始める前に、少し解説をします。 `MockProvider`は、ブロックチェーンのモックバージョンを作成します。 また、EtherSplitterコントラクトのテストで役立つモックウォレットも提供します。 このプロバイダーで、`getWallets()`メソッドを呼び出すと最大10個までウォレットを取得することができます。 この例では、3つのウォレットを取得します。1つは、送信者用で、2つは、受信者用です。

次に、「splitter」という変数を宣言します。これは、 EtherSplitterコントラクトのモックです。 このモックは、単一のテストを実行する前に`deployContract`メソッドによって作成されます。 当該のメソッドは、最初のパラメータとして渡されたウォレット (この場合は送信者のウォレット) からコントラクトのデプロイメントをシミュレートします。 2番目のパラメータは、テストされるコントラクトのABIとバイトコードです。コンパイルされたEtherSplitterコントラクトのjsonファイルを`build`ディレクトから渡します。 3番目のパラメータは、コントラクトのコンストラクタ引数を持つ配列です。この場合、受信者の2つのアドレスです。

## changeBalances {#changebalances}

まず、splitメソッドによって実際に受取人のウォレットの残高が変わるかどうかを確認します。 送信者のアカウントから50weiを分割すると、両方の受信者の残高が25wei増えることが期待されます。 ここで、Waffleの`changeBalances`マッチャーを使います。

```ts
it("Changes accounts balances", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

マッチャーの最初のパラメータとして、受信者のウォレットの配列を渡し、2番目のパラメータとして、対応するアカウントで予想される増加分を配列で渡します。 特定のウォレットの残高を確認したい場合は、以下の例のように、配列を渡さなくても`changeBalance`マッチャーを使えます。

```ts
it("Changes account balance", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

`changeBalance`と `changeBalances`のどちらの場合も、split関数をコールバックとして渡します。マッチャーは呼び出しの前後に残高の状態にアクセスする必要があるためです。

次では、weiの各転送後にTransferイベントが発行されたかどうかをテストします。 それでは、Waffleの別のマッチャーに移ります。

## Emit {#emit}

```ts
it("Emits event on the transfer to the first receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emits event on the transfer to the second receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit`マッチャーを使うと、メソッドの呼び出し時にコントラクトがイベントを発行したかどうかを確認できます。 `emit`マッチャーへのパラメーターとして、イベントを発行することが予期されるモックコントラクトとそのイベントの名前を渡します。 この場合、モックコントラクトは`splitter`で、イベント名は`Transfer`です。 また、イベントの発行で引数の正確な値を検証することもできます。その場合、イベントの宣言で期待される数の引数を `withArgs`マッチャーに渡します。 EtherSplitterコントラクトの場合では、送金されるwei単位の金額とともに送信者と受信者のアドレスを渡します。

## revertedWith {#revertedwith}

最後の例として、weiの数が奇数の場合にトランザクションが取り消されるかどうかを確認します。 ここでは、`revertedWith`マッチャーを使います。

```ts
it("Reverts when Vei amount uneven", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

このテストをパスすれば、トランザクションが実際に取り消されたことが保証されます。 ただし、`require`ステートメントで渡したメッセージと、`revertedWith`で期待しているメッセージとが完全に一致している必要があります。 EtherSplitterコントラクトのコードに戻った場合、weiの金額の`require`ステートメントで、「偶数でないwei単位の金額は許可されていません」というメッセージが表示されます。 これは、テストで予期されるメッセージと一致します。 それらが等しくなければ、テストは失敗します。

# おめでとうございます！ {#congratulations}

Waffleでスマートコントラクトをテストするための最初の大きな一歩を踏み出すことができました。 他のWaffleのチュートリアルについては、以下をご参照ください。

- [Waffleを使って、ERC-20をテストする](/developers/tutorials/testing-erc-20-tokens-with-waffle/)
- [Waffleを使った動的モックアップの活用およびコントラクト呼び出しのテスト](/developers/tutorials/waffle-dynamic-mocking-and-testing-calls/#gatsby-focus-wrapper)
- [WaffleでHardhatとethersを使って「Hello world!」と出力するチュートリアル](/developers/tutorials/waffle-hello-world-with-buidler-tutorial/)
