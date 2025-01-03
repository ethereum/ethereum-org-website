---
title: イーサリアムのアクティブな研究分野
description: さまざまなオープンリサーチの分野を探求し、参加方法を学ぶ。
lang: ja
---

# イーサリアムのアクティブな研究分野 {#active-areas-of-ethereum-research}

イーサリアムの主な強みの一つは、活発な研究とエンジニアリングのコミュニティが常にそれを改善していることです。 世界中の多くの情熱的で熟練した人々がイーサリアムに関連する課題に取り組みたいと考えていますが、その課題が何であるかを見つけるのは必ずしも簡単ではありません。 このページでは、イーサリアムの最前線を知るためのガイドとして、アクティブに研究されている主要分野を概説します。

## イーサリアムの研究の仕組み {#how-ethereum-research-works}

イーサリアムの研究はオープンかつ透明であり、[分散型科学 (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science)の原則を体現しています。 研究ツールや成果物を、たとえば実行可能なノートブックといった形で、できるだけオープンかつインタラクティブにする文化があります。 イーサリアムの研究は迅速に進んでおり、新しい発見は従来の査読を経た後の出版物ではなく、[ethresear.ch](https://ethresear.ch/) のようなフォーラムでオープンに投稿され、議論されています。

## 一般的な研究リソース {#general-research-resources}

特定のトピックに関係なく、[ethresear.ch](https://ethresear.ch) や[Eth R&D Discordチャンネル](https://discord.gg/qGpsxSA) には、イーサリアムの研究に関する豊富な情報があります。 これらは、イーサリアムの研究者たちが最新のアイデアや開発の機会について議論する主な場所です。

2022年5月に[DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum) が発行したこのレポートは、イーサリアムのロードマップの良い概要を提供しています。

## 資金提供の源{#sources-of-funding}

イーサリアムの研究に参加して報酬を得ることができます！ たとえば、[イーサリアム・ファウンデーション](/foundation/) は最近、[学術助成金の資金調達ラウンド](https://esp.ethereum.foundation/academic-grants) を実施しました。 現在の資金提供機会や今後の機会については、[イーサリアムの助成金ページ](/community/grants/) で情報を見つけることができます。

## プロトコル研究 {#protocol-research}

プロトコル研究は、ノードが接続し、通信し、イーサリアムのデータを交換・保存し、ブロックチェーンの状態についてコンセンサスに至る方法を定義する一連の規則であるイーサリアムのベースレイヤーに関するものです。 プロトコル研究は、コンセンサスと実行の2つの主要なカテゴリに分けられます。

### コンセンサス {#consensus}

コンセンサスの研究は、[イーサリアムのプルーフ・オブ・ステーク（PoS）メカニズム](/developers/docs/consensus-mechanisms/pos/) に関するものです。 コンセンサスの研究トピックの例として、以下が挙げられます。

- 脆弱性の特定と修正
- クリプトエコノミックセキュリティの定量化
- クライアント実装のセキュリティやパフォーマンスの向上
- ライトクライアントの開発

先進的な研究に加えて、イーサリアムの大幅な改善を可能にするために、シングルスロット・ファイナリティなど、プロトコルの基本的な再設計も研究されています。 さらに、コンセンサスクライアント間のピアツーピアネットワーキングの効率、安全性、モニタリングも重要な研究テーマとなっています。

#### バックグラウンドリーディング {#background-reading}

- [プルーフ・オブ・ステーク入門](/developers/docs/consensus-mechanisms/pos/)
- [Casper-FFG ペーパー](https://arxiv.org/abs/1710.09437)
- [Casper-FFG の解説](https://arxiv.org/abs/1710.09437)
- [Gasper ペーパー](https://arxiv.org/abs/2003.03052)

#### 最近の研究 {#recent-research}

- [Ethresear.ch コンセンサス](https://ethresear.ch/c/consensus/29)
- [可用性とファイナリティのジレンマ](https://arxiv.org/abs/2009.04987)
- [シングルスロット・ファイナリティ](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [提案者と作成者の分離](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### 実行 {#execution}

実行レイヤーは、トランザクションの実行、[イーサリアム仮想マシン (EVM)](/developers/docs/evm/) の運用、そしてコンセンサスレイヤーに渡す実行ペイロードの生成に関するものです。 活発な研究分野として、以下が挙げられます。

- ライトクライアントサポートの構築
- ガスリミットの研究
- 新しいデータ構造の組み込み (例：バークルツリー)

#### バックグラウンドリーディング {#background-reading-1}

- [EVM入門](/developers/docs/evm)
- [Ethresear.ch 実行レイヤー](https://ethresear.ch/c/execution-layer-research/37)

#### 最近の研究 {#recent-research-1}

- [データベースの最適化](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [ステートの有効期限](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [ステートの有効期限への道筋](https://hackmd.io/@vbuterin/state_expiry_paths)
- [バークルとステートの有効期限の提案](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [履歴管理](https://eips.ethereum.org/EIPS/eip-4444)
- [バークルツリー](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [データの可用性サンプリング](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## クライアント開発 {#client-development}

イーサリアムクライアントは、イーサリアムプロトコルの実装に関するものです。 クライアントの開発は、プロトコルの研究成果をクライアントに組み込んで現実のものにする役割を担います。 クライアント開発には、クライアントの仕様を更新することや、具体的な実装を構築することが含まれます。

イーサリアムノードを運用するためには、以下の2つのソフトウェアが必要です。

1. コンセンサスクライアント：ブロックチェーンのヘッドを追跡し、ブロックを伝播し、コンセンサスロジックを処理します。
2. 実行クライアント：イーサリアム仮想マシンをサポートし、トランザクションやスマートコントラクトを実行します。

ノードやクライアントの詳細については、[ノードとクライアントのページ](/developers/docs/nodes-and-clients/) で確認でき、すべての現行クライアント実装のリストもご覧いただけます。 また、イーサリアムの全てのアップグレード履歴は[履歴ページ](/history/) で確認可能です。

### 実行クライアント {#execution-clients}

- [実行クライアントの仕様](https://github.com/ethereum/execution-specs)
- [実行APIの仕様](https://github.com/ethereum/execution-apis)

### コンセンサスクライアント {#consensus-clients}

- [コンセンサスクライアントの仕様](https://github.com/ethereum/consensus-specs)
- [ビーコンAPIの仕様](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## スケーリングとパフォーマンス {#scaling-and-performance}

イーサリアムのスケーリングは、イーサリアム研究者にとって大きな注目分野です。 現在のアプローチには、トランザクションをロールアップにオフロードし、データブロブを使用して可能な限り安価にすることが含まれます。 イーサリアムのスケーリングに関する入門情報は、[スケーリングページ](/developers/docs/scaling) でご確認いただけます。

### レイヤー2 {#layer-2}

現在、イーサリアムをスケールするためのレイヤー2プロトコルがいくつか存在しており、これらはトランザクションをバッチ処理し、イーサリアムレイヤー1上でのセキュリティを確保するためのさまざまな手法を使用しています。 この分野は非常に急速に成長しており、多くの研究と開発の可能性があります。

#### バックグラウンドリーディング {#background-reading-2}

- [レイヤー2入門](/layer-2/)
- [Polynya: ロールアップ、DA、モジュラーチェーン](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### 最近の研究 {#recent-research-2}

- [シーケンサーに対するArbitrumのフェアオーダリング](https://eprint.iacr.org/2021/1465)
- [ethresear.ch レイヤー2](https://ethresear.ch/c/layer-2/32)
- [ロールアップ中心のロードマップ](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### ブリッジ {#bridges}

レイヤー2の中でも、さらなる研究と開発が求められる分野の一つが、安全で高性能なブリッジです。 これは、さまざまなレイヤー2間のブリッジや、レイヤー1とレイヤー2間のブリッジを含みます。 ブリッジはハッカーに狙われやすい部分であるため、この分野の研究は特に重要です。

#### バックグラウンドリーディング {#background-reading-3}

- [ブロックチェーンブリッジ入門](/bridges/)
- [ブリッジに関するヴィタリックの見解](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [ブロックチェーンブリッジに関する記事](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [ブリッジにロックされたバリュー](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### 最近の研究 {#recent-research-3}

- [ブリッジの検証](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### シャーディング {#sharding}

イーサリアムのブロックチェーンにおけるシャーディングは、長い間開発ロードマップの一部でした。 しかし、「ダンクシャーディング」などの新しいスケーリングソリューションが現在注目を集めています。

完全なダンクシャーディングの前段階であるプロト・ダンクシャーディングは、カンクン - デネブ (「デンクン」)ネットワークアップグレードで実装されました。

[デンクンアップグレードについての詳細](/roadmap/dencun/)

#### バックグラウンドリーディング {#background-reading-4}

- [プロトダンクシャーディングに関するノート](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Banklessのダンクシャーディングに関する動画](https://www.youtube.com/watch?v=N5p0TB77flM)
- [イーサリアムのシャーディング研究の概要](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [ダンクシャーディング (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### 最近の研究 {#recent-research-4}

- [EIP-4844: プロトダンクシャーディング](https://eips.ethereum.org/EIPS/eip-4844)
- [ヴィタリックによるシャーディングとデータ可用性サンプリングについて](https://hackmd.io/@vbuterin/sharding_proposal)

### ハードウェア {#hardware}

[ノードの運用](/developers/docs/nodes-and-clients/run-a-node/)を比較的低スペックなハードウェアで行うことは、イーサリアムを分散化した状態で維持するために重要です。 そのため、ノードを運用する際のハードウェア要件の最小化を積極的に研究することが、重要な研究分野となっています。

#### バックグラウンドリーディング {#background-reading-5}

- [ARM上でのイーサリアム](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### 最近の研究 {#recent-research-5}

- [FPGA上でのECDSA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## セキュリティ {#security}

セキュリティは広範なトピックであり、スパムや詐欺の防止、ウォレットのセキュリティ、ハードウェアのセキュリティ、暗号経済のセキュリティ、バグハンティング、アプリケーションやクライアントソフトウェアのテスト、キー管理などが含まれます。 これらの分野の知識で貢献することは、主流の普及を促進するのに役立ちます。

### 暗号技術 & ZKP {#cryptography--zkp}

ゼロ知識証明 (ZKP) や暗号技術は、イーサリアムおよびそのアプリケーションにプライバシーとセキュリティを組み込むために重要です。 ゼロ知識は比較的新しい分野ですが、急速に進展しており、研究と開発の機会が多くあります。 例えば、[Keccakハッシュアルゴリズム](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview)のより効率的な実装の開発、現在存在するものよりも優れた多項式コミットメントの発見、ecdsa公開鍵生成と署名検証回路のコスト削減などが考えられます。

#### バックグラウンドリーディング {#background-reading-6}

- [0xparcブログ](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Zero Knowledgeポッドキャスト](https://zeroknowledge.fm/)

#### 最近の研究 {#recent-research-6}

- [楕円曲線暗号技術の最近の進展](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### ウォレット {#wallets}

イーサリアムのウォレットは、ブラウザ拡張機能、デスクトップやモバイルアプリ、またはイーサリアム上のスマートコントラクトとして存在します。 個別ユーザーのキー管理に関連するリスクを軽減するソーシャルリカバリウォレットに関する研究が活発に行われています。 ウォレットの開発に関連して、アカウント抽象化の代替形式に関する研究も進行中で、これは新興の重要な研究分野です。

#### バックグラウンドリーディング {#background-reading-7}

- [ウォレットの概要](/wallets/)
- [ウォレットセキュリティの概要](/security/)
- [ethresear.ch セキュリティ](https://ethresear.ch/tag/security)
- [EIP-2938 アカウント抽象化](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 アカウント抽象化](https://eips.ethereum.org/EIPS/eip-4337)

#### 最近の研究 {#recent-research-7}

- [検証に焦点を当てたスマートコントラクトウォレット](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [アカウントの未来](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH および AUTHCALL オペコード](https://eips.ethereum.org/EIPS/eip-3074)
- [EOA アドレスでのコード公開](https://eips.ethereum.org/EIPS/eip-5003)

## コミュニティ、教育、アウトリーチ {#community-education-and-outreach}

新しいユーザーをイーサリアムにオンボーディングするためには、新しい教育リソースやアウトリーチのアプローチが必要です。 これには、ブログや記事、書籍、ポッドキャスト、ミーム、教育リソース、イベント、そしてコミュニティを構築し、新規参入者を歓迎し、イーサリアムについて人々を教育するその他のものが含まれるかもしれません。

### UX/UI {#uxui}

イーサリアムにより多くの人々を受け入れるために、エコシステムはUX/UIを改善する必要があります。 これには、デザイナーや製品の専門家がウォレットやアプリのデザインを再検討することが必要になります。

#### バックグラウンドリーディング {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### 最近の研究 {#recent-research-8}

- [Web3デザイン Discord](https://discord.gg/FsCFPMTSm9)
- [Web3デザイン原則](https://www.web3designprinciples.com/)
- [イーサリアムマジシャンズ UXディスカッション](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### 経済学 {#economics}

イーサリアムにおける経済学研究は、主に2つのアプローチに分かれます：経済的インセンティブに依存するメカニズムのセキュリティを検証する(ミクロ経済学) ことと、プロトコル、アプリケーション、ユーザー間の価値の流れを分析する (マクロ経済学) ことです。 イーサリアムのネイティブアセット (Ether) や、その上に構築されたトークン (例えばNFTやERC20トークン) に関連する複雑な暗号経済学的要因が存在します。

#### バックグラウンドリーディング {#background-reading-9}

- [ロバストインセンティブグループ](https://ethereum.github.io/rig/)
- [DevconnectでのETHconomicsワークショップ at Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### 最近の研究 {#recent-research-9}

- [EIP1559の実証分析](https://arxiv.org/abs/2201.05574)
- [流通供給の均衡](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [MEVの定量化：森はどれくらい暗いのか？](https://arxiv.org/abs/2101.05511)

### ブロックスペースと手数料市場 {#blockspace-fee-markets}

ブロックスペース市場は、イーサリアム (レイヤー1) 上で直接、あるいはブリッジされたネットワーク、たとえばロールアップ(レイヤー2) 上で、エンドユーザーのトランザクションの取り込みを管理します。 イーサリアムでは、トランザクションはEIP-1559としてプロトコル内にデプロイされた手数料市場に提出され、チェーンをスパムから保護し、混雑時の価格設定を行います。 両レイヤーにおいて、トランザクションは最大抽出可能価値 (MEV) として知られる外部性を生み出す可能性があり、これらの外部性を捕捉または管理するための新しい市場構造を誘発します。

#### バックグラウンドリーディング {#background-reading-10}

- [イーサリアムブロックチェーンのトランザクション手数料メカニズム設計：EIP-1559の経済分析 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559のシミュレーション(ロバストインセンティブグループ)](https://ethereum.github.io/abm1559)
- [ファーストプリンシプルからのロールアップ経済学](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [フラッシュボーイズ2.0：分散型取引所におけるフロントランニング、トランザクションの並べ替え、およびコンセンサスの不安定性](https://arxiv.org/abs/1904.05234)

#### 最近の研究 {#recent-research-10}

- [多次元EIP-1559のビデオプレゼンテーション](https://youtu.be/QbR4MTgnCko)
- [クロスドメインMEV](http://arxiv.org/abs/2112.01472)
- [MEVオークション](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### プルーフ・オブ・ステークのインセンティブ {#proof-of-stake-incentives}

バリデータはイーサリアムのネイティブ資産 (Ether) を担保として、不正行為を防ぎます。 これのクリプトエコノミクスがネットワークのセキュリティを決定します。 巧妙なバリデータは、インセンティブレイヤーのニュアンスを活用して、明示的な攻撃を仕掛ける可能性があります。

#### バックグラウンドリーディング {#background-reading-11}

- [イーサリアム経済学のマスタークラスと経済モデル](https://github.com/CADLabs/ethereum-economic-model)
- [PoSインセンティブのシミュレーション(ロバストインセンティブグループ)](https://ethereum.github.io/beaconrunner/)

#### 最近の研究 {#recent-research-11}

- [プロポーザー/ビルダー分離（PBS）下でのトランザクションの検閲耐性の向上(PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [PoSイーサリアムに対する3つの攻撃](https://arxiv.org/abs/2110.10086)

### リキッドステーキングとデリバティブ {#liquid-staking-and-derivatives}

リキッドステーキングにより、32 ETH未満のユーザーでも、ステーキングされたEtherを表すDeFiとして使用可能なトークンとEtherを交換することで、ステーキング収益を受け取ることができます。 しかし、リキッドステーキングに関連するインセンティブと市場力学はまだ解明されておらず、イーサリアムのセキュリティへの影響 (例：中央集権化のリスク) も同様です。

#### バックグラウンドリーディング {#background-reading-12}

- [Ethresear.chのリキッドステーキング](https://ethresear.ch/search?q=liquid%20staking)
- [Lido：トラストレスなイーサリアムステーキングへの道](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool：ステーキングプロトコル入門](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### 最近の研究 {#recent-research-12}

- [Lidoからの引き出し処理](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [引き出しのための資格情報](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [リキッドステーキング・デリバティブのリスク](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## テスト {#testing}

### 形式的検証 {#formal-verification}

形式的検証とは、イーサリアムのコンセンサス仕様が正しく、バグがないことを確認するためのコードを書くことです。 仕様をPythonコードとして実装したものがあり、これを保守し、発展させていく必要があります。 さらに研究を進めることで、仕様のPython実装を改善し、正確性をより堅牢に検証し、問題を特定するためのツールを追加することが可能になるでしょう。

#### バックグラウンドリーディング {#background-reading-13}

- [形式的検証入門](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [形式的検証 (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### 最近の研究 {#recent-research-13}

- [デポジットコントラクトの形式的検証](https://github.com/runtimeverification/deposit-contract-verification)
- [ビーコンチェーン仕様の形式的検証](https://github.com/runtimeverification/deposit-contract-verification)的

## データサイエンスとアナリティクス {#data-science-and-analytics}

イーサリアム上のアクティビティやネットワークの健全性について詳細な情報を提供するデータ分析ツールやダッシュボードが、さらに必要とされています。

### バックグラウンドリーディング {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [クライアント多様性ダッシュボード](https://clientdiversity.org/)

#### 最近の研究 {#recent-research-14}

- [ロバストインセンティブグループのデータ分析](https://ethereum.github.io/rig/)

## アプリケーションとツール {#apps-and-tooling}

アプリケーションレイヤーは、イーサリアムのベースレイヤー上でトランザクションを決済する多様なプログラムのエコシステムをサポートしています。 開発チームは、重要なWeb2アプリケーションについて、組み合わせ可能で、パーミッションレスで、検閲耐性のあるバージョンをイーサリアムを活用して作成したり、完全に新しいWeb3ネイティブのコンセプトを生み出したりするための新しい方法を常に見出しています。 それと同時に、イーサリアム上でdappsを構築する際の複雑さを軽減する新しいツールも開発されています。

### DeFi {#defi}

分散型金融 (DeFi) は、イーサリアム上に構築された主要なアプリケーションクラスの1つです。 DeFiは、ユーザーがスマートコントラクトを利用して暗号資産を保管、送金、貸付、借入、投資できるようにする、構成可能な「マネーレゴ」を作成することを目指しています。 DeFiは急速に進化する領域であり、常に更新が行われています。 安全で効率的かつアクセスしやすいプロトコルに関する研究が継続的に求められています。

#### バックグラウンドリーディング {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: What is DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### 最近の研究 {#recent-research-15}

- [分散型金融、中央集権的な所有権？](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: 1ドル未満の取引への道](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

イーサリアムの影響力のあるユースケースの1つとして、DAO（分散型自律組織）を利用して、分散型で組織を運営できる点が挙げられます。 現在、より優れたガバナンス形態の実現に向けて、信頼の必要性を最小限に抑えた調整ツールとしてのイーサリアム上のDAOを、いかに開発して活用できるかという点について、多くの活発な研究が行われています。これにより、従来の企業や組織を超えた幅広い選択肢が提供されることになります。

#### バックグラウンドリーディング {#background-reading-16}

- [DAOの紹介](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### 最近の研究 {#recent-research-16}

- [DAOエコシステムのマッピング](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### デベロッパー向けツール {#developer-tools}

イーサリアムデベロッパー向けのツールは急速に改善されています。 この分野全般において、多くの活発な研究開発が行われています。

#### バックグラウンドリーディング {#background-reading-17}

- [プログラミング言語別ツール](/developers/docs/programming-languages/)
- [開発者向けフレームワーク](/developers/docs/frameworks/)
- [コンセンサスデベロッパー向けツールリスト](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [トークン規格](/developers/docs/standards/tokens/)
- [CryptoDevHub: EVMツール](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### 最近の研究 {#recent-research-17}

- [Eth R&D Discord Consensus Toolingチャンネル](https://discordapp.com/channels/595666850260713488/746343380900118528)

### オラクル {#oracles}

オラクルは、パーミッションレスで分散化された方法でオフチェーンデータをブロックチェーンにインポートします。 このデータをオンチェーンに取り込むことで、dappsは現実世界の資産価格の変動、オフチェーンアプリのイベント、さらには天候の変化などの現実世界の現象に反応できるようになります。

#### バックグラウンドリーディング {#background-reading-18}

- [オラクル入門](/developers/docs/oracles/)

#### 最近の研究 {#recent-research-18}

- [ブロックチェーンオラクルの調査](https://arxiv.org/pdf/2004.07140.pdf)
- [Chainlinkホワイトペーパー](https://chain.link/whitepaper)

### アプリのセキュリティ {#app-security}

イーサリアムでのハッキングは、通常プロトコル自体ではなく個々のアプリケーションの脆弱性を悪用します。 ハッカーとアプリデベロッパーは、新たな攻撃と防御を開発するために絶え間ない競争を繰り広げています。 このため、アプリケーションをハッキングから守るためには、常に重要な研究と開発が求められます。

#### バックグラウンドリーディング {#background-reading-19}

- [Wormholeの脆弱性報告書](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [イーサリアムコントラクトのハッキング事後分析リスト](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://twitter.com/RektHQ?s=20\&t=3otjYQdM9Bqk8k3n1a1Adg)

#### 最近の研究 {#recent-research-19}

- [ethresear.chのアプリケーション](https://ethresear.ch/c/applications/18)

### テクノロジースタック {#technology-stack}

イーサリアムの技術スタック全体を分散化することは、重要な研究分野です。 現在、イーサリアム上のdappsは、中央集権的なツールやインフラに依存しているため、一部の中央集権的な点を持っていることがよくあります。

#### バックグラウンドリーディング {#background-reading-20}

- [イーサリアムスタック](/developers/docs/ethereum-stack/)
- [Coinbase: Web3スタック入門](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [スマートコントラクト入門](/developers/docs/smart-contracts/)
- [分散型ストレージ入門](/developers/docs/storage/)

#### 最近の研究 {#recent-research-20}

- [スマートコントラクトの構成可能性](/developers/docs/smart-contracts/composability/)
