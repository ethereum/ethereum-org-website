---
title: Tellorをオラクルとしてセットアップする方法
description: プロトコルにTellorオラクルを統合する作業を開始するためのガイド
author: "Tellor"
lang: ja
tags:
  - "Solidity"
  - "スマートコントラクト"
  - "オラクル"
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

確認クイズ：あなたのプロトコルはもうすぐ完成しますが、オフチェーンのデータにアクセスするにはオラクルが必要です。何をすればよいでしょうか？

## （ソフトな）前提知識 {#soft-prerequisites}

この投稿は、なるべくシンプルかつ明快に、オラクルフィードにアクセスする方法を説明するものです。 ただし、オラクルについて理解するには以下のプログラミングスキルが必要です。

前提条件：

- ターミナルを操作できる
- npmがインストール済みである
- npmを使って、依存関係を管理できる

Tellorは、実装可能かつ開発継続中のオープンソースのオラクルです。 この初心者向けガイドは、Tellor がいかに簡単に導入、稼働できるかを説明するもので、完全に分散化され、検閲耐性を持つオラクルをプロジェクトに追加する方法を学びます。

## 概要 {#overview}

Tellorは、オフチェーンのデータポイントの値（例：BTC/USD）を請求できるオラクルシステムです。報告者は、イーサリアムの全スマートコントラクトがアクセスできるオンチェーンのデータバンクに対してこの値を追加するために競います。 このデータバンクへの入力は、ステーキング済みの報告者で構成されるネットワークにより保護されています。 Tellorは、暗号資産経済におけるインセンティブの仕組みを活用し、Tellorのトークン、トリビュート（TRB）、および紛争メカニズムに基づき、正直なデータを提出した報告者に報酬を与え、悪意のユーザーを処罰します。

このチュートリアルでは、以下について説明します：

- 導入および稼働に必要な初回ツールキットの設定方法
- 簡単な実例に基づくステップごとの説明
- 現在Tellorをテストできるネットワークのアドレスリスト

## Tellorを使うには {#usingtellor}

まず、Tellorをオラクルとして使用するために必要な基本ツールをインストールします。 Tellorのユーザーコントラクトをインストールするには、[このパッケージ](https://github.com/tellor-io/usingtellor)を使ってください。

`npm install usingtellor`

インストールが完了すると、「UsingTellor」のコントラクトから関数を継承できるようになります。

うまく行きましたね！ ツールが準備できたので、ビットコイン価格の情報を取得するという単純なエクササイズを実行してみましょう：

### BTC/USDの例 {#btcusd-example}

この「UsingTellor」コントラクトを継承し、Tellorのアドレスをコントラクタの引数として渡します：

具体的なコードは、以下のようになります：

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //This Contract now has access to all functions in UsingTellor

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

利便性のために、UsingTellorのリポジトリには簡単な統合を目的としたバージョンである[Tellor Playground](https://github.com/tellor-io/TellorPlayground)コントラクトが含まれています。 有益な関数のリストについては、 [こちら](https://github.com/tellor-io/sampleUsingTellor#tellor-playground)を参照してください。

Tellorオラクルをより堅牢に実装したい場合は、[こちらで](https://github.com/tellor-io/usingtellor/blob/master/README.md)利用可能な関数の全リストを確認してください。
