---
title: すべてのイーサリアム・フォークのタイムライン（2014年〜現在）
description: 主要なマイルストーン、リリース、フォークを含むイーサリアム・ブロックチェーンの歴史。
lang: ja
sidebarDepth: 1
authors: ["Nixo"]
---

[イーサリアム](/)・ブロックチェーンの主要なマイルストーン、フォーク、アップデートのタイムラインです。

<ExpandableCard title="フォークとは？" contentPreview="イーサリアムのプロトコルのルール変更のことで、多くの場合、計画的な技術的アップグレードが含まれます。">

フォークとは、ネットワークに主要な技術的アップグレードや変更を行う必要がある場合に発生するものです。通常は[イーサリアム改善提案 (EIP)](/eips/)に由来し、プロトコルの「ルール」を変更します。

従来の中央集権的なソフトウェアでアップグレードが必要な場合、企業はエンドユーザー向けに新しいバージョンを公開するだけです。しかし、ブロックチェーンには中央の所有者が存在しないため、仕組みが異なります。[イーサリアム・クライアント](/developers/docs/nodes-and-clients/)は、新しいフォークのルールを実装するためにソフトウェアをアップデートする必要があります。さらに、ブロック作成者（プルーフ・オブ・ワーク (PoW) の世界ではマイナー、プルーフ・オブ・ステーク (PoS) の世界ではバリデータ）とノードは、新しいルールに従ってブロックを作成し、検証しなければなりません。[コンセンサス・メカニズムの詳細](/developers/docs/consensus-mechanisms/)

これらのルール変更により、ネットワークが一時的に分岐する可能性があります。新しいルールまたは古いルールに従って、新しいブロックが生成される可能性があるためです。通常、フォークは事前に合意されているため、クライアントは一斉に変更を採用し、アップグレードされたフォークがメインのチェーンになります。しかし、まれにフォークに関する意見の不一致が原因でネットワークが永久に分岐することがあります。最も有名なのは、<a href="#dao-fork">DAOフォーク</a>によるイーサリアム・クラシックの誕生です。

</ExpandableCard>

<ExpandableCard title="一部のアップグレードに複数の名前があるのはなぜですか？" contentPreview="アップグレードの名前は一定のパターンに従っています">

イーサリアムの基盤となるソフトウェアは、[実行レイヤー](/glossary/#execution-layer)と[コンセンサス・レイヤー](/glossary/#consensus-layer)と呼ばれる2つの部分で構成されています。

**実行レイヤーのアップグレードの命名規則**

2021年以降、**実行レイヤー**のアップグレードは、[過去のDevconおよびDevconnectの開催地](https://devcon.org/en/past-events/)の都市名にちなんで時系列順に命名されています。

| アップグレード名 | Devcon(nect) 開催年 | Devcon 回数 | アップグレード日 |
| -------------- | ----------------- | ------------- | ------------ |
| ベルリン         | 2014              | 0             | 2021年4月15日 |
| ロンドン         | 2015              | I             | 2021年8月5日  |
| シャンハイ       | 2016              | II            | 2023年4月12日 |
| カンクン         | 2017              | III           | 2024年3月13日 |
| プラハ         | 2018              | IV            | 2025年5月7日  |
| 大阪          | 2019              | V             | 2025年12月3日  |
| **アムステルダム**  | 2022              | Devconnect    | 未定 - 次回   |
| _ボゴタ_       | 2022              | VI            | 未定          |
| _イスタンブール_     | 2023              | Devconnect    | 未定          |
| _バンコク_      | 2024              | VII           | 未定          |
| _ブエノスアイレス_ | 2025              | Devconnect    | 未定          |
| _ムンバイ_       | 2026              | VIII          | 未定          |

**コンセンサス・レイヤーのアップグレードの命名規則**

[ビーコン・チェーン](/glossary/#beacon-chain)のローンチ以降、**コンセンサス・レイヤー**のアップグレードは、アルファベット順に進行する頭文字を持つ恒星の名前にちなんで命名されています。

| アップグレード名                                              | アップグレード日 |
| --------------------------------------------------------- | ------------ |
| ビーコン・チェーンのジェネシス                                      | 2020年12月1日  |
| [アルタイル](https://en.wikipedia.org/wiki/Altair)            | 2021年10月27日 |
| [ベラトリックス](https://en.wikipedia.org/wiki/Bellatrix)      | 2022年9月6日  |
| [カペラ](https://en.wikipedia.org/wiki/Capella)          | 2023年4月12日 |
| [デネブ](https://en.wikipedia.org/wiki/Deneb)              | 2024年3月13日 |
| [エレクトラ](<https://en.wikipedia.org/wiki/Electra_(star)>) | 2025年5月7日  |
| [フルー](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 2025年12月3日  |
| [**グロアス**](https://en.wikipedia.org/wiki/WASP-13)        | 未定 - 次回   |
| [_ヘゼ_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | 未定          |

**統合された命名規則**

実行レイヤーとコンセンサス・レイヤーのアップグレードは当初、異なる時期に展開されていましたが、2022年の[マージ](/roadmap/merge/)以降は同時にデプロイされるようになりました。そのため、これらのアップグレードを1つの結合された用語で簡単に参照するための通称が生まれました。これは_シャンハイ・カペラ_・アップグレード（一般に「**シャペラ**」と呼ばれる）から始まり、その後のアップグレードでも継続されています。

| 実行レイヤーのアップグレード | コンセンサス・レイヤーのアップグレード | 略称    |
| ----------------- | ----------------- | ------------- |
| シャンハイ          | カペラ           | 「シャペラ」    |
| カンクン            | デネブ             | 「デンクン」      |
| プラハ            | エレクトラ           | 「ペクトラ」      |
| 大阪             | フルー              | 「フサカ」      |
| アムステルダム         | グロアス             | 「グラムステルダム」 |
| ボゴタ            | ヘゼ              | 「ヘゴタ」      |

</ExpandableCard>

過去の特に重要なアップグレードに関する情報へ直接スキップする：[ビーコン・チェーン](/roadmap/beacon-chain/)、[マージ](/roadmap/merge/)、[EIP-1559](#london)

将来のプロトコル・アップグレードをお探しですか？[イーサリアムのロードマップで今後のアップグレードについて学ぶ](/roadmap/)。

<Divider />

## 2025 {#2025}

### Fulu-Osaka（「フサカ」） {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[フサカの詳細](/roadmap/fusaka/)

### Prague-Electra（「ペクトラ」） {#pectra}

<NetworkUpgradeSummary name="pectra" />

Prague-Electra（「ペクトラ」）アップグレードには、すべてのユーザー、レイヤー2 (L2) ネットワーク、ステーカー、およびノードオペレーターのエクスペリエンスを向上させることを目的とした、イーサリアム・プロトコルに対するいくつかの改善が含まれています。

ステーキングは、複利運用されるバリデータ・アカウントや、実行レイヤーの引き出しアドレスを使用したステークされた資金の制御の改善により、アップグレードされました。EIP-7251は、単一のバリデータの最大エフェクティブ・バランスを2048に増やし、ステーカーの資本効率を向上させました。EIP-7002は、実行アカウントがエグジットや資金の一部の引き出しを含むバリデータのアクションを安全にトリガーできるようにし、ETHステーカーのエクスペリエンスを向上させると同時に、ノードオペレーターの説明責任を強化するのに役立ちました。

アップグレードのその他の部分は、一般ユーザーのエクスペリエンスの向上に焦点を当てていました。EIP-7702は、通常の非スマート・コントラクト・アカウント（[EOA](/glossary/#eoa)）がスマート・コントラクトと同様にコードを実行する機能をもたらしました。これにより、トランザクションのバッチ処理、ガスのスポンサーシップ、代替認証、プログラム可能な支出制御、アカウント回復メカニズムなど、従来のイーサリアム・アカウントに対する無限の新しい機能が解放されました。

<ExpandableCard title="ペクトラ EIPs" contentPreview="このアップグレードに含まれる公式の改善提案。">

ユーザーエクスペリエンスの向上:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOAアカウントコードの設定</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>ブロブのスループット向上</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>コールデータコストの増加</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>EL設定ファイルへのブロブスケジュールの追加</em></li>
</ul>

ステーキングエクスペリエンスの向上:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em><code>MAX_EFFECTIVE_BALANCE</code>の増加</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>実行レイヤーでトリガー可能なエグジット</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>汎用的な実行レイヤーのリクエスト</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>オンチェーンでのバリデータ・デポジットの供給</em></li>
</ul>

プロトコルの効率性とセキュリティの向上:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381曲線演算のプリコンパイル</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>過去のブロックハッシュを状態に保存</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>コミッティ・インデックスをアテステーションの外部に移動</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [ペクトラがステーキングエクスペリエンスをどのように向上させるか](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Electraアップグレードの仕様を読む](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [Prague-Electra（「ペクトラ」）FAQ](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### カンクン・デネブ（「デンクン」） {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### カンクンの概要 {#cancun-summary}

カンクン・アップグレードには、デネブのコンセンサス・アップグレードと連動して、スケーラビリティの向上を目的としたイーサリアムの_実行_に対する一連の改善が含まれています。

特に、**プロト・ダンクシャーディング**として知られるEIP-4844が含まれており、これによりレイヤー2 (L2) ロールアップのデータ・ストレージ・コストが大幅に削減されます。これは、ロールアップが短期間メインネットにデータを投稿できるようにするデータ「ブロブ」の導入によって実現されます。その結果、レイヤー2 (L2) ロールアップのユーザーのトランザクション手数料が大幅に低下します。

<ExpandableCard title="カンクン EIPs" contentPreview="このアップグレードに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>一時ストレージのオペコード</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM内のビーコン・ブロック・ルート</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>シャード・ブロブ・トランザクション（プロト・ダンクシャーディング）</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - メモリ・コピー命令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em>同一トランザクション内でのみ有効な<code>SELFDESTRUCT</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code>オペコード</em></li>
</ul>

</ExpandableCard>

- [レイヤー2 (L2) ロールアップ](/layer-2/)
- [プロト・ダンクシャーディング](/roadmap/scaling/#proto-danksharding)
- [ダンクシャーディング](/roadmap/danksharding/)
- [カンクン・アップグレードの仕様を読む](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### デネブの概要 {#deneb-summary}

デネブ・アップグレードには、スケーラビリティの向上を目的としたイーサリアムの_コンセンサス_に対する一連の改善が含まれています。このアップグレードは、プロト・ダンクシャーディング（EIP-4844）を有効にするためのカンクンの実行アップグレードや、ビーコン・チェーンに対するその他の改善と連動して行われます。

事前生成された署名付きの「自発的エグジット・メッセージ」の有効期限がなくなるため、サードパーティのノード・オペレーターに資金をステーキングしているユーザーは、より多くのコントロールを得ることができます。この署名付きエグジット・メッセージにより、ステーカーはノードの運用をデリゲートしつつ、誰の許可も得ることなく、いつでも安全にエグジットして資金を引き出す能力を維持できます。

EIP-7514は、バリデータがネットワークに参加できる「チャーン」レートを1エポックあたり8に制限することで、ETHの発行を厳格化します。ETHの発行量はステークされたETHの総量に比例するため、参加するバリデータの数を制限することで、新規発行されるETHの_成長率_に上限を設けるとともに、ノード・オペレーターのハードウェア要件を軽減し、分散化を促進します。

<ExpandableCard title="デネブ EIPs" contentPreview="このアップグレードに含まれる公式の改善提案">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVM内のビーコン・ブロック・ルート</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>シャード・ブロブ・トランザクション</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>永続的に有効な署名付き自発的エグジット</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>アテステーションを含める最大スロットの増加</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>最大エポック・チャーン・リミットの追加</em></li>
</ul>

</ExpandableCard>

- [デネブ・アップグレードの仕様を読む](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [カンクン・デネブ（「デンクン」）FAQ](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### シャンハイ・カペラ（「シャペラ」） {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### シャンハイの概要 {#shanghai-summary}

シャンハイ・アップグレードは、実行レイヤーにステーキングの引き出しをもたらしました。カペラ・アップグレードと連動して、これによりブロックが引き出し操作を受け入れることができるようになり、ステーカーはビーコン・チェーンから実行レイヤーへETHを引き出すことができるようになりました。

<ExpandableCard title="シャンハイ EIPs" contentPreview="このアップグレードに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code>アドレスをウォーム状態で開始する</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>新しい<code>PUSH0</code>命令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>initcodeの制限と計量</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>ビーコン・チェーンのプッシュ型引き出しを操作として追加</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code>の非推奨化</em></li>
</ul>

</ExpandableCard>

- [シャンハイ・アップグレードの仕様を読む](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### カペラの概要 {#capella-summary}

カペラ・アップグレードは、コンセンサス・レイヤー（ビーコン・チェーン）に対する3番目の主要なアップグレードであり、ステーキングの引き出しを可能にしました。カペラは、実行レイヤーのアップグレードであるシャンハイと同期して行われ、ステーキングの引き出し機能を有効にしました。

このコンセンサス・レイヤーのアップグレードにより、初回デポジット時に出金クレデンシャルを提供しなかったステーカーがそれを提供できるようになり、引き出しが可能になりました。

また、このアップグレードでは自動アカウントスイープ機能も提供され、利用可能な報酬の支払いや全額引き出しのためにバリデータのアカウントが継続的に処理されるようになりました。

- [ステーキングの引き出しに関する詳細](/staking/withdrawals/)。
- [カペラ・アップグレードの仕様を読む](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### パリ (マージ) {#paris}

<NetworkUpgradeSummary name="paris" />

#### 概要 {#paris-summary}

パリ・アップグレードは、プルーフ・オブ・ワーク (PoW) ブロックチェーンが58750000000000000000000の[最終合計難易度](/glossary/#terminal-total-difficulty)を超えたことによってトリガーされました。これは2022年9月15日のブロック15537393で発生し、次のブロックでパリ・アップグレードがトリガーされました。パリは[マージ](/roadmap/merge/)への移行でした。その主な特徴は、[プルーフ・オブ・ワーク (PoW)](/developers/docs/consensus-mechanisms/pow)のマイニング・アルゴリズムと関連するコンセンサス・ロジックをオフにし、代わりに[プルーフ・オブ・ステーク (PoS)](/developers/docs/consensus-mechanisms/pos)をオンにすることでした。パリ自体は、[実行クライアント](/developers/docs/nodes-and-clients/#execution-clients)に対するアップグレードであり（コンセンサス・レイヤーにおけるベラトリックスに相当）、接続された[コンセンサス・クライアント](/developers/docs/nodes-and-clients/#consensus-clients)からの指示を受け取ることができるようにするものでした。これには、総称して[Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)と呼ばれる新しい内部APIメソッドのセットを有効にする必要がありました。これは間違いなく、[ホームステッド](#homestead)以来のイーサリアムの歴史において最も重要なアップグレードでした！

- [パリ・アップグレードの仕様を読む](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="パリ EIPs" contentPreview="このアップグレードに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>コンセンサスをプルーフ・オブ・ステークにアップグレード</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>DIFFICULTYオペコードをPREVRANDAOに置き換える</em></li>
</ul>

</ExpandableCard>

---

### ベラトリックス {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### 概要 {#bellatrix-summary}

ベラトリックス・アップグレードは、[ビーコン・チェーン](/roadmap/beacon-chain)の2回目の予定されたアップグレードであり、チェーンを[マージ](/roadmap/merge/)に向けて準備するものでした。これにより、非アクティブ状態やスラッシング対象の違反に対するバリデータのペナルティが最大値に引き上げられました。ベラトリックスには、チェーンをマージに向けて準備し、最後のプルーフ・オブ・ワーク (PoW) ブロックから最初のプルーフ・オブ・ステーク (PoS) ブロックへの移行に備えるための、フォーク選択ルールの更新も含まれています。これには、コンセンサス・クライアントに58750000000000000000000の[最終合計難易度](/glossary/#terminal-total-difficulty)を認識させることが含まれます。

- [ベラトリックス・アップグレードの仕様を読む](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### グレイ・グレイシャー {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### 概要 {#gray-glacier-summary}

グレイ・グレイシャー・ネットワーク・アップグレードは、[ディフィカルティ・ボム](/glossary/#difficulty-bomb)を3か月遅らせました。これがこのアップグレードで導入された唯一の変更であり、性質としては[アロー・グレイシャー](#arrow-glacier)および[ミュア・グレイシャー](#muir-glacier)・アップグレードと同様です。同様の変更は、[ビザンチウム](#byzantium)、[コンスタンティノープル](#constantinople)、および[ロンドン](#london)のネットワーク・アップグレードでも実施されました。

- [EFブログ - グレイ・グレイシャー・アップグレードの発表](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="グレイ・グレイシャー EIPs" contentPreview="このアップグレードに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>ディフィカルティ・ボムを2022年9月まで遅らせる</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### アロー・グレイシャー {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### 概要 {#arrow-glacier-summary}

アロー・グレイシャー（Arrow Glacier）・ネットワーク・アップグレードは、[ディフィカルティ・ボム](/glossary/#difficulty-bomb)を数ヶ月遅らせました。このアップグレードで導入された変更はこれのみであり、性質としては[ミュア・グレイシャー（Muir Glacier）](#muir-glacier)アップグレードと似ています。同様の変更は、[ビザンチウム](#byzantium)、[コンスタンティノープル](#constantinople)、および[ロンドン](#london)のネットワーク・アップグレードでも実施されました。

- [イーサリアム財団ブログ - アロー・グレイシャー・アップグレードのお知らせ](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - イーサリアム・アロー・グレイシャー・アップグレード](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="アロー・グレイシャー EIPs" contentPreview="このアップグレードに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>ディフィカルティ・ボムを2022年6月まで延期</em></li>
</ul>

</ExpandableCard>

---

### アルタイル {#altair}

<NetworkUpgradeSummary name="altair" />

#### 概要 {#altair-summary}

アルタイル（Altair）アップグレードは、[ビーコン・チェーン](/roadmap/beacon-chain)にとって初の予定されたアップグレードでした。ライトクライアントを可能にする「同期コミッティ（sync committees）」のサポートが追加され、マージに向けた開発が進む中で、バリデータの非アクティブ状態やスラッシングに対するペナルティが強化されました。

- [アルタイル・アップグレードの仕様を読む](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> 豆知識！ {#altair-fun-fact}

アルタイルは、正確な展開時間が設定された初の主要なネットワーク・アップグレードでした。それ以前のすべてのアップグレードは、ブロックタイムが変動するプルーフ・オブ・ワーク（PoW）チェーン上の宣言されたブロック番号に基づいていました。ビーコン・チェーンはプルーフ・オブ・ワーク（PoW）を解く必要がなく、代わりにバリデータがブロックを提案できる12秒間の「スロット」32個で構成される時間ベースのエポック・システムで動作します。そのため、エポック74,240に到達してアルタイルが稼働する正確なタイミングを把握できたのです！

- [ブロックタイム](/developers/docs/blocks/#block-time)

---

### ロンドン {#london}

<NetworkUpgradeSummary name="london" />

#### 概要 {#london-summary}

ロンドン（London）アップグレードでは、トランザクション手数料市場を改革する[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)が導入されたほか、ガスの払い戻しの処理方法や[アイスエイジ](/glossary/#ice-age)のスケジュールに変更が加えられました。

#### ロンドン・アップグレード / EIP-1559とは？ {#eip-1559}

ロンドン・アップグレード以前、イーサリアムのブロックは固定サイズでした。ネットワークの需要が高い時期には、これらのブロックはフル稼働状態になっていました。その結果、ユーザーはブロックに含めてもらうために需要が減るのを待たなければならないことが多く、ユーザー体験の低下を招いていました。ロンドン・アップグレードにより、イーサリアムに可変サイズのブロックが導入されました。

イーサリアム・ネットワークにおけるトランザクション手数料の計算方法は、2021年8月の[ロンドン・アップグレード](/ethereum-forks/#london)で変更されました。ロンドン・アップグレード以前は、`base`と`priority`の手数料を区別せずに、次のように計算されていました。

アリスがボブに1 ETHを支払うとします。このトランザクションにおいて、ガス・リミットは21,000ユニット、ガス価格は200 Gweiです。

合計手数料は次のようになります：`Gas units (limit) * Gas price per unit`、つまり`21,000 * 200 = 4,200,000 gwei`、または0.0042 ETH

ロンドン・アップグレードでの[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)の実装により、トランザクション手数料のメカニズムはより複雑になりましたが、ガス代がより予測可能になり、結果としてトランザクション手数料市場がより効率的になりました。ユーザーは、トランザクションの実行に対して支払ってもよい金額に相当する`maxFeePerGas`を設定してトランザクションを送信できます。このとき、ガスの市場価格（`baseFeePerGas`）以上を支払うことはなく、チップを差し引いた余剰分は払い戻されることが保証されています。

以下の動画では、EIP-1559とそのメリットについて解説しています：[EIP-1559の解説](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [分散型アプリケーション (dapp) の開発者ですか？ライブラリとツールのアップグレードを忘れないでください。](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [イーサリアム財団の発表を読む](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Ethereum Cat Herdersの解説を読む](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="ロンドン EIPs" contentPreview="このアップグレードに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>トランザクション手数料市場を改善</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>ブロックから<code>BASEFEE</code>を返す</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>EVM操作に対するガスの払い戻しを削減</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code>で始まるコントラクトのデプロイを防止</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>アイスエイジを2021年12月まで延期</em></li>
</ul>

</ExpandableCard>

---

### ベルリン {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### 概要 {#berlin-summary}

ベルリン（Berlin）アップグレードは、特定のEVMアクションのガス・コストを最適化し、複数のトランザクション・タイプのサポートを強化しました。

- [イーサリアム財団の発表を読む](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Ethereum Cat Herdersの解説を読む](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="ベルリン EIPs" contentPreview="このアップグレードに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>MODEXPのガス・コストを削減</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>複数のトランザクション・タイプのサポートを容易化</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>状態アクセス・オペコードのガス・コストを増加</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>オプションのアクセス・リストを追加</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### ビーコン・チェーンのジェネシス {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### 概要 {#beacon-chain-genesis-summary}

[ビーコン・チェーン](/roadmap/beacon-chain/)を安全にローンチするには、32ETHのステークによるデポジットが16,384件必要でした。これは11月27日に達成され、ビーコン・チェーンは2020年12月1日にブロックの生成を開始しました。

[イーサリアム財団の発表を読む](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  ビーコン・チェーン
</DocLink>

---

### ステーキング・デポジット・コントラクトのデプロイ {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### 概要 {#deposit-contract-summary}

ステーキング・デポジット・コントラクトは、イーサリアム・エコシステムに[ステーキング](/glossary/#staking)を導入しました。[メインネット](/glossary/#mainnet)のコントラクトですが、重要な[イーサリアムのアップグレード](/roadmap/)である[ビーコン・チェーン](/roadmap/beacon-chain/)のローンチ時期に直接的な影響を与えました。

[イーサリアム財団の発表を読む](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  ステーキング
</DocLink>

---

### ミュア・グレイシャー {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### 概要 {#muir-glacier-summary}

ミュア・グレイシャー・フォークは、[ディフィカルティ・ボム](/glossary/#difficulty-bomb)の遅延を導入しました。[プルーフ・オブ・ワーク (PoW)](/developers/docs/consensus-mechanisms/pow/)コンセンサス・メカニズムにおけるブロックの難易度の上昇は、トランザクションの送信や分散型アプリケーション (dapp) の使用における待ち時間を増加させ、イーサリアムのユーザビリティを低下させる恐れがありました。

- [イーサリアム財団の発表を読む](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Ethereum Cat Herdersの解説を読む](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="ミュア・グレイシャー EIPs" contentPreview="このフォークに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>ディフィカルティ・ボムをさらに4,000,000ブロック（約611日）遅延させます。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### イスタンブール {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### 概要 {#istanbul-summary}

イスタンブール・フォーク：

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)における特定のアクションの[ガス](/glossary/#gas)コストを最適化しました。
- サービス拒否（DoS）攻撃に対する耐性を向上させました。
- SNARKsおよびSTARKsに基づく[レイヤー2 (L2) スケーリング](/developers/docs/scaling/#layer-2-scaling)ソリューションのパフォーマンスを向上させました。
- イーサリアムとZcashの相互運用を可能にしました。
- コントラクトにより創造的な機能を導入できるようにしました。

[イーサリアム財団の発表を読む](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="イスタンブール EIPs" contentPreview="このフォークに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>イーサリアムがZcashのようなプライバシー保護通貨と連携できるようにします。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>暗号技術のコストを削減し、[ガス](/glossary/#gas)コストを改善します。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><code>CHAINID</code>[オペコード](/developers/docs/ethereum-stack/#ethereum-virtual-machine)を追加することで、リプレイ攻撃からイーサリアムを保護します。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>消費量に基づいてオペコードのガス価格を最適化します。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>コールデータのコストを削減し、ブロックにより多くのデータを含められるようにします。これは[レイヤー2 (L2) スケーリング](/developers/docs/scaling/#layer-2-scaling)に役立ちます。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>その他のオペコードのガス価格を変更します。</em></li>
</ul>

</ExpandableCard>

---

### コンスタンティノープル {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### 概要 {#constantinople-summary}

コンスタンティノープル・フォーク：

- ブロックの[マイニング](/developers/docs/consensus-mechanisms/pow/mining/)報酬を3 ETHから2 ETHに削減しました。
- [プルーフ・オブ・ステーク (PoS) が実装される](#beacon-chain-genesis)前にブロックチェーンがフリーズしないようにしました。
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)における特定のアクションの[ガス](/glossary/#gas)コストを最適化しました。
- まだ作成されていないアドレスと対話する機能を追加しました。

[イーサリアム財団の発表を読む](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="コンスタンティノープル EIPs" contentPreview="このフォークに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>特定のオンチェーンアクションのコストを最適化します。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>まだ作成されていないアドレスと対話できるようにします。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>別のコントラクトのコードのハッシュを取得するための<code>EXTCODEHASH</code>命令を導入します。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>プルーフ・オブ・ステーク (PoS) の前にブロックチェーンがフリーズしないようにし、ブロック・リワードを3 ETHから2 ETHに削減します。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### ビザンチウム {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### 概要 {#byzantium-summary}

ビザンチウム・フォーク：

- ブロックの[マイニング](/developers/docs/consensus-mechanisms/pow/mining/)・リワードを5 ETHから3 ETHに削減しました。
- [ディフィカルティ・ボム](/glossary/#difficulty-bomb)を1年遅らせました。
- 他のコントラクトに対して状態を変更しない呼び出しを行う機能を追加しました。
- [レイヤー2スケーリング](/developers/docs/scaling/#layer-2-scaling)を可能にするための特定の暗号技術メソッドを追加しました。

[イーサリアム財団の発表を読む](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="ビザンチウム EIPs" contentPreview="このフォークに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em><code>REVERT</code>オペコードを追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>成功または失敗を示すステータスフィールドをトランザクションレシートに追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/)を可能にするため、楕円曲線とスカラー乗算を追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>[ZK-Snarks](/developers/docs/scaling/zk-rollups/)を可能にするため、楕円曲線とスカラー乗算を追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA署名の検証を有効化。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>可変長の戻り値のサポートを追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>他のコントラクトに対して状態を変更しない呼び出しを可能にする、<code>STATICCALL</code>オペコードを追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>難易度調整の計算式を変更。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>[ディフィカルティ・ボム](/glossary/#difficulty-bomb)を1年遅らせ、ブロック・リワードを5 ETHから3 ETHに削減。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### スプリアス・ドラゴン {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### 概要 {#spurious-dragon-summary}

スプリアス・ドラゴン・フォークは、ネットワークに対するサービス拒否（DoS）攻撃（2016年9月/10月）への2番目の対応であり、以下を含みます。

- ネットワークへの将来の攻撃を防ぐためのオペコードの価格調整。
- ブロックチェーンの状態の「肥大化解消（debloat）」の有効化。
- リプレイ攻撃保護の追加。

[イーサリアム財団の発表を読む](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="スプリアス・ドラゴン EIPs" contentPreview="このフォークに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>あるイーサリアム・チェーンのトランザクションが別のチェーンで再ブロードキャストされるのを防ぎます。例えば、テストネットのトランザクションがメインのイーサリアム・チェーンでリプレイされるのを防ぎます。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em><code>EXP</code>オペコードの価格を調整し、計算コストの高いコントラクト操作によってネットワークを遅延させることをより困難にします。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS攻撃によって追加された空のアカウントの削除を可能にします。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>ブロックチェーン上のコントラクトが持つことができる最大コードサイズを24576バイトに変更します。</em></li>
</ul>

</ExpandableCard>

---

### タンジェリン・ホイッスル {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### 概要 {#tangerine-whistle-summary}

タンジェリン・ホイッスル・フォークは、ネットワークに対するサービス拒否（DoS）攻撃（2016年9月/10月）への最初の対応であり、以下を含みます。

- 価格が低すぎるオペコードに関する緊急のネットワーク健全性の問題への対処。

[イーサリアム財団の発表を読む](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="タンジェリン・ホイッスル EIPs" contentPreview="このフォークに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>スパム攻撃に使用される可能性のあるオペコードのガスコストを増加させます。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>初期バージョンのイーサリアム・プロトコルの欠陥により、非常に低いコストで状態に置かれた大量の空のアカウントを削除することで、状態のサイズを縮小します。</em></li>
</ul>

</ExpandableCard>

---

### DAOフォーク {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### 概要 {#dao-fork-summary}

DAOフォークは、安全でない[DAO](/glossary/#dao)コントラクトがハッキングされ、360万ETH以上が流出した[2016年のDAO攻撃](https://www.coindesk.com/learn/understanding-the-dao-attack/)への対応でした。このフォークにより、欠陥のあるコントラクトから、引き出し（withdraw）という単一の機能を持つ[新しいコントラクト](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)に資金が移動されました。資金を失った人は誰でも、ウォレット内の100 DAOトークンにつき1 ETHを引き出すことができました。

この対応策は、イーサリアム・コミュニティによって投票されました。ETH保有者は誰でも、[投票プラットフォーム](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)上のトランザクションを通じて投票することができました。フォークの決定は85%以上の賛成票を獲得しました。

一部のマイナーは、DAO事件がプロトコルの欠陥ではないという理由でフォークを拒否しました。彼らはその後、[イーサリアム・クラシック](https://ethereumclassic.org/)を形成しました。

[イーサリアム財団の発表を読む](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### ホームステッド {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### 概要 {#homestead-summary}

ホームステッド・フォークは未来を見据えたものでした。これには、いくつかのプロトコルの変更と、イーサリアムがさらなるネットワークのアップグレードを行う能力を与えるネットワーキングの変更が含まれていました。

[イーサリアム財団の発表を読む](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="ホームステッド EIPs" contentPreview="このフォークに含まれる公式の改善提案。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>コントラクト作成プロセスに変更を加えます。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>新しいオペコード<code>DELEGATECALL</code>を追加します。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2pの前方互換性要件を導入します。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### フロンティア・ソーイング {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### 概要 {#frontier-thawing-summary}

フロンティア・ソーイング・フォークは、1[ブロック](/glossary/#block)あたりの5,000[ガス](/glossary/#gas)・リミットを解除し、デフォルトのガス価格を51[Gwei](/glossary/#gwei)に設定しました。これにより、トランザクションが可能になりました（トランザクションには21,000ガスが必要です）。将来的な[プルーフ・オブ・ステーク (PoS)](/glossary/#pos)へのハードフォークを確実にするため、[ディフィカルティ・ボム](/glossary/#difficulty-bomb)が導入されました。

- [イーサリアム財団の発表を読む](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [イーサリアム・プロトコル・アップデート1を読む](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### フロンティア {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### 概要 {#frontier-summary}

フロンティアは、イーサリアム・プロジェクトの稼働しているものの、最小限の機能を備えた実装でした。これは、成功を収めたオリンピック・テストフェーズに続くものでした。技術的なユーザー、特に開発者を対象としていました。[ブロック](/glossary/#block)の[ガス](/glossary/#gas)・リミットは5,000でした。この「解凍（thawing）」期間により、マイナーはオペレーションを開始し、アーリーアダプターは「急ぐ」ことなくクライアントをインストールすることができました。

[イーサリアム財団の発表を読む](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### イーサの販売 {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

イーサが42日間にわたり公式に販売されました。BTCで購入することができました。

[イーサリアム財団の発表を読む](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### イエロー・ペーパーのリリース {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

ギャビン・ウッド博士によって執筆されたイエロー・ペーパーは、イーサリアム・プロトコルの技術的な定義です。

[イエロー・ペーパーを見る](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### ホワイトペーパー公開 {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

2015年のプロジェクト立ち上げに先立ち、イーサリアムの創設者であるヴィタリック・ブテリンによって2013年に公開された入門ペーパーです。

<DocLink href="/whitepaper/">
  ホワイトペーパー
</DocLink>