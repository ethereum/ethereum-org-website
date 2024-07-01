---
title: イーサリアムの歴史とフォーク
description: 主要なマイルストーン、リリース、フォークを含むイーサリアムブロックチェーンの歴史。
lang: ja
sidebarDepth: 1
---

# イーサリアムの歴史 {#the-history-of-ethereum}

イーサリアムブロックチェーンの主要なマイルストーン、フォーク、アップデートをすべてまとめたタイムラインです。

<ExpandableCard title="フォークとは？" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

フォークとは、ネットワークに必要となる大規模な技術アップグレードや変更のことで、通常は<a href="/eips/">イーサリアム改善提案 (EIPs)</a>に基づいて、プロトコルの「規約」を変更するものです。

従来の中央集権型のソフトウェアにおいてアップグレードが必要になった場合、企業はエンドユーザのために新バージョンを公開します。 中央集権型の所有権がないブロックチェーンでは、仕組みが異なります。 <a href="/developers/docs/nodes-and-clients/">イーサリアムクライアント</a>は、新しいフォークルールを実装するためにソフトウェアをアップデートする必要があります。 さらに、ブロック作成者(プルーフ・オブ・ワークの世界ではマイナー、プルーフ・オブ・ステークの世界ではバリデータ)とノードは、ブロックを作成し、新しいルールに照らし合わせて検証しなければなりません。 <a href="/developers/docs/consensus-mechanisms/">「合意メカニズム」についてさらに知る。</a> 新規ブロックは、新しいルールもしくは古いルールに基づいて生成できます。 フォークは事前に合意されることが一般的で、クライアントが一斉に変更を採用し、アップグレードされたフォークがメインチェーンとなります。 しかし、まれにフォークをめぐる意見の相違がネットワークの永久的な分裂を引き起こしてしまうことがあります。もっとも有名な例が、<a href="#dao-fork">DAOフォーク</a>によるEthereum Classicの誕生です。

</ExpandableCard>

<ExpandableCard title="なぜアップグレードのいくつかには複数の名前があるのか？" contentPreview="Upgrades names follow a pattern">

Ethereumの基礎となるソフトウェアは二つに分けることができ、片方は[実行レイヤー](/glossary/#execution-layer)、もう片方は[コンセンサスレイヤー](/glossary/#consensus-layer) として知られています。

**実行アップグレード名**

2021年以降、**実行レイヤー** のアップグレードでは、[以前のDevconの開催地(https://devcon.org/en/past-events/)の都市名に基づいて時系列で名前が付けられています。

| アップグレード名 | Devcon年 | Devcon番号 | アップグレード日 |
| ------------ | ----------- | ------------- | ------------ |
| ベルリン       | 2015        | 0             | 2021年4月15日 |
| ロンドン      | 2016        | I             | 2021年8月5日 |
| 上海     | 2017        | II            | 2023年4月12日 |
| **カンクン**   | 2018        | III           | 2024年3月13日 |
| プラハ     | 2019        | IV            | 開発予定         |
| 大阪      | 2020        | V             | 開発予定         |
| ボゴタ     | 2022        | VI            | 開発予定          |
| バンコク   | 2024        | VII           | 開発予定          |

**コンセンサスアップグレード名**

[ビーコン チェーン](/glossary/#beacon-chain)のリリース以降、**コンセンサスレイヤー** のアップグレードでは、アルファベット順の文字で始まる天体の名前が付けられています。

| アップグレード名                                                | アップグレード日 |
| ----------------------------------------------------------- | ------------ |
| ビーコンチェーン誕生(ジェネシス)                                        | 2020年12月1日  |
| [アルタイル](https://en.wikipedia.org/wiki/Altair)              | 2021年10月27日 |
| [ベラトリックス](https://en.wikipedia.org/wiki/Bellatrix)        | 2022年9月6日  |
| [カペラ](https://en.wikipedia.org/wiki/Capella)            | 2023年4月12日 |
| [**デネブ**](https://en.wikipedia.org/wiki/Deneb)            | 2024年3月13日 |
| [エレクトラ](<https:>) | 開発予定         |

**連結名**

実行アップグレードおよびコンセンサスアップグレードは当初、異なる時期にリリースされていましたが、2022年の [マージ](/roadmap/merge/)以降、これらは同時にデプロイされています。 そのため、簡単に1つに連結した用語を使用してアップグレードを参照できるように俗称が登場しました。 これは、上海-カペラのアップグレードで始まり、一般的に「**シャペラ**」と呼ばれます。そして、カンクン-デネブのアップグレードにも引き継がれ「**デンクン**」と呼ばれます。

| 実行アップグレード | コンセンサスアップグレード | 略称 |
| ----------------- | ----------------- | ---------- |
| 上海         | カペラ           | 「シャペラ」 |
| カンクン           | デネブ            | 「デンクン」   |

</ExpandableCard>

過去の重要なアップグレードである[ビーコンチェーン](/roadmap/beacon-chain/)、[マージ](/roadmap/merge/)、[EIP-1559](#london)を直接ご確認ください。

今後のプロトコルアップグレードについては、 [イーサリアムロードマップ上の今後のアップグレードについて](/roadmap/)をご参照ください。

<Divider />

## 2024年 {#2024}

### カンクン-デネブ(「デンクン」) {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### カンクンの要約 {#cancun-summary}

カンクンアップグレードにはイーサリアムの_実行_の一連の改善が含まれ、デネブのコンセンサスアップグレードと並行して、スケーラビリティの向上を目指しました。

特にこのアップグレードには、**プロトダンクシャーディング**と呼ばれるEIP-4844が含まれ、レイヤー2ロールアップのデータストレージのコストを大幅に削減します。 これは、ロールアップがメインネットに対してデータを短い期間投稿できるようにする、「ブロブ」というデータを導入することにより実現します。 これにより、レイヤー2ロールアップのトランザクションフィーが大幅に低下します。

<ExpandableCard title="カンクンEIP" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>一時的なストレージオペコード</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVMのビーコンブロックルート</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>シャード・ブロブ・トランザクション(プロト・ダンクシャーディング)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> -メモリコピー命令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code>の使用を同一のトランザクションに制限</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>オペコード<code>BLOBBASEFEE</code></em></li>
</ul>

</ExpandableCard>

- [レイヤー２ロールアップ](/layer-2/)
- [プロトダンクシャーディング](/roadmap/scaling/#proto-danksharding)
- [ダークシャーディング](/roadmap/danksharding/)
- [カンクンのアップグレード仕様を読む](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### デネブの要約 {#deneb-summary}

デネブアップグレードでは、イーサリアムの_コンセンサス_を向上させる一連の改善を含み、スケーラビリティを向上させることを目指しています。 このアップグレードは、カンクン実行レイヤーアップグレードと並行して行われ、プロトダンクシャーディング(EIP-4844)を可能にし、他のビーコンチェーンの改善策も含まれます。

事前に生成された署名付きの「自発的退出メッセージ」に有効期限がなくなり、サードパーティーのノードオペレータに資金をステーキングしているユーザーによるコントロールが強化されました。 署名付きの退出メッセージがあれば、ステーカーはノードの運用を委任することが出来ると同時に、誰にも許可を求めることなく、いつでも安全に退出して資金を引き出す能力を維持できます。

EIP-7514では、バリデータがネットワークに参加できる「チャーン」レートをエポックあたり8に制限することにより、ETHの発行を引き締めます。 ETHの発行は、ステーキングされているETHの合計に比例するため、参加するバリデータの数を制限すると、 新しく発行される ETH の_増加率_が制限され、同時にノードオペレータのハードウェア要件も下げることができ、分散化が促進されます。

<ExpandableCard title="デネブEIP" contentPreview="Official improvements included in this upgrade">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>EVMのビーコンブロックルート</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>シャード・ブロブ・トランザクション</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>永続的に有効な署名付きの自発的退出</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>認証スロットの最大アテステーションを拡張</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>チャーンの最大エポック数の制限</em></li>
</ul>

</ExpandableCard>

- [デネブのアップグレード仕様を読む](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [カンクン-デネブ(「デンクン」)FAQ](/roadmap/dencun/)

<Divider />

## 2023年 {#2023}

### 上海-カペラ(「シャペラ」) {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### 上海の要約 {#shanghai-summary}

上海アップグレードにより、実行レイヤーへのステーキングの引き出しが可能になりました。 カペラのアップグレードと並行して、引き出し操作を受け付けられるようになり、ステーカーはビーコンチェーンから実行レイヤーにETHを引き出せるようになりました。

<ExpandableCard title="上海EIP" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em><code>COINBASE</code>アドレスをウォームで開始</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>新規<code>PUSH0</code>命令</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>リミットとメーターの初期コード</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>操作としてのビーコンチェーンプッシュ引き出し</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em><code>SELFDESTRUCT</code>の廃止</em></li>
</ul>

</ExpandableCard>

- [上海のアップグレード仕様を読む](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### カペラの要約 {#capella-summary}

カペラのアップグレードは、コンセンサスレイヤー(ビーコンチェーン)に対する3番目の主要なアップグレードであり、ステーキングの引き出しが可能になりました。 カペラは、実行レイヤーのアップグレードである上海と同期して起こり、ステーキングの引き出し機能が有効になりました。

このコンセンサスレイヤのアップグレードにより、最初の入金で引き出し認証情報を提供しなかったステーカーによる引き出しが可能になりました。

また、このアップグレードによって、自動アカウントスイープ機能も実装され、バリデータアカウントを継続的に処理し、報酬の支払いや全額引き出しができるようになりました。

- [ステーキングの引き出しについての詳細](/staking/withdrawals/)
- [カペラのアップグレード仕様を読む](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022年 {#2022}

### パリ(マージ) {#paris}

<NetworkUpgradeSummary name="paris" />

#### まとめ {#paris-summary}

パリのアップグレードは、58750000000000000000000の[最終合計難易度](/glossary/#terminal-total-difficulty)に到達した時点でプルーフ・オブ・ワークのブロックチェーンによってトリガーされました。 2022年9月15日にブロック15537393で発生し、次のブロックでパリのアップグレードがトリガーされたものです。 パリは、[マージ](/roadmap/merge/)への移行でした。主要な変更は、[プルーフ・オブ・ワーク](/developers/docs/consensus-mechanisms/pow)のマイニングアルゴリズムと関連するコンセンサスロジックをオフにして、代わりに[プルーフ・オブ・ステーク](/developers/docs/consensus-mechanisms/pos)をオンにするというものでした。 パリ自体は、[実行クライアント](/developers/docs/nodes-and-clients/#execution-clients)へのアップグレード(コンセンサスレイヤーのベラトリックスに相当)であり、接続されている[コンセンサスクライアント](/developers/docs/nodes-and-clients/#consensus-clients)からの指示を可能にしましたが、 これにより、[エンジンAPI](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)と称される新しい一連の内部APIメソッドを有効にする必要がありました。 このアップグレードは間違いなく、 [ホームステッド](#homestead)以来、イーサリアム史上最も重要なものとなりました。

- [パリのアップグレード仕様を読む](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="パリEIP" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>コンセンサスをアップグレードし、プルーフ・オブ・ステークにする。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>オペコードDIFFICULTYをPREVRANDAOに置き換える。</em></li>
</ul>

</ExpandableCard>

---

### ベラトリックス {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### 要約 {#bellatrix-summary}

ベラトリックスのアップグレードは、[ビーコンチェーン](/roadmap/beacon-chain)で2番目にスケジュールされたアップグレードで、 [マージ](/roadmap/merge/)へ向けてチェーンを準備しました。 これにより、バリデータのペナルティを、非アクティブおよびスラッシング可能な違反に対して完全な値にしました。 ベラトリックスには、マージ向けチェーンと、最後のプルーフ・オブ・ワークのブロックから最初のプルーフ・オブ・ステークのブロックへの移行を準備するためのフォーク選択ルールのアップデートも含まれます。 このアップグレードで、コンセンサスクライアントに58750000000000000000000000の[最終合計難易度](/glossary/#terminal-total-difficulty)を認識させます。

- [ベラトリックスのアップデート仕様を読む](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### グレイ・グレイシャー {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### 要約 {#gray-glacier-summary}

グレイ・グレイシャー・ネットワークのアップグレードによって、[ディフィカルティボム](/glossary/#difficulty-bomb)は3ヶ月延期となりました。 これが今回のアップグレードで導入された唯一の変更であり、[アロー・グレイシャー](#arrow-glacier)と[ミュア・グレーシャー](#muir-glacier)と似た性質のアップグレードとなります。 [ビザンチウム](#byzantium)、[コンスタンティノープル](#constantinople)、[ロンドン](#london)のネットワークアップグレードで同様の変更が実施されています。

- [EFブログ - アロー・グレイシャーのアップグレードのお知らせ](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="グレイ・グレイシャーEIP" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>2022年9月まで難易度爆弾を遅らせる。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021年 {#2021}

### アロー・グレイシャー {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### 要約 {#arrow-glacier-summary}

アロー・グレイシャーのネットワークのアップグレードにより、[ディフィカルティボム](/glossary/#difficulty-bomb)は数ヶ月延期されました。 これが今回のアップグレードで導入された唯一の変更であり、[ミュア・グレイシャー](#muir-glacier)と似た性質のアップグレードとなります。 同様の変更は、[ビザンチウム](#byzantium)、[コンスタンティノープル](#constantinople)および[ロンドン](#london)のネットワークアップグレードで行われています。

- [EFブログ - アロー・グレイシャーのアップグレードのお知らせ](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - イーサリアムのアロー・グレイシャーのアップグレード](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="アロー・グレイシャーEIP" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>2022年6月まで難易度爆弾を遅らせる。</em></li>
</ul>

</ExpandableCard>

---

### アルタイル {#altair}

<NetworkUpgradeSummary name="altair" />

#### 要約 {#altair-summary}

アルタイルのアップグレードは、 [ビーコンチェーン](/roadmap/beacon-chain)で最初に計画されたアップグレードです。 ライトクライアントをサポートするための「同期委員会」を追加しました。また、マージに向けた開発が進むにつれて、バリデータの非アクティブ化とスラッシングのペナルティが増加しました。

- [アルタイルのアップデート仕様を読む](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <emoji text=":tada:" size={1} me="0.5rem" />豆知識 {#altair-fun-fact}

アルタイルは、正確な実装時間があらかじめ設定された最初の主要なネットワークアップグレードでした。 それまでのアップグレードはすべて、ブロックタイムにばらつきがあるプルーフ・オブ・ワーク・チェーン上のブロック番号に基づいていました。 ビーコンチェーンは、プルーフ・オブ・ワークを必要としない代わりに、バリデータがブロックを提案できる32秒の「スロット」からなる時間ベースのエポックシステムで動作します。 こうした理由から、エポック74,240に到達してアルタイルが実装されるタイミングを把握することができたのです。

- [ブロックタイム](/developers/docs/blocks/#block-time)

---

### ロンドン {#london}

<NetworkUpgradeSummary name="london" />

#### 要約 {#london-summary}

ロンドンのアップグレードでは、 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)を導入し、トランザクションフィーの市場を改革するとともに、ガスの払い戻し方法や[氷河期](/glossary/#ice-age)のスケジュールを変更しました。

#### ロンドンアップグレード/EIP-1559の更新内容 {#eip-1559}

ロンドンアップグレード前は、イーサリアムのブロックサイズは固定されていました。 ネットワーク需要が高い時期には、ブロックはフル稼働していたため、 ユーザーはしばしば需要の減少を待つ必要があり、トランザクションの追加が遅れて、ユーザーエクスペリエンスが悪化していました。 ロンドンアップグレードで、イーサリアムに可変サイズのブロックが導入されました。

イーサリアムネットワークのトランザクションフィーの算出方法は、2021年8月の[ロンドンアップグレード](/history/#london)に伴って変更されました。 ロンドンアップグレード以前は、次のように`base fee`と`priority fee`を分けずにフィーが計算されていました。

例えば、AliceがBobに1 ETHを支払う必要があるとしましょう。 このトランザクションのガスリミットは21,000ユニット、ガス価格は200 Gweiです。

フィーの総額は`ガスユニット(リミット) * ユニットあたりのガス代`、 つまり`21,000 * 200 = 4,200,000 Gwei`で、0.0042 ETHとなります。

ロンドンアップグレードで[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)が導入されたことで、トランザクションフィーの仕組みは従来よりも複雑になりましたが、ガス代の予測がしやすくなり、結果的にトランザクションフィー市場がより効率的になりました。 ユーザーは、トランザクション実行の対価として支払っても良いと考える価格に対応する`maxFeePerGas`を設定します。ガスの市場価格(`baseFeePerGas`)以上の金額を支払う可能性がなく、チップを差し引いた余剰分が返金されることを知った上でトランザクションを送信できます。

次のビデオは、EIP-1559とその利点についての説明です: [EIP-1559の説明](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [dappデベロッパーの方は、 ライブラリとツールをアップグレードしてください。](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [イーサリアム・ファウンデーションのお知らせを読む](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Ethereum Cat Herderの説明を読む](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="ロンドンEIP" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>トランザクション市場の改善。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>ブロックから<code>BASEFEE</code>を戻す。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>EVM操作のガス払い戻しを減額。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em><code>0xEF</code>で始まるコントラクトのデプロイを防止。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>氷河期を2021年12月まで遅らせる。</em></li>
</ul>

</ExpandableCard>

---

### ベルリン {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### 要約 {#berlin-summary}

ベルリンアップグレードにより、特定のEVM活動に対するガスコストが最適化され、複数処理タイプへのサポートが向上しました。

- [イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Ethereum Cat Herderの説明を読む](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="ベルリンEIP" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>ModExpのガス代の削減。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>複数のトランザクションタイプのサポートを容易に。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>状態にアクセスするオペコードのガス代の引き上げ。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>オプションのアクセスリストの追加。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020年 {#2020}

### ビーコンチェーンの誕生 {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### 要約 {#beacon-chain-genesis-summary}

[ビーコンチェーン](/roadmap/beacon-chain/)を安全にリリースするためには、32ETHをデポジットするステーキング参加者が16384に達することが必要条件でした。 11月27日にこの数に到達したことで、2020年12月1日にビーコンチェーンがブロックを生産することになりました。 これは、[イーサリアムのビジョン](/roadmap/vision/)を達成するための重要な第一歩です。

[イーサリアム・ファウンデーションのお知らせを読む](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/roadmap/beacon-chain/">
  ビーコンチェーン
</DocLink>

---

### ステーキングのデポジットコントラクトのデプロイ {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### 要約 {#deposit-contract-summary}

ステーキングのデポジットコントラクトによって、イーサリアムエコシステムに[ステーキング](/glossary/#staking)が導入されました。 [メインネット](/glossary/#mainnet)上のコントラクトですが、重要な[イーサリアムアップグレード](/roadmap/beacon-chain/)である[ビーコンチェーン](/roadmap/)の立ち上げスケジュールに大きな影響を与えました。

[イーサリアム・ファウンデーションのお知らせを読む](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  ステーキング
</DocLink>

---

### ミュア・グレイシャー {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### 要約 {#muir-glacier-summary}

ミュア・グレイシャーのフォークでは、[ディフィカルティボム](/glossary/#difficulty-bomb)の順延が導入されました。 [プルーフ・オブ・ワーク](/developers/docs/consensus-mechanisms/pow/)合意メカニズムのブロック難易度の上昇は、トランザクションの送信やDappsの使用にかかる待ち時間を増加させることで、イーサリアムの使い勝手を低下させる恐れがありました。

- [イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Ethereum Cat Herderの説明を読む](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="ミュア・グレイシャーEIP" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>難易度爆弾をさらに400万ブロック(約611日)遅らせる。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019年 {#2019}

### イスタンブール (Istanbul) {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### 要約 {#istanbul-summary}

イスタンブールのフォーク

- [EVM](/glossary/#gas)内の特定のアクションの[ガス](/developers/docs/ethereum-stack/#ethereum-virtual-machine)コストを最適化。
- DOS攻撃からの耐性を向上。
- SNARKsとSTARKsに基づいた[レイヤー2スケーリング](/developers/docs/scaling/#layer-2-scaling)ソリューションのパフォーマンスを向上。
- イーサリアムとZcashの相互運用を有効化。
- コントラクトに多数のクリエイティブな機能の導入を許可。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="イスタンブールEIP" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>イーサリアムをZcashのようなプライバシー保護通貨と連携可能に。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em><a href="/glossary/#gas">ガス</a>代を改善するための安価な暗号技術。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em><a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine">オペコード</a><code>CHAINID</code>を追加することによりリプレイ攻撃からイーサリアムを保護。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>消費量に基づいてオペコードガス価格を最適化。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em><a href="/developers/docs/scaling/#layer-2-scaling">レイヤー2スケーリング</a>に最適化するためCallDataのコストを削減してブロックにより多くのデータを格納可能に。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>その他のオペコードのガス価格の変更。</em></li>
</ul>

</ExpandableCard>

---

### コンスタンティノープル {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### 要約 {#constantinople-summary}

コンスタンティノープルのフォーク

- ブロックの[マイニング](/developers/docs/consensus-mechanisms/pow/mining/)報酬を3ETHから2ETHに減額。
- [プルーフ・オブ・ステーク](#beacon-chain-genesis)実装前にブロックチェーンがフリーズしなかったことを確認。
- [EVM](/glossary/#gas)内の特定のアクションの[ガス](/developers/docs/ethereum-stack/#ethereum-virtual-machine)コストを最適化。
- まだ作成されていないアドレスとやり取りする機能を追加。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="コンスタンティノープルEIP" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>特定のオンチェーンアクションのコストを最適化。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>作成前のアドレスとのやり取りを許可。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>特定のオンチェーンアクションのコストを最適化。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>ブロックチェーンがフリーズしないことを確認。また、ブロック報酬を3ETHから2ETHへ減額。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017年 {#2017}

### ビザンチウム {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### 要約 {#byzantium-summary}

ビザンチウムのフォーク

- ブロックの[マイニング](/developers/docs/consensus-mechanisms/pow/mining/)報酬が5ETHから3ETHへ減額されました。
- [ディフィカルティボム](/glossary/#difficulty-bomb)を1年延期しました。
- 他のコントラクトに対して、状態変更を行わない呼び出しを行う機能を追加しました。
- [レイヤー2スケーリング](/developers/docs/scaling/#layer-2-scaling)を可能にする特定の暗号技術を追加しました。

[イーサリアム・ファウンデーションのお知らせを読む](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="ビザンチウムEIP" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>オペコード<code>REVERT</code>の追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>成功また失敗を示すためにトランザクションレシートにステータスフィールドを追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em><a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>を可能にするために楕円曲線とスカラー乗法を追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em><a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>を可能にするために楕円曲線とスカラー乗法を追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>RSA署名の検証を可能に。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>可変長戻り値のサポートを追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>他のコントラクトの非状態変更呼び出しを許可するオペコード<code>STATICCALL</code>の追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>難易度調整の式を変更。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em><a href="/glossary/#difficulty-bomb">難易度爆弾</a>を1年遅らせる。また、ブロック報酬を5ETHから3ETHへ減額。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016年 {#2016}

### スプリアスドラゴン {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### まとめ {#spurious-dragon-summary}

スプリアスドラゴンのフォークは、ネットワークへのサービス拒否(DoS)攻撃(2016年9/10月)に対する第2弾の対策でした。下記にその一部をご紹介します。

- 将来のネットワーク攻撃を防ぐために、オペコードの価格を調整。
- ブロックチェーンステートの「デブロート」を有効化。
- リプレイ攻撃に対する保護を追加。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="スプリニアスドラゴンEIP" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>あるイーサリアムチェーンのからトランザクションがもう一方のチェーンで再ブロードキャストされるのを防ぐ。例えば、テストネットのトランザクションが、イーサリアムのメインネットチェーンでリプレイされるなど。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>オペコードである<code>EXP</code>の価格調整 – 計算費用が高いコントラクト操作によってネットワークの速度を低下させることをより困難に。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>DOS攻撃によって加えられた空アカウントの削除を可能に。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>最大コードサイズの変更。これにより、ブロックチェーンのコントラクトのサイズは、最大24576バイトに。</em></li>
</ul>

</ExpandableCard>

---

### タンジェリンホイッスル {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### 要約 {#tangerine-whistle-summary}

タンジェリンホイッスルのフォークは、ネットワークへのサービス拒否(DoS)攻撃(2016年9/10月)に対する第1弾の対策でした。下記にその一部をご紹介します。

- 安価な操作コードに関する緊急のネットワーク健全性問題への対処。

[Ethereum財団の発表を読む](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="タンジェリンホイッスルEIP" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>スパム攻撃に使うことができるオペコードのガス代を引き上げ。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>イーサリアムの以前のバージョンの欠陥により引き起こされた、非常に抵いコストでステートに置かれた大量の空アカウントを削除して、ステートサイズを縮小。</em></li>
</ul>

</ExpandableCard>

---

### DAOフォーク {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### 要約 {#dao-fork-summary}

DAOフォークは、安全でない[自律分散型組織(DAO)](/glossary/#dao)のコントラクトが、1回のハッキングによって、360万以上のETHを流出させた[2016年のDAO攻撃](https://www.coindesk.com/learn/understanding-the-dao-attack/)に対する対策でした。 フォークにより、欠陥のあるコントラクトから[新しいコントラクト](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)に資金が移されました。その際に使用した関数がwithdrawです。 資金を失った人がウォレット内の100DAOトークンごとに1ETHを引き出せるようにしました。

この行動指針はEthereumコミュニティの投票で行われました。 ETH保有者は、 [投票プラットフォーム](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/)でトランザクションを通じて投票することができました。 フォークの実行は、投票の85%以上に支持されました。

DAO事件はプロトコルの不具合によるものではなかったため、一部のマイナーはフォークを拒否しました。 その後 [イーサリアムクラシック](https://ethereumclassic.org/)を形成しました。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### ホームステッド {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### 要約 {#homestead-summary}

未来を見据えたホームステッドのフォークで、 一部のプロトコル変更とネットワーク変更が含まれていたことで、イーサリアムはネットワークの追加アップグレードを行うことができました。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="ホームステッドEIP" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>コントラクトの作成プロセスを編集。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>新しいオペコード<code>DELEGATECALL</code>の追加。</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>devp2p前方向互換性要件の導入。</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015年 {#2015}

### フロンティアソーイング {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### 要約 {#frontier-thawing-summary}

フロンティアソーイングのフォークでは、1[ブロック](/glossary/#gas)あたり5,000の[ガス](/glossary/#block)リミットが解除され、デフォルトのガス価格が51[gwei](/glossary/#gwei)に設定されました。 その結果、21,000のガスが必要となるトランザクションが可能になりました。 [ディフィカルティボム](/glossary/#difficulty-bomb)は、[プルーフ・オブ・ステーク](/glossary/#pos)にハードフォークするために導入されました。

- [イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [イーサリアムプロトコルのアップデート1を読む](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### フロンティア {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### 要約 {#frontier-summary}

フロンティアは稼動していましたが、イーサリアムプロジェクトのベアボーン実装でした。 フオリンピックのテストフェーズの成功を受けて実装されたものであり、 技術系ユーザー、特にデベロッパー向けに開発されたものでした。 [ブロック](/glossary/#block)の[ガス](/glossary/#gas)リミットは、5,000でした。 この「解凍」期間があったおかげで、マイナーはオペレーションを開始し、アーリーアダプターは「急ぐ」必要もなくクライアントをインストールすることができました。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014年 {#2014}

### イーサの販売 {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

イーサは正式に42日間販売され、 BTCでの購入も可能でした。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### イエローペーパーのリリース {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

ギャビン・ウッド博士によって作成されたイエローペーパーには、イーサリアムプロトコルの技術的定義が記されています。

[イエローペーパーを見る](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013年 {#2013}

### ホワイトペーパーのリリース {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

この概要論文は、元々はイーサリアム創始者のヴィタリック・ブテリンにより2013年に発表されました。2015年にプロジェクトが始動する前のことです。

<DocLink to="/whitepaper/">
  ホワイト ペーパー
</DocLink>
