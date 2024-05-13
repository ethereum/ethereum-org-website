---
title: イーサリアムメインネット上のエンタープライズ
description: パブリックなイーサリアムブロックチェーン上のエンタープライズアプリケーションに関するガイド、記事、ツール
lang: ja
---

# 企業向けイーサリアム {#ethereum-for-enterprise}

大企業を含むさまざまな種類のビジネスでイーサリアムを役立てることができます。

- 信頼性を高め、ビジネス当事者間の連携コストを削減
- ビジネスネットワークの説明責任と運用効率を向上
- 新しいビジネスモデルと価値創造の機会を構築
- 競争力のある将来性に優れた組織

エンタープライズ向けブロックチェーンアプリケーションは、パブリックな自由参加型のイーサリアム[メインネット](/glossary/#mainnet)、またはイーサリアムテクノロジーに基づくプライベートなブロックチェーン上に構築できます。 詳細については、 [プライベート型エンタープライズイーサリアムチェーン](/enterprise/private-ethereum/)をご覧ください。

## パブリックとプライベードのイーサリアムの比較 {#private-vs-public}

パブリック型イーサリアムメインネットは1つしかありません。 メインネット上に構築されているアプリケーションは相互運用が可能です。インターネット上で構築されたアプリケーションと同様に、分散型ブロックチェーンの可能性を最大限に活用して相互に接続することができます。

多くの企業やコンソーシアムは、特定のアプリケーション向けに、イーサリアム技術に基づくプライベートなパーミッションド・ブロックチェーンをデプロイしています。

### 主な相違点 {#key-differences}

- ブロックチェーンのセキュリティ/不変性。改ざんに対するブロックチェーンの耐性は、そのコンセンサスアルゴリズムによって決定されます。 イーサリアムメインネットは、世界中の個人とマイナーによって運営される何千もの独立したノードの相互作用によって保護されています。 プライベートチェーンには、通常、1つまたは複数の組織によって制御される少数のノードがあります。それらのノードは厳重に制御できますが、ノードが数個侵害されるだけでチェーンを書き換えたり不正取引を行うことができます。
- パフォーマンス - プライベートエンタープライズイーサリアムチェーンでは、特別なハードウェア要件と権限証明などの異なるコンセンサスアルゴリズムを備えた高性能ノードを使用する可能性があるため。 ベースレイヤー(Layer1)でより高いトランザクションスループットを達成する場合があります。 イーサリアムメインネットでは、拡張レイヤーである[レイヤー2](/layer-2)を使用することで、高いスループットを実現できます。
- コスト - プライベートチェーンを運営するためのコストは、チェーンを設定し、管理するための労働とそれを実行するためのサーバに主に反映されます。 イーサリアムメインネットに接続するためのコストはかかりませんが、各トランザクションにかかるガス料金はイーサで支払う必要があります。 メタトランザクションリレーヤーでは、エンドユーザーだけでなく企業もトランザクションでイーサを直接保持して使用する必要が無くなります。 [ある分析](https://theblockchaintest.com/uploads/resources/EY%20-%20Total%20cost%20of%20ownership%20for%20blockchain%20solutions%20-%202019%20-%20Apr.pdf)では、アプリケーションを運用するための総コストは、プライベート チェーンを実行するよりもメインネットの方が低くなる可能性があることを示しています。
- ノードの権限 - 承認されたノードのみがプライベートチェーンに参加できます。 誰でもイーサリアムメインネット上でノードを設定できます。
- プライバシー - プライベートチェーンに書き込まれたデータへのアクセスは、アクセス制御とプライベートトランザクションを使用したより詳細なベースで、ネットワークへのアクセスを制限することで制御できます。 メインネットレイヤー1に書き込まれたすべてのデータは誰でも閲覧可能であるため、機密情報はオフチェーンで保存、送信されるか、または暗号化される必要があります。 レイヤー1のデータを区切ったりオフにした状態に維持できるレイヤー2ソリューションに加えて、これを容易にするデザインパターンが出現しています(たとえば、 ベースライン、Nightfall)。

### イーサリアムメインネット上に構築する理由 {#why-build-on-ethereum-mainnet}

ビジネスにとって、パブリックブロックチェーンの主な利点としては、独占に抵抗できることです。 ビジネスでの取引を調整するための中立的な仲裁者としてイーサリアムメインネットを使うことで、競合他社が支配権や影響力を駆使して不利な立場に置いてくるような別の会社を信頼することを回避できます。 誰もが参加、使用、貢献できる、オープンでパーミッションレスの分散型プラットフォームにおいて、権力を利用してユーザーに対して優位に立つような中央権力は存在しません。

Hyperledger、Quorum、Cordaプロジェクトが開始された2016年頃から、企業はブロックチェーン技術の実験を行っています。 当初は、主にプライベート・パーミッションド・エンタープライズ・ブロックチェーンに重点を置いていましたが、2019年から、ビジネスアプリケーション向けのパブリックブロックチェーンとプライベートブロックチェーンという考え方に移行していきました。 EYのPaul Brodyは[（プライベートに対して）パブリックブロックチェーンを構築することの利点について](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668)話しており、パブリックブロックチェーンには、(アプリケーションに応じて)より強力なセキュリティ/不変性、 透明性、総所有コストの削減、およびメインネット上にある他のすべてのアプリケーションと相互運用する機能(ネットワーク効果)が含まれる可能性があると述べています。 企業間で共通の枠組みを共有することで、情報を交換、共有、同期できない多数の孤立した無駄なサイロ構造を回避することができます。

パブリックブロックチェーンに焦点を移しているもう一つの開発は、 [レイヤー2](/layer-2)です。 レイヤー2は主にスケーラビリティ技術のカテゴリーであり、パブリックチェーン上でハイスループットアプリケーションを実現するものですが、 レイヤー2ソリューションは、 [過去にエンタープライズ向けデベロッパーがプライベートチェーンを選択するようになるきっかけとなったその他の課題に対処することもできます](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/)。

## リソース {#enterprise-resources}

### 参考文献 {#further-reading}

ビジネスにおいてイーサリアムからどのようなメリットを得ているか理解するための非技術的なリソース

- [エンタープライズ・イーサリアム・アライアンス2023ビジネス準備状況レポート](https://entethalliance.org/eea-ethereum-business-readiness-report-2023/) - _パブリックイーサリアムとビジネス向けのより広範なイーサリアムエコシステムの可能性と機能の調査_
- [_ビジネス向けのイーサリアム_ Paul Brody著](https://www.uapress.com/product/ethereum-for-business/) - _資産管理からサプライチェーンへの支払いにおいて収益を生み出すユースケースがわかりやすい英語で書かれているガイド_

### 組織 {#organizations}

イーサリアムを企業にとって身近な存在にするために、さまざまな組織が次のような協力的な取り組みを行っています。

- [エンタープライズ・イーサリアム・アライアンス (EEA)](https://entethalliance.org/) EEAは、組織に対して日常業務にイーサリアムテクノロジーを導入、使用することを支援します。 組織の目標としては、専門的および商業的なサポート、提唱および研究、標準の開発およびエコシステムトラストサービスを通じてビジネスにおけるイーサリアムを促進することです。
- [グローバル・ブロックチェーン・ビジネス評議会 (GBBC)](https://www.gbbc.io/) - GBBCは、ブロックチェーン・テクノロジー・エコシステムの業界団体です。 政策立案者や規制当局との調整、イベントの開催および深い議論、研究の推進を通して、GBBCは、より安全で公平で機能的な社会を構築するためのブロックチェーンのさらなる導入に専念しています。


## エンタープライズ向けデベロッパーリソースについて {#enterprise-developer-resources}

### プロダクトとサービス {#products-and-services}

- [4EVERLAND](https://www.4everland.org/) - _分散型アプリケーションをホストするためのAPI、RPCサービス、ツールを提供し、イーサリアム上で分散型ストレージを実現_
- [Alchemy](https://www.alchemy.com/) - _ イーサリアムでアプリケーションを作成、監視するためのAPIサービスとツールを提供_
- [Blast](https://blastapi.io/) - _イーサリアムアーカイブのメインネットおよびテストネットのRPC/WSS APIを提供するAPIプラットフォーム_
- [Blockapps](https://blockapps.net/) - _STRATOプラットフォームを構成するエンタープライズイーサリアムプロトコル、ツール、APIの実装_
- [Chainstack](https://chainstack.com/) - _メインネットおよびテストネットのイーサリアムインフラストラクチャをパブリックおよび隔離されたカスタマークラウドでホスト_
- [ConsenSys](https://consensys.io/) - _イーサリアム上で構築するためのさまざまなプロダクトとツール、ならびにコンサルティングとカスタム開発サービスを提供_
- [Envision Blockchain](https://envisionblockchain.com/) - _イーサリアムメインネットに特化したエンタープライズ向けコンサルティングおよび開発サービスを提供_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) - _ 信頼できるビジネスパートナーのネットワーク全体で、RFQ、コントラクト、発注書、請求書を発行することにより、調達ワークフローを提供_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) - _Javaで書かれたApache 2.0ライセンスに基づくオープンソースのエンタープライズ向けイーサリアムクライアント_
- [Infura](https://infura.io/) - _イーサリアムおよびIPFSネットワークへのスケーラブルなAPIアクセス_
- [Kaleido](https://kaleido.io/) - _簡素化されたブロックチェーンとデジタル資産アプリケーションを提供するエンタープライズ向け開発プラットフォーム_
- [NodeReal](https://nodereal.io/) - _Web3エコシステムにスケーラブルなブロックチェーンインフラストラクチャとAPIサービス プロバイダーを提供_
- [Provide](https://provide.services/) - _企業向けゼロ知識ミドルウェア_
- [QuickNode](https://www.quicknode.com/) - _統合されたプロダクトスイートとエンタープライズ級のソリューションを提供しながら、NFT API、トークンAPIなどの高レベルAPIを備えた信頼性の高い高速ノードを提供_
- [Tenderly](https://tenderly.co) - _スマートコントラクトの開発、テスト、監視、運用のためのデバッグ、オブザーバビリティ、インフラストラクチャビルディングブロックを提供するWeb3開発プラットフォーム_
- [Unibright](https://unibright.io/) - _ビジネスプロセスと統合の分野で20年以上の経験を持つブロックチェーン専門家、建築家、デベロッパー、コンサルタントのチーム_
- [Zeeve](https://www.zeeve.io/) - _イーサリアムに構築するための幅広いプロダクトとツール、エンタープライズWeb3アプリケーションのためのインフラストラクチャおよびAPIも提供_

### ツールとライブラリ {#tooling-and-libraries}

- [ベースラインプロジェクト](https://www.baseline-protocol.org/) - _ベースラインプロトコルはツールとライブラリのセットで、企業が各システムのデータを維持しつつ、プライバシーを守って複雑でマルチパーティのビジネスプロセスおよびワークフローを調整することを支援。 この標準により、ネットワークを共通の参照フレームとして使うことで、2つ以上の状態マシンがデータの一貫性とワークフローの継続性を実現し、維持することが可能_
- [Chainlens](https://www.chainlens.com/) - _Web3 LabsのSaaSおよびオンプレミスのブロックチェーンデータおよび分析プラットフォーム_
- [アーンスト・アンド・ヤング「Nightfall」](https://github.com/EYBlockchain/nightfall_3) - _オプティミスティック・ロールアップを使って、ERC20、ERC721、ERC1155アプリケーションをゼロ知識で転送するためのアプリケーション_
- [Truffle Suite](https://trufflesuite.com) - _ブロックチェーン開発スイート (Truffle、Ganache、Drizzle)_

### スケーラビリティソリューション {#scalability-solutions}

[レイヤー2](/layer-2)はイーサリアム(レイヤー1)上で実行される一連の技術またはシステムであり、レイヤー1のセキュリティプロパティを継承して、レイヤー1よりも優れたトランザクション処理能力(スループット)、安価なトランザクション手数料(運用コスト)、高速なトランザクション確認機能を提供します。 レイヤー2のスケーリングソリューションはレイヤー1によって保護されていますが、このソリューションにより、レイヤー1では対応できなかった多数のユーザーやアクション、データをブロックチェーンアプリケーションが処理できるようになります。 その多くは、パフォーマンスとセキュリティを最大化するために、最新の暗号技術とゼロ知識(ZK)証明の進歩を活用しています。

レイヤー2のスケーラビリティソリューションの上にアプリケーションを構築することで、 [企業が過去にプライベートブロックチェーン上に構築するようになった理由でもある多数の懸念事項を解決し、](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/)メインネット上に構築する利点を維持することができます。

## メインネットで稼働しているエンタープライズアプリケーション {#enterprise-live-on-mainnet}

パブリックなイーサリアムメインネット上にデプロイされたエンタープライズアプリケーションをいくつか紹介します。

### お支払い {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _は、広告を表示したユーザーに報酬を支払い、ユーザーはBasic Attentionトークンを介してパブリッシャーを支援することが可能_
- [hCaptcha](https://www.hcaptcha.com/) _機械学習の目的でデータにラベルを付けるためにユーザーが行った作業に対して、ウェブサイト運営者に支払うボット防止CAPTCHAシステム。 現在はCloudflareによってデプロイ_
- [EthereumAds](https://ethereumads.com/) _ウェブサイト運営者が広告スペースを販売し、イーサリアム経由で支払いを受けることが可能_

### ファイナンス {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _債券の発行と決済_
- [Societe Generale](https://www.generali-investments.com/it/en/institutional/article/generali-investments-and-generali-iard-carry-out-first-market-transaction-based-on-blockchain-infrastructure) _債券の発行_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _FATブランドの債券発行とトークン化_
- [Sila](https://silamoney.com/) _ステーブルコインを使用したバンキングおよびACHペイメントのIaaS(インフラストラクチャ・アズ・ア・サービス) _
- [Taurus](https://www.taurushq.com/) _トークン化された証券の発行_

### 資産トークン化 {#tokenization}

- [Tinlake](https://tinlake.centrifuge.io/) _請求書、住宅ローン、ストリーミングロイヤリティ_などのトークン化された現実世界の資産を通じた債権ファイナンス
- [RealT](https://realt.co/) _世界中の投資家は、法規制に完全に準拠した部分的なトークン化された所有権を通じて、米国の不動産市場に参入可能_
- [AgroToken](https://agrotoken.io/en/home) _農産物のトークン化と取引_
- [Fasset](https://www.fasset.com/) _持続可能なインフラをサポートするためのプラットフォーム_

### データの公証化 {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _終了した融資の詳細がハッシュ化されメインネットに記録_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _イタリアの最大の通信社で、フェイクニュースと戦い、ニュースをメインネットに記録することで、読者は出所を確認することが可能_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _イーサリアム上でプレスリリースを記録することで、企業の説明責任と信用を確保_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _イーサリアム上で時計の出所と修理履歴を記録_
- [EthSign](https://ethsign.xyz/) _イーサリアムブロックチェーン上で署名された電子ドキュメントを記録_

### サプライチェーン {#supply-chain}

- [Morpheus.network](https://morpheus.network/) _イーサリアムメインネット上で公証データを用いたハイブリッドなプライベートチェーンを実現するサプライチェーン自動化プラットフォーム。カナダの食品・石油・ガス販売会社Federated Co-op Ltd.やアルゼンチンのペットフード会社Vitalcanなどが採用_
- [Minespider](https://www.minespider.com/) _サプライチェーンの追跡_
- [EY OpsChain Contract Manager](https://blockchain.ey.com/products/contract-manager) _信頼できるビジネスパートナーのネットワーク全体で、RFQ、コントラクト、発注書、請求書を発行することにより、企業は調達ワークフローに従事可能_
- [Treum](https://treum.io/) _ブロックチェーン技術を使用して、サプライチェーンの透明性、トレーサビリティ、トレーダビリティを実現_
- [TradeTrust](https://www.tradetrust.io/) _海外発送向けの電子船荷証券(eBL)を検証_

### 保険 {#insurance}

- [Arbol](https://www.arbolmarket.com/) _天候関連のリスクをカバーするパラメトリック保険_
- [Etherisc](https://etherisc.com/) _様々なリスクに対する分散型保険_

### 資格情報と認証 {#credentials}

- [イタリアにある高校の2校](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _イーサリアムメインネットでデジタル卒業証書を発行_
- [St. Gallen大学](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _スイスの大学による学位を証明するためのパイロットプロジェクト_
- [Hyland Credentials](https://www.hylandcredentials.com) _デジタルディプロマ、その他の教育資格情報、ライセンス、証明書_
- [OpenCerts](https://opencerts.io/faq) _シンガポールでブロックチェーン教育の資格情報を発行_
- [BlockCerts](https://www.blockcerts.org/) _ブロックチェーン資格情報のオープン標準を開発_

### ユーティリティ {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _電気代の支払い_

このリストへの追加を希望される場合は、[貢献の手順](/contributing/)を参照してください。
