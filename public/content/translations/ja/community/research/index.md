---
title: "イーサリアム研究の活発な分野"
description: "オープンな研究のさまざまな分野を探索し、参加する方法を学びましょう。"
lang: ja
---

イーサリアムの主な強みの1つは、活発な研究およびエンジニアリングコミュニティが常にそれを改善していることです。世界中の多くの熱心で熟練した人々がイーサリアムの未解決の問題に取り組みたいと考えていますが、それらの問題が何であるかを見つけるのは必ずしも容易ではありません。このページでは、イーサリアムの最先端への大まかなガイドとして、主要な活発な研究分野の概要を説明します。

## イーサリアムの研究はどのように行われるか {#how-ethereum-research-works}

イーサリアムの研究はオープンで透明性があります。その文化は、例えば実行可能なノートブックなどを通じて、研究ツールや成果物を可能な限りオープンでインタラクティブなものにすることです。イーサリアムの研究は急速に進んでおり、新しい発見は、査読を重ねた後に伝統的な出版物を通じてコミュニティに届くのではなく、[ethresear.ch](https://ethresear.ch/)のようなフォーラムで公開され、議論されます。イーサリアム財団はまた、何を優先しているか、そしてその理由を公開しているため、現在どの問題が緊急であると考えられているかを誰でも確認できます。

## 一般的な研究リソース {#general-research-resources}

特定のトピックに関係なく、イーサリアムの研究に関する豊富な情報は、[ethresear.ch](https://ethresear.ch)および[Eth R&Dディスコード・チャンネル](https://discord.gg/qGpsxSA)で見つけることができます。これらは、イーサリアムの研究者が最新のアイデアや開発の機会について議論する主要な場所です。

プロトコルがどこに向かっているかの概要については、まず[イーサリアムのロードマップ](/roadmap/)から始め、次にイーサリアム財団の[2026年に向けたプロトコルの優先事項の更新](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)と、それに対する進捗を報告する[プロトコル・クラスターの更新](https://blog.ethereum.org/2026/05/11/protocol-update-may-26)を読んでください。[Ethereum Protocol Studies](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26)は、プロトコル自体に取り組みたい人向けの構造化されたエントリーポイントです。

## 資金源 {#sources-of-funding}

イーサリアムの研究に参加し、その対価を得ることができます。[イーサリアム財団](/foundation/)は、[エコシステム・サポート・プログラム](https://esp.ethereum.foundation/applicants)を通じて研究や公共財に資金を提供しており、解決してほしい問題を説明するウィッシュリストの項目や提案の募集を掲載しています。現在および今後の資金提供の機会に関する情報は、[イーサリアムの助成金ページ](/community/grants/)で見つけることができます。

## プロトコル研究 {#protocol-research}

プロトコル研究は、イーサリアムのベースレイヤーに関係しています。これは、ノードがどのように接続し、通信し、イーサリアムのデータを交換および保存し、ブロックチェーンの状態についてコンセンサスに達するかを定義する一連のルールです。その長年にわたる2つのカテゴリーはコンセンサスと実行であり、現在ではいくつかの研究トピックが両方にまたがっています。

### コンセンサス {#consensus}

コンセンサス研究は、[イーサリアムのプルーフ・オブ・ステーク (PoS) メカニズム](/developers/docs/consensus-mechanisms/pos/)に関係しています。フォーク選択ルールとファイナリティ・ガジェットのセキュリティ、ステーキングのクリプトエコノミクス、ブロック、アテステーション、ブロブ・データを運ぶピア・ツー・ピア・ネットワーク、そしてバリデータが署名する暗号技術などです。コンセンサス研究のトピックの例は以下の通りです。

- 脆弱性の特定とパッチ適用
- クリプトエコノミクスのセキュリティの定量化
- ブロックがファイナリティに達するまでの時間の短縮
- コンセンサス・クライアント間のピア・ツー・ピア・ネットワーキングの効率、安全性、監視の改善

この作業の多くは、論文から仕様へと移行しています。データ可用性サンプリングは[フサカ](/roadmap/fusaka/)アップグレードで導入され、ブロックの構築方法やトランザクションの包含が保証される方法の変更は今後のアップグレードのために仕様化されており、リーン・コンセンサスとして知られる長期的な再設計では、ポスト量子署名とともに、より高速なファイナリティが探求されています。

#### 背景知識のリーディング {#background-reading}

- [プルーフ・オブ・ステークの紹介](/developers/docs/consensus-mechanisms/pos/)
- [シングル・スロット・ファイナリティ](/roadmap/single-slot-finality/)
- [キャスパー・FFGの論文](https://arxiv.org/abs/1710.09437)
- [Gasperの論文](https://arxiv.org/abs/2003.03052)
- [リーン・イーサリアム](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### 最近の研究 {#recent-research}

- [Ethresear.ch コンセンサス](https://ethresear.ch/c/consensus/29)
- [可用性/ファイナリティのジレンマ](https://arxiv.org/abs/2009.04987)
- [3スロット・ファイナリティ: SSFは「シングル」スロットに関するものではない](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### 実行 {#execution}

実行レイヤーは、トランザクションの実行、[イーサリアム仮想マシン (EVM)](/developers/docs/evm/)の実行、およびコンセンサス・レイヤーに渡す実行ペイロードの生成に関係しています。ここでの研究は2つの流れに分かれています。状態の保持と証明を安価にすること、そしてノードを実行する人々により多くのコストを押し付けることなくスループットを向上させることです。以下を含む多くの活発な研究分野があります。

- 状態を作成する操作のガス・コストの再価格設定
- ノードが提供する必要がなくなった履歴の失効
- トランザクションを並行して検証できるようにするブロックレベルのアクセスリスト
- 状態、データ、計算を個別に価格設定する多次元手数料市場
- zkEVMを使用したL1ブロックの実行の証明

#### 背景知識のリーディング {#background-reading-1}

- [EVMの紹介](/developers/docs/evm/)
- [Ethresear.ch 実行レイヤー](https://ethresear.ch/c/execution-layer-research/37)
- [イーサリアム実行レイヤー仕様](https://github.com/ethereum/execution-specs)
- [データベースの最適化](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### 最近の研究 {#recent-research-1}

- [EIP-7928: ブロックレベルのアクセスリスト](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: 状態作成のガス・コスト増加](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: 統合された多次元手数料市場](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69、履歴の失効、およびよりシンプルなレシート](https://eips.ethereum.org/EIPS/eip-7642)
- [L1 zkEVMの出荷: リアルタイム証明](https://blog.ethereum.org/2025/07/10/realtime-proving)

### 検閲耐性とブロック構築 {#censorship-resistance-and-block-building}

現在、ほとんどのイーサリアムのブロックは少数の専門的なビルダーによって組み立てられており、どのトランザクションを含めるかを決定する権限が集中しています。この分野の研究は、ビルダー市場をプロトコル自体に組み込むことをカバーしています。これにより、ブロックを提案する役割と構築する役割が、プロトコル外のソフトウェアではなくコンセンサス・ルールによって分離され、ビルダーが除外したトランザクションの包含をバリデータが強制する方法を提供します。

#### 背景知識のリーディング {#background-reading-21}

- [プロポーザー・ビルダー分離 (PBS)](/roadmap/pbs/)
- [単一の秘密リーダー選出 (SSLE)](/roadmap/secret-leader-election/)

#### 最近の研究 {#recent-research-21}

- [EIP-7732: プロトコルに組み込まれたプロポーザー・ビルダー分離](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: フォーク選択によって強制されるインクルージョン・リスト](https://eips.ethereum.org/EIPS/eip-7805)
- [プロポーザー・ビルダー分離下でのトランザクションの検閲耐性の向上](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### 状態の増大とステートレス性 {#state-growth-and-statelessness}

すべてのフル・ノードはイーサリアムの状態を保存するため、その状態が増大する速度が、ノードを実行するコストの下限を設定します。短期的には、研究は状態を作成する操作の再価格設定と、ノードが保持する必要がなくなった履歴の失効に焦点を当てています。長期的には、イーサリアムの16進マークル・パトリシア・トライを、はるかに小さな証明を生成するバイナリ・ツリーに置き換え、ステートレス性に向けて移行する計画です。これにより、ノードは状態全体を保持することなくブロックを検証できるようになります。この分野の初期の作業ではヴァークル・ツリーが想定されていましたが、現在の提案は統合されたバイナリ・ツリーであり、初期の作業で指定されたウィットネスのガス・スケジュールを引き継いでいます。

#### 背景知識のリーディング {#background-reading-22}

- [ステートレス性とステート失効](/roadmap/statelessness/)
- [イーサリアム・ステートレス・ブック](https://stateless.fyi/)

#### 最近の研究 {#recent-research-22}

- [EIP-7864: 統合されたバイナリ・ツリーを使用したイーサリアムの状態](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: ステートレス性のガス・コスト変更](https://eips.ethereum.org/EIPS/eip-4762)
- [分散型の状態がイーサリアムにとって重要である理由](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### ポスト量子暗号 {#post-quantum-cryptography}

イーサリアムのバリデータの署名とアプリケーション・レイヤーの多くは楕円曲線暗号に依存しており、十分な能力を持つ量子コンピュータであればこれを破ることができます。イーサリアムを量子耐性にするということは、それらの署名をハッシュベースまたは格子ベースの代替手段に置き換え、大規模なバリデータ・セットに対して署名集約を十分に効率的に保ち、既存のアカウントに移行パスを提供することを意味します。イーサリアム財団は専用のポスト量子チームを運営しており、これはロードマップ上で最も長期的なプログラムの1つです。

#### 背景知識のリーディング {#background-reading-23}

- [量子耐性](/roadmap/security/quantum-resistance/)
- [ポスト量子イーサリアム](https://pq.ethereum.org/)

#### 最近の研究 {#recent-research-23}

- [リーン・イーサリアム](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Ethresear.ch 暗号技術](https://ethresear.ch/c/cryptography/28)
- [リーン・イーサリアムの実装](https://github.com/leanEthereum)

## クライアント開発 {#client-development}

イーサリアム・クライアントは、イーサリアム・プロトコルの実装です。クライアント開発は、プロトコル研究の成果をこれらのクライアントに組み込むことで現実のものにします。クライアント開発には、クライアント仕様の更新と特定の実装の構築が含まれます。

イーサリアム・ノードは、2つのソフトウェアを実行する必要があります。

1. ブロックチェーンの先頭を追跡し、ブロックをゴシップし、コンセンサス・ロジックを処理するコンセンサス・クライアント
2. イーサリアム仮想マシンをサポートし、トランザクションとスマート・コントラクトを実行する実行クライアント

これら2つに加えて、L1ブロックの実行を証明するクライアントや、ポスト量子署名を中心に構築されたリーン・コンセンサス・クライアントなど、新しいクラスのクライアントのプロトタイプが作成されています。

ノードとクライアントの詳細、および現在のすべてのクライアント実装のリストについては、[ノードとクライアントのページ](/developers/docs/nodes-and-clients/)を参照してください。また、[歴史のページ](/ethereum-forks/)でイーサリアムのすべてのアップグレードの歴史を見つけることもできます。

### 実行クライアント {#execution-clients}

- [実行クライアント仕様](https://github.com/ethereum/execution-specs)
- [実行API仕様](https://github.com/ethereum/execution-apis)

### コンセンサス・クライアント {#consensus-clients}

- [コンセンサス・クライアント仕様](https://github.com/ethereum/consensus-specs)
- [ビーコンAPI仕様](https://ethereum.github.io/beacon-APIs/)

### zkEVMクライアント {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [L1 zkEVMの出荷: セキュリティの基盤](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## スケーリングとパフォーマンス {#scaling-and-performance}

イーサリアムのスケーリングは、イーサリアムの研究者にとって大きな焦点となる分野であり、レイヤー1自体のスループットを向上させることと、データをイーサリアムに投稿するロールアップに実行を移行することの2つの軌道で同時に進行しています。現在の作業には、ブロックのガス・リミットの引き上げ、状態の増大の再価格設定、ロールアップ・データのためのブロブ容量の拡大、およびノードが保存および検証しなければならないものの削減が含まれます。イーサリアムのスケーリングに関する入門情報は、[スケーリングのページ](/developers/docs/scaling/)および[スケーリングのロードマップ](/roadmap/scaling/)で入手できます。

### レイヤー2 (L2) {#layer-2}

現在、トランザクションをバッチ処理し、イーサリアムのレイヤー1でそれらを保護するためのさまざまな技術を使用してイーサリアムをスケーリングする、いくつかのレイヤー2 (L2) プロトコルがあります。オープンな研究には、証明のレイテンシとコストの削減、トランザクションがトラストレスなファイナリティに達するまでの時間の短縮、および多くのロールアップにわたってユーザーに単一の一貫した体験を提供することが含まれます。

#### 背景知識のリーディング {#background-reading-2}

- [レイヤー2 (L2) の紹介](/layer-2/)
- [L2BEAT: スケーリングの概要](https://l2beat.com/scaling/summary)
- [ロールアップ中心のイーサリアム・ロードマップ](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### 最近の研究 {#recent-research-2}

- [Ethresear.ch レイヤー2 (L2)](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: オンチェーン・コスト](https://l2beat.com/scaling/costs)
- [2026年のイーサリアムでの構築: 何が変わったか](/latest/building-on-ethereum-in-2026/)

### インターオペラビリティ {#interoperability}

ユーザーと資産はイーサリアムのレイヤー1と多くのレイヤー2 (L2) に分散しており、研究の課題は、仲介者を信頼することなく、それらのチェーン間で移動および行動できるようにすることです。ここでの作業は、インテントベースの送金、標準化されたクロスチェーンのアドレス指定とネーミング、一般的なメッセージ・パッシング、およびウォレット・レベルでのチェーン抽象化をカバーしています。これは、カストディアル・ブリッジが資産を保持していたモデルに代わるものであり、ブリッジは歴史的にエコシステムにおける最大の損失源の1つであったため、クロスチェーン・メカニズムのセキュリティは依然として中心的な懸念事項です。

#### 背景知識のリーディング {#background-reading-3}

- [ブロックチェーン・ブリッジの紹介](/bridges/)
- [イーサリアムを再び1つのチェーンのように感じさせる](https://blog.ethereum.org/2025/11/18/eil)
- [オープン・インテント・フレームワーク](https://openintents.xyz/)
- [ブリッジの検証](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### 最近の研究 {#recent-research-3}

- [ERC-7683: クロスチェーン・インテント](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: 相互運用可能なアドレス](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: 相互運用可能な名前](https://eips.ethereum.org/EIPS/eip-7828)

### データ可用性とブロブのスケーリング {#data-availability-and-blob-scaling}

ロールアップはデータをブロブとしてイーサリアムに投稿し、そのデータ・レイヤーのスケーリングは、実行のスケーリングとは別の、それ自体が研究課題です。イーサリアムは現在、データ可用性サンプリングを使用しているため、バリデータはブロブ・データをすべてダウンロードするのではなく、その一部をサンプリングすることで公開されたことを検証でき、ブロブ容量は専用のブロブ・パラメータのみのフォークを通じて段階的に引き上げられます。未解決の疑問には、サンプリングをどこまで推し進めることができるか、自宅でステーキングしている人々のために帯域幅の要件をどのように管理可能な状態に保つか、そしてブロブの価格設定が需要にどのように対応すべきかなどが含まれます。

#### 背景知識のリーディング {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [フサカ・アップグレード](/roadmap/fusaka/)
- [ダンクシャーディング](/roadmap/danksharding/)
- [データ可用性](/developers/docs/data-availability/)
- [EIP-4844: シャード・ブロブ・トランザクション](https://eips.ethereum.org/EIPS/eip-4844)
- [プロト・ダンクシャーディングのノート](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### 最近の研究 {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: ブロブ・パラメータのみのハードフォーク](https://eips.ethereum.org/EIPS/eip-7892)
- [Ethresear.ch シャーディング](https://ethresear.ch/c/sharding/6)

### ハードウェア {#hardware}

適度なハードウェアで[ノードを実行する](/developers/docs/nodes-and-clients/run-a-node/)ことは、イーサリアムを分散型に保つための基本であるため、スループットの向上はすべて、ノード・オペレーターにかかるコストと比較検討する必要があります。ブロックのガス・リミットが上昇し、さらなる増加が計画されている中、活発な研究は、状態の増大とその価格設定方法、より大きな状態での同期とデータベースのパフォーマンス、履歴の失効から得られるディスクの節約、そして最終的にはステートレス性をカバーしています。

#### 背景知識のリーディング {#background-reading-5}

- [独自のイーサリアム・ノードを立ち上げる](/developers/docs/nodes-and-clients/run-a-node/)
- [ステートレス性とステート失効](/roadmap/statelessness/)
- [ARM上のイーサリアム](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### 最近の研究 {#recent-research-5}

- [イーサリアムのスケーリング: より高いガス・リミットとその先への道](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: ガス・リミットのスケジュール](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: 状態作成のガス・コスト増加](https://eips.ethereum.org/EIPS/eip-8037)

## セキュリティ {#security}

セキュリティは幅広いトピックであり、スパムや詐欺の防止、ウォレットのセキュリティ、ハードウェアのセキュリティ、クリプトエコノミクスのセキュリティ、検閲耐性、ポスト量子への準備、バグ・ハンティング、アプリケーションやクライアント・ソフトウェアのテストと検証などが含まれる場合があります。イーサリアムの[セキュリティ・ロードマップ](/roadmap/security/)は、プロトコル・レベルの作業をカバーしています。

### 暗号技術とZKP {#cryptography--zkp}

ゼロ知識証明 (ZKP) と暗号技術は、イーサリアムとそのアプリケーションにプライバシーとセキュリティを組み込むために不可欠です。ゼロ知識証明は研究から本番インフラへと移行しました。実際のイーサリアムのブロックを証明するプルーバーは、現在、レイテンシ、コスト、健全性について公開でベンチマークされています。未解決の問題もそれに応じて変化しており、L1ブロックをリアルタイムで実行できるほど高速に証明すること、使用中の証明システムのセキュリティを厳密に説明すること、そしてポスト量子暗号に備えることへと向かっています。

#### 背景知識のリーディング {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [プライバシー](/roadmap/privacy/)
- [Zero Knowledge ポッドキャスト](https://zeroknowledge.fm/)

#### 最近の研究 {#recent-research-6}

- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Ethresear.ch 暗号技術](https://ethresear.ch/c/cryptography/28)
- [ハッシュベースのzkEVM証明システムのための健全性計算機](https://github.com/ethereum/soundcalc)
- [L1 zkEVMの出荷: セキュリティの基盤](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### ウォレット {#wallets}

イーサリアムのウォレットは、ブラウザ拡張機能、デスクトップおよびモバイル・アプリ、またはイーサリアム上のスマート・コントラクトにすることができます。アカウント抽象化はもはや実験的なものではありません。ERC-4337はプロトコルの変更なしにスマート・アカウントを提供し、EIP-7702は通常のアカウントにコードを設定できるようにすることで、トランザクションのバッチ処理、ガスのスポンサーシップ、ソーシャル・リカバリーが、ユーザーがすでに持っているアドレスで機能するようにします。現在のオープンな研究は、プロトコル自体におけるネイティブなアカウント抽象化、モジュール式で監査可能なアカウント・アーキテクチャ、そして一般の人々が安全に操作できる鍵管理とリカバリーに集中しています。

#### 背景知識のリーディング {#background-reading-7}

- [ウォレットの紹介](/wallets/)
- [ウォレット・セキュリティの紹介](/security/)
- [アカウント抽象化](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Ethresear.ch セキュリティ](https://ethresear.ch/c/security/25)

#### 最近の研究 {#recent-research-7}

- [EIP-8141: フレーム・トランザクション](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: ウォレット呼び出しAPI](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: 複数のインジェクトされたプロバイダーのディスカバリー](https://eips.ethereum.org/EIPS/eip-6963)
- [検証に焦点を当てたスマート・コントラクト・ウォレット](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## コミュニティ、教育、アウトリーチ {#community-education-and-outreach}

新しいユーザーをイーサリアムにオンボーディングするには、新しい教育リソースとアウトリーチへのアプローチが必要です。これには、ブログ記事や記事、書籍、ポッドキャスト、ミーム、教育リソース、イベントなど、コミュニティを構築し、初心者を歓迎し、イーサリアムについて人々を教育するあらゆるものが含まれる可能性があります。

### デザインとUX {#design-and-ux}

より多くの人々をイーサリアムにオンボーディングするために、エコシステムはそのデザインとユーザー・エクスペリエンスを改善しなければなりません。これには、デザイナーや製品の専門家がウォレットやアプリの仕組みを再検討する必要があり、バッチ化されたウォレット呼び出し、ガスのスポンサーシップ、リカバリー可能なアカウント、属するチェーンを伝える人間が読めるアドレスなど、すでに存在する標準に対してデザインすることを意味することが増えています。Web3のUX研究のための標準的な場所は比較的少ないため、公開された研究やデザインのガイダンスは散在する傾向があります。

#### 背景知識のリーディング {#background-reading-8}

- [Web3におけるデザインとUX](/developers/docs/design-and-ux/)
- [イーサリアムのユーザー・エクスペリエンス・ロードマップ](/roadmap/user-experience/)
- [Web3デザイン・プレイブック](https://learnweb3.design/)
- [Web3 UXデザイン・ハンドブック](https://web3ux.design/)

#### 最近の研究 {#recent-research-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: ウォレット呼び出しAPI](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: 相互運用可能な名前](https://eips.ethereum.org/EIPS/eip-7828)

### 経済学 {#economics}

イーサリアムにおける経済学の研究は、大きく2つのアプローチに従います。経済的インセンティブに依存するメカニズムのセキュリティを検証すること（「ミクロ経済学」）と、プロトコル、アプリケーション、ユーザー間の価値の流れを分析すること（「マクロ経済学」）です。イーサリアムのネイティブ資産（イーサ）と、その上に構築されたトークン（例えばNFTやERC-20トークン）に関連する複雑なクリプトエコノミクスの要因があります。

#### 背景知識のリーディング {#background-reading-9}

- [ロバスト・インセンティブ・グループ](https://rig.ethereum.org/)
- [イーサリアム経済学マスタークラスと経済モデル](https://github.com/CADLabs/ethereum-economic-model)

#### 最近の研究 {#recent-research-9}

- [Ethresear.ch 経済学](https://ethresear.ch/c/economics/16)
- [循環供給の均衡](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [MEVの定量化: 森はどれほど暗いのか？](https://arxiv.org/abs/2101.05511)

### ブロックスペースと手数料市場 {#blockspace-fee-markets}

ブロックスペース市場は、イーサリアム（レイヤー1）上で直接、またはロールアップ（レイヤー2 (L2)）などのブリッジされたネットワーク上で、エンドユーザーのトランザクションの包含を管理します。イーサリアムでは、トランザクションはEIP-1559としてプロトコル内にデプロイされた手数料市場に送信され、チェーンをスパムから保護し、混雑を価格設定します。両方のレイヤーで、トランザクションは最大抽出可能価値 (MEV) として知られる外部性を生み出す可能性があり、これがこれらの外部性を捕捉または管理するための新しい市場構造を誘発します。現在の作業は、状態、データ、計算が独立して混雑するため、複数のリソースを一度に価格設定すること、そして誰がどのような条件でブロックを組み立てるかを変更することにまで及んでいます。

#### 背景知識のリーディング {#background-reading-10}

- [イーサリアム・ブロックチェーンのトランザクション手数料メカニズムの設計: EIP-1559の経済分析 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559のシミュレーション (ロバスト・インセンティブ・グループ)](https://ethereum.github.io/abm1559)
- [第一原理からのロールアップ経済学](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: 分散型取引所におけるフロントランニング、トランザクションの並べ替え、およびコンセンサスの不安定性](https://arxiv.org/abs/1904.05234)

#### 最近の研究 {#recent-research-10}

- [EIP-7999: 統合された多次元手数料市場](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: ブロックレベルのアクセスリスト](https://eips.ethereum.org/EIPS/eip-7928)
- [クロスドメインMEV](https://arxiv.org/abs/2112.01472)

### プルーフ・オブ・ステークのインセンティブ {#proof-of-stake-incentives}

バリデータは、不正行為に対する担保としてイーサリアムのネイティブ資産（イーサ）を使用します。このクリプトエコノミクスがネットワークのセキュリティを決定します。洗練されたバリデータは、インセンティブ・レイヤーのニュアンスを悪用して明示的な攻撃を仕掛けることができるかもしれません。ペクトラ・アップグレード以降、バリデータははるかに大きなエフェクティブ・バランスを保持して収益を得ることができ、複数のバリデータを1つに統合することもできるため、バリデータを実行する経済性が変化します。

#### 背景知識のリーディング {#background-reading-11}

- [最大エフェクティブ・バランス](/roadmap/pectra/maxeb/)
- [イーサリアム経済学マスタークラスと経済モデル](https://github.com/CADLabs/ethereum-economic-model)
- [PoSインセンティブのシミュレーション (ロバスト・インセンティブ・グループ)](https://ethereum.github.io/beaconrunner/)

#### 最近の研究 {#recent-research-11}

- [ロバスト・インセンティブ・グループ](https://rig.ethereum.org/)
- [PoSイーサリアムに対する3つの攻撃](https://arxiv.org/abs/2110.10086)

### リキッド・ステーキングとデリバティブ {#liquid-staking-and-derivatives}

リキッド・ステーキングにより、32 ETH未満のユーザーは、イーサをDeFiで使用できるステークされたイーサを表すトークンと交換することで、ステーキング利回りを受け取ることができます。しかし、リキッド・ステーキングに関連するインセンティブと市場のダイナミクス、およびイーサリアムのセキュリティへの影響（例えば、中央集権化のリスク）は、まだ解明されつつある段階です。

#### 背景知識のリーディング {#background-reading-12}

- [Ethresear.ch リキッド・ステーキング](https://ethresear.ch/search?q=liquid%20staking)
- [リド: トラストレスなイーサリアム・ステーキングへの道](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### 最近の研究 {#recent-research-12}

- [リキッド・ステーキング・デリバティブのリスク](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [リドからの引き出しの処理](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## テスト {#testing}

### クライアントとネットワークのテスト {#client-and-network-testing}

イーサリアムの仕様は実行可能であり、そこから生成されたテスト・フィクスチャは、クライアント・チームが実装をチェックするためのものです。これらと並行して、共有テスト・ハーネスはクライアント同士を対抗させたり、意図的に敵対的なネットワーク条件に対して実行したりし、パブリック・テストネットはメインネットに到達する前にアップグレードをテストします。このインフラストラクチャを改善することは、バグがユーザーに届く前に発見される方法であるため、利用可能な最もレバレッジの高い作業の1つです。

#### 背景知識のリーディング {#background-reading-24}

- [イーサリアム実行レイヤー仕様](https://github.com/ethereum/execution-specs)
- [コンセンサス・クライアント仕様](https://github.com/ethereum/consensus-specs)

#### 最近の研究 {#recent-research-24}

- [hive、エンドツーエンドのクライアント・テスト・ハーネス](https://github.com/ethereum/hive)
- [Assertoor、テストネット・テスト・ツール](https://github.com/ethpandaops/assertoor)

### 形式的検証 {#formal-verification}

形式的検証は、機械でチェックされた数学的証明を使用して、仕様または実装が意図したとおりに動作することを確立します。イーサリアムでは、これはEVMの実装が形式的意味論と一致することの証明、ゼロ知識プルーバーが依存する回路と証明システムの健全性の証明、およびそれらの下にある暗号プリミティブの検証をカバーしています。さらなる研究により、これらの証明を強化し、スタックのより多くの部分に拡張することができます。

#### 背景知識のリーディング {#background-reading-13}

- [検証済みのzkEVM](https://verified-zkevm.org/)
- [形式的検証 (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### 最近の研究 {#recent-research-13}

- [検証済みzkEVMプロジェクトの概要](https://github.com/Verified-zkEVM/Overview)
- [KEVM: KにおけるEVMの意味論](https://github.com/runtimeverification/evm-semantics)
- [デポジット・コントラクトの形式的検証](https://github.com/runtimeverification/deposit-contract-verification)

## データサイエンスと分析 {#data-science-and-analytics}

イーサリアム上のアクティビティやネットワークの健全性に関する詳細な情報を提供する、より多くのデータ分析ツールやダッシュボードが必要です。基礎となるデータの多くは公開されておりクエリ可能であるため、ギャップは通常、アクセスではなく分析とプレゼンテーションにあります。

### 背景知識のリーディング {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [クライアント・ダイバーシティ・ダッシュボード](https://clientdiversity.org/)
- [イーサリアムJSON-RPC実行API仕様](https://ethereum.github.io/execution-apis/)

#### 最近の研究 {#recent-research-14}

- [ロバスト・インセンティブ・グループのデータ分析](https://rig.ethereum.org/)
- [ethPandaOpsのオープンデータ](https://ethpandaops.io/data/)
- [L2BEAT: スケーリングの概要](https://l2beat.com/scaling/summary)

## アプリとツール {#apps-and-tooling}

アプリケーション・レイヤーは、イーサリアムのベースレイヤーでトランザクションを決済するプログラムの多様なエコシステムをサポートしています。開発チームは、イーサリアムを活用して、重要なWeb2アプリのコンポーザブルでパーミッションレス、かつ検閲耐性のあるバージョンを作成したり、完全に新しいWeb3ネイティブの概念を作成したりする新しい方法を常に見つけています。同時に、イーサリアム上でのdappの構築をより複雑でなくする新しいツールが開発されています。

### DeFi {#defi}

分散型金融 (DeFi) は、イーサリアムの上に構築されたアプリケーションの主要なクラスの1つです。DeFiは、ユーザーがスマート・コントラクトを使用して暗号資産を保存、送金、貸出、借入、投資できるようにする、コンポーザブルな「マネー・レゴ」を作成することを目指しています。DeFiは動きが速く、常に更新されている分野です。安全で効率的、かつアクセス可能なプロトコルに関する研究が継続的に必要とされています。

#### 背景知識のリーディング {#background-reading-15}

- [DeFi](/defi/)
- [コインベース: DeFiとは何か？](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### 最近の研究 {#recent-research-15}

- [分散型金融、中央集権的な所有権？](https://arxiv.org/pdf/2012.09306.pdf)
- [Ethresear.ch アプリケーション](https://ethresear.ch/c/applications/18)

### DAO {#daos}

イーサリアムのインパクトのあるユースケースは、DAOを使用して分散型の方法で組織化できることです。イーサリアム上のDAOをどのように開発し、トラスト最小化された調整ツールとして改善された形態のガバナンスを実行するために活用できるかについて、多くの活発な研究が行われており、人々の選択肢を従来の企業や組織を超えて大きく広げています。

#### 背景知識のリーディング {#background-reading-16}

- [DAOの紹介](/dao/)

#### 最近の研究 {#recent-research-16}

- [DAOエコシステムのマッピング](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### 開発者ツール {#developer-tools}

イーサリアム開発者向けのツールは急速に改善されています。この一般的な分野では、行うべき活発な研究開発がたくさんあります。

#### 背景知識のリーディング {#background-reading-17}

- [プログラミング言語別のツール](/developers/docs/programming-languages/)
- [開発者フレームワーク](/developers/docs/frameworks/)
- [dappの紹介](/developers/docs/dapps/)
- [トークン標準](/developers/docs/standards/tokens/)

#### 最近の研究 {#recent-research-17}

- [Eth R&D ディスコード](https://discord.gg/qGpsxSA)
- [イーサリアム実行API仕様](https://github.com/ethereum/execution-apis)

### オラクル {#oracles}

オラクルは、パーミッションレスで分散型の方法でオフチェーンのデータをブロックチェーンにインポートします。このデータをオンチェーンに取得することで、dappは現実世界の資産の価格変動、オフチェーン・アプリでのイベント、さらには天候の変化など、現実世界の現象に反応できるようになります。

#### 背景知識のリーディング {#background-reading-18}

- [オラクルの紹介](/developers/docs/oracles/)

#### 最近の研究 {#recent-research-18}

- [ブロックチェーン・オラクルの調査](https://arxiv.org/pdf/2004.07140.pdf)

### アプリのセキュリティ {#app-security}

イーサリアムでのハッキングは、一般的にプロトコル自体ではなく、個々のアプリケーションの脆弱性を悪用します。ハッカーとアプリ開発者は、新しい攻撃と防御を開発するための軍拡競争に陥っています。これは、アプリをハッキングから安全に保つために、常に重要な研究開発が必要であることを意味します。

#### 背景知識のリーディング {#background-reading-19}

- [スマート・コントラクトのセキュリティ](/developers/docs/smart-contracts/security/)
- [Wormholeエクスプロイト・レポート](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [イーサリアム・コントラクトのハッキングの事後分析リスト](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### 最近の研究 {#recent-research-19}

- [Ethresear.ch アプリケーション](https://ethresear.ch/c/applications/18)

### テクノロジー・スタック {#technology-stack}

イーサリアムのテクノロジー・スタック全体を分散化することは、重要な研究分野です。現在、イーサリアム上のdappは、中央集権的なツールやインフラストラクチャに依存しているため、一般的にいくつかの中央集権化のポイントを持っています。その依存を減らすということは、単一のプロバイダーを信頼することなくアプリケーションがイーサリアムを読み取ることを実用的にすることを意味し、そこでライト・クライアントとノード・データへのトラストレスなアクセスが登場します。

#### 背景知識のリーディング {#background-reading-20}

- [イーサリアム・スタック](/developers/docs/ethereum-stack/)
- [ライト・クライアント](/developers/docs/nodes-and-clients/light-clients/)
- [スマート・コントラクトの紹介](/developers/docs/smart-contracts/)
- [分散型ストレージの紹介](/developers/docs/storage/)

#### 最近の研究 {#recent-research-20}

- [スマート・コントラクトのコンポーザビリティ](/developers/docs/smart-contracts/composability/)
- [コインベース: Web3スタック入門](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)