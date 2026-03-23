---
title: "データ構造とエンコード"
description: "イーサリアムの基本的なデータ構造の概要"
lang: ja
sidebarDepth: 2
---

イーサリアムは大量のデータを作成、保存、転送します。 このデータは、誰でも比較的低スペックの一般向けハードウェアで[ノードを実行](/run-a-node/)できるように、標準化され、メモリ効率の良い方法でフォーマットされる必要があります。 このため、イーサリアムスタックでは、いくつかの特定のデータ構造が使用されています。

## 前提条件 {#prerequisites}

イーサリアムと[クライアントソフトウェア](/developers/docs/nodes-and-clients/)の基礎を理解している必要があります。 ネットワークレイヤーと[イーサリアムホワイトペーパー](/whitepaper/)についての知識を身につけておくことをお勧めします。

## データ構造 {#data-structures}

### パトリシアマークルトライ {#patricia-merkle-tries}

パトリシア・マークル・ツリーは、キー・バリュー(key-value)ペアを決定的かつ暗号的に認証されたツリーにエンコードする構造体です。 イーサリアムの実行レイヤー全体で広く使われています。

[パトリシアマークルトライの詳細](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### 再帰長プレフィックス (RLP) {#recursive-length-prefix}

再帰的長さのプレフィックス(RLP)は、イーサリアム実行レイヤー全体で広く使われているシリアライゼーション方法です。

[RLPの詳細](/developers/docs/data-structures-and-encoding/rlp)

### シンプルシリアライズ (SSZ) {#simple-serialize}

シンプル・シリアライゼーション(SSZ)は、マークライゼーションと互換性があるため、イーサリアムのコンセンサスレイヤーで主流のシリアライゼーション形式です。

[SSZの詳細](/developers/docs/data-structures-and-encoding/ssz)
