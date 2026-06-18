---
title: バックエンドAPIライブラリ
description: アプリケーションからブロックチェーンとやり取りするためのイーサリアムクライアントAPIの紹介。
lang: ja
---

ソフトウェアアプリケーションが[イーサリアム](/)のブロックチェーンとやり取りする（つまり、ブロックチェーンのデータを読み取ったり、ネットワークにトランザクションを送信したりする）ためには、イーサリアムのノードに接続する必要があります。

この目的のために、すべてのイーサリアムクライアントは[JSON-RPC](/developers/docs/apis/json-rpc/)仕様を実装しており、アプリケーションが依存できる統一された[メソッド](/developers/docs/apis/json-rpc/#json-rpc-methods)のセットが存在します。

特定のプログラミング言語を使用してイーサリアムのノードに接続したい場合、エコシステム内にはこれをはるかに簡単にする多くの便利なライブラリがあります。これらのライブラリを使用すると、開発者は直感的な1行のメソッドを記述するだけで、（内部的に）イーサリアムとやり取りするJSON-RPCリクエストを初期化できます。

## 前提条件 {#prerequisites}

[イーサリアムスタック](/developers/docs/ethereum-stack/)と[イーサリアムクライアント](/developers/docs/nodes-and-clients/)について理解しておくと役立つかもしれません。

## なぜライブラリを使用するのか？ {#why-use-a-library}

これらのライブラリは、イーサリアムのノードと直接やり取りする際の複雑さの多くを抽象化します。また、ユーティリティ関数（ETHからGweiへの変換など）も提供するため、開発者はイーサリアムクライアントの複雑な処理に費やす時間を減らし、アプリケーション独自の機能に集中する時間を増やすことができます。

## 利用可能なライブラリ {#available-libraries}

### インフラストラクチャとノードサービス {#infrastructure-and-node-services}

**Alchemy -** **_イーサリアム開発プラットフォーム_**

- [alchemy.com](https://www.alchemy.com/)
- [ドキュメント](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [ディスコード](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_Node-as-a-Service_**

- [All That Node.com](https://www.allthatnode.com/)
- [ドキュメント](https://docs.allthatnode.com)
- [ディスコード](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_イーサリアム・メインネットおよびテストネット向けの分散型API_**

- [blastapi.io](https://blastapi.io/)
- [ドキュメント](https://docs.blastapi.io)
- [ディスコード](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_より効率的で高速なRPCサービスを提供_**

- [blockpi.io](https://blockpi.io/)
- [ドキュメント](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [ディスコード](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - ブロック・エクスプローラーおよびトランザクションAPI**
- [ドキュメント](https://docs.etherscan.io/)

**Blockscout - オープンソースのブロック・エクスプローラー**
- [ドキュメント](https://docs.blockscout.com/)

**GetBlock -** **_Web3開発向けのBlockchain-as-a-service_**

- [GetBlock.io](https://getblock.io/)
- [ドキュメント](https://docs.getblock.io/)

**Infura -** **_サービスとしてのイーサリアムAPI_**

- [infura.io](https://infura.io)
- [ドキュメント](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _費用対効果の高いEVM JSON-RPCプロバイダー_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [ドキュメント](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _フルノードおよびブロック・エクスプローラー_**

- [NOWNodes.io](https://nownodes.io/)
- [ドキュメント](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_サービスとしてのブロックチェーンインフラストラクチャ_**

- [quicknode.com](https://quicknode.com)
- [ドキュメント](https://www.quicknode.com/docs/welcome)
- [ディスコード](https://discord.gg/quicknode)

**Rivet -** **_オープンソースソフトウェアを活用したサービスとしてのイーサリアムおよびイーサリアム・クラシックAPI_**

- [rivet.cloud](https://rivet.cloud)
- [ドキュメント](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSockets APIとしての速度重視のイーサリアムノード_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [ドキュメント](https://docs.zmok.io/)
- [ディスコード](https://discord.gg/fAHeh3ka6s)

### 開発ツール {#development-tools}

**ethers-kt -** **_EVMベースのブロックチェーン向けの非同期で高性能なKotlin/Java/Androidライブラリ_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [例](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [ディスコード](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_ブロックチェーン向けのオープンソース.NET統合ライブラリ_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [ドキュメント](https://docs.nethereum.com/docs/getting-started/welcome/)
- [ディスコード](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Python経由でイーサリアムとやり取りするためのさまざまなライブラリ_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [Web3.py GitHub](https://github.com/ethereum/web3.py)
- [Web3.py チャット](https://gitter.im/ethereum/web3.py)

**Tatum -** **_究極のブロックチェーン開発プラットフォーム_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [ドキュメント](https://docs.tatum.io/)
- [ディスコード](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_イーサリアム向けのJava/Android/Kotlin/Scala統合ライブラリ_**

- [GitHub](https://github.com/web3j/web3j)
- [ドキュメント](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### ブロックチェーンサービス {#blockchain-services}

**BlockCypher -** **_イーサリアムWeb API_**

- [blockcypher.com](https://www.blockcypher.com/)
- [ドキュメント](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_イーサリアム向けのオールインワンWeb3データインフラストラクチャ_**

- [chainbase.com](https://chainbase.com/)
- [ドキュメント](https://docs.chainbase.com/)
- [ディスコード](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_サービスとしてのエラスティックおよび専用イーサリアムノード_**

- [chainstack.com](https://chainstack.com)
- [ドキュメント](https://docs.chainstack.com/)
- [イーサリアムAPIリファレンス](https://docs.chainstack.com/reference/ethereum-getting-started)

**コインベース Cloud Node -** **_ブロックチェーンインフラストラクチャAPI_**

- [コインベース Cloud Node](https://www.coinbase.com/developer-platform)
- [ドキュメント](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_イーサリアム・メインネットおよびテストネットを備えたWeb3 APIサービス_**

- [DataHub](https://www.figment.io/)
- [ドキュメント](https://docs.figment.io/)

**Moralis -** **_エンタープライズグレードのEVM APIプロバイダー_**

- [moralis.io](https://moralis.io)
- [ドキュメント](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [ディスコード](https://moralis.io/joindiscord/)
- [フォーラム](https://forum.moralis.io/)

**NFTPort -** **_イーサリアムデータおよびミントAPI_**

- [nftport.xyz](https://www.nftport.xyz/)
- [ドキュメント](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [ディスコード](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_汎用マルチ暗号資産ブロックチェーンAPIプラットフォーム_**

- [services.tokenview.io](https://services.tokenview.io/)
- [ドキュメント](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_イーサリアムのブロックチェーンへのシンプルで信頼性の高いAPIアクセスを提供_**

- [Watchdata](https://watchdata.io/)
- [ドキュメント](https://docs.watchdata.io/)
- [ディスコード](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_数十のチェーンにわたるリアルタイムで充実したブロックチェーンデータAPI_**

- [codex.io](https://www.codex.io/)
- [ドキュメント](https://docs.codex.io)
- [エクスプローラー](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [ディスコード](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_200以上のチェーン向けの充実したブロックチェーンAPI_**

- [covalenthq.com](https://www.covalenthq.com/)
- [ドキュメント](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [ディスコード](https://www.covalenthq.com/discord/)


## 参考文献 {#further-reading}

_役に立ったコミュニティリソースをご存知ですか？このページを編集して追加してください！_

## 関連トピック {#related-topics}

- [ノードとクライアント](/developers/docs/nodes-and-clients/)
- [開発フレームワーク](/developers/docs/frameworks/)

## 関連チュートリアル {#related-tutorials}

- [JavaScriptでイーサリアムのブロックチェーンを使用するためのWeb3.jsのセットアップ](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– プロジェクトでWeb3.jsをセットアップするための手順。_
- [JavaScriptからスマート・コントラクトを呼び出す](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAIトークンを使用して、JavaScriptでコントラクトの関数を呼び出す方法を確認します。_