---
title: スマートコントラクトの導入
description:
lang: ja
---

イーサリアムネットワークのユーザーがスマートコントラクトを利用できるようにするには、それをデプロイする必要があります。

ブロックチェーン上でのスマートコントラクトのデプロイとは、要するにスマートコントラクトのコンパイル済みのコードが格納されたイーサリアムトランザクションを、受信者を指定せずに送信するということです。

## 事前に {#prerequisites}

スマートコントラクトをデプロイする前に、[イーサリアムネットワーク](/developers/docs/networks/)、[トランザクション](/developers/docs/transactions/)、[スマートコントラクトの構造](/developers/docs/smart-contracts/anatomy/)を理解する必要があります。

コントラクトはブロックチェーンに保存されているため、デプロイする際にイーサ(ETH)もかかります。そのため、イーサリアムの[ガスと手数料](/developers/docs/gas/)を熟知しておく必要があります。

最後に、デプロイする前にコントラクトをコンパイルする必要がありますので、 [スマートコントラクトのコンパイル](/developers/docs/smart-contracts/compiling/)を必ずお読みください。

## スマートコントラクトのデプロイ方法 {#how-to-deploy-a-smart-contract}

### 必要なもの {#what-youll-need}

- コントラクトのバイトコード - これは[コンパイル](/developers/docs/smart-contracts/compiling/)によって生成されます。
- ガス用の ETH - 他のトランザクションと同様にガスリミットを設定しますので、コントラクトのデプロイには、単純な ETH の送金よりも多くのガスが必要であることに注意してください。
- デプロイメントのためのスクリプトやプラグイン。
- [イーサリアムノード](/developers/docs/nodes-and-clients/)へのアクセス。これは、自身のノードを実行するか、公開ノードに接続するか、[Infura](https://www.infura.io/)や[Alchemy](https://docs.alchemy.com/)のような[ノードサービス](/developers/docs/nodes-and-clients/nodes-as-a-service/)を使用して API キーを介するかのいずれかの方法で行います。

### スマートコントラクトをデプロイする手順 {#steps-to-deploy}

実際の手順は、どのツールを利用するかによって変わります。 例えば、[コントラクトのデプロイに関する Hardhat のドキュメント](https://hardhat.org/guides/deploying.html)や、[ネットワークとアプリケーションのデプロイに関する Truffle のドキュメント](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment)をご確認ください。 これらは、スマートコントラクトをデプロイするための最も一般的なツールです。このデプロイでは、デプロイの手順を進めていくためのスクリプトを作成します。

デプロイされると、コントラクトは他の[アカウント](/developers/docs/accounts/)と同じように、イーサリアムアドレスを持つようになります。

## 関連ツール {#related-tools}

**Remix - _Remix IDE では、イーサリアムのようなブロックチェーン上のスマートコントラクトの開発、デプロイ、管理を行うことができます。_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _スマートコントラクトの開発、テスト、監視、運用のためのデバッグ、オブザーバビリティ、インフラストラクチャ・ビルディング・ブロックを提供する Web3 開発プラットフォーム_**

- [tenderly.co](https://tenderly.co/)
- [ドキュメント](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _イーサリアムソフトウェアのコンパイル、デプロイ、テスト、デバッグができる開発環境。_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [コントラクトのデプロイについてのドキュメント](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**Truffle -** **_開発環境、テストフレームワーク、ビルドパイプライン、およびその他のツール。_**

- [trufflesuite.com](https://www.trufflesuite.com/)
- [ネットワークとアプリケーションのデプロイに関するドキュメント](https://www.trufflesuite.com/docs/truffle/advanced/networks-and-app-deployment)
- [GitHub](https://github.com/trufflesuite/truffle)

## 関連チュートリアル {#related-tutorials}

- [最初のスマートコントラクトのデプロイ](/developers/tutorials/deploying-your-first-smart-contract/) _- イーサリアムテストネットワークに最初のスマートコントラクトをデプロイする方法の紹介_
- [Hello World | スマートコントラクトチュートリアル](/developers/tutorials/hello-world-smart-contract/) _– 容易に理解できるチュートリアルです。基本的なスマートコントラクトを作成し、イーサリアムにデプロイします。_
- [Solidity を使用した他のコントラクトとの連携](/developers/tutorials/interact-with-other-contracts-from-solidity/) _- 既存のコントラクトからスマートコントラクトをデプロイし、それを扱う方法_
- [コントラクトのサイズを小さくする方法](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- コントラクトコードのサイズをリミットよりも下げて、ガスを節約する方法_

## 参考文献 {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat を使用したコントラクトのデプロイ](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_イーサリアムを学ぶために利用したコミュニティリソースはありますか？ もしあればページを編集して追加してください！_

## 関連トピック {#related-topics}

- [開発フレームワーク](/developers/docs/frameworks/)
- [イーサリアムノードの実行](/developers/docs/nodes-and-clients/run-a-node/)
