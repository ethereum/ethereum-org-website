---
title: テラーをオラクルとして設定する方法
description: テラーのオラクルをプロトコルに統合するためのスタートガイド
author: "テラー"
lang: ja
tags: ["solidity", "スマートコントラクト", "オラクル"]
skill: beginner
breadcrumb: テラーのオラクル
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

小テスト：あなたのプロトコルはほぼ完成していますが、オフチェーンデータにアクセスするためにオラクルが必要です...あなたはどうしますか？

## （ソフト）前提条件 {#soft-prerequisites}

この記事は、オラクルフィードへのアクセスをできるだけシンプルかつ簡単にすることを目的としています。とはいえ、オラクルの側面に焦点を当てるため、あなたのコーディングスキルについて以下のことを前提としています。

前提条件：

- ターミナルを操作できる
- npmがインストールされている
- npmを使用して依存関係を管理する方法を知っている

テラーは、実装の準備が整っている、稼働中のオープンソースのオラクルです。この初心者向けガイドは、テラーを簡単に使い始めることができることを示し、あなたのプロジェクトに完全に分散型で検閲耐性のあるオラクルを提供するためにあります。

## 概要 {#overview}

テラーは、当事者がオフチェーンのデータポイント（例：BTC/USD）の値をリクエストし、レポーターがこの値をすべてのイーサリアムスマートコントラクトからアクセス可能なオンチェーンのデータバンクに追加するために競争するオラクルシステムです。このデータバンクへの入力は、ステークしたレポーターのネットワークによって保護されています。テラーは暗号経済的なインセンティブメカニズムを利用しており、レポーターによる誠実なデータ提出に報酬を与え、テラーのトークンであるTributes（TRB）の発行と紛争メカニズムを通じて悪意のあるアクターを罰します。

このチュートリアルでは、以下のことについて説明します。

- 稼働させるために必要な初期ツールキットのセットアップ。
- 簡単な例のウォークスルー。
- 現在テラーをテストできるネットワークのテストネットアドレスのリストアップ。

## UsingTellor {#usingtellor}

最初に行うべきことは、テラーをオラクルとして使用するために必要な基本ツールをインストールすることです。[このパッケージ](https://github.com/tellor-io/usingtellor)を使用して、テラーのユーザーコントラクトをインストールします。

`npm install usingtellor`

インストールが完了すると、あなたのコントラクトは「UsingTellor」コントラクトから関数を継承できるようになります。

素晴らしい！ツールの準備ができたので、ビットコインの価格を取得する簡単な演習を行ってみましょう。

### BTC/USDの例 {#btcusd-example}

UsingTellorコントラクトを継承し、コンストラクタの引数としてテラーのアドレスを渡します。

以下に例を示します。

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //このコントラクトはUsingTellorのすべての関数にアクセスできるようになりました。

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

コントラクトアドレスの完全なリストについては、[こちら](https://docs.tellor.io/tellor/the-basics/contracts-reference)を参照してください。

使いやすさを考慮して、UsingTellorリポジトリには、統合を容易にするための[Tellor Playground](https://github.com/tellor-io/TellorPlayground)コントラクトのバージョンが付属しています。役立つ関数のリストについては、[こちら](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)を参照してください。

テラーのオラクルをより堅牢に実装するには、利用可能な関数の完全なリストを[こちら](https://github.com/tellor-io/usingtellor/blob/master/README.md)で確認してください。