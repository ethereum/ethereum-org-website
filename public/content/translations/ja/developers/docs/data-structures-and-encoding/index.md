---
title: データ構造とエンコーディング
description: イーサリアムの基本的なデータ構造の概要。
lang: ja
sidebarDepth: 2
---

イーサリアムは大量のデータを作成、保存、転送します。誰もが比較的控えめな消費者向けハードウェアで[ノードを実行](/run-a-node/)できるように、このデータは標準化され、メモリ効率の良い方法でフォーマットされる必要があります。これを実現するために、イーサリアムのスタックではいくつかの特定のデータ構造が使用されています。

## 前提条件 {#prerequisites}

イーサリアムの基礎と[クライアントソフトウェア](/developers/docs/nodes-and-clients/)について理解している必要があります。ネットワーキングレイヤーと[イーサリアムのホワイトペーパー](/whitepaper/)に精通していることが推奨されます。

## データ構造 {#data-structures}

### パトリシア・マークル・ツリー {#patricia-merkle-tries}

パトリシア・マークル・ツリー (Patricia Merkle Tries) は、鍵と値のペアを決定論的かつ暗号学的に認証されたツリーにエンコードする構造です。これらは、イーサリアムの実行レイヤー全体で広く使用されています。

[パトリシア・マークル・ツリーの詳細](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### 再帰的長さプレフィックス (RLP) {#recursive-length-prefix}

再帰的長さプレフィックス (RLP) は、イーサリアムの実行レイヤー全体で広く使用されているシリアライゼーション手法です。

[RLPの詳細](/developers/docs/data-structures-and-encoding/rlp)

### シンプル・シリアライズ (SSZ) {#simple-serialize}

シンプル・シリアライズ (SSZ) は、マークル化との互換性があるため、イーサリアムのコンセンサス・レイヤーにおける主要なシリアライゼーション形式です。

[SSZの詳細](/developers/docs/data-structures-and-encoding/ssz)