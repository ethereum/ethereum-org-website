---
title: 分散型ストレージ
description: 分散型ストレージとは何であるか、さらに、分散型ストレージをDappに統合するために利用できるツールの概要
lang: ja
---

単一の企業ないしは組織に運営されている中央集権型サーバーとは異なり、分散型ストレージシステムは、データ全体の一部を保持するユーザーや事業者のピアツーピアネットワークで構成されます。これにより、耐障害性のあるファイルストレージ共有システムを構築することができます。 これらの分散型ストレージシステムは、ブロックチェーン上のアプリケーションやピアツーピアをベースとしたネットワークに取り入れることができます。

イーサリアム自体を分散型ストレージシステムとして使用することができ、全てのスマートコントラクトのコードストレージがまさにそれにあてはまります。 しかしながら、イーサリアムは大量のデータの保存に適した設計にはなっていません。 チェーンは着実に大きくなっていっており、執筆時点でのイーサリアムチェーンの容量は、([クライアントによって異なりますが、](https://etherscan.io/chartsync/chaindefault))およそ 500GB - 1TB にもなっています。ネットワーク上の全てのノードは、これだけのデータを保存できる必要があります。 チェーンのデータサイズが巨大になってしまった場合(たとえば 5TB)、全てのノードが実行を続けることはとても現実的ではありません。 しかも、これほどのデータをメインネットにデプロイするために必要なコストは、[ガス](/developers/docs/gas)代のために法外なほどに高価なものとなります。

これらの制限のために、大量のデータを分散型の手法で保存するには異なるチェーンか方法が必要になります。

分散型ストレージ(dStorage)を実現する方法を探すとき、ユーザーが念頭に置いておくべきことがいくつかあります。

- 永続化メカニズム/インセンティブ構造
- データ保持の強制
- 分散性
- コンセンサスの方法

## 永続化メカニズム/インセンティブ構造 {#persistence-mechanism}

### ブロックチェーンベース {#blockchain-based}

データの一部を永続的に保存するためには、なんらかの永続化メカニズムを利用する必要があります。 たとえば、イーサリアムでは 1 つのノードを実行する際にチェーン全体で処理を行う必要があるという永続化メカニズムがあります。 新しいデータがチェーンの終わりに追加され、そのデータは増大を続けます。これに伴い、すべてのノードは埋め込まれたすべてのデータを複製する必要があります。

これは、**ブロックチェーンベースの**永続性として知られています。

ブロックチェーンベースの永続性には、チェーンがあまりにも大きくなりすぎると、すべてのデータを維持・保存することが難しくなるという問題があります(例: [多くの資料](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/)がインターネットには 40 ゼタバイト以上のストレージ容量が必要だと見積もっています)。

ブロックチェーンには、なんらかの形でインセンティブを発生させる構造が必要です。 ブロックチェーンベースの永続化には、バリデータへの支払いというインセンティブがあります。 データがチェーンに追加されると、バリデータはそのデータを追加することで支払いを受けます。

ブロックチェーンベースの永続性を持つプラットフォーム

- イーサリアム
- [Arweave](https://www.arweave.org/)

### コントラクトベース {#contract-based}

**コントラクトベース**の永続性では、すべてのノードでデータを複製し永遠に保存することはできないということが分かります。そのため、代わりにコントラクトによる合意で維持しなければなりません。 これらの合意は、複数台のノード間で結ばれる、一定期間データを保持することを約束するものです。 データを保持するためには、コントラクトの期間が切れるたびに払い戻しまたは更新が行われなければなりません。

ほとんどの場合、オンチェーンにすべてのデータを保存する代わりに、チェーン上でデータが保存されている場所のハッシュが保存されます。 こうすることで、すべてのデータを保持するためにチェーン全体を拡張する必要がなくなります。

コントラクトベースの永続性を持つプラットフォーム

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [0Chain](https://0chain.net/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### その他の考慮事項 {#additional-consideration}

IPFS は、ファイル、ウェブサイト、アプリケーション、データの保存とアクセスのための分散型システムです。 インセンティブスキームは組み込まれていませんが、上記のいずれかのコントラクトベースのインセンティブソリューションとともに、データの長期保持に使用できます。 IPFS でデータを保持するもう一つの方法は、ピンニングサービスというデータを「固定化」してくれるサービスと連携することです。 独自の IPFS ノードを実行して自分のデータや他のユーザーのデータを無料で保持し、ネットワークに貢献することもできます。

- [IPFS(ピアツーピア分散ファイルシステム)](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/)_(IPFS ピンニングサービス)_
- [web3.storage](https://web3.storage/)_(IPFS/Filecoin ピンニングサービス)_
- [Infura](https://infura.io/product/ipfs)_(IPFS ピンニングサービス)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS ピンニングエクスプローラー)_
- [4EVERLAND](https://www.4everland.org/)_(IPFS ピンニングサービス)_
- [Filebase](https://filebase.com)_(IPFS ピンニングサービス)_

SWARM は、ストレージインセンティブシステムとストレージレンタル価格オラクルを備えた分散型データストレージおよび分配テクノロジーです。

## データの保持 {#data-retention}

データを保持するには、データが保持されていることを確認するためのメカニズムをシステムに搭載する必要があります。

### チャレンジメカニズム {#challenge-mechanism}

データが保持されていることを確認する最も一般的な方法の 1 つに、ノードに発行されるある種の暗号論的チャレンジを使用して、ノードにまだデータがあることを確認するという方法があります。 シンプルな方法として、Arweave のプルーフ・オブ・アクセス(PoA)があります。 これは、ノードに対してチャレンジを行い、最新のブロックとランダムな過去ブロックの両方にデータがあるかどうかを確認するものです。 ノードがチャレンジに解答できない場合、ペナルティが課されます。

チャレンジメカニズムを備えた分散型ストレージ(dStorage)のタイプ:

- 0Chain
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### 分散性 {#decentrality}

プラットフォームの分散化レベルを測る優れたツールはありませんが、一般的に、プラットフォームが中央集権型ではないという証拠を示すために、KYC という形態を持たないツールを使用したいと考えるでしょう。

KYC なしの分散型ツール

- 0Chain(KYC なし版を実装)
- Skynet
- Arweave
- Filecoin
- IPFS (ピアツーピア分散ファイルシステム)
- イーサリアム
- Crust Network
- 4EVERLAND

### コンセンサスの方法 {#consensus}

これらのツールのほとんどは、独自のバージョンの[合意メカニズム](/developers/docs/consensus-mechanisms/)を持っていますが、通常は、[**プルーフ・オブ・ワーク(PoW)**](/developers/docs/consensus-mechanisms/pow/)または[**プルーフ・オブ・ステーク(PoS)**](/developers/docs/consensus-mechanisms/pos/)に基づいています。

プルーフ・オブ・ワーク方式:

- Skynet
- Arweave

プルーフ・オブ・ステーク方式:

- イーサリアム
- Filecoin
- 0Chain
- Crust Network

## 関連ツール {#related-tools}

**IPFS - _IPFS (InterPlanetary File System)は、イーサリアムのための分散ストレージとファイル参照システムです。_**

- [Ipfs.io](https://ipfs.io/)
- [ドキュメント](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _デベロッパー向けの安全でプライベートな S3 互換の分散型クラウド・オブジェクト・ストレージです。_**

- [Storj.io](https://storj.io/)
- [ドキュメント](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Skynet - _Skynet は、分散型 Web 専用の分散型 PoW チェーンです。_**

- [Skynet.net](https://siasky.net/)
- [ドキュメント](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin - _Filecoin は、IPFS の開発チームによって作成されたものです。 IPFS の理想形をベースとしたインセンティブレイヤーです。_**

- [Filecoin.io](https://filecoin.io/)
- [ドキュメント](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave は、データを保存するための分散型ストレージ(dStorage)プラットフォームです。_**

- [Arweave.org](https://www.arweave.org/)
- [ドキュメント](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**0chain - _0Chain は、シャーディングとブロバーを備えたプルーフ・オブ・ステークの分散型ストレージ(dStorage)プラットフォームです。_**

- [0Chain.net](https://0chain.net/)
- [ドキュメント](https://docs.0chain.net/0chain/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust は、IPFS ベースの分散型ストレージ(dStorage)プラットフォームです。_**

- [Crust.network](https://crust.network)
- [ドキュメント](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _イーサリアム Web3 スタックのための分散型ストレージプラットフォームとコンテンツ配信サービスです。_**

- [EthSwarm.org](https://www.ethswarm.org/)
- [ドキュメント](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _IPFS ベースの分散型ピアツーピアのデータベースです。_**

- [OrbitDB.org](https://orbitdb.org/)
- [ドキュメント](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _分散型クラウドプロジェクト(データベース、ファイルストレージ、コンピューティング、DID)です。 オフチェーンとオンチェーンをうまく組み合わせたピアツーピア技術。 IPFS とマルチチェーン互換性。_**

- [Aleph.im](https://aleph.im/)
- [ドキュメント](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _データリッチで魅力的なアプリケーションのためのユーザー制御 IPFS データベースストレージです。_**

- [Ceramic.network](https://ceramic.network/)
- [ドキュメント](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _S3 互換の分散型ストレージと地理冗長な IPFS ピンニングサービスです。 Filebase 経由で IPFS にアップロードされたすべてのファイルは、世界中で 3 か所にレプリケーションされて Filebase インフラストラクチャへ自動的にピンされます。_**

- [Filebase.com](https://filebase.com/)
- [ドキュメント](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _ストレージ、コンピューティング、ネットワークのコア機能を統合する Web 3.0 クラウドコンピューティング・プラットフォームで、S3 と互換性があり、IPFS や Arweave などの分散型ストレージネットワークで同期データストレージを提供します。_**

- [4everland.org](https://www.4everland.org/)
- [ドキュメント](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _クリックボタン IPFS ノードを備えたブロックチェーン・アズ・ア・サービス・プラットフォーム_**

- [Kaleido](https://kaleido.io/)
- [ドキュメント](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

## 参考文献 {#further-reading}

- [分散型ストレージとは](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [分散型ストレージに関する 5 つの一般的な通念を覆す](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_役に立つコミュニティリソースをご存知の場合は、 ページを編集して追加してください。_

## 関連トピック {#related-topics}

- [開発フレームワーク](/developers/docs/frameworks/)
