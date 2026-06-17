---
title: 分散型アプリケーション (dapp) 開発フレームワーク
description: フレームワークの利点を探り、利用可能なオプションを比較します。
lang: ja
---

## フレームワークの概要 {#introduction-to-frameworks}

本格的な分散型アプリケーション (dapp) を構築するには、さまざまなテクノロジーが必要です。ソフトウェアフレームワークには、必要な機能の多くが含まれており、希望するツールを選択するための簡単なプラグインシステムが提供されています。

フレームワークには、以下のようなすぐに使える機能が多数用意されています。

- ローカルのブロックチェーンインスタンスを立ち上げる機能。
- スマート・コントラクトをコンパイルしてテストするためのユーティリティ。
- 同じプロジェクト/リポジトリ内でユーザー向けアプリケーションを構築するためのクライアント開発アドオン。
- ローカルで実行されているインスタンスであれ、イーサリアムのパブリックネットワークのいずれかであれ、イーサリアムネットワークに接続してコントラクトをデプロイするための構成。
- 分散型アプリの配信 - IPFSなどのストレージオプションとの統合。

## 前提条件 {#prerequisites}

フレームワークについて深く掘り下げる前に、まずは[分散型アプリケーション (dapp)](/developers/docs/dapps/)と[イーサリアムスタック](/developers/docs/ethereum-stack/)の概要を一読することをお勧めします。

## 利用可能なフレームワーク {#available-frameworks}

**Foundry** - **_Foundryは、イーサリアムアプリケーション開発のための、非常に高速でポータブルかつモジュール式のツールキットです。_**

- [Foundryのインストール](https://book.getfoundry.sh/)
- [Foundry Book](https://book.getfoundry.sh/)
- [テレグラムのFoundryコミュニティチャット](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_プロフェッショナル向けのイーサリアム開発環境です。_**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Pythonユーザー、データサイエンティスト、セキュリティ専門家向けのスマート・コントラクト開発ツールです。_**

- [ドキュメント](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM上でブロックチェーンアプリケーションを開発するためのプラットフォームです。_**

- [ホームページ](https://www.web3labs.com/web3j-sdk)
- [ドキュメント](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVMベースのブロックチェーン向けの、非同期で高性能なKotlin/Java/Androidライブラリです。_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [例](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [ディスコード](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_1つのコマンドでイーサリアムを活用したアプリを作成できます。選択可能なUIフレームワークとDeFiテンプレートが豊富に用意されています。_**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [テンプレート](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-ETH -** **_Web3向けのEthers.js + Hardhat + Reactコンポーネントとフック。スマート・コントラクトを活用した分散型アプリケーション (dapp) の構築を開始するために必要なものがすべて揃っています。_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_ブロックチェーン開発者がスマート・コントラクトを構築、テスト、デバッグ、監視、運用し、dappのUXを向上させることを可能にするWeb3開発プラットフォームです。_**

- [ウェブサイト](https://tenderly.co/)
- [ドキュメント](https://docs.tenderly.co/)

**The Graph -** **_ブロックチェーンデータを効率的にクエリするためのThe Graphです。_**

- [ウェブサイト](https://thegraph.com/)
- [チュートリアル](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_イーサリアム開発プラットフォームです。_**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [ディスコード](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_イーサリアム開発プラットフォームです。_**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [ディスコード](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_強力なSDKとCLIを使用して、スマート・コントラクトと対話できるWeb3アプリケーションを構築します。_**

- [ドキュメント](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (イーサリアムおよびその他) 開発プラットフォームです。_**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [ディスコード](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_エンタープライズグレードのWeb3開発プラットフォームであり、すべての主要なチェーン、EVMチェーン (およびその他) 上でNFTアプリケーションを構築できます。_**

- [ウェブサイト](https://www.crossmint.com)
- [ドキュメント](https://docs.crossmint.com)
- [ディスコード](https://discord.com/invite/crossmint)

**Brownie -** **_Pythonベースの開発環境およびテストフレームワークです。_**

- [ドキュメント](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownieは現在メンテナンスされていません**

**オープンツェッペリン SDK -** **_究極のスマート・コントラクトツールキット: スマート・コントラクトの開発、コンパイル、アップグレード、デプロイ、および対話を支援するツールのスイートです。_**

- [オープンツェッペリン Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [コミュニティフォーラム](https://forum.openzeppelin.com/c/support/17)
- **オープンツェッペリン SDKの開発は終了しました**

**Catapulta -** **_マルチチェーンのスマート・コントラクトデプロイツールです。ブロックエクスプローラーでの検証を自動化し、デプロイされたスマート・コントラクトを追跡してデプロイレポートを共有します。FoundryおよびHardhatプロジェクトでプラグアンドプレイが可能です。_**

- [GitHub](https://github.com/catapulta-sh)

**GoldRush (powered by Covalent) -** **_GoldRushは、開発者、アナリスト、企業向けに最も包括的なブロックチェーンデータAPIスイートを提供します。DeFiダッシュボード、ウォレット、トレーディングボット、AI・エージェント、コンプライアンスプラットフォームのいずれを構築している場合でも、データAPIは必要な不可欠なオンチェーンデータへの高速で正確かつ開発者フレンドリーなアクセスを提供します。_**

- [ウェブサイト](https://goldrush.dev/)
- [ドキュメント](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [ディスコード](https://www.covalenthq.com/discord/)

**Wake -** **_コントラクトのテスト、ファジング、デプロイ、脆弱性スキャン、コードナビゲーションのためのオールインワンPythonフレームワークです。_**

- [ホームページ](https://getwake.io/)
- [ドキュメント](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code拡張機能](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_分散型アプリケーション開発者が分散型IDと検証可能なクレデンシャルをアプリケーションに簡単に組み込めるようにする、オープンソースでモジュール式の非依存型フレームワークです。_**

- [ホームページ](https://veramo.io/)
- [ドキュメント](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [ディスコード](https://discord.com/invite/FRRBdjemHV)
- [NPMパッケージ](https://www.npmjs.com/package/@veramo/core)

## 参考文献 {#further-reading}

_役に立ったコミュニティリソースをご存知ですか？このページを編集して追加してください！_

## 関連トピック {#related-topics}

- [ローカル開発環境のセットアップ](/developers/local-environment/)

## チュートリアル: イーサリアムの開発フレームワーク {#tutorials}

- [初心者のためのHello Worldスマート・コントラクト – フルスタック](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Hardhatを使用してHello Worldスマート・コントラクトを構築およびデプロイし、フロントエンドに接続します。_