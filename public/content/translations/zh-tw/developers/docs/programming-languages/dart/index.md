---
title: Dart 開發者的以太坊指南
description: 學習如何使用 Dart 語言在以太坊上進行開發
lang: zh-tw
incomplete: true
---

## 開始使用智能合約與 Solidity 語言 {#getting-started-with-smart-contracts-and-solidity}

## 教學 {#tutorials}

- [Flutter 與區塊鏈 – Hello World Dapp](https://www.geeksforgeeks.org/flutter-and-blockchain-hello-world-dapp/) 帶您了解所有入門步驟：
  1.  使用 [Solidity](https://soliditylang.org/) 撰寫智能合約
  2.  使用 Dart 撰寫使用者介面
- [使用 Flutter 建立行動版去中心化應用程式 (dapp)](https://medium.com/dash-community/building-a-mobile-dapp-with-flutter-be945c80315a) 篇幅較短，如果您已經具備基礎知識，這可能會是更好的選擇
- 如果您偏好透過觀看影片學習，可以觀看 [建立您的第一個區塊鏈 Flutter 應用程式](https://www.youtube.com/watch?v=3Eeh3pJ6PeA)，片長約一小時
- 如果您想快速上手，您可能會喜歡 [在以太坊上使用 Flutter 與 Dart 建立區塊鏈去中心化應用程式 (dapp)](https://www.youtube.com/watch?v=jaMFEOCq_1s)，片長僅約二十分鐘
- [使用 WalletConnect 的 Web3Modal 將 MetaMask 整合至 Flutter 應用程式](https://www.youtube.com/watch?v=v_M2buHCpc4) - 這部簡短的影片將帶您了解如何使用 WalletConnect 的 [Web3Modal](https://pub.dev/packages/web3modal_flutter) 函式庫，將 MetaMask 整合至您的 Flutter 應用程式中
- [使用 Solidity 與 Flutter 的行動版區塊鏈開發者訓練營課程](https://youtube.com/playlist?list=PL4V4Unlk5luhQ26ERO6hWEbcUwHDSSmVH) - 全端行動版區塊鏈開發者課程播放清單

## 使用以太坊客戶端 {#working-with-ethereum-clients}

您可以使用以太坊建立去中心化應用程式 (dapp)，以利用加密貨幣與區塊鏈技術的優勢。
目前至少有兩個持續維護的 Dart 函式庫，可用於存取以太坊的 [JSON-RPC API](/developers/docs/apis/json-rpc/)。

1. [來自 pwa.ir 的 Web3dart](https://pub.dev/packages/web3dart)
1. [來自 darticulate.com 的 Ethereum 5.0.0](https://pub.dev/packages/ethereum)

此外，還有其他函式庫可讓您操作特定的以太坊地址，或讓您擷取各種加密貨幣的價格。
[您可以在此處查看完整清單](https://pub.dev/dart/packages?q=ethereum)。