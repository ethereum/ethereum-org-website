---
title: イベントを使用したスマート・コントラクトからのデータロギング
description: スマート・コントラクトのイベントと、それを使用してデータをログに記録する方法の紹介
author: "jdourlens"
tags: ["スマート・コントラクト", "Remix", "Solidity", "イベント"]
skill: intermediate
breadcrumb: イベントのロギング
lang: ja
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Solidityにおいて、[イベント](/developers/docs/smart-contracts/anatomy/#events-and-logs)はスマート・コントラクトが発信できるシグナルです。分散型アプリケーション (dapp) や、イーサリアムのJSON-RPC APIに接続されているあらゆるものは、これらのイベントをリッスンし、それに応じてアクションを実行できます。また、イベントにインデックスを付けて、後でイベント履歴を検索できるようにすることも可能です。

## イベント {#events}

この記事の執筆時点で、イーサリアムのブロックチェーン上で最も一般的なイベントは、誰かがトークンを送金する際にERC-20トークンによって発行されるTransferイベントです。

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

イベントの署名はコントラクトのコード内で宣言され、emitキーワードを使用して発行できます。たとえば、Transferイベントは、誰が送金したか（_from_）、誰に送金したか（_to_）、そしてどれだけのトークンが送金されたか（_value_）をログに記録します。

Counterスマート・コントラクトに戻り、値が変更されるたびにログを記録することにしたとします。このコントラクトはデプロイされることを意図しておらず、拡張して別のコントラクトを構築するためのベースとして機能するため、抽象コントラクト（abstract contract）と呼ばれます。Counterの例では、次のようになります。

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // カウント数を保持するためのunsigned int型のプライベート変数
    uint256 private count = 0;

    // カウンターをインクリメントする関数
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // カウント値を取得するゲッター
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

以下の点に注意してください。

- **5行目**: イベントとそれに含まれる内容（古い値と新しい値）を宣言します。

- **13行目**: count変数をインクリメントする際に、イベントを発行します。

ここでコントラクトをデプロイし、increment関数を呼び出すと、logsという名前の配列内にある新しいトランザクションをクリックした場合、Remixが自動的にそれを表示することがわかります。

![Remix screenshot](./remix-screenshot.png)

ログはスマート・コントラクトのデバッグに非常に役立ちますが、さまざまな人が使用するアプリケーションを構築する場合にも重要であり、スマート・コントラクトがどのように使用されているかを追跡および理解するための分析を容易にします。トランザクションによって生成されたログは、人気のあるブロックエクスプローラーに表示されます。また、たとえば特定のイベントをリッスンし、それらが発生したときにアクションを実行するオフチェーンスクリプトを作成するためにも使用できます。