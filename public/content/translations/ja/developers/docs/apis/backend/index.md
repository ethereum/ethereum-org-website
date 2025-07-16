---
title: バックエンドAPIライブラリ
description: アプリケーションからブロックチェーンへやりとりできるイーサリアムクライアントAPIの紹介。
lang: ja
---

ソフトウェアアプリケーションがイーサリアムブロックチェーンとやりとりを行うには (例: ブロックチェーンデータの読み込み、トランザクションの送信など) 、イーサリアムノードに接続する必要があります。

この目的のために、すべてのイーサリアムクライアントは[JSON-RPC](/developers/docs/apis/json-rpc/)の仕様を実装しています。そのため、アプリケーションは統一された[メソッド](/developers/docs/apis/json-rpc/#json-rpc-methods)のセットを使用できます。

もし特定のプログラミング言語を使用してイーサリアムノードに接続したい場合には、独自のソリューションのほかに公開されている既存のライブライを使用することでより簡単に実装できます。 これらのライブラリにより、デベロッパーは直感的な1行のメソッドを作成するだけで、イーサリアムとやり取りするJSON-RPCリクエストを (内部的に) 初期化できるようになります。

## 前提知識 {#prerequisites}

[イーサリアムスタック](/developers/docs/ethereum-stack/) と [イーサリアムクライアント](/developers/docs/nodes-and-clients/)も内容を理解するのに役立ちます。

## ライブラリの利点 {#why-use-a-library}

これらのライブラリは、イーサリアムノードと直接やり取りする複雑な大部分を抽象化します。 また、ユーティリティ関数 (ETHをGweiに変換する関数など) も提供されています。そのため、デベロッパーは複雑なイーサリアムクライアントの作業に費やす時間を削減でき、自身のアプリケーションの独自機能の開発作業に専念できます。

## 利用可能なライブラリ {#available-libraries}

### インフラストラクチャとノードサービス {#infrastructure-and-node-services}

**Alchemy -** **_イーサリアム開発プラットフォーム_**

- [alchemy.com](https://www.alchemy.com/)
- [ドキュメント](https://docs.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_ノード・アズ・ア・サービス_**

- [All That Node.com](https://www.allthatnode.com/)
- [ドキュメント](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_イーサリアムメインネットとテストネットのための分散型API_**

- [blastapi.io](https://blastapi.io/)
- [ドキュメント](https://docs.blastapi.io)
- [Discord](https://discord.gg/bwarelabs)

**BlockPi -** **_より効率的かつ高速なRPCサービスを提供_**

- [blockpi.io](https://blockpi.io/)
- [ドキュメント](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflareのイーサリアムゲートウェイ**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - ブロックエクスプローラーおよびトランザクションAPI**
- [ドキュメント](https://docs.etherscan.io/)

**GetBlock-** **_Web3開発用のBlockchain-as-a-service_**

- [GetBlock.io](https://getblock.io/)
- [ドキュメント](https://getblock.io/docs/)

**Infura -** **_アズ・ア・サービス型のイーサリアムAPI_**

- [infura.io](https://infura.io)
- [ドキュメント](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _コスト効率の高いEVM JSON-RPCプロバイダー_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [ドキュメント](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _フルノードとブロックエクスプローラー_**

- [NOWNodes.io](https://nownodes.io/)
- [ドキュメント](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**QuickNode -** **_アズ・ア・サービス型のブロックチェーンインフラストラクチャ_**

- [quicknode.com](https://quicknode.com)
- [ドキュメント](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_オープンソースソフトウェアを搭載した、アズ・ア・サービス型のイーサリアムとイーサリアムクラシックのAPI_**

- [rivet.cloud](https://rivet.cloud)
- [ドキュメント](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSocket APIとしてのスピード重視のイーサリアムノード_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [ドキュメント](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### 開発ツール {#development-tools}

**ethers-kt -** **_EVMベースのブロックチェーン用の非同期、ハイパフォーマンスのKotlin/Java/Androidライブラリ_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [実例：](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_オープンソースのブロックチェーン用.NET統合ライブラリ_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [ドキュメント](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Pythonでイーサリアムとやり取りするための各種ライブラリ_**

- [py.ethereum.org](https://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.pyチャット](https://gitter.im/ethereum/web3.py)

**Tatum -** **_究極のブロックチェーン開発プラットフォーム_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [ドキュメント](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_イーサリアム用のJava/Android/Kotlin/Scalaの統合ライブラリ_**

- [GitHub](https://github.com/web3j/web3j)
- [ドキュメント](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### ブロックチェーンサービス {#blockchain-services}

**BlockCypher -** **_イーサリアム Web API_**

- [blockcypher.com](https://www.blockcypher.com/)
- [ドキュメント](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_イーサリアム向けのオールインワンWeb3データインフラストラクチャ_**

- [chainbase.com](https://chainbase.com/)
- [ドキュメント](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_柔軟性の高い、専用のアズ・ア・サービス型イーサリアムノード_**

- [chainstack.com](https://chainstack.com)
- [ドキュメンテーション](https://docs.chainbase.com/docs)
- [イーサリアムAPIリファレンス](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_ブロックチェーンインフラストラクチャAPI_**

- [Coinbase Cloud Node](https://www.coinbase.com/cloud)
- [ドキュメンテーション](https://docs.cloud.coinbase.com/)

**Figment社が提供するDataHub -** **_イーサリアムプロトコル(メインネットとテストネット)を使用したWeb3 APIサービス_**

- [DataHub](https://www.figment.io/)
- [ドキュメント](https://docs.figment.io/)

**Moralis -** **_エンタープライズグレードのEVM APIプロバイダ_**

- [moralis.io](https://moralis.io)
- [ドキュメント](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [フォーラム](https://forum.moralis.io/)

**NFTPort -** **_イーサリアムデータとミントAPI_**

- [nftport.xyz](https://www.nftport.xyz/)
- [ドキュメント](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_ジェネラルなマルチクリプトブロックチェーンAPIプラットフォーム_**

- [services.tokenview.io](https://services.tokenview.io/)
- [ドキュメント](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_イーサリアムブロックチェーンへのシンプルで信頼性の高いAPIアクセス_**

- [Watchdata](https://watchdata.io/)
- [ドキュメント](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_200以上のチェーンで使えるリッチなブロックチェーンAPI_**

- [covalenthq.com](https://www.covalenthq.com/)
- [ドキュメント](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## 参考文献 {#further-reading}

_役に立ったコミュニティリソースがあれば、 ぜひこのページに追加してください。_

## 関連トピック {#related-topics}

- [ ノードとクライアント](/developers/docs/nodes-and-clients/)
- [開発フレームワーク](/developers/docs/frameworks/)

## 関連チュートリアル {#related-tutorials}

- [Javascriptでイーサリアムブロックチェーンを使用するためのWeb3jsのセットアップ](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– プロジェクトでweb3.jsをセットアップするための手順。_
- [JavaScriptからスマートコントラクトを呼び出す](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAIトークンを使って、JavaScriptからスマートコントラクトを呼び出す方法を確認する。_
