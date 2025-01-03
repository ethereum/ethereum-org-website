---
title: イーサリアムの歴史とフォーク
description: 主要なマイルストーン、リリース、フォークを含むイーサリアムブロックチェーンの歴史。
lang: ja
sidebarDepth: 1
---

# イーサリアムの歴史 {#the-history-of-ethereum}

イーサリアムブロックチェーンの主要なマイルストーン、フォーク、アップデートをすべてまとめたタイムラインです。

<ExpandableCard title="フォークとは？" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

フォークとは、ネットワークに必要となる大規模な技術アップグレードや変更のことで、通常は[イーサリアム改善提案 (EIPs)](/eips/)に基づいて、プロトコルの「規約」を変更するものです。

従来の中央集権型のソフトウェアにおいてアップグレードが必要になった場合、企業はエンドユーザのために新バージョンを公開します。 中央集権型の所有権がないブロックチェーンでは、仕組みが異なります。 [イーサリアムクライアント](/developers/docs/nodes-and-clients/)が新しいフォークルールを実装するには、ソフトウェアのアップデートが必要となります。 さらに、ブロック作成者(プルーフ・オブ・ワークの世界ではマイナー、プルーフ・オブ・ステークの世界ではバリデータ)とノードは、ブロックを作成し、新しいルールに照らし合わせて検証しなければなりません。 [合意メカニズムの詳細](/developers/docs/consensus-mechanisms/)

これらのルール変更により、ネットワークに一時的な分断が生じる可能性があります。 新規ブロックは、新しいルールもしくは古いルールに基づいて生成できます。 フォークは事前に合意されることが一般的で、クライアントが一斉に変更を採用し、アップグレードされたフォークがメインチェーンとなります。 しかし、まれにフォークをめぐる意見の相違により、ネットワークが永久に分断してしまうことがあります。最も有名な例は、[DAO フォーク](#dao-fork)によるイーサリアムクラシックの誕生です。
</ExpandableCard>

[ビーコンチェーン](/upgrades/beacon-chain/)、[マージ](/upgrades/merge/)、[EIP-1559](#london)から過去の重要なアップグレードをご確認ください。

今後のプロトコルアップグレードについては、 [イーサリアムロードマップ上の今後のアップグレードについて](/roadmap/)をご参照ください。

<Divider />

## 2023 年 {#2023}

### 上海(_予定_) {#shanghai}

<Emoji text=":calendar:" size={1} className="me-2 mb-2" />タイムスタンプ: Apr-12-2023 22:27:35 +UTC<br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" />ブロック番号: TBD<br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" />ETH 価格: TBD<br />

<!-- <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/{}/https://ethereum.org/">ethereum.org on waybackmachine</a> -->

#### 要約 {#shanghai-summary}

上海アップグレードにより、実行レイヤーへのステーキングの引き出しが可能になります。 カペラのアップグレードと並行して、ブロックは引き出し操作を受け付けられるようになり、ステーカーはビーコンチェーンから実行レイヤーに ETH を引き出せるようになります。

<ExpandableCard title="上海EIP" contentPreview="Official improvements included in this upgrade.">

- [EIP-3651](https://eips.ethereum.org/EIPS/eip-3651) – 「COINBASE」アドレスウォームを開始
- [EIP-3855](https://eips.ethereum.org/EIPS/eip-3855) – 新しい「PUSH0」命令
- [EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) – リミットとメーターの初期コード
- [EIP-4895](https://eips.ethereum.org/EIPS/eip-4895) – 操作としてのビーコンチェーンのプッシュの引き出し
- [EIP-6049](https://eips.ethereum.org/EIPS/eip-6049) – `SELFDESTRUCT`の廃止

</ExpandableCard>

- [上海のアップグレード仕様を読む](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

---

### カペラ(_予定_) {#capella}

<emoji text=":calendar:" size={1} className="me-2 mb-2" />タイムスタンプ: Apr-12-2023 22:27:35 +UTC<br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" />エポック番号: 194048(スロット 6209536)<br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" />ETH 価格: TBD<br />

<!-- <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/{}/https://ethereum.org/en/">ethereum.org on waybackmachine</a> -->

#### 要約 {#capella-summary}

カペラのアップグレードは、コンセンサスレイヤー(ビーコンチェーン)に対する 3 番目の主要なアップグレードであり、ステーキングの引き出しが可能になります。 カペラは、実行レイヤーで行われる上海のアップグレードと同時に行われ、お互いに同期して引き出し機能を有効にします。

このコンセンサスレイヤーのアップグレードにより、最初の入金で引き出し認証情報を提供しなかったステーカーによる引き出しが可能になります。

また、このアップグレードによって、自動アカウントスイープ機能も実装されるため、バリデータアカウントを継続的に処理し、報酬の支払いや全額引き出しができるようになります。

- [ステーキングの引き出しについての詳細](/staking/withdrawals/)
- [カペラのアップグレード仕様を読む](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 年 {#2022}

### パリ(マージ) {#paris}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /><code>Sep-15-2022 06:42:42 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" />ブロック番号: <a href="https://etherscan.io/block/15537394">15537394</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" />ETH 価格: $1,472 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20220915075314/https://ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#paris-summary}

パリのアップグレードは、58750000000000000000000 の[最終合計難易度](/glossary/#terminal-total-difficulty)に到達した時点でプルーフ・オブ・ワークのブロックチェーンによってトリガーされました。 2022 年 9 月 15 日にブロック 15537393 で発生し、次のブロックでパリのアップグレードがトリガーされたものです。 パリは、[マージ](/upgrades/merge/)への移行でした。主要な変更は、[プルーフ・オブ・ワーク](/developers/docs/consensus-mechanisms/pow)のマイニングアルゴリズムと関連するコンセンサスロジックをオフにして、代わりに[プルーフ・オブ・ステーク](/developers/docs/consensus-mechanisms/pos)をオンにするというものでした。 パリ自体は、[実行クライアント](/developers/docs/nodes-and-clients/#execution-clients)へのアップグレード(コンセンサスレイヤーのベラトリックスに相当)であり、接続されている[コンセンサスクライアント](/developers/docs/nodes-and-clients/#consensus-clients)からの指示を可能にしましたが、 これにより、[エンジン API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md)と称される新しい一連の内部 API メソッドを有効にする必要がありました。 このアップグレードは間違いなく、 [ホームステッド](#homestead)以来、イーサリアム史上最も重要なものとなりました。

- [パリのアップグレード仕様を読む](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="パリEIP" contentPreview="Official improvements included in this upgrade.">

- [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) – コンセンサスをプルーフ・オブ・ステークにアップグレード
- [EIP-4399](https://eips.ethereum.org/EIPS/eip-4399) – PREVRANDAO で DIFFICULTY オペコードを置き換える

</ExpandableCard>

---

### ベラトリックス {#bellatrix}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /><code>Sep-06-2022 11:34:47 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" />エポック番号: 144,896<br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" />ETH 価格: $1,558 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20220906112525/https://ethereum.org/en/">waybackmachine 上の ethereum.org</a>

#### 要約 {#bellatrix-summary}

ベラトリックスのアップグレードは、[ビーコンチェーン](/upgrades/beacon-chain)で 2 番目にスケジュールされたアップグレードで、 [マージ](/upgrades/merge/)へ向けてチェーンを準備しました。 これにより、バリデータのペナルティを、非アクティブおよびスラッシング可能な違反に対して完全な値にしました。 ベラトリックスには、マージ向けチェーンと、最後のプルーフ・オブ・ワークのブロックから最初のプルーフ・オブ・ステークのブロックへの移行を準備するためのフォーク選択ルールのアップデートも含まれます。 このアップグレードで、コンセンサスクライアントに 58750000000000000000000000 の[最終合計難易度](/glossary/#terminal-total-difficulty)を認識させます。

- [ベラトリックスのアップデート仕様を読む](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### グレイ・グレイシャー {#gray-glacier}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /><code>Jun-30-2022 10:54:04 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" />ブロック番号: <a href="https://etherscan.io/block/15050000">15,050,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" />ETH 価格: $1,069 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20220630094629/https://ethereum.org/en/">waybackmachine 上の ethereum.org</a>

#### 要約 {#gray-glacier-summary}

グレイ・グレイシャー・ネットワークのアップグレードによって、[ディフィカルティボム](/glossary/#difficulty-bomb)は 3 ヶ月延期となりました。 これが今回のアップグレードで導入された唯一の変更であり、[アロー・グレイシャー](#arrow-glacier)と[ミュア・グレーシャー](#muir-glacier)と似た性質のアップグレードとなります。 [ビザンチウム](#byzantium)、[コンスタンティノープル](#constantinople)、[ロンドン](#london)のネットワークアップグレードで同様の変更が実施されています。

- [EF ブログ - アロー・グレイシャーのアップグレードのお知らせ](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="グレイ・グレイシャーEIP" contentPreview="Official improvements included in this upgrade.">

- [EIP-5133](https://eips.ethereum.org/EIPS/eip-5133) – 2022 年 9 月までディフィカルティボムを延期

</ExpandableCard>

<Divider />

## 2021 年 {#2021}

### アロー・グレイシャー {#arrow-glacier}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /><code>Dec-09-2021 07:55:23 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" />ブロック番号: <a href="https://etherscan.io/block/13773000">13,773,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" />ETH 価格: $4111 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20211207064430/https://ethereum.org/en/">waybackmachine 上の ethereum.org</a>

#### 要約 {#arrow-glacier-summary}

アロー・グレイシャーのネットワークのアップグレードにより、[ディフィカルティボム](/glossary/#difficulty-bomb)は数ヶ月延期されました。 これが今回のアップグレードで導入された唯一の変更であり、[ミュア・グレイシャー](#muir-glacier)と似た性質のアップグレードとなります。 同様の変更は、[ビザンチウム](#byzantium)、[コンスタンティノープル](#constantinople)および[ロンドン](#london)のネットワークアップグレードで行われています。

- [EF ブログ - アロー・グレイシャーのアップグレードのお知らせ](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - イーサリアムのアロー・グレイシャーのアップグレード](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="アロー・グレイシャーEIP" contentPreview="Official improvements included in this upgrade.">

- [EIP-4345](https://eips.ethereum.org/EIPS/eip-4345) – 2022 年 6 月までデフィカルティボムを順延

</ExpandableCard>

---

### アルタイル {#altair}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /><code>Oct-27-2021 10:56:23 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" />エポック番号: 74,240<br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" />ETH 価格: $4024 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20211026174951/https://ethereum.org/en/">waybackmachine 上の ethereum.org</a>

#### 要約 {#altair-summary}

アルタイルのアップグレードは、 [ビーコンチェーン](/upgrades/beacon-chain)で最初に計画されたアップグレードです。 ライトクライアントをサポートするための「同期委員会」を追加しました。また、マージに向けた開発が進むにつれて、バリデータの非アクティブ化とスラッシングのペナルティが増加しました。

- [アルタイルのアップデート仕様を読む](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <emoji text=":tada:" size={1} me="0.5rem" />豆知識 {#altair-fun-fact}

アルタイルは、正確な実装時間があらかじめ設定された最初の主要なネットワークアップグレードでした。 それまでのアップグレードはすべて、ブロックタイムにばらつきがあるプルーフ・オブ・ワーク・チェーン上のブロック番号に基づいていました。 ビーコンチェーンは、プルーフ・オブ・ワークを必要としない代わりに、バリデータがブロックを提案できる 32 秒の「スロット」からなる時間ベースのエポックシステムで動作します。 こうした理由から、エポック 74,240 に到達してアルタイルが実装されるタイミングを把握することができたのです。

- [ブロックタイム](/developers/docs/blocks/#block-time)

---

### ロンドン {#london}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Aug-05-2021 12:33:42 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/12965000">12,965,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $2621 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20210805124609/https://ethereum.org/en/">waybackmachine 上の ethereum.org</a>

#### 要約 {#london-summary}

ロンドンのアップグレードでは、 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)を導入し、トランザクションフィーの市場を改革するとともに、ガスの払い戻し方法や[氷河期](/glossary/#ice-age)のスケジュールを変更しました。

- [dapp デベロッパーの方は、 ライブラリとツールをアップグレードしてください。](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [イーサリアム・ファウンデーションのお知らせを読む](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Ethereum Cat Herder の説明を読む](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="ロンドンEIP" contentPreview="Official improvements included in this upgrade.">

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) – トランザクションフィー市場の改善。
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198) – ブロックから`BASEFEE`を返却。
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) - EVM 運用のためのガス払い戻しを削減。
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) - 0xEF`で始まるコントラクトのデプロイを防止。
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) – 2021 年 12 月までアイス・グレイシャーを順延。

</ExpandableCard>

---

### ベルリン {#berlin}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Apr-15-2021 10:07:03 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/12244000">12,244,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $2454 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20210415093618/https://ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#berlin-summary}

ベルリンアップグレードにより、特定の EVM 活動に対するガスコストが最適化され、複数処理タイプへのサポートが向上しました。

- [イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Ethereum Cat Herder の説明を読む](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="ベルリンEIP" contentPreview="Official improvements included in this upgrade.">

- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565) – ModExp のガスコストを削減。
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) – 複数のトランザクションタイプへの対応を簡素化。
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) – ステートアクセスオペコードのガスコストを増加。
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) – 任意アクセスリストを追加。

</ExpandableCard>

<Divider />

## 2020 年 {#2020}

### ビーコンチェーンの誕生 {#beacon-chain-genesis}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Dec-01-2020 12:00:35 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ビーコンチェーンのブロック番号: <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $586.23 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">waybackmachine 上の ethereum.org</a>

#### 要約 {#beacon-chain-genesis-summary}

[ビーコンチェーン](/upgrades/beacon-chain/)を安全にリリースするためには、32ETH をデポジットするステーキング参加者が 16384 に達することが必要条件でした。 11 月 27 日にこの数に到達したことで、2020 年 12 月 1 日にビーコンチェーンがブロックを生産することになりました。 これは、[イーサリアムのビジョン](/roadmap/vision/)を達成するための重要な第一歩です。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/upgrades/beacon-chain/">
  ビーコンチェーン
</DocLink>

---

### ステーキングのデポジットコントラクトのデプロイ {#staking-deposit-contract}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Oct-14-2020 09:22:52 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/11052984">11,052,984</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $379.04 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">waybackmachine 上の ethereum.org</a>

#### 要約 {#deposit-contract-summary}

ステーキングのデポジットコントラクトによって、イーサリアムエコシステムに[ステーキング](/glossary/#staking)が導入されました。 [メインネット](/glossary/#mainnet)上のコントラクトですが、重要な[イーサリアムアップグレード](/upgrades/beacon-chain/)である[ビーコンチェーン](/upgrades/)の立ち上げスケジュールに大きな影響を与えました。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  ステーキング
</DocLink>

---

### ミュア・グレイシャー {#muir-glacier}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Jan-02-2020 08:30:49 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/9200000">9,200,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $127.18 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#muir-glacier-summary}

ミュア・グレイシャーのフォークでは、[ディフィカルティボム](/glossary/#difficulty-bomb)の順延が導入されました。 [プルーフ・オブ・ワーク](/developers/docs/consensus-mechanisms/pow/)合意メカニズムのブロック難易度の上昇は、トランザクションの送信や Dapps の使用にかかる待ち時間を増加させることで、イーサリアムの使い勝手を低下させる恐れがありました。

- [イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Ethereum Cat Herder の説明を読む](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="ミュア・グレイシャーEIP" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) - ディフィカルティボムをさらに 4,000,000 ブロック(～ 611 日)延期。

</ExpandableCard>

<Divider />

## 2019 年 {#2019}

### イスタンブール (Istanbul) {#istanbul}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Dec-08-2019 12:25:09 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/9069000">9,069,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $151.06 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#istanbul-summary}

イスタンブールのフォーク

- [EVM](/glossary/#gas)内の特定のアクションの[ガス](/developers/docs/ethereum-stack/#ethereum-virtual-machine)コストを最適化。
- DOS 攻撃からの耐性を向上。
- SNARKs と STARKs に基づいた[レイヤー 2 スケーリング](/developers/docs/scaling/#layer-2-scaling)ソリューションのパフォーマンスを向上。
- イーサリアムと Zcash の相互運用を有効化。
- コントラクトに多数のクリエイティブな機能の導入を許可。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="イスタンブールEIP" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) - イーサリアムが Zcash のようなプライバシーを保護する通貨と連携することを許可。
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) - [gas](/glossary/#gas)のコストを改善するための安価な暗号化。
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) - `CHAINID` [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine)を追加することによってリプレイ攻撃からイーサリアムを保護。
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) - 消費量に基づく opcode ガス価格の最適化。
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) - ブロック内に、より多くのデータを格納するために CallData のコストを削減。 - [レイヤー 2 スケーリング](/developers/docs/scaling/#layer-2-scaling)に良い。
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) - 他のオペコードのガス価格の変更。

</ExpandableCard>

---

### コンスタンティノープル {#constantinople}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Feb-28-2019 07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/7280000">7,280,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $136.29 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#constantinople-summary}

コンスタンティノープルのフォーク

- [プルーフ・オブ・ステーク](#beacon-chain-genesis)実装前にブロックチェーンがフリーズしなかったことを確認しました。
- [EVM](/glossary/#gas)内の特定のアクションの[ガス](/developers/docs/ethereum-stack/#ethereum-virtual-machine)コストを最適化しました。
- まだ作成されていないアドレスとやり取りする機能を追加しました。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="コンスタンティノープルEIP" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – 特定のオンチェーンアクションのコストを最適化。
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – まだ作成されていないアドレスとのやり取りを許可。
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – 特定のオンチェーンアクションのコストを最適化。
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – ブロックチェーンがプルーフ・オブ・ステーク実装前にフリーズしないよう確認。

</ExpandableCard>

<Divider />

## 2017 年 {#2017}

### ビザンチウム {#byzantium}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Oct-16-2017 05:22:11 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/4370000">4,370,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $334.23 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#byzantium-summary}

ビザンチウムのフォーク

- ブロックの[マイニング](/developers/docs/consensus-mechanisms/pow/mining/)報酬が 5ETH から 3ETH へ減額されました。
- [ディフィカルティボム](/glossary/#difficulty-bomb)を 1 年延期しました。
- 他のコントラクトに対して、状態変更を行わない呼び出しを行う機能を追加しました。
- [レイヤー 2 スケーリング](/developers/docs/scaling/#layer-2-scaling)を可能にする特定の暗号技術を追加しました。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="ビザンチウムEIP" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) - `REVERT`オペコードを追加。
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) - 成功か失敗かを示すために、トランザクションのレシートにステータスフィールドが追加。
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) - [ZK-Snarks](/developers/docs/scaling/zk-rollups/)を可能にするために楕円曲線とスカラ乗算を追加。
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) - [ZK-Snarks](/developers/docs/scaling/zk-rollups/)を可能にするために楕円曲線とスカラ乗算を追加。
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) - RSA 署名の検証を有効化。
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) - 可変長の戻り値のサポートを追加。
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) - `STATICCALL`オペコードを追加し、他のコントラクトへの非状態変化コールを有効化。
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) - 難易度調整式を変更。
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) - [ディフィカルティボム](/glossary/#difficulty-bomb)を 1 年延期し、ブロック報酬を 5 から 3ETH に減額。

</ExpandableCard>

<Divider />

## 2016 年 {#2016}

### スプリニアスドラゴン (Spurious Dragon) {#spurious-dragon}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Nov-22-2016 04:15:44 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/2675000">2,675,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $9.84 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#spurious-dragon-summary}

スプリニアスドラゴンのフォークは、サービス拒否(DoS)攻撃に対する第 2 弾の対策でした。下記にその一部をご紹介します。

- 将来のネットワーク攻撃を防ぐために、オペコードの価格を調整。
- ブロックチェーンステートの「デブロート」を有効化。
- リプレイ攻撃に対する保護を追加。

[Ethereum 財団の発表を読む](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="スプリニアスドラゴンEIP" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) - あるイーサリアムチェーンからのトランザクションが、たとえばテストネットのトランザクションがメインのイーサリアムチェーンで再生されるなど、代替チェーン上で再ブロードキャストされることを防ぐ。
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) - `EXP`オペコードの価格を調整 - 計算コストのかかるコントラクト操作によってネットワークをスローダウンすることで複雑化する。
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) - DOS 攻撃で追加された空のアカウントを削除可能にする。
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) - ブロックチェーン上のコントラクトの最大コードサイズを 24576 バイトに変更する。

</ExpandableCard>

---

### タンジェリンホイッスル {#tangerine-whistle}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Oct-18-2016 01:19:31 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/2463000">2,463,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $12.50 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#tangerine-whistle-summary}

タンジェリンホイッスルのフォークは、サービス拒否(DoS)攻撃に対する第 1 弾の対策でした。下記にその一部をご紹介します。

- 安価な操作コードに関する緊急のネットワーク健全性問題への対処。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="タンジェリンホイッスルEIP" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – スパム攻撃に使えるようにオペコードのガスコストの増加。
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – イーサリアムプロトコルの初期バージョンの欠陥により、非常に低いコストでステートに置かれた大量の空のアカウントを削除することにより、ステートのサイズを縮小。

</ExpandableCard>

---

### DAO フォーク {#dao-fork}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Jul-20-2016 01:20:40 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/1920000">1,920,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $12.54 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#dao-fork-summary}

DAO フォークは、安全でない[自律分散型組織(DAO)](/glossary/#dao)のコントラクトが、1 回のハッキングによって、360 万以上の ETH を流出させた[2016 年の DAO 攻撃](https://www.coindesk.com/markets/2016/06/25/understanding-the-dao-attack/)に対する対策でした。 フォークにより、欠陥のあるコントラクトから[新しいコントラクト](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754)に資金が移されました。その際に使用した関数が withdraw です。 資金を失った人がウォレット内の 100DAO トークンごとに 1ETH を引き出せるようにしました。

この行動指針は Ethereum コミュニティの投票で行われました。 ETH 保有者は、 [投票プラットフォーム](http://v1.carbonvote.com/)でトランザクションを通じて投票することができました。 フォークの実行は、投票の 85%以上に支持されました。

DAO 事件はプロトコルの不具合によるものではなかったため、一部のマイナーはフォークを拒否しました。 その後 [イーサリアムクラシック](https://ethereumclassic.org/)を形成しました。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### ホームステッド {#homestead}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Mar-14-2016 06:49:53 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/1150000">1,150,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $12.50 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#homestead-summary}

未来を見据えたホームステッドのフォークで、 一部のプロトコル変更とネットワーク変更が含まれていたことで、イーサリアムはネットワークの追加アップグレードを行うことができました。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="ホームステッドEIP" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – コントラクト作成プロセスの編集。
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – `DELEGATECALL`オペコードの追加 。
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – devp2p フォワード互換性要求の導入。

</ExpandableCard>

<Divider />

## 2015 年 {#2015}

### フロンティアソーイング {#frontier-thawing}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Sep-07-2015 09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/200000">200,000</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: $1.24 USD<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#frontier-thawing-summary}

フロンティアソーイングのフォークでは、1[ブロック](/glossary/#gas)あたり 5,000 の[ガス](/glossary/#block)リミットが解除され、デフォルトのガス価格が 51[gwei](/glossary/#gwei)に設定されました。 その結果、21,000 のガスが必要となるトランザクションが可能になりました。 [ディフィカルティボム](/glossary/#difficulty-bomb)は、[プルーフ・オブ・ステーク](/glossary/#pos)にハードフォークするために導入されました。

- [イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [イーサリアムプロトコルのアップデート 1 を読む](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### フロンティア {#frontier}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> <code>Jul-30-2015 03:26:13 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} className="me-2 mb-2" /> ブロック番号: <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} className="me-2 mb-2" /> ETH 価格: N/A<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">waybackmachine 上の ethereum.org</a>

#### 要約 {#frontier-summary}

フロンティアは稼動していましたが、イーサリアムプロジェクトのベアボーン実装でした。 フオリンピックのテストフェーズの成功を受けて実装されたものであり、 技術系ユーザー、特にデベロッパー向けに開発されたものでした。 [ブロック](/glossary/#block)の[ガス](/glossary/#gas)リミットは、5,000 でした。 この「解凍」期間があったおかげで、マイナーはオペレーションを開始し、アーリーアダプターは「急ぐ」必要もなくクライアントをインストールすることができました。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 年 {#2014}

### イーサの販売 {#ether-sale}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> 2014 年 7 月 22 日～ 9 月 2 日<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">waybackmachine 上の ethereum.org</a>

イーサは正式に 42 日間販売され、 BTC での購入も可能でした。

[イーサリアム・ファウンデーションの発表を読む](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### イエローペーパーのリリース {#yellowpaper}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> 2014 年 4 月 1 日<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">waybackmachine 上の ethereum.org</a>

ギャビン・ウッド博士によって作成されたイエローペーパーには、イーサリアムプロトコルの技術的定義が記されています。

[イエローペーパーを見る](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 年 {#2013}

### ホワイトペーパーのリリース {#whitepaper}

<emoji text=":calendar:" size={1} className="me-2 mb-2" /> 2013 年 11 月 27 日<br /> <Emoji text=":desktop_computer:" size={1} className="me-2 mb-2" /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">waybackmachine 上の ethereum.org</a>

この概要論文は、元々はイーサリアム創始者のヴィタリック・ブテリンにより 2013 年に発表されました。2015 年にプロジェクトが始動する前のことです。

<DocLink href="/whitepaper/">
  ホワイト ペーパー
</DocLink>
