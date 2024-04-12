---
title: Dartデベロッパーのためのイーサリアム
description: Dart言語を使用してイーサリアムを開発する方法を学ぶ
lang: ja
incomplete: true
---

## スマートコントラクトとSolidityを使い始める {#getting-started-with-smart-contracts-and-solidity}

## チュートリアル {#tutorials}

- [Flutterとブロックチェーン – Hello World dapp](https://www.geeksforgeeks.org/flutter-and-blockchain-hello-world-dapp/)で、開始手順を段階的に説明しています。
  1.  [Truffle開発スイート](https://www.trufflesuite.com/)をインストールする
  2.  [Solidity](https://soliditylang.org/)でスマートコントラクトを記述する
  3.  Dartでユーザーインターフェースを記述する
- [Flutterを使用したモバイルdappの構築](https://medium.com/dash-community/building-a-mobile-dapp-with-flutter-be945c80315a)は、より簡潔な説明となっています。すでに基礎を理解している場合は、こちらを参照することをお勧めします。
- ビデオでの学習をご希望の場合は、[初めてのブロックチェーンFlutterアプリの構築](https://www.youtube.com/watch?v=3Eeh3pJ6PeA)をご覧いただけます。このビデオは約1時間です。
- 時間がない場合は、[イーサリアムでのFlutterとDartを使用したブロックチェーンの分散型アプリの構築](https://www.youtube.com/watch?v=jaMFEOCq_1s)をご覧ください。このビデオはわずか20分です。
- [FlutterアプリケーションへのMetaMaskの統合](https://youtu.be/8qzVDje3IWk) - この短いビデオでは、FlutterアプリケーションにMetaMaskを統合する手順を段階的に説明しています。

## イーサリアムクライアントの操作 {#working-with-ethereum-clients}

イーサリアムを使用して、仮想通貨とブロックチェーン技術の利点を活用した分散型アプリケーション (「dapp」) を作成します。 現在、少なくとも、Dartでイーサリムの[JSON RPC API](/developers/docs/apis/json-rpc/)が利用できるライブラリが2つメンテナンスされています。

1. [sionbutler.euのWeb3dart](https://pub.dev/packages/web3dart)
1. [darticulate.comのEthereum 5.0.0](https://pub.dev/packages/ethereum)

特定のイーサリアムアドレスの操作やさまざまな仮想通貨の価格の取得を可能にする、追加のライブラリもあります。 完全なリストについては、[こちら](https://pub.dev/dart/packages?q=ethereum)をご覧ください。
