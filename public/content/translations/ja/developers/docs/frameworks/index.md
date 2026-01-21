---
title: Dapp開発フレームワーク
description: フレームワークの利点を調査し、利用可能なオプションを比較します。
lang: ja
---

## フレームワーク入門 {#introduction-to-frameworks}

本格的なdappを構築するには、
さまざまな技術が必要になります。 ソフトウェアフレームワークには、必要な機能の多くが含まれています。
あるいは、好きなツールで作業できるように簡単なプラグインシステムが備わっています。

フレームワークには、すぐに使用できる機能が数多く用意されています。例えば、以下のようなものです。

- ローカルブロックチェーンのインスタンスをスピンアップする機能
- スマートコントラクトをコンパイルしてテストするためのユーティリティ
- ユーザー向けのアプリケーションを、同じプロジェクト/リポジトリ内で構築するための
  クライアント開発アドオン。
- Ethereumネットワークに接続しコントラクトをデプロイするための設定。
  ローカル実行インスタンス、またはEthereumの
  パブリックネットワークのいずれかで使用。
- 分散型アプリの配布 - IPFSなどのストレージ
  オプションとの統合。

## 前提条件{#prerequisites}

フレームワークを深く掘り下げる前に、まず[dapps](/developers/docs/dapps/)と[Ethereumスタック](/developers/docs/ethereum-stack/)の入門ガイドに目を通すことをお勧めします。

## 利用可能なフレームワーク {#available-frameworks}

**Foundry** - **_Foundryは、Ethereumアプリケーション開発のための、超高速でポータブルなモジュラーツールキットです_**

- [Foundryのインストール](https://book.getfoundry.sh/)
- [Foundryブック](https://book.getfoundry.sh/)
- [Foundryコミュニティチャット (Telegram)](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_プロフェッショナル向けのEthereum開発環境。_**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Pythonista、データサイエンティスト、セキュリティプロフェッショナル向けのスマートコントラクト開発ツール。_**

- [ドキュメント](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM上でブロックチェーンアプリケーションを開発するためのプラットフォーム。_**

- [ホームページ](https://www.web3labs.com/web3j-sdk)
- [ドキュメント](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVMベースのブロックチェーン向けの、非同期で高性能なKotlin/Java/Androidライブラリ。_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [サンプル](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_単一のコマンドでEthereumを利用したアプリを作成。 豊富なUIフレームワークとDeFiテンプレートから選択できます。_**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [テンプレート](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Ethers.js + Hardhat + web3用Reactコンポーネントとフック：スマートコントラクトを搭載した分散型アプリケーションの構築を始めるために必要なすべてが揃っています。_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_ブロックチェーンデベロッパーがスマートコントラクトの構築、テスト、デバッグ、監視、運用を行い、dappのUXを向上させることを可能にするWeb3開発プラットフォーム。_**

- [ウェブサイト](https://tenderly.co/)
- [ドキュメント](https://docs.tenderly.co/)

**The Graph -** **_ブロックチェーンデータを効率的にクエリするためのThe Graph。_**

- [ウェブサイト](https://thegraph.com/)
- [チュートリアル](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_Ethereum開発プラットフォーム。_**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_Ethereum開発プラットフォーム。_**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_強力なSDKとCLIを使用して、スマートコントラクトと対話できるweb3アプリケーションを構築します。_**

- [ドキュメント](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (Ethereumなど) 開発プラットフォーム。_**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_エンタープライズグレードのweb3開発プラットフォームで、すべての主要なEVMチェーン (およびその他) でNFTアプリケーションを構築できます。_**

- [ウェブサイト](https://www.crossmint.com)
- [ドキュメント](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_Pythonベースの開発環境およびテストフレームワーク。_**

- [ドキュメント](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownieのメンテナンス終了**

**OpenZeppelin SDK -** **_究極のスマートコントラクトツールキット：スマートコントラクトの開発、コンパイル、アップグレード、デプロイ、操作を支援する一連のツール。_**

- [OpenZeppelin Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [コミュニティフォーラム](https://forum.openzeppelin.com/c/support/17)
- **OpenZeppelin SDK開発の終了**

**Catapulta -** **_マルチチェーンのスマートコントラクトデプロイツール。ブロックエクスプローラーでの検証の自動化、デプロイ済みスマートコントラクトの追跡、デプロイレポートの共有、FoundryおよびHardhatプロジェクトへのプラグアンドプレイに対応。_**

- [ウェブサイト](https://catapulta.sh/)
- [ドキュメント](https://catapulta.sh/docs)
- [GitHub](https://github.com/catapulta-sh)

**GoldRush (powered by Covalent) -** **_GoldRushは、デベロッパー、アナリスト、企業向けに、最も包括的なブロックチェーンデータAPIスイートを提供します。 DeFiダッシュボード、ウォレット、取引ボット、AIエージェント、コンプライアンスプラットフォームのいずれを構築している場合でも、データAPIは、必要不可欠なオンチェーンデータへの高速で正確、かつデベロッパーフレンドリーなアクセスを提供します_**

- [ウェブサイト](https://goldrush.dev/)
- [ドキュメント](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_コントラクトのテスト、ファジング、デプロイ、脆弱性スキャン、コードナビゲーションのためのオールインワンPythonフレームワーク。_**

- [ホームページ](https://getwake.io/)
- [ドキュメント](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code拡張機能](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_分散型アプリケーションのデベロッパーが、分散型アイデンティティと検証可能なクレデンシャルをアプリケーションに簡単に組み込むことができる、オープンソースでモジュール式の、特定のテクノロジーに依存しないフレームワーク。_**

- [ホームページ](https://veramo.io/)
- [ドキュメント](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [Discord](https://discord.com/invite/FRRBdjemHV)
- [NPMパッケージ](https://www.npmjs.com/package/@veramo/core)

## 参考リンク{#further-reading}

_役に立つコミュニティリソースを知っていますか? Edit this page and add it!_

## 関連トピック{#related-topics}

- [ローカル開発環境をセットアップする](/developers/local-environment/)
