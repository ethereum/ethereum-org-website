---
title: データ構造とエンコード
description: イーサリアムの基本的なデータ構造の概要
lang: ja
sidebarDepth: 2
---

イーサリアムは大量のデータを作成、保存、転送します。 この大量のデータは、標準化されメモリ効率の良い方法でフォーマットされ、誰でも比較的それなりのコンシューマーグレードのハードウェアで[ノードを実行](/run-a-node/)できる必要があります。 このため、イーサリアムスタックでは、いくつかの特定のデータ構造が使用されています。

## 前提知識 {#prerequisites}

イーサリアムと[クライアントソフトウェア](/developers/docs/nodes-and-clients/)の基礎を理解する必要があります。 ネットワークレイヤーと[イーサリアムホワイトペーパー](/whitepaper/)についての知識を身に着けることをお勧めします。

## データ構造 {#data-structures}

### パトリシア・マークル・ツリー {#patricia-merkle-tries}

パトリシア・マークル・ツリーは、キー・バリュー(key-value)ペアを決定的かつ暗号的に認証されたツリーにエンコードする構造体です。 イーサリアムの実行レイヤー全体で広く使われています。

[パトリシア・マークル・ツリーの詳細](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### 再帰的長さのプレフィックス(RLP) {#recursive-length-prefix}

再帰的長さのプレフィックス(RLP)は、イーサリアム実行レイヤー全体で広く使われているシリアライゼーション方法です。

[再帰的長さのプレフィックス(RLP)の詳細](/developers/docs/data-structures-and-encoding/rlp)

### シンプル・シリアライゼーション(SSZ) {#simple-serialize}

シンプル・シリアライゼーション(SSZ)は、マークライゼーションと互換性があるため、イーサリアムのコンセンサスレイヤーで主流のシリアライゼーション形式です。

[シンプル・シリアライゼーション(SSZ)の詳細](/developers/docs/data-structures-and-encoding/ssz)
