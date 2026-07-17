---
title: "マイニングアルゴリズム"
description: "イーサリアムのマイニングで使用されるアルゴリズムの詳細な解説。"
lang: ja
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
プルーフ・オブ・ワーク (PoW) はもはやイーサリアムのコンセンサス・メカニズムの基盤ではなくなり、マイニングは終了しました。代わりに、イーサリアムはETHをステークするバリデータによって保護されています。今日からETHのステーキングを始めることができます。詳しくは、<a href='/roadmap/merge/'>マージ</a>、<a href='/developers/docs/consensus-mechanisms/pos/'>プルーフ・オブ・ステーク (PoS)</a>、および<a href='/staking/'>ステーキング</a>をお読みください。このページは歴史的な関心のためにのみ残されています。
</AlertDescription>
</AlertContent>
</Alert>

イーサリアムのマイニングでは、イーサッシュと呼ばれるアルゴリズムが使用されていました。このアルゴリズムの基本的な考え方は、マイナーがブルートフォース計算を使用してナンス入力を探し出し、その結果得られるハッシュが計算された難易度によって決定されるしきい値よりも小さくなるようにすることです。この難易度レベルは動的に調整できるため、ブロックの生成を一定の間隔で行うことができます。

## 前提条件 {#prerequisites}

このページをより深く理解するために、まずは[プルーフ・オブ・ワーク (PoW) コンセンサス](/developers/docs/consensus-mechanisms/pow)と[マイニング](/developers/docs/consensus-mechanisms/pow/mining)について読むことをお勧めします。

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimotoは、イーサッシュに取って代わられたイーサリアムのマイニングのための先行研究アルゴリズムでした。これは、DaggerとHashimotoという2つの異なるアルゴリズムを融合させたものでした。これはあくまで研究用の実装であり、イーサリアム・メインネットがローンチされるまでにイーサッシュに取って代わられました。

[Dagger](http://www.hashcash.org/papers/dagger.html)は、[有向非巡回グラフ (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph)の生成を伴い、そのランダムなスライスが一緒にハッシュ化されます。中心となる原則は、各ナンスが大規模なデータツリー全体の小さな部分しか必要としないということです。各ナンスのためにサブツリーを再計算することはマイニングにおいては非現実的であるため、ツリーを保存する必要がありますが、単一のナンスの検証には問題ありません。Daggerは、Scryptのような既存のアルゴリズムの代替として設計されました。Scryptはメモリハードですが、そのメモリハードネスが真に安全なレベルまで増加すると検証が困難になります。しかし、Daggerは共有メモリのハードウェアアクセラレーションに対して脆弱であったため、他の研究の方向性を優先して破棄されました。

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf)は、I/Oバウンド（つまり、メモリの読み取りがマイニングプロセスの制限要因となる）にすることでASIC耐性を追加するアルゴリズムです。この理論は、計算能力よりもRAMの方が利用しやすいということに基づいています。さまざまなユースケースに合わせてRAMを最適化するために、すでに数十億ドル規模の研究が行われており、それらはしばしばランダムに近いアクセスパターン（それゆえ「ランダムアクセスメモリ」）を伴います。その結果、既存のRAMは、アルゴリズムを評価する上で最適に近い状態である可能性が高いです。Hashimotoはブロックチェーンをデータソースとして使用し、上記の(1)と(3)を同時に満たします。

Dagger-Hashimotoは、DaggerとHashimotoアルゴリズムの修正版を使用しました。Dagger HashimotoとHashimotoの違いは、ブロックチェーンをデータソースとして使用する代わりに、Dagger Hashimotoはカスタム生成されたデータセットを使用し、Nブロックごとにブロックデータに基づいて更新される点です。データセットはDaggerアルゴリズムを使用して生成されるため、ライト・クライアントの検証アルゴリズムにおいて、各ナンスに固有のサブセットを効率的に計算できます。Dagger HashimotoとDaggerの違いは、元のDaggerとは異なり、ブロックをクエリするために使用されるデータセットが半永久的であり、時折（例えば週に1回）しか更新されない点です。これは、データセットを生成する労力の割合がほぼゼロになることを意味し、共有メモリの高速化に関するSergio Lernerの主張は無視できる程度になります。

[Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto)の詳細。

## イーサッシュ {#ethash}

イーサッシュは、現在では非推奨となったプルーフ・オブ・ワーク (PoW) アーキテクチャの下で、実際のイーサリアム・メインネットで実際に使用されていたマイニングアルゴリズムです。イーサッシュは事実上、アルゴリズムが大幅に更新された後に特定のバージョンのDagger-Hashimotoに与えられた新しい名前であり、前身の基本原則を継承しています。イーサリアム・メインネットではイーサッシュのみが使用されました。Dagger Hashimotoはマイニングアルゴリズムの研究開発バージョンであり、イーサリアム・メインネットでのマイニングが開始される前に取って代わられました。

[イーサッシュの詳細](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash)。

## 参考文献 {#further-reading}

_役に立つコミュニティリソースをご存知ですか？このページを編集して追加してください！_