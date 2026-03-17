---
title: "Dart 開發者適用的以太坊資源"
description: "學習如何使用 Dart 語言進行以太坊開發"
lang: zh-tw
incomplete: true
---

## 智慧型合約及 Solidity 程式語言入門 {#getting-started-with-smart-contracts-and-solidity}

## 教學 {#tutorials}

- [Flutter 與區塊鏈 – Hello World 去中心化應用程式](https://www.geeksforgeeks.org/flutter-and-blockchain-hello-world-dapp/) 會帶你完成所有入門步驟：
  1. 以 [Solidity](https://soliditylang.org/) 編寫智能合約
  2. 使用 Dart 編寫使用者介面
- [用 Flutter 建立行動去中心化應用程式](https://medium.com/dash-community/building-a-mobile-dapp-with-flutter-be945c80315a) 篇幅較短，
  如果你已了解基礎知識，這篇可能更適合你。
- 如果你偏好透過觀看影片來學習，可以觀看 [建立你的第一個區塊鏈 Flutter 應用程式](https://www.youtube.com/watch?v=3Eeh3pJ6PeA)，片長約一小時。
- 如果你沒什麼耐心，可能比較喜歡 [在以太坊上使用 Flutter 與 Dart 建立區塊鏈去中心化應用程式](https://www.youtube.com/watch?v=jaMFEOCq_1s)，影片長度只有約 20 分鐘。
- [透過 WalletConnect 的 Web3Modal 將 MetaMask 整合到 Flutter 應用程式](https://www.youtube.com/watch?v=v_M2buHCpc4) - 這段簡短影片會一步一步帶你使用 WalletConnect 的 [Web3Modal](https://pub.dev/packages/web3modal_flutter) 程式庫，將 MetaMask 整合到你的 Flutter 應用程式中。
- [使用 Solidity 與 Flutter 的行動區塊鏈開發者訓練營課程](https://youtube.com/playlist?list=PL4V4Unlk5luhQ26ERO6hWEbcUwHDSSmVH) - 全端行動區塊鏈開發者課程播放清單

## 使用以太坊用戶端 {#working-with-ethereum-clients}

你可以使用以太坊，來建立能夠利用加密貨幣與區塊鏈技術長處的去中心化應用程式（或稱「dapp」)。
目前 Dart 至少有兩個持續維護的程式庫，可用來存取以太坊的
[JSON-RPC API](/developers/docs/apis/json-rpc/)。

1. [pwa.ir](https://pub.dev/packages/web3dart 的 Web3dart)
2. [來自 darticulate.com](https://pub.dev/packages/ethereum 的以太坊 5.0.0)

還有其他程式庫讓你能夠操作特定的以太坊地址，
或擷取各種加密貨幣的價格。
[你可以在此處查看完整清單](https://pub.dev/dart/packages?q=ethereum)。
