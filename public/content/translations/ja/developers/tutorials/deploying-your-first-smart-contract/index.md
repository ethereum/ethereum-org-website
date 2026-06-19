---
title: 初めてのスマート・コントラクトのデプロイ
description: イーサリアムのテストネットワークに初めてのスマート・コントラクトをデプロイするための入門ガイド
author: "jdourlens"
tags: ["スマート・コントラクト", "Remix", "Solidity", "デプロイ"]
skill: beginner
breadcrumb: 初めてのコントラクトのデプロイ
lang: ja
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

イーサリアムブロックチェーン上で初めての[スマート・コントラクト](/developers/docs/smart-contracts/)を[デプロイ](/developers/docs/smart-contracts/deploying/)し、操作することに、あなたも私たちと同じようにワクワクしていることでしょう。

心配はいりません。これは初めてのスマート・コントラクトなので、[ローカルのテストネットワーク](/developers/docs/networks/)にデプロイします。そのため、デプロイに費用は一切かからず、好きなだけ試すことができます。

## コントラクトの作成 {#writing-our-contract}

最初のステップは、[Remixにアクセス](https://remix.ethereum.org/)して新しいファイルを作成することです。Remixインターフェースの左上部分で新しいファイルを追加し、任意のファイル名を入力します。

![Adding a new file in the Remix interface](./remix.png)

新しいファイルに、以下のコードを貼り付けます。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // カウント数を保持するためのunsigned int型のパブリック変数
    uint256 public count = 0;

    // カウンターをインクリメントする関数
    function increment() public {
        count += 1;
    }

    // カウント値を取得するための不要なゲッター
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

プログラミングに慣れている方なら、このプログラムが何をするものか簡単に推測できるでしょう。以下は行ごとの説明です。

- 4行目: `Counter`という名前のコントラクトを定義します。
- 7行目: このコントラクトは、初期値が0の`count`という名前の符号なし整数を1つ保存します。
- 10行目: 最初の関数は、コントラクトの状態を変更し、変数`count`を`increment()` (インクリメント) します。
- 15行目: 2番目の関数は、スマート・コントラクトの外部から`count`変数の値を読み取るための単なるゲッター (getter) です。変数`count`をpublicとして定義しているため、本来これは不要ですが、例として示しています。

初めてのシンプルなスマート・コントラクトについては以上です。ご存知かもしれませんが、これはJavaやC++のようなOOP (オブジェクト指向プログラミング) 言語のクラスに似ています。それでは、このコントラクトを動かしてみましょう。

## コントラクトのデプロイ {#deploying-our-contract}

初めてのスマート・コントラクトを作成したので、次はそれをブロックチェーンにデプロイして動かせるようにします。

[ブロックチェーンへのスマート・コントラクトのデプロイ](/developers/docs/smart-contracts/deploying/)とは、実際には、コンパイルされたスマート・コントラクトのコードを含むトランザクションを、宛先を指定せずに送信することにすぎません。

まず、左側にあるコンパイルアイコンをクリックして、[コントラクトをコンパイル](/developers/docs/smart-contracts/compiling/)します。

![The compile icon in the Remix toolbar](./remix-compile-button.png)

次に、コンパイルボタンをクリックします。

![The compile button in the Remix solidity compiler](./remix-compile.png)

「Auto compile (自動コンパイル)」オプションを選択すると、テキストエディタで内容を保存するたびにコントラクトが常にコンパイルされるようになります。

その後、「Deploy & run transactions (デプロイとトランザクションの実行)」画面に移動します。

![The deploy icon in the Remix toolbar](./remix-deploy.png)

「Deploy & run transactions」画面に移動したら、コントラクト名が表示されていることを再確認し、「Deploy (デプロイ)」をクリックします。ページ上部に表示されているように、現在の環境は「JavaScript VM」です。これは、より速く、手数料なしでテストできるように、ローカルのテストブロックチェーン上でスマート・コントラクトをデプロイして操作することを意味します。

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

「Deploy」ボタンをクリックすると、下部にコントラクトが表示されます。左側の矢印をクリックして展開すると、コントラクトの内容が表示されます。ここには、変数`counter`、`increment()`関数、およびゲッターである`getCounter()`があります。

`count`または`getCount`ボタンをクリックすると、実際にコントラクトの`count`変数の内容を取得して表示します。まだ`increment`関数を呼び出していないため、0が表示されるはずです。

![The function button in the Remix solidity compiler](./remix-function-button.png)

では、ボタンをクリックして`increment`関数を呼び出してみましょう。ウィンドウの下部に、実行されたトランザクションのログが表示されます。`increment`ボタンではなく、データを取得するボタンを押したときとはログが異なることがわかるでしょう。これは、ブロックチェーン上のデータを読み取る際には、トランザクション (書き込み) や手数料が必要ないためです。ブロックチェーンの状態を変更する場合にのみ、トランザクションを作成する必要があります。

![A log of transactions](./transaction-log.png)

インクリメントボタンを押して`increment()`関数を呼び出すトランザクションを生成した後、再度countまたはgetCountボタンをクリックすると、count変数が0より大きくなった、新しく更新されたスマート・コントラクトの状態を読み取ることができます。

![Newly updated state of the smart contract](./updated-state.png)

次のチュートリアルでは、[スマート・コントラクトにイベントを追加する方法](/developers/tutorials/logging-events-smart-contracts/)について説明します。イベントのログを記録することは、スマート・コントラクトをデバッグし、関数呼び出し中に何が起こっているかを理解するための便利な方法です。