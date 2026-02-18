---
title: "Dartデベロッパーのためのイーサリアム"
description: "Dart言語を使用してイーサリアムを開発する方法を学ぶ"
lang: ja
incomplete: true
---

## スマートコントラクトとSolidity言語入門 {#getting-started-with-smart-contracts-and-solidity}

## チュートリアル {#tutorials}

- [Flutterとブロックチェーン – Hello World Dapp](https://www.geeksforgeeks.org/flutter-and-blockchain-hello-world-dapp/)では、開発を始めるためのすべての手順を解説しています：
  1. [Solidity](https://soliditylang.org/)でスマートコントラクトを記述する
  2. Dartでユーザーインターフェースを記述する
- [Flutterでモバイルdappを構築する](https://medium.com/dash-community/building-a-mobile-dapp-with-flutter-be945c80315a)ははるかに短く、すでに基本を理解している場合に適しているかもしれません
- ビデオを見て学習したい場合は、約1時間の長さの[初めてのブロックチェーンFlutterアプリの構築](https://www.youtube.com/watch?v=3Eeh3pJ6PeA)を視聴できます。
- 時間がない場合は、わずか20分ほどの[イーサリアムでのFlutterとDartを使用したブロックチェーン分散型アプリの構築](https://www.youtube.com/watch?v=jaMFEOCq_1s)がおすすめです。
- [WalletConnectのWeb3Modalを使用したFlutterアプリケーションへのMetaMaskの統合](https://www.youtube.com/watch?v=v_M2buHCpc4) - この短いビデオでは、WalletConnectの[Web3Modal](https://pub.dev/packages/web3modal_flutter)ライブラリを使用して、MetaMaskをFlutterアプリケーションに統合する手順を説明します。
- [SolidityとFlutterによるモバイルブロックチェーンデベロッパーブートキャンプコース](https://youtube.com/playlist?list=PL4V4Unlk5luhQ26ERO6hWEbcUwHDSSmVH) - フルスタックのモバイルブロックチェーンデベロッパーコースのプレイリスト

## イーサリアムクライアントの操作 {#working-with-ethereum-clients}

イーサリアムを使用して、仮想通貨とブロックチェーン技術の利点を活用した分散型アプリケーション (「dapp」) を作成します。
Dartでイーサリアムの[JSON-RPC API](/developers/docs/apis/json-rpc/)を使用するための、現在メンテナンスされているライブラリが少なくとも2つあります。

1. [pwa.irのWeb3dart](https://pub.dev/packages/web3dart)
2. [darticulate.com](https://pub.dev/packages/ethereumのEthereum 5.0.0)

特定のイーサリアムアドレスの操作やさまざまな仮想通貨の価格の取得を可能にする、追加のライブラリもあります。
[全リストはこちらで確認できます](https://pub.dev/dart/packages?q=ethereum)。
