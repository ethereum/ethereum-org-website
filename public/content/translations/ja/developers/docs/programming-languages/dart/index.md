---
title: Dart開発者のためのイーサリアム
description: Dart言語を使用してイーサリアム向けに開発する方法を学ぶ
lang: ja
incomplete: true
---

## スマート・コントラクトとSolidity言語の入門 {#getting-started-with-smart-contracts-and-solidity}

## チュートリアル {#tutorials}

- [Flutterとブロックチェーン – Hello World Dapp](https://www.geeksforgeeks.org/flutter-and-blockchain-hello-world-dapp/)では、始めるためのすべての手順を説明しています。
  1.  [Solidity](https://soliditylang.org/)でスマート・コントラクトを書く
  2.  Dartでユーザーインターフェースを書く
- [Flutterを使ったモバイル分散型アプリケーション (dapp) の構築](https://medium.com/dash-community/building-a-mobile-dapp-with-flutter-be945c80315a)ははるかに短く、すでに基礎を知っている場合に適しているかもしれません。
- 動画で学ぶ方が好きな場合は、約1時間の[初めてのブロックチェーンFlutterアプリの構築](https://www.youtube.com/watch?v=3Eeh3pJ6PeA)を視聴できます。
- 手っ取り早く学びたい場合は、約20分の[イーサリアム上でFlutterとDartを使ったブロックチェーン分散型アプリケーションの構築](https://www.youtube.com/watch?v=jaMFEOCq_1s)がおすすめです。
- [WalletConnectのWeb3Modalを使用したFlutterアプリケーションへのメタマスクの統合](https://www.youtube.com/watch?v=v_M2buHCpc4) - この短い動画では、WalletConnectの[Web3Modal](https://pub.dev/packages/web3modal_flutter)ライブラリを使用して、Flutterアプリケーションにメタマスクを統合する手順を説明しています。
- [SolidityとFlutterを使ったモバイルブロックチェーン開発者ブートキャンプコース](https://youtube.com/playlist?list=PL4V4Unlk5luhQ26ERO6hWEbcUwHDSSmVH) - フルスタックのモバイルブロックチェーン開発者向けコースのプレイリスト

## イーサリアムクライアントの操作 {#working-with-ethereum-clients}

イーサリアムを使用すると、暗号資産とブロックチェーン技術の利点を活用した分散型アプリケーション (dapp) を作成できます。
現在、Dartでイーサリアムの[JSON-RPC API](/developers/docs/apis/json-rpc/)を使用するためにメンテナンスされているライブラリが少なくとも2つあります。

1. [pwa.irのWeb3dart](https://pub.dev/packages/web3dart)
1. [darticulate.comのEthereum 5.0.0](https://pub.dev/packages/ethereum)

また、特定のイーサリアムアドレスを操作したり、さまざまな暗号資産の価格を取得したりできる追加のライブラリもあります。
[完全なリストはこちらで確認できます](https://pub.dev/dart/packages?q=ethereum)。