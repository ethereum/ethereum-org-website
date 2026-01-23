---
title: "はじめてスマートコントラクトをデプロイする"
description: "初めてイーサリアムのテストネットにスマートコントラクトをデプロイするためのイントロダクション"
author: "jdourlens"
tags: [ "スマート契約", "Remix", "Solidity", "デプロイ" ]
skill: beginner
lang: ja
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

皆さんも私たちと同じように、イーサリアムのブロックチェーン上で初めての[スマートコントラクト](/developers/docs/smart-contracts/)を[デプロイ](/developers/docs/smart-contracts/deploying/)し、操作することにワクワクしていることでしょう。

心配はいりません。初めてのスマートコントラクトなので、[ローカルテストネットワーク](/developers/docs/networks/)にデプロイします。デプロイしたり、好きなだけ試したりするのに費用はかかりません。

## コントラクトの作成 {#writing-our-contract}

まず、[Remix](https://remix.ethereum.org/)にアクセスし、新規ファイルを作成します。 Remixインターフェースの左上で新規ファイルを追加し、好きなファイル名を入力します。

![Remixインターフェースで新規ファイルを追加する](./remix.png)

作成したファイルに、以下のコードをペーストします。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // カウント数を保持するための符号なし整数のパブリック変数
    uint256 public count = 0;

    // カウンターをインクリメントする関数
    function increment() public {
        count += 1;
    }

    // カウント値を取得するためのゲッター(必須ではない)
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

プログラミングの経験があれば、このプログラムが何をするものか簡単に推測できるでしょう。 以下に各行を説明します:

- 4行目: `Counter`という名前のコントラクトを定義します。
- 7行目: このコントラクトは、0から始まる`count`という名前の符号なし整数を1つ保存します。
- 10行目: 最初の関数はコントラクトの状態 (ステート) を変更し、`increment()`で変数`count`の値を1増やします。
- 15行目: 2番目の関数は、スマートコントラクトの外部から`count`変数の値を読み取ることができるようにするための、単なるゲッターです。 `count`変数はpublicとして定義されているため、この関数は必須ではありませんが、例として示しています。

初めてのシンプルなスマートコントラクトについては以上です。 ご存知かもしれませんが、これはJavaやC++のようなOOP (オブジェクト指向プログラミング) 言語のクラスに似ています。 それではさっそく、このコントラクトを使ってみましょう。

## コントラクトのデプロイ {#deploying-our-contract}

最初のスマートコントラクトが作成できたので、ブロックチェーン上でデプロイして使ってみましょう。

[ブロックチェーン上でスマートコントラクトをデプロイする](/developers/docs/smart-contracts/deploying/)とは、実際には、受取人を指定せずに、コンパイルしたスマートコントラクトのコードを含むトランザクションを送信することです。

まず、左側にあるコンパイルアイコンをクリックして[コントラクトをコンパイル](/developers/docs/smart-contracts/compiling/)します:

![Remixツールバーのコンパイルアイコン](./remix-compile-button.png)

次に、コンパイルボタンをクリックします:

![Remix Solidityコンパイラのコンパイルボタン](./remix-compile.png)

「Auto compile」オプションを選択すると、テキストエディタで内容を保存するたびにコントラクトが自動でコンパイルされるようになります。

次に、「Deploy and run transactions」(トランザクションのデプロイと実行) 画面に移動します:

![Remixツールバーのデプロイアイコン](./remix-deploy.png)

「Deploy and run transactions」画面で、ご自身のコントラクト名が表示されていることを再確認し、「Deploy」をクリックします。 ページ上部にあるように、現在の環境は「JavaScript VM」です。これは、スマートコントラクトをローカルのテスト用ブロックチェーン上にデプロイして操作することを意味し、より速く、手数料なしでテストができます。

![Remix Solidityコンパイラのデプロイボタン](./remix-deploy-button.png)

「Deploy」ボタンをクリックすると、画面下部にコントラクトが表示されます。 左側の矢印をクリックして展開すると、コントラクトの内容が表示されます。 これが、変数`counter`、`increment()`関数、そしてゲッターの`getCounter()`です。

`count`または`getCount`ボタンをクリックすると、コントラクトの`count`変数の内容が取得、表示されます。 まだ`increment`関数を呼び出していないため、0が表示されるはずです。

![Remix Solidityコンパイラの関数ボタン](./remix-function-button.png)

では、ボタンをクリックして`increment`関数を呼び出してみましょう。 ウィンドウ下部に、実行されたトランザクションのログが表示されます。 `increment`ボタンではなくデータ取得のボタンを押した場合、ログが異なることがわかります。 これは、ブロックチェーン上のデータを読み込む際には、トランザクション (書き込み) や手数料が必要ないためです。 トランザクションが必要となるのは、ブロックチェーンの状態を変更する場合のみだからです:

![トランザクションのログ](./transaction-log.png)

`increment()`関数を呼び出すトランザクションを生成するincrementボタンを押した後、`count`または`getCount`ボタンをもう一度クリックすると、`count`変数が0より大きくなった、スマートコントラクトの更新された状態を読み取ることができます。

![スマートコントラクトの更新された状態](./updated-state.png)

次のチュートリアルでは、[スマートコントラクトにイベントを追加する方法](/developers/tutorials/logging-events-smart-contracts/)について説明します。 イベントをロギングすることは、スマートコントラクトをデバッグし、関数の呼び出し中に何が起きているかを理解するのに便利な方法です。
