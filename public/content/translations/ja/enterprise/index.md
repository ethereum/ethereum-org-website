---
title: イーサリアムメインネット上のエンタープライズ
description: パブリックなイーサリアムブロックチェーン上のエンタープライズアプリケーションに関するガイド、記事、ツール
lang: ja
---

# エンタープライズ向けイーサリアムメインネット {#ethereum-for-enterprise}

ブロックチェーンアプリケーションはビジネスに役立ちます。

- 信頼性を高め、ビジネス当事者間の連携コストを削減
- ビジネスネットワークの説明責任と運用効率を向上
- 新しいビジネスモデルと価値創造の機会を構築
- 競争力のある将来性に優れた組織

エンタープライズ向けブロックチェーンアプリケーションは、パブリックな自由参加型のイーサリアム[メインネット](/glossary/#mainnet)、またはイーサリアムテクノロジーに基づくプライベートなブロックチェーン上に構築できます。 詳細については、 [プライベート型エンタープライズイーサリアムチェーン](/enterprise/private-ethereum/)をご覧ください。

## パブリックとプライベードのイーサリアムの比較 {#private-vs-public}

パブリック型イーサリアムメインネットは 1 つしかありません。 メインネット上に構築されているアプリケーションは相互運用が可能です。インターネット上で構築されたアプリケーションと同様に、分散型ブロックチェーンの可能性を最大限に活用して相互に接続することができます。

多くの企業やコンソーシアムは、イーサリアムテクノロジーに基づく特定のアプリケーションに対して、プライベートで許可型のブロックチェーンを展開しています。

### 主な相違点 {#key-differences}

- ブロックチェーンのセキュリティ/不変性。改ざんに対するブロックチェーンの耐性は、そのコンセンサスアルゴリズムによって決定されます。 イーサリアムメインネットは、世界中の個人とマイナーによって運営される何千もの独立したノードの相互作用によって保護されています。 プライベートチェーンには、通常、1 つまたは複数の組織によって制御される少数のノードがあります。それらのノードは厳重に制御できますが、ノードが数個侵害されるだけでチェーンを書き換えたり不正取引を行うことができます。
- パフォーマンス - プライベートエンタープライズイーサリアムチェーンでは、特別なハードウェア要件と権限証明などの異なるコンセンサスアルゴリズムを備えた高性能ノードを使用する可能性があるため。 ベースレイヤー(Layer1)でより高いトランザクションスループットを達成する場合があります。 イーサリアムメインネットでは、拡張レイヤーである[レイヤー 2](/developers/docs/scaling/#layer-2-scaling)を使用することで、高いスループットを実現できます。
- コスト - プライベートチェーンを運営するためのコストは主に、チェーンを設定し管理する労力と、それを実行するためのサーバに織り込まれています。 イーサリアムメインネットに接続するためのコストはかかりませんが、各トランザクションにかかるガス料金は Ether で支払う必要があります。 エンドユーザーや企業がトランザクションに Ether を直接使用しなくてもいいように、トランザクションリレイヤー(別名ガスステーション)が開発されています。 ある[分析](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf)によると、メインネット上でアプリケーションを運用するための総コストは、プライベートチェーンを実行するコストを下回る可能性があることを示しています。
- ノードの権限 - 承認されたノードのみがプライベートチェーンに参加できます。 誰でもイーサリアムメインネット上でノードを設定できます。
- プライバシー - プライベートチェーンに書き込まれたデータへのアクセスは、アクセス制御とプライベートトランザクションを使用したより詳細なベースで、ネットワークへのアクセスを制限することで制御できます。 メインネットレイヤー 1 に書き込まれたすべてのデータは誰でも閲覧可能であるため、機密情報はオフチェーンで保存、送信されるか、または暗号化される必要があります。 レイヤー 1 のデータを区切ったりオフにした状態に維持できるレイヤー 2 ソリューションに加えて、これを容易にするデザインパターンが出現しています(たとえば、 ベースライン、Aztec)。

### イーサリアムメインネット上に構築する理由 {#why-build-on-ethereum-mainnet}

Hyperledger、Quorum、Corda プロジェクトが開始された 2016 年頃から、企業はブロックチェーン技術の実験を行っています。 主に民間の許可を受けたエンタープライズ向けブロックチェーンに重点を置いていましたが、2019 年から、ビジネスアプリケーション向けのパブリックブロックチェーンとプライベートブロックチェーンという考え方に移行していきました。 Forrester が実施した[調査](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf)では、「調査回答者は... この可能性を見出しています。75%が将来的にパブリックブロックチェーンを活用する可能性があると述べており、3 分の 1 弱が非常に可能性が高いと答えている」ことが明らかになっています。 EY の Paul Brody は[パブリックブロックチェーンを構築することの利点について](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668)話しており、パブリックブロックチェーンには、(アプリケーションに応じて)より強力なセキュリティ/不変性、 透明性、総所有コストの削減、およびメインネット上にある他のすべてのアプリケーションと相互運用する機能(ネットワーク効果)が含まれる可能性があると述べています。 企業間で共通の枠組みを共有することで、情報を交換、共有、同期できない多数の孤立した無駄なサイロ構造を回避することができます。

パブリックブロックチェーンに焦点を移しているもう一つの開発は、 [レイヤー 2](/developers/docs/scaling/#layer-2-scaling)です。 レイヤー 2 は主にスケーラビリティ技術のカテゴリーであり、パブリックチェーン上でハイスループットアプリケーションを実現するものですが、 レイヤー 2 ソリューションは、 [過去にエンタープライズ向けデベロッパーがプライベートチェーンを選択するようになるきっかけとなったその他の課題に対処することもできます](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/)。

## エンタープライズ向けデベロッパーリソースについて {#enterprise-developer-resources}

### 組織 {#organizations}

イーサリアムを企業にとって身近な存在にするために、さまざまな組織が次のような協力的な取り組みを行っています。

- [エンタープライズ・イーサリアム・アライアンス (EEA)](https://entethalliance.org/) EEA により、組織は日常業務にイーサリアムテクノロジーを導入、使用することができます。 イーサリアムのエコシステムを強化し、新しいビジネスチャンスを開発し、業界の採用を促進し、互いに学び、協力します。 EEA のメインネットワーキンググループは、パブリックなイーサリアムメインネットを構築することに興味を持っている企業や、彼らをサポートするイーサリアムコミュニティメンバーの集まりです。
- [イーサリアム・オアシス・オープン・プロジェクト](https://github.com/ethereum-oasis/oasis-open-project) イーサリアム・オアシス・オープン・プロジェクトは、多様なステークホルダーに中立的なフォーラムを提供し、イーサリアムの長期的な安定性、相互運用性、統合の容易性を促進する高品質の仕様を実現できるオアシス・オープン・プロジェクトです。 このプロジェクトでは、イーサリアムプロトコルの新機能と拡張を容易にする明確なオープン標準、高品質なドキュメント、共有テストスイートを開発を予定しています。
- [ベースラインプロジェクト(Baseline Project)](https://www.baseline-protocol.org/) ペースラインプロトコルは、暗号技術、メッセージング、ブロックチェーンの利点を組み合わせて、パブリックなイーサリアムメインネットを介して安全かつプライベートなビジネスプロセスを低コストで提供するオープンソースのイニシアチブです。 このプロトコルにより、機密データをオンチェーンに残すことなく、企業間の機密かつ複雑なコラボレーションが可能になります。 ベースラインプロジェクトは、イーサリアム・オアシス・オープン・プロジェクトのサブプロジェクトであり、ベースライン技術運営委員会によって調整されています。

### プロダクトとサービス {#products-and-services}

- [Alchemy](https://www.alchemy.com/)_ イーサリアムでアプリケーションを作成、監視するための API サービスとツールを提供_</0>
- [Blast](https://blastapi.io/) _イーサリアムアーカイブのメインネットおよびテストネットの RPC/WSS API を提供する API プラットフォーム_
- [Blockapps](https://blockapps.net/) _STRATO プラットフォームを構成するエンタープライズイーサリアムプロトコル、ツール、API の実装_
- [Chainstack](https://chainstack.com/) _メインネットおよびテストネットのイーサリアムインフラストラクチャをパブリックおよび隔離されたカスタマークラウドでホスト_
- [ConsenSys](https://consensys.net/) _イーサリアム上で構築するためのさまざまなプロダクトとツール、ならびにコンサルティングとカスタム開発サービスを提供_
- [Envision Blockchain](https://envisionblockchain.com/) _イーサリアムメインネットに特化したエンタープライズ向けコンサルティングおよび開発サービスを提供_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _ 信頼できるビジネスパートナーのネットワーク全体で、RFQ、コントラクト、発注書、請求書を発行することにより、調達ワークフローを提供_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _Java で書かれた Apache 2.0 ライセンスに基づくオープンソースのエンタープライズ向けイーサリアムクライアント_
- [Infura](https://infura.io/) _イーサリアムおよび IPFS ネットワークへのスケーラブルな API アクセス_
- [Kaleido](https://kaleido.io/) _簡素化されたブロックチェーンとデジタル資産アプリケーションを提供するエンタープライズ向け開発プラットフォーム_
- [エンタープライズ向け Web3 アプリケーションに](https://provide.services/)_インフラストラクチャと API を提供_
- [QuickNode](https://www.quicknode.com/) _統合されたプロダクトスイートとエンタープライズ級のソリューションを提供しながら、NFT API、トークン API などの高レベル API を備えた信頼性の高い高速ノードを提供_
- [Tenderly](https://tenderly.co) - _スマートコントラクトの開発、テスト、監視、運用のためのデバッグ、オブザーバビリティ、インフラストラクチャビルディングブロックを提供する Web3 開発プラットフォーム_
- [Unibright](https://unibright.io/) _ビジネスプロセスと統合の分野で 20 年以上の経験を持つブロックチェーン専門家、建築家、デベロッパー、コンサルタントのチーム_
- [Zero Services GmbH](https://www.zeroservices.eu/) _ヨーロッパとアジアのコロケーションにまたがるマネージドサービスのプロバイダー ノードを安全かつ確実に運用、監視_

### ツールとライブラリ {#tooling-and-libraries}

- [Alethio](https://explorer.aleth.io/) _イーサリアムデータ分析プラットフォーム_
- [Sirato](https://www.web3labs.com/sirato) _Web3 Labs によるパブリックとプライベートイーサリアム互換ネットワークのためのデータおよび分析プラットフォーム_
- [Ernst & Young's ‘Nightfall’](https://github.com/EYBlockchain/nightfall) _プライベートトランザクション用のツールキット_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _Web3 プロバイダーで使用するトランザクション署名のアプリケーション_
- [Tenderly](https://tenderly.co/) _プライベートネットワークをサポートするリアルタイムの分析、アラート、モニタリングを提供するデータプラットフォーム。_
- [Truffle Suite](https://trufflesuite.com) _ブロックチェーン開発スイート (Truffle, Ganache, Drizzle)_

### スケーラビリティソリューション {#scalability-solutions}

[レイヤー 2](/layer-2)はイーサリアム(レイヤー 1)上で実行される一連の技術またはシステムであり、レイヤー 1 のセキュリティプロパティを継承して、トランザクション処理能力(スループット)、トランザクション手数料(運用コスト)、レイヤー 1 よりも高速なトランザクション確認機能を提供します。 レイヤー 2 のスケーリングソリューションはレイヤー 1 によって保護されていますが、このソリューションにより、レイヤー 1 では対応できなかった多数のユーザーやアクション、データをブロックチェーンアプリケーションが処理できるようになります。 その多くは、パフォーマンスとセキュリティを最大化するために、最新の暗号技術とゼロ知識(ZK)証明の進歩を活用しています。

レイヤー 2 のスケーラビリティソリューションの上にアプリケーションを構築することで、 [企業が過去にプライベートブロックチェーン上に構築するようになった理由でもある多数の懸念事項を解決し、](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/)メインネット上に構築する利点を維持することができます。

## メインネットで稼働しているエンタープライズアプリケーション {#enterprise-live-on-mainnet}

パブリックなイーサリアムメインネット上にデプロイされたエンタープライズアプリケーションをいくつかご紹介します。

### 決済 {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _ 広告へのアテンションに対してユーザーに報酬を支払い、ユーザーはベーシックアテンショントークンを介してパブリッシャーを支援することが可能_
- [hCaptcha](https://www.hcaptcha.com/) _機械学習の目的でデータにラベルを付けるためにユーザーが行った作業に対してウェブサイト運営者に支払うボット防止 CAPTCHA システム。 現在は Cloudflare によってデプロイ_
- [EthereumAds](https://ethereumads.com/) _ウェブサイト運営者が広告スペースを販売し、イーサリアム経由で支払いを受ける_

### ファイナンス {#finance}

- [サンタンデール銀行](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _債券発行と決済_
- [ソシエテ・ジェネラル](https://www.generali-investments.com/it/en/institutional/article/generali-investments-and-generali-iard-carry-out-first-market-transaction-based-on-blockchain-infrastructure) _債券発行_
- [ケイデンス](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _FAT ブランドの債券発行とトークン化_
- [Sila](https://silamoney.com/) _ステーブルコインを使用したバンキングおよび ACH ペイメントの IaaS(インフラストラクチャ・アズ・ア・サービス) _
- [Taurus](https://www.taurushq.com/) _トークン化された証券の発行_

### 資産トークン化 {#tokenization}

- [Tinlake](https://tinlake.centrifuge.io/) *請求書、住宅ローン、ストリーミングロイヤリティ*などのトークン化された現実世界の資産を通じた債権ファイナンス
- [RealT](https://realt.co/) _世界中の投資家は、完全に準拠した分割かつトークン化された所有権を通じて、米国の不動産市場に参入可能_
- [AgroToken](https://agrotoken.io/en/) _農産物のトークン化と取引_
- [Fasset](https://www.fasset.com/) _持続可能なインフラをサポートするためのプラットフォーム_

### データの公証化 {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _確定されたローンの詳細はハッシュ化され、メインネットに記録されます_
- [Splunk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _ データ整合性は、インデックスされたデータのハッシュを定期的にメインネットに書き込むことで保証されます_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _イタリア最大の報道機関が偽のニュースと戦い、読者がニュースのソースをメインネットに記録することで検証できるようにします_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _企業の説明責任と信頼性を確保するために、イーサリアムのプレスリリースを記録します_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _イーサリアムでの腕時計の証明書と修理履歴を記録します_
- [EthSign](https://ethsign.xyz/) _イーサリアムブロックチェーン上の署名された電子ドキュメントを記録します_

### サプライチェーン {#supply-chain}

- [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _船荷証券および書類転送プロバイダー_
- [Morpheus.network](https://morpheus.network/) _イーサリアムメインネット上で公証データを用いたハイブリッドなプライベートチェーンを実現するサプライチェーン自動化プラットフォーム。カナダの食品・石油・ガス販売会社 Federated Co-op Ltd.やアルゼンチンのペットフード会社 Vitalcan などが採用_
- [Minespider](https://www.minespider.com/) _サプライチェーン追跡_
- [EY OpsChain Contract Manager](https://blockchain.ey.com/products/contract-manager) _信頼できるビジネスパートナーのネットワーク全体で、RFQ、コントラクト、発注書、請求書を発行することにより、企業は調達ワークフローに従事可能_
- [Treum](https://treum.io/) _ブロックチェーン技術を使用して、透明性、トレーサビリティ、トレーダビリティをサプライチェーンに配置_
- [TradeTrust](https://www.tradetrust.io/) _海外発送向けの電子船荷証券(eBL)を検証_
- [Birra Peroni](https://www.ey.com/en_gl/news/2021/05/birra-peroni-is-the-first-industrial-organization-to-mint-unique-non-fungible-tokens-using-ey-opschain-traceability) _新しいビールの製造単位ごとに NFT を発行して、サプライチェーン全体の透明性と効率性を向上_

### 保険 {#insurance}

- [Arbol](https://www.arbolmarket.com/) _天候関連のリスクをカバーするパラメトリック保険_
- [Etherisc](https://etherisc.com/) _さまざまなリスクに対する分散型保険_

### 資格情報と認証 {#credentials}

- [イタリアの 2 つの高等学校](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _イーサリアムメインネットで発行されたデジタルディプロマ_
- [ザンクトガレン大学](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _学位を認証するためのパイロットプロジェクトを実施したスイスの大学_
- [Hyland Credentials](https://www.hylandcredentials.com) _デジタルディプロマ、その他の教育資格情報、ライセンス、証明書_
- [OpenCerts](https://opencerts.io/faq) _シンガポールでブロックチェーン教育の資格情報を発行_
- [BlockCerts](https://www.blockcerts.org/) _ブロックチェーン資格情報のオープン標準を開発_

### ユーティリティ {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _電気料金の支払い_

このリストへの追加を希望される場合は、貢献の[手順](/contributing/)を参照してください。
