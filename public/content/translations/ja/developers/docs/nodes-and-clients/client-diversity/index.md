---
title: "クライアントの多様性"
description: "イーサリアムクライアントの多様性の重要性についての概説"
lang: ja
sidebarDepth: 2
---

イーサリアムノードの動作は、ノードが実行するクライアントソフトウェアによって制御されています。 プロダクションレベルのイーサリアムクライアントは複数存在しており、それぞれ別のチームにより、異なるプログラミング言語で開発され、保守されています。 これらのクライアントは共通の仕様に基づいて構築されており、クライアント間のシームレスな連携、共通する機能、同等のユーザーエクスペリエンスを提供しています。 しかしながら、現時点ではクライアントの占有率は偏ってしまっており、ネットワークの安全性が最大限にまで高められていません。 クライアントの多様性を可能な限り高めるには、クライアント別の利用者数は同程度になることが望ましいです。

## 前提条件{#prerequisites}

ノードやクライアントについてまだ理解していない場合は、[ノードとクライアント](/developers/docs/nodes-and-clients/)をご覧ください。 [実行](/glossary/#execution-layer)レイヤーと[コンセンサス](/glossary/#consensus-layer)レイヤーは、用語集で定義されています。

## クライアントが複数ある理由 {#why-multiple-clients}

独立して開発・保守されるクライアントが複数存在するのは、クライアントの多様性が攻撃やバグに対するネットワークの耐性を高めるからです。 複数のクライアントがあることはイーサリアム固有の強みです。他のブロックチェーンでは、単一のクライアントに依存しており、そのクライアントに絶対に誤りがないという前提に基づいています。 しかし、ただ複数のクライアントがあるだけでは不十分です。クライアントはコミュニティで採用され、すべてのアクティブノードが比較的均等に複数のクライアントに分散している必要があります。

## クライアント実装の多様性が重要な理由 {#client-diversity-importance}

独立して開発・保守される多くのクライアントがあることは、分散型ネットワークの健全性には不可欠です。 この理由を探ってみましょう。

### バグ {#bugs}

個々のクライアントにあるバグは、そのクライアントがイーサリアムノードのマイノリティである場合は、ネットワークへのリスクは低くなります。 多数のクライアントにノードがほぼ均等に分散しているならば、大半のクライアントで共通の問題がある可能性は小さいため、結果的としてネットワークはより堅牢になります。

### 攻撃耐性 {#resilience}

クライアントの多様性は、攻撃に対する耐性も同時にもたらします。 例えば、[特定のクライアントを騙して](https://twitter.com/vdWijden/status/1437712249926393858)特定のチェーンブランチに誘導する攻撃は、他のクライアントが同様の方法で悪用される可能性が低く、正規のチェーンは破損しないままであるため、成功する可能性は低いです。 クライアントの多様性が低いほど、多数派のクライアントへの攻撃に関するリスクが高まります。 クライアントの多様性がネットワーク上の悪意のある攻撃に対する重要な防御となることは、すでに証明されています。例えば、2016年の上海でのサービス拒否攻撃は、攻撃者が支配的なクライアント(Geth)を騙して、ブロックごとに何万回も遅いディスクi/o操作を実行させることができたために可能でした。 この脆弱性を持たない他のクライアントもオンラインであったため、イーサリアムはGethの脆弱性が修正されている間も攻撃に耐え、稼働を続けることができました。

### プルーフ・オブ・ステークのファイナリティ {#finality}

イーサリアムノードの33%以上を占めるコンセンサスクライアントのバグがあると、コンセンサスレイヤーのファイナライズを妨げる可能性があります。つまり、トランザクションの取り消しや改ざんが発生するおそれがあります。 これはイーサリアム上に構築された多くのアプリ、特に分散型金融(DeFi)にとって非常に大きな問題となります。

<Emoji text="🚨" className="me-4" /> さらに悪いことに、3分の2の多数を占めるクライアントの重大なバグにより、チェーンが<a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">誤って分割されファイナライズされる</a>ことで、多数のバリデータが無効なチェーン上で立ち往生する可能性があります。 これらのバリデータが正しいチェーンに再び参加しようとする場合、スラッシングのペナルティを受けるか、時間がかかり高額となる任意退出後に、再度アクティベーションを行います。 スラッシングの規模は過失のあるノードの数に比例し、3分の2のマジョリティが最大のスラッシング(32 ETH)を受けます。

これらは可能性が低いシナリオですが、アクティブなノードにクライアントを均等に分散することで、イーサリアムのエコシステムはリスクを軽減することが出来ます。 特定のコンセンサスクライアントが、全ノードの33%のシェアを占めないことが理想です。

### 共同責任 {#responsibility}

マジョリティクライアントを維持するためには人件費もかかります。 小規模な開発チームは過剰な負担と責任を負わなければなりません。 クライアントの多様性が低いほど、マジョリティクライアントを保守するデベロッパーの責任が大きくなります。 この責任を複数のチームに分散させることは、イーサリアムのノードネットワークの健全性と、人々の繋がりの両方にとって望ましいことです。

## 現在のクライアントの多様性 {#current-client-diversity}

### 実行クライアント {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### コンセンサスクライアント {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "その他", value: 0.07 }
]}
/>

この図は古い可能性があります。最新情報については、[ethernodes.org](https://ethernodes.org)および[clientdiversity.org](https://clientdiversity.org)をご覧ください。

上記の2つの円グラフは、実行レイヤーとコンセンサスレイヤーの現在のクライアントの多様性のスナップショットを示しています(2025年10月執筆時点)。 クライアントの多様性は年々改善されており、実行レイヤーでは[Geth](https://geth.ethereum.org/)による支配が減少し、[Nethermind](https://www.nethermind.io/nethermind-client)が僅差で2位、[Besu](https://besu.hyperledger.org/)が3位、[Erigon](https://github.com/ledgerwatch/erigon)が4位となり、その他のクライアントがネットワークの3%未満を占めています。 コンセンサスレイヤーで最も一般的に使用されているクライアントである[Lighthouse](https://lighthouse.sigmaprime.io/)は、2番目に多く使用されているクライアントとかなり僅差です。 [Prysm](https://prysmaticlabs.com/#projects)と[Teku](https://consensys.net/knowledge-base/ethereum-2/teku/)がそれぞれ約31%と約14%を占め、その他のクライアントはほとんど使用されていません。

実行レイヤーのデータは、2025年10月26日に[supermajority.info](https://supermajority.info/)から取得したものです。 コンセンサスクライアントのデータは[Michael Sproul](https://github.com/sigp/blockprint)から取得しました。 コンセンサスレイヤーのクライアントは、コンセンサスクライアントを識別するための明確な痕跡を常に持っているわけではないため、コンセンサスクライアントのデータを取得することが難しい場合があります。 このデータは、マイノリティクライアントの一部を時々混同する分類アルゴリズムを使用して生成されました(詳細は[こちら](https://twitter.com/sproulM_/status/1440512518242197516)を参照)。 上の図では、これらの曖昧な分類は、どちらか一方のラベル(例: Nimbus/Teku)で記載されています。 いずれにせよ、ネットワークのマジョリティがPrysmを実行していることは明白です。 これはスナップショットに過ぎませんが、図中の値は、クライアントの多様性の現状をよく表すものです。

コンセンサスレイヤーに関する最新のクライアント多様性データは、[clientdiversity.org](https://clientdiversity.org/)で入手できます。

## 実行レイヤー {#execution-layer}

これまでクライアントの多様性に関する議論は、主にコンセンサスレイヤーに焦点が当てられていました。 しかし、実行クライアントの[Geth](https://geth.ethereum.org)は現在、全ノードの約85%を占めています。 この高い占有率は、コンセンサスクライアントと同じ理由で問題になります。 例えば、トランザクション処理や実行ペイロードの構築に影響を与えるバグがGethにあると、コンセンサスクライアントが問題や不具合のあるトランザクションをファイナライズする可能性があります。 そのため、使われる実行クライアントがより均一に分散されると、イーサリアムの健全性が高まります。ネットワークの33%以上を占めるクライアントが存在しないことが理想です。

## マイノリティクライアントを使用する {#use-minority-client}

クライアントの多様性に対応するには、個々のユーザーがマイノリティクライアントを選ぶだけでなく、バリデータプールや、メジャーな分散型アプリ(Dapp)や取引所などの機関がクライアントを切り替えることも必要です。 しかし、すべてのユーザーは現在の不均衡を是正し、利用可能なすべてのイーサリアムソフトウェアの使用の正常化に向けて貢献することができます。 マージ後はすべてのノードオペレーターは、実行クライアントとコンセンサスクライアントの両方を実行する必要があります。 以下に示すクライアントの組み合わせを選ぶことは、クライアントの多様性の向上につながります。

### 実行クライアント {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### コンセンサスクライアント {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

ノードオペレーターを大多数を占めるクライアントからの移行を奨励し、移行プロセスを加速できるよう、技術系のユーザーはマイノリティクライアント向けのチュートリアルやドキュメントの作成にご協力ください。 マイノリティのコンセンサスクライアントに切り替えるためのガイドは、[clientdiversity.org](https://clientdiversity.org/)で入手できます。

## クライアントの多様性ダッシュボード {#client-diversity-dashboards}

実行レイヤーとコンセンサスレイヤーのクライアントの多様性に関するリアルタイムの統計情報を提供しているダッシュボードがいくつかあります。

**コンセンサスレイヤー:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**実行レイヤ:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## 参考リンク{#further-reading}

- [イーサリアムのコンセンサスレイヤーにおけるクライアントの多様性](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [イーサリアムマージ：多数派クライアントの実行は自己責任で！](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest、2022年3月24日_
- [クライアントの多様性の重要性](https://our.status.im/the-importance-of-client-diversity/)
- [イーサリアムノードサービス一覧](https://ethereumnodes.com/)
- [クライアント多様性問題の「5つのなぜ」](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [イーサリアムの多様性とその解決策(YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## 関連トピック{#related-topics}

- [イーサリアムノードを運用する](/run-a-node/)
- [ノードとクライアント](/developers/docs/nodes-and-clients/)
