---
title: マージ
description: マージについて - メインネットのビーコンチェーンのプルーフ・オブ・ステークシステムへの参加
lang: ja
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: 最終的には現在のEthereumメインネットはビーコンチェーンのプルーフ・オブ・ステークシステムと"マージ"されます。
summaryPoint2: これはEthereumのプルーフ・オブ・ワークの終了と、プルーフ・オブ・ステークへの完全な移行を意味します。
summaryPoint3: これはシャードチェーンのロールアウト前に実装されることが計画されています。
summaryPoint4: 過去には "ドッキング"と呼ばれていました。
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  このアップグレードは、プルーフ・オブ・ステークのコンセンサス形成への公式な移行です。 これにより、エネルギー集約的なマイニングが不要になり、代わりにステークされたイーサを使用してネットワークを運用します。 <a href="/upgrades/vision/">Eth2のビジョン</a>であるスケーラビリティ、セキュリティ、および持続可能性を実現する上での本当にエキサイティングなステップです。
</UpgradeStatus>

## マージとは {#what-is-the-docking}

最初に、[ビーコンチェーン](/upgrades/beacon-chain/)が、現在使われている [メインネット](/glossary/#mainnet) とは別にリリースされたことに留意することが重要です。 Ethereum メインネットは、 [プルーフ・オブ・ワーク(PoW)](/developers/docs/consensus-mechanisms/pow/)によって引き続き保護される一方、ビーコンチェーンは[プルーフ・オブ・ステーク(PoS)](/developers/docs/consensus-mechanisms/pos/) を併用し実行します。 このマージにより、この 2 つのシステムが最終的に結合されます。

イーサリアムは恒星間航海にはまだ準備ができていない宇宙船だと想像してください。 ビーコンチェーンで、コミュニティは新しいエンジンと強化された船体を構築しました。 適切な時期が来ると、現在の船はこの新しいシステムにドッキングして一隻の船になることができ、数光年にわたる宇宙旅行に旅立つ準備ができます。

## メインネットとのマージ {#docking-mainnet}

準備ができたら、Ethereum メインネットはビーコンチェーンと「マージ」し、 [PoW](/developers/docs/consensus-mechanisms/pow/)ではなく、PoS を使用する独自のシャードになります。

メインネットは、スマートコントラクトを実行する機能を PoS にもたらします。 加えて、Ethereum のこれまでの歴史と現在の状態は、すべての ETH 保有者とユーザーにとって移行がスムーズになるよう、そのまま実行できます。

## マージ後 {#after-the-merge}

これにより、Ehtereum の PoW の終わりと、より持続可能で環境に優しい Ethereum 時代の幕開けになります。 この時点で、Ethereum は [Eth2 ビジョン](/upgrades/vision/)に概説された規模、セキュリティ、および持続可能性の実現に一歩近づきます。

マージの実装目標は、PoW から PoS へのシンプルな移行を促進することにあると注意することが重要です。 開発者はこの移行に力を注いでおり、この目標を遅らせる可能性のある追加機能を最小限に抑えています。

**これにより、ステークしたイーサを引き出す機能などのいくつかの機能は、マージが完了してから少し待つ必要があります。** 計画では、これらの機能に対応するためにマージ後の「クリーンアップ」アップグレードを行いますが、これはマージが完了してからすぐに行われる予定です。

## アップグレード間の関係 {#relationship-between-upgrades}

Eth2 の複数のアップグレードは相互の依存関係があります。 それではマージが他のアップグレードとどのように関連しているのか見ていきましょう。

### マージとビーコンチェーン {#docking-and-beacon-chain}

マージが完了すると、割り当てられたステーカーが Ethereum メインネットを検証します。 [マイニング](/developers/docs/consensus-mechanisms/pow/mining/) はもう必要なくなり、マイナーは新しい PoS システムに自分の利益を投資する可能性が高くなります。

<ButtonLink to="/upgrades/beacon-chain/">ビーコンチェーン</ButtonLink>

### マージとマージ後のクリーンアップ {#merge-and-post-merge-cleanup}

マージ直後は、ステークされた ETH を引き出すなどのいくつかの機能はまだサポートされません。 これらは、マージの後に別のアップグレードにて行われる予定です。

最新の [EF 研究開発ブログ](https://blog.ethereum.org/category/research-and-development/) をご覧ください。 ご興味があれば、Vitalik が 2021 年 4 月の ETHGlobal イベントで発表した [マージ後に起こること](https://youtu.be/7ggwLccuN5s?t=101)の詳細をご覧ください。

### マージとシャードチェーン {#docking-and-shard-chains}

もともとの計画では、マージが行われる前に、スケーラビリティに対処するため、シャードチェーンを先に作業する予定でした。 しかし、 [レイヤ 2 スケーリングソリューション](/developers/docs/scaling/#layer-2-scaling)のブームにより、優先順位が変わり、マージの PoW から PoS への切り替えへが優先されました。

これは、無限のスケーラビリティを可能にするためには、潜在的に複数のシャードチェーンを必要とするため、コミュニティからの継続的な評価検証が行われています。

<ButtonLink to="/upgrades/shard-chains/">シャードチェーン</ButtonLink>
