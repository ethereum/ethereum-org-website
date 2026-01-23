---
title: "バックエンドAPIライブラリ"
description: "アプリケーションからブロックチェーンへやりとりできるイーサリアムクライアントAPIの紹介。"
lang: ja
---

ソフトウェアアプリケーションがイーサリアムブロックチェーンとやりとりを行うには(つまり、ブロックチェーンデータの読み込みやネットワークへのトランザクションの送信)、イーサリアムノードに接続する必要があります。

この目的のために、すべてのイーサリアムクライアントは[JSON-RPC](/developers/docs/apis/json-rpc/)仕様を実装しているため、アプリケーションが信頼して利用できる統一された[メソッド](/developers/docs/apis/json-rpc/#json-rpc-methods)のセットが用意されています。

もし特定のプログラミング言語を使用してイーサリアムノードに接続したい場合には、独自のソリューションのほかに公開されている既存のライブライを使用することでより簡単に実装できます。 これらのライブラリにより、デベロッパーは直感的な1行のメソッドを作成するだけで、イーサリアムとやり取りするJSON-RPCリクエストを (内部的に) 初期化できるようになります。

## 前提条件{#prerequisites}

[イーサリアムスタック](/developers/docs/ethereum-stack/)と[イーサリアムクライアント](/developers/docs/nodes-and-clients/)を理解しておくと、役立つでしょう。

## ライブラリの利点 {#why-use-a-library}

これらのライブラリにより、イーサリアムノードと直接やり取りする際の複雑さが抽象化されます。 また、ユーティリティ関数(例: ETHからGweiへの変換)も提供されているため、開発者はイーサリアムクライアントの複雑な処理に費やす時間を減らし、アプリケーション独自の機能に集中できます。

## 利用可能なライブラリ {#available-libraries}

### インフラストラクチャとノードサービス {#infrastructure-and-node-services}

**Alchemy -** **_Ethereum開発プラットフォーム。_**

- [alchemy.com](https://www.alchemy.com/)
- [ドキュメント](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_サービスとしてのノード。_**

- [All That Node.com](https://www.allthatnode.com/)
- [ドキュメント](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_イーサリアムメインネットおよびテストネット用の分散型API。_**

- [blastapi.io](https://blastapi.io/)
- [ドキュメント](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_より効率的で高速なRPCサービスを提供_**

- [blockpi.io](https://blockpi.io/)
- [ドキュメント](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflareイーサリアムゲートウェイ。**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - ブロックエクスプローラーおよびトランザクションAPI**

- [ドキュメント](https://docs.etherscan.io/)

**Blockscout - オープンソースブロックエクスプローラー**

- [ドキュメント](https://docs.blockscout.com/)

**GetBlock -** **_Web3開発向けのサービスとしてのブロックチェーン_**

- [GetBlock.io](https://getblock.io/)
- [ドキュメント](https://docs.getblock.io/)

**Infura -** **_サービスとしてのイーサリアムAPI。_**

- [infura.io](https://infura.io)
- [ドキュメント](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _コスト効率の高いEVM JSON-RPCプロバイダー_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [ドキュメント](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _フルノードとブロックエクスプローラー。_**

- [NOWNodes.io](https://nownodes.io/)
- [ドキュメント](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_サービスとしてのブロックチェーンインフラストラクチャ。_**

- [quicknode.com](https://quicknode.com)
- [ドキュメント](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_オープンソースソフトウェアを搭載した、サービスとしてのイーサリアムおよびイーサリアムクラシックAPI。_**

- [rivet.cloud](https://rivet.cloud)
- [ドキュメント](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_速度を重視した、JSON-RPC/WebSockets APIとしてのイーサリアムノード。_**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [ドキュメント](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### 開発ツール {#development-tools}

**ethers-kt -** **_EVMベースのブロックチェーン向けの、非同期で高性能なKotlin/Java/Androidライブラリ。_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [サンプル](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_ブロックチェーン向けのオープンソース.NET統合ライブラリ。_**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [ドキュメント](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Pythonでイーサリアムと対話するための各種ライブラリ。_**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_究極のブロックチェーン開発プラットフォーム。_**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [ドキュメント](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_イーサリアム向けのJava/Android/Kotlin/Scala統合ライブラリ。_**

- [GitHub](https://github.com/web3j/web3j)
- [ドキュメント](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### ブロックチェーンサービス {#blockchain-services}

**BlockCypher -** **_イーサリアムWeb API。_**

- [blockcypher.com](https://www.blockcypher.com/)
- [ドキュメント](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_イーサリアム向けのオールインワンWeb3データインフラストラクチャ。_**

- [chainbase.com](https://chainbase.com/)
- [ドキュメント](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_柔軟で専用の、サービスとしてのイーサリアムノード。_**

- [chainstack.com](https://chainstack.com)
- [ドキュメント](https://docs.chainstack.com/)
- [イーサリアムAPIリファレンス](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_ブロックチェーンインフラストラクチャAPI。_**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [ドキュメント](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_イーサリアムメインネットおよびテストネット対応のWeb3 APIサービス。_**

- [DataHub](https://www.figment.io/)
- [ドキュメント](https://docs.figment.io/)

**Moralis -** **_エンタープライズグレードのEVM APIプロバイダー。_**

- [moralis.io](https://moralis.io)
- [ドキュメント](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [フォーラム](https://forum.moralis.io/)

**NFTPort -** **_イーサリアムのデータおよびミントAPI。_**

- [nftport.xyz](https://www.nftport.xyz/)
- [ドキュメント](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_汎用マルチクリプト・ブロックチェーンAPIプラットフォーム。_**

- [services.tokenview.io](https://services.tokenview.io/)
- [ドキュメント](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_イーサリアムブロックチェーンへの、シンプルで信頼性の高いAPIアクセスを提供。_**

- [Watchdata](https://watchdata.io/)
- [ドキュメント](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_200以上のチェーンに対応した、豊富なブロックチェーンAPI。_**

- [covalenthq.com](https://www.covalenthq.com/)
- [ドキュメント](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## 参考リンク{#further-reading}

_役に立つコミュニティリソースを知っていますか? Edit this page and add it!_

## 関連トピック{#related-topics}

- [ノードとクライアント](/developers/docs/nodes-and-clients/)
- [開発フレームワーク](/developers/docs/frameworks/)

## 関連チュートリアル {#related-tutorials}

- [JavaScriptでイーサリアムブロックチェーンを使用するためのWeb3.jsのセットアップ](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– プロジェクトでweb3.jsをセットアップする手順。_
- [JavaScriptからスマートコントラクトを呼び出す](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAIトークンを使用して、JavaScriptからコントラクト関数を呼び出す方法を説明します。_
