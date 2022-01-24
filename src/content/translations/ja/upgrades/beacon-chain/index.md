---
title: ビーコンチェーン
description: ビーコンチェーンについて学ぶ - イーサリアムへの最初の主要なEth2アップグレード。
lang: ja
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/core.png
summaryPoint1: ビーコンチェーンは、私たちが今日使用しているEthereumを変えるものではありません。
summaryPoint2: これはネットワークの調整です。
summaryPoint3: Ethereumエコシステムにプルーフ・オブ・ステークを導入するものです。
summaryPoint4: 技術ロードマップの「フェーズ0」としも知られています。
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    ビーコンチェーンは2020年12月1日正午(UTC)にリリースされました。 詳細については、 <a href="https://beaconscan.com/">データ</a> を参照してください。 このビーコンチェーンの正当性は、 <a href="/staking/">ETHを投資</a>することで援助できます。
</UpgradeStatus>

## ビーコンチェーンとは何をするものでしょう? {#what-does-the-beacon-chain-do}

ビーコンチェーンは [分割データ](/upgrades/shard-chains/) と [投資者](/staking/)の拡張ネットワークを管理・調整します。 しかし、それは今日の [Ethereum メインネット](/glossary/#mainnet) のようなものではありません。 アカウントやスマートコントラクトは処理できません。

ビーコンチェーンの役割は時間の経過とともに変わりますが、これは、私たちが取り組んでいる、安全で持続可能、そして拡張性のあるイーサリアム[ ](/upgrades/vision/)の基本的な構成要素となります。

## ビーコンチェーンの機能 {#beacon-chain-features}

### ステーキングの紹介 {#introducing-staking}

ビーコンチェーンにより、 [プルーフ・オブ・ステーク](/developers/docs/consensus-mechanisms/pos/) がイーサリアムに導入されます。 これは、イーサリアムの安全を保つための新しい方法です。 イーサリアムをより健全にし、その過程でさらに ETH を稼ぐことができるようにする公共の利益のように考えてください。 実際には、検証ソフトウェアを有効にするために ETH を投資する必要があります。 バリデータとして、トランザクションを処理し、チェーン内に新しいブロックを作成します。

ステーキングとバリデータになることは、 [マイニング](/developers/docs/mining/) （現在ネットワークが保護されている方法）よりも簡単です。 そして、これはイーサリアムを長期的にはより安全にするのに役立つことを期待しています。 ネットワークに参加する人が多いほど、攻撃からより分散化され、安全になります。

<InfoBanner emoji=":money_bag:">
バリデータになり、ビーコンチェーンの安全性を確保することに興味がある場合、 <a href="/staking/">ステーキングの詳細について</a> を参照してください。
</InfoBanner>

また、これはもう１つの Eth ２のアップグレードである[シャードチェーン](/upgrades/shard-chains/)にとって重要な変更です。

### シャードチェーンの設定 {#setting-up-for-shard-chains}

メインネットがビーコンチェーンに統合された後、次のアップグレードでは、プルーフ・オブ・ステークのネットワークにシャードチェーンが導入されます。 これらの「シャード(破片、かけらという意味)」は、ネットワークを 64 個のブロックチェーンに拡張するので、ネットワークの容量を増やし、処理速度を向上させます。 ビーコンチェーンは、安全に動作するためにステーキングを必要とするため、シャードチェーンを導入する上で重要な第一歩です。

最終的にビーコンチェーンは、シャードチェーンを検証するためにランダムにステーカーを割り当てる責任があります。 これは、ステーカーが共謀してシャードを乗っ取ることを困難にするための重要なポイントです。 乗っ取りは [1 兆分の 1 未満の確率](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20)となります。

## アップグレード間の関係 {#relationship-between-upgrades}

Eth2 のアップグレードはいくらか相互に関連しています。 ビーコンチェーンが他のアップグレードにどのように影響するかまとめましょう。

### メインネットとビーコンチェーン {#mainnet-and-beacon-chain}

ビーコンチェーンは、最初は、今日使用する Ethereum メインネットとは別に存在します。 しかし、やがてそれらはつながります。 この計画は、メインネットをビーコンチェーンによって管制制御されたプルーフ・オブ・ステークシステムにマージ(統合)することです。

<ButtonLink to="/upgrades/merge/">マージ</ButtonLink>

### シャードとビーコンチェーン {#shards-and-beacon-chain}

シャードチェーンは、プルーフ・オブ・ステークのコンセンサス形成メカニズムにより、Ethereum のエコシステムに安全に参加することができます。 ビーコンチェーンはステーキングを導入し、シャードチェーンのアップグレードへの道を開きます。

<ButtonLink to="/upgrades/shard-chains/">シャードチェーン</ButtonLink>

<Divider />

## ビーコンチェーンとのやり取り {#interact-with-beacon-chain}

<BeaconChainActions />
