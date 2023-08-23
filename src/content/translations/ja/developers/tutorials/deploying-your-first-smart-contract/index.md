---
title: はじめてスマートコントラクトをデプロイする
description: はじめてイーサリアムのテスト用ネットワークにスマートコントラクトをデプロイするユーザー向けのイントロダクション
author: "jdourlens"
tags:
  - "スマートコントラクト"
  - "Remix"
  - "Solidity"
  - "デプロイ"
skill: beginner
lang: ja
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

皆さんも、私たちと同じように、はじめて[スマートコントラクト](/developers/docs/smart-contracts/)をイーサリアムのブロックチェーン上で[デプロイ](/developers/docs/smart-contracts/deploying/)し、やり取りを行うことにドキドキしていることでしょう。

最初のスマートコントラクトは、 [ローカルテストネットワーク](/developers/docs/networks/) にデプロイするので心配は要りません。コストはまったくかからず、好きなだけ楽しむことができます。

## コントラクトの記述 {#writing-our-contract}

まずはじめに、[Remix](https://remix.ethereum.org/)にアクセスし、新規ファイルを作成してください。 Remix 画面の左上にあるアイコンから新規ファイルを追加し、適当なファイル名を付けてください。

![Remixインターフェースに新規ファイルを追加する](./remix.png)

作成したファイルに、以下のコードをペーストします。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Public variable of type unsigned int to keep the number of counts
    uint256 public count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
    }

    // Not necessary getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

プログラミングの経験があれば、このプログラムの内容はすぐに推測できるでしょう。 以下は、各行ごとの説明です。

- 4 行目： `Counter`という名前のコントラクトを定義します。
- 7 行目：このコントラクトでは、`count`という名称を持つ、符号なしの 0 から始まる整数を保存します。
- 10 行目：最初の関数は、コントラクトの状態（ステート）を変更し、変数`の値`を`1増やします`。
- 15 行目：次の関数は、このスマートコントラクトに含まれない`count`変数の値を読み取るためのゲッターです。 ただし、このプログラムでは`count`変数を public で定義しているため、実際にはこの関数は必要ありません。例として挙げている点に注意してください。

皆さんがはじめて作成するシンプルなスマートコントラクトは、これですべてです。 ご覧のように、Java や C++のようなオブジェクト指向のプログラミング言語のクラスに似ていますね。 それではさっそく、このコントラクトを使ってみましょう。

## コントラクトをデプロイする {#deploying-our-contract}

最初のスマートコントラクトが作成できたので、ブロックチェーン上でデプロイして使用してみましょう。

[ブロックチェーン上でスマートコントラクトをデプロイする](/developers/docs/smart-contracts/deploying/)とは、実際のところ、受取人を指定せずに、コンパイルしたスマートコントラクトのコードを含むトランザクションを送信することです。

コントラクトをコンパイルするには、まず、画面左側にある「compile（コンパイル）」のアイコンをクリックして[コントラクトをコンパイルします](/developers/docs/smart-contracts/compiling/)。

![Remixツールバー上の「compile」アイコン](./remix-compile-button.png)

次に、「Compile（コンパイル）」ボタンをクリックします：

![Remix solidityコンパイラ上の「compile」ボタン](./remix-compile.png)

「Auto compile（自動コンパイル）」のオプションを選択すると、テキストエディタ上で内容を保存するたびにコントラクトがコンパイルされるようになります。

次に、「Deploy and run transactions（トランザクションのデプロイおよび実行」画面に移動します：

![Remixツールバー上の「deploy」アイコン](./remix-deploy.png)

「Deploy and run transactions（トランザクションをデプロイし、実行する） 」の画面に移動したら、作成したコントラクト名が表示されていることをダブルチェックしてから、「Deploy（デプロイ）」をクリックします。 画面の上部から、現在の環境が「JavaScript VM」であると表示されているのを確認してください。これにより、作成したスマートコントラクトをローカルのテスト用ブロックチェーン上でデプロイし、やりとりを行うため、より高速なテストを無料で行うことができます。

![Remix solidityコンパイラ上の「deploy」ボタン](./remix-deploy-button.png)

「Deploy」ボタンをクリックすると、画面下部に作成したコントラクトが表示されます。 画面左側にある矢印をクリックすると、コントラクトの内容が表示されます。 これが、このコントラクトにおける`counter`変数、`increment()`関数、およびゲッター`getCounter()`です。

`count`もしくは`getCount`ボタンをクリックすると、このコントラクトの`count`変数の内容を取得して表示します。 この時点では`increment` 関数を呼び出していないので、「0」が表示されます。

![Remix solidityコンパイラ上の「function」ボタン](./remix-function-button.png)

次に、 `increment`ボタンをクリックして、increment 関数を呼び出しましょう。 ご覧のように、実行したトランザクションのログは、ウィンドウの下部に表示されます。 `increment`ボタンではなくデータ取得のボタンをクリックした場合、ログが変化することが分かると思います。 これは、ブロックチェーン上のデータを読み込む際には、トランザクション（書き込み）や手数料が必要ないためです。 つまり、トランザクションが必要となるのは、ブロックチェーンの状態を変更する場合のみです。

![トランザクションログ](./transaction-log.png)

`increment()`機能を呼び出すトランザクションを作成する「increment」ボタンをクリックしてから「count」または「getCount」ボタンを再度クリックすると、count 変数が「0」以上である更新後の状態のスマートコントラクトが読み込まれます。

![更新後のスマートコントラクトの状態](./updated-state.png)

次のチュートリアルでは、[スマートコントラクトにイベントを追加する方法](/developers/tutorials/logging-events-smart-contracts/)を学びます。 イベントログは、スマートコントラクトをデバッグし、関数の呼び出し中に何が起こっているかを理解するのに便利な方法です。
