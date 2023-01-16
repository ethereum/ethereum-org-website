---
title: バックエンドAPIライブラリ
description: アプリケーションからブロックチェーンへやりとりできるイーサリアムクライアントAPIの紹介。
lang: ja
---

ソフトウェアアプリケーションがイーサリアムブロックチェーンとやりとりを行うには (例: ブロックチェーンデータの読み込み、トランザクションの送信など) 、イーサリアムノードに接続する必要があります。

この目的のために、すべてのイーサリアムクライアントは[JSON-RPC](/developers/docs/apis/json-rpc/)の仕様を実装しています。そのため、アプリケーションは統一された[メソッド](/developers/docs/apis/json-rpc/#json-rpc-methods)のセットを使用できます。

もし特定のプログラミング言語を使用してイーサリアムノードに接続したい場合には、独自のソリューションのほかに公開されている既存のライブライを使用することでより簡単に実装できます。 これらのライブラリにより、デベロッパーは直感的な 1 行のメソッドを作成するだけで、イーサリアムとやり取りする JSON-RPC リクエストを (内部的に) 初期化できるようになります。

## 前提知識 {#prerequisites}

[イーサリアムスタック](/developers/docs/ethereum-stack/) と [イーサリアムクライアント](/developers/docs/nodes-and-clients/)も内容を理解するのに役立ちます。

## ライブラリの利点 {#why-use-a-library}

これらのライブラリは、イーサリアムノードと直接やり取りする複雑な大部分を抽象化します。 また、ユーティリティ関数 (ETH を Gwei に変換する関数など) も提供されています。そのため、デベロッパーは複雑なイーサリアムクライアントの作業に費やす時間を削減でき、自身のアプリケーションの独自機能の開発作業に専念できます。

## 利用可能なライブラリ {#available-libraries}

**Alchemy -** **_イーサリアム開発プラットフォーム_**

- [alchemy.com](https://www.alchemy.com/)
- [ドキュメント](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/A39JVCM)

**BlockCypher -** **_イーサリアム Web API_**

- [blockcypher.com](https://www.blockcypher.com/)
- [ドキュメント](https://www.blockcypher.com/dev/ethereum/)

**Infura -** **_アズ・ア・サービス型のイーサリアム API_**

- [infura.io](https://infura.io)
- [ドキュメント](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare のイーサリアムゲートウェイ**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Coinbase Cloud ノード -** **_ブロックチェーン・インフラストラクチャ API_**

- [Coinbase Cloud ノード](https://www.coinbase.com/cloud/products/node)
- [ドキュメント](https://docs.cloud.coinbase.com/node/reference/welcome-to-node)

**Figment 社による DataHub -** **_イーサリアムプロトコル(メインネット・テストネット)を使用した Web3 API サービス _**

- [DataHub](https://www.figment.io/datahub)
- [ドキュメント](https://docs.figment.io/introduction/what-is-datahub)

**NFTPort -** **_イーサリアムデータと Mint API_**

- [nftport.xyz](https://www.nftport.xyz/)
- [ドキュメント](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Nodesmith -** **_イーサリアムメインネットとテストネットへの JSON-RPC API アクセス_**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [ドキュメント](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_ETH と ETC の両方をサポートする独自のイーサリアム API サービスの実行_**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_柔軟性の高い、専用のアズ・ア・サービス型イーサリアムノード_**

- [chainstack.com](https://chainstack.com)
- [ドキュメント](https://docs.chainstack.com)
- [イーサリアム API リファレンス](https://docs.chainstack.com/api/ethereum/ethereum-api-reference)

**QuickNode -** **_アズ・ア・サービス型のブロックチェーン・インフラストラクチャ_**

- [quicknode.com](https://quicknode.com)
- [ドキュメント](https://www.quicknode.com/docs)
- [Discord](https://discord.gg/NaR7TtpvJq)

**Python Tooling -** **_Python でイーサリアムとやり取りするための各種ライブラリ_**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py チャット](https://gitter.im/ethereum/web3.py)

**web3j -** **_イーサリアム用の Java/Android/Kotlin/Scala の統合ライブラリ_**

- [GitHub](https://github.com/web3j/web3j)
- [ドキュメント](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_オープンソースソフトウェアを搭載した、アズ・ア・サービス型のイーサリアムとイーサリアムクラシックの API_**

- [rivet.cloud](https://rivet.cloud)
- [ドキュメント](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_ブロックチェーンのためのオープンソースの .NET 統合ライブラリ_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [ドキュメント](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Tatum -** **_究極のブロックチェーン開発プラットフォーム_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [ドキュメント](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**Watchdata -** **_イーサリアムブロックチェーンへのシンプルで信頼性の高い API アクセス_**

- [Watchdata](https://watchdata.io/)
- [ドキュメント](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Zmok -** **_JSON-RPC/WebSocket API としてのスピード重視のイーサリアムノード_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [ドキュメント](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

## 参考文献 {#further-reading}

_役に立つコミュニティリソースをご存知の場合は、 ページを編集して追加してください。_

## 関連トピック {#related-topics}

- [ノードとクライアント](/developers/docs/nodes-and-clients/)
- [開発フレームワーク](/developers/docs/frameworks/)

## 関連チュートリアル {#related-tutorials}

- [Javascript でイーサリアムブロックチェーンを使用するための Web3js のセットアップ](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– プロジェクトで web3.js をセットアップするための手順_
- [JavaScript からスマートコントラクトの呼び出し](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Dai トークンを使った、JavaScript でスマートコントラクト機能の呼び出し方法_
