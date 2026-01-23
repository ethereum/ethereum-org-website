---
title: "Tellorをオラクルとしてセットアップする方法"
description: "プロトコルにTellorオラクルを統合する作業を開始するためのガイド"
author: "Tellor"
lang: ja
tags: [ "Solidity", "スマート契約", "オラクル" ]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

確認クイズ：あなたのプロトコルはもうすぐ完成しますが、オフチェーンのデータにアクセスするにはオラクルが必要です。何をすればよいでしょうか？

## (緩やかな) 前提条件 {#soft-prerequisites}

この投稿は、なるべくシンプルかつ明快に、オラクルフィードにアクセスする方法を説明するものです。 ただし、オラクルについて理解するには以下のプログラミングスキルが必要です。

前提知識：

- ターミナルを操作できる
- npmがインストール済みである
- npmを使って、依存関係を管理できる

Tellorは、実装可能かつ開発継続中のオープンソースのオラクルです。 この初心者向けガイドは、Tellor がいかに簡単に導入、稼働できるかを説明するもので、完全に分散化され、検閲耐性を持つオラクルをプロジェクトに追加する方法を学びます。

## 概要 {#overview}

Tellorは、オフチェーンのデータポイントの値（例：BTC/USD）を請求できるオラクルシステムです。報告者は、イーサリアムの全スマートコントラクトがアクセスできるオンチェーンのデータバンクに対してこの値を追加するために競います。 このデータバンクへの入力は、ステーキング済みの報告者で構成されるネットワークにより保護されています。 Tellorは暗号経済的なインセンティブの仕組みを活用し、TellorのトークンであるTributes（TRB）の発行と紛争メカニズムを通じて、誠実なデータを提出したレポーターに報酬を与え、悪意のあるアクタを罰します。

このチュートリアルでは、以下について説明します：

- 導入および稼働に必要な初回ツールキットの設定方法
- 簡単な実例に基づくステップごとの説明
- 現在Tellorをテストできるテストネットのネットワークアドレス一覧

## UsingTellorの使用 {#usingtellor}

まず、Tellorをオラクルとして使用するために必要な基本ツールをインストールします。 Tellor User Contractsをインストールするには、[このパッケージ](https://github.com/tellor-io/usingtellor)を使用します：

`npm install usingtellor`

インストールが完了すると、「UsingTellor」のコントラクトから関数を継承できるようになります。

うまく行きましたね！ ツールが準備できたので、ビットコイン価格の情報を取得するという単純なエクササイズを実行してみましょう：

### BTC/USDの例 {#btcusd-example}

この「UsingTellor」コントラクトを継承し、Tellorのアドレスをコンストラクタの引数として渡します：

具体的なコードは、以下のようになります：

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //このコントラクトは、UsingTellor のすべての関数にアクセスできるようになりました

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

コントラクトアドレスの完全なリストは、[こちら](https://docs.tellor.io/tellor/the-basics/contracts-reference)を参照してください。

利便性のために、UsingTellorのリポジトリには簡単な統合を目的としたバージョンである[Tellor Playground](https://github.com/tellor-io/TellorPlayground)コントラクトが含まれています。 便利な関数の一覧は[こちら](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)をご覧ください。

Tellorオラクルのより堅牢な実装については、利用可能な関数の完全なリストを[こちら](https://github.com/tellor-io/usingtellor/blob/master/README.md)で確認してください。
