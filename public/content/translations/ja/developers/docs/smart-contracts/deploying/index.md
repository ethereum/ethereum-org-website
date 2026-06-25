---
title: "スマート・コントラクトのデプロイ"
description: "前提条件、ツール、デプロイ手順など、イーサリアムネットワークにスマート・コントラクトをデプロイする方法について学びます。"
lang: ja
---

イーサリアムネットワークのユーザーが利用できるようにするには、スマート・コントラクトをデプロイする必要があります。

スマート・コントラクトをデプロイするには、受信者を指定せずに、スマート・コントラクトのコンパイル済みコードを含むイーサリアムのトランザクションを送信するだけです。

## 前提条件 {#prerequisites}

スマート・コントラクトをデプロイする前に、[イーサリアムネットワーク](/developers/docs/networks/)、[トランザクション](/developers/docs/transactions/)、および[スマート・コントラクトの構造](/developers/docs/smart-contracts/anatomy/)について理解しておく必要があります。

コントラクトはブロックチェーン上に保存されるため、デプロイにはイーサ(ETH)のコストもかかります。そのため、イーサリアムの[ガスと手数料](/developers/docs/gas/)について理解しておく必要があります。

最後に、デプロイする前にコントラクトをコンパイルする必要があるため、[スマート・コントラクトのコンパイル](/developers/docs/smart-contracts/compiling/)について必ず読んでおいてください。

## スマート・コントラクトのデプロイ方法 {#how-to-deploy-a-smart-contract}

### 必要なもの {#what-youll-need}

- コントラクトのバイトコード – これは[コンパイル](/developers/docs/smart-contracts/compiling/)によって生成されます
- ガス用のETH – 他のトランザクションと同様にガス・リミットを設定しますが、コントラクトのデプロイには単純なETHの送金よりもはるかに多くのガスが必要になることに注意してください
- デプロイ用のスクリプトまたはプラグイン
- 独自のノードを実行するか、パブリックノードに接続するか、または[ノードサービス](/developers/docs/nodes-and-clients/nodes-as-a-service/)を使用してAPI鍵経由で[イーサリアムノード](/developers/docs/nodes-and-clients/)へアクセスすること

### スマート・コントラクトをデプロイする手順 {#steps-to-deploy}

具体的な手順は、使用する開発フレームワークによって異なります。たとえば、[コントラクトのデプロイに関するHardhatのドキュメント](https://hardhat.org/docs/tutorial/deploying)や、[スマート・コントラクトのデプロイと検証に関するFoundryのドキュメント](https://book.getfoundry.sh/forge/deploying)を確認できます。デプロイされると、コントラクトは他の[アカウント](/developers/docs/accounts/)と同様にイーサリアムのアドレスを持ち、[ソース・コード検証ツール](/developers/docs/smart-contracts/verifying/#source-code-verification-tools)を使用して検証できるようになります。

## 関連ツール {#related-tools}

**Remix - _Remix IDEは、イーサリアムのようなブロックチェーン向けのスマート・コントラクトの開発、デプロイ、管理を可能にします_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _スマート・コントラクトの開発、テスト、監視、運用のためのデバッグ、可観測性、インフラストラクチャの構成要素を提供するWeb3開発プラットフォーム_**

- [tenderly.co](https://tenderly.co/)
- [ドキュメント](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [ディスコード](https://discord.gg/eCWjuvt)

**Hardhat - _イーサリアムソフトウェアのコンパイル、デプロイ、テスト、デバッグを行うための開発環境_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [コントラクトのデプロイに関するドキュメント](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [ディスコード](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _単一のコマンドを使用して、任意のEVM互換チェーンに任意のコントラクトを簡単にデプロイします_**

- [ドキュメント](https://portal.thirdweb.com/deploy/)

**Crossmint - _スマート・コントラクトのデプロイ、クレジットカードおよびクロスチェーン決済の有効化、APIを使用したNFTの作成、配布、販売、保存、編集を行うためのエンタープライズグレードのWeb3開発プラットフォーム。_**

- [crossmint.com](https://www.crossmint.com)
- [ドキュメント](https://docs.crossmint.com)
- [ディスコード](https://discord.com/invite/crossmint)
- [ブログ](https://blog.crossmint.com)

## 関連チュートリアル {#related-tutorials}

- [初めてのスマート・コントラクトのデプロイ](/developers/tutorials/deploying-your-first-smart-contract/) _– イーサリアムのテストネットワークに初めてスマート・コントラクトをデプロイするための入門。_
- [Hello World | スマート・コントラクトのチュートリアル](/developers/tutorials/hello-world-smart-contract/) _– イーサリアム上で基本的なスマート・コントラクトを作成してデプロイするためのわかりやすいチュートリアル。_
- [Solidityから他のコントラクトと対話する](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 既存のコントラクトからスマート・コントラクトをデプロイし、それと対話する方法。_
- [コントラクトのサイズを縮小する方法](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- コントラクトのサイズを制限内に抑え、ガスを節約するためにサイズを縮小する方法_

## 参考文献 {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _オープンツェッペリン_
- [Hardhatを使用したコントラクトのデプロイ](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_役に立つコミュニティリソースをご存知ですか？このページを編集して追加してください！_

## 関連トピック {#related-topics}

- [開発フレームワーク](/developers/docs/frameworks/)
- [イーサリアムノードの実行](/developers/docs/nodes-and-clients/run-a-node/)
- [ノード・アズ・ア・サービス](/developers/docs/nodes-and-clients/nodes-as-a-service)