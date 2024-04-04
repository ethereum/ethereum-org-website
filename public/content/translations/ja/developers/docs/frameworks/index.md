---
title: Dapp開発フレームワーク
description: フレームワークの利点を調査し、利用可能なオプションを比較します。
lang: ja
---

## フレームワーク入門 {#introduction-to-frameworks}

本格的なdappを構築するには、 さまざまな技術が必要になります。 ソフトウェアフレームワークには、必要な機能の多くが含まれています。 あるいは、好きなツールで作業できるように簡単なプラグインシステムが備わっています。

フレームワークには、すぐに使用できる機能が数多く用意されています。例えば、以下のようなものです。

- ローカルブロックチェーンのインスタンスをスピンアップする機能
- スマートコントラクトをコンパイルしてテストするためのユーティリティ
- 同じプロジェクト/リポジトリ内でユーザー側のアプリケーションを構築するために使用できる、クライアント開発アドオン
- イーサリアムネットワーク(ローカルで実行されているインスタンスまたはイーサリアムのパブリックネットワーク)に接続し、コントラクトをデプロイするための設定
- 分散型アプリケーションの配布 - IPFSなどのストレージオプションとの統合

## 前提知識 {#prerequisites}

フレームワークの使用を開始する前に、[dapp](/developers/docs/dapps/)と[イーサリアムスタック](/developers/docs/ethereum-stack/)の入門を最初に読むことをお勧めします。

## 利用可能なフレームワーク {#available-frameworks}

**Foundry -** **_Foundryは、イーサリアムアプリケーション開発のための、迅速でポータブルなモジュラー型ツールキットです。_**

- [Foundryをインストールする](https://book.getfoundry.sh/)
- [Foundryブック](https://book.getfoundry.sh/)
- [テレグラムのFoundryコミュニティチャット](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_プロフェッショナルのためのイーサリアム開発環境_**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_パイソニスタ、データサイエンティスト、セキュリティプロフェッショナル向けのスマートコントラクト開発ツール_**

- [ドキュメント](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM上でブロックチェーンアプリケーションを開発するためのプラットフォーム_**

- [ホームページ](https://www.web3labs.com/web3j-sdk)
- [ドキュメント](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**Create Eth App -** **_単一のコマンドで、イーサリアムで稼動するアプリケーションを作成可能。 豊富な選択肢を提供するUIフレームワークとDeFiテンプレートが付属。_**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [テンプレート](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Scaffold-Eth - Ethers.js + Hardhat + React components and hooks for web3: スマートコントラクトを利用した分散型アプリケーションの構築を始めるために必要なすべてを網羅。_**

- [GitHub](https://github.com/austintgriffith/scaffold-eth)

**Tenderly -** **_ブロックチェーンデベロッパーがスマートコントラクトを構築、テスト、デバッグ、監視、操作し、dApp UXを改善できるWeb3開発プラットフォーム。_**

- [ウェブサイト](https://tenderly.co/)
- [ドキュメント](https://docs.tenderly.co/ethereum-development-practices)

**The Graph -** **_ブロックチェーンデータのクエリを効率化。_**

- [ウェブサイト](https://thegraph.com/)
- [チュートリアル](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_イーサリアム開発プラットフォーム_**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**NodeReal -** **_イーサリアム開発プラットフォーム。_**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**サードウェブSDK -** **_強力なSDKとCLIを使ってスマートコントラクトとやり取りするWeb3アプリケーションを構築。_**

- [ドキュメント](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3(イーサリアム他)開発プラットフォーム。_**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Brownie -** **_Pythonベースの開発環境とテストフレームワーク。_**

- [ドキュメント](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownieのメンテナンス終了**

**Truffle -** **_開発環境、テストフレームワーク、ビルドパイプライン、その他のツール。_**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [GitHub](https://github.com/trufflesuite/truffle)
- **Truffle開発の終了** - [詳細について](https://twitter.com/trufflesuite/status/1704946902393860589?t=NlIWeLTbBSAaJmS5uUAhSA&s=19)

**OpenZeppelin SDK -** **_究極のスマートコントラクトツールキット。スマートコントラクトの開発、コンパイル、アップグレード、デプロイ、インタラクションを支援するツール群。_**

- [OpenZeppelin SDK](https://openzeppelin.com/sdk/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [コミュニティフォーラム](https://forum.openzeppelin.com/c/support/17)
- **OpenZeppelin SDK開発の終了**

## 参考文献 {#further-reading}

_役に立ったコミュニティリソースがあれば、 ぜひこのページに追加してください。_

## 関連トピック {#related-topics}

- [ローカル開発環境のセットアップ](/developers/local-environment/)
