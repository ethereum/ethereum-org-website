---
title: イベントを使用して、スマートコントラクトのデータをログに記録する
description: スマートコントラクトにおけるイベントを紹介し、データのログを取るためにイベントを使用する方法を学ぶ
author: "jdourlens"
tags:
  - "スマートコントラクト"
  - "Remix"
  - "Solidity"
  - "イベント"
skill: intermediate
lang: ja
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Solidityでは、スマートコントラクトがトリガーすることで送信される信号を[イベント](/developers/docs/smart-contracts/anatomy/#events-and-logs)と呼びます。 Dappだけでなく、イーサリアムのJSON-RPC APIに接続されたすべてのプログラムは、これらのイベントをリッスンし、それに応じて動作します。 イベントをインデックス化すれば、後でイベント履歴を参照することができます。

## イベント {#events}

この記事を書いている時点でイーサリアムブロックチェーンで最も一般的なイベントは、誰かがトークンを転送するときにERC20トークンによって発行されるTransferイベントです。

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

イベントの署名はコントラクトのコード内で宣言され、emitキーワードと共に発行されます。 例えば、送信イベントでは、この送信における送信元（_from_）、送信先（_to_）、および送信したトークン量（_value_）のログが記録されます。

Counterのスマートコントラクトに戻り、値が変更されるたびにログを取ることにしたと仮定しましょう。 このコントラクトは、デプロイを目的とせず、別のコントラクトを拡張する土台の役割を担うため、抽象コントラクトと呼びます。 カウンターのスマートコントラクトでは、以下のようになります：

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Private variable of type unsigned int to keep the number of counts
    uint256 private count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

注意:

- **5行目**：イベントを宣言し、イベントに含まれる古い値と新しい値を宣言します。

- **13行目**：カウントの変数が1増えるごとに、イベントが発行されます。

このコントラクトをデプロイしてインクリメント関数を呼び出し、ログという名前の配列にある新しいトランザクションをクリックすると、Remixが自動的にこのイベントを表示します。

![Remixのスクリーンショット](./remix-screenshot.png)

ログは、スマートコントラクトをデバッグするのにとても役立つだけでなく、様々な人々が利用するアプリケーションを開発する際も、あなたのスマートコントラクトがどのように使用されているかを追跡し、理解するためのアナリティクスを構築する上で非常に重要です。 トランザクションで生成されたログは一般的なブロックエクスプローラーに表示されるので、これを使って特定のイベントをリッスンするためのオフチェーン用スクリプトを作成し、イベント発生時にアクションを実行することができます。
