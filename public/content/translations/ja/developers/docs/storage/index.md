---
title: "分散型ストレージ"
description: "分散型ストレージの概要と、それを分散型アプリケーション (dapp) に統合するために利用可能なツールについて。"
lang: ja
authors: ["パトリック・コリンズ"]
---

単一の企業や組織によって運営される中央集権型のサーバーとは異なり、分散型ストレージシステムは、データ全体の一部を保持するユーザーオペレーターのピア・ツー・ピアネットワークで構成されており、回復力のあるファイルストレージ共有システムを構築します。これらは、ブロックチェーンベースのアプリケーション、または任意のピア・ツー・ピアベースのネットワークに存在することができます。

イーサリアム自体も分散型ストレージシステムとして使用でき、すべてのスマートコントラクトにおけるコードストレージに関しては実際にそのように機能しています。しかし、大量のデータとなると、それはイーサリアムが設計された目的ではありません。チェーンは着実に成長していますが、執筆時点では、イーサリアムのチェーンは約500GB〜1TB（[クライアントによって異なります](https://etherscan.io/chartsync/chaindefault)）であり、ネットワーク上のすべてのノードがすべてのデータを保存できる必要があります。もしチェーンが大量のデータ（例えば5TB）に拡大した場合、すべてのノードが稼働し続けることは現実的ではありません。また、これほど大量のデータをメインネットにデプロイするコストは、[ガス](/developers/docs/gas)代のために法外に高くなります。

これらの制約のため、大量のデータを分散型の方法で保存するには、別のチェーンまたは方法論が必要です。

分散型ストレージ（dStorage）のオプションを検討する際、ユーザーが留意すべき点がいくつかあります。

- 永続化メカニズム / インセンティブ構造
- データ保持の強制
- 分散性
- コンセンサス

## 永続化メカニズム / インセンティブ構造 {#persistence-mechanism}

### ブロックチェーンベース {#blockchain-based}

データの一部を永久に保持するためには、永続化メカニズムを使用する必要があります。例えば、イーサリアムにおける永続化メカニズムは、ノードを実行する際にチェーン全体を考慮する必要があるというものです。新しいデータはチェーンの末尾に追加され、チェーンは成長し続けます。そのため、すべてのノードが埋め込まれたすべてのデータを複製する必要があります。

これは**ブロックチェーンベース**の永続化として知られています。

ブロックチェーンベースの永続化の問題点は、チェーンが大きくなりすぎて、すべてのデータを現実的に維持・保存できなくなる可能性があることです（例えば、[多くの情報源](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/)が、インターネットには40ゼタバイト以上のストレージ容量が必要だと推定しています）。

ブロックチェーンには、何らかのインセンティブ構造も必要です。ブロックチェーンベースの永続化では、バリデータに対して支払いが行われます。データがチェーンに追加されると、バリデータはそのデータを追加するための報酬を受け取ります。

ブロックチェーンベースの永続化を持つプラットフォーム：

- イーサリアム
- [Arweave](https://www.arweave.org/)

### コントラクトベース {#contract-based}

<strong>コントラクトベース</strong>の永続化は、すべてのノードがデータを複製して永久に保存することはできないため、代わりにコントラクトの合意によって維持されなければならないという直感に基づいています。これらは、一定期間データを保持することを約束した複数のノードと結ばれる合意です。データを永続化し続けるためには、期間が切れるたびに資金を補充するか、更新する必要があります。

ほとんどの場合、すべてのデータをオンチェーンに保存するのではなく、チェーン上のどこにデータがあるかを示すハッシュが保存されます。これにより、すべてのデータを保持するためにチェーン全体をスケールさせる必要がなくなります。

コントラクトベースの永続化を持つプラットフォーム：

- [ファイルコイン](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [スウォーム](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### その他の考慮事項 {#additional-consideration}

IPFSは、ファイル、ウェブサイト、アプリケーション、およびデータへの保存とアクセスを行うための分散型システムです。組み込みのインセンティブスキームはありませんが、長期的な永続化のために、上記のコントラクトベースのインセンティブソリューションのいずれかと組み合わせて使用することができます。IPFS上でデータを永続化するもう1つの方法は、データを「ピン留め」してくれるピニングサービスを利用することです。独自のIPFSノードを実行し、ネットワークに貢献して、自分や他人のデータを無料で永続化することも可能です！

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFSピニングサービス)_
- [web3.storage](https://web3.storage/) _(IPFS/ファイルコインピニングサービス)_
- [Infura](https://infura.io/product/ipfs) _(IPFSピニングサービス)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFSピニングエクスプローラー)_
- [4EVERLAND](https://www.4everland.org/)_（IPFSピニングサービス）_
- [Filebase](https://filebase.com) _(IPFSピニングサービス)_
- [Spheron Network](https://spheron.network/) _(IPFS/ファイルコインピニングサービス)_

スウォームは、ストレージインセンティブシステムとストレージのレンタル価格オラクルを備えた、分散型データストレージおよび配信技術です。

## データ保持 {#data-retention}

データを保持するためには、システムはデータが確実に保持されるようにするための何らかのメカニズムを備えている必要があります。

### チャレンジメカニズム {#challenge-mechanism}

データが保持されていることを確認する最も一般的な方法の1つは、ノードがまだデータを持っているかを確認するために発行される、何らかの暗号技術によるチャレンジを使用することです。簡単な例として、ArweaveのProof-of-Access（アクセス証明）が挙げられます。彼らはノードに対してチャレンジを発行し、最新のブロックと過去のランダムなブロックの両方でデータを持っているかを確認します。ノードが答えを出せない場合、ペナルティが科せられます。

チャレンジメカニズムを持つdStorageの種類：

- Züs
- Skynet
- Arweave
- ファイルコイン
- Crust Network
- 4EVERLAND

### 分散性 {#decentrality}

プラットフォームの分散化のレベルを測定する優れたツールはありませんが、一般的には、中央集権的でないことの証拠として、何らかのKYCを必要としないツールを使用することが望ましいでしょう。

KYCのない分散型ツール：

- Skynet
- Arweave
- ファイルコイン
- IPFS
- イーサリアム
- Crust Network
- 4EVERLAND

### コンセンサス {#consensus}

これらのツールのほとんどは独自の[コンセンサス・メカニズム](/developers/docs/consensus-mechanisms/)を持っていますが、一般的には[**プルーフ・オブ・ワーク (PoW)**](/developers/docs/consensus-mechanisms/pow/)または[**プルーフ・オブ・ステーク (PoS)**](/developers/docs/consensus-mechanisms/pos/)のいずれかに基づいています。

プルーフ・オブ・ワークベース：

- Skynet
- Arweave

プルーフ・オブ・ステークベース：

- イーサリアム
- ファイルコイン
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

**Sia - _暗号技術を活用してトラストレスなクラウドストレージ市場を構築し、買い手と売り手が直接取引できるようにします。_**

- [Skynet.net](https://sia.tech/)
- [ドキュメント](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**ファイルコイン - _ファイルコインは、IPFSを開発したのと同じチームによって作成されました。IPFSの理念の上に構築されたインセンティブレイヤーです。_**

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

**スウォーム - _イーサリアムのWeb3スタックのための分散型ストレージプラットフォームおよびコンテンツ配信サービスです。_**

- [EthSwarm.org](https://www.ethswarm.org/)
- [ドキュメント](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _IPFS上に構築された分散型ピア・ツー・ピアデータベースです。_**

- [OrbitDB.org](https://orbitdb.org/)
- [ドキュメント](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _分散型クラウドプロジェクト（データベース、ファイルストレージ、コンピューティング、および分散型アイデンティティ (DID)）。オフチェーンとオンチェーンのピア・ツー・ピア技術のユニークな融合。IPFSおよびマルチチェーンとの互換性があります。_**

- [Aleph.im](https://aleph.cloud/)
- [ドキュメント](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _データが豊富で魅力的なアプリケーションのための、ユーザー制御のIPFSデータベースストレージです。_**

- [Ceramic.network](https://ceramic.network/)
- [ドキュメント](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _S3互換の分散型ストレージおよび地理的冗長性を持つIPFSピニングサービスです。Filebaseを通じてIPFSにアップロードされたすべてのファイルは、世界中で3倍のレプリケーションが行われ、Filebaseインフラストラクチャに自動的にピン留めされます。_**

- [Filebase.com](https://filebase.com/)
- [ドキュメント](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _ストレージ、コンピューティング、ネットワーキングのコア機能を統合したウェブ・3.0クラウドコンピューティングプラットフォームです。S3互換であり、IPFSやArweaveなどの分散型ストレージネットワーク上で同期データストレージを提供します。_**

- [4everland.org](https://www.4everland.org/)
- [ドキュメント](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _ボタンをクリックするだけでIPFSノードを利用できるBlockchain-as-a-Serviceプラットフォームです。_**

- [Kaleido](https://kaleido.io/)
- [ドキュメント](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheronは、最高のパフォーマンスで分散型インフラストラクチャ上にアプリケーションを立ち上げたい分散型アプリケーション (dapp) 向けに設計されたPlatform-as-a-Service (PaaS) です。コンピューティング、分散型ストレージ、CDN、およびウェブホスティングをデフォルトで提供します。_**

- [spheron.network](https://spheron.network/)
- [ドキュメント](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 - _eth.limoに似た分散型ウェブページのリゾルバであり、ENSやIPFSに限定されず、すべてのタイプをサポートします。_**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass - _IPFSとENSに裏付けられた分散型ウェブサイトのための検索エンジンです。_**

- [web3compass.net](https://www.web3compass.net/)
- [ドキュメント](https://www.web3compass.net/statistics)

## 参考文献 {#further-reading}

- [分散型ストレージとは何か？](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [分散型ストレージに関する5つのよくある神話を打ち破る](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_役に立ったコミュニティリソースをご存知ですか？このページを編集して追加してください！_

## 関連トピック {#related-topics}

- [開発フレームワーク](/developers/docs/frameworks/)