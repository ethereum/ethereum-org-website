---
title: 全イーサリアムフォークのタイムライン(2014年～現在)
description: 主要なマイルストーン、リリース、フォークを含むイーサリアムブロックチェーンの歴史。
lang: ja
sidebarDepth: 1
---

# 全イーサリアムフォークのタイムライン(2014年～現在) {#the-history-of-ethereum}

イーサリアムブロックチェーンの主要なマイルストーン、フォーク、アップデートをすべてまとめたタイムラインです。

<ExpandableCard title="フォークとは？" contentPreview="計画的な技術アップグレードを含む、イーサリアムプロトコルのルール変更。">

フォークとは、ネットワークに必要となる大規模な技術アップグレードや変更のことで、通常は[イーサリアム改善提案 (EIPs) ](/eips/)に基づいて、プロトコルの「規約」を変更するものです。

従来の中央集権型のソフトウェアにおいてアップグレードが必要になった場合、企業はエンドユーザのために新バージョンを公開します。 中央集権型の所有権がないブロックチェーンでは、仕組みが異なります。 [イーサリアムクライアント](/developers/docs/nodes-and-clients/)が新しいフォークルールを実装するには、ソフトウェアのアップデートが必要となります。 さらに、ブロック作成者(プルーフ・オブ・ワークの世界ではマイナー、プルーフ・オブ・ステークの世界ではバリデータ)とノードは、ブロックを作成し、新しいルールに照らし合わせて検証しなければなりません。 [コンセンサスメカニズムに関する詳細](/developers/docs/consensus-mechanisms/)

これらのルール変更は、ネットワークに一時的な分裂を生じさせる可能性があります。 新規ブロックは、新しいルールもしくは古いルールに基づいて生成できます。 フォークは事前に合意されることが一般的で、クライアントが一斉に変更を採用し、アップグレードされたフォークがメインチェーンとなります。 しかし、まれにフォークをめぐる意見の相違がネットワークの永久的な分裂を引き起こしてしまうことがあります。もっとも有名な例が、<a href="#dao-fork">DAOフォーク</a>によるEthereum Classicの誕生です。

</ExpandableCard>

<ExpandableCard title="アップグレードに複数の名前があるのはなぜ？" contentPreview="アップグレードの名前にはパターンがあります">

Ethereumの基礎となるソフトウェアは二つに分けることができ、片方は[実行レイヤー](/glossary/#execution-layer)、もう片方は[コンセンサスレイヤー](/glossary/#consensus-layer) として知られています。

**実行アップグレードの命名**

2021年以降、**実行レイヤー**へのアップグレードは、過去の[Devcon開催地](https://devcon.org/en/past-events/)の都市名にちなんで時系列で命名されています:

| アップグレード名   | Devcon開催年 | Devcon番号 | アップグレード日   |
| ---------- | --------- | -------- | ---------- |
| ベルリン       | 2014年     | 0        | 2021年4月15日 |
| ロンドン       | 2015年     | I        | 2021年8月5日  |
| Shanghai   | 2016年     | II       | 2023年4月12日 |
| Cancun     | 2017年     | III      | 2024年3月13日 |
| **Prague** | 2018      | IV       | 未定 - 次回    |
| _Osaka_    | 2019年     | V        | 未定         |
| _Bogota_   | 2022年     | VI       | 未定         |
| _Bangkok_  | 2024年     | VII      | 未定         |

**コンセンサスアップグレードの命名**

[ビーコンチェーン](/glossary/#beacon-chain)のローンチ以来、**コンセンサスレイヤー**へのアップグレードは、アルファベット順に進む文字で始まる天体の星にちなんで命名されています:

| アップグレード名                                                      | アップグレード日    |
| ------------------------------------------------------------- | ----------- |
| ビーコンチェーンの誕生                                                   | 2020年12月1日  |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 2021年10月27日 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 2022年9月6日   |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 2023年4月12日  |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 2024年3月13日  |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | 未定 - 次回     |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | 未定          |

**結合された命名**

実行アップグレードとコンセンサスアップグレードは当初、異なる時期に展開されていましたが、2022年の[The Merge](/roadmap/merge/)以降は同時にデプロイされています。 そのため、簡単に1つに連結した用語を使用してアップグレードを参照できるように俗称が登場しました。 これは、一般に「シャペラ」と呼ばれる 上海-カペラ アップグレードから始まり、続いて カンクン-デネブ（デンクン）、そして プラハ-エレクトラ（ペクトラ） へと続く一連のアップグレードです。

| 実行アップグレード | コンセンサスアップグレード | 短縮名        |
| --------- | ------------- | ---------- |
| Shanghai  | Capella       | "Shapella" |
| Cancun    | Deneb         | "Dencun"   |
| Prague    | Electra       | "Pectra"   |
| Osaka     | Fulu          | "Fusaka"   |

</ExpandableCard>

特に重要な過去のアップグレードに関する情報に直接移動する：[The Beacon Chain](/roadmap/beacon-chain/)、[The Merge](/roadmap/merge/)、[EIP-1559](#london)

今後のプロトコルアップグレードについては、 [イーサリアムのロードマップ上の今後のアップグレードについて学ぶ](/roadmap/)

<Divider />

## 2025 {#2025}

### Fulu-Osaka(「Fusaka」) {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Fusakaに関する詳細](/roadmap/fusaka/)

### Prague-Electra (「Pectra」) {#pectra}

<NetworkUpgradeSummary name="pectra" />

プラハ‐エレクトラ（「ペクトラ」）アップグレードには、すべてのユーザー、レイヤー2ネットワーク、ステーカー、ノードオペレーターの体験を向上させることを目的とした、イーサリアムプロトコルのいくつかの改良が含まれていました。

ステーキング機能が強化され、複利運用が可能なバリデータアカウントが導入されたほか、実行層の出金アドレスを使ってステークした資金をより柔軟に管理できるようになりました。 EIP-7251により、1つのバリデータの最大有効残高が2048まで引き上げられ、ステーカーの資本効率が向上しました。 EIP-7002により、実行アカウントが安全にバリデータの操作（退出や一部資金の出金など）を実行できるようになり、ETHステーカーの利便性が向上するとともに、ノードオペレーターの責任性強化にもつながりました。

アップグレードのほかの部分では、一般ユーザーの利便性向上にも重点が置かれました。 EIP-7702は、通常のスマートコントラクトではないアカウント([EOA](/glossary/#eoa))がスマートコントラクトと同様のコードを実行できる機能をもたらしました。 これにより、従来のイーサリアムアカウントにおいて、トランザクションのバッチ処理、ガス代の代行支払い、代替的な認証方法、支出のプログラム制御、アカウント復旧機構など、制限のない新たな機能が利用可能になりました。

<ExpandableCard title="PectraのEIP" contentPreview="このアップグレードに含まれる公式の改善点。">

ユーザー体験の向上：

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>EOAアカウントにコードを設定</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>ブロブ処理能力の向上</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>コールデータのコスト引き上げ</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>実行レイヤー（EL）の設定ファイルにブロブスケジュールを追加</em></li>
</ul>

ステーキング体験の向上：

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em><code>MAX_EFFECTIVE_BALANCE</code> の上限を引き上げ</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>実行レイヤーからトリガー可能な退出機能</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>汎用的な実行レイヤーリクエスト</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>オンチェーンでのバリデータ入金処理</em></li>
</ul>

プロトコルの効率性とセキュリティの向上：

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>BLS12-381曲線演算のためのプリコンパイル追加</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>ステートに過去のブロックハッシュを保存</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>committee indexを署名付きアテステーションの外部へ移動</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Pectraがステーキング体験を向上させる方法](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Electraアップグレードの仕様を読む](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Prague-Electra(「Pectra」) FAQ](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb(「Dencun」) {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Cancunの概要 {#cancun-summary}

Cancunアップグレードには、Denebのコンセンサスアップグレードと連携してスケーラビリティの向上を目指す、イーサリアムの_実行_に対する一連の改善が含まれています。

特に、**Proto-Danksharding**として知られるEIP-4844が含まれており、これによりレイヤー2ロールアップのデータストレージコストが大幅に削減されます。 これは、ロールアップがメインネットに対してデータを短い期間投稿できるようにする、「ブロブ」というデータを導入することにより実現します。 これにより、レイヤー2ロールアップのトランザクションフィーが大幅に低下します。

<ExpandableCard title="CancunのEIP" contentPreview="このアップグレードに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>一時的なストレージオペコード</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVMのビーコンブロックルート</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>シャード・ブロブ・トランザクション(プロト・ダンクシャーディング)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> -メモリコピー命令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code>の使用を同一のトランザクションに制限</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>オペコード<code>BLOBBASEFEE</code></em></li>
</ul>

</ExpandableCard>

- [レイヤー2ロールアップ](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Cancunアップグレードの仕様を読む](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Denebの概要 {#deneb-summary}

Denebアップグレードには、スケーラビリティの向上を目的としたイーサリアムの_コンセンサス_に対する一連の改善が含まれています。 このアップグレードは、カンクン実行レイヤーアップグレードと並行して行われ、プロトダンクシャーディング(EIP-4844)を可能にし、他のビーコンチェーンの改善策も含まれます。

事前に生成された署名付きの「自発的退出メッセージ」に有効期限がなくなり、サードパーティーのノードオペレータに資金をステーキングしているユーザーによるコントロールが強化されました。 この署名付きの退出メッセージにより、ステーカーはノードの運用を他者に委任しつつも、誰の許可も得ることなく、いつでも安全に退出して資金を引き出すことができるようになります。

EIP-7514では、バリデータがネットワークに参加できる「チャーン」レートをエポックあたり8に制限することにより、ETHの発行を引き締めます。 ETHの発行はステーキングされたETHの総量に比例するため、参加するバリデータの数を制限することで、新たに発行されるETHの_増加率_に上限が設けられ、同時にノードオペレーターのハードウェア要件も削減され、分散化が促進されます。

<ExpandableCard title="DenebのEIP" contentPreview="このアップグレードに含まれる公式の改善点">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVMのビーコンブロックルート</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>シャード・ブロブ・トランザクション</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>永続的に有効な署名付きの自発的退出</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>認証スロットの最大アテステーションを拡張</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>チャーンの最大エポック数の制限</em></li>
</ul>

</ExpandableCard>

- [Denebアップグレードの仕様を読む](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Cancun-Deneb(「Dencun」) FAQ](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella(「Shapella」) {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Shanghaiの概要 {#shanghai-summary}

上海アップグレードにより、実行レイヤーへのステーキングの引き出しが可能になりました。 カペラのアップグレードと並行して、引き出し操作を受け付けられるようになり、ステーカーはビーコンチェーンから実行レイヤーにETHを引き出せるようになりました。

<ExpandableCard title="ShanghaiのEIP" contentPreview="このアップグレードに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code>アドレスをウォームで開始</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>新規<code>PUSH0</code>命令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>リミットとメーターの初期コード</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>操作としてのビーコンチェーンプッシュ引き出し</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code>の廃止</em></li>
</ul>

</ExpandableCard>

- [Shanghaiアップグレードの仕様を読む](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capellaの概要 {#capella-summary}

カペラのアップグレードは、コンセンサスレイヤー(ビーコンチェーン)に対する3番目の主要なアップグレードであり、ステーキングの引き出しが可能になりました。 カペラは、実行レイヤーのアップグレードである上海と同期して起こり、ステーキングの引き出し機能が有効になりました。

このコンセンサスレイヤのアップグレードにより、最初の入金で引き出し認証情報を提供しなかったステーカーによる引き出しが可能になりました。

また、このアップグレードによって、自動アカウントスイープ機能も実装され、バリデータアカウントを継続的に処理し、報酬の支払いや全額引き出しができるようになりました。

- [ステーキング出金について詳しく](/staking/withdrawals/).
- [Capellaアップグレードの仕様を読む](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### まとめ {#paris-summary}

Parisアップグレードは、プルーフ・オブ・ワーク・ブロックチェーンが[最終合計難易度(Terminal Total Difficulty)](/glossary/#terminal-total-difficulty) 58750000000000000000000を通過したことでトリガーされました。 2022年9月15日にブロック15537393で発生し、次のブロックでパリのアップグレードがトリガーされたものです。 Parisは[The Merge](/roadmap/merge/)への移行でした。その主な特徴は、[プルーフ・オブ・ワーク](/developers/docs/consensus-mechanisms/pow)のマイニングアルゴリズムと関連するコンセンサスロジックをオフにし、代わりに[プルーフ・オブ・ステーク](/developers/docs/consensus-mechanisms/pos)をオンにすることでした。 Paris自体は[実行クライアント](/developers/docs/nodes-and-clients/#execution-clients)へのアップグレードであり(コンセンサスレイヤーにおけるBellatrixに相当)、接続された[コンセンサスクライアント](/developers/docs/nodes-and-clients/#consensus-clients)からの指示を受け取ることができるようになりました。 これには、総称して[Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)として知られる新しい一連の内部APIメソッドを有効化する必要がありました。 これは、[Homestead](#homestead)以降のイーサリアムの歴史において、間違いなく最も重要なアップグレードでした。

- [Parisアップグレードの仕様を読む](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="ParisのEIP" contentPreview="このアップグレードに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>コンセンサスをアップグレードし、プルーフ・オブ・ステークにする。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>オペコードDIFFICULTYをPREVRANDAOに置き換える。</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### まとめ {#bellatrix-summary}

Bellatrixアップグレードは、[ビーコンチェーン](/roadmap/beacon-chain)で2番目に予定されていたアップグレードで、チェーンを[The Merge](/roadmap/merge/)に備えさせるものでした。 これにより、バリデータのペナルティを、非アクティブおよびスラッシング可能な違反に対して完全な値にしました。 ベラトリックスには、マージ向けチェーンと、最後のプルーフ・オブ・ワークのブロックから最初のプルーフ・オブ・ステークのブロックへの移行を準備するためのフォーク選択ルールのアップデートも含まれます。 これには、コンセンサスクライアントに58750000000000000000000の[最終合計難易度(Terminal Total Difficulty)](/glossary/#terminal-total-difficulty)を認識させることが含まれます。

- [Bellatrixアップグレードの仕様を読む](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### まとめ {#gray-glacier-summary}

Gray Glacierネットワークアップグレードは、[ディフィカルティボム](/glossary/#difficulty-bomb)を3ヶ月間延期しました。 これは、このアップグレードで導入された唯一の変更であり、[Arrow Glacier](#arrow-glacier)および[Muir Glacier](#muir-glacier)アップグレードと性質が似ています。 [Byzantium](#byzantium)、[Constantinople](#constantinople)、および[London](#london)のネットワークアップグレードでも同様の変更が実施されています。

- [EFブログ - Gray Glacierアップグレードのお知らせ](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray GlacierのEIP" contentPreview="このアップグレードに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>2022年9月まで難易度爆弾を遅らせる。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### まとめ {#arrow-glacier-summary}

Arrow Glacierネットワークアップグレードは、[ディフィカルティボム](/glossary/#difficulty-bomb)を数ヶ月延期しました。 これは、このアップグレードで導入された唯一の変更であり、[Muir Glacier](#muir-glacier)アップグレードと性質が似ています。 [Byzantium](#byzantium)、[Constantinople](#constantinople)、および[London](#london)のネットワークアップグレードでも同様の変更が実施されています。

- [EFブログ - Arrow Glacierアップグレードのお知らせ](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Ethereum Arrow Glacierアップグレード](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow GlacierのEIP" contentPreview="このアップグレードに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>2022年6月まで難易度爆弾を遅らせる。</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### まとめ {#altair-summary}

Altairアップグレードは、[ビーコンチェーン](/roadmap/beacon-chain)で最初に予定されていたアップグレードです。 ライトクライアントをサポートするための「同期委員会」を追加しました。また、マージに向けた開発が進むにつれて、バリデータの非アクティブ化とスラッシングのペナルティが増加しました。

- [Altairアップグレードの仕様を読む](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />豆知識！ {#altair-fun-fact}

アルタイルは、正確な実装時間があらかじめ設定された最初の主要なネットワークアップグレードでした。 それまでのアップグレードはすべて、ブロックタイムにばらつきがあるプルーフ・オブ・ワーク・チェーン上のブロック番号に基づいていました。 ビーコンチェーンは、プルーフ・オブ・ワークを必要としない代わりに、バリデータがブロックを提案できる32秒の「スロット」からなる時間ベースのエポックシステムで動作します。 こうした理由から、エポック74,240に到達してアルタイルが実装されるタイミングを把握することができたのです。

- [ブロック時間](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### まとめ {#london-summary}

Londonアップグレードでは[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)が導入され、トランザクション手数料市場が改革されるとともに、ガス返金の処理方法や[Ice Age(氷河期)](/glossary/#ice-age)のスケジュールが変更されました。

#### ロンドンアップグレード/EIP-1559の更新内容 {#eip-1559}

ロンドンアップグレード前は、イーサリアムのブロックサイズは固定されていました。 ネットワーク需要が高い時期には、ブロックはフル稼働していたため、 ユーザーはしばしば需要の減少を待つ必要があり、トランザクションの追加が遅れて、ユーザーエクスペリエンスが悪化していました。 ロンドンアップグレードで、イーサリアムに可変サイズのブロックが導入されました。

イーサリアムネットワーク上のトランザクション手数料の計算方法は、2021年8月の[Londonアップグレード](/ethereum-forks/#london)で変更されました。 Londonアップグレード以前は、手数料は`base`と`priority`フィーを分離せずに、次のように計算されていました:

例えば、AliceがBobに1 ETHを支払う必要があるとしましょう。 このトランザクションのガスリミットは21,000ユニット、ガス価格は200 Gweiです。

手数料の合計は、`Gas units (limit) * Gas price per unit`、つまり`21,000 * 200 = 4,200,000 gwei`(0.0042 ETH)となります。

Londonアップグレードで[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)が導入されたことで、トランザクション手数料の仕組みは従来よりも複雑になりましたが、ガス手数料が予測しやすくなり、結果的にトランザクション手数料市場がより効率的になりました。 ユーザーは、トランザクションの実行に支払ってもよい額に対応する`maxFeePerGas`を指定してトランザクションを送信できます。その際、ガスの市場価格(`baseFeePerGas`)を超える額を支払うことはなく、チップを差し引いた差額が返金されることを理解しています。

このビデオでは、EIP-1559とその利点について説明しています：[EIP-1559 Explained](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [dappデベロッパーの方へ。 ライブラリとツールを必ずアップグレードしてください。](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Ethereum Cat Herderによる解説を読む](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="LondonのEIP" contentPreview="このアップグレードに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>トランザクション市場の改善。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>ブロックから<code>BASEFEE</code>を戻す。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>EVM操作のガス払い戻しを減額。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code>で始まるコントラクトのデプロイを防止。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>氷河期を2021年12月まで遅らせる。</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### まとめ {#berlin-summary}

ベルリンアップグレードにより、特定のEVM活動に対するガスコストが最適化され、複数処理タイプへのサポートが向上しました。

- [イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Ethereum Cat Herderによる解説を読む](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="BerlinのEIP" contentPreview="このアップグレードに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>ModExpのガス代の削減。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>複数のトランザクションタイプのサポートを容易に。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>状態にアクセスするオペコードのガス代の引き上げ。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>オプションのアクセスリストの追加。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### ビーコンチェーンの誕生 {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### まとめ {#beacon-chain-genesis-summary}

[ビーコンチェーン](/roadmap/beacon-chain/)を安全にリリースするには、32 ETHのステーキングデポジットが16,384件必要でした。 これは11月27日に行われ、ビーコンチェーンは2020年12月1日にブロックの生成を開始しました。

[イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  ビーコンチェーン
</DocLink>

---

### ステーキングデポジットコントラクトがデプロイされる {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### まとめ {#deposit-contract-summary}

ステーキングデポジットコントラクトにより、イーサリアムエコシステムに[ステーキング](/glossary/#staking)が導入されました。 [メインネット](/glossary/#mainnet)上のコントラクトですが、重要な[イーサリアムアップグレード](/roadmap/)である[ビーコンチェーン](/roadmap/beacon-chain/)の立ち上げスケジュールに大きな影響を与えました。

[イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  ステーキング
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### まとめ {#muir-glacier-summary}

Muir Glacierフォークでは、[ディフィカルティボム](/glossary/#difficulty-bomb)の延期が導入されました。 [プルーフ・オブ・ワーク](/developers/docs/consensus-mechanisms/pow/)コンセンサスメカニズムのブロック難易度の上昇は、トランザクションの送信やdappsの使用にかかる待機時間を増加させることで、イーサリアムのユーザビリティを低下させる恐れがありました。

- [イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Ethereum Cat Herderによる解説を読む](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir GlacierのEIP" contentPreview="このフォークに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>難易度爆弾をさらに400万ブロック(約611日)遅らせる。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### まとめ {#istanbul-summary}

イスタンブールのフォーク

- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)における特定のアクションの[ガス](/glossary/#gas)コストを最適化しました。
- DOS攻撃からの耐性を向上。
- SNARKとSTARKに基づく[レイヤー2スケーリング](/developers/docs/scaling/#layer-2-scaling)ソリューションのパフォーマンスを向上させました。
- イーサリアムとZcashの相互運用を有効化。
- コントラクトに多数のクリエイティブな機能の導入を許可。

[イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="IstanbulのEIP" contentPreview="このフォークに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>イーサリアムをZcashのようなプライバシー保護通貨と連携可能に。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>暗号処理をより安価にし、[ガス](/glossary/#gas)コストを改善する提案</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><code>CHAINID</code> [オペコード](/developers/docs/ethereum-stack/#ethereum-virtual-machine)を追加することで、リプレイ攻撃からEthereumを保護する提案</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>消費量に基づいてオペコードガス価格を最適化。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>CallDataのコストを削減し、ブロック内により多くのデータを格納できるようにする提案。これは[レイヤー2スケーリング](/developers/docs/scaling/#layer-2-scaling)に有効</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>その他のオペコードのガス価格の変更。</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### まとめ {#constantinople-summary}

コンスタンティノープルのフォーク

- ブロック[マイニング](/developers/docs/consensus-mechanisms/pow/mining/)報酬を3 ETHから2 ETHに削減しました。
- [プルーフ・オブ・ステークが実装される](#beacon-chain-genesis)前に、ブロックチェーンがフリーズしないようにしました。
- [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine)における特定のアクションの[ガス](/glossary/#gas)コストを最適化しました。
- まだ作成されていないアドレスとやり取りする機能を追加。

[イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="ConstantinopleのEIP" contentPreview="このフォークに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> — <em>一部のオンチェーン処理のコストを最適化する。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>作成前のアドレスとのやり取りを許可。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> — <em>他のコントラクトのコードのハッシュ値を取得するための E<code>XTCODEHASH</code> 命令を導入する。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>ブロックチェーンがフリーズしないことを確認。また、ブロック報酬を3ETHから2ETHへ減額。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### まとめ {#byzantium-summary}

ビザンチウムのフォーク

- ブロック[マイニング](/developers/docs/consensus-mechanisms/pow/mining/)報酬を5 ETHから3 ETHに削減しました。
- [ディフィカルティボム](/glossary/#difficulty-bomb)を1年間延期しました。
- 他のコントラクトに対して、状態変更を行わない呼び出しを行う機能を追加しました。
- [レイヤー2スケーリング](/developers/docs/scaling/#layer-2-scaling)を可能にする特定の暗号化メソッドを追加しました。

[イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="ByzantiumのEIP" contentPreview="このフォークに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>オペコード<code>REVERT</code>の追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>成功また失敗を示すためにトランザクションレシートにステータスフィールドを追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>楕円曲線演算およびスカラー乗算を追加し、[ZK-Snarks](/developers/docs/scaling/zk-rollups/)を可能にする提案。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>楕円曲線演算およびスカラー乗算を追加し、[ZK-Snarks](/developers/docs/scaling/zk-rollups/)を可能にする提案。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA署名の検証を可能に。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>可変長戻り値のサポートを追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>他のコントラクトの非状態変更呼び出しを許可するオペコード<code>STATICCALL</code>の追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>難易度調整の式を変更。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>[ディフィカルティボム](/glossary/#difficulty-bomb)を1年間延期し、ブロック報酬を5ETHから3ETHに減少させる提案。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### まとめ {#spurious-dragon-summary}

スプリアスドラゴンのフォークは、ネットワークへのサービス拒否(DoS)攻撃(2016年9/10月)に対する第2弾の対策でした。下記にその一部をご紹介します。

- 将来のネットワーク攻撃を防ぐために、オペコードの価格を調整。
- ブロックチェーンステートの「デブロート」を有効化。
- リプレイ攻撃に対する保護を追加。

[イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious DragonのEIP" contentPreview="このフォークに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>あるイーサリアムチェーンのからトランザクションがもう一方のチェーンで再ブロードキャストされるのを防ぐ。例えば、テストネットのトランザクションが、イーサリアムのメインネットチェーンでリプレイされるなど。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>オペコードである<code>EXP</code>の価格調整 – 計算費用が高いコントラクト操作によってネットワークの速度を低下させることをより困難に。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS攻撃によって加えられた空アカウントの削除を可能に。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>最大コードサイズの変更。これにより、ブロックチェーンのコントラクトのサイズは、最大24576バイトに。</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### まとめ {#tangerine-whistle-summary}

タンジェリンホイッスルのフォークは、ネットワークへのサービス拒否(DoS)攻撃(2016年9/10月)に対する第1弾の対策でした。下記にその一部をご紹介します。

- 安価な操作コードに関する緊急のネットワーク健全性問題への対処。

[イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine WhistleのEIP" contentPreview="このフォークに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>スパム攻撃に使うことができるオペコードのガス代を引き上げ。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>イーサリアムの以前のバージョンの欠陥により引き起こされた、非常に抵いコストでステートに置かれた大量の空アカウントを削除して、ステートサイズを縮小。</em></li>
</ul>

</ExpandableCard>

---

### DAOフォーク {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### まとめ {#dao-fork-summary}

DAOフォークは、安全性の低い[DAO](/glossary/#dao)コントラクトから360万ETH以上がハッキングで流出した[2016年のDAO攻撃](https://www.coindesk.com/learn/understanding-the-dao-attack/)への対応でした。 このフォークにより、欠陥のあるコントラクトから資金が、引き出しという単一の機能を持つ[新しいコントラクト](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)に移動されました。 資金を失った人がウォレット内の100DAOトークンごとに1ETHを引き出せるようにしました。

この行動指針はEthereumコミュニティの投票で行われました。 どのETH保有者も、[投票プラットフォーム](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)上のトランザクションを介して投票することができました。 フォークの実行は、投票の85%以上に支持されました。

DAO事件はプロトコルの不具合によるものではなかったため、一部のマイナーはフォークを拒否しました。 彼らは[Ethereum Classic](https://ethereumclassic.org/)を結成するに至りました。

[イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### まとめ {#homestead-summary}

未来を見据えたホームステッドのフォークで、 一部のプロトコル変更とネットワーク変更が含まれていたことで、イーサリアムはネットワークの追加アップグレードを行うことができました。

[イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="HomesteadのEIP" contentPreview="このフォークに含まれる公式の改善点。">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>コントラクトの作成プロセスを編集。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>新しいオペコード<code>DELEGATECALL</code>の追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p前方向互換性要件の導入。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier Thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### まとめ {#frontier-thawing-summary}

Frontier Thawingフォークにより、[ブロック](/glossary/#block)あたりの5,000[ガス](/glossary/#gas)リミットが解除され、デフォルトのガス価格が51[Gwei](/glossary/#gwei)に設定されました。 その結果、21,000のガスが必要となるトランザクションが可能になりました。 [ディフィカルティボム](/glossary/#difficulty-bomb)は、将来の[プルーフ・オブ・ステーク](/glossary/#pos)へのハードフォークを確実にするために導入されました。

- [イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [イーサリアムプロトコルアップデート1を読む](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### まとめ {#frontier-summary}

フロンティアは稼動していましたが、イーサリアムプロジェクトのベアボーン実装でした。 フオリンピックのテストフェーズの成功を受けて実装されたものであり、 技術系ユーザー、特にデベロッパー向けに開発されたものでした。 [ブロック](/glossary/#block)には、5,000の[ガス](/glossary/#gas)リミットがありました。 この「解凍」期間があったおかげで、マイナーはオペレーションを開始し、アーリーアダプターは「急ぐ」必要もなくクライアントをインストールすることができました。

[イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Etherセール {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

イーサは正式に42日間販売され、 BTCでの購入も可能でした。

[イーサリアム・ファウンデーションからのお知らせを読む](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### イエローペーパーの公開 {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

ギャビン・ウッド博士によって作成されたイエローペーパーには、イーサリアムプロトコルの技術的定義が記されています。

[イエローペーパーを表示する](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### ホワイトペーパーの公開 {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

この概要論文は、元々はイーサリアム創始者のヴィタリック・ブテリンにより2013年に発表されました。2015年にプロジェクトが始動する前のことです。

<DocLink href="/whitepaper/">
  ホワイトペーパー
</DocLink>
