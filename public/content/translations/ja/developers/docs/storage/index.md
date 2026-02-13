---
title: "分散型ストレージ"
description: "分散型ストレージとは何であるか、さらに、分散型ストレージをDappに統合するために利用できるツールの概要"
lang: ja
---

単一の企業ないしは組織に運営されている中央集権型サーバーとは異なり、分散型ストレージシステムは、データ全体の一部を保持するユーザーや事業者のピアツーピアネットワークで構成されます。これにより、耐障害性のあるファイルストレージ共有システムを構築することができます。 これらの分散型ストレージシステムは、ブロックチェーン上のアプリケーションやピアツーピアをベースとしたネットワークに取り入れることができます。

イーサリアム自体を分散型ストレージシステムとして使用することができ、全てのスマートコントラクトのコードストレージがまさにそれにあてはまります。 しかしながら、イーサリアムは大量のデータの保存に適した設計にはなっていません。 チェーンは着実に増大していますが、本稿執筆時点ではイーサリアムチェーンは約500GB～1TB（[クライアントによって異なります](https://etherscan.io/chartsync/chaindefault)）あり、ネットワーク上のすべてのノードが全データを保存できる必要があります。 チェーンのデータサイズが巨大になってしまった場合(たとえば5TB)、全てのノードが実行を続けることはとても現実的ではありません。 また、これほどのデータをメインネットにデプロイするコストは、[ガス](/developers/docs/gas)代のため、法外に高額になります。

これらの制限のために、大量のデータを分散型の手法で保存するには異なるチェーンか方法が必要になります。

分散型ストレージ(dStorage)を実現する方法を探すとき、ユーザーが念頭に置いておくべきことがいくつかあります。

- 永続化メカニズム/インセンティブ構造
- データ保持の強制
- 分散性
- コンセンサスの方法

## 永続化メカニズム / インセンティブ構造 {#persistence-mechanism}

### ブロックチェーンベース {#blockchain-based}

データの一部を永続的に保存するためには、なんらかの永続化メカニズムを利用する必要があります。 たとえば、イーサリアムでは1つのノードを実行する際にチェーン全体で処理を行う必要があるという永続化メカニズムがあります。 新しいデータがチェーンの終わりに追加され、そのデータは増大を続けます。これに伴い、すべてのノードは埋め込まれたすべてのデータを複製する必要があります。

これは **ブロックチェーンベース** の永続化として知られています。

ブロックチェーンベースの永続性には、チェーンが巨大になりすぎてすべてのデータを現実的に維持・保存できなくなるという問題があります（例えば、[多くの情報源](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/)は、インターネットには40ゼタバイト以上のストレージ容量が必要だと見積もっています）。

ブロックチェーンには、なんらかの形でインセンティブを発生させる構造が必要です。 ブロックチェーンベースの永続化には、バリデータへの支払いというインセンティブがあります。 データがチェーンに追加されると、バリデータはそのデータを追加することで支払いを受けます。

ブロックチェーンベースの永続性を持つプラットフォーム

- イーサリアム
- [Arweave](https://www.arweave.org/)

### コントラクトベース {#contract-based}

**コントラクトベース**の永続性は、データはすべてのノードで複製されて永久に保存されるわけではなく、コントラクトの合意によって維持されなければならない、という考え方です。 これらの合意は、複数台のノード間で結ばれる、一定期間データを保持することを約束するものです。 データを保持するためには、コントラクトの期間が切れるたびに払い戻しまたは更新が行われなければなりません。

ほとんどの場合、すべてのデータをオンチェーンに保存する代わりに、データがチェーン上のどこにあるかを示すハッシュが保存されます。 こうすることで、すべてのデータを保持するためにチェーン全体を拡張する必要がなくなります。

コントラクトベースの永続性を持つプラットフォーム

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### その他の考慮事項 {#additional-consideration}

IPFSは、ファイル、ウェブサイト、アプリケーション、データの保存とアクセスのための分散型システムです。 インセンティブスキームは組み込まれていませんが、上記のいずれかのコントラクトベースのインセンティブソリューションとともに、データの長期保持に使用できます。 IPFSでデータを保存するもう一つの方法は、ピンニングサービスというデータを「固定化」してくれるサービスと連携することです。 独自のIPFSノードを実行して自分のデータや他のユーザーのデータを無料で保持し、ネットワークに貢献することもできます。

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFSピニングサービス)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoinピニングサービス)_
- [Infura](https://infura.io/product/ipfs) _(IPFSピニングサービス)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFSピニングエクスプローラー)_
- [4EVERLAND](https://www.4everland.org/)_（IPFSピニングサービス）_
- [Filebase](https://filebase.com) _(IPFSピニングサービス)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoinピニングサービス)_

SWARMは、ストレージインセンティブシステムとストレージレンタル価格オラクルを備えた分散型データストレージおよび分配テクノロジーです。

## データ保持 {#data-retention}

データを保持するには、データが保持されていることを確認するためのメカニズムをシステムに搭載する必要があります。

### チャレンジメカニズム {#challenge-mechanism}

データが保持されていることを確認する最も一般的な方法の1つに、ノードに発行されるある種の暗号論的チャレンジを使用して、ノードにまだデータがあることを確認するという方法があります。 シンプルな方法として、Arweaveのプルーフ・オブ・アクセス(PoA)があります。 これは、ノードに対してチャレンジを行い、最新のブロックとランダムな過去ブロックの両方にデータがあるかどうかを確認するものです。 ノードがチャレンジに解答できない場合、ペナルティが課されます。

チャレンジメカニズムを備えた分散型ストレージ(dStorage)のタイプ:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### 分散性 {#decentrality}

プラットフォームの分散化レベルを測る優れたツールはありませんが、一般的に、プラットフォームが中央集権型ではないという証拠を示すために、KYCという形態を持たないツールを使用したいと考えるでしょう。

KYCなしの分散型ツール

- Skynet
- Arweave
- Filecoin
- IPFS(ピアツーピア分散ファイルシステム)
- イーサリアム
- Crust Network
- 4EVERLAND

### コンセンサス {#consensus}

これらのツールのほとんどは、独自のバージョンの[合意メカニズム](/developers/docs/consensus-mechanisms/)を持っていますが、一般的には[**プルーフ・オブ・ワーク(PoW)**](/developers/docs/consensus-mechanisms/pow/)か[**プルーフ・オブ・ステーク(PoS)**](/developers/docs/consensus-mechanisms/pos/)のいずれかに基づいています。

プルーフ・オブ・ワーク方式:

- Skynet
- Arweave

プルーフ・オブ・ステーク方式:

- イーサリアム
- Filecoin
- Züs
- Crust Network

## 関連ツール {#related-tools}

**IPFS - _InterPlanetary File Systemは、イーサリアムのための分散型ストレージおよびファイル参照システムです。_**

- [Ipfs.io](https://ipfs.io/)
- [ドキュメント](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _開発者向けの、安全でプライベートなS3互換の分散型クラウドオブジェクトストレージです。_**

- [Storj.io](https://storj.io/)
- [ドキュメント](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _暗号技術を活用してトラストレスなクラウドストレージマーケットプレイスを作成し、買い手と売り手が直接取引できるようにします。_**

- [Skynet.net](https://sia.tech/)
- [ドキュメント](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _FilecoinはIPFSの開発チームによって作成されました。 IPFSの理想形をベースとしたインセンティブレイヤーです。_**

- [Filecoin.io](https://filecoin.io/)
- [ドキュメント](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweaveは、データを保存するためのdStorageプラットフォームです。_**

- [Arweave.org](https://www.arweave.org/)
- [ドキュメント](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züsは、シャーディングとブロバーを備えたプルーフ・オブ・ステークのdStorageプラットフォームです。_**

- [zus.network](https://zus.network/)
- [ドキュメント](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crustは、IPFS上に構築されたdStorageプラットフォームです。_**

- [Crust.network](https://crust.network)
- [ドキュメント](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _イーサリアムのWeb3スタック向けの分散型ストレージプラットフォームおよびコンテンツ配信サービスです。_**

- [EthSwarm.org](https://www.ethswarm.org/)
- [ドキュメント](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _IPFSを基盤とした分散型ピアツーピアデータベースです。_**

- [OrbitDB.org](https://orbitdb.org/)
- [ドキュメント](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _分散型クラウドプロジェクト(データベース、ファイルストレージ、コンピューティング、DID)です。 オフチェーンとオンチェーンをうまく組み合わせたピアツーピア技術。 IPFSおよびマルチチェーンに対応しています。_**

- [Aleph.im](https://aleph.cloud/)
- [ドキュメント](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _データリッチで魅力的なアプリケーション向けの、ユーザー制御型IPFSデータベースストレージです。_**

- [Ceramic.network](https://ceramic.network/)
- [ドキュメント](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _S3互換の分散型ストレージと地理冗長なIPFSピニングサービスです。 Filebase経由でIPFSにアップロードされたすべてのファイルは、世界中で3か所にレプリケーションされてFilebaseインフラストラクチャへ自動的にピン留めされます。_**

- [Filebase.com](https://filebase.com/)
- [ドキュメント](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _ストレージ、コンピューティング、ネットワークのコア機能を統合するWeb 3.0クラウドコンピューティングプラットフォームで、S3と互換性があり、IPFSやArweaveなどの分散型ストレージネットワーク上で同期データストレージを提供します。_**

- [4everland.org](https://www.4everland.org/)
- [ドキュメント](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _クリックボタンIPFSノードを備えたブロックチェーン・アズ・ア・サービス・プラットフォーム_**

- [Kaleido](https://kaleido.io/)
- [ドキュメント](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheronは、最高のパフォーマンスを持つ分散型インフラ上でアプリケーションを立ち上げたいdAppsのために設計された、プラットフォーム・アズ・ア・サービス(PaaS)です。 コンピューティング、分散型ストレージ、CDN、Webホスティングを標準で提供します。_**

- [spheron.network](https://spheron.network/)
- [ドキュメント](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## 参考リンク {#further-reading}

- [分散型ストレージとは？](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [分散型ストレージに関する5つのよくある誤解を解く](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Know of a community resource that helped you? Edit this page and add it!_

## 関連トピック {#related-topics}

- [開発フレームワーク](/developers/docs/frameworks/)
