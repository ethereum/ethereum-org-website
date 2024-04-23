---
title: .NETデベロッパーのためのイーサリアム
description: .NETベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ
lang: ja
incomplete: true
---

<FeaturedText>.NETベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ</FeaturedText>

イーサリアムを使用して、仮想通貨とブロックチェーン技術のメリットを活用した分散型アプリケーション (「dapp」) を作成します。 dappは、信頼性の高いアプリケーションです。つまり、イーサリアムにデプロイした後は、常にプログラムしたとおりに動作します。 デジタル資産を制御して、新たなタイプの金融アプリケーションを作成できます。 また、分散化できるため、単一のエンティティや個人は制御できず、検閲はほぼ不可能であることを意味します。

Microsoftのテクノロジースタックのツールと言語を使用して、イーサリアム上に分散型アプリケーションを構築し、スマートコントラクトとやり取りできます。.NET Framework/.NET Core/.NET Standardにまたがり、VSCodeとVisual Studioなどのツールにより、C#、# Visual Basic、.NET、F#をサポートしています。 Microsoft Azure Blockchainを使用して、Azure上にイーサリアムブロックチェーンを数分でデプロイできます。 イーサリアムに.NETの愛を届けよう！

## スマートコントラクトとSolidity言語を使い始める {#getting-started-with-smart-contracts-and-the-solidity-language}

**.NETをイーサリアムに統合するための最初のステップを踏み出してみましょう。**

先に基礎を学習したい場合は、 [ethereum.org/learn](/learn/)または[ethereum.org/developers](/developers/)をご確認ください。

- [ブロックチェーンの説明](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマートコントラクトを理解する](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマートコントラクトを記述する](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidityのコンパイルとデプロイの方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 初級者向けの参照文献とリンク {#beginner-references-and-links}

**NethereumライブラリとVS Code Solidityの紹介**

- [Nethereum入門](https://docs.nethereum.com/en/latest/getting-started/)
- [VS Code Solidityのインストール](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [イーサリアムスマートコントラクトを作成して呼び出すための.NETデベロッパーのワークフロー](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [Nethereumとのスマートコントラクトの統合](https://kauri.io/#collections/Getting%20Started/smart-contracts-integration-with-nethereum/#smart-contracts-integration-with-nethereumm)
- [.NETおよびイーサリアムブロックチェーンのスマートコントラクトとNethereumとの間のインターフェース](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933) ([中文版](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1)も参照)
- [Nethereum - ブロックチェーン用のオープンソース.NET統合ライブラリ](https://kauri.io/#collections/a%20hackathon%20survival%20guide/nethereum-an-open-source-.net-integration-library/)
- [Nethereumを使用したSQLデータベースへのイーサリアムトランザクションの記述](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [C#とVisual Studioを使用してイーサリアムスマートコントラクトを簡単にデプロイする方法](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**セットアップをスキップして、そのままサンプルに進みますか？**

- [Playground](http://playground.nethereum.com/) - ブラウザを介してイーサリアムとやり取りし、Nethereumの使用方法を学ぶ
  - アカウント残高のクエリ [C#](http://playground.nethereum.com/csharp/id/1001) [VB.NET](http://playground.nethereum.com/vb/id/2001)
  - ERC20スマートコントラクトの残高のクエリ [C#](http://playground.nethereum.com/csharp/id/1005) [VB.NET](http://playground.nethereum.com/vb/id/2004)
  - アカウントへのEtherの送金 [C#](http://playground.nethereum.com/csharp/id/1003) [VB.NET](http://playground.nethereum.com/vb/id/2003)
  - ... などなど！

## 中級者向けの記事 {#intermediate-articles}

- [Nethereumのワークブックとサンプルリスト](http://docs.nethereum.com/en/latest/Nethereum.Workbooks/docs/)
- [独自の開発テストチェーンをデプロイする](https://github.com/Nethereum/Testchains)
- [SolidityのためのVS Codeコード生成プラグイン](https://docs.nethereum.com/en/latest/nethereum-codegen-vscodesolidity/)
- [Unityとイーサリアム: なぜ、そして、どうやって？](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [イーサリアムdapp用のASP.NET Core Web APIの作成](https://tech-mint.com/blockchain/create-asp-net-core-web-api-for-ethereum-dapps/)
- [Nethereum Web3を使用したサプライチェーントラッキングシステムの実装](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [Nethereumのブロック処理](https://nethereum.readthedocs.io/en/latest/nethereum-block-processing-detail/)と[C# Playgroundでのサンプル](http://playground.nethereum.com/csharp/id/1025)
- [NethereumのWebsocketストリーミング](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [KaleidoとNethereum](https://kaleido.io/kaleido-and-nethereum/)
- [QuorumとNethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## 高度なユースケース {#advanced-use-patterns}

- [Azure Key VaultとNethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [Nethereum.DappHybrid](https://github.com/Nethereum/Nethereum.DappHybrid)
- [Ujo Nethereumのバックエンドリファレンスアーキテクチャ](https://docs.nethereum.com/en/latest/nethereum-ujo-backend-sample/)

## .NETプロジェクト、ツール、その他 {#dot-net-projects-tools-and-other-fun-stuff}

- [Nethereum Playground](http://playground.nethereum.com/) - _ブラウザでのNethereumコードスニペットのコンパイル、作成、実行_
- [Nethereum Codegen Blazor](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _BlazorのUIを使用したNethereumのコード生成_
- [Nethereum Blazor](https://github.com/Nethereum/NethereumBlazor) - _.NET WasmのSPAライトブロックチェーンエクスプローラーとシンプルなウォレット_
- [Wonka Business Rules Engine](https://docs.nethereum.com/en/latest/wonka/) - _本質的にメタデータ駆動型の (.NETプラットフォームとイーサリアムプラットフォームの両方のための) ビジネスルールエンジン。_
- [Nethermind](https://github.com/NethermindEth/nethermind) - _Linux、Windows、MacOS用の.NET Coreイーサリアムクライアント_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _イーサリアム関連のコードベースを操作するためのユーティリティ関数_
- [TestChains](https://github.com/Nethereum/TestChains) - _高速応答のための事前設定済みの.NET開発チェーン (PoA)_

もっとリソースをお探しですか？ [ethereum.org/developers](/developers/)をご確認ください。

## .NETコミュニティコントリビューター {#dot-net-community-contributors}

Nethereumでは、主に[Gitter](https://gitter.im/Nethereum/Nethereum)を活用しています。ここでは誰でも、質問、質問への回答、支援要請などを行えます。単なる雑談も歓迎です。 [NethereumのGithubリポジトリ](https://github.com/Nethereum)では、リクエストのプルや問題のオープンが可能です。参加者のサイドプロジェクトやサンプルプロジェクトを閲覧することもできます。 また、その他に[Discord](https://discord.gg/jQPrR58FxX)もご利用いただけます。

Nethermindを初めて利用する際に支援が必要な場合は、[Discord](http://discord.gg/PaCMRFdvWT)にご参加ください。 デベロッパーが常駐しており、ご質問に回答します。 また、[Nethermind GitHub リポジトリ](https://github.com/NethermindEth/nethermind)でのリクエストのプルや問題のオープンも、いつでも行えます。

## その他のリスト {#other-aggregated-lists}

[Nethereumの公式サイト](https://nethereum.com/)  
[Nethermindの公式サイト](https://nethermind.io/)
