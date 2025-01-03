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
- ガス用のETH - 他のトランザクションと同様にガスリミットを設定しますので、コントラクトのデプロイには、単純なETHの送金よりも多くのガスが必要であることに注意してください。
- デプロイメントのためのスクリプトやプラグイン。
- [イーサリアムノード](/developers/docs/nodes-and-clients/)へのアクセス。これは、自身のノードを実行するか、公開ノードに接続するか、[ノードサービス](/developers/docs/nodes-and-clients/nodes-as-a-service/)を使用してAPIキーを介するかのいずれかの方法で行います。

### スマートコントラクトをデプロイする手順 {#steps-to-deploy}

具体的な手順は、使っている開発フレームワークによって異なります。 実例は、[コントラクトのデプロイに関するHardhatのドキュメント](https://hardhat.org/guides/deploying.html)または [スマートコントラクトのデプロイと検証に関するFoundryのドキュメント](https://book.getfoundry.sh/forge/deploying)をご確認ください。 デプロイされると、他の [アカウント](/developers/docs/accounts/)と同様に、コントラクトには、イーサリアムアドレスが設定されます。また、[ソースコード検証ツール](/developers/docs/smart-contracts/verifying/#source-code-verification-tools)を使って検証することができます。

## 関連ツール {#related-tools}

**Remix - _Remix IDEでは、イーサリアムのようなブロックチェーン上のスマートコントラクトの開発、デプロイ、管理を行うことができます。_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _スマートコントラクトの開発、テスト、監視、運用のためのデバッグ、オブザーバビリティ、インフラストラクチャ・ビルディング・ブロックを提供するWeb3開発プラットフォーム_**

- [tenderly.co](https://tenderly.co/)
- [ドキュメント](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _イーサリアムソフトウェアのコンパイル、デプロイ、テスト、デバッグができる開発環境。_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [コントラクトのデプロイについてのドキュメント](https://hardhat.org/guides/deploying.html)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**サードウェブ - _単一のコマンドを使い、任意のコントラクトを任意のEVM互換チェーンに容易にデプロイ_**

- [ドキュメント](https://portal.thirdweb.com/deploy/)

## 関連チュートリアル {#related-tutorials}

- [最初のスマートコントラクトのデプロイ](/developers/tutorials/deploying-your-first-smart-contract/) _- イーサリアムテストネットワークに最初のスマートコントラクトをデプロイする方法の紹介_
- [Hello World | スマートコントラクトチュートリアル](/developers/tutorials/hello-world-smart-contract/) _– 基本的なスマートコントラクトの作成と、イーサリアムへのデプロイ方法を学ぶための、わかりやすいチュートリアル_
- [Solidityを使用した他のコントラクトとの連携](/developers/tutorials/interact-with-other-contracts-from-solidity/) _- 既存のコントラクトからスマートコントラクトをデプロイし、それを扱う方法_
- [コントラクトのサイズを小さくする方法](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- コントラクトコードのサイズをリミットよりも下げて、ガスを節約する方法_

## 参考文献 {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhatを使用したコントラクトのデプロイ](https://hardhat.org/guides/deploying.html) - _Nomic Labs_

_役に立ったコミュニティリソースがあれば、 ぜひこのページに追加してください。_

## 関連トピック {#related-topics}

- [開発フレームワーク](/developers/docs/frameworks/)
- [イーサリアムノードの運用](/developers/docs/nodes-and-clients/run-a-node/)
- [Nodes-as-a-service(サービスとしてのノード)](/developers/docs/nodes-and-clients/nodes-as-a-service)
