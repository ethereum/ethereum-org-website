---
title: Ethereum Dart-fejlesztők számára
description: Sajátítsa el az Ethereum-fejlesztést a Dart programozási nyelv használatával
lang: hu
incomplete: true
---

## Kezdő lépések az okosszerződésekkel és a Solidity nyelvvel {#getting-started-with-smart-contracts-and-solidity}

## Oktatóanyagok {#tutorials}

- [Flutter és blokklánc – Hello World Dapp](https://www.geeksforgeeks.org/flutter-and-blockchain-hello-world-dapp/) átvezeti Önt a kezdeti lépéseken:
  1.  Okosszerződés megírása [Solidity](https://soliditylang.org/) nyelven
  2.  Felhasználói felület megírása Dart nyelven
- A [mobilalkalmazások építése a Flutterrel](https://medium.com/dash-community/building-a-mobile-dapp-with-flutter-be945c80315a) sokkal rövidebb, amely jobb lehet, ha már ismeri az alapokat
- Ha videók segítségével jobban szeret tanulni, akkor nézze meg az [Építse meg első blokkláncos Flutter alkalmazását](https://www.youtube.com/watch?v=3Eeh3pJ6PeA) videót, amely nagyjából egy óra hosszú
- Ha ennél kevesebb ideje van, akkor talán tetszeni fog az [Egy blokklánc decentralizált alkalmazás építése a Flutterrel és a Darttal az Ethereumon](https://www.youtube.com/watch?v=jaMFEOCq_1s) videó, amely csak húsz percet veszi igénybe
- [A MetaMask integrációja a Flutter alkalmazásban a WalletConnect által nyújtott Web3Modal használatával](https://www.youtube.com/watch?v=v_M2buHCpc4) – ez a rövid videó bemutatja, hogyan kell a MetaMaskot beintegrálni a Flutter alkalmazásokba a [Web3Modal](https://pub.dev/packages/web3modal_flutter) könyvtárral, melyet a WalletConnect biztosít
- [Mobil blokkláncfejlesztői képzés Solidity-val és Flutterrel](https://youtube.com/playlist?list=PL4V4Unlk5luhQ26ERO6hWEbcUwHDSSmVH) – mobil blokkláncfejlesztői tanfolyam a teljes stack-kel (lejátszási lista)

## Munka Ethereum kliensekkel {#working-with-ethereum-clients}

Az Ethereumot decentralizált alkalmazások (dappok) fejlesztésére használhatja, amelyek a kriptovaluták és a blokklánc-technológia nyújtotta összes előnyét kiélvezhetik. A Darthoz legalább két könyvtárat tartanak karban, hogy a [JSON-RPC API-t](/developers/docs/apis/json-rpc/) használja az Ethereumra.

1. [Web3dart a simonbutler.eu forrásból](https://pub.dev/packages/web3dart)
1. [Ethereum 5.0.0 a darticulate.com forrásból](https://pub.dev/packages/ethereum)

Vannak még emellett olyan könyvtárak is, amelyekkel bizonyos Ethereum címeket lehet kezelni, vagy különféle kriptovaluták árait lehet lekérdezni. [Ezek teljes listája itt látható](https://pub.dev/dart/packages?q=ethereum).
