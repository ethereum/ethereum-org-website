---
title: Eth2とメインネットのドッキング
description: ドッキングについて学ぶ - メインネット イーサリアムがビーコンチェーンに結合した時、プルーフオブステークシステムが機能します。
lang: ja
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    "最終的には現在のイーサリアムメインネットはEth2のアップグレードの残りの部分と結合します。",
    'ドッキングは、Eth2ビーコンチェーンとシャーディングシステムと"Eth1"メインネットを統合します。',
    "これはイーサリアムのプルーフオブワークの最後を意味し、プルーフオブステークへの完全な移行を示します。",
    "あなたはこれを技術変遷「フェーズ1.5」としてご存知かもしれません。",
  ]
---

<UpgradeStatus date="~Q1/Q2 2022">
    このアップグレードは、シャードチェーンの到着後に行われます。 しかし、それは <a href="/eth2/vision/">Eth2 vision</a> が完全に実現される瞬間です 。ステーキングがネットワーク全体をサポートし、さらなるスケーラビリティ、セキュリティ、および持続可能性が実現します。
</UpgradeStatus>

## ドッキングとは何ですか? {#what-is-the-docking}

最初に、他の Eth2 アップグレードは [メインネット](/glossary/#mainnet) とは別にリリースされていることを覚えておくことが重要です。 イーサリアムメインネットは [プルーフ・オブ・ワーク](/developers/docs/consensus-mechanisms/pow/)によって引き続き保護されます [ ビーコンチェーン ](/developers/docs/consensus-mechanisms/pow/) と [シャードチェーン](/eth2/beacon-chain/) を [](/eth2/shard-chains/) [ププルーフオブステーク](/developers/docs/consensus-mechanisms/pos/) を使用して並列に実行されます。 ドッキングは、これら 2 つのシステムが統合されるときです。

イーサリアムは恒星間航海にはまだ準備ができていない宇宙船だと想像してください。 ビーコンチェーンとシャードチェーンで、コミュニティは新しいエンジンと強化された船体を構築しました。 適切な時期が来ると、現在の船はこの新しいシステムにドッキングして一隻の船になることができ、数光年にわたる宇宙旅行に旅立つ準備ができます。

## メインネットのドッキング {#docking-mainnet}

準備ができたら、イーサリアムメインネットはビーコンチェーンとドッキングし、 [プローフ・オブ・ワーク](/developers/docs/consensus-mechanisms/pow/)の代わりにプルーフ・オブ・ステークを使用する独自のシャードになります。

Mainnet は、スマートコントラクトを実行する機能をプルーフ・オブ・ステークシステムにもたらします。 加えて、イーサリアムの全歴史と現在の状態は、すべての ETH 保有者とユーザーにとって移行がスムーズになるようにします。

<!-- ### Improving mainnet

Before mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/en/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## ドッキング後 {#after-the-docking}

これはイーサリアムのプルーフ・オブ・ワークの終わりと、より持続可能で環境に優しいイーサリアムの時代を開始を示します。 この時点で、イーサリアムはその [Eth2 ビジョン](/eth2/vision/)に概説された規模、セキュリティ、および持続可能性を持つことになります。

## アップグレード間の関係 {#relationship-between-upgrades}

Eth2 のアップグレードはいくらか相互に関連しています。 ドッキングが他のアップグレードとどのように関連しているかまとめましょう。

### ドッキングとビーコンチェーン {#docking-and-beacon-chain}

ドッキングが発生すると、イーサネットメインネットを検証するためにステーカーが割り当てられます。 シェードチェーンと同じように。 [マイニング](/developers/docs/consensus-mechanisms/pow/mining/) はもう必要なくなり、マイナーは新しいプルーフ・オブ・ステークシステムに投資する可能性が高くなります。

<ButtonLink to="/eth2/beacon-chain/">ビーコンチェーン</ButtonLink>

### ドッキングとシャードチェーン {#docking-and-shard-chains}

メインネットがシャードになることで、シャードチェーンの実装が成功することは、このアップグレードに不可欠です。 移行は、コミュニティがシャーディングへの 2 度目のアップグレードを展開するかどうかを決定する上で重要な役割を果たすと考えられます。 このアップグレードにより、メインネットのような他のシャードが作成されます。より多くのデータを提供するだけでなく、トランザクションやスマートコントラクトを処理できるようになります。

<ButtonLink to="/eth2/shard-chains/">シャードチェーン</ButtonLink>
