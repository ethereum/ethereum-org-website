---
title: "イベントを使用したスマート・コントラクトからのデータロギング"
description: "スマート・コントラクトのイベントと、それを使用してデータをログに記録する方法の紹介"
author: "jdourlens"
tags: ["スマート・コントラクト", "Remix", "Solidity", "イベント"]
skill: intermediate
breadcrumb: "イベントのロギング"
lang: ja
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Solidityにおいて、[イベント](/developers/docs/smart-contracts/anatomy/#events-and-logs)はスマート・コントラクトが発信できるシグナルです。分散型アプリケーション (dapp) や、イーサリアムのJSON-RPC APIに接続されているあらゆるものは、これらのイベントをリッスンし、それに応じてアクションを実行できます。また、イベントにインデックスを付けて、後でイベント履歴を検索できるようにすることも可能です。

## イベント {#events}

イーサリアムのブロックチェーン上で最も一般的なイベントの1つは、誰かがトークンを送金する際にERC-20トークンによって発行される`Transfer`イベントです。

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

イベントの署名はコントラクトのコード内で宣言され、emitキーワードを使用して発行できます。たとえば、transferイベントは、誰が送金したか（_from_）、誰に送金したか（_to_）、そしてどれだけのトークンが送金されたか（_value_）をログに記録します。

[初めてのスマート・コントラクトのデプロイ](/developers/tutorials/deploying-your-first-smart-contract/)で作成した`Counter`スマート・コントラクトに戻り、値が変更されるたびにログを記録してみましょう。次のようになります。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // カウント数を保持するための unsigned int 型の public 変数
    uint256 public count = 0;

    // カウンターをインクリメントする関数
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // カウント値を取得するための不要なゲッター
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

以下の点に注目してください。

- **6行目**: イベントとそれに含まれる内容（古い値と新しい値）を宣言します。

- **14行目**: count変数をインクリメントする際に、イベントを発行します。

ここでコントラクトをデプロイし、increment関数を呼び出すと、logsという名前の配列内にある新しいトランザクションをクリックした場合に、Remixがそれを自動的に表示することがわかります。

![Remixのスクリーンショット](./remix-screenshot.png)

ログはスマート・コントラクトのデバッグに非常に役立ちますが、さまざまな人が使用するアプリケーションを構築する場合にも重要であり、スマート・コントラクトがどのように使用されているかを追跡して理解するための分析を容易にします。トランザクションによって生成されたログは、人気のあるブロックエクスプローラーに表示されます。また、たとえば特定のイベントをリッスンし、それらが発生したときにアクションを実行するオフチェーンのスクリプトを作成するためにも使用できます。
