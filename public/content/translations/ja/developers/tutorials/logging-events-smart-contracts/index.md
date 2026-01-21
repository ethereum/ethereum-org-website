---
title: "イベントを使用して、スマートコントラクトのデータをログに記録する"
description: "スマートコントラクトにおけるイベントを紹介し、データのログを取るためにイベントを使用する方法を学ぶ"
author: "jdourlens"
tags: [ "スマート契約", "Remix", "Solidity", "イベント" ]
skill: intermediate
lang: ja
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Solidityでは、[イベント](/developers/docs/smart-contracts/anatomy/#events-and-logs)はスマートコントラクトが発行できるディスパッチされたシグナルです。 Dapps、またはイーサリアムのJSON-RPC APIに接続されたあらゆるものは、これらのイベントをリッスンして、それに応じて動作することができます。 イベントにインデックスを付けることで、後でイベント履歴を検索できるようになります。

## イベント {#events}

この記事を書いている時点でイーサリアムブロックチェーンで最も一般的なイベントは、誰かがトークンを転送するときにERC20トークンによって発行されるTransferイベントです。

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

イベントの署名はコントラクトのコード内で宣言され、emitキーワードと共に発行されます。 例えば、転送イベントでは、この転送における送信元(_from_)、送信先(_to_)、および送信したトークン量(_value_)のログが記録されます。

Counterスマートコントラクトに戻り、値が変更されるたびにログを記録することにしたと仮定しましょう。 このコントラクトは、デプロイを目的とせず、別のコントラクトを拡張する土台の役割を担うため、抽象コントラクトと呼びます。 カウンターの例では、このようになります：

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // カウント数を保持するための符号なし整数のプライベート変数
    uint256 private count = 0;

    // カウンターをインクリメントする関数
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // カウント値を取得するためのゲッター
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

注意：

- **5行目**: イベントと、それに含まれる古い値および新しい値を宣言します。

- **13行目**: count変数をインクリメントするときに、イベントを発行します。

このコントラクトをデプロイしてインクリメント関数を呼び出し、ログという名前の配列にある新しいトランザクションをクリックすると、Remixが自動的にこのイベントを表示します。

![Remixのスクリーンショット](./remix-screenshot.png)

ログは、スマートコントラクトをデバッグするのにとても役立つだけでなく、様々な人々が利用するアプリケーションを開発する際も、あなたのスマートコントラクトがどのように使用されているかを追跡し、理解するためのアナリティクスを構築する上で非常に重要です。 トランザクションで生成されたログは一般的なブロックエクスプローラーに表示されるので、これを使って特定のイベントをリッスンするためのオフチェーン用スクリプトを作成し、イベント発生時にアクションを実行することができます。
