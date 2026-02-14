---
title: "Waffleライブラリを使用したシンプルなスマートコントラクトのテスト"
description: "初心者用チュートリアル"
author: Ewa Kowalska
tags: [ "スマート契約", "Solidity", "Waffle", "テスト" ]
skill: beginner
lang: ja
published: 2021-02-26
---

## このチュートリアルでは、次の方法を学びます {#in-this-tutorial-youll-learn-how-to}

- ウォレット残高の変更をテストする
- 指定された引数を持つイベントの発行をテストする
- トランザクションがrevertされたことをアサートする

## 前提条件 {#assumptions}

- 新規のJavaScriptまたはTypeScriptのプロジェクトを作成できる
- JavaScriptのテストの基本的な経験がある
- yarnやnpmなどのパッケージマネージャーを使用したことがある
- スマートコントラクトおよびSolidityのごく基本的な知識を持っている

## はじめに {#getting-started}

このチュートリアルでは、yarnを使ったテストのセットアップと実行を実演しますが、npmがお好みであれば問題ありません。公式Waffleの[ドキュメント](https://ethereum-waffle.readthedocs.io/en/latest/index.html)への適切なリファレンスを記載します。

## 依存関係をインストール {#install-dependencies}

ethereum-waffleとtypescriptの依存関係をプロジェクトの開発依存関係に[追加](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation)します。

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## スマートコントラクトの例 {#example-smart-contract}

このチュートリアルでは、EtherSplitterというシンプルなスマートコントラクトの例に取り組みます。 誰かがweiを送金し、それを2つの事前定義された受信者の間で均等に分割できるようにする以外に、特別な機能はありません。
split関数ではweiの数が偶数でなければなりません。さもないと処理は取り消されます。 両方の受信者に対して、weiの送金を実行し、続いてTransferイベントを発行します。

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

## コントラクトをコンパイルする {#compile-the-contract}

コントラクトを[コンパイル](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract)するには、package.jsonファイルに次のエントリを追加します。

```json
"scripts": {
    "build": "waffle"
  }
```

次に、プロジェクトのルートディレクトリにWaffleの設定ファイル (`waffle.json`) を作成し、次の設定をそこに貼り付けます。

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

`yarn build` を実行します。 結果として、`build`ディレクトリに、コンパイルされたEtherSplitterコントラクトがJSON形式で現れます。

## テストのセットアップ {#test-setup}

Waffleを使ったテストにはChaiマッチャーとMochaが必要なので、それらをプロジェクトに[追加](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)する必要があります。 package.jsonファイルを更新し、scriptsの部分に`test`エントリを追加してください。

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

テストを[実行](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests)したい場合は、`yarn test`を実行するだけです。

## テスト {#testing}

それでは、`test`ディレクトリを作成し、新しいファイル `test\EtherSplitter.test.ts`を作成してください。
以下のスニペットをコピーして、テストファイルに貼り付けてください。

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("イーサスプリッター", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // ここにテストを追加
})
```

始める前に、少し解説をします。
`MockProvider`は、ブロックチェーンのモックバージョンを作成します。 また、EtherSplitterコントラクトのテストで役立つモックウォレットも提供します。 このプロバイダーで、`getWallets()`メソッドを呼び出すと最大10個までウォレットを取得することができます。 この例では、送信者用と2人の受信者用の3つのウォレットを取得します。

次に、「splitter」という変数を宣言します。これは、EtherSplitterコントラクトのモックです。 このモックは、単一のテストを実行する前に`deployContract`メソッドによって作成されます。 当該のメソッドは、最初のパラメータとして渡されたウォレット (この場合は送信者のウォレット) からコントラクトのデプロイメントをシミュレートします。 2番目のパラメータは、テストされるコントラクトのABIとバイトコードです。コンパイルされたEtherSplitterコントラクトのjsonファイルを`build`ディレクトリから渡します。 3番目のパラメータは、コントラクトのコンストラクタ引数を持つ配列です。この場合、2人の受信者のアドレスです。

## changeBalances {#changebalances}

まず、splitメソッドによって実際に受取人のウォレットの残高が変わるかどうかを確認します。 送信者のアカウントから50 weiを分割すると、両方の受信者の残高が25 wei増えることが期待されます。 ここで、Waffleの`changeBalances`マッチャーを使います。

```ts
it("アカウントの残高を変更する", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

マッチャーの最初のパラメータとして、受信者のウォレットの配列を渡し、2番目のパラメータとして、対応するアカウントで予想される増加分を配列で渡します。
特定のウォレットの残高を確認したい場合は、以下の例のように、配列を渡さなくても`changeBalance`マッチャーを使えます。

```ts
it("アカウントの残高を変更する", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

`changeBalance`と`changeBalances`のどちらの場合も、マッチャーが呼び出しの前後に残高の状態にアクセスする必要があるため、split関数をコールバックとして渡すことに注意してください。

次に、weiの各転送後にTransferイベントが発行されたかどうかをテストします。 それでは、Waffleの別のマッチャーに移ります。

## Emit {#emit}

```ts
it("最初の受信者への転送時にイベントを発行する", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("2番目の受信者への転送時にイベントを発行する", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit`マッチャーを使うと、メソッドの呼び出し時にコントラクトがイベントを発行したかどうかを確認できます。 `emit`マッチャーへのパラメータとして、イベントを発行することが予期されるモックコントラクトとそのイベントの名前を渡します。 この場合、モックコントラクトは`splitter`で、イベント名は`Transfer`です。 また、イベントの発行で引数の正確な値を検証することもできます。その場合、イベントの宣言で期待される数の引数を`withArgs`マッチャーに渡します。 EtherSplitterコントラクトの場合では、送金されるwei単位の金額とともに送信者と受信者のアドレスを渡します。

## revertedWith {#revertedwith}

最後の例として、weiの数が奇数の場合にトランザクションが取り消されるかどうかを確認します。 ここでは、`revertedWith`マッチャーを使います。

```ts
it("weiの量が奇数の場合にrevertする", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

このテストをパスすれば、トランザクションが実際に取り消されたことが保証されます。 ただし、`require`ステートメントで渡したメッセージと、`revertedWith`で期待しているメッセージとが完全に一致している必要があります。 EtherSplitterコントラクトのコードに戻ると、weiの量に対する`require`ステートメントで、「Uneven wei amount not allowed」というメッセージが表示されます。 これは、テストで予期されるメッセージと一致します。 それらが等しくなければ、テストは失敗します。

## おめでとうございます！ {#congratulations}

Waffleでスマートコントラクトをテストするための最初の大きな一歩を踏み出すことができました。
