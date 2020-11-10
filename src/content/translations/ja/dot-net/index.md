---
title: .NET開発者ためのイーサリアム
description: .NETベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ
lang: ja
sidebar: true
sidebarDepth: 1
---

# .NET 開発者のためのイーサリアム {#ethereum-for-dot-net-devs}

<div class="featured">.NETベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ</div>

イーサリアムを使用して、暗号通貨とブロックチェーン技術の利点を利用した分散型アプリケーション (decentralized applications; dapps) を作成します。 これらの dapps は信頼でき、一度イーサリアムにデプロイすれば、常にプログラム通りに動作することを意味します。 そしてデジタルアセットを取り扱うことで新たな金融アプリケーションを作ることができます。 それらは分散化できます。つまり、単一のエンティティや人がそれらをコントロールすることはなく、検閲はほぼ不可能です。

イーサリアム上に分散型アプリケーションを構築し、Microsoft の技術スタックのツールや言語を使用してスマートコントラクトと対話しましょう。.NET Framework/.NET Core/.NET Standard にまたがって、VSCode や Visual Studio などのツール上で、C#、# Visual Basic .NET、F#をサポートしています。 Microsoft Azure Blockchain を使用して Azure 上にイーサリアムブロックチェーンを数分でデプロイしましょう。 イーサリアムに.NET の愛を届けよう！

<img src="https://raw.githubusercontent.com/Nethereum/Nethereum/master/logos/logo192x192t.png" />

## スマートコントラクトと Solidity 言語の入門

**.NET をイーサリアムに統合するための最初のステップを踏み出してみましょう。**

先により基礎的なことを学びたい人は [ethereum.org/learn](/ja/learn/)あるいは[ethereum.org/developers](/developers/)をチェックしてください。

- [ブロックチェーンの説明](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [スマートコントラクトを理解する](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [初めてのスマートコントラクトを書く](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity のコンパイルとデプロイ方法を学ぶ](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## 初級者向けリファレンスとリンク {#beginner-references-and-links}

**Netherum ライブラリと VS Code Solidity の紹介**

- [Nethereum 入門](https://docs.nethereum.com/en/latest/getting-started/)
- [VS Code に Solidity をインストール](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [イーサリアムスマートコントラクトを作成して呼び出すための.NET 開発者のワークフロー](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [Nethereum とのスマートコントラクトの統合](https://kauri.io/article/b54334b0695342c1bbe161c4c4467b50/smart-contracts-integration-with-nethereum)
- [.NET とイーサリアムブロックチェーンのスマートコントラクトを Nethereum と連動させる](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933) ([中文版](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1))
- [Nethereum - ブロックチェーン用のオープンソース.NET 統合ライブラリ](https://kauri.io/article/d15dfd4903f149cdb84b3ce666103b52/v1/nethereum-an-open-source-.net-integration-library-for-blockchain)
- [Nethereum を使った SQL データベースへのイーサリアムトランザクションの書き込み](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [C#と VisualStudio を使ってイーサリアムスマートコントラクトを簡単にデプロイする方法をご覧ください](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**セットアップをスキップして、そのままサンプルに進みますか？**

- [Playground](http://playground.nethereum.com/) - イーサリアムとインタラクトして、ブラウザを通して Nethereum の使い方を学ぶ。
  - アカウント残高のクエリ [C#](http://playground.nethereum.com/csharp/id/1001) [VB.NET](http://playground.nethereum.com/vb/id/2001)
  - ERC20 スマートコントラクトの残高のクエリ [C#](http://playground.nethereum.com/csharp/id/1005) [VB.NET](http://playground.nethereum.com/vb/id/2004)
  - アカウントへの ether の送金 [C#](http://playground.nethereum.com/csharp/id/1003) [VB.NET](http://playground.nethereum.com/vb/id/2003)
  - ... などなど！

## 中級記事 {#intermediate-articles}

- [Nethereum のワークブックとサンプルリスト](http://docs.nethereum.com/en/latest/Nethereum.Workbooks/docs/)
- [独自の開発テストチェーンをデプロイする](https://github.com/Nethereum/Testchains)
- [VSCode の Solidity のためのコード生成プラグイン](https://docs.nethereum.com/en/latest/nethereum-codegen-vscodesolidity/)
- [Unity とイーサリアム: なぜ、そして、どうやって？](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [イーサリアム dapps 用の ASP.NET Core Web API を作成する](https://tech-mint.com/create-asp-net-core-web-api-for-ethereum-dapps/)
- [Nethereum Web3 を利用してサプライチェーンのトラッキングシステムを実装](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [Nethereum のブロック処理](https://nethereum.readthedocs.io/en/latest/nethereum-block-processing-detail/)と[C# Playground でのサンプル](http://playground.nethereum.com/csharp/id/1025)
- [Nethereum の Websocket ストリーミング](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [Kaleido と Nethereum](https://kaleido.io/kaleido-and-nethereum/)
- [Quorum と Nethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## 高度な利用パターン {#advanced-use-patterns}

- [Azure Key Vault と Nethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [Nethereum.DappHybrid](https://github.com/Nethereum/Nethereum.DappHybrid)
- [Ujo Netherum のバックエンドリファレンスアーキテクチャ](https://docs.nethereum.com/en/latest/nethereum-ujo-backend-sample/)

## .NET のプロジェクト、ツール、その他の楽しいもの{#dot-net-projects-tools-and-other-fun stiff}

- [Nethereum Playground](http://playground.nethereum.com/) - _ブラウザで Nethereum コードスニペットをコンパイル、作成、実行する_
- [Nethereum Codegen Blazor](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _Blazor の UI を備えた Nethereum のコード生成_
- [Nethereum Blazor](https://github.com/Nethereum/NethereumBlazor) - _.NET の Wasm で記述された SPA ライトブロックチェーンエクスプローラーとシンプルなウォレット_
- [Wonka Business Rules Engine](https://docs.nethereum.com/en/latest/wonka/) - _本質的にメタデータ駆動型の(.NET プラットフォームとイーサリアムプラットフォームの両方に対する)ビジネスルールエンジン。_
- [Nethermind](https://github.com/NethermindEth/nethermind) - _Linux、Windows、MacOS 用の.NET Core イーサリアムクライアント_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _イーサリアム関連のコードベースを操作するためのユーティリティ関数_
- [TestChains](https://github.com/Nethereum/TestChains) - _高速応答のための事前設定済みの.NET 開発チェーン (PoA)_

もっとリソースをお探しですか？ [ethereum.org/developers](/ja/developers/) をチェックしてください

## .NET コミュニティコントリビューター {#dot-net-community-contributors}

Netherum では、主に[Gitter](https://gitter.im/Nethereum/Nethereum)で議論しており、質問や回答を歓迎する他、助けを求めたり、ゆっくりしたりしてください。 [Nethereum の Github リポジトリ](https://github.com/Nethereum)で PR をしたり、issue を立てたりすることもできますし、私たちが持つ多くのサイドプロジェクトやサンプルプロジェクトを閲覧することもできます。

Nethermind では、[Gitter](https://gitter.im/nethermindeth/nethermind)を通じて連絡を取り合いましょう。 PR や issue については、[Nethermind の Github リポジトリ](https://github.com/NethermindEth/nethermind)をチェックしてください。

## 他のリスト {#other-aggregated-lists}

[Nethereum の公式サイト](https://nethereum.com/) [Nethermind の公式サイト](https://nethermind.io/)
