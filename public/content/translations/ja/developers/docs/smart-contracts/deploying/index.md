---
title: "スマートコントラクトの導入"
description: "スマートコントラクトをイーサリアムネットワークにデプロイする方法を学びましょう。前提条件、必要なツール、そしてデプロイの手順について解説します。"
lang: ja
---

イーサリアムネットワークのユーザーがスマートコントラクトを利用できるようにするには、それをデプロイする必要があります。

ブロックチェーン上でのスマートコントラクトのデプロイとは、要するにスマートコントラクトのコンパイル済みのコードが格納されたイーサリアムトランザクションを、受信者を指定せずに送信するということです。

## 前提条件 {#prerequisites}

スマートコントラクトをデプロイする前に、[イーサリアムネットワーク](/developers/docs/networks/)、[トランザクション](/developers/docs/transactions/)、[スマートコントラクトの構造](/developers/docs/smart-contracts/anatomy/)について理解しておく必要があります。

コントラクトはブロックチェーンに保存されるため、デプロイにはイーサ (ETH) のコストがかかります。そのため、イーサリアムの[ガスと手数料](/developers/docs/gas/)に精通しておく必要があります。

最後に、コントラクトをデプロイする前にコンパイルする必要があるため、必ず[スマートコントラクトのコンパイル](/developers/docs/smart-contracts/compiling/)についてお読みください。

## スマートコントラクトをデプロイする方法 {#how-to-deploy-a-smart-contract}

### 必要なもの {#what-youll-need}

- コントラクトのバイトコード – これは[コンパイル](/developers/docs/smart-contracts/compiling/)によって生成されます。
- ガス用のETH - 他のトランザクションと同様にガスリミットを設定しますので、コントラクトのデプロイには、単純なETHの送金よりも多くのガスが必要であることに注意してください。
- デプロイメントのためのスクリプトやプラグイン。
- [イーサリアムノード](/developers/docs/nodes-and-clients/)へのアクセス。自身でノードを稼働させるか、パブリックノードに接続するか、[ノードサービス](/developers/docs/nodes-and-clients/nodes-as-a-service/)を使用して API キーを介してアクセスします。

### スマートコントラクトをデプロイする手順 {#steps-to-deploy}

具体的な手順は、使っている開発フレームワークによって異なります。 例えば、[コントラクトのデプロイに関するHardhatのドキュメント](https://hardhat.org/docs/tutorial/deploying)や[スマートコントラクトのデプロイと検証に関するFoundryのドキュメント](https://book.getfoundry.sh/forge/deploying)を参照できます。 デプロイされると、コントラクトは他の[アカウント](/developers/docs/accounts/)と同様にイーサリアムアドレスを持つようになり、[ソースコード検証ツール](/developers/docs/smart-contracts/verifying/#source-code-verification-tools)を使用して検証できます。

## 関連ツール {#related-tools}

**Remix - _Remix IDE を使用すると、イーサリアムのようなブロックチェーンのスマートコントラクトを開発、デプロイ、管理できます_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _スマートコントラクトの開発、テスト、監視、運用を目的として、デバッグ、可観測性、インフラストラクチャのビルディングブロックを提供する Web3 開発プラットフォーム_**

- [tenderly.co](https://tenderly.co/)
- [ドキュメント](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _イーサリアムソフトウェアのコンパイル、デプロイ、テスト、デバッグを行うための開発環境_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [コントラクトのデプロイに関するドキュメント](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _単一のコマンドを使用して、あらゆるコントラクトをあらゆる EVM 互換チェーンに簡単にデプロイ_**

- [ドキュメント](https://portal.thirdweb.com/deploy/)

**Crossmint - _スマートコントラクトをデプロイし、クレジットカード決済とクロスチェーン決済を有効にし、API を使用して NFT の作成、配布、販売、保管、編集を可能にする、エンタープライズグレードの Web3 開発プラットフォームです。_**

- [crossmint.com](https://www.crossmint.com)
- [ドキュメント](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [ブログ](https://blog.crossmint.com)

## 関連チュートリアル {#related-tutorials}

- [最初のスマートコントラクトをデプロイする](/developers/tutorials/deploying-your-first-smart-contract/) _– イーサリアムのテストネットワークに最初のスマートコントラクトをデプロイするための入門ガイド。_
- [Hello World | スマートコントラクトチュートリアル](/developers/tutorials/hello-world-smart-contract/) _– イーサリアム上で基本的なスマートコントラクトを作成およびデプロイするための、分かりやすいチュートリアル。_
- [Solidityから他のコントラクトと対話する](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 既存のコントラクトからスマートコントラクトをデプロイし、それと対話する方法。_
- [コントラクトサイズを縮小する方法](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- コントラクトのサイズを制限内に収め、ガスを節約するためにサイズを縮小する方法_

## 参考リンク {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Hardhat を使用したコントラクトのデプロイ](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_役に立つコミュニティリソースを知っていますか? Edit this page and add it!_

## 関連トピック {#related-topics}

- [開発フレームワーク](/developers/docs/frameworks/)
- [イーサリアムノードの実行](/developers/docs/nodes-and-clients/run-a-node/)
- [サービスとしてのノード (Nodes-as-a-service)](/developers/docs/nodes-and-clients/nodes-as-a-service)
