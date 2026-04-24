---
title: イーサリアムにおけるポスト量子暗号技術
description: イーサリアムがポスト量子時代に向けてどのように準備しているか、何が脆弱か、そしてそれを保護するために何が構築されているか。
lang: ja
image: /images/roadmap/roadmap-future.png
alt: "Ethereum roadmap"
template: roadmap
summaryPoints:
  - 量子コンピューターは最終的に、現在イーサリアムが使用している暗号技術を脅かすことになります
  - イーサリアム財団には専門のポスト量子研究チームがあり、2029年までに完全なポスト量子保護を目指す構造化された「Lean Ethereum」ロードマップがあります
  - 現在あなたの資金は安全であり、将来の移行時にはウォレットソフトウェアが案内してくれます
---

量子コンピューターは最終的に、現在イーサリアムや他のほとんどのデジタルシステムを保護している暗号技術の手法を破ることができるようになります。このページでは、それが何を意味するのか、ネットワークがこのリスクを軽減するためにどのように積極的に改善を開発しているのか、そしてあなたが知っておくべきことについて説明します。

## なぜポスト量子暗号技術が重要なのか {#why-post-quantum-matters}

イーサリアムは、ネットワークを安全に保ち、ユーザーの資金を保護するために、いくつかの形式の[暗号技術](/glossary/#cryptography)に依存しています。最も重要なものは以下の通りです：

- **楕円曲線デジタル署名アルゴリズム (ECDSA)**: トランザクションに署名するために使用される暗号技術です。あなたのイーサリアムアカウントのセキュリティはこれに依存しています。
- **BLS署名**: [バリデーター](/glossary/#validator)がネットワークの状態に関する[コンセンサス](/glossary/#consensus)に達するために使用されます。
- **KZG多項式コミットメント**: イーサリアムのスケーリングロードマップにおける[データ可用性](/glossary/#data-availability)のために使用されます。
- **ZK証明システム**: ロールアップやその他のアプリケーションがオフチェーンで計算を検証するために使用されます。

これらはすべて、アーベル群などの数学的構造に依存しています。これらは古典的なコンピューターにとっては困難ですが、[ショアのアルゴリズム](https://en.wikipedia.org/wiki/Shor%27s_algorithm)を使用する量子コンピューターによって効率的に解くことができます。

### 量子コンピューターはいつイーサリアムを脅かすのか？ {#when-will-quantum-computers-threaten-ethereum}

2026年3月、Google Quantum AIは、256ビットの楕円曲線暗号（イーサリアムがアカウント署名に使用しているタイプ）を破るには、およそ1,200の論理量子ビットが必要になる可能性があると推定する研究を発表しました。以前の推定では、この数ははるかに高いとされていました。Googleは、自社のシステムをポスト量子暗号技術に移行するための社内期限を2029年に設定しています。

現在の量子ハードウェアはこの規模には程遠く、数千のノイズの多い物理量子ビットで動作しています。論理量子ビット（エラーを修正し、信頼性の高い計算を実行する）は、それぞれ多くの物理量子ビットを必要とします。**現在のハードウェアとイーサリアムの暗号技術を破るために必要なものとの間のギャップは依然として大きいですが、多くの人が予想していたよりも早く縮まっています。** 特に、米国国立標準技術研究所（NIST）は、2030年までにECDSAを非推奨とし、2035年までに使用を禁止すると予想しています。

これは差し迫った脅威ではありません。しかし、暗号技術の移行には何年もかかり、イーサリアムのセキュリティモデルは何世紀にもわたって持続するように設計されています。イーサリアムの対応は、**Lean Ethereum**ロードマップであり、あらゆる暗号技術の脅威を生き延びるプリミティブを中心にイーサリアムを再構築するための、計画的で複数年にわたるミッションです。

## 量子攻撃に対して脆弱な4つの領域 {#four-vulnerable-areas}

2026年2月、ヴィタリック・ブテリンは、ポスト量子アップグレードが必要なイーサリアムの暗号技術の4つの異なる領域を特定した[ロードマップを公開しました](https://x.com/VitalikButerin/status/2027075026378543132)。それぞれに異なる課題と異なる解決策の道筋があります。

### 1. コンセンサス・レイヤーのBLS署名 {#consensus-bls}

**役割**: イーサリアムの[プルーフ・オブ・ステーク (PoS)](/glossary/#pos)プロトコルは、数十万のバリデーターからの投票を集約するためにBLS署名を使用します。BLSにより、多くの署名を1つに結合でき、ネットワークの効率を保つことができます。

**脆弱な理由**: BLS署名は楕円曲線ペアリングに依存しており、量子コンピューターはこれを破ることができます。

**アプローチ**: Lean Consensusロードマップには、2つの補完的なツールの開発が含まれています：
- **leanXMSS**: イーサリアムはBLS署名を、バリデーター向けのハッシュベースの署名スキームであるleanXMSSに置き換えます。ハッシュベースの署名は、ハッシュ関数のセキュリティのみに依存しているため、量子安全であると考えられています。量子コンピューターはハッシュ関数を弱めることはあっても、破ることはありません。
- **leanVM**: SNARKベースの署名集約のための最小限のzkVM（ゼロ知識仮想マシン）です。ハッシュベースの署名は大幅に大きいため（BLSの96バイトに対して約3,000バイト）、leanXMSSに切り替えると、スロットあたりのデータ量が大幅に増加します。これを解決するために、leanVMは集約エンジンとして機能し、データを250倍に圧縮します。これにより、量子安全なスキームに切り替えた後でも、多くの署名を1つに結合する効率性の利点が維持されます。

<ExpandableCard title="Why can't Ethereum just replace BLS with a quantum-safe scheme?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

BLSを効率的にする集約特性（数十万の署名を1つに結合する）には、明確な量子安全の同等物がありません。また、ポスト量子署名はBLS署名よりもはるかに大きいです。単に一方を他方に交換するだけでは、イーサリアムのコンセンサス・レイヤーは大幅に遅くなり、コストが高くなります。そのため、チームはゼロ知識証明を使用して量子安全な署名を効率的に集約するツールであるleanVMを構築しています。

</ExpandableCard>

### 2. データ可用性: KZGコミットメント {#data-availability-kzg}

**役割**: KZG多項式コミットメントは、すべてのノードがすべてのデータをダウンロードすることなく、データ（特にロールアップからの[ブロブ](/glossary/#blob)データ）がネットワーク上で利用可能であることを保証します。

**脆弱な理由**: KZGコミットメントは、量子コンピューターが攻撃できるのと同じ数学的構造である楕円曲線ペアリングに依存しています。

**現在の緩和策**: KZGコミットメントは、多くの参加者がランダム性を提供した「トラステッド・セットアップ」を使用しています。少なくとも1人の参加者が誠実であり、その秘密を破棄した限り、事後にリバースエンジニアリングを試みる量子コンピューターに対しても、セットアップは安全です。

**長期的な解決策**: KZGを量子安全なコミットメントスキームに置き換えます。2つの有力な候補は以下の通りです：
- **STARKベースのコミットメント**: 楕円曲線ではなくハッシュ関数に依存します。一部のZKロールアップですでに使用されています。
- **格子ベースのコミットメント**: 量子耐性があると考えられている格子問題の困難さに依存します。

どちらのアプローチも、イーサリアムの規模での効率性と実用性について現在も研究されています。

### 3. アカウント署名: ECDSA {#eoa-signatures}

**役割**: すべての標準的なイーサリアムアカウント（外部所有アカウント、または[EOA](/glossary/#eoa)）は、トランザクションに署名するためにsecp256k1曲線上のECDSAを使用します。これがあなたの資金を保護するものです。

**脆弱な理由**: トランザクションを送信したことのあるアカウントの場合、公開鍵がオンチェーンで公開されます。量子コンピューターは、この公開された公開鍵データから秘密鍵を導き出すことができます。

**重要なニュアンス**: イーサを受け取っただけでトランザクションを送信したことがないアカウントは、公開鍵を公開していません。アドレス（公開鍵のハッシュ）のみが表示されるため、追加の保護が提供されます。

**アプローチ**: 単一のプロトコル全体の移行ではなく、イーサリアムは[アカウント抽象化](/roadmap/account-abstraction/)（具体的には、2026年後半のHegotáで検討されているEIP-8141）を使用して、ユーザーに**署名の俊敏性**を提供する予定です。個々のアカウントは、プロトコル全体が変更されるのを待つことなく、ポスト量子署名スキームに切り替えることができます。

これは実用的なアプローチです。早期にポスト量子保護を望むユーザーやウォレットは自発的にそれを採用でき、より広範な移行は時間をかけて行われます。

### 4. アプリケーション・レイヤーのZK証明 {#zk-proofs}

**役割**: ゼロ知識証明システムは、L2ロールアップやその他のアプリケーションによって、基礎となるデータを明らかにすることなく計算を検証するために使用されます。

**脆弱な理由**: 多くの人気のあるZK証明システム（楕円曲線ペアリングを使用するSNARK）は、量子に対して脆弱な仮定に依存しています。

**アプローチ**: 楕円曲線ではなくハッシュ関数に依存するSTARKは、すでに量子耐性があり、いくつかのロールアップで使用されています。STARKベースのシステムのエコシステムへの自然な採用により、アプリケーション・レイヤーですでにポスト量子セキュリティが提供されています。

## NIST標準 {#nist-standards}

2024年8月、米国国立標準技術研究所（NIST）は[3つのポスト量子暗号技術標準をファイナライズしました](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)。これらが重要なのは、各プロジェクトが独自のアルゴリズムを発明するのではなく、イーサリアムを含むテクノロジー業界全体に、構築の基盤となる検証済みのアルゴリズムの共有セットを提供するからです。

| 標準 | 名前 | タイプ | ユースケース |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | 格子ベース | 鍵カプセル化（鍵交換） |
| FIPS 204 | ML-DSA (Dilithium) | 格子ベース | デジタル署名 |
| FIPS 205 | SLH-DSA (SPHINCS+) | ハッシュベース | デジタル署名 |

これらの標準は、より広範な業界のポスト量子移行のための基盤を提供します。イーサリアムの取り組みはこれらを基盤として拡張し、効率性と集約が重要となる分散型ネットワークの特有の課題に特に焦点を当てています。

## イーサリアム財団のアプローチ {#ef-approach}

イーサリアム財団は、2026年1月にThomas Coratgerが率いる専門のポスト量子セキュリティチームを結成しました。チームの取り組みは[pq.ethereum.org](https://pq.ethereum.org)で公開されています。

### 現在の活動（2026年4月現在） {#current-activity}

- **毎週の相互運用性開発ネット**: ライトハウス、Grandine、Zeam、Ream Labs、PierTwoを含む10以上のクライアントチームが、定期的なポスト量子インターオペラビリティテストに参加しています。
- **Poseidon Prize**: ハッシュベースの暗号プリミティブの改善を目的とした100万ドルの研究賞。
- **オープンソース実装**: leanXMSS、leanVM、leanSpec (Python)、leanSig (Rust)、およびleanMultisigはすべて、[leanEthereum GitHub組織](https://github.com/leanEthereum)で利用可能です。
- **第2回年次PQ研究リトリート**: 2026年10月9日から10月12日まで英国ケンブリッジで計画されています。
- **NISTとの連携**: イーサリアムの取り組みは、2024年8月にNISTによってファイナライズされたポスト量子暗号技術標準（ML-KEM、ML-DSA、SLH-DSAなど）に基づいています。

### 移行のマイルストーン {#migration-milestones}

チームは、イーサリアムにポスト量子暗号技術を段階的に導入するための一連のプロトコルアップグレードの概要を説明しました。これらは計画上のマイルストーンであり、保証されたコミットメントではありません。名前や順序は変更される可能性があります。

| マイルストーン | 導入されるもの |
|-----------|--------------------|
| I* | PQ鍵レジストリ。バリデーターは既存のBLS鍵と並行してポスト量子公開鍵を登録できます。 |
| J* | PQ署名検証プリコンパイル。スマートコントラクトとウォレットはPQ署名をネイティブに検証できます。 |
| L* | leanVMを介したPQアテステーションとリアルタイムのコンセンサス・レイヤー証明。バリデーターはコンセンサスのためにPQ署名の使用を開始します。 |
| M* | 完全なPQ署名集約とPQ安全なブロブコミットメント。 |

**目標**: 構造化されたフォークのマイルストーンは、およそ2029年までにコアとなるポスト量子インフラストラクチャの完成を目標としています。完全な実行レイヤーとエコシステムの移行はそれ以降に及びます。

## ユーザーは何をする必要があるか？ {#what-users-need-to-do}

**現時点では：何もありません。** あなたの資金は安全です。現在の量子コンピューターがイーサリアムの暗号技術を脅かすことはありません。

**将来的には**: イーサリアムでポスト量子署名スキームが広くサポートされるようになると（Hegotáハード・フォークとEIP-8141の実装後に予想されます）、アカウントを量子安全な署名に移行したくなるでしょう。ウォレットソフトウェアがこの移行を案内してくれます。

アカウントがトランザクションを送信したことがない場合（つまり、公開鍵がオンチェーンで公開されていない場合）、追加の保護レイヤーがあります。しかし、すべてのアカウントは最終的に移行する必要があります。

休眠ウォレット（所有者が移行の必要性に気づいていない可能性のあるアカウント）をどのように処理するかという問題は、オープンなガバナンストピックです。イーサリアムコミュニティはまだこれに関するコンセンサスに達していません。

## よくある質問 {#faq}

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**いいえ。** 現在の量子コンピューターがイーサリアムの暗号技術を破ることはできません。現在の量子ハードウェアは、必要な規模には程遠いです。このページで説明されている取り組みは将来への準備であり、現在進行中の脅威への対応ではありません。

</ExpandableCard>

<ExpandableCard title="When could quantum computers become a threat?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

推定は様々です。Googleの2026年3月の研究では、256ビットの楕円曲線暗号を破るために必要なハードウェアは、早ければこの10年の終わり頃に登場する可能性があると示唆されていますが、依然として重大なエンジニアリング上の課題が残っています。ほとんどの研究者は、現実的な脅威は少なくとも数年先であると考えています。正直な答えは、正確なタイムラインは誰にもわからないということであり、だからこそ今準備することが重要なのです。

</ExpandableCard>

<ExpandableCard title="Will I need to do anything to protect my wallet?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

最終的には、はい。イーサリアムでポスト量子署名スキームが利用可能になれば、ユーザーはアカウントを移行したくなるでしょう。ウォレットソフトウェアがおそらくこの移行を処理してくれます。今のところ、あなたがする必要があることは何もありません。アクションが必要になった際には、イーサリアムコミュニティとウォレット開発者が明確なガイダンスとツールを提供します。

</ExpandableCard>

<ExpandableCard title="What about my tokens, NFTs, and DeFi positions?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

イーサリアム上の資産はアカウント署名によって制御されます。アカウントが量子安全な署名スキームに移行されると、そのアカウント内のすべてが保護されます。各資産を個別に移行する必要はありません。資金を保持するスマートコントラクト（分散型金融 (DeFi) プロトコルなど）は、内部で使用している暗号プリミティブに応じて独自のアップグレードが必要になる場合があります。

</ExpandableCard>

<ExpandableCard title="Is Ethereum behind other blockchains on this?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

いいえ。イーサリアムは、あらゆるブロックチェーンの中で最も構造化されたポスト量子プログラムの1つを持っています。専門チーム、資金提供された研究、毎週の開発ネット、公開された移行ロードマップがあり、量子コンピューティングを第一級の設計制約として扱っています。完全なポスト量子移行を完了したブロックチェーンはまだありません。イーサリアム財団の推定によると、イーサリアムの量子に対して脆弱な休眠資金のエクスポージャーは約0.1%であり、他の主要なブロックチェーンネットワークよりも大幅に低くなっています。

</ExpandableCard>

<ExpandableCard title="What is 'harvest now, decrypt later'?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

「今収集し、後で復号する（Harvest now, decrypt later）」とは、誰かが今日暗号化されたデータや公開された公開鍵を記録し、後で十分に強力な量子コンピューターが存在するようになったときに暗号化を破るという攻撃です。イーサリアムの場合、これは公開鍵がすでにオンチェーンで公開されているアカウント（トランザクションを送信したことのあるすべてのアカウント）に最も関連しています。これが、量子脅威がまだ差し迫っていないにもかかわらず、コミュニティがポスト量子移行を時間的制約のあるものとして扱う理由の1つです。

</ExpandableCard>

## 参考文献 {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _イーサリアム財団_
- [ポスト量子暗号技術プロジェクト](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Ethereum (PSE)_
- [NISTポスト量子暗号技術標準](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [量子脆弱性を責任を持って開示することによる暗号資産の保護](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [量子のフロンティアは見た目よりも近いかもしれない](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZGとトラステッド・セットアップ](/roadmap/danksharding/#what-is-kzg)
- [Lean Week Cambridge (2025) leanVM + PQワークショップリソース](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Lean Ethereum_
- [PQトランザクション署名 ACDブレイクアウトコール](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _イーサリアム財団_
- [PQインターオペラビリティ ACDブレイクアウトコール](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _イーサリアム財団_
- [Lean Ethereumとポスト量子セキュリティ YouTubeプレイリスト](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _イーサリアム財団_
- [ポスト量子耐性に関するパネルインタビュー](https://youtu.be/5DRDjeMmOPw) - _Bankless Podcast_
- [イーサリアムにおけるアカウント抽象化](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _EF Architecture_
- [Superpositioned: 量子コンピューティング業界の分析](https://www.superpositioned.co/) - _Saneel Sreeni_